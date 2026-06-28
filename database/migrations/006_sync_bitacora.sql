-- =====================================================
-- Script de Migración: Bitácora de sincronización
-- Fecha: 2026-06-27
-- Propósito: Historial detallado de cada corrida de sincronización
--            (cabecera + detalle por registro insertado/actualizado/omitido).
-- Plan: docs/PLAN_SINCRONIZADOR_RH.md
-- =====================================================

-- Cabecera: una fila por corrida. Durable (se escribe con conexión autocommit),
-- persiste aunque la transacción de datos haga rollback.
CREATE TABLE IF NOT EXISTS `SyncBitacora` (
  `idBitacora`      INT AUTO_INCREMENT PRIMARY KEY,
  `servidor`        VARCHAR(10) NOT NULL,
  `servidor_nombre` VARCHAR(60) DEFAULT NULL,
  `usuario_id`      VARCHAR(20) DEFAULT NULL,
  `usuario`         VARCHAR(120) DEFAULT NULL,
  `estado`          VARCHAR(15) NOT NULL DEFAULT 'corriendo' COMMENT 'corriendo|ok|error|cancelado',
  `inicio`          DATETIME NOT NULL,
  `fin`             DATETIME DEFAULT NULL,
  `duracion_seg`    INT DEFAULT NULL,
  `suc_ins` INT DEFAULT 0, `suc_upd` INT DEFAULT 0,
  `area_ins` INT DEFAULT 0, `area_upd` INT DEFAULT 0,
  `pue_ins` INT DEFAULT 0, `pue_upd` INT DEFAULT 0,
  `emp_ins` INT DEFAULT 0, `emp_upd` INT DEFAULT 0,
  `jer_ins` INT DEFAULT 0, `jer_upd` INT DEFAULT 0,
  `omitidos` INT DEFAULT 0,
  `mensaje`         VARCHAR(255) DEFAULT NULL,
  INDEX `idx_servidor` (`servidor`),
  INDEX `idx_inicio` (`inicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Detalle: una fila por registro afectado. Transaccional (rollback con los datos),
-- de modo que solo refleja cambios realmente confirmados.
CREATE TABLE IF NOT EXISTS `SyncBitacoraDetalle` (
  `idDetalle`   INT AUTO_INCREMENT PRIMARY KEY,
  `idBitacora`  INT NOT NULL,
  `entidad`     VARCHAR(15) NOT NULL COMMENT 'SUCURSAL|AREA|PUESTO|EMPLEADO|JERARQUIA',
  `accion`      VARCHAR(10) NOT NULL COMMENT 'insert|update|omit',
  `id_origen`   INT DEFAULT NULL,
  `id_local`    INT DEFAULT NULL,
  `descripcion` VARCHAR(200) DEFAULT NULL,
  INDEX `idx_bitacora` (`idBitacora`),
  INDEX `idx_bitacora_entidad` (`idBitacora`, `entidad`),
  INDEX `idx_bitacora_accion` (`idBitacora`, `accion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
