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
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="componentes/detallesEmpleadoLogeado.js"></script>
    <style>

        .btnAddDirectorioTel {
        align-items: center;
        background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
        border: 0;
        border-radius: 10px;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        font-family: "Codec cold",sans-serif;
        font-size: 16px;
        font-weight: 700;
        height: 54px;
        justify-content: center;
        letter-spacing: .4px;
        line-height: 1;
        max-width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 3px;
        text-decoration: none;
        text-transform: uppercase;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        }

        .btnAddDirectorioTel:active {
        outline: 0;
        }

        .btnAddDirectorioTel:hover {
        outline: 0;
        }

        .btnAddDirectorioTel span {
        transition: all 200ms;
        }

        .btnAddDirectorioTel:hover span {
        transform: scale(.9);
        opacity: .75;
        }

        @media screen and (max-width: 991px) {
        .btnAddDirectorioTel {
            font-size: 15px;
            height: 50px;
        }

        .btnAddDirectorioTel span {
            line-height: 50px;
        }
        }

        .button-17 {
        align-items: center;
        appearance: none;
        background-color: #fff;
        border-radius: 24px;
        border-style: none;
        box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
        box-sizing: border-box;
        color: #3c4043;
        cursor: pointer;
        display: inline-flex;
        fill: currentcolor;
        font-family: "Google Sans",Roboto,Arial,sans-serif;
        font-size: 14px;
        font-weight: 500;
        height: 48px;
        justify-content: center;
        letter-spacing: .25px;
        line-height: normal;
        max-width: 100%;
        overflow: visible;
        padding: 2px 24px;
        position: relative;
        text-align: center;
        text-transform: none;
        transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: auto;
        will-change: transform,opacity;
        z-index: 0;
        }

        .button-17:hover {
        background: #F6F9FE;
        color: #174ea6;
        }

        .button-17:active {
        box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
        outline: none;
        }

        .button-17:focus {
        outline: none;
        border: 2px solid #4285f4;
        }

        .button-17:not(:disabled) {
        box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
        }

        .button-17:not(:disabled):hover {
        box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
        }

        .button-17:not(:disabled):focus {
        box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
        }

        .button-17:not(:disabled):active {
        box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
        }

        .button-17:disabled {
        box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
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
                  <h5 class="font-medium m-b-0">Klyns Directorio</h5>
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
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col s12">
                            <div class="card">
                                <div class="row">
                                    <div class="col s12">
                                        <ul class="tabs">
                                            <li class="tab col s3"><a class="active" href="#correosTelefonos" >Correos-Telefonos</a></li>
                                            <li class="tab col s3"><a href="#extensiones" >DIRECTORIO DE EXTENSIONES</a></li>
                                            <li class="tab col s3"><a href="#colabora" style="color:#df040a;">DIRECTORIO DE SUCURSALES KLYNS </a></li>
                                        </ul>
                                    </div>
                                    <div id="correosTelefonos" class="col s12">
                                      <div class="card-content">
                                            <div id="contenidoDirectorioEmailTelefonos"></div>
                                      </div>
                                    </div>
                                    <div id="extensiones" class="col s12">
                                        <div class="card-content">
                                            <div class="row">
                                                <div class="col s12 l4">
                                                    <h6>Listado de Tipos de Extensiones</h6>
                                                    <select class="js-example-basic-multiple browser-default" name="tiposExtension[]" id="tiposExtension" multiple="multiple"  style="width:100%" onchange="loadDirectorioExtensiones()">
                                                    </select>
                                                </div>
                                            </div>
                                            <div id="contenidoDirectorioExtensiones" style="margin-top:2vh"></div>
                                        </div>
                                    </div>
                                    <div id="colabora" class="col s12">
                                        <div class="card-content">
                                            <div class="row">
                                                <div class="col s12 l1 offset-l11" style="text-align:center">
                                                    <h6><b>Agregar al Directorio</b></h6>
                                                   <button type="button" class="btnAddDirectorioTel" align="right" style="width:100%" id="btnOpenModalSucursal"><i class="fal fa-user-plus"></i></button>
                                                </div>
                                            </div>
                                            <div class="table-responsive">
                                                <table id="tableDirectorioSucursal" class="table striped m-b-10 display centered">
                                                    <thead style="background: rgb(255,0,0);
                                                                    background: linear-gradient(90deg, rgba(255,0,0,0.5018382352941176) 0%, rgba(196,0,0,0.5158438375350141) 30%); height:5vh !important; color:white">
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
        <div id="modalAddEmpleadosDirectorioEmTel" class="modal">
            <div class="modal-content">
                <h4 id="NameDirectorio"></h4>
                <input type="hidden" id="IdTipoEmTel">
                <div class="row">
                    <div class="col s12 l12" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="row">
                             <div class="input-field col s3 l3">
                                    <select name="slctDivisionEm" id="slctDivisionEm" class="browser-default" onchange="getListadoPersonal()" required>
                                          <option value="" selected >Divisiones</option>
                                    </select>
                              </div>
                              <div class="input-field col s3 l3">
                                    <select name="slctPuestoEm" id="slctPuestoEm" class="browser-default" onchange="getListadoPersonal()" required>
                                          <option value="" selected>Puestos</option>
                                    </select>
                              </div>
                              <div class="input-field col s3 l3">
                                    <select name="slctSucursalEm" id="slctSucursalEm" class="browser-default" onchange="getListadoPersonal()" required>
                                          <option value="" selected>Sucursales</option>
                                    </select>
                              </div>
                        </div>
                    </div>
                    <div class="col s9 l9" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; margin-top:1vh">
                        <div class="row" style="padding:1vh">
                            <div class="table-responsive">
                                <table class="table striped m-b-10 display centered" id="tableEmpleadosEmTel">
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
                    </div>
                    <div class="col s3 l3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; margin-top:1vh">
                        <div class="row">
                            <input type="hidden" id="EmpleadoSelectedEmTel" required>
                            <div class="col s12 l12" style="text-align:center; margin-top:2vh">
                                <h6><b>Empleado Seleccionado</b></h6>
                            </div>
                            <div class="col s12 l12" style="text-align:center">
                                <h6 id="EmpleadoSeleccionadoEmTel"></h6>
                            </div>
                            <div class="input-field col s12 l12">
                                <input id="txtCorreoEmTel"  name="txtCorreoEmTel" type="email">
                                <label for="txtCorreoEmTel">Correo.</label>
                            </div>
                            <div class="input-field col s12 l12">
                                <input id="txtTelEmTel"  name="txtTelEmTel" type="text" maxlength="10" onkeypress="return onlynumber(event)">
                                <label for="txtTelEmTel">Teléfono.</label>
                            </div>
                            <div class="input-field col s12 l12">
                                <input id="txtMCortaEmTel"  name="txtMCortaEmTel" type="text" maxlength="4" onkeypress="return onlynumber(event)">
                                <label for="txtMCortaEmTel">Marcación Corta.</label>
                            </div>
                            <div class="input-field col s12 l12">
                                <button class="AgregarBtnBlue" role="button" onclick="addEmpleadosDirectorioCorreosTelefonos()">Agregar al Directorio</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>
        </div>
        <div id="modalAddEmpleadosDirectorioExtensiones" class="modal">
            <div class="modal-content">
                <h4 id="NameDirectorioExtension"></h4>
                <input type="hidden" id="IdTipoExtensiones">
                <div class="row">
                    <div class="col s12 l12" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;">
                        <div class="row">
                             <div class="input-field col s3 l3">
                                    <select name="slctDivisionEmExt" id="slctDivisionEmExt" class="browser-default" onchange="getListadoPersonalExtensiones()" required>
                                          <option value="" selected >Divisiones</option>
                                    </select>
                              </div>
                              <div class="input-field col s3 l3">
                                    <select name="slctPuestoEmExt" id="slctPuestoEmExt" class="browser-default" onchange="getListadoPersonalExtensiones()" required>
                                          <option value="" selected>Puestos</option>
                                    </select>
                              </div>
                              <div class="input-field col s3 l3">
                                    <select name="slctSucursalEmExt" id="slctSucursalEmExt" class="browser-default" onchange="getListadoPersonalExtensiones()" required>
                                          <option value="" selected>Sucursales</option>
                                    </select>
                              </div>
                        </div>
                    </div>
                    <div class="col s12 l12">
                        <div class="row">
                            <div class="col s9 l9" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; margin-top:1vh;">
                                <div class="row" style="padding:1vh">
                                    <div class="table-responsive">
                                        <table class="table striped m-b-10 display centered" id="tableEmpleadosExtensiones">
                                            <thead>
                                                <tr>
                                                    <th>No Empleado</th>
                                                    <th>Nombre</th>
                                                    <th>SELECCIONAR</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col s3 l3" style="box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; margin-top:1vh">
                                <div class="row">
                                    <input type="hidden" id="EmpleadoSelectedExtension" required>
                                    <div class="col s12 l12" style="text-align:center; margin-top:2vh">
                                        <h6><b>Empleado Seleccionado</b></h6>
                                    </div>
                                    <div class="col s12 l12" style="text-align:center">
                                        <h6 id="EmpleadoSeleccionadoDirExt"></h6>
                                    </div>
                                    <div class="input-field col s12 l12">
                                        <input id="txtExtension"  name="txtExtension" type="text" maxlength="4" onkeypress="return onlynumber(event)">
                                        <label for="txtExtension">Extension</label>
                                    </div>
                                    <div class="input-field col s12 l12">
                                        <button class="AgregarBtnBlue" role="button" onclick="addEmpleadoDirectorioExtensiones()">Agregar al Directorio</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>
        </div>
        <div id="modalAddSucursalesDirectorio" class="modal">
            <div class="modal-content">
                <h4>Sucursales Disponibles</h4>
                <div class="row">
                  <div class="col s12 l4" style="margin-top:2vh">
                <select name="slctListadoSucursalesDisp" id="slctListadoSucursalesDisp" class="browser-default"  required></select>
                </div>
                <div class="input-field col s12 l8">
                    <input type="text" id="txtDireccionSucursal">
                    <label for="txtDireccionSucursal">Dirección</label>
                </div>
                <div class="input-field col s12 l4">
                    <input type="text" id="txtTelefono" maxlength="10" onkeypress="return onlynumber(event)">
                    <label for="txtTelefono">Teléfono</label>
                </div>
                <div class="input-field col s12 l4">
                    <input type="text" id="txtNumRed" maxlength="10" onkeypress="return onlynumber(event)">
                    <label for="txtNumRed">NUM. RED</label>
                </div>
                <div class="input-field col s12 l4">
                    <input type="email" id="txtCorreo">
                    <label for="txtCorreo">E-mail</label>
                </div>
                <div class="input-field col s12 l4">
                    <input type="text" id="txtMarcacionCorta" maxlength="4" onkeypress="return onlynumber(event)">
                    <label for="txtMarcacionCorta">Marcación corta.</label>
                </div>
                <div class="input-field col s12 l4">
                    <input type="date" id="inpFechaApertura" >
                    <label for="inpFechaApertura">Fecha de apertura.</label>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button href="#!" class=" waves-effect waves-green btn-flat" id="btnAgregaSucursalDirectorio">Agregar</button>
            </div>
        </div>
    </div>
    <?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <script src="scripts/index-original.js"></script>
    <script src="scripts/DirectorioAdm-original.js"></script>
    <script src="scripts/detallesEmpleadoLogeado.js"></script>

</body>

</html>
