-- =====================================================
-- Truncado COMPLETO para pruebas (klynet_datosdemo)
--
-- !! SOLO correr contra klynet_datosdemo (BD de pruebas). NUNCA contra
-- !! klynet_datos (producción real, tiene ~2207 empleados reales).
-- !! Verifica el nombre de la BD en el comando antes de ejecutar.
--
-- Borra TODOS los empleados, puestos, divisiones y sucursales,
-- dejando vivo únicamente al usuario dev NoEmpleado=99999.
-- La sincronización repoblará todo desde PIP desde cero.
--
--   mysql -h 162.240.213.3 -u klynet_usrdatosdemo -p klynet_datosdemo < database/truncate_full_test.sql
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM Empleados WHERE NoEmpleado <> 99999;
TRUNCATE TABLE RelacionEmpleados;
TRUNCATE TABLE MenusPermisos;
TRUNCATE TABLE Puestos;
TRUNCATE TABLE Divisiones;
TRUNCATE TABLE SucursalDepto;

-- Tablas de control del sincronizador: limpias para empezar de cero
TRUNCATE TABLE SyncMapeoOrigen;
TRUNCATE TABLE SyncEstado;
TRUNCATE TABLE SyncBitacoraDetalle;
TRUNCATE TABLE SyncBitacora;
UPDATE SyncServidores SET ultima_sync = NULL WHERE id_servidor IS NOT NULL;

-- Placeholders mínimos para que 99999 conserve FKs válidas
INSERT INTO Divisiones (IdDivision, Division) VALUES (1, 'Operaciones');
INSERT INTO SucursalDepto (IdSucursal, Sucursal, IdDivision) VALUES (1, 'CONSTITUCION', 1);
INSERT INTO Puestos (IdPuesto, Puesto, IdDivision, Nivel) VALUES (0, 'RESOSISTEMAS', 1, 0);
UPDATE Empleados SET IdDivision=1, IdSucursal=1, IdPuesto=0, IdCentroCosto=0, Nivel=0, Status=1
WHERE NoEmpleado=99999;

SET FOREIGN_KEY_CHECKS = 1;
