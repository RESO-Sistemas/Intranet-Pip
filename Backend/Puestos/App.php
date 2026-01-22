<?php
  include("Puestos.php");
  $Puestos = new Puestos();
  $op = $_POST["op"];

  if ($op == "getPuestos") {
    echo trim($Puestos->getPuestos());
  }

  if ($op == "getPuestosXDivision") {
    $IdDivision = $_POST["IdDivision"];
    echo trim($Puestos->getPuestosXDivision($IdDivision));
  }

  if ($op == "updateDescPuesto") {
    $Puesto = $_POST["Puesto"];
    $IdPuesto = $_POST["IdPuesto"];
    echo trim($Puestos->updateDescPuesto($Puesto,$IdPuesto));
  }

  if ($op == "addPuestos") {
    $nPuesto = $_POST["nPuesto"];
    $nIdDivision = $_POST["nIdDivision"];
    echo trim($Puestos->addPuestos($nPuesto,$nIdDivision));
  }

  if ($op == "asignaJefePuesto") {
    $nIdPuesto = $_POST["nIdPuesto"];
    echo trim($Puestos->asignaJefePuesto($nIdPuesto));
  }

  if ($op == "asignaJefesPuesto") {
    $Jefes = $_POST["j"];
    $IdPuesto = $_POST["ip"];
    echo trim($Puestos->asignaJefesPuesto($Jefes,$IdPuesto));
  }

  if ($op == "loadJefesAsigPuesto") {
    $IdPuesto = $_POST["ip"];
    echo trim($Puestos->loadJefesAsigPuesto($IdPuesto));
  }

  if ($op == "getListPuestosDivision") {
    $IdDivision = $_POST["IdDivision"];
    echo trim($Puestos->getListPuestosDivision($IdDivision));
  }
 ?>
