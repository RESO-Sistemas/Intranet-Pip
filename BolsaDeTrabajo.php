<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$user_session_json = json_encode([
    'loggedIn' => isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true,
    'curp' => isset($_SESSION['curp_candidato']) ? $_SESSION['curp_candidato'] : '',
    'nombre' => isset($_SESSION['nombre_candidato']) ? $_SESSION['nombre_candidato'] : '',
    'apellidoPaterno' => isset($_SESSION['apellido_p_candidato']) ? $_SESSION['apellido_p_candidato'] : '',
    'apellidoMaterno' => isset($_SESSION['apellido_m_candidato']) ? $_SESSION['apellido_m_candidato'] : '',
    'correo' => isset($_SESSION['correo_candidato']) ? $_SESSION['correo_candidato'] : '',
    'telefono' => isset($_SESSION['telefono_candidato']) ? $_SESSION['telefono_candidato'] : ''
]);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oportunidades PIP - Bolsa de Trabajo Matamoros</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        const USER_SESSION = <?php echo $user_session_json; ?>;
    </script>

    <style>
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

        /* Aurora / Text Shine Effect */
        @keyframes text-shine {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
        .text-shine {
            background: linear-gradient(110deg, #ffffff 30%, #f2bb46 50%, #ffffff 70%);
            background-size: 200% auto;
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            animation: text-shine 3s linear infinite;
        }

        /* Shine Border (Border Beam Estilo Magic UI) */
        @keyframes border-beam {
            from { offset-distance: 0%; }
            to { offset-distance: 100%; }
        }

        .magic-card {
            position: relative;
            border-radius: 16px;
            background: #1e1e1e;
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .magic-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px -15px rgba(242, 187, 70, 0.15);
        }

        .border-beam {
            position: absolute;
            inset: 0;
            border: 1.5px solid transparent;
            border-radius: 16px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: destination-out;
            pointer-events: none;
        }

        .border-beam::after {
            content: "";
            position: absolute;
            aspect-ratio: 1;
            width: 160px;
            background: linear-gradient(to right, transparent, #f2bb46, #ffffff, transparent);
            offset-path: rect(0 auto auto 0 round 16px);
            animation: border-beam 4s linear infinite;
        }

        /* Ripple Button Effect Original */
        .ripple-btn {
            position: relative;
            overflow: hidden;
        }
        .ripple-span {
            position: absolute;
            background: rgba(255, 255, 255, 0.4);
            transform: translate(-50%, -50%);
            pointer-events: none;
            border-radius: 50%;
            animation: ripple-anim 0.6s linear;
            z-index: 0;
        }
        @keyframes ripple-anim {
            0% { width: 0; height: 0; opacity: 0.5; }
            100% { width: 500px; height: 500px; opacity: 0; }
        }

        /* Inputs estilo minimalista */
        .minimal-input {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            color: white;
            padding: 0.75rem 0;
            font-size: 0.95rem;
            transition: all 0.3s;
            width: 100%;
        }
        .minimal-input:focus {
            outline: none;
            border-bottom-color: #f2bb46;
            box-shadow: 0 1px 0 0 #f2bb46;
        }
        .minimal-input::placeholder {
            color: rgba(255,255,255,0.3);
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .animate-float {
            animation: float 12s ease-in-out infinite;
        }

        /* Modal styles */
        .modal-content {
            transition: all 0.2s ease-out;
        }

        /* Custom scrollbar for modal */
        .modal-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .modal-scroll::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
            border-radius: 3px;
        }
        .modal-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
        }
        .modal-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.3);
        }

        /* Search input */
        .search-input {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            transition: all 0.3s;
        }
        .search-input:focus {
            outline: none;
            border-color: #f2bb46;
            background: rgba(255,255,255,0.08);
            box-shadow: 0 0 0 3px rgba(242, 187, 70, 0.1);
        }
        .search-input::placeholder {
            color: rgba(255,255,255,0.4);
        }

        /* Select con estilo minimalista */
        .minimal-select {
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
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
            border-bottom-color: #f2bb46;
            box-shadow: 0 1px 0 0 #f2bb46;
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

        /* Input readonly con estilo deshabilitado */
        .minimal-input:read-only {
            opacity: 0.7;
            background: rgba(255,255,255,0.03);
            cursor: not-allowed;
            border-bottom-color: rgba(255,255,255,0.05);
        }
        .minimal-input:read-only:focus {
            border-bottom-color: rgba(255,255,255,0.05);
            box-shadow: none;
        }

        /* Input de CP con indicador de carga */
        .cp-input-wrapper {
            position: relative;
        }
        .cp-loading {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .cp-success {
            color: #22c55e;
        }
        .cp-error-text {
            color: #ef4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
        }
        .cp-help-link {
            color: #f2bb46;
            font-size: 0.7rem;
            text-decoration: none;
            transition: color 0.2s;
        }
        .cp-help-link:hover {
            color: #fff;
            text-decoration: underline;
        }
    </style>
</head>
<body class="min-h-screen bg-[#121212] text-white selection:bg-[#f2bb46] selection:text-black font-sans">
    
    <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-dot-pattern opacity-40"></div>
        <div class="glow-orb w-[600px] h-[600px] bg-[#f2bb46] top-[-10%] left-[-10%] animate-float"></div>
        <div class="glow-orb w-[500px] h-[500px] bg-blue-900/40 bottom-[-10%] right-[-5%] animate-float" style="animation-delay: -6s;"></div>
    </div>

    <div class="relative z-10">
        <div class="absolute top-6 left-6 md:top-8 md:left-8 z-50">
            <a href="EstatusPostulante.php" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-[#f2bb46]/30 text-[#f2bb46] hover:bg-[#f2bb46]/10 hover:border-[#f2bb46]/50 transition-all text-sm font-bold backdrop-blur-md shadow-lg shadow-[#f2bb46]/5">
                <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                Mi Estatus
            </a>
        </div>

        <header class="pt-20 pb-16 px-4 text-center">
            
            <div class="mb-8 flex justify-center">
                <img 
                    src="assets/images/logo-pip.png" 
                    alt="Logo PIP" 
                    class="w-48 md:w-64 h-auto object-contain" 
                />
            </div>

            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-[#f2bb46] uppercase tracking-[0.2em] mb-6">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                Bolsa de Trabajo
            </div>
            
            <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Forma parte de la empresa. <br class="hidden md:block"/> Encuentra tu próximo reto aquí.
            </p>
        </header>

        <main class="max-w-7xl mx-auto px-6 pb-32">
            <!-- Buscador -->
            <div class="mb-10 max-w-xl mx-auto">
                <div class="relative">
                    <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"></i>
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="Buscar por área o puesto..." 
                        class="search-input w-full pl-12 pr-4 py-4 rounded-2xl text-sm"
                    >
                </div>
            </div>

            <!-- Grid de vacantes -->
            <div id="jobs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </main>

        <footer class="py-12 border-t border-white/5 text-center">
            <p class="text-[10px] text-gray-600 tracking-[0.3em] uppercase font-bold">
                © <span id="current-year"></span> PIP by lugo. Todos los derechos reservados.
            </p>
        </footer>
    </div>

    <!-- Modal de Postulación -->
    <div id="modal-postulacion" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="modal-content w-full max-w-2xl max-h-[90vh] bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl flex flex-col scale-95 opacity-0 transition-all duration-200">
            
            <!-- Header del modal -->
            <div class="flex-shrink-0 px-6 py-5 border-b border-white/10 flex justify-between items-start">
                <div>
                    <p class="text-[10px] uppercase tracking-[0.2em] font-bold text-[#f2bb46] mb-1">Postulación</p>
                    <h2 id="modal-title" class="text-xl font-bold text-white">Nombre del puesto</h2>
                    <p id="modal-subtitle" class="text-sm text-gray-500 mt-1">Área • Sucursal</p>
                </div>
                <button 
                    onclick="cerrarModalPostulacion()" 
                    class="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-xl hover:bg-white/10"
                >
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Contenido del modal (scrolleable) -->
            <div class="flex-1 overflow-y-auto modal-scroll">
                
                <!-- Mensaje de éxito -->
                <div id="modal-success" class="hidden flex-col items-center justify-center text-center p-12">
                    <div class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-5">
                        <i data-lucide="check-circle-2" class="w-12 h-12 text-green-500"></i>
                    </div>
                    <p class="text-2xl font-bold text-white">¡Postulación enviada!</p>
                    <p class="text-gray-400 mt-3">Gracias por tu interés. Pronto te contactaremos.</p>
                </div>

                <!-- Mensaje de error -->
                <div id="modal-error" class="hidden flex-col items-center justify-center text-center p-12">
                    <div class="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-5">
                        <i data-lucide="x-circle" class="w-12 h-12 text-red-500"></i>
                    </div>
                    <p class="text-2xl font-bold text-white">Error al enviar</p>
                    <p class="text-gray-400 mt-3 error-detail">Por favor intenta nuevamente.</p>
                    <button 
                        onclick="reintentarPostulacion()" 
                        class="mt-6 px-8 py-3 bg-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>

                <!-- Formulario -->
                <div id="modal-form-container" class="p-6">
                    <form id="form-postulacion" class="space-y-5">
                        
                        <!-- Nombre -->
                        <div class="flex flex-col">
                            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                Nombre(s) <span class="text-red-500">*</span>
                            </label>
                            <input required type="text" name="Nombre" class="minimal-input" placeholder="Tu nombre...">
                        </div>
                        
                        <!-- Apellidos en una fila -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Apellido Paterno <span class="text-red-500">*</span>
                                </label>
                                <input required type="text" name="ApellidoPaterno" class="minimal-input" placeholder="Paterno...">
                            </div>
                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Apellido Materno <span class="text-red-500">*</span>
                                </label>
                                <input required type="text" name="ApellidoMaterno" class="minimal-input" placeholder="Materno...">
                            </div>
                        </div>
                        
                        <!-- CURP -->
                        <div class="flex flex-col">
                            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                CURP <span class="text-red-500">*</span>
                            </label>
                            <input required type="text" name="CURP" class="minimal-input uppercase" placeholder="XXXX000000XXXXXX00" maxlength="18" pattern="[A-Z0-9]{18}">
                        </div>
                        
                        <!-- Teléfono y Correo -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Teléfono <span class="text-red-500">*</span>
                                </label>
                                <input required type="tel" name="Telefono" class="minimal-input" placeholder="10 dígitos..." maxlength="10" pattern="[0-9]{10}">
                            </div>
                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Correo <span class="text-red-500">*</span>
                                </label>
                                <input required type="email" name="CorreoElectronico" class="minimal-input" placeholder="correo@ejemplo.com">
                            </div>
                        </div>
                        
                        <!-- Código Postal -->
                        <div class="flex flex-col">
                            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                Código Postal <span class="text-red-500">*</span>
                            </label>
                            <div class="cp-input-wrapper">
                                <input required type="text" name="CodigoPostal" id="input-cp" class="minimal-input" placeholder="5 dígitos..." maxlength="5" pattern="[0-9]{5}" inputmode="numeric">
                                <span class="cp-loading hidden" id="cp-loading">
                                    <div class="animate-spin rounded-full h-4 w-4 border-2 border-[#f2bb46] border-t-transparent"></div>
                                </span>
                                <span class="cp-loading cp-success hidden" id="cp-success">
                                    <i data-lucide="check-circle" class="w-4 h-4"></i>
                                </span>
                            </div>
                            <div id="cp-error" class="cp-error-text hidden"></div>
                            <a href="https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx" target="_blank" rel="noopener noreferrer" class="cp-help-link mt-1">
                                ¿No conoces tu CP? Consúltalo aquí
                            </a>
                        </div>
                        
                        <!-- Estado y Municipio (readonly, llenados por SEPOMEX) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Estado <span class="text-red-500">*</span>
                                </label>
                                <input required type="text" name="Estado" id="input-estado" class="minimal-input" placeholder="Se llenará automáticamente..." readonly>
                            </div>
                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Municipio <span class="text-red-500">*</span>
                                </label>
                                <input required type="text" name="Ciudad" id="input-municipio" class="minimal-input" placeholder="Se llenará automáticamente..." readonly>
                            </div>
                        </div>
                        
                        <!-- Colonia (select poblado por SEPOMEX) -->
                        <div class="flex flex-col">
                            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                Colonia <span class="text-red-500">*</span>
                            </label>
                            <select required name="Colonia" id="select-colonia" class="minimal-select" disabled>
                                <option value="">Primero ingresa tu código postal...</option>
                            </select>
                        </div>
                        
                        <!-- Dirección (calle y número) -->
                        <div class="flex flex-col">
                            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                Calle y Número <span class="text-red-500">*</span>
                            </label>
                            <input required type="text" name="CalleNumero" id="input-calle" class="minimal-input" placeholder="Calle, número exterior e interior...">
                        </div>
                        
                        <!-- Campos de archivo (CV y/o Solicitud de Empleo) - Se generan dinámicamente -->
                        <div id="campos-archivo" class="space-y-5"></div>
                        
                        <!-- Observaciones (opcional) -->
                        <div class="flex flex-col">
                            <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                Sobre ti (opcional)
                            </label>
                            <textarea name="Observaciones" class="minimal-input resize-none h-24" placeholder="Cuéntanos sobre tus habilidades, experiencia..."></textarea>
                        </div>
                        
                        <!-- Botón de enviar -->
                        <button type="submit" class="ripple-btn w-full text-[#1e1e1e] bg-[#f2bb46] font-extrabold py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(242,187,70,0.3)] hover:shadow-[0_0_30px_rgba(242,187,70,0.5)] transition-all mt-6 uppercase text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="relative z-10 flex items-center justify-center gap-2 btn-text">
                                Enviar postulación
                                <i data-lucide="send" class="w-4 h-4"></i>
                            </span>
                            <span class="hidden loading-spinner">
                                <div class="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery (requerido para las peticiones AJAX) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- Script principal de Bolsa de Trabajo -->
    <script src="scripts/BolsaDeTrabajo.js "></script>
</body>
</html>
