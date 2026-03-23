<?php
include("Postulantes.php");

$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");

// Soportar JSON crudo para $op
if ($op === "") {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    if(is_array($input)) {
        $_POST = array_merge($_POST, $input);
        $op = isset($_POST["op"]) ? $_POST["op"] : "";
    }
}

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
    
    // ==========================================
    // PROCESAMIENTO DE ARCHIVOS (API COMPLETA)
    // ==========================================
    $carpetaDestino = "../../Archivos/Postulantes/";
    if (!file_exists($carpetaDestino)) {
        mkdir($carpetaDestino, 0777, true);
    }
    
    $timestamp = date("Ymd_His");
    
    // Procesar Archivo CV
    if (isset($_FILES['CV']) && $_FILES['CV']['error'] == 0) {
        $ext = strtolower(pathinfo($_FILES['CV']['name'], PATHINFO_EXTENSION));
        $nombreArchivoCV = "CV_" . $CURP . "_" . $timestamp . "_" . rand(10, 99) . "." . $ext;
        if (move_uploaded_file($_FILES['CV']['tmp_name'], $carpetaDestino . $nombreArchivoCV)) {
            $RutaCV = "Archivos/Postulantes/" . $nombreArchivoCV;
        }
    }
    
    // Procesar Archivo SolicitudEmpleo
    if (isset($_FILES['SolicitudEmpleo']) && $_FILES['SolicitudEmpleo']['error'] == 0) {
        $ext = strtolower(pathinfo($_FILES['SolicitudEmpleo']['name'], PATHINFO_EXTENSION));
        $nombreArchivoSE = "SE_" . $CURP . "_" . $timestamp . "_" . rand(10, 99) . "." . $ext;
        if (move_uploaded_file($_FILES['SolicitudEmpleo']['tmp_name'], $carpetaDestino . $nombreArchivoSE)) {
            $RutaSolicitudEmpleo = "Archivos/Postulantes/" . $nombreArchivoSE;
        }
    }
    
    echo trim($Postulantes->addPostulanteConPostulacion($IdVacante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
              $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad, 
              $RutaCV, $RutaSolicitudEmpleo, $Observaciones));
}

// ==========================================
// API PÚBLICA PARA POSTULARSE A UNA VACANTE
// ==========================================
if ($op == "publicApplyToVacante") {
    // Configurar cabecera para respuesta JSON
    header('Content-Type: application/json');

    $requiredFields = [
        "IdVacante", "Nombre", "ApellidoPaterno", "CURP", 
        "Telefono", "CorreoElectronico", "Direccion", "Estado", "Ciudad"
    ];
    $missingFields = [];

    // Validar campos obligatorios
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || trim($_POST[$field]) === '') {
            $missingFields[] = $field;
        }
    }

    if (count($missingFields) > 0) {
        echo json_encode([
            "success" => false, 
            "message" => "Faltan campos obligatorios", 
            "missing" => $missingFields
        ]);
        exit;
    }

    // Recoger parámetros del postulante
    $IdVacante = $_POST["IdVacante"];
    if (is_numeric($IdVacante)) {
        $IdVacante = base64_encode($IdVacante);
    }
    $Nombre = $_POST["Nombre"];
    $ApellidoPaterno = $_POST["ApellidoPaterno"];
    $ApellidoMaterno = isset($_POST["ApellidoMaterno"]) ? $_POST["ApellidoMaterno"] : '';
    $CURP = $_POST["CURP"];
    $Telefono = $_POST["Telefono"];
    $CorreoElectronico = $_POST["CorreoElectronico"];
    $Direccion = $_POST["Direccion"];
    $Estado = $_POST["Estado"];
    $Ciudad = $_POST["Ciudad"];
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : 'Postulación desde portal público';

    $RutaCV = '';
    $RutaSolicitudEmpleo = '';

    // Manejo de archivos si se enviaron
    $carpetaDestino = "../../Archivos/Postulantes/";
    if (!file_exists($carpetaDestino)) {
        mkdir($carpetaDestino, 0777, true);
    }
    
    $timestamp = date("Ymd_His");
    
    if (isset($_FILES['CV']) && $_FILES['CV']['error'] == 0) {
        $ext = strtolower(pathinfo($_FILES['CV']['name'], PATHINFO_EXTENSION));
        $nombreArchivoCV = "CV_" . $CURP . "_" . $timestamp . "_" . rand(10, 99) . "." . $ext;
        if (move_uploaded_file($_FILES['CV']['tmp_name'], $carpetaDestino . $nombreArchivoCV)) {
            $RutaCV = "Archivos/Postulantes/" . $nombreArchivoCV;
        }
    }
    
    if (isset($_FILES['SolicitudEmpleo']) && $_FILES['SolicitudEmpleo']['error'] == 0) {
        $ext = strtolower(pathinfo($_FILES['SolicitudEmpleo']['name'], PATHINFO_EXTENSION));
        $nombreArchivoSE = "SE_" . $CURP . "_" . $timestamp . "_" . rand(10, 99) . "." . $ext;
        if (move_uploaded_file($_FILES['SolicitudEmpleo']['tmp_name'], $carpetaDestino . $nombreArchivoSE)) {
            $RutaSolicitudEmpleo = "Archivos/Postulantes/" . $nombreArchivoSE;
        }
    }

    // Insertar en Base de Datos
    $resultado = trim($Postulantes->addPostulanteConPostulacion($IdVacante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
               $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad, 
               $RutaCV, $RutaSolicitudEmpleo, $Observaciones));

    $resObj = json_decode($resultado, true);
    if (isset($resObj['Resultado']) && $resObj['Resultado'] === true && isset($resObj['Siguiente']) && $resObj['Siguiente'] === true) {
        $successMsg = isset($resObj['Msg']) ? $resObj['Msg'] : "Postulación registrada exitosamente";
        echo json_encode(["success" => true, "message" => $successMsg]);
    } else {
        $errorMsg = isset($resObj['Msg']) ? $resObj['Msg'] : $resultado;
        echo json_encode(["success" => false, "message" => "Error al registrar la postulación: " . $errorMsg]);
    }
    exit;
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
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    $IdProceso = $_POST["IdProceso"];
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : '';
    $Resultado = isset($_POST["Resultado"]) ? $_POST["Resultado"] : null;
    $UsuarioRegistro = isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0;
    
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
