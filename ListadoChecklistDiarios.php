<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo - Listado Checklist Diarios</title>

  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    .badge-completo      { background-color: #28a745; color: #fff; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }
    .badge-observaciones { background-color: #ffc407; color: #1a1a1a; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }
    .badge-incidencia    { background-color: #dc3545; color: #fff; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }
    .badge-incompleto    { background-color: #6c757d; color: #fff; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }

    /* Detalle modal — fila de checklist */
    .det-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .det-item:last-child { border-bottom: none; }
    .det-icon { flex-shrink: 0; width: 26px; height: 26px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
    .det-icon svg { width: 14px; height: 14px; display: block; }
    .det-icon.correcto  { background: rgba(40,167,69,.12);  border: 1.5px solid #28a745; }
    .det-icon.incorrecto { background: rgba(220,53,69,.12); border: 1.5px solid #dc3545; }
    .det-icon.correcto svg  { stroke: #28a745; }
    .det-icon.incorrecto svg { stroke: #dc3545; }
    .det-info { flex: 1; min-width: 0; }
    .det-nombre { font-size: .88rem; font-weight: 500; color: #333; line-height: 1.3; }
    .det-meta { font-size: .75rem; color: #888; margin-top: 2px; }
    .det-incidencia { font-size: .72rem; background: #fff3cd; color: #856404; border: 1px solid #ffc107; border-radius: 3px; padding: 2px 7px; margin-top: 4px; display: inline-block; }
    .det-kpi { font-size: .72rem; background: #e8f4fd; color: #0c5460; border: 1px solid #bee5eb; border-radius: 3px; padding: 2px 7px; margin-top: 4px; display: inline-block; }

    /* Resumen del modal */
    .det-resumen { display: flex; gap: 12px; flex-wrap: wrap; padding: 12px 0 16px; }
    .det-resumen-item { flex: 1; text-align: center; padding: 8px 16px; border-radius: 6px; background: #f8f9fa; min-width: 80px; }
    .det-resumen-item .num  { font-size: 1.4rem; font-weight: 700; line-height: 1; }
    .det-resumen-item .lbl  { font-size: .7rem; color: #888; margin-top: 2px; }
    .num-total      { color: #495057; }
    .num-correctas  { color: #28a745; }
    .num-incidencias{ color: #dc3545; }

    /* KPI Gauges en modal */
    .kpi-container { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 25px; 
      padding: 25px; 
      justify-content: center;
    }
    .kpi-gauge-card {
      flex: 1 1 42%;
      max-width: 48%;
      background: #fafafa;
      border-radius: 12px;
      padding: 25px 20px;
      text-align: center;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0,0,0,.04);
      transition: transform 0.2s;
    }
    .kpi-gauge-card:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,.08); }
    .kpi-gauge-card svg { display: block; margin: 0 auto; width: 100%; max-width: 280px; height: auto; }
    .kpi-gauge-card .kpi-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: #333;
      margin-top: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .kpi-gauge-card .kpi-fraction {
      font-size: .95rem;
      color: #777;
      margin-top: 6px;
    }

    /* Estilos personalizados para Tabs del Modal */
    #modalTab { border-bottom: 2px solid #f0f0f0; margin-bottom: 15px; }
    #modalTab .nav-item { flex: 1; }
    #modalTab .nav-link {
      width: 100%;
      color: #777;
      font-weight: 500;
      border: none;
      padding: 10px 20px;
      transition: all 0.2s ease;
      background: transparent;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }
    #modalTab .nav-link:hover {
      color: #333;
      background: rgba(0,0,0,0.03);
      border-radius: 6px 6px 0 0;
    }
    #modalTab .nav-link.active {
      color: #2269f5;
      background: transparent;
      border-bottom: 2px solid #2269f5;
    }

    .loader { display: none !important; }
    .preloader { display: none !important; }

    /* ====== SOPORTE MODO OSCURO (.dark-mode) ====== */
    body.dark-mode .det-item { border-bottom-color: #3d4450; }
    body.dark-mode .det-nombre { color: #eef0f7; }
    body.dark-mode .det-meta { color: #aebad2; }
    
    body.dark-mode .det-resumen-item { background: #2a3038; border: 1px solid #3d4450; }
    body.dark-mode .num-total { color: #eef0f7; }
    body.dark-mode .det-resumen-item .lbl { color: #aebad2; }

    body.dark-mode .det-incidencia { background: rgba(255, 196, 7, 0.15); color: #ffc407; border-color: #ffc407; }
    body.dark-mode .det-kpi { background: rgba(34, 105, 245, 0.15); color: #74a0f9; border-color: #2269f5; }

    body.dark-mode .kpi-gauge-card { background: #2a3038; border-color: #3d4450; box-shadow: 0 4px 12px rgba(0,0,0,.2); }
    body.dark-mode .kpi-gauge-card .kpi-name { color: #eef0f7; }
    body.dark-mode .kpi-gauge-card .kpi-fraction { color: #aebad2; }

    body.dark-mode #modalTab { border-bottom-color: #3d4450; }
    body.dark-mode #modalTab .nav-link { color: #aebad2; }
    body.dark-mode #modalTab .nav-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
    body.dark-mode #modalTab .nav-link.active { color: #ffc407; border-bottom-color: #ffc407; }
    
    body.dark-mode .modal-content { background-color: #1f2329; color: #eef0f7; }
    body.dark-mode .modal-header, body.dark-mode .modal-footer { border-color: #3d4450; }
    body.dark-mode .modal-title { color: #eef0f7; }
    body.dark-mode .btn-close { filter: invert(1) grayscale(100%) brightness(200%); }
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
                  <h1>Listado de Checklists Diarios</h1>
                </div>
              </div>
            </div>

            <!-- Filtros -->
            <div class="row mb-3">
              <div class="col">
                <div class="card">
                  <div class="card-body py-3">
                    <div class="row g-2 align-items-end">
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold mb-1">Fecha inicio:</label>
                        <input type="date" id="txtFechaIni" class="form-control form-control-solid-bordered">
                      </div>
                      <div class="col-12 col-md-4">
                        <label class="form-label fw-bold mb-1">Fecha fin:</label>
                        <input type="date" id="txtFechaFin" class="form-control form-control-solid-bordered">
                      </div>
                      <div class="col-12 col-md-4">
                        <button type="button" class="btn btn-primary w-100" onclick="cargarListado()">
                          <i class="fas fa-search me-1"></i> Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabla -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table id="tblListadoChecklist" class="table table-hover align-middle" style="width:100%">
                        <thead>
                          <tr>
                            <th>Empleado</th>
                            <th>Puesto</th>
                            <th>Turno</th>
                            <th>Hora de revisión</th>
                            <th>Checklist</th>
                            <th>Estatus</th>
                            <th class="text-center">Detalle</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyListado">
                          <tr><td colspan="7" class="text-center text-muted py-4">Selecciona un rango de fechas y presiona Buscar.</td></tr>
                        </tbody>
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

  <!-- Modal Detalle -->
  <div class="modal fade" id="modalDetalle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalDetalleLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetalleLabel">Detalle del Checklist</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body p-0">
          <!-- Tabs Navigation -->
          <ul class="nav nav-tabs px-3 pt-3" id="modalTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="items-tab" data-bs-toggle="tab" data-bs-target="#tabItems" type="button" role="tab" aria-controls="tabItems" aria-selected="true">
                <i class="fas fa-list-ul me-1"></i> Checklists
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="graficas-tab" data-bs-toggle="tab" data-bs-target="#tabGraficas" type="button" role="tab" aria-controls="tabGraficas" aria-selected="false">
                <i class="fas fa-chart-pie me-1"></i> Indicadores KPIs
              </button>
            </li>
          </ul>

          <div class="tab-content">
            <!-- Tab 1: Items -->
            <div class="tab-pane fade show active p-3" id="tabItems" role="tabpanel" aria-labelledby="items-tab">
              <div class="det-resumen" id="detResumen"></div>
              <div id="detItems"></div>
            </div>
            <!-- Tab 2: Gráficas -->
            <div class="tab-pane fade p-3" id="tabGraficas" role="tabpanel" aria-labelledby="graficas-tab">
              <div id="detKpis" class="kpi-container">
                <div class="text-center w-100 py-4 text-muted">Cargando gráficas...</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <?php include("neptune_js.php"); ?>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>

  <script>
    const API = 'Backend/Checklists/App.php';

    // Forzar ocultamiento del preloader
    document.body.classList.add('no-loader');
    setTimeout(function () { document.body.classList.add('no-loader'); }, 300);
    window.addEventListener('load', function () { document.body.classList.add('no-loader'); });

    // SVG icons
    const SVG_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg>';
    const SVG_CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';

    // ── Init ──────────────────────────────────────────────────────────────
    $(document).ready(function () {
      const hoy = new Date().toISOString().split('T')[0];
      $('#txtFechaIni').val(hoy);
      $('#txtFechaFin').val(hoy);
      cargarListado();
    });

    // ── Cargar listado ──────────────────────────────────────────────────
    function cargarListado() {
      const fechaIni = $('#txtFechaIni').val();
      const fechaFin = $('#txtFechaFin').val();
      if (!fechaIni || !fechaFin) {
        toastr.warning('Selecciona ambas fechas.');
        return;
      }

      $.ajax({
        url: API,
        type: 'POST',
        data: { op: 'getListadoChecklistDiarios', fechaIni, fechaFin },
        success: function (data) {
          if (!data.Resultado) {
            toastr.error('Error al cargar el listado.');
            return;
          }
          renderTabla(data.Data);
        },
        error: function () { toastr.error('Error de conexión.'); }
      });
    }

    // ── Render tabla ────────────────────────────────────────────────────
    function renderTabla(rows) {
      const tbody = document.getElementById('tbodyListado');

      if (!rows || rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">Sin registros para el período seleccionado.</td></tr>';
        // Destruir DataTable si existía para mostrar la fila vacía
        if ($.fn.DataTable.isDataTable('#tblListadoChecklist')) {
          $('#tblListadoChecklist').DataTable().destroy();
        }
        return;
      }

      let html = '';
      rows.forEach(function (r) {
        const hora = r.HoraRevision ? r.HoraRevision.split(' ')[1].substring(0, 5) : '—';
        const fecha = r.Fecha || '';
        let badgeEstatus = '';
        if (r.Estatus === 'Completo')           badgeEstatus = '<span class="badge-completo">' + r.Estatus + '</span>';
        else if (r.Estatus === 'Con Observaciones') badgeEstatus = '<span class="badge-observaciones">' + r.Estatus + '</span>';
        else if (r.Estatus === 'Incompleto')        badgeEstatus = '<span class="badge-incompleto">' + r.Estatus + '</span>';
        else                                        badgeEstatus = '<span class="badge-incidencia">' + r.Estatus + '</span>';

        html += '<tr>' +
          '<td>' + escHtml(r.NombreEmpleado) + '</td>' +
          '<td>' + escHtml(r.Puesto) + '</td>' +
          '<td>' + escHtml(r.Turno) + '</td>' +
          '<td>' + escHtml(r.HoraRevision || '—') + '</td>' +
          '<td><span class="fw-semibold">' + r.Correctas + '</span><span class="text-muted">/' + r.TotalItems + '</span></td>' +
          '<td>' + badgeEstatus + '</td>' +
          '<td class="text-center">' +
            '<button class="btn btn-sm btn-outline-primary" onclick="verDetalle(\'' + escHtml(r.NoEmpleado) + '\',\'' + fecha + '\',\'' + escHtml(r.NombreEmpleado) + '\',\'' + (r.IdTurno || '') + '\')">' +
              '<i class="fas fa-eye me-1"></i>Ver detalle' +
            '</button>' +
          '</td>' +
        '</tr>';
      });
      tbody.innerHTML = html;

      // Re-init DataTables si ya está inicializado
      if ($.fn.DataTable.isDataTable('#tblListadoChecklist')) {
        $('#tblListadoChecklist').DataTable().destroy();
      }
      $('#tblListadoChecklist').DataTable({
        language: {
          decimal: ',', thousands: '.', emptyTable: 'No hay datos disponibles',
          info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
          infoEmpty: 'Mostrando 0 a 0 de 0 registros', infoFiltered: '(filtrado de _MAX_ registros totales)',
          lengthMenu: 'Mostrar _MENU_ registros', loadingRecords: 'Cargando...', processing: 'Procesando...',
          search: 'Buscar:', zeroRecords: 'No se encontraron resultados',
          paginate: { first: 'Primero', last: 'Último', next: 'Siguiente', previous: 'Anterior' }
        },
        order: [[3, 'desc']],
        columnDefs: [{ orderable: false, targets: 6 }]
      });
    }

    // ── Ver detalle ─────────────────────────────────────────────────────
    function verDetalle(noEmpleado, fecha, nombre, idTurno) {
      $('#modalDetalleLabel').text('Checklist de ' + nombre + ' — ' + fecha);
      
      // Resetear pestañas
      $('#items-tab').tab('show');
      
      document.getElementById('detResumen').innerHTML = '<div class="text-center w-100 py-3"><span class="text-muted">Cargando...</span></div>';
      document.getElementById('detItems').innerHTML = '';
      document.getElementById('detKpis').innerHTML = '<div class="text-center w-100 py-4 text-muted">Cargando gráficas...</div>';
      
      $('#modalDetalle').modal('show');

      // 1. Cargar Items
      $.ajax({
        url: API,
        type: 'POST',
        data: { op: 'getDetalleChecklistEmpleado', noEmpleado, fecha },
        success: function (data) {
          if (!data.Resultado || !data.Data) {
            document.getElementById('detItems').innerHTML = '<p class="text-muted text-center py-3">Sin datos disponibles.</p>';
            return;
          }
          renderDetalle(data.Data);
        },
        error: function () {
          document.getElementById('detItems').innerHTML = '<p class="text-danger text-center py-3">Error al cargar el detalle.</p>';
        }
      });

      // 2. Cargar KPIs Gráficas
      $.ajax({
        url: API,
        type: 'POST',
        data: { op: 'getKpisHistorical', noEmpleado, fecha, idTurno },
        success: function (data) {
          if (!data.Resultado || !data.Data) {
            document.getElementById('detKpis').innerHTML = '<p class="text-muted text-center py-4">Sin datos de KPIs para este registro.</p>';
            return;
          }
          renderKpis(data.Data);
        },
        error: function () {
          document.getElementById('detKpis').innerHTML = '<p class="text-danger text-center py-4">Error al cargar las gráficas.</p>';
        }
      });
    }

    // ── Render KPIs ─────────────────────────────────────────────────────
    function renderKpis(kpis) {
      const container = document.getElementById('detKpis');
      if (!kpis || kpis.length === 0) {
        container.innerHTML = '<p class="text-muted text-center py-4">No hay KPIs asociados a este periodo/turno.</p>';
        return;
      }

      let html = '';
      kpis.forEach(function(kpi) {
        const total = parseInt(kpi.TotalChecklists) || 0;
        const cumplidos = parseInt(kpi.ChecklistsCumplidos) || 0;
        const respondidos = parseInt(kpi.ChecklistsRespondidos) || 0;
        const pct = total > 0 ? Math.round((cumplidos / total) * 100) : 0;
        
        html += '<div class="kpi-gauge-card">' +
          '<div class="kpi-chart">' + _buildGaugeSVG(pct) + '</div>' +
          '<div class="kpi-name" title="' + escHtml(kpi.NombreKpi) + '">' + escHtml(kpi.NombreKpi) + '</div>' +
          '<div class="kpi-fraction">' + respondidos + ' de ' + total + ' respondidos</div>' +
        '</div>';
      });
      container.innerHTML = html;
    }

    // ── SVG Gauge (Glossy Liquid Premium Look) ───────
    function _buildGaugeSVG(pct) {
      const W = 200, H = 115, CX = 100, CY = 105, R = 85;
      const ID = Math.floor(Math.random() * 10000);

      function _wedge(cx, cy, r, startDeg, endDeg, fill, hasGloss = true) {
        const s = startDeg * Math.PI / 180, e = endDeg * Math.PI / 180;
        const x1 = cx + r * Math.cos(s), y1 = cy - r * Math.sin(s);
        const x2 = cx + r * Math.cos(e), y2 = cy - r * Math.sin(e);
        const lg = (endDeg - startDeg) > 180 ? 1 : 0;
        
        // Base arc with shadow filter
        let path = '<path d="M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + lg + ' 0 ' + x2 + ' ' + y2 + ' Z" fill="' + fill + '" filter="url(#shadowDetail' + ID + ')"/>';
        
        // Glossy reflection overlay (top half of arc)
        if (hasGloss) {
          const rInner = r * 0.75;
          const x1g = cx + rInner * Math.cos(s), y1g = cy - rInner * Math.sin(s);
          const x2g = cx + rInner * Math.cos(e), y2g = cy - rInner * Math.sin(e);
          path += '<path d="M ' + x1g + ' ' + y1g + ' A ' + rInner + ' ' + rInner + ' 0 ' + lg + ' 0 ' + x2g + ' ' + y2g + ' L ' + x2 + ' ' + y2 + ' A ' + r + ' ' + r + ' 0 ' + lg + ' 1 ' + x1 + ' ' + y1 + ' Z" fill="url(#glossGrad' + ID + ')" opacity="0.6"/>';
        }
        return path;
      }

      function sepLine(deg) {
        const rad = deg * Math.PI / 180;
        const x = CX + R * Math.cos(rad), y = CY - R * Math.sin(rad);
        return '<line x1="' + CX + '" y1="' + CY + '" x2="' + x + '" y2="' + y + '" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>';
      }

      const txtColor = pct < 40 ? '#e74c3c' : (pct < 75 ? '#d68910' : '#229954');

      return '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1))">' +
        '<defs>' +
          '<linearGradient id="redG' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="#ff9a9e" /><stop offset="50%" stop-color="#ff4b2b" /><stop offset="100%" stop-color="#c0392b" />' +
          '</linearGradient>' +
          '<linearGradient id="yelG' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="#ffeaa7" /><stop offset="50%" stop-color="#feca28" /><stop offset="100%" stop-color="#f39c12" />' +
          '</linearGradient>' +
          '<linearGradient id="greG' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="#b8e994" /><stop offset="50%" stop-color="#2ecc71" /><stop offset="100%" stop-color="#218c74" />' +
          '</linearGradient>' +
          '<linearGradient id="glossGrad' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="white" stop-opacity="0.5"/><stop offset="100%" stop-color="white" stop-opacity="0"/>' +
          '</linearGradient>' +
          '<filter id="shadowDetail' + ID + '" x="-20%" y="-20%" width="140%" height="140%">' +
            '<feGaussianBlur in="SourceAlpha" stdDeviation="1.5" /><feOffset dx="0" dy="1" /><feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>' +
          '</filter>' +
        '</defs>' +
        _wedge(CX, CY, R, 108, 180, 'url(#redG' + ID + ')') +
        _wedge(CX, CY, R, 45, 108, 'url(#yelG' + ID + ')') +
        _wedge(CX, CY, R, 0, 45, 'url(#greG' + ID + ')') +
        /* Semicírculo blanco central (hueco de la dona) - Ahora recortado a la mitad */
        '<path d="M ' + (CX - 45) + ' ' + CY + ' A 45 45 0 0 1 ' + (CX + 45) + ' ' + CY + ' Z" fill="#fff"/>' +
        sepLine(108) + sepLine(45) +
        '<line x1="' + (CX - R) + '" y1="' + CY + '" x2="' + (CX + R) + '" y2="' + CY + '" stroke="#fff" stroke-width="3"/>' +
        '<polygon points="' + (CX + (R-12) * Math.cos((180 - (pct / 100) * 180) * Math.PI / 180)) + ',' + (CY - (R-12) * Math.sin((180 - (pct / 100) * 180) * Math.PI / 180)) + ' ' + (CX + 5 * Math.cos((180 - (pct / 100) * 180) * Math.PI / 180 + Math.PI/2)) + ',' + (CY - 5 * Math.sin((180 - (pct / 100) * 180) * Math.PI / 180 + Math.PI/2)) + ' ' + (CX + 5 * Math.cos((180 - (pct / 100) * 180) * Math.PI / 180 - Math.PI/2)) + ',' + (CY - 5 * Math.sin((180 - (pct / 100) * 180) * Math.PI / 180 - Math.PI/2)) + '" fill="#333"/>' +
        '<circle cx="' + CX + '" cy="' + CY + '" r="7" fill="#444"/>' +
        '<circle cx="' + CX + '" cy="' + CY + '" r="3.5" fill="#fff"/>' +
        '<text x="' + CX + '" y="' + (CY - 14) + '" text-anchor="middle" font-size="23" font-weight="700" font-family="sans-serif" fill="' + txtColor + '">' + pct + '%</text>' +
        '</svg>';
    }

    // ── Render detalle modal ─────────────────────────────────────────────
    function renderDetalle(items) {
      if (!items || items.length === 0) {
        document.getElementById('detResumen').innerHTML = '';
        document.getElementById('detItems').innerHTML = '<p class="text-muted text-center py-3">Sin ítems registrados.</p>';
        return;
      }

      let total = items.length;
      let correctas = items.filter(i => parseInt(i.EsCorrecto) === 1).length;
      let incidencias = items.filter(i => parseInt(i.GeneraIncidencia) === 1).length;

      // Resumen
      document.getElementById('detResumen').innerHTML =
        '<div class="det-resumen-item"><div class="num num-total">' + total + '</div><div class="lbl">Total</div></div>' +
        '<div class="det-resumen-item"><div class="num num-correctas">' + correctas + '</div><div class="lbl">Correctas</div></div>' +
        '<div class="det-resumen-item"><div class="num num-incidencias">' + incidencias + '</div><div class="lbl">Incidencias</div></div>';

      // Lista de ítems
      let html = '';
      items.forEach(function (item) {
        const correcto    = parseInt(item.EsCorrecto)     === 1;
        const incidencia  = parseInt(item.GeneraIncidencia) === 1;
        const iconClass   = correcto ? 'correcto' : 'incorrecto';
        const svgIcon     = correcto ? SVG_CHECK  : SVG_CROSS;
        const hora        = item.FechaHora ? item.FechaHora.split(' ')[1].substring(0, 5) : '';

        let badges = '';
        if (incidencia) badges += '<span class="det-incidencia">⚠ Genera incidencia</span> ';
        if (item.NombreKpi && item.NombreKpi !== '—') badges += '<span class="det-kpi">KPI: ' + escHtml(item.NombreKpi) + '</span>';

        const rEsperadaText = parseInt(item.RespuestaEsperada) === 1 ? 'SI' : 'NO';

        html += '<div class="det-item">' +
          '<div class="det-icon ' + iconClass + '">' + svgIcon + '</div>' +
          '<div class="det-info">' +
            '<div class="d-flex justify-content-between align-items-center">' +
              '<div class="det-nombre">' + escHtml(item.NombreChecklist) + '</div>' +
              '<div class="text-end">' +
                '<span class="badge bg-light text-dark border" style="font-size: .7rem;">Esperado: ' + rEsperadaText + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="det-meta">' +
              'Turno: ' + escHtml(item.Turno) + ' &nbsp;·&nbsp; Tipo: ' + escHtml(item.Tipo) +
              (hora ? ' &nbsp;·&nbsp; ' + hora : '') +
            '</div>' +
            (badges ? '<div class="mt-1">' + badges + '</div>' : '') +
          '</div>' +
        '</div>';
      });
      document.getElementById('detItems').innerHTML = html;
    }

    // ── Utilidad escape HTML ─────────────────────────────────────────────
    function escHtml(str) {
      if (!str && str !== 0) return '';
      return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
  </script>
</body>
</html>
