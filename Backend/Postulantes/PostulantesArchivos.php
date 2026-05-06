<?php
/**
 * PostulantesArchivos.php
 * Clase para manejar archivos de postulantes almacenados como BLOB en MySQL
 * 
 * Tabla: PostulantesArchivos
 * - Almacena CV y Solicitud de Empleo en formato binario
 * - Soporta PDF, JPG, JPEG, PNG
 * - Limite: 20 MB por archivo
 * - Genera tokens encriptados para acceso seguro
 */

if (file_exists("../Conexiones/Conexiones.php")) {
    require_once("../Conexiones/Conexiones.php");
} else {
    if (file_exists("./Conexiones/Conexiones.php")) {
        require_once("./Conexiones/Conexiones.php");
    } else if (file_exists("../Conexiones/Conexiones.php")) {
        require_once("../Conexiones/Conexiones.php");
    } else if (file_exists("../../Conexiones/Conexiones.php")) {
        require_once("../../Conexiones/Conexiones.php");
    } else if (file_exists("././Backend/Conexiones/Conexiones.php")) {
        require_once("././Backend/Conexiones/Conexiones.php");
    }
}

// Cargar configuración de seguridad
if (file_exists("../Configuracion/Security.php")) {
    require_once("../Configuracion/Security.php");
} else if (file_exists("./Configuracion/Security.php")) {
    require_once("./Configuracion/Security.php");
} else if (file_exists("../../Backend/Configuracion/Security.php")) {
    require_once("../../Backend/Configuracion/Security.php");
} else if (file_exists("Backend/Configuracion/Security.php")) {
    require_once("Backend/Configuracion/Security.php");
} else if (file_exists("./Backend/Configuracion/Security.php")) {
    require_once("./Backend/Configuracion/Security.php");
}

class PostulantesArchivos extends Conexiones
{
    // Constantes de configuracion
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
    const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png'];
    const ALLOWED_MIME_TYPES = [
        'application/pdf',
        'application/x-pdf',
        'image/jpeg',
        'image/jpg',
        'image/pjpeg',
        'image/png',
        'image/x-png'
    ];

    /**
     * Valida un archivo antes de guardarlo
     * @param array $file - $_FILES['campo']
     * @return array - ['valido' => bool, 'error' => string|null]
     */
    public function validarArchivo($file)
    {
        // Verificar que el archivo existe y no hay errores
        if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
            $errorMsg = $this->getUploadErrorMessage($file['error'] ?? UPLOAD_ERR_NO_FILE);
            return ['valido' => false, 'error' => $errorMsg];
        }

        // Verificar tamano
        if ($file['size'] > self::MAX_FILE_SIZE) {
            $maxMB = self::MAX_FILE_SIZE / (1024 * 1024);
            return ['valido' => false, 'error' => "El archivo excede el limite de {$maxMB} MB"];
        }
        
        // Verificar que el archivo temporal existe
        if (!file_exists($file['tmp_name'])) {
            return ['valido' => false, 'error' => "El archivo temporal no existe"];
        }

        // Verificar extension
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, self::ALLOWED_EXTENSIONS)) {
            $allowed = implode(', ', self::ALLOWED_EXTENSIONS);
            return ['valido' => false, 'error' => "Tipo de archivo no permitido. Tipos validos: {$allowed}"];
        }

        // Verificar MIME type
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        // No es necesario finfo_close() en PHP 8.5+ (se libera automaticamente)

        // Validacion mixta: si el MIME type no esta en la lista permitida,
        // pero la extension es correcta, hacer validacion adicional
        if (!in_array($mimeType, self::ALLOWED_MIME_TYPES)) {
            // Validacion adicional por firma de archivo (magic bytes)
            $validacionFirma = $this->validarFirmaArchivo($file['tmp_name'], $extension);
            if (!$validacionFirma) {
                error_log("MIME type no permitido: $mimeType para archivo {$file['name']} con extension $extension");
                return ['valido' => false, 'error' => "El contenido del archivo no corresponde al tipo $extension"];
            }
            // Si pasa la validacion de firma, usar el MIME type basado en la extension
            $mimeType = $this->getMimeTypeFromExtension($extension);
        }

        return ['valido' => true, 'error' => null, 'mimeType' => $mimeType];
    }
    
    /**
     * Valida la firma (magic bytes) del archivo
     * @param string $filePath - Ruta al archivo temporal
     * @param string $extension - Extension esperada
     * @return bool - True si la firma coincide con la extension
     */
    private function validarFirmaArchivo($filePath, $extension)
    {
        $handle = fopen($filePath, 'rb');
        if (!$handle) {
            return false;
        }
        
        // Leer los primeros bytes del archivo
        $bytes = fread($handle, 8);
        fclose($handle);
        
        if ($bytes === false || strlen($bytes) < 4) {
            return false;
        }
        
        // Convertir a hexadecimal
        $hex = bin2hex($bytes);
        
        // Validar segun extension
        switch ($extension) {
            case 'pdf':
                // PDF empieza con %PDF (25 50 44 46)
                return substr($hex, 0, 8) === '25504446';
                
            case 'jpg':
            case 'jpeg':
                // JPEG empieza con FF D8 FF
                return substr($hex, 0, 6) === 'ffd8ff';
                
            case 'png':
                // PNG empieza con 89 50 4E 47 0D 0A 1A 0A
                return substr($hex, 0, 16) === '89504e470d0a1a0a';
                
            default:
                return false;
        }
    }
    
    /**
     * Obtiene el MIME type correcto basado en la extension
     * @param string $extension
     * @return string
     */
    private function getMimeTypeFromExtension($extension)
    {
        $mimeMap = [
            'pdf' => 'application/pdf',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png'
        ];
        
        return $mimeMap[$extension] ?? 'application/octet-stream';
    }

    /**
     * Guarda un archivo en la base de datos como BLOB
     * @param int $idPostulanteVacante - ID de la postulacion
     * @param string $tipoArchivo - 'CV' o 'SolicitudEmpleo'
     * @param array $file - $_FILES['campo']
     * @return array - Resultado de la operacion
     */
    public function guardarArchivo($idPostulanteVacante, $tipoArchivo, $file)
    {
        // Validar el archivo primero
        $validacion = $this->validarArchivo($file);
        if (!$validacion['valido']) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => $validacion['error']
            ];
        }

        // Validar tipo de archivo permitido
        if (!in_array($tipoArchivo, ['CV', 'SolicitudEmpleo'])) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Tipo de archivo no reconocido'
            ];
        }

        try {
            // Leer el contenido binario del archivo
            $contenido = file_get_contents($file['tmp_name']);
            if ($contenido === false) {
                return [
                    'Resultado' => false,
                    'Siguiente' => false,
                    'Msg' => 'Error al leer el archivo'
                ];
            }

            $nombreArchivo = basename($file['name']);
            // Sanitizar el nombre del archivo
            $nombreArchivo = preg_replace('/[^a-zA-Z0-9._-]/', '_', $nombreArchivo);
            $contentType = $validacion['mimeType'];
            $tamanoBytes = $file['size'];

            // Verificar si ya existe un archivo de este tipo para esta postulacion
            $existe = $this->verificarArchivoExistente($idPostulanteVacante, $tipoArchivo);

            if ($existe) {
                // Actualizar archivo existente
                $resultado = $this->actualizarArchivo($idPostulanteVacante, $tipoArchivo, $nombreArchivo, $contentType, $contenido, $tamanoBytes);
            } else {
                // Insertar nuevo archivo
                $resultado = $this->insertarArchivo($idPostulanteVacante, $tipoArchivo, $nombreArchivo, $contentType, $contenido, $tamanoBytes);
            }
            
            // Si la operacion fue exitosa, actualizar la URL encriptada en PostulantesVacantes
            if ($resultado['Resultado'] === true) {
                $urlResult = $this->actualizarRutaEncriptada($idPostulanteVacante, $tipoArchivo);
                if ($urlResult['Resultado'] === true) {
                    $resultado['UrlEncriptada'] = $urlResult['Url'];
                }
            }
            
            return $resultado;

        } catch (Exception $e) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Error al guardar el archivo: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Verifica si ya existe un archivo para la postulacion y tipo
     */
    private function verificarArchivoExistente($idPostulanteVacante, $tipoArchivo)
    {
        $idPostulanteVacante = intval($idPostulanteVacante);
        $tipoArchivo = $this->sanitize($tipoArchivo);

        $q = "SELECT IdArchivo FROM PostulantesArchivos 
              WHERE IdPostulanteVacante = $idPostulanteVacante 
              AND TipoArchivo = '$tipoArchivo'";
        
        $resultado = $this->SelectNotClose($q);
        return !empty($resultado);
    }

    /**
     * Inserta un nuevo archivo en la base de datos usando PDO con BLOB
     */
    private function insertarArchivo($idPostulanteVacante, $tipoArchivo, $nombreArchivo, $contentType, $contenido, $tamanoBytes)
    {
        try {
            $q = "INSERT INTO PostulantesArchivos 
                  (IdPostulanteVacante, TipoArchivo, NombreArchivo, ContentType, Contenido, TamanoBytes, FechaCreacion) 
                  VALUES (?, ?, ?, ?, ?, ?, NOW())";
            
            $params = [
                $idPostulanteVacante,
                $tipoArchivo,
                $nombreArchivo,
                $contentType,
                $contenido,
                $tamanoBytes
            ];
            
            $idArchivo = $this->InsertBlobAndGetId($q, $params, 4); // index 4 es el BLOB (Contenido)
            
            if ($idArchivo) {
                return [
                    'Resultado' => true,
                    'Siguiente' => true,
                    'Msg' => 'Archivo guardado correctamente',
                    'IdArchivo' => $idArchivo
                ];
            } else {
                return [
                    'Resultado' => false,
                    'Siguiente' => false,
                    'Msg' => 'Error al guardar el archivo en la base de datos'
                ];
            }
        } catch (Exception $e) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Error al guardar: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Actualiza un archivo existente
     */
    private function actualizarArchivo($idPostulanteVacante, $tipoArchivo, $nombreArchivo, $contentType, $contenido, $tamanoBytes)
    {
        try {
            $q = "UPDATE PostulantesArchivos 
                  SET NombreArchivo = ?, ContentType = ?, Contenido = ?, TamanoBytes = ?, FechaActualizacion = NOW()
                  WHERE IdPostulanteVacante = ? AND TipoArchivo = ?";
            
            $params = [
                $nombreArchivo,
                $contentType,
                $contenido,
                $tamanoBytes,
                $idPostulanteVacante,
                $tipoArchivo
            ];
            
            $resultado = $this->UpdateBlob($q, $params, 2); // index 2 es el BLOB (Contenido)
            
            if ($resultado) {
                return [
                    'Resultado' => true,
                    'Siguiente' => true,
                    'Msg' => 'Archivo actualizado correctamente'
                ];
            } else {
                return [
                    'Resultado' => false,
                    'Siguiente' => false,
                    'Msg' => 'Error al actualizar el archivo'
                ];
            }
        } catch (Exception $e) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Error al actualizar: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Metodo para insertar con BLOB y obtener el ID generado
     */
    private function InsertBlobAndGetId($q, $params, $lobIndex)
    {
        try {
            $dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
            $options = [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ];
            $dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
            
            $stmt = $dbh->prepare($q);
            
            // Bind de todos los parametros
            for ($i = 0; $i < count($params); $i++) {
                $paramIndex = $i + 1; // PDO usa indices desde 1
                if ($i == $lobIndex) {
                    // Para el BLOB usamos PDO::PARAM_LOB
                    $stmt->bindParam($paramIndex, $params[$i], PDO::PARAM_LOB);
                } else {
                    $stmt->bindValue($paramIndex, $params[$i]);
                }
            }
            
            $stmt->execute();
            $lastId = $dbh->lastInsertId();
            $dbh = null;
            return $lastId;
        } catch (PDOException $e) {
            error_log('PDOException InsertBlobAndGetId - ' . $e->getMessage(), 0);
            return false;
        }
    }

    /**
     * Metodo para actualizar con BLOB
     */
    private function UpdateBlob($q, $params, $lobIndex)
    {
        try {
            $dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
            $options = [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ];
            $dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
            
            $stmt = $dbh->prepare($q);
            
            // Bind de todos los parametros
            for ($i = 0; $i < count($params); $i++) {
                $paramIndex = $i + 1;
                if ($i == $lobIndex) {
                    $stmt->bindParam($paramIndex, $params[$i], PDO::PARAM_LOB);
                } else {
                    $stmt->bindValue($paramIndex, $params[$i]);
                }
            }
            
            $resultado = $stmt->execute();
            $dbh = null;
            return $resultado;
        } catch (PDOException $e) {
            error_log('PDOException UpdateBlob - ' . $e->getMessage(), 0);
            return false;
        }
    }

    /**
     * Obtiene un archivo de la base de datos
     * @param int $idPostulanteVacante - ID de la postulacion
     * @param string $tipoArchivo - 'CV' o 'SolicitudEmpleo'
     * @return array - Datos del archivo o error
     */
    public function obtenerArchivo($idPostulanteVacante, $tipoArchivo)
    {
        $idPostulanteVacante = intval($idPostulanteVacante);
        $tipoArchivo = $this->sanitize($tipoArchivo);

        if (!in_array($tipoArchivo, ['CV', 'SolicitudEmpleo'])) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Tipo de archivo no valido'
            ];
        }

        try {
            $dsn = "mysql:host=162.240.213.3;dbname=klynet_datosdemo;charset=utf8mb4";
            $options = [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ];
            $dbh = new PDO($dsn, 'klynet_usrdatosdemo', 'Us3rK1yns2@25', $options);
            
            $q = "SELECT IdArchivo, NombreArchivo, ContentType, Contenido, TamanoBytes 
                  FROM PostulantesArchivos 
                  WHERE IdPostulanteVacante = ? AND TipoArchivo = ?";
            
            $stmt = $dbh->prepare($q);
            $stmt->execute([$idPostulanteVacante, $tipoArchivo]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $dbh = null;
            
            if ($row) {
                return [
                    'Resultado' => true,
                    'Siguiente' => true,
                    'Data' => [
                        'IdArchivo' => $row['IdArchivo'],
                        'NombreArchivo' => $row['NombreArchivo'],
                        'ContentType' => $row['ContentType'],
                        'Contenido' => $row['Contenido'],
                        'TamanoBytes' => $row['TamanoBytes']
                    ]
                ];
            } else {
                return [
                    'Resultado' => false,
                    'Siguiente' => false,
                    'Msg' => 'Archivo no encontrado'
                ];
            }
        } catch (PDOException $e) {
            error_log('PDOException obtenerArchivo - ' . $e->getMessage(), 0);
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Error al obtener el archivo'
            ];
        }
    }

    /**
     * Obtiene metadatos de archivos de una postulacion (sin el contenido binario)
     * @param int $idPostulanteVacante
     * @return array
     */
    public function obtenerMetadatosArchivos($idPostulanteVacante)
    {
        $idPostulanteVacante = intval($idPostulanteVacante);

        $q = "SELECT IdArchivo, TipoArchivo, NombreArchivo, ContentType, TamanoBytes, FechaCreacion, FechaActualizacion 
              FROM PostulantesArchivos 
              WHERE IdPostulanteVacante = $idPostulanteVacante";
        
        $resultado = $this->SelectNotClose($q);
        
        return [
            'Resultado' => true,
            'Siguiente' => true,
            'Data' => $resultado
        ];
    }

    /**
     * Elimina un archivo de la base de datos
     * @param int $idPostulanteVacante
     * @param string $tipoArchivo
     * @return array
     */
    public function eliminarArchivo($idPostulanteVacante, $tipoArchivo)
    {
        $idPostulanteVacante = intval($idPostulanteVacante);
        $tipoArchivo = $this->sanitize($tipoArchivo);

        if (!in_array($tipoArchivo, ['CV', 'SolicitudEmpleo'])) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Tipo de archivo no valido'
            ];
        }

        $q = "DELETE FROM PostulantesArchivos 
              WHERE IdPostulanteVacante = $idPostulanteVacante 
              AND TipoArchivo = '$tipoArchivo'";
        
        $resultado = $this->SelectNotClose($q);
        
        return [
            'Resultado' => true,
            'Siguiente' => true,
            'Msg' => 'Archivo eliminado correctamente'
        ];
    }

    /**
     * Elimina todos los archivos de una postulacion
     * @param int $idPostulanteVacante
     * @return array
     */
    public function eliminarTodosArchivos($idPostulanteVacante)
    {
        $idPostulanteVacante = intval($idPostulanteVacante);

        $q = "DELETE FROM PostulantesArchivos WHERE IdPostulanteVacante = $idPostulanteVacante";
        $resultado = $this->SelectNotClose($q);
        
        return [
            'Resultado' => true,
            'Siguiente' => true,
            'Msg' => 'Archivos eliminados correctamente'
        ];
    }

    // ==========================================
    // REUTILIZACIÓN DE ARCHIVOS (POSTULACIÓN AUTOMÁTICA)
    // ==========================================

    /**
     * Verifica si un postulante tiene archivos (CV o SolicitudEmpleo) de postulaciones anteriores
     * @param string $curp - CURP del postulante
     * @return array - ['tieneCV' => bool, 'tieneSE' => bool]
     */
    public function verificarArchivosPorCurp($curp)
    {
        try {
            $curp = $this->sanitize($curp);

            if (empty($curp)) {
                return [
                    'Resultado' => false,
                    'Msg' => 'CURP requerida.'
                ];
            }

            $q = "SELECT pa.TipoArchivo
                  FROM PostulantesArchivos pa
                  INNER JOIN PostulantesVacantes pv ON pv.IdPostulanteVacante = pa.IdPostulanteVacante
                  INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
                  WHERE UPPER(p.CURP) = UPPER('$curp')
                  GROUP BY pa.TipoArchivo";

            $resultado = $this->SelectNotClose($q);

            $tieneCV = false;
            $tieneSE = false;

            if (!empty($resultado)) {
                foreach ($resultado as $row) {
                    if ($row['TipoArchivo'] === 'CV') $tieneCV = true;
                    if ($row['TipoArchivo'] === 'SolicitudEmpleo') $tieneSE = true;
                }
            }

            return [
                'Resultado' => true,
                'tieneCV' => $tieneCV,
                'tieneSE' => $tieneSE
            ];
        } catch (\Exception $e) {
            error_log("Error en verificarArchivosPorCurp: " . $e->getMessage());
            return [
                'Resultado' => false,
                'Msg' => 'Error al verificar archivos.'
            ];
        }
    }

    /**
     * Copia el archivo más reciente de un tipo (CV/SolicitudEmpleo) 
     * de postulaciones anteriores a una nueva postulación
     * @param string $curp - CURP del postulante
     * @param int $idPostulanteVacante - ID de la nueva postulación
     * @param string $tipoArchivo - 'CV' o 'SolicitudEmpleo'
     * @return array - Resultado de la operación
     */
    public function copiarUltimoArchivoPorCurp($curp, $idPostulanteVacante, $tipoArchivo)
    {
        try {
            $curp = $this->sanitize($curp);
            $idPostulanteVacante = intval($idPostulanteVacante);

            if (!in_array($tipoArchivo, ['CV', 'SolicitudEmpleo'])) {
                return [
                    'Resultado' => false,
                    'Msg' => 'Tipo de archivo no válido.'
                ];
            }

            // Verificar si ya existe un archivo de este tipo en la postulación destino
            if ($this->verificarArchivoExistente($idPostulanteVacante, $tipoArchivo)) {
                return [
                    'Resultado' => true,
                    'Msg' => 'Ya existe un archivo de este tipo en la postulación.'
                ];
            }

            // Copiar el archivo más reciente usando INSERT ... SELECT para preservar el BLOB
            $q = "INSERT IGNORE INTO PostulantesArchivos 
                  (IdPostulanteVacante, TipoArchivo, NombreArchivo, ContentType, Contenido, TamanoBytes, FechaCreacion)
                  SELECT $idPostulanteVacante, pa.TipoArchivo, pa.NombreArchivo, pa.ContentType, pa.Contenido, pa.TamanoBytes, NOW()
                  FROM PostulantesArchivos pa
                  INNER JOIN PostulantesVacantes pv ON pv.IdPostulanteVacante = pa.IdPostulanteVacante
                  INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
                  WHERE UPPER(p.CURP) = UPPER('$curp')
                    AND pa.TipoArchivo = '$tipoArchivo'
                  ORDER BY pa.FechaCreacion DESC
                  LIMIT 1";

            $resultado = $this->SelectNotClose($q);

            if ($resultado !== false) {
                // Actualizar la URL encriptada en PostulantesVacantes
                $this->actualizarRutaEncriptada($idPostulanteVacante, $tipoArchivo);

                return [
                    'Resultado' => true,
                    'Msg' => 'Archivo copiado correctamente.'
                ];
            }

            return [
                'Resultado' => false,
                'Msg' => 'No se encontró un archivo previo para copiar.'
            ];
        } catch (\Exception $e) {
            error_log("Error en copiarUltimoArchivoPorCurp: " . $e->getMessage());
            return [
                'Resultado' => false,
                'Msg' => 'Error al copiar archivo.'
            ];
        }
    }

    /**
     * Encripta un token con AES-256-CBC
     * @param string $data - Datos a encriptar (formato: idPostulanteVacante|tipoArchivo)
     * @return string|false - Token encriptado en base64 URL-safe o false si falla
     */
    public function encriptarToken($data)
    {
        try {
            if (!class_exists('Security')) {
                error_log('Security class not found for encryption');
                return false;
            }
            
            $key = Security::getEncryptionKey();
            $iv = openssl_random_pseudo_bytes(Security::IV_LENGTH);
            
            $encrypted = openssl_encrypt(
                $data,
                Security::ENCRYPTION_METHOD,
                $key,
                OPENSSL_RAW_DATA,
                $iv
            );
            
            if ($encrypted === false) {
                error_log('Encryption failed');
                return false;
            }
            
            // Combinar IV + datos encriptados y codificar en base64 URL-safe
            $result = base64_encode($iv . $encrypted);
            // Hacer el base64 URL-safe
            $result = strtr($result, '+/', '-_');
            $result = rtrim($result, '=');
            
            return $result;
        } catch (Exception $e) {
            error_log('Exception in encriptarToken: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Desencripta un token AES-256-CBC
     * @param string $encryptedToken - Token encriptado en base64 URL-safe
     * @return string|false - Datos desencriptados o false si falla
     */
    public function desencriptarToken($encryptedToken)
    {
        try {
            if (!class_exists('Security')) {
                error_log('Security class not found for decryption');
                return false;
            }
            
            // Convertir de base64 URL-safe a base64 normal
            $encryptedToken = strtr($encryptedToken, '-_', '+/');
            $padding = strlen($encryptedToken) % 4;
            if ($padding) {
                $encryptedToken .= str_repeat('=', 4 - $padding);
            }
            
            $decoded = base64_decode($encryptedToken, true);
            if ($decoded === false) {
                error_log('Base64 decode failed');
                return false;
            }
            
            $ivLength = Security::IV_LENGTH;
            if (strlen($decoded) < $ivLength) {
                error_log('Invalid encrypted data length');
                return false;
            }
            
            $iv = substr($decoded, 0, $ivLength);
            $encrypted = substr($decoded, $ivLength);
            
            $key = Security::getEncryptionKey();
            $decrypted = openssl_decrypt(
                $encrypted,
                Security::ENCRYPTION_METHOD,
                $key,
                OPENSSL_RAW_DATA,
                $iv
            );
            
            if ($decrypted === false) {
                error_log('Decryption failed');
                return false;
            }
            
            return $decrypted;
        } catch (Exception $e) {
            error_log('Exception in desencriptarToken: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Genera una URL encriptada para acceder a un archivo
     * @param int $idPostulanteVacante
     * @param string $tipoArchivo - 'CV' o 'SolicitudEmpleo'
     * @return string|false - URL con token encriptado o false si falla
     */
    public function generarUrlEncriptada($idPostulanteVacante, $tipoArchivo)
    {
        $data = "$idPostulanteVacante|$tipoArchivo";
        $token = $this->encriptarToken($data);
        
        if ($token === false) {
            return false;
        }
        
        return "Backend/Postulantes/App.php?op=viewArchivo&token=$token";
    }
    
    /**
     * Actualiza la columna RutaCV o RutaSolicitudEmpleo con la URL encriptada
     * @param int $idPostulanteVacante
     * @param string $tipoArchivo - 'CV' o 'SolicitudEmpleo'
     * @return array - Resultado de la operacion
     */
    public function actualizarRutaEncriptada($idPostulanteVacante, $tipoArchivo)
    {
        $url = $this->generarUrlEncriptada($idPostulanteVacante, $tipoArchivo);
        
        if ($url === false) {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Error al generar URL encriptada'
            ];
        }
        
        $idPostulanteVacante = intval($idPostulanteVacante);
        $url = $this->sanitize($url);
        
        // Determinar que columna actualizar
        $columna = ($tipoArchivo === 'CV') ? 'RutaCV' : 'RutaSolicitudEmpleo';
        
        $q = "UPDATE PostulantesVacantes 
              SET $columna = '$url' 
              WHERE IdPostulanteVacante = $idPostulanteVacante";
        
        $resultado = $this->SelectNotClose($q);
        
        if ($resultado !== false) {
            return [
                'Resultado' => true,
                'Siguiente' => true,
                'Msg' => 'Ruta actualizada correctamente',
                'Url' => $url
            ];
        } else {
            return [
                'Resultado' => false,
                'Siguiente' => false,
                'Msg' => 'Error al actualizar la ruta'
            ];
        }
    }

    /**
     * Obtiene el mensaje de error de upload
     */
    private function getUploadErrorMessage($errorCode)
    {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'El archivo excede el tamano maximo permitido por el servidor',
            UPLOAD_ERR_FORM_SIZE => 'El archivo excede el tamano maximo permitido por el formulario',
            UPLOAD_ERR_PARTIAL => 'El archivo fue subido parcialmente',
            UPLOAD_ERR_NO_FILE => 'No se selecciono ningun archivo',
            UPLOAD_ERR_NO_TMP_DIR => 'Falta la carpeta temporal del servidor',
            UPLOAD_ERR_CANT_WRITE => 'Error al escribir el archivo en el disco',
            UPLOAD_ERR_EXTENSION => 'Una extension de PHP detuvo la subida del archivo'
        ];

        return $errors[$errorCode] ?? 'Error desconocido al subir el archivo';
    }
    
    /**
     * Sanitiza una cadena para uso seguro en queries SQL
     * @param string $string - Cadena a sanitizar
     * @return string - Cadena sanitizada
     */
    private function sanitize($string)
    {
        // Usar mysqli_real_escape_string si esta disponible
        if (function_exists('mysqli_real_escape_string')) {
            // Crear una conexion temporal para sanitizar
            $mysqli = new mysqli('162.240.213.3', 'klynet_usrdatosdemo', 'Us3rK1yns2@25', 'klynet_datosdemo');
            if (!$mysqli->connect_error) {
                $result = $mysqli->real_escape_string($string);
                $mysqli->close();
                return $result;
            }
        }
        
        // Fallback: escapar caracteres peligrosos manualmente
        return addslashes($string);
    }
}

