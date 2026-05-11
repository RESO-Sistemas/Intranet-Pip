-- ============================================================
-- Migración: Sistema unificado de notificaciones
-- Versión: 1.0.0
-- Fecha: 2026-05-10
-- Descripción: Crea la tabla Notifications que centraliza todas
--              las notificaciones del sistema en un solo lugar,
--              reemplazando los campos dispersos en distintas tablas.
-- ============================================================

-- Crear tabla principal de notificaciones
CREATE TABLE IF NOT EXISTS Notifications (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    NoEmpleado  VARCHAR(20)     NOT NULL                    COMMENT 'Número de empleado destino de la notificación',
    Type        ENUM(
                    'vacation',   -- Solicitudes de vacaciones
                    'ethics',     -- Línea ética
                    'training',   -- Capacitaciones asignadas
                    'evaluation', -- Evaluaciones pendientes
                    'general'     -- Notificaciones genéricas
                )               NOT NULL DEFAULT 'general'  COMMENT 'Categoría para ícono y filtros',
    Title       VARCHAR(120)    NOT NULL                    COMMENT 'Título corto de la notificación',
    Message     TEXT            NOT NULL                    COMMENT 'Cuerpo del mensaje',
    Link        VARCHAR(255)    NULL                        COMMENT 'URL destino al hacer clic (relativa al root del proyecto)',
    IsRead      TINYINT(1)      NOT NULL DEFAULT 0          COMMENT '0 = no leída, 1 = leída',
    CreatedAt   DATETIME        NOT NULL DEFAULT NOW()      COMMENT 'Fecha/hora de creación',
    ReadAt      DATETIME        NULL                        COMMENT 'Fecha/hora en que fue marcada como leída',
    ExpiresAt   DATETIME        NULL                        COMMENT 'Si se setea, la notificación expira y no se muestra',
    SourceId    INT UNSIGNED    NULL                        COMMENT 'ID del registro origen (idCapacitacion, idSolicitud, etc.)',
    SourceTable VARCHAR(80)     NULL                        COMMENT 'Nombre de la tabla origen para referencia cruzada',

    PRIMARY KEY (id),
    INDEX idx_employee_read  (NoEmpleado, IsRead),
    INDEX idx_employee_type  (NoEmpleado, Type),
    INDEX idx_created        (CreatedAt),
    INDEX idx_expires        (ExpiresAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Tabla centralizada de notificaciones del sistema';


-- ============================================================
-- Stored Procedure: spInsertNotification
-- Uso: CALL spInsertNotification('001', 'vacation', 'Título', 'Mensaje', 'SolicitudVacaciones.php', 25, 'SolicitudesVacaciones');
-- ============================================================
DROP PROCEDURE IF EXISTS spInsertNotification;

DELIMITER $$
CREATE PROCEDURE spInsertNotification(
    IN p_NoEmpleado  VARCHAR(20),
    IN p_Type        VARCHAR(20),
    IN p_Title       VARCHAR(120),
    IN p_Message     TEXT,
    IN p_Link        VARCHAR(255),
    IN p_SourceId    INT UNSIGNED,
    IN p_SourceTable VARCHAR(80)
)
BEGIN
    -- Evitar duplicados: no insertar si ya existe una notificación no leída del mismo origen
    IF p_SourceId IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM Notifications
            WHERE NoEmpleado  = p_NoEmpleado
              AND SourceId    = p_SourceId
              AND SourceTable = p_SourceTable
              AND IsRead      = 0
        ) THEN
            INSERT INTO Notifications (NoEmpleado, Type, Title, Message, Link, SourceId, SourceTable, CreatedAt)
            VALUES (p_NoEmpleado, p_Type, p_Title, p_Message, p_Link, p_SourceId, p_SourceTable, NOW());
        END IF;
    ELSE
        INSERT INTO Notifications (NoEmpleado, Type, Title, Message, Link, CreatedAt)
        VALUES (p_NoEmpleado, p_Type, p_Title, p_Message, p_Link, NOW());
    END IF;
END$$
DELIMITER ;


-- ============================================================
-- Stored Procedure: spGetNotifications
-- Retorna las últimas 20 notificaciones no expiradas del empleado
-- ============================================================
DROP PROCEDURE IF EXISTS spGetNotifications;

DELIMITER $$
CREATE PROCEDURE spGetNotifications(IN p_NoEmpleado VARCHAR(20))
BEGIN
    SELECT
        id,
        Type,
        Title,
        Message,
        Link,
        IsRead,
        CreatedAt,
        SourceId,
        SourceTable
    FROM Notifications
    WHERE NoEmpleado = p_NoEmpleado
      AND (ExpiresAt IS NULL OR ExpiresAt > NOW())
    ORDER BY IsRead ASC, CreatedAt DESC
    LIMIT 20;
END$$
DELIMITER ;


-- ============================================================
-- Stored Procedure: spGetUnreadCount
-- Retorna el conteo de notificaciones no leídas
-- ============================================================
DROP PROCEDURE IF EXISTS spGetUnreadCount;

DELIMITER $$
CREATE PROCEDURE spGetUnreadCount(IN p_NoEmpleado VARCHAR(20))
BEGIN
    SELECT COUNT(*) AS UnreadCount
    FROM Notifications
    WHERE NoEmpleado = p_NoEmpleado
      AND IsRead     = 0
      AND (ExpiresAt IS NULL OR ExpiresAt > NOW());
END$$
DELIMITER ;


-- ============================================================
-- Stored Procedure: spMarkNotificationRead
-- Marca una notificación específica como leída
-- ============================================================
DROP PROCEDURE IF EXISTS spMarkNotificationRead;

DELIMITER $$
CREATE PROCEDURE spMarkNotificationRead(
    IN p_id         INT UNSIGNED,
    IN p_NoEmpleado VARCHAR(20)
)
BEGIN
    UPDATE Notifications
    SET IsRead  = 1,
        ReadAt  = NOW()
    WHERE id         = p_id
      AND NoEmpleado = p_NoEmpleado;

    -- Retornar el conteo actualizado de no leídas
    SELECT COUNT(*) AS UnreadCount
    FROM Notifications
    WHERE NoEmpleado = p_NoEmpleado
      AND IsRead     = 0
      AND (ExpiresAt IS NULL OR ExpiresAt > NOW());
END$$
DELIMITER ;


-- ============================================================
-- Stored Procedure: spMarkAllNotificationsRead
-- Marca todas las notificaciones de un empleado como leídas
-- ============================================================
DROP PROCEDURE IF EXISTS spMarkAllNotificationsRead;

DELIMITER $$
CREATE PROCEDURE spMarkAllNotificationsRead(IN p_NoEmpleado VARCHAR(20))
BEGIN
    UPDATE Notifications
    SET IsRead = 1,
        ReadAt = NOW()
    WHERE NoEmpleado = p_NoEmpleado
      AND IsRead     = 0;

    SELECT ROW_COUNT() AS UpdatedRows;
END$$
DELIMITER ;
