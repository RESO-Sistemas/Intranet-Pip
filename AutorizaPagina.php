<?php

require_once("Backend/Session/SessionManager.php");
require_once("Backend/Empleados/Empleados.php");

// Verificar que haya sesión activa
SessionManager::requireLogin();

$currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$currentPage = basename($currentPath);

// Mis resultados, plan de accion y listado de planes deben estar disponibles para cualquier empleado con sesion activa.
if ($currentPage === 'my-results.php' || $currentPage === 'plan-action.php' || $currentPage === 'list-plan-action.php') {
  return;
}

// Validación de permisos por puesto
$Empleados = new Empleados();
$VerificaPermisoPagina = $Empleados->autorizaPermisoPagina($currentPage);

if ($VerificaPermisoPagina == "0") {
  echo '<meta http-equiv="refresh" content="0;url=index.php">';
  exit();
}

?>
