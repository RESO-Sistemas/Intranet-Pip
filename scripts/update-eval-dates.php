<?php
// Script para actualizar fechas de la evaluación 360 de prueba
// Ejecutar desde la raíz del proyecto: php scripts/update-eval-dates.php

require_once("Backend/Conexiones/Conexiones.php");

$con = new Conexiones();

// Actualizar fechas de retroalimentación (hoy hasta 30 días)
// Actualizar fechas de plan de acción (hoy hasta 30 días)
$hoy = date('Y-m-d');
$finRetro = date('Y-m-d', strtotime('+30 days'));
$finPlan = date('Y-m-d', strtotime('+60 days'));

$sql = "UPDATE Evaluaciones 
        SET RetroFechaIni = '$hoy 00:00:00', 
            RetroFechaFin = '$finRetro 23:59:59',
            PlanAFechaIni = '$hoy',
            PlanAFechaFin = '$finPlan'
        WHERE idEvaluaciones = 12;";

echo "=== Actualizando fechas de evaluación ID 12 ===\n";
echo "SQL: $sql\n\n";

try {
    $result = $con->ExecuteQuery($sql, array());
    echo "✅ Fechas actualizadas exitosamente.\n";
    echo "   Retroalimentación: $hoy al $finRetro\n";
    echo "   Plan de acción: $hoy al $finPlan\n";
} catch (Exception $e) {
    echo " Error: " . $e->getMessage() . "\n";
}
