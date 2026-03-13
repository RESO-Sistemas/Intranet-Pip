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
        /* ====== TIMELINE (PROCESOS POR VACANTE) ====== */
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

        .postulacion-item {
            cursor: pointer;
        }
        .postulacion-item.active {
            background: rgba(13, 110, 253, 0.08);
            border-color: rgba(13, 110, 253, 0.25);
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
        [data-theme="dark"] .postulacion-item.active {
            background: rgba(13, 110, 253, 0.18);
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
                                    <h1>Base de datos de postulantes</h1>
                                    <p class="text-muted">Administración centralizada de candidatos, sin importar la vacante</p>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- Listado general -->
                            <div class="col-lg-7">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">group</span>
                                            Listado de postulantes
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tablePostulantesGeneral" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>CURP/RFC</th>
                                                        <th>Nombre</th>
                                                        <th>Primera suscripción</th>
                                                        <th>Última vacante</th>
                                                        <th>Último estatus</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                        <small class="text-muted">Selecciona un postulante para ver su historial.</small>
                                    </div>
                                </div>
                            </div>

                            <!-- Historial por postulante -->
                            <div class="col-lg-5">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">history</span>
                                            Historial de postulaciones
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-2">
                                            <div class="fw-bold" id="pgSelectedPostulante">Seleccione un postulante</div>
                                            <div class="text-muted small" id="pgSelectedPostulanteMeta"></div>
                                        </div>

                                        <div class="row g-3">
                                            <div class="col-md-5">
                                                <div class="border rounded p-2" style="min-height: 320px;">
                                                    <div class="fw-bold mb-2">Vacantes</div>
                                                    <div id="listaPostulaciones" class="list-group">
                                                        <div class="text-muted small">Sin selección</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-7">
                                                <div class="border rounded p-2" style="min-height: 320px;">
                                                    <div class="fw-bold mb-2" id="tituloProcesos">Procesos</div>
                                                    <div id="timelineProcesos">
                                                        <div class="text-muted small">Selecciona una vacante.</div>
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
    <?php include("scripts.php"); ?>

    <script src="scripts/PostulantesGeneral.js"></script>
</body>

</html>
