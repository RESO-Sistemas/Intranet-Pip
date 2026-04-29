<?php
include(__DIR__ . "/ProcesosVacantesIbero.php");
$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");
$PV = new ProcesosVacantesIbero();

if ($op == "getProcesosActivos")         { echo trim($PV->getProcesosActivos()); }
if ($op == "addProceso")                 { echo trim($PV->addProceso($_POST["NombreProceso"], $_POST["Descripcion"]??"")); }
if ($op == "deleteProceso")              { echo trim($PV->deleteProceso($_POST["IdProceso"])); }
?>
