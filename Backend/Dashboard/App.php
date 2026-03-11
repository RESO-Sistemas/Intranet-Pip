<?php

  include("Dashboard.php");

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
    echo trim($Dashboard->responderChecklist($idChecklist, $respuesta));
  }

  if ($op == "getProximosEventos") {
    echo trim($Dashboard->getProximosEventos());
  }

  if ($op == "getTurnos") {
    echo trim($Dashboard->getTurnos());
  }

?>

