<?php
  include("Feed.php");
  require_once(__DIR__ . "/../../Backend/Sse/SseVersionStore.php");
  $Feed = new Feed();
  $op = $_POST["op"];

  if ($op == "newFeed") {
    $nTitulo = $_POST["txtTitulo"];
    $nDescripcion = $_POST["txtDescripcion"];
    $ContadorArchivos = 0;
    $cons = $Feed->newFeed($nTitulo,$nDescripcion);
    $LAST_ID_FEED = $cons[0]["LAST_ID_FEED"];

    $carpeta = "../../Archivos/Feed/$LAST_ID_FEED/";
    if (sizeof($_FILES['ArrArchivos']['name'])> 0) {
        $NombreArchivo = "";
        for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
            $ContadorArchivos ++;
            if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
                $namefile = $_FILES['ArrArchivos']['name'][$i];
                $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
                $extValida = array("png","jpeg","jpg");
                if (in_array($ext,$extValida)) {
                    $path = $carpeta.$LAST_ID_FEED.$ContadorArchivos.".".$ext;
                    $nameArchivo ="$LAST_ID_FEED$ContadorArchivos.$ext";
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
        SseVersionStore::bump('feed');
        echo "1";
    }else {
        return "Ingrese minimo un archivo";
    }
  }

  if ($op == "loadFeeds") {
    echo trim($Feed->loadFeeds());
  }

  if ($op == "addComentariosFeed") {
    $NoEmpleado = $_POST["NoEmpleado"];
    $idFeed = $_POST["idFeed"];
    $Comentario = $_POST["Comentario"];
    $result = trim($Feed->addComentariosFeed($NoEmpleado,$idFeed,$Comentario));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }

  if ($op == "MeGustaFeed") {
    $NoEmpleado = $_POST["NoEmpleado"];
    $idFeed = $_POST["FeedId"];
    $idTipoReaccion = $_POST["idTipoReaccion"];
    $result = trim($Feed->MeGustaFeed($NoEmpleado,$idFeed,$idTipoReaccion));
    SseVersionStore::bump('feed');
    echo $result;
  }

  if ($op == "makeComment") {
    $commentary = nl2br($_POST["commentary"]);
    $i_Feed = $_POST["i_Feed"];
    $NoEmpleado = $_POST["NoEmpleado"];
    $result = trim($Feed->makeComment($commentary, $i_Feed, $NoEmpleado));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
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
          SseVersionStore::bump('feed');

          // Respuesta JSON de éxito
          echo 1;
      } else {
        echo 0;
      }
  }

  if ($op == "getCommentsFeedSelected") {
    $iFeed = $_POST["iFeed"];
    $NoEmpleado = $_POST["NoEmpleado"];
    echo trim($Feed->getCommentsFeedSelected($iFeed, $NoEmpleado));
  }

  if ($op == "reactsToComment") {
    $type = $_POST["type"];
    $comment = $_POST["comment"];
    $NoEmpleado = $_POST["NoEmpleado"];
    $result = trim($Feed->reactsToComment($type, $comment, $NoEmpleado));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }
 ?>
