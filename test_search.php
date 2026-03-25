<?php
require_once("Backend/Checklists/Checklists.php");
$obj = new Checklists();

$fIni = "2026-03-24"; // Ayer
$fFin = "2026-03-24";

echo "Probando rango: $fIni al $fFin\n";
$res = json_decode($obj->getListadoChecklistDiarios($fIni, $fFin), true);

if ($res['Resultado']) {
    echo "Total registros encontrados: " . count($res['Data']) . "\n";
    print_r($res['Data']);
} else {
    echo "Error: " . $res['Msg'] . "\n";
}
?>
