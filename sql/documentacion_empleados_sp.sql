-- =====================================================
-- STORED PROCEDURES: DocumentacionEmpleados
-- Base de datos: klynet_datosdemo
-- Fecha: Marzo 2026
--
-- INSTRUCCIONES: Seleccionar TODO y ejecutar con
-- Ctrl+Shift+Enter en MySQL Workbench
-- =====================================================

DELIMITER $$

-- -----------------------------------------------
-- 1. Vista INTELIGENTE: Todos los tipos de documento
--    con el estatus del empleado (LEFT JOIN)
--    Si no tiene registro = 'Pendiente'
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spGetDocumentacionCompletaEmpleado$$

CREATE PROCEDURE spGetDocumentacionCompletaEmpleado(
    IN pNoEmpleado INT
)
BEGIN
    SELECT 
        td.IdTipoDocumento,
        td.NombreDocumento,
        td.Obligatorio,
        de.IdDocumentacionEmpleado,
        IFNULL(de.Estatus, 'Pendiente') AS Estatus,
        de.FechaCarga,
        de.FechaVencimiento,
        de.Observaciones,
        de.UsuarioRegistro,
        de.FechaRegistro
    FROM TipoDocumentacion td
    LEFT JOIN DocumentacionEmpleados de 
        ON de.IdTipoDocumento = td.IdTipoDocumento 
        AND de.NoEmpleado = pNoEmpleado
    WHERE td.Estatus = 1
    ORDER BY td.Obligatorio DESC, td.NombreDocumento ASC;
END$$

-- -----------------------------------------------
-- 2. Vista CHECKLIST: Todos los empleados activos
--    con el estatus de un tipo de documento específico
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spGetEntregasPorTipoDocumento$$

CREATE PROCEDURE spGetEntregasPorTipoDocumento(
    IN pIdTipoDocumento INT
)
BEGIN
    SELECT 
        e.NoEmpleado,
        e.Nombre,
        de.IdDocumentacionEmpleado,
        IFNULL(de.Estatus, 'Pendiente') AS Estatus,
        de.FechaCarga,
        de.Observaciones
    FROM Empleados e
    LEFT JOIN DocumentacionEmpleados de 
        ON de.NoEmpleado = e.NoEmpleado 
        AND de.IdTipoDocumento = pIdTipoDocumento
    WHERE e.Status = 1
    ORDER BY e.Nombre ASC;
END$$

-- -----------------------------------------------
-- 3. Marcar documento como entregado (INSERT o UPDATE)
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spMarcarDocumentoEntregado$$

CREATE PROCEDURE spMarcarDocumentoEntregado(
    IN pNoEmpleado       INT,
    IN pIdTipoDocumento  INT,
    IN pEstatus          VARCHAR(20),
    IN pFechaCarga       DATE,
    IN pObservaciones    TEXT,
    IN pUsuarioRegistro  INT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;

    SELECT COUNT(*) INTO vExiste
    FROM DocumentacionEmpleados
    WHERE NoEmpleado = pNoEmpleado AND IdTipoDocumento = pIdTipoDocumento;

    IF vExiste > 0 THEN
        UPDATE DocumentacionEmpleados SET
            Estatus = pEstatus,
            FechaCarga = pFechaCarga,
            Observaciones = pObservaciones
        WHERE NoEmpleado = pNoEmpleado AND IdTipoDocumento = pIdTipoDocumento;
    ELSE
        INSERT INTO DocumentacionEmpleados (
            NoEmpleado, IdTipoDocumento, Estatus, FechaCarga, 
            Observaciones, UsuarioRegistro
        ) VALUES (
            pNoEmpleado, pIdTipoDocumento, pEstatus, pFechaCarga,
            pObservaciones, pUsuarioRegistro
        );
    END IF;
    SELECT 1 AS Retorno;
END$$

-- -----------------------------------------------
-- 4. Obtener documentación registrada de un empleado
--    (SP original, mantener compatibilidad)
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spGetDocumentacionEmpleado$$

CREATE PROCEDURE spGetDocumentacionEmpleado(
    IN pNoEmpleado INT
)
BEGIN
    SELECT 
        de.IdDocumentacionEmpleado,
        de.NoEmpleado,
        de.IdTipoDocumento,
        td.NombreDocumento,
        td.Obligatorio,
        de.Estatus,
        de.FechaCarga,
        de.FechaVencimiento,
        de.RutaArchivo,
        de.Observaciones,
        de.UsuarioRegistro,
        de.FechaRegistro,
        de.FechaActualizacion
    FROM DocumentacionEmpleados de
    INNER JOIN TipoDocumentacion td ON td.IdTipoDocumento = de.IdTipoDocumento
    WHERE de.NoEmpleado = pNoEmpleado
    ORDER BY td.NombreDocumento ASC;
END$$

-- -----------------------------------------------
-- 5. Agregar documento a un empleado
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spAddDocumentacionEmpleado$$

CREATE PROCEDURE spAddDocumentacionEmpleado(
    IN pNoEmpleado        INT,
    IN pIdTipoDocumento   INT,
    IN pEstatus           VARCHAR(20),
    IN pFechaCarga        DATE,
    IN pFechaVencimiento  DATE,
    IN pObservaciones     TEXT,
    IN pUsuarioRegistro   INT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;

    SELECT COUNT(*) INTO vExiste
    FROM DocumentacionEmpleados
    WHERE NoEmpleado = pNoEmpleado AND IdTipoDocumento = pIdTipoDocumento;

    IF vExiste > 0 THEN
        SELECT 'Este tipo de documento ya fue registrado para el empleado.' AS Retorno;
    ELSE
        INSERT INTO DocumentacionEmpleados (
            NoEmpleado, IdTipoDocumento, Estatus, FechaCarga,
            FechaVencimiento, Observaciones, UsuarioRegistro
        ) VALUES (
            pNoEmpleado, pIdTipoDocumento, pEstatus, pFechaCarga,
            pFechaVencimiento, pObservaciones, pUsuarioRegistro
        );
        SELECT 1 AS Retorno;
    END IF;
END$$

-- -----------------------------------------------
-- 6. Actualizar documento de un empleado
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spUpdateDocumentacionEmpleado$$

CREATE PROCEDURE spUpdateDocumentacionEmpleado(
    IN pIdDocumentacionEmpleado INT,
    IN pEstatus                VARCHAR(20),
    IN pFechaCarga             DATE,
    IN pFechaVencimiento       DATE,
    IN pObservaciones          TEXT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;

    SELECT COUNT(*) INTO vExiste
    FROM DocumentacionEmpleados
    WHERE IdDocumentacionEmpleado = pIdDocumentacionEmpleado;

    IF vExiste = 0 THEN
        SELECT 'El registro de documentación no existe.' AS Retorno;
    ELSE
        UPDATE DocumentacionEmpleados SET
            Estatus          = pEstatus,
            FechaCarga       = pFechaCarga,
            FechaVencimiento = pFechaVencimiento,
            Observaciones    = pObservaciones
        WHERE IdDocumentacionEmpleado = pIdDocumentacionEmpleado;
        SELECT 1 AS Retorno;
    END IF;
END$$

-- -----------------------------------------------
-- 7. Eliminar documento de un empleado
-- -----------------------------------------------
DROP PROCEDURE IF EXISTS spDeleteDocumentacionEmpleado$$

CREATE PROCEDURE spDeleteDocumentacionEmpleado(
    IN pIdDocumentacionEmpleado INT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;

    SELECT COUNT(*) INTO vExiste
    FROM DocumentacionEmpleados
    WHERE IdDocumentacionEmpleado = pIdDocumentacionEmpleado;

    IF vExiste = 0 THEN
        SELECT 'El registro no existe.' AS Retorno;
    ELSE
        DELETE FROM DocumentacionEmpleados
        WHERE IdDocumentacionEmpleado = pIdDocumentacionEmpleado;
        SELECT 1 AS Retorno;
    END IF;
END$$

DELIMITER ;
