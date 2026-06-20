// ─── Dashboard: KPI Gauges + Eventos + Checklist ────────────────────────────
(function () {
  'use strict';

  const API_DASHBOARD = 'Backend/Dashboard/App.php';
  const DASHBOARD_POLL_MS = 120000; // Aumentado a 2 min: los SSE cubren actualizaciones en tiempo real
  let kpiCharts = [];      // { chart, idKpi, total, cumplidos, respondidos, index }
  let kpiDataArr = [];     // datos crudos de KPIs
  let checklistsData = []; // datos de checklists para mapeo
  let turnosData = [];     // datos de turnos para mapeo
  let dashboardPollHandle = null;
  let lastDashboardHash = '';
  let dashboardRefreshQueued = false;
  let kpiPage = 0;
  const KPI_VISIBLE = 3;
  window.dashboardChecklist = { pending: null };

  window.addEventListener('dashboard:refresh', function () {
    if (dashboardRefreshQueued) return;
    dashboardRefreshQueued = true;
    setTimeout(function () {
      dashboardRefreshQueued = false;
      _refreshDashboard(false);
    }, 250);
  });

  async function _refreshDashboard(forceRender = false) {
    try {
      const res = await $.ajax({ url: API_DASHBOARD, type: 'POST', data: { op: 'getDashboardAll' }, dataType: 'json' });
      const currentHash = JSON.stringify(res || {});

      if (!forceRender && currentHash === lastDashboardHash) {
        return;
      }

      lastDashboardHash = currentHash;
      turnosData = res.turnos || [];
      kpiDataArr = res.kpis || [];
      _renderKpiGauges(kpiDataArr);
      _renderEventos(res.eventos || []);
      checklistsData = res.checklists || [];
      _renderChecklists(checklistsData);
    } catch (e) {
      console.error('Error actualizando dashboard:', e);
      // Fallback: intentar cargar por separado
      await Promise.all([
        _fetchTurnos(),
        _fetchKpis(),
        _fetchEventos(),
        _fetchChecklists()
      ]);
    }
  }

  // ─── Init ────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', async function () {
    await _refreshDashboard(true);

    if (dashboardPollHandle) {
      clearInterval(dashboardPollHandle);
    }

    dashboardPollHandle = setInterval(function () {
      if (document.hidden) return;
      _refreshDashboard(false);
    }, DASHBOARD_POLL_MS);
  });

  window.addEventListener('beforeunload', function () {
    if (dashboardPollHandle) {
      clearInterval(dashboardPollHandle);
    }
  });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      _refreshDashboard(false);
    }
  });

  // ─── Fetch Turnos ────────────────────────────────────────────────────────
  async function _fetchTurnos() {
    try {
      const res = await $.ajax({ url: API_DASHBOARD, type: 'POST', data: { op: 'getTurnos' } });
      turnosData = JSON.parse(res);
    } catch (e) {
      console.error('Error turnos dashboard:', e);
      turnosData = [];
    }
  }

  // ─── Helper: Obtener el turno actual según la hora ─────────────────────
  function _getTurnoActual() {
    var now = new Date();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var currentSecs = hh * 3600 + mm * 60 + ss;

    for (var i = 0; i < turnosData.length; i++) {
      var t = turnosData[i];
      if (!t.HoraInicio || !t.HoraFin) continue;
      var inicio = _timeToSecs(t.HoraInicio);
      var fin = _timeToSecs(t.HoraFin);

      if (inicio <= fin) {
        // Turno normal
        if (currentSecs >= inicio && currentSecs <= fin) return t;
      } else {
        // Turno nocturno (cruza medianoche)
        if (currentSecs >= inicio || currentSecs <= fin) return t;
      }
    }
    return null;
  }

  function _timeToSecs(timeStr) {
    var parts = timeStr.split(':');
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + (parseInt(parts[2]) || 0);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // KPI GAUGES (Syncfusion CircularGauge)
  // ═══════════════════════════════════════════════════════════════════════════
  async function _fetchKpis() {
    try {
      const res = await $.ajax({ url: API_DASHBOARD, type: 'POST', data: { op: 'getKpisDashboard' } });
      kpiDataArr = JSON.parse(res);
      _renderKpiGauges(kpiDataArr);
    } catch (e) {
      console.error('Error KPIs dashboard:', e);
      $('#kpiCarouselContainer').html('<p class="text-muted small text-center w-100">No se pudieron cargar los KPIs</p>');
    }
  }

  function _clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function _toNumber(value) {
    var n = parseFloat(value);
    return isFinite(n) ? n : null;
  }

  function _getNumericByKeys(obj, keys) {
    for (var i = 0; i < keys.length; i++) {
      if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
        var n = _toNumber(obj[keys[i]]);
        if (n !== null) return n;
      }
    }
    return null;
  }

  function _resolveKpiThresholds(kpi) {
    var rawBaja = _getNumericByKeys(kpi, ['ValorBaja', 'valorBaja', 'Baja', 'PorcentajeBaja']);
    var rawMedia = _getNumericByKeys(kpi, ['ValorMedia', 'valorMedia', 'Media', 'PorcentajeMedia']);
    var rawAlta = _getNumericByKeys(kpi, ['ValorAlta', 'valorAlta', 'Alta', 'PorcentajeAlta']);

    var values = [rawBaja, rawMedia, rawAlta].filter(function (v) { return v !== null; });
    if (values.length < 3) {
      return { baja: 40, media: 75, alta: 100 };
    }

    values.sort(function (a, b) { return a - b; });
    var baja = _clamp(values[0], 5, 95);
    var media = _clamp(values[1], baja + 1, 99);
    var alta = _clamp(values[2], media + 1, 100);

    return { baja: baja, media: media, alta: alta };
  }

  function _buildGaugeFallback(pct) {
    return '<div class="small fw-bold text-center" style="line-height:84px;color:#444;">' + pct + '%</div>';
  }

  function _createSyncfusionGauge(mountId, pct, thresholds) {
    if (!window.ej || !ej.circulargauge || !ej.circulargauge.CircularGauge) {
      return null;
    }

    var gauge = new ej.circulargauge.CircularGauge({
      background: 'transparent',
      width: '132px',
      height: '84px',
      centerY: '82%',
      axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,
        radius: '100%',
        lineStyle: { width: 0 },
        majorTicks: { width: 0, height: 0 },
        minorTicks: { width: 0, height: 0 },
        labelStyle: {
          position: 'Inside',
          offset: 0,
          font: { size: '0px' }
        },
        pointers: [{
          value: 90,
          radius: '50%',
          color: '#2f2f2f',
          needleStartWidth: 1,
          needleEndWidth: 4,  
          cap: {
            radius: 5,
            color: '#2f2f2f',
            border: { width: 0 }
          },
          needleTail: {
            length: '1%',
            color: '#2f2f2f'
          },
          animation: {
            enable: true,
            duration: 600
          }
        }],
        ranges: [{
          start: 0,
          end: thresholds.baja,
          radius: '100%',
          startWidth: 12,
          endWidth: 12,
          roundedCornerRadius: 6,
          color: '#dc3545'
        }, {
          start: thresholds.baja,
          end: thresholds.media,
          radius: '100%',
          startWidth: 12,
          endWidth: 12,
          roundedCornerRadius: 6,
          color: '#f4b400'
        }, {
          start: thresholds.media,
          end: 100,
          radius: '100%',
          startWidth: 12,
          endWidth: 12,
          roundedCornerRadius: 6,
          color: '#28a745'
        }]
      }]
    });

    gauge.appendTo('#' + mountId);
    return gauge;
  }

  function _destroyKpiGauges() {
    kpiCharts.forEach(function (entry) {
      if (entry && entry.chart && typeof entry.chart.destroy === 'function') {
        try {
          entry.chart.destroy();
        } catch (e) {
          console.warn('No se pudo destruir gauge KPI:', e);
        }
      }
    });
  }

  function _renderKpiGauges(kpis) {
    var container = document.getElementById('kpiCarouselContainer');
    if (!container) return;

    if (!kpis || kpis.length === 0) {
      container.innerHTML = '';
      return;
    }

    _destroyKpiGauges();
    container.innerHTML = '';
    kpiCharts = [];

    kpis.forEach(function (kpi, i) {
      var total      = parseInt(kpi.TotalChecklists)      || 0;
      var cumplidos  = parseInt(kpi.ChecklistsCumplidos)  || 0;
      var respondidos = parseInt(kpi.ChecklistsRespondidos) || 0;
      var pct = total > 0 ? Math.round((cumplidos / total) * 100) : 0;

      var thresholds = _resolveKpiThresholds(kpi);
      var gaugeMountId = 'kpiChart' + i;

      var pill = document.createElement('div');
      pill.className = 'kpi-pill';
      pill.setAttribute('data-kpi-id', kpi.IdKpi);
      pill.innerHTML =
        '<div class="kpi-pill-gauge" id="' + gaugeMountId + '" style="width:132px;height:84px;overflow:hidden;"></div>' +
        '<div class="kpi-pill-info">' +
          '<span class="kpi-pill-name" title="' + _escapeHtml(kpi.NombreKpi) + '">' + _escapeHtml(kpi.NombreKpi) + '</span>' +
          '<span class="kpi-pill-percent" id="kpiPercent' + i + '">' + pct + '%</span>' +
          '<span class="kpi-pill-fraction" id="kpiFraction' + i + '">' + respondidos + '/' + total + '</span>' +
        '</div>';
      container.appendChild(pill);

      var gauge = _createSyncfusionGauge(gaugeMountId, pct, thresholds);
      if (!gauge) {
        var fallbackEl = document.getElementById(gaugeMountId);
        if (fallbackEl) fallbackEl.innerHTML = _buildGaugeFallback(pct);
      }

      kpiCharts.push({
        chart: gauge,
        idKpi: kpi.IdKpi,
        total: total,
        cumplidos: cumplidos,
        respondidos: respondidos,
        index: i,
        thresholds: thresholds
      });
    });
  }

  // Actualizar una pill en tiempo real (tras responder un checklist)
  function _updateKpiGauge(idKpi, esCorrecta) {
    var entry = kpiCharts.find(function (c) { return c.idKpi == idKpi; });
    if (!entry) return;

    entry.respondidos = (entry.respondidos || 0) + 1;
    if (esCorrecta) entry.cumplidos++;
    var pct = entry.total > 0 ? Math.round((entry.cumplidos / entry.total) * 100) : 0;

    // Actualizar pointer del gauge
    if (entry.chart && typeof entry.chart.setPointerValue === 'function') {
      entry.chart.setPointerValue(0, 0, _clamp(pct, 0, 100));
    } else {
      var chartEl = document.getElementById('kpiChart' + entry.index);
      if (chartEl) chartEl.innerHTML = _buildGaugeFallback(pct);
    }

    var percentEl = document.getElementById('kpiPercent' + entry.index);
    if (percentEl) percentEl.textContent = pct + '%';

    // Actualizar texto de fracción
    var fractionEl = document.getElementById('kpiFraction' + entry.index);
    if (fractionEl) fractionEl.textContent = entry.respondidos + '/' + entry.total;
  }

  /* _setupCarousel y _slideKpis se eliminan: ahora el scroll es nativo (CSS overflow-x: auto) */


  // ═══════════════════════════════════════════════════════════════════════════
  // PRÓXIMOS EVENTOS
  // ═══════════════════════════════════════════════════════════════════════════
  async function _fetchEventos() {
    try {
      const res = await $.ajax({ url: 'Backend/Eventos/App.php', type: 'POST', data: { op: 'getProximosEventos' } });
      const eventos = JSON.parse(res);
      _renderEventos(eventos);
    } catch (e) {
      console.error('Error eventos dashboard:', e);
      $('#listaEventos').html('<p class="text-muted small text-center">Error al cargar eventos</p>');
    }
  }

  function _renderEventos(eventos) {
    var el = document.getElementById('listaEventos');
    if (!el) return;

    if (!eventos || eventos.length === 0) {
      el.innerHTML = '<p class="text-muted small text-center py-2">No hay eventos próximos</p>';
      return;
    }

    var meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    var html = '';

    eventos.forEach(function (ev, idx) {
      var fecha = new Date(ev.FechaInicio + 'T00:00:00');
      var dia = fecha.getDate();
      var mes = meses[fecha.getMonth()];
      var horaIni = ev.HoraInicio ? ev.HoraInicio.substring(0, 5) : '';
      var horaFin = ev.HoraFin ? ev.HoraFin.substring(0, 5) : '';
      var horario = horaIni && horaFin ? horaIni + ' - ' + horaFin : (horaIni || '');

      html += '<div class="evento-item" role="button" tabindex="0" data-event-index="' + idx + '">' +
        '<div class="evento-date-box">' +
          '<div class="ev-day">' + dia + '</div>' +
          '<div class="ev-month">' + mes + '</div>' +
        '</div>' +
        '<div class="evento-info">' +
          '<div class="ev-title">' + _escapeHtml(ev.Titulo) + '</div>' +
          (horario ? '<div class="ev-time"><i class="far fa-clock me-1"></i>' + horario + '</div>' : '') +
        '</div>' +
      '</div>';
    });

    el.innerHTML = html;

    el.querySelectorAll('.evento-item').forEach(function (eventEl) {
      eventEl.addEventListener('click', function () {
        var eventIndex = parseInt(this.getAttribute('data-event-index'), 10);
        if (isNaN(eventIndex) || !eventos[eventIndex]) return;
        _openEventDetailModal(eventos[eventIndex]);
      });

      eventEl.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        this.click();
      });
    });
  }

  function _safeText(value, fallback) {
    var txt = (value == null ? '' : String(value)).trim();
    return txt ? txt : fallback;
  }

  function _formatDateLabel(dateStr) {
    if (!dateStr) return 'Sin fecha';
    var date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return _safeText(dateStr, 'Sin fecha');

    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  function _formatHourLabel(hourStr) {
    if (!hourStr) return '';
    return _safeText(hourStr, '').substring(0, 5);
  }

  function _openEventDetailModal(ev) {
    var modalBody = document.getElementById('eventDetailModalBody');
    var modalTitle = document.getElementById('eventDetailModalLabel');
    var modalElement = document.getElementById('eventDetailModal');
    if (!modalBody || !modalTitle || !modalElement) return;

    var title = _safeText(ev.Titulo, 'Evento sin título');
    var dateLabel = _formatDateLabel(ev.FechaInicio);
    var hourStart = _formatHourLabel(ev.HoraInicio);
    var hourEnd = _formatHourLabel(ev.HoraFin);
    var hourLabel = hourStart && hourEnd ? (hourStart + ' - ' + hourEnd) : (hourStart || 'Sin horario');
    var location = _safeText(ev.Ubicacion || ev.Lugar || ev.Sede, 'No especificada');
    var category = _safeText(ev.TipoEvento || ev.Tipo || ev.Categoria, 'General');
    var description = _safeText(ev.Descripcion || ev.Detalle || ev.Observaciones, 'No hay descripción disponible para este evento.');

    modalTitle.innerHTML = '<i class="fas fa-calendar-day"></i> ' + _escapeHtml(title);
    modalBody.innerHTML =
      '<div class="event-detail-grid">' +
        '<div class="event-detail-chip">' +
          '<div class="event-detail-label">Fecha</div>' +
          '<div class="event-detail-value">' + _escapeHtml(dateLabel) + '</div>' +
        '</div>' +
        '<div class="event-detail-chip">' +
          '<div class="event-detail-label">Horario</div>' +
          '<div class="event-detail-value">' + _escapeHtml(hourLabel) + '</div>' +
        '</div>' +
        '<div class="event-detail-chip">' +
          '<div class="event-detail-label">Categoría</div>' +
          '<div class="event-detail-value">' + _escapeHtml(category) + '</div>' +
        '</div>' +
        '<div class="event-detail-chip">' +
          '<div class="event-detail-label">Ubicación</div>' +
          '<div class="event-detail-value">' + _escapeHtml(location) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="event-detail-description">' +
        '<div class="event-detail-label">Descripción</div>' +
        '<div class="event-detail-value">' + _escapeHtml(description) + '</div>' +
      '</div>';

    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      var modal = null;
      if (typeof bootstrap.Modal.getOrCreateInstance === 'function') {
        modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      } else {
        modal = new bootstrap.Modal(modalElement);
      }

      if (modal && typeof modal.show === 'function') {
        modal.show();
        return;
      }
    }

    if (typeof $ !== 'undefined' && typeof $.fn.modal === 'function') {
      $(modalElement).modal('show');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CHECKLIST DEL DÍA
  // ═══════════════════════════════════════════════════════════════════════════
  async function _fetchChecklists() {
    try {
      const res = await $.ajax({ url: API_DASHBOARD, type: 'POST', data: { op: 'getChecklistsEmpleado' } });
      
      // Verificar si la respuesta es válida
      if (!res || res === '') {
        $('#listaChecklist').html('<p class="text-muted small text-center py-2">No hay checklists asignados a tu puesto</p>');
        return;
      }
      
      checklistsData = JSON.parse(res);
      _renderChecklists(checklistsData);
    } catch (e) {
      console.error('Error checklists dashboard:', e);
      $('#listaChecklist').html('<p class="text-muted small text-center">Error al cargar checklist</p>');
    }
  }

  function _renderChecklists(checklists) {
    var el = document.getElementById('listaChecklist');
    if (!el) return;

    if (!checklists || checklists.length === 0) {
      el.innerHTML = '<p class="text-muted small text-center py-2">No hay checklists asignados a tu puesto</p>';
      return;
    }

    // Mostrar encabezado del turno actual
    var turnoActual = _getTurnoActual();
    var turnoLabel = turnoActual ? turnoActual.Nombre : 'Turno actual';
    var html = '<div class="turno-header d-flex align-items-center">' +
      '<span class="badge badge-primary ms-0"></span>' +
    '</div>';

    // Renderizar todos los checklists (ya vienen filtrados del servidor)
    checklists.forEach(function (chk) {
        var yaContestado = parseInt(chk.YaContestado) === 1;
        var disabledAttr = yaContestado ? ' disabled' : '';
        var respuestaGuardada = parseInt(chk.RespuestaEmpleado);
        var claseItem = 'checklist-item';
        if (yaContestado) {
          claseItem += ' ya-contestado';
          claseItem += respuestaGuardada === 1 ? ' chk-respondido-si' : ' chk-respondido-no';
        }
        var badgeTipo = chk.Tipo === 'Critico'
          ? '<span class="badge bg-danger chk-badge">Crítico</span>'
          : '<span class="badge bg-secondary chk-badge">No Crítico</span>';

        var activeSi = yaContestado && respuestaGuardada === 1 ? ' active' : '';
        var activeNo = yaContestado && respuestaGuardada === 0 ? ' active' : '';

        html += '<div class="' + claseItem + '" data-id="' + chk.IdChecklist + '">' +
          '<div class="chk-btn-group">' +
            '<button type="button" class="btn chk-btn-si' + activeSi + '"' + disabledAttr +
              ' data-id="' + chk.IdChecklist + '"' +
              ' data-id-kpi="' + (chk.IdKpi || '') + '"' +
              ' data-respuesta-esperada="' + chk.RespuestaEsperada + '"' +
              ' data-respuesta="1"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 10 18 20 6"/></svg></button>' +
            '<button type="button" class="btn chk-btn-no' + activeNo + '"' + disabledAttr +
              ' data-id="' + chk.IdChecklist + '"' +
              ' data-id-kpi="' + (chk.IdKpi || '') + '"' +
              ' data-respuesta-esperada="' + chk.RespuestaEsperada + '"' +
              ' data-respuesta="0"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg></button>' +
          '</div>' +
          '<div class="flex-grow-1">' +
            '<div class="chk-name">' + _escapeHtml(chk.Nombre) + '</div>' +
          '</div>' +
          badgeTipo +
        '</div>';
      });

    el.innerHTML = html;

    // Bind click events for Sí/No buttons
    el.querySelectorAll('.chk-btn-si:not([disabled]), .chk-btn-no:not([disabled])').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idChecklist = this.getAttribute('data-id');
        var idKpi = this.getAttribute('data-id-kpi');
        var respuestaEsperada = parseInt(this.getAttribute('data-respuesta-esperada'));
        var respuesta = parseInt(this.getAttribute('data-respuesta'));
        _responderChecklist(idChecklist, respuesta, respuestaEsperada, idKpi, this);
      });
    });
  }

  async function _responderChecklist(idChecklist, respuesta, respuestaEsperada, idKpi, btnEl) {
    var item = btnEl.closest('.checklist-item');
    var btnGroup = item.querySelector('.chk-btn-group');
    var allBtns = btnGroup.querySelectorAll('.btn');
    
    // Buscar el checklist en checklistsData
    var checklist = checklistsData.find(function(chk) { return chk.IdChecklist == idChecklist; });

    // 1. Validar si requiere incidencia antes de guardar en BD
    if (checklist && checklist.AbreIncidencia == 1 && respuesta !== respuestaEsperada) {
      if (typeof Swal !== 'undefined') {
        const result = await Swal.fire({
          title: '¡Atención!',
          text: 'La respuesta ingresada requiere la apertura de una incidencia. ¿Deseas continuar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, continuar',
          cancelButtonText: 'No, cancelar',
          confirmButtonColor: '#008837',
          cancelButtonColor: '#d33',
          background: '#ffffff',
          color: '#2c3e50',
          iconColor: '#008837',
          customClass: {
            title: 'fw-bold',
            popup: 'rounded-4 shadow-lg'
          }
        });

        if (!result.isConfirmed) {
          return; // No hacemos nada, los botones quedan habilitados
        }
      }

      // Deshabilitar botones para evitar multi-click
      allBtns.forEach(function (b) { b.disabled = true; });

      // Guardar en estado pendiente global
      window.dashboardChecklist.pending = {
          idChecklist: idChecklist,
          respuesta: respuesta,
          respuestaEsperada: respuestaEsperada,
          idKpi: idKpi,
          btnEl: btnEl,
          item: item,
          allBtns: allBtns
      };

      // Abrir modal de incidencia (el guardado del checklist se hará desde scripts/index.js)
      var modalEl = document.getElementById('modalIncidencia');
      var modal = new bootstrap.Modal(modalEl, {
        backdrop: 'static',
        keyboard: false
      });
      modal.show();
      return;
    }

    // 2. Si no requiere incidencia o es respuesta esperada, guardado normal
    try {
      allBtns.forEach(function (b) { b.disabled = true; });

      const res = await $.ajax({
        url: API_DASHBOARD,
        type: 'POST',
        data: { op: 'responderChecklist', idChecklist: idChecklist, respuesta: respuesta }
      });
      
      let data;
      try {
        data = JSON.parse(res);
      } catch (jsonErr) {
        allBtns.forEach(function (b) { b.disabled = false; });
        return;
      }

      if (data.Resultado) {
        _markAsAnswered(item, btnEl, respuesta, idKpi, respuestaEsperada);
      }
    } catch (e) {
      console.error('Error al responder checklist:', e);
      allBtns.forEach(function (b) { b.disabled = false; });
    }
  }

  // Marcar visualmente el checklist como contestado y actualizar KPIs
  function _markAsAnswered(item, btnEl, respuesta, idKpi, respuestaEsperada) {
    item.classList.add('ya-contestado');
    btnEl.classList.add('active');
    if (respuesta === 1) {
      item.classList.add('chk-respondido-si');
    } else {
      item.classList.add('chk-respondido-no');
    }
    if (idKpi) {
      _updateKpiGauge(idKpi, respuesta === respuestaEsperada);
    }
  }

  // Función expuesta globalmente para finalizar el guardado tras una incidencia exitosa
  window.dashboardChecklist.finalize = async function() {
    if (!window.dashboardChecklist.pending) return;
    
    const p = window.dashboardChecklist.pending;
    try {
      const res = await $.ajax({
        url: API_DASHBOARD,
        type: 'POST',
        data: { op: 'responderChecklist', idChecklist: p.idChecklist, respuesta: p.respuesta }
      });
      _markAsAnswered(p.item, p.btnEl, p.respuesta, p.idKpi, p.respuestaEsperada);
    } catch (e) {
      console.error('Error al finalizar checklist tras incidencia:', e);
      p.allBtns.forEach(function (b) { b.disabled = false; });
    } finally {
      window.dashboardChecklist.pending = null;
    }
  };

  // Escuchar cierre de modal para resetear si no se guardó
  $(document).ready(function() {
    $('#modalIncidencia').on('hidden.bs.modal', function () {
      if (window.dashboardChecklist.pending) {
        // Si sigue pendiente después de cerrar el modal, es que no se guardó la incidencia
        window.dashboardChecklist.pending.allBtns.forEach(function (b) {
          b.disabled = false;
        });
        window.dashboardChecklist.pending = null;
      }
    });
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function _escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

})();
