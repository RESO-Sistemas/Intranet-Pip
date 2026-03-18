<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Vacantes - PIP</title>
    
    <!-- Styles neptune -->
    <?php include("neptune_styles.php"); ?>
    
    <!-- Styles adicionales -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <style>
        .status-badge {
            font-size: 0.85rem;
            padding: 0.35em 0.65em;
        }
        .published-badge {
            font-size: 0.75rem;
        }
        .vacancy-card {
            border-left: 4px solid #198754;
        }
        .vacancy-card.draft {
            border-left-color: #6c757d;
        }
        .vacancy-card.active {
            border-left-color: #198754;
        }
        .vacancy-card.closed {
            border-left-color: #dc3545;
        }
        .text-borrador {
            color: #61ACFC !important;
        }
        .detail-section {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .detail-section h6 {
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .requisito-item, .evaluacion-item, .induccion-item {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 8px 12px;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .requisito-item:hover, .evaluacion-item:hover, .induccion-item:hover {
            background-color: #f1f1f1;
        }
        
        /* Fix para Select2 dentro de modales */
        #modalDetalleVacante .modal-body {
            overflow: visible;
        }
        #modalDetalleVacante .modal-content {
            overflow: visible;
        }
        #modalDetalleVacante .modal-dialog {
            overflow: visible;
        }
        #modalDetalleVacante .select2-container {
            z-index: 1060;
        }
        #modalDetalleVacante .select2-container--open {
            z-index: 1070;
        }
        #modalDetalleVacante .select2-dropdown {
            z-index: 1070;
        }
        /* Asegurar que los forms de agregar tengan altura suficiente */
        #formAddEvaluacion, #formAddInduccion, #formAddRequisito {
            position: relative;
            z-index: 10;
        }
        #formAddEvaluacion .input-group,
        #formAddInduccion .input-group {
            flex-wrap: nowrap;
        }
        #formAddEvaluacion .select2-container,
        #formAddInduccion .select2-container {
            flex: 1;
            min-width: 150px;
        }
        /* Mejorar diseño de los input groups con Select2 */
        .detail-section .input-group .select2-container--default .select2-selection--single {
            height: 38px;
            border-radius: 0;
            border: 1px solid #ced4da;
        }
        .detail-section .input-group .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 36px;
            padding-left: 12px;
        }
        .detail-section .input-group .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 36px;
        }
        /* Primer select en el grupo */
        .detail-section .input-group > .select2-container:first-child .select2-selection--single {
            border-top-left-radius: 0.375rem;
            border-bottom-left-radius: 0.375rem;
        }
        
        /* Dark mode para modal detalle */
        [data-theme="dark"] .detail-section {
            background-color: #2d2d2d;
            border: 1px solid #404040;
        }
        [data-theme="dark"] .detail-section h6 {
            border-bottom-color: #404040;
            color: #e0e0e0;
        }
        [data-theme="dark"] .requisito-item,
        [data-theme="dark"] .evaluacion-item,
        [data-theme="dark"] .induccion-item {
            background: #1e1e1e;
            border-color: #404040;
            color: #e0e0e0;
        }
        [data-theme="dark"] .requisito-item:hover,
        [data-theme="dark"] .evaluacion-item:hover,
        [data-theme="dark"] .induccion-item:hover {
            background-color: #2a2a2a;
        }
        [data-theme="dark"] #modalDetalleVacante .modal-content {
            background-color: #1e1e1e;
            border-color: #404040;
        }
        [data-theme="dark"] #modalDetalleVacante .modal-body {
            color: #e0e0e0;
        }
        [data-theme="dark"] #modalDetalleVacante .modal-body p {
            color: #b0b0b0;
        }
        [data-theme="dark"] #modalDetalleVacante .modal-footer {
            border-top-color: #404040;
        }
        /* Dark mode para Select2 dentro del modal */
        [data-theme="dark"] .detail-section .select2-container--default .select2-selection--single {
            background-color: #2d2d2d;
            border-color: #404040;
            color: #e0e0e0;
        }
        [data-theme="dark"] .detail-section .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #e0e0e0;
        }
        [data-theme="dark"] .select2-dropdown {
            background-color: #2d2d2d;
            border-color: #404040;
        }
        [data-theme="dark"] .select2-container--default .select2-results__option {
            color: #e0e0e0;
        }
        [data-theme="dark"] .select2-container--default .select2-results__option--highlighted[aria-selected] {
            background-color: #f0b429;
            color: #1e1e1e;
        }
        [data-theme="dark"] .select2-container--default .select2-search--dropdown .select2-search__field {
            background-color: #1e1e1e;
            border-color: #404040;
            color: #e0e0e0;
        }
        
        /* ====== ESTILOS PARA POSTULANTES ====== */
        .postulante-card {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            transition: all 0.2s ease;
        }
        .postulante-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        .postulante-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }
        .postulante-status {
            font-size: 0.75rem;
            padding: 0.25em 0.6em;
        }
        .postulante-status.en-proceso { background-color: #17a2b8; color: white; }
        .postulante-status.aceptado { background-color: #28a745; color: white; }
        .postulante-status.rechazado { background-color: #dc3545; color: white; }
        .postulante-status.finalizado { background-color: #6c757d; color: white; }
        
        .stats-postulantes {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }
        .stat-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 10px 15px;
            text-align: center;
            min-width: 80px;
        }
        .stat-item .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            display: block;
        }
        .stat-item .stat-label {
            font-size: 0.75rem;
            color: #6c757d;
        }
        .stat-item.total .stat-number { color: #007bff; }
        .stat-item.proceso .stat-number { color: #17a2b8; }
        .stat-item.aceptados .stat-number { color: #28a745; }
        .stat-item.rechazados .stat-number { color: #dc3545; }
        
        #tablePostulantes th, #tablePostulantes td {
            vertical-align: middle;
        }

        /* ====== TIMELINE (HISTORIAL DE PROCESOS) ====== */
        .timeline {
            position: relative;
            padding-left: 22px;
            margin: 0;
        }
        .timeline-item {
            position: relative;
            padding: 12px 0 12px 18px;
            border-bottom: 1px solid #e9ecef;
        }
        .timeline-item:last-child {
            border-bottom: none;
        }
        .timeline-marker {
            position: absolute;
            left: 0;
            top: 16px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #6c757d;
            z-index: 2;
        }
        .timeline-item:before {
            content: '';
            position: absolute;
            left: 5px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e9ecef;
            z-index: 1;
        }
        .timeline-item:first-child:before {
            top: 16px;
        }
        .timeline-item:last-child:before {
            bottom: calc(100% - 16px);
        }
        .timeline-title {
            font-weight: 600;
            margin: 0;
        }
        .timeline-sub {
            margin: 2px 0 0 0;
            font-size: 0.85rem;
        }
        .timeline-time {
            font-size: 0.8rem;
            color: #6c757d;
            white-space: nowrap;
        }
        .timeline-icon {
            font-size: 18px;
            vertical-align: middle;
            margin-left: 6px;
        }

        [data-theme="dark"] .timeline-item {
            border-bottom-color: #404040;
        }
        [data-theme="dark"] .timeline-item:before {
            background: #404040;
        }
        [data-theme="dark"] .timeline-time {
            color: #b0b0b0;
        }
        
        /* Dark mode para postulantes */
        [data-theme="dark"] .postulante-card {
            background: #2d2d2d;
            border-color: #404040;
            color: #e0e0e0;
        }
        [data-theme="dark"] .stat-item {
            background: #1e1e1e;
        }
        [data-theme="dark"] .stat-item .stat-label {
            color: #b0b0b0;
        }
        [data-theme="dark"] #modalPostulantes .modal-content {
            background-color: #1e1e1e;
            border-color: #404040;
        }
        [data-theme="dark"] #modalPostulantes .modal-body {
            color: #e0e0e0;
        }
        [data-theme="dark"] #modalAddPostulante .modal-content,
        [data-theme="dark"] #modalDetallePostulante .modal-content {
            background-color: #1e1e1e;
            border-color: #404040;
        }
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- Preloader -->
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>
        
        <!-- Menu -->
        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>
        
        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container">
                        <!-- Mensajes -->
                        <div class="row">
                            <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                                <div class="row">
                                    <div class="col s12 l12" style="position: relative;">
                                        <div id="contenidoMensajes" style="margin-right:2vh"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Título -->
                        <div class="row">
                            <div class="col">
                                <div class="page-description">
                                    <h1>Gestión de Vacantes</h1>
                                    <p class="text-muted">Administración de vacantes laborales, requisitos, evaluaciones e inducciones</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Estadísticas rápidas -->
                        <div class="row mb-3">
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body py-3">
                                        <h3 class="mb-1 text-primary" id="totalVacantes">0</h3>
                                        <small class="text-muted">Total Vacantes</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body py-3">
                                        <h3 class="mb-1 text-borrador" id="vacantesborrador">0</h3>
                                        <small class="text-muted">Borrador</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body py-3">
                                        <h3 class="mb-1 text-success" id="vacantesActivas">0</h3>
                                        <small class="text-muted">Activas</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card text-center">
                                    <div class="card-body py-3">
                                        <h3 class="mb-1 text-danger" id="vacantesCerradas">0</h3>
                                        <small class="text-muted">Cerradas</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tabla de vacantes -->
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">work</span>
                                            Listado de Vacantes
                                        </h5>
                                        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalAddVacante" onclick="prepareAddModal()">
                                            <span class="material-symbols-outlined align-middle me-1">add</span>
                                            Nueva Vacante
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tableVacantes" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Vacante</th>
                                                        <th>Área Técnica</th>
                                                        <th>Puesto</th>
                                                        <th>Tipo Contratación</th>
                                                        <th>Fecha Apertura</th>
                                                        <th>Estatus</th>
                                                        <th>Publicada</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal Agregar Vacante -->
    <div class="modal fade" id="modalAddVacante" tabindex="-1" aria-labelledby="modalAddVacanteLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nueva Vacante
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Nombre de la Vacante: <span class="text-danger">*</span></label>
                            <input id="txtNombreVacante" type="text" class="form-control" placeholder="Ej. Desarrollador Full Stack">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Tipo de Contratación: <span class="text-danger">*</span></label>
                            <select id="cmbTipoContratacion" class="form-select">
                                <option value="">Seleccione...</option>
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Medio tiempo">Medio tiempo</option>
                                <option value="Temporal">Temporal</option>
                                <option value="Por proyecto">Por proyecto</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Área Técnica:</label>
                            <select id="cmbAreaTecnica" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Puesto:</label>
                            <select id="cmbPuesto" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Sucursal:</label>
                            <select id="cmbSucursal" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Mínimo:</label>
                            <input id="txtSalarioMinimo" type="number" step="0.01" class="form-control" placeholder="0.00">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Máximo:</label>
                            <input id="txtSalarioMaximo" type="number" step="0.01" class="form-control" placeholder="0.00">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Apertura: <span class="text-danger">*</span></label>
                            <input id="txtFechaApertura" type="date" class="form-control">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Cierre:</label>
                            <input id="txtFechaCierre" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción del Puesto:</label>
                        <textarea id="txtDescripcionPuesto" class="form-control" rows="3" placeholder="Detalle las responsabilidades y requisitos del puesto..."></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="chkBanderaCV">
                                <label class="form-check-label fw-bold" for="chkBanderaCV">
                                    Requiere CV
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="chkBanderaSE">
                                <label class="form-check-label fw-bold" for="chkBanderaSE">
                                    Solicitud de Empleo
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success" id="btnAddVacante">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Vacante -->
    <div class="modal fade" id="modalEditVacante" tabindex="-1" aria-labelledby="modalEditVacanteLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Vacante
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIdVacante">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Nombre de la Vacante: <span class="text-danger">*</span></label>
                            <input id="editNombreVacante" type="text" class="form-control" placeholder="Nombre de la vacante">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Tipo de Contratación: <span class="text-danger">*</span></label>
                            <select id="editTipoContratacion" class="form-select">
                                <option value="">Seleccione...</option>
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Medio tiempo">Medio tiempo</option>
                                <option value="Temporal">Temporal</option>
                                <option value="Por proyecto">Por proyecto</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Área Técnica:</label>
                            <select id="editAreaTecnica" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Puesto:</label>
                            <select id="editPuesto" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Sucursal:</label>
                            <select id="editSucursal" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Mínimo:</label>
                            <input id="editSalarioMinimo" type="number" step="0.01" class="form-control" placeholder="0.00">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Máximo:</label>
                            <input id="editSalarioMaximo" type="number" step="0.01" class="form-control" placeholder="0.00">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Apertura: <span class="text-danger">*</span></label>
                            <input id="editFechaApertura" type="date" class="form-control">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Cierre:</label>
                            <input id="editFechaCierre" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción del Puesto:</label>
                        <textarea id="editDescripcionPuesto" class="form-control" rows="3" placeholder="Descripción del puesto..."></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="editBanderaCV">
                                <label class="form-check-label fw-bold" for="editBanderaCV">
                                    Requiere CV
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="editBanderaSE">
                                <label class="form-check-label fw-bold" for="editBanderaSE">
                                    Solicitud de Empleo
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-primary" id="btnSaveEdit">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Detalle Vacante -->
    <div class="modal fade" id="modalDetalleVacante" tabindex="-1" aria-labelledby="modalDetalleVacanteLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title" id="modalDetalleVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">info</span>
                        Detalle de Vacante
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="detalleIdVacante">
                    
                    <!-- Info General -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-primary">
                            <span class="material-symbols-outlined align-middle me-2">description</span>
                            Información General
                        </h6>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Nombre:</strong> <span id="detalleNombre">-</span></p>
                                <p><strong>Área Técnica:</strong> <span id="detalleArea">-</span></p>
                                <p><strong>Puesto:</strong> <span id="detallePuesto">-</span></p>
                                <p><strong>Sucursal:</strong> <span id="detalleSucursal">-</span></p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Tipo Contratación:</strong> <span id="detalleTipoContratacion">-</span></p>
                                <p><strong>Rango Salarial:</strong> <span id="detalleSalario">-</span></p>
                                <p><strong>Fecha Apertura:</strong> <span id="detalleFechaApertura">-</span></p>
                                <p><strong>Fecha Cierre:</strong> <span id="detalleFechaCierre">-</span></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p><strong>Descripción:</strong></p>
                                <p id="detalleDescripcion" class="text-muted">-</p>
                            </div>
                        </div>
                    </div>

                    <!-- Requisitos -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-success d-flex justify-content-between align-items-center">
                            <span>
                                <span class="material-symbols-outlined align-middle me-2">checklist</span>
                                Requisitos
                            </span>
                            <button type="button" class="btn btn-success btn-sm" onclick="showAddRequisitoForm()">
                                <span class="material-symbols-outlined align-middle">add</span>
                            </button>
                        </h6>
                        <div id="formAddRequisito" style="display:none;" class="mb-3">
                            <div class="input-group">
                                <input type="text" id="txtNuevoRequisito" class="form-control" placeholder="Nuevo requisito...">
                                <input type="number" id="txtOrdenRequisito" class="form-control" style="max-width:80px;" placeholder="Orden" value="0">
                                <button class="btn btn-success" onclick="addRequisito()">
                                    <span class="material-symbols-outlined">save</span>
                                </button>
                                <button class="btn btn-secondary" onclick="hideAddRequisitoForm()">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div id="listaRequisitos">
                            <p class="text-muted text-center">No hay requisitos configurados</p>
                        </div>
                    </div>

                    <!-- Evaluaciones -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-warning d-flex justify-content-between align-items-center">
                            <span>
                                <span class="material-symbols-outlined align-middle me-2">quiz</span>
                                Evaluaciones
                            </span>
                            <button type="button" class="btn btn-warning btn-sm" onclick="showAddEvaluacionForm()">
                                <span class="material-symbols-outlined align-middle">add</span>
                            </button>
                        </h6>
                        <div id="formAddEvaluacion" style="display:none;" class="mb-3">
                            <div class="input-group">
                                <select id="cmbNuevaEvaluacion" class="form-select">
                                    <option value="">Seleccione evaluación...</option>
                                </select>
                                <select id="cmbProcesoEvaluacion" class="form-select">
                                    <option value="">Seleccione proceso...</option>
                                </select>
                                <button class="btn btn-warning" onclick="addEvaluacion()">
                                    <span class="material-symbols-outlined">save</span>
                                </button>
                                <button class="btn btn-secondary" onclick="hideAddEvaluacionForm()">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div id="listaEvaluaciones">
                            <p class="text-muted text-center">No hay evaluaciones configuradas</p>
                        </div>
                    </div>

                    <!-- Inducciones -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-danger d-flex justify-content-between align-items-center">
                            <span>
                                <span class="material-symbols-outlined align-middle me-2">school</span>
                                Inducciones
                            </span>
                            <button type="button" class="btn btn-danger btn-sm" onclick="showAddInduccionForm()">
                                <span class="material-symbols-outlined align-middle">add</span>
                            </button>
                        </h6>
                        <div id="formAddInduccion" style="display:none;" class="mb-3">
                            <div class="input-group">
                                <select id="cmbNuevaInduccion" class="form-select">
                                    <option value="">Seleccione inducción...</option>
                                </select>
                                <button class="btn btn-danger" onclick="addInduccion()">
                                    <span class="material-symbols-outlined">save</span>
                                </button>
                                <button class="btn btn-secondary" onclick="hideAddInduccionForm()">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div id="listaInducciones">
                            <p class="text-muted text-center">No hay inducciones configuradas</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- ====== MODAL POSTULANTES DE VACANTE ====== -->
    <div class="modal fade" id="modalPostulantes" tabindex="-1" aria-labelledby="modalPostulantesLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title" id="modalPostulantesLabel">
                        <span class="material-symbols-outlined align-middle me-2">people</span>
                        Postulantes - <span id="nombreVacantePostulantes">Vacante</span>
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="postulantesIdVacante">
                    
                    <!-- Estadísticas -->
                    <div class="stats-postulantes" id="statsPostulantes">
                        <div class="stat-item total">
                            <span class="stat-number" id="statTotal">0</span>
                            <span class="stat-label">Total</span>
                        </div>
                        <div class="stat-item proceso">
                            <span class="stat-number" id="statProceso">0</span>
                            <span class="stat-label">En Proceso</span>
                        </div>
                        <div class="stat-item aceptados">
                            <span class="stat-number" id="statAceptados">0</span>
                            <span class="stat-label">Aceptados</span>
                        </div>
                        <div class="stat-item rechazados">
                            <span class="stat-number" id="statRechazados">0</span>
                            <span class="stat-label">Rechazados</span>
                        </div>
                    </div>
                    
                    <!-- Botón agregar postulante -->
                    <div class="d-flex justify-content-end mb-3">
                        <button type="button" class="btn btn-success btn-sm" onclick="showAddPostulanteModal()">
                            <span class="material-symbols-outlined align-middle me-1">person_add</span>
                            Agregar Postulante
                        </button>
                    </div>
                    
                    <!-- Tabla de postulantes -->
                    <div class="table-responsive">
                        <table id="tablePostulantes" class="table table-hover display text-center" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Postulante</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Fecha Postulación</th>
                                    <th>Último Proceso</th>
                                    <th>Estatus</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyPostulantes">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== MODAL AGREGAR POSTULANTE ====== -->
    <div class="modal fade" id="modalAddPostulante" tabindex="-1" aria-labelledby="modalAddPostulanteLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddPostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">person_add</span>
                        Nuevo Postulante
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="addPostulanteIdVacante">
                    
                    <!-- Búsqueda de postulante existente -->
                    <div class="mb-3">
                        <label class="form-label fw-bold">¿Ya existe el postulante?</label>
                        <div class="input-group">
                            <input type="text" id="txtBuscarPostulante" class="form-control" placeholder="Buscar por correo, CURP o nombre...">
                            <button class="btn btn-outline-primary" type="button" onclick="buscarPostulanteExistente()">
                                <span class="material-symbols-outlined">search</span>
                            </button>
                        </div>
                        <div id="resultadosBusqueda" class="mt-2" style="display:none;"></div>
                    </div>
                    
                    <hr>
                    <p class="text-muted small">O registrar nuevo postulante:</p>
                    
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Nombre: <span class="text-danger">*</span></label>
                            <input id="txtPostulanteNombre" type="text" class="form-control" placeholder="Nombre(s)">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Apellido Paterno: <span class="text-danger">*</span></label>
                            <input id="txtPostulanteApPaterno" type="text" class="form-control" placeholder="Apellido Paterno">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Apellido Materno:</label>
                            <input id="txtPostulanteApMaterno" type="text" class="form-control" placeholder="Apellido Materno">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Correo Electrónico: <span class="text-danger">*</span></label>
                            <input id="txtPostulanteCorreo" type="email" class="form-control" placeholder="correo@ejemplo.com">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Teléfono:</label>
                            <input id="txtPostulanteTelefono" type="text" class="form-control" placeholder="10 dígitos">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">CURP:</label>
                            <input id="txtPostulanteCURP" type="text" class="form-control" placeholder="18 caracteres" maxlength="18" style="text-transform:uppercase;">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Dirección:</label>
                            <input id="txtPostulanteDireccion" type="text" class="form-control" placeholder="Calle, número, colonia...">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Estado:</label>
                            <input id="txtPostulanteEstado" type="text" class="form-control" placeholder="Estado">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Ciudad:</label>
                            <input id="txtPostulanteCiudad" type="text" class="form-control" placeholder="Ciudad">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Observaciones:</label>
                        <textarea id="txtPostulanteObservaciones" class="form-control" rows="2" placeholder="Observaciones iniciales..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success" id="btnAddPostulante" onclick="addPostulanteVacante()">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar Postulante
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== MODAL DETALLE POSTULANTE ====== -->
    <div class="modal fade" id="modalDetallePostulante" tabindex="-1" aria-labelledby="modalDetallePostulanteLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title" id="modalDetallePostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">person</span>
                        Detalle del Postulante
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="detalleIdPostulanteVacante">
                    
                    <!-- Info del postulante -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-primary">
                            <span class="material-symbols-outlined align-middle me-2">badge</span>
                            Información Personal
                        </h6>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Nombre Completo:</strong> <span id="detallePostulanteNombre">-</span></p>
                                <p><strong>CURP:</strong> <span id="detallePostulanteCURP">-</span></p>
                                <p><strong>Correo:</strong> <span id="detallePostulanteCorreo">-</span></p>
                                <p><strong>Teléfono:</strong> <span id="detallePostulanteTelefono">-</span></p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Dirección:</strong> <span id="detallePostulanteDireccion">-</span></p>
                                <p><strong>Estado:</strong> <span id="detallePostulanteEstado">-</span></p>
                                <p><strong>Ciudad:</strong> <span id="detallePostulanteCiudad">-</span></p>
                                <p><strong>Fecha Postulación:</strong> <span id="detallePostulanteFecha">-</span></p>
                            </div>
                        </div>
                    </div>

                    <!-- Estatus de postulación -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-warning">
                            <span class="material-symbols-outlined align-middle me-2">pending_actions</span>
                            Estatus de Postulación
                        </h6>
                        <div class="row align-items-center">
                            <div class="col-md-4">
                                <label class="form-label">Cambiar Estatus:</label>
                                <select id="cmbEstatusPostulante" class="form-select">
                                    <option value="1">En Proceso</option>
                                    <option value="2">Aceptado</option>
                                    <option value="3">Rechazado</option>
                                    <option value="4">Finalizado</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Observaciones:</label>
                                <input type="text" id="txtObservacionesEstatus" class="form-control" placeholder="Motivo del cambio...">
                            </div>
                            <div class="col-md-2 d-grid">
                                <label class="form-label">&nbsp;</label>
                                <button class="btn btn-warning" onclick="actualizarEstatusPostulante()">
                                    <span class="material-symbols-outlined">save</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Historial de procesos -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-success d-flex justify-content-between align-items-center">
                            <span>
                                <span class="material-symbols-outlined align-middle me-2">history</span>
                                Historial de Procesos
                            </span>
                            <button type="button" class="btn btn-success btn-sm" onclick="showAddHistorialForm()">
                                <span class="material-symbols-outlined align-middle">add</span>
                            </button>
                        </h6>
                        <div id="formAddHistorial" style="display:none;" class="mb-3">
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="cmbNuevoProceso" class="form-select">
                                        <option value="">Seleccione proceso...</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select id="cmbResultadoProceso" class="form-select">
                                        <option value="">Resultado...</option>
                                        <option value="1">Aprobado</option>
                                        <option value="0">Reprobado</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="txtObservacionesProceso" class="form-control" placeholder="Observaciones...">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-success me-1" onclick="addHistorialProceso()">
                                        <span class="material-symbols-outlined">save</span>
                                    </button>
                                    <button class="btn btn-secondary" onclick="hideAddHistorialForm()">
                                        <span class="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="listaHistorial">
                            <p class="text-muted text-center">No hay historial registrado</p>
                        </div>
                    </div>

                    <!-- Requisitos evaluados -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-danger">
                            <span class="material-symbols-outlined align-middle me-2">checklist</span>
                            Cumplimiento de Requisitos
                        </h6>
                        <div id="listaRequisitosPostulante">
                            <p class="text-muted text-center">No hay requisitos configurados</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger me-auto" onclick="eliminarPostulacion()">
                        <span class="material-symbols-outlined align-middle me-1">delete</span>
                        Eliminar Postulación
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/Vacantes.js?v=<?php echo time(); ?>"></script>
</body>

</html>
