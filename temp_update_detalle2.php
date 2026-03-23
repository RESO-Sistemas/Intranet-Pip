<?php
$dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
$options = [
	PDO::ATTR_EMULATE_PREPARES   => true,
	PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
	$dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
    $sql = "
    DROP PROCEDURE IF EXISTS `spGetDetalleIncidencia`;
    CREATE PROCEDURE `spGetDetalleIncidencia`(IN p_id INT)
    BEGIN
        SELECT 
            i.IdIncidencia,
            i.IdChecklist,
            i.IdTipoIncidencia,
            i.NoEmpleado,
            i.Descripcion,
            i.Evidencia,
            i.FechaRegistro,
            IFNULL(i.Estado, 'Abierta') AS Estado,
            i.FechaResuelto,
            i.NoEmpleadoResolutor,
            e.Nombre AS NombreEmpleado,
            p.Puesto,
            ti.Nombre AS TipoIncidencia,
            er.Nombre AS EmpleadoResolutorNombre,
            p_resp.Puesto AS PuestoResponsable
        FROM Incidencias i
        LEFT JOIN Empleados e ON i.NoEmpleado = e.NoEmpleado
        LEFT JOIN Puestos p ON e.IdPuesto = p.IdPuesto
        LEFT JOIN Tipos_Incidencias ti ON i.IdTipoIncidencia = ti.IdTipoIncidencia
        LEFT JOIN Empleados er ON i.NoEmpleadoResolutor = er.NoEmpleado
        LEFT JOIN Puestos p_resp ON ti.IdPuesto = p_resp.IdPuesto
        WHERE i.IdIncidencia = p_id;
    END;
    ";
    $dbh->exec($sql);
    echo "SUCCESS: Procedimiento spGetDetalleIncidencia actualizado para retornar PuestoResponsable.\n";
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
