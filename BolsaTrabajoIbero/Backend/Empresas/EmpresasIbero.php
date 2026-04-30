<?php
if (file_exists(__DIR__ . "/../Conexiones/Conexiones.php")) {
    require_once(__DIR__ . "/../Conexiones/Conexiones.php");
}

class EmpresasIbero extends Conexiones
{
    function getEmpresas() {
        $q = "SELECT IdEmpresa, NombreEmpresa AS Empresa, Descripcion, Estatus, FechaCreacion
              FROM EmpresasIbero ORDER BY NombreEmpresa ASC";
        return json_encode($this->Select($q));
    }

    function getEmpresaById($IdEmpresa) {
        $id = intval(base64_decode($IdEmpresa));
        $r = $this->Select("SELECT IdEmpresa, NombreEmpresa, Descripcion, Estatus FROM EmpresasIbero WHERE IdEmpresa=$id LIMIT 1");
        if (empty($r)) return json_encode(["Resultado"=>false,"Msg"=>"Empresa no encontrada."]);
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Datos"=>$r[0]]);
    }

    function addEmpresa($NombreEmpresa, $Descripcion) {
        $n = $this->sanitize($NombreEmpresa);
        $d = $this->sanitize($Descripcion);
        if (empty($n)) return json_encode(["Resultado"=>false,"Msg"=>"Nombre de empresa requerido."]);
        $id = $this->InsertAndGetId("INSERT INTO EmpresasIbero (NombreEmpresa, Descripcion, Estatus) VALUES ('$n','$d',1)");
        if ($id) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Empresa registrada."]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error al registrar."]);
    }

    function updateEmpresa($IdEmpresa, $NombreEmpresa, $Descripcion, $Estatus) {
        $id = intval(base64_decode($IdEmpresa));
        $n  = $this->sanitize($NombreEmpresa);
        $d  = $this->sanitize($Descripcion);
        $e  = intval($Estatus);
        if (empty($n)) return json_encode(["Resultado"=>false,"Msg"=>"Nombre requerido."]);
        $this->ProcedureExec("UPDATE EmpresasIbero SET NombreEmpresa='$n', Descripcion='$d', Estatus=$e WHERE IdEmpresa=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Empresa actualizada."]);
    }

    function deleteEmpresa($IdEmpresa) {
        $id = intval(base64_decode($IdEmpresa));
        $uso = $this->Select("SELECT COUNT(*) AS T FROM VacantesIbero WHERE IdEmpresa=$id");
        if (intval($uso[0]['T'] ?? 0) > 0) return json_encode(["Resultado"=>false,"Msg"=>"No se puede eliminar: tiene vacantes asociadas."]);
        $this->ProcedureExec("DELETE FROM EmpresasIbero WHERE IdEmpresa=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Empresa eliminada."]);
    }
}
?>
