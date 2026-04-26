# Changelog

Todos los cambios relevantes del proyecto se registran aquí en orden cronológico inverso.

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