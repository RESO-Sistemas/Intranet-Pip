<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Catálogo Checklists</title>

  <?php include("neptune_styles.php"); ?>

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

  <style>
    .badge-activo   { background-color: #28a745; color: #fff; font-size: .85rem; padding: 4px 10px; border-radius: .25rem; }
    .badge-inactivo { background-color: #dc3545; color: #fff; font-size: .85rem; padding: 4px 10px; border-radius: .25rem; }
    .badge-critico  { background-color: #dc3545; color: #fff; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; }
    .badge-no-critico { background-color: #6c757d; color: #fff; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; }
    .badge-verdadero { background-color: #28a745; color: #fff; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; }
    .badge-falso     { background-color: #dc3545; color: #fff; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; }
    .badge-incidencia-si { background-color: #ffc407; color: #1a1a1a; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; }
    .badge-incidencia-no { background-color: #6c757d; color: #fff; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; }
    .badge-puesto { background-color: #ffc407; color: #fff9e6; font-size: .8rem; padding: 3px 8px; border-radius: .25rem; white-space: nowrap; }
    body.dark-mode .badge-puesto { background-color: #ffc407; color: #1a1a1a; }

    /* Select2 multi-select: ancho completo y altura auto */
    #slctTurnosChecklist + .select2-container,
    #modalSlctTurnos      + .select2-container {
      width: 100% !important;
    }
    #slctTurnosChecklist + .select2-container .select2-selection--multiple,
    #modalSlctTurnos      + .select2-container .select2-selection--multiple,
    .select2-container--default .select2-selection--multiple {
      height: auto !important;
      min-height: 38px;
    }
    .select2-container--default .select2-selection--multiple .select2-selection__rendered {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      padding: 5px 8px;
      min-height: 36px;
    }
    .select2-container--default .select2-selection--multiple .select2-selection__choice {
      margin: 0;
      line-height: 1.4;
    }
    .select2-container--default .select2-selection--multiple .select2-selection__choice__display {
      vertical-align: middle;
    }
    /* Dropdown no más angosto que el campo, sin cortar palabras */
    .select2-dropdown {
      min-width: 100% !important;
      width: auto !important;
    }
    .select2-results__option {
      white-space: nowrap;
    }
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
                  <h1>Catálogo de Checklists</h1>
                </div>
              </div>
            </div>

            <!-- Modal Registrar Checklist -->
            <div class="modal fade" id="modalRegistrarChecklist" tabindex="-1" aria-labelledby="modalRegistrarChecklistLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header" style="background-color: #ffc407;">
                    <h5 class="modal-title fw-bold" id="modalRegistrarChecklistLabel" style="color: #1f1f1f;">Registrar nuevo Checklist</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-end">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Nombre del checklist:</label>
                        <input id="txtNombreChecklist" type="text" class="form-control form-control-solid-bordered" placeholder="Ej. Verificación de apertura...">
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Puesto:</label>
                        <select id="slctPuestoChecklist" class="form-select">
                          <option value="" disabled selected>Seleccione un puesto</option>
                        </select>
                      </div>
                    </div>
                    <div class="row g-3 mt-3 align-items-end">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Turnos aplicables:</label>
                        <select id="slctTurnosChecklist" class="form-select" disabled>
                          <option value="" disabled selected>Seleccione un turno</option>
                        </select>
                        <div id="msgTurnosChecklist" class="form-text text-danger d-none">Este puesto no tiene turnos asignados. Selecciona un puesto con turnos.</div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">KPI relacionado:</label>
                        <select id="slctKpiChecklist" class="form-select">
                          <option value="" disabled selected>Seleccione un KPI</option>
                        </select>
                        <div id="msgKpiChecklist" class="form-text text-danger d-none">Este puesto no tiene KPIs asignados. Selecciona un puesto con KPIs.</div>
                      </div>
                    </div>
                    <div class="row g-3 mt-3 align-items-end">
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold d-block">Tipo:</label>
                        <select id="slctTipoChecklist" class="form-select">
                          <option value="" disabled selected>Seleccione tipo</option>
                          <option value="Critico">Crítico</option>
                          <option value="No Critico">No Crítico</option>
                        </select>
                      </div>
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold d-block">Respuesta esperada:</label>
                        <select id="slctRespuestaChecklist" class="form-select">
                          <option value="" disabled selected>Seleccione respuesta</option>
                          <option value="1">Verdadero</option>
                          <option value="0">Falso</option>
                        </select>
                      </div>
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold d-block">¿Abre incidencia?</label>
                        <select id="slctIncidenciaChecklist" class="form-select">
                          <option value="" disabled selected>Seleccione</option>
                          <option value="1">Sí</option>
                          <option value="0">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="guardarChecklist()">
                      <i class="fas fa-plus me-1"></i>Registrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Modal Registrar Checklist -->

            <!-- Tabla -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col d-flex justify-content-between align-items-center">
                        <label class="form-label mb-0">Listado de checklists registrados en el sistema.</label>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalRegistrarChecklist" onclick="limpiarFormularioChecklist()">
                          <i class="fas fa-plus me-1"></i>Registrar nuevo checklist
                        </button>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table display text-center" id="TableChecklists">
                        <thead>
                          <tr>
                            <th>NOMBRE</th>
                            <th>PUESTO</th>
                            <th>TURNOS</th>
                            <th>TIPO</th>
                            <th>RESPUESTA</th>
                            <th>KPI</th>
                            <th>INCIDENCIA</th>
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

  <!-- Modal Editar Checklist -->
  <div class="modal fade" id="modalEditarChecklist" tabindex="-1" aria-labelledby="modalEditarChecklistLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #ffc407;">
          <h5 class="modal-title fw-bold" id="modalEditarChecklistLabel" style="color: #1f1f1f;">Editar Checklist</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="modalIdChecklist" value="">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Nombre del checklist:</label>
              <input id="modalNombreChecklist" type="text" class="form-control form-control-solid-bordered">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Puesto:</label>
              <select id="modalSlctPuesto" class="form-select">
                <option value="" disabled selected>Seleccione un puesto</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mt-3 align-items-end">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Turnos aplicables:</label>
              <select id="modalSlctTurnos" class="form-select" multiple></select>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">KPI relacionado:</label>
              <select id="modalSlctKpi" class="form-select">
                <option value="" disabled selected>Seleccione un KPI</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mt-3 align-items-end">
            <div class="col-12 col-md-4">
              <label class="form-label fw-bold d-block">Tipo:</label>
              <select id="modalSlctTipo" class="form-select">
                <option value="" disabled selected>Seleccione tipo</option>
                <option value="Critico">Crítico</option>
                <option value="No Critico">No Crítico</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-bold d-block">Respuesta esperada:</label>
              <select id="modalSlctRespuesta" class="form-select">
                <option value="" disabled selected>Seleccione respuesta</option>
                <option value="1">Verdadero</option>
                <option value="0">Falso</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-bold d-block">¿Abre incidencia?</label>
              <select id="modalSlctIncidencia" class="form-select">
                <option value="" disabled selected>Seleccione</option>
                <option value="1">Sí</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="guardarEdicionChecklist()">
            <i class="fas fa-save me-1"></i>Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <?php include("scripts.php"); ?>

  <script src="scripts/Checklists.js?v=<?= time() ?>" charset="utf-8"></script>
  <script>
    function limpiarFormularioChecklist() {
      $('#txtNombreChecklist').val('');
      $('#slctPuestoChecklist').val('');
      $('#slctTurnosChecklist').val(null).trigger('change');
      $('#slctKpiChecklist').val('');
      $('#slctTipoChecklist').val('');
      $('#slctRespuestaChecklist').val('');
      $('#slctIncidenciaChecklist').val('');
    }
  </script>

</body>

</html>
