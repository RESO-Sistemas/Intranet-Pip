# 📋 Guía de APIs — EvaluacionesPostulante

> **Módulo:** `Backend/EvaluacionesPostulante/`  
> **Endpoint base:** `http://localhost:8000/Backend/EvaluacionesPostulante/App.php`  
> **Método de envío:** `POST` (todos los parámetros vía `$_POST`)  
> **Respuesta:** JSON

---

## 🔐 Autenticación

Todas las operaciones de este módulo requieren que el candidato tenga una **sesión PHP activa** con las siguientes variables de sesión establecidas:

| Variable de sesión        | Descripción                                 |
|---------------------------|---------------------------------------------|
| `$_SESSION['logged_in']`  | Debe ser `true`                             |
| `$_SESSION['curp_candidato']` | CURP del candidato autenticado          |

> La sesión se establece a través del login de candidatos (módulo `Backend/Postulantes/App.php`).  
> Si la sesión no es válida, **todas las operaciones** devuelven:

```json
{
  "Resultado": false,
  "Siguiente": false,
  "Msg": "Sesión no válida. Inicia sesión para continuar."
}
```

---

## 📖 Estructura de respuesta general

Todas las respuestas siguen este esquema base:

| Campo       | Tipo    | Descripción                                          |
|-------------|---------|------------------------------------------------------|
| `Resultado` | boolean | `true` si la operación fue exitosa                   |
| `Siguiente` | boolean | `true` si el frontend puede continuar al siguiente paso |
| `Msg`       | string  | Mensaje descriptivo (presente en errores y en algunas respuestas exitosas) |
| `Data`      | array   | Datos devueltos (cuando aplica)                      |

---

## 🚀 Endpoints disponibles

### 1. `getEvaluacionesPostulante`

**Descripción:** Retorna todas las evaluaciones asignadas al candidato autenticado, agrupadas por vacante y proceso.

**Parámetros POST requeridos:**

| Parámetro | Tipo   | Descripción          |
|-----------|--------|----------------------|
| `op`      | string | `"getEvaluacionesPostulante"` |

> La CURP del candidato se toma automáticamente de `$_SESSION['curp_candidato']`.

**Ejemplo de petición (JavaScript / fetch):**
```javascript
const formData = new FormData();
formData.append("op", "getEvaluacionesPostulante");

fetch("http://localhost:8000/Backend/EvaluacionesPostulante/App.php", {
  method: "POST",
  credentials: "same-origin", // importante para enviar cookies de sesión
  body: formData
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Respuesta exitosa:**
```json
{
  "Resultado": true,
  "Siguiente": true,
  "Data": [
    {
      "IdPostulanteEvaluacion": 12,
      "EstatusEvaluacion": 1,
      "TxEstatus": "Pendiente",
      "Calificacion": null,
      "FechaInicio": null,
      "FechaFinalizacion": null,
      "NombreEvaluacion": "Evaluación Técnica Backend",
      "NombreProceso": "1ra Entrevista",
      "NombreVacante": "Desarrollador PHP",
      "IdVacante": 5
    }
  ]
}
```

**Valores posibles de `EstatusEvaluacion` / `TxEstatus`:**

| Valor | Texto        | Significado                               |
|-------|--------------|-------------------------------------------|
| `1`   | Pendiente    | El candidato aún no ha comenzado          |
| `2`   | En progreso  | El candidato comenzó pero no terminó      |
| `3`   | Completada   | La evaluación fue finalizada y calificada |

---

### 2. `getEvaluacionesPorProceso`

**Descripción:** Retorna las evaluaciones asignadas al candidato autenticado, pero filtradas para un proceso específico de una vacante.

**Parámetros POST requeridos:**

| Parámetro   | Tipo   | Descripción                               |
|-------------|--------|-------------------------------------------|
| `op`        | string | `"getEvaluacionesPorProceso"`             |
| `IdProceso` | int    | ID del proceso para filtrar las pruebas   |

> La CURP del candidato se toma automáticamente de `$_SESSION['curp_candidato']`.

**Ejemplo de petición:**
```javascript
const formData = new FormData();
formData.append("op", "getEvaluacionesPorProceso");
formData.append("IdProceso", 3);

fetch("http://localhost:8000/Backend/EvaluacionesPostulante/App.php", {
  method: "POST",
  credentials: "same-origin",
  body: formData
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Respuesta exitosa:**
```json
{
  "Resultado": true,
  "Siguiente": true,
  "Data": [
    {
      "IdPostulanteEvaluacion": 15,
      ...
    }
  ]
}
```

---

### 3. `getPreguntasEvaluacionPostulante`

**Descripción:** Retorna todas las preguntas de una evaluación específica, incluyendo opciones de respuesta (si aplica), rango numérico (si aplica) y la respuesta previa guardada (si existe).

**Parámetros POST requeridos:**

| Parámetro                 | Tipo | Descripción                              |
|---------------------------|------|------------------------------------------|
| `op`                      | string | `"getPreguntasEvaluacionPostulante"` |
| `IdPostulanteEvaluacion`  | int  | ID de la evaluación asignada al candidato |

**Ejemplo de petición:**
```javascript
const formData = new FormData();
formData.append("op", "getPreguntasEvaluacionPostulante");
formData.append("IdPostulanteEvaluacion", 12);

fetch("http://localhost:8000/Backend/EvaluacionesPostulante/App.php", {
  method: "POST",
  credentials: "same-origin",
  body: formData
}).then(res => res.json()).then(data => console.log(data));
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
    },
    {
      "IdPregunta": 6,
      "Titulo": "Del 1 al 10, ¿cómo calificarías tu dominio de SQL?",
      "Descripcion": null,
      "idTipoPregunta": 3,
      "TipoPregunta": "Rango",
      "Competencia": "Base de datos",
      "Rango": { "RangoInicial": "1", "RangoFinal": "10" },
      "RespuestaPrevia": "8"
    }
  ]
}
```

**Tipos de pregunta (`idTipoPregunta`):**

| ID | Descripción         | Campos adicionales en la respuesta                     |
|----|---------------------|--------------------------------------------------------|
| `1` | Abierta (texto)    | Ninguno                                                |
| `2` | Opción múltiple    | `Opciones[]` → `{ IdOpcion, Texto }`                   |
| `3` | Rango numérico     | `Rango` → `{ RangoInicial, RangoFinal }`               |
| `4` | Casillas (check)   | `Opciones[]` → `{ IdOpcion, Texto }`                   |

> `RespuestaPrevia` contiene la última respuesta guardada o `null` si no se ha respondido aún.

---

### 3. `saveRespuestasPostulante`

**Descripción:** Guarda una o varias respuestas del candidato. Si la evaluación estaba en estado `Pendiente`, la pasa automáticamente a `En progreso`. Soporta **upsert** (crea o actualiza la respuesta por pregunta).

> ⚠️ **No se puede guardar si la evaluación ya está `Completada` (estatus 3).**

**Parámetros POST requeridos:**

| Parámetro                | Tipo   | Descripción                                                                 |
|--------------------------|--------|-----------------------------------------------------------------------------|
| `op`                     | string | `"saveRespuestasPostulante"`                                                |
| `IdPostulanteEvaluacion` | int    | ID de la evaluación asignada al candidato                                   |
| `respuestas`             | string | JSON string con array de respuestas: `[{"IdPregunta": 5, "Respuesta": "A"}]` |

**Formato del campo `respuestas`:**
```json
[
  { "IdPregunta": 5, "Respuesta": "Más de 3 años" },
  { "IdPregunta": 6, "Respuesta": "8" }
]
```

**Ejemplo de petición:**
```javascript
const respuestas = [
  { IdPregunta: 5, Respuesta: "Más de 3 años" },
  { IdPregunta: 6, Respuesta: "8" }
];

const formData = new FormData();
formData.append("op", "saveRespuestasPostulante");
formData.append("IdPostulanteEvaluacion", 12);
formData.append("respuestas", JSON.stringify(respuestas));

fetch("http://localhost:8000/Backend/EvaluacionesPostulante/App.php", {
  method: "POST",
  credentials: "same-origin",
  body: formData
}).then(res => res.json()).then(data => console.log(data));
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

**Posibles errores:**
```json
{ "Msg": "No tienes permiso para esta evaluación." }
{ "Msg": "Esta evaluación ya fue completada. No puedes modificar las respuestas." }
{ "Msg": "El campo 'respuestas' debe ser un arreglo JSON. Ejemplo: [{\"IdPregunta\":5,\"Respuesta\":\"A\"}]" }
```

---

### 4. `finalizarEvaluacionPostulante`

**Descripción:** Finaliza la evaluación del candidato. Verifica que **todas las preguntas estén respondidas**, calcula la calificación automáticamente y marca la evaluación como `Completada` (estatus 3).

> ⚠️ **Una vez finalizada, no se pueden modificar las respuestas.**

**Parámetros POST requeridos:**

| Parámetro                | Tipo   | Descripción                              |
|--------------------------|--------|------------------------------------------|
| `op`                     | string | `"finalizarEvaluacionPostulante"`        |
| `IdPostulanteEvaluacion` | int    | ID de la evaluación asignada al candidato |

**Ejemplo de petición:**
```javascript
const formData = new FormData();
formData.append("op", "finalizarEvaluacionPostulante");
formData.append("IdPostulanteEvaluacion", 12);

fetch("http://localhost:8000/Backend/EvaluacionesPostulante/App.php", {
  method: "POST",
  credentials: "same-origin",
  body: formData
}).then(res => res.json()).then(data => console.log(data));
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

**Posibles errores:**
```json
{ "Msg": "Faltan 3 pregunta(s) por responder." }
{ "Msg": "Esta evaluación ya fue completada." }
{ "Msg": "No tienes permiso para esta evaluación." }
```

**Lógica de calificación:**
- Solo se califican las preguntas que tienen una respuesta correcta definida en `PreguntasConfiguracion` (campos `BoolCorreta` o `RespuestaCorrectaOM`).
- `RespuestaCorrectaOM` almacena el `idPreguntasPosiblesRespuestas` (ID numérico) de la opción correcta. La calificación resuelve el texto de esa opción haciendo JOIN a `PreguntasPosiblesRespuestas` y compara contra la respuesta del postulante (que puede ser texto o ID).
- Las preguntas abiertas y de rango sin respuesta correcta definida **no penalizan** la calificación.
- La fórmula es: `(Correctas / TotalPreguntas) * 100`, redondeado a 2 decimales.

---

## 🗃️ Tablas involucradas

| Tabla                      | Descripción                                                  |
|----------------------------|--------------------------------------------------------------|
| `Postulantes`              | Candidatos registrados (contiene CURP)                       |
| `PostulantesVacantes`      | Relación candidato ↔ vacante                                 |
| `PostulantesEvaluaciones`  | Evaluaciones asignadas a cada candidato por vacante          |
| `VacantesEvaluaciones`     | Evaluaciones asignadas a cada vacante por proceso            |
| `Evaluaciones`             | Catálogo de evaluaciones (título, descripción)               |
| `ProcesosVacantes`         | Procesos de selección por vacante                            |
| `PreguntasEvaluacion`      | Preguntas de cada evaluación                                 |
| `TipoPregunta`             | Catálogo de tipos de pregunta                                |
| `PreguntasPosiblesRespuestas` | Opciones para preguntas de opción múltiple / casilla      |
| `PreguntasConfiguracion`   | Configuración (rango numérico, respuesta correcta)           |
| `PostulantesRespuestas`    | Respuestas guardadas por candidato                           |
| `Competencias`             | Competencias asociadas a cada pregunta                       |
| `Vacantes`                 | Catálogo de vacantes                                         |

---

## 🔄 Flujo típico de uso

```
1. [Login candidato]          → SESSION['curp_candidato'] establecida
         │
         ▼
2. getEvaluacionesPostulante  → Obtener lista de evaluaciones pendientes/en progreso
         │
         ▼
3. getPreguntasEvaluacionPostulante(IdPostulanteEvaluacion)
                              → Cargar preguntas (con opciones y respuestas previas)
         │
         ▼
4. saveRespuestasPostulante   → Guardar respuestas (puede llamarse múltiples veces)
         │
         ▼
5. finalizarEvaluacionPostulante
                              → Verificar que todo esté respondido, calcular calificación
                                y cerrar la evaluación
```

---

## ⚙️ Notas técnicas

- El parámetro `op` puede enviarse por `POST` o `GET`, aunque se recomienda `POST`.
- El campo `respuestas` en `saveRespuestasPostulante` acepta tanto **JSON string** como un **array PHP** directo.
- Todas las operaciones verifican que el `IdPostulanteEvaluacion` pertenezca al candidato de la sesión activa, evitando accesos no autorizados.
- El servidor PHP está corriendo en `http://localhost:8000` con `php -S localhost:8000`.
