<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión Vacantes — IBERO Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={theme:{extend:{colors:{ibero:{DEFAULT:'#c0392b',dark:'#922b21',light:'#e74c3c'}},fontFamily:{sans:['Inter','sans-serif']}}}}</script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Toastr -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <style>
        body { font-family:'Inter',sans-serif; background:#f8f9fa; }
        .sidebar { width:240px; background:#1a0a0a; min-height:100vh; flex-shrink:0; }
        .sidebar a { display:flex; align-items:center; gap:10px; padding:10px 18px; color:#ccc; text-decoration:none; border-radius:8px; margin:2px 8px; font-size:0.875rem; transition:all .2s; }
        .sidebar a:hover, .sidebar a.active { background:rgba(192,57,43,0.15); color:#e74c3c; }
        .sidebar a i { width:18px; height:18px; }
        .ibero-accent { color:#c0392b; }
        .badge-borrador { background:#e3f2fd; color:#1976d2; }
        .badge-activa { background:#e8f5e9; color:#2e7d32; }
        .badge-cerrada { background:#ffebee; color:#c62828; }
        .table-responsive { overflow:visible!important; }
        .dropdown-menu { z-index:1050; }
    </style>
</head>
<body>
<div style="display:flex;">
    <!-- Sidebar -->
    <div class="sidebar py-4">
        <div class="px-5 pb-4 mb-2 border-b border-white/10">
            <div class="flex items-center gap-3">
                <div style="width:36px;height:36px;background:#c0392b;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:white;font-size:1.1rem;">I</div>
                <div>
                    <div style="color:white;font-weight:700;font-size:0.9rem;line-height:1.2;">Ibero Admin</div>
                    <div style="color:#777;font-size:0.7rem;">Bolsa de Trabajo</div>
                </div>
            </div>
        </div>
        <a href="VacantesIbero.php" class="active"><i data-lucide="briefcase"></i> Vacantes</a>
        <a href="PostulantesVacanteIbero.php"><i data-lucide="users"></i> Postulantes</a>
        <a href="PostulantesGeneralIbero.php"><i data-lucide="database"></i> Base Candidatos</a>
        <a href="ProcesosVacantesIbero.php"><i data-lucide="git-branch"></i> Procesos</a>
        <a href="EvaluacionesIbero.php"><i data-lucide="clipboard-list"></i> Evaluaciones</a>
        <a href="ResultadosEvaluacionIbero.php"><i data-lucide="bar-chart-2"></i> Resultados</a>
        <div class="border-t border-white/10 mt-3 pt-3">
            <a href="BolsaDeTrabajoIbero.php" target="_blank"><i data-lucide="external-link"></i> Portal Público</a>
            <a href="EstatusPostulanteIbero.php" target="_blank"><i data-lucide="user-check"></i> Portal Candidato</a>
        </div>
    </div>

    <!-- Main -->
    <div style="flex:1; padding:24px; max-width:calc(100vw - 240px);">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="h3 fw-bold mb-0">Gestión de Vacantes <span class="ibero-accent">Ibero</span></h1>
                <p class="text-muted small">Administración de vacantes laborales Universidad Iberoamericana</p>
            </div>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalAddVacante" onclick="prepareAddModal()">
                <span data-lucide="plus" class="me-1" style="width:16px;height:16px;vertical-align:middle;display:inline-block;"></span>
                Nueva Vacante
            </button>
        </div>

        <!-- Stats -->
        <div class="row g-3 mb-4">
            <div class="col-md-3"><div class="card text-center shadow-sm"><div class="card-body py-3">
                <h3 class="mb-1 text-primary" id="totalVacantes">-</h3><small class="text-muted">Total</small>
            </div></div></div>
            <div class="col-md-3"><div class="card text-center shadow-sm"><div class="card-body py-3">
                <h3 class="mb-1 text-info" id="vacantesBorrador">-</h3><small class="text-muted">Borrador</small>
            </div></div></div>
            <div class="col-md-3"><div class="card text-center shadow-sm"><div class="card-body py-3">
                <h3 class="mb-1 text-success" id="vacantesActivas">-</h3><small class="text-muted">Activas</small>
            </div></div></div>
            <div class="col-md-3"><div class="card text-center shadow-sm"><div class="card-body py-3">
                <h3 class="mb-1 text-danger" id="vacantesCerradas">-</h3><small class="text-muted">Cerradas</small>
            </div></div></div>
        </div>

        <!-- Tabla -->
        <div class="card shadow-sm">
            <div class="card-header"><h5 class="card-title fw-bold mb-0">Listado de Vacantes</h5></div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="tableVacantes" class="table table-hover align-middle" style="width:100%">
                        <thead class="table-light">
                            <tr><th>#</th><th>Vacante</th><th>Área</th><th>Tipo</th><th>Apertura</th><th>Estatus</th><th>Publicada</th><th>Acciones</th></tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Agregar Vacante -->
<div class="modal fade" id="modalAddVacante" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">Nueva Vacante Ibero</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row g-3">
                    <div class="col-md-6"><label class="form-label fw-bold">Nombre <span class="text-danger">*</span></label>
                        <input id="txtNombreVacante" class="form-control" placeholder="Ej. Analista de Sistemas"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Tipo Contratación <span class="text-danger">*</span></label>
                        <select id="cmbTipoContratacion" class="form-select">
                            <option value="">Seleccione...</option>
                            <option>Tiempo completo</option><option>Medio tiempo</option><option>Temporal</option><option>Por proyecto</option>
                        </select></div>
                    <div class="col-md-4"><label class="form-label fw-bold">Área Técnica</label>
                        <select id="cmbAreaTecnica" class="form-select"><option value="">Seleccione...</option></select></div>
                    <div class="col-md-4"><label class="form-label fw-bold">Puesto</label>
                        <select id="cmbPuesto" class="form-select"><option value="">Seleccione...</option></select></div>
                    <div class="col-md-4"><label class="form-label fw-bold">Empresa</label>
                        <select id="cmbEmpresa" class="form-select"><option value="">Seleccione...</option></select></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Salario Mínimo</label>
                        <input id="txtSalarioMinimo" type="number" step="0.01" class="form-control" placeholder="0.00"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Salario Máximo</label>
                        <input id="txtSalarioMaximo" type="number" step="0.01" class="form-control" placeholder="0.00"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Fecha Apertura <span class="text-danger">*</span></label>
                        <input id="txtFechaApertura" type="date" class="form-control"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Fecha Cierre</label>
                        <input id="txtFechaCierre" type="date" class="form-control"></div>
                    <div class="col-12"><label class="form-label fw-bold">Descripción</label>
                        <textarea id="txtDescripcionPuesto" class="form-control" rows="3" placeholder="Responsabilidades..."></textarea></div>
                    <div class="col-md-6"><div class="form-check">
                        <input class="form-check-input" type="checkbox" id="chkBanderaCV">
                        <label class="form-check-label" for="chkBanderaCV">Requiere CV</label>
                    </div></div>
                    <div class="col-md-6"><div class="form-check">
                        <input class="form-check-input" type="checkbox" id="chkBanderaSE">
                        <label class="form-check-label" for="chkBanderaSE">Solicitud de Empleo</label>
                    </div></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-danger" id="btnAddVacante">Registrar Vacante</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Editar Vacante -->
<div class="modal fade" id="modalEditVacante" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Editar Vacante</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <input type="hidden" id="editIdVacante">
                <div class="row g-3">
                    <div class="col-md-6"><label class="form-label fw-bold">Nombre <span class="text-danger">*</span></label>
                        <input id="editNombreVacante" class="form-control"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Tipo Contratación</label>
                        <select id="editTipoContratacion" class="form-select">
                            <option value="">Seleccione...</option>
                            <option>Tiempo completo</option><option>Medio tiempo</option><option>Temporal</option><option>Por proyecto</option>
                        </select></div>
                    <div class="col-md-4"><label class="form-label fw-bold">Área Técnica</label>
                        <select id="editAreaTecnica" class="form-select"><option value="">Seleccione...</option></select></div>
                    <div class="col-md-4"><label class="form-label fw-bold">Puesto</label>
                        <select id="editPuesto" class="form-select"><option value="">Seleccione...</option></select></div>
                    <div class="col-md-4"><label class="form-label fw-bold">Empresa</label>
                        <select id="editEmpresa" class="form-select"><option value="">Seleccione...</option></select></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Salario Mínimo</label>
                        <input id="editSalarioMinimo" type="number" step="0.01" class="form-control"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Salario Máximo</label>
                        <input id="editSalarioMaximo" type="number" step="0.01" class="form-control"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Fecha Apertura</label>
                        <input id="editFechaApertura" type="date" class="form-control"></div>
                    <div class="col-md-6"><label class="form-label fw-bold">Fecha Cierre</label>
                        <input id="editFechaCierre" type="date" class="form-control"></div>
                    <div class="col-12"><label class="form-label fw-bold">Descripción</label>
                        <textarea id="editDescripcionPuesto" class="form-control" rows="3"></textarea></div>
                    <div class="col-md-6"><div class="form-check">
                        <input class="form-check-input" type="checkbox" id="editBanderaCV">
                        <label class="form-check-label" for="editBanderaCV">Requiere CV</label>
                    </div></div>
                    <div class="col-md-6"><div class="form-check">
                        <input class="form-check-input" type="checkbox" id="editBanderaSE">
                        <label class="form-check-label" for="editBanderaSE">Solicitud de Empleo</label>
                    </div></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" id="btnSaveEdit">Guardar Cambios</button>
            </div>
        </div>
</div>
    </div>
</div>

<!-- Modal Configurar Evaluaciones por Proceso -->
<div class="modal fade" id="modalConfigEvals" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">Evaluaciones del Proceso</h5>
                <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="configIdVacante">
                <p class="text-muted small">Vacante: <strong id="lblNombreVacanteEvals"></strong></p>
                
                <div class="card bg-light mb-3">
                    <div class="card-body py-2">
                        <div class="row g-2 align-items-end">
                            <div class="col-md-5">
                                <label class="form-label fw-bold small">Proceso</label>
                                <select id="cmbEvalsProceso" class="form-select form-select-sm"><option value="">Seleccione...</option></select>
                            </div>
                            <div class="col-md-5">
                                <label class="form-label fw-bold small">Evaluación a aplicar</label>
                                <select id="cmbEvalsEvaluacion" class="form-select form-select-sm"><option value="">Seleccione...</option></select>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-sm btn-primary w-100" id="btnVincularEval">Vincular</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-sm table-hover mb-0">
                        <thead class="table-light">
                            <tr><th>Proceso</th><th>Evaluación</th><th></th></tr>
                        </thead>
                        <tbody id="tbodyEvalsVacante"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="scripts/VacantesIbero.js"></script>

<script>
    lucide.createIcons();
    toastr.options = { positionClass:'toast-top-right', timeOut:4000, progressBar:true };
</script>
</body>
</html>
