-- ============================================================
-- Script de verificación / recreación de tablas intermedias
-- Base de datos: klynet_datosdemo
-- ============================================================

USE `klynet_datosdemo`;

-- ============================================================
-- 1. VACANTES ↔ EVALUACIONES (Muchos a Muchos)
--    Una vacante puede tener muchas evaluaciones
--    Una evaluación puede estar asignada a varias vacantes
-- ============================================================
-- NOTA: Esta tabla YA EXISTE en tu base de datos.
-- Solo ejecuta si necesitas recrearla.

-- DROP TABLE IF EXISTS `VacantesEvaluaciones`;

CREATE TABLE IF NOT EXISTS `VacantesEvaluaciones` (
  `IdVacanteEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdEvaluacion` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL COMMENT 'Proceso en el que se aplica la evaluación',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdVacanteEvaluacion`),
  UNIQUE KEY `uk_vacante_evaluacion_proceso` (`IdVacante`, `IdEvaluacion`, `IdProceso`),
  KEY `fk_vacanteseval_evaluacion` (`IdEvaluacion`),
  KEY `fk_vacanteseval_proceso` (`IdProceso`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


-- ============================================================
-- 2. POSTULANTES ↔ EVALUACIONES (Muchos a Muchos)
--    Un postulante puede tener varias evaluaciones
--    Una evaluación puede tener a varios postulantes
-- ============================================================
-- NOTA: Esta tabla YA EXISTE en tu base de datos.
-- Solo ejecuta si necesitas recrearla.

-- DROP TABLE IF EXISTS `PostulantesEvaluaciones`;

CREATE TABLE IF NOT EXISTS `PostulantesEvaluaciones` (
  `IdPostulanteEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `IdVacanteEvaluacion` int(11) NOT NULL,
  `FechaInicio` timestamp NULL DEFAULT NULL,
  `FechaFinalizacion` timestamp NULL DEFAULT NULL,
  `Calificacion` decimal(5,2) DEFAULT NULL,
  `EstatusEvaluacion` tinyint(1) DEFAULT '1' COMMENT '1=Pendiente, 2=En progreso, 3=Completada',
  PRIMARY KEY (`IdPostulanteEvaluacion`),
  UNIQUE KEY `uk_postulante_evaluacion` (`IdPostulanteVacante`, `IdVacanteEvaluacion`),
  KEY `fk_posteval_vaceval` (`IdVacanteEvaluacion`),
  KEY `idx_posteval_estatus` (`EstatusEvaluacion`),
  KEY `idx_posteval_fechainicio` (`FechaInicio`),
  KEY `idx_posteval_postulante_fecha` (`IdPostulanteVacante`, `FechaInicio`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
