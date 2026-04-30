<?php
if (file_exists(__DIR__ . "/../Conexiones/Conexiones.php")) {
    require_once(__DIR__ . "/../Conexiones/Conexiones.php");
}

class EvaluacionesPostulanteIbero extends Conexiones
{
    // ==========================================
    // GET: EVALUACIONES DEL POSTULANTE
    // ==========================================
    function getEvaluacionesPostulante($curpSesion) {
        try {
            $c = strtoupper($this->sanitize($curpSesion));
            $q = "SELECT pe.IdPostulanteEvaluacion, pe.EstatusEvaluacion, pe.Calificacion,
                         pe.FechaInicio, pe.FechaFin,
                         CASE pe.EstatusEvaluacion WHEN 1 THEN 'Pendiente' WHEN 2 THEN 'En progreso' WHEN 3 THEN 'Completada' END AS TxEstatus,
                         e.Titulo AS NombreEvaluacion, pv2.NombreProceso, v.NombreVacante, v.IdVacante
                  FROM PostulantesEvaluacionesIbero pe
                  INNER JOIN VacantesEvaluacionesIbero ve  ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                  INNER JOIN EvaluacionesIbero e           ON e.idEvaluaciones = ve.IdEvaluacion
                  INNER JOIN ProcesosVacantesIbero pv2     ON pv2.IdProceso = ve.IdProceso
                  INNER JOIN PostulantesVacantesIbero pv   ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                  INNER JOIN VacantesIbero v               ON v.IdVacante = pv.IdVacante
                  INNER JOIN PostulantesIbero p            ON p.IdPostulante = pv.IdPostulante
                  WHERE UPPER(p.CURP) = '$c'
                  ORDER BY v.NombreVacante ASC, pv2.IdProceso ASC";
            return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    // ==========================================
    // GET: PREGUNTAS DE UNA EVALUACIÓN
    // ==========================================
    function getPreguntasEvaluacion($IdPostulanteEvaluacion, $curpSesion) {
        try {
            $id = intval($IdPostulanteEvaluacion);
            $c  = strtoupper($this->sanitize($curpSesion));

            // Verificar propiedad
            $verif = $this->Select(
                "SELECT ve.IdEvaluacion, pe.EstatusEvaluacion
                 FROM PostulantesEvaluacionesIbero pe
                 INNER JOIN VacantesEvaluacionesIbero ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                 INNER JOIN PostulantesVacantesIbero pv  ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                 INNER JOIN PostulantesIbero p           ON p.IdPostulante = pv.IdPostulante
                 WHERE pe.IdPostulanteEvaluacion = $id AND UPPER(p.CURP) = '$c' LIMIT 1"
            );
            if (empty($verif)) return json_encode(["Resultado"=>false,"Msg"=>"Sin permiso para esta evaluación."]);

            $idEval  = $verif[0]['IdEvaluacion'];
            $estatus = intval($verif[0]['EstatusEvaluacion']);

            // Preguntas — usa idTipoPregunta igual que PIP
            $preguntas = $this->Select(
                "SELECT pe.idPreguntasEvaluacion AS IdPregunta, pe.Titulo, pe.Descripcion,
                        pe.idTipoPregunta, tp.Descripcion AS TipoPregunta, tp.Bool, tp.Multiple1R, tp.Rango,
                        pe.Orden,
                        (SELECT Competencia FROM CompetenciasIbero WHERE idCompetencias = pe.idCompetencias LIMIT 1) AS Competencia
                 FROM PreguntasEvaluacionIbero pe
                 INNER JOIN TipoPreguntaIbero tp ON tp.idTipoPregunta = pe.idTipoPregunta
                 WHERE pe.idEvaluaciones = $idEval ORDER BY pe.Orden ASC, pe.idPreguntasEvaluacion ASC"
            );

            foreach ($preguntas as &$preg) {
                $idP    = $preg['IdPregunta'];
                $esOM   = $preg['Multiple1R'] == 1;  // Opción múltiple
                
                // Opciones para Opción Múltiple
                if ($esOM) {
                    $preg['Opciones'] = $this->Select(
                        "SELECT idPreguntasPosiblesRespuestas AS IdOpcion, DescripcionRespuesta AS Texto
                         FROM PreguntasPosiblesRespuestasIbero WHERE idPreguntasEvaluacion = $idP
                         ORDER BY idPreguntasPosiblesRespuestas ASC"
                    );
                }
                
                // Configuración: rango + respuesta correcta
                $cfg = $this->Select("SELECT * FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion = $idP LIMIT 1");
                $preg['Config'] = !empty($cfg) ? $cfg[0] : null;

                // Respuesta previa
                $prev = $this->Select("SELECT Respuesta FROM PostulantesRespuestasIbero WHERE IdPostulanteEvaluacion = $id AND IdPreguntasEvaluacion = $idP LIMIT 1");
                $preg['RespuestaPrevia'] = !empty($prev) ? $prev[0]['Respuesta'] : null;
            }

            return json_encode(["Resultado"=>true,"Siguiente"=>true,"Estatus"=>$estatus,"Data"=>$preguntas]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    // ==========================================
    // POST: GUARDAR RESPUESTAS
    // ==========================================
    function saveRespuestas($IdPostulanteEvaluacion, $respuestas, $curpSesion) {
        try {
            $id = intval($IdPostulanteEvaluacion);
            $c  = strtoupper($this->sanitize($curpSesion));

            $verif = $this->Select(
                "SELECT pe.EstatusEvaluacion FROM PostulantesEvaluacionesIbero pe
                 INNER JOIN PostulantesVacantesIbero pv ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                 INNER JOIN PostulantesIbero p ON p.IdPostulante = pv.IdPostulante
                 WHERE pe.IdPostulanteEvaluacion = $id AND UPPER(p.CURP) = '$c' LIMIT 1"
            );
            if (empty($verif)) return json_encode(["Resultado"=>false,"Msg"=>"Sin permiso."]);
            if (intval($verif[0]['EstatusEvaluacion']) === 3) return json_encode(["Resultado"=>false,"Msg"=>"Evaluación ya completada."]);

            // Marcar En Progreso
            $this->ProcedureExec("UPDATE PostulantesEvaluacionesIbero SET EstatusEvaluacion=2, FechaInicio=IFNULL(FechaInicio,NOW()) WHERE IdPostulanteEvaluacion=$id AND EstatusEvaluacion=1");

            $guardadas = 0;
            if (!is_array($respuestas)) $respuestas = json_decode($respuestas, true) ?: [];
            foreach ($respuestas as $resp) {
                $idP = intval($resp['IdPregunta'] ?? 0);
                $val = $this->sanitize($resp['Respuesta'] ?? '');
                if ($idP <= 0) continue;
                $existe = $this->Select("SELECT IdRespuesta FROM PostulantesRespuestasIbero WHERE IdPostulanteEvaluacion=$id AND IdPreguntasEvaluacion=$idP LIMIT 1");
                if (!empty($existe)) {
                    $this->ProcedureExec("UPDATE PostulantesRespuestasIbero SET Respuesta='$val', FechaRespuesta=NOW() WHERE IdPostulanteEvaluacion=$id AND IdPreguntasEvaluacion=$idP");
                } else {
                    $this->ProcedureExec("INSERT INTO PostulantesRespuestasIbero (IdPostulanteEvaluacion,IdPreguntasEvaluacion,Respuesta) VALUES ($id,$idP,'$val')");
                }
                $guardadas++;
            }
            return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"$guardadas respuesta(s) guardada(s).","Guardadas"=>$guardadas]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    // ==========================================
    // POST: FINALIZAR EVALUACIÓN + CALIFICACIÓN
    // ==========================================
    function finalizarEvaluacion($IdPostulanteEvaluacion, $curpSesion) {
        try {
            $id = intval($IdPostulanteEvaluacion);
            $c  = strtoupper($this->sanitize($curpSesion));

            $verif = $this->Select(
                "SELECT pe.EstatusEvaluacion, ve.IdEvaluacion
                 FROM PostulantesEvaluacionesIbero pe
                 INNER JOIN VacantesEvaluacionesIbero ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                 INNER JOIN PostulantesVacantesIbero pv  ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                 INNER JOIN PostulantesIbero p           ON p.IdPostulante = pv.IdPostulante
                 WHERE pe.IdPostulanteEvaluacion = $id AND UPPER(p.CURP) = '$c' LIMIT 1"
            );
            if (empty($verif)) return json_encode(["Resultado"=>false,"Msg"=>"Sin permiso."]);
            if (intval($verif[0]['EstatusEvaluacion']) === 3) return json_encode(["Resultado"=>false,"Msg"=>"Ya fue completada."]);

            $idEval = $verif[0]['IdEvaluacion'];

            // Verificar que todas estén respondidas
            $total = $this->Select("SELECT COUNT(*) AS T FROM PreguntasEvaluacionIbero WHERE idEvaluaciones=$idEval");
            $respondidas = $this->Select("SELECT COUNT(*) AS R FROM PostulantesRespuestasIbero WHERE IdPostulanteEvaluacion=$id");
            $nTotal = intval($total[0]['T'] ?? 0);
            $nResp  = intval($respondidas[0]['R'] ?? 0);
            if ($nResp < $nTotal) return json_encode(["Resultado"=>false,"Msg"=>"Faltan ".($nTotal-$nResp)." pregunta(s) por responder."]);

            // Calcular calificación (preguntas con respuesta correcta definida)
            $calc = $this->Select(
                "SELECT
                   SUM(CASE WHEN pc.BoolCorreta IS NOT NULL THEN 1 
                            WHEN pc.RespuestaCorrectaOM IS NOT NULL THEN 1 
                            WHEN pc.RespuestaCorrectaRango IS NOT NULL THEN 1
                            WHEN pc.RespuestaCorrectaTexto IS NOT NULL THEN 1
                            ELSE 0 END) AS TotalEval,
                   SUM(CASE
                       WHEN pc.BoolCorreta IS NOT NULL AND pr.Respuesta = CAST(pc.BoolCorreta AS CHAR) THEN 1
                       WHEN pc.RespuestaCorrectaOM IS NOT NULL AND (
                           pr.Respuesta = CAST(pc.RespuestaCorrectaOM AS CHAR)
                           OR pr.Respuesta = (SELECT DescripcionRespuesta FROM PreguntasPosiblesRespuestasIbero WHERE idPreguntasPosiblesRespuestas=pc.RespuestaCorrectaOM LIMIT 1)
                       ) THEN 1
                       WHEN pc.RespuestaCorrectaRango IS NOT NULL AND pr.Respuesta = CAST(pc.RespuestaCorrectaRango AS CHAR) THEN 1
                       WHEN pc.RespuestaCorrectaTexto IS NOT NULL AND LOWER(pr.Respuesta) = LOWER(pc.RespuestaCorrectaTexto) THEN 1
                       ELSE 0
                   END) AS Correctas
                 FROM PostulantesRespuestasIbero pr
                 INNER JOIN PreguntasEvaluacionIbero pe ON pe.idPreguntasEvaluacion = pr.IdPreguntasEvaluacion
                 LEFT JOIN PreguntasConfiguracionIbero pc ON pc.idPreguntasEvaluacion = pe.idPreguntasEvaluacion
                 WHERE pr.IdPostulanteEvaluacion = $id"
            );
            $totalEval  = max(intval($calc[0]['TotalEval'] ?? 0), 1);
            $correctas  = intval($calc[0]['Correctas'] ?? 0);
            $calificacion = round(($correctas / $totalEval) * 100, 2);

            $this->ProcedureExec("UPDATE PostulantesEvaluacionesIbero SET EstatusEvaluacion=3, FechaFin=NOW(), Calificacion=$calificacion WHERE IdPostulanteEvaluacion=$id");

            return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"¡Evaluación completada!","Calificacion"=>$calificacion]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    // ==========================================
    // ADMIN: ASIGNAR EVALUACIÓN A POSTULANTE
    // ==========================================
    function asignarEvaluacionPostulante($IdPostulanteVacante, $IdVacanteEvaluacion) {
        $pv  = intval(base64_decode($IdPostulanteVacante));
        $ve  = intval($IdVacanteEvaluacion);
        $check = $this->Select("SELECT IdPostulanteEvaluacion FROM PostulantesEvaluacionesIbero WHERE IdPostulanteVacante=$pv AND IdVacanteEvaluacion=$ve LIMIT 1");
        if (!empty($check)) return json_encode(["Resultado"=>false,"Msg"=>"Esta evaluación ya fue asignada."]);
        $id = $this->InsertAndGetId("INSERT INTO PostulantesEvaluacionesIbero (IdPostulanteVacante,IdVacanteEvaluacion,EstatusEvaluacion) VALUES ($pv,$ve,1)");
        if ($id) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Evaluación asignada al postulante."]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error al asignar."]);
    }

    // ==========================================
    // ADMIN: MÉTRICAS DE EVALUACIÓN
    // ==========================================
    function getMetricasEvaluacion($IdVacanteEvaluacion) {
        $ve = intval($IdVacanteEvaluacion);
        $resumen = $this->Select(
            "SELECT COUNT(*) AS Total,
                    SUM(EstatusEvaluacion=1) AS Pendientes,
                    SUM(EstatusEvaluacion=2) AS EnProgreso,
                    SUM(EstatusEvaluacion=3) AS Completadas,
                    AVG(CASE WHEN EstatusEvaluacion=3 THEN Calificacion END) AS PromedioCalificacion,
                    MAX(CASE WHEN EstatusEvaluacion=3 THEN Calificacion END) AS MaxCalificacion,
                    MIN(CASE WHEN EstatusEvaluacion=3 THEN Calificacion END) AS MinCalificacion
             FROM PostulantesEvaluacionesIbero WHERE IdVacanteEvaluacion=$ve"
        );
        $detalle = $this->Select(
            "SELECT pe.IdPostulanteEvaluacion, pe.EstatusEvaluacion, pe.Calificacion, pe.FechaInicio, pe.FechaFin,
                    p.Nombre, p.ApellidoPaterno, p.ApellidoMaterno, p.CURP, p.CorreoElectronico,
                    CASE pe.EstatusEvaluacion WHEN 1 THEN 'Pendiente' WHEN 2 THEN 'En Progreso' WHEN 3 THEN 'Completada' END AS TxEstatus
             FROM PostulantesEvaluacionesIbero pe
             INNER JOIN PostulantesVacantesIbero pv ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
             INNER JOIN PostulantesIbero p ON p.IdPostulante = pv.IdPostulante
             WHERE pe.IdVacanteEvaluacion = $ve ORDER BY pe.Calificacion DESC"
        );
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Resumen"=>!empty($resumen)?$resumen[0]:[],"Detalle"=>$detalle]);
    }

    // ==========================================
    // ADMIN: RESPUESTAS DETALLADAS DE UN POSTULANTE
    // ==========================================
    function getRespuestasDetalle($IdPostulanteEvaluacion) {
        $id = intval(base64_decode($IdPostulanteEvaluacion));
        $q = "SELECT pr.IdRespuesta, pr.Respuesta, pr.FechaRespuesta,
                     pe.Titulo AS Pregunta, pe.TipoPregunta, pe.Orden,
                     (SELECT Competencia FROM CompetenciasIbero WHERE idCompetencias=pe.idCompetencias LIMIT 1) AS Competencia,
                     (SELECT BoolCorreta FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=pe.idPreguntasEvaluacion LIMIT 1) AS RespCorrecta,
                     (SELECT DescripcionRespuesta FROM PreguntasPosiblesRespuestasIbero ppr
                      INNER JOIN PreguntasConfiguracionIbero pcc ON pcc.RespuestaCorrectaOM=ppr.idPreguntasPosiblesRespuestas
                      WHERE pcc.idPreguntasEvaluacion=pe.idPreguntasEvaluacion LIMIT 1) AS RespCorrectaOM,
                     (SELECT RespuestaCorrectaRango FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=pe.idPreguntasEvaluacion LIMIT 1) AS RespuestaCorrectaRango,
                     (SELECT RespuestaCorrectaTexto FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=pe.idPreguntasEvaluacion LIMIT 1) AS RespuestaCorrectaTexto
              FROM PostulantesRespuestasIbero pr
              INNER JOIN PreguntasEvaluacionIbero pe ON pe.idPreguntasEvaluacion = pr.IdPreguntasEvaluacion
              WHERE pr.IdPostulanteEvaluacion = $id ORDER BY pe.Orden ASC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    // ==========================================
    // ADMIN: CRUD EVALUACIONES
    // ==========================================
    function getEvaluacionesAdmin() {
        $q = "SELECT e.idEvaluaciones, e.Titulo, e.TipoEvaluacion, e.FechaInicio, e.FechaFin, e.Status,
                     e.PreguntasAceptadas, COUNT(pe.idPreguntasEvaluacion) AS TotalPreguntas
              FROM EvaluacionesIbero e
              LEFT JOIN PreguntasEvaluacionIbero pe ON pe.idEvaluaciones = e.idEvaluaciones
              GROUP BY e.idEvaluaciones ORDER BY e.idEvaluaciones DESC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function addEvaluacion($Titulo, $TipoEvaluacion, $FechaInicio, $FechaFin) {
        $t  = $this->sanitize($Titulo);
        $ti = intval($TipoEvaluacion);
        $fi = $this->sanitize($FechaInicio);
        $ff = $this->sanitize($FechaFin);
        $id = $this->InsertAndGetId("INSERT INTO EvaluacionesIbero (Titulo,TipoEvaluacion,FechaInicio,FechaFin,Status,DirigidoA,PreguntasAceptadas) VALUES ('$t',$ti,'$fi','$ff',1,2,0)");
        if ($id) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Evaluación creada.","idEvaluaciones"=>$id]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error al crear."]);
    }

    function activarEvaluacion($idEvaluacion) {
        $id = intval($idEvaluacion);
        // Verificar que tenga preguntas
        $count = $this->Select("SELECT COUNT(*) AS T FROM PreguntasEvaluacionIbero WHERE idEvaluaciones=$id");
        if (intval($count[0]['T'] ?? 0) === 0) return json_encode(["Resultado"=>false,"Msg"=>"La evaluación no tiene preguntas."]);
        $this->ProcedureExec("UPDATE EvaluacionesIbero SET PreguntasAceptadas=1 WHERE idEvaluaciones=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Evaluación activada para asignación."]);
    }

    function getPreguntasAdmin($idEvaluacion) {
        $id = intval($idEvaluacion);
        $preguntas = $this->Select(
            "SELECT pe.idPreguntasEvaluacion, pe.idTipoPregunta, pe.idCompetencias, pe.Titulo, pe.Descripcion, pe.Orden,
                    tp.Descripcion AS TipoPregunta, tp.Bool, tp.Multiple1R, tp.Rango,
                    (SELECT Competencia FROM CompetenciasIbero WHERE idCompetencias=pe.idCompetencias LIMIT 1) AS Competencia
             FROM PreguntasEvaluacionIbero pe
             INNER JOIN TipoPreguntaIbero tp ON tp.idTipoPregunta = pe.idTipoPregunta
             WHERE pe.idEvaluaciones=$id ORDER BY pe.Orden ASC, pe.idPreguntasEvaluacion ASC"
        );
        foreach ($preguntas as &$p) {
            $idP = $p['idPreguntasEvaluacion'];
            if ($p['Multiple1R']) {
                $p['Opciones'] = $this->Select("SELECT idPreguntasPosiblesRespuestas, DescripcionRespuesta FROM PreguntasPosiblesRespuestasIbero WHERE idPreguntasEvaluacion=$idP");
            } else {
                $p['Opciones'] = [];
            }
            $cfg = $this->Select("SELECT * FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=$idP LIMIT 1");
            $p['Config'] = !empty($cfg) ? $cfg[0] : null;
        }
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$preguntas]);
    }

    function addPregunta($idEvaluacion, $Titulo, $idTipoPregunta, $Orden, $Descripcion="", $idCompetencia=null, $RangoInicial=null, $RangoFinal=null) {
        $id   = intval($idEvaluacion);
        $t    = $this->sanitize($Titulo);
        $tipo = intval($idTipoPregunta);
        $o    = intval($Orden);
        $d    = $this->sanitize($Descripcion);
        $comp = ($idCompetencia && intval($idCompetencia) > 0) ? intval($idCompetencia) : "NULL";
        $newId = $this->InsertAndGetId("INSERT INTO PreguntasEvaluacionIbero (idEvaluaciones,idTipoPregunta,idCompetencias,Titulo,Descripcion,Orden) VALUES ($id,$tipo,$comp,'$t','$d',$o)");
        if (!$newId) return json_encode(["Resultado"=>false,"Msg"=>"Error al insertar pregunta."]);
        // Si es Rango, guardar configuración de min/max
        $ri = ($RangoInicial !== null && $RangoInicial !== '') ? intval($RangoInicial) : 1;
        $rf = ($RangoFinal   !== null && $RangoFinal   !== '') ? intval($RangoFinal)   : 10;
        if ($tipo == 3) { // Tipo 3 = Rango
            $this->ProcedureExec("INSERT INTO PreguntasConfiguracionIbero (idPreguntasEvaluacion,RangoInicial,RangoFinal) VALUES ($newId,$ri,$rf)");
        }
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Pregunta agregada.","idPregunta"=>$newId]);
    }

    function editPregunta($idPregunta, $Titulo, $idTipoPregunta, $Orden, $idCompetencia=null, $RangoInicial=null, $RangoFinal=null) {
        $id   = intval($idPregunta);
        $t    = $this->sanitize($Titulo);
        $tipo = intval($idTipoPregunta);
        $o    = intval($Orden);
        $comp = ($idCompetencia && intval($idCompetencia) > 0) ? intval($idCompetencia) : "NULL";
        
        $this->ProcedureExec("UPDATE PreguntasEvaluacionIbero SET idTipoPregunta=$tipo, idCompetencias=$comp, Titulo='$t', Orden=$o WHERE idPreguntasEvaluacion=$id");
        
        // Si es Rango, guardar configuración de min/max
        if ($tipo == 3) {
            $ri = ($RangoInicial !== null && $RangoInicial !== '') ? intval($RangoInicial) : 1;
            $rf = ($RangoFinal   !== null && $RangoFinal   !== '') ? intval($RangoFinal)   : 10;
            $existe = $this->Select("SELECT idPreguntasConfiguracion FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=$id LIMIT 1");
            if (!empty($existe)) {
                $this->ProcedureExec("UPDATE PreguntasConfiguracionIbero SET RangoInicial=$ri, RangoFinal=$rf WHERE idPreguntasEvaluacion=$id");
            } else {
                $this->ProcedureExec("INSERT INTO PreguntasConfiguracionIbero (idPreguntasEvaluacion,RangoInicial,RangoFinal) VALUES ($id,$ri,$rf)");
            }
        }
        
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Pregunta actualizada."]);
    }

    function deletePregunta($idPregunta) {
        $id = intval(base64_decode($idPregunta));
        $this->ProcedureExec("DELETE FROM PreguntasPosiblesRespuestasIbero WHERE idPreguntasEvaluacion=$id");
        $this->ProcedureExec("DELETE FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=$id");
        $this->ProcedureExec("DELETE FROM PreguntasEvaluacionIbero WHERE idPreguntasEvaluacion=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Pregunta eliminada."]);
    }

    function addOpcion($idPregunta, $DescripcionRespuesta) {
        $id = intval($idPregunta);
        $d  = $this->sanitize($DescripcionRespuesta);
        $newId = $this->InsertAndGetId("INSERT INTO PreguntasPosiblesRespuestasIbero (idPreguntasEvaluacion,DescripcionRespuesta) VALUES ($id,'$d')");
        if ($newId) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Opción agregada.","idOpcion"=>$newId]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error."]);
    }

    function deleteOpcion($idOpcion) {
        $id = intval($idOpcion);
        $this->ProcedureExec("DELETE FROM PreguntasPosiblesRespuestasIbero WHERE idPreguntasPosiblesRespuestas=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Opción eliminada."]);
    }

    function setRespuestaCorrecta($idPregunta, $BoolCorreta, $RespuestaCorrectaOM, $RespuestaCorrectaRango=null, $RespuestaCorrectaTexto=null) {
        $id   = intval($idPregunta);
        $bool = ($BoolCorreta !== null && $BoolCorreta !== '') ? intval($BoolCorreta) : "NULL";
        $om   = ($RespuestaCorrectaOM && intval($RespuestaCorrectaOM) > 0) ? intval($RespuestaCorrectaOM) : "NULL";
        $rango= ($RespuestaCorrectaRango !== null && $RespuestaCorrectaRango !== '') ? intval($RespuestaCorrectaRango) : "NULL";
        $texto= ($RespuestaCorrectaTexto !== null && $RespuestaCorrectaTexto !== '') ? "'" . $this->sanitize($RespuestaCorrectaTexto) . "'" : "NULL";
        
        $existe = $this->Select("SELECT idPreguntasConfiguracion FROM PreguntasConfiguracionIbero WHERE idPreguntasEvaluacion=$id LIMIT 1");
        if (!empty($existe)) {
            $this->ProcedureExec("UPDATE PreguntasConfiguracionIbero SET BoolCorreta=$bool, RespuestaCorrectaOM=$om, RespuestaCorrectaRango=$rango, RespuestaCorrectaTexto=$texto WHERE idPreguntasEvaluacion=$id");
        } else {
            $this->ProcedureExec("INSERT INTO PreguntasConfiguracionIbero (idPreguntasEvaluacion,BoolCorreta,RespuestaCorrectaOM,RespuestaCorrectaRango,RespuestaCorrectaTexto) VALUES ($id,$bool,$om,$rango,$texto)");
        }
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Configuración guardada."]);
    }

    function getTiposPregunta() {
        return json_encode($this->Select("SELECT idTipoPregunta, Descripcion, Bool, Multiple1R, Rango FROM TipoPreguntaIbero WHERE Status=1 ORDER BY idTipoPregunta ASC"));
    }

    function getCompetencias() {
        return json_encode($this->Select("SELECT idCompetencias, Competencia FROM CompetenciasIbero WHERE Estatus=1 ORDER BY Competencia ASC"));
    }
}
?>
