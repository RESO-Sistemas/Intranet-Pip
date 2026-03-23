<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar en pantalla
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

include("Capacitacion.php");
$Capacitacion = new Capacitacion();
$carpeta = "../../Archivos/Capacitaciones/";
$op = $_POST["op"];

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
    
    $ContadorArchivos = 0;
    $fechaActual = date('Ymd_His');
    $carpeta = "../../Archivos/Capacitaciones/$respuesta/";
    
    if (sizeof($_FILES) > 0) {
      $NombreArchivo = "";
      for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
        $ContadorArchivos ++;
        if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
          $namefile = $_FILES['ArrArchivos']['name'][$i];
          $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
          $extValida = array("png","jpeg","jpg","pdf","ppt");
          if (in_array($ext,$extValida)) {
            $path = $carpeta.$respuesta.$fechaActual.$ContadorArchivos.".$ext";
            $nameArchivo = "$respuesta$fechaActual$ContadorArchivos.$ext";
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
      $Capacitacion2 = new Capacitacion();
      $Capacitacion2->updateNameArchivoCapacitacion($NombreArchivo,$respuesta);
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
  $CantidadArchivosAct = $Capacitacion->GetCantidadArchivosActuales($idCapacitacion);
  $idCapacitacion = base64_decode($idCapacitacion);
  $NoEmpleado = $_POST["NoEmpleado"];
  $fechaActual = date('Ymd_His');

  $carpeta = "../../Archivos/Capacitaciones/$idCapacitacion/";
  if (sizeof($_FILES) > 0) {
    if (sizeof($_FILES['ArrArchivos']['name'])> 0) {
      $NombreArchivo = "";
      for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
        $CantidadArchivosAct ++;
        if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
          $namefile = $_FILES['ArrArchivos']['name'][$i];
          $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
          $extValida = array("png","jpeg","jpg","pdf","ppt");
          if (in_array($ext,$extValida)) {
            $path = $carpeta.$idCapacitacion.$fechaActual.$CantidadArchivosAct.".$ext";
            $nameArchivo = "$idCapacitacion$fechaActual$CantidadArchivosAct.$ext";
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
  }
  $NombreArchivo = substr($NombreArchivo, 0, -1);
  $Capacitacion2 = new Capacitacion();
  $Capacitacion2->UpdateCapacitacion($Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin,$Dias,$NombreArchivo,$Tipo,$idCapacitacion,$NoEmpleado);
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
    echo trim($Capacitacion->cancelarCapacitacion($idCapacitacion));
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
  echo trim($Capacitacion->getArchivosActualesCapacitacion($idCapacitacion));
}

if ($op == "eliminarArchivoCapacitacionSelected") {
  $idCapacitacion = $_POST["idCapacitacion"];
  $Archivo = $_POST["Archivo"];
  echo trim($Capacitacion->eliminarArchivoCapacitacionSelected($idCapacitacion,$Archivo));
}

if ($op == "deleteCapacitacion") {
  $nidFeed = $_POST["idFeed"];
  echo trim($Capacitacion->deleteCapacitacion($nidFeed));
}
