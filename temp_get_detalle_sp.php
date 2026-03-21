<?php
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$options = [
	PDO::ATTR_EMULATE_PREPARES   => true,
	PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
	$dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
    $res = $dbh->query("SHOW CREATE PROCEDURE spGetDetalleIncidencia")->fetchAll();
    print_r($res);
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
