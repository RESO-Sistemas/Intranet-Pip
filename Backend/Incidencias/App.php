<?php
header('Content-Type: application/json');
include("Incidencias.php");
$obj = new Incidencias();
$op = isset($_POST["op"]) ? $_POST["op"] : '';

if ($op == "getListadoIncidencias") {
  echo trim($obj->getListadoIncidencias());
}

if ($op == "getDetalleIncidencia") {
  $id = $_POST["id"];
  echo trim($obj->getDetalleIncidencia($id));
}

if ($op == "updateEstadoIncidencia") {
  $id = $_POST["id"];
  $estado = $_POST["estado"];
  echo trim($obj->updateEstadoIncidencia($id, $estado));
}

if ($op == "getTiposIncidencias") {
  echo trim($obj->getTiposIncidencias());
}

if ($op == "asignarTipoIncidencia") {
  $id = $_POST["id"];
  $idTipo = $_POST["idTipoIncidencia"];
  echo trim($obj->asignarTipoIncidencia($id, $idTipo));
}

if ($op == "registrarIncidencia") {
  $descripcion = $_POST['descripcion'] ?? '';
  $file = $_FILES['evidencia'] ?? null;
  session_start();
  $noEmpleado = $_SESSION['NoEmpleado'] ?? '';
  if (!$descripcion || !$file || !$noEmpleado) {
    echo json_encode(['Resultado' => false, 'Msg' => 'Datos incompletos']);
    exit;
  }
  $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!in_array($file['type'], $allowed)) {
    echo json_encode(['Resultado' => false, 'Msg' => 'Solo se permiten imágenes']);
    exit;
  }
  $uploadDir = '../../Archivos/Incidencias/';
  if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
  }
  $fileName = uniqid('incidencia_') . '_' . basename($file['name']);
  $filePath = $uploadDir . $fileName;
  if (!move_uploaded_file($file['tmp_name'], $filePath)) {
    echo json_encode(['Resultado' => false, 'Msg' => 'Error al guardar la evidencia']);
    exit;
  }
  $ok = $obj->registrarIncidencia($descripcion, $fileName, $noEmpleado);
  if ($ok) {
    echo json_encode(['Resultado' => true, 'Msg' => 'Incidencia registrada', 'Evidencia' => $fileName]);
  } else {
    echo json_encode(['Resultado' => false, 'Msg' => 'Error al registrar en la base de datos']);
  }
  exit;
}

// ═══════════════════════════════════════════════════════════════════
// Rutas Plan de Acción
// ═══════════════════════════════════════════════════════════════════

if ($op == "getInfoIncidenciaPlan") {
  $id = $_POST["id"];
  echo trim($obj->getInfoIncidenciaPlan($id));
}

if ($op == "getActividadesPlanAccion") {
  $id = $_POST["id"];
  echo trim($obj->getActividadesPlanAccion($id));
}

if ($op == "addActividadPlanAccion") {
  $id = $_POST["id"];
  $titulo = $_POST["titulo"];
  $descripcion = $_POST["descripcion"];
  $fechaIni = $_POST["fechaIni"];
  $fechaFin = $_POST["fechaFin"];
  session_start();
  $usuario = $_SESSION['NoEmpleado'] ?? '';
  echo trim($obj->addActividadPlanAccion($id, $titulo, $descripcion, $fechaIni, $fechaFin, $usuario));
}

if ($op == "addAvancePlanAccion") {
  $idActividad = $_POST["idActividad"];
  $nuevoAvance = $_POST["nuevoAvance"];
  $descripcion = $_POST["descripcion"];
  echo trim($obj->addAvancePlanAccion($idActividad, $nuevoAvance, $descripcion));
}

if ($op == "getAvancesActividad") {
  $idActividad = $_POST["idActividad"];
  echo trim($obj->getAvancesActividad($idActividad));
}

if ($op == "addSeguimientoIncidencia") {
  $idIncidencia = $_POST["idIncidencia"];
  $titulo = $_POST["titulo"];
  $mensaje = $_POST["mensaje"];
  echo trim($obj->addSeguimientoIncidencia($idIncidencia, $titulo, $mensaje));
}

if ($op == "getSeguimientoIncidencia") {
  $idIncidencia = $_POST["idIncidencia"];
  echo trim($obj->getSeguimientoIncidencia($idIncidencia));
}
?>
