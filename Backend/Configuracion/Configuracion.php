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
  class Configuracion extends Conexiones{
    function getMenusPadre(){
      $idSPuesto = SessionManager::get("idSPuesto");
      $q = "SELECT id_menu,Descripcion,URL,Argumentos FROM menus
      WHERE Id_Padre = 0 and id_menu in (SELECT id_menu FROM MenusPermisos WHERE IdPuesto = '$idSPuesto');";
      $cons = $this->Select($q,array());
      return $cons;
    }
    function getMenusHijo($Id_Padre){
      $idSPuesto = SessionManager::get("idSPuesto");
      $q = "SELECT id_menu,Descripcion,URL,Argumentos FROM menus
      WHERE Id_Padre = '$Id_Padre' and id_menu in (SELECT id_menu FROM MenusPermisos WHERE IdPuesto = '$idSPuesto') AND Habilitado = 1;";
      $cons = $this->Select($q,array());
      return $cons;
    }
    function getImgEventosBirthday () {
        $ArrRetorno = [];
        $NombreArchivo = "";
        $Datos  = [];
        $ficheros1  = scandir("../../Archivos/ImagesBirthday/",1);
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        for ($i=0; $i < sizeof($ficheros1) ; $i++) {
            $NombreArchivo = $ficheros1[$i];
            $Datos = [
                "NameImgBirthday" => $NombreArchivo
              ];
              array_push($ArrRetorno,$Datos);
        }
        return $ArrRetorno;
    }

    function getImgEventosAnniversary () {
        $ArrRetorno = [];
        $NombreArchivo = "";
        $Datos  = [];
        $ficheros1  = scandir("../../Archivos/ImagesAnniversary/",1);
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        for ($i=0; $i < sizeof($ficheros1) ; $i++) {
            $NombreArchivo = $ficheros1[$i];
            $Datos = [
                "NameImgAnniversary" => $NombreArchivo
              ];
              array_push($ArrRetorno,$Datos);
        }

        return $ArrRetorno;
    }

    function getImgEventosAnniversaryBirthday () {
        $ArrayRetorno = [];
        $Datos = [];
        $Configuracion = new Configuracion ();
        $Configuracion2 = new Configuracion ();
        $ImgBirthday = $Configuracion->getImgEventosBirthday();
        $ImgAnniversary = $Configuracion2->getImgEventosAnniversary();
        $Datos = [
          "Birthday" => $ImgBirthday,
          "Anniversary" => $ImgAnniversary
        ];
        array_push($ArrayRetorno,$Datos);

        return json_encode($ArrayRetorno);
    }

    function getConfigMensajeBienvenida()
    {
        $q = "SELECT MensajeBienvenida FROM ConfiguracionPersonalizacion;";
        return json_encode($this->Select($q,array()));
    }

    function updateMensajeBienvenida($MensajeBienvenida)
    {
        $q = "UPDATE ConfiguracionPersonalizacion SET MensajeBienvenida = '$MensajeBienvenida'";
        $this->ExecuteQuery($q,array());
        return "1";
    }

    function getListDiasFestivos(){
      $q = "SELECT idDiasFestivos,Descripcion,Dia,IF(Status = 1,'Día Activado','Día Desactivado') as StatusD
              FROM DiasFestivos;";
      return json_encode($this->Select($q,array()));
    }

    function updateStatusDiaFestivo ($idDiasFestivos) {
      $idDiasFestivos = base64_decode($idDiasFestivos);
      $q = " SELECT Status FROM DiasFestivos
              WHERE idDiasFestivos = '$idDiasFestivos';";
      $cons = $this->Select($q,array());
      $StatusActual = $cons[0]["Status"];
      if ($StatusActual == "1") {
        $newStatus = "0";
      }else {
        $newStatus = "1";
      }
      $Conexiones2 = new Conexiones();
      $q2 = "UPDATE DiasFestivos SET Status = '$newStatus'
              WHERE idDiasFestivos = '$idDiasFestivos';";
      $Conexiones2->ExecuteQuery($q2,array());
      return "1";
    }

    function updateInfoDiaFestivo($Descripcion,$Dia,$idDiasFestivos){
      if ($Descripcion == "" || $Dia == "") {
        return "Seleccione el Número de mes, el número de día e ingrese la descripción.";
      } else {
        $idDiasFestivos = base64_decode($idDiasFestivos);
        $q = "UPDATE DiasFestivos SET Descripcion = '$Descripcion', Dia = '$Dia'
                WHERE idDiasFestivos = '$idDiasFestivos';";
        error_log($q);
        $this->ExecuteQuery($q,array());
        return "1";
      }
    }

    function getMeses(){
      $ArrayRetorno = [];
      $q = "SELECT idMeses,Mes,Dias FROM Meses;";
      $cons = $this->Select($q,array());
      for ($i=0; $i < sizeof($cons) ; $i++) {
        $ArrDias = explode(",",$cons[$i]["Dias"]);
        $Datos = [
          "idMes" => $cons[$i]["idMeses"],
          "Mes" => $cons[$i]["Mes"],
          "Dias" => $ArrDias
        ];
        array_push($ArrayRetorno,$Datos);
      }
      return json_encode($ArrayRetorno);
    }

    function addDiasFestivos($Descripcion,$Dia){
      if ($Descripcion == "" || $Dia == "") {
        return "Seleccione el Número de mes, el número de día e ingrese la descripción.";
      } else {
        $q = "INSERT INTO DiasFestivos (Descripcion,Dia) VALUES ('$Descripcion','$Dia');";
        $this->ExecuteQuery($q,array());
        return "1";
      }
    }

    function getConfiguracionDivisionDescanso(){
      try {
        $q = "SELECT TO_BASE64(IdDivision) AS IdDivision, Division, LaburaSabados, LaburaDomingos, LaburaDiasFestivos
              FROM Divisiones;";
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

    function setDaysOff($day,$division,$newVal){
      try {
        $division = base64_decode($division);
        if ($day == "saturday") {
          $q = "UPDATE Divisiones SET LaburaSabados = '$newVal'
                WHERE IdDivision = '$division';";
        } else {
          $q = "UPDATE Divisiones SET LaburaDomingos = '$newVal'
                WHERE IdDivision = '$division';";
        }
        $this->ExecuteQuery($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Acción realizada con éxito"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getLevelsEmployees(){
      try {
        $q = "SELECT Nivel
              FROM Empleados
              WHERE Status = 1 AND Nivel <> 0
              GROUP BY Nivel
              ORDER BY Nivel ASC;";
        $resultado = $this->Select($q);
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

    function changeActiveHolidaysPerDivision($newVal, $division){
      try {
        $division = base64_decode($division);
        $q = "UPDATE Divisiones SET LaburaDiasFestivos = '$newVal'
              WHERE IdDivision = '$division';";
        $this->ExecuteQuery($q,array());
        $arrReturn = [
          "Resultado" => true,
          "Siguiente" => true,
          "ConMsg" => true,
          "Msg" => "Acción realizada con éxito"
        ];
        return json_encode($arrReturn);
      } catch (\Exception $e) {
        return $e;
      }
    }

    function getListAllBranchEmp(){
      try {
        $q = "SELECT TO_BASE64(SD.IdSucursal) AS IdSucursal, Sucursal
              FROM Empleados AS E
              INNER JOIN SucursalDepto AS SD ON SD.IdSucursal = E.IdSucursal
              WHERE E.Status = 1 AND E.IdSucursal <> 0
              GROUP BY SD.IdSucursal
              ORDER BY Sucursal ASC;";
        $resultado = $this->Select($q);
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
  }

 ?>
