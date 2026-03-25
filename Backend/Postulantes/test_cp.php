<?php
/**
 * test_cp.php
 * Script de prueba para validar la consulta de códigos postales
 * Usar: http://localhost/Intranet-Pip/Backend/Postulantes/test_cp.php?cp=87300
 */

// Suprimir todos los warnings de XML
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', '0');

// Iniciar output buffering para capturar cualquier salida no deseada
ob_start();

header('Content-Type: application/json; charset=utf-8');

// Obtener CP de parámetros
$cp = isset($_GET['cp']) ? $_GET['cp'] : (isset($_POST['cp']) ? $_POST['cp'] : '');

if (empty($cp)) {
    ob_end_clean();
    echo json_encode([
        'success' => false,
        'error' => 'No se proporcionó código postal. Usa: ?cp=87300'
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    // Incluir la clase
    require_once(dirname(__DIR__) . '/Configuracion/CodigosPostales.php');
    
    $inicio = microtime(true);
    
    $cpService = new CodigosPostales();
    $resultado = $cpService->consultarCodigoPostal($cp);
    
    $tiempo = round((microtime(true) - $inicio) * 1000, 2);
    
    // Limpiar buffer antes de enviar respuesta
    ob_end_clean();
    
    if ($resultado) {
        echo json_encode([
            'success' => true,
            'codigo_postal' => $cp,
            'data' => $resultado,
            'tiempo_ms' => $tiempo,
            'colonias_encontradas' => count($resultado['colonias'])
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode([
            'success' => false,
            'codigo_postal' => $cp,
            'error' => 'Código postal no encontrado',
            'tiempo_ms' => $tiempo
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
    
} catch (Exception $e) {
    ob_end_clean();
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
