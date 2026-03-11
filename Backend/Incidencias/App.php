<?php
include("Incidencias.php");
$obj = new Incidencias();
$op  = $_POST["op"] ?? '';

// ─── Registrar incidencia (con posible subida de archivo) ─────────────────────
if ($op == "registrarIncidencia") {
  $idChecklist      = (int)$_POST["idChecklist"];
  $idTipoIncidencia = isset($_POST["idTipoIncidencia"]) && $_POST["idTipoIncidencia"] !== ''
                      ? (int)$_POST["idTipoIncidencia"] : null;
  $noEmpleado       = $_POST["noEmpleado"];
  $descripcion      = trim($_POST["descripcion"]);
  $evidenciaRuta    = null;

  // Procesar archivo adjunto si existe
  if (isset($_FILES['evidencia']) && $_FILES['evidencia']['error'] === UPLOAD_ERR_OK) {
    $namefile = $_FILES['evidencia']['name'];
    $ext      = strtolower(pathinfo($namefile, PATHINFO_EXTENSION));
    $extValidas = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf'];

    if (in_array($ext, $extValidas)) {
      $carpeta = "../../Archivos/Incidencias/";
      if (!file_exists($carpeta)) {
        mkdir($carpeta, 0777, true);
      }
      // Nombre único: idChecklist_noEmpleado_timestamp.ext
      $nombreArchivo = $idChecklist . "_" . $noEmpleado . "_" . time() . ".$ext";
      $path          = $carpeta . $nombreArchivo;

      if (move_uploaded_file($_FILES['evidencia']['tmp_name'], $path)) {
        $evidenciaRuta = $nombreArchivo;
      }
    } else {
      echo json_encode([
        "Resultado" => false,
        "Msg"       => "Tipo de archivo no permitido. Solo imágenes y PDF."
      ]);
      exit;
    }
  }

  echo trim($obj->registrarIncidencia($idChecklist, $idTipoIncidencia, $noEmpleado, $descripcion, $evidenciaRuta));
}

// ─── Obtener listado de incidencias ──────────────────────────────────────────
if ($op == "getIncidencias") {
  echo trim($obj->getIncidencias());
}
?>
