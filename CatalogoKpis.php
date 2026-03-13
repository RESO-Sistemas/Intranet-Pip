<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Catálogo KPIs</title>

  <?php include("neptune_styles.php"); ?>

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

  <style>
    .badge-activo {
      background-color: #28a745;
      color: #fff;
      font-size: 0.85rem;
      padding: 4px 10px;
      border-radius: 0.25rem;
    }
    .badge-inactivo {
      background-color: #dc3545;
      color: #fff;
      font-size: 0.85rem;
      padding: 4px 10px;
      border-radius: 0.25rem;
    }
    /* Badge puestos — amarillo primario + texto amarillo claro */
    .badge-puesto {
      background-color: #ffc407;
      color: #fff9e6;
      font-size: 0.8rem;
      padding: 3px 8px;
      border-radius: 0.25rem;
      white-space: nowrap;
    }
    body.dark-mode .badge-puesto {
      background-color: #ffc407;
      color: #1a1a1a;
    }
    /* Quitar contorno feo al arrastrar filas */
    table.dataTable tbody tr.dt-rowReorder-moving {
      outline: none !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
    }
    tr.dt-rowReorder-float {
      outline: none !important;
      box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important;
      opacity: 0.92;
    }

    .select2-container--default.select2-container--focus .select2-selection--single {
      border-color: #ffc407;
      box-shadow: 0 0 0 0.2rem rgba(255, 196, 7, 0.25);
    }
    .select2-dropdown {
      border-color: #ced4da;
      border-radius: 0.375rem;
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
                <div class="page-description page-description-tabbed">
                  <h1>Catálogo de KPIs</h1>
                </div>
              </div>
            </div>

            <!-- Formulario de registro (oculto por defecto) -->
            <div id="seccionFormKpi" style="display:none;">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col text-center">
                        <h5 class="fw-bold" id="formTitle">Nuevo KPI</h5>
                      </div>
                    </div>
                    <input type="hidden" id="txtIdKpi" value="">
                    <div class="row g-3">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Nombre del KPI:</label>
                        <input id="txtNombreKpi" type="text" class="form-control form-control-solid-bordered" placeholder="Ej. Ventas mensuales, Nivel de satisfacción...">
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Prioridad:</label>
                        <select id="slctPrioridad" class="form-select">
                          <option value="" disabled selected>Seleccione prioridad</option>
                          <option value="1">1 - Alta</option>
                          <option value="2">2 - Media</option>
                          <option value="3">3 - Baja</option>
                        </select>
                      </div>
                    </div>
                    <div class="row g-3 mt-2">
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold">Valor Alta:</label>
                        <input id="txtValorAlta" type="number" step="0.01" class="form-control form-control-solid-bordered" placeholder="Ej. 90">
                      </div>
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold">Valor Media:</label>
                        <input id="txtValorMedia" type="number" step="0.01" class="form-control form-control-solid-bordered" placeholder="Ej. 60">
                      </div>
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold">Valor Baja:</label>
                        <input id="txtValorBaja" type="number" step="0.01" class="form-control form-control-solid-bordered" placeholder="Ej. 30">
                      </div>
                    </div>
                    <div class="row g-3 mt-2">
                      <div class="col-12">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="chkParaTodos" checked onchange="togglePuestosSelect()">
                          <label class="form-check-label fw-bold" for="chkParaTodos">Aplica para todos los puestos</label>
                        </div>
                      </div>
                      <div class="col-12 d-none" id="divPuestos">
                        <label class="form-label fw-bold">Seleccione el puesto:</label>
                        <select id="slctPuestos" class="form-select">
                          <option value="" disabled selected>-- Seleccione un puesto --</option>
                        </select>
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col d-flex gap-2">
                        <button type="button" class="btn btn-primary" id="btnRegistrar" onclick="guardarKpi()">
                          <i class="fas fa-plus me-1"></i>Registrar
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="ocultarFormKpi()">
                          <i class="fas fa-times me-1"></i>Cancelar
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div><!-- /seccionFormKpi -->

            <!-- Tabla de KPIs -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col d-flex justify-content-between align-items-center">
                        <label class="form-label mb-0">Listado de KPIs registrados en el sistema.</label>
                        <button class="btn btn-primary" onclick="mostrarFormKpi()">
                          <i class="fas fa-plus me-1"></i>Registrar nuevo KPI
                        </button>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table display text-center" id="TableKpis">
                        <thead>
                          <tr>
                            <th>NOMBRE</th>
                            <th>VALOR ALTA</th>
                            <th>VALOR MEDIA</th>
                            <th>VALOR BAJA</th>
                            <th>ASIGNADO A</th>
                            <th>ESTADO</th>
                            <th>ACCIONES</th>
                            <th></th>
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

  <!-- Modal Editar KPI -->
  <div class="modal fade" id="modalEditarKpi" tabindex="-1" aria-labelledby="modalEditarKpiLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="modalEditarKpiLabel" style="color: #1f1f1f;">Editar KPI</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="modalIdKpi" value="">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Nombre del KPI:</label>
              <input id="modalNombreKpi" type="text" class="form-control form-control-solid-bordered" placeholder="Ej. Ventas mensuales...">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Prioridad:</label>
              <select id="modalPrioridad" class="form-select">
                <option value="" disabled selected>Seleccione prioridad</option>
                <option value="1">1 - Alta</option>
                <option value="2">2 - Media</option>
                <option value="3">3 - Baja</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mt-2">
            <div class="col-12 col-md-4">
              <label class="form-label fw-bold">Valor Alta:</label>
              <input id="modalValorAlta" type="number" step="0.01" class="form-control form-control-solid-bordered" placeholder="Ej. 90">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-bold">Valor Media:</label>
              <input id="modalValorMedia" type="number" step="0.01" class="form-control form-control-solid-bordered" placeholder="Ej. 60">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-bold">Valor Baja:</label>
              <input id="modalValorBaja" type="number" step="0.01" class="form-control form-control-solid-bordered" placeholder="Ej. 30">
            </div>
          </div>
          <div class="row g-3 mt-2">
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="modalChkParaTodos" checked onchange="togglePuestosSelectModal()">
                <label class="form-check-label fw-bold" for="modalChkParaTodos">Aplica para todos los puestos</label>
              </div>
            </div>
            <div class="col-12 d-none" id="modalDivPuestos">
              <label class="form-label fw-bold">Seleccione el puesto:</label>
              <select id="modalSlctPuestos" class="form-select">
                <option value="" disabled selected>-- Seleccione un puesto --</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="guardarEdicionKpi()">
            <i class="fas fa-save me-1"></i>Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <?php include("scripts.php"); ?>

  <script src="scripts/Kpis.js?v=<?= time() ?>" charset="utf-8"></script>

</body>

</html>
