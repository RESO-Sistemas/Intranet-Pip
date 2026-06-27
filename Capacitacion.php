<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>La Esmeralda</title>

    <!-- Styles neptune -->
    <?php include("neptune_styles.php"); ?>
    <!-- Styles neptune -->

    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link rel="stylesheet" href="dist/css/icons/font-awesome/css/fontawesome-all.min.css" />

    <style media="screen">
        :root {
            --cap-amarillo: #008837;
            --cap-amarillo-oscuro: #e0a800;
        }

        .capacitacion-header {
            background: var(--cap-amarillo);
            border-radius: 16px;
            padding: 2rem;
            color: #212529;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 136, 55, 0.25);
        }

        .capacitacion-header h1 {
            font-weight: 700;
            margin-bottom: 0.25rem;
        }

        .capacitacion-header p {
            opacity: 0.9;
            margin-bottom: 0;
        }

        .metric-card {
            border: none;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            height: 100%;
        }

        .metric-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .metric-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .metric-value {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 0;
        }

        .metric-label {
            color: #6c757d;
            font-size: 0.875rem;
            margin-bottom: 0;
        }

        .btn-nueva {
            background: #212529;
            border: none;
            border-radius: 12px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-nueva:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
            color: white;
        }

        .grid-card {
            border: none;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .grid-card .card-body {
            padding: 1.5rem;
        }

        .grid-card .card-title {
            font-weight: 700;
            font-size: 1.1rem;
            color: #2c3e50;
        }
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader -->
        <!-- ============================================================== -->
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
                        <!-- Notificaciones flotantes -->
                        <div class="row">
                            <div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block"
                                style="position: fixed; z-index:99;">
                                <div class="row">
                                    <div class="col-12" style="position: relative;">
                                        <div id="contenidoMensajes" style="margin-right:2vh"></div>
                                    </div>
                                    <div class="col-12" style="position: relative;">
                                        <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                                    </div>
                                    <div class="col-12" style="position: relative;">
                                        <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Header -->
                        <div class="row">
                            <div class="col-12">
                                <div
                                    class="capacitacion-header d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                    <div>
                                        <h1>Capacitaciones</h1>
                                        <p>Administra las capacitaciones y sus materiales desde un solo lugar.</p>
                                    </div>
                                    <div class="mt-3 mt-md-0">
                                        <a class="btn btn-nueva text-white" href="AddCapacitacion.php">
                                            <span class="material-symbols-outlined"
                                                style="vertical-align: middle; font-size: 20px;">add</span>
                                            <span style="vertical-align: middle;">Nueva capacitación</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Métricas -->
                        <div class="row g-3 mb-4">
                            <div class="col-12 col-md-4">
                                <div class="card metric-card">
                                    <div class="card-body d-flex align-items-center">
                                        <div class="metric-icon bg-primary bg-opacity-10 text-primary me-3">
                                            <span class="material-symbols-outlined">school</span>
                                        </div>
                                        <div>
                                            <p class="metric-value" id="metricTotal">0</p>
                                            <p class="metric-label">Total capacitaciones</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="card metric-card">
                                    <div class="card-body d-flex align-items-center">
                                        <div class="metric-icon bg-success bg-opacity-10 text-success me-3">
                                            <span class="material-symbols-outlined">check_circle</span>
                                        </div>
                                        <div>
                                            <p class="metric-value" id="metricActivas">0</p>
                                            <p class="metric-label">Capacitaciones activas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4">
                                <div class="card metric-card">
                                    <div class="card-body d-flex align-items-center">
                                        <div class="metric-icon bg-danger bg-opacity-10 text-danger me-3">
                                            <span class="material-symbols-outlined">cancel</span>
                                        </div>
                                        <div>
                                            <p class="metric-value" id="metricInactivas">0</p>
                                            <p class="metric-label">Capacitaciones inactivas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Grid -->
                        <div class="row">
                            <div class="col-12">
                                <div class="card grid-card">
                                    <div class="card-body">
                                        <div
                                            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                                            <div class="card-title mb-0">Listado de capacitaciones</div>
                                            <div class="mt-2 mt-md-0">
                                                <span class="text-muted" style="font-size: 0.875rem;">
                                                    <span class="material-symbols-outlined"
                                                        style="font-size: 16px; vertical-align: middle;">info</span>
                                                    Haz clic en "Archivos" para ver los materiales adjuntos
                                                </span>
                                            </div>
                                        </div>

                                        <div class="table-responsive">
                                            <div id="tableCapacitacion"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="chat-windows"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <!-- neptune Javascripts -->

    <script src="scripts/Capacitacion.js?v=<?= time() ?>" charset="utf-8"></script>
</body>

</html>
