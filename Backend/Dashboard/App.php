<?php

  include("Dashboard.php");
  require_once(__DIR__ . "/../Sse/SseVersionStore.php");

  $Dashboard = new Dashboard();

  $op = $_POST["op"] ?? $_GET["op"] ?? '';



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
    $safeCall = function($fn) {
      ob_start();
      $r = null;
      try { $r = $fn(); } catch (Exception $e) { /* ignore */ }
      ob_end_clean();
      if ($r === null) return [];
      $d = json_decode($r, true);
      return ($d !== null) ? $d : [];
    };
    http_response_code(200);
    $result = [
      "turnos"     => $safeCall(function() use ($Dashboard) { return $Dashboard->getTurnos(); }),
      "kpis"       => $safeCall(function() use ($Dashboard) { return $Dashboard->getKpisDashboard(); }),
      "eventos"    => $safeCall(function() use ($Dashboard) { return $Dashboard->getProximosEventos(); }),
      "checklists" => $safeCall(function() use ($Dashboard) { return $Dashboard->getChecklistsEmpleado(); })
    ];
    echo json_encode($result);
  }

?>

