-- Script para agregar funcionalidad de selección de participantes en evaluaciones
-- Ejecutar después de add_tipo_evaluacion.sql

-- 1. Agregar campo EmpleadosParticipantes a la tabla Evaluaciones
-- Este campo almacena los NoEmpleado separados por coma
ALTER TABLE Evaluaciones 
ADD COLUMN EmpleadosParticipantes TEXT NULL DEFAULT NULL 
COMMENT 'Lista de NoEmpleado de participantes separados por coma'
AFTER PlanAFechaFin;

-- ============================================================
-- STORED PROCEDURES PARA SELECCIÓN DE PARTICIPANTES
-- ============================================================

-- 2. Stored Procedure: Obtener todas las divisiones
DELIMITER //
DROP PROCEDURE IF EXISTS spGetDivisionesEvaluacion //
CREATE PROCEDURE spGetDivisionesEvaluacion()
BEGIN
    SELECT 
        IdDivision, 
        Division 
    FROM Divisiones 
    ORDER BY Division ASC;
END //
DELIMITER ;

-- 3. Stored Procedure: Obtener sucursales por división
DELIMITER //
DROP PROCEDURE IF EXISTS spGetSucursalesXDivision //
CREATE PROCEDURE spGetSucursalesXDivision(
    IN p_IdDivision VARCHAR(50)
)
BEGIN
    IF p_IdDivision IS NULL OR p_IdDivision = '' THEN
        SELECT 
            IdSucursal, 
            Sucursal 
        FROM SucursalDepto 
        ORDER BY Sucursal ASC;
    ELSE
        SELECT 
            IdSucursal, 
            Sucursal 
        FROM SucursalDepto 
        WHERE IdDivision = p_IdDivision 
        ORDER BY Sucursal ASC;
    END IF;
END //
DELIMITER ;

-- 4. Stored Procedure: Obtener todos los puestos
DELIMITER //
DROP PROCEDURE IF EXISTS spGetPuestosEvaluacion //
CREATE PROCEDURE spGetPuestosEvaluacion()
BEGIN
    SELECT 
        IdPuesto, 
        Puesto 
    FROM Puestos 
    ORDER BY Puesto ASC;
END //
DELIMITER ;

-- 5. Stored Procedure: Obtener empleados filtrados para evaluación
DELIMITER //
DROP PROCEDURE IF EXISTS spGetEmpleadosParaEvaluacion //
CREATE PROCEDURE spGetEmpleadosParaEvaluacion(
    IN p_IdDivision VARCHAR(50),
    IN p_IdSucursal VARCHAR(50),
    IN p_IdPuesto VARCHAR(50)
)
BEGIN
    SELECT 
        E.NoEmpleado, 
        E.Nombre,
        P.Puesto,
        D.Division,
        SD.Sucursal
    FROM Empleados AS E
    INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
    INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
    INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
    WHERE E.Status = 1
        AND (p_IdDivision IS NULL OR p_IdDivision = '' OR E.IdDivision = p_IdDivision)
        AND (p_IdSucursal IS NULL OR p_IdSucursal = '' OR E.IdSucursal = p_IdSucursal)
        AND (p_IdPuesto IS NULL OR p_IdPuesto = '' OR E.IdPuesto = p_IdPuesto)
    ORDER BY E.Nombre ASC;
END //
DELIMITER ;

-- 6. Stored Procedure: Guardar evaluación con participantes
DELIMITER //
DROP PROCEDURE IF EXISTS spSaveEvaluacionConParticipantes //
CREATE PROCEDURE spSaveEvaluacionConParticipantes(
    IN p_Titulo VARCHAR(255),
    IN p_TipoEvaluacion TINYINT,
    IN p_Periodicidad TINYINT,
    IN p_FechaInicio DATE,
    IN p_FechaFin DATE,
    IN p_RetroFechaIni DATE,
    IN p_RetroFechaFin DATE,
    IN p_PlanAFechaIni DATE,
    IN p_PlanAFechaFin DATE,
    IN p_EmpleadosParticipantes TEXT
)
BEGIN
    INSERT INTO Evaluaciones(
        Titulo, 
        TipoEvaluacion, 
        Periodicidad, 
        FechaInicio, 
        FechaFin, 
        RetroFechaIni, 
        RetroFechaFin, 
        PlanAFechaIni, 
        PlanAFechaFin,
        EmpleadosParticipantes
    )
    VALUES (
        p_Titulo, 
        p_TipoEvaluacion, 
        p_Periodicidad, 
        p_FechaInicio, 
        p_FechaFin, 
        p_RetroFechaIni, 
        p_RetroFechaFin, 
        p_PlanAFechaIni, 
        p_PlanAFechaFin,
        p_EmpleadosParticipantes
    );
    
    SELECT LAST_INSERT_ID() AS IdEvaluacion;
END //
DELIMITER ;

-- Nota: Para ejecutar los stored procedures desde PHP:
-- CALL spGetDivisionesEvaluacion();
-- CALL spGetSucursalesXDivision('IdDivision');
-- CALL spGetPuestosEvaluacion();
-- CALL spGetEmpleadosParaEvaluacion('IdDivision', 'IdSucursal', 'IdPuesto');
-- CALL spSaveEvaluacionConParticipantes(...);
