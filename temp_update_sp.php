<?php
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$options = [
	PDO::ATTR_EMULATE_PREPARES   => true,
	PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
	$dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);

    $sqlDrop = "DROP PROCEDURE IF EXISTS `spGetKpisDashboard`;";
    $dbh->exec($sqlDrop);

    $sqlCreate = "
    CREATE PROCEDURE `spGetKpisDashboard`(
      IN p_IdPuesto INT,
      IN p_NoEmpleado VARCHAR(20)
    )
    BEGIN
      SELECT 
        k.IdKpi,
        k.Nombre AS NombreKpi,
        COUNT(c.IdChecklist) AS TotalChecklists,
        SUM(CASE WHEN ce.IdChecklistEmpleado IS NOT NULL AND ce.Respuesta = c.RespuestaEsperada THEN 1 ELSE 0 END) AS ChecklistsCumplidos,
        SUM(CASE WHEN ce.IdChecklistEmpleado IS NOT NULL THEN 1 ELSE 0 END) AS ChecklistsRespondidos
      FROM Kpis k
      INNER JOIN Checklists c ON c.IdKpi = k.IdKpi AND c.IdPuesto = p_IdPuesto
      LEFT JOIN ChecklistEmpleados ce 
        ON ce.IdChecklist = c.IdChecklist 
        AND ce.NoEmpleado = p_NoEmpleado
        AND DATE(ce.HoraRevision) = CURDATE()
      WHERE k.Activo = 1
      GROUP BY k.IdKpi, k.Nombre
      HAVING TotalChecklists > 0
      ORDER BY k.Nombre ASC;
    END;
    ";
    
    $dbh->exec($sqlCreate);
    echo "SUCCESS: Procedimiento spGetKpisDashboard actualizado correctamente.\n";

} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
