<?php

  include("Dashboard.php");
  require_once(__DIR__ . "/../Sse/SseVersionStore.php");

  $Dashboard = new Dashboard();

  $op = $_POST["op"];



  if ($op == "getDashboardVisitSystem") {

    $dateIni = $_POST["dateIni"];

    $dateEnd = $_POST["dateEnd"];

    echo trim($Dashboard->getDashboardVisitSystem($dateIni, $dateEnd));

  }

  if ($op == "getKpisDashboard") {
    echo trim($Dashboard->getKpisDashboard());
  }

  if ($op == "getChecklistsEmpleado") {
    echo trim($Dashboard->getChecklistsEmpleado());
  }

  if ($op == "responderChecklist") {
    $idChecklist = intval($_POST["idChecklist"]);
    $respuesta = intval($_POST["respuesta"]);
    $result = trim($Dashboard->responderChecklist($idChecklist, $respuesta));
    $decoded = json_decode($result, true);
    if (is_array($decoded) && isset($decoded["Resultado"]) && $decoded["Resultado"] === true) {
      SseVersionStore::bump('dashboard');
    }
    echo $result;
  }

  if ($op == "getProximosEventos") {
    echo trim($Dashboard->getProximosEventos());
  }

  if ($op == "getTurnos") {
    echo trim($Dashboard->getTurnos());
  }

  if ($op == "getDashboardAll") {
    // Endpoint consolidado: devuelve todo en una sola petición
    $d1 = new Dashboard();
    $d2 = new Dashboard();
    $d3 = new Dashboard();
    
    $result = [
      "turnos" => json_decode($Dashboard->getTurnos()),
      "kpis" => json_decode($d1->getKpisDashboard()),
      "eventos" => json_decode($d2->getProximosEventos()),
      "checklists" => json_decode($d3->getChecklistsEmpleado())
    ];
    echo json_encode($result);
  }

?>

