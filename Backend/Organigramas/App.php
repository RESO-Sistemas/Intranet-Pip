<?php
  include("Organigramas.php");
  $Organigramas = new Organigramas();
  $op = $_POST["op"];

  if ($op == "addOrganigrama") {
    $nTitulo = $_POST["txtTituloOrg"];
    echo trim($Organigramas->addOrganigrama($nTitulo));
  }
  if ($op == "getPuestosOrg") {
    echo trim($Organigramas->getPuestosOrg());
  }
  if ($op == "getDivicionOrg") {
    echo trim($Organigramas->getDivicionOrg());
  }
  if ($op == "getSucursalDeptoOrg") {
    echo trim($Organigramas->getSucursalDeptoOrg());
  }
  if ($op == "getEmpleadosOrg") {
    $IdDivision = $_POST["IdDivision"] ?? "";
    $IdSucursal = $_POST["IdSucursal"] ?? "";
    $IdPuesto = $_POST["IdPuesto"] ?? "";
    $Nivel = $_POST["Nivel"] ?? "";
    $Organigrama = $_POST["Organigrama"] ?? "";
    $q = $_POST["q"] ?? "";
    echo trim($Organigramas->getEmpleadosOrg($IdDivision,$IdSucursal,$IdPuesto,$Nivel,$Organigrama,$q));
  }

  if ($op == "getEmpleadosNoEnOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    $q = $_POST["q"] ?? "";
    echo trim($Organigramas->getEmpleadosNoEnOrganigrama($idOrganigramas, $q));
  }

  if ($op == "getTituloOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    echo trim($Organigramas->getTituloOrganigrama($idOrganigramas));
  }

  if ($op == "addEmpleadoOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    $idDetalleOrganigramaPadre = $_POST["idDetalleOrganigramaPadre"];
    $NoEmpleadoHijo = $_POST["NoEmpleadoHijo"];
    $Tipo = $_POST["Tipo"];
    $Otros = $_POST["Otros"];
    // $Nivel = $_POST["Nivel"];
    echo trim($Organigramas->addEmpleadoOrganigrama($idOrganigramas,$idDetalleOrganigramaPadre,$NoEmpleadoHijo,$Tipo,$Otros));
  }

  if ($op == "getDetalleOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    echo trim($Organigramas->getDetalleOrganigrama($idOrganigramas));
  }

  if ($op == "getEmpleadosPadreOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    echo trim($Organigramas->getEmpleadosPadreOrganigrama($idOrganigramas));
  }

  if ($op == "deleteElementoOrganigrama") {
    $idDetalleOrganigrama = $_POST["idDetalleOrganigrama"];
    echo trim($Organigramas->deleteElementoOrganigrama($idDetalleOrganigrama));
  }

  if ($op == "getDetalleElementoPorEditar") {
    $registro = $_POST["registro"];
    echo trim($Organigramas->getDetalleElementoPorEditar($registro));
  }

  if ($op == "EditarElementoOrganigrama") {
    $idDetalleOrganigramaPadre = $_POST["idDetalleOrganigramaPadre"];
    $NoEmpleadoHijo = $_POST["NoEmpleadoHijo"];
    $Otros = $_POST["Otros"];
    $idDetalleOrganigrama = $_POST["idElementoPorEditar"];
    $Tipo = $_POST["Tipo"];
    $idOrganigramas = $_POST["Organigrama"];
    // $Nivel = $_POST["Nivel"];
    echo trim($Organigramas->EditarElementoOrganigrama($idDetalleOrganigramaPadre,$NoEmpleadoHijo,$Otros,$idDetalleOrganigrama,$Tipo,$idOrganigramas));
  }

  if ($op == "getOrganigramasControl") {
    echo trim($Organigramas->getOrganigramasControl());
  }

  if ($op == "updateOrganigramaTitulo") {
    $idOrganigramas = $_POST["idOrganigramas"];
    $Titulo = $_POST["Titulo"];
    echo trim($Organigramas->updateOrganigramaTitulo($idOrganigramas, $Titulo));
  }

  if ($op == "deleteOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    echo trim($Organigramas->deleteOrganigrama($idOrganigramas));
  }

  if ($op == "updateStatusOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    echo trim($Organigramas->updateStatusOrganigrama($idOrganigramas));
  }

  if ($op == "getDatosOrganigramas") {
    echo trim($Organigramas->getDatosOrganigramas());
  }

  if ($op == "getEmpleadosSelectedPadreOrganigrama") {
    $idOrganigramas = $_POST["idOrganigramas"];
    $idDetalleOrganigrama = $_POST["idDetalleOrganigrama"];
    echo trim($Organigramas->getEmpleadosSelectedPadreOrganigrama($idOrganigramas,$idDetalleOrganigrama));
  }

  if ($op == "changePositionNodeOrganigrama") {
    $CoordenadaY = $_POST["y"];
    $CoordenadaX = $_POST["x"];
    $idDetalleOrganigrama = $_POST["do"];
    echo trim($Organigramas->changePositionNodeOrganigrama($CoordenadaY,$CoordenadaX,$idDetalleOrganigrama));
  }

  if ($op == "sizeChangeNodeOrganigrama") {
    $CoordenadaY = $_POST["y"];
    $CoordenadaX = $_POST["x"];
    $Ancho = $_POST["w"];
    $Altura = $_POST["a"];
    $idDetalleOrganigrama = $_POST["do"];
    echo trim($Organigramas->sizeChangeNodeOrganigrama($CoordenadaY,$CoordenadaX,$Ancho,$Altura,$idDetalleOrganigrama));
  }
 ?>
