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
    <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">

    <!-- Styles neptune -->
    <script src="componentes/detallesEmpleadoLogeado.js"></script>


</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <!-- <p class="loader__label">Klyns</p> -->
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
                                    <h1>Directorio Telefónico</h1>
                                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Correos-Telefonos</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Directorio de Extensiones</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">Directorio de Sucursales.</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
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
                                                            <label class="form-label">Listado de Tipos de Extensiones:</label>
                                                            <select class="form-select pb-2" aria-label="Default select example" name="tiposExtension[]" id="tiposExtension" multiple="multiple" style="width:100%" onchange="loadDirectorioExtensiones()">
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div id="contenidoDirectorioExtensiones" style="margin-top:2vh"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                                        <div class="card">
                                            <div class="col">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col text-end mb-4">
                                                            <button type="button" class="btn btn-success" id="btnOpenModalSucursal"><span class="material-symbols-outlined">add</span></button>
                                                        </div>
                                                    </div>
                                                    <div class="table-responsive">
                                                        <table id="tableDirectorioSucursal" class="table display text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sucursal</th>
                                                                    <th>Dirección</th>
                                                                    <th>Teléfono</th>
                                                                    <th>Num. Red</th>
                                                                    <th>Nombre Empleado</th>
                                                                    <th>Puesto</th>
                                                                    <th>Correo</th>
                                                                    <th>Fecha de Apertura</th>
                                                                    <th>Antigüedad</th>
                                                                    <th>Marcación Corta</th>
                                                                    <th>Actualizar</th>
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
                    </div>
                </div>
            </div>
            <!-- Modal Bootstrap -->
            <div class="modal fade" id="modalAddEmpleadosDirectorioEmTel" tabindex="-1" aria-labelledby="NameDirectorio" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="NameDirectorio"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <!-- Body -->
                        <div class="modal-body">
                            <input type="hidden" id="IdTipoEmTel">

                            <div class="row g-3">
                                <!-- Filtros -->
                                <div class="col-12 p-3 border rounded">
                                    <div class="row g-3">
                                        <div class="col-12 col-md-4">
                                            <label for="slctDivisionEm" class="form-label fw-bold">Divisiones</label>
                                            <select name="slctDivisionEm" id="slctDivisionEm" class="form-select" onchange="getListadoPersonal()" required>
                                                <option value="" selected>Divisiones</option>
                                            </select>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="slctPuestoEm" class="form-label fw-bold">Puestos</label>
                                            <select name="slctPuestoEm" id="slctPuestoEm" class="form-select" onchange="getListadoPersonal()" required>
                                                <option value="" selected>Puestos</option>
                                            </select>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="slctSucursalEm" class="form-label fw-bold">Sucursales</label>
                                            <select name="slctSucursalEm" id="slctSucursalEm" class="form-select" onchange="getListadoPersonal()" required>
                                                <option value="" selected>Sucursales</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tabla empleados -->
                                <div class="col-12 col-lg-9 p-3 border rounded">
                                    <div class="table-responsive">
                                        <table class="table display text-center" id="tableEmpleadosEmTel">
                                            <thead>
                                                <tr>
                                                    <th>No Empleado</th>
                                                    <th>Nombre</th>
                                                    <th>Seleccionar</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>

                                <!-- Panel empleado seleccionado -->
                                <div class="col-12 col-lg-3 p-3 border rounded">
                                    <input type="hidden" id="EmpleadoSelectedEmTel" required>

                                    <div class="text-center mb-3">
                                        <h6 class="fw-bold">Empleado Seleccionado</h6>
                                        <div id="EmpleadoSeleccionadoEmTel" class="text-muted"></div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="txtCorreoEmTel" class="form-label fw-bold">Correo</label>
                                        <input id="txtCorreoEmTel" name="txtCorreoEmTel" type="email" class="form-control">
                                    </div>

                                    <div class="mb-3">
                                        <label for="txtTelEmTel" class="form-label fw-bold">Teléfono</label>
                                        <input id="txtTelEmTel" name="txtTelEmTel" type="text" maxlength="10" class="form-control" onkeypress="return onlynumber(event)">
                                    </div>

                                    <div class="mb-3">
                                        <label for="txtMCortaEmTel" class="form-label fw-bold">Marcación Corta</label>
                                        <input id="txtMCortaEmTel" name="txtMCortaEmTel" type="text" maxlength="4" class="form-control" onkeypress="return onlynumber(event)">
                                    </div>

                                    <div class="d-grid">
                                        <button class="btn btn-primary" role="button" onclick="addEmpleadosDirectorioCorreosTelefonos()">Agregar al Directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalAddEmpleadosDirectorioExtensiones" tabindex="-1" aria-labelledby="NameDirectorioExtension" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="NameDirectorioExtension"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <!-- Body -->
                        <div class="modal-body">
                            <input type="hidden" id="IdTipoExtensiones">

                            <div class="row g-3">
                                <!-- Filtros -->
                                <div class="col-12 p-3 border rounded">
                                    <div class="row g-3">
                                        <div class="col-12 col-md-4">
                                            <label for="slctDivisionEmExt" class="form-label fw-bold">Divisiones</label>
                                            <select name="slctDivisionEmExt" id="slctDivisionEmExt" class="form-select" onchange="getListadoPersonalExtensiones()" required>
                                                <option value="" selected>Divisiones</option>
                                            </select>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="slctPuestoEmExt" class="form-label fw-bold">Puestos</label>
                                            <select name="slctPuestoEmExt" id="slctPuestoEmExt" class="form-select" onchange="getListadoPersonalExtensiones()" required>
                                                <option value="" selected>Puestos</option>
                                            </select>
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="slctSucursalEmExt" class="form-label fw-bold">Sucursales</label>
                                            <select name="slctSucursalEmExt" id="slctSucursalEmExt" class="form-select" onchange="getListadoPersonalExtensiones()" required>
                                                <option value="" selected>Sucursales</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tabla empleados -->
                                <div class="col-12 col-lg-9 p-3 border rounded">
                                    <div class="table-responsive">
                                        <table class="table display text-center" id="tableEmpleadosExtensiones">
                                            <thead>
                                                <tr>
                                                    <th>No Empleado</th>
                                                    <th>Nombre</th>
                                                    <th>Seleccionar</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>

                                <!-- Panel empleado seleccionado -->
                                <div class="col-12 col-lg-3 p-3 border rounded">
                                    <input type="hidden" id="EmpleadoSelectedExtension" required>

                                    <div class="text-center mb-3">
                                        <h6 class="fw-bold">Empleado Seleccionado</h6>
                                        <div id="EmpleadoSeleccionadoDirExt" class="text-muted"></div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="txtExtension" class="form-label fw-bold">Extensión</label>
                                        <input id="txtExtension" name="txtExtension" type="text" maxlength="4" class="form-control" onkeypress="return onlynumber(event)">
                                    </div>

                                    <div class="d-grid">
                                        <button class="btn btn-primary" role="button" onclick="addEmpleadoDirectorioExtensiones()">Agregar al Directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div> -->

                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalAddSucursalesDirectorio" tabindex="-1" aria-labelledby="TitleModalSucursales" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="TitleModalSucursales">Sucursales Disponibles</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <!-- Body -->
                        <div class="modal-body">
                            <div class="row g-3">
                                <!-- Filtros / Inputs -->
                                <div class="col-12 p-3 border rounded">
                                    <div class="row g-3">
                                        <div class="col-12 col-md-4">
                                            <label for="slctListadoSucursalesDisp" class="form-label fw-bold">Sucursales</label>
                                            <select name="slctListadoSucursalesDisp" id="slctListadoSucursalesDisp" class="form-select" required></select>
                                        </div>
                                        <div class="col-12 col-md-8">
                                            <label for="txtDireccionSucursal" class="form-label fw-bold">Dirección</label>
                                            <input type="text" id="txtDireccionSucursal" class="form-control">
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="txtTelefono" class="form-label fw-bold">Teléfono</label>
                                            <input type="text" id="txtTelefono" class="form-control" maxlength="10" onkeypress="return onlynumber(event)">
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="txtNumRed" class="form-label fw-bold">NUM. RED</label>
                                            <input type="text" id="txtNumRed" class="form-control" maxlength="10" onkeypress="return onlynumber(event)">
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="txtCorreo" class="form-label fw-bold">E-mail</label>
                                            <input type="email" id="txtCorreo" class="form-control">
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="txtMarcacionCorta" class="form-label fw-bold">Marcación corta</label>
                                            <input type="text" id="txtMarcacionCorta" class="form-control" maxlength="4" onkeypress="return onlynumber(event)">
                                        </div>
                                        <div class="col-12 col-md-4">
                                            <label for="inpFechaApertura" class="form-label fw-bold">Fecha de apertura</label>
                                            <input type="date" id="inpFechaApertura" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="modal-footer">
                            <button class="btn btn-primary" id="btnAgregaSucursalDirectorio">Agregar</button>
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

    <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
    <script src="./neptune/js/pages/select2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/global.js" charset="utf-8"></script>
    <!-- index.js removido - solo es para index.php -->
    <script src="scripts/DirectorioAdm.js"></script>
    <script src="scripts/detallesEmpleadoLogeado.js"></script>

</body>

</html>