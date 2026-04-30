<?php
/**
 * PostulantesIbero — Gestión de postulantes para la Universidad Iberoamericana.
 * Queries directas sobre tablas *Ibero.
 */
if (file_exists(__DIR__ . "/../Conexiones/Conexiones.php")) {
    require_once(__DIR__ . "/../Conexiones/Conexiones.php");
}

class PostulantesIbero extends Conexiones
{
    // ==========================================
    // CRUD DE POSTULANTES
    // ==========================================

    function getAllPostulantes() {
        $q = "SELECT IdPostulante, Nombre, ApellidoPaterno, ApellidoMaterno, CURP, Telefono,
                     CorreoElectronico, Estado, Ciudad, FechaRegistro
              FROM PostulantesIbero ORDER BY FechaRegistro DESC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function getPostulanteById($IdPostulante) {
        $id = is_numeric($IdPostulante) ? intval($IdPostulante) : intval(base64_decode($IdPostulante));
        $r = $this->Select("SELECT * FROM PostulantesIbero WHERE IdPostulante=$id LIMIT 1");
        if (!empty($r)) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$r[0]]);
        return json_encode(["Resultado"=>false,"Msg"=>"No encontrado."]);
    }

    function addPostulante($Nombre,$ApellidoPaterno,$ApellidoMaterno,$CURP,$Telefono,
                           $CorreoElectronico,$Direccion,$Estado,$Ciudad) {
        try {
            $n  = $this->sanitize($Nombre);
            $ap = $this->sanitize($ApellidoPaterno);
            $am = $this->sanitize($ApellidoMaterno ?? '');
            $c  = strtoupper($this->sanitize($CURP ?? ''));
            $t  = $this->normalizarTelefono($Telefono ?? '');
            $ce = $this->sanitize($CorreoElectronico);
            $d  = $this->sanitize($Direccion ?? '');
            $e  = $this->sanitize($Estado ?? '');
            $ci = $this->sanitize($Ciudad ?? '');
            $id = $this->InsertAndGetId(
                "INSERT INTO PostulantesIbero (Nombre,ApellidoPaterno,ApellidoMaterno,CURP,Telefono,
                 CorreoElectronico,Direccion,Estado,Ciudad)
                 VALUES ('$n','$ap','$am','$c','$t','$ce','$d','$e','$ci')");
            if ($id) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Postulante registrado.","IdPostulante"=>$id]);
            return json_encode(["Resultado"=>false,"Msg"=>"Error al registrar."]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    function updatePostulante($IdPostulante,$Nombre,$ApellidoPaterno,$ApellidoMaterno,
                              $CURP,$Telefono,$CorreoElectronico,$Direccion,$Estado,$Ciudad) {
        $id = intval(base64_decode($IdPostulante));
        $n=$this->sanitize($Nombre); $ap=$this->sanitize($ApellidoPaterno);
        $am=$this->sanitize($ApellidoMaterno??''); $c=strtoupper($this->sanitize($CURP??''));
        $t=$this->normalizarTelefono($Telefono??''); $ce=$this->sanitize($CorreoElectronico);
        $d=$this->sanitize($Direccion??''); $e=$this->sanitize($Estado??''); $ci=$this->sanitize($Ciudad??'');
        $this->ProcedureExec("UPDATE PostulantesIbero SET Nombre='$n',ApellidoPaterno='$ap',ApellidoMaterno='$am',
            CURP='$c',Telefono='$t',CorreoElectronico='$ce',Direccion='$d',Estado='$e',Ciudad='$ci'
            WHERE IdPostulante=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Postulante actualizado."]);
    }

    // ==========================================
    // POSTULACIONES
    // ==========================================

    function getPostulantesByVacante($IdVacante) {
        $id = intval(base64_decode($IdVacante));
        $q = "SELECT pv.*, p.Nombre, p.ApellidoPaterno, p.ApellidoMaterno, p.CURP,
                     p.Telefono, p.CorreoElectronico, p.Estado, p.Ciudad,
                     v.NombreVacante,
                     CASE pv.EstatusPostulacion WHEN 1 THEN 'En Proceso' WHEN 2 THEN 'Aceptado'
                          WHEN 3 THEN 'Descartado' WHEN 4 THEN 'Finalizado' END AS EstatusTexto
              FROM PostulantesVacantesIbero pv
              INNER JOIN PostulantesIbero p ON pv.IdPostulante=p.IdPostulante
              INNER JOIN VacantesIbero v ON pv.IdVacante=v.IdVacante
              WHERE pv.IdVacante=$id
              ORDER BY pv.FechaPostulacion DESC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function getPostulanteDetalle($IdPostulanteVacante) {
        $id = intval(base64_decode($IdPostulanteVacante));
        $q = "SELECT pv.*, p.Nombre, p.ApellidoPaterno, p.ApellidoMaterno, p.CURP,
                     p.Telefono, p.CorreoElectronico, p.Direccion, p.Estado, p.Ciudad,
                     p.CodigoPostal, p.Colonia, v.NombreVacante,
                     a.NombreArea AS NombreArea, e.NombreEmpresa AS Empresa,
                     CASE pv.EstatusPostulacion WHEN 1 THEN 'En Proceso' WHEN 2 THEN 'Aceptado'
                          WHEN 3 THEN 'Descartado' WHEN 4 THEN 'Finalizado' END AS EstatusTexto
              FROM PostulantesVacantesIbero pv
              INNER JOIN PostulantesIbero p ON pv.IdPostulante=p.IdPostulante
              INNER JOIN VacantesIbero v ON pv.IdVacante=v.IdVacante
              LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
              LEFT JOIN EmpresasIbero e ON v.IdEmpresa=e.IdEmpresa
              WHERE pv.IdPostulanteVacante=$id LIMIT 1";
        $r = $this->Select($q);
        if (!empty($r)) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$r[0]]);
        return json_encode(["Resultado"=>false,"Msg"=>"No encontrado."]);
    }

    function checkPostulacionDuplicada($CURP,$IdVacante) {
        $c = strtoupper($this->sanitize($CURP));
        $v = is_numeric($IdVacante) ? intval($IdVacante) : intval(base64_decode($IdVacante));
        $r = $this->Select("SELECT pv.IdPostulanteVacante FROM PostulantesVacantesIbero pv
                            INNER JOIN PostulantesIbero p ON pv.IdPostulante=p.IdPostulante
                            WHERE UPPER(p.CURP)='$c' AND pv.IdVacante=$v LIMIT 1");
        return json_encode(["Resultado"=>true,"Duplicada"=>!empty($r)]);
    }

    function addPostulanteConPostulacion($IdVacante,$Nombre,$ApellidoPaterno,$ApellidoMaterno,
                                         $CURP,$Telefono,$CorreoElectronico,$Direccion,
                                         $Estado,$Ciudad,$RutaCV,$RutaSolicitudEmpleo,$Observaciones) {
        try {
            $ce = $this->sanitize($CorreoElectronico);
            $c  = strtoupper($this->sanitize($CURP??''));
            $t  = $this->normalizarTelefono($Telefono??'');
            $v  = is_numeric($IdVacante) ? intval($IdVacante) : intval(base64_decode($IdVacante));

            // Buscar si ya existe el postulante
            $sql = "SELECT IdPostulante, Telefono FROM PostulantesIbero WHERE LOWER(CorreoElectronico)=LOWER('$ce')";
            if (!empty($c)) $sql .= " OR UPPER(CURP)='$c'";
            $existente = $this->Select($sql);

            if (!empty($existente)) {
                $IdPostulante = $existente[0]['IdPostulante'];
                // Agregar teléfono al histórico si cambió
                if (!empty($t) && $t != $existente[0]['Telefono']) {
                    $this->ProcedureExec("INSERT IGNORE INTO PostulantesTelefonosIbero (IdPostulante,Telefono,Observaciones)
                                          VALUES ($IdPostulante,'$t','Nueva postulación')");
                }
            } else {
                $r = json_decode($this->addPostulante($Nombre,$ApellidoPaterno,$ApellidoMaterno,
                                                       $CURP,$Telefono,$CorreoElectronico,$Direccion,$Estado,$Ciudad), true);
                if (!$r['Siguiente']) return json_encode($r);
                $IdPostulante = $r['IdPostulante'];
            }

            // Verificar duplicado de postulación
            $dupCheck = $this->Select("SELECT IdPostulanteVacante FROM PostulantesVacantesIbero WHERE IdVacante=$v AND IdPostulante=$IdPostulante LIMIT 1");
            if (!empty($dupCheck)) return json_encode(["Resultado"=>false,"Siguiente"=>false,"Msg"=>"Ya estás registrado en esta vacante."]);

            // Crear postulación
            $rcv = empty($RutaCV) ? "NULL" : "'" . $this->sanitize($RutaCV) . "'";
            $rse = empty($RutaSolicitudEmpleo) ? "NULL" : "'" . $this->sanitize($RutaSolicitudEmpleo) . "'";
            $obs = empty($Observaciones) ? "NULL" : "'" . $this->sanitize($Observaciones) . "'";

            $pvId = $this->InsertAndGetId(
                "INSERT INTO PostulantesVacantesIbero (IdVacante,IdPostulante,EstatusPostulacion,RutaCV,RutaSolicitudEmpleo,Observaciones)
                 VALUES ($v,$IdPostulante,1,$rcv,$rse,$obs)");

            if ($pvId) return json_encode(["Resultado"=>true,"Siguiente"=>true,
                "Msg"=>"¡Postulación registrada exitosamente!",
                "IdPostulante"=>$IdPostulante,"IdPostulanteVacante"=>$pvId]);
            return json_encode(["Resultado"=>false,"Msg"=>"Error al crear la postulación."]);
        } catch(\Exception $e) {
            return json_encode(["Resultado"=>false,"Msg"=>$e->getMessage()]);
        }
    }

    function updateEstatusPostulacion($IdPostulanteVacante,$EstatusPostulacion,$Observaciones,$UsuarioRegistro=0) {
        $id = intval(base64_decode($IdPostulanteVacante));
        $es = intval($EstatusPostulacion);
        $obs = $this->sanitize($Observaciones??'');
        $obsSQL = empty($obs) ? "NULL" : "'$obs'";
        $this->ProcedureExec("UPDATE PostulantesVacantesIbero SET EstatusPostulacion=$es, Observaciones=$obsSQL WHERE IdPostulanteVacante=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Estatus actualizado."]);
    }

    function deletePostulacion($IdPostulanteVacante) {
        $id = intval(base64_decode($IdPostulanteVacante));
        $this->ProcedureExec("DELETE FROM PostulantesHistorialIbero WHERE IdPostulanteVacante=$id");
        $this->ProcedureExec("DELETE FROM PostulantesRequisitosIbero WHERE IdPostulanteVacante=$id");
        $this->ProcedureExec("DELETE FROM PostulantesEvaluacionesIbero WHERE IdPostulanteVacante=$id");
        $this->ProcedureExec("DELETE FROM PostulantesArchivosIbero WHERE IdPostulanteVacante=$id");
        $this->ProcedureExec("DELETE FROM PostulantesVacantesIbero WHERE IdPostulanteVacante=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Postulación eliminada."]);
    }

    function getEstadisticasPostulantes($IdVacante) {
        $id = intval(base64_decode($IdVacante));
        $r = $this->Select("SELECT COUNT(*) AS TotalPostulantes,
                                   SUM(EstatusPostulacion=1) AS EnProceso,
                                   SUM(EstatusPostulacion=2) AS Aceptados,
                                   SUM(EstatusPostulacion=3) AS Rechazados,
                                   SUM(EstatusPostulacion=4) AS Finalizados
                            FROM PostulantesVacantesIbero WHERE IdVacante=$id");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>!empty($r)?$r[0]:["TotalPostulantes"=>0]]);
    }

    // ==========================================
    // HISTORIAL DE PROCESOS
    // ==========================================

    function getProcesosPostulacion($IdPostulanteVacante) {
        $id = intval(base64_decode($IdPostulanteVacante));
        $q = "SELECT h.*, pv.NombreProceso
              FROM PostulantesHistorialIbero h
              INNER JOIN ProcesosVacantesIbero pv ON h.IdProceso=pv.IdProceso
              WHERE h.IdPostulanteVacante=$id ORDER BY h.Fecha ASC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function addPostulanteHistorial($IdPostulanteVacante,$IdProceso,$Observaciones,$Resultado,$UsuarioRegistro=0) {
        $id  = intval(base64_decode($IdPostulanteVacante));
        $pr  = intval($IdProceso);
        $obs = $this->sanitize($Observaciones??'');
        $obsSQL = empty($obs) ? "NULL" : "'$obs'";
        $res = ($Resultado===null||$Resultado==='') ? "NULL" : intval($Resultado);
        $usr = intval($UsuarioRegistro);
        $newId = $this->InsertAndGetId(
            "INSERT INTO PostulantesHistorialIbero (IdPostulanteVacante,IdProceso,Observaciones,Resultado,UsuarioRegistro)
             VALUES ($id,$pr,$obsSQL,$res,$usr)");
        
        if ($newId) {
            // == ASIGNACIÓN AUTOMÁTICA DE EVALUACIONES ==
            $vac = $this->Select("SELECT IdVacante FROM PostulantesVacantesIbero WHERE IdPostulanteVacante=$id LIMIT 1");
            if (!empty($vac)) {
                $idVac = $vac[0]['IdVacante'];
                // Buscar evaluaciones vinculadas a este proceso para esta vacante
                $evals = $this->Select("SELECT IdVacanteEvaluacion FROM VacantesEvaluacionesIbero WHERE IdVacante=$idVac AND IdProceso=$pr");
                if (!empty($evals)) {
                    foreach($evals as $ev) {
                        $idVE = $ev['IdVacanteEvaluacion'];
                        // Insertar ignorando si ya la tiene
                        $this->ProcedureExec("INSERT IGNORE INTO PostulantesEvaluacionesIbero (IdPostulanteVacante, IdVacanteEvaluacion, EstatusEvaluacion) VALUES ($id, $idVE, 1)");
                    }
                }
            }
            return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Proceso registrado. Las evaluaciones vinculadas se asignaron automáticamente.","IdHistorial"=>$newId]);
        }
        return json_encode(["Resultado"=>false,"Msg"=>"Error."]);
    }

    // ==========================================
    // PORTAL CANDIDATO (LOGIN)
    // ==========================================

    function validarCandidato($CURP,$Telefono) {
        $c = strtoupper($this->sanitize($CURP));
        $t = $this->normalizarTelefono($Telefono);
        $r = $this->Select("SELECT IdPostulante, Nombre, ApellidoPaterno, ApellidoMaterno,
                                   CURP, Telefono, CorreoElectronico
                            FROM PostulantesIbero WHERE UPPER(CURP)='$c' AND Telefono='$t' LIMIT 1");
        if (!empty($r)) return json_encode(["Resultado"=>true,"Data"=>$r[0]]);
        // Buscar en histórico de teléfonos
        $rh = $this->Select("SELECT p.IdPostulante, p.Nombre, p.ApellidoPaterno, p.ApellidoMaterno,
                                    p.CURP, p.Telefono, p.CorreoElectronico
                             FROM PostulantesIbero p
                             INNER JOIN PostulantesTelefonosIbero th ON th.IdPostulante=p.IdPostulante
                             WHERE UPPER(p.CURP)='$c' AND th.Telefono='$t' AND th.Activo=1 LIMIT 1");
        if (!empty($rh)) return json_encode(["Resultado"=>true,"Data"=>$rh[0]]);
        return json_encode(["Resultado"=>false,"Msg"=>"Credenciales incorrectas. Verifica tu CURP y teléfono."]);
    }

    function getPostulacionesByCurp($CURP) {
        $c = strtoupper($this->sanitize($CURP));
        $q = "SELECT pv.IdPostulanteVacante, pv.IdVacante, pv.EstatusPostulacion, pv.FechaPostulacion,
                     v.NombreVacante, a.NombreArea, e.NombreEmpresa AS Empresa
              FROM PostulantesVacantesIbero pv
              INNER JOIN PostulantesIbero p ON pv.IdPostulante=p.IdPostulante
              INNER JOIN VacantesIbero v ON pv.IdVacante=v.IdVacante
              LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
              LEFT JOIN EmpresasIbero e ON v.IdEmpresa=e.IdEmpresa
              WHERE UPPER(p.CURP)='$c'
              ORDER BY pv.FechaPostulacion DESC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    // ==========================================
    // REQUISITOS DE POSTULANTES
    // ==========================================

    function getPostulanteRequisitos($IdPostulanteVacante) {
        $id = intval(base64_decode($IdPostulanteVacante));
        $q = "SELECT vr.IdVacanteRequisito, vr.Requisito, vr.Orden,
                     pr.IdPostulanteRequisito, pr.Respuesta, pr.Cumple, pr.FechaRespuesta
              FROM VacantesRequisitosIbero vr
              INNER JOIN PostulantesVacantesIbero pv ON vr.IdVacante=pv.IdVacante
              LEFT JOIN PostulantesRequisitosIbero pr ON pr.IdVacanteRequisito=vr.IdVacanteRequisito
                  AND pr.IdPostulanteVacante=pv.IdPostulanteVacante
              WHERE pv.IdPostulanteVacante=$id ORDER BY vr.Orden ASC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function addPostulanteRequisito($IdPostulanteVacante,$IdVacanteRequisito,$Respuesta,$Cumple) {
        $id  = intval(base64_decode($IdPostulanteVacante));
        $req = intval(base64_decode($IdVacanteRequisito));
        $r   = $this->sanitize($Respuesta??'');
        $c   = ($Cumple===''||$Cumple===null) ? "NULL" : intval($Cumple);
        $this->ProcedureExec("INSERT INTO PostulantesRequisitosIbero (IdVacanteRequisito,IdPostulanteVacante,Respuesta,Cumple)
                              VALUES ($req,$id,'$r',$c)
                              ON DUPLICATE KEY UPDATE Respuesta='$r', Cumple=$c");
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Requisito actualizado."]);
    }

    function getAllPostulantesGeneral() {
        // Lista completa con última vacante y estatus, igual que PIP
        $q = "SELECT p.IdPostulante,
                     CONCAT(p.Nombre,' ',p.ApellidoPaterno,' ',IFNULL(p.ApellidoMaterno,'')) AS NombreCompleto,
                     p.CURP, p.Telefono, p.CorreoElectronico, p.Estado, p.Ciudad,
                     p.FechaRegistro AS PrimeraPostulacion,
                     (SELECT v.NombreVacante FROM PostulantesVacantesIbero pv2
                      INNER JOIN VacantesIbero v ON pv2.IdVacante=v.IdVacante
                      WHERE pv2.IdPostulante=p.IdPostulante ORDER BY pv2.FechaPostulacion DESC LIMIT 1) AS UltimaVacante,
                     (SELECT pv3.EstatusPostulacion FROM PostulantesVacantesIbero pv3
                      WHERE pv3.IdPostulante=p.IdPostulante ORDER BY pv3.FechaPostulacion DESC LIMIT 1) AS UltimoEstatus,
                     (SELECT COUNT(*) FROM PostulantesVacantesIbero pv4 WHERE pv4.IdPostulante=p.IdPostulante) AS TotalPostulaciones
              FROM PostulantesIbero p
              ORDER BY p.FechaRegistro DESC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function getPostulanteHistorialCompleto($IdPostulante) {
        // Todas las postulaciones de un candidato (para panel lateral en PostulantesGeneralIbero)
        $id = intval(base64_decode($IdPostulante));
        $q = "SELECT pv.IdPostulanteVacante, pv.EstatusPostulacion, pv.FechaPostulacion,
                     v.NombreVacante, a.NombreArea, e.NombreEmpresa AS Empresa,
                     CASE pv.EstatusPostulacion WHEN 1 THEN 'En Proceso' WHEN 2 THEN 'Aceptado'
                          WHEN 3 THEN 'Descartado' WHEN 4 THEN 'Finalizado' END AS EstatusTexto
              FROM PostulantesVacantesIbero pv
              INNER JOIN VacantesIbero v ON pv.IdVacante=v.IdVacante
              LEFT JOIN AreasTecnicasIbero a ON v.IdAreaTecnica=a.IdAreaTecnica
              LEFT JOIN EmpresasIbero e ON v.IdEmpresa=e.IdEmpresa
              WHERE pv.IdPostulante=$id ORDER BY pv.FechaPostulacion DESC";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    function getPostulanteResultadosEvaluaciones($IdPostulanteVacante) {
        // Evaluaciones respondidas por un candidato en una postulación específica
        $id = intval(base64_decode($IdPostulanteVacante));
        $evals = $this->Select(
            "SELECT pe.IdPostulanteEvaluacion, pe.EstatusEvaluacion, pe.Calificacion,
                    pe.FechaInicio, pe.FechaFin,
                    ev.Titulo AS NombreEvaluacion, ev.idEvaluaciones,
                    CASE pe.EstatusEvaluacion WHEN 1 THEN 'Pendiente' WHEN 2 THEN 'En Progreso'
                         WHEN 3 THEN 'Completada' END AS TxEstatus
             FROM PostulantesEvaluacionesIbero pe
             INNER JOIN EvaluacionesIbero ev ON pe.IdEvaluacion=ev.idEvaluaciones
             WHERE pe.IdPostulanteVacante=$id ORDER BY pe.FechaInicio DESC"
        );
        foreach ($evals as &$e) {
            $idPE = $e['IdPostulanteEvaluacion'];
            // Obtener cantidad de preguntas respondidas vs total
            $total = $this->Select("SELECT COUNT(*) AS T FROM PreguntasEvaluacionIbero WHERE idEvaluaciones={$e['idEvaluaciones']}");
            $respondidas = $this->Select("SELECT COUNT(*) AS R FROM PostulantesRespuestasIbero WHERE IdPostulanteEvaluacion=$idPE");
            $e['TotalPreguntas'] = $total[0]['T'] ?? 0;
            $e['Respondidas']    = $respondidas[0]['R'] ?? 0;
        }
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$evals]);
    }

    function getComparativoResultadosVacante($IdVacante) {
        // Comparativa de todos los candidatos de una vacante con sus calificaciones de evaluaciones
        $id = intval(base64_decode($IdVacante));
        // 1. Postulantes de la vacante
        $postulantes = $this->Select(
            "SELECT pv.IdPostulanteVacante, pv.EstatusPostulacion, pv.FechaPostulacion,
                    CONCAT(p.Nombre,' ',p.ApellidoPaterno,' ',IFNULL(p.ApellidoMaterno,'')) AS NombreCompleto,
                    p.CURP, p.CorreoElectronico, p.Telefono,
                    CASE pv.EstatusPostulacion WHEN 1 THEN 'En Proceso' WHEN 2 THEN 'Aceptado'
                         WHEN 3 THEN 'Descartado' WHEN 4 THEN 'Finalizado' END AS EstatusTexto
             FROM PostulantesVacantesIbero pv
             INNER JOIN PostulantesIbero p ON pv.IdPostulante=p.IdPostulante
             WHERE pv.IdVacante=$id ORDER BY pv.FechaPostulacion ASC"
        );
        foreach ($postulantes as &$p) {
            $idPV = $p['IdPostulanteVacante'];
            // Evaluaciones de cada postulante
            $p['Evaluaciones'] = $this->Select(
                "SELECT pe.IdPostulanteEvaluacion, pe.EstatusEvaluacion, pe.Calificacion,
                        pe.FechaInicio, pe.FechaFin, ev.Titulo AS NombreEvaluacion,
                        CASE pe.EstatusEvaluacion WHEN 1 THEN 'Pendiente' WHEN 2 THEN 'En Progreso'
                             WHEN 3 THEN 'Completada' END AS TxEstatus
                 FROM PostulantesEvaluacionesIbero pe
                 INNER JOIN EvaluacionesIbero ev ON pe.IdEvaluacion=ev.idEvaluaciones
                 WHERE pe.IdPostulanteVacante=$idPV ORDER BY ev.Titulo ASC"
            );
            // Promedio de calificaciones completadas
            $promedioQ = $this->Select(
                "SELECT AVG(Calificacion) AS Promedio FROM PostulantesEvaluacionesIbero
                 WHERE IdPostulanteVacante=$idPV AND EstatusEvaluacion=3"
            );
            $p['PromedioGeneral'] = isset($promedioQ[0]['Promedio']) ? round((float)$promedioQ[0]['Promedio'], 1) : null;
            // Historial de procesos
            $p['Procesos'] = $this->Select(
                "SELECT h.*, pv2.NombreProceso FROM PostulantesHistorialIbero h
                 INNER JOIN ProcesosVacantesIbero pv2 ON h.IdProceso=pv2.IdProceso
                 WHERE h.IdPostulanteVacante=$idPV ORDER BY h.Fecha ASC"
            );
        }
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$postulantes]);
    }

    function actualizarPostulanteCompleto($IdPostulante,$Nombre,$ApellidoPaterno,$ApellidoMaterno,
                                          $CURP,$Telefono,$CorreoElectronico,$Direccion,$Estado,$Ciudad,
                                          $CodigoPostal='',$Colonia='') {
        $id = intval(base64_decode($IdPostulante));
        $n=$this->sanitize($Nombre); $ap=$this->sanitize($ApellidoPaterno);
        $am=$this->sanitize($ApellidoMaterno??''); $c=strtoupper($this->sanitize($CURP??''));
        $t=$this->normalizarTelefono($Telefono??''); $ce=$this->sanitize($CorreoElectronico);
        $d=$this->sanitize($Direccion??''); $e=$this->sanitize($Estado??'');
        $ci=$this->sanitize($Ciudad??''); $cp=$this->sanitize($CodigoPostal??'');
        $col=$this->sanitize($Colonia??'');
        $this->ProcedureExec(
            "UPDATE PostulantesIbero SET Nombre='$n',ApellidoPaterno='$ap',ApellidoMaterno='$am',
             CURP='$c',Telefono='$t',CorreoElectronico='$ce',Direccion='$d',
             Estado='$e',Ciudad='$ci',CodigoPostal='$cp',Colonia='$col'
             WHERE IdPostulante=$id"
        );
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Msg"=>"Candidato actualizado correctamente."]);
    }

    function searchPostulante($busqueda) {
        $b = $this->sanitize($busqueda);
        $q = "SELECT IdPostulante,
                     CONCAT(Nombre,' ',ApellidoPaterno,' ',IFNULL(ApellidoMaterno,'')) AS NombreCompleto,
                     CURP, Telefono, CorreoElectronico
              FROM PostulantesIbero
              WHERE Nombre LIKE '%$b%' OR ApellidoPaterno LIKE '%$b%'
                 OR CURP LIKE '%$b%' OR CorreoElectronico LIKE '%$b%'
              ORDER BY Nombre LIMIT 20";
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$this->Select($q)]);
    }

    // ==========================================
    // COMPARATIVA POR COMPETENCIAS
    // ==========================================
    function getComparativoPorCompetencias($IdVacante) {
        $id = is_numeric($IdVacante) ? intval($IdVacante) : intval(base64_decode($IdVacante));
        if (!$id) return json_encode(["Resultado"=>false,"Msg"=>"Vacante inválida."]);

        $q = "SELECT
                  pv.IdPostulanteVacante,
                  CONCAT(p.Nombre,' ',p.ApellidoPaterno,' ',IFNULL(p.ApellidoMaterno,'')) AS NombreCompleto,
                  IFNULL(c.Competencia,'Sin Competencia') AS Competencia,
                  ROUND(AVG(
                      CASE
                          WHEN pc.BoolCorreta IS NOT NULL
                               AND CONVERT(pr.Respuesta USING utf8mb4) = CONVERT(CAST(pc.BoolCorreta AS CHAR) USING utf8mb4)
                               THEN 100
                          WHEN pc.BoolCorreta IS NOT NULL THEN 0
                          WHEN pc.RespuestaCorrectaOM IS NOT NULL
                               AND (CONVERT(pr.Respuesta USING utf8mb4) = CONVERT(CAST(pc.RespuestaCorrectaOM AS CHAR) USING utf8mb4)
                                    OR CONVERT(pr.Respuesta USING utf8mb4) = CONVERT(ppr.DescripcionRespuesta USING utf8mb4))
                               THEN 100
                          WHEN pc.RespuestaCorrectaOM IS NOT NULL THEN 0
                          ELSE NULL
                      END
                  ), 2) AS ScoreCompetencia
              FROM PostulantesEvaluacionesIbero pe
              INNER JOIN PostulantesVacantesIbero pv ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
              INNER JOIN PostulantesIbero p ON p.IdPostulante = pv.IdPostulante
              INNER JOIN PostulantesRespuestasIbero pr ON pr.IdPostulanteEvaluacion = pe.IdPostulanteEvaluacion
              INNER JOIN PreguntasEvaluacionIbero preg ON preg.idPreguntasEvaluacion = pr.IdPreguntasEvaluacion
              LEFT JOIN CompetenciasIbero c ON c.idCompetencias = preg.idCompetencias
              LEFT JOIN PreguntasConfiguracionIbero pc ON pc.idPreguntasEvaluacion = preg.idPreguntasEvaluacion
              LEFT JOIN PreguntasPosiblesRespuestasIbero ppr ON ppr.idPreguntasPosiblesRespuestas = pc.RespuestaCorrectaOM
              WHERE pv.IdVacante = $id
                AND pe.EstatusEvaluacion = 3
              GROUP BY pv.IdPostulanteVacante, NombreCompleto, Competencia
              HAVING ScoreCompetencia IS NOT NULL
              ORDER BY NombreCompleto, Competencia";

        $rows = $this->Select($q);
        if (empty($rows)) return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>[]]);
        return json_encode(["Resultado"=>true,"Siguiente"=>true,"Data"=>$rows]);
    }

    // ==========================================
    // PRIVADOS
    // ==========================================
    protected function normalizarTelefono($t) {
        $t = preg_replace('/\D/', '', $t);
        if (strlen($t) === 11 && substr($t, 0, 1) === '1') $t = substr($t, 1);
        if (strlen($t) === 12 && substr($t, 0, 2) === '52') $t = substr($t, 2);
        return strlen($t) === 10 ? $t : $t;
    }
    protected function sanitize($str) {
        return addslashes(htmlspecialchars(strip_tags((string)$str), ENT_QUOTES, 'UTF-8'));
    }
}
?>
