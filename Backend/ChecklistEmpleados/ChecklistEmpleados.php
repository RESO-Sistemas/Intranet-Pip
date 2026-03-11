<?php
if (file_exists("../Conexiones/Conexiones.php")) {
  require_once("../Conexiones/Conexiones.php");
} else if (file_exists("../../Conexiones/Conexiones.php")) {
  require_once("../../Conexiones/Conexiones.php");
} else if (file_exists("././Backend/Conexiones/Conexiones.php")) {
  require_once("././Backend/Conexiones/Conexiones.php");
}

class ChecklistEmpleados extends Conexiones {

  /**
   * Obtiene los checklists asignados al puesto del empleado para hoy.
   * Devuelve: IdChecklist, Nombre, RespuestaEsperada, AbreIncidencia,
   *           IdTipoIncidencia, RespuestaEmpleado, YaContestado, IdKpi
   */
  function getChecklistsByPuesto($idPuesto, $noEmpleado) {
    try {
      $q = "CALL spGetChecklistsByPuesto(?, ?)";
      $resultado = $this->ProcedureWithParam($q, [$idPuesto, $noEmpleado]);
      return json_encode(["Resultado" => true, "Data" => $resultado]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor."]);
    }
  }

  /**
   * Guarda la respuesta de un empleado a un ítem de checklist.
   * Usa spGuardarRespuestaChecklist que hace INSERT o UPDATE según si ya contestó hoy.
   */
  function guardarRespuesta($noEmpleado, $idChecklist, $respuesta) {
    try {
      $q = "CALL spGuardarRespuestaChecklist(?, ?, ?)";
      $resultado = $this->ProcedureWithParam($q, [$noEmpleado, $idChecklist, $respuesta]);

      if (!empty($resultado) && isset($resultado[0]['Retorno']) && $resultado[0]['Retorno'] == 1) {
        return json_encode(["Resultado" => true, "Siguiente" => true]);
      }
      return json_encode(["Resultado" => false, "Msg" => "No se pudo guardar la respuesta."]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor."]);
    }
  }
}
?>
