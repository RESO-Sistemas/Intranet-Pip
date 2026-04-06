-- =====================================================
-- Script de Verificación de Datos
-- Ejecutar ANTES de la migración para identificar problemas
-- =====================================================

SELECT '=== 1. POSTULANTES SIN TELÉFONO ===' AS Verificacion;
SELECT 
    IdPostulante, 
    CONCAT(Nombre, ' ', ApellidoPaterno, ' ', IFNULL(ApellidoMaterno, '')) AS NombreCompleto,
    CorreoElectronico,
    CURP,
    Telefono
FROM Postulantes
WHERE Telefono IS NULL OR Telefono = '' OR TRIM(Telefono) = ''
ORDER BY IdPostulante DESC
LIMIT 20;

SELECT '=== 2. TELÉFONOS CON FORMATO INCORRECTO ===' AS Verificacion;
SELECT 
    IdPostulante,
    CONCAT(Nombre, ' ', ApellidoPaterno) AS NombreCompleto,
    Telefono,
    LENGTH(REGEXP_REPLACE(Telefono, '[^0-9]', '')) AS LongitudNumeros,
    REGEXP_REPLACE(Telefono, '[^0-9]', '') AS TelefonoNormalizado
FROM Postulantes
WHERE Telefono IS NOT NULL 
  AND Telefono != ''
  AND (
      LENGTH(REGEXP_REPLACE(Telefono, '[^0-9]', '')) != 10
      OR Telefono REGEXP '[^0-9 \-\(\)]'
  )
LIMIT 20;

SELECT '=== 3. TELÉFONOS DUPLICADOS (MISMO NÚMERO, DIFERENTES POSTULANTES) ===' AS Verificacion;
SELECT 
    Telefono,
    COUNT(*) AS VecesRepetido,
    GROUP_CONCAT(CONCAT(Nombre, ' ', ApellidoPaterno) SEPARATOR ' | ') AS Postulantes,
    GROUP_CONCAT(CURP SEPARATOR ' | ') AS CURPs
FROM Postulantes
WHERE Telefono IS NOT NULL AND Telefono != ''
GROUP BY Telefono
HAVING COUNT(*) > 1
ORDER BY VecesRepetido DESC
LIMIT 20;

SELECT '=== 4. POSTULANTES CON CURP DUPLICADO ===' AS Verificacion;
SELECT 
    CURP,
    COUNT(*) AS VecesRepetido,
    GROUP_CONCAT(CONCAT(Nombre, ' ', ApellidoPaterno) SEPARATOR ' | ') AS Postulantes,
    GROUP_CONCAT(Telefono SEPARATOR ' | ') AS Telefonos
FROM Postulantes
WHERE CURP IS NOT NULL AND CURP != ''
GROUP BY CURP
HAVING COUNT(*) > 1
ORDER BY VecesRepetido DESC;

SELECT '=== 5. ESTADÍSTICAS GENERALES ===' AS Verificacion;
SELECT 
    COUNT(*) AS TotalPostulantes,
    COUNT(DISTINCT CURP) AS CURPsUnicos,
    COUNT(CASE WHEN Telefono IS NOT NULL AND Telefono != '' THEN 1 END) AS ConTelefono,
    COUNT(CASE WHEN Telefono IS NULL OR Telefono = '' THEN 1 END) AS SinTelefono,
    COUNT(CASE WHEN CorreoElectronico IS NOT NULL AND CorreoElectronico != '' THEN 1 END) AS ConCorreo,
    COUNT(CASE WHEN LENGTH(REGEXP_REPLACE(Telefono, '[^0-9]', '')) = 10 THEN 1 END) AS TelefonosValidos
FROM Postulantes;

-- =====================================================
-- RECOMENDACIONES:
-- 1. Contactar postulantes sin teléfono para completar datos
-- 2. Normalizar teléfonos con formato incorrecto
-- 3. Resolver duplicados antes de aplicar constraint de unicidad
-- 4. Verificar CURPs duplicados (posible error de captura)
-- =====================================================
