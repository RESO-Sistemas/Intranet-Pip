<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>La Esmeralda</title>

  <?php include("neptune_styles.php"); ?>
  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>

    <div class="app-container">
      <?php include("includes/_Header.php"); ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container-fluid">

            <!-- Notificaciones flotantes -->
            <div class="row">
              <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                <div id="contenidoMensajes" style="margin-right:2vh"></div>
                <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
              </div>
            </div>

            <!-- Encabezado -->
            <div class="row">
              <div class="col">
                <div class="page-description page-description-tabbed">
                  <h1>Directorio Telefónico</h1>
                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                        type="button" role="tab">Correos-Teléfonos</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button"
                        role="tab">Directorio de Extensiones</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button"
                        role="tab">Directorio de Sucursales</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Contenido tabs -->
            <div class="row">
              <div class="col">
                <div class="tab-content" id="myTabContent">

                  <!-- Tab 1: Correos-Teléfonos -->
                  <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                    <div id="contenidoDirectorioEmailTelefonos"></div>
                  </div>

                  <!-- Tab 2: Extensiones -->
                  <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                    <div class="row mb-3">
                      <div class="col">
                        <label class="form-label fw-bold">Filtrar por tipo de extensión:</label>
                        <select class="form-select" name="tiposExtension[]" id="tiposExtension" multiple="multiple"
                          style="width:100%" onchange="loadDirectorioExtensiones()"></select>
                      </div>
                    </div>
                    <div id="contenidoDirectorioExtensiones"></div>
                  </div>

                  <!-- Tab 3: Sucursales -->
                  <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                    <div class="row mb-3">
                      <div class="col text-end">
                        <button type="button" class="btn btn-success" id="btnOpenModalSucursal">
                          <span class="material-symbols-outlined" style="vertical-align:middle;">add</span> Nueva
                          Sucursal
                        </button>
                      </div>
                    </div>
                    <div id="tableDirectorioSucursal"></div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ─── Modales ──────────────────────────────────────────────────────── -->

      <!-- Modal: Agregar empleado a Correos-Teléfonos -->
      <div class="modal fade" id="modalAddEmpleadosDirectorioEmTel" tabindex="-1" aria-labelledby="NameDirectorio"
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="NameDirectorio"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="IdTipoEmTel">
              <div class="row g-3">
                <!-- Filtros -->
                <div class="col-12 p-3 border rounded">
                  <div class="row g-3">
                    <div class="col-12 col-md-4">
                      <label for="slctDivisionEm" class="form-label fw-bold">Divisiones</label>
                      <select id="slctDivisionEm" class="form-select" onchange="getListadoPersonal()">
                        <option value="">Divisiones</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4">
                      <label for="slctPuestoEm" class="form-label fw-bold">Puestos</label>
                      <select id="slctPuestoEm" class="form-select" onchange="getListadoPersonal()">
                        <option value="">Puestos</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4">
                      <label for="slctSucursalEm" class="form-label fw-bold">Sucursales</label>
                      <select id="slctSucursalEm" class="form-select" onchange="getListadoPersonal()">
                        <option value="">Sucursales</option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- Tabla empleados -->
                <div class="col-12 col-lg-9 p-3 border rounded">
                  <div id="tableEmpleadosEmTel"></div>
                </div>
                <!-- Panel empleado seleccionado -->
                <div class="col-12 col-lg-3 p-3 border rounded">
                  <input type="hidden" id="EmpleadoSelectedEmTel">
                  <div class="text-center mb-3">
                    <h6 class="fw-bold">Empleado Seleccionado</h6>
                    <div id="EmpleadoSeleccionadoEmTel" class="text-muted"></div>
                  </div>
                  <div class="mb-3">
                    <label for="txtCorreoEmTel" class="form-label fw-bold">Correo</label>
                    <input id="txtCorreoEmTel" type="email" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label for="txtTelEmTel" class="form-label fw-bold">Teléfono</label>
                    <input id="txtTelEmTel" type="text" maxlength="10" class="form-control"
                      onkeypress="return onlynumber(event)">
                  </div>
                  <div class="mb-3">
                    <label for="txtMCortaEmTel" class="form-label fw-bold">Marcación Corta</label>
                    <input id="txtMCortaEmTel" type="text" maxlength="4" class="form-control"
                      onkeypress="return onlynumber(event)">
                  </div>
                  <div class="d-grid">
                    <button class="btn btn-primary" onclick="addEmpleadosDirectorioCorreosTelefonos()">Agregar al
                      Directorio</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal: Agregar empleado a Extensiones -->
      <div class="modal fade" id="modalAddEmpleadosDirectorioExtensiones" tabindex="-1"
        aria-labelledby="NameDirectorioExtension" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="NameDirectorioExtension"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="IdTipoExtensiones">
              <div class="row g-3">
                <!-- Filtros -->
                <div class="col-12 p-3 border rounded">
                  <div class="row g-3">
                    <div class="col-12 col-md-4">
                      <label for="slctDivisionEmExt" class="form-label fw-bold">Divisiones</label>
                      <select id="slctDivisionEmExt" class="form-select" onchange="getListadoPersonalExtensiones()">
                        <option value="">Divisiones</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4">
                      <label for="slctPuestoEmExt" class="form-label fw-bold">Puestos</label>
                      <select id="slctPuestoEmExt" class="form-select" onchange="getListadoPersonalExtensiones()">
                        <option value="">Puestos</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-4">
                      <label for="slctSucursalEmExt" class="form-label fw-bold">Sucursales</label>
                      <select id="slctSucursalEmExt" class="form-select" onchange="getListadoPersonalExtensiones()">
                        <option value="">Sucursales</option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- Tabla empleados -->
                <div class="col-12 col-lg-9 p-3 border rounded">
                  <div id="tableEmpleadosExtensiones"></div>
                </div>
                <!-- Panel empleado seleccionado -->
                <div class="col-12 col-lg-3 p-3 border rounded">
                  <input type="hidden" id="EmpleadoSelectedExtension">
                  <div class="text-center mb-3">
                    <h6 class="fw-bold">Empleado Seleccionado</h6>
                    <div id="EmpleadoSeleccionadoDirExt" class="text-muted"></div>
                  </div>
                  <div class="mb-3">
                    <label for="txtExtension" class="form-label fw-bold">Extensión</label>
                    <input id="txtExtension" type="text" maxlength="4" class="form-control"
                      onkeypress="return onlynumber(event)">
                  </div>
                  <div class="d-grid">
                    <button class="btn btn-primary" onclick="addEmpleadoDirectorioExtensiones()">Agregar al
                      Directorio</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal: Agregar Sucursal -->
      <div class="modal fade" id="modalAddSucursalesDirectorio" tabindex="-1" aria-labelledby="TitleModalSucursales"
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="TitleModalSucursales">Nueva Sucursal</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-12 col-md-4">
                  <label for="slctListadoSucursalesDisp" class="form-label fw-bold">Sucursal</label>
                  <select id="slctListadoSucursalesDisp" class="form-select"></select>
                </div>
                <div class="col-12 col-md-8">
                  <label for="txtDireccionSucursal" class="form-label fw-bold">Dirección</label>
                  <input type="text" id="txtDireccionSucursal" class="form-control">
                </div>
                <div class="col-12 col-md-4">
                  <label for="txtTelefono" class="form-label fw-bold">Teléfono</label>
                  <input type="text" id="txtTelefono" class="form-control" maxlength="10"
                    onkeypress="return onlynumber(event)">
                </div>
                <div class="col-12 col-md-4">
                  <label for="txtNumRed" class="form-label fw-bold">Num. Red</label>
                  <input type="text" id="txtNumRed" class="form-control" maxlength="10"
                    onkeypress="return onlynumber(event)">
                </div>
                <div class="col-12 col-md-4">
                  <label for="txtCorreo" class="form-label fw-bold">E-mail</label>
                  <input type="email" id="txtCorreo" class="form-control">
                </div>
                <div class="col-12 col-md-4">
                  <label for="txtMarcacionCorta" class="form-label fw-bold">Marcación Corta</label>
                  <input type="text" id="txtMarcacionCorta" class="form-control" maxlength="4"
                    onkeypress="return onlynumber(event)">
                </div>
                <div class="col-12 col-md-4">
                  <label for="inpFechaApertura" class="form-label fw-bold">Fecha de Apertura</label>
                  <input type="date" id="inpFechaApertura" class="form-control">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" id="btnAgregaSucursalDirectorio">Agregar</button>
            </div>
          </div>
        </div>
      </div>

    </div><!-- /app-container -->
  </div><!-- /app -->

  <!-- Scripts -->
  <?php include("neptune_js.php"); ?>

  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
    integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="scripts/DirectorioAdm.js?v=<?= time() ?>"></script>
  <script src="scripts/detallesEmpleadoLogeado.js?v=<?= time() ?>"></script>

</body>

</html>
