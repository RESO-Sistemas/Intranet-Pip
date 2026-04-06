<?php
  ob_start(); // Iniciar buffer de salida
  include("Feed.php");
  $Feed = new Feed();
  $op = $_POST["op"] ?? $_GET["op"] ?? '';

  // Endpoint para obtener archivo BLOB de la BD (permitir GET para acceso directo por URL)
  if ($op == "getArchivoFeed") {
    $idArchivo = $_POST["idArchivo"] ?? $_GET["idArchivo"] ?? null;
    if ($idArchivo) {
      $archivo = $Feed->getArchivoFeedBlob($idArchivo);
      if ($archivo && $archivo['Content']) {
        // Limpiar TODO el buffer antes de enviar la imagen
        ob_end_clean();
        
        header("Content-Type: " . $archivo['ContentType']);
        header("Content-Length: " . strlen($archivo['Content']));
        header("Content-Disposition: inline; filename=\"" . $archivo['Archivo'] . "\"");
        echo $archivo['Content'];
        exit;
      }
    }
    ob_end_clean();
    http_response_code(404);
    echo "Archivo no encontrado";
    exit;
  }

  if ($op == "newFeed") {
    $nTitulo = $_POST["txtTitulo"];
    $nDescripcion = nl2br($_POST["txtDescripcion"]);
    $nHipervinculo = $_POST["txtHV"];
    $ContadorArchivos = 0;
    
    error_log("=== CREANDO FEED ===");
    error_log("Titulo: " . $nTitulo);
    error_log("Descripcion: " . $nDescripcion);
    error_log("Hipervinculo: " . $nHipervinculo);
    
    try {
      $cons = $Feed->newFeed($nTitulo,$nDescripcion,$nHipervinculo);
      error_log("Resultado newFeed: " . print_r($cons, true));
      
      if (!$cons || !isset($cons[0]["LAST_ID_FEED"])) {
        error_log("ERROR: No se obtuvo LAST_ID_FEED");
        echo "0";
        exit;
      }
      
      $LAST_ID_FEED = $cons[0]["LAST_ID_FEED"];
      error_log("LAST_ID_FEED: " . $LAST_ID_FEED);
    } catch (Exception $e) {
      error_log("ERROR en newFeed: " . $e->getMessage());
      echo "Error al crear feed: " . $e->getMessage();
      exit;
    }
    
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
    $page = $_POST["page"] ?? 1;
    echo trim($Feed->loadFeeds($page));
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
      // Limpiar cualquier salida previa
      ob_clean();
      
      $actDate = date('d-m-Y_H-i-s');
      $mnf_title = $_POST["mnf_title"] ?? '';
      $mnf_desc = nl2br($_POST["mnf_desc"] ?? '');
      $mnf_url = $_POST["mnf_url"] ?? '';
      
      // Insertar el feed en la base de datos
      $resInsert = $Feed->newFeedFromIndex($mnf_title, $mnf_desc, $mnf_url);
      
      // Verificar si se obtuvo el ID del feed
      if (!$resInsert || !isset($resInsert["f_idFeed"]) || empty($resInsert["f_idFeed"])) {
          header('Content-Type: application/json');
          $arrReturn = [
              "Resultado" => false,
              "Siguiente" => false,
              "Msg" => "Error al crear la publicación en la base de datos."
          ];
          echo json_encode($arrReturn);
          exit;
      }
      
      $idGen = $resInsert["f_idFeed"];

      // Procesar archivos y guardarlos como BLOB en la BD (sin crear carpetas)
      if (isset($_FILES['filesFeedForm']) && !empty($_FILES['filesFeedForm']['name'][0])) {
          try {
              $cantFiles = count($_FILES['filesFeedForm']['name']);
              $countFile = 0;

              for ($i = 0; $i < $cantFiles; $i++) {
                  if (isset($_FILES['filesFeedForm']['name'][$i]) && $_FILES['filesFeedForm']['name'][$i] != '') {
                      $file_tmp = $_FILES['filesFeedForm']['tmp_name'][$i];
                      $namefile = $_FILES['filesFeedForm']['name'][$i];
                      $file_extension = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
                      $countFile++;

                      // Obtener metadatos del archivo
                      $fileName = $idGen . '_' . $actDate . '_' . $countFile . "." . $file_extension;
                      $contentType = $_FILES['filesFeedForm']['type'][$i];
                      
                      // Leer el contenido binario del archivo
                      $content = file_get_contents($file_tmp);

                      // Guardar en la base de datos como BLOB
                      $insUpdateFile = new Feed();
                      $insUpdateFile->AddArchivoFeedBlob($idGen, $fileName, $contentType, $content);
                  }
              }
          } catch (Exception $e) {
              error_log("Error procesando archivos: " . $e->getMessage());
          }
      }
      
      // Respuesta JSON de éxito (siempre responder)
      header('Content-Type: application/json');
      $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => "Publicación realizada.",
          "idFeed" => $idGen
      ];
      echo json_encode($arrReturn);
      exit;
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
