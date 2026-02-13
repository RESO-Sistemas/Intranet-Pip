<?php
// Test de permisos de stored procedures
require_once 'Backend/Conexiones/Conexiones.php';

echo "<h2>Test de Permisos - Stored Procedures</h2>";

$conn = new Conexiones();

// Test 1: sp_NuevoFeed
echo "<h3>1. Test sp_NuevoFeed</h3>";
try {
    $q = "CALL sp_NuevoFeed('Test Feed', 'Descripcion test', '12345', '')";
    $result = $conn->Procedure($q);
    echo "✅ <strong>ÉXITO</strong> - sp_NuevoFeed ejecutado correctamente<br>";
    echo "Resultado: <pre>" . print_r($result, true) . "</pre>";
} catch (Exception $e) {
    echo "❌ <strong>ERROR</strong> - " . $e->getMessage() . "<br>";
}

echo "<hr>";

// Test 2: spNewOrganigrama
echo "<h3>2. Test spNewOrganigrama</h3>";
try {
    $q = "CALL spNewOrganigrama('Test Organigrama')";
    $result = $conn->Procedure($q);
    echo "✅ <strong>ÉXITO</strong> - spNewOrganigrama ejecutado correctamente<br>";
    echo "Resultado: <pre>" . print_r($result, true) . "</pre>";
} catch (Exception $e) {
    echo "❌ <strong>ERROR</strong> - " . $e->getMessage() . "<br>";
}

echo "<hr>";

// Test 3: spGetJefesPosiblesPuesto
echo "<h3>3. Test spGetJefesPosiblesPuesto</h3>";
try {
    $q = "CALL spGetJefesPosiblesPuesto('12345')";
    $result = $conn->Procedure($q);
    echo "✅ <strong>ÉXITO</strong> - spGetJefesPosiblesPuesto ejecutado correctamente<br>";
    echo "Resultado: <pre>" . print_r($result, true) . "</pre>";
} catch (Exception $e) {
    echo "❌ <strong>ERROR</strong> - " . $e->getMessage() . "<br>";
}

echo "<hr>";
echo "<p><strong>Si ves ✅ en todos = Tienes permisos completos</strong></p>";
echo "<p><strong>Si ves ❌ = Aún falta algún permiso</strong></p>";
?>
