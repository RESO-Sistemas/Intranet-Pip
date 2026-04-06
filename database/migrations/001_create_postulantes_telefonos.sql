-- =====================================================
-- Script de Migración: Sistema de Teléfonos Históricos
-- Fecha: 2026-04-06
-- Propósito: Permitir autenticación con CURP + Teléfono
--            y mantener histórico de teléfonos por postulante
-- =====================================================

-- 1. CREAR TABLA DE HISTÓRICO DE TELÉFONOS
CREATE TABLE IF NOT EXISTS `PostulantesTelefonos` (
    `IdTelefonoHistorico` INT AUTO_INCREMENT PRIMARY KEY,
    `IdPostulante` INT NOT NULL,
    `Telefono` VARCHAR(10) NOT NULL COMMENT 'Teléfono normalizado a 10 dígitos',
    `FechaRegistro` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Activo` TINYINT(1) DEFAULT 1 COMMENT '1=Activo, 0=Desactivado',
    `UsuarioModifico` INT NULL COMMENT 'NoEmpleado de quien hizo el cambio',
    `Observaciones` VARCHAR(255) NULL,
    FOREIGN KEY (`IdPostulante`) REFERENCES `Postulantes`(`IdPostulante`) ON DELETE CASCADE,
    UNIQUE KEY `unique_telefono_postulante` (`IdPostulante`, `Telefono`),
    INDEX `idx_telefono` (`Telefono`),
    INDEX `idx_activo` (`Activo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Histórico de teléfonos por postulante para login flexible';

-- 2. MIGRAR TELÉFONOS EXISTENTES AL HISTÓRICO
INSERT IGNORE INTO `PostulantesTelefonos` (`IdPostulante`, `Telefono`, `Activo`, `Observaciones`)
SELECT 
    `IdPostulante`,
    REGEXP_REPLACE(`Telefono`, '[^0-9]', '') AS TelefonoNormalizado,
    1,
    'Migrado automáticamente'
FROM `Postulantes`
WHERE `Telefono` IS NOT NULL 
  AND `Telefono` != ''
  AND LENGTH(REGEXP_REPLACE(`Telefono`, '[^0-9]', '')) = 10;

-- 3. NORMALIZAR TELÉFONOS EN TABLA PRINCIPAL
UPDATE `Postulantes`
SET `Telefono` = REGEXP_REPLACE(`Telefono`, '[^0-9]', '')
WHERE `Telefono` IS NOT NULL
  AND `Telefono` != ''
  AND `Telefono` REGEXP '[^0-9]';

-- 4. CREAR TRIGGER PARA SINCRONIZAR CAMBIOS
DELIMITER $$

DROP TRIGGER IF EXISTS `after_postulante_telefono_update`$$

CREATE TRIGGER `after_postulante_telefono_update`
AFTER UPDATE ON `Postulantes`
FOR EACH ROW
BEGIN
    -- Si el teléfono cambió y es válido (10 dígitos)
    IF NEW.Telefono != OLD.Telefono AND LENGTH(NEW.Telefono) = 10 THEN
        -- Insertar al histórico si no existe
        INSERT IGNORE INTO `PostulantesTelefonos` 
        (`IdPostulante`, `Telefono`, `Activo`, `Observaciones`) 
        VALUES (NEW.IdPostulante, NEW.Telefono, 1, 'Actualización automática');
    END IF;
END$$

DROP TRIGGER IF EXISTS `after_postulante_insert`$$

CREATE TRIGGER `after_postulante_insert`
AFTER INSERT ON `Postulantes`
FOR EACH ROW
BEGIN
    -- Al crear un postulante nuevo, agregar su teléfono al histórico
    IF NEW.Telefono IS NOT NULL AND LENGTH(NEW.Telefono) = 10 THEN
        INSERT IGNORE INTO `PostulantesTelefonos` 
        (`IdPostulante`, `Telefono`, `Activo`, `Observaciones`) 
        VALUES (NEW.IdPostulante, NEW.Telefono, 1, 'Registro inicial');
    END IF;
END$$

DELIMITER ;

-- 5. VERIFICACIÓN POST-MIGRACIÓN
SELECT 'Verificación de Migración' AS Resultado;

SELECT 
    (SELECT COUNT(*) FROM Postulantes WHERE Telefono IS NOT NULL AND Telefono != '') AS TotalPostulantesConTelefono,
    (SELECT COUNT(*) FROM PostulantesTelefonos) AS TotalTelefonosHistoricos,
    (SELECT COUNT(DISTINCT IdPostulante) FROM PostulantesTelefonos) AS PostulantesConHistorico;

-- =====================================================
-- FIN DEL SCRIPT DE MIGRACIÓN
-- =====================================================
