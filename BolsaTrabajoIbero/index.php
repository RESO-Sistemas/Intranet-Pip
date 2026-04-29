<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bolsa de Trabajo Ibero — Panel de Acceso</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={theme:{extend:{colors:{ibero:{DEFAULT:'#c0392b',dark:'#922b21',light:'#e74c3c'}},fontFamily:{sans:['Inter','sans-serif']}}}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <style>
        body { font-family:'Inter',sans-serif; background:#0a0a0a; }
        ::selection { background:#c0392b; color:white; }
        .card-link { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:1.25rem;
                     transition:all .3s ease; text-decoration:none; display:flex; flex-direction:column; align-items:center;
                     justify-content:center; padding:2.5rem 2rem; gap:1rem; color:white; }
        .card-link:hover { border-color:rgba(192,57,43,0.5); transform:translateY(-4px); box-shadow:0 20px 40px rgba(192,57,43,0.15); color:white; }
        .card-link .icon { width:56px; height:56px; border-radius:1rem; display:flex; align-items:center; justify-content:center; }
        .bg-grad { background:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(192,57,43,0.25) 0%,transparent 70%); }
    </style>
</head>
<body class="min-h-screen bg-grad">
    <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="text-center mb-14">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ibero text-white font-black text-3xl mb-5">I</div>
            <h1 class="text-5xl font-black text-white mb-3">Bolsa de Trabajo<br><span style="color:#e74c3c;">Ibero</span></h1>
            <p class="text-gray-500 text-lg">Portal de gestión de empleo — Universidad Iberoamericana</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <a href="BolsaDeTrabajoIbero.php" class="card-link">
                <div class="icon" style="background:rgba(192,57,43,0.15);border:1px solid rgba(192,57,43,0.3);">
                    <i data-lucide="briefcase" style="color:#e74c3c;width:28px;height:28px;"></i>
                </div>
                <div class="text-center">
                    <div class="font-bold text-lg">Portal de Vacantes</div>
                    <div class="text-gray-500 text-sm mt-1">Consulta pública de oportunidades</div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(192,57,43,0.15);color:#e74c3c;border:1px solid rgba(192,57,43,0.3);">Público</span>
            </a>

            <a href="EstatusPostulanteIbero.php" class="card-link">
                <div class="icon" style="background:rgba(41,128,185,0.15);border:1px solid rgba(41,128,185,0.3);">
                    <i data-lucide="user-check" style="color:#3498db;width:28px;height:28px;"></i>
                </div>
                <div class="text-center">
                    <div class="font-bold text-lg">Portal del Candidato</div>
                    <div class="text-gray-500 text-sm mt-1">Seguimiento de postulaciones</div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(41,128,185,0.15);color:#3498db;border:1px solid rgba(41,128,185,0.3);">Candidatos</span>
            </a>

            <a href="VacantesIbero.php" class="card-link">
                <div class="icon" style="background:rgba(39,174,96,0.15);border:1px solid rgba(39,174,96,0.3);">
                    <i data-lucide="layout-dashboard" style="color:#2ecc71;width:28px;height:28px;"></i>
                </div>
                <div class="text-center">
                    <div class="font-bold text-lg">Gestión de Vacantes</div>
                    <div class="text-gray-500 text-sm mt-1">Panel administrativo RH</div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(39,174,96,0.15);color:#2ecc71;border:1px solid rgba(39,174,96,0.3);">Admin</span>
            </a>

            <a href="PostulantesVacanteIbero.php" class="card-link">
                <div class="icon" style="background:rgba(142,68,173,0.15);border:1px solid rgba(142,68,173,0.3);">
                    <i data-lucide="users" style="color:#9b59b6;width:28px;height:28px;"></i>
                </div>
                <div class="text-center">
                    <div class="font-bold text-lg">Postulantes</div>
                    <div class="text-gray-500 text-sm mt-1">Lista de candidatos por vacante</div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(142,68,173,0.15);color:#9b59b6;border:1px solid rgba(142,68,173,0.3);">Admin</span>
            </a>

            <a href="ProcesosVacantesIbero.php" class="card-link">
                <div class="icon" style="background:rgba(230,126,34,0.15);border:1px solid rgba(230,126,34,0.3);">
                    <i data-lucide="git-branch" style="color:#e67e22;width:28px;height:28px;"></i>
                </div>
                <div class="text-center">
                    <div class="font-bold text-lg">Procesos de Selección</div>
                    <div class="text-gray-500 text-sm mt-1">Catálogo de etapas</div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:rgba(230,126,34,0.15);color:#e67e22;border:1px solid rgba(230,126,34,0.3);">Admin</span>
            </a>

            <div class="card-link" style="cursor:default;opacity:0.5;">
                <div class="icon" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);">
                    <i data-lucide="database" style="color:#888;width:28px;height:28px;"></i>
                </div>
                <div class="text-center">
                    <div class="font-bold text-lg">Base de Datos</div>
                    <div class="text-gray-500 text-sm mt-1">Ejecutar ibero_schema.sql</div>
                </div>
                <code class="text-xs text-gray-600">database/ibero_schema.sql</code>
            </div>
        </div>

        <div class="mt-10 p-5 rounded-2xl" style="background:rgba(192,57,43,0.08);border:1px solid rgba(192,57,43,0.2);">
            <div class="flex items-start gap-3">
                <i data-lucide="info" style="color:#e74c3c;width:20px;height:20px;flex-shrink:0;margin-top:2px;"></i>
                <div>
                    <p class="text-white font-semibold mb-1">Primer uso</p>
                    <p class="text-gray-400 text-sm">
                        Ejecuta el archivo <code class="text-ibero-light">database/ibero_schema.sql</code> en tu servidor MySQL
                        antes de usar el sistema. Crea todas las tablas necesarias con los datos iniciales del catálogo.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>
