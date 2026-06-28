-- =====================================================
-- Script de Migración: Módulo Sincronizador RH (PIP -> Intranet)
-- Fecha: 2026-06-27
-- Propósito: Tablas de remapeo, catálogo de niveles, plantillas de
--            menús por nivel y configuración de servidores PIP.
-- Plan: docs/PLAN_SINCRONIZADOR_RH.md
-- =====================================================

-- 1. REMAPEO ORIGEN -> LOCAL (núcleo de idempotencia)
CREATE TABLE IF NOT EXISTS `SyncMapeoOrigen` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `servidor`         VARCHAR(10)  NOT NULL COMMENT 'iD_SERVIDOR ("1","2"...)',
  `entidad`          VARCHAR(20)  NOT NULL COMMENT 'SUCURSAL|AREA|TIPO_PUESTO|EMPLEADO',
  `id_origen`        INT          NOT NULL COMMENT 'id en PIP',
  `id_local`         INT          NOT NULL COMMENT 'PK en tabla destino',
  `area_origen`      INT          NULL     COMMENT 'solo TIPO_PUESTO: id área padre',
  `fecha_mod_origen` DATETIME     NULL,
  `registro`         DATETIME     NOT NULL,
  `actualizado`      DATETIME     NOT NULL,
  UNIQUE KEY `uq_origen` (`servidor`, `entidad`, `id_origen`),
  UNIQUE KEY `uq_local`  (`entidad`, `id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. CATÁLOGO DE NIVELES
CREATE TABLE IF NOT EXISTS `Niveles` (
  `IdNivel`     INT PRIMARY KEY,
  `Descripcion` VARCHAR(60),
  `EsAdmin`     TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `Niveles` (`IdNivel`,`Descripcion`,`EsAdmin`) VALUES
  (0,'Sistemas',1),
  (1,'Dirección',1),
  (2,'Gerencia',1),
  (3,'Subgerencia',0),
  (4,'Jefatura / Encargado',0),
  (5,'Coordinación',0),
  (6,'Especializado',0),
  (7,'Técnico',0),
  (8,'Operativo',0);

-- 3. PLANTILLA DE MENÚS POR NIVEL (auto-siembra MenusPermisos al crear un puesto)
CREATE TABLE IF NOT EXISTS `PlantillaMenusNivel` (
  `IdNivel` INT NOT NULL,
  `id_menu` INT NOT NULL,
  PRIMARY KEY (`IdNivel`,`id_menu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Base obligatoria (niveles 6,7,8 = Operativo):
-- Principal, Organigrama, Capacitación, Salud, Vacaciones, Línea de ética, Directorio,
-- Aplicación de Evaluaciones (360/dirigidas), Mis resultados, Planes de Acción,
-- Mis Planes de acción. (Checklist se responde en index.php y el perfil en MiPerfil.php/
-- index.php: ambos ya están en la whitelist de páginas libres de autorizaPermisoPagina,
-- no requieren fila en MenusPermisos). Filtrado contra `menus` para tolerar catálogos
-- distintos entre ambientes (producción/demo).
INSERT IGNORE INTO `PlantillaMenusNivel` (`IdNivel`,`id_menu`)
SELECT n.IdNivel, m.id_menu
FROM (SELECT 6 AS IdNivel UNION SELECT 7 UNION SELECT 8) n
CROSS JOIN (SELECT 1 AS id_menu UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 9 UNION SELECT 25 UNION SELECT 31
            UNION SELECT 32 UNION SELECT 34) m
WHERE m.id_menu IN (SELECT id_menu FROM `menus`);

-- Mando medio (niveles 3,4,5) = base + Mis Subordinados + Evaluaciones (lectura)
INSERT IGNORE INTO `PlantillaMenusNivel` (`IdNivel`,`id_menu`)
SELECT n.IdNivel, m.id_menu
FROM (SELECT 3 AS IdNivel UNION SELECT 4 UNION SELECT 5) n
CROSS JOIN (SELECT 1 AS id_menu UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
            UNION SELECT 6 UNION SELECT 7 UNION SELECT 9 UNION SELECT 25 UNION SELECT 31
            UNION SELECT 32 UNION SELECT 34 UNION SELECT 33 UNION SELECT 10 UNION SELECT 13
            UNION SELECT 26) m
WHERE m.id_menu IN (SELECT id_menu FROM `menus`);

-- Admin (niveles 0,1,2) = todos los menús existentes
INSERT IGNORE INTO `PlantillaMenusNivel` (`IdNivel`,`id_menu`)
SELECT n.IdNivel, m.id_menu
FROM (SELECT 0 AS IdNivel UNION SELECT 1 UNION SELECT 2) n
CROSS JOIN (SELECT id_menu FROM `menus`) m;

-- 4. CONFIG DE SERVIDORES PIP
CREATE TABLE IF NOT EXISTS `SyncServidores` (
  `id_servidor` VARCHAR(10) PRIMARY KEY COMMENT 'iD_SERVIDOR del API',
  `nombre`      VARCHAR(60),
  `base_url`    VARCHAR(120) COMMENT 'sin slash final, ej: https://luguito.com:8560',
  `activo`      TINYINT(1) DEFAULT 1,
  `ultima_sync` DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `SyncServidores` (`id_servidor`,`nombre`,`base_url`,`activo`) VALUES
  ('2','MADERO',   'https://luguito.com:8560',1),
  ('1','MATAMOROS','https://luguito.com:8460',1);

-- 5. ALTERACIÓN: nivel por puesto (deriva Empleados.Nivel)
ALTER TABLE `Puestos` ADD COLUMN `Nivel` INT NOT NULL DEFAULT 8;

-- 6. Centro de costo placeholder (Empleados.IdCentroCosto es NOT NULL; el API no lo entrega)
INSERT IGNORE INTO `CentroCostos` (`IdCentroCosto`,`CentrodeCosto`) VALUES (0,'SIN ASIGNAR');
