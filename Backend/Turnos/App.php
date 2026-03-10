<?php
  include("Turnos.php");
  $Turnos = new Turnos();
  $op = $_POST["op"];

  if ($op == "getTurnos") {
    echo trim($Turnos->getTurnos());
  }

  if ($op == "getPuestos") {
    echo trim($Turnos->getPuestos());
  }

  if ($op == "insertTurno") {
    $nombre     = $_POST["nombre"];
    $horaInicio = $_POST["horaInicio"];
    $horaFin    = $_POST["horaFin"];
    $idPuesto   = $_POST["idPuesto"];
    echo trim($Turnos->insertTurno($nombre, $horaInicio, $horaFin, $idPuesto));
  }

  if ($op == "updateTurno") {
    $idTurno    = $_POST["idTurno"];
    $nombre     = $_POST["nombre"];
    $horaInicio = $_POST["horaInicio"];
    $horaFin    = $_POST["horaFin"];
    $idPuesto   = $_POST["idPuesto"];
    echo trim($Turnos->updateTurno($idTurno, $nombre, $horaInicio, $horaFin, $idPuesto));
  }

  if ($op == "toggleTurno") {
    $idTurno = $_POST["idTurno"];
    $activo  = $_POST["activo"];
    echo trim($Turnos->toggleTurno($idTurno, $activo));
  }

  if ($op == "deleteTurno") {
    $idTurno = $_POST["idTurno"];
    echo trim($Turnos->deleteTurno($idTurno));
  }
?>
