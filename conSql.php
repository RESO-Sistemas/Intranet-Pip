<?php
// // Parámetros de conexión
// $serverName = "26.13.187.59"; // o IP, o nombre de servidor\instancia
// $connectionOptions = [
//     "Database" => "MAXAdmin",
//     "Uid" => "sa",
//     "PWD" => "RESO2908trc"
// ];
//
// // Intentar conexión
// $conn = sqlsrv_connect($serverName, $connectionOptions);
//
// if ($conn === false) {
//     die(print_r(sqlsrv_errors(), true));
// }
//
// // Consulta
// $sql = "SELECT * FROM Notas";
// $stmt = sqlsrv_query($conn, $sql);
//
// if ($stmt === false) {
//     die(print_r(sqlsrv_errors(), true));
// }
//
// // Mostrar resultados
// while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
//     print_r($row);
//     echo "<br>";
// }
//
// // Cerrar conexión
// sqlsrv_free_stmt($stmt);
// sqlsrv_close($conn);

phpinfo();

?>
