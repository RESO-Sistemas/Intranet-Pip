<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                <p class="loader__label">Klyns</p>
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
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="card-title">Capacitaciones activas</div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col text-end">
                                                <a class="btn btn-primary" href="AddCapacitacion.php">Nueva</a>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="table-responsive">
                                                <table class="display align-middle text-center" id="tableCapacitacion">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Descripción</th>
                                                            <th scope="col">Días</th>
                                                            <th scope="col">Fecha Inicio</th>
                                                            <th scope="col">Fecha Fin</th>
                                                            <th scope="col">Hora Inicio</th>
                                                            <th scope="col">Hora Fin</th>
                                                            <th scope="col">Estatus</th>
                                                            <th scope="col">Editar</th>
                                                            <th scope="col">Cambiar Status</th>
                                                            <th scope="col">Eliminar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <!-- Aquí van las filas generadas dinámicamente -->
                                                    </tbody>
                                                </table>
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
    <script src="scripts/Capacitacion.js" charset="utf-8"></script>
</body>

</html>