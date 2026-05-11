<?php

// Clase de dominio para el sistema unificado de notificaciones
class Notifications extends Conexiones
{
    // ----------------------------------------------------------------
    // Inserta una nueva notificación en la tabla centralizada.
    // El SP evita duplicados basados en SourceId + SourceTable + IsRead.
    // ----------------------------------------------------------------
    public function insertNotification(
        string  $noEmpleado,
        string  $type,
        string  $title,
        string  $message,
        string  $link       = '',
        ?int    $sourceId   = null,
        string  $sourceTable = ''
    ): bool {
        try {
            $q = "CALL spInsertNotification(
                    '$noEmpleado',
                    '$type',
                    '$title',
                    '$message',
                    '$link',
                    " . ($sourceId !== null ? (int)$sourceId : 'NULL') . ",
                    " . ($sourceTable !== '' ? "'$sourceTable'" : 'NULL') . "
                  )";
            $this->Procedure($q);
            return true;
        } catch (\Exception $e) {
            error_log('[Notifications::insertNotification] ' . $e->getMessage());
            return false;
        }
    }

    // ----------------------------------------------------------------
    // Obtiene las últimas 20 notificaciones del empleado conectado.
    // Retorna el array JSON con la estructura para el frontend.
    // ----------------------------------------------------------------
    public function getNotifications(string $noEmpleado): string
    {
        try {
            $q   = "CALL spGetNotifications('$noEmpleado')";
            $rows = $this->Procedure($q);

            $notifications = array_map(function (array $row): array {
                return [
                    'id'          => (int) $row['id'],
                    'type'        => $row['Type'],
                    'title'       => $row['Title'],
                    'message'     => $row['Message'],
                    'link'        => $row['Link'] ?? '',
                    'isRead'      => (bool) $row['IsRead'],
                    'createdAt'   => $row['CreatedAt'],
                    'timeAgo'     => $this->timeAgo($row['CreatedAt']),
                ];
            }, $rows ?? []);

            return json_encode([
                'Resultado'     => true,
                'Siguiente'     => true,
                'Notifications' => $notifications,
            ]);
        } catch (\Exception $e) {
            error_log('[Notifications::getNotifications] ' . $e->getMessage());
            return json_encode(['Resultado' => false, 'Siguiente' => false, 'Notifications' => []]);
        }
    }

    // ----------------------------------------------------------------
    // Retorna solo el número de notificaciones no leídas.
    // Una sola query gracias al SP spGetUnreadCount.
    // ----------------------------------------------------------------
    public function getUnreadCount(string $noEmpleado): string
    {
        try {
            $q    = "CALL spGetUnreadCount('$noEmpleado')";
            $rows = $this->Procedure($q);
            $count = isset($rows[0]['UnreadCount']) ? (int)$rows[0]['UnreadCount'] : 0;
            return (string) $count;
        } catch (\Exception $e) {
            error_log('[Notifications::getUnreadCount] ' . $e->getMessage());
            return '0';
        }
    }

    // ----------------------------------------------------------------
    // Marca una notificación como leída y retorna el nuevo conteo.
    // ----------------------------------------------------------------
    public function markAsRead(int $id, string $noEmpleado): string
    {
        try {
            $q    = "CALL spMarkNotificationRead($id, '$noEmpleado')";
            $rows = $this->Procedure($q);
            $newCount = isset($rows[0]['UnreadCount']) ? (int)$rows[0]['UnreadCount'] : 0;
            return json_encode([
                'Resultado'   => true,
                'Siguiente'   => true,
                'UnreadCount' => $newCount,
            ]);
        } catch (\Exception $e) {
            error_log('[Notifications::markAsRead] ' . $e->getMessage());
            return json_encode(['Resultado' => false, 'Siguiente' => false]);
        }
    }

    // ----------------------------------------------------------------
    // Marca todas las notificaciones del empleado como leídas.
    // ----------------------------------------------------------------
    public function markAllAsRead(string $noEmpleado): string
    {
        try {
            $q    = "CALL spMarkAllNotificationsRead('$noEmpleado')";
            $rows = $this->Procedure($q);
            $updated = isset($rows[0]['UpdatedRows']) ? (int)$rows[0]['UpdatedRows'] : 0;
            return json_encode([
                'Resultado'   => true,
                'Siguiente'   => true,
                'UpdatedRows' => $updated,
                'UnreadCount' => 0,
            ]);
        } catch (\Exception $e) {
            error_log('[Notifications::markAllAsRead] ' . $e->getMessage());
            return json_encode(['Resultado' => false, 'Siguiente' => false]);
        }
    }

    // ----------------------------------------------------------------
    // Método utilitario: genera texto relativo para la fecha.
    // Ejemplos: "hace 5 minutos", "hace 2 horas", "hace 3 días"
    // ----------------------------------------------------------------
    private function timeAgo(string $dateTime): string
    {
        try {
            $now  = new \DateTime('now');
            $past = new \DateTime($dateTime);
            $diff = $now->diff($past);

            if ($diff->days === 0) {
                if ($diff->h === 0) {
                    if ($diff->i === 0) {
                        return 'Justo ahora';
                    }
                    $mins = $diff->i;
                    return "Hace $mins " . ($mins === 1 ? 'minuto' : 'minutos');
                }
                $hours = $diff->h;
                return "Hace $hours " . ($hours === 1 ? 'hora' : 'horas');
            }

            if ($diff->days < 7) {
                $days = $diff->days;
                return "Hace $days " . ($days === 1 ? 'día' : 'días');
            }

            // Para fechas más antiguas mostrar la fecha formateada
            return $past->format('d/m/Y H:i');
        } catch (\Exception $e) {
            return $dateTime;
        }
    }
}
