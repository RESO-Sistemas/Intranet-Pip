<?php

require_once(__DIR__ . '/../Session/SessionManager.php');
require_once(__DIR__ . '/../Conexiones/Conexiones.php');
require_once(__DIR__ . '/Notifications.php');

// Leer sesión y cerrar inmediatamente — sin lock
session_start(['read_and_close' => true]);

$noEmpleado = (string) ($_SESSION['NoEmpleado'] ?? '');

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');

if ($noEmpleado === '') {
    // Sin sesión: decirle al cliente que cierre el EventSource
    echo "data: " . json_encode(['auth' => false]) . "\n\n";
    flush();
    exit;
}

// Una sola consulta — PHP termina inmediatamente, no bloquea el servidor.
// El EventSource reconecta solo cada 15 segundos (campo retry).
$notifService = new Notifications();
$count = (int) $notifService->getUnreadCount($noEmpleado);

echo "retry: 15000\n";
echo "data: " . json_encode(['unread' => $count]) . "\n\n";
flush();
