ALTER TABLE AvanceActividadPlanA
  ADD COLUMN EstadoAprobacion TINYINT(4) NOT NULL DEFAULT 1 AFTER FechaRegistro,
  ADD COLUMN FechaRevision DATETIME NULL AFTER EstadoAprobacion,
  ADD COLUMN UsuarioRevision INT(11) NULL AFTER FechaRevision,
  ADD COLUMN MotivoRevision TEXT NULL AFTER UsuarioRevision;

UPDATE AvanceActividadPlanA
SET EstadoAprobacion = 1
WHERE EstadoAprobacion IS NULL;
