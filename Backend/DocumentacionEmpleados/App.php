<?php
include("DocumentacionEmpleados.php");

$op = $_POST["op"];
$DocEmpleados = new DocumentacionEmpleados();

// ==========================================
// ENFOQUE 1: Vista inteligente por empleado
// ==========================================

// Obtener TODOS los tipos con estatus del empleado (LEFT JOIN)
if ($op == "getDocumentacionCompletaEmpleado") {
    $NoEmpleado = $_POST["NoEmpleado"];
    echo trim($DocEmpleados->getDocumentacionCompletaEmpleado($NoEmpleado));
}

// Marcar/actualizar documento (INSERT o UPDATE)
if ($op == "marcarDocumentoEntregado") {
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    $NoEmpleado = $_POST["NoEmpleado"];
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    $Estatus = $_POST["Estatus"];
    $FechaCarga = isset($_POST["FechaCarga"]) ? $_POST["FechaCarga"] : '';
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    $UsuarioRegistro = isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0;

    echo trim($DocEmpleados->marcarDocumentoEntregado($NoEmpleado, $IdTipoDocumento, $Estatus, $FechaCarga, $Observaciones, $UsuarioRegistro));
}

// ==========================================
// ENFOQUE 2: Vista checklist por tipo de doc
// ==========================================

// Obtener todos los empleados con estatus de un tipo de documento
if ($op == "getEntregasPorTipoDocumento") {
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    echo trim($DocEmpleados->getEntregasPorTipoDocumento($IdTipoDocumento));
}

// ==========================================
// CRUD ORIGINAL
// ==========================================

// Obtener documentación de un empleado
if ($op == "getDocumentacionEmpleado") {
    $NoEmpleado = $_POST["NoEmpleado"];
    echo trim($DocEmpleados->getDocumentacionEmpleado($NoEmpleado));
}

// Agregar documento a un empleado
if ($op == "addDocumentacionEmpleado") {
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    $NoEmpleado = $_POST["NoEmpleado"];
    $IdTipoDocumento = $_POST["IdTipoDocumento"];
    $Estatus = $_POST["Estatus"];
    $FechaCarga = isset($_POST["FechaCarga"]) ? $_POST["FechaCarga"] : '';
    $FechaVencimiento = isset($_POST["FechaVencimiento"]) ? $_POST["FechaVencimiento"] : '';
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    $UsuarioRegistro = isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0;

    echo trim($DocEmpleados->addDocumentacionEmpleado($NoEmpleado, $IdTipoDocumento, $Estatus, $FechaCarga, $FechaVencimiento, $Observaciones, $UsuarioRegistro));
}

// Actualizar documento
if ($op == "updateDocumentacionEmpleado") {
    $IdDocumentacionEmpleado = $_POST["IdDocumentacionEmpleado"];
    $Estatus = $_POST["Estatus"];
    $FechaCarga = isset($_POST["FechaCarga"]) ? $_POST["FechaCarga"] : '';
    $FechaVencimiento = isset($_POST["FechaVencimiento"]) ? $_POST["FechaVencimiento"] : '';
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';

    echo trim($DocEmpleados->updateDocumentacionEmpleado($IdDocumentacionEmpleado, $Estatus, $FechaCarga, $FechaVencimiento, $Observaciones));
}

// Eliminar documento
if ($op == "deleteDocumentacionEmpleado") {
    $IdDocumentacionEmpleado = $_POST["IdDocumentacionEmpleado"];
    echo trim($DocEmpleados->deleteDocumentacionEmpleado($IdDocumentacionEmpleado));
}
