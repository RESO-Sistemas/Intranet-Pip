<?php
  include("Configuracion.php");
  $Configuracion  = new Configuracion();
  $op = $_POST["op"];

  if ($op == "getMenusPadre") {
    echo trim($Configuracion->getMenusPadre());
  }

  if ($op == "getNameImgBirthay") {
    echo trim($Configuracion->getNameImgBirthay());
  }

  if ($op == "updateImgBirthday") {
    $carpeta = "../../Archivos/ImagesBirthday/";
    if (isset($_FILES['ContenidoImgBirthday']['name']) && $_FILES['ContenidoImgBirthday']['name'] != '') {
      $namefile = $_FILES['ContenidoImgBirthday']['name'];
      $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
      $extValida = array("png","jpeg","jpg");
      if (in_array($ext,$extValida)) {
        $path = $carpeta."ImgBirthday".".".$ext;
        $nameArchivo ="ImgBirthday.$ext";
        $path2 = $carpeta;
        $ficheros1  = scandir("../../Archivos/ImagesBirthday/",1);

        if (!file_exists($path2)) {
          mkdir($path2, 0777, true);
        }
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        if (sizeof($ficheros1) > 0) {
            for ($i=0; $i < sizeof($ficheros1) ; $i++) {
                unlink("../../Archivos/ImagesBirthday/$ficheros1[$i]");
            }
        }
        if (move_uploaded_file($_FILES['ContenidoImgBirthday']['tmp_name'],$path)) {
          echo "1";
        }
      }else {
        return "Archivo no valido";
      }
    }else {
      echo "0";
    }
  }

  if ($op == "updateImgAnniversary") {
    $carpeta = "../../Archivos/ImagesAnniversary/";
    if (isset($_FILES['ContenidoImgAnniversary']['name']) && $_FILES['ContenidoImgAnniversary']['name'] != '') {
      $namefile = $_FILES['ContenidoImgAnniversary']['name'];
      $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
      $extValida = array("png","jpeg","jpg");
      if (in_array($ext,$extValida)) {
        $path = $carpeta."ImgAnniversary".".".$ext;
        $nameArchivo ="ImgAnniversary.$ext";
        $path2 = $carpeta;
        $ficheros1  = scandir("../../Archivos/ImagesAnniversary/",1);

        if (!file_exists($path2)) {
          mkdir($path2, 0777, true);
        }
        for ($i=0; $i < 2 ; $i++) {
            array_pop($ficheros1);
        }
        if (sizeof($ficheros1) > 0) {
            for ($i=0; $i < sizeof($ficheros1) ; $i++) {
                unlink("../../Archivos/ImagesAnniversary/$ficheros1[$i]");
            }
        }
        if (!file_exists($path2)) {
          mkdir($path2, 0777, true);
        }
        if (move_uploaded_file($_FILES['ContenidoImgAnniversary']['tmp_name'],$path)) {
          echo "1";
        }
      }else {
        return "Archivo no valido";
      }
    }else {
      echo "0";
    }
  }

  if ($op == "getImgEventosAnniversaryBirthday"){
    echo trim($Configuracion->getImgEventosAnniversaryBirthday());
  }

  if ($op == "getConfigMensajeBienvenida") {
    echo trim($Configuracion->getConfigMensajeBienvenida());
  }

  if ($op == "updateMensajeBienvenida") {
    $MensajeBienvenida = $_POST["MensajeBienvenida"];
    echo trim($Configuracion->updateMensajeBienvenida($MensajeBienvenida));
  }

  if ($op == "getListDiasFestivos") {
    echo trim($Configuracion->getListDiasFestivos());
  }

  if ($op == "updateStatusDiaFestivo") {
    $idDiasFestivos = $_POST["idDiasFestivos"];
    echo trim($Configuracion->updateStatusDiaFestivo($idDiasFestivos));
  }

  if ($op == "updateInfoDiaFestivo") {
    $Descripcion = $_POST["Descripcion"];
    $Dia = $_POST["Dia"];
    $idDiasFestivos = $_POST["idDiasFestivos"];
    echo trim($Configuracion->updateInfoDiaFestivo($Descripcion,$Dia,$idDiasFestivos));
  }

  if ($op == "getMeses") {
    echo trim($Configuracion->getMeses());
  }

  if ($op == "addDiasFestivos") {
    $Descripcion = $_POST["Descripcion"];
    $Dia = $_POST["Dia"];
    echo trim($Configuracion->addDiasFestivos($Descripcion,$Dia));
  }

  if ($op == "getConfiguracionDivisionDescanso") {
    echo trim($Configuracion->getConfiguracionDivisionDescanso());
  }

  if ($op == "setDaysOff") {
    $day = $_POST["day"];
    $division = $_POST["division"];
    $newVal = $_POST["newVal"];
    echo trim($Configuracion->setDaysOff($day,$division,$newVal));
  }

  if ($op == "getLevelsEmployees") {
    echo trim($Configuracion->getLevelsEmployees());
  }

  if ($op == "changeActiveHolidaysPerDivision") {
    $newVal = $_POST["newVal"];
    $division = $_POST["division"];
    echo trim($Configuracion->changeActiveHolidaysPerDivision($newVal, $division));
  }

  if ($op == "getListAllBranchEmp") {
    echo trim($Configuracion->getListAllBranchEmp());
  }
 ?>
