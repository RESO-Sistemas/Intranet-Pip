<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Planes de acción</title>

  <?php include("neptune_styles.php"); ?>

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <style media="screen">
    /* Estilos Premium para Modales */
    .modal-header-premium {
      background-color: #fffaf0 !important;
      border-bottom: 1px solid #ffeeba !important;
    }
    
    .modal-alert-info {
      background-color: #fff9e6;
      border: 1px solid #ffeeba;
      color: #856404;
      border-radius: 8px;
    }
  </style>
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <!-- Menu -->
    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>

    <!-- App Container -->
    <div class="app-container">
      <?php include("includes/_Header.php"); ?>

      <div class="app-content">
        <div class="content-wrapper">
          <div class="container-fluid">

            <!-- Mensajes flotantes -->
            <div class="row">
              <div class="col-10 offset-1 col-lg-5 offset-lg-7"
                style="position: fixed; z-index: 9999; right: 20px; top: 80px;">
                <div id="contenidoMensajes" class="mb-2"></div>
                <div id="contenidoMensajesSolicitudesVJefe" class="mb-2"></div>
                <div id="contenidoMensajesSolicitudesNomina" class="mb-2"></div>
              </div>
            </div>

            <!-- Título de página -->
            <div class="row mb-3">
              <div class="col-12">
                <div class="page-description page-description-tabbed">
                  <div class="d-flex justify-content-between align-items-center">
                    <h1 class="m-0">Planes de acción</h1>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contenido Principal -->
            <div class="row">
              <div class="col-12">
                <div class="card shadow-sm border-0">
                  <div class="card-body">
                    <h6 class="text-dark mb-4">En este apartado se encuentra un listado con los empleados a su cargo que cuentan con al menos un plan de acción registrado.</h6>
                    <div class="table-responsive">
                      <table id="table-employees" class="table table-striped table-hover text-center w-100">
                        <thead>
                          <tr>
                            <th>No. Empleado</th>
                            <th>Empleado</th>
                            <th>Sucursal</th>
                            <th>Puesto</th>
                            <th>Ver planes de acción</th>
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

  <!-- Modales -->

  <!-- Modal: Planes de Acción del Empleado -->
  <div class="modal fade" id="modal_plan_actions" tabindex="-1" aria-labelledby="modalPlanActionsLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header modal-header-premium py-3">
          <h5 class="modal-title fw-bold text-dark d-flex align-items-center" id="modalPlanActionsLabel">
            <i class="fa-solid fa-folder-open text-warning me-2"></i> Planes de Acción
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          
          <!-- Banner Empleado Seleccionado -->
          <div class="alert modal-alert-info d-flex align-items-center mb-4 p-3 shadow-none" role="alert">
            <i class="fa-solid fa-user-tie text-warning fs-4 me-3"></i>
            <div>
              <small class="text-uppercase fw-bold text-dark d-block" style="font-size: 0.65rem; letter-spacing: 0.5px;">Empleado Seleccionado</small>
              <span id="employee_Selected" class="fw-bold text-dark" style="font-size: 0.9rem;"></span>
            </div>
          </div>

          <div class="table-responsive">
            <table id="table_planAction" class="table table-striped table-hover text-center w-100">
              <thead>
                <tr>
                  <th>Evaluación</th>
                  <th>Estado plan acción</th>
                  <th>Ver plan de acción</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer border-top-0 px-4 pb-4">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Neptune Javascripts -->
  <?php include("neptune_js.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/list-plan-action.js" charset="utf-8" type="module"></script>
</body>

</html>