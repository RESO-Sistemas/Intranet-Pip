-- =============================================================
-- SEED DE ORGANIGRAMAS - INTRANET PIP
-- Generado: 2026-05-12
-- Prerequisito: seed_datos_prueba.sql ya ejecutado
-- Organigramas creados:
--   ID 1 → Corporativo General
--   ID 2 → Área de Operaciones
--   ID 3 → Área de Tecnología
--   ID 4 → Área de Recursos Humanos
--   ID 5 → Área de Ventas y Marketing
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;  -- Desactiva safe mode de Workbench
SET NAMES utf8;

-- Limpiamos por si se vuelve a correr
DELETE FROM `DetalleOrganigrama` WHERE `idOrganigramas` IN (1,2,3,4,5);
DELETE FROM `Organigramas`       WHERE `idOrganigramas` IN (1,2,3,4,5);

-- ─────────────────────────────────────────────────────────────
-- ORGANIGRAMAS (cabecera)
-- ─────────────────────────────────────────────────────────────
INSERT INTO `Organigramas` (`idOrganigramas`,`Titulo`,`Registro`,`Status`) VALUES
(1, 'Organigrama Corporativo 2026',      NOW(), 1),
(2, 'Organigrama – Operaciones',         NOW(), 1),
(3, 'Organigrama – Tecnología (TI)',     NOW(), 1),
(4, 'Organigrama – Recursos Humanos',   NOW(), 1),
(5, 'Organigrama – Ventas y Marketing', NOW(), 1);

-- =============================================================
-- ORG 1: CORPORATIVO GENERAL (25 nodos, 5 niveles)
-- =============================================================

-- Nivel 0: Director General (PRINCIPAL, padre = 0)
INSERT INTO `DetalleOrganigrama`
  (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`)
VALUES (1, 0, 1001, 1, NOW(), '', 'PRINCIPAL', 0, 50, 600, 200, 100);
SET @g1 = LAST_INSERT_ID();

-- Nivel 1
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g1,1002,1,NOW(),'','EMPLEADO',1,220,200,200,100);
SET @g2 = LAST_INSERT_ID(); -- Subdirector Operaciones
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g1,1003,1,NOW(),'','EMPLEADO',1,220,1000,200,100);
SET @g3 = LAST_INSERT_ID(); -- Subdirector Administrativo

-- Nivel 2: Gerentes
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g2,1007,1,NOW(),'','EMPLEADO',2,400,50,200,100);
SET @g4 = LAST_INSERT_ID(); -- Gerente Planta Norte
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g2,1008,1,NOW(),'','EMPLEADO',2,400,350,200,100);
SET @g5 = LAST_INSERT_ID(); -- Gerente Planta Sur
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g3,1004,1,NOW(),'','EMPLEADO',2,400,700,200,100);
SET @g6 = LAST_INSERT_ID(); -- Gerente TI
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g3,1005,1,NOW(),'','EMPLEADO',2,400,1000,200,100);
SET @g7 = LAST_INSERT_ID(); -- Gerente RRHH
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g3,1006,1,NOW(),'','EMPLEADO',2,400,1300,200,100);
SET @g8 = LAST_INSERT_ID(); -- Gerente Comercial

-- Nivel 3
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g4,1009,1,NOW(),'','EMPLEADO',3,580,50,200,100);
SET @g9  = LAST_INSERT_ID();
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g4,1016,1,NOW(),'','EMPLEADO',3,580,280,200,100);
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g6,1010,1,NOW(),'','EMPLEADO',3,580,700,200,100);
SET @g10 = LAST_INSERT_ID();
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g6,1020,1,NOW(),'','EMPLEADO',3,580,930,200,100);
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g7,1011,1,NOW(),'','EMPLEADO',3,580,1050,200,100);
SET @g11 = LAST_INSERT_ID();
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g7,1021,1,NOW(),'','EMPLEADO',3,580,1270,200,100);
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g8,1012,1,NOW(),'','EMPLEADO',3,580,1350,200,100);
SET @g12 = LAST_INSERT_ID();
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (1,@g8,1025,1,NOW(),'','EMPLEADO',3,580,1570,200,100);

-- Nivel 4
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES
(1,@g9, 1013,1,NOW(),'','EMPLEADO',4,760,50, 200,100),
(1,@g9, 1014,1,NOW(),'','EMPLEADO',4,760,280,200,100),
(1,@g9, 1015,1,NOW(),'','EMPLEADO',4,760,510,200,100),
(1,@g10,1017,1,NOW(),'','EMPLEADO',4,760,600,200,100),
(1,@g10,1018,1,NOW(),'','EMPLEADO',4,760,830,200,100),
(1,@g10,1019,1,NOW(),'','EMPLEADO',4,760,1060,200,100),
(1,@g11,1022,1,NOW(),'','EMPLEADO',4,760,1050,200,100),
(1,@g12,1023,1,NOW(),'','EMPLEADO',4,760,1200,200,100),
(1,@g12,1024,1,NOW(),'','EMPLEADO',4,760,1430,200,100);

-- =============================================================
-- ORG 2: OPERACIONES
-- Jefe: María Salinas (1002, Subdirector Operaciones)
-- =============================================================
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (2,0,1002,1,NOW(),'','PRINCIPAL',0,50,500,200,100);
SET @o1 = LAST_INSERT_ID();

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (2,@o1,1007,1,NOW(),'','EMPLEADO',1,220,200,200,100);
SET @o2 = LAST_INSERT_ID(); -- Gerente Planta Norte
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (2,@o1,1008,1,NOW(),'','EMPLEADO',1,220,700,200,100);
SET @o3 = LAST_INSERT_ID(); -- Gerente Planta Sur

-- Planta Norte
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (2,@o2,1009,1,NOW(),'','EMPLEADO',2,400,50,200,100);
SET @o4 = LAST_INSERT_ID(); -- Supervisor
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (2,@o2,1016,1,NOW(),'','EMPLEADO',2,400,280,200,100); -- Almacenista

-- Planta Sur (comparte supervisor por cercanía operativa)
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (2,@o3,1015,1,NOW(),'','EMPLEADO',2,400,700,200,100); -- Felipe Ramírez

-- Operarios bajo supervisor
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES
(2,@o4,1013,1,NOW(),'','EMPLEADO',3,580,50, 200,100),
(2,@o4,1014,1,NOW(),'','EMPLEADO',3,580,280,200,100);

-- =============================================================
-- ORG 3: TECNOLOGÍA (TI)
-- Jefe: Claudia Ríos (1004, Gerente TI)
-- =============================================================
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (3,0,1004,1,NOW(),'','PRINCIPAL',0,50,500,200,100);
SET @t1 = LAST_INSERT_ID();

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (3,@t1,1010,1,NOW(),'','EMPLEADO',1,220,200,200,100);
SET @t2 = LAST_INSERT_ID(); -- Líder Desarrollo
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (3,@t1,1020,1,NOW(),'','EMPLEADO',1,220,700,200,100); -- Soporte Técnico

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES
(3,@t2,1017,1,NOW(),'','EMPLEADO',2,400,50, 200,100),
(3,@t2,1018,1,NOW(),'','EMPLEADO',2,400,280,200,100),
(3,@t2,1019,1,NOW(),'','EMPLEADO',2,400,510,200,100);

-- =============================================================
-- ORG 4: RECURSOS HUMANOS
-- Jefe: Luis Mendoza (1005, Gerente RRHH)
-- =============================================================
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (4,0,1005,1,NOW(),'','PRINCIPAL',0,50,400,200,100);
SET @r1 = LAST_INSERT_ID();

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (4,@r1,1011,1,NOW(),'','EMPLEADO',1,220,150,200,100);
SET @r2 = LAST_INSERT_ID(); -- Coord. Reclutamiento
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (4,@r1,1021,1,NOW(),'','EMPLEADO',1,220,600,200,100); -- Analista Nómina

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (4,@r2,1022,1,NOW(),'','EMPLEADO',2,400,150,200,100); -- Auxiliar RRHH

-- =============================================================
-- ORG 5: VENTAS Y MARKETING
-- Jefe: Sandra López (1006, Gerente Comercial)
-- =============================================================
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (5,0,1006,1,NOW(),'','PRINCIPAL',0,50,500,200,100);
SET @v1 = LAST_INSERT_ID();

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (5,@v1,1012,1,NOW(),'','EMPLEADO',1,220,300,200,100);
SET @v2 = LAST_INSERT_ID(); -- Ejec. Ventas Senior
INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES (5,@v1,1025,1,NOW(),'','EMPLEADO',1,220,700,200,100); -- Promotor de Marca

INSERT INTO `DetalleOrganigrama` (`idOrganigramas`,`idDetalleOrganigramaPadre`,`NoEmpleadoHijo`,`Status`,`Registro`,`Otros`,`Tipo`,`Nivel`,`CoordenadaY`,`CoordenadaX`,`Ancho`,`Altura`) VALUES
(5,@v2,1023,1,NOW(),'','EMPLEADO',2,400,150,200,100),
(5,@v2,1024,1,NOW(),'','EMPLEADO',2,400,380,200,100);

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;  -- Restaura safe mode

-- =============================================================
-- RESUMEN
-- Org 1 – Corporativo:  25 nodos | 5 niveles
-- Org 2 – Operaciones:   9 nodos | 4 niveles
-- Org 3 – TI:            5 nodos | 3 niveles
-- Org 4 – RRHH:          4 nodos | 3 niveles
-- Org 5 – Ventas:        5 nodos | 3 niveles
-- =============================================================
