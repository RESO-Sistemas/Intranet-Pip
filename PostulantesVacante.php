<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Postulantes por Vacante - PIP</title>

    <!-- Styles neptune -->
    <?php include("neptune_styles.php"); ?>

    <!-- Styles adicionales -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="https://cdn.syncfusion.com/ej2/20.3.56/css/tailwind.css" rel="stylesheet">
    <!-- Select2 para selectores mejorados -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
    <style>
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

        .pv-section-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            user-select: none;
            border: 2px solid #c7ced6;
            border-radius: 8px;
            padding: 11px 14px;
            background: #fff;
            box-shadow: 0 1px 0 rgba(17, 24, 39, 0.03);
        }

        .pv-title-main {
            flex: 1;
            text-align: center;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .pv-section-tools {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 8px;
            padding-top: 2px;
        }

        .pv-section-icon {
            font-size: 20px;
            color: #6c757d;
            line-height: 1;
            margin-left: 8px;
        }

        .detail-section.is-collapsed {
            margin-bottom: 10px;
        }

        .detail-section.is-collapsed h6 {
            margin-bottom: 0;
            border-bottom: none;
        }

        /* ====== ESTILOS PARA POSTULANTES ====== */
        .postulante-status {
            font-size: 0.75rem;
            padding: 0.25em 0.6em;
        }

        .postulante-status.en-proceso {
            background-color: #17a2b8;
            color: white;
        }

        .postulante-status.aceptado {
            background-color: #28a745;
            color: white;
        }

        .postulante-status.rechazado {
            background-color: #dc3545;
            color: white;
        }

        .postulante-status.finalizado {
            background-color: #6c757d;
            color: white;
        }

        #tablePostulantes th,
        #tablePostulantes td {
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

        /* Dark mode */
        [data-theme="dark"] .detail-section {
            background-color: #2d2d2d;
            border: 1px solid #404040;
        }

        [data-theme="dark"] .detail-section h6 {
            border-bottom-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .pv-section-toggle {
            background: #2d2d2d;
            border-color: #5a6675;
        }

        [data-theme="dark"] .stat-item {
            background: #1e1e1e;
        }

        [data-theme="dark"] .stat-item .stat-label {
            color: #b0b0b0;
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
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>

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

                        <div class="row">
                            <div class="col">
                                <div class="page-description">
                                    <h1>Postulantes - <span id="nombreVacantePostulantes">Vacante</span></h1>
                                    <p class="text-muted">Listado de postulantes y seguimiento del proceso</p>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" id="postulantesIdVacante">

                        <div id="postulantesDataArea">
                            <!-- Estadísticas -->
                            <div class="row mb-3" id="statsPostulantes">
                                <div class="col-md-3">
                                    <div class="card text-center">
                                        <div class="card-body py-3">
                                            <h3 class="mb-1 text-primary" id="statTotal">0</h3>
                                            <small class="text-muted">Total</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card text-center">
                                        <div class="card-body py-3">
                                            <h3 class="mb-1 text-info" id="statProceso">0</h3>
                                            <small class="text-muted">En Proceso</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card text-center">
                                        <div class="card-body py-3">
                                            <h3 class="mb-1 text-success" id="statAceptados">0</h3>
                                            <small class="text-muted">Aceptados</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card text-center">
                                        <div class="card-body py-3">
                                            <h3 class="mb-1 text-danger" id="statRechazados">0</h3>
                                            <small class="text-muted">Rechazados</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="card">
                                        <div class="card-header d-flex justify-content-between align-items-center">
                                            <h5 class="card-title fw-bold mb-0">
                                                <span class="material-symbols-outlined align-middle me-2">people</span>
                                                Postulantes
                                            </h5>
                                            <div>
                                                <button type="button" class="btn btn-info btn-sm me-2"
                                                    onclick="showComparativoResultadosModal()">
                                                    <span
                                                        class="material-symbols-outlined align-middle me-1">bar_chart</span>
                                                    Resultados Comparativos
                                                </button>
                                                <button type="button" class="btn btn-success btn-sm"
                                                    onclick="showAddPostulanteModal()">
                                                    <span
                                                        class="material-symbols-outlined align-middle me-1">person_add</span>
                                                    Agregar Postulante
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table id="tablePostulantes"
                                                    class="table table-hover display text-center" style="width:100%">
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
                                                    <tbody id="tbodyPostulantes"></tbody>
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
    </div>

    <!-- ====== MODAL AGREGAR POSTULANTE ====== -->
    <div class="modal fade" id="modalAddPostulante" tabindex="-1" aria-labelledby="modalAddPostulanteLabel"
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
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

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">¿Ya existe el postulante?</label>
                            <div class="input-group">
                                <input type="text" id="txtBuscarPostulante" class="form-control"
                                    placeholder="Buscar por correo, CURP o nombre...">
                                <button class="btn btn-outline-primary" type="button"
                                    onclick="buscarPostulanteExistente()">
                                    <span class="material-symbols-outlined">search</span>
                                </button>
                            </div>
                            <div id="resultadosBusqueda" class="mt-2" style="display:none;"></div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">¿Es empleado interno?</label>
                            <div class="input-group">
                                <input type="text" id="txtBuscarEmpleado" class="form-control"
                                    placeholder="Buscar por num. o nombre...">
                                <button class="btn btn-outline-success" type="button" onclick="buscarEmpleadoInterno()">
                                    <span class="material-symbols-outlined">search</span>
                                </button>
                            </div>
                            <div id="resultadosBusquedaEmpleado" class="mt-2" style="display:none;"></div>
                            <input type="hidden" id="txtPostulanteIdEmpleado">
                        </div>
                    </div>

                    <hr>
                    <p class="text-muted small">O registrar nuevo postulante:</p>

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Nombre: <span class="text-danger">*</span></label>
                            <input id="txtPostulanteNombre" type="text" class="form-control" placeholder="Nombre(s)">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Apellido Paterno: <span
                                    class="text-danger">*</span></label>
                            <input id="txtPostulanteApPaterno" type="text" class="form-control"
                                placeholder="Apellido Paterno">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Apellido Materno:</label>
                            <input id="txtPostulanteApMaterno" type="text" class="form-control"
                                placeholder="Apellido Materno">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Correo Electrónico: <span
                                    class="text-danger">*</span></label>
                            <input id="txtPostulanteCorreo" type="email" class="form-control"
                                placeholder="correo@ejemplo.com">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Teléfono:</label>
                            <input id="txtPostulanteTelefono" type="text" class="form-control" placeholder="10 dígitos">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">CURP:</label>
                            <input id="txtPostulanteCURP" type="text" class="form-control" placeholder="18 caracteres"
                                maxlength="18" style="text-transform:uppercase;">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Dirección:</label>
                            <input id="txtPostulanteDireccion" type="text" class="form-control"
                                placeholder="Calle, número, colonia...">
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
                        <textarea id="txtPostulanteObservaciones" class="form-control" rows="2"
                            placeholder="Observaciones iniciales..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success" id="btnAddPostulante"
                        onclick="addPostulanteVacante()">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar Postulante
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== MODAL DETALLE POSTULANTE ====== -->
    <div class="modal fade" id="modalDetallePostulante" tabindex="-1" aria-labelledby="modalDetallePostulanteLabel"
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDetallePostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">person</span>
                        Detalle del Postulante
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="detalleIdPostulanteVacante">
                    <input type="hidden" id="detalleIdPostulante">

                    <!-- Botón de Modo Edición -->
                    <div class="d-flex justify-content-end mb-3">
                        <button type="button" class="btn btn-sm btn-outline-primary" id="btnToggleEditMode"
                            onclick="toggleEditMode()">
                            <span class="material-symbols-outlined align-middle me-1">edit</span>
                            Editar Información
                        </button>
                    </div>

                    <div class="detail-section">
                        <h6 class="fw-bold text-primary">
                            <span class="material-symbols-outlined align-middle me-2">badge</span>
                            Información Personal
                        </h6>
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label class="form-label fw-bold">Nombre(s):</label>
                                <input type="text" id="edit_Nombre" class="form-control form-control-sm" disabled>
                                <span id="view_Nombre" class="d-none"></span>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label fw-bold">Apellido Paterno:</label>
                                <input type="text" id="edit_ApellidoPaterno" class="form-control form-control-sm"
                                    disabled>
                                <span id="view_ApellidoPaterno" class="d-none"></span>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label fw-bold">Apellido Materno:</label>
                                <input type="text" id="edit_ApellidoMaterno" class="form-control form-control-sm"
                                    disabled>
                                <span id="view_ApellidoMaterno" class="d-none"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">CURP:</label>
                                <input type="text" id="edit_CURP" class="form-control form-control-sm text-uppercase"
                                    maxlength="18" disabled>
                                <span id="view_CURP" class="d-none"></span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Correo Electrónico:</label>
                                <input type="email" id="edit_CorreoElectronico" class="form-control form-control-sm"
                                    disabled>
                                <span id="view_CorreoElectronico" class="d-none"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-bold">Teléfonos:</label>
                                <div id="listaTelefonos" class="border rounded p-2 bg-light">
                                    <small class="text-muted">Cargando...</small>
                                </div>
                                <small class="text-muted">* Puedes gestionar los teléfonos aquí abajo</small>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h6 class="fw-bold text-info">
                            <span class="material-symbols-outlined align-middle me-2">location_on</span>
                            Dirección
                        </h6>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Código Postal:</label>
                                <div class="input-group input-group-sm">
                                    <input type="text" id="edit_CodigoPostal" class="form-control"
                                        placeholder="5 dígitos" maxlength="5" disabled>
                                    <button class="btn btn-outline-secondary" type="button" id="btnBuscarCP"
                                        onclick="buscarCodigoPostal()" disabled>
                                        <span class="material-symbols-outlined">search</span>
                                    </button>
                                </div>
                                <small class="text-muted" id="cpStatus"></small>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Colonia:</label>
                                <select id="edit_Colonia" class="form-select form-select-sm" disabled>
                                    <option value="">Seleccionar...</option>
                                </select>
                                <span id="view_Colonia" class="d-none"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Calle:</label>
                                <input type="text" id="edit_Calle" class="form-control form-control-sm"
                                    placeholder="Ej. Av. Juarez" disabled>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label fw-bold">Num. Exterior:</label>
                                <input type="text" id="edit_NumeroExterior" class="form-control form-control-sm"
                                    placeholder="Ej. 123" disabled>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label fw-bold">Num. Interior:</label>
                                <input type="text" id="edit_NumeroInterior" class="form-control form-control-sm"
                                    placeholder="Ej. 2B" disabled>
                            </div>
                        </div>
                        <input type="hidden" id="edit_Direccion">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-bold">Preview direccion final:</label>
                                <div id="direccionPreview" class="form-control form-control-sm bg-light"
                                    style="min-height: 38px;">-</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Estado:</label>
                                <input type="text" id="edit_Estado" class="form-control form-control-sm" readonly>
                                <span id="view_Estado" class="d-none"></span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Municipio/Ciudad:</label>
                                <input type="text" id="edit_Ciudad" class="form-control form-control-sm" readonly>
                                <span id="view_Ciudad" class="d-none"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p class="mb-0"><strong>Fecha Postulación:</strong> <span
                                        id="detallePostulanteFecha">-</span></p>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de Guardar/Cancelar (solo visibles en modo edición) -->
                    <div id="editModeButtons" class="d-none mb-3">
                        <button type="button" class="btn btn-success" onclick="guardarCambiosPostulante()">
                            <span class="material-symbols-outlined align-middle me-1">save</span>
                            Guardar Cambios
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="cancelarEdicion()">
                            <span class="material-symbols-outlined align-middle me-1">close</span>
                            Cancelar
                        </button>
                    </div>

                    <!-- Sección de Teléfonos con gestión completa -->
                    <div class="detail-section">
                        <h6 class="fw-bold text-success d-flex justify-content-between align-items-center">
                            <span>
                                <span class="material-symbols-outlined align-middle me-2">phone</span>
                                Gestión de Teléfonos
                            </span>
                            <button type="button" class="btn btn-success btn-sm" onclick="mostrarFormAgregarTelefono()">
                                <span class="material-symbols-outlined align-middle">add</span>
                                Agregar Teléfono
                            </button>
                        </h6>

                        <!-- Formulario para agregar teléfono -->
                        <div id="formAgregarTelefono" class="d-none mb-3">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="text" id="nuevoTelefono" class="form-control form-control-sm"
                                        placeholder="10 dígitos" maxlength="10">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" id="observacionesTelefono" class="form-control form-control-sm"
                                        placeholder="Observaciones (opcional)">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-success btn-sm me-1" onclick="agregarTelefonoNuevo()">
                                        <span class="material-symbols-outlined">save</span>
                                    </button>
                                    <button class="btn btn-secondary btn-sm" onclick="ocultarFormAgregarTelefono()">
                                        <span class="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Tabla de teléfonos -->
                        <div id="tablaTelefonos">
                            <p class="text-muted text-center">Cargando teléfonos...</p>
                        </div>
                    </div>

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
                                <input type="text" id="txtObservacionesEstatus" class="form-control"
                                    placeholder="Motivo del cambio...">
                            </div>
                            <div class="col-md-2 d-grid">
                                <label class="form-label">&nbsp;</label>
                                <button class="btn btn-warning" onclick="actualizarEstatusPostulante()">
                                    <span class="material-symbols-outlined">save</span>
                                </button>
                            </div>
                        </div>
                    </div>

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
                                    <input type="text" id="txtObservacionesProceso" class="form-control"
                                        placeholder="Observaciones...">
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

    <!-- ====== MODAL RESULTADOS POSTULANTE ====== -->
    <div class="modal fade" id="modalResultadosPostulante" tabindex="-1"
        aria-labelledby="modalResultadosPostulanteLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalResultadosPostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">analytics</span>
                        Resultados de Evaluación
                    </h5>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn btn-sm btn-outline-primary fw-bold"
                            onclick="abrirEvaluacionRespuestas()">
                            <span class="material-symbols-outlined align-middle"
                                style="font-size: 18px;">visibility</span>
                            Ver Evaluación
                        </button>
                        <button type="button" class="btn-close ms-2" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label class="form-label fw-bold">Evaluación:</label>
                            <select id="selResultadosPostulante" class="form-select"
                                onchange="drawResultadosPostulante()"></select>
                        </div>
                        <div class="col-md-8 text-center"
                            style="display:flex; justify-content:center; flex-direction:column; align-items:center;">
                            <h4 id="lblScoreGeneralPostulante"></h4>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center">
                            <div id="chartPostulanteGeneral" style="width:100%; height:500px"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== MODAL COMPARATIVO RESULTADOS ====== -->
    <div class="modal fade" id="modalComparativoResultados" tabindex="-1"
        aria-labelledby="modalComparativoResultadosLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalComparativoResultadosLabel">
                        <span class="material-symbols-outlined align-middle me-2">bar_chart</span>
                        Comparativo de Resultados por Evaluación
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Seleccione Evaluación:</label>
                            <select id="selComparativoEvaluaciones" class="form-select"
                                onchange="loadComparativoCandidatos()"></select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Seleccione Candidatos a comparar:</label>
                            <select id="selCandidatosComparar" class="form-control" multiple="multiple"
                                style="width: 100%;">
                                <!-- Opciones inyectadas por JS -->
                            </select>
                        </div>
                    </div>
                    <hr>
                    <!-- Selector de Gráficas (Cards) -->
                    <div class="row text-center mb-4">
                        <div class="col-md-6 mb-2">
                            <div class="card border-primary shadow-sm h-100 mb-0 bg-white" id="cardChartColumn"
                                onclick="switchComparativoChart('column')"
                                style="cursor: pointer; transition: all 0.2s;">
                                <div class="card-body py-3">
                                    <h6 class="mb-0 fw-bold text-primary" id="textChartColumn"><span
                                            class="material-symbols-outlined align-middle me-1">bar_chart</span>
                                        Postulantes mejor puntuados</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-2">
                            <div class="card border-0 shadow-none h-100 mb-0 bg-light" id="cardChartRadar"
                                onclick="switchComparativoChart('radar')"
                                style="cursor: pointer; transition: all 0.2s;">
                                <div class="card-body py-3">
                                    <h6 class="mb-0 fw-bold text-muted" id="textChartRadar"><span
                                            class="material-symbols-outlined align-middle me-1">radar</span> Postulantes
                                        por competencias</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="containerChartColumn">
                        <div class="col-md-12">
                            <div id="chartComparativoVacanteColumn" style="width:100%; height:450px"></div>
                        </div>
                    </div>
                    <div class="row d-none" id="containerChartRadar">
                        <div class="col-md-12">
                            <div id="chartComparativoVacanteRadar" style="width:100%; height:450px"></div>
                        </div>
                    </div>
                    <!-- Contenedores para las tabilitas por cada candidato comparado -->
                    <div class="row mt-4" id="contenedorTablasComparativo">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== MODAL VIEW DOCUMENTOS ====== -->
    <div class="modal fade" id="modalDocumentosPostulante" tabindex="-1"
        aria-labelledby="modalDocumentosPostulanteLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDocumentosPostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">folder_shared</span>
                        Documentos
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" id="contenedorBotonesDocumentos">
                    <!-- Botones inyectados por JS -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== MODAL EVALUACION RESPUESTAS ====== -->
    <div class="modal fade" id="modalEvaluacionRespuestas" tabindex="-1"
        aria-labelledby="modalEvaluacionRespuestasLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEvaluacionRespuestasLabel">
                        <span class="material-symbols-outlined align-middle me-2">quiz</span>
                        Evaluación del Postulante
                    </h5>
                    <button type="button" class="btn-close" onclick="cerrarEvaluacionRespuestas()"></button>
                </div>
                <div class="modal-body" style="background-color: #f8f9fa;">
                    <div id="contenedorEvaluacionRespuestas">
                        <!-- inyectado -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>

    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <!-- Select2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="scripts/PostulanteEditor.js?v=<?php echo filemtime('scripts/PostulanteEditor.js'); ?>"></script>
    <script src="scripts/PostulantesVacante.js?v=<?php echo filemtime('scripts/PostulantesVacante.js'); ?>"></script>
</body>

</html>