USE klynet_datosdemo;

-- ============================================================
-- Tabla: Tipos_Incidencias
-- ============================================================
CREATE TABLE IF NOT EXISTS Tipos_Incidencias (
    IdTipoIncidencia INT          NOT NULL AUTO_INCREMENT,
    Nombre           VARCHAR(150) NOT NULL,
    NivelSeveridad   ENUM('Baja','Media','Alta','Crítica') NOT NULL DEFAULT 'Media',
    IdPuesto         INT          NULL,
    SLA_Horas        INT          NOT NULL DEFAULT 24,
    Activo           TINYINT(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (IdTipoIncidencia),
    CONSTRAINT fk_ti_puesto FOREIGN KEY (IdPuesto) REFERENCES Puestos(IdPuesto)
);


-- ============================================================
-- SP: Obtener todos los tipos de incidencias
-- ============================================================
DROP PROCEDURE IF EXISTS spGetTiposIncidencias;
DELIMITER $$
CREATE PROCEDURE spGetTiposIncidencias()
BEGIN
    SELECT
        TI.IdTipoIncidencia,
        TI.Nombre,
        TI.NivelSeveridad,
        TI.IdPuesto,
        IFNULL(P.Puesto, 'Todos') AS NombrePuesto,
        TI.SLA_Horas,
        TI.Activo
    FROM Tipos_Incidencias TI
    LEFT JOIN Puestos P ON P.IdPuesto = TI.IdPuesto
    ORDER BY TI.IdTipoIncidencia DESC;
END$$
DELIMITER ;


-- ============================================================
-- SP: Insertar tipo de incidencia
-- ============================================================
DROP PROCEDURE IF EXISTS spInsertTipoIncidencia;
DELIMITER $$
CREATE PROCEDURE spInsertTipoIncidencia(
    IN p_nombre        VARCHAR(150),
    IN p_severidad     VARCHAR(20),
    IN p_idPuesto      INT,
    IN p_slaHoras      INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM Tipos_Incidencias WHERE Nombre = p_nombre) THEN
        SELECT 'Ya existe un tipo de incidencia con ese nombre.' AS Retorno;
    ELSE
        INSERT INTO Tipos_Incidencias (Nombre, NivelSeveridad, IdPuesto, SLA_Horas)
        VALUES (p_nombre, p_severidad, p_idPuesto, p_slaHoras);
        SELECT 1 AS Retorno;
    END IF;
END$$
DELIMITER ;


-- ============================================================
-- SP: Actualizar tipo de incidencia
-- ============================================================
DROP PROCEDURE IF EXISTS spUpdateTipoIncidencia;
DELIMITER $$
CREATE PROCEDURE spUpdateTipoIncidencia(
    IN p_id            INT,
    IN p_nombre        VARCHAR(150),
    IN p_severidad     VARCHAR(20),
    IN p_idPuesto      INT,
    IN p_slaHoras      INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM Tipos_Incidencias WHERE Nombre = p_nombre AND IdTipoIncidencia <> p_id) THEN
        SELECT 'Ya existe otro tipo de incidencia con ese nombre.' AS Retorno;
    ELSE
        UPDATE Tipos_Incidencias
        SET Nombre         = p_nombre,
            NivelSeveridad = p_severidad,
            IdPuesto       = p_idPuesto,
            SLA_Horas      = p_slaHoras
        WHERE IdTipoIncidencia = p_id;
        SELECT 1 AS Retorno;
    END IF;
END$$
DELIMITER ;


-- ============================================================
-- SP: Activar / Desactivar tipo de incidencia
-- ============================================================
DROP PROCEDURE IF EXISTS spToggleTipoIncidencia;
DELIMITER $$
CREATE PROCEDURE spToggleTipoIncidencia(
    IN p_id     INT,
    IN p_activo TINYINT(1)
)
BEGIN
    UPDATE Tipos_Incidencias SET Activo = p_activo WHERE IdTipoIncidencia = p_id;
    SELECT 1 AS Retorno;
END$$
DELIMITER ;


-- ============================================================
-- SP: Eliminar tipo de incidencia
-- ============================================================
DROP PROCEDURE IF EXISTS spDeleteTipoIncidencia;
DELIMITER $$
CREATE PROCEDURE spDeleteTipoIncidencia(
    IN p_id INT
)
BEGIN
    DELETE FROM Tipos_Incidencias WHERE IdTipoIncidencia = p_id;
    SELECT 1 AS Retorno;
END$$
DELIMITER ;
