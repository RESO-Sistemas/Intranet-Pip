<?php
// Backend para registrar incidencias
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $op = $_POST['op'] ?? '';
    if ($op === 'registrarIncidencia') {
        $descripcion = $_POST['descripcion'] ?? '';
        $file = $_FILES['evidencia'] ?? null;
        session_start();
        $noEmpleado = $_SESSION['NoEmpleado'] ?? '';
        if (!$descripcion || !$file || !$noEmpleado) {
            echo json_encode(['Resultado' => false, 'Msg' => 'Datos incompletos']);
            exit;
        }
        $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file['type'], $allowed)) {
            echo json_encode(['Resultado' => false, 'Msg' => 'Solo se permiten imágenes']);
            exit;
        }
        $uploadDir = '../../Archivos/Incidencias/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = uniqid('incidencia_') . '_' . basename($file['name']);
        $filePath = $uploadDir . $fileName;
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            echo json_encode(['Resultado' => false, 'Msg' => 'Error al guardar la evidencia']);
            exit;
        }
        require_once('Incidencias.php');
        $inc = new Incidencias();
        $ok = $inc->registrarIncidencia($descripcion, $fileName, $noEmpleado);
            // Registrar también en el catálogo de tipos de incidencias
            require_once('../TiposIncidencias/TiposIncidencias.php');
            $tipos = new TiposIncidencias();
            // Obtener puesto del usuario
            $idPuesto = isset($_SESSION['idSPuesto']) ? $_SESSION['idSPuesto'] : null;
            // Valores por defecto
            $nombre = $descripcion;
            $severidad = 'Media'; // Puedes ajustar el valor por defecto
            $slaHoras = 2;
            $respCatalogo = $tipos->insertTipoIncidencia($nombre, $severidad, $idPuesto, $slaHoras);
            if ($ok) {
                echo json_encode(['Resultado' => true, 'Msg' => 'Incidencia registrada', 'Evidencia' => $fileName, 'Catalogo' => json_decode($respCatalogo)]);
            } else {
                echo json_encode(['Resultado' => false, 'Msg' => 'Error al registrar en la base de datos']);
            }
        exit;
    }
}
echo json_encode(['Resultado' => false, 'Msg' => 'Operación no válida']);
