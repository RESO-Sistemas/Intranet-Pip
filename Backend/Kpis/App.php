<?php
  include("Kpis.php");
  $Kpis = new Kpis();
  $op = $_POST["op"];

  if ($op == "getKpis") {
    echo trim($Kpis->getKpis());
  }

  if ($op == "getPuestos") {
    echo trim($Kpis->getPuestos());
  }

  if ($op == "insertKpi") {
    $nombre = $_POST["nombre"];
    $valorAlta = $_POST["valorAlta"];
    $valorMedia = $_POST["valorMedia"];
    $valorBaja = $_POST["valorBaja"];
    $prioridad = $_POST["prioridad"];
    $puestos = $_POST["puestos"];
    echo trim($Kpis->insertKpi($nombre, $valorAlta, $valorMedia, $valorBaja, $prioridad, $puestos));
  }

  if ($op == "updateKpi") {
    $idKpi = $_POST["idKpi"];
    $nombre = $_POST["nombre"];
    $valorAlta = $_POST["valorAlta"];
    $valorMedia = $_POST["valorMedia"];
    $valorBaja = $_POST["valorBaja"];
    $prioridad = $_POST["prioridad"];
    $puestos = $_POST["puestos"];
    echo trim($Kpis->updateKpi($idKpi, $nombre, $valorAlta, $valorMedia, $valorBaja, $prioridad, $puestos));
  }

  if ($op == "toggleKpi") {
    $idKpi = $_POST["idKpi"];
    $activo = $_POST["activo"];
    echo trim($Kpis->toggleKpi($idKpi, $activo));
  }

  if ($op == "deleteKpi") {
    $idKpi = $_POST["idKpi"];
    echo trim($Kpis->deleteKpi($idKpi));
  }
?>
