<?php
header('Content-Type: application/json; charset=utf-8');
include(__DIR__ . "/EmpresasIbero.php");
$op = isset($_POST["op"]) ? $_POST["op"] : (isset($_GET["op"]) ? $_GET["op"] : "");
$E = new EmpresasIbero();

if ($op == "getEmpresas")      { echo trim($E->getEmpresas()); exit; }
if ($op == "getEmpresaById")   { echo trim($E->getEmpresaById($_POST["IdEmpresa"] ?? $_GET["IdEmpresa"] ?? "")); exit; }
if ($op == "addEmpresa")       { echo trim($E->addEmpresa($_POST["NombreEmpresa"] ?? "", $_POST["Descripcion"] ?? "")); exit; }
if ($op == "updateEmpresa")    { echo trim($E->updateEmpresa($_POST["IdEmpresa"] ?? "", $_POST["NombreEmpresa"] ?? "", $_POST["Descripcion"] ?? "", $_POST["Estatus"] ?? 1)); exit; }
if ($op == "deleteEmpresa")    { echo trim($E->deleteEmpresa($_POST["IdEmpresa"] ?? "")); exit; }

echo json_encode(["Resultado"=>false,"Msg"=>"Operación no válida."]);
?>
