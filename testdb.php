<?php require_once "Backend/Postulantes/Postulantes.php"; $p = new Postulantes(); $r = $p->getProcesosPostulacion(base64_encode("1")); print_r($r); ?>
