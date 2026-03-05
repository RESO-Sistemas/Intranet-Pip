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

class AreasTecnicas extends Conexiones
{
    /**
     * Obtener todas las áreas técnicas
     */
    function getAreasTecnicas()
    {
        $q = "SELECT * FROM AreasTecnicas ORDER BY IdAreaTecnica ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener solo áreas técnicas activas (para combos/selects)
     */
    function getAreasTecnicasActivas()
    {
        $q = "SELECT IdAreaTecnica, NombreArea, Descripcion FROM AreasTecnicas WHERE Estatus = 1 ORDER BY NombreArea ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener un área técnica por ID
     */
    function getAreaTecnicaById($IdAreaTecnica)
    {
        try {
            $IdAreaTecnica = base64_decode($IdAreaTecnica);
            $q = "SELECT * FROM AreasTecnicas WHERE IdAreaTecnica = '$IdAreaTecnica'";
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
                    "Msg" => "No se encontró el área técnica."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en getAreaTecnicaById: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al obtener el área técnica."
            ]);
        }
    }

    /**
     * Agregar nueva área técnica
     */
    function addAreaTecnica($NombreArea, $Descripcion)
    {
        try {
            $q = "CALL spAddAreaTecnica('$NombreArea','$Descripcion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El área técnica ha sido registrada con éxito!"
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
                    "Msg" => "Ha ocurrido un error al registrar el área técnica."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addAreaTecnica: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar el área técnica."
            ]);
        }
    }

    /**
     * Actualizar área técnica existente
     */
    function updateAreaTecnica($IdAreaTecnica, $NombreArea, $Descripcion)
    {
        try {
            $IdAreaTecnica = base64_decode($IdAreaTecnica);
            $q = "CALL spUpdateAreaTecnica('$IdAreaTecnica','$NombreArea','$Descripcion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El área técnica ha sido actualizada con éxito!"
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
                    "Msg" => "Ha ocurrido un error al actualizar el área técnica."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updateAreaTecnica: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el área técnica."
            ]);
        }
    }

    /**
     * Cambiar estatus del área técnica (Activar/Desactivar)
     */
    function toggleEstatusAreaTecnica($IdAreaTecnica)
    {
        try {
            $IdAreaTecnica = base64_decode($IdAreaTecnica);
            $q = "CALL spToggleEstatusAreaTecnica('$IdAreaTecnica')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                $nuevoEstatus = $resultado[0]["NuevoEstatus"];
                if ($retorno == 1) {
                    $estatusTexto = $nuevoEstatus == 1 ? "activada" : "desactivada";
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El área técnica ha sido " . $estatusTexto . " con éxito!",
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
            error_log("Error en toggleEstatusAreaTecnica: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al cambiar el estatus del área técnica."
            ]);
        }
    }

    /**
     * Eliminar área técnica (solo si no tiene vacantes asociadas)
     */
    function deleteAreaTecnica($IdAreaTecnica)
    {
        try {
            $IdAreaTecnica = base64_decode($IdAreaTecnica);
            $q = "CALL spDeleteAreaTecnica('$IdAreaTecnica')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El área técnica ha sido eliminada con éxito!"
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
                    "Msg" => "Ha ocurrido un error al eliminar el área técnica."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deleteAreaTecnica: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar el área técnica."
            ]);
        }
    }
}
