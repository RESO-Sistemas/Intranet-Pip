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
      // Query optimizada: subconsultas TIMESTAMPDIFF convertidas a expresiones directas
      // eliminando sub-consultas correlacionadas redundantes por fila
      $q = "SELECT * FROM  (
                    SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,'$NombreArchivoBirthday' as Archivo,'PIP By Lugo' as Nombre,'0' AS NoEmpleado,'0.png' as Imagen,
                    TIMESTAMPDIFF(MINUTE,F.Registro,NOW()) as DMinutos,
                    TIMESTAMPDIFF(HOUR,F.Registro,NOW()) as DHoras,
                    TIMESTAMPDIFF(DAY,F.Registro,NOW()) as DDias,
                    F.Tipo,
                    CASE
                      WHEN TIMESTAMPDIFF(MINUTE,F.Registro,NOW()) < 60
                        THEN CONCAT(TIMESTAMPDIFF(MINUTE,F.Registro,NOW()), ' Minutos')
                      WHEN TIMESTAMPDIFF(HOUR,F.Registro,NOW()) < 24
                        THEN CONCAT(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Horas')
                      ELSE CONCAT(TIMESTAMPDIFF(DAY,F.Registro,NOW()), ' Dias')
                    END as DiferenciaRegistro
                    FROM Feed AS F
                    where F.Tipo = 'CMP' AND date_format(F.Registro,'%m-%d') = date_format(NOW(),'%m-%d') AND YEAR(F.Registro) = '$actYear'
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC
                    ) AS TABLA1
                    UNION ALL
        SELECT * FROM (SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,'$NombreArchivoAnniversary' as Archivo,'PIP By Lugo' as Nombre,'0' AS NoEmpleado,'0.png' as Imagen,
                    TIMESTAMPDIFF(MINUTE,F.Registro,NOW()) as DMinutos,
                    TIMESTAMPDIFF(HOUR,F.Registro,NOW()) as DHoras,
                    TIMESTAMPDIFF(DAY,F.Registro,NOW()) as DDias,
                    F.Tipo,
                    CASE
                      WHEN TIMESTAMPDIFF(MINUTE,F.Registro,NOW()) < 60
                        THEN CONCAT(TIMESTAMPDIFF(MINUTE,F.Registro,NOW()), ' Minutos')
                      WHEN TIMESTAMPDIFF(HOUR,F.Registro,NOW()) < 24
                        THEN CONCAT(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Horas')
                      ELSE CONCAT(TIMESTAMPDIFF(DAY,F.Registro,NOW()), ' Dias')
                    END as DiferenciaRegistro
                    FROM Feed AS F
                    where F.Tipo = 'ANY' AND date_format(F.Registro,'%m-%d') = date_format(NOW(),'%m-%d') AND YEAR(F.Registro) = '$actYear'
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC) AS TABLA2
                    UNION ALL
        SELECT * FROM (
                    SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,GROUP_CONCAT(AF.Archivo) as Archivo,E.Nombre,E.NoEmpleado,E.Imagen,
                    TIMESTAMPDIFF(MINUTE,F.Registro,NOW()) as DMinutos,
                    TIMESTAMPDIFF(HOUR,F.Registro,NOW()) as DHoras,
                    TIMESTAMPDIFF(DAY,F.Registro,NOW()) as DDias,
                    F.Tipo,
                    CASE
                      WHEN TIMESTAMPDIFF(MINUTE,F.Registro,NOW()) < 60
                        THEN CONCAT(TIMESTAMPDIFF(MINUTE,F.Registro,NOW()), ' Minutos')
                      WHEN TIMESTAMPDIFF(HOUR,F.Registro,NOW()) < 24
                        THEN CONCAT(TIMESTAMPDIFF(HOUR,F.Registro,NOW()), ' Horas')
                      ELSE CONCAT(TIMESTAMPDIFF(DAY,F.Registro,NOW()), ' Dias')
                    END as DiferenciaRegistro
                    FROM Feed AS F
                    LEFT JOIN ArchivosFeed AS AF ON AF.idFeed = F.idFeed
                    INNER JOIN Empleados AS E ON E.NoEmpleado = F.NoEmpleado
                    where (F.Tipo = 'FED' OR (F.Tipo = 'FIN' AND F.AutorizadoIndex = 1))
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
            for ($i = 0; $i < sizeof($cons); $i++) {
              $feedIds[] = intval($cons[$i]["idFeed"]);
            }
            $feedIdsStr = implode(",", $feedIds);

            // ── OPTIMIZACION: reutilizar $this en lugar de crear new Conexiones() ──
            // Antes se abrían 6 conexiones TCP nuevas al servidor remoto por cada llamada.
            // Ahora todo usa la misma conexion PDO ya establecida ($this->dbh).

            $commentsByFeed = [];
            if ($lightweight !== 1) {
              // BATCH comentarios completos (solo en modo normal)
              $q2 = "SELECT CF.idFeed, CF.NoEmpleado, CF.Comentario, CF.Registro, E.Nombre, E.Email 
                     FROM ComentariosFeed AS CF
                     INNER JOIN Empleados AS E ON E.NoEmpleado = CF.NoEmpleado
                     WHERE CF.idFeed IN ($feedIdsStr) AND CF.Autorizado = 1
                     ORDER BY CF.Registro DESC";
              $allComments = $this->Select($q2);
              if ($allComments && is_array($allComments)) {
                foreach ($allComments as $row) {
                  $fid = $row["idFeed"];
                  if (!isset($commentsByFeed[$fid])) $commentsByFeed[$fid] = [];
                  $commentsByFeed[$fid][] = [
                    "FeedId"                   => $fid,
                    "ComentarioFeed"           => $row["Comentario"],
                    "FechaComentario"          => $row["Registro"],
                    "NoEmpleadoComentario"     => $row["NoEmpleado"],
                    "NombreEmpleadoComentario" => $row["Nombre"],
                    "EmailEmpleadoComentario"  => $row["Email"]
                  ];
                }
              }
            }

            // ── QUERY CONSOLIDADA: reacciones + reaccion usuario + contadores comentarios ──
            // Reemplaza 4 queries separadas (conn2, conn3, conn4, conn5) con 1 sola query.
            $qConsolidada = "SELECT
                FI.idFeed,
                COALESCE(R.CantidadMeGusta, 0) AS CantidadMeGusta,
                COALESCE(R.CantidadFelicitaciones, 0) AS CantidadFelicitaciones,
                COALESCE(R.MeGusta_User, 0) AS MeGusta_User,
                COALESCE(R.Felicitacion_User, 0) AS Felicitacion_User,
                COALESCE(C.CantidadComentarios, 0) AS CantidadComentarios
              FROM (SELECT DISTINCT idFeed FROM Feed WHERE idFeed IN ($feedIdsStr)) AS FI
              LEFT JOIN (
                SELECT 
                  idFeed,
                  SUM(CASE WHEN idTipoReaccion = 1 THEN 1 ELSE 0 END) AS CantidadMeGusta,
                  SUM(CASE WHEN idTipoReaccion = 2 THEN 1 ELSE 0 END) AS CantidadFelicitaciones,
                  MAX(CASE WHEN NoEmpleado = $NoEmpleado AND idTipoReaccion = 1 THEN 1 ELSE 0 END) AS MeGusta_User,
                  MAX(CASE WHEN NoEmpleado = $NoEmpleado AND idTipoReaccion = 2 THEN 1 ELSE 0 END) AS Felicitacion_User
                FROM ReaccionFeed
                WHERE idFeed IN ($feedIdsStr) AND NoEmpleado <> 0
                GROUP BY idFeed
              ) AS R ON R.idFeed = FI.idFeed
              LEFT JOIN (
                SELECT 
                  idFeed,
                  COUNT(*) AS CantidadComentarios
                FROM ComentariosFeed
                WHERE idFeed IN ($feedIdsStr) AND Autorizado = 1
                GROUP BY idFeed
              ) AS C ON C.idFeed = FI.idFeed";
            $consolidada = $this->Select($qConsolidada);
            $reactionCountsByFeed = [];
            $userReactionsByFeed  = [];
            $commentCountsByFeed  = [];
            if ($consolidada && is_array($consolidada)) {
              foreach ($consolidada as $row) {
                $fid = $row["idFeed"];
                $reactionCountsByFeed[$fid] = [
                  "CantidadMeGusta"       => $row["CantidadMeGusta"],
                  "CantidadFelicitaciones" => $row["CantidadFelicitaciones"]
                ];
                if ($row["MeGusta_User"]) $userReactionsByFeed[$fid][] = 1;
                if ($row["Felicitacion_User"]) $userReactionsByFeed[$fid][] = 2;
                $commentCountsByFeed[$fid] = $row["CantidadComentarios"];
              }
            }

            // ── QUERY empleados que reaccionaron (necesita JOIN separado) ──
            $q4r = "SELECT RF.idFeed, E.Nombre, RF.idTipoReaccion
                    FROM ReaccionFeed AS RF
                    INNER JOIN Empleados AS E ON E.NoEmpleado = RF.NoEmpleado
                    WHERE RF.idFeed IN ($feedIdsStr) AND RF.NoEmpleado <> 0";
            $allEmpReactions = $this->Select($q4r);
            $empReactionsByFeed = [];
            if ($allEmpReactions && is_array($allEmpReactions)) {
              foreach ($allEmpReactions as $row) {
                $fid = $row["idFeed"];
                if (!isset($empReactionsByFeed[$fid])) $empReactionsByFeed[$fid] = [];
                $empReactionsByFeed[$fid][] = [
                  "EmpleadoReaccion" => $row["Nombre"],
                  "TipoReaccion"     => $row["idTipoReaccion"]
                ];
              }
            }

            // ── QUERY archivos (Data URI, BLOB o disco) ──
            $q4a = "SELECT idArchivosFeed, idFeed, Archivo,
                    (CASE WHEN Content IS NOT NULL AND LENGTH(Content) > 0 THEN 1 ELSE 0 END) AS hasBlob,
                    (CASE WHEN Archivo LIKE 'data:image/%' THEN 1 ELSE 0 END) AS isDataUri
                    FROM ArchivosFeed WHERE idFeed IN ($feedIdsStr)";
            $allArchivos = $this->Select($q4a);
            $archivosByFeed = [];
            if ($allArchivos && is_array($allArchivos)) {
              foreach ($allArchivos as $row) {
                $fid = $row["idFeed"];
                if (!isset($archivosByFeed[$fid])) $archivosByFeed[$fid] = [];
                $archivosByFeed[$fid][] = [
                  "idArchivosFeed" => $row["idArchivosFeed"],
                  "Archivo"        => $row["Archivo"],
                  "hasBlob"        => intval($row["hasBlob"]),
                  "isDataUri"      => intval($row["isDataUri"])
                ];
              }
            }

            // Armar el array de retorno usando los datos ya cargados
            for ($i = 0; $i < sizeof($cons); $i++) {
              $idFeed = $cons[$i]["idFeed"];
              $rc    = $reactionCountsByFeed[$idFeed] ?? ["CantidadMeGusta" => 0, "CantidadFelicitaciones" => 0];
              $userR = $userReactionsByFeed[$idFeed]  ?? [];

              $ArrayRetorno[] = [
                "idFeed"               => $idFeed,
                "Titulo"               => $cons[$i]["Titulo"],
                "Descripcion"          => $cons[$i]["Descripcion"],
                "Registro"             => $cons[$i]["Registro"],
                "Archivo"              => $cons[$i]["Archivo"],
                "ArrayArchivos"        => $archivosByFeed[$idFeed]       ?? [],
                "Nombre"               => $cons[$i]["Nombre"],
                "NoEmpleado"           => $cons[$i]["NoEmpleado"],
                "Imagen"               => $cons[$i]["Imagen"],
                "DMinutos"             => $cons[$i]["DMinutos"],
                "DHoras"               => $cons[$i]["DHoras"],
                "DDias"                => $cons[$i]["DDias"],
                "ArrayComentarios"     => $commentsByFeed[$idFeed]       ?? [],
                "CantidadComentarios"  => $commentCountsByFeed[$idFeed]  ?? 0,
                "CantidadMeGusta"      => $rc["CantidadMeGusta"],
                "MeGusta"              => in_array(1, $userR) ? 1 : 0,
                "CantidadFelicitaciones" => $rc["CantidadFelicitaciones"],
                "Felicitacion"         => in_array(2, $userR) ? 1 : 0,
                "Tipo"                 => $cons[$i]["Tipo"],
                "DiferenciaRegistro"   => $cons[$i]["DiferenciaRegistro"],
                "Hipervinculo"         => $cons[$i]["Hipervinculo"],
                "EmpleadosReaccion"    => $empReactionsByFeed[$idFeed]   ?? []
              ];
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
        // Reutilizar $this en lugar de new Conexiones() para evitar conexion TCP extra
        $q = "SELECT * FROM ReaccionFeed WHERE idFeed = '$idFeed' AND NoEmpleado = '$NoEmpleado' and idTipoReaccion = '$idTipoReaccion'";
        $cons = $this->Select($q,array());
        if (sizeof($cons) > 0) {
          $q2 = "DELETE FROM ReaccionFeed WHERE idFeed = '$idFeed' AND NoEmpleado = '$NoEmpleado' and idTipoReaccion = '$idTipoReaccion';";
        }else {
          $q2 = "INSERT INTO ReaccionFeed (idFeed,NoEmpleado,Registro,idTipoReaccion) VALUES ('$idFeed','$NoEmpleado',now(),'$idTipoReaccion');";
        }
        $this->ExecuteQuery($q2, array());

        // Obtener empleados que reaccionaron (reutiliza $this)
        $ArrRegistros = $this->getEmpleadosReaccionFeed($idFeed);

        // Query consolidada: reemplaza las 5 subconsultas correlacionadas
        // por una sola query con LEFT JOINs usando $this
        $q3 = "SELECT
                 SUM(CASE WHEN RF.idTipoReaccion = 1 AND RF.NoEmpleado <> 0 THEN 1 ELSE 0 END) AS CantidadMeGusta,
                 SUM(CASE WHEN RF.idTipoReaccion = 2 AND RF.NoEmpleado <> 0 THEN 1 ELSE 0 END) AS CantidadFelicitaciones,
                 COUNT(DISTINCT CF.idComentariosFeed) AS CantidadComentarios,
                 MAX(CASE WHEN RF.NoEmpleado = '$NoEmpleado' AND RF.idTipoReaccion = 1 THEN 1 ELSE 0 END) AS MeGusta,
                 MAX(CASE WHEN RF.NoEmpleado = '$NoEmpleado' AND RF.idTipoReaccion = 2 THEN 1 ELSE 0 END) AS Felicitacion
               FROM Feed F
               LEFT JOIN ReaccionFeed RF ON RF.idFeed = F.idFeed
               LEFT JOIN ComentariosFeed CF ON CF.idFeed = F.idFeed
               WHERE F.idFeed = '$idFeed'";
        $cons3 = $this->Select($q3);

        $Datos = [
          "TipoReaccion"          => $idTipoReaccion,
          "EmpleadosReaccion"     => $ArrRegistros,
          "CantidadMeGusta"       => $cons3[0]["CantidadMeGusta"],
          "CantidadFelicitaciones" => $cons3[0]["CantidadFelicitaciones"],
          "CantidadComentarios"   => $cons3[0]["CantidadComentarios"],
          "MeGusta"               => $cons3[0]["MeGusta"],
          "Felicitacion"          => $cons3[0]["Felicitacion"],
          "IdFeed"                => $idFeed
        ];
        array_push($ArrayRetorno, $Datos);
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
      $q = "SELECT
              F.idFeed,
              F.Titulo,
              LEFT(F.Descripcion, 120) AS Descripcion,
              F.Tipo,
              F.AutorizadoIndex,
              F.Registro,
              F.NoEmpleado,
              E.Nombre AS NombreEmpleado,
              (SELECT COUNT(*) FROM ComentariosFeed CF WHERE CF.idFeed = F.idFeed AND CF.Autorizado = 1) AS TotalComentarios,
              (SELECT COUNT(*) FROM ReaccionFeed RF WHERE RF.idFeed = F.idFeed) AS TotalReacciones
            FROM Feed F
            LEFT JOIN Empleados E ON E.NoEmpleado = F.NoEmpleado
            WHERE F.Tipo IN ('FED', 'FIN')
            ORDER BY F.idFeed DESC;";
      return json_encode($this->Select($q,array()));
    }

    function setAutorizadoFeed($idFeed, $value) {
      try {
        $idFeed = base64_decode($idFeed);
        $value  = intval($value) === 1 ? 1 : 0;
        $q = "UPDATE Feed SET AutorizadoIndex = ? WHERE idFeed = ? AND Tipo = 'FIN'";
        $this->ExecuteQueryWithParam($q, [$value, $idFeed]);
        return json_encode(["Resultado" => true, "Msg" => $value === 1 ? "Publicación activada." : "Publicación desactivada."]);
      } catch (\Exception $e) {
        error_log("Error en setAutorizadoFeed: " . $e->getMessage());
        return json_encode(["Resultado" => false, "Msg" => "Error al cambiar estado."]);
      }
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
        // Query optimizada: obtiene comentarios Y reacciones en una sola consulta
        // usando LEFT JOIN, evitando el doble viaje a la BD
        $q = "SELECT
                CF.idFeed,
                CF.NoEmpleado,
                CF.Comentario,
                CF.Registro,
                CASE WHEN E.Imagen = '' OR E.Imagen IS NULL
                  THEN CONCAT(0,'/0.png')
                  ELSE CONCAT(E.NoEmpleado,'/',E.Imagen)
                END AS ImagenEmpleado,
                E.Nombre,
                CASE WHEN CF.NoEmpleado = ? THEN 1 ELSE 2 END AS TypeCommentUs,
                CF.idComentariosFeed,
                RC.NoEmpleado  AS RC_NoEmpleado,
                RE.Nombre       AS RC_Nombre,
                RC.TipoReaccion AS RC_TipoReaccion,
                RC.idReaccionComentario
              FROM ComentariosFeed AS CF
              INNER JOIN Empleados AS E ON E.NoEmpleado = CF.NoEmpleado
              LEFT JOIN ReaccionComentario AS RC ON RC.idComentariosFeed = CF.idComentariosFeed
              LEFT JOIN Empleados AS RE ON RE.NoEmpleado = RC.NoEmpleado
              WHERE CF.idFeed = ? AND CF.Revisado = 1 AND CF.Autorizado = 1
              ORDER BY CF.Registro ASC, RC.idReaccionComentario ASC";
        $res = $this->ExecuteQueryWithParam($q, [$user, $iFeed]);
        $cantR = count($res) ?: 0;
        $arrFinal = [];

        for ($i = 0; $i < $cantR; $i++) {
          $idC = $res[$i]["idComentariosFeed"];
          if (!isset($arrFinal[$idC])) {
            $arrFinal[$idC] = [
              "idFeed"           => $res[$i]["idFeed"],
              "NoEmpleado"       => $res[$i]["NoEmpleado"],
              "Comentario"       => $res[$i]["Comentario"],
              "Registro"         => $res[$i]["Registro"],
              "ImagenEmpleado"   => $res[$i]["ImagenEmpleado"],
              "Nombre"           => $res[$i]["Nombre"],
              "TypeCommentUs"    => $res[$i]["TypeCommentUs"],
              "idComentariosFeed" => $idC,
              "inReaction"       => false,
              "reactionsC"       => []
            ];
          }
          // Agregar reacción si existe en esta fila
          if ($res[$i]["idReaccionComentario"]) {
            if ($res[$i]["RC_NoEmpleado"] == $user) {
              $arrFinal[$idC]["inReaction"] = true;
            }
            $arrFinal[$idC]["reactionsC"][] = [
              "NoEmpleado"         => $res[$i]["RC_NoEmpleado"],
              "Nombre"             => $res[$i]["RC_Nombre"],
              "TipoReaccion"       => $res[$i]["RC_TipoReaccion"],
              "idComentariosFeed"  => $idC,
              "idReaccionComentario" => $res[$i]["idReaccionComentario"]
            ];
          }
        }

        $arrFinal = array_values($arrFinal);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data"      => $arrFinal
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        error_log("Error en getCommentsFeedSelected: " . $e->getMessage());
        return json_encode(["Resultado" => false, "Data" => []]);
      }
    }

    function newFeedFromIndex ($nTitulo,$nDescripcion,$nHipervinculo) {
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");

        // Camino rápido: inserción directa usando la conexión actual.
        $qInsert = "INSERT INTO Feed (Titulo, Descripcion, NoEmpleado, Hipervinculo, Tipo, Registro, AutorizadoIndex)
                    VALUES (?, ?, ?, ?, 'FIN', NOW(), 0)";
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
        // Inserción optimizada: una sola query con Revisado=1, Autorizado=1
        // Elimina el double-trip (SP + UPDATE) que causaba lentitud al comentar
        $qInsert = "INSERT INTO ComentariosFeed (idFeed, NoEmpleado, Comentario, Registro, Revisado, Autorizado) 
                    VALUES (?, ?, ?, NOW(), 1, 1)";
        $this->ExecuteQueryWithParam($qInsert, [$i_Feed, $NoEmpleado, $commentary]);
        
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Comentario realizado"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        error_log("Error en makeComment: " . $e->getMessage());
        return json_encode(["Resultado" => false, "Msg" => "Error al guardar el comentario."]);
      }
    }

    function getDataFeedSelected($feed){
      try {
        // Reutilizar $this en lugar de crear 3 instancias Feed() (3 conexiones TCP)
        $resDetailFeed  = $this->getDetailGeneralFeedSelected($feed);
        $resFilesFeed   = $this->getFilesFeedSelected($feed);
        $resCommentsFeed = $this->getCommentsFeedSelectedDetail($feed);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => [
            "generalData"  => $resDetailFeed,
            "filesData"    => $resFilesFeed,
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
        $user = SessionManager::get("NoEmpleado");
        // Query unificada: comentarios + reacciones en un solo round-trip
        $q = "SELECT
                CF.idFeed,
                CF.NoEmpleado,
                CF.Comentario,
                CF.Registro,
                E.ImagenEmpleado,
                E.Nombre,
                CASE WHEN CF.NoEmpleado = ? THEN 1 ELSE 2 END AS TypeCommentUs,
                CF.idComentariosFeed,
                RC.NoEmpleado    AS RC_NoEmpleado,
                RE.Nombre         AS RC_Nombre,
                RC.TipoReaccion   AS RC_TipoReaccion,
                RC.idReaccionComentario
              FROM ComentariosFeed AS CF
              INNER JOIN (
                SELECT NoEmpleado, Nombre,
                  CASE WHEN Imagen = '' OR Imagen IS NULL
                    THEN CONCAT(0,'/0.png')
                    ELSE CONCAT(NoEmpleado,'/',Imagen)
                  END AS ImagenEmpleado
                FROM Empleados
              ) AS E ON E.NoEmpleado = CF.NoEmpleado
              LEFT JOIN ReaccionComentario AS RC ON RC.idComentariosFeed = CF.idComentariosFeed
              LEFT JOIN Empleados AS RE ON RE.NoEmpleado = RC.NoEmpleado
              WHERE CF.idFeed = ? AND CF.Revisado = 1 AND CF.Autorizado = 1
              ORDER BY CF.Registro DESC, RC.idReaccionComentario ASC";
        $res = $this->ExecuteQueryWithParam($q, [$user, $feed]);
        $cantR = count($res) ?: 0;
        $arrFinal = [];

        for ($i = 0; $i < $cantR; $i++) {
          $idC = $res[$i]["idComentariosFeed"];
          if (!isset($arrFinal[$idC])) {
            $arrFinal[$idC] = [
              "idFeed"            => $res[$i]["idFeed"],
              "NoEmpleado"        => $res[$i]["NoEmpleado"],
              "Comentario"        => $res[$i]["Comentario"],
              "Registro"          => $res[$i]["Registro"],
              "ImagenEmpleado"    => $res[$i]["ImagenEmpleado"],
              "Nombre"            => $res[$i]["Nombre"],
              "TypeCommentUs"     => $res[$i]["TypeCommentUs"],
              "idComentariosFeed" => $idC,
              "inReaction"        => false,
              "reactionsC"        => []
            ];
          }
          if ($res[$i]["idReaccionComentario"]) {
            if ($res[$i]["RC_NoEmpleado"] == $user) {
              $arrFinal[$idC]["inReaction"] = true;
            }
            $arrFinal[$idC]["reactionsC"][] = [
              "NoEmpleado"           => $res[$i]["RC_NoEmpleado"],
              "Nombre"               => $res[$i]["RC_Nombre"],
              "TipoReaccion"         => $res[$i]["RC_TipoReaccion"],
              "idComentariosFeed"    => $idC,
              "idReaccionComentario" => $res[$i]["idReaccionComentario"]
            ];
          }
        }
        return array_values($arrFinal);
      } catch (\Exception $e) {
        error_log("Error en getCommentsFeedSelectedDetail: " . $e->getMessage());
        return [];
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

    function getCommentsForAdmin($iFeed) {
      try {
        $q = "SELECT
                CF.idComentariosFeed,
                CF.Comentario,
                CF.Registro,
                CF.Autorizado,
                E.Nombre AS NombreEmpleado
              FROM ComentariosFeed AS CF
              INNER JOIN Empleados AS E ON E.NoEmpleado = CF.NoEmpleado
              WHERE CF.idFeed = ?
              ORDER BY CF.Registro DESC";
        $res = $this->ExecuteQueryWithParam($q, [$iFeed]);
        return json_encode(["Resultado" => true, "Data" => $res]);
      } catch (\Exception $e) {
        error_log("Error getCommentsForAdmin: " . $e->getMessage());
        return json_encode(["Resultado" => false, "Data" => []]);
      }
    }

    function toggleCommentStatus($idComentario, $status) {
      try {
        $q = "UPDATE ComentariosFeed SET Autorizado = ?, Revisado = ? WHERE idComentariosFeed = ?";
        $this->ExecuteQueryWithParam($q, [$status, $status, $idComentario]);
        return json_encode(["Resultado" => true]);
      } catch (\Exception $e) {
        error_log("Error toggleCommentStatus: " . $e->getMessage());
        return json_encode(["Resultado" => false, "Msg" => "Error al actualizar estado."]);
      }
    }
  }
 ?>
