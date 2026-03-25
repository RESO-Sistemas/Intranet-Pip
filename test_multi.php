<?php
require_once("Backend/Checklists/Checklists.php");
$obj = new Checklists();

$fIni = "2026-03-24";
$fFin = "2026-03-25";

echo "Probando rango: $fIni al $fFin\n";
$res = json_decode($obj->getListadoChecklistDiarios($fIni, $fFin), true);

if ($res['Resultado']) {
    echo "Total registros encontrados: " . count($res['Data']) . "\n";
    foreach ($res['Data'] as $i => $row) {
        echo "Row $i: " . $row['NombreEmpleado'] . " - " . $row['Fecha'] . " - " . $row['HoraRevision'] . "\n";
    }
} else {
    echo "Error: " . $res['Msg'] . "\n";
}
?>
