<?php
require_once("../Conexiones/Conexiones.php");
class Incidencias extends Conexiones {
    public function registrarIncidencia($descripcion, $evidencia, $noEmpleado) {
        $q = "INSERT INTO Incidencias (Descripcion, Evidencia, NoEmpleado, FechaRegistro) VALUES (?, ?, ?, NOW())";
        $parametros = [$descripcion, $evidencia, $noEmpleado];
        return $this->ProcedureExec($q, $parametros);
    }
}
