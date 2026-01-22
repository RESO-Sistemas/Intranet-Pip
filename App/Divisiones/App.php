<?php
  include("Divisiones.php");
  $Divisiones = new Divisiones();
  $op = $_POST["op"];

  if ($op == "getDivisiones") {
    echo trim($Divisiones->getDivisiones());
  }
 ?>
