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
  class Configuracion extends Conexiones{
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

        return '{ "ImgEventosAnniversaryBirthday": '.json_encode($ArrayRetorno)."}";
    }

    function getConfigMensajeBienvenida()
    {
        $q = "SELECT MensajeBienvenida FROM ConfiguracionPersonalizacion;";
        return '{ "MensajeBienvenidaConfig": '.json_encode($q,array())."}";
    }

    function updateMensajeBienvenida($MensajeBienvenida)
    {
        try {
          $q = "UPDATE ConfiguracionPersonalizacion SET MensajeBienvenida = '$MensajeBienvenida'";
          $this->ExecuteQuery($q,array());
          return "1";
        } catch (\Exception $e) {
          return $e;
        }

    }
  }

 ?>
