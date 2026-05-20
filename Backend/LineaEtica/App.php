<?php
include("LineaEtica.php");
$LineaEtica = new LineaEtica();
$op = $_POST["op"];

if ($op == "getOpcionesLineaEtica") {
    echo trim($LineaEtica->getOpcionesLineaEtica());
}
if ($op == "addMensajeLineaEtica") {
    $idCatalogoLineaEtica = $_POST["slctLineaEtica"];
    $idDivision = $_POST["division"];
    $Mensaje = $_POST["contenidoLineaEtica"];
    $sucursal = $_POST["sucursal"];
    echo trim($LineaEtica->addMensajeLineaEtica($idCatalogoLineaEtica, $Mensaje, $idDivision, $sucursal));
}

if ($op == "getMensajesLineaEtica") {
    echo trim($LineaEtica->getMensajesLineaEtica());
}
if ($op == "vistoMensajeEtica") {
    $idLineaEticaMensajes = $_POST["idLineaEticaMensajes"];
    echo trim($LineaEtica->vistoMensajeEtica($idLineaEticaMensajes));
}
if ($op == "getMensajeVistoLineaEtica") {
    echo trim($LineaEtica->getMensajeVistoLineaEtica());
}
if ($op == "VistoMensajeLineaEtica") {
    $idLineaEticaMensajes = $_POST["idLineaEticaMensajes"];
    echo trim($LineaEtica->VistoMensajeLineaEtica($idLineaEticaMensajes));
}

if ($op == "addCatalogoLiniaEtica") {
    $Descripcion = $_POST["txtNuevaEtica"];
    echo trim($LineaEtica->addCatalogoLiniaEtica($Descripcion));
}

if ($op == "updateCatalogoStatus") {
    $idCatalogoLineaEtica = $_POST["idCatalogoLineaEtica"];
    echo trim($LineaEtica->updateCatalogoStatus($idCatalogoLineaEtica));
}

if ($op == "getOpcionesLineaEticaConfig") {
    echo trim($LineaEtica->getOpcionesLineaEticaConfig());
}

if ($op == "getNotifiLineaEticaPendientes") {
  echo trim($LineaEtica->getNotifiLineaEticaPendientes());
}

if ($op == "verificarPasswordUsuario") {
    $Password = $_POST["password"] ?? "";
    echo trim($LineaEtica->verificarPasswordUsuario($Password));
}
