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

  // Cargar SessionManager
  if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
  } else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
  } else if (file_exists("../Backend/Session/SessionManager.php")) {
    require_once("../Backend/Session/SessionManager.php");
  }

  class Feed extends Conexiones {
    function newFeed ($nTitulo,$nDescripcion) {
      $NoEmpleado = SessionManager::get("NoEmpleado");
      $q = "CALL sp_NuevoFeed ('$nTitulo','$nDescripcion','$NoEmpleado')";
      $cons = $this->Procedure($q,array());
      return $cons;
    }
    function AddNombreArchivoFeed($idFeed,$Archivo){
      $q = "INSERT INTO ArchivosFeed (idFeed,Archivo) VALUES ('$idFeed','$Archivo')";
      $this->ExecuteQuery($q,array());
      return "1";
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

    function loadFeeds () {
        $NombreArchivo = "";

        $ficheros1  = scandir("../../Archivos/ImagesBirthday/",1);
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        for ($i=0; $i < sizeof($ficheros1) ; $i++) {
            $NombreArchivoBirthday = $ficheros1[0];
        }
        $ficheros2  = scandir("../../Archivos/ImagesAnniversary/",1);
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros2);
        }
        for ($i=0; $i < sizeof($ficheros2) ; $i++) {
            $NombreArchivoAnniversary = $ficheros2[0];
        }
      $NoEmpleado = 88;//($_COOKIE["NoEmpleado"]);
      $DatosComentarios = [];
      $ArrayRetorno = [];
      $q = "SELECT * FROM  (
                    SELECT F.Hipervinculo,F.idFeed,F.Titulo,REPLACE(F.Descripcion,'<br>','\n') as Descripcion,F.Registro,'$NombreArchivoBirthday' as Archivo,'KLYNS' as Nombre,'0' AS NoEmpleado,'0.png' as Imagen,
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
                    where F.Tipo = 'CMP' AND date_format(F.Registro,'%m-%d') = date_format(NOW(),'%m-%d')
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC
                    ) AS TABLA1
                    UNION ALL
        SELECT * FROM (SELECT F.Hipervinculo,F.idFeed,F.Titulo,REPLACE(F.Descripcion,'<br>','\n') as Descripcion,F.Registro,'$NombreArchivoAnniversary' as Archivo,'KLYNS' as Nombre,'0' AS NoEmpleado,'0.png' as Imagen,
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
                    where F.Tipo = 'ANY' AND date_format(F.Registro,'%m-%d') = date_format(NOW(),'%m-%d')
                    GROUP BY F.idFeed
                    ORDER BY F.Registro DESC) AS TABLA2
                    UNION ALL
        SELECT * FROM (
                    SELECT F.Hipervinculo,F.idFeed,F.Titulo,F.Descripcion,F.Registro,AF.Archivo,E.Nombre,E.NoEmpleado,E.Imagen,
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
                    LEFT JOIN ComentariosFeed AS CF ON CF.idFeed = F.idFeed
                    LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                    where F.Tipo = 'FED'
                    GROUP BY F.idFeed
                    having DDias < 45
                    ORDER BY F.Registro DESC) AS TABLA3;";
            $cons = $this->Select($q,array());
            for ($i=0; $i < sizeof($cons) ; $i++) {
              $Conexiones2 = new Conexiones();
              $Conexiones3 = new Conexiones();
              $idFeed = $cons[$i]["idFeed"];
              $q2 = "SELECT CF.NoEmpleado,CF.Comentario,CF.Registro,E.Nombre,E.Email FROM ComentariosFeed AS CF
                    INNER JOIN Empleados AS E ON E.NoEmpleado = CF.NoEmpleado
                    WHERE idFeed = '$idFeed'
                    ORDER BY CF.Registro DESC;";
              $cons2 = $Conexiones2->Select($q2,array());
              $q3 = "SELECT (SELECT count(idFeed) FROM ReaccionFeed WHERE idTipoReaccion = 1 AND  idFeed = '$idFeed') AS CantidadMeGusta,
              (SELECT count(idFeed) FROM ReaccionFeed WHERE idTipoReaccion = 2 AND  idFeed = '$idFeed') AS CantidadFelicitaciones,
              (SELECT count(idFeed) FROM ComentariosFeed WHERE idFeed = '$idFeed') AS CantidadComentarios,
              (SELECT count(MGF.idFeed) FROM Feed AS F LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                WHERE  MGF.idFeed = '$idFeed' and MGF.NoEmpleado = '$NoEmpleado' and idTipoReaccion = 1) AS MeGusta,
              (SELECT count(MGF.idFeed) FROM Feed AS F LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                WHERE  MGF.idFeed = '$idFeed' and MGF.NoEmpleado = '$NoEmpleado' and idTipoReaccion = 2) AS Felicitacion";
              $cons3 = $Conexiones3->Select($q3,array());
              $ArrayComentarios = [];
              for ($j=0; $j < sizeof($cons2) ; $j++) {
                array_push($ArrayComentarios,[
                  "FeedId" => $cons[$i]["idFeed"],
                  "ComentarioFeed" => $cons2[$j]["Comentario"],
                  "FechaComentario" => $cons2[$j]["Registro"],
                  "NoEmpleadoComentario" => $cons2[$j]["NoEmpleado"],
                  "NombreEmpleadoComentario" => $cons2[$j]["Nombre"],
                  "EmailEmpleadoComentario" => $cons2[$j]["Email"]
                ]
                );
              }
                array_push($ArrayRetorno,[
                "idFeed" => $cons[$i]["idFeed"],
                "Titulo" => $cons[$i]["Titulo"],
                "Descripcion" => str_replace('<br />','',$cons[$i]["Descripcion"]),
                "Registro" => $cons[$i]["Registro"],
                "Archivo" => $cons[$i]["Archivo"],
                "Nombre" => $cons[$i]["Nombre"],
                "NoEmpleado" => $cons[$i]["NoEmpleado"],
                "Imagen" => $cons[$i]["Imagen"],
                "DMinutos" => $cons[$i]["DMinutos"],
                "DHoras" => $cons[$i]["DHoras"],
                "DDias" => $cons[$i]["DDias"],
                "ArrayComentarios" => $ArrayComentarios,
                "CantidadComentarios" => $cons3[0]["CantidadComentarios"],
                "CantidadMeGusta" => $cons3[0]["CantidadMeGusta"],
                "MeGusta" => $cons3[0]["MeGusta"],
                "CantidadFelicitaciones" => $cons3[0]["CantidadFelicitaciones"],
                "Felicitacion" => $cons3[0]["Felicitacion"],
                "Tipo" => $cons[$i]["Tipo"],
                "DiferenciaRegistro" => $cons[$i]["DiferenciaRegistro"],
                "Hipervinculo" => $cons[$i]["Hipervinculo"]
              ]);
            }
      // return json_encode($this->Select($q,array()));
      return '{ "ListadoFeeds": '.json_encode($ArrayRetorno)."}";
    }

    function addComentariosFeed ($NoEmpleado,$idFeed,$Comentario) {
      try {

        $q = "INSERT INTO ComentariosFeed (idFeed,NoEmpleado,Comentario,Registro) VALUES ('$idFeed','$NoEmpleado','$Comentario',NOW());";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }

    function MeGustaFeed ($NoEmpleado, $idFeed,$idTipoReaccion) {
      try {

        $q = "SELECT * FROM ReaccionFeed WHERE idFeed = '$idFeed' AND NoEmpleado = '$NoEmpleado' and idTipoReaccion = '$idTipoReaccion'";
        $cons = $this->Select($q,array());
        $Conexiones2 = new Conexiones();
        if (sizeof($cons) > 0) {
          $q2 = "DELETE FROM ReaccionFeed WHERE idFeed = '$idFeed' AND NoEmpleado = '$NoEmpleado' and idTipoReaccion = '$idTipoReaccion';";
        }else {
          $q2 = "INSERT INTO ReaccionFeed (idFeed,NoEmpleado,Registro,idTipoReaccion) VALUES ('$idFeed','$NoEmpleado',now(),'$idTipoReaccion');";
        }
        $Conexiones2->ExecuteQuery($q2,array());

        // $FeedReaccion = new Feed();
        // $ArrDatosReaccion = [];
        // $ArrRegistros = $FeedReaccion->getEmpleadosReaccionFeed($idFeed);

        $Conexiones3 = new Conexiones();
        $q3 = "SELECT (SELECT count(idFeed) FROM ReaccionFeed WHERE idTipoReaccion = 1 AND  idFeed = '$idFeed') AS CantidadMeGusta,
                (SELECT count(idFeed) FROM ReaccionFeed WHERE idTipoReaccion = 2 AND  idFeed = '$idFeed') AS CantidadFelicitaciones,
                (SELECT count(idFeed) FROM ComentariosFeed WHERE idFeed = '$idFeed') AS CantidadComentarios,
                (SELECT count(MGF.idFeed) FROM Feed AS F LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                  WHERE  MGF.idFeed = '$idFeed' and MGF.NoEmpleado = '$NoEmpleado' and idTipoReaccion = 1) AS MeGusta,
                (SELECT count(MGF.idFeed) FROM Feed AS F LEFT JOIN ReaccionFeed AS MGF ON MGF.idFeed = F.idFeed
                  WHERE  MGF.idFeed = '$idFeed' and MGF.NoEmpleado = '$NoEmpleado' and idTipoReaccion = 2) AS Felicitacion";
        $cons3 = $Conexiones3->Select($q3,array());
        // $Datos = [
        //   "TipoReaccion" => $idTipoReaccion,
        //   // "EmpleadosReaccion" => $ArrRegistros,
        //   "CantidadMeGusta" => $cons3[0]["CantidadMeGusta"],
        //   "CantidadFelicitaciones" => $cons3[0]["CantidadFelicitaciones"],
        //   "MeGusta" => $cons3[0]["MeGusta"],
        //   "Felicitacion" => $cons3[0]["Felicitacion"],
        //   "IdFeed" => $idFeed
        // ];
        // array_push($ArrayRetorno,$Datos);
        return json_encode($cons3[0]["CantidadMeGusta"]);
      } catch (\Exception $e) {
        return "0";
      }
    }

    function getEmpleadosReaccionFeed ($idFeed) {
      $q = "SELECT E.Nombre,RF.idTipoReaccion FROM ReaccionFeed AS RF
              INNER JOIN Empleados AS E ON E.NoEmpleado = RF.NoEmpleado
              WHERE idFeed = '$idFeed';";
      $cons = $this->Select($q,array());
      return $cons;
    }


    function insertaFeedBirthday () {
      $q = "CALL spbirthdayFeed()";
      $this->Procedure($q,array());
      return "1";
    }
    function insertaFeedAnniversario () {
      $q = "CALL spAnniversaryFeed()";
      $this->Procedure($q,array());
      return "1";
    }

    function makeComment($commentary, $i_Feed, $NoEmpleado){
      try {
        $q = "CALL sp_makeCommentFeed(?,?,?)";
        $res = $this->ProcedureWithParam($q, [$i_Feed, $NoEmpleado, $commentary]);
        return "1";
      } catch (\Exception $e) {
        return $e;
      }
    }

    function newFeedFromIndex ($nTitulo,$nDescripcion,$nHipervinculo) {
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "CALL sp_newFedFromIndex (?,?,?,?)";
        $cons = $this->ProcedureWithParam($q,[$nTitulo,$nDescripcion,$NoEmpleado,$nHipervinculo]);
        $MMensaje = $cons[0]["Titulo"];
        // $NewInstFeed = new Feed();
        // $NewInstFeed->sendPushNotificationToSegment($MMensaje);
        // $NewInstFeed2 = new Feed();
        // $NewInstFeed2->NotificarNuevoFeedByMail();
        return 1;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getCommentsFeedSelected($iFeed, $user){
      try {
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
              ORDER BY CF.Registro DESC";
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
        return '{ "ListadoComentarios": '.json_encode($arrFinal)."}";
      } catch (\Exception $e) {
        return $e;
      }
    }

    function reactsToComment($type, $comment, $NoEmpleado){
      try {
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
        return 1;
      } catch (\Exception $e) {
        return $e;
      }
    }
  }
 ?>
