<?php
require_once(__DIR__ . "/../Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();

echo "====================================================\n";
echo "  INVESTIGACIÓN DE TABLAS DE EVALUACIONES Y PLANES  \n";
echo "====================================================\n\n";

// 1. Mostrar tablas en la base de datos relacionadas
echo "--- 1. TABLAS RELACIONADAS ---\n";
$tables = $conn->Select("SHOW TABLES;");
$relatedTables = [];
foreach ($tables as $t) {
    $tableName = array_values($t)[0];
    if (stripos($tableName, 'evalua') !== false || 
        stripos($tableName, 'competencia') !== false || 
        stripos($tableName, 'plan') !== false || 
        stripos($tableName, 'preguntas') !== false || 
        stripos($tableName, 'respuestas') !== false || 
        stripos($tableName, 'empleado') !== false ||
        stripos($tableName, 'puesto') !== false ||
        stripos($tableName, 'personal') !== false) {
        $relatedTables[] = $tableName;
    }
}
print_r($relatedTables);

// 2. Obtener conteo de registros en tablas clave
echo "\n--- 2. CONTEO DE REGISTROS ---\n";
$keyTables = [
    'Evaluaciones',
    'EvaluacionDetalle',
    'PreguntasEvaluacion',
    'RespuestaEvaluaciones',
    'Competencias',
    'DetalleCompetencias',
    'RetroalimentacionEvaluacion',
    'PlanesAccionEvaluacion',
    'ObjetivosPlanAccion',
    'ActividadesPlanAccion',
    'AvanceActividadPlanA'
];

foreach ($keyTables as $tbl) {
    try {
        $res = $conn->Select("SELECT COUNT(*) as total FROM `$tbl` LIMIT 1;");
        echo "  - $tbl: " . $res[0]['total'] . " registros\n";
    } catch (\Exception $e) {
        echo "  - $tbl: Error o no existe (" . $e->getMessage() . ")\n";
    }
}

// 3. Ver competencias existentes
echo "\n--- 3. COMPETENCIAS DISPONIBLES ---\n";
try {
    $resComp = $conn->Select("SELECT idCompetencias, Competencia FROM Competencias LIMIT 50;");
    print_r($resComp);
} catch (\Exception $e) {
    echo "Error al leer Competencias: " . $e->getMessage() . "\n";
}

// 4. Ver ejemplos de evaluaciones registradas (especialmente de tipo 360)
echo "\n--- 4. EJEMPLOS DE EVALUACIONES ---\n";
try {
    $resEval = $conn->Select("SELECT idEvaluaciones, Titulo, TipoEvaluacion, DirigidoA, Status, Activado FROM Evaluaciones LIMIT 10;");
    print_r($resEval);
} catch (\Exception $e) {
    echo "Error al leer Evaluaciones: " . $e->getMessage() . "\n";
}

// 5. Ver tipos de preguntas existentes
echo "\n--- 5. TIPOS DE PREGUNTAS EN EL SISTEMA ---\n";
try {
    $resPregType = $conn->Select("SELECT DISTINCT idTipoPregunta FROM PreguntasEvaluacion;");
    echo "Tipos de preguntas en PreguntasEvaluacion:\n";
    print_r($resPregType);
} catch (\Exception $e) {
    echo "Error al leer PreguntasEvaluacion: " . $e->getMessage() . "\n";
}

// 6. Ver estructura y muestra de empleados
echo "\n--- 6. MUESTRA DE EMPLEADOS ---\n";
try {
    echo "\nVerificando existencia de empleados específicos para pruebas:\n";
    $resEmp = $conn->Select("SELECT NoEmpleado, Nombre, Status, IdPuesto, IdSucursal, IdDivision FROM Empleados WHERE NoEmpleado IN (1001, 1002, 1014, 1015);");
    print_r($resEmp);
} catch (\Exception $e) {
    echo "Error al leer empleados: " . $e->getMessage() . "\n";
}


// 7. Estructura de tablas de evaluaciones y preguntas
echo "\n--- 7. ESTRUCTURA DE TABLAS DE EVALUACIONES ---\n";
$tablesToDescribe = [
    'Evaluaciones', 'EvaluacionDetalle', 'PreguntasEvaluacion', 'PreguntasConfiguracion', 
    'PreguntasPosiblesRespuestas', 'RespuestaEvaluaciones', 'DetalleCompetencias',
    'RetroalimentacionEvaluacion', 'PlanesAccionEvaluacion', 'ObjetivosPlanAccion',
    'ActividadesPlanAccion', 'AvanceActividadPlanA', 'HistorialRechazosPlanA'
];
foreach ($tablesToDescribe as $tbl) {
    try {
        echo "\nEstructura de $tbl:\n";
        $desc = $conn->Select("DESCRIBE `$tbl`;");
        // Solo imprimimos el Field, Type, Null y Key de cada columna para evitar output muy largo
        foreach ($desc as $col) {
            echo "  - {$col['Field']} ({$col['Type']}) " . ($col['Key'] ? "[Key={$col['Key']}]" : "") . "\n";
        }
    } catch (\Exception $e) {
        echo "Error describe $tbl: " . $e->getMessage() . "\n";
    }
}

// 8. Consultar la evaluación existente (idEvaluaciones = 6)
echo "\n--- 8. DETALLE DE EVALUACIÓN EXISTENTE (id=6) ---\n";
try {
    $ev = $conn->Select("SELECT * FROM Evaluaciones WHERE idEvaluaciones = 6;");
    echo "Evaluación:\n";
    print_r($ev);
    
    $evDet = $conn->Select("SELECT idEvaluacionDetalle, idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, SubordinadoEvalua, AutoEvalua FROM EvaluacionDetalle WHERE idEvaluaciones = 6;");
    echo "Detalle de evaluadores asignados (EvaluacionDetalle):\n";
    print_r($evDet);
    
    $evPreg = $conn->Select("SELECT idPreguntasEvaluacion, idEvaluaciones, idCompetencias, idTipoPregunta, Titulo FROM PreguntasEvaluacion WHERE idEvaluaciones = 6;");
    echo "Preguntas asociadas:\n";
    print_r($evPreg);
    
    // Obtener configuración de preguntas
    if (!empty($evPreg)) {
        $pregIds = array_column($evPreg, 'idPreguntasEvaluacion');
        $pregIdsStr = implode(',', $pregIds);
        $evPregCfg = $conn->Select("SELECT * FROM PreguntasConfiguracion WHERE idPreguntasEvaluacion IN ($pregIdsStr);");
        echo "Configuración de preguntas (PreguntasConfiguracion):\n";
        print_r($evPregCfg);
    }
    
    // Obtener respuestas guardadas para esta evaluación
    if (!empty($evDet)) {
        $detIds = array_column($evDet, 'idEvaluacionDetalle');
        $detIdsStr = implode(',', $detIds);
        $respuestas = $conn->Select("SELECT * FROM RespuestaEvaluaciones WHERE idEvaluacionDetalle IN ($detIdsStr);");
        echo "Respuestas registradas en la evaluación:\n";
        print_r($respuestas);
    }
    
} catch (\Exception $e) {
    echo "Error al consultar detalle de evaluación 6: " . $e->getMessage() . "\n";
}




// 9. Consultar definición de spFinalizaEvaluacion
echo "\n--- 9. DEFINICIÓN DE SP spFinalizaEvaluacion ---\n";
try {
    $spDef = $conn->Select("SHOW CREATE PROCEDURE spFinalizaEvaluacion;");
    if (!empty($spDef)) {
        echo "Nombre del SP: " . $spDef[0]['Procedure'] . "\n";
        echo "Código de creación:\n" . $spDef[0]['Create Procedure'] . "\n";
    } else {
        echo "No se encontró el SP spFinalizaEvaluacion.\n";
    }
} catch (\Exception $e) {
    echo "Error al consultar procedure: " . $e->getMessage() . "\n";
}

echo "\n====================================================\n";
echo "  FIN DE LA INVESTIGACIÓN  \n";
echo "====================================================\n";

?>
