-- MySQL dump 10.13  Distrib 8.0.45, for macos15 (arm64)
--
-- Host: 162.240.213.3    Database: klynet_datosdemo
-- ------------------------------------------------------
-- Server version	5.7.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ActividadesPlanAccion`
--

DROP TABLE IF EXISTS `ActividadesPlanAccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ActividadesPlanAccion` (
  `idActividadesPlanAccion` int(11) NOT NULL AUTO_INCREMENT,
  `idObjetivosPlanAccion` int(11) NOT NULL,
  `Titulo` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Descripcion` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `Progreso` int(11) NOT NULL DEFAULT '0',
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idActividadesPlanAccion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ArchivosCapacitacion`
--

DROP TABLE IF EXISTS `ArchivosCapacitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArchivosCapacitacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ArchivosFeed`
--

DROP TABLE IF EXISTS `ArchivosFeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArchivosFeed` (
  `idArchivosFeed` int(11) NOT NULL AUTO_INCREMENT,
  `idFeed` int(11) NOT NULL,
  `Archivo` mediumtext COLLATE utf8_unicode_ci,
  `ContentType` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Content` longblob,
  PRIMARY KEY (`idArchivosFeed`),
  KEY `idx_archivos_feed` (`idFeed`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ArchivosFeedTest`
--

DROP TABLE IF EXISTS `ArchivosFeedTest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ArchivosFeedTest` (
  `idArchivosFeed` int(11) NOT NULL AUTO_INCREMENT,
  `idFeed` int(11) NOT NULL,
  `Archivo` varchar(255) DEFAULT NULL,
  `ContentType` varchar(100) DEFAULT NULL,
  `Content` longblob,
  `Registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idArchivosFeed`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AreasTecnicas`
--

DROP TABLE IF EXISTS `AreasTecnicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AreasTecnicas` (
  `IdAreaTecnica` int(11) NOT NULL AUTO_INCREMENT,
  `NombreArea` varchar(100) NOT NULL,
  `Descripcion` text,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdAreaTecnica`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AvancePlanAccionInc`
--

DROP TABLE IF EXISTS `AvancePlanAccionInc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AvancePlanAccionInc` (
  `IdAvance` int(11) NOT NULL AUTO_INCREMENT,
  `IdPlanAccionInc` int(11) NOT NULL,
  `NuevoAvance` int(11) NOT NULL,
  `DescripcionAvance` text NOT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdAvance`),
  KEY `IdPlanAccionInc` (`IdPlanAccionInc`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BitacoraVisitasIndex`
--

DROP TABLE IF EXISTS `BitacoraVisitasIndex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BitacoraVisitasIndex` (
  `idBitacoraVisitasIndex` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleado` int(11) NOT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idBitacoraVisitasIndex`)
) ENGINE=MyISAM AUTO_INCREMENT=28662 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Capacitacion`
--

DROP TABLE IF EXISTS `Capacitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Capacitacion` (
  `idCapacitacion` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL,
  `Registro` datetime NOT NULL,
  `Status` int(11) DEFAULT '1',
  `Dias` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `archivo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_archivoCapacitacion` int(11) DEFAULT NULL,
  `Tipo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idCapacitacion`),
  KEY `FK_id_archivocapacitacion` (`id_archivoCapacitacion`),
  CONSTRAINT `FK_id_archivocapacitacion` FOREIGN KEY (`id_archivoCapacitacion`) REFERENCES `ArchivosCapacitacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CapacitacionDetalle`
--

DROP TABLE IF EXISTS `CapacitacionDetalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CapacitacionDetalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_capacitacion` int(11) NOT NULL,
  `NoEmpleado` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Capacitacion_DivxPuesxDpto`
--

DROP TABLE IF EXISTS `Capacitacion_DivxPuesxDpto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Capacitacion_DivxPuesxDpto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_capacitacion` int(11) NOT NULL,
  `NoEmpleado` text COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CatalogoLineaEtica`
--

DROP TABLE IF EXISTS `CatalogoLineaEtica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CatalogoLineaEtica` (
  `idCatalogoLineaEtica` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) DEFAULT '1',
  PRIMARY KEY (`idCatalogoLineaEtica`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CentroCostos`
--

DROP TABLE IF EXISTS `CentroCostos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CentroCostos` (
  `IdCentroCosto` int(11) NOT NULL,
  `CentrodeCosto` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`IdCentroCosto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ChecklistEmpleados`
--

DROP TABLE IF EXISTS `ChecklistEmpleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChecklistEmpleados` (
  `IdChecklistEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `IdChecklist` int(11) NOT NULL,
  `NoEmpleado` varchar(20) NOT NULL,
  `Respuesta` tinyint(1) NOT NULL COMMENT '1=True, 0=False',
  `HoraRevision` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdChecklistEmpleado`),
  KEY `idx_chk_emp_noemp_hora` (`NoEmpleado`,`HoraRevision`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ChecklistTurnos`
--

DROP TABLE IF EXISTS `ChecklistTurnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChecklistTurnos` (
  `IdChecklist` int(11) NOT NULL,
  `IdTurno` int(11) NOT NULL,
  PRIMARY KEY (`IdChecklist`,`IdTurno`),
  KEY `IdTurno` (`IdTurno`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Checklists`
--

DROP TABLE IF EXISTS `Checklists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Checklists` (
  `IdChecklist` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  `IdPuesto` int(11) NOT NULL,
  `Tipo` enum('Critico','No Critico') NOT NULL DEFAULT 'No Critico',
  `RespuestaEsperada` tinyint(1) NOT NULL DEFAULT '1',
  `IdKpi` int(11) NOT NULL,
  `AbreIncidencia` tinyint(1) NOT NULL DEFAULT '0',
  `IdTipoIncidencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdChecklist`),
  KEY `IdPuesto` (`IdPuesto`),
  KEY `IdKpi` (`IdKpi`),
  KEY `fk_chk_tipo_inc` (`IdTipoIncidencia`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ComentariosFeed`
--

DROP TABLE IF EXISTS `ComentariosFeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ComentariosFeed` (
  `idComentariosFeed` int(11) NOT NULL AUTO_INCREMENT,
  `idFeed` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Comentario` text COLLATE utf8_unicode_ci NOT NULL,
  `Registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Revisado` int(11) NOT NULL DEFAULT '0',
  `Autorizado` int(11) NOT NULL DEFAULT '0',
  `UsuarioRevisa` int(11) DEFAULT NULL,
  `FechaRevisado` datetime DEFAULT NULL,
  `UsuarioCancelaAceptada` int(11) DEFAULT NULL,
  `FechaCancelaAceptada` datetime DEFAULT NULL,
  PRIMARY KEY (`idComentariosFeed`),
  KEY `idx_comentarios_feed_auth` (`idFeed`,`Revisado`,`Autorizado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Competencias`
--

DROP TABLE IF EXISTS `Competencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Competencias` (
  `idCompetencias` int(11) NOT NULL AUTO_INCREMENT,
  `Competencia` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Significado` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Estatus` int(11) NOT NULL DEFAULT '1',
  `TipoCompetencia` int(11) NOT NULL,
  `A` text COLLATE utf8_unicode_ci,
  `B` text COLLATE utf8_unicode_ci,
  `C` text COLLATE utf8_unicode_ci,
  `D` text COLLATE utf8_unicode_ci,
  `E` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`idCompetencias`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Configuracion`
--

DROP TABLE IF EXISTS `Configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Configuracion` (
  `idConfiguracion` int(11) NOT NULL AUTO_INCREMENT,
  `Valor` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Detalles` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idConfiguracion`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ConfiguracionInicialEvaluacion`
--

DROP TABLE IF EXISTS `ConfiguracionInicialEvaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ConfiguracionInicialEvaluacion` (
  `idConfiguracionInicialEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdSucursal` int(11) NOT NULL,
  `idEvaluaciones` int(11) NOT NULL,
  PRIMARY KEY (`idConfiguracionInicialEvaluacion`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ConfiguracionPersonalizacion`
--

DROP TABLE IF EXISTS `ConfiguracionPersonalizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ConfiguracionPersonalizacion` (
  `idConfiguracionPersonalizacion` int(11) NOT NULL AUTO_INCREMENT,
  `MensajeBienvenida` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TiempoHorasRecoveryPass` int(11) NOT NULL,
  `PuestoRecibeLineaEtica` text,
  PRIMARY KEY (`idConfiguracionPersonalizacion`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleCapacitacion`
--

DROP TABLE IF EXISTS `DetalleCapacitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleCapacitacion` (
  `idDetalleCapacitacion` int(11) NOT NULL AUTO_INCREMENT,
  `idCapacitacion` int(11) NOT NULL,
  `idDiasSemana` int(11) NOT NULL,
  PRIMARY KEY (`idDetalleCapacitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleCompetencias`
--

DROP TABLE IF EXISTS `DetalleCompetencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleCompetencias` (
  `idDetalleCompetencias` int(11) NOT NULL AUTO_INCREMENT,
  `idCompetencias` int(11) NOT NULL,
  `NivelEmpleado` int(11) NOT NULL,
  `CalificacionEsperado` char(1) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idDetalleCompetencias`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleDirectorioExtensiones`
--

DROP TABLE IF EXISTS `DetalleDirectorioExtensiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleDirectorioExtensiones` (
  `idDetalleDirectorioExtensiones` int(11) NOT NULL AUTO_INCREMENT,
  `idDirectorioExtensiones` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Extension` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDetalleDirectorioExtensiones`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleDirectoriosCorreosTelefonos`
--

DROP TABLE IF EXISTS `DetalleDirectoriosCorreosTelefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleDirectoriosCorreosTelefonos` (
  `idDetalleDirectoriosCorreosTelefonos` int(11) NOT NULL AUTO_INCREMENT,
  `idDirectoriosCorreosTelefonos` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Telefono` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `MarcacionCorta` int(11) NOT NULL,
  PRIMARY KEY (`idDetalleDirectoriosCorreosTelefonos`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleEvaluacionesRespondidas`
--

DROP TABLE IF EXISTS `DetalleEvaluacionesRespondidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleEvaluacionesRespondidas` (
  `idDetalleEvaluacionesRespondidas` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluaciones` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  PRIMARY KEY (`idDetalleEvaluacionesRespondidas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleOrganigrama`
--

DROP TABLE IF EXISTS `DetalleOrganigrama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleOrganigrama` (
  `idDetalleOrganigrama` int(11) NOT NULL AUTO_INCREMENT,
  `idOrganigramas` int(11) NOT NULL,
  `idDetalleOrganigramaPadre` int(11) NOT NULL,
  `NoEmpleadoHijo` int(11) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Registro` datetime NOT NULL,
  `Otros` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Tipo` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Nivel` int(11) NOT NULL,
  `CoordenadaY` decimal(10,2) NOT NULL,
  `CoordenadaX` decimal(10,2) NOT NULL,
  `Ancho` decimal(10,2) NOT NULL DEFAULT '170.00',
  `Altura` decimal(10,2) NOT NULL DEFAULT '100.00',
  PRIMARY KEY (`idDetalleOrganigrama`)
) ENGINE=InnoDB AUTO_INCREMENT=436 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DiasFestivos`
--

DROP TABLE IF EXISTS `DiasFestivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DiasFestivos` (
  `idDiasFestivos` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Dia` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDiasFestivos`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DiasSemana`
--

DROP TABLE IF EXISTS `DiasSemana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DiasSemana` (
  `idDiasSemana` int(11) NOT NULL AUTO_INCREMENT,
  `Dia` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idDiasSemana`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DirectorioExtensiones`
--

DROP TABLE IF EXISTS `DirectorioExtensiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DirectorioExtensiones` (
  `idDirectorioExtensiones` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDirectorioExtensiones`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DirectorioSucursales`
--

DROP TABLE IF EXISTS `DirectorioSucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DirectorioSucursales` (
  `idDirectorioSucursales` int(11) NOT NULL AUTO_INCREMENT,
  `IdSucursal` int(11) NOT NULL,
  `Direccion` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Telefono` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `NumRed` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Correo` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FechaApertura` date NOT NULL,
  `MarcacionCorta` int(4) NOT NULL,
  `Registro` datetime NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDirectorioSucursales`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DirectoriosCorreosTelefonos`
--

DROP TABLE IF EXISTS `DirectoriosCorreosTelefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DirectoriosCorreosTelefonos` (
  `idDirectoriosCorreosTelefonos` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idDirectoriosCorreosTelefonos`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Divisiones`
--

DROP TABLE IF EXISTS `Divisiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Divisiones` (
  `IdDivision` int(11) NOT NULL,
  `Division` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `LaburaSabados` int(11) NOT NULL DEFAULT '1',
  `LaburaDomingos` int(11) NOT NULL DEFAULT '1',
  `LaburaDiasFestivos` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdDivision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DocumentacionEmpleados`
--

DROP TABLE IF EXISTS `DocumentacionEmpleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentacionEmpleados` (
  `IdDocumentacionEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleado` int(11) NOT NULL,
  `IdTipoDocumento` int(11) NOT NULL,
  `Estatus` enum('Completo','Pendiente','Vencido') NOT NULL DEFAULT 'Pendiente',
  `FechaCarga` date DEFAULT NULL,
  `FechaVencimiento` date DEFAULT NULL,
  `RutaArchivo` varchar(500) DEFAULT NULL,
  `Observaciones` text,
  `UsuarioRegistro` int(11) DEFAULT NULL,
  `FechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdDocumentacionEmpleado`),
  UNIQUE KEY `uk_doc_empleado_tipo` (`NoEmpleado`,`IdTipoDocumento`),
  KEY `idx_docempl_empleado` (`NoEmpleado`),
  KEY `idx_docempl_tipodoc` (`IdTipoDocumento`),
  KEY `idx_docempl_estatus` (`Estatus`),
  KEY `idx_docempl_fechavence` (`FechaVencimiento`),
  KEY `idx_docempl_empl_estatus` (`NoEmpleado`,`Estatus`),
  KEY `idx_docempl_empl_tipodoc` (`NoEmpleado`,`IdTipoDocumento`),
  KEY `idx_docempl_empl_fechavence` (`NoEmpleado`,`FechaVencimiento`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Empleados`
--

DROP TABLE IF EXISTS `Empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Empleados` (
  `NoEmpleado` int(11) NOT NULL,
  `Nombre` text COLLATE utf8_unicode_ci NOT NULL,
  `Antiguedad` date NOT NULL,
  `FNacimiento` date NOT NULL,
  `RFC` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `CURP` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `NoSeguro` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Movil` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `Nivel` int(11) NOT NULL,
  `IdCentroCosto` int(11) NOT NULL,
  `IdDivision` int(11) NOT NULL,
  `IdSucursal` int(11) NOT NULL,
  `IdPuesto` int(11) NOT NULL,
  `Password` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Imagen` text COLLATE utf8_unicode_ci,
  `MarcacionCorta` int(11) DEFAULT NULL,
  `HabitusExteriorDescripcion` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Peso` int(11) DEFAULT NULL,
  `Complexion` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Talla` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FrCardiaca` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FrRespiratoria` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TensionArterial` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Temperatura` int(11) DEFAULT NULL,
  `GrupoSanguineo` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FactorRh` int(11) DEFAULT NULL,
  `CartillaVacunacion` int(11) DEFAULT '0',
  `EsquemaCompleto` int(11) DEFAULT '0',
  `OtrosComentariosSalud` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Firma` text COLLATE utf8_unicode_ci,
  `Status` int(11) DEFAULT '1',
  `DiasVacacionesRest` int(11) NOT NULL DEFAULT '0',
  `tokenOS` text COLLATE utf8_unicode_ci NOT NULL,
  `Registro` datetime NOT NULL,
  `FeedAnniversary` int(11) NOT NULL DEFAULT '1',
  `FeedBirthday` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`NoEmpleado`),
  KEY `FK_EmpCentroCosto` (`IdCentroCosto`) USING BTREE,
  KEY `FK_EmpDivision` (`IdDivision`) USING BTREE,
  KEY `FK_EmpPuesto` (`IdPuesto`) USING BTREE,
  KEY `FK_EmpSucursal` (`IdSucursal`) USING BTREE,
  CONSTRAINT `FK_IdCentroCosto` FOREIGN KEY (`IdCentroCosto`) REFERENCES `CentroCostos` (`IdCentroCosto`),
  CONSTRAINT `FK_IdDivision` FOREIGN KEY (`IdDivision`) REFERENCES `Divisiones` (`IdDivision`),
  CONSTRAINT `FK_IdPuesto` FOREIGN KEY (`IdPuesto`) REFERENCES `Puestos` (`IdPuesto`),
  CONSTRAINT `FK_IdSucursal` FOREIGN KEY (`IdSucursal`) REFERENCES `SucursalDepto` (`IdSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EsperaNuevaEvaluacion`
--

DROP TABLE IF EXISTS `EsperaNuevaEvaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EsperaNuevaEvaluacion` (
  `idEsperaNuevaEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleadoEvalua` int(11) NOT NULL,
  `NoEmpleadoEvaluado` int(11) NOT NULL,
  `TipoEvaluador` int(11) NOT NULL,
  `NoEmpleadoRegistra` int(11) NOT NULL,
  `NivelEvaluado` int(11) NOT NULL,
  PRIMARY KEY (`idEsperaNuevaEvaluacion`)
) ENGINE=MyISAM AUTO_INCREMENT=593 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EsquemaVacunacionCOVID`
--

DROP TABLE IF EXISTS `EsquemaVacunacionCOVID`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EsquemaVacunacionCOVID` (
  `idEsquemaVacunacionCOVID` int(11) NOT NULL AUTO_INCREMENT,
  `Numero` int(11) NOT NULL,
  `Vacuna` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `FechaVacunacion` date DEFAULT NULL,
  `NoEmpleado` int(11) NOT NULL,
  PRIMARY KEY (`idEsquemaVacunacionCOVID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EstadoMensajesCapacitacion`
--

DROP TABLE IF EXISTS `EstadoMensajesCapacitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EstadoMensajesCapacitacion` (
  `idEstadoMensajesCapacitacion` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleado` int(11) NOT NULL,
  `idCapacitacion` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  PRIMARY KEY (`idEstadoMensajesCapacitacion`)
) ENGINE=InnoDB AUTO_INCREMENT=374 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EvaluacionDetalle`
--

DROP TABLE IF EXISTS `EvaluacionDetalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EvaluacionDetalle` (
  `idEvaluacionDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluaciones` int(11) NOT NULL,
  `NoEmpleadoEvalua` int(11) NOT NULL,
  `NoEmpleadoEvaluado` int(11) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `StatusEvaluado` int(11) NOT NULL DEFAULT '0',
  `JefeEvalua` int(11) NOT NULL DEFAULT '0',
  `ParEvalua` int(11) NOT NULL DEFAULT '0',
  `AutoEvalua` int(11) NOT NULL DEFAULT '0',
  `SubordinadoEvalua` int(11) NOT NULL DEFAULT '0',
  `NivelEvaluado` int(11) NOT NULL,
  `PuestoEvaluado` int(11) NOT NULL,
  PRIMARY KEY (`idEvaluacionDetalle`),
  KEY `idx_idEvaluaciones_opt` (`idEvaluaciones`)
) ENGINE=MyISAM AUTO_INCREMENT=284407 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Evaluaciones`
--

DROP TABLE IF EXISTS `Evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Evaluaciones` (
  `idEvaluaciones` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `TipoEvaluacion` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = Evaluación 360, 2 = Encuesta Normal',
  `Periodicidad` tinyint(1) DEFAULT NULL COMMENT '1 = Diario, 2 = Semanal, 3 = Mensual, 4 = Único',
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `RetroFechaIni` date DEFAULT NULL,
  `RetroFechaFin` date DEFAULT NULL,
  `PlanAFechaIni` date DEFAULT NULL,
  `PlanAFechaFin` date DEFAULT NULL,
  `DirigidoA` tinyint(4) NOT NULL DEFAULT '1',
  `EmpleadosParticipantes` text COLLATE utf8_unicode_ci COMMENT 'Lista de NoEmpleado de participantes separados por coma',
  `Activado` int(11) NOT NULL DEFAULT '0',
  `FechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PreguntasAceptadas` int(11) NOT NULL DEFAULT '0',
  `TipoSeleccionaSucursal` int(11) DEFAULT NULL,
  `TipoOpcionConfiguracion` int(11) DEFAULT NULL,
  `Falla` varchar(45) COLLATE utf8_unicode_ci DEFAULT '1',
  PRIMARY KEY (`idEvaluaciones`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Eventos`
--

DROP TABLE IF EXISTS `Eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Eventos` (
  `idEventos` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` text COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Registro` datetime NOT NULL,
  PRIMARY KEY (`idEventos`),
  KEY `idx_eventos_status_fecha` (`Status`,`FechaInicio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Feed`
--

DROP TABLE IF EXISTS `Feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Feed` (
  `idFeed` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `Registro` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Tipo` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `Hipervinculo` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Revisado` int(11) NOT NULL DEFAULT '0',
  `AutorizadoIndex` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idFeed`),
  KEY `idx_feed_tipo_registro` (`Tipo`,`Registro`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Incidencias`
--

DROP TABLE IF EXISTS `Incidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Incidencias` (
  `IdIncidencia` int(11) NOT NULL AUTO_INCREMENT,
  `IdChecklist` int(11) NOT NULL,
  `IdTipoIncidencia` int(11) DEFAULT NULL,
  `NoEmpleado` varchar(20) NOT NULL,
  `Descripcion` text NOT NULL,
  `Evidencia` longtext,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `Estado` enum('Abierta','En proceso','Resuelta') DEFAULT 'Abierta',
  `FechaResuelto` datetime DEFAULT NULL,
  `NoEmpleadoResolutor` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`IdIncidencia`),
  KEY `fk_inc_checklist` (`IdChecklist`),
  KEY `fk_inc_tipo` (`IdTipoIncidencia`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Incidencias_Seguimiento`
--

DROP TABLE IF EXISTS `Incidencias_Seguimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Incidencias_Seguimiento` (
  `IdSeguimiento` int(11) NOT NULL AUTO_INCREMENT,
  `IdIncidencia` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Mensaje` text NOT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdSeguimiento`),
  KEY `IdIncidencia` (`IdIncidencia`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InduccionesAudiovisual`
--

DROP TABLE IF EXISTS `InduccionesAudiovisual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InduccionesAudiovisual` (
  `IdAudiovisual` int(11) NOT NULL AUTO_INCREMENT,
  `IdInduccion` int(11) NOT NULL,
  `TituloVideo` varchar(255) DEFAULT NULL,
  `EnlaceExterno` varchar(500) NOT NULL,
  `Plataforma` varchar(50) DEFAULT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdAudiovisual`),
  KEY `IdInduccion` (`IdInduccion`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InduccionesMaterial`
--

DROP TABLE IF EXISTS `InduccionesMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InduccionesMaterial` (
  `IdMaterial` int(11) NOT NULL AUTO_INCREMENT,
  `IdInduccion` int(11) NOT NULL,
  `NombreArchivo` varchar(255) NOT NULL,
  `RutaArchivo` varchar(500) NOT NULL,
  `TipoArchivo` varchar(100) DEFAULT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdMaterial`),
  KEY `IdInduccion` (`IdInduccion`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InduccionesPuestos`
--

DROP TABLE IF EXISTS `InduccionesPuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InduccionesPuestos` (
  `IdInduccionPuesto` int(11) NOT NULL AUTO_INCREMENT,
  `IdInduccion` int(11) NOT NULL,
  `IdPuesto` int(11) NOT NULL,
  `FechaAsignacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdInduccionPuesto`),
  UNIQUE KEY `unique_induccion_puesto` (`IdInduccion`,`IdPuesto`),
  KEY `IdPuesto` (`IdPuesto`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InduccionesVacantes`
--

DROP TABLE IF EXISTS `InduccionesVacantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InduccionesVacantes` (
  `IdInduccion` int(11) NOT NULL AUTO_INCREMENT,
  `NombreInduccion` varchar(150) NOT NULL,
  `Descripcion` text,
  `IdAreaTecnica` int(11) DEFAULT NULL,
  `DuracionEstimada` varchar(50) DEFAULT NULL,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdInduccion`),
  KEY `IdAreaTecnica` (`IdAreaTecnica`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Kpis`
--

DROP TABLE IF EXISTS `Kpis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Kpis` (
  `IdKpi` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  `ValorAlta` decimal(10,2) NOT NULL,
  `ValorMedia` decimal(10,2) NOT NULL,
  `ValorBaja` decimal(10,2) NOT NULL,
  `ValorActual` decimal(10,2) DEFAULT '0.00',
  `Prioridad` int(11) NOT NULL DEFAULT '1',
  `Puestos` varchar(500) DEFAULT 'TODOS',
  `Activo` tinyint(1) DEFAULT '1',
  `FechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `FechaModificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdKpi`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LineaEticaMensajes`
--

DROP TABLE IF EXISTS `LineaEticaMensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LineaEticaMensajes` (
  `idLineaEticaMensajes` int(11) NOT NULL AUTO_INCREMENT,
  `idCatalogoLineaEtica` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  `Mensaje` text COLLATE utf8_unicode_ci NOT NULL,
  `Revisado` int(11) NOT NULL DEFAULT '0',
  `MensajeRevisado` int(11) NOT NULL DEFAULT '1',
  `id_division` int(11) DEFAULT NULL,
  `IdSucursal` int(11) DEFAULT NULL,
  PRIMARY KEY (`idLineaEticaMensajes`),
  KEY `fk_rel_id_division` (`id_division`),
  CONSTRAINT `fk_rel_id_division` FOREIGN KEY (`id_division`) REFERENCES `Divisiones` (`IdDivision`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MenusPermisos`
--

DROP TABLE IF EXISTS `MenusPermisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MenusPermisos` (
  `idMenusPermisos` int(11) NOT NULL AUTO_INCREMENT,
  `id_menu` int(11) NOT NULL,
  `IdPuesto` int(11) NOT NULL,
  PRIMARY KEY (`idMenusPermisos`)
) ENGINE=InnoDB AUTO_INCREMENT=1602 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Meses`
--

DROP TABLE IF EXISTS `Meses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Meses` (
  `idMeses` varchar(2) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Mes` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Dias` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idMeses`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ObjetivosPlanAccion`
--

DROP TABLE IF EXISTS `ObjetivosPlanAccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ObjetivosPlanAccion` (
  `idObjetivosPlanAccion` int(11) NOT NULL AUTO_INCREMENT,
  `idPlanesAccionEvaluacion` int(11) NOT NULL,
  `CalificacionFinal` decimal(10,2) NOT NULL,
  `idCompetencias` int(11) NOT NULL,
  `Objetivo` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `DescObjetivo` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`idObjetivosPlanAccion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Organigramas`
--

DROP TABLE IF EXISTS `Organigramas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organigramas` (
  `idOrganigramas` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Registro` datetime NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idOrganigramas`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlanAccionIncidencias`
--

DROP TABLE IF EXISTS `PlanAccionIncidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlanAccionIncidencias` (
  `IdPlanAccionInc` int(11) NOT NULL AUTO_INCREMENT,
  `IdIncidencia` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Descripcion` text,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Progreso` int(11) DEFAULT '0',
  `UsuarioAlta` varchar(50) NOT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPlanAccionInc`),
  KEY `IdIncidencia` (`IdIncidencia`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlanesAccionEvaluacion`
--

DROP TABLE IF EXISTS `PlanesAccionEvaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlanesAccionEvaluacion` (
  `idPlanesAccionEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluaciones` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsuarioAlta` int(11) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Requerido` int(11) NOT NULL DEFAULT '0',
  `StatusConfirmaActividades` int(11) NOT NULL DEFAULT '0',
  `FechaConfirmaActividades` datetime DEFAULT NULL,
  `StatusConfirmaPlanAccion` int(11) NOT NULL DEFAULT '0',
  `FechaConfirmaPlanAccion` datetime DEFAULT NULL,
  PRIMARY KEY (`idPlanesAccionEvaluacion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Postulantes`
--

DROP TABLE IF EXISTS `Postulantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Postulantes` (
  `IdPostulante` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `ApellidoPaterno` varchar(100) NOT NULL,
  `ApellidoMaterno` varchar(100) DEFAULT NULL,
  `CURP` varchar(18) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `CorreoElectronico` varchar(150) NOT NULL,
  `Direccion` varchar(300) DEFAULT NULL,
  `Estado` varchar(100) DEFAULT NULL,
  `Ciudad` varchar(100) DEFAULT NULL,
  `IdEmpleado` int(11) DEFAULT NULL,
  `FechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulante`),
  UNIQUE KEY `uk_postulante_correo` (`CorreoElectronico`),
  UNIQUE KEY `uk_postulante_curp` (`CURP`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesArchivos`
--

DROP TABLE IF EXISTS `PostulantesArchivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesArchivos` (
  `IdArchivo` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `TipoArchivo` enum('CV','SolicitudEmpleo') NOT NULL,
  `NombreArchivo` varchar(255) NOT NULL,
  `ContentType` varchar(100) NOT NULL,
  `Contenido` longblob NOT NULL,
  `TamanoBytes` bigint(20) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdArchivo`),
  UNIQUE KEY `uk_postulante_tipo` (`IdPostulanteVacante`,`TipoArchivo`),
  CONSTRAINT `fk_postulante_vacante` FOREIGN KEY (`IdPostulanteVacante`) REFERENCES `PostulantesVacantes` (`IdPostulanteVacante`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesEvaluaciones`
--

DROP TABLE IF EXISTS `PostulantesEvaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesEvaluaciones` (
  `IdPostulanteEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `IdVacanteEvaluacion` int(11) NOT NULL,
  `FechaInicio` timestamp NULL DEFAULT NULL,
  `FechaFinalizacion` timestamp NULL DEFAULT NULL,
  `Calificacion` decimal(5,2) DEFAULT NULL,
  `EstatusEvaluacion` tinyint(1) DEFAULT '1' COMMENT '1=Pendiente, 2=En progreso, 3=Completada',
  PRIMARY KEY (`IdPostulanteEvaluacion`),
  UNIQUE KEY `uk_postulante_evaluacion` (`IdPostulanteVacante`,`IdVacanteEvaluacion`),
  KEY `fk_posteval_vaceval` (`IdVacanteEvaluacion`),
  KEY `idx_posteval_estatus` (`EstatusEvaluacion`),
  KEY `idx_posteval_fechainicio` (`FechaInicio`),
  KEY `idx_posteval_postulante_fecha` (`IdPostulanteVacante`,`FechaInicio`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesHistorial`
--

DROP TABLE IF EXISTS `PostulantesHistorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesHistorial` (
  `IdPostulanteHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Observaciones` text,
  `Resultado` tinyint(1) DEFAULT NULL COMMENT '1=Aprobado, 0=Reprobado, NULL=Pendiente',
  `UsuarioRegistro` int(11) DEFAULT NULL COMMENT 'ID del usuario que registró el avance',
  PRIMARY KEY (`IdPostulanteHistorial`),
  KEY `fk_posthist_proceso` (`IdProceso`),
  KEY `idx_posthist_fecha` (`Fecha`),
  KEY `idx_posthist_resultado` (`Resultado`),
  KEY `idx_posthist_postulante_proceso` (`IdPostulanteVacante`,`IdProceso`,`Fecha`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesRequisitos`
--

DROP TABLE IF EXISTS `PostulantesRequisitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesRequisitos` (
  `IdPostulanteRequisito` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteVacante` int(11) NOT NULL,
  `IdVacanteRequisito` int(11) NOT NULL,
  `Respuesta` text COMMENT 'Respuesta del postulante al requisito',
  `Cumple` tinyint(1) DEFAULT NULL COMMENT '1=Cumple, 0=No cumple, NULL=Sin evaluar',
  `FechaRespuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulanteRequisito`),
  UNIQUE KEY `uk_postulante_requisito` (`IdPostulanteVacante`,`IdVacanteRequisito`),
  KEY `fk_postreq_vacreq` (`IdVacanteRequisito`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesRespuestas`
--

DROP TABLE IF EXISTS `PostulantesRespuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesRespuestas` (
  `IdPostulanteRespuesta` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulanteEvaluacion` int(11) NOT NULL,
  `IdPreguntasEvaluacion` int(11) NOT NULL,
  `Respuesta` text,
  `FechaRespuesta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPostulanteRespuesta`),
  UNIQUE KEY `uk_postulante_pregunta` (`IdPostulanteEvaluacion`,`IdPreguntasEvaluacion`)
) ENGINE=MyISAM AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesTelefonos`
--

DROP TABLE IF EXISTS `PostulantesTelefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesTelefonos` (
  `IdTelefonoHistorico` int(11) NOT NULL AUTO_INCREMENT,
  `IdPostulante` int(11) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  `EsPrincipal` tinyint(1) NOT NULL DEFAULT '0',
  `UsuarioModifico` int(11) DEFAULT NULL,
  `Observaciones` text,
  PRIMARY KEY (`IdTelefonoHistorico`),
  UNIQUE KEY `uk_postulante_telefono` (`IdPostulante`,`Telefono`),
  KEY `idx_postulante` (`IdPostulante`),
  KEY `idx_telefono` (`Telefono`),
  KEY `idx_activo` (`Activo`),
  KEY `idx_principal` (`EsPrincipal`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='Histórico de números telefónicos de postulantes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostulantesVacantes`
--

DROP TABLE IF EXISTS `PostulantesVacantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostulantesVacantes` (
  `IdPostulanteVacante` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdPostulante` int(11) NOT NULL,
  `FechaPostulacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EstatusPostulacion` tinyint(1) DEFAULT '1' COMMENT '1=En proceso, 2=Aceptado, 3=Rechazado, 4=Finalizado',
  `RutaCV` varchar(500) DEFAULT NULL COMMENT 'Ruta del archivo CV subido',
  `RutaSolicitudEmpleo` varchar(500) DEFAULT NULL COMMENT 'Ruta de la solicitud de empleo',
  `Observaciones` text,
  `UsuarioCambioEstatus` int(11) DEFAULT NULL COMMENT 'ID del empleado que cambió el estatus',
  `FechaCambioEstatus` timestamp NULL DEFAULT NULL COMMENT 'Fecha del último cambio de estatus',
  PRIMARY KEY (`IdPostulanteVacante`),
  UNIQUE KEY `uk_postulante_vacante` (`IdVacante`,`IdPostulante`),
  KEY `fk_postvac_postulante` (`IdPostulante`),
  KEY `idx_postvac_estatus` (`EstatusPostulacion`),
  KEY `idx_postvac_fechapost` (`FechaPostulacion`),
  KEY `idx_postvac_vacante_estatus` (`IdVacante`,`EstatusPostulacion`),
  KEY `idx_postulante_vacante_id` (`IdPostulanteVacante`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PreguntasConfiguracion`
--

DROP TABLE IF EXISTS `PreguntasConfiguracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PreguntasConfiguracion` (
  `idPreguntasConfiguracion` int(11) NOT NULL AUTO_INCREMENT,
  `idPreguntasEvaluacion` int(11) NOT NULL,
  `RangoInicial` int(11) DEFAULT NULL,
  `RangoFinal` int(11) DEFAULT NULL,
  `BoolCorreta` int(11) DEFAULT NULL,
  `RespuestaEsperadoOM` int(11) DEFAULT NULL,
  `ValorEsperadoOM` int(11) DEFAULT NULL,
  `NivelEmpleadoEsperadoOM` int(11) DEFAULT NULL,
  `RespuestaCorrectaOM` int(11) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPreguntasConfiguracion`)
) ENGINE=MyISAM AUTO_INCREMENT=319 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PreguntasEvaluacion`
--

DROP TABLE IF EXISTS `PreguntasEvaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PreguntasEvaluacion` (
  `idPreguntasEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluaciones` int(11) NOT NULL,
  `idTipoPregunta` int(11) NOT NULL,
  `idCompetencias` int(11) NOT NULL,
  `Titulo` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Descripcion` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPreguntasEvaluacion`)
) ENGINE=MyISAM AUTO_INCREMENT=151 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PreguntasPosiblesRespuestas`
--

DROP TABLE IF EXISTS `PreguntasPosiblesRespuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PreguntasPosiblesRespuestas` (
  `idPreguntasPosiblesRespuestas` int(11) NOT NULL AUTO_INCREMENT,
  `idPreguntasEvaluacion` int(11) NOT NULL,
  `DescripcionRespuesta` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPreguntasPosiblesRespuestas`)
) ENGINE=MyISAM AUTO_INCREMENT=357 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ProcesosVacantes`
--

DROP TABLE IF EXISTS `ProcesosVacantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProcesosVacantes` (
  `IdProceso` int(11) NOT NULL AUTO_INCREMENT,
  `NombreProceso` varchar(100) NOT NULL,
  `Descripcion` text,
  `Estatus` tinyint(1) DEFAULT '1',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdProceso`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PuestoTurno`
--

DROP TABLE IF EXISTS `PuestoTurno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PuestoTurno` (
  `IdPuesto` int(11) NOT NULL,
  `IdTurno` int(11) NOT NULL,
  PRIMARY KEY (`IdPuesto`,`IdTurno`),
  KEY `IdTurno` (`IdTurno`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Puestos`
--

DROP TABLE IF EXISTS `Puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Puestos` (
  `IdPuesto` int(11) NOT NULL,
  `Puesto` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `IdDivision` int(11) NOT NULL,
  `EsJefe` int(11) NOT NULL DEFAULT '0',
  `IdJefesPuesto` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`IdPuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ReaccionComentario`
--

DROP TABLE IF EXISTS `ReaccionComentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReaccionComentario` (
  `idReaccionComentario` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleado` int(11) NOT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  `TipoReaccion` int(11) DEFAULT NULL,
  `idComentariosFeed` int(11) NOT NULL,
  PRIMARY KEY (`idReaccionComentario`),
  KEY `idx_reaccion_comentario_feed` (`idComentariosFeed`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ReaccionFeed`
--

DROP TABLE IF EXISTS `ReaccionFeed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReaccionFeed` (
  `idReaccionFeed` int(11) NOT NULL AUTO_INCREMENT,
  `idFeed` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  `idTipoReaccion` int(11) NOT NULL,
  PRIMARY KEY (`idReaccionFeed`),
  KEY `idx_reaccion_feed_emp` (`idFeed`,`NoEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RefreshTokens`
--

DROP TABLE IF EXISTS `RefreshTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RefreshTokens` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Token` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EmployeeNumber` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpiresAt` datetime NOT NULL,
  `IsRevoked` tinyint(1) NOT NULL DEFAULT '0',
  `RevokedAt` datetime DEFAULT NULL,
  `RevokedReason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReplacedByToken` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedByIp` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserAgent` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TokenFamily` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `idx_token` (`Token`(255)),
  KEY `idx_employee` (`EmployeeNumber`),
  KEY `idx_employee_revoked` (`EmployeeNumber`,`IsRevoked`),
  KEY `idx_token_family` (`TokenFamily`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RelacionEmpleados`
--

DROP TABLE IF EXISTS `RelacionEmpleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RelacionEmpleados` (
  `idRelacionEmpleados` int(11) NOT NULL AUTO_INCREMENT,
  `EmpleadoPadre` int(11) NOT NULL,
  `EmpleadoHijo` int(11) NOT NULL,
  `Registro` datetime DEFAULT NULL,
  PRIMARY KEY (`idRelacionEmpleados`)
) ENGINE=InnoDB AUTO_INCREMENT=946 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RespuestaEvaluaciones`
--

DROP TABLE IF EXISTS `RespuestaEvaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RespuestaEvaluaciones` (
  `idRespuestaEvaluaciones` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluacionDetalle` int(11) NOT NULL,
  `idCompetencias` int(11) NOT NULL,
  `Registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Comentarios` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `Calificacion` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `idPreguntasEvaluacion` int(11) NOT NULL,
  PRIMARY KEY (`idRespuestaEvaluaciones`),
  KEY `idx_idEvaluable_opt` (`idEvaluacionDetalle`)
) ENGINE=MyISAM AUTO_INCREMENT=681399 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RetroalimentacionEvaluacion`
--

DROP TABLE IF EXISTS `RetroalimentacionEvaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RetroalimentacionEvaluacion` (
  `idRetroalimentacionEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `idEvaluaciones` int(11) NOT NULL,
  `NoEmpleado` int(11) NOT NULL,
  `FechaAceptado` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRetroalimentacionEvaluacion`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SolicitudesRecoveryPass`
--

DROP TABLE IF EXISTS `SolicitudesRecoveryPass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SolicitudesRecoveryPass` (
  `idSolicitudesRecoveryPass` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleado` int(11) NOT NULL,
  `Registro` datetime NOT NULL,
  `Visto` int(11) NOT NULL DEFAULT '0',
  `Email` varchar(30) NOT NULL,
  PRIMARY KEY (`idSolicitudesRecoveryPass`)
) ENGINE=MyISAM AUTO_INCREMENT=914 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SolicitudesVacaciones`
--

DROP TABLE IF EXISTS `SolicitudesVacaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SolicitudesVacaciones` (
  `idSolicitudesVacaciones` int(11) NOT NULL AUTO_INCREMENT,
  `NoEmpleado` int(11) NOT NULL,
  `EmpleadoPadre` int(11) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '0',
  `Registro` datetime NOT NULL,
  `FechaInicio` date NOT NULL,
  `Comentarios` text COLLATE utf8_unicode_ci,
  `FechaFin` date NOT NULL,
  `ComentariosSolicitud` text COLLATE utf8_unicode_ci,
  `TotalDias` int(11) DEFAULT NULL,
  `UsuarioFinalAutoriza` int(11) DEFAULT NULL,
  `FechaAutorizadoFinal` datetime DEFAULT NULL,
  `JefeInmediatoAutoriza` int(11) DEFAULT NULL,
  `FechaJefeInmediatoAutoriza` datetime DEFAULT NULL,
  `VistoMsjJefe` varchar(45) COLLATE utf8_unicode_ci DEFAULT '0',
  `VistoMsjFinal` varchar(45) COLLATE utf8_unicode_ci DEFAULT '0',
  `DiaRegreso` date NOT NULL,
  PRIMARY KEY (`idSolicitudesVacaciones`)
) ENGINE=InnoDB AUTO_INCREMENT=4478 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SucursalDepto`
--

DROP TABLE IF EXISTS `SucursalDepto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SucursalDepto` (
  `IdSucursal` int(11) NOT NULL,
  `Sucursal` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `IdDivision` int(11) NOT NULL,
  PRIMARY KEY (`IdSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TipoCompetencias`
--

DROP TABLE IF EXISTS `TipoCompetencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoCompetencias` (
  `idTipoCompetencias` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Estatus` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idTipoCompetencias`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TipoDocumentacion`
--

DROP TABLE IF EXISTS `TipoDocumentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoDocumentacion` (
  `IdTipoDocumento` int(11) NOT NULL AUTO_INCREMENT,
  `NombreDocumento` varchar(150) NOT NULL,
  `Obligatorio` tinyint(1) DEFAULT '0',
  `Estatus` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`IdTipoDocumento`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TipoEvento`
--

DROP TABLE IF EXISTS `TipoEvento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoEvento` (
  `idTipoEvento` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idTipoEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TipoPregunta`
--

DROP TABLE IF EXISTS `TipoPregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoPregunta` (
  `idTipoPregunta` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  `Bool` int(11) NOT NULL DEFAULT '0',
  `Multiple1R` int(11) NOT NULL DEFAULT '0',
  `MultipleEsperado` int(11) NOT NULL DEFAULT '0',
  `EvaluaEmpleados` int(11) NOT NULL DEFAULT '0',
  `Rango` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idTipoPregunta`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TipoReaccion`
--

DROP TABLE IF EXISTS `TipoReaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoReaccion` (
  `idTipoReaccion` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idTipoReaccion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tipos_Incidencias`
--

DROP TABLE IF EXISTS `Tipos_Incidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tipos_Incidencias` (
  `IdTipoIncidencia` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(150) NOT NULL,
  `NivelSeveridad` enum('Baja','Media','Alta','Crítica') NOT NULL DEFAULT 'Media',
  `IdPuesto` int(11) DEFAULT NULL,
  `SLA_Horas` int(11) NOT NULL DEFAULT '24',
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdTipoIncidencia`),
  KEY `fk_ti_puesto` (`IdPuesto`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Turnos`
--

DROP TABLE IF EXISTS `Turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Turnos` (
  `IdTurno` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL,
  `IdPuesto` int(11) NOT NULL,
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`IdTurno`),
  KEY `IdPuesto` (`IdPuesto`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Vacantes`
--

DROP TABLE IF EXISTS `Vacantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vacantes` (
  `IdVacante` int(11) NOT NULL AUTO_INCREMENT,
  `NombreVacante` varchar(150) NOT NULL,
  `IdAreaTecnica` int(11) DEFAULT NULL,
  `IdPuesto` int(11) DEFAULT NULL,
  `TipoContratacion` varchar(50) NOT NULL COMMENT 'Tiempo completo, Medio tiempo, Temporal, Por proyecto',
  `IdSucursal` int(11) DEFAULT NULL,
  `DescripcionPuesto` text,
  `SalarioMinimo` decimal(12,2) DEFAULT NULL,
  `SalarioMaximo` decimal(12,2) DEFAULT NULL,
  `FechaApertura` date NOT NULL,
  `FechaCierre` date DEFAULT NULL,
  `Estatus` tinyint(1) DEFAULT '1' COMMENT '1=Borrador, 2=Activa, 3=Cerrada',
  `Publicada` tinyint(1) DEFAULT '0' COMMENT '0=No publicada, 1=Publicada (no editable)',
  `BanderaCV` tinyint(1) DEFAULT '0' COMMENT '1=Requiere Curriculum Vitae',
  `BanderaSE` tinyint(1) DEFAULT '0' COMMENT '1=Requiere Solicitud de Empleo',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaActualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdVacante`),
  KEY `fk_vacantes_areatecnica` (`IdAreaTecnica`),
  KEY `fk_vacantes_puesto` (`IdPuesto`),
  KEY `fk_vacantes_sucursal` (`IdSucursal`),
  KEY `idx_vacantes_estatus` (`Estatus`),
  KEY `idx_vacantes_publicada` (`Publicada`),
  KEY `idx_vacantes_fechaapertura` (`FechaApertura`),
  KEY `idx_vacantes_fechacierre` (`FechaCierre`),
  KEY `idx_vacantes_activas_area` (`Estatus`,`Publicada`,`IdAreaTecnica`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `VacantesEvaluaciones`
--

DROP TABLE IF EXISTS `VacantesEvaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VacantesEvaluaciones` (
  `IdVacanteEvaluacion` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdEvaluacion` int(11) NOT NULL,
  `IdProceso` int(11) NOT NULL COMMENT 'Proceso en el que se aplica la evaluación',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdVacanteEvaluacion`),
  UNIQUE KEY `uk_vacante_evaluacion_proceso` (`IdVacante`,`IdEvaluacion`,`IdProceso`),
  KEY `fk_vacanteseval_evaluacion` (`IdEvaluacion`),
  KEY `fk_vacanteseval_proceso` (`IdProceso`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `VacantesInducciones`
--

DROP TABLE IF EXISTS `VacantesInducciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VacantesInducciones` (
  `IdVacanteInduccion` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `IdInduccion` int(11) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdVacanteInduccion`),
  UNIQUE KEY `uk_vacante_induccion` (`IdVacante`,`IdInduccion`),
  KEY `fk_vacantesind_induccion` (`IdInduccion`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `VacantesRequisitos`
--

DROP TABLE IF EXISTS `VacantesRequisitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VacantesRequisitos` (
  `IdVacanteRequisito` int(11) NOT NULL AUTO_INCREMENT,
  `IdVacante` int(11) NOT NULL,
  `Requisito` varchar(500) NOT NULL COMMENT 'Perfil académico, experiencia, habilidades, etc.',
  `Orden` int(11) DEFAULT '0',
  `FechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdVacanteRequisito`),
  KEY `idx_vacreq_orden` (`IdVacante`,`Orden`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id_menu` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Id_Padre` int(11) DEFAULT NULL,
  `Habilitado` int(11) DEFAULT '1',
  `URL` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Argumentos` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 12:15:37
