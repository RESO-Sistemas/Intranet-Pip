<?php
require_once(__DIR__ . "/../Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();

echo "========================================\n";
echo "  DIAGNÓSTICO Y REPARACIÓN DE PERMISOS\n";
echo "  para my-results.php\n";
echo "========================================\n\n";

// 1. Buscar página en menús existentes
echo "--- 1. BUSCANDO my-results.php EN MENÚS ---\n";
$qMenu = "SELECT * FROM menus WHERE URL LIKE '%my-results%' OR Descripcion LIKE '%Mis resultados%';";
$menuRes = $conn->Select($qMenu);
print_r($menuRes);

// 2. Buscar menús padre disponibles (Id_Padre = 0)
echo "\n--- 2. MENÚS PADRE DISPONIBLES ---\n";
$qPadres = "SELECT id_menu, Descripcion FROM menus WHERE Id_Padre = 0;";
$padresRes = $conn->Select($qPadres);
print_r($padresRes);

// 3. Buscar páginas relacionadas a evaluaciones para ver bajo qué padre están
echo "\n--- 3. PÁGINAS DE EVALUACIONES YA REGISTRADAS ---\n";
$qEvalPages = "SELECT m.id_menu, m.Descripcion, m.URL, m.Id_Padre, mp.Descripcion AS Padre
               FROM menus m
               LEFT JOIN menus mp ON mp.id_menu = m.Id_Padre
               WHERE m.URL IN ('pending-evaluations.php', 'my-subordinates.php',
                               'ListadoEvaluaciones.php', 'Evaluacion.php',
                               'plan-action.php', 'my-action-plans.php',
                               'ResultadosEvaluacion.php', 'Evaluados.php',
                               'add-evaluation.php', 'list-plan-action.php',
                               'questionsEv.php', 'list-competences.php',
                               'Competencias-Evaluacion.php', 'DetalleEvaluacion.php',
                               'publish-evaluation.php', 'ResponderEvaluacion.php')
               ORDER BY m.Id_Padre, m.Descripcion;";
$evalPages = $conn->Select($qEvalPages);
print_r($evalPages);

// 4. Si no existe my-results.php en menús, se procede a insertarlo
echo "\n--- 4. REPARACIÓN ---\n";
if (empty($menuRes)) {
    echo "my-results.php NO está registrado en la tabla menus. Insertando...\n";

    // Determinar el padre: buscar primero "PRINCIPAL", si no, el primer padre disponible
    $idPadre = null;
    $padreNombre = '';
    if (!empty($padresRes)) {
        foreach ($padresRes as $p) {
            if (strtoupper($p['Descripcion']) === 'PRINCIPAL') {
                $idPadre = $p['id_menu'];
                $padreNombre = $p['Descripcion'];
                break;
            }
        }
        if ($idPadre === null) {
            $idPadre = $padresRes[0]['id_menu'];
            $padreNombre = $padresRes[0]['Descripcion'];
        }
    }

    if ($idPadre !== null) {
        echo "Usando menú padre: $padreNombre (id=$idPadre)\n";

        $qInsert = "INSERT INTO menus (Descripcion, Id_Padre, Habilitado, URL, Argumentos)
                     VALUES ('Mis resultados', '$idPadre', 1, 'my-results.php', '');";
        $conn->ExecuteQuery($qInsert, array());
        $newMenuId = $conn->getLastId();
        // Fallback: obtener el id del menú recién insertado
        if (!$newMenuId || $newMenuId == 0) {
            $qGetId = "SELECT id_menu FROM menus WHERE URL = 'my-results.php' LIMIT 1;";
            $idRes = $conn->Select($qGetId);
            if (!empty($idRes)) {
                $newMenuId = $idRes[0]['id_menu'];
            }
        }
        echo "Menú insertado con id_menu = $newMenuId\n";

        // 5. Asignar permisos a TODOS los puestos existentes
        echo "\nAsignando permisos a todos los puestos...\n";
        $qPuestos = "SELECT IdPuesto, Puesto FROM Puestos;";
        $puestosAll = $conn->Select($qPuestos);
        $asignados = 0;
        foreach ($puestosAll as $puesto) {
            $idPuesto = $puesto['IdPuesto'];
            $nombrePuesto = $puesto['Puesto'];
            // Verificar si ya existe el permiso
            $qCheck = "SELECT idMenusPermisos FROM MenusPermisos WHERE id_menu = '$newMenuId' AND IdPuesto = '$idPuesto';";
            $checkRes = $conn->Select($qCheck);
            if (empty($checkRes)) {
                $qInsertPerm = "INSERT INTO MenusPermisos (id_menu, IdPuesto) VALUES ('$newMenuId', '$idPuesto');";
                $conn->ExecuteQuery($qInsertPerm, array());
                echo "  + Permiso asignado a: $nombrePuesto (IdPuesto=$idPuesto)\n";
                $asignados++;
            } else {
                echo "  - Ya existe permiso para: $nombrePuesto (IdPuesto=$idPuesto)\n";
            }
        }
        echo "\nTotal de permisos nuevos asignados: $asignados\n";
        echo "¡LISTO! my-results.php ahora es accesible para todos los puestos.\n";
    } else {
        echo "ERROR: No se encontró ningún menú padre. No se puede insertar.\n";
    }
} else {
    echo "my-results.php YA existe en la tabla menus.\n";

    // Verificar permisos existentes y asignar a TODOS los puestos faltantes
    if (!empty($menuRes)) {
        $existingId = $menuRes[0]['id_menu'];
        echo "id_menu = $existingId\n";

        // Obtener todos los puestos
        $qPuestos = "SELECT IdPuesto, Puesto FROM Puestos;";
        $puestosAll = $conn->Select($qPuestos);

        // Obtener puestos que YA tienen permiso
        $qPerm = "SELECT IdPuesto FROM MenusPermisos WHERE id_menu = '$existingId';";
        $permRes = $conn->Select($qPerm);
        $puestosConPermiso = array_column($permRes, 'IdPuesto');
        echo "Puestos con permiso actual: " . count($puestosConPermiso) . "\n";

        // Asignar permisos a los puestos que NO lo tienen
        echo "\nAsignando permisos a puestos faltantes...\n";
        $asignados = 0;
        foreach ($puestosAll as $puesto) {
            $idPuesto = $puesto['IdPuesto'];
            $nombrePuesto = $puesto['Puesto'];
            if (!in_array($idPuesto, $puestosConPermiso)) {
                $qInsertPerm = "INSERT INTO MenusPermisos (id_menu, IdPuesto) VALUES ('$existingId', '$idPuesto');";
                $conn->ExecuteQuery($qInsertPerm, array());
                echo "  + Permiso asignado a: $nombrePuesto (IdPuesto=$idPuesto)\n";
                $asignados++;
            }
        }
        echo "\nTotal de permisos nuevos asignados: $asignados\n";
        echo "¡LISTO! my-results.php ahora es accesible para todos los puestos.\n";
    }
}

echo "\n========================================\n";
echo "  DIAGNÓSTICO COMPLETADO\n";
echo "========================================\n";
?>
