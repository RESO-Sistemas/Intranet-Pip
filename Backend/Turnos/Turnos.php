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

class Turnos extends Conexiones {

  function getTurnos() {
    $q = "CALL spGetTurnos()";
    $resultado = $this->Procedure($q);
    return json_encode($resultado);
  }

  function getPuestos() {
    $q = "SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC";
    return json_encode($this->Select($q));
  }

  function insertTurno($nombre, $horaInicio, $horaFin, $idPuesto) {
    try {
      $q = "CALL spInsertTurno(?, ?, ?, ?)";
      $parametros = array($nombre, $horaInicio, $horaFin, $idPuesto);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0) {
        $msgRetorno = $respuesta[0]["Retorno"];
        if ($msgRetorno == 1) {
          // Obtener el IdTurno insertado (asumiendo que el SP lo regresa en el mismo result set)
          $idTurnoNuevo = isset($respuesta[0]["IdTurno"]) ? $respuesta[0]["IdTurno"] : null;
          if ($idTurnoNuevo) {
            // Insertar en la tabla intermedia PuestoTurno
            $q2 = "INSERT IGNORE INTO PuestoTurno (IdPuesto, IdTurno) VALUES (?, ?)";
            $this->ExecuteQueryWithParam($q2, array($idPuesto, $idTurnoNuevo));
          }
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg"    => true,
            "Msg"       => "¡El turno ha sido registrado con éxito!"
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg"    => true,
            "Msg"       => $msgRetorno
          ];
        }
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg"    => true,
          "Msg"       => "¡Ha ocurrido un error al registrar el turno!"
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function updateTurno($idTurno, $nombre, $horaInicio, $horaFin, $idPuesto) {
    try {
      $idTurno = base64_decode($idTurno);
      $q = "CALL spUpdateTurno(?, ?, ?, ?, ?)";
      $parametros = array($idTurno, $nombre, $horaInicio, $horaFin, $idPuesto);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0) {
        $msgRetorno = $respuesta[0]["Retorno"];
        if ($msgRetorno == 1) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg"    => true,
            "Msg"       => "¡El turno ha sido actualizado con éxito!"
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg"    => true,
            "Msg"       => $msgRetorno
          ];
        }
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg"    => true,
          "Msg"       => "¡Ha ocurrido un error al actualizar el turno!"
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function toggleTurno($idTurno, $activo) {
    try {
      $idTurno = base64_decode($idTurno);
      $q = "CALL spToggleTurno(?, ?)";
      $parametros = array($idTurno, $activo);
      $this->ProcedureWithParam($q, $parametros);
      $estado = $activo == 1 ? "activado" : "desactivado";
      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg"    => true,
        "Msg"       => "¡El turno ha sido $estado con éxito!"
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function deleteTurno($idTurno) {
    try {
      $idTurno = base64_decode($idTurno);
      $q = "DELETE FROM Turnos WHERE IdTurno = ?";
      $this->ExecuteQueryWithParam($q, [$idTurno]);
      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg"    => true,
        "Msg"       => "¡El turno ha sido eliminado con éxito!"
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error al eliminar el turno"]);
    }
  }
}
?>
