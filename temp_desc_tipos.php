<?php
require_once("Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();
$res = $conn->Select("DESCRIBE Tipos_Incidencias;");
print_r($res);
?>
