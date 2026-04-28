<?php
// Sesión Ibero para auto-completar formulario
if (session_status() === PHP_SESSION_NONE) { session_start(); }
$iberoLoggedIn = isset($_SESSION['ibero_logged_in']) && $_SESSION['ibero_logged_in'] === true;
$sessionData   = [];
if ($iberoLoggedIn) {
    $sessionData = [
        'loggedIn'      => true,
        'nombre'        => $_SESSION['ibero_nombre_candidato'] ?? '',
        'apellidoP'     => $_SESSION['ibero_apellido_p_candidato'] ?? '',
        'apellidoM'     => $_SESSION['ibero_apellido_m_candidato'] ?? '',
        'curp'          => $_SESSION['ibero_curp_candidato'] ?? '',
        'correo'        => $_SESSION['ibero_correo_candidato'] ?? '',
        'telefono'      => $_SESSION['ibero_telefono_candidato'] ?? '',
    ];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Bolsa de Trabajo Universidad Iberoamericana — Consulta y aplica a nuestras vacantes disponibles.">
    <title>Bolsa de Trabajo — IBERO</title>
    <link rel="icon" type="image/svg+xml" href="assets/images/logo-ibero-placeholder.svg">

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        ibero: { DEFAULT:'#c0392b', dark:'#922b21', light:'#e74c3c', pale:'#fadbd8' }
                    },
                    fontFamily: { sans: ['Inter','sans-serif'] }
                }
            }
        }
    </script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <style>
        * { box-sizing: border-box; }

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

        /* Tarjeta mágica */
        .magic-card {
            position: relative; border-radius: 1rem;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            overflow: hidden; transition: all 0.3s ease;
            display: flex; flex-direction: column;
        }
        .magic-card:hover {
            border-color: rgba(192,57,43,0.5);
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(192,57,43,0.15);
        }

        /* Border beam animado */
        .border-beam {
            position: absolute; inset: -1px; border-radius: inherit;
            background: conic-gradient(from 0deg, transparent 0%, #c0392b 25%, transparent 50%);
            animation: beam 3s linear infinite;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor; mask-composite: exclude;
            padding: 1px; z-index: 0;
        }
        @keyframes beam { to { transform: rotate(360deg); } }

        /* Ripple */
        .ripple-btn { position: relative; overflow: hidden; }
        .ripple-btn .ripple-effect {
            position: absolute; border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: scale(0); animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }

        /* Scrollbar personalizado */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #c0392b55; border-radius: 3px; }


        /* Badge de sesión */
        .session-badge {
            background: rgba(192,57,43,0.15);
            border: 1px solid rgba(192,57,43,0.3);
        }

        /* Input focus */
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #c0392b !important;
            box-shadow: 0 0 0 2px rgba(192,57,43,0.2) !important;
        }

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
        .minimal-input:read-only {
            opacity: 0.7;
            background: rgba(255, 255, 255, 0.03);
            cursor: not-allowed;
            border-bottom-color: rgba(255, 255, 255, 0.05);
        }
        .minimal-input:read-only:focus {
            border-bottom-color: rgba(255, 255, 255, 0.05);
            box-shadow: none;
        }

        /* Minimal select style */
        .minimal-select {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            padding: 0.75rem 0;
            font-size: 0.95rem;
            transition: all 0.3s;
            width: 100%;
            cursor: pointer;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0 center;
            padding-right: 24px;
        }
        .minimal-select:focus {
            outline: none;
            border-bottom-color: #c0392b;
            box-shadow: 0 1px 0 0 #c0392b;
        }
        .minimal-select:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
        .minimal-select option {
            background: #1e1e1e;
            color: white;
            padding: 12px;
        }

        /* Search input */
        .search-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s;
        }
        .search-input:focus {
            outline: none;
            border-color: #c0392b;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.1);
        }
        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
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
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <!-- Logo Ibero placeholder -->
                <div class="w-10 h-10 rounded-xl bg-ibero flex items-center justify-center text-white font-black text-lg">I</div>
                <div>
                    <div class="text-white font-bold text-lg leading-tight">Universidad Iberoamericana</div>
                    <div class="text-gray-500 text-xs">Bolsa de Trabajo</div>
                </div>
            </div>
            <a href="EstatusPostulanteIbero.php"
               class="flex items-center gap-2 px-4 py-2 rounded-xl bg-ibero/10 border border-ibero/30 text-ibero-light text-sm font-medium hover:bg-ibero/20 transition-colors">
                <i data-lucide="user" class="w-4 h-4"></i>
                Mi postulación
            </a>
        </div>
    </header>

    <!-- HERO -->
    <section class="relative z-20 max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ibero/10 border border-ibero/30 text-ibero-light text-sm font-medium mb-6">
            <span class="w-2 h-2 rounded-full bg-ibero animate-pulse"></span>
            Vacantes disponibles
        </div>
        <h1 class="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Únete al equipo<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-ibero to-ibero-light">Ibero</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Explora nuestras oportunidades laborales y forma parte de la comunidad universitaria.
        </p>

        <!-- Barra de búsqueda -->
        <div class="max-w-lg mx-auto relative">
            <i data-lucide="search" class="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"></i>
            <input id="search-input" type="text" placeholder="Buscar por puesto, área..."
                class="search-input w-full pl-12 pr-4 py-4 rounded-2xl text-sm">
        </div>

        <!-- Banner sesión activa -->
        <?php if ($iberoLoggedIn): ?>
        <div class="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-2xl session-badge text-sm">
            <div class="w-8 h-8 rounded-full bg-ibero flex items-center justify-center text-white font-bold text-xs">
                <?= strtoupper(substr($sessionData['nombre'],0,1)) . strtoupper(substr($sessionData['apellidoP'],0,1)) ?>
            </div>
            <span class="text-gray-300">Sesión activa: <strong class="text-white"><?= htmlspecialchars($sessionData['nombre'].' '.$sessionData['apellidoP']) ?></strong></span>
            <a href="EstatusPostulanteIbero.php" class="text-ibero-light text-xs hover:underline">Ver mis postulaciones →</a>
        </div>
        <?php endif; ?>
    </section>

    <!-- GRID DE VACANTES -->
    <main class="relative z-20 max-w-7xl mx-auto px-6 pb-20">
        <div id="jobs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Cargando... -->
            <div class="col-span-full text-center py-20">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-ibero border-t-transparent mb-4"></div>
                <p class="text-gray-500">Cargando vacantes...</p>
            </div>
        </div>
    </main>

    <!-- MODAL DE POSTULACIÓN -->
    <div id="modal-postulacion" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 items-center justify-center p-4 relative">
        <div class="modal-content w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl max-h-[90vh] overflow-y-auto
                    transition-all duration-200 scale-95 opacity-0">

            <!-- Header modal -->
            <div class="sticky top-0 bg-[#111] border-b border-white/10 px-6 py-4 flex items-start justify-between z-10">
                <div>
                    <h2 id="modal-title" class="text-xl font-bold text-white"></h2>
                    <p id="modal-subtitle" class="text-sm text-gray-500 mt-0.5"></p>
                </div>
                <button onclick="cerrarModalPostulacion()" class="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Formulario -->
            <div id="modal-form-container" class="p-6">
                <form id="form-postulacion" onsubmit="enviarPostulacion(event)">
                    <!-- Datos personales -->
                    <div class="mb-6">
                        <h3 class="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                            <i data-lucide="user" class="w-4 h-4 text-ibero-light"></i>
                            Datos Personales
                        </h3>
                        <div class="grid grid-cols-2 gap-5">
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Nombre(s) <span class="text-ibero-light">*</span></label>
                                <input name="Nombre" type="text" required placeholder="Juan" class="minimal-input">
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Apellido Paterno <span class="text-ibero-light">*</span></label>
                                <input name="ApellidoPaterno" type="text" required placeholder="García" class="minimal-input">
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Apellido Materno</label>
                                <input name="ApellidoMaterno" type="text" placeholder="López" class="minimal-input">
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">CURP <span class="text-ibero-light">*</span></label>
                                <input name="CURP" type="text" required maxlength="18" placeholder="GALO850101HDFRCR00" class="minimal-input uppercase">
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Teléfono <span class="text-ibero-light">*</span></label>
                                <input name="Telefono" type="tel" required maxlength="10" placeholder="5512345678" class="minimal-input">
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Correo Electrónico <span class="text-ibero-light">*</span></label>
                                <input name="CorreoElectronico" type="email" required placeholder="juan@ejemplo.com" class="minimal-input">
                            </div>
                        </div>
                    </div>

                    <!-- Dirección -->
                    <div class="mb-6">
                        <h3 class="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                            <i data-lucide="map-pin" class="w-4 h-4 text-ibero-light"></i>
                            Dirección
                        </h3>
                        <div class="space-y-5">
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                    Código Postal <span class="text-ibero-light">*</span>
                                </label>
                                <div class="relative">
                                    <input id="input-cp" type="text" maxlength="5" placeholder="06600" class="minimal-input">
                                    <div id="cp-loading" class="hidden absolute right-3 top-1/2 -translate-y-1/2">
                                        <div class="w-4 h-4 border-2 border-c0392b border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <div id="cp-success" class="hidden absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                                        <i data-lucide="check-circle" class="w-4 h-4"></i>
                                    </div>
                                    <p id="cp-error" class="hidden text-xs text-red-400 mt-1"></p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-5">
                                <div class="flex flex-col gap-1">
                                    <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Estado</label>
                                    <input id="input-estado" type="text" readonly placeholder="Auto-completado" class="minimal-input">
                                </div>
                                <div class="flex flex-col gap-1">
                                    <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Municipio/Alcaldía</label>
                                    <input id="input-municipio" type="text" readonly placeholder="Auto-completado" class="minimal-input">
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Colonia <span class="text-ibero-light">*</span></label>
                                <select id="select-colonia" disabled class="minimal-select">
                                    <option value="">Primero ingresa tu código postal...</option>
                                </select>
                            </div>
                            <div class="flex flex-col gap-1">
                                <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Calle y número <span class="text-ibero-light">*</span></label>
                                <input id="input-calle" type="text" placeholder="Av. Insurgentes Sur #123" class="minimal-input">
                            </div>
                        </div>
                    </div>

                    <!-- Observaciones -->
                    <div class="mb-6">
                        <label class="text-[10px] uppercase text-gray-500 font-bold tracking-wider block mb-1">Mensaje (opcional)</label>
                        <textarea name="Observaciones" rows="3" placeholder="¿Por qué te interesa esta posición?" class="minimal-input resize-none h-24"></textarea>
                    </div>

                    <!-- Documentos dinámicos -->
                    <div id="campos-archivo" class="space-y-4 mb-6"></div>

                    <!-- Error / Éxito inline -->
                    <div id="modal-error-inline" class="hidden mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"></div>

                    <!-- Botón submit -->
                    <button type="submit" id="btn-submit-postulacion"
                        class="w-full py-4 rounded-xl bg-ibero text-white font-bold text-sm hover:bg-ibero-dark transition-all flex items-center justify-center gap-2">
                        <span class="btn-text flex items-center gap-2">
                            <i data-lucide="send" class="w-4 h-4"></i>
                            Enviar Postulación
                        </span>
                        <span class="loading-spinner hidden">
                            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </span>
                    </button>
                </form>
            </div>

            <!-- Mensaje de éxito -->
            <div id="modal-success" class="hidden p-10 flex-col items-center text-center">
                <div class="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-5">
                    <i data-lucide="check-circle" class="w-10 h-10 text-green-400"></i>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">¡Postulación enviada!</h3>
                <p class="text-gray-400 mb-6">Tu solicitud ha sido registrada exitosamente. Puedes seguir el estado de tu postulación.</p>
                <a href="EstatusPostulanteIbero.php"
                   class="px-6 py-3 rounded-xl bg-ibero text-white font-bold text-sm hover:bg-ibero-dark transition-colors">
                    Ver estatus de mi postulación
                </a>
            </div>
        </div>
    </div>

    <!-- DATOS DE SESIÓN PHP → JS -->
    <script>
        const USER_SESSION = <?= json_encode($sessionData) ?>;
    </script>

    <script src="scripts/BolsaDeTrabajoIbero.js"></script>
    <script>
        document.getElementById('search-input').addEventListener('input', handleBusqueda);
        lucide.createIcons();
        cargarVacantes();
    </script>
</body>
</html>
