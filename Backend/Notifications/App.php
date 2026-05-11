<?php

// Cargar dependencias en orden correcto
$baseDir = dirname(__DIR__);
require_once($baseDir . '/Conexiones/Conexiones.php');
require_once($baseDir . '/Session/SessionManager.php');
require_once('Notifications.php');

// Encabezado JSON para todas las respuestas
header('Content-Type: application/json; charset=utf-8');

// Validar sesión activa antes de cualquier operación
if (!SessionManager::isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['Resultado' => false, 'Siguiente' => false, 'Msg' => 'Sesión no válida']);
    exit;
}

$noEmpleado  = (string) SessionManager::get('NoEmpleado');
$op          = $_POST['op'] ?? '';
$notifService = new Notifications();

// ----------------------------------------------------------------
// Obtener las últimas 20 notificaciones con detalle completo
// ----------------------------------------------------------------
if ($op === 'getNotifications') {
    echo $notifService->getNotifications($noEmpleado);
    exit;
}

// ----------------------------------------------------------------
// Obtener solo el conteo de no leídas (para polling del badge)
// ----------------------------------------------------------------
if ($op === 'getUnreadCount') {
    $count = $notifService->getUnreadCount($noEmpleado);
    echo json_encode([
        'Resultado'   => true,
        'Siguiente'   => true,
        'UnreadCount' => (int) $count,
    ]);
    exit;
}

// ----------------------------------------------------------------
// Marcar una notificación específica como leída
// ----------------------------------------------------------------
if ($op === 'markAsRead') {
    $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
    if ($id <= 0) {
        echo json_encode(['Resultado' => false, 'Siguiente' => false, 'Msg' => 'ID inválido']);
        exit;
    }
    echo $notifService->markAsRead($id, $noEmpleado);
    exit;
}

// ----------------------------------------------------------------
// Marcar todas las notificaciones como leídas
// ----------------------------------------------------------------
if ($op === 'markAllAsRead') {
    echo $notifService->markAllAsRead($noEmpleado);
    exit;
}

// Operación no reconocida
http_response_code(400);
echo json_encode(['Resultado' => false, 'Siguiente' => false, 'Msg' => 'Operación no válida']);
