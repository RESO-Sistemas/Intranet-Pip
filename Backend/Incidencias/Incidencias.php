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

// SessionManager
if (file_exists("../Session/SessionManager.php")) {
  require_once("../Session/SessionManager.php");
} else if (file_exists("../../Session/SessionManager.php")) {
  require_once("../../Session/SessionManager.php");
} else if (file_exists("././Backend/Session/SessionManager.php")) {
  require_once("././Backend/Session/SessionManager.php");
}

class Incidencias extends Conexiones {

  /**
   * Obtener listado completo de incidencias con datos del empleado y tipo
   */
  function getListadoIncidencias() {
    $q = "CALL spGetListadoIncidencias()";
    $resultado = $this->Procedure($q);
    return json_encode($resultado);
  }

  /**
   * Obtener detalle de una incidencia por su ID
   */
  function getDetalleIncidencia($idIncidencia) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "CALL spGetDetalleIncidencia(?)";
      $parametros = array($idIncidencia);
      $respuesta = $this->ProcedureWithParam($q, $parametros);
      return json_encode($respuesta);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode([]);
    }
  }

  /**
   * Registrar incidencia (método existente mejorado)
   */
  public function registrarIncidencia($descripcion, $evidencia, $noEmpleado) {
    $q = "INSERT INTO Incidencias (Descripcion, Evidencia, NoEmpleado, FechaRegistro) VALUES (?, ?, ?, NOW())";
    $parametros = [$descripcion, $evidencia, $noEmpleado];
    return $this->ProcedureExec($q, $parametros);
  }

  /**
   * Actualizar estado de una incidencia
   */
  function updateEstadoIncidencia($idIncidencia, $estado) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $noEmpleado = SessionManager::get('NoEmpleado');
      
      if ($estado == 'Resuelta') {
        $q = "UPDATE Incidencias SET Estado = ?, FechaResuelto = NOW(), NoEmpleadoResolutor = ? WHERE IdIncidencia = ?";
        $parametros = array($estado, $noEmpleado, $idIncidencia);
      } else {
        $q = "UPDATE Incidencias SET Estado = ?, FechaResuelto = NULL, NoEmpleadoResolutor = NULL WHERE IdIncidencia = ?";
        $parametros = array($estado, $idIncidencia);
      }
      $this->ExecuteQuery($q, $parametros);
      return json_encode(["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                          "Msg" => "¡Estado actualizado con éxito!"]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al actualizar el estado"]);
    }
  }

  /**
   * Obtener tipos de incidencias activos para poblar Select2
   */
  function getTiposIncidencias() {
    $q = "SELECT IdTipoIncidencia, Nombre FROM Tipos_Incidencias WHERE Activo = 1 ORDER BY Nombre ASC";
    $resultado = $this->Select($q);
    return json_encode($resultado);
  }

  /**
   * Asignar un tipo de incidencia a una incidencia
   */
  function asignarTipoIncidencia($idIncidencia, $idTipoIncidencia) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "UPDATE Incidencias SET IdTipoIncidencia = ? WHERE IdIncidencia = ?";
      $parametros = array($idTipoIncidencia, $idIncidencia);
      $this->ExecuteQuery($q, $parametros);
      return json_encode(["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                          "Msg" => "¡Tipo de incidencia asignado con éxito!"]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al asignar el tipo de incidencia"]);
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // Plan de Acción para Incidencias
  // ═══════════════════════════════════════════════════════════════════

  /**
   * Obtener info de la incidencia para encabezado del plan
   */
  function getInfoIncidenciaPlan($idIncidencia) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "CALL spGetInfoIncidenciaPlan(?)";
      $resultado = $this->ProcedureWithParam($q, array($idIncidencia));
      return json_encode(["Resultado" => true, "Data" => $resultado[0] ?? []]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al obtener info de la incidencia"]);
    }
  }

  /**
   * Obtener actividades del plan de acción de una incidencia
   */
  function getActividadesPlanAccion($idIncidencia) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "CALL spGetActividadesPlanAccion(?)";
      $resultado = $this->ProcedureWithParam($q, array($idIncidencia));
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al obtener actividades"]);
    }
  }

  /**
   * Agregar actividad al plan de acción
   */
  function addActividadPlanAccion($idIncidencia, $titulo, $descripcion, $fechaIni, $fechaFin, $usuario) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "CALL spAddActividadPlanAccion(?, ?, ?, ?, ?, ?)";
      $resultado = $this->ProcedureWithParam($q, array($idIncidencia, $titulo, $descripcion, $fechaIni, $fechaFin, $usuario));
      return json_encode([
        "Resultado" => true, "Siguiente" => true,
        "ConMsg" => true, "Msg" => "Actividad registrada",
        "Data" => $resultado[0] ?? []
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al agregar actividad"]);
    }
  }

  /**
   * Agregar avance a una actividad
   */
  function addAvancePlanAccion($idActividad, $nuevoAvance, $descripcion) {
    try {
      $q = "CALL spAddAvancePlanAccionInc(?, ?, ?)";
      $resultado = $this->ProcedureWithParam($q, array($idActividad, $nuevoAvance, $descripcion));
      if (sizeof($resultado) > 0 && $resultado[0]["Retorno"] == 1) {
        return json_encode(["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                            "Msg" => $resultado[0]["MsgReturn"]]);
      } else {
        return json_encode(["Resultado" => true, "Siguiente" => false, "ConMsg" => true,
                            "Msg" => $resultado[0]["MsgReturn"] ?? "Error al registrar avance"]);
      }
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al registrar avance"]);
    }
  }

  /**
   * Obtener avances de una actividad
   */
  function getAvancesActividad($idActividad) {
    try {
      $q = "CALL spGetAvancesActividad(?)";
      $resultado = $this->ProcedureWithParam($q, array($idActividad));
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al obtener avances"]);
    }
  }

  /**
   * Agregar mensaje de seguimiento
   */
  function addSeguimientoIncidencia($idIncidencia, $titulo, $mensaje) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "CALL spAddSeguimientoIncidencia(?, ?, ?)";
      $resultado = $this->ProcedureWithParam($q, array($idIncidencia, $titulo, $mensaje));
      return json_encode(["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                          "Msg" => "Mensaje agregado exitosamente"]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al agregar mensaje"]);
    }
  }

  /**
   * Obtener mensajes de seguimiento
   */
  function getSeguimientoIncidencia($idIncidencia) {
    try {
      $idIncidencia = base64_decode($idIncidencia);
      $q = "CALL spGetSeguimientoIncidencia(?)";
      $resultado = $this->ProcedureWithParam($q, array($idIncidencia));
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al cargar mensajes"]);
    }
  }
}
