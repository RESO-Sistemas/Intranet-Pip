-- ============================================================================
-- SCRIPT DE SEMBRADO PARA EVALUACIONES DE PRUEBA (NORMAL Y 360)
-- Propósito: Sembrar datos de prueba para una encuesta normal de empleados
--            y una evaluación 360 para Alicia Torres (1014) sin contestar.
-- Nota de Purgado: Este script realiza una purga total de evaluaciones previas
--                  para asegurar un entorno limpio de pruebas.
-- ============================================================================

SET NAMES utf8mb4;

-- Variables de configuración de empleados de prueba
SET @target_employee := 1014;       -- Alicia Marcela Torres Sandoval (Evaluada)
SET @boss_employee := 1001;         -- Roberto Alejandro Garza Montoya (Jefe)
SET @peer_employee := 1015;         -- Felipe de Jesus Ramirez Leal (Par)
SET @subordinate_employee := 1002;  -- Maria Elena Salinas Torres (Subordinado)

START TRANSACTION;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- ----------------------------------------------------------------------------
-- 0. PURGA TOTAL DE EVALUACIONES PREVIAS (Para entorno limpio de pruebas)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 1. COMPETENCIAS BASE
-- Aseguramos que existan las competencias utilizadas por las preguntas.
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO `Competencias` (`idCompetencias`, `Competencia`, `Significado`, `Estatus`, `TipoCompetencia`) VALUES
(2, 'Trabajo en Equipo', 'Capacidad de colaborar activamente con otros.', 1, 1),
(3, 'Autocontrol', 'Mantener la calma bajo situaciones de estres.', 1, 1),
(4, 'Calidad en el Trabajo', 'Entregar resultados precisos y correctos.', 1, 1);

-- Obtener niveles y puestos de los empleados involucrados
SET @target_level := (SELECT `Nivel` FROM `Empleados` WHERE `NoEmpleado` = @target_employee LIMIT 1);
SET @target_position := (SELECT `IdPuesto` FROM `Empleados` WHERE `NoEmpleado` = @target_employee LIMIT 1);

SET @boss_level := (SELECT `Nivel` FROM `Empleados` WHERE `NoEmpleado` = @boss_employee LIMIT 1);
SET @boss_position := (SELECT `IdPuesto` FROM `Empleados` WHERE `NoEmpleado` = @boss_employee LIMIT 1);

SET @peer_level := (SELECT `Nivel` FROM `Empleados` WHERE `NoEmpleado` = @peer_employee LIMIT 1);
SET @peer_position := (SELECT `IdPuesto` FROM `Empleados` WHERE `NoEmpleado` = @peer_employee LIMIT 1);

SET @subordinate_level := (SELECT `Nivel` FROM `Empleados` WHERE `NoEmpleado` = @subordinate_employee LIMIT 1);
SET @subordinate_position := (SELECT `IdPuesto` FROM `Empleados` WHERE `NoEmpleado` = @subordinate_employee LIMIT 1);


-- ----------------------------------------------------------------------------
-- 2. EVALUACIÓN 1: ENCUESTA NORMAL DIRIGIDA A EMPLEADOS
-- Cuestionario de tipo normal, autoevaluado por los participantes asignados,
-- aprobado, publicado y listo para contestar.
-- ----------------------------------------------------------------------------

-- Cabecera de la evaluación
INSERT INTO `Evaluaciones` (
  `Titulo`,
  `TipoEvaluacion`,
  `Periodicidad`,
  `FechaInicio`,
  `FechaFin`,
  `Status`,
  `DirigidoA`,
  `EmpleadosParticipantes`,
  `Activado`,
  `PreguntasAceptadas`,
  `TipoSeleccionaSucursal`,
  `TipoOpcionConfiguracion`,
  `Falla`
) VALUES (
  'Encuesta de Clima Laboral y Conocimiento General (Normal)',
  2,                          -- Tipo 2 = Encuesta Normal
  4,                          -- Periodicidad 4 = Único
  CURDATE() - INTERVAL 2 DAY, -- Activa desde hace 2 días
  CURDATE() + INTERVAL 10 DAY,-- Vigente por 10 días más
  1,                          -- Status 1 = Activa
  1,                          -- Dirigido a Empleados
  '1014,1015,1001,1002',      -- Participantes
  1,                          -- Publicada/Activada
  1,                          -- Preguntas Aceptadas
  1,
  1,
  '1'
);

SET @normal_evaluation_id := LAST_INSERT_ID();

-- Sucursales asociadas para la encuesta normal
INSERT INTO `ConfiguracionInicialEvaluacion` (`IdSucursal`, `idEvaluaciones`) VALUES
(1, @normal_evaluation_id),
(2, @normal_evaluation_id),
(3, @normal_evaluation_id);

-- Detalle de participantes de la encuesta normal (autoevaluación)
INSERT INTO `EvaluacionDetalle` (
  `idEvaluaciones`,
  `NoEmpleadoEvalua`,
  `NoEmpleadoEvaluado`,
  `Status`,
  `StatusEvaluado`,
  `JefeEvalua`,
  `ParEvalua`,
  `AutoEvalua`,
  `SubordinadoEvalua`,
  `NivelEvaluado`,
  `PuestoEvaluado`
) VALUES
(@normal_evaluation_id, @target_employee, @target_employee, 1, 0, 0, 0, 1, 0, @target_level, @target_position),
(@normal_evaluation_id, @peer_employee, @peer_employee, 1, 0, 0, 0, 1, 0, @peer_level, @peer_position),
(@normal_evaluation_id, @boss_employee, @boss_employee, 1, 0, 0, 0, 1, 0, @boss_level, @boss_position),
(@normal_evaluation_id, @subordinate_employee, @subordinate_employee, 1, 0, 0, 0, 1, 0, @subordinate_level, @subordinate_position);

-- Obtener los IDs de EvaluacionDetalle creados para la encuesta normal
SET @det_normal_atorres := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @normal_evaluation_id AND NoEmpleadoEvalua = @target_employee LIMIT 1);
SET @det_normal_framirez := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @normal_evaluation_id AND NoEmpleadoEvalua = @peer_employee LIMIT 1);
SET @det_normal_rgarza := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @normal_evaluation_id AND NoEmpleadoEvalua = @boss_employee LIMIT 1);
SET @det_normal_msalinas := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @normal_evaluation_id AND NoEmpleadoEvalua = @subordinate_employee LIMIT 1);

-- Pregunta 1: Verdadero/Falso (idTipoPregunta = 1)
INSERT INTO `PreguntasEvaluacion` (
  `idEvaluaciones`,
  `idTipoPregunta`,
  `idCompetencias`,
  `Titulo`,
  `Descripcion`
) VALUES (
  @normal_evaluation_id,
  1, -- Verdadero / Falso
  2, -- Trabajo en Equipo
  '¿Nuestra organización promueve la capacitación constante?',
  'Indica si consideras que se da el soporte adecuado para tu crecimiento profesional.'
);

SET @q_normal_vf := LAST_INSERT_ID();

-- Configuración de respuesta esperada para Pregunta 1 (Verdadero = 1)
INSERT INTO `PreguntasConfiguracion` (`idPreguntasEvaluacion`, `BoolCorreta`)
VALUES (@q_normal_vf, 1);

-- Pregunta 2: Opción Múltiple (idTipoPregunta = 2)
INSERT INTO `PreguntasEvaluacion` (
  `idEvaluaciones`,
  `idTipoPregunta`,
  `idCompetencias`,
  `Titulo`,
  `Descripcion`
) VALUES (
  @normal_evaluation_id,
  2, -- Opción Múltiple
  4, -- Calidad en el Trabajo
  '¿Cuál es el canal oficial de comunicación interna para incidencias?',
  'Selecciona la opción correcta conforme a las políticas de la empresa.'
);

SET @q_normal_om := LAST_INSERT_ID();

-- Opciones de respuesta para Pregunta 2
INSERT INTO `PreguntasPosiblesRespuestas` (`idPreguntasEvaluacion`, `DescripcionRespuesta`) VALUES
(@q_normal_om, 'Correo personal de cada empleado'),
(@q_normal_om, 'Plataforma Intranet PIP'),
(@q_normal_om, 'Grupo informal de WhatsApp'),
(@q_normal_om, 'Llamada telefónica directa');

-- Obtener el ID autogenerado de la opción correcta
SET @ans_normal_correct := (
  SELECT `idPreguntasPosiblesRespuestas`
  FROM `PreguntasPosiblesRespuestas`
  WHERE `idPreguntasEvaluacion` = @q_normal_om AND `DescripcionRespuesta` = 'Plataforma Intranet PIP'
  LIMIT 1
);

-- Configuración de respuesta esperada para Pregunta 2
INSERT INTO `PreguntasConfiguracion` (`idPreguntasEvaluacion`, `RespuestaCorrectaOM`)
VALUES (@q_normal_om, @ans_normal_correct);

-- Inserción de respuestas vacías iniciales para la encuesta normal
INSERT INTO `RespuestaEvaluaciones` (
  `idEvaluacionDetalle`, `idCompetencias`, `Registro`, `Comentarios`, `Calificacion`, `idPreguntasEvaluacion`
) VALUES
-- Alicia Torres
(@det_normal_atorres, 2, NOW(), NULL, NULL, @q_normal_vf),
(@det_normal_atorres, 4, NOW(), NULL, NULL, @q_normal_om),
-- Felipe Ramírez
(@det_normal_framirez, 2, NOW(), NULL, NULL, @q_normal_vf),
(@det_normal_framirez, 4, NOW(), NULL, NULL, @q_normal_om),
-- Roberto Garza
(@det_normal_rgarza, 2, NOW(), NULL, NULL, @q_normal_vf),
(@det_normal_rgarza, 4, NOW(), NULL, NULL, @q_normal_om),
-- María Elena Salinas
(@det_normal_msalinas, 2, NOW(), NULL, NULL, @q_normal_vf),
(@det_normal_msalinas, 4, NOW(), NULL, NULL, @q_normal_om);


-- ----------------------------------------------------------------------------
-- 3. EVALUACIÓN 2: EVALUACIÓN 360 DIRIGIDA A ALICIA TORRES (1014)
-- Evaluación 360 aprobada, publicada, vinculando evaluadores por jerarquía,
-- respuestas esperadas configuradas por nivel y lista para responder.
-- ----------------------------------------------------------------------------

-- Cabecera de la evaluación
INSERT INTO `Evaluaciones` (
  `Titulo`,
  `TipoEvaluacion`,
  `Periodicidad`,
  `FechaInicio`,
  `FechaFin`,
  `Status`,
  `RetroFechaIni`,
  `RetroFechaFin`,
  `PlanAFechaIni`,
  `PlanAFechaFin`,
  `DirigidoA`,
  `EmpleadosParticipantes`,
  `Activado`,
  `PreguntasAceptadas`,
  `TipoSeleccionaSucursal`,
  `TipoOpcionConfiguracion`,
  `Falla`
) VALUES (
  'Evaluación 360 QA Alicia 1014 - Sin Contestar',
  1,                          -- Tipo 1 = Evaluación 360
  NULL,                       -- Sin periodicidad
  CURDATE() - INTERVAL 2 DAY, -- Activa desde hace 2 días
  CURDATE() + INTERVAL 10 DAY,-- Vigente por 10 días más
  1,                          -- Status 1 = Activa
  CURDATE() + INTERVAL 11 DAY,-- Fechas de retroalimentación
  CURDATE() + INTERVAL 20 DAY,
  CURDATE() + INTERVAL 11 DAY,-- Fechas del plan de acción
  CURDATE() + INTERVAL 40 DAY,
  1,                          -- Dirigido a Empleados
  '1014',                     -- Evaluada principal
  1,                          -- Publicada/Activada
  1,                          -- Preguntas Aceptadas
  1,
  1,
  '1'
);

SET @evaluation_id := LAST_INSERT_ID();

-- Sucursales asociadas para la evaluación 360
INSERT INTO `ConfiguracionInicialEvaluacion` (`IdSucursal`, `idEvaluaciones`) VALUES
(1, @evaluation_id),
(2, @evaluation_id),
(3, @evaluation_id);

-- Evaluadores 360 para Alicia Torres (StatusEvaluado = 0 para indicar sin contestar)
INSERT INTO `EvaluacionDetalle` (
  `idEvaluaciones`,
  `NoEmpleadoEvalua`,
  `NoEmpleadoEvaluado`,
  `Status`,
  `StatusEvaluado`,
  `JefeEvalua`,
  `ParEvalua`,
  `AutoEvalua`,
  `SubordinadoEvalua`,
  `NivelEvaluado`,
  `PuestoEvaluado`
) VALUES
(@evaluation_id, @boss_employee, @target_employee, 1, 0, 1, 0, 0, 0, @target_level, @target_position),        -- Jefe
(@evaluation_id, @peer_employee, @target_employee, 1, 0, 0, 1, 0, 0, @target_level, @target_position),        -- Par
(@evaluation_id, @target_employee, @target_employee, 1, 0, 0, 0, 1, 0, @target_level, @target_position),      -- Autoevaluación
(@evaluation_id, @subordinate_employee, @target_employee, 1, 0, 0, 0, 0, 1, @target_level, @target_position);  -- Subordinado

-- Obtener IDs de EvaluacionDetalle creados para la 360
SET @det_360_boss := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @boss_employee LIMIT 1);
SET @det_360_peer := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @peer_employee LIMIT 1);
SET @det_360_self := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @target_employee LIMIT 1);
SET @det_360_subordinate := (SELECT idEvaluacionDetalle FROM EvaluacionDetalle WHERE idEvaluaciones = @evaluation_id AND NoEmpleadoEvalua = @subordinate_employee LIMIT 1);

-- Pregunta 1 (360): Opción Múltiple (idTipoPregunta = 2)
INSERT INTO `PreguntasEvaluacion` (
  `idEvaluaciones`,
  `idTipoPregunta`,
  `idCompetencias`,
  `Titulo`,
  `Descripcion`
) VALUES (
  @evaluation_id,
  2, -- Opción Múltiple
  2, -- Trabajo en Equipo
  '¿Cómo califica el espíritu de colaboración y apoyo mutuo de la persona evaluada?',
  'Evalúa la disposición de la persona para ayudar a su equipo.'
);

SET @q_360_om := LAST_INSERT_ID();

-- Opciones de respuesta para la Pregunta 1 (360)
INSERT INTO `PreguntasPosiblesRespuestas` (`idPreguntasEvaluacion`, `DescripcionRespuesta`) VALUES
(@q_360_om, 'Excelente (Siempre apoya)'),
(@q_360_om, 'Bueno (Normalmente apoya)'),
(@q_360_om, 'Regular (Ocasionalmente apoya)'),
(@q_360_om, 'Malo (Rara vez apoya)');

-- Obtener IDs de las respuestas posibles para la configuración por niveles
SET @ans_360_excelente := (
  SELECT `idPreguntasPosiblesRespuestas`
  FROM `PreguntasPosiblesRespuestas`
  WHERE `idPreguntasEvaluacion` = @q_360_om AND `DescripcionRespuesta` = 'Excelente (Siempre apoya)'
  LIMIT 1
);

SET @ans_360_bueno := (
  SELECT `idPreguntasPosiblesRespuestas`
  FROM `PreguntasPosiblesRespuestas`
  WHERE `idPreguntasEvaluacion` = @q_360_om AND `DescripcionRespuesta` = 'Bueno (Normalmente apoya)'
  LIMIT 1
);

-- Configuración de respuestas esperadas por nivel de empleado
-- (Nivel 4 = Operativos, Nivel 3 = Coordinadores/Supervisores, Nivel 2 = Gerentes, Nivel 1 = Alta Dirección)
INSERT INTO `PreguntasConfiguracion` (
  `idPreguntasEvaluacion`,
  `RespuestaEsperadoOM`,
  `NivelEmpleadoEsperadoOM`
) VALUES
(@q_360_om, @ans_360_excelente, 4),  -- Operativos (Alicia) -> Excelente
(@q_360_om, @ans_360_bueno,     3),  -- Coordinadores/Supervisores -> Bueno
(@q_360_om, @ans_360_bueno,     2),  -- Gerentes -> Bueno
(@q_360_om, @ans_360_excelente, 1);  -- Alta Dirección -> Excelente

-- Pregunta 2 (360): Verdadero/Falso (idTipoPregunta = 1)
INSERT INTO `PreguntasEvaluacion` (
  `idEvaluaciones`,
  `idTipoPregunta`,
  `idCompetencias`,
  `Titulo`,
  `Descripcion`
) VALUES (
  @evaluation_id,
  1, -- Verdadero / Falso
  3, -- Autocontrol
  '¿El evaluado mantiene el autocontrol ante situaciones complejas o bajo presion?',
  'Valora la estabilidad emocional y tolerancia al estrés.'
);

SET @q_360_vf := LAST_INSERT_ID();

-- Configuración de respuesta esperada genérica para V/F (Verdadero = 1)
INSERT INTO `PreguntasConfiguracion` (`idPreguntasEvaluacion`, `BoolCorreta`)
VALUES (@q_360_vf, 1);

-- Inserción de respuestas vacías iniciales para la evaluación 360
INSERT INTO `RespuestaEvaluaciones` (
  `idEvaluacionDetalle`, `idCompetencias`, `Registro`, `Comentarios`, `Calificacion`, `idPreguntasEvaluacion`
) VALUES
-- Jefe
(@det_360_boss, 2, NOW(), NULL, NULL, @q_360_om),
(@det_360_boss, 3, NOW(), NULL, NULL, @q_360_vf),
-- Par
(@det_360_peer, 2, NOW(), NULL, NULL, @q_360_om),
(@det_360_peer, 3, NOW(), NULL, NULL, @q_360_vf),
-- Autoevaluación
(@det_360_self, 2, NOW(), NULL, NULL, @q_360_om),
(@det_360_self, 3, NOW(), NULL, NULL, @q_360_vf),
-- Subordinado
(@det_360_subordinate, 2, NOW(), NULL, NULL, @q_360_om),
(@det_360_subordinate, 3, NOW(), NULL, NULL, @q_360_vf);

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;

COMMIT;

-- ============================================================================
-- CONSULTAS DE SALIDA Y VALIDACIÓN
-- ============================================================================

SELECT '--- VALIDACIÓN DE EVALUACIONES CREADAS ---' AS Info;

-- 1. Cabeceras de evaluación creadas
SELECT
  `idEvaluaciones`,
  `Titulo`,
  `TipoEvaluacion`,
  CASE `TipoEvaluacion` WHEN 1 THEN 'Evaluación 360°' ELSE 'Encuesta Normal' END AS TipoDesc,
  `Activado`,
  `PreguntasAceptadas`,
  `Status`
FROM `Evaluaciones`
WHERE `idEvaluaciones` IN (@normal_evaluation_id, @evaluation_id);

-- 2. Preguntas de las evaluaciones y sus respuestas correctas o esperadas
SELECT
  PE.`idEvaluaciones`,
  PE.`idPreguntasEvaluacion` AS IdPregunta,
  PE.`Titulo` AS TituloPregunta,
  TP.`Descripcion` AS TipoPregunta,
  C.`Competencia`,
  PC.`BoolCorreta` AS VF_Esperado,
  (SELECT DescripcionRespuesta FROM PreguntasPosiblesRespuestas WHERE idPreguntasPosiblesRespuestas = PC.RespuestaCorrectaOM) AS Normal_OM_Correcto,
  PC.`NivelEmpleadoEsperadoOM` AS Nivel_360_Esperado,
  (SELECT DescripcionRespuesta FROM PreguntasPosiblesRespuestas WHERE idPreguntasPosiblesRespuestas = PC.RespuestaEsperadoOM) AS OM_360_Esperado
FROM `PreguntasEvaluacion` PE
INNER JOIN `TipoPregunta` TP ON TP.`idTipoPregunta` = PE.`idTipoPregunta`
INNER JOIN `Competencias` C ON C.`idCompetencias` = PE.`idCompetencias`
LEFT JOIN `PreguntasConfiguracion` PC ON PC.`idPreguntasEvaluacion` = PE.`idPreguntasEvaluacion`
WHERE PE.`idEvaluaciones` IN (@normal_evaluation_id, @evaluation_id)
ORDER BY PE.`idEvaluaciones` DESC, PE.`idPreguntasEvaluacion` ASC;

-- 3. Estado de participación y avance (Evaluadores y Evaluados)
SELECT
  ED.`idEvaluaciones`,
  EV.`Titulo` AS Evaluacion,
  ED.`NoEmpleadoEvalua` AS Evaluador,
  E_Evalua.`Nombre` AS NombreEvaluador,
  ED.`NoEmpleadoEvaluado` AS Evaluado,
  E_Evaluado.`Nombre` AS NombreEvaluado,
  ED.`StatusEvaluado` AS Respondido,
  ED.`JefeEvalua`,
  ED.`ParEvalua`,
  ED.`AutoEvalua`,
  ED.`SubordinadoEvalua`
FROM `EvaluacionDetalle` ED
INNER JOIN `Evaluaciones` EV ON EV.`idEvaluaciones` = ED.`idEvaluaciones`
INNER JOIN `Empleados` E_Evalua ON E_Evalua.`NoEmpleado` = ED.`NoEmpleadoEvalua`
INNER JOIN `Empleados` E_Evaluado ON E_Evaluado.`NoEmpleado` = ED.`NoEmpleadoEvaluado`
WHERE ED.`idEvaluaciones` IN (@normal_evaluation_id, @evaluation_id)
ORDER BY ED.`idEvaluaciones` DESC, ED.`AutoEvalua` DESC, ED.`JefeEvalua` DESC;

-- 4. Respuestas vacías iniciales en RespuestaEvaluaciones
SELECT
  RE.idRespuestaEvaluaciones,
  RE.idEvaluacionDetalle,
  E_Evalua.Nombre AS Evaluador,
  PE.Titulo AS Pregunta,
  RE.Calificacion,
  RE.Comentarios
FROM RespuestaEvaluaciones RE
INNER JOIN EvaluacionDetalle ED ON ED.idEvaluacionDetalle = RE.idEvaluacionDetalle
INNER JOIN Empleados E_Evalua ON E_Evalua.NoEmpleado = ED.NoEmpleadoEvalua
INNER JOIN PreguntasEvaluacion PE ON PE.idPreguntasEvaluacion = RE.idPreguntasEvaluacion
WHERE ED.idEvaluaciones IN (@normal_evaluation_id, @evaluation_id)
ORDER BY RE.idEvaluacionDetalle ASC, RE.idPreguntasEvaluacion ASC;
