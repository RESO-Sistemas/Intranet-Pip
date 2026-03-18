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
                                        <button type="button" class="btn btn-success btn-sm" onclick="showAddPostulanteModal()">
                                            <span class="material-symbols-outlined align-middle me-1">person_add</span>
                                            Agregar Postulante
                                        </button>
                                    </div>
                                    <div class="card-body">
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
    <div class="modal fade" id="modalDetallePostulante" tabindex="-1" aria-labelledby="modalDetallePostulanteLabel" aria-hidden="true">
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

    <script src="scripts/PostulantesVacante.js"></script>
</body>

</html>
