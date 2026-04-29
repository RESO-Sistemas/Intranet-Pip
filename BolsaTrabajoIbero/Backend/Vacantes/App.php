<?php
include(__DIR__ . "/VacantesIbero.php");
$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");
$V = new VacantesIbero();

// Endpoint público sin autenticación
if ($op == "getRequisitosDocumentacionVacantes") { echo trim($V->getRequisitosDocumentacionVacantes()); exit; }

// Vacantes
if ($op == "getVacantes")               { echo trim($V->getVacantes()); }
if ($op == "getVacantesPublicadas")     { echo trim($V->getVacantesPublicadas()); }
if ($op == "getVacanteById")            { echo trim($V->getVacanteById($_POST["IdVacante"])); }
if ($op == "addVacante")                {
    echo trim($V->addVacante($_POST["NombreVacante"], $_POST["IdAreaTecnica"]??null, $_POST["IdPuesto"]??null,
        $_POST["TipoContratacion"], $_POST["IdSucursal"]??null, $_POST["DescripcionPuesto"]??"",
        $_POST["SalarioMinimo"]??null, $_POST["SalarioMaximo"]??null, $_POST["FechaApertura"],
        $_POST["FechaCierre"]??null, $_POST["BanderaCV"]??0, $_POST["BanderaSE"]??0));
}
if ($op == "updateVacante")             {
    echo trim($V->updateVacante($_POST["IdVacante"], $_POST["NombreVacante"], $_POST["IdAreaTecnica"]??null,
        $_POST["IdPuesto"]??null, $_POST["TipoContratacion"], $_POST["IdSucursal"]??null,
        $_POST["DescripcionPuesto"]??"", $_POST["SalarioMinimo"]??null, $_POST["SalarioMaximo"]??null,
        $_POST["FechaApertura"], $_POST["FechaCierre"]??null, $_POST["BanderaCV"]??0, $_POST["BanderaSE"]??0));
}
if ($op == "cambiarEstatusVacante")     { echo trim($V->cambiarEstatusVacante($_POST["IdVacante"], $_POST["NuevoEstatus"])); }
if ($op == "publicarVacante")           { echo trim($V->publicarVacante($_POST["IdVacante"])); }
if ($op == "deleteVacante")             { echo trim($V->deleteVacante($_POST["IdVacante"])); }

// Requisitos
if ($op == "getRequisitosVacante")      { echo trim($V->getRequisitosVacante($_POST["IdVacante"])); }
if ($op == "addRequisitoVacante")       { echo trim($V->addRequisitoVacante($_POST["IdVacante"], $_POST["Requisito"], $_POST["Orden"]??0)); }
if ($op == "deleteRequisitoVacante")    { echo trim($V->deleteRequisitoVacante($_POST["IdVacanteRequisito"])); }

// Evaluaciones
if ($op == "getEvaluacionesVacante")    { echo trim($V->getEvaluacionesVacante($_POST["IdVacante"])); }
if ($op == "addEvaluacionVacante")      { echo trim($V->addEvaluacionVacante($_POST["IdVacante"], $_POST["IdEvaluacion"], $_POST["IdProceso"])); }
if ($op == "deleteEvaluacionVacante")   { echo trim($V->deleteEvaluacionVacante($_POST["IdVacanteEvaluacion"])); }

// Inducciones
if ($op == "getInduccionesVacante")     { echo trim($V->getInduccionesVacante($_POST["IdVacante"])); }
if ($op == "addInduccionVacante")       { echo trim($V->addInduccionVacante($_POST["IdVacante"], $_POST["IdInduccion"])); }
if ($op == "deleteInduccionVacante")    { echo trim($V->deleteInduccionVacante($_POST["IdVacanteInduccion"])); }

// Combos
if ($op == "getAreasTecnicasActivas")   { echo trim($V->getAreasTecnicasActivas()); }
if ($op == "addAreaTecnica")            { echo trim($V->addAreaTecnica($_POST["NombreArea"], $_POST["Descripcion"]??"")); }
if ($op == "getPuestosActivos")         { echo trim($V->getPuestosActivos()); }
if ($op == "getSucursalesActivas")      { echo trim($V->getSucursalesActivas()); }
if ($op == "getProcesosVacantesActivos"){ echo trim($V->getProcesosVacantesActivos()); }
if ($op == "getEvaluacionesActivas")    { echo trim($V->getEvaluacionesActivas()); }
if ($op == "getInduccionesActivas")     { echo trim($V->getInduccionesActivas()); }
?>
