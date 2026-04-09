<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

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
try {
    if ($op == "getEvaluacionesPostulante") {
        echo trim($EvaluacionesPostulante->getEvaluacionesPostulante($curpSesion));
        exit;
    }

// ==========================================
// GET: EVALUACIONES POR PROCESO
// Retorna las evaluaciones asociadas a un proceso específico
// Requiere: IdProceso (int)
// ==========================================
    if ($op == "getEvaluacionesPorProceso") {
        $IdProceso = isset($_POST["IdProceso"]) ? $_POST["IdProceso"] : (isset($_GET["IdProceso"]) ? $_GET["IdProceso"] : 0);
        echo trim($EvaluacionesPostulante->getEvaluacionesPorProceso($IdProceso, $curpSesion));
        exit;
    }

// ==========================================
// GET: PREGUNTAS DE UNA EVALUACIÓN
// Requiere: IdPostulanteEvaluacion (int)
// Verifica propiedad contra CURP de sesión
// ==========================================
    if ($op == "getPreguntasEvaluacionPostulante") {
        $IdPostulanteEvaluacion = isset($_POST["IdPostulanteEvaluacion"])
            ? $_POST["IdPostulanteEvaluacion"]
            : (isset($_GET["IdPostulanteEvaluacion"]) ? $_GET["IdPostulanteEvaluacion"] : 0);

        if (intval($IdPostulanteEvaluacion) <= 0) {
            echo json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Msg"       => "Parámetro IdPostulanteEvaluacion inválido."
            ]);
            exit;
        }

        echo trim($EvaluacionesPostulante->getPreguntasEvaluacionPostulante($IdPostulanteEvaluacion, $curpSesion));
        exit;
    }

// ==========================================
// POST: GUARDAR RESPUESTAS
// Requiere: IdPostulanteEvaluacion (int)
//           respuestas (JSON string) → [{"IdPregunta": 5, "Respuesta": "A"}, ...]
// Verifica propiedad contra CURP de sesión
// ==========================================
    if ($op == "saveRespuestasPostulante") {
        $IdPostulanteEvaluacion = isset($_POST["IdPostulanteEvaluacion"]) ? $_POST["IdPostulanteEvaluacion"] : 0;

        if (intval($IdPostulanteEvaluacion) <= 0) {
            echo json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Msg"       => "Parámetro IdPostulanteEvaluacion inválido."
            ]);
            exit;
        }

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
        exit;
    }

// ==========================================
// POST: FINALIZAR EVALUACIÓN
// Requiere: IdPostulanteEvaluacion (int)
// Calcula calificación y cierra la evaluación
// ==========================================
    if ($op == "finalizarEvaluacionPostulante") {
        $IdPostulanteEvaluacion = isset($_POST["IdPostulanteEvaluacion"]) ? $_POST["IdPostulanteEvaluacion"] : 0;

        if (intval($IdPostulanteEvaluacion) <= 0) {
            echo json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Msg"       => "Parámetro IdPostulanteEvaluacion inválido."
            ]);
            exit;
        }

        echo trim($EvaluacionesPostulante->finalizarEvaluacionPostulante($IdPostulanteEvaluacion, $curpSesion));
        exit;
    }

    echo json_encode([
        "Resultado" => false,
        "Siguiente" => false,
        "Msg"       => "Operación no válida."
    ]);
} catch (\Throwable $e) {
    error_log("Error fatal en EvaluacionesPostulante/App.php: " . $e->getMessage());
    echo json_encode([
        "Resultado" => false,
        "Siguiente" => false,
        "Msg"       => "Error interno del servidor.",
        "Debug"     => $e->getMessage()
    ]);
}
