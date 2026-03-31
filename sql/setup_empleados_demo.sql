-- ============================================================
--  SETUP EMPLEADOS DEMO
--  Base de datos: klynet_datosdemo
--  Fecha: 2026-03-26
--
--  Crea todo lo necesario para probar el módulo de Evaluaciones:
--    1. Una Sucursal
--    2. Un Centro de Costo
--    3. Empleado 1 → GERENTE (jefe / evaluador)
--    4. Empleado 2 → JEFE DE FARMACIA (subordinado / evaluado)
--    5. Relación jefe-subordinado en RelacionEmpleados
--    6. Permisos de menú para ambos puestos
--
--  Contraseña de acceso para ambos empleados: 12345
-- ============================================================

USE klynet_datosdemo;

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES   = 0;

-- ============================================================
-- 1. SUCURSAL (necesaria como FK en Empleados)
-- ============================================================

INSERT INTO SucursalDepto (IdSucursal, Sucursal, IdDivision)
VALUES (1, 'SUCURSAL DEMO', 1);

-- ============================================================
-- 2. CENTRO DE COSTO (necesario como FK en Empleados)
-- ============================================================

-- Verificar si el 601 ya existe (lo usaba RESO); si no, créalo
INSERT IGNORE INTO CentroCostos (IdCentroCosto, CentrodeCosto)
VALUES (601, 'ADMINISTRACIÓN');

-- Centro de costo para los empleados nuevos
INSERT IGNORE INTO CentroCostos (IdCentroCosto, CentrodeCosto)
VALUES (1, 'FARMACIA DEMO');

-- ============================================================
-- 3. EMPLEADOS DE PRUEBA
--    Password "12345" en base64 = MTIzNDU=
--    Nivel 1 = Gerente / Nivel 2 = Operativo
-- ============================================================

-- Empleado 1: GERENTE (será el evaluador / jefe)
INSERT INTO Empleados (
    NoEmpleado, Nombre, Email, Movil,
    RFC, CURP, NoSeguro,
    FNacimiento, Antiguedad,
    Nivel, IdPuesto, IdSucursal, IdDivision, IdCentroCosto,
    Password, Status, Registro
) VALUES (
    '1001', 'CARLOS GERENTE DEMO', 'gerente@demo.com', '8111111111',
    'GEDE900101XXX', 'GEDE900101HXXXX01', '12345678901',
    '1990-01-01', '2020-01-01',
    1, 2, 1, 1, 1,          -- Nivel=1, Puesto=GERENTE SUCURSAL, Sucursal=1, División=1, CC=1
    'MTIzNDU=', 1, NOW()
);

-- Empleado 2: JEFE DE FARMACIA (será el evaluado / subordinado)
INSERT INTO Empleados (
    NoEmpleado, Nombre, Email, Movil,
    RFC, CURP, NoSeguro,
    FNacimiento, Antiguedad,
    Nivel, IdPuesto, IdSucursal, IdDivision, IdCentroCosto,
    Password, Status, Registro
) VALUES (
    '1002', 'LAURA FARMACIA DEMO', 'farmacia@demo.com', '8112222222',
    'FADL950215XXX', 'FADL950215MXXXX02', '98765432101',
    '1995-02-15', '2021-03-01',
    2, 3, 1, 1, 1,          -- Nivel=2, Puesto=JEFE DE FARMACIA, Sucursal=1, División=1, CC=1
    'MTIzNDU=', 1, NOW()
);

-- ============================================================
-- 4. RELACIÓN JEFE → SUBORDINADO
--    EmpleadoPadre = 1001 (gerente)
--    EmpleadoHijo  = 1002 (jefe farmacia)
-- ============================================================

INSERT INTO RelacionEmpleados (EmpleadoPadre, EmpleadoHijo, Registro)
VALUES ('1001', '1002', NOW());

-- ============================================================
-- 5. PERMISOS DE MENÚ PARA AMBOS PUESTOS
--    IdPuesto 2 = GERENTE SUCURSAL
--    IdPuesto 3 = JEFE DE FARMACIA
-- ============================================================

-- Limpiar permisos previos de estos puestos (por si hay residuos)
DELETE FROM MenusPermisos WHERE IdPuesto IN (2, 3);

-- Dar acceso a todos los menús a ambos puestos
INSERT INTO MenusPermisos (id_menu, IdPuesto)
SELECT id_menu, 2 FROM menus;

INSERT INTO MenusPermisos (id_menu, IdPuesto)
SELECT id_menu, 3 FROM menus;

-- ============================================================
-- Restaurar configuración
-- ============================================================
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES   = 1;

-- ============================================================
-- VERIFICACIÓN
-- ============================================================
SELECT 'Sucursales:'      AS Tabla, COUNT(*) AS Total FROM SucursalDepto
UNION ALL
SELECT 'CentrosCosto:',     COUNT(*) FROM CentroCostos
UNION ALL
SELECT 'Empleados:',        COUNT(*) FROM Empleados
UNION ALL
SELECT 'Relaciones:',       COUNT(*) FROM RelacionEmpleados
UNION ALL
SELECT 'Permisos menú:',    COUNT(*) FROM MenusPermisos;

-- Detalle de empleados creados
SELECT NoEmpleado, Nombre, Nivel, IdPuesto, IdSucursal, IdDivision, Email
FROM Empleados
ORDER BY NoEmpleado;
