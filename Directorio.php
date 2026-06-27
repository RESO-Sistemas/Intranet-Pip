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
    <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">

    <!-- Styles neptune -->

    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />
    <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
    <script src="componentes/detallesEmpleadoLogeado.js"></script>
    <style>
        /* ====== MEJORA DE ESTILO PARA PESTAÑAS (TABS) EN DIRECTORIO ====== */
        #myTab {
            border-bottom: 2px solid #e9ecef;
        }

        #myTab .nav-link {
            color: #6c757d;
            font-weight: 500;
            padding: 0.8rem 1.2rem;
            border: none;
            background: transparent;
            position: relative;
            transition: all 0.25s ease;
        }

        #myTab .nav-link:hover {
            color: #008837;
            background-color: rgba(0, 136, 55, 0.05);
        }

        #myTab .nav-link.active {
            color: #008837 !important;
            font-weight: 700;
            background: transparent;
            border-bottom: 3px solid #008837 !important;
            opacity: 1;
        }

        /* Estilo para las tarjetas que contienen las tablas */
        .tab-content .card {
            border-top-left-radius: 0;
            border-top: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
    </style>


</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <!-- <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div> -->
        <div id="Menu">
            <?php
            include("menus.php");
            ?>
        </div>
        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container">
                        <div class="row">
                            <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                                <div class="row">
                                    <div class="col s12 l12" style="position: relative;">
                                        <div id="contenidoMensajes" style="margin-right:2vh"></div>
                                    </div>
                                    <div class="col s12 l12" style="position: relative;">
                                        <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                                    </div>
                                    <div class="col s12 l12" style="position: relative;">
                                        <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="page-description page-description-tabbed">
                                    <h1>Directorio Telefónico</h1>
                                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab"
                                                data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1"
                                                aria-selected="true">Correos-Telefonos</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="tab2-tab" data-bs-toggle="tab"
                                                data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2"
                                                aria-selected="false">Directorio de Extensiones</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="tab3-tab" data-bs-toggle="tab"
                                                data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3"
                                                aria-selected="false">Directorio de Sucursales.</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- MIS SOLICITUDES -->
                        <div class="row">
                            <div class="col">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="tab1" role="tabpanel"
                                        aria-labelledby="tab1-tab">
                                        <div class="card">
                                            <div id="correosTelefonos" class="col">
                                                <div class="card-body">
                                                    <div id="contenidoDirectorioEmailTelefonos"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                                        <div class="card">
                                            <div id="extensiones" class="col">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <label class="form-label">Listado de Tipos de
                                                                Extensiones:</label>
                                                            <select class="form-select pb-2"
                                                                aria-label="Default select example"
                                                                name="tiposExtension[]" id="tiposExtension"
                                                                multiple="multiple" style="width:100%"
                                                                onchange="loadDirectorioExtensiones()">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div id="contenidoDirectorioExtensiones" style="margin-top:2vh">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                                        <div class="card">
                                            <div id="extensiones" class="col">
                                                <div class="card-body">
                                                    <div class="table-responsive">
                                                      <div id="tableDirectorioSucursal"></div>
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




    <!-- neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <!-- neptune Javascripts -->


    <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
    <script src="./neptune/js/pages/select2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
        integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
        integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

    <!-- Scripts específicos de esta página -->
    <script src="scripts/global.js" charset="utf-8"></script>
        <!-- index.js removido - solo es para index.php -->
    <script src="scripts/Directorio.js?v=<?= time() ?>"></script>
    <script src="scripts/detallesEmpleadoLogeado.js?v=<?= time() ?>"></script>

</body>

</html>
