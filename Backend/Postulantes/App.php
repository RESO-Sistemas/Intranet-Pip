<?php
include("Postulantes.php");

$op = $_POST["op"];
$Postulantes = new Postulantes();

// ==========================================
// CRUD DE POSTULANTES
// ==========================================

// Obtener todos los postulantes
if ($op == "getAllPostulantes") {
    echo trim($Postulantes->getAllPostulantes());
}

// Buscar postulante
if ($op == "searchPostulante") {
    $Termino = $_POST["Termino"];
    echo trim($Postulantes->searchPostulante($Termino));
}

// Agregar nuevo postulante
if ($op == "addPostulante") {
    $Nombre = $_POST["Nombre"];
    $ApellidoPaterno = $_POST["ApellidoPaterno"];
    $ApellidoMaterno = isset($_POST["ApellidoMaterno"]) ? $_POST["ApellidoMaterno"] : '';
    $CURP = isset($_POST["CURP"]) ? $_POST["CURP"] : '';
    $Telefono = isset($_POST["Telefono"]) ? $_POST["Telefono"] : '';
    $CorreoElectronico = $_POST["CorreoElectronico"];
    $Direccion = isset($_POST["Direccion"]) ? $_POST["Direccion"] : '';
    $Estado = isset($_POST["Estado"]) ? $_POST["Estado"] : '';
    $Ciudad = isset($_POST["Ciudad"]) ? $_POST["Ciudad"] : '';
    
    echo trim($Postulantes->addPostulante($Nombre, $ApellidoPaterno, $ApellidoMaterno, 
              $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad));
}

// Actualizar postulante
if ($op == "updatePostulante") {
    $IdPostulante = $_POST["IdPostulante"];
    $Nombre = $_POST["Nombre"];
    $ApellidoPaterno = $_POST["ApellidoPaterno"];
    $ApellidoMaterno = isset($_POST["ApellidoMaterno"]) ? $_POST["ApellidoMaterno"] : '';
    $CURP = isset($_POST["CURP"]) ? $_POST["CURP"] : '';
    $Telefono = isset($_POST["Telefono"]) ? $_POST["Telefono"] : '';
    $CorreoElectronico = $_POST["CorreoElectronico"];
    $Direccion = isset($_POST["Direccion"]) ? $_POST["Direccion"] : '';
    $Estado = isset($_POST["Estado"]) ? $_POST["Estado"] : '';
    $Ciudad = isset($_POST["Ciudad"]) ? $_POST["Ciudad"] : '';
    
    echo trim($Postulantes->updatePostulante($IdPostulante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
              $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad));
}

// Eliminar postulante
if ($op == "deletePostulante") {
    $IdPostulante = $_POST["IdPostulante"];
    echo trim($Postulantes->deletePostulante($IdPostulante));
}

// ==========================================
// POSTULACIONES (PostulantesVacantes)
// ==========================================

// Obtener postulantes de una vacante
if ($op == "getPostulantesByVacante") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Postulantes->getPostulantesByVacante($IdVacante));
}

// Obtener detalle de un postulante en una vacante
if ($op == "getPostulanteDetalle") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    echo trim($Postulantes->getPostulanteDetalle($IdPostulanteVacante));
}

// Agregar postulación (postulante existente a vacante)
if ($op == "addPostulacion") {
    $IdVacante = $_POST["IdVacante"];
    $IdPostulante = $_POST["IdPostulante"];
    $RutaCV = isset($_POST["RutaCV"]) ? $_POST["RutaCV"] : '';
    $RutaSolicitudEmpleo = isset($_POST["RutaSolicitudEmpleo"]) ? $_POST["RutaSolicitudEmpleo"] : '';
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    
    echo trim($Postulantes->addPostulacion($IdVacante, $IdPostulante, $RutaCV, $RutaSolicitudEmpleo, $Observaciones));
}

// Agregar postulante nuevo con postulación en un solo paso
if ($op == "addPostulanteConPostulacion") {
    $IdVacante = $_POST["IdVacante"];
    $Nombre = $_POST["Nombre"];
    $ApellidoPaterno = $_POST["ApellidoPaterno"];
    $ApellidoMaterno = isset($_POST["ApellidoMaterno"]) ? $_POST["ApellidoMaterno"] : '';
    $CURP = isset($_POST["CURP"]) ? $_POST["CURP"] : '';
    $Telefono = isset($_POST["Telefono"]) ? $_POST["Telefono"] : '';
    $CorreoElectronico = $_POST["CorreoElectronico"];
    $Direccion = isset($_POST["Direccion"]) ? $_POST["Direccion"] : '';
    $Estado = isset($_POST["Estado"]) ? $_POST["Estado"] : '';
    $Ciudad = isset($_POST["Ciudad"]) ? $_POST["Ciudad"] : '';
    $RutaCV = isset($_POST["RutaCV"]) ? $_POST["RutaCV"] : '';
    $RutaSolicitudEmpleo = isset($_POST["RutaSolicitudEmpleo"]) ? $_POST["RutaSolicitudEmpleo"] : '';
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    
    echo trim($Postulantes->addPostulanteConPostulacion($IdVacante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
              $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad, 
              $RutaCV, $RutaSolicitudEmpleo, $Observaciones));
}

// Actualizar estatus de postulación
if ($op == "updateEstatusPostulacion") {
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    $EstatusPostulacion = $_POST["EstatusPostulacion"];
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    $UsuarioRegistro = isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0;
    
    echo trim($Postulantes->updateEstatusPostulacion($IdPostulanteVacante, $EstatusPostulacion, $Observaciones, $UsuarioRegistro));
}


// Eliminar postulación
if ($op == "deletePostulacion") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    echo trim($Postulantes->deletePostulacion($IdPostulanteVacante));
}

// Obtener estadísticas de postulantes por vacante
if ($op == "getEstadisticasPostulantes") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Postulantes->getEstadisticasPostulantes($IdVacante));
}

// ==========================================
// REQUISITOS DE POSTULANTES
// ==========================================

// Obtener requisitos respondidos por un postulante
if ($op == "getPostulanteRequisitos") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    echo trim($Postulantes->getPostulanteRequisitos($IdPostulanteVacante));
}

// Agregar/actualizar respuesta de requisito
if ($op == "addPostulanteRequisito") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    $IdVacanteRequisito = $_POST["IdVacanteRequisito"];
    $Respuesta = isset($_POST["Respuesta"]) ? $_POST["Respuesta"] : '';
    $Cumple = isset($_POST["Cumple"]) ? $_POST["Cumple"] : null;
    
    echo trim($Postulantes->addPostulanteRequisito($IdPostulanteVacante, $IdVacanteRequisito, $Respuesta, $Cumple));
}

// Actualizar evaluación de requisito (Respuesta y Cumple)
if ($op == "updatePostulanteRequisito") {
    $IdPostulanteRequisito = $_POST["IdPostulanteRequisito"];
    $Respuesta = isset($_POST["Respuesta"]) ? $_POST["Respuesta"] : '';
    $Cumple = $_POST["Cumple"];
    
    echo trim($Postulantes->updatePostulanteRequisito($IdPostulanteRequisito, $Respuesta, $Cumple));
}

// ==========================================
// HISTORIAL DE PROCESOS
// ==========================================

// Obtener historial de un postulante
if ($op == "getPostulanteHistorial") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    echo trim($Postulantes->getPostulanteHistorial($IdPostulanteVacante));
}

// Agregar registro de historial
if ($op == "addPostulanteHistorial") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    $IdProceso = $_POST["IdProceso"];
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    $Resultado = isset($_POST["Resultado"]) ? $_POST["Resultado"] : null;
    $UsuarioRegistro = isset($_POST["UsuarioRegistro"]) ? $_POST["UsuarioRegistro"] : 0;
    
    echo trim($Postulantes->addPostulanteHistorial($IdPostulanteVacante, $IdProceso, $Observaciones, $Resultado, $UsuarioRegistro));
}

// ==========================================
// POSTULANTES (VISTA GENERAL)
// ==========================================

if ($op == "getAllPostulantesGeneral") {
    echo trim($Postulantes->getAllPostulantesGeneral());
}

if ($op == "getPostulanteHistorialCompleto") {
    $IdPostulante = $_POST["IdPostulante"];
    echo trim($Postulantes->getPostulanteHistorialCompleto($IdPostulante));
}

if ($op == "getProcesosPostulacion") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    echo trim($Postulantes->getProcesosPostulacion($IdPostulanteVacante));
}
