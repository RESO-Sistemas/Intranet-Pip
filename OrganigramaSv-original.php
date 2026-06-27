<!DOCTYPE html>

<html>



<head>

    <?php include("estilos.php"); ?>
<title>La Esmeralda</title>
    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

    <title>PIP by Lugo</title>

    <link href="dist/css/style.css" rel="stylesheet">

    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

    <link href="https://cdn.syncfusion.com/ej2/20.3.56/material.css" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />



    <style media="screen">

    .boc-input {

      padding: 1vh !important;

    }

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

                    <h5 class="font-medium m-b-0">Organigrama</h5>

                    <div class="custom-breadcrumb ml-auto">

                        <a href="#!" class="breadcrumb">Home</a>

                        <a href="#!" class="breadcrumb">Inicio</a>

                    </div>

                </div>

            </div>

            <div class="row">

                <div class="col s5 offset-s7" style="position: absolute; z-index:99;">

                    <div class="row">

                        <div id="contenidoMensajes" style="position:fixed;margin-right:2vh"></div>

                    </div>

                </div>

            </div>

            <div class="container-fluid" style="z-index:5">

                <div class="card">

                    <div class="card-content">

                        <div class="row">

                          <div class="col s12 l12">

                            <div class="row">

                              <div class="col s4 l4">

                                <a href="ControlOrganigrama.php" class="waves-effect waves-light btn btn-round purple">Regresar</a>

                              </div>

                            </div>

                          </div>

                            <div class="col s12 l8"

                                style="padding:2vh; box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;">

                                <div class="row">

                                    <div class="col s12 l12" style="text-align:center">

                                        <h5>Filtros</h5>

                                    </div>

                                    <div class="col s6 l3">

                                        <label>Tipo</label>

                                        <select class="browser-default" id="slctTipoPrincipal">

                                            <option value="" selected disabled>Tipos de empleado</option>

                                            <option value="1">Principal</option>

                                            <option value="2">Empleado</option>

                                            <option value="3">Otros</option>

                                        </select>

                                    </div>

                                    <div class="col s6 l2" style="display:none;" id="divNivel">

                                        <label>Nivel</label>

                                        <select class="browser-default" id="slctNivelPrincipal"

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

                                    <div class="col s6 l2" style="display:none;" id="divDivicion">

                                        <label>Division</label>

                                        <select class="browser-default" id="slcDivicionPrincipal"

                                            onchange="onchangeDivision()"></select>

                                    </div>

                                    <div class="col s6 l2" style="display:none;" id="divPuesto">

                                        <label>Puesto</label>

                                        <select class="browser-default" id="slctPuestoPrincipal"

                                            onchange="getEmpleadosOrg()"></select>

                                    </div>



                                    <div class="col s6 l3" style="display:none;" id="divSucursal">

                                        <label>Sucursal</label>

                                        <select class="browser-default" id="slctSucursalPrincipal"

                                            onchange="getEmpleadosOrg()"></select>

                                    </div>



                                </div>

                            </div>

                            <div class="col s12 l4" style="padding:2vh;">

                                <div class="row">

                                    <div class="col s8 l8" style="display:none;" id="divEmpleado">

                                        <label>Empleado</label>

                                        <select class="browser-default js-example-basic-single" style="width: 100%;" id="slctEmpleadoPrincipal"></select>

                                    </div>

                                    <!-- <div class="col s4 l4">

                                        <label>Nivel</label>

                                        <select class="browser-default js-example-basic-single" style="width: 100%;" id="slctNivelP">

                                          <option value="">Listado de Niveles</option>

                                          <option value="0">0</option>

                                          <option value="1">1</option>

                                          <option value="2">2</option>

                                          <option value="3">3</option>

                                          <option value="4">4</option>

                                          <option value="5">5</option>

                                          <option value="6">6</option>

                                          <option value="7">7</option>

                                          <option value="8">8</option>

                                        </select>

                                    </div> -->

                                    <div class="col s12 l12" style="display:none;" id="divEmpleadoPadre">

                                        <label>Empleado Padre</label>

                                        <select class="browser-default js-example-basic-single" style="width: 100%;" id="slctEmpleadoPadrePrincipal"></select>

                                    </div>

                                    <div class="col s6 l6" style="display:none;" id="divOtros">

                                        <label>Descripción</label>

                                        <input type="text" id="txtOtros"></input>

                                    </div>

                                    <div class="col s12 l12" style="text-align:center;margin-top:1vh;">

                                        <button type="button"

                                            class="waves-effect waves-light btn btn-round blue btn-block"

                                            id="RegistraPrin">Agregar</button>

                                    </div>

                                </div>

                            </div>

                            <!-- <div class="col s12 l12" style="margin-top:3vh">

                                <div id="divOrg"></div>

                            </div> -->

                            <div class="col-lg-12 control-section">

                            <div id="container">

                                <div id="element"></div>

                            </div>

                          </div>

                        </div>

                    </div>

                </div>

            </div>



            <div class="chat-windows"></div>

        </div>

        <div id="modeallEditarElemento" class="modal">

            <div class="modal-content">

                <input type="hidden" id="idElementoPorEditar" required>

                <div class="row">

                    <div class="col s3 l3">

                        <label>Tipo</label>

                        <select class="browser-default" id="slctTipoModal" name="slctTipoModal" required>

                            <option value="" selected disabled>Tipos de empleado</option>

                            <option value="1">Principal</option>

                            <option value="2">Empleado</option>

                            <option value="3">Otros</option>

                        </select>

                    </div>

                    <div class="col s2 l2" style="display:none;" id="divNivelModal">

                        <label>Nivel</label>

                        <select class="browser-default" id="slctNivelModal" onchange="getEmpleadosOrgEditar()">

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

                    <div class="col s2 l2" style="display:none;" id="divDivicionModal">

                        <label>Divicion</label>

                        <select class="browser-default" id="slcDivicionModal"

                            onchange="onchangeDivisionEditar()"></select>

                    </div>

                    <div class="col s2 l2" style="display:none;" id="divPuestoModal">

                        <label>Puesto</label>

                        <select class="browser-default" id="slctPuestoModal"

                            onchange="getEmpleadosOrgEditar()"></select>

                    </div>



                    <div class="col s3 l3" style="display:none;" id="divSucursalModal">

                        <label>Sucursal</label>

                        <select class="browser-default" id="slctSucursalModal"

                            onchange="getEmpleadosOrgEditar()"></select>

                    </div>

                    <div class="col s12 l12" style="padding:2vh;">

                      <div class="row">

                        <div class="col s4 l4" style="display:none;" id="divEmpleadoModal">

                            <label>Empleado</label>

                            <select class="browser-default empleadosUpdate" style="width: 100%;" id="slctEmpleadoModal" name="slctEmpleadoModal"

                                required></select>

                        </div>

                        <div class="col s8 l8" style="display:none;" id="divOtrosModal">

                            <label>Descripción</label>

                            <input type="text" id="txtOtrosModal" name="txtOtrosModal" required></input>

                        </div>

                        <!-- <div class="col s4 l4">

                            <label>Nivel Seleccionado</label>

                            <select class="browser-default lvlSelectedUpdate" style="width: 100%;" id="slctNivelUpdate">

                              <option value="">Listado de Niveles</option>

                              <option value="0">0</option>

                              <option value="1">1</option>

                              <option value="2">2</option>

                              <option value="3">3</option>

                              <option value="4">4</option>

                              <option value="5">5</option>

                              <option value="6">6</option>

                              <option value="7">7</option>

                              <option value="8">8</option>

                            </select>

                        </div> -->

                        <div class="col s4 l4" style="display:none;" id="divEmpleadoPadreModal">

                            <label>Empleado Padre</label>

                            <select class="browser-default emPadreUpdate" style="width: 100%;" id="slctEmpleadoPadreModal" name="slctEmpleadoPadreModal"

                                required></select>

                        </div>

                      </div>

                    </div>

                    <div class="col s12 l12">

                      <div class="row">

                        <div class="col s4 l4 offset-l4" style="text-align:center;">

                            <br>

                            <button type="button" class="waves-effect waves-light btn btn-round blue btn-block"

                                id="RegistraEditarModal" onclick="EditarEmpleadoOrganigrama()" style="text-align:center">Guardar</button>

                        </div>

                      </div>

                    </div>

                </div>

            </div>

            <div class="modal-footer">

                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>

            </div>

        </div>



        <?php include("scripts.php"); ?>

        <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"

            integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="

            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"

            integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="

            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

        <script src="assets/libs/toastr/build/toastr.min.js"></script>

        <script src="assets/extra-libs/toastr/toastr-init.js"></script>

        <script src="scripts/orgchart.js" charset="utf-8"></script>

        <script src="scripts/OrganigramaSv-original.js" charset="utf-8"></script>

</body>



</html>
