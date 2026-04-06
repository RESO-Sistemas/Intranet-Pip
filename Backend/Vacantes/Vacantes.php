<?php
if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
} else {
    if (file_exists("./Conexiones/Conexiones.php")) {
        require_once("./Conexiones/Conexiones.php");
    } else if (file_exists("../Conexiones/Conexiones.php")) {
        require_once("../Conexiones/Conexiones.php");
    } else if (file_exists("../../Conexiones/Conexiones.php")) {
        require_once("../../Conexiones/Conexiones.php");
    } else if (file_exists("././Backend/Conexiones/Conexiones.php")) {
        require_once("././Backend/Conexiones/Conexiones.php");
    }
}

class Vacantes extends Conexiones
{
    // ==========================================
    // CRUD PRINCIPAL DE VACANTES
    // ==========================================

    /**
     * Obtener todas las vacantes con información relacionada
     */
    function getVacantes()
    {
        // Auto-cerrar vacantes activas y publicadas cuya fecha de cierre ya pasó
        $this->ProcedureExec("UPDATE Vacantes SET Estatus = 3 WHERE FechaCierre < CURDATE() AND Estatus = 2 AND Publicada = 1", array());

        $q = "SELECT v.*, 
                     a.NombreArea,
                     p.Puesto,
                     s.Sucursal,
                     CASE v.Estatus 
                        WHEN 1 THEN 'Borrador'
                        WHEN 2 THEN 'Activa'
                        WHEN 3 THEN 'Cerrada'
                     END AS EstatusTexto
              FROM Vacantes v 
              LEFT JOIN AreasTecnicas a ON v.IdAreaTecnica = a.IdAreaTecnica 
              LEFT JOIN Puestos p ON v.IdPuesto = p.IdPuesto
              LEFT JOIN SucursalDepto s ON v.IdSucursal = s.IdSucursal
              ORDER BY v.IdVacante DESC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener solo vacantes activas y publicadas (para portal público)
     */
    function getVacantesPublicadas()
    {
        // Auto-cerrar vacantes activas y publicadas cuya fecha de cierre ya pasó
        $this->ProcedureExec("UPDATE Vacantes SET Estatus = 3 WHERE FechaCierre < CURDATE() AND Estatus = 2 AND Publicada = 1", array());

        $q = "SELECT v.*, 
                     a.NombreArea,
                     p.Puesto,
                     s.Sucursal
              FROM Vacantes v 
              LEFT JOIN AreasTecnicas a ON v.IdAreaTecnica = a.IdAreaTecnica 
              LEFT JOIN Puestos p ON v.IdPuesto = p.IdPuesto
              LEFT JOIN SucursalDepto s ON v.IdSucursal = s.IdSucursal
              WHERE v.Estatus = 2 
                AND v.Publicada = 1 
                AND v.FechaApertura <= CURDATE() 
                AND (v.FechaCierre IS NULL OR v.FechaCierre >= CURDATE())
              ORDER BY v.FechaApertura DESC";
        return json_encode($this->Select($q));
    }

    /**
     * API GET: Obtener todas las vacantes con requisitos de CV y Solicitud de Empleo
     */
    function getRequisitosDocumentacionVacantes()
    {
        $q = "SELECT v.*, 
                     a.NombreArea,
                     p.Puesto,
                     s.Sucursal,
                     CASE 
                        WHEN v.BanderaCV = 1 AND v.BanderaSE = 1 THEN 'Ambas'
                        WHEN v.BanderaCV = 1 AND v.BanderaSE = 0 THEN 'Curriculum Vitae (CV)'
                        WHEN v.BanderaCV = 0 AND v.BanderaSE = 1 THEN 'Solicitud de Empleo'
                        ELSE 'Ninguna'
                     END AS RequisitoDocumentacion
              FROM Vacantes v
              LEFT JOIN AreasTecnicas a ON v.IdAreaTecnica = a.IdAreaTecnica 
              LEFT JOIN Puestos p ON v.IdPuesto = p.IdPuesto
              LEFT JOIN SucursalDepto s ON v.IdSucursal = s.IdSucursal
              WHERE v.Estatus = 2 
                AND v.Publicada = 1
                AND v.FechaApertura <= CURDATE() 
                AND (v.FechaCierre IS NULL OR v.FechaCierre >= CURDATE())
              ORDER BY v.NombreVacante ASC";
        return json_encode([
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $this->Select($q)
        ]);
    }

    /**
     * Obtener una vacante por ID con toda su información
     */
    function getVacanteById($IdVacante)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "SELECT v.*, 
                         a.NombreArea,
                         p.Puesto,
                         s.Sucursal
                  FROM Vacantes v 
                  LEFT JOIN AreasTecnicas a ON v.IdAreaTecnica = a.IdAreaTecnica 
                  LEFT JOIN Puestos p ON v.IdPuesto = p.IdPuesto
                  LEFT JOIN SucursalDepto s ON v.IdSucursal = s.IdSucursal
                  WHERE v.IdVacante = '$IdVacante'";
            $resultado = $this->Select($q);
            
            if (sizeof($resultado) > 0) {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => true,
                    "Datos" => $resultado[0]
                ];
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se encontró la vacante."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en getVacanteById: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al obtener la vacante."
            ]);
        }
    }

    /**
     * Agregar nueva vacante
     */
    function addVacante($NombreVacante, $IdAreaTecnica, $IdPuesto, $TipoContratacion, 
                        $IdSucursal, $DescripcionPuesto, $SalarioMinimo, $SalarioMaximo,
                        $FechaApertura, $FechaCierre, $BanderaCV, $BanderaSE)
    {
        try {
            // Convertir valores vacíos a NULL
            $IdAreaTecnica = empty($IdAreaTecnica) ? 'NULL' : "'$IdAreaTecnica'";
            $IdPuesto = empty($IdPuesto) ? 'NULL' : "'$IdPuesto'";
            $IdSucursal = empty($IdSucursal) ? 'NULL' : "'$IdSucursal'";
            $SalarioMinimo = empty($SalarioMinimo) ? 'NULL' : "'$SalarioMinimo'";
            $SalarioMaximo = empty($SalarioMaximo) ? 'NULL' : "'$SalarioMaximo'";
            $FechaCierre = empty($FechaCierre) ? 'NULL' : "'$FechaCierre'";
            
            $q = "CALL spAddVacante('$NombreVacante', $IdAreaTecnica, $IdPuesto, '$TipoContratacion', 
                  $IdSucursal, '$DescripcionPuesto', $SalarioMinimo, $SalarioMaximo,
                  '$FechaApertura', $FechaCierre, '$BanderaCV', '$BanderaSE')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La vacante ha sido registrada con éxito!",
                        "IdVacante" => $resultado[0]["IdVacante"]
                    ];
                } else {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ];
                }
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al registrar la vacante."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar la vacante."
            ]);
        }
    }

    /**
     * Actualizar vacante existente
     */
    function updateVacante($IdVacante, $NombreVacante, $IdAreaTecnica, $IdPuesto, $TipoContratacion, 
                           $IdSucursal, $DescripcionPuesto, $SalarioMinimo, $SalarioMaximo,
                           $FechaApertura, $FechaCierre, $BanderaCV, $BanderaSE)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            
            // Convertir valores vacíos a NULL
            $IdAreaTecnica = empty($IdAreaTecnica) ? 'NULL' : "'$IdAreaTecnica'";
            $IdPuesto = empty($IdPuesto) ? 'NULL' : "'$IdPuesto'";
            $IdSucursal = empty($IdSucursal) ? 'NULL' : "'$IdSucursal'";
            $SalarioMinimo = empty($SalarioMinimo) ? 'NULL' : "'$SalarioMinimo'";
            $SalarioMaximo = empty($SalarioMaximo) ? 'NULL' : "'$SalarioMaximo'";
            $FechaCierre = empty($FechaCierre) ? 'NULL' : "'$FechaCierre'";
            
            $q = "CALL spUpdateVacante('$IdVacante', '$NombreVacante', $IdAreaTecnica, $IdPuesto, 
                  '$TipoContratacion', $IdSucursal, '$DescripcionPuesto', $SalarioMinimo, $SalarioMaximo,
                  '$FechaApertura', $FechaCierre, '$BanderaCV', '$BanderaSE')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La vacante ha sido actualizada con éxito!"
                    ];
                } else {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ];
                }
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al actualizar la vacante."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updateVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar la vacante."
            ]);
        }
    }

    /**
     * Cambiar estatus de vacante (1=Borrador, 2=Activa, 3=Cerrada)
     */
    function cambiarEstatusVacante($IdVacante, $NuevoEstatus)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "CALL spCambiarEstatusVacante('$IdVacante', '$NuevoEstatus')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                $nuevoEstatus = $resultado[0]["NuevoEstatus"];
                if ($retorno == 1) {
                    $estatusTexto = "";
                    switch($nuevoEstatus) {
                        case 1: $estatusTexto = "borrador"; break;
                        case 2: $estatusTexto = "activa"; break;
                        case 3: $estatusTexto = "cerrada"; break;
                    }
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La vacante ha sido marcada como $estatusTexto!",
                        "NuevoEstatus" => $nuevoEstatus
                    ];
                } else {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ];
                }
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al cambiar el estatus."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en cambiarEstatusVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al cambiar el estatus."
            ]);
        }
    }

    /**
     * Publicar vacante (la hace no editable)
     */
    function publicarVacante($IdVacante)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "CALL spPublicarVacante('$IdVacante')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La vacante ha sido publicada con éxito!"
                    ];
                } else {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ];
                }
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al publicar la vacante."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en publicarVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al publicar la vacante."
            ]);
        }
    }

    /**
     * Eliminar vacante (solo borradores no publicados)
     */
    function deleteVacante($IdVacante)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "CALL spDeleteVacante('$IdVacante')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La vacante ha sido eliminada con éxito!"
                    ];
                } else {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ];
                }
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al eliminar la vacante."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deleteVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar la vacante."
            ]);
        }
    }

    // ==========================================
    // REQUISITOS DE VACANTES
    // ==========================================

    /**
     * Obtener requisitos de una vacante
     */
    function getRequisitosVacante($IdVacante)
    {
        $IdVacante = base64_decode($IdVacante);
        $q = "SELECT * FROM VacantesRequisitos WHERE IdVacante = '$IdVacante' ORDER BY Orden ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Agregar requisito a vacante
     */
    function addRequisitoVacante($IdVacante, $Requisito, $Orden)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "CALL spAddVacanteRequisito('$IdVacante', '$Requisito', '$Orden')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "Msg" => "Requisito agregado correctamente.",
                    "IdVacanteRequisito" => $resultado[0]["IdVacanteRequisito"]
                ]);
            }
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error al agregar requisito."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error: " . $e->getMessage()]);
        }
    }

    /**
     * Eliminar requisito de vacante
     */
    function deleteRequisitoVacante($IdVacanteRequisito)
    {
        try {
            $IdVacanteRequisito = base64_decode($IdVacanteRequisito);
            $q = "CALL spDeleteVacanteRequisito('$IdVacanteRequisito')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode(["Resultado" => true, "Siguiente" => true, "Msg" => "Requisito eliminado."]);
            }
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error al eliminar requisito."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error: " . $e->getMessage()]);
        }
    }

    // ==========================================
    // EVALUACIONES DE VACANTES
    // ==========================================

    /**
     * Obtener evaluaciones asignadas a una vacante
     */
    function getEvaluacionesVacante($IdVacante)
    {
        $IdVacante = base64_decode($IdVacante);
        $q = "SELECT ve.*, e.Titulo AS NombreEvaluacion, pv.NombreProceso
              FROM VacantesEvaluaciones ve
              INNER JOIN Evaluaciones e ON ve.IdEvaluacion = e.idEvaluaciones
              INNER JOIN ProcesosVacantes pv ON ve.IdProceso = pv.IdProceso
              WHERE ve.IdVacante = '$IdVacante'
              ORDER BY pv.IdProceso ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Agregar evaluación a vacante
     */
    function addEvaluacionVacante($IdVacante, $IdEvaluacion, $IdProceso)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "CALL spAddVacanteEvaluacion('$IdVacante', '$IdEvaluacion', '$IdProceso')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    return json_encode([
                        "Resultado" => true,
                        "Siguiente" => true,
                        "Msg" => "Evaluación asignada correctamente."
                    ]);
                } else {
                    return json_encode(["Resultado" => true, "Siguiente" => false, "Msg" => $retorno]);
                }
            }
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error al asignar evaluación."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error: " . $e->getMessage()]);
        }
    }

    /**
     * Eliminar evaluación de vacante
     */
    function deleteEvaluacionVacante($IdVacanteEvaluacion)
    {
        try {
            $IdVacanteEvaluacion = base64_decode($IdVacanteEvaluacion);
            $q = "CALL spDeleteVacanteEvaluacion('$IdVacanteEvaluacion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode(["Resultado" => true, "Siguiente" => true, "Msg" => "Evaluación removida."]);
            }
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error al remover evaluación."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error: " . $e->getMessage()]);
        }
    }

    // ==========================================
    // INDUCCIONES DE VACANTES
    // ==========================================

    /**
     * Obtener inducciones asignadas a una vacante
     */
    function getInduccionesVacante($IdVacante)
    {
        $IdVacante = base64_decode($IdVacante);
        $q = "SELECT vi.*, i.NombreInduccion
              FROM VacantesInducciones vi
              INNER JOIN InduccionesVacantes i ON vi.IdInduccion = i.IdInduccion
              WHERE vi.IdVacante = '$IdVacante'
              ORDER BY i.NombreInduccion ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Agregar inducción a vacante
     */
    function addInduccionVacante($IdVacante, $IdInduccion)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $q = "CALL spAddVacanteInduccion('$IdVacante', '$IdInduccion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    return json_encode([
                        "Resultado" => true,
                        "Siguiente" => true,
                        "Msg" => "Inducción asignada correctamente."
                    ]);
                } else {
                    return json_encode(["Resultado" => true, "Siguiente" => false, "Msg" => $retorno]);
                }
            }
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error al asignar inducción."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error: " . $e->getMessage()]);
        }
    }

    /**
     * Eliminar inducción de vacante
     */
    function deleteInduccionVacante($IdVacanteInduccion)
    {
        try {
            $IdVacanteInduccion = base64_decode($IdVacanteInduccion);
            $q = "CALL spDeleteVacanteInduccion('$IdVacanteInduccion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode(["Resultado" => true, "Siguiente" => true, "Msg" => "Inducción removida."]);
            }
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error al remover inducción."]);
        } catch (\Exception $e) {
            return json_encode(["Resultado" => false, "Siguiente" => false, "Msg" => "Error: " . $e->getMessage()]);
        }
    }

    // ==========================================
    // FUNCIONES AUXILIARES PARA COMBOS
    // ==========================================

    /**
     * Obtener áreas técnicas activas para combo
     */
    function getAreasTecnicasActivas()
    {
        $q = "SELECT IdAreaTecnica, NombreArea FROM AreasTecnicas WHERE Estatus = 1 ORDER BY NombreArea ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener puestos para combo
     */
    function getPuestosActivos()
    {
        $q = "SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener sucursales para combo
     */
    function getSucursalesActivas()
    {
        $q = "SELECT IdSucursal, Sucursal FROM SucursalDepto ORDER BY Sucursal ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener procesos de vacantes activos para combo
     */
    function getProcesosVacantesActivos()
    {
        $q = "SELECT IdProceso, NombreProceso FROM ProcesosVacantes WHERE Estatus = 1 ORDER BY IdProceso ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener evaluaciones activas para combo
     */
    function getEvaluacionesActivas()
    {
        $q = "SELECT idEvaluaciones, Titulo, TipoEvaluacion, DirigidoA,
                     CASE WHEN TipoEvaluacion = 1 THEN 'Evaluación 360°' ELSE 'Encuesta Normal' END AS TxTipo
              FROM Evaluaciones 
              WHERE Status = 1 
                AND (TipoEvaluacion = 1 OR (TipoEvaluacion = 2 AND DirigidoA = 2))
                AND PreguntasAceptadas = 1
              ORDER BY Titulo ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener inducciones activas para combo
     */
    function getInduccionesActivas()
    {
        $q = "SELECT IdInduccion, NombreInduccion FROM InduccionesVacantes WHERE Estatus = 1 ORDER BY NombreInduccion ASC";
        return json_encode($this->Select($q));
    }
}
