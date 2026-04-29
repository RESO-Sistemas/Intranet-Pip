-- =====================================================
-- SCHEMA IBERO — Bolsa de Trabajo Universidad Iberoamericana
-- Base de datos: klynet_datosdemo
-- Tablas independientes con sufijo Ibero
-- =====================================================

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================
-- CATÁLOGOS IBERO
-- ============================

DROP TABLE IF EXISTS `AreasTecnicasIbero`;
CREATE TABLE `AreasTecnicasIbero` (
  `IdAreaTecnica` int(11) NOT NULL AUTO_INCREMENT,
  `NombreArea` varchar(100) NOT NULL,
  `Descripcion` text,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdAreaTecnica`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `AreasTecnicasIbero` (`NombreArea`, `Descripcion`) VALUES
('Sistemas e Informática', 'Área de tecnología y desarrollo'),
('Recursos Humanos', 'Área de gestión de talento'),
('Finanzas', 'Área contable y financiera'),
('Marketing y Comunicación', 'Área de difusión y medios'),
('Administración Escolar', 'Área de servicios académicos');

DROP TABLE IF EXISTS `EmpresasIbero`;
CREATE TABLE `EmpresasIbero` (
  `IdEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEmpresa` varchar(200) NOT NULL,
  `Descripcion` text,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdEmpresa`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `EmpresasIbero` (`NombreEmpresa`) VALUES
('Universidad Iberoamericana'),
('Grupo Lala'),
('Industrias Peñoles');

DROP TABLE IF EXISTS `ProcesosVacantesIbero`;
CREATE TABLE `ProcesosVacantesIbero` (
  `IdProceso` int(11) NOT NULL AUTO_INCREMENT,
  `NombreProceso` varchar(100) NOT NULL,
  `Descripcion` text,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdProceso`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `ProcesosVacantesIbero` (`NombreProceso`, `Descripcion`) VALUES
('Revisión de Documentos', 'Verificación inicial de CV y solicitud'),
('Entrevista Recursos Humanos', 'Entrevista con el área de RH'),
('Entrevista con Área', 'Entrevista técnica con jefe directo'),
('Evaluación Psicométrica', 'Aplicación de pruebas psicométricas'),
('Oferta Económica', 'Presentación y negociación de oferta'),
('Contratación', 'Proceso de alta y firma de contrato');

DROP TABLE IF EXISTS `InduccionesVacantesIbero`;
CREATE TABLE `InduccionesVacantesIbero` (
  `IdInduccion` int(11) NOT NULL AUTO_INCREMENT,
  `NombreInduccion` varchar(150) NOT NULL,
  `Descripcion` text,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdInduccion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `InduccionesVacantesIbero` (`NombreInduccion`) VALUES
('Inducción General Ibero'),
('Inducción al Área'),
('Reglamento Institucional'),
('Herramientas y Sistemas');

-- ============================
-- EVALUACIONES IBERO
-- ============================

DROP TABLE IF EXISTS `TipoPreguntaIbero`;
CREATE TABLE `TipoPreguntaIbero` (
  `idTipoPregunta` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Bool` int(11) NOT NULL DEFAULT '0' COMMENT '1 si es Verdadero/Falso',
  `Multiple1R` int(11) NOT NULL DEFAULT '0' COMMENT '1 si es Opción Múltiple con 1 respuesta',
  `MultipleEsperado` int(11) NOT NULL DEFAULT '0',
  `EvaluaEmpleados` int(11) NOT NULL DEFAULT '0',
  `Rango` int(11) NOT NULL DEFAULT '0' COMMENT '1 si es de tipo Rango',
  PRIMARY KEY (`idTipoPregunta`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- Catálogo idéntico al de PIP (mismos IDs y semántica)
INSERT INTO `TipoPreguntaIbero` (`idTipoPregunta`,`Descripcion`,`Status`,`Bool`,`Multiple1R`,`MultipleEsperado`,`EvaluaEmpleados`,`Rango`) VALUES
(1, 'Verdadero / Falso',      1, 1, 0, 0, 0, 0),
(2, 'Opción Múltiple',         1, 0, 1, 0, 0, 0),
(3, 'Rango',                  1, 0, 0, 0, 0, 1),
(4, 'Texto Libre',            1, 0, 0, 0, 0, 0);

CREATE TABLE `CompetenciasIbero` (
  `idCompetencias` int(11) NOT NULL AUTO_INCREMENT,
  `Competencia` varchar(100) NOT NULL,
  `Significado` varchar(500) DEFAULT '',
  `Estatus` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idCompetencias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `EvaluacionesIbero`;
CREATE TABLE `EvaluacionesIbero` (
  `idEvaluaciones` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(150) NOT NULL,
  `TipoEvaluacion` tinyint(1) NOT NULL DEFAULT '2' COMMENT '1=360, 2=Encuesta Normal',
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `DirigidoA` tinyint(4) NOT NULL DEFAULT '2' COMMENT '2=Postulante',
  `PreguntasAceptadas` int(11) NOT NULL DEFAULT '0',
  `FechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEvaluaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PreguntasEvaluacionIbero`;
CREATE TABLE `PreguntasEvaluacionIbero` (
  `idPreguntasEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluaciones` int(11) NOT NULL,
  `idTipoPregunta` int(11) NOT NULL DEFAULT '2' COMMENT 'FK a TipoPreguntaIbero',
  `idCompetencias` int(11) DEFAULT NULL,
  `Titulo` varchar(250) NOT NULL,
  `Descripcion` text,
  `Orden` int(11) DEFAULT '0',
  `Registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPreguntasEvaluacion`),
  KEY `idx_pregs_eval` (`idEvaluaciones`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PreguntasPosiblesRespuestasIbero`;
CREATE TABLE `PreguntasPosiblesRespuestasIbero` (
  `idPreguntasPosiblesRespuestas` int(11) NOT NULL AUTO_INCREMENT,
  `idPreguntasEvaluacion` int(11) NOT NULL,
  `DescripcionRespuesta` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`idPreguntasPosiblesRespuestas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PreguntasConfiguracionIbero`;
CREATE TABLE `PreguntasConfiguracionIbero` (
  `idPreguntasConfiguracion` int(11) NOT NULL AUTO_INCREMENT,
  `idPreguntasEvaluacion` int(11) NOT NULL,
  `RangoInicial` int(11) DEFAULT NULL COMMENT 'Valor mínimo del rango',
  `RangoFinal` int(11) DEFAULT NULL COMMENT 'Valor máximo del rango',
  `BoolCorreta` int(11) DEFAULT NULL COMMENT '1=Verdadero, 0=Falso',
  `RespuestaEsperadoOM` int(11) DEFAULT NULL,
  `ValorEsperadoOM` int(11) DEFAULT NULL,
  `RespuestaCorrectaOM` int(11) DEFAULT NULL COMMENT 'FK a PreguntasPosiblesRespuestasIbero',
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPreguntasConfiguracion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ============================
-- VACANTES IBERO
-- ============================

DROP TABLE IF EXISTS `VacantesIbero`;
CREATE TABLE `VacantesIbero` (
  `IdVacante` int(11) NOT NULL AUTO_INCREMENT,
  `NombreVacante` varchar(200) NOT NULL,
  `IdAreaTecnica` int(11) DEFAULT NULL,
  `IdPuesto` int(11) DEFAULT NULL COMMENT 'Referencia a Puestos del sistema principal',
  `TipoContratacion` varchar(50) DEFAULT NULL,
  `IdEmpresa` int(11) DEFAULT NULL COMMENT 'Referencia a EmpresasIbero',
  `DescripcionPuesto` text,
  `SalarioMinimo` decimal(10,2) DEFAULT NULL,
  `SalarioMaximo` decimal(10,2) DEFAULT NULL,
  `FechaApertura` date DEFAULT NULL,
  `FechaCierre` date DEFAULT NULL,
  `Estatus` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Borrador, 2=Activa, 3=Cerrada',
  `Publicada` tinyint(1) NOT NULL DEFAULT '0',
  `BanderaCV` tinyint(1) NOT NULL DEFAULT '0',
  `BanderaSE` tinyint(1) NOT NULL DEFAULT '0',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `VacantesRequisitosIbero`;
CREATE TABLE `VacantesRequisitosIbero` (
  `IdVacanteRequisito` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `Requisito` text NOT NULL,
  `Orden` int(11) DEFAULT '0',
  PRIMARY KEY (`IdVacanteRequisito`),
  KEY `idx_req_vacante` (`IdVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `VacantesEvaluacionesIbero`;
CREATE TABLE `VacantesEvaluacionesIbero` (
  `IdVacanteEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdEvaluacion` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL,
  PRIMARY KEY (`IdVacanteEvaluacion`),
  KEY `idx_vaceval` (`IdVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `VacantesInduccionesIbero`;
CREATE TABLE `VacantesInduccionesIbero` (
  `IdVacanteInduccion` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdInduccion` int(11) NOT NULL,
  PRIMARY KEY (`IdVacanteInduccion`),
  KEY `idx_vacind` (`IdVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ============================
-- POSTULANTES IBERO
-- ============================

DROP TABLE IF EXISTS `PostulantesIbero`;
CREATE TABLE `PostulantesIbero` (
  `IdPostulante` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `ApellidoPaterno` varchar(100) NOT NULL,
  `ApellidoMaterno` varchar(100) DEFAULT '',
  `CURP` varchar(20) DEFAULT '',
  `Telefono` varchar(15) DEFAULT '',
  `CorreoElectronico` varchar(150) NOT NULL,
  `Direccion` text,
  `CodigoPostal` varchar(5) DEFAULT '',
  `Estado` varchar(100) DEFAULT '',
  `Ciudad` varchar(100) DEFAULT '',
  `Colonia` varchar(150) DEFAULT '',
  `IdEmpleado` int(11) DEFAULT NULL,
  `FechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulante`),
  KEY `idx_post_curp` (`CURP`),
  KEY `idx_post_correo` (`CorreoElectronico`(50))
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PostulantesTelefonosIbero`;
CREATE TABLE `PostulantesTelefonosIbero` (
  `IdTelefonoHistorico` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulante` int(11) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Observaciones` varchar(300) DEFAULT NULL,
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  `UsuarioRegistro` int(11) DEFAULT NULL,
  `FechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdTelefonoHistorico`),
  UNIQUE KEY `uk_tel_ibero` (`IdPostulante`, `Telefono`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ============================
-- POSTULACIONES IBERO
-- ============================

DROP TABLE IF EXISTS `PostulantesVacantesIbero`;
CREATE TABLE `PostulantesVacantesIbero` (
  `IdPostulanteVacante` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdPostulante` int(11) NOT NULL,
  `EstatusPostulacion` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=EnProceso, 2=Aceptado, 3=Descartado, 4=Finalizado',
  `RutaCV` varchar(500) DEFAULT NULL,
  `RutaSolicitudEmpleo` varchar(500) DEFAULT NULL,
  `Observaciones` text,
  `FechaPostulacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulanteVacante`),
  UNIQUE KEY `uk_postulacion_ibero` (`IdVacante`,`IdPostulante`),
  KEY `idx_pv_vacante` (`IdVacante`),
  KEY `idx_pv_postulante` (`IdPostulante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PostulantesRequisitosIbero`;
CREATE TABLE `PostulantesRequisitosIbero` (
  `IdPostulanteRequisito` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacanteRequisito` int(11) NOT NULL,
  `IdPostulanteVacante` int(11) NOT NULL,
  `Respuesta` text,
  `Cumple` tinyint(1) DEFAULT NULL,
  `FechaRespuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulanteRequisito`),
  UNIQUE KEY `uk_req_ibero` (`IdVacanteRequisito`,`IdPostulanteVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PostulantesHistorialIbero`;
CREATE TABLE `PostulantesHistorialIbero` (
  `IdHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL,
  `Observaciones` text,
  `Resultado` tinyint(1) DEFAULT NULL COMMENT 'NULL=Pendiente, 1=Aprobado, 0=Rechazado',
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsuarioRegistro` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdHistorial`),
  KEY `idx_hist_pv` (`IdPostulanteVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ============================
-- EVALUACIONES DE POSTULANTES IBERO
-- ============================

DROP TABLE IF EXISTS `PostulantesEvaluacionesIbero`;
CREATE TABLE `PostulantesEvaluacionesIbero` (
  `IdPostulanteEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `IdVacanteEvaluacion` int(11) NOT NULL,
  `EstatusEvaluacion` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=Pendiente, 2=EnProgreso, 3=Completada',
  `Calificacion` decimal(5,2) DEFAULT NULL,
  `FechaInicio` timestamp NULL DEFAULT NULL,
  `FechaFin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`IdPostulanteEvaluacion`),
  KEY `idx_pe_pv` (`IdPostulanteVacante`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `PostulantesRespuestasIbero`;
CREATE TABLE `PostulantesRespuestasIbero` (
  `IdRespuesta` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteEvaluacion` int(11) NOT NULL,
  `IdPreguntasEvaluacion` int(11) NOT NULL,
  `Respuesta` text,
  `FechaRespuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdRespuesta`),
  KEY `idx_resp_pe` (`IdPostulanteEvaluacion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ============================
-- ARCHIVOS DE POSTULANTES IBERO
-- ============================

DROP TABLE IF EXISTS `PostulantesArchivosIbero`;
CREATE TABLE `PostulantesArchivosIbero` (
  `IdArchivo` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `TipoArchivo` varchar(30) NOT NULL COMMENT 'CV o SolicitudEmpleo',
  `NombreArchivo` varchar(255) DEFAULT NULL,
  `ContentType` varchar(100) DEFAULT NULL,
  `TamanoBytes` int(11) DEFAULT NULL,
  `Contenido` longblob,
  `FechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdArchivo`),
  UNIQUE KEY `uk_archivo_tipo` (`IdPostulanteVacante`,`TipoArchivo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
