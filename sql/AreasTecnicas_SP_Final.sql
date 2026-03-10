-- =====================================================
-- SCRIPT SQL: Procedimientos Almacenados - Áreas Técnicas
-- Ejecutar en la base de datos: klynet_datosdemo
-- Patrón idéntico a Empleados.php
-- =====================================================

-- =====================================================
-- 1. CREAR TABLA (si no existe)
-- =====================================================
CREATE TABLE IF NOT EXISTS Areas_tecnicas (
    IdAreaTecnica INT AUTO_INCREMENT PRIMARY KEY,
    NombreArea VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Estatus TINYINT(1) DEFAULT 1,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- 2. PROCEDIMIENTOS ALMACENADOS (Estilo Empleados.php)
-- =====================================================

-- Eliminar procedimientos si existen
DROP PROCEDURE IF EXISTS spAddAreaTecnica;
DROP PROCEDURE IF EXISTS spUpdateAreaTecnica;
DROP PROCEDURE IF EXISTS spToggleEstatusAreaTecnica;
DROP PROCEDURE IF EXISTS spDeleteAreaTecnica;

DELIMITER //

-- =====================================================
-- SP: Agregar nueva área técnica
-- =====================================================
CREATE PROCEDURE spAddAreaTecnica(
    IN pNombreArea VARCHAR(100),
    IN pDescripcion TEXT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;
    
    -- Verificar si ya existe
    SELECT COUNT(*) INTO vExiste
    FROM Areas_tecnicas
    WHERE LOWER(TRIM(NombreArea)) = LOWER(TRIM(pNombreArea));
    
    IF vExiste > 0 THEN
        SELECT 'Ya existe un área técnica con ese nombre.' AS Retorno;
    ELSE
        INSERT INTO Areas_tecnicas (NombreArea, Descripcion, Estatus)
        VALUES (TRIM(pNombreArea), TRIM(pDescripcion), 1);
        
        SELECT 1 AS Retorno;
    END IF;
END //

-- =====================================================
-- SP: Actualizar área técnica
-- =====================================================
CREATE PROCEDURE spUpdateAreaTecnica(
    IN pIdAreaTecnica INT,
    IN pNombreArea VARCHAR(100),
    IN pDescripcion TEXT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;
    
    -- Verificar si ya existe otro con el mismo nombre
    SELECT COUNT(*) INTO vExiste
    FROM Areas_tecnicas
    WHERE LOWER(TRIM(NombreArea)) = LOWER(TRIM(pNombreArea))
    AND IdAreaTecnica != pIdAreaTecnica;
    
    IF vExiste > 0 THEN
        SELECT 'Ya existe otra área técnica con ese nombre.' AS Retorno;
    ELSE
        UPDATE Areas_tecnicas
        SET NombreArea = TRIM(pNombreArea),
            Descripcion = TRIM(pDescripcion)
        WHERE IdAreaTecnica = pIdAreaTecnica;
        
        SELECT 1 AS Retorno;
    END IF;
END //

-- =====================================================
-- SP: Cambiar estatus (Activar/Desactivar)
-- =====================================================
CREATE PROCEDURE spToggleEstatusAreaTecnica(
    IN pIdAreaTecnica INT
)
BEGIN
    DECLARE vEstatusActual TINYINT;
    DECLARE vNuevoEstatus TINYINT;
    
    -- Obtener estatus actual
    SELECT Estatus INTO vEstatusActual
    FROM Areas_tecnicas
    WHERE IdAreaTecnica = pIdAreaTecnica;
    
    -- Toggle
    SET vNuevoEstatus = IF(vEstatusActual = 1, 0, 1);
    
    -- Actualizar
    UPDATE Areas_tecnicas
    SET Estatus = vNuevoEstatus
    WHERE IdAreaTecnica = pIdAreaTecnica;
    
    SELECT 1 AS Retorno, vNuevoEstatus AS NuevoEstatus;
END //

-- =====================================================
-- SP: Eliminar área técnica
-- =====================================================
CREATE PROCEDURE spDeleteAreaTecnica(
    IN pIdAreaTecnica INT
)
BEGIN
    DECLARE vVacantesAsociadas INT DEFAULT 0;
    
    -- Verificar vacantes asociadas (preparado para futuro)
    -- SELECT COUNT(*) INTO vVacantesAsociadas
    -- FROM Vacantes WHERE IdAreaTecnica = pIdAreaTecnica;
    
    IF vVacantesAsociadas > 0 THEN
        SELECT 'No se puede eliminar. Tiene vacantes asociadas.' AS Retorno;
    ELSE
        DELETE FROM Areas_tecnicas
        WHERE IdAreaTecnica = pIdAreaTecnica;
        
        SELECT 1 AS Retorno;
    END IF;
END //

DELIMITER ;

-- =====================================================
-- 3. DATOS DE EJEMPLO (OPCIONAL - descomenta si quieres)
-- =====================================================
/*
INSERT INTO Areas_tecnicas (NombreArea, Descripcion) VALUES 
('Sistemas', 'Área de tecnología de la información'),
('Mantenimiento', 'Área de mantenimiento preventivo y correctivo'),
('Producción', 'Área de manufactura y procesos productivos'),
('Calidad', 'Área de control y aseguramiento de calidad');
*/

-- FIN DEL SCRIPT