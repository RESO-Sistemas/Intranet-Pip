# Investigación: Sistema de Evaluaciones 360° — Intranet PIP

> **Proyecto:** Intranet-Pip (PHP + jQuery + Syncfusion EJ)
> **Fecha:** 2026-06-03
> **Páginas analizadas:** ListadoEvaluaciones.php · pending-evaluations.php · my-results.php · list-plan-action.php

---

## 1. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | PHP (MVC), clase `Evaluaciones.php`, router `App.php` |
| Frontend | JavaScript vanilla + jQuery |
| UI grids | Syncfusion EJ Grid (`ej.grids.Grid`) |
| Tablas secundarias | DataTables.js |
| Gráficos | Syncfusion EJ Charts (Polar/Radar) |
| Modales | Bootstrap 5 (Modal, Offcanvas) |
| Alertas | SweetAlert2 + Bootstrap Alerts personalizados |
| Multiselect | Select2 |
| AJAX | Función helper `pAjaxAsync` → `Backend/Evaluaciones/App.php` |

---

## 2. Páginas principales y su propósito

### 2.1 `ListadoEvaluaciones.php` — Administración

**Quién la usa:** Administrador / RRHH

**Responsabilidades:**
- Listar todas las evaluaciones del sistema (grid Syncfusion EJ)
- Crear nuevas evaluaciones (wizard 4 pasos)
- Publicar evaluaciones (wizard 3 pasos)
- Ver detalle de una evaluación en panel lateral (offcanvas con 4 tabs)
- Activar / desactivar / eliminar evaluaciones

**Scripts cargados:**
```
scripts/global.js
scripts/ListadoEvaluaciones.js
scripts/PublishWizard.js
```

---

### 2.2 `pending-evaluations.php` — Evaluaciones Pendientes

**Quién la usa:** Cualquier empleado asignado como evaluador

**Responsabilidades:**
- Ver todas las evaluaciones que le corresponde responder
- Ver el progreso de cada evaluación (SVG circular + barra lineal)
- Ver la lista de empleados a evaluar dentro de cada evaluación
- Abrir el cuestionario en overlay full-screen (iframe → `Evaluacion.php`)

**Scripts cargados:**
```
scripts/global.js
scripts/pending-evaluations.js
```

---

### 2.3 `my-results.php` — Mis Resultados

**Quién la usa:** Empleado evaluado (quien recibe la evaluación)

**Responsabilidades:**
- Ver todas las evaluaciones donde el usuario es el **evaluado**
- Ver porcentaje de evaluadores que ya respondieron
- Aceptar retroalimentación (switch checkbox)
- Acceder al plan de acción generado
- Ver resultados detallados en modal: gráfica polar, tabla por competencia, fortalezas/áreas a mejorar

**Scripts cargados:**
```
scripts/my-results/data-results.js
scripts/my-results/general.js
```

---

### 2.4 `list-plan-action.php` — Planes de Acción (vista Jefe)

**Quién la usa:** Jefe / supervisor

**Responsabilidades:**
- Listar subordinados que tienen al menos un plan de acción
- Ver los planes de acción de cada subordinado (modal con DataTable)
- Navegar al detalle del plan (`plan-action.php?PA={id}`)

**Scripts cargados:**
```
scripts/list-plan-action.js (ES module)
```

---

## 3. Entidades y tablas de base de datos

### Tablas principales

```
Evaluaciones
├── idEvaluaciones (PK)
├── Titulo
├── TipoEvaluacion       → 1=360°, 2=Encuesta Normal
├── DirigidoA            → 1=Empleados, 2=Postulantes
├── Periodicidad         → 1=Diario 2=Semanal 3=Mensual 4=Único (solo encuestas normales)
├── FechaInicio / FechaFin
├── RetroFechaIni / RetroFechaFin   → Solo 360°
├── PlanAFechaIni / PlanAFechaFin   → Solo 360°
├── Status               → 0=Inactivo, 1=Activo
└── Activado             → 0=Borrador, 1=Publicada

EvaluacionDetalle (una fila = un par Evaluador → Evaluado en una evaluación)
├── idEvaluacionDetalle (PK)
├── idEvaluaciones (FK)
├── NoEmpleadoEvalua     → quién evalúa
├── NoEmpleadoEvaluado   → a quién evalúan
├── JefeEvalua           → 1 si el evaluador es jefe del evaluado
├── SubordinadoEvalua    → 1 si el evaluador es subordinado del evaluado
├── ParEvalua            → 1 si son pares (mismo nivel)
├── AutoEvalua           → 1 si el evaluado se autoevalúa
├── Status               → 0=Inactivo, 1=Activo
└── StatusEvaluado       → 0=Pendiente, 1=Ya respondió

PreguntasEvaluacion
├── idPreguntasEvaluacion (PK)
├── idEvaluaciones (FK)
├── idCompetencias (FK)
└── idTipoPregunta       → 1=Bool 2=Opción múltiple 3=Rango 4=OM correcta

RespuestaEvaluaciones (una fila = respuesta de un evaluador a una pregunta)
├── idRespuestaEvaluaciones (PK)
├── idEvaluacionDetalle (FK)
├── idPreguntasEvaluacion (FK)
├── Calificacion
└── Comentarios

Competencias
├── idCompetencias (PK)
└── NombreCompetencia (columna SQL: "Competencia")

DetalleCompetencias
├── Calificacion esperada por nivel de empleado

RetroalimentacionEvaluacion
├── IdRetroalimentacionEvaluacion (PK)
├── IdEvaluaciones (FK)
├── NoEmpleado
└── FechaAceptado

PlanesAccionEvaluacion
├── IdPlanesAccionEvaluacion (PK)
├── IdEvaluaciones (FK)
├── NoEmpleado
├── Requerido            → 0=Voluntario, 1=Requerido por competencias bajas
├── StatusConfirmaActividades
├── StatusConfirmaPlanAccion
└── FechaConfirmaPlanAccion

ObjetivosPlanAccion
├── IdObjetivosPlanAccion (PK)
├── IdPlanesAccionEvaluacion (FK)
├── IdCompetencias (FK)
└── Objetivo / DescObjetivo

ActividadesPlanAccion
├── IdActividadesPlanAccion (PK)
├── IdObjetivosPlanAccion (FK)
├── Titulo / Descripcion
├── FechaInicio / FechaFin
└── Progreso (0-100)

AvanceActividadPlanA
├── IdAvanceActividadPlanA (PK)
├── IdActividadesPlanAccion (FK)
├── NuevoAvance
├── DescripcionAvance
├── EstadoAprobacion     → 0=Pendiente, 1=Aprobado, 2=Rechazado
├── MotivoRevision
└── IdHistorialRechazo   → NULL=activo, NOT NULL=archivado
```

---

## 4. Relaciones entre usuarios — Cómo se definen

### 4.1 La tabla clave: `EvaluacionDetalle`

Cada fila de `EvaluacionDetalle` representa **un par de empleados** dentro de una evaluación. Los flags de relación determinan el **tipo** de evaluador:

| Flag | Valor | Significado |
|------|-------|-------------|
| `JefeEvalua = 1` | El evaluador **es jefe** del evaluado | Superior → Subordinado |
| `SubordinadoEvalua = 1` | El evaluador **es subordinado** del evaluado | Subordinado → Superior |
| `ParEvalua = 1` | El evaluador **es par** del evaluado | Compañero → Compañero |
| `AutoEvalua = 1` | El evaluado **se autoevalúa** | Empleado → Sí mismo |

### 4.2 Cómo se genera la etiqueta de relación (frontend)

```javascript
// pending-evaluations.js → getTypeBadgeClass()
function getTypeBadgeClass(tipo) {
  const t = tipo.toLowerCase();
  if (t.includes("par"))      return "par";        // morado
  if (t.includes("superior")) return "superior";   // rosa
  if (t.includes("subordin")) return "subordinado";// azul
  if (t.includes("auto"))     return "auto";       // amarillo
  return "default";
}
```

El texto `RelacionEvaluado` viene del backend, determinado por:
```sql
IF(JefeEvalua = 1, 'Subordinado',    -- desde perspectiva del evaluado: el evaluador es su jefe
   IF(ParEvalua = 1, 'Empleado Par',
      IF(AutoEvalua = 1, 'Auto Evaluación', 'Jefe')))
-- SubordinadoEvalua = 1 → etiqueta = 'Jefe' (del evaluado hacia su subordinado)
```

---

## 5. Flujo completo de creación y publicación

### 5.1 Wizard de creación — `ListadoEvaluaciones.php` (4 pasos)

```
PASO 1 — Datos Generales
├── tipoEvaluacion: 1=360° | 2=Encuesta Normal
├── dirigidoA: 1=Empleados | 2=Postulantes
│   └── Si tipo=360°: dirigidoA se fuerza a 1 (Empleados) y se deshabilita
├── periodicidad: solo visible si tipo=2 y no es Postulantes
└── title_c: Título del cuestionario

PASO 2 — Participantes (omitido si dirigidoA=2 Postulantes)
├── Filtros: División / Sucursal / Puesto
└── slctEmpleados: multiselect Select2 con empleados filtrados

PASO 3 — Fechas
├── inpFechaInicio / inpFechaFin       → siempre para 360°
├── inpRetroIni / inpRetroFin          → solo si tipo=360°
│   └── Validación: retroIni >= fechaFin de evaluación
├── inpPlanAIni / inpPlanAFin          → solo si tipo=360°
│   └── Validación: planIni >= retroFin
└── Validaciones: no fechas pasadas, máx 2 años futuro, mínimo 1 día de diferencia

PASO 4 — Resumen
└── Muestra resumen y botón "Crear Evaluación" → op: saveEvaluationNoE
```

**Al guardar** (`saveEvaluationNoE`):
- Crea registro en `Evaluaciones` con Status=1, Activado=0 (Borrador)
- NO crea aún los registros en `EvaluacionDetalle` — eso ocurre en la publicación

---

### 5.2 Wizard de publicación — `PublishWizard.js` (3 pasos)

Se activa desde el botón "Configurar" en el grid de evaluaciones.

```
PASO 1 — Sucursales
├── Carga: op getListBranchInEvaluation
├── Muestra chips con todas las sucursales de los participantes
└── Admin selecciona cuáles sucursales participan

PASO 2 — Evaluadores
├── Carga: op checkTemporaryDataEvaluation (branch: IDs seleccionadas)
│   └── Backend genera / consulta datos temporales de pares evaluado→evaluador
├── Vista: tabs por sucursal → acordeón por evaluado → lista de evaluadores
├── Cada par muestra: nombre evaluador, tipo (JEFE/PAR/SUBORDINADO/AUTO), toggle ON/OFF
├── Acciones por par:
│   ├── Toggle activo/inactivo → op updateStatusTempDetEv
│   └── Eliminar → op deleteEvaluatorDetail
└── Botón "Agregar evaluador" por evaluado → sub-modal:
    ├── Seleccionar tipo de relación (JEFE=1 / PAR=2 / SUBORDINADO=3)
    ├── Buscar empleado (filtra ya asignados y el mismo evaluado)
    └── Confirmar → op addEmpleadoEvaluadorTempData

PASO 3 — Publicar
├── KPIs: sucursales, evaluados, pares activos, pares inactivos
├── Warning si hay evaluados sin ningún evaluador activo
└── Confirmar → op acceptPublicationOfTheEvaluation
    └── Activa evaluación (Activado=1) y crea RespuestaEvaluaciones para todas las preguntas
```

---

## 6. Cómo se seleccionan los evaluadores

### 6.1 Proceso paso a paso

1. **Al crear la evaluación** se seleccionan los **empleados participantes** (todos serán evaluados).
2. **Al publicar**, el sistema genera automáticamente datos temporales de pares:
   - El backend infiere relaciones jerárquicas desde el organigrama (`Organigramas/App.php`)
   - Genera: jefe directo de cada evaluado → par evaluado
   - Genera: subordinados directos de cada evaluado → pares
   - Genera: auto-evaluación para cada evaluado
3. El admin **revisa y ajusta** en el Paso 2 del wizard de publicación:
   - Puede desactivar pares que no deben evaluar
   - Puede agregar evaluadores manuales con tipo de relación explícito
4. Al **confirmar publicación**: los cuestionarios se activan solo para pares con `Status=1`

### 6.2 Auto-evaluación

- Siempre se genera automáticamente
- `AutoEvalua=1` en `EvaluacionDetalle` donde `NoEmpleadoEvalua = NoEmpleadoEvaluado`
- En la UI: no puede desactivarse ni eliminarse (lock/disabled en el wizard)

### 6.3 Condición mínima para publicar

Si un evaluado tiene **cero evaluadores activos**, aparece un warning en el Paso 3 y su cuestionario NO se activa.

---

## 7. Flujo del evaluador — `pending-evaluations.php`

### 7.1 Carga inicial

```javascript
loadAllFunctions()
  └── getEvaluacionesDisponibles()
       op: "getEvaluacionesDisponibles"
       Retorna: [{
         idEvaluaciones, Evaluacion, FechaInicio, FechaFin,
         Detalle: [{
           idEvDetalle,       // ID de EvaluacionDetalle (Base64)
           Nombre,            // nombre del evaluado
           RelacionEvaluado,  // Subordinado | Empleado Par | Auto Evaluación | Jefe
           StatusEvaluado,    // 0=pendiente, 1=completado
           StatusRealizado,   // texto: Realizada / Pendiente
           Respondidas        // número de respuestas registradas
         }]
       }]
```

### 7.2 KPIs calculados en frontend

```javascript
function calcProgress(evaluation) {
  const total = evaluation.Detalle?.length;
  const done = evaluation.Detalle.reduce((acc, d) => acc + Number(d.StatusEvaluado), 0);
  return Math.round((done * 100) / total);
}
// KPIs: Total evaluaciones, En Proceso (pct < 100), Completadas (pct === 100)
```

### 7.3 Abrir cuestionario

```javascript
openEvaluationCanvas(idEvDetalle)
  // Abre overlay full-screen
  iframe.src = `Evaluacion.php?EV=${encodeURIComponent(idEvDetalle)}`
```

El cuestionario (`Evaluacion.php`) se comunica de vuelta vía `postMessage`:
```javascript
window.addEventListener("message", function(event) {
  if (event.data?.type === "ev-title")    // actualiza título en header del overlay
  if (event.data?.type === "ev-finished") // cierra overlay y recarga evaluaciones
})
```

---

## 8. Flujo del evaluado — `my-results.php`

### 8.1 Carga de tarjetas

```javascript
getAllGeneralDataPerEmployeeFinal()
  op: "getAllGeneralDataPerEmployeeFinal"
  Retorna por evaluación: {
    idEvaluaciones, NameEvaluacion, TipoEvaluacion,
    CantMisEvaluadores,     // total de evaluadores asignados
    CantMisEvaluadoresF,    // evaluadores que ya respondieron
    RetroRealizada,         // 0=no, 1=sí
    RetroDisponible,        // ¿estamos en el período RetroFechaIni-RetroFechaFin?
    MsgRetroDisponible,
    ConPlanAccion,          // 1 si ya tiene plan generado
    PlanAction,             // ID del plan (para link a plan-action.php)
    GrupoEvaluado,          // A, B, C, D
    PlanAFechaIni/Fin,
    // Solo evaluaciones normales completadas:
    CalificacionFinal, TotalCompetencias, FortalezasCount, DebilidadesCount,
    CompetenciasDetalle: [...]
  }
```

### 8.2 Estado de cada tarjeta 360°

| Condición | Elemento mostrado |
|-----------|------------------|
| `RetroRealizada == 1` | Badge verde "Aceptada" |
| `RetroDisponible == 1` | Switch para aceptar retroalimentación |
| Ni una ni otra | Texto con `MsgRetroDisponible` |
| `ConPlanAccion == 1` | Link "Ir al plan" → `plan-action.php?PA={id}` |
| Sin plan | Texto "Sin plan generado" |
| `CantMisEvaluadoresF == CantMisEvaluadores` | Botón "Ver detalles" habilitado |
| Evaluación en progreso | Botón "En progreso" deshabilitado |

### 8.3 Aceptar retroalimentación

```javascript
// Switch checkbox → acceptFeedback(evaluationId)
op: "acceptFeedback"
evaluation: idEvaluaciones
→ Backend: crea RetroalimentacionEvaluacion, evalúa si hay competencias < 70,
           si las hay → crea PlanesAccionEvaluacion + ObjetivosPlanAccion automáticamente
→ Frontend: location.reload()
```

### 8.4 Ver resultados detallados (modal)

```javascript
viewFinalResults(ev, retro, employee, planA, dateIni, dateEnd, planActionId, evaluationType)
  1. getConfigQuestionsEvaluated(evaluation, employee)
     op: "getConfigQuestionsEvaluated"
     Retorna: { AllAnswersQuestion, ConfigQ, LvlEmp, allEvaluationDetail }
  
  2. getPrincipalDetailEvaluated(employee)  → datos del empleado (nombre, puesto, foto)
  
  3. getListEvaluatorsDetail(employee, evaluation)
     op: "getListEvaluatorsDetail"
     Retorna: lista de evaluadores con JefeEvalua, ParEvalua, SubordinadoEvalua, AutoEvalua, IdEvDetail
  
  4. printFinalDataEvaluated()
     → Para 360°: getFinalDataEvaluated()
     → Para Normal: getFinalDataEvaluatedNormal()
```

---

## 9. Cálculo de resultados — Lógica central

### 9.1 Grupos de evaluación (solo 360°)

El grupo se determina por los **tipos de evaluadores** que respondieron:

| Grupo | Evaluadores presentes | Jefe | Auto | Par | Sub |
|-------|-----------------------|------|------|-----|-----|
| **A** | Jefe + Auto + Par + Sub | 40% | 10% | 25% | 25% |
| **B** | Jefe + Auto + Par | 50% | 20% | 30% | — |
| **C** | Jefe + Auto + Sub | 50% | 20% | — | 30% |
| **D** | Jefe + Auto | 65% | 35% | — | — |

```javascript
// data-results.js → getFinalDataEvaluated()
if (dataJe > 0 && dataAuto > 0 && dataPar > 0 && dataSub > 0) {
  group = "A"; porcentJe = 0.4; porcentAuto = 0.1; porcentPar = 0.25; porcentSub = 0.25;
} else if (dataJe > 0 && dataAuto > 0 && dataPar > 0) {
  group = "B"; porcentJe = 0.5; porcentAuto = 0.2; porcentPar = 0.3;
} else if (dataJe > 0 && dataAuto > 0 && dataSub > 0) {
  group = "C"; porcentJe = 0.5; porcentAuto = 0.2; porcentSub = 0.3;
} else if (dataJe > 0 && dataAuto > 0) {
  group = "D"; porcentJe = 0.65; porcentAuto = 0.35;
}
```

### 9.2 Cálculo por pregunta según tipo

```javascript
// getDataResultsPerEvaluatorUnique()

// Tipo 1 — Verdadero/Falso (Boolean)
if (BoolCorreta == respuesta) sumFinal += 100; else sumFinal += 0;

// Tipo 2 — Opción múltiple con respuesta esperada por nivel
// Si coincide con respuesta esperada → 100
// Si la respuesta está "antes" que la esperada (mejor) → 100
// Si está "después" (peor) → penalización proporcional a cuántas posiciones después

// Tipo 3 — Rango numérico
diffRange = RangoFinal - RangoInicial
diffValue = diffRange - respuestaNumérica
restFinal = 100 - diffValue
sumFinal += restFinal;

// Tipo 4 — Opción múltiple correcta única
if (respuesta == RespuestaCorrectaOM) sumFinal += 100; else sumFinal += 0;
```

### 9.3 Puntuación final de competencia

```
resultadoCompetencia = sumFinal / cantidadPreguntas
```

### 9.4 Resultado final del evaluado

```
resultadoFinal = promedio(resultadosPonderados de todas las competencias)
```

### 9.5 Competencias débiles → Plan de acción

```javascript
// bestAndWorstCompetencesPerEvaluator()
worstCompetences = arr.filter(c => Number(c.result) < 70);
// Si worstCompetences.length > 0 → se requiere plan de acción
```

---

## 10. Planes de acción — `list-plan-action.php`

### 10.1 Vista del jefe

```javascript
loadInitialFunctions()
  └── getEmployeesWhitPlanAction()
       op: "getEmployeesWhitPlanAction"
       Retorna: [{ NoEmpleado, Nombre, Sucursal, Puesto }]
       // Solo subordinados del jefe actual con al menos un plan registrado
```

### 10.2 Ver planes de un subordinado

```javascript
getPlanActionPerEmployee(noEmpleado, nombre)
  op: "getPlanActionPerEmployee"
  employee: noEmpleado
  Retorna: [{
    Titulo,                      // nombre de la evaluación
    idPlanesAccionEvaluacion,
    MsgEstadoPlanA,              // "Plan de acción finalizado" | otro
    CantidadAvancesPendientes    // avances esperando revisión del jefe
  }]
```

### 10.3 Estados de un plan (badges)

| Condición | Badge |
|-----------|-------|
| `MsgEstadoPlanA === 'Plan de acción finalizado'` | Verde: "Finalizado" |
| `CantidadAvancesPendientes > 0` | Azul: "{N} pendiente(s) de revisión" |
| Ninguna de las anteriores | Amarillo: "En Proceso" |

Navega a `plan-action.php?PA={idPlanesAccionEvaluacion}` para el detalle completo.

---

## 11. Operaciones API — Referencia completa

Todas las operaciones van por POST a `Backend/Evaluaciones/App.php` con campo `op`.

### Administración (ListadoEvaluaciones)

| Operación | Descripción |
|-----------|-------------|
| `getEvaluaciones` | Lista todas las evaluaciones con contadores de progreso |
| `saveEvaluationNoE` | Crea nueva evaluación (paso 4 del wizard) |
| `updateStatusEvaluacion` | Activa / desactiva una evaluación |
| `deleteEvaluacion` | Elimina evaluación y todos sus datos |
| `getDivisionesEvaluacion` | Catálogo de divisiones para filtro |
| `getSucursalesXDivisionEvaluacion` | Sucursales de una división |
| `getPuestosEvaluacion` | Catálogo de puestos para filtro |
| `getEmpleadosParaEvaluacion` | Empleados filtrados por división/sucursal/puesto |

### Publicación (PublishWizard)

| Operación | Descripción |
|-----------|-------------|
| `getListBranchInEvaluation` | Sucursales de los participantes de una evaluación |
| `checkTemporaryDataEvaluation` | Genera/carga pares evaluado→evaluador por sucursal |
| `updateStatusTempDetEv` | Activa o desactiva un par específico |
| `deleteEvaluatorDetail` | Elimina un evaluador de un par |
| `addEmpleadoEvaluadorTempData` | Agrega evaluador manual con tipo de relación |
| `acceptPublicationOfTheEvaluation` | Publica la evaluación (Activado=1) |

### Evaluador (pending-evaluations)

| Operación | Descripción |
|-----------|-------------|
| `getEvaluacionesDisponibles` | Evaluaciones con sus pares por el usuario actual |

### Evaluado (my-results)

| Operación | Descripción |
|-----------|-------------|
| `getAllGeneralDataPerEmployeeFinal` | Tarjetas resumen de evaluaciones del usuario |
| `getConfigQuestionsEvaluated` | Config preguntas, respuestas posibles, nivel |
| `getListEvaluatorsDetail` | Evaluadores que respondieron con su tipo de relación |
| `getPrincipalDetailEvaluated` | Datos del empleado evaluado |
| `getGeneralDetailEvaluatedUs` | Detalle general de una evaluación específica |
| `acceptFeedback` | Acepta retroalimentación y genera plan si hay debilidades |
| `acceptResultsEvaluation` | Acepta resultados y opcionalmente genera plan manual |
| `getSummaryPlanAction` | Resumen del estado del plan de acción |

### Planes de acción (list-plan-action)

| Operación | Descripción |
|-----------|-------------|
| `getEmployeesWhitPlanAction` | Subordinados con plan de acción |
| `getPlanActionPerEmployee` | Planes de acción de un subordinado específico |

---

## 12. Flujo de vida completo de una evaluación 360°

```
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 1: CREACIÓN (Admin — ListadoEvaluaciones.php)                 │
│                                                                     │
│  Wizard 4 pasos → saveEvaluationNoE                                │
│  Resultado: Evaluaciones(Status=1, Activado=0) ← BORRADOR          │
└─────────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 2: CONFIGURACIÓN DE PREGUNTAS (Admin — panel Preguntas)       │
│                                                                     │
│  Asigna competencias y preguntas a la evaluación                   │
│  Resultado: PreguntasEvaluacion, PreguntasPosiblesRespuestas       │
└─────────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 3: PUBLICACIÓN (Admin — PublishWizard.js)                     │
│                                                                     │
│  Paso 1: Seleccionar sucursales                                    │
│  Paso 2: Revisar/ajustar pares evaluado→evaluador                  │
│    └── Sistema infiere relaciones del organigrama automáticamente  │
│    └── Admin puede agregar/quitar/activar/desactivar               │
│  Paso 3: Publicar → acceptPublicationOfTheEvaluation               │
│  Resultado: Evaluaciones(Activado=1)                               │
│             EvaluacionDetalle con Status=1 para cada par activo    │
│             RespuestaEvaluaciones vacías generadas                 │
└─────────────────────────────────────────────────────────────────────┘
                          ↓  (dentro del período FechaInicio-FechaFin)
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 4: EVALUACIÓN (Evaluadores — pending-evaluations.php)         │
│                                                                     │
│  1. getEvaluacionesDisponibles → ve tarjetas con evaluados         │
│  2. Click en evaluado → overlay con iframe Evaluacion.php          │
│  3. Responde pregunta por pregunta (tipos 1-4)                     │
│  4. Cada respuesta → saveResultCompetence (autoguardado)           │
│  5. Finalizar → finishEvaluation (SP: spFinalizaEvaluacion)        │
│     Resultado: EvaluacionDetalle(StatusEvaluado=1)                 │
└─────────────────────────────────────────────────────────────────────┘
                          ↓  (dentro del período RetroFechaIni-RetroFechaFin)
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 5: RETROALIMENTACIÓN (Evaluado — my-results.php)              │
│                                                                     │
│  1. getAllGeneralDataPerEmployeeFinal → ve tarjeta con switch       │
│  2. Revisa resultados: gráfica polar, tabla competencias           │
│     Cálculo: grupo A/B/C/D con ponderaciones 40/25/25/10%         │
│  3. Acepta retroalimentación → acceptFeedback                      │
│     Resultado: RetroalimentacionEvaluacion creado                  │
│     Si hay competencias < 70% →                                    │
│       PlanesAccionEvaluacion(Requerido=1) + ObjetivosPlanAccion    │
└─────────────────────────────────────────────────────────────────────┘
                          ↓  (dentro del período PlanAFechaIni-PlanAFechaFin)
┌─────────────────────────────────────────────────────────────────────┐
│ FASE 6: PLAN DE ACCIÓN (Empleado + Jefe)                          │
│                                                                     │
│  EMPLEADO (my-plan-action / plan-action.php):                      │
│  1. Define actividades para cada objetivo generado                 │
│  2. Confirma actividades → StatusConfirmaActividades=1             │
│  3. Registra avances periódicamente                                │
│                                                                     │
│  JEFE (list-plan-action.php):                                      │
│  1. Ve subordinados con planes pendientes                          │
│  2. Revisa avances: Aprobar / Rechazar por avance                  │
│  3. Si rechaza → HistorialRechazosPlanA + empleado reintenta       │
│                                                                     │
│  CIERRE:                                                           │
│  Todas actividades al 100% → empleado confirma plan               │
│  → StatusConfirmaPlanAccion=1                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 13. Diferencias: 360° vs Encuesta Normal

| Aspecto | Evaluación 360° | Encuesta Normal |
|---------|----------------|-----------------|
| `TipoEvaluacion` | 1 | 2 |
| `DirigidoA` | Solo Empleados (forzado) | Empleados o Postulantes |
| Períodos adicionales | Retro + Plan de acción | No aplica |
| Grupos de evaluación | A/B/C/D con ponderaciones | No aplica |
| Retroalimentación | Sí (aceptación obligatoria) | No aplica |
| Plan de acción | Sí (automático si < 70%) | No aplica |
| Tabs en panel admin | Todos (Resumen/Preguntas/Evaluados/Resultados) | Oculta tabs Evaluados y Resultados |
| Cálculo resultado | Ponderado por tipo de evaluador | Promedio simple por evaluador |
| Modal `my-results` | Layout con sidebar de perfil + estado | Layout compacto sin sidebar |

---

## 14. Seguridad y codificación de IDs

- **Base64 en URLs:** Los IDs se pasan como `btoa(id)` en la URL y en parámetros AJAX
- **Sesión PHP:** `SessionManager::requireLogin()` protege todas las páginas
- **Autenticación:** JWT (en la API .NET) o sesión PHP (en la intranet web)
- **Visibilidad:** El evaluador solo ve los pares donde él es `NoEmpleadoEvalua`; el evaluado solo ve sus propias evaluaciones

---

## 15. Puntos de extensión y deuda técnica conocida

| Aspecto | Observación |
|---------|-------------|
| Organigrama | La inferencia automática de relaciones (jefe/par/sub) depende de `Organigramas/App.php` — no está documentada en este análisis |
| `console.log` en producción | `data-results.js` y `general.js` tienen múltiples `console.log` activos |
| Grupo sin jefe | Si no hay evaluador con `JefeEvalua=1`, el sistema no entra en ningún grupo (A/B/C/D) y el cálculo no produce resultados |
| Tipo de pregunta 5 | `idTipoPregunta=5` (texto libre) existe en la API móvil pero no aparece en el frontend web |
| Evaluación Normal para Postulantes | Flujo diferente (usa `VacantesEvaluaciones`, `PostulantesEvaluaciones`) — no cubierto en estas páginas |
