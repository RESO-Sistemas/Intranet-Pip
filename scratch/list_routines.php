<?php
try {
    $dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
    $options = [
        PDO::ATTR_PERSISTENT         => true,
        PDO::ATTR_EMULATE_PREPARES   => true,
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];
    $pdo = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
    echo "Conexión exitosa a la base de datos.\n\n";

    echo "--- Listado de Stored Procedures ---\n";
    $stmt = $pdo->query("SHOW PROCEDURE STATUS WHERE Db = 'klynet_datosdemo'");
    $procedures = $stmt->fetchAll();
    foreach ($procedures as $p) {
        echo $p['Name'] . "\n";
    }

} catch (\Exception $e) {
    echo "Error de conexión o consulta: " . $e->getMessage() . "\n";
}
