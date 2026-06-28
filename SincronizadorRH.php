<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo</title>
  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <style>
    .sync-server-card { border: 1px solid #eef0f4; border-radius: 14px; transition: box-shadow .2s, border-color .2s; }
    .sync-server-card:hover { box-shadow: 0 6px 22px rgba(20, 30, 60, .08); border-color: #e0e4ec; }
    .sync-server-ico { width: 42px; height: 42px; border-radius: 11px; display: grid; place-items: center; background: #eef3ff; color: #3b6fe0; }
    .sync-stat { border: 1px solid #eef0f4; border-radius: 14px; }
    .sync-stat .num { font-size: 1.55rem; font-weight: 700; line-height: 1; }
    .sync-pill .nav-link { border-radius: 10px; color: #6b7280; font-weight: 600; padding: .4rem .9rem; }
    .sync-pill .nav-link.active { background: #eef3ff; color: #3b6fe0; }
    .sync-table { font-size: .86rem; }
    .sync-table thead th { font-size: .72rem; text-transform: uppercase; letter-spacing: .03em; color: #9aa1ad; border-bottom: 1px solid #eef0f4; }
    .sync-table td { vertical-align: middle; }
    .badge-soft-success { background: #e7f7ee; color: #1d9d63; }
    .badge-soft-warning { background: #fdf3e2; color: #c0871f; }
    .badge-soft-muted { background: #f1f2f5; color: #8a909c; }
    .badge-soft-info { background: #eef3ff; color: #3b6fe0; }
    .badge-soft-danger { background: #fdeaea; color: #d24545; }
    .sync-log { font-size: .82rem; background: #f8f9fb; border: 1px solid #eef0f4; border-radius: 10px; padding: .6rem .8rem; }
    .sync-log .log-time { color: #3b6fe0; font-weight: 600; font-variant-numeric: tabular-nums; }
    .sync-log .log-msg { color: #3a4252; }
    .sync-log .log-row { padding: .12rem 0; }
  </style>
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
          <div class="container">

            <!-- Encabezado -->
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
              <div>
                <h4 class="mb-1 fw-bold">Sincronizador RH</h4>
                <p class="text-muted mb-0">Migra empleados y estructura organizacional desde los servidores PIP.</p>
              </div>
              <button class="btn btn-minimal btn-minimal-success" id="btnNuevoServidor">
                <i class="material-icons-outlined align-middle" style="font-size:18px;">add</i>
                Nuevo servidor
              </button>
            </div>

            <!-- Servidores -->
            <div class="row g-3 mb-2" id="gridServidores">
              <div class="col-12 text-center text-muted py-4">Cargando servidores…</div>
            </div>

            <!-- Vista previa / Resultado -->
            <div id="panelPreview" class="card border-0 shadow-sm mt-3 d-none" style="border-radius:16px;">
              <div class="card-body p-4">

                <!-- Zona de progreso (inline) -->
                <div id="zonaProgreso" class="d-none">
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <div class="spinner-border spinner-border-sm text-primary" id="progSpinner"></div>
                    <h6 class="mb-0 fw-bold" id="progTitulo">Procesando…</h6>
                  </div>
                  <div class="progress mb-2" style="height:10px; border-radius:8px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" id="progBar"
                      role="progressbar" style="width:0%"></div>
                  </div>
                  <div class="d-flex justify-content-between small mb-3">
                    <span id="progMsg" class="text-muted">Iniciando…</span>
                    <span id="progPct" class="text-muted">0%</span>
                  </div>
                  <div id="progLog" class="sync-log" style="max-height:200px; overflow:auto;"></div>
                  <div class="d-flex justify-content-end mt-3">
                    <button type="button" class="btn btn-minimal btn-minimal-danger btn-sm" id="btnCancelarSync">Cancelar</button>
                  </div>
                </div>

                <!-- Zona de detalle -->
                <div id="zonaDetalle" class="d-none">
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <div class="d-flex align-items-center gap-2">
                      <span class="badge badge-soft-info" id="previewTag">Vista previa</span>
                      <h6 class="mb-0 fw-bold" id="previewServidor"></h6>
                    </div>
                    <div class="d-flex gap-2">
                      <button class="btn btn-minimal btn-minimal-secondary btn-sm" id="btnCerrarPreview">Cerrar</button>
                      <button class="btn btn-minimal btn-minimal-success btn-sm" id="btnConfirmar">
                        <i class="material-icons-outlined align-middle" style="font-size:18px;">sync</i>
                        Confirmar sincronización
                      </button>
                    </div>
                  </div>

                  <div class="row g-3 mb-4" id="statCards"></div>

                  <ul class="nav nav-pills sync-pill gap-1 mb-3" id="previewTabs"></ul>
                  <div class="tab-content" id="previewTabContent"></div>
                </div>

              </div>
            </div>

            <!-- Bitácora de sincronización -->
            <div class="card border-0 shadow-sm mt-4" style="border-radius:16px;">
              <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h6 class="fw-bold mb-0">Bitácora de sincronización</h6>
                    <span class="text-muted small">Historial de corridas. Clic en una fila para ver el detalle.</span>
                  </div>
                  <button class="btn btn-minimal btn-minimal-secondary btn-sm" id="btnRefrescarBitacora" title="Actualizar">
                    <i class="material-icons-outlined align-middle" style="font-size:18px;">refresh</i>
                  </button>
                </div>
                <div class="table-responsive">
                  <table class="table sync-table mb-0">
                    <thead>
                      <tr>
                        <th>Fecha</th><th>Servidor</th><th>Tipo</th><th>Usuario</th><th>Estado</th>
                        <th>Sucursales</th><th>Áreas</th><th>Puestos</th><th>Empleados</th>
                        <th>Omit.</th><th>Duración</th>
                      </tr>
                    </thead>
                    <tbody id="tbodyBitacora">
                      <tr><td colspan="11" class="text-center text-muted py-3">Cargando…</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: detalle de corrida -->
  <div class="modal fade" id="modalBitacora" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0" style="border-radius:16px;">
        <div class="modal-header border-0 pb-2">
          <h6 class="modal-title fw-bold" id="bitTitulo">Detalle de corrida</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="d-flex flex-wrap gap-2 mb-3" id="bitFiltros"></div>
          <div class="table-responsive" style="max-height:55vh; overflow:auto;">
            <table class="table sync-table mb-0">
              <thead>
                <tr><th>Entidad</th><th>Acción</th><th>ID origen</th><th>ID local</th><th>Descripción</th></tr>
              </thead>
              <tbody id="tbodyBitDetalle"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: alta/edición de servidor -->
  <div class="modal fade" id="modalServidor" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0" style="border-radius:16px;">
        <div class="modal-header border-0 pb-0">
          <h6 class="modal-title fw-bold" id="modalServidorTitulo">Nuevo servidor</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="srvModo" value="crear">
          <div class="mb-3">
            <label class="form-label fw-semibold small text-muted">ID de servidor</label>
            <input id="srvId" type="text" class="form-control" placeholder="Ej. 2">
            <div class="form-text">Debe coincidir con el <code>iD_SERVIDOR</code> del API. No se puede cambiar después.</div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold small text-muted">Nombre</label>
            <input id="srvNombre" type="text" class="form-control" placeholder="Ej. MADERO">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold small text-muted">URL base</label>
            <input id="srvUrl" type="text" class="form-control" placeholder="https://luguito.com:8560">
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="srvActivo" checked>
            <label class="form-check-label small" for="srvActivo">Activo</label>
          </div>
        </div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-minimal btn-minimal-success" id="btnGuardarServidor">Guardar</button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <script src="scripts/SincronizadorRH.js?v=<?= date('YmdHis') ?>" charset="utf-8"></script>
</body>

</html>
