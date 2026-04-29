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

class Organigramas extends Conexiones
{
    function addOrganigrama($nTitulo)
    {
        $ArrRetorno = [];
        $Datos = [];
        try {
            error_log("=== CREANDO ORGANIGRAMA ===");
            error_log("Titulo: " . $nTitulo);
            
            $q = "CALL spNewOrganigrama('$nTitulo')";
            error_log("Query: " . $q);
            
            $respuesta = $this->Procedure($q);
            error_log("Respuesta SP: " . print_r($respuesta, true));
            
            if (!$respuesta || !isset($respuesta[0]["lastIdOrg"])) {
                error_log("ERROR: No se obtuvo lastIdOrg");
                return "0";
            }
            
            $lastIdOrg = $respuesta[0]["lastIdOrg"];
            error_log("lastIdOrg: " . $lastIdOrg);
            
            $Organigramab24 = base64_encode($lastIdOrg);
            $Datos = [
                "Organigrama" => $Organigramab24,
                "Retorno" => "1"
            ];
            array_push($ArrRetorno, $Datos);
            return json_encode($ArrRetorno);
        } catch (\Exception $e) {
            error_log("ERROR en addOrganigrama: " . $e->getMessage());
            return "0";
        }
    }

    function getPuestosOrg()
    {
        $q = "SELECT IdPuesto,Puesto FROM Puestos;";
        return json_encode($this->Select($q, array()));
    }

    function getDivicionOrg()
    {
        $q = "SELECT IdDivision,Division FROM Divisiones;";
        return json_encode($this->Select($q, array()));
    }

    function getSucursalDeptoOrg()
    {
        $q = "SELECT IdSucursal,Sucursal FROM SucursalDepto;";
        return json_encode($this->Select($q, array()));
    }

    function getEmpleadosOrg($IdDivision, $IdSucursal, $IdPuesto, $Nivel, $Organigrama)
    {
        $Organigrama = base64_decode($Organigrama);
        $contenidoWhere = "";
        if ($IdDivision == "" && $IdSucursal == "" && $IdPuesto == "" && $Nivel == "") {
            $contenidoWhere = "";
        } elseif ($IdDivision == "" && $IdSucursal == "" && $IdPuesto == "" && $Nivel != "") {
            $contenidoWhere = "AND Nivel = '$Nivel'";
        } elseif ($IdDivision == "" && $IdSucursal == "" && $IdPuesto != "" && $Nivel == "") {
            $contenidoWhere = "AND IdPuesto = '$IdPuesto'";
        } elseif ($IdDivision == "" && $IdSucursal == "" && $IdPuesto != "" && $Nivel != "") {
            $contenidoWhere = "AND IdPuesto = '$IdPuesto' AND Nivel = '$Nivel'";
        } elseif ($IdDivision == "" && $IdSucursal != "" && $IdPuesto == "" && $Nivel == "") {
            $contenidoWhere = "AND IdSucursal = '$IdSucursal'";
        } elseif ($IdDivision == "" && $IdSucursal != "" && $IdPuesto == "" && $Nivel != "") {
            $contenidoWhere = "AND IdSucursal = '$IdSucursal' AND Nivel = '$Nivel'";
        } elseif ($IdDivision == "" && $IdSucursal != "" && $IdPuesto != "" && $Nivel == "") {
            $contenidoWhere = "AND IdSucursal = '$IdSucursal' AND IdPuesto = '$IdPuesto'";
        } elseif ($IdDivision == "" && $IdSucursal != "" && $IdPuesto != "" && $Nivel != "") {
            $contenidoWhere = "AND IdSucursal = '$IdSucursal' AND IdPuesto = '$IdPuesto' AND Nivel = '$Nivel'";
        } elseif ($IdDivision != "" && $IdSucursal == "" && $IdPuesto == "" && $Nivel == "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision'";
        } elseif ($IdDivision != "" && $IdSucursal == "" && $IdPuesto == "" && $Nivel != "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND Nivel = '$Nivel'";
        } elseif ($IdDivision != "" && $IdSucursal == "" && $IdPuesto != "" && $Nivel == "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND IdPuesto = '$IdPuesto'";
        } elseif ($IdDivision != "" && $IdSucursal == "" && $IdPuesto != "" && $Nivel != "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND IdPuesto = '$IdPuesto' AND Nivel = '$Nivel'";
        } elseif ($IdDivision != "" && $IdSucursal != "" && $IdPuesto == "" && $Nivel == "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND IdSucursal = '$IdSucursal'";
        } elseif ($IdDivision != "" && $IdSucursal != "" && $IdPuesto == "" && $Nivel != "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND IdSucursal = '$IdSucursal' AND Nivel = '$Nivel'";
        } elseif ($IdDivision != "" && $IdSucursal != "" && $IdPuesto != "" && $Nivel == "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND IdSucursal = '$IdSucursal' AND IdPuesto = '$IdPuesto'";
        } elseif ($IdDivision != "" && $IdSucursal != "" && $IdPuesto != "" && $Nivel != "") {
            $contenidoWhere = "AND IdDivision = '$IdDivision' AND IdSucursal = '$IdSucursal' AND IdPuesto = '$IdPuesto' AND Nivel = '$Nivel'";
        }
        $q = "SELECT NoEmpleado,Nombre from Empleados WHERE Status = 1 $contenidoWhere AND NoEmpleado NOT IN (SELECT NoEmpleadoHijo FROM DetalleOrganigrama
        WHERE idOrganigramas = '$Organigrama')";
        return json_encode($this->Select($q, array()));
    }

    function addEmpleadoOrganigrama($idOrganigramas, $idDetalleOrganigramaPadre, $NoEmpleadoHijo, $Tipo, $Otros, $Nivel = 0)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $TipoElemento = "";
        if ($Tipo == "") {
            return "Ingrese un tipo de empleado";
        } elseif ($Tipo == "1") {
            if ($NoEmpleadoHijo == "") {
                return "Seleccione un empleado";
            }
            $TipoElemento = "PRINCIPAL";
            $idDetalleOrganigramaPadre = "0";
            $Otros = "";
        } elseif ($Tipo == "2") {
            $Otros = "";
            $TipoElemento = "EMPLEADO";
            if ($idDetalleOrganigramaPadre == "" || $NoEmpleadoHijo == "") {
                return "Ingrese los datos necesarios";
            }
        } elseif ($Tipo == "3") {
            $TipoElemento = "OTROS";
            if ($Otros == "") {
                return "Ingrese una descripción";
            }
            if ($idDetalleOrganigramaPadre == "") {
                return "Seleccione a uno de los jefes disponibles";
            }
        }
        $q = "SELECT count(*) AS ContadorPrincipal FROM DetalleOrganigrama
                 WHERE idOrganigramas = '$idOrganigramas' AND idDetalleOrganigramaPadre = 0;";
        $cons = $this->Select($q, array());
        $ContadorPrincipal = $cons[0]["ContadorPrincipal"];

        if ($ContadorPrincipal < 1 && ($Tipo == "2" || $Tipo == "3")) {
            return "Necesitas al menos un jefe principal para agregar este tipo de elemento al organigrama.";
        } else {
            $Conexiones3 = new Conexiones();
            $q3 = "INSERT INTO DetalleOrganigrama (idOrganigramas,idDetalleOrganigramaPadre,NoEmpleadoHijo,Registro,Otros,Tipo)
            VALUES ('$idOrganigramas','$idDetalleOrganigramaPadre','$NoEmpleadoHijo',NOW(),'$Otros','$TipoElemento');";
            $Conexiones3->ExecuteQuery($q3, array());
        }
        return "1";
    }

    function getDetalleOrganigrama($idOrganigramas)
    {
      $idOrganigramas = base64_decode($idOrganigramas);
        $q = "SELECT IF(DO.Tipo = 'OTROS',DO.Otros,E.Nombre) AS Nombre,
        IF(DO.Tipo = 'OTROS','',P.Puesto) AS Puesto,
        DO.idDetalleOrganigramaPadre,DO.idDetalleOrganigrama,DO.Otros,
        coalesce(DO.Nivel,0) as Nivel,
        if(E.Imagen is null or E.Imagen = '','assets/images/logo-pip.png',
          concat('https://klynet.mx/Archivos/ImgEmpleados/',E.NoEmpleado,'/',E.Imagen)) as Imagen,
        DO.NoEmpleadoHijo,DO.Tipo,
              coalesce((SELECT DOO.Nivel FROM DetalleOrganigrama AS DOO
                WHERE DOO.idDetalleOrganigrama = DO.idDetalleOrganigramaPadre),0) AS NivelPadre,
                DO.CoordenadaY,DO.CoordenadaX,DO.Ancho, DO.Altura
                FROM DetalleOrganigrama AS DO
              left JOIN Empleados AS E ON E.NoEmpleado = DO.NoEmpleadoHijo
              left JOIN Puestos AS P ON P.IdPuesto = E.IdPuesto
                WHERE idOrganigramas = '$idOrganigramas';";
        return json_encode($this->Select($q, array()));
    }

    function getEmpleadosPadreOrganigrama($idOrganigramas)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $q = "SELECT DO.idDetalleOrganigrama,if(NoEmpleadoHijo <> 0,E.Nombre,DO.Otros) as Nombre FROM DetalleOrganigrama AS DO
        left JOIN Empleados AS E ON E.NoEmpleado = DO.NoEmpleadoHijo
        WHERE DO.idOrganigramas = '$idOrganigramas'";
        return json_encode($this->Select($q, array()));
    }

    function getEmpleadosSelectedPadreOrganigrama($idOrganigramas,$idDetalleOrganigrama)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $q = "SELECT DO.idDetalleOrganigrama,if(NoEmpleadoHijo <> 0,E.Nombre,DO.Otros) as Nombre FROM DetalleOrganigrama AS DO
                LEFT JOIN Empleados AS E ON E.NoEmpleado = DO.NoEmpleadoHijo
                WHERE DO.idOrganigramas = '$idOrganigramas' AND idDetalleOrganigrama <> '$idDetalleOrganigrama';";
        return json_encode($this->Select($q, array()));
    }

    function deleteElementoOrganigrama($idDetalleOrganigrama)
    {
        $q = "SELECT idDetalleOrganigrama FROM DetalleOrganigrama WHERE idDetalleOrganigramaPadre = '$idDetalleOrganigrama';";
        $cons = $this->Select($q, array());
        if (sizeof($cons) > 0) {
            return "Primero debes eliminar a tus colaboradores para eliminar el elemento seleccionado.";
        } else {
            $Conexiones2 = new Conexiones();
            $q2 = "DELETE FROM DetalleOrganigrama WHERE idDetalleOrganigrama = '$idDetalleOrganigrama'
            OR idDetalleOrganigramaPadre = '$idDetalleOrganigrama';";
            $Conexiones2->ExecuteQuery($q2, array());
            return "1";
        }
    }

    function EditarElementoOrganigrama($idDetalleOrganigramaPadre, $NoEmpleadoHijo, $Otros, $idDetalleOrganigrama, $Tipo, $idOrganigramas, $Nivel = 0)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $TipoElemento = "";
        $q = "SELECT count(*) AS ContadorPrincipal FROM DetalleOrganigrama
                 WHERE idOrganigramas = '$idOrganigramas' AND idDetalleOrganigramaPadre = 0;";
        $cons = $this->Select($q, array());
        $ContadorPrincipal = $cons[0]["ContadorPrincipal"];
        if ($Tipo == "2") {
            $Conexiones2 = new Conexiones();
            $q2 = "SELECT NoEmpleadoHijo AS EmpleadoPadreIngresado,Tipo as TipoEmpleadoPadreSeleccionado FROM DetalleOrganigrama WHERE idDetalleOrganigrama = '$idDetalleOrganigramaPadre';";
            $cons2 = $Conexiones2->Select($q2, array());
            $EmpleadoPadreIngresado = $cons2[0]["EmpleadoPadreIngresado"];
            $TipoEmpleadoPadreSeleccionado = $cons2[0]["TipoEmpleadoPadreSeleccionado"];

            $Conexiones3 = new Conexiones();
            $q3 = "SELECT Tipo as TipoRegistroActual FROM DetalleOrganigrama WHERE idDetalleOrganigrama = '$idDetalleOrganigrama';";
            $cons3 = $Conexiones3->Select($q, array());
            $TipoRegistroActual = $cons3[0]["TipoRegistroActual"];
            if ($EmpleadoPadreIngresado == $NoEmpleadoHijo) {
                return "No es posible registrar el empleado con el Jefe seleccionado al organigrama.";
            }
        }
        if ($Tipo == "") {
            return "Ingrese un tipo de empleado";
        } else if ($Tipo == "1") {
            $idDetalleOrganigramaPadre = "0";
            $Otros = "";
            $TipoElemento = "PRINCIPAL";
            if ($NoEmpleadoHijo == "") {
                return "Seleccione un empleado";
            }
        } else if ($Tipo == "2") {
            $Otros = "";
            $TipoElemento = "EMPLEADO";
            if ($ContadorPrincipal < 2 && $TipoRegistroActual === "PRINCIPAL") {
                return "Necesitas al menos un empleado principal para actualizar este elemento.";
            } else {
                if ($idDetalleOrganigramaPadre == "" || $NoEmpleadoHijo == "") {
                    return "Ingrese los datos necesarios";
                }
            }
        } elseif ($Tipo == "3") {
            $NoEmpleadoHijo = "0";
            $TipoElemento = "OTROS";
            if ($ContadorPrincipal < 2 && $TipoRegistroActual === "PRINCIPAL") {
                return "Necesitas al menos un empleado principal para actualizar este elemento.";
            } else {
                if ($Otros == "") {
                    return "Ingrese una descripción.";
                } elseif ($idDetalleOrganigramaPadre == "") {
                    return "Seleccione a uno de los jefes disponibles";
                }
            }
        }
        $Conexiones4 = new Conexiones();
        $q4 = "UPDATE DetalleOrganigrama SET idDetalleOrganigramaPadre = '$idDetalleOrganigramaPadre',
                NoEmpleadoHijo = '$NoEmpleadoHijo',
                Registro = now(), Otros = '$Otros' ,Tipo = '$TipoElemento'
                WHERE idDetalleOrganigrama = '$idDetalleOrganigrama';";
        $Conexiones4->ExecuteQuery($q4, array());

        return "1";
    }

    function getDetalleElementoPorEditar($registro)
    {
        $ArrayRetorno = [];
        $Datos = [];
        $q = "SELECT idDetalleOrganigramaPadre,NoEmpleadoHijo,Otros,Tipo,Nivel FROM DetalleOrganigrama
              WHERE idDetalleOrganigrama = '$registro';";
        $cons = $this->Select($q, array());
        $idDetalleOrganigramaPadre = $cons[0]["idDetalleOrganigramaPadre"];

        $Conexiones2 = new Conexiones();
        $q2 = "SELECT NoEmpleadoHijo FROM DetalleOrganigrama WHERE idDetalleOrganigrama = '$idDetalleOrganigramaPadre';";
        $cons2 = $Conexiones2->Select($q2, array());

        $Datos = [
            "idDetalleOrganigramaPadre" => $idDetalleOrganigramaPadre,
            "NoEmpleadoHijo" => $cons[0]["NoEmpleadoHijo"],
            "Otros" => $cons[0]["Otros"],
            "EmpleadoJefe" => $cons2[0]["NoEmpleadoHijo"],
            "Tipo" => $cons[0]["Tipo"],
            "NivelSelected" => $cons[0]["Nivel"]
        ];
        array_push($ArrayRetorno, $Datos);
        return json_encode($ArrayRetorno);
    }

    function getOrganigramasControl()
    {
        $q = "SELECT idOrganigramas,Titulo,Status FROM Organigramas";
        return json_encode($this->Select($q, array()));
    }

    function updateStatusOrganigrama($idOrganigramas)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $q = "SELECT Status FROM Organigramas WHERE idOrganigramas = '$idOrganigramas';";
        $cons = $this->Select($q, array());
        $LastStatus = $cons[0]["Status"];
        if ($LastStatus == 0) {
            $NewStatus = 1;
        } else {
            $NewStatus = 0;
        }
        $Conexiones2 = new Conexiones();
        $q2 = "UPDATE Organigramas SET Status = '$NewStatus' where idOrganigramas = '$idOrganigramas';";
        $Conexiones2->ExecuteQuery($q2, array());
        $Conexiones3 = new Conexiones();
        $q3 = "UPDATE DetalleOrganigrama SET Status = '$NewStatus' where idOrganigramas = '$idOrganigramas';";
        $Conexiones3->ExecuteQuery($q3,array());
        return "1";
    }

    function updateOrganigramaTitulo($idOrganigramas, $Titulo)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $Titulo = trim($Titulo);
        if ($Titulo === "") {
            return "Titulo requerido";
        }
        $Conexiones2 = new Conexiones();
        $q2 = "UPDATE Organigramas SET Titulo = '$Titulo' WHERE idOrganigramas = '$idOrganigramas';";
        $Conexiones2->ExecuteQuery($q2, array());
        return "1";
    }

    function deleteOrganigrama($idOrganigramas)
    {
        $idOrganigramas = base64_decode($idOrganigramas);
        $Conexiones2 = new Conexiones();
        $q2 = "DELETE FROM DetalleOrganigrama WHERE idOrganigramas = '$idOrganigramas';";
        $Conexiones2->ExecuteQuery($q2, array());
        $Conexiones3 = new Conexiones();
        $q3 = "DELETE FROM Organigramas WHERE idOrganigramas = '$idOrganigramas';";
        $Conexiones3->ExecuteQuery($q3, array());
        return "1";
    }

    function getDatosOrganigramas(){
        $ArrayRetorno = [];
        $Datos = [];
        $q = "SELECT O.idOrganigramas,O.Titulo
                FROM Organigramas as O
                WHERE O.Status = 1;";
        $cons = $this->Select($q,array());
        $Conexiones2 = new Conexiones();
        $q2 = "SELECT DO.idDetalleOrganigrama,DO.idOrganigramas AS EsDe, DO.idDetalleOrganigramaPadre,TO_BASE64(DO.NoEmpleadoHijo) AS EMPH,DO.Tipo,
        IF(DO.Tipo = 'OTROS',DO.Otros,E.Nombre) AS Nombre,
        IF(DO.Tipo = 'OTROS','',P.Puesto) AS Puesto,
        IF(DO.Tipo = 'OTROS','',IF(E.Email IS NULL OR E.Email = '','Sin Email',E.Email)) AS Email,
        DO.Otros,DO.Nivel,
        if(E.Imagen is null or E.Imagen = '','assets/images/logo-pip.png',
          concat('https://klynet.mx/Archivos/ImgEmpleados/',E.NoEmpleado,'/',E.Imagen)) as Imagen,
          DO.CoordenadaY,DO.CoordenadaX,DO.Ancho, DO.Altura,
                coalesce((SELECT DOO.Nivel FROM DetalleOrganigrama AS DOO
                  WHERE DOO.idDetalleOrganigrama = DO.idDetalleOrganigramaPadre),0) AS NivelPadre
                FROM DetalleOrganigrama AS DO
                left JOIN Empleados as E ON E.NoEmpleado = DO.NoEmpleadoHijo
                left JOIN Puestos as P ON P.IdPuesto = E.IdPuesto
                where DO.Status = 1;";
        $cons2 = $Conexiones2->Select($q2,array());
        $Datos = [
            "Organigrama" => $cons,
            "RegistrosOrganigrama" => $cons2
        ];
        array_push($ArrayRetorno,$Datos);
        return json_encode($ArrayRetorno);
    }

    function changePositionNodeOrganigrama($CoordenadaY,$CoordenadaX,$idDetalleOrganigrama){
    try {
      $idDetalleOrganigrama = base64_decode($idDetalleOrganigrama);
      $q = "UPDATE DetalleOrganigrama SET CoordenadaY = '$CoordenadaY', CoordenadaX = '$CoordenadaX'
            WHERE idDetalleOrganigrama = '$idDetalleOrganigrama';";
      $this->ExecuteQuery($q,array());
      $arrRetorno = [
        "Resultado" => true,
        "Siguiente" => true
      ];
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }

  function sizeChangeNodeOrganigrama($CoordenadaY,$CoordenadaX,$Ancho,$Altura,$idDetalleOrganigrama){
    try {
      $idDetalleOrganigrama = base64_decode($idDetalleOrganigrama);
      $q = "UPDATE DetalleOrganigrama SET CoordenadaY = '$CoordenadaY', CoordenadaX = '$CoordenadaX',Ancho = '$Ancho', Altura = '$Altura'
            WHERE idDetalleOrganigrama = '$idDetalleOrganigrama';";
      $this->ExecuteQuery($q,array());
      $arrRetorno = [
        "Resultado" => true,
        "Siguiente" => true
      ];
      return json_encode($arrRetorno);
    } catch (\Exception $e) {
      return $e;
    }
  }
}

?>
