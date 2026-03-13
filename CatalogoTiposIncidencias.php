<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Catálogo Tipos de Incidencias</title>

  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    .badge-activo   { background-color: #28a745; color: #fff; font-size: .85rem; padding: 4px 10px; border-radius: .25rem; }
    .badge-inactivo { background-color: #dc3545; color: #fff; font-size: .85rem; padding: 4px 10px; border-radius: .25rem; }

    .badge-sev-baja    { background-color: #28a745; color: #fff; font-size: .8rem; padding: 3px 9px; border-radius: .25rem; }
    .badge-sev-media   { background-color: #ffc107; color: #1a1a1a; font-size: .8rem; padding: 3px 9px; border-radius: .25rem; }
    .badge-sev-alta    { background-color: #fd7e14; color: #fff; font-size: .8rem; padding: 3px 9px; border-radius: .25rem; }
    .badge-sev-critica { background-color: #dc3545; color: #fff; font-size: .8rem; padding: 3px 9px; border-radius: .25rem; }
  </style>
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div>
    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>
    <div class="app-container">
      <?php include("includes/_Header.php"); ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="page-description">
                  <h1>Catálogo de Tipos de Incidencias</h1>
                </div>
              </div>
            </div>

            <!-- Modal Registrar Tipo de Incidencia -->
            <div class="modal fade" id="modalRegistrarTipo" tabindex="-1" aria-labelledby="modalRegistrarTipoLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header" style="background-color:#ffc407;">
                    <h5 class="modal-title fw-bold" id="modalRegistrarTipoLabel" style="color:#1f1f1f;">Registrar nuevo tipo de incidencia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <input type="hidden" id="txtId" value="">
                    <div class="row g-3">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Nombre del tipo:</label>
                        <input id="txtNombre" type="text" class="form-control form-control-solid-bordered"
                               placeholder="Ej. Falla Operativa, Riesgo de Seguridad...">
                      </div>
                      <div class="col-12 col-md-3">
                        <label class="form-label fw-bold">Nivel de severidad:</label>
                        <select id="slctSeveridad" class="form-select">
                          <option value="" disabled selected>Seleccione nivel</option>
                          <option value="Baja">Baja</option>
                          <option value="Media">Media</option>
                          <option value="Alta">Alta</option>
                          <option value="Crítica">Crítica</option>
                        </select>
                      </div>
                      <div class="col-12 col-md-3">
                        <label class="form-label fw-bold">SLA (horas para atención):</label>
                        <input id="txtSLA" type="number" min="1" class="form-control form-control-solid-bordered" placeholder="Ej. 24">
                      </div>
                    </div>
                    <div class="row g-3 mt-1">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Puesto responsable de atención:</label>
                        <select id="slctPuesto" class="form-select">
                          <option value="">— Todos los puestos —</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnRegistrar" onclick="guardar()">
                      <i class="fas fa-plus me-1"></i>Registrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Modal Registrar Tipo de Incidencia -->

            <!-- Tabla -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col d-flex justify-content-between align-items-center">
                        <label class="form-label mb-0">Listado de tipos de incidencias registrados.</label>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalRegistrarTipo">
                          <i class="fas fa-plus me-1"></i>Registrar nuevo tipo
                        </button>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table display text-center" id="TableTiposIncidencias">
                        <thead>
                          <tr>
                            <th>NOMBRE</th>
                            <th>SEVERIDAD</th>
                            <th>PUESTO RESPONSABLE</th>
                            <th>SLA (hrs)</th>
                            <th>ESTADO</th>
                            <th>ACCIONES</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
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

  <!-- Modal Editar -->
  <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="modalEditarLabel" style="color:#1f1f1f;">Editar Tipo de Incidencia</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="modalId" value="">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Nombre del tipo:</label>
              <input id="modalNombre" type="text" class="form-control form-control-solid-bordered">
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label fw-bold">Nivel de severidad:</label>
              <select id="modalSeveridad" class="form-select">
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </select>
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label fw-bold">SLA (horas para atención):</label>
              <input id="modalSLA" type="number" min="1" class="form-control form-control-solid-bordered">
            </div>
          </div>
          <div class="row g-3 mt-1">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Puesto responsable de atención:</label>
              <select id="modalPuesto" class="form-select">
                <option value="">— Todos los puestos —</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="guardarEdicion()">
            <i class="fas fa-save me-1"></i>Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <?php include("scripts.php"); ?>
  <script src="scripts/TiposIncidencias.js?v=<?= time() ?>" charset="utf-8"></script>
</body>

</html>
