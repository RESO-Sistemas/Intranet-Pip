<?php
require_once("Backend/Session/SessionManager.php");
SessionManager::requireLogin();
?>
<!DOCTYPE html>
<html lang="es" dir="ltr">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>Evaluación — PIP</title>

  <?php include("neptune_styles.php"); ?>

  <link rel="stylesheet" href="assets/libs/smart-wizard/dist/css/smart_wizard_all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <style>
    /* ============================================================
       Evaluacion — layout iframe: sidebar + contenido
    ============================================================ */
    :root {
      --ev-primary:       #008837;
      --ev-primary-dark:  #e6ac00;
      --ev-primary-light: #fff9e6;
      --ev-success:       #16a34a;
      --ev-success-bg:    #f0fdf4;
      --ev-border:        #e2e8f0;
      --ev-muted:         #64748b;
      --ev-radius:        10px;
    }

    /* Reset para iframe — sin margen extra del sistema */
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      background: #f8fafc;
      font-family: 'Poppins', sans-serif;
    }

    /* ── Shell principal ── */
    #ev-shell {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    /* ── Header compacto ── */
    #ev-header {
      background: #fff;
      border-bottom: 1px solid var(--ev-border);
      padding: 12px 20px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    #ev-header-info { flex: 1; min-width: 0; }
    #ev-header-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .ev-meta-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 9px;
      border-radius: 99px;
      font-size: .7rem;
      font-weight: 600;
      background: var(--ev-primary-light);
      color: #92700a;
      border: 1px solid #A7F3D0;
    }

    /* Barra de progreso del header */
    #ev-header-progress {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      min-width: 160px;
    }
    .ev-hprog-bar {
      flex: 1;
      height: 6px;
      background: #e2e8f0;
      border-radius: 99px;
      overflow: hidden;
    }
    .ev-hprog-fill {
      height: 100%;
      background: var(--ev-primary);
      border-radius: 99px;
      transition: width .4s ease;
    }
    .ev-hprog-label {
      font-size: .72rem;
      color: var(--ev-muted);
      white-space: nowrap;
    }

    /* ── Cuerpo: sidebar + contenido ── */
    #ev-body {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    /* ── Sidebar ── */
    #ev-sidebar {
      width: 210px;
      flex-shrink: 0;
      background: #fff;
      border-right: 1px solid var(--ev-border);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    #ev-sidebar-inner {
      flex: 1;
      overflow-y: auto;
      padding: 12px 10px;
    }
    #ev-sidebar-inner::-webkit-scrollbar { width: 4px; }
    #ev-sidebar-inner::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

    .ev-q-item {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background .15s;
      margin-bottom: 2px;
      font-size: .8rem;
      color: #475569;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
    }
    .ev-q-item:hover { background: #f8fafc; }
    .ev-q-item.active {
      background: var(--ev-primary-light);
      color: #92700a;
      font-weight: 600;
    }
    .ev-q-item.done { color: var(--ev-success); }
    .ev-q-item.done .ev-q-num { background: var(--ev-success-bg); color: var(--ev-success); }
    .ev-q-item.active .ev-q-num { background: var(--ev-primary); color: #1e293b; }

    .ev-q-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f1f5f9;
      color: var(--ev-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .7rem;
      font-weight: 700;
      flex-shrink: 0;
      transition: background .15s, color .15s;
    }
    .ev-q-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .ev-q-check {
      font-size: .75rem;
      flex-shrink: 0;
      color: var(--ev-success);
    }

    /* Pie del sidebar */
    #ev-sidebar-footer {
      padding: 12px;
      border-top: 1px solid var(--ev-border);
      background: #fff;
    }
    #ev-sidebar-stats {
      font-size: .72rem;
      color: var(--ev-muted);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
    #btn-finish-ev {
      width: 100%;
      padding: 9px;
      background: var(--ev-success);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: .82rem;
      font-weight: 600;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: background .15s;
    }
    #btn-finish-ev:hover { background: #15803d; }

    /* ── Área de pregunta ── */
    #ev-content {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      padding: 24px;
      background: #f8fafc;
    }
    #ev-content::-webkit-scrollbar { width: 5px; }
    #ev-content::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

    /* Card de pregunta */
    .ev-q-card {
      background: #fff;
      border: 1px solid var(--ev-border);
      border-radius: var(--ev-radius);
      padding: 24px 28px;
      max-width: 700px;
      margin: 0 auto 20px;
    }

    /* Badge de competencia */
    .ev-competencia-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: var(--ev-primary-light);
      color: #92700a;
      border: 1px solid #A7F3D0;
      border-radius: 99px;
      font-size: .72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .4px;
      margin-bottom: 16px;
    }

    /* Texto de la pregunta */
    .ev-q-text {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: #1e293b;
      line-height: 1.5;
      margin-bottom: 22px;
    }

    /* Opciones de respuesta */
    .ev-options-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-bottom: 22px;
    }
    .ev-option-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .ev-option-label input[type="radio"] { display: none; }
    .ev-option-pill {
      padding: 10px 18px;
      border: 2px solid var(--ev-border);
      border-radius: 99px;
      font-size: .82rem;
      font-weight: 500;
      color: #475569;
      background: #f8fafc;
      transition: all .15s;
      white-space: nowrap;
    }
    .ev-option-label input[type="radio"]:checked + .ev-option-pill {
      border-color: var(--ev-primary);
      background: var(--ev-primary-light);
      color: #92700a;
      font-weight: 700;
    }
    .ev-option-label:hover .ev-option-pill {
      border-color: #A7F3D0;
      background: var(--ev-primary-light);
    }

    /* Switch verdadero/falso */
    .ev-switch-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 22px;
      font-size: .85rem;
      font-weight: 500;
      color: #475569;
    }
    .ev-switch-wrap .form-check-input {
      width: 2.8em;
      height: 1.4em;
      cursor: pointer;
    }
    .ev-switch-wrap .form-check-input:checked {
      background-color: var(--ev-primary);
      border-color: var(--ev-primary);
    }

    /* Inputs de rango */
    .ev-range-wrap {
      display: flex;
      gap: 14px;
      align-items: flex-end;
      flex-wrap: wrap;
      margin-bottom: 22px;
    }
    .ev-range-field {
      flex: 1;
      min-width: 100px;
    }
    .ev-range-field label {
      font-size: .75rem;
      font-weight: 600;
      color: var(--ev-muted);
      display: block;
      margin-bottom: 4px;
    }
    .ev-range-field input {
      border-radius: 8px;
      border: 1.5px solid var(--ev-border);
      padding: 8px 12px;
      width: 100%;
      font-size: .9rem;
      text-align: center;
      transition: border-color .15s;
    }
    .ev-range-field input:focus {
      outline: none;
      border-color: var(--ev-primary);
      box-shadow: 0 0 0 3px rgba(105, 191, 127,.15);
    }
    .ev-range-field input[readonly] {
      background: #f8fafc;
      color: var(--ev-muted);
    }

    /* Slider de rango */
    .ev-range-wrap { flex-direction: column; align-items: stretch; gap: 10px; }
    .ev-slider-value { text-align: center; }
    .ev-slider-value span { font-size: 2.2rem; font-weight: 800; color: var(--ev-primary); line-height: 1; }
    .ev-slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 8px; border-radius: 6px;
      background: var(--ev-border); outline: none; cursor: pointer;
    }
    .ev-slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 22px; height: 22px; border-radius: 50%;
      background: var(--ev-primary); cursor: pointer;
      border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.25);
    }
    .ev-slider::-moz-range-thumb {
      width: 22px; height: 22px; border-radius: 50%;
      background: var(--ev-primary); cursor: pointer;
      border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.25);
    }
    .ev-slider-scale { display: flex; justify-content: space-between; font-size: .75rem; color: var(--ev-muted); }

    /* Textarea de comentarios */
    .ev-comment-wrap label {
      font-size: .75rem;
      font-weight: 600;
      color: var(--ev-muted);
      display: block;
      margin-bottom: 6px;
    }
    .ev-comment-wrap textarea {
      width: 100%;
      border: 1.5px solid var(--ev-border);
      border-radius: 8px;
      padding: 10px 12px;
      font-family: 'Poppins', sans-serif;
      font-size: .83rem;
      resize: vertical;
      min-height: 70px;
      transition: border-color .15s;
    }
    .ev-comment-wrap textarea:focus {
      outline: none;
      border-color: var(--ev-primary);
      box-shadow: 0 0 0 3px rgba(105, 191, 127,.15);
    }

    /* Navegación inferior */
    #ev-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 24px;
      background: #fff;
      border-top: 1px solid var(--ev-border);
      flex-shrink: 0;
    }
    .ev-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 20px;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: .85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background .15s, opacity .15s;
    }
    #btn-prev {
      background: #f1f5f9;
      color: #475569;
    }
    #btn-prev:hover { background: #e2e8f0; }
    #btn-prev:disabled { opacity: .4; cursor: default; }
    #btn-next {
      background: var(--ev-primary);
      color: #1e293b;
    }
    #btn-next:hover { background: var(--ev-primary-dark); }

    /* Número de pregunta actual */
    #ev-nav-counter {
      font-size: .8rem;
      color: var(--ev-muted);
    }

    /* Pantalla de carga inicial */
    #ev-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      flex-direction: column;
      gap: 14px;
      color: var(--ev-muted);
      font-size: .9rem;
    }
    .ev-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid #e2e8f0;
      border-top-color: var(--ev-primary);
      border-radius: 50%;
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>

<body>

  <!-- Pantalla de carga -->
  <div id="ev-loading">
    <div class="ev-spinner"></div>
    <span>Cargando evaluación...</span>
  </div>

  <!-- Shell principal (oculto hasta que carga) -->
  <div id="ev-shell" style="display:none;">

    <!-- Header -->
    <div id="ev-header">
      <div id="ev-header-info">
        <div id="ev-header-meta">
          <span class="ev-meta-badge" id="ev-badge-puesto"><i class="fas fa-briefcase"></i> —</span>
          <span class="ev-meta-badge" id="ev-badge-empleado"><i class="fas fa-user"></i> —</span>
        </div>
      </div>
      <div id="ev-header-progress">
        <div class="ev-hprog-bar">
          <div class="ev-hprog-fill" id="ev-hprog-fill" style="width:0%"></div>
        </div>
        <span class="ev-hprog-label" id="ev-hprog-label">0 / 0</span>
      </div>
    </div>

    <!-- Cuerpo -->
    <div id="ev-body">

      <!-- Sidebar -->
      <div id="ev-sidebar">
        <div id="ev-sidebar-inner">
          <!-- Items generados por JS -->
        </div>
        <div id="ev-sidebar-footer">
          <div id="ev-sidebar-stats">
            <span id="ev-stat-done">0 respondidas</span>
            <span id="ev-stat-pending">0 pendientes</span>
          </div>
          <button id="btn-finish-ev" onclick="dialogfinishEvaluationNew()">
            <i class="fas fa-check-circle"></i> Finalizar Evaluación
          </button>
        </div>
      </div>

      <!-- Área de pregunta activa -->
      <div id="ev-content">
        <div id="ev-q-container">
          <!-- Pregunta renderizada por JS -->
        </div>
      </div>

    </div><!-- /ev-body -->

    <!-- Navegación inferior -->
    <div id="ev-nav">
      <button class="ev-nav-btn" id="btn-prev" onclick="evNavPrev()" disabled>
        <i class="fas fa-arrow-left"></i> Anterior
      </button>
      <span id="ev-nav-counter">— / —</span>
      <button class="ev-nav-btn" id="btn-next" onclick="evNavNext()">
        Siguiente <i class="fas fa-arrow-right"></i>
      </button>
    </div>

  </div><!-- /ev-shell -->

  <!-- Scripts -->
  <?php include("neptune_js.php"); ?>

  <script src="assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="assets/libs/sweetalert2/dist/sweetalert2.all.min.js" charset="utf-8"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
    integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"
    integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/Evaluacion.js" charset="utf-8"></script>

</body>
</html>
