<?php
  if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
  }
  else {
    if (file_exists("./Conexiones/Conexiones.php")) {
      require_once("./Conexiones/Conexiones.php");
    }
    else if(file_exists("../Conexiones/Conexiones.php")){
      require_once("../Conexiones/Conexiones.php");
      }
    else if(file_exists("../../Conexiones/Conexiones.php")){
      require_once("../../Conexiones/Conexiones.php");
      }
    else if(file_exists("././Backend/Conexiones/Conexiones.php")){
      require_once("././Backend/Conexiones/Conexiones.php");
      }
  }

  // Cargar SessionManager
  if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
  } else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
  }
  class Evaluaciones extends Conexiones
  {
    function getEvaluacionesDisponibles(){
      try {
        $q = "SELECT TO_BASE64(idEvaluaciones) AS idEvaluaciones,Titulo,FechaInicio,FechaFin
              FROM Evaluaciones
              WHERE DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN FechaInicio AND FechaFin AND  Status = 1 AND Activado = 1 ;";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          $arrDatos = [];
          foreach ($resultado as $Evaluacion) {
            $IdEval = $Evaluacion["idEvaluaciones"];
            $InstDetalle = new Evaluaciones();
            $DetalleEv = $InstDetalle->getEvaluadosEvaluacion($IdEval);
            
            if (sizeof($DetalleEv) > 0) {
              array_push($arrDatos,[
                "idEvaluaciones" => $Evaluacion["idEvaluaciones"],
                "Evaluacion" => $Evaluacion["Titulo"],
                "FechaInicio" => $Evaluacion["FechaInicio"],
                "FechaFin" => $Evaluacion["FechaFin"],
                "Detalle" => $DetalleEv
              ]);
            }
          }
          
          if (sizeof($arrDatos) > 0) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => $arrDatos
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
            ];
          }
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getEvaluadosEvaluacion($IdEval){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT E.Nombre,TO_BASE64(EV.idEvaluacionDetalle) AS idEvDetalle,IF(EV.StatusEvaluado = 1,'Realizada','Pendiente') AS StatusRealizado,
              	EV.StatusEvaluado,TO_BASE64(EV.idEvaluaciones) AS idEvaluaciones,
              IF(EV.JefeEvalua = 1 ,'Subordinado',IF(EV.ParEvalua = 1,'Empleado Par', IF(EV.AutoEvalua = 1,'Auto Evaluación','Jefe'))) AS RelacionEvaluado,
              CONCAT((SELECT COUNT(*) FROM RespuestaEvaluaciones WHERE idEvaluacionDetalle = EV.idEvaluacionDetalle AND Calificacion IS NOT NULL),'/',(SELECT COUNT(*) FROM RespuestaEvaluaciones WHERE idEvaluacionDetalle = EV.idEvaluacionDetalle)) AS Respondidas
              FROM EvaluacionDetalle AS EV
              INNER JOIN Empleados AS E ON E.NoEmpleado = EV.NoEmpleadoEvaluado
              WHERE EV.Status = 1 AND NoEmpleadoEvalua = '$NoEmpleado' AND TO_BASE64(EV.idEvaluaciones) = '$IdEval';";
        $resultado = $this->Select($q,array());
        return $resultado;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getColaboradoresOrganigrama(){
      $IdDivision = SessionManager::get("IdDivision");
      $IdSucursal = SessionManager::get("IdSucursal");
      $q="SELECT EM.Nombre,EM.Email,P.Puesto,EM.Nivel,EM.NoEmpleado FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE EM.IdSucursal = '$IdSucursal'
          ORDER BY EM.Nivel;";
          return $this->Select($q,array());
    }

    function getDetalleEvaluacion(){
      $retorno = [];
      $datos = [];
      $Nivel = SessionManager::get("nivel");
      $NoEmpleado = SessionManager::get("NoEmpleado");
      $Evaluaciones = new Evaluaciones();
      $Evaluacione2 = new Evaluaciones();
      $ListColaboradores = $Evaluaciones->getColaboradoresOrganigrama();
      $ListCompetencias = $Evaluacione2->getCompetencias();
      $datos = [
        "ListColaboradores" => $ListColaboradores,
        "ListCompetencias" => $ListCompetencias,
        "NivelEmpleado" => $Nivel,
        "NoEmpleado" => $NoEmpleado
      ];
      array_push($retorno,$datos);
      return json_encode($retorno);
    }

    function getCompetencias () {
      $q = "SELECT C.TipoCompetencia,C.idCompetencias,C.Competencia,C.Significado,C.A,C.B,C.C,C.D,C.E,TP.Descripcion FROM Competencias AS C
            INNER JOIN TipoCompetencias AS TP ON TP.idTipoCompetencias = C.TipoCompetencia
            ORDER BY C.TipoCompetencia,C.Competencia;";
      return $this->Select($q,array());
    }

    function respondeEvaluacion ($idEvaluaciones,$NoEmpleadoEvaluado,$idCompetencias,$NoEmpleado,$Comentarios,$Calificacion) {
      $contenidoValue = "";
      $NoEmpleado = SessionManager::get("NoEmpleado");
      for ($i=0; $i < sizeof($NoEmpleadoEvaluado) ; $i++) {
        $contenidoValue .="($idEvaluaciones,$NoEmpleadoEvaluado[$i],$idCompetencias[$i],$NoEmpleado,now(),'$Comentarios[$i]','$Calificacion[$i]'),";
      }
      $contenidoValue = rtrim($contenidoValue,",");
      try {
        $Conexiones2 = new Conexiones();
        $q = "INSERT INTO RespuestaEvaluaciones (idEvaluaciones,NoEmpleadoEvaluado,idCompetencias,NoEmpleado,Registro,Comentarios,Calificacion)
  		        VALUES $contenidoValue;";
        $this->ExecuteQuery($q,array());
        $q2 = "INSERT INTO DetalleEvaluacionesRespondidas (idEvaluaciones,NoEmpleado,Registro)
			         VALUES ($idEvaluaciones,$NoEmpleado,now());";
        $Conexiones2->ExecuteQuery($q2,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }

    function getEvaluaciones () {
        $q = "SELECT EV.*,
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1) AS CantEvaluadores,
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1 AND StatusEvaluado = 1) AS CantRespondidas
              FROM Evaluaciones AS EV
              WHERE EV.Status = 1;";
        return json_encode($this->Select($q,array()));
      }

    function updateStatusEvaluacion ($Status,$idEvaluaciones) {
      try {
        $idEvaluaciones = base64_decode($idEvaluaciones);
        $q = "UPDATE Evaluaciones SET Status = '$Status' WHERE idEvaluaciones = '$idEvaluaciones';";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }

    function addEsperaEvaluacion($dataEvaluation){
          try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "DELETE FROM EsperaNuevaEvaluacion WHERE NoEmpleadoRegistra = '$NoEmpleado'";
            $this->ExecuteQuery($q,array());
            $dataEvaluation = json_decode($dataEvaluation, true);
            $ValuesInsert = "";
            foreach ($dataEvaluation as $row) {
              $ValuesInsert = "$ValuesInsert('$row[evaluator]','$row[evaluated]','$row[type_evaluated]','$NoEmpleado'),";
            }
            $ValuesInsertFormat = substr($ValuesInsert, 0, -1);
            $q2 = "INSERT INTO EsperaNuevaEvaluacion(NoEmpleadoEvalua,NoEmpleadoEvaluado,TipoEvaluador,NoEmpleadoRegistra)
                  VALUES $ValuesInsertFormat";
            error_log($q2);
            $Con2 = new Conexiones();
            $Con2->ExecuteQuery($q2,array());
            return true;
          } catch (\Exception $e) {
            return $e;
          }
        }
        function addEvaluacion ($Titulo,$FechaInicio,$FechaFin,$dataEvaluation,$inpRetroFechaIni,$inpRetroFechaFin,$inpPlanAFechaIni,$inpPlanAFechaFin) {
          try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $InstEspera = new Evaluaciones();
            $ResultEspera = $InstEspera->addEsperaEvaluacion($dataEvaluation);
            if ($ResultEspera) {
              $q = "CALL spAddEvaluacion('$Titulo','$FechaInicio','$FechaFin','$NoEmpleado','$inpRetroFechaIni','$inpRetroFechaFin','$inpPlanAFechaIni','$inpPlanAFechaFin')";
              $resultado = $this->Procedure($q,array());
              if (sizeof($resultado) > 0 ) {
                $arrRetorno = [
                  "Resultado" => true,
                  "Siguiente" => true,
                  "ConMsg" => true,
                  "Msg" => "¡Nueva evaluación generada con éxito!"
                ];
              } else {
                $arrRetorno = [
                  "Resultado" => true,
                  "Siguiente" => false,
                  "ConMsg" => true,
                  "Msg" => "Ha ocurrido un error al generar una nueva evaluación."
                ];
              }
            } else {
              $arrRetorno = [
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Ha ocurrido un error al registrar el listado de los evaluadores y evaluados!"
              ];
            }
            return json_encode($arrRetorno);
          } catch (\Exception $e) {
            return $e;
          }
        }

    function getEstadisticasEvaluacion ($idEvaluaciones) {
      $q = "SELECT E.Nombre,C.Competencia,
            (((5 * coalesce(count(RE.NoEmpleadoEvaluado),0)) + coalesce(sum(Calificacion),0))) / coalesce(count(RE.NoEmpleadoEvaluado),0) AS Calificacion,RE.NoEmpleadoEvaluado
            FROM Empleados AS E INNER JOIN RespuestaEvaluaciones AS RE ON RE.NoEmpleadoEvaluado = E.NoEmpleado
            LEFT JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
            WHERE RE.idEvaluaciones = '$idEvaluaciones'
            GROUP BY E.Nombre,C.Competencia;";
            return json_encode($this->Select($q,array()));
    }

    function getEvaluacionesRespondidas () {
      $q = "SELECT idEvaluaciones,Titulo FROM Evaluaciones
            WHERE idEvaluaciones IN (SELECT idEvaluaciones FROM RespuestaEvaluaciones);";
      return json_encode($this->Select($q,array()));
    }

    function getListCompetencias($typeCompetence){
      try {
        // Definir $CompWhere para filtrar por tipo de competencia
        if ($typeCompetence != ""){
          $CompWhere = "WHERE TO_BASE64(TipoCompetencia) = '$typeCompetence'";
        } else {
          $CompWhere = "";
        }
        $q = "SELECT C.Competencia, TC.Descripcion AS Tipo, IF(C.Estatus = 0,'Inactivo','Activo') AS StatusCom,
              TO_BASE64(C.idCompetencias) AS idCompetencia
              FROM Competencias AS C
              INNER JOIN TipoCompetencias AS TC ON TC.idTipoCompetencias = C.TipoCompetencia
              $CompWhere;";
        $resultado = $this->Select($q,array());
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function gettypesOfCompetencies(){
      try {
        $q = "SELECT TO_BASE64(idTipoCompetencias) AS idTipoCompetencias, Descripcion
              FROM TipoCompetencias
              WHERE Estatus = 1;";
        $resultado = $this->Select($q,array());
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function changeStatusCompetence($competence){
      try {
        $competence = base64_decode($competence);
        $q = "SELECT Estatus FROM Competencias WHERE idCompetencias = '$competence'";
        $resQ = $this->Select($q,array());
        if (sizeof($resQ) > 0) {
          $ActStatus = $resQ[0]["Estatus"];
          if ($ActStatus == 1) {
            $NewStatus = 0;
          } else {
            $NewStatus = 1;
          }
          $ConUpdate = new Conexiones();
          $qUpdate = "UPDATE Competencias SET Estatus = '$NewStatus' WHERE idCompetencias = '$competence';";
          $ConUpdate->ExecuteQuery($qUpdate, array());
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Msg" => "Status actualizado"
          ];
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un problema al obtener los datos de la competencia seleccionada"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function viewDataCompetenceSF($idCompetence){
      try {
        $q = "SELECT TO_BASE64(idCompetencias) AS idCompetence, Competencia,Significado,to_base64(TipoCompetencia) AS TipoCompetencia
              FROM Competencias
              WHERE TO_BASE64(idCompetencias) = '$idCompetence';";
        $resQ = $this->Select($q);
        if (sizeof($resQ) > 0){
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resQ[0]
          ];
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un problema al obtener el detalle de la competencia seleccionada"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveCompetencies($action,$type,$competence,$significate,$val_a,$val_b,$val_c,$val_d,$val_e,$idCompetence){
      try {
        $type = base64_decode($type);
        if ($action == "create") {
          $MsgR =  "¡Competencia registrada con éxito!";
          $q = "CALL spNuevaCompetencia('$competence','$significate','$type','$val_a','$val_b','$val_c','$val_d','$val_e')";
        } else if ($action == "update") {
          $MsgR =  "¡Competencia actualizada con éxito!";
          $q = "UPDATE Competencias SET Competencia = '$competence', Significado = '$significate', TipoCompetencia = '$type', A = '$val_a',
                	B = '$val_b', C = '$val_c', D = '$val_d', E = '$val_e'
                    WHERE TO_BASE64(idCompetencias) = '$idCompetence';";
        }
        $resultado = $this->Procedure($q,array());
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => $MsgR,
          "Data" => $resultado[0]
        ];
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveLevelsCompetence($allLevels,$competence,$typeAction){
      try {
        $msgReturn = "";
        $competence = base64_decode($competence);
        if ($typeAction == "create") {
          $msgReturn = "Se han registrado los niveles seleccionados a la nueva competencia.";
          $values = "";
          foreach ($allLevels as $level) {
            $values = $values."('$competence','$level[_nivel]','$level[_esperado]'),";
          }
          $valuesFormat = substr($values, 0, - 1);
          $q = "INSERT INTO DetalleCompetencias (idCompetencias,NivelEmpleado,CalificacionEsperado) VALUES $valuesFormat";
        } else {
          $InstDelete = new Evaluaciones();
          $ResultInstD = $InstDelete->deleteLevelsCompetence($competence);
          if ($ResultInstD) {
            $msgReturn = "Se han actualizado los niveles seleccionados a la competencia seleccionada.";
            $values = "";
            foreach ($allLevels as $level) {
              $values = $values."('$competence','$level[_nivel]','$level[_esperado]'),";
            }
            $valuesFormat = substr($values, 0, - 1);
            $q = "INSERT INTO DetalleCompetencias (idCompetencias,NivelEmpleado,CalificacionEsperado) VALUES $valuesFormat";
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un error al realizar el procedimiento de verificación de niveles al actualizar los datos de la competencia."
            ];
          }
        }
        $this->ExecuteQuery($q,array());
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => $msgReturn
        ];
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function deleteLevelsCompetence($idCompetencias){
        try {
          $q = "DELETE FROM DetalleCompetencias
                WHERE idCompetencias = '$idCompetencias';";
          $this->ExecuteQuery($q,array());
          return true;
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getDetailCompetence($idComp){
      try {
        $q = "SELECT NivelEmpleado,CalificacionEsperado
              FROM  DetalleCompetencias
              WHERE TO_BASE64(idCompetencias) = '$idComp';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0){
          return $resultado;
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function viewDataCompetence($idCompetence){
      try {
        $q = "SELECT TO_BASE64(idCompetencias) AS idCompetence, Competencia,Significado,to_base64(TipoCompetencia) AS TipoCompetencia,
              A,B,C,D,E
              FROM Competencias
              WHERE TO_BASE64(idCompetencias) = '$idCompetence';";
        $InstDetail = new Evaluaciones();
        $ResultInst = $InstDetail->getDetailCompetence($idCompetence);
        if (!$ResultInst) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener el detalle de la competencia seleccionada, inténtelo de nuevamente."
          ];
        } else {
          $resultado = $this->Select($q,array());
          if (sizeof($resultado) > 0 ) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => $resultado[0],
              "DataDetail" => $ResultInst
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un error al obtener los datos de la competencia seleccionada, inténtelo de nuevamente."
            ];
          }
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDetalleEvaluacionSel($idEvaluacionDetalle){
      try {
        $q = "SELECT C.Competencia,
              PE.idTipoPregunta,
              PE.Titulo,
              PE.Descripcion,
              RE.idPreguntasEvaluacion,
              TO_BASE64(RE.idRespuestaEvaluaciones) AS idRespuestaEvaluaciones,
              IF(RE.Calificacion IS NULL OR RE.Calificacion = '',0,1) AS Contestado,
              RE.Calificacion AS RespuestaQ,
              IF(RE.Comentarios IS NULL OR RE.Comentarios = '','',RE.Comentarios) AS Comentarios
              FROM RespuestaEvaluaciones AS RE
              INNER JOIN PreguntasEvaluacion AS PE ON PE.idPreguntasEvaluacion = RE.idPreguntasEvaluacion
              INNER JOIN Competencias AS C ON C.idCompetencias = PE.idCompetencias
              WHERE TO_BASE64(RE.idEvaluacionDetalle) = '$idEvaluacionDetalle' ORDER BY idRespuestaEvaluaciones ASC;";
        $res = $this->Select($q,array());
        if (sizeof($res) > 0 ) {
          for ($i=0; $i < count($res) ; $i++) {
            $idQuestion = $res[$i]["idPreguntasEvaluacion"];
            if ($res[$i]["idTipoPregunta"] == 2 || $res[$i]["idTipoPregunta"] == 4) {
              $InstAnswers = new Evaluaciones();
              $ResInst = $InstAnswers->getAnswersPerQuestion($res[$i]["idPreguntasEvaluacion"]);
              $res[$i]["Answers"] = $ResInst;
            } elseif ($res[$i]["idTipoPregunta"] == 3) {
              $InstConfig = new Evaluaciones();
              $ResInst = $InstConfig->getConfigTypeRange($res[$i]["idPreguntasEvaluacion"]);
              $res[$i]["Config"] = $ResInst;
            }
          }
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $res
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener los datos de la evaluación seleccionada, inténtelo de nuevo más tarde."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getAnswersPerQuestion($question){
      try {
        $q = "SELECT idPreguntasPosiblesRespuestas, DescripcionRespuesta
              FROM PreguntasPosiblesRespuestas
              WHERE idPreguntasEvaluacion = '$question'
              ORDER BY idPreguntasPosiblesRespuestas ASC;";
        $resultado = $this->Select($q);
        return $resultado;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getConfigTypeRange($question){
      try {
        $q = "SELECT  RangoInicial, RangoFinal
              FROM PreguntasConfiguracion
              WHERE idPreguntasEvaluacion = '$question';";
        $resultado = $this->Select($q);
        return $resultado[0];
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getCompetenciasEvaluacion($idEvaluacionDetalle){
      try {
        $q = "SELECT C.Competencia,C.Significado,C.A,C.B,C.C,C.D,C.E,TO_BASE64(C.idCompetencias) AS idCompetencias
              FROM RespuestaEvaluaciones AS RE
              INNER JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
              WHERE to_base64(RE.idEvaluacionDetalle) = '$idEvaluacionDetalle';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          return $resultado;
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getGeneralEvaluacionSel($idEvaluacionDetalle){
      try {
        $q = "SELECT E.Nombre AS NombreEmpleado, EV.Titulo as TEvaluacion,
              IF((SELECT COUNT(*) FROM RespuestaEvaluaciones
	               WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle' AND (Calificacion IS NULL OR Calificacion = '')) = 0,
                 (SELECT TO_BASE64(MAX(idRespuestaEvaluaciones))
                    FROM RespuestaEvaluaciones WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle'),
                 (SELECT TO_BASE64(MIN(idRespuestaEvaluaciones))
                    FROM RespuestaEvaluaciones WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle' AND (Calificacion IS NULL OR Calificacion = '')))
               AS UltimaRespuesta,
              IF((SELECT COUNT(*) FROM RespuestaEvaluaciones
	               WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle' AND (Calificacion IS NULL OR Calificacion = '')) = 1,1,0) AS UltimoDec,
              PU.Puesto, ED.NivelEvaluado
              FROM EvaluacionDetalle AS ED
              INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvaluado
              INNER JOIN Evaluaciones AS EV ON EV.idEvaluaciones = ED.idEvaluaciones
              INNER JOIN Puestos AS PU ON PU.IdPuesto = ED.PuestoEvaluado
              WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle';";
              error_log($q);
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado[0]
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener los datos generales de la evaluación, inténtelo de nuevo más tarde."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveResultCompetence($value,$response,$Comentarios){
      try {
        $q = "UPDATE RespuestaEvaluaciones SET Calificacion = '$value', Comentarios = '$Comentarios'
              WHERE TO_BASE64(idRespuestaEvaluaciones) = '$response';";
        $this->ExecuteQuery($q,array());
        return true;
      } catch (\Exception $e) {
        return false;
      }
    }

    function validateResultsEvaluation($idEvaluacionDetalle){
      try {
        $q = "SELECT IF(COUNT(*) < 2, 1, 0) AS Validando FROM RespuestaEvaluaciones
              WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle' AND (Calificacion IS NULL OR Calificacion = '');";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          $Valicion = $resultado[0]["Validando"];
          if ($Valicion == 1) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un error al validar los datos de la evaluación, inténtelo nuevamente en unos momentos."
            ];
          }
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al validar los datos de la evaluación, inténtelo nuevamente en unos momentos."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return false;
      }
    }

    function finishEvaluation($nidEvaluacionDetalle,$nidRespuestaEvaluaciones,$nCalificacion,$nComentarios){
      try {
        $nidEvaluacionDetalle = base64_decode($nidEvaluacionDetalle);
        $nidRespuestaEvaluaciones = base64_decode($nidRespuestaEvaluaciones);
        $q = "CALL spFinalizaEvaluacion('$nidEvaluacionDetalle','$nidRespuestaEvaluaciones','$nCalificacion','$nComentarios')";
        $resultado = $this->Procedure($q,array());
        if (sizeof($resultado) > 0 ) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Msg" => "¡Evaluación realizada con éxito!"
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al finalizar la evaluación, inténtelo nuevamente en unos momentos."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getEmpleadosEvaluadosPorEv($idEvaluaciones){
      try {
        $q = "SELECT DISTINCT(E.Nombre) AS Empleado, TO_BASE64(ED.NoEmpleadoEvaluado) AS IdEvaluado,
              COUNT(CASE WHEN StatusEvaluado = 1 THEN 1 END) AS Completadas,
              COUNT(CASE WHEN StatusEvaluado = 0 THEN 0 END) AS SinCompletar,
              COUNT(*) AS TotalEvaluadores
              FROM EvaluacionDetalle AS ED
              INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvaluado
              WHERE ED.StatusEvaluado = 1 AND TO_BASE64(ED.idEvaluaciones) = '$idEvaluaciones'
              GROUP BY IdEvaluado
              HAVING TotalEvaluadores > 0;";
        $resultado = $this->Select($q,array());
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getEvaluatedBy($evaluation,$employee){
      try {
        $q = "SELECT E.Nombre AS Empleado, TO_BASE64(idEvaluacionDetalle) AS IdDetalle
              FROM EvaluacionDetalle AS ED
              INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvalua
              WHERE TO_BASE64(ED.idEvaluaciones) = '$evaluation' AND ED.StatusEvaluado = 1
                AND TO_BASE64(ED.NoEmpleadoEvaluado) = '$employee';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener la lista de evaluadores del empleado seleccionado."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getEvaluationDetail($idEvaluated){
      try {
        $Instlvl = new Evaluaciones();
        $DataLvl = $Instlvl->getLevelOfTheEvaluated($idEvaluated);
        if (!$DataLvl) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener el nivel del empleado evaluado."
          ];
        } else {
          $q = "SELECT RE.Calificacion, C.Competencia,DC.NivelEmpleado,DC.CalificacionEsperado
                FROM RespuestaEvaluaciones AS RE
                INNER JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
                INNER JOIN DetalleCompetencias AS DC ON DC.idCompetencias = RE.idCompetencias
                WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluated' AND DC.NivelEmpleado = '$DataLvl[NivelEvaluado]';";
          $resultado = $this->Select($q,array());
          if (sizeof($resultado) > 0 ) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => $resultado,
              "DataLvl" => $DataLvl
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un error al obtener los datos de la evaluación."
            ];
          }
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getLevelOfTheEvaluated($idEvaluated){
      try {
        $q = "SELECT NivelEvaluado
              FROM EvaluacionDetalle
              WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluated';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          return $resultado[0];
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDataEmployeeGeneral($employee,$evaluation){
      try {
        $q = "SELECT E.Nombre,E.NoEmpleado,ED.NivelEvaluado,P.Puesto,
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) > 0 AND
              	(SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) > 0,'A',
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1)  = 0 AND
              	(SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) > 0,'B',
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1)  > 0 AND
              	(SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) = 0,'C', 'D'
              ))) AS GrupoEvaluado
              FROM Empleados AS E
              INNER JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = E.NoEmpleado
              INNER JOIN Puestos AS P ON P.IdPuesto = ED.PuestoEvaluado
              WHERE TO_BASE64(NoEmpleado) = '$employee'
              GROUP BY E.Nombre;";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          return $resultado[0];
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }
    function getGeneralDetailEvaluated($employee,$evaluation){
      try {
        $InstDataEmployee = new Evaluaciones();
        $DataEmployee = $InstDataEmployee->getDataEmployeeGeneral($employee,$evaluation);
        if (!$DataEmployee) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener los registros generales del empleado seleccionado."
          ];
        } else {
          $Instlvl = new Evaluaciones();
          $DataLvl = $Instlvl->getLevelOfTheEvaluatedGeneral($employee,$evaluation);
          if (!$DataLvl) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un error al obtener el nivel general del empleado seleccionado."
            ];
          } else {
            $q = "SELECT TO_BASE64(RE.idCompetencias) AS IdCompetencia, RE.Calificacion, C.Competencia, DC.CalificacionEsperado,
                  ED.JefeEvalua,ED.ParEvalua,ED.AutoEvalua,ED.SubordinadoEvalua,TO_BASE64(RE.idEvaluacionDetalle) AS EvaluacionDetalle
                  FROM RespuestaEvaluaciones AS RE
                  INNER JOIN EvaluacionDetalle AS ED ON ED.idEvaluacionDetalle = RE.idEvaluacionDetalle
                  INNER JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
                  INNER JOIN DetalleCompetencias DC ON DC.idCompetencias = C.idCompetencias
                  WHERE ED.StatusEvaluado = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation'
                    AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND DC.NivelEmpleado = '$DataLvl[NivelEvaluado]';";
            $resultado = $this->Select($q,array());
            if (sizeof($resultado) > 0) {
              $arrRetorno = [
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado,
                "DataEmployee" => $DataEmployee
              ];
            } else {
              $arrRetorno = [
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Ha ocurrido un error al obtener los registros de la evaluación del empleado seleccionado."
              ];
            }
          }
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getLevelOfTheEvaluatedGeneral($employee,$evaluation){
      try {
        $q = "SELECT NivelEvaluado
              FROM EvaluacionDetalle
              WHERE TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND TO_BASE64(idEvaluaciones) = '$evaluation';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          return $resultado[0];
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDetailEvaluation($evaluation){
      try {
        $q = "SELECT Titulo
              FROM Evaluaciones
              WHERE TO_BASE64(idEvaluaciones) = '$evaluation';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado[0]
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener los datos de la evaluación seleccionada."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function listEvaluados($idEvaluaciones){
      try {
          // if ($IdSucursal != "" && $IdPuesto == "") {
          //   $PlusWhere = "AND TO_BASE64(E.IdSucursal) = '$IdSucursal'";
          // } elseif ($IdSucursal == "" && $IdPuesto != "") {
          //   $PlusWhere = "AND TO_BASE64(E.IdPuesto) = '$IdPuesto'";
          // } elseif ($IdSucursal != "" && $IdPuesto != "") {
          //   $PlusWhere = "AND TO_BASE64(E.IdPuesto) = '$IdPuesto' AND TO_BASE64(E.IdSucursal)  = '$IdSucursal'";
          // } else {
          //   $PlusWhere = "AND TO_BASE64(P.IdDivision) = '$division'";
          // }
          $q = "SELECT E.Nombre,ED.NivelEvaluado,P.Puesto,TO_BASE64(ED.NoEmpleadoEvaluado) AS NoEmpleadoEvaluado,
                ED.NoEmpleadoEvaluado AS NoEmpleado
                FROM EvaluacionDetalle AS ED
                INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvaluado
                INNER JOIN Puestos AS P ON P.IdPuesto = ED.PuestoEvaluado
                WHERE TO_BASE64(ED.idEvaluaciones) = '$idEvaluaciones'
                GROUP BY E.Nombre";
          $resultado = $this->Select($q,array());
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
          ];
          return json_encode($arrRetorno);
        } catch (\Exception $e) {
          return $e;
        }
      }

      function getlist_evaluadores($NoEmpleado,$Evaluacion){
        try {
          $q = "SELECT TO_BASE64(ED.idEvaluacionDetalle) AS idEvaluacionDetalle, E.Nombre, ED.StatusEvaluado,
                IF(ED.JefeEvalua = 1,'JEFE',IF(ED.ParEvalua = 1,'PAR', IF(ED.AutoEvalua = 1,'AUTO','SUBORDINADO'))) AS TipoEvaluador,
                IF(ED.StatusEvaluado = 1,0,IF(ED.AutoEvalua = 1,0,1)) AS StatusEvaluacion
                FROM EvaluacionDetalle AS ED
                INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvalua
                WHERE TO_BASE64(ED.NoEmpleadoEvaluado) = '$NoEmpleado' AND TO_BASE64(ED.idEvaluaciones) = '$Evaluacion' AND ED.Status = 1;";
          $resultado = $this->Select($q,array());
          if (sizeof($resultado) > 0 ) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => $resultado
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un error al obtener el listado de los evaluadores."
            ];
          }
        return json_encode($arrRetorno);
        } catch (\Exception $e) {
          return $e;
        }
      }

    function getGeneralInfoEvaluacion($idEvaluaciones){
      try {
        $q = "SELECT Titulo FROM Evaluaciones WHERE TO_BASE64(idEvaluaciones) = '$idEvaluaciones';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado[0]
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener los datos generales de la evaluación seleccionada."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function deleteEvaluador($idEvaluacionDetalle){
      try {
        $q = "UPDATE EvaluacionDetalle SET Status = 0 WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle'";
        $this->ExecuteQuery($q,array());
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Evaluador eliminado con éxito."
        ];
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addEmpleadoEvaluador($nidEvaluaciones,$nNoEmpleadoEvalua,$nNoEmpleadoEvaluado,$nTipoEvaluador){
      try {
        $nidEvaluaciones = base64_decode($nidEvaluaciones);
        $nNoEmpleadoEvalua = base64_decode($nNoEmpleadoEvalua);
        $nNoEmpleadoEvaluado = base64_decode($nNoEmpleadoEvaluado);
        $q = "CALL spAddEvaluador('$nidEvaluaciones','$nNoEmpleadoEvalua','$nNoEmpleadoEvaluado','$nTipoEvaluador')";
        $resultado = $this->Procedure($q,array());
        if (sizeof($resultado) > 0) {
          $valProc = $resultado[0]["Retorno"];
          $msgProc = $resultado[0]["MsgRetorno"];
          if ($valProc == 1) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "ConMsg" => true,
              "Msg" => $msgProc
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => $msgProc
            ];
          }
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al agregar un nuevo evaluador."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function viewUnfinishedEmployees($evaluation){
      try {
        $evalDecoded = base64_decode($evaluation);
        $q = "SELECT 
                ED.NoEmpleadoEvalua AS NoEmpleado, 
                E.Nombre, 
                P.Puesto, 
                SD.Sucursal,
                COUNT(ED.idEvaluacionDetalle) AS CantEvaluaciones,
                SUM(IF(ED.StatusEvaluado = 1, 1, 0)) AS CantRespondidas
              FROM EvaluacionDetalle AS ED
              INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvalua
              LEFT JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              LEFT JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE ED.idEvaluaciones = '$evalDecoded' AND ED.Status = 1
              GROUP BY ED.NoEmpleadoEvalua, E.Nombre, P.Puesto, SD.Sucursal
              HAVING CantRespondidas < CantEvaluaciones;";
        $resultado = $this->Select($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getAllDataEmployeeGeneral(){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT EV.Titulo AS NameEvaluacion,E.Nombre,E.NoEmpleado,ED.NivelEvaluado,P.Puesto,TO_BASE64(ED.idEvaluaciones) AS idEvaluaciones,
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) > 0 AND
              	(SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) > 0,'A',
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1)  = 0 AND
              	(SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) > 0,'B',
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1)  > 0 AND
              	(SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) = 0,'C', 'D'
              ))) AS GrupoEvaluado,
              (SELECT COUNT(*) FROM EvaluacionDetalle WHERE NoEmpleadoEvaluado = '$NoEmpleado' AND idEvaluaciones = ED.idEvaluaciones AND Status = 1) AS CantMisEvaluadores,
              (SELECT COUNT(*) FROM EvaluacionDetalle WHERE NoEmpleadoEvaluado = '$NoEmpleado' AND idEvaluaciones = ED.idEvaluaciones AND Status = 1 AND StatusEvaluado) AS CantMisEvaluadoresF,
              TO_BASE64(ED.NoEmpleadoEvaluado) AS NoEmpleadoEvaluado,
              TO_BASE64(ED.idEvaluaciones) AS idEvaluaciones,
              IF(ED.idEvaluaciones IN (SELECT idEvaluaciones FROM PlanesAccionEvaluacion WHERE NoEmpleado = '$NoEmpleado'),1,0) AS ConPlanAccion,
              TO_BASE64(PA.idPlanesAccionEvaluacion) AS PlanAction,
              IF(NOW() BETWEEN EV.RetroFechaIni AND EV.RetroFechaFin,1,0) AS RetroDisponible,
              IF(UNIX_TIMESTAMP(NOW()) < UNIX_TIMESTAMP(EV.RetroFechaIni),CONCAT('Retroalimentación disponible desde el ',DATE_FORMAT(EV.RetroFechaIni,'%d-%m-%Y'),' al ',DATE_FORMAT(EV.RetroFechaFin,'%d-%m-%Y')),
                 IF(UNIX_TIMESTAMP(NOW()) > UNIX_TIMESTAMP(EV.RetroFechaFin),'El periodo para aceptar la retroalimentación ha caducado','')) AS MsgRetroDisponible,
              IF(EV.idEvaluaciones IN(SELECT idEvaluaciones FROM RetroalimentacionEvaluacion WHERE NoEmpleado = '$NoEmpleado'),1,0) AS RetroRealizada,
              EV.PlanAFechaIni, EV.PlanAFechaFin
              FROM Empleados AS E
              INNER JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = E.NoEmpleado
              INNER JOIN Puestos AS P ON P.IdPuesto = ED.PuestoEvaluado
              INNER JOIN Evaluaciones as EV ON EV.idEvaluaciones = ED.idEvaluaciones
              LEFT JOIN PlanesAccionEvaluacion AS PA ON PA.idEvaluaciones = EV.idEvaluaciones
              WHERE E.NoEmpleado = '$NoEmpleado'
              GROUP BY ED.idEvaluaciones;";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0 ) {
          return $resultado;
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getAllGeneralDataPerEmployeeFinal(){
      try {
        $finalData = [];
        $NoEmpleado = base64_encode(SessionManager::get("NoEmpleado"));
        $InstInitialEv = new Evaluaciones();
        $ResInstInitialEv = $InstInitialEv->getAllDataEmployeeGeneral();
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $ResInstInitialEv
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function acceptFeedback($evaluation){
      try {
        $evaluation = base64_decode($evaluation);
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "INSERT INTO RetroalimentacionEvaluacion(idEvaluaciones, NoEmpleado) VALUES('$evaluation','$NoEmpleado')";
        $this->ExecuteQuery($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "La retroalimentación ha sido aceptada con éxito"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    // function getGeneralDetailEvaluated($employee,$evaluation){
    //   try {
    //     $InstDataEmployee = new Evaluaciones();
    //     $DataEmployee = $InstDataEmployee->getDataEmployeeGeneral($employee,$evaluation);
    //     if (!$DataEmployee) {
    //       $arrRetorno = [
    //         "Resultado" => true,
    //         "Siguiente" => false,
    //         "ConMsg" => true,
    //         "Msg" => "Ha ocurrido un error al obtener los registros generales del empleado seleccionado."
    //       ];
    //     } else {
    //       $Instlvl = new Evaluaciones();
    //       $DataLvl = $Instlvl->getLevelOfTheEvaluatedGeneral($employee,$evaluation);
    //       if (!$DataLvl) {
    //         $arrRetorno = [
    //           "Resultado" => true,
    //           "Siguiente" => false,
    //           "ConMsg" => true,
    //           "Msg" => "Ha ocurrido un error al obtener el nivel general del empleado seleccionado."
    //         ];
    //       } else {
    //         $q = "SELECT TO_BASE64(RE.idCompetencias) AS IdCompetencia, RE.Calificacion, C.Competencia, DC.CalificacionEsperado,
    //               ED.JefeEvalua,ED.ParEvalua,ED.AutoEvalua,ED.SubordinadoEvalua,TO_BASE64(RE.idEvaluacionDetalle) AS EvaluacionDetalle
    //               FROM RespuestaEvaluaciones AS RE
    //               INNER JOIN EvaluacionDetalle AS ED ON ED.idEvaluacionDetalle = RE.idEvaluacionDetalle
    //               INNER JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
    //               INNER JOIN DetalleCompetencias DC ON DC.idCompetencias = C.idCompetencias
    //               WHERE ED.StatusEvaluado = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation'
    //                 AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND DC.NivelEmpleado = '$DataLvl[NivelEvaluado]';";
    //         $resultado = $this->Select($q,array());
    //         if (sizeof($resultado) > 0) {
    //           $arrRetorno = [
    //             "Resultado" => true,
    //             "Siguiente" => true,
    //             "Data" => $resultado,
    //             "DataEmployee" => $DataEmployee
    //           ];
    //         } else {
    //           $arrRetorno = [
    //             "Resultado" => true,
    //             "Siguiente" => false,
    //             "ConMsg" => true,
    //             "Msg" => "Ha ocurrido un error al obtener los registros de la evaluación del empleado seleccionado."
    //           ];
    //         }
    //       }
    //     }
    //     return json_encode($arrRetorno);
    //   } catch (\Exception $e) {
    //     return $e;
    //   }
    // }

    // function getDataEmployeeGeneral($employee,$evaluation){
    //   try {
    //     $q = "SELECT E.Nombre,E.NoEmpleado,ED.NivelEvaluado,P.Puesto,
    //           IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) > 0 AND
    //             (SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) > 0,'A',
    //           IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1)  = 0 AND
    //             (SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) > 0,'B',
    //           IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1)  > 0 AND
    //             (SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND Status = 1) = 0,'C', 'D'
    //           ))) AS GrupoEvaluado,
    //           IF(E.Imagen IS NULL OR E.Imagen = '','assets/Klyns.png',CONCAT('Archivos/ImgEmpleados/',E.NoEmpleado,'/',E.Imagen)) AS ImgEmpleado,
    //           IF('$evaluation' IN (SELECT TO_BASE64(idEvaluaciones) FROM RetroalimentacionEvaluacion WHERE TO_BASE64(NoEmpleado) = '$employee'),1,0) AS RetroalimentacionR,
    //           (SELECT DATE_FORMAT(PlanAFechaIni,'%d-%m-%Y') FROM Evaluaciones WHERE TO_BASE64(idEvaluaciones) = '$evaluation') AS PlanAFechaIni,
    //           (SELECT DATE_FORMAT(PlanAFechaFin,'%d-%m-%Y') FROM Evaluaciones WHERE TO_BASE64(idEvaluaciones) = '$evaluation') AS PlanAFechaFin
    //           FROM Empleados AS E
    //           INNER JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = E.NoEmpleado
    //           INNER JOIN Puestos AS P ON P.IdPuesto = ED.PuestoEvaluado
    //           WHERE TO_BASE64(NoEmpleado) = '$employee'
    //           GROUP BY E.Nombre;";
    //     $resultado = $this->Select($q,array());
    //     if (sizeof($resultado) > 0 ) {
    //       return $resultado[0];
    //     } else {
    //       return false;
    //     }
    //   } catch (\Exception $e) {
    //     return $e;
    //   }
    // }

    // function getLevelOfTheEvaluatedGeneral($employee,$evaluation){
    //   try {
    //     $q = "SELECT NivelEvaluado
    //           FROM EvaluacionDetalle
    //           WHERE TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND TO_BASE64(idEvaluaciones) = '$evaluation';";
    //     $resultado = $this->Select($q,array());
    //     if (sizeof($resultado) > 0 ) {
    //       return $resultado[0];
    //     } else {
    //       return false;
    //     }
    //   } catch (\Exception $e) {
    //     return $e;
    //   }
    // }

    function acceptResultsEvaluation($evaluation,$employee,$required,$dataCompetences){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $evaluation = base64_decode($evaluation);
        $employee = base64_decode($employee);
        $q = "CALL sp_CreaPlanAccion('$evaluation','$employee','$NoEmpleado','$required');";
        $resultado = $this->Procedure($q,array());
        if ($required != 0 && sizeof($dataCompetences) > 0) {
          if (sizeof($resultado) > 0) {
            $newPlanAction = $resultado[0]["PlanGenerated"];
            for ($i=0; $i < sizeof($dataCompetences) ; $i++) {
              $resultadoEv = $dataCompetences[$i]["resultado"];
              $competence = $dataCompetences[$i]["competence"];
              $idCompetence = $dataCompetences[$i]["idCompetence"];
              $idCompetence = base64_decode($idCompetence);
              $conPlanAction = new Conexiones();
              $qPA = "INSERT INTO ObjetivosPlanAccion(idPlanesAccionEvaluacion, CalificacionFinal, idCompetencias)
                           VALUES ('$newPlanAction','$resultadoEv','$idCompetence');";
              $conPlanAction->ExecuteQuery($qPA,array());
            }
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => base64_encode($newPlanAction),
              "GoUrl" => true,
              "ConMsg" => true,
              "Msg" => "Se ha generado un nuevo plan de acción"
            ];
          } else {
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un problema al continuar con la acción seleccionada"
            ];
          }
        } else {
           $arrReturn = [
             "Resultado" => true,
             "Siguiente" => true,
             "GoUrl" => false,
             "ConMsg" => true,
             "Msg" => "Los resultados finales han sido aceptados de manera correcta"
           ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function evaluationsAboutTheEmployee($NoEmpleado){
      try {
        $q = "SELECT EV.Titulo AS NameEvaluacion,E.Nombre,E.NoEmpleado,ED.NivelEvaluado,P.Puesto,TO_BASE64(ED.idEvaluaciones) AS idEvaluaciones,
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) > 0 AND
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) > 0,'A',
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1)  = 0 AND
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) > 0,'B',
              IF((SELECT COUNT(*) FROM EvaluacionDetalle WHERE SubordinadoEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1)  > 0 AND
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE ParEvalua = 1 AND NoEmpleadoEvaluado = '$NoEmpleado' AND Status = 1) = 0,'C', 'D'
              ))) AS GrupoEvaluado,
              (SELECT COUNT(*) FROM EvaluacionDetalle WHERE NoEmpleadoEvaluado = '$NoEmpleado' AND idEvaluaciones = ED.idEvaluaciones AND Status = 1) AS CantMisEvaluadores,
              (SELECT COUNT(*) FROM EvaluacionDetalle WHERE NoEmpleadoEvaluado = '$NoEmpleado' AND idEvaluaciones = ED.idEvaluaciones AND Status = 1 AND StatusEvaluado) AS CantMisEvaluadoresF,
              TO_BASE64(ED.NoEmpleadoEvaluado) AS NoEmpleadoEvaluado,
              TO_BASE64(ED.idEvaluaciones) AS idEvaluaciones,
              IF(ED.idEvaluaciones IN (SELECT idEvaluaciones FROM PlanesAccionEvaluacion WHERE NoEmpleado = '$NoEmpleado'),1,0) AS ConPlanAccion,
              IF(NOW() BETWEEN EV.RetroFechaIni AND EV.RetroFechaFin,1,0) AS RetroDisponible,
              IF(UNIX_TIMESTAMP(NOW()) < UNIX_TIMESTAMP(EV.RetroFechaIni),CONCAT('Retroalimentación disponible desde el ',DATE_FORMAT(EV.RetroFechaIni,'%d-%m-%Y'),' al ',DATE_FORMAT(EV.RetroFechaFin,'%d-%m-%Y')),
                 IF(UNIX_TIMESTAMP(NOW()) > UNIX_TIMESTAMP(EV.RetroFechaFin),'El periodo para aceptar la retroalimentación ha caducado','')) AS MsgRetroDisponible,
              IF(EV.idEvaluaciones IN(SELECT idEvaluaciones FROM RetroalimentacionEvaluacion WHERE NoEmpleado = '$NoEmpleado'),1,0) AS RetroRealizada
              FROM Empleados AS E
              INNER JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = E.NoEmpleado
              INNER JOIN Puestos AS P ON P.IdPuesto = ED.PuestoEvaluado
              INNER JOIN Evaluaciones as EV ON EV.idEvaluaciones = ED.idEvaluaciones
              WHERE NoEmpleado = '$NoEmpleado'
              GROUP BY ED.idEvaluaciones;";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
          ];
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "El empleado seleccionado aún no se le ha asignado alguna evaluación"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getEmployeesWhitPlanAction(){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT E.NoEmpleado, E.Nombre, P.Puesto, SD.Sucursal
              FROM PlanesAccionEvaluacion AS PAE
              INNER JOIN Empleados AS E ON E.NoEmpleado = PAE.NoEmpleado
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE PAE.UsuarioAlta = '$NoEmpleado' AND E.Status = 1 AND PAE.Requerido = 1
              GROUP BY E.NoEmpleado;";
        $resultado = $this->Select($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getPlanActionPerEmployee($employee){
      try {
        $q = "SELECT TO_BASE64(PAE.idPlanesAccionEvaluacion) AS idPlanesAccionEvaluacion, EV.Titulo,
              IF(PAE.StatusConfirmaPlanAccion = 0,'Plan de acción sin terminar','Plan de acción finalizado') AS MsgEstadoPlanA
              FROM PlanesAccionEvaluacion AS PAE
              INNER JOIN Evaluaciones AS EV ON EV.idEvaluaciones = PAE.idEvaluaciones
              WHERE PAE.Requerido = 1 AND PAE.NoEmpleado = '$employee';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
          ];
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un problema al obtener el listado de los planes de acción generados para el empleado seleccionado"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getMyPlansAction(){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT TO_BASE64(PAE.idPlanesAccionEvaluacion) AS idPlanesAccionEvaluacion, EV.Titulo
              FROM PlanesAccionEvaluacion AS PAE
              INNER JOIN Evaluaciones AS EV  ON EV.idEvaluaciones = PAE.idEvaluaciones
              WHERE PAE.Requerido = 1 AND PAE.NoEmpleado = '$NoEmpleado';";
        $resultado = $this->Select($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getSummaryPlanAction($planA){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT StatusConfirmaActividades,IF(FechaConfirmaActividades IS NULL, 'No registrado', FechaConfirmaActividades) AS FechaConfirmaActividades,
              StatusConfirmaPlanAccion, IF(FechaConfirmaPlanAccion IS NULL,'No registrado', FechaConfirmaPlanAccion) AS FechaConfirmaPlanAccion,
              (SELECT RE.FechaAceptado FROM RetroalimentacionEvaluacion AS RE
              	INNER JOIN PlanesAccionEvaluacion PAE ON PAE.idEvaluaciones = RE.idEvaluaciones
              	WHERE TO_BASE64(PAE.idPlanesAccionEvaluacion) = '$planA')  AS FechaAceptaRetroalimentacion,
              IF(NoEmpleado = '$NoEmpleado',1,0) AS TipoRealiza
              FROM PlanesAccionEvaluacion
              WHERE TO_BASE64(idPlanesAccionEvaluacion) = '$planA';";

        $InstCant = new Evaluaciones();
        $ResultInst = $InstCant->summaryOfActionPlanQuantities($planA);
        $resultado = $this->Select($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => [
            "Resumen" => $resultado[0],
            "Cantidades" => $ResultInst
          ]
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getInitialDetailPlanAction($planAction){
      try {
        $finalArr = [];
        $q = "SELECT OPA.CalificacionFinal, TO_BASE64(OPA.idObjetivosPlanAccion) AS idObjetivosPlanAccion, C.Competencia,
              OPA.Objetivo,OPA.DescObjetivo,
              (COALESCE(SUM(APA.Progreso),0) / COUNT(APA.idActividadesPlanAccion)) AS ProgresoObjetivo
              FROM ObjetivosPlanAccion AS OPA
              INNER JOIN Competencias AS C ON C.idCompetencias = OPA.idCompetencias
              LEFT JOIN ActividadesPlanAccion AS APA ON APA.idObjetivosPlanAccion = OPA.idObjetivosPlanAccion
              WHERE TO_BASE64(OPA.idPlanesAccionEvaluacion) = '$planAction'
              GROUP BY OPA.idObjetivosPlanAccion;";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          for ($i=0; $i < sizeof($resultado) ; $i++) {
            $IdObjetive = $resultado[$i]["idObjetivosPlanAccion"];
            $InstActivities = new Evaluaciones();
            $ResultInst = $InstActivities->getActivitiesObjetive($IdObjetive);
            array_push($finalArr,[
              "Principal" => $resultado[$i],
              "Activities" => $ResultInst
            ]);
          }
        }
        $arrReturn = [
          "Resultado" => true,
          "Data" => $finalArr,
          "Siguiente" => true
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getActivitiesObjetive($objetive){
      try {
        $q = "SELECT to_base64(idActividadesPlanAccion) AS idActividadesPlanAccion, Titulo, Descripcion, FechaInicio, FechaFin, Progreso,
              IF(unix_timestamp(FechaFin) < unix_timestamp(curdate()),'1','0') AS FechaCaduca
              FROM ActividadesPlanAccion
              WHERE TO_BASE64(idObjetivosPlanAccion) = '$objetive';";
        $resultado = $this->Select($q,array());
        return $resultado;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addActivityPerObjetive($objetive, $title, $description, $dateIni, $dateEnd){
      try {
        $objetive = base64_decode($objetive);
        $q = "CALL sp_AddActivityPlanA('$objetive','$title','$description','$dateIni','$dateEnd');";
        $resultado = $this->Procedure($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Actividad registrada",
          "Data" => $resultado[0]
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDetailObjetivePlanAction($objetive){
      try {
        $q = "SELECT C.Competencia, OPA.Objetivo, OPA.DescObjetivo
              FROM ObjetivosPlanAccion AS OPA
              INNER JOIN Competencias AS C ON C.idCompetencias = OPA.idCompetencias
              WHERE TO_BASE64(OPA.idObjetivosPlanAccion) = '$objetive';";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado[0]
          ];
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un problema al obtener los datos del objetivo seleccionado"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function updateGenObjetivePlanAction($objetive_id,$objetive,$desc){
      try {
        $objetive_id = base64_decode($objetive_id);
        $q = "UPDATE ObjetivosPlanAccion SET Objetivo = '$objetive', DescObjetivo = '$desc'
              WHERE idObjetivosPlanAccion = '$objetive_id';";
        $this->ExecuteQuery($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Datos actualizados"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getGeneralDetailActivityPlanA($activity){
      try {
        $q = "SELECT NuevoAvance,DescripcionAvance,FechaRegistro
              FROM AvanceActividadPlanA
              WHERE TO_BASE64(idActividadesPlanAccion) = '$activity'
              ORDER BY FechaRegistro DESC;";
        $resultado = $this->Select($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addProgressActivity($activity,$newProgress,$description){
      try {
        $activity = base64_decode($activity);
        $q = "CALL sp_AddPgoressActivityPlanA('$activity','$newProgress','$description')";
        $resultado = $this->Procedure($q,array());
        if (sizeof($resultado) > 0) {
          if ($resultado[0]["Retorno"] == 1) {
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => true,
              "ConMsg" => true,
              "Msg" => $resultado[0]["MsgReturn"]
            ];
          } else {
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => $resultado[0]["MsgReturn"]
            ];
          }
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un problema al registrar el avance ingresado"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getListEvaluations(){
          try {
            $q = "SELECT
                    TO_BASE64(EV.idEvaluaciones) AS idEvaluaciones,
                    EV.Titulo,
                    EV.TipoEvaluacion,
                    CASE WHEN EV.TipoEvaluacion = 1 THEN 'Evaluación 360°' ELSE 'Encuesta Normal' END AS TxTipoEvaluacion,
                    EV.Periodicidad,
                    CASE 
                      WHEN EV.Periodicidad = 1 THEN 'Diario'
                      WHEN EV.Periodicidad = 2 THEN 'Semanal'
                      WHEN EV.Periodicidad = 3 THEN 'Mensual'
                      WHEN EV.Periodicidad = 4 THEN 'Único'
                      ELSE '-'
                    END AS TxPeriodicidad,
                    EV.DirigidoA,
                    CASE WHEN EV.DirigidoA = 1 THEN 'Empleados' ELSE 'Postulantes' END AS TxDirigidoA,
                    EV.FechaInicio,
                    EV.FechaFin,
                    EV.RetroFechaIni,
                    EV.RetroFechaFin,
                    EV.PlanAFechaIni,
                    EV.PlanAFechaFin,
                    EV.Status,
                    EV.PreguntasAceptadas,
                    CASE WHEN EV.Status = 0 THEN 'Inactivo' ELSE 'Activo' END AS TxStatus,
                    CASE WHEN EV.Activado = 0 THEN 'Evaluación no activada' ELSE 'Evaluación activada' END AS StatusActivado,
                    EV.Activado,
                    EXISTS (SELECT 1 FROM PreguntasEvaluacion WHERE idEvaluaciones = EV.idEvaluaciones) AS ConPreguntas,
                    (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1 AND StatusEvaluado = 1) AS CantRespondidasM,
                    ((SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1) - (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1 AND StatusEvaluado = 1)) AS Restantes
                FROM
                    Evaluaciones AS EV
                ORDER BY
                    FechaRegistro DESC;";
            $resultado = $this->Select($q);
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => $resultado
            ];
            return json_encode($arrReturn);
          } catch (\Exception $e) {
            return $e;
          }
        }

    function getEvaluationById($idEvaluacion){
          try {
            $idDecoded = base64_decode($idEvaluacion);
            $q = "SELECT
                    TO_BASE64(EV.idEvaluaciones) AS idEvaluaciones,
                    EV.Titulo,
                    EV.TipoEvaluacion,
                    CASE WHEN EV.TipoEvaluacion = 1 THEN 'Evaluación 360°' ELSE 'Encuesta Normal' END AS TxTipoEvaluacion,
                    EV.Periodicidad,
                    CASE 
                      WHEN EV.Periodicidad = 1 THEN 'Diario'
                      WHEN EV.Periodicidad = 2 THEN 'Semanal'
                      WHEN EV.Periodicidad = 3 THEN 'Mensual'
                      WHEN EV.Periodicidad = 4 THEN 'Único'
                      ELSE '-'
                    END AS TxPeriodicidad,
                    EV.DirigidoA,
                    CASE WHEN EV.DirigidoA = 1 THEN 'Empleados' ELSE 'Postulantes' END AS TxDirigidoA,
                    EV.FechaInicio,
                    EV.FechaFin,
                    EV.RetroFechaIni,
                    EV.RetroFechaFin,
                    EV.PlanAFechaIni,
                    EV.PlanAFechaFin,
                    EV.Status,
                    EV.PreguntasAceptadas,
                    CASE WHEN EV.Status = 0 THEN 'Inactivo' ELSE 'Activo' END AS TxStatus,
                    CASE WHEN EV.Activado = 0 THEN 'Evaluación no activada' ELSE 'Evaluación activada' END AS StatusActivado,
                    EV.Activado,
                    EXISTS (SELECT 1 FROM PreguntasEvaluacion WHERE idEvaluaciones = EV.idEvaluaciones) AS ConPreguntas,
                    (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1 AND StatusEvaluado = 1) AS CantRespondidasM,
                    ((SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1) - (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1 AND StatusEvaluado = 1)) AS Restantes
                FROM
                    Evaluaciones AS EV
                WHERE
                    EV.idEvaluaciones = '$idDecoded'
                LIMIT 1;";
            $resultado = $this->Select($q);
            if (count($resultado) > 0) {
              $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado[0]
              ];
            } else {
              $arrReturn = [
                "Resultado" => false,
                "Siguiente" => false,
                "Msg" => "Evaluación no encontrada"
              ];
            }
            return json_encode($arrReturn);
          } catch (\Exception $e) {
            return json_encode([
              "Resultado" => false,
              "Siguiente" => false,
              "Msg" => $e->getMessage()
            ]);
          }
        }

    function saveEvaluationNoE($inpTitulo, $tipoEvaluacion, $dirigidoA, $periodicidad, $inpFechaInicio, $inpFechaFin, $inpRetroFechaIni, $inpRetroFechaFin, $inpPlanAFechaIni, $inpPlanAFechaFin, $empleadosParticipantes = ""){
      try {
        // Preparar valores para campos opcionales
        $retroIni = $inpRetroFechaIni ? "'$inpRetroFechaIni'" : "NULL";
        $retroFin = $inpRetroFechaFin ? "'$inpRetroFechaFin'" : "NULL";
        $planAIni = $inpPlanAFechaIni ? "'$inpPlanAFechaIni'" : "NULL";
        $planAFin = $inpPlanAFechaFin ? "'$inpPlanAFechaFin'" : "NULL";
        $period = $periodicidad ? "'$periodicidad'" : "NULL";
        
        $q = "INSERT INTO Evaluaciones(Titulo, TipoEvaluacion, Periodicidad, FechaInicio, FechaFin, RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, EmpleadosParticipantes, DirigidoA)
	               VALUES ('$inpTitulo', '$tipoEvaluacion', $period, '$inpFechaInicio', '$inpFechaFin', $retroIni, $retroFin, $planAIni, $planAFin, '$empleadosParticipantes', '$dirigidoA');";
        $this->ExecuteQuery($q,array());
        
        // Mensaje según el tipo
        $tipoMsg = $tipoEvaluacion == 1 ? "Evaluación 360°" : "Encuesta Normal";
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "$tipoMsg registrada con éxito"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return json_encode([
          "Resultado" => false,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Error al registrar: " . $e->getMessage()
        ]);
      }
    }

    function getQuestionsPerEvaluation($evaluation){
      try {
        $arrFinal = [];
        $evaluation = base64_decode($evaluation);
        $InstTrueOrFalse = new Evaluaciones();
        $InstExpected = new Evaluaciones();
        $InstAnExpected = new Evaluaciones();
        $InstRange = new Evaluaciones();
        $ResInstTOF = $InstTrueOrFalse->getQuestionsTrueOrFalse($evaluation);
        $resExpected = $InstExpected->getQuestionsExpectedValue($evaluation);
        $resAnExpected = $InstAnExpected->getQuestionsAnAnswerExpected($evaluation);
        $resRangeExpected = $InstRange->getQuestionsPerRange($evaluation);
        $arrFinal = array_merge($arrFinal, $ResInstTOF);
        $arrFinal = array_merge($arrFinal, $resExpected);
        $arrFinal = array_merge($arrFinal, $resAnExpected);
        $arrFinal = array_merge($arrFinal, $resRangeExpected);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $arrFinal
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getQuestionsPerRange($evaluation){
      try {
        $q = "SELECT TO_BASE64(PE.idCompetencias) AS competence, PE.idPreguntasEvaluacion AS IdQuestion,
              C.Competencia AS descCompetence,
              TP.Descripcion AS descTypeQuestion,
              PE.Descripcion AS descriptionQuestion,
              false AS edited,
              true AS saveInBdd,
              PE.Titulo AS titleQuestion,
              TO_BASE64(PE.idTipoPregunta) AS typeQuestion,
              -- PC.idPreguntasConfiguracion AS IdQuestion,
              PC.RangoInicial AS rangeInitial,
              PC.RangoFinal AS rangeEnd
              FROM PreguntasEvaluacion AS PE
              INNER JOIN Competencias AS C ON C.idCompetencias = PE.idCompetencias
              INNER JOIN TipoPregunta AS TP ON TP.idTipoPregunta = PE.idTipoPregunta
              INNER JOIN PreguntasConfiguracion AS PC ON PC.idPreguntasEvaluacion = PE.idPreguntasEvaluacion
              WHERE PE.idEvaluaciones = '$evaluation' AND PE.idTipoPregunta = 3;";
              $res = $this->Select($q,array());
        return $res;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getQuestionsAnAnswerExpected($evaluation){
      try {
        $q = "SELECT TO_BASE64(PE.idCompetencias) AS competence, PE.idPreguntasEvaluacion AS IdQuestion,
              C.Competencia AS descCompetence,
              TP.Descripcion AS descTypeQuestion,
              PE.Descripcion AS descriptionQuestion,
              false AS edited,
              true AS saveInBdd,
              PE.Titulo AS titleQuestion,
              TO_BASE64(PE.idTipoPregunta) AS typeQuestion
              FROM PreguntasEvaluacion AS PE
              INNER JOIN Competencias AS C ON C.idCompetencias = PE.idCompetencias
              INNER JOIN TipoPregunta AS TP ON TP.idTipoPregunta = PE.idTipoPregunta
              WHERE PE.idEvaluaciones = '$evaluation' AND PE.idTipoPregunta = 4;";
              $res = $this->Select($q,array());
        for ($i=0; $i < sizeof($res) ; $i++) {
          $InstExpected = new Evaluaciones();
          $ResultEx = $InstExpected->getAmswersQuestionAnExpectedValue($res[$i]["IdQuestion"]);
          $res[$i]["answers"] = $ResultEx["answers"];
          $res[$i]["expectedValue"] = $ResultEx["expected"];
          $res[$i]["newAnswers"] = [];
        }
        return $res;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getQuestionsTrueOrFalse($evaluation){
      try {
        $q = "SELECT TO_BASE64(PE.idCompetencias) AS competence, C.Competencia AS descCompetence, TP.Descripcion AS descTypeQuestion,
              PE.Descripcion AS descriptionQuestion, false AS edited,
              IF(PC.BoolCorreta = 1, true, false) AS expectedValue,
              true AS saveInBdd, PE.Titulo AS titleQuestion, TO_BASE64(PE.idTipoPregunta) AS typeQuestion,
              PE.idPreguntasEvaluacion AS IdQuestion
              FROM PreguntasEvaluacion AS PE
              INNER JOIN Competencias AS C ON C.idCompetencias = PE.idCompetencias
              INNER JOIN TipoPregunta AS TP ON TP.idTipoPregunta = PE.idTipoPregunta
              INNER JOIN PreguntasConfiguracion AS PC ON PC.idPreguntasEvaluacion = PE.idPreguntasEvaluacion
              WHERE PE.idEvaluaciones = '$evaluation' AND PE.idTipoPregunta = 1;";
        $resultado = $this->Select($q);
        return $resultado;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getAmswersQuestionAnExpectedValue($question){
      try {
        $q = "SELECT DescripcionRespuesta AS DescAnswer, idPreguntasPosiblesRespuestas AS IdQuestion, idPreguntasPosiblesRespuestas AS idAnswer, false AS edited
              FROM PreguntasPosiblesRespuestas
              WHERE idPreguntasEvaluacion = '$question'
              GROUP BY IdQuestion ASC;";
        $resAnswers = $this->Select($q,array());

        $Con2 = new Conexiones();
        $q2 = "SELECT RespuestaCorrectaOM AS IdAnswerExpected, idPreguntasConfiguracion AS IdConfigQuestion, false AS edited, '' AS expectedNew, 'old' AS typeExpectedValue
               FROM PreguntasConfiguracion
               WHERE idPreguntasEvaluacion = '$question';";
        $resExpected = $Con2->Select($q2,array());
        
        // Validar si hay resultados en PreguntasConfiguracion
        $expectedData = null;
        if (is_array($resExpected) && count($resExpected) > 0) {
          $expectedData = $resExpected[0];
        }
        
        return [
          "answers" => $resAnswers,
          "expected" => $expectedData
        ];
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getQuestionsExpectedValue($evaluation){
      try {
        $q = "SELECT TO_BASE64(PE.idCompetencias) AS competence, PE.idPreguntasEvaluacion AS IdQuestion,
              C.Competencia AS descCompetence,
              TP.Descripcion AS descTypeQuestion,
              PE.Descripcion AS descriptionQuestion,
              false AS edited,
              true AS saveInBdd,
              PE.Titulo AS titleQuestion,
              TO_BASE64(PE.idTipoPregunta) AS typeQuestion
              FROM PreguntasEvaluacion AS PE
              INNER JOIN Competencias AS C ON C.idCompetencias = PE.idCompetencias
              INNER JOIN TipoPregunta AS TP ON TP.idTipoPregunta = PE.idTipoPregunta
              WHERE PE.idEvaluaciones = '$evaluation' AND PE.idTipoPregunta = 2;";
        $res = $this->Select($q,array());
        for ($i=0; $i < sizeof($res) ; $i++) {
          $InstExpected = new Evaluaciones();
          $ResultEx = $InstExpected->getAmswersQuestionExpectedValue($res[$i]["IdQuestion"]);
          $res[$i]["answers"] = $ResultEx["answers"];
          $res[$i]["expectedValue"] = $ResultEx["expected"];
          $res[$i]["newAnswers"] = [];
          $res[$i]["expectedValueNew"] = [];
        }
        return $res;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getAmswersQuestionExpectedValue($question){
      try {
        $q = "SELECT DescripcionRespuesta AS DescAnswer, idPreguntasPosiblesRespuestas AS IdQuestion, idPreguntasPosiblesRespuestas AS idAnswer,
              false AS edited
              FROM PreguntasPosiblesRespuestas
              WHERE idPreguntasEvaluacion = '$question'
              GROUP BY IdQuestion ASC;";
        $resAnswers = $this->Select($q,array());

        $Con2 = new Conexiones();
        $q2 = "SELECT RespuestaEsperadoOM AS answerExpected, NivelEmpleadoEsperadoOM AS lvl, idPreguntasEvaluacion AS IdQuestion
               FROM PreguntasConfiguracion
               WHERE idPreguntasEvaluacion = '$question';";
        $resExpected = $Con2->Select($q2,array());
        return [
          "answers" => $resAnswers,
          "expected" => $resExpected
        ];
      } catch (\Exception $e) {
        return $e;
      }
    }

    function removeAnswerSV($question,$answer,$typeQuestion){
      try {
        if ($typeQuestion == 2){
          $q = "SELECT COUNT(*) AS CantidadR
                FROM PreguntasConfiguracion
                WHERE idPreguntasEvaluacion = '$question' AND RespuestaEsperadoOM = '$answer';";
        } else {
          $q = "SELECT COUNT(*) AS CantidadR
                FROM PreguntasConfiguracion
                WHERE idPreguntasEvaluacion = '$question' AND RespuestaCorrectaOM = '$answer';";
        }
        $resultado = $this->Select($q);
        if ($resultado[0]["CantidadR"] > 0 ) {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "resultFound" => true,
            "Msg" => "La respuesta que se intenta eliminar ya se encuentra registrada como posible respuesta esperada dentro de la pregunta."
          ];
        } else {
          $Con2 = new Conexiones();
          $q2 = "DELETE FROM PreguntasPosiblesRespuestas WHERE idPreguntasPosiblesRespuestas = '$answer' AND idPreguntasEvaluacion = '$question';";
          $Con2->ExecuteQuery($q2,array());
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "resultFound" => false,
            // "Msg" => "La respuesta que se intenta eliminar ya se encuentra registrada como posible respuesta esperada dentro de la pregunta."
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addAnswerExpectedQuestionSV($answer, $question, $lvl){
      try {
        foreach ($lvl as $level) {
          $NewCon = new Conexiones();
          $q = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM)
	               VALUES ('$question','$answer','$level');";
          $NewCon->ExecuteQuery($q,array());
        }
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Se ha agregado nuevas respuestas esperadas para la pregunta seleccionada"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function deleteResultExpectedSV($lvl, $answer, $question){
      try {
        $q = "DELETE FROM PreguntasConfiguracion
              WHERE idPreguntasEvaluacion = '$question' AND NivelEmpleadoEsperadoOM = '$lvl' AND RespuestaEsperadoOM = '$answer';";
        $this->ExecuteQuery($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Se ha eliminado la respuesta esperada de la pregunta"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveNewDataOldQuestion($data){
      try {
        $dataDecode = json_decode($data);
        $typeQuesiton = base64_decode($dataDecode->typeQuestion);
        $competenceDecode = base64_decode($dataDecode->competence);
        //
        $idQuestion = $dataDecode->IdQuestion;
        if ($typeQuesiton == 1) {
          if ($dataDecode->edited) {
            $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
            $this->ExecuteQuery($q,array());
            if ($dataDecode->expectedValue) {
              $newTF = 1;
            } else {
              $newTF = 0;
            }
            $ConTF = new Conexiones();
            $qTF = "UPDATE PreguntasConfiguracion SET BoolCorreta = '$newTF'
                      WHERE idPreguntasEvaluacion = '$idQuestion';";
            $ConTF->ExecuteQuery($qTF,array());
          }
        } elseif ($typeQuesiton == 2) {
          if ($dataDecode->edited) {
            $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
            $this->ExecuteQuery($q,array());
          }
          $answersEdited = [];
          foreach ($dataDecode->answers as $oldAnswer) {
            if ($oldAnswer->edited) {
              $answersEdited[] = $oldAnswer;
            }
          }
          if (count($answersEdited) > 0) {
            $contentUpdateAnswer = "";
            $ConUpdateAnswers = new Conexiones();
            foreach ($answersEdited as $ansEdited) {
              $contentUpdateAnswer = $contentUpdateAnswer."UPDATE PreguntasPosiblesRespuestas SET DescripcionRespuesta = '$ansEdited->DescAnswer'
                                                              WHERE idPreguntasPosiblesRespuestas = '$ansEdited->idAnswer' AND idPreguntasEvaluacion = '$idQuestion'; \n";
            }
            $ConUpdateAnswers->ExecuteQuery($contentUpdateAnswer,array());
          }
          if (count($dataDecode->newAnswers) > 0) {
            $answersNew = $dataDecode->newAnswers;
            $arrRespuestasEsperadas = [];
            for ($i=0; $i < sizeof($answersNew) ; $i++) {
              $ConInsertAnswer = new Conexiones();
              $queryInsertAnswer = "CALL sp_AddRespuestaPregunta('$idQuestion','$answersNew[$i]')";
              $res = $ConInsertAnswer->Procedure($queryInsertAnswer,array());
              if (sizeof($res) > 0) {
                $IdRespuesta = $res[0]["IdRespuesta"];
                if (count($dataDecode->expectedValueNew) > 0) {
                  $expectedVal = $dataDecode->expectedValueNew;
                  for ($j=0; $j < sizeof($expectedVal) ; $j++) {
                    if ($expectedVal[$j]->answer == $i) {
                      array_push($arrRespuestasEsperadas,[
                        "IdRespuesta" => $IdRespuesta,
                        "NivelEsperado" => $expectedVal[$j]->lvl,
                      ]);
                    }
                  }
                }
              } else {
                return false;
                break;
              }
            }
            if (count($arrRespuestasEsperadas) > 0) {
              $ContentExpected = "";
              foreach ($arrRespuestasEsperadas as $esperada) {
                $ContentExpected = "$ContentExpected('$idQuestion','$esperada[IdRespuesta]','$esperada[NivelEsperado]'),";
              }
              $ContentExpectedFinal = substr($ContentExpected,0,-1);
              $ConAddAnswerExpected = new Conexiones();
              $queryAddAnswerExpected = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM) VALUES $ContentExpectedFinal;";
              $ConAddAnswerExpected->ExecuteQuery($queryAddAnswerExpected,array());
            }
          }
        } else if ($typeQuesiton == 3){
          if ($dataDecode->edited) {
            $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
            $this->ExecuteQuery($q,array());

            $ConUpdateRange = new Conexiones();
            $queryUpdateRange = "UPDATE PreguntasConfiguracion SET RangoInicial = '$dataDecode->rangeInitial', RangoFinal = '$dataDecode->rangeEnd'
                      WHERE idPreguntasEvaluacion = '$idQuestion';";
            $ConUpdateRange->ExecuteQuery($queryUpdateRange,array());
          }
        } else if ($typeQuesiton == 4) {
          if ($dataDecode->edited) {
            $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
            $this->ExecuteQuery($q,array());
          }
          $answersEdited = [];
          foreach ($dataDecode->answers as $oldAnswer) {
            if ($oldAnswer->edited) {
              $answersEdited[] = $oldAnswer;
            }
          }
          if (count($answersEdited) > 0) {
            $contentUpdateAnswer = "";
            $ConUpdateAnswers = new Conexiones();
            foreach ($answersEdited as $ansEdited) {
              $contentUpdateAnswer = $contentUpdateAnswer."UPDATE PreguntasPosiblesRespuestas SET DescripcionRespuesta = '$ansEdited->DescAnswer'
                                                              WHERE idPreguntasPosiblesRespuestas = '$ansEdited->idAnswer' AND idPreguntasEvaluacion = '$idQuestion'; \n";
            }
            $ConUpdateAnswers->ExecuteQuery($contentUpdateAnswer,array());
          }
          $arrNewResponsesGen = [];
          $varExpectedValues = $dataDecode->expectedValue;
          if (count($dataDecode->newAnswers) > 0) {
            $answersNew = $dataDecode->newAnswers;
            for ($i=0; $i < sizeof($answersNew) ; $i++) {
              $ConInsertAnswer = new Conexiones();
              $queryInsertAnswer = "CALL sp_AddRespuestaPregunta('$idQuestion','$answersNew[$i]')";
              $res = $ConInsertAnswer->Procedure($queryInsertAnswer,array());
              if (sizeof($res) > 0) {
                $IdRespuesta = $res[0]["IdRespuesta"];
                $arrNewResponsesGen[] = [
                  "IdRespuesta" => $IdRespuesta,
                  "PositionArr" => $i
                ];
              } else {
                return false;
                break;
              }
            }
          }
          if ($varExpectedValues->edited) {
            $ConUpdateAnExpected = new Conexiones();
            if ($varExpectedValues->typeExpectedValue == "old") {
              $queryUpdateAnExpected = "UPDATE PreguntasConfiguracion SET RespuestaCorrectaOM = '$varExpectedValues->IdAnswerExpected'
	                                         WHERE idPreguntasConfiguracion = '$varExpectedValues->IdConfigQuestion' AND idPreguntasEvaluacion = '$idQuestion';";
            } else {
              $newAnswerExpected = "";
              for ($i=0; $i < count($arrNewResponsesGen); $i++) {
                if ($arrNewResponsesGen[$i]["PositionArr"] == $varExpectedValues->expectedNew) {
                  $newAnswerExpected = $arrNewResponsesGen[$i]["IdRespuesta"];
                  break;
                }
              }
              $queryUpdateAnExpected = "UPDATE PreguntasConfiguracion SET RespuestaCorrectaOM = '$newAnswerExpected'
                                           WHERE idPreguntasConfiguracion = '$varExpectedValues->IdConfigQuestion' AND idPreguntasEvaluacion = '$idQuestion';";
            }
            $ConUpdateAnExpected->ExecuteQuery($queryUpdateAnExpected,array());
          }
        }
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Se ha actualizado los datos de la pregunta seleccionada"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function deleteQuestionSaved($idQuestion){
      try {
        $q = "CALL sp_EliminaPregunta('$idQuestion');";
        $this->Procedure($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Se ha eliminado la pregunta con éxito"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function shareEvaluation($dataEvaluation, $evaluation){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $evaluation = base64_decode($evaluation);
        $InstEspera = new Evaluaciones();
        $ResultEspera = $InstEspera->addEsperaEvaluacion($dataEvaluation);
        if ($ResultEspera) {
          $q = "CALL sp_PublicarEvaluacion(?,?)";
          // $q2 = "CALL sp_PublicarEvaluacion('$NoEmpleado','$evaluation')";
          // $q = "CALL sp_PublicarEvaluacion('11823','28')";
          $resProcedure = $this->ProcedureWithParam($q,array($NoEmpleado,$evaluation));
        }
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Evaluación publicada con éxito"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getQuestionTypes(){
      try {
        $q = "SELECT TO_BASE64(idTipoPregunta) AS idTipoPregunta, Descripcion, Bool, MultipleEsperado, EvaluaEmpleados, Rango
              FROM TipoPregunta
              WHERE Status = 1
              ORDER BY Descripcion ASC;";
        $resultado = $this->Select($q);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getCompetencesActive(){
      try {
        $q = "SELECT TO_BASE64(idCompetencias) AS idCompetencias, Competencia
              FROM Competencias
              WHERE Estatus = 1
              ORDER BY Competencia ASC;";
        $resultado = $this->Select($q);
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveQuestionsConfig($evaluation,$data){
      try {
        // Log para debugging
        error_log("saveQuestionsConfig - evaluation: " . $evaluation);
        error_log("saveQuestionsConfig - data raw: " . $data);
        
        $evaluation = base64_decode($evaluation);
        error_log("saveQuestionsConfig - evaluation decoded: " . $evaluation);
        
        // Decodificar JSON (devuelve array de objetos)
        $data = json_decode($data);
        
        // Verificar que la decodificación JSON fue exitosa
        if ($data === null) {
          $jsonError = json_last_error_msg();
          error_log("saveQuestionsConfig - Error JSON: " . $jsonError);
          $arrReturn = [
            "Resultado" => false,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Error al decodificar los datos JSON: " . $jsonError
          ];
          return json_encode($arrReturn);
        }
        
        // Convertir a array si es necesario
        if (!is_array($data)) {
          $data = [$data]; // Si es un solo objeto, convertir a array
        }
        
        // Verificar que hay datos
        if (count($data) === 0) {
          error_log("saveQuestionsConfig - No hay preguntas para guardar");
          $arrReturn = [
            "Resultado" => false,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "No hay preguntas para guardar"
          ];
          return json_encode($arrReturn);
        }
        
        error_log("saveQuestionsConfig - data decoded count: " . count($data));
        
        for ($i=0; $i < count($data) ; $i++) {
          $typeQuestionDec = base64_decode($data[$i]->typeQuestion);
          $competenceDec = base64_decode($data[$i]->competence);
          $titleQuestion = $data[$i]->titleQuestion;
          $descriptionQuestion = $data[$i]->descriptionQuestion;
          
          // Usar stored procedure
          $q = "CALL sp_AddNuevaPregunta('$evaluation','$typeQuestionDec','$competenceDec','$titleQuestion','$descriptionQuestion');";
          error_log("saveQuestionsConfig - Ejecutando query: " . $q);
          $resProc = $this->Procedure($q,array());
          error_log("saveQuestionsConfig - Resultado procedimiento: " . print_r($resProc, true));
          
          if ($resProc !== null && is_array($resProc) && count($resProc) > 0) {
            $QuestionGenId = $resProc[0]["IdPreguntaGen"];
            $InstConfigQuestion = new Evaluaciones();
            if ($typeQuestionDec == 1) {
              $ResConfig = $InstConfigQuestion->addAnswerTrueOrFalse($QuestionGenId,$data[$i]->expectedValue);
              if ($ResConfig) {
                // code...
              } else {

              }
            } elseif ($typeQuestionDec == 2) {
              $ResConfig = $InstConfigQuestion->addAnswerExpetedValue($data[$i]->answers, $data[$i]->expectedValue, $QuestionGenId);
              if ($ResConfig) {
                // code...
              } else {

              }
            } elseif ($typeQuestionDec == 3) {
              $ResConfig = $InstConfigQuestion->addRangeValuesPerQuestion($data[$i]->rangeInitial, $data[$i]->rangeEnd, $QuestionGenId);
              if ($ResConfig) {
                // code...
              } else {

              }
            } elseif ($typeQuestionDec == 4) {
              $ResConfig = $InstConfigQuestion->addAnswerAnExpetedValue($data[$i]->answers, $data[$i]->expectedValue, $QuestionGenId);
              if ($ResConfig) {
                // code...
              } else {

              }
            }
          } else {
            error_log("saveQuestionsConfig - Error: El procedimiento sp_AddNuevaPregunta no devolvió resultados para la pregunta " . ($i+1));
          }
        }
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Se han agregado las preguntas a la evaluación"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        error_log("saveQuestionsConfig - Exception: " . $e->getMessage());
        $arrReturn = [
          "Resultado" => false,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Error al guardar: " . $e->getMessage()
        ];
        return json_encode($arrReturn);
      }
    }

    function addRangeValuesPerQuestion($vInital,$vEnd,$idQuestion){
      try {
        $q = "INSERT INTO PreguntasConfiguracion(idPreguntasEvaluacion, RangoInicial, RangoFinal)
	               VALUES('$idQuestion','$vInital','$vEnd');";
        $this->ExecuteQuery($q,array());
        return true;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addAnswerAnExpetedValue($answers, $expectedVal, $idQuestion){
      try {
        // Validar que $answers sea un array
        if (!is_array($answers) || count($answers) === 0) {
          error_log("addAnswerAnExpetedValue - answers no es un array válido: " . print_r($answers, true));
          return false;
        }
        
        $answerExpected = "";
        for ($i=0; $i < count($answers) ; $i++) {
          $NewCon = new Conexiones();
          $q = "CALL sp_AddRespuestaPregunta('$idQuestion','$answers[$i]')";
          $res = $NewCon->Procedure($q,array());
          if (is_array($res) && count($res) > 0) {
            $IdRespuesta = $res[0]["IdRespuesta"];
            if ($expectedVal == $i) {
              $answerExpected = $IdRespuesta;
            }
          } else {
            error_log("addAnswerAnExpetedValue - El procedimiento sp_AddRespuestaPregunta no devolvió resultados");
            return false;
          }
        }
        $Con2 = new Conexiones();
        $q2 = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaCorrectaOM) VALUES ('$idQuestion','$answerExpected');";
        $Con2->ExecuteQuery($q2,array());
        return true;
      } catch (\Exception $e) {
        error_log("addAnswerAnExpetedValue - Exception: " . $e->getMessage());
        return $e;
      }
    }

    function addAnswerExpetedValue($answers, $expectedVal, $idQuestion){
      try {
        // Validar que $answers sea un array
        if (!is_array($answers) || count($answers) === 0) {
          error_log("addAnswerExpetedValue - answers no es un array válido: " . print_r($answers, true));
          return false;
        }
        
        // Validar que $expectedVal sea un array
        if (!is_array($expectedVal) || count($expectedVal) === 0) {
          error_log("addAnswerExpetedValue - expectedVal no es un array válido: " . print_r($expectedVal, true));
          return false;
        }
        
        $arrRespuestasEsperadas = [];
        for ($i=0; $i < count($answers) ; $i++) {
          $NewCon = new Conexiones();
          $q = "CALL sp_AddRespuestaPregunta('$idQuestion','$answers[$i]')";
          $res = $NewCon->Procedure($q,array());
          if (is_array($res) && count($res) > 0) {
            $IdRespuesta = $res[0]["IdRespuesta"];
            for ($j=0; $j < count($expectedVal) ; $j++) {
              if ($expectedVal[$j]->answer == $i) {
                array_push($arrRespuestasEsperadas,[
                  "IdRespuesta" => $IdRespuesta,
                  "NivelEsperado" => $expectedVal[$j]->lvl,
                ]);
              }
            }
          } else {
            error_log("addAnswerExpetedValue - El procedimiento sp_AddRespuestaPregunta no devolvió resultados");
            return false;
          }
        }
        
        if (count($arrRespuestasEsperadas) === 0) {
          error_log("addAnswerExpetedValue - No se encontraron respuestas esperadas");
          return false;
        }
        
        $ContentExpected = "";
        foreach ($arrRespuestasEsperadas as $esperada) {
          $ContentExpected = "$ContentExpected('$idQuestion','$esperada[IdRespuesta]','$esperada[NivelEsperado]'),";
        }
        $ContentExpectedFinal = substr($ContentExpected,0,-1);
        $Con2 = new Conexiones();
        $q2 = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM) VALUES $ContentExpectedFinal;";
        $Con2->ExecuteQuery($q2,array());
        return true;
      } catch (\Exception $e) {
        error_log("addAnswerExpetedValue - Exception: " . $e->getMessage());
        return $e;
      }
    }

    function addAnswerTrueOrFalse($question,$res){
      try {
        if ($res == true) {
          $newVal = 1;
        } else {
          $newVal = 0;
        }
        $q = "INSERT INTO PreguntasConfiguracion(idPreguntasEvaluacion, BoolCorreta)
                VALUES ('$question','$newVal');";
        $this->ExecuteQuery($q,array());
        return true;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveDataCompetenceSF($action,$typeC,$nameC,$signF,$selectedC){
      try {
        $typeC = base64_decode($typeC);
        switch ($action) {
          case 'add':
            $Msg = "Competencia agregada con éxito";
            $q = "INSERT INTO Competencias (Competencia, Significado, TipoCompetencia)
                  	VALUES ('$nameC','$signF','$typeC');";
            break;
          default:
            $Msg = "Competencia editada con éxito";
            $selectedC = base64_decode($selectedC);
            $q = "UPDATE Competencias SET Competencia = '$nameC', Significado = '$signF', TipoCompetencia = '$typeC'
                    WHERE idCompetencias = '$selectedC'";
            break;
        }
        $this->ExecuteQuery($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => $Msg
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getLevelOfTheEvaluatedPerEvaluation($employee, $evaluation){
      try {
        $q = "SELECT NivelEvaluado
              FROM EvaluacionDetalle
              WHERE TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND TO_BASE64(idEvaluaciones) = '$evaluation'";
        $resultado = $this->Select($q);
        if (count($resultado) > 0) {
          return $resultado[0];
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getAllEvaluationDetail($evaluation,$employee){
      try {
        $q = "SELECT RE.Calificacion, C.Competencia, TO_BASE64(RE.idPreguntasEvaluacion) AS IdPregunta,
              TO_BASE64(C.idCompetencias) AS IdCompetencia, PE.idTipoPregunta, TO_BASE64(ED.NoEmpleadoEvalua) AS Evaluator,
              TO_BASE64(RE.idEvaluacionDetalle) AS IdEvDetail
              FROM RespuestaEvaluaciones AS RE
              INNER JOIN PreguntasEvaluacion AS PE ON PE.idPreguntasEvaluacion = RE.idPreguntasEvaluacion
              INNER JOIN Competencias AS C ON C.idCompetencias = PE.idCompetencias
              INNER JOIN EvaluacionDetalle AS ED ON ED.idEvaluacionDetalle = RE.idEvaluacionDetalle
              WHERE TO_BASE64(ED.idEvaluaciones) = '$evaluation' AND TO_BASE64(ED.NoEmpleadoEvaluado) = '$employee' AND StatusEvaluado = 1;";
        $resultado = $this->Select($q);
        if (sizeof($resultado) > 0 ) {
          return $resultado;
        } else {
          return false;
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getListEvaluatorsDetail($employee, $evaluation){
      try {
        $q = "SELECT TO_BASE64(idEvaluacionDetalle) AS IdEvDetail, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua,
              TO_bASE64(NoEmpleadoEvalua) AS EvaluatedBy
              FROM EvaluacionDetalle
              WHERE TO_BASE64(idEvaluaciones) = '$evaluation' AND TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND StatusEvaluado = 1 AND Status = 1;";
        $resultado = $this->Select($q);
        if (count($resultado) > 0) {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
          ];
        } else {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un problema al obtener el detalle de los evaluadores para el empleado seleccionado"
          ];
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getConfigQuestionsEvaluated($evaluation,$employee){
      try {
        $Instlvl = new Evaluaciones();
        $DataLvl = $Instlvl->getLevelOfTheEvaluatedPerEvaluation($employee, $evaluation);
        if (!$DataLvl) {
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al obtener el nivel del empleado evaluado."
          ];
        } else {
          $InstAllEvaluationDet = new Evaluaciones();
          $ResInstDetail = $InstAllEvaluationDet->getAllEvaluationDetail($evaluation, $employee);
          if (!$ResInstDetail) {
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => "Ha ocurrido un problema al obtener el detalle de las evaluaciones del evaluado seleccionado."
            ];
          } else {
            $q = "SELECT TO_BASE64(PC.idPreguntasEvaluacion) AS IdPregunta,
                  PC.RangoInicial, PC.RangoFinal, PC.BoolCorreta, PC.RespuestaEsperadoOM, PC.NivelEmpleadoEsperadoOM,
                  PC.RespuestaCorrectaOM
                  FROM PreguntasConfiguracion AS PC
                  INNER JOIN PreguntasEvaluacion AS PE ON PE.idPreguntasEvaluacion = PC.idPreguntasEvaluacion
                  WHERE TO_BASE64(PE.idEvaluaciones) = '$evaluation';";
            $result = $this->Select($q);
            $Con2 = new Conexiones();
            $qAnswers =  "SELECT PPR.idPreguntasPosiblesRespuestas AS Respuesta, TO_BASE64(PPR.idPreguntasEvaluacion) AS IdPregunta
                          FROM PreguntasPosiblesRespuestas AS PPR
                          INNER JOIN PreguntasEvaluacion AS PE ON PE.idPreguntasEvaluacion = PPR.idPreguntasEvaluacion
                          WHERE TO_BASE64(PE.idEvaluaciones) = '$evaluation';";
            $resAnswers = $Con2->Select($qAnswers);
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => [
                "AllAnswersQuestion" => $resAnswers,
                "ConfigQ" => $result,
                "LvlEmp" => $DataLvl,
                "allEvaluationDetail" => $ResInstDetail
              ],
            ];
          }
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function checkTemporaryDataEvaluation($evaluation, $branchL){
      try {
        $evaluation = base64_decode($evaluation);
        $q = "SELECT COUNT(*) AS ExisteR FROM EvaluacionDetalle WHERE idEvaluaciones = '$evaluation';";
        $resultado = $this->Select($q);
        $Con2 = new Conexiones();
        $InstDetalle = new Evaluaciones();
        if ($resultado[0]["ExisteR"] > 0) {
          $resInst = $InstDetalle->getDetailTempEvaluation($evaluation, $branchL);
          $arrReturn = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Data" => $resInst,
            "Msg" => "Los datos temporales se han obtenido con éxito."
          ];
        } else {
          $insConf = new Evaluaciones();
          $resConf = $insConf->getTypeEvaluationConf($evaluation);
          $resProc = [];
          if ($resConf["TipoOpcionConfiguracion"] == 1) {
            $qInsertaDatos = "CALL sp_AddDatosTemporalesEvaluacionPERZ(?)";
            $resProc = $Con2->ProcedureWithParam($qInsertaDatos, [$evaluation]);
          } else {
            $qInsertaDatos = "CALL sp_AddDatosTemporalesEvaluacion(?)";
            $resProc = $Con2->ProcedureWithParam($qInsertaDatos,array($evaluation));
          }
          if (count($resProc) > 0) {
            $resInst = $InstDetalle->getDetailTempEvaluation($evaluation, $branchL);
            $arrReturn = [
              "Resultado" => true,
              "Siguiente" => true,
              "Data" => $resInst,
              "ConMsg" => true,
              "Msg" => "Se han añadido los registros temporales y posteriormente se han obtenido con éxito."
            ];
          }
        }
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getDetailTempEvaluation($evaluation, $branchL){
      try {
        $addBranch = "";
        foreach ($branchL as $b) {
          $decode = base64_decode($b);
          $addBranch = $addBranch." E.IdSucursal = $decode OR";
        }
        $addBranch = substr($addBranch, 0, -2);
        $q = "SELECT TO_BASE64(idEvaluacionDetalle) AS idEvaluacionDetalle,
              ED.NoEmpleadoEvaluado,
              ED.NoEmpleadoEvalua,
              E.Nombre AS EmpladoEvaluado,
              SD.Sucursal AS SucursalEmpleado,
              E2.Nombre AS EmpladoEvaluador,
              ED.Status, ED.JefeEvalua, ED.ParEvalua, ED.AutoEvalua, ED.SubordinadoEvalua, ED.NivelEvaluado,
              P.Puesto AS PuestoEvaluado,
              TO_BASE64(E.IdSucursal) AS IdSucursalEvaluado
              FROM EvaluacionDetalle AS ED
              INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvaluado
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              INNER JOIN Empleados AS E2 ON E2.NoEmpleado = ED.NoEmpleadoEvalua
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              WHERE idEvaluaciones = '$evaluation' AND ($addBranch) AND AutoEvalua = 0;";
        $res = $this->Select($q);
        return $res;
      } catch (\Exception $e) {
        return $e;
      }
    }

    function updateStatusTempDetEv($newVal, $detEv){
      try {
        $detEv = base64_decode($detEv);
        $q = "UPDATE EvaluacionDetalle SET Status = ?
              WHERE idEvaluacionDetalle = ?;";
        $this->ExecuteQueryWithParam($q,array($newVal, $detEv));
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Se ha actualizado el estado del detalle de la evaluación seleccionado"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addEmpleadoEvaluadorTempData($nidEvaluaciones,$nNoEmpleadoEvalua,$nNoEmpleadoEvaluado,$nTipoEvaluador){
      try {
        $nidEvaluaciones = base64_decode($nidEvaluaciones);
        $q = "CALL spAddEvaluador('$nidEvaluaciones','$nNoEmpleadoEvalua','$nNoEmpleadoEvaluado','$nTipoEvaluador')";
        $resultado = $this->Procedure($q,array());
        if (sizeof($resultado) > 0) {
          $valProc = $resultado[0]["Retorno"];
          $msgProc = $resultado[0]["MsgRetorno"];
          $IdGenerado = $resultado[0]["IdGenerado"];
          if ($valProc == 1) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "ConMsg" => true,
              "Msg" => $msgProc,
              "Data" => $resultado[0]
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false,
              "ConMsg" => true,
              "Msg" => $msgProc
            ];
          }
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Ha ocurrido un error al agregar un nuevo evaluador."
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function deleteEvaluatorDetail($evDetail){
      try {
        $evDetail = base64_decode($evDetail);
        $q = "CALL sp_EliminaEvaluadorDetalle(?)";
        $this->ProcedureWithParam($q,array($evDetail));
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Detalle eliminado."
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function acceptPublicationOfTheEvaluation($ev){
      try {
        // El SP puede tardar >10s, asegurar que PHP no corte la ejecución
        set_time_limit(120);
        
        $evDecoded = base64_decode($ev);
        
        // Verificar que la evaluación no esté ya activada
        $check = $this->SelectNotClose("SELECT Activado, PreguntasAceptadas FROM Evaluaciones WHERE idEvaluaciones = '$evDecoded'");
        if (count($check) === 0) {
          return json_encode([
            "Resultado" => false,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "La evaluación no fue encontrada."
          ]);
        }
        if ($check[0]['Activado'] == 1) {
          return json_encode([
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Msg" => "La evaluación ya se encuentra activada."
          ]);
        }
        if ($check[0]['PreguntasAceptadas'] != 1) {
          return json_encode([
            "Resultado" => false,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Las preguntas de la evaluación aún no han sido aceptadas."
          ]);
        }

        // Si es una Encuesta Normal (Tipo 2), autogenerar EvaluacionDetalle
        $evalInfo = $this->SelectNotClose("SELECT TipoEvaluacion, EmpleadosParticipantes FROM Evaluaciones WHERE idEvaluaciones = '$evDecoded'");
        if (count($evalInfo) > 0 && $evalInfo[0]['TipoEvaluacion'] == 2) {
          $participantesStr = $evalInfo[0]['EmpleadosParticipantes'];
          if (!empty($participantesStr)) {
            $participantes = explode(',', $participantesStr);
            foreach($participantes as $part) {
              $part = trim($part);
              if ($part != '') {
                // Verificar si ya existe el detalle
                $exists = $this->SelectNotClose("SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = '$evDecoded' AND NoEmpleadoEvaluado = '$part'");
                if (count($exists) == 0) {
                  // Obtener Puesto y Nivel del empleado
                  $empInfo = $this->SelectNotClose("SELECT IdPuesto, Nivel FROM Empleados WHERE NoEmpleado = '$part'");
                  if (count($empInfo) > 0) {
                    $puesto = empty($empInfo[0]['IdPuesto']) ? 'NULL' : $empInfo[0]['IdPuesto'];
                    $nivel = empty($empInfo[0]['Nivel']) ? 'NULL' : $empInfo[0]['Nivel'];
                    
                    // Asegurar que nulls en BD no truenen la consulta
                    if ($puesto === 'NULL' || $puesto === '') $puesto = 'NULL'; else $puesto = "'$puesto'";
                    if ($nivel === 'NULL' || $nivel === '') $nivel = 'NULL'; else $nivel = "'$nivel'";

                    $insQuery = "INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) 
                                 VALUES ('$evDecoded', '$part', '$part', 1, 0, 0, 0, 1, 0, $nivel, $puesto)";
                    $this->ProcedureExec($insQuery, array());
                  }
                }
              }
            }
          }
        }

        $q = "CALL sp_PublicarEvaluacion(?)";
        $spResult = $this->ProcedureExec($q, array($evDecoded));
        
        if ($spResult === false) {
          return json_encode([
            "Resultado" => false,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => "Error al ejecutar el procedimiento de publicación."
          ]);
        }

        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "La evaluación ha sido activada."
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        error_log("Error en acceptPublicationOfTheEvaluation: " . $e->getMessage());
        return json_encode([
          "Resultado" => false,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Error al publicar la evaluación: " . $e->getMessage()
        ]);
      }
    }

    function acceptQuestionsEv($iEvaluation){
      try {
        $iEvaluation = base64_decode($iEvaluation);
        $q = "UPDATE Evaluaciones SET PreguntasAceptadas = 1
              WHERE idEvaluaciones = ?;";
        $this->ExecuteQueryWithParam($q,array($iEvaluation));
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Nsg" => "Se han aceptado las preguntas para la evaluación seleccionada."
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function deleteAllDetailPerBranch($branch, $ev){
      try {
        $branch = base64_decode($branch);
        $ev = base64_decode($ev);
        $q = "CALL sp_eliminarDetalleEvaluadoresSucursal(?,?)";
        $this->ExecuteQueryWithParam($q,array($ev, $branch));
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => "¡Evaluadores eliminados!"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getInitialConfigEvaluation($ev){
      try {
        $q = "SELECT
                  TipoSeleccionaSucursal,
                  TipoOpcionConfiguracion
              FROM Evaluaciones
              WHERE idEvaluaciones = ?;";
        $res = $this->ExecuteQueryWithParam($q, [$ev]);
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res[0]
        ]);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function saveConfigEvaluationBr($typeOption, $branchSel, $typeSelBranch, $ev){
      try {
        $cantBranchSel = 0;
        if ($branchSel != null) {
          $cantBranchSel = count($branchSel);
        }
        if ($typeOption == 1) {
          if ($typeSelBranch == 1) {
            if ($cantBranchSel > 0) {
              $insAddBranchS = new Evaluaciones();
              $resAddB = $insAddBranchS->addBranchesSelectedForEvaluation($branchSel, $ev);
            } else {
              return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "Msg" => "Ingrese al menos una sucursal para la evaluación."
              ]);
            }
          } else if ($typeSelBranch == 2) {
            if ($cantBranchSel > 0) {
              $instCantBranch = new Evaluaciones();
              $resCantB = $instCantBranch->getCantBranchInSystem();
              if ($cantBranchSel == $resCantB) {
                return json_encode([
                  "Resultado" => true,
                  "Siguiente" => false,
                  "Msg" => "No es posible excluir todas las sucursales disponibles."
                ]);
              } else {
                $insAddBranchS = new Evaluaciones();
                $resAddB = $insAddBranchS->addBranchesSelectedForEvaluation($branchSel, $ev);
              }
            } else {
              return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "Msg" => "Por favor, seleccione al menos una sucursal para excluir."
              ]);
            }
          }
        }
        $q = "UPDATE Evaluaciones SET TipoSeleccionaSucursal = ?, TipoOpcionConfiguracion = ?
              WHERE idEvaluaciones = ?;";
        $this->ExecuteQueryWithParam($q, [$typeSelBranch, $typeOption, $ev]);
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Msg" => "Se ha concluido la configuración de las sucursales."
        ]);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getTypeEvaluationConf($ev){
      try {
        $q = "SELECT
              	TipoOpcionConfiguracion, TipoSeleccionaSucursal
              FROM Evaluaciones
              WHERE idEvaluaciones = ?;";
        $res = $this->ExecuteQueryWithParam($q, [$ev]);
        return $res[0];
      } catch (\Exception $e) {
        return $e;
      }
    }
    
    function getListBranchInEvaluation($ev){
      try {
        $res = [];
        $insConf = new Evaluaciones();
        $resConf = $insConf->getTypeEvaluationConf($ev);
        if ($resConf["TipoOpcionConfiguracion"] == 1) {
          if ($resConf["TipoSeleccionaSucursal"] == 1) {
            $q = "SELECT
                  	  SD.IdSucursal,
                      SD.Sucursal
                  FROM ConfiguracionInicialEvaluacion  AS CIE
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = CIE.IdSucursal
                  WHERE CIE.idEvaluaciones = ?
                  ORDER BY SD.Sucursal ASC;";
            $res = $this->ExecuteQueryWithParam($q, [$ev]);
          } else {
            $q = "SELECT
                  	SD.IdSucursal,
                  	SD.Sucursal
                  FROM SucursalDepto AS SD
                  WHERE SD.IdSucursal NOT IN (
                  	SELECT
                  		IdSucursal
                      FROM ConfiguracionInicialEvaluacion
                      WHERE idEvaluaciones = ?
                  );";
            $res = $this->ExecuteQueryWithParam($q, [$ev]);
          }

        } else {
          $q = "SELECT
                    SD.IdSucursal,
                    SD.Sucursal
                FROM Empleados AS E
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE E.Status = 1 AND E.IdSucursal <> 0
                GROUP BY SD.IdSucursal
                ORDER BY Sucursal ASC;";
          $res = $this->Select($q);
        }
        $cant = count($res);
        if ($cant > 0) {
          for ($i=0; $i < $cant ; $i++) {
            $res[$i]["IdSucursal"] = base64_encode($res[$i]["IdSucursal"]);
          }
        }
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ]);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getListBranchNewEv(){
      try {
        $q = "SELECT
                  SD.IdSucursal,
                  Sucursal
              FROM SucursalDepto AS SD
              INNER JOIN Empleados AS E ON E.IdSucursal = SD.IdSucursal
              GROUP BY SD.IdSucursal
              ORDER BY SD.Sucursal ASC;";
        $res = $this->Select($q);
        $cantRes = count($res);
        if ($cantRes > 0) {
          for ($i=0; $i < $cantRes ; $i++) {
            $res[$i]["IdSucursal"] = base64_encode($res[$i]["IdSucursal"]);
          }
        }
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ]);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function addBranchesSelectedForEvaluation($listBranch, $evaluation) {
      try {
        $cantD = count($listBranch);
        for ($i=0; $i < $cantD ; $i++) {
          $con = new Conexiones();
          $q = "INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (?,?);";
          $con->ExecuteQueryWithParam($q, [base64_decode($listBranch[$i]), $evaluation]);
        }
        return 1;
      } catch (\Exception $e) {
        return $e;
      }
    }

    // Funciones para selección de participantes
    function getDivisionesEvaluacion() {
      try {
        $q = "SELECT IdDivision, Division FROM Divisiones ORDER BY Division ASC;";
        $res = $this->Select($q);
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ]);
      } catch (\Exception $e) {
        return json_encode([
          "Resultado" => false,
          "Mensaje" => $e->getMessage()
        ]);
      }
    }

    function getSucursalesXDivisionEvaluacion($IdDivision) {
      try {
        if ($IdDivision == "" || $IdDivision == null) {
          $q = "SELECT IdSucursal, Sucursal FROM SucursalDepto ORDER BY Sucursal ASC;";
          $res = $this->Select($q);
        } else {
          $q = "SELECT IdSucursal, Sucursal FROM SucursalDepto WHERE IdDivision = ? ORDER BY Sucursal ASC;";
          $res = $this->ExecuteQueryWithParam($q, [$IdDivision]);
        }
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ]);
      } catch (\Exception $e) {
        return json_encode([
          "Resultado" => false,
          "Mensaje" => $e->getMessage()
        ]);
      }
    }

    function getPuestosEvaluacion() {
      try {
        $q = "SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC;";
        $res = $this->Select($q);
        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ]);
      } catch (\Exception $e) {
        return json_encode([
          "Resultado" => false,
          "Mensaje" => $e->getMessage()
        ]);
      }
    }

    function getEmpleadosParaEvaluacion($IdDivision = "", $IdSucursal = "", $IdPuesto = "") {
      try {
        $where = "WHERE E.Status = 1";
        $params = [];
        
        if ($IdDivision != "" && $IdDivision != null) {
          $where .= " AND E.IdDivision = ?";
          $params[] = $IdDivision;
        }
        if ($IdSucursal != "" && $IdSucursal != null) {
          $where .= " AND E.IdSucursal = ?";
          $params[] = $IdSucursal;
        }
        if ($IdPuesto != "" && $IdPuesto != null) {
          $where .= " AND E.IdPuesto = ?";
          $params[] = $IdPuesto;
        }

        $q = "SELECT 
                E.NoEmpleado, 
                E.Nombre,
                P.Puesto,
                D.Division,
                SD.Sucursal
              FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              $where
              ORDER BY E.Nombre ASC;";
        
        if (count($params) > 0) {
          $res = $this->ExecuteQueryWithParam($q, $params);
        } else {
          $res = $this->Select($q);
        }

        return json_encode([
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $res
        ]);
      } catch (\Exception $e) {
        return json_encode([
          "Resultado" => false,
          "Mensaje" => $e->getMessage()
        ]);
      }
    }

  }

 ?>
