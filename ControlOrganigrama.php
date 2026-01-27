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
                                    <h1>Organigramas</h1>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-4">
                                            <div class="col text-end">
                                                <button type="button"
                                                    class="btn btn-primary" id="btnNewOrganigrama">Nuevo Organigrama</button>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table id="tableOrganigramas" class="table display text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Organigrama</th>
                                                        <th>Status</th>
                                                        <th>Editar</th>
                                                        <th>Cambiar Status</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalNewOrganigrama" tabindex="-1" aria-labelledby="TituloOrganigrama" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="TituloOrganigrama">Nuevo Organigrama</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <!-- Body -->
                        <div class="modal-body">
                            <form id="formInsertaOrg">
                                <input type="hidden" name="op" value="addOrganigrama">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label for="txtTituloOrg" class="form-label fw-bold">Título</label>
                                        <input id="txtTituloOrg" name="txtTituloOrg" type="text" class="form-control" required>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!-- Footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="btnGuardarOrg">Guardar</button>
                            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> -->
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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
        integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
        integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/ControlOrganigrama.js" charset="utf-8"></script>
</body>

</html>