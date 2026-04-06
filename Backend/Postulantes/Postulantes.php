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

class Postulantes extends Conexiones
{
    // ==========================================
    // CRUD DE POSTULANTES
    // ==========================================

    /**
     * Obtener todos los postulantes
     */
    function getAllPostulantes()
    {
        $q = "CALL spGetAllPostulantes()";
        $resultado = $this->Procedure($q);
        return json_encode([
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
        ]);
    }

    /**
     * Buscar postulante por correo, CURP o nombre
     */
    function searchPostulante($busqueda)
    {
        $busqueda = $this->sanitize($busqueda);
        $q = "CALL spSearchPostulante('$busqueda')";
        $resultado = $this->Procedure($q);
        return json_encode([
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
        ]);
    }

    /**
     * Agregar nuevo postulante
     */
    function addPostulante($Nombre, $ApellidoPaterno, $ApellidoMaterno, $CURP, 
                           $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad)
    {
        try {
            $Nombre = $this->sanitize($Nombre);
            $ApellidoPaterno = $this->sanitize($ApellidoPaterno);
            $ApellidoMaterno = $this->sanitize($ApellidoMaterno);
            $CURP = $this->sanitize($CURP);
            $Telefono = $this->sanitize($Telefono);
            $CorreoElectronico = $this->sanitize($CorreoElectronico);
            $Direccion = $this->sanitize($Direccion);
            $Estado = $this->sanitize($Estado);
            $Ciudad = $this->sanitize($Ciudad);
            
            // Convertir valores vacíos a string vacío para el SP
            $ApellidoMaterno = empty($ApellidoMaterno) ? '' : $ApellidoMaterno;
            $CURP = empty($CURP) ? '' : $CURP;
            $Direccion = empty($Direccion) ? '' : $Direccion;
            $Estado = empty($Estado) ? '' : $Estado;
            $Ciudad = empty($Ciudad) ? '' : $Ciudad;
            
            $q = "CALL spAddPostulante('$Nombre', '$ApellidoPaterno', '$ApellidoMaterno', 
                  '$CURP', '$Telefono', '$CorreoElectronico', '$Direccion', '$Estado', '$Ciudad')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El postulante ha sido registrado con éxito!",
                        "IdPostulante" => $resultado[0]["IdPostulante"]
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
                    "Msg" => "Ha ocurrido un error al registrar el postulante."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno al registrar el postulante."
            ]);
        }
    }

    /**
     * Actualizar datos de postulante
     */
    function updatePostulante($IdPostulante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
                              $CURP, $Telefono, $CorreoElectronico, $Direccion, $Estado, $Ciudad)
    {
        try {
            $IdPostulante = base64_decode($IdPostulante);
            $Nombre = $this->sanitize($Nombre);
            $ApellidoPaterno = $this->sanitize($ApellidoPaterno);
            $ApellidoMaterno = $this->sanitize($ApellidoMaterno);
            $CURP = $this->sanitize($CURP);
            $Telefono = $this->sanitize($Telefono);
            $CorreoElectronico = $this->sanitize($CorreoElectronico);
            $Direccion = $this->sanitize($Direccion);
            $Estado = $this->sanitize($Estado);
            $Ciudad = $this->sanitize($Ciudad);
            
            $q = "CALL spUpdatePostulante('$IdPostulante', '$Nombre', '$ApellidoPaterno', 
                  '$ApellidoMaterno', '$CURP', '$Telefono', '$CorreoElectronico', 
                  '$Direccion', '$Estado', '$Ciudad')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡Datos del postulante actualizados!"
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
                    "Msg" => "Ha ocurrido un error al actualizar."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updatePostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno al actualizar."
            ]);
        }
    }

    /**
     * Eliminar postulante
     */
    function deletePostulante($IdPostulante)
    {
        try {
            $IdPostulante = base64_decode($IdPostulante);
            $q = "CALL spDeletePostulante('$IdPostulante')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "Postulante eliminado correctamente."
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
                    "Msg" => "Error al eliminar."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deletePostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno al eliminar."
            ]);
        }
    }

    // ==========================================
    // POSTULACIONES (PostulantesVacantes)
    // ==========================================

    /**
     * Obtener postulantes de una vacante específica
     */
    function getPostulantesByVacante($IdVacante)
    {
        $IdVacante = base64_decode($IdVacante);
        $q = "CALL spGetPostulantesByVacante('$IdVacante')";
        $resultado = $this->Procedure($q);
        return json_encode([
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => $resultado
        ]);
    }

    /**
     * Obtener detalle completo de un postulante en una vacante
     */
    function getPostulanteDetalle($IdPostulanteVacante)
    {
        $IdPostulanteVacante = base64_decode($IdPostulanteVacante);
        $q = "CALL spGetPostulanteDetalle('$IdPostulanteVacante')";
        $resultado = $this->Procedure($q);
        
        if (sizeof($resultado) > 0) {
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado[0]
            ]);
        } else {
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "No se encontró el registro."
            ]);
        }
    }

    /**
     * Obtener datos de postulante por IdPostulante
     */
    function getPostulanteById($IdPostulante)
    {
        try {
            $IdPostulante = is_numeric($IdPostulante) ? intval($IdPostulante) : intval(base64_decode($IdPostulante));
            $q = "SELECT IdPostulante, Nombre, ApellidoPaterno, ApellidoMaterno, CURP, Telefono, CorreoElectronico, Direccion, Estado, Ciudad
                  FROM Postulantes
                  WHERE IdPostulante = $IdPostulante
                  LIMIT 1";
            $resultado = $this->Procedure($q);

            if (sizeof($resultado) > 0) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "Data" => $resultado[0]
                ]);
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "No se encontró el postulante."
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPostulanteById: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al obtener postulante."
            ]);
        }
    }

    /**
     * Agregar postulación (postulante a vacante)
     */
    function addPostulacion($IdVacante, $IdPostulante, $RutaCV, $RutaSolicitudEmpleo, $Observaciones)
    {
        try {
            $IdVacante = base64_decode($IdVacante);
            $IdPostulante = base64_decode($IdPostulante);
            $RutaCV = $this->sanitize($RutaCV);
            $RutaSolicitudEmpleo = $this->sanitize($RutaSolicitudEmpleo);
            $Observaciones = $this->sanitize($Observaciones);
            
            // Convertir valores vacíos a NULL
            $RutaCV = empty($RutaCV) ? 'NULL' : "'$RutaCV'";
            $RutaSolicitudEmpleo = empty($RutaSolicitudEmpleo) ? 'NULL' : "'$RutaSolicitudEmpleo'";
            $Observaciones = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            
            $q = "CALL spAddPostulacion('$IdVacante', '$IdPostulante', $RutaCV, $RutaSolicitudEmpleo, $Observaciones)";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡Postulación registrada con éxito!",
                        "IdPostulanteVacante" => $resultado[0]["IdPostulanteVacante"]
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
                    "Msg" => "Error al registrar la postulación."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addPostulacion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno."
            ]);
        }
    }

    /**
     * Agregar postulante nuevo y crear postulación en un solo paso
     */
    function addPostulanteConPostulacion($IdVacante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
                                          $CURP, $Telefono, $CorreoElectronico, $Direccion, 
                                          $Estado, $Ciudad, $RutaCV, $RutaSolicitudEmpleo, $Observaciones, $IdEmpleado = null)
    {
        try {
            // Primero verificar si ya existe el postulante por correo o CURP
            $CorreoElectronico = $this->sanitize($CorreoElectronico);
            $CURP = $this->sanitize($CURP);
            $Telefono = $this->normalizarTelefono($Telefono);
            
            $qBuscar = "SELECT IdPostulante, Telefono FROM Postulantes WHERE LOWER(CorreoElectronico) = LOWER('$CorreoElectronico')";
            if (!empty($CURP)) {
                $qBuscar .= " OR UPPER(CURP) = UPPER('$CURP')";
            }
            $existente = $this->Procedure($qBuscar);
            
            if (sizeof($existente) > 0) {
                // Si ya existe, usar ese postulante
                $IdPostulante = $existente[0]["IdPostulante"];
                $telefonoActual = $existente[0]["Telefono"];
                
                // Si el teléfono cambió, agregarlo al histórico (NO actualizar el principal)
                if (!empty($Telefono) && $Telefono != $telefonoActual && $this->validarFormatoTelefono($Telefono)) {
                    $this->ProcedureExec(
                        "INSERT IGNORE INTO PostulantesTelefonos (IdPostulante, Telefono, Observaciones) 
                         VALUES ($IdPostulante, '$Telefono', 'Nueva postulación')",
                        []
                    );
                }
            } else {
                // Si no existe, crear nuevo postulante
                $resultAdd = json_decode($this->addPostulante($Nombre, $ApellidoPaterno, $ApellidoMaterno, 
                                                              $CURP, $Telefono, $CorreoElectronico, 
                                                              $Direccion, $Estado, $Ciudad), true);
                
                if (!$resultAdd["Siguiente"]) {
                    return json_encode($resultAdd);
                }
                $IdPostulante = $resultAdd["IdPostulante"];
            }

            // Asociar el IdEmpleado internamente si se brindó
            if (!empty($IdEmpleado)) {
                $IdEmpleadoSQL = $this->sanitize($IdEmpleado);
                $this->ProcedureExec("UPDATE Postulantes SET IdEmpleado = '$IdEmpleadoSQL' WHERE IdPostulante = '$IdPostulante'", []);
            }
            
            // Crear la postulación
            $IdVacanteDecoded = base64_decode($IdVacante);
            $RutaCV = $this->sanitize($RutaCV);
            $RutaSolicitudEmpleo = $this->sanitize($RutaSolicitudEmpleo);
            $Observaciones = $this->sanitize($Observaciones);
            
            $RutaCVSQL = empty($RutaCV) ? 'NULL' : "'$RutaCV'";
            $RutaSolicitudEmpleoSQL = empty($RutaSolicitudEmpleo) ? 'NULL' : "'$RutaSolicitudEmpleo'";
            $ObservacionesSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            
            $q = "CALL spAddPostulacion('$IdVacanteDecoded', '$IdPostulante', $RutaCVSQL, $RutaSolicitudEmpleoSQL, $ObservacionesSQL)";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    return json_encode([
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡Postulante registrado y postulación creada con éxito!",
                        "IdPostulante" => $IdPostulante,
                        "IdPostulanteVacante" => $resultado[0]["IdPostulanteVacante"]
                    ]);
                } else {
                    return json_encode([
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ]);
                }
            }
            
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al crear la postulación."
            ]);
        } catch (\Exception $e) {
            error_log("Error en addPostulanteConPostulacion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno: " . $e->getMessage()
            ]);
        }
    }

    /**
     * Actualizar estatus de postulación
     */
    function updateEstatusPostulacion($IdPostulanteVacante, $EstatusPostulacion, $Observaciones, $UsuarioRegistro = 0)
    {
        try {
            $IdPostulanteVacante = base64_decode($IdPostulanteVacante);
            $Observaciones = $this->sanitize($Observaciones);
            $ObservacionesSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            $UsuarioRegistro = intval($UsuarioRegistro);
            
            $q = "CALL spUpdateEstatusPostulacion('$IdPostulanteVacante', '$EstatusPostulacion', $ObservacionesSQL, '$UsuarioRegistro')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "Estatus actualizado correctamente."
                ]);
            }
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el estatus."
            ]);
        } catch (\Exception $e) {
            error_log("Error en updateEstatusPostulacion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno."
            ]);
        }
    }

    /**
     * Eliminar postulación
     */
    function deletePostulacion($IdPostulanteVacante)
    {
        try {
            $IdPostulanteVacante = base64_decode($IdPostulanteVacante);
            $q = "CALL spDeletePostulacion('$IdPostulanteVacante')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "Postulación eliminada correctamente."
                ]);
            }
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar."
            ]);
        } catch (\Exception $e) {
            error_log("Error en deletePostulacion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno."
            ]);
        }
    }

    /**
     * Obtener estadísticas de postulantes por vacante
     */
    function getEstadisticasPostulantes($IdVacante)
    {
        $IdVacante = base64_decode($IdVacante);
        $q = "CALL spGetEstadisticasPostulantes('$IdVacante')";
        $resultado = $this->Procedure($q);
        
        if (sizeof($resultado) > 0) {
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado[0]
            ]);
        }
        
        return json_encode([
            "Resultado" => true,
            "Siguiente" => true,
            "Data" => [
                "TotalPostulantes" => 0,
                "EnProceso" => 0,
                "Aceptados" => 0,
                "Rechazados" => 0,
                "Finalizados" => 0
            ]
        ]);
    }

    // ==========================================
    // REQUISITOS DE POSTULANTES
    // ==========================================

    /**
     * Obtener requisitos contestados por un postulante
     */
    function getPostulanteRequisitos($IdPostulanteVacante)
    {
        try {
            $IdPostulanteVacante = intval(base64_decode($IdPostulanteVacante));
            $q = "SELECT vr.IdVacanteRequisito, vr.Requisito, vr.Orden,
                         pr.IdPostulanteRequisito, pr.Respuesta, pr.Cumple, pr.FechaRespuesta
                  FROM VacantesRequisitos vr
                  INNER JOIN PostulantesVacantes pv ON vr.IdVacante = pv.IdVacante
                  LEFT JOIN PostulantesRequisitos pr ON pr.IdVacanteRequisito = vr.IdVacanteRequisito
                      AND pr.IdPostulanteVacante = pv.IdPostulanteVacante
                  WHERE pv.IdPostulanteVacante = $IdPostulanteVacante
                  ORDER BY vr.Orden ASC";
            $resultado = $this->SelectNotClose($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPostulanteRequisitos: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => []
            ]);
        }
    }

    /**
     * Agregar/actualizar respuesta de requisito
     */
    function addPostulanteRequisito($IdPostulanteVacante, $IdVacanteRequisito, $Respuesta, $Cumple)
    {
        try {
            $IdPostulanteVacante = intval(base64_decode($IdPostulanteVacante));
            $IdVacanteRequisito = intval(base64_decode($IdVacanteRequisito));
            $Respuesta = $this->sanitize($Respuesta);
            $CumpleSQL = ($Cumple === '' || $Cumple === null) ? 'NULL' : intval($Cumple);
            
            $q = "CALL spAddPostulanteRequisito($IdPostulanteVacante, $IdVacanteRequisito, '$Respuesta', $CumpleSQL)";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "Requisito actualizado."
                ]);
            }
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar requisito."
            ]);
        } catch (\Exception $e) {
            error_log("Error en addPostulanteRequisito: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno."
            ]);
        }
    }

    /**
     * Actualizar evaluación de requisito (Respuesta y Cumple)
     */
    function updatePostulanteRequisito($IdPostulanteRequisito, $Respuesta, $Cumple)
    {
        try {
            $IdPostulanteRequisito = intval(base64_decode($IdPostulanteRequisito));
            $Respuesta = $this->sanitize($Respuesta);
            $CumpleSQL = ($Cumple === '' || $Cumple === null) ? 'NULL' : intval($Cumple);
            $q = "CALL spUpdatePostulanteRequisito($IdPostulanteRequisito, '$Respuesta', $CumpleSQL)";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "Evaluación actualizada."
                ]);
            }
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar."
            ]);
        } catch (\Exception $e) {
            error_log("Error en updatePostulanteRequisito: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno."
            ]);
        }
    }

    // ==========================================
    // HISTORIAL DE PROCESOS
    // ==========================================

    /**
     * Obtener historial de un postulante en una vacante
     */
    function getPostulanteHistorial($IdPostulanteVacante)
    {
        try {
            $IdPostulanteVacante = intval(base64_decode($IdPostulanteVacante));
            $q = "CALL spGetPostulanteHistorial($IdPostulanteVacante)";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPostulanteHistorial: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => $e->getMessage()
            ]);
        }
    }

    /**
     * Agregar registro de historial (avance de proceso)
     */
    function addPostulanteHistorial($IdPostulanteVacante, $IdProceso, $Observaciones, $Resultado, $UsuarioRegistro)
    {
        try {
            $IdPostulanteVacante = intval(base64_decode($IdPostulanteVacante));
            $IdProceso = intval($IdProceso);
            $Observaciones = $this->sanitize($Observaciones);
            $ResultadoSQL = ($Resultado === '' || $Resultado === null) ? 'NULL' : intval($Resultado);
            $UsuarioRegistro = intval($UsuarioRegistro);
            
            $q = "CALL spAddPostulanteHistorial($IdPostulanteVacante, $IdProceso, '$Observaciones', $ResultadoSQL, $UsuarioRegistro)";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                // === AUTO-ASIGNAR EVALUACIONES DEL PROCESO ===
                // Buscar la vacante de este postulante
                $Con2 = new Conexiones();
                $qVacante = "SELECT IdVacante FROM PostulantesVacantes WHERE IdPostulanteVacante = $IdPostulanteVacante";
                $resVacante = $Con2->Select($qVacante);
                
                if (count($resVacante) > 0) {
                    $IdVacante = $resVacante[0]['IdVacante'];
                    
                    // Buscar evaluaciones amarradas a este proceso en esta vacante
                    $Con3 = new Conexiones();
                    $qEvals = "SELECT ve.IdVacanteEvaluacion, ve.IdEvaluacion 
                               FROM VacantesEvaluaciones ve
                               INNER JOIN Evaluaciones e ON e.idEvaluaciones = ve.IdEvaluacion
                               WHERE ve.IdVacante = '$IdVacante' 
                                 AND ve.IdProceso = '$IdProceso'
                                 AND e.TipoEvaluacion = 2 
                                 AND e.DirigidoA = 2
                                 AND e.Status = 1
                                 AND e.PreguntasAceptadas = 1";
                    $resEvals = $Con3->Select($qEvals);
                    
                    $evaluacionesAsignadas = 0;
                    foreach ($resEvals as $eval) {
                        $IdVacanteEvaluacion = $eval['IdVacanteEvaluacion'];
                        
                        // Verificar que no exista ya asignada
                        $Con4 = new Conexiones();
                        $qCheck = "SELECT IdPostulanteEvaluacion FROM PostulantesEvaluaciones 
                                   WHERE IdPostulanteVacante = $IdPostulanteVacante 
                                     AND IdVacanteEvaluacion = $IdVacanteEvaluacion";
                        $resCheck = $Con4->Select($qCheck);
                        
                        if (count($resCheck) == 0) {
                            $Con5 = new Conexiones();
                            $qInsert = "INSERT INTO PostulantesEvaluaciones 
                                        (IdPostulanteVacante, IdVacanteEvaluacion, EstatusEvaluacion) 
                                        VALUES ($IdPostulanteVacante, $IdVacanteEvaluacion, 1)";
                            $Con5->ExecuteQuery($qInsert, array());
                            $evaluacionesAsignadas++;
                        }
                    }
                    
                    $msgExtra = $evaluacionesAsignadas > 0 
                        ? " Se asignaron $evaluacionesAsignadas evaluación(es) al postulante." 
                        : "";
                }
                
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "¡Historial registrado con éxito!" . ($msgExtra ?? ""),
                    "IdPostulanteHistorial" => $resultado[0]["IdPostulanteHistorial"],
                    "EvaluacionesAsignadas" => $evaluacionesAsignadas ?? 0
                ]);
            }
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar historial."
            ]);
        } catch (\Exception $e) {
            error_log("Error en addPostulanteHistorial: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error interno: " . $e->getMessage()
            ]);
        }
    }

    // ==========================================
    // POSTULANTES (VISTA GENERAL)
    // ==========================================

    /**
     * Obtener todos los postulantes con información resumida para la vista general
     */
    function getAllPostulantesGeneral()
    {
        try {
            $q = "CALL spGetAllPostulantesGeneral()";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getAllPostulantesGeneral: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => "Error al obtener postulantes."
            ]);
        }
    }

    /**
     * Obtener historial completo de postulaciones de un postulante (todas las vacantes)
     */
    function getPostulanteHistorialCompleto($IdPostulante)
    {
        try {
            $IdPostulante = intval(base64_decode($IdPostulante));
            $q = "CALL spGetPostulanteHistorialCompleto($IdPostulante)";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPostulanteHistorialCompleto: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => "Error al obtener historial."
            ]);
        }
    }

    /**
     * Obtener procesos (historial) de una postulación específica
     */
    function getProcesosPostulacion($IdPostulanteVacante)
    {
        try {
            $IdPostulanteVacante = intval(base64_decode($IdPostulanteVacante));
            $q = "SELECT 
                    ph.IdPostulanteHistorial,
                    ph.IdPostulanteVacante,
                    ph.IdProceso,
                    ph.Fecha,
                    ph.Observaciones,
                    ph.Resultado,
                    ph.UsuarioRegistro,
                    pv.NombreProceso,
                    IFNULL(
                        e.Nombre,
                        CASE WHEN ph.UsuarioRegistro IS NOT NULL AND ph.UsuarioRegistro > 0 
                             THEN CONCAT('Usuario #', ph.UsuarioRegistro) 
                             ELSE NULL 
                        END
                    ) AS NombreUsuario
                  FROM PostulantesHistorial ph
                  LEFT JOIN ProcesosVacantes pv ON pv.IdProceso = ph.IdProceso
                  LEFT JOIN Empleados e ON e.NoEmpleado = ph.UsuarioRegistro
                  WHERE ph.IdPostulanteVacante = $IdPostulanteVacante
                  ORDER BY ph.Fecha ASC";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getProcesosPostulacion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => "Error al obtener procesos: " . $e->getMessage()
            ]);
        }
    }

    // ==========================================
    // PORTAL CANDIDATO (AUTO-LOGIN Y TRAZABILIDAD)
    // ==========================================

    /**
     * Validar credenciales de candidato (CURP + Teléfono)
     * Acepta cualquier teléfono registrado históricamente
     */
    public function validarCandidato($curp, $telefono)
    {
        try {
            $curp = $this->sanitize($curp);
            $telefono = $this->normalizarTelefono($telefono);
            
            // Validar formato
            if (!$this->validarFormatoTelefono($telefono)) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "El teléfono debe tener exactamente 10 dígitos numéricos."
                ]);
            }
            
            // Buscar en tabla principal Y en histórico
            $q = "SELECT p.IdPostulante, p.Nombre, p.ApellidoPaterno, p.ApellidoMaterno, 
                         p.CURP, p.CorreoElectronico, p.Telefono
                  FROM Postulantes p
                  LEFT JOIN PostulantesTelefonos pt ON pt.IdPostulante = p.IdPostulante AND pt.Activo = 1
                  WHERE UPPER(p.CURP) = UPPER('$curp') 
                  AND (p.Telefono = '$telefono' OR pt.Telefono = '$telefono')
                  LIMIT 1";
            
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                return json_encode([
                    "Resultado" => true,
                    "Data" => $resultado[0]
                ]);
            } else {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "No encontramos postulaciones con ese CURP y Teléfono. Verifica que sean correctos o contacta a Recursos Humanos."
                ]);
            }
        } catch (\Exception $e) {
            error_log("Error en validarCandidato: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error interno al validar."
            ]);
        }
    }

    /**
     * Obtener las postulaciones de un candidato por su CURP
     */
    public function getPostulacionesByCurp($curp)
    {
        try {
            $curp = $this->sanitize($curp);
            
            $q = "SELECT 
                    pv.IdPostulanteVacante,
                    pv.IdVacante,
                    v.NombreVacante,
                    a.NombreArea,
                    s.Sucursal,
                    pv.FechaPostulacion,
                    pv.EstatusPostulacion 
                  FROM PostulantesVacantes pv
                  INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
                  INNER JOIN Vacantes v ON v.IdVacante = pv.IdVacante
                  LEFT JOIN AreasTecnicas a ON a.IdAreaTecnica = v.IdAreaTecnica
                  LEFT JOIN SucursalDepto s ON s.IdSucursal = v.IdSucursal
                  WHERE UPPER(p.CURP) = UPPER('$curp')
                  ORDER BY pv.FechaPostulacion DESC";
                  
            $resultado = $this->Procedure($q);
            
            return json_encode([
                "Resultado" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getPostulacionesByCurp: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Data" => [],
                "Msg" => "Error interno: " . $e->getMessage()
            ]);
        }
    }

    /**
     * Verificar si el candidato ya está postulado a una vacante en concreto
     */
    public function checkPostulacionDuplicada($curp, $idVacante)
    {
        try {
            $curp = $this->sanitize($curp);
            $idVacanteSQL = is_numeric($idVacante) ? intval($idVacante) : intval(base64_decode($idVacante));
            
            $q = "SELECT pv.IdPostulanteVacante
                  FROM PostulantesVacantes pv
                  INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
                  WHERE UPPER(p.CURP) = UPPER('$curp')
                  AND pv.IdVacante = $idVacanteSQL
                  LIMIT 1";
                  
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                return json_encode([
                    "Resultado" => true,
                    "Duplicada" => true
                ]);
            } else {
                return json_encode([
                    "Resultado" => true,
                    "Duplicada" => false
                ]);
            }
        } catch (\Exception $e) {
            error_log("Error en checkPostulacionDuplicada: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error al comprobar duplicidad."
            ]);
        }
    }

    // ==========================================
    // GESTIÓN DE TELÉFONOS HISTÓRICOS
    // ==========================================

    /**
     * Obtener histórico de teléfonos de un postulante
     */
    public function getTelefonosHistoricoByPostulante($IdPostulante)
    {
        try {
            $IdPostulante = is_numeric($IdPostulante) ? intval($IdPostulante) : intval(base64_decode($IdPostulante));
            
            $q = "SELECT 
                    pt.IdTelefonoHistorico,
                    pt.IdPostulante,
                    pt.Telefono,
                    pt.FechaRegistro,
                    pt.Activo,
                    pt.UsuarioModifico,
                    pt.Observaciones,
                    IFNULL(e.Nombre, 'Sistema') AS NombreUsuario,
                    p.Telefono AS TelefonoActual
                  FROM PostulantesTelefonos pt
                  LEFT JOIN Empleados e ON e.NoEmpleado = pt.UsuarioModifico
                  INNER JOIN Postulantes p ON p.IdPostulante = pt.IdPostulante
                  WHERE pt.IdPostulante = $IdPostulante
                  ORDER BY pt.FechaRegistro DESC";
            
            $resultado = $this->Procedure($q);
            
            return json_encode([
                "Resultado" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getTelefonosHistoricoByPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Data" => [],
                "Msg" => "Error al obtener histórico de teléfonos."
            ]);
        }
    }

    /**
     * Actualizar teléfono principal de un postulante (solo RH)
     * También lo registra en el histórico
     */
    public function actualizarTelefonoPostulante($IdPostulante, $nuevoTelefono, $UsuarioRH, $Observaciones = '')
    {
        try {
            $IdPostulante = is_numeric($IdPostulante) ? intval($IdPostulante) : intval(base64_decode($IdPostulante));
            $nuevoTelefono = $this->normalizarTelefono($nuevoTelefono);
            $UsuarioRH = intval($UsuarioRH);
            $Observaciones = $this->sanitize($Observaciones);
            
            if (!$this->validarFormatoTelefono($nuevoTelefono)) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "Formato de teléfono inválido. Debe tener 10 dígitos."
                ]);
            }
            
            // Verificar que el teléfono no esté usado por otro postulante como teléfono principal
            $qCheck = "SELECT IdPostulante, CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto 
                       FROM Postulantes 
                       WHERE Telefono = '$nuevoTelefono' AND IdPostulante != $IdPostulante 
                       LIMIT 1";
            $existe = $this->Procedure($qCheck);
            
            if (sizeof($existe) > 0) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "Este teléfono ya está registrado como principal de: " . $existe[0]['NombreCompleto']
                ]);
            }
            
            // Actualizar teléfono principal
            $qUpdate = "UPDATE Postulantes 
                        SET Telefono = '$nuevoTelefono' 
                        WHERE IdPostulante = $IdPostulante";
            $this->ProcedureExec($qUpdate, []);
            
            // Agregar al histórico con observaciones
            $ObsSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            $qHistorico = "INSERT IGNORE INTO PostulantesTelefonos 
                           (IdPostulante, Telefono, UsuarioModifico, Observaciones) 
                           VALUES ($IdPostulante, '$nuevoTelefono', $UsuarioRH, $ObsSQL)";
            $this->ProcedureExec($qHistorico, []);
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Msg" => "Teléfono actualizado correctamente."
            ]);
        } catch (\Exception $e) {
            error_log("Error en actualizarTelefonoPostulante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error al actualizar: " . $e->getMessage()
            ]);
        }
    }

    /**
     * Agregar teléfono secundario al histórico (sin cambiar el principal)
     */
    public function agregarTelefonoSecundario($IdPostulante, $telefono, $UsuarioRH = null, $Observaciones = '')
    {
        try {
            $IdPostulante = is_numeric($IdPostulante) ? intval($IdPostulante) : intval(base64_decode($IdPostulante));
            $telefono = $this->normalizarTelefono($telefono);
            $UsuarioRH = $UsuarioRH ? intval($UsuarioRH) : 'NULL';
            $Observaciones = $this->sanitize($Observaciones);
            
            if (!$this->validarFormatoTelefono($telefono)) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "Formato de teléfono inválido."
                ]);
            }
            
            $ObsSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            $qInsert = "INSERT IGNORE INTO PostulantesTelefonos 
                        (IdPostulante, Telefono, UsuarioModifico, Observaciones) 
                        VALUES ($IdPostulante, '$telefono', $UsuarioRH, $ObsSQL)";
            
            $this->ProcedureExec($qInsert, []);
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Msg" => "Teléfono secundario agregado al histórico."
            ]);
        } catch (\Exception $e) {
            error_log("Error en agregarTelefonoSecundario: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error al agregar teléfono."
            ]);
        }
    }

    /**
     * Desactivar un teléfono del histórico
     */
    public function desactivarTelefono($IdTelefonoHistorico, $UsuarioRH)
    {
        try {
            $IdTelefonoHistorico = intval($IdTelefonoHistorico);
            $UsuarioRH = intval($UsuarioRH);
            
            $qUpdate = "UPDATE PostulantesTelefonos 
                        SET Activo = 0, UsuarioModifico = $UsuarioRH 
                        WHERE IdTelefonoHistorico = $IdTelefonoHistorico";
            $this->ProcedureExec($qUpdate, []);
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Msg" => "Teléfono desactivado del histórico."
            ]);
        } catch (\Exception $e) {
            error_log("Error en desactivarTelefono: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error al desactivar."
            ]);
        }
    }

    /**
     * Reactivar un teléfono en el histórico
     */
    public function reactivarTelefono($IdTelefonoHistorico, $UsuarioRH)
    {
        try {
            $IdTelefonoHistorico = intval($IdTelefonoHistorico);
            $UsuarioRH = intval($UsuarioRH);
            
            $qUpdate = "UPDATE PostulantesTelefonos 
                        SET Activo = 1, UsuarioModifico = $UsuarioRH 
                        WHERE IdTelefonoHistorico = $IdTelefonoHistorico";
            $this->ProcedureExec($qUpdate, []);
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Msg" => "Teléfono reactivado en el histórico."
            ]);
        } catch (\Exception $e) {
            error_log("Error en reactivarTelefono: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error al reactivar."
            ]);
        }
    }

    /**
     * Eliminar permanentemente un teléfono del histórico
     */
    public function eliminarTelefono($IdTelefonoHistorico, $UsuarioRH)
    {
        try {
            $IdTelefonoHistorico = intval($IdTelefonoHistorico);
            
            $qDelete = "DELETE FROM PostulantesTelefonos 
                        WHERE IdTelefonoHistorico = $IdTelefonoHistorico";
            $this->ProcedureExec($qDelete, []);
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Msg" => "Teléfono eliminado permanentemente del histórico."
            ]);
        } catch (\Exception $e) {
            error_log("Error en eliminarTelefono: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error al eliminar."
            ]);
        }
    }

    // ==========================================
    // UTILIDADES
    // ==========================================

    /**
     * Normalizar teléfono a formato estándar (10 dígitos)
     */
    private function normalizarTelefono($telefono)
    {
        if (empty($telefono)) return '';
        
        // Eliminar todo excepto dígitos
        $telefono = preg_replace('/[^0-9]/', '', $telefono);
        
        // Remover código de país si existe (+52 al inicio)
        if (strlen($telefono) == 12 && substr($telefono, 0, 2) == '52') {
            $telefono = substr($telefono, 2);
        }
        
        // Remover lada 01 si existe
        if (strlen($telefono) == 12 && substr($telefono, 0, 2) == '01') {
            $telefono = substr($telefono, 2);
        }
        
        return $telefono;
    }

    /**
     * Validar formato de teléfono mexicano (10 dígitos)
     */
    private function validarFormatoTelefono($telefono)
    {
        return preg_match('/^[0-9]{10}$/', $telefono);
    }

    /**
     * Sanitizar string para evitar inyección SQL
     */
    private function sanitize($str)
    {
        if ($str === null) return '';
        $str = trim($str);
        $str = stripslashes($str);
        $str = htmlspecialchars($str);
        $str = str_replace("'", "''", $str);
        return $str;
    }

    /**
     * Actualizar postulante completo (todos los campos incluyendo teléfono)
     * Este método actualiza TODOS los datos del postulante, incluyendo:
     * - Datos personales (nombre, apellidos, CURP)
     * - Contacto (correo, teléfono)
     * - Dirección completa (dirección, estado, ciudad/municipio, colonia)
     */
    function actualizarPostulanteCompleto($IdPostulante, $Nombre, $ApellidoPaterno, $ApellidoMaterno, 
                                         $CURP, $Telefono, $CorreoElectronico, $Direccion, $CodigoPostal,
                                         $Estado, $Ciudad, $Colonia = '')
    {
        try {
            $IdPostulante = is_numeric($IdPostulante) ? intval($IdPostulante) : intval(base64_decode($IdPostulante));
            
            // Sanitizar todos los campos
            $Nombre = $this->sanitize($Nombre);
            $ApellidoPaterno = $this->sanitize($ApellidoPaterno);
            $ApellidoMaterno = $this->sanitize($ApellidoMaterno);
            $CURP = $this->sanitize($CURP);
            $Telefono = $this->normalizarTelefono($Telefono);
            $CorreoElectronico = $this->sanitize($CorreoElectronico);
            $CodigoPostal = $this->sanitize($CodigoPostal);
            $Estado = $this->sanitize($Estado);
            $Ciudad = $this->sanitize($Ciudad);
            $Colonia = $this->sanitize($Colonia);
            
            // Guardar dirección en formato estructurado (evita ambigüedad al rehidratar UI)
            $DireccionBase = $this->sanitize($Direccion);
            $DireccionCompleta = $DireccionBase;
            if (!empty($CodigoPostal)) {
                $DireccionCompleta .= " | CP:" . $CodigoPostal;
            }
            if (!empty($Colonia)) {
                $DireccionCompleta .= " | COL:" . $Colonia;
            }
            
            // Validar teléfono
            if (!empty($Telefono) && !$this->validarFormatoTelefono($Telefono)) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "El teléfono debe tener 10 dígitos."
                ]);
            }
            
            // Validar campos obligatorios
            if (empty($Nombre) || empty($ApellidoPaterno) || empty($CorreoElectronico)) {
                return json_encode([
                    "Resultado" => false,
                    "Msg" => "Nombre, Apellido Paterno y Correo son obligatorios."
                ]);
            }
            
            // Verificar si el teléfono cambió para actualizar histórico
            $qGetTelActual = "SELECT Telefono FROM Postulantes WHERE IdPostulante = $IdPostulante";
            $telActual = $this->Procedure($qGetTelActual);
            $telefonoAnterior = !empty($telActual) ? $telActual[0]['Telefono'] : '';
            
            // Actualizar directo para evitar incompatibilidad de SP legado (RFC vs CURP)
            $qUpdate = "UPDATE Postulantes
                        SET Nombre = '$Nombre',
                            ApellidoPaterno = '$ApellidoPaterno',
                            ApellidoMaterno = '$ApellidoMaterno',
                            CURP = '$CURP',
                            CorreoElectronico = '$CorreoElectronico',
                            Direccion = '$DireccionCompleta',
                            Estado = '$Estado',
                            Ciudad = '$Ciudad'";

            // Solo actualizar teléfono principal cuando se envía explícitamente
            if (!empty($Telefono)) {
                $qUpdate .= ", Telefono = '$Telefono'";
            }

            $qUpdate .= " WHERE IdPostulante = $IdPostulante";
            $this->ProcedureExec($qUpdate, []);

            // Si el teléfono cambió, el trigger lo manejará automáticamente
            if (!empty($Telefono) && $Telefono != $telefonoAnterior) {
                error_log("Teléfono actualizado de $telefonoAnterior a $Telefono para IdPostulante $IdPostulante");
            }

            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "¡Datos del postulante actualizados correctamente!"
            ]);
        } catch (\Exception $e) {
            error_log("Error en actualizarPostulanteCompleto: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Msg" => "Error interno al actualizar: " . $e->getMessage()
            ]);
        }
    }
}
