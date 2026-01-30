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
}

class LineaEtica extends Conexiones
{
    function getOpcionesLineaEtica()
    {
        $q = "SELECT idCatalogoLineaEtica,Descripcion FROM CatalogoLineaEtica
            where Status = 1
            order by Descripcion;";
        return json_encode($this->Select($q, array()));
    }
    function getOpcionesLineaEticaConfig()
    {
        $q = "SELECT idCatalogoLineaEtica,Descripcion,Status FROM CatalogoLineaEtica
            order by Descripcion;";
        return json_encode($this->Select($q, array()));
    }

    function addMensajeLineaEtica($idCatalogoLineaEtica, $Mensaje, $idDivision, $sucursal)
    {
        try {
            $NoEmpleado = SessionManager::get("NoEmpleado");
            $q = "INSERT INTO LineaEticaMensajes (idCatalogoLineaEtica,NoEmpleado,Registro,Mensaje,id_division, IdSucursal)
              VALUES ('$idCatalogoLineaEtica','$NoEmpleado',now(),'$Mensaje','$idDivision', '$sucursal');";
            $this->ExecuteQuery($q, array());
            $InstSendMsg = new LineaEtica();
            $InstSendMsg->enviaMsgLineaEtica();
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function enviaMsgLineaEtica(){
      try {
        $appId = 'e18c94b0-e0cb-4a0a-9335-2c43cb924b28'; // reemplazar con su App ID
        $restApiKey = 'ZWI3MTNhNzUtNWI5MC00YzU5LTlkYzUtMmI3NzZjY2MzNmQw';

        $q = "SELECT PuestoRecibeLineaEtica FROM ConfiguracionPersonalizacion";
        $result = $this->Select($q,array());
        $valPuestos = $result[0]["PuestoRecibeLineaEtica"];
        $ExpPuestos = explode(',',$valPuestos);
        $arrEmpleadosSelectos = [];
        $valWhere = "";
        foreach ($ExpPuestos as $i) {
          $Puesto = $i;
          $valWhere = $valWhere." IdPuesto = '$Puesto' OR";
        }
        $FormatWhere = substr($valWhere,0,strlen($valWhere) - 2);
        $Con2 = new Conexiones();
        $q2 = "SELECT tokenOS FROM Empleados WHERE Status = 1 AND (tokenOS IS NOT NULL AND tokenOS <> '')AND ($FormatWhere)";
        $arrEmpleados = $Con2->Select($q2,array());
        foreach ($arrEmpleados as $e) {
          $valToken = $e["tokenOS"];
          $msg = "Un empleado ha enviado un nuevo mensaje de línea de ética.";
          $data = array(
              'app_id' => "e18c94b0-e0cb-4a0a-9335-2c43cb924b28",
              // 'included_segments' => $ArrPersonas,
              'include_player_ids' => array($valToken),
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
        }
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getMensajesLineaEtica(){
        try {
          $q = "SELECT E.NoEmpleado,E.Nombre,CLE.Descripcion,LEM.Registro,LEM.Mensaje,LEM.idLineaEticaMensajes, D.Division,
                LEM.Revisado,
                SD.Sucursal
                FROM LineaEticaMensajes AS LEM
                INNER JOIN Empleados AS E ON E.NoEmpleado = LEM.NoEmpleado
                INNER JOIN CatalogoLineaEtica AS CLE ON CLE.idCatalogoLineaEtica = LEM.idCatalogoLineaEtica
                INNER JOIN Divisiones as D ON D.IdDivision = LEM.id_division
                LEFT JOIN SucursalDepto AS SD ON SD.IdSucursal = LEM.IdSucursal
                ORDER BY LEM.Registro DESC;";
          $resultado = $this->Select($q,array());
          if (sizeof($resultado) > 0) {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => true,
              "Datos" => $resultado
            ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false
            ];
          }
          return json_encode($arrRetorno);
        } catch (\Exception $e) {
          return $e;
        }
    }

    function vistoMensajeEtica($idLineaEticaMensajes)
    {
        try {
            $q = "UPDATE LineaEticaMensajes SET Revisado = 1 WHERE idLineaEticaMensajes = '$idLineaEticaMensajes';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }
    function getMensajeVistoLineaEtica()
    {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT Mensaje,idLineaEticaMensajes FROM LineaEticaMensajes AS LEM
            WHERE Revisado = 1 AND MensajeRevisado = 1 AND NoEmpleado = '$NoEmpleado';";
        return json_encode($this->Select($q, array()));
    }

    function VistoMensajeLineaEtica($idLineaEticaMensajes)
    {
        try {
            $q = "UPDATE LineaEticaMensajes SET MensajeRevisado = 0
              WHERE idLineaEticaMensajes = '$idLineaEticaMensajes';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return "0";
        }
    }

    function addCatalogoLiniaEtica ($Descripcion) {
        $q = "INSERT INTO CatalogoLineaEtica (Descripcion) VALUES ('$Descripcion');";
        $this->ExecuteQuery($q,array());
        return "1";
    }

    function updateCatalogoStatus ($idCatalogoLineaEtica) {
        $idCatalogoLineaEtica = base64_decode($idCatalogoLineaEtica);
        $q = "SELECT Status FROM CatalogoLineaEtica WHERE idCatalogoLineaEtica = '$idCatalogoLineaEtica';";
        $cons = $this->Select($q,array());
        if ($cons[0]["Status"] == 0) {
            $Status = 1;
        }else {
            $Status = 0;
        }
        $Conexiones2 = new Conexiones();
        $q2 = "UPDATE CatalogoLineaEtica SET Status = '$Status' WHERE idCatalogoLineaEtica = '$idCatalogoLineaEtica';";
        $Conexiones2->ExecuteQuery($q2,array());
        return "1";
    }

    function getNotifiLineaEticaPendientes(){
      try {
        $NoEmpleado = SessionManager::get("NoEmpleado");
        $q = "SELECT PuestoRecibeLineaEtica FROM ConfiguracionPersonalizacion";
        $result = $this->Select($q,array());
        $valPuestos = $result[0]["PuestoRecibeLineaEtica"];
        $ExpPuestos = explode(',',$valPuestos);

        $Con2 = new Conexiones();
        $q2 = "SELECT IdPuesto FROM Empleados WHERE NoEmpleado = '$NoEmpleado'";
        $resultPuesto = $Con2->Select($q2,array());
        $PuestoEmp = $resultPuesto[0]["IdPuesto"];
        if (in_array($PuestoEmp,$ExpPuestos)) {
          $Con3 = new Conexiones();
          $q3 = "SELECT COUNT(*) as Cantidad
                  FROM LineaEticaMensajes as le
                  inner join Empleados as em on em.NoEmpleado = le.NoEmpleado
                  inner join CatalogoLineaEtica as cl on  cl.idCatalogoLineaEtica = le.idCatalogoLineaEtica
                  WHERE le.Revisado = 0;";
          $resultCont = $Con3->Select($q3,array());
          $CantidadMsg = $resultCont[0]["Cantidad"];
          if ($CantidadMsg > 0) {
              $arrRetorno = [
                "Resultado" => true,
                "Siguiente" => true,
              ];
          } else {
            $arrRetorno = [
              "Resultado" => true,
              "Siguiente" => false
            ];
          }
        } else {
          $arrRetorno = [
            "Resultado" => true,
            "Siguiente" => false
          ];
        }
        return json_encode($arrRetorno);
      } catch (\Exception $e) {
        return false;
      }
    }
}
