<?php
if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
} else {
    if (file_exists("./Conexiones/Conexiones.php")) {
        require_once("./Conexiones/Conexiones.php");
    } else if (file_exists("../../Conexiones/Conexiones.php")) {
        require_once("../../Conexiones/Conexiones.php");
    } else if (file_exists("././Backend/Conexiones/Conexiones.php")) {
        require_once("././Backend/Conexiones/Conexiones.php");
    }
}

class DocumentacionEmpleados extends Conexiones
{
    /**
     * Obtener documentación de un empleado
     */
    function getDocumentacionEmpleado($NoEmpleado)
    {
        try {
            $NoEmpleado = intval(base64_decode($NoEmpleado));
            $q = "CALL spGetDocumentacionEmpleado($NoEmpleado)";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getDocumentacionEmpleado: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => "Error al obtener la documentación."
            ]);
        }
    }

    /**
     * Agregar documento a un empleado
     */
    function addDocumentacionEmpleado($NoEmpleado, $IdTipoDocumento, $Estatus, $FechaCarga, $FechaVencimiento, $Observaciones, $UsuarioRegistro)
    {
        try {
            $NoEmpleado = intval(base64_decode($NoEmpleado));
            $IdTipoDocumento = intval(base64_decode($IdTipoDocumento));
            $Observaciones = $this->sanitize($Observaciones);
            $FechaCargaSQL = empty($FechaCarga) ? 'NULL' : "'$FechaCarga'";
            $FechaVencimientoSQL = empty($FechaVencimiento) ? 'NULL' : "'$FechaVencimiento'";
            $ObservacionesSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            $UsuarioRegistro = intval($UsuarioRegistro);

            $q = "CALL spAddDocumentacionEmpleado($NoEmpleado, $IdTipoDocumento, '$Estatus', $FechaCargaSQL, $FechaVencimientoSQL, $ObservacionesSQL, $UsuarioRegistro)";
            $resultado = $this->Procedure($q);

            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡Documento registrado exitosamente!"
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
                    "Msg" => "Error al registrar el documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addDocumentacionEmpleado: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar el documento."
            ]);
        }
    }

    /**
     * Actualizar documento de un empleado
     */
    function updateDocumentacionEmpleado($IdDocumentacionEmpleado, $Estatus, $FechaCarga, $FechaVencimiento, $Observaciones)
    {
        try {
            $IdDocumentacionEmpleado = intval(base64_decode($IdDocumentacionEmpleado));
            $Observaciones = $this->sanitize($Observaciones);
            $FechaCargaSQL = empty($FechaCarga) ? 'NULL' : "'$FechaCarga'";
            $FechaVencimientoSQL = empty($FechaVencimiento) ? 'NULL' : "'$FechaVencimiento'";
            $ObservacionesSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";

            $q = "CALL spUpdateDocumentacionEmpleado($IdDocumentacionEmpleado, '$Estatus', $FechaCargaSQL, $FechaVencimientoSQL, $ObservacionesSQL)";
            $resultado = $this->Procedure($q);

            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡Documento actualizado exitosamente!"
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
                    "Msg" => "Error al actualizar el documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updateDocumentacionEmpleado: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el documento."
            ]);
        }
    }

    /**
     * Eliminar documento de un empleado
     */
    function deleteDocumentacionEmpleado($IdDocumentacionEmpleado)
    {
        try {
            $IdDocumentacionEmpleado = intval(base64_decode($IdDocumentacionEmpleado));
            $q = "CALL spDeleteDocumentacionEmpleado($IdDocumentacionEmpleado)";
            $resultado = $this->Procedure($q);

            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡Documento eliminado exitosamente!"
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
                    "Msg" => "Error al eliminar el documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deleteDocumentacionEmpleado: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar el documento."
            ]);
        }
    }

    /**
     * Vista INTELIGENTE: Todos los tipos de documento con estatus del empleado
     * LEFT JOIN: si no existe registro = 'Pendiente'
     */
    function getDocumentacionCompletaEmpleado($NoEmpleado)
    {
        try {
            $NoEmpleado = intval(base64_decode($NoEmpleado));
            $q = "CALL spGetDocumentacionCompletaEmpleado($NoEmpleado)";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getDocumentacionCompletaEmpleado: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => "Error al obtener la documentación."
            ]);
        }
    }

    /**
     * Vista CHECKLIST: Todos los empleados con estatus de un tipo de documento
     */
    function getEntregasPorTipoDocumento($IdTipoDocumento)
    {
        try {
            $IdTipoDocumento = intval(base64_decode($IdTipoDocumento));
            $q = "CALL spGetEntregasPorTipoDocumento($IdTipoDocumento)";
            $resultado = $this->Procedure($q);
            return json_encode([
                "Resultado" => true,
                "Siguiente" => true,
                "Data" => $resultado
            ]);
        } catch (\Exception $e) {
            error_log("Error en getEntregasPorTipoDocumento: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "Data" => [],
                "Msg" => "Error al obtener las entregas."
            ]);
        }
    }

    /**
     * Marcar documento como entregado (INSERT o UPDATE)
     */
    function marcarDocumentoEntregado($NoEmpleado, $IdTipoDocumento, $Estatus, $FechaCarga, $Observaciones, $UsuarioRegistro)
    {
        try {
            $NoEmpleado = intval(base64_decode($NoEmpleado));
            $IdTipoDocumento = intval(base64_decode($IdTipoDocumento));
            $Observaciones = $this->sanitize($Observaciones);
            $FechaCargaSQL = empty($FechaCarga) ? 'NULL' : "'$FechaCarga'";
            $ObservacionesSQL = empty($Observaciones) ? 'NULL' : "'$Observaciones'";
            $UsuarioRegistro = intval($UsuarioRegistro);

            $q = "CALL spMarcarDocumentoEntregado($NoEmpleado, $IdTipoDocumento, '$Estatus', $FechaCargaSQL, $ObservacionesSQL, $UsuarioRegistro)";
            $resultado = $this->Procedure($q);

            if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
                return json_encode([
                    "Resultado" => true,
                    "Siguiente" => true,
                    "ConMsg" => true,
                    "Msg" => "¡Documento actualizado exitosamente!"
                ]);
            }
            return json_encode([
                "Resultado" => true,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el documento."
            ]);
        } catch (\Exception $e) {
            error_log("Error en marcarDocumentoEntregado: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el documento."
            ]);
        }
    }

    /**
     * Sanitizar texto
     */
    private function sanitize($text)
    {
        if (empty($text)) return '';
        $text = trim($text);
        $text = stripslashes($text);
        $text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
        return $text;
    }
}
