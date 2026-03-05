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

class Inducciones extends Conexiones
{
    // ==========================================
    // CRUD PRINCIPAL DE INDUCCIONES
    // ==========================================

    /**
     * Obtener todas las inducciones con información relacionada
     */
    function getInducciones()
    {
        $q = "SELECT i.*, a.NombreArea,
                     GROUP_CONCAT(p.Puesto SEPARATOR ', ') as PuestosTexto,
                     GROUP_CONCAT(ip.IdPuesto) as PuestosIds
              FROM InduccionesVacantes i 
              LEFT JOIN AreasTecnicas a ON i.IdAreaTecnica = a.IdAreaTecnica 
              LEFT JOIN InduccionesPuestos ip ON i.IdInduccion = ip.IdInduccion
              LEFT JOIN Puestos p ON ip.IdPuesto = p.IdPuesto
              GROUP BY i.IdInduccion
              ORDER BY i.IdInduccion ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener solo inducciones activas (para combos/selects)
     */
    function getInduccionesActivas()
    {
        $q = "SELECT IdInduccion, NombreInduccion, Descripcion 
              FROM InduccionesVacantes 
              WHERE Estatus = 1 
              ORDER BY NombreInduccion ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener una inducción por ID con todos sus datos
     */
    function getInduccionById($IdInduccion)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            
            // Crear conexión independiente para múltiples queries
            $conexion = new Conexiones();
            
            // Obtener datos principales
            $q = "SELECT * FROM InduccionesVacantes WHERE IdInduccion = '$IdInduccion'";
            $resultado = $conexion->SelectNotClose($q);
            
            if (sizeof($resultado) > 0) {
                // Obtener puestos asignados (IDs para Select2)
                $qPuestos = "SELECT ip.IdPuesto 
                            FROM InduccionesPuestos ip 
                            WHERE ip.IdInduccion = '$IdInduccion'";
                $puestosResult = $conexion->SelectNotClose($qPuestos);
                
                // Convertir a array de IDs
                $puestosIds = [];
                foreach ($puestosResult as $p) {
                    $puestosIds[] = $p['IdPuesto'];
                }
                
                // Agregar PuestosIds al resultado principal
                $datos = $resultado[0];
                $datos['PuestosIds'] = implode(',', $puestosIds);
                
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => true,
                    "Datos" => $datos
                ];
            } else {
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "No se encontró la inducción."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en getInduccionById: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al obtener la inducción."
            ]);
        }
    }

    /**
     * Agregar nueva inducción
     */
    function addInduccion($NombreInduccion, $Descripcion, $IdAreaTecnica, $PuestosAplicables, $DuracionEstimada)
    {
        try {
            // Primero crear la inducción usando ProcedureWithParam para consumir result sets
            $q = "CALL spAddInduccion(?, ?, ?, ?)";
            $params = [$NombreInduccion, $Descripcion, $IdAreaTecnica, $DuracionEstimada];
            $resultado = $this->ProcedureWithParam($q, $params);
            
            // Log para diagnóstico
            error_log("Debug addInduccion - Resultado SP: " . json_encode($resultado));
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                error_log("Debug addInduccion - Retorno: " . $retorno . " (Tipo: " . gettype($retorno) . ")");
                
                if (is_numeric($retorno) && $retorno > 0) {
                    // Asignar puestos si se proporcionaron
                    $puestosSuccess = true;
                    if (!empty($PuestosAplicables)) {
                        error_log("Debug addInduccion - Asignando puestos: " . $PuestosAplicables);
                        $puestosSuccess = $this->asignarPuestosInduccion($retorno, $PuestosAplicables);
                        error_log("Debug addInduccion - Resultado asignar puestos: " . ($puestosSuccess ? 'SUCCESS' : 'FAILED'));
                    }
                    
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La inducción ha sido registrada con éxito!",
                        "IdInduccion" => $retorno
                    ];
                } else {
                    error_log("Debug addInduccion - Error del SP: " . $retorno);
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => false,
                        "ConMsg" => true,
                        "Msg" => $retorno
                    ];
                }
            } else {
                error_log("Debug addInduccion - No hay resultado del SP");
                $arrRetorno = [
                    "Resultado" => true,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Ha ocurrido un error al registrar la inducción."
                ];
            }
            
            error_log("Debug addInduccion - Respuesta final: " . json_encode($arrRetorno));
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addInduccion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar la inducción."
            ]);
        }
    }

    /**
     * Actualizar inducción existente
     */
    function updateInduccion($IdInduccion, $NombreInduccion, $Descripcion, $IdAreaTecnica, $PuestosAplicables, $DuracionEstimada)
    {
        try {
            $IdInduccionDecoded = base64_decode($IdInduccion);
            
            // Actualizar datos principales usando ProcedureWithParam para consumir result sets
            $q = "CALL spUpdateInduccion(?, ?, ?, ?, ?)";
            $params = [$IdInduccionDecoded, $NombreInduccion, $Descripcion, $IdAreaTecnica, $DuracionEstimada];
            $resultado = $this->ProcedureWithParam($q, $params);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    // Actualizar asignación de puestos
                    $this->asignarPuestosInduccion($IdInduccionDecoded, $PuestosAplicables);
                    
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La inducción ha sido actualizada con éxito!"
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
                    "Msg" => "Ha ocurrido un error al actualizar la inducción."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updateInduccion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar la inducción."
            ]);
        }
    }

    /**
     * Cambiar estatus de la inducción (Activar/Desactivar)
     */
    function toggleEstatusInduccion($IdInduccion)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            $q = "CALL spToggleEstatusInduccion(?)";
            $params = [$IdInduccion];
            $resultado = $this->ProcedureWithParam($q, $params);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                $nuevoEstatus = $resultado[0]["NuevoEstatus"] ?? 0;
                if ($retorno == 1) {
                    $estatusTexto = $nuevoEstatus == 1 ? "activada" : "desactivada";
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La inducción ha sido " . $estatusTexto . " con éxito!",
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
            error_log("Error en toggleEstatusInduccion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al cambiar el estatus de la inducción."
            ]);
        }
    }

    /**
     * Eliminar inducción
     */
    function deleteInduccion($IdInduccion)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            
            // Primero eliminar archivos físicos de materiales usando conexión independiente
            $conexion = new Conexiones();
            $qMateriales = "SELECT RutaArchivo FROM InduccionesMaterial WHERE IdInduccion = '$IdInduccion'";
            $materiales = $conexion->SelectNotClose($qMateriales);
            foreach ($materiales as $material) {
                $rutaCompleta = "../../" . $material['RutaArchivo'];
                if (file_exists($rutaCompleta)) {
                    unlink($rutaCompleta);
                }
            }
            
            $q = "CALL spDeleteInduccion(?)";
            $params = [$IdInduccion];
            $resultado = $this->ProcedureWithParam($q, $params);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡La inducción ha sido eliminada con éxito!"
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
                    "Msg" => "Ha ocurrido un error al eliminar la inducción."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deleteInduccion: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar la inducción."
            ]);
        }
    }

    // ==========================================
    // FUNCIONES AUXILIARES PARA TABLA INTERMEDIA
    // ==========================================

    /**
     * Asignar puestos a una inducción usando tabla intermedia
     */
    private function asignarPuestosInduccion($IdInduccion, $PuestosAplicables)
    {
        try {
            error_log("Debug asignarPuestosInduccion - IdInduccion: $IdInduccion, PuestosAplicables: $PuestosAplicables");
            
            // Crear una nueva instancia de conexión para evitar conflictos
            $conexion = new Conexiones();
            
            // Primero eliminar todas las asignaciones existentes
            $qDelete = "DELETE FROM InduccionesPuestos WHERE IdInduccion = '$IdInduccion'";
            $conexion->SelectNotClose($qDelete);
            error_log("Debug asignarPuestosInduccion - DELETE ejecutado");
            
            // Si hay puestos para asignar
            if (!empty($PuestosAplicables)) {
                $puestosArray = json_decode($PuestosAplicables, true);
                error_log("Debug asignarPuestosInduccion - Array decodificado: " . json_encode($puestosArray));
                
                if (is_array($puestosArray) && count($puestosArray) > 0) {
                    $insertedCount = 0;
                    foreach ($puestosArray as $idPuesto) {
                        if (!empty($idPuesto) && is_numeric($idPuesto)) {
                            $qInsert = "INSERT IGNORE INTO InduccionesPuestos (IdInduccion, IdPuesto) VALUES ('$IdInduccion', '$idPuesto')";
                            $conexion->SelectNotClose($qInsert);
                            $insertedCount++;
                            error_log("Debug asignarPuestosInduccion - INSERT puesto $idPuesto ejecutado");
                        }
                    }
                    error_log("Debug asignarPuestosInduccion - Puestos insertados: $insertedCount de " . count($puestosArray));
                    return true;
                } else {
                    error_log("Debug asignarPuestosInduccion - Array no válido o vacío");
                    return true; // No hay puestos válidos para asignar, pero no es un error
                }
            } else {
                error_log("Debug asignarPuestosInduccion - PuestosAplicables vacío");
                return true; // No hay puestos para asignar, pero no es un error
            }
        } catch (\Exception $e) {
            error_log("Error en asignarPuestosInduccion: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Obtener puestos asignados a una inducción (para uso interno)
     */
    private function getPuestosAsignados($IdInduccion)
    {
        try {
            $q = "SELECT ip.IdPuesto FROM InduccionesPuestos ip WHERE ip.IdInduccion = '$IdInduccion'";
            $resultado = $this->Select($q);
            
            $puestos = array();
            foreach ($resultado as $row) {
                $puestos[] = $row['IdPuesto'];
            }
            
            return $puestos;
        } catch (\Exception $e) {
            error_log("Error en getPuestosAsignados: " . $e->getMessage());
            return array();
        }
    }

    // ==========================================
    // GESTIÓN DE MATERIALES (ARCHIVOS) - SIN CAMBIOS
    // ==========================================

    /**
     * Agregar material a una inducción
     */
    function addMaterial($IdInduccion, $archivo)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            
            // Validar archivo
            $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                           'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                           'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                           'image/jpeg', 'image/png', 'image/gif'];
            
            if (!in_array($archivo['type'], $allowedTypes)) {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Tipo de archivo no permitido."
                ]);
            }
            
            // Generar nombre único
            $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
            $nombreArchivo = $archivo['name'];
            $nombreUnico = uniqid() . '_' . time() . '.' . $extension;
            $rutaDestino = "uploads/inducciones/" . $nombreUnico;
            $rutaCompleta = "../../" . $rutaDestino;
            
            if (move_uploaded_file($archivo['tmp_name'], $rutaCompleta)) {
                $tipoArchivo = $archivo['type'];
                $q = "INSERT INTO InduccionesMaterial (IdInduccion, NombreArchivo, RutaArchivo, TipoArchivo) 
                      VALUES ('$IdInduccion', '$nombreArchivo', '$rutaDestino', '$tipoArchivo')";
                $this->ExecuteQuery($q, array());
                
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "¡Material agregado con éxito!"
                ]);
            } else {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "Error al subir el archivo."
                ]);
            }
        } catch (\Exception $e) {
            error_log("Error en addMaterial: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al agregar el material."
            ]);
        }
    }

    /**
     * Obtener materiales de una inducción
     */
    function getMateriales($IdInduccion)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            $q = "SELECT * FROM InduccionesMaterial WHERE IdInduccion = '$IdInduccion' ORDER BY FechaCreacion DESC";
            return json_encode($this->Select($q));
        } catch (\Exception $e) {
            error_log("Error en getMateriales: " . $e->getMessage());
            return json_encode([]);
        }
    }

    /**
     * Eliminar material
     */
    function deleteMaterial($IdMaterial)
    {
        try {
            $IdMaterial = base64_decode($IdMaterial);
            
            // Obtener ruta del archivo
            $q = "SELECT RutaArchivo FROM InduccionesMaterial WHERE IdMaterial = '$IdMaterial'";
            $resultado = $this->Select($q);
            
            if (sizeof($resultado) > 0) {
                $rutaCompleta = "../../" . $resultado[0]['RutaArchivo'];
                if (file_exists($rutaCompleta)) {
                    unlink($rutaCompleta);
                }
                
                $qDelete = "DELETE FROM InduccionesMaterial WHERE IdMaterial = '$IdMaterial'";
                $this->ExecuteQuery($qDelete, array());
                
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "¡Material eliminado con éxito!"
                ]);
            } else {
                return json_encode([
                    "Resultado" => false,
                    "Siguiente" => false,
                    "ConMsg" => true,
                    "Msg" => "El material no existe."
                ]);
            }
        } catch (\Exception $e) {
            error_log("Error en deleteMaterial: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar el material."
            ]);
        }
    }

    // ==========================================
    // GESTIÓN DE AUDIOVISUAL (ENLACES EXTERNOS)
    // ==========================================

    /**
     * Agregar enlace audiovisual a una inducción
     */
    function addAudiovisual($IdInduccion, $TituloVideo, $EnlaceExterno, $Plataforma)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            
            $q = "INSERT INTO InduccionesAudiovisual (IdInduccion, TituloVideo, EnlaceExterno, Plataforma) 
                  VALUES ('$IdInduccion', '$TituloVideo', '$EnlaceExterno', '$Plataforma')";
            $this->ExecuteQuery($q, array());
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "¡Enlace audiovisual agregado con éxito!"
            ]);
        } catch (\Exception $e) {
            error_log("Error en addAudiovisual: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al agregar el enlace audiovisual."
            ]);
        }
    }

    /**
     * Obtener audiovisuales de una inducción
     */
    function getAudiovisuales($IdInduccion)
    {
        try {
            $IdInduccion = base64_decode($IdInduccion);
            $q = "SELECT * FROM InduccionesAudiovisual WHERE IdInduccion = '$IdInduccion' ORDER BY FechaCreacion DESC";
            return json_encode($this->Select($q));
        } catch (\Exception $e) {
            error_log("Error en getAudiovisuales: " . $e->getMessage());
            return json_encode([]);
        }
    }

    /**
     * Eliminar enlace audiovisual
     */
    function deleteAudiovisual($IdAudiovisual)
    {
        try {
            $IdAudiovisual = base64_decode($IdAudiovisual);
            
            $q = "DELETE FROM InduccionesAudiovisual WHERE IdAudiovisual = '$IdAudiovisual'";
            $this->ExecuteQuery($q, array());
            
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "¡Enlace audiovisual eliminado con éxito!"
            ]);
        } catch (\Exception $e) {
            error_log("Error en deleteAudiovisual: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar el enlace audiovisual."
            ]);
        }
    }

    // ==========================================
    // FUNCIONES AUXILIARES
    // ==========================================

    /**
     * Obtener puestos para Select2
     */
    function getPuestosParaSelect()
    {
        $q = "SELECT IdPuesto as id, Puesto as text FROM Puestos ORDER BY Puesto ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener áreas técnicas activas para Select
     */
    function getAreasTecnicasParaSelect()
    {
        $q = "SELECT IdAreaTecnica, NombreArea FROM AreasTecnicas WHERE Estatus = 1 ORDER BY NombreArea ASC";
        return json_encode($this->Select($q));
    }
}
