-- ==============================================================================
-- SCRIPT DE DATOS MOCK PARA BOLSA DE TRABAJO IBERO (DEMOSTRACIÓN)
-- ==============================================================================
-- Este script inserta datos ficticios para poder probar las vistas de:
-- Vacantes, Base de Candidatos, Detalles y Comparativa de Resultados.
-- ¡CORREGIDO PARA ADAPTARSE A LOS NOMBRES EXACTOS DEL ESQUEMA!
-- ==============================================================================

-- 1. Insertar Vacantes de Prueba
INSERT INTO VacantesIbero (IdVacante, NombreVacante, IdAreaTecnica, IdSucursal, DescripcionPuesto, Estatus, FechaApertura, Publicada)
VALUES 
(1, 'Desarrollador Full Stack Jr.', 1, 1, 'Vacante para un desarrollador con experiencia en PHP y JS.', 2, CURRENT_DATE, 1),
(2, 'Coordinador de Recursos Humanos', 2, 1, 'Coordinación de reclutamiento y selección en sede principal.', 2, CURRENT_DATE, 1);

-- 2. Insertar Procesos de Selección (Opcional, si no están ya en el schema)
INSERT IGNORE INTO ProcesosVacantesIbero (IdProceso, NombreProceso, Descripcion, Estatus)
VALUES 
(1, 'Revisión de Documentos', 'Verificación inicial de CV y solicitud', 1),
(2, 'Entrevista Recursos Humanos', 'Entrevista con el área de RH', 1),
(3, 'Entrevista con Área', 'Entrevista técnica con jefe directo', 1),
(4, 'Evaluación Psicométrica', 'Aplicación de pruebas psicométricas', 1);

-- 3. Insertar Postulantes (Candidatos)
INSERT INTO PostulantesIbero (IdPostulante, Nombre, ApellidoPaterno, ApellidoMaterno, CURP, Telefono, CorreoElectronico, Estado, Ciudad, FechaRegistro)
VALUES 
(1, 'Ana', 'García', 'López', 'GALA900101HDFRXY01', '5511223344', 'ana.garcia@email.com', 'CDMX', 'Cuauhtémoc', DATE_SUB(CURRENT_DATE, INTERVAL 10 DAY)),
(2, 'Carlos', 'Martínez', 'Ruiz', 'MARC920512HDFRXZ02', '5522334455', 'carlos.mtz@email.com', 'CDMX', 'Benito Juárez', DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),
(3, 'Sofía', 'Hernández', 'Díaz', 'HEDS950820MDFRXY03', '5533445566', 'sofia.h@email.com', 'Edomex', 'Naucalpan', DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),
(4, 'Luis', 'Pérez', 'Gómez', 'PEGL881130HDFRXY04', '5544556677', 'luis.perez@email.com', 'CDMX', 'Miguel Hidalgo', DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)),
(5, 'María', 'Fernández', 'Torres', 'FETM940214MDFRXY05', '5555667788', 'maria.ft@email.com', 'Edomex', 'Tlalnepantla', DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY));

-- 4. Postular candidatos a las vacantes (IdVacante 1 = Dev, IdVacante 2 = RH)
INSERT INTO PostulantesVacantesIbero (IdPostulanteVacante, IdVacante, IdPostulante, EstatusPostulacion, FechaPostulacion)
VALUES 
(1, 1, 1, 1, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)), -- Ana a Dev (En proceso)
(2, 1, 2, 2, DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)), -- Carlos a Dev (Aceptado)
(3, 1, 3, 3, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)), -- Sofia a Dev (Descartado)
(4, 2, 4, 1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)), -- Luis a RH (En proceso)
(5, 2, 5, 1, DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY)); -- Maria a RH (En proceso)

-- 5. Historial de Procesos de los Postulantes
INSERT INTO PostulantesHistorialIbero (IdHistorial, IdPostulanteVacante, IdProceso, Observaciones, Resultado, Fecha)
VALUES 
(1, 1, 1, 'CV cumple los requisitos', 1, DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),
(2, 1, 3, 'Entrevista técnica promedio', 1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(3, 2, 1, 'Excelente perfil', 1, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),
(4, 2, 3, 'Muy buena entrevista técnica, domina PHP', 1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)),
(5, 2, 4, 'Psicometría satisfactoria', 1, DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY)),
(6, 3, 1, 'Falta experiencia requerida', 0, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(7, 4, 1, 'Apto para el puesto', 1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
(8, 5, 1, 'En revisión inicial', 1, DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY));

-- 6. Insertar Evaluaciones
INSERT INTO EvaluacionesIbero (idEvaluaciones, Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, DirigidoA)
VALUES 
(1, 'Prueba de Conocimientos PHP & SQL', 2, DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY), DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY), 1, 2),
(2, 'Prueba Psicométrica y Lógica', 2, DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY), DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY), 1, 2);

-- 7. Preguntas para Evaluaciones
INSERT INTO PreguntasEvaluacionIbero (idPreguntasEvaluacion, idEvaluaciones, Titulo, Orden, idTipoPregunta)
VALUES 
-- Preguntas de Evaluación PHP (1)
(1, 1, '¿Qué función en PHP se usa para insertar elementos al final de un arreglo?', 1, 2), -- Opción múltiple (idTipo 2)
(2, 1, 'PHP es un lenguaje que se ejecuta del lado del cliente (Frontend).', 2, 1), -- Verdadero / Falso (idTipo 1)
(3, 1, 'Del 1 al 10, ¿Cómo evaluarías tu nivel de experiencia escribiendo consultas SQL con JOINs complejos?', 3, 3), -- Rango (idTipo 3)
-- Preguntas Psicométricas (2)
(4, 2, '¿Qué figura sigue en la secuencia: Triángulo, Cuadrado, Pentágono...?', 1, 2), -- Opción múltiple
(5, 2, 'Me adapto fácilmente a cambios drásticos de última hora en mis proyectos.', 2, 1); -- V/F

-- Opciones de respuesta para las de opción múltiple
INSERT INTO PreguntasPosiblesRespuestasIbero (idPreguntasPosiblesRespuestas, idPreguntasEvaluacion, DescripcionRespuesta)
VALUES 
(1, 1, 'array_push()'),
(2, 1, 'array_pop()'),
(3, 1, 'array_unshift()'),
(4, 4, 'Hexágono'),
(5, 4, 'Círculo'),
(6, 4, 'Estrella');

-- Configuraciones de respuestas correctas (y de rango)
INSERT INTO PreguntasConfiguracionIbero (idPreguntasConfiguracion, idPreguntasEvaluacion, RespuestaCorrectaOM, BoolCorreta, RangoInicial, RangoFinal)
VALUES 
(1, 1, 1, NULL, NULL, NULL), -- array_push() es correcta (id=1)
(2, 2, NULL, 0, NULL, NULL), -- PHP es backend (Falso=0)
(3, 3, NULL, NULL, 1, 10),   -- Rango 1 a 10
(4, 4, 4, NULL, NULL, NULL), -- Hexágono (id=4)
(5, 5, NULL, 1, NULL, NULL); -- Verdadero (para psicometría)

-- 8. Asignar Evaluaciones a los Postulantes y darles calificación
INSERT INTO PostulantesEvaluacionesIbero (IdPostulanteEvaluacion, IdPostulanteVacante, IdVacanteEvaluacion, EstatusEvaluacion, Calificacion)
VALUES 
(1, 1, 1, 3, 66.67), -- Ana, Evaluacion PHP (Completada, Calificación regular)
(2, 1, 2, 3, 100.00),-- Ana, Evaluacion Psicométrica (Completada, 100)
(3, 2, 1, 3, 100.00),-- Carlos, Eval PHP (Completada, 100)
(4, 2, 2, 3, 100.00),-- Carlos, Eval Psicométrica (Completada, 100)
(5, 3, 1, 2, NULL),  -- Sofia, Eval PHP (En Progreso)
(6, 4, 2, 3, 50.00); -- Luis, Eval Psicométrica (Completada, 50)

-- 9. Insertar algunas respuestas para simular el detalle
-- (La tabla es PostulantesRespuestasIbero. El código espera el ID de la opción o el booleano en el texto JSON, pero simularemos directo en la tabla si tiene las columnas, voy a ver el schema)
-- El schema de PostulantesRespuestasIbero es: IdRespuesta, IdPostulanteEvaluacion, IdPreguntasEvaluacion, Respuesta (texto)
INSERT INTO PostulantesRespuestasIbero (IdRespuesta, IdPostulanteEvaluacion, IdPreguntasEvaluacion, Respuesta)
VALUES 
-- Ana (Evaluacion 1 - PHP) -> Falla en el array_push (saca 66%)
(1, 1, 1, '2'), -- Contestó array_pop() [Mal]
(2, 1, 2, '0'), -- Contestó Falso [Bien]
(3, 1, 3, '8'), -- Rango 8 [Bien]
-- Carlos (Evaluacion 1 - PHP) -> Todo perfecto (100%)
(4, 3, 1, '1'), -- Contestó array_push() [Bien]
(5, 3, 2, '0'), -- Contestó Falso [Bien]
(6, 3, 3, '10'); -- Rango 10 [Bien]
