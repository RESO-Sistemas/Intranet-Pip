-- ============================================================
-- Actualización de spGetChecklistsByPuesto
-- Agrega NombresTurnos (turno(s) al que pertenece cada ítem)
-- Ejecutar en: klynet_datosdemo
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
        kc.IdKpi,
        -- Nombres de los turnos a los que está asignado este ítem
        IFNULL(
            (SELECT GROUP_CONCAT(T.Nombre ORDER BY T.Nombre SEPARATOR ' / ')
             FROM ChecklistTurnos CT
             INNER JOIN Turnos T ON T.IdTurno = CT.IdTurno
             WHERE CT.IdChecklist = c.IdChecklist),
            'Sin turno'
        ) AS NombresTurnos
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
