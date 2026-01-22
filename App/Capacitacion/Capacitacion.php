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

  class Capacitacion extends Conexiones {
    function getFechasRango($fechaInicio,$fechaFin){
      $fechaInicio=strtotime($fechaInicio);
      $fechaFin=strtotime($fechaFin);
      $fechas = [];
      $dia = "";
      for($i=$fechaInicio; $i<=$fechaFin; $i+=86400){
          $dia = date("l", $i);
          $datos = [
            "fecha" => $dia
          ];
          array_push($fechas,$datos);
      }
      return '{ "NoFechasRango": '.json_encode($fechas)."}";
    }

    function addCapacitacion ($nDescripcion,$nFechaInicio,$nFechaFin,$nHoraInicio,$nHoraFin,$dias,$archivo,$tipo,$NoEmpleado) {
      $NoEmpleado = substr($NoEmpleado, 0, -1);
      if ($tipo == "DIA") {
        if ($dias != "") {
            $q = "CALL sp_NuevaCapacitacion2 ('$nDescripcion','$nFechaInicio','$nFechaFin','$nHoraInicio','$nHoraFin','$dias','$archivo','$tipo')";
            $this->Procedure($q,array());
            $q2 = "SELECT MAX(idCapacitacion) AS id FROM Capacitacion";
            $cons = $this->SelectNotClose($q2);
            $last_id = $cons[0]["id"];
            $q3 = "INSERT INTO CapacitacionDetalle (id_capacitacion,NoEmpleado) VALUES ($last_id,'$NoEmpleado')";

            $result = $this->ExecuteQuery($q3,array());
            return $last_id;
          }else {
            return "Agregue almenos un dia";
          }
      }elseif ($tipo == "PROL") {
        $q = "CALL sp_NuevaCapacitacion2 ('$nDescripcion','$nFechaInicio','$nFechaFin','$nHoraInicio','$nHoraFin','$dias','$archivo','$tipo')";
        $this->Procedure($q,array());
        $q2 = "SELECT MAX(idCapacitacion) AS id FROM Capacitacion";
        $cons = $this->SelectNotClose($q2);
        $last_id = $cons[0]["id"];
        $q3 = "INSERT INTO CapacitacionDetalle (id_capacitacion,NoEmpleado) VALUES ($last_id,'$NoEmpleado')";
        error_log($q3);
        $result = $this->ExecuteQuery($q3,array());
        return $last_id;
        }
    }

    function getCapacitacionDisponibles () {
      $ListCapacitaciones = [];
      $q = "SELECT C.Descripcion,C.FechaInicio,C.FechaFin,C.HoraInicio,C.HoraFin,C.idCapacitacion,C.Dias,C.archivo,C.Tipo,CD.NoEmpleado
            FROM Capacitacion AS C INNER JOIN CapacitacionDetalle AS CD ON CD.id_capacitacion = C.idCapacitacion
            group by C.idCapacitacion;";
      $resp = $this->Select($q,array());
      $datos = [];
      for ($i=0; $i < sizeof($resp) ; $i++) {
        $TextDias = $resp[$i]["Dias"];
        $dias = explode(",",$TextDias);
        $idCapacitacion = $resp[$i]["idCapacitacion"];
        $AllDias = "";
        $diasTextoArr = [];
        for ($j=0; $j < sizeof($dias) ; $j++) {
          $Conexiones2 = new Conexiones();
          $q2 = "SELECT Dia from DiasSemana
                 where idDiasSemana = '$dias[$j]'
                 order by idDiasSemana;";
                 $resp2 = $Conexiones2->Select($q2,array());
                array_push($diasTextoArr, $resp2[0]["Dia"]);
        }
             $AllDias = implode(",",$diasTextoArr);
                $datos = [
                  "idCapacitacion" => $resp[$i]["idCapacitacion"],
                  "Descripcion" => $resp[$i]["Descripcion"],
                  "FechaInicio" => $resp[$i]["FechaInicio"],
                  "FechaFin" => $resp[$i]["FechaFin"],
                  "HoraInicio" => $resp[$i]["HoraInicio"],
                  "HoraFin" => $resp[$i]["HoraFin"],
                  "Dias" => $AllDias,
                  "Archivo" => $resp[$i]["archivo"],
                  "TipoCapacitacion" => $resp[$i]["Tipo"]
                ];
                array_push($ListCapacitaciones,$datos);
      }
      return '{ "ListadoCapacitaciones": '.json_encode($ListCapacitaciones)."}";
    }

    function getCapacitacionesUsDisponibles($NoEmpleado) {

      $ListCapacitaciones = [];
      $q = "SELECT C.Descripcion,C.FechaInicio,C.FechaFin,C.HoraInicio,C.HoraFin,C.idCapacitacion,C.Dias,C.archivo,C.Tipo,CD.NoEmpleado
            FROM Capacitacion AS C INNER JOIN CapacitacionDetalle AS CD ON CD.id_capacitacion = C.idCapacitacion
            WHERE Status = 1 AND curdate() between FechaInicio and C.FechaFin
            group by C.idCapacitacion;";
      $resp = $this->Select($q,array());
      $datos = [];
      for ($i=0; $i < sizeof($resp) ; $i++) {
        $EmpleadosSelected = explode(",",$resp[$i]["NoEmpleado"]);
        $TextDias = $resp[$i]["Dias"];
        $dias = explode(",",$TextDias);
        $idCapacitacion = $resp[$i]["idCapacitacion"];
        $AllDias = "";
        $diasTextoArr = [];
       if (in_array($NoEmpleado,$EmpleadosSelected)) {
        for ($j=0; $j < sizeof($dias) ; $j++) {
          $Conexiones2 = new Conexiones();
          $q2 = "SELECT Dia from DiasSemana
                 where idDiasSemana = '$dias[$j]'
                 order by idDiasSemana;";
                 $resp2 = $Conexiones2->Select($q2,array());
                array_push($diasTextoArr, $resp2[0]["Dia"]);
        }
        $AllDias = implode(",",$diasTextoArr);
          $datos = [
            "idCapacitacion" => $resp[$i]["idCapacitacion"],
            "Descripcion" => $resp[$i]["Descripcion"],
            "FechaInicio" => $resp[$i]["FechaInicio"],
            "FechaFin" => $resp[$i]["FechaFin"],
            "HoraInicio" => $resp[$i]["HoraInicio"],
            "HoraFin" => $resp[$i]["HoraFin"],
            "Dias" => $AllDias,
            "Archivo" => $resp[$i]["archivo"],
            "TipoCapacitacion" => $resp[$i]["Tipo"]
          ];
          array_push($ListCapacitaciones,$datos);
       }
      }
      return '{ "ListadoCapacitacionesXUsuario": '.json_encode($ListCapacitaciones)."}";
    }

    function cancelarCapacitacion ($idCapacitacion) {
      try {
        $q = "UPDATE Capacitacion SET Status = 0 WHERE idCapacitacion = '$idCapacitacion';";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
     }

     function getArchivosCapacitacion(){
       try {
         $q = "SELECT * FROM ArchivosCapacitacion";
         $result = $this->Select($q);
         $res = $this->responseSuccess($result);
       } catch (Exception $e) {
         error_log($e->getMessage());
         $res = $this->responseFailed();
       }
        die(json_encode($res));
     }

     function getPersonal($IdPuesto,$IdSucursal,$IdDivision){
        if ($IdPuesto == "" && $IdSucursal == "" && $IdDivision == "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal WHERE E.Status = 1 ";
        }elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision == "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' and E.Status = 1 ";
        }elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision == "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' and E.Status = 1 ";
        }elseif ($IdPuesto == "" && $IdSucursal == "" && $IdDivision != "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE D.IdDivision = '$IdDivision' and E.Status = 1 ;";
        }elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision == "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' AND SD.IdSucursal = '$IdSucursal' and E.Status = 1 ";
        }elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision != "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' AND D.IdDivision = '$IdDivision' and E.Status = 1 ";
        }elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision != "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' and E.Status = 1 ";
        }elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision != "") {
          $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' AND P.IdPuesto = '$IdPuesto' and E.Status = 1 ";
        }
              return '{ "ListadoPersonalCapFiltro": '.json_encode($this->Select($q))."}";
      }

      function getDetalleCapacitacion ($idCapacitacion) {
        $idCapacitacion = base64_decode($idCapacitacion);
        $ArrayRetorno = [];
        $Datos = [];
        $ArrDatosEmpleado = [];
        $q = "SELECT CD.NoEmpleado AS EmpleadosAgregados,C.Descripcion,C.FechaInicio,C.FechaFin,C.HoraInicio,C.HoraFin,
                C.Dias,C.archivo,C.Tipo FROM Capacitacion AS C
                INNER JOIN CapacitacionDetalle AS CD ON C.idCapacitacion = CD.id_capacitacion
                WHERE C.idCapacitacion = '$idCapacitacion';";
        $cons = $this->Select($q,array());
        $EmpleadosAgregados = $cons[0]["EmpleadosAgregados"];
        $ExplodeEmpleadosAgregados = explode(",",$EmpleadosAgregados);
        for ($i=0; $i < sizeof($ExplodeEmpleadosAgregados) ; $i++) {
            $Conexiones2 = new Conexiones();
            $q2 = "SELECT  E.NoEmpleado,P.Puesto,SD.Sucursal,E.Nombre FROM Empleados as E
                    INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                    INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                    WHERE E.NoEmpleado = '$ExplodeEmpleadosAgregados[$i]';";
            $cons2 = $Conexiones2->Select($q2,array());
            $DatosEmpleado = [];
            for ($j=0; $j < sizeof($cons2) ; $j++) {
                $DatosEmpleado = [
                    "NoEmpleado" => intval($cons2[$j]["NoEmpleado"]),
                    "Puesto" => $cons2[$j]["Puesto"],
                    "Sucursal" => $cons2[$j]["Sucursal"],
                    "Nombre" => $cons2[$j]["Nombre"]
                ];
                array_push($ArrDatosEmpleado,$DatosEmpleado);
            }
        }
        $Datos = [
            "Detalle" => $cons,
            "Empleados" => $ArrDatosEmpleado
        ];
        array_push($ArrayRetorno,$Datos);
        return '{ "DetalleCapacitacion": '.json_encode($ArrayRetorno)."}";
      }

      function updateNameArchivoCapacitacion ($archivo,$idCapacitacion) {
        $q = "UPDATE Capacitacion SET archivo = '$archivo'
                WHERE idCapacitacion = '$idCapacitacion';";
        $this->ExecuteQuery($q,array());
      }

      function getArchivosActualesCapacitacion($idCapacitacion){
        $idCapacitacion = base64_decode($idCapacitacion);
        $q = "SELECT archivo FROM Capacitacion
                WHERE idCapacitacion = '$idCapacitacion';";
                return '{ "ArchivosPorCapacitacion": '.json_encode($this->Select($q,array()))."}";
      }

      function eliminarArchivoCapacitacionSelected ($idCapacitacion,$Archivo) {
        $idCapacitacion = base64_decode($idCapacitacion);
        $q = "SELECT archivo FROM Capacitacion
                WHERE idCapacitacion = '$idCapacitacion';";
        $cons = $this->Select($q,array());
        $AllArchivos = $cons[0]["archivo"];
        $AllArchivos = str_replace($Archivo,'',$AllArchivos);
        $AllArchivos = str_replace(',,',',',$AllArchivos);
        $Digito1 = $AllArchivos[0];
        $DigitoUltimo = $AllArchivos[-1];
        if ($Digito1 === ",") {
          $AllArchivos = ltrim($AllArchivos,',');
        } elseif ($DigitoUltimo === ',') {
          $AllArchivos = substr($AllArchivos,0,-1);
        }
        $Conexiones2 = new Conexiones();
        $q2 = "UPDATE Capacitacion SET archivo = '$AllArchivos'
                WHERE idCapacitacion = '$idCapacitacion';";
        $Conexiones2->ExecuteQuery($q2,array(9));
        unlink("../../Archivos/Capacitaciones/$idCapacitacion/$Archivo");
        return "1";
      }

      function UpdateCapacitacion ($Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin,$Dias,$archivo,$Tipo,$idCapacitacion,$NoEmpleado) {
        if ($Tipo == "PROL") {
          $HoraInicio = "";
          $HoraFin = "";
          $Dias = "";
        }
        $NoEmpleado = substr($NoEmpleado, 0, -1);
        $q = "SELECT archivo FROM Capacitacion WHERE idCapacitacion = '$idCapacitacion';";
        $cons = $this->Select($q,array());
        $TextArchivoActual = $cons[0]["archivo"];
        if ($archivo != "") {
          $TextArchivoActual = $TextArchivoActual.",".$archivo;
        }
        $Conexiones2 = new Conexiones();
        $q2 = "UPDATE Capacitacion SET Descripcion = '$Descripcion',FechaInicio = '$FechaInicio', FechaFin = '$FechaFin',
        HoraInicio = '$HoraInicio', HoraFin = '$HoraFin', Dias = '$Dias', archivo = '$TextArchivoActual', Tipo = '$Tipo'
                WHERE idCapacitacion = '$idCapacitacion';";
        $Conexiones2->ExecuteQuery($q2,array());

        $Conexiones3 = new Conexiones();
        $q3 = "UPDATE CapacitacionDetalle SET NoEmpleado = '$NoEmpleado'
                WHERE id_capacitacion = '$idCapacitacion';";
        $Conexiones3->ExecuteQuery($q3,array());
      }

      function GetCantidadArchivosActuales ($idCapacitacion) {
        $idCapacitacion = base64_decode($idCapacitacion);
        $q = "SELECT archivo FROM Capacitacion WHERE idCapacitacion = '$idCapacitacion';";
        $cons = $this->Select($q,array());
        $TextArchivos = $cons[0]["archivo"];
        $TextArchivos = explode(",",$TextArchivos);
        $ContadorArchivos = sizeof($TextArchivos);
        return $ContadorArchivos;
      }

  }
