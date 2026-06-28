# Módulo Sincronizador RH — Documentación funcional y técnica

> Estado: **implementado**. Última actualización: 2026-06-27.
> Plan original: [PLAN_SINCRONIZADOR_RH.md](PLAN_SINCRONIZADOR_RH.md).

## 1. Qué hace

Consume la API local de PIP (`PIPServerLocalAPI`, uno o varios servidores) y migra/sincroniza
hacia la base de la intranet (`klynet_datos`):

- **Sucursales** (PIP `SUCURSAL`) → `SucursalDepto`
- **Áreas de trabajo** (PIP `AREA`) → `Divisiones`
- **Tipos de puesto** (PIP `TIPO_PUESTO`) → `Puestos`
- **Empleados** (PIP `EMPLEADO`) → `Empleados`
- **Jefe inmediato** (opcional) → `RelacionEmpleados`

Remapea los IDs de origen para evitar colisiones entre servidores y con los datos existentes,
es **idempotente** (re-sincronizar no duplica), corre **en segundo plano** (sobrevive al cierre
del navegador) y deja **bitácora detallada** de cada corrida (incluida la vista previa).

## 2. Arquitectura (archivos)

| Archivo | Rol |
|---|---|
| `SincronizadorRH.php` | Página/UI (servidores, vista previa, progreso, bitácora) |
| `scripts/SincronizadorRH.js` | Lógica de UI (CRUD, streaming, polling, bitácora) |
| `Backend/Sincronizador/Sincronizador.php` | Clase: HTTP, remapeo, upsert, estado, bitácora |
| `Backend/Sincronizador/App.php` | Dispatcher `POST op → JSON` |
| `Backend/Sincronizador/Stream.php` | Worker de streaming NDJSON (sync/preview) |
| `database/migrations/004…007_*.sql` | Esquema + seeds |

## 3. Modelo de datos

### Tablas nuevas
| Tabla | Propósito |
|---|---|
| `SyncMapeoOrigen` | Mapeo `(servidor, entidad, id_origen) → id_local`. Núcleo de idempotencia y anti-colisión. |
| `Niveles` | Catálogo 0–8 (descripción + `EsAdmin`). |
| `PlantillaMenusNivel` | Menús por nivel; siembra `MenusPermisos` al crear un puesto. |
| `SyncServidores` | Config de servidores PIP (id, nombre, URL, activo, última sync). |
| `SyncEstado` | Estado vivo por servidor (pct, msg, flag `cancelar`) para reconexión. |
| `SyncBitacora` | Cabecera por corrida (sync o preview): usuario, estado, conteos, duración. |
| `SyncBitacoraDetalle` | Un renglón por registro afectado/proyectado. |

### Alteraciones
- `Puestos` + columna `Nivel INT DEFAULT 8` (de aquí sale `Empleados.Nivel`).
- `CentroCostos` fila `0 = 'SIN ASIGNAR'` (placeholder; la API no entrega centro de costo).

### Migraciones
- `004_sincronizador_rh.sql` — tablas base, catálogo `Niveles`, plantillas, `SyncServidores`, `Puestos.Nivel`.
- `005_sync_estado.sql` — `SyncEstado`.
- `006_sync_bitacora.sql` — `SyncBitacora` + `SyncBitacoraDetalle`.
- `007_bitacora_accion.sql` — columna `SyncBitacora.accion` (`sync` | `preview`).

## 4. API PIP consumida

POST, requieren `Content-Length` (curl con `CURLOPT_POSTFIELDS` lo fija). Base por servidor
(solo cambia el puerto): p.ej. `https://luguito.com:8560` (MADERO), `:8460` (MATAMOROS).

| Endpoint | Body | Devuelve |
|---|---|---|
| `lugoGEN_Get_SUCURSALES_EN_SERVIDOR` | — | `iD_SUCURSAL_CLOUD, sucursal, iD_SERVIDOR, rfc` |
| `lugoRH_Get_AREAS_DE_TRABAJO_DE_SUCURSAL` | `int` id sucursal | `iD_AREA_DE_TRABAJO, areA_DE_TRABAJO` |
| `lugoRH_Get_TIPOS_DE_PUESTO_DE_AREA_DE_TRABAJO` | `int` id área | `iD_TIPO_PUESTO, descripcioN_TIPO_PUESTO` |
| `lugoRH_Get_EMPLEADOS_ALL` | — | empleado extendido (16 campos) |

Notas:
- La API responde **HTTP 400 + texto "no contiene registros"** cuando una entidad viene vacía
  (p.ej. un área sin tipos). Se trata como **lista vacía**, no como error.
- `EMPLEADOS_ALL` **no** trae `iD_SERVIDOR`; el discriminador de servidor lo aporta la config
  (`SyncServidores.id_servidor`), no el payload.

## 5. Estrategia de remapeo

`SyncMapeoOrigen` traduce cada id de origen a un id local asignado con `MAX(PK)+1` de la tabla
destino. Así:
- Los IDs de PIP (que se reciclan entre servidores) **nunca colisionan** entre sí ni con los
  ~2207 empleados existentes.
- El re-sync es idempotente: si el mapeo existe → `UPDATE`; si no → `INSERT` + nuevo mapeo.
- `id_servidor` (no el puerto) es el discriminador. Servidor nuevo = solo filas nuevas.

## 6. Nivel y menús

La API trae `nivel = 0` en todos → **inservible**. El nivel se **deriva del tipo de puesto**
y se guarda en `Puestos.Nivel`; `Empleados.Nivel` se toma de ahí.

Reglas (sobre `descripcioN_TIPO_PUESTO`, primer match gana):

| Patrón | Nivel |
|---|--:|
| `SUBGERENTE` | 3 |
| `GERENTE` | 2 |
| `ENCARGAD` / `JEFE` / `SUPERVISOR` | 4 |
| `VITRINERO` / `CARNICER` / `SALCHICHON` / `TABLAJERO` | 7 |
| default (cajero, frutero, pasillero, almacén…) | 8 |

**Gating de menús = por puesto** (`MenusPermisos`), no por nivel. Al crear un puesto nuevo se
siembra `MenusPermisos` desde `PlantillaMenusNivel` según su nivel:

| Perfil | Niveles | Menús |
|---|---|---|
| Operativo | 6–8 | Base: perfil, organigrama, capacitación, salud, vacaciones, ética, directorio, **Aplicación de Evaluaciones (25)**, mis resultados, planes de acción. (Checklist se responde en `index.php` = Mi Perfil, ya incluido.) |
| Mando medio | 3–5 | Base + Mis Subordinados + Evaluaciones (lectura) |
| Admin | 0–2 | Todos los menús |

> Regla fija: todos pueden responder evaluaciones (360/dirigidas) y checklists.
> En re-sync **no se pisan** `Puestos.Nivel` ni `MenusPermisos` editados a mano (solo se
> siembran en el INSERT inicial del puesto).

## 7. Flujo de sincronización

Por cada servidor activo, en orden (respeta FKs):

```
1. SUCURSALES   → por sucursal:
     a) AREAS    → upsert Divisiones (+ mapeo)
        por área: TIPOS_PUESTO → upsert Puestos (Nivel + siembra de menús)
     b) upsert SucursalDepto (IdDivision = 1ª área de la sucursal)
2. EMPLEADOS    → resolver FKs por mapeo y upsert
3. JEFE (opc.)  → upsert RelacionEmpleados
```

Resolución de FKs del empleado (todo vía `SyncMapeoOrigen`):
- `IdSucursal` = map(`SUCURSAL`, `iD_SUCURSAL_CLOUD`)
- `IdPuesto`   = map(`TIPO_PUESTO`, `iD_TIPO_PUESTO`)
- `IdDivision` = map(`AREA`, área del tipo de puesto)
- `Nivel`      = `Puestos.Nivel` del puesto (no el de la API)
- Empleado con tipo de puesto no catalogado → **omitido** (se registra en bitácora).

Todo dentro de **una transacción** (InnoDB): si algo falla o se cancela, **rollback** completo.

### Mapeo de campos (empleado)
| Local | Origen | Nota |
|---|---|---|
| NoEmpleado | `iD_EMPLEADO` (remap) | |
| Nombre | `nombrE_COMPLETO` | |
| FNacimiento | `fechA_NACIMIENTO` | |
| Antiguedad | `fechA_ALTA` | no `antiguedaD_DIAS` |
| CURP / RFC / NoSeguro | `curp` / `rfc` / `numerO_SEGURO_SOCIAL` | RFC/NSS pueden venir vacíos |
| Status | `estatus` | baja → 0, nunca se borra |
| Email / Movil / IdCentroCosto | — | locales (vacío / 0); el update **preserva** ediciones locales |

## 8. Ejecución en segundo plano, reconexión y cancelación

- `Stream.php` corre con `ignore_user_abort(true)` + `set_time_limit(0)` → **sigue aunque se
  cierre el navegador** y hace commit al terminar.
- El avance se persiste en `SyncEstado` con una **segunda conexión PDO autocommit**, visible
  aunque la transacción principal siga abierta.
- Al **reabrir** la página, `checkEnCurso()` detecta `estado='corriendo'` y **reconecta por
  polling** (cada 1.5 s) mostrando la barra. Si el stream se corta (timeout/red), no marca error:
  reconecta por estado.
- **Cancelar** = flag cooperativo (`cancelarSync` → `SyncEstado.cancelar=1`), revisado en cada
  paso → lanza excepción → rollback limpio. (No es "cerrar pestaña").
- `getEstadoSync` detecta procesos muertos (sin latido > 60 s → `muerto`).
- Guarda de concurrencia: una sola sincronización por servidor a la vez.
- La UI muestra aviso `beforeunload` si hay sync activa (informativo; la sync continúa).

> **Entorno:** reconexión/cancelación en vivo requieren servidor multi-request
> (Apache/php-fpm en producción). El `php -S` local es single-thread: ahí el reattach se ve al
> recargar tras terminar.

## 9. Bitácora

Dos niveles, **tanto para sincronización como para vista previa**:

**Cabecera `SyncBitacora`** (durable, conexión autocommit — persiste aunque haya rollback):
servidor, `accion` (`sync`/`preview`), usuario (de cookies de sesión), `estado`
(`corriendo`/`ok`/`error`/`cancelado`), inicio/fin, duración, conteos ins/upd por entidad,
omitidos, mensaje.

**Detalle `SyncBitacoraDetalle`** (un renglón por registro): `entidad`
(SUCURSAL/AREA/PUESTO/EMPLEADO/JERARQUIA), `accion` (`insert`/`update`/`omit`), `id_origen`,
`id_local`, `descripcion`.

- **Sync**: el detalle es **transaccional** → solo refleja cambios realmente confirmados. Una
  corrida con rollback queda en `error`/`cancelado` con el motivo y **sin** detalle (los datos
  se revirtieron).
- **Preview**: registra lo **proyectado** (`id_local = null`); `accion` = lo que se aplicaría
  (`insert`=nuevo, `update`=actualizar, `omit`). No escribe en las tablas de datos.

## 10. Uso de la pantalla

1. **Servidores** (tarjetas): Probar conexión, Vista previa, y menú ⋮ Editar/Eliminar.
   Botón **Nuevo servidor** (id = `iD_SERVIDOR`, inmutable tras crearse).
2. **Vista previa**: barra de progreso inline + detalle por entidad (tabs) con badge
   Nuevo/Actualizar/Omitir. No aplica cambios.
3. **Confirmar sincronización**: aplica; barra + bitácora se refrescan al terminar.
4. **Bitácora**: tabla de corridas (fecha, servidor, tipo, usuario, estado, conteos, duración).
   Clic en una fila → modal con el detalle, filtrable por entidad y acción.

## 11. Endpoints internos

`Backend/Sincronizador/App.php` (`POST op=…`):

| op | Descripción |
|---|---|
| `getServidores` | Lista de servidores + última sync |
| `crearServidor` / `actualizarServidor` / `eliminarServidor` | CRUD |
| `probarConexion` | Ping (cuenta sucursales, timeout corto) |
| `previsualizarServidor` | Dry-run (no escribe datos; sí bitácora) |
| `sincronizarServidor` | Sync (no-stream; el UI usa Stream.php) |
| `getEstadoSync` / `cancelarSync` | Estado vivo / solicitar cancelación |
| `getBitacora` / `getBitacoraDetalle` | Historial + detalle (filtros) |

`Backend/Sincronizador/Stream.php` (`POST idServidor, accion=sync|preview`): stream NDJSON
(una línea JSON por paso `{pct,msg}`, evento final `{fin,ok,data}`).

## 12. Notas operativas / pendientes

- **Sin Email/Móvil/CentroCosto** desde la API → locales/opcionales.
- **Granularidad de puesto**: se usa el tipo de puesto (p.ej. "FRUTERO"), se pierde el detalle
  "FRUTERO 1/2/3/4" (la API no expone catálogo de puestos).
- **Jerarquía**: en los datos actuales `iD_EMPLEADO_JEFE_INMEDIATO = -1` → organigrama plano
  hasta que el origen pueble el dato. El nivel cubre el orden mientras tanto.
- **Retención de bitácora**: cada corrida (sync o preview) escribe ~N renglones de detalle; con
  muchas corridas crece. Hay índices + `LIMIT 5000` en el fetch de detalle. Pendiente opcional:
  purga de detalle > N días.
- **Acceso al módulo**: `SincronizadorRH.php` exige login; para que aparezca en el menú hay que
  crear su fila en `menus` + permiso al puesto admin (hoy se entra por URL directa).
