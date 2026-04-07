<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

include("EvaluacionesPostulante.php");

$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");

$EvaluacionesPostulante = new EvaluacionesPostulante();

// ==========================================
// MIDDLEWARE: Verificar sesión activa del candidato
// Aplica a todas las operaciones excepto "loginCandidato"
// (el login ya está en Backend/Postulantes/App.php)
// ==========================================
$operacionesProtegidas = [
    "getEvaluacionesPostulante",
    "getEvaluacionesPorProceso",
    "getPreguntasEvaluacionPostulante",
    "saveRespuestasPostulante",
    "finalizarEvaluacionPostulante"
];

if (in_array($op, $operacionesProtegidas)) {
    if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true || empty($_SESSION['curp_candidato'])) {
        echo json_encode([
            "Resultado" => false,
            "Siguiente" => false,
            "Msg"       => "Sesión no válida. Inicia sesión para continuar."
        ]);
        exit;
    }
}

$curpSesion = isset($_SESSION['curp_candidato']) ? $_SESSION['curp_candidato'] : '';

// ==========================================
// GET: EVALUACIONES DEL POSTULANTE
// Retorna todas las evaluaciones asignadas al postulante (por vacante y proceso)
// Verifica con la CURP de la sesión activa
// ==========================================
if ($op == "getEvaluacionesPostulante") {
    echo trim($EvaluacionesPostulante->getEvaluacionesPostulante($curpSesion));
}

// ==========================================
// GET: EVALUACIONES POR PROCESO
// Retorna las evaluaciones asociadas a un proceso específico
// Requiere: IdProceso (int)
// ==========================================
if ($op == "getEvaluacionesPorProceso") {
    $IdProceso = isset($_POST["IdProceso"]) ? $_POST["IdProceso"] : (isset($_GET["IdProceso"]) ? $_GET["IdProceso"] : 0);
    echo trim($EvaluacionesPostulante->getEvaluacionesPorProceso($IdProceso, $curpSesion));
}

// ==========================================
// GET: PREGUNTAS DE UNA EVALUACIÓN
// Requiere: IdPostulanteEvaluacion (int)
// Verifica propiedad contra CURP de sesión
// ==========================================
if ($op == "getPreguntasEvaluacionPostulante") {
    $IdPostulanteEvaluacion = $_POST["IdPostulanteEvaluacion"];
    echo trim($EvaluacionesPostulante->getPreguntasEvaluacionPostulante($IdPostulanteEvaluacion, $curpSesion));
}

// ==========================================
// POST: GUARDAR RESPUESTAS
// Requiere: IdPostulanteEvaluacion (int)
//           respuestas (JSON string) → [{"IdPregunta": 5, "Respuesta": "A"}, ...]
// Verifica propiedad contra CURP de sesión
// ==========================================
if ($op == "saveRespuestasPostulante") {
    $IdPostulanteEvaluacion = $_POST["IdPostulanteEvaluacion"];

    // Aceptar respuestas como JSON string o como array directo
    $respuestasRaw = isset($_POST["respuestas"]) ? $_POST["respuestas"] : "[]";
    $respuestas = is_array($respuestasRaw)
        ? $respuestasRaw
        : json_decode($respuestasRaw, true);

    if (!is_array($respuestas)) {
        echo json_encode([
            "Resultado" => false,
            "Siguiente" => false,
            "Msg"       => "El campo 'respuestas' debe ser un arreglo JSON. Ejemplo: [{\"IdPregunta\":5,\"Respuesta\":\"A\"}]"
        ]);
        exit;
    }

    echo trim($EvaluacionesPostulante->saveRespuestasPostulante($IdPostulanteEvaluacion, $respuestas, $curpSesion));
}

// ==========================================
// POST: FINALIZAR EVALUACIÓN
// Requiere: IdPostulanteEvaluacion (int)
// Calcula calificación y cierra la evaluación
// ==========================================
if ($op == "finalizarEvaluacionPostulante") {
    $IdPostulanteEvaluacion = $_POST["IdPostulanteEvaluacion"];
    echo trim($EvaluacionesPostulante->finalizarEvaluacionPostulante($IdPostulanteEvaluacion, $curpSesion));
}
