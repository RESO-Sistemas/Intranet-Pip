-- ==============================================================================
-- SCRIPT DE DATOS MOCK PARA BOLSA DE TRABAJO IBERO (DEMOSTRACIÓN)
-- ==============================================================================
-- Datos ficticios distribuidos entre las 3 empresas:
--   IdEmpresa = 1 → Universidad Iberoamericana
--   IdEmpresa = 2 → Grupo Lala
--   IdEmpresa = 3 → Industrias Peñoles
-- Ejecutar después de ibero_schema.sql (que ya inserta las EmpresasIbero).
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar tablas en orden inverso de dependencias
TRUNCATE TABLE PostulantesRespuestasIbero;
TRUNCATE TABLE PostulantesEvaluacionesIbero;
TRUNCATE TABLE PostulantesHistorialIbero;
TRUNCATE TABLE PostulantesRequisitosIbero;
TRUNCATE TABLE PostulantesVacantesIbero;
TRUNCATE TABLE PostulantesIbero;
TRUNCATE TABLE PreguntasConfiguracionIbero;
TRUNCATE TABLE PreguntasPosiblesRespuestasIbero;
TRUNCATE TABLE PreguntasEvaluacionIbero;
TRUNCATE TABLE EvaluacionesIbero;
TRUNCATE TABLE VacantesEvaluacionesIbero;
TRUNCATE TABLE VacantesRequisitosIbero;
TRUNCATE TABLE VacantesIbero;
TRUNCATE TABLE CompetenciasIbero;

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- 1. ÁREAS TÉCNICAS ADICIONALES (PARA PEÑOLES Y LALA)
-- ==============================================================================
INSERT INTO `AreasTecnicasIbero` (`NombreArea`, `Descripcion`) VALUES
('Ingeniería de Minas', 'Operaciones extractivas y planeación minera'),
('Mantenimiento Industrial', 'Mantenimiento preventivo y correctivo de planta'),
('Seguridad e Higiene', 'Seguridad industrial y salud ocupacional'),
('Laboratorio y Calidad', 'Análisis químico y control de procesos'),
('Operaciones Logísticas', 'Gestión de cadena de suministro y transporte');

-- ==============================================================================
-- 2. VACANTES POR EMPRESA
-- ==============================================================================
-- IdEmpresa 1 = Universidad Iberoamericana
-- IdEmpresa 2 = Grupo Lala
-- IdEmpresa 3 = Industrias Peñoles

INSERT INTO VacantesIbero
    (IdVacante, NombreVacante, IdAreaTecnica, IdEmpresa, TipoContratacion, DescripcionPuesto,
     SalarioMinimo, SalarioMaximo, Estatus, FechaApertura, Publicada, BanderaCV, BanderaSE)
VALUES
-- Universidad Iberoamericana (IdEmpresa=1)
(1, 'Desarrollador Full Stack Jr.', 1, 1, 'Tiempo completo',
 'Desarrollo y mantenimiento de sistemas internos universitarios usando PHP, MySQL y JavaScript.',
 15000, 22000, 2, CURRENT_DATE, 1, 1, 0),

(2, 'Coordinador de Recursos Humanos', 2, 1, 'Tiempo completo',
 'Gestión del proceso de reclutamiento, selección y capacitación del personal administrativo.',
 18000, 25000, 2, CURRENT_DATE, 1, 1, 1),

(3, 'Analista Financiero', 3, 1, 'Tiempo completo',
 'Análisis de presupuestos, control de costos y elaboración de reportes financieros institucionales.',
 20000, 28000, 1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY), 0, 1, 0),

-- Grupo Lala (IdEmpresa=2)
(4, 'Supervisor de Producción Láctea', 7, 2, 'Tiempo completo',
 'Supervisar las líneas de producción de lácteos, asegurar calidad y eficiencia operativa en planta.',
 22000, 32000, 2, DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY), 1, 1, 0),

(5, 'Técnico de Mantenimiento Industrial', 7, 2, 'Tiempo completo',
 'Mantenimiento preventivo y correctivo de maquinaria en planta de producción.',
 16000, 20000, 2, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY), 1, 0, 1),

(6, 'Analista de Cadena de Suministro', 10, 2, 'Tiempo completo',
 'Optimización de la cadena de abastecimiento, control de inventarios y relación con proveedores.',
 18000, 26000, 2, DATE_SUB(CURRENT_DATE, INTERVAL 10 DAY), 1, 1, 0),

-- Industrias Peñoles (IdEmpresa=3)
(7, 'Ingeniero de Minas Jr.', 6, 3, 'Tiempo completo',
 'Planificación y supervisión de operaciones de extracción mineral bajo estándares de seguridad.',
 25000, 35000, 2, DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY), 1, 1, 1),

(8, 'Químico de Laboratorio', 9, 3, 'Tiempo completo',
 'Análisis de muestras de minerales, control de calidad y generación de reportes técnicos.',
 18000, 24000, 2, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY), 1, 1, 0),

(9, 'Especialista en Seguridad Industrial', 8, 3, 'Medio tiempo',
 'Implementación y seguimiento de programas de seguridad e higiene en instalaciones mineras.',
 12000, 16000, 3, DATE_SUB(CURRENT_DATE, INTERVAL 20 DAY), 0, 0, 0);

-- ==============================================================================
-- 1A. COMPETENCIAS
-- ==============================================================================
INSERT INTO CompetenciasIbero (idCompetencias, Competencia, Significado, Estatus, TipoCompetencia, DescripcionA, DescripcionB, DescripcionC, DescripcionD, DescripcionE)
VALUES
(1, 'Comunicación', 'Es la capacidad de escuchar, hacer preguntas, expresar conceptos e ideas en forma efectiva, exponer aspectos positivos. La habilidad de saber cuándo y a quién preguntar para llevar adelante un propósito.', 1, 1,
'Comunica sus ideas en forma clara, eficiente, y fluida logrando que su audiencia entienda su mensaje, e impactándolos en el sentido que desea. Expresa a sus colaboradores claramente los objetivos y estrategias organizacionales.',
'Escucha al otro poniéndose en su lugar para comprender lo que está pensando. Transmite sus mensajes e ideas claramente en todos los niveles de la empresa. Se preocupa porque sus mensajes hayan sido claros y comprendidos.',
'Mantiene a sus colaboradores al tanto de sus responsabilidades y objetivos, informándolos del estado de avance de las tareas del equipo. Transmite adecuadamente sus ideas tanto por escrito como verbalmente.',
'Comparte información con sus colaboradores cuando la necesitan para desempeñar una tarea. Es capaz de expresar sus ideas verbalmente cuando se le pregunta directamente.',
'No comparte información que para otros puede ser relevante. Tiene grandes dificultades para transmitir ideas y comunicar mensajes, expresándose con ambigüedad o vaguedad.'),

(2, 'Adaptabilidad', 'Es la capacidad para adaptarse y avenirse a los cambios, modificando si fuese necesario su propia conducta para alcanzar determinados objetivos cuando surgen dificultades.', 1, 1,
'Tiene una amplia visión del mercado y del negocio que le permite anticiparse en la comprensión de los cambios. Comprende y valora puntos de vista y criterios diversos.',
'Está atento a los cambios de contexto, y modifica los objetivos o proyectos, de acuerdo con las nuevas necesidades de la organización. Se adapta con versatilidad a distintos contextos.',
'Comprende rápidamente las nuevas necesidades que se generan internamente. Tiene habilidad para generar respuestas nuevas o adaptar soluciones conocidas, a nuevas situaciones.',
'Percibe los cambios de situación o contexto, con mayor facilidad en la medida que sean más cercanos. Puede adaptar su accionar si recibe feedback adecuado.',
'Tiene dificultad para comprender los cambios de contexto. Le falta disposición para adaptarse a situaciones, medios, personas, contextos o ámbitos cambiantes.'),

(3, 'Calidad del Trabajo', 'Implica tener amplios conocimientos de los temas del área que esté bajo su responsabilidad. Poseer la capacidad de comprender la esencia de los aspectos complejos.', 1, 3,
'Posee amplio conocimiento del mercado, del negocio y de sus áreas, y comparte su visión y conocimiento con sus subordinados. Genera soluciones prácticas y operables.',
'Genera mecanismos de intercambio y aprovechamiento del conocimiento y expertise de cada miembro del equipo. Elabora e implementa soluciones prácticas y operables.',
'Elabora e implementa soluciones prácticas y operables en beneficio de clientes internos y externos. Es reconocido como experto en su área de especialidad.',
'Trabaja con altos estándares de calidad y resultados. Se mantiene informado y capacitado, con el fin de poder actuar con alta eficacia.',
'Tiene una mínima visión y conocimiento de los objetivos y desafíos. Obstaculiza, con su accionar, el desarrollo de las capacidades de sus colaboradores.');

-- ==============================================================================
-- 2. PROCESOS DE SELECCIÓN
-- ==============================================================================
INSERT IGNORE INTO ProcesosVacantesIbero (IdProceso, NombreProceso, Descripcion, Estatus)
VALUES
(1, 'Revisión de Documentos', 'Verificación inicial de CV y solicitud', 1),
(2, 'Entrevista Recursos Humanos', 'Entrevista con el área de RH', 1),
(3, 'Entrevista con Área', 'Entrevista técnica con jefe directo', 1),
(4, 'Evaluación Psicométrica', 'Aplicación de pruebas psicométricas', 1),
(5, 'Oferta Económica', 'Presentación y negociación de oferta', 1),
(6, 'Contratación', 'Proceso de alta y firma de contrato', 1);

-- ==============================================================================
-- 3. POSTULANTES (CANDIDATOS)
-- ==============================================================================
INSERT INTO PostulantesIbero
    (IdPostulante, Nombre, ApellidoPaterno, ApellidoMaterno, CURP, Telefono,
     CorreoElectronico, Estado, Ciudad, FechaRegistro)
VALUES
(1,  'Ana',      'García',    'López',    'GALA900101HDFRXY01', '5511223344', 'ana.garcia@email.com',     'CDMX',    'Cuauhtémoc',    DATE_SUB(CURRENT_DATE, INTERVAL 15 DAY)),
(2,  'Carlos',   'Martínez',  'Ruiz',     'MARC920512HDFRXZ02', '5522334455', 'carlos.mtz@email.com',     'CDMX',    'Benito Juárez', DATE_SUB(CURRENT_DATE, INTERVAL 14 DAY)),
(3,  'Sofía',    'Hernández', 'Díaz',     'HEDS950820MDFRXY03', '5533445566', 'sofia.h@email.com',        'Edomex',  'Naucalpan',     DATE_SUB(CURRENT_DATE, INTERVAL 12 DAY)),
(4,  'Luis',     'Pérez',     'Gómez',    'PEGL881130HDFRXY04', '5544556677', 'luis.perez@email.com',     'CDMX',    'Miguel Hidalgo',DATE_SUB(CURRENT_DATE, INTERVAL 10 DAY)),
(5,  'María',    'Fernández', 'Torres',   'FETM940214MDFRXY05', '5555667788', 'maria.ft@email.com',       'Edomex',  'Tlalnepantla',  DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)),
(6,  'Roberto',  'Salinas',   'Cruz',     'SACR870305HDFRXY06', '5566778899', 'roberto.salinas@email.com','Jalisco', 'Guadalajara',   DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),
(7,  'Valeria',  'Ramos',     'Mendoza',  'RAMV000718MDFRXY07', '5577889900', 'valeria.rm@email.com',     'NL',      'Monterrey',     DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),
(8,  'Diego',    'Luna',      'Vargas',   'LUVD960922HDFRXY08', '5588990011', 'diego.luna@email.com',     'Chihuahua','Chihuahua',    DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(9,  'Paola',    'Morales',   'Reyes',    'MORP010430MDFRXY09', '5599001122', 'paola.m@email.com',        'CDMX',    'Iztapalapa',    DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
(10, 'Andrés',   'Castro',    'Jiménez',  'CAJA930615HDFRXY10', '5500112233', 'andres.cj@email.com',      'Zacatecas','Fresnillo',   DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY));

-- ==============================================================================
-- 4. POSTULACIONES POR VACANTE
-- ==============================================================================
-- Vacante 1 (Dev, Ibero): Ana, Carlos, Sofía
-- Vacante 2 (RH, Ibero): Luis, María
-- Vacante 4 (Supervisor Lala): Roberto, Valeria
-- Vacante 5 (Técnico Lala): Diego
-- Vacante 6 (Suministro Lala): Paola
-- Vacante 7 (Ingeniero Peñoles): Andrés, Diego
-- Vacante 8 (Químico Peñoles): Paola, Valeria

INSERT INTO PostulantesVacantesIbero
    (IdPostulanteVacante, IdVacante, IdPostulante, EstatusPostulacion, FechaPostulacion)
VALUES
-- Vacante 1 — Desarrollador Full Stack Jr. (Ibero)
(1,  1, 1, 1, DATE_SUB(CURRENT_DATE, INTERVAL 13 DAY)),  -- Ana → En Proceso
(2,  1, 2, 2, DATE_SUB(CURRENT_DATE, INTERVAL 12 DAY)),  -- Carlos → Aceptado
(3,  1, 3, 3, DATE_SUB(CURRENT_DATE, INTERVAL 11 DAY)),  -- Sofía → Descartado

-- Vacante 2 — Coordinador RH (Ibero)
(4,  2, 4, 1, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)),   -- Luis → En Proceso
(5,  2, 5, 1, DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),   -- María → En Proceso

-- Vacante 4 — Supervisor Producción (Lala)
(6,  4, 6, 2, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),   -- Roberto → Aceptado
(7,  4, 7, 1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),   -- Valeria → En Proceso

-- Vacante 5 — Técnico Mantenimiento (Lala)
(8,  5, 8, 1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)),   -- Diego → En Proceso

-- Vacante 6 — Analista Cadena Suministro (Lala)
(9,  6, 9, 3, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)),   -- Paola → Descartado

-- Vacante 7 — Ingeniero Minas (Peñoles)
(10, 7, 10, 1, DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY)),  -- Andrés → En Proceso
(11, 7, 8,  1, DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY)),  -- Diego → En Proceso

-- Vacante 8 — Químico Laboratorio (Peñoles)
(12, 8, 9,  2, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)),  -- Paola → Aceptado
(13, 8, 7,  1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY));  -- Valeria → En Proceso

-- ==============================================================================
-- 5. HISTORIAL DE PROCESOS
-- ==============================================================================
-- IdPostulanteVacante: 1=Ana/Dev, 2=Carlos/Dev, 3=Sofía/Dev, 4=Luis/RH, 5=María/RH,
--   6=Roberto/LalaSuper, 7=Valeria/LalaSuper, 8=Diego/LalaTécnico, 9=Paola/LalaSum,
--   10=Andrés/PeñolesIng, 11=Diego/PeñolesIng, 12=Paola/PeñolesQuim, 13=Valeria/PeñolesQuim
INSERT INTO PostulantesHistorialIbero
    (IdHistorial, IdPostulanteVacante, IdProceso, Observaciones, Resultado, Fecha)
VALUES
-- ── VACANTE 1: Dev Full Stack Jr. (Ibero) ─────────────────────────────────────
-- Ana (PV=1): proceso 1→2→3 (eval PHP 66.67%) →4 (eval psicométrica 100%)
(1,  1, 1, 'CV cumple requisitos. Proyectos propios en GitHub.',       1, DATE_SUB(CURRENT_DATE, INTERVAL 13 DAY)),
(2,  1, 2, 'Entrevista RH satisfactoria. Comunicación clara.',         1, DATE_SUB(CURRENT_DATE, INTERVAL 11 DAY)),
(3,  1, 3, 'Eval PHP & SQL: 66.67% — Falla en arrays pero domina SQL.',1, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)),
(4,  1, 4, 'Psicometría: 100%. Excelente razonamiento lógico.',        1, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),
-- Carlos (PV=2): proceso completo → contratado
(5,  2, 1, 'Perfil excelente, domina PHP, React y MySQL.',             1, DATE_SUB(CURRENT_DATE, INTERVAL 12 DAY)),
(6,  2, 2, 'Entrevista muy fluida, proactivo, buenas referencias.',    1, DATE_SUB(CURRENT_DATE, INTERVAL 10 DAY)),
(7,  2, 3, 'Eval PHP & SQL: 100%. Responde todo correctamente.',       1, DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),
(8,  2, 4, 'Psicometría: 100%. Resultados ideales.',                   1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(9,  2, 5, 'Oferta económica $22,000 aceptada.',                       1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
(10, 2, 6, 'Alta en sistema. Inicio 1er día siguiente mes.',           1, DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY)),
-- Sofía (PV=3): descartada en revisión documental
(11, 3, 1, 'Le falta experiencia en BD. Eval en progreso sin concluir.',0, DATE_SUB(CURRENT_DATE, INTERVAL 11 DAY)),
-- ── VACANTE 2: Coordinador RH (Ibero) ─────────────────────────────────────────
-- Luis (PV=4): proceso 1→2→3 (eval psicométrica asignada, pendiente)
(12, 4, 1, 'Documentos completos y en orden.',                         1, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)),
(13, 4, 2, 'Buena actitud, experiencia de 3 años en selección.',       1, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),
(14, 4, 3, 'Evaluación psicométrica asignada. Pendiente de responder.',1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)),
-- María (PV=5): proceso 1→2→3 (eval psicométrica en progreso)
(15, 5, 1, 'CV sólido. Maestría en RRHH por UNAM.',                   1, DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),
(16, 5, 2, 'Entrevista RH aprobada. Excelente manejo de conflictos.',  1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(17, 5, 3, 'Evaluación psicométrica en progreso. Contestó 1/2.',       1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
-- ── VACANTE 4: Supervisor de Producción Láctea (Lala) ─────────────────────────
-- Roberto (PV=6): proceso completo → contratado
(18, 6, 1, 'Perfil operativo sólido. 8 años en planta Nestlé.',        1, DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY)),
(19, 6, 2, 'Entrevista con Jefe de Planta aprobada. Buena actitud.',   1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(20, 6, 3, 'Eval Industrial: 83.33%. Solo falla norma STPS.',          1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
(21, 6, 4, 'Evaluación psicométrica grupal: apto.',                    1, DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY)),
(22, 6, 5, 'Oferta $30,000 aceptada con inicio el próximo lunes.',     1, DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY)),
-- Valeria (PV=7): proceso 1→2→3 (eval industrial en progreso)
(23, 7, 1, 'Documentos recibidos. Perfil de ingeniería industrial.',   1, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)),
(24, 7, 2, 'Entrevista RH aprobada. Candidata puntual y proactiva.',   1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY)),
(25, 7, 3, 'Evaluación técnica industrial en progreso.',               1, DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY)),
-- ── VACANTE 5: Técnico de Mantenimiento Industrial (Lala) ─────────────────────
-- Diego (PV=8): proceso 1→2 (entrevista RH en proceso)
(26, 8, 1, 'CV recibido. Certificaciones en mecatrónica.',             1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(27, 8, 2, 'Entrevista RH agendada para la próxima semana.',           1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
-- ── VACANTE 6: Analista Cadena de Suministro (Lala) ───────────────────────────
-- Paola (PV=9): descartada
(28, 9, 1, 'No cuenta con experiencia en supply chain requerida.',     0, DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY)),
-- ── VACANTE 7: Ingeniero de Minas Jr. (Peñoles) ───────────────────────────────
-- Andrés (PV=10): proceso 1→2→3 (eval industrial completada 83.33%)
(29,10, 1, 'Ingeniero de minas recién egresado. Prácticas en Fresnillo.',1,DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
(30,10, 2, 'Entrevista RH aprobada. Disponibilidad inmediata.',         1,DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY)),
(31,10, 3, 'Eval Técnica Industrial: 83.33%. Buen resultado para recién egresado.',1,DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY)),
-- Diego (PV=11): proceso 1→2 (RH en proceso)
(32,11, 1, 'Perfil de ing. mecánico. Experiencia 2 años en maquinaria.',1,DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY)),
(33,11, 2, 'Entrevista RH pendiente de calificación.',                  1,DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY)),
-- ── VACANTE 8: Químico de Laboratorio (Peñoles) ───────────────────────────────
-- Paola (PV=12): proceso 1→2 (candidata avanzada)
(34,12, 1, 'Licenciatura en Química. Experiencia en análisis mineral.',1, DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY)),
(35,12, 2, 'Entrevista aprobada con el Coordinador de Lab.',           1, DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY)),
-- Valeria (PV=13): proceso 1
(36,13, 1, 'Perfil de ingeniería química. CV en revisión.',            1, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY));

-- ==============================================================================
-- 6. EVALUACIONES
-- ==============================================================================
TRUNCATE TABLE VacantesEvaluacionesIbero;

INSERT INTO EvaluacionesIbero
    (idEvaluaciones, Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, DirigidoA, PreguntasAceptadas)
VALUES
(1, 'Prueba de Conocimientos PHP & SQL', 2,
    DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY), DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY), 1, 2, 1),
(2, 'Prueba Psicométrica y Lógica', 2,
    DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY), DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY), 1, 2, 1),
(3, 'Evaluación Técnica Operaciones Industriales', 2,
    DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY), DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY), 1, 2, 1);

-- ==============================================================================
-- 6B. ASIGNACIÓN DE EVALUACIONES A VACANTES (VacantesEvaluacionesIbero)
-- ==============================================================================
-- Vacante 1 (Dev Full Stack, Ibero) → Eval 1 (PHP&SQL) en Proceso 3 (Entrevista Área)
-- Vacante 1 (Dev Full Stack, Ibero) → Eval 2 (Psicométrica) en Proceso 4 (Evaluación Psicométrica)
-- Vacante 4 (Supervisor Lala) → Eval 3 (Industrial) en Proceso 3
-- Vacante 7 (Ingeniero Peñoles) → Eval 3 (Industrial) en Proceso 3
INSERT INTO VacantesEvaluacionesIbero (IdVacanteEvaluacion, IdVacante, IdEvaluacion, IdProceso)
VALUES
(1, 1, 1, 3),   -- Dev Full Stack → Eval PHP & SQL → Proceso 3 (Entrevista Área)
(2, 1, 2, 4),   -- Dev Full Stack → Eval Psicométrica → Proceso 4 (Evaluación Psicométrica)
(3, 2, 2, 3),   -- Coordinador RH → Eval Psicométrica → Proceso 3 (Entrevista Área)
(4, 4, 3, 3),   -- Supervisor Lala → Eval Industrial → Proceso 3 (Entrevista Área)
(5, 7, 3, 3);   -- Ingeniero Peñoles → Eval Industrial → Proceso 3 (Entrevista Área)

-- ==============================================================================
-- 7. PREGUNTAS PARA EVALUACIONES
-- ==============================================================================
INSERT INTO PreguntasEvaluacionIbero
    (idPreguntasEvaluacion, idEvaluaciones, idCompetencias, Titulo, Orden, idTipoPregunta)
VALUES
-- Evaluación 1: PHP & SQL
(1, 1, 1, '¿Qué función en PHP se usa para insertar elementos al final de un arreglo?',            1, 2),
(2, 1, 2, 'PHP es un lenguaje que se ejecuta del lado del cliente (Frontend).',                    2, 1),
(3, 1, 3, 'Del 1 al 10, ¿cómo evalúas tu experiencia escribiendo consultas SQL con JOINs?',        3, 3),
-- Evaluación 2: Psicométrica
(4, 2, 1, '¿Qué figura sigue en la secuencia: Triángulo, Cuadrado, Pentágono...?',                 1, 2),
(5, 2, 2, 'Me adapto fácilmente a cambios drásticos de última hora en mis proyectos.',             2, 1),
-- Evaluación 3: Operaciones Industriales
(6, 3, 3, 'Del 1 al 10, ¿cuál es tu nivel de experiencia en supervisión de turnos de planta?',    1, 3),
(7, 3, 2, 'El mantenimiento preventivo reduce tiempos de paro no planificados.',                   2, 1),
(8, 3, 1, '¿Cuál de las siguientes normas aplica a seguridad e higiene industrial en México?',     3, 2);

-- Opciones para preguntas de opción múltiple
INSERT INTO PreguntasPosiblesRespuestasIbero
    (idPreguntasPosiblesRespuestas, idPreguntasEvaluacion, DescripcionRespuesta)
VALUES
-- Pregunta 1 (PHP array)
(1, 1, 'array_push()'),
(2, 1, 'array_pop()'),
(3, 1, 'array_unshift()'),
-- Pregunta 4 (figura)
(4, 4, 'Hexágono'),
(5, 4, 'Círculo'),
(6, 4, 'Estrella'),
-- Pregunta 8 (norma industrial)
(7, 8, 'NOM-001-STPS'),
(8, 8, 'ISO-9001'),
(9, 8, 'NMX-CC-9000');

-- Configuraciones de respuestas correctas
INSERT INTO PreguntasConfiguracionIbero
    (idPreguntasConfiguracion, idPreguntasEvaluacion, RespuestaCorrectaOM, BoolCorreta, RangoInicial, RangoFinal)
VALUES
(1, 1, 1,    NULL, NULL, NULL),  -- array_push() (id=1) es correcta
(2, 2, NULL, 0,    NULL, NULL),  -- PHP es backend → Falso
(3, 3, NULL, NULL, 1,   10),     -- Rango 1-10
(4, 4, 4,    NULL, NULL, NULL),  -- Hexágono (id=4)
(5, 5, NULL, 1,    NULL, NULL),  -- Verdadero
(6, 6, NULL, NULL, 1,   10),     -- Rango 1-10
(7, 7, NULL, 1,    NULL, NULL),  -- Verdadero
(8, 8, 7,    NULL, NULL, NULL);  -- NOM-001-STPS (id=7)

-- ==============================================================================
-- 8. ASIGNACIÓN DE EVALUACIONES A POSTULANTES
-- ==============================================================================
-- VacanteEval: 1=Dev/PHP(P3), 2=Dev/Psicométrica(P4), 3=RH/Psicométrica(P3),
--              4=LalaSuper/Industrial(P3), 5=PeñolesIng/Industrial(P3)
INSERT INTO PostulantesEvaluacionesIbero
    (IdPostulanteEvaluacion, IdPostulanteVacante, IdVacanteEvaluacion, EstatusEvaluacion, Calificacion)
VALUES
-- ── VACANTE 1: Dev Full Stack (Ibero) ─────────────────────────────────────────
(1,  1, 1, 3, 66.67),   -- Ana        → Eval PHP           → COMPLETADA  66.67%
(2,  1, 2, 3, 100.00),  -- Ana        → Eval Psicométrica  → COMPLETADA 100.00%
(3,  2, 1, 3, 100.00),  -- Carlos     → Eval PHP           → COMPLETADA 100.00%
(4,  2, 2, 3, 100.00),  -- Carlos     → Eval Psicométrica  → COMPLETADA 100.00%
(5,  3, 1, 2, NULL),    -- Sofía      → Eval PHP           → EN PROGRESO (1 resp de 3)
-- ── VACANTE 2: Coordinador RH (Ibero) ─────────────────────────────────────────
(6,  4, 3, 1, NULL),    -- Luis       → Eval Psicométrica  → PENDIENTE
(7,  5, 3, 2, NULL),    -- María      → Eval Psicométrica  → EN PROGRESO (1 resp de 2)
-- ── VACANTE 4: Supervisor Producción Láctea (Lala) ────────────────────────────
(8,  6, 4, 3, 83.33),   -- Roberto    → Eval Industrial    → COMPLETADA  83.33%
(9,  7, 4, 2, NULL),    -- Valeria    → Eval Industrial    → EN PROGRESO (2 resp de 3)
-- ── VACANTE 7: Ingeniero de Minas Jr. (Peñoles) ───────────────────────────────
(10,10, 5, 3, 83.33),   -- Andrés     → Eval Industrial    → COMPLETADA  83.33%
(11,11, 5, 1, NULL);    -- Diego      → Eval Industrial    → PENDIENTE

-- ==============================================================================
-- 9. RESPUESTAS DE CANDIDATOS
-- ==============================================================================
-- Correctas definidas: P1→id=1(array_push), P2→0(Falso), P3→rango, P4→id=4(Hexágono),
--                      P5→1(Verdadero), P6→rango, P7→1(Verdadero), P8→id=7(NOM-001-STPS)
INSERT INTO PostulantesRespuestasIbero
    (IdRespuesta, IdPostulanteEvaluacion, IdPreguntasEvaluacion, Respuesta)
VALUES
-- ── Ana — Eval PHP & SQL (PE=1 | 66.67% → falla P1) ──────────────────────────
(1,  1, 1, '2'),    -- array_pop()  [MAL] Competencia: Comunicación
(2,  1, 2, '0'),    -- Falso        [BIEN] Competencia: Adaptabilidad
(3,  1, 3, '8'),    -- Rango 8      [BIEN] Competencia: Calidad del Trabajo
-- ── Ana — Eval Psicométrica (PE=2 | 100%) ─────────────────────────────────────
(4,  2, 4, '4'),    -- Hexágono     [BIEN] Competencia: Comunicación
(5,  2, 5, '1'),    -- Verdadero    [BIEN] Competencia: Adaptabilidad
-- ── Carlos — Eval PHP & SQL (PE=3 | 100%) ─────────────────────────────────────
(6,  3, 1, '1'),    -- array_push() [BIEN] Competencia: Comunicación
(7,  3, 2, '0'),    -- Falso        [BIEN] Competencia: Adaptabilidad
(8,  3, 3, '10'),   -- Rango 10     [BIEN] Competencia: Calidad del Trabajo
-- ── Carlos — Eval Psicométrica (PE=4 | 100%) ──────────────────────────────────
(9,  4, 4, '4'),    -- Hexágono     [BIEN] Competencia: Comunicación
(10, 4, 5, '1'),    -- Verdadero    [BIEN] Competencia: Adaptabilidad
-- ── Sofía — Eval PHP en progreso (PE=5 | 1 resp de 3 contestadas) ─────────────
(11, 5, 1, '3'),    -- array_unshift() [MAL] Competencia: Comunicación
-- ── María — Eval Psicométrica en progreso (PE=7 | 1 resp de 2) ───────────────
(12, 7, 4, '5'),    -- Círculo      [MAL] Competencia: Comunicación
-- ── Roberto — Eval Industrial (PE=8 | 83.33% → falla P8) ─────────────────────
(13, 8, 6, '9'),    -- Rango 9      [BIEN] Competencia: Calidad del Trabajo
(14, 8, 7, '1'),    -- Verdadero    [BIEN] Competencia: Adaptabilidad
(15, 8, 8, '8'),    -- ISO-9001     [MAL]  Competencia: Comunicación
-- ── Valeria — Eval Industrial en progreso (PE=9 | 2 resp de 3) ───────────────
(16, 9, 6, '7'),    -- Rango 7      [BIEN] Competencia: Calidad del Trabajo
(17, 9, 7, '1'),    -- Verdadero    [BIEN] Competencia: Adaptabilidad
-- ── Andrés — Eval Industrial (PE=10 | 83.33% → falla P8) ─────────────────────
(18,10, 6, '8'),    -- Rango 8      [BIEN] Competencia: Calidad del Trabajo
(19,10, 7, '1'),    -- Verdadero    [BIEN] Competencia: Adaptabilidad
(20,10, 8, '8');    -- ISO-9001     [MAL]  Competencia: Comunicación
