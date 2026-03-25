<?php
if (file_exists("../Conexiones/Conexiones.php")) {
  require_once("../Conexiones/Conexiones.php");
}
else {
  if (file_exists("./Conexiones/Conexiones.php")) {
    require_once("./Conexiones/Conexiones.php");
  }
  else if(file_exists("../Conexiones/Conexiones.php")){
    require_once("../Conexiones/Conexiones.php");
    }
  else if(file_exists("../../Conexiones/Conexiones.php")){
    require_once("../../Conexiones/Conexiones.php");
    }
  else if(file_exists("././Backend/Conexiones/Conexiones.php")){
    require_once("././Backend/Conexiones/Conexiones.php");
    }
}
class Puestos extends Conexiones{
  function getPuestos(){
    $q = "SELECT * FROM Puestos;";
    return json_encode($this->Select($q));
  }

    function getPuestosXDivision($IdDivision)
    {
        if ($IdDivision == "") {
            $q = "SELECT * FROM Puestos;
            order by Puesto asc";
        } else {
            $q = "SELECT * FROM Puestos where IdDivision = '$IdDivision' order by Puesto asc;";
        }
        return json_encode($this->Select($q,array()));
    }

    function updateDescPuesto ($Puesto,$IdPuesto) {
      $IdPuesto = base64_decode($IdPuesto);
      $q = "UPDATE Puestos SET Puesto = '$Puesto'
              WHERE IdPuesto = '$IdPuesto';";
      error_log($q);
      $this->ExecuteQuery($q,array());
      return "1";
    }

    function addPuestos($nPuesto,$nIdDivision){
      try {
          $nIdDivision = base64_decode($nIdDivision);
          $q = "CALL spNuevoPuestoControl('$nPuesto','$nIdDivision')";
          error_log($q);
          $respuesta = $this->Procedure($q,array());
          if (sizeof($respuesta) > 0) {
            $msgRetorno = $respuesta[0]["Retorno"];
            if ($msgRetorno == 1) {
              $arrRetorno = [
                "Resultado" => true,
                "Siguiente" => true,
                "ConMsg" => true,
                "Msg" => "¡El nuevo puesto ha sido ingresado con éxito!",
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
              "Msg" => "¡Ha ocurrido un error el insertar un nuevo puesto!"
            ];
          }
          return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function asignaJefePuesto($nIdPuesto){
    try {
      $nIdPuesto = base64_decode($nIdPuesto);
      $q = "CALL spAsignaJefePuesto('$nIdPuesto')";
      $respuesta = $this->Procedure($q,array());
      if (sizeof($respuesta) > 0) {
        if ($respuesta[0]["Retorno"] == "1") {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => true,
            "Msg" => $respuesta[0]["MsgRetorno"]
          ];
        }
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "¡Ha ocurrido un error!"
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function asignaJefesPuesto($Jefes,$IdPuesto){
    try {
      if (is_array($Jefes)) {
        $Jefes = implode(',', $Jefes);
      }
      $Jefes = trim($Jefes, ',');
      $IdPuesto = base64_decode($IdPuesto);
      $q = "UPDATE Puestos SET IdJefesPuesto = '$Jefes' WHERE IdPuesto = '$IdPuesto';";
      $this->ExecuteQuery($q,array());
      $arrRetorno = [
        "Resultado" => true,
        "Siguiente" => true,
        "ConMsg" => true,
        "Msg" => "Jefe actualizado."
      ];
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function loadJefesAsigPuesto($IdPuesto){
    try {
      $IdPuesto = base64_decode($IdPuesto);
      $q = "SELECT IdJefesPuesto FROM Puestos WHERE IdPuesto = '$IdPuesto';";
      $resultado = $this->Select($q,array());
      if (sizeof($resultado) > 0) {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "Datos" => $resultado
        ];
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Ha ocurrido un error al obtener el listado de jefes del puesto seleccionado."
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function getListPuestosDivision($IdDivision){
    try {
      if ($IdDivision == "") {
        $q = "SELECT TO_BASE64(IdPuesto) AS IdPuesto,Puesto
              FROM Puestos;";
      } else {
        $q = "SELECT TO_BASE64(IdPuesto) AS IdPuesto,Puesto
              FROM Puestos  WHERE TO_BASE64(IdDivision) = '$IdDivision';";
      }
      $resultado = $this->Select($q,array());
      $arrRetorno = [
        "Resultado" => true,
        "Siguiente" => true,
        "Data" => $resultado
      ];
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }
}

 ?>
