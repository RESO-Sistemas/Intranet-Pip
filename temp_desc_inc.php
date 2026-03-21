<?php
require_once("Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();
$res = $conn->Select("DESCRIBE Incidencias;");
print_r($res);
?>
