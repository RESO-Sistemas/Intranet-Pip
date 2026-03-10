<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP Intranet</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>

  <!-- Styles neptune -->
  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <link href="dist/css/pages/data-table.css" rel="stylesheet">
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

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
                  <h1>Personal</h1>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <!-- SUBIR Y DESCARGAR-->
                    <div class="row">
                      <!-- Columna izquierda -->
                      <div class="col-12 col-sm-6">
                        <label class="form-label">Nuevos Empleados Excel</label>
                        <div class="row g-2 align-items-center flex-nowrap flex-sm-wrap">
                          <!-- Botón File -->
                          <div class="col-auto">
                            <label for="excel-input" class="btn btn-primary">
                              <span class="material-symbols-outlined">upload</span>
                            </label>
                            <input type="file" class="d-none" id="excel-input" accept=".xlsx">
                          </div>

                          <!-- Input de texto -->
                          <div class="col flex-grow-1">
                            <input type="text" class="form-control form-control-solid-bordered" placeholder="Selecciona un archivo" readonly>
                          </div>

                          <!-- Botón Descargar Plantilla -->
                          <div class="col-auto">
                            <a href="https://klynet.mx/Archivos/Plantillas/PlantillaNuevoEmpleadoKlyns.xlsx"
                              download="PlantillaNuevoEmpleadoKlyns.xlsx"
                              class="btn btn-success">
                              <span class="material-symbols-outlined">download</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- Columna derecha -->
                      <div class="col-12 col-sm-6">
                        <label class="form-label">Asignar Vacaciones Excel</label>
                        <div class="row g-2 align-items-center flex-nowrap flex-sm-wrap">
                          <!-- Botón File -->
                          <div class="col-auto">
                            <label for="excel-inputVacaciones" class="btn btn-primary w-100">
                              <span class="material-symbols-outlined">upload</span>
                            </label>
                            <input type="file" class="d-none" id="excel-inputVacaciones" accept=".xlsx">
                          </div>

                          <!-- Input de texto -->
                          <div class="col flex-grow-1">
                            <input type="text" class="form-control form-control-solid-bordered" placeholder="Selecciona un archivo" readonly>
                          </div>

                          <!-- Botón Descargar Plantilla -->
                          <div class="col-auto">
                            <a href="https://klynet.mx/Archivos/Plantillas/PlantillaAsignaVacacionesKlyns.xlsx"
                              download="PlantillaAsignaVacacionesKlyns.xlsx"
                              class="btn btn-success w-100">
                              <span class="material-symbols-outlined">download</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <!-- Tabla Empleados -->
                      <div class="col-12">
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

                      <!-- Tabla Vacaciones -->
                      <div class="col-12 mt-3">
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
                    <div class="row g-3">
                      <!-- Puestos -->
                      <div class="col-12 col-md-4">
                        <label for="slctPuestos" class="form-label">Puestos:</label>
                        <select id="slctPuestos" class="form-select" onchange="getListadoPersonal()">
                          <option value="">Listado de Puestos</option>
                        </select>
                      </div>

                      <!-- División -->
                      <div class="col-12 col-md-4">
                        <label for="slctDivision" class="form-label">División:</label>
                        <select id="slctDivision" class="form-select" onchange="getListadoPersonal()">
                          <option value="">Listado de Divisiones</option>
                        </select>
                      </div>

                      <!-- Sucursal -->
                      <div class="col-12 col-md-4">
                        <label for="slctSucursal" class="form-label">Sucursal:</label>
                        <select id="slctSucursal" class="form-select" onchange="getListadoPersonal()">
                          <option value="">Listado de Sucursales</option>
                        </select>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col-12">
                        <div class="row mb-3">
                          <div class="col-12 col-lg-3 offset-lg-9 text-lg-end text-center">
                            <button type="button" id="downloadEsquemaSalud" class="btn btn-success w-100 w-lg-auto d-flex align-items-center justify-content-center">
                              <span class="material-symbols-outlined me-2">
                                ecg_heart
                              </span>
                              <span>Descargar esquema de Salud</span>
                            </button>
                          </div>
                        </div>
                        <div id="TablePersonal" class="table-responsive">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive" style="display:none">
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
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="DetallesPrincipalEmpleado" tabindex="-1" aria-labelledby="DetallesPrincipalEmpleadoLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="TituloDetallePrincipal">Detalle del Empleado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" id="empleadoSeleccionado" required>
                <div class="container-fluid">
                  <div class="row g-3 justify-content-center">
                    <div class="col-12 col-md-6 text-center">
                      <h6>Nombre</h6>
                      <input type="text" id="inpNombreDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>E-mail</h6>
                      <input type="email" id="inpEmailDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>Password</h6>
                      <input type="password" id="inpPasswordDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>Celular</h6>
                      <input type="text" id="inpMovilDet" class="form-control form-control-solid-bordered text-center" onkeypress="return onlynumber(event)" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>RFC</h6>
                      <input type="text" id="inpRFCDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>CURP</h6>
                      <input type="text" id="inpCURPDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 text-center">
                      <h6>No Seguro</h6>
                      <input type="text" id="inpNoSeguroDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 text-center">
                      <h6>Nivel</h6>
                      <input type="number" id="inpNivelDet" class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 text-center">
                      <button type="button" id="btnUpdatePrincipal" class="btn btn-success mt-3" onclick="updateDatosPrincipalEmpleado()">Actualizar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal Más Detalles Empleado  -->
        <div class="modal fade" id="DetallesMasDetallesEmpleado" tabindex="-1" aria-labelledby="DetallesMasDetallesEmpleadoLabel" aria-hidden="true" style="overflow: visible !important;">
          <div class="modal-dialog modal-dialog-centered modal-lg" style="overflow: visible !important;">
            <div class="modal-content" style="overflow: visible !important;">
              <div class="modal-header">
                <h5 class="modal-title" id="tituloOtrosDetalles">Detalles adicionales del empleado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body" style="overflow: visible !important;">
                <form id="formUpdateMasDetalles" method="post">
                  <input type="hidden" name="EmpleadoMasDetalles" id="EmpleadoMasDetalles">
                  <input type="hidden" name="op" value="updateMasDetallesPersonal">

                  <div class="row g-3">
                    <div class="col-12 col-md-5 text-center">
                      <label class="form-label">División actual</label>
                      <select id="slctDivisionActual" name="slctDivisionActual" class="form-select" onchange="onchangeDivision()" required></select>
                    </div>

                    <div class="col-12 col-md-7 text-center">
                      <label class="form-label">Puesto actual</label>
                      <select id="slctPuestoActual" name="slctPuestoActual" class="form-select" required></select>
                    </div>

                    <div class="col-12 text-center mt-3">
                      <label class="form-label">Sucursal actual</label>
                      <select id="slctSucursalActual" name="slctSucursalActual" class="form-select" required></select>
                    </div>
                  </div>
                </form>
              </div>

              <div class="modal-footer justify-content-center">
                <button type="button" name="button" id="btnUpdateMasDetalles" class="btn btn-success" onclick="updateMasDetallesEmpleado()">Actualizar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="ModalAsignarHijo" tabindex="-1" aria-labelledby="ModalAsignarHijoLabel" aria-hidden="true" style="overflow: visible !important;">
          <div class="modal-dialog modal-lg" style="overflow: visible !important;">
            <div class="modal-content" style="overflow: visible !important;">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalAsignarHijoLabel">Jefe Asignado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body" style="overflow: visible !important; padding: 30px;">
                <div class="container-fluid">
                  <div class="row g-3 justify-content-center">
                    <div class="col-12">
                      <label class="form-label fw-bold mb-3" style="font-size: 16px;">Selecciona el jefe asignado:</label>
                      <select class="form-select form-select-solid-bordered" id="listadoJefesPosibles" onchange="asignarJefeEmpleado(this.value)">
                        <!-- Opciones del select se llenarán dinámicamente -->
                      </select>
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
  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js" integrity="sha512-Dz4zO7p6MrF+VcOD6PUbA08hK1rv0hDv/wGuxSUjImaUYxRyK2gLC6eQWVqyDN9IM1X/kUA8zkykJS/gEVOd3w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment-with-locales.min.js" integrity="sha512-lQR9pLx+zmyQV/T99+vuBITpGAYXR+nMAZXVjtdEgnC3jodfmtjhRTuAnQ7jHjlWgUL0KE+SORFWdWEp1BYLFw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/Personal.js" charset="utf-8"></script>
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