<?php
/**
 * VacantesIbero — Gestión de vacantes para la Universidad Iberoamericana.
 * Usa queries directas sobre tablas *Ibero.
 */
if (file_exists(__DIR__ . "/../Conexiones/Conexiones.php")) {
    require_once(__DIR__ . "/../Conexiones/Conexiones.php");
}

class VacantesIbero extends Conexiones
{
    private function autoCerrar() {
        $this->ProcedureExec("UPDATE VacantesIbero SET Estatus=3 WHERE FechaCierre < CURDATE() AND Estatus=2 AND Publicada=1");
    }

    function getVacantes() {
        $this->autoCerrar();
        $q = "SELECT v.*, a.NombreArea, p.Puesto, s.Sucursal,
                     CASE v.Estatus WHEN 1 THEN 'Borrador' WHEN 2 THEN 'Activa' WHEN 3 THEN 'Cerrada' END AS EstatusTexto
              FROM VacantesIbero v
              LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
              LEFT JOIN Puestos p ON v.IdPuesto=p.IdPuesto
              LEFT JOIN SucursalDepto s ON v.IdSucursal=s.IdSucursal
              ORDER BY v.IdVacante DESC";
        return json_encode($this->Select($q));
    }

    function getVacantesPublicadas() {
        $this->autoCerrar();
        $q = "SELECT v.*, a.NombreArea, p.Puesto, s.Sucursal
              FROM VacantesIbero v
              LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
              LEFT JOIN Puestos p ON v.IdPuesto=p.IdPuesto
              LEFT JOIN SucursalDepto s ON v.IdSucursal=s.IdSucursal
              WHERE v.Estatus=2 AND v.Publicada=1 AND v.FechaApertura<=CURDATE()
                AND (v.FechaCierre IS NULL OR v.FechaCierre>=CURDATE())
              ORDER BY v.FechaApertura DESC";
        return json_encode($this->Select($q));
    }

    function getRequisitosDocumentacionVacantes() {
        $this->autoCerrar();
        $q = "SELECT v.*, a.NombreArea, p.Puesto, s.Sucursal,
                     CASE WHEN v.BanderaCV=1 AND v.BanderaSE=1 THEN 'Ambas'
                          WHEN v.BanderaCV=1 THEN 'Curriculum Vitae (CV)'
                          WHEN v.BanderaSE=1 THEN 'Solicitud de Empleo'
                          ELSE 'Ninguna' END AS RequisitoDocumentacion
              FROM VacantesIbero v
              LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
              LEFT JOIN Puestos p ON v.IdPuesto=p.IdPuesto
              LEFT JOIN SucursalDepto s ON v.IdSucursal=s.IdSucursal
              WHERE v.Estatus=2 AND v.Publicada=1 AND v.FechaApertura<=CURDATE()
                AND (v.FechaCierre IS NULL OR v.FechaCierre>=CURDATE())
              ORDER BY v.NombreVacante ASC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function getVacanteById($IdVacante) {
        try {
            $id = intval(base64_decode($IdVacante));
            $r = $this->Select("SELECT v.*, a.NombreArea, p.Puesto, s.Sucursal
                                FROM VacantesIbero v
                                LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
                                LEFT JOIN Puestos p ON v.IdPuesto=p.IdPuesto
                                LEFT JOIN SucursalDepto s ON v.IdSucursal=s.IdSucursal
                                WHERE v.IdVacante=$id LIMIT 1");
            if (!empty($r)) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Datos"=>$r[0]]);
            return json_encode(["Resultado"=>true,"Siguiente"=>false,"Msg"=>"No encontrada."]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    function addVacante($NombreVacante,$IdAreaTecnica,$IdPuesto,$TipoContratacion,
                        $IdSucursal,$DescripcionPuesto,$SalarioMinimo,$SalarioMaximo,
                        $FechaApertura,$FechaCierre,$BanderaCV,$BanderaSE) {
        try {
            $n  = $this->sanitize($NombreVacante);
            $tc = $this->sanitize($TipoContratacion);
            $dp = $this->sanitize($DescripcionPuesto);
            $fa = $this->sanitize($FechaApertura);
            $area = empty($IdAreaTecnica) ? "NULL" : intval($IdAreaTecnica);
            $pue  = empty($IdPuesto) ? "NULL" : intval($IdPuesto);
            $suc  = empty($IdSucursal) ? "NULL" : intval($IdSucursal);
            $smin = empty($SalarioMinimo) ? "NULL" : floatval($SalarioMinimo);
            $smax = empty($SalarioMaximo) ? "NULL" : floatval($SalarioMaximo);
            $fc   = empty($FechaCierre) ? "NULL" : "'" . $this->sanitize($FechaCierre) . "'";
            $cv   = intval($BanderaCV);
            $se   = intval($BanderaSE);
            $id = $this->InsertAndGetId(
                "INSERT INTO VacantesIbero (NombreVacante,IdAreaTecnica,IdPuesto,TipoContratacion,IdSucursal,
                 DescripcionPuesto,SalarioMinimo,SalarioMaximo,FechaApertura,FechaCierre,BanderaCV,BanderaSE,Estatus,Publicada)
                 VALUES ('$n',$area,$pue,'$tc',$suc,'$dp',$smin,$smax,'$fa',$fc,$cv,$se,1,0)");
            if ($id) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"¡Vacante registrada!","IdVacante"=>$id]);
            return json_encode(["Resultado"=>false,"Msg"=>"Error al registrar."]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    function updateVacante($IdVacante,$NombreVacante,$IdAreaTecnica,$IdPuesto,$TipoContratacion,
                           $IdSucursal,$DescripcionPuesto,$SalarioMinimo,$SalarioMaximo,
                           $FechaApertura,$FechaCierre,$BanderaCV,$BanderaSE) {
        try {
            $id   = intval(base64_decode($IdVacante));
            $n    = $this->sanitize($NombreVacante);
            $tc   = $this->sanitize($TipoContratacion);
            $dp   = $this->sanitize($DescripcionPuesto);
            $fa   = $this->sanitize($FechaApertura);
            $area = empty($IdAreaTecnica) ? "NULL" : intval($IdAreaTecnica);
            $pue  = empty($IdPuesto) ? "NULL" : intval($IdPuesto);
            $suc  = empty($IdSucursal) ? "NULL" : intval($IdSucursal);
            $smin = empty($SalarioMinimo) ? "NULL" : floatval($SalarioMinimo);
            $smax = empty($SalarioMaximo) ? "NULL" : floatval($SalarioMaximo);
            $fc   = empty($FechaCierre) ? "NULL" : "'" . $this->sanitize($FechaCierre) . "'";
            $cv   = intval($BanderaCV);
            $se   = intval($BanderaSE);
            $this->ProcedureExec(
                "UPDATE VacantesIbero SET NombreVacante='$n',IdAreaTecnica=$area,IdPuesto=$pue,
                 TipoContratacion='$tc',IdSucursal=$suc,DescripcionPuesto='$dp',SalarioMinimo=$smin,
                 SalarioMaximo=$smax,FechaApertura='$fa',FechaCierre=$fc,BanderaCV=$cv,BanderaSE=$se
                 WHERE IdVacante=$id");
            return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"¡Vacante actualizada!"]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    function cambiarEstatusVacante($IdVacante,$NuevoEstatus) {
        $id = intval(base64_decode($IdVacante)); $ns = intval($NuevoEstatus);
        $this->ProcedureExec("UPDATE VacantesIbero SET Estatus=$ns WHERE IdVacante=$id");
        $t = [1=>'borrador',2=>'activa',3=>'cerrada']; $txt=$t[$ns]??'actualizada';
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Vacante marcada como $txt.","NuevoEstatus"=>$ns]);
    }

    function publicarVacante($IdVacante) {
        $id = intval(base64_decode($IdVacante));
        $this->ProcedureExec("UPDATE VacantesIbero SET Publicada=1,Estatus=2 WHERE IdVacante=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"¡Vacante publicada!"]);
    }

    function deleteVacante($IdVacante) {
        $id = intval(base64_decode($IdVacante));
        $c = $this->Select("SELECT Publicada FROM VacantesIbero WHERE IdVacante=$id LIMIT 1");
        if (empty($c)) return json_encode(["Resultado"=>false,"Msg"=>"No encontrada."]);
        if ($c[0]['Publicada']==1) return json_encode(["Resultado"=>false,"Msg"=>"No se puede eliminar una vacante publicada."]);
        $this->ProcedureExec("DELETE FROM VacantesRequisitosIbero WHERE IdVacante=$id");
        $this->ProcedureExec("DELETE FROM VacantesEvaluacionesIbero WHERE IdVacante=$id");
        $this->ProcedureExec("DELETE FROM VacantesInduccionesIbero WHERE IdVacante=$id");
        $this->ProcedureExec("DELETE FROM VacantesIbero WHERE IdVacante=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Vacante eliminada."]);
    }

    // Requisitos
    function getRequisitosVacante($IdVacante) {
        $id=intval(base64_decode($IdVacante));
        return json_encode($this->Select("SELECT * FROM VacantesRequisitosIbero WHERE IdVacante=$id ORDER BY Orden ASC"));
    }
    function addRequisitoVacante($IdVacante,$Requisito,$Orden) {
        $id=intval(base64_decode($IdVacante)); $r=$this->sanitize($Requisito); $o=intval($Orden);
        $newId=$this->InsertAndGetId("INSERT INTO VacantesRequisitosIbero (IdVacante,Requisito,Orden) VALUES ($id,'$r',$o)");
        if ($newId) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Requisito agregado.","IdVacanteRequisito"=>$newId]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error."]);
    }
    function deleteRequisitoVacante($IdVacanteRequisito) {
        $id=intval(base64_decode($IdVacanteRequisito));
        $this->ProcedureExec("DELETE FROM VacantesRequisitosIbero WHERE IdVacanteRequisito=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Requisito eliminado."]);
    }

    // Evaluaciones de vacante
    function getEvaluacionesVacante($IdVacante) {
        $id=intval(base64_decode($IdVacante));
        $q="SELECT ve.*, e.Titulo AS NombreEvaluacion, pv.NombreProceso
            FROM VacantesEvaluacionesIbero ve
            INNER JOIN EvaluacionesIbero e ON ve.IdEvaluacion=e.idEvaluaciones
            INNER JOIN ProcesosVacantesIbero pv ON ve.IdProceso=pv.IdProceso
            WHERE ve.IdVacante=$id ORDER BY pv.IdProceso ASC";
        return json_encode($this->Select($q));
    }
    function addEvaluacionVacante($IdVacante,$IdEvaluacion,$IdProceso) {
        $id=intval(base64_decode($IdVacante)); $ev=intval($IdEvaluacion); $pr=intval($IdProceso);
        $check=$this->Select("SELECT IdVacanteEvaluacion FROM VacantesEvaluacionesIbero WHERE IdVacante=$id AND IdEvaluacion=$ev AND IdProceso=$pr LIMIT 1");
        if (!empty($check)) return json_encode(["Resultado"=>false,"Msg"=>"Ya asignada."]);
        $newId=$this->InsertAndGetId("INSERT INTO VacantesEvaluacionesIbero (IdVacante,IdEvaluacion,IdProceso) VALUES ($id,$ev,$pr)");
        if ($newId) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Evaluación asignada."]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error."]);
    }
    function deleteEvaluacionVacante($IdVacanteEvaluacion) {
        $id=intval(base64_decode($IdVacanteEvaluacion));
        $this->ProcedureExec("DELETE FROM VacantesEvaluacionesIbero WHERE IdVacanteEvaluacion=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Evaluación removida."]);
    }

    // Inducciones de vacante
    function getInduccionesVacante($IdVacante) {
        $id=intval(base64_decode($IdVacante));
        $q="SELECT vi.*, i.NombreInduccion FROM VacantesInduccionesIbero vi
            INNER JOIN InduccionesVacantesIbero i ON vi.IdInduccion=i.IdInduccion
            WHERE vi.IdVacante=$id ORDER BY i.NombreInduccion ASC";
        return json_encode($this->Select($q));
    }
    function addInduccionVacante($IdVacante,$IdInduccion) {
        $id=intval(base64_decode($IdVacante)); $ind=intval($IdInduccion);
        $check=$this->Select("SELECT IdVacanteInduccion FROM VacantesInduccionesIbero WHERE IdVacante=$id AND IdInduccion=$ind LIMIT 1");
        if (!empty($check)) return json_encode(["Resultado"=>false,"Msg"=>"Ya asignada."]);
        $newId=$this->InsertAndGetId("INSERT INTO VacantesInduccionesIbero (IdVacante,IdInduccion) VALUES ($id,$ind)");
        if ($newId) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Inducción asignada."]);
        return json_encode(["Resultado"=>false,"Msg"=>"Error."]);
    }
    function deleteInduccionVacante($IdVacanteInduccion) {
        $id=intval(base64_decode($IdVacanteInduccion));
        $this->ProcedureExec("DELETE FROM VacantesInduccionesIbero WHERE IdVacanteInduccion=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Inducción removida."]);
    }

    // Combos
    function getAreasTecnicasActivas() {
        return json_encode($this->Select("SELECT IdAreaTecnica, NombreArea FROM AreasTecnicasIbero WHERE Estatus=1 ORDER BY NombreArea ASC"));
    }
    function addAreaTecnica($NombreArea,$Descripcion="") {
        $n=$this->sanitize($NombreArea); $d=$this->sanitize($Descripcion);
        $c=$this->Select("SELECT IdAreaTecnica FROM AreasTecnicasIbero WHERE NombreArea='$n' LIMIT 1");
        if (!empty($c)) return json_encode(["estatus"=>false,"msg"=>"Ya existe.","id"=>$c[0]['IdAreaTecnica']]);
        $id=$this->InsertAndGetId("INSERT INTO AreasTecnicasIbero (NombreArea,Descripcion,Estatus) VALUES ('$n','$d',1)");
        return $id ? json_encode(["estatus"=>true,"id"=>$id,"nombre"=>$n]) : json_encode(["estatus"=>false,"msg"=>"Error."]);
    }
    function getPuestosActivos() { return json_encode($this->Select("SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC")); }
    function getSucursalesActivas() { return json_encode($this->Select("SELECT IdSucursal, Sucursal FROM SucursalDepto ORDER BY Sucursal ASC")); }
    function getProcesosVacantesActivos() { return json_encode($this->Select("SELECT IdProceso, NombreProceso FROM ProcesosVacantesIbero WHERE Estatus=1 ORDER BY IdProceso ASC")); }
    function getEvaluacionesActivas() { return json_encode($this->Select("SELECT idEvaluaciones, Titulo FROM EvaluacionesIbero WHERE Status=1 AND PreguntasAceptadas=1 ORDER BY Titulo ASC")); }
    function getInduccionesActivas() { return json_encode($this->Select("SELECT IdInduccion, NombreInduccion FROM InduccionesVacantesIbero WHERE Estatus=1 ORDER BY NombreInduccion ASC")); }
}
?>
