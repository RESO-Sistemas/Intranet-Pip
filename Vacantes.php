<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Vacantes - Klyns Intranet</title>
    
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
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- Preloader -->
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">Klyns</p>
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
                                        <h3 class="mb-1 text-secondary" id="vacantesborrador">0</h3>
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
    <div class="modal fade" id="modalAddVacante" tabindex="-1" aria-labelledby="modalAddVacanteLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title" id="modalAddVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nueva Vacante
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
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
    <div class="modal fade" id="modalEditVacante" tabindex="-1" aria-labelledby="modalEditVacanteLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title" id="modalEditVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Vacante
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
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
    <div class="modal fade" id="modalDetalleVacante" tabindex="-1" aria-labelledby="modalDetalleVacanteLabel" aria-hidden="true">
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
    
    <!-- Neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/Vacantes.js"></script>
</body>

</html>
