<?php
header("Content-Type: application/json");

require_once("ChecklistEmpleados.php");
$obj = new ChecklistEmpleados();

// Leer noEmpleado e idPuesto de sesión
if (session_status() === PHP_SESSION_NONE) { session_start(); }
$noEmpleado = $_SESSION['NoEmpleado'] ?? '';
$idPuesto   = $_SESSION['idSPuesto']  ?? '';

$op = $_POST["op"] ?? "";

switch ($op) {

  // Cargar ítems del checklist del empleado para hoy
  case "getChecklistsByPuesto":
    echo $obj->getChecklistsByPuesto($idPuesto, $noEmpleado);
    break;

  // Guardar respuesta directa (sin incidencia)
  case "guardarRespuesta":
    $idChecklist = (int)($_POST["idChecklist"] ?? 0);
    $respuesta   = (int)($_POST["respuesta"]   ?? 0);
    if (!$idChecklist || !$noEmpleado) {
      echo json_encode(["Resultado" => false, "Msg" => "Datos incompletos."]);
      break;
    }
    echo $obj->guardarRespuesta($noEmpleado, $idChecklist, $respuesta);
    break;

  default:
    echo json_encode(["Resultado" => false, "Msg" => "Operación no reconocida."]);
    break;
}
?>
