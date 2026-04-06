-- Permitir NULL en columnas de retroalimentación y plan de acción
-- para soportar Encuestas Normales que no requieren esas fechas
ALTER TABLE Evaluaciones 
  MODIFY COLUMN RetroFechaIni DATE NULL DEFAULT NULL,
  MODIFY COLUMN RetroFechaFin DATE NULL DEFAULT NULL,
  MODIFY COLUMN PlanAFechaIni DATE NULL DEFAULT NULL,
  MODIFY COLUMN PlanAFechaFin DATE NULL DEFAULT NULL;
