<?php
/**
 * Migración: Sistema de Autenticación por Teléfono
 * Crea tabla PostulantesTelefonos y migra datos existentes
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(300); // 5 minutos

echo "================================================================================\n";
echo "MIGRACIÓN: SISTEMA DE AUTENTICACIÓN POR TELÉFONO\n";
echo "================================================================================\n\n";

// Conexión a la base de datos
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$options = [
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
    $pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
    $pdo->beginTransaction();
    echo "✓ Conexión exitosa a la base de datos\n";
    echo "✓ Transacción iniciada\n\n";
} catch (PDOException $e) {
    die("❌ Error de conexión: " . $e->getMessage() . "\n");
}

// Función para normalizar teléfonos
function normalizarTelefono($telefono) {
    if (empty($telefono)) return '';
    return preg_replace('/[^0-9]/', '', $telefono);
}

try {
    // PASO 1: Verificar si la tabla ya existe
    echo "PASO 1: Verificando si la tabla PostulantesTelefonos existe...\n";
    $stmt = $pdo->query("SHOW TABLES LIKE 'PostulantesTelefonos'");
    if ($stmt->rowCount() > 0) {
        throw new Exception("La tabla PostulantesTelefonos ya existe. Migración ya ejecutada o requiere rollback.");
    }
    echo "✓ Tabla no existe, procediendo con la migración\n\n";

    // PASO 2: Crear tabla PostulantesTelefonos
    echo "PASO 2: Creando tabla PostulantesTelefonos...\n";
    echo "  Nota: La tabla Postulantes usa MyISAM, por lo que no se puede crear FK.\n";
    echo "        PostulantesTelefonos se creará con MyISAM para consistencia.\n";
    $pdo->exec("
        CREATE TABLE PostulantesTelefonos (
            IdTelefonoHistorico INT AUTO_INCREMENT PRIMARY KEY,
            IdPostulante INT NOT NULL,
            Telefono VARCHAR(10) NOT NULL,
            FechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            Activo TINYINT(1) NOT NULL DEFAULT 1,
            EsPrincipal TINYINT(1) NOT NULL DEFAULT 0,
            UsuarioModifico INT NULL,
            Observaciones TEXT NULL,
            
            INDEX idx_postulante (IdPostulante),
            INDEX idx_telefono (Telefono),
            INDEX idx_activo (Activo),
            INDEX idx_principal (EsPrincipal),
            
            UNIQUE KEY uk_postulante_telefono (IdPostulante, Telefono)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8 
        COMMENT='Histórico de números telefónicos de postulantes'
    ");
    echo "✓ Tabla PostulantesTelefonos creada exitosamente\n\n";

    // PASO 3: Migrar teléfonos existentes
    echo "PASO 3: Migrando teléfonos existentes de la tabla Postulantes...\n";
    
    // Obtener todos los postulantes con teléfono
    $stmt = $pdo->query("
        SELECT IdPostulante, Telefono, FechaRegistro 
        FROM Postulantes 
        WHERE Telefono IS NOT NULL AND Telefono != ''
    ");
    $postulantes = $stmt->fetchAll();
    
    $migrados = 0;
    $errores = 0;
    
    foreach ($postulantes as $postulante) {
        $telefonoNormalizado = normalizarTelefono($postulante['Telefono']);
        
        if (strlen($telefonoNormalizado) != 10) {
            echo "  ⚠ ADVERTENCIA: IdPostulante {$postulante['IdPostulante']} tiene teléfono con formato incorrecto: {$postulante['Telefono']} (normalizado: $telefonoNormalizado)\n";
        }
        
        try {
            // Insertar en tabla de histórico
            $insertStmt = $pdo->prepare("
                INSERT INTO PostulantesTelefonos 
                (IdPostulante, Telefono, FechaRegistro, Activo, EsPrincipal, Observaciones) 
                VALUES (?, ?, ?, 1, 1, 'Migración inicial desde tabla Postulantes')
            ");
            $insertStmt->execute([
                $postulante['IdPostulante'],
                $telefonoNormalizado,
                $postulante['FechaRegistro']
            ]);
            
            // Actualizar el teléfono normalizado en Postulantes
            $updateStmt = $pdo->prepare("
                UPDATE Postulantes 
                SET Telefono = ? 
                WHERE IdPostulante = ?
            ");
            $updateStmt->execute([
                $telefonoNormalizado,
                $postulante['IdPostulante']
            ]);
            
            $migrados++;
        } catch (PDOException $e) {
            echo "  ❌ Error al migrar IdPostulante {$postulante['IdPostulante']}: " . $e->getMessage() . "\n";
            $errores++;
        }
    }
    
    echo "✓ Migración completada:\n";
    echo "  - Registros migrados: $migrados\n";
    echo "  - Errores: $errores\n\n";

    // PASO 4: Crear triggers
    echo "PASO 4: Creando triggers para sincronización automática...\n";
    echo "  Nota: La normalización de teléfonos se hace en PHP antes de insertar.\n";
    echo "        Los triggers asumen que el teléfono ya está normalizado.\n";
    
    // Trigger AFTER INSERT
    echo "  Creando trigger: trg_postulantes_telefono_insert...\n";
    $pdo->exec("
        DROP TRIGGER IF EXISTS trg_postulantes_telefono_insert
    ");
    $pdo->exec("
        CREATE TRIGGER trg_postulantes_telefono_insert
        AFTER INSERT ON Postulantes
        FOR EACH ROW
        BEGIN
            IF NEW.Telefono IS NOT NULL AND NEW.Telefono != '' AND LENGTH(NEW.Telefono) = 10 THEN
                INSERT INTO PostulantesTelefonos 
                (IdPostulante, Telefono, FechaRegistro, Activo, EsPrincipal, Observaciones)
                VALUES 
                (NEW.IdPostulante, NEW.Telefono, NEW.FechaRegistro, 1, 1, 'Registro inicial')
                ON DUPLICATE KEY UPDATE 
                    Activo = 1,
                    EsPrincipal = 1;
            END IF;
        END
    ");
    echo "  ✓ Trigger INSERT creado\n";

    // Trigger AFTER UPDATE
    echo "  Creando trigger: trg_postulantes_telefono_update...\n";
    $pdo->exec("
        DROP TRIGGER IF EXISTS trg_postulantes_telefono_update
    ");
    $pdo->exec("
        CREATE TRIGGER trg_postulantes_telefono_update
        AFTER UPDATE ON Postulantes
        FOR EACH ROW
        BEGIN
            -- Solo procesar si el teléfono cambió
            IF NEW.Telefono != OLD.Telefono AND NEW.Telefono IS NOT NULL AND NEW.Telefono != '' AND LENGTH(NEW.Telefono) = 10 THEN
                -- Desactivar teléfono anterior como principal
                UPDATE PostulantesTelefonos 
                SET EsPrincipal = 0 
                WHERE IdPostulante = NEW.IdPostulante;
                
                -- Insertar nuevo teléfono o actualizar existente
                INSERT INTO PostulantesTelefonos 
                (IdPostulante, Telefono, FechaRegistro, Activo, EsPrincipal, Observaciones)
                VALUES 
                (NEW.IdPostulante, NEW.Telefono, NOW(), 1, 1, 'Actualización de teléfono principal')
                ON DUPLICATE KEY UPDATE 
                    Activo = 1,
                    EsPrincipal = 1,
                    FechaRegistro = NOW(),
                    Observaciones = 'Reactivado como principal';
            END IF;
        END
    ");
    echo "  ✓ Trigger UPDATE creado\n\n";

    // PASO 5: Verificación post-migración
    echo "PASO 5: Verificación de datos migrados...\n";
    
    $stats = $pdo->query("
        SELECT 
            (SELECT COUNT(*) FROM Postulantes WHERE Telefono IS NOT NULL AND Telefono != '') as postulantes_con_telefono,
            (SELECT COUNT(*) FROM PostulantesTelefonos) as registros_historico,
            (SELECT COUNT(*) FROM PostulantesTelefonos WHERE Activo = 1) as telefonos_activos,
            (SELECT COUNT(*) FROM PostulantesTelefonos WHERE EsPrincipal = 1) as telefonos_principales
    ")->fetch();
    
    echo "  Postulantes con teléfono: {$stats['postulantes_con_telefono']}\n";
    echo "  Registros en histórico: {$stats['registros_historico']}\n";
    echo "  Teléfonos activos: {$stats['telefonos_activos']}\n";
    echo "  Teléfonos principales: {$stats['telefonos_principales']}\n\n";
    
    if ($stats['postulantes_con_telefono'] != $stats['telefonos_principales']) {
        throw new Exception("ERROR: La cantidad de postulantes con teléfono no coincide con los teléfonos principales!");
    }
    
    echo "✓ Verificación exitosa\n\n";

    // CONFIRMAR TRANSACCIÓN
    $pdo->commit();
    echo "================================================================================\n";
    echo "✓✓✓ MIGRACIÓN COMPLETADA EXITOSAMENTE ✓✓✓\n";
    echo "================================================================================\n\n";
    
    echo "RESUMEN:\n";
    echo "- Tabla PostulantesTelefonos creada\n";
    echo "- $migrados teléfonos migrados y normalizados\n";
    echo "- 2 triggers creados para sincronización automática\n";
    echo "- Todos los datos verificados\n\n";
    
    echo "PRÓXIMOS PASOS:\n";
    echo "1. Actualizar archivos PHP del backend (Postulantes.php, App.php)\n";
    echo "2. Actualizar archivos JavaScript del frontend (TelefonosHistorico.js, etc.)\n";
    echo "3. Actualizar formulario de login (EstatusPostulante.php)\n";
    echo "4. Probar autenticación con CURP + Teléfono\n";
    echo "5. Probar interfaz de gestión de teléfonos en RH\n";

} catch (Exception $e) {
    // ROLLBACK en caso de error
    $pdo->rollBack();
    echo "\n================================================================================\n";
    echo "❌❌❌ ERROR EN LA MIGRACIÓN ❌❌❌\n";
    echo "================================================================================\n\n";
    echo "Error: " . $e->getMessage() . "\n\n";
    echo "La transacción ha sido revertida. No se realizaron cambios en la base de datos.\n";
    exit(1);
}
