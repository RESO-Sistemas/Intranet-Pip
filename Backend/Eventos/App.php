<?php
  include("Eventos.php");
  $Eventos = new Eventos();
  $op = $_POST["op"];
  if ($op == "getEventos") {
    $fecha = $_POST["fecha"];
    echo trim($Eventos->getEventos($fecha));
  }

  if ($op == "getEventosAdmin") {
    $fecha = $_POST["fecha"];
    echo trim($Eventos->getEventosAdmin($fecha));
  }

  if ($op == "getEventosDetalle") {
    $fecha = $_POST["fecha"];
    echo trim($Eventos->getEventosDetalle($fecha));
  }

  if ($op == "addEvento") {
    $Titulo = $_POST["txtTitulo"];
    $Descripcion = $_POST["txtDescripcion"];
    $FechaInicio = $_POST["txtFechaInicio"];
    $FechaFin = $_POST["txtFechaFin"];
    $HoraInicio = $_POST["txtHoraInicio"];
    $HoraFin = $_POST["txtHoraFin"];
    echo trim($Eventos->addEvento($Titulo,$Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin));
  }

  if ($op == "getDatosEvento") {
    $idEventos = $_POST["idEventos"];
    echo trim($Eventos->getDatosEvento($idEventos));
  }

  if ($op == "updateEvento") {
    $Titulo = $_POST["txtTitulo"];
    $Descripcion = $_POST["txtDescripcion"];
    $FechaInicio = $_POST["txtFechaInicio"];
    $FechaFin = $_POST["txtFechaFin"];
    $HoraInicio = $_POST["txtHoraInicio"];
    $HoraFin = $_POST["txtHoraFin"];
    $idEventos = $_POST["idEventos"];
    echo trim($Eventos->updateEvento($Titulo,$Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin,$idEventos));
  }
  if ($op == "updateStatusEvento") {
    $Status = $_POST["Status"];
    $idEventos = $_POST["idEventos"];
    echo trim($Eventos->updateStatusEvento($Status,$idEventos));
  }
 ?>
