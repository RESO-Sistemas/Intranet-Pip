<?php
include("Empleados.php");

// Cargar SessionManager
if (file_exists("../Session/SessionManager.php")) {
  require_once("../Session/SessionManager.php");
} else if (file_exists("../../Session/SessionManager.php")) {
  require_once("../../Session/SessionManager.php");
}

$op = $_POST["op"];
$Empleados = new Empleados();

if ($op == "loginEmpleado") {
  $NoEmpleado = $_POST["noEmpleado"];
  $Password = $_POST["password"];
  echo trim($Empleados->loginEmpleado($NoEmpleado, $Password));
}

if ($op == "getDatosEmpleado") {
  $NoEmpleado = $_POST["NoEmpleado"] ?? null;
  echo trim($Empleados->getDatosEmpleado($NoEmpleado));
}

if ($op == "getDivisiones") {
  echo trim($Empleados->getDivisiones());
}

if ($op == "updateDatosEmpleado") {
  // Verificar sesion activa
  if (!SessionManager::isLoggedIn()) {
    echo "0";
    exit;
  }

  $Email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
  $Movil = preg_replace('/[^0-9]/', '', trim($_POST["movil"] ?? ""));
  $Password = trim($_POST["pass"] ?? "");

  // Validaciones
  if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) {
    echo "email_invalido";
    exit;
  }
  if (strlen($Movil) > 0 && (strlen($Movil) < 10 || strlen($Movil) > 15)) {
    echo "movil_invalido";
    exit;
  }
  if (strlen($Password) > 0 && strlen($Password) < 4) {
    echo "password_corto";
    exit;
  }

  echo trim($Empleados->updateDatosEmpleado($Email, $Movil, $Password));
}

if ($op == "updatePerfilPersonalEmpleado") {
  if (!SessionManager::isLoggedIn()) {
    echo "0";
    exit;
  }

  $Nombre = trim($_POST["Nombre"] ?? "");
  $RFC = trim($_POST["RFC"] ?? "");
  $CURP = trim($_POST["CURP"] ?? "");
  $NoSeguro = trim($_POST["NoSeguro"] ?? "");
  $FNacimiento = trim($_POST["FNacimiento"] ?? "");

  if (empty($Nombre)) {
    echo "nombre_requerido";
    exit;
  }

  echo trim($Empleados->updatePerfilPersonalEmpleado($Nombre, $RFC, $CURP, $NoSeguro, $FNacimiento));
}

if ($op == "updateFotoEmpleado") {
  if (isset($_FILES['fotoEmp']['tmp_name']) && $_FILES['fotoEmp']['tmp_name'] != '') {
    $namefile = $_FILES['fotoEmp']['name'] ?? '';
    $ext = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
    $extValida = array("png", "jpeg", "jpg", "webp");

    if (in_array($ext, $extValida)) {
      $mimeType = mime_content_type($_FILES['fotoEmp']['tmp_name']);
      $imageContent = base64_encode(file_get_contents($_FILES['fotoEmp']['tmp_name']));
      $imageDataUri = "data:" . $mimeType . ";base64," . $imageContent;
      echo trim($Empleados->updateFotoEmpleado($imageDataUri));
    } else {
      echo "0";
    }
  } else {
    echo "0";
  }



}

if ($op == "getColaboradores") {
  echo trim($Empleados->getColaboradores());
}

if ($op == "getColaboradoresOrganigrama") {
  echo trim($Empleados->getColaboradoresOrganigrama());
}

if ($op == "getDatosEmpleadosOrganigrama") {
  $NoEmpleadoAjax = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosEmpleadosOrganigrama($NoEmpleadoAjax));
}

if ($op == "updateDatosSaludEmpleado") {
  // Verificar sesion activa
  if (!SessionManager::isLoggedIn()) {
    echo "0";
    exit;
  }

  $HabitusExteriorDescripcion = trim($_POST["HEDescripcion"] ?? "");
  $Peso = is_numeric($_POST["HEPeso"] ?? null) ? $_POST["HEPeso"] : "";
  $Complexion = trim($_POST["HEComp"] ?? "");
  $Talla = is_numeric($_POST["HETalla"] ?? null) ? $_POST["HETalla"] : "";
  $FrCardiaca = trim($_POST["SVFrCard"] ?? "");
  $FrRespiratoria = trim($_POST["SVFrResp"] ?? "");
  $TensionArterial = trim($_POST["SVTensionArt"] ?? "");
  $Temperatura = is_numeric($_POST["SVTemperatura"] ?? null) ? $_POST["SVTemperatura"] : "";
  $GrupoSanguineo = in_array($_POST["INFSGrupo"] ?? "", ["A", "B", "AB", "O", ""]) ? $_POST["INFSGrupo"] : "";
  $FactorRh = in_array($_POST["INFSFactirRh"] ?? "", ["0", "1", ""]) ? $_POST["INFSFactirRh"] : "";
  $CartillaVacunacion = in_array($_POST["txtCartilla"] ?? "", ["0", "1", ""]) ? $_POST["txtCartilla"] : "0";
  $EsquemaCompleto = in_array($_POST["txtEsquema"] ?? "", ["0", "1", ""]) ? $_POST["txtEsquema"] : "0";
  $OtrosComentariosSalud = trim($_POST["CualFalta"] ?? "");

  echo trim($Empleados->updateDatosSaludEmpleado($HabitusExteriorDescripcion, $Peso, $Complexion, $Talla, $FrCardiaca, $FrRespiratoria, $TensionArterial, $Temperatura, $GrupoSanguineo, $FactorRh, $CartillaVacunacion, $EsquemaCompleto, $OtrosComentariosSalud));
}

if ($op == "getDatosSaludEmpleado") {
  echo trim($Empleados->getDatosSaludEmpleado());
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

if ($op == "getDatosEmpleadoSolocitud") {
  echo trim($Empleados->getDatosEmpleadoSolocitud());
}

if ($op == "enviarSolicitudVacaciones") {
  $FechaInicio = $_POST["FechaInicio"];
  $FechaFin = $_POST["FechaFin"];
  $ComentariosSolicitud = $_POST["ComentariosSolicitud"];
  $TotalDias = $_POST["TotalDias"];
  $DiaRegreso = $_POST["DiaRegreso"];
  echo trim($Empleados->enviarSolicitudVacaciones($FechaInicio, $FechaFin, $ComentariosSolicitud, $TotalDias,$DiaRegreso));
}

if ($op == "getMisSolicitudesVacaciones") {
  echo trim($Empleados->getMisSolicitudesVacaciones());
}

if ($op == "getMisSolicitudesPorRevisar") {
  echo trim($Empleados->getMisSolicitudesPorRevisar());
}

if ($op == "updateStatusSolicitud") {
  $Status = $_POST["Status"];
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->updateStatusSolicitud($Status, $idSolicitudesVacaciones));
}

if ($op == "addVacunacionCOVID") {
  if (!isset($_POST["txtNumeroVacuna"])) {
    echo "No se han producido cambios.";
  }else {
    $Numero = $_POST["txtNumeroVacuna"];
    $Vacuna = $_POST["txtNombreVacuna"];
    $FechaVacunacion = $_POST["txtFecha"];
    echo trim($Empleados->addVacunacionCOVID($Numero, $Vacuna, $FechaVacunacion));
  }
}

if ($op == "getEsquemaVacunacion") {
  echo trim($Empleados->getEsquemaVacunacion());
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
  $diasDescanso = $_POST["diasDescanso"];
  echo trim($Empleados->getFechasRango($fechaInicio, $fechaFin, $diasDescanso));
}

if ($op == "SubirFirma") {
  $imagen64 = $_POST["imagen64"];
  echo trim($Empleados->SubirFirma($imagen64));
}

if ($op == "getFirmaEmp") {
  echo trim($Empleados->getFirmaEmp());
}

if ($op == "getDetalleSolicitud") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->getDetalleSolicitud($idSolicitudesVacaciones));
}

if ($op == "getMisSolicitudesFinales") {
  echo trim($Empleados->getMisSolicitudesFinales());
}

if ($op == "realizarAccionSolicitudFinal") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  $Status = $_POST["Status"];
  echo trim($Empleados->realizarAccionSolicitudFinal($idSolicitudesVacaciones, $Status));
}

if ($op == "getPermisos") {
  $IdPuesto = $_POST["IdPuesto"];
  echo trim($Empleados->getPermisos($IdPuesto));
}

if ($op == "getListPuestos") {
  echo trim($Empleados->getListPuestos());
}

if ($op == "updatePersmisosEmpleado") {
  $id_menu = $_POST["id_menu"];
  $IdPuesto = $_POST["IdPuesto"];
  echo trim($Empleados->updatePersmisosEmpleado($id_menu, $IdPuesto));
}

if ($op == "insertaEmpleadosExcel") {
  $Datos = $_POST["Datos"];
  echo trim($Empleados->insertaEmpleadosExcel($Datos));
}

if ($op == "deshabilitarEmpleado") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->deshabilitarEmpleado($NoEmpleado));
}

if ($op == "habilitarEmpleado") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->habilitarEmpleado($NoEmpleado));
}

if ($op == "insertaDiasVacaciones") {
  $Datos = $_POST["Datos"];
  echo trim($Empleados->insertaDiasVacaciones($Datos));
}

if ($op == "getJefesPosibles") {
  $NoEmpleado = $_POST["NoEmpleado"];
  // $IdSucursal = $_POST["IdSucursal"];
  echo trim($Empleados->getJefesPosibles($NoEmpleado));
}

if ($op == "getJefesPosiblesSolicitud") {
  echo trim($Empleados->getJefesPosiblesSolicitud());
}


if ($op == "asignarJefeEmpleado") {
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  $EmpleadoHijo = $_POST["EmpleadoHijo"];
  echo trim($Empleados->asignarJefeEmpleado($EmpleadoPadre, $EmpleadoHijo));
}

if ($op == "asignarJefeEmpleadoSolicitud") {
  $EmpleadoPadre = $_POST["EmpleadoPadre"];
  echo trim($Empleados->asignarJefeEmpleadoSolicitud($EmpleadoPadre));
}

if ($op == "getJefeAsignado") {
  $EmpleadoHijo = $_POST["EmpleadoHijo"];
  echo trim($Empleados->getJefeAsignado($EmpleadoHijo));
}

if ($op == "getJefeAsignadoSolicitud") {
  echo trim($Empleados->getJefeAsignadoSolicitud());
}

if ($op == "getDetallesEmpleadoLogeado") {
  echo trim($Empleados->getDetallesEmpleadoLogeado());
}


if ($op == "getMsgSolicitudesVacacionesRecibidasJefe") {
  echo trim($Empleados->getMsgSolicitudesVacacionesRecibidasJefe());
}

if ($op == "updateMsgSolicitudesVacacionesRecibidasJefe") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->updateMsgSolicitudesVacacionesRecibidasJefe($idSolicitudesVacaciones));
}

if ($op == "getMsgSolicitudesVacacionesRecibidasFinal") {
  echo trim($Empleados->getMsgSolicitudesVacacionesRecibidasFinal());
}

if ($op == "updateMsgSolicitudesVacacionesRecibidasNomina") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->updateMsgSolicitudesVacacionesRecibidasNomina($idSolicitudesVacaciones));
}

if ($op == "getCantidadNotificaciones") {
  echo trim($Empleados->getCantidadNotificaciones());
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

if ($op == "otrosDetallesEmpleadoPersonal") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->otrosDetallesEmpleadoPersonal($NoEmpleado));
}

if ($op == "updateMasDetallesPersonal") {
  $IdDivision = $_POST["slctDivisionActual"];
  $IdSucursal = $_POST["slctSucursalActual"];
  $IdPuesto = $_POST["slctPuestoActual"];
  $NoEmpleado = $_POST["EmpleadoMasDetalles"];
  echo trim($Empleados->updateMasDetallesPersonal($IdDivision,$IdSucursal,$IdPuesto,$NoEmpleado));
}

if ($op == "updateDetalleEmpleado") {
  $Nombre = $_POST["Nombre"];
  $RFC = $_POST["RFC"];
  $CURP = $_POST["CURP"];
  $NoSeguro = $_POST["NoSeguro"];
  $Email = $_POST["Email"];
  $Movil = $_POST["Movil"];
  $Password = $_POST["Password"];
  $NoEmpleado = $_POST["NoEmpleado"];
  $Nivel = $_POST["Nivel"];
  echo trim($Empleados->updateDetalleEmpleado($Nombre,$RFC,$CURP,$NoSeguro,$Email,$Movil,$Password,$NoEmpleado,$Nivel));
}

if ($op == "getDatosPrincipalesEmpleado") {
  $NoEmpleado = $_POST["NoEmpleado"];
  echo trim($Empleados->getDatosPrincipalesEmpleado($NoEmpleado));
}

if ($op == "getMisSolicitudesVacacionesEstadoNomina") {
  echo trim($Empleados->getMisSolicitudesVacacionesEstadoNomina());
}

if ($op == "getMensajeCapacitacionGlobal") {
  echo trim($Empleados->getMensajeCapacitacionGlobal());
}

if ($op == "cerrarMensajeCapacitacion") {
  $idCapacitacion = $_POST["idCapacitacion"];
  echo trim($Empleados->cerrarMensajeCapacitacion($idCapacitacion));
}

if ($op == "getHistoricoSolicitudesNomina") {
  $FechaIni = $_POST["FechaIni"];
  $FechaFin = $_POST["FechaFin"];
  echo trim($Empleados->getHistoricoSolicitudesNomina($FechaIni,$FechaFin));
}

if ($op == "regresarEstadoSolicitudJefe") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->regresarEstadoSolicitudJefe($idSolicitudesVacaciones));
}

if ($op == "getSolicitudesCanceladasJefe") {
  echo trim($Empleados->getSolicitudesCanceladasJefe());
}

if ($op == "regresarEstadoSolicitudNomina") {
  $idSolicitudesVacaciones = $_POST["idSolicitudesVacaciones"];
  echo trim($Empleados->regresarEstadoSolicitudNomina($idSolicitudesVacaciones));
}

if ($op == "getDatosEsquemaSaludPersonal") {
  echo trim($Empleados->getDatosEsquemaSaludPersonal());
}

if ($op == "validarLogin") {
  echo trim($Empleados->validarLogin());
}

if ($op == "loadGblDataEmployee") {
  echo trim($Empleados->loadGblDataEmployee());
}

if ($op == "getPrincipalDetailEvaluated") {
  $employee = $_POST["employee"];
  echo trim($Empleados->getPrincipalDetailEvaluated($employee));
}

if ($op == "getPosiblesEvaluadores") {
  $IdSucursal = $_POST["IdSucursal"];
  $IdPuesto = $_POST["IdPuesto"];
  $evaluado = $_POST["evaluado"];
  $evaluacion = $_POST["evaluacion"];
  echo trim($Empleados->getPosiblesEvaluadores($IdSucursal,$IdPuesto,$evaluado,$evaluacion));
}

if ($op == "getMySubordinatesPerEvaluation") {
  echo trim($Empleados->getMySubordinatesPerEvaluation());
}

if ($op == "getAllActiveEmployees") {
  echo trim($Empleados->getAllActiveEmployees());
}
?>
