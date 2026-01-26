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

    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script src="componentes/detallesEmpleadoLogeado.js"></script>
    <style media="screen">
        .textDesc {
            font-size: 2em !important;
        }

        @media only screen and (max-width: 600px) {
            .textDesc {
                font-size: 1em !important;
            }
        }
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
                                    <h1>Linea de Ética</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <form id="formLineaEtica" action="Backend/LineaEtica/App.php" method="post">
                                                <div class="row justify-content-end mb-4">
                                                    <div class="col-auto">
                                                        <span class="badge badge-style-bordered rounded-pill badge-warning">
                                                            La información que envíes será totalmente anónima.
                                                        </span>

                                                    </div>
                                                </div>
                                                <div class="row align-items-center mb-4">
                                                    <div class="col">
                                                        <label class="form-label">Division:</label>
                                                        <select id="division" name="division" class="form-control" required>
                                                            <option value="" selected disabled>Línea de ética</option>
                                                        </select>
                                                        <span for="division"></span>
                                                    </div>
                                                    <div class="col">
                                                        <label class="form-label">Sucursal:</label>
                                                        <select id="sl_branch" name="sucursal" class="form-control" required disabled></select>
                                                        <span for="sl_branch"></span>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center mb-2">
                                                    <div class="col-auto text-center">
                                                        <h6 class="form-label">Selecciona la situación:</h6>
                                                        <small class="text-muted">Selecciona la situción que quieres reportar.</small>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col-auto">
                                                        <select id="slctLineaEtica" name="slctLineaEtica" class="form-control" required>
                                                            <option value="" disabled>Línea de ética</option>
                                                        </select>
                                                        <span for="slctLineaEtica"></span>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col">
                                                        <label for="contenidoLineaEtica" class="form-label">Describe la situación o inconformidad que presentes.:</label>
                                                        <textarea id="contenidoLineaEtica" name="contenidoLineaEtica" class="form-control" style="height:15vh" placeholder="Escribe tu mensaje..." required></textarea>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col-auto">
                                                        <button class="btn btn-success" id="EnviarLineaE">Enviar</button>
                                                    </div>
                                                </div>
                                            </form>
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
    <?php include("neptune_js.php");  ?>
    <!-- neptune Javascripts -->

    <?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/LineaEticaUs.js" charset="utf-8"></script>


</body>

</html>