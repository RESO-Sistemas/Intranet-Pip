// ─── Dashboard: KPI Gauges + Eventos + Checklist ────────────────────────────
(function () {
  'use strict';

  const API_DASHBOARD = 'Backend/Dashboard/App.php';
  let kpiCharts = [];      // { chart, idKpi, total, cumplidos }
  let kpiDataArr = [];     // datos crudos de KPIs
  let checklistsData = []; // datos de checklists para mapeo
  let kpiPage = 0;
  const KPI_VISIBLE = 3;

  // ─── Init ────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
      _fetchKpis(),
      _fetchEventos(),
      _fetchChecklists()
    ]);
  });

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
    var W = 200, H = 115, CX = 100, CY = 105;
    var R = 85;

    // Rebanadas rellenas (de izquierda a derecha: rojo, amarillo, verde)
    // 0% = 180°, 40% = 108°, 75% = 45°, 100% = 0°
    var wedgeRojo  = _wedge(CX, CY, R, 108, 180, '#dc3545');
    var wedgeAmar  = _wedge(CX, CY, R, 45, 108, '#ffc407');
    var wedgeVerde = _wedge(CX, CY, R, 0, 45, '#28a745');

    // Separadores blancos entre zonas
    function sepLine(deg) {
      var rad = deg * Math.PI / 180;
      var x = CX + R * Math.cos(rad), y = CY - R * Math.sin(rad);
      return '<line x1="' + CX + '" y1="' + CY + '" x2="' + x + '" y2="' + y + '" stroke="#fff" stroke-width="2"/>';
    }

    // Aguja: 0% → 180°, 100% → 0°
    var needleDeg = 180 - (pct / 100) * 180;
    var needleRad = needleDeg * Math.PI / 180;
    var needleLen = R - 12;
    var nx = CX + needleLen * Math.cos(needleRad);
    var ny = CY - needleLen * Math.sin(needleRad);
    var bRad1 = needleRad + Math.PI / 2;
    var bRad2 = needleRad - Math.PI / 2;
    var bx1 = CX + 5 * Math.cos(bRad1), by1 = CY - 5 * Math.sin(bRad1);
    var bx2 = CX + 5 * Math.cos(bRad2), by2 = CY - 5 * Math.sin(bRad2);

    var color = pct < 40 ? '#dc3545' : (pct < 75 ? '#e6a817' : '#28a745');

    // Círculo blanco interior para dar forma de dona
    var innerR = 45;

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
      wedgeRojo + wedgeAmar + wedgeVerde +
      // Círculo interior blanco (recorta centro → forma de dona)
      '<circle cx="' + CX + '" cy="' + CY + '" r="' + innerR + '" fill="#fff"/>' +
      // Separadores
      sepLine(108) + sepLine(45) +
      // Línea base horizontal
      '<line x1="' + (CX - R) + '" y1="' + CY + '" x2="' + (CX + R) + '" y2="' + CY + '" stroke="#fff" stroke-width="3"/>' +
      // Aguja
      '<polygon points="' + nx + ',' + ny + ' ' + bx1 + ',' + by1 + ' ' + bx2 + ',' + by2 + '" fill="#333"/>' +
      '<circle cx="' + CX + '" cy="' + CY + '" r="7" fill="#444"/>' +
      '<circle cx="' + CX + '" cy="' + CY + '" r="3.5" fill="#fff"/>' +
      // Porcentaje dentro del centro
      '<text x="' + CX + '" y="' + (CY - 14) + '" text-anchor="middle" font-size="18" font-weight="700" font-family="sans-serif" fill="' + color + '">' + pct + '%</text>' +
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
      var pct = total > 0 ? Math.round((cumplidos / total) * 100) : 0;

      var card = document.createElement('div');
      card.className = 'kpi-gauge-card';
      card.setAttribute('data-kpi-id', kpi.IdKpi);
      card.innerHTML =
        '<div id="kpiChart' + i + '">' + _buildGaugeSVG(pct) + '</div>' +
        '<div class="kpi-name" title="' + _escapeHtml(kpi.NombreKpi) + '">' + _escapeHtml(kpi.NombreKpi) + '</div>' +
        '<div class="kpi-fraction" id="kpiFraction' + i + '">' + cumplidos + ' / ' + total + ' tareas</div>';
      container.appendChild(card);

      kpiCharts.push({
        idKpi: kpi.IdKpi,
        total: total,
        cumplidos: cumplidos,
        index: i
      });
    });

    _setupCarousel(kpis.length);
  }

  // Actualizar una gráfica en tiempo real
  function _updateKpiGauge(idKpi) {
    var entry = kpiCharts.find(function (c) { return c.idKpi == idKpi; });
    if (!entry) return;

    entry.cumplidos++;
    var pct = entry.total > 0 ? Math.round((entry.cumplidos / entry.total) * 100) : 0;

    // Re-render SVG gauge
    var chartEl = document.getElementById('kpiChart' + entry.index);
    if (chartEl) chartEl.innerHTML = _buildGaugeSVG(pct);

    // Actualizar texto
    var fractionEl = document.getElementById('kpiFraction' + entry.index);
    if (fractionEl) {
      fractionEl.textContent = entry.cumplidos + ' / ' + entry.total + ' tareas';
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
    var cardWidth = container.children[0] ? container.children[0].offsetWidth + 16 : 236;
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

    var html = '';
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
    try {
      // Deshabilitar ambos botones
      allBtns.forEach(function (b) { b.disabled = true; });

      const res = await $.ajax({
        url: API_DASHBOARD,
        type: 'POST',
        data: { op: 'responderChecklist', idChecklist: idChecklist, respuesta: respuesta }
      });
      var data = JSON.parse(res);
      if (data.Resultado) {
        item.classList.add('ya-contestado');
        btnEl.classList.add('active');

        if (respuesta === 1) {
          item.classList.add('chk-respondido-si');
        } else {
          item.classList.add('chk-respondido-no');
        }

        // Actualizar gráfica en tiempo real si la respuesta coincide con la esperada
        if (respuesta === respuestaEsperada && idKpi) {
          _updateKpiGauge(idKpi);
        }
      }
    } catch (e) {
      console.error('Error al responder checklist:', e);
      allBtns.forEach(function (b) { b.disabled = false; });
      if (typeof Swal !== 'undefined') {
        Swal.fire('Error', 'No se pudo registrar la respuesta', 'error');
      }
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function _escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

})();
