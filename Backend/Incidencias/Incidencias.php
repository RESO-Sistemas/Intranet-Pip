<?php
if (file_exists("../Conexiones/Conexiones.php")) {
  require_once("../Conexiones/Conexiones.php");
} else if (file_exists("./Conexiones/Conexiones.php")) {
  require_once("./Conexiones/Conexiones.php");
} else if (file_exists("../../Conexiones/Conexiones.php")) {
  require_once("../../Conexiones/Conexiones.php");
} else if (file_exists("././Backend/Conexiones/Conexiones.php")) {
  require_once("././Backend/Conexiones/Conexiones.php");
}

class Incidencias extends Conexiones {

  function registrarIncidencia($idChecklist, $idTipoIncidencia, $noEmpleado, $descripcion, $evidenciaRuta) {
    try {
      $q = "CALL spInsertIncidencia(?, ?, ?, ?, ?)";
      $params = [$idChecklist, $idTipoIncidencia, $noEmpleado, $descripcion, $evidenciaRuta];
      $resultado = $this->ProcedureWithParam($q, $params);

      if (!empty($resultado) && isset($resultado[0]['IdIncidencia'])) {
        return json_encode([
          "Resultado"  => true,
          "Siguiente"  => true,
          "ConMsg"     => true,
          "Msg"        => "¡La incidencia ha sido registrada correctamente!",
          "IdIncidencia" => $resultado[0]['IdIncidencia']
        ]);
      }
      return json_encode([
        "Resultado" => true,
        "Siguiente" => false,
        "ConMsg"    => true,
        "Msg"       => "Error al registrar la incidencia."
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode(["Resultado" => false, "Msg" => "Error interno del servidor."]);
    }
  }

  function getIncidencias() {
    $q = "CALL spGetIncidencias()";
    return json_encode($this->Procedure($q));
  }
}
?>
