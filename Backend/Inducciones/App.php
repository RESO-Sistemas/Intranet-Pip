<?php
include("Inducciones.php");

$op = $_POST["op"];
$Inducciones = new Inducciones();

// ==========================================
// CRUD PRINCIPAL DE INDUCCIONES
// ==========================================

// Obtener todas las inducciones
if ($op == "getInducciones") {
    echo trim($Inducciones->getInducciones());
}

// Obtener solo inducciones activas (para combos)
if ($op == "getInduccionesActivas") {
    echo trim($Inducciones->getInduccionesActivas());
}

// Obtener una inducción por ID
if ($op == "getInduccionById") {
    $IdInduccion = $_POST["IdInduccion"];
    echo trim($Inducciones->getInduccionById($IdInduccion));
}

// Agregar nueva inducción
if ($op == "addInduccion") {
    $NombreInduccion = $_POST["NombreInduccion"];
    $Descripcion = $_POST["Descripcion"];
    $IdAreaTecnica = $_POST["IdAreaTecnica"];
    $PuestosAplicables = $_POST["PuestosAplicables"];
    $DuracionEstimada = $_POST["DuracionEstimada"];
    echo trim($Inducciones->addInduccion($NombreInduccion, $Descripcion, $IdAreaTecnica, $PuestosAplicables, $DuracionEstimada));
}

// Actualizar inducción
if ($op == "updateInduccion") {
    $IdInduccion = $_POST["IdInduccion"];
    $NombreInduccion = $_POST["NombreInduccion"];
    $Descripcion = $_POST["Descripcion"];
    $IdAreaTecnica = $_POST["IdAreaTecnica"];
    $PuestosAplicables = $_POST["PuestosAplicables"];
    $DuracionEstimada = $_POST["DuracionEstimada"];
    echo trim($Inducciones->updateInduccion($IdInduccion, $NombreInduccion, $Descripcion, $IdAreaTecnica, $PuestosAplicables, $DuracionEstimada));
}

// Cambiar estatus (Activar/Desactivar)
if ($op == "toggleEstatusInduccion") {
    $IdInduccion = $_POST["IdInduccion"];
    echo trim($Inducciones->toggleEstatusInduccion($IdInduccion));
}

// Eliminar inducción
if ($op == "deleteInduccion") {
    $IdInduccion = $_POST["IdInduccion"];
    echo trim($Inducciones->deleteInduccion($IdInduccion));
}

// ==========================================
// GESTIÓN DE MATERIALES
// ==========================================

// Agregar material (archivo)
if ($op == "addMaterial") {
    $IdInduccion = $_POST["IdInduccion"];
    $archivo = $_FILES["archivo"];
    echo trim($Inducciones->addMaterial($IdInduccion, $archivo));
}

// Obtener materiales de una inducción
if ($op == "getMateriales") {
    $IdInduccion = $_POST["IdInduccion"];
    echo trim($Inducciones->getMateriales($IdInduccion));
}

// Eliminar material
if ($op == "deleteMaterial") {
    $IdMaterial = $_POST["IdMaterial"];
    echo trim($Inducciones->deleteMaterial($IdMaterial));
}

// ==========================================
// GESTIÓN DE AUDIOVISUAL
// ==========================================

// Agregar enlace audiovisual
if ($op == "addAudiovisual") {
    $IdInduccion = $_POST["IdInduccion"];
    $TituloVideo = $_POST["TituloVideo"];
    $EnlaceExterno = $_POST["EnlaceExterno"];
    $Plataforma = $_POST["Plataforma"];
    echo trim($Inducciones->addAudiovisual($IdInduccion, $TituloVideo, $EnlaceExterno, $Plataforma));
}

// Obtener audiovisuales de una inducción
if ($op == "getAudiovisuales") {
    $IdInduccion = $_POST["IdInduccion"];
    echo trim($Inducciones->getAudiovisuales($IdInduccion));
}

// Eliminar audiovisual
if ($op == "deleteAudiovisual") {
    $IdAudiovisual = $_POST["IdAudiovisual"];
    echo trim($Inducciones->deleteAudiovisual($IdAudiovisual));
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

// Obtener puestos para Select2
if ($op == "getPuestosParaSelect") {
    echo trim($Inducciones->getPuestosParaSelect());
}

// Obtener áreas técnicas para Select
if ($op == "getAreasTecnicasParaSelect") {
    echo trim($Inducciones->getAreasTecnicasParaSelect());
}
