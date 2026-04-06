<?php
// Quick check of Postulantes table structure
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$pdo = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25');

echo "POSTULANTES TABLE STRUCTURE:\n";
echo str_repeat('=', 80) . "\n\n";

$stmt = $pdo->query("DESCRIBE Postulantes");
while ($row = $stmt->fetch()) {
    printf("%-30s %-20s %-10s %-10s\n", 
        $row['Field'], 
        $row['Type'], 
        $row['Null'], 
        $row['Key']
    );
}

echo "\n\nSHOW CREATE TABLE:\n";
echo str_repeat('=', 80) . "\n";
$stmt = $pdo->query("SHOW CREATE TABLE Postulantes");
$result = $stmt->fetch();
echo $result['Create Table'];
