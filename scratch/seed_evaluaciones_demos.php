<?php
require_once(__DIR__ . "/../Backend/Conexiones/Conexiones.php");
$conn = new Conexiones();

echo "========================================================================\n";
echo "  SEMBRADO DE EVALUACIONES 360° Y PLANES DE ACCIÓN ELABORADOS PARA DEMO  \n";
echo "========================================================================\n\n";

try {
    // -------------------------------------------------------------------------
    // 0. CONFIGURACIÓN DE EMPLEADOS DE PRUEBA
    // -------------------------------------------------------------------------
    $target_employee = 1014;       // Alicia Marcela Torres Sandoval (Evaluada)
    $boss_employee = 1001;         // Roberto Alejandro Garza Montoya (Jefe)
    $peer_employee = 1015;         // Felipe de Jesus Ramirez Leal (Par)
    $subordinate_employee = 1002;  // Maria Elena Salinas Torres (Subordinado)

    echo "Cargando datos de nivel y puesto de los empleados...\n";
    
    // Obtener nivel y puesto de cada empleado
    $getTarget = $conn->Select("SELECT Nivel, IdPuesto FROM Empleados WHERE NoEmpleado = $target_employee;");
    $getBoss = $conn->Select("SELECT Nivel, IdPuesto FROM Empleados WHERE NoEmpleado = $boss_employee;");
    $getPeer = $conn->Select("SELECT Nivel, IdPuesto FROM Empleados WHERE NoEmpleado = $peer_employee;");
    $getSub = $conn->Select("SELECT Nivel, IdPuesto FROM Empleados WHERE NoEmpleado = $subordinate_employee;");

    if (empty($getTarget) || empty($getBoss) || empty($getPeer) || empty($getSub)) {
        throw new Exception("Error: Uno o más empleados de prueba (1001, 1002, 1014, 1015) no se encontraron en la tabla Empleados.");
    }

    $target_level = $getTarget[0]['Nivel'];
    $target_position = $getTarget[0]['IdPuesto'];
    $boss_level = $getBoss[0]['Nivel'];
    $boss_position = $getBoss[0]['IdPuesto'];
    $peer_level = $getPeer[0]['Nivel'];
    $peer_position = $getPeer[0]['IdPuesto'];
    $subordinate_level = $getSub[0]['Nivel'];
    $subordinate_position = $getSub[0]['IdPuesto'];

    // -------------------------------------------------------------------------
    // 1. PURGAR EVALUACIONES, PLANES Y REPORTES DE LÍNEA ÉTICA
    // -------------------------------------------------------------------------
    echo "Realizando purga de datos de evaluaciones y línea ética anteriores...\n";
    $conn->ExecuteQuery("DELETE FROM AvanceActividadPlanA", []);
    $conn->ExecuteQuery("DELETE FROM ActividadesPlanAccion", []);
    $conn->ExecuteQuery("DELETE FROM ObjetivosPlanAccion", []);
    $conn->ExecuteQuery("DELETE FROM HistorialRechazosPlanA", []);
    $conn->ExecuteQuery("DELETE FROM PlanesAccionEvaluacion", []);
    $conn->ExecuteQuery("DELETE FROM RetroalimentacionEvaluacion", []);
    $conn->ExecuteQuery("DELETE FROM RespuestaEvaluaciones", []);
    $conn->ExecuteQuery("DELETE FROM DetalleEvaluacionesRespondidas", []);
    $conn->ExecuteQuery("DELETE FROM EvaluacionDetalle", []);
    $conn->ExecuteQuery("DELETE FROM PreguntasConfiguracion", []);
    $conn->ExecuteQuery("DELETE FROM PreguntasPosiblesRespuestas", []);
    $conn->ExecuteQuery("DELETE FROM PreguntasEvaluacion", []);
    $conn->ExecuteQuery("DELETE FROM ConfiguracionInicialEvaluacion", []);
    $conn->ExecuteQuery("DELETE FROM EsperaNuevaEvaluacion", []);
    $conn->ExecuteQuery("DELETE FROM Evaluaciones", []);
    
    // Purga de línea ética
    $conn->ExecuteQuery("DELETE FROM LineaEticaMensajes", []);

    // -------------------------------------------------------------------------
    // 2. CREACIÓN DE EVALUACIÓN 1: TOTALMENTE CONTESTADA + PLAN DE ACCIÓN ACTIVO
    // -------------------------------------------------------------------------
    echo "\nCreando Evaluación 1: 'Evaluación 360° Demo - Resultados y Plan Activo'...\n";
    
    $qInsertEv1 = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Evaluación 360° Demo - Resultados y Plan Activo (Alicia Torres)',
        1, -- 360°
        DATE_SUB(CURDATE(), INTERVAL 10 DAY),
        DATE_SUB(CURDATE(), INTERVAL 2 DAY),
        1, -- Status Activa
        DATE_SUB(CURDATE(), INTERVAL 2 DAY),
        DATE_ADD(CURDATE(), INTERVAL 15 DAY),
        DATE_SUB(CURDATE(), INTERVAL 2 DAY),
        DATE_ADD(CURDATE(), INTERVAL 30 DAY),
        1, -- Dirigido a Empleados
        '1014', -- Alicia Torres
        1, -- Publicada/Activada
        1, -- Preguntas Aceptadas
        1, 1, '1'
    )";
    
    $ev1_id = $conn->InsertAndGetId($qInsertEv1, []);
    echo "  - Creada con ID: $ev1_id\n";

    // Asociar sucursales de los participantes
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev1_id), (2, $ev1_id)", []);

    // Crear EvaluacionDetalle para los 4 evaluadores (Todos con StatusEvaluado = 1 ya que está terminada)
    $det1_boss = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev1_id, $boss_employee, $target_employee, 1, 1, 1, 0, 0, 0, $target_level, $target_position)", []);
    $det1_peer = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev1_id, $peer_employee, $target_employee, 1, 1, 0, 1, 0, 0, $target_level, $target_position)", []);
    $det1_self = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev1_id, $target_employee, $target_employee, 1, 1, 0, 0, 1, 0, $target_level, $target_position)", []);
    $det1_sub = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev1_id, $subordinate_employee, $target_employee, 1, 1, 0, 0, 0, 1, $target_level, $target_position)", []);

    // -------------------------------------------------------------------------
    // 3. ESTRUCTURACIÓN DE PREGUNTAS
    // -------------------------------------------------------------------------
    echo "Sembrando catálogo de preguntas y configuraciones (4 Competencias, 4 Preguntas cada una)...\n";

    // Estructura de Competencias y sus preguntas
    $competenciesData = [
        // Competencia 2: Trabajo en Equipo
        2 => [
            "nombre" => "Trabajo en Equipo",
            "preguntas" => [
                [
                    "tipo" => 1, // V/F
                    "titulo" => "¿Fomenta un ambiente de confianza y colaboración activa en su equipo de trabajo?",
                    "desc" => "Evalúa si promueve la integración y armonía.",
                    "config" => ["BoolCorreta" => 1] // Verdadero
                ],
                [
                    "tipo" => 2, // OM Nivel
                    "titulo" => "¿Con qué frecuencia comparte información y conocimientos relevantes con sus compañeros?",
                    "desc" => "Compartir información es clave para la sinergia del equipo.",
                    "respuestas" => [
                        "Excelente (Siempre comparte proactivamente)",
                        "Bueno (Comparte de manera regular)",
                        "Regular (Comparte ocasionalmente)",
                        "Malo (Rara vez comparte)"
                    ],
                    "config" => ["esperado" => "Excelente (Siempre comparte proactivamente)", "niveles" => [1, 2, 3, 4]]
                ],
                [
                    "tipo" => 3, // Rango
                    "titulo" => "Evalúe la disposición del colaborador para integrarse a proyectos multidisciplinarios de la empresa.",
                    "desc" => "1 significa muy baja disposición, 10 significa excelente disposición.",
                    "config" => ["RangoInicial" => 1, "RangoFinal" => 10]
                ],
                [
                    "tipo" => 4, // OM Única
                    "titulo" => "Según los lineamientos de la empresa, ¿cuál es el rol del colaborador al resolver conflictos de equipo?",
                    "desc" => "Selecciona el rol ideal esperado en situaciones difíciles.",
                    "respuestas" => [
                        "Facilitar el diálogo y buscar soluciones de mutuo acuerdo.", // Correcta
                        "Imponer su propio criterio para avanzar rápido.",
                        "Delegar la resolución enteramente al jefe directo.",
                        "Ignorar el conflicto esperando que se resuelva solo."
                    ],
                    "config" => ["correcta" => "Facilitar el diálogo y buscar soluciones de mutuo acuerdo."]
                ]
            ]
        ],
        // Competencia 3: Autocontrol
        3 => [
            "nombre" => "Autocontrol",
            "preguntas" => [
                [
                    "tipo" => 1,
                    "titulo" => "¿El evaluado mantiene el control de sus emociones frente a situaciones de alta presión o crisis?",
                    "desc" => "Evalúa la madurez y estabilidad emocional.",
                    "config" => ["BoolCorreta" => 1]
                ],
                [
                    "tipo" => 2,
                    "titulo" => "¿Cómo reacciona el evaluado ante comentarios de retroalimentación constructiva o críticas a su trabajo?",
                    "desc" => "Evalúa la apertura para recibir feedback.",
                    "respuestas" => [
                        "Escucha con apertura, analiza y define acciones de mejora.",
                        "Acepta los comentarios pero no realiza cambios visibles.",
                        "Se muestra a la defensiva o justifica sus acciones de inmediato.",
                        "Ignora las sugerencias y muestra molestia."
                    ],
                    "config" => ["esperado" => "Escucha con apertura, analiza y define acciones de mejora.", "niveles" => [1, 2, 3, 4]]
                ],
                [
                    "tipo" => 3,
                    "titulo" => "Califique la capacidad del evaluado para trabajar eficazmente bajo plazos de entrega sumamente ajustados.",
                    "desc" => "Donde 1 es deficiente y 10 es excelente tolerancia.",
                    "config" => ["RangoInicial" => 1, "RangoFinal" => 10]
                ],
                [
                    "tipo" => 4,
                    "titulo" => "¿Cuál es el protocolo establecido en la organización ante una situación de crisis emocional o estrés severo?",
                    "desc" => "Selecciona el canal institucional correcto.",
                    "respuestas" => [
                        "Acudir al departamento de Salud Ocupacional o Recursos Humanos.", // Correcta
                        "Abandonar las instalaciones sin previo aviso.",
                        "Continuar trabajando sin reportarlo a nadie.",
                        "Confrontar directamente a los compañeros involucrados."
                    ],
                    "config" => ["correcta" => "Acudir al departamento de Salud Ocupacional o Recursos Humanos."]
                ]
            ]
        ],
        // Competencia 6: Comunicación
        6 => [
            "nombre" => "Comunicación",
            "preguntas" => [
                [
                    "tipo" => 1,
                    "titulo" => "¿Sus mensajes verbales y escritos son claros, estructurados y fáciles de comprender?",
                    "desc" => "Valora la claridad expresiva.",
                    "config" => ["BoolCorreta" => 1]
                ],
                [
                    "tipo" => 2,
                    "titulo" => "¿De qué manera comunica los avances y bloqueos en sus proyectos asignados?",
                    "desc" => "Flujo de comunicación ascendente y lateral.",
                    "respuestas" => [
                        "Reporta en tiempo real con reportes estructurados.",
                        "Informa solo en las reuniones semanales obligatorias.",
                        "Reporta de manera informal y cuando se le pregunta directamente.",
                        "Rara vez mantiene informados a sus jefes o compañeros."
                    ],
                    "config" => ["esperado" => "Reporta en tiempo real con reportes estructurados.", "niveles" => [1, 2, 3, 4]]
                ],
                [
                    "tipo" => 3,
                    "titulo" => "Califique la habilidad de escucha activa del colaborador durante reuniones de trabajo.",
                    "desc" => "1 es nula escucha activa, 10 es escucha y asimilación excepcional.",
                    "config" => ["RangoInicial" => 1, "RangoFinal" => 10]
                ],
                [
                    "tipo" => 4,
                    "titulo" => "¿Cuál es la herramienta corporativa autorizada para el envío de comunicados masivos oficiales?",
                    "desc" => "Medio oficial del corporativo.",
                    "respuestas" => [
                        "Correo electrónico corporativo de la Intranet.", // Correcta
                        "Mensajería instantánea privada.",
                        "Redes sociales externas de los empleados.",
                        "Memorándums físicos sin firma autorizada."
                    ],
                    "config" => ["correcta" => "Correo electrónico corporativo de la Intranet."]
                ]
            ]
        ],
        // Competencia 14: Liderazgo
        14 => [
            "nombre" => "Liderazgo",
            "preguntas" => [
                [
                    "tipo" => 1,
                    "titulo" => "¿Inspira y motiva a otros miembros del equipo a alcanzar los objetivos organizacionales?",
                    "desc" => "Liderazgo inspirador y motivador.",
                    "config" => ["BoolCorreta" => 1]
                ],
                [
                    "tipo" => 2,
                    "titulo" => "¿Cómo delega responsabilidades y tareas entre sus colaboradores directos o compañeros?",
                    "desc" => "Forma de distribución del trabajo y empowerment.",
                    "respuestas" => [
                        "Asigna tareas según fortalezas individuales y brinda autonomía para decidir.",
                        "Asigna tareas detalladas pero supervisa de forma excesiva (micromanagement).",
                        "Delega solo tareas rutinarias y retiene las decisiones críticas.",
                        "No delega y asume toda la carga de trabajo de forma centralizada."
                    ],
                    "config" => ["esperado" => "Asigna tareas según fortalezas individuales y brinda autonomía para decidir.", "niveles" => [1, 2, 3, 4]]
                ],
                [
                    "tipo" => 3,
                    "titulo" => "Evalúe la habilidad del colaborador para guiar a otros en la resolución de problemas técnicos complejos.",
                    "desc" => "1 es nula guía, 10 es mentoría excepcional.",
                    "config" => ["RangoInicial" => 1, "RangoFinal" => 10]
                ],
                [
                    "tipo" => 4,
                    "titulo" => "Dentro de los lineamientos de liderazgo de la empresa, ¿cuál es el pilar fundamental del liderazgo situacional?",
                    "desc" => "Teoría base del modelo corporativo.",
                    "respuestas" => [
                        "Adaptar el estilo de dirección al nivel de desarrollo y madurez del colaborador.", // Correcta
                        "Mantener un estilo rígido y autoritario bajo cualquier circunstancia.",
                        "Dejar que los subordinados trabajen sin ningún tipo de guía o retroalimentación.",
                        "Cambiar de opinión constantemente sin una justificación clara."
                    ],
                    "config" => ["correcta" => "Adaptar el estilo de dirección al nivel de desarrollo y madurez del colaborador."]
                ]
            ]
        ]
    ];

    $questionsMap = [];

    // Creamos las preguntas para la Evaluación 1
    foreach ($competenciesData as $compId => $compInfo) {
        foreach ($compInfo['preguntas'] as $idx => $preg) {
            $qId = $conn->InsertAndGetId("INSERT INTO PreguntasEvaluacion (idEvaluaciones, idTipoPregunta, idCompetencias, Titulo, Descripcion) VALUES ($ev1_id, {$preg['tipo']}, $compId, '{$preg['titulo']}', '{$preg['desc']}')", []);
            $questionsMap[$ev1_id][$compId][$idx] = [
                'id' => $qId,
                'tipo' => $preg['tipo'],
                'preg' => $preg
            ];
            
            $correctAnsId = null;
            $expectedAnsId = null;
            $optIdsMap = [];
            
            if (isset($preg['respuestas'])) {
                foreach ($preg['respuestas'] as $optText) {
                    $optId = $conn->InsertAndGetId("INSERT INTO PreguntasPosiblesRespuestas (idPreguntasEvaluacion, DescripcionRespuesta) VALUES ($qId, '$optText')", []);
                    $optIdsMap[$optText] = $optId;
                    
                    if (isset($preg['config']['correcta']) && $preg['config']['correcta'] === $optText) {
                        $correctAnsId = $optId;
                    }
                    if (isset($preg['config']['esperado']) && $preg['config']['esperado'] === $optText) {
                        $expectedAnsId = $optId;
                    }
                }
                $questionsMap[$ev1_id][$compId][$idx]['opts'] = $optIdsMap;
            }
            
            if ($preg['tipo'] == 1) {
                $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, BoolCorreta) VALUES ($qId, {$preg['config']['BoolCorreta']})", []);
            } elseif ($preg['tipo'] == 2) {
                foreach ($preg['config']['niveles'] as $lvl) {
                    $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM) VALUES ($qId, $expectedAnsId, $lvl)", []);
                }
            } elseif ($preg['tipo'] == 3) {
                $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RangoInicial, RangoFinal) VALUES ($qId, {$preg['config']['RangoInicial']}, {$preg['config']['RangoFinal']})", []);
            } elseif ($preg['tipo'] == 4) {
                $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaCorrectaOM) VALUES ($qId, $correctAnsId)", []);
            }
        }
    }

    // -------------------------------------------------------------------------
    // 4. INSERTAR CALIFICACIONES YA SELECCIONADAS (EVALUACIÓN 1)
    // -------------------------------------------------------------------------
    echo "Poblando respuestas ya contestadas en Evaluación 1 (fortalezas y debilidades)...\n";
    
    $evaluadores1 = [
        'boss' => ['id' => $det1_boss, 'role' => 'Jefe'],
        'peer' => ['id' => $det1_peer, 'role' => 'Par'],
        'self' => ['id' => $det1_self, 'role' => 'Auto'],
        'sub' => ['id' => $det1_sub, 'role' => 'Subordinado']
    ];

    $responsesData = [
        'boss' => [
            2 => [
                0 => ['cal' => '1', 'com' => 'Excelente disposición para colaborar con otros miembros del departamento.'],
                1 => ['idx_opt' => 0, 'com' => 'Siempre comparte la información técnica a tiempo.'],
                2 => ['cal' => '9', 'com' => 'Se integra de manera ejemplar en los proyectos multidisciplinarios.'],
                3 => ['idx_opt' => 0, 'com' => 'Busca activamente facilitar el diálogo en conflictos de equipo.']
            ],
            14 => [
                0 => ['cal' => '1', 'com' => 'Demuestra una gran capacidad para guiar y motivar al grupo de trabajo.'],
                1 => ['idx_opt' => 0, 'com' => 'Delega correctamente dando autonomía y confianza.'],
                2 => ['cal' => '9', 'com' => 'Brinda mentoría técnica muy sólida.'],
                3 => ['idx_opt' => 0, 'com' => 'Aplica principios de liderazgo situacional conforme a las políticas.']
            ],
            3 => [
                0 => ['cal' => '0', 'com' => 'Se frustra con facilidad ante situaciones de alta presión o fallas críticas.'],
                1 => ['idx_opt' => 2, 'com' => 'Tiende a justificarse de inmediato o tomar el feedback personal.'],
                2 => ['cal' => '5', 'com' => 'Su rendimiento disminuye notablemente bajo estrés de entregas.'],
                3 => ['idx_opt' => 2, 'com' => 'En ocasiones ha ignorado el canal oficial durante una crisis.']
            ],
            6 => [
                0 => ['cal' => '0', 'com' => 'Falta claridad en la redacción de sus minutas y correos formales.'],
                1 => ['idx_opt' => 2, 'com' => 'Reporta avances solo cuando se le pregunta de manera expresa.'],
                2 => ['cal' => '5', 'com' => 'Falta escucha activa; tiende a interrumpir a otros en juntas.'],
                3 => ['idx_opt' => 1, 'com' => 'Utiliza canales informales en vez del correo institucional para comunicados.']
            ]
        ],
        'peer' => [
            2 => [
                0 => ['cal' => '1', 'com' => 'Muy buen compañero, siempre te da una mano si lo necesitas.'],
                1 => ['idx_opt' => 0, 'com' => 'Comparte información siempre que puede.'],
                2 => ['cal' => '10', 'com' => 'Totalmente disponible para integrarse a proyectos nuevos.'],
                3 => ['idx_opt' => 0, 'com' => 'Ayuda a mediar discusiones entre los compañeros.']
            ],
            14 => [
                0 => ['cal' => '1', 'com' => 'Es un referente en el equipo, impulsa a otros.'],
                1 => ['idx_opt' => 0, 'com' => 'Otorga libertad y fomenta el crecimiento de los compañeros.'],
                2 => ['cal' => '9', 'com' => 'Apoya muy bien en la resolución de dudas complejas.'],
                3 => ['idx_opt' => 0, 'com' => 'Sabe ajustar su estilo de dirección.']
            ],
            3 => [
                0 => ['cal' => '0', 'com' => 'A veces reacciona con molestia o enojo ante las emergencias.'],
                1 => ['idx_opt' => 2, 'com' => 'Suele ponerse a la defensiva si se cuestiona su entregable.'],
                2 => ['cal' => '4', 'com' => 'Baja tolerancia a la presión de entregas.'],
                3 => ['idx_opt' => 3, 'com' => 'Ha confrontado verbalmente a compañeros bajo situaciones tensas.']
            ],
            6 => [
                0 => ['cal' => '1', 'com' => 'Su comunicación verbal es clara, pero le falta la escrita.'],
                1 => ['idx_opt' => 2, 'com' => 'Falta proactividad al reportar bloqueos en sus actividades.'],
                2 => ['cal' => '6', 'com' => 'A veces le cuesta concentrarse en lo que otros exponen.'],
                3 => ['idx_opt' => 0, 'com' => 'Envía la información por correo institucional.']
            ]
        ],
        'self' => [
            2 => [
                0 => ['cal' => '1', 'com' => 'Considero que fomento la colaboración y el apoyo en el equipo.'],
                1 => ['idx_opt' => 0, 'com' => 'Comparto mis conocimientos y código con mis compañeros de inmediato.'],
                2 => ['cal' => '9', 'com' => 'Me adapto fácilmente a los proyectos de cualquier división.'],
                3 => ['idx_opt' => 0, 'com' => 'Busco mediar cuando hay diferencias de opiniones.']
            ],
            14 => [
                0 => ['cal' => '1', 'com' => 'Intento motivar a mis compañeros para cumplir las metas del sprint.'],
                1 => ['idx_opt' => 0, 'com' => 'Confío en la capacidad del equipo y delego actividades con autonomía.'],
                2 => ['cal' => '8', 'com' => 'Acompaño y guío a los integrantes junior en sus dudas técnicas.'],
                3 => ['idx_opt' => 0, 'com' => 'Adapto mi estilo según el perfil de mi compañero.']
            ],
            3 => [
                0 => ['cal' => '0', 'com' => 'Acepto que me cuesta controlar la frustración en picos altos de trabajo.'],
                1 => ['idx_opt' => 1, 'com' => 'Escucho el feedback, aunque a veces me cuesta implementarlo de inmediato.'],
                2 => ['cal' => '6', 'com' => 'Trabajo bajo presión pero a veces me estreso demasiado.'],
                3 => ['idx_opt' => 0, 'com' => 'Conozco el protocolo para acudir a RH en crisis de estrés.']
            ],
            6 => [
                0 => ['cal' => '1', 'com' => 'Considero que me expreso de forma clara en mi día a día.'],
                1 => ['idx_opt' => 2, 'com' => 'Debo reportar mis bloqueos con mayor anticipación y orden.'],
                2 => ['cal' => '7', 'com' => 'Intento practicar la escucha activa, pero a veces me distraigo.'],
                3 => ['idx_opt' => 0, 'com' => 'Uso el correo institucional como canal oficial.']
            ]
        ],
        'sub' => [
            2 => [
                0 => ['cal' => '1', 'com' => 'Alicia siempre nos integra y nos ayuda cuando estamos trabados.'],
                1 => ['idx_opt' => 0, 'com' => 'Siempre nos transmite las indicaciones del jefe de forma oportuna.'],
                2 => ['cal' => '9', 'com' => 'Gran disposición para colaborar con otras áreas.'],
                3 => ['idx_opt' => 0, 'com' => 'Busca mediar los conflictos con amabilidad.']
            ],
            14 => [
                0 => ['cal' => '1', 'com' => 'Es una líder inspiradora para nosotros en el día a día.'],
                1 => ['idx_opt' => 0, 'com' => 'Nos da total confianza para hacer nuestro trabajo y proponer.'],
                2 => ['cal' => '10', 'com' => 'Nos enseña pacientemente ante dudas técnicas complejas.'],
                3 => ['idx_opt' => 0, 'com' => 'Nos guía según nuestro nivel de aprendizaje.']
            ],
            3 => [
                0 => ['cal' => '0', 'com' => 'Cuando hay caídas de sistema, se le nota muy estresada y molesta.'],
                1 => ['idx_opt' => 2, 'com' => 'A veces no toma de buena manera los comentarios de mejora de procesos.'],
                2 => ['cal' => '5', 'com' => 'Se sobrecarga y responde de forma tensa bajo presión.'],
                3 => ['idx_opt' => 0, 'com' => 'Sabe los canales de apoyo de la empresa.']
            ],
            6 => [
                0 => ['cal' => '0', 'com' => 'A veces sus indicaciones en correos son un poco confusas.'],
                1 => ['idx_opt' => 2, 'com' => 'Nos enteramos de los problemas cuando ya son críticos.'],
                2 => ['cal' => '5', 'com' => 'Falta apertura para escuchar propuestas diferentes en las juntas.'],
                3 => ['idx_opt' => 0, 'com' => 'Usa los canales corporativos oficiales para delegar.']
            ]
        ]
    ];

    foreach ($evaluadores1 as $key => $evalInfo) {
        $detId = $evalInfo['id'];
        $respMap = $responsesData[$key];
        
        foreach ($respMap as $compId => $questions) {
            foreach ($questions as $idx => $ans) {
                $qRealData = $questionsMap[$ev1_id][$compId][$idx];
                $qId = $qRealData['id'];
                $tipo = $qRealData['tipo'];
                
                $calificacion = '';
                if ($tipo == 1 || $tipo == 3) {
                    $calificacion = $ans['cal'];
                } elseif ($tipo == 2 || $tipo == 4) {
                    $optsKeys = array_keys($qRealData['opts']);
                    $optText = $optsKeys[$ans['idx_opt']];
                    $calificacion = $qRealData['opts'][$optText];
                }
                
                $comentarios = $ans['com'];
                
                $qInsertAns = "INSERT INTO RespuestaEvaluaciones (idEvaluacionDetalle, idCompetencias, Registro, Comentarios, Calificacion, idPreguntasEvaluacion) VALUES ($detId, $compId, NOW(), ?, ?, $qId)";
                $conn->ExecuteQuery($qInsertAns, [$comentarios, $calificacion]);
            }
        }
    }

    // -------------------------------------------------------------------------
    // 5. Retroalimentación y Plan de Acción (Evaluación 1)
    // -------------------------------------------------------------------------
    $conn->ExecuteQuery("INSERT INTO RetroalimentacionEvaluacion (IdEvaluaciones, NoEmpleado, FechaAceptado) VALUES ($ev1_id, $target_employee, NOW())", []);
    $qInsertPlan = "INSERT INTO PlanesAccionEvaluacion (IdEvaluaciones, NoEmpleado, Requerido, StatusConfirmaActividades, StatusConfirmaPlanAccion, FechaConfirmaPlanAccion) VALUES ($ev1_id, $target_employee, 1, 1, 0, NULL)";
    $plan_id = $conn->InsertAndGetId($qInsertPlan, []);

    $obj_autocontrol = $conn->InsertAndGetId("INSERT INTO ObjetivosPlanAccion (IdPlanesAccionEvaluacion, IdCompetencias, Objetivo, DescObjetivo) VALUES ($plan_id, 3, 'Mejorar el Autocontrol bajo estrés', 'Desarrollar herramientas de autorregulación emocional y tolerancia a la presión en momentos críticos de producción.')", []);
    $obj_comunicacion = $conn->InsertAndGetId("INSERT INTO ObjetivosPlanAccion (IdPlanesAccionEvaluacion, IdCompetencias, Objetivo, DescObjetivo) VALUES ($plan_id, 6, 'Fortalecer la Comunicación asertiva', 'Mejorar la claridad y oportunidad en los reportes de bloqueos y avances, así como la escucha activa en las reuniones.')", []);

    $act1_1 = $conn->InsertAndGetId("INSERT INTO ActividadesPlanAccion (IdObjetivosPlanAccion, Titulo, Descripcion, FechaInicio, FechaFin, Progreso) VALUES ($obj_autocontrol, 'Taller de Inteligencia Emocional', 'Tomar el curso virtual corporativo de Inteligencia Emocional y manejo del estrés.', DATE_SUB(CURDATE(), INTERVAL 8 DAY), DATE_SUB(CURDATE(), INTERVAL 2 DAY), 100)", []);
    $act1_2 = $conn->InsertAndGetId("INSERT INTO ActividadesPlanAccion (IdObjetivosPlanAccion, Titulo, Descripcion, FechaInicio, FechaFin, Progreso) VALUES ($obj_autocontrol, 'Técnicas de Respiración Juntas de Crisis', 'Implementar pausas de respiración y autorregulación antes y durante reuniones de estatus de sistemas críticos.', DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 50)", []);
    $act2_1 = $conn->InsertAndGetId("INSERT INTO ActividadesPlanAccion (IdObjetivosPlanAccion, Titulo, Descripcion, FechaInicio, FechaFin, Progreso) VALUES ($obj_comunicacion, 'Configuración de Tablero Scrum Jira', 'Crear y estructurar un tablero Kanban detallado de tareas personales para comunicación visual y transparente del estatus.', DATE_SUB(CURDATE(), INTERVAL 8 DAY), DATE_SUB(CURDATE(), INTERVAL 1 DAY), 100)", []);
    $act2_2 = $conn->InsertAndGetId("INSERT INTO ActividadesPlanAccion (IdObjetivosPlanAccion, Titulo, Descripcion, FechaInicio, FechaFin, Progreso) VALUES ($obj_comunicacion, 'Sesiones Semanales 1-on-1', 'Programar y asistir a sesiones de retroalimentación 1-on-1 semanales de 20 min con el jefe inmediato para alinear prioridades.', DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 20 DAY), 75)", []);

    $conn->ExecuteQuery("INSERT INTO AvanceActividadPlanA (IdActividadesPlanAccion, NuevoAvance, DescripcionAvance, EstadoAprobacion, MotivoRevision, IdHistorialRechazo) VALUES ($act1_1, 100, 'Curso en línea completado al 100%, cargué mi certificado de participación en el portal.', 1, '¡Excelente! Felicidades por completar el taller a tiempo.', NULL)", []);
    $conn->ExecuteQuery("INSERT INTO AvanceActividadPlanA (IdActividadesPlanAccion, NuevoAvance, DescripcionAvance, EstadoAprobacion, MotivoRevision, IdHistorialRechazo) VALUES ($act2_1, 100, 'Tablero Jira configurado e integrado con Slack para alertas automáticas de bloqueos.', 1, 'Gran iniciativa para visibilizar las prioridades. Sigue así.', NULL)", []);
    $conn->ExecuteQuery("INSERT INTO AvanceActividadPlanA (IdActividadesPlanAccion, NuevoAvance, DescripcionAvance, EstadoAprobacion, MotivoRevision, IdHistorialRechazo) VALUES ($act1_2, 50, 'He aplicado técnicas en las últimas 3 reuniones críticas. He mantenido una actitud enfocada y serena.', 0, NULL, NULL)", []);
    $conn->ExecuteQuery("INSERT INTO AvanceActividadPlanA (IdActividadesPlanAccion, NuevoAvance, DescripcionAvance, EstadoAprobacion, MotivoRevision, IdHistorialRechazo) VALUES ($act2_2, 75, 'Hemos tenido las primeras 3 sesiones semanales con el jefe, donde se aclararon dudas del backlog.', 0, NULL, NULL)", []);

    // -------------------------------------------------------------------------
    // 6. CREACIÓN DE EVALUACIÓN 2: SIN CONTESTAR (LISTA PARA EVALUAR)
    // -------------------------------------------------------------------------
    echo "\nCreando Evaluación 2: 'Evaluación 360° Demo - Pendiente por Evaluar'...\n";

    $qInsertEv2 = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Evaluación 360° Demo - Pendiente por Evaluar (Alicia Torres)',
        1,
        DATE_SUB(CURDATE(), INTERVAL 1 DAY),
        DATE_ADD(CURDATE(), INTERVAL 14 DAY),
        1,
        DATE_ADD(CURDATE(), INTERVAL 15 DAY),
        DATE_ADD(CURDATE(), INTERVAL 25 DAY),
        DATE_ADD(CURDATE(), INTERVAL 15 DAY),
        DATE_ADD(CURDATE(), INTERVAL 45 DAY),
        1, '1014', 1, 1, 1, 1, '1'
    )";
    
    $ev2_id = $conn->InsertAndGetId($qInsertEv2, []);
    echo "  - Creada con ID: $ev2_id\n";
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev2_id), (2, $ev2_id)", []);

    $det2_boss = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev2_id, $boss_employee, $target_employee, 1, 0, 1, 0, 0, 0, $target_level, $target_position)", []);
    $det2_peer = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev2_id, $peer_employee, $target_employee, 1, 0, 0, 1, 0, 0, $target_level, $target_position)", []);
    $det2_self = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev2_id, $target_employee, $target_employee, 1, 0, 0, 0, 1, 0, $target_level, $target_position)", []);
    $det2_sub = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev2_id, $subordinate_employee, $target_employee, 1, 0, 0, 0, 0, 1, $target_level, $target_position)", []);

    // Preguntas Ev 2
    foreach ($competenciesData as $compId => $compInfo) {
        foreach ($compInfo['preguntas'] as $idx => $preg) {
            $qId = $conn->InsertAndGetId("INSERT INTO PreguntasEvaluacion (idEvaluaciones, idTipoPregunta, idCompetencias, Titulo, Descripcion) VALUES ($ev2_id, {$preg['tipo']}, $compId, '{$preg['titulo']}', '{$preg['desc']}')", []);
            $questionsMap[$ev2_id][$compId][$idx] = [
                'id' => $qId,
                'tipo' => $preg['tipo'],
                'preg' => $preg
            ];
            
            $correctAnsId = null;
            $expectedAnsId = null;
            $optIdsMap = [];
            
            if (isset($preg['respuestas'])) {
                foreach ($preg['respuestas'] as $optText) {
                    $optId = $conn->InsertAndGetId("INSERT INTO PreguntasPosiblesRespuestas (idPreguntasEvaluacion, DescripcionRespuesta) VALUES ($qId, '$optText')", []);
                    $optIdsMap[$optText] = $optId;
                    
                    if (isset($preg['config']['correcta']) && $preg['config']['correcta'] === $optText) {
                        $correctAnsId = $optId;
                    }
                    if (isset($preg['config']['esperado']) && $preg['config']['esperado'] === $optText) {
                        $expectedAnsId = $optId;
                    }
                }
                $questionsMap[$ev2_id][$compId][$idx]['opts'] = $optIdsMap;
            }
            
            if ($preg['tipo'] == 1) {
                $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, BoolCorreta) VALUES ($qId, {$preg['config']['BoolCorreta']})", []);
            } elseif ($preg['tipo'] == 2) {
                foreach ($preg['config']['niveles'] as $lvl) {
                    $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaEsperadoOM, NivelEmpleadoEsperadoOM) VALUES ($qId, $expectedAnsId, $lvl)", []);
                }
            } elseif ($preg['tipo'] == 3) {
                $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RangoInicial, RangoFinal) VALUES ($qId, {$preg['config']['RangoInicial']}, {$preg['config']['RangoFinal']})", []);
            } elseif ($preg['tipo'] == 4) {
                $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, RespuestaCorrectaOM) VALUES ($qId, $correctAnsId)", []);
            }
        }
    }

    $evaluadores2 = ['boss' => $det2_boss, 'peer' => $det2_peer, 'self' => $det2_self, 'sub' => $det2_sub];
    foreach ($evaluadores2 as $roleKey => $detId) {
        foreach ($competenciesData as $compId => $compInfo) {
            foreach ($compInfo['preguntas'] as $idx => $preg) {
                $qRealId = $questionsMap[$ev2_id][$compId][$idx]['id'];
                $conn->ExecuteQuery("INSERT INTO RespuestaEvaluaciones (idEvaluacionDetalle, idCompetencias, Registro, Comentarios, Calificacion, idPreguntasEvaluacion) VALUES ($detId, $compId, NOW(), NULL, NULL, $qRealId)", []);
            }
        }
    }

    // -------------------------------------------------------------------------
    // 7. CREACIÓN DE EVALUACIONES ADICIONALES (BORRADOR, COMPLETADAS, COPIAS, ETC.)
    // -------------------------------------------------------------------------
    echo "\nCreando evaluaciones adicionales requeridas por el usuario...\n";

    // 7.1 Evaluación en Borrador (Activado = 0, Status = 1)
    $qBorrador = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Evaluación 360° Desempeño Directivos - Borrador',
        1,
        DATE_ADD(CURDATE(), INTERVAL 10 DAY),
        DATE_ADD(CURDATE(), INTERVAL 25 DAY),
        1, -- Status Activa
        NULL, NULL, NULL, NULL,
        1, '1014,1015',
        0, -- ACTIVADO = 0 (Borrador)
        0, 1, 1, '1'
    )";
    $ev_borrador_id = $conn->InsertAndGetId($qBorrador, []);
    echo "  - Creado Borrador con ID: $ev_borrador_id\n";
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev_borrador_id)", []);

    // 7.2 Evaluación que se muestra como "Copia" y ya Completada (FechaFin en el pasado y todos contestados)
    $qCopiaCompletada = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Evaluación del Desempeño Operativo Q1 - Copia',
        2, -- Encuesta Normal
        DATE_SUB(CURDATE(), INTERVAL 30 DAY),
        DATE_SUB(CURDATE(), INTERVAL 15 DAY),
        1, -- Status Activa
        NULL, NULL, NULL, NULL,
        1, '1014',
        1, -- Activada
        1, 1, 1, '1'
    )";
    $ev_copia_comp_id = $conn->InsertAndGetId($qCopiaCompletada, []);
    echo "  - Creada Evaluación Copia Completada con ID: $ev_copia_comp_id\n";
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev_copia_comp_id)", []);

    // Detalle de evaluado completado (StatusEvaluado = 1)
    $det_copia_comp = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev_copia_comp_id, $target_employee, $target_employee, 1, 1, 0, 0, 1, 0, $target_level, $target_position)", []);
    
    // Agregar 1 pregunta y 1 respuesta para que conste como contestada
    $qCopiaCompPreg = $conn->InsertAndGetId("INSERT INTO PreguntasEvaluacion (idEvaluaciones, idTipoPregunta, idCompetencias, Titulo, Descripcion) VALUES ($ev_copia_comp_id, 1, 2, '¿El colaborador entregó sus reportes semanales a tiempo?', 'Pregunta única')", []);
    $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, BoolCorreta) VALUES ($qCopiaCompPreg, 1)", []);
    $conn->ExecuteQuery("INSERT INTO RespuestaEvaluaciones (idEvaluacionDetalle, idCompetencias, Registro, Comentarios, Calificacion, idPreguntasEvaluacion) VALUES ($det_copia_comp, 2, NOW(), 'Cumplió cabalmente con todos sus reportes.', '1', $qCopiaCompPreg)", []);


    // 7.3 Encuesta Normal - Pendiente (FechaFin en el futuro, no contestada)
    $qEncuestaPendiente = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Encuesta de Satisfacción del Cliente Interno 2026',
        2, -- Encuesta Normal
        DATE_SUB(CURDATE(), INTERVAL 1 DAY),
        DATE_ADD(CURDATE(), INTERVAL 15 DAY),
        1, -- Status Activa
        NULL, NULL, NULL, NULL,
        1, '1014',
        1, -- Activada
        1, 1, 1, '1'
    )";
    $ev_enc_pend_id = $conn->InsertAndGetId($qEncuestaPendiente, []);
    echo "  - Creada Encuesta Normal Pendiente con ID: $ev_enc_pend_id\n";
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev_enc_pend_id)", []);
    
    // Detalle de evaluado pendiente (StatusEvaluado = 0)
    $det_enc_pend = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev_enc_pend_id, $target_employee, $target_employee, 1, 0, 0, 0, 1, 0, $target_level, $target_position)", []);
    $qEncPendPreg = $conn->InsertAndGetId("INSERT INTO PreguntasEvaluacion (idEvaluaciones, idTipoPregunta, idCompetencias, Titulo, Descripcion) VALUES ($ev_enc_pend_id, 1, 4, '¿Considera oportuno el servicio prestado por el área de soporte técnico?', 'Clima organizacional')", []);
    $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, BoolCorreta) VALUES ($qEncPendPreg, 1)", []);
    $conn->ExecuteQuery("INSERT INTO RespuestaEvaluaciones (idEvaluacionDetalle, idCompetencias, Registro, Comentarios, Calificacion, idPreguntasEvaluacion) VALUES ($det_enc_pend, 4, NOW(), NULL, NULL, $qEncPendPreg)", []);


    // 7.4 Evaluación 360° - Copia y Pendiente (FechaFin en el futuro)
    $q360CopiaPend = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Evaluación 360° Liderazgo Mandos Medios - Copia',
        1, -- 360°
        DATE_SUB(CURDATE(), INTERVAL 2 DAY),
        DATE_ADD(CURDATE(), INTERVAL 10 DAY),
        1, -- Status Activa
        DATE_ADD(CURDATE(), INTERVAL 11 DAY),
        DATE_ADD(CURDATE(), INTERVAL 20 DAY),
        DATE_ADD(CURDATE(), INTERVAL 11 DAY),
        DATE_ADD(CURDATE(), INTERVAL 40 DAY),
        1, '1014',
        1, -- Activada
        1, 1, 1, '1'
    )";
    $ev_360_copia_id = $conn->InsertAndGetId($q360CopiaPend, []);
    echo "  - Creada 360° Copia Pendiente con ID: $ev_360_copia_id\n";
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev_360_copia_id)", []);

    // Crear detalles de evaluadores en la 360 Copia (Pendientes)
    $det3_boss = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev_360_copia_id, $boss_employee, $target_employee, 1, 0, 1, 0, 0, 0, $target_level, $target_position)", []);
    $det3_self = $conn->InsertAndGetId("INSERT INTO EvaluacionDetalle (idEvaluaciones, NoEmpleadoEvalua, NoEmpleadoEvaluado, Status, StatusEvaluado, JefeEvalua, ParEvalua, AutoEvalua, SubordinadoEvalua, NivelEvaluado, PuestoEvaluado) VALUES ($ev_360_copia_id, $target_employee, $target_employee, 1, 0, 0, 0, 1, 0, $target_level, $target_position)", []);
    
    // Pregunta para esta 360 Copia
    $q360CopiaPreg = $conn->InsertAndGetId("INSERT INTO PreguntasEvaluacion (idEvaluaciones, idTipoPregunta, idCompetencias, Titulo, Descripcion) VALUES ($ev_360_copia_id, 1, 14, '¿Maneja adecuadamente la delegación de responsabilidades?', 'Pregunta de liderazgo')", []);
    $conn->ExecuteQuery("INSERT INTO PreguntasConfiguracion (idPreguntasEvaluacion, BoolCorreta) VALUES ($q360CopiaPreg, 1)", []);
    
    $conn->ExecuteQuery("INSERT INTO RespuestaEvaluaciones (idEvaluacionDetalle, idCompetencias, Registro, Comentarios, Calificacion, idPreguntasEvaluacion) VALUES ($det3_boss, 14, NOW(), NULL, NULL, $q360CopiaPreg)", []);
    $conn->ExecuteQuery("INSERT INTO RespuestaEvaluaciones (idEvaluacionDetalle, idCompetencias, Registro, Comentarios, Calificacion, idPreguntasEvaluacion) VALUES ($det3_self, 14, NOW(), NULL, NULL, $q360CopiaPreg)", []);


    // 7.5 Evaluación Inactiva/Eliminada (Status = 0)
    $qInactiva = "INSERT INTO Evaluaciones (
        Titulo, TipoEvaluacion, FechaInicio, FechaFin, Status, 
        RetroFechaIni, RetroFechaFin, PlanAFechaIni, PlanAFechaFin, 
        DirigidoA, EmpleadosParticipantes, Activado, PreguntasAceptadas,
        TipoSeleccionaSucursal, TipoOpcionConfiguracion, Falla
    ) VALUES (
        'Evaluación 360° Clima y Cultura Organizacional - Inactiva',
        1,
        DATE_SUB(CURDATE(), INTERVAL 60 DAY),
        DATE_SUB(CURDATE(), INTERVAL 45 DAY),
        0, -- STATUS = 0 (Eliminada/Inactiva)
        NULL, NULL, NULL, NULL,
        1, '1014',
        1, 1, 1, 1, '1'
    )";
    $ev_inactiva_id = $conn->InsertAndGetId($qInactiva, []);
    echo "  - Creada Evaluación Inactiva con ID: $ev_inactiva_id\n";
    $conn->ExecuteQuery("INSERT INTO ConfiguracionInicialEvaluacion (IdSucursal, idEvaluaciones) VALUES (1, $ev_inactiva_id)", []);


    // -------------------------------------------------------------------------
    // 8. CREACIÓN DE NUEVOS REPORTES DE LÍNEA ÉTICA
    // -------------------------------------------------------------------------
    echo "\nCreando nuevos reportes profesionales de Línea Ética...\n";

    $reportes = [
        [
            "cat" => 4, // Acoso laboral
            "emp" => 999999999, // Anónimo
            "msg" => "Se reporta una situación reiterada de malos tratos y gritos por parte del supervisor del área de almacén durante las entregas matutinas. Varios compañeros nos sentimos intimidados al reportar incidencias ordinarias.",
            "rev" => 0, // No revisado
            "msg_rev" => 1,
            "div" => 2,
            "suc" => 2
        ],
        [
            "cat" => 5, // Conflicto de interés
            "emp" => $peer_employee, // Felipe Ramírez
            "msg" => "He detectado que uno de los proveedores de servicios de TI recientemente contratados es familiar directo del líder de infraestructura, sin que se haya realizado el proceso de licitación de tres propuestas como dicta el manual corporativo.",
            "rev" => 0, // No revisado
            "msg_rev" => 1,
            "div" => 3,
            "suc" => 4
        ],
        [
            "cat" => 1, // Robo o fraude (asumiendo id 1 como se vio)
            "emp" => 999999999, // Anónimo
            "msg" => "Se sospecha de un desvío menor de materiales y consumibles de oficina los días viernes por la tarde, ya que los inventarios físicos no coinciden con los registros del sistema.",
            "rev" => 1, // Ya revisado
            "msg_rev" => 1,
            "div" => 2,
            "suc" => 1
        ],
        [
            "cat" => 2, // Conductas inapropiadas
            "emp" => $subordinate_employee, // María Elena Salinas
            "msg" => "El personal de seguridad externa utiliza un lenguaje inapropiado y despectivo al controlar el acceso vehicular en la entrada principal, lo cual da una mala imagen a las visitas y personal de la empresa.",
            "rev" => 1, // Ya revisado
            "msg_rev" => 1,
            "div" => 1,
            "suc" => 1
        ],
        [
            "cat" => 6, // Faltas al reglamento interno de trabajo
            "emp" => 999999999, // Anónimo
            "msg" => "Se reporta el uso recurrente de equipos y herramientas de la empresa para fines personales fuera del horario laboral, sin contar con la autorización por escrito de la gerencia de planta.",
            "rev" => 0, // No revisado
            "msg_rev" => 1,
            "div" => 4,
            "suc" => 5
        ]
    ];

    foreach ($reportes as $rep) {
        $conn->ExecuteQuery(
            "INSERT INTO LineaEticaMensajes (idCatalogoLineaEtica, NoEmpleado, Registro, Mensaje, Revisado, MensajeRevisado, id_division, IdSucursal) VALUES ({$rep['cat']}, {$rep['emp']}, DATE_SUB(NOW(), INTERVAL rand()*10 DAY), ?, {$rep['rev']}, {$rep['msg_rev']}, {$rep['div']}, {$rep['suc']})",
            [$rep['msg']]
        );
    }
    echo "  - 5 reportes de línea ética creados con éxito.\n";


    echo "\n========================================================================\n";
    echo "  ¡PROCESO DE SEMBRADO DE EVALUACIONES ADICIONALES Y LÍNEA ÉTICA COMPLETADO!  \n";
    echo "========================================================================\n\n";

} catch (Exception $e) {
    echo "\n[ERROR] Ocurrió un error en el sembrado:\n" . $e->getMessage() . "\n";
}
?>
