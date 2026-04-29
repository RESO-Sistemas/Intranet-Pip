<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evaluaciones Ibero — Admin</title>
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
        .sidebar a { display:flex; align-items:center; gap:10px; padding:10px 18px; color:#ccc; text-decoration:none; border-radius:8px; margin:2px 8px; font-size:0.875rem; transition:all .2s; }
        .sidebar a:hover, .sidebar a.active { background:rgba(192,57,43,0.15); color:#e74c3c; }
        .ibero { color:#c0392b; }
        .tipo-badge { font-size:.7rem; padding:.2em .6em; border-radius:999px; font-weight:600; }
        .card-metric { border-left:4px solid #c0392b; }
        .progress-ibero .progress-bar { background:#c0392b; }
        .preguntas-panel { background:#f8f9fa; border-radius:12px; padding:16px; }
        .pregunta-card { background:white; border:1px solid #e9ecef; border-radius:10px; padding:14px; margin-bottom:10px; }
        .pregunta-card .pregunta-header { font-weight:600; font-size:.9rem; margin-bottom:6px; }
        .badge-tipo { font-size:.65rem; }
    </style>
</head>
<body>
<div style="display:flex;">
    <!-- Sidebar -->
    <div class="sidebar py-4">
        <div class="px-5 pb-4 mb-2 border-b" style="border-color:rgba(255,255,255,0.1)!important">
            <div class="d-flex align-items-center gap-2">
                <div style="width:36px;height:36px;background:#c0392b;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:white;">I</div>
                <div style="color:white;font-weight:700;font-size:.9rem;">Ibero Admin</div>
            </div>
        </div>
        <a href="VacantesIbero.php"><i data-lucide="briefcase"></i> Vacantes</a>
        <a href="PostulantesVacanteIbero.php"><i data-lucide="users"></i> Postulantes</a>
        <a href="PostulantesGeneralIbero.php"><i data-lucide="database"></i> Base Candidatos</a>
        <a href="ProcesosVacantesIbero.php"><i data-lucide="git-branch"></i> Procesos</a>
        <a href="EvaluacionesIbero.php" class="active"><i data-lucide="clipboard-list"></i> Evaluaciones</a>
        <a href="ResultadosEvaluacionIbero.php"><i data-lucide="bar-chart-2"></i> Resultados</a>
        <div style="border-top:1px solid rgba(255,255,255,.1);margin:8px 0;padding-top:8px;">
            <a href="BolsaDeTrabajoIbero.php" target="_blank"><i data-lucide="external-link"></i> Portal Público</a>
        </div>
    </div>

    <!-- Main -->
    <div style="flex:1;padding:24px;overflow:auto;">
        <!-- Tabs -->
        <ul class="nav nav-tabs mb-4">
            <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tabEvaluaciones">Evaluaciones</a></li>
            <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabMetricas">Métricas</a></li>
        </ul>

        <div class="tab-content">
            <!-- TAB 1: Gestión de Evaluaciones -->
            <div class="tab-pane fade show active" id="tabEvaluaciones">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h2 class="h4 fw-bold mb-0">Evaluaciones <span class="ibero">Ibero</span></h2>
                        <p class="text-muted small">Crea y configura evaluaciones para los candidatos</p>
                    </div>
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalAddEval">+ Nueva Evaluación</button>
                </div>

                <div class="row g-3" id="grid-evaluaciones">
                    <div class="col-12 text-center py-5 text-muted">Cargando evaluaciones...</div>
                </div>
            </div>

            <!-- TAB 2: Métricas -->
            <div class="tab-pane fade" id="tabMetricas">
                <div class="mb-3">
                    <h2 class="h4 fw-bold mb-0">Métricas de Evaluaciones</h2>
                    <p class="text-muted small">Selecciona una evaluación asignada a una vacante para ver resultados</p>
                </div>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Evaluación (vacante)</label>
                        <select id="cmbMetricaEval" class="form-select"><option value="">Selecciona...</option></select>
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <button class="btn btn-danger w-100" onclick="cargarMetricas()">Ver métricas</button>
                    </div>
                </div>
                <div id="panel-metricas"></div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Nueva Evaluación -->
<div class="modal fade" id="modalAddEval" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">Nueva Evaluación</h5>
                <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3"><label class="form-label fw-bold">Título <span class="text-danger">*</span></label>
                    <input id="txtTituloEval" class="form-control" placeholder="Ej. Evaluación Técnica de Sistemas"></div>
                <div class="mb-3"><label class="form-label fw-bold">Tipo</label>
                    <select id="cmbTipoEval" class="form-select">
                        <option value="2">Encuesta / Evaluación normal</option>
                        <option value="1">Evaluación 360°</option>
                    </select></div>
                <div class="row g-2">
                    <div class="col-6"><label class="form-label fw-bold">Fecha Inicio</label>
                        <input id="txtFechaInicioEval" type="date" class="form-control"></div>
                    <div class="col-6"><label class="form-label fw-bold">Fecha Fin</label>
                        <input id="txtFechaFinEval" type="date" class="form-control"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-danger" id="btnAddEval">Crear Evaluación</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar Preguntas -->
<div class="modal fade" id="modalPreguntas" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalPreguntasTitulo">Preguntas de la Evaluación</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body row g-3">
                <!-- Formulario agregar pregunta -->
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-header fw-bold small">Agregar Pregunta</div>
                        <div class="card-body">
                            <input type="hidden" id="preguntaIdEval">
                            <input type="hidden" id="editPreguntaId">
                            <div class="mb-2"><label class="form-label small fw-bold">Pregunta</label>
                                <textarea id="txtPreguntaTitulo" class="form-control form-control-sm" rows="2" placeholder="Texto de la pregunta..."></textarea></div>
                            <div class="mb-2"><label class="form-label small fw-bold">Tipo</label>
                                <select id="cmbTipoPregunta" class="form-select form-select-sm" onchange="toggleCamposRango()">
                                </select></div>
                            <div id="row-rango" class="mb-2" style="display:none;">
                                <label class="form-label small fw-bold">Rango (Mín / Máx)</label>
                                <div class="d-flex gap-2">
                                    <input id="txtRangoMin" type="number" class="form-control form-control-sm" value="1" min="1" placeholder="Mín">
                                    <input id="txtRangoMax" type="number" class="form-control form-control-sm" value="10" min="1" placeholder="Máx">
                                </div>
                            </div>
                            <div class="mb-2"><label class="form-label small fw-bold">Orden</label>
                                <input id="txtOrdenPregunta" type="number" class="form-control form-control-sm" value="1" min="1"></div>
                            <div class="mb-2"><label class="form-label small fw-bold">Competencia (opcional)</label>
                                <select id="cmbCompetencia" class="form-select form-select-sm"><option value="">Sin competencia</option></select></div>
                            <button class="btn btn-danger btn-sm w-100" id="btnAddPregunta">Agregar Pregunta</button>
                            <button class="btn btn-secondary btn-sm w-100 mt-2" id="btnCancelEdit" style="display:none;">Cancelar Edición</button>
                        </div>
                    </div>
                </div>
                <!-- Lista de preguntas -->
                <div class="col-md-8">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="fw-bold small">Preguntas registradas</span>
                        <button class="btn btn-sm btn-success" id="btnActivarEval">✓ Activar Evaluación</button>
                    </div>
                    <div id="lista-preguntas" class="preguntas-panel" style="max-height:60vh;overflow-y:auto;">
                        <p class="text-muted text-center py-3 small">Cargando...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Respuesta Correcta -->
<div class="modal fade" id="modalRespCorrecta" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Definir Respuesta Correcta</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <input type="hidden" id="rcIdPregunta">
                <input type="hidden" id="rcTipoPregunta">
                <div id="rc-bool" class="mb-3">
                    <label class="form-label fw-bold">Respuesta Verdadero/Falso</label>
                    <select id="cmbRCBool" class="form-select">
                        <option value="">Sin respuesta correcta</option>
                        <option value="1">Verdadero</option><option value="0">Falso</option>
                    </select></div>
                <div id="rc-om" class="mb-3">
                    <label class="form-label fw-bold">Opción correcta</label>
                    <select id="cmbRCOM" class="form-select"><option value="">Sin respuesta correcta</option></select></div>
                <div id="rc-rango" class="mb-3">
                    <label class="form-label fw-bold">Valor esperado (Rango)</label>
                    <input type="number" id="txtRCRango" class="form-control" placeholder="Ej. 5"></div>
                <div id="rc-texto" class="mb-3">
                    <label class="form-label fw-bold">Texto exacto (Texto Libre)</label>
                    <input type="text" id="txtRCTexto" class="form-control" placeholder="Palabra o frase esperada"></div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-danger" id="btnGuardarRC">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Métricas Detalle -->
<div class="modal fade" id="modalRespDetalle" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title" id="tituloRespDetalle">Respuestas del Candidato</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body" id="bodyRespDetalle"></div>
        </div>
    </div>
</div>

<script src="scripts/EvaluacionesIbero.js"></script>
<script>
    lucide.createIcons();
    toastr.options = {positionClass:'toast-top-right',timeOut:4000,progressBar:true};
</script>
</body>
</html>
