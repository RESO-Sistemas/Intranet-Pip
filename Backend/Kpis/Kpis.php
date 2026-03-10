<?php
if (file_exists("../Conexiones/Conexiones.php")) {
  require_once("../Conexiones/Conexiones.php");
}
else {
  if (file_exists("./Conexiones/Conexiones.php")) {
    require_once("./Conexiones/Conexiones.php");
  }
  else if(file_exists("../../Conexiones/Conexiones.php")){
    require_once("../../Conexiones/Conexiones.php");
  }
  else if(file_exists("././Backend/Conexiones/Conexiones.php")){
    require_once("././Backend/Conexiones/Conexiones.php");
  }
}

class Kpis extends Conexiones {

  function getKpis() {
    $q = "CALL spGetKpis()";
    $resultado = $this->Procedure($q);
    return json_encode($resultado);
  }

  function getPuestos() {
    $q = "SELECT IdPuesto, Puesto FROM Puestos ORDER BY Puesto ASC";
    return json_encode($this->Select($q));
  }

  function insertKpi($nombre, $valorAlta, $valorMedia, $valorBaja, $prioridad, $puestos) {
    try {
      $q = "CALL spInsertKpi(?, ?, ?, ?, ?, ?)";
      $parametros = array($nombre, $valorAlta, $valorMedia, $valorBaja, $prioridad, $puestos);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0) {
        $msgRetorno = $respuesta[0]["Retorno"];
        if ($msgRetorno == 1) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Msg" => "¡El KPI ha sido registrado con éxito!"
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => $msgRetorno
          ];
        }
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "¡Ha ocurrido un error al registrar el KPI!"
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode([
        "Resultado" => false,
        "Msg" => "Error interno del servidor"
      ]);
    }
  }

  function updateKpi($idKpi, $nombre, $valorAlta, $valorMedia, $valorBaja, $prioridad, $puestos) {
    try {
      $idKpi = base64_decode($idKpi);
      $q = "CALL spUpdateKpi(?, ?, ?, ?, ?, ?, ?)";
      $parametros = array($idKpi, $nombre, $valorAlta, $valorMedia, $valorBaja, $prioridad, $puestos);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      if (sizeof($respuesta) > 0) {
        $msgRetorno = $respuesta[0]["Retorno"];
        if ($msgRetorno == 1) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Msg" => "¡El KPI ha sido actualizado con éxito!"
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => true,
            "Msg" => $msgRetorno
          ];
        }
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "¡Ha ocurrido un error al actualizar el KPI!"
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode([
        "Resultado" => false,
        "Msg" => "Error interno del servidor"
      ]);
    }
  }

  function toggleKpi($idKpi, $activo) {
    try {
      $idKpi = base64_decode($idKpi);
      $q = "CALL spToggleKpi(?, ?)";
      $parametros = array($idKpi, $activo);
      $respuesta = $this->ProcedureWithParam($q, $parametros);

      $estado = $activo == 1 ? "activado" : "desactivado";
      $arrRetorno = [
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg" => true,
        "Msg" => "¡El KPI ha sido " . $estado . " con éxito!"
      ];
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode([
        "Resultado" => false,
        "Msg" => "Error interno del servidor"
      ]);
    }
  }

  function deleteKpi($idKpi) {
    try {
      $idKpi = base64_decode($idKpi);
      $q = "DELETE FROM Kpis WHERE IdKpi = ?";
      $this->ExecuteQueryWithParam($q, [$idKpi]);
      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg" => true,
        "Msg" => "¡El KPI ha sido eliminado con éxito!"
      ]);
    } catch (\Exception $e) {
      error_log($e);
      return json_encode([
        "Resultado" => false,
        "Msg" => "Error al eliminar el KPI"
      ]);
    }
  }
}
?>
