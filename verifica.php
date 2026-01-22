<?php
if(isset($_COOKIE["tipo_sesion"])){
  if ($_COOKIE["tipo_sesion"] != "1") {
    echo '<meta http-equiv="refresh" content="0;url=logout.php">';
    die();
  }

};

if(!isset($_COOKIE["sesion"])){
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
};
 ?>
