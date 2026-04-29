<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }
// Redirigir si no hay sesión
if (empty($_SESSION['ibero_logged_in']) || !$_SESSION['ibero_logged_in']) {
    header("Location: EstatusPostulanteIbero.php"); exit;
}
$idPE      = intval($_GET['id'] ?? 0);
$candidato = ($_SESSION['ibero_nombre_candidato']??'').' '.($_SESSION['ibero_apellido_p_candidato']??'');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responder Evaluación — IBERO</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={theme:{extend:{colors:{ibero:{DEFAULT:'#c0392b',dark:'#922b21',light:'#e74c3c'}},fontFamily:{sans:['Inter','sans-serif']}}}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <style>
        * { box-sizing:border-box; }
        body { font-family:'Inter',sans-serif; background:#0a0a0a; color:#e5e5e5; }
        ::selection { background:#c0392b; color:white; }
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
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .animate-float {
            animation: float 12s ease-in-out infinite;
        }
        input:focus, select:focus, textarea:focus { outline:none; border-color:#c0392b!important; box-shadow:0 0 0 2px rgba(192,57,43,0.2)!important; }
        .question-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:1rem; padding:1.5rem; margin-bottom:1rem; transition:border-color .2s; }
        .question-card.answered { border-color:rgba(39,174,96,0.4); }
        .option-btn { width:100%; text-align:left; padding:0.75rem 1rem; border-radius:0.75rem; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:#ccc; cursor:pointer; transition:all .2s; margin-bottom:0.5rem; font-size:0.9rem; }
        .option-btn:hover { border-color:rgba(192,57,43,0.5); color:white; background:rgba(192,57,43,0.08); }
        .option-btn.selected { border-color:#c0392b; background:rgba(192,57,43,0.2); color:white; font-weight:600; }
        .tf-btn { display:inline-flex; align-items:center; gap:8px; padding:0.6rem 1.2rem; border-radius:0.75rem; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:#ccc; cursor:pointer; transition:all .2s; margin-right:8px; font-size:0.9rem; }
        .tf-btn.selected-true { border-color:#27ae60; background:rgba(39,174,96,0.2); color:#2ecc71; font-weight:600; }
        .tf-btn.selected-false { border-color:#e74c3c; background:rgba(231,76,60,0.2); color:#e74c3c; font-weight:600; }
        .range-label { display:flex; justify-content:space-between; font-size:0.75rem; color:#888; margin-top:4px; }
        input[type=range] { -webkit-appearance:none; width:100%; height:6px; border-radius:3px; background:rgba(255,255,255,0.1); outline:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#c0392b; cursor:pointer; }
        .progress-ring { transition:all 0.4s ease; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#111; }
        ::-webkit-scrollbar-thumb { background:#c0392b55; border-radius:3px; }
    </style>
</head>
<body class="min-h-screen bg-[#121212] text-white selection:bg-[#c0392b] selection:text-white font-sans">
    <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-dot-pattern opacity-40"></div>
        <div class="glow-orb w-[600px] h-[600px] bg-[#c0392b] top-[-10%] left-[-10%] animate-float"></div>
        <div class="glow-orb w-[500px] h-[500px] bg-blue-900/40 bottom-[-10%] right-[-5%] animate-float" style="animation-delay: -6s;"></div>
    </div>

    <!-- Header -->
    <header class="relative z-20 border-b border-white/5 bg-black/30 backdrop-blur-md sticky top-0">
        <div class="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="EstatusPostulanteIbero.php" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <i data-lucide="chevron-left" class="w-4 h-4"></i> Mis evaluaciones
            </a>
            <div class="flex items-center gap-3">
                <div class="text-right">
                    <p class="text-white text-sm font-semibold"><?= htmlspecialchars($candidato) ?></p>
                </div>
                <div id="progress-badge" class="px-3 py-1 rounded-full bg-ibero/10 border border-ibero/30 text-ibero-light text-xs font-bold">0 / 0</div>
            </div>
        </div>
        <!-- Barra de progreso -->
        <div class="w-full h-1 bg-white/5">
            <div id="progress-bar" class="h-1 bg-ibero transition-all duration-500" style="width:0%"></div>
        </div>
    </header>

    <main class="relative z-20 max-w-3xl mx-auto px-6 py-10" id="main-content">
        <!-- Estado inicial: cargando -->
        <div id="state-loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-ibero border-t-transparent mb-4"></div>
            <p class="text-gray-500">Cargando evaluación...</p>
        </div>

        <!-- Estado: completada -->
        <div id="state-completed" class="hidden text-center py-16">
            <div class="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <i data-lucide="check-circle-2" class="w-12 h-12 text-green-400"></i>
            </div>
            <h2 class="text-3xl font-black text-white mb-2">¡Evaluación completada!</h2>
            <p class="text-gray-400 mb-8">Tu evaluación ha sido registrada exitosamente.</p>
            <a href="EstatusPostulanteIbero.php" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ibero text-white font-bold hover:bg-ibero-dark transition-colors">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Regresar a mis postulaciones
            </a>
        </div>

        <!-- Estado: ya completada (solo lectura) -->
        <div id="state-readonly" class="hidden">
            <div class="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 mb-6 flex items-center gap-3">
                <i data-lucide="lock" class="w-5 h-5"></i>
                <span class="text-sm font-medium">Esta evaluación ya fue completada. Solo puedes ver tus respuestas.</span>
            </div>
            <div id="preguntas-readonly"></div>
        </div>

        <!-- Estado: evaluación activa -->
        <div id="state-active" class="hidden">
            <div class="mb-8">
                <h1 id="titulo-evaluacion" class="text-3xl font-black text-white mb-1"></h1>
                <p id="subtitulo-evaluacion" class="text-gray-500 text-sm"></p>
            </div>
            <div id="preguntas-container"></div>

            <!-- Botón finalizar -->
            <div class="mt-8 flex gap-3">
                <button id="btn-guardar-parcial"
                    class="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <i data-lucide="save" class="w-4 h-4"></i> Guardar progreso
                </button>
                <button id="btn-finalizar"
                    class="flex-1 py-4 rounded-xl bg-ibero text-white font-bold hover:bg-ibero-dark transition-all flex items-center justify-center gap-2">
                    <span class="btn-fin-text flex items-center gap-2">
                        <i data-lucide="send" class="w-4 h-4"></i> Enviar evaluación
                    </span>
                    <div class="btn-fin-spinner hidden w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </button>
            </div>
            <p class="text-xs text-gray-600 text-center mt-3">Una vez enviada no podrás modificar tus respuestas.</p>
        </div>
    </main>

    <script>
    const ID_PE = <?= $idPE ?>;
    const API = 'Backend/EvaluacionesPostulante/App.php';
    let preguntas = [];
    let respuestas = {};
    let totalPreguntas = 0;

    // ==========================================
    // INICIALIZAR
    // ==========================================
    async function init() {
        if (!ID_PE) { mostrarError('ID de evaluación no válido.'); return; }
        try {
            const r = await $.ajax({type:'POST',url:API,data:{op:'getPreguntasEvaluacion',IdPostulanteEvaluacion:ID_PE},dataType:'json'});
            if (!r.Resultado) { mostrarError(r.Msg || 'Error al cargar la evaluación.'); return; }
            preguntas = r.Data;
            totalPreguntas = preguntas.length;

            // Pre-cargar respuestas previas
            preguntas.forEach(p => { if (p.RespuestaPrevia !== null) respuestas[p.IdPregunta] = p.RespuestaPrevia; });

            if (r.Estatus === 3) {
                mostrarModoReadOnly();
            } else {
                mostrarModoActivo();
            }
        } catch(e) { mostrarError('Error de conexión.'); }
    }

    function mostrarError(msg) {
        document.getElementById('state-loading').innerHTML = `
            <div class="text-center py-16">
                <i data-lucide="alert-circle" class="w-14 h-14 text-red-500/50 mx-auto mb-4"></i>
                <p class="text-red-400">${msg}</p>
                <a href="EstatusPostulanteIbero.php" class="inline-block mt-4 text-sm text-ibero-light underline">Regresar</a>
            </div>`;
        lucide.createIcons();
    }

    function mostrarModoReadOnly() {
        document.getElementById('state-loading').classList.add('hidden');
        document.getElementById('state-readonly').classList.remove('hidden');
        document.getElementById('preguntas-readonly').innerHTML = preguntas.map((p,i) => buildPreguntaReadOnly(p,i)).join('');
        lucide.createIcons();
    }

    function buildPreguntaReadOnly(p, i) {
        const ya     = p.RespuestaPrevia;
        const esOM   = p.Multiple1R == 1 || p.Multiple1R === '1';
        const esBool = p.Bool       == 1 || p.Bool       === '1';
        const esRang = p.Rango      == 1 || p.Rango      === '1';
        let inputHTML = '';

        if (esOM) {
            inputHTML = (p.Opciones||[]).map(o => {
                const sel = ya === o.Texto || ya === String(o.IdOpcion);
                return `<div class="option-btn${sel?' selected':''}" style="cursor:default;pointer-events:none;">
                    ${sel ? '<span class="mr-2 text-ibero-light">✓</span>' : '<span class="mr-2 opacity-0">✓</span>'}${o.Texto}
                </div>`;
            }).join('');
            if (!ya) inputHTML += `<p class="text-gray-600 text-sm mt-2 italic">Sin respuesta registrada</p>`;
        } else if (esBool) {
            const esV = ya==='Verdadero'||ya==='1'||ya==='true';
            const esF = ya==='Falso'||ya==='0'||ya==='false';
            inputHTML = `
                <div class="tf-btn${esV?' selected-true':''}" style="cursor:default;pointer-events:none;">
                    <span style="font-size:1.2rem">✅</span> Verdadero
                </div>
                <div class="tf-btn${esF?' selected-false':''}" style="cursor:default;pointer-events:none;">
                    <span style="font-size:1.2rem">❌</span> Falso
                </div>`;
        } else if (esRang) {
            const minR = p.Config?.RangoInicial ? parseInt(p.Config.RangoInicial) : 1;
            const maxR = p.Config?.RangoFinal   ? parseInt(p.Config.RangoFinal)   : 10;
            const val  = ya || Math.round((minR+maxR)/2);
            inputHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-gray-500 text-sm">${minR}</span>
                    <input type="range" min="${minR}" max="${maxR}" value="${val}" class="flex-1" disabled style="opacity:0.7;pointer-events:none;">
                    <span class="text-gray-500 text-sm">${maxR}</span>
                    <span class="px-3 py-1 rounded-lg bg-ibero/20 text-ibero-light font-bold text-sm ml-2">${ya || '—'}</span>
                </div>
                <p class="text-xs text-gray-500 mt-2">Valor seleccionado: <strong class="text-ibero-light">${ya || '—'}</strong></p>`;
        } else {
            inputHTML = `<div class="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-sm min-h-[60px]">
                ${ya ? `<span class="text-white">${ya}</span>` : `<span class="text-gray-600 italic">Sin respuesta registrada</span>`}
            </div>`;
        }

        return `<div class="question-card answered mb-4">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pregunta ${i+1} de ${totalPreguntas} · ${p.TipoPregunta}</p>
                    <p class="font-semibold text-white leading-snug">${p.Titulo}</p>
                    ${p.Competencia ? `<p class="text-xs text-gray-600 mt-1">Competencia: ${p.Competencia}</p>` : ''}
                </div>
                <span class="text-green-400 ml-3 flex-shrink-0"><i data-lucide="check-circle-2" class="w-5 h-5"></i></span>
            </div>
            ${inputHTML}
        </div>`;
    }

    function mostrarModoActivo() {
        document.getElementById('state-loading').classList.add('hidden');
        document.getElementById('state-active').classList.remove('hidden');
        renderPreguntas();
        actualizarProgreso();
        attachBotones();
    }

    // ==========================================
    // RENDER PREGUNTAS
    // ==========================================
    function renderPreguntas() {
        const cont = document.getElementById('preguntas-container');
        cont.innerHTML = preguntas.map((p, i) => buildPreguntaHTML(p, i)).join('');
        lucide.createIcons();
    }

    function buildPreguntaHTML(p, i) {
        let inputHTML = '';
        const ya = respuestas[p.IdPregunta];
        // Usar flags del catálogo igual que PIP
        const esOM    = p.Multiple1R == 1 || p.Multiple1R === '1';
        const esBool  = p.Bool       == 1 || p.Bool       === '1';
        const esRango = p.Rango      == 1 || p.Rango      === '1';

        if (esOM) {
            inputHTML = (p.Opciones||[]).map(o => {
                const sel = ya == o.Texto || ya == o.IdOpcion ? ' selected' : '';
                return `<button type="button" class="option-btn${sel}" data-id="${p.IdPregunta}" data-val="${o.Texto}" onclick="seleccionarOpcion(this)">${o.Texto}</button>`;
            }).join('');
        } else if (esBool) {
            const selV = ya === '1' || ya === 'true' || ya === 'Verdadero' ? ' selected-true' : '';
            const selF = ya === '0' || ya === 'false' || ya === 'Falso' ? ' selected-false' : '';
            inputHTML = `
                <button type="button" class="tf-btn${selV}" data-id="${p.IdPregunta}" data-val="Verdadero" onclick="seleccionarTF(this,true)">
                    <span style="font-size:1.2rem">✅</span> Verdadero
                </button>
                <button type="button" class="tf-btn${selF}" data-id="${p.IdPregunta}" data-val="Falso" onclick="seleccionarTF(this,false)">
                    <span style="font-size:1.2rem">❌</span> Falso
                </button>`;
        } else if (esRango) {
            const minR = p.Config && p.Config.RangoInicial ? parseInt(p.Config.RangoInicial) : 1;
            const maxR = p.Config && p.Config.RangoFinal   ? parseInt(p.Config.RangoFinal)   : 10;
            const val = ya || Math.round((minR+maxR)/2);
            inputHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-gray-500 text-sm">${minR}</span>
                    <input type="range" id="range_${p.IdPregunta}" min="${minR}" max="${maxR}" value="${val}"
                           class="flex-1" oninput="seleccionarRango(this,${p.IdPregunta})">
                    <span class="text-gray-500 text-sm">${maxR}</span>
                    <span id="rval_${p.IdPregunta}" class="px-3 py-1 rounded-lg bg-ibero/20 text-ibero-light font-bold text-sm ml-2">${val}</span>
                </div>`;
            if (!ya) respuestas[p.IdPregunta] = String(val);
        } else { // Texto
            inputHTML = `<textarea id="text_${p.IdPregunta}" rows="3" placeholder="Escribe tu respuesta..."
                onchange="seleccionarTexto(this,${p.IdPregunta})"
                class="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 resize-none transition-all">${ya||''}</textarea>`;
            if (ya) respuestas[p.IdPregunta] = ya;
        }

        const answered = respuestas[p.IdPregunta] !== undefined && respuestas[p.IdPregunta] !== '';
        return `
        <div class="question-card${answered?' answered':''}" id="qcard_${p.IdPregunta}">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pregunta ${i+1} de ${totalPreguntas}</p>
                    <p class="font-semibold text-white leading-snug">${p.Titulo}</p>
                    ${p.Competencia?`<p class="text-xs text-gray-600 mt-1">Competencia: ${p.Competencia}</p>`:''}
                </div>
                <span id="check_${p.IdPregunta}" class="${answered?'text-green-400':'text-gray-700'} transition-colors ml-3 flex-shrink-0">
                    <i data-lucide="${answered?'check-circle-2':'circle'}" class="w-5 h-5"></i>
                </span>
            </div>
            ${inputHTML}
        </div>`;
    }

    // ==========================================
    // INTERACCIÓN DE PREGUNTAS
    // ==========================================
    function seleccionarOpcion(btn) {
        const idP = btn.dataset.id;
        document.querySelectorAll(`.option-btn[data-id="${idP}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        registrarRespuesta(idP, btn.dataset.val);
    }

    function seleccionarTF(btn, esVerdadero) {
        const idP = btn.dataset.id;
        document.querySelectorAll(`.tf-btn[data-id="${idP}"]`).forEach(b => { b.classList.remove('selected-true','selected-false'); });
        btn.classList.add(esVerdadero ? 'selected-true' : 'selected-false');
        registrarRespuesta(idP, btn.dataset.val);
    }

    function seleccionarRango(input, idP) {
        document.getElementById('rval_' + idP).textContent = input.value;
        registrarRespuesta(idP, input.value);
    }

    function seleccionarTexto(textarea, idP) {
        registrarRespuesta(idP, textarea.value.trim());
    }

    function registrarRespuesta(idP, valor) {
        respuestas[idP] = valor;
        const card = document.getElementById('qcard_' + idP);
        const check = document.getElementById('check_' + idP);
        if (card) card.classList.toggle('answered', !!valor);
        if (check) {
            check.className = `${valor?'text-green-400':'text-gray-700'} transition-colors ml-3 flex-shrink-0`;
            check.innerHTML = `<i data-lucide="${valor?'check-circle-2':'circle'}" class="w-5 h-5"></i>`;
            lucide.createIcons();
        }
        actualizarProgreso();
    }

    function actualizarProgreso() {
        const respondidas = Object.values(respuestas).filter(v => v !== '' && v !== null && v !== undefined).length;
        const pct = totalPreguntas > 0 ? Math.round((respondidas / totalPreguntas) * 100) : 0;
        document.getElementById('progress-bar').style.width = pct + '%';
        document.getElementById('progress-badge').textContent = `${respondidas} / ${totalPreguntas}`;
    }

    // ==========================================
    // GUARDAR Y FINALIZAR
    // ==========================================
    function buildPayload() {
        return Object.entries(respuestas).map(([id,val]) => ({IdPregunta:parseInt(id),Respuesta:val}));
    }

    function attachBotones() {
        document.getElementById('btn-guardar-parcial').addEventListener('click', async function() {
            const payload = buildPayload();
            if (!payload.length) { alert('No hay respuestas que guardar.'); return; }
            this.disabled = true; this.textContent = 'Guardando...';
            try {
                const r = await $.ajax({type:'POST',url:API,data:{op:'saveRespuestas',IdPostulanteEvaluacion:ID_PE,respuestas:JSON.stringify(payload)},dataType:'json'});
                alert(r.Resultado ? '✅ ' + r.Msg : '❌ ' + r.Msg);
            } catch(e) { alert('Error de conexión.'); }
            this.disabled = false;
            this.innerHTML = '<i data-lucide="save" class="w-4 h-4"></i> Guardar progreso';
            lucide.createIcons();
        });

        document.getElementById('btn-finalizar').addEventListener('click', async function() {
            const respondidas = Object.values(respuestas).filter(v=>v!==''&&v!==null&&v!==undefined).length;
            if (respondidas < totalPreguntas) {
                if (!confirm(`Faltan ${totalPreguntas-respondidas} pregunta(s) por responder. ¿Deseas enviar de todas formas?`)) return;
            } else {
                if (!confirm('¿Estás seguro de enviar tu evaluación? No podrás modificar las respuestas.')) return;
            }

            const btn = this;
            btn.disabled = true;
            btn.querySelector('.btn-fin-text').classList.add('hidden');
            btn.querySelector('.btn-fin-spinner').classList.remove('hidden');

            try {
                // Guardar respuestas primero
                const payload = buildPayload();
                if (payload.length) {
                    await $.ajax({type:'POST',url:API,data:{op:'saveRespuestas',IdPostulanteEvaluacion:ID_PE,respuestas:JSON.stringify(payload)},dataType:'json'});
                }
                // Finalizar
                const r = await $.ajax({type:'POST',url:API,data:{op:'finalizarEvaluacion',IdPostulanteEvaluacion:ID_PE},dataType:'json'});
                if (r.Resultado) {
                    document.getElementById('state-active').classList.add('hidden');
                    document.getElementById('state-completed').classList.remove('hidden');
                    lucide.createIcons();
                } else {
                    alert('❌ ' + (r.Msg||'Error al finalizar.'));
                    btn.disabled=false;
                    btn.querySelector('.btn-fin-text').classList.remove('hidden');
                    btn.querySelector('.btn-fin-spinner').classList.add('hidden');
                }
            } catch(e) {
                alert('Error de conexión.');
                btn.disabled=false;
                btn.querySelector('.btn-fin-text').classList.remove('hidden');
                btn.querySelector('.btn-fin-spinner').classList.add('hidden');
            }
        });
    }

    lucide.createIcons();
    init();
    </script>
</body>
</html>
