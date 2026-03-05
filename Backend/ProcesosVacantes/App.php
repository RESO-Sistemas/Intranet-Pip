<?php
include("ProcesosVacantes.php");

$op = $_POST["op"];
$ProcesosVacantes = new ProcesosVacantes();

// Obtener todos los procesos de vacantes
if ($op == "getProcesosVacantes") {
    echo trim($ProcesosVacantes->getProcesosVacantes());
}

// Obtener solo procesos activos (para combos)
if ($op == "getProcesosVacantesActivos") {
    echo trim($ProcesosVacantes->getProcesosVacantesActivos());
}

// Obtener un proceso por ID
if ($op == "getProcesoVacanteById") {
    $IdProceso = $_POST["IdProceso"];
    echo trim($ProcesosVacantes->getProcesoVacanteById($IdProceso));
}

// Agregar nuevo proceso
if ($op == "addProcesoVacante") {
    $NombreProceso = $_POST["NombreProceso"];
    $Descripcion = $_POST["Descripcion"];
    echo trim($ProcesosVacantes->addProcesoVacante($NombreProceso, $Descripcion));
}

// Actualizar proceso
if ($op == "updateProcesoVacante") {
    $IdProceso = $_POST["IdProceso"];
    $NombreProceso = $_POST["NombreProceso"];
    $Descripcion = $_POST["Descripcion"];
    echo trim($ProcesosVacantes->updateProcesoVacante($IdProceso, $NombreProceso, $Descripcion));
}

// Cambiar estatus (Activar/Desactivar)
if ($op == "toggleEstatusProcesoVacante") {
    $IdProceso = $_POST["IdProceso"];
    echo trim($ProcesosVacantes->toggleEstatusProcesoVacante($IdProceso));
}

// Eliminar proceso
if ($op == "deleteProcesoVacante") {
    $IdProceso = $_POST["IdProceso"];
    echo trim($ProcesosVacantes->deleteProcesoVacante($IdProceso));
}
