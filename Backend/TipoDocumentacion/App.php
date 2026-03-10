<?php
include("TipoDocumentacion.php");

$op = $_POST["op"];
$TipoDocumentacion = new TipoDocumentacion();

// Obtener todos los tipos de documentación
if ($op == "getTiposDocumentacion") {
    echo trim($TipoDocumentacion->getTiposDocumentacion());
}

// Obtener solo tipos de documentación activos (para combos)
if ($op == "getTiposDocumentacionActivos") {
    echo trim($TipoDocumentacion->getTiposDocumentacionActivos());
}

// Obtener un tipo de documento por ID
if ($op == "getTipoDocumentoById") {
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    echo trim($TipoDocumentacion->getTipoDocumentoById($IdTipoDocumento));
}

// Agregar nuevo tipo de documento
if ($op == "addTipoDocumento") {
    $NombreDocumento = $_POST["NombreDocumento"];
    $Obligatorio = $_POST["Obligatorio"];
    echo trim($TipoDocumentacion->addTipoDocumento($NombreDocumento, $Obligatorio));
}

// Actualizar tipo de documento
if ($op == "updateTipoDocumento") {
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    $NombreDocumento = $_POST["NombreDocumento"];
    $Obligatorio = $_POST["Obligatorio"];
    echo trim($TipoDocumentacion->updateTipoDocumento($IdTipoDocumento, $NombreDocumento, $Obligatorio));
}

// Cambiar estatus (Activar/Desactivar)
if ($op == "toggleEstatusTipoDocumento") {
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    echo trim($TipoDocumentacion->toggleEstatusTipoDocumento($IdTipoDocumento));
}

// Eliminar tipo de documento
if ($op == "deleteTipoDocumento") {
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    echo trim($TipoDocumentacion->deleteTipoDocumento($IdTipoDocumento));
}
