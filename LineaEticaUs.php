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

    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script src="componentes/detallesEmpleadoLogeado.js"></script>

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
                                    <h1 class="text-center text-md-start">Linea de Ética</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <form id="formLineaEtica" action="Backend/LineaEtica/App.php" method="post">
                                                <!-- Mensaje de advertencia responsive -->
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col-12 col-md-auto text-center">
                                                        <span class="badge badge-style-bordered rounded-pill badge-warning d-inline-block" style="font-size: 0.875rem; padding: 0.5rem 1rem; word-wrap: break-word; max-width: 100%;">
                                                            La información que envíes será totalmente anónima.
                                                        </span>
                                                    </div>
                                                </div>

                                                <!-- Dropdowns Division y Sucursal responsive -->
                                                <div class="row mb-4">
                                                    <div class="col-12 col-md-6 mb-3 mb-md-0">
                                                        <label class="form-label">Division:</label>
                                                        <select id="division" name="division" class="form-control form-select" required>
                                                            <option value="" selected disabled>Línea de ética</option>
                                                        </select>
                                                        <span for="division"></span>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label">Sucursal:</label>
                                                        <select id="sl_branch" name="sucursal" class="form-control form-select" required disabled>
                                                            <option value="" selected disabled>Seleccione una sucursal</option>
                                                        </select>
                                                        <span for="sl_branch"></span>
                                                    </div>
                                                </div>

                                                <!-- Título de selección de situación -->
                                                <div class="row justify-content-center mb-2">
                                                    <div class="col-12 text-center">
                                                        <h6 class="form-label mb-1">Selecciona la situación:</h6>
                                                        <small class="text-muted d-block">Selecciona la situación que quieres reportar.</small>
                                                    </div>
                                                </div>

                                                <!-- Dropdown de situación -->
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col-12 col-md-8 col-lg-6">
                                                        <select id="slctLineaEtica" name="slctLineaEtica" class="form-control form-select" required>
                                                            <option value="" selected disabled>Selecciona una opción</option>
                                                        </select>
                                                        <span for="slctLineaEtica"></span>
                                                    </div>
                                                </div>

                                                <!-- Textarea para descripción -->
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col-12">
                                                        <label for="contenidoLineaEtica" class="form-label">Describe la situación o inconformidad que presentes:</label>
                                                        <textarea id="contenidoLineaEtica" name="contenidoLineaEtica" class="form-control" style="height:15vh; min-height: 120px;" placeholder="Escribe tu mensaje..." required></textarea>
                                                    </div>
                                                </div>

                                                <!-- Botón de envío -->
                                                <div class="row justify-content-center mb-4">
                                                    <div class="col-12 col-md-auto text-center">
                                                        <button class="btn btn-success w-100 w-md-auto px-5" id="EnviarLineaE" style="max-width: 300px;">Enviar</button>
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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/LineaEticaUs.js" charset="utf-8"></script>


</body>

</html>