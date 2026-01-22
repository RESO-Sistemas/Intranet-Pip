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

    class Directorios extends Conexiones
    {
        function getDirectorioCorreosTelefonos () {
            $q = "SELECT DD.idDirectoriosCorreosTelefonos,E.Nombre,P.Puesto,DD.MarcacionCorta,DD.idDetalleDirectoriosCorreosTelefonos,DD.Email,DD.Telefono AS Movil FROM DetalleDirectoriosCorreosTelefonos AS DD
                    INNER JOIN Empleados AS E ON E.NoEmpleado = DD.NoEmpleado
                    INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                    WHERE DD.Status = 1;";
                    $cons = $this->Select($q,array());

                    return '{ "DirectorioCorreosTelefonos": '.json_encode($cons)."}";
        }



        // function getTiposDirectorioExtensiones ($Tipo,$TiposExtSelected) {
        //     if (sizeof($TiposExtSelected) > 0) {
        //         $ComplementoWhereOR = "";
        //         for ($i=0; $i < sizeof($TiposExtSelected) ; $i++) {
        //             $ComplementoWhereOR = $ComplementoWhereOR."idDirectorioExtensiones = $TiposExtSelected[$i] OR ";
        //         }
        //         $ComplementoWhereOR = substr($ComplementoWhereOR, 0, -3);
        //         $WhereFinal = "Status = 1 AND ($ComplementoWhereOR)";
        //     } else {
        //         $WhereFinal = "Status = 1";
        //     }
        //
        //     $q = "SELECT idDirectorioExtensiones,Tipo FROM DirectorioExtensiones
        //           WHERE $WhereFinal;";
        //     if ($Tipo == "JSON") {
        //         return json_encode($this->Select($q,array()));
        //     } elseif ($Tipo == "ARR") {
        //         $cons = $this->Select($q,array());
        //         return $cons;
        //     }
        // }

        // function getDetalleDirectorioExtensiones () {
        //
        //     $q = "SELECT DD.idDirectorioExtensiones,E.Nombre,DD.Extension,DD.idDetalleDirectorioExtensiones FROM DetalleDirectorioExtensiones AS DD
        //             INNER JOIN Empleados AS E ON E.NoEmpleado = DD.NoEmpleado
        //             WHERE DD.Status = 1;";
        //
        //
        //     $cons = $this->Select($q,array());
        //
        //     return '{ "DirectorioExtensiones": '.json_encode($cons)."}";
        // }

        // function getDirectorioExtensiones ($TiposExtSelected) {
        //     $ArrRetorno = [];
        //     $Datos = [];
        //     $Directorios = new Directorios();
        //     $Directorios2 = new Directorios();
        //     $TiposDirectorio = $Directorios->getTiposDirectorioExtensiones("ARR",$TiposExtSelected);
        //     $DetalleDirectorio = $Directorios2->getDetalleDirectorioExtensiones("ARR",$TiposExtSelected);
        //     $Datos = [
        //         "Tipos" => $TiposDirectorio,
        //         "Detalle" => $DetalleDirectorio
        //     ];
        //     array_push($ArrRetorno,$Datos);
        //     return json_encode($ArrRetorno);
        // }

        // function getDirectorioExtension () {
        //     $ArrRetorno = [];
        //     $Datos = [];
        //     $Directorios = new Directorios();
        //     $Directorios2 = new Directorios();
        //     $TiposDirectorio = $Directorios->getTiposDirectorioExtensiones("ARR",$TiposExtSelected);
        //     $DetalleDirectorio = $Directorios2->getDetalleDirectorioExtensiones("ARR",$TiposExtSelected);
        //     $Datos = [
        //         "Tipos" => $TiposDirectorio,
        //         "Detalle" => $DetalleDirectorio
        //     ];
        //     array_push($ArrRetorno,$Datos);
        //     return json_encode($ArrRetorno);
        // }

        function getDirectorioExtensiones(){
        try {
            $q = "SELECT DE.Tipo,E.Nombre,DDE.Extension
                  FROM DetalleDirectorioExtensiones AS DDE
                  INNER JOIN DirectorioExtensiones AS DE ON DE.idDirectorioExtensiones = DDE.idDirectorioExtensiones
                  INNER JOIN Empleados AS E ON E.NoEmpleado = DDE.NoEmpleado
                  WHERE DDE.Status = 1 and E.Status = 1;";
            $cons = $this->Select($q,array());
            return '{ "DirectorioExtensiones": '.json_encode($cons)."}";
        } catch (\Exception $e) {
          return $e;
        }
      }

        function getSucursalesDisponiblesDirectorio () {
            $q = "SELECT IdSucursal,Sucursal FROM SucursalDepto
                         WHERE IdSucursal NOT IN (SELECT IdSucursal FROM DirectorioSucursales WHERE Status = 1);";
            return json_encode($this->Select($q,array()));
        }

        function getEmpleadosSucursalSelected ($IdSucursal) {
            $q = "SELECT NoEmpleado,Nombre FROM Empleados
                         WHERE NoEmpleado NOT IN (SELECT NoEmpleado FROM DetalleDirectorioSucursales) AND Status = 1 AND IdSucursal = '$IdSucursal';";
            return json_encode($this->Select($q,array()));
        }

        function addSucursalesDirectorio ($IdSucursal,$Direccion,$Telefono,$NumRed,$Correo,$FechaApertura,$MarcacionCorta) {
            if ($Direccion == "" || $Telefono == "" || $NumRed == "" || $Correo == "" || $FechaApertura == "" || $MarcacionCorta == "") {
                return "Ingrese todos los datos, por favor.";
            } else {
                $q = "SELECT COUNT(*) as Existe FROM DirectorioSucursales WHERE Telefono = '$Telefono' OR NumRed = '$NumRed' OR Correo = '$Correo' OR MarcacionCorta = '$MarcacionCorta';";
                $cons = $this->Select($q,array());
                $Existe = $cons[0]["Existe"];
                if ($Existe > 0) {
                    return "Uno o más datos ya se encuentran registrados.";
                } else {
                    $Conexiones2 = new Conexiones();
                    $q2 = "INSERT INTO DirectorioSucursales (IdSucursal,Direccion,Telefono,NumRed,Correo,FechaApertura,MarcacionCorta,Registro)
                                 VALUES ('$IdSucursal','$Direccion','$Telefono','$NumRed','$Correo','$FechaApertura','$MarcacionCorta',now())";
                    $Conexiones2->ExecuteQuery($q2,array());
                    return "1";
                }
            }
        }

        function getDirectorioSucursal () {
            $q = "SELECT DS.idDirectorioSucursales,SD.Sucursal,DS.Direccion,DS.Telefono,DS.NumRed,E.Nombre,P.Puesto,DS.Correo,DS.FechaApertura,
                    TIMESTAMPDIFF(YEAR, DS.FechaApertura,NOW()) AS años_transcurridos,DS.MarcacionCorta
                    FROM DirectorioSucursales AS DS
                    INNER JOIN Empleados AS E ON E.IdSucursal = DS.IdSucursal
                    INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = DS.IdSucursal
                    LEFT JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                    WHERE P.IdPuesto = 2 OR P.IdPuesto = 3 AND DS.Status = 1 and E.Status = 1;";
            //return json_encode($this->Select($q,array()));

            $cons = $this->Select($q,array());

            return '{ "DirectorioSucursales": '.json_encode($cons)."}";
        }

        function getTiposExtensionesDirectorioExtensiones () {
            $q = "SELECT DE.Tipo,E.Nombre AS NombreEmpleado,DDE.Extension
                  FROM DetalleDirectorioExtensiones AS DDE
                  INNER JOIN DirectorioExtensiones AS DE ON DE.idDirectorioExtensiones = DDE.idDirectorioExtensiones
                  INNER JOIN Empleados AS E ON E.NoEmpleado = DDE.NoEmpleado
                  WHERE DDE.Status = 1 and E.Status = 1;";
            return json_encode($this->Select($q,array()));
            return '{ "ListTiposExtensionesDirectorio": '.json_encode($cons)."}";
        }

    }

?>
