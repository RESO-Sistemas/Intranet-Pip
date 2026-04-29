<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }
header('Content-Type: application/json; charset=utf-8');
include(__DIR__ . "/EvaluacionesPostulanteIbero.php");

$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");
$E  = new EvaluacionesPostulanteIbero();

// Operaciones del candidato — requieren sesión Ibero
$protegidas = ["getEvaluacionesPostulante","getPreguntasEvaluacion","saveRespuestas","finalizarEvaluacion"];
if (in_array($op, $protegidas)) {
    if (empty($_SESSION['ibero_logged_in']) || !$_SESSION['ibero_logged_in'] || empty($_SESSION['ibero_curp_candidato'])) {
        echo json_encode(["Resultado"=>false,"Msg"=>"Sesión no válida. Inicia sesión para continuar."]); exit;
    }
}
$curpSesion = $_SESSION['ibero_curp_candidato'] ?? '';

// -------- CANDIDATO --------
if ($op == "getEvaluacionesPostulante") { echo trim($E->getEvaluacionesPostulante($curpSesion)); exit; }
if ($op == "getPreguntasEvaluacion") {
    $id = intval($_POST["IdPostulanteEvaluacion"] ?? $_GET["IdPostulanteEvaluacion"] ?? 0);
    if ($id <= 0) { echo json_encode(["Resultado"=>false,"Msg"=>"ID inválido."]); exit; }
    echo trim($E->getPreguntasEvaluacion($id, $curpSesion)); exit;
}
if ($op == "saveRespuestas") {
    $id = intval($_POST["IdPostulanteEvaluacion"] ?? 0);
    if ($id <= 0) { echo json_encode(["Resultado"=>false,"Msg"=>"ID inválido."]); exit; }
    $raw = $_POST["respuestas"] ?? "[]";
    $respuestas = is_array($raw) ? $raw : (json_decode($raw, true) ?: []);
    echo trim($E->saveRespuestas($id, $respuestas, $curpSesion)); exit;
}
if ($op == "finalizarEvaluacion") {
    $id = intval($_POST["IdPostulanteEvaluacion"] ?? 0);
    if ($id <= 0) { echo json_encode(["Resultado"=>false,"Msg"=>"ID inválido."]); exit; }
    echo trim($E->finalizarEvaluacion($id, $curpSesion)); exit;
}

// -------- ADMIN --------
if ($op == "getEvaluacionesAdmin")         { echo trim($E->getEvaluacionesAdmin()); exit; }
if ($op == "addEvaluacion")                { echo trim($E->addEvaluacion($_POST["Titulo"],$_POST["TipoEvaluacion"]??2,$_POST["FechaInicio"],$_POST["FechaFin"])); exit; }
if ($op == "activarEvaluacion")            { echo trim($E->activarEvaluacion($_POST["idEvaluacion"])); exit; }
if ($op == "getPreguntasAdmin")            { echo trim($E->getPreguntasAdmin(intval($_POST["idEvaluacion"]??$_GET["idEvaluacion"]??0))); exit; }
if ($op == "addPregunta")                  { echo trim($E->addPregunta($_POST["idEvaluacion"],$_POST["Titulo"],$_POST["idTipoPregunta"],$_POST["Orden"]??0,$_POST["Descripcion"]??"",$_POST["idCompetencia"]??null,$_POST["RangoInicial"]??null,$_POST["RangoFinal"]??null)); exit; }
if ($op == "editPregunta")                 { echo trim($E->editPregunta($_POST["idPregunta"],$_POST["Titulo"],$_POST["idTipoPregunta"],$_POST["Orden"]??0,$_POST["idCompetencia"]??null,$_POST["RangoInicial"]??null,$_POST["RangoFinal"]??null)); exit; }
if ($op == "deletePregunta")               { echo trim($E->deletePregunta($_POST["idPregunta"])); exit; }
if ($op == "addOpcion")                    { echo trim($E->addOpcion(intval($_POST["idPregunta"]),$_POST["DescripcionRespuesta"])); exit; }
if ($op == "deleteOpcion")                 { echo trim($E->deleteOpcion(intval($_POST["idOpcion"]))); exit; }
if ($op == "setRespuestaCorrecta")         { echo trim($E->setRespuestaCorrecta(intval($_POST["idPregunta"]),$_POST["BoolCorreta"]??null,$_POST["RespuestaCorrectaOM"]??null,$_POST["RespuestaCorrectaRango"]??null,$_POST["RespuestaCorrectaTexto"]??null)); exit; }
if ($op == "getTiposPregunta")             { echo trim($E->getTiposPregunta()); exit; }
if ($op == "asignarEvaluacionPostulante")  { echo trim($E->asignarEvaluacionPostulante($_POST["IdPostulanteVacante"],$_POST["IdVacanteEvaluacion"])); exit; }
if ($op == "getMetricasEvaluacion")        { echo trim($E->getMetricasEvaluacion(intval($_POST["IdVacanteEvaluacion"]??$_GET["IdVacanteEvaluacion"]??0))); exit; }
if ($op == "getRespuestasDetalle")         { echo trim($E->getRespuestasDetalle($_POST["IdPostulanteEvaluacion"]??$_GET["IdPostulanteEvaluacion"]??"")); exit; }
if ($op == "getCompetencias")              { echo trim($E->getCompetencias()); exit; }

echo json_encode(["Resultado"=>false,"Msg"=>"Operación no válida."]);
?>
