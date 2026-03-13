<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("Checklists.php");
$obj = new Checklists();

$op = isset($_POST["op"]) ? $_POST["op"] : "";

switch ($op) {
  case "getChecklists":
    echo $obj->getChecklists();
    break;

  case "getTurnosPorPuesto":
    $idPuesto = isset($_POST["idPuesto"]) ? $_POST["idPuesto"] : "";
    echo $obj->getTurnosPorPuesto($idPuesto);
    break;

  case "getPuestos":
    echo $obj->getPuestos();
    break;

  case "getTurnos":
    echo $obj->getTurnos();
    break;

  case "getKpis":
    echo $obj->getKpis();
    break;

  case "insertChecklist":
    $nombre           = isset($_POST["nombre"])           ? $_POST["nombre"]           : "";
    $idPuesto         = isset($_POST["idPuesto"])         ? $_POST["idPuesto"]         : "";
    $turnos           = isset($_POST["turnos"])           ? $_POST["turnos"]           : "";
    $tipo             = isset($_POST["tipo"])             ? $_POST["tipo"]             : "";
    $respuestaEsperada = isset($_POST["respuestaEsperada"]) ? $_POST["respuestaEsperada"] : "";
    $idKpi            = isset($_POST["idKpi"])            ? $_POST["idKpi"]            : "";
    $abreIncidencia   = isset($_POST["abreIncidencia"])   ? $_POST["abreIncidencia"]   : 0;
    echo $obj->insertChecklist($nombre, $idPuesto, $turnos, $tipo, $respuestaEsperada, $idKpi, $abreIncidencia);
    break;

  case "updateChecklist":
    $idChecklist      = isset($_POST["idChecklist"])      ? $_POST["idChecklist"]      : "";
    $nombre           = isset($_POST["nombre"])           ? $_POST["nombre"]           : "";
    $idPuesto         = isset($_POST["idPuesto"])         ? $_POST["idPuesto"]         : "";
    $turnos           = isset($_POST["turnos"])           ? $_POST["turnos"]           : "";
    $tipo             = isset($_POST["tipo"])             ? $_POST["tipo"]             : "";
    $respuestaEsperada = isset($_POST["respuestaEsperada"]) ? $_POST["respuestaEsperada"] : "";
    $idKpi            = isset($_POST["idKpi"])            ? $_POST["idKpi"]            : "";
    $abreIncidencia   = isset($_POST["abreIncidencia"])   ? $_POST["abreIncidencia"]   : 0;
    echo $obj->updateChecklist($idChecklist, $nombre, $idPuesto, $turnos, $tipo, $respuestaEsperada, $idKpi, $abreIncidencia);
    break;

  case "deleteChecklist":
    $idChecklist = isset($_POST["idChecklist"]) ? $_POST["idChecklist"] : "";
    echo $obj->deleteChecklist($idChecklist);
    break;

  case "getListadoChecklistDiarios":
    $fechaIni = isset($_POST["fechaIni"]) ? $_POST["fechaIni"] : date("Y-m-d");
    $fechaFin = isset($_POST["fechaFin"]) ? $_POST["fechaFin"] : date("Y-m-d");
    echo $obj->getListadoChecklistDiarios($fechaIni, $fechaFin);
    break;

  case "getDetalleChecklistEmpleado":
    $noEmpleado = isset($_POST["noEmpleado"]) ? $_POST["noEmpleado"] : "";
    $fecha      = isset($_POST["fecha"])      ? $_POST["fecha"]      : date("Y-m-d");
    echo $obj->getDetalleChecklistEmpleado($noEmpleado, $fecha);
    break;

  default:
    echo json_encode(["Resultado" => false, "Msg" => "Operación no reconocida"]);
    break;
}
?>
