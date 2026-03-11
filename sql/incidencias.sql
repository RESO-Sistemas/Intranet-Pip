-- ============================================================
-- TABLA: Incidencias
-- ============================================================
CREATE TABLE IF NOT EXISTS Incidencias (
    IdIncidencia      INT AUTO_INCREMENT PRIMARY KEY,
    IdChecklist       INT          NOT NULL,
    IdTipoIncidencia  INT          NULL,
    NoEmpleado        VARCHAR(20)  NOT NULL,
    Descripcion       TEXT         NOT NULL,
    Evidencia         VARCHAR(500) NULL,          -- ruta del archivo subido
    FechaRegistro     DATETIME     DEFAULT NOW(),
    Estado            ENUM('Abierta','En proceso','Resuelta') DEFAULT 'Abierta',
    CONSTRAINT fk_inc_checklist      FOREIGN KEY (IdChecklist)      REFERENCES Checklists(IdChecklist),
    CONSTRAINT fk_inc_tipo           FOREIGN KEY (IdTipoIncidencia)  REFERENCES Tipos_Incidencias(IdTipoIncidencia)
);

-- ============================================================
-- SP: Insertar incidencia
-- ============================================================
DROP PROCEDURE IF EXISTS spInsertIncidencia;
DELIMITER $$
CREATE PROCEDURE spInsertIncidencia(
    IN p_IdChecklist      INT,
    IN p_IdTipoIncidencia INT,
    IN p_NoEmpleado       VARCHAR(20),
    IN p_Descripcion      TEXT,
    IN p_Evidencia        VARCHAR(500)
)
BEGIN
    INSERT INTO Incidencias (IdChecklist, IdTipoIncidencia, NoEmpleado, Descripcion, Evidencia)
    VALUES (p_IdChecklist, p_IdTipoIncidencia, p_NoEmpleado, p_Descripcion, p_Evidencia);

    SELECT LAST_INSERT_ID() AS IdIncidencia;
END$$
DELIMITER ;

-- ============================================================
-- SP: Obtener incidencias (para catálogo)
-- ============================================================
DROP PROCEDURE IF EXISTS spGetIncidencias;
DELIMITER $$
CREATE PROCEDURE spGetIncidencias()
BEGIN
    SELECT
        i.IdIncidencia,
        i.NoEmpleado,
        CONCAT(e.Nombre, ' ', e.ApellidoP, ' ', IFNULL(e.ApellidoM,'')) AS NombreEmpleado,
        c.Nombre  AS NombreChecklist,
        ti.Nombre AS NombreTipoIncidencia,
        ti.NivelSeveridad,
        i.Descripcion,
        i.Evidencia,
        i.FechaRegistro,
        i.Estado
    FROM Incidencias i
    LEFT JOIN Empleados       e  ON e.NoEmpleado        = i.NoEmpleado
    LEFT JOIN Checklists      c  ON c.IdChecklist        = i.IdChecklist
    LEFT JOIN Tipos_Incidencias ti ON ti.IdTipoIncidencia = i.IdTipoIncidencia
    ORDER BY i.FechaRegistro DESC;
END$$
DELIMITER ;

-- ============================================================
-- Agregar columnas AbreIncidencia e IdTipoIncidencia a Checklists
-- compatible con MySQL 5.7 (sin IF NOT EXISTS en ALTER TABLE)
-- ============================================================

-- AbreIncidencia
SET @col1 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Checklists' AND COLUMN_NAME = 'AbreIncidencia');
SET @sql1 = IF(@col1 = 0,
    'ALTER TABLE Checklists ADD COLUMN AbreIncidencia TINYINT(1) NOT NULL DEFAULT 0',
    'SELECT 1');
PREPARE stmt1 FROM @sql1; EXECUTE stmt1; DEALLOCATE PREPARE stmt1;

-- IdTipoIncidencia
SET @col2 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Checklists' AND COLUMN_NAME = 'IdTipoIncidencia');
SET @sql2 = IF(@col2 = 0,
    'ALTER TABLE Checklists ADD COLUMN IdTipoIncidencia INT NULL',
    'SELECT 1');
PREPARE stmt2 FROM @sql2; EXECUTE stmt2; DEALLOCATE PREPARE stmt2;

-- FK fk_chk_tipo_inc (solo si la columna se acaba de crear y no existe la FK)
SET @fk1 = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Checklists' AND CONSTRAINT_NAME = 'fk_chk_tipo_inc');
SET @sql3 = IF(@fk1 = 0,
    'ALTER TABLE Checklists ADD CONSTRAINT fk_chk_tipo_inc FOREIGN KEY (IdTipoIncidencia) REFERENCES Tipos_Incidencias(IdTipoIncidencia)',
    'SELECT 1');
PREPARE stmt3 FROM @sql3; EXECUTE stmt3; DEALLOCATE PREPARE stmt3;

-- ============================================================
-- Actualizar spGetChecklistsByPuesto para devolver
-- AbreIncidencia e IdTipoIncidencia
-- (reemplazar el SP existente — ajusta el WHERE según tu lógica actual)
-- ============================================================
DROP PROCEDURE IF EXISTS spGetChecklistsByPuesto;
DELIMITER $$
CREATE PROCEDURE spGetChecklistsByPuesto(
    IN p_IdPuesto   INT,
    IN p_NoEmpleado VARCHAR(20)
)
BEGIN
    SELECT
        c.IdChecklist,
        c.Nombre,
        c.Tipo,
        c.RespuestaEsperada,
        c.AbreIncidencia,
        c.IdTipoIncidencia,
        IFNULL(ce.Respuesta, -1) AS RespuestaEmpleado,
        CASE WHEN ce.IdChecklistEmpleado IS NOT NULL THEN 1 ELSE 0 END AS YaContestado,
        kc.IdKpi
    FROM Checklists c
    LEFT JOIN ChecklistEmpleado ce
        ON ce.IdChecklist = c.IdChecklist
       AND ce.NoEmpleado  = p_NoEmpleado
       AND DATE(ce.FechaRespuesta) = CURDATE()
    LEFT JOIN KpiChecklists kc ON kc.IdChecklist = c.IdChecklist
    WHERE c.IdPuesto = p_IdPuesto
      AND c.Activo   = 1
    ORDER BY c.Nombre;
END$$
DELIMITER ;
