# Propuesta de Rediseño de UI/UX (Patrón Master-Detail)

Entendido perfectamente: dejamos **Evaluaciones** tal como está. El objetivo entonces es agilizar el flujo de trabajo específicamente en las secciones de **Postulantes** y **Vacantes**, eliminando los modales gigantescos e intrusivos y la navegación pesada entre múltiples páginas.

Para lograr esto, migraremos a un **Patrón Master-Detail (Panel Dividido o Split-Pane)**. Esto significa que la pantalla se dividirá en dos zonas de trabajo interconectadas, funcionando de manera muy similar a una bandeja de entrada moderna o a la vista que ya implementamos previamente en _Línea Ética_.

> [!TIP]
> **Beneficio principal:** Al hacer clic en un elemento de la izquierda, el panel derecho se actualiza instantáneamente vía AJAX sin recargar la página web y sin perder el contexto.

## Ilustración del Nuevo Diseño (Split-Pane)

A continuación, un esquema visual de cómo se vería la pantalla unificada de **Postulantes** (fusionando `PostulantesGeneral.php` y `PostulanteDetalle.php`):

```text
+-----------------------------------------------------------------------+
|                       BARRA DE NAVEGACIÓN SUPERIOR                    |
+-------------------------+---------------------------------------------+
|                         |                                             |
| [🔍 Buscar postulante]  |  [ 👤 Juan Pérez ]         [Editar] [Cerrar]|
|                         |                                             |
| 1. LISTA (Master)       |  2. DETALLE (Detail)                        |
| +---------------------+ |  +---------------------------------------+  |
| | 👤 Juan Pérez       | |  | Pestañas: [Info] [Procesos] [Docs]    |  |
| |    Analista (Activo)|>|  |---------------------------------------|  |
| +---------------------+ |  |                                       |  |
| | 👤 María Soto       | |  | ✉️ Correo: juan.p@email.com           |  |
| |    Gerente (Rechaz) | |  | 📱 Teléfono: 55-1234-5678             |  |
| +---------------------+ |  | 📍 Ubicación: Ciudad de México        |  |
| | 👤 Carlos Gómez     | |  |                                       |  |
| |    Desarrollador    | |  | [ Historial de Postulaciones ↓ ]      |  |
| +---------------------+ |  | - 12/Oct: Aplicó a Vacante X          |  |
| | 👤 Ana Silva        | |  | - 14/Oct: Entrevista programada       |  |
| |    Diseñadora       | |  |                                       |  |
| +---------------------+ |  +---------------------------------------+  |
|                         |                                             |
+-------------------------+---------------------------------------------+
```

### ¿Cómo funciona el flujo paso a paso?

1. **Apertura inicial:** El usuario entra a "Postulantes". Ve la lista completa a la izquierda.
2. **Interacción:** El usuario hace clic sobre _Juan Pérez_.
3. **Respuesta inmediata:** El panel de la derecha se llena en milisegundos con toda su información, historial y botones de acción. La lista izquierda permanece intacta en el mismo lugar de scroll.
4. **Siguiente perfil:** El usuario hace clic ahora en _María Soto_. El panel derecho cambia inmediatamente a los datos de María. **El usuario nunca tuvo que salir de la página original ni navegar "hacia atrás".**

---

## Cambios Estructurales Propuestos

### 1. Postulantes

- **Fusión de archivos:** Se consolida `PostulantesGeneral.php` y el contenido de `PostulanteDetalle.php` en una única interfaz moderna.
- **Layout Split-Pane:** Lista a la izquierda con scroll independiente, y panel derecho dinámico.
- **Ventaja de Negocio:** Permite al equipo de reclutamiento revisar docenas de perfiles y currículums en cuestión de segundos, optimizando enormemente el proceso de filtrado de personal.

### 2. Vacantes (`Vacantes.php`)

- **Adiós a los Modales Gigantes:** Actualmente, el detalle de una vacante se abre en un modal inmenso (`modalDetalleVacante`) que encierra demasiada información (Requisitos, Evaluaciones, etc.), dificultando la experiencia móvil, ocultando campos selectores y creando problemas de "scroll dentro de scroll".
- **Nuevo Panel Interactivo (Drawer o Split-Pane):**
  - La tabla principal de vacantes queda fija.
  - Al dar clic en "Ver Detalle" de una vacante, el contenido emerge en un panel lateral limpio y elegante (al igual que en el esquema de arriba).
  - Toda la sección de agregar Requisitos e Inducciones se realiza mediante edición directa (_inline_) o pestañas organizadas, sin lanzar más "modales encima de modales".
