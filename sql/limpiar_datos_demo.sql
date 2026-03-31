-- ============================================================
--  SCRIPT DE LIMPIEZA DE DATOS DEMO
--  Base de datos: klynet_datosdemo
--  Fecha: 2026-03-26
--
--  REGLA PRINCIPAL:
--    Conservar el empleado con NoEmpleado = '999999999' (RESO)
--
--  NOTA:
--    - Solo se eliminan FILAS de las tablas principales.
--    - Las tablas de relaciones (junction tables) NO se tocan.
--    - La estructura de todas las tablas se conserva intacta.
--    - Se usa FOREIGN_KEY_CHECKS = 0 únicamente para evitar
--      errores de FK al borrar padres cuyos hijos relacionales
--      no se van a eliminar. Se reactiva al final.
-- ============================================================

USE klynet_datosdemo;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;  -- Desactiva el modo seguro de Workbench

-- ============================================================
-- 1. SOLICITUDES Y DATOS SECUNDARIOS DE EMPLEADOS
-- ============================================================

-- Solicitudes de vacaciones
DELETE FROM SolicitudesVacaciones;

-- Esquema vacunación COVID
DELETE FROM EsquemaVacunacionCOVID;

-- ============================================================
-- 2. ORGANIGRAMAS (detalle primero, luego cabecera)
-- ============================================================

DELETE FROM DetalleOrganigrama;
DELETE FROM Organigramas;

-- ============================================================
-- 3. CHECKLISTS Y RESPUESTAS DIARIAS
-- ============================================================

-- Respuestas diarias de checklist registradas por empleados
DELETE FROM ChecklistEmpleados;

-- Checklists principales
DELETE FROM Checklists;

-- ============================================================
-- 4. LÍNEA DE ÉTICA — solo los mensajes
-- ============================================================

DELETE FROM LineaEticaMensajes;

-- Catálogo de tipos (opcional — comentado por defecto):
-- DELETE FROM CatalogoLineaEtica;

-- ============================================================
-- 5. POSTULANTES Y VACANTES
-- ============================================================

-- Documentos de postulantes (CV, Solicitud de Empleo)
DELETE FROM PostulantesArchivos;

-- Postulantes / candidatos
DELETE FROM Postulantes;

-- Vacantes
DELETE FROM Vacantes;

-- ============================================================
-- 6. EVALUACIONES
-- (hijos primero, cabecera al final)
-- ============================================================

-- Respuestas dadas en evaluaciones
DELETE FROM RespuestaEvaluaciones;

-- Registro de evaluaciones finalizadas
DELETE FROM DetalleEvaluacionesRespondidas;

-- Cola de espera al crear una evaluación
DELETE FROM EsperaNuevaEvaluacion;

-- Detalle de quién evalúa a quién
DELETE FROM EvaluacionDetalle;

-- Evaluaciones principales (cabecera)
DELETE FROM Evaluaciones;

-- ============================================================
-- 7. FORMULARIOS (descomenta con el nombre real de tus tablas)
-- ============================================================

-- DELETE FROM FormulariosRespuestas;
-- DELETE FROM FormulariosPreguntas;
-- DELETE FROM Formularios;

-- ============================================================
-- 7. EMPLEADOS — conservando al usuario RESO (999999999)
-- ============================================================

DELETE FROM Empleados
WHERE NoEmpleado <> '999999999';

-- ============================================================
-- 8. PUESTOS
-- ============================================================

DELETE FROM Puestos;
ALTER TABLE Puestos AUTO_INCREMENT = 1;

-- ============================================================
-- 9. SUCURSALES / DEPARTAMENTOS
-- ============================================================

DELETE FROM SucursalDepto;
ALTER TABLE SucursalDepto AUTO_INCREMENT = 1;

-- ============================================================
-- Reactivar restricciones de FK y modo seguro
-- ============================================================
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;   -- Reactiva el modo seguro

-- ============================================================
-- VERIFICACIÓN RÁPIDA
-- ============================================================
SELECT 'Empleados restantes:'       AS Tabla, COUNT(*) AS Total FROM Empleados
UNION ALL
SELECT 'Puestos restantes:',           COUNT(*) FROM Puestos
UNION ALL
SELECT 'Sucursales restantes:',        COUNT(*) FROM SucursalDepto
UNION ALL
SELECT 'Vacantes restantes:',          COUNT(*) FROM Vacantes
UNION ALL
SELECT 'Postulantes restantes:',       COUNT(*) FROM Postulantes
UNION ALL
SELECT 'Checklists restantes:',        COUNT(*) FROM Checklists
UNION ALL
SELECT 'Organigramas restantes:',      COUNT(*) FROM Organigramas
UNION ALL
SELECT 'LineaEtica restantes:',        COUNT(*) FROM LineaEticaMensajes
UNION ALL
SELECT 'Evaluaciones restantes:',      COUNT(*) FROM Evaluaciones
UNION ALL
SELECT 'EvaluacionDetalle rest.:',     COUNT(*) FROM EvaluacionDetalle
UNION ALL
SELECT 'RespuestaEval. restantes:',    COUNT(*) FROM RespuestaEvaluaciones;
