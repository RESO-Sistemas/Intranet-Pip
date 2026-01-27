<?php
require_once("Backend/Session/SessionManager.php");

// Cerrar sesión usando SessionManager
SessionManager::logout();

echo '<meta http-equiv="refresh" content="0;url=login.php" />';
 ?>
