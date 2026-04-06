# 🔍 ANÁLISIS DE IMPACTO: Cambios en Base de Datos

**Fecha:** 6 de abril de 2026  
**Migración:** Sistema de Autenticación por Teléfono  
**Base de Datos:** klynet_datosdemo (DEMO)

---

## 📝 Resumen de Cambios en la Base de Datos

### 1. Nueva Tabla Creada
- **`PostulantesTelefonos`** - Tabla nueva, NO afecta ningún módulo existente

### 2. Modificación a Tabla Existente
- **`Postulantes.Telefono`** - Los valores ahora están **normalizados a 10 dígitos**
  - Antes: Podía contener `(834) 123-4567`, `834-123-4567`, etc.
  - Ahora: Solo contiene `8341234567` (10 dígitos numéricos)

### 3. Triggers Nuevos
- **`trg_postulantes_telefono_insert`** - Se ejecuta AFTER INSERT en `Postulantes`
- **`trg_postulantes_telefono_update`** - Se ejecuta AFTER UPDATE en `Postulantes`

---

## ⚠️ IMPACTO EN MÓDULOS EXISTENTES

### ✅ SIN IMPACTO NEGATIVO

#### 1. **Stored Procedures que Usan Telefono**

Los siguientes SPs fueron identificados:

**`spAddPostulante`** (línea 75-76 en Postulantes.php)
```sql
CALL spAddPostulante('$Nombre', '$ApellidoPaterno', '$ApellidoMaterno', 
      '$CURP', '$Telefono', '$CorreoElectronico', '$Direccion', '$Estado', '$Ciudad')
```
- ✅ **Sin impacto**: El SP solo hace INSERT, el trigger manejará la sincronización
- ✅ **Mejora**: Ahora el teléfono se normaliza antes de enviarse al SP

**`spUpdatePostulante`** (línea 135-137 en Postulantes.php)
```sql
CALL spUpdatePostulante('$IdPostulante', '$Nombre', '$ApellidoPaterno', 
      '$ApellidoMaterno', '$CURP', '$Telefono', '$CorreoElectronico', 
      '$Direccion', '$Estado', '$Ciudad')
```
- ✅ **Sin impacto**: El SP hace UPDATE, el trigger sincronizará automáticamente
- ✅ **Mejora**: Teléfonos normalizados antes de UPDATE

---

#### 2. **Operaciones de INSERT/UPDATE Directas**

**Identificadas:**

**`addPostulanteConPostulacion`** (línea 337-357 en Postulantes.php)
```php
// Normaliza el teléfono ANTES de usarlo
$Telefono = $this->normalizarTelefono($Telefono);

// Si el postulante ya existe y tiene teléfono diferente
if (!empty($Telefono) && $Telefono != $telefonoActual && $this->validarFormatoTelefono($Telefono)) {
    $this->ProcedureExec(
        "INSERT IGNORE INTO PostulantesTelefonos (IdPostulante, Telefono, Observaciones) 
         VALUES ($IdPostulante, '$Telefono', 'Nueva postulación')",
        []
    );
}
```
- ✅ **Sin impacto**: Ya actualizado en código previo
- ✅ **Compatibilidad total**: Usa normalización y valida formato

**UPDATE directo de IdEmpleado** (línea 373)
```php
$this->ProcedureExec("UPDATE Postulantes SET IdEmpleado = '$IdEmpleadoSQL' WHERE IdPostulante = '$IdPostulante'", []);
```
- ✅ **Sin impacto**: NO modifica el campo `Telefono`, por lo que el trigger UPDATE no se activará

---

#### 3. **Triggers - Cuándo se Ejecutan**

**`trg_postulantes_telefono_insert`**
- ✅ Se ejecuta DESPUÉS del INSERT, no bloquea la operación
- ✅ Solo actúa si el teléfono tiene 10 dígitos
- ✅ Usa `INSERT ... ON DUPLICATE KEY UPDATE` (no falla si ya existe)

**`trg_postulantes_telefono_update`**
- ✅ Se ejecuta DESPUÉS del UPDATE, no bloquea la operación
- ✅ Solo actúa si el teléfono CAMBIÓ
- ✅ Solo actúa si el nuevo teléfono tiene 10 dígitos
- ✅ No se ejecuta en UPDATEs que no tocan el campo `Telefono`

**Casos donde NO se ejecutan los triggers:**
- UPDATE de otros campos (Estado, Ciudad, Direccion, etc.) → ✅ No hay impacto
- DELETE de postulantes → ✅ No hay triggers en DELETE
- SELECT queries → ✅ No afectan

---

## 🔍 MÓDULOS ANALIZADOS

### Backend/Postulantes/Postulantes.php

| Método | Operación | Usa Telefono | Impacto | Notas |
|--------|-----------|--------------|---------|-------|
| `getAllPostulantes()` | SELECT | ✅ Sí (lectura) | ✅ Ninguno | Solo lee, ahora verá teléfonos normalizados |
| `searchPostulante()` | SELECT | ✅ Sí (lectura) | ✅ Ninguno | Solo lee, ahora verá teléfonos normalizados |
| `addPostulante()` | INSERT (SP) | ✅ Sí | ✅ Ninguno | Trigger sincroniza automáticamente |
| `updatePostulante()` | UPDATE (SP) | ✅ Sí | ✅ Ninguno | Trigger sincroniza automáticamente |
| `deletePostulante()` | DELETE (SP) | ❌ No | ✅ Ninguno | No usa campo Telefono |
| `addPostulanteConPostulacion()` | INSERT/UPDATE | ✅ Sí | ✅ **YA ACTUALIZADO** | Usa normalización y tabla histórico |
| `validarCandidato()` | SELECT | ✅ Sí | ✅ **YA ACTUALIZADO** | Busca en histórico de teléfonos |
| `getPostulantesByVacante()` | SELECT | ✅ Sí (lectura) | ✅ Ninguno | Solo visualización |
| `getPostulanteDetalle()` | SELECT | ✅ Sí (lectura) | ✅ Ninguno | Solo visualización |

---

### Backend/Postulantes/App.php

| Endpoint | Usa Telefono | Impacto | Notas |
|----------|--------------|---------|-------|
| `addPostulante` | ✅ Sí | ✅ Ninguno | Llama a método que usa SP con trigger |
| `updatePostulante` | ✅ Sí | ✅ Ninguno | Llama a método que usa SP con trigger |
| `addPostulanteConPostulacion` | ✅ Sí | ✅ **YA ACTUALIZADO** | Normaliza teléfono antes de procesar |
| `publicApplyToVacante` | ✅ Sí | ✅ **YA ACTUALIZADO** | Normaliza teléfono en línea 192 |
| `getTelefonosHistorico` | ✅ Sí | ✅ **NUEVO** | Endpoint nuevo para gestión RH |
| `actualizarTelefonoPostulante` | ✅ Sí | ✅ **NUEVO** | Endpoint nuevo para gestión RH |
| `agregarTelefonoSecundario` | ✅ Sí | ✅ **NUEVO** | Endpoint nuevo para gestión RH |

---

### Frontend - Visualización de Teléfonos

**Archivos que MUESTRAN teléfonos:**

1. **`PostulantesVacante.php`** (línea 328, 394)
   - Campo de input para teléfono
   - Detalle de postulante
   - ✅ **Sin impacto**: Solo visualiza, ahora mostrará teléfonos normalizados
   - 📝 **Nota**: Puede que visualmente se vea diferente (sin guiones ni paréntesis)

2. **`PostulantesGeneral.php`**
   - Lista general de postulantes
   - ✅ **Sin impacto**: Solo visualiza
   - ✅ **Mejora**: Ahora tiene botón de gestión de teléfonos

3. **`EstatusPostulante.php`** (Login de candidatos)
   - ✅ **YA ACTUALIZADO**: Usa autenticación por CURP + Teléfono

4. **DataTables/Grids en JavaScript**
   - `PostulantesVacante.js`
   - `PostulantesGeneral.js`
   - ✅ **Sin impacto**: Solo muestran datos
   - 🎨 **Consideración visual**: Los teléfonos ahora se verán como `8341234567` en vez de `(834) 123-4567`

---

## 📋 POSIBLES IMPACTOS VISUALES (NO FUNCIONALES)

### ⚠️ Formato de Visualización de Teléfonos

**Antes de la migración:**
```
Teléfono: (834) 123-4567
Teléfono: 834-123-4567
Teléfono: 8341234567
```

**Después de la migración:**
```
Teléfono: 8341234567  ← Todos normalizados
```

**Solución (opcional - solo estética):**
Si deseas mostrar los teléfonos con formato visual en las interfaces:

```javascript
// Función JavaScript para formatear teléfonos al mostrar
function formatearTelefono(telefono) {
    if (!telefono || telefono.length !== 10) return telefono;
    return `(${telefono.substring(0, 3)}) ${telefono.substring(3, 6)}-${telefono.substring(6)}`;
}

// Ejemplo: formatearTelefono("8341234567") → "(834) 123-4567"
```

Esta función puede agregarse en los scripts de DataTables si se desea mejorar la presentación visual.

---

## 🧪 PRUEBAS RECOMENDADAS

### 1. Operaciones CRUD de Postulantes
- [ ] Crear nuevo postulante con teléfono
  - Verificar que se guarda normalizado en `Postulantes`
  - Verificar que se crea registro en `PostulantesTelefonos`
  
- [ ] Actualizar teléfono de postulante existente
  - Verificar que el trigger actualiza `PostulantesTelefonos`
  - Verificar que el anterior teléfono NO se elimina del histórico
  
- [ ] Actualizar otros campos (nombre, dirección) sin cambiar teléfono
  - Verificar que NO se crea nuevo registro en `PostulantesTelefonos`

### 2. Postulación de Candidatos
- [ ] Candidato nuevo se postula a vacante
  - Verificar que teléfono se normaliza
  - Verificar que se crea en histórico
  
- [ ] Candidato existente se postula con teléfono diferente
  - Verificar que se agrega al histórico
  - Verificar que NO cambia su teléfono principal

### 3. Autenticación
- [ ] Login con CURP + Teléfono principal
- [ ] Login con CURP + Teléfono histórico (antiguo)
- [ ] Login con CURP + Teléfono con formato (834) 123-4567
  - Debería normalizarse automáticamente y funcionar

---

## ✅ CONCLUSIÓN

### Impacto General: **MÍNIMO A NINGUNO**

**Razones:**

1. ✅ **Nueva tabla no afecta consultas existentes**
   - `PostulantesTelefonos` es independiente

2. ✅ **Triggers son AFTER (no bloquean operaciones)**
   - Se ejecutan después de INSERT/UPDATE exitoso
   - Si fallan, no revierten la operación principal

3. ✅ **Normalización de teléfonos es transparente**
   - El código ya fue actualizado para normalizar
   - Los SPs reciben teléfonos normalizados

4. ✅ **Código de lectura no se afecta**
   - SELECTs siguen funcionando igual
   - Solo verán teléfonos sin formato (10 dígitos)

5. ✅ **Compatibilidad hacia atrás**
   - Los módulos que usan teléfonos siguen funcionando
   - Solo cambia el formato almacenado

### Impactos Menores (Solo Visuales):

🎨 **Presentación de teléfonos sin formato**
- Los teléfonos se muestran como `8341234567` en vez de `(834) 123-4567`
- **Solución**: Aplicar función de formateo en JavaScript (opcional)

---

## 📌 RECOMENDACIONES

### Para Producción:

1. **Informar a usuarios RH** que los teléfonos se verán sin formato
2. **Opcional**: Implementar formateo visual en JavaScript
3. **Monitorear logs** después de la migración para detectar errores de triggers
4. **Probar todas las operaciones CRUD** en ambiente de prueba primero

### Archivos que NO Requieren Cambios:

- ✅ Todos los stored procedures existentes
- ✅ Todos los módulos de backend (excepto los ya actualizados)
- ✅ Todas las consultas SELECT
- ✅ Todos los reportes y estadísticas
- ✅ Módulos de otras áreas (Vacantes, Empleados, etc.)

---

## 🔒 SEGURIDAD Y ESTABILIDAD

**Los triggers están diseñados para ser seguros:**

```sql
-- Solo actúa si hay teléfono válido
IF NEW.Telefono IS NOT NULL AND NEW.Telefono != '' AND LENGTH(NEW.Telefono) = 10 THEN
    -- Usa INSERT ... ON DUPLICATE KEY UPDATE (no falla si existe)
    INSERT INTO PostulantesTelefonos (...) VALUES (...) 
    ON DUPLICATE KEY UPDATE Activo = 1, EsPrincipal = 1;
END IF;
```

**Características de seguridad:**
- ✅ Validación de longitud (10 dígitos)
- ✅ `ON DUPLICATE KEY UPDATE` previene errores por duplicados
- ✅ `INSERT IGNORE` en operaciones manuales
- ✅ Triggers AFTER (no bloquean la operación principal)

---

**Estado Final:** ✅ **LOS CAMBIOS SON SEGUROS Y NO AFECTAN OTROS MÓDULOS**
