// ─── Dashboard: KPI Gauges + Eventos + Checklist ────────────────────────────
(function () {
  'use strict';

  const API_DASHBOARD = 'Backend/Dashboard/App.php';
  let kpiCharts = [];      // { chart, idKpi, total, cumplidos }
  let kpiDataArr = [];     // datos crudos de KPIs
  let checklistsData = []; // datos de checklists para mapeo
  let turnosData = [];     // datos de turnos para mapeo
  let kpiPage = 0;
  const KPI_VISIBLE = 3;
  window.dashboardChecklist = { pending: null };

  // ─── Init ────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', async function () {
    // Una sola petición para todo el dashboard
    try {
      const res = await $.ajax({ url: API_DASHBOARD, type: 'POST', data: { op: 'getDashboardAll' }, dataType: 'json' });
      turnosData = res.turnos || [];
      kpiDataArr = res.kpis || [];
      _renderKpiGauges(kpiDataArr);
      _renderEventos(res.eventos || []);
      checklistsData = res.checklists || [];
      _renderChecklists(checklistsData);
    } catch (e) {
      console.error('Error cargando dashboard:', e);
      // Fallback: intentar cargar por separado
      await Promise.all([
        _fetchTurnos(),
        _fetchKpis(),
        _fetchEventos(),
        _fetchChecklists()
      ]);
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
  // KPI GAUGES con 3 zonas de color (rojo · amarillo · verde)
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

  // ─── SVG Gauge (semicírculo con 3 rebanadas de color rellenas) ─────────
  function _wedge(cx, cy, r, startDeg, endDeg, color) {
    var s = startDeg * Math.PI / 180;
    var e = endDeg   * Math.PI / 180;
    var x1 = cx + r * Math.cos(s), y1 = cy - r * Math.sin(s);
    var x2 = cx + r * Math.cos(e), y2 = cy - r * Math.sin(e);
    var lg = (endDeg - startDeg) > 180 ? 1 : 0;
    return '<path d="M ' + cx + ' ' + cy +
      ' L ' + x1 + ' ' + y1 +
      ' A ' + r + ' ' + r + ' 0 ' + lg + ' 0 ' + x2 + ' ' + y2 +
      ' Z" fill="' + color + '"/>';
  }

  function _buildGaugeSVG(pct) {
    var W = 200, H = 115, CX = 100, CY = 105, R = 85;
    var ID = Math.floor(Math.random() * 10000);

    function _wedge(cx, cy, r, startDeg, endDeg, fill, hasGloss = true) {
      var s = startDeg * Math.PI / 180, e = endDeg * Math.PI / 180;
      var x1 = cx + r * Math.cos(s), y1 = cy - r * Math.sin(s);
      var x2 = cx + r * Math.cos(e), y2 = cy - r * Math.sin(e);
      var lg = (endDeg - startDeg) > 180 ? 1 : 0;
      
      // Base arc with shadow filter
      var path = '<path d="M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + lg + ' 0 ' + x2 + ' ' + y2 + ' Z" fill="' + fill + '" filter="url(#shadowDash' + ID + ')"/>';
      
      // Glossy reflection overlay
      if (hasGloss) {
        var rInner = r * 0.75;
        var x1g = cx + rInner * Math.cos(s), y1g = cy - rInner * Math.sin(s);
        var x2g = cx + rInner * Math.cos(e), y2g = cy - rInner * Math.sin(e);
        path += '<path d="M ' + x1g + ' ' + y1g + ' A ' + rInner + ' ' + rInner + ' 0 ' + lg + ' 0 ' + x2g + ' ' + y2g + ' L ' + x2 + ' ' + y2 + ' A ' + r + ' ' + r + ' 0 ' + lg + ' 1 ' + x1 + ' ' + y1 + ' Z" fill="url(#glossGradDash' + ID + ')" opacity="0.6"/>';
      }
      return path;
    }

    function sepLine(deg) {
      var rad = deg * Math.PI / 180;
      var x = CX + R * Math.cos(rad), y = CY - R * Math.sin(rad);
      return '<line x1="' + CX + '" y1="' + CY + '" x2="' + x + '" y2="' + y + '" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>';
    }

    var txtColor = pct < 40 ? '#e74c3c' : (pct < 75 ? '#d68910' : '#229954');

    return '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1))">' +
      '<defs>' +
        '<linearGradient id="redGD' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ff9a9e" /><stop offset="50%" stop-color="#ff4b2b" /><stop offset="100%" stop-color="#c0392b" />' +
        '</linearGradient>' +
        '<linearGradient id="yelGD' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#ffeaa7" /><stop offset="50%" stop-color="#feca28" /><stop offset="100%" stop-color="#f39c12" />' +
        '</linearGradient>' +
        '<linearGradient id="greGD' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#b8e994" /><stop offset="50%" stop-color="#2ecc71" /><stop offset="100%" stop-color="#218c74" />' +
        '</linearGradient>' +
        '<linearGradient id="glossGradDash' + ID + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="white" stop-opacity="0.5"/><stop offset="100%" stop-color="white" stop-opacity="0"/>' +
        '</linearGradient>' +
        '<filter id="shadowDash' + ID + '" x="-20%" y="-20%" width="140%" height="140%">' +
          '<feGaussianBlur in="SourceAlpha" stdDeviation="1.5" /><feOffset dx="0" dy="1" /><feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>' +
        '</filter>' +
      '</defs>' +
      _wedge(CX, CY, R, 108, 180, 'url(#redGD' + ID + ')') +
      _wedge(CX, CY, R, 45, 108, 'url(#yelGD' + ID + ')') +
      _wedge(CX, CY, R, 0, 45, 'url(#greGD' + ID + ')') +
      /* Semicírculo blanco central - Ahora recortado a la mitad */
      '<path d="M ' + (CX - 45) + ' ' + CY + ' A 45 45 0 0 1 ' + (CX + 45) + ' ' + CY + ' Z" fill="#fff"/>' +
      sepLine(108) + sepLine(45) +
      '<line x1="' + (CX - R) + '" y1="' + CY + '" x2="' + (CX + R) + '" y2="' + CY + '" stroke="#fff" stroke-width="3"/>' +
      '<polygon points="' + (CX + (R-12) * Math.cos((180 - (pct / 100) * 180) * Math.PI / 180)) + ',' + (CY - (R-12) * Math.sin((180 - (pct / 100) * 180) * Math.PI / 180)) + ' ' + (CX + 5 * Math.cos((180 - (pct / 100) * 180) * Math.PI / 180 + Math.PI/2)) + ',' + (CY - 5 * Math.sin((180 - (pct / 100) * 180) * Math.PI / 180 + Math.PI/2)) + ' ' + (CX + 5 * Math.cos((180 - (pct / 100) * 180) * Math.PI / 180 - Math.PI/2)) + ',' + (CY - 5 * Math.sin((180 - (pct / 100) * 180) * Math.PI / 180 - Math.PI/2)) + '" fill="#333"/>' +
      '<circle cx="' + CX + '" cy="' + CY + '" r="7" fill="#444"/>' +
      '<circle cx="' + CX + '" cy="' + CY + '" r="3.5" fill="#fff"/>' +
      '<text x="' + CX + '" y="' + (CY - 14) + '" text-anchor="middle" font-size="23" font-weight="700" font-family="sans-serif" fill="' + txtColor + '">' + pct + '%</text>' +
      '</svg>';

    return svg;
  }

  function _renderKpiGauges(kpis) {
    var container = document.getElementById('kpiCarouselContainer');
    if (!container) return;

    if (!kpis || kpis.length === 0) {
      container.innerHTML = '<p class="text-muted small text-center w-100 py-3">No hay KPIs asignados a tu puesto</p>';
      return;
    }

    container.innerHTML = '';
    kpiCharts = [];

    kpis.forEach(function (kpi, i) {
      var total = parseInt(kpi.TotalChecklists) || 0;
      var cumplidos = parseInt(kpi.ChecklistsCumplidos) || 0;
      var respondidos = parseInt(kpi.ChecklistsRespondidos) || 0;
      var pct = total > 0 ? Math.round((cumplidos / total) * 100) : 0;

      var card = document.createElement('div');
      card.className = 'kpi-gauge-card';
      card.setAttribute('data-kpi-id', kpi.IdKpi);
      card.innerHTML =
        '<div id="kpiChart' + i + '">' + _buildGaugeSVG(pct) + '</div>' +
        '<div class="kpi-name" title="' + _escapeHtml(kpi.NombreKpi) + '">' + _escapeHtml(kpi.NombreKpi) + '</div>' +
        '<div class="kpi-fraction" id="kpiFraction' + i + '">' + respondidos + ' de ' + total + ' checklists respondidos</div>';
      container.appendChild(card);

      kpiCharts.push({
        idKpi: kpi.IdKpi,
        total: total,
        cumplidos: cumplidos,
        respondidos: respondidos,
        index: i
      });
    });

    _setupCarousel(kpis.length);
  }

  // Actualizar una gráfica en tiempo real
  function _updateKpiGauge(idKpi, esCorrecta) {
    var entry = kpiCharts.find(function (c) { return c.idKpi == idKpi; });
    if (!entry) return;

    entry.respondidos = (entry.respondidos || 0) + 1;
    if (esCorrecta) {
      entry.cumplidos++;
    }
    
    var pct = entry.total > 0 ? Math.round((entry.cumplidos / entry.total) * 100) : 0;

    // Re-render SVG gauge
    var chartEl = document.getElementById('kpiChart' + entry.index);
    if (chartEl) chartEl.innerHTML = _buildGaugeSVG(pct);

    // Actualizar texto
    var fractionEl = document.getElementById('kpiFraction' + entry.index);
    if (fractionEl) {
      fractionEl.textContent = entry.respondidos + ' de ' + entry.total + ' checklists respondidos';
    }
  }

  function _setupCarousel(total) {
    var btnPrev = document.getElementById('kpiBtnPrev');
    var btnNext = document.getElementById('kpiBtnNext');
    if (!btnPrev || !btnNext) return;

    if (total <= KPI_VISIBLE) {
      btnPrev.style.display = 'none';
      btnNext.style.display = 'none';
      return;
    }

    btnNext.style.display = 'flex';
    btnPrev.style.display = 'none';
    var maxPage = Math.ceil(total / KPI_VISIBLE) - 1;
    kpiPage = 0;

    btnNext.onclick = function () {
      if (kpiPage < maxPage) { kpiPage++; _slideKpis(); }
    };
    btnPrev.onclick = function () {
      if (kpiPage > 0) { kpiPage--; _slideKpis(); }
    };
  }

  function _slideKpis() {
    var container = document.getElementById('kpiCarouselContainer');
    if (!container) return;
    var cardWidth = container.children[0] ? container.children[0].offsetWidth + 12 : 252;
    var offset = kpiPage * KPI_VISIBLE * cardWidth;
    container.style.transform = 'translateX(-' + offset + 'px)';

    var btnPrev = document.getElementById('kpiBtnPrev');
    var btnNext = document.getElementById('kpiBtnNext');
    var maxPage = Math.ceil(container.children.length / KPI_VISIBLE) - 1;
    btnPrev.style.display = kpiPage > 0 ? 'flex' : 'none';
    btnNext.style.display = kpiPage < maxPage ? 'flex' : 'none';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRÓXIMOS EVENTOS
  // ═══════════════════════════════════════════════════════════════════════════
  async function _fetchEventos() {
    try {
      const res = await $.ajax({ url: API_DASHBOARD, type: 'POST', data: { op: 'getProximosEventos' } });
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

    eventos.forEach(function (ev) {
      var fecha = new Date(ev.FechaInicio + 'T00:00:00');
      var dia = fecha.getDate();
      var mes = meses[fecha.getMonth()];
      var horaIni = ev.HoraInicio ? ev.HoraInicio.substring(0, 5) : '';
      var horaFin = ev.HoraFin ? ev.HoraFin.substring(0, 5) : '';
      var horario = horaIni && horaFin ? horaIni + ' - ' + horaFin : (horaIni || '');

      html += '<div class="evento-item">' +
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
    // Render badge-primary next to header
    var html = '<div class="turno-header d-flex align-items-center">' +
      '<i class="fas fa-clipboard-check me-2" style="color: #ffc407;"></i>' +
      '<span class="fw-bold mb-0">Mi Checklist del Día</span>' +
      '<span class="badge badge-primary ms-2">' + turnoLabel + '</span>' +
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
          confirmButtonColor: '#ffc407',
          cancelButtonColor: '#d33',
          background: '#ffffff',
          color: '#2c3e50',
          iconColor: '#ffc407',
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
