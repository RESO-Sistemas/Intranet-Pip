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
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
      rel="stylesheet">
    <style>
      :root {
        --ev-primary: #F59E0B;
        --ev-primary-dark: #D97706;
        --ev-primary-light: #FEF3C7;
        --ev-slate: #64748B;
        --ev-slate-dark: #475569;
        --ev-slate-light: #F1F5F9;
        --ev-success: #10B981;
        --ev-success-light: #ECFDF5;
        --ev-danger: #EF4444;
        --ev-danger-light: #FEF2F2;
        --ev-info: #3B82F6;
        --ev-info-light: #EFF6FF;
        --ev-surface: #FFFFFF;
        --ev-border: #E2E8F0;
        --ev-text: #1E293B;
        --ev-text-muted: #94A3B8;
        --ev-radius: 12px;
        --ev-radius-sm: 8px;
        --ev-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
        --ev-shadow-hover: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 24px rgba(0, 0, 0, 0.08);
      }

      body {
        padding: 0;
        margin: 0;
        background: #F8FAFC;
        font-family: 'DM Sans', sans-serif;
      }

      /* ===== STICKY HEADER ===== */
      .evq-sticky-bar {
        position: sticky;
        top: 0;
        z-index: 100;
        background: #fff;
        border-bottom: 1px solid var(--ev-border);
        padding: 0.875rem 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }

      .evq-sticky-bar .evq-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--ev-text);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .evq-sticky-bar .evq-title i {
        width: 32px;
        height: 32px;
        background: var(--ev-primary-light);
        color: var(--ev-primary-dark);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
      }

      .evq-sticky-bar .evq-meta {
        font-size: 12px;
        color: var(--ev-text-muted);
        font-weight: 500;
      }

      .evq-sticky-bar .evq-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .evq-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 600;
        padding: 0.5rem 1rem;
        border-radius: var(--ev-radius-sm);
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .evq-btn-primary {
        background: var(--ev-primary);
        color: #1C1917;
      }

      .evq-btn-primary:hover {
        background: var(--ev-primary-dark);
        color: #fff;
      }

      .evq-btn-success {
        background: var(--ev-success);
        color: #fff;
      }

      .evq-btn-success:hover {
        background: #059669;
      }

      /* ===== ALERT BANNER ===== */
      .evq-alert-banner {
        background: #fff;
        border: 1px solid var(--ev-border);
        border-left: 4px solid var(--ev-primary);
        border-radius: var(--ev-radius);
        padding: 0.75rem 1rem;
        margin: 1rem;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12.5px;
        color: var(--ev-slate);
        font-weight: 500;
      }

      .evq-alert-banner.warning {
        border-left-color: #F59E0B;
        background: #FFFBEB;
      }

      .evq-alert-banner.error {
        border-left-color: #EF4444;
        background: #FEF2F2;
      }

      /* ===== QUESTION CARD ===== */
      .evq-card {
        background: var(--ev-surface);
        border: 1px solid var(--ev-border);
        border-radius: var(--ev-radius);
        box-shadow: var(--ev-shadow);
        margin: 0.75rem 1rem;
        transition: box-shadow 0.25s ease, transform 0.2s ease;
        overflow: hidden;
      }

      .evq-card:hover {
        box-shadow: var(--ev-shadow-hover);
      }

      .evq-card.collapsed .evq-card-body {
        display: none;
      }

      .evq-card.collapsed .evq-card-header {
        border-bottom: none;
      }

      .evq-card-header {
        padding: 0.875rem 1.1rem;
        border-bottom: 1px solid var(--ev-border);
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
        background: linear-gradient(to right, #fff, #FAFBFF);
      }

      .evq-card-header .evq-num {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--ev-primary-light);
        color: var(--ev-primary-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        flex-shrink: 0;
      }

      .evq-card-header .evq-info {
        flex: 1;
        min-width: 0;
      }

      .evq-card-header .evq-title-text {
        font-size: 14px;
        font-weight: 600;
        color: var(--ev-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .evq-card-header .evq-meta-line {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 3px;
        font-size: 11.5px;
        color: var(--ev-text-muted);
        font-weight: 500;
      }

      .evq-card-header .evq-meta-line .badge {
        font-size: 10.5px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 20px;
      }

      .evq-card-header .evq-meta-line .badge-type-1 {
        background: #ECFDF5;
        color: #059669;
      }

      .evq-card-header .evq-meta-line .badge-type-2 {
        background: #FEF3C7;
        color: #B45309;
      }

      .evq-card-header .evq-meta-line .badge-type-3 {
        background: #EFF6FF;
        color: #2563EB;
      }

      .evq-card-header .evq-meta-line .badge-type-4 {
        background: #F3E8FF;
        color: #7C3AED;
      }

      .evq-card-header .evq-meta-line .badge-comp {
        background: var(--ev-slate-light);
        color: var(--ev-slate);
      }

      .evq-card-header .evq-header-actions {
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .evq-card:hover .evq-header-actions {
        opacity: 1;
      }

      .evq-icon-btn {
        width: 30px;
        height: 30px;
        border-radius: 7px;
        border: none;
        background: transparent;
        color: var(--ev-text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
        font-size: 16px;
      }

      .evq-icon-btn:hover {
        background: var(--ev-slate-light);
        color: var(--ev-slate-dark);
      }

      .evq-icon-btn.save:hover {
        background: var(--ev-success-light);
        color: var(--ev-success);
      }

      .evq-icon-btn.delete:hover {
        background: var(--ev-danger-light);
        color: var(--ev-danger);
      }

      .evq-icon-btn.chevron {
        transition: transform 0.25s ease;
      }

      .evq-card.expanded .evq-icon-btn.chevron {
        transform: rotate(180deg);
      }

      .evq-card-body {
        padding: 1.1rem;
        animation: evqFadeIn 0.25s ease forwards;
      }

      @keyframes evqFadeIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ===== FORM FIELDS ===== */
      .evq-field {
        margin-bottom: 1rem;
      }

      .evq-field label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: var(--ev-slate-dark);
        margin-bottom: 5px;
      }

      .evq-field label .req {
        color: var(--ev-danger);
        margin-left: 2px;
      }

      .evq-field .form-control,
      .evq-field .form-select {
        border-radius: var(--ev-radius-sm);
        border: 1.5px solid var(--ev-border);
        font-size: 13.5px;
        padding: 0.5rem 0.75rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        color: var(--ev-text);
      }

      .evq-field .form-control:focus,
      .evq-field .form-select:focus {
        border-color: var(--ev-primary);
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
      }

      /* ===== OPTION ROWS ===== */
      .evq-option-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0.5rem 0.6rem;
        margin-bottom: 6px;
        border-radius: var(--ev-radius-sm);
        border: 1.5px solid var(--ev-border);
        background: #fff;
        transition: all 0.15s ease;
      }

      .evq-option-row:hover {
        border-color: #CBD5E1;
        background: #FAFBFF;
      }

      .evq-option-row .evq-radio {
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid #CBD5E1;
        border-radius: 50%;
        cursor: pointer;
        flex-shrink: 0;
        position: relative;
        transition: all 0.2s ease;
      }

      .evq-option-row .evq-radio:checked {
        border-color: var(--ev-primary);
        background: var(--ev-primary);
      }

      .evq-option-row .evq-radio:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 7px;
        height: 7px;
        background: #fff;
        border-radius: 50%;
      }

      .evq-option-row .evq-opt-label {
        width: 22px;
        height: 22px;
        border-radius: 5px;
        background: var(--ev-slate-light);
        color: var(--ev-slate);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        flex-shrink: 0;
      }

      .evq-option-row .evq-opt-input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 13.5px;
        color: var(--ev-text);
        padding: 0;
      }

      .evq-option-row .evq-opt-input:focus {
        outline: none;
      }

      .evq-option-row .evq-opt-input::placeholder {
        color: #CBD5E1;
      }

      .evq-option-row .evq-opt-remove {
        width: 24px;
        height: 24px;
        border-radius: 5px;
        border: none;
        background: transparent;
        color: #CBD5E1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }

      .evq-option-row .evq-opt-remove:hover {
        background: var(--ev-danger-light);
        color: var(--ev-danger);
      }

      /* ===== ADD OPTION BUTTON ===== */
      .evq-add-opt {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0.45rem 0.9rem;
        border-radius: var(--ev-radius-sm);
        border: 1.5px dashed #CBD5E1;
        background: transparent;
        color: var(--ev-slate);
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 4px;
      }

      .evq-add-opt:hover {
        border-color: var(--ev-primary);
        color: var(--ev-primary-dark);
        background: var(--ev-primary-light);
      }

      /* ===== TOGGLE V/F ===== */
      .evq-toggle-wrap {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: var(--ev-slate-light);
        border-radius: 10px;
        padding: 4px;
      }

      .evq-toggle-wrap .evq-toggle-btn {
        padding: 0.4rem 1rem;
        border-radius: 8px;
        border: none;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        background: transparent;
        color: var(--ev-slate);
      }

      .evq-toggle-wrap .evq-toggle-btn.active {
        background: var(--ev-primary);
        color: #1C1917;
        box-shadow: 0 2px 6px rgba(245, 158, 11, 0.25);
      }

      /* ===== RANGE INPUTS ===== */
      .evq-range-row {
        display: flex;
        gap: 12px;
      }

      .evq-range-row .evq-field {
        flex: 1;
      }

      /* ===== LEVELS TABLE ===== */
      .evq-levels-box {
        background: #FAFBFF;
        border: 1px solid var(--ev-border);
        border-radius: var(--ev-radius-sm);
        padding: 0.75rem;
      }

      .evq-levels-box .evq-levels-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .evq-levels-box .evq-levels-title {
        font-size: 12px;
        font-weight: 700;
        color: var(--ev-slate-dark);
      }

      .evq-level-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        margin: 3px;
      }

      .evq-level-chip.lvl {
        background: var(--ev-primary-light);
        color: var(--ev-primary-dark);
        border: 1px solid #FCD34D;
      }

      .evq-level-chip .evq-chip-remove {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: none;
        background: rgba(0, 0, 0, 0.06);
        color: currentColor;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
      }

      .evq-level-chip .evq-chip-remove:hover {
        background: rgba(0, 0, 0, 0.12);
      }

      /* ===== EMPTY STATE ===== */
      .evq-empty {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--ev-text-muted);
      }

      .evq-empty i {
        font-size: 48px;
        color: #E2E8F0;
        margin-bottom: 12px;
      }

      .evq-empty h5 {
        font-size: 15px;
        font-weight: 700;
        color: var(--ev-slate);
        margin-bottom: 4px;
      }

      .evq-empty p {
        font-size: 13px;
        margin: 0;
      }

      /* ===== MODAL POLISH ===== */
      .modal-content {
        border-radius: var(--ev-radius) !important;
        border: none !important;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18) !important;
      }

      .modal-header {
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--ev-border);
      }

      .modal-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--ev-text);
      }

      .modal-body {
        padding: 1.1rem;
        font-size: 13px;
      }

      .modal-footer {
        padding: 0.875rem 1.1rem;
        border-top: 1px solid var(--ev-border);
      }

      .modal-footer .btn {
        font-size: 12.5px;
        font-weight: 600;
        border-radius: var(--ev-radius-sm);
        padding: 0.45rem 1rem;
      }

      /* ===== PILLS HORIZONTALES (respuesta correcta) ===== */
      .evq-pills-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
      }

      .evq-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0.4rem 0.9rem;
        border-radius: 20px;
        border: 1.5px solid var(--ev-border);
        background: #fff;
        color: var(--ev-slate);
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
      }

      .evq-pill:hover {
        border-color: #CBD5E1;
        background: #FAFBFF;
      }

      .evq-pill .evq-pill-radio {
        appearance: none;
        width: 14px;
        height: 14px;
        border: 2px solid #CBD5E1;
        border-radius: 50%;
        margin: 0;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .evq-pill .evq-pill-radio:checked {
        border-color: var(--ev-primary);
        background: var(--ev-primary);
      }

      .evq-pill .evq-pill-radio:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        background: #fff;
        border-radius: 50%;
      }

      .evq-pill.active {
        background: var(--ev-primary-light);
        border-color: var(--ev-primary);
        color: var(--ev-primary-dark);
      }

      .evq-pill .evq-pill-label {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background: var(--ev-slate-light);
        color: var(--ev-slate);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        flex-shrink: 0;
      }

      .evq-pill.active .evq-pill-label {
        background: var(--ev-primary);
        color: #fff;
      }

      /* ===== ANIMATIONS ===== */
      .evq-card {
        animation: evqSlideIn 0.3s ease forwards;
      }

      @keyframes evqSlideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </head>

  <body>
    <div id="embedLoader"
      style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
      <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status"><span
          class="visually-hidden">Cargando...</span></div>
      <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
    </div>
    <script>window.addEventListener('load', function () { var e = document.getElementById('embedLoader'); if (e) e.style.display = 'none'; });</script>

    <!-- Sticky Bar -->
    <div class="evq-sticky-bar">
      <div>
        <div class="evq-title"><i class="fas fa-clipboard-list"></i> Configuración de Preguntas</div>
        <div class="evq-meta" id="evqMetaBar">Cargando...</div>
      </div>
      <div class="evq-actions">
        <button type="button" class="evq-btn evq-btn-primary" id="btnAddQuestion"><i class="fas fa-plus"></i> Nueva
          Pregunta</button>
        <button type="button" class="evq-btn evq-btn-success" id="btnSaveQuestions"><i class="fas fa-save"></i>
          Guardar</button>
      </div>
    </div>

    <!-- Alert Banner -->
    <div id="evqAlertBanner" class="evq-alert-banner warning" style="display:none;">
      <i class="fas fa-exclamation-triangle"></i>
      <span id="evqAlertText">Sin advertencias</span>
    </div>

    <!-- Legacy hidden container for backward compatibility -->
    <div id="contentAdv" style="display:none;"></div>

    <!-- Questions Container -->
    <div id="contentQuestions"></div>


    <div class="modal fade" id="modalTypesQuestion" tabindex="-1" aria-labelledby="modalTypesQuestionTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTypesQuestionTitle">Seleccione un tipo de pregunta por agregar</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div id="dv_typesQuestion">
              <div class="row">
                <div class="col-12">
                  <h6>* Seleccione un tipo de pregunta</h6>
                  <select class="form-select" id="sel_typeQuestion" required>
                    <option></option>
                  </select>
                  <p for="sel_typeQuestion" data-msg="El tipo de pregunta es obligatorio"></p>
                  <hr>
                </div>
                <div class="col-12">
                  <h6>* Seleccione una competencia</h6>
                  <select class="form-select" id="sel_competenceQuestion" required></select>
                  <p for="sel_competenceQuestion" data-msg="La competencia es obligatoria"></p>
                  <hr>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" id="btn_acceptType">Aceptar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalUpdateCompetence" tabindex="-1" aria-labelledby="modalUpdateCompetenceTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalUpdateCompetenceTitle">Actualización de la competencia seleccionada para la
              pregunta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="updateComp_question">
            <input type="hidden" id="updateComp_typeSave">
            <div class="mb-3">
              <h6 id="txQuestionPerUpdateCompetence"></h6>
              <hr>
            </div>
            <div class="mb-3">
              <h6>* Seleccione la competencia por cambiar</h6>
              <select class="form-select" id="sel_CompetencesUpdateOld" required style="width:100%;">
                <option value=""></option>
              </select>
              <p class="text-danger small" for="sel_CompetencesUpdateOld" data-msg="La competencia es obligatoria"></p>
              <hr>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" id="btn_updateCompetenceOld">Actualizar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="dv_newResponseExpected" tabindex="-1" aria-labelledby="newResponseExpectedTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newResponseExpectedTitle">Niveles esperados para la respuesta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="QuestionRE">
            <div class="mb-3">
              <label class="form-label">* Seleccione uno o más niveles esperados para la respuesta a seleccionar</label>
              <select class="form-select" id="sel_lvl" multiple required style="width:100%;"></select>
              <p class="text-danger small" for="sel_lvl" data-msg="El nivel es obligatorio"></p>
              <hr>
            </div>
            <div class="mb-3">
              <label class="form-label">Selecciona una pregunta para relacionarla con los niveles a seleccionar</label>
              <div id="content_answersM"></div>
              <hr>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" id="btn_addResponseExpected">Aceptar Registros</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="dv_OldResponseExpected" tabindex="-1" aria-labelledby="oldResponseExpectedTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="oldResponseExpectedTitle">Niveles esperados para la respuesta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="QuestionREOld">
            <div class="mb-3">
              <label class="form-label">* Seleccione uno o más niveles esperados para la respuesta a seleccionar</label>
              <select class="form-select" id="sel_lvlOld" multiple required style="width:100%;"></select>
              <p class="text-danger small" for="sel_lvlOld" data-msg="El nivel es obligatorio"></p>
              <hr>
            </div>
            <div class="mb-3">
              <label class="form-label">Selecciona una pregunta para relacionarla con los niveles a seleccionar</label>
              <div id="content_answersMOld"></div>
              <hr>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" id="btn_addResponseExpectedOld">Aceptar Registros</button>
          </div>
        </div>
      </div>
    </div>

    <script type="text/x-jsrender" id="deleteResExpectedTemplate">${deleteResExpectedSF(data)}</script>
    <script type="text/x-jsrender" id="deleteResExpectedSVTemplate">${deleteResExpectedSVSF(data)}</script>
    <script type="text/x-jsrender" id="deleteResExpectedSVNewTemplate">${deleteResExpectedSVNewSF(data)}</script>

    <?php include("neptune_js.php"); ?>
    <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
    <script src="./neptune/js/pages/select2.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
      integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/questionsEv/contentFunctions.js" charset="utf-8"></script>
    <script src="scripts/questionsEv/executeFunctions.js" charset="utf-8"></script>
  </body>

  </html>
  <?php exit; ?>
<?php endif; ?>
<!DOCTYPE html>

<html>



<head>



  <meta charset="utf-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

  <title>PIP by Lugo</title>

  <!-- Styles neptune -->



  <?php include("neptune_styles.php"); ?>

  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">



  <!-- Styles neptune -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->

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

    <div id="Menu">

    </div>

    <div class="app-container">

      <div class="app-content">

        <div class="content-wrapper">

          <div class="container">

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

                  <h1>Preguntas</h1>

                </div>

              </div>

            </div>

            <!-- EVALUACIONES-->

            <div class="row">

              <div class="col">

                <div class="card">

                  <div class="card-body">



                    <div class="d-flex justify-content-between pb-4">

                      <?php if (!$embed): ?>
                        <button type="button" class="btn btn-danger"
                          onclick="window.location.href='ListadoEvaluaciones.php'">Regresar</button>
                      <?php endif; ?>

                      <div class="d-flex gap-2">

                        <button type="button" class="btn btn-primary" id="btnAddQuestion">Nueva Pregunta</button>

                        <button type="button" class="btn btn-success" id="btnSaveQuestions">Guardar nuevas
                          preguntas</button>

                      </div>

                    </div>

                    <div class="row">

                      <label class="form-label text-center w-100 mb-0">A través de este formulario podrás crear las
                        preguntas correspondientes al cuestionario, completa el formulario como se indica para
                        registrarlo correctamente.</label>

                    </div>

                    <div class="row">

                      <div class="row mt-4">

                        <div class="col-12">

                          <div class="card shadow-sm border">

                            <div class="card-body">

                              <label class="text-warning"><i class="material-icons align-middle">warning</i> Listado de
                                advertencias del formulario.</label>

                              <hr>

                              <ul id="contentAdv" class="list-unstyled mb-0 ps-3">

                                <li class="text-muted">Sin advertencias</li>

                              </ul>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div class="row">

                      <div class="col">

                        <div class="row" id="contentQuestions"></div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <!-- MODAL PARA NUEVA PREGUNTA -->

            <!-- MODAL DE BOOTSTRAP 5 -->

            <div class="modal fade" id="modalTypesQuestion" tabindex="-1" aria-labelledby="modalTypesQuestionTitle"
              aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                <div class="modal-content">

                  <div class="modal-header">

                    <h5 class="modal-title" id="modalTypesQuestionTitle">Seleccione un tipo de pregunta por agregar</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>

                  <div class="modal-body">



                    <!-- CONTENIDO DE dv_typesQuestion -->

                    <div id="dv_typesQuestion">

                      <div class="row">

                        <div class="col-12">

                          <h6>* Seleccione un tipo de pregunta</h6>

                          <select class="form-select" id="sel_typeQuestion" required>

                            <option></option>

                          </select>

                          <p for="sel_typeQuestion" data-msg="El tipo de pregunta es obligatorio"></p>

                          <hr>

                        </div>

                        <div class="col-12">

                          <h6>* Seleccione una competencia</h6>

                          <select class="form-select" id="sel_competenceQuestion" required></select>

                          <p for="sel_competenceQuestion" data-msg="La competencia es obligatoria"></p>

                          <hr>

                        </div>

                      </div>

                    </div>



                  </div>

                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

                    <button type="button" class="btn btn-success" id="btn_acceptType">Aceptar</button>

                  </div>

                </div>

              </div>

            </div>



            <!-- MODAL DE CAMBIAR COMPETENCIA -->

            <!-- MODAL DE BOOTSTRAP 5 - ACTUALIZAR COMPETENCIA -->

            <div class="modal fade" id="modalUpdateCompetence" tabindex="-1"
              aria-labelledby="modalUpdateCompetenceTitle" aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered">

                <div class="modal-content">

                  <div class="modal-header">

                    <h5 class="modal-title" id="modalUpdateCompetenceTitle">Actualización de la competencia seleccionada
                      para la pregunta</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>

                  <div class="modal-body">

                    <input type="hidden" id="updateComp_question">

                    <input type="hidden" id="updateComp_typeSave">

                    <div class="mb-3">

                      <h6 id="txQuestionPerUpdateCompetence"></h6>

                      <hr>

                    </div>

                    <div class="mb-3">

                      <h6>* Seleccione la competencia por cambiar</h6>

                      <select class="form-select" id="sel_CompetencesUpdateOld" required style="width: 100%;">

                        <option value=""></option>

                      </select>

                      <p class="text-danger small" for="sel_CompetencesUpdateOld"
                        data-msg="La competencia es obligatoria"></p>

                      <hr>

                    </div>

                  </div>

                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

                    <button type="button" class="btn btn-success" id="btn_updateCompetenceOld">Actualizar</button>

                  </div>

                </div>

              </div>

            </div>

            <!-- MODAL DE RESPUEST ESPERADA -->

            <div class="modal fade" id="dv_newResponseExpected" tabindex="-1" aria-labelledby="newResponseExpectedTitle"
              aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                <div class="modal-content">

                  <div class="modal-header">

                    <h5 class="modal-title" id="newResponseExpectedTitle">Niveles esperados para la respuesta</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>

                  <div class="modal-body">

                    <input type="hidden" id="QuestionRE">

                    <div class="mb-3">

                      <label class="form-label">* Seleccione uno o más niveles esperados para la respuesta a
                        seleccionar</label>

                      <select class="form-select" id="sel_lvl" multiple required style="width: 100%;">

                      </select>

                      <p class="text-danger small" for="sel_lvl" data-msg="El nivel es obligatorio"></p>

                      <hr>

                    </div>

                    <div class="mb-3">

                      <label class="form-label">Selecciona una pregunta para relacionarla con los niveles a
                        seleccionar</label>

                      <div id="content_answersM"></div>

                      <hr>

                    </div>

                  </div>

                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

                    <button type="button" class="btn btn-success" id="btn_addResponseExpected">Aceptar
                      Registros</button>

                  </div>

                </div>

              </div>

            </div>

            <div class="modal fade" id="dv_OldResponseExpected" tabindex="-1" aria-labelledby="oldResponseExpectedTitle"
              aria-hidden="true">

              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

                <div class="modal-content">

                  <div class="modal-header">

                    <h5 class="modal-title" id="oldResponseExpectedTitle">Niveles esperados para la respuesta</h5>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>

                  </div>

                  <div class="modal-body">

                    <input type="hidden" id="QuestionREOld">

                    <div class="mb-3">

                      <label class="form-label">* Seleccione uno o más niveles esperados para la respuesta a
                        seleccionar</label>

                      <select class="form-select" id="sel_lvlOld" multiple required style="width: 100%;"></select>

                      <p class="text-danger small" for="sel_lvlOld" data-msg="El nivel es obligatorio"></p>

                      <hr>

                    </div>

                    <div class="mb-3">

                      <label class="form-label">Selecciona una pregunta para relacionarla con los niveles a
                        seleccionar</label>

                      <div id="content_answersMOld"></div>

                      <hr>

                    </div>

                  </div>

                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

                    <button type="button" class="btn btn-success" id="btn_addResponseExpectedOld">Aceptar
                      Registros</button>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>

  </div>

  <script type="text/x-jsrender" id="deleteResExpectedTemplate">

    ${deleteResExpectedSF(data)}

          </script>

  <script type="text/x-jsrender" id="deleteResExpectedSVTemplate">

    ${deleteResExpectedSVSF(data)}

          </script>

  <script type="text/x-jsrender" id="deleteResExpectedSVNewTemplate">

    ${deleteResExpectedSVNewSF(data)}

          </script>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php"); ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <!-- neptune Javascripts -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/questionsEv/contentFunctions.js?v=<?php echo time(); ?>" charset="utf-8"></script>
  <script src="scripts/questionsEv/executeFunctions.js?v=<?php echo time(); ?>" charset="utf-8"></script>

</body>

</html>
