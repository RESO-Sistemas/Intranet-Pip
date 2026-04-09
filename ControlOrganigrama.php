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
                                                <button type="button" class="btn btn-primary btn-accion" id="btnNewOrganigrama" title="Nuevo Organigrama">
                                                    <span class="material-symbols-outlined">add</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table id="tableOrganigramas" class="table display text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Organigrama</th>
                                                        <th>Status</th>
                                                        <th>ACCIONES</th>
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

            <div class="modal fade" id="ModalNewOrganigrama" tabindex="-1" aria-labelledby="TituloOrganigrama" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title d-flex align-items-center gap-2" id="TituloOrganigrama">
                                <span class="material-symbols-outlined text-primary">account_tree</span>
                                <span>Nuevo Organigrama</span>
                            </h5>
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
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/ControlOrganigrama.js" charset="utf-8"></script>
</body>

</html>