<?php
include("Postulantes.php");
include("PostulantesArchivos.php");

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
            "Resultado" => false, 
            "Msg" => "Faltan campos obligatorios", 
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
    $Observaciones = isset($_POST["Observaciones"]) ? $_POST["Observaciones"] : 'Postulacion desde portal publico';

    // Las rutas quedan vacias ya que los archivos se guardan como BLOB
    $RutaCV = '';
    $RutaSolicitudEmpleo = '';

    // Validar archivos antes de guardar el postulante
    $PostulantesArchivos = new PostulantesArchivos();
    $archivosParaGuardar = [];
    $erroresArchivos = [];

    // Validar CV si se envio
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] !== UPLOAD_ERR_NO_FILE) {
        $validacionCV = $PostulantesArchivos->validarArchivo($_FILES['cv']);
        if (!$validacionCV['valido']) {
            $erroresArchivos[] = "CV: " . $validacionCV['error'];
        } else {
            $archivosParaGuardar['CV'] = $_FILES['cv'];
        }
    }

    // Validar Solicitud de Empleo si se envio
    if (isset($_FILES['solicitud_empleo']) && $_FILES['solicitud_empleo']['error'] !== UPLOAD_ERR_NO_FILE) {
        $validacionSE = $PostulantesArchivos->validarArchivo($_FILES['solicitud_empleo']);
        if (!$validacionSE['valido']) {
            $erroresArchivos[] = "Solicitud de Empleo: " . $validacionSE['error'];
        } else {
            $archivosParaGuardar['SolicitudEmpleo'] = $_FILES['solicitud_empleo'];
        }
    }

    // Si hay errores en los archivos, retornar error
    if (count($erroresArchivos) > 0) {
        echo json_encode([
            "Resultado" => false,
            "Msg" => "Error en los archivos: " . implode(". ", $erroresArchivos)
        ]);
        exit;
    }

    // Insertar postulante y postulacion en Base de Datos
    $resultado = trim($Postulantes->addPostulanteConPostulacion($IdVacante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
               $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad, 
               $RutaCV, $RutaSolicitudEmpleo, $Observaciones));

    $resObj = json_decode($resultado, true);
    
    if (isset($resObj['Resultado']) && $resObj['Resultado'] === true && isset($resObj['Siguiente']) && $resObj['Siguiente'] === true) {
        // Obtener el IdPostulanteVacante para guardar los archivos
        $IdPostulanteVacante = isset($resObj['IdPostulanteVacante']) ? $resObj['IdPostulanteVacante'] : null;
        
        if ($IdPostulanteVacante && count($archivosParaGuardar) > 0) {
            $erroresGuardado = [];
            
            foreach ($archivosParaGuardar as $tipo => $archivo) {
                $resultadoArchivo = $PostulantesArchivos->guardarArchivo($IdPostulanteVacante, $tipo, $archivo);
                if (!$resultadoArchivo['Resultado']) {
                    $erroresGuardado[] = $tipo . ": " . $resultadoArchivo['Msg'];
                }
            }
            
            if (count($erroresGuardado) > 0) {
                // La postulacion se guardo pero hubo errores con los archivos
                echo json_encode([
                    "Resultado" => true,
                    "Msg" => "Postulacion registrada, pero hubo errores al guardar algunos archivos: " . implode(". ", $erroresGuardado)
                ]);
            } else {
                $successMsg = isset($resObj['Msg']) ? $resObj['Msg'] : "Postulacion registrada exitosamente";
                echo json_encode(["Resultado" => true, "Msg" => $successMsg]);
            }
        } else {
            $successMsg = isset($resObj['Msg']) ? $resObj['Msg'] : "Postulacion registrada exitosamente";
            echo json_encode(["Resultado" => true, "Msg" => $successMsg]);
        }
    } else {
        $errorMsg = isset($resObj['Msg']) ? $resObj['Msg'] : $resultado;
        echo json_encode(["Resultado" => false, "Msg" => "Error al registrar la postulacion: " . $errorMsg]);
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

// ==========================================
// GESTIÓN DE ARCHIVOS (BLOB)
// ==========================================

$PostulantesArchivos = new PostulantesArchivos();

// Obtener metadatos de archivos de una postulación (sin contenido binario)
if ($op == "getArchivosMetadata") {
    $IdPostulanteVacante = isset($_POST["IdPostulanteVacante"]) ? $_POST["IdPostulanteVacante"] : $_GET["IdPostulanteVacante"];
    $IdPostulanteVacante = base64_decode($IdPostulanteVacante);
    echo json_encode($PostulantesArchivos->obtenerMetadatosArchivos($IdPostulanteVacante));
}

// Descargar archivo (CV o SolicitudEmpleo)
if ($op == "downloadArchivo") {
    // Soportar tanto token encriptado como parametros directos (para retrocompatibilidad)
    $token = isset($_GET["token"]) ? $_GET["token"] : (isset($_POST["token"]) ? $_POST["token"] : '');
    
    if (!empty($token)) {
        // Modo con token encriptado
        $datosDesencriptados = $PostulantesArchivos->desencriptarToken($token);
        
        if ($datosDesencriptados === false) {
            header('Content-Type: application/json');
            echo json_encode(["Resultado" => false, "Msg" => "Token invalido o expirado"]);
            exit;
        }
        
        // Parsear datos: formato "idPostulanteVacante|tipoArchivo"
        $partes = explode('|', $datosDesencriptados);
        if (count($partes) !== 2) {
            header('Content-Type: application/json');
            echo json_encode(["Resultado" => false, "Msg" => "Formato de token invalido"]);
            exit;
        }
        
        $IdPostulanteVacante = $partes[0];
        $TipoArchivo = $partes[1];
    } else {
        // Modo tradicional con parametros directos
        $IdPostulanteVacante = isset($_POST["IdPostulanteVacante"]) ? $_POST["IdPostulanteVacante"] : (isset($_GET["IdPostulanteVacante"]) ? $_GET["IdPostulanteVacante"] : '');
        $TipoArchivo = isset($_POST["TipoArchivo"]) ? $_POST["TipoArchivo"] : (isset($_GET["TipoArchivo"]) ? $_GET["TipoArchivo"] : '');
        
        if (empty($IdPostulanteVacante) || empty($TipoArchivo)) {
            header('Content-Type: application/json');
            echo json_encode(["Resultado" => false, "Msg" => "Faltan parametros requeridos"]);
            exit;
        }
        
        // Decodificar si esta en base64
        if (preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $IdPostulanteVacante) && strlen($IdPostulanteVacante) > 4) {
            $decoded = base64_decode($IdPostulanteVacante, true);
            if ($decoded !== false && is_numeric($decoded)) {
                $IdPostulanteVacante = $decoded;
            }
        }
    }
    
    $resultado = $PostulantesArchivos->obtenerArchivo($IdPostulanteVacante, $TipoArchivo);
    
    if ($resultado['Resultado'] && isset($resultado['Data'])) {
        $archivo = $resultado['Data'];
        
        // Configurar headers para descarga
        header('Content-Type: ' . $archivo['ContentType']);
        header('Content-Disposition: attachment; filename="' . $archivo['NombreArchivo'] . '"');
        header('Content-Length: ' . $archivo['TamanoBytes']);
        header('Cache-Control: no-cache, must-revalidate');
        header('Pragma: no-cache');
        
        // Enviar contenido binario
        echo $archivo['Contenido'];
        exit;
    } else {
        header('Content-Type: application/json');
        echo json_encode($resultado);
        exit;
    }
}

// Ver archivo en el navegador (inline, para PDFs e imagenes)
if ($op == "viewArchivo") {
    // Soportar tanto token encriptado como parametros directos (para retrocompatibilidad)
    $token = isset($_GET["token"]) ? $_GET["token"] : (isset($_POST["token"]) ? $_POST["token"] : '');
    
    if (!empty($token)) {
        // Modo con token encriptado
        $datosDesencriptados = $PostulantesArchivos->desencriptarToken($token);
        
        if ($datosDesencriptados === false) {
            header('Content-Type: application/json');
            echo json_encode(["Resultado" => false, "Msg" => "Token invalido o expirado"]);
            exit;
        }
        
        // Parsear datos: formato "idPostulanteVacante|tipoArchivo"
        $partes = explode('|', $datosDesencriptados);
        if (count($partes) !== 2) {
            header('Content-Type: application/json');
            echo json_encode(["Resultado" => false, "Msg" => "Formato de token invalido"]);
            exit;
        }
        
        $IdPostulanteVacante = $partes[0];
        $TipoArchivo = $partes[1];
    } else {
        // Modo tradicional con parametros directos
        $IdPostulanteVacante = isset($_POST["IdPostulanteVacante"]) ? $_POST["IdPostulanteVacante"] : (isset($_GET["IdPostulanteVacante"]) ? $_GET["IdPostulanteVacante"] : '');
        $TipoArchivo = isset($_POST["TipoArchivo"]) ? $_POST["TipoArchivo"] : (isset($_GET["TipoArchivo"]) ? $_GET["TipoArchivo"] : '');
        
        if (empty($IdPostulanteVacante) || empty($TipoArchivo)) {
            header('Content-Type: application/json');
            echo json_encode(["Resultado" => false, "Msg" => "Faltan parametros requeridos"]);
            exit;
        }
        
        // Decodificar si esta en base64
        if (preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $IdPostulanteVacante) && strlen($IdPostulanteVacante) > 4) {
            $decoded = base64_decode($IdPostulanteVacante, true);
            if ($decoded !== false && is_numeric($decoded)) {
                $IdPostulanteVacante = $decoded;
            }
        }
    }
    
    $resultado = $PostulantesArchivos->obtenerArchivo($IdPostulanteVacante, $TipoArchivo);
    
    if ($resultado['Resultado'] && isset($resultado['Data'])) {
        $archivo = $resultado['Data'];
        
        // Configurar headers para ver en navegador (inline)
        header('Content-Type: ' . $archivo['ContentType']);
        header('Content-Disposition: inline; filename="' . $archivo['NombreArchivo'] . '"');
        header('Content-Length: ' . $archivo['TamanoBytes']);
        header('Cache-Control: no-cache, must-revalidate');
        
        // Enviar contenido binario
        echo $archivo['Contenido'];
        exit;
    } else {
        header('Content-Type: application/json');
        echo json_encode($resultado);
        exit;
    }
}

// Eliminar un archivo especifico
if ($op == "deleteArchivo") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    $TipoArchivo = $_POST["TipoArchivo"];
    
    $IdPostulanteVacante = base64_decode($IdPostulanteVacante);
    
    echo json_encode($PostulantesArchivos->eliminarArchivo($IdPostulanteVacante, $TipoArchivo));
}

// Eliminar todos los archivos de una postulacion
if ($op == "deleteAllArchivos") {
    $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
    $IdPostulanteVacante = base64_decode($IdPostulanteVacante);
    
    echo json_encode($PostulantesArchivos->eliminarTodosArchivos($IdPostulanteVacante));
}
