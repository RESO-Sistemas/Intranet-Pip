<?php
if (file_exists(__DIR__ . "/../Conexiones/Conexiones.php")) {
    require_once(__DIR__ . "/../Conexiones/Conexiones.php");
}

class ProcesosVacantesIbero extends Conexiones
{
    function getProcesosActivos() {
        $r = $this->Select("SELECT IdProceso, NombreProceso, Descripcion, Estatus FROM ProcesosVacantesIbero ORDER BY IdProceso ASC");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$r]);
    }

    function addProceso($NombreProceso, $Descripcion="") {
        $n = $this->sanitize($NombreProceso);
        $d = $this->sanitize($Descripcion);
        $check = $this->Select("SELECT IdProceso FROM ProcesosVacantesIbero WHERE NombreProceso='$n' LIMIT 1");
        if (!empty($check)) return json_encode(["Resultado"=>false,"Msg"=>"El proceso ya existe."]);
        $id = $this->InsertAndGetId("INSERT INTO ProcesosVacantesIbero (NombreProceso,Descripcion,Estatus) VALUES ('$n','$d',1)");
        if ($id) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Proceso registrado.","IdProceso"=>$id]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error al registrar."]);
    }

    function deleteProceso($IdProceso) {
        $id = intval($IdProceso);
        $this->ProcedureExec("DELETE FROM ProcesosVacantesIbero WHERE IdProceso=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Proceso eliminado."]);
    }
}
?>
