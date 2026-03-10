<?php

require_once("Backend/Session/SessionManager.php");
require_once("Backend/Empleados/Empleados.php");

// Verificar que haya sesión activa
SessionManager::requireLogin();

// Validación de permisos por puesto
$Empleados = new Empleados();
$VerificaPermisoPagina = $Empleados->autorizaPermisoPagina(basename($_SERVER['REQUEST_URI']));

if ($VerificaPermisoPagina == "0") {
  echo '<meta http-equiv="refresh" content="0;url=index.php">';
}

?>

