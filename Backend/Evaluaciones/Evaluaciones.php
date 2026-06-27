<?php

if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
} else {
    if (file_exists("./Conexiones/Conexiones.php")) {
        require_once("./Conexiones/Conexiones.php");
    } elseif (file_exists("../Conexiones/Conexiones.php")) {
        require_once("../Conexiones/Conexiones.php");
    } elseif (file_exists("../../Conexiones/Conexiones.php")) {
        require_once("../../Conexiones/Conexiones.php");
    } elseif (file_exists("././Backend/Conexiones/Conexiones.php")) {
        require_once("././Backend/Conexiones/Conexiones.php");
    }
}

// Cargar SessionManager
if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
} elseif (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
}
class Evaluaciones extends Conexiones
{
    public function getEvaluacionesDisponibles()
    {
        try {
            $q = "SELECT TO_BASE64(idEvaluaciones) AS idEvaluaciones,Titulo,FechaInicio,FechaFin
              FROM Evaluaciones
              WHERE DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN FechaInicio AND FechaFin AND  Status = 1 AND Activado = 1 AND DirigidoA = 1 ;";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                $arrDatos = [];
                foreach ($resultado as $Evaluacion) {
                    $IdEval = $Evaluacion["idEvaluaciones"];
                    $InstDetalle = new Evaluaciones();
                    $DetalleEv = $InstDetalle->getEvaluadosEvaluacion($IdEval);

                    if (sizeof($DetalleEv) > 0) {
                        array_push($arrDatos, [
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

    public function getEvaluadosEvaluacion($IdEval)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "SELECT E.Nombre,TO_BASE64(EV.idEvaluacionDetalle) AS idEvDetalle,IF(EV.StatusEvaluado = 1,'Realizada','Pendiente') AS StatusRealizado,
              	EV.StatusEvaluado,TO_BASE64(EV.idEvaluaciones) AS idEvaluaciones,
              IF(EV.JefeEvalua = 1 ,'Subordinado',IF(EV.ParEvalua = 1,'Empleado Par', IF(EV.AutoEvalua = 1,'Auto Evaluación','Jefe'))) AS RelacionEvaluado,
              CONCAT((SELECT COUNT(*) FROM RespuestaEvaluaciones WHERE idEvaluacionDetalle = EV.idEvaluacionDetalle AND Calificacion IS NOT NULL),'/',(SELECT COUNT(*) FROM RespuestaEvaluaciones WHERE idEvaluacionDetalle = EV.idEvaluacionDetalle)) AS Respondidas
              FROM EvaluacionDetalle AS EV
              INNER JOIN Empleados AS E ON E.NoEmpleado = EV.NoEmpleadoEvaluado
              WHERE EV.Status = 1 AND NoEmpleadoEvalua = '$NoEmpleado' AND TO_BASE64(EV.idEvaluaciones) = '$IdEval';";
            $resultado = $this->Select($q, array());

            return $resultado;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getColaboradoresOrganigrama()
    {
        $IdDivision = SessionManager::get("IdDivision");
        $IdSucursal = SessionManager::get("IdSucursal");
        $q = "SELECT EM.Nombre,EM.Email,P.Puesto,EM.Nivel,EM.NoEmpleado FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE EM.IdSucursal = '$IdSucursal'
          ORDER BY EM.Nivel;";

        return $this->Select($q, array());
    }

    public function getDetalleEvaluacion()
    {
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
        array_push($retorno, $datos);

        return json_encode($retorno);
    }

    public function getCompetencias()
    {
        $q = "SELECT C.TipoCompetencia,C.idCompetencias,C.Competencia,C.Significado,C.A,C.B,C.C,C.D,C.E,TP.Descripcion FROM Competencias AS C
            INNER JOIN TipoCompetencias AS TP ON TP.idTipoCompetencias = C.TipoCompetencia
            ORDER BY C.TipoCompetencia,C.Competencia;";

        return $this->Select($q, array());
    }

    public function respondeEvaluacion($idEvaluaciones, $NoEmpleadoEvaluado, $idCompetencias, $NoEmpleado, $Comentarios, $Calificacion)
    {
        $contenidoValue = "";
        $NoEmpleado = SessionManager::get("NoEmpleado");
        for ($i = 0; $i < sizeof($NoEmpleadoEvaluado); $i++) {
            $contenidoValue .= "($idEvaluaciones,$NoEmpleadoEvaluado[$i],$idCompetencias[$i],$NoEmpleado,now(),'$Comentarios[$i]','$Calificacion[$i]'),";
        }
        $contenidoValue = rtrim($contenidoValue, ",");

        try {
            $Conexiones2 = new Conexiones();
            $q = "INSERT INTO RespuestaEvaluaciones (idEvaluaciones,NoEmpleadoEvaluado,idCompetencias,NoEmpleado,Registro,Comentarios,Calificacion)
  		        VALUES $contenidoValue;";
            $this->ExecuteQuery($q, array());
            $q2 = "INSERT INTO DetalleEvaluacionesRespondidas (idEvaluaciones,NoEmpleado,Registro)
			         VALUES ($idEvaluaciones,$NoEmpleado,now());";
            $Conexiones2->ExecuteQuery($q2, array());

            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    public function getEvaluaciones()
    {
        $q = "SELECT EV.*,
                CASE WHEN EV.TipoEvaluacion = 1 THEN '360°' ELSE 'Normal' END AS TxTipoEvaluacion,
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1) AS CantEvaluadores,
                (SELECT COUNT(*) FROM EvaluacionDetalle WHERE idEvaluaciones = EV.idEvaluaciones AND Status = 1 AND StatusEvaluado = 1) AS CantRespondidas
              FROM Evaluaciones AS EV";

        return json_encode($this->Select($q, array()));
    }

    public function deleteEvaluacion($idEvaluaciones)
    {
        try {
            $idEvaluaciones = base64_decode($idEvaluaciones);
            $q = "DELETE FROM Evaluaciones WHERE idEvaluaciones = '$idEvaluaciones';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    public function updateStatusEvaluacion($Status, $idEvaluaciones)
    {
        try {
            $idEvaluaciones = base64_decode($idEvaluaciones);
            $q = "UPDATE Evaluaciones SET Status = '$Status' WHERE idEvaluaciones = '$idEvaluaciones';";
            $this->ExecuteQuery($q, array());

            // Notificar empleados al activar
            if ($Status === '1') {
                try {
                    require_once(__DIR__ . '/../Notifications/Notifications.php');
                    $info = $this->SelectNotClose(
                        "SELECT Titulo, EmpleadosParticipantes FROM Evaluaciones WHERE idEvaluaciones = '$idEvaluaciones'"
                    );
                    if (!empty($info)) {
                        $titulo = $info[0]['Titulo'] ?? 'Evaluación';
                        $participantes = array_filter(array_map('trim', explode(',', $info[0]['EmpleadosParticipantes'] ?? '')));
                        $notifService = new Notifications();
                        foreach ($participantes as $noEmpleado) {
                            $notifService->insertNotification(
                                $noEmpleado,
                                'evaluation',
                                'Evaluación pendiente',
                                "Tienes una evaluación pendiente: $titulo",
                                'pending-evaluations.php',
                                (int) $idEvaluaciones,
                                'Evaluaciones'
                            );
                        }
                    }
                } catch (\Exception $notifEx) {
                    error_log('[updateStatusEvaluacion] Notif error: ' . $notifEx->getMessage());
                }
            }

            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    public function addEsperaEvaluacion($dataEvaluation)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "DELETE FROM EsperaNuevaEvaluacion WHERE NoEmpleadoRegistra = '$NoEmpleado'";
            $this->ExecuteQuery($q, array());
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
            $Con2->ExecuteQuery($q2, array());

            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }
    public function addEvaluacion($Titulo, $FechaInicio, $FechaFin, $dataEvaluation, $inpRetroFechaIni, $inpRetroFechaFin, $inpPlanAFechaIni, $inpPlanAFechaFin)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $InstEspera = new Evaluaciones();
            $ResultEspera = $InstEspera->addEsperaEvaluacion($dataEvaluation);
            if ($ResultEspera) {
                $q = "CALL spAddEvaluacion('$Titulo','$FechaInicio','$FechaFin','$NoEmpleado','$inpRetroFechaIni','$inpRetroFechaFin','$inpPlanAFechaIni','$inpPlanAFechaFin')";
                $resultado = $this->Procedure($q, array());
                if (sizeof($resultado) > 0) {
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

    public function getEstadisticasEvaluacion($idEvaluaciones)
    {
        $q = "SELECT E.Nombre,C.Competencia,
            (((5 * coalesce(count(RE.NoEmpleadoEvaluado),0)) + coalesce(sum(Calificacion),0))) / coalesce(count(RE.NoEmpleadoEvaluado),0) AS Calificacion,RE.NoEmpleadoEvaluado
            FROM Empleados AS E INNER JOIN RespuestaEvaluaciones AS RE ON RE.NoEmpleadoEvaluado = E.NoEmpleado
            LEFT JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
            WHERE RE.idEvaluaciones = '$idEvaluaciones'
            GROUP BY E.Nombre,C.Competencia;";

        return json_encode($this->Select($q, array()));
    }

    public function getEvaluacionesRespondidas()
    {
        $q = "SELECT idEvaluaciones,Titulo FROM Evaluaciones
            WHERE idEvaluaciones IN (SELECT idEvaluaciones FROM RespuestaEvaluaciones);";

        return json_encode($this->Select($q, array()));
    }

    public function getListCompetencias($typeCompetence)
    {
        try {
            // Definir $CompWhere para filtrar por tipo de competencia
            if ($typeCompetence != "") {
                $CompWhere = "WHERE TO_BASE64(TipoCompetencia) = '$typeCompetence'";
            } else {
                $CompWhere = "";
            }
            $q = "SELECT C.Competencia, TC.Descripcion AS Tipo, IF(C.Estatus = 0,'Inactivo','Activo') AS StatusCom,
              TO_BASE64(C.idCompetencias) AS idCompetencia
              FROM Competencias AS C
              INNER JOIN TipoCompetencias AS TC ON TC.idTipoCompetencias = C.TipoCompetencia
              $CompWhere;";
            $resultado = $this->Select($q, array());
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

    public function gettypesOfCompetencies()
    {
        try {
            $q = "SELECT TO_BASE64(idTipoCompetencias) AS idTipoCompetencias, Descripcion
              FROM TipoCompetencias
              WHERE Estatus = 1;";
            $resultado = $this->Select($q, array());
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

    public function changeStatusCompetence($competence)
    {
        try {
            $competence = base64_decode($competence);
            $q = "SELECT Estatus FROM Competencias WHERE idCompetencias = '$competence'";
            $resQ = $this->Select($q, array());
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

    public function viewDataCompetenceSF($idCompetence)
    {
        try {
            $q = "SELECT TO_BASE64(idCompetencias) AS idCompetence, Competencia,Significado,to_base64(TipoCompetencia) AS TipoCompetencia
              FROM Competencias
              WHERE TO_BASE64(idCompetencias) = '$idCompetence';";
            $resQ = $this->Select($q);
            if (sizeof($resQ) > 0) {
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

    public function saveCompetencies($action, $type, $competence, $significate, $val_a, $val_b, $val_c, $val_d, $val_e, $idCompetence)
    {
        try {
            $type = base64_decode($type);
            if ($action == "create") {
                $MsgR = "¡Competencia registrada con éxito!";
                $q = "CALL spNuevaCompetencia('$competence','$significate','$type','$val_a','$val_b','$val_c','$val_d','$val_e')";
            } elseif ($action == "update") {
                $MsgR = "¡Competencia actualizada con éxito!";
                $q = "UPDATE Competencias SET Competencia = '$competence', Significado = '$significate', TipoCompetencia = '$type', A = '$val_a',
                	B = '$val_b', C = '$val_c', D = '$val_d', E = '$val_e'
                    WHERE TO_BASE64(idCompetencias) = '$idCompetence';";
            }
            $resultado = $this->Procedure($q, array());
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

    public function saveLevelsCompetence($allLevels, $competence, $typeAction)
    {
        try {
            $msgReturn = "";
            $competence = base64_decode($competence);
            if ($typeAction == "create") {
                $msgReturn = "Se han registrado los niveles seleccionados a la nueva competencia.";
                $values = "";
                foreach ($allLevels as $level) {
                    $values = $values . "('$competence','$level[_nivel]','$level[_esperado]'),";
                }
                $valuesFormat = substr($values, 0, -1);
                $q = "INSERT INTO DetalleCompetencias (idCompetencias,NivelEmpleado,CalificacionEsperado) VALUES $valuesFormat";
            } else {
                $InstDelete = new Evaluaciones();
                $ResultInstD = $InstDelete->deleteLevelsCompetence($competence);
                if ($ResultInstD) {
                    $msgReturn = "Se han actualizado los niveles seleccionados a la competencia seleccionada.";
                    $values = "";
                    foreach ($allLevels as $level) {
                        $values = $values . "('$competence','$level[_nivel]','$level[_esperado]'),";
                    }
                    $valuesFormat = substr($values, 0, -1);
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
            $this->ExecuteQuery($q, array());
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

    public function deleteLevelsCompetence($idCompetencias)
    {
        try {
            $q = "DELETE FROM DetalleCompetencias
                WHERE idCompetencias = '$idCompetencias';";
            $this->ExecuteQuery($q, array());

            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getDetailCompetence($idComp)
    {
        try {
            $q = "SELECT NivelEmpleado,CalificacionEsperado
              FROM  DetalleCompetencias
              WHERE TO_BASE64(idCompetencias) = '$idComp';";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                return $resultado;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function viewDataCompetence($idCompetence)
    {
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
                $resultado = $this->Select($q, array());
                if (sizeof($resultado) > 0) {
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

    public function getDetalleEvaluacionSel($idEvaluacionDetalle)
    {
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
            $res = $this->Select($q, array());
            if (sizeof($res) > 0) {
                for ($i = 0; $i < count($res); $i++) {
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

    public function getAnswersPerQuestion($question)
    {
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

    public function getConfigTypeRange($question)
    {
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

    public function getCompetenciasEvaluacion($idEvaluacionDetalle)
    {
        try {
            $q = "SELECT C.Competencia,C.Significado,C.A,C.B,C.C,C.D,C.E,TO_BASE64(C.idCompetencias) AS idCompetencias
              FROM RespuestaEvaluaciones AS RE
              INNER JOIN Competencias AS C ON C.idCompetencias = RE.idCompetencias
              WHERE to_base64(RE.idEvaluacionDetalle) = '$idEvaluacionDetalle';";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                return $resultado;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getGeneralEvaluacionSel($idEvaluacionDetalle)
    {
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
            $resultado = $this->Select($q, array());
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
                    "Msg" => "Ha ocurrido un error al obtener los datos generales de la evaluación, inténtelo de nuevo más tarde."
                ];
            }

            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function saveResultCompetence($value, $response, $Comentarios)
    {
        try {
            $q = "UPDATE RespuestaEvaluaciones SET Calificacion = '$value', Comentarios = '$Comentarios'
              WHERE TO_BASE64(idRespuestaEvaluaciones) = '$response';";
            $this->ExecuteQuery($q, array());

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function validateResultsEvaluation($idEvaluacionDetalle)
    {
        try {
            $q = "SELECT IF(COUNT(*) < 2, 1, 0) AS Validando FROM RespuestaEvaluaciones
              WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle' AND (Calificacion IS NULL OR Calificacion = '');";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
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

    public function finishEvaluation($nidEvaluacionDetalle, $nidRespuestaEvaluaciones, $nCalificacion, $nComentarios)
    {
        try {
            $nidEvaluacionDetalle = base64_decode($nidEvaluacionDetalle);
            $nidRespuestaEvaluaciones = base64_decode($nidRespuestaEvaluaciones);
            $q = "CALL spFinalizaEvaluacion('$nidEvaluacionDetalle','$nidRespuestaEvaluaciones','$nCalificacion','$nComentarios')";
            $resultado = $this->Procedure($q, array());
            if (sizeof($resultado) > 0) {
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

    public function getEmpleadosEvaluadosPorEv($idEvaluaciones)
    {
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
            $resultado = $this->Select($q, array());
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

    public function getEvaluatedBy($evaluation, $employee)
    {
        try {
            $q = "SELECT E.Nombre AS Empleado, TO_BASE64(idEvaluacionDetalle) AS IdDetalle
              FROM EvaluacionDetalle AS ED
              INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvalua
              WHERE TO_BASE64(ED.idEvaluaciones) = '$evaluation' AND ED.StatusEvaluado = 1
                AND TO_BASE64(ED.NoEmpleadoEvaluado) = '$employee';";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
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

    public function getEvaluationDetail($idEvaluated)
    {
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
                $resultado = $this->Select($q, array());
                if (sizeof($resultado) > 0) {
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

    public function getLevelOfTheEvaluated($idEvaluated)
    {
        try {
            $q = "SELECT NivelEvaluado
              FROM EvaluacionDetalle
              WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluated';";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                return $resultado[0];
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getDataEmployeeGeneral($employee, $evaluation)
    {
        try {
            $q = "SELECT E.Nombre,E.NoEmpleado,ED.NivelEvaluado,P.Puesto,EV.TipoEvaluacion,
              CASE WHEN EV.TipoEvaluacion = 1 THEN '360°' ELSE 'Encuesta Normal' END AS TxTipoEvaluacion,
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
              INNER JOIN Evaluaciones AS EV ON EV.idEvaluaciones = ED.idEvaluaciones
              WHERE TO_BASE64(NoEmpleado) = '$employee'
              GROUP BY E.Nombre;";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                return $resultado[0];
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }
    public function getGeneralDetailEvaluated($employee, $evaluation)
    {
        try {
            $InstDataEmployee = new Evaluaciones();
            $DataEmployee = $InstDataEmployee->getDataEmployeeGeneral($employee, $evaluation);
            if (!$DataEmployee) {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al obtener los registros generales del empleado seleccionado."
                ];
            } else {
                $Instlvl = new Evaluaciones();
                $DataLvl = $Instlvl->getLevelOfTheEvaluatedGeneral($employee, $evaluation);
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
                    $resultado = $this->Select($q, array());
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

    public function getLevelOfTheEvaluatedGeneral($employee, $evaluation)
    {
        try {
            $q = "SELECT NivelEvaluado
              FROM EvaluacionDetalle
              WHERE TO_BASE64(NoEmpleadoEvaluado) = '$employee' AND TO_BASE64(idEvaluaciones) = '$evaluation';";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                return $resultado[0];
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getDetailEvaluation($evaluation)
    {
        try {
            $q = "SELECT Titulo
              FROM Evaluaciones
              WHERE TO_BASE64(idEvaluaciones) = '$evaluation';";
            $resultado = $this->Select($q, array());
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

    public function listEvaluados($idEvaluaciones)
    {
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
            $resultado = $this->Select($q, array());
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

    public function getlist_evaluadores($NoEmpleado, $Evaluacion)
    {
        try {
            $q = "SELECT TO_BASE64(ED.idEvaluacionDetalle) AS idEvaluacionDetalle, E.Nombre, ED.StatusEvaluado,
                IF(ED.JefeEvalua = 1,'JEFE',IF(ED.ParEvalua = 1,'PAR', IF(ED.AutoEvalua = 1,'AUTO','SUBORDINADO'))) AS TipoEvaluador,
                IF(ED.StatusEvaluado = 1,0,IF(ED.AutoEvalua = 1,0,1)) AS StatusEvaluacion
                FROM EvaluacionDetalle AS ED
                INNER JOIN Empleados AS E ON E.NoEmpleado = ED.NoEmpleadoEvalua
                WHERE TO_BASE64(ED.NoEmpleadoEvaluado) = '$NoEmpleado' AND TO_BASE64(ED.idEvaluaciones) = '$Evaluacion' AND ED.Status = 1;";
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
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

    public function getGeneralInfoEvaluacion($idEvaluaciones)
    {
        try {
            $q = "SELECT Titulo FROM Evaluaciones WHERE TO_BASE64(idEvaluaciones) = '$idEvaluaciones';";
            $resultado = $this->Select($q, array());
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

    public function deleteEvaluador($idEvaluacionDetalle)
    {
        try {
            $q = "UPDATE EvaluacionDetalle SET Status = 0 WHERE TO_BASE64(idEvaluacionDetalle) = '$idEvaluacionDetalle'";
            $this->ExecuteQuery($q, array());
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

    public function addEmpleadoEvaluador($nidEvaluaciones, $nNoEmpleadoEvalua, $nNoEmpleadoEvaluado, $nTipoEvaluador)
    {
        try {
            $nidEvaluaciones = base64_decode($nidEvaluaciones);
            $nNoEmpleadoEvalua = base64_decode($nNoEmpleadoEvalua);
            $nNoEmpleadoEvaluado = base64_decode($nNoEmpleadoEvaluado);
            $q = "CALL spAddEvaluador('$nidEvaluaciones','$nNoEmpleadoEvalua','$nNoEmpleadoEvaluado','$nTipoEvaluador')";
            $resultado = $this->Procedure($q, array());
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

    public function viewUnfinishedEmployees($evaluation)
    {
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
            $resultado = $this->Select($q, array());
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

    public function getAllDataEmployeeGeneral()
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "SELECT EV.Titulo AS NameEvaluacion,E.Nombre,E.NoEmpleado,ED.NivelEvaluado,P.Puesto,EV.TipoEvaluacion,
              CASE WHEN EV.TipoEvaluacion = 1 THEN '360°' ELSE 'Evaluación Normal' END AS TxTipoEvaluacion,
              TO_BASE64(ED.idEvaluaciones) AS idEvaluaciones,
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
              IF(UNIX_TIMESTAMP(NOW()) < UNIX_TIMESTAMP(EV.RetroFechaIni),CONCAT('Retroalimentación disponible desde el ',DATE_FORMAT(EV.RetroFechaIni,'%d-%m-%Y'),' al ',DATE_FORMAT(EV.RetroFechaFin,'%d-%m-%Y')),
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
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                return $resultado;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getAllGeneralDataPerEmployeeFinal()
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $NoEmpleadoB64 = base64_encode($NoEmpleado);
            $InstInitialEv = new Evaluaciones();
            $ResInstInitialEv = $InstInitialEv->getAllDataEmployeeGeneral();

            if (is_array($ResInstInitialEv)) {
                foreach ($ResInstInitialEv as $key => $row) {
                    $isNormal = isset($row['TipoEvaluacion']) && (int) $row['TipoEvaluacion'] !== 1;
                    $isComplete = isset($row['CantMisEvaluadores']) && isset($row['CantMisEvaluadoresF'])
                        && (int) $row['CantMisEvaluadoresF'] === (int) $row['CantMisEvaluadores'];

                    if ($isNormal && $isComplete) {
                        $evId = $row['idEvaluaciones'];
                        $grupo = isset($row['GrupoEvaluado']) ? $row['GrupoEvaluado'] : 'A';
                        $summary = $InstInitialEv->getSummaryNormalEvaluation($evId, $NoEmpleadoB64, $grupo);
                        if ($summary !== null) {
                            $ResInstInitialEv[$key]['CalificacionFinal'] = $summary['CalificacionFinal'];
                            $ResInstInitialEv[$key]['TotalCompetencias'] = $summary['TotalCompetencias'];
                            $ResInstInitialEv[$key]['FortalezasCount'] = $summary['FortalezasCount'];
                            $ResInstInitialEv[$key]['DebilidadesCount'] = $summary['DebilidadesCount'];
                            $ResInstInitialEv[$key]['CompetenciasDetalle'] = $summary['CompetenciasDetalle'];
                        }
                    }
                }
            }

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

    public function getSummaryNormalEvaluation($evaluationB64, $employeeB64, $grupoEvaluado = 'A')
    {
        try {
            // 1. Nivel del evaluado
            $lvlData = $this->getLevelOfTheEvaluatedPerEvaluation($employeeB64, $evaluationB64);
            $lvlEvaluated = $lvlData && isset($lvlData['NivelEvaluado']) ? $lvlData['NivelEvaluado'] : null;
            if ($lvlEvaluated === null) {
                return null;
            }

            // 2. Respuestas de todos los evaluadores
            $allDetail = $this->getAllEvaluationDetail($evaluationB64, $employeeB64);
            if (!$allDetail || !is_array($allDetail) || count($allDetail) === 0) {
                return null;
            }

            // 3. Configuración de preguntas
            $qConfig = "SELECT TO_BASE64(PC.idPreguntasEvaluacion) AS IdPregunta,
                  PC.RangoInicial, PC.RangoFinal, PC.BoolCorreta, PC.RespuestaEsperadoOM, PC.NivelEmpleadoEsperadoOM,
                  PC.RespuestaCorrectaOM
                  FROM PreguntasConfiguracion AS PC
                  INNER JOIN PreguntasEvaluacion AS PE ON PE.idPreguntasEvaluacion = PC.idPreguntasEvaluacion
                  WHERE TO_BASE64(PE.idEvaluaciones) = '{$evaluationB64}';";
            $arrConfig = $this->Select($qConfig);

            // 4. Respuestas posibles
            $Con2 = new Conexiones();
            $qAnswers = "SELECT PPR.idPreguntasPosiblesRespuestas AS Respuesta, TO_BASE64(PPR.idPreguntasEvaluacion) AS IdPregunta
                  FROM PreguntasPosiblesRespuestas AS PPR
                  INNER JOIN PreguntasEvaluacion AS PE ON PE.idPreguntasEvaluacion = PPR.idPreguntasEvaluacion
                  WHERE TO_BASE64(PE.idEvaluaciones) = '{$evaluationB64}';";
            $arrAnswersQuestion = $Con2->Select($qAnswers);

            // 5. Evaluadores
            $qEvaluators = "SELECT TO_BASE64(idEvaluacionDetalle) AS IdEvDetail
                  FROM EvaluacionDetalle
                  WHERE TO_BASE64(idEvaluaciones) = '{$evaluationB64}' AND TO_BASE64(NoEmpleadoEvaluado) = '{$employeeB64}' AND StatusEvaluado = 1 AND Status = 1;";
            $evaluators = $this->Select($qEvaluators);
            if (!is_array($evaluators) || count($evaluators) === 0) {
                $evaluators = [['IdEvDetail' => null]];
            }

            // 6. Calcular resultados por evaluador y competencia
            $allResults = [];
            foreach ($evaluators as $evaluator) {
                $idEv = $evaluator['IdEvDetail'];
                $evaluatorRows = ($idEv === null)
                    ? $allDetail
                    : array_filter($allDetail, function ($v) use ($idEv) {
                        return $v['IdEvDetail'] === $idEv;
                    });

                if (count($evaluatorRows) === 0) {
                    continue;
                }

                // Agrupar por competencia
                $competencesMap = [];
                foreach ($evaluatorRows as $row) {
                    $idComp = $row['IdCompetencia'];
                    $compName = $row['Competencia'];
                    if (!isset($competencesMap[$idComp])) {
                        $competencesMap[$idComp] = [
                            'idCompetencia' => $idComp,
                            'competencia' => $compName,
                            'preguntas' => []
                        ];
                    }
                    $competencesMap[$idComp]['preguntas'][] = $row;
                }

                foreach ($competencesMap as $competence) {
                    $sumFinal = 0;
                    foreach ($competence['preguntas'] as $question) {
                        $tipo = (int) $question['idTipoPregunta'];
                        $idPregunta = $question['IdPregunta'];
                        $calificacion = $question['Calificacion'];

                        $dataConfig = array_values(array_filter($arrConfig, function ($c) use ($idPregunta) {
                            return $c['IdPregunta'] === $idPregunta;
                        }));

                        if ($tipo === 1) {
                            if (isset($dataConfig[0]['BoolCorreta']) && $dataConfig[0]['BoolCorreta'] == $calificacion) {
                                $sumFinal += 100;
                            }
                        } elseif ($tipo === 2) {
                            $answerEsp = array_values(array_filter($arrConfig, function ($c) use ($idPregunta, $lvlEvaluated) {
                                return $c['IdPregunta'] === $idPregunta && $c['NivelEmpleadoEsperadoOM'] == $lvlEvaluated;
                            }));

                            if (isset($answerEsp[0]['RespuestaEsperadoOM']) && $answerEsp[0]['RespuestaEsperadoOM'] == $calificacion) {
                                $sumFinal += 100;
                            } else {
                                $answerExpected = isset($answerEsp[0]['RespuestaEsperadoOM']) ? $answerEsp[0]['RespuestaEsperadoOM'] : null;
                                if ($answerExpected !== null) {
                                    $allAnswersPerQuestion = array_values(array_filter($arrAnswersQuestion, function ($a) use ($idPregunta) {
                                        return $a['IdPregunta'] === $idPregunta;
                                    }));

                                    $indexExpected = -1;
                                    $indexAnswer = -1;
                                    foreach ($allAnswersPerQuestion as $idx => $ans) {
                                        if ($ans['Respuesta'] == $answerExpected) {
                                            $indexExpected = $idx;
                                        }
                                        if ($ans['Respuesta'] == $calificacion) {
                                            $indexAnswer = $idx;
                                        }
                                    }

                                    if ($indexExpected > $indexAnswer) {
                                        $sumFinal += 100;
                                    } else {
                                        $sumaElse = 100;
                                        $resNoExpected = array_values(array_filter($allAnswersPerQuestion, function ($a) use ($answerExpected) {
                                            return $a['Respuesta'] > $answerExpected;
                                        }));
                                        $countResNoExpected = count($resNoExpected);
                                        if ($countResNoExpected > 0) {
                                            $valuePerRes = 100 / $countResNoExpected;
                                            foreach ($resNoExpected as $rNE) {
                                                $sumaElse -= $valuePerRes;
                                                if ($rNE['Respuesta'] == $calificacion) {
                                                    break;
                                                }
                                            }
                                        }
                                        $sumFinal += $sumaElse;
                                    }
                                }
                            }
                        } elseif ($tipo === 3) {
                            if (isset($dataConfig[0]['RangoFinal']) && isset($dataConfig[0]['RangoInicial'])) {
                                $diffRange = (float) $dataConfig[0]['RangoFinal'] - (float) $dataConfig[0]['RangoInicial'];
                                if ($diffRange > 0) {
                                    $restFinal = (((float) $calificacion - (float) $dataConfig[0]['RangoInicial']) / $diffRange) * 100;
                                } else {
                                    $restFinal = 0;
                                }
                                $sumFinal += $restFinal;
                            }
                        } elseif ($tipo === 4) {
                            if (isset($dataConfig[0]['RespuestaCorrectaOM']) && $dataConfig[0]['RespuestaCorrectaOM'] == $calificacion) {
                                $sumFinal += 100;
                            }
                        }
                    }

                    $countPreguntas = count($competence['preguntas']);
                    $resFinal = $countPreguntas > 0 ? ($sumFinal / $countPreguntas) : 0;
                    $allResults[] = [
                        'idCompetence' => $competence['idCompetencia'],
                        'competence' => $competence['competencia'],
                        'result' => $resFinal
                    ];
                }
            }

            // 7. Promediar resultados por competencia entre evaluadores
            $grouped = [];
            foreach ($allResults as $item) {
                $id = $item['idCompetence'];
                if (!isset($grouped[$id])) {
                    $grouped[$id] = ['competence' => $item['competence'], 'total' => 0, 'count' => 0];
                }
                $grouped[$id]['total'] += $item['result'];
                $grouped[$id]['count'] += 1;
            }

            $finalDataValues = [];
            foreach ($grouped as $id => $item) {
                $finalDataValues[] = [
                    'idCompetence' => $id,
                    'competence' => $item['competence'],
                    'result' => round($item['total'] / $item['count'], 2)
                ];
            }

            // 8. Calificar final y mejores/peores
            $sumResults = array_reduce($finalDataValues, function ($acc, $c) {
                return $acc + $c['result'];
            }, 0);
            $totalCompetences = count($finalDataValues);
            $finalResult = $totalCompetences > 0 ? round($sumResults / $totalCompetences, 2) : 0;

            $maxResult = $totalCompetences > 0 ? max(array_column($finalDataValues, 'result')) : 0;
            $best = array_filter($finalDataValues, function ($r) use ($maxResult) {
                return $r['result'] == $maxResult;
            });
            $worst = array_filter($finalDataValues, function ($r) {
                return $r['result'] < 70;
            });

            // Calificaciones esperadas según nivel y grupo
            $escalas = [
                'A' => ['A' => 100, 'B' => 75, 'C' => 50, 'D' => 25, 'E' => 0],
                'B' => ['A' => 100, 'B' => 100, 'C' => 66, 'D' => 33, 'E' => 0],
                'C' => ['A' => 100, 'B' => 100, 'C' => 100, 'D' => 50, 'E' => 0],
                'D' => ['A' => 100, 'B' => 100, 'C' => 100, 'D' => 100, 'E' => 0]
            ];
            $escala = isset($escalas[$grupoEvaluado]) ? $escalas[$grupoEvaluado] : $escalas['A'];

            $qExpected = "SELECT TO_BASE64(DC.idCompetencias) AS IdCompetencia, DC.CalificacionEsperado
                  FROM DetalleCompetencias AS DC
                  WHERE DC.NivelEmpleado = '{$lvlEvaluated}';";
            $expectedData = $this->Select($qExpected);
            $expectedMap = [];
            foreach ($expectedData as $exp) {
                $expectedMap[$exp['IdCompetencia']] = $exp['CalificacionEsperado'];
            }

            $competenciasDetalle = [];
            foreach ($finalDataValues as $comp) {
                $idComp = $comp['idCompetence'];
                $esperadoLetra = isset($expectedMap[$idComp]) ? $expectedMap[$idComp] : 'A';
                $esperadoValor = isset($escala[$esperadoLetra]) ? $escala[$esperadoLetra] : 100;
                $gap = round($comp['result'] - $esperadoValor, 2);
                $competenciasDetalle[] = [
                    'idCompetence' => $idComp,
                    'competence' => $comp['competence'],
                    'result' => $comp['result'],
                    'expected' => $esperadoValor,
                    'gap' => $gap,
                    'isWeak' => $comp['result'] < 70
                ];
            }

            return [
                'CalificacionFinal' => $finalResult,
                'TotalCompetencias' => $totalCompetences,
                'FortalezasCount' => count($best),
                'DebilidadesCount' => count($worst),
                'CompetenciasDetalle' => $competenciasDetalle
            ];
        } catch (\Exception $e) {
            return null;
        }
    }

    public function acceptFeedback($evaluation)
    {
        try {
            $evaluation = base64_decode($evaluation);
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "INSERT INTO RetroalimentacionEvaluacion(idEvaluaciones, NoEmpleado) VALUES('$evaluation','$NoEmpleado')";
            $this->ExecuteQuery($q, array());
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
    //           IF(E.Imagen IS NULL OR E.Imagen = '','assets/images/logo-pip.png',CONCAT('Archivos/ImgEmpleados/',E.NoEmpleado,'/',E.Imagen)) AS ImgEmpleado,
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

    public function acceptResultsEvaluation($evaluation, $employee, $required, $dataCompetences)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $evaluation = base64_decode($evaluation);
            $employee = base64_decode($employee);
            $q = "CALL sp_CreaPlanAccion('$evaluation','$employee','$NoEmpleado','$required');";
            $resultado = $this->Procedure($q, array());
            if ($required != 0 && sizeof($dataCompetences) > 0) {
                if (sizeof($resultado) > 0) {
                    $newPlanAction = $resultado[0]["PlanGenerated"];
                    for ($i = 0; $i < sizeof($dataCompetences); $i++) {
                        $resultadoEv = $dataCompetences[$i]["result"] ?? $dataCompetences[$i]["resultado"] ?? 0;
                        $competence = $dataCompetences[$i]["competence"];
                        $idCompetence = $dataCompetences[$i]["idCompetence"];
                        $idCompetence = base64_decode($idCompetence);
                        $conPlanAction = new Conexiones();
                        $qPA = "INSERT INTO ObjetivosPlanAccion(idPlanesAccionEvaluacion, CalificacionFinal, idCompetencias)
                           VALUES ('$newPlanAction','$resultadoEv','$idCompetence');";
                        $conPlanAction->ExecuteQuery($qPA, array());
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

    public function evaluationsAboutTheEmployee($NoEmpleado)
    {
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
            $resultado = $this->Select($q, array());
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

    public function getEmployeesWhitPlanAction()
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "SELECT E.NoEmpleado, E.Nombre, P.Puesto, SD.Sucursal
              FROM PlanesAccionEvaluacion AS PAE
              INNER JOIN Empleados AS E ON E.NoEmpleado = PAE.NoEmpleado
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              INNER JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = PAE.NoEmpleado AND ED.idEvaluaciones = PAE.idEvaluaciones
              WHERE ED.NoEmpleadoEvalua = '$NoEmpleado' AND ED.JefeEvalua = 1 AND E.Status = 1 AND PAE.Requerido = 1
              GROUP BY E.NoEmpleado;";
            $resultado = $this->Select($q, array());
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

    public function getPlanActionPerEmployee($employee)
    {
        try {
            $q = "SELECT TO_BASE64(PAE.idPlanesAccionEvaluacion) AS idPlanesAccionEvaluacion, EV.Titulo,
                            IF(PAE.StatusConfirmaPlanAccion = 0,'Plan de acción sin terminar','Plan de acción finalizado') AS MsgEstadoPlanA,
                            (
                                SELECT COUNT(*)
                                FROM AvanceActividadPlanA AS AVA
                                INNER JOIN ActividadesPlanAccion AS APA ON APA.idActividadesPlanAccion = AVA.idActividadesPlanAccion
                                INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
                                WHERE OPA.idPlanesAccionEvaluacion = PAE.idPlanesAccionEvaluacion
                                    AND AVA.idHistorialRechazo IS NULL
                                    AND COALESCE(AVA.EstadoAprobacion,1) = 0
                            ) AS CantidadAvancesPendientes
              FROM PlanesAccionEvaluacion AS PAE
              INNER JOIN Evaluaciones AS EV ON EV.idEvaluaciones = PAE.idEvaluaciones
              WHERE PAE.Requerido = 1 AND PAE.NoEmpleado = '$employee';";
            $resultado = $this->Select($q, array());
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

    public function getMyPlansAction()
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "SELECT
                TO_BASE64(PAE.idPlanesAccionEvaluacion) AS idPlanesAccionEvaluacion,
                EV.Titulo,
                PAE.StatusConfirmaPlanAccion,
                PAE.StatusConfirmaActividades,
                (
                    SELECT COALESCE(AVG(APA2.Progreso), 0)
                    FROM ActividadesPlanAccion APA2
                    INNER JOIN ObjetivosPlanAccion OPA2 ON OPA2.idObjetivosPlanAccion = APA2.idObjetivosPlanAccion
                    WHERE OPA2.idPlanesAccionEvaluacion = PAE.idPlanesAccionEvaluacion
                ) AS ProgresoGlobal,
                (
                    SELECT COUNT(*)
                    FROM AvanceActividadPlanA AVA2
                    INNER JOIN ActividadesPlanAccion APA3 ON APA3.idActividadesPlanAccion = AVA2.idActividadesPlanAccion
                    INNER JOIN ObjetivosPlanAccion OPA3 ON OPA3.idObjetivosPlanAccion = APA3.idObjetivosPlanAccion
                    WHERE OPA3.idPlanesAccionEvaluacion = PAE.idPlanesAccionEvaluacion
                        AND AVA2.idHistorialRechazo IS NULL
                        AND COALESCE(AVA2.EstadoAprobacion, 1) = 0
                ) AS CantidadAvancesPendientes
              FROM PlanesAccionEvaluacion AS PAE
              INNER JOIN Evaluaciones AS EV ON EV.idEvaluaciones = PAE.idEvaluaciones
              WHERE PAE.Requerido = 1 AND PAE.NoEmpleado = '$NoEmpleado';";
            $resultado = $this->Select($q, array());
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

    public function getSummaryPlanAction($planA)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "SELECT StatusConfirmaActividades,IF(FechaConfirmaActividades IS NULL, 'No registrado', FechaConfirmaActividades) AS FechaConfirmaActividades,
              StatusConfirmaPlanAccion, IF(FechaConfirmaPlanAccion IS NULL,'No registrado', FechaConfirmaPlanAccion) AS FechaConfirmaPlanAccion,
              (SELECT RE.FechaAceptado FROM RetroalimentacionEvaluacion AS RE
              	INNER JOIN PlanesAccionEvaluacion PAE ON PAE.idEvaluaciones = RE.idEvaluaciones
              	WHERE TO_BASE64(PAE.idPlanesAccionEvaluacion) = '$planA')  AS FechaAceptaRetroalimentacion,
                            (
                                SELECT COUNT(*)
                                FROM AvanceActividadPlanA AS AVA
                                INNER JOIN ActividadesPlanAccion AS APA ON APA.idActividadesPlanAccion = AVA.idActividadesPlanAccion
                                INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
                                WHERE TO_BASE64(OPA.idPlanesAccionEvaluacion) = '$planA'
                                    AND AVA.idHistorialRechazo IS NULL
                                    AND COALESCE(AVA.EstadoAprobacion,1) = 0
                            ) AS CantidadAvancesPendientes,
              IF(NoEmpleado = '$NoEmpleado',1,0) AS TipoRealiza
              FROM PlanesAccionEvaluacion
              WHERE TO_BASE64(idPlanesAccionEvaluacion) = '$planA';";

            $resultado = $this->Select($q);
            $resumen = count($resultado) > 0 ? $resultado[0] : null;

            // Obtener cantidades de actividades para la barra de resumen en plan-action.php
            $qAct = "SELECT APA.Progreso
              FROM ActividadesPlanAccion AS APA
              INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
              WHERE TO_BASE64(OPA.idPlanesAccionEvaluacion) = '$planA';";
            $resAct = $this->Select($qAct);

            $cantidadAct = count($resAct);
            $cantidadActTerminadas = 0;
            foreach ($resAct as $act) {
                if (intval($act['Progreso']) == 100) {
                    $cantidadActTerminadas++;
                }
            }

            // Consultar si hay rechazos previos sin que el plan esté aceptado
            $qRechazo = "SELECT MotivoRechazo, DATE_FORMAT(FechaRechazo,'%d/%m/%Y %H:%i') AS FechaRechazo
                          FROM HistorialRechazosPlanA
                          WHERE idPlanesAccionEvaluacion = (SELECT idPlanesAccionEvaluacion
                            FROM PlanesAccionEvaluacion WHERE TO_BASE64(idPlanesAccionEvaluacion) = '$planA')
                          ORDER BY FechaRechazo DESC LIMIT 1;";
            $resRechazo = $this->Select($qRechazo);
            $tieneRechazo = count($resRechazo) > 0 && ($resumen === null || !$resumen['StatusConfirmaPlanAccion']);
            $ultimoMotivo = $tieneRechazo ? $resRechazo[0]['MotivoRechazo'] : null;
            $ultimaFechaRechazo = $tieneRechazo ? $resRechazo[0]['FechaRechazo'] : null;

            // Estructura compatible con plan-action.js y my-results/general.js (usa índice "0")
            $data = [
                "Cantidades" => [
                    "CantidadAct" => $cantidadAct,
                    "CantidadActTerminadas" => $cantidadActTerminadas,
                    "CantidadAvancesPendientes" => isset($resumen['CantidadAvancesPendientes']) ? intval($resumen['CantidadAvancesPendientes']) : 0
                ],
                "Resumen" => $resumen,
                "0" => $resumen,
                "TieneRechazo" => $tieneRechazo ? 1 : 0,
                "UltimoMotivoRechazo" => $ultimoMotivo,
                "UltimaFechaRechazo" => $ultimaFechaRechazo
            ];

            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $data
            ];

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function acceptActivitiesActionPlan($planA)
    {
        try {
            $planADec = base64_decode($planA);
            $q = "UPDATE PlanesAccionEvaluacion
                  SET StatusConfirmaActividades = 1, FechaConfirmaActividades = NOW()
                  WHERE idPlanesAccionEvaluacion = '$planADec';";
            $this->ExecuteQuery($q, array());

            $context = $this->getPlanActionNotificationContext($planADec);
            if (!empty($context['NoEmpleadoEvaluado'])) {
                $bossName = !empty($context['NombreJefe']) ? $context['NombreJefe'] : 'Tu jefe directo';
                $this->notifyPlanActionParticipant(
                    $context['NoEmpleadoEvaluado'],
                    'Actividades aprobadas en Plan de Acción',
                    "$bossName aprobó las actividades de tu plan de acción. Ya puedes registrar avances.",
                    $planADec,
                    false
                );
            }

            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "Las actividades del plan de acción han sido aceptadas con éxito"
            ];

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function acceptProgressActionPlan($planA)
    {
        try {
            $planADec = base64_decode($planA);

            $qPendientes = "SELECT COUNT(*) AS CantidadPendientes
                FROM AvanceActividadPlanA AS AVA
                INNER JOIN ActividadesPlanAccion AS APA ON APA.idActividadesPlanAccion = AVA.idActividadesPlanAccion
                INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
                WHERE OPA.idPlanesAccionEvaluacion = '$planADec'
                  AND AVA.idHistorialRechazo IS NULL
                  AND COALESCE(AVA.EstadoAprobacion,1) = 0;";
            $resPendientes = $this->Select($qPendientes);
            $cantidadPendientes = isset($resPendientes[0]['CantidadPendientes']) ? intval($resPendientes[0]['CantidadPendientes']) : 0;

            if ($cantidadPendientes > 0) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se puede aceptar el plan mientras existan avances pendientes de revisión."
                ]);
            }

            $qIncompletas = "SELECT COUNT(*) AS CantidadIncompletas
                FROM ActividadesPlanAccion AS APA
                INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
                WHERE OPA.idPlanesAccionEvaluacion = '$planADec'
                  AND APA.Progreso < 100;";
            $resIncompletas = $this->Select($qIncompletas);
            $cantidadIncompletas = isset($resIncompletas[0]['CantidadIncompletas']) ? intval($resIncompletas[0]['CantidadIncompletas']) : 0;

            if ($cantidadIncompletas > 0) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se puede aceptar el plan hasta que todas las actividades estén al 100% aprobado."
                ]);
            }

            $q = "UPDATE PlanesAccionEvaluacion
                  SET StatusConfirmaPlanAccion = 1, FechaConfirmaPlanAccion = NOW()
                  WHERE idPlanesAccionEvaluacion = '$planADec';";
            $this->ExecuteQuery($q, array());

            $context = $this->getPlanActionNotificationContext($planADec);
            if (!empty($context['NoEmpleadoEvaluado'])) {
                $bossName = !empty($context['NombreJefe']) ? $context['NombreJefe'] : 'Tu jefe directo';
                $this->notifyPlanActionParticipant(
                    $context['NoEmpleadoEvaluado'],
                    'Plan de Acción aprobado',
                    "$bossName aprobó el cierre final de tu plan de acción.",
                    $planADec,
                    false
                );
            }

            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "El progreso final del plan de acción ha sido aceptado con éxito"
            ];

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function rejectProgressActionPlan($planA, $motivo)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $planADec = base64_decode($planA);
            $context = $this->getPlanActionNotificationContext($planADec);
            $bossName = $this->getEmployeeName($NoEmpleado, 'Tu jefe directo');

            // Calcular el avance global actual antes de resetear
            $qAvance = "SELECT COALESCE(AVG(APA.Progreso), 0) AS AvanceGlobal
                          FROM ActividadesPlanAccion AS APA
                          INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
                          WHERE OPA.idPlanesAccionEvaluacion = '$planADec';";
            $resAvance = $this->Select($qAvance);
            $avanceGlobal = isset($resAvance[0]['AvanceGlobal']) ? floatval($resAvance[0]['AvanceGlobal']) : 0;

            // Insertar el registro de rechazo en el historial
            $motivoSafe = addslashes($motivo);
            $qInsert = "INSERT INTO HistorialRechazosPlanA
                          (idPlanesAccionEvaluacion, MotivoRechazo, AvanceGlobalAlRechazar, UsuarioRechazo)
                          VALUES ('$planADec', '$motivoSafe', '$avanceGlobal', '$NoEmpleado');";
            $this->ExecuteQuery($qInsert, array());

            // Obtener el id del rechazo recién insertado
            $qLastId = "SELECT MAX(idHistorialRechazosPlanA) AS idRechazo FROM HistorialRechazosPlanA WHERE idPlanesAccionEvaluacion = '$planADec';";
            $resLastId = $this->Select($qLastId);
            $idRechazo = isset($resLastId[0]['idRechazo']) ? $resLastId[0]['idRechazo'] : null;

            if ($idRechazo) {
                // Vincular todos los avances actuales al rechazo (archivarlos)
                $qArchivar = "UPDATE AvanceActividadPlanA
                                SET idHistorialRechazo = '$idRechazo'
                                WHERE idActividadesPlanAccion IN (
                                  SELECT idActividadesPlanAccion FROM ActividadesPlanAccion
                                  WHERE idObjetivosPlanAccion IN (
                                    SELECT idObjetivosPlanAccion FROM ObjetivosPlanAccion
                                    WHERE idPlanesAccionEvaluacion = '$planADec'
                                  )
                                ) AND idHistorialRechazo IS NULL;";
                $this->ExecuteQuery($qArchivar, array());
            }

            // Resetear el progreso de todas las actividades a 0
            $qReset = "UPDATE ActividadesPlanAccion
                         SET Progreso = 0
                         WHERE idObjetivosPlanAccion IN (
                           SELECT idObjetivosPlanAccion FROM ObjetivosPlanAccion
                           WHERE idPlanesAccionEvaluacion = '$planADec'
                         );";
            $this->ExecuteQuery($qReset, array());

            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "El progreso del plan de acción fue rechazado. El empleado podrá registrar nuevos avances."
            ];

            if (!empty($context['NoEmpleadoEvaluado'])) {
                $notifTitle = intval($context['StatusConfirmaActividades']) === 0
                    ? 'Objetivos/Actividades devueltos'
                    : 'Avances de Plan de Acción rechazados';
                $notifBody = intval($context['StatusConfirmaActividades']) === 0
                    ? "$bossName rechazó los objetivos/actividades propuestos para tu plan de acción. Motivo: $motivo"
                    : "$bossName rechazó el progreso de tu plan de acción. Motivo: $motivo";

                $this->notifyPlanActionParticipant(
                    $context['NoEmpleadoEvaluado'],
                    $notifTitle,
                    $notifBody,
                    $planADec,
                    false
                );
            }

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getHistorialRechazos($planA)
    {
        try {
            $q = "SELECT idHistorialRechazosPlanA,
                    MotivoRechazo,
                    AvanceGlobalAlRechazar,
                    DATE_FORMAT(FechaRechazo,'%d/%m/%Y %H:%i') AS FechaRechazo
                  FROM HistorialRechazosPlanA
                  WHERE idPlanesAccionEvaluacion = (
                    SELECT idPlanesAccionEvaluacion FROM PlanesAccionEvaluacion
                    WHERE TO_BASE64(idPlanesAccionEvaluacion) = '$planA'
                  )
                  ORDER BY FechaRechazo DESC;";
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

    public function getInitialDetailPlanAction($planAction)
    {
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
            $resultado = $this->Select($q, array());
            if (sizeof($resultado) > 0) {
                for ($i = 0; $i < sizeof($resultado); $i++) {
                    $IdObjetive = $resultado[$i]["idObjetivosPlanAccion"];
                    $InstActivities = new Evaluaciones();
                    $ResultInst = $InstActivities->getActivitiesObjetive($IdObjetive);
                    array_push($finalArr, [
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

    public function getActivitiesObjetive($objetive)
    {
        try {
            $q = "SELECT to_base64(idActividadesPlanAccion) AS idActividadesPlanAccion, Titulo, Descripcion, FechaInicio, FechaFin, Progreso,
                            (
                                SELECT COUNT(*)
                                FROM AvanceActividadPlanA AS AVA
                                WHERE AVA.idActividadesPlanAccion = ActividadesPlanAccion.idActividadesPlanAccion
                                    AND AVA.idHistorialRechazo IS NULL
                                    AND COALESCE(AVA.EstadoAprobacion,1) = 0
                            ) AS CantidadAvancesPendientes,
                            (
                                SELECT COUNT(*)
                                FROM AvanceActividadPlanA AS AVA
                                WHERE AVA.idActividadesPlanAccion = ActividadesPlanAccion.idActividadesPlanAccion
                                    AND AVA.idHistorialRechazo IS NULL
                            ) AS CantidadAvancesRegistrados,
              IF(unix_timestamp(FechaFin) < unix_timestamp(curdate()),'1','0') AS FechaCaduca
              FROM ActividadesPlanAccion
              WHERE TO_BASE64(idObjetivosPlanAccion) = '$objetive';";
            $resultado = $this->Select($q, array());

            return $resultado;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function addActivityPerObjetive($objetive, $title, $description, $dateIni, $dateEnd)
    {
        try {
            $objetive = base64_decode($objetive);
            $q = "CALL sp_AddActivityPlanA('$objetive','$title','$description','$dateIni','$dateEnd');";
            $resultado = $this->Procedure($q, array());

            $qPlan = "SELECT OPA.idPlanesAccionEvaluacion AS PlanId
                FROM ObjetivosPlanAccion AS OPA
                WHERE OPA.idObjetivosPlanAccion = '$objetive'
                LIMIT 1;";
            $planResult = $this->Select($qPlan, array());
            $planId = isset($planResult[0]['PlanId']) ? $planResult[0]['PlanId'] : null;

            if (!empty($planId)) {
                $context = $this->getPlanActionNotificationContext($planId);
                if (!empty($context['NoEmpleadoJefe'])) {
                    $employeeName = !empty($context['NombreEvaluado']) ? $context['NombreEvaluado'] : 'Un empleado';
                    $this->notifyPlanActionParticipant(
                        $context['NoEmpleadoJefe'],
                        'Nueva actividad propuesta en Plan de Acción',
                        "$employeeName agregó la actividad: $title. Revisa el plan para validar las actividades propuestas.",
                        $planId,
                        true
                    );
                }
            }

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

    public function getDetailObjetivePlanAction($objetive)
    {
        try {
            $q = "SELECT C.Competencia, OPA.Objetivo, OPA.DescObjetivo
              FROM ObjetivosPlanAccion AS OPA
              INNER JOIN Competencias AS C ON C.idCompetencias = OPA.idCompetencias
              WHERE TO_BASE64(OPA.idObjetivosPlanAccion) = '$objetive';";
            $resultado = $this->Select($q, array());
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

    public function updateGenObjetivePlanAction($objetive_id, $objetive, $desc)
    {
        try {
            $objetive_id = base64_decode($objetive_id);
            $q = "UPDATE ObjetivosPlanAccion SET Objetivo = '$objetive', DescObjetivo = '$desc'
              WHERE idObjetivosPlanAccion = '$objetive_id';";
            $this->ExecuteQuery($q, array());
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

    public function getGeneralDetailActivityPlanA($activity)
    {
        try {
            // Solo mostrar avances del ciclo activo (idHistorialRechazo IS NULL = no archivados)
            $q = "SELECT TO_BASE64(AVA.idAvanceActividadPlanA) AS idAvanceActividadPlanA,
                                AVA.NuevoAvance,
                                AVA.DescripcionAvance,
                                DATE_FORMAT(AVA.FechaRegistro,'%d/%m/%Y %H:%i') AS FechaRegistro,
                                COALESCE(AVA.EstadoAprobacion,1) AS EstadoAprobacion,
                                DATE_FORMAT(AVA.FechaRevision,'%d/%m/%Y %H:%i') AS FechaRevision,
                                AVA.MotivoRevision,
                                IFNULL(E.Nombre,'') AS NombreRevision
                            FROM AvanceActividadPlanA AS AVA
                            LEFT JOIN Empleados AS E ON E.NoEmpleado = AVA.UsuarioRevision
                            WHERE TO_BASE64(AVA.idActividadesPlanAccion) = '$activity'
                                AND AVA.idHistorialRechazo IS NULL
              ORDER BY FechaRegistro DESC;";
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

    public function addProgressActivity($activity, $newProgress, $description)
    {
        try {
            $activity = base64_decode($activity);

            // Validar que el nuevo avance sea un entero en el rango [1, 100]
            $newProgress = intval($newProgress);
            if ($newProgress < 1 || $newProgress > 100) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "El avance debe ser un valor entre 1% y 100%."
                ]);
            }

            $qPending = "SELECT COUNT(*) AS CantidadPendientes
                FROM AvanceActividadPlanA
                WHERE idActividadesPlanAccion = '$activity'
                  AND idHistorialRechazo IS NULL
                  AND COALESCE(EstadoAprobacion,1) = 0;";
            $resPending = $this->Select($qPending);
            $cantidadPendientes = isset($resPending[0]['CantidadPendientes']) ? intval($resPending[0]['CantidadPendientes']) : 0;

            if ($cantidadPendientes > 0) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ya existe un avance pendiente de revisión para esta actividad."
                ]);
            }

            // Consultar el avance aprobado actual de la actividad
            $qCurrentProgress = "SELECT Progreso AS ProgresoActual
                FROM ActividadesPlanAccion
                WHERE idActividadesPlanAccion = '$activity'";
            $currentResult = $this->Select($qCurrentProgress);
            $progresoActual = isset($currentResult[0]["ProgresoActual"]) ? intval($currentResult[0]["ProgresoActual"]) : 0;

            if ($newProgress <= $progresoActual) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "El nuevo avance ({$newProgress}%) debe ser mayor al avance actual ({$progresoActual}%)."
                ]);
            }

            $descriptionSafe = addslashes($description);
            $qInsert = "INSERT INTO AvanceActividadPlanA
                (idActividadesPlanAccion, NuevoAvance, DescripcionAvance, EstadoAprobacion)
                VALUES ('$activity', '$newProgress', '$descriptionSafe', 0);";
            $this->ExecuteQuery($qInsert, array());

            $qPlan = "SELECT OPA.idPlanesAccionEvaluacion AS PlanId, APA.Titulo AS TituloActividad
                FROM ActividadesPlanAccion AS APA
                INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
                WHERE APA.idActividadesPlanAccion = '$activity'
                LIMIT 1;";
            $planResult = $this->Select($qPlan, array());
            $planId = isset($planResult[0]['PlanId']) ? $planResult[0]['PlanId'] : null;

            if (!empty($planId)) {
                $context = $this->getPlanActionNotificationContext($planId);
                if (!empty($context['NoEmpleadoJefe'])) {
                    $employeeName = !empty($context['NombreEvaluado']) ? $context['NombreEvaluado'] : 'Un empleado';
                    $activityTitle = !empty($planResult[0]['TituloActividad']) ? $planResult[0]['TituloActividad'] : 'la actividad';
                    $this->notifyPlanActionParticipant(
                        $context['NoEmpleadoJefe'],
                        'Avance pendiente en Plan de Acción',
                        "$employeeName registró un avance de {$newProgress}% en la actividad: $activityTitle. Requiere tu aprobación.",
                        $planId,
                        true
                    );
                }
            }

            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "El avance fue registrado y quedó pendiente de aprobación por tu jefe."
            ];

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function approveProgressActivity($progressId)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $progressIdDec = base64_decode($progressId);

            $qDetalle = "SELECT AVA.idAvanceActividadPlanA, AVA.idActividadesPlanAccion, AVA.NuevoAvance,
                APA.Titulo, APA.Progreso AS ProgresoAprobado,
                                PAE.idPlanesAccionEvaluacion AS PlanId,
                                PAE.NoEmpleado AS NoEmpleadoEvaluado, PAE.idEvaluaciones, PAE.StatusConfirmaActividades, PAE.StatusConfirmaPlanAccion
              FROM AvanceActividadPlanA AS AVA
              INNER JOIN ActividadesPlanAccion AS APA ON APA.idActividadesPlanAccion = AVA.idActividadesPlanAccion
              INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
              INNER JOIN PlanesAccionEvaluacion AS PAE ON PAE.idPlanesAccionEvaluacion = OPA.idPlanesAccionEvaluacion
              WHERE AVA.idAvanceActividadPlanA = '$progressIdDec'
                AND AVA.idHistorialRechazo IS NULL
                AND COALESCE(AVA.EstadoAprobacion,1) = 0
              LIMIT 1;";
            $detalle = $this->Select($qDetalle);

            if (count($detalle) === 0) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se encontró un avance pendiente para aprobar."
                ]);
            }

            $avance = $detalle[0];
            $qPermiso = "SELECT COUNT(*) AS TienePermiso
              FROM EvaluacionDetalle
              WHERE NoEmpleadoEvalua = '$NoEmpleado'
                AND NoEmpleadoEvaluado = '" . $avance['NoEmpleadoEvaluado'] . "'
                AND idEvaluaciones = '" . $avance['idEvaluaciones'] . "'
                AND JefeEvalua = 1
                AND Status = 1;";
            $permiso = $this->Select($qPermiso);
            $tienePermiso = isset($permiso[0]['TienePermiso']) ? intval($permiso[0]['TienePermiso']) : 0;

            if ($tienePermiso === 0 || intval($avance['StatusConfirmaActividades']) !== 1 || intval($avance['StatusConfirmaPlanAccion']) === 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No tienes permiso para aprobar este avance o el plan ya no permite cambios."
                ]);
            }

            if (intval($avance['NuevoAvance']) <= intval($avance['ProgresoAprobado'])) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "El avance ya no es válido porque existe un porcentaje aprobado igual o mayor."
                ]);
            }

            $qApprove = "UPDATE AvanceActividadPlanA
                SET EstadoAprobacion = 1,
                    FechaRevision = NOW(),
                    UsuarioRevision = '$NoEmpleado',
                    MotivoRevision = NULL
                WHERE idAvanceActividadPlanA = '$progressIdDec';";
            $this->ExecuteQuery($qApprove, array());

            $qUpdateActivity = "UPDATE ActividadesPlanAccion
                SET Progreso = '" . intval($avance['NuevoAvance']) . "'
                WHERE idActividadesPlanAccion = '" . $avance['idActividadesPlanAccion'] . "';";
            $this->ExecuteQuery($qUpdateActivity, array());

            $bossName = $this->getEmployeeName($NoEmpleado, 'Tu jefe directo');
            $this->notifyPlanActionParticipant(
                $avance['NoEmpleadoEvaluado'],
                'Avance aprobado en Plan de Acción',
                "$bossName aprobó tu avance de " . intval($avance['NuevoAvance']) . "% en la actividad: " . $avance['Titulo'] . ".",
                $avance['PlanId'],
                false
            );

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "El avance fue aprobado correctamente."
            ]);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function rejectProgressEntry($progressId, $motivo)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $progressIdDec = base64_decode($progressId);
            $motivoSafe = addslashes($motivo);

            $qDetalle = "SELECT AVA.idAvanceActividadPlanA,
                                APA.Titulo, AVA.NuevoAvance,
                                PAE.idPlanesAccionEvaluacion AS PlanId,
                                PAE.NoEmpleado AS NoEmpleadoEvaluado, PAE.idEvaluaciones, PAE.StatusConfirmaPlanAccion
              FROM AvanceActividadPlanA AS AVA
              INNER JOIN ActividadesPlanAccion AS APA ON APA.idActividadesPlanAccion = AVA.idActividadesPlanAccion
              INNER JOIN ObjetivosPlanAccion AS OPA ON OPA.idObjetivosPlanAccion = APA.idObjetivosPlanAccion
              INNER JOIN PlanesAccionEvaluacion AS PAE ON PAE.idPlanesAccionEvaluacion = OPA.idPlanesAccionEvaluacion
              WHERE AVA.idAvanceActividadPlanA = '$progressIdDec'
                AND AVA.idHistorialRechazo IS NULL
                AND COALESCE(AVA.EstadoAprobacion,1) = 0
              LIMIT 1;";
            $detalle = $this->Select($qDetalle);

            if (count($detalle) === 0) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se encontró un avance pendiente para rechazar."
                ]);
            }

            $avance = $detalle[0];
            $qPermiso = "SELECT COUNT(*) AS TienePermiso
              FROM EvaluacionDetalle
              WHERE NoEmpleadoEvalua = '$NoEmpleado'
                AND NoEmpleadoEvaluado = '" . $avance['NoEmpleadoEvaluado'] . "'
                AND idEvaluaciones = '" . $avance['idEvaluaciones'] . "'
                AND JefeEvalua = 1
                AND Status = 1;";
            $permiso = $this->Select($qPermiso);
            $tienePermiso = isset($permiso[0]['TienePermiso']) ? intval($permiso[0]['TienePermiso']) : 0;

            if ($tienePermiso === 0 || intval($avance['StatusConfirmaPlanAccion']) === 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No tienes permiso para rechazar este avance o el plan ya no permite cambios."
                ]);
            }

            $qReject = "UPDATE AvanceActividadPlanA
                SET EstadoAprobacion = 2,
                    FechaRevision = NOW(),
                    UsuarioRevision = '$NoEmpleado',
                    MotivoRevision = '$motivoSafe'
                WHERE idAvanceActividadPlanA = '$progressIdDec';";
            $this->ExecuteQuery($qReject, array());

            $bossName = $this->getEmployeeName($NoEmpleado, 'Tu jefe directo');
            $this->notifyPlanActionParticipant(
                $avance['NoEmpleadoEvaluado'],
                'Avance rechazado en Plan de Acción',
                "$bossName rechazó tu avance de " . intval($avance['NuevoAvance']) . "% en la actividad: " . $avance['Titulo'] . ". Motivo: $motivo",
                $avance['PlanId'],
                false
            );

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "El avance fue rechazado. Se conserva el último porcentaje aprobado de la actividad."
            ]);
        } catch (\Exception $e) {
            return $e;
        }
    }

    private function getEmployeeName($employeeNumber, $fallback = 'Usuario')
    {
        try {
            $employeeNumber = addslashes($employeeNumber);
            $q = "SELECT Nombre FROM Empleados WHERE NoEmpleado = '$employeeNumber' LIMIT 1;";
            $result = $this->Select($q, array());
            return !empty($result[0]['Nombre']) ? $result[0]['Nombre'] : $fallback;
        } catch (\Exception $e) {
            return $fallback;
        }
    }

    private function getPlanActionNotificationContext($planId)
    {
        try {
            $planId = addslashes($planId);
            $q = "SELECT PAE.idPlanesAccionEvaluacion,
                    PAE.NoEmpleado AS NoEmpleadoEvaluado,
                    PAE.StatusConfirmaActividades,
                    E.Nombre AS NombreEvaluado,
                    ED.NoEmpleadoEvalua AS NoEmpleadoJefe,
                    EJ.Nombre AS NombreJefe
                FROM PlanesAccionEvaluacion AS PAE
                LEFT JOIN Empleados AS E ON E.NoEmpleado = PAE.NoEmpleado
                LEFT JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = PAE.NoEmpleado
                    AND ED.idEvaluaciones = PAE.idEvaluaciones
                    AND ED.JefeEvalua = 1
                    AND ED.Status = 1
                LEFT JOIN Empleados AS EJ ON EJ.NoEmpleado = ED.NoEmpleadoEvalua
                WHERE PAE.idPlanesAccionEvaluacion = '$planId'
                LIMIT 1;";
            $result = $this->Select($q, array());
            return $result[0] ?? [];
        } catch (\Exception $e) {
            return [];
        }
    }

    private function notifyPlanActionParticipant($noEmpleado, $title, $message, $planId, $bossView = false)
    {
        try {
            require_once(__DIR__ . '/../Notifications/Notifications.php');
            $planIdBase64 = base64_encode((string) $planId);
            $link = 'plan-action.php?PA=' . urlencode($planIdBase64);
            $notifService = new Notifications();
            $notifService->insertNotification(
                (string) $noEmpleado,
                'plan_action',
                $title,
                $message,
                $link,
                intval($planId),
                'PlanesAccionEvaluacion'
            );
        } catch (\Exception $notifEx) {
            error_log('[notifyPlanActionParticipant] Web notification error: ' . $notifEx->getMessage());
        }

        $route = $bossView
            ? '/plan-accion/equipo/' . base64_encode((string) $planId)
            : '/plan-accion/' . base64_encode((string) $planId);

        $this->sendMobileInternalNotification((string) $noEmpleado, 'PlanAccion', $title, $message, [
            'tipo' => 'PlanAccion',
            'route' => $route,
            'target' => $bossView ? 'team' : 'mine'
        ]);
    }

    private function sendMobileInternalNotification($noEmpleado, $tipo, $titulo, $cuerpo, $payload = [])
    {
        try {
            $apiUrl = defined('DOTNET_API_URL') ? DOTNET_API_URL : 'http://localhost:5000';
            $internalKey = defined('DOTNET_INTERNAL_KEY') ? DOTNET_INTERNAL_KEY : 'pip-internal-2025-X9kLmQ7rNvTz';
            $requestBody = json_encode([
                'noEmpleado' => (string) $noEmpleado,
                'tipo' => $tipo,
                'titulo' => $titulo,
                'cuerpo' => $cuerpo,
                'payload' => $payload,
            ]);

            $ch = curl_init("$apiUrl/api/notificacion/internal/enviar");
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $requestBody,
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json',
                    "X-Internal-Key: $internalKey",
                    'ngrok-skip-browser-warning: 1',
                ],
                CURLOPT_TIMEOUT => 10,
                CURLOPT_SSL_VERIFYPEER => false,
            ]);
            $result = curl_exec($ch);
            $curlErr = curl_error($ch);
            if ($curlErr) {
                error_log('[sendMobileInternalNotification] Curl error: ' . $curlErr);
            } else {
                error_log('[sendMobileInternalNotification] Result: ' . $result);
            }
        } catch (\Exception $pushEx) {
            error_log('[sendMobileInternalNotification] Error: ' . $pushEx->getMessage());
        }
    }

    public function getListEvaluations()
    {
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

    public function getEvaluationById($idEvaluacion)
    {
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

    // ============================================================
    // Duplicar evaluación (encabezado + preguntas + configuraciones
    // + respuestas posibles + participantes). La copia queda como
    // borrador editable: Activado = 0, PreguntasAceptadas = 0, Status = 1.
    // ============================================================
    public function duplicateEvaluation($idEvaluaciones, $copyParticipants = false)
    {
        try {
            $idDecoded = base64_decode($idEvaluaciones);

            // Validar que la evaluación origen exista
            $origen = $this->SelectNotClose("SELECT * FROM Evaluaciones WHERE idEvaluaciones = '$idDecoded' LIMIT 1");
            if (count($origen) === 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "La evaluación a duplicar no fue encontrada."
                ]);
            }
            $row = $origen[0];

            // --- 1. Clonar el encabezado en Evaluaciones (siempre como borrador) ---
            $nuevoTitulo = addslashes($row['Titulo'] . ' (Copia)');
            $tipo        = (int) $row['TipoEvaluacion'];
            $dirigido    = (int) $row['DirigidoA'];
            $period      = isset($row['Periodicidad']) && $row['Periodicidad'] !== null ? "'" . (int) $row['Periodicidad'] . "'" : "NULL";
            $fechaIni    = !empty($row['FechaInicio']) ? "'" . addslashes($row['FechaInicio']) . "'" : "NULL";
            $fechaFin    = !empty($row['FechaFin']) ? "'" . addslashes($row['FechaFin']) . "'" : "NULL";
            $retroIni    = !empty($row['RetroFechaIni']) ? "'" . addslashes($row['RetroFechaIni']) . "'" : "NULL";
            $retroFin    = !empty($row['RetroFechaFin']) ? "'" . addslashes($row['RetroFechaFin']) . "'" : "NULL";
            $planIni     = !empty($row['PlanAFechaIni']) ? "'" . addslashes($row['PlanAFechaIni']) . "'" : "NULL";
            $planFin     = !empty($row['PlanAFechaFin']) ? "'" . addslashes($row['PlanAFechaFin']) . "'" : "NULL";
            $participantes = addslashes($row['EmpleadosParticipantes'] ?? '');

            $qInsert = "INSERT INTO Evaluaciones
                (Titulo, TipoEvaluacion, Periodicidad, FechaInicio, FechaFin, Status,
                 RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, DirigidoA,
                 EmpleadosParticipantes, Activado, PreguntasAceptadas)
                VALUES
                ('$nuevoTitulo', '$tipo', $period, $fechaIni, $fechaFin, 1,
                 $retroIni, $retroFin, $planIni, $planFin, '$dirigido',
                 '$participantes', 0, 0);";
            $newId = $this->InsertAndGetId($qInsert);

            if (!$newId) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se pudo crear la copia de la evaluación."
                ]);
            }

            // --- 2. Clonar preguntas (PreguntasEvaluacion) y sus dependencias ---
            $preguntas = $this->SelectNotClose("SELECT * FROM PreguntasEvaluacion WHERE idEvaluaciones = '$idDecoded'");
            foreach ($preguntas as $preg) {
                $oldQId      = $preg['idPreguntasEvaluacion'];
                $idTipo      = (int) $preg['idTipoPregunta'];
                $idComp      = (int) $preg['idCompetencias'];
                $titulo      = addslashes($preg['Titulo']);
                $descripcion = addslashes($preg['Descripcion']);

                $qPreg = "INSERT INTO PreguntasEvaluacion (idEvaluaciones, idTipoPregunta, idCompetencias, Titulo, Descripcion)
                          VALUES ('$newId', '$idTipo', '$idComp', '$titulo', '$descripcion');";
                $newQId = $this->InsertAndGetId($qPreg);
                if (!$newQId) {
                    continue;
                }

                // 2a. Clonar respuestas posibles y mapear viejo->nuevo id
                $mapaRespuestas = [];
                $respuestas = $this->SelectNotClose("SELECT * FROM PreguntasPosiblesRespuestas WHERE idPreguntasEvaluacion = '$oldQId'");
                foreach ($respuestas as $resp) {
                    $descResp = addslashes($resp['DescripcionRespuesta']);
                    $qResp = "INSERT INTO PreguntasPosiblesRespuestas (idPreguntasEvaluacion, DescripcionRespuesta)
                              VALUES ('$newQId', '$descResp');";
                    $newRespId = $this->InsertAndGetId($qResp);
                    if ($newRespId) {
                        $mapaRespuestas[$resp['idPreguntasPosiblesRespuestas']] = $newRespId;
                    }
                }

                // 2b. Clonar configuraciones (rangos / booleanos / respuestas esperadas)
                //     Remapear las columnas que referencian idPreguntasPosiblesRespuestas.
                $configs = $this->SelectNotClose("SELECT * FROM PreguntasConfiguracion WHERE idPreguntasEvaluacion = '$oldQId'");
                foreach ($configs as $cfg) {
                    $rangoIni = isset($cfg['RangoInicial']) && $cfg['RangoInicial'] !== null ? "'" . (int) $cfg['RangoInicial'] . "'" : "NULL";
                    $rangoFin = isset($cfg['RangoFinal']) && $cfg['RangoFinal'] !== null ? "'" . (int) $cfg['RangoFinal'] . "'" : "NULL";
                    $boolCorr = isset($cfg['BoolCorreta']) && $cfg['BoolCorreta'] !== null ? "'" . (int) $cfg['BoolCorreta'] . "'" : "NULL";
                    $valEsp   = isset($cfg['ValorEsperadoOM']) && $cfg['ValorEsperadoOM'] !== null ? "'" . (int) $cfg['ValorEsperadoOM'] . "'" : "NULL";
                    $nivelEsp = isset($cfg['NivelEmpleadoEsperadoOM']) && $cfg['NivelEmpleadoEsperadoOM'] !== null ? "'" . (int) $cfg['NivelEmpleadoEsperadoOM'] . "'" : "NULL";

                    // Remapear referencias a respuestas posibles
                    $respEsp = "NULL";
                    if (isset($cfg['RespuestaEsperadoOM']) && $cfg['RespuestaEsperadoOM'] !== null && isset($mapaRespuestas[$cfg['RespuestaEsperadoOM']])) {
                        $respEsp = "'" . $mapaRespuestas[$cfg['RespuestaEsperadoOM']] . "'";
                    }
                    $respCorr = "NULL";
                    if (isset($cfg['RespuestaCorrectaOM']) && $cfg['RespuestaCorrectaOM'] !== null && isset($mapaRespuestas[$cfg['RespuestaCorrectaOM']])) {
                        $respCorr = "'" . $mapaRespuestas[$cfg['RespuestaCorrectaOM']] . "'";
                    }

                    $qCfg = "INSERT INTO PreguntasConfiguracion
                        (idPreguntasEvaluacion, RangoInicial, RangoFinal, BoolCorreta, RespuestaEsperadoOM, ValorEsperadoOM, NivelEmpleadoEsperadoOM, RespuestaCorrectaOM)
                        VALUES
                        ('$newQId', $rangoIni, $rangoFin, $boolCorr, $respEsp, $valEsp, $nivelEsp, $respCorr);";
                    $this->ExecuteQuery($qCfg, array());
                }
            }

            // --- 3. Participantes ---
            // El CSV de participantes (EmpleadosParticipantes) ya se copió en el paso 1.
            // La clonación de filas en EvaluacionDetalle (pares/evaluadores ya generados al
            // publicar el original) queda OPCIONAL: por defecto NO se copian, porque la copia
            // es un borrador que normalmente se reconfigura antes de publicar. Solo se clonan
            // si copyParticipants = true.
            $copy = ($copyParticipants === true || $copyParticipants === 'true' || $copyParticipants === 1 || $copyParticipants === '1');
            if (!$copy) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "Evaluación duplicada con éxito. La copia quedó como borrador editable.",
                    "NewId" => base64_encode((string) $newId),
                    "TipoEvaluacion" => $tipo,
                    "NewTitulo" => $row['Titulo'] . ' (Copia)'
                ]);
            }

            $detalles = $this->SelectNotClose("SELECT * FROM EvaluacionDetalle WHERE idEvaluaciones = '$idDecoded' AND Status = 1");
            foreach ($detalles as $det) {
                $evalua    = (int) $det['NoEmpleadoEvalua'];
                $evaluado  = (int) $det['NoEmpleadoEvaluado'];
                $jefe      = (int) $det['JefeEvalua'];
                $par       = (int) $det['ParEvalua'];
                $auto      = (int) $det['AutoEvalua'];
                $sub       = (int) $det['SubordinadoEvalua'];
                $nivel     = (int) $det['NivelEvaluado'];
                $puesto    = (int) $det['PuestoEvaluado'];

                // StatusEvaluado = 0: el detalle clonado aún no ha sido respondido.
                $qDet = "INSERT INTO EvaluacionDetalle
                    (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado)
                    VALUES
                    ('$newId', '$evalua', '$evaluado', 1, 0, '$jefe', '$par', '$auto', '$sub', '$nivel', '$puesto');";
                $this->ExecuteQuery($qDet, array());
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "Evaluación duplicada con éxito. La copia quedó como borrador editable.",
                "NewId" => base64_encode((string) $newId)
            ]);
        } catch (\Exception $e) {
            error_log("duplicateEvaluation - Exception: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al duplicar la evaluación: " . $e->getMessage()
            ]);
        }
    }

    // ============================================================
    // Edición de evaluación NO publicada (Feature 2)
    // ============================================================

    // Devuelve encabezado + participantes (CSV) + preguntas de una evaluación
    // para precargar el wizard en modo edición.
    public function getEvaluationForEdit($idEvaluaciones)
    {
        try {
            $idDecoded = base64_decode($idEvaluaciones);
            $header = $this->SelectNotClose(
                "SELECT idEvaluaciones, Titulo, TipoEvaluacion, DirigidoA, Periodicidad,
                        FechaInicio, FechaFin, RetroFechaIni, RetroFechaFin,
                        PlanAFechaIni, PlanAFechaFin, EmpleadosParticipantes,
                        Activado, PreguntasAceptadas, Status
                 FROM Evaluaciones WHERE idEvaluaciones = '$idDecoded' LIMIT 1"
            );
            if (count($header) === 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Evaluación no encontrada."
                ]);
            }

            // Participantes como arreglo (desde el CSV)
            $participantes = array_values(array_filter(array_map('trim', explode(',', $header[0]['EmpleadosParticipantes'] ?? ''))));

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => [
                    "Header" => $header[0],
                    "Participants" => $participantes
                ]
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al cargar la evaluación: " . $e->getMessage()
            ]);
        }
    }

    // Actualiza el encabezado. Rechaza si la evaluación ya está publicada (Activado = 1).
    public function updateEvaluationHeader($idEvaluaciones, $inpTitulo, $tipoEvaluacion, $dirigidoA, $periodicidad, $inpFechaInicio, $inpFechaFin, $inpRetroFechaIni, $inpRetroFechaFin, $inpPlanAFechaIni, $inpPlanAFechaFin)
    {
        try {
            $idDecoded = base64_decode($idEvaluaciones);

            // Validación server-side: solo editable si no está publicada
            $check = $this->SelectNotClose("SELECT Activado FROM Evaluaciones WHERE idEvaluaciones = '$idDecoded' LIMIT 1");
            if (count($check) === 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Evaluación no encontrada."
                ]);
            }
            if ((int) $check[0]['Activado'] === 1) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "La evaluación ya está publicada y no puede editarse."
                ]);
            }

            $titulo   = addslashes($inpTitulo);
            $tipo     = (int) $tipoEvaluacion;
            $dirigido = (int) $dirigidoA;
            $period   = ($periodicidad !== null && $periodicidad !== '' && $periodicidad !== 'null') ? "'" . (int) $periodicidad . "'" : "NULL";
            $fechaIni = (!empty($inpFechaInicio) && $inpFechaInicio !== 'null') ? "'" . addslashes($inpFechaInicio) . "'" : "NULL";
            $fechaFin = (!empty($inpFechaFin) && $inpFechaFin !== 'null') ? "'" . addslashes($inpFechaFin) . "'" : "NULL";
            $retroIni = (!empty($inpRetroFechaIni) && $inpRetroFechaIni !== 'null') ? "'" . addslashes($inpRetroFechaIni) . "'" : "NULL";
            $retroFin = (!empty($inpRetroFechaFin) && $inpRetroFechaFin !== 'null') ? "'" . addslashes($inpRetroFechaFin) . "'" : "NULL";
            $planIni  = (!empty($inpPlanAFechaIni) && $inpPlanAFechaIni !== 'null') ? "'" . addslashes($inpPlanAFechaIni) . "'" : "NULL";
            $planFin  = (!empty($inpPlanAFechaFin) && $inpPlanAFechaFin !== 'null') ? "'" . addslashes($inpPlanAFechaFin) . "'" : "NULL";

            $q = "UPDATE Evaluaciones SET
                    Titulo = '$titulo',
                    TipoEvaluacion = '$tipo',
                    DirigidoA = '$dirigido',
                    Periodicidad = $period,
                    FechaInicio = $fechaIni,
                    FechaFin = $fechaFin,
                    RetroFechaIni = $retroIni,
                    RetroFechaFin = $retroFin,
                    PlanAFechaIni = $planIni,
                    PlanAFechaFin = $planFin
                  WHERE idEvaluaciones = '$idDecoded';";
            $this->ExecuteQuery($q, array());

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "Evaluación actualizada con éxito."
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar la evaluación: " . $e->getMessage()
            ]);
        }
    }

    // Reemplaza los participantes (CSV en EmpleadosParticipantes) de una evaluación.
    // Rechaza si la evaluación ya está publicada (Activado = 1).
    public function updateEvaluationParticipants($idEvaluaciones, $empleadosParticipantes)
    {
        try {
            $idDecoded = base64_decode($idEvaluaciones);

            $check = $this->SelectNotClose("SELECT Activado FROM Evaluaciones WHERE idEvaluaciones = '$idDecoded' LIMIT 1");
            if (count($check) === 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Evaluación no encontrada."
                ]);
            }
            if ((int) $check[0]['Activado'] === 1) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "La evaluación ya está publicada y no puede editarse."
                ]);
            }

            // Normalizar CSV (solo números de empleado válidos)
            $lista = array_values(array_filter(array_map('trim', explode(',', $empleadosParticipantes ?? ''))));
            $listaLimpia = array_map(function ($v) { return (int) $v; }, $lista);
            $csv = addslashes(implode(',', $listaLimpia));

            $q = "UPDATE Evaluaciones SET EmpleadosParticipantes = '$csv' WHERE idEvaluaciones = '$idDecoded';";
            $this->ExecuteQuery($q, array());

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "Participantes actualizados con éxito."
            ]);
        } catch (\Exception $e) {
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar participantes: " . $e->getMessage()
            ]);
        }
    }

    public function saveEvaluationNoE($inpTitulo, $tipoEvaluacion, $dirigidoA, $periodicidad, $inpFechaInicio, $inpFechaFin, $inpRetroFechaIni, $inpRetroFechaFin, $inpPlanAFechaIni, $inpPlanAFechaFin, $empleadosParticipantes = "")
    {
        try {
            $period = $periodicidad ? "'$periodicidad'" : "NULL";

            // Construir query dinámicamente - solo incluir columnas de retro/plan si tienen valor
            $columns = "Titulo, TipoEvaluacion, Periodicidad, EmpleadosParticipantes, DirigidoA";
            $values = "'$inpTitulo', '$tipoEvaluacion', $period, '$empleadosParticipantes', '$dirigidoA'";

            // Incluir fechas solo si fueron proporcionadas (evaluaciones para postulantes no las requieren)
            if ($inpFechaInicio && $inpFechaInicio !== 'null') {
                $columns .= ", FechaInicio";
                $values .= ", '$inpFechaInicio'";
            }
            if ($inpFechaFin && $inpFechaFin !== 'null') {
                $columns .= ", FechaFin";
                $values .= ", '$inpFechaFin'";
            }

            // Solo agregar fechas de retro y plan si son proporcionadas (Evaluación 360)
            if ($inpRetroFechaIni && $inpRetroFechaIni !== 'null') {
                $columns .= ", RetroFechaIni";
                $values .= ", '$inpRetroFechaIni'";
            }
            if ($inpRetroFechaFin && $inpRetroFechaFin !== 'null') {
                $columns .= ", RetroFechaFin";
                $values .= ", '$inpRetroFechaFin'";
            }
            if ($inpPlanAFechaIni && $inpPlanAFechaIni !== 'null') {
                $columns .= ", PlanAFechaIni";
                $values .= ", '$inpPlanAFechaIni'";
            }
            if ($inpPlanAFechaFin && $inpPlanAFechaFin !== 'null') {
                $columns .= ", PlanAFechaFin";
                $values .= ", '$inpPlanAFechaFin'";
            }

            $q = "INSERT INTO Evaluaciones($columns) VALUES ($values);";
            $newId = $this->InsertAndGetId($q, array());

            // Mensaje según el tipo
            $tipoMsg = $tipoEvaluacion == 1 ? "Evaluación 360°" : "Encuesta Normal";
            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "idEvaluaciones" => $newId !== false ? base64_encode($newId) : null,
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

    public function getQuestionsPerEvaluation($evaluation)
    {
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

    public function getQuestionsPerRange($evaluation)
    {
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
            $res = $this->Select($q, array());

            return $res;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getQuestionsAnAnswerExpected($evaluation)
    {
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
            $res = $this->Select($q, array());
            for ($i = 0; $i < sizeof($res); $i++) {
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

    public function getQuestionsTrueOrFalse($evaluation)
    {
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

    public function getAmswersQuestionAnExpectedValue($question)
    {
        try {
            $q = "SELECT DescripcionRespuesta AS DescAnswer, idPreguntasPosiblesRespuestas AS IdQuestion, idPreguntasPosiblesRespuestas AS idAnswer, false AS edited
              FROM PreguntasPosiblesRespuestas
              WHERE idPreguntasEvaluacion = '$question'
              GROUP BY IdQuestion ASC;";
            $resAnswers = $this->Select($q, array());

            $Con2 = new Conexiones();
            $q2 = "SELECT RespuestaCorrectaOM AS IdAnswerExpected, idPreguntasConfiguracion AS IdConfigQuestion, false AS edited, '' AS expectedNew, 'old' AS typeExpectedValue
               FROM PreguntasConfiguracion
               WHERE idPreguntasEvaluacion = '$question';";
            $resExpected = $Con2->Select($q2, array());

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

    public function getQuestionsExpectedValue($evaluation)
    {
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
            $res = $this->Select($q, array());
            for ($i = 0; $i < sizeof($res); $i++) {
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

    public function getAmswersQuestionExpectedValue($question)
    {
        try {
            $q = "SELECT DescripcionRespuesta AS DescAnswer, idPreguntasPosiblesRespuestas AS IdQuestion, idPreguntasPosiblesRespuestas AS idAnswer,
              false AS edited
              FROM PreguntasPosiblesRespuestas
              WHERE idPreguntasEvaluacion = '$question'
              GROUP BY IdQuestion ASC;";
            $resAnswers = $this->Select($q, array());

            $Con2 = new Conexiones();
            $q2 = "SELECT RespuestaEsperadoOM AS answerExpected, NivelEmpleadoEsperadoOM AS lvl, idPreguntasEvaluacion AS IdQuestion
               FROM PreguntasConfiguracion
               WHERE idPreguntasEvaluacion = '$question';";
            $resExpected = $Con2->Select($q2, array());

            return [
                "answers" => $resAnswers,
                "expected" => $resExpected
            ];
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function removeAnswerSV($question, $answer, $typeQuestion)
    {
        try {
            if ($typeQuestion == 2) {
                $q = "SELECT COUNT(*) AS CantidadR
                FROM PreguntasConfiguracion
                WHERE idPreguntasEvaluacion = '$question' AND RespuestaEsperadoOM = '$answer';";
            } else {
                $q = "SELECT COUNT(*) AS CantidadR
                FROM PreguntasConfiguracion
                WHERE idPreguntasEvaluacion = '$question' AND RespuestaCorrectaOM = '$answer';";
            }
            $resultado = $this->Select($q);
            if ($resultado[0]["CantidadR"] > 0) {
                $arrReturn = [
                    "Resultado" => true,
                    "Siguiente" => true,
                    "resultFound" => true,
                    "Msg" => "La respuesta que se intenta eliminar ya se encuentra registrada como posible respuesta esperada dentro de la pregunta."
                ];
            } else {
                $Con2 = new Conexiones();
                $q2 = "DELETE FROM PreguntasPosiblesRespuestas WHERE idPreguntasPosiblesRespuestas = '$answer' AND idPreguntasEvaluacion = '$question';";
                $Con2->ExecuteQuery($q2, array());
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

    public function addAnswerExpectedQuestionSV($answer, $question, $lvl)
    {
        try {
            foreach ($lvl as $level) {
                $NewCon = new Conexiones();
                $q = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM)
	               VALUES ('$question','$answer','$level');";
                $NewCon->ExecuteQuery($q, array());
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

    public function deleteResultExpectedSV($lvl, $answer, $question)
    {
        try {
            $q = "DELETE FROM PreguntasConfiguracion
              WHERE idPreguntasEvaluacion = '$question' AND NivelEmpleadoEsperadoOM = '$lvl' AND RespuestaEsperadoOM = '$answer';";
            $this->ExecuteQuery($q, array());
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

    public function saveNewDataOldQuestion($data)
    {
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
                    $this->ExecuteQuery($q, array());
                    if ($dataDecode->expectedValue) {
                        $newTF = 1;
                    } else {
                        $newTF = 0;
                    }
                    $ConTF = new Conexiones();
                    $qTF = "UPDATE PreguntasConfiguracion SET BoolCorreta = '$newTF'
                      WHERE idPreguntasEvaluacion = '$idQuestion';";
                    $ConTF->ExecuteQuery($qTF, array());
                }
            } elseif ($typeQuesiton == 2) {
                if ($dataDecode->edited) {
                    $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
                    $this->ExecuteQuery($q, array());
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
                        $contentUpdateAnswer = $contentUpdateAnswer . "UPDATE PreguntasPosiblesRespuestas SET DescripcionRespuesta = '$ansEdited->DescAnswer'
                                                              WHERE idPreguntasPosiblesRespuestas = '$ansEdited->idAnswer' AND idPreguntasEvaluacion = '$idQuestion'; \n";
                    }
                    $ConUpdateAnswers->ExecuteQuery($contentUpdateAnswer, array());
                }
                if (count($dataDecode->newAnswers) > 0) {
                    $answersNew = $dataDecode->newAnswers;
                    $arrRespuestasEsperadas = [];
                    for ($i = 0; $i < sizeof($answersNew); $i++) {
                        $ConInsertAnswer = new Conexiones();
                        $queryInsertAnswer = "CALL sp_AddRespuestaPregunta('$idQuestion','$answersNew[$i]')";
                        $res = $ConInsertAnswer->Procedure($queryInsertAnswer, array());
                        if (sizeof($res) > 0) {
                            $IdRespuesta = $res[0]["IdRespuesta"];
                            if (count($dataDecode->expectedValueNew) > 0) {
                                $expectedVal = $dataDecode->expectedValueNew;
                                for ($j = 0; $j < sizeof($expectedVal); $j++) {
                                    if ($expectedVal[$j]->answer == $i) {
                                        array_push($arrRespuestasEsperadas, [
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
                        $ContentExpectedFinal = substr($ContentExpected, 0, -1);
                        $ConAddAnswerExpected = new Conexiones();
                        $queryAddAnswerExpected = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM) VALUES $ContentExpectedFinal;";
                        $ConAddAnswerExpected->ExecuteQuery($queryAddAnswerExpected, array());
                    }
                }
            } elseif ($typeQuesiton == 3) {
                if ($dataDecode->edited) {
                    $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
                    $this->ExecuteQuery($q, array());

                    $ConUpdateRange = new Conexiones();
                    $queryUpdateRange = "UPDATE PreguntasConfiguracion SET RangoInicial = '$dataDecode->rangeInitial', RangoFinal = '$dataDecode->rangeEnd'
                      WHERE idPreguntasEvaluacion = '$idQuestion';";
                    $ConUpdateRange->ExecuteQuery($queryUpdateRange, array());
                }
            } elseif ($typeQuesiton == 4) {
                if ($dataDecode->edited) {
                    $q = "UPDATE PreguntasEvaluacion SET Titulo = '$dataDecode->titleQuestion', Descripcion = '$dataDecode->descriptionQuestion', idCompetencias = '$competenceDecode'
                  WHERE idPreguntasEvaluacion = '$idQuestion';";
                    $this->ExecuteQuery($q, array());
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
                        $contentUpdateAnswer = $contentUpdateAnswer . "UPDATE PreguntasPosiblesRespuestas SET DescripcionRespuesta = '$ansEdited->DescAnswer'
                                                              WHERE idPreguntasPosiblesRespuestas = '$ansEdited->idAnswer' AND idPreguntasEvaluacion = '$idQuestion'; \n";
                    }
                    $ConUpdateAnswers->ExecuteQuery($contentUpdateAnswer, array());
                }
                $arrNewResponsesGen = [];
                $varExpectedValues = $dataDecode->expectedValue;
                if (count($dataDecode->newAnswers) > 0) {
                    $answersNew = $dataDecode->newAnswers;
                    for ($i = 0; $i < sizeof($answersNew); $i++) {
                        $ConInsertAnswer = new Conexiones();
                        $queryInsertAnswer = "CALL sp_AddRespuestaPregunta('$idQuestion','$answersNew[$i]')";
                        $res = $ConInsertAnswer->Procedure($queryInsertAnswer, array());
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
                        for ($i = 0; $i < count($arrNewResponsesGen); $i++) {
                            if ($arrNewResponsesGen[$i]["PositionArr"] == $varExpectedValues->expectedNew) {
                                $newAnswerExpected = $arrNewResponsesGen[$i]["IdRespuesta"];
                                break;
                            }
                        }
                        $queryUpdateAnExpected = "UPDATE PreguntasConfiguracion SET RespuestaCorrectaOM = '$newAnswerExpected'
                                           WHERE idPreguntasConfiguracion = '$varExpectedValues->IdConfigQuestion' AND idPreguntasEvaluacion = '$idQuestion';";
                    }
                    $ConUpdateAnExpected->ExecuteQuery($queryUpdateAnExpected, array());
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

    public function deleteQuestionSaved($idQuestion)
    {
        try {
            $q = "CALL sp_EliminaPregunta('$idQuestion');";
            $this->Procedure($q, array());
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

    public function shareEvaluation($dataEvaluation, $evaluation)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $evaluation = base64_decode($evaluation);
            $InstEspera = new Evaluaciones();
            $ResultEspera = $InstEspera->addEsperaEvaluacion($dataEvaluation);
            if ($ResultEspera) {
                $q = "CALL sp_PublicarEvaluacion(?,?)";
                // $q2 = "CALL sp_PublicarEvaluacion('$NoEmpleado','$evaluation')";
                // $q = "CALL sp_PublicarEvaluacion('11823','28')";
                $resProcedure = $this->ProcedureWithParam($q, array($NoEmpleado, $evaluation));
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

    public function getQuestionTypes()
    {
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

    public function getCompetencesActive()
    {
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

    public function saveQuestionsConfig($evaluation, $data)
    {
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

            for ($i = 0; $i < count($data); $i++) {
                $typeQuestionDec = base64_decode($data[$i]->typeQuestion);
                $competenceDec = base64_decode($data[$i]->competence);
                $titleQuestion = $data[$i]->titleQuestion;
                $descriptionQuestion = $data[$i]->descriptionQuestion;

                // Usar stored procedure
                $q = "CALL sp_AddNuevaPregunta('$evaluation','$typeQuestionDec','$competenceDec','$titleQuestion','$descriptionQuestion');";
                error_log("saveQuestionsConfig - Ejecutando query: " . $q);
                $resProc = $this->Procedure($q, array());
                error_log("saveQuestionsConfig - Resultado procedimiento: " . print_r($resProc, true));

                if ($resProc !== null && is_array($resProc) && count($resProc) > 0) {
                    $QuestionGenId = $resProc[0]["IdPreguntaGen"];
                    $InstConfigQuestion = new Evaluaciones();
                    if ($typeQuestionDec == 1) {
                        $ResConfig = $InstConfigQuestion->addAnswerTrueOrFalse($QuestionGenId, $data[$i]->expectedValue);
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
                    error_log("saveQuestionsConfig - Error: El procedimiento sp_AddNuevaPregunta no devolvió resultados para la pregunta " . ($i + 1));
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

    public function addRangeValuesPerQuestion($vInital, $vEnd, $idQuestion)
    {
        try {
            $q = "INSERT INTO PreguntasConfiguracion(idPreguntasEvaluacion, RangoInicial, RangoFinal)
	               VALUES('$idQuestion','$vInital','$vEnd');";
            $this->ExecuteQuery($q, array());

            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function addAnswerAnExpetedValue($answers, $expectedVal, $idQuestion)
    {
        try {
            // Validar que $answers sea un array
            if (!is_array($answers) || count($answers) === 0) {
                error_log("addAnswerAnExpetedValue - answers no es un array válido: " . print_r($answers, true));

                return false;
            }

            $answerExpected = "";
            for ($i = 0; $i < count($answers); $i++) {
                $NewCon = new Conexiones();
                $q = "CALL sp_AddRespuestaPregunta('$idQuestion','$answers[$i]')";
                $res = $NewCon->Procedure($q, array());
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
            $Con2->ExecuteQuery($q2, array());

            return true;
        } catch (\Exception $e) {
            error_log("addAnswerAnExpetedValue - Exception: " . $e->getMessage());

            return $e;
        }
    }

    public function addAnswerExpetedValue($answers, $expectedVal, $idQuestion)
    {
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
            for ($i = 0; $i < count($answers); $i++) {
                $NewCon = new Conexiones();
                $q = "CALL sp_AddRespuestaPregunta('$idQuestion','$answers[$i]')";
                $res = $NewCon->Procedure($q, array());
                if (is_array($res) && count($res) > 0) {
                    $IdRespuesta = $res[0]["IdRespuesta"];
                    for ($j = 0; $j < count($expectedVal); $j++) {
                        if ($expectedVal[$j]->answer == $i) {
                            array_push($arrRespuestasEsperadas, [
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
            $ContentExpectedFinal = substr($ContentExpected, 0, -1);
            $Con2 = new Conexiones();
            $q2 = "INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM) VALUES $ContentExpectedFinal;";
            $Con2->ExecuteQuery($q2, array());

            return true;
        } catch (\Exception $e) {
            error_log("addAnswerExpetedValue - Exception: " . $e->getMessage());

            return $e;
        }
    }

    public function addAnswerTrueOrFalse($question, $res)
    {
        try {
            if ($res == true) {
                $newVal = 1;
            } else {
                $newVal = 0;
            }
            $q = "INSERT INTO PreguntasConfiguracion(idPreguntasEvaluacion, BoolCorreta)
                VALUES ('$question','$newVal');";
            $this->ExecuteQuery($q, array());

            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function saveDataCompetenceSF($action, $typeC, $nameC, $signF, $selectedC)
    {
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
            $this->ExecuteQuery($q, array());
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

    public function getLevelOfTheEvaluatedPerEvaluation($employee, $evaluation)
    {
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

    public function getAllEvaluationDetail($evaluation, $employee)
    {
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
            if (sizeof($resultado) > 0) {
                return $resultado;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getListEvaluatorsDetail($employee, $evaluation)
    {
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

    public function getEvaluationInsights($evaluation, $employee)
    {
        try {
            $qCoverage = "SELECT
                COUNT(*) AS TotalAsignados,
                SUM(CASE WHEN StatusEvaluado = 1 THEN 1 ELSE 0 END) AS TotalCompletados,
                SUM(CASE WHEN StatusEvaluado = 0 THEN 1 ELSE 0 END) AS TotalPendientes,
                SUM(CASE WHEN JefeEvalua = 1 THEN 1 ELSE 0 END) AS AsigJefe,
                SUM(CASE WHEN AutoEvalua = 1 THEN 1 ELSE 0 END) AS AsigAuto,
                SUM(CASE WHEN ParEvalua = 1 THEN 1 ELSE 0 END) AS AsigPar,
                SUM(CASE WHEN SubordinadoEvalua = 1 THEN 1 ELSE 0 END) AS AsigSub,
                SUM(CASE WHEN JefeEvalua = 1 AND StatusEvaluado = 1 THEN 1 ELSE 0 END) AS CompJefe,
                SUM(CASE WHEN AutoEvalua = 1 AND StatusEvaluado = 1 THEN 1 ELSE 0 END) AS CompAuto,
                SUM(CASE WHEN ParEvalua = 1 AND StatusEvaluado = 1 THEN 1 ELSE 0 END) AS CompPar,
                SUM(CASE WHEN SubordinadoEvalua = 1 AND StatusEvaluado = 1 THEN 1 ELSE 0 END) AS CompSub
                FROM EvaluacionDetalle
                WHERE TO_BASE64(idEvaluaciones) = '$evaluation'
                  AND TO_BASE64(NoEmpleadoEvaluado) = '$employee'
                  AND Status = 1;";

            $resCoverage = $this->Select($qCoverage);

            $qLastUpdate = "SELECT MAX(RE.Registro) AS UltimaRespuesta
                FROM RespuestaEvaluaciones AS RE
                INNER JOIN EvaluacionDetalle AS ED ON ED.idEvaluacionDetalle = RE.idEvaluacionDetalle
                WHERE TO_BASE64(ED.idEvaluaciones) = '$evaluation'
                  AND TO_BASE64(ED.NoEmpleadoEvaluado) = '$employee';";
            $resLastUpdate = $this->Select($qLastUpdate);

            $qAvgCoverage = "SELECT AVG(tmp.Cobertura) AS PromedioCobertura
                FROM (
                    SELECT
                      ED.NoEmpleadoEvaluado,
                      (SUM(CASE WHEN ED.StatusEvaluado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS Cobertura
                    FROM EvaluacionDetalle AS ED
                    WHERE TO_BASE64(ED.idEvaluaciones) = '$evaluation'
                      AND ED.Status = 1
                    GROUP BY ED.NoEmpleadoEvaluado
                ) AS tmp;";
            $resAvgCoverage = $this->Select($qAvgCoverage);

            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => [
                    "Coverage" => $resCoverage[0],
                    "LastUpdate" => $resLastUpdate[0],
                    "AvgCoverage" => $resAvgCoverage[0]
                ]
            ];

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getConfigQuestionsEvaluated($evaluation, $employee)
    {
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
                    $qAnswers = "SELECT PPR.idPreguntasPosiblesRespuestas AS Respuesta, TO_BASE64(PPR.idPreguntasEvaluacion) AS IdPregunta
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

    public function checkTemporaryDataEvaluation($evaluation, $branchL)
    {
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
                    "ConMsg" => false,
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
                    $resProc = $Con2->ProcedureWithParam($qInsertaDatos, array($evaluation));
                }
                if (count($resProc) > 0) {
                    $resInst = $InstDetalle->getDetailTempEvaluation($evaluation, $branchL);
                    $arrReturn = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "Data" => $resInst,
                        "ConMsg" => false,
                        "Msg" => "Se han añadido los registros temporales y posteriormente se han obtenido con éxito."
                    ];
                }
            }

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getDetailTempEvaluation($evaluation, $branchL)
    {
        try {
            $addBranch = "";
            foreach ($branchL as $b) {
                $decode = base64_decode($b);
                $addBranch = $addBranch . " E.IdSucursal = $decode OR";
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

    public function updateStatusTempDetEv($newVal, $detEv)
    {
        try {
            $detEv = base64_decode($detEv);
            $q = "UPDATE EvaluacionDetalle SET Status = ?
              WHERE idEvaluacionDetalle = ?;";
            $this->ExecuteQueryWithParam($q, array($newVal, $detEv));
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

    public function addEmpleadoEvaluadorTempData($nidEvaluaciones, $nNoEmpleadoEvalua, $nNoEmpleadoEvaluado, $nTipoEvaluador)
    {
        try {
            $nidEvaluaciones = base64_decode($nidEvaluaciones);
            $q = "CALL spAddEvaluador('$nidEvaluaciones','$nNoEmpleadoEvalua','$nNoEmpleadoEvaluado','$nTipoEvaluador')";
            $resultado = $this->Procedure($q, array());
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

    public function deleteEvaluatorDetail($evDetail)
    {
        try {
            $evDetail = base64_decode($evDetail);
            $q = "CALL sp_EliminaEvaluadorDetalle(?)";
            $this->ProcedureWithParam($q, array($evDetail));
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

    public function acceptPublicationOfTheEvaluation($ev)
    {
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
                    foreach ($participantes as $part) {
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
                                    if ($puesto === 'NULL' || $puesto === '') {
                                        $puesto = 'NULL';
                                    } else {
                                        $puesto = "'$puesto'";
                                    }
                                    if ($nivel === 'NULL' || $nivel === '') {
                                        $nivel = 'NULL';
                                    } else {
                                        $nivel = "'$nivel'";
                                    }

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

            // Notificar a cada evaluador asignado
            try {
                require_once(__DIR__ . '/../Notifications/Notifications.php');
                $tituloInfo = $this->SelectNotClose("SELECT Titulo FROM Evaluaciones WHERE idEvaluaciones = '$evDecoded'");
                $titulo = $tituloInfo[0]['Titulo'] ?? 'Evaluación';
                $evaluadores = $this->SelectNotClose(
                    "SELECT DISTINCT NoEmpleadoEvalua FROM EvaluacionDetalle WHERE idEvaluaciones = '$evDecoded' AND Status = 1"
                );
                $notifService = new Notifications();
                foreach ($evaluadores as $row) {
                    $notifService->insertNotification(
                        $row['NoEmpleadoEvalua'],
                        'evaluation',
                        'Evaluación pendiente',
                        "Tienes una evaluación pendiente: $titulo",
                        'pending-evaluations.php',
                        (int) $evDecoded,
                        'Evaluaciones'
                    );
                }
            } catch (\Exception $notifEx) {
                error_log('[acceptPublicationOfTheEvaluation] Notif error: ' . $notifEx->getMessage());
            }

            // Push notifications a la app móvil vía API .NET
            try {
                $tituloInfo2 = $this->SelectNotClose("SELECT Titulo FROM Evaluaciones WHERE idEvaluaciones = '$evDecoded'");
                $tituloEv = $tituloInfo2[0]['Titulo'] ?? 'Evaluación';
                $pushPayload = json_encode([
                    'titulo' => 'Nueva evaluación disponible',
                    'cuerpo' => "Tienes una nueva evaluación pendiente: $tituloEv",
                ]);
                $apiUrl = defined('DOTNET_API_URL') ? DOTNET_API_URL : 'http://localhost:5000';
                $internalKey = defined('DOTNET_INTERNAL_KEY') ? DOTNET_INTERNAL_KEY : 'pip-internal-2025-X9kLmQ7rNvTz';
                $ch = curl_init("$apiUrl/api/notificacion/internal/evaluacion/$evDecoded/notificar");
                curl_setopt_array($ch, [
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_POST => true,
                    CURLOPT_POSTFIELDS => $pushPayload,
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json',
                        "X-Internal-Key: $internalKey",
                        'ngrok-skip-browser-warning: 1',
                    ],
                    CURLOPT_TIMEOUT => 10,
                    CURLOPT_SSL_VERIFYPEER => false,
                ]);
                $pushResult = curl_exec($ch);
                $curlErr = curl_error($ch);
                if ($curlErr) {
                    error_log("[acceptPublicationOfTheEvaluation] Push móvil curl error: $curlErr");
                } else {
                    error_log("[acceptPublicationOfTheEvaluation] Push móvil result: $pushResult");
                }
            } catch (\Exception $pushEx) {
                error_log('[acceptPublicationOfTheEvaluation] Push móvil error: ' . $pushEx->getMessage());
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

    public function getPendingEvaluationsWidget(): string
    {
        try {
            $NoEmpleado = SessionManager::get('NoEmpleado');
            $q = "SELECT TO_BASE64(E.idEvaluaciones) AS id, E.Titulo, E.FechaFin,
                         COUNT(ED.idEvaluacionDetalle) AS Total,
                         SUM(ED.StatusEvaluado) AS Completadas
                  FROM Evaluaciones E
                  INNER JOIN EvaluacionDetalle ED ON ED.idEvaluaciones = E.idEvaluaciones
                  WHERE E.Activado = 1 AND E.Status = 1
                    AND DATE_FORMAT(NOW(),'%Y-%m-%d') BETWEEN E.FechaInicio AND E.FechaFin
                    AND ED.NoEmpleadoEvalua = '$NoEmpleado'
                    AND ED.StatusEvaluado = 0
                  GROUP BY E.idEvaluaciones, E.Titulo, E.FechaFin
                  HAVING SUM(ED.StatusEvaluado) < COUNT(ED.idEvaluacionDetalle)";
            $rows = $this->Select($q, []);
            return json_encode(['Resultado' => true, 'Siguiente' => true, 'Data' => $rows ?? []]);
        } catch (\Exception $e) {
            error_log('[getPendingEvaluationsWidget] ' . $e->getMessage());
            return json_encode(['Resultado' => false, 'Siguiente' => false, 'Data' => []]);
        }
    }

    public function acceptQuestionsEv($iEvaluation)
    {
        try {
            $iEvaluation = base64_decode($iEvaluation);
            $q = "UPDATE Evaluaciones SET PreguntasAceptadas = 1
              WHERE idEvaluaciones = ?;";
            $this->ExecuteQueryWithParam($q, array($iEvaluation));
            $arrReturn = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => false,
                "Msg" => "Se han aceptado las preguntas para la evaluación seleccionada."
            ];

            return json_encode($arrReturn);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function deleteAllDetailPerBranch($branch, $ev)
    {
        try {
            $branch = base64_decode($branch);
            $ev = base64_decode($ev);
            $q = "CALL sp_eliminarDetalleEvaluadoresSucursal(?,?)";
            $this->ExecuteQueryWithParam($q, array($ev, $branch));
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

    public function getInitialConfigEvaluation($ev)
    {
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

    public function saveConfigEvaluationBr($typeOption, $branchSel, $typeSelBranch, $ev)
    {
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
                } elseif ($typeSelBranch == 2) {
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

    public function getTypeEvaluationConf($ev)
    {
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

    // Reconfigura las sucursales de un 360 BORRADOR: limpia la matriz temporal
    // y la config previa, y guarda la nueva selección como personalizada (incluir).
    // La matriz se regenera scopeada (SP PERZ) en el siguiente checkTemporaryDataEvaluation.
    // $ev: id decodificado. $branchSel: array de IdSucursal en base64.
    public function resetBranchConfigForEvaluation($ev, $branchSel)
    {
        try {
            $chk = $this->SelectNotClose("SELECT Activado FROM Evaluaciones WHERE idEvaluaciones = '$ev'");
            if (count($chk) === 0) {
                return json_encode(["Resultado" => false, "Siguiente" => false, "ConMsg" => true, "Msg" => "Evaluación no encontrada."]);
            }
            if ((int) $chk[0]['Activado'] === 1) {
                return json_encode(["Resultado" => false, "Siguiente" => false, "ConMsg" => true, "Msg" => "La evaluación ya está publicada; no se puede reconfigurar."]);
            }

            $this->ExecuteQueryWithParam("DELETE FROM EvaluacionDetalle WHERE idEvaluaciones = ?", [$ev]);
            $this->ExecuteQueryWithParam("DELETE FROM ConfiguracionInicialEvaluacion WHERE idEvaluaciones = ?", [$ev]);

            if (is_array($branchSel) && count($branchSel) > 0) {
                $this->addBranchesSelectedForEvaluation($branchSel, $ev);
            }
            $this->ExecuteQueryWithParam("UPDATE Evaluaciones SET TipoOpcionConfiguracion = 1, TipoSeleccionaSucursal = 1 WHERE idEvaluaciones = ?", [$ev]);

            return json_encode(["Resultado" => true, "Siguiente" => true, "ConMsg" => false, "Msg" => "Configuración de sucursales actualizada."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "ConMsg" => true, "Msg" => "Error al reconfigurar: " . $e->getMessage()]);
        }
    }

    // Cuenta los pares de la matriz temporal (EvaluacionDetalle) de una evaluación.
    // Permite al wizard saber si ya está configurada y saltar al paso de publicar.
    public function countTempEvaluators($ev)
    {
        try {
            $res = $this->Select("SELECT COUNT(*) AS Count FROM EvaluacionDetalle WHERE idEvaluaciones = '$ev'");
            return json_encode(["Resultado" => true, "Siguiente" => true, "Count" => (int) ($res[0]['Count'] ?? 0)]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Count" => 0, "Msg" => $e->getMessage()]);
        }
    }

    public function getListBranchInEvaluation($ev)
    {
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
                for ($i = 0; $i < $cant; $i++) {
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

    public function getListBranchNewEv()
    {
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
                for ($i = 0; $i < $cantRes; $i++) {
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

    public function addBranchesSelectedForEvaluation($listBranch, $evaluation)
    {
        try {
            $cantD = count($listBranch);
            for ($i = 0; $i < $cantD; $i++) {
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
    public function getDivisionesEvaluacion()
    {
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

    public function getSucursalesXDivisionEvaluacion($IdDivision)
    {
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

    public function getPuestosEvaluacion()
    {
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

    public function getEmpleadosParaEvaluacion($IdDivision = "", $IdSucursal = "", $IdPuesto = "")
    {
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

    // ==========================================
    // EVALUACIONES PARA POSTULANTES
    // ==========================================

    /**
     * Obtener evaluaciones pendientes/completadas de un postulante en una vacante
     */
    public function getEvaluacionesPostulante($IdPostulanteVacante)
    {
        try {
            $IdPostulanteVacante = intval(base64_decode($IdPostulanteVacante));
            $q = "SELECT pe.IdPostulanteEvaluacion, pe.IdPostulanteVacante, pe.IdVacanteEvaluacion,
                     pe.FechaInicio, pe.FechaFinalizacion, pe.Calificacion, pe.EstatusEvaluacion,
                     e.Titulo AS NombreEvaluacion, e.idEvaluaciones,
                     TO_BASE64(e.idEvaluaciones) AS IdEvaluacionB64,
                     TO_BASE64(pe.IdPostulanteEvaluacion) AS IdPostulanteEvaluacionB64,
                     pv.NombreProceso,
                     CASE pe.EstatusEvaluacion
                       WHEN 1 THEN 'Pendiente'
                       WHEN 2 THEN 'En progreso'
                       WHEN 3 THEN 'Completada'
                     END AS TxEstatus
              FROM PostulantesEvaluaciones pe
              INNER JOIN VacantesEvaluaciones ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
              INNER JOIN Evaluaciones e ON e.idEvaluaciones = ve.IdEvaluacion
              INNER JOIN ProcesosVacantes pv ON pv.IdProceso = ve.IdProceso
              WHERE pe.IdPostulanteVacante = $IdPostulanteVacante
              ORDER BY pv.IdProceso ASC, e.Titulo ASC";
            $resultado = $this->Select($q);

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getEvaluacionesPostulante: " . $e->getMessage());

            return json_encode(["Resultado" => false, "Data" => [], "Msg" => $e->getMessage()]);
        }
    }

    /**
     * Obtener preguntas de una evaluación para que el postulante la conteste
     */
    public function getPreguntasEvaluacionPostulante($IdPostulanteEvaluacion)
    {
        try {
            $IdPostulanteEvaluacion = intval(base64_decode($IdPostulanteEvaluacion));

            // Obtener el idEvaluaciones desde PostulantesEvaluaciones
            $qEval = "SELECT ve.IdEvaluacion, pe.EstatusEvaluacion
                  FROM PostulantesEvaluaciones pe
                  INNER JOIN VacantesEvaluaciones ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                  WHERE pe.IdPostulanteEvaluacion = $IdPostulanteEvaluacion";
            $resEval = $this->Select($qEval);

            if (count($resEval) == 0) {
                return json_encode(["Resultado" => false, "Msg" => "Evaluación no encontrada."]);
            }

            $idEvaluacion = $resEval[0]['IdEvaluacion'];
            $estatus = $resEval[0]['EstatusEvaluacion'];

            // Obtener preguntas con sus respuestas posibles
            $qPreguntas = "SELECT PE.idPreguntasEvaluacion AS IdPregunta,
                              PE.Titulo, PE.Descripcion, PE.idTipoPregunta,
                              TP.Descripcion AS TipoPregunta,
                              C.Competencia
                       FROM PreguntasEvaluacion PE
                       INNER JOIN TipoPregunta TP ON TP.idTipoPregunta = PE.idTipoPregunta
                       LEFT JOIN Competencias C ON C.idCompetencias = PE.idCompetencias
                       WHERE PE.idEvaluaciones = '$idEvaluacion'
                       ORDER BY PE.idPreguntasEvaluacion ASC";
            $preguntas = $this->Select($qPreguntas);

            // Para cada pregunta, obtener respuestas posibles y configuración
            for ($i = 0; $i < count($preguntas); $i++) {
                $idPregunta = $preguntas[$i]['IdPregunta'];

                if ($preguntas[$i]['idTipoPregunta'] == 2 || $preguntas[$i]['idTipoPregunta'] == 4) {
                    // Opción múltiple - obtener respuestas posibles
                    $Con2 = new Conexiones();
                    $qResp = "SELECT idPreguntasPosiblesRespuestas, DescripcionRespuesta
                      FROM PreguntasPosiblesRespuestas
                      WHERE idPreguntasEvaluacion = '$idPregunta'
                      ORDER BY idPreguntasPosiblesRespuestas ASC";
                    $preguntas[$i]['Respuestas'] = $Con2->Select($qResp);
                } elseif ($preguntas[$i]['idTipoPregunta'] == 3) {
                    // Rango
                    $Con2 = new Conexiones();
                    $qConf = "SELECT RangoInicial, RangoFinal
                      FROM PreguntasConfiguracion
                      WHERE idPreguntasEvaluacion = '$idPregunta'";
                    $resConf = $Con2->Select($qConf);
                    $preguntas[$i]['Config'] = count($resConf) > 0 ? $resConf[0] : null;
                }

                // Obtener respuesta previa del postulante (si existe)
                $Con3 = new Conexiones();
                $qPrev = "SELECT Respuesta FROM PostulantesRespuestas
                    WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                      AND IdPreguntasEvaluacion = '$idPregunta'";
                $resPrev = $Con3->Select($qPrev);
                $preguntas[$i]['RespuestaPrevia'] = count($resPrev) > 0 ? $resPrev[0]['Respuesta'] : null;
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $preguntas,
                "Estatus" => $estatus
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPreguntasEvaluacionPostulante: " . $e->getMessage());

            return json_encode(["Resultado" => false, "Msg" => $e->getMessage()]);
        }
    }

    /**
     * Guardar respuesta individual del postulante
     */
    public function saveRespuestaPostulante($IdPostulanteEvaluacion, $IdPregunta, $Respuesta)
    {
        try {
            $IdPostulanteEvaluacion = intval(base64_decode($IdPostulanteEvaluacion));
            $IdPregunta = intval($IdPregunta);
            $Respuesta = $this->sanitize($Respuesta);

            $qConfig = "SELECT BoolCorreta
                    FROM PreguntasConfiguracion
                    WHERE idPreguntasEvaluacion = $IdPregunta
                    LIMIT 1";
            $resConfig = $this->Select($qConfig);
            if (count($resConfig) > 0 && $resConfig[0]['BoolCorreta'] !== null) {
                $respuestaNormalizada = mb_strtolower(trim($Respuesta), 'UTF-8');
                if (in_array($respuestaNormalizada, ['1', 'true', 'verdadero'], true)) {
                    $Respuesta = '1';
                } elseif (in_array($respuestaNormalizada, ['0', 'false', 'falso'], true)) {
                    $Respuesta = '0';
                }
            }

            // Marcar evaluación como "En progreso" si está pendiente
            $Con2 = new Conexiones();
            $Con2->ExecuteQuery("UPDATE PostulantesEvaluaciones SET EstatusEvaluacion = 2,
                             FechaInicio = IFNULL(FechaInicio, NOW())
                             WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                               AND EstatusEvaluacion = 1", array());

            // Verificar si ya existe respuesta
            $qCheck = "SELECT IdPostulanteRespuesta FROM PostulantesRespuestas
                   WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                     AND IdPreguntasEvaluacion = $IdPregunta";
            $resCheck = $this->Select($qCheck);

            if (count($resCheck) > 0) {
                // Actualizar
                $Con3 = new Conexiones();
                $Con3->ExecuteQuery("UPDATE PostulantesRespuestas
                               SET Respuesta = '$Respuesta', FechaRespuesta = NOW()
                               WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                                 AND IdPreguntasEvaluacion = $IdPregunta", array());
            } else {
                // Insertar nueva
                $Con3 = new Conexiones();
                $Con3->ExecuteQuery("INSERT INTO PostulantesRespuestas
                               (IdPostulanteEvaluacion, IdPreguntasEvaluacion, Respuesta)
                               VALUES ($IdPostulanteEvaluacion, $IdPregunta, '$Respuesta')", array());
            }

            return json_encode(["Resultado" => true, "Siguiente" => true]);
        } catch (\Exception $e) {
            error_log("Error en saveRespuestaPostulante: " . $e->getMessage());

            return json_encode(["Resultado" => false, "Msg" => $e->getMessage()]);
        }
    }

    /**
     * Finalizar evaluación del postulante y calcular calificación
     */
    public function finalizarEvaluacionPostulante($IdPostulanteEvaluacion)
    {
        try {
            $IdPostulanteEvaluacion = intval(base64_decode($IdPostulanteEvaluacion));

            // Contar preguntas totales y respondidas
            $qTotal = "SELECT COUNT(*) AS Total FROM PreguntasEvaluacion
                   WHERE idEvaluaciones = (
                     SELECT ve.IdEvaluacion FROM PostulantesEvaluaciones pe
                     INNER JOIN VacantesEvaluaciones ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                     WHERE pe.IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                   )";
            $resTotal = $this->Select($qTotal);
            $totalPreguntas = $resTotal[0]['Total'];

            $Con2 = new Conexiones();
            $qRespondidas = "SELECT COUNT(*) AS Respondidas FROM PostulantesRespuestas
                         WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion";
            $resRespondidas = $Con2->Select($qRespondidas);
            $respondidas = $resRespondidas[0]['Respondidas'];

            if ($respondidas < $totalPreguntas) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "Faltan " . ($totalPreguntas - $respondidas) . " preguntas por responder."
                ]);
            }

            // Calcular calificación basada en las respuestas correctas
            $Con3 = new Conexiones();
            $qCalc = "SELECT
                    COUNT(*) AS TotalPreguntas,
                    SUM(CASE
                      WHEN pc.BoolCorreta IS NOT NULL AND (
                          (pc.BoolCorreta = 1 AND LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) IN ('1', 'true', 'verdadero'))
                          OR (pc.BoolCorreta = 0 AND LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) IN ('0', 'false', 'falso'))
                      ) THEN 1
                      WHEN pc.RespuestaCorrectaOM IS NOT NULL AND (
                          LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) = LOWER(TRIM(CONVERT(CAST(pc.RespuestaCorrectaOM AS CHAR) USING utf8mb4)))
                          OR LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) = LOWER(TRIM(CONVERT(ppr.DescripcionRespuesta USING utf8mb4)))
                      ) THEN 1
                      ELSE 0
                    END) AS Correctas
                  FROM PostulantesRespuestas pr
                  INNER JOIN PreguntasEvaluacion pe ON pe.idPreguntasEvaluacion = pr.IdPreguntasEvaluacion
                  LEFT JOIN PreguntasConfiguracion pc ON pc.idPreguntasEvaluacion = pe.idPreguntasEvaluacion
                  LEFT JOIN PreguntasPosiblesRespuestas ppr ON ppr.idPreguntasPosiblesRespuestas = pc.RespuestaCorrectaOM
                  WHERE pr.IdPostulanteEvaluacion = $IdPostulanteEvaluacion";
            $resCalc = $Con3->Select($qCalc);

            $totalP = max($resCalc[0]['TotalPreguntas'], 1);
            $correctas = $resCalc[0]['Correctas'] ?? 0;
            $calificacion = round(($correctas / $totalP) * 100, 2);

            // Actualizar la evaluación como completada
            $Con4 = new Conexiones();
            $Con4->ExecuteQuery("UPDATE PostulantesEvaluaciones
                             SET EstatusEvaluacion = 3,
                                 FechaFinalizacion = NOW(),
                                 Calificacion = $calificacion
                             WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion", array());

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "¡Evaluación finalizada! Calificación: $calificacion%",
                "Calificacion" => $calificacion
            ]);
        } catch (\Exception $e) {
            error_log("Error en finalizarEvaluacionPostulante: " . $e->getMessage());

            return json_encode(["Resultado" => false, "Msg" => $e->getMessage()]);
        }
    }

    /**
     * Obtener resultados comparativos de postulantes en una vacante para una evaluación
     * (Para gráficas del admin)
     */
    public function getResultadosComparativosPostulantes($IdVacante, $IdEvaluacion)
    {
        try {
            $IdVacante = intval(base64_decode($IdVacante));
            $IdEvaluacion = intval(base64_decode($IdEvaluacion));

            // Obtener todos los postulantes que completaron esta evaluación en esta vacante
            $q = "SELECT pe.IdPostulanteEvaluacion, pe.Calificacion, pe.FechaFinalizacion,
                     pe.EstatusEvaluacion,
                     CONCAT(p.Nombre, ' ', p.ApellidoPaterno, ' ', IFNULL(p.ApellidoMaterno, '')) AS NombrePostulante,
                     p.IdPostulante,
                     TO_BASE64(pe.IdPostulanteEvaluacion) AS IdPostulanteEvaluacionB64
              FROM PostulantesEvaluaciones pe
              INNER JOIN VacantesEvaluaciones ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
              INNER JOIN PostulantesVacantes pvac ON pvac.IdPostulanteVacante = pe.IdPostulanteVacante
              INNER JOIN Postulantes p ON p.IdPostulante = pvac.IdPostulante
              WHERE ve.IdVacante = '$IdVacante'
                AND ve.IdEvaluacion = '$IdEvaluacion'
              ORDER BY pe.Calificacion DESC";
            $postulantes = $this->Select($q);

            // Obtener competencias/categorías de la evaluación para el radar chart
            $Con2 = new Conexiones();
            $qComp = "SELECT DISTINCT C.Competencia, C.idCompetencias
                  FROM PreguntasEvaluacion PE
                  INNER JOIN Competencias C ON C.idCompetencias = PE.idCompetencias
                  WHERE PE.idEvaluaciones = '$IdEvaluacion'
                  ORDER BY C.Competencia ASC";
            $competencias = $Con2->Select($qComp);

            // Para cada postulante, obtener desglose por competencia
            for ($i = 0; $i < count($postulantes); $i++) {
                $idPE = $postulantes[$i]['IdPostulanteEvaluacion'];
                $desglose = [];

                foreach ($competencias as $comp) {
                    $idComp = $comp['idCompetencias'];
                    $Con3 = new Conexiones();
                    $qDesg = "SELECT
                        COUNT(*) AS Total,
                        SUM(CASE
                          WHEN pc.BoolCorreta IS NOT NULL AND (
                              (pc.BoolCorreta = 1 AND LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) IN ('1', 'true', 'verdadero'))
                              OR (pc.BoolCorreta = 0 AND LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) IN ('0', 'false', 'falso'))
                          ) THEN 1
                          WHEN pc.RespuestaCorrectaOM IS NOT NULL AND (
                              LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) = LOWER(TRIM(CONVERT(CAST(pc.RespuestaCorrectaOM AS CHAR) USING utf8mb4)))
                              OR LOWER(TRIM(CONVERT(pr.Respuesta USING utf8mb4))) = LOWER(TRIM(CONVERT(ppr.DescripcionRespuesta USING utf8mb4)))
                          ) THEN 1
                          WHEN pr.Respuesta IS NOT NULL AND pr.Respuesta != '' THEN
                            CAST(pr.Respuesta AS DECIMAL) / IFNULL(NULLIF(pc.RangoFinal, 0), 5)
                          ELSE 0
                        END) AS Puntos
                      FROM PostulantesRespuestas pr
                      INNER JOIN PreguntasEvaluacion pe ON pe.idPreguntasEvaluacion = pr.IdPreguntasEvaluacion
                      LEFT JOIN PreguntasConfiguracion pc ON pc.idPreguntasEvaluacion = pe.idPreguntasEvaluacion
                      LEFT JOIN PreguntasPosiblesRespuestas ppr ON ppr.idPreguntasPosiblesRespuestas = pc.RespuestaCorrectaOM
                      WHERE pr.IdPostulanteEvaluacion = '$idPE'
                        AND pe.idCompetencias = '$idComp'";
                    $resDesg = $Con3->Select($qDesg);

                    $total = max($resDesg[0]['Total'], 1);
                    $puntos = $resDesg[0]['Puntos'] ?? 0;

                    $desglose[] = [
                        "Competencia" => $comp['Competencia'],
                        "Porcentaje" => round(($puntos / $total) * 100, 2)
                    ];
                }

                $postulantes[$i]['Desglose'] = $desglose;
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => [
                    "Postulantes" => $postulantes,
                    "Competencias" => $competencias
                ]
            ]);
        } catch (\Exception $e) {
            error_log("Error en getResultadosComparativosPostulantes: " . $e->getMessage());

            return json_encode(["Resultado" => false, "Msg" => $e->getMessage()]);
        }
    }

    /**
     * Obtener evaluaciones por vacante (para vista de admin con resultados)
     */
    public function getEvaluacionesPorVacante($IdVacante)
    {
        try {
            $IdVacante = intval(base64_decode($IdVacante));
            $q = "SELECT ve.IdVacanteEvaluacion, ve.IdEvaluacion, ve.IdProceso,
                     e.Titulo AS NombreEvaluacion,
                     TO_BASE64(ve.IdVacante) AS IdVacanteB64,
                     TO_BASE64(ve.IdEvaluacion) AS IdEvaluacionB64,
                     pv.NombreProceso,
                     (SELECT COUNT(*) FROM PostulantesEvaluaciones pe2
                      WHERE pe2.IdVacanteEvaluacion = ve.IdVacanteEvaluacion AND pe2.EstatusEvaluacion = 3) AS Completadas,
                     (SELECT COUNT(*) FROM PostulantesEvaluaciones pe2
                      WHERE pe2.IdVacanteEvaluacion = ve.IdVacanteEvaluacion) AS TotalAsignadas
              FROM VacantesEvaluaciones ve
              INNER JOIN Evaluaciones e ON e.idEvaluaciones = ve.IdEvaluacion
              INNER JOIN ProcesosVacantes pv ON pv.IdProceso = ve.IdProceso
              WHERE ve.IdVacante = '$IdVacante'
                AND e.TipoEvaluacion = 2 AND e.DirigidoA = 2
              ORDER BY pv.IdProceso ASC";
            $resultado = $this->Select($q);

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Msg" => $e->getMessage()]);
        }
    }
}
