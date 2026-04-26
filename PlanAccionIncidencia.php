<?php include("AutorizaPagina.php"); ?>
<?php
  // Debe recibir un ID de incidencia
  if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: ListadoIncidencias.php");
    exit();
  }
  
  $idIncidenciaBase64 = $_GET['id'];
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Plan de Acción de Incidencia</title>

  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  
  <style>
    /* Estilos base (Neptune docs) */
    .app-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    
    .card-incidencia {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,.04);
      border: 1px solid #f0f0f0;
      padding: 20px;
      margin-bottom: 24px;
    }

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .info-item .label { font-size: 0.8rem; color: #777; font-weight: 600; text-transform: uppercase; }
    .info-item .value { font-size: 0.95rem; color: #222; font-weight: 500; margin-top: 4px; }

    /* Badges estado */
    .badge-estado-abierta { background-color: #ffc107; color: #1a1a1a; font-size: .8rem; padding: 4px 10px; border-radius: 4px; font-weight: 500; }
    .badge-estado-proceso { background-color: #0d6efd; color: #fff; font-size: .8rem; padding: 4px 10px; border-radius: 4px; font-weight: 500; }
    .badge-estado-resuelta { background-color: #28a745; color: #fff; font-size: .8rem; padding: 4px 10px; border-radius: 4px; font-weight: 500; }

    /* Actividades - Estilo Collapsible parecido a 360 */
    .activity-card {
      background: #fff;
      border: 1px solid #e2e5e8;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: hidden;
    }
    .activity-header {
      padding: 16px 20px;
      background: #f8f9fa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    .activity-header:hover { background: #f1f3f5; }
    .activity-title h5 { margin: 0; font-size: 1.05rem; font-weight: 600; color: #2c3e50; }
    .activity-meta { display: flex; gap: 16px; align-items: center; font-size: 0.85rem; color: #555; margin-top: 6px; }
    
    .progress-wrapper {
      width: 150px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .progress-bar-custom {
      flex: 1;
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--bs-primary);
      border-radius: 4px;
      transition: width 0.4s ease;
    }
    .progress-fill.bg-success { background: #28a745 !important; }
    .progress-fill.bg-warning { background: #ffc107 !important; }
    .progress-fill.bg-danger { background: #dc3545 !important; }
    
    .activity-body {
      padding: 20px;
      border-top: 1px solid #e2e5e8;
      display: none; /* oculta por defecto, se maneja en JS */
    }
    .desc-box {
      background: #fdfdfd;
      border: 1px solid #f0f0f0;
      border-radius: 6px;
      padding: 12px;
      font-size: 0.9rem;
      color: #444;
      margin-bottom: 16px;
      white-space: pre-wrap;
    }
    
    /* Tabla avances */
    .table-avances { width: 100%; font-size: 0.85rem; }
    .table-avances th { background: #f4f6f9; color: #444; font-weight: 600; padding: 10px; border-bottom: 2px solid #dee2e6; }
    .table-avances td { padding: 10px; border-bottom: 1px solid #e9ecef; vertical-align: middle; }
    .table-avances tr:last-child td { border-bottom: none; }
    
    .btn-add-circle {
      width: 32px; height: 32px; border-radius: 50%; display: inline-flex;
      align-items: center; justify-content: center; padding: 0;
      background: rgba(13,110,253,0.1); color: #0d6efd; border: none;
      transition: all 0.2s;
    }
    .btn-add-circle:hover { background: #0d6efd; color: #fff; }

    .btn-block-action {
      display: block; width: 100%; margin-top: 10px;
    }
    
    .empty-state {
      text-align: center; padding: 40px 20px; color: #6c757d;
      background: #f8f9fa; border-radius: 8px; border: 1px dashed #ced4da;
    }
    .empty-state i { font-size: 40px; margin-bottom: 12px; color: #adb5bd; }
  </style>
</head>

<body>
  <div class="app-align">
    <?php include("Menus/Admin.php"); ?>

    <div class="app-container">
      <!-- Miga de pan / Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 class="fw-bold mb-1"><i class="fas fa-clipboard-list text-primary me-2"></i> Plan de Acción</h3>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="ListadoIncidencias.php" class="text-decoration-none text-muted">Incidencias</a></li>
              <li class="breadcrumb-item active" aria-current="page">Plan de Acción</li>
            </ol>
          </nav>
        </div>
        <a href="ListadoIncidencias.php" class="btn btn-outline-secondary">
          <i class="fas fa-arrow-left me-1"></i> Volver
        </a>
      </div>

      <!-- Tarjeta de Info Incidencia -->
      <div class="card-incidencia">
        <div class="info-header">
          <h5 class="m-0 fw-bold"><i class="fas fa-info-circle text-muted me-2"></i> Datos de la Incidencia</h5>
          <div id="badgeEstadoHolder"></div>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <div class="label">Empleado</div>
            <div class="value fw-bold text-primary" id="lblEmpleado">...</div>
          </div>
          <div class="info-item">
            <div class="label">Puesto</div>
            <div class="value" id="lblPuesto">...</div>
          </div>
          <div class="info-item">
            <div class="label">Tipo de Incidencia</div>
            <div class="value" id="lblTipo">...</div>
          </div>
          <div class="info-item">
            <div class="label">Fecha Reporte</div>
            <div class="value" id="lblFecha">...</div>
          </div>
        </div>
        <hr class="my-3 mx-0" style="border-color:#eee">
        <div class="info-item">
          <div class="label mb-1">Descripción del Problema</div>
          <div class="value" id="lblDesc">...</div>
        </div>
      </div>

      <!-- Encabezado Actividades -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="fw-bold m-0"><i class="fas fa-tasks text-success me-2"></i> Actividades del Plan</h4>
        <button class="btn btn-primary" onclick="abrirModalNuevaActividad()">
          <i class="fas fa-plus me-1"></i> Agregar Actividad
        </button>
      </div>

      <!-- Contenedor dinámico de actividades -->
      <div id="contenedorActividades">
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2 text-muted">Cargando actividades...</p>
        </div>
      </div>

    </div> <!-- end app-container -->
  </div> <!-- end app-align -->


  <!-- ══════════════════════════════════════════════════════════════════════
       Modal — Nueva Actividad
       ══════════════════════════════════════════════════════════════════════ -->
  <div class="modal fade" id="modalNuevaActividad" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold"><i class="fas fa-plus-circle text-primary me-2"></i>Nueva Actividad</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="frmActividad" onsubmit="event.preventDefault(); guardarActividad();">
            <div class="mb-3">
              <label class="form-label fw-bold">Título de la actividad <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="txtActTitulo" placeholder="Ej. Revisar bitácoras de servidor" required>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Descripción detallada <span class="text-danger">*</span></label>
              <textarea class="form-control" id="txtActDesc" rows="3" placeholder="Describe qué se debe hacer..." required></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Fecha inicio <span class="text-danger">*</span></label>
                <input type="date" class="form-control" id="txtActFIni" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">Fecha fin compromiso <span class="text-danger">*</span></label>
                <input type="date" class="form-control" id="txtActFFin" required>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="$('#frmActividad').submit();">
            <i class="fas fa-save me-1"></i> Guardar Actividad
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════════════════
       Modal — Registrar Avance
       ══════════════════════════════════════════════════════════════════════ -->
  <div class="modal fade" id="modalAvance" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold"><i class="fas fa-chart-line text-success me-2"></i>Registrar Avance</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="avanceIdActividad">
          <div class="alert alert-info py-2" style="font-size:0.85rem">
            <strong>Actividad:</strong> <span id="lblAvanceActividadTitulo">...</span><br>
            <strong>Avance actual:</strong> <span id="lblAvanceActual" class="fw-bold fs-6">0%</span>
          </div>

          <form id="frmAvance" onsubmit="event.preventDefault(); guardarAvance();">
            <div class="mb-3">
              <label class="form-label fw-bold">Nuevo porcentaje de avance <span class="text-danger">*</span></label>
              <div class="d-flex align-items-center gap-3">
                <input type="range" class="form-range" id="rangeAvance" min="0" max="100" step="5" value="0" style="flex:1" oninput="$('#numAvance').val(this.value)">
                <div class="input-group" style="width: 130px;">
                  <input type="number" class="form-control text-center fw-bold" id="numAvance" min="0" max="100" required oninput="$('#rangeAvance').val(this.value)">
                  <span class="input-group-text">%</span>
                </div>
              </div>
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold">Descripción del trabajo realizado <span class="text-danger">*</span></label>
              <textarea class="form-control" id="txtAvanceDesc" rows="3" placeholder="Se completó la verificación del sistema principal, etc..." required></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" onclick="$('#frmAvance').submit();">
            <i class="fas fa-check me-1"></i> Registrar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script>
    // Pasar parámetro de PHP a JS
    const ID_INCIDENCIA_B64 = "<?= $idIncidenciaBase64 ?>";
  </script>
  
  <?php include("neptune_js.php"); ?>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <!-- Lógica específica de la vista -->
  <script src="scripts/PlanAccionIncidencia.js?v=<?= time() ?>"></script>
</body>
</html>
