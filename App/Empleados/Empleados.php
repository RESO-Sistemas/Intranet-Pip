<?php
if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
} else {
    if (file_exists("./Conexiones/Conexiones.php")) {
        require_once("./Conexiones/Conexiones.php");
    } else if (file_exists("../Conexiones/Conexiones.php")) {
        require_once("../Conexiones/Conexiones.php");
    } else if (file_exists("../../Conexiones/Conexiones.php")) {
        require_once("../../Conexiones/Conexiones.php");
    } else if (file_exists("././Backend/Conexiones/Conexiones.php")) {
        require_once("././Backend/Conexiones/Conexiones.php");
    }
}

// Cargar SessionManager
if (file_exists("../Session/SessionManager.php")) {
    require_once("../Session/SessionManager.php");
} else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
} else if (file_exists("../Backend/Session/SessionManager.php")) {
    require_once("../Backend/Session/SessionManager.php");
}

class Empleados extends Conexiones
{
    function loginEmpleado($NoEmpleado, $Password)
    {
        $ArrayRetorno = [];
        $Datos = [];
        $Password = base64_encode($Password);
        $q = "SELECT e.NoEmpleado, e.DiasVacacionesRest, e.Nivel,e.IdDivision,e.IdSucursal,e.Nombre, e.Imagen, p.Puesto, e.Email, e.Password, e.Movil,e.IdPuesto,e.IdCentroCosto,IF(e.NoEmpleado='' OR isnull(e.NoEmpleado), 'vacio', 'Verificado') as Encontrado
        FROM Empleados as e inner join Puestos as p on p.IdPuesto = e.IdPuesto
        WHERE e.NoEmpleado = '$NoEmpleado' AND e.Password = '$Password';";
        $cons = $this->Select($q, array());
        if (sizeof($cons) > 0) {
             $Respuesta = $cons;
         }
         else
         {
              $Respuesta = "";
         }
        return json_encode($Respuesta);
    }


    function getDatosEmpleado($NoEmpleado)
    {
        $ArrayRetorno = [];
        $Datos = [];
        $q = "SELECT EM.Imagen,EM.Nombre,EM.Email,EM.Movil,EM.NoEmpleado,EM.RFC,EM.CURP,EM.NoSeguro,EM.Password,EM.FNacimiento,P.Puesto,SU.Sucursal,EM.Antiguedad,CC.CentrodeCosto,DI.Division,DI.IdDivision,EM.Firma FROM Empleados as EM
            INNER JOIN Puestos as P ON P.IdPuesto = EM.IdPuesto
            INNER JOIN SucursalDepto AS SU ON SU.IdSucursal = EM.IdSucursal
            INNER JOIN CentroCostos AS CC ON CC.IdCentroCosto = EM.IdCentroCosto
            INNER JOIN Divisiones as DI ON DI.IdDivision = EM.IdDivision
            WHERE NoEmpleado = '$NoEmpleado';";
        $cons = $this->Select($q, array());
        $Conexiones2 = new Conexiones();
        $q2 = "SELECT MensajeBienvenida FROM ConfiguracionPersonalizacion;";
        $cons2 = $Conexiones2->Select($q2, array());
        $MensajeBienvenida = $cons2[0]["MensajeBienvenida"];

        $Datos = [
            "Antiguedad" => $cons[0]["Antiguedad"],
            "CURP" => $cons[0]["CURP"],
            "CentrodeCosto" => $cons[0]["CentrodeCosto"],
            "Division" => $cons[0]["Division"],
            "Email" => $cons[0]["Email"],
            "FNacimiento" => $cons[0]["FNacimiento"],
            "Firma" => $cons[0]["Firma"],
            "IdDivision" => $cons[0]["IdDivision"],
            "Imagen" => $cons[0]["Imagen"],
            "Movil" => $cons[0]["Movil"],
            "NoEmpleado" => $cons[0]["NoEmpleado"],
            "NoSeguro" => $cons[0]["NoSeguro"],
            "Nombre" => $cons[0]["Nombre"],
            "Pass_Text" => base64_decode($cons[0]["Password"]),
            "Puesto" => $cons[0]["Puesto"],
            "RFC" => $cons[0]["RFC"],
            "Sucursal" => $cons[0]["Sucursal"],
            "MensajeBienvenida" => $MensajeBienvenida
        ];
        array_push($ArrayRetorno, $Datos);
        return '{ "DatosEmpleado": '.json_encode($ArrayRetorno)."}";
    }

    function updateDatosEmpleado($Email, $Movil, $Password,$NoEmpleado)
    {
        try {
            $Password = base64_encode($Password);
            $q = "UPDATE Empleados SET Email = '$Email', Movil = '$Movil', Password = '$Password' WHERE NoEmpleado = '$NoEmpleado';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function updateFotoEmpleado($Imagen,$NoEmpleado)
    {
        try {
            $q = "UPDATE Empleados SET Imagen = '$Imagen' WHERE NoEmpleado = '$NoEmpleado';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }

    }

    function getNameFotoEmpleado($NoEmpleado)
    {
        $q = "SELECT Imagen FROM Empleados WHERE NoEmpleado = '$NoEmpleado';";
        $cons = $this->Select($q, array());
        return $cons;
    }

    function getFotoPerfil($NoEmpleado){
      try {
        $q = "SELECT Imagen FROM Empleados WHERE NoEmpleado = '$NoEmpleado';";
        error_log($q);
        return '{ "getFotoPerfil": '.json_encode($this->Select($q,array()))."}";
      } catch (\Exception $e){
        return $e;
      }
    }

    function getColaboradores($IdSucursal)
    {
        $q = "SELECT EM.Nombre,EM.Email,P.Puesto,EM.Nivel,EM.Imagen,EM.NoEmpleado FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE IdSucursal = '$IdSucursal'
          ORDER BY EM.Nivel;";
        return '{ "ColaboradoresEmpleado": '.json_encode($this->Select($q,array()))."}";
    }

    function getDatosEmpleadosOrganigrama($NoEmpleado)
    {
      $q = "SELECT EM.Imagen,EM.Nombre,EM.Email,EM.Movil,EM.NoEmpleado,EM.RFC,EM.CURP,EM.NoSeguro,EM.Password,EM.FNacimiento,P.Puesto,SU.Sucursal,EM.Antiguedad,CC.CentrodeCosto,DI.Division,DI.IdDivision FROM Empleados as EM
        left JOIN Puestos as P ON P.IdPuesto = EM.IdPuesto
        left JOIN SucursalDepto AS SU ON SU.IdSucursal = EM.IdSucursal
        left JOIN CentroCostos AS CC ON CC.IdCentroCosto = EM.IdCentroCosto
        left JOIN Divisiones as DI ON DI.IdDivision = EM.IdDivision
        WHERE NoEmpleado = '$NoEmpleado';";
        return '{ "DatosEmpleadoOrganigrama": '.json_encode($this->Select($q,array()))."}";
    }

    function updateDatosSaludEmpleado($HabitusExteriorDescripcion, $Peso, $Complexion, $Talla, $FrCardiaca, $FrRespiratoria, $TensionArterial, $Temperatura, $GrupoSanguineo, $FactorRh, $CartillaVacunacion, $EsquemaCompleto, $OtrosComentariosSalud,$NoEmpleado)
    {
        try {
            $q = "UPDATE Empleados SET HabitusExteriorDescripcion = '$HabitusExteriorDescripcion', Peso = '$Peso', Complexion = '$Complexion', Talla = '$Talla', FrCardiaca = '$FrCardiaca',
              FrRespiratoria = '$FrRespiratoria', TensionArterial = '$TensionArterial', Temperatura = '$Temperatura', GrupoSanguineo = '$GrupoSanguineo', FactorRh = '$FactorRh', CartillaVacunacion = '$CartillaVacunacion',
              EsquemaCompleto = '$EsquemaCompleto', OtrosComentariosSalud = '$OtrosComentariosSalud'
              WHERE NoEmpleado = '$NoEmpleado';";
              $this->ExecuteQuery($q, array());
              return "1";
        } catch (\Exception $e) {
            return $e;
        }
    }

    function getDatosSaludEmpleado($NoEmpleado)
    {
        $q = "SELECT IF(isnull(e.HabitusExteriorDescripcion), '', e.HabitusExteriorDescripcion) as HabitusExteriorDescripcion, IF(isnull(e.Complexion), '', e.Complexion) as Complexion, IF(isnull(e.Talla), '', e.Talla) as Talla ,IF(isnull(e.FrCardiaca), '', e.FrCardiaca) as FrCardiaca,
        IF(isnull(e.FrRespiratoria), '', e.FrRespiratoria) as FrRespiratoria, IF(isnull(e.TensionArterial), '', e.TensionArterial) as TensionArterial, IF(isnull(e.Temperatura), 0, e.Temperatura) as Temperatura,
            IF(isnull(e.GrupoSanguineo), '', e.GrupoSanguineo) as GrupoSanguineo, IF(isnull(e.FactorRh), '', e.FactorRh) as FactorRh, IF(isnull(e.CartillaVacunacion), 0, e.CartillaVacunacion) as CartillaVacunacion, IF(isnull(e.EsquemaCompleto), 0, e.EsquemaCompleto) as EsquemaCompleto,
            IF(isnull(e.OtrosComentariosSalud), '', e.OtrosComentariosSalud) as OtrosComentariosSalud, IF(isnull(e.Peso), 0, e.Peso) as Peso FROM Empleados as e
            WHERE NoEmpleado = '$NoEmpleado';";
        return '{ "DatosSaludEmpleado": '.json_encode($this->Select($q,array()))."}";
    }

    function getPersonal($IdPuesto, $IdSucursal, $IdDivision)
    {
        if ($IdPuesto == "" && $IdSucursal == "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal WHERE Status = 1";
        } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE P.IdPuesto = '$IdPuesto' and Status = 1";
        } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE SD.IdSucursal = '$IdSucursal' and Status = 1";
        } elseif ($IdPuesto == "" && $IdSucursal == "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE D.IdDivision = '$IdDivision' and Status = 1";
        } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE P.IdPuesto = '$IdPuesto' AND SD.IdSucursal = '$IdSucursal' and Status = 1";
        } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE P.IdPuesto = '$IdPuesto' AND D.IdDivision = '$IdDivision' and Status = 1";
        } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' and Status = 1";
        } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
              INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' AND P.IdPuesto = '$IdPuesto' and Status = 1";
        }
        return '{ "ListaAllPersonal": '.json_encode($this->Select($q,array()))."}";
    }

    function getColaboradoresEmpleado($IdDivision, $IdSucursal, $EmpleadoPadre)
    {
        $q = "SELECT EM.NoEmpleado,EM.Nombre,EM.Email,P.Puesto,EM.Nivel FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE IdDivision = '$IdDivision' and IdSucursal = '$IdSucursal' and
          EM.NoEmpleado NOT IN (SELECT EmpleadoHijo FROM RelacionEmpleados WHERE EmpleadoPadre = '$EmpleadoPadre')
          ORDER BY EM.Nivel;";
        return json_encode($this->Select($q));
        return '{ "ColaboradoresEmpleadoPadre": '.json_encode($this->Select($q,array()))."}";
    }

    function addRelacionEmpleadoPadreHijo($EmpleadoPadre, $EmpleadoHijo)
    {
        try {
          $q = "INSERT INTO RelacionEmpleados(EmpleadoPadre,EmpleadoHijo,Registro) VALUES ('$EmpleadoPadre','$EmpleadoHijo',now());";
          $this->ExecuteQuery($q, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }

    }

    function getRelacionPadre($EmpleadoPadre)
    {
        $q = "SELECT E.Nombre,E.NoEmpleado,P.Puesto,RE.idRelacionEmpleados FROM RelacionEmpleados as RE
            INNER JOIN Empleados AS E ON E.NoEmpleado = RE.EmpleadoHijo
            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
            WHERE EmpleadoPadre = '$EmpleadoPadre';";
        return '{ "getRelacionPadreSelected": '.json_encode($this->Select($q,array()))."}";
    }

    function deleteRelacionPadre($idRelacionEmpleados)
    {
        try {
          $q = "DELETE FROM RelacionEmpleados WHERE idRelacionEmpleados = '$idRelacionEmpleados';";
          $this->ExecuteQuery($q, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getDatosEmpleadoSolicitudVacaciones($NoEmpleado)
    {
        $q = "SELECT Nombre,DiasVacacionesRest as DiferenciaYears FROM Empleados
        where NoEmpleado = '$NoEmpleado';";
        return '{ "DatosEmpleadoSolicitudVacaciones" : '.json_encode($this->Select($q,array()))."}";
    }

    function enviarSolicitudVacaciones($FechaInicio, $FechaFin, $ComentariosSolicitud, $TotalDias,$EmpleadoHijo,$DiaRegreso)
    {

        $FechaRegresoUNIX = strtotime($DiaRegreso);
        $FechaRegresoNoUNIX = date('Y-m-d',$FechaRegresoUNIX);
        $fechaActual = date('d-m-Y');
        // $fechaFin = date("d-m-Y",strtotime($FechaInicio."+ $FechaInicio days"));
        $fechaFin = $FechaFin;
        // $Conexiones4 = new Conexiones();
        // $q4 = "SELECT Firma,Nombre FROM Empleados WHERE NoEmpleado = '$EmpleadoHijo'; ";
        // $cons4 = $Conexiones4->Select($q4, array());
        // $FirmaEmp = $cons4[0]["Firma"];
        // $NombreEmp = $cons4[0]["Nombre"];
        // if ($FirmaEmp === null) {
        //     return "errorFirma";
        // }

        $q = "SELECT EmpleadoPadre FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
        $cons = $this->Select($q, array());
        if (sizeof($cons) > 0) {
            $empleadosPadre = array();
            $DatosEmpleadosPadre = array();
            for ($i = 0; $i < sizeof($cons); $i++) {
                $EmpleadoPadre = $cons[$i]["EmpleadoPadre"];
                $datos = [
                    "NoEmpleado" => $EmpleadoPadre
                ];
                array_push($empleadosPadre, $datos);
            }
            for ($i = 0; $i < sizeof($empleadosPadre); $i++) {
                $NoEmpleado = $empleadosPadre[$i]["NoEmpleado"];
                $Conexiones2 = new Conexiones();
                $q2 = "SELECT Email FROM Empleados WHERE NoEmpleado ='$NoEmpleado'";
                $cons2 = $Conexiones2->Select($q2, array());

                $Conexiones3 = new Conexiones();
                $q3 = "CALL spNuevaSolicitudVacaciones ('$EmpleadoHijo','$NoEmpleado','$FechaInicio','$fechaFin','$ComentariosSolicitud','$TotalDias','$FechaRegresoNoUNIX');";
                $cons3 = $Conexiones3->Procedure($q3);
                $idSolicitud = $cons3[0]["nidSolicitudes"];
                for ($i = 0; $i < sizeof($cons2); $i++) {
                    $EmailEmpleadoP = $cons2[$i]["Email"];


                    // try
                    // {
                    //     require_once("../PHPMailer/PHPMailerAutoload.php");
                    //     $mail = new PHPMailer;
                    //     $mail->isSendmail();
                    //
                    //     $mail->Host = 'mail.resosistemas.mx';
                    //     $mail->SMTPAuth = true; // Enable SMTP authentication
                    //     $mail->Username = 'mail.resosistemas.mx'; // SMTP username
                    //     $mail->Password = 'RESO@2908tormex'; // SMTP password
                    //     $mail->SMTPSecure = 'none'; // Enable TLS encryption, `ssl` also accepted
                    //     $mail->Port = 587;
                    //     $mail->IsHTML(true);
                    //     $fechaHoy = date("Y-m-d");
                    //     $mail->setFrom('mail.resosistemas.mx', "Klyns");
                    //     $mail->addAddress("cguerrero@resosistemas.mx", "VKlyns");
                    //     $mensajeSubject = "Solicitud de Vacaciones";
                    //     $mensajeSubject = utf8_decode($mensajeSubject);
                    //     $mail->Subject = $mensajeSubject;
                    //     $mensajeBody = "
                    //       <html lang='en'>
                    //         <head>
                    //             <meta charset='UTF-8'>
                    //             <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                    //             <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    //             <title>Document</title>
                    //             <style>
                    //                 .logo{
                    //                     width: 35%;
                    //                 }
                    //                 .contenedor{
                    //                     padding: 2%;
                    //                     margin: auto;
                    //                     align-content: center;
                    //                     align-items: center;
                    //                     width: 40%;
                    //                     height: 100%;
                    //                     background-color: white;
                    //                     border:4px solid black;
                    //                     text-align: center;
                    //                     border-radius: 15px;
                    //                     border-color: crimson;
                    //                 }
                    //             </style>
                    //         </head>
                    //         <body>
                    //                 <div class='contenedor'>
                    //                     <img src='https://klyns.resosistemas.mx/assets/images/descarga-PhotoRoom.png' class='logo'><br><br>
                    //                     <span>El empleado <b>$NombreEmp</b> solicita sus vacaciones.</span><br>
                    //                     <h4>Comentarios de la Solicitud:</h4>
                    //                     <span>$ComentariosSolicitud</span><br>
                    //                     <h6>Fecha de inicio: $FechaInicio            Fecha Fin: $fechaFin</h6><br>
                    //                     <h5>$fechaActual</h5><br><br>
                    //                     <a href='https://klyns.resosistemas.mx/FormatoVacaciones.php?Solicitud=$idSolicitud'>Ver Solicitud</a>
                    //                 </div>
                    //         </body>
                    //         </html>
                    //       ";
                    //     $mensajeBody = utf8_decode($mensajeBody);
                    //     $mail->Body = $mensajeBody;
                    //     $exito = $mail->Send();
                    //
                    //     $intentos = 1;
                    //     while ((!$exito) && ($intentos < 5)) {
                    //         $mail->ErrorInfo;
                    //         sleep(5);
                    //         $exito = $mail->Send();
                    //         $intentos = $intentos + 1;
                    //     }
                    //
                    // }
                    // catch (\Exception $e) {
                    // }

                }
            }
            return "1";
        } else {
            return "errorJefe";
        }
    }

    function getMisSolicitudesVacaciones($NoEmpleado)
    {
        $q = "SELECT idSolicitudesVacaciones,ComentariosSolicitud, Status,date_format(Registro ,'%d-%m-%Y') as FechaSolicitud FROM SolicitudesVacaciones WHERE NoEmpleado = '$NoEmpleado';";
        //return json_encode($this->Select($q, array()));
        return '{ "MisSolicitudesVacaciones": '.json_encode($this->Select($q,array()))."}";
    }

    function getMisSolicitudesPorRevisar($EmpleadoPadre)
    {
      $q = "SELECT SV.idSolicitudesVacaciones,E.Nombre,date_format(SV.FechaInicio, '%d' '/' '%m' '/' '%y' '   ' '%H' ':' '%i') as FechaInicio,
            date_format(SV.FechaFin, '%d' '/' '%m' '/' '%y' '   ' '%H' ':' '%i') as FechaFin,SV.ComentariosSolicitud,
            date_format(SV.Registro ,'%d-%m-%Y') as FechaSolicitud FROM SolicitudesVacaciones AS SV
            INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
            WHERE SV.EmpleadoPadre = '$EmpleadoPadre' and SV.Status = 0;";
      return '{ "MisSolicitudesSubordinados": '.json_encode($this->Select($q,array()))."}";
    }

    function updateStatusSolicitud($Status, $idSolicitudesVacaciones,$NoEmpleado)
    {
        try {
            $q = "SELECT Firma FROM Empleados WHERE NoEmpleado = '$NoEmpleado'";
            $cons = $this->Select($q,array());
            $Firma = $cons[0]["Firma"];
            if ($Firma == "" || $Firma === null) {
                return 'Diríjase a "Mi Perfil" y actualicé su firma, por favor.';
            } else {
                $Conexiones2 = new Conexiones();
                $q2 = "UPDATE SolicitudesVacaciones SET Status = '$Status',JefeInmediatoAutoriza = '$NoEmpleado' , FechaJefeInmediatoAutoriza = now()
                          WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
                $Conexiones2->ExecuteQuery($q2, array());
                return "1";
            }
        } catch (\Exception $e) {
            return "0";
        }
    }

    function addVacunacionCOVID($Numero, $Vacuna, $FechaVacunacion,$NoEmpleado)
    {
        try {
          for ($i = 0; $i < sizeof($Numero); $i++) {
              $con = new Conexiones();
              $q = "INSERT INTO EsquemaVacunacionCOVID(Numero,Vacuna,FechaVacunacion,NoEmpleado)
                VALUES (?,?,?,?);";
              $con->ExecuteQuery($q, array($Numero[$i], $Vacuna[$i], $FechaVacunacion[$i], $NoEmpleado));
          }
          return "1";
        } catch (\Exception $e) {
          return $e;
        }

    }

    function getEsquemaVacunacion($NoEmpleado)
    {
        $q = "SELECT idEsquemaVacunacionCOVID,Numero,Vacuna,FechaVacunacion FROM EsquemaVacunacionCOVID
            where NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
        return '{ "MiEsquemaVacunacion": '.json_encode($this->Select($q, array()))."}";
    }

    function deleteEsquemaVacunacion($idEsquemaVacunacionCOVID)
    {
        try {
          $q = "DELETE FROM EsquemaVacunacionCOVID WHERE idEsquemaVacunacionCOVID = '$idEsquemaVacunacionCOVID';";
          $this->ExecuteQuery($q, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function updateEsquemaVacunacion($Numero, $Vacuna, $FechaVacunacion, $idEsquemaVacunacionCOVID)
    {
        try {
          $q = "UPDATE EsquemaVacunacionCOVID SET Numero = '$Numero', Vacuna = '$Vacuna', FechaVacunacion = '$FechaVacunacion'
          WHERE idEsquemaVacunacionCOVID = '$idEsquemaVacunacionCOVID';";
          $this->ExecuteQuery($q, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getDivisionEmpleado($NoEmpleado){
      try {
        $q = "SELECT P.IdDivision,DV.LaburaSabados,DV.LaburaDomingos, DV.LaburaDiasFestivos
              FROM Empleados AS E
              INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
              INNER JOIN Divisiones AS DV ON DV.IdDivision = P.IdDivision
              WHERE NoEmpleado = '$NoEmpleado';";
        $resultado = $this->Select($q,array());
        $Division = $resultado[0]["IdDivision"];
        return $resultado[0];
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getFechasRango($fechaInicio, $fechaFin,$NoEmpleado)
    {
      $InstDivision = new Empleados();
      $DatosDivision = $InstDivision->getDivisionEmpleado($NoEmpleado);
      $IdDivision = $DatosDivision["IdDivision"];
      $LaburaSabados = $DatosDivision["LaburaSabados"];
      $LaburaDomingos = $DatosDivision["LaburaDomingos"];
      $LaburaDiasFestivos = $DatosDivision["LaburaDiasFestivos"];

        $ArrFechasFormatoSelected = [];
        $ArrFechasFormatoIni = [];
        $ArrFechasFormatoFin = [];
        $fechas = [];
        $arrayRetorno = [];
        $datosInserta = [];

        $AnioFechaIni = explode('-',$fechaInicio);
        $AnioFechaIni = $AnioFechaIni[0];

        $AnioFechaFin= explode('-',$fechaFin);
        $AnioFechaFin = $AnioFechaFin[0];
        $fechaInicio = strtotime($fechaInicio);
        $fechaFinUNIX = strtotime($fechaFin);

        $DiaSiguienteUNIX = ($fechaFinUNIX + 86400);
        $DiaSiguienteNormal = date('Y-d-m',$DiaSiguienteUNIX);

        if ($LaburaDiasFestivos == 0) {
          $q = "SELECT Dia FROM DiasFestivos
                WHERE Status = 1;";
          $cons = $this->Select($q,array());

          for ($i=0; $i < sizeof($cons) ; $i++) {
            $DFestivoCAnioIni = $AnioFechaIni.'-'.$cons[$i]["Dia"];
            $DFestivoCAnioIniFormato = strtotime($DFestivoCAnioIni);
            $DFestivoCAnioFin = $AnioFechaFin.'-'.$cons[$i]["Dia"];
            $DFestivoCAnioFinFormato = strtotime($DFestivoCAnioFin);
            array_push($ArrFechasFormatoIni,$DFestivoCAnioIniFormato);
            array_push($ArrFechasFormatoFin,$DFestivoCAnioFinFormato);
          }
        }

        for ($i = $fechaInicio; $i <= $fechaFinUNIX; $i += 86400) {
          array_push($ArrFechasFormatoSelected,$i);
        }
        for ($i=0; $i < sizeof($ArrFechasFormatoSelected) ; $i++) {
          $DiaS = $ArrFechasFormatoSelected[$i];
          if (!in_array($DiaS,$ArrFechasFormatoIni) && !in_array($DiaS,$ArrFechasFormatoFin)) {
            $dia = date("l", $DiaS);
            $datos = [
                "fecha" => $dia
            ];
            array_push($fechas, $datos);
          }
        }

        $FechaDiaSiguienteUNIX = $DiaSiguienteUNIX;
        for ($i=0; $i < 9999 ; $i ++) {
          if (!in_array($FechaDiaSiguienteUNIX,$ArrFechasFormatoFin)) {
            $diaSig = date("l", $FechaDiaSiguienteUNIX);
            error_log($diaSig);
            if ($diaSig != "Sunday" && $diaSig != "Saturday") {
              break;
            } else if ($diaSig == "Saturday") {
              if ($LaburaSabados == 1) {
                break;
              } else {
                $FechaDiaSiguienteUNIX += 86400;
              }
            } else if ($diaSig == "Sunday"){
              if ($LaburaDomingos == 1) {
                break;
              } else {
                $FechaDiaSiguienteUNIX += 86400;
              }
            }
        } else {
          $FechaDiaSiguienteUNIX += 86400;
        }
      }
      error_log($LaburaSabados);
      error_log($LaburaDomingos);
        $ContadorCantDias = 0;
        for ($i=0; $i < sizeof($fechas) ; $i++) {
          $diaFecha = $fechas[$i]["fecha"];
          if ($LaburaSabados == 1 && $LaburaDomingos == 1) {
            $ContadorCantDias ++;
          } elseif ($LaburaSabados == 1 && $LaburaDomingos == 0) {
            if ($diaFecha !="Sunday") {
              $ContadorCantDias ++;
            }
          } elseif ($LaburaSabados == 0 && $LaburaDomingos == 1) {
            if ($diaFecha !="Saturday") {
              $ContadorCantDias ++;
            }
          } else if ($LaburaSabados == 0 && $LaburaDomingos == 0) {
            if ($diaFecha !="Saturday" && $diaFecha !="Sunday") {
              $ContadorCantDias ++;
            }
          }
        }
        $DiaSiguienteNoUnix = date('d-m-Y',$FechaDiaSiguienteUNIX);
        $datosInserta = [
          "Dias" => $ContadorCantDias,
          "Division" => $IdDivision,
          "DiaRegreso" => $DiaSiguienteNoUnix
        ];
        error_log($ContadorCantDias);
        error_log($IdDivision);
        error_log($DiaSiguienteNoUnix);

        array_push($arrayRetorno, $datosInserta);
        return '{ "FechasRangoDivision": '.json_encode($arrayRetorno)."}";
        //return json_encode($arrayRetorno);
    }


    // function SubirFirma($imagen64,$NoEmpleado)
    // {
    //   try {
    //     $random = rand(1000, 9999);
    //     $carpeta = "../../Archivos/ImgEmpleados/$NoEmpleado/Firma/";
    //     $img = str_replace('data:image/png;base64,', '', $imagen64);
    //     $img = str_replace(' ', '+', $img);
    //     $data = base64_decode($img);
    //     if (!file_exists($carpeta)) {
    //         mkdir($carpeta, 0777, true);
    //     }
    //     $files = glob("../../Archivos/ImgEmpleados/$NoEmpleado/Firma/*"); //obtenemos todos los nombres de los ficheros
    //     foreach ($files as $file) {
    //         if (is_file($file))
    //             unlink($file); //elimino el fichero
    //     }
    //     file_put_contents("../../Archivos/ImgEmpleados/$NoEmpleado/Firma/Firma" . $random . $NoEmpleado . ".png", $data);
    //
    //     $firmaName = "Firma" . $random . $NoEmpleado . ".png";
    //
    //     $q = "UPDATE Empleados set Firma = '$firmaName' Where NoEmpleado = '$NoEmpleado';";
    //     $this->ExecuteQuery($q, array());
    //     return "1";
    //   } catch (\Exception $e) {
    //     return $e;
    //   }
    // }

    function SubirFirmaApp($imagen64,$NoEmpleado)
    {
      try {
        $random = rand(1000, 9999);
        $carpeta = "../../Archivos/ImgEmpleados/$NoEmpleado/Firma/";
        $img = str_replace('data:image/png;base64,', '', $imagen64);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        if (!file_exists($carpeta)) {
            mkdir($carpeta, 0777, true);
        }
        $files = glob("../../Archivos/ImgEmpleados/$NoEmpleado/Firma/*"); //obtenemos todos los nombres de los ficheros
        foreach ($files as $file) {
            if (is_file($file))
                unlink($file); //elimino el fichero
        }
        file_put_contents("../../Archivos/ImgEmpleados/$NoEmpleado/Firma/Firma" . $random . $NoEmpleado . ".png", $data);

        $firmaName = "Firma" . $random . $NoEmpleado . ".png";

        $q = "UPDATE Empleados set Firma = '$firmaName' Where NoEmpleado = '$NoEmpleado';";
        error_log($q);
        $this->ExecuteQuery($q, array());
        return "1";
      } catch (\Exception $e) {
        return "0";
      }

    }

    function getFirmaEmp($NoEmpleado)
    {
        $q = "SELECT Firma,NoEmpleado from Empleados where  NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
    }

    function getDetalleSolicitudVacaciones($idSolicitudesVacaciones,$NoEmpleado)
    {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $array = [];
        $q = "SELECT SV.NoEmpleado,SV.Status,EM.Firma,EM.Nombre,P.Puesto,EM.Antiguedad,CC.CentrodeCosto,DI.Division,SV.Registro,SV.FechaInicio,SV.FechaFin,EM.IdCentroCosto,SV.TotalDias,EM.DiasVacacionesRest FROM Empleados as EM
              left JOIN Puestos as P ON P.IdPuesto = EM.IdPuesto
              left JOIN SucursalDepto AS SU ON SU.IdSucursal = EM.IdSucursal
              left JOIN CentroCostos AS CC ON CC.IdCentroCosto = EM.IdCentroCosto
              left JOIN Divisiones as DI ON DI.IdDivision = EM.IdDivision
              left JOIN SolicitudesVacaciones AS SV ON EM.NoEmpleado = SV.NoEmpleado
              WHERE SV.idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
        $cons = $this->Select($q, array());

        $Con2 = new Conexiones();
        $q2 = "SELECT EM.Firma,SV.EmpleadoPadre,EM.Nombre as NombreJefe FROM Empleados as EM
              INNER JOIN SolicitudesVacaciones AS SV ON EM.NoEmpleado = SV.EmpleadoPadre
              WHERE SV.idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
        $cons2 = $Con2->Select($q2, array());

        $Con3 = new Conexiones();
        $q3 = "SELECT EM.Firma,SV.UsuarioFinalAutoriza FROM Empleados as EM
              INNER JOIN SolicitudesVacaciones AS SV ON EM.NoEmpleado = SV.UsuarioFinalAutoriza
              WHERE SV.idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
        $cons3 = $Con3->Select($q3, array());
        $Datos = [
            "NombreSolicitante" => $cons[0]["Nombre"],
            "FirmaSolicitante" => $cons[0]["Firma"],
            "PuestoSolicitante" => $cons[0]["Puesto"],
            "NoEmpleado" => $cons[0]["NoEmpleado"],
            "Departamento" => $cons[0]["IdCentroCosto"],
            "FechaInicio" => $cons[0]["FechaInicio"],
            "Antiguedad" => $cons[0]["Antiguedad"],
            "FechaRegistroSoli" => $cons[0]["Registro"],
            "FechaFin" => $cons[0]["FechaFin"],
            "DiasVacacionesRest" => $cons[0]["DiasVacacionesRest"],
            "TotalDias" => $cons[0]["TotalDias"],
            "FirmaJefe" => $cons2[0]["Firma"],
            "NoJefe" => $cons2[0]["EmpleadoPadre"],
            "Status" => $cons[0]["Status"],
            "FirmaFinal" => $cons3[0]["Firma"],
            "NoFinalAutoriza" => $cons3[0]["UsuarioFinalAutoriza"],
            "NombreJefe" => $cons2[0]["NombreJefe"]
        ];
        array_push($array, $Datos);
        return '{ "DetalleSolicitudVacaciones": '.json_encode($array)."}";
    }

    function getMisSolicitudesFinalesNomina()
    {
        $q = "SELECT SV.idSolicitudesVacaciones,E.Nombre,SV.Registro,SV.FechaInicio,SV.FechaFin,SV.ComentariosSolicitud,SV.TotalDias FROM SolicitudesVacaciones AS SV
          	INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
          	WHERE SV.Status = 1;";
        return '{ "ListSolicitudesNomina": '.json_encode($this->Select($q, array()))."}";
    }

    function realizarAccionSolicitudFinal($idSolicitudesVacaciones, $Status,$UsuarioFinalAutoriza)
    {
        try {
            $q = "SELECT Firma FROM Empleados WHERE NoEmpleado = '$UsuarioFinalAutoriza'";
            $cons = $this->Select($q,array());
            $Firma = $cons[0]["Firma"];
            if ($Firma == "" || $Firma === null) {
                return 'Diríjase a "Mi Perfil" y actualicé su firma, por favor.';
            } else {
                $valNewStatus = "";
                $retornoMensaje = "";
                if ($Status == "1") {
                    $valNewStatus = "3";
                    // $retornoMensaje = "Solicitud Aceptada con exito";
                } elseif ($Status == "0") {
                    $valNewStatus = "2";
                   // $retornoMensaje = "Solicitud Denegada con exito";
                }
                $Conexiones2 = new Conexiones();
                $q2 = "CALL spAceptarSolicitudVacaciones('$valNewStatus','$idSolicitudesVacaciones','$UsuarioFinalAutoriza')";
                $respuesta1 = $Conexiones2->Procedure($q2, array());
                $NombreEmpleado = $respuesta1[0]["Nombre"];
                $EmailEmpleado = $respuesta1[0]["Email"];
                $FechaInicio = $respuesta1[0]["FechaInicio"];
                $FechaFin = $respuesta1[0]["FechaFin"];
                $MotivoSolicitud = $respuesta1[0]["ComentariosSolicitud"];
                $TotalDias = $respuesta1[0]["TotalDias"];
                $FechaAutorizado = $respuesta1[0]["FechaAutorizadoFinal"];
                $Retorno = $respuesta1[0]["Retorno"];
                if ($Status == "1") {
                    try {
                        require_once("../PHPMailer/PHPMailerAutoload.php");
                        $mail = new PHPMailer;
                        $mail->isSendmail();

                        $mail->Host = 'mail.resosistemas.mx';
                        $mail->SMTPAuth = true; // Enable SMTP authentication
                        $mail->Username = 'mail.resosistemas.mx'; // SMTP username
                        $mail->Password = 'RESO@2908tormex'; // SMTP password
                        $mail->SMTPSecure = 'none'; // Enable TLS encryption, `ssl` also accepted
                        $mail->Port = 587;
                        $mail->IsHTML(true);

                        $fechaHoy = date("Y-m-d");

                        $mail->setFrom('mail.resosistemas.mx', "Klyns");
                        $mail->addAddress('cguerrero@resosistemas.mx', "VKlyns");
                        $mensajeSubject = "Solicitud de Vacaciones";
                        $mensajeSubject = utf8_decode($mensajeSubject);
                        $mail->Subject = $mensajeSubject;


                        $mensajeBody = "
                      <html lang='en'>
                        <head>
                            <meta charset='UTF-8'>
                            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                            <title>Document</title>
                            <style>
                                .logo{
                                    width: 100%;
                                }
                                .contenedor{
                                  padding: 5%;
                                  margin: auto;
                                  align-content: center;
                                  align-items: center;
                                  width: 50%;
                                  height: 100%;
                                  background-color: white;
                                  border:3px solid black;
                                  align-items: center;
                                  text-align: center;
                                  border-radius: 15px;
                                  border-color: crimson;
                                }
                            </style>
                        </head>
                        <body>
                                <div class='contenedor'>
                                    <img src='https://klyns.resosistemas.mx/assets/images/descarga-PhotoRoom.png' class='logo'><br><br>
                                    <h2 style='color: rgb(219, 47, 81); font-size:xx-large;'>Solicitud de Vacaciones</h2>
                                    <h1 style='color: rgb(6, 180, 44); font-size:45px'>Solicitud Aceptada!</h1>
                                    <div style='background-color:black; height:2px'></div>
                                    <div>
                                        <h2 style='color: rgb(219, 47, 81); font-size:xx-large;'>Solicitante</h2>
                                        <span style='font-size: 20px;'>$NombreEmpleado</span>
                                    </div>
                                    <br>
                                    <div style='background-color:black; height:2px'></div>
                                    <div>
                                        <h2 style='color: rgb(219, 47, 81); font-size:xx-large;'>Fechas</h2>
                                        <span style='font-size: 23px ;'>Fecha Inicio:</span>
                                        <span style='margin-left:2vh; font-size: 20px;'>$FechaInicio</span><br>
                                        <span style='font-size: 23px ;'>Fecha Fin:</span>
                                        <span style='margin-left:2vh; font-size: 20px;'>$FechaFin</span><br>
                                        <span style='font-size: 23px ;'>Cantidad de dias de vacaciones: </span>
                                        <span style='margin-left:2vh; font-size: 20px;'>$TotalDias dias</span><br>
                                    </div>
                                    <br>
                                    <div style='background-color:black; height:2px'></div>
                                    <div>
                                        <h2 style='color: rgb(219, 47, 81); font-size:xx-large;'>Motivo de Solicitud</h2>
                                        <span style='font-size: 20px;'>$MotivoSolicitud</span>
                                    </div><br>
                                    <div style='background-color:black; height:2px'></div>
                                    <div>
                                        <br>
                                        <span style='font-size: 23px ;'>Fecha de Aceptación: </span>
                                        <span style='margin-left:2vh; font-size: 20px;'>$FechaAutorizado</span><br>
                                    </div>
                                    <a href='https://klyns.resosistemas.mx/FormatoVacaciones.php?Solicitud=$idSolicitudesVacaciones'>Ver Solicitud</a>
                                </div>
                        </body>
                        </html>
                      ";
                        $mensajeBody = utf8_decode($mensajeBody);
                        $mail->Body = $mensajeBody;
                        $exito = $mail->Send();
                        $intentos = 1;
                        while ((!$exito) && ($intentos < 5)) {
                            $mail->ErrorInfo;
                            sleep(5);
                            $exito = $mail->Send();
                            $intentos = $intentos + 1;
                        }

                    } catch (\Exception $e) {
                    }
                }
                return $Retorno;
            }
        } catch (\Exception $e) {
            return "0";
        }

    }

    function getPermisos($IdPuesto)
    {
        $IdPuesto = base64_decode($IdPuesto);
        $array = [];
        $q = "SELECT id_menu FROM menus";
        $cons = $this->Select($q, array());

        for ($i = 0; $i < sizeof($cons); $i++) {
            $id_menu = $cons[$i]["id_menu"];
            $Con2 = new Conexiones();
            $q2 = "SELECT  M.id_menu,M.Descripcion,M.Id_Padre,COALESCE(count(*),0) AS Activo from MenusPermisos as MP
              LEFT join menus as M on M.id_menu = MP.id_menu
              WHERE MP.IdPuesto = '$IdPuesto' and M.id_menu = '$id_menu';";
            $resp = $Con2->Select($q2, array());
            $datos = [
                "id_menu" => $resp[0]["id_menu"],
                "Descripcion" => $resp[0]["Descripcion"],
                "Id_Padre" => $resp[0]["Id_Padre"],
                "Activo" => $resp[0]["Activo"]
            ];
            array_push($array, $datos);
        }
        return '{ "GetPermisos": '.json_encode($array)."}";
    }

    function updatePersmisosEmpleado($id_menu, $IdPuesto)
    {
        try {
            $IdPuesto = base64_decode($IdPuesto);
            $q = "SELECT * FROM MenusPermisos WHERE id_menu = '$id_menu' AND IdPuesto = '$IdPuesto';";
            $cons = $this->Select($q, array());
            if (sizeof($cons) > 0) {
                $q2 = "DELETE FROM MenusPermisos WHERE id_menu = '$id_menu' AND IdPuesto = '$IdPuesto';";
            } else {
                $q2 = "INSERT INTO MenusPermisos(id_menu,IdPuesto) VALUES ('$id_menu','$IdPuesto');";
            }
            $Con2 = new Conexiones();
            $Con2->ExecuteQuery($q2, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function getJefesPosibles($NoEmpleado, $IdSucursal)
    {
        $q = "SELECT E.NoEmpleado,concat(E.Nombre,' - ',P.Puesto) AS DescJefe FROM Empleados AS E
        LEFT JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
        WHERE E.IdSucursal = '$IdSucursal' AND E.Status = 1 AND E.Nivel < (SELECT Nivel FROM Empleados WHERE NoEmpleado = '$NoEmpleado');";
        return json_encode($this->Select($q, array()));
        return '{ "GetJefesPosibles": '.json_encode($this->Select($q, array()))."}";
    }

    function asignarJefeEmpleado($EmpleadoPadre, $EmpleadoHijo)
    {
        try {
          $q = "SELECT COUNT(*) AS Existe FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
          $cons = $this->Select($q, array());
          $Existe = $cons[0]["Existe"];
          $Conexiones2 = new Conexiones();
          if ($Existe == 1) {
              $q2 = "UPDATE RelacionEmpleados SET EmpleadoPadre = '$EmpleadoPadre' WHERE EmpleadoHijo = '$EmpleadoHijo';";
          } else {
              $q2 = "INSERT INTO RelacionEmpleados (EmpleadoPadre,EmpleadoHijo,Registro)
              VALUES ('$EmpleadoPadre','$EmpleadoHijo',NOW());";
          }
          $Conexiones2->ExecuteQuery($q2, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }

    }

    function asignarJefeEmpleadoSolicitud($EmpleadoPadre,$EmpleadoHijo)
    {
        try {
          $q = "SELECT COUNT(*) AS Existe FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
          $cons = $this->Select($q, array());
          $Existe = $cons[0]["Existe"];
          $Conexiones2 = new Conexiones();
          if ($Existe == 1) {
              $q2 = "UPDATE RelacionEmpleados SET EmpleadoPadre = '$EmpleadoPadre' WHERE EmpleadoHijo = '$EmpleadoHijo';";
          } else {
              $q2 = "INSERT INTO RelacionEmpleados (EmpleadoPadre,EmpleadoHijo,Registro)
              VALUES ('$EmpleadoPadre','$EmpleadoHijo',NOW());";
          }
          $Conexiones2->ExecuteQuery($q2, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getJefeAsignado($EmpleadoHijo)
    {
        $q = "SELECT EmpleadoPadre FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
        return '{ "getJefeAsignado": '.json_encode($this->Select($q, array()))."}";
    }

    function getJefeAsignadoSolicitud($NoEmpleado)
    {
        $q = "SELECT EmpleadoPadre FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
        return '{ "getJefeAsignadoSolicitud": '.json_encode($this->Select($q, array()))."}";
    }

    function getDetallesEmpleadoLogeado($NoEmpleado)
    {
        $q = "SELECT E.Nombre,E.Email,E.Movil,P.Puesto,E.Imagen,$NoEmpleado NoEmpleado FROM Empleados AS E
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                WHERE E.NoEmpleado = '$NoEmpleado';";
        return '{ "DetallesEmpleadoLogeado": '.json_encode($this->Select($q, array()))."}";
    }

    function getMsgSolicitudesVacacionesRecibidasJefe($NoEmpleado)
    {
        $q = "SELECT SV.idSolicitudesVacaciones,concat('El empleado ',E.Nombre, ' solicita sus vacaciones.') as Msg, concat(ComentariosSolicitud) as Motivo FROM SolicitudesVacaciones  AS SV
        INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
        WHERE SV.Status = 0 AND SV.EmpleadoPadre = '$NoEmpleado' AND SV.VistoMsjJefe = 0;";
        return '{ "MsgSolicitudesVacacionesJefe": '.json_enjson_encode($this->Select($q, array()))."}";
    }

    function updateMsgSolicitudesVacacionesRecibidasJefe($idSolicitudesVacaciones)
    {
        try {
          $q = "UPDATE SolicitudesVacaciones SET VistoMsjJefe = 1
                 WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
          $this->ExecuteQuery($q, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getMsgSolicitudesVacacionesRecibidasFinal($idSPuesto)
    {
        $ArrayRetorno = [];
        $DatosRegistro = [];
        $ArrayRegistros = [];
        $q = "SELECT Valor AS PuestosAceptados FROM Configuracion WHERE idConfiguracion = 1;";
        $cons = $this->Select($q, array());
        $PuestosAceptados = explode(",", $cons[0]["PuestosAceptados"]);
        if (in_array($idSPuesto, $PuestosAceptados)) {
            $Conexiones2 = new Conexiones();
            $q2 = "SELECT SV.idSolicitudesVacaciones,concat('El empleado ',E.Nombre, ' solicita sus vacaciones.') as Msg,
                concat(ComentariosSolicitud) as Motivo, SV.EmpleadoPadre FROM SolicitudesVacaciones  AS SV
                INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado WHERE SV.Status = 1 AND SV.VistoMsjFinal = 0;";
            $cons2 = $Conexiones2->Select($q2, array());
            if (sizeof($cons2) > 0) {
                for ($i = 0; $i < sizeof($cons2); $i++) {
                    $EmpleadoPadre = $cons2[$i]["EmpleadoPadre"];
                    $idSolicitudesVacaciones = $cons2[$i]["idSolicitudesVacaciones"];
                    $Conexiones3 = new Conexiones();
                    $q3 = "SELECT concat('El jefe inmediato ',E.Nombre,' autorizo la solicitud en la fecha ',
                            date_format(SV.FechaAutorizadoFinal ,'%d-%m-%Y'),' a las ', date_format(SV.FechaAutorizadoFinal, '%h:%i %p')) as DetalleJefeAutoriza FROM Empleados AS E
                            INNER JOIN SolicitudesVacaciones AS SV ON SV.EmpleadoPadre = E.NoEmpleado
                            WHERE E.NoEmpleado = '$EmpleadoPadre' AND SV.idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
                    $cons3 = $Conexiones3->Select($q3, array());
                    $DatosRegistro = [
                        "idSolicitudesVacaciones" => $idSolicitudesVacaciones,
                        "Msg" => $cons2[$i]["Msg"],
                        "Motivo" => $cons2[$i]["Motivo"],
                        "DetalleJefeAutoriza" => $cons3[0]["DetalleJefeAutoriza"]
                    ];
                    array_push($ArrayRegistros, $DatosRegistro);
                }
                $Datos = [
                    "Retorno" => "Valido",
                    "Registros" => $ArrayRegistros
                ];
                array_push($ArrayRetorno, $Datos);
            } else {
                $Datos = [
                    "Retorno" => "NoValido"
                ];
                array_push($ArrayRetorno, $Datos);
            }
        } else {
            $Datos = [
                "Retorno" => "NoValido"
            ];
            array_push($ArrayRetorno, $Datos);
        }
        return '{ "getMsgSolicitudesVacacionesRecibidasFinal": '.json_encode($ArrayRetorno)."}";

    }

    function updateMsgSolicitudesVacacionesRecibidasNomina($idSolicitudesVacaciones)
    {
        try {
          $q = "UPDATE SolicitudesVacaciones SET VistoMsjFinal = 1
                  WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
          $this->ExecuteQuery($q, array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }

    }

    function getPersonalDirectorioEmailTel($IdPuesto, $IdSucursal, $IdDivision, $idDirectoriosCorreosTelefonos)
    {
        if ($IdPuesto == "" && $IdSucursal == "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal WHERE E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto == "" && $IdSucursal == "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE D.IdDivision = '$IdDivision' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' AND SD.IdSucursal = '$IdSucursal' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' AND D.IdDivision = '$IdDivision' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' AND P.IdPuesto = '$IdPuesto' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectoriosCorreosTelefonos
                WHERE  idDirectoriosCorreosTelefonos = '$idDirectoriosCorreosTelefonos');";
        }
        return '{ "DirectorioEmailTel": '.json_encode($this->Select($q))."}";
    }

    function getPersonalDirectorioExtensiones($IdPuesto, $IdSucursal, $IdDivision, $idDirectorioExtensiones)
    {
        if ($IdPuesto == "" && $IdSucursal == "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal WHERE E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto == "" && $IdSucursal == "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE D.IdDivision = '$IdDivision' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision == "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' AND SD.IdSucursal = '$IdSucursal' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE P.IdPuesto = '$IdPuesto' AND D.IdDivision = '$IdDivision' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision != "") {
            $q = "SELECT E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel FROM Empleados AS E
                INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' AND P.IdPuesto = '$IdPuesto' and E.Status = 1
                AND E.NoEmpleado NOT IN
                (SELECT NoEmpleado FROM DetalleDirectorioExtensiones
                WHERE  idDirectorioExtensiones = '$idDirectorioExtensiones');";
        }
        return json_encode($this->Select($q));
        return '{ "DirectorioExtensiones": '.json_encode($this->Select($q))."}";
    }

    function getCantidadNotificaciones($NoEmpleado)
    {
        $q = "SELECT SUM((SELECT coalesce(count(*),0) FROM LineaEticaMensajes AS LEM
        WHERE Revisado = 1 AND MensajeRevisado = 1 AND NoEmpleado = '$NoEmpleado') + (SELECT coalesce(count(*),0) FROM SolicitudesVacaciones  AS SV
        INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
        WHERE SV.Status = 0 AND SV.EmpleadoPadre = '$NoEmpleado' AND SV.VistoMsjJefe = 0)) as CantidadNotificaciones ;";
        $cons = $this->Select($q,array());
        $CantidadNotificaciones = $cons[0]["CantidadNotificaciones"];
        $Conexiones2 = new Conexiones();
        $idSPuesto = SessionManager::get("idSPuesto");
        $q2 = "SELECT Valor AS PuestosAceptados FROM Configuracion WHERE idConfiguracion = 1;";
        $cons2 = $Conexiones2->Select($q2, array());
        $PuestosAceptados = explode(",", $cons2[0]["PuestosAceptados"]);
        if (in_array($idSPuesto,$PuestosAceptados)) {
            $Conexiones3 = new Conexiones();
            $q3 = "SELECT coalesce(count(*)) as CantNotifVacacionesFinales FROM SolicitudesVacaciones  AS SV INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
                       WHERE SV.Status = 1 AND SV.VistoMsjFinal = 0;";
            $cons3 = $Conexiones3->Select($q3,array());
            $CantNotifVacacionesFinales = $cons3[0]["CantNotifVacacionesFinales"];
            $CantidadNotificaciones = ($CantidadNotificaciones + $CantNotifVacacionesFinales);
        }
        return '{ "CantidadNotificaciones": '.json_encode($CantidadNotificaciones)."}";
    }

    function recuperarPassword($Email)
    {
        try {
          if ($Email == "") {
              return "Por favor ingrese un correo electrónico.";
          }
          $q = "SELECT coalesce(count(*),0) as Existe FROM Empleados WHERE Email = '$Email';";
          $cons = $this->Select($q,array());
          $Existe = $cons[0]["Existe"];
          if ($Existe < 1) {
              return "Correo electrónico no encontrado.";
          } else {
              $Conexiones2 = new Conexiones();
              $q2 = "CALL spEnviaSolicitudRecoveryPass('$Email')";
              $cons2 = $Conexiones2->Procedure($q2,array());
              $idRecoveryPass = $cons2[0]["idSolicitudesRecoveryPass"];
              $idRecoveryPass = base64_encode($idRecoveryPass);
              $NombreEmp = $cons2[0]["Nombre"];
              $FechaSolicitud = $cons2[0]["FechaSolicitud"];
              $TiempoLimiteSoli = $cons2[0]["TiempoLimiteSoli"];
              try {
                  require_once("../PHPMailer/PHPMailerAutoload.php");
                  $mail = new PHPMailer;
                  $mail->isSendmail();

                  $mail->Host = 'mail.resosistemas.mx';
                  $mail->SMTPAuth = true; // Enable SMTP authentication
                  $mail->Username = 'mail.resosistemas.mx'; // SMTP username
                  $mail->Password = 'RESO@2908tormex'; // SMTP password
                  $mail->SMTPSecure = 'none'; // Enable TLS encryption, `ssl` also accepted
                  $mail->Port = 587;
                  $mail->IsHTML(true);

                  $fechaHoy = date("Y-m-d");

                  $mail->setFrom('mail.resosistemas.mx', "Klyns");
                  $mail->addAddress('cesargue444@gmail.com', "Klyns");
                  $mensajeSubject = "Klyns, Solicitud para recuperar contraseña.";
                  $mensajeSubject = utf8_decode($mensajeSubject);
                  $mail->Subject = $mensajeSubject;


                  $mensajeBody = "
                  <!DOCTYPE html>
                  <html lang='en'>
                  <head>
                      <meta charset='UTF-8'>
                      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                      <title>Document</title>
                      <style>
                  .button-15 {
                  margin-top: 4vh;
                  background-image: linear-gradient(#42A1EC, #0070C9);
                  border: 1px solid #0077CC;
                  border-radius: 4px;
                  box-sizing: border-box;
                  color: #FFFFFF;
                  cursor: pointer;
                  direction: ltr;
                  font-family: 'SF Pro Text','SF Pro Icons','AOS Icons','Helvetica Neue',Helvetica,Arial,sans-serif;
                  font-size: 17px;
                  font-weight: 400;
                  letter-spacing: -.022em;
                  line-height: 1.47059;
                  min-width: 30px;
                  overflow: visible;
                  padding: 4px 15px;
                  user-select: none;
                  -webkit-user-select: none;
                  touch-action: manipulation;
                  white-space: nowrap;
                  }

                  .button-15:disabled {
                  cursor: default;
                  opacity: .3;
                  }

                  .button-15:hover {
                  background-image: linear-gradient(#51A9EE, #147BCD);
                  border-color: #1482D0;
                  text-decoration: none;
                  }

                  .button-15:active {
                  background-image: linear-gradient(#3D94D9, #0067B9);
                  border-color: #006DBC;
                  outline: none;
                  }

                  .button-15:focus {
                  box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
                  outline: none;
                  }
                      </style>
                  </head>
                  <body style='margin: auto;'>
                      <div style='margin-top: 4vh;'>
                          <table style='max-width: 600px; padding: 10px; margin: 0 auto; border-collapse: collapse;'>
                              <tr>
                                  <td style='background-color: #ecf0f1; text-align: left; padding: 0;'>
                                  <div style='text-align: center; margin-top: 5vh;'>
                                          <a href=''>
                                              <img style='width: 20%; display: block; margin: auto; border-radius:15px' src='https://klyns.resosistemas.mx/assets/logoK.png' alt=''>
                                          </a>
                                  </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td style='background-color:#ecf0f1; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                      <div style='text-align: center; margin-top: 2vh;'>
                                          <h2 style='color: #B00000;margin: 0 4vh 0 4vh;'>$NombreEmp!</h2>
                                          <p style='margin: 3vh 4vh 0 4vh; text-align: justify !important;'>Se solicitó un restablecimiento de contraseña para el correo $Email, por favor haz clic en el siguiente botón para cambiar tu contraseña.</p>
                                      </div>
                                  </td>
                              </tr>
                              <tr style='background-color:#ecf0f1; margin: 4% 10% 2%; height: 15vh;'>
                                  <td >
                                  <div style='text-align: center;'>
                                          <a class='button-15' style='text-align: center; color:white !important' href='https://klyns.resosistemas.mx/RecoveryPassword.php?No=$idRecoveryPass'>Cambiar Contraseña</a>
                                  </div>
                                  </td>
                              </tr>
                              <tr style='background-color:#ecf0f1; margin: 2% 10% 2%; height: 10vh;'>
                                  <td>
                                      <div style='text-align: center; padding:2vh'>
                                          <span>La solicitud estará disponible por <b>$TiempoLimiteSoli horas</b> a partir del envío de la solicitud.</span>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </body>
                  </html>
                ";
                  $mensajeBody = utf8_decode($mensajeBody);
                  $mail->Body = $mensajeBody;
                  $exito = $mail->Send();
                  $intentos = 1;
                  while ((!$exito) && ($intentos < 5)) {
                      $mail->ErrorInfo;
                      sleep(5);
                      $exito = $mail->Send();
                      $intentos = $intentos + 1;
                  }
              } catch (\Exception $e) {
              }
          }
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function recoveryPassword($Password,$NoEmpleado)
    {
        try {
          $q = "UPDATE Empleados SET Password = '$Password' WHERE  NoEmpleado = '$NoEmpleado';";
          $this->Select($q,array());
          $Empleados = new Empleados();
          $Empleados->loginEmpleadoRecoveryPass($NoEmpleado,$Password);
          return "1";
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getDatosSolicitudPassword($idSolicitudesRecoveryPass)
    {
        $idSolicitudesRecoveryPass = base64_decode($idSolicitudesRecoveryPass);
        $q = "UPDATE SolicitudesRecoveryPass SET Visto = 1 WHERE idSolicitudesRecoveryPass = '$idSolicitudesRecoveryPass'";
        $this->ExecuteQuery($q,array());
        $Conexiones2 = new Conexiones();
        $q2 = "SELECT E.Nombre,E.NoEmpleado FROM SolicitudesRecoveryPass AS SRP
                INNER JOIN Empleados AS E ON E.NoEmpleado = SRP.NoEmpleado
                WHERE SRP.idSolicitudesRecoveryPass = '$idSolicitudesRecoveryPass';";
        return '{ "DatosSolicitudesRecoveryPass": '.json_encode($Conexiones2->Select($q2,array()))."}";
    }

    function loginEmpleadoRecoveryPass($NoEmpleado, $Password)
    {
        try {
          $q = "SELECT NoEmpleado,Nivel,IdDivision,IdSucursal,Nombre,IdPuesto,IdCentroCosto FROM Empleados WHERE NoEmpleado = '$NoEmpleado' AND Password = '$Password';";
          $cons = $this->Select($q, array());
          if (sizeof($cons) > 0) {
              setcookie("NoEmpleado", $cons[0]["NoEmpleado"], time() + (86400 * 30), "/");
              setcookie("nivel", $cons[0]["Nivel"], time() + (86400 * 30), "/");
              setcookie("IdDivision", $cons[0]["IdDivision"], time() + (86400 * 30), "/");
              setcookie("IdSucursal", $cons[0]["IdSucursal"], time() + (86400 * 30), "/");
              setcookie("idSPuesto", $cons[0]["IdPuesto"], time() + (86400 * 30), "/");
              setcookie("idCentroCosto", $cons[0]["IdCentroCosto"], time() + (86400 * 30), "/");
              setcookie("nombre", $cons[0]["Nombre"], time() + (86400 * 30), "/");
              setcookie("sesion", "activa", time() + (86400 * 300), "/");
              setcookie("tipo_sesion", "1", time() + (86400 * 30), "/");
              return "1";
          } else {
              return "Numero de usuario y/o contraseña incorrectos";
          }
        } catch (\Exception $e) {
            return $e;
        }
    }

    function getMisSolicitudesVacacionesEstadoNomina ($NoEmpleadoJefe) {
      $q = "SELECT SV.ComentariosSolicitud, SV.Status,SV.idSolicitudesVacaciones,E.Nombre,date_format(SV.Registro ,'%d-%m-%Y') as FechaSolicitud FROM SolicitudesVacaciones AS SV
              INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
              WHERE EmpleadoPadre = '$NoEmpleadoJefe' AND FechaJefeInmediatoAutoriza <> ''
              order by SV.Registro desc;";
      return '{ "EstadoMisSolicitudesNomina": '.json_encode($this->Select($q,array()))."}";
    }

    function getSolicitudesCanceladasJefe ($NoEmpleado) {
      $q = "SELECT E.Nombre,SV.ComentariosSolicitud,date_format(SV.Registro,'%d-%m-%Y') AS FechaSolicitud,SV.idSolicitudesVacaciones
              FROM SolicitudesVacaciones AS SV
              INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
              WHERE SV.Status = 2 AND UsuarioFinalAutoriza is NULL AND FechaAutorizadoFinal is NULL AND EmpleadoPadre = '$NoEmpleado';";
      return '{ "ListSolicitudesCanceladasJefe": '.json_encode($this->Select($q,array()))."}";
    }

    function getDatosEmpleadoSolicitud($NoEmpleado)
    {
        $q = "SELECT Nombre,DiasVacacionesRest as DiferenciaYears FROM Empleados
              where NoEmpleado = '$NoEmpleado';";
        return '{ "DatosEmpSolicitud": '.json_encode($this->Select($q,array()))."}";
    }

    function getJefesPosiblesSolicitud($NoEmpleado,$IdSucursal)
    {
        $q = "SELECT E.NoEmpleado,concat(E.Nombre,' - ',P.Puesto) AS DescJefe FROM Empleados AS E
        LEFT JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
        WHERE E.IdSucursal = '$IdSucursal' AND E.Status = 1 AND E.Nivel < (SELECT Nivel FROM Empleados WHERE NoEmpleado = '$NoEmpleado');";
        return '{ "ListPosibleJefe": '.json_encode($this->Select($q,array()))."}";
    }

    function InsertTokenCliente($NoEmpleado,$Token){

      try
      {
        if ($Token != "") {
          $q = "UPDATE Empleados set tokenOS = '$Token' WHERE NoEmpleado = '$NoEmpleado' ";
          $this->ExecuteQuery($q,array());
        }
        return "1";
      } catch (\Exception $e) {
        return "0";
      }
    }
}
?>
