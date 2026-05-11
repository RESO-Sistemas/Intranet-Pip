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

  // Cargar SessionManager
  if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
  } else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
  }

  // Cargar módulo de notificaciones centralizadas
  if (file_exists("../Notifications/Notifications.php")) {
    require_once("../Notifications/Notifications.php");
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
      return json_encode($fechas);
    }

    function addCapacitacion ($nDescripcion,$nFechaInicio,$nFechaFin,$nHoraInicio,$nHoraFin,$dias,$tipo,$NoEmpleado) {
      $NoEmpleado = substr($NoEmpleado, 0, -1); // Quitar la última coma
      $empleadosArray = explode(",", $NoEmpleado); // Separar por comas
      
      error_log("=== CREANDO CAPACITACION ===");
      error_log("Tipo: " . $tipo);
      error_log("Dias: " . $dias);
      error_log("NoEmpleado original: " . $NoEmpleado);
      error_log("Empleados array: " . print_r($empleadosArray, true));
      
      if ($tipo == "DIA") {
        if ($dias != "") {
            $q = "CALL sp_NuevaCapacitacion2 ('$nDescripcion','$nFechaInicio','$nFechaFin','$nHoraInicio','$nHoraFin','$dias','$tipo')";
            
            try {
              $result_sp = $this->Procedure($q);
            } catch (Exception $e) {
              return "Error al crear capacitacion: " . $e->getMessage();
            }
            $q2 = "SELECT MAX(idCapacitacion) AS id FROM Capacitacion";
            $cons = $this->SelectNotClose($q2);
            $last_id = $cons[0]["id"];
            
            // Insertar cada empleado en CapacitacionDetalle
            $insertados = 0;
            foreach ($empleadosArray as $emp) {
              $emp = trim($emp);
              if (!empty($emp)) {
                $ConexionDetalle = new Conexiones();
                $q3 = "INSERT INTO CapacitacionDetalle (id_capacitacion,NoEmpleado) VALUES ($last_id,'$emp')";
                $result = $ConexionDetalle->ExecuteQuery($q3,array());
                $insertados++;

                // Notificar al empleado asignado a la capacitación
                if (class_exists('Notifications')) {
                    $notifSvc = new Notifications();
                    $notifSvc->insertNotification(
                        $emp,
                        'training',
                        'Capacitación asignada',
                        'Se te ha asignado la capacitación: ' . $nDescripcion,
                        'Capacitacion.php',
                        (int)$last_id,
                        'Capacitacion'
                    );
                }
              }
            }
            
            return $last_id;
          }else {
            return "Agregue almenos un dia";
          }
      }elseif ($tipo == "PROL") {
        $q = "CALL sp_NuevaCapacitacion2 ('$nDescripcion','$nFechaInicio','$nFechaFin','$nHoraInicio','$nHoraFin','$dias','$tipo')";
        try {
          $result_sp = $this->Procedure($q);
        } catch (Exception $e) {
          return "Error al crear capacitacion: " . $e->getMessage();
        }
        $q2 = "SELECT MAX(idCapacitacion) AS id FROM Capacitacion";
        $cons = $this->SelectNotClose($q2);
        $last_id = $cons[0]["id"];
        
        // Insertar cada empleado en CapacitacionDetalle
        $insertados = 0;
        foreach ($empleadosArray as $emp) {
          $emp = trim($emp);
          if (!empty($emp)) {
            $ConexionDetalle = new Conexiones();
            $q3 = "INSERT INTO CapacitacionDetalle (id_capacitacion,NoEmpleado) VALUES ($last_id,'$emp')";
            $result = $ConexionDetalle->ExecuteQuery($q3,array());
            $insertados++;

            // Notificar al empleado asignado a la capacitación
            if (class_exists('Notifications')) {
                $notifSvc = new Notifications();
                $notifSvc->insertNotification(
                    $emp,
                    'training',
                    'Capacitación asignada',
                    'Se te ha asignado la capacitación: ' . $nDescripcion,
                    'Capacitacion.php',
                    (int)$last_id,
                    'Capacitacion'
                );
            }
          }
        }
        
        return $last_id;
        }
    }

    function getCapacitacionDisponibles () {
      $ListCapacitaciones = [];
      $q = "SELECT C.Descripcion,C.FechaInicio,C.FechaFin,C.HoraInicio,C.HoraFin,C.idCapacitacion,C.Dias,C.archivo,C.Tipo,CD.NoEmpleado,
            IF(C.Status = 1,'Activa','Inactiva') as Status
            FROM Capacitacion AS C INNER JOIN CapacitacionDetalle AS CD ON CD.id_capacitacion = C.idCapacitacion
            group by C.idCapacitacion;";
      
      $resp = $this->Select($q,array());
      
      // Optimizacion: Cargar mapeo de dias una sola vez
      $qDays = "SELECT idDiasSemana, Dia FROM DiasSemana ORDER BY idDiasSemana";
      $allDaysRaw = $this->Select($qDays, array());
      $daysMap = [];
      if ($allDaysRaw && is_array($allDaysRaw)) {
        foreach ($allDaysRaw as $d) {
          $daysMap[$d["idDiasSemana"]] = $d["Dia"];
        }
      }

      if ($resp && is_array($resp)) {
        for ($i=0; $i < sizeof($resp) ; $i++) {
          $TextDias = $resp[$i]["Dias"];
          $diasIds = explode(",",$TextDias);
          $diasTextoArr = [];
          
          foreach ($diasIds as $id) {
            $id = trim($id);
            if (!empty($id) && isset($daysMap[$id])) {
              $diasTextoArr[] = $daysMap[$id];
            }
          }
          
          $AllDias = implode(", ",$diasTextoArr);
          $ListCapacitaciones[] = [
            "idCapacitacion" => $resp[$i]["idCapacitacion"],
            "Descripcion" => $resp[$i]["Descripcion"],
            "FechaInicio" => $resp[$i]["FechaInicio"],
            "FechaFin" => $resp[$i]["FechaFin"],
            "HoraInicio" => $resp[$i]["HoraInicio"],
            "HoraFin" => $resp[$i]["HoraFin"],
            "Dias" => $AllDias ?: "Indefinido",
            "Archivo" => $resp[$i]["archivo"],
            "TipoCapacitacion" => $resp[$i]["Tipo"],
            "Status" => $resp[$i]["Status"]
          ];
        }
      }
      return json_encode($ListCapacitaciones);
    }

    function getCapacitacionesUsDisponibles () {
      $NoEmpleado = SessionManager::get("NoEmpleado");
      $ListCapacitaciones = [];
      $q = "SELECT C.Descripcion,C.FechaInicio,C.FechaFin,C.HoraInicio,C.HoraFin,C.idCapacitacion,C.Dias,C.archivo,C.Tipo,CD.NoEmpleado
            FROM Capacitacion AS C INNER JOIN CapacitacionDetalle AS CD ON CD.id_capacitacion = C.idCapacitacion
            WHERE Status = 1 AND curdate() between FechaInicio and C.FechaFin
            group by C.idCapacitacion;";
      $resp = $this->Select($q,array());

      // Optimizacion: Cargar mapeo de dias una sola vez
      $qDays = "SELECT idDiasSemana, Dia FROM DiasSemana ORDER BY idDiasSemana";
      $allDaysRaw = $this->Select($qDays, array());
      $daysMap = [];
      if ($allDaysRaw && is_array($allDaysRaw)) {
        foreach ($allDaysRaw as $d) {
          $daysMap[$d["idDiasSemana"]] = $d["Dia"];
        }
      }

      if ($resp && is_array($resp)) {
        for ($i=0; $i < sizeof($resp) ; $i++) {
          $EmpleadosSelected = explode(",",$resp[$i]["NoEmpleado"]);
          if (in_array($NoEmpleado, $EmpleadosSelected)) {
            $TextDias = $resp[$i]["Dias"];
            $diasIds = explode(",",$TextDias);
            $diasTextoArr = [];
          
            foreach ($diasIds as $id) {
              $id = trim($id);
              if (!empty($id) && isset($daysMap[$id])) {
                $diasTextoArr[] = $daysMap[$id];
              }
            }
          
            $AllDias = implode(", ",$diasTextoArr);
            $ListCapacitaciones[] = [
              "idCapacitacion" => $resp[$i]["idCapacitacion"],
              "Descripcion" => $resp[$i]["Descripcion"],
              "FechaInicio" => $resp[$i]["FechaInicio"],
              "FechaFin" => $resp[$i]["FechaFin"],
              "HoraInicio" => $resp[$i]["HoraInicio"],
              "HoraFin" => $resp[$i]["HoraFin"],
              "Dias" => $AllDias ?: "Indefinido",
              "Archivo" => $resp[$i]["archivo"],
              "TipoCapacitacion" => $resp[$i]["Tipo"]
            ];
          }
        }
      }
      return json_encode($ListCapacitaciones);
    }

    function toggleStatusCapacitacion ($idCapacitacion, $nuevoEstado) {
      try {
        $q = "UPDATE Capacitacion SET Status = '$nuevoEstado' WHERE idCapacitacion = '$idCapacitacion';";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
     }

     function getArchivosCapacitacion(){
       try {
         $q = "SELECT * FROM ArchivosCapacitacion";
         error_log($q);
         $result = $this->Select($q);
         $res = $this->responseSuccess($result);
       } catch (Exception $e) {
         error_log($e->getMessage());
         $res = $this->responseFailed();
       }
        die(json_encode($res));
     }

     function getCentrosCostos () {
        $q = "SELECT * FROM CentroCostos;";
        return json_encode($this->Select($q,array()));
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
              return json_encode($this->Select($q));
      }

      function getDetalleCapacitacion ($idCapacitacion) {
        $idCapacitacion = base64_decode($idCapacitacion);
        $ArrayRetorno = [];
        $ArrDatosEmpleado = [];
        
        $q = "SELECT CD.NoEmpleado AS EmpleadosAgregados, C.Descripcion, C.FechaInicio, C.FechaFin, C.HoraInicio, C.HoraFin,
                C.Dias, C.archivo, C.Tipo FROM Capacitacion AS C
                INNER JOIN CapacitacionDetalle AS CD ON C.idCapacitacion = CD.id_capacitacion
                WHERE C.idCapacitacion = '$idCapacitacion';";
        $cons = $this->Select($q,array());
        
        if ($cons && count($cons) > 0) {
            $EmpleadosAgregados = $cons[0]["EmpleadosAgregados"];
            if (!empty($EmpleadosAgregados)) {
                // Limpiar posibles espacios y comas extra
                $idsArray = array_filter(explode(",", $EmpleadosAgregados));
                if (count($idsArray) > 0) {
                    $idsString = implode("','", $idsArray);
                    $q2 = "SELECT E.NoEmpleado, P.Puesto, SD.Sucursal, E.Nombre FROM Empleados as E
                            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                            INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                            WHERE E.NoEmpleado IN ('$idsString');";
                    
                    $cons2 = $this->Select($q2, array());
                    if ($cons2) {
                        foreach ($cons2 as $emp) {
                            $ArrDatosEmpleado[] = [
                                "NoEmpleado" => intval($emp["NoEmpleado"]),
                                "Puesto" => $emp["Puesto"],
                                "Sucursal" => $emp["Sucursal"],
                                "Nombre" => $emp["Nombre"]
                            ];
                        }
                    }
                }
            }

            $ArrayRetorno[] = [
                "Detalle" => $cons,
                "Empleados" => $ArrDatosEmpleado
            ];
        }

        return json_encode($ArrayRetorno);
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
        return json_encode($this->Select($q,array()));
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
        $Conexiones2->ExecuteQuery($q2,array());
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

      function deleteCapacitacion($nid_capacitacion){
        try {
          $q = "CALL spDeleteCapacitacion('$nid_capacitacion')";
          error_log($q);
          $this->Procedure($q,array());
          foreach(glob("../../Archivos/Capacitaciones/$nid_capacitacion". "/*") as $archivos_carpeta){
            if (is_dir($archivos_carpeta)){
              rmDir_rf($archivos_carpeta);
            } else {
            unlink($archivos_carpeta);
            }
          }
          rmdir("../../Archivos/Capacitaciones/$nid_capacitacion");
          return "1";
        } catch (\Exception $e) {
          return "ERROR!";
        }
      }
  }
