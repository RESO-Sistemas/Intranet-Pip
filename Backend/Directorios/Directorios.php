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
        function getTiposDirectorioCorreosTelefonos ($Tipo) {
            $q = "SELECT idDirectoriosCorreosTelefonos,Tipo FROM DirectoriosCorreosTelefonos 
                  WHERE Status = 1;";
            if ($Tipo == "JSON") {
                return json_encode($this->Select($q,array()));
            } elseif ($Tipo == "ARR") {
                $cons = $this->Select($q,array());
                return $cons;
            }
        }

        function getDetalleDirectorioCorreosTelefonos ($Tipo) {
            $q = "SELECT DD.idDirectoriosCorreosTelefonos,E.Nombre,P.Puesto,DD.MarcacionCorta,DD.idDetalleDirectoriosCorreosTelefonos,DD.Email,DD.Telefono AS Movil FROM DetalleDirectoriosCorreosTelefonos AS DD
                    INNER JOIN Empleados AS E ON E.NoEmpleado = DD.NoEmpleado
                    INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                    WHERE DD.Status = 1;";
            if ($Tipo == "JSON") {
                  return json_encode($this->Select($q,array()));
            } elseif ($Tipo == "ARR") {
                $cons = $this->Select($q,array());
                return $cons;
            }
        }

        function getDirectorioCorreosTelefonos () {
            $ArrRetorno = [];
            $Datos = [];
            $Directorios = new Directorios();
            $Directorios2 = new Directorios();
            $TiposDirectorio = $Directorios->getTiposDirectorioCorreosTelefonos("ARR");
            $DetalleDirectorio = $Directorios2->getDetalleDirectorioCorreosTelefonos("ARR");
            $Datos = [
                "Tipos" => $TiposDirectorio,
                "Detalle" => $DetalleDirectorio
            ];
            array_push($ArrRetorno,$Datos);
            return json_encode($ArrRetorno);
        }


        function addEmpleadosDirectorioCorreosTelefonos ($idDirectoriosCorreosTelefonos,$NoEmpleado,$Email,$Telefono,$MarcacionCorta) {
           /*  if ($NoEmpleado == "" || $Email == "" || $Telefono == "" || $MarcacionCorta == "") {
                return "Seleccione un empleado e ingrese todos los campos, por favor.";
            } else { */
               /*  $q = "SELECT COUNT(*) AS Existe FROM DetalleDirectoriosCorreosTelefonos
                    WHERE (idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos' AND NoEmpleado = '$NoEmpleado') OR (Email = '$Email' OR Telefono = '$Telefono' OR MarcacionCorta = '$MarcacionCorta')";
                $cons = $this->Select($q,array());
                $Existe = $cons[0]["Existe"];
                if ($Existe < 1) { */
                    $Conexiones2 = new Conexiones();
                    $q2 = "INSERT INTO DetalleDirectoriosCorreosTelefonos (idDirectoriosCorreosTelefonos,NoEmpleado,Registro,Email,Telefono,MarcacionCorta)
                            VALUES ('$idDirectoriosCorreosTelefonos','$NoEmpleado',now(),'$Email','$Telefono','$MarcacionCorta');";
                    $Conexiones2->ExecuteQuery($q2,array());
                    return "1";
                /* } else {
                    return "Uno o más datos a ingresar ya se encuentran registrados.";
                } */
            /* } */
        }

        function deleteEmpleadosDirectorioCorreosTelefonos ($idDetalleDirectoriosCorreosTelefonos) {
            $q = "DELETE FROM DetalleDirectoriosCorreosTelefonos 
                      WHERE idDetalleDirectoriosCorreosTelefonos = '$idDetalleDirectoriosCorreosTelefonos';";
            $this->Select($q,array());
            return "1";
        }



        function getTiposDirectorioExtensiones ($Tipo,$TiposExtSelected) {
            if (sizeof($TiposExtSelected) > 0) {
                $ComplementoWhereOR = "";
                for ($i=0; $i < sizeof($TiposExtSelected) ; $i++) { 
                    $ComplementoWhereOR = $ComplementoWhereOR."idDirectorioExtensiones = $TiposExtSelected[$i] OR ";
                }
                $ComplementoWhereOR = substr($ComplementoWhereOR, 0, -3);
                $WhereFinal = "Status = 1 AND ($ComplementoWhereOR)";
            } else {
                $WhereFinal = "Status = 1";
            }
            
            $q = "SELECT idDirectorioExtensiones,Tipo FROM DirectorioExtensiones
                  WHERE $WhereFinal;";
            if ($Tipo == "JSON") {
                return json_encode($this->Select($q,array()));
            } elseif ($Tipo == "ARR") {
                $cons = $this->Select($q,array());
                return $cons;
            }
        }

        function getDetalleDirectorioExtensiones ($Tipo,$TiposExtSelected) {
            if (sizeof($TiposExtSelected) > 0) {
                $ComplementoWhereOR = "";
                for ($i=0; $i < sizeof($TiposExtSelected) ; $i++) { 
                    $ComplementoWhereOR = $ComplementoWhereOR."DD.idDirectorioExtensiones = $TiposExtSelected[$i] OR ";
                }
                $ComplementoWhereOR = substr($ComplementoWhereOR, 0, -3);
                $WhereFinal = "DD.Status = 1 AND ($ComplementoWhereOR)";
            } else {
                $WhereFinal = "DD.Status = 1";
            }
            
            $q = "SELECT DD.idDirectorioExtensiones,E.Nombre,DD.Extension,DD.idDetalleDirectorioExtensiones FROM DetalleDirectorioExtensiones AS DD
                    INNER JOIN Empleados AS E ON E.NoEmpleado = DD.NoEmpleado
                    WHERE $WhereFinal;";
            if ($Tipo == "JSON") {
                  return json_encode($this->Select($q,array()));
            } elseif ($Tipo == "ARR") {
                $cons = $this->Select($q,array());
                return $cons;
            }
        }

        function getDirectorioExtensiones ($TiposExtSelected) {
            $ArrRetorno = [];
            $Datos = [];
            $Directorios = new Directorios();
            $Directorios2 = new Directorios();
            $TiposDirectorio = $Directorios->getTiposDirectorioExtensiones("ARR",$TiposExtSelected);
            $DetalleDirectorio = $Directorios2->getDetalleDirectorioExtensiones("ARR",$TiposExtSelected);
            $Datos = [
                "Tipos" => $TiposDirectorio,
                "Detalle" => $DetalleDirectorio
            ];
            array_push($ArrRetorno,$Datos);
            return json_encode($ArrRetorno);
        }

        function addEmpleadoDirectorioExtensiones ($idDirectorioExtensiones,$NoEmpleado,$Extension) {
            if ($NoEmpleado == "") {
                return "Seleccione un empleado.";
            }elseif ($Extension == "") {
                return "Ingrese una extensión.";
            }
            $q = "SELECT COUNT(*) AS Existe FROM DetalleDirectorioExtensiones WHERE idDirectorioExtensiones = '$idDirectorioExtensiones' AND Extension = '$Extension'";
            $cons = $this->Select($q,array());
            $Existe = $cons[0]["Existe"];
            if ($Existe > 0) {
                return "La extensión ya se encuentra en uso.";
            } else {
                $Conexiones2 = new Conexiones();
                $q2 = "INSERT INTO DetalleDirectorioExtensiones (idDirectorioExtensiones,NoEmpleado,Extension,Registro)
                      VALUES ('$idDirectorioExtensiones','$NoEmpleado','$Extension',now());";
                $Conexiones2->ExecuteQuery($q2,array());
                return "1";
            }
          }

        function deleteEmpleadosDirectorioExtension ($idDetalleDirectorioExtensiones) {
            $q = "DELETE FROM DetalleDirectorioExtensiones 
                        WHERE idDetalleDirectorioExtensiones = '$idDetalleDirectorioExtensiones';";
            $this->ExecuteQuery($q,array());
            return "1";
          }

        function updateExtensionEmpleado ($idDetalleDirectorioExtensiones,$Extension) {
            $q = "SELECT COUNT(*) AS Existe FROM DetalleDirectorioExtensiones WHERE Extension = '$Extension' AND Extension = '$Extension'";
            $cons = $this->Select($q,array());
            $Existe = $cons[0]["Existe"];
            if ($Existe > 0) {
                return "La extensión ya se encuentra en uso.";
            }else {
                $Conexiones2 = new Conexiones();
                $q2 = "UPDATE DetalleDirectorioExtensiones SET Extension = '$Extension'
                            WHERE idDetalleDirectorioExtensiones = '$idDetalleDirectorioExtensiones';";
                $Conexiones2->ExecuteQuery($q2,array());
                return "1";
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
            return json_encode($this->Select($q,array()));
        }

        function updateRegistroDirectorioSucursal ($Direccion,$Telefono,$NumRed,$Correo,$MarcacionCorta,$idDirectorioSucursales) {
            if ($Direccion == "" || $Telefono == "" || $NumRed == "" || $Correo == "" || $MarcacionCorta == "") {
                return "Ingrese todos los datos, por favor.";
            }else {
                $q = "SELECT COUNT(*) as Existe FROM DirectorioSucursales 
                WHERE (Telefono = '$Telefono' OR NumRed = '$NumRed' OR Correo = '$Correo' OR MarcacionCorta = '$MarcacionCorta') AND idDirectorioSucursales <> '$idDirectorioSucursales';";
                $cons = $this->Select($q,array());
                $Existe = $cons[0]["Existe"];
                if ($Existe > 0) {
                    return "Uno o más datos ya se encuentran registrados.";
                } else {
                    $Conexiones2 = new Conexiones();
                    $q2 = "UPDATE DirectorioSucursales SET Direccion = '$Direccion', Telefono = '$Telefono', 
                            NumRed = '$NumRed', Correo = '$Correo', MarcacionCorta = '$MarcacionCorta' 
                            WHERE idDirectorioSucursales = '$idDirectorioSucursales';";
                    $Conexiones2->ExecuteQuery($q2,array());
                    return "1";      
                }
            } 
        }

        function updateRegistroDirectorioCorreosTelefonos ($Email,$Telefono,$idDetalleDirectoriosCorreosTelefonos,$MarcacionCorta) {
            if ($Email == "" || $Telefono == "" || $MarcacionCorta == "0" || $MarcacionCorta == "") {
                return "Ingrese todos los datos, por favor.";
            } else {
                $q = "SELECT COUNT(*) AS Existe FROM DetalleDirectoriosCorreosTelefonos 
                     WHERE (Email = '$Email' OR Telefono = '$Telefono' OR MarcacionCorta = '$MarcacionCorta') and idDetalleDirectoriosCorreosTelefonos <> '$idDetalleDirectoriosCorreosTelefonos';";
                $cons = $this->Select($q,array());
                $Existe = $cons[0]["Existe"];
                if ($Existe > 0) {
                    return "Uno o más datos ya se encuentran registrados.";
                } else {
                    $Conexiones2 = new Conexiones ();
                    $q2 = "UPDATE DetalleDirectoriosCorreosTelefonos SET Email = '$Email', Telefono = '$Telefono', MarcacionCorta = '$MarcacionCorta'
                            WHERE idDetalleDirectoriosCorreosTelefonos = '$idDetalleDirectoriosCorreosTelefonos';";
                    $Conexiones2->ExecuteQuery($q2,array());
                    return "1";
                }
            }
        }

        function getTiposExtensionesDirectorioExtensiones () {
            $q = "SELECT idDirectorioExtensiones,Tipo FROM DirectorioExtensiones 
                    WHERE Status = 1;";
            return json_encode($this->Select($q,array()));
        }

    }
    
?>