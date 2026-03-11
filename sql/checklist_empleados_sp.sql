-- ============================================================
-- SP: Guardar respuesta de checklist de empleado
-- Si ya existe una respuesta hoy para ese empleado+checklist,
-- se actualiza (ON DUPLICATE KEY UPDATE).
-- Requiere un unique key en ChecklistEmpleados(NoEmpleado, IdChecklist, DATE(HoraRevision)).
-- ============================================================
DROP PROCEDURE IF EXISTS spGuardarRespuestaChecklist;
DELIMITER $$
CREATE PROCEDURE spGuardarRespuestaChecklist(
    IN p_NoEmpleado  VARCHAR(20),
    IN p_IdChecklist INT,
    IN p_Respuesta   TINYINT(1)
)
BEGIN
    -- Verificar si ya contestó hoy
    IF EXISTS (
        SELECT 1 FROM ChecklistEmpleados
        WHERE NoEmpleado  = p_NoEmpleado
          AND IdChecklist = p_IdChecklist
          AND DATE(HoraRevision) = CURDATE()
    ) THEN
        -- Actualizar respuesta existente
        UPDATE ChecklistEmpleados
        SET Respuesta     = p_Respuesta,
            HoraRevision  = NOW()
        WHERE NoEmpleado  = p_NoEmpleado    
          AND IdChecklist = p_IdChecklist
          AND DATE(HoraRevision) = CURDATE();
    ELSE
        -- Insertar nueva respuesta
        INSERT INTO ChecklistEmpleados (NoEmpleado, IdChecklist, Respuesta, HoraRevision)
        VALUES (p_NoEmpleado, p_IdChecklist, p_Respuesta, NOW());
    END IF;

    SELECT 1 AS Retorno;
END$$
DELIMITER ;
