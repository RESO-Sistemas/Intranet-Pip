-- Migración: almacenar archivos de capacitación en base de datos
-- Fecha: 2026-06-17

CREATE TABLE IF NOT EXISTS `CapacitacionArchivos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idCapacitacion` INT(11) NOT NULL,
  `nombreOriginal` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombreSistema` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mimeType` VARCHAR(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extension` VARCHAR(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pesoBytes` BIGINT(20) DEFAULT NULL,
  `contenido` LONGBLOB NOT NULL,
  `fechaRegistro` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_capacitacion_archivos_capacitacion` (`idCapacitacion`),
  CONSTRAINT `fk_capacitacion_archivos_capacitacion`
    FOREIGN KEY (`idCapacitacion`) REFERENCES `Capacitacion` (`idCapacitacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
