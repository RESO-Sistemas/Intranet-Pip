<?php
/**
 * CodigosPostales.php
 * Servicio para consultar códigos postales desde la base de datos XML de SEPOMEX
 * 
 * Estructura del XML:
 * - d_codigo: Código Postal (5 dígitos)
 * - d_asenta: Nombre del asentamiento/colonia
 * - d_tipo_asenta: Tipo de asentamiento
 * - D_mnpio: Nombre del Municipio
 * - d_estado: Nombre del Estado
 * - d_ciudad: Nombre de la Ciudad
 */

class CodigosPostales {
    
    private $xmlPath;
    private $cacheFile;
    private $cacheExpiration = 86400; // 24 horas
    
    public function __construct() {
        // Ruta al archivo XML
        $this->xmlPath = dirname(__DIR__, 2) . '/resources/CPs MEXICO.xml';
        $this->cacheFile = dirname(__DIR__, 2) . '/resources/cache_cp.json';
        
        if (!file_exists($this->xmlPath)) {
            throw new Exception("Archivo XML de códigos postales no encontrado");
        }
    }
    
    /**
     * Consulta información de un código postal
     * @param string $codigoPostal Código postal de 5 dígitos
     * @return array|null Información del CP o null si no existe
     */
    public function consultarCodigoPostal($codigoPostal) {
        // Validar formato
        if (!preg_match('/^\d{5}$/', $codigoPostal)) {
            return null;
        }
        
        // Verificar cache
        $cached = $this->getCached($codigoPostal);
        if ($cached !== null) {
            return $cached;
        }
        
        // Consultar XML
        $resultado = $this->buscarEnXML($codigoPostal);
        
        // Guardar en cache si se encontró
        if ($resultado !== null) {
            $this->saveToCache($codigoPostal, $resultado);
        }
        
        return $resultado;
    }
    
    /**
     * Busca el código postal en el XML usando XMLReader para eficiencia
     * @param string $codigoPostal
     * @return array|null
     */
    private function buscarEnXML($codigoPostal) {
        $colonias = [];
        $estado = null;
        $municipio = null;
        
        // Suprimir warnings de XML (namespaces no válidos)
        libxml_use_internal_errors(true);
        
        // Usar XMLReader para leer el archivo sin cargar todo en memoria
        $reader = new XMLReader();
        
        // Abrir con opciones para ignorar namespaces problemáticos
        if (!$reader->open($this->xmlPath, 'UTF-8', LIBXML_NOWARNING | LIBXML_NOERROR)) {
            libxml_clear_errors();
            return null;
        }
        
        $dentroDeTabla = false;
        $registroActual = [];
        $elementoActual = '';
        
        while (@$reader->read()) {
            $nodeType = $reader->nodeType;
            $nodeName = $reader->name;
            
            // Elemento de apertura
            if ($nodeType == XMLReader::ELEMENT) {
                if ($nodeName === 'table') {
                    $dentroDeTabla = true;
                    $registroActual = [];
                } else if ($dentroDeTabla && $nodeName !== 'table') {
                    $elementoActual = $nodeName;
                }
            }
            
            // Contenido de texto
            if ($nodeType == XMLReader::TEXT && $dentroDeTabla && $elementoActual !== '') {
                $registroActual[$elementoActual] = trim($reader->value);
            }
            
            // Elemento de cierre
            if ($nodeType == XMLReader::END_ELEMENT && $nodeName === 'table') {
                $dentroDeTabla = false;
                
                // Verificar si este registro coincide con el CP buscado
                if (isset($registroActual['d_codigo']) && $registroActual['d_codigo'] === $codigoPostal) {
                    // Guardar estado y municipio (son iguales para todo el CP)
                    if ($estado === null && isset($registroActual['d_estado'])) {
                        $estado = $registroActual['d_estado'];
                    }
                    if ($municipio === null && isset($registroActual['D_mnpio'])) {
                        $municipio = $registroActual['D_mnpio'];
                    }
                    
                    // Agregar colonia si no está duplicada
                    if (isset($registroActual['d_asenta'])) {
                        $colonia = trim($registroActual['d_asenta']);
                        if ($colonia !== '' && !in_array($colonia, $colonias)) {
                            $colonias[] = $colonia;
                        }
                    }
                }
                
                $registroActual = [];
                $elementoActual = '';
            }
        }
        
        $reader->close();
        libxml_clear_errors();
        
        // Si se encontraron resultados, retornar
        if ($estado !== null && count($colonias) > 0) {
            return [
                'estado' => $estado,
                'municipio' => $municipio,
                'colonias' => $colonias
            ];
        }
        
        return null;
    }
    
    /**
     * Obtiene resultado del cache si existe y no ha expirado
     * @param string $codigoPostal
     * @return array|null
     */
    private function getCached($codigoPostal) {
        if (!file_exists($this->cacheFile)) {
            return null;
        }
        
        $cache = json_decode(file_get_contents($this->cacheFile), true);
        if (!is_array($cache)) {
            return null;
        }
        
        if (isset($cache[$codigoPostal])) {
            $item = $cache[$codigoPostal];
            
            // Verificar si no ha expirado
            if (isset($item['timestamp']) && (time() - $item['timestamp']) < $this->cacheExpiration) {
                return $item['data'];
            }
        }
        
        return null;
    }
    
    /**
     * Guarda resultado en cache
     * @param string $codigoPostal
     * @param array $data
     */
    private function saveToCache($codigoPostal, $data) {
        $cache = [];
        
        // Cargar cache existente
        if (file_exists($this->cacheFile)) {
            $cacheContent = file_get_contents($this->cacheFile);
            $cache = json_decode($cacheContent, true);
            if (!is_array($cache)) {
                $cache = [];
            }
        }
        
        // Agregar nuevo item
        $cache[$codigoPostal] = [
            'timestamp' => time(),
            'data' => $data
        ];
        
        // Limpiar items expirados (mantener solo últimos 1000)
        if (count($cache) > 1000) {
            // Ordenar por timestamp y mantener los más recientes
            uasort($cache, function($a, $b) {
                return $b['timestamp'] - $a['timestamp'];
            });
            $cache = array_slice($cache, 0, 1000, true);
        }
        
        // Guardar cache
        file_put_contents($this->cacheFile, json_encode($cache));
    }
}
