-- =====================================================
-- ACTUALIZACIÓN: spGetProcesosPostulacion
-- Agrega LEFT JOIN a Empleados para devolver el nombre
-- del usuario que registró cada cambio en el historial
-- Fecha: Marzo 2026
-- 
-- INSTRUCCIONES: Seleccionar TODO el script y ejecutar
-- con Ctrl+Shift+Enter en MySQL Workbench
-- =====================================================

DELIMITER $$

DROP PROCEDURE IF EXISTS spGetProcesosPostulacion$$

CREATE PROCEDURE spGetProcesosPostulacion(
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
        IFNULL(
            e.Nombre,
            CASE WHEN ph.UsuarioRegistro IS NOT NULL AND ph.UsuarioRegistro > 0 
                 THEN CONCAT('Usuario #', ph.UsuarioRegistro) 
                 ELSE NULL 
            END
        ) AS NombreUsuario
    FROM PostulantesHistorial ph
    LEFT JOIN ProcesosVacantes pv ON pv.IdProceso = ph.IdProceso
    LEFT JOIN Empleados e ON e.NoEmpleado = ph.UsuarioRegistro
    WHERE ph.IdPostulanteVacante = pIdPostulanteVacante
    ORDER BY ph.Fecha ASC;
END$$

DELIMITER ;
