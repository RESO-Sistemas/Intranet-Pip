<!DOCTYPE html>
<html>

<head>
    <?php include("AutorizaPagina.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>
    <!-- Styles neptune -->

    <?php include("neptune_styles.php");  ?>
    <!-- <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet"> -->

    <!-- Styles neptune -->
    <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
    <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet"> -->
    <!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
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
                                        <div class="row text-end mb-4">
                                            <div class="col">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#CatalogoLineaEica">
                                                    Ver Catálogo Línea Ética
                                                </button>

                                            </div>
                                        </div>
                                        <div class="row text-center">
                                            <div class="col">
                                                <h6 class="fw-bold">Mensajes de la Línea de Ética</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col" style="overflow-y:scroll;max-height:65vh">

                                                <div id="ContenidoLineaEtica"></div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal Catalogo Linea de Etica -->
                <div class="modal fade" id="CatalogoLineaEica" tabindex="-1" aria-labelledby="CatalogoLineaEicaLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-scrollable">
                        <div class="modal-content">

                            <!-- Header -->
                            <div class="modal-header">
                                <h5 class="modal-title" id="CatalogoLineaEicaLabel">Catálogos Línea Ética</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>

                            <!-- Body -->
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row g-3">

                                        <!-- Formulario -->
                                        <div class="col-12 mb-4">

                                            <form id="formInsertaCatalogo" class="row g-3 align-items-center">
                                                <input type="hidden" name="op" value="addCatalogoLiniaEtica">

                                                <div class="col-9">
                                                    <label for="txtNuevaEtica" class="form-label fw-bold">Nuevo Catálogo</label>
                                                    <input type="text" name="txtNuevaEtica" id="txtNuevaEtica" class="form-control" required>
                                                </div>

                                                <div class="col-3 text-center d-flex justify-content-center align-items-center">
                                                    <button type="button" id="btnAgregaNuevoCatalogo" class="btn btn-primary mt-4">
                                                        Agregar Nuevo
                                                    </button>
                                                </div>
                                            </form>

                                        </div>

                                        <!-- Tabla -->
                                        <div class="col-12">

                                            <div class="table-responsive" style="max-height: 40vh; overflow-y: auto;">
                                                <table id="tableCatalogoLiniaEtica" class="table display align-middle text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Descripción</th>
                                                            <th>Status</th>
                                                            <th>Actualizar Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <!-- Aquí se insertan filas dinámicamente -->
                                                    </tbody>
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


    <!-- neptune Javascripts -->
    <?php include("neptune_js.php");  ?>
    <!-- neptune Javascripts -->

    <?php include("scripts.php"); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/LineaEtica.js" charset="utf-8"></script>

</body>

</html>