<?php
/**
 * PostulantesArchivosIbero — Gestión de archivos BLOB de postulantes Ibero.
 */
if (file_exists(__DIR__ . "/../Conexiones/Conexiones.php")) {
    require_once(__DIR__ . "/../Conexiones/Conexiones.php");
}

class PostulantesArchivosIbero extends Conexiones
{
    private $maxBytes    = 20971520; // 20MB
    private $tiposPermitidos = ['application/pdf','image/jpeg','image/jpg','image/png'];
    private $extensiones    = ['pdf','jpg','jpeg','png'];

    function validarArchivo($file) {
        if (!$file || $file['error'] !== UPLOAD_ERR_OK)
            return ['valido'=>false,'error'=>'Error al subir el archivo.'];
        if ($file['size'] > $this->maxBytes)
            return ['valido'=>false,'error'=>'El archivo excede el límite de 20MB.'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, $this->extensiones))
            return ['valido'=>false,'error'=>"Extensión no permitida ($ext). Use PDF, JPG o PNG."];
        return ['valido'=>true];
    }

    function guardarArchivo($IdPostulanteVacante, $tipoArchivo, $file) {
        try {
            $id = intval($IdPostulanteVacante);
            $tipo = in_array($tipoArchivo, ['CV','SolicitudEmpleo']) ? $tipoArchivo : 'CV';
            $contenido = file_get_contents($file['tmp_name']);
            $nombre    = htmlspecialchars(basename($file['name']), ENT_QUOTES, 'UTF-8');
            $ct        = $file['type'];
            $bytes     = $file['size'];

            // Eliminar anterior si existe
            $this->ProcedureExec("DELETE FROM PostulantesArchivosIbero WHERE IdPostulanteVacante=$id AND TipoArchivo='$tipo'");

            $stmt_q = "INSERT INTO PostulantesArchivosIbero (IdPostulanteVacante,TipoArchivo,NombreArchivo,ContentType,TamanoBytes,Contenido)
                       VALUES (?,?,?,?,?,?)";
            $newId = $this->InsertWithLob($stmt_q, [$id,$tipo,$nombre,$ct,$bytes,$contenido], 5);
            if ($newId) return ['Resultado'=>true,'Msg'=>'Archivo guardado.'];
            return ['Resultado'=>false,'Msg'=>'Error al guardar el archivo.'];
        } catch(\Exception $e) {
            return ['Resultado'=>false,'Msg'=>$e->getMessage()];
        }
    }

    function obtenerMetadatosArchivos($IdPostulanteVacante) {
        $id = intval($IdPostulanteVacante);
        $r = $this->Select("SELECT IdArchivo, TipoArchivo, NombreArchivo, ContentType, TamanoBytes, FechaRegistro
                            FROM PostulantesArchivosIbero WHERE IdPostulanteVacante=$id ORDER BY TipoArchivo ASC");
        return ['Resultado'=>true,'Data'=>$r];
    }

    function obtenerArchivo($IdPostulanteVacante, $tipoArchivo) {
        $id   = intval($IdPostulanteVacante);
        $tipo = $this->sanitize($tipoArchivo);
        $r = $this->SelectWithLob(
            "SELECT NombreArchivo, ContentType, TamanoBytes, Contenido FROM PostulantesArchivosIbero
             WHERE IdPostulanteVacante=$id AND TipoArchivo='$tipo' LIMIT 1"
        );
        if ($r) return ['Resultado'=>true,'Data'=>['NombreArchivo'=>$r['NombreArchivo'],'ContentType'=>$r['ContentType'],'TamanoBytes'=>$r['TamanoBytes'],'Contenido'=>$r['Contenido']]];
        return ['Resultado'=>false,'Msg'=>'Archivo no encontrado.'];
    }

    function eliminarArchivo($IdPostulanteVacante, $tipoArchivo) {
        $id   = intval($IdPostulanteVacante);
        $tipo = $this->sanitize($tipoArchivo);
        $this->ProcedureExec("DELETE FROM PostulantesArchivosIbero WHERE IdPostulanteVacante=$id AND TipoArchivo='$tipo'");
        return ['Resultado'=>true,'Msg'=>'Archivo eliminado.'];
    }

    function encriptarToken($data, $expSeconds=3600) {
        $payload = $data . '|' . (time() + $expSeconds);
        return base64_encode($payload);
    }

    function desencriptarToken($token) {
        $decoded = base64_decode($token, true);
        if ($decoded === false) return false;
        $parts = explode('|', $decoded);
        if (count($parts) < 2) return false;
        $exp = intval(array_pop($parts));
        if (time() > $exp) return false;
        return implode('|', $parts);
    }

    function generarTokenDescarga($IdPostulanteVacante, $tipoArchivo) {
        return $this->encriptarToken($IdPostulanteVacante . '|' . $tipoArchivo);
    }
}
?>
