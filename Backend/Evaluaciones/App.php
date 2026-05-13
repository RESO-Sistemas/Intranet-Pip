<?php
  // Habilitar reporte de errores para debugging
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  
  include("Evaluaciones.php");

  // Cargar SessionManager
  if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
  } else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
  }

  $Evaluaciones = new Evaluaciones();
  $op = isset($_POST["op"]) ? $_POST["op"] : "";
  if ($op == "getEvaluacionesDisponibles") {
    echo trim($Evaluaciones->getEvaluacionesDisponibles());
  }
  if ($op == "getDetalleEvaluacion") {
    echo trim($Evaluaciones->getDetalleEvaluacion());
  }

  if ($op == "respondeEvaluacion") {
    error_log("si entro al app");
    $idEvaluaciones = $_POST["idEvaluaciones"];
    $NoEmpleadoEvaluado = $_POST["valEmpEvaluado"];
    $idCompetencias = $_POST["valCompetencia"];
    $NoEmpleado = $_POST["valNoEmpleado"];
    $Comentarios = $_POST["Comentarios"];
    $Calificacion = $_POST["valCalificacion"];
    echo trim($Evaluaciones->respondeEvaluacion($idEvaluaciones,$NoEmpleadoEvaluado,$idCompetencias,$NoEmpleado,$Comentarios,$Calificacion));
  }

  if ($op == "getDatosEvaluacionSelected") {
    $idEvaluaciones = $_POST["idEvaluaciones"];
    echo trim($Evaluaciones->getDatosEvaluacionSelected($idEvaluaciones));
  }

  if ($op == "getEvaluaciones") {
    echo trim($Evaluaciones->getEvaluaciones());
  }

  if ($op == "updateStatusEvaluacion") {
    $Status = $_POST["Status"];
    $idEvaluaciones = $_POST["idEvaluaciones"];
    echo trim($Evaluaciones->updateStatusEvaluacion($Status,$idEvaluaciones));
  }

  if ($op == "deleteEvaluacion") {
    $idEvaluaciones = $_POST["idEvaluaciones"];
    echo trim($Evaluaciones->deleteEvaluacion($idEvaluaciones));
  }

  if ($op == "addEvaluacion") {
    $Titulo = $_POST["inpTitulo"];
    $FechaInicio = $_POST["inpFechaInicio"];
    $FechaFin = $_POST["inpFechaFin"];
    $dataEvaluation = $_POST["dataEvaluation"];
    $inpRetroFechaIni = $_POST["inpRetroFechaIni"];
    $inpRetroFechaFin = $_POST["inpRetroFechaFin"];
    $inpPlanAFechaIni = $_POST["inpPlanAFechaIni"];
    $inpPlanAFechaFin = $_POST["inpPlanAFechaFin"];
    echo trim($Evaluaciones->addEvaluacion($Titulo,$FechaInicio,$FechaFin,$dataEvaluation,$inpRetroFechaIni,$inpRetroFechaFin,$inpPlanAFechaIni,$inpPlanAFechaFin));
  }

  if ($op == "getEstadisticasEvaluacion") {
    $idEvaluaciones = $_POST["idEvaluaciones"];
    echo trim($Evaluaciones->getEstadisticasEvaluacion($idEvaluaciones));
  }

  if ($op == "getEvaluacionesRespondidas") {
    echo trim($Evaluaciones->getEvaluacionesRespondidas());
  }

  if ($op == "getListCompetencias") {
    $typeCompetence = $_POST["typeCompetence"];
    echo trim($Evaluaciones->getListCompetencias($typeCompetence));
  }

  if ($op == "gettypesOfCompetencies") {
    echo trim($Evaluaciones->gettypesOfCompetencies());
  }

  if ($op == "changeStatusCompetence") {
    $competence = $_POST["competence"];
    echo trim($Evaluaciones->changeStatusCompetence($competence));
  }

  if ($op == "viewDataCompetenceSF") {
    $competence = $_POST["competence"];
    echo trim($Evaluaciones->viewDataCompetenceSF($competence));
  }

  if ($op == "saveCompetencies") {
    $action = $_POST["action"];
    $type = $_POST["type"];
    $competence = $_POST["competence"];
    $significate = $_POST["significate"];
    $val_a = $_POST["val_a"];
    $val_b = $_POST["val_b"];
    $val_c = $_POST["val_c"];
    $val_d = $_POST["val_d"];
    $val_e = $_POST["val_e"];
    // nl2br($_POST["val_b"]);
    $idCompetence = $_POST["idCompetence"];
    echo trim($Evaluaciones->saveCompetencies($action,$type,$competence,$significate,$val_a,$val_b,$val_c,$val_d,$val_e,$idCompetence));
  }

  if ($op == "viewDataCompetence") {
      $idCompetence = $_POST["competence"];
      echo trim($Evaluaciones->viewDataCompetence($idCompetence));
    }

    if ($op == "getGeneralEvaluacionSel") {
      $idEvaluacionDetalle = $_POST["idEv"];
      echo trim($Evaluaciones->getGeneralEvaluacionSel($idEvaluacionDetalle));
    }

    if ($op == "getDetalleEvaluacionSel") {
      $idEvaluacionDetalle = $_POST["idEv"];
      echo trim($Evaluaciones->getDetalleEvaluacionSel($idEvaluacionDetalle));
    }

    if ($op == "saveResultCompetence"){
      $value = $_POST["value"];
      $response = $_POST["response"];
      $Comentarios = $_POST["comentarios"];
      echo trim($Evaluaciones->saveResultCompetence($value,$response,$Comentarios));
    }

    if ($op == "validateResultsEvaluation"){
      $idEvaluacionDetalle = $_POST["ev"];
      echo trim($Evaluaciones->validateResultsEvaluation($idEvaluacionDetalle));
    }

    if ($op == "finishEvaluation") {
      $nidEvaluacionDetalle = $_POST["idResponse"];
      $nidRespuestaEvaluaciones = $_POST["response"];
      $nCalificacion = $_POST["value"];
      $nComentarios = $_POST["comentarios"];
      echo trim($Evaluaciones->finishEvaluation($nidEvaluacionDetalle,$nidRespuestaEvaluaciones,$nCalificacion,$nComentarios));
    }

    if ($op == "saveLevelsCompetence") {
      $allLevels = $_POST["allLevels"];
      $competence = $_POST["competence"];
      $typeAction = $_POST["typeAction"];
      echo trim($Evaluaciones->saveLevelsCompetence($allLevels,$competence,$typeAction));
    }

    if ($op == "getEmpleadosEvaluadosPorEv") {
      $idEvaluaciones = $_POST["idEvaluaciones"];
      echo trim($Evaluaciones->getEmpleadosEvaluadosPorEv($idEvaluaciones));
    }

    if ($op == "getEvaluatedBy") {
      $evaluation = $_POST["evaluation"];
      $employee = $_POST["employee"];
      echo trim($Evaluaciones->getEvaluatedBy($evaluation,$employee));
    }

    if ($op == "getEvaluationDetail") {
      $idEvaluated = $_POST["idEvaluated"];
      echo trim($Evaluaciones->getEvaluationDetail($idEvaluated));
    }

    if ($op == "getGeneralDetailEvaluated") {
      $employee = $_POST["employee"];
      $evaluation = $_POST["evaluation"];
      // $detailEv = $_POST["detailEvaluation"];
      echo trim($Evaluaciones->getGeneralDetailEvaluated($employee,$evaluation));
    }

    if ($op == "getDetailEvaluation") {
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->getDetailEvaluation($evaluation));
    }

    if ($op == "listEvaluados") {
      $idEvaluaciones = $_POST["idEvaluaciones"];
      echo trim($Evaluaciones->listEvaluados($idEvaluaciones));
    }

    if ($op == "getlist_evaluadores") {
      $NoEmpleado = $_POST["evaluado"];
      $Evaluacion = $_POST["evaluacion"];
      echo trim($Evaluaciones->getlist_evaluadores($NoEmpleado,$Evaluacion));
    }

    if ($op == "getGeneralInfoEvaluacion") {
      $idEvaluaciones = $_POST["evaluacion"];
      echo trim($Evaluaciones->getGeneralInfoEvaluacion($idEvaluaciones));
    }

    if ($op == "deleteEvaluador") {
      $idEvaluacionDetalle = $_POST["evaluador"];
      echo trim($Evaluaciones->deleteEvaluador($idEvaluacionDetalle));
    }

    if ($op == "addEmpleadoEvaluador") {
      $nidEvaluaciones = $_POST["evaluacion"];
      $nNoEmpleadoEvalua = $_POST["evaluador"];
      $nNoEmpleadoEvaluado = $_POST["evaluado"];
      $nTipoEvaluador = $_POST["relacion"];
      echo trim($Evaluaciones->addEmpleadoEvaluador($nidEvaluaciones,$nNoEmpleadoEvalua,$nNoEmpleadoEvaluado,$nTipoEvaluador));
    }

    if ($op == "viewUnfinishedEmployees") {
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->viewUnfinishedEmployees($evaluation));
    }

    if ($op == "getAllGeneralDataPerEmployeeFinal"){
      echo trim($Evaluaciones->getAllGeneralDataPerEmployeeFinal());
    }

    if ($op == "acceptFeedback") {
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->acceptFeedback($evaluation));
    }

    if ($op == "getGeneralDetailEvaluatedUs") {
      $employee = base64_encode(SessionManager::get("NoEmpleado"));
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->getGeneralDetailEvaluated($employee,$evaluation));
    }

    if ($op == "acceptResultsEvaluation") {
      $evaluation = $_POST["evaluation"];
      $employee = $_POST["employee"];
      $required = $_POST["required"];
      $dataCompetences = $_POST["dataCompetences"];
      echo trim($Evaluaciones->acceptResultsEvaluation($evaluation,$employee,$required,$dataCompetences));
    }

    if ($op == "evaluationsAboutTheEmployee") {
      $employee = $_POST["employee"];
      echo trim($Evaluaciones->evaluationsAboutTheEmployee($employee));
    }

    if ($op == "getGeneralDetailEvaluatedEmployeeSelected") {
      $employee = $_POST["employee"];
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->getGeneralDetailEvaluated($employee,$evaluation));
    }

    if ($op == "getEmployeesWhitPlanAction") {
      echo trim($Evaluaciones->getEmployeesWhitPlanAction());
    }

    if ($op == "getPlanActionPerEmployee") {
      $employee = $_POST["employee"];
      echo trim($Evaluaciones->getPlanActionPerEmployee($employee));
    }

    if ($op == "getMyPlansAction") {
      echo trim($Evaluaciones->getMyPlansAction());
    }

    if ($op == "getSummaryPlanAction") {
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->getSummaryPlanAction($evaluation));
    }

    if ($op == "getInitialDetailPlanAction") {
      $planAction = $_POST["planAction"];
      echo trim($Evaluaciones->getInitialDetailPlanAction($planAction));
    }

    if ($op == "addActivityPerObjetive") {
      $objetive = $_POST["objetive"];
      $title = $_POST["title"];
      $description = $_POST["description"];
      $dateIni = $_POST["dateIni"];
      $dateEnd = $_POST["dateEnd"];
      echo trim($Evaluaciones->addActivityPerObjetive($objetive, $title, $description, $dateIni, $dateEnd));
    }

    if ($op == "getDetailObjetivePlanAction") {
      $objetive = $_POST["obj"];
      echo trim($Evaluaciones->getDetailObjetivePlanAction($objetive));
    }

    if ($op == "updateGenObjetivePlanAction") {
      $objetive_id = $_POST["objetive_id"];
      $objetive = $_POST["objetive"];
      $desc = $_POST["desc"];
      echo trim($Evaluaciones->updateGenObjetivePlanAction($objetive_id,$objetive,$desc));
    }

    if ($op == "getGeneralDetailActivityPlanA") {
      $activity = $_POST["activity"];
      echo trim($Evaluaciones->getGeneralDetailActivityPlanA($activity));
    }

    if ($op == "addProgressActivity") {
      $activity = $_POST["activity"];
      $newProgress = $_POST["newProgress"];
      $description = $_POST["description"];
      echo trim($Evaluaciones->addProgressActivity($activity,$newProgress,$description));
    }

    if ($op == "getListEvaluations") {
      echo trim($Evaluaciones->getListEvaluations());
    }

    if ($op == "getEvaluationById") {
      $idEvaluacion = $_POST["idEvaluacion"];
      echo trim($Evaluaciones->getEvaluationById($idEvaluacion));
    }

    if ($op == "saveEvaluationNoE") {
      $inpTitulo = $_POST["inpTitulo"];
      $tipoEvaluacion = $_POST["tipoEvaluacion"];
      $dirigidoA = $_POST["dirigidoA"];
      $periodicidad = isset($_POST["periodicidad"]) && $_POST["periodicidad"] !== 'null' ? $_POST["periodicidad"] : null;
      $inpFechaInicio = !empty($_POST["inpFechaInicio"]) && $_POST["inpFechaInicio"] !== 'null' ? $_POST["inpFechaInicio"] : null;
      $inpFechaFin    = !empty($_POST["inpFechaFin"])    && $_POST["inpFechaFin"]    !== 'null' ? $_POST["inpFechaFin"]    : null;
      $inpRetroFechaIni = isset($_POST["inpRetroFechaIni"]) && $_POST["inpRetroFechaIni"] !== 'null' ? $_POST["inpRetroFechaIni"] : null;
      $inpRetroFechaFin = isset($_POST["inpRetroFechaFin"]) && $_POST["inpRetroFechaFin"] !== 'null' ? $_POST["inpRetroFechaFin"] : null;
      $inpPlanAFechaIni = isset($_POST["inpPlanAFechaIni"]) && $_POST["inpPlanAFechaIni"] !== 'null' ? $_POST["inpPlanAFechaIni"] : null;
      $inpPlanAFechaFin = isset($_POST["inpPlanAFechaFin"]) && $_POST["inpPlanAFechaFin"] !== 'null' ? $_POST["inpPlanAFechaFin"] : null;
      $empleadosParticipantes = isset($_POST["empleadosParticipantes"]) ? $_POST["empleadosParticipantes"] : "";
      echo trim($Evaluaciones->saveEvaluationNoE($inpTitulo, $tipoEvaluacion, $dirigidoA, $periodicidad, $inpFechaInicio, $inpFechaFin, 
        $inpRetroFechaIni, $inpRetroFechaFin, $inpPlanAFechaIni, $inpPlanAFechaFin, $empleadosParticipantes
      ));
    }

    if ($op == "getQuestionsPerEvaluation") {
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->getQuestionsPerEvaluation($evaluation));
    }

    if ($op == "removeAnswerSV") {
      $question = $_POST["question"];
      $answer = $_POST["answer"];
      $typeQuestion = $_POST["typeQuestion"];
      echo trim($Evaluaciones->removeAnswerSV($question, $answer, $typeQuestion));
    }

    if ($op == "getQuestionTypes") {
      echo trim($Evaluaciones->getQuestionTypes());
    }

    if ($op == "getCompetencesActive") {
      echo trim($Evaluaciones->getCompetencesActive());
    }

    if ($op == "saveQuestionsConfig") {
      $evaluation = isset($_POST["evaluation"]) ? $_POST["evaluation"] : null;
      $data = isset($_POST["data"]) ? $_POST["data"] : null;
      
      // Validar que los datos requeridos existan
      if (!$evaluation || !$data) {
        echo json_encode([
          "Resultado" => false,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Datos incompletos: evaluation=" . ($evaluation ? "OK" : "NULL") . ", data=" . ($data ? "OK" : "NULL")
        ]);
        exit;
      }
      
      echo trim($Evaluaciones->saveQuestionsConfig($evaluation,$data));
    }

    if ($op == "addAnswerExpectedQuestionSV") {
      $answer = $_POST["answer"];
      $question = $_POST["question"];
      $lvl = $_POST["lvl"];
      echo trim($Evaluaciones->addAnswerExpectedQuestionSV($answer, $question, $lvl));
    }

    if ($op == "deleteResultExpectedSV") {
      $lvl = $_POST["lvl"];
      $answer = $_POST["answer"];
      $question = $_POST["question"];
      echo trim($Evaluaciones->deleteResultExpectedSV($lvl, $answer, $question));
    }

    if ($op == "saveNewDataOldQuestion") {
      $data = $_POST["data"];
      echo trim($Evaluaciones->saveNewDataOldQuestion($data));
    }

    if ($op == "deleteQuestionSaved") {
      $idQuestion = $_POST["idQuestion"];
      echo trim($Evaluaciones->deleteQuestionSaved($idQuestion));
    }

    if ($op == "saveDataCompetenceSF") {
      $action = $_POST["action"];
      $typeC = $_POST["typeC"];
      $nameC = $_POST["nameC"];
      $signF = $_POST["signF"];
      $selectedC = $_POST["selectedC"];
      echo trim($Evaluaciones->saveDataCompetenceSF($action,$typeC,$nameC,$signF,$selectedC));
    }

    if ($op == "shareEvaluation") {
      $dataEvaluation = $_POST["dataEvaluation"];
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->shareEvaluation($dataEvaluation, $evaluation));
    }

    if ($op == "getConfigQuestionsEvaluated") {
      $evaluation = $_POST["evaluation"];
      $employee = $_POST["employee"];
      echo trim($Evaluaciones->getConfigQuestionsEvaluated($evaluation,$employee));
    }

    if ($op == "getListEvaluatorsDetail") {
      $employee = $_POST["employee"];
      $evaluation = $_POST["evaluation"];
      echo trim($Evaluaciones->getListEvaluatorsDetail($employee, $evaluation));
    }

    if ($op == "checkTemporaryDataEvaluation") {
      $ev = $_POST["ev"];
      $branchL = $_POST["branch"];
      echo trim($Evaluaciones->checkTemporaryDataEvaluation($ev, $branchL));
    }

    if ($op == "updateStatusTempDetEv") {
      $newVal = $_POST["newVal"];
      $detEv = $_POST["detEv"];
      echo trim($Evaluaciones->updateStatusTempDetEv($newVal, $detEv));
    }

    if ($op == "addEmpleadoEvaluadorTempData") {
      $nidEvaluaciones = $_POST["ev"];
      $nNoEmpleadoEvalua = $_POST["evaluator"];
      $nNoEmpleadoEvaluado = $_POST["evaluated"];
      $nTipoEvaluador = $_POST["typeEvaluator"];
      echo trim($Evaluaciones->addEmpleadoEvaluadorTempData($nidEvaluaciones,$nNoEmpleadoEvalua,$nNoEmpleadoEvaluado,$nTipoEvaluador));
    }

    if ($op == "deleteEvaluatorDetail") {
      $evDetail = $_POST["evDetail"];
      echo trim($Evaluaciones->deleteEvaluatorDetail($evDetail));
    }

    if ($op == "acceptPublicationOfTheEvaluation") {
      $ev = $_POST["ev"];
      echo trim($Evaluaciones->acceptPublicationOfTheEvaluation($ev));
    }

    if ($op == "acceptQuestionsEv") {
      $iEvaluation = $_POST["iEvaluation"];
      echo trim($Evaluaciones->acceptQuestionsEv($iEvaluation));
    }

    if ($op == "getPendingEvaluationsWidget") {
      echo trim($Evaluaciones->getPendingEvaluationsWidget());
    }

    if ($op == "deleteAllDetailPerBranch") {
      $branch = $_POST["branch"];
      $ev = $_POST["ev"];
      echo trim($Evaluaciones->deleteAllDetailPerBranch($branch, $ev));
    }

    if ($op == "getInitialConfigEvaluation") {
      $ev = base64_decode($_POST["ev"]);
      echo trim($Evaluaciones->getInitialConfigEvaluation($ev));
    }

    if ($op == "saveConfigEvaluationBr") {
      $branchSel = [];
      $typeOption = $_POST["typeOption"];
      if (isset($_POST["branchSel"])) {
        $branchSel = $_POST["branchSel"];
      }
      $typeSelBranch = $_POST["typeSelBranch"];
      $ev = base64_decode($_POST["ev"]);
      echo trim($Evaluaciones->saveConfigEvaluationBr($typeOption, $branchSel, $typeSelBranch, $ev));
    }

    if ($op == "getListBranchInEvaluation") {
      $ev = base64_decode($_POST["ev"]);
      echo trim($Evaluaciones->getListBranchInEvaluation($ev));
    }

    if ($op == "getListBranchNewEv") {
      echo trim($Evaluaciones->getListBranchNewEv());
    }

    // Rutas para selección de participantes
    if ($op == "getDivisionesEvaluacion") {
      echo trim($Evaluaciones->getDivisionesEvaluacion());
    }

    if ($op == "getSucursalesXDivisionEvaluacion") {
      $IdDivision = isset($_POST["IdDivision"]) ? $_POST["IdDivision"] : "";
      echo trim($Evaluaciones->getSucursalesXDivisionEvaluacion($IdDivision));
    }

    if ($op == "getPuestosEvaluacion") {
      echo trim($Evaluaciones->getPuestosEvaluacion());
    }

    if ($op == "getEmpleadosParaEvaluacion") {
      $IdDivision = isset($_POST["IdDivision"]) ? $_POST["IdDivision"] : "";
      $IdSucursal = isset($_POST["IdSucursal"]) ? $_POST["IdSucursal"] : "";
      $IdPuesto = isset($_POST["IdPuesto"]) ? $_POST["IdPuesto"] : "";
      echo trim($Evaluaciones->getEmpleadosParaEvaluacion($IdDivision, $IdSucursal, $IdPuesto));
    }

    // ==========================================
    // EVALUACIONES PARA POSTULANTES
    // ==========================================

    if ($op == "getEvaluacionesPostulante") {
      $IdPostulanteVacante = $_POST["IdPostulanteVacante"];
      echo trim($Evaluaciones->getEvaluacionesPostulante($IdPostulanteVacante));
    }

    if ($op == "getPreguntasEvaluacionPostulante") {
      $IdPostulanteEvaluacion = $_POST["IdPostulanteEvaluacion"];
      echo trim($Evaluaciones->getPreguntasEvaluacionPostulante($IdPostulanteEvaluacion));
    }

    if ($op == "saveRespuestaPostulante") {
      $IdPostulanteEvaluacion = $_POST["IdPostulanteEvaluacion"];
      $IdPregunta = $_POST["IdPregunta"];
      $Respuesta = $_POST["Respuesta"];
      echo trim($Evaluaciones->saveRespuestaPostulante($IdPostulanteEvaluacion, $IdPregunta, $Respuesta));
    }

    if ($op == "finalizarEvaluacionPostulante") {
      $IdPostulanteEvaluacion = $_POST["IdPostulanteEvaluacion"];
      echo trim($Evaluaciones->finalizarEvaluacionPostulante($IdPostulanteEvaluacion));
    }

    if ($op == "getResultadosComparativosPostulantes") {
      $IdVacante = $_POST["IdVacante"];
      $IdEvaluacion = $_POST["IdEvaluacion"];
      echo trim($Evaluaciones->getResultadosComparativosPostulantes($IdVacante, $IdEvaluacion));
    }

    if ($op == "getEvaluacionesPorVacante") {
      $IdVacante = $_POST["IdVacante"];
      echo trim($Evaluaciones->getEvaluacionesPorVacante($IdVacante));
    }
 ?>
