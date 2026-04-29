<?php
// Iniciar sesión con namespace Ibero
if (session_status() === PHP_SESSION_NONE) { session_start(); }

require_once(__DIR__ . "/PostulantesIbero.php");
require_once(__DIR__ . "/PostulantesArchivosIbero.php");

$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");
// Soportar JSON crudo
if ($op === "") {
    $input = json_decode(file_get_contents('php://input'), true);
    if (is_array($input)) { $_POST = array_merge($_POST, $input); $op = $_POST["op"] ?? ""; }
}

$P  = new PostulantesIbero();
$PA = new PostulantesArchivosIbero();

// -------- CRUD POSTULANTES --------
if ($op == "getAllPostulantes")         { echo trim($P->getAllPostulantes()); }
if ($op == "getPostulanteById")         { echo trim($P->getPostulanteById($_POST["IdPostulante"])); }
if ($op == "updatePostulante")          {
    echo trim($P->updatePostulante($_POST["IdPostulante"],$_POST["Nombre"],$_POST["ApellidoPaterno"],
        $_POST["ApellidoMaterno"]??'',$_POST["CURP"]??'',$_POST["Telefono"]??'',$_POST["CorreoElectronico"],
        $_POST["Direccion"]??'',$_POST["Estado"]??'',$_POST["Ciudad"]??''));
}
if ($op == "getAllPostulantesGeneral")  { echo trim($P->getAllPostulantesGeneral()); exit; }
if ($op == "getPostulanteHistorialCompleto")   { echo trim($P->getPostulanteHistorialCompleto($_POST["IdPostulante"])); exit; }
if ($op == "getPostulanteResultadosEvaluaciones") { echo trim($P->getPostulanteResultadosEvaluaciones($_POST["IdPostulanteVacante"])); exit; }
if ($op == "getComparativoResultadosVacante") { echo trim($P->getComparativoResultadosVacante($_POST["IdVacante"])); exit; }
if ($op == "searchPostulante")        { echo trim($P->searchPostulante($_POST["Termino"]??'')); exit; }
if ($op == "actualizarPostulanteCompleto") {
    echo trim($P->actualizarPostulanteCompleto(
        $_POST["IdPostulante"],$_POST["Nombre"],$_POST["ApellidoPaterno"],$_POST["ApellidoMaterno"]??'',
        $_POST["CURP"]??'',$_POST["Telefono"]??'',$_POST["CorreoElectronico"],$_POST["Direccion"]??'',
        $_POST["Estado"]??'',$_POST["Ciudad"]??'',$_POST["CodigoPostal"]??'',$_POST["Colonia"]??''
    )); exit;
}

// -------- POSTULACIONES --------
if ($op == "getPostulantesByVacante")   { echo trim($P->getPostulantesByVacante($_POST["IdVacante"])); }
if ($op == "getPostulanteDetalle")      { echo trim($P->getPostulanteDetalle($_POST["IdPostulanteVacante"])); }
if ($op == "deletePostulacion")         { echo trim($P->deletePostulacion($_POST["IdPostulanteVacante"])); }
if ($op == "getEstadisticasPostulantes"){ echo trim($P->getEstadisticasPostulantes($_POST["IdVacante"])); }
if ($op == "updateEstatusPostulacion")  {
    $usr = isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0;
    echo trim($P->updateEstatusPostulacion($_POST["IdPostulanteVacante"],$_POST["EstatusPostulacion"],$_POST["Observaciones"]??'',$usr));
}

// -------- HISTORIAL / PROCESOS --------
if ($op == "getProcesosPostulacion")    { echo trim($P->getProcesosPostulacion($_POST["IdPostulanteVacante"])); }
if ($op == "addPostulanteHistorial")    {
    $usr = isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0;
    echo trim($P->addPostulanteHistorial($_POST["IdPostulanteVacante"],$_POST["IdProceso"],
        $_POST["Observaciones"]??'',$_POST["Resultado"]??null,$usr));
}

// -------- REQUISITOS --------
if ($op == "getPostulanteRequisitos")   { echo trim($P->getPostulanteRequisitos($_POST["IdPostulanteVacante"])); }
if ($op == "addPostulanteRequisito")    {
    echo trim($P->addPostulanteRequisito($_POST["IdPostulanteVacante"],$_POST["IdVacanteRequisito"],
        $_POST["Respuesta"]??'',$_POST["Cumple"]??null));
}

// -------- PORTAL PÚBLICO — POSTULACIÓN --------
if ($op == "publicApplyToVacante") {
    header('Content-Type: application/json');
    $required = ["IdVacante","Nombre","ApellidoPaterno","CURP","Telefono","CorreoElectronico","Direccion","Estado","Ciudad"];
    $missing = [];
    foreach ($required as $f) { if (empty(trim($_POST[$f] ?? ''))) $missing[] = $f; }
    if (!empty($missing)) { echo json_encode(["Resultado"=>false,"Msg"=>"Faltan campos obligatorios.","missing"=>$missing]); exit; }

    $IdVacante = $_POST["IdVacante"];
    if (is_numeric($IdVacante)) $IdVacante = base64_encode($IdVacante);

    // Validar duplicado
    $dup = json_decode($P->checkPostulacionDuplicada($_POST["CURP"],$IdVacante),true);
    if ($dup['Resultado'] && $dup['Duplicada']) {
        echo json_encode(["Resultado"=>false,"Msg"=>"Ya estás registrado en esta vacante."]); exit;
    }

    // Validar archivos
    $archivos = []; $errArchivos = [];
    foreach (['cv'=>'CV','solicitud_empleo'=>'SolicitudEmpleo'] as $campo=>$tipo) {
        if (isset($_FILES[$campo]) && $_FILES[$campo]['error'] !== UPLOAD_ERR_NO_FILE) {
            $val = $PA->validarArchivo($_FILES[$campo]);
            if (!$val['valido']) $errArchivos[] = "$tipo: " . $val['error'];
            else $archivos[$tipo] = $_FILES[$campo];
        }
    }
    if (!empty($errArchivos)) { echo json_encode(["Resultado"=>false,"Msg"=>implode('. ',$errArchivos)]); exit; }

    $r = json_decode(trim($P->addPostulanteConPostulacion($IdVacante,$_POST["Nombre"],$_POST["ApellidoPaterno"],
        $_POST["ApellidoMaterno"]??'',$_POST["CURP"],$_POST["Telefono"],$_POST["CorreoElectronico"],
        $_POST["Direccion"],$_POST["Estado"],$_POST["Ciudad"],'','',$_POST["Observaciones"]??'')),true);

    if (isset($r['Resultado']) && $r['Resultado'] && isset($r['Siguiente']) && $r['Siguiente']) {
        $pvId = $r['IdPostulanteVacante'] ?? null;
        if ($pvId && !empty($archivos)) {
            foreach ($archivos as $tipo => $file) { $PA->guardarArchivo($pvId,$tipo,$file); }
        }
        // Guardar sesión Ibero
        $_SESSION['ibero_logged_in']        = true;
        $_SESSION['ibero_curp_candidato']   = strtoupper($_POST["CURP"]);
        $_SESSION['ibero_nombre_candidato'] = $_POST["Nombre"];
        $_SESSION['ibero_apellido_p_candidato'] = $_POST["ApellidoPaterno"];
        $_SESSION['ibero_apellido_m_candidato'] = $_POST["ApellidoMaterno"] ?? '';
        $_SESSION['ibero_correo_candidato'] = $_POST["CorreoElectronico"];
        $_SESSION['ibero_telefono_candidato'] = $_POST["Telefono"];
        echo json_encode(["Resultado"=>true,"Msg"=>$r['Msg']??"¡Postulación registrada!"]);
    } else {
        echo json_encode(["Resultado"=>false,"Msg"=>$r['Msg']??'Error al procesar.']);
    }
    exit;
}

// -------- LOGIN DEL CANDIDATO --------
if ($op == "loginCandidato") {
    header('Content-Type: application/json; charset=utf-8');
    $res = json_decode($P->validarCandidato($_POST["curp"]??'',$_POST["email"]??''),true);
    if ($res['Resultado']) {
        $_SESSION['ibero_logged_in']           = true;
        $_SESSION['ibero_curp_candidato']      = $res['Data']['CURP'];
        $_SESSION['ibero_nombre_candidato']    = $res['Data']['Nombre'];
        $_SESSION['ibero_apellido_p_candidato']= $res['Data']['ApellidoPaterno'];
        $_SESSION['ibero_apellido_m_candidato']= $res['Data']['ApellidoMaterno'];
        $_SESSION['ibero_correo_candidato']    = $res['Data']['CorreoElectronico'];
        $_SESSION['ibero_telefono_candidato']  = $res['Data']['Telefono'];
        echo json_encode(["Resultado"=>true,"Msg"=>"Login exitoso."]);
    } else { echo json_encode(["Resultado"=>false,"Msg"=>$res['Msg']]); }
    exit;
}

if ($op == "postulacionesCandidato") {
    header('Content-Type: application/json; charset=utf-8');
    if (isset($_SESSION['ibero_logged_in']) && $_SESSION['ibero_logged_in'] && isset($_SESSION['ibero_curp_candidato'])) {
        echo trim($P->getPostulacionesByCurp($_SESSION['ibero_curp_candidato']));
    } else { echo json_encode(["Resultado"=>false,"Msg"=>"No hay sesión activa."]); }
    exit;
}

// -------- ARCHIVOS --------
if ($op == "getArchivosMetadata") {
    $idPV = base64_decode($_POST["IdPostulanteVacante"] ?? $_GET["IdPostulanteVacante"] ?? '');
    echo json_encode($PA->obtenerMetadatosArchivos(intval($idPV)));
}

if ($op == "downloadArchivo" || $op == "viewArchivo") {
    $token = $_GET["token"] ?? $_POST["token"] ?? '';
    if (!empty($token)) {
        $dec = $PA->desencriptarToken($token);
        if ($dec === false) { header('Content-Type: application/json'); echo json_encode(["Resultado"=>false,"Msg"=>"Token inválido."]); exit; }
        [$idPV,$tipo] = explode('|',$dec);
    } else {
        $idPV = intval(base64_decode($_POST["IdPostulanteVacante"] ?? $_GET["IdPostulanteVacante"] ?? '0'));
        $tipo = $_POST["TipoArchivo"] ?? $_GET["TipoArchivo"] ?? '';
    }
    $res = $PA->obtenerArchivo(intval($idPV),$tipo);
    if ($res['Resultado']) {
        $f = $res['Data'];
        $disp = ($op=="viewArchivo") ? "inline" : "attachment";
        header('Content-Type: '.$f['ContentType']);
        header('Content-Disposition: '.$disp.'; filename="'.$f['NombreArchivo'].'"');
        header('Content-Length: '.$f['TamanoBytes']);
        echo $f['Contenido']; exit;
    }
    header('Content-Type: application/json'); echo json_encode($res); exit;
}

// -------- CÓDIGO POSTAL --------
if ($op == "consultarCodigoPostal") {
    if (ob_get_level()) ob_clean();
    header('Content-Type: application/json; charset=utf-8');
    $cp = trim($_POST["cp"] ?? $_GET["cp"] ?? "");
    if (!preg_match('/^\d{5}$/',$cp)) { echo json_encode(["Resultado"=>false,"Msg"=>"CP inválido."]); exit; }
    try {
        require_once(dirname(__DIR__,3) . '/Backend/Configuracion/CodigosPostales.php');
        $cpSvc = new CodigosPostales();
        $res   = $cpSvc->consultarCodigoPostal($cp);
        if ($res) echo json_encode(["Resultado"=>true,"Data"=>$res], JSON_UNESCAPED_UNICODE);
        else echo json_encode(["Resultado"=>false,"Msg"=>"CP no encontrado."]);
    } catch(\Exception $e) {
        echo json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
    }
    exit;
}
?>
