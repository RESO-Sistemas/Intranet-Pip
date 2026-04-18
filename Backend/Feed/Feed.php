<?php
  if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
  }
  else {
    if (file_exists("./Conexiones/Conexiones.php")) {
      require_once("./Conexiones/Conexiones.php");
    }
    else if(file_exists("../Conexiones/Conexiones.php")){
      require_once("../Conexiones/Conexiones.php");
      }
    else if(file_exists("../../Conexiones/Conexiones.php")){
      require_once("../../Conexiones/Conexiones.php");
      }
    else if(file_exists("././Backend/Conexiones/Conexiones.php")){
      require_once("././Backend/Conexiones/Conexiones.php");
      }
  }
  require_once("../PHPMailer/SenderHelper.php");

  // Cargar SessionManager
  if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
  } else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
  }

  class Feed extends Conexiones {
    function newFeed ($nTitulo,$nDescripcion,$nHipervinculo) {
      $NoEmpleado = SessionManager::get("NoEmpleado");
      error_log("=== newFeed ===");
      error_log("NoEmpleado de sesion: " . ($NoEmpleado ?? 'NULL'));
      
      if (!$NoEmpleado) {
        error_log("ERROR: NoEmpleado es null, sesion no iniciada");
        throw new Exception("Sesión no válida. Por favor inicie sesión nuevamente.");
      }
      
      $q = "CALL sp_NuevoFeed (?,?,?,?)";
      $cons = $this->ProcedureWithParam($q,array($nTitulo, $nDescripcion, $NoEmpleado, $nHipervinculo));
      $MMensaje = $cons[0]["Titulo"];
      error_log("titulo generado: ".$MMensaje);
      $NewInstFeed = new Feed();
      $NewInstFeed->sendPushNotificationToSegment($MMensaje);
      $NewInstFeed2 = new Feed();
      $NewInstFeed2->NotificarNuevoFeedByMail();
      return $cons;
    }

    function NotificarNuevoFeedByMail() {
      $SenderHelper = new SenderHelper();
      $con2 = new Conexiones();
      $q2 = "SELECT REPLACE(UPPER(Nombre), ',', '') AS Nombre, lower(Email) AS Email
      FROM Empleados
      WHERE Status = 1 AND Email IS NOT NULL AND Email != 'null';";
      $cons2 = $con2->Select($q2, array());
      if ($cons2) {
        $Mensaje = "¡Se ha hecho una nueva publicación!, ¿Qué te parece si le das un vistazo?";
        $Asunto = "Nueva publicación";
        $response = $SenderHelper->RecursiveSender($cons2, $Mensaje, $Asunto);
      } else {
        error_log("No se hizo la consulta de los correos de los empleados");
      }
    }

    function sendPushNotificationToSegment($message) {
        $appId = 'e18c94b0-e0cb-4a0a-9335-2c43cb924b28'; // reemplazar con su App ID
        $restApiKey = 'ZWI3MTNhNzUtNWI5MC00YzU5LTlkYzUtMmI3NzZjY2MzNmQw'; // reemplazar con su Rest API Key
        $ArrPersonas = ["Active Users","Inactive Users"];
        $data = array(
            'app_id' => "e18c94b0-e0cb-4a0a-9335-2c43cb924b28",
            'included_segments' => $ArrPersonas,
            // 'include_segment' => $ArrPersonas,
            'contents' => array('en' => $message)
        );
        $dataString = json_encode($data);
        $headers = array(
            'Authorization: Basic ' . $restApiKey,
            'Content-Type: application/json',
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        $response = curl_exec($ch);
        error_log($response);
        curl_close($ch);
        return $response;
    }

    function AddNombreArchivoFeed($idFeed,$Archivo){
      $q = "INSERT INTO ArchivosFeed (idFeed,Archivo) VALUES ('$idFeed','$Archivo')";
      $this->ExecuteQuery($q,array());
      return "1";
    }

    // Función para guardar archivo binario (BLOB) directamente en la BD (método legacy)
    function AddArchivoFeedBlob($idFeed, $fileName, $contentType, $content){
      try {
        $conn = new Conexiones();
        $sql = "INSERT INTO ArchivosFeed (idFeed, Archivo, ContentType, Content) VALUES (?, ?, ?, ?)";
        $params = [$idFeed, $fileName, $contentType, $content];
        $result = $conn->ExecuteWithLob($sql, $params, 3);
        error_log("AddArchivoFeedBlob - idFeed: $idFeed, fileName: $fileName, result: " . ($result ? $result : "false"));
        return $result ? "1" : "0";
      } catch (Exception $e) {
        error_log("Error guardando archivo Feed: " . $e->getMessage());
        return "0";
      }
    }

    /**
     * Guarda un archivo de imagen como Data URI (base64) en la tabla ArchivosFeed.
     * La imagen viene del frontend ya convertida a data:image/...;base64,...
     * Este es el mismo patrón que usa el módulo de Incidencias.
     */
    function addArchivoDataUri($idFeed, $dataUri) {
      try {
        // Validar que sea un Data URI de imagen válido
        if (!preg_match('/^data:image\/(jpeg|jpg|png|gif|webp);base64,/i', $dataUri)) {
          error_log("addArchivoDataUri - Data URI inválido para idFeed: $idFeed");
          return "0";
        }
        // Limpiar espacios en blanco que puedan romper el Data URI
        $dataUri = preg_replace('/\s+/', '', $dataUri);
        $sql = "INSERT INTO ArchivosFeed (idFeed, Archivo) VALUES (?, ?)";
        $params = [$idFeed, $dataUri];
        $this->ExecuteQueryWithParam($sql, $params);
        return "1";
      } catch (\Exception $e) {
        error_log("Error en addArchivoDataUri: " . $e->getMessage());
        return "0";
      }
    }

    // Función para obtener archivo binario de la BD
    function getArchivoFeedBlob($idArchivosFeed){
      try {
        $conn = new Conexiones();
        $sql = "SELECT Archivo, ContentType, Content FROM ArchivosFeed WHERE idArchivosFeed = ?";
        $result = $conn->SelectWithLob($sql, [$idArchivosFeed]);
        return $result ? $result : null;
      } catch (Exception $e) {
        error_log("Error obteniendo archivo Feed: " . $e->getMessage());
        return null;
      }
    }

    function getImgEventosBirthday () {
        $ArrRetorno = [];
        $NombreArchivo = "";
        $Datos  = [];
        $ficheros1  = scandir("../../Archivos/ImagesBirthday/",1);
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        for ($i=0; $i < sizeof($ficheros1) ; $i++) {
            $NombreArchivo = $ficheros1[$i];
        }
        return $ArrRetorno;
    }

    function loadFeeds ($page = 1, $limit = 5, $lightweight = 0) {
      try {
      $page = intval($page);
      $limit = intval($limit);
      $lightweight = intval($lightweight);
      if ($page < 1) $page = 1;
      if ($limit < 1) $limit = 5;
      $offset = ($page - 1) * $limit;
      $actYear = date("Y");
      $NoEmpleado = SessionManager::get("NoEmpleado");
      $NombreArchivo = "";
      $NombreArchivoBirthday = "";
      $NombreArchivoAnniversary = "";
      $IdSucursal = SessionManager::get("IdSucursal");
      $ficheros1  = @scandir("../../Archivos/ImagesBirthday/",1);
      if ($ficheros1 && count($ficheros1) > 2) {
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        $NombreArchivoBirthday = $ficheros1[0];
      }
      $ficheros2  = @scandir("../../Archivos/ImagesAnniversary/",1);
      if ($ficheros2 && count($ficheros2) > 2) {
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros2);
        }
        $NombreArchivoAnniversary = $ficheros2[0];
      }
      $DatosComentarios = [];
      $ArrayRetorno = [];
      $q = "SELECT * FROM  (
                    SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,'$NombreArchivoBirthday' as Archivo,'PIP By Lugo' as Nombre,'0' AS NoEmpleado,'0.png' as Imagen,
                    (select TIMESTAMPDIFF(MINUTE,F.Registro,NOW())) as DMinutos,
                    (select TIMESTAMPDIFF(HOUR,F.Registro,NOW())) as DHoras,
                    (select TIMESTAMPDIFF(DAY,F.Registro,NOW())) as DDias,
                    F.Tipo,
                    if((select TIMESTAMPDIFF(MINUTE,F.Registro,NOW())) < 60,(select concat(TIMESTAMPDIFF(MINUTE,F.Registro,NOW()), ' Minutos')),
                    if((select TIMESTAMPDIFF(HOUR,F.Registro,NOW()))< 24,(select concat(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Horas'))
                    ,(SELECT CONCAT(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Dias')))) as DiferenciaRegistro
                    FROM Feed AS F
                    LEFT JOIN ComentariosFeed AS CF ON CF.idFeed = F.idFeed
                    LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                    where F.Tipo = 'CMP' AND date_format(F.Registro,'%m-%d') = date_format(NOW(),'%m-%d') AND YEAR(F.Registro) = '$actYear'
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC
                    ) AS TABLA1
                    UNION ALL
        SELECT * FROM (SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,'$NombreArchivoAnniversary' as Archivo,'PIP By Lugo' as Nombre,'0' AS NoEmpleado,'0.png' as Imagen,
                    (select TIMESTAMPDIFF(MINUTE,F.Registro,NOW())) as DMinutos,
                    (select TIMESTAMPDIFF(HOUR,F.Registro,NOW())) as DHoras,
                    (select TIMESTAMPDIFF(DAY,F.Registro,NOW())) as DDias,
                    F.Tipo,
                    if((select TIMESTAMPDIFF(MINUTE,F.Registro,NOW())) < 60,(select concat(TIMESTAMPDIFF(MINUTE,F.Registro,NOW()), ' Minutos')),
                    if((select TIMESTAMPDIFF(HOUR,F.Registro,NOW()))< 24,(select concat(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Horas'))
                    ,(SELECT CONCAT(TIMESTAMPDIFF(DAY,F.Registro,NOW()), ' Dias')))) as DiferenciaRegistro
                    FROM Feed AS F
                    LEFT JOIN ComentariosFeed AS CF ON CF.idFeed = F.idFeed
                    LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                    where F.Tipo = 'ANY' AND date_format(F.Registro,'%m-%d') = date_format(NOW(),'%m-%d') AND YEAR(F.Registro) = '$actYear'
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC) AS TABLA2
                    UNION ALL
        SELECT * FROM (
                    SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,GROUP_CONCAT(AF.Archivo) as Archivo,E.Nombre,E.NoEmpleado,E.Imagen,
                    (select TIMESTAMPDIFF(MINUTE,F.Registro,NOW())) as DMinutos,
                    (select TIMESTAMPDIFF(HOUR,F.Registro,NOW())) as DHoras,
                    (select TIMESTAMPDIFF(DAY,F.Registro,NOW())) as DDias,
                    F.Tipo,
                    if((select TIMESTAMPDIFF(MINUTE,F.Registro,NOW())) < 60,(select concat(TIMESTAMPDIFF(MINUTE,F.Registro,NOW()), ' Minutos')),
                    if((select TIMESTAMPDIFF(HOUR,F.Registro,NOW())) < 24,(select concat(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Horas'))
                    ,(SELECT CONCAT(TIMESTAMPDIFF(DAY,F.Registro,NOW()), ' Dias')))) as DiferenciaRegistro
                    FROM Feed AS F
                    LEFT JOIN ArchivosFeed AS AF ON AF.idFeed = F.idFeed
                    INNER JOIN Empleados AS E ON E.NoEmpleado = F.NoEmpleado
                    where (F.Tipo = 'FED' OR F.Tipo = 'FIN')
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC) AS TABLA3
                    ORDER BY Registro DESC
                    LIMIT $offset, $limit;";
            $cons = $this->Select($q,array());
            
            if (!$cons || !is_array($cons) || sizeof($cons) == 0) {
              return json_encode($ArrayRetorno);
            }

            // Recopilar todos los idFeed para hacer consultas batch
            $feedIds = [];
            for ($i=0; $i < sizeof($cons); $i++) {
              $feedIds[] = "'" . $cons[$i]["idFeed"] . "'";
            }
            $feedIdsStr = implode(",", $feedIds);

            $commentsByFeed = [];
            if ($lightweight !== 1) {
              // BATCH 1: Comentarios completos (solo cuando no se solicita modo ligero)
              $conn1 = new Conexiones();
              $q2 = "SELECT CF.idFeed, CF.NoEmpleado, CF.Comentario, CF.Registro, E.Nombre, E.Email 
                     FROM ComentariosFeed AS CF
                     INNER JOIN Empleados AS E ON E.NoEmpleado = CF.NoEmpleado
                     WHERE CF.idFeed IN ($feedIdsStr) AND CF.Autorizado = 1
                     ORDER BY CF.Registro DESC;";
              $allComments = $conn1->Select($q2);
              if ($allComments && is_array($allComments)) {
                for ($j=0; $j < sizeof($allComments); $j++) {
                  $fid = $allComments[$j]["idFeed"];
                  if (!isset($commentsByFeed[$fid])) $commentsByFeed[$fid] = [];
                  $commentsByFeed[$fid][] = [
                    "FeedId" => $fid,
                    "ComentarioFeed" => $allComments[$j]["Comentario"],
                    "FechaComentario" => $allComments[$j]["Registro"],
                    "NoEmpleadoComentario" => $allComments[$j]["NoEmpleado"],
                    "NombreEmpleadoComentario" => $allComments[$j]["Nombre"],
                    "EmailEmpleadoComentario" => $allComments[$j]["Email"]
                  ];
                }
              }
            }

            // BATCH 2: Contadores de reacciones para todos los feeds
            $conn2 = new Conexiones();
            $q3 = "SELECT RF.idFeed,
                   SUM(CASE WHEN RF.idTipoReaccion = 1 THEN 1 ELSE 0 END) AS CantidadMeGusta,
                   SUM(CASE WHEN RF.idTipoReaccion = 2 THEN 1 ELSE 0 END) AS CantidadFelicitaciones
                   FROM ReaccionFeed AS RF
                   WHERE RF.idFeed IN ($feedIdsStr) AND RF.NoEmpleado <> 0
                   GROUP BY RF.idFeed;";
            $allReactionCounts = $conn2->Select($q3);
            $reactionCountsByFeed = [];
            if ($allReactionCounts && is_array($allReactionCounts)) {
              for ($j=0; $j < sizeof($allReactionCounts); $j++) {
                $reactionCountsByFeed[$allReactionCounts[$j]["idFeed"]] = $allReactionCounts[$j];
              }
            }

            // Contadores de comentarios
            $conn3 = new Conexiones();
            $qCC = "SELECT idFeed, COUNT(*) AS CantidadComentarios FROM ComentariosFeed WHERE idFeed IN ($feedIdsStr) GROUP BY idFeed;";
            $allCommentCounts = $conn3->Select($qCC);
            $commentCountsByFeed = [];
            if ($allCommentCounts && is_array($allCommentCounts)) {
              for ($j=0; $j < sizeof($allCommentCounts); $j++) {
                $commentCountsByFeed[$allCommentCounts[$j]["idFeed"]] = $allCommentCounts[$j]["CantidadComentarios"];
              }
            }

            // Reacciones del usuario actual
            $conn4 = new Conexiones();
            $qUserR = "SELECT idFeed, idTipoReaccion FROM ReaccionFeed WHERE idFeed IN ($feedIdsStr) AND NoEmpleado = '$NoEmpleado';";
            $userReactions = $conn4->Select($qUserR);
            $userReactionsByFeed = [];
            if ($userReactions && is_array($userReactions)) {
              for ($j=0; $j < sizeof($userReactions); $j++) {
                $fid = $userReactions[$j]["idFeed"];
                if (!isset($userReactionsByFeed[$fid])) $userReactionsByFeed[$fid] = [];
                $userReactionsByFeed[$fid][] = $userReactions[$j]["idTipoReaccion"];
              }
            }

            // BATCH 3: Empleados que reaccionaron
            $conn5 = new Conexiones();
            $q4r = "SELECT RF.idFeed, E.Nombre, RF.idTipoReaccion FROM ReaccionFeed AS RF
                    INNER JOIN Empleados AS E ON E.NoEmpleado = RF.NoEmpleado
                    WHERE RF.idFeed IN ($feedIdsStr) AND RF.NoEmpleado <> 0;";
            $allEmpReactions = $conn5->Select($q4r);
            $empReactionsByFeed = [];
            if ($allEmpReactions && is_array($allEmpReactions)) {
              for ($j=0; $j < sizeof($allEmpReactions); $j++) {
                $fid = $allEmpReactions[$j]["idFeed"];
                if (!isset($empReactionsByFeed[$fid])) $empReactionsByFeed[$fid] = [];
                $empReactionsByFeed[$fid][] = [
                  "EmpleadoReaccion" => $allEmpReactions[$j]["Nombre"],
                  "TipoReaccion" => $allEmpReactions[$j]["idTipoReaccion"]
                ];
              }
            }

            // BATCH 4: Archivos de todos los feeds
            // Se detecta el tipo: Data URI base64 (nuevo patrón), BLOB binario (legacy) o nombre en disco (antiguo)
            $conn6 = new Conexiones();
            $q4a = "SELECT idArchivosFeed, idFeed, Archivo, 
                    (CASE WHEN Content IS NOT NULL AND LENGTH(Content) > 0 THEN 1 ELSE 0 END) AS hasBlob,
                    (CASE WHEN Archivo LIKE 'data:image/%' THEN 1 ELSE 0 END) AS isDataUri
                    FROM ArchivosFeed WHERE idFeed IN ($feedIdsStr)";
            $allArchivos = $conn6->Select($q4a);
            $archivosByFeed = [];
            if ($allArchivos && is_array($allArchivos)) {
              for ($j=0; $j < sizeof($allArchivos); $j++) {
                $fid = $allArchivos[$j]["idFeed"];
                if (!isset($archivosByFeed[$fid])) $archivosByFeed[$fid] = [];
                $archivosByFeed[$fid][] = [
                  "idArchivosFeed" => $allArchivos[$j]["idArchivosFeed"],
                  // Si es Data URI, enviarlo completo al frontend; si es nombre de archivo, solo el nombre
                  "Archivo"        => $allArchivos[$j]["Archivo"],
                  "hasBlob"        => intval($allArchivos[$j]["hasBlob"]),
                  "isDataUri"      => intval($allArchivos[$j]["isDataUri"])
                ];
              }
            }

            // Armar el array de retorno usando los datos ya cargados
            for ($i=0; $i < sizeof($cons); $i++) {
              $idFeed = $cons[$i]["idFeed"];
              $rc = isset($reactionCountsByFeed[$idFeed]) ? $reactionCountsByFeed[$idFeed] : ["CantidadMeGusta" => 0, "CantidadFelicitaciones" => 0];
              $userR = isset($userReactionsByFeed[$idFeed]) ? $userReactionsByFeed[$idFeed] : [];

              array_push($ArrayRetorno,[
                "idFeed" => $idFeed,
                "Titulo" => $cons[$i]["Titulo"],
                "Descripcion" => $cons[$i]["Descripcion"],
                "Registro" => $cons[$i]["Registro"],
                "Archivo" => $cons[$i]["Archivo"],
                "ArrayArchivos" => isset($archivosByFeed[$idFeed]) ? $archivosByFeed[$idFeed] : [],
                "Nombre" => $cons[$i]["Nombre"],
                "NoEmpleado" => $cons[$i]["NoEmpleado"],
                "Imagen" => $cons[$i]["Imagen"],
                "DMinutos" => $cons[$i]["DMinutos"],
                "DHoras" => $cons[$i]["DHoras"],
                "DDias" => $cons[$i]["DDias"],
                "ArrayComentarios" => isset($commentsByFeed[$idFeed]) ? $commentsByFeed[$idFeed] : [],
                "CantidadComentarios" => isset($commentCountsByFeed[$idFeed]) ? $commentCountsByFeed[$idFeed] : 0,
                "CantidadMeGusta" => $rc["CantidadMeGusta"],
                "MeGusta" => in_array(1, $userR) ? 1 : 0,
                "CantidadFelicitaciones" => $rc["CantidadFelicitaciones"],
                "Felicitacion" => in_array(2, $userR) ? 1 : 0,
                "Tipo" => $cons[$i]["Tipo"],
                "DiferenciaRegistro" => $cons[$i]["DiferenciaRegistro"],
                "Hipervinculo" => $cons[$i]["Hipervinculo"],
                "EmpleadosReaccion" => isset($empReactionsByFeed[$idFeed]) ? $empReactionsByFeed[$idFeed] : []
              ]);
            }
      return json_encode($ArrayRetorno);
      } catch (\Exception $e) {
        error_log("Error en loadFeeds: " . $e->getMessage());
        return json_encode([]);
      }
    }

    function getEmpleadosReaccionFeed ($idFeed) {
      $q = "SELECT E.Nombre,RF.idTipoReaccion FROM ReaccionFeed AS RF
              INNER JOIN Empleados AS E ON E.NoEmpleado = RF.NoEmpleado
              WHERE idFeed = '$idFeed' AND RF.NoEmpleado <> 0;";
      $cons = $this->Select($q,array());
      return $cons;
    }
    function addComentariosFeed ($idFeed,$Comentario) {
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "INSERT INTO ComentariosFeed (idFeed,NoEmpleado,Comentario,Registro,Revisado,Autorizado) VALUES ('$idFeed','$NoEmpleado','$Comentario',NOW(),1,1);";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }

    function MeGustaFeed ($idFeed,$idTipoReaccion) {
      try {
        $ArrayRetorno = [];
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT * FROM ReaccionFeed WHERE idFeed = '$idFeed' AND NoEmpleado = '$NoEmpleado' and idTipoReaccion = '$idTipoReaccion'";
        $cons = $this->Select($q,array());
        $Conexiones2 = new Conexiones();
        if (sizeof($cons) > 0) {
          $q2 = "DELETE FROM ReaccionFeed WHERE idFeed = '$idFeed' AND NoEmpleado = '$NoEmpleado' and idTipoReaccion = '$idTipoReaccion';";
        }else {
          $q2 = "INSERT INTO ReaccionFeed (idFeed,NoEmpleado,Registro,idTipoReaccion) VALUES ('$idFeed','$NoEmpleado',now(),'$idTipoReaccion');";
        }
        $Conexiones2->ExecuteQuery($q2,array());

        $FeedReaccion = new Feed();
        $ArrDatosReaccion = [];
        $ArrRegistros = $FeedReaccion->getEmpleadosReaccionFeed($idFeed);

        $Conexiones3 = new Conexiones();
        $q3 = "SELECT (SELECT count(idFeed) FROM ReaccionFeed WHERE idTipoReaccion = 1 AND  idFeed = '$idFeed' AND NoEmpleado <> 0) AS CantidadMeGusta,
                (SELECT count(idFeed) FROM ReaccionFeed WHERE idTipoReaccion = 2 AND  idFeed = '$idFeed' AND NoEmpleado <> 0) AS CantidadFelicitaciones,
                (SELECT count(idFeed) FROM ComentariosFeed WHERE idFeed = '$idFeed') AS CantidadComentarios,
                (SELECT count(MGF.idFeed) FROM Feed AS F LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                  WHERE  MGF.idFeed = '$idFeed' and MGF.NoEmpleado = '$NoEmpleado' and idTipoReaccion = 1) AS MeGusta,
                (SELECT count(MGF.idFeed) FROM Feed AS F LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                  WHERE  MGF.idFeed = '$idFeed' and MGF.NoEmpleado = '$NoEmpleado' and idTipoReaccion = 2) AS Felicitacion";
        $cons3 = $Conexiones3->Select($q3,array());

        $Datos = [
          "TipoReaccion" => $idTipoReaccion,
          "EmpleadosReaccion" => $ArrRegistros,
          "CantidadMeGusta" => $cons3[0]["CantidadMeGusta"],
          "CantidadFelicitaciones" => $cons3[0]["CantidadFelicitaciones"],
          "MeGusta" => $cons3[0]["MeGusta"],
          "Felicitacion" => $cons3[0]["Felicitacion"],
          "IdFeed" => $idFeed
        ];
        array_push($ArrayRetorno,$Datos);
        return json_encode($ArrayRetorno);
      } catch (\Exception $e) {
        return "0";
      }
    }

    function insertaFeedBirthday () {
      $q = "SELECT NoEmpleado,Nombre,FNacimiento
  						FROM Empleados WHERE date_format(FNacimiento,'%m-%d') = date_format(now(),'%m-%d')
  						and NoEmpleado NOT IN (SELECT NoEmpleado FROM Feed WHERE Tipo = 'CMP'
  											   AND date_format(Registro,'%Y') = date_format(NOW(),'%Y'));";
                      error_log($q);
      $MsgBirthday1 = "";
      $MsgBirthday2 = "";
      $cons = $this->Select($q,array());
      if (sizeof($cons) < 1) {
      } elseif (sizeof($cons) == 1) {
        $NombreEmpleadoText = $cons[0]["Nombre"];
        $NoEmpleadoText = $cons[0]["NoEmpleado"];
        $MsgBirthday1 = "$NombreEmpleadoText";
        $MsgBirthday2 = "$NombreEmpleadoText";
      } elseif (sizeof($cons) > 1) {
        $ContenidoNombres = "";
        $ContenidoNoEmpleados = "";
        for ($i=0; $i < sizeof($cons) ; $i++) {
          $NoEmpleado = $cons[$i]["NoEmpleado"];
          $Nombre = $cons[$i]["Nombre"];
          $Nombre = str_replace(',','',$Nombre);
          $ContenidoNombres = $ContenidoNombres.$Nombre." ,";
          $ContenidoNoEmpleados = $ContenidoNoEmpleados.$NoEmpleado.",";
        }
        $ContenidoNombres = substr($ContenidoNombres,0, -1);
        $ContenidoNoEmpleados = substr($ContenidoNoEmpleados,0,-1);
        $MsgBirthday1 = "$ContenidoNombres";
        $MsgBirthday2 = "$ContenidoNombres";
        $NoEmpleadoText = $ContenidoNoEmpleados;
      }
      $Conexiones2 = new Conexiones();
      $q2 = "INSERT INTO Feed (Titulo,Descripcion,NoEmpleado,Tipo,Registro)
					     VALUES ('El día de hoy celebramos el cumpleaños a los siguientes empleados:','$MsgBirthday1','0','CMP',now());";
      $Conexiones2->ExecuteQuery($q2,array());
    }



    function insertaFeedAnniversario () {
      $q = "SELECT NoEmpleado,Nombre,FNacimiento
             FROM Empleados WHERE date_format(FNacimiento,'%m-%d') = date_format(now(),'%m-%d')
             and NoEmpleado NOT IN (SELECT NoEmpleado FROM Feed WHERE Tipo = 'ANY'
                          AND date_format(Registro,'%Y') = date_format(NOW(),'%Y'));";
     $MsgAny1 = "";
     $MsgAny2 = "";
     $cons = $this->Select($q,array());
     if (sizeof($cons) < 1) {
     } elseif (sizeof($cons) == 1) {
       $NombreEmpleadoText = $cons[0]["Nombre"];
       $NoEmpleadoText = $cons[0]["NoEmpleado"];
       $MsgAny1 = "$NombreEmpleadoText";
       $MsgAny2 = "$NombreEmpleadoText";
     } elseif (sizeof($cons) > 1) {
       $ContenidoNombres = "";
       $ContenidoNoEmpleados = "";
       for ($i=0; $i < sizeof($cons) ; $i++) {
         $NoEmpleado = $cons[$i]["NoEmpleado"];
         $Nombre = $cons[$i]["Nombre"];
         $Nombre = str_replace(',','',$Nombre);
         $ContenidoNombres = $ContenidoNombres."".$Nombre." ,";
         $ContenidoNoEmpleados = $ContenidoNoEmpleados.$NoEmpleado.",";
       }
       $ContenidoNombres = substr($ContenidoNombres,0, -1);
       $ContenidoNoEmpleados = substr($ContenidoNoEmpleados,0,-1);
       $MsgAny1 = "$ContenidoNombres";
       $MsgAny2 = "$ContenidoNombres";
       $NoEmpleadoText = $ContenidoNoEmpleados;
     }
     $Conexiones2 = new Conexiones();
     $q2 = "INSERT INTO Feed (Titulo,Descripcion,NoEmpleado,Tipo,Registro)
              VALUES ('El día de hoy celebramos el aniversario a los siguientes empleados:','$MsgAny1','0','ANY',now());";
     $Conexiones2->ExecuteQuery($q2,array());
    }

    function getListFeeds(){
      $q = "SELECT idFeed,Titulo,Descripcion FROM Feed
              WHERE Tipo = 'FED'
                 OR (Tipo = 'FIN' AND IFNULL(AutorizadoIndex,0) = 1)
              order by idFeed desc;";
      return json_encode($this->Select($q,array()));
    }

    function getArchivosActualesFeed ($idFeed) {
      $idFeed = base64_decode($idFeed);
      $q = "SELECT Archivo FROM ArchivosFeed
              WHERE idFeed = '$idFeed';";
      return json_encode($this->Select($q,array()));
    }

    function eliminarArchivoFeedSelected ($idFeed,$Archivo) {
      $idFeed = base64_decode($idFeed);
      $q = "SELECT Archivo FROM ArchivosFeed
              WHERE idFeed = '$idFeed';";
      $cons = $this->Select($q,array());
      $AllArchivos = $cons[0]["Archivo"];
      $AllArchivos = str_replace($Archivo,'',$AllArchivos);
      $AllArchivos = str_replace(',,',',',$AllArchivos);
      $Digito1 = $AllArchivos[0];
      $DigitoUltimo = $AllArchivos[-1];
      if ($Digito1 === ",") {
        $AllArchivos = ltrim($AllArchivos,',');
      } elseif ($DigitoUltimo === ',') {
        $AllArchivos = substr($AllArchivos,0,-1);
      }
      $Conexiones2 = new Conexiones();
      $q2 = "UPDATE ArchivosFeed SET Archivo = '$AllArchivos'
              WHERE idFeed = '$idFeed';";
      $Conexiones2->ExecuteQuery($q2,array());
      unlink("../../Archivos/Feed/$idFeed/$Archivo");
      return "1";
    }

    function getDetalleFeed($idFeed) {
      $idFeed = base64_decode($idFeed);
      $q = "SELECT Titulo,Descripcion,Hipervinculo FROM Feed
              WHERE idFeed = '$idFeed'";
      $cons = $this->Select($q,array());

      $ArrRetorno = [
        "Titulo" => $cons[0]["Titulo"],
        "Descripcion" => str_replace('<br />','',$cons[0]["Descripcion"]),
        "Hipervinculo" => $cons[0]["Hipervinculo"]
      ];
      return json_encode($ArrRetorno);
    }

    function UpdateFeed ($Archivo,$Titulo,$Descripcion,$idFeed,$Hipervinculo) {
      $q = "SELECT Archivo FROM ArchivosFeed WHERE idFeed = '$idFeed';";
      $cons = $this->Select($q,array());
      $TextArchivoActual = $cons[0]["Archivo"];

      $Conexiones2 = new Conexiones();
      $q2 = "UPDATE Feed SET Titulo = ?, Descripcion = ?, Hipervinculo = ?
                WHERE idFeed = ?;";
      $Conexiones2->ExecuteQueryWithParam($q2,array($Titulo, $Descripcion, $Hipervinculo, $idFeed));
      $Conexiones3 = new Conexiones();

      if ($Archivo != "") {
        if (sizeof($cons) > 0) {
          if ($TextArchivoActual == "") {
            $TextArchivoActual = $Archivo;
          }else {
            $TextArchivoActual = $TextArchivoActual.",".$Archivo;
          }
          $q3 = "UPDATE ArchivosFeed SET Archivo = '$TextArchivoActual'
                  WHERE idFeed = '$idFeed';";
        } else {
          $q3 = "INSERT INTO ArchivosFeed(idFeed,Archivo) VALUES ('$idFeed','$Archivo')";
        }
        $Conexiones3->ExecuteQuery($q3,array());
      }
      return "1";
    }

    function GetCantidadArchivosActualesFeed($idFeed) {
      $idFeed = base64_decode($idFeed);
      $q = "SELECT Archivo FROM ArchivosFeed WHERE idFeed = '$idFeed';";
      $cons = $this->Select($q,array());
      $TextArchivos = $cons[0]["Archivo"];
      $TextArchivos = explode(",",$TextArchivos);
      $ContadorArchivos = sizeof($TextArchivos);
      return $ContadorArchivos;
    }

    function eliminarFeed ($nidFeed) {
      try {
        $nidFeed = base64_decode($nidFeed);
        error_log("=== ELIMINANDO FEED ===");
        error_log("idFeed: " . $nidFeed);
        
        $q = "CALL spEliminarFeed('$nidFeed')";
        error_log("Query: " . $q);
        
        $this->Procedure($q);
        
        // Eliminar archivos asociados
        $rutaArchivos = "../../Archivos/Feed/$nidFeed";
        if (is_dir($rutaArchivos)) {
          foreach(glob($rutaArchivos . "/*") as $archivos_carpeta){
            if (is_dir($archivos_carpeta)){
              rmDir_rf($archivos_carpeta);
            } else {
              unlink($archivos_carpeta);
            }
          }
          rmdir($rutaArchivos);
          error_log("Archivos eliminados correctamente");
        }
        
        return "1";
      } catch (\Exception $e) {
        error_log("ERROR en eliminarFeed: " . $e->getMessage());
        return "0";
      }
    }

    function getPostRequests(){
      try {
        $q = "SELECT
              TO_BASE64(F.idFeed) AS idFeed, F.Titulo, F.Descripcion, F.Registro, F.NoEmpleado,
              F.Hipervinculo, E.Nombre AS Empleado,
              AF.Archivo, P.Puesto, SD.Sucursal
              FROM Feed AS F
              INNER JOIN (
              SELECT idFeed, Archivo
                FROM ArchivosFeed
              ) AS AF ON AF.idFeed = F.idFeed
              INNER JOIN (
                SELECT Nombre, NoEmpleado, IdPuesto, IdSucursal
                FROM Empleados
              ) AS E ON E.NoEmpleado = F.NoEmpleado
              LEFT JOIN (
                SELECT IdPuesto, Puesto
                    FROM Puestos
              ) AS P ON P.IdPuesto = E.IdPuesto
              LEFT JOIN (
                SELECT IdSucursal, Sucursal
                    FROM SucursalDepto
              ) AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE F.Tipo = 'FIN' AND F.AutorizadoIndex = 0 AND F.Revisado = 0
              ORDER BY F.Registro DESC;";
        $res = $this->Select($q);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getcommentsRequests(){
      try {
        $q = "SELECT CF.Comentario, E.NoEmpleado, E.Nombre, CF.Registro, TO_BASE64(CF.idComentariosFeed) AS idComentariosFeed
              FROM ComentariosFeed AS CF
              INNER JOIN (
                SELECT NoEmpleado, Nombre
                  FROM Empleados
              ) AS E ON E.NoEmpleado = CF.NoEmpleado
              WHERE CF.Revisado = 0
              ORDER BY CF.Registro DESC";
        $res = $this->Select($q);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function executeActionPostRequest($post, $action){
      try {
        $post = base64_decode($post);
        $NoEmpleado = SessionManager::get("NoEmpleado");
        if (!$action == 1) {
          $msg = "La petición de la publicación ha sido denegada.";
          $action = 0;
        } else {
          $msg = "La petición de la publicación ha sido aprobada.";
        }
        $q = "CALL sp_actionPostRequest(?,?,?)";
        $this->ProcedureWithParam($q,[$post, $NoEmpleado, $action]);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => $msg
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function executeActionComments($data, $action){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        if ($action != 1) {
          $action = 0;
          $msg = "Los comentarios seleccionados han sido rechazados.";
        } else {
          $msg = "Los comentarios seleccionados han sido aprobados.";
        }
        $contentUpd = "";
        $cant = count($data);
        for ($i=0; $i < $cant ; $i++) {
          $idC = base64_decode($data[$i]);
          $ConProc = new Conexiones();
          $q = "CALL sp_actionCommentRequests(?,?,?)";
          $ConProc->ProcedureWithParam($q,[$idC, $NoEmpleado, $action]);
        }
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => $msg
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getCommentsFeedSelected($iFeed){
      try {
        $user = SessionManager::get("NoEmpleado");
        $insReactionC = new Feed();
        $reactionC = $insReactionC->getReactionCommentsFeed($iFeed);
        $q = "SELECT
                CF.idFeed,
                CF.NoEmpleado,
                CF.Comentario,
                CF.Registro,
                E.ImagenEmpleado,
                E.Nombre,
                CASE WHEN CF.NoEmpleado = ? THEN 1 ELSE 2 END AS TypeCommentUs,
                CF.idComentariosFeed
              FROM ComentariosFeed AS CF
              INNER JOIN (
                SELECT NoEmpleado, Nombre,
                CASE WHEN Imagen = '' OR Imagen IS NULL THEN CONCAT(0,'/0.png') ELSE CONCAT(NoEmpleado,'/',Imagen) END AS ImagenEmpleado
                FROM Empleados
              ) AS E ON E.NoEmpleado = CF.NoEmpleado
              WHERE idFeed = ? AND CF.Revisado = 1 AND CF.Autorizado = 1
              ORDER BY CF.Registro ASC";
        $res = $this->ExecuteQueryWithParam($q, [$user, $iFeed]);
        $cantR = count($res);
        $arrFinal = [];
        if ($cantR > 0) {
          for ($i=0; $i < $cantR ; $i++) {
            $idComentariosFeed = $res[$i]["idComentariosFeed"];
            if (!isset($arrFinal[$idComentariosFeed])) {
              $arrFinal[$idComentariosFeed] = $res[$i];
            }
            $arrFinal[$idComentariosFeed]["reactionsC"] = [];
          }
          $cantReaction = count($reactionC);
          if ($cantReaction > 0) {
            $inReaction = false;
            for ($i=0; $i < $cantReaction ; $i++) {
              if ($reactionC[$i]["NoEmpleado"] == $user && $inReaction == false) {
                $inReaction = true;
                $arrFinal[$reactionC[$i]["idComentariosFeed"]]["inReaction"] = true;
              }
              array_push($arrFinal[$reactionC[$i]["idComentariosFeed"]]["reactionsC"], $reactionC[$i]);
            }
          }
        }
        $arrFinal = array_merge($arrFinal);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $arrFinal
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function newFeedFromIndex ($nTitulo,$nDescripcion,$nHipervinculo) {
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");

        // Camino rápido: inserción directa usando la conexión actual.
        $qInsert = "INSERT INTO Feed (Titulo, Descripcion, NoEmpleado, Hipervinculo, Tipo, Registro, AutorizadoIndex) 
                    VALUES (?, ?, ?, ?, 'FED', NOW(), 1)";
        $lastId = $this->InsertAndGetId($qInsert, [$nTitulo, $nDescripcion, $NoEmpleado, $nHipervinculo]);
        if ($lastId) {
          return ["f_idFeed" => $lastId, "Titulo" => $nTitulo];
        }

        // Respaldo de compatibilidad: intentar SP legacy si el insert directo falla.
        try {
          $q = "CALL sp_newFedFromIndex (?,?,?,?)";
          $cons = $this->ProcedureWithParam($q,[$nTitulo,$nDescripcion,$NoEmpleado,$nHipervinculo]);
          if ($cons && isset($cons[0]["f_idFeed"])) {
            return $cons[0];
          }
        } catch (\Exception $spError) {
          error_log("SP sp_newFedFromIndex no disponible: " . $spError->getMessage());
        }
        
        return null;
        
      } catch (\Exception $e) {
        error_log("Error en newFeedFromIndex: " . $e->getMessage());
        return null;
      }
    }

    function makeComment($commentary, $i_Feed){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "CALL sp_makeCommentFeed(?,?,?)";
        $res = $this->ProcedureWithParam($q, [$i_Feed, $NoEmpleado, $commentary]);
        
        // --- Aprobar el comentario para que sea visible inmediatamente ---
        $ConUpd = new Conexiones();
        $qUpd = "UPDATE ComentariosFeed SET Revisado = 1, Autorizado = 1 WHERE idFeed = ? AND NoEmpleado = ? AND Revisado = 0";
        $ConUpd->ExecuteQueryWithParam($qUpd, [$i_Feed, $NoEmpleado]);
        // -----------------------------------------------------------------
        
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Comentario realizado",
          "Data" => $res[0]
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDataFeedSelected($feed){
      try {
        $insDetailFeed = new Feed();
        $resDetailFeed = $insDetailFeed->getDetailGeneralFeedSelected($feed);
        $insFilesFeed = new Feed();
        $resFilesFeed = $insFilesFeed->getFilesFeedSelected($feed);
        $insCommentsFeed = new Feed();
        $resCommentsFeed = $insCommentsFeed->getCommentsFeedSelectedDetail($feed);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => [
            "generalData" => $resDetailFeed,
            "filesData" => $resFilesFeed,
            "commentsData" => $resCommentsFeed
          ],
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDetailGeneralFeedSelected($feed){
      try {
        $q = "SELECT Titulo, Descripcion, Registro, Tipo
              FROM Feed
              WHERE idFeed = '$feed';";
        $res = $this->Select($q);
        $res[0]["Descripcion"] = str_replace('<br>','',$res[0]["Descripcion"]);
        return $res[0];
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getFilesFeedSelected($feed){
      try {
        $q = "SELECT Archivo
              FROM ArchivosFeed
              WHERE idFeed = '$feed';";
        $res = $this->Select($q);
        return $res[0];
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getCommentsFeedSelectedDetail($feed){
      try {
        $insReactionC = new Feed();
        $reactionC = $insReactionC->getReactionCommentsFeed($feed);
        $user = SessionManager::get("NoEmpleado");
        $q = "SELECT
                CF.idFeed,
                CF.NoEmpleado,
                CF.Comentario,
                CF.Registro,
                E.ImagenEmpleado,
                E.Nombre,
                CASE WHEN CF.NoEmpleado = ? THEN 1 ELSE 2 END AS TypeCommentUs,
                CF.idComentariosFeed
              FROM ComentariosFeed AS CF
              INNER JOIN (
                SELECT NoEmpleado, Nombre,
                CASE WHEN Imagen = '' OR Imagen IS NULL THEN CONCAT(0,'/0.png') ELSE CONCAT(NoEmpleado,'/',Imagen) END AS ImagenEmpleado
                FROM Empleados
              ) AS E ON E.NoEmpleado = CF.NoEmpleado
              WHERE idFeed = ? AND CF.Revisado = 1 AND CF.Autorizado = 1
              ORDER BY CF.Registro DESC";
        $res = $this->ExecuteQueryWithParam($q, [$user, $feed]);
        $cantR = count($res);
        $arrFinal = [];
        if ($cantR > 0) {
          for ($i=0; $i < $cantR ; $i++) {
            $idComentariosFeed = $res[$i]["idComentariosFeed"];
            if (!isset($arrFinal[$idComentariosFeed])) {
              $arrFinal[$idComentariosFeed] = $res[$i];
            }
            $arrFinal[$idComentariosFeed]["reactionsC"] = [];
          }
          $cantReaction = count($reactionC);
          if ($cantReaction > 0) {
            $inReaction = false;
            for ($i=0; $i < $cantReaction ; $i++) {
              if ($reactionC[$i]["NoEmpleado"] == $user && $inReaction == false) {
                $inReaction = true;
                $arrFinal[$reactionC[$i]["idComentariosFeed"]]["inReaction"] = true;
              }
              array_push($arrFinal[$reactionC[$i]["idComentariosFeed"]]["reactionsC"], $reactionC[$i]);
            }
          }
        }
        $arrFinal = array_merge($arrFinal);
        return $arrFinal;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getReactionCommentsFeed($feed){
    try {
      $q = "SELECT
                E.NoEmpleado,
                E.Nombre,
                RC.TipoReaccion,
                RC.idComentariosFeed,
                RC.idReaccionComentario
            FROM ReaccionComentario AS RC
            INNER JOIN Empleados AS E ON E.NoEmpleado = RC.NoEmpleado
            INNER JOIN ComentariosFeed AS CF ON CF.idComentariosFeed = RC.idComentariosFeed AND idFeed = ?
            GROUP BY RC.idReaccionComentario;";
      $res = $this->ExecuteQueryWithParam($q, [$feed]);
      return $res;
    } catch (\Exception $e) {
      return $e;
    }
  }

    function getCommentsRequestsAccepted(){
      try {
        $q = "SELECT
                CF.Comentario,
                E.NoEmpleado,
                E.Nombre,
                CF.Registro,
                CF.FechaRevisado,
                TO_BASE64(CF.idComentariosFeed) AS idComentariosFeed
              FROM ComentariosFeed AS CF
              INNER JOIN (
                SELECT NoEmpleado, Nombre
                  FROM Empleados
              ) AS E ON E.NoEmpleado = CF.NoEmpleado
              WHERE CF.Revisado = 1 AND CF.Autorizado = 1
              ORDER BY CF.Registro DESC";
        $res = $this->Select($q);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function rejectCommentsF($data){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $cant = count($data);
        for ($i=0; $i < $cant ; $i++) {
          $comm = base64_decode($data[$i]);
          $con = new Conexiones();
          $q = "CALL sp_rejectCommentsF(?,?)";
          $res = $con->ExecuteQueryWithParam($q, [$comm, $NoEmpleado]);
        }
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => "Los comentarios anteriormente aceptados han sido cancelados."
        ]);
      } catch (\Exception $e) {
        return $res;
      }
    }

    function reactsToComment($type, $comment){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "CALL sp_reactsToComment(?,?,?)";
        $res = $this->ProcedureWithParam($q, [$NoEmpleado, $type, $comment]);
        $cantRes = count($res);
        $inReaction = false;
        if ($cantRes > 0) {
          for ($i=0; $i < $cantRes ; $i++) {
            if ($res[$i]["NoEmpleado"] == $NoEmpleado) {
              $inReaction = true;
              break;
            }
          }
        }
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => [
            "inReaction" => $inReaction,
            "content" => $res
          ]
        ]);
      } catch (\Exception $e) {
        return $e;
      }
    }
  }
 ?>
