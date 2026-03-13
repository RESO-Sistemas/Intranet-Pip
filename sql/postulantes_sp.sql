-- =====================================================
-- PROCEDIMIENTOS ALMACENADOS - MÓDULO POSTULANTES
-- Base de datos: klynet_datosdemo
-- Subtarea 2: Postulaciones
-- Fecha: Marzo 2026
-- =====================================================

-- Eliminar procedimientos si existen
DROP PROCEDURE IF EXISTS spGetPostulantesByVacante;
DROP PROCEDURE IF EXISTS spGetPostulanteDetalle;
DROP PROCEDURE IF EXISTS spAddPostulante;
DROP PROCEDURE IF EXISTS spUpdatePostulante;
DROP PROCEDURE IF EXISTS spDeletePostulante;
DROP PROCEDURE IF EXISTS spAddPostulacion;
DROP PROCEDURE IF EXISTS spUpdateEstatusPostulacion;
DROP PROCEDURE IF EXISTS spDeletePostulacion;
DROP PROCEDURE IF EXISTS spGetPostulantesRequisitos;
DROP PROCEDURE IF EXISTS spAddPostulanteRequisito;
DROP PROCEDURE IF EXISTS spUpdatePostulanteRequisito;
DROP PROCEDURE IF EXISTS spGetPostulanteHistorial;
DROP PROCEDURE IF EXISTS spAddPostulanteHistorial;
DROP PROCEDURE IF EXISTS spGetAllPostulantes;
DROP PROCEDURE IF EXISTS spSearchPostulante;

-- =====================================================
-- SP: Obtener todos los postulantes de una vacante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spGetPostulantesByVacante(
    IN pIdVacante INT
)
BEGIN
    SELECT 
        pv.IdPostulanteVacante,
        pv.IdVacante,
        pv.IdPostulante,
        pv.FechaPostulacion,
        pv.EstatusPostulacion,
        pv.RutaCV,
        pv.RutaSolicitudEmpleo,
        pv.Observaciones,
        p.Nombre,
        p.ApellidoPaterno,
        p.ApellidoMaterno,
        CONCAT(p.Nombre, ' ', p.ApellidoPaterno, ' ', IFNULL(p.ApellidoMaterno, '')) AS NombreCompleto,
        p.CURP,
        p.Telefono,
        p.CorreoElectronico,
        p.Direccion,
        p.Estado,
        p.Ciudad,
        p.FechaRegistro,
        -- Obtener el último proceso alcanzado
        (SELECT pr.NombreProceso 
         FROM PostulantesHistorial ph 
         INNER JOIN ProcesosVacantes pr ON pr.IdProceso = ph.IdProceso
         WHERE ph.IdPostulanteVacante = pv.IdPostulanteVacante 
         ORDER BY ph.Fecha DESC LIMIT 1) AS UltimoProceso,
        -- Contar cuántos procesos ha completado
        (SELECT COUNT(*) FROM PostulantesHistorial ph 
         WHERE ph.IdPostulanteVacante = pv.IdPostulanteVacante 
         AND ph.Resultado = 1) AS ProcesosAprobados
    FROM PostulantesVacantes pv
    INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
    WHERE pv.IdVacante = pIdVacante
    ORDER BY pv.FechaPostulacion DESC;
END //
DELIMITER ;

-- =====================================================
-- SP: Obtener detalle completo de un postulante en una vacante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spGetPostulanteDetalle(
    IN pIdPostulanteVacante INT
)
BEGIN
    SELECT 
        pv.IdPostulanteVacante,
        pv.IdVacante,
        pv.IdPostulante,
        pv.FechaPostulacion,
        pv.EstatusPostulacion,
        pv.RutaCV,
        pv.RutaSolicitudEmpleo,
        pv.Observaciones,
        p.Nombre,
        p.ApellidoPaterno,
        p.ApellidoMaterno,
        CONCAT(p.Nombre, ' ', p.ApellidoPaterno, ' ', IFNULL(p.ApellidoMaterno, '')) AS NombreCompleto,
        p.CURP,
        p.Telefono,
        p.CorreoElectronico,
        p.Direccion,
        p.Estado,
        p.Ciudad,
        p.FechaRegistro,
        v.NombreVacante,
        v.TipoContratacion
    FROM PostulantesVacantes pv
    INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
    INNER JOIN Vacantes v ON v.IdVacante = pv.IdVacante
    WHERE pv.IdPostulanteVacante = pIdPostulanteVacante;
END //
DELIMITER ;

-- =====================================================
-- SP: Agregar nuevo postulante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spAddPostulante(
    IN pNombre VARCHAR(100),
    IN pApellidoPaterno VARCHAR(100),
    IN pApellidoMaterno VARCHAR(100),
    IN pCURP VARCHAR(18),
    IN pTelefono VARCHAR(20),
    IN pCorreoElectronico VARCHAR(150),
    IN pDireccion VARCHAR(300),
    IN pEstado VARCHAR(100),
    IN pCiudad VARCHAR(100)
)
BEGIN
    DECLARE vExisteCorreo INT DEFAULT 0;
    DECLARE vExisteCURP INT DEFAULT 0;
    DECLARE vNewId INT;
    
    -- Verificar si ya existe el correo
    SELECT COUNT(*) INTO vExisteCorreo 
    FROM Postulantes 
    WHERE LOWER(TRIM(CorreoElectronico)) = LOWER(TRIM(pCorreoElectronico));
    
    -- Verificar si ya existe el CURP (si se proporcionó)
    IF pCURP IS NOT NULL AND TRIM(pCURP) != '' THEN
        SELECT COUNT(*) INTO vExisteCURP 
        FROM Postulantes 
        WHERE UPPER(TRIM(CURP)) = UPPER(TRIM(pCURP));
    END IF;
    
    IF vExisteCorreo > 0 THEN
        SELECT 'Ya existe un postulante registrado con este correo electrónico.' AS Retorno, 0 AS IdPostulante;
    ELSEIF vExisteCURP > 0 THEN
        SELECT 'Ya existe un postulante registrado con este CURP.' AS Retorno, 0 AS IdPostulante;
    ELSE
        INSERT INTO Postulantes (
            Nombre, ApellidoPaterno, ApellidoMaterno, CURP, 
            Telefono, CorreoElectronico, Direccion, Estado, Ciudad
        ) VALUES (
            TRIM(pNombre), TRIM(pApellidoPaterno), TRIM(pApellidoMaterno), 
            UPPER(TRIM(pCURP)), TRIM(pTelefono), LOWER(TRIM(pCorreoElectronico)),
            TRIM(pDireccion), TRIM(pEstado), TRIM(pCiudad)
        );
        
        SET vNewId = LAST_INSERT_ID();
        SELECT 1 AS Retorno, vNewId AS IdPostulante;
    END IF;
END //
DELIMITER ;

-- =====================================================
-- SP: Actualizar datos de postulante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spUpdatePostulante(
    IN pIdPostulante INT,
    IN pNombre VARCHAR(100),
    IN pApellidoPaterno VARCHAR(100),
    IN pApellidoMaterno VARCHAR(100),
    IN pCURP VARCHAR(18),
    IN pTelefono VARCHAR(20),
    IN pCorreoElectronico VARCHAR(150),
    IN pDireccion VARCHAR(300),
    IN pEstado VARCHAR(100),
    IN pCiudad VARCHAR(100)
)
BEGIN
    DECLARE vExisteCorreo INT DEFAULT 0;
    DECLARE vExisteCURP INT DEFAULT 0;
    
    -- Verificar duplicado de correo excluyendo el actual
    SELECT COUNT(*) INTO vExisteCorreo 
    FROM Postulantes 
    WHERE LOWER(TRIM(CorreoElectronico)) = LOWER(TRIM(pCorreoElectronico))
    AND IdPostulante != pIdPostulante;
    
    -- Verificar duplicado de CURP excluyendo el actual
    IF pCURP IS NOT NULL AND TRIM(pCURP) != '' THEN
        SELECT COUNT(*) INTO vExisteCURP 
        FROM Postulantes 
        WHERE UPPER(TRIM(CURP)) = UPPER(TRIM(pCURP))
        AND IdPostulante != pIdPostulante;
    END IF;
    
    IF vExisteCorreo > 0 THEN
        SELECT 'Ya existe otro postulante con este correo electrónico.' AS Retorno;
    ELSEIF vExisteCURP > 0 THEN
        SELECT 'Ya existe otro postulante con este CURP.' AS Retorno;
    ELSE
        UPDATE Postulantes SET
            Nombre = TRIM(pNombre),
            ApellidoPaterno = TRIM(pApellidoPaterno),
            ApellidoMaterno = TRIM(pApellidoMaterno),
            CURP = UPPER(TRIM(pCURP)),
            Telefono = TRIM(pTelefono),
            CorreoElectronico = LOWER(TRIM(pCorreoElectronico)),
            Direccion = TRIM(pDireccion),
            Estado = TRIM(pEstado),
            Ciudad = TRIM(pCiudad)
        WHERE IdPostulante = pIdPostulante;
        
        SELECT 1 AS Retorno;
    END IF;
END //
DELIMITER ;

-- =====================================================
-- SP: Eliminar postulante (solo si no tiene postulaciones)
-- =====================================================
DELIMITER //
CREATE PROCEDURE spDeletePostulante(
    IN pIdPostulante INT
)
BEGIN
    DECLARE vTienePostulaciones INT DEFAULT 0;
    
    SELECT COUNT(*) INTO vTienePostulaciones 
    FROM PostulantesVacantes 
    WHERE IdPostulante = pIdPostulante;
    
    IF vTienePostulaciones > 0 THEN
        SELECT 'No se puede eliminar el postulante porque tiene postulaciones registradas.' AS Retorno;
    ELSE
        DELETE FROM Postulantes WHERE IdPostulante = pIdPostulante;
        SELECT 1 AS Retorno;
    END IF;
END //
DELIMITER ;

-- =====================================================
-- SP: Agregar postulación (postulante a vacante)
-- =====================================================
DELIMITER //
CREATE PROCEDURE spAddPostulacion(
    IN pIdVacante INT,
    IN pIdPostulante INT,
    IN pRutaCV VARCHAR(500),
    IN pRutaSolicitudEmpleo VARCHAR(500),
    IN pObservaciones TEXT
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;
    DECLARE vVacanteActiva INT DEFAULT 0;
    DECLARE vNewId INT;
    
    -- Verificar si la vacante está activa (no necesita estar publicada para agregar internamente)
    SELECT COUNT(*) INTO vVacanteActiva 
    FROM Vacantes 
    WHERE IdVacante = pIdVacante 
    AND Estatus IN (1, 2);
    
    IF vVacanteActiva = 0 THEN
        SELECT 'La vacante no está disponible para postulaciones.' AS Retorno, 0 AS IdPostulanteVacante;
    ELSE
        -- Verificar si ya está postulado
        SELECT COUNT(*) INTO vExiste 
        FROM PostulantesVacantes 
        WHERE IdVacante = pIdVacante AND IdPostulante = pIdPostulante;
        
        IF vExiste > 0 THEN
            SELECT 'El postulante ya está registrado en esta vacante.' AS Retorno, 0 AS IdPostulanteVacante;
        ELSE
            INSERT INTO PostulantesVacantes (
                IdVacante, IdPostulante, EstatusPostulacion, 
                RutaCV, RutaSolicitudEmpleo, Observaciones
            ) VALUES (
                pIdVacante, pIdPostulante, 1, 
                pRutaCV, pRutaSolicitudEmpleo, pObservaciones
            );
            
            SET vNewId = LAST_INSERT_ID();
            SELECT 1 AS Retorno, vNewId AS IdPostulanteVacante;
        END IF;
    END IF;
END //
DELIMITER ;

-- =====================================================
-- SP: Actualizar estatus de postulación
-- =====================================================
DELIMITER //
CREATE PROCEDURE spUpdateEstatusPostulacion(
    IN pIdPostulanteVacante INT,
    IN pEstatusPostulacion TINYINT(1),
    IN pObservaciones TEXT
)
BEGIN
    UPDATE PostulantesVacantes SET
        EstatusPostulacion = pEstatusPostulacion,
        Observaciones = IFNULL(pObservaciones, Observaciones)
    WHERE IdPostulanteVacante = pIdPostulanteVacante;
    
    SELECT 1 AS Retorno;
END //
DELIMITER ;

-- =====================================================
-- SP: Eliminar postulación
-- =====================================================
DELIMITER //
CREATE PROCEDURE spDeletePostulacion(
    IN pIdPostulanteVacante INT
)
BEGIN
    -- Las tablas relacionadas se eliminan por CASCADE
    DELETE FROM PostulantesVacantes WHERE IdPostulanteVacante = pIdPostulanteVacante;
    SELECT 1 AS Retorno;
END //
DELIMITER ;

-- =====================================================
-- SP: Obtener requisitos de un postulante en una vacante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spGetPostulantesRequisitos(
    IN pIdPostulanteVacante INT
)
BEGIN
    SELECT 
        pr.IdPostulanteRequisito,
        pr.IdPostulanteVacante,
        pr.IdVacanteRequisito,
        pr.Respuesta,
        pr.Cumple,
        pr.FechaRespuesta,
        vr.Requisito,
        vr.Orden
    FROM PostulantesRequisitos pr
    INNER JOIN VacantesRequisitos vr ON vr.IdVacanteRequisito = pr.IdVacanteRequisito
    WHERE pr.IdPostulanteVacante = pIdPostulanteVacante
    ORDER BY vr.Orden ASC;
END //
DELIMITER ;

-- =====================================================
-- SP: Agregar/Actualizar respuesta de requisito
-- =====================================================
DELIMITER //
CREATE PROCEDURE spAddPostulanteRequisito(
    IN pIdPostulanteVacante INT,
    IN pIdVacanteRequisito INT,
    IN pRespuesta TEXT,
    IN pCumple TINYINT(1)
)
BEGIN
    DECLARE vExiste INT DEFAULT 0;
    
    SELECT COUNT(*) INTO vExiste 
    FROM PostulantesRequisitos 
    WHERE IdPostulanteVacante = pIdPostulanteVacante 
    AND IdVacanteRequisito = pIdVacanteRequisito;
    
    IF vExiste > 0 THEN
        -- Actualizar existente
        UPDATE PostulantesRequisitos SET
            Respuesta = pRespuesta,
            Cumple = pCumple,
            FechaRespuesta = CURRENT_TIMESTAMP
        WHERE IdPostulanteVacante = pIdPostulanteVacante 
        AND IdVacanteRequisito = pIdVacanteRequisito;
    ELSE
        -- Insertar nuevo
        INSERT INTO PostulantesRequisitos (
            IdPostulanteVacante, IdVacanteRequisito, Respuesta, Cumple
        ) VALUES (
            pIdPostulanteVacante, pIdVacanteRequisito, pRespuesta, pCumple
        );
    END IF;
    
    SELECT 1 AS Retorno;
END //
DELIMITER ;

-- =====================================================
-- SP: Actualizar evaluación de requisito (Cumple/No cumple)
-- =====================================================
DELIMITER //
CREATE PROCEDURE spUpdatePostulanteRequisito(
    IN pIdPostulanteRequisito INT,
    IN pRespuesta VARCHAR(500),
    IN pCumple TINYINT(1)
)
BEGIN
    UPDATE PostulantesRequisitos SET
        Respuesta = pRespuesta,
        Cumple = pCumple,
        FechaRespuesta = NOW()
    WHERE IdPostulanteRequisito = pIdPostulanteRequisito;
    
    SELECT 1 AS Retorno;
END //
DELIMITER ;

-- =====================================================
-- SP: Obtener historial de un postulante en una vacante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spGetPostulanteHistorial(
    IN pIdPostulanteVacante INT
)
BEGIN
    SELECT 
        ph.IdPostulanteHistorial,
        ph.IdPostulanteVacante,
        ph.IdProceso,
        ph.Fecha,
        ph.Observaciones,
        ph.Resultado,
        ph.UsuarioRegistro,
        pv.NombreProceso,
        pv.Orden AS OrdenProceso,
        CONCAT(e.Nombre, ' ', e.ApellidoPaterno) AS NombreUsuario
    FROM PostulantesHistorial ph
    INNER JOIN ProcesosVacantes pv ON pv.IdProceso = ph.IdProceso
    LEFT JOIN Empleados e ON e.NoEmpleado = ph.UsuarioRegistro
    WHERE ph.IdPostulanteVacante = pIdPostulanteVacante
    ORDER BY pv.Orden ASC, ph.Fecha DESC;
END //
DELIMITER ;

-- =====================================================
-- SP: Agregar historial de proceso
-- =====================================================
DELIMITER //
CREATE PROCEDURE spAddPostulanteHistorial(
    IN pIdPostulanteVacante INT,
    IN pIdProceso INT,
    IN pObservaciones TEXT,
    IN pResultado TINYINT(1),
    IN pUsuarioRegistro INT
)
BEGIN
    INSERT INTO PostulantesHistorial (
        IdPostulanteVacante, IdProceso, Observaciones, Resultado, UsuarioRegistro
    ) VALUES (
        pIdPostulanteVacante, pIdProceso, pObservaciones, pResultado, pUsuarioRegistro
    );
    
    SELECT 1 AS Retorno, LAST_INSERT_ID() AS IdPostulanteHistorial;
END //
DELIMITER ;

-- =====================================================
-- SP: Obtener todos los postulantes (catálogo)
-- =====================================================
DELIMITER //
CREATE PROCEDURE spGetAllPostulantes()
BEGIN
    SELECT 
        p.IdPostulante,
        p.Nombre,
        p.ApellidoPaterno,
        p.ApellidoMaterno,
        CONCAT(p.Nombre, ' ', p.ApellidoPaterno, ' ', IFNULL(p.ApellidoMaterno, '')) AS NombreCompleto,
        p.CURP,
        p.Telefono,
        p.CorreoElectronico,
        p.Direccion,
        p.Estado,
        p.Ciudad,
        p.FechaRegistro,
        (SELECT COUNT(*) FROM PostulantesVacantes pv WHERE pv.IdPostulante = p.IdPostulante) AS TotalPostulaciones
    FROM Postulantes p
    ORDER BY p.FechaRegistro DESC;
END //
DELIMITER ;

-- =====================================================
-- SP: Buscar postulante por correo o CURP
-- =====================================================
DELIMITER //
CREATE PROCEDURE spSearchPostulante(
    IN pBusqueda VARCHAR(150)
)
BEGIN
    SELECT 
        p.IdPostulante,
        p.Nombre,
        p.ApellidoPaterno,
        p.ApellidoMaterno,
        CONCAT(p.Nombre, ' ', p.ApellidoPaterno, ' ', IFNULL(p.ApellidoMaterno, '')) AS NombreCompleto,
        p.CURP,
        p.Telefono,
        p.CorreoElectronico,
        p.Direccion,
        p.Estado,
        p.Ciudad,
        p.FechaRegistro
    FROM Postulantes p
    WHERE LOWER(p.CorreoElectronico) LIKE CONCAT('%', LOWER(pBusqueda), '%')
    OR UPPER(p.CURP) LIKE CONCAT('%', UPPER(pBusqueda), '%')
    OR LOWER(CONCAT(p.Nombre, ' ', p.ApellidoPaterno)) LIKE CONCAT('%', LOWER(pBusqueda), '%')
    ORDER BY p.FechaRegistro DESC
    LIMIT 20;
END //
DELIMITER ;

-- =====================================================
-- SP: Obtener estadísticas de postulantes por vacante
-- =====================================================
DELIMITER //
CREATE PROCEDURE spGetEstadisticasPostulantes(
    IN pIdVacante INT
)
BEGIN
    SELECT 
        COUNT(*) AS TotalPostulantes,
        SUM(CASE WHEN EstatusPostulacion = 1 THEN 1 ELSE 0 END) AS EnProceso,
        SUM(CASE WHEN EstatusPostulacion = 2 THEN 1 ELSE 0 END) AS Aceptados,
        SUM(CASE WHEN EstatusPostulacion = 3 THEN 1 ELSE 0 END) AS Rechazados,
        SUM(CASE WHEN EstatusPostulacion = 4 THEN 1 ELSE 0 END) AS Finalizados
    FROM PostulantesVacantes
    WHERE IdVacante = pIdVacante;
END //
DELIMITER ;

-- =====================================================
-- SP: Actualizar archivos del postulante (CV y Solicitud)
-- =====================================================
DELIMITER //
CREATE PROCEDURE spUpdatePostulacionArchivos(
    IN pIdPostulanteVacante INT,
    IN pRutaCV VARCHAR(500),
    IN pRutaSolicitudEmpleo VARCHAR(500)
)
BEGIN
    UPDATE PostulantesVacantes SET
        RutaCV = IFNULL(pRutaCV, RutaCV),
        RutaSolicitudEmpleo = IFNULL(pRutaSolicitudEmpleo, RutaSolicitudEmpleo)
    WHERE IdPostulanteVacante = pIdPostulanteVacante;
    
    SELECT 1 AS Retorno;
END //
DELIMITER ;

-- =====================================================
-- FIN DE PROCEDIMIENTOS ALMACENADOS - POSTULANTES
-- =====================================================
