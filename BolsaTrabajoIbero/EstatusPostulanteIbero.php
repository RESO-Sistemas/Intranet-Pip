<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }

// Verificar si hay sesión Ibero activa
$iberoLoggedIn = isset($_SESSION['ibero_logged_in']) && $_SESSION['ibero_logged_in'] === true;
$candidatoNombre = $iberoLoggedIn ? ($_SESSION['ibero_nombre_candidato'].' '.$_SESSION['ibero_apellido_p_candidato']) : '';
$candidatoCurp   = $_SESSION['ibero_curp_candidato'] ?? '';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Estatus de Postulante — Bolsa de Trabajo Iberoamericana">
    <title>Mi Postulación — IBERO</title>
    <link rel="icon" type="image/svg+xml" href="assets/images/logo-ibero-placeholder.svg">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={theme:{extend:{colors:{ibero:{DEFAULT:'#c0392b',dark:'#922b21',light:'#e74c3c',pale:'#fadbd8'}},fontFamily:{sans:['Inter','sans-serif']}}}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <style>
        * { box-sizing:border-box; }

        /* Fondo de puntos */
        .bg-dot-pattern {
            background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background-size: 24px 24px;
        }

        /* Orbes ambientales */
        .glow-orb {
            filter: blur(100px);
            opacity: 0.12;
            pointer-events: none;
            position: absolute;
            border-radius: 50%;
            z-index: 0;
        }

        /* Float animation */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .animate-float {
            animation: float 12s ease-in-out infinite;
        }
        input:focus, select:focus { outline:none; border-color:#c0392b!important; box-shadow:0 0 0 2px rgba(192,57,43,0.2)!important; }
        /* Timeline */
        .timeline-line { position:relative; padding-left:2rem; }
        .timeline-line::before { content:''; position:absolute; left:0.9rem; top:0; bottom:0; width:2px; background:rgba(255,255,255,0.1); }
        .timeline-step { position:relative; padding-bottom:1.5rem; }
        .timeline-dot { position:absolute; left:-2rem; top:0.25rem; width:1rem; height:1rem; border-radius:50%; border:2px solid; }
        .dot-pending  { border-color:#555; background:#111; }
        .dot-done     { border-color:#22c55e; background:#166534; }
        .dot-rejected { border-color:#ef4444; background:#7f1d1d; }
        .dot-active   { border-color:#c0392b; background:#c0392b; box-shadow:0 0 0 4px rgba(192,57,43,0.2); }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#111; }
        ::-webkit-scrollbar-thumb { background:#c0392b55; border-radius:3px; }

        /* Minimal input style */
        .minimal-input {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            padding: 0.75rem 0;
            font-size: 0.95rem;
            transition: all 0.3s;
            width: 100%;
        }
        .minimal-input:focus {
            outline: none;
            border-bottom-color: #c0392b;
            box-shadow: 0 1px 0 0 #c0392b;
        }
        .minimal-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }
    </style>
</head>
<body class="min-h-screen bg-[#121212] text-white selection:bg-[#c0392b] selection:text-white font-sans">
    <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-dot-pattern opacity-40"></div>
        <div class="glow-orb w-[600px] h-[600px] bg-[#c0392b] top-[-10%] left-[-10%] animate-float"></div>
        <div class="glow-orb w-[500px] h-[500px] bg-blue-900/40 bottom-[-10%] right-[-5%] animate-float" style="animation-delay: -6s;"></div>
    </div>

    <!-- HEADER -->
    <header class="relative z-20 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="BolsaDeTrabajoIbero.php" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div class="w-10 h-10 rounded-xl bg-ibero flex items-center justify-center text-white font-black text-lg">I</div>
                <div>
                    <div class="text-white font-bold text-lg leading-tight">Universidad Iberoamericana</div>
                    <div class="text-gray-500 text-xs">← Regresar a vacantes</div>
                </div>
            </a>
            <?php if ($iberoLoggedIn): ?>
            <div class="flex items-center gap-3">
                <div class="text-right hidden sm:block">
                    <p class="text-white text-sm font-medium"><?= htmlspecialchars($candidatoNombre) ?></p>
                    <p class="text-gray-500 text-xs"><?= htmlspecialchars($candidatoCurp) ?></p>
                </div>
                <a href="?logout=1" class="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400" title="Cerrar sesión">
                    <i data-lucide="log-out" class="w-5 h-5"></i>
                </a>
            </div>
            <?php endif; ?>
        </div>
    </header>

    <?php if (isset($_GET['logout'])): ?>
    <?php
        $_SESSION['ibero_logged_in'] = false;
        session_unset();
        header("Location: EstatusPostulanteIbero.php");
        exit;
    ?>
    <?php endif; ?>

    <main class="relative z-20 max-w-5xl mx-auto px-6 py-10">

        <?php if (!$iberoLoggedIn): ?>
        <!-- ===== PANTALLA DE LOGIN ===== -->
        <div class="max-w-md mx-auto">
            <div class="text-center mb-8">
                <div class="w-16 h-16 rounded-2xl bg-ibero/10 border border-ibero/30 flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="user-check" class="w-8 h-8 text-ibero-light"></i>
                </div>
                <h1 class="text-3xl font-black text-white mb-2">Mi Postulación</h1>
                <p class="text-gray-400">Ingresa tus datos para consultar el estatus de tus postulaciones.</p>
            </div>

            <div class="magic-card p-8">
                <form id="form-login" onsubmit="loginCandidato(event)" class="space-y-5">
                    <div class="flex flex-col gap-1">
                        <label class="text-xs uppercase text-gray-500 font-bold tracking-wider">CURP <span class="text-ibero-light">*</span></label>
                        <input id="login-curp" type="text" required maxlength="18" placeholder="GALO850101HDFRCR00" class="minimal-input uppercase">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs uppercase text-gray-500 font-bold tracking-wider">Teléfono (10 dígitos) <span class="text-ibero-light">*</span></label>
                        <input id="login-telefono" type="tel" required maxlength="10" placeholder="5512345678" class="minimal-input">
                        <p class="text-xs text-gray-600 mt-1">Usa el teléfono con el que te registraste.</p>
                    </div>
                    <div id="login-error" class="hidden p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"></div>
                    <button type="submit" id="btn-login"
                        class="w-full py-4 rounded-xl bg-ibero text-white font-bold hover:bg-ibero-dark transition-all flex items-center justify-center gap-2">
                        <span class="login-text flex items-center gap-2">
                            <i data-lucide="search" class="w-4 h-4"></i>
                            Consultar mis postulaciones
                        </span>
                        <div class="login-spinner hidden w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </button>
                </form>
            </div>
        </div>

        <?php else: ?>
        <!-- ===== PANEL DE POSTULACIONES ===== -->
        <div>
            <!-- Tabs -->
            <div class="flex gap-2 mb-8 border-b border-white/10">
                <button onclick="switchTab('postulaciones')" id="tab-postulaciones"
                    class="px-5 py-3 text-sm font-semibold text-ibero-light border-b-2 border-ibero -mb-px transition-all">
                    Mis Postulaciones
                </button>
                <button onclick="switchTab('evaluaciones')" id="tab-evaluaciones"
                    class="px-5 py-3 text-sm font-semibold text-gray-500 border-b-2 border-transparent -mb-px hover:text-white transition-all">
                    Mis Evaluaciones
                    <span id="eval-badge" class="hidden ml-1 px-2 py-0.5 bg-ibero rounded-full text-white text-xs"></span>
                </button>
            </div>

            <!-- Panel: Postulaciones -->
            <div id="panel-postulaciones">
                <div id="postulaciones-container">
                    <div class="text-center py-16">
                        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-ibero border-t-transparent mb-4"></div>
                        <p class="text-gray-500">Cargando tus postulaciones...</p>
                    </div>
                </div>
            </div>

            <!-- Panel: Evaluaciones -->
            <div id="panel-evaluaciones" class="hidden">
                <div id="evaluaciones-container">
                    <div class="text-center py-16">
                        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-ibero border-t-transparent mb-4"></div>
                        <p class="text-gray-500">Cargando evaluaciones...</p>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>
    </main>

    <!-- MODAL DETALLE DE PROCESO -->
    <div id="modal-proceso" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div class="sticky top-0 bg-[#111] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <h3 id="modal-proceso-titulo" class="font-bold text-white text-lg"></h3>
                <button onclick="cerrarModalProceso()" class="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div id="modal-proceso-body" class="p-6"></div>
        </div>
    </div>

    <script>
    const IBERO_LOGGED = <?= json_encode($iberoLoggedIn) ?>;

    // ========== LOGIN ==========
    async function loginCandidato(e) {
        e.preventDefault();
        const btn = document.getElementById('btn-login');
        const btnText = btn.querySelector('.login-text');
        const spinner = btn.querySelector('.login-spinner');
        const error = document.getElementById('login-error');
        error.classList.add('hidden');
        btn.disabled=true; btnText.classList.add('hidden'); spinner.classList.remove('hidden');
        try {
            const r = await $.ajax({
                type:'POST', url:'Backend/Postulantes/App.php',
                data:{ op:'loginCandidato', curp:document.getElementById('login-curp').value.trim(),
                       email:document.getElementById('login-telefono').value.trim() },
                dataType:'json'
            });
            if (r.Resultado) { window.location.reload(); }
            else {
                error.textContent = r.Msg || 'Datos incorrectos. Verifica tu CURP y teléfono.';
                error.classList.remove('hidden');
                btn.disabled=false; btnText.classList.remove('hidden'); spinner.classList.add('hidden');
            }
        } catch(err) {
            error.textContent = 'Error de conexión.';
            error.classList.remove('hidden');
            btn.disabled=false; btnText.classList.remove('hidden'); spinner.classList.add('hidden');
        }
    }

    // ========== CARGA DE POSTULACIONES ==========
    async function cargarPostulaciones() {
        if (!IBERO_LOGGED) return;
        try {
            const r = await $.ajax({ type:'POST', url:'Backend/Postulantes/App.php',
                data:{op:'postulacionesCandidato'}, dataType:'json' });
            const cont = document.getElementById('postulaciones-container');
            if (r.Resultado && r.Data && r.Data.length > 0) {
                renderPostulaciones(r.Data);
            } else {
                cont.innerHTML = `
                <div class="text-center py-16 bg-white/4 border border-white/10 rounded-2xl">
                    <i data-lucide="inbox" class="w-14 h-14 text-gray-600 mx-auto mb-4"></i>
                    <h3 class="text-xl font-bold text-white mb-2">Sin postulaciones</h3>
                    <p class="text-gray-500 mb-6">Aún no te has postulado a ninguna vacante.</p>
                    <a href="BolsaDeTrabajoIbero.php" class="px-6 py-3 rounded-xl bg-ibero text-white font-bold text-sm hover:bg-ibero-dark transition-colors">
                        Ver vacantes disponibles
                    </a>
                </div>`;
                lucide.createIcons();
            }
        } catch(e) {
            document.getElementById('postulaciones-container').innerHTML =
                '<p class="text-red-400 text-center py-10">Error al cargar postulaciones.</p>';
        }
    }

    const ESTATUS_MAP = {1:{label:'En Proceso',color:'text-blue-400',bg:'bg-blue-500/10 border-blue-500/30'},
                         2:{label:'Aceptado',color:'text-green-400',bg:'bg-green-500/10 border-green-500/30'},
                         3:{label:'Descartado',color:'text-red-400',bg:'bg-red-500/10 border-red-500/30'},
                         4:{label:'Finalizado',color:'text-gray-400',bg:'bg-gray-500/10 border-gray-500/30'}};

    function renderPostulaciones(postulaciones) {
        const cont = document.getElementById('postulaciones-container');
        let html = '<div class="space-y-4">';
        postulaciones.forEach(p => {
            const est = ESTATUS_MAP[p.EstatusPostulacion] || ESTATUS_MAP[1];
            const fecha = new Date(p.FechaPostulacion).toLocaleDateString('es-MX',{day:'2-digit',month:'long',year:'numeric'});
            html += `
            <div class="bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-ibero/30 transition-all">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-bold text-white">${p.NombreVacante}</h3>
                        <p class="text-gray-500 text-sm mt-0.5">${p.NombreArea||''} ${p.Sucursal?'• '+p.Sucursal:''}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-bold border ${est.bg} ${est.color}">${est.label}</span>
                </div>
                <div class="flex items-center gap-4 text-xs text-gray-600 mb-4">
                    <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>${fecha}</span>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <button onclick="verDetalleProceso(${p.IdPostulanteVacante}, '${p.NombreVacante.replace(/'/g,"\'")}')"
                        class="px-4 py-2 rounded-lg bg-ibero/10 border border-ibero/30 text-ibero-light text-xs font-medium hover:bg-ibero/20 transition-colors flex items-center gap-2">
                        <i data-lucide="list" class="w-3.5 h-3.5"></i>
                        Historial de procesos
                    </button>
                    <button onclick="switchTab('evaluaciones')" class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                        <i data-lucide="clipboard-check" class="w-3.5 h-3.5"></i>
                        Ver evaluaciones
                    </button>
                </div>
            </div>`;
        });
        html += '</div>';
        cont.innerHTML = html;
        lucide.createIcons();
    }

    // ========== TABS ==========
    function switchTab(tab) {
        const panels = {postulaciones:'panel-postulaciones',evaluaciones:'panel-evaluaciones'};
        const tabs = {postulaciones:'tab-postulaciones',evaluaciones:'tab-evaluaciones'};
        Object.keys(panels).forEach(k => {
            document.getElementById(panels[k]).classList.toggle('hidden', k!==tab);
            const el = document.getElementById(tabs[k]);
            if (k===tab) { el.classList.add('text-ibero-light','border-ibero'); el.classList.remove('text-gray-500','border-transparent'); }
            else { el.classList.remove('text-ibero-light','border-ibero'); el.classList.add('text-gray-500','border-transparent'); }
        });
        if (tab==='evaluaciones') cargarEvaluaciones();
    }

    // ========== EVALUACIONES CANDIDATO ==========
    let evaluacionesCargadas = false;
    async function cargarEvaluaciones() {
        if (evaluacionesCargadas) return;
        evaluacionesCargadas = true;
        try {
            const r = await $.ajax({type:'POST',url:'Backend/EvaluacionesPostulante/App.php',data:{op:'getEvaluacionesPostulante'},dataType:'json'});
            const cont = document.getElementById('evaluaciones-container');
            if (!r.Resultado || !r.Data || !r.Data.length) {
                cont.innerHTML = `<div class="text-center py-16 bg-white/4 border border-white/10 rounded-2xl">
                    <i data-lucide="clipboard" class="w-14 h-14 text-gray-600 mx-auto mb-4"></i>
                    <h3 class="text-xl font-bold text-white mb-2">Sin evaluaciones</h3>
                    <p class="text-gray-500">No tienes evaluaciones asignadas aún.</p></div>`;
                lucide.createIcons(); return;
            }
            const pendientes = r.Data.filter(e=>e.EstatusEvaluacion!=3).length;
            if (pendientes > 0) { document.getElementById('eval-badge').textContent=pendientes; document.getElementById('eval-badge').classList.remove('hidden'); }
            const COLORES = {1:'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',2:'text-blue-400 bg-blue-500/10 border-blue-500/30',3:'text-green-400 bg-green-500/10 border-green-500/30'};
            cont.innerHTML = '<div class="space-y-4">' + r.Data.map(e => {
                const c = COLORES[e.EstatusEvaluacion]||COLORES[1];
                const pct = e.Calificacion ? parseFloat(e.Calificacion).toFixed(1)+'%' : '—';
                const puedeResponder = e.EstatusEvaluacion != 3;
                return `<div class="bg-white/4 border border-white/10 rounded-2xl p-6 hover:border-ibero/30 transition-all">
                    <div class="flex items-start justify-between mb-3">
                        <div>
                            <h3 class="font-bold text-white text-lg">${e.NombreEvaluacion}</h3>
                            <p class="text-gray-500 text-sm">${e.NombreVacante} · Proceso: ${e.NombreProceso}</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-bold border ${c}">${e.TxEstatus}</span>
                    </div>
                    ${e.EstatusEvaluacion==3?`<div class="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 mb-3">
                        <span class="text-3xl font-black text-green-400">${pct}</span>
                        <span class="text-green-400 text-sm">Calificación final</span></div>`:
                    `<div class="p-3 rounded-xl bg-ibero/10 border border-ibero/20 mb-3 text-sm text-ibero-light">Completa esta evaluación para avanzar en el proceso de selección.</div>`}
                    ${puedeResponder
                        ? `<a href="EvaluacionResponderIbero.php?id=${e.IdPostulanteEvaluacion}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ibero text-white font-bold text-sm hover:bg-ibero-dark transition-colors">
                            <i data-lucide="play" class="w-4 h-4"></i>
                            ${e.EstatusEvaluacion==2?'Continuar evaluación':'Comenzar evaluación'}</a>`
                        : `<a href="EvaluacionResponderIbero.php?id=${e.IdPostulanteEvaluacion}" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-semibold text-sm hover:bg-white/10 transition-colors">
                            <i data-lucide="eye" class="w-4 h-4"></i> Ver respuestas</a>`}
                </div>`;
            }).join('') + '</div>';
            lucide.createIcons();
        } catch(e) {
            document.getElementById('evaluaciones-container').innerHTML = '<p class="text-red-400 text-center py-8">Error al cargar evaluaciones.</p>';
        }
    }

    // ========== MODAL DE PROCESOS ==========
    async function verDetalleProceso(idPostulanteVacante, nombreVacante) {
        document.getElementById('modal-proceso-titulo').textContent = nombreVacante;
        document.getElementById('modal-proceso-body').innerHTML =
            '<div class="text-center py-10"><div class="inline-block animate-spin h-8 w-8 border-4 border-ibero border-t-transparent rounded-full"></div></div>';
        document.getElementById('modal-proceso').classList.remove('hidden');

        try {
            const r = await $.ajax({ type:'POST', url:'Backend/Postulantes/App.php',
                data:{ op:'getProcesosPostulacion', IdPostulanteVacante: btoa(idPostulanteVacante) }, dataType:'json' });

            const body = document.getElementById('modal-proceso-body');
            if (r.Resultado && r.Data && r.Data.length > 0) {
                let html = '<div class="timeline-line">';
                r.Data.forEach((proc, i) => {
                    const esUltimo = i === r.Data.length - 1;
                    const res = proc.Resultado;
                    let dotClass = esUltimo && res===null ? 'dot-active' : (res==1?'dot-done':(res==0?'dot-rejected':'dot-pending'));
                    const fecha = new Date(proc.Fecha).toLocaleDateString('es-MX',{day:'2-digit',month:'short',year:'numeric'});
                    html += `
                    <div class="timeline-step">
                        <div class="timeline-dot ${dotClass}"></div>
                        <div class="bg-white/5 border border-white/10 rounded-xl p-4 ml-2">
                            <div class="flex items-center justify-between mb-1">
                                <span class="font-semibold text-white text-sm">${proc.NombreProceso}</span>
                                <span class="text-xs text-gray-500">${fecha}</span>
                            </div>
                            ${proc.Observaciones?`<p class="text-gray-400 text-sm mt-1">${proc.Observaciones}</p>`:''}
                            ${res!==null?`<span class="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold ${res==1?'text-green-400 bg-green-500/10':'text-red-400 bg-red-500/10'}">
                                ${res==1?'✓ Aprobado':'✗ No aprobado'}</span>`:''}
                        </div>
                    </div>`;
                });
                html += '</div>';
                body.innerHTML = html;
            } else {
                body.innerHTML = `
                <div class="text-center py-10">
                    <i data-lucide="clock" class="w-10 h-10 text-gray-600 mx-auto mb-3"></i>
                    <p class="text-gray-400">Aún no hay procesos registrados para esta postulación.</p>
                    <p class="text-gray-600 text-sm mt-1">El área de Recursos Humanos te contactará pronto.</p>
                </div>`;
            }
        } catch(e) {
            document.getElementById('modal-proceso-body').innerHTML =
                '<p class="text-red-400 text-center py-8">Error al cargar el historial.</p>';
        }
        lucide.createIcons();
    }

    function cerrarModalProceso() {
        document.getElementById('modal-proceso').classList.add('hidden');
    }

    document.getElementById('modal-proceso')?.addEventListener('click', function(e) {
        if (e.target===this) cerrarModalProceso();
    });
    document.addEventListener('keydown', e => { if (e.key==='Escape') cerrarModalProceso(); });

    // Init
    lucide.createIcons();
    if (IBERO_LOGGED) {
        cargarPostulaciones();
        // Pre-cargar el badge de evaluaciones pendientes
        setTimeout(() => {
            $.post('Backend/EvaluacionesPostulante/App.php',{op:'getEvaluacionesPostulante'},function(r){
                if (r.Resultado && r.Data) {
                    const pend = r.Data.filter(e=>e.EstatusEvaluacion!=3).length;
                    if (pend>0) { document.getElementById('eval-badge').textContent=pend; document.getElementById('eval-badge').classList.remove('hidden'); }
                }
            },'json');
        }, 800);
    }
    </script>
</body>
</html>
