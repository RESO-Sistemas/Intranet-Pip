-- Script SQL para agregar la columna DirigidoA a la tabla Evaluaciones
-- Fecha: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
-- Descripción: Agregar campo para distinguir si la evaluación va dirigida a empleados o postulantes
-- Valores: 1 = empleados, 2 = postulantes

USE [nombre_de_tu_base_de_datos]; -- Cambiar por el nombre correcto de la base de datos

-- Agregar la columna DirigidoA
ALTER TABLE Evaluaciones 
ADD DirigidoA TINYINT NOT NULL DEFAULT 1;

-- Agregar comentario descriptivo (opcional, dependiendo del motor de BD)
-- Para SQL Server:
-- EXEC sys.sp_addextendedproperty 
--     @name = N'MS_Description', 
--     @value = N'Campo que indica a quien va dirigida la evaluación: 1=empleados, 2=postulantes', 
--     @level0type = N'SCHEMA', @level0name = N'dbo', 
--     @level1type = N'TABLE', @level1name = N'Evaluaciones', 
--     @level2type = N'COLUMN', @level2name = N'DirigidoA';

-- Verificar que la columna se agregó correctamente
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Evaluaciones' 
    AND COLUMN_NAME = 'DirigidoA';

-- Consulta de prueba para verificar el contenido
-- SELECT TOP 5 Id, Titulo, TipoEvaluacion, DirigidoA 
-- FROM Evaluaciones 
-- ORDER BY Id DESC;