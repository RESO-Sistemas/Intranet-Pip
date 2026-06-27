<?php
require_once(__DIR__ . "/../Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();

echo "========================================\n";
echo "  INVESTIGACIÓN DE LÍNEA ÉTICA\n";
echo "========================================\n\n";

try {
    echo "Estructura de CatalogoLineaEtica:\n";
    $descCat = $conn->Select("DESCRIBE CatalogoLineaEtica;");
    print_r($descCat);

    echo "\nContenido de CatalogoLineaEtica:\n";
    $cat = $conn->Select("SELECT * FROM CatalogoLineaEtica;");
    print_r($cat);

    echo "\nEstructura de LineaEticaMensajes:\n";
    $descMsg = $conn->Select("DESCRIBE LineaEticaMensajes;");
    print_r($descMsg);

    echo "\nContenido actual de LineaEticaMensajes:\n";
    $msg = $conn->Select("SELECT * FROM LineaEticaMensajes;");
    print_r($msg);

} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
