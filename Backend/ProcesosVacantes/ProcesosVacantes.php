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

class ProcesosVacantes extends Conexiones
{
    /**
     * Obtener todos los procesos de vacantes
     */
    function getProcesosVacantes()
    {
        $q = "SELECT * FROM ProcesosVacantes ORDER BY IdProceso ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener solo procesos activos (para combos/selects)
     */
    function getProcesosVacantesActivos()
    {
        $q = "SELECT IdProceso, NombreProceso, Descripcion FROM ProcesosVacantes WHERE Estatus = 1 ORDER BY NombreProceso ASC";
        return json_encode($this->Select($q));
    }

    /**
     * Obtener un proceso por ID
     */
    function getProcesoVacanteById($IdProceso)
    {
        try {
            $IdProceso = base64_decode($IdProceso);
            $q = "SELECT * FROM ProcesosVacantes WHERE IdProceso = '$IdProceso'";
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
                    "Msg" => "No se encontró el proceso."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en getProcesoVacanteById: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al obtener el proceso."
            ]);
        }
    }

    /**
     * Agregar nuevo proceso de vacante
     */
    function addProcesoVacante($NombreProceso, $Descripcion)
    {
        try {
            $q = "CALL spAddProcesoVacante('$NombreProceso','$Descripcion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El proceso ha sido registrado con éxito!"
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
                    "Msg" => "Ha ocurrido un error al registrar el proceso."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en addProcesoVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al registrar el proceso."
            ]);
        }
    }

    /**
     * Actualizar proceso existente
     */
    function updateProcesoVacante($IdProceso, $NombreProceso, $Descripcion)
    {
        try {
            $IdProceso = base64_decode($IdProceso);
            $q = "CALL spUpdateProcesoVacante('$IdProceso','$NombreProceso','$Descripcion')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El proceso ha sido actualizado con éxito!"
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
                    "Msg" => "Ha ocurrido un error al actualizar el proceso."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en updateProcesoVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al actualizar el proceso."
            ]);
        }
    }

    /**
     * Cambiar estatus del proceso (Activar/Desactivar)
     */
    function toggleEstatusProcesoVacante($IdProceso)
    {
        try {
            $IdProceso = base64_decode($IdProceso);
            $q = "CALL spToggleEstatusProcesoVacante('$IdProceso')";
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
                        "Msg" => "¡El proceso ha sido " . $estatusTexto . " con éxito!",
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
            error_log("Error en toggleEstatusProcesoVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al cambiar el estatus del proceso."
            ]);
        }
    }

    /**
     * Eliminar proceso
     */
    function deleteProcesoVacante($IdProceso)
    {
        try {
            $IdProceso = base64_decode($IdProceso);
            $q = "CALL spDeleteProcesoVacante('$IdProceso')";
            $resultado = $this->Procedure($q);
            
            if (sizeof($resultado) > 0) {
                $retorno = $resultado[0]["Retorno"];
                if ($retorno == 1) {
                    $arrRetorno = [
                        "Resultado" => true,
                        "Siguiente" => true,
                        "ConMsg" => true,
                        "Msg" => "¡El proceso ha sido eliminado con éxito!"
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
                    "Msg" => "Ha ocurrido un error al eliminar el proceso."
                ];
            }
            return json_encode($arrRetorno);
        } catch (\Exception $e) {
            error_log("Error en deleteProcesoVacante: " . $e->getMessage());
            return json_encode([
                "Resultado" => false,
                "Siguiente" => false,
                "ConMsg" => true,
                "Msg" => "Error al eliminar el proceso."
            ]);
        }
    }
}
