-- ══════════════════════════════════════════════════════════════════════════════
--  Stored Procedures — Módulo de Incidencias (CORREGIDO)
--  Ejecutar en la base de datos: klynet_datosdemo
--  
--  NOTA: La tabla de tipos se llama Tipos_Incidencias (con guión bajo)
--        y Empleados.Nombre ya contiene el nombre completo
-- ══════════════════════════════════════════════════════════════════════════════

-- ── 1. Listar todas las incidencias con datos del empleado y tipo ────────────

DROP PROCEDURE IF EXISTS spGetListadoIncidencias;

DELIMITER //
CREATE PROCEDURE spGetListadoIncidencias()
BEGIN
    SELECT 
        i.IdIncidencia,
        i.IdChecklist,
        i.IdTipoIncidencia,
        i.NoEmpleado,
        i.Descripcion,
        i.Evidencia,
        i.FechaRegistro,
        IFNULL(i.Estado, 'Abierta') AS Estado,
        e.Nombre AS NombreEmpleado,
        p.Puesto,
        ti.Nombre AS TipoIncidencia
    FROM Incidencias i
    LEFT JOIN Empleados e ON i.NoEmpleado = e.NoEmpleado
    LEFT JOIN Puestos p ON e.IdPuesto = p.IdPuesto
    LEFT JOIN Tipos_Incidencias ti ON i.IdTipoIncidencia = ti.IdTipoIncidencia
    ORDER BY i.FechaRegistro DESC;
END //
DELIMITER ;


-- ── 2. Obtener detalle de una incidencia específica ──────────────────────────

    DROP PROCEDURE IF EXISTS spGetDetalleIncidencia;

    DELIMITER //
    CREATE PROCEDURE spGetDetalleIncidencia(IN p_id INT)
    BEGIN
        SELECT 
            i.IdIncidencia,
            i.IdChecklist,
            i.IdTipoIncidencia,
            i.NoEmpleado,
            i.Descripcion,
            i.Evidencia,
            i.FechaRegistro,
            IFNULL(i.Estado, 'Abierta') AS Estado,
            e.Nombre AS NombreEmpleado,
            p.Puesto,
            ti.Nombre AS TipoIncidencia
        FROM Incidencias i
        LEFT JOIN Empleados e ON i.NoEmpleado = e.NoEmpleado
        LEFT JOIN Puestos p ON e.IdPuesto = p.IdPuesto
        LEFT JOIN Tipos_Incidencias ti ON i.IdTipoIncidencia = ti.IdTipoIncidencia
        WHERE i.IdIncidencia = p_id;
    END //
    DELIMITER ;
