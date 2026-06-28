-- =====================================================
-- Script de Migración: Estado de sincronización en segundo plano
-- Fecha: 2026-06-27
-- Propósito: Permitir que la sincronización siga corriendo aunque se cierre el
--            navegador, y reconectar/observar el progreso al reabrir.
-- Plan: docs/PLAN_SINCRONIZADOR_RH.md
-- =====================================================

CREATE TABLE IF NOT EXISTS `SyncEstado` (
  `servidor`   VARCHAR(10) PRIMARY KEY COMMENT 'iD_SERVIDOR',
  `estado`     VARCHAR(15) NOT NULL DEFAULT 'corriendo' COMMENT 'corriendo|ok|error|cancelado',
  `pct`        INT NOT NULL DEFAULT 0,
  `msg`        VARCHAR(200) DEFAULT NULL,
  `resumen`    TEXT DEFAULT NULL COMMENT 'JSON con conteos al terminar',
  `cancelar`   TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'flag cooperativo de cancelación',
  `started_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
