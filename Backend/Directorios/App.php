<?php 
    include("Directorios.php");
    $Directorios = new Directorios();
    $op = $_POST["op"];

    if ($op == "getDirectorioCorreosTelefonos") {
        echo trim($Directorios->getDirectorioCorreosTelefonos());
    }

    if ($op == "addEmpleadosDirectorioCorreosTelefonos") {
        $idDirectoriosCorreosTelefonos = $_POST["idDirectoriosCorreosTelefonos"];
        $NoEmpleado = $_POST["NoEmpleado"];
        $Email = $_POST["Email"];
        $Telefono = $_POST["Telefono"];
        $MarcacionCorta = $_POST["MarcacionCorta"];
        echo trim($Directorios->addEmpleadosDirectorioCorreosTelefonos($idDirectoriosCorreosTelefonos,$NoEmpleado,$Email,$Telefono,$MarcacionCorta));
    }

    if ($op == "deleteEmpleadosDirectorioCorreosTelefonos") {
        $idDetalleDirectoriosCorreosTelefonos = $_POST["idDetalleDirectoriosCorreosTelefonos"];
        echo trim($Directorios->deleteEmpleadosDirectorioCorreosTelefonos($idDetalleDirectoriosCorreosTelefonos));
    }

    if ($op == "getDirectorioExtensiones") {
        $TiposExtSelected = $_POST["TiposExtSelected"];
        echo trim($Directorios->getDirectorioExtensiones($TiposExtSelected));
    }

    if ($op == "addEmpleadoDirectorioExtensiones") {
        $idDirectorioExtensiones = $_POST["idDirectorioExtensiones"];
        $NoEmpleado = $_POST["NoEmpleado"];
        $Extension = $_POST["Extension"];
        echo trim($Directorios->addEmpleadoDirectorioExtensiones($idDirectorioExtensiones,$NoEmpleado,$Extension));
    }

    if ($op == "deleteEmpleadosDirectorioExtension") {
        $idDetalleDirectorioExtensiones = $_POST["idDetalleDirectorioExtensiones"];
        echo trim($Directorios->deleteEmpleadosDirectorioExtension($idDetalleDirectorioExtensiones));
    }

    if ($op == "updateExtensionEmpleado") {
        $idDetalleDirectorioExtensiones = $_POST["idDetalleDirectorioExtensiones"];
        $Extension = $_POST["Extension"];
        $Directorio = $_POST["Directorio"];
        echo trim($Directorios->updateExtensionEmpleado($idDetalleDirectorioExtensiones,$Extension,$Directorio));
    }

    if ($op == "getSucursalesDisponiblesDirectorio") {
        echo trim($Directorios->getSucursalesDisponiblesDirectorio());
    }

    if ($op == "getEmpleadosSucursalSelected") {
        $IdSucursal = $_POST["IdSucursal"];
        echo trim($Directorios->getEmpleadosSucursalSelected($IdSucursal));
    }

    if ($op == "addSucursalesDirectorio") {
        $IdSucursal = $_POST["IdSucursal"];
        $Direccion = $_POST["Direccion"];
        $Telefono = $_POST["Telefono"];
        $NumRed = $_POST["NumRed"];
        $Correo = $_POST["Correo"];
        $FechaApertura = $_POST["FechaApertura"];
        $MarcacionCorta = $_POST["MarcacionCorta"];
        echo trim($Directorios->addSucursalesDirectorio($IdSucursal,$Direccion,$Telefono,$NumRed,$Correo,$FechaApertura,$MarcacionCorta));
    }

    if ($op == "getDirectorioSucursal") {
        echo trim($Directorios->getDirectorioSucursal());
    }

    if ($op == "updateRegistroDirectorioSucursal") {
        $Direccion = $_POST["Direccion"];
        $Telefono = $_POST["Telefono"];
        $NumRed = $_POST["NumRed"];
        $Correo = $_POST["Correo"];
        $MarcacionCorta = $_POST["MarcacionCorta"];
        $idDirectorioSucursales = $_POST["idDirectorioSucursales"];
        echo trim($Directorios->updateRegistroDirectorioSucursal($Direccion,$Telefono,$NumRed,$Correo,$MarcacionCorta,$idDirectorioSucursales));
    }

    if ($op == "updateRegistroDirectorioCorreosTelefonos") {
        $Email = $_POST["Email"];
        $Telefono = $_POST["Telefono"];
        $idDetalleDirectoriosCorreosTelefonos = $_POST["Registro"];
        $MarcacionCorta = $_POST["MCorta"];
        echo trim($Directorios->updateRegistroDirectorioCorreosTelefonos($Email,$Telefono,$idDetalleDirectoriosCorreosTelefonos,$MarcacionCorta));
    }

    if ($op == "getTiposExtensionesDirectorioExtensiones") {
        echo trim($Directorios->getTiposExtensionesDirectorioExtensiones());
    }
?>