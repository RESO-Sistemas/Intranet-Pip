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
class Sucursal extends Conexiones{

  function getAllBranchesPerDiv($div){
    try {
      $q = "SELECT
              IdSucursal AS id,
              Sucursal AS description
            FROM SucursalDepto
            WHERE IdDivision = ?
            ORDER BY Sucursal ASC;";
      $res = $this->ExecuteQueryWithParam($q, [$div]);
      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "Data" => $res
      ]);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function getSucursales(){
    $q = "SELECT * FROM SucursalDepto;";
    return json_encode($this->Select($q));
  }

  function getSucursalesXDivision($IdDivision)
  {
      if ($IdDivision == "") {
          $q = "SELECT * FROM SucursalDepto;";
      } else {
          $q = "SELECT * FROM SucursalDepto where IdDivision = '$IdDivision';";
      }
      return json_encode($this->Select($q));
  }

  function getListSucursalPorDivision($IdDivision){
    try {
      if ($IdDivision == "") {
          $q = "SELECT TO_BASE64(IdSucursal) AS IdSucursal, Sucursal FROM SucursalDepto;";
      } else {
          $q = "SELECT TO_BASE64(IdSucursal) AS IdSucursal, Sucursal FROM SucursalDepto where TO_BASE64(IdDivision) = '$IdDivision';";
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
