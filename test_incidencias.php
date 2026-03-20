<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    require_once("Backend/Conexiones/Conexiones.php");
    $conn = new Conexiones();
    
    // Ver estructura de Tipos_Incidencias
    $cols = $conn->SelectNotClose("DESCRIBE Tipos_Incidencias");
    echo "=== Tipos_Incidencias ===\n";
    foreach ($cols as $c) echo $c['Field'] . " | " . $c['Type'] . "\n";

    // Ver estructura de Incidencias
    $cols2 = $conn->SelectNotClose("DESCRIBE Incidencias");
    echo "\n=== Incidencias ===\n";
    foreach ($cols2 as $c) echo $c['Field'] . " | " . $c['Type'] . "\n";

    // Ver estructura de Empleados (primeras columnas)
    $cols3 = $conn->SelectNotClose("DESCRIBE Empleados");
    echo "\n=== Empleados ===\n";
    foreach ($cols3 as $c) echo $c['Field'] . " | " . $c['Type'] . "\n";

    // Ver estructura de Puestos
    $cols4 = $conn->SelectNotClose("DESCRIBE Puestos");
    echo "\n=== Puestos ===\n";
    foreach ($cols4 as $c) echo $c['Field'] . " | " . $c['Type'] . "\n";
    
    $conn->ConnClose();
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
