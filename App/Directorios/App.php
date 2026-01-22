<?php
    include("Directorios.php");
    $Directorios = new Directorios();
    $op = $_POST["op"];

    if ($op == "getDirectorioCorreosTelefonos") {
        echo trim($Directorios->getDirectorioCorreosTelefonos());
    }

    // if ($op == "getDirectorioExtensiones") {
    //     echo trim($Directorios->getDirectorioExtensiones());
    // }

    if ($op == "getDirectorioSucursal") {
        echo trim($Directorios->getDirectorioSucursal());
    }

    if ($op == "getDirectorioExtensiones") {
        // $TiposExtSelected = $_POST["TiposExtSelected"];
        echo trim($Directorios->getDirectorioExtensiones());
    }

    if ($op == "getSucursalesDisponiblesDirectorio") {
        echo trim($Directorios->getSucursalesDisponiblesDirectorio());
    }

    if ($op == "getEmpleadosSucursalSelected") {
        $IdSucursal = $_POST["IdSucursal"];
        echo trim($Directorios->getEmpleadosSucursalSelected($IdSucursal));
    }

    if ($op == "getTiposExtensionesDirectorioExtensiones") {
        echo trim($Directorios->getTiposExtensionesDirectorioExtensiones());
    }
?>
