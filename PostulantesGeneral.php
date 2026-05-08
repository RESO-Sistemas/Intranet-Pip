<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Postulantes (General) - PIP</title>

    <?php include("neptune_styles.php"); ?>

    <style>
        /* ====== SPLIT-PANE LAYOUT ====== */
        .split-pane-wrapper {
            display: flex;
            gap: 0;
            min-height: calc(100vh - 180px);
        }

        .split-pane-master {
            width: 340px;
            min-width: 300px;
            max-width: 380px;
            border-right: 1px solid #dee2e6;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .split-pane-detail {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
        }

        .split-pane-master .card {
            border: none;
            border-radius: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .split-pane-master .card-body {
            flex: 1;
            overflow-y: auto;
            padding: 0;
        }

        /* Búsqueda en vivo */
        .master-search {
            padding: 10px 12px;
            border-bottom: 1px solid #dee2e6;
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 2;
        }

        .master-search .search-icon {
            position: absolute;
            left: 22px;
            top: 50%;
            transform: translateY(-50%);
            color: #adb5bd;
            font-size: 18px;
        }

        .master-search input {
            padding-left: 34px;
            border-radius: 8px;
            font-size: 0.85rem;
        }

        /* Lista de postulantes */
        .postulante-list {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .postulante-list-item {
            padding: 12px 14px;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background 0.12s ease;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .postulante-list-item:hover {
            background-color: #f5f7fa;
        }

        .postulante-list-item.selected {
            background-color: #fff9e6;
            border-left: 3px solid #ffc407;
        }

        .postulante-list-item .pli-name {
            font-weight: 600;
            font-size: 0.9rem;
            color: #212529;
            line-height: 1.3;
        }

        .postulante-list-item .pli-curp {
            font-size: 0.72rem;
            color: #6c757d;
            font-family: monospace;
        }

        .postulante-list-item .pli-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2px;
        }

        .postulante-list-item .pli-vacante {
            font-size: 0.75rem;
            color: #6c757d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 160px;
        }

        .pli-status {
            font-size: 0.68rem;
            padding: 2px 8px;
            border-radius: 10px;
            font-weight: 500;
            white-space: nowrap;
        }

        .pli-status.en-proceso {
            background: #cfe2ff;
            color: #084298;
        }

        .pli-status.aceptado {
            background: #d1e7dd;
            color: #0f5132;
        }

        .pli-status.rechazado {
            background: #f8d7da;
            color: #842029;
        }

        .pli-status.finalizado {
            background: #e2e3e5;
            color: #41464b;
        }

        .postulante-list-empty {
            padding: 30px;
            text-align: center;
            color: #adb5bd;
        }

        /* Detail panel */
        .detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #dee2e6;
        }

        .detail-header .detail-name {
            font-size: 1.3rem;
            font-weight: 700;
            margin: 0;
        }

        .detail-header .detail-meta {
            font-size: 0.85rem;
            color: #6c757d;
        }

        /* Detail tabs */
        .detail-tabs {
            display: flex;
            gap: 2px;
            margin-bottom: 15px;
            border-bottom: 1px solid #dee2e6;
        }

        .detail-tab {
            padding: 8px 16px;
            cursor: pointer;
            border: 1px solid transparent;
            border-bottom: none;
            border-radius: 6px 6px 0 0;
            font-weight: 500;
            font-size: 0.9rem;
            color: #6c757d;
            background: transparent;
            transition: all 0.15s ease;
        }

        .detail-tab:hover {
            color: #495057;
            background: #e9ecef;
        }

        .detail-tab.active {
            color: #1a1a2e;
            background: #fff;
            border-color: #dee2e6;
            border-bottom: 2px solid #ffc407;
        }

        .detail-tab .badge {
            margin-left: 6px;
            font-size: 0.7rem;
        }

        /* Tab panels */
        .detail-tab-panel {
            display: none;
        }

        .detail-tab-panel.active {
            display: block;
        }

        /* Info cards */
        .info-field {
            margin-bottom: 12px;
        }

        .info-field label {
            font-size: 0.75rem;
            text-transform: uppercase;
            color: #6c757d;
            margin-bottom: 2px;
            display: block;
            font-weight: 600;
        }

        .info-field .info-value {
            font-size: 0.95rem;
            color: #212529;
            padding: 4px 8px;
            background: #fff;
            border-radius: 4px;
            border: 1px solid #e9ecef;
            min-height: 32px;
        }

        .info-field input.form-control {
            font-size: 0.95rem;
        }

        /* Vacantes list inside detail */
        .vacantes-sidebar {
            border-right: 1px solid #dee2e6;
            min-height: 300px;
        }

        .vacantes-sidebar .postulacion-item {
            display: block;
            padding: 10px 12px;
            border-bottom: 1px solid #e9ecef;
            text-decoration: none;
            color: #212529;
            transition: background 0.1s;
        }

        .vacantes-sidebar .postulacion-item:hover {
            background: #e9ecef;
        }

        .vacantes-sidebar .postulacion-item.active {
            background: #fff9e6;
            border-left: 3px solid #ffc407;
        }

        .vacantes-sidebar .postulacion-item .fw-bold {
            font-size: 0.9rem;
        }

        .vacantes-sidebar .postulacion-item .small {
            font-size: 0.75rem;
        }

        /* Timeline */
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

        /* Empty state */
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #adb5bd;
            text-align: center;
            padding: 40px;
        }

        .empty-state .material-symbols-outlined {
            font-size: 4rem;
            margin-bottom: 15px;
        }

        /* Mobile responsiveness */
        @media (max-width: 991px) {
            .split-pane-wrapper {
                flex-direction: column;
            }

            .split-pane-master {
                width: 100%;
                max-width: 100%;
                min-width: 100%;
                max-height: 40vh;
                border-right: none;
                border-bottom: 1px solid #dee2e6;
            }

            .split-pane-detail {
                min-height: 60vh;
            }
        }

        /* Dark mode */
        [data-theme="dark"] .split-pane-master {
            border-right-color: #404040;
        }

        [data-theme="dark"] .split-pane-detail {
            background: #1a1a1a;
        }

        [data-theme="dark"] .detail-header {
            border-bottom-color: #404040;
        }

        [data-theme="dark"] .detail-tabs {
            border-bottom-color: #404040;
        }

        [data-theme="dark"] .detail-tab.active {
            background: #2d2d2d;
            border-color: #404040;
            color: #ffc407;
            border-bottom: 2px solid #ffc407;
        }

        [data-theme="dark"] .info-field .info-value {
            background: #2d2d2d;
            border-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .info-field label {
            color: #b0b0b0;
        }

        [data-theme="dark"] .vacantes-sidebar {
            border-right-color: #404040;
        }

        [data-theme="dark"] .vacantes-sidebar .postulacion-item {
            border-bottom-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .vacantes-sidebar .postulacion-item:hover {
            background: #2a2a2a;
        }

        [data-theme="dark"] .vacantes-sidebar .postulacion-item.active {
            background: #3d3520;
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

        [data-theme="dark"] .postulante-list-item {
            border-bottom-color: #333;
        }

        [data-theme="dark"] .postulante-list-item:hover {
            background-color: #2a2a2a;
        }

        [data-theme="dark"] .postulante-list-item.selected {
            background-color: #3d3520;
        }

        [data-theme="dark"] .postulante-list-item .pli-name {
            color: #e0e0e0;
        }

        [data-theme="dark"] .postulante-list-item .pli-curp {
            color: #999;
        }

        [data-theme="dark"] .master-search {
            background: #1e1e1e;
            border-bottom-color: #404040;
        }

        [data-theme="dark"] .detail-tab:hover {
            background: #2a2a2a;
            color: #e0e0e0;
        }
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>

        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container-fluid">
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

                        <!-- Page header -->
                        <div class="row mb-2">
                            <div class="col">
                                <div class="page-description">
                                    <h1>Postulantes</h1>
                                </div>
                            </div>
                        </div>

                        <!-- SPLIT-PANE: Master (izquierda) + Detail (derecha) -->
                        <div class="row">
                            <div class="col-12">
                                <div class="card" style="overflow: hidden;">
                                    <div class="split-pane-wrapper">
                                        <!-- ====== PANEL IZQUIERDO: LISTA (MASTER) ====== -->
                                        <div class="split-pane-master">
                                            <div class="card-header d-flex justify-content-between align-items-center">
                                                <h5 class="card-title fw-bold mb-0">
                                                    <span
                                                        class="material-symbols-outlined align-middle me-2">group</span>
                                                    Listado
                                                </h5>
                                                <small class="text-muted" id="postulantesCount"></small>
                                            </div>
                                            <!-- Búsqueda en vivo -->
                                            <div class="master-search position-relative">
                                                <span class="material-symbols-outlined search-icon">search</span>
                                                <input type="text" id="buscarPostulanteInput" class="form-control"
                                                    placeholder="Buscar por nombre, CURP o vacante...">
                                            </div>
                                            <!-- Lista de postulantes -->
                                            <div class="card-body">
                                                <ul class="postulante-list" id="postulanteList">
                                                    <li class="postulante-list-empty">
                                                        <span class="material-symbols-outlined d-block mb-2"
                                                            style="font-size:2.5rem;">hourglass_empty</span>
                                                        Cargando...
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <!-- ====== PANEL DERECHO: DETALLE (DETAIL) ====== -->
                                        <div class="split-pane-detail" id="detailPanel">
                                            <!-- Empty state -->
                                            <div class="empty-state" id="detailEmptyState">
                                                <span class="material-symbols-outlined">person_search</span>
                                                <h5>Selecciona un postulante</h5>
                                                <p class="text-muted small">Haz clic en un registro de la lista para ver
                                                    su información completa.</p>
                                            </div>

                                            <!-- Detail content (hidden initially) -->
                                            <div id="detailContent" style="display:none;">
                                                <!-- Header -->
                                                <div class="detail-header">
                                                    <div>
                                                        <h4 id="pgSelectedPostulante" class="detail-name"></h4>
                                                        <div id="pgSelectedPostulanteMeta" class="detail-meta"></div>
                                                    </div>
                                                    <div class="d-flex gap-2">
                                                        <button type="button" class="btn-minimal btn-sm"
                                                            id="btnEditarPostulante"
                                                            onclick="PostulanteEditor.toggleEditMode()">
                                                            <span class="material-symbols-outlined align-middle"
                                                                style="font-size:18px;">edit</span> Editar
                                                        </button>
                                                        <button type="button" class="btn-minimal btn-sm"
                                                            onclick="closeDetail()">
                                                            <span class="material-symbols-outlined align-middle"
                                                                style="font-size:18px;">close</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <!-- Tabs -->
                                                <div class="detail-tabs">
                                                    <div class="detail-tab active" data-tab="info">
                                                        <span class="material-symbols-outlined align-middle"
                                                            style="font-size:16px;">badge</span> Info
                                                    </div>
                                                    <div class="detail-tab" data-tab="procesos">
                                                        <span class="material-symbols-outlined align-middle"
                                                            style="font-size:16px;">work_history</span> Procesos
                                                        <span class="badge bg-warning text-dark"
                                                            id="badgeVacantesCount">0</span>
                                                    </div>
                                                    <div class="detail-tab" data-tab="telefonos">
                                                        <span class="material-symbols-outlined align-middle"
                                                            style="font-size:16px;">phone</span> Teléfonos
                                                    </div>
                                                </div>

                                                <!-- Tab: Info Personal -->
                                                <div class="detail-tab-panel active" id="tabInfo">
                                                    <input type="hidden" id="detalleIdPostulante" value="">
                                                    <div class="row">
                                                        <div class="col-md-4 info-field">
                                                            <label>Nombre(s)</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteNombre" disabled>
                                                        </div>
                                                        <div class="col-md-4 info-field">
                                                            <label>Apellido Paterno</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteApellidoPaterno" disabled>
                                                        </div>
                                                        <div class="col-md-4 info-field">
                                                            <label>Apellido Materno</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteApellidoMaterno" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6 info-field">
                                                            <label>CURP</label>
                                                            <input type="text" class="form-control text-uppercase"
                                                                id="detallePostulanteCURP" maxlength="18" disabled>
                                                        </div>
                                                        <div class="col-md-6 info-field">
                                                            <label>Correo Electrónico</label>
                                                            <input type="email" class="form-control"
                                                                id="detallePostulanteCorreo" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-3 info-field">
                                                            <label>Código Postal</label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control"
                                                                    id="detallePostulanteCP" maxlength="5" disabled>
                                                                <button class="btn-minimal" type="button"
                                                                    id="btnBuscarCP"
                                                                    onclick="PostulanteEditor.buscarCodigoPostal()"
                                                                    style="display:none;">
                                                                    <span class="material-symbols-outlined"
                                                                        style="font-size:18px;">search</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3 info-field">
                                                            <label>Colonia</label>
                                                            <select class="form-select" id="detallePostulanteColonia"
                                                                disabled>
                                                                <option value="">Seleccionar...</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-3 info-field">
                                                            <label>Estado</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteEstado" disabled>
                                                        </div>
                                                        <div class="col-md-3 info-field">
                                                            <label>Ciudad</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteCiudad" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-4 info-field">
                                                            <label>Calle</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteCalle" disabled>
                                                        </div>
                                                        <div class="col-md-3 info-field">
                                                            <label>Núm. Exterior</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteNumeroExterior" disabled>
                                                        </div>
                                                        <div class="col-md-3 info-field">
                                                            <label>Núm. Interior</label>
                                                            <input type="text" class="form-control"
                                                                id="detallePostulanteNumeroInterior" disabled>
                                                        </div>
                                                        <div class="col-md-2 info-field">
                                                            <label>Teléfono</label>
                                                            <input type="tel" class="form-control"
                                                                id="detallePostulanteTelefono" maxlength="10" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12 info-field">
                                                            <label>Dirección completa</label>
                                                            <div id="detalleDireccionPreview" class="info-value">-</div>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" id="detallePostulanteDireccion">

                                                    <!-- Botones de Acción -->
                                                    <div class="row mt-3" id="botonesAccionPostulante"
                                                        style="display: none;">
                                                        <div class="col-12 text-end">
                                                            <button type="button" class="btn-minimal me-2"
                                                                onclick="PostulanteEditor.cancelarEdicion()">
                                                                <span class="material-symbols-outlined align-middle"
                                                                    style="font-size:18px;">close</span> Cancelar
                                                            </button>
                                                            <button type="button" class="btn-minimal"
                                                                onclick="PostulanteEditor.guardarCambiosPostulante()">
                                                                <span class="material-symbols-outlined align-middle"
                                                                    style="font-size:18px;">save</span> Guardar Cambios
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Tab: Procesos (Vacantes + Timeline) -->
                                                <div class="detail-tab-panel" id="tabProcesos">
                                                    <div class="row g-0">
                                                        <div class="col-md-5 vacantes-sidebar">
                                                            <h6
                                                                class="px-3 pt-2 fw-bold text-muted small text-uppercase">
                                                                Vacantes</h6>
                                                            <div id="listaPostulaciones">
                                                                <div class="text-muted small px-3">Selecciona un
                                                                    postulante</div>
                                                            </div>
                                                            <div class="mt-3 pt-2 border-top px-3">
                                                                <h6
                                                                    class="fw-bold text-muted small text-uppercase mb-2">
                                                                    Documentos</h6>
                                                                <div id="contenedorDocumentos">
                                                                    <div class="text-muted small">Selecciona una vacante
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-7 p-3">
                                                            <h6 id="tituloProcesos" class="fw-bold mb-3">Procesos</h6>
                                                            <div id="timelineProcesos">
                                                                <div class="text-muted small">Selecciona una vacante
                                                                </div>
                                                            </div>
                                                            <!-- Resultados de Evaluación -->
                                                            <div id="seccionResultadosEvaluacion" style="display:none;"
                                                                class="mt-4 pt-3 border-top">
                                                                <h6 class="fw-bold mb-3">
                                                                    <span
                                                                        class="material-symbols-outlined align-middle me-2"
                                                                        style="font-size:18px;">analytics</span>
                                                                    Resultados de Evaluación
                                                                </h6>
                                                                <div id="resultadosEvaluacionContent">
                                                                    <div class="text-muted small">Cargando resultados...
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Tab: Teléfonos -->
                                                <div class="detail-tab-panel" id="tabTelefonos">
                                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                                        <h6 class="fw-bold mb-0">
                                                            <span class="material-symbols-outlined align-middle"
                                                                style="font-size:18px;">phone</span>
                                                            Historial de Teléfonos
                                                        </h6>
                                                        <button type="button" class="btn-minimal btn-sm"
                                                            onclick="PostulanteEditor.mostrarFormAgregarTelefono()">
                                                            <span class="material-symbols-outlined align-middle"
                                                                style="font-size:16px;">add</span> Agregar
                                                        </button>
                                                    </div>
                                                    <!-- Form agregar teléfono -->
                                                    <div id="formAgregarTelefono"
                                                        class="d-none mb-3 p-3 border rounded">
                                                        <div class="row g-2 align-items-end">
                                                            <div class="col-md-5">
                                                                <label class="form-label small">Número (10
                                                                    dígitos)</label>
                                                                <input type="text" id="nuevoTelefono"
                                                                    class="form-control" placeholder="5512345678"
                                                                    maxlength="10">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label class="form-label small">Observaciones</label>
                                                                <input type="text" id="observacionesTelefono"
                                                                    class="form-control" placeholder="Nota opcional">
                                                            </div>
                                                            <div class="col-md-3">
                                                                <button type="button" class="btn-minimal w-100"
                                                                    onclick="PostulanteEditor.agregarTelefonoNuevo()">
                                                                    <span class="material-symbols-outlined align-middle"
                                                                        style="font-size:16px;">save</span> Guardar
                                                                </button>
                                                                <button type="button" class="btn-minimal w-100 mt-1"
                                                                    onclick="PostulanteEditor.ocultarFormAgregarTelefono()">
                                                                    Cancelar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="seccionTelefonos">
                                                        <p class="text-muted small">Cargando teléfonos...</p>
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
        </div>
    </div>

    <?php include("neptune_js.php"); ?>
    <script>
        const NO_EMPLEADO = <?php echo isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0; ?>;
    </script>
    <script src="scripts/PostulanteEditor.js?v=6"></script>
    <script src="scripts/PostulantesGeneral.js?v=3"></script>
</body>

</html>
