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

class Checklists extends Conexiones {

  // Obtener turnos asignados a un puesto
  function getTurnosPorPuesto($idPuesto) {
    $q = "CALL spGetTurnosPorPuesto(?)";
    $parametros = array($idPuesto);
    return json_encode($this->ProcedureWithParam($q, $parametros));
  }

  function getChecklists() {
    $q = "CALL spGetChecklists()";
    $resultado = $this->Procedure($q);
    return json_encode($resultado);
  }

  function getPuestos() {
    $q = "SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC";
    return json_encode($this->Select($q));
  }

  function getTurnos() {
    $q = "SELECT IdTurno, Nombre FROM Turnos ORDER BY Nombre ASC";
    return json_encode($this->Select($q));
  }

  function getKpis() {
    $q = "SELECT IdKpi, Nombre, Puestos FROM Kpis WHERE Activo = 1 ORDER BY Nombre ASC";
    return json_encode($this->Select($q));
  }

  function insertChecklist($nombre, $idPuesto, $turnos, $tipo, $respuestaEsperada, $idKpi, $abreIncidencia) {
    try {
      // 1. Insertar el checklist y obtener el ID generado
      $q = "CALL spInsertChecklist(?, ?, ?, ?, ?, ?)";
      $parametros = array($nombre, $idPuesto, $tipo, $respuestaEsperada, $idKpi, $abreIncidencia);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (empty($respuesta)) {
        return json_encode(["Resultado" => false, "ConMsg" => true, "Msg" => "Error al registrar el checklist."]);
      }

      $retorno = $respuesta[0]["Retorno"];
      if ($retorno != 1 && !is_numeric($retorno)) {
        return json_encode(["Resultado" => true, "Siguiente" => false, "ConMsg" => true, "Msg" => $retorno]);
      }

      $idChecklist = $respuesta[0]["IdChecklist"];

      // 2. Insertar turnos en la tabla junction si vienen
      if (!empty($turnos)) {
        $arrTurnos = explode(",", $turnos);
        foreach ($arrTurnos as $idTurno) {
          $idTurno = trim($idTurno);
          if ($idTurno !== '') {
            $qT = "CALL spInsertChecklistTurno(?, ?)";
            $this->ProcedureWithParam($qT, array($idChecklist, $idTurno));
          }
        }
      }

      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg"    => true,
        "Msg"       => "¡El checklist ha sido registrado con éxito!"
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function updateChecklist($idChecklist, $nombre, $idPuesto, $turnos, $tipo, $respuestaEsperada, $idKpi, $abreIncidencia) {
    try {
      $idChecklist = base64_decode($idChecklist);

      // 1. Actualizar datos principales
      $q = "CALL spUpdateChecklist(?, ?, ?, ?, ?, ?, ?)";
      $parametros = array($idChecklist, $nombre, $idPuesto, $tipo, $respuestaEsperada, $idKpi, $abreIncidencia);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (empty($respuesta) || $respuesta[0]["Retorno"] != 1) {
        return json_encode(["Resultado" => true, "Siguiente" => false, "ConMsg" => true, "Msg" => "Error al actualizar el checklist."]);
      }

      // 2. Borrar turnos anteriores
      $qDel = "CALL spDeleteChecklistTurnos(?)";
      $this->ProcedureWithParam($qDel, array($idChecklist));

      // 3. Insertar nuevos turnos
      if (!empty($turnos)) {
        $arrTurnos = explode(",", $turnos);
        foreach ($arrTurnos as $idTurno) {
          $idTurno = trim($idTurno);
          if ($idTurno !== '') {
            $qT = "CALL spInsertChecklistTurno(?, ?)";
            $this->ProcedureWithParam($qT, array($idChecklist, $idTurno));
          }
        }
      }

      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg"    => true,
        "Msg"       => "¡El checklist ha sido actualizado con éxito!"
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function deleteChecklist($idChecklist) {
    try {
      $idChecklist = base64_decode($idChecklist);
      $q = "CALL spDeleteChecklist(?)";
      $parametros = array($idChecklist);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (!empty($respuesta) && $respuesta[0]["Retorno"] == 1) {
        return json_encode(["Resultado" => true, "Siguiente" => true, "ConMsg" => true, "Msg" => "¡Checklist eliminado con éxito!"]);
      }
      return json_encode(["Resultado" => true, "Siguiente" => false, "ConMsg" => true, "Msg" => "Error al eliminar el checklist."]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function getListadoChecklistDiarios($fechaIni, $fechaFin) {
    try {
      $q = "CALL spGetListadoChecklistDiarios(?, ?)";
      $resultado = $this->ProcedureWithParam($q, array($fechaIni, $fechaFin));
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }

  function getDetalleChecklistEmpleado($noEmpleado, $fecha) {
    try {
      $q = "CALL spGetDetalleChecklistEmpleado(?, ?)";
      $resultado = $this->ProcedureWithParam($q, array($noEmpleado, $fecha));
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }
  function getKpisHistorical($noEmpleado, $fecha, $idTurno) {
    try {
      $q = "CALL spGetKpisHistorical(?, ?, ?)";
      $resultado = $this->ProcedureWithParam($q, array($noEmpleado, $fecha, $idTurno));
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor"]);
    }
  }
}
?>
