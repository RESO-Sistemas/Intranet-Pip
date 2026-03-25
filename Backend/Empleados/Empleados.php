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
} else if (file_exists("./Backend/Session/SessionManager.php")) {
    require_once("./Backend/Session/SessionManager.php");
} else if (file_exists("../../Session/SessionManager.php")) {
    require_once("../../Session/SessionManager.php");
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Empleados extends Conexiones
{
  function loginEmpleado($NoEmpleado, $Password)
  {
      $Password = base64_encode($Password);
      $q = "SELECT NoEmpleado,Nivel,IdDivision,IdSucursal,Nombre,IdPuesto,IdCentroCosto FROM Empleados WHERE NoEmpleado = '$NoEmpleado' AND Password = '$Password';";
      $cons = $this->Select($q, array());
      if (sizeof($cons) > 0) {
          // Usar SessionManager en lugar de cookies
          SessionManager::login($cons[0]);
          error_log("el usuario $NoEmpleado inicio sesion");
          return "1";
      } else {
          error_log("el usuario $NoEmpleado no pudo iniciar sesion");
          return "Numero de usuario y/o contrase?a incorrectos";
      }
  }

  function validarLogin(){
    SessionManager::init();
    if (SessionManager::isLoggedIn()) {
      error_log("sesion activa para usuario ".SessionManager::get('NoEmpleado'));
      return "1";
    } else {
      return "ERROR!";
    }
  }

  function autorizaPermisoPagina($URL) {
      // El método esperaba que la URL tuviera al menos un "/" y un segmento
      // adicional. Asegurarse de que $URL sea una cadena y validar el índice.
      $URL = is_string($URL) ? $URL : '';
      $parts = explode('/', $URL);
      $URL = isset($parts[1]) ? $parts[1] : '';

      // Remover parámetros GET (todo lo que esté después de ?)
      if ($URL !== '' && strpos($URL, '?') !== false) {
        $URL = explode('?', $URL)[0];
      }

      $idPuesto = (SessionManager::get("idSPuesto"));
      $q = "SELECT M.URL FROM MenusPermisos AS MP
              INNER JOIN menus as M ON M.id_menu = MP.id_menu
              WHERE M.Id_Padre <> 0 AND MP.IdPuesto = '$idPuesto';";
      $cons = $this->Select($q,array());
      $AllMenus = [];
      for ($i=0; $i < sizeof($cons); $i++) {
        array_push($AllMenus,$cons[$i]["URL"]);
      }
      if (in_array($URL,$AllMenus)) {
        return "1";
      }else {
        return "0";
      }
    }

    function getDatosEmpleado($IdEmpleado)
    {
        $ArrayRetorno = [];
        $Datos = [];
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
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
            "Password" => $cons[0]["Password"],
            "Puesto" => $cons[0]["Puesto"],
            "RFC" => $cons[0]["RFC"],
            "Sucursal" => $cons[0]["Sucursal"],
            "MensajeBienvenida" => $MensajeBienvenida
        ];
        array_push($ArrayRetorno, $Datos);
        return json_encode($ArrayRetorno);
    }

    function getDivisiones()
    {
        $q = "SELECT * FROM Divisiones;";
        return json_encode($this->Select($q));
    }

    function updateDatosEmpleado($Email, $Movil, $Password)
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        try {
            // Obtener el password actual de la BD para comparar
            $qActual = "SELECT Password FROM Empleados WHERE NoEmpleado = '$NoEmpleado';";
            $consActual = $this->Select($qActual, array());
            $PasswordActualBD = $consActual[0]["Password"];
            
            // Solo codificar si el password es diferente al que ya est? en la BD
            // Esto evita la doble codificaci?n cuando el usuario no cambi? su password
            if ($Password !== $PasswordActualBD) {
                $Password = base64_encode($Password);
            }
            
            $q = "UPDATE Empleados SET Email = '$Email', Movil = '$Movil', Password = '$Password' WHERE NoEmpleado = '$NoEmpleado';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function updateFotoEmpleado($Imagen)
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        try {
            $q = "UPDATE Empleados SET Imagen = '$Imagen' WHERE NoEmpleado = '$NoEmpleado';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }

    }

    function getNameFotoEmpleado()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT Imagen FROM Empleados WHERE NoEmpleado = '$NoEmpleado';";
        $cons = $this->Select($q, array());
        return $cons;
    }

    function getColaboradores()
    {
        $IdDivision = (SessionManager::get("IdDivision"));
        $IdSucursal = (SessionManager::get("IdSucursal"));
        $q = "SELECT EM.Nombre,EM.Email,P.Puesto,EM.Nivel,EM.Imagen,EM.NoEmpleado FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE IdSucursal = '$IdSucursal' AND EM.Status = 1
          ORDER BY EM.Nivel;";
        return json_encode($this->Select($q));
    }

    function getColaboradoresOrganigrama()
    {
        $IdDivision = (SessionManager::get("IdDivision"));
        $IdSucursal = (SessionManager::get("IdSucursal"));
        $q = "SELECT EM.Nombre,EM.Email,P.Puesto,EM.Nivel,EM.NoEmpleado FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE IdDivision = '$IdDivision' and IdSucursal = '$IdSucursal'
          ORDER BY EM.Nivel;";
        return json_encode($this->Select($q));
    }

    function getDatosEmpleadosOrganigrama($NoEmpleadoAjax)
    {
        if ($NoEmpleadoAjax == "0") {
            $NoEmpleado = (SessionManager::get("NoEmpleado"));
            $q = "SELECT EM.Imagen,EM.Nombre,EM.Email,EM.Movil,EM.NoEmpleado,EM.RFC,EM.CURP,EM.NoSeguro,EM.Password,EM.FNacimiento,P.Puesto,SU.Sucursal,EM.Antiguedad,CC.CentrodeCosto,DI.Division,DI.IdDivision FROM Empleados as EM
              INNER JOIN Puestos as P ON P.IdPuesto = EM.IdPuesto
              INNER JOIN SucursalDepto AS SU ON SU.IdSucursal = EM.IdSucursal
              INNER JOIN CentroCostos AS CC ON CC.IdCentroCosto = EM.IdCentroCosto
              INNER JOIN Divisiones as DI ON DI.IdDivision = EM.IdDivision
              WHERE NoEmpleado = '$NoEmpleado';";
        } else {

            $q = "SELECT EM.Imagen,EM.Nombre,EM.Email,EM.Movil,EM.NoEmpleado,EM.RFC,EM.CURP,EM.NoSeguro,EM.Password,EM.FNacimiento,P.Puesto,SU.Sucursal,EM.Antiguedad,CC.CentrodeCosto,DI.Division,DI.IdDivision FROM Empleados as EM
              left JOIN Puestos as P ON P.IdPuesto = EM.IdPuesto
              left JOIN SucursalDepto AS SU ON SU.IdSucursal = EM.IdSucursal
              left JOIN CentroCostos AS CC ON CC.IdCentroCosto = EM.IdCentroCosto
              left JOIN Divisiones as DI ON DI.IdDivision = EM.IdDivision
              WHERE NoEmpleado = '$NoEmpleadoAjax';";
        }
        return json_encode($this->Select($q));
    }

    function updateDatosSaludEmpleado($HabitusExteriorDescripcion, $Peso, $Complexion, $Talla, $FrCardiaca, $FrRespiratoria, $TensionArterial, $Temperatura, $GrupoSanguineo, $FactorRh, $CartillaVacunacion, $EsquemaCompleto, $OtrosComentariosSalud)
    {
        try {
            $NoEmpleado = (SessionManager::get("NoEmpleado"));
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

    function getDatosSaludEmpleado()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT HabitusExteriorDescripcion,Complexion,Talla,FrCardiaca,FrRespiratoria,TensionArterial,Temperatura,
            GrupoSanguineo,FactorRh,CartillaVacunacion,EsquemaCompleto,OtrosComentariosSalud,Peso FROM Empleados
            WHERE NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q));
    }

    function getPersonal($IdPuesto, $IdSucursal, $IdDivision)
        {
            if ($IdPuesto == "" && $IdSucursal == "" && $IdDivision == "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal";
            } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision == "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE P.IdPuesto = '$IdPuesto'";
            } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision == "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE SD.IdSucursal = '$IdSucursal'";
            } elseif ($IdPuesto == "" && $IdSucursal == "" && $IdDivision != "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE D.IdDivision = '$IdDivision'";
            } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision == "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE P.IdPuesto = '$IdPuesto' AND SD.IdSucursal = '$IdSucursal'";
            } elseif ($IdPuesto != "" && $IdSucursal == "" && $IdDivision != "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE P.IdPuesto = '$IdPuesto' AND D.IdDivision = '$IdDivision'";
            } elseif ($IdPuesto == "" && $IdSucursal != "" && $IdDivision != "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision'";
            } elseif ($IdPuesto != "" && $IdSucursal != "" && $IdDivision != "") {
                $q = "SELECT E.Status, E.NoEmpleado,E.Nombre,E.Email,P.Puesto,D.Division,SD.Sucursal,SD.IdSucursal,D.IdDivision,E.Nivel,E.Movil,E.CURP,E.RFC,E.NoSeguro,E.Password FROM Empleados AS E
                  INNER JOIN Divisiones AS D ON D.IdDivision = E.IdDivision
                  INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                  INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                  WHERE SD.IdSucursal = '$IdSucursal' AND D.IdDivision = '$IdDivision' AND P.IdPuesto = '$IdPuesto'";
            }
            return json_encode($this->Select($q));
        }

    function getColaboradoresEmpleado($IdDivision, $IdSucursal, $EmpleadoPadre)
    {
        $q = "SELECT EM.NoEmpleado,EM.Nombre,EM.Email,P.Puesto,EM.Nivel FROM Empleados as EM left JOIN Puestos AS P ON P.IdPuesto = EM.IdPuesto
          WHERE IdDivision = '$IdDivision' and IdSucursal = '$IdSucursal' and
          EM.NoEmpleado NOT IN (SELECT EmpleadoHijo FROM RelacionEmpleados WHERE EmpleadoPadre = '$EmpleadoPadre')
          ORDER BY EM.Nivel;";
        return json_encode($this->Select($q));
    }

    function addRelacionEmpleadoPadreHijo($EmpleadoPadre, $EmpleadoHijo)
    {
        $q = "INSERT INTO RelacionEmpleados(EmpleadoPadre,EmpleadoHijo,Registro) VALUES ('$EmpleadoPadre','$EmpleadoHijo',now());";
        $this->ExecuteQuery($q, array());
        return "1";
    }

    function getRelacionPadre($EmpleadoPadre)
    {
        $q = "SELECT E.Nombre,E.NoEmpleado,P.Puesto,RE.idRelacionEmpleados FROM RelacionEmpleados as RE
            INNER JOIN Empleados AS E ON E.NoEmpleado = RE.EmpleadoHijo
            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
            WHERE EmpleadoPadre = '$EmpleadoPadre';";
        return json_encode($this->Select($q));
    }

    function deleteRelacionPadre($idRelacionEmpleados)
    {
        $q = "DELETE FROM RelacionEmpleados WHERE idRelacionEmpleados = '$idRelacionEmpleados';";
        $this->ExecuteQuery($q, array());
        return "1";
    }

    function getDatosEmpleadoSolocitud()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT Nombre,DiasVacacionesRest as DiferenciaYears FROM Empleados
      where NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q));
    }

    function enviarSolicitudVacaciones($FechaInicio, $FechaFin, $ComentariosSolicitud, $TotalDias,$DiaRegreso)
    {
        $FechaRegresoUNIX = strtotime($DiaRegreso);
        $FechaRegresoNoUNIX = date('Y-m-d',$FechaRegresoUNIX);
        $NombreEmp = (SessionManager::get("nombre"));
        $ArrMsgPush = [];
        $fechaActual = date('d-m-Y');
        // $fechaFin = date("d-m-Y",strtotime($FechaInicio."+ $FechaInicio days"));
        $fechaFin = $FechaFin;

        $EmpleadoHijo = (SessionManager::get("NoEmpleado"));
        $Conexiones4 = new Conexiones();
        $q4 = "SELECT Firma, tokenOS FROM Empleados WHERE NoEmpleado = '$EmpleadoHijo'; ";
        $cons4 = $Conexiones4->Select($q4, array());
        $FirmaEmp = $cons4[0]["Firma"];
        if ($FirmaEmp === null) {
            return "errorFirma";
        }
        if ($cons4[0]["tokenOS"] !== null && $cons4[0]["tokenOS"] != "") {
          array_push($ArrMsgPush,[
            "msg" => 'Se ha generado tu solicitud de vacaciones.',
            "token" => $cons4[0]["tokenOS"]
          ]);
        }
        $q = "SELECT EmpleadoPadre FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
        $cons = $this->Select($q, array());
        if (sizeof($cons) > 0) {
          if ($cons[0]["tokenOS"] !== null && $cons[0]["tokenOS"] != "") {
              array_push($ArrMsgPush,[
                "msg" => 'El empleado '.$NombreEmp.' est? solicitando sus vacaciones.',
                "token" => $cons[0]["tokenOS"],
              ]);
            }
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
                for ($j = 0; $j < sizeof($cons2); $j++) {
                    $EmailEmpleadoP = $cons2[$j]["Email"];

                    try {
                        require '../PHPMailer/src/Exception.php';
                        require '../PHPMailer/src/PHPMailer.php';
                        require '../PHPMailer/src/SMTP.php';
                        $mail = new PHPMailer;
                        $mail->isSendmail();
                        //$mail->isSMTP();
                        $mail->Host = '162.240.213.3';
                        $mail->SMTPAuth = true;
                        $mail->Username = 'interno@klynet.mx';
                        $mail->Password = 'K1yn@22022';
                        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                        $mail->Port = 587;
                        $mail->IsHTML(true);

                        $fechaHoy = date("Y-m-d");

                        $mail->setFrom('interno@klynet.mx','Klyns');
                        $mail->addAddress($EmailEmpleadoP, "VKlyns");
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
                                              width: 35%;
                                          }
                                          .contenedor{
                                              padding: 2%;
                                              margin: auto;
                                              align-content: center;
                                              align-items: center;
                                              width: 40%;
                                              height: 100%;
                                              background-color: white;
                                              border:4px solid black;
                                              text-align: center;
                                              border-radius: 15px;
                                              border-color: crimson;
                                          }
                                      </style>
                                  </head>
                                  <body>
                                          <div class='contenedor'>
                                              <img src='https://klyns.resosistemas.mx/assets/images/descarga-PhotoRoom.png' class='logo'><br><br>
                                              <span>El empleado <b>$NombreEmp</b> solicita sus vacaciones.</span><br>
                                              <h4>Comentarios de la Solicitud:</h4>
                                              <span>$ComentariosSolicitud</span><br>
                                              <h6>Fecha de inicio: $FechaInicio            Fecha Fin: $fechaFin</h6><br>
                                              <h5>$fechaActual</h5><br><br>
                                              <a target='_blank' href='https://klynet.mx/FormatoVacaciones.php?Solicitud=$idSolicitud'>Ver Solicitud</a>
                                          </div>
                                  </body>
                                  </html>
                                ";
                 $mensajeBody = utf8_decode($mensajeBody);
                 $mail->Body = $mensajeBody;
                 $mail->send();

                 return "1";
                    } catch (Exception $e) {
                      error_log("Mensaje ".$mail->ErrorInfo);
                    }
                }
            }
            if (sizeof($ArrMsgPush) > 0) {
              $NewInstEmpleados = new Empleados();
              $NewInstEmpleados->sendPushNotificationToSegment($ArrMsgPush);
            }
            return "1";
        } else {
            return "errorJefe";
        }
    }

      function sendPushNotificationToSegment($message) {
        $appId = 'e18c94b0-e0cb-4a0a-9335-2c43cb924b28'; // reemplazar con su App ID
        $restApiKey = 'ZWI3MTNhNzUtNWI5MC00YzU5LTlkYzUtMmI3NzZjY2MzNmQw'; // reemplazar con su Rest API Key
        $ArrPersonas = ["Active Users","Inactive Users"];
        for ($i=0; $i < sizeof($message) ; $i++) {
          $msg = $message[$i]["msg"];
          $token = $message[$i]["token"];
          error_log($msg);
          error_log($token);
          $data = array(
              'app_id' => "e18c94b0-e0cb-4a0a-9335-2c43cb924b28",
              'include_player_ids' => array($token),
              // 'include_segment' => $ArrPersonas,
              'contents' => array('en' => $msg)
          );

          $dataString = json_encode($data);

          $headers = array(
              'Authorization: Basic ' . $restApiKey,
              'Content-Type: application/json',
          );

          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
          curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
          curl_setopt($ch, CURLOPT_HEADER, FALSE);
          curl_setopt($ch, CURLOPT_POST, TRUE);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
          curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
          $response = curl_exec($ch);
          curl_close($ch);
        }// return $response;
    }

    function getMisSolicitudesVacaciones()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT idSolicitudesVacaciones,ComentariosSolicitud, Status,date_format(Registro ,'%d-%m-%Y') as FechaSolicitud FROM SolicitudesVacaciones WHERE NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
    }

    function getMisSolicitudesPorRevisar()
    {
        $EmpleadoPadre = (SessionManager::get("NoEmpleado"));
        $q = "SELECT SV.idSolicitudesVacaciones,E.Nombre,date_format(SV.FechaInicio, '%d' '/' '%m' '/' '%y' '   ' '%H' ':' '%i') as FechaInicio,
            date_format(SV.FechaFin, '%d' '/' '%m' '/' '%y' '   ' '%H' ':' '%i') as FechaFin,SV.ComentariosSolicitud,
            date_format(SV.Registro ,'%d-%m-%Y') as FechaSolicitud FROM SolicitudesVacaciones AS SV
            INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
            WHERE SV.EmpleadoPadre = '$EmpleadoPadre' and SV.Status = 0;";
        return json_encode($this->Select($q, array()));
    }

    function updateStatusSolicitud($Status, $idSolicitudesVacaciones)
    {
        try {
            $NoEmpleado = (SessionManager::get("NoEmpleado"));
            $q = "SELECT Firma FROM Empleados WHERE NoEmpleado = '$NoEmpleado'";
            $cons = $this->Select($q,array());
            $Firma = $cons[0]["Firma"];
            if ($Firma == "" || $Firma === null) {
                return 'Dir?jase a "Mi Perfil" y actualic? su firma, por favor.';
            } else {
                $Conexiones2 = new Conexiones();
                $q2 = "UPDATE SolicitudesVacaciones SET Status = '$Status',JefeInmediatoAutoriza = '$NoEmpleado' , FechaJefeInmediatoAutoriza = now()
                          WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
                $Conexiones2->ExecuteQuery($q2, array());
                if ($Status == "1") {
                  $Conexiones3 = new Conexiones();
                  $q3 = "SELECT Email,tokenOS FROM Empleados
                          WHERE IdPuesto = '81';";
                  $cons3 = $Conexiones3->Select($q3,array());
                  if (sizeof($cons3) > 0) {
                    $Conexiones4 = new Conexiones();
                    $q4 = "SELECT E.Nombre,date_format(SV.Registro,'%d-%m-%Y') AS FechaSolicitud,SV.ComentariosSolicitud,P.Puesto,SD.Sucursal,
                            date_format(SV.FechaInicio,'%d-%m-%Y') AS FechaInicio, date_format(SV.FechaFin,'%d-%m-%Y') AS FechaFin FROM SolicitudesVacaciones AS SV
                            LEFT JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
                            LEFT JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                            LEFT JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
                            WHERE SV.idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
                    $cons4 = $Conexiones4->Select($q4,array());
                    $NombreEmp = $cons4[0]["Nombre"];
                    $FechaSolicitud = $cons4[0]["FechaSolicitud"];
                    $ComentariosSolicitud = $cons4[0]["ComentariosSolicitud"];
                    $Puesto = $cons4[0]["Puesto"];
                    $Sucursal = $cons4[0]["Sucursal"];
                    $FechaInicio = $cons4[0]["FechaInicio"];
                    $FechaFin = $cons4[0]["FechaFin"];

                    $idSolicitudesVacacionesb64 = base64_encode($idSolicitudesVacaciones);
                    try {
                      require '../PHPMailer/src/Exception.php';
                      require '../PHPMailer/src/PHPMailer.php';
                      require '../PHPMailer/src/SMTP.php';
                      $mail = new PHPMailer;
                      $mail->isSendmail();
                      //$mail->isSMTP();
                      $mail->Host = '162.240.213.3';
                      $mail->SMTPAuth = true;
                      $mail->Username = 'interno@klynet.mx';
                      $mail->Password = 'K1yn@22022';
                      $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                      $mail->Port = 587;
                      $mail->IsHTML(true);
                      $mail->setFrom('interno@klynet.mx','Klyns');

                      $ArrMsgPush = [];
                      for ($i=0; $i < sizeof($cons3); $i++) {
                        if ($cons3[$i]["tokenOS"] !== null && $cons3[$i]["tokenOS"] != "") {
                          array_push($ArrMsgPush,[
                            "msg" => 'N?mina: Has recibido una nueva solicitud de vacaciones del empleado '.$NombreEmp,
                            "token" => $cons3[$i]["tokenOS"]
                          ]);
                        }
                        $EmailNomina = $cons3[$i]["Email"];
                        $mail->addBCC($EmailNomina, "VKlyns");
                      }
                      $mensajeSubject = "Solicitud de Vacaciones";
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
                                  <body>
                                      <div style='margin-top: 4vh;'>
                                          <table style='max-width: 600px; padding: 10px; margin: 0 auto; border-collapse: collapse;'>
                                              <thead style='text-align:center'>
                                                  <tr>
                                                      <th style='background-color: #ecf0f1; text-align: left; padding: 0;'>
                                                          <div style='text-align: center; margin-top: 5vh;'>
                                                              <a href=''>
                                                                  <img style='width: 20%; display: block; margin: auto; border-radius:15px' src='https://klynet.mx/assets/images/logo-pip.png' alt=''>
                                                              </a>
                                                           </div>
                                                      </th>
                                                  </tr>
                                                  <tr>
                                                      <th style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <h2>Nueva solicitud de vacaciones.</h2>
                                                         </div>
                                                      </th>
                                                  </tr>

                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <th style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <p>El empleado $NombreEmp solicita sus vacaciones.</p>
                                                         </div>
                                                      </th>
                                                  </tr>
                                                  <tr>
                                                      <td style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <span><b>Sucursal / Departamento del empleado: </b>$Sucursal</span>
                                                         </div>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <span><b>Puesto del empleado:?</b>$Puesto</span>
                                                         </div>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <span><b>Fecha de la Solicitud: </b>$FechaSolicitud</span>
                                                         </div>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <span><b>Motivo de la solicitud: </b>$ComentariosSolicitud</span>
                                                          </div>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; margin-top: 2vh;'>
                                                              <span><b>Inicio de las Vacaciones: </b>$FechaInicio</span>
                                                         </div>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style='background-color: #ecf0f1; text-align: center; padding: 0; text-align:center; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                          <div style='text-align: center; padding:2vh'>
                                                              <span><b>Fin de las Vacaciones: </b>$FechaFin</span>
                                                         </div>
                                                      </td>
                                                  </tr>
                                                  <tr style='background-color:#ecf0f1; margin: 4% 10% 2%; height: 15vh;'>
                                                      <td >
                                                      <div style='text-align: center;'>
                                                              <a class='button-15' style='text-align: center; color:white !important' href='https://klynet.mx/SolicitudesVacacionesFinales.php?SV=$idSolicitudesVacacionesb64'>Ver Solicitud</a>
                                                      </div>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </body>
                                  </html>
                      ";
                      $mensajeBody = utf8_decode($mensajeBody);
                      $mail->Body = $mensajeBody;
                      $mail->send();
                      if (sizeof($ArrMsgPush) > 0) {
                          $NewInstEmpleados = new Empleados();
                          $NewInstEmpleados->sendPushNotificationToSegment($ArrMsgPush);
                      }
                      return "1";
                    } catch (Exception $e) {
                      error_log("Mensaje ".$mail->ErrorInfo);
                    }
                  } else {
                    return "1";
                  }
                } else {
                  return "1";
                }
            }
        } catch (\Exception $e) {
            return "0";
        }
    }

    function addVacunacionCOVID($Numero, $Vacuna, $FechaVacunacion)
    {
      if (sizeof($Numero) > 0) {
          $NoEmpleado = (SessionManager::get("NoEmpleado"));
          for ($i = 0; $i < sizeof($Numero); $i++) {
              $con = new Conexiones();
              $q = "INSERT INTO EsquemaVacunacionCOVID(Numero,Vacuna,FechaVacunacion,NoEmpleado)
                VALUES (?,?,?,?);";
              $con->ExecuteQuery($q, array($Numero[$i], $Vacuna[$i], $FechaVacunacion[$i], $NoEmpleado));
          }
          return "1";
        }else {
          return "No se han producido cambios.";
        }
    }

    function getEsquemaVacunacion()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT idEsquemaVacunacionCOVID,Numero,Vacuna,FechaVacunacion FROM EsquemaVacunacionCOVID
            where NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
    }

    function deleteEsquemaVacunacion($idEsquemaVacunacionCOVID)
    {
        $q = "DELETE FROM EsquemaVacunacionCOVID WHERE idEsquemaVacunacionCOVID = '$idEsquemaVacunacionCOVID';";
        $this->ExecuteQuery($q, array());
        return "1";
    }

    function updateEsquemaVacunacion($Numero, $Vacuna, $FechaVacunacion, $idEsquemaVacunacionCOVID)
    {
        $q = "UPDATE EsquemaVacunacionCOVID SET Numero = '$Numero', Vacuna = '$Vacuna', FechaVacunacion = '$FechaVacunacion'
      WHERE idEsquemaVacunacionCOVID = '$idEsquemaVacunacionCOVID';";
        $this->ExecuteQuery($q, array());
        return "1";
    }

    function getDivisionEmpleado(){
        try {
          $NoEmpleado = (SessionManager::get("NoEmpleado"));
          $q = "SELECT P.IdDivision,DV.LaburaSabados,DV.LaburaDomingos, DV.LaburaDiasFestivos
                FROM Empleados AS E
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                INNER JOIN Divisiones AS DV ON DV.IdDivision = E.IdDivision
                WHERE NoEmpleado = '$NoEmpleado';";
          $resultado = $this->Select($q,array());
          $Division = $resultado[0]["IdDivision"];
          return $resultado[0];
        } catch (\Exception $e) {
          return $e;
        }
      }

      function getFechasRango($fechaInicio, $fechaFin, $diasDescanso){
      $arrDiasDescanso = [];
      if ($diasDescanso != ""){
        $arrDiasDescanso = $diasDescanso;
      }
      $InstDivision = new Empleados();
      $DatosDivision = $InstDivision->getDivisionEmpleado();
      $IdDivision = $DatosDivision["IdDivision"];
      // $LaburaSabados = $DatosDivision["LaburaSabados"];
      // $LaburaDomingos = $DatosDivision["LaburaDomingos"];
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
          if (count($arrDiasDescanso) > 0) {
            if (!in_array($dia,$arrDiasDescanso)) {
              $datos = [
                  "fecha" => $dia
              ];
              array_push($fechas, $datos);
            }
          } else {
            $datos = [
                "fecha" => $dia
            ];
            array_push($fechas, $datos);
          }
        }
      }
      // var_dump($ArrFechasFormatoFin);
      $FechaDiaSiguienteUNIX = $DiaSiguienteUNIX;
      for ($i=0; $i < 9999 ; $i ++) {
        if (!in_array($FechaDiaSiguienteUNIX,$ArrFechasFormatoFin)) {
          $diaSig = date("l", $FechaDiaSiguienteUNIX);
          if (count($arrDiasDescanso) > 0) {
            if (!in_array($diaSig,$arrDiasDescanso)) {
              break;
            } else {
               $FechaDiaSiguienteUNIX += 86400;
            }
          } else {
            break;
          }
          // if ($diaSig != "Sunday" && $diaSig != "Saturday") {
          //   break;
          // } else if ($diaSig == "Saturday") {
          //   if ($LaburaSabados == 1) {
          //     break;
          //   } else {
          //     $FechaDiaSiguienteUNIX += 86400;
          //   }
          // } else if ($diaSig == "Sunday"){
          //   if ($LaburaDomingos == 1) {
          //     break;
          //   } else {
          //     $FechaDiaSiguienteUNIX += 86400;
          //   }
          // }

      } else {
        $FechaDiaSiguienteUNIX += 86400;
      }
    }
      $DiaSiguienteNoUnix = date('d-m-Y',$FechaDiaSiguienteUNIX);
      $datosInserta = [
        "CantDias" => count($fechas),
        // "DatosDivision" => [
        //   "LaburaSabados" => $LaburaSabados,
        //   "LaburaDomingos" => $LaburaDomingos
        // ],
        "DiaRegreso" => $DiaSiguienteNoUnix
      ];
      array_push($arrayRetorno, $datosInserta);
      return json_encode($arrayRetorno);
    }


    function SubirFirma($imagen64)
    {
        $random = rand(1000, 9999);
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
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
        $this->ExecuteQuery($q, array());
        return "1";
    }
    function getFirmaEmp()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT Firma,NoEmpleado from Empleados where  NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
    }

    function getDetalleSolicitud($idSolicitudesVacaciones)
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $array = [];
        $q = "SELECT SU.Sucursal,SV.NoEmpleado,SV.Status,EM.Firma,EM.Nombre,P.Puesto,
        DATE_FORMAT(EM.Antiguedad, '%d-%m-%Y') AS Antiguedad,
        CC.CentrodeCosto,DI.Division,date_format(SV.Registro,'%d-%m%-%Y') AS Registro,
        date_format(SV.FechaInicio,'%d-%m-%Y') AS FechaInicio,date_format(date_add(SV.FechaFin,interval 1 DAY),'%d-%m-%Y') AS FechaFin,EM.IdCentroCosto,SV.TotalDias,EM.DiasVacacionesRest,
        date_format(SV.DiaRegreso,'%d-%m-%Y') as DiaRegreso FROM Empleados as EM
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
        
        $firmaJefe = isset($cons2[0]["Firma"]) ? $cons2[0]["Firma"] : "";
        $noJefe = isset($cons2[0]["EmpleadoPadre"]) ? $cons2[0]["EmpleadoPadre"] : "";
        $nombreJefe = isset($cons2[0]["NombreJefe"]) ? $cons2[0]["NombreJefe"] : "";
        
        $firmaFinal = isset($cons3[0]["Firma"]) ? $cons3[0]["Firma"] : "";
        $noFinalAutoriza = isset($cons3[0]["UsuarioFinalAutoriza"]) ? $cons3[0]["UsuarioFinalAutoriza"] : "";

        $Datos = [
            "NombreSolicitante" => isset($cons[0]["Nombre"]) ? $cons[0]["Nombre"] : "",
            "FirmaSolicitante" => isset($cons[0]["Firma"]) ? $cons[0]["Firma"] : "",
            "PuestoSolicitante" => isset($cons[0]["Puesto"]) ? $cons[0]["Puesto"] : "",
            "NoEmpleado" => isset($cons[0]["NoEmpleado"]) ? $cons[0]["NoEmpleado"] : "",
            "Departamento" => isset($cons[0]["IdCentroCosto"]) ? $cons[0]["IdCentroCosto"] : "",
            "FechaInicio" => isset($cons[0]["FechaInicio"]) ? $cons[0]["FechaInicio"] : "",
            "Antiguedad" => isset($cons[0]["Antiguedad"]) ? $cons[0]["Antiguedad"] : "",
            "FechaRegistroSoli" => isset($cons[0]["Registro"]) ? $cons[0]["Registro"] : "",
            "FechaFin" => isset($cons[0]["FechaFin"]) ? $cons[0]["FechaFin"] : "",
            "DiasVacacionesRest" => isset($cons[0]["DiasVacacionesRest"]) ? $cons[0]["DiasVacacionesRest"] : "",
            "TotalDias" => isset($cons[0]["TotalDias"]) ? $cons[0]["TotalDias"] : "",
            "FirmaJefe" => $firmaJefe,
            "NoJefe" => $noJefe,
            "Status" => isset($cons[0]["Status"]) ? $cons[0]["Status"] : "",
            "FirmaFinal" => $firmaFinal,
            "NoFinalAutoriza" => $noFinalAutoriza,
            "NombreJefe" => $nombreJefe,
            "Sucursal" => isset($cons[0]["Sucursal"]) ? $cons[0]["Sucursal"] : "",
            "FechaRegreso" => isset($cons[0]["DiaRegreso"]) ? $cons[0]["DiaRegreso"] : ""
        ];
        array_push($array, $Datos);
        return json_encode($array);
    }

    function getMisSolicitudesFinales()
    {
        $q = "SELECT SD.Sucursal,SV.idSolicitudesVacaciones,E.Nombre,SV.Registro,SV.FechaInicio,SV.FechaFin,SV.ComentariosSolicitud,SV.TotalDias,date_format(SV.Registro ,'%d-%m-%Y') as FechaSolicitud
            FROM SolicitudesVacaciones AS SV
          	INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
            INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
          	WHERE SV.Status = 1;";
        return json_encode($this->Select($q, array()));
    }

    function realizarAccionSolicitudFinal($idSolicitudesVacaciones, $Status)
    {
        try {
            $UsuarioFinalAutoriza = (SessionManager::get("NoEmpleado"));
            $q = "SELECT Firma FROM Empleados WHERE NoEmpleado = '$UsuarioFinalAutoriza'";
            $cons = $this->Select($q,array());
            $Firma = $cons[0]["Firma"];
            if ($Firma == "" || $Firma === null) {
                return 'Dir?jase a "Mi Perfil" y actualic? su firma, por favor.';
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
                $FechaAutorizado = isset($respuesta1[0]["FechaAutorizadoFinal"]) ? $respuesta1[0]["FechaAutorizadoFinal"] : date("Y-m-d H:i:s");
                $Retorno = isset($respuesta1[0]["Retorno"]) ? $respuesta1[0]["Retorno"] : "1";
                if ($Status == "1") {
                    try {
                      require '../PHPMailer/src/Exception.php';
                      require '../PHPMailer/src/PHPMailer.php';
                      require '../PHPMailer/src/SMTP.php';
                      $mail = new PHPMailer;
                      $mail->isSendmail();
                      //$mail->isSMTP();
                      $mail->Host = '162.240.213.3';
                      $mail->SMTPAuth = true;
                      $mail->Username = 'interno@klynet.mx';
                      $mail->Password = 'K1yn@22022';
                      $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                      $mail->Port = 587;
                      $mail->IsHTML(true);

                        $fechaHoy = date("Y-m-d");

                        $mail->setFrom('interno@klynet.mx','Klyns');
                        $mail->addAddress($EmailEmpleado, "VKlyns");
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
                                    <img src='https://klynet.mx/assets/images/descarga-PhotoRoom.png' class='logo'><br><br>
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
                                        <span style='font-size: 23px ;'>Fecha de Aceptaci?n: </span>
                                        <span style='margin-left:2vh; font-size: 20px;'>$FechaAutorizado</span><br>
                                    </div>
                                    <a href='https://klynet.mx/SolicitudesVacacionesFinales.php?Solicitud=$idSolicitudesVacaciones'>Ver Solicitud</a>
                                </div>
                        </body>
                        </html>
                      ";
                        $mensajeBody = utf8_decode($mensajeBody);
                        $mail->Body = $mensajeBody;
                        $exito = $mail->Send();
                        if (!$exito) {
                            error_log("Error enviando correo de vacaciones: " . $mail->ErrorInfo);
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

        return json_encode($array);
    }

    function getListPuestos()
    {
      $q = "SELECT TO_BASE64(P.IdPuesto) AS IdPuesto,P.Puesto,D.Division,P.EsJefe,
            IF(IdJefesPuesto IS NULL OR IdJefesPuesto = '','Puesto sin jefe asignado', (SELECT GROUP_CONCAT(Puesto SEPARATOR ', ') FROM Puestos WHERE FIND_IN_SET(IdPuesto, P.IdJefesPuesto))) as PuestoJefe
            FROM Puestos AS P
            LEFT JOIN Divisiones AS D ON D.IdDivision = P.IdDivision
            order by P.Puesto ASC;";
      return json_encode($this->Select($q, array()));
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

    function insertaEmpleadosExcel($Datos)
    {
        $PassEncrypt = base64_encode('12345');
        $DatosRegisroArr = [];
        $ArregloRegistros = [];
        $Datos = explode('[', $Datos);
        $Datos = explode(']', $Datos[1]);
        $Datos = explode('},', $Datos[0]);
        for ($i = 0; $i < sizeof($Datos); $i++) {
            $RegistroDatos = $Datos[$i];
            $RegistroDatos = str_replace('[', '', $RegistroDatos);
            $RegistroDatos = str_replace('{', '', $RegistroDatos);
            $RegistroDatos = str_replace('}', '', $RegistroDatos);
            $RegistroDatos = str_replace('"', '', $RegistroDatos);
            $RegistroDatos = explode(",", $RegistroDatos);

            $CentroCostoArray = $RegistroDatos[0];
            $CentroCostoArray = explode(":", $CentroCostoArray);
            $ValorCentroCosto = $CentroCostoArray[1];

            $DivisionArray = $RegistroDatos[1];
            $DivisionArray = explode(":", $DivisionArray);
            $ValoDivision = $DivisionArray[1];

            $DepartamentoArray = $RegistroDatos[2];
            $DepartamentoArray = explode(":", $DepartamentoArray);
            $ValorDepartamento = $DepartamentoArray[1];

            $NoEmpleadoArray = $RegistroDatos[3];
            $NoEmpleadoArray = explode(":", $NoEmpleadoArray);
            $ValorNoEmpleado = $NoEmpleadoArray[1];

            $NombreArray = $RegistroDatos[4];
            $NombreArray = explode(":", $NombreArray);
            $ValorNombre1 = $NombreArray[1];

            $NombreArray2 = $RegistroDatos[5];
            $ValorNombreEmpleadoFinal = $ValorNombre1 . "," . $NombreArray2;

            $PuestoArray = $RegistroDatos[6];
            $PuestoArray = explode(":", $PuestoArray);
            $ValorPuesto = $PuestoArray[1];

            $AntiguedadArray = $RegistroDatos[7];
            $AntiguedadArray = explode(":", $AntiguedadArray);
            $ValorAntiguedad = $AntiguedadArray[1];

            $NacimientoArray = $RegistroDatos[8];
            $NacimientoArray = explode(":", $NacimientoArray);
            $ValorNacimiento = $NacimientoArray[1];

            $RFCArray = $RegistroDatos[9];
            $RFCArray = explode(":", $RFCArray);
            $ValorRFC = $RFCArray[1];

            $CURPArray = $RegistroDatos[10];
            $CURPArray = explode(":", $CURPArray);
            $ValorCURP = $CURPArray[1];

            $NoSeguroArray = $RegistroDatos[11];
            $NoSeguroArray = explode(":", $NoSeguroArray);
            $ValorNoSeguro = $NoSeguroArray[1];

            $EmailArray = $RegistroDatos[12];
            $EmailArray = explode(":", $EmailArray);
            $ValorEmail = $EmailArray[1];

            $CelularArray = $RegistroDatos[13];
            $CelularArray = explode(":", $CelularArray);
            $ValorCelular = $CelularArray[1];

            $NivelArray = $RegistroDatos[14];
            $NivelArray = explode(":", $NivelArray);
            $ValorNivel = $NivelArray[1];

            $DatosRegisroArr = [
                "Antiguedad" => $ValorAntiguedad,
                "CURP" => $ValorCURP,
                "Celular" => $ValorCelular,
                "CentroCosto" => $ValorCentroCosto,
                "Departamento" => $ValorDepartamento,
                "Division" => $ValoDivision,
                "Email" => $ValorEmail,
                "Nacimiento" => $ValorNacimiento,
                "Nivel" => $ValorNivel,
                "NoSeguroS" => $ValorNoSeguro,
                "Nombre" => $ValorNombreEmpleadoFinal,
                "NumeroEmpleado" => $ValorNoEmpleado,
                "Puesto" => $ValorPuesto,
                "RFC" => $ValorRFC
            ];

            array_push($ArregloRegistros, $DatosRegisroArr);
        }

        $ContadorEmpleados = "0";
        $contador = "0";
        $values = "";
        $ArrayRetorno = [];
        $ArrayEmpleadosDuplicados = [];
        $DatosAr = [];
        for ($i = 0; $i < sizeof($ArregloRegistros); $i++) {
            $ContadorEmpleados++;
            $Conexiones1 = new Conexiones();
            $Conexiones2 = new Conexiones();
            $Conexiones3 = new Conexiones();
            $Conexiones5 = new Conexiones();
            $Antiguedad = $ArregloRegistros[$i]["Antiguedad"];
            $Antiguedad = str_replace("/", "-", $Antiguedad);


            $AntiguedadExplode = explode("-", $Antiguedad);

            if ($AntiguedadExplode[0] < 70 && $AntiguedadExplode[0] > 30 && $AntiguedadExplode[0] != "00") {
                $Antiguedad = "19" . $Antiguedad;
            } else {
                $Antiguedad = date("Y-m-d", strtotime($Antiguedad));
            }

            $CURP = $ArregloRegistros[$i]["CURP"];
            $Movil = $ArregloRegistros[$i]["Celular"];
            $IdCentroCosto = $ArregloRegistros[$i]["CentroCosto"];
            $Sucursal = $ArregloRegistros[$i]["Departamento"];
            $Division = $ArregloRegistros[$i]["Division"];
            $Email = $ArregloRegistros[$i]["Email"];

            $FNacimiento = $ArregloRegistros[$i]["Nacimiento"];
            $FNacimiento = str_replace("/", "-", $FNacimiento);
            //$FNacimiento = strtotime($FNacimiento);
            /*     var_dump($FNacimiento);
            if ($ContadorEmpleados == "30") {
            return false;
            } */
            //$FNacimiento = date("y-m-d", $FNacimiento);
            $AnioExplode = explode("-", $FNacimiento);

            if ($AnioExplode[0] < 70 && $AnioExplode[0] > 10 && $AnioExplode[0] != "00") {
                $FNacimiento = "19" . $FNacimiento;
            } else {
                $FNacimiento = date("Y-m-d", strtotime($FNacimiento));
            }

            $Nivel = $ArregloRegistros[$i]["Nivel"];
            $NoSeguro = $ArregloRegistros[$i]["NoSeguroS"];
            $Nombre = $ArregloRegistros[$i]["Nombre"];
            $NoEmpleado = $ArregloRegistros[$i]["NumeroEmpleado"];
            $Puesto = $ArregloRegistros[$i]["Puesto"];
            $RFC = $ArregloRegistros[$i]["RFC"];

            $q5 = "SELECT count(*) AS Existe FROM Empleados WHERE NoEmpleado = '$NoEmpleado'";
            $cons4 = $Conexiones5->Select($q5, array());
            $Existe = $cons4[0]["Existe"];
            if ($Existe == "1") {
                array_push($ArrayEmpleadosDuplicados, $Nombre);
            } else {


                $q2 = "SELECT IdDivision FROM Divisiones WHERE Division = '$Division';";
                $cons2 = $Conexiones2->Select($q2, array());
                $IdDivision = $cons2[0]["IdDivision"];

                $Conexiones6 = new Conexiones();
                $q6 = "SELECT count(IdCentroCosto) AS ExisteCentroCosto FROM CentroCostos
                WHERE IdCentroCosto = '$IdCentroCosto';";
                $cons6 = $Conexiones6->Select($q6, array());
                if ($cons6[0]["ExisteCentroCosto"] == 0) {
                    $Conexiones7 = new Conexiones();
                    $q7 = "INSERT INTO CentroCostos (IdCentroCosto,CentrodeCosto)
                    VALUES ('$IdCentroCosto','$IdCentroCosto');";
                    $Conexiones7->ExecuteQuery($q7, array());
                }
                $Conexiones8 = new Conexiones();
                $q8 = "SELECT count(*) ExisteSucursal FROM SucursalDepto WHERE Sucursal = '$Sucursal';";
                $cons8 = $Conexiones8->Select($q8, array());
                if ($cons8[0]["ExisteSucursal"] == 0) {
                    $Conexiones9 = new Conexiones();
                    $q9 = "SELECT IdSucursal from SucursalDepto
                    order by IdSucursal desc
                    limit 1;";
                    $cons9 = $Conexiones9->Select($q9, array());
                    $UltimaSucursal = $cons9[0]["IdSucursal"];
                    $UltimaSucursal = $UltimaSucursal + 1;
                    $Conexiones10 = new Conexiones();
                    $q10 = "INSERT INTO SucursalDepto (IdSucursal,Sucursal) VALUES ('$UltimaSucursal','$Sucursal');";
                    $Conexiones10->ExecuteQuery($q10, array());
                }
                $q = "SELECT IdSucursal FROM SucursalDepto WHERE Sucursal = '$Sucursal';";
                $cons = $Conexiones1->Select($q, array());
                $IdSucursal = $cons[0]["IdSucursal"];

                $Conexiones11 = new Conexiones();
                $q11 = "SELECT count(*) ExistePuesto FROM Puestos WHERE Puesto = '$Puesto';";
                $cons11 = $Conexiones11->Select($q11, array());
                if ($cons11[0]["ExistePuesto"] == 0) {
                    $Conexiones12 = new Conexiones();
                    $q12 = "SELECT IdPuesto from Puestos
                    order by IdPuesto desc
                    limit 1;";
                    $cons12 = $Conexiones12->Select($q12, array());
                    $UltimoPuesto = $cons12[0]["IdPuesto"];
                    $UltimoPuesto = $UltimoPuesto + 1;
                    $Conexiones13 = new Conexiones();
                    $q13 = "CALL spNuevoPuesto('$UltimoPuesto','$Puesto','$IdDivision');";
                    $Conexiones13->Procedure($q13, array());

                }
                $q3 = "SELECT IdPuesto FROM Puestos WHERE Puesto = '$Puesto';";
                $cons3 = $Conexiones3->Select($q3, array());
                $IdPuesto = $cons3[0]["IdPuesto"];

                $values .= "('$Antiguedad','$CURP','$Movil','$IdCentroCosto','$IdSucursal','$IdDivision','$Email',
                        '$FNacimiento','$Nivel','$NoSeguro','$Nombre','$NoEmpleado','$IdPuesto','$RFC','$PassEncrypt',now()),";
            }

        }
        if ($values == "") {
            $DatosAr = [
                "ValorRetorno" => "2",
                "NombresDuplicados" => $ArrayEmpleadosDuplicados
            ];
            array_push($ArrayRetorno, $DatosAr);
            return json_encode($ArrayRetorno);
        } else {
            $DatosAr = [
                "ValorRetorno" => "1",
                "NombresDuplicados" => $ArrayEmpleadosDuplicados
            ];
            $values = rtrim($values, ",");
            $Conexiones4 = new Conexiones();
            $q4 = "INSERT INTO Empleados (Antiguedad,CURP,Movil,IdCentroCosto,IdSucursal,IdDivision,Email,FNacimiento,Nivel,NoSeguro,Nombre,NoEmpleado,IdPuesto,RFC,Password,Registro)
               VALUES $values ";
            $Conexiones4->ExecuteQuery($q4, array());
            array_push($ArrayRetorno, $DatosAr);
            // return json_encode($ArrayRetorno);
            return json_encode($ArrayRetorno);
        }
    }

    function deshabilitarEmpleado($NoEmpleado)
    {
        try {
            $q = "UPDATE Empleados SET Status = 0
              WHERE NoEmpleado = '$NoEmpleado';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function habilitarEmpleado($NoEmpleado)
    {
        try {
            $q = "UPDATE Empleados SET Status = 1
              WHERE NoEmpleado = '$NoEmpleado';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function insertaDiasVacaciones($Datos)
    {
        $DatosRegisroArr = [];
        $ArregloRegistros = [];
        $Datos = explode('[', $Datos);
        $Datos = explode(']', $Datos[1]);
        $Datos = explode('},', $Datos[0]);
        $StringUpdate = "";
        for ($i = 0; $i < sizeof($Datos); $i++) {
            $RegistroDatos = $Datos[$i];
            $RegistroDatos = str_replace('[', '', $RegistroDatos);
            $RegistroDatos = str_replace('{', '', $RegistroDatos);
            $RegistroDatos = str_replace('}', '', $RegistroDatos);
            $RegistroDatos = str_replace('"', '', $RegistroDatos);
            $RegistroDatos = explode(",", $RegistroDatos);

            $ArrNoEmpleado = $RegistroDatos[0];
            $ArrNoEmpleado = explode(":", $ArrNoEmpleado);
            $ValorNoEmpleado = $ArrNoEmpleado[1];

            $ArrDiasV = $RegistroDatos[3];
            $ArrDiasV = explode(":", $ArrDiasV);
            $ValorDiasV = $ArrDiasV[1];

            $DatosRegisroArr = [
                "NoEmpleado" => $ValorNoEmpleado,
                "DiasV" => $ValorDiasV
            ];
            array_push($ArregloRegistros, $DatosRegisroArr);
        }
        for ($i = 0; $i < sizeof($ArregloRegistros); $i++) {
            $NoEmpleadoString = $ArregloRegistros[$i]["NoEmpleado"];
            $TotalDiasVacaciones = $ArregloRegistros[$i]["DiasV"];

            $StringUpdate .= "UPDATE Empleados SET DiasVacacionesRest = '$TotalDiasVacaciones'
                          WHERE NoEmpleado = '$NoEmpleadoString';";
        }
        $q = "$StringUpdate";
        $this->ExecuteQuery($q, array());
        return "1";
    }

    function getOrganigramaGeneral()
    {

    }

    function getJefesPosibles($NoEmpleado)
    {
      try {
        $q = "CALL spGetJefesPosiblesPuesto('$NoEmpleado')";
        error_log($q);
        $cons = $this->Procedure($q, array());
        return json_encode($cons);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getJefesPosiblesSolicitud()
    {
        try {
            $NoEmpleado = (SessionManager::get("NoEmpleado"));
            error_log("=== OBTENIENDO JEFES POSIBLES ===");
            error_log("NoEmpleado: " . ($NoEmpleado ?? 'NULL'));
            
            if (!$NoEmpleado) {
                error_log("ERROR: NoEmpleado es null");
                return json_encode([]);
            }
            
            $q = "CALL spGetJefesPosiblesPuesto('$NoEmpleado')";
            error_log("Query: " . $q);
            
            $result = $this->Procedure($q);
            error_log("Resultado: " . print_r($result, true));
            
            return json_encode($result);
        } catch (\Exception $e) {
            error_log("ERROR en getJefesPosiblesSolicitud: " . $e->getMessage());
            return json_encode([]);
        }
    }

    function asignarJefeEmpleado($EmpleadoPadre, $EmpleadoHijo)
    {
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
    }

    function asignarJefeEmpleadoSolicitud($EmpleadoPadre)
    {
        $EmpleadoHijo = (SessionManager::get("NoEmpleado"));
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
    }

    function getJefeAsignado($EmpleadoHijo)
    {
        $q = "SELECT EmpleadoPadre FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
        return json_encode($this->Select($q, array()));
    }

    function getJefeAsignadoSolicitud()
    {
        $EmpleadoHijo = (SessionManager::get("NoEmpleado"));
        $q = "SELECT EmpleadoPadre FROM RelacionEmpleados WHERE EmpleadoHijo = '$EmpleadoHijo';";
        return json_encode($this->Select($q, array()));
    }

    function getDetallesEmpleadoLogeado()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT E.Nombre,E.Email,E.Movil,P.Puesto,E.Imagen,$NoEmpleado NoEmpleado FROM Empleados AS E
                INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                WHERE E.NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
    }

    function getMsgSolicitudesVacacionesRecibidasJefe()
    {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT SV.idSolicitudesVacaciones,concat('El empleado ',E.Nombre, ' solicita sus vacaciones.') as Msg, concat(ComentariosSolicitud) as Motivo FROM SolicitudesVacaciones  AS SV
        INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
        WHERE SV.Status = 0 AND SV.EmpleadoPadre = '$NoEmpleado' AND SV.VistoMsjJefe = 0;";
        return json_encode($this->Select($q, array()));
    }

    function updateMsgSolicitudesVacacionesRecibidasJefe($idSolicitudesVacaciones)
    {
        $q = "UPDATE SolicitudesVacaciones SET VistoMsjJefe = 1
               WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
        $this->ExecuteQuery($q, array());
        return "1";
    }

    function getMsgSolicitudesVacacionesRecibidasFinal()
    {
        $ArrayRetorno = [];
        $DatosRegistro = [];
        $ArrayRegistros = [];
        $idSPuesto = (SessionManager::get("idSPuesto"));
        $q = "SELECT Valor AS PuestosAceptados FROM Configuracion WHERE idConfiguracion = 1;";
        $cons = $this->Select($q, array());
        $PuestosAceptados = explode(",", $cons[0]["PuestosAceptados"]);
        if (in_array($idSPuesto, $PuestosAceptados)) {
            $Conexiones2 = new Conexiones();
            $q2 = "SELECT SV.idSolicitudesVacaciones,concat('El empleado ',E.Nombre, ' solicita sus vacaciones.') as Msg,
                concat(ComentariosSolicitud) as Motivo, SV.EmpleadoPadre FROM SolicitudesVacaciones  AS SV
                INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado WHERE SV.Status = 1 AND SV.VistoMsjFinal = 0;";
            $cons2 = $Conexiones2->Select($q2, array());
            if (sizeof($cons2 ) > 0) {
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
        return json_encode($ArrayRetorno);
    }

    function updateMsgSolicitudesVacacionesRecibidasNomina($idSolicitudesVacaciones)
    {
        $q = "UPDATE SolicitudesVacaciones SET VistoMsjFinal = 1
                WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
        $this->ExecuteQuery($q, array());
        return "1";
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
        return json_encode($this->Select($q));
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
    }

    function getCantidadNotificaciones(){
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT SUM((SELECT coalesce(count(*),0) FROM LineaEticaMensajes AS LEM
        WHERE Revisado = 1 AND MensajeRevisado = 1 AND NoEmpleado = '$NoEmpleado') + (SELECT coalesce(count(*),0) FROM SolicitudesVacaciones  AS SV
        INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
        WHERE SV.Status = 0 AND SV.EmpleadoPadre = '$NoEmpleado' AND SV.VistoMsjJefe = 0)) as CantidadNotificaciones ;";
        $cons = $this->Select($q,array());
        $CantidadNotificaciones = $cons[0]["CantidadNotificaciones"];
        $Conexiones2 = new Conexiones();
        $idSPuesto = (SessionManager::get("idSPuesto"));
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
        $Conexiones4 = new Conexiones();
        $q4 = "SELECT  C.idCapacitacion,CD.NoEmpleado  AS ALLEmpleados FROM CapacitacionDetalle AS CD
                INNER JOIN Capacitacion AS C ON C.idCapacitacion = CD.id_capacitacion
                WHERE C.Status = 1;";
        $cons4 = $Conexiones4->Select($q4,array());
        if (sizeof($cons4) > 0) {
          for ($i=0; $i < sizeof($cons4) ; $i++) {
            $ALLEmpleados = explode(',',$cons4[$i]["ALLEmpleados"]);
            $idCapacitacion = $cons4[$i]["idCapacitacion"];
            if (in_array($NoEmpleado,$ALLEmpleados)) {
              $Conexiones5 = new Conexiones();
              $q5 = "SELECT COUNT(*) AS Existe FROM EstadoMensajesCapacitacion
                        WHERE NoEmpleado = '$NoEmpleado' AND idCapacitacion = '$idCapacitacion';";
              $cons5 = $Conexiones5->Select($q5,array());
              $Existe = $cons5[0]["Existe"];
              if ($Existe == "0") {
                $CantidadNotificaciones ++;
              }
            }
          }
        }
        $Conexiones6 = new Conexiones();
        $q6 = "SELECT PuestoRecibeLineaEtica FROM ConfiguracionPersonalizacion";
        $result6 = $Conexiones6->Select($q6,array());
        $valPuestos = $result6[0]["PuestoRecibeLineaEtica"];
        $ExpPuestos = explode(',',$valPuestos);
        if (in_array($idSPuesto,$ExpPuestos)) {
          $Conexiones7 = new Conexiones();
          $q7 = "SELECT COUNT(*) as Cantidad
                  FROM LineaEticaMensajes as le
                  inner join Empleados as em on em.NoEmpleado = le.NoEmpleado
                  inner join CatalogoLineaEtica as cl on  cl.idCatalogoLineaEtica = le.idCatalogoLineaEtica
                  WHERE le.Revisado = 0;";
          $resultCont7 = $Conexiones7->Select($q7,array());
          $CantidadMsg = $resultCont7[0]["Cantidad"];
          if ($CantidadMsg > 0) {
            $CantidadNotificaciones ++;
          }
        }
        return $CantidadNotificaciones;
    }

    function recuperarPassword($Email){
    if ($Email == "") {
        return "Por favor ingrese un correo electr?nico.";
    }
    $q = "SELECT coalesce(count(*),0) as Existe FROM Empleados WHERE Email = '$Email';";
    $cons = $this->Select($q,array());
    $Existe = $cons[0]["Existe"];
    if ($Existe < 1) {
        return "Correo electr?nico no encontrado.";
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
            require '../PHPMailer/src/Exception.php';
            require '../PHPMailer/src/SMTP.php';
            require '../PHPMailer/src/PHPMailer.php';

            $mail = new PHPMailer(true);

            try {
              $mail->isSendmail();
              //$mail->isSMTP();
              $mail->Host = '162.240.213.3';
              $mail->SMTPAuth = true;
              $mail->Username = 'interno@klynet.mx';
              $mail->Password = 'K1yn@22022';
              $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
              $mail->Port = 587;
              $mail->IsHTML(true);

              $mail->setFrom('interno@klynet.mx','Klyns');
              $mail->addAddress($Email, "Klyns");

              $mensajeSubject = "Klyns, Solicitud para recuperar contrase?a.";
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
                                                           <img style='width: 20%; display: block; margin: auto; border-radius:15px' src='https://klyns.resosistemas.mx/assets/images/logo-pip.png' alt=''>
                                                       </a>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td style='background-color:#ecf0f1; margin: 4% 10% 2%;   font-family: sans-serif;'>
                                                   <div style='text-align: center; margin-top: 2vh;'>
                                                       <h2 style='color: #B00000;margin: 0 4vh 0 4vh;'>$NombreEmp!</h2>
                                                       <p style='margin: 3vh 4vh 0 4vh; text-align: justify !important;'>Se solicit? un restablecimiento de contrase?a para el correo $Email, por favor haz clic en el siguiente bot?n para cambiar tu contrase?a.</p>
                                                   </div>
                                               </td>
                                           </tr>
                                           <tr style='background-color:#ecf0f1; margin: 4% 10% 2%; height: 15vh;'>
                                               <td >
                                               <div style='text-align: center;'>
                                                       <a class='button-15' style='text-align: center; color:white !important' href='https://klynet.mx/RecoveryPassword.php?No=$idRecoveryPass'>Cambiar Contrase?a</a>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style='background-color:#ecf0f1; margin: 2% 10% 2%; height: 10vh;'>
                                               <td>
                                                   <div style='text-align: center; padding:2vh'>
                                                       <span>La solicitud estar? disponible por <b>$TiempoLimiteSoli horas</b> a partir del env?o de la solicitud.</span>
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
         $mail->send();

         return "1";
            } catch (Exception $e) {
              error_log("Mensaje ".$mail->ErrorInfo);
            }

        } catch (\Exception $e) {
        }
    }
    return "1";
}

    function recoveryPassword($Password,$NoEmpleado)
    {
        $q = "UPDATE Empleados SET Password = '$Password' WHERE  NoEmpleado = '$NoEmpleado';";
        $this->Select($q,array());
        $Empleados = new Empleados();
        $Empleados->loginEmpleadoRecoveryPass($NoEmpleado,$Password);
        return "1";
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
        return json_encode($Conexiones2->Select($q2,array()));
    }



    function loginEmpleadoRecoveryPass($NoEmpleado, $Password)
    {
        $q = "SELECT NoEmpleado,Nivel,IdDivision,IdSucursal,Nombre,IdPuesto,IdCentroCosto FROM Empleados WHERE NoEmpleado = '$NoEmpleado' AND Password = '$Password';";
        $cons = $this->Select($q, array());
        if (sizeof($cons) > 0) {
          // Usar SessionManager en lugar de cookies
          SessionManager::login($cons[0]);
            return "1";
        } else {
            return "Numero de usuario y/o contrase?a incorrectos";
        }
    }

    function otrosDetallesEmpleadoPersonal ($NoEmpleado) {
      $q = "SELECT IdDivision,IdSucursal,IdPuesto FROM Empleados
              WHERE NoEmpleado = '$NoEmpleado';";
      return json_encode($this->Select($q,array()));
    }

    function updateMasDetallesPersonal ($IdDivision,$IdSucursal,$IdPuesto,$NoEmpleado) {
      try {
        $q = "UPDATE Empleados SET IdDivision = '$IdDivision', IdSucursal = '$IdSucursal', IdPuesto = '$IdPuesto'
                WHERE NoEmpleado = '$NoEmpleado';";
                error_log($q);
        $this->ExecuteQuery($q,array());
        return "1";
      } catch (\Exception $e) {
        error_log($e);
      }
    }

    function updateDetalleEmpleado($Nombre,$RFC,$CURP,$NoSeguro,$Email,$Movil,$Password,$NoEmpleado,$Nivel) {
        try {
          $q = "SELECT COUNT(*) as Igual FROM Empleados
                  WHERE NoEmpleado = '$NoEmpleado' AND Password = '$Password';";
          $cons = $this->Select($q,array());
          $Igual = $cons[0]["Igual"];
          $Conexiones2 = new Conexiones();
          if ($Igual == "1") {
            $q2 = "UPDATE Empleados SET Nombre = '$Nombre', RFC = '$RFC', CURP = '$CURP', NoSeguro = '$NoSeguro',
                    Email = '$Email', Movil = '$Movil', Nivel = '$Nivel'
                    WHERE NoEmpleado = '$NoEmpleado';";
          } else {
            $Password = base64_encode($Password);
            $q2 = "UPDATE Empleados SET Nombre = '$Nombre', RFC = '$RFC', CURP = '$CURP', NoSeguro = '$NoSeguro',
                    Email = '$Email', Movil = '$Movil' , Password = '$Password',  Nivel = '$Nivel'
                    WHERE NoEmpleado = '$NoEmpleado';";
          }
          $Conexiones2->ExecuteQuery($q2,array());
          return "1";
        } catch (\Exception $e) {
          error_log($e);
        }
      }
/*     function encriptaContrasenas()
    {
        $passsSinEn = "1234";
        $passsSinEn = base64_encode($passsSinEn);
        $q = "UPDATE Empleados SET Password = '$passsSinEn' WHERE NoEmpleado > 0";
        $this->ExecuteQuery($q,array());
    } */
    function getDatosPrincipalesEmpleado ($NoEmpleado) {
      $q = "SELECT Nombre, RFC, CURP, NoSeguro, Email, Movil, Password,Nivel
                FROM Empleados
                WHERE NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q,array()));
      }

      function getMisSolicitudesVacacionesEstadoNomina () {
        $NoEmpleado = (SessionManager::get("NoEmpleado"));
        $q = "SELECT SV.ComentariosSolicitud, SV.Status,SV.idSolicitudesVacaciones,E.Nombre,date_format(SV.Registro ,'%d-%m-%Y') as FechaSolicitud FROM SolicitudesVacaciones AS SV
                INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
                WHERE EmpleadoPadre = '$NoEmpleado' AND FechaJefeInmediatoAutoriza <> ''
                order by SV.Registro desc;";
        return json_encode($this->Select($q,array()));
      }

      function getMensajeCapacitacionGlobal () {
      $ArrayRetorno = [];
      $Datos = [];
      $NoEmpleado = (SessionManager::get("NoEmpleado"));
      $q = "SELECT  C.idCapacitacion,CD.NoEmpleado  AS ALLEmpleados,concat('Se te ha asignado la siguiente capacitaci?n:?',Descripcion) as Descripcion,concat('La capacitaci?n comenzar? el d?a ',date_format(FechaInicio,'%d-%m-%Y')) AS FechaInicio,(select TIMESTAMPDIFF(DAY,C.FechaInicio,NOW())) as DifDias FROM CapacitacionDetalle AS CD
              INNER JOIN Capacitacion AS C ON C.idCapacitacion = CD.id_capacitacion
              WHERE C.Status = 1;";
      $cons = $this->Select($q,array());
      if (sizeof($cons) > 0) {
        for ($i=0; $i < sizeof($cons) ; $i++) {
          $AllEmpleadosCap = explode(',',$cons[$i]["ALLEmpleados"]);
          $idCapacitacion = $cons[$i]["idCapacitacion"];
          $Descripcion = $cons[$i]["Descripcion"];
          $FechaInicio = $cons[$i]["FechaInicio"];
          if (in_array($NoEmpleado,$AllEmpleadosCap)) {
            $Conexiones2 = new Conexiones();
            $q2 = "SELECT COUNT(*) AS Existe FROM EstadoMensajesCapacitacion
                      WHERE NoEmpleado = '$NoEmpleado' AND idCapacitacion = '$idCapacitacion';";
            $cons2 = $Conexiones2->Select($q2,array());
            $ExisteVisto = $cons2[0]["Existe"];
            if ($ExisteVisto == "0") {
              $Datos = [
                "idCapacitacion" => $idCapacitacion,
                "Descripcion" => $Descripcion,
                "FechaInicio" => $FechaInicio
              ];
              array_push($ArrayRetorno,$Datos);
            } else{
            }
          } else {
          }
        }
      }
      return json_encode($ArrayRetorno);
    }

    function cerrarMensajeCapacitacion ($idCapacitacion) {
      $NoEmpleado = (SessionManager::get("NoEmpleado"));
      $q = "INSERT INTO EstadoMensajesCapacitacion (NoEmpleado,idCapacitacion,Registro)
	           VALUES ('$NoEmpleado','$idCapacitacion',NOW());";
      $this->ExecuteQuery($q,array());
      return "1";
    }

    function getHistoricoSolicitudesNomina ($FechaIni,$FechaFin) {
      if ($FechaIni == "" || $FechaFin == "") {
        return "Fecha no V?lida.";
      }else {
        $q = "SELECT E.Nombre,SV.ComentariosSolicitud,
                IF(SV.Status = 2,'Denegada por N?mina',if(SV.Status = 3,'Aceptada por N?mina','Pendiente de Revisi?n')) as Status,
                date_format(SV.Registro,'%d-%m-%Y') AS FechaSolicitud,SV.idSolicitudesVacaciones,SV.Status AS NumStatus
                FROM SolicitudesVacaciones AS SV
                INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
                WHERE SV.JefeInmediatoAutoriza <> '' AND date_format(SV.Registro,'%Y-%m-%d') between '$FechaIni' and '$FechaFin'
                group by SV.Registro DESC;";
        return json_encode($this->Select($q,array()));
      }
    }

    function regresarEstadoSolicitudJefe ($idSolicitudesVacaciones) {
      $q = "UPDATE SolicitudesVacaciones SET JefeInmediatoAutoriza = null ,FechaJefeInmediatoAutoriza = null,Status = 0, VistoMsjJefe = 0,VistoMsjFinal = 0
              WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
      $this->Select($q,array());
      return "1";
    }

    function getSolicitudesCanceladasJefe () {
      $NoEmpleado = (SessionManager::get("NoEmpleado"));
      $q = "SELECT E.Nombre,SV.ComentariosSolicitud,date_format(SV.Registro,'%d-%m-%Y') AS FechaSolicitud,SV.idSolicitudesVacaciones
              FROM SolicitudesVacaciones AS SV
              INNER JOIN Empleados AS E ON E.NoEmpleado = SV.NoEmpleado
              WHERE SV.Status = 2 AND UsuarioFinalAutoriza is NULL AND FechaAutorizadoFinal is NULL AND EmpleadoPadre = '$NoEmpleado';";
      return json_encode($this->Select($q,array()));
    }

    function regresarEstadoSolicitudNomina ($idSolicitudesVacaciones) {
      $q = "UPDATE SolicitudesVacaciones SET UsuarioFinalAutoriza = null ,FechaAutorizadoFinal = null,Status = 1, VistoMsjFinal = 0
              WHERE idSolicitudesVacaciones = '$idSolicitudesVacaciones';";
      $this->Select($q,array());
      return "1";
    }

    function getDatosEsquemaSaludPersonal () {
    $q = "SELECT E.Nombre,
          if(E.HabitusExteriorDescripcion is null,'Sin registro',IF(E.HabitusExteriorDescripcion = '','Sin registro',E.HabitusExteriorDescripcion)) as HabitusExterior,
          if(E.Peso = 0,'Sin registro',IF(E.Peso is null,'Sin registro',E.Peso)) as Peso,
          if(E.Complexion = '','Sin registro',IF(E.Complexion is null,'Sin registro',E.Complexion)) as Complexion,
          if(E.Talla = '','Sin registro',IF(E.Talla is null,'Sin registro',E.Talla)) as Talla,
          if(E.FrCardiaca = '','Sin registro',IF(E.FrCardiaca is null,'Sin registro',E.FrCardiaca)) as FrCardiaca,
          if(E.FrRespiratoria = '','Sin registro',IF(E.FrRespiratoria is null,'Sin registro',E.FrRespiratoria)) as FrRespiratoria,
          if(E.TensionArterial = '','Sin registro',IF(E.TensionArterial is null,'Sin registro',E.TensionArterial)) as TensionArterial,
          if(E.Temperatura = 0 ,'Sin registro',IF(E.Temperatura is null,'Sin registro',E.Temperatura)) as Temperatura,
          if(E.GrupoSanguineo = '' ,'Sin registro',IF(E.GrupoSanguineo is null,'Sin registro',E.GrupoSanguineo)) as GrupoSanguineo,
          if(E.FactorRh is null ,'Sin registro',IF(E.FactorRh = 1,'Positivo ( + )','Negativo ( - )')) as FactorRh,
          if(E.CartillaVacunacion = 0 ,'Sin Cartilla de vacunaci?n','S? cuenta con cartilla de vacunaci?n') as CartillaVacunacion,
          if(E.EsquemaCompleto = 0 ,'No cuenta con Esquema Completo','Cuenta con Esquema Completo') as EsquemaCompleto,
          if(E.OtrosComentariosSalud = '' ,'Sin registro',IF(E.OtrosComentariosSalud is null,'Sin registro',E.OtrosComentariosSalud)) as OtrosComentariosSalud
          FROM Empleados AS E
          WHERE E.Status = 1
          order by E.Nombre;";
    return json_encode($this->Select($q,array()));
  }

  function loadGblDataEmployee(){
    try {
      $NoEmpleado = (SessionManager::get("NoEmpleado"));
      $q = "SELECT Nombre AS NameEmployee, IF(Email IS NULL OR Email = '','Sin registros',Email) as EmailEmployee,
              IF(Imagen IS NULL OR Imagen = '','assets/Klyns.png',CONCAT('Archivos/ImgEmpleados/',NoEmpleado,'/',Imagen)) AS ImgEmployee
            FROM Empleados
            WHERE NoEmpleado = '$NoEmpleado';";
      $resultado = $this->Select($q,array());
      if (sizeof($resultado) > 0) {
        $arrRetorno = [
          "Siguiente" => true,
          "Resultado" => true,
          "Datos" => $resultado
        ];
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Ha ocurrido un error al obtener los datos del empleado conectado, intente iniciar sesi?n nuevamente para poder continuar."
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function getPrincipalDetailEvaluated($employee){
    try {
      $q = "SELECT E.Nombre, P.Puesto, SP.Sucursal, E.NoEmpleado,
            IF(E.Imagen IS NULL OR E.Imagen = '','assets/Klyns.png',CONCAT('Archivos/ImgEmpleados/',E.NoEmpleado,'/',E.Imagen)) AS ImgEmpleado
            FROM Empleados AS E
            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
            INNER JOIN SucursalDepto AS SP ON SP.IdSucursal = E.IdPuesto
            WHERE TO_BASE64(E.NoEmpleado) = '$employee';";
      $resultado =  $this->Select($q,array());
      if (sizeof($resultado) > 0) {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => true,
          "Data" => $resultado
         ];
      } else {
        $arrRetorno = [
          "Resultado" => true,
          "Siguiente" => false,
          "ConMsg" => true,
          "Msg" => "Ha ocurrido un error al obtener los datos del empleado seleccionado."
        ];
      }
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function getPosiblesEvaluadores($IdSucursal,$IdPuesto,$evaluado,$evaluacion){
    try {
      $q = "SELECT TO_BASE64(NoEmpleado) NoEmpleado, CONCAT(NoEmpleado,' - ',Nombre) AS Empleado
            FROM Empleados
            WHERE TO_BASE64(IdSucursal) = '$IdSucursal' AND TO_BASE64(IdPuesto) = '$IdPuesto' AND Status = 1
            AND NoEmpleado NOT IN (SELECT NoEmpleadoEvalua FROM EvaluacionDetalle
                                    WHERE TO_BASE64(NoEmpleadoEvaluado) = '$evaluado' AND TO_BASE64(idEvaluaciones) = '$evaluacion');";
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

  function getMySubordinatesPerEvaluation(){
    try {
      $NoEmpleado = (SessionManager::get("NoEmpleado"));
      $q = "SELECT E.NoEmpleado, E.Nombre, 1 AS TipoSubordinado, SD.Sucursal, P.Puesto
            FROM Empleados AS E
            INNER JOIN RelacionEmpleados AS RE ON RE.EmpleadoHijo = E.NoEmpleado
            INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
            INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
            WHERE RE.EmpleadoPadre = '$NoEmpleado' AND E.Status = 1
            -- UNION
            -- SELECT E.NoEmpleado, E.Nombre, 2 AS TipoSubordinado, SD.Sucursal, P.Puesto
            -- FROM Empleados AS E
            -- INNER JOIN EvaluacionDetalle AS ED ON ED.NoEmpleadoEvaluado = E.NoEmpleado
            -- INNER JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
            -- INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
            -- WHERE ED.NoEmpleadoEvalua = '$NoEmpleado' AND E.Status = 1 AND ED.NoEmpleadoEvaluado <> '$NoEmpleado'
            GROUP BY E.NoEmpleado;";
      $resultado = $this->Select($q,array());
      $arrReturn = [
        "Resultado" => true,
        "Siguiente" => true,
        "Data" => $resultado
      ];
      return json_encode($arrReturn);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function getAllActiveEmployees(){
    try {
      $q = "SELECT E.NoEmpleado, TO_BASE64(E.IdSucursal) AS IdSucursal,
            CONCAT(E.Nombre,' - ',SD.Sucursal) AS Descripcion
            FROM Empleados AS E
            INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
            WHERE E.Status = 1;";
      $res = $this->Select($q);
      $arrReturn = [
        "Resultado" => true,
        "Siguiente" => true,
        "Data" => $res
      ];
      return json_encode($arrReturn);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function visitIndexEmployee(){
    try {
      $NoEmpleado = (SessionManager::get("NoEmpleado"));
      $q = "INSERT INTO BitacoraVisitasIndex(NoEmpleado) VALUES (?);";
      $this->ExecuteQueryWithParam($q, [$NoEmpleado]);
      return "1";
    } catch (\Exception $e) {
      return $e;
    }
  }
}
?>
