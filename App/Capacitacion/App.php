<?php
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
    $nDescripcion = $_POST["Desc"];
    $nFechaInicio = $_POST["fechaInicio"];
    $nFechaFin = $_POST["fechaFin"];
    $nHoraInicio = $_POST["HoraInicio"];
    $nHoraFin = $_POST["HoraFin"];
    $dias = $_POST["dias"];
    $tipo = $_POST["tipoCapacitacion"];
    $existeFichero = $_POST["existeFichero"];
    $NoEmpleado = $_POST["NoEmpleado"];
    $respuesta = $Capacitacion->addCapacitacion($nDescripcion, $nFechaInicio, $nFechaFin, $nHoraInicio, $nHoraFin, $dias, $namefile,$tipo,$NoEmpleado);
    $ContadorArchivos = 0;

    $carpeta = "../../Archivos/Capacitaciones/$respuesta/";
    if (sizeof($_FILES['ArrArchivos']['name'])> 0) {
      $NombreArchivo = "";
      for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
        $ContadorArchivos ++;
        if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
          $namefile = $_FILES['ArrArchivos']['name'][$i];
          $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
          $extValida = array("png","jpeg","jpg","pdf");
          if (in_array($ext,$extValida)) {
            $path = $carpeta.$respuesta.$ContadorArchivos.".$ext";
            $nameArchivo = "$respuesta$ContadorArchivos.$ext";
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
      echo "1";
    } else {
      echo "1";
    }
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

  $carpeta = "../../Archivos/Capacitaciones/$idCapacitacion/";
  if (sizeof($_FILES['ArrArchivos']['name'])> 0) {
    $NombreArchivo = "";
    for ($i=0; $i < sizeof($_FILES['ArrArchivos']['name']) ; $i++) {
      $CantidadArchivosAct ++;
      if (isset($_FILES['ArrArchivos']['name'][$i]) && $_FILES['ArrArchivos']['name'][$i] != '') {
        $namefile = $_FILES['ArrArchivos']['name'][$i];
        $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
        $extValida = array("png","jpeg","jpg","pdf");
        if (in_array($ext,$extValida)) {
          $path = $carpeta.$idCapacitacion.$CantidadArchivosAct.".$ext";
          $nameArchivo = "$idCapacitacion$CantidadArchivosAct.$ext";
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
  $Capacitacion2 = new Capacitacion();
  $Capacitacion2->UpdateCapacitacion($Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin,$Dias,$NombreArchivo,$Tipo,$idCapacitacion,$NoEmpleado);
  echo "1";
}

if ($op == "getCapacitacionDisponibles") {
    echo trim($Capacitacion->getCapacitacionDisponibles());
}

if ($op == "getCapacitacionesUsDisponibles") {
    $NoEmpleado = $_POST["NoEmpleado"];
    echo trim($Capacitacion->getCapacitacionesUsDisponibles($NoEmpleado));
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
