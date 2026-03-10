<?php
  include("TiposIncidencias.php");
  $obj = new TiposIncidencias();
  $op  = $_POST["op"];

  if ($op == "getTiposIncidencias") {
    echo trim($obj->getTiposIncidencias());
  }

  if ($op == "getPuestos") {
    echo trim($obj->getPuestos());
  }

  if ($op == "insertTipoIncidencia") {
    $nombre    = $_POST["nombre"];
    $severidad = $_POST["severidad"];
    $idPuesto  = isset($_POST["idPuesto"]) && $_POST["idPuesto"] !== '' ? $_POST["idPuesto"] : null;
    $slaHoras  = $_POST["slaHoras"];
    echo trim($obj->insertTipoIncidencia($nombre, $severidad, $idPuesto, $slaHoras));
  }

  if ($op == "updateTipoIncidencia") {
    $id        = $_POST["id"];
    $nombre    = $_POST["nombre"];
    $severidad = $_POST["severidad"];
    $idPuesto  = isset($_POST["idPuesto"]) && $_POST["idPuesto"] !== '' ? $_POST["idPuesto"] : null;
    $slaHoras  = $_POST["slaHoras"];
    echo trim($obj->updateTipoIncidencia($id, $nombre, $severidad, $idPuesto, $slaHoras));
  }

  if ($op == "toggleTipoIncidencia") {
    $id     = $_POST["id"];
    $activo = $_POST["activo"];
    echo trim($obj->toggleTipoIncidencia($id, $activo));
  }

  if ($op == "deleteTipoIncidencia") {
    $id = $_POST["id"];
    echo trim($obj->deleteTipoIncidencia($id));
  }
?>
