<?php
include("Sucursal.php");
$Sucursal = new Sucursal();
$op = $_POST["op"];

if ($op == "getSucursales") {
  echo trim($Sucursal->getSucursales());
}

if ($op == "getSucursalesXDivision") {
  $IdDivision = $_POST["IdDivision"];
  echo trim($Sucursal->getSucursalesXDivision($IdDivision));
}

if ($op == "getListSucursalPorDivision") {
  $IdDivision = $_POST["IdDivision"];
  echo trim($Sucursal->getListSucursalPorDivision($IdDivision));
}

if ($op == "getAllBranchesPerDiv") {
  $div = $_POST["div"];
  echo trim($Sucursal->getAllBranchesPerDiv($div));
}
 ?>
