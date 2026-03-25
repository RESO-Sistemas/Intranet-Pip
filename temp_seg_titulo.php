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
    DROP TABLE IF EXISTS Incidencias_Seguimiento;
    CREATE TABLE Incidencias_Seguimiento (
        IdSeguimiento INT AUTO_INCREMENT PRIMARY KEY,
        IdIncidencia INT NOT NULL,
        Titulo VARCHAR(255) NOT NULL,
        Mensaje TEXT NOT NULL,
        FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (IdIncidencia) REFERENCES Incidencias(IdIncidencia)
    );

    DROP PROCEDURE IF EXISTS spAddSeguimientoIncidencia;
    CREATE PROCEDURE spAddSeguimientoIncidencia(
        IN p_IdIncidencia INT,
        IN p_Titulo VARCHAR(255),
        IN p_Mensaje TEXT
    )
    BEGIN
        INSERT INTO Incidencias_Seguimiento (IdIncidencia, Titulo, Mensaje)
        VALUES (p_IdIncidencia, p_Titulo, p_Mensaje);
    END;

    DROP PROCEDURE IF EXISTS spGetSeguimientoIncidencia;
    CREATE PROCEDURE spGetSeguimientoIncidencia(
        IN p_IdIncidencia INT
    )
    BEGIN
        SELECT 
            IdSeguimiento,
            IdIncidencia,
            Titulo,
            Mensaje,
            FechaRegistro
        FROM Incidencias_Seguimiento
        WHERE IdIncidencia = p_IdIncidencia
        ORDER BY FechaRegistro DESC;
    END;
    ";
    
    $dbh->exec($sql);
    echo "SUCCESS: Tabla y procedimientos de seguimiento actualizados para incluir Titulo.\n";

} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
?>
