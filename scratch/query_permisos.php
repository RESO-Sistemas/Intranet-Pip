<?php
require_once(__DIR__ . "/../Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();

echo "--- BUSCANDO MENU MI PERFIL ---\n";
$qMenu = "SELECT * FROM menus WHERE URL LIKE '%MiPerfil.php%' OR Descripcion LIKE '%perfil%';";
$menuRes = $conn->Select($qMenu);
print_r($menuRes);

if (!empty($menuRes)) {
    $idMenu = $menuRes[0]['id_menu'];
    echo "\n--- PERMISOS ASOCIADOS EN MenusPermisos PARA ID_MENU = $idMenu ---\n";
    $qPermisos = "SELECT MP.*, P.Puesto FROM MenusPermisos MP 
                  LEFT JOIN Puestos P ON P.IdPuesto = MP.IdPuesto 
                  WHERE MP.id_menu = '$idMenu';";
    $permisosRes = $conn->Select($qPermisos);
    print_r($permisosRes);
} else {
    echo "\nNo se encontró el menú MiPerfil.php en la tabla menus.\n";
}

echo "\n--- TODOS LOS PUESTOS DISPONIBLES EN LA BD ---\n";
$qPuestos = "SELECT IdPuesto, Puesto FROM Puestos LIMIT 20;";
$puestosRes = $conn->Select($qPuestos);
print_r($puestosRes);
?>
