<?php
require_once("BolsaTrabajoIbero/Backend/Conexiones/Conexiones.php");
$c = new Conexiones();
try {
    $c->ProcedureExec("ALTER TABLE PreguntasConfiguracionIbero ADD COLUMN RespuestaCorrectaTexto VARCHAR(255) DEFAULT NULL;");
    echo "Added RespuestaCorrectaTexto\n";
} catch(Exception $e) { echo $e->getMessage() . "\n"; }
try {
    $c->ProcedureExec("ALTER TABLE PreguntasConfiguracionIbero ADD COLUMN RespuestaCorrectaRango INT(11) DEFAULT NULL;");
    echo "Added RespuestaCorrectaRango\n";
} catch(Exception $e) { echo $e->getMessage() . "\n"; }
echo "Done.";
?>
