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
      $q = "UPDATE Incidencias SET Estado = ? WHERE IdIncidencia = ?";
      $parametros = array($estado, $idIncidencia);
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
}
