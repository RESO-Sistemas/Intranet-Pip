-- Script de QA para purgar evaluaciones y sembrar una evaluacion 360 funcional
-- Caso de prueba:
-- - Evaluada: Alicia Marcela Torres Sandoval (1014)
-- - Jefe: Roberto Alejandro Garza Montoya (1001)
-- - Par: Felipe de Jesus Ramirez Leal (1015)
-- - Subordinado: Maria Elena Salinas Torres (1002)
--
-- Resultado esperado:
-- - 1 evaluacion 360 activa y contestada
-- - 3 competencias / 3 preguntas total
-- - 2 competencias fuertes
-- - 1 competencia debil (< 70)
-- - retroalimentacion pendiente de aceptar por Alicia
-- - sin plan de accion generado todavia
-- - al aceptar la retro desde my-results.php debe habilitarse la accion para crear el plan

SET NAMES utf8mb4;
SET @target_employee := 1014;
SET @boss_employee := 1001;
SET @subordinate_employee := 1002;
SET @peer_employee := 1015;

SET @target_level := 4;
SET @target_position := 13;
SET @evaluation_title := 'Evaluacion 360 QA Alicia 1014';

START TRANSACTION;

SET FOREIGN_KEY_CHECKS = 0;

-- Purga total para pruebas repetibles
DELETE FROM AvanceActividadPlanA;
DELETE FROM ActividadesPlanAccion;
DELETE FROM ObjetivosPlanAccion;
DELETE FROM HistorialRechazosPlanA;
DELETE FROM PlanesAccionEvaluacion;
DELETE FROM RetroalimentacionEvaluacion;
DELETE FROM RespuestaEvaluaciones;
DELETE FROM DetalleEvaluacionesRespondidas;
DELETE FROM EvaluacionDetalle;
DELETE FROM PreguntasConfiguracion;
DELETE FROM PreguntasPosiblesRespuestas;
DELETE FROM PreguntasEvaluacion;
DELETE FROM ConfiguracionInicialEvaluacion;
DELETE FROM EsperaNuevaEvaluacion;
DELETE FROM Evaluaciones;
DELETE FROM PostulantesRespuestas;
DELETE FROM PostulantesEvaluaciones;

SET FOREIGN_KEY_CHECKS = 1;

-- Evaluacion 360 principal
INSERT INTO Evaluaciones (
  Titulo,
  TipoEvaluacion,
  Periodicidad,
  FechaInicio,
  FechaFin,
  Status,
  RetroFechaIni,
  RetroFechaFin,
  PlanAFechaIni,
  PlanAFechaFin,
  DirigidoA,
  EmpleadosParticipantes,
  Activado,
  PreguntasAceptadas,
  TipoSeleccionaSucursal,
  TipoOpcionConfiguracion,
  Falla
) VALUES (
  @evaluation_title,
  1,
  NULL,
  CURDATE() - INTERVAL 5 DAY,
  CURDATE() - INTERVAL 1 DAY,
  1,
  CURDATE() - INTERVAL 1 DAY,
  CURDATE() + INTERVAL 10 DAY,
  CURDATE() - INTERVAL 1 DAY,
  CURDATE() + INTERVAL 30 DAY,
  1,
  CAST(@target_employee AS CHAR),
  1,
  1,
  1,
  1,
  '1'
);

SET @evaluation_id := LAST_INSERT_ID();

INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones)
VALUES (1, @evaluation_id), (2, @evaluation_id), (3, @evaluation_id);

-- Evaluadores 360 para Alicia
INSERT INTO EvaluacionDetalle (
  idEvaluaciones,
  NoEmpleadoEvalua,
  NoEmpleadoEvaluado,
  Status,
  StatusEvaluado,
  JefeEvalua,
  ParEvalua,
  AutoEvalua,
  SubordinadoEvalua,
  NivelEvaluado,
  PuestoEvaluado
) VALUES
(@evaluation_id, @boss_employee, @target_employee, 1, 1, 1, 0, 0, 0, @target_level, @target_position),
(@evaluation_id, @peer_employee, @target_employee, 1, 1, 0, 1, 0, 0, @target_level, @target_position),
(@evaluation_id, @target_employee, @target_employee, 1, 1, 0, 0, 1, 0, @target_level, @target_position),
(@evaluation_id, @subordinate_employee, @target_employee, 1, 1, 0, 0, 0, 1, @target_level, @target_position);

SET @detail_boss := (
  SELECT idEvaluacionDetalle
  FROM EvaluacionDetalle
  WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @boss_employee
  LIMIT 1
);
SET @detail_peer := (
  SELECT idEvaluacionDetalle
  FROM EvaluacionDetalle
  WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @peer_employee
  LIMIT 1
);
SET @detail_self := (
  SELECT idEvaluacionDetalle
  FROM EvaluacionDetalle
  WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @target_employee
  LIMIT 1
);
SET @detail_sub := (
  SELECT idEvaluacionDetalle
  FROM EvaluacionDetalle
  WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @subordinate_employee
  LIMIT 1
);

-- 3 preguntas / 3 competencias total
-- Tipo 1 = booleana
INSERT INTO PreguntasEvaluacion (
  idEvaluaciones,
  idTipoPregunta,
  idCompetencias,
  Titulo,
  Descripcion
) VALUES
(@evaluation_id, 1, 2, 'Brinda apoyo a sus companeros de equipo', 'Pregunta de prueba para una competencia fuerte.'),
(@evaluation_id, 1, 4, 'Entrega trabajo con calidad y precision', 'Pregunta de prueba para una competencia fuerte.'),
(@evaluation_id, 1, 3, 'Mantiene autocontrol ante situaciones de estres', 'Pregunta de prueba para una competencia debil.');

SET @question_support := (
  SELECT idPreguntasEvaluacion
  FROM PreguntasEvaluacion
  WHERE idEvaluaciones = @evaluation_id AND idCompetencias = 2
  LIMIT 1
);
SET @question_quality := (
  SELECT idPreguntasEvaluacion
  FROM PreguntasEvaluacion
  WHERE idEvaluaciones = @evaluation_id AND idCompetencias = 4
  LIMIT 1
);
SET @question_control := (
  SELECT idPreguntasEvaluacion
  FROM PreguntasEvaluacion
  WHERE idEvaluaciones = @evaluation_id AND idCompetencias = 3
  LIMIT 1
);

INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, BoolCorreta)
VALUES
(@question_support, 1),
(@question_quality, 1),
(@question_control, 1);

-- Respuestas finalizadas: 2 fuertes, 1 debil
INSERT INTO RespuestaEvaluaciones (
  idEvaluacionDetalle,
  idCompetencias,
  Registro,
  Comentarios,
  Calificacion,
  idPreguntasEvaluacion
) VALUES
(@detail_boss, 2, NOW(), 'Buen apoyo al equipo', '1', @question_support),
(@detail_boss, 4, NOW(), 'Mantiene buena calidad', '1', @question_quality),
(@detail_boss, 3, NOW(), 'Pierde el control bajo presion', '0', @question_control),

(@detail_peer, 2, NOW(), 'Siempre apoya a sus companeros', '1', @question_support),
(@detail_peer, 4, NOW(), 'Su trabajo es preciso y constante', '1', @question_quality),
(@detail_peer, 3, NOW(), 'Reacciona mal en momentos de estres', '0', @question_control),

(@detail_self, 2, NOW(), 'Se considera colaborativa', '1', @question_support),
(@detail_self, 4, NOW(), 'Se considera orientada a la calidad', '1', @question_quality),
(@detail_self, 3, NOW(), 'Reconoce falta de autocontrol', '0', @question_control),

(@detail_sub, 2, NOW(), 'Da soporte cuando se necesita', '1', @question_support),
(@detail_sub, 4, NOW(), 'Cuida bien los detalles', '1', @question_quality),
(@detail_sub, 3, NOW(), 'Baja tolerancia al estres', '0', @question_control);

INSERT INTO DetalleEvaluacionesRespondidas (idEvaluaciones, NoEmpleado, Registro)
VALUES
(@evaluation_id, @boss_employee, NOW()),
(@evaluation_id, @peer_employee, NOW()),
(@evaluation_id, @target_employee, NOW()),
(@evaluation_id, @subordinate_employee, NOW());

COMMIT;

-- Validaciones de salida
SELECT @evaluation_id AS evaluation_id, TO_BASE64(@evaluation_id) AS evaluation_b64;

SELECT
  EV.idEvaluaciones,
  EV.Titulo,
  EV.TipoEvaluacion,
  EV.Activado,
  EV.PreguntasAceptadas,
  IF(EV.idEvaluaciones IN (SELECT idEvaluaciones FROM RetroalimentacionEvaluacion WHERE NoEmpleado = @target_employee), 1, 0) AS RetroRealizada,
  IF(EV.idEvaluaciones IN (SELECT idEvaluaciones FROM PlanesAccionEvaluacion WHERE NoEmpleado = @target_employee), 1, 0) AS ConPlanAccion,
  IF(NOW() BETWEEN EV.RetroFechaIni AND EV.RetroFechaFin, 1, 0) AS RetroDisponible
FROM Evaluaciones EV
WHERE EV.idEvaluaciones = @evaluation_id;

SELECT
  C.Competencia,
  AVG(CASE WHEN RE.Calificacion = PC.BoolCorreta THEN 100 ELSE 0 END) AS ResultadoPromedio,
  CASE
    WHEN AVG(CASE WHEN RE.Calificacion = PC.BoolCorreta THEN 100 ELSE 0 END) < 70 THEN 'DEBIL'
    ELSE 'FUERTE'
  END AS Estado
FROM RespuestaEvaluaciones RE
INNER JOIN PreguntasConfiguracion PC ON PC.idPreguntasEvaluacion = RE.idPreguntasEvaluacion
INNER JOIN Competencias C ON C.idCompetencias = RE.idCompetencias
INNER JOIN EvaluacionDetalle ED ON ED.idEvaluacionDetalle = RE.idEvaluacionDetalle
WHERE ED.idEvaluaciones = @evaluation_id
GROUP BY C.Competencia
ORDER BY C.Competencia;

SELECT
  COUNT(*) AS ExistingPlansForTarget
FROM PlanesAccionEvaluacion
WHERE idEvaluaciones = @evaluation_id AND NoEmpleado = @target_employee;
