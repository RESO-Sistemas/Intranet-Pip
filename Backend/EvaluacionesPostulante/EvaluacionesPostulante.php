<?php
if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
} else {
    if (file_exists("./Conexiones/Conexiones.php")) {
        require_once("./Conexiones/Conexiones.php");
    } else if (file_exists("../../Conexiones/Conexiones.php")) {
        require_once("../../Conexiones/Conexiones.php");
    }
}

class EvaluacionesPostulante extends Conexiones
{
    // ==========================================
    // HELPER PRIVADO
    // ==========================================

    private function sanitize($str)
    {
        if ($str === null) return '';
        $str = trim($str);
        $str = stripslashes($str);
        $str = htmlspecialchars($str);
        $str = str_replace("'", "''", $str);
        return $str;
    }

    // ==========================================
    // GET: EVALUACIONES DEL POSTULANTE
    // ==========================================

    /**
     * Obtener todas las evaluaciones asignadas a un postulante
     * autenticado, agrupadas por vacante y proceso.
     * Verifica que el CURP de sesión sea dueño del IdPostulanteVacante.
     */
    function getEvaluacionesPostulante($curpSesion)
    {
        try {
            $curpSesion = $this->sanitize($curpSesion);

            $q = "SELECT
                    pe.IdPostulanteEvaluacion,
                    pe.EstatusEvaluacion,
                    pe.Calificacion,
                    pe.FechaInicio,
                    pe.FechaFinalizacion,
                    CASE pe.EstatusEvaluacion
                        WHEN 1 THEN 'Pendiente'
                        WHEN 2 THEN 'En progreso'
                        WHEN 3 THEN 'Completada'
                    END AS TxEstatus,
                    e.Titulo AS NombreEvaluacion,
                    pv2.NombreProceso,
                    v.NombreVacante,
                    v.IdVacante
                  FROM PostulantesEvaluaciones pe
                  INNER JOIN VacantesEvaluaciones ve  ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                  INNER JOIN Evaluaciones e            ON e.idEvaluaciones = ve.IdEvaluacion
                  INNER JOIN ProcesosVacantes pv2      ON pv2.IdProceso = ve.IdProceso
                  INNER JOIN PostulantesVacantes pv    ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                  INNER JOIN Vacantes v                ON v.IdVacante = pv.IdVacante
                  INNER JOIN Postulantes p             ON p.IdPostulante = pv.IdPostulante
                  WHERE BINARY UPPER(p.CURP) = BINARY UPPER('$curpSesion')
                  ORDER BY v.NombreVacante ASC, pv2.IdProceso ASC";

            $resultado = $this->Select($q);

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data"      => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getEvaluacionesPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data"      => [],
                "Msg"       => "Error al obtener evaluaciones."
            ]);
        }
    }

    /**
     * Obtener las evaluaciones asignadas a un postulante autenticado
     * para un proceso específico de una vacante.
     * Verifica que el CURP de sesión sea dueño del IdPostulanteVacante.
     */
    function getEvaluacionesPorProceso($IdProceso, $curpSesion)
    {
        try {
            $IdProceso = intval($IdProceso);
            $curpSesion = $this->sanitize($curpSesion);

            $q = "SELECT
                    pe.IdPostulanteEvaluacion,
                    pe.EstatusEvaluacion,
                    pe.Calificacion,
                    pe.FechaInicio,
                    pe.FechaFinalizacion,
                    CASE pe.EstatusEvaluacion
                        WHEN 1 THEN 'Pendiente'
                        WHEN 2 THEN 'En progreso'
                        WHEN 3 THEN 'Completada'
                    END AS TxEstatus,
                    e.Titulo AS NombreEvaluacion,
                    pv2.NombreProceso,
                    v.NombreVacante,
                    v.IdVacante
                  FROM PostulantesEvaluaciones pe
                  INNER JOIN VacantesEvaluaciones ve  ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                  INNER JOIN Evaluaciones e            ON e.idEvaluaciones = ve.IdEvaluacion
                  INNER JOIN ProcesosVacantes pv2      ON pv2.IdProceso = ve.IdProceso
                  INNER JOIN PostulantesVacantes pv    ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                  INNER JOIN Vacantes v                ON v.IdVacante = pv.IdVacante
                  INNER JOIN Postulantes p             ON p.IdPostulante = pv.IdPostulante
                  WHERE BINARY UPPER(p.CURP) = BINARY UPPER('$curpSesion')
                    AND pv2.IdProceso = $IdProceso
                  ORDER BY e.Titulo ASC";

            $resultado = $this->Select($q);

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data"      => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getEvaluacionesPorProceso: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data"      => [],
                "Msg"       => "Error al obtener evaluaciones del proceso."
            ]);
        }
    }

    /**
     * Obtener las preguntas de una evaluación específica.
     * Verifica que el IdPostulanteEvaluacion pertenezca al CURP de sesión.
     */
    function getPreguntasEvaluacionPostulante($IdPostulanteEvaluacion, $curpSesion)
    {
        try {
            $IdPostulanteEvaluacion = intval($IdPostulanteEvaluacion);
            $curpSesion = $this->sanitize($curpSesion);

            // Verificar propiedad y obtener el idEvaluacion
            $qVerif = "SELECT ve.IdEvaluacion, pe.EstatusEvaluacion
                       FROM PostulantesEvaluaciones pe
                       INNER JOIN VacantesEvaluaciones ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                       INNER JOIN PostulantesVacantes pv  ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                       INNER JOIN Postulantes p           ON p.IdPostulante = pv.IdPostulante
                       WHERE pe.IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                         AND BINARY UPPER(p.CURP) = BINARY UPPER('$curpSesion')";
            $resVerif = $this->Select($qVerif);

            if (count($resVerif) == 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "Msg"       => "No tienes permiso para acceder a esta evaluación."
                ]);
            }

            $idEvaluacion = $resVerif[0]['IdEvaluacion'];
            $estatus      = intval($resVerif[0]['EstatusEvaluacion']);

            // Obtener preguntas
            $qPreguntas = "SELECT PE.idPreguntasEvaluacion AS IdPregunta,
                                  PE.Titulo,
                                  PE.Descripcion,
                                  PE.idTipoPregunta,
                                  TP.Descripcion AS TipoPregunta,
                                  C.Competencia
                           FROM PreguntasEvaluacion PE
                           INNER JOIN TipoPregunta TP ON TP.idTipoPregunta = PE.idTipoPregunta
                           LEFT JOIN  Competencias C  ON C.idCompetencias  = PE.idCompetencias
                           WHERE PE.idEvaluaciones = '$idEvaluacion'
                           ORDER BY PE.idPreguntasEvaluacion ASC";
            $preguntas = $this->Select($qPreguntas);

            // Para cada pregunta obtener opciones, rango y respuesta previa
            for ($i = 0; $i < count($preguntas); $i++) {
                $idPregunta = $preguntas[$i]['IdPregunta'];
                $tipo       = $preguntas[$i]['idTipoPregunta'];

                // Opción múltiple
                if ($tipo == 2 || $tipo == 4) {
                    $Con2 = new Conexiones();
                    $qOpciones = "SELECT idPreguntasPosiblesRespuestas AS IdOpcion,
                                         DescripcionRespuesta AS Texto
                                  FROM PreguntasPosiblesRespuestas
                                  WHERE idPreguntasEvaluacion = '$idPregunta'
                                  ORDER BY idPreguntasPosiblesRespuestas ASC";
                    $preguntas[$i]['Opciones'] = $Con2->Select($qOpciones);
                }

                // Rango
                if ($tipo == 3) {
                    $Con2 = new Conexiones();
                    $qConf = "SELECT RangoInicial, RangoFinal
                               FROM PreguntasConfiguracion
                               WHERE idPreguntasEvaluacion = '$idPregunta'";
                    $resConf = $Con2->Select($qConf);
                    $preguntas[$i]['Rango'] = count($resConf) > 0 ? $resConf[0] : null;
                }

                // Respuesta previa guardada
                $Con3 = new Conexiones();
                $qPrev = "SELECT Respuesta FROM PostulantesRespuestas
                          WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                            AND IdPreguntasEvaluacion  = '$idPregunta'";
                $resPrev = $Con3->Select($qPrev);
                $preguntas[$i]['RespuestaPrevia'] = count($resPrev) > 0 ? $resPrev[0]['Respuesta'] : null;
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Estatus"   => $estatus,
                "Data"      => $preguntas
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPreguntasEvaluacionPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Msg"       => "Error al obtener preguntas."
            ]);
        }
    }

    // ==========================================
    // POST: RESPONDER EVALUACIÓN
    // ==========================================

    /**
     * Guarda una o varias respuestas del postulante.
     * Acepta un array JSON de respuestas: [{"IdPregunta":5,"Respuesta":"A"}, ...]
     * Marca la evaluación como "En progreso" automáticamente.
     */
    function saveRespuestasPostulante($IdPostulanteEvaluacion, $respuestas, $curpSesion)
    {
        try {
            $IdPostulanteEvaluacion = intval($IdPostulanteEvaluacion);
            $curpSesion = $this->sanitize($curpSesion);

            // Verificar propiedad y que no esté ya completada
            $qVerif = "SELECT pe.EstatusEvaluacion
                       FROM PostulantesEvaluaciones pe
                       INNER JOIN PostulantesVacantes pv ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                       INNER JOIN Postulantes p          ON p.IdPostulante = pv.IdPostulante
                       WHERE pe.IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                         AND BINARY UPPER(p.CURP) = BINARY UPPER('$curpSesion')";
            $resVerif = $this->Select($qVerif);

            if (count($resVerif) == 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "Msg"       => "No tienes permiso para esta evaluación."
                ]);
            }

            if (intval($resVerif[0]['EstatusEvaluacion']) === 3) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "Msg"       => "Esta evaluación ya fue completada. No puedes modificar las respuestas."
                ]);
            }

            // Marcar como "En progreso" si aún está pendiente
            $Con2 = new Conexiones();
            $Con2->ExecuteQuery("UPDATE PostulantesEvaluaciones
                                 SET EstatusEvaluacion = 2,
                                     FechaInicio = IFNULL(FechaInicio, NOW())
                                 WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                                   AND EstatusEvaluacion = 1", []);

            // Recorrer y guardar cada respuesta (upsert)
            $guardadas = 0;
            foreach ($respuestas as $resp) {
                $idPregunta     = intval($resp['IdPregunta']);
                $valorRespuesta = $this->sanitize($resp['Respuesta']);

                if ($idPregunta <= 0) continue;

                // ¿Ya existe?
                $Con3 = new Conexiones();
                $qCheck = "SELECT IdPostulanteRespuesta FROM PostulantesRespuestas
                           WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                             AND IdPreguntasEvaluacion  = $idPregunta";
                $resCheck = $Con3->Select($qCheck);

                if (count($resCheck) > 0) {
                    $Con4 = new Conexiones();
                    $Con4->ExecuteQuery("UPDATE PostulantesRespuestas
                                         SET Respuesta = '$valorRespuesta', FechaRespuesta = NOW()
                                         WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                                           AND IdPreguntasEvaluacion  = $idPregunta", []);
                } else {
                    $Con4 = new Conexiones();
                    $Con4->ExecuteQuery("INSERT INTO PostulantesRespuestas
                                         (IdPostulanteEvaluacion, IdPreguntasEvaluacion, Respuesta)
                                         VALUES ($IdPostulanteEvaluacion, $idPregunta, '$valorRespuesta')", []);
                }
                $guardadas++;
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg"    => true,
                "Msg"       => "Se guardaron $guardadas respuesta(s) correctamente.",
                "Guardadas" => $guardadas
            ]);
        } catch (\Exception $e) {
            error_log("Error en saveRespuestasPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Msg"       => "Error al guardar respuestas."
            ]);
        }
    }

    /**
     * Finaliza la evaluación:
     * - Verifica que todas las preguntas estén respondidas.
     * - Calcula la calificación.
     * - Marca como Completada (EstatusEvaluacion = 3).
     */
    function finalizarEvaluacionPostulante($IdPostulanteEvaluacion, $curpSesion)
    {
        try {
            $IdPostulanteEvaluacion = intval($IdPostulanteEvaluacion);
            $curpSesion = $this->sanitize($curpSesion);

            // Verificar propiedad y obtener idEvaluacion
            $qVerif = "SELECT pe.EstatusEvaluacion, ve.IdEvaluacion
                       FROM PostulantesEvaluaciones pe
                       INNER JOIN VacantesEvaluaciones ve ON ve.IdVacanteEvaluacion = pe.IdVacanteEvaluacion
                       INNER JOIN PostulantesVacantes pv  ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
                       INNER JOIN Postulantes p           ON p.IdPostulante = pv.IdPostulante
                       WHERE pe.IdPostulanteEvaluacion = $IdPostulanteEvaluacion
                         AND BINARY UPPER(p.CURP) = BINARY UPPER('$curpSesion')";
            $resVerif = $this->Select($qVerif);

            if (count($resVerif) == 0) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "Msg"       => "No tienes permiso para esta evaluación."
                ]);
            }

            if (intval($resVerif[0]['EstatusEvaluacion']) === 3) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "Msg"       => "Esta evaluación ya fue completada."
                ]);
            }

            $idEvaluacion = $resVerif[0]['IdEvaluacion'];

            // Contar preguntas totales
            $Con2 = new Conexiones();
            $qTotal = "SELECT COUNT(*) AS Total FROM PreguntasEvaluacion
                       WHERE idEvaluaciones = '$idEvaluacion'";
            $resTotal = $Con2->Select($qTotal);
            $totalPreguntas = intval($resTotal[0]['Total']);

            // Contar respondidas
            $Con3 = new Conexiones();
            $qRespondidas = "SELECT COUNT(*) AS Respondidas FROM PostulantesRespuestas
                             WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion";
            $resRespondidas = $Con3->Select($qRespondidas);
            $respondidas = intval($resRespondidas[0]['Respondidas']);

            if ($respondidas < $totalPreguntas) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "Msg"       => "Faltan " . ($totalPreguntas - $respondidas) . " pregunta(s) por responder."
                ]);
            }

            // Calcular calificación solo sobre preguntas evaluables (con respuesta correcta definida).
            // Las preguntas de tipo Rango (tipo 3) y de texto libre no tienen BoolCorreta
            // ni RespuestaCorrectaOM, así que se excluyen del denominador para no perjudicar
            // la calificación del postulante.
            $Con4 = new Conexiones();
            $qCalc = "SELECT
                        -- Total de preguntas que SÍ tienen respuesta correcta definida
                        SUM(CASE
                            WHEN pc.BoolCorreta IS NOT NULL THEN 1
                            WHEN pc.RespuestaCorrectaOM IS NOT NULL THEN 1
                            ELSE 0
                        END) AS TotalEvaluables,
                        -- Cuántas de esas fueron respondidas correctamente
                        SUM(CASE
                            WHEN pc.BoolCorreta IS NOT NULL AND BINARY pr.Respuesta = BINARY CAST(pc.BoolCorreta AS CHAR) THEN 1
                            WHEN pc.RespuestaCorrectaOM IS NOT NULL AND (
                                BINARY pr.Respuesta = BINARY CAST(pc.RespuestaCorrectaOM AS CHAR)
                                OR BINARY pr.Respuesta = BINARY ppr.DescripcionRespuesta
                            ) THEN 1
                            ELSE 0
                        END) AS Correctas
                      FROM PostulantesRespuestas pr
                      INNER JOIN PreguntasEvaluacion pe ON pe.idPreguntasEvaluacion = pr.IdPreguntasEvaluacion
                      LEFT JOIN  PreguntasConfiguracion pc ON pc.idPreguntasEvaluacion = pe.idPreguntasEvaluacion
                      LEFT JOIN  PreguntasPosiblesRespuestas ppr ON ppr.idPreguntasPosiblesRespuestas = pc.RespuestaCorrectaOM
                      WHERE pr.IdPostulanteEvaluacion = $IdPostulanteEvaluacion";
            $resCalc = $Con4->Select($qCalc);

            // Denominador = preguntas evaluables (evitar división por cero)
            $totalEvaluables = max(intval($resCalc[0]['TotalEvaluables'] ?? 0), 1);
            $correctas       = intval($resCalc[0]['Correctas'] ?? 0);
            $calificacion    = round(($correctas / $totalEvaluables) * 100, 2);

            // Marcar como completada
            $Con5 = new Conexiones();
            $Con5->ExecuteQuery("UPDATE PostulantesEvaluaciones
                                 SET EstatusEvaluacion = 3,
                                     FechaFinalizacion = NOW(),
                                     Calificacion = $calificacion
                                 WHERE IdPostulanteEvaluacion = $IdPostulanteEvaluacion", []);

            return json_encode([
                "Resultado"    => true,
                "Siguiente"    => true,
                "ConMsg"       => true,
                "Msg"          => "¡Evaluación completada con éxito!",
                "Calificacion" => $calificacion
            ]);
        } catch (\Exception $e) {
            error_log("Error en finalizarEvaluacionPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Msg"       => "Error al finalizar la evaluación."
            ]);
        }
    }
}
