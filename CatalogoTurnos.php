<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet - Catálogo Turnos</title>

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
  </style>
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">Klyns</p>
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
                  <h1>Catálogo de Turnos</h1>
                </div>
              </div>
            </div>
  
            <!-- Formulario de registro (oculto por defecto) -->
            <div id="seccionFormTurno" style="display:none;">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col text-center">
                        <h5 class="fw-bold">Nuevo Turno</h5>
                      </div>
                    </div>
                    <input type="hidden" id="txtIdTurno" value="">
                    <div class="row g-3">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Turno:</label>
                        <select id="slctNombreTurno" class="form-select">
                          <option value="" disabled selected>Seleccione un turno</option>
                          <option value="Matutino">Matutino</option>
                          <option value="Vespertino">Vespertino</option>
                          <option value="Nocturno">Nocturno</option>
                        </select>
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Puesto:</label>
                        <select id="slctPuesto" class="form-select">
                          <option value="" disabled selected>Seleccione un puesto</option>
                        </select>
                      </div>
                    </div>
                    <div class="row g-3 mt-2">
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Hora de inicio:</label>
                        <input id="txtHoraInicio" type="time" class="form-control form-control-solid-bordered">
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label fw-bold">Hora de fin:</label>
                        <input id="txtHoraFin" type="time" class="form-control form-control-solid-bordered">
                      </div>
                    </div>
                    <div class="row mt-4">
                      <div class="col d-flex gap-2">
                        <button type="button" class="btn btn-primary" onclick="guardarTurno()">
                          <i class="fas fa-plus me-1"></i>Registrar
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="ocultarFormTurno()">
                          <i class="fas fa-times me-1"></i>Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div><!-- /seccionFormTurno -->

            <!-- Tabla de Turnos -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col d-flex justify-content-between align-items-center">
                        <label class="form-label mb-0">Listado de turnos registrados en el sistema.</label>
                        <button class="btn btn-primary" onclick="mostrarFormTurno()">
                          <i class="fas fa-plus me-1"></i>Registrar nuevo turno
                        </button>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table display text-center" id="TableTurnos">
                        <thead>
                          <tr>
                            <th>TURNO</th>
                            <th>HORA INICIO</th>
                            <th>HORA FIN</th>
                            <th>PUESTO</th>
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

  <!-- Modal Editar Turno -->
  <div class="modal fade" id="modalEditarTurno" tabindex="-1" aria-labelledby="modalEditarTurnoLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #ffc407;">
          <h5 class="modal-title fw-bold" id="modalEditarTurnoLabel" style="color: #1f1f1f;">Editar Turno</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="modalIdTurno" value="">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Nombre del turno:</label>
              <select id="modalNombreTurno" class="form-select">
                <option value="" disabled selected>Seleccione un turno</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Nocturno">Nocturno</option>
              </select>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Puesto:</label>
              <select id="modalSlctPuesto" class="form-select">
                <option value="" disabled selected>Seleccione un puesto</option>
              </select>
            </div>
          </div>
          <div class="row g-3 mt-2">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Hora de inicio:</label>
              <input id="modalHoraInicio" type="time" class="form-control form-control-solid-bordered">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold">Hora de fin:</label>
              <input id="modalHoraFin" type="time" class="form-control form-control-solid-bordered">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="guardarEdicionTurno()">
            <i class="fas fa-save me-1"></i>Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <?php include("scripts.php"); ?>

  <script src="scripts/Turnos.js?v=<?= time() ?>" charset="utf-8"></script>

</body>

</html>
