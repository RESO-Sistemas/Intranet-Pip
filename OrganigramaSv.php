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
    <!-- <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet"> -->

    <!-- Styles neptune -->

    <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
    <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet"> -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <link href="https://cdn.syncfusion.com/ej2/20.3.56/material.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <!-- <style media="screen">
        [data-l-id] path {
            stroke: #212121;
        }

        .FondoOrg>svg {
            background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        [data-n-id] rect {
            fill: #fff;
        }

        .boc-edit-form-header {
            background-color: #E32636 !important;
        }

        .boc-input {
            padding: 1vh !important;
        }

        #contenidoOrganigramas {
            margin-left: 3vh;
            margin-right: 3vh;
        }
    </style>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script> -->
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
            <div class="app-header">
                <nav class="navbar navbar-light navbar-expand-lg">
                    <div class="container-fluid">
                        <div class="navbar-nav" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">first_page</i></a>
                                </li>
                            </ul>

                        </div>
                        <div class="d-flex">
                            <ul class="navbar-nav">

                                <!-- notifications -->
                                <li class="nav-item hidden-on-mobile">
                                    <!-- nav-notifications-toggle -->
                                    <a class="nav-link" id="notificationsDropDown" href="#" data-bs-toggle="dropdown"><i class="material-icons">notifications</i></a>
                                    <div class="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">
                                        <h6 class="dropdown-header">Notificaciones</h6>
                                        <div class="notifications-dropdown-list">
                                            <div id="notificacionesPendienteLEtica"></div>
                                            <div id="notificacionesMenuLEtica"></div>
                                            <div id="notificacionesMenuSVacaciones"></div>
                                            <div id="notificacionesMenuSVacacionesNomina"></div>
                                            <div id="notificacionesCapacitacion"></div>
                                        </div>
                                    </div>
                                </li>

                                <!--  Foto de perfil -->
                                <li class="nav-item hidden-on-mobile">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        id="notificationsDropDown"
                                        href="javascript:void(0);"
                                        data-bs-toggle="dropdown">
                                        <img
                                            id="imgSmallProfile"
                                            alt="user"
                                            class="rounded-circle"
                                            width="30"
                                            height="30" />
                                    </a>
                                    <ul
                                        id="user_dropdown"
                                        class="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="addDropdownLink">
                                        <li>
                                            <!-- <a class="dropdown-item" href="#">New Workspace</a> -->
                                            <div class="dropdown-item " style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                                                <div class="u-img" style="padding-bottom: 10px; padding-top:10px; "><img class="rounded-circle " id="profileImg" alt="user" width="60px" height="60px"></div>
                                                <div class="u-text">
                                                    <h4 id="PerfilNombreEmp"></h4>
                                                    <p id="PerfilCorreoEmp"></p>
                                                    <!-- <a class="waves-effect waves-light btn-small red white-text" href="index.php">Perfil</a> -->
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <a
                                                class="dropdown-item d-flex align-items-center"
                                                href="index.php"><i class="material-icons me-2">home</i>Inicio</a>
                                        </li>
                                        <li>
                                            <a
                                                class="dropdown-item d-flex align-items-center"
                                                href="logout.php"><i class="material-icons me-2">exit_to_app</i>Salir</a>
                                        </li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
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
                                    <h1>Editar Organigrama</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row text-start">
                                            <div class="col">
                                                <a href="ControlOrganigrama.php" class="btn btn-danger">Regresar</a>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 text-center">
                                                <label class="form-label fw-bold">Filtros</label>
                                                <div class="row d-flex justify-content-center mb-2">
                                                    <div class="col-4 text-start">
                                                        <label class="form-label fw-bold">Tipo</label>
                                                        <select class="form-select" id="slctTipoPrincipal">
                                                            <option value="" selected disabled>Tipos de empleado</option>
                                                            <option value="1">Principal</option>
                                                            <option value="2">Empleado</option>
                                                            <option value="3">Otros</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-4">
                                                    <div class="col-3 text-start" style="display: none;" id="divNivel">
                                                        <label class="form-label fw-bold">Nivel</label>
                                                        <select class="form-select" id="slctNivelPrincipal"
                                                            onchange="getEmpleadosOrg()">
                                                            <option value="" selected>Listado de Niveles</option>
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-3 text-start" style="display: none;" id="divDivicion">
                                                        <label class="form-label fw-bold">Division</label>
                                                        <select class="form-select" id="slcDivicionPrincipal"
                                                            onchange="onchangeDivision()"></select>
                                                    </div>
                                                    <div class="col-3 text-start" style="display: none;" id="divPuesto">
                                                        <label class="form-label fw-bold">Puesto</label>
                                                        <select class="form-select" id="slctPuestoPrincipal"
                                                            onchange="getEmpleadosOrg()"></select>
                                                    </div>
                                                    <div class="col-3 text-start" style="display: none;" id="divSucursal">
                                                        <label class="form-label fw-bold">Sucursal</label>
                                                        <select class="form-select" id="slctSucursalPrincipal"
                                                            onchange="getEmpleadosOrg()"></select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 text-center">
                                                <div class="row d-flex justify-content-center">
                                                    <div class="col-4 text-start" style="display:none;" id="divEmpleado">
                                                        <label class="form-label fw-bold">Empleado</label>
                                                        <select class="form-select js-example-basic-single" style="width: 100%;" id="slctEmpleadoPrincipal"></select>
                                                    </div>
                                                    <div class="col-4 text-start" style="display:none;" id="divEmpleadoPadre">
                                                        <label class="form-label fw-bold">Empleado Padre</label>
                                                        <select class="form-select js-example-basic-single" style="width: 100%;" id="slctEmpleadoPadrePrincipal"></select>
                                                    </div>
                                                    <div class="col-6 text-start" style="display:none;" id="divOtros">
                                                        <label class="form-label fw-bold">Descripción</label>
                                                        <input class="form-control form-control-solid-bordered" type="text" id="txtOtros"></input>
                                                    </div>
                                                    <div class="col-12 mb-4" style="text-align:center;margin-top:1vh;">
                                                        <button type="button"
                                                            class="btn btn-success"
                                                            id="RegistraPrin">Agregar</button>
                                                    </div>
                                                    <div class="col-12">
                                                        <div id="container">
                                                            <div id="element"></div>
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
            <div class="modal fade" id="modeallEditarElemento" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar elemento</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <div class="modal-body">
                            <input type="hidden" id="idElementoPorEditar" required>
                            <div class="row g-3">
                                <!-- Tipo -->
                                <div class="col-md-3">
                                    <label class="form-label">Tipo</label>
                                    <select class="form-select" id="slctTipoModal" name="slctTipoModal" required>
                                        <option value="" selected disabled>Tipos de empleado</option>
                                        <option value="1">Principal</option>
                                        <option value="2">Empleado</option>
                                        <option value="3">Otros</option>
                                    </select>
                                </div>

                                <!-- Nivel -->
                                <div class="col-md-2" style="display: none;" id="divNivelModal">
                                    <label class="form-label">Nivel</label>
                                    <select class="form-select" id="slctNivelModal" onchange="getEmpleadosOrgEditar()">
                                        <option value="" selected>Listado de Niveles</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                </div>

                                <!-- División -->
                                <div class="col-md-2" style="display: none;" id="divDivicionModal">
                                    <label class="form-label">División</label>
                                    <select class="form-select" id="slcDivicionModal" onchange="onchangeDivisionEditar()"></select>
                                </div>

                                <!-- Puesto -->
                                <div class="col-md-2" style="display: none;" id="divPuestoModal">
                                    <label class="form-label">Puesto</label>
                                    <select class="form-select" id="slctPuestoModal" onchange="getEmpleadosOrgEditar()"></select>
                                </div>

                                <!-- Sucursal -->
                                <div class="col-md-3" style="display: none;" id="divSucursalModal">
                                    <label class="form-label">Sucursal</label>
                                    <select class="form-select" id="slctSucursalModal" onchange="getEmpleadosOrgEditar()"></select>
                                </div>

                                <!-- Empleado -->
                                <div class="col-md-4" style="display: none;" id="divEmpleadoModal">
                                    <label class="form-label">Empleado</label>
                                    <select class="form-select empleadosUpdate" id="slctEmpleadoModal" name="slctEmpleadoModal" required></select>
                                </div>

                                <!-- Otros -->
                                <div class="col-md-8" style="display: none;" id="divOtrosModal">
                                    <label class="form-label">Descripción</label>
                                    <input type="text" class="form-control" id="txtOtrosModal" name="txtOtrosModal" required>
                                </div>

                                <!-- Empleado Padre -->
                                <div class="col-md-4" style="display: none;" id="divEmpleadoPadreModal">
                                    <label class="form-label">Empleado Padre</label>
                                    <select class="form-select emPadreUpdate" id="slctEmpleadoPadreModal" name="slctEmpleadoPadreModal" required></select>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> -->
                            <button type="button" class="btn btn-primary" id="RegistraEditarModal" onclick="EditarEmpleadoOrganigrama()">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

    <?php include("scripts.php"); ?>
    <!-- neptune Javascripts -->
    <?php include("neptune_js.php");  ?>
    <!-- <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
    <script src="./neptune/js/pages/select2.js"></script> -->
    <!-- neptune Javascripts -->


    <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
        integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
        integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/orgchart.js" charset="utf-8"></script>
    <script src="scripts/OrganigramaSv.js" charset="utf-8"></script>
</body>

</html>