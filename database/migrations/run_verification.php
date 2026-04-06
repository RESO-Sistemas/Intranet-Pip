<?php
/**
 * Script para ejecutar verificación de datos antes de la migración
 * Versión compatible con MySQL sin REGEXP_REPLACE
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Conexión a la base de datos
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$options = [
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
    echo "✓ Conexión exitosa a la base de datos\n\n";
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage() . "\n");
}

// Array de consultas de verificación
$queries = [
    [
        'titulo' => '1. POSTULANTES SIN TELÉFONO',
        'query' => "SELECT 
            IdPostulante, 
            CONCAT(Nombre, ' ', ApellidoPaterno, ' ', IFNULL(ApellidoMaterno, '')) AS NombreCompleto,
            CorreoElectronico,
            CURP,
            Telefono
        FROM Postulantes
        WHERE Telefono IS NULL OR Telefono = '' OR TRIM(Telefono) = ''
        ORDER BY IdPostulante DESC
        LIMIT 20"
    ],
    [
        'titulo' => '2. TELÉFONOS CON FORMATO SOSPECHOSO',
        'query' => "SELECT 
            IdPostulante,
            CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto,
            Telefono,
            LENGTH(Telefono) AS LongitudTotal,
            CASE 
                WHEN LENGTH(Telefono) < 10 THEN 'Muy corto'
                WHEN LENGTH(Telefono) > 15 THEN 'Muy largo'
                WHEN Telefono NOT REGEXP '^[0-9]+$' THEN 'Contiene caracteres'
                ELSE 'Revisar'
            END AS TipoProblema
        FROM Postulantes
        WHERE Telefono IS NOT NULL 
          AND Telefono != ''
          AND (
              LENGTH(Telefono) < 10
              OR LENGTH(Telefono) > 15
              OR Telefono NOT REGEXP '^[0-9 ()\\-+]+$'
          )
        LIMIT 20"
    ],
    [
        'titulo' => '3. TELÉFONOS DUPLICADOS (MISMO NÚMERO, DIFERENTES POSTULANTES)',
        'query' => "SELECT 
            Telefono,
            COUNT(*) AS VecesRepetido,
            GROUP_CONCAT(CONCAT(Nombre, ' ', ApellidoPaterno) SEPARATOR ' | ') AS Postulantes,
            GROUP_CONCAT(CURP SEPARATOR ' | ') AS CURPs,
            GROUP_CONCAT(IdPostulante SEPARATOR ', ') AS IDs
        FROM Postulantes
        WHERE Telefono IS NOT NULL AND Telefono != ''
        GROUP BY Telefono
        HAVING COUNT(*) > 1
        ORDER BY VecesRepetido DESC
        LIMIT 20"
    ],
    [
        'titulo' => '4. POSTULANTES CON CURP DUPLICADO',
        'query' => "SELECT 
            CURP,
            COUNT(*) AS VecesRepetido,
            GROUP_CONCAT(CONCAT(Nombre, ' ', ApellidoPaterno) SEPARATOR ' | ') AS Postulantes,
            GROUP_CONCAT(Telefono SEPARATOR ' | ') AS Telefonos,
            GROUP_CONCAT(IdPostulante SEPARATOR ', ') AS IDs
        FROM Postulantes
        WHERE CURP IS NOT NULL AND CURP != ''
        GROUP BY CURP
        HAVING COUNT(*) > 1
        ORDER BY VecesRepetido DESC"
    ],
    [
        'titulo' => '5. ESTADÍSTICAS GENERALES',
        'query' => "SELECT 
            COUNT(*) AS TotalPostulantes,
            COUNT(DISTINCT CURP) AS CURPsUnicos,
            COUNT(CASE WHEN Telefono IS NOT NULL AND Telefono != '' THEN 1 END) AS ConTelefono,
            COUNT(CASE WHEN Telefono IS NULL OR Telefono = '' THEN 1 END) AS SinTelefono,
            COUNT(CASE WHEN CorreoElectronico IS NOT NULL AND CorreoElectronico != '' THEN 1 END) AS ConCorreo,
            COUNT(CASE WHEN LENGTH(Telefono) = 10 AND Telefono REGEXP '^[0-9]+$' THEN 1 END) AS TelefonosValidos10Digitos
        FROM Postulantes"
    ]
];

// Ejecutar cada consulta
foreach ($queries as $index => $item) {
    echo str_repeat('=', 80) . "\n";
    echo "=== " . $item['titulo'] . " ===\n";
    echo str_repeat('=', 80) . "\n\n";
    
    try {
        $stmt = $pdo->query($item['query']);
        $results = $stmt->fetchAll();
        
        if (empty($results)) {
            echo "✓ No se encontraron registros (esto es bueno para verificaciones de problemas)\n\n";
        } else {
            // Mostrar resultados
            $count = count($results);
            echo "Se encontraron $count registro(s):\n\n";
            
            foreach ($results as $row) {
                foreach ($row as $key => $value) {
                    echo "  $key: " . ($value ?? '(NULL)') . "\n";
                }
                echo str_repeat('-', 80) . "\n";
            }
            echo "\n";
        }
    } catch (PDOException $e) {
        echo "⚠ Error al ejecutar consulta: " . $e->getMessage() . "\n\n";
    }
}

// Análisis detallado de teléfonos duplicados
echo "\n" . str_repeat('=', 80) . "\n";
echo "=== ANÁLISIS DETALLADO: TELÉFONOS DUPLICADOS ===\n";
echo str_repeat('=', 80) . "\n\n";

try {
    $stmt = $pdo->query("
        SELECT 
            p1.IdPostulante,
            p1.Nombre,
            p1.ApellidoPaterno,
            p1.CURP,
            p1.Telefono,
            p1.FechaRegistro
        FROM Postulantes p1
        WHERE p1.Telefono IN (
            SELECT Telefono 
            FROM Postulantes 
            WHERE Telefono IS NOT NULL AND Telefono != ''
            GROUP BY Telefono 
            HAVING COUNT(*) > 1
        )
        ORDER BY p1.Telefono, p1.FechaRegistro
    ");
    
    $duplicates = $stmt->fetchAll();
    
    if (!empty($duplicates)) {
        $currentPhone = null;
        $phoneCount = 0;
        
        foreach ($duplicates as $dup) {
            if ($currentPhone !== $dup['Telefono']) {
                if ($currentPhone !== null) {
                    echo "\n";
                }
                $currentPhone = $dup['Telefono'];
                $phoneCount++;
                echo "TELÉFONO #$phoneCount: {$dup['Telefono']}\n";
                echo str_repeat('-', 80) . "\n";
            }
            
            echo sprintf(
                "  ID: %s | %s %s | CURP: %s | Fecha: %s\n",
                $dup['IdPostulante'],
                $dup['Nombre'],
                $dup['ApellidoPaterno'],
                $dup['CURP'] ?? '(sin CURP)',
                $dup['FechaRegistro']
            );
        }
    }
} catch (PDOException $e) {
    echo "⚠ Error en análisis: " . $e->getMessage() . "\n";
}

echo "\n" . str_repeat('=', 80) . "\n";
echo "VERIFICACIÓN COMPLETADA\n";
echo str_repeat('=', 80) . "\n";
echo "\nRECOMENDACIONES BASADAS EN LOS RESULTADOS:\n\n";

// Obtener estadísticas para recomendaciones
try {
    $stmt = $pdo->query("
        SELECT 
            COUNT(*) as total,
            COUNT(CASE WHEN Telefono IS NULL OR Telefono = '' THEN 1 END) as sin_telefono,
            COUNT(DISTINCT Telefono) as telefonos_unicos,
            (SELECT COUNT(*) FROM (
                SELECT Telefono 
                FROM Postulantes 
                WHERE Telefono IS NOT NULL AND Telefono != ''
                GROUP BY Telefono 
                HAVING COUNT(*) > 1
            ) as dups) as telefonos_duplicados
        FROM Postulantes
    ");
    
    $stats = $stmt->fetch();
    
    if ($stats['sin_telefono'] > 0) {
        echo "⚠ CRÍTICO: Hay {$stats['sin_telefono']} postulantes sin teléfono.\n";
        echo "  Acción: Contactar por correo para solicitar número telefónico.\n\n";
    } else {
        echo "✓ BIEN: Todos los postulantes tienen teléfono registrado.\n\n";
    }
    
    if ($stats['telefonos_duplicados'] > 0) {
        echo "⚠ IMPORTANTE: Hay {$stats['telefonos_duplicados']} teléfonos compartidos por múltiples postulantes.\n";
        echo "  Acción: Revisar cada caso antes de la migración.\n";
        echo "  Opciones:\n";
        echo "    a) Si son personas distintas: Solicitar teléfonos únicos\n";
        echo "    b) Si son duplicados de prueba: Eliminar registros de prueba\n";
        echo "    c) Si es la misma persona: Unificar registros\n\n";
    } else {
        echo "✓ EXCELENTE: No hay teléfonos duplicados.\n\n";
    }
    
    echo "PASOS SIGUIENTES:\n";
    echo "1. Resolver los problemas identificados arriba\n";
    echo "2. Ejecutar nuevamente este script para verificar\n";
    echo "3. Cuando todo esté limpio, ejecutar: 001_create_postulantes_telefonos.sql\n";
    
} catch (PDOException $e) {
    echo "Error al generar recomendaciones: " . $e->getMessage() . "\n";
}
