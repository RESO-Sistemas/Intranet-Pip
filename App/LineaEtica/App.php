<?php
include("LineaEtica.php");
$LineaEtica = new LineaEtica();
$op = $_POST["op"];

if ($op == "getDivision") {
    echo trim($LineaEtica->getDivision());
}
if ($op == "getOpcionesLineaEtica") {
    echo trim($LineaEtica->getOpcionesLineaEtica());
}
if ($op == "addMensajeLineaEtica") {
    $idCatalogoLineaEtica = $_POST["slctLineaEtica"];
    $idDivision = $_POST["division"];
    $Mensaje = $_POST["contenidoLineaEtica"];
    $NoEmpleado = $_POST["NoEmpleado"];
    echo trim($LineaEtica->addMensajeLineaEtica($idCatalogoLineaEtica, $Mensaje, $idDivision,$NoEmpleado));
}
if ($op == "getMensajesLineaEticaPendientes") {
    echo trim($LineaEtica->getMensajesLineaEticaPendientes());
}
if ($op == "vistoMensajeEtica") {
    $idLineaEticaMensajes = $_POST["idLineaEticaMensajes"];
    echo trim($LineaEtica->vistoMensajeEtica($idLineaEticaMensajes));
}
if ($op == "getMensajeVistoLineaEtica") {
    $NoEmpleado = $_POST["NoEmpleado"];
    echo trim($LineaEtica->getMensajeVistoLineaEtica($NoEmpleado));
}
if ($op == "VistoMensajeLineaEtica") {
    $idLineaEticaMensajes = $_POST["idLineaEticaMensajes"];
    echo trim($LineaEtica->VistoMensajeLineaEtica($idLineaEticaMensajes));
}
?>
