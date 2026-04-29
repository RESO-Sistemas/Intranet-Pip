<?php
// Recibir IdPostulante o IdPostulanteVacante por URL
$idPostulante = isset($_GET['id']) ? intval($_GET['id']) : 0;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle de Candidato — Ibero</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <style>
        body { font-family:'Inter',sans-serif; background:#f8f9fa; }
        .sidebar { width:240px; background:#1a0a0a; min-height:100vh; flex-shrink:0; }
        .sidebar a { display:flex;align-items:center;gap:10px;padding:10px 18px;color:#ccc;text-decoration:none;border-radius:8px;margin:2px 8px;font-size:.875rem;transition:all .2s; }
        .sidebar a:hover { background:rgba(192,57,43,.15);color:#e74c3c; }
        .ibero { color:#c0392b; }
        /* Todo-inbox para historial de vacantes */
        .todo-menu { border-right:1px solid #e9ecef; padding:16px; background:#fff; min-height:300px; }
        .todo-menu-title { font-weight:700; font-size:.8rem; text-transform:uppercase; color:#888; letter-spacing:.05em; margin-bottom:10px; }
        .postulacion-item { border:none; border-bottom:1px solid #f0f0f0 !important; border-radius:0 !important; padding:10px 6px; font-size:.85rem; }
        .postulacion-item.active { background:#fdf0ef; color:#c0392b; font-weight:600; border-left:3px solid #c0392b; }
        .timeline { position:relative; padding-left:20px; }
        .timeline-item { position:relative; padding-bottom:18px; }
        .timeline-item::before { content:''; position:absolute; left:-12px; top:6px; bottom:-6px; width:2px; background:#e9ecef; }
        .timeline-marker { position:absolute; left:-17px; top:4px; width:12px; height:12px; border-radius:50%; border:2px solid #c0392b; background:#fff; }
        .timeline-title { font-weight:600; font-size:.85rem; margin:0 0 2px; }
        .timeline-sub { font-size:.78rem; margin:0; }
        .timeline-time { font-size:.75rem; color:#999; white-space:nowrap; }
        .eval-pill { display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:.7rem;font-weight:600;margin:2px; }
        .eval-completada { background:#d4edda;color:#155724; }
        .eval-en-progreso { background:#d1ecf1;color:#0c5460; }
        .eval-pendiente { background:#fff3cd;color:#856404; }
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
        <a href="PostulantesGeneralIbero.php"><i data-lucide="database"></i> Base Candidatos</a>
        <a href="ProcesosVacantesIbero.php"><i data-lucide="git-branch"></i> Procesos</a>
        <a href="EvaluacionesIbero.php"><i data-lucide="clipboard-list"></i> Evaluaciones</a>
        <a href="ResultadosEvaluacionIbero.php"><i data-lucide="bar-chart-2"></i> Resultados</a>
    </div>

    <!-- Main -->
    <div style="flex:1;padding:24px;overflow:auto;">
        <!-- Header con botón regresar -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h2 class="h4 fw-bold mb-0" id="headerNombreCandidato">
                    <i data-lucide="user" style="width:22px;height:22px;vertical-align:middle;margin-right:6px;color:#c0392b;"></i>
                    Cargando...
                </h2>
                <p class="text-muted small mb-0" id="headerCURPCandidato"></p>
            </div>
            <a href="PostulantesGeneralIbero.php" class="btn btn-outline-secondary btn-sm">
                <i data-lucide="arrow-left" style="width:14px;height:14px;vertical-align:middle;"></i> Regresar
            </a>
        </div>

        <!-- Card: Información personal -->
        <div class="card shadow-sm mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="fw-bold"><i data-lucide="badge" style="width:14px;height:14px;vertical-align:middle;"></i> Información del Candidato</span>
                <button class="btn btn-sm btn-outline-danger" id="btnToggleEdit" onclick="toggleEditMode()">
                    <i data-lucide="edit" style="width:12px;height:12px;"></i> Editar
                </button>
            </div>
            <div class="card-body">
                <input type="hidden" id="detIdPostulante" value="<?php echo $idPostulante; ?>">
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Nombre(s)</label>
                        <input type="text" class="form-control form-control-sm" id="fNombre" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Apellido Paterno</label>
                        <input type="text" class="form-control form-control-sm" id="fApPat" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Apellido Materno</label>
                        <input type="text" class="form-control form-control-sm" id="fApMat" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">CURP</label>
                        <input type="text" class="form-control form-control-sm text-uppercase" id="fCURP" maxlength="18" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Teléfono</label>
                        <input type="tel" class="form-control form-control-sm" id="fTelefono" maxlength="10" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Correo Electrónico</label>
                        <input type="email" class="form-control form-control-sm" id="fCorreo" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Estado</label>
                        <input type="text" class="form-control form-control-sm" id="fEstado" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Ciudad</label>
                        <input type="text" class="form-control form-control-sm" id="fCiudad" disabled>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small">Dirección</label>
                        <input type="text" class="form-control form-control-sm" id="fDireccion" disabled>
                    </div>
                </div>
                <div class="row mt-3" id="editButtons" style="display:none!important;">
                    <div class="col text-end">
                        <button class="btn btn-secondary btn-sm me-2" onclick="cancelarEdicion()">Cancelar</button>
                        <button class="btn btn-danger btn-sm" onclick="guardarCandidato()">
                            <i data-lucide="save" style="width:12px;height:12px;"></i> Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card: Historial de postulaciones (todo-inbox) -->
        <div class="card shadow-sm mb-4 overflow-hidden">
            <div class="card-header fw-bold">
                <i data-lucide="work-history" style="width:14px;height:14px;vertical-align:middle;"></i> Historial de Postulaciones
            </div>
            <div class="card-body p-0">
                <div class="row g-0">
                    <div class="col-xl-4">
                        <div class="todo-menu">
                            <h5 class="todo-menu-title">Vacantes</h5>
                            <div id="listaVacantes"><div class="text-muted small">Cargando...</div></div>
                        </div>
                    </div>
                    <div class="col-xl-8">
                        <div class="p-4">
                            <h6 id="tituloVacante" class="fw-bold mb-3">Selecciona una vacante</h6>
                            <div id="timelineProcesos"><div class="text-muted small">Selecciona una vacante del panel.</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card: Evaluaciones del candidato -->
        <div class="card shadow-sm">
            <div class="card-header fw-bold">
                <i data-lucide="clipboard-list" style="width:14px;height:14px;vertical-align:middle;"></i> Evaluaciones
            </div>
            <div class="card-body">
                <div id="seccionEvaluaciones"><div class="text-muted small">Selecciona una vacante para ver sus evaluaciones.</div></div>
            </div>
        </div>
    </div>
</div>

<script>
    const ID_POSTULANTE = <?php echo $idPostulante; ?>;
</script>
<script src="scripts/PostulanteDetalleIbero.js"></script>
<script>lucide.createIcons();toastr.options={positionClass:'toast-top-right',timeOut:4000,progressBar:true};</script>
</body>
</html>
