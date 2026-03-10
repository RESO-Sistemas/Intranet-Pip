<?php
include("Vacantes.php");

$op = $_POST["op"];
$Vacantes = new Vacantes();

// ==========================================
// CRUD PRINCIPAL DE VACANTES
// ==========================================

// Obtener todas las vacantes
if ($op == "getVacantes") {
    echo trim($Vacantes->getVacantes());
}

// Obtener vacantes publicadas (para portal público)
if ($op == "getVacantesPublicadas") {
    echo trim($Vacantes->getVacantesPublicadas());
}

// Obtener una vacante por ID
if ($op == "getVacanteById") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Vacantes->getVacanteById($IdVacante));
}

// Agregar nueva vacante
if ($op == "addVacante") {
    $NombreVacante = $_POST["NombreVacante"];
    $IdAreaTecnica = isset($_POST["IdAreaTecnica"]) ? $_POST["IdAreaTecnica"] : null;
    $IdPuesto = isset($_POST["IdPuesto"]) ? $_POST["IdPuesto"] : null;
    $TipoContratacion = $_POST["TipoContratacion"];
    $IdSucursal = isset($_POST["IdSucursal"]) ? $_POST["IdSucursal"] : null;
    $DescripcionPuesto = isset($_POST["DescripcionPuesto"]) ? $_POST["DescripcionPuesto"] : '';
    $SalarioMinimo = isset($_POST["SalarioMinimo"]) ? $_POST["SalarioMinimo"] : null;
    $SalarioMaximo = isset($_POST["SalarioMaximo"]) ? $_POST["SalarioMaximo"] : null;
    $FechaApertura = $_POST["FechaApertura"];
    $FechaCierre = isset($_POST["FechaCierre"]) ? $_POST["FechaCierre"] : null;
    $BanderaCV = isset($_POST["BanderaCV"]) ? $_POST["BanderaCV"] : 0;
    $BanderaSE = isset($_POST["BanderaSE"]) ? $_POST["BanderaSE"] : 0;
    
    echo trim($Vacantes->addVacante($NombreVacante, $IdAreaTecnica, $IdPuesto, $TipoContratacion,
              $IdSucursal, $DescripcionPuesto, $SalarioMinimo, $SalarioMaximo,
              $FechaApertura, $FechaCierre, $BanderaCV, $BanderaSE));
}

// Actualizar vacante
if ($op == "updateVacante") {
    $IdVacante = $_POST["IdVacante"];
    $NombreVacante = $_POST["NombreVacante"];
    $IdAreaTecnica = isset($_POST["IdAreaTecnica"]) ? $_POST["IdAreaTecnica"] : null;
    $IdPuesto = isset($_POST["IdPuesto"]) ? $_POST["IdPuesto"] : null;
    $TipoContratacion = $_POST["TipoContratacion"];
    $IdSucursal = isset($_POST["IdSucursal"]) ? $_POST["IdSucursal"] : null;
    $DescripcionPuesto = isset($_POST["DescripcionPuesto"]) ? $_POST["DescripcionPuesto"] : '';
    $SalarioMinimo = isset($_POST["SalarioMinimo"]) ? $_POST["SalarioMinimo"] : null;
    $SalarioMaximo = isset($_POST["SalarioMaximo"]) ? $_POST["SalarioMaximo"] : null;
    $FechaApertura = $_POST["FechaApertura"];
    $FechaCierre = isset($_POST["FechaCierre"]) ? $_POST["FechaCierre"] : null;
    $BanderaCV = isset($_POST["BanderaCV"]) ? $_POST["BanderaCV"] : 0;
    $BanderaSE = isset($_POST["BanderaSE"]) ? $_POST["BanderaSE"] : 0;
    
    echo trim($Vacantes->updateVacante($IdVacante, $NombreVacante, $IdAreaTecnica, $IdPuesto, $TipoContratacion,
              $IdSucursal, $DescripcionPuesto, $SalarioMinimo, $SalarioMaximo,
              $FechaApertura, $FechaCierre, $BanderaCV, $BanderaSE));
}

// Cambiar estatus de vacante
if ($op == "cambiarEstatusVacante") {
    $IdVacante = $_POST["IdVacante"];
    $NuevoEstatus = $_POST["NuevoEstatus"];
    echo trim($Vacantes->cambiarEstatusVacante($IdVacante, $NuevoEstatus));
}

// Publicar vacante
if ($op == "publicarVacante") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Vacantes->publicarVacante($IdVacante));
}

// Eliminar vacante
if ($op == "deleteVacante") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Vacantes->deleteVacante($IdVacante));
}

// ==========================================
// REQUISITOS DE VACANTES
// ==========================================

if ($op == "getRequisitosVacante") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Vacantes->getRequisitosVacante($IdVacante));
}

if ($op == "addRequisitoVacante") {
    $IdVacante = $_POST["IdVacante"];
    $Requisito = $_POST["Requisito"];
    $Orden = isset($_POST["Orden"]) ? $_POST["Orden"] : 0;
    echo trim($Vacantes->addRequisitoVacante($IdVacante, $Requisito, $Orden));
}

if ($op == "deleteRequisitoVacante") {
    $IdVacanteRequisito = $_POST["IdVacanteRequisito"];
    echo trim($Vacantes->deleteRequisitoVacante($IdVacanteRequisito));
}

// ==========================================
// EVALUACIONES DE VACANTES
// ==========================================

if ($op == "getEvaluacionesVacante") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Vacantes->getEvaluacionesVacante($IdVacante));
}

if ($op == "addEvaluacionVacante") {
    $IdVacante = $_POST["IdVacante"];
    $IdEvaluacion = $_POST["IdEvaluacion"];
    $IdProceso = $_POST["IdProceso"];
    echo trim($Vacantes->addEvaluacionVacante($IdVacante, $IdEvaluacion, $IdProceso));
}

if ($op == "deleteEvaluacionVacante") {
    $IdVacanteEvaluacion = $_POST["IdVacanteEvaluacion"];
    echo trim($Vacantes->deleteEvaluacionVacante($IdVacanteEvaluacion));
}

// ==========================================
// INDUCCIONES DE VACANTES
// ==========================================

if ($op == "getInduccionesVacante") {
    $IdVacante = $_POST["IdVacante"];
    echo trim($Vacantes->getInduccionesVacante($IdVacante));
}

if ($op == "addInduccionVacante") {
    $IdVacante = $_POST["IdVacante"];
    $IdInduccion = $_POST["IdInduccion"];
    echo trim($Vacantes->addInduccionVacante($IdVacante, $IdInduccion));
}

if ($op == "deleteInduccionVacante") {
    $IdVacanteInduccion = $_POST["IdVacanteInduccion"];
    echo trim($Vacantes->deleteInduccionVacante($IdVacanteInduccion));
}

// ==========================================
// FUNCIONES AUXILIARES PARA COMBOS
// ==========================================

if ($op == "getAreasTecnicasActivas") {
    echo trim($Vacantes->getAreasTecnicasActivas());
}

if ($op == "getPuestosActivos") {
    echo trim($Vacantes->getPuestosActivos());
}

if ($op == "getSucursalesActivas") {
    echo trim($Vacantes->getSucursalesActivas());
}

if ($op == "getProcesosVacantesActivos") {
    echo trim($Vacantes->getProcesosVacantesActivos());
}

if ($op == "getEvaluacionesActivas") {
    echo trim($Vacantes->getEvaluacionesActivas());
}

if ($op == "getInduccionesActivas") {
    echo trim($Vacantes->getInduccionesActivas());
}
