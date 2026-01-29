<?php
require_once("Backend/Session/SessionManager.php");

// Cerrar sesión usando SessionManager
SessionManager::logout();

// Redirigir inmediatamente sin crear nueva sesión
header("Location: login.php");
exit();
?>
