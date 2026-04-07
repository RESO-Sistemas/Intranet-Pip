# 📚 Sistema de Evaluaciones para Candidatos - Documentación Técnica

> **Módulo:** Portal del Candidato - Evaluaciones  
> **Archivos principales:** `EstatusPostulante.php`, `ResponderEvaluacion.php`  
> **Última actualización:** Abril 2026  
> **Autor:** Sistema PIP

---

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Flujo de Usuario](#flujo-de-usuario)
4. [Componentes Técnicos](#componentes-técnicos)
5. [Guía de Implementación](#guía-de-implementación)
6. [API Endpoints Utilizados](#api-endpoints-utilizados)
7. [Tipos de Preguntas](#tipos-de-preguntas)
8. [Estados de Evaluación](#estados-de-evaluación)
9. [Validaciones y Seguridad](#validaciones-y-seguridad)
10. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Descripción General

El **Sistema de Evaluaciones para Candidatos** permite que los postulantes puedan:

- Ver las evaluaciones asignadas en el timeline de cada proceso de selección
- Responder evaluaciones con diferentes tipos de preguntas
- Guardar su progreso en múltiples sesiones
- Finalizar evaluaciones y obtener calificación automática
- Ver evaluaciones completadas en modo solo lectura

### Características principales

✅ **Integración transparente** con el portal existente del candidato  
✅ **4 tipos de preguntas** soportados (abierta, opción múltiple, rango, casillas)  
✅ **Auto-guardado** manual con persistencia de respuestas  
✅ **Validación de completitud** antes de finalizar  
✅ **Calificación automática** basada en respuestas correctas  
✅ **Vista de solo lectura** para evaluaciones completadas  
✅ **Diseño responsivo** y consistente con el resto del portal

---

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos

```
/Intranet-Pip/
│
├── EstatusPostulante.php          # Portal principal del candidato (MODIFICADO)
│   ├── PHP: Carga evaluaciones por proceso
│   └── JS: Renderiza evaluaciones en timeline
│
├── ResponderEvaluacion.php        # Vista para responder evaluaciones (NUEVO)
│   ├── Validación de sesión y permisos
│   ├── Carga de preguntas desde API
│   ├── Renderizado dinámico según tipo
│   ├── Guardado de respuestas
│   ├── Finalización y calificación
│   └── Vista de evaluación completada
│
└── Backend/EvaluacionesPostulante/
    ├── App.php                     # Controlador API (SIN CAMBIOS)
    └── EvaluacionesPostulante.php  # Modelo de datos (SIN CAMBIOS)
```

### Diagrama de Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                     PORTAL DEL CANDIDATO                         │
│                   (EstatusPostulante.php)                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 1. Login con CURP + Teléfono
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  SESSION                                                          │
│  - logged_in = true                                               │
│  - curp_candidato = "XXXX..."                                     │
│  - nombre_candidato = "Juan"                                      │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 2. Selecciona postulación
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHP Backend                                                      │
│  - Obtiene historial de procesos (getProcesosPostulacion)        │
│  - Para cada proceso:                                             │
│    └─> Obtiene evaluaciones (getEvaluacionesPorProceso)          │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 3. Renderiza timeline con evaluaciones
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  TIMELINE                                                         │
│  ├─ Postulación Recibida ✓                                       │
│  ├─ 1ra Entrevista ⏱                                             │
│  │  └─ Evaluación Técnica [Responder]  ← Botón de acción        │
│  └─ 2da Entrevista (pendiente)                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 4. Click en "Responder evaluación"
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              ResponderEvaluacion.php?id=123                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 5. getPreguntasEvaluacionPostulante                      │    │
│  │    - Carga preguntas con opciones                        │    │
│  │    - Carga respuestas previas si existen                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Renderiza preguntas:                                     │    │
│  │ - Tipo 1: Textarea                                       │    │
│  │ - Tipo 2: Radio buttons                                  │    │
│  │ - Tipo 3: Range slider                                   │    │
│  │ - Tipo 4: Checkboxes                                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 6. Usuario responde preguntas                            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 7a. [Guardar progreso] → saveRespuestasPostulante       │    │
│  │     - Permite guardar respuestas parciales               │    │
│  │     - Usuario puede salir y volver después               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 7b. [Finalizar evaluación] → finalizarEvaluacionPost... │    │
│  │     - Valida que todas estén respondidas                 │    │
│  │     - Calcula calificación                               │    │
│  │     - Marca como completada (Estatus 3)                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 8. Modal: "¡Evaluación completada! 85%"                 │    │
│  │    [Volver al Portal]                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────┘
                 │
                 │ 9. Regresa al portal
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  TIMELINE (actualizado)                                           │
│  ├─ Postulación Recibida ✓                                       │
│  ├─ 1ra Entrevista ⏱                                             │
│  │  └─ Evaluación Técnica ✓ Completada • 85%                    │
│  └─ 2da Entrevista (pendiente)                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👤 Flujo de Usuario

### Paso 1: Ver Evaluaciones en el Timeline

1. El candidato inicia sesión en `EstatusPostulante.php`
2. Selecciona una postulación de la lista lateral
3. Ve el timeline con todos los procesos
4. Las evaluaciones aparecen como sub-items dentro de cada proceso
5. Cada evaluación muestra:
   - Nombre de la evaluación
   - Estado actual (Pendiente/En progreso/Completada)
   - Botón de acción según estado

### Paso 2: Responder una Evaluación

1. Click en botón **"Responder evaluación"** o **"Continuar evaluación"**
2. Redirige a `ResponderEvaluacion.php?id={IdPostulanteEvaluacion}`
3. Carga automática de preguntas desde la API
4. Muestra barra de progreso visual
5. Renderiza preguntas según su tipo

### Paso 3: Guardar Progreso

- El candidato puede guardar en cualquier momento usando **"Guardar progreso"**
- Las respuestas se persisten en la base de datos
- Puede cerrar el navegador y volver después
- Al regresar, las respuestas previas se cargan automáticamente

### Paso 4: Finalizar Evaluación

1. Cuando todas las preguntas están respondidas, se habilita **"Finalizar evaluación"**
2. Confirmación del usuario (modal de confirmación)
3. Backend valida completitud
4. Calcula calificación automáticamente
5. Cambia estado a "Completada" (3)
6. Muestra modal con resultado
7. Regresa al portal

### Paso 5: Ver Evaluación Completada

- Las evaluaciones completadas aparecen con badge verde
- Muestran la calificación obtenida (ej: "85%")
- Si el usuario entra nuevamente, ve modo solo lectura
- No se pueden modificar respuestas

---

## 🔧 Componentes Técnicos

### 1. EstatusPostulante.php (Modificaciones)

#### A) Backend PHP (Líneas 274-297)

**Cambio realizado:**

```php
require_once __DIR__ . '/Backend/EvaluacionesPostulante/EvaluacionesPostulante.php';
$EvaluacionesPostulante = new EvaluacionesPostulante();

// Dentro del loop de postulaciones:
$evaluacionesPorProceso = [];
if (!empty($historial)) {
    foreach ($historial as $proceso) {
        $evaluacionesResult = json_decode(
            $EvaluacionesPostulante->getEvaluacionesPorProceso(
                $proceso['IdProceso'], 
                $_SESSION['curp_candidato']
            ), 
            true
        );
        if ($evaluacionesResult['Resultado'] && !empty($evaluacionesResult['Data'])) {
            $evaluacionesPorProceso[$proceso['IdProceso']] = $evaluacionesResult['Data'];
        }
    }
}
$p['Evaluaciones'] = $evaluacionesPorProceso;
```

**Función:**
- Carga las evaluaciones para cada proceso del historial
- Asocia evaluaciones con su proceso mediante `IdProceso`
- Agrega evaluaciones al array de datos de postulación

#### B) Frontend JavaScript (Líneas 406-480)

**Cambio realizado:**

Después de renderizar cada proceso del historial, se agregó:

```javascript
// Renderizar evaluaciones asociadas a este proceso
if (p.Evaluaciones && p.Evaluaciones[h.IdProceso]) {
    const evaluaciones = p.Evaluaciones[h.IdProceso];
    evaluaciones.forEach(ev => {
        let evClass, evIcon, evHeading, evButton = "";
        
        // Determinar estilo según estatus
        if (ev.EstatusEvaluacion == 1) { // Pendiente
            evClass = "active";
            evIcon = "clipboard-list";
            evHeading = "text-[#f2bb46]";
            evButton = `<a href="ResponderEvaluacion.php?id=${ev.IdPostulanteEvaluacion}">
                Responder evaluación
            </a>`;
        }
        // ... más casos para estatus 2 y 3
        
        // Renderizar item en timeline
        timelineHTML += `<div class="timeline-item ${evClass}">...</div>`;
    });
}
```

**Función:**
- Renderiza evaluaciones como sub-items del timeline
- Asigna colores e iconos según estado
- Genera botones de acción dinámicos
- Mantiene consistencia visual con el timeline

---

### 2. ResponderEvaluacion.php (Nuevo archivo)

#### A) Validación de Sesión (Líneas 1-18)

```php
session_start();

// Validar sesión activa
$is_logged_in = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
if (!$is_logged_in) {
    header("Location: EstatusPostulante.php");
    exit;
}

// Obtener y validar IdPostulanteEvaluacion
$IdPostulanteEvaluacion = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($IdPostulanteEvaluacion === 0) {
    header("Location: EstatusPostulante.php");
    exit;
}
```

**Seguridad:**
- ✅ Requiere sesión activa del candidato
- ✅ Valida que exista `IdPostulanteEvaluacion` en URL
- ✅ Redirige al portal si falta alguna validación
- ✅ El backend valida ownership adicional

#### B) Estructura HTML

**Header:**
- Logo PIP
- Badge "Evaluación"
- Título dinámico
- Botón "Volver al Portal"

**Main Section:**
1. **Loading State** (inicial)
   - Spinner de carga
   - Mensaje "Cargando evaluación..."

2. **Error State** (si falla)
   - Ícono de error
   - Mensaje descriptivo
   - Botón para volver

3. **Evaluación Container** (vista principal)
   - Barra de progreso
   - Contenedor de preguntas
   - Botones de acción
   - Vista de evaluación completada

**Footer:**
- Copyright PIP

#### C) Estilos CSS

**Reutilización de diseño:**
- `.magic-card` - Tarjetas con borde sutil
- `.minimal-input` - Inputs con línea inferior
- `.ripple-btn` - Botones con efecto hover
- `.glow-orb` - Orbes de fondo animados
- `.bg-dot-pattern` - Patrón de puntos

**Estilos nuevos:**
- `.pregunta-card` - Tarjeta para cada pregunta
- `.option-label` - Labels para radio/checkbox
- `input[type="range"]` - Slider personalizado
- `.toast` - Notificaciones temporales
- `.spinner` - Indicador de carga

#### D) JavaScript - Funciones Principales

##### 1. `cargarEvaluacion()`

```javascript
async function cargarEvaluacion() {
    const formData = new FormData();
    formData.append("op", "getPreguntasEvaluacionPostulante");
    formData.append("IdPostulanteEvaluacion", ID_EVALUACION);
    
    const response = await fetch("Backend/EvaluacionesPostulante/App.php", {
        method: "POST",
        credentials: "same-origin",
        body: formData
    });
    
    const data = await response.json();
    
    if (data.Resultado) {
        ESTATUS_EVALUACION = data.Estatus;
        PREGUNTAS = data.Data;
        renderizarPreguntas();
        actualizarProgreso();
    }
}
```

**Función:**
- Llama al endpoint `getPreguntasEvaluacionPostulante`
- Carga preguntas con opciones y respuestas previas
- Guarda estatus de la evaluación
- Inicia renderizado de UI

##### 2. `renderizarPreguntas()`

```javascript
function renderizarPreguntas() {
    PREGUNTAS.forEach((pregunta, index) => {
        let inputHTML = "";
        
        switch(parseInt(pregunta.idTipoPregunta)) {
            case 1: // Abierta
                inputHTML = `<textarea>...</textarea>`;
                break;
            case 2: // Opción múltiple
                inputHTML = `<input type="radio">...`;
                break;
            case 3: // Rango
                inputHTML = `<input type="range">...`;
                break;
            case 4: // Casillas
                inputHTML = `<input type="checkbox">...`;
                break;
        }
        
        // Crear y agregar card al DOM
    });
}
```

**Función:**
- Itera sobre todas las preguntas
- Renderiza inputs según tipo de pregunta
- Carga respuestas previas si existen
- Aplica estilos y estructura consistente

##### 3. `actualizarProgreso()`

```javascript
function actualizarProgreso() {
    const respondidas = contarPreguntasRespondidas();
    const porcentaje = (respondidas / TOTAL_PREGUNTAS) * 100;
    
    document.getElementById('progreso-texto').textContent = 
        `${respondidas} de ${TOTAL_PREGUNTAS} respondidas`;
    document.getElementById('barra-progreso').style.width = `${porcentaje}%`;
    
    // Habilitar/deshabilitar botón finalizar
    const btnFinalizar = document.getElementById('btn-finalizar');
    btnFinalizar.disabled = !(respondidas === TOTAL_PREGUNTAS);
}
```

**Función:**
- Cuenta preguntas respondidas
- Actualiza barra de progreso visual
- Actualiza texto de progreso
- Controla estado del botón "Finalizar"

##### 4. `guardarRespuestas()`

```javascript
async function guardarRespuestas() {
    const respuestas = obtenerRespuestas(); // Array de {IdPregunta, Respuesta}
    
    const formData = new FormData();
    formData.append("op", "saveRespuestasPostulante");
    formData.append("IdPostulanteEvaluacion", ID_EVALUACION);
    formData.append("respuestas", JSON.stringify(respuestas));
    
    const response = await fetch("Backend/EvaluacionesPostulante/App.php", {
        method: "POST",
        credentials: "same-origin",
        body: formData
    });
    
    const data = await response.json();
    
    if (data.Resultado) {
        mostrarToast('Progreso guardado correctamente', 'success');
    }
}
```

**Función:**
- Recopila respuestas del formulario
- Envía a `saveRespuestasPostulante`
- Muestra notificación de éxito/error
- Permite guardado parcial

##### 5. `finalizarEvaluacion()`

```javascript
async function finalizarEvaluacion() {
    // Validar completitud
    if (contarPreguntasRespondidas() < TOTAL_PREGUNTAS) {
        mostrarToast('Faltan preguntas por responder', 'warning');
        return;
    }
    
    // Confirmar acción
    if (!confirm('¿Finalizar evaluación? No podrás modificar respuestas.')) {
        return;
    }
    
    // Guardar respuestas primero
    await guardarRespuestas();
    
    // Finalizar evaluación
    const formData = new FormData();
    formData.append("op", "finalizarEvaluacionPostulante");
    formData.append("IdPostulanteEvaluacion", ID_EVALUACION);
    
    const response = await fetch("Backend/EvaluacionesPostulante/App.php", {
        method: "POST",
        credentials: "same-origin",
        body: formData
    });
    
    const data = await response.json();
    
    if (data.Resultado) {
        mostrarModalExito(data.Calificacion);
    }
}
```

**Función:**
- Valida que todas las preguntas estén respondidas
- Solicita confirmación del usuario
- Guarda respuestas finales
- Finaliza evaluación
- Muestra modal con calificación

##### 6. `obtenerRespuestas()`

```javascript
function obtenerRespuestas() {
    const respuestas = [];
    const preguntas = document.querySelectorAll('[data-pregunta-id]');
    
    preguntas.forEach(pregunta => {
        const idPregunta = parseInt(pregunta.dataset.preguntaId);
        const tipo = pregunta.dataset.tipo;
        let respuesta = "";
        
        if (tipo === "1") { // Textarea
            respuesta = pregunta.querySelector('textarea').value.trim();
        } else if (tipo === "2") { // Radio
            const checked = pregunta.querySelector('input:checked');
            respuesta = checked ? checked.value : "";
        } else if (tipo === "3") { // Range
            respuesta = pregunta.querySelector('input[type="range"]').value;
        } else if (tipo === "4") { // Checkbox
            const checked = pregunta.querySelectorAll('input:checked');
            respuesta = Array.from(checked).map(c => c.value).join(', ');
        }
        
        if (respuesta !== "") {
            respuestas.push({ IdPregunta: idPregunta, Respuesta: respuesta });
        }
    });
    
    return respuestas;
}
```

**Función:**
- Extrae respuestas del DOM
- Maneja cada tipo de pregunta apropiadamente
- Formatea respuestas según API esperada
- Retorna array compatible con backend

---

## 🔌 API Endpoints Utilizados

### 1. `getEvaluacionesPorProceso`

**Endpoint:** `Backend/EvaluacionesPostulante/App.php`

**Parámetros:**
```javascript
{
    op: "getEvaluacionesPorProceso",
    IdProceso: 3
}
```

**Respuesta exitosa:**
```json
{
    "Resultado": true,
    "Siguiente": true,
    "Data": [
        {
            "IdPostulanteEvaluacion": 15,
            "EstatusEvaluacion": 1,
            "TxEstatus": "Pendiente",
            "Calificacion": null,
            "NombreEvaluacion": "Evaluación Técnica Backend",
            "NombreProceso": "1ra Entrevista",
            "NombreVacante": "Desarrollador PHP",
            "IdVacante": 5
        }
    ]
}
```

**Uso:** Cargar evaluaciones en el timeline de `EstatusPostulante.php`

---

### 2. `getPreguntasEvaluacionPostulante`

**Endpoint:** `Backend/EvaluacionesPostulante/App.php`

**Parámetros:**
```javascript
{
    op: "getPreguntasEvaluacionPostulante",
    IdPostulanteEvaluacion: 12
}
```

**Respuesta exitosa:**
```json
{
    "Resultado": true,
    "Siguiente": true,
    "Estatus": 1,
    "Data": [
        {
            "IdPregunta": 5,
            "Titulo": "¿Cuántos años de experiencia tienes en PHP?",
            "Descripcion": "Selecciona el rango que mejor te describe.",
            "idTipoPregunta": 2,
            "TipoPregunta": "Opción múltiple",
            "Competencia": "Habilidades técnicas",
            "Opciones": [
                { "IdOpcion": 1, "Texto": "Menos de 1 año" },
                { "IdOpcion": 2, "Texto": "1 a 3 años" },
                { "IdOpcion": 3, "Texto": "Más de 3 años" }
            ],
            "RespuestaPrevia": null
        }
    ]
}
```

**Uso:** Cargar preguntas y respuestas previas en `ResponderEvaluacion.php`

---

### 3. `saveRespuestasPostulante`

**Endpoint:** `Backend/EvaluacionesPostulante/App.php`

**Parámetros:**
```javascript
{
    op: "saveRespuestasPostulante",
    IdPostulanteEvaluacion: 12,
    respuestas: JSON.stringify([
        { IdPregunta: 5, Respuesta: "Más de 3 años" },
        { IdPregunta: 6, Respuesta: "8" }
    ])
}
```

**Respuesta exitosa:**
```json
{
    "Resultado": true,
    "Siguiente": true,
    "ConMsg": true,
    "Msg": "Se guardaron 2 respuesta(s) correctamente.",
    "Guardadas": 2
}
```

**Uso:** Guardar progreso del candidato (puede llamarse múltiples veces)

---

### 4. `finalizarEvaluacionPostulante`

**Endpoint:** `Backend/EvaluacionesPostulante/App.php`

**Parámetros:**
```javascript
{
    op: "finalizarEvaluacionPostulante",
    IdPostulanteEvaluacion: 12
}
```

**Respuesta exitosa:**
```json
{
    "Resultado": true,
    "Siguiente": true,
    "ConMsg": true,
    "Msg": "¡Evaluación finalizada! Calificación: 85%",
    "Calificacion": 85.00
}
```

**Respuesta con error:**
```json
{
    "Resultado": false,
    "Siguiente": false,
    "Msg": "Faltan 3 pregunta(s) por responder."
}
```

**Uso:** Finalizar evaluación y obtener calificación

---

## 📝 Tipos de Preguntas

### Tipo 1: Pregunta Abierta (Texto)

**idTipoPregunta:** `1`

**Renderizado:**
```html
<textarea 
    name="respuesta_5" 
    class="minimal-textarea"
    placeholder="Escribe tu respuesta aquí...">
</textarea>
```

**Ejemplo de uso:**
- "Describe tu experiencia con bases de datos"
- "¿Por qué te interesa trabajar con nosotros?"
- Respuestas largas y descriptivas

**Validación:**
- Respuesta válida si `textarea.value.trim() !== ""`

---

### Tipo 2: Opción Múltiple (Radio)

**idTipoPregunta:** `2`

**Renderizado:**
```html
<label class="option-label">
    <input type="radio" name="respuesta_5" value="Menos de 1 año">
    <span>Menos de 1 año</span>
</label>
<label class="option-label">
    <input type="radio" name="respuesta_5" value="1 a 3 años">
    <span>1 a 3 años</span>
</label>
```

**Datos de API:**
```json
{
    "Opciones": [
        { "IdOpcion": 1, "Texto": "Menos de 1 año" },
        { "IdOpcion": 2, "Texto": "1 a 3 años" }
    ]
}
```

**Ejemplo de uso:**
- Preguntas con opciones excluyentes
- Selección única obligatoria

**Validación:**
- Respuesta válida si `input:checked` existe

---

### Tipo 3: Rango Numérico (Slider)

**idTipoPregunta:** `3`

**Renderizado:**
```html
<input 
    type="range" 
    name="respuesta_6" 
    min="1" 
    max="10"
    value="5"
    oninput="updateDisplay()"
>
<div class="text-center text-[#f2bb46] text-3xl">
    <span id="valor_6">5</span>
</div>
```

**Datos de API:**
```json
{
    "Rango": {
        "RangoInicial": "1",
        "RangoFinal": "10"
    }
}
```

**Ejemplo de uso:**
- "Del 1 al 10, ¿cómo calificas tu dominio de SQL?"
- Escalas de valoración
- Autoevaluaciones numéricas

**Validación:**
- Siempre tiene valor (default = RangoInicial)

---

### Tipo 4: Casillas Múltiples (Checkbox)

**idTipoPregunta:** `4`

**Renderizado:**
```html
<label class="option-label">
    <input type="checkbox" name="respuesta_7" value="JavaScript">
    <span>JavaScript</span>
</label>
<label class="option-label">
    <input type="checkbox" name="respuesta_7" value="Python">
    <span>Python</span>
</label>
```

**Datos de API:**
```json
{
    "Opciones": [
        { "IdOpcion": 1, "Texto": "JavaScript" },
        { "IdOpcion": 2, "Texto": "Python" }
    ]
}
```

**Ejemplo de uso:**
- "¿Qué lenguajes de programación conoces?"
- Selección múltiple
- Respuestas no excluyentes

**Formato de respuesta:**
```javascript
// Las respuestas se unen con coma
"JavaScript, Python, PHP"
```

**Validación:**
- Respuesta válida si al menos 1 checkbox está checked

---

## 🚦 Estados de Evaluación

### Estado 1: Pendiente

**Valor:** `EstatusEvaluacion = 1`

**Significado:** El candidato aún no ha comenzado la evaluación

**UI en Timeline:**
- 🟡 Punto amarillo/dorado (`#f2bb46`)
- Ícono: `clipboard-list`
- Texto: color `#f2bb46`
- Badge: "Pendiente"
- Botón: **"Responder evaluación"** (fondo amarillo)

**UI en ResponderEvaluacion.php:**
- Todos los inputs habilitados
- Botón "Guardar progreso" visible
- Botón "Finalizar evaluación" habilitado solo si todas respondidas

---

### Estado 2: En Progreso

**Valor:** `EstatusEvaluacion = 2`

**Significado:** El candidato comenzó pero no ha finalizado

**UI en Timeline:**
- 🔵 Punto azul
- Ícono: `clock`
- Texto: color `blue-400`
- Badge: "En progreso"
- Botón: **"Continuar evaluación"** (fondo azul)

**UI en ResponderEvaluacion.php:**
- Todos los inputs habilitados
- Respuestas previas pre-cargadas
- Botón "Guardar progreso" visible
- Botón "Finalizar evaluación" habilitado solo si todas respondidas

**Transición automática:**
- Al guardar respuestas por primera vez, el backend cambia de estado 1 → 2

---

### Estado 3: Completada

**Valor:** `EstatusEvaluacion = 3`

**Significado:** La evaluación fue finalizada y calificada

**UI en Timeline:**
- 🟢 Punto verde (`#22c55e`)
- Ícono: `check-circle`
- Texto: color `green-400`
- Badge: "Evaluación completada • 85%"
- Sin botón de acción (solo información)

**UI en ResponderEvaluacion.php:**
- Vista de "Evaluación completada"
- Todos los inputs en modo `readonly`/`disabled`
- Preguntas y respuestas visibles pero no editables
- Calificación mostrada en grande
- Solo botón "Volver al Portal"

**Reglas:**
- ⚠️ **No se puede editar una evaluación completada**
- El backend rechaza cualquier intento de `saveRespuestasPostulante` en estado 3
- Es irreversible (sin función de "re-abrir")

---

## 🔒 Validaciones y Seguridad

### Validaciones de Frontend

#### 1. Sesión Activa (PHP)

```php
$is_logged_in = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
if (!$is_logged_in) {
    header("Location: EstatusPostulante.php");
    exit;
}
```

**Protege:**
- Acceso sin autenticación
- Redirige al portal de login

#### 2. IdPostulanteEvaluacion Válido

```php
$IdPostulanteEvaluacion = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($IdPostulanteEvaluacion === 0) {
    header("Location: EstatusPostulante.php");
    exit;
}
```

**Protege:**
- URLs malformadas
- IDs inválidos o negativos

#### 3. Completitud de Respuestas

```javascript
if (contarPreguntasRespondidas() < TOTAL_PREGUNTAS) {
    mostrarToast('Faltan preguntas por responder', 'warning');
    return;
}
```

**Protege:**
- Intentos de finalizar con preguntas sin responder
- Mejora experiencia de usuario

#### 4. Confirmación de Finalización

```javascript
if (!confirm('¿Finalizar evaluación? No podrás modificar respuestas.')) {
    return;
}
```

**Protege:**
- Finalizaciones accidentales
- Da oportunidad de revisar

### Validaciones de Backend (API)

#### 1. Sesión de Candidato

```php
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true || 
    empty($_SESSION['curp_candidato'])) {
    echo json_encode([
        "Resultado" => false,
        "Msg" => "Sesión no válida. Inicia sesión para continuar."
    ]);
    exit;
}
```

**Protege:**
- Llamadas API sin autenticación
- Sesiones expiradas

#### 2. Ownership Verification

El backend valida que `IdPostulanteEvaluacion` pertenezca al candidato de la sesión:

```sql
WHERE UPPER(p.CURP) = UPPER('$curpSesion')
  AND pe.IdPostulanteEvaluacion = $IdPostulanteEvaluacion
```

**Protege:**
- Acceso a evaluaciones de otros candidatos
- Manipulación de IDs en URL

#### 3. Estado de Evaluación

```php
if ($estatusActual == 3) {
    return json_encode([
        "Resultado" => false,
        "Msg" => "Esta evaluación ya fue completada. No puedes modificar las respuestas."
    ]);
}
```

**Protege:**
- Modificación de evaluaciones finalizadas
- Integridad de calificaciones

#### 4. Sanitización de Datos

```php
private function sanitize($str) {
    $str = trim($str);
    $str = stripslashes($str);
    $str = htmlspecialchars($str);
    $str = str_replace("'", "''", $str);
    return $str;
}
```

**Protege:**
- SQL Injection
- XSS (Cross-Site Scripting)
- Caracteres especiales maliciosos

### Medidas de Seguridad Adicionales

#### CSRF Protection (Implícito)

- Uso de `credentials: "same-origin"` en fetch
- Cookies de sesión PHP automáticas
- No hay tokens CSRF explícitos (puede mejorarse)

#### SQL Injection Prevention

- Uso de prepared statements en clase `Conexiones`
- Sanitización de inputs
- Uso de `intval()` para IDs

#### XSS Prevention (Frontend)

```javascript
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
```

**Uso:**
- Todas las respuestas de usuario se escapan antes de renderizar
- Previene inyección de HTML/JavaScript en respuestas

---

## 🛠️ Solución de Problemas

### Problema 1: "Sesión no válida"

**Síntoma:**
- Al entrar a `ResponderEvaluacion.php` redirige inmediatamente al portal
- Mensaje "Sesión no válida"

**Causa:**
- Sesión PHP expirada
- No se realizó login previamente
- Cookies bloqueadas

**Solución:**
1. Ir a `EstatusPostulante.php`
2. Iniciar sesión con CURP + Teléfono
3. Intentar nuevamente

---

### Problema 2: Evaluaciones no aparecen en timeline

**Síntoma:**
- El timeline muestra procesos pero sin evaluaciones asociadas

**Causa posible:**
- No hay evaluaciones asignadas a ese proceso en la base de datos
- Error en `getEvaluacionesPorProceso`
- IdProceso no coincide

**Solución:**
1. Verificar en base de datos:
   ```sql
   SELECT * FROM VacantesEvaluaciones 
   WHERE IdProceso = X;
   ```
2. Verificar que exista registro en `PostulantesEvaluaciones`
3. Revisar console del navegador por errores JS

---

### Problema 3: "Error al cargar evaluación"

**Síntoma:**
- `ResponderEvaluacion.php` muestra mensaje de error
- No carga preguntas

**Causa posible:**
- IdPostulanteEvaluacion inválido
- No tienes permisos para esa evaluación
- Error en backend

**Solución:**
1. Verificar que el ID en la URL sea correcto
2. Verificar ownership:
   ```sql
   SELECT * FROM PostulantesEvaluaciones pe
   INNER JOIN PostulantesVacantes pv ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
   INNER JOIN Postulantes p ON p.IdPostulante = pv.IdPostulante
   WHERE pe.IdPostulanteEvaluacion = X AND p.CURP = 'TU_CURP';
   ```
3. Revisar logs del servidor PHP

---

### Problema 4: Botón "Finalizar" no se habilita

**Síntoma:**
- Todas las preguntas están respondidas pero el botón sigue deshabilitado

**Causa posible:**
- Preguntas de tipo checkbox sin selección
- JavaScript no detecta respuesta en textarea vacía
- Bug en `contarPreguntasRespondidas()`

**Solución:**
1. Verificar que TODAS las preguntas tengan respuesta
2. Preguntas de texto deben tener al menos 1 carácter
3. Checkboxes deben tener al menos 1 opción seleccionada
4. Recargar página y volver a responder

---

### Problema 5: Respuestas no se guardan

**Síntoma:**
- Click en "Guardar progreso" pero al volver las respuestas no están

**Causa posible:**
- Error en `saveRespuestasPostulante`
- Evaluación ya está completada (estatus 3)
- Error de red

**Solución:**
1. Abrir DevTools → Network
2. Verificar respuesta del endpoint
3. Si muestra error "ya completada", no se puede guardar más
4. Verificar que respuestas tengan formato correcto:
   ```json
   [{"IdPregunta": 5, "Respuesta": "texto"}]
   ```

---

### Problema 6: Calificación incorrecta

**Síntoma:**
- Al finalizar muestra una calificación inesperada

**Causa:**
- La calificación se basa en respuestas correctas definidas en `PreguntasConfiguracion`
- Si no hay respuestas correctas definidas, pueden no calificarse

**Solución:**
1. Verificar tabla `PreguntasConfiguracion`:
   ```sql
   SELECT * FROM PreguntasConfiguracion WHERE IdPregunta IN (...);
   ```
2. Verificar campos `BoolCorrecta` y `RespuestaCorrectaOM`
3. Preguntas sin respuesta correcta no penalizan

**Fórmula de calificación:**
```
Calificación = (Respuestas Correctas / Total Preguntas Calificables) * 100
```

---

### Problema 7: Estilos rotos o inconsistentes

**Síntoma:**
- La página se ve sin estilos o diferente al resto del portal

**Causa posible:**
- TailwindCSS CDN no cargó
- Lucide icons no cargó
- Navegador en modo offline

**Solución:**
1. Verificar conexión a Internet
2. Recargar página con `Ctrl+F5` (limpiar caché)
3. Verificar en DevTools → Console si hay errores de carga
4. Verificar que estos scripts estén en `<head>`:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   <script src="https://unpkg.com/lucide@latest"></script>
   ```

---

## 📊 Pruebas y Testing

### Checklist de Testing

#### Funcionalidad Básica

- [ ] **Login exitoso** muestra evaluaciones en timeline
- [ ] **Evaluaciones pendientes** muestran botón "Responder"
- [ ] **Evaluaciones en progreso** muestran botón "Continuar"
- [ ] **Evaluaciones completadas** muestran calificación
- [ ] **Click en "Responder"** redirige a `ResponderEvaluacion.php`

#### Carga de Evaluación

- [ ] `ResponderEvaluacion.php` valida sesión activa
- [ ] Valida `IdPostulanteEvaluacion` en URL
- [ ] Carga preguntas correctamente desde API
- [ ] Muestra loading state mientras carga
- [ ] Muestra error si falla la carga

#### Renderizado de Preguntas

- [ ] **Tipo 1 (Abierta):** Textarea funciona
- [ ] **Tipo 2 (Radio):** Solo una opción seleccionable
- [ ] **Tipo 3 (Rango):** Slider funciona, muestra valor
- [ ] **Tipo 4 (Checkbox):** Múltiples opciones seleccionables
- [ ] Respuestas previas se cargan correctamente
- [ ] Competencias se muestran como badges

#### Barra de Progreso

- [ ] Muestra "0 de X respondidas" al inicio
- [ ] Se actualiza al responder preguntas
- [ ] Barra visual se llena proporcionalmente
- [ ] Muestra 100% cuando todas están respondidas

#### Guardar Respuestas

- [ ] Botón "Guardar progreso" funciona
- [ ] Muestra notificación de éxito
- [ ] Respuestas se persisten en BD
- [ ] Al recargar, respuestas siguen ahí
- [ ] Puede guardar múltiples veces

#### Finalizar Evaluación

- [ ] Botón "Finalizar" deshabilitado al inicio
- [ ] Se habilita solo cuando todas respondidas
- [ ] Muestra confirmación antes de finalizar
- [ ] Valida completitud en backend
- [ ] Calcula calificación correctamente
- [ ] Muestra modal con resultado
- [ ] Cambia estado a "Completada"

#### Evaluación Completada

- [ ] Inputs en modo readonly/disabled
- [ ] Muestra vista "Evaluación completada"
- [ ] Muestra calificación obtenida
- [ ] Botón "Volver al Portal" funciona
- [ ] No permite más guardados
- [ ] Backend rechaza modificaciones

#### Seguridad

- [ ] No se puede acceder sin sesión
- [ ] No se puede acceder a evaluaciones de otros
- [ ] No se puede modificar evaluación completada
- [ ] Respuestas se sanitizan (sin XSS)
- [ ] IDs se validan (SQL Injection)

#### Responsividad

- [ ] Se ve bien en móvil (320px+)
- [ ] Se ve bien en tablet (768px+)
- [ ] Se ve bien en desktop (1024px+)
- [ ] Navegación funciona en touch devices

---

## 🚀 Mejoras Futuras

### Funcionalidades Sugeridas

1. **Auto-guardado automático**
   - Guardar respuestas cada X minutos
   - Evitar pérdida de datos

2. **Temporizador de evaluación**
   - Límite de tiempo opcional
   - Countdown visual
   - Auto-finalizar al agotar tiempo

3. **Adjuntar archivos**
   - Preguntas que permitan subir archivos
   - Útil para portfolios, certificados

4. **Preguntas condicionales**
   - Mostrar/ocultar preguntas según respuestas previas
   - Flujos dinámicos

5. **Revisión antes de finalizar**
   - Pantalla de resumen
   - Botón "Editar" por pregunta
   - Confirmar antes de enviar

6. **Feedback por pregunta**
   - Mostrar respuesta correcta después de finalizar
   - Explicación de por qué es correcta
   - Ayuda educativa

7. **Estadísticas para candidato**
   - Ver histórico de evaluaciones
   - Comparar resultados
   - Áreas de mejora

8. **Notificaciones**
   - Email cuando se asigna evaluación
   - Recordatorio si está pendiente
   - Confirmación al finalizar

---

## 📚 Referencias

- **API Endpoints:** `docs/API_EvaluacionesPostulante.md`
- **Base de datos:** Tablas involucradas en el módulo
- **Tailwind CSS:** https://tailwindcss.com
- **Lucide Icons:** https://lucide.dev

---

## 🤝 Soporte

Para reportar bugs o solicitar mejoras:

1. Crear issue en el repositorio del proyecto
2. Contactar al equipo de desarrollo
3. Incluir capturas de pantalla y logs relevantes

---

**Última actualización:** Abril 2026  
**Versión:** 1.0.0  
**Autor:** Sistema PIP - Recursos Humanos
