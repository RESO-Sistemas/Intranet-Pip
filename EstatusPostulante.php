<?php
// Iniciar sesión para mantener al candidato logueado
session_start();

$error_msg = '';

// 1. PROCESAR EL FORMULARIO DE LOGIN
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $curp = strtoupper(trim($_POST['curp'] ?? ''));
    $email = trim($_POST['email'] ?? '');

    if (!empty($curp) && !empty($email)) {
        require_once __DIR__ . '/Backend/Postulantes/Postulantes.php';
        $Postulantes = new Postulantes();
        
        $loginResult = json_decode($Postulantes->validarCandidato($curp, $email), true);

        if ($loginResult['Resultado']) {
            $_SESSION['logged_in'] = true;
            $_SESSION['nombre_candidato'] = $loginResult['Data']['Nombre'];
            $_SESSION['curp_candidato'] = $loginResult['Data']['CURP'];
            $_SESSION['correo_candidato'] = $loginResult['Data']['CorreoElectronico'];
            $_SESSION['apellido_p_candidato'] = $loginResult['Data']['ApellidoPaterno'];
            $_SESSION['apellido_m_candidato'] = $loginResult['Data']['ApellidoMaterno'];
            $_SESSION['telefono_candidato'] = $loginResult['Data']['Telefono'];
            
            header("Location: " . $_SERVER['PHP_SELF']);
            exit;
        } else {
            $error_msg = isset($loginResult['Msg']) ? $loginResult['Msg'] : "Credenciales incorrectas.";
        }
    } else {
        $error_msg = "Por favor completa todos los campos.";
    }
}

// 2. PROCESAR CERRAR SESIÓN
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: " . strtok($_SERVER["REQUEST_URI"], '?')); // Redirigir limpio
    exit;
}

// Variable para controlar qué vista mostrar
$is_logged_in = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
$nombre_usuario = $is_logged_in ? $_SESSION['nombre_candidato'] : '';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Estatus PIP - Portal del Candidato</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        /* Estilos heredados de la Bolsa de Trabajo para consistencia */
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

        /* Estilos específicos para el Timeline de Estatus */
        .timeline-container {
            position: relative;
            padding-left: 2rem;
        }
        .timeline-container::before {
            content: '';
            position: absolute;
            left: 7px;
            top: 10px;
            bottom: 10px;
            width: 2px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
        }
        .timeline-item {
            position: relative;
            padding-bottom: 2rem;
        }
        .timeline-item:last-child {
            padding-bottom: 0;
        }
        .timeline-dot {
            position: absolute;
            left: -2rem;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #1e1e1e;
            border: 2px solid rgba(255,255,255,0.2);
            z-index: 1;
            transition: all 0.3s ease;
        }
        .timeline-item.active .timeline-dot {
            border-color: #f2bb46;
            background: #f2bb46;
            box-shadow: 0 0 10px rgba(242, 187, 70, 0.5);
        }
        .timeline-item.completed .timeline-dot {
            border-color: #22c55e;
            background: #22c55e;
        }
        .timeline-item.rejected .timeline-dot {
            border-color: #ef4444;
            background: #ef4444;
        }
        
        .fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body class="min-h-screen bg-[#121212] text-white selection:bg-[#f2bb46] selection:text-black font-sans flex flex-col">
    
    <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-dot-pattern opacity-40"></div>
        <div class="glow-orb w-[600px] h-[600px] bg-[#f2bb46] top-[-10%] left-[-10%] animate-float"></div>
        <div class="glow-orb w-[500px] h-[500px] bg-blue-900/40 bottom-[-10%] right-[-5%] animate-float" style="animation-delay: -6s;"></div>
    </div>

    <div class="relative z-10 flex-1 flex flex-col">
        <header class="pt-12 pb-8 px-4 text-center">
            <div class="mb-8 flex justify-center">
                <img 
                    src="assets/images/logo-pip.png" 
                    alt="Logo PIP" 
                    class="w-48 md:w-64 h-auto object-contain" 
                />
            </div>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-[#f2bb46] uppercase tracking-[0.2em]">
                <i data-lucide="user-search" class="w-3.5 h-3.5"></i>
                Portal del Candidato
            </div>
            <div class="mt-6 flex justify-center">
                <a href="BolsaDeTrabajo.php" class="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-semibold">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                    Volver a Vacantes
                </a>
            </div>
        </header>

        <main class="flex-1 flex flex-col items-center justify-center px-6 pb-20 w-full max-w-5xl mx-auto">
            
            <?php if (!$is_logged_in): ?>
                <div id="login-view" class="w-full max-w-md fade-in">
                    <div class="text-center mb-8">
                        <h1 class="text-2xl md:text-3xl font-bold mb-2">Sigue tu proceso</h1>
                        <p class="text-gray-400 text-sm">Ingresa tus datos para revisar el estatus de tus postulaciones en PIP.</p>
                    </div>

                    <div class="magic-card p-8">
                        <form method="POST" action="" class="space-y-6">
                            <input type="hidden" name="action" value="login">
                            
                            <?php if (!empty($error_msg)): ?>
                                <div class="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
                                    <?php echo htmlspecialchars($error_msg); ?>
                                </div>
                            <?php endif; ?>

                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Tu CURP <span class="text-[#f2bb46]">*</span>
                                </label>
                                <input required type="text" name="curp" class="minimal-input uppercase" placeholder="Ingresa los 18 caracteres..." maxlength="18" value="<?php echo isset($_POST['curp']) ? htmlspecialchars($_POST['curp']) : ''; ?>">
                            </div>

                            <div class="flex flex-col">
                                <label class="text-[10px] uppercase text-gray-500 mb-1 font-bold tracking-wider">
                                    Correo Registrado <span class="text-[#f2bb46]">*</span>
                                </label>
                                <input required type="email" name="email" class="minimal-input" placeholder="correo@ejemplo.com" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                            </div>

                            <button type="submit" class="ripple-btn w-full text-[#1e1e1e] bg-[#f2bb46] font-extrabold py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(242,187,70,0.3)] hover:shadow-[0_0_30px_rgba(242,187,70,0.5)] transition-all mt-4 uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                                <span>Consultar Estatus</span>
                                <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </button>
                        </form>
                    </div>
                </div>

            <?php else: ?>
                <div id="dashboard-view" class="w-full fade-in">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 class="text-2xl font-bold text-white">Hola, <span class="text-[#f2bb46]"><?php echo htmlspecialchars($nombre_usuario); ?></span></h2>
                            <p class="text-gray-400 text-sm mt-1">Aquí está el resumen de tus procesos activos.</p>
                        </div>
                        <a href="?logout=1" class="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                            <i data-lucide="log-out" class="w-4 h-4"></i>
                            Salir
                        </a>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        <div class="lg:col-span-1 space-y-4">
                            <h3 class="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-4">Tus Postulaciones</h3>
                            <?php
                            require_once __DIR__ . '/Backend/Postulantes/Postulantes.php';
                            $Postulantes = new Postulantes();
                            $postulacionesResult = json_decode($Postulantes->getPostulacionesByCurp($_SESSION['curp_candidato']), true);
                            
                            $postulacionesUser = [];
                            if ($postulacionesResult['Resultado'] && isset($postulacionesResult['Data'])) {
                                $postulacionesUser = $postulacionesResult['Data'];
                            }
                            
                            $todasLasPostulacionesData = [];
                            $primerId = null;
                            
                            foreach ($postulacionesUser as $idx => $p) {
                                if ($primerId === null) {
                                    $primerId = $p['IdPostulanteVacante'];
                                }
                                
                                $historial = [];
                                $historyResult = json_decode($Postulantes->getProcesosPostulacion($p['IdPostulanteVacante']), true);
                                if ($historyResult['Resultado'] && !empty($historyResult['Data'])) {
                                    $historial = $historyResult['Data'];
                                }
                                $p['Historial'] = $historial;
                                $todasLasPostulacionesData[$p['IdPostulanteVacante']] = $p;
                                
                                $estatusPostulacion = intval($p['EstatusPostulacion']);
                                $badgeClass = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                                $badgeText = "En Proceso";
                                
                                if ($estatusPostulacion === 2) {
                                    $badgeClass = "bg-green-500/10 text-green-400 border border-green-500/20";
                                    $badgeText = "Aceptado";
                                } else if ($estatusPostulacion === 3) {
                                    $badgeClass = "bg-red-500/10 text-red-400 border border-red-500/20";
                                    $badgeText = "Descartado";
                                } else if ($estatusPostulacion === 4) {
                                    $badgeClass = "bg-[#f2bb46]/10 text-[#f2bb46] border border-[#f2bb46]/20";
                                    $badgeText = "Finalizado";
                                }
                                
                                $fechaFormat = date('d M Y', strtotime($p['FechaPostulacion']));
                                
                                echo '
                                <div onclick="seleccionarPostulacion('.$p['IdPostulanteVacante'].')" id="card-'.$p['IdPostulanteVacante'].'" class="nav-card block magic-card p-5 cursor-pointer transition-colors bg-white/5 opacity-60 hover:opacity-100 mb-4">
                                    <div class="flex justify-between items-start mb-2">
                                        <span class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider '.$badgeClass.'">
                                            '.$badgeText.'
                                        </span>
                                        <span class="text-xs text-gray-500">'.$fechaFormat.'</span>
                                    </div>
                                    <h4 class="font-bold text-white">'.htmlspecialchars($p['NombreVacante']).'</h4>
                                    <p class="text-sm text-gray-400">'.htmlspecialchars($p['NombreArea']).' &bull; '.htmlspecialchars($p['Sucursal']).'</p>
                                </div>
                                ';
                            }
                            
                            if (empty($postulacionesUser)) {
                                echo '<div class="text-gray-400 text-sm">No tienes postulaciones activas.</div>';
                            }
                            ?>
                        </div>

                        <div class="lg:col-span-2" id="detalle-container">
                            <!-- El contenido se renderiza por JS -->
                        </div>
                    </div>
                </div>
            <?php endif; ?>

        </main>

        <footer class="py-8 border-t border-white/5 text-center">
            <p class="text-[10px] text-gray-600 tracking-[0.3em] uppercase font-bold">
                © <span id="current-year"></span> PIP by lugo. Todos los derechos reservados.
            </p>
        </footer>
    </div>

    <script>
        lucide.createIcons();
        document.getElementById('current-year').textContent = new Date().getFullYear();

        const POSTULACIONES_DATA = <?php echo isset($todasLasPostulacionesData) && !empty($todasLasPostulacionesData) ? json_encode($todasLasPostulacionesData, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) : '{}'; ?>;
        
        function formatFecha(fechaStr) {
            if(!fechaStr) return '';
            // Parse fecha str safe
            const parts = fechaStr.split(/[- :]/);
            if(parts.length < 3) return fechaStr;
            const obj = new Date(parts[0], parts[1]-1, parts[2]);
            const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            return `${obj.getDate()} ${meses[obj.getMonth()]} ${obj.getFullYear()}`;
        }

        function seleccionarPostulacion(id) {
            // Actualizar clases de las tarjetas
            document.querySelectorAll('.nav-card').forEach(card => {
                card.classList.remove('bg-white/10', 'border', 'border-[#f2bb46]/50', 'opacity-100');
                card.classList.add('bg-white/5', 'opacity-60');
            });
            const activa = document.getElementById('card-' + id);
            if(activa) {
                activa.classList.remove('bg-white/5', 'opacity-60');
                activa.classList.add('bg-white/10', 'border', 'border-[#f2bb46]/50', 'opacity-100');
            }

            const container = document.getElementById('detalle-container');
            if(!POSTULACIONES_DATA || !POSTULACIONES_DATA[id]) {
                container.innerHTML = `
                <div class="magic-card p-6 md:p-8 h-full flex flex-col items-center justify-center text-center opacity-70">
                    <i data-lucide="folder-open" class="w-12 h-12 text-[#f2bb46] mb-4"></i>
                    <h3 class="text-lg font-bold">Sin postulaciones</h3>
                    <p class="text-sm text-gray-400 max-w-sm mt-2">No has seleccionado ninguna vacante o aún no has aplicado.</p>
                </div>`;
                lucide.createIcons();
                return;
            }

            const p = POSTULACIONES_DATA[id];
            const pIdPad = String(p.IdPostulanteVacante).padStart(4, '0');
            
            let timelineHTML = `
                <div class="timeline-item completed">
                    <div class="timeline-dot flex items-center justify-center">
                        <i data-lucide="check" class="w-3 h-3 text-white completed-icon"></i>
                    </div>
                    <h4 class="text-white font-bold mb-1">Postulación Recibida</h4>
                    <p class="text-sm text-gray-400">Hemos recibido tu CV y datos correctamente.</p>
                    <span class="text-xs text-gray-500 mt-2 block">${formatFecha(p.FechaPostulacion)}</span>
                </div>
            `;

            if(p.Historial && p.Historial.length > 0) {
                p.Historial.forEach(h => {
                    let resultado = h.Resultado;
                    let tItemClass = "";
                    let tIcon = "";
                    let tHeadingClass = "text-white";

                    if (resultado === 1 || resultado === "1") {
                        tItemClass = "completed";
                        tIcon = 'check';
                        tHeadingClass = "text-white";
                    } else if (resultado === 0 || resultado === "0") {
                        tItemClass = "rejected";
                        tHeadingClass = "text-red-400";
                        tIcon = 'x';
                    } else {
                        tItemClass = "active";
                        tHeadingClass = "text-[#f2bb46]";
                        tIcon = 'clock';
                    }

                    timelineHTML += `
                    <div class="timeline-item ${tItemClass}">
                        <div class="timeline-dot flex items-center justify-center">
                            <i data-lucide="${tIcon}" class="w-3 h-3 text-white ${resultado === 1 || resultado === '1' ? 'completed-icon' : ''}"></i>
                        </div>
                        <h4 class="${tHeadingClass} font-bold mb-1">${h.NombreProceso}</h4>
                        <p class="text-sm text-gray-400">${h.Observaciones ? h.Observaciones : 'Proceso registrado en sistema.'}</p>
                        <span class="text-xs text-gray-500 mt-2 block">${formatFecha(h.Fecha)}</span>
                    </div>
                    `;
                });
            } else {
                timelineHTML += `
                <div class="timeline-item active">
                    <div class="timeline-dot"></div>
                    <h4 class="text-[#f2bb46] font-bold mb-1">En Revisión</h4>
                    <p class="text-sm text-gray-300">Hemos recibido tu información y la estamos revisando.</p>
                </div>`;
            }

            if(parseInt(p.EstatusPostulacion) === 3) {
                timelineHTML += `
                <div class="timeline-item rejected mt-4 border-l-0">
                    <div class="timeline-dot mt-1 flex items-center justify-center">
                        <i data-lucide="x" class="w-3 h-3 text-white"></i>
                    </div>
                    <h4 class="text-red-400 font-bold mb-1 ml-6 block">Proceso Concluido</h4>
                    <p class="text-sm text-gray-400 ml-6 block">Hemos decidido no avanzar con tu postulación en esta ocasión.</p>
                </div>
                `;
            }

            container.innerHTML = `
            <div class="magic-card p-6 md:p-8 min-h-[500px] h-full fade-in">
                <div class="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                    <div class="w-12 h-12 rounded-xl bg-[#f2bb46]/10 flex items-center justify-center text-[#f2bb46]">
                        <i data-lucide="code" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">${p.NombreVacante}</h3>
                        <p class="text-sm text-[#f2bb46]">ID de proceso: #PIP-${pIdPad}</p>
                    </div>
                </div>
                <div class="timeline-container mt-4">
                    ${timelineHTML}
                </div>
            </div>`;
            
            lucide.createIcons();
        }

        <?php if(isset($primerId) && $primerId !== null): ?>
            const urlParams = new URLSearchParams(window.location.search);
            const idParam = urlParams.get('id');
            const initId = idParam ? parseInt(idParam) : <?php echo $primerId; ?>;
            if(POSTULACIONES_DATA[initId]) {
                seleccionarPostulacion(initId);
            } else {
                seleccionarPostulacion(<?php echo $primerId; ?>);
            }
        <?php elseif(isset($is_logged_in) && $is_logged_in): ?>
            seleccionarPostulacion(0);
        <?php endif; ?>
    </script>
</body>
</html>