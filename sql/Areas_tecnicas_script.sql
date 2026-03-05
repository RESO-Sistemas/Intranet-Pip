-- =====================================================
-- SCRIPT SQL: Catálogo de Áreas Técnicas
-- Ejecutar en la base de datos: klynet_datosdemo
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
-- 2. PROCEDIMIENTOS ALMACENADOS
-- =====================================================

-- Eliminar procedimientos si existen (para poder recrearlos)
DROP PROCEDURE IF EXISTS sp_GetAreasTecnicas;
DROP PROCEDURE IF EXISTS sp_GetAreasTecnicasActivas;
DROP PROCEDURE IF EXISTS sp_GetAreaTecnicaById;
DROP PROCEDURE IF EXISTS sp_AddAreaTecnica;
DROP PROCEDURE IF EXISTS sp_UpdateAreaTecnica;
DROP PROCEDURE IF EXISTS sp_ToggleEstatusAreaTecnica;
DROP PROCEDURE IF EXISTS sp_DeleteAreaTecnica;

DELIMITER //

-- =====================================================
-- SP: Obtener todas las áreas técnicas
-- =====================================================
CREATE PROCEDURE sp_GetAreasTecnicas()
BEGIN
    SELECT 
        IdAreaTecnica,
        NombreArea,
        Descripcion,
        Estatus,
        FechaCreacion,
        FechaActualizacion
    FROM Areas_tecnicas
    ORDER BY NombreArea ASC;
END //


-- =====================================================
-- SP: Obtener solo áreas técnicas activas (para combos)
-- =====================================================
CREATE PROCEDURE sp_GetAreasTecnicasActivas()
BEGIN
    SELECT 
        IdAreaTecnica,
        NombreArea,
        Descripcion
    FROM Areas_tecnicas
    WHERE Estatus = 1
    ORDER BY NombreArea ASC;
END //


-- =====================================================
-- SP: Obtener un área técnica por ID
-- =====================================================
CREATE PROCEDURE sp_GetAreaTecnicaById(
    IN p_IdAreaTecnica INT
)
BEGIN
    SELECT 
        IdAreaTecnica,
        NombreArea,
        Descripcion,
        Estatus,
        FechaCreacion,
        FechaActualizacion
    FROM Areas_tecnicas
    WHERE IdAreaTecnica = p_IdAreaTecnica;
END //


-- =====================================================
-- SP: Agregar nueva área técnica
-- =====================================================
CREATE PROCEDURE sp_AddAreaTecnica(
    IN p_NombreArea VARCHAR(100),
    IN p_Descripcion TEXT
)
BEGIN
    DECLARE v_existe INT DEFAULT 0;
    
    -- Verificar si ya existe un área con el mismo nombre
    SELECT COUNT(*) INTO v_existe
    FROM Areas_tecnicas
    WHERE LOWER(TRIM(NombreArea)) = LOWER(TRIM(p_NombreArea));
    
    IF v_existe > 0 THEN
        SELECT 'Ya existe un área técnica con ese nombre.' AS Retorno;
    ELSE
        INSERT INTO Areas_tecnicas (NombreArea, Descripcion, Estatus)
        VALUES (TRIM(p_NombreArea), TRIM(p_Descripcion), 1);
        
        SELECT 1 AS Retorno;
    END IF;
END //


-- =====================================================
-- SP: Actualizar área técnica existente
-- =====================================================
CREATE PROCEDURE sp_UpdateAreaTecnica(
    IN p_IdAreaTecnica INT,
    IN p_NombreArea VARCHAR(100),
    IN p_Descripcion TEXT
)
BEGIN
    DECLARE v_existe INT DEFAULT 0;
    
    -- Verificar si ya existe otra área con el mismo nombre (excluyendo la actual)
    SELECT COUNT(*) INTO v_existe
    FROM Areas_tecnicas
    WHERE LOWER(TRIM(NombreArea)) = LOWER(TRIM(p_NombreArea))
    AND IdAreaTecnica != p_IdAreaTecnica;
    
    IF v_existe > 0 THEN
        SELECT 'Ya existe otra área técnica con ese nombre.' AS Retorno;
    ELSE
        UPDATE Areas_tecnicas
        SET NombreArea = TRIM(p_NombreArea),
            Descripcion = TRIM(p_Descripcion)
        WHERE IdAreaTecnica = p_IdAreaTecnica;
        
        SELECT 1 AS Retorno;
    END IF;
END //


-- =====================================================
-- SP: Cambiar estatus (Activar/Desactivar)
-- =====================================================
CREATE PROCEDURE sp_ToggleEstatusAreaTecnica(
    IN p_IdAreaTecnica INT
)
BEGIN
    DECLARE v_estatusActual TINYINT;
    DECLARE v_nuevoEstatus TINYINT;
    
    -- Obtener el estatus actual
    SELECT Estatus INTO v_estatusActual
    FROM Areas_tecnicas
    WHERE IdAreaTecnica = p_IdAreaTecnica;
    
    -- Calcular el nuevo estatus (toggle)
    SET v_nuevoEstatus = IF(v_estatusActual = 1, 0, 1);
    
    -- Actualizar
    UPDATE Areas_tecnicas
    SET Estatus = v_nuevoEstatus
    WHERE IdAreaTecnica = p_IdAreaTecnica;
    
    SELECT 1 AS Retorno, v_nuevoEstatus AS NuevoEstatus;
END //


-- =====================================================
-- SP: Eliminar área técnica
-- (Solo si no tiene vacantes asociadas - preparado para futuro)
-- =====================================================
CREATE PROCEDURE sp_DeleteAreaTecnica(
    IN p_IdAreaTecnica INT
)
BEGIN
    DECLARE v_vacantesAsociadas INT DEFAULT 0;
    
    -- Verificar si tiene vacantes asociadas (descomentar cuando exista la tabla Vacantes)
    -- SELECT COUNT(*) INTO v_vacantesAsociadas
    -- FROM Vacantes
    -- WHERE IdAreaTecnica = p_IdAreaTecnica;
    
    IF v_vacantesAsociadas > 0 THEN
        SELECT 'No se puede eliminar el área técnica porque tiene vacantes asociadas.' AS Retorno;
    ELSE
        DELETE FROM Areas_tecnicas
        WHERE IdAreaTecnica = p_IdAreaTecnica;
        
        SELECT 1 AS Retorno;
    END IF;
END //

DELIMITER ;


-- =====================================================
-- 3. DATOS DE EJEMPLO (OPCIONAL)
-- =====================================================
-- INSERT INTO Areas_tecnicas (NombreArea, Descripcion) VALUES 
-- ('Mantenimiento', 'Área encargada del mantenimiento preventivo y correctivo de equipos'),
-- ('Sistemas', 'Área de tecnología de la información y desarrollo de software'),
-- ('Producción', 'Área de manufactura y procesos productivos'),
-- ('Calidad', 'Área de control y aseguramiento de calidad'),
-- ('Logística', 'Área de almacén, distribución y cadena de suministro'),
-- ('Recursos Humanos', 'Área de gestión del talento humano'),
-- ('Administración', 'Área de gestión administrativa y financiera'),
-- ('Ventas', 'Área comercial y atención a clientes');


-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
