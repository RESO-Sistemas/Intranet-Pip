<?php
  ob_start(); // Iniciar buffer de salida
  include("Feed.php");
  require_once(__DIR__ . "/../Sse/SseVersionStore.php");
  $Feed = new Feed();
  $op = $_POST["op"] ?? $_GET["op"] ?? '';

  function sendSseEvent($eventName, $payload = []) {
    echo "event: " . $eventName . "\n";
    echo "data: " . json_encode($payload) . "\n\n";
  }

  function flushSse() {
    @ob_flush();
    @flush();
  }

  function streamUpdatesSse() {
    if (!SessionManager::isLoggedIn()) {
      if (ob_get_level() > 0) {
        while (ob_get_level() > 0) {
          @ob_end_clean();
        }
      }
      header('Content-Type: text/event-stream');
      http_response_code(401);
      sendSseEvent('error', [
        'message' => 'unauthorized'
      ]);
      flushSse();
      exit;
    }

    if (ob_get_level() > 0) {
      while (ob_get_level() > 0) {
        @ob_end_clean();
      }
    }

    @ini_set('zlib.output_compression', 0);
    @ini_set('output_buffering', 'off');
    @set_time_limit(30);

    header('Content-Type: text/event-stream');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Connection: keep-alive');
    header('X-Accel-Buffering: no');

    $scope = $_GET['scope'] ?? 'feed';
    $watchFeed = (strpos($scope, 'feed') !== false);
    $watchDashboard = (strpos($scope, 'dashboard') !== false);

    $knownFeedVersion = isset($_GET['feedV']) ? intval($_GET['feedV']) : 0;
    $knownDashboardVersion = isset($_GET['dashV']) ? intval($_GET['dashV']) : 0;

    echo "retry: 5000\n\n";
    flushSse();

    $startTime = time();
    $lastPingAt = 0;

    while ((time() - $startTime) < 25) {
      if (connection_aborted()) {
        break;
      }

      $state = SseVersionStore::readState();
      $currentFeedVersion = intval($state['feed']);
      $currentDashboardVersion = intval($state['dashboard']);
      $sentUpdate = false;

      if ($watchFeed && $currentFeedVersion > $knownFeedVersion) {
        sendSseEvent('feed_update', [
          'version' => $currentFeedVersion,
          'ts' => time(),
        ]);
        $knownFeedVersion = $currentFeedVersion;
        $sentUpdate = true;
      }

      if ($watchDashboard && $currentDashboardVersion > $knownDashboardVersion) {
        sendSseEvent('dashboard_update', [
          'version' => $currentDashboardVersion,
          'ts' => time(),
        ]);
        $knownDashboardVersion = $currentDashboardVersion;
        $sentUpdate = true;
      }

      if ($sentUpdate) {
        flushSse();
        exit;
      }

      if ((time() - $lastPingAt) >= 10) {
        echo ": ping\n\n";
        flushSse();
        $lastPingAt = time();
      }

      sleep(2);
    }

    sendSseEvent('done', [
      'ts' => time(),
    ]);
    flushSse();
    exit;
  }

  if ($op == "streamUpdates") {
    streamUpdatesSse();
  }

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
        SseVersionStore::bump('feed');
        echo "1";
    } else {
      SseVersionStore::bump('feed');
      echo "1";
    }
  }

  if ($op == "loadFeeds") {
    $page = $_POST["page"] ?? 1;
    $lightweight = $_POST["lightweight"] ?? 0;
    $limit = intval($_POST["limit"] ?? 8);
    if ($limit < 3) {
      $limit = 3;
    }
    if ($limit > 12) {
      $limit = 12;
    }
    echo trim($Feed->loadFeeds($page, $limit, $lightweight));
  }

  if ($op == "addComentariosFeed") {
    $idFeed = $_POST["idFeed"];
    $Comentario = $_POST["Comentario"];
    $result = trim($Feed->addComentariosFeed($idFeed,$Comentario));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }

  if ($op == "MeGustaFeed") {
    $idFeed = $_POST["FeedId"];
    $idTipoReaccion = $_POST["idTipoReaccion"];
    $result = trim($Feed->MeGustaFeed($idFeed,$idTipoReaccion));
    SseVersionStore::bump('feed');
    echo $result;
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
    $result = trim($Feed2->UpdateFeed($NombreArchivo,$Titulo,$Descripcion,$idFeed,$Hipervinculo));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }

  if ($op == "eliminarFeed") {
    $nidFeed = $_POST["idFeed"];
    $result = trim($Feed->eliminarFeed($nidFeed));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
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
    $result = trim($Feed->executeActionPostRequest($post, $action));
    SseVersionStore::bump('feed');
    echo $result;
  }
  if ($op == "executeActionComments") {
    $data = $_POST["data"];
    $action = $_POST["action"];
    $result = trim($Feed->executeActionComments($data, $action));
    SseVersionStore::bump('feed');
    echo $result;
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

      // ── Procesar imágenes adjuntas — almacenamiento en disco (rápido) ─────────
      if (isset($_FILES['filesFeedForm']) && !empty($_FILES['filesFeedForm']['name'][0])) {
          try {
              $extValida  = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
              $cantFiles  = count($_FILES['filesFeedForm']['name']);
              $carpeta    = "../../Archivos/Feed/$idGen/";
              $fechaActual = date('d-m-Y H:i:s');
              $contador   = 0;
              $archivosGuardados = '';

              for ($i = 0; $i < $cantFiles; $i++) {
                  if (!isset($_FILES['filesFeedForm']['name'][$i]) || $_FILES['filesFeedForm']['name'][$i] == '') {
                      continue;
                  }
                  $namefile = $_FILES['filesFeedForm']['name'][$i];
                  $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
                  if (!in_array($ext, $extValida)) {
                      error_log("addPublicationFromIndex - ext no permitida: $ext ($namefile)");
                      continue;
                  }
                  $contador++;
                  $nameArchivo = "$idGen$fechaActual$contador.$ext";
                  $path = $carpeta . $nameArchivo;
                  if (!file_exists($carpeta)) {
                      mkdir($carpeta, 0777, true);
                  }
                  if (move_uploaded_file($_FILES['filesFeedForm']['tmp_name'][$i], $path)) {
                      $archivosGuardados .= $nameArchivo . ',';
                  }
              }
              if ($archivosGuardados) {
                  $archivosGuardados = rtrim($archivosGuardados, ',');
                  $Feed->AddNombreArchivoFeed($idGen, $archivosGuardados);
              }
          } catch (Exception $e) {
              error_log("Error procesando imágenes Feed: " . $e->getMessage());
          }
      }
      
      // Respuesta JSON de éxito — post queda pendiente de revisión (AutorizadoIndex=0)
      header('Content-Type: application/json');
      $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => "Publicación enviada a revisión.",
          "idFeed" => $idGen
      ];
      echo json_encode($arrReturn);
      exit;
  }

  if ($op == "makeComment") {
    $commentary = nl2br($_POST["commentary"]);
    $i_Feed = $_POST["i_Feed"];
    $result = trim($Feed->makeComment($commentary, $i_Feed));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
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
    $result = trim($Feed->rejectCommentsF($data));
    SseVersionStore::bump('feed');
    echo $result;
  }

  if ($op == "setAutorizadoFeed") {
    $idFeed = $_POST["idFeed"];
    $value  = $_POST["value"];
    $result = trim($Feed->setAutorizadoFeed($idFeed, $value));
    $decoded = json_decode($result, true);
    if ($decoded && isset($decoded["Resultado"]) && $decoded["Resultado"]) {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }

  if ($op == "reactsToComment") {
    $type = $_POST["type"];
    $comment = $_POST["comment"];
    $result = trim($Feed->reactsToComment($type, $comment));
    if ($result === "1") {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }

  if ($op == "getCommentsForAdmin") {
    $iFeed = $_POST["iFeed"];
    echo trim($Feed->getCommentsForAdmin($iFeed));
  }

  if ($op == "toggleCommentStatus") {
    $idComentario = $_POST["idComentario"];
    $status = $_POST["status"];
    $result = trim($Feed->toggleCommentStatus($idComentario, $status));
    $decoded = json_decode($result, true);
    if ($decoded && isset($decoded["Resultado"]) && $decoded["Resultado"]) {
      SseVersionStore::bump('feed');
    }
    echo $result;
  }
 ?>
