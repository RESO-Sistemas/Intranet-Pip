-- ============================================================
--  SCRIPT DE LIMPIEZA - POSTULANTE IdPostulante = 16
--  Base de datos: klynet_datosdemo
--  Fecha: 2026-04-08
--
--  REGLA PRINCIPAL:
--    Eliminar TODOS los datos relacionados al postulante 16,
--    pero CONSERVAR su registro en la tabla Postulantes.
--
--  ORDEN DE ELIMINACIÓN (hijos antes que padres):
--    1. PostulantesRespuestas       (hijo de PostulantesEvaluaciones)
--    2. PostulantesEvaluaciones     (hijo de PostulantesVacantes)
--    3. PostulantesHistorial        (hijo de PostulantesVacantes)
--    4. PostulantesRequisitos       (hijo de PostulantesVacantes)
--    5. PostulantesArchivos         (hijo de PostulantesVacantes, CASCADE - por si acaso)
--    6. PostulantesVacantes         (hijo de Postulantes)
--
--  ⚠️  El registro en Postulantes (IdPostulante=16) NO se toca.
-- ============================================================

USE klynet_datosdemo;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- ============================================================
-- PASO PREVIO: Identificar los IdPostulanteVacante del postulante 16
--   (solo como referencia visual — el script usa subqueries)
-- ============================================================
-- SELECT IdPostulanteVacante FROM PostulantesVacantes WHERE IdPostulante = 16;

-- ============================================================
-- 1. PostulantesRespuestas
--    (respuestas a preguntas de evaluaciones del postulante)
-- ============================================================
DELETE FROM PostulantesRespuestas
WHERE IdPostulanteEvaluacion IN (
    SELECT pe.IdPostulanteEvaluacion
    FROM PostulantesEvaluaciones pe
    INNER JOIN PostulantesVacantes pv ON pv.IdPostulanteVacante = pe.IdPostulanteVacante
    WHERE pv.IdPostulante = 16
);

-- ============================================================
-- 2. PostulantesEvaluaciones
--    (evaluaciones asignadas al postulante en sus postulaciones)
-- ============================================================
DELETE FROM PostulantesEvaluaciones
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante
    FROM PostulantesVacantes
    WHERE IdPostulante = 16
);

-- ============================================================
-- 3. PostulantesHistorial
--    (historial de procesos por los que avanzó el postulante)
-- ============================================================
DELETE FROM PostulantesHistorial
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante
    FROM PostulantesVacantes
    WHERE IdPostulante = 16
);

-- ============================================================
-- 4. PostulantesRequisitos
--    (respuestas del postulante a los requisitos de la vacante)
-- ============================================================
DELETE FROM PostulantesRequisitos
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante
    FROM PostulantesVacantes
    WHERE IdPostulante = 16
);

-- ============================================================
-- 5. PostulantesArchivos
--    (CV y solicitud de empleo — tiene ON DELETE CASCADE,
--     pero se elimina explícitamente por claridad)
-- ============================================================
DELETE FROM PostulantesArchivos
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante
    FROM PostulantesVacantes
    WHERE IdPostulante = 16
);

-- ============================================================
-- 6. PostulantesVacantes
--    (postulaciones del candidato a vacantes)
-- ============================================================
DELETE FROM PostulantesVacantes
WHERE IdPostulante = 16;

-- ============================================================
-- Reactivar restricciones
-- ============================================================
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;

-- ============================================================
-- VERIFICACIÓN
-- ============================================================
SELECT 'Postulante 16 (debe seguir existiendo):' AS Verificacion,
       IdPostulante, Nombre, ApellidoPaterno, CorreoElectronico
FROM Postulantes
WHERE IdPostulante = 16;

SELECT 'PostulantesVacantes restantes del 16:' AS Verificacion, COUNT(*) AS Total
FROM PostulantesVacantes WHERE IdPostulante = 16;

SELECT 'PostulantesHistorial restantes del 16:' AS Verificacion, COUNT(*) AS Total
FROM PostulantesHistorial
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante FROM PostulantesVacantes WHERE IdPostulante = 16
);

SELECT 'PostulantesEvaluaciones restantes del 16:' AS Verificacion, COUNT(*) AS Total
FROM PostulantesEvaluaciones
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante FROM PostulantesVacantes WHERE IdPostulante = 16
);

SELECT 'PostulantesRequisitos restantes del 16:' AS Verificacion, COUNT(*) AS Total
FROM PostulantesRequisitos
WHERE IdPostulanteVacante IN (
    SELECT IdPostulanteVacante FROM PostulantesVacantes WHERE IdPostulante = 16
);
