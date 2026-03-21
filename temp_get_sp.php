<?php
require_once("Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();
$res = $conn->Select("SHOW CREATE PROCEDURE spGetKpisDashboard");
print_r($res);
?>
