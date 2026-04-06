-- ============================================================
-- Tabla PostulantesRespuestas
-- Guarda las respuestas individuales de un postulante a las 
-- preguntas de una evaluación.
-- Base de datos: klynet_datosdemo
-- ============================================================

USE `klynet_datosdemo`;

CREATE TABLE IF NOT EXISTS `PostulantesRespuestas` (
  `IdPostulanteRespuesta` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteEvaluacion` int(11) NOT NULL COMMENT 'FK a PostulantesEvaluaciones',
  `IdPreguntasEvaluacion` int(11) NOT NULL COMMENT 'FK a PreguntasEvaluacion',
  `Respuesta` text DEFAULT NULL COMMENT 'La respuesta del postulante (texto, ID de opción, o valor numérico)',
  `FechaRespuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulanteRespuesta`),
  UNIQUE KEY `uk_postulante_pregunta` (`IdPostulanteEvaluacion`, `IdPreguntasEvaluacion`),
  KEY `idx_postresp_evaluacion` (`IdPostulanteEvaluacion`),
  KEY `idx_postresp_pregunta` (`IdPreguntasEvaluacion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ============================================================
-- Alterar tabla Evaluaciones para permitir NULL en fechas 
-- de retroalimentación y plan de acción (para Encuestas Normales)
-- ============================================================

ALTER TABLE Evaluaciones 
  MODIFY COLUMN RetroFechaIni DATE NULL DEFAULT NULL,
  MODIFY COLUMN RetroFechaFin DATE NULL DEFAULT NULL,
  MODIFY COLUMN PlanAFechaIni DATE NULL DEFAULT NULL,
  MODIFY COLUMN PlanAFechaFin DATE NULL DEFAULT NULL;
