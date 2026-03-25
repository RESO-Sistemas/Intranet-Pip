# Sistema de Consulta de Códigos Postales SEPOMEX

## Descripción

Este sistema permite la consulta automática de códigos postales mexicanos usando la base de datos oficial del Servicio Postal Mexicano (SEPOMEX), almacenada localmente en formato XML.

## Archivos del Sistema

### 1. Base de Datos
- **`resources/CPs MEXICO.xml`** - Base de datos oficial de SEPOMEX con todos los códigos postales de México

### 2. Backend PHP
- **`Backend/Configuracion/CodigosPostales.php`** - Clase para consultar el XML de códigos postales
- **`Backend/Postulantes/App.php`** - Endpoint API: `consultarCodigoPostal`

### 3. Frontend
- **`BolsaDeTrabajo.php`** - Formulario de postulación con campos de dirección SEPOMEX
- **`scripts/BolsaDeTrabajo.js`** - Lógica JavaScript para consulta automática

## Estructura del XML

Cada registro en el XML contiene:

| Campo | Descripción |
|-------|-------------|
| `d_codigo` | Código Postal (5 dígitos) |
| `d_asenta` | Nombre del asentamiento/colonia |
| `d_tipo_asenta` | Tipo de asentamiento |
| `D_mnpio` | Nombre del Municipio |
| `d_estado` | Nombre del Estado |
| `d_ciudad` | Nombre de la Ciudad |

## Cómo Funciona

### Flujo de Consulta

1. **Usuario ingresa código postal** (5 dígitos) en el formulario
2. **JavaScript detecta** cuando se completan 5 dígitos
3. **Consulta automática** al endpoint PHP: `Backend/Postulantes/App.php?op=consultarCodigoPostal&cp=XXXXX`
4. **PHP busca en XML** usando XMLReader (eficiente, no carga todo en memoria)
5. **Resultado en cache** se guarda en `resources/cache_cp.json` por 24 horas
6. **Retorna JSON**:
   ```json
   {
     "Resultado": true,
     "Data": {
       "estado": "Tamaulipas",
       "municipio": "Matamoros",
       "colonias": ["Centro", "Jardin", "Moderna", ...]
     }
   }
   ```
7. **Frontend auto-llena**:
   - Estado (readonly)
   - Municipio (readonly)
   - Colonia (dropdown con opciones)

### Cache System

- Los resultados se almacenan en `resources/cache_cp.json`
- Duración: 24 horas
- Límite: últimos 1000 códigos consultados
- Mejora significativa de rendimiento para CPs frecuentes

## Endpoints API

### Consultar Código Postal

**URL:** `Backend/Postulantes/App.php`  
**Método:** POST o GET  
**Parámetros:**
- `op` = "consultarCodigoPostal"
- `cp` = Código postal de 5 dígitos

**Respuesta Exitosa:**
```json
{
  "Resultado": true,
  "Data": {
    "estado": "Tamaulipas",
    "municipio": "Matamoros",
    "colonias": ["Centro", "Jardin", "Moderna"]
  }
}
```

**Respuesta Error:**
```json
{
  "Resultado": false,
  "Msg": "Código postal no encontrado en la base de datos."
}
```

## Ejemplos de Prueba

### Códigos Postales de Ejemplo

| CP | Estado | Municipio | Ejemplo |
|-----|---------|-----------|---------|
| 87300 | Tamaulipas | Matamoros | Centro de Matamoros |
| 06000 | Ciudad de México | Cuauhtémoc | Centro Histórico |
| 44100 | Jalisco | Guadalajara | Centro de Guadalajara |
| 64000 | Nuevo León | Monterrey | Centro de Monterrey |

### Probar con cURL

```bash
# Usando POST
curl -X POST "http://localhost/Intranet-Pip/Backend/Postulantes/App.php" \
  -d "op=consultarCodigoPostal&cp=87300"

# Usando GET
curl "http://localhost/Intranet-Pip/Backend/Postulantes/App.php?op=consultarCodigoPostal&cp=87300"
```

### Probar en JavaScript (Consola del Navegador)

```javascript
// En la página BolsaDeTrabajo.php, abre la consola y ejecuta:
consultarCodigoPostal('87300').then(resultado => {
    console.log('Resultado:', resultado);
});
```

## Campos del Formulario

### Orden de los Campos
1. **Nombre** - Input manual
2. **Apellido Paterno / Materno** - Input manual
3. **CURP** - Input manual
4. **Teléfono / Correo** - Input manual
5. **Código Postal** ⭐ - Input manual (5 dígitos, solo números)
6. **Estado** 🔒 - Auto-llenado (readonly)
7. **Municipio** 🔒 - Auto-llenado (readonly)
8. **Colonia** ⭐ - Dropdown auto-poblado (usuario selecciona)
9. **Calle y Número** - Input manual
10. **Archivos** - CV y/o Solicitud
11. **Observaciones** - Textarea opcional

### Concatenación de Dirección

Al enviar el formulario, todos los campos de dirección se concatenan automáticamente:

**Formato:**
```
Calle #123, Col. Nombre Colonia, C.P. 12345, Municipio, Estado
```

**Ejemplo:**
```
Calle Morelos #456, Col. Centro, C.P. 87300, Matamoros, Tamaulipas
```

Este valor se envía en el campo `Direccion` al backend.

## Rendimiento

### Optimizaciones Implementadas

1. **XMLReader** - Lee el XML sin cargarlo completo en memoria
2. **Cache JSON** - Almacena resultados por 24 horas
3. **Búsqueda eficiente** - Para al encontrar todos los registros del CP
4. **Cache en frontend** - Evita consultas duplicadas en la sesión

### Tiempos Estimados

- **Primera consulta:** 1-3 segundos (búsqueda en XML)
- **Consultas en cache:** < 100ms
- **Tamaño del XML:** ~50 MB
- **Registros totales:** ~150,000

## Mantenimiento

### Actualizar Base de Datos SEPOMEX

1. Descargar XML actualizado desde: https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx
2. Reemplazar archivo: `resources/CPs MEXICO.xml`
3. Eliminar cache: `resources/cache_cp.json`
4. Listo - el sistema usará la nueva base de datos

### Limpiar Cache

```bash
# Eliminar archivo de cache
rm resources/cache_cp.json
```

O desde PHP:
```php
unlink(dirname(__DIR__) . '/resources/cache_cp.json');
```

## Troubleshooting

### Error: "Archivo XML no encontrado"
- Verificar que existe: `resources/CPs MEXICO.xml`
- Verificar permisos de lectura del archivo

### Error: "Código postal no encontrado"
- Verificar que el CP existe en la base de datos SEPOMEX
- Algunos CPs rurales pueden no estar en la base

### Rendimiento lento
- Verificar tamaño del XML (debe ser ~50MB)
- Revisar si el cache está funcionando (`resources/cache_cp.json` debe crearse)
- Verificar permisos de escritura en carpeta `resources/`

### Cache no funciona
- Verificar permisos de escritura en `resources/cache_cp.json`
- Revisar logs de PHP para errores de JSON

## Notas Importantes

⚠️ **El código postal es OBLIGATORIO** - No hay opción de ingreso manual de dirección

✅ **100% Local** - No depende de APIs externas, funciona sin internet

🚀 **Rápido** - Sistema de cache mantiene respuestas instantáneas

📦 **Base de datos oficial** - Datos directos de SEPOMEX, siempre actualizados

## Soporte

Para dudas o problemas, contactar al equipo de desarrollo.

---

**Última actualización:** Marzo 2026  
**Versión:** 1.0
