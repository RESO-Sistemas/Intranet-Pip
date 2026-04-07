<?php
// Iniciar sesión para mantener al candidato logueado
session_start();

// Validar sesión activa
$is_logged_in = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
if (!$is_logged_in) {
    header("Location: EstatusPostulante.php");
    exit;
}

// Obtener IdPostulanteEvaluacion desde URL
$IdPostulanteEvaluacion = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($IdPostulanteEvaluacion === 0) {
    header("Location: EstatusPostulante.php");
    exit;
}

$curp_candidato = $_SESSION['curp_candidato'];
$nombre_candidato = $_SESSION['nombre_candidato'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responder Evaluación - Portal del Candidato PIP</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        /* Estilos heredados de EstatusPostulante.php para consistencia */
        .bg-dot-pattern {
            background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background-size: 24px 24px;
        }

        .glow-orb {
            filter: blur(100px);
            opacity: 0.12;
            pointer-events: none;
            position: absolute;
            border-radius: 50%;
            z-index: 0;
        }

        .magic-card {
            position: relative;
            border-radius: 16px;
            background: #1e1e1e;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .minimal-input, .minimal-textarea {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            color: white;
            padding: 0.75rem 0;
            font-size: 0.95rem;
            transition: all 0.3s;
            width: 100%;
        }
        .minimal-input:focus, .minimal-textarea:focus {
            outline: none;
            border-bottom-color: #f2bb46;
            box-shadow: 0 1px 0 0 #f2bb46;
        }
        .minimal-input::placeholder, .minimal-textarea::placeholder {
            color: rgba(255,255,255,0.3);
        }
        .minimal-input:read-only, .minimal-textarea:read-only {
            opacity: 0.6;
            cursor: not-allowed;
            background: rgba(255,255,255,0.02);
        }

        .minimal-textarea {
            resize: none;
            min-height: 120px;
            padding-top: 0.75rem;
        }

        .ripple-btn {
            position: relative;
            overflow: hidden;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .animate-float {
            animation: float 12s ease-in-out infinite;
        }

        .fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Estilos para opciones de radio/checkbox */
        .option-label {
            cursor: pointer;
            transition: all 0.2s;
        }
        .option-label:hover {
            background: rgba(255, 255, 255, 0.08);
        }
        .option-label input[type="radio"]:checked ~ .option-text,
        .option-label input[type="checkbox"]:checked ~ .option-text {
            color: #f2bb46;
            font-weight: 600;
        }

        /* Estilos para range input */
        input[type="range"] {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.1);
            outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f2bb46;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(242, 187, 70, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f2bb46;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(242, 187, 70, 0.5);
        }

        /* Notificaciones Toast */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            background: #1e1e1e;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .toast.success { border-color: #22c55e; }
        .toast.error { border-color: #ef4444; }
        .toast.warning { border-color: #f2bb46; }

        /* Modal */
        .modal-backdrop {
            transition: opacity 0.3s ease;
        }
        .modal-content-wrapper {
            transition: all 0.3s ease;
        }

        /* Loading spinner */
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top: 3px solid #f2bb46;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Pregunta card */
        .pregunta-card {
            border-left: 3px solid rgba(242, 187, 70, 0.3);
        }
    </style>
</head>
<body class="min-h-screen bg-[#121212] text-white selection:bg-[#f2bb46] selection:text-black font-sans flex flex-col">
    
    <!-- Background decorativo -->
    <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-dot-pattern opacity-40"></div>
        <div class="glow-orb w-[600px] h-[600px] bg-[#f2bb46] top-[-10%] left-[-10%] animate-float"></div>
        <div class="glow-orb w-[500px] h-[500px] bg-blue-900/40 bottom-[-10%] right-[-5%] animate-float" style="animation-delay: -6s;"></div>
    </div>

    <div class="relative z-10 flex-1 flex flex-col">
        <!-- Header -->
        <header class="pt-12 pb-8 px-4">
            <div class="max-w-5xl mx-auto">
                <div class="mb-8 flex justify-center">
                    <img 
                        src="assets/images/logo-pip.png" 
                        alt="Logo PIP" 
                        class="w-48 md:w-56 h-auto object-contain" 
                    />
                </div>
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div class="text-center md:text-left">
                        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-[#f2bb46] uppercase tracking-[0.2em] mb-3">
                            <i data-lucide="clipboard-check" class="w-3.5 h-3.5"></i>
                            Evaluación
                        </div>
                        <h1 class="text-2xl font-bold text-white" id="evaluacion-titulo">Cargando evaluación...</h1>
                        <p class="text-gray-400 text-sm mt-1" id="evaluacion-subtitulo">Preparando preguntas...</p>
                    </div>
                    <a href="EstatusPostulante.php" class="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-semibold">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Volver al Portal
                    </a>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 px-6 pb-20 w-full max-w-5xl mx-auto">
            
            <!-- Loading State -->
            <div id="loading-state" class="magic-card p-12 flex flex-col items-center justify-center text-center">
                <div class="spinner mb-4"></div>
                <p class="text-gray-400">Cargando evaluación...</p>
            </div>

            <!-- Error State -->
            <div id="error-state" class="hidden magic-card p-12 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <i data-lucide="alert-circle" class="w-8 h-8 text-red-500"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">Error al cargar evaluación</h3>
                <p class="text-gray-400 mb-4" id="error-message">Ha ocurrido un error inesperado.</p>
                <a href="EstatusPostulante.php" class="px-6 py-3 bg-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-colors">
                    Volver al Portal
                </a>
            </div>

            <!-- Evaluación Container -->
            <div id="evaluacion-container" class="hidden fade-in">
                <div class="magic-card p-6 md:p-8">
                    
                    <!-- Barra de progreso -->
                    <div class="mb-8 p-5 bg-white/5 rounded-xl border border-white/10">
                        <div class="flex justify-between text-sm mb-3">
                            <span class="text-gray-400 font-semibold">Progreso de la evaluación</span>
                            <span class="text-[#f2bb46] font-bold" id="progreso-texto">0 de 0 respondidas</span>
                        </div>
                        <div class="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <div id="barra-progreso" class="bg-gradient-to-r from-[#f2bb46] to-yellow-300 h-3 rounded-full transition-all duration-500 shadow-lg shadow-[#f2bb46]/30" style="width: 0%"></div>
                        </div>
                    </div>

                    <div id="debug-json-panel" class="hidden mb-8 p-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                        <div class="flex items-center gap-2 mb-2 text-cyan-300">
                            <i data-lucide="bug" class="w-4 h-4"></i>
                            <p class="text-xs font-bold uppercase tracking-widest">Debug JSON - Respuestas API</p>
                        </div>
                        <p class="text-xs text-gray-400 mb-4">Activa/desactiva con <code class="text-cyan-300">?debugJson=1</code> en la URL.</p>
                        <pre id="debug-json-content" class="text-[11px] leading-relaxed text-cyan-100 bg-black/30 border border-white/10 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap"></pre>
                    </div>

                    <!-- Formulario de preguntas -->
                    <div id="preguntas-container" class="space-y-8">
                        <!-- Las preguntas se renderizan aquí dinámicamente -->
                    </div>

                    <!-- Botones de acción -->
                    <div id="acciones-container" class="mt-10 flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                        <button 
                            id="btn-guardar" 
                            onclick="guardarRespuestas()"
                            class="ripple-btn flex-1 bg-white/10 text-white font-bold py-4 px-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                            <i data-lucide="save" class="w-4 h-4"></i>
                            <span>Guardar progreso</span>
                        </button>
                        <button 
                            id="btn-finalizar" 
                            onclick="finalizarEvaluacion()"
                            class="ripple-btn flex-1 text-[#1e1e1e] bg-[#f2bb46] font-extrabold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(242,187,70,0.3)] hover:shadow-[0_0_30px_rgba(242,187,70,0.5)] transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <i data-lucide="check-circle" class="w-4 h-4"></i>
                            <span>Finalizar evaluación</span>
                        </button>
                    </div>

                    <!-- Vista de evaluación completada -->
                    <div id="evaluacion-completada" class="hidden text-center py-12">
                        <div class="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 mx-auto">
                            <i data-lucide="award" class="w-12 h-12 text-green-500"></i>
                        </div>
                        <h3 class="text-3xl font-bold mb-3 text-green-400">¡Evaluación completada!</h3>
                        <p class="text-gray-400 mb-2">Has finalizado esta evaluación exitosamente.</p>
                        <div class="text-6xl font-extrabold text-[#f2bb46] my-6" id="calificacion-final">--</div>
                        <p class="text-sm text-gray-500 mb-8">Esta evaluación ya no puede ser modificada.</p>
                        <a href="EstatusPostulante.php" class="inline-flex items-center gap-2 px-8 py-4 bg-[#f2bb46] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#f2bb46]/30 transition-all">
                            <i data-lucide="arrow-left" class="w-4 h-4"></i>
                            Volver al Portal
                        </a>
                    </div>

                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="py-8 border-t border-white/5 text-center">
            <p class="text-[10px] text-gray-600 tracking-[0.3em] uppercase font-bold">
                © <span id="current-year"></span> PIP by lugo. Todos los derechos reservados.
            </p>
        </footer>
    </div>

    <!-- Modal de éxito -->
    <div id="modal-exito" class="modal-backdrop fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="modal-content-wrapper w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl p-8 text-center scale-95 opacity-0">
            <div class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-5 mx-auto">
                <i data-lucide="check-circle-2" class="w-12 h-12 text-green-500"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">¡Evaluación finalizada!</h3>
            <p class="text-gray-400 mb-2">Has completado la evaluación exitosamente.</p>
            <div class="text-5xl font-extrabold text-[#f2bb46] my-6" id="modal-calificacion">--</div>
            <p class="text-sm text-gray-500 mb-6">Puedes ver el resultado en tu portal.</p>
            <button 
                onclick="window.location.href='EstatusPostulante.php'" 
                class="w-full px-8 py-4 bg-[#f2bb46] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#f2bb46]/30 transition-all">
                Volver al Portal
            </button>
        </div>
    </div>

    <script>
        lucide.createIcons();
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Variables globales
        const ID_EVALUACION = <?php echo $IdPostulanteEvaluacion; ?>;
        const DEBUG_JSON = new URLSearchParams(window.location.search).get('debugJson') === '1';
        let ESTATUS_EVALUACION = 0;
        let PREGUNTAS = [];
        let TOTAL_PREGUNTAS = 0;
        let DEBUG_DATA = {
            getPreguntas: null,
            savePayload: null,
            saveResponse: null,
            finalizarResponse: null
        };

        // Cargar evaluación al iniciar
        document.addEventListener('DOMContentLoaded', function() {
            cargarEvaluacion();
        });

        // ==========================================
        // CARGAR EVALUACIÓN
        // ==========================================
        async function cargarEvaluacion() {
            try {
                const formData = new FormData();
                formData.append("op", "getPreguntasEvaluacionPostulante");
                formData.append("IdPostulanteEvaluacion", ID_EVALUACION);
                
                const response = await fetch("Backend/EvaluacionesPostulante/App.php", {
                    method: "POST",
                    credentials: "same-origin",
                    body: formData
                });
                
                const data = await response.json();
                DEBUG_DATA.getPreguntas = data;
                renderDebugJson();
                
                if (data.Resultado) {
                    ESTATUS_EVALUACION = data.Estatus;
                    PREGUNTAS = data.Data;
                    TOTAL_PREGUNTAS = PREGUNTAS.length;
                    
                    // Obtener info de la evaluación (primera pregunta tiene los datos)
                    if (PREGUNTAS.length > 0) {
                        const primeraPregunta = PREGUNTAS[0];
                        // Los datos de evaluación vienen desde la API en la respuesta general
                    }
                    
                    mostrarEvaluacion();
                    renderizarPreguntas();
                    actualizarProgreso();
                    
                    if (ESTATUS_EVALUACION === 3) {
                        mostrarVistaCompletada();
                    }
                } else {
                    mostrarError(data.Msg || "No se pudo cargar la evaluación. Puede que no tengas permisos o la evaluación no existe.");
                }
            } catch (error) {
                console.error('Error al cargar evaluación:', error);
                mostrarError("Error de conexión al cargar la evaluación.");
            }
        }

        // ==========================================
        // MOSTRAR EVALUACIÓN
        // ==========================================
        function mostrarEvaluacion() {
            document.getElementById('loading-state').classList.add('hidden');
            document.getElementById('evaluacion-container').classList.remove('hidden');
            
            // Actualizar título (lo tomaremos del backend o pondremos uno genérico)
            document.getElementById('evaluacion-titulo').textContent = 'Evaluación del proceso';
            document.getElementById('evaluacion-subtitulo').textContent = `${TOTAL_PREGUNTAS} pregunta${TOTAL_PREGUNTAS !== 1 ? 's' : ''} por responder`;
        }

        // ==========================================
        // MOSTRAR ERROR
        // ==========================================
        function mostrarError(mensaje) {
            document.getElementById('loading-state').classList.add('hidden');
            document.getElementById('error-state').classList.remove('hidden');
            document.getElementById('error-message').textContent = mensaje;
        }

        function resolverTipoRenderPregunta(pregunta) {
            const tipoTexto = String(pregunta.TipoPregunta || '').toLowerCase();
            const tipoId = parseInt(pregunta.idTipoPregunta, 10);

            if (tipoTexto.includes('verdadero') && tipoTexto.includes('falso')) {
                return 'verdadero_falso';
            }

            if (tipoId === 2 || tipoId === 4) {
                return 'opcion_unica';
            }

            if (tipoId === 3) {
                return 'rango';
            }

            return 'abierta';
        }

        // ==========================================
        // RENDERIZAR PREGUNTAS
        // ==========================================
        function renderizarPreguntas() {
            const container = document.getElementById('preguntas-container');
            container.innerHTML = '';
            
            PREGUNTAS.forEach((pregunta, index) => {
                let inputHTML = "";

                const tipoRender = resolverTipoRenderPregunta(pregunta);

                switch(tipoRender) {
                    case 'abierta':
                        inputHTML = `
                            <textarea 
                                name="respuesta_${pregunta.IdPregunta}" 
                                class="minimal-textarea w-full" 
                                placeholder="Escribe tu respuesta aquí..."
                                ${ESTATUS_EVALUACION === 3 ? 'readonly' : ''}
                            >${pregunta.RespuestaPrevia || ''}</textarea>
                        `;
                        break;

                    case 'opcion_unica':
                    case 'verdadero_falso':
                        {
                        const opciones = (pregunta.Opciones && pregunta.Opciones.length > 0)
                            ? pregunta.Opciones
                            : [
                                { IdOpcion: 'vf_true', Texto: 'Verdadero' },
                                { IdOpcion: 'vf_false', Texto: 'Falso' }
                            ];

                        inputHTML = '<div class="space-y-2 mt-3">';
                        opciones.forEach(op => {
                                const isChecked = pregunta.RespuestaPrevia === op.Texto;
                                inputHTML += `
                                    <label class="option-label flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                                        <input 
                                            type="radio" 
                                            name="respuesta_${pregunta.IdPregunta}" 
                                            value="${escapeHtml(op.Texto)}"
                                            ${isChecked ? 'checked' : ''}
                                            ${ESTATUS_EVALUACION === 3 ? 'disabled' : ''}
                                            onchange="actualizarProgreso()"
                                            class="w-4 h-4 text-[#f2bb46] bg-transparent border-gray-300 focus:ring-[#f2bb46]"
                                        >
                                        <span class="option-text text-sm flex-1">${escapeHtml(op.Texto)}</span>
                                    </label>
                                `;
                        });
                        inputHTML += '</div>';
                        }
                        break;

                    case 'rango':
                        const rangoInicial = pregunta.Rango ? pregunta.Rango.RangoInicial : 1;
                        const rangoFinal = pregunta.Rango ? pregunta.Rango.RangoFinal : 10;
                        const valorActual = pregunta.RespuestaPrevia || rangoInicial;
                        inputHTML = `
                            <div class="mt-4">
                                <input 
                                    type="range" 
                                    name="respuesta_${pregunta.IdPregunta}" 
                                    min="${rangoInicial}" 
                                    max="${rangoFinal}"
                                    value="${valorActual}"
                                    ${ESTATUS_EVALUACION === 3 ? 'disabled' : ''}
                                    class="w-full mb-4"
                                    oninput="document.getElementById('valor_${pregunta.IdPregunta}').textContent = this.value; actualizarProgreso();"
                                >
                                <div class="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>${rangoInicial}</span>
                                    <span>${rangoFinal}</span>
                                </div>
                                <div class="text-center text-[#f2bb46] font-bold text-3xl mt-4">
                                    <span id="valor_${pregunta.IdPregunta}">${valorActual}</span>
                                </div>
                            </div>
                        `;
                        break;
                }
                
                // Crear card de pregunta
                const preguntaCard = document.createElement('div');
                preguntaCard.className = 'pregunta-card p-6 rounded-xl bg-white/5 border-l-3';
                preguntaCard.dataset.preguntaId = pregunta.IdPregunta;
                preguntaCard.dataset.tipoRender = tipoRender;
                
                preguntaCard.innerHTML = `
                    <div class="flex items-start gap-3 mb-4">
                        <div class="w-10 h-10 rounded-full bg-[#f2bb46]/20 flex items-center justify-center flex-shrink-0">
                            <span class="text-[#f2bb46] font-bold text-sm">${index + 1}</span>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-white mb-1">${escapeHtml(pregunta.Titulo)}</h3>
                            ${pregunta.Descripcion ? `<p class="text-sm text-gray-400 mb-2">${escapeHtml(pregunta.Descripcion)}</p>` : ''}
                            ${pregunta.Competencia ? `<span class="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">${escapeHtml(pregunta.Competencia)}</span>` : ''}
                        </div>
                    </div>
                    ${inputHTML}
                `;
                
                container.appendChild(preguntaCard);
            });
            
            lucide.createIcons();
        }

        // ==========================================
        // ACTUALIZAR PROGRESO
        // ==========================================
        function actualizarProgreso() {
            const respondidas = contarPreguntasRespondidas();
            const porcentaje = TOTAL_PREGUNTAS > 0 ? (respondidas / TOTAL_PREGUNTAS) * 100 : 0;
            
            document.getElementById('progreso-texto').textContent = `${respondidas} de ${TOTAL_PREGUNTAS} respondidas`;
            document.getElementById('barra-progreso').style.width = `${porcentaje}%`;
            
            // Habilitar/deshabilitar botón finalizar
            const btnFinalizar = document.getElementById('btn-finalizar');
            if (respondidas === TOTAL_PREGUNTAS && ESTATUS_EVALUACION !== 3) {
                btnFinalizar.disabled = false;
            } else {
                btnFinalizar.disabled = true;
            }
        }

        // ==========================================
        // CONTAR PREGUNTAS RESPONDIDAS
        // ==========================================
        function contarPreguntasRespondidas() {
            let contador = 0;
            const preguntas = document.querySelectorAll('[data-pregunta-id]');
            
            preguntas.forEach(pregunta => {
                const idPregunta = pregunta.dataset.preguntaId;
                const tipoRender = pregunta.dataset.tipoRender;
                
                if (tipoRender === 'abierta') {
                    const textarea = pregunta.querySelector(`textarea[name="respuesta_${idPregunta}"]`);
                    if (textarea && textarea.value.trim() !== '') {
                        contador++;
                    }
                } else if (tipoRender === 'opcion_unica' || tipoRender === 'verdadero_falso') {
                    const checked = pregunta.querySelector(`input[name="respuesta_${idPregunta}"]:checked`);
                    if (checked) {
                        contador++;
                    }
                } else if (tipoRender === 'rango') {
                    contador++;
                }
            });
            
            return contador;
        }

        // ==========================================
        // OBTENER RESPUESTAS
        // ==========================================
        function obtenerRespuestas() {
            const respuestas = [];
            const preguntas = document.querySelectorAll('[data-pregunta-id]');
            
            preguntas.forEach(pregunta => {
                const idPregunta = parseInt(pregunta.dataset.preguntaId);
                const tipoRender = pregunta.dataset.tipoRender;
                let respuesta = "";
                
                if (tipoRender === 'abierta') {
                    const textarea = pregunta.querySelector(`textarea[name="respuesta_${idPregunta}"]`);
                    respuesta = textarea ? textarea.value.trim() : "";
                } else if (tipoRender === 'opcion_unica' || tipoRender === 'verdadero_falso') {
                    const checked = pregunta.querySelector(`input[name="respuesta_${idPregunta}"]:checked`);
                    respuesta = checked ? checked.value : "";
                } else if (tipoRender === 'rango') {
                    const range = pregunta.querySelector(`input[name="respuesta_${idPregunta}"]`);
                    respuesta = range ? range.value : "";
                }
                
                if (respuesta !== "") {
                    respuestas.push({ IdPregunta: idPregunta, Respuesta: respuesta });
                }
            });
            
            return respuestas;
        }

        // ==========================================
        // GUARDAR RESPUESTAS
        // ==========================================
        async function guardarRespuestas() {
            if (ESTATUS_EVALUACION === 3) {
                mostrarToast('Esta evaluación ya está completada', 'warning');
                return;
            }
            
            const respuestas = obtenerRespuestas();
            DEBUG_DATA.savePayload = {
                op: 'saveRespuestasPostulante',
                IdPostulanteEvaluacion: ID_EVALUACION,
                respuestas: respuestas
            };
            renderDebugJson();
            
            if (respuestas.length === 0) {
                mostrarToast('No hay respuestas para guardar', 'warning');
                return;
            }
            
            const btnGuardar = document.getElementById('btn-guardar');
            const textoOriginal = btnGuardar.innerHTML;
            btnGuardar.disabled = true;
            btnGuardar.innerHTML = '<div class="spinner mx-auto" style="width: 20px; height: 20px; border-width: 2px;"></div>';
            
            try {
                const formData = new FormData();
                formData.append("op", "saveRespuestasPostulante");
                formData.append("IdPostulanteEvaluacion", ID_EVALUACION);
                formData.append("respuestas", JSON.stringify(respuestas));
                
                const response = await fetch("Backend/EvaluacionesPostulante/App.php", {
                    method: "POST",
                    credentials: "same-origin",
                    body: formData
                });
                
                const data = await response.json();
                DEBUG_DATA.saveResponse = data;
                renderDebugJson();
                
                if (data.Resultado) {
                    mostrarToast(data.Msg || 'Progreso guardado correctamente', 'success');
                } else {
                    mostrarToast(data.Msg || 'Error al guardar respuestas', 'error');
                }
            } catch (error) {
                console.error('Error al guardar:', error);
                mostrarToast('Error de conexión al guardar', 'error');
            } finally {
                btnGuardar.disabled = false;
                btnGuardar.innerHTML = textoOriginal;
                lucide.createIcons();
            }
        }

        // ==========================================
        // FINALIZAR EVALUACIÓN
        // ==========================================
        async function finalizarEvaluacion() {
            if (ESTATUS_EVALUACION === 3) {
                mostrarToast('Esta evaluación ya está completada', 'warning');
                return;
            }
            
            const respondidas = contarPreguntasRespondidas();
            if (respondidas < TOTAL_PREGUNTAS) {
                mostrarToast(`Faltan ${TOTAL_PREGUNTAS - respondidas} pregunta(s) por responder`, 'warning');
                return;
            }
            
            if (!confirm('¿Estás seguro de finalizar esta evaluación? Una vez finalizada no podrás modificar tus respuestas.')) {
                return;
            }
            
            const btnFinalizar = document.getElementById('btn-finalizar');
            const textoOriginal = btnFinalizar.innerHTML;
            btnFinalizar.disabled = true;
            btnFinalizar.innerHTML = '<div class="spinner mx-auto" style="width: 20px; height: 20px; border-width: 2px;"></div>';
            
            try {
                // Primero guardar respuestas
                await guardarRespuestas();
                
                // Luego finalizar
                const formData = new FormData();
                formData.append("op", "finalizarEvaluacionPostulante");
                formData.append("IdPostulanteEvaluacion", ID_EVALUACION);
                
                const response = await fetch("Backend/EvaluacionesPostulante/App.php", {
                    method: "POST",
                    credentials: "same-origin",
                    body: formData
                });
                
                const data = await response.json();
                DEBUG_DATA.finalizarResponse = data;
                renderDebugJson();
                
                if (data.Resultado) {
                    mostrarModalExito(data.Calificacion);
                } else {
                    mostrarToast(data.Msg || 'Error al finalizar evaluación', 'error');
                    btnFinalizar.disabled = false;
                    btnFinalizar.innerHTML = textoOriginal;
                    lucide.createIcons();
                }
            } catch (error) {
                console.error('Error al finalizar:', error);
                mostrarToast('Error de conexión al finalizar', 'error');
                btnFinalizar.disabled = false;
                btnFinalizar.innerHTML = textoOriginal;
                lucide.createIcons();
            }
        }

        // ==========================================
        // MOSTRAR VISTA COMPLETADA
        // ==========================================
        function mostrarVistaCompletada() {
            document.getElementById('preguntas-container').classList.add('opacity-60');
            document.getElementById('acciones-container').classList.add('hidden');
            document.getElementById('evaluacion-completada').classList.remove('hidden');
            
            // Intentar obtener la calificación desde los datos
            // (En este caso, necesitamos hacer una llamada adicional o pasarla desde el inicio)
            // Por ahora, dejaremos que se muestre cuando finalice
        }

        // ==========================================
        // MOSTRAR MODAL ÉXITO
        // ==========================================
        function mostrarModalExito(calificacion) {
            const modal = document.getElementById('modal-exito');
            const modalContent = modal.querySelector('.modal-content-wrapper');
            
            document.getElementById('modal-calificacion').textContent = `${parseFloat(calificacion).toFixed(0)}%`;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
            
            lucide.createIcons();
        }

        // ==========================================
        // MOSTRAR TOAST
        // ==========================================
        function mostrarToast(mensaje, tipo = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${tipo}`;
            
            let icon = 'check-circle';
            if (tipo === 'error') icon = 'x-circle';
            if (tipo === 'warning') icon = 'alert-circle';
            
            toast.innerHTML = `
                <div class="flex items-center gap-3">
                    <i data-lucide="${icon}" class="w-5 h-5"></i>
                    <span class="font-semibold">${mensaje}</span>
                </div>
            `;
            
            document.body.appendChild(toast);
            lucide.createIcons();
            
            setTimeout(() => {
                toast.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        function renderDebugJson() {
            if (!DEBUG_JSON) return;
            const panel = document.getElementById('debug-json-panel');
            const content = document.getElementById('debug-json-content');
            if (!panel || !content) return;

            panel.classList.remove('hidden');
            const safe = escapeHtml(JSON.stringify(DEBUG_DATA, null, 2));
            content.innerHTML = safe;
            lucide.createIcons();
        }

        // ==========================================
        // UTILIDADES
        // ==========================================
        function escapeHtml(text) {
            if (!text) return '';
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, m => map[m]);
        }
    </script>
</body>
</html>
