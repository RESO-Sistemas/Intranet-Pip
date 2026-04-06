# Sistema de Autenticación con CURP + Teléfono

## Descripción del Cambio

Este sistema reemplaza la autenticación anterior de `CURP + Correo Electrónico` por `CURP + Teléfono` para los candidatos que acceden al portal de postulantes.

### Características Principales

✅ **Login con CURP + Teléfono**: Los candidatos pueden iniciar sesión usando su CURP y cualquier número telefónico que hayan registrado históricamente.

✅ **Histórico de Teléfonos**: Se mantiene un registro completo de todos los teléfonos que un candidato ha usado, permitiendo flexibilidad en el acceso.

✅ **Gestión desde RH**: Los usuarios de Recursos Humanos pueden:
- Ver todos los teléfonos históricos de un postulante
- Agregar nuevos teléfonos secundarios
- Cambiar el teléfono principal
- Desactivar/reactivar teléfonos
- Eliminar teléfonos del histórico

✅ **Normalización Automática**: Los teléfonos se normalizan a formato de 10 dígitos, eliminando espacios, guiones y caracteres especiales.

✅ **Validación de Unicidad**: Se evita que diferentes postulantes usen el mismo teléfono como principal.

---

## Archivos Modificados/Creados

### Base de Datos
- `database/migrations/001_create_postulantes_telefonos.sql` - Script de migración principal
- `database/migrations/002_verificacion_datos.sql` - Script de verificación pre-migración

### Backend
- `Backend/Postulantes/Postulantes.php` - Actualizado con nuevos métodos
- `Backend/Postulantes/App.php` - Endpoints API agregados

### Frontend - Portal Candidatos
- `EstatusPostulante.php` - Login actualizado a CURP + Teléfono

### Frontend - Administración RH
- `PostulantesGeneral.php` - Botón de gestión de teléfonos agregado
- `PostulantesVacante.php` - Botón de gestión de teléfonos agregado
- `scripts/TelefonosHistorico.js` - Módulo completo de gestión
- `scripts/PostulantesGeneral.js` - Integración con módulo de teléfonos
- `scripts/PostulantesVacante.js` - Integración con módulo de teléfonos

---

## Instrucciones de Despliegue

### Paso 1: Verificación Pre-Migración

Ejecuta el script de verificación para identificar posibles problemas:

```bash
mysql -u [usuario] -p [base_de_datos] < database/migrations/002_verificacion_datos.sql
```

Esto te mostrará:
- Postulantes sin teléfono registrado
- Teléfonos con formato incorrecto
- Teléfonos duplicados
- CURPs duplicados
- Estadísticas generales

**IMPORTANTE**: Resuelve los problemas identificados ANTES de continuar con la migración.

### Paso 2: Respaldo de Base de Datos

```bash
mysqldump -u [usuario] -p [base_de_datos] Postulantes PostulantesVacantes > backup_pre_migracion_$(date +%Y%m%d_%H%M%S).sql
```

### Paso 3: Ejecutar Migración

```bash
mysql -u [usuario] -p [base_de_datos] < database/migrations/001_create_postulantes_telefonos.sql
```

Este script:
1. Crea la tabla `PostulantesTelefonos`
2. Migra teléfonos existentes al histórico
3. Normaliza teléfonos en la tabla principal
4. Crea triggers para sincronización automática
5. Muestra estadísticas de verificación

### Paso 4: Verificar Migración

Revisa que todo esté correcto:

```sql
SELECT 
    (SELECT COUNT(*) FROM Postulantes WHERE Telefono IS NOT NULL AND Telefono != '') AS PostulantesConTelefono,
    (SELECT COUNT(*) FROM PostulantesTelefonos) AS TelefonosHistoricos,
    (SELECT COUNT(DISTINCT IdPostulante) FROM PostulantesTelefonos) AS PostulantesConHistorico;
```

### Paso 5: Desplegar Código

1. **Subir archivos al servidor**:
   ```bash
   # Backend
   rsync -av Backend/Postulantes/ [servidor]:/ruta/Backend/Postulantes/
   
   # Frontend
   rsync -av EstatusPostulante.php PostulantesGeneral.php PostulantesVacante.php [servidor]:/ruta/
   
   # Scripts JS
   rsync -av scripts/TelefonosHistorico.js scripts/PostulantesGeneral.js scripts/PostulantesVacante.js [servidor]:/ruta/scripts/
   ```

2. **Verificar permisos**:
   ```bash
   chmod 644 Backend/Postulantes/*.php
   chmod 644 scripts/*.js
   ```

### Paso 6: Limpiar Caché

Si usas algún sistema de caché, límpialo:
```bash
# Ejemplo con OPcache
service php-fpm reload
```

### Paso 7: Pruebas

#### Prueba de Login
1. Accede a `EstatusPostulante.php`
2. Intenta login con un CURP y teléfono válidos
3. Verifica que el acceso sea exitoso

#### Prueba de Gestión de Teléfonos (RH)
1. Accede a `PostulantesVacante.php` o `PostulantesGeneral.php`
2. Haz clic en el botón de teléfono (icono verde) de un postulante
3. Verifica que se cargue el histórico
4. Prueba agregar, desactivar y reactivar teléfonos

---

## Uso del Sistema

### Para Candidatos

Los candidatos ahora ingresan al portal usando:
- **CURP**: Su CURP de 18 caracteres
- **Teléfono**: Cualquier número de 10 dígitos que hayan registrado

**Ejemplo**:
```
CURP: ABCD123456HIJKLM01
Teléfono: 8341234567
```

**Nota para candidatos**: Si cambiaron su número telefónico, pueden seguir usando su número anterior para acceder. Si desean actualizar su número principal, deben contactar a Recursos Humanos.

### Para Recursos Humanos

#### Gestionar Teléfonos de un Postulante

1. Desde `PostulantesGeneral.php` o `PostulantesVacante.php`
2. Localiza al postulante en la tabla
3. Haz clic en el botón verde con ícono de teléfono
4. Se abrirá el modal de gestión de teléfonos

#### Agregar Teléfono Secundario
- Ingresa el número de 10 dígitos
- (Opcional) Agrega observaciones (ej: "Teléfono de casa")
- Haz clic en el botón `+` verde

#### Establecer Teléfono como Principal
- Haz clic en el botón con ícono de estrella (`★`)
- Confirma la acción
- Este será el nuevo teléfono principal del postulante

#### Desactivar un Teléfono
- Haz clic en el botón amarillo con ícono de bloqueo
- El teléfono quedará inactivo y el postulante NO podrá usarlo para login

#### Reactivar un Teléfono
- Haz clic en el botón verde con ícono de verificación
- El teléfono volverá a estar activo para login

#### Eliminar Permanentemente
- Haz clic en el botón rojo con ícono de basura
- **IMPORTANTE**: Esta acción es irreversible

---

## Escenarios y Casos de Uso

### Escenario 1: Candidato Cambió de Número
**Situación**: María registró su CURP con el teléfono 8341234567, pero ahora tiene el 8349876543.

**Solución**:
1. María puede seguir accediendo con su número anterior (8341234567)
2. En su próxima postulación, puede proporcionar el nuevo número
3. RH puede actualizar su teléfono principal desde el módulo de gestión

### Escenario 2: Teléfono Compartido Familiar
**Situación**: Padre e hijo usan el mismo teléfono pero tienen CURPs diferentes.

**Problema Potencial**: Ambos intentan registrarse con el mismo teléfono como principal.

**Solución del Sistema**:
- El sistema NO permite que dos postulantes tengan el mismo teléfono como principal
- El segundo registro recibirá un mensaje de error
- RH debe registrar manualmente un teléfono alternativo

### Escenario 3: Postulante Olvidó su Teléfono Registrado
**Situación**: Juan no recuerda qué teléfono usó al registrarse.

**Solución**:
1. Juan contacta a RH
2. RH busca a Juan en `PostulantesGeneral.php`
3. RH abre el modal de teléfonos y ve el historial completo
4. RH informa a Juan sus teléfonos activos

### Escenario 4: Normalización de Formatos
**Entrada del usuario**:
- `834-123-4567`
- `(834) 123 4567`
- `+52 834 123 4567`

**Normalización automática**: Todos se convierten a `8341234567`

---

## Estructura de Base de Datos

### Tabla: `PostulantesTelefonos`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `IdTelefonoHistorico` | INT | ID autoincremental (Primary Key) |
| `IdPostulante` | INT | FK a tabla `Postulantes` |
| `Telefono` | VARCHAR(10) | Teléfono normalizado (solo dígitos) |
| `FechaRegistro` | DATETIME | Fecha y hora de registro |
| `Activo` | TINYINT(1) | 1=Activo, 0=Inactivo |
| `UsuarioModifico` | INT | NoEmpleado de quien hizo el cambio |
| `Observaciones` | VARCHAR(255) | Notas adicionales (opcional) |

**Índices**:
- PRIMARY KEY: `IdTelefonoHistorico`
- FOREIGN KEY: `IdPostulante` → `Postulantes(IdPostulante)`
- UNIQUE KEY: `(IdPostulante, Telefono)` - Evita duplicados
- INDEX: `Telefono` - Búsqueda rápida por teléfono
- INDEX: `Activo` - Filtrado por activos

---

## API Endpoints

### Backend/Postulantes/App.php

#### `getTelefonosHistorico`
Obtiene histórico de teléfonos de un postulante.

**Parámetros POST**:
- `op`: `getTelefonosHistorico`
- `IdPostulante`: ID del postulante (base64)

**Respuesta**:
```json
{
  "Resultado": true,
  "Data": [
    {
      "IdTelefonoHistorico": 1,
      "Telefono": "8341234567",
      "FechaRegistro": "2026-04-06 10:30:00",
      "Activo": 1,
      "Observaciones": "Teléfono principal",
      "NombreUsuario": "Juan Pérez"
    }
  ]
}
```

#### `actualizarTelefonoPostulante`
Actualiza el teléfono principal de un postulante.

**Parámetros POST**:
- `op`: `actualizarTelefonoPostulante`
- `IdPostulante`: ID del postulante (base64)
- `Telefono`: Nuevo teléfono (10 dígitos)
- `Observaciones`: (Opcional) Notas del cambio

#### `agregarTelefonoSecundario`
Agrega un teléfono secundario al histórico.

#### `desactivarTelefono`
Desactiva un teléfono del histórico.

#### `reactivarTelefono`
Reactiva un teléfono en el histórico.

#### `eliminarTelefono`
Elimina permanentemente un teléfono del histórico.

---

## Solución de Problemas

### Problema: Login falla con teléfono válido
**Diagnóstico**:
```sql
SELECT pt.Telefono, pt.Activo, p.CURP
FROM PostulantesTelefonos pt
INNER JOIN Postulantes p ON p.IdPostulante = pt.IdPostulante
WHERE p.CURP = 'CURP_DEL_CANDIDATO';
```

**Posibles causas**:
1. Teléfono está desactivado (`Activo = 0`)
2. Formato de CURP incorrecto (mayúsculas/minúsculas)
3. Teléfono no está en el histórico

**Solución**: Reactivar el teléfono o agregar uno nuevo desde RH.

### Problema: No se puede establecer teléfono como principal
**Error**: "Este teléfono ya está registrado por otro candidato"

**Diagnóstico**:
```sql
SELECT IdPostulante, CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto, Telefono
FROM Postulantes
WHERE Telefono = '8341234567';
```

**Solución**: Verificar si el teléfono está duplicado y resolver manualmente.

### Problema: Trigger no se ejecuta
**Verificar triggers**:
```sql
SHOW TRIGGERS LIKE 'Postulantes';
```

**Recrear triggers**:
```sql
source database/migrations/001_create_postulantes_telefonos.sql
```

---

## Rollback (Revertir Cambios)

En caso de necesitar revertir al sistema anterior:

### 1. Restaurar Respaldo
```bash
mysql -u [usuario] -p [base_de_datos] < backup_pre_migracion_[fecha].sql
```

### 2. Revertir Código
```bash
git revert [commit_hash]
```

### 3. Eliminar Tabla de Histórico (Opcional)
```sql
DROP TRIGGER IF EXISTS after_postulante_telefono_update;
DROP TRIGGER IF EXISTS after_postulante_insert;
DROP TABLE IF EXISTS PostulantesTelefonos;
```

---

## Mantenimiento

### Limpieza de Teléfonos Inactivos
Ejecutar trimestralmente:
```sql
-- Ver teléfonos inactivos antiguos
SELECT pt.*, CONCAT(p.Nombre, ' ', p.ApellidoPaterno) AS NombreCompleto
FROM PostulantesTelefonos pt
INNER JOIN Postulantes p ON p.IdPostulante = pt.IdPostulante
WHERE pt.Activo = 0 
  AND pt.FechaRegistro < DATE_SUB(NOW(), INTERVAL 6 MONTH);

-- Eliminar si es necesario
DELETE FROM PostulantesTelefonos
WHERE Activo = 0 
  AND FechaRegistro < DATE_SUB(NOW(), INTERVAL 6 MONTH);
```

### Auditoría de Cambios
```sql
SELECT 
    pt.Telefono,
    CONCAT(p.Nombre, ' ', p.ApellidoPaterno) AS Postulante,
    pt.FechaRegistro,
    pt.Observaciones,
    IFNULL(e.Nombre, 'Sistema') AS ModificadoPor
FROM PostulantesTelefonos pt
INNER JOIN Postulantes p ON p.IdPostulante = pt.IdPostulante
LEFT JOIN Empleados e ON e.NoEmpleado = pt.UsuarioModifico
WHERE pt.FechaRegistro >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY pt.FechaRegistro DESC;
```

---

## Contacto y Soporte

Para problemas técnicos o preguntas sobre el sistema, contacta a:
- **Desarrollo**: [Tu Email/Contacto]
- **Recursos Humanos**: [Email RH]

---

## Changelog

### Version 1.0.0 (2026-04-06)
- ✅ Implementación inicial de autenticación CURP + Teléfono
- ✅ Creación de tabla `PostulantesTelefonos`
- ✅ Módulo de gestión de teléfonos históricos
- ✅ Normalización automática de formatos
- ✅ Triggers de sincronización automática
- ✅ Validación de unicidad de teléfonos principales
- ✅ Scripts de migración y verificación
- ✅ Documentación completa

---

**Última actualización**: 6 de abril de 2026
