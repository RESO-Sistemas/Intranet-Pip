<?php
include("Empleados.php");

$op = $_POST["op"];
$Empleados = new Empleados();

if ($op == "loginEmpleado") {
  $NoEmpleado = $_POST["noEmpleado"];
  $Password = $_POST["password"];
  echo trim($Empleados->loginEmpleado($NoEmpleado, $Password));
}

if ($op == "getFotoPerfil") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getFotoPerfil($NoEmpleado));
}

if ($op == "getDatosEmpleado") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosEmpleado($NoEmpleado));
}

if ($op == "updateDatosEmpleado") {
  $Email = $_POST["email"];
  $Movil = $_POST["movil"];
  $Password = $_POST["pass"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->updateDatosEmpleado($Email, $Movil, $Password,$NoEmpleado));
}

if ($op == "updateFotoEmpleado") {
  $Empleados2 = new Empleados();
  $Empleados3 = new Empleados();
  $NoEmpleado = $_POST["NoEmpleado"];
  $Base64Img = $_POST["FotoBase64"];
  $Base64Img = str_replace(" ",'+',$Base64Img);
  $datetime = date("Y-m-d h:i:s");
  $timestamp = strtotime($datetime);

  $imgdata = base64_decode($Base64Img);
  $f = finfo_open();
  $mime_type = finfo_buffer($f, $imgdata, FILEINFO_MIME_TYPE);
  $temp=explode('/',$mime_type);
  $path = "../../Archivos/ImgEmpleados/$NoEmpleado/$timestamp.$temp[1]";

  $status = file_put_contents($path,base64_decode($Base64Img));
  if($status){
    error_log("Successfully Uploaded");
  }else{
    error_log("Upload failed");
  }

  $resp = $Empleados->getNameFotoEmpleado($NoEmpleado);
  $ImgText = $resp[0]["Imagen"];

  if ($ImgText == "") {
    // $carpeta = "../../Archivos/ImgEmpleados/$NoEmpleado/img.png";
    error_log($carpeta);
    $Empleados2->updateFotoEmpleado("$timestamp.$temp[1]",$NoEmpleado);

  } else {
    $direccion = "../../Archivos/ImgEmpleados/$NoEmpleado/$ImgText";
    unlink($direccion);

    try {
      // $carpeta = "../../Archivos/ImgEmpleados/$NoEmpleado/img.png";
      // if(move_uploaded_file($temp_file, $carpeta)){
  		// 	echo "Archivo guardado con exito";
  		// }else{
  		// 	echo "Archivo no se pudo guardar";
  		// }
      $Empleados2->updateFotoEmpleado("$timestamp.$temp[1]",$NoEmpleado);

      // if (isset($_FILES['fotoEmp']['name']) && $_FILES['fotoEmp']['name'] != '') {
      //   $namefile = $_FILES['fotoEmp']['name'];
      //   $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
      //
      //   $extValida = array("png", "jpeg", "jpg");
      //
      //   if (in_array($ext, $extValida)) {
      //
      //     $path = $carpeta . $NoEmpleado . ".$ext";
      //     $nameimg = $NoEmpleado . ".$ext";
      //     if (!file_exists($carpeta)) {
      //       mkdir($carpeta, 0777, true);
      //     }
      //     if (move_uploaded_file($_FILES['fotoEmp']['tmp_name'], $path)) {
      //       $NombreArchivo = $namefile;
      //       error_log("subida imagen proceso");
      //       $Empleados2->updateFotoEmpleado($nameimg);
      //     }
      //   }
      // }

    } catch (\Exception $e) {
      error_log("$e");
    }
    echo "$timestamp.$temp[1]";
  }
}

if ($op == "getColaboradores") {
  $IdSucursal = $_POST["IdSucursal"];
  echo trim($Empleados->getColaboradores($IdSucursal));
}

if ($op == "getDatosEmpleadosOrganigrama") {
  $NoEmpleadoAjax = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosEmpleadosOrganigrama($NoEmpleado));
}

if ($op == "updateDatosSaludEmpleado") {
  $HabitusExteriorDescripcion = $_POST["HEDescripcion"];
  $Peso = $_POST["HEPeso"];
  $Complexion = $_POST["HEComp"];
  $Talla = $_POST["HETalla"];
  $FrCardiaca = $_POST["SVFrCard"];
  $FrRespiratoria = $_POST["SVFrResp"];
  $TensionArterial = $_POST["SVTensionArt"];
  $Temperatura = $_POST["SVTemperatura"];
  $GrupoSanguineo = $_POST["INFSGrupo"];
  $FactorRh = $_POST["INFSFactirRh"];
  $CartillaVacunacion = $_POST["txtCartilla"];
  $EsquemaCompleto = $_POST["txtEsquema"];
  $OtrosComentariosSalud = $_POST["CualFalta"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->updateDatosSaludEmpleado($HabitusExteriorDescripcion, $Peso, $Complexion, $Talla, $FrCardiaca, $FrRespiratoria, $TensionArterial, $Temperatura, $GrupoSanguineo, $FactorRh, $CartillaVacunacion, $EsquemaCompleto, $OtrosComentariosSalud,$NoEmpleado));
}

if ($op == "getDatosSaludEmpleado") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosSaludEmpleado($NoEmpleado));
}

if ($op == "getPersonal") {
  $puesto = $_POST["puesto"];
  $sucursal = $_POST["sucursal"];
  $division = $_POST["division"];
  echo trim($Empleados->getPersonal($puesto, $sucursal, $division));
}

if ($op == "getPersonalDirectorioEmailTel") {
  $puesto = $_POST["puesto"];
  $sucursal = $_POST["sucursal"];
  $division = $_POST["division"];
  $idDirectoriosCorreosTelefonos = $_POST["idDirectoriosCorreosTelefonos"];
  echo trim($Empleados->getPersonalDirectorioEmailTel($puesto, $sucursal, $division, $idDirectoriosCorreosTelefonos));
}

if ($op == "getPersonalDirectorioExtensiones") {
  $puesto = $_POST["puesto"];
  $sucursal = $_POST["sucursal"];
  $division = $_POST["division"];
  $idDirectorioExtensiones = $_POST["idDirectorioExtensiones"];
  echo trim($Empleados->getPersonalDirectorioExtensiones($puesto, $sucursal, $division, $idDirectorioExtensiones));
}

if ($op == "getColaboradoresEmpleado") {
  $IdDivision = $_POST["IdDivision"];
  $IdSucursal = $_POST["IdSucursal"];
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  echo trim($Empleados->getColaboradoresEmpleado($IdDivision, $IdSucursal, $EmpleadoPadre));
}

if ($op == "addRelacionEmpleadoPadreHijo") {
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  $EmpleadoHijo = $_POST["EmpleadoHijo"];
  echo trim($Empleados->addRelacionEmpleadoPadreHijo($EmpleadoPadre, $EmpleadoHijo));
}

if ($op == "getRelacionPadre") {
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  echo trim($Empleados->getRelacionPadre($EmpleadoPadre));
}

if ($op == "deleteRelacionPadre") {
  $idRelacionEmpleados = $_POST["idRelacionEmpleados"];
  echo trim($Empleados->deleteRelacionPadre($idRelacionEmpleados));
}

if ($op == "getDatosEmpleadoSolicitudVacaciones") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosEmpleadoSolicitudVacaciones($NoEmpleado));
}

if ($op == "enviarSolicitudVacaciones") {
  $FechaInicio = $_POST["FechaInicio"];
  $FechaFin = $_POST["FechaFin"];
  $ComentariosSolicitud = $_POST["ComentariosSolicitud"];
  $TotalDias = $_POST["TotalDias"];
  $NoEmpleado = $_POST["NoEmpleado"];
  $DiaRegreso = $_POST["DiaRegreso"];
  echo trim($Empleados->enviarSolicitudVacaciones($FechaInicio, $FechaFin, $ComentariosSolicitud, $TotalDias,$NoEmpleado,$DiaRegreso));
}

if ($op == "getMisSolicitudesVacaciones") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getMisSolicitudesVacaciones($NoEmpleado));
}

if ($op == "getMisSolicitudesPorRevisar") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getMisSolicitudesPorRevisar($NoEmpleado));
}

if ($op == "updateStatusSolicitud") {
  $Status = $_POST["Status"];
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->updateStatusSolicitud($Status, $idSolicitudesVacaciones, $NoEmpleado));
}

if ($op == "addVacunacionCOVID") {
  $Numero = $_POST["txtNumeroVacuna"];
  $Vacuna = $_POST["txtNombreVacuna"];
  $FechaVacunacion = $_POST["txtFecha"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->addVacunacionCOVID($Numero, $Vacuna, $FechaVacunacion,$NoEmpleado));
}

if ($op == "getEsquemaVacunacion") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getEsquemaVacunacion($NoEmpleado));
}

if ($op == "deleteEsquemaVacunacion") {
  $idEsquemaVacunacionCOVID = $_POST["idEsquemaVacunacionCOVID"];
  echo trim($Empleados->deleteEsquemaVacunacion($idEsquemaVacunacionCOVID));
}

if ($op == "updateEsquemaVacunacion") {
  $Numero = $_POST["Numero"];
  $Vacuna = $_POST["Vacuna"];
  $FechaVacunacion = $_POST["FechaVacunacion"];
  $idEsquemaVacunacionCOVID = $_POST["idEsquemaVacunacionCOVID"];
  echo trim($Empleados->updateEsquemaVacunacion($Numero, $Vacuna, $FechaVacunacion, $idEsquemaVacunacionCOVID));
}

if ($op == "getFechasRango") {
  $fechaInicio = $_POST["fechaInicio"];
  $fechaFin = $_POST["fechaFin"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getFechasRango($fechaInicio, $fechaFin, $NoEmpleado));
}

if ($op == "SubirFirmaApp") {
  $imagen64 = $_POST["imagen64"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->SubirFirmaApp($imagen64,$NoEmpleado));
}

if ($op == "getFirmaEmp") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getFirmaEmp($NoEmpleado));
}

if ($op == "getDetalleSolicitudVacaciones") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDetalleSolicitudVacaciones($idSolicitudesVacaciones,$NoEmpleado));
}

if ($op == "getMisSolicitudesFinalesNomina") {
  echo trim($Empleados->getMisSolicitudesFinalesNomina());
}

if ($op == "realizarAccionSolicitudFinal") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  $Status = $_POST["Status"];
  $UsuarioFinalAutoriza = $_POST["UsuarioFinalAutoriza"];
  echo trim($Empleados->realizarAccionSolicitudFinal($idSolicitudesVacaciones, $Status,$UsuarioFinalAutoriza));
}

if ($op == "getPermisos") {
  $IdPuesto = $_POST["IdPuesto"];
  echo trim($Empleados->getPermisos($IdPuesto));
}

if ($op == "updatePersmisosEmpleado") {
  $id_menu = $_POST["id_menu"];
  $IdPuesto = $_POST["IdPuesto"];
  echo trim($Empleados->updatePersmisosEmpleado($id_menu, $IdPuesto));
}

if ($op == "getJefesPosibles") {
  $NoEmpleado = $_POST["NoEmpleado"];
  $IdSucursal = $_POST["IdSucursal"];
  echo trim($Empleados->getJefesPosibles($NoEmpleado, $IdSucursal));
}

if ($op == "asignarJefeEmpleado") {
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  $EmpleadoHijo = $_POST["EmpleadoHijo"];
  echo trim($Empleados->asignarJefeEmpleado($EmpleadoPadre, $EmpleadoHijo));
}

if ($op == "asignarJefeEmpleadoSolicitud") {
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  $EmpleadoHijo = $_POST["EmpleadoHijo"];
  echo trim($Empleados->asignarJefeEmpleadoSolicitud($EmpleadoPadre,$EmpleadoHijo));
}

if ($op == "getJefeAsignado") {
  $EmpleadoHijo = $_POST["EmpleadoHijo"];
  echo trim($Empleados->getJefeAsignado($EmpleadoHijo));
}

if ($op == "getJefeAsignadoSolicitud") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getJefeAsignadoSolicitud($NoEmpleado));
}

if ($op == "getDetallesEmpleadoLogeado") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDetallesEmpleadoLogeado($NoEmpleado));
}

if ($op == "getMsgSolicitudesVacacionesRecibidasJefe") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getMsgSolicitudesVacacionesRecibidasJefe($NoEmpleado));
}

if ($op == "updateMsgSolicitudesVacacionesRecibidasJefe") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->updateMsgSolicitudesVacacionesRecibidasJefe($idSolicitudesVacaciones));
}

if ($op == "getMsgSolicitudesVacacionesRecibidasFinal") {
  $idSPuesto = $_POST["idSPuesto"];
  echo trim($Empleados->getMsgSolicitudesVacacionesRecibidasFinal());
}

if ($op == "updateMsgSolicitudesVacacionesRecibidasNomina") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->updateMsgSolicitudesVacacionesRecibidasNomina($idSolicitudesVacaciones));
}

if ($op == "getCantidadNotificaciones") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getCantidadNotificaciones($NoEmpleado));
}

if ($op == "recuperarPassword") {
  $Email = $_POST["Email"];
  echo trim($Empleados->recuperarPassword($Email));
}

if ($op == "getDatosSolicitudPassword") {
  $idSolicitudesRecoveryPass = $_POST["idSolicitudesRecoveryPass"];
  echo trim($Empleados->getDatosSolicitudPassword($idSolicitudesRecoveryPass));
}

if ($op == "recoveryPassword") {
  $Password = $_POST["Password"];
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->recoveryPassword($Password, $NoEmpleado));
}

if ($op == "getMisSolicitudesVacacionesEstadoNomina") {
  $NoEmpleadoJefe = $_POST["NoEmpleado"];
  echo trim($Empleados->getMisSolicitudesVacacionesEstadoNomina($NoEmpleadoJefe));
}

if ($op == "getSolicitudesCanceladasJefe") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getSolicitudesCanceladasJefe($NoEmpleado));
}

if ($op == "getDatosEmpleadoSolicitud") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosEmpleadoSolicitud($NoEmpleado));
}

if ($op == "getJefesPosiblesSolicitud") {
  $NoEmpleado = $_POST["NoEmpleado"];
  $IdSucursal = $_POST["IdSucursal"];
  echo trim($Empleados->getJefesPosiblesSolicitud($NoEmpleado,$IdSucursal));
}

if ($op == "InsertTokenCliente") {
  $NoEmpleado = $_POST["NoEmpleado"];
  $Token = $_POST["Token"];
  echo trim($Empleados->InsertTokenCliente($NoEmpleado,$Token));
}
?>
