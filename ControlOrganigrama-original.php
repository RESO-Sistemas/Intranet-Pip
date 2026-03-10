<!DOCTYPE html>
<html>

<head>
  
  <!--  include("AutorizaPagina.php"); -->
  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
    <style media="screen">
    </style>
</head>

<body>
    <div class="main-wrapper" id="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>
        <div id="Menu">
            <?php
            include("menus-original.php");
            ?>
        </div>
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Organigramas</h5>
                    <div class="custom-breadcrumb ml-auto">
                        <a href="#!" class="breadcrumb">Home</a>
                        <a href="#!" class="breadcrumb">Inicio</a>
                    </div>
                </div>
            </div>
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
            <div class="container-fluid" style="z-index:5">
                <div class="row">
                    <div class="col s12 l12">
                        <div class="card">
                            <div class="card-content">
                                <div class="row">
                                    <div class="col s12 l3 offset-l9">
                                        <button type="button" data-target="ModalNewOrganigrama"
                                            class="btn modal-trigger" id="btnNewOrganigrama">Nuevo Organigrama</button>
                                    </div>
                                    <div class="col s12 l12">
                                        <div class="table-responsive">
                                            <table id="tableOrganigramas" class="table striped m-b-10 display centered">
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

            <div class="chat-windows"></div>
        </div>
        <div id="ModalNewOrganigrama" tabindex="-1" role="dialog" class="modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo Organigrama</h5>
                    </div>
                    <div class="modal-body">
                        <form id="formInsertaOrg">
                            <input type="hidden" name="op" value="addOrganigrama">
                            <div class="row">
                                <div class="input-field col s12 l12">
                                    <input id="txtTituloOrg" name="txtTituloOrg" type="text" required>
                                    <label for="txtTituloOrg">Titulo </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="btnGuardarOrg">Guardar</button>
                        <button type="button" class="btn btn-secondary modal-action modal-close"
                            data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>


        <?php include("scripts-original.php"); ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
            integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
            integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
        <script src="assets/libs/toastr/build/toastr.min.js"></script>
        <script src="assets/extra-libs/toastr/toastr-init.js"></script>
        <script src="scripts/ControlOrganigrama-original.js" charset="utf-8"></script>
</body>

</html>
