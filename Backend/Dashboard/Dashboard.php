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

class Dashboard extends Conexiones{
  function getDashboardVisitSystem($dateIni, $dateEnd){
    try {
      $q = "SELECT
            	  E.Nombre AS Empleado,
                BVI.FechaRegistro,
                SD.Sucursal,
                P.Puesto,
                SD.IdSucursal
            FROM BitacoraVisitasIndex AS BVI
            INNER JOIN Empleados AS E ON E.NoEmpleado = BVI.NoEmpleado
            INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
            WHERE DATE(BVI.FechaRegistro) BETWEEN ? AND ?
            ORDER BY BVI.FechaRegistro DESC";
      $res = $this->ExecuteQueryWithParam($q, [$dateIni, $dateEnd]);
      $totalV = count($res);

      $uniqueBranch = [];
      $foundBranch = [];
      if ($totalV > 0) {
        for ($i=0; $i < $totalV ; $i++) {
          if (!in_array($res[$i]["IdSucursal"], $foundBranch)) {
            $uniqueBranch[$res[$i]["IdSucursal"]] = [
              "nameBranch" => $res[$i]["Sucursal"],
              "idBranch" => $res[$i]["IdSucursal"],
              "visits" => []
            ];
            $foundBranch[] = $res[$i]["IdSucursal"];
          }
          array_push($uniqueBranch[$res[$i]["IdSucursal"]]["visits"], $res[$i]);
        }
        $uniqueBranch = array_merge($uniqueBranch);
        $cantUnique = count($uniqueBranch);
        for ($i=0; $i < $cantUnique ; $i++) {
          $uniqueBranch[$i]["cantVisits"] = count($uniqueBranch[$i]["visits"]);
        }
      }
      return json_encode([
        "Resultado" => true,
        "Siguiente" => true,
        "Data" => [
          "totalVisits" => $totalV,
          "ListEmployees" => $res,
          "uniqueBranch" => $uniqueBranch
        ]
      ]);
    } catch (\Exception $e) {
      return $e;
    }
  }
}

?>
