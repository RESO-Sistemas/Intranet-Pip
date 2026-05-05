# Changelog

Todos los cambios relevantes del proyecto se registran aquí en orden cronológico inverso.

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