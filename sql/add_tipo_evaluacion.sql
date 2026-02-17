-- Script para agregar campos de tipo de evaluación y periodicidad
-- Ejecutar en la base de datos del sistema

-- 1. Agregar campo TipoEvaluacion (1 = 360, 2 = Normal/Encuesta)
ALTER TABLE Evaluaciones 
ADD COLUMN TipoEvaluacion TINYINT(1) NOT NULL DEFAULT 1 
COMMENT '1 = Evaluación 360, 2 = Encuesta Normal'
AFTER Titulo;

-- 2. Agregar campo Periodicidad (solo aplica cuando TipoEvaluacion = 2)
-- Valores: 1 = Diario, 2 = Semanal, 3 = Mensual, 4 = Único
ALTER TABLE Evaluaciones 
ADD COLUMN Periodicidad TINYINT(1) NULL DEFAULT NULL 
COMMENT '1 = Diario, 2 = Semanal, 3 = Mensual, 4 = Único (solo para encuestas normales)'
AFTER TipoEvaluacion;

-- Nota: Las fechas de retroalimentación y plan de acción aplican para AMBOS tipos de evaluación
-- Verificar los cambios
-- DESCRIBE Evaluaciones;
