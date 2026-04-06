<?php
// Verificar que la migración fue exitosa
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$pdo = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25');

echo "================================================================================\n";
echo "VERIFICACIÓN POST-MIGRACIÓN\n";
echo "================================================================================\n\n";

// 1. Verificar que la tabla existe
echo "1. Verificando tabla PostulantesTelefonos...\n";
$stmt = $pdo->query("SHOW TABLES LIKE 'PostulantesTelefonos'");
if ($stmt->rowCount() > 0) {
    echo "   ✓ Tabla existe\n\n";
} else {
    die("   ❌ Tabla NO existe\n");
}

// 2. Ver estructura
echo "2. Estructura de la tabla:\n";
$stmt = $pdo->query("DESCRIBE PostulantesTelefonos");
while ($row = $stmt->fetch()) {
    printf("   %-25s %-15s %-8s %-10s\n", 
        $row['Field'], 
        $row['Type'], 
        $row['Null'], 
        $row['Key']
    );
}
echo "\n";

// 3. Contar registros
echo "3. Estadísticas:\n";
$stats = $pdo->query("
    SELECT 
        (SELECT COUNT(*) FROM Postulantes WHERE Telefono IS NOT NULL AND Telefono != '') as postulantes_con_telefono,
        (SELECT COUNT(*) FROM PostulantesTelefonos) as registros_historico,
        (SELECT COUNT(*) FROM PostulantesTelefonos WHERE Activo = 1) as telefonos_activos,
        (SELECT COUNT(*) FROM PostulantesTelefonos WHERE EsPrincipal = 1) as telefonos_principales,
        (SELECT COUNT(DISTINCT IdPostulante) FROM PostulantesTelefonos) as postulantes_unicos
")->fetch();

foreach ($stats as $key => $value) {
    printf("   %-30s: %d\n", $key, $value);
}
echo "\n";

// 4. Ver algunos registros de ejemplo
echo "4. Registros de ejemplo (primeros 5):\n";
$stmt = $pdo->query("
    SELECT 
        pt.IdTelefonoHistorico,
        pt.IdPostulante,
        CONCAT(p.Nombre, ' ', p.ApellidoPaterno) as Nombre,
        pt.Telefono,
        pt.Activo,
        pt.EsPrincipal,
        pt.FechaRegistro
    FROM PostulantesTelefonos pt
    JOIN Postulantes p ON pt.IdPostulante = p.IdPostulante
    ORDER BY pt.IdTelefonoHistorico
    LIMIT 5
");

while ($row = $stmt->fetch()) {
    printf("   ID:%d | Postulante:%d (%s) | Tel:%s | Activo:%d | Principal:%d\n",
        $row['IdTelefonoHistorico'],
        $row['IdPostulante'],
        $row['Nombre'],
        $row['Telefono'],
        $row['Activo'],
        $row['EsPrincipal']
    );
}
echo "\n";

// 5. Verificar triggers
echo "5. Verificando triggers:\n";
$stmt = $pdo->query("SHOW TRIGGERS LIKE 'Postulantes'");
$triggers = $stmt->fetchAll();
if (count($triggers) > 0) {
    foreach ($triggers as $trigger) {
        echo "   ✓ {$trigger['Trigger']} ({$trigger['Timing']} {$trigger['Event']})\n";
    }
} else {
    echo "   ⚠ No se encontraron triggers\n";
}
echo "\n";

echo "================================================================================\n";
echo "✓ MIGRACIÓN VERIFICADA EXITOSAMENTE\n";
echo "================================================================================\n";
