<?php
unset($_COOKIE["NoEmpleado"]);
unset($_COOKIE["nivel"]);
unset($_COOKIE["IdDivision"]);
unset($_COOKIE["IdSucursal"]);
unset($_COOKIE["nombre"]);
unset($_COOKIE["idSPuesto"]);
unset($_COOKIE["sesion"]);
unset($_COOKIE["idCentroCosto"]);
unset($_COOKIE["verificaSesion"]);

// unset($_COOKIE["idCiudadOrg"]);
setcookie("sesion",null, -1, "/");
setcookie("tipo_sesion",null, -1, "/");
setcookie("NoEmpleado",null, -1, "/");
setcookie("nivel",null, -1, "/");
setcookie("IdDivision",null, -1, "/");
setcookie("IdSucursal",null, -1, "/");
setcookie("nombre",null, -1, "/");
setcookie("idSPuesto",null, -1, "/");
setcookie("idCentroCosto",null, -1, "/");
setcookie("verificaSesion",null, -1, "/");
// setcookie("idCiudadOrg",null, -1, "/");

echo '<meta http-equiv="refresh" content="0;url=login.php" />';
 ?>
