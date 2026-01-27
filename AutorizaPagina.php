<?php

require_once("Backend/Session/SessionManager.php");
require_once("Backend/Empleados/Empleados.php");

// Verificar que haya sesión activa
SessionManager::requireLogin();

// Páginas que no requieren validación de permisos (todos pueden acceder)
$paginasPublicas = ['MiPerfil.php', 'index.php', 'logout.php'];
$paginaActual = basename($_SERVER['REQUEST_URI']);

if (!in_array($paginaActual, $paginasPublicas)) {
  $Empleados = new Empleados();
  $VerificaPermisoPagina = $Empleados->autorizaPermisoPagina($_SERVER['REQUEST_URI']);

  if ($VerificaPermisoPagina == "0") {
    echo '<meta http-equiv="refresh" content="0;url=index.php">';
  }
}

 ?>

