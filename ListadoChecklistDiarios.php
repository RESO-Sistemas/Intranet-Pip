<!DOCTYPE html>
<html>

<head>
  <?php include("AutorizaPagina.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet - Listado Checklist Diarios</title>

  <?php include("neptune_styles.php"); ?>
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <style>
    .badge-completo      { background-color: #28a745; color: #fff; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }
    .badge-observaciones { background-color: #ffc407; color: #1a1a1a; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }
    .badge-incidencia    { background-color: #dc3545; color: #fff; font-size: .78rem; padding: 3px 10px; border-radius: .25rem; }

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
    .det-resumen-item { text-align: center; padding: 8px 16px; border-radius: 6px; background: #f8f9fa; min-width: 80px; }
    .det-resumen-item .num  { font-size: 1.4rem; font-weight: 700; line-height: 1; }
    .det-resumen-item .lbl  { font-size: .7rem; color: #888; margin-top: 2px; }
    .num-total      { color: #495057; }
    .num-correctas  { color: #28a745; }
    .num-incidencias{ color: #dc3545; }

    .loader { display: none !important; }
    .preloader { display: none !important; }
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
                            <th>Items</th>
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
  <div class="modal fade" id="modalDetalle" tabindex="-1" aria-labelledby="modalDetalleLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalDetalleLabel">Detalle del Checklist</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <!-- Resumen -->
          <div class="det-resumen" id="detResumen"></div>
          <!-- Items -->
          <div id="detItems"></div>
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
        else                                        badgeEstatus = '<span class="badge-incidencia">' + r.Estatus + '</span>';

        html += '<tr>' +
          '<td>' + escHtml(r.NombreEmpleado) + '</td>' +
          '<td>' + escHtml(r.Puesto) + '</td>' +
          '<td>' + escHtml(r.Turno) + '</td>' +
          '<td>' + escHtml(r.HoraRevision || '—') + '</td>' +
          '<td><span class="fw-semibold">' + r.Correctas + '</span><span class="text-muted">/' + r.TotalItems + '</span></td>' +
          '<td>' + badgeEstatus + '</td>' +
          '<td class="text-center">' +
            '<button class="btn btn-sm btn-outline-primary" onclick="verDetalle(\'' + escHtml(r.NoEmpleado) + '\',\'' + fecha + '\',\'' + escHtml(r.NombreEmpleado) + '\')">' +
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
    function verDetalle(noEmpleado, fecha, nombre) {
      $('#modalDetalleLabel').text('Checklist de ' + nombre + ' — ' + fecha);
      document.getElementById('detResumen').innerHTML = '<div class="text-center w-100 py-3"><span class="text-muted">Cargando...</span></div>';
      document.getElementById('detItems').innerHTML = '';

      $('#modalDetalle').modal('show');

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

        html += '<div class="det-item">' +
          '<div class="det-icon ' + iconClass + '">' + svgIcon + '</div>' +
          '<div class="det-info">' +
            '<div class="det-nombre">' + escHtml(item.NombreChecklist) + '</div>' +
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
