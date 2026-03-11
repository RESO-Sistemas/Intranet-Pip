<?php
// Archivo de prueba para verificar conectividad y procedimientos
include("AreasTecnicas.php");

header('Content-Type: application/json');

try {
    $test = new AreasTecnicas();
    
    // Probar conexión básica
    echo json_encode([
        "status" => "success",
        "message" => "Conexión establecida. Ahora ejecuta el script SQL."
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "message" => $e->getMessage(),
        "line" => $e->getLine(),
        "file" => $e->getFile()
    ]);
}