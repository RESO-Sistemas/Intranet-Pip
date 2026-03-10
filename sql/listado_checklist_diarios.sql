USE klynet_datosdemo;

-- ============================================================
-- SP: Listado de checklist diarios (agrupado por empleado/día)
-- ============================================================
DROP PROCEDURE IF EXISTS spGetListadoChecklistDiarios;
DELIMITER $$
CREATE PROCEDURE spGetListadoChecklistDiarios(
    IN p_fechaIni DATE,
    IN p_fechaFin DATE
)
BEGIN
    SELECT
        CE.NoEmpleado,
        E.Nombre                            AS NombreEmpleado,
        P.Puesto,
        IFNULL(
            (SELECT T.Nombre
             FROM ChecklistTurnos CT
             INNER JOIN Turnos T ON T.IdTurno = CT.IdTurno
             WHERE CT.IdChecklist = MIN(CE.IdChecklist)
             LIMIT 1),
            'Sin turno'
        )                                   AS Turno,
        MIN(CE.HoraRevision)                AS HoraRevision,
        DATE(MIN(CE.HoraRevision))          AS Fecha,
        COUNT(*)                            AS TotalItems,
        SUM(CASE WHEN CE.Respuesta = C.RespuestaEsperada THEN 1 ELSE 0 END) AS Correctas,
        SUM(CASE WHEN CE.Respuesta != C.RespuestaEsperada AND C.AbreIncidencia = 1 THEN 1 ELSE 0 END) AS Incidencias,
        CASE
            WHEN SUM(CASE WHEN C.AbreIncidencia = 1 AND CE.Respuesta != C.RespuestaEsperada THEN 1 ELSE 0 END) > 0
                THEN 'Con Incidencia'
            WHEN SUM(CASE WHEN CE.Respuesta != C.RespuestaEsperada THEN 1 ELSE 0 END) > 0
                THEN 'Con Observaciones'
            ELSE 'Completo'
        END                                 AS Estatus
    FROM ChecklistEmpleados CE
    INNER JOIN Empleados  E ON E.NoEmpleado = CE.NoEmpleado
    INNER JOIN Checklists C ON C.IdChecklist = CE.IdChecklist
    INNER JOIN Puestos    P ON P.IdPuesto    = E.IdPuesto
    WHERE DATE(CE.HoraRevision) BETWEEN p_fechaIni AND p_fechaFin
    GROUP BY CE.NoEmpleado, DATE(CE.HoraRevision), E.Nombre, P.Puesto
    ORDER BY MIN(CE.HoraRevision) DESC;
END$$
DELIMITER ;


-- ============================================================
-- SP: Detalle de un checklist por empleado y fecha
-- ============================================================
DROP PROCEDURE IF EXISTS spGetDetalleChecklistEmpleado;
DELIMITER $$
CREATE PROCEDURE spGetDetalleChecklistEmpleado(
    IN p_noEmpleado VARCHAR(50),
    IN p_fecha      DATE
)
BEGIN
    SELECT
        C.Nombre                            AS NombreChecklist,
        CE.Respuesta                        AS RespuestaEmpleado,
        C.RespuestaEsperada,
        C.Tipo,
        C.AbreIncidencia,
        IFNULL(K.Nombre, '—')              AS NombreKpi,
        CE.HoraRevision                     AS FechaHora,
        IFNULL(
            (SELECT T.Nombre
             FROM ChecklistTurnos CT
             INNER JOIN Turnos T ON T.IdTurno = CT.IdTurno
             WHERE CT.IdChecklist = C.IdChecklist
             LIMIT 1),
            'Sin turno'
        )                                   AS Turno,
        CASE WHEN CE.Respuesta = C.RespuestaEsperada THEN 1 ELSE 0 END AS EsCorrecto,
        CASE WHEN C.AbreIncidencia = 1 AND CE.Respuesta != C.RespuestaEsperada THEN 1 ELSE 0 END AS GeneraIncidencia
    FROM ChecklistEmpleados CE
    INNER JOIN Checklists C ON C.IdChecklist = CE.IdChecklist
    LEFT  JOIN Kpis       K ON K.IdKpi       = C.IdKpi
    WHERE CE.NoEmpleado = p_noEmpleado
      AND DATE(CE.HoraRevision) = p_fecha
    ORDER BY CE.HoraRevision ASC;
END$$
DELIMITER ;
