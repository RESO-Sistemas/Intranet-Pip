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
                                          $Estado, $Ciudad, $RutaCV, $RutaSolicitudEmpleo, $Observaciones)
    {
        try {
            // Primero verificar si ya existe el postulante por correo o CURP
            $CorreoElectronico = $this->sanitize($CorreoElectronico);
            $CURP = $this->sanitize($CURP);
            
            $qBuscar = "SELECT IdPostulante FROM Postulantes WHERE LOWER(CorreoElectronico) = LOWER('$CorreoElectronico')";
            if (!empty($CURP)) {
                $qBuscar .= " OR UPPER(CURP) = UPPER('$CURP')";
            }
            $existente = $this->Procedure($qBuscar);
            
            if (sizeof($existente) > 0) {
                // Si ya existe, usar ese postulante
                $IdPostulante = $existente[0]["IdPostulante"];
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
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "¡Historial registrado con éxito!",
                    "IdPostulanteHistorial" => $resultado[0]["IdPostulanteHistorial"]
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
    // UTILIDADES
    // ==========================================

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
}
