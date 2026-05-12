-- =============================================================
-- SCRIPT DE DATOS DE PRUEBA - INTRANET PIP
-- Generado: 2026-05-12
-- Descripción: Inserta divisiones, centros de costo, sucursales,
--              puestos y empleados con jerarquía (jefes/subordinados).
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8;

-- -------------------------------------------------------------
-- 1. DIVISIONES
--    LaburaSabados / LaburaDomingos / LaburaDiasFestivos:
--    1 = sí labora, 0 = no labora
-- -------------------------------------------------------------
INSERT IGNORE INTO `Divisiones` (`IdDivision`, `Division`, `LaburaSabados`, `LaburaDomingos`, `LaburaDiasFestivos`) VALUES
(1, 'Corporativo',          0, 0, 0),
(2, 'Operaciones',          1, 0, 0),
(3, 'Tecnología',           0, 0, 0),
(4, 'Recursos Humanos',     0, 0, 0),
(5, 'Ventas y Marketing',   1, 0, 0);

-- -------------------------------------------------------------
-- 2. CENTROS DE COSTO
-- -------------------------------------------------------------
INSERT IGNORE INTO `CentroCostos` (`IdCentroCosto`, `CentrodeCosto`) VALUES
(100, 'Dirección General'),
(200, 'Administración y Finanzas'),
(300, 'Operaciones Generales'),
(400, 'Tecnología de Información'),
(500, 'Capital Humano'),
(600, 'Comercial');

-- -------------------------------------------------------------
-- 3. SUCURSALES / DEPARTAMENTOS
--    IdDivision referencia Divisiones
-- -------------------------------------------------------------
INSERT IGNORE INTO `SucursalDepto` (`IdSucursal`, `Sucursal`, `IdDivision`) VALUES
(1,  'Oficina Central - Monterrey',  1),
(2,  'Planta Norte',                 2),
(3,  'Planta Sur',                   2),
(4,  'Departamento TI',              3),
(5,  'Departamento RRHH',            4),
(6,  'Región Noreste Ventas',        5),
(7,  'Región Bajío Ventas',          5),
(8,  'Finanzas Corporativas',        1);

-- -------------------------------------------------------------
-- 4. PUESTOS
--    EsJefe: 1 = es jefe, 0 = no es jefe
--    IdJefesPuesto: IDs de puestos que son sus jefes (separados por coma)
-- -------------------------------------------------------------
INSERT IGNORE INTO `Puestos` (`IdPuesto`, `Puesto`, `IdDivision`, `EsJefe`, `IdJefesPuesto`) VALUES
-- Corporativo
(1,  'Director General',              1, 1, NULL),
(2,  'Subdirector de Operaciones',    1, 1, '1'),
(3,  'Subdirector Administrativo',    1, 1, '1'),
-- Operaciones
(10, 'Gerente de Planta',             2, 1, '2'),
(11, 'Supervisor de Producción',      2, 1, '10'),
(12, 'Técnico de Mantenimiento',      2, 0, '11'),
(13, 'Operador de Máquinas',          2, 0, '11'),
(14, 'Almacenista',                   2, 0, '10'),
-- Tecnología
(20, 'Gerente de TI',                 3, 1, '3'),
(21, 'Líder de Desarrollo',           3, 1, '20'),
(22, 'Desarrollador Full Stack',      3, 0, '21'),
(23, 'Administrador de Base de Datos',3, 0, '21'),
(24, 'Soporte Técnico',               3, 0, '20'),
-- Recursos Humanos
(30, 'Gerente de RRHH',              4, 1, '3'),
(31, 'Coordinador de Reclutamiento', 4, 1, '30'),
(32, 'Analista de Nómina',           4, 0, '30'),
(33, 'Auxiliar de RRHH',             4, 0, '31'),
-- Ventas y Marketing
(40, 'Gerente Comercial',            5, 1, '3'),
(41, 'Ejecutivo de Ventas Senior',   5, 0, '40'),
(42, 'Ejecutivo de Ventas Junior',   5, 0, '41'),
(43, 'Promotor de Marca',            5, 0, '40');

-- -------------------------------------------------------------
-- 5. EMPLEADOS
--    Nivel: 1 = Alta dirección, 2 = Gerencias, 3 = Coordinadores/Supervisores, 4 = Operativos
--    Password: 'test1234' (en producción debe estar hasheada)
-- -------------------------------------------------------------
INSERT IGNORE INTO `Empleados` (
    `NoEmpleado`, `Nombre`, `Antiguedad`, `FNacimiento`,
    `RFC`, `CURP`, `NoSeguro`, `Email`, `Movil`,
    `Nivel`, `IdCentroCosto`, `IdDivision`, `IdSucursal`, `IdPuesto`,
    `Password`, `Imagen`, `MarcacionCorta`, `Status`, `DiasVacacionesRest`,
    `tokenOS`, `Registro`, `FeedAnniversary`, `FeedBirthday`
) VALUES

-- ======================== NIVEL 1: ALTA DIRECCIÓN ========================
(1001, 'Roberto Alejandro Garza Montoya',
 '2010-01-15', '1975-03-22',
 'GAMR750322AB1', 'GAMR750322HNLRBN05', 'IMSS-100001',
 'rgarza@empresa.com', '8110001001',
 1, 100, 1, 1, 1,
 'test1234', NULL, 1001, 1, 15,
 '', '2010-01-15 08:00:00', 1, 1),

-- ======================== NIVEL 2: GERENCIAS / SUBDIRECCIONES ========================
(1002, 'María Elena Salinas Torres',
 '2012-03-01', '1978-07-10',
 'SATM780710CD2', 'SATM780710MNLRLN08', 'IMSS-100002',
 'msalinas@empresa.com', '8110001002',
 2, 300, 1, 1, 2,
 'test1234', NULL, 1002, 1, 12,
 '', '2012-03-01 08:00:00', 1, 1),

(1003, 'Arturo Humberto Pérez Villanueva',
 '2013-06-15', '1980-11-05',
 'PEVA801105EF3', 'PEVA801105HNLRRL09', 'IMSS-100003',
 'aperez@empresa.com', '8110001003',
 2, 200, 1, 1, 3,
 'test1234', NULL, 1003, 1, 12,
 '', '2013-06-15 08:00:00', 1, 1),

(1004, 'Claudia Fernanda Ríos Bustamante',
 '2014-02-20', '1982-04-18',
 'RIBC820418GH4', 'RIBC820418MNLSLS07', 'IMSS-100004',
 'crios@empresa.com', '8110001004',
 2, 400, 3, 4, 20,
 'test1234', NULL, 1004, 1, 12,
 '', '2014-02-20 08:00:00', 1, 1),

(1005, 'Luis Gerardo Mendoza Acosta',
 '2015-08-10', '1979-09-30',
 'MEAL790930IJ5', 'MEAL790930HNLNCS01', 'IMSS-100005',
 'lmendoza@empresa.com', '8110001005',
 2, 500, 4, 5, 30,
 'test1234', NULL, 1005, 1, 12,
 '', '2015-08-10 08:00:00', 1, 1),

(1006, 'Sandra Patricia López Herrera',
 '2016-01-05', '1983-12-14',
 'LOHS831214KL6', 'LOHS831214MNLPRS02', 'IMSS-100006',
 'slopez@empresa.com', '8110001006',
 2, 600, 5, 6, 40,
 'test1234', NULL, 1006, 1, 12,
 '', '2016-01-05 08:00:00', 1, 1),

-- ======================== NIVEL 3: SUPERVISORES / COORDINADORES ========================
(1007, 'Carlos Iván Domínguez Ruiz',
 '2016-05-01', '1985-02-28',
 'DORC850228MN7', 'DORC850228HNLMRL04', 'IMSS-100007',
 'cdominguez@empresa.com', '8110001007',
 3, 300, 2, 2, 10,
 'test1234', NULL, 1007, 1, 10,
 '', '2016-05-01 08:00:00', 1, 1),

(1008, 'Gabriela Sofía Castillo Morales',
 '2017-03-14', '1987-06-09',
 'CAMG870609NO8', 'CAMG870609MNLSRB06', 'IMSS-100008',
 'gcastillo@empresa.com', '8110001008',
 3, 300, 2, 3, 10,
 'test1234', NULL, 1008, 1, 10,
 '', '2017-03-14 08:00:00', 1, 1),

(1009, 'Héctor Manuel Vargas Jiménez',
 '2017-09-01', '1988-10-15',
 'VAJH881015PQ9', 'VAJH881015HNLRRH03', 'IMSS-100009',
 'hvargas@empresa.com', '8110001009',
 3, 300, 2, 2, 11,
 'test1234', NULL, 1009, 1, 10,
 '', '2017-09-01 08:00:00', 1, 1),

(1010, 'Diana Paola Ortega Fuentes',
 '2018-02-01', '1990-01-23',
 'OEFD900123RS0', 'OEFD900123MNLRTN07', 'IMSS-100010',
 'dortega@empresa.com', '8110001010',
 3, 400, 3, 4, 21,
 'test1234', NULL, 1010, 1, 10,
 '', '2018-02-01 08:00:00', 1, 1),

(1011, 'Ricardo Emmanuel Núñez Soto',
 '2018-07-10', '1986-05-07',
 'NUSR860507TU1', 'NUSR860507HNLXRS09', 'IMSS-100011',
 'rnunez@empresa.com', '8110001011',
 3, 500, 4, 5, 31,
 'test1234', NULL, 1011, 1, 10,
 '', '2018-07-10 08:00:00', 1, 1),

(1012, 'Verónica Estela Guzmán Padilla',
 '2019-01-14', '1991-08-19',
 'GUPV910819VW2', 'GUPV910819MNLZDR04', 'IMSS-100012',
 'vguzman@empresa.com', '8110001012',
 3, 600, 5, 6, 41,
 'test1234', NULL, 1012, 1, 10,
 '', '2019-01-14 08:00:00', 1, 1),

-- ======================== NIVEL 4: OPERATIVOS ========================
(1013, 'Jorge Enrique Flores Medina',
 '2019-05-06', '1994-03-11',
 'FOMJ940311XY3', 'FOMJ940311HNLRLG07', 'IMSS-100013',
 'jflores@empresa.com', '8110001013',
 4, 300, 2, 2, 12,
 'test1234', NULL, 1013, 1, 5,
 '', '2019-05-06 08:00:00', 1, 1),

(1014, 'Alicia Marcela Torres Sandoval',
 '2019-08-19', '1995-07-04',
 'TOSA950704ZA4', 'TOSA950704MNLRRL02', 'IMSS-100014',
 'atorres@empresa.com', '8110001014',
 4, 300, 2, 2, 13,
 'test1234', NULL, 1014, 1, 5,
 '', '2019-08-19 08:00:00', 1, 1),

(1015, 'Felipe de Jesús Ramírez Leal',
 '2020-01-20', '1993-11-28',
 'RALF931128BC5', 'RALF931128HNLMPL05', 'IMSS-100015',
 'framirez@empresa.com', '8110001015',
 4, 300, 2, 3, 13,
 'test1234', NULL, 1015, 1, 5,
 '', '2020-01-20 08:00:00', 1, 1),

(1016, 'Mónica Berenice Aguilar Contreras',
 '2020-04-15', '1996-02-14',
 'AUCM960214DE6', 'AUCM960214MNLGNB07', 'IMSS-100016',
 'maguilar@empresa.com', '8110001016',
 4, 300, 2, 2, 14,
 'test1234', NULL, 1016, 1, 5,
 '', '2020-04-15 08:00:00', 1, 1),

(1017, 'Omar Alejandro Ibarra Reyes',
 '2020-09-01', '1997-06-22',
 'IRAO970622FG7', 'IRAO970622HNLBYM09', 'IMSS-100017',
 'oibarra@empresa.com', '8110001017',
 4, 400, 3, 4, 22,
 'test1234', NULL, 1017, 1, 5,
 '', '2020-09-01 08:00:00', 1, 1),

(1018, 'Paola Itzel Hernández Villarreal',
 '2020-11-16', '1998-09-03',
 'HEVP980903HI8', 'HEVP980903MNLRLL06', 'IMSS-100018',
 'phernandez@empresa.com', '8110001018',
 4, 400, 3, 4, 22,
 'test1234', NULL, 1018, 1, 5,
 '', '2020-11-16 08:00:00', 1, 1),

(1019, 'Ernesto Daniel Cruz Moreno',
 '2021-02-08', '1996-12-01',
 'CUME961201JK9', 'CUME961201HNLRRD04', 'IMSS-100019',
 'ecruz@empresa.com', '8110001019',
 4, 400, 3, 4, 23,
 'test1234', NULL, 1019, 1, 5,
 '', '2021-02-08 08:00:00', 1, 1),

(1020, 'Lorena Guadalupe Sánchez Reyna',
 '2021-06-01', '1999-04-17',
 'SARL990417LM0', 'SARL990417MNLNCL03', 'IMSS-100020',
 'lsanchez@empresa.com', '8110001020',
 4, 400, 3, 4, 24,
 'test1234', NULL, 1020, 1, 5,
 '', '2021-06-01 08:00:00', 1, 1),

(1021, 'Javier Alexis Morales Treviño',
 '2021-09-13', '1998-01-25',
 'MOTJ980125NO1', 'MOTJ980125HNLRVJ02', 'IMSS-100021',
 'jmorales@empresa.com', '8110001021',
 4, 500, 4, 5, 32,
 'test1234', NULL, 1021, 1, 5,
 '', '2021-09-13 08:00:00', 1, 1),

(1022, 'Stephanie Rubí Delgado Garza',
 '2022-01-10', '2000-08-11',
 'DEGS000811PQ2', 'DEGS000811MNLLRT08', 'IMSS-100022',
 'sdelgado@empresa.com', '8110001022',
 4, 500, 4, 5, 33,
 'test1234', NULL, 1022, 1, 5,
 '', '2022-01-10 08:00:00', 1, 1),

(1023, 'Rodrigo Sebastián Valdés Chávez',
 '2022-03-28', '1997-07-31',
 'VACR970731RS3', 'VACR970731HNLLHD06', 'IMSS-100023',
 'rvaldes@empresa.com', '8110001023',
 4, 600, 5, 6, 42,
 'test1234', NULL, 1023, 1, 5,
 '', '2022-03-28 08:00:00', 1, 1),

(1024, 'Natalia Esperanza Rojas Cantú',
 '2022-07-04', '2001-02-09',
 'ROCN010209TU4', 'ROCN010209MNLNNT05', 'IMSS-100024',
 'nrojas@empresa.com', '8110001024',
 4, 600, 5, 7, 42,
 'test1234', NULL, 1024, 1, 5,
 '', '2022-07-04 08:00:00', 1, 1),

(1025, 'Miguel Ángel Cortés Medrano',
 '2022-10-17', '1999-10-20',
 'COMM991020VW5', 'COMM991020HNLRDG01', 'IMSS-100025',
 'mcortes@empresa.com', '8110001025',
 4, 600, 5, 7, 43,
 'test1234', NULL, 1025, 1, 5,
 '', '2022-10-17 08:00:00', 1, 1);

-- -------------------------------------------------------------
-- 6. RELACIÓN EMPLEADOS (jerarquía jefe → subordinado)
--    EmpleadoPadre = jefe, EmpleadoHijo = subordinado
-- -------------------------------------------------------------
INSERT IGNORE INTO `RelacionEmpleados` (`EmpleadoPadre`, `EmpleadoHijo`, `Registro`) VALUES
-- Director General → Subdirectores
(1001, 1002, NOW()),
(1001, 1003, NOW()),
-- Subdirector Operaciones → Gerentes de Planta
(1002, 1007, NOW()),
(1002, 1008, NOW()),
-- Subdirector Administrativo → Gerentes de Área
(1003, 1004, NOW()),
(1003, 1005, NOW()),
(1003, 1006, NOW()),
-- Gerentes de Planta → Supervisores
(1007, 1009, NOW()),
(1008, 1009, NOW()),
-- Gerente TI → Líder de Desarrollo
(1004, 1010, NOW()),
-- Gerente RRHH → Coordinador
(1005, 1011, NOW()),
-- Gerente Comercial → Ejecutivo Senior
(1006, 1012, NOW()),
-- Supervisor Producción → Operativos
(1009, 1013, NOW()),
(1009, 1014, NOW()),
(1009, 1015, NOW()),
-- Gerente Planta → Almacenista
(1007, 1016, NOW()),
-- Líder Desarrollo → Desarrolladores
(1010, 1017, NOW()),
(1010, 1018, NOW()),
(1010, 1019, NOW()),
-- Gerente TI → Soporte
(1004, 1020, NOW()),
-- Gerente RRHH → Analista Nómina
(1005, 1021, NOW()),
-- Coordinador Reclutamiento → Auxiliar
(1011, 1022, NOW()),
-- Ejecutivo Senior → Ejecutivos Junior
(1012, 1023, NOW()),
(1012, 1024, NOW()),
-- Gerente Comercial → Promotor
(1006, 1025, NOW());

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- FIN DEL SCRIPT
-- Total: 5 Divisiones, 6 Centros de Costo, 8 Sucursales,
--        21 Puestos, 25 Empleados, 24 Relaciones jerárquicas
-- =============================================================
