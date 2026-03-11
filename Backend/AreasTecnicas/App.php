<?php
include("AreasTecnicas.php");

$op = $_POST["op"];
$AreasTecnicas = new AreasTecnicas();

// Obtener todas las áreas técnicas
if ($op == "getAreasTecnicas") {
    echo trim($AreasTecnicas->getAreasTecnicas());
}

// Obtener solo áreas técnicas activas (para combos)
if ($op == "getAreasTecnicasActivas") {
    echo trim($AreasTecnicas->getAreasTecnicasActivas());
}

// Obtener un área técnica por ID
if ($op == "getAreaTecnicaById") {
    $IdAreaTecnica = $_POST["IdAreaTecnica"];
    echo trim($AreasTecnicas->getAreaTecnicaById($IdAreaTecnica));
}

// Agregar nueva área técnica
if ($op == "addAreaTecnica") {
    $NombreArea = $_POST["NombreArea"];
    $Descripcion = $_POST["Descripcion"];
    echo trim($AreasTecnicas->addAreaTecnica($NombreArea, $Descripcion));
}

// Actualizar área técnica
if ($op == "updateAreaTecnica") {
    $IdAreaTecnica = $_POST["IdAreaTecnica"];
    $NombreArea = $_POST["NombreArea"];
    $Descripcion = $_POST["Descripcion"];
    echo trim($AreasTecnicas->updateAreaTecnica($IdAreaTecnica, $NombreArea, $Descripcion));
}

// Cambiar estatus (Activar/Desactivar)
if ($op == "toggleEstatusAreaTecnica") {
    $IdAreaTecnica = $_POST["IdAreaTecnica"];
    echo trim($AreasTecnicas->toggleEstatusAreaTecnica($IdAreaTecnica));
}

// Eliminar área técnica
if ($op == "deleteAreaTecnica") {
    $IdAreaTecnica = $_POST["IdAreaTecnica"];
    echo trim($AreasTecnicas->deleteAreaTecnica($IdAreaTecnica));
}
