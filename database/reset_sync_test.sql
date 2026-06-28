-- =====================================================
-- Reset de pruebas del Sincronizador RH
--
-- !! SOLO correr contra klynet_datosdemo (BD de pruebas). NUNCA contra
-- !! klynet_datos (producción real). Verifica el nombre de la BD en el
-- !! comando antes de ejecutar.
--
-- Uso: correr cada vez que quieras "empezar de cero" mientras pruebas.
-- Seguridad: solo borra filas creadas POR EL SINCRONIZADOR (vía SyncMapeoOrigen).
--            Nunca toca los empleados/puestos/etc. que ya existían antes
--            de usar el módulo (esos jamás tienen fila en SyncMapeoOrigen).
--
--   mysql -h 162.240.213.3 -u klynet_usrdatosdemo -p klynet_datosdemo < database/reset_sync_test.sql
-- =====================================================

-- 1. Jerarquía creada por el sync
DELETE FROM RelacionEmpleados
WHERE EmpleadoHijo IN (SELECT id_local FROM SyncMapeoOrigen WHERE entidad = 'EMPLEADO');

-- 2. Empleados creados por el sync
DELETE FROM Empleados
WHERE NoEmpleado IN (SELECT id_local FROM SyncMapeoOrigen WHERE entidad = 'EMPLEADO');

-- 3. Permisos de menú sembrados para puestos creados por el sync
DELETE FROM MenusPermisos
WHERE IdPuesto IN (SELECT id_local FROM SyncMapeoOrigen WHERE entidad = 'TIPO_PUESTO');

-- 4. Puestos creados por el sync
DELETE FROM Puestos
WHERE IdPuesto IN (SELECT id_local FROM SyncMapeoOrigen WHERE entidad = 'TIPO_PUESTO');

-- 5. Sucursales creadas por el sync
DELETE FROM SucursalDepto
WHERE IdSucursal IN (SELECT id_local FROM SyncMapeoOrigen WHERE entidad = 'SUCURSAL');

-- 6. Áreas (divisiones) creadas por el sync
DELETE FROM Divisiones
WHERE IdDivision IN (SELECT id_local FROM SyncMapeoOrigen WHERE entidad = 'AREA');

-- 7. Limpia el mapeo y el estado/bitácora de control
TRUNCATE TABLE SyncMapeoOrigen;
TRUNCATE TABLE SyncEstado;
TRUNCATE TABLE SyncBitacoraDetalle;
TRUNCATE TABLE SyncBitacora;

-- 8. Deja los servidores como "nunca sincronizados"
UPDATE SyncServidores SET ultima_sync = NULL WHERE id_servidor IS NOT NULL;
