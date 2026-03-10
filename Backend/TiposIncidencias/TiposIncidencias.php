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

class TiposIncidencias extends Conexiones {

  function getTiposIncidencias() {
    $q = "CALL spGetTiposIncidencias()";
    $resultado = $this->Procedure($q);
    return json_encode($resultado);
  }

  function getPuestos() {
    $q = "SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC";
    return json_encode($this->Select($q));
  }

  function insertTipoIncidencia($nombre, $severidad, $idPuesto, $slaHoras) {
    try {
      $q = "CALL spInsertTipoIncidencia(?, ?, ?, ?)";
      $parametros = array($nombre, $severidad, $idPuesto, $slaHoras);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0) {
        $msgRetorno = $respuesta[0]["Retorno"];
        if ($msgRetorno == 1) {
          $arrRetorno = ["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                         "Msg" => "¡El tipo de incidencia ha sido registrado con éxito!"];
        } else {
          $arrRetorno = ["Resultado" => true, "Siguiente" => false, "ConMsg" => true, "Msg" => $msgRetorno];
        }
      } else {
        $arrRetorno = ["Resultado" => true, "Siguiente" => false, "ConMsg" => true,
                       "Msg" => "¡Ha ocurrido un error al registrar el tipo de incidencia!"];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function updateTipoIncidencia($idTipoIncidencia, $nombre, $severidad, $idPuesto, $slaHoras) {
    try {
      $idTipoIncidencia = base64_decode($idTipoIncidencia);
      $q = "CALL spUpdateTipoIncidencia(?, ?, ?, ?, ?)";
      $parametros = array($idTipoIncidencia, $nombre, $severidad, $idPuesto, $slaHoras);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0) {
        $msgRetorno = $respuesta[0]["Retorno"];
        if ($msgRetorno == 1) {
          $arrRetorno = ["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                         "Msg" => "¡El tipo de incidencia ha sido actualizado con éxito!"];
        } else {
          $arrRetorno = ["Resultado" => true, "Siguiente" => false, "ConMsg" => true, "Msg" => $msgRetorno];
        }
      } else {
        $arrRetorno = ["Resultado" => true, "Siguiente" => false, "ConMsg" => true,
                       "Msg" => "¡Ha ocurrido un error al actualizar el tipo de incidencia!"];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function toggleTipoIncidencia($idTipoIncidencia, $activo) {
    try {
      $idTipoIncidencia = base64_decode($idTipoIncidencia);
      $q = "CALL spToggleTipoIncidencia(?, ?)";
      $parametros = array($idTipoIncidencia, $activo);
      $respuesta = $this->ProcedureWithParam($q, $parametros);
      $estado = $activo == 1 ? "activado" : "desactivado";

      if (sizeof($respuesta) > 0 && $respuesta[0]["Retorno"] == 1) {
        $arrRetorno = ["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                       "Msg" => "¡Tipo de incidencia $estado con éxito!"];
      } else {
        $arrRetorno = ["Resultado" => true, "Siguiente" => false, "ConMsg" => true,
                       "Msg" => "¡Ha ocurrido un error al cambiar el estado!"];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function deleteTipoIncidencia($idTipoIncidencia) {
    try {
      $idTipoIncidencia = base64_decode($idTipoIncidencia);
      $q = "CALL spDeleteTipoIncidencia(?)";
      $parametros = array($idTipoIncidencia);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0 && $respuesta[0]["Retorno"] == 1) {
        $arrRetorno = ["Resultado" => true, "Siguiente" => true, "ConMsg" => true,
                       "Msg" => "¡Tipo de incidencia eliminado con éxito!"];
      } else {
        $arrRetorno = ["Resultado" => true, "Siguiente" => false, "ConMsg" => true,
                       "Msg" => "¡Ha ocurrido un error al eliminar el tipo de incidencia!"];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }
}
