# Changelog

Todos los cambios relevantes del proyecto se registran aquí en orden cronológico inverso.

## [2026-06-09 22:02:23] ✨ feat: duplicar/editar evaluaciones y rediseño de planes de acción

### Evaluaciones — Duplicar (Feature 1)
- ✨ **Duplicar evaluación:** Nuevo `duplicateEvaluation()` en `Backend/Evaluaciones/Evaluaciones.php` (op `duplicateEvaluation` en `App.php`) que clona encabezado, preguntas, configuraciones y respuestas posibles (remapeando referencias) como **borrador editable** (`Activado=0`, `PreguntasAceptadas=0`, `Status=1`). La clonación de `EvaluacionDetalle` es opcional (`copyParticipants`).
- ✨ **UI de duplicado:** Botón "Duplicar" en el grid de `ListadoEvaluaciones.js` con confirmación SweetAlert; al duplicar, abre el wizard de edición precargado con el nuevo id.

### Evaluaciones — Editar no publicadas (Feature 2)
- ✨ **Edición de borrador:** Nuevos `getEvaluationForEdit()`, `updateEvaluationHeader()` y `updateEvaluationParticipants()` (con validación server-side que rechaza si `Activado=1`).
- ✨ **Wizard en modo edición:** `abrirEdicionEvaluacion()` reusa el modal de "Nueva Evaluación" precargando tipo, dirigido, fechas y participantes; el botón "Editar" del grid se deshabilita para evaluaciones publicadas.

### Evaluaciones — Refresco sin recarga (Feature 3)
- ♻️ **Resumen en caliente:** Tras guardar preguntas (`contentFunctions.js`), se refresca el iframe hermano de resumen (`evPanelOverviewFrame`) y el grid del padre para que el botón cambie de "Publicar" a "Aceptar Preguntas" sin recargar la página.

### Planes de acción
- ✨ **Rediseño "Mis Planes":** `my-action-plans.php` y `my-action-plans.js` migran de DataTable a tarjetas con barra de avance global, badge de estado y conteo de avances pendientes. Query `getMyPlansAction` enriquecida con `ProgresoGlobal`, `CantidadAvancesPendientes`, `StatusConfirmaPlanAccion` y `StatusConfirmaActividades`.
- ✨ **Timeline de avances:** `plan-action.js` reemplaza las DataTables de avances por una línea de tiempo con estado de aprobación (`EstadoAprobacion`) y acciones de revisión.
- ✨ **Menú lateral:** `menus.php` agrega "MIS PLANES" para todos los empleados y "PLANES DEL EQUIPO" solo para jefes (detectado por `EvaluacionDetalle.JefeEvalua`).
- 🐛 **Páginas libres:** `my-action-plans.php` añadida a las páginas accesibles sin permisos en BD (`AutorizaPagina.php` y `Empleados.php`).

### Correcciones
- 🏗️ **API .NET:** Actualizada la URL ngrok `DOTNET_API_URL`.
- 🐛 **PHP 8:** Eliminadas llamadas a `curl_close()` (deprecado) en `Evaluaciones.php`, `Empleados.php` y `Feed.php`.
- 🐛 **SyntaxError:** `ListadoEvaluaciones.php` ya no recarga `global.js` (se carga en `neptune_js.php`), evitando la re-declaración de `const`.
- 📄 **Docs/i18n:** Nueva investigación `docs/evaluaciones-360-investigacion.md` y traducción `assets/libs/datatables/lang/Spanish.json`.

## [2026-05-20 22:44:40] ✨ feat: páginas libres y firmas svg móvil

- 🐛 **Permisos:** Se agregaron `SolicitudVacaciones.php`, `FormatoVacaciones.php`
  y `LineaEticaUs.php` al arreglo de páginas libres para evitar redirecciones.
- ✨ **Firmas:** Soporte para firmas SVG en formato XML crudo desde la
  aplicación móvil en `MiPerfil.js`.

## [2026-05-09] ✨ feat: Rediseño completo módulo Organigramas

### ControlOrganigrama.php / ControlOrganigrama.js
- ✨ **Cards Grid:** Reemplazo de tabla Syncfusion por grid de tarjetas Bootstrap con badge de estado (Activo/Inactivo).
- ✨ **Filtro en vivo:** Input de búsqueda con empty state "Sin resultados" (`search_off`) cuando ninguna card coincide.
- ✨ **Icono amarillo:** Ícono de árbol en color amarillo `#ffc107` (identidad PIP) en lugar de azul.
- ✨ **Renombrar inline:** Click en "Renombrar" convierte el título en `<input>` editable con botón ✓ amarillo; Enter guarda, Escape cancela. Sin SweetAlert.
- 🐛 **Fix color botones Editar/Ver:** `!important` en `a.org-card-btn` para anular estilos Bootstrap/Neptune.

### OrganigramaSv.php / OrganigramaSv.js (editor)
- ✨ **Layout full-screen:** Editor tipo aplicación con toolbar, panel izquierdo colapsable (árbol + buscador), canvas Syncfusion, panel derecho de propiedades.
- ✨ **Buscador arriba:** Sección de búsqueda de empleados movida encima del árbol jerárquico para mayor accesibilidad.
- ✨ **Auto-layout + fitToPage:** `fitToPage` al cargar y tras auto-layout; los nodos nunca quedan fuera del viewport.
- ✨ **Nodos 240×100px:** Tamaño fijo con avatar de iniciales (40px), nombre, puesto y badge de tipo (Principal/Empleado/Otro).
- ✨ **`pointer-events: none`** en wrapper HTML: clicks pasan al SVG layer de Syncfusion correctamente.
- ✨ **Export PNG con preview:** `html2canvas` (scale 2×) + modal de previsualización antes de descargar. Nombre `organigrama-[título].png`.
- 🐛 **Fix resize al colapsar panel:** `diagram.refresh()` tras 220ms de transición CSS elimina área gris sin cuadricular.
- ♻️ **Elimina `location.reload()`:** Todas las operaciones (agregar/editar/eliminar) actualizan el diagrama en caliente con `refreshDiagram()`.

### organigrama.php / organigrama.js (vista pública)
- ✨ **Tabs por organigrama:** Reemplazo de acordeón por tabs horizontales con underline amarillo; render lazy al activar cada tab.
- ✨ **Canvas `calc(100vh - 220px)`:** Aprovecha toda la altura disponible de pantalla.
- ✨ **Modal de detalle:** Click en nodo abre modal centrado (480px) con: iniciales, nombre, puesto, tipo, nivel, email, División, Sucursal y contador de colaboradores directos.
- ✨ **Read-only real:** `NodeConstraints.PointerEvents | InConnect | OutConnect` — sin handles de resize/drag, conectores visibles, clicks funcionan.
- ✨ **Export PNG con preview:** Mismo flujo que editor. `lastDiagram` actualizado por tab activo.
- 🐛 **Fix conectores invisibles:** `ConnectorConstraints.None` (era `PointerEvents` inválido en ConnectorConstraints → `undefined`).
- 🐛 **Fix colaboradores directos:** `countDirectReports` usaba `node.id` (Syncfusion interno); corregido a `data.id` que coincide con `n.manager` en `orgDataMap`.

### Backend
- ✨ **`getDatosOrganigramas`:** Agrega `División` y `Sucursal` via LEFT JOIN a `Divisiones` y `SucursalDepto`.
- ✨ **`getTituloOrganigrama`:** Nueva operación para cargar título del organigrama en el editor.

---

## [2026-05-08 14:37:01] ✨ feat: Rediseño pestaña preguntas evaluaciones

- ✨ **Accordion Editor:** Cada pregunta se convierte en tarjeta colapsable con header limpio (número circular, título, tipo, competencia). Acciones de guardar/eliminar visibles solo en hover.
- ✨ **Pills Horizontales:** Reemplazo de dropdown `<select>` por pills redondeados para seleccionar la respuesta correcta en opción múltiple, mucho más compacto e intuitivo.
- ✨ **Select2 Inline Competencia:** Eliminación del modal de edición de competencia; ahora es un Select2 directamente en el body de la tarjeta, actualizando el badge del header en tiempo real.
- ✨ **Toggle V/F Custom:** Reemplazo del switch nativo por botones toggle animados "Falso / Verdadero" integrados.
- ✨ **Opciones Estilizadas:** Filas de opciones con label circular, input limpio e icono de eliminar sutil (gris → rojo en hover).
- ✨ **Niveles Esperados como Chips:** Reemplazo visual del grid pesado de SyncFusion por chips compactos con color distintivo para respuestas nuevas.
- ✨ **Sticky Bar:** Barra superior fija con contador de preguntas configuradas y sin guardar, actualizado en tiempo real.
- ✨ **Empty State Ilustrado:** Mensaje visual cuando no hay preguntas configuradas.
- 🐛 **Fix Empty State:** Se elimina correctamente el empty state al agregar la primera pregunta nueva.
- 🐛 **Fix Accordion:** Las preguntas nuevas ahora respetan el modo accordion (solo una expandida a la vez).
- ♻️ **Paleta Coherente:** Uso de la paleta ámbar/dorado `#F59E0B` existente del wizard de evaluaciones para mantener consistencia visual.

## [2026-05-08 11:09:07] ♻️ refactor: wizard modal creación evaluaciones

- ♻️ **Modal Wizard 4 Pasos:** Nueva interfaz de creación de evaluaciones integrada en ListadoEvaluaciones.php como modal con wizard de 4 pasos (Tipo, Participantes, Fechas, Resumen), reemplazando la página独立的 add-evaluation.php.
- ✨ **UI Modernizada:** Barra de progreso visual con steppers, selectores estilizados con Select2, diseño responsive con DM Sans font y paleta amber/indigo.
- ♻️ **Fechas Opcionales:** Backend actualizado para aceptar fechas null en evaluaciones dirigidas a postulantes. Construcción dinámica de query en Evaluaciones.php.
- 🐛 **Fix Filtro Query:** Query de evaluaciones activas ahora incluye filtro `DirigidoA = 1` para mostrar solo evaluaciones de empleados.
- 📝 **Deprecación:** add-evaluation.php ahora serve como página de fallback pero su contenido fue migrado al modal wizard de ListadoEvaluaciones.php.

## [2026-05-05 10:00:00] 🐛 fix: filtros y búsqueda en postulantes

- 🐛 **Filtros de Estatus:** Se corrigió bug donde los botones de filtro (En Proceso, Aceptados, Rechazados, Finalizados) no filtraban correctamente. jQuery .data() convertía valores numéricos de data-filter a Number, rompiendo la comparación === con los String de data-estatus de las cards.
- ♻️ **Refactor Filtrado:** filtrarPostulantesCards usa ahora el array en memoria postulantesData en lugar de manipular elementos DOM, alineándose con la estrategia de filtrarVacantes. Más robusto y sin problemas de tipos.
- ✨ **Buscador Reactivo:** Cambio de onkeyup a oninput en el buscador de postulantes para respuesta en tiempo real (incluye paste, cut, delete).
- ♻️ **Deprecación:** PostulantesVacante.php y scripts/PostulantesVacante.js marcados como deprecados, su funcionalidad migró a Vacantes.php y scripts/Vacantes.js.
- ✨ **Backend:** Query de vacantes ahora incluye TotalPostulantes con subquery COUNT.

## [2026-05-02 20:51:49] ✨ feat: split-pane Postulantes y drawer Vacantes

- ✨ **PostulantesGeneral:** Layout split-pane con lista de postulantes (340px) y panel de detalle con tabs a la derecha. Lista de tarjetas responsiva con búsqueda en vivo (debounce 200ms), reemplaza DataTable.
- ✨ **Tabs Procesos:** Panel derecho con 3 tabs: Info (datos + edición), Procesos (vacantes + timeline + resultados evaluación), Teléfonos.
- ✨ **Resultados Evaluación:** Nueva sección en pestaña Procesos con badges circulares por competencia.
- ✨ **Vacantes Drawer:** Reemplazo de modalDetalleVacante (modal-xl) por drawer lateral deslizable desde la derecha.
- ✨ **Postulantes en Drawer:** Nueva sección con stats, lista compacta con 3 acciones (resultados, detalle, docs) y botón Comparativo Postulantes.
- ✨ **4 Modales Nuevos:** Resultados individual (radar), comparativo (barras+radar+tablas), documentos, visor de respuestas.
- ✨ **Gráficos Syncfusion:** Todas las funciones de gráficos移植adas de PostulantesVacante.js a Vacantes.js.
- ✨ **Scripts:** PostulantesGeneral.js reescrito con master-detail AJAX, Vacantes.js reescrito con openDetalleDrawer, closeDrawerVacante. PostulanteEditor.js añade isModoEdicion().
- 📝 **Documentación:** Agregado docs/Planificacion postulantes y vacantes.md.

## [2026-04-29 00:00:00] ✨ feat: módulo Bolsa de Trabajo Ibero

- ✨ **Bolsa de Trabajo:** Implementación completa del módulo de Bolsa de Trabajo con vistas para vacantes, postulaciones, evaluaciones y resultados
- ✨ **Backend API:** Nuevos endpoints para gestión de postulantes, vacantes, procesos y evaluaciones en Backend/Postulantes/App.php, Backend/Vacantes/App.php, etc.
- ✨ **Autenticación:** Sistema de login para candidatos con CURP y teléfono
- ✨ **Panel Candidato:** Panel de seguimiento de postulaciones con timeline de procesos
- ✨ **Evaluaciones:** Sistema de evaluaciones postulantes con preguntas y respuestas
- ✨ **Vista Vacantes:** Nueva interface para browse y postulación a vacantes
- ✨ **Scripts JS:** Archivos JavaScript para cada módulo funcional (EvaluacionesIbero.js, VacantesIbero.js, etc.)
- ✨ **Database:** Esquema y datos mock para el módulo (ibero_schema.sql, ibero_mock_data.sql)
- ✨ **Assets:** Logo placeholder para Ibero
- 🐛 **Fix UI:** Correcciones en modal-postulacion y mejoras en estilos
- 🐛 **Organigrama:** Deshabilitación de preloader que causaba delays
- ♻️ **Refactor:** Mejoras en EstatusPostulanteIbero con arquitectura sidebar+detalle y timeline mejorado

## [2026-04-27 00:15:20] ♻️ refactor: migrar Línea Ética a UI con sidebar y vista de detalle

- ♻️ **LineaEtica.php:** Implementación de sidebar lateral (bandeja de entrada) con lista de mensajes, panel de detalle dinámico, empty state cuando no hay selección, y toggle para móvil.
- ♻️ **LineaEtica.js:** Migración de renderizado único a arquitectura con变量 global (mensajesGlobalData) y función verDetalleMensaje() para vista dinámica. Mejora en manejo de estado activo.
- 🎨 **UI:** Corrección tipográfica "Linea de Ética" → "Línea de Ética", container-fluid en vez de container, y estilos mejorados para visualización en móviles.

- ♻️ **Empleados.php:** Mejora en consulta SQL para obtener tokenOS del padre mediante JOIN, elimina utf8_decode redundante y agrega validaciones nulas en línea ética.
- ♻️ **LineaEtica.php:** Agrega validaciones para valores vacíos en puestos configurados y mueve curl_close fuera del loop de notificaciones.
- ♻️ **PHP Pages:** Elimina includes duplicados de _Header.php en LineaEticaUs.php, SolicitudVacaciones.php y SolicitudesVacacionesFinales.php. Elimina script global.js innecesario en páginas.
- ♻️ **divisions-configuration.php:** Limpia y reorganiza estructura HTML, mejora indentación y organización de elementos.
- ♻️ **Scripts JS:** Elimina código comentado, organiza funciones, mejora manejo de grids Syncfusion con validaciones de DOM, mejor inicialización y cleanup de instancias.

## [2026-04-26 19:37:00] ♻️ refactor: migrar Syncfusion a paquete local y optimizar UI Personal

- ♻️ **Syncfusion:** Migración de CDN externo al paquete local en assets/syncfusion. Consolidación de scripts en neptune_js.php.
- ♻️ **Grid Personal:** Consolidación de columnas de acciones en template unificado allActionsSF. Reorganización de tabla fuera del card.
- ♻️ **Consultas Backend:** Optimización de getPersonal en Empleados.php con WHERE dinámico y LEFT JOINs. Mejora de getDocumentacionCompletaEmpleado con LEFT JOIN.
- ♻️ **Documentación:** Se agregaron campos Email, Movil, RFC, CURP, NoSeguroS y Nivel a otrosDetallesEmpleado.
- ♻️ **Syncfusion Config:** Consolidación de script de configuración con inicialización diferida esperando objeto ej.
- ✨ **Selects:** Actualización de getPuestos y getSucursales con GROUP BY para eliminar duplicados.
- 🧹 **UI Personal:** Limpieza de estilos no utilizados, reorganización de modales, actualización de templates de acciones.

## [2026-04-26 15:17:59] ♻️ refactor: optimizar Directorio y SolicitudVacaciones

- ♻️ **Directorio:** Refactorización completa de Directorio.php, DirectorioAdm.php y scripts relacionados (Directorio.js, DirectorioAdm.js) con mejoras en estructura y rendimiento.
- ♻️ **SolicitudVacaciones:** Optimización de flujo en SolicitudVacaciones.php, SolicitudesVacacionesFinales.php y scripts correspondientes.
- 🧹 **Checklists/Kpis:** Limpieza y optimización de scripts/Checklists.js (194 líneas) y scripts/Kpis.js (286 líneas).
- 🧹 **Eventos:** Mejoras en Eventos.php y scripts/Eventos.js.
- 🧹 **UI/Estilos:** Actualización de neptune_styles.php (77 líneas) y neptune_js.php (17 líneas).
- 🧹 **Limpieza:** Eliminación de 13 archivos temporales de prueba (temp_*.php, test_*.php).
- ✨ **Nuevos Scripts:** Agregado utility scripts Python para generación de datos (generate_chk.py, generate_directorio.py, generate_kpis.py, etc.).

## [2026-04-23 10:30:00] 🧹 chore: limpiar archivos demo y actualizar Feed

- 🧹 **Limpieza:** Eliminación de archivos de prueba e imágenes temporales de desarrollo (26 archivos de incidencias, capacitaciones y firmas demo).
- 🧹 **SQL Obsoletos:** Remoción de 19 archivos SQL de scripts demo y pruebas.
- ✨ **Feed Backend:** Actualización de módulos Backend/Feed/App.php y Backend/Feed/Feed.php con nuevas funcionalidades.
- ✨ **Feed Frontend:** Mejoras en scripts/ListadoFeed.js con 644 líneas de cambios.
- ✨ **Dashboard/Eventos:** Ajustes en Backend/Dashboard y Backend/Eventos.
- ✨ **Nuevo SQL:** Agregado archivo consolidado intranet-pip-actualizada.sql.
- 📝 **Index:** Actualización de index.php con 46 líneas nuevas.

## [2026-04-23 09:55:00] 🎨 style: mejorar UI del Feed y Checklist

- 🎨 **Checklist:** Eliminación de bordes left color amarillo, uso de backgrounds más limpios.
- 🎨 **Card Headers:** Actualización a tonos grises neutros (#f3f5f7) en lugar de amarillo.
- 🎨 **Fullscreen Feed:** Mejora en limpieza del Swiper al cerrar, soporte de tecla Escape y mejor estilo del botón cerrar.

## [2026-04-22 09:45:00] ✨ feat: migrar gauges KPI a Syncfusion CircularGauge

- ✨ **Dashboard KPIs:** Implementación de Syncfusion CircularGauge para visualizar KPIs con soporte dinámico de umbrales (bajo=rojo, medio=amarillo, alto=verde).
- ✨ **Backend Thresholds:** Lógica para obtener umbrales desde la tabla `Kpis` cuando no se incluyen en el stored procedure.
- ✨ **Mejoras UI:** Estilos CSS mejorados para pills de KPIs con soporte responsive y visualización del porcentaje.
- 🐛 **File Upload:** Corrección para sincronizar archivos del DataTransfer después de limpiar el input.