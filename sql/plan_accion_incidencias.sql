-- ═══════════════════════════════════════════════════════════════════
-- Plan de Acción para Incidencias - Tablas y Stored Procedures
-- ═══════════════════════════════════════════════════════════════════

-- Tabla: Actividades del plan de acción de una incidencia
CREATE TABLE IF NOT EXISTS PlanAccionIncidencias (
  IdPlanAccionInc INT AUTO_INCREMENT PRIMARY KEY,
  IdIncidencia INT NOT NULL,
  Titulo VARCHAR(255) NOT NULL,
  Descripcion TEXT,
  FechaInicio DATE NOT NULL,
  FechaFin DATE NOT NULL,
  Progreso INT DEFAULT 0,
  UsuarioAlta VARCHAR(50) NOT NULL,
  FechaRegistro DATETIME DEFAULT NOW(),
  FOREIGN KEY (IdIncidencia) REFERENCES Incidencias(IdIncidencia)
);

-- Tabla: Registro de avances por actividad
CREATE TABLE IF NOT EXISTS AvancePlanAccionInc (
  IdAvance INT AUTO_INCREMENT PRIMARY KEY,
  IdPlanAccionInc INT NOT NULL,
  NuevoAvance INT NOT NULL,
  DescripcionAvance TEXT NOT NULL,
  FechaRegistro DATETIME DEFAULT NOW(),
  FOREIGN KEY (IdPlanAccionInc) REFERENCES PlanAccionIncidencias(IdPlanAccionInc)
);

-- ═══════════════════════════════════════════════════════════════════
-- SP: Obtener actividades del plan de acción de una incidencia
-- ═══════════════════════════════════════════════════════════════════
DELIMITER //
CREATE PROCEDURE spGetActividadesPlanAccion(IN p_IdIncidencia INT)
BEGIN
  SELECT 
    PA.IdPlanAccionInc,
    PA.Titulo,
    PA.Descripcion,
    PA.FechaInicio,
    PA.FechaFin,
    PA.Progreso,
    PA.UsuarioAlta,
    PA.FechaRegistro,
    E.Nombre AS NombreUsuarioAlta,
    IF(UNIX_TIMESTAMP(PA.FechaFin) < UNIX_TIMESTAMP(CURDATE()) AND PA.Progreso < 100, 1, 0) AS FechaCaduca
  FROM PlanAccionIncidencias PA
  LEFT JOIN Empleados E ON E.NoEmpleado = PA.UsuarioAlta
  WHERE PA.IdIncidencia = p_IdIncidencia
  ORDER BY PA.FechaRegistro ASC;
END //
DELIMITER ;

-- ═══════════════════════════════════════════════════════════════════
-- SP: Agregar actividad al plan de acción
-- ═══════════════════════════════════════════════════════════════════
DELIMITER //
CREATE PROCEDURE spAddActividadPlanAccion(
  IN p_IdIncidencia INT,
  IN p_Titulo VARCHAR(255),
  IN p_Descripcion TEXT,
  IN p_FechaInicio DATE,
  IN p_FechaFin DATE,
  IN p_UsuarioAlta VARCHAR(50)
)
BEGIN
  INSERT INTO PlanAccionIncidencias (IdIncidencia, Titulo, Descripcion, FechaInicio, FechaFin, UsuarioAlta)
  VALUES (p_IdIncidencia, p_Titulo, p_Descripcion, p_FechaInicio, p_FechaFin, p_UsuarioAlta);
  
  SELECT LAST_INSERT_ID() AS IdReturn;
END //
DELIMITER ;

-- ═══════════════════════════════════════════════════════════════════
-- SP: Agregar avance a una actividad
-- ═══════════════════════════════════════════════════════════════════
DELIMITER //
CREATE PROCEDURE spAddAvancePlanAccionInc(
  IN p_IdPlanAccionInc INT,
  IN p_NuevoAvance INT,
  IN p_DescripcionAvance TEXT
)
BEGIN
  DECLARE v_ProgresoActual INT;
  
  SELECT Progreso INTO v_ProgresoActual 
  FROM PlanAccionIncidencias 
  WHERE IdPlanAccionInc = p_IdPlanAccionInc;
  
  IF p_NuevoAvance < v_ProgresoActual THEN
    SELECT 0 AS Retorno, 'El nuevo avance no puede ser menor al avance actual' AS MsgReturn;
  ELSEIF p_NuevoAvance > 100 THEN
    SELECT 0 AS Retorno, 'El avance no puede ser mayor a 100%' AS MsgReturn;
  ELSE
    INSERT INTO AvancePlanAccionInc (IdPlanAccionInc, NuevoAvance, DescripcionAvance)
    VALUES (p_IdPlanAccionInc, p_NuevoAvance, p_DescripcionAvance);
    
    UPDATE PlanAccionIncidencias 
    SET Progreso = p_NuevoAvance 
    WHERE IdPlanAccionInc = p_IdPlanAccionInc;
    
    SELECT 1 AS Retorno, 'Avance registrado correctamente' AS MsgReturn;
  END IF;
END //
DELIMITER ;

-- ═══════════════════════════════════════════════════════════════════
-- SP: Obtener avances de una actividad
-- ═══════════════════════════════════════════════════════════════════
DELIMITER //
CREATE PROCEDURE spGetAvancesActividad(IN p_IdPlanAccionInc INT)
BEGIN
  SELECT 
    NuevoAvance,
    DescripcionAvance,
    DATE_FORMAT(FechaRegistro, '%d/%m/%Y %H:%i') AS FechaRegistro
  FROM AvancePlanAccionInc
  WHERE IdPlanAccionInc = p_IdPlanAccionInc
  ORDER BY FechaRegistro DESC;
END //
DELIMITER ;

-- ═══════════════════════════════════════════════════════════════════
-- SP: Obtener info de la incidencia para encabezado del plan
-- ═══════════════════════════════════════════════════════════════════
DELIMITER //
CREATE PROCEDURE spGetInfoIncidenciaPlan(IN p_IdIncidencia INT)
BEGIN
  SELECT 
    I.IdIncidencia,
    I.Descripcion,
    I.Estado,
    I.FechaRegistro,
    E.Nombre AS NombreEmpleado,
    P.Puesto,
    COALESCE(TI.Nombre, 'Sin tipo') AS TipoIncidencia,
    (SELECT COUNT(*) FROM PlanAccionIncidencias WHERE IdIncidencia = p_IdIncidencia) AS TotalActividades,
    (SELECT COUNT(*) FROM PlanAccionIncidencias WHERE IdIncidencia = p_IdIncidencia AND Progreso = 100) AS ActividadesCompletadas
  FROM Incidencias I
  INNER JOIN Empleados E ON E.NoEmpleado = I.NoEmpleado
  LEFT JOIN Puestos P ON P.IdPuesto = E.IdPuesto
  LEFT JOIN Tipos_Incidencias TI ON TI.IdTipoIncidencia = I.IdTipoIncidencia
  WHERE I.IdIncidencia = p_IdIncidencia;
END //
DELIMITER ;
