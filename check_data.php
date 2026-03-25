<?php
require_once("Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();

$q = "SELECT DATE(HoraRevision) as Fecha, COUNT(*) as Total 
      FROM ChecklistEmpleados 
      GROUP BY DATE(HoraRevision) 
      ORDER BY Fecha DESC 
      LIMIT 10";

$res = $conn->Select($q);
echo "Registros por fecha:\n";
print_r($res);
?>
