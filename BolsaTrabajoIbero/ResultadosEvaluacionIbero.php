<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Evaluaciones — Ibero</title>
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family:'Inter',sans-serif; background:#f8f9fa; }
        .sidebar { width:240px; background:#1a0a0a; min-height:100vh; flex-shrink:0; }
        .sidebar a { display:flex;align-items:center;gap:10px;padding:10px 18px;color:#ccc;text-decoration:none;border-radius:8px;margin:2px 8px;font-size:.875rem;transition:all .2s; }
        .sidebar a:hover, .sidebar a.active { background:rgba(192,57,43,.15);color:#e74c3c; }
        .ibero { color:#c0392b; }
        .progress-ibero .progress-bar { background:#c0392b; }
        .card-metric { border-left:4px solid #c0392b; }
        /* Scoreboard card */
        .candidate-card { background:#fff;border:1px solid #e9ecef;border-radius:12px;padding:16px;margin-bottom:12px;transition:all .2s;cursor:pointer; }
        .candidate-card:hover { border-color:#c0392b;box-shadow:0 4px 16px rgba(192,57,43,.1); }
        .candidate-card.top-1 { border-color:#ffc107;background:#fffdf0; }
        .candidate-card.top-2 { border-color:#adb5bd;background:#f8f9fa; }
        .candidate-card.top-3 { border-color:#cd7f32;background:#fdf9f5; }
        .rank-badge { width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1rem;flex-shrink:0; }
        .rank-1 { background:#ffc107;color:#000; }
        .rank-2 { background:#adb5bd;color:#fff; }
        .rank-3 { background:#cd7f32;color:#fff; }
        .rank-other { background:#e9ecef;color:#555; }
        .eval-pill { display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:.7rem;font-weight:600;margin:2px; }
        .eval-completada { background:#d4edda;color:#155724; }
        .eval-en-progreso { background:#d1ecf1;color:#0c5460; }
        .eval-pendiente   { background:#fff3cd;color:#856404; }
        /* Respuestas detalle */
        .respuesta-correcta { background:#d4edda; }
        .respuesta-incorrecta { background:#f8d7da; }
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
        <a href="ResultadosEvaluacionIbero.php" class="active"><i data-lucide="bar-chart-2"></i> Resultados</a>
        <div style="border-top:1px solid rgba(255,255,255,.1);margin:8px 0;padding-top:8px;">
            <a href="BolsaDeTrabajoIbero.php" target="_blank"><i data-lucide="external-link"></i> Portal Público</a>
            <a href="EstatusPostulanteIbero.php" target="_blank"><i data-lucide="user-check"></i> Portal Candidato</a>
        </div>
    </div>

    <!-- Main -->
    <div style="flex:1;padding:24px;overflow:auto;">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="h4 fw-bold mb-0">Comparativa de <span class="ibero">Resultados</span></h2>
                <p class="text-muted small mb-0">Análisis de evaluaciones por vacante</p>
            </div>
        </div>

        <!-- Selector de vacante -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <div class="row g-3 align-items-end">
                    <div class="col-md-8">
                        <label class="form-label fw-bold">Seleccionar Vacante</label>
                        <select id="cmbVacanteResultados" class="form-select">
                            <option value="">Cargando vacantes...</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-danger w-100" onclick="cargarComparativa()">
                            <i data-lucide="bar-chart-2" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i>
                            Ver Comparativa
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel de métricas globales -->
        <div id="panel-metricas-globales" class="row g-3 mb-4" style="display:none!important"></div>

        <!-- Tabs de tipo de resultado (igual a PIP) -->
        <div id="panel-resultados" style="display:none;">
            <ul class="nav nav-tabs mb-4" id="tabsResultados">
                <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tabRanking">Ranking General</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabFortalezas">Fortalezas y Áreas</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabCalculo">Cálculo detallado</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tabCompetencias"><i data-lucide="radar" style="width:13px;height:13px;vertical-align:middle;margin-right:3px;"></i> Radar Competencias</a></li>
            </ul>

            <div class="tab-content">
                <!-- TAB 1: Ranking -->
                <div class="tab-pane fade show active" id="tabRanking">
                    <div id="grid-ranking"></div>
                    <div class="card shadow-sm mt-4" id="card-barras-ranking" style="display:none;">
                        <div class="card-body">
                            <h6 class="fw-bold mb-3">Comparativa de Promedios</h6>
                            <canvas id="graficaBarrasRanking" style="max-height:350px;"></canvas>
                        </div>
                    </div>
                </div>

                <!-- TAB 2: Fortalezas y Áreas a Mejorar -->
                <div class="tab-pane fade" id="tabFortalezas">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="card shadow-sm">
                                <div class="card-header fw-bold text-success">
                                    <i data-lucide="trending-up" style="width:14px;height:14px;vertical-align:middle;"></i> Fortalezas (Mejores calificaciones)
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-hover mb-0" id="tableFortalezas">
                                        <thead class="table-light"><tr><th>Candidato</th><th>Evaluación</th><th>Calificación</th></tr></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card shadow-sm">
                                <div class="card-header fw-bold text-danger">
                                    <i data-lucide="trending-down" style="width:14px;height:14px;vertical-align:middle;"></i> Áreas a Mejorar (Menores calificaciones)
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-hover mb-0" id="tableAreas">
                                        <thead class="table-light"><tr><th>Candidato</th><th>Evaluación</th><th>Calificación</th></tr></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB 3: Cálculo detallado -->
                <div class="tab-pane fade" id="tabCalculo">
                    <div id="tabla-calculo"></div>
                </div>

                <!-- TAB 4: Radar por Competencias -->
                <div class="tab-pane fade" id="tabCompetencias">
                    <div class="card shadow-sm mb-3">
                        <div class="card-body">
                            <label class="form-label fw-bold mb-2">Candidatos a comparar</label>
                            <select id="selectCandidatosRadar" class="form-select" multiple size="6">
                                <option disabled>Carga una vacante primero...</option>
                            </select>
                            <small class="text-muted">Ctrl+Click (o Cmd+Click en Mac) para seleccionar múltiples</small>
                        </div>
                    </div>
                    <div class="card shadow-sm" id="card-radar-competencias" style="display:none;">
                        <div class="card-body">
                            <h6 class="fw-bold mb-3">Radar de Competencias por Candidato</h6>
                            <canvas id="graficaRadarCompetencias" style="max-height:520px;"></canvas>
                        </div>
                    </div>
                    <div id="msg-sin-competencias" class="text-center text-muted py-5" style="display:none;">
                        <i data-lucide="info" style="width:32px;height:32px;"></i>
                        <p class="mt-2">Sin datos de competencias para esta vacante.<br><small>Verifica que las preguntas tengan competencias asignadas y que los candidatos hayan completado evaluaciones.</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal detalle de candidato -->
<div class="modal fade" id="modalDetalleCandidato" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModalDetalle">Detalle del Candidato</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <!-- Resumen del candidato -->
                <div id="detalle-candidato-header" class="mb-4"></div>
                <!-- Evaluaciones con respuestas -->
                <div id="detalle-evaluaciones"></div>
                <!-- Gráfica de resultados -->
                <div class="mt-4" id="detalle-grafica-container" style="display:none;">
                    <h6 class="fw-bold mb-3">Gráfica de Calificaciones por Evaluación</h6>
                    <canvas id="graficaDetalleCandidato" style="max-height:300px;"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="scripts/ResultadosEvaluacionIbero.js"></script>
<script>
    lucide.createIcons();
    toastr.options = {positionClass:'toast-top-right',timeOut:4000,progressBar:true};
</script>
</body>
</html>
