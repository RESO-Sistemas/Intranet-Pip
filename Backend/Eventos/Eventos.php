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
  class Eventos extends Conexiones {
    function getEventosDetalle ($fecha) {
        $ArrayRetorno = [];
        $Datos = [];
        $fechaSinFormatear = $fecha;
        $fechaSinFormatear = str_replace("/","-",$fechaSinFormatear);

        $DateTime = DateTime::createFromFormat('m-d-Y', $fechaSinFormatear);
        $FechaAgenda = $DateTime->format('Y-m-d');

        $FechaMesDia = DateTime::createFromFormat('Y-m-d', $FechaAgenda);
        $FechaMesDia = $FechaMesDia->format('m-d');

        $EventosBirthday = new Eventos();
        $DetalleEventosBirthday = $EventosBirthday->getEventoDetalleBirthday($fechaSinFormatear,$FechaAgenda,$FechaMesDia);

        $EventosAnniversary = new Eventos();
        $DetalleEventosAnniversary = $EventosAnniversary->getEventoDetalleAnniversary($fechaSinFormatear,$FechaAgenda,$FechaMesDia);

        $EventosEvento = new Eventos();
        $DetalleEventosEvento = $EventosEvento->getEventoDetalleEvento($fechaSinFormatear,$FechaAgenda,$FechaMesDia);

        $EventosCapacitacion = new Eventos();
        $DetalleEventosCapacitacion = $EventosCapacitacion->getEventoDetalleCapacitacion($fechaSinFormatear,$FechaAgenda,$FechaMesDia);
        $Datos = [
            "EventosBirthday" => $DetalleEventosBirthday,
            "EventosAnniversary" => $DetalleEventosAnniversary,
            "EventosEvento" => $DetalleEventosEvento,
            "EventosCapacitacion" => $DetalleEventosCapacitacion
        ];
        array_push($ArrayRetorno,$Datos);
        return json_encode($ArrayRetorno);
    }

    function getEventoDetalleBirthday ($fechaSinFormatear,$FechaAgenda,$FechaMesDia) {
        $IdSucursal = ($_COOKIE["IdSucursal"]);
        $q = "SELECT Nombre,date_format(FNacimiento, '%d-%m') as FNacimiento FROM Empleados WHERE date_format(FNacimiento,'%m-%d') = '$FechaMesDia'  AND Status = 1;";
        $cons = $this->Select($q,array());
        return $cons;
    }

    function getEventoDetalleAnniversary ($fechaSinFormatear,$FechaAgenda,$FechaMesDia) {
        $IdSucursal = ($_COOKIE["IdSucursal"]);
        $q = "SELECT Nombre,date_format(Antiguedad, '%d-%m') as Antiguedad FROM Empleados WHERE date_format(Antiguedad,'%m-%d') = '$FechaMesDia'  AND Status = 1;";
        $cons = $this->Select($q,array());
        return $cons;
    }

    function getEventoDetalleEvento ($fechaSinFormatear,$FechaAgenda,$FechaMesDia) {
        $q = "SELECT * FROM Eventos WHERE FechaInicio = '$FechaAgenda' AND Status = 1;";
        $cons = $this->Select($q,array());
        return $cons;
    }

    function getEventoDetalleCapacitacion ($fechaSinFormatear,$FechaAgenda,$FechaMesDia) {
        $ArrayRetorno = [];
        $DatosArr = [];
        $NoEmpleado = ($_COOKIE["NoEmpleado"]);
        $q = "SELECT C.Descripcion,C.FechaInicio,C.FechaFin,C.HoraInicio,C.HoraFin,C.Tipo,CD.NoEmpleado FROM Capacitacion AS C
                INNER JOIN CapacitacionDetalle AS CD ON CD.id_capacitacion = C.idCapacitacion
                WHERE C.FechaInicio = '$FechaAgenda'; ";
        $cons = $this->Select($q,array());

        for ($i=0; $i < sizeof($cons); $i++) {
            $EmpleadosSelected = explode(",",$cons[$i]["NoEmpleado"]);

            if (in_array($NoEmpleado,$EmpleadosSelected)) {
                $DatosArr = [
                    "Descripcion" => $cons[$i]["Descripcion"],
                    "FechaInicio" => $cons[$i]["FechaInicio"],
                    "FechaFin" => $cons[$i]["FechaFin"],
                    "HoraInicio" => $cons[$i]["HoraInicio"],
                    "HoraFin" => $cons[$i]["HoraFin"],
                    "Tipo" => $cons[$i]["Tipo"]
                ];
                array_push($ArrayRetorno,$DatosArr);
            }
        }
        return $ArrayRetorno;
    }

    function getEventos ($fecha) {
      $fecha = date_create($fecha);
      $fecha = date_format($fecha,"Y");
      $NoEmpleado = ($_COOKIE["NoEmpleado"]);
      $IdSucursal = ($_COOKIE["IdSucursal"]);

      $q = "SELECT Titulo,concat(Descripcion,' .En un horario de comienzo a',HoraInicio,' y finalizara a las ',HoraFin) as Descripcion,FechaInicio,
            HoraInicio,HoraFin,Status,'event' AS TipoEvento,'#9ED863' AS Color FROM Eventos;";
            $cons = $this->Select($q,array());
      $Conexiones2 = new Conexiones();
      $q2 = "SELECT CDP.id_capacitacion,CDP.NoEmpleado FROM CapacitacionDetalle as CDP
      INNER join Capacitacion AS C ON C.idCapacitacion = CDP.id_capacitacion
      WHERE C.Status = 1;";
      $cons2 = $Conexiones2->Select($q2,array());
      $ArrayId_capacitacionCap = [];
      $DatosPorRegistro = [];
      for ($i=0; $i < sizeof($cons2) ; $i++) {
        $id_capacitacionCap = $cons2[$i]["id_capacitacion"];
        $EmpleadosSelected = $cons2[$i]["NoEmpleado"];
        $DatosEmpleadosSelected = explode(",",$EmpleadosSelected);
        // $DatosId_capacitacionCap = explode(",",$id_dptoCap);

        $DatosId_dptoCap = $id_capacitacionCap;
        $ContadorCoincidenciaDivicion = "0";
        $ContadorCoincidenciaDepartamento = "0";

        if (in_array($NoEmpleado,$DatosEmpleadosSelected)) {
          $Conexiones3 = new Conexiones();
          $q3 = "SELECT C.Descripcion as Titulo, concat('Capacitación: ',C.Descripcion,'.En fecha de comienzo ',C.FechaInicio,' y finalizara en la fecha ',FechaFin) as Descripcion,
                concat(date_format(C.FechaInicio,'%Y-%m-%d')) as FechaInicio,'' as HoraInicio,'' as HoraFin, '' AS Status,
                'holiday' AS TipoEvento,'#C0392B' AS Color
                FROM Capacitacion AS C
                WHERE C.idCapacitacion = '$id_capacitacionCap' and C.Status = 1;";
                $cons3 = $Conexiones3->Select($q3,array());
                $Titulo = $cons3[0]["Titulo"];
                $Descripcion = $cons3[0]["Descripcion"];
                $FechaInicio = $cons3[0]["FechaInicio"];
                $HoraInicio = $cons3[0]["HoraInicio"];
                $HoraFin = $cons3[0]["HoraFin"];
                $Status = $cons3[0]["Status"];
                $TipoEvento = $cons3[0]["TipoEvento"];
                $Color = $cons3[0]["Color"];
                $DatosPorRegistro = [
                  "Titulo" => $Titulo,
                  "Descripcion" => $Descripcion,
                  "FechaInicio" => $FechaInicio,
                  "HoraInicio" => $HoraInicio,
                  "HoraFin" => $HoraFin,
                  "Status" => $Status,
                  "TipoEvento" => $TipoEvento,
                  "Color" => $Color
                ];
                array_push($cons,$DatosPorRegistro);
        }
      }
      return json_encode($cons);
    }

    function getEventosAdmin ($fecha) {
      $fecha = date_create($fecha);
      $fecha = date_format($fecha,"Y");
      $q = "SELECT Titulo,Descripcion,FechaInicio,FechaFin,HoraInicio,HoraFin,Status,'event' AS TipoEvento,'#9ED863' AS Color,idEventos FROM Eventos ORDER BY FechaInicio DESC";
      return json_encode($this->Select($q,array()));
    }

    function addEvento ($Titulo,$Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin) {
      try {
        $q = "INSERT INTO Eventos (Titulo,Descripcion,FechaInicio,FechaFin,HoraInicio,HoraFin,Registro)
  			values ('$Titulo','$Descripcion','$FechaInicio','$FechaFin','$HoraInicio','$HoraFin',now());";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }

    function getDatosEvento ($idEventos) {
      $q = "SELECT * FROM Eventos
            WHERE idEventos = '$idEventos';";
      return json_encode($this->Select($q,array()));
    }
    function updateEvento ($Titulo,$Descripcion,$FechaInicio,$FechaFin,$HoraInicio,$HoraFin,$idEventos) {
      try {
        $q = "UPDATE Eventos SET Titulo = '$Titulo',
                                Descripcion = '$Descripcion',
                                FechaInicio = '$FechaInicio',
                                FechaFin = '$FechaFin',
                                HoraInicio = '$HoraInicio',
                                HoraFin = '$HoraFin'
                                WHERE idEventos = '$idEventos';";
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }

    function updateStatusEvento ($Status,$idEventos) {
      try {
        $q = "UPDATE Eventos SET Status = '$Status' WHERE idEventos = '$idEventos';";
        $this->Select($q,array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }

    }
  }
 ?>
