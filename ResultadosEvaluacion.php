<?php include("AutorizaPagina.php"); ?>
<?php $embed = isset($_GET['embed']); ?>
<?php if ($embed): ?>
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include("neptune_styles.php"); ?>
    <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
      rel="stylesheet">
    <style>
      /* ── Reset embed ── */
      body {
        padding: 0;
        margin: 0;
        background: #F8FAFC;
        font-family: 'DM Sans', sans-serif;
      }

      /* ── Loader ── */
      #embedLoader {
        position: fixed;
        inset: 0;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        gap: 14px;
      }

      /* ── Material Symbol helper ── */
      .ms {
        font-family: 'Material Symbols Outlined';
        font-size: 18px;
        font-style: normal;
        line-height: 1;
        vertical-align: middle;
      }

      .ms-sm {
        font-size: 15px;
      }

      .ms-lg {
        font-size: 22px;
      }

      /* ── Barra de título principal ── */
      .res-page-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0.85rem 1.25rem;
        background: #fff;
        border-bottom: 1px solid #E9EEF5;
        margin-bottom: 0;
      }

      .res-page-header-icon {
        width: 36px;
        height: 36px;
        background: #D1FAE5;
        color: #047857;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .res-page-header-label {
        font-size: 0.73rem;
        font-weight: 700;
        color: #94A3B8;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        line-height: 1.2;
      }

      .res-page-header-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1E293B;
        margin: 0;
        line-height: 1.3;
      }

      /* ── Contenedor principal ── */
      .res-main-wrap {
        padding: 1rem 1rem 1.5rem;
      }

      /* ══════════════════════════════════
         LISTA COMPACTA DE EVALUADOS (Alt B)
      ══════════════════════════════════ */
      .res-list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.65rem;
      }

      .res-list-label {
        font-size: 0.72rem;
        font-weight: 700;
        color: #94A3B8;
        text-transform: uppercase;
        letter-spacing: 0.6px;
      }

      .res-list-count {
        font-size: 0.72rem;
        font-weight: 600;
        color: #64748B;
        background: #F1F5F9;
        border-radius: 20px;
        padding: 2px 10px;
      }

      /* Buscador */
      .res-search-wrap {
        position: relative;
        margin-bottom: 0.75rem;
      }

      .res-search-wrap .ms {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #94A3B8;
        pointer-events: none;
      }

      .res-search-input {
        width: 100%;
        padding: 0.5rem 0.75rem 0.5rem 2.1rem;
        border: 1.5px solid #E2E8F0;
        border-radius: 9px;
        font-size: 0.85rem;
        font-family: 'DM Sans', sans-serif;
        background: #fff;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }

      .res-search-input:focus {
        border-color: #008837;
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.12);
      }

      /* Filas de la lista */
      #res-evaluados-list {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .res-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0.75rem 1rem;
        background: #fff;
        border: 1px solid #E9EEF5;
        border-bottom: none;
        transition: background 0.15s;
      }

      .res-row:first-child {
        border-radius: 12px 12px 0 0;
      }

      .res-row:last-child {
        border-bottom: 1px solid #E9EEF5;
        border-radius: 0 0 12px 12px;
      }

      .res-row:only-child {
        border-radius: 12px;
        border-bottom: 1px solid #E9EEF5;
      }

      .res-row:hover {
        background: #FAFBFF;
      }

      /* Avatar con iniciales */
      .res-row-avatar {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, #334155 0%, #475569 100%);
        color: #fff;
        font-size: 0.78rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        letter-spacing: 0.5px;
      }

      /* Info del empleado */
      .res-row-info {
        flex: 1;
        min-width: 0;
      }

      .res-row-name {
        font-size: 0.88rem;
        font-weight: 700;
        color: #1E293B;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
      }

      .res-row-sub {
        font-size: 0.75rem;
        color: #64748B;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
        margin-top: 1px;
      }

      /* Badge de estado */
      .res-row-status {
        flex-shrink: 0;
      }

      .res-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.72rem;
        font-weight: 700;
        white-space: nowrap;
      }

      .res-status-badge.complete {
        background: #DCFCE7;
        color: #15803D;
      }

      .res-status-badge.pending {
        background: #FEF9C3;
        color: #854D0E;
      }

      /* Acciones */
      .res-row-actions {
        display: flex;
        gap: 6px;
        flex-shrink: 0;
      }

      .res-action-btn {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        border: 1.5px solid;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s, color 0.15s;
        background: transparent;
      }

      .res-action-btn.detail {
        border-color: #CBD5E1;
        color: #64748B;
      }

      .res-action-btn.detail:hover {
        background: #F1F5F9;
        color: #334155;
        border-color: #94A3B8;
      }

      .res-action-btn.results {
        border-color: #BBF7D0;
        color: #15803D;
        background: #F0FDF4;
      }

      .res-action-btn.results:hover {
        background: #DCFCE7;
        border-color: #86EFAC;
      }

      .res-action-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }

      /* Tooltip nativo */
      .res-action-btn[title] {
        position: relative;
      }

      /* Estado vacío */
      .res-empty {
        text-align: center;
        padding: 2.5rem 1rem;
        background: #fff;
        border: 1px solid #E9EEF5;
        border-radius: 12px;
      }

      .res-empty .ms {
        font-size: 36px;
        color: #CBD5E1;
        display: block;
        margin-bottom: 8px;
      }

      .res-empty p {
        font-size: 0.85rem;
        color: #94A3B8;
        margin: 0;
      }

      /* ══════════════════════════════════
         PANEL SLIDE-IN: RESULTADO GENERAL
      ══════════════════════════════════ */
      .res-general-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.35);
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
        z-index: 1088;
      }

      .res-general-backdrop.is-open {
        opacity: 1;
        pointer-events: auto;
      }

      #modalGeneralDetail {
        position: fixed;
        top: 0;
        right: 0;
        width: min(1360px, 100vw);
        height: 100vh;
        background: #F8FAFC;
        transform: translateX(102%);
        transition: transform 0.28s cubic-bezier(0.2, 0.7, 0.2, 1);
        z-index: 1095;
        box-shadow: -16px 0 44px rgba(15, 23, 42, 0.22);
        display: flex;
        flex-direction: column;
        border-left: 1px solid #E2E8F0;
      }

      #modalGeneralDetail.is-open {
        transform: translateX(0);
      }

      #modalGeneralDetail .res-general-header {
        padding: 0;
        border: none;
        flex-shrink: 0;
      }

      .res-hero {
        background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
        padding: 1.15rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .res-hero-left {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .res-hero-avatar {
        width: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: #fff;
      }

      .res-hero-name {
        font-size: 0.97rem;
        font-weight: 700;
        color: #fff;
        margin: 0;
      }

      .res-hero-meta {
        font-size: 0.76rem;
        color: #94A3B8;
        margin: 0;
      }

      .res-hero-right {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }

      .res-hero-badge {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #E2E8F0;
        border-radius: 8px;
        padding: 4px 11px;
        font-size: 0.76rem;
        font-weight: 600;
      }

      .res-hero-badge.score {
        background: #008837;
        border-color: #008837;
        color: #1C1917;
        font-size: 0.85rem;
        font-weight: 700;
      }

      .res-hero-close {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #fff;
        border-radius: 8px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
        flex-shrink: 0;
      }

      .res-hero-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      /* Info strip bajo el hero */
      .res-emp-info-card {
        border-bottom: 1px solid #F1F5F9;
        background: #FAFBFF;
      }

      .res-emp-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      }

      .res-emp-info-cell {
        padding: 0.65rem 1.1rem;
        border-right: 1px solid #F1F5F9;
      }

      .res-emp-info-cell:last-child {
        border-right: none;
      }

      .res-emp-info-key {
        font-size: 0.68rem;
        font-weight: 700;
        color: #94A3B8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .res-emp-info-val {
        font-size: 0.85rem;
        font-weight: 600;
        color: #1E293B;
      }

      /* Tabs */
      .res-modal-tabs {
        display: flex;
        gap: 0;
        background: #fff;
        border-bottom: 1px solid #E9EEF5;
        padding: 0 1.25rem;
        overflow-x: auto;
      }

      .res-modal-tab {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 0.72rem 1rem;
        font-size: 0.82rem;
        font-weight: 600;
        color: #64748B;
        border: none;
        background: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        white-space: nowrap;
        transition: color 0.2s, border-color 0.2s;
      }

      .res-modal-tab.active {
        color: #047857;
        border-bottom-color: #047857;
      }

      .res-modal-tab:hover:not(.active) {
        color: #475569;
      }

      #selTypeResult-wrapper {
        display: none !important;
      }

      /* KPI strip en panel general */
      .res-kpi-strip {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 0.65rem;
        padding: 0.85rem 1rem;
        background: #fff;
        border-bottom: 1px solid #E2E8F0;
      }

      .res-kpi-card {
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        background: #FAFBFF;
        padding: 0.55rem 0.65rem;
        min-height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
      }

      .res-kpi-label {
        font-size: 0.65rem;
        color: #64748B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 700;
      }

      .res-kpi-value {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1E293B;
        line-height: 1.2;
      }

      .res-kpi-sub {
        font-size: 0.72rem;
        color: #64748B;
        line-height: 1.2;
      }

      .res-kpi-value.good {
        color: #15803D;
      }

      .res-kpi-value.warn {
        color: #B45309;
      }

      .res-kpi-value.bad {
        color: #B91C1C;
      }

      @media (max-width: 1200px) {
        .res-kpi-strip {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      @media (max-width: 768px) {
        .res-kpi-strip {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 480px) {
        .res-kpi-strip {
          grid-template-columns: 1fr;
        }
      }

      #modalGeneralDetail .res-general-body {
        padding: 0;
        overflow-y: auto;
        flex: 1;
        min-height: 0;
      }

      /* Layout 2 columnas */
      .res-two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.1rem;
        padding: 1.1rem;
      }

      @media (max-width: 768px) {
        .res-two-col {
          grid-template-columns: 1fr;
        }
      }

      .res-panel {
        background: #fff;
        border: 1px solid #E9EEF5;
        border-radius: 12px;
        overflow: hidden;
      }

      .res-panel-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0.65rem 0.9rem;
        border-bottom: 1px solid #F1F5F9;
        background: #FAFBFF;
      }

      .res-panel-icon {
        width: 26px;
        height: 26px;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .res-panel-icon.amber {
        background: #D1FAE5;
        color: #047857;
      }

      .res-panel-icon.teal {
        background: #CCFBF1;
        color: #0D9488;
      }

      .res-panel-icon.green {
        background: #DCFCE7;
        color: #16A34A;
      }

      .res-panel-icon.indigo {
        background: #EEF2FF;
        color: #4338CA;
      }

      .res-panel-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: #1E293B;
        margin: 0;
      }

      .res-panel-body {
        padding: 0.75rem 0.9rem;
      }

      .res-radar-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        padding: 0.75rem;
      }

      .res-radar-wrap>div {
        width: 100% !important;
        min-height: 280px;
      }

      .res-sw-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.65rem;
        margin-top: 0.75rem;
      }

      @media (max-width: 576px) {
        .res-sw-grid {
          grid-template-columns: 1fr;
        }
      }

      .res-sw-card {
        border-radius: 10px;
        padding: 0.65rem 0.75rem;
        border: 1px solid;
      }

      .res-sw-card.strengths {
        background: #F0FDF4;
        border-color: #BBF7D0;
      }

      .res-sw-card.weaknesses {
        background: #FFF7ED;
        border-color: #FED7AA;
      }

      .res-sw-card-title {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.45rem;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .res-sw-card.strengths .res-sw-card-title {
        color: #15803D;
      }

      .res-sw-card.weaknesses .res-sw-card-title {
        color: #C2410C;
      }

      /* ══════════════════════════════════
         PANEL SLIDE-IN: DETALLE POR EVALUADOR
      ══════════════════════════════════ */
      .res-detail-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.35);
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
        z-index: 1090;
      }

      .res-detail-backdrop.is-open {
        opacity: 1;
        pointer-events: auto;
      }

      #detailContainer {
        position: fixed;
        top: 0;
        right: 0;
        width: min(1240px, 100vw);
        height: 100vh;
        background: #F8FAFC;
        transform: translateX(102%);
        transition: transform 0.28s cubic-bezier(0.2, 0.7, 0.2, 1);
        z-index: 1100;
        box-shadow: -16px 0 44px rgba(15, 23, 42, 0.22);
        display: flex;
        flex-direction: column;
        border-left: 1px solid #E2E8F0;
      }

      #detailContainer.is-open {
        transform: translateX(0);
      }

      #detailContainer .res-detail-panel-header {
        padding: 0;
        border: none;
        flex-shrink: 0;
      }

      #detailContainer .res-detail-panel-body {
        padding: 0;
        overflow-y: auto;
        flex: 1;
        min-height: 0;
      }

      .res-detail-hero {
        background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
        border-bottom: 1px solid #E2E8F0;
        padding: 0.95rem 1rem;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: start;
        gap: 0.7rem 0.9rem;
      }

      .res-detail-hero-left {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .res-detail-hero-avatar {
        width: 40px;
        height: 40px;
        background: rgba(245, 158, 11, 0.18);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #008837;
        flex-shrink: 0;
      }

      .res-detail-hero-name {
        font-size: 0.96rem;
        font-weight: 700;
        color: #1E293B;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }

      .res-detail-hero-meta {
        font-size: 0.78rem;
        color: #64748B;
        margin: 1px 0 0;
      }

      .res-detail-close {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        border: 1.5px solid #CBD5E1;
        background: #fff;
        color: #475569;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .res-detail-close:hover {
        background: #F1F5F9;
        border-color: #94A3B8;
      }

      .res-detail-hero-actions {
        grid-column: 1 / -1;
        width: min(540px, 100%);
      }

      .res-detail-evaluator-label {
        display: block;
        font-size: 0.72rem;
        color: #64748B;
        font-weight: 700;
        margin-bottom: 0.3rem;
        letter-spacing: 0.35px;
        text-transform: uppercase;
      }

      .res-detail-hero-actions #slc_evaluated_by {
        width: 100%;
        border: 1.5px solid #CBD5E1;
        border-radius: 10px;
        padding: 0.45rem 0.6rem;
        font-size: 0.9rem;
        color: #1E293B;
        background: #fff;
      }

      .res-detail-hero-actions #slc_evaluated_by:focus {
        border-color: #008837;
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
      }

      .res-detail-hero-actions .select2-container {
        width: 100% !important;
      }

      .res-detail-hero-actions .select2-container--default .select2-selection--single {
        border: 1.5px solid #CBD5E1 !important;
        border-radius: 10px !important;
        height: 42px !important;
        background: #fff !important;
      }

      .res-detail-hero-actions .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 40px !important;
        color: #1E293B !important;
        font-size: 0.9rem !important;
        padding-left: 12px !important;
        padding-right: 34px !important;
      }

      .res-detail-hero-actions .select2-container--default .select2-selection--single .select2-selection__arrow {
        height: 40px !important;
        right: 8px !important;
      }

      @media (max-width: 768px) {
        .res-detail-hero {
          grid-template-columns: 1fr;
        }

        .res-detail-close {
          justify-self: end;
        }
      }

      .res-detail-body {
        padding: 1.1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.1rem;
      }

      @media (max-width: 768px) {
        .res-detail-body {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>

  <body>
    <div id="embedLoader">
      <div class="spinner-border text-warning" style="width:2.2rem;height:2.2rem;" role="status"><span
          class="visually-hidden">Cargando...</span></div>
      <p class="text-muted mb-0" style="font-size:0.85rem;">Cargando resultados...</p>
    </div>
    <script>window.addEventListener('load', function () { var e = document.getElementById('embedLoader'); if (e) e.style.display = 'none'; });</script>

    <!-- ── Encabezado de página ── -->
    <div class="res-page-header">
      <div class="res-page-header-icon">
        <span class="ms ms-lg">monitoring</span>
      </div>
      <div>
        <div class="res-page-header-label">Resultados de Evaluación</div>
        <div class="res-page-header-title" id="ev_selected">Cargando...</div>
      </div>
    </div>

    <!-- ── Lista compacta de evaluados (Alt B) ── -->
    <div class="res-main-wrap">
      <div class="res-list-header">
        <span class="res-list-label">Empleados evaluados</span>
        <span class="res-list-count" id="res-list-count">0</span>
      </div>
      <div class="res-search-wrap">
        <span class="ms ms-sm">search</span>
        <input type="text" id="res-search" class="res-search-input" placeholder="Buscar empleado...">
      </div>
      <div id="res-evaluados-list">
        <!-- Se renderizan por JS -->
      </div>
      <!-- principalTable oculto — mantiene compatibilidad con templates jsrender -->
      <div id="principalTable" style="display:none;"></div>
    </div>

    <!-- ════════════════════════════════════════════════════════════
       PANEL SLIDE-IN: RESULTADO GENERAL
  ═════════════════════════════════════════════════════════════ -->
    <div id="modalGeneralDetailBackdrop" class="res-general-backdrop"></div>
    <div id="modalGeneralDetail" aria-labelledby="modalGeneralDetailLabel" aria-hidden="true">

      <div class="res-general-header">
        <div class="res-hero w-100">
          <div class="res-hero-left">
            <div class="res-hero-avatar"><span class="ms ms-lg">person_4</span></div>
            <div>
              <p class="res-hero-name" id="modalGeneralDetailLabel">Resultado General</p>
              <p class="res-hero-meta" id="res-hero-meta-gn">—</p>
            </div>
          </div>
          <div class="res-hero-right">
            <span class="res-hero-badge" id="res-hero-badge-group">Grupo —</span>
            <span class="res-hero-badge score" id="res-hero-badge-score">—/100</span>
            <button class="res-hero-close" onclick="closeGeneralPanel()" aria-label="Cerrar">
              <span class="ms ms-sm">close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Info strip -->
      <div class="res-emp-info-card" id="finalTableEvaluated-wrap" style="display:none;">
        <div class="res-emp-info-grid" id="res-emp-info-grid-gn"></div>
      </div>
      <div id="finalTableEvaluated" style="display:none;"></div>

      <!-- Tabs -->
      <div class="res-modal-tabs">
        <button class="res-modal-tab active" data-val="1">
          <span class="ms ms-sm">workspace_premium</span> Resumen Global
        </button>
        <button class="res-modal-tab" data-val="2">
          <span class="ms ms-sm">calculate</span> Cálculo
        </button>
        <button class="res-modal-tab" data-val="3">
          <span class="ms ms-sm">group</span> Pares y Subordinados
        </button>
      </div>

      <div class="res-kpi-strip" id="resKpiStrip">
        <div class="res-kpi-card">
          <div class="res-kpi-label">Cobertura</div>
          <div class="res-kpi-value" id="kpiCoverage">-</div>
          <div class="res-kpi-sub" id="kpiCoverageSub">-</div>
        </div>
        <div class="res-kpi-card">
          <div class="res-kpi-label">Distribución Tipos</div>
          <div class="res-kpi-value" id="kpiTypes">-</div>
          <div class="res-kpi-sub" id="kpiTypesSub">-</div>
        </div>
        <div class="res-kpi-card">
          <div class="res-kpi-label">Última Respuesta</div>
          <div class="res-kpi-value" id="kpiLastUpdate">-</div>
          <div class="res-kpi-sub" id="kpiLastUpdateSub">-</div>
        </div>
        <div class="res-kpi-card">
          <div class="res-kpi-label">Delta vs Promedio</div>
          <div class="res-kpi-value" id="kpiDelta">-</div>
          <div class="res-kpi-sub" id="kpiDeltaSub">-</div>
        </div>
        <div class="res-kpi-card">
          <div class="res-kpi-label">Estabilidad</div>
          <div class="res-kpi-value" id="kpiStability">-</div>
          <div class="res-kpi-sub" id="kpiStabilitySub">-</div>
        </div>
      </div>

      <div id="selTypeResult-wrapper">
        <select id="selTypeResult">
          <option value="1">FORTALEZAS Y ÁREAS A MEJORAR</option>
          <option value="2">CÁLCULO</option>
          <option value="3">PARES Y SUBORDINADOS</option>
        </select>
      </div>

      <div class="res-general-body" id="container-generalDetail">
        <div id="contentAllResultsFinal" style="display:none;"></div>

        <div class="dv_ContentAllResults">

          <!-- Resumen Global -->
          <div id="gn_moreInfo">
            <div class="res-two-col">
              <div>
                <div class="res-panel">
                  <div class="res-panel-header">
                    <div class="res-panel-icon amber"><span class="ms ms-sm">checklist</span></div>
                    <span class="res-panel-title">Competencias</span>
                  </div>
                  <div class="res-panel-body">
                    <div id="total_General"></div>
                  </div>
                </div>
                <div class="res-sw-grid">
                  <div class="res-sw-card strengths">
                    <div class="res-sw-card-title"><span class="ms ms-sm">star</span> Fortalezas</div>
                    <div id="table_strengths"></div>
                  </div>
                  <div class="res-sw-card weaknesses">
                    <div class="res-sw-card-title"><span class="ms ms-sm">trending_up</span> Áreas a Mejorar</div>
                    <div id="table_areasForImprovement"></div>
                  </div>
                </div>
              </div>
              <div class="res-panel">
                <div class="res-panel-header">
                  <div class="res-panel-icon indigo"><span class="ms ms-sm">radar</span></div>
                  <span class="res-panel-title">Evaluación de Desempeño</span>
                </div>
                <div class="res-radar-wrap">
                  <div id="graph_total_General"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cálculo -->
          <div id="gn_calculo" style="display:none; padding:1.1rem;">
            <div id="dv_GeneralInfo"></div>
            <div id="dvFisrtPage"></div>
          </div>

          <!-- Pares y Subordinados -->
          <div id="gn_par_sub" style="display:none; padding:1.1rem;">
            <div class="res-panel mb-3">
              <div class="res-panel-header">
                <div class="res-panel-icon teal"><span class="ms ms-sm">people</span></div>
                <span class="res-panel-title">Resultados Individuales — Pares</span>
              </div>
              <div class="res-panel-body">
                <div id="dv_ind_Par"></div>
              </div>
            </div>
            <div class="res-panel">
              <div class="res-panel-header">
                <div class="res-panel-icon green"><span class="ms ms-sm">account_tree</span></div>
                <span class="res-panel-title">Resultados Individuales — Subordinados</span>
              </div>
              <div class="res-panel-body">
                <div id="dv_ind_Subordinado"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- ════════════════════════════════════════════════════════════
       PANEL SLIDE-IN: DETALLE POR EVALUADOR
  ═════════════════════════════════════════════════════════════ -->
    <div id="detailContainerBackdrop" class="res-detail-backdrop"></div>
    <div id="detailContainer" aria-labelledby="detailContainerLabel" aria-hidden="true">

      <!-- Header / Hero sticky -->
      <div class="res-detail-panel-header">
        <div class="res-detail-hero w-100">
          <div class="res-detail-hero-left">
            <div class="res-detail-hero-avatar"><span class="ms ms-lg">person</span></div>
            <div>
              <p class="res-detail-hero-name" id="detailContainerLabel">Evaluación de Desempeño</p>
              <p class="res-detail-hero-meta" id="res-detail-hero-meta">—</p>
            </div>
          </div>
          <button class="res-detail-close" onclick="closeDetailPanel()" aria-label="Cerrar">
            <span class="ms ms-sm">close</span>
          </button>
          <div class="res-detail-hero-actions">
            <label class="res-detail-evaluator-label" for="slc_evaluated_by">Evaluador</label>
            <select id="slc_evaluated_by" class="form-select form-select-sm"></select>
          </div>
        </div>
      </div>

      <!-- Cuerpo con scroll -->
      <div class="res-detail-panel-body">
        <!-- Info strip -->
        <div class="res-emp-info-card"
          style="margin:0; border-radius:0; border-left:none; border-right:none; border-top:none;">
          <div class="res-emp-info-grid" id="res-emp-info-grid-detail"></div>
        </div>
        <div id="table_general_detail" style="display:none;"></div>

        <!-- Layout 2 columnas -->
        <div class="res-detail-body">
          <div>
            <div class="res-panel">
              <div class="res-panel-header">
                <div class="res-panel-icon amber"><span class="ms ms-sm">checklist</span></div>
                <span class="res-panel-title">Calificación por Competencia</span>
              </div>
              <div class="res-panel-body">
                <div id="table_qualifications"></div>
              </div>
            </div>
            <div class="res-sw-grid">
              <div class="res-sw-card strengths">
                <div class="res-sw-card-title"><span class="ms ms-sm">star</span> Fortalezas</div>
                <div id="ev_strengths"></div>
              </div>
              <div class="res-sw-card weaknesses">
                <div class="res-sw-card-title"><span class="ms ms-sm">trending_up</span> Áreas a Mejorar</div>
                <div id="ev_weaknesses"></div>
              </div>
            </div>
          </div>
          <div class="res-panel">
            <div class="res-panel-header">
              <div class="res-panel-icon indigo"><span class="ms ms-sm">radar</span></div>
              <span class="res-panel-title">Evaluación de Desempeño</span>
            </div>
            <div class="res-radar-wrap">
              <div id="indvChar" style="min-height:320px;width:100%;"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- /PANEL DETALLE -->

    <script type="text/x-jsrender" id="viewIndvResultsTemplate">${viewIndvResultsSF(data)}</script>
    <script type="text/x-jsrender" id="viewFinalReultsTemplate">${viewFinalReultsSF(data)}</script>

    <?php include("neptune_js.php"); ?>
    <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
    <script src="./neptune/js/pages/select2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
      integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
      integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="scripts/ResultadosEvaluacion/data.js" charset="utf-8"></script>
    <script src="scripts/ResultadosEvaluacion/contentFunctions.js" charset="utf-8"></script>
    <script src="scripts/ResultadosEvaluacion/executeFunctions.js" charset="utf-8"></script>

    <script>
      // Tabs → disparan el select oculto original
      document.querySelectorAll('.res-modal-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('.res-modal-tab').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var sel = document.getElementById('selTypeResult');
          if (sel) {
            var val = btn.getAttribute('data-val');
            sel.value = val;
            if (window.jQuery) {
              window.jQuery('#selTypeResult').val(val).trigger('change');
            } else {
              sel.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        });
      });

      // Búsqueda en la lista
      document.getElementById('res-search').addEventListener('input', function () {
        var q = this.value.toLowerCase().trim();
        document.querySelectorAll('#res-evaluados-list .res-row').forEach(function (row) {
          var name = (row.querySelector('.res-row-name') || {}).textContent || '';
          row.style.display = name.toLowerCase().includes(q) ? '' : 'none';
        });
      });

      // Cerrar panel detalle con backdrop y tecla Escape
      document.getElementById('detailContainerBackdrop').addEventListener('click', function () {
        if (typeof closeDetailPanel === 'function') closeDetailPanel();
      });
      document.getElementById('modalGeneralDetailBackdrop').addEventListener('click', function () {
        if (typeof closeGeneralPanel === 'function') closeGeneralPanel();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (typeof closeDetailPanel === 'function') closeDetailPanel();
        if (typeof closeGeneralPanel === 'function') closeGeneralPanel();
      });
    </script>
  </body>

  </html>
  <?php exit; ?>
<?php endif; ?>
<?php
require_once("Backend/Empleados/Empleados.php");
$ins = new Empleados();
$ins->visitIndexEmployee();

require_once("Backend/Configuracion/Configuracion.php");
$Conf = new Configuracion();
$MenuP = $Conf->getMenusPadre();
?>
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>La Esmeralda</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php"); ?>
  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
  <!-- Styles neptune -->

  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator_modern.min.css" rel="stylesheet">
  <?php if ($embed): ?>
    <style>
      html,
      body {
        height: auto !important;
        min-height: unset !important;
        background: #fff !important;
        overflow-x: hidden;
      }

      #main-wrapper {
        display: block !important;
        height: auto !important;
      }

      .app-container {
        margin-left: 0 !important;
        width: 100% !important;
        min-height: unset !important;
      }

      .app-content {
        padding-top: 0 !important;
        min-height: unset !important;
      }

      .content-wrapper {
        padding: 0 !important;
        min-height: unset !important;
      }

      .container {
        max-width: 100% !important;
        padding: 0 0.75rem !important;
      }

      .page-description,
      .preloader,
      .chat-windows {
        display: none !important;
      }
    </style>
  <?php endif; ?>
  <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>
  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
</head>

<body>
  <?php if ($embed): ?>
    <div id="embedLoader"
      style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
      <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
    </div>
    <script>window.addEventListener('load', function () { var e = document.getElementById('embedLoader'); if (e) e.style.display = 'none'; });</script>
  <?php endif; ?>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div>
    <?php if (!$embed): ?>
      <div id="Menu">
        <?php include("menus.php"); ?>
      </div>
    <?php endif; ?>
    <div class="app-container">
      <?php if (!$embed):
        include("includes/_Header.php"); endif; ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">
            <?php if (!$embed): ?>
              <div class="row">
                <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                  <div class="row">
                    <div class="col s12 l12" style="position: relative;">
                      <div id="contenidoMensajes" style="margin-right:2vh"></div>
                    </div>
                    <div class="col s12 l12" style="position: relative;">
                      <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                    </div>
                    <div class="col s12 l12" style="position: relative;">
                      <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="page-description page-description-tabbed">
                    <h1>Empleados Evaluados</h1>
                  </div>
                </div>
              </div>
            <?php endif; ?>
            <!-- EVALUACION FISICA Y DATOS GENERALES -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row d-flex justify-content-center align-items-center text-center mb-4">
                      <div class="col">
                        <label class="card-title">Evaluación seleccionada:</label>
                        <label class="card-title" id="ev_selected"></label>
                      </div>
                    </div>
                    <div id="contenidoResGlobal">
                      <div class="row d-flex justify-content-center align-items-center text-center mb-4">
                        <div class="col">
                          <div id="principalTable"></div>
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
      <!-- Modal Cantidad Evaluados -->
      <div class="modal fade" id="modalGeneralDetail" tabindex="-1" aria-labelledby="modalGeneralDetailLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <label class="modal-title w-100 text-center" id="modalGeneralDetailLabel">Resultado General</label>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" id="container-generalDetail">
              <div class="row d-flex justify-content-center mb-4">
                <div class="col-12">
                  <div id="finalTableEvaluated"></div>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="col-12 col-md-4 text-center">
                  <label class="form-label">Seleccione algún tipo de resultados para ser mostrados.</label>
                  <select class="form-select" id="selTypeResult" style="width: 100%;">
                    <option value="1">FORTALEZAS Y ÁREAS A MEJORAR</option>
                    <option value="2">CÁLCULO</option>
                    <option value="3">PARES Y SUBORDINADOS</option>
                  </select>
                </div>
              </div>
              <div class="row d-flex justify-content-center mb-4">
                <div class="col-12">
                  <div id="contentAllResultsFinal" class="row"></div>
                </div>
              </div>
              <div class="row d-flex justify-content-center">

                <div class="col-12">
                  <div class="row dv_ContentAllResults">
                    <div id="gn_calculo" class="col-12">
                      <div id="dv_GeneralInfo" class="row"></div>
                      <div class="row">
                        <div class="col-12">
                          <div id="dvFisrtPage" class="row"></div>
                        </div>
                      </div>
                    </div>

                    <div id="gn_par_sub" class="col-12">
                      <div class="row">
                        <div class="col-12">
                          <div class="row justify-content-center">
                            <div class="col-12">
                              <div class="row">
                                <div class="col-12  mt-4 mb-4">
                                  <label class="form-label">Resultados Individuales (Pares)</label>
                                </div>
                                <div class="col-12">
                                  <div id="dv_ind_Par" class="row"></div>
                                </div>
                              </div>
                            </div>

                            <div class="col-12">
                              <div class="row">
                                <div class="col-12  mt-4 mb-4">
                                  <label class="form-label">Resultados Individuales (Subordinados)</label>
                                </div>
                                <div class="col-12">
                                  <div id="dv_ind_Subordinado" class="row"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="gn_moreInfo" class="col-12">
                      <div class="row d-flex justify-content-center">
                        <div class="col-12 text-center">
                          <label class="form-label">Resultado Global</label>
                        </div>
                      </div>

                      <div class="row d-flex justify-content-center mb-4">
                        <div class="col-12">
                          <label class="form-label">Resultados Finales:</label>
                          <div id="total_General"></div>
                        </div>
                      </div>
                      <div class="row d-flex justify-content-center mt-4">
                        <div class="col-12  text-center">
                          <label class="form-label text-center">Fortalezas y Áreas a Mejorar</label>
                          <div class="row d-flex justify-content-center">
                            <div class="col-12 col-md-6 text-center mb-3">
                              <label class="form-label">Fortalezas:</label>
                              <div id="table_strengths"></div>
                            </div>
                            <div class="col-12 col-md-6 text-center">
                              <label class="form-label">Áreas a Mejorar:</label>
                              <div id="table_areasForImprovement"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row d-felx justify-content-center">
                        <!-- Contenedor scroll -->
                        <div class="col-12 mt-4 d-flex justify-content-center">
                          <div id="container">
                            <div class="form-label col-12" id="graph_total_General"></div>
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
      </div>

      <!-- Modal Detalles -->
      <div class="modal fade" id="detailContainer" tabindex="-1" aria-labelledby="detailContainerLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">

            <!-- Encabezado -->
            <div class="modal-header">
              <h4 class="modal-title w-100 text-center fw-bold" id="detailContainerLabel">Evaluación de Desempeño</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <!-- Cuerpo -->
            <div class="modal-body">

              <!-- Detalle de evaluadores -->
              <div class="text-center mb-3">
                <label class="form-label">Detalle de los Evaluadores:</label>
              </div>

              <div id="table_general_detail" class="mb-4"></div>

              <!-- Listado de Evaluadores -->
              <div class="row justify-content-center mb-4">
                <div class="col-12 col-md-6 text-center">
                  <label class="form-label d-block mb-2">Listado de Evaluadores:</label>
                  <select id="slc_evaluated_by" class="form-select w-100"></select>
                </div>
              </div>

              <div class="row">

                <!-- Calificación por competencia -->
                <div class="row justify-content-center align-items-center">
                  <div class="col-12 col-md-4 mb-4 text-center">
                    <label class="form-label text-center">Calificación por competencia y evaluador:</label>
                    <div id="table_qualifications"></div>
                  </div>
                </div>

              </div>
              <div class="row justify-content-center align-items-center">

                <!-- Fortalezas y Áreas de oportunidad -->
                <div class="col-12 col-md-8 text-center">
                  <label class="form-label text-center">Fortalezas y Áreas de Oportunidad</label>
                  <div class="row p-2">
                    <div class="col-12 col-md-6 text-center mb-3">
                      <label class="form-label">Fortalezas:</label>
                      <div id="ev_strengths"></div>
                      <hr>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                      <label class="form-label">Áreas a mejorar:</label>
                      <div id="ev_weaknesses"></div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="row w-100 d-felx justify-content-center">
                <!-- Contenedor scroll -->
                <div class="col-12 mt-4 d-flex justify-content-center">
                  <div id="container">
                    <div id="indvChar" style="height:580px;overflow-x:auto;"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  </div>
  <script type="text/x-jsrender" id="viewIndvResultsTemplate">
    ${viewIndvResultsSF(data)}
            </script>
  <script type="text/x-jsrender" id="viewFinalReultsTemplate">
    ${viewFinalReultsSF(data)}
            </script>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php"); ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
    integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="scripts/ResultadosEvaluacion/data.js" charset="utf-8"></script>
  <script src="scripts/ResultadosEvaluacion/contentFunctions.js" charset="utf-8"></script>
  <script src="scripts/ResultadosEvaluacion/executeFunctions.js" charset="utf-8"></script>

</body>

</html>
