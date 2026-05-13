<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP by Lugo</title>

    <!-- Styles neptune -->

    <?php include("neptune_styles.php");  ?>

    <!-- Styles neptune -->
    <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="dist/css/icons/font-awesome/css/fontawesome-all.min.css" />
    <style media="screen">
    </style>

</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>
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
                            <div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block" style="position: fixed; z-index:99;">
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
                        <div class="row">
                            <div class="col-12">
                                <div class="page-description page-description-tabbed">
                                    <h1 class="text-center text-md-start">Capacitación</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-12 col-md-6">
                                                <div class="card-title mb-0">Capacitaciones activas</div>
                                            </div>
                                            <div class="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
                                                <a class="btn btn-primary w-100 w-md-auto px-4" href="AddCapacitacion.php" style="max-width: 200px;">Nueva</a>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-12">
                                                <div class="table-responsive">
                                                  <div id="tableCapacitacion"></div>
                                                </div>
                                            </div>
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
    <?php include("neptune_js.php");  ?>
    <!-- neptune Javascripts -->
    
    <!-- Scripts específicos de esta página -->
        <script src="scripts/Capacitacion.js?v=<?= time() ?>" charset="utf-8"></script>
</body>

</html>