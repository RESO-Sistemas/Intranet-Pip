<?php
/**
 * Streaming de la sincronización: emite una línea JSON (NDJSON) por cada paso
 * para alimentar la barra de progreso en tiempo real. Cancelable: si el cliente
 * cierra la conexión, connection_aborted() dispara el rollback de la transacción.
 */
require_once("Sincronizador.php");

@ini_set('output_buffering', '0');
@ini_set('zlib.output_compression', '0');
header('Content-Type: application/x-ndjson; charset=utf-8');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no'); // evita buffering en nginx
while (ob_get_level() > 0) ob_end_flush();
ob_implicit_flush(true);
// La sincronización continúa aunque el cliente cierre el navegador; el progreso
// queda en SyncEstado y se reconecta por polling. Cancelar = flag en BD.
ignore_user_abort(true);
@set_time_limit(0);

$idServidor = $_POST['idServidor'] ?? ($_GET['idServidor'] ?? '');
$accion     = $_POST['accion'] ?? ($_GET['accion'] ?? 'sync'); // 'sync' | 'preview'

$emit = function ($evt) {
    // Best-effort: si el cliente se fue, el echo no llega pero el proceso sigue.
    echo json_encode($evt) . "\n";
    @flush();
};

try {
    $obj = new Sincronizador();
    $res = $accion === 'preview'
        ? $obj->previsualizarServidor($idServidor, $emit)
        : $obj->sincronizarServidor($idServidor, $emit);
    $emit(['fin' => true, 'ok' => (bool) $res['Resultado'], 'data' => $res]);
} catch (Exception $ex) {
    // Cliente desconectado u otro fallo: el rollback ya ocurrió dentro de la clase.
    if (!connection_aborted()) {
        echo json_encode(['fin' => true, 'ok' => false, 'data' => ['Resultado' => false, 'Msg' => $ex->getMessage()]]) . "\n";
        @flush();
    }
}
