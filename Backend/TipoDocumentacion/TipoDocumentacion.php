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

class TipoDocumentacion extends Conexiones
{
    /**
     * Obtener todos los tipos de documentación
     */
    function getTiposDocumentacion()
    {
        $q = "SELECT * FROM TipoDocumentacion ORDER BY IdTipoDocumento ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener solo tipos de documentación activos (para combos/selects)
     */
    function getTiposDocumentacionActivos()
    {
        $q = "SELECT IdTipoDocumento, NombreDocumento, Obligatorio FROM TipoDocumentacion WHERE Estatus = 1 ORDER BY NombreDocumento ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener un tipo de documentación por ID
     */
    function getTipoDocumentoById($IdTipoDocumento)
    {
        try {
            $IdTipoDocumento = base64_decode($IdTipoDocumento);
            $q = "SELECT * FROM TipoDocumentacion WHERE IdTipoDocumento = '$IdTipoDocumento'";
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
                    "Msg" => "No se encontró el tipo de documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en getTipoDocumentoById: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al obtener el tipo de documento."
            ]);
        }
    }

    /**
     * Agregar nuevo tipo de documentación
     */
    function addTipoDocumento($NombreDocumento, $Obligatorio)
    {
        try {
            $q = "CALL spAddTipoDocumento('$NombreDocumento','$Obligatorio')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El tipo de documento ha sido registrado con éxito!"
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
                    "Msg" => "Ha ocurrido un error al registrar el tipo de documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addTipoDocumento: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar el tipo de documento."
            ]);
        }
    }

    /**
     * Actualizar tipo de documentación existente
     */
    function updateTipoDocumento($IdTipoDocumento, $NombreDocumento, $Obligatorio)
    {
        try {
            $IdTipoDocumento = base64_decode($IdTipoDocumento);
            $q = "CALL spUpdateTipoDocumento('$IdTipoDocumento','$NombreDocumento','$Obligatorio')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El tipo de documento ha sido actualizado con éxito!"
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
                    "Msg" => "Ha ocurrido un error al actualizar el tipo de documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updateTipoDocumento: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el tipo de documento."
            ]);
        }
    }

    /**
     * Cambiar estatus del tipo de documentación (Activar/Desactivar)
     */
    function toggleEstatusTipoDocumento($IdTipoDocumento)
    {
        try {
            $IdTipoDocumento = base64_decode($IdTipoDocumento);
            $q = "CALL spToggleEstatusTipoDocumento('$IdTipoDocumento')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                $nuevoEstatus = $resultado[0]["NuevoEstatus"];
                if ($retorno == 1) {
                    $estatusTexto = $nuevoEstatus == 1 ? "activado" : "desactivado";
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El tipo de documento ha sido " . $estatusTexto . " con éxito!",
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
            error_log("Error en toggleEstatusTipoDocumento: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al cambiar el estatus."
            ]);
        }
    }

    /**
     * Eliminar tipo de documentación
     */
    function deleteTipoDocumento($IdTipoDocumento)
    {
        try {
            $IdTipoDocumento = base64_decode($IdTipoDocumento);
            $q = "CALL spDeleteTipoDocumento('$IdTipoDocumento')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El tipo de documento ha sido eliminado con éxito!"
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
                    "Msg" => "Ha ocurrido un error al eliminar el tipo de documento."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deleteTipoDocumento: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar el tipo de documento."
            ]);
        }
    }
}
