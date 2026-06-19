<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar en pantalla
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');
ini_set('memory_limit', '1024M');
ini_set('max_execution_time', '300');
// Nota: upload_max_filesize y post_max_size deben configurarse en php.ini para soportar archivos de 500 MB.

include("Capacitacion.php");
$Capacitacion = new Capacitacion();
$carpeta = "../../Archivos/Capacitaciones/";
$op = $_REQUEST["op"];

if ($op == "getFechasRango") {
    $fechaInicio = $_POST["fechaInicio"];
    $fechaFin = $_POST["fechaFin"];
    echo trim($Capacitacion->getFechasRango($fechaInicio, $fechaFin));
}


if($op == "addCapacitacionInputText"){
  $nDescripcion = $_POST["Desc"];
  $nFechaInicio = $_POST["fechaInicio"];
  $nFechaFin = $_POST["fechaFin"];
  $nHoraInicio = $_POST["HoraInicio"];
  $nHoraFin = $_POST["HoraFin"];
  $dias = $_POST["dias"];
  $archivo = $_POST["ipn_archivo"];
  $tipo = $_POST["tipoCapacitacion"];
  $existeFichero = $_POST["existeFichero"];
  $NoEmpleado = $_POST["NoEmpleado"];
  if(isset($_FILES)){
    error_log("2 " . $existeFichero);
    error_log("archivo ". $archivo);
      error_log("4 " . $existeFichero);
      //move_uploaded_file($archivo_ident, $path);
      echo trim($Capacitacion->addCapacitacion($nDescripcion, $nFechaInicio, $nFechaFin, $nHoraInicio, $nHoraFin, $dias, $archivo,$tipo,$NoEmpleado));
    }
}


if ($op == "addCapacitacion") {
    // Log para debug
    file_put_contents(__DIR__ . '/debug_capacitacion.log', 
        date('Y-m-d H:i:s') . " - POST recibido:\n" . print_r($_POST, true) . "\n\nFILES:\n" . print_r($_FILES, true) . "\n\n", 
        FILE_APPEND);
    
    $nDescripcion = $_POST["Desc"];
    $nFechaInicio = $_POST["fechaInicio"];
    $nFechaFin = $_POST["fechaFin"];
    $nHoraInicio = $_POST["HoraInicio"];
    $nHoraFin = $_POST["HoraFin"];
    $dias = $_POST["dias"];
    $tipo = $_POST["tipoCapacitacion"];
    $existeFichero = $_POST["existeFichero"];
    $NoEmpleado = $_POST["NoEmpleado"];
    
    // Log de datos recibidos
    file_put_contents(__DIR__ . '/debug_capacitacion.log', 
        "Datos a insertar:\nDesc: $nDescripcion\nTipo: $tipo\nDias: $dias\nEmpleados: $NoEmpleado\n\n", 
        FILE_APPEND);
    
    // Intentar crear la capacitación
    $respuesta = $Capacitacion->addCapacitacion($nDescripcion, $nFechaInicio, $nFechaFin, $nHoraInicio, $nHoraFin, $dias,$tipo,$NoEmpleado);
    
    // Log de respuesta
    file_put_contents(__DIR__ . '/debug_capacitacion.log', 
        "Respuesta de addCapacitacion: " . print_r($respuesta, true) . "\n\n", 
        FILE_APPEND);
    
    // Validar que la respuesta es un ID numérico válido
    if (!is_numeric($respuesta) || $respuesta <= 0) {
        // Si no es numérico o es <= 0, es un mensaje de error
        file_put_contents(__DIR__ . '/debug_capacitacion.log', 
            "ERROR: Respuesta no es numérica o es <= 0\n\n", 
            FILE_APPEND);
        echo "ERROR: " . $respuesta;
        exit;
    }

    // Guardar archivos adjuntos en la base de datos
    if (isset($_FILES['ArrArchivos']) && is_array($_FILES['ArrArchivos']['name'])) {
        $extValidas = array("pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "png", "jpg", "jpeg", "gif", "webp", "bmp", "mp4");

        for ($i = 0; $i < sizeof($_FILES['ArrArchivos']['name']); $i++) {
            $namefile = $_FILES['ArrArchivos']['name'][$i];
            $tmpName = $_FILES['ArrArchivos']['tmp_name'][$i];

            if (!isset($namefile) || $namefile === '' || !is_uploaded_file($tmpName)) {
                continue;
            }

            $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
            if (!in_array($ext, $extValidas)) {
                error_log("Extensión no permitida: $ext");
                continue;
            }

            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $tmpName);
            finfo_close($finfo);

            $size = filesize($tmpName);
            $content = file_get_contents($tmpName);

            if ($content === false) {
                error_log("No se pudo leer el archivo: $namefile");
                continue;
            }

            $Capacitacion->insertArchivoCapacitacion($respuesta, $namefile, $mimeType, $ext, $size, $content);
        }
    }

    // Si llegamos aquí, todo salió bien
    echo "1";
}

if ($op == "UpdateCapacitacion") {
  $Descripcion = $_POST["Desc"];
  $FechaInicio = $_POST["fechaInicio"];
  $FechaFin = $_POST["fechaFin"];
  $HoraInicio = $_POST["HoraInicio"];
  $HoraFin = $_POST["HoraFin"];
  $Dias = $_POST["dias"];
  $Tipo = $_POST["tipoCapacitacion"];
  $idCapacitacion = $_POST["idCapacitacion"];
  $idCapacitacion = base64_decode($idCapacitacion);
  $NoEmpleado = $_POST["NoEmpleado"];

  // Guardar archivos nuevos adjuntos en la base de datos
  if (isset($_FILES['ArrArchivos']) && is_array($_FILES['ArrArchivos']['name']) && sizeof($_FILES['ArrArchivos']['name']) > 0) {
    $extValidas = array("pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "png", "jpg", "jpeg", "gif", "webp", "bmp", "mp4");

    for ($i = 0; $i < sizeof($_FILES['ArrArchivos']['name']); $i++) {
      $namefile = $_FILES['ArrArchivos']['name'][$i];
      $tmpName = $_FILES['ArrArchivos']['tmp_name'][$i];

      if (!isset($namefile) || $namefile === '' || !is_uploaded_file($tmpName)) {
        continue;
      }

      $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
      if (!in_array($ext, $extValidas)) {
        error_log("Extensión no permitida: $ext");
        continue;
      }

      $finfo = finfo_open(FILEINFO_MIME_TYPE);
      $mimeType = finfo_file($finfo, $tmpName);
      finfo_close($finfo);

      $size = filesize($tmpName);
      $content = file_get_contents($tmpName);

      if ($content === false) {
        error_log("No se pudo leer el archivo: $namefile");
        continue;
      }

      $Capacitacion->insertArchivoCapacitacion($idCapacitacion, $namefile, $mimeType, $ext, $size, $content);
    }
  }

  $Capacitacion2 = new Capacitacion();
  $Capacitacion2->UpdateCapacitacion($Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin,$Dias,"",$Tipo,$idCapacitacion,$NoEmpleado);
  echo "1";
}

if ($op == "getCapacitacionDisponibles") {
    echo trim($Capacitacion->getCapacitacionDisponibles());
}

if ($op == "getCapacitacionesUsDisponibles") {
    echo trim($Capacitacion->getCapacitacionesUsDisponibles());
}


if ($op == "getArchivosCapacitacion") {
  error_log($op);
   $Capacitacion->getArchivosCapacitacion();
}

if ($op == "cancelarCapacitacion") {
    $idCapacitacion = $_POST["idCapacitacion"];
    $status = $_POST["status"];
    echo trim($Capacitacion->toggleStatusCapacitacion($idCapacitacion, $status));
}

if ($op == "leerCarpetaArchivos") {
    $dir = scandir($carpeta);
    die(json_encode($dir));
}

if ($op == "getCentrosCostos") {
    echo trim($Capacitacion->getCentrosCostos());
}

if ($op == "getPersonal") {
    $IdPuesto = $_POST["IdPuesto"];
    $IdSucursal = $_POST["IdSucursal"];
    $IdDivision = $_POST["IdDivision"];
    echo trim($Capacitacion->getPersonal($IdPuesto,$IdSucursal,$IdDivision));
}

if ($op == "getDetalleCapacitacion") {
    $idCapacitacion = $_POST["idCapacitacion"];
    echo trim($Capacitacion->getDetalleCapacitacion($idCapacitacion));
}

if ($op == "getArchivosActualesCapacitacion") {
  $idCapacitacion = $_POST["idCapacitacion"];
  $idCapacitacion = base64_decode($idCapacitacion);
  echo trim($Capacitacion->getArchivosPorCapacitacion($idCapacitacion));
}

if ($op == "eliminarArchivoCapacitacionSelected") {
  $idArchivo = $_POST["idArchivo"];
  echo trim($Capacitacion->eliminarArchivoCapacitacion($idArchivo));
}

if ($op == "getArchivoCapacitacion") {
  $idArchivo = $_REQUEST["idArchivo"];
  $download = isset($_REQUEST["download"]) && $_REQUEST["download"] == "1";

  $archivo = $Capacitacion->getArchivoContenido($idArchivo);

  if (!$archivo || !isset($archivo['contenido'])) {
    http_response_code(404);
    echo "Archivo no encontrado";
    exit;
  }

  $mimeType = !empty($archivo['mimeType']) ? $archivo['mimeType'] : 'application/octet-stream';
  header("Content-Type: " . $mimeType);
  header("Content-Length: " . strlen($archivo['contenido']));

  $disposition = $download ? "attachment" : "inline";
  $safeName = rawurlencode($archivo['nombreOriginal']);
  header("Content-Disposition: $disposition; filename=\"" . $safeName . "\"");

  echo $archivo['contenido'];
  exit;
}

if ($op == "deleteCapacitacion") {
  $nidFeed = $_POST["idFeed"];
  echo trim($Capacitacion->deleteCapacitacion($nidFeed));
}
