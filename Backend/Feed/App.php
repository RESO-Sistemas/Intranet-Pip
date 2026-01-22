<?php
  include("Feed.php");
  $Feed = new Feed();
  $op = $_POST["op"];

  if ($op == "newFeed") {
    $nTitulo = $_POST["txtTitulo"];
    $nDescripcion = nl2br($_POST["txtDescripcion"]);
    $nHipervinculo = $_POST["txtHV"];
    $ContadorArchivos = 0;
    $cons = $Feed->newFeed($nTitulo,$nDescripcion,$nHipervinculo);
    $LAST_ID_FEED = $cons[0]["LAST_ID_FEED"];
    $fechaActual = date('d-m-Y H:i:s');

    $carpeta = "../../Archivos/Feed/$LAST_ID_FEED/";
    if (sizeof($_FILES) > 0) {
        $NombreArchivo = "";
        for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
            $ContadorArchivos ++;
            if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
                $namefile = $_FILES['ArrArchivos']['name'][$i];
                $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
                $extValida = array("png","jpeg","jpg");
                if (in_array($ext,$extValida)) {
                    $path = $carpeta.$LAST_ID_FEED.$fechaActual.$ContadorArchivos.".".$ext;
                    $nameArchivo ="$LAST_ID_FEED$fechaActual$ContadorArchivos.$ext";
                    $path2 = $carpeta;

                    if (!file_exists($path2)) {
                      mkdir($path2, 0777, true);
                    }
                    if (move_uploaded_file($_FILES['ArrArchivos']['tmp_name'][$i],$path)) {
                        $NombreArchivo .= $nameArchivo.",";
                      }
                }
            }
        }
        $NombreArchivo = substr($NombreArchivo, 0, -1);
        $Feed2 = new Feed();
        $Feed2->AddNombreArchivoFeed($LAST_ID_FEED,$NombreArchivo);
        echo "1";
    } else {
      echo "1";
    }
  }

  if ($op == "loadFeeds") {
    echo trim($Feed->loadFeeds());
  }

  if ($op == "addComentariosFeed") {
    $idFeed = $_POST["idFeed"];
    $Comentario = $_POST["Comentario"];
    echo trim($Feed->addComentariosFeed($idFeed,$Comentario));
  }

  if ($op == "MeGustaFeed") {
    $idFeed = $_POST["FeedId"];
    $idTipoReaccion = $_POST["idTipoReaccion"];
    echo trim($Feed->MeGustaFeed($idFeed,$idTipoReaccion));
  }

  if ($op == "getListFeeds") {
    echo trim($Feed->getListFeeds());
  }

  if ($op == "getArchivosActualesFeed") {
    $idFeed = $_POST ["idFeed"];
    echo trim($Feed->getArchivosActualesFeed($idFeed));
  }

  if ($op == "eliminarArchivoFeedSelected") {
    $idFeed = $_POST ["idFeed"];
    $Archivo = $_POST["Archivo"];
    echo trim($Feed->eliminarArchivoFeedSelected($idFeed,$Archivo));
  }

  if ($op == "getDetalleFeed") {
    $idFeed = $_POST ["idFeed"];
    echo trim($Feed->getDetalleFeed($idFeed));
  }

  if ($op == "UpdateFeed") {
    $Titulo = $_POST["txtTitulo"];
    $Descripcion = nl2br($_POST["txtDescripcion"]);
    $idFeed = $_POST["idFeed"];
    $Hipervinculo = $_POST["txtHV"];
    $CantidadArchivosAct = $Feed->GetCantidadArchivosActualesFeed($idFeed);
    $idFeed = base64_decode($idFeed);
    $fechaActual = date('d-m-Y H:i:s');

    $carpeta = "../../Archivos/Feed/$idFeed/";
    if (sizeof($_FILES) > 0) {
      $NombreArchivo = "";
      for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
        $CantidadArchivosAct ++;
        if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
          $namefile = $_FILES['ArrArchivos']['name'][$i];
          $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
          $extValida = array("png","jpeg","jpg","pdf");
          if (in_array($ext,$extValida)) {
            $path = $carpeta.$idFeed.$fechaActual.$CantidadArchivosAct.".$ext";
            $nameArchivo = "$idFeed$fechaActual$CantidadArchivosAct.$ext";
            $path2 = $carpeta;
              if (!file_exists($path2)) {
                mkdir($path2, 0777, true);
              }
              if (move_uploaded_file($_FILES['ArrArchivos']['tmp_name'][$i],$path)) {
                  $NombreArchivo .= $nameArchivo.",";
                }
          }
        }
      }
    }
    $NombreArchivo = substr($NombreArchivo, 0, -1);
    $Feed2 = new Feed();
    echo trim($Feed2->UpdateFeed($NombreArchivo,$Titulo,$Descripcion,$idFeed,$Hipervinculo));
  }

  if ($op == "eliminarFeed") {
    $nidFeed = $_POST["idFeed"];
    echo trim($Feed->eliminarFeed($nidFeed));
  }

  if ($op == "getPostRequests") {
    echo trim($Feed->getPostRequests());
  }

  if ($op == "getcommentsRequests") {
    echo trim($Feed->getcommentsRequests());
  }

  if ($op == "executeActionPostRequest") {
    $post = $_POST["post"];
    $action = $_POST["action"];
    echo trim($Feed->executeActionPostRequest($post, $action));
  }
  if ($op == "executeActionComments") {
    $data = $_POST["data"];
    $action = $_POST["action"];
    echo trim($Feed->executeActionComments($data, $action));
  }

  if ($op == "getCommentsFeedSelected") {
    $iFeed = $_POST["iFeed"];
    echo trim($Feed->getCommentsFeedSelected($iFeed));
  }

  if ($op == "addPublicationFromIndex") {
      $difWebp = 0;
      $actDate = date('d-m-Y_H-i-s'); // Cambiado d-m-Y H:i:s a d-m-Y_H-i-s para usar como parte del nombre del archivo
      $mnf_title = $_POST["mnf_title"];
      $mnf_desc = nl2br($_POST["mnf_desc"]);
      $mnf_url = $_POST["mnf_url"];
      $resInsert = $Feed->newFeedFromIndex($mnf_title, $mnf_desc, $mnf_url);
      $idGen = $resInsert["f_idFeed"];
      $folder = "../../Archivos/Feed/$idGen/";

      if (isset($_FILES['filesFeedForm'])) {
          $cantFiles = count($_FILES['filesFeedForm']['name']);
          $NameFile = "";
          $countFile = 0;

          // Crear la carpeta si no existe
          if (!file_exists($folder)) {
              mkdir($folder, 0777, true);
          }

          for ($i = 0; $i < $cantFiles; $i++) {
              if (isset($_FILES['filesFeedForm']['name'][$i]) && $_FILES['filesFeedForm']['name'][$i] != '') {
                  $file_tmp = $_FILES['filesFeedForm']['tmp_name'][$i];
                  $namefile = $_FILES['filesFeedForm']['name'][$i];
                  $file_extension = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
                  $countFile++;

                  // Generar nombre único para el archivo
                  $nameFileS = $idGen . '_' . $actDate . '_' . $countFile . "." . $file_extension;
                  $path = $folder . $nameFileS;

                  // Mover el archivo al directorio de destino
                  if (move_uploaded_file($file_tmp, $path)) {
                      $NameFile .= $nameFileS . ',';
                  } else {
                      error_log("Error al mover el archivo $namefile");
                      continue; // Saltar a la siguiente iteración si hay un error
                  }
              }
          }

          // Eliminar la última coma de la cadena $NameFile
          $NameFile = rtrim($NameFile, ',');

          // Actualizar nombre de archivos en la base de datos
          $insUpdateNameFile = new Feed();
          $insUpdateNameFile->AddNombreArchivoFeed($idGen, $NameFile);

          // Respuesta JSON de éxito
          $arrReturn = [
              "Resultado" => true,
              "Siguiente" => true,
              "Msg" => "Publicación realizada."
          ];
          echo json_encode($arrReturn);
      }
  }

  if ($op == "makeComment") {
    $commentary = nl2br($_POST["commentary"]);
    $i_Feed = $_POST["i_Feed"];
    echo trim($Feed->makeComment($commentary, $i_Feed));
  }

  if ($op == "getDataFeedSelected") {
    $feed = $_POST["feed"];
    echo trim($Feed->getDataFeedSelected($feed));
  }

  if ($op == "getCommentsRequestsAccepted") {
    echo trim($Feed->getCommentsRequestsAccepted());
  }

  if ($op == "rejectCommentsF") {
    $data = $_POST["data"];
    echo trim($Feed->rejectCommentsF($data));
  }

  if ($op == "reactsToComment") {
    $type = $_POST["type"];
    $comment = $_POST["comment"];
    echo trim($Feed->reactsToComment($type, $comment));
  }
 ?>
