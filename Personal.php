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

  <?php include("neptune_styles.php"); ?>

  <link href="dist/css/pages/data-table.css" rel="stylesheet">
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <!-- <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div> -->
    <div id="Menu">
      <?php
      include("menus.php");
      ?>
    </div>
    <div class="app-container">
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
                      <div class="col-12 col-sm-6" style="display: none;">
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
                            <input type="text" class="form-control form-control-solid-bordered"
                              placeholder="Selecciona un archivo" readonly>
                          </div>

                          <!-- Botón Descargar Plantilla -->
                          <div class="col-auto">
                            <a href="https://klynet.mx/Archivos/Plantillas/PlantillaNuevoEmpleadoKlyns.xlsx"
                              download="PlantillaNuevoEmpleadoKlyns.xlsx" class="btn btn-success">
                              <span class="material-symbols-outlined">download</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- Columna derecha -->
                      <div class="col-12 col-sm-6" style="display: none;">
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
                            <input type="text" class="form-control form-control-solid-bordered"
                              placeholder="Selecciona un archivo" readonly>
                          </div>

                          <!-- Botón Descargar Plantilla -->
                          <div class="col-auto">
                            <a href="https://klynet.mx/Archivos/Plantillas/PlantillaAsignaVacacionesKlyns.xlsx"
                              download="PlantillaAsignaVacacionesKlyns.xlsx" class="btn btn-success w-100">
                              <span class="material-symbols-outlined">download</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <!-- Tabla Empleados -->
                      <div class="col-12" style="display: none;">
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
                      <div class="col-12 mt-3" style="display: none;">
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
                  </div>
                </div>

                <!-- Tabla fuera del card -->
                <div class="row mt-3">
                  <div class="col-12">
                    <div class="row mb-3">
                      <div class="col-12 col-lg-3 offset-lg-9 text-lg-end text-center">
                        <button type="button" id="downloadEsquemaSalud"
                          class="btn btn-success w-100 w-lg-auto d-flex align-items-center justify-content-center">
                          <span class="material-symbols-outlined me-2">ecg_heart</span>
                          <span>Descargar esquema de Salud</span>
                        </button>
                      </div>
                    </div>
                    <div id="TablePersonal"></div>
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
        <div class="modal fade" id="DetallesPrincipalEmpleado" tabindex="-1"
          aria-labelledby="DetallesPrincipalEmpleadoLabel" aria-hidden="true">
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
                      <h6>Nombre <span class="text-danger">*</span></h6>
                      <input type="text" id="inpNombreDet" class="form-control form-control-solid-bordered text-center"
                        required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>E-mail <span class="text-danger">*</span></h6>
                      <input type="email" id="inpEmailDet" class="form-control form-control-solid-bordered text-center"
                        required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>Password <span class="text-danger">*</span></h6>
                      <input type="password" id="inpPasswordDet"
                        class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>Celular <span class="text-danger">*</span></h6>
                      <input type="text" id="inpMovilDet" class="form-control form-control-solid-bordered text-center"
                        onkeypress="return onlynumber(event)" required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>RFC <span class="text-danger">*</span></h6>
                      <input type="text" id="inpRFCDet" class="form-control form-control-solid-bordered text-center"
                        required>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <h6>CURP <span class="text-danger">*</span></h6>
                      <input type="text" id="inpCURPDet" class="form-control form-control-solid-bordered text-center"
                        required>
                    </div>
                    <div class="col-12 text-center">
                      <h6>No Seguro <span class="text-danger">*</span></h6>
                      <input type="text" id="inpNoSeguroDet"
                        class="form-control form-control-solid-bordered text-center" required>
                    </div>
                    <div class="col-12 text-center">
                      <h6>Nivel <span class="text-danger">*</span></h6>
                      <input type="number" id="inpNivelDet" class="form-control form-control-solid-bordered text-center"
                        required>
                    </div>
                    <div class="col-12 text-center">
                      <button type="button" id="btnUpdatePrincipal" class="btn btn-success mt-3"
                        onclick="updateDatosPrincipalEmpleado()">Actualizar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal Más Detalles Empleado  -->
        <div class="modal fade" id="DetallesMasDetallesEmpleado" tabindex="-1"
          aria-labelledby="DetallesMasDetallesEmpleadoLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="tituloOtrosDetalles">Detalles adicionales del empleado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body">
                <form id="formUpdateMasDetalles" method="post">
                  <input type="hidden" name="EmpleadoMasDetalles" id="EmpleadoMasDetalles">
                  <input type="hidden" name="op" value="updateMasDetallesPersonal">

                  <div class="row g-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label">Email</label>
                      <input type="email" id="inpEmailMasDetalles" class="form-control form-control-solid-bordered" readonly>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Celular</label>
                      <input type="text" id="inpMovilMasDetalles" class="form-control form-control-solid-bordered" readonly>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">RFC</label>
                      <input type="text" id="inpRFCMasDetalles" class="form-control form-control-solid-bordered" readonly>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">CURP</label>
                      <input type="text" id="inpCURPMasDetalles" class="form-control form-control-solid-bordered" readonly>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">No. Seguro</label>
                      <input type="text" id="inpNoSeguroMasDetalles" class="form-control form-control-solid-bordered" readonly>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Nivel</label>
                      <input type="number" id="inpNivelMasDetalles" class="form-control form-control-solid-bordered" readonly>
                    </div>
                    <div class="col-12 col-md-5 text-center mt-3">
                      <label class="form-label">División actual</label>
                      <select id="slctDivisionActual" name="slctDivisionActual" class="form-select"
                        onchange="onchangeDivision()" required></select>
                    </div>

                    <div class="col-12 col-md-7 text-center mt-3">
                      <label class="form-label">Puesto actual</label>
                      <select id="slctPuestoActual" name="slctPuestoActual" class="form-select" required></select>
                    </div>

                    <div class="col-12 text-center mt-3">
                      <label class="form-label">Sucursal actual</label>
                      <select id="slctSucursalActual" name="slctSucursalActual" class="form-select" required></select>
                    </div>
                  </div>
                </form>

                <!-- Sección de Documentos -->
                <hr class="my-3">
                <h6 class="fw-bold mb-3" id="tituloSeccionDocumentos">
                  <span class="material-symbols-outlined align-middle me-1">description</span>
                  Documentación del Empleado
                </h6>
                <div id="listaDocumentosModal" class="list-group">
                  <div class="text-center text-muted small py-2">Cargando documentos...</div>
                </div>
              </div>

              <div class="modal-footer justify-content-center">
                <button type="button" name="button" id="btnUpdateMasDetalles"
                  class="btn btn-success">Actualizar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="ModalAsignarHijo" tabindex="-1" aria-labelledby="ModalAsignarHijoLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalAsignarHijoLabel">Jefe Asignado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body" style="padding: 30px;">
                <div class="container-fluid">
                  <div class="row g-3 justify-content-center">
                    <div class="col-12">
                      <label class="form-label fw-bold mb-3" style="font-size: 16px;">Selecciona el jefe
                        asignado:</label>
                      <select class="form-select form-select-solid-bordered" id="listadoJefesPosibles"
                        onchange="asignarJefeEmpleado(this.value)">
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
  <script type="text/x-jsrender" id="allActionsTemplate">
    ${allActionsSF(data)}
    </script>
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
  <script type="text/x-jsrender" id="documentacionTemplate">
    ${documentacionSF(data)}
    </script>
  <!-- neptune Javascripts -->
  <?php include("neptune_js.php"); ?>
  <!-- neptune Javascripts -->

  <script src="scripts/Personal.js?<?= time() ?>" charset="utf-8"></script>
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