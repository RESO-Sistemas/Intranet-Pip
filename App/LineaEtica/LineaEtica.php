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

class LineaEtica extends Conexiones
{
    function getDivision()
    {
        $q = "SELECT IdDivision,Division FROM Divisiones;";
        return '{ "getDivisiones": '.json_encode($this->Select($q, array()))."}";
    }

    function getOpcionesLineaEtica()
    {
        $q = "SELECT idCatalogoLineaEtica,Descripcion FROM CatalogoLineaEtica
            where Status = 1
            order by Descripcion;";
        return '{ "getOpcionesLineaEtica": '.json_encode($this->Select($q, array()))."}";
    }

    function addMensajeLineaEtica($idCatalogoLineaEtica, $Mensaje, $idDivision,$NoEmpleado)
    {
        try {
          try {
              $q = "INSERT INTO LineaEticaMensajes (idCatalogoLineaEtica,NoEmpleado,Registro,Mensaje,id_division)
                VALUES ('$idCatalogoLineaEtica','$NoEmpleado',now(),'$Mensaje','$idDivision');";
              $this->ExecuteQuery($q, array());
              return "1";
          } catch (\Exception $e) {
              return "0";
          }
        } catch (\Exception $e) {
          return $e;
        }
    }

    function getMensajesLineaEticaPendientes()
    {
        $q = "SELECT E.NoEmpleado,E.Nombre,CLE.Descripcion,LEM.Registro,LEM.Mensaje,LEM.idLineaEticaMensajes, D.Division
            FROM LineaEticaMensajes AS LEM
            INNER JOIN Empleados AS E ON E.NoEmpleado = LEM.NoEmpleado
            INNER JOIN CatalogoLineaEtica AS CLE ON CLE.idCatalogoLineaEtica = LEM.idCatalogoLineaEtica
            INNER JOIN Divisiones as D ON D.IdDivision = LEM.id_division
            where Revisado = 0
            ORDER BY LEM.Registro DESC;";
        return '{ "GetMsgLineaEticaPendientes": '.json_encode($this->Select($q, array()))."}";
    }

    function vistoMensajeEtica($idLineaEticaMensajes)
    {
        try {
            $q = "UPDATE LineaEticaMensajes SET Revisado = 1 WHERE idLineaEticaMensajes = '$idLineaEticaMensajes';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return $e;
        }
    }
    function getMensajeVistoLineaEtica($NoEmpleado)
    {
        $q = "SELECT Mensaje,idLineaEticaMensajes FROM LineaEticaMensajes AS LEM
            WHERE Revisado = 1 AND MensajeRevisado = 1 AND NoEmpleado = '$NoEmpleado';";
        return '{ "GetMiMsgLineaEtica": '.json_encode($this->Select($q, array()))."}";
    }

    function VistoMensajeLineaEtica($idLineaEticaMensajes)
    {
        try {
            $q = "UPDATE LineaEticaMensajes SET MensajeRevisado = 0
              WHERE idLineaEticaMensajes = '$idLineaEticaMensajes';";
            $this->ExecuteQuery($q, array());
            return "1";
        } catch (\Exception $e) {
            return $e;
        }
    }

}
?>
