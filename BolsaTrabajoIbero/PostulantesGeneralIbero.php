<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candidatos — Bolsa de Trabajo Ibero</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <style>
        body { font-family:'Inter',sans-serif; background:#f8f9fa; }
        .sidebar { width:240px; background:#1a0a0a; min-height:100vh; flex-shrink:0; }
        .sidebar a { display:flex; align-items:center; gap:10px; padding:10px 18px; color:#ccc; text-decoration:none; border-radius:8px; margin:2px 8px; font-size:.875rem; transition:all .2s; }
        .sidebar a:hover, .sidebar a.active { background:rgba(192,57,43,.15); color:#e74c3c; }
        .ibero { color:#c0392b; }
        /* Todo-inbox layout igual que PIP */
        .todo-container { border-radius:12px; overflow:hidden; }
        .todo-menu { border-right:1px solid #e9ecef; padding:16px; background:#fff; min-height:420px; }
        .todo-menu-title { font-weight:700; font-size:.8rem; text-transform:uppercase; color:#888; letter-spacing:.05em; margin-bottom:10px; }
        .todo-list { padding:20px; background:#fff; }
        .postulacion-item { border:none; border-bottom:1px solid #f0f0f0 !important; border-radius:0 !important; padding:10px 6px; font-size:.85rem; }
        .postulacion-item.active { background:#fdf0ef; color:#c0392b; font-weight:600; border-left:3px solid #c0392b; }
        /* Timeline igual a PIP */
        .timeline { position:relative; padding-left:20px; }
        .timeline-item { position:relative; padding-bottom:18px; }
        .timeline-item::before { content:''; position:absolute; left:-12px; top:6px; bottom:-6px; width:2px; background:#e9ecef; }
        .timeline-marker { position:absolute; left:-17px; top:4px; width:12px; height:12px; border-radius:50%; border:2px solid #c0392b; background:#fff; }
        .timeline-title { font-weight:600; font-size:.85rem; margin:0 0 2px; }
        .timeline-sub { font-size:.78rem; margin:0; }
        .timeline-time { font-size:.75rem; color:#999; white-space:nowrap; }
        .badge-estatus-1 { background:#ffc107;color:#000; }
        .badge-estatus-2 { background:#28a745;color:#fff; }
        .badge-estatus-3 { background:#dc3545;color:#fff; }
        .badge-estatus-4 { background:#6c757d;color:#fff; }
        tr.selected td { background:#fdf0ef !important; }
    </style>
</head>
<body>
<div style="display:flex;">
    <!-- Sidebar -->
    <div class="sidebar py-4">
        <div class="px-5 pb-4 mb-2">
            <div class="d-flex align-items-center gap-2">
                <div style="width:36px;height:36px;background:#c0392b;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:white;">I</div>
                <div style="color:white;font-weight:700;font-size:.9rem;">Ibero Admin</div>
            </div>
        </div>
        <a href="VacantesIbero.php"><i data-lucide="briefcase"></i> Vacantes</a>
        <a href="PostulantesVacanteIbero.php"><i data-lucide="users"></i> Por Vacante</a>
        <a href="PostulantesGeneralIbero.php" class="active"><i data-lucide="database"></i> Base Candidatos</a>
        <a href="ProcesosVacantesIbero.php"><i data-lucide="git-branch"></i> Procesos</a>
        <a href="EvaluacionesIbero.php"><i data-lucide="clipboard-list"></i> Evaluaciones</a>
        <a href="ResultadosEvaluacionIbero.php"><i data-lucide="bar-chart-2"></i> Resultados</a>
        <div style="border-top:1px solid rgba(255,255,255,.1);margin:8px 0;padding-top:8px;">
            <a href="BolsaDeTrabajoIbero.php" target="_blank"><i data-lucide="external-link"></i> Portal Público</a>
            <a href="EstatusPostulanteIbero.php" target="_blank"><i data-lucide="user-check"></i> Portal Candidato</a>
        </div>
    </div>

    <!-- Main -->
    <div style="flex:1;padding:24px;overflow:auto;">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h2 class="h4 fw-bold mb-0">Base de datos de <span class="ibero">Candidatos</span></h2>
                <p class="text-muted small mb-0">Administración centralizada — todos los candidatos Ibero</p>
            </div>
        </div>

        <!-- Layout Todo-Inbox -->
        <div class="card todo-container shadow-sm">
            <div class="card-body p-0">
                <div class="row g-0">
                    <!-- Panel izquierdo: lista de postulaciones -->
                    <div class="col-xl-4 col-xxl-3">
                        <div class="todo-menu">
                            <h5 class="todo-menu-title">Postulaciones</h5>
                            <div id="listaPostulaciones">
                                <div class="text-muted small">Selecciona un candidato</div>
                            </div>
                        </div>
                    </div>
                    <!-- Panel derecho: timeline de procesos -->
                    <div class="col-xl-8 col-xxl-9">
                        <div class="todo-list">
                            <h4 id="tituloProcesos" class="mb-4">Procesos</h4>
                            <div id="timelineProcesos">
                                <div class="text-muted small">Selecciona un candidato y luego una vacante.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla general -->
        <div class="card shadow-sm mt-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="fw-bold"><i data-lucide="users" style="width:16px;height:16px;vertical-align:middle;"></i> Todos los candidatos</span>
            </div>
            <div class="card-body">
                <table id="tablePostulantesGeneral" class="table display text-center" style="width:100%">
                    <thead>
                        <tr>
                            <th>CURP</th><th>Nombre</th><th>Primera postulación</th>
                            <th>Última vacante</th><th>Último estatus</th><th>Postulaciones</th><th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script src="scripts/PostulantesGeneralIbero.js"></script>
<script>lucide.createIcons();toastr.options={positionClass:'toast-top-right',timeOut:4000,progressBar:true};</script>
</body>
</html>
