<!DOCTYPE html>
<html>

<head>
  <!-- include("AutorizaPagina.php"); -->
  <?php include("estilos.php"); ?>
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
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
    <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
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
                    <h5 class="font-medium m-b-0">Personal</h5>
                    <div class="custom-breadcrumb ml-auto">
                        <a href="#!" class="breadcrumb">Home</a>
                        <a href="#!" class="breadcrumb">Inicio</a>
                    </div>
                </div>
            </div>
            <div class="row">
               <div class="col s10 offset-s1 l5 offset-l7" style="position: absolute; z-index:99;">
                <div class="row">
                 <div id="contenidoMensajes" style="position:fixed;margin-right:2vh"></div>
                </div>
               </div>
              </div>
              <div class="container-fluid" style="z-index:5">
                <div class="row">
                  <div class="col s12 l12">
                    <div class="card">
                      <div class="card-content">
                        <div class="row">
                          <div class="col s12 l12">
                            <div class="row">
                              <div class="col s12 l6">
                                <h5>Nuevos Empleados Excel</h6>
                                <div class="row">
                                  <div class="file-field input-fieldc col s8 l8">
                                    <div class="btn blue darken-1">
                                        <span>File</span>
                                        <input type="file" id="excel-input" accept=".xlsx">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text">
                                    </div>
                                  </div>
                                  <div class="col s4 l4">
                                    <a href="https://klynet.mx/Archivos/Plantillas/PlantillaNuevoEmpleadoKlyns.xlsx" download="PlantillaNuevoEmpleadoKlyns.xlsx" class="waves-effect waves-light btn green">Descargar Plantilla</a>
                                  </div>
                                </div>
                              </div>
                              <div class="col s12 l6">
                                <h5>Asignación Vacaciones Excel</h6>
                                <div class="row">
                                  <div class="file-field input-fieldc col s8 l8">
                                    <div class="btn blue darken-1">
                                        <span>File</span>
                                        <input type="file" id="excel-inputVacaciones" accept=".xlsx">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text">
                                    </div>
                                  </div>
                                  <div class="col s4 l4">
                                    <a href="https://klynet.mx/Archivos/Plantillas/PlantillaAsignaVacacionesKlyns.xlsx" download="PlantillaAsignaVacacionesKlyns.xlsx" class="waves-effect waves-light btn green">Descargar Plantilla</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col s12 l12">
                                <div class="table-responsive">
                                  <table class="table table-bordered" id="contenidoExcel">
                                    <thead>
                                      <tr></tr>
                                    </thead>
                                    <tbody id="contenidoExcelBody">
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div class="col s12 l12">
                                <div class="table-responsive">
                                  <table class="table table-bordered" id="contenidoExcelVacaciones">
                                    <thead>
                                      <tr></tr>
                                    </thead>
                                    <tbody id="contenidoExcelVBody">
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="input-field col s4 l4">
                            <label>Puestos</label><br><br>
                            <select id="slctPuestos" class="browser-default" onchange="getListadoPersonal()">
                              <option value="">Listado de Puestos</option>
                            </select>
                          </div>
                          <div class="input-field col s4 l4">
                            <label>Division</label><br><br>
                            <select id="slctDivision" class="browser-default" onchange="getListadoPersonal()">
                              <option value="">Listado de Divisiones</option>
                            </select>
                          </div>
                          <div class="input-field col s4 l4">
                            <label>Sucursal</label><br><br>
                            <select id="slctSucursal" class="browser-default" onchange="getListadoPersonal()">
                              <option value="">Listado de Sucursales</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 l12">
                      <div class="card">
                        <div class="card-content">
                          <div class="row">
                            <div class="col s12  l3 offset-l9">
                              <button type="button" id="downloadEsquemaSalud" class="btn-actionGreen" style="margin-right:2vh"><i class="fa-solid fa-user-nurse"></i> Descargar esquema de Salud</button>
                              <hr>
                            </div>
                          </div>
                          <div id="TablePersonal"></div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            <div class="table-responsive" style="display: ">
              <table id="TableEsquemaSalud">
                <thead style="color:white; background-color:black">
                  <tr>
                    <th>Empleado</th>
                    <th>Alergia o enfermedad crónica</th>
                    <th>Peso (Kg)</th>
                    <th>Complexión</th>
                    <th>Talla</th>
                    <th>Fr. cardíaca</th>
                    <th>Fr. respiratoria</th>
                    <th>Tensión arterial</th>
                    <th>Temperatura</th>
                    <th>Grupo Sanguíneo</th>
                    <th>Factor Rh</th>
                    <th>Cuenta con cartilla de Vacunación</th>
                    <th>Tiene el esquema completo</th>
                    <th>¿Cuál falta?</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div style="display:none;">
              <div id="DetallesPrincipalEmpleado">
                <div class="row">
                  <input type="hidden" id="empleadoSeleccionado" required>
                  <div class="col s12 l12" style="text-align:center;">
                    <h5 id="TituloDetallePrincipal"></h5>
                  </div>
                  <div class="col s12 l12" style="padding:3vh">
                    <div class="row">
                      <div class="col s12 l6" style="text-align:center;">
                        <h6>Nombre</h6>
                        <input type="text" id="inpNombreDet" style="text-align:center" required></input>
                      </div>
                      <div class="col s12 l6" style="text-align:center;">
                        <h6>E-mail</h6>
                        <input type="email" id="inpEmailDet" style="text-align:center" required></input>
                        <br><br>
                      </div>
                      <div class="col s12 l6" style="text-align:center;">
                        <h6>Password</h6>
                        <input type="password" id="inpPasswordDet" style="text-align:center" required></input>
                      </div>
                      <div class="col s12 l6" style="text-align:center;">
                        <h6>Celular</h6>
                        <input type="text" id="inpMovilDet" style="text-align:center" onkeypress="return onlynumber(event)" required></input>
                        <br><br>
                      </div>
                      <div class="col s12 l6" style="text-align:center;">
                        <h6>RFC</h6>
                        <input type="text" id="inpRFCDet" style="text-align:center" required></input>
                      </div>
                      <div class="col s12 l6" style="text-align:center;">
                        <h6>CURP</h6>
                        <input type="text" id="inpCURPDet" style="text-align:center" required></input>
                        <br><br>
                      </div>
                      <div class="col s12 l12" style="text-align:center;">
                        <h6>No Seguro</h6>
                        <input type="text" id="inpNoSeguroDet" style="text-align:center" required></input>
                      </div>
                      <div class="col s12 l12" style="text-align:center;">
                        <h6>Nivel</h6>
                        <input type="number" id="inpNivelDet" style="text-align:center" required></input>
                      </div>
                    </div>
                  </div>
                  <div class="col s12 l4 offset-l4" style="text-align:center">
                    <button type="button" name="button" id="btnUpdatePrincipal" class="btnAceptarVerde" onclick="updateDatosPrincipalEmpleado()">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:none">
              <div id="ContenidoMasDetallesEmpleado" >
                <div class="row">
                  <div class="col s12 l12" style="text-align:center;">
                    <h4 id="tituloOtrosDetalles"></h4>
                  </div>
                  <div class="col s12 l12" style="padding:2vh">
                    <div class="row">
                      <form id="formUpdateMasDetalles" method="post">
                        <input type="hidden" name="EmpleadoMasDetalles" id="EmpleadoMasDetalles">
                        <input type="hidden" name="op" value="updateMasDetallesPersonal">
                        <div class="col s12 l5" style="text-align:center;">
                          <h5>División actual.</h5>
                          <select id="slctDivisionActual" name="slctDivisionActual" class="browser-default" onchange="onchangeDivision()" required></select>
                        </div>
                        <div class="col s12 l7" style="text-align:center;">
                          <h5>Puesto actual.</h5>
                          <select id="slctPuestoActual" name="slctPuestoActual" class="browser-default" onchange="" required></select>
                        </div>
                        <div class="col s12 l12" style="text-align:center;margin-top:2vh" >
                          <h5>Sucursal actual.</h5>
                          <select id="slctSucursalActual" name="slctSucursalActual" class="browser-default" onchange="" required></select>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col s12 l4 offset-l4" style="text-align:center">
                    <button type="button" name="button" id="btnUpdateMasDetalles" class="btnAceptarVerde">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>

        </div>
    </div>
    <div style="display:none;">
      <div id="ModalAsignarHijo">
          <div class="row">
            <div class="col s12 l12" style="text-align:center">
                <h3>Jefe Asignado</h3>
            </div>
            <div class="input-field col s12 l12" >
                <select name="" id="listadoJefesPosibles" style="max-height:40vh" onchange="asignarJefeEmpleado(this.value)"></select>
            </div>
          </div>
        </div>
    </div>
    <script type="text/x-jsrender" id="updateDataTemplate">
      ${updateDataSF(data)}
    </script>
    <script type="text/x-jsrender" id="updateBossTemplate">
      ${updateBossSF(data)}
    </script>
    <script type="text/x-jsrender" id="moreDetailsTemplate">
      ${moreDetailsSF(data)}
    </script>
    <script type="text/x-jsrender" id="disabledTemplate">
      ${disabledSF(data)}
    </script>
    <?php include("scripts-original.php"); ?>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js" integrity="sha512-Dz4zO7p6MrF+VcOD6PUbA08hK1rv0hDv/wGuxSUjImaUYxRyK2gLC6eQWVqyDN9IM1X/kUA8zkykJS/gEVOd3w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment-with-locales.min.js" integrity="sha512-lQR9pLx+zmyQV/T99+vuBITpGAYXR+nMAZXVjtdEgnC3jodfmtjhRTuAnQ7jHjlWgUL0KE+SORFWdWEp1BYLFw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <script src="scripts/Personal-original.js" charset="utf-8"></script>
    <script type="text/javascript">
      function onlynumber(e) {
           tecla = (document.all) ? e.keyCode : e.which;
           if (tecla == 8) {
             return true;
           }
           patron = /[-0-9]/;
           tecla_final = String.fromCharCode(tecla);
           return patron.test(tecla_final);
         }
    </script>
</body>

</html>
