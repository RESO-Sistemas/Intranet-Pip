<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Listado de Incidencias</title>

  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    /* ── Badges de estado ─────────────────────────────────────────────── */
    .badge-estado-abierta    { background-color: #ffc107; color: #1a1a1a; font-size: .82rem; padding: 4px 12px; border-radius: .25rem; font-weight: 500; white-space: nowrap; }
    .badge-estado-proceso    { background-color: #0d6efd; color: #fff;    font-size: .82rem; padding: 4px 12px; border-radius: .25rem; font-weight: 500; white-space: nowrap; }
    .badge-estado-resuelta   { background-color: #28a745; color: #fff;    font-size: .82rem; padding: 4px 12px; border-radius: .25rem; font-weight: 500; white-space: nowrap; }
    .badge-estado-cerrada    { background-color: #6c757d; color: #fff;    font-size: .82rem; padding: 4px 12px; border-radius: .25rem; font-weight: 500; white-space: nowrap; }

    /* ── Badges de severidad ──────────────────────────────────────────── */
    .badge-sev-baja    { background-color: #28a745; color: #fff; font-size: .78rem; padding: 3px 9px; border-radius: .25rem; }
    .badge-sev-media   { background-color: #ffc107; color: #1a1a1a; font-size: .78rem; padding: 3px 9px; border-radius: .25rem; }
    .badge-sev-alta    { background-color: #fd7e14; color: #fff; font-size: .78rem; padding: 3px 9px; border-radius: .25rem; }
    .badge-sev-critica { background-color: #dc3545; color: #fff; font-size: .78rem; padding: 3px 9px; border-radius: .25rem; }

    /* ── Modal detalle — imagen evidencia ─────────────────────────────── */
    .evidencia-img {
      max-width: 100%;
      max-height: 400px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }

    /* ── Detalle info bloque ──────────────────────────────────────────── */
    .detalle-info-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .detalle-info-row:last-child { border-bottom: none; }
    .detalle-label {
      font-weight: 600;
      color: #555;
      min-width: 120px;
      flex-shrink: 0;
      font-size: .88rem;
    }
    .detalle-value {
      color: #333;
      font-size: .88rem;
      flex: 1;
    }

    /* ── Botones de acción compactos ──────────────────────────────────── */
    .btn-accion {
      width: 34px;
      height: 34px;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .btn-accion:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
    }
    .btn-accion .material-symbols-outlined {
      font-size: 18px;
    }

    /* ── Quitar preloader ─────────────────────────────────────────────── */
    .loader  { display: none !important; }
    .preloader { display: none !important; }

    /* ── Evitar scroll del fondo cuando un modal está abierto ─────────── */
    body.modal-open {
      overflow: hidden !important;
      padding-right: 0 !important;
    }
    .modal {
      overscroll-behavior: contain;
    }
    .modal-dialog-scrollable .modal-body {
      overscroll-behavior: contain;
    }

    /* ── Select2 dentro del modal ─────────────────────────────────────── */
    .select2-container--default .select2-selection--single {
      height: 38px;
      border: 1px solid #ced4da;
      border-radius: .375rem;
      padding: 5px 8px;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow {
      height: 38px;
      top: 50%;
      transform: translateY(-50%);
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

            <!-- Encabezado -->
            <div class="row">
              <div class="col">
                <div class="page-description">
                  <h1>Listado de Incidencias</h1>
                </div>
              </div>
            </div>

            <!-- Tabla -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col d-flex justify-content-between align-items-center">
                        <label class="form-label mb-0">Listado de incidencias registradas en el sistema.</label>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table display text-center" id="tblIncidencias" style="width:100%">
                        <thead>
                          <tr>
                            <th>NOMBRE DEL EMPLEADO</th>
                            <th>PUESTO</th>
                            <th>TIPO DE INCIDENCIA</th>
                            <th>FECHA DE ALTA</th>
                            <th>ESTATUS</th>
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

          </div><!-- /container -->
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════════════
       Modal — Ver Detalle de Incidencia
       ══════════════════════════════════════════════════════════════════════ -->
  <div class="modal fade" id="modalVerDetalle" tabindex="-1" aria-labelledby="modalVerDetalleLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header" style="background-color:#fff;">
          <h5 class="modal-title fw-bold" id="modalVerDetalleLabel" style="color:#1f1f1f;">
            <i class="fas fa-exclamation-triangle me-2" style="color:#ffc107;"></i>Detalle de Incidencia
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- ID oculto de la incidencia -->
          <input type="hidden" id="detalleIdIncidencia" value="">
          <!-- Info del empleado -->
          <div id="detalleInfoEmpleado" class="mb-3"></div>
          <!-- Imagen evidencia -->
          <div class="text-center mb-3" id="detalleEvidenciaContainer">
            <p class="text-muted">Cargando...</p>
          </div>
          <!-- Descripción -->
          <div id="detalleDescripcion" class="mt-3"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnGuardarCambios" style="display:none;" onclick="guardarCambiosIncidencia()">
            <i class="fas fa-save me-1"></i> Guardar cambios
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════════════
       Modal — Seguimiento (placeholder)
       ══════════════════════════════════════════════════════════════════════ -->
  <div class="modal fade" id="modalSeguimiento" tabindex="-1" aria-labelledby="modalSeguimientoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="background-color:#fff;">
          <h5 class="modal-title fw-bold" id="modalSeguimientoLabel" style="color:#1f1f1f;">
            <i class="fas fa-comments me-2" style="color:#0d6efd;"></i>Seguimiento
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center py-5">
          <i class="material-icons-two-tone" style="font-size:64px; color:#ccc;">construction</i>
          <h5 class="mt-3 text-muted">Funcionalidad en desarrollo</h5>
          <p class="text-muted">Esta sección estará disponible próximamente.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <?php include("scripts.php"); ?>
  <script src="scripts/ListadoIncidencias.js?v=<?= time() ?>" charset="utf-8"></script>
</body>

</html>
