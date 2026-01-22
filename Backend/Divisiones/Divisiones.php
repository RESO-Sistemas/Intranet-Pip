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

class Divisiones extends Conexiones {
  function getDivisiones(){
    $q = "SELECT * FROM Divisiones;";
    return json_encode($this->Select($q));
  }

  function getListDivisiones(){
    try {
        $q = "SELECT TO_BASE64(IdDivision) AS IdDivision,Division FROM Divisiones;";
        $resultado = $this->Select($q,array());
        if (sizeof($resultado) > 0) {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => true,
            "ConMsg" => false,
            "Datos" => $resultado
          ];
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false,
            "ConMsg" => false,
          ];
        }
        return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }
}
 ?>
