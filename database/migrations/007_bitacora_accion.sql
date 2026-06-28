-- =====================================================
-- Script de Migración: tipo de corrida en la bitácora
-- Fecha: 2026-06-27
-- Propósito: Distinguir corridas de 'sync' (aplicadas) vs 'preview' (proyectadas)
--            ahora que la vista previa también se registra en la bitácora.
-- Plan: docs/PLAN_SINCRONIZADOR_RH.md
-- =====================================================

ALTER TABLE `SyncBitacora`
  ADD COLUMN `accion` VARCHAR(10) NOT NULL DEFAULT 'sync' COMMENT 'sync|preview' AFTER `servidor_nombre`;
