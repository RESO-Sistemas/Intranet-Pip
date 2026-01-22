<?php
  include("Dashboard.php");
  $Dashboard = new Dashboard();
  $op = $_POST["op"];

  if ($op == "getDashboardVisitSystem") {
    $dateIni = $_POST["dateIni"];
    $dateEnd = $_POST["dateEnd"];
    echo trim($Dashboard->getDashboardVisitSystem($dateIni, $dateEnd));
  }
?>
