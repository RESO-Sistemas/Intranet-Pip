# Plan de Implementación — Módulo Sincronizador RH (PIP → Intranet)

> Estado: **borrador para revisión**. No iniciar implementación hasta confirmación.
> Fecha: 2026-06-27

## 1. Objetivo

Crear un módulo dentro del portal que consuma la API local de PIP (`PIPServerLocalAPI`) y
migre/sincronice hacia nuestras tablas: sucursales, áreas, tipos de puesto y empleados,
remapeando los IDs de origen para evitar colisiones entre servidores y con los datos existentes.

## 2. Hallazgos confirmados (investigación previa)

- API por servidor, solo cambia el puerto. Endpoints `POST`, requieren `Content-Length`.
  - `:8560` = MADERO (`iD_SERVIDOR` `"2"`, 19 empleados, 1 sucursal)
  - `:8460` = MATAMOROS (`iD_SERVIDOR` `"1"`, 101 empleados, 3 sucursales)
  - Habrá más servidores.
- Jerarquía PIP: `SUCURSAL → AREA_DE_TRABAJO → TIPO_PUESTO → empleado`.
  Nuestra: `DIVISION → SUCURSAL → PUESTO → empleado`. (Invertida; se resuelve en el mapeo.)
- **`nivel` del API = 0 en los 120 empleados → inservible. Se deriva del tipo de puesto.**
- **IDs reciclados por servidor** (mismo `iD_EMPLEADO`/`iD_SUCURSAL` en servidores distintos)
  y colisión con datos locales existentes (2207 empleados). → Remapeo obligatorio.
- Gating actual: **menús por `IdPuesto`** (`MenusPermisos`), jerarquía por `Nivel`.
- API **no** entrega: Email, Móvil, Centro de costo. → opcionales/locales.

### Endpoints usados

| Endpoint | Body | Devuelve |
|---|---|---|
| `lugoGEN_Get_SUCURSALES_EN_SERVIDOR` | — | `iD_SUCURSAL_CLOUD, sucursal, iD_SERVIDOR, rfc` |
| `lugoRH_Get_AREAS_DE_TRABAJO_DE_SUCURSAL` | `int` id sucursal | `iD_SUCURSAL_CLOUD, iD_AREA_DE_TRABAJO, areA_DE_TRABAJO` |
| `lugoRH_Get_TIPOS_DE_PUESTO_DE_AREA_DE_TRABAJO` | `int` id área | `iD_AREA_DE_TRABAJO, iD_TIPO_PUESTO, descripcioN_TIPO_PUESTO` |
| `lugoRH_Get_EMPLEADOS_ALL` | — | empleado extendido (16 campos) |

## 3. Cambios de base de datos

### 3.1 Tablas nuevas

```sql
-- Remapeo origen→local (núcleo de idempotencia)
CREATE TABLE SyncMapeoOrigen (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  servidor         VARCHAR(10) NOT NULL,   -- iD_SERVIDOR ("1","2"...)
  entidad          VARCHAR(20) NOT NULL,   -- SUCURSAL|AREA|TIPO_PUESTO|EMPLEADO
  id_origen        INT NOT NULL,
  id_local         INT NOT NULL,
  area_origen      INT NULL,               -- solo TIPO_PUESTO: id área padre
  fecha_mod_origen DATETIME NULL,
  registro         DATETIME NOT NULL,
  actualizado      DATETIME NOT NULL,
  UNIQUE KEY uq_origen (servidor, entidad, id_origen),
  UNIQUE KEY uq_local  (entidad, id_local)
);

-- Catálogo de niveles (no existía)
CREATE TABLE Niveles (
  IdNivel     INT PRIMARY KEY,     -- 0..8
  Descripcion VARCHAR(60),
  EsAdmin     TINYINT(1) DEFAULT 0
);

-- Plantilla de menús por nivel (auto-siembra MenusPermisos al crear un puesto)
CREATE TABLE PlantillaMenusNivel (
  IdNivel  INT NOT NULL,
  id_menu  INT NOT NULL,
  PRIMARY KEY (IdNivel, id_menu)
);

-- Config de servidores PIP (opcional; alternativa: archivo de config)
CREATE TABLE SyncServidores (
  id_servidor VARCHAR(10) PRIMARY KEY,  -- "1","2"...
  nombre      VARCHAR(60),              -- MADERO, MATAMOROS
  base_url    VARCHAR(120),             -- https://luguito.com:8560
  activo      TINYINT(1) DEFAULT 1
);
```

### 3.2 Alteración mínima

```sql
ALTER TABLE Puestos ADD COLUMN Nivel INT NOT NULL DEFAULT 8;  -- nivel por puesto
```

`Empleados.Nivel` se asigna desde `Puestos.Nivel` del puesto del empleado (no desde el API).

### 3.3 Seed: catálogo `Niveles`

| IdNivel | Descripción | EsAdmin |
|--:|---|--:|
| 0 | Sistemas | 1 |
| 1 | Dirección | 1 |
| 2 | Gerencia | 1 |
| 3 | Subgerencia | 0 |
| 4 | Jefatura / Encargado | 0 |
| 5 | Coordinación | 0 |
| 6 | Especializado | 0 |
| 7 | Técnico | 0 |
| 8 | Operativo | 0 |

### 3.4 Seed: `PlantillaMenusNivel` (IDs reales del catálogo `menus`)

**Base obligatoria para TODOS (incluye responder evaluaciones 360/dirigidas + checklist):**

`1` Principal, `2` Mi Perfil, `3` Organigrama, `4` Capacitación, `5` Salud,
`6` Vacaciones, `7` Línea de ética, `9` Directorio, `25` Aplicación de Evaluaciones,
`31` Mis resultados, `32` Planes de Acción, `34` Mis Planes de acción,
`<CHECKLIST>` (menú a confirmar, ver §8 item 1).

| Perfil | Niveles | Menús |
|---|---|---|
| **Operativo** (frutero, cajero, pasillero...) | 6, 7, 8 | Base obligatoria |
| **Mando medio** | 3, 4, 5 | Base + `33` Mis Subordinados, `10/13/26` Evaluaciones (lectura) |
| **Admin** | 0, 1, 2 | Todos los 36 menús (copia de `IdPuesto` 31 actual) |

> Regla de negocio fija: el menú `25` (Aplicación de Evaluaciones) y el de Checklist
> van en **todos** los perfiles. Un puesto puede ampliarse luego editando `MenusPermisos`.

### 3.5 Reglas `tipo_puesto → Nivel`

Sobre `descripcioN_TIPO_PUESTO` en MAYÚSCULAS, primer patrón que coincide gana:

| Patrón | Nivel |
|---|--:|
| `GERENTE` | 2 |
| `SUBGERENTE` | 3 |
| `ENCARGAD` \| `JEFE` \| `SUPERVISOR` | 4 |
| `VITRINERO` \| `CARNICER` \| `SALCHICHON` \| `TABLAJERO` | 7 |
| (default: `CAJER`, `FRUTERO`, `PASILLERO`, `ALMACEN`, otros) | 8 |

Editable después en `Puestos.Nivel` sin re-sincronizar.

## 4. Mapeo de campos final

### Sucursales (`SUCURSALES` → `SucursalDepto`)
| Local | Origen |
|---|---|
| IdSucursal | remap de `iD_SUCURSAL_CLOUD` |
| Sucursal | `sucursal` |
| IdDivision | back-fill: 1ª área de la sucursal |

### Áreas (`AREAS_DE_TRABAJO` → `Divisiones`)
| Local | Origen |
|---|---|
| IdDivision | remap de `iD_AREA_DE_TRABAJO` |
| Division | `areA_DE_TRABAJO` |

### Tipos de puesto (`TIPOS_PUESTO` → `Puestos`)
| Local | Origen |
|---|---|
| IdPuesto | remap de `iD_TIPO_PUESTO` |
| Puesto | `descripcioN_TIPO_PUESTO` |
| IdDivision | remap del área padre |
| Nivel | regla §3.5 |

### Empleados (`EMPLEADOS_ALL` → `Empleados`)
| Local | Origen | Nota |
|---|---|---|
| NoEmpleado | remap de `iD_EMPLEADO` | |
| Nombre | `nombrE_COMPLETO` | |
| FNacimiento | `fechA_NACIMIENTO` | |
| Antiguedad | `fechA_ALTA` | no usar `antiguedaD_DIAS` |
| CURP | `curp` | |
| RFC | `rfc` | puede venir vacío |
| NoSeguro | `numerO_SEGURO_SOCIAL` | puede venir vacío |
| IdSucursal | remap `iD_SUCURSAL_CLOUD` | |
| IdPuesto | remap `iD_TIPO_PUESTO` | |
| IdDivision | remap área del tipo_puesto | |
| Nivel | `Puestos.Nivel` del IdPuesto | **ignora `nivel` del API (0)** |
| Status | `estatus` | baja → 0, nunca borrar |
| Email / Movil / IdCentroCosto | — | NULL (opcionales) |

### Jerarquía (opcional → `RelacionEmpleados`)
`iD_EMPLEADO_JEFE_INMEDIATO != -1` → `EmpleadoPadre = remap(jefe)`, `EmpleadoHijo = NoEmpleado`.

## 5. Flujo de sincronización

```
por cada servidor S activo (SyncServidores):
  1. SUCURSALES   → upsert SucursalDepto    + mapeo
  2. AREAS        (loop por sucursal)        → upsert Divisiones + mapeo
     back-fill SucursalDepto.IdDivision (1ª área)
  3. TIPOS_PUESTO (loop por área)            → upsert Puestos (Nivel) + mapeo(area_origen)
     si INSERT nuevo → copiar PlantillaMenusNivel[nivel] a MenusPermisos(IdPuesto)
  4. EMPLEADOS    → resolver FKs vía mapeo   → upsert Empleados (Nivel=Puestos.Nivel)
  5. JEFE (opc)   → upsert RelacionEmpleados
```

**Upsert genérico:** `mapeo existe` → UPDATE por `id_local`; `no existe` → `id_local = MAX(PK)+1`
del destino, INSERT destino + INSERT mapeo. Arranca arriba de los datos locales existentes.

**Idempotencia:** re-sync = todo UPDATE, sin duplicados.
`Puestos.Nivel` y `MenusPermisos` editados a mano **no se pisan** (solo se siembran en el INSERT inicial del puesto).

## 6. Arquitectura del módulo (sigue el patrón existente)

```
Backend/Sincronizador/
  Sincronizador.php     -- clase: cliente HTTP (curl) + lógica de upsert/remapeo
  App.php               -- dispatcher POST op→JSON (patrón Backend/Checklists/App.php)
SincronizadorRH.php     -- página/UI raíz (lista de servidores, botón sincronizar, log)
scripts/SincronizadorRH.js -- fetch a Backend/Sincronizador/App.php, render de resultado
database/migrations/<n>_sincronizador.sql -- DDL §3 + seeds §3.3/3.4
```

### Operaciones (`App.php`)
| op | Descripción |
|---|---|
| `getServidores` | lista `SyncServidores` + última sync |
| `probarConexion` | ping a un servidor (1 endpoint ligero) |
| `sincronizarServidor` | corre el flujo §5 para un `id_servidor` |
| `sincronizarTodos` | itera servidores activos |
| `getResumen` | conteos por entidad (insertados/actualizados/bajas) |

### Cliente HTTP
`curl_init` con `POST`, header `Content-Type: application/json` y `Content-Length` correcto
(reusar patrón ya presente en `Backend/Empleados/Empleados.php`). Timeout y `SSL_VERIFYPEER`
configurables (el host usa cert válido; mantener verificación on).

### UI
Página simple: tabla de servidores (nombre, url, estado, última sync), botón **Sincronizar**
por servidor y **Sincronizar todos**, y panel de resultado (insertados/actualizados/bajas, errores).
Sin dependencias nuevas; reusar estilos/tabulator existentes.

## 7. Fases de entrega

| Fase | Entregable | Criterio de aceptación |
|---|---|---|
| **0. Migración** | DDL §3 + seeds §3.3/3.4 | tablas creadas, catálogos cargados |
| **1. Backend core** | `Sincronizador.php` (HTTP + upsert + remapeo) | sync de 1 servidor por CLI/op, conteos correctos, idempotente (2ª corrida = 0 inserts) |
| **2. Dispatcher + UI** | `App.php`, `SincronizadorRH.php`, JS | sincronizar desde el portal, ver resultado |
| **3. Multi-servidor** | config `SyncServidores`, `sincronizarTodos` | MADERO + MATAMOROS sin colisión de IDs |
| **4. Refinos** | bajas, jerarquía opc., incremental por `fechA_MODIFICACION` | re-sync incremental |

## 8. Items abiertos / decisiones a confirmar

1. **Menú de Checklist:** el módulo Checklist existe en código (`ListadoChecklistDiarios.php`,
   `Backend/Checklists`) pero **no hay fila de menú en la BD actual**. Para que "todos respondan
   checklists" hay que: (a) confirmar la página exacta que usa el empleado para responder, y
   (b) crear su fila en `menus` (Id_Padre=1) e incluirla en la plantilla base. **Necesito que
   confirmes cuál es esa página.**
2. **BD destino:** ¿misma `klynet_datos` (multi-cliente) o BD/deploy aparte por cliente PIP?
   El remapeo funciona en ambos; si es la misma, confirmo arranque de IDs > 2207.
3. **Disparo:** ¿manual desde la UI, o también programado (cron)? Fase 1-3 es manual; el cron
   se puede sumar después.
4. **`SyncServidores`:** ¿tabla en BD (editable desde UI) o archivo de config en repo?
   Recomiendo tabla por el "habrá más servidores".

## 9. Riesgos

- **Colisión de IDs:** mitigada por `SyncMapeoOrigen` + `MAX(PK)+1`. Riesgo si dos syncs corren
  en paralelo → serializar por servidor (lock simple o flag `en_proceso`).
- **Datos faltantes (Email/Móvil):** login/notificaciones quedan sin esos campos hasta captura local.
- **Granularidad de puesto:** usamos `tipo_puesto` (p.ej. "FRUTERO") y se pierde el detalle
  "FRUTERO 1/2/3/4" del `iD_PUESTO`. Aceptado por no haber catálogo de puestos en el API.
- **Jerarquía:** `iD_EMPLEADO_JEFE_INMEDIATO = -1` en la muestra actual → organigrama plano hasta
  que el origen pueble el dato. Nivel cubre el orden mientras tanto.

## 10. Validación

- Fase 1: correr sync de MADERO, verificar conteos (19 emp, 1 suc, N áreas/tipos) y 2ª corrida
  idempotente (0 inserts). Spot-check 3 empleados: FKs y Nivel correctos.
- Fase 3: sync MADERO + MATAMOROS, verificar que `iD_EMPLEADO` repetido entre servidores quedó
  con `NoEmpleado` local distinto.
- Sin tocar lógica de menús existente (solo seed de `MenusPermisos` para puestos nuevos).
