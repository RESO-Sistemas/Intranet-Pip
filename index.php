<?php include("AutorizaPagina.php"); ?>
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
  <title>PIP by Lugo</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>

  <!-- Styles neptune -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <link href="assets/libs/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.css" />
  <!-- <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.orange-coral.css" /> -->
  <!-- <script src="componentes/PerfilEmpleadoLateral.js" charset="utf-8"></script> -->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="plugins/emoji-picker/css/emoji.css">
  <script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.css">
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <link rel="stylesheet" href="plugins/tingle-master/dist/tingle.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined">
  <link rel="stylesheet" href="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.css">
  <link rel="stylesheet" href="/plugins/unitegallery-master/dist/css/unite-gallery.css">
  <link rel="stylesheet" href="/plugins/unitegallery-master/package/unitegallery/themes/default/ug-theme-default.css">
  <link rel="stylesheet" href="/plugins/unitegallery-master/source/unitegallery/skins/alexis/alexis.css">
  
  <!-- Moment.js necesario para FullCalendar -->
  <script src="assets/libs/moment/min/moment.min.js"></script>

  <style>
    /* ============================================================
       KPI Gauge cards — SIN CAMBIOS
    ============================================================ */
    .kpi-gauge-card {
      min-width: 225px;
      max-width: 285px;
      flex: 0 0 auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
      padding: 8px 14px 6px;
      text-align: center;
    }
    .kpi-gauge-card svg { display: block; margin: 0 auto; }
    .kpi-gauge-card .kpi-name {
      font-size: .92rem;
      font-weight: 700;
      color: #333;
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .kpi-gauge-card .kpi-fraction {
      font-size: .78rem;
      color: #888;
      margin-top: 1px;
    }

    /* ============================================================
       Evento item — SIN CAMBIOS
    ============================================================ */
    .evento-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .evento-item:last-child { border-bottom: none; }
    .evento-date-box {
      min-width: 42px;
      text-align: center;
      background: #6c757d;
      color: #fff;
      border-radius: 6px;
      padding: 4px 6px;
      font-weight: 700;
      line-height: 1.1;
    }
    .evento-date-box .ev-day { font-size: 1.1rem; }
    .evento-date-box .ev-month { font-size: .65rem; text-transform: uppercase; }
    .evento-info .ev-title { font-size: .85rem; font-weight: 600; color: #333; }
    .evento-info .ev-time { font-size: .75rem; color: #888; }

    /* ============================================================
       Checklist items — SIN CAMBIOS
    ============================================================ */
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      margin-bottom: 6px;
      background: #fffdf3;
      border-left: 3px solid #ffc407;
      border-radius: 6px;
      transition: all .2s ease;
    }
    .checklist-item:hover { background: #fff8dc; box-shadow: 0 1px 4px rgba(255,196,7,.2); }
    .checklist-item .chk-name { font-size: .84rem; color: #333; font-weight: 500; }
    .checklist-item .chk-badge { font-size: .65rem; padding: 3px 8px; border-radius: 10px; white-space: nowrap; }
    .checklist-item.ya-contestado { opacity: .55; border-left-color: #ccc; background: #f9f9f9; }
    .checklist-item.ya-contestado .chk-name { text-decoration: line-through; color: #999 !important; }
    .checklist-item.chk-respondido-si { border-left-color: #28a745; background: #f0faf3; }
    .checklist-item.chk-respondido-no { border-left-color: #dc3545; background: #fef5f5; }
    .chk-btn-group { display: flex; gap: 5px; flex-shrink: 0; align-self: center; }
    .chk-btn-group .btn { width: 22px; height: 22px; padding: 0; border-radius: 4px; transition: all .2s; display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
    .chk-btn-group .btn svg { width: 12px; height: 12px; display: block; }
    .chk-btn-si { background: transparent; border: 1.5px solid #28a745; }
    .chk-btn-si svg { stroke: #28a745; }
    .chk-btn-si:hover { background: rgba(40,167,69,.1); }
    .chk-btn-no { background: transparent; border: 1.5px solid #dc3545; }
    .chk-btn-no svg { stroke: #dc3545; }
    .chk-btn-no:hover { background: rgba(220,53,69,.1); }
    .chk-btn-si.active { background: rgba(40,167,69,.15); pointer-events: none; }
    .chk-btn-no.active { background: rgba(220,53,69,.15); pointer-events: none; }
    .chk-btn-group .btn:disabled { opacity: .4; pointer-events: none; }
    .checklist-item .badge.bg-info { font-size: .6rem; padding: 2px 6px; background-color: #17a2b8 !important; }
    .turno-header {
      font-size: 1rem;
      font-weight: 700;
      color: #17a2b8;
      padding: 10px 12px 6px;
      margin-top: 8px;
      margin-bottom: 4px;
      border-bottom: 2px solid #17a2b8;
      display: flex;
      align-items: center;
    }
    .turno-header:first-child { margin-top: 0; }

    /* ============================================================
       Ajustes de espaciado globales — SIN CAMBIOS
    ============================================================ */
    .app-content { padding-top: 0 !important; }
    .content-wrapper { padding-top: 5px !important; }
    .container { padding-top: 0 !important; }
    #kpiCarouselWrapper { margin-top: -5px !important; }

    /* Evitar que las imágenes del feed se desborden */
    .galleryImgCl, .ug-gallery-wrapper {
      max-width: 100% !important;
      width: 100% !important;
    }
    .galleryImgCl img {
      max-width: 100% !important;
      height: auto !important;
    }

    /* ============================================================
       REDDIT-STYLE FEED — Nuevos estilos
    ============================================================ */

    /* Fondo general del área de contenido */
    .reddit-feed-wrapper {
      background: #f6f7f8;
      border-radius: 0;
      padding: 0;
    }


    /* Tarjeta de post estilo Reddit */
    .reddit-post-card {
      display: flex;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: border-color .1s ease;
    }
    .reddit-post-card:hover { border-color: #898989; }


    /* KPI Pills — fila scrollable horizontal sobre el feed */
    .kpi-pills-row {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 4px 2px 12px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .kpi-pills-row::-webkit-scrollbar { display: none; }
    .kpi-pill {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 50px;
      padding: 8px 18px 8px 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,.07);
      cursor: default;
      min-width: 180px;
    }
    .kpi-pill-gauge { flex-shrink: 0; }
    .kpi-pill-info {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .kpi-pill-name {
      font-size: .78rem;
      font-weight: 700;
      color: #333;
      white-space: normal;
      max-width: 150px;
      word-break: break-word;
    }
    .kpi-pill-fraction {
      font-size: .68rem;
      color: #888;
    }

    /* Post Compose Box — campo para crear publicación */
    .post-compose-box {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 12px;
      transition: box-shadow .15s ease;
    }
    .post-compose-box:hover { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    .post-compose-top {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .post-compose-top img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      border: 2px solid #edeff1;
    }
    .post-compose-trigger {
      flex: 1;
      background: #f6f7f8;
      border: 1px solid #edeff1;
      border-radius: 4px;
      padding: 9px 14px;
      font-size: .88rem;
      color: #878a8c;
      cursor: pointer;
      text-align: left;
      transition: border-color .15s, background .15s;
    }
    .post-compose-trigger:hover {
      background: #fff;
      border-color: #0079d3;
      color: #555;
    }
    .post-compose-divider {
      border: none;
      border-top: 1px solid #edeff1;
      margin: 10px 0 8px;
    }
    .post-compose-actions {
      display: flex;
      gap: 4px;
    }
    .post-compose-action {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      font-size: .78rem;
      font-weight: 600;
      color: #878a8c;
      cursor: pointer;
      transition: background .1s, color .1s;
    }
    .post-compose-action:hover { background: #f0f0f0; color: #333; }
    .post-compose-action i { font-size: .85rem; }

    /* Formulario inline de nueva publicación */
    .post-compose-form {
      margin-top: 10px;
      animation: composeSlideIn .18s ease;
    }
    @keyframes composeSlideIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .post-compose-form .form-label {
      font-size: .8rem;
      font-weight: 600;
      color: #555;
      margin-bottom: 4px;
    }
    .post-compose-form .form-control {
      font-size: .85rem;
      border-color: #edeff1;
      border-radius: 4px;
      background: #f6f7f8;
      transition: border-color .15s, background .15s;
    }
    .post-compose-form .form-control:focus {
      border-color: #0079d3;
      background: #fff;
      box-shadow: 0 0 0 2px rgba(0,121,211,.12);
    }
    .post-compose-form-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #edeff1;
    }
    .btn-cancel-compose {
      background: none;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 6px 18px;
      font-size: .82rem;
      font-weight: 600;
      color: #555;
      cursor: pointer;
      transition: background .1s;
    }
    .btn-cancel-compose:hover { background: #f0f0f0; }
    .btn-submit-compose {
      background: #FF4500;
      border: none;
      border-radius: 20px;
      padding: 6px 22px;
      font-size: .82rem;
      font-weight: 700;
      color: #fff;
      cursor: pointer;
      transition: background .1s;
    }
    .btn-submit-compose:hover { background: #e03d00; }
    .btn-submit-compose:disabled { background: #ccc; cursor: not-allowed; }

    body.dark-mode .kpi-pill { background: #272729; border-color: #3c3c3d; }
    body.dark-mode .kpi-pill-name { color: #d7dadc; }
    body.dark-mode .kpi-pill-fraction { color: #818384; }
    body.dark-mode .post-compose-box { background: #272729; border-color: #3c3c3d; }
    body.dark-mode .post-compose-box:hover { box-shadow: 0 2px 8px rgba(0,0,0,.3); }
    body.dark-mode .post-compose-trigger { background: #1a1a1b; border-color: #4a4a4b; color: #818384; }
    body.dark-mode .post-compose-trigger:hover { background: #343536; border-color: #0079d3; color: #d7dadc; }
    body.dark-mode .post-compose-divider { border-top-color: #3c3c3d; }
    body.dark-mode .post-compose-action { color: #818384; }
    body.dark-mode .post-compose-action:hover { background: #343536; color: #d7dadc; }
    body.dark-mode .post-compose-form .form-control { background: #1a1a1b; border-color: #3c3c3d; color: #d7dadc; }
    body.dark-mode .post-compose-form .form-control:focus { background: #272729; border-color: #0079d3; }
    body.dark-mode .post-compose-form .form-label { color: #9a9a9b; }
    body.dark-mode .post-compose-form-footer { border-top-color: #3c3c3d; }
    body.dark-mode .btn-cancel-compose { border-color: #4a4a4b; color: #9a9a9b; }
    body.dark-mode .btn-cancel-compose:hover { background: #343536; }

    /* Cuerpo del post */
    .rpc-body {
      flex: 1;
      padding: 8px 10px 6px;
      min-width: 0;
    }
    .rpc-meta {
      font-size: .72rem;
      color: #878a8c;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .rpc-meta img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
    .rpc-meta .rpc-author {
      font-weight: 700;
      color: #0079d3;
      font-size: .78rem;
    }
    .rpc-meta .rpc-time { color: #878a8c; }
    .rpc-type-badge {
      display: inline-block;
      font-size: .6rem;
      font-weight: 700;
      padding: 1px 7px;
      border-radius: 10px;
      background: #FF4500;
      color: #fff;
      letter-spacing: .04em;
      vertical-align: middle;
    }
    .rpc-type-badge.cmp { background: #e91e63; }
    .rpc-type-badge.any { background: #9c27b0; }
    .rpc-type-badge.nws { background: #0079d3; }

    /* Título del post */
    .rpc-title {
      font-size: .97rem;
      font-weight: 700;
      color: #222;
      margin: 0 0 4px;
      line-height: 1.3;
    }

    /* Descripción */
    .rpc-desc {
      font-size: .84rem;
      color: #3c3c3c;
      line-height: 1.5;
      margin-bottom: 8px;
    }

    /* Hipervínculo */
    .rpc-link {
      font-size: .78rem;
      color: #0079d3;
      word-break: break-all;
      display: block;
      margin-bottom: 8px;
    }
    .rpc-link:hover { text-decoration: underline; }

    /* Galería de imágenes dentro del post */
    .rpc-gallery {
      margin-bottom: 8px;
      border-radius: 4px;
      overflow: hidden;
    }

    /* Barra de acciones (pie del post) */
    .rpc-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      border-top: 1px solid #f0f0f0;
      padding-top: 6px;
      margin-top: 4px;
    }
    .rpc-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: none;
      border-radius: 3px;
      padding: 5px 8px;
      font-size: .78rem;
      font-weight: 700;
      color: #878a8c;
      cursor: pointer;
      transition: background .1s, color .1s;
      text-decoration: none;
    }
    .rpc-action-btn:hover {
      background: #f0f0f0;
      color: #222;
      text-decoration: none;
    }
    .rpc-action-btn.liked { color: #E91E63; }
    .rpc-action-btn.congrat { color: #8E24AA; }

    /* Zona de comentarios dentro del post */
    .rpc-comments-area {
      background: #f6f7f8;
      border-radius: 4px;
      padding: 10px;
      margin-top: 8px;
    }

    /* Textarea de comentario */
    .rpc-comment-input-row {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      margin-top: 8px;
    }
    .rpc-comment-input-row textarea {
      flex: 1;
      border-radius: 4px;
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: .82rem;
      resize: none;
      min-height: 34px;
      background: #fff;
    }
    .rpc-comment-input-row .btn-comment {
      background: #FF4500;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 6px 16px;
      font-size: .78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    }
    .rpc-comment-input-row .btn-comment:hover { background: #e03d00; }

    /* Sidebar sticky */
    .reddit-sidebar {
      position: sticky;
      top: 72px; /* Ajustar según la altura del header */
      align-self: flex-start;
    }
    .reddit-sidebar .card {
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    .reddit-sidebar .card-header {
      background: #FF4500;
      color: #fff;
      font-size: .82rem;
      font-weight: 700;
      padding: 8px 12px;
      border-radius: 5px 5px 0 0;
    }
    .reddit-sidebar .card-header i { margin-right: 6px; }
    .reddit-sidebar .card-body {
      padding: 10px 12px;
      background: #fff;
    }

    body.dark-mode .reddit-feed-wrapper { background: #1a1a1b; }
    body.dark-mode .reddit-post-card { background: #1a1a1b; border-color: #343536; }
    body.dark-mode .reddit-post-card:hover { border-color: #818384; }
    body.dark-mode .rpc-title { color: #d7dadc; }
    body.dark-mode .rpc-desc { color: #9a9a9b; }
    body.dark-mode .rpc-meta { color: #818384; }
    body.dark-mode .rpc-meta .rpc-author { color: #4fbdff; }
    body.dark-mode .rpc-actions { border-top-color: #343536; }
    body.dark-mode .rpc-action-btn { color: #818384; }
    body.dark-mode .rpc-action-btn:hover { background: #333436; color: #d7dadc; }
    body.dark-mode .rpc-comments-area { background: #121213; }
    body.dark-mode .rpc-comment-input-row textarea { background: #272729; border-color: #3c3c3d; color: #d7dadc; }
    body.dark-mode .reddit-sidebar .card { border-color: #343536; }
    body.dark-mode .reddit-sidebar .card-body { background: #1a1a1b; }
    body.dark-mode .kpi-gauge-card { background: #1e1e2d; }
    body.dark-mode .kpi-gauge-card .kpi-name { color: #ccc; }
    body.dark-mode .evento-date-box { background: #555; color: #fff; }
    body.dark-mode .evento-info .ev-title { color: #ccc; }
    body.dark-mode .checklist-item { background: #1e1e2d; border-left-color: #ffc407; }
    body.dark-mode .checklist-item:hover { background: #2a2a3d; box-shadow: 0 1px 4px rgba(255,196,7,.15); }
    body.dark-mode .checklist-item .chk-name { color: #ddd; }
    body.dark-mode .checklist-item.ya-contestado { background: #1a1a28; border-left-color: #555; }
    body.dark-mode .checklist-item.chk-respondido-si { border-left-color: #28a745; background: #1a2e1f; }
    body.dark-mode .checklist-item .badge.bg-info { background-color: #138496 !important; }
    body.dark-mode .turno-header { color: #17a2b8; border-bottom-color: #17a2b8; }
    body.dark-mode .checklist-item.chk-respondido-no { border-left-color: #dc3545; background: #2e1a1a; }
  </style>

  <!-- Custom styles para KPI Carousel y flechas ahora en neptune/css/custom.css -->

</head>

<body>
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
      <?php
      include("menus.php");
      ?>
    </div>
    <div class="app-container">
      <?php include("includes/_Header.php"); ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">
            <div class="row">
              <div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block" style="position: fixed; z-index:99;">
                <div class="row">
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajes" style="margin-right:2vh"></div>
                  </div>
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                  </div>
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                  </div>
                </div>
              </div>
            </div>


            <!-- NOVEDADES + ESPACIO DERECHA — Estilo Reddit -->
            <div class="row g-3">

              <!-- ═══════════════════════════════════════
                   Columna principal: Feed estilo Reddit
              ═══════════════════════════════════════ -->
              <div class="col-12 col-lg-8">


                <!-- KPI Pills — fila scrollable horizontal encima del feed -->
                <div id="kpiCarouselWrapper">
                  <div id="kpiCarouselContainer" class="kpi-pills-row">
                    <!-- Se llena dinámicamente vía dashboard.js -->
                  </div>
                </div>

                <!-- Post Compose Box — formulario inline expansible -->
                <div class="post-compose-box" id="postComposeBox">

                  <!-- Fila trigger (visible por defecto) -->
                  <div class="post-compose-top" id="postComposeTriggerRow">
                    <img id="avatarCreatePost" src="assets/logoK.png" alt="tu avatar">
                    <button class="post-compose-trigger" id="postComposeTriggerBtn" onclick="openComposeForm()">
                      ¿Qué quieres compartir hoy?
                    </button>
                  </div>
                  <hr class="post-compose-divider" id="postComposeDivider">
                  <div class="post-compose-actions" id="postComposeActionsRow">
                    <button class="post-compose-action" onclick="openComposeForm()">
                      <i class="fas fa-image"></i> Imagen
                    </button>
                    <button class="post-compose-action" onclick="openComposeForm()">
                      <i class="fas fa-link"></i> Enlace
                    </button>
                    <button class="post-compose-action" onclick="openComposeForm()">
                      <i class="far fa-edit"></i> Redactar
                    </button>
                  </div>

                  <!-- Formulario inline (oculto por defecto) -->
                  <div id="postComposeFormContainer" style="display:none;">
                    <div class="post-compose-form">
                      <form id="formFeed">
                        <div class="mb-3">
                          <label for="mnf_title" class="form-label">* Título</label>
                          <textarea id="mnf_title" name="mnf_title" class="form-control" rows="2" required
                                    placeholder="Escribe el título de tu publicación..."></textarea>
                          <p for="mnf_title" data-msg="El título es obligatorio." class="text-danger small mb-0"></p>
                        </div>
                        <div class="mb-3">
                          <label for="mnf_desc" class="form-label">* Descripción</label>
                          <textarea id="mnf_desc" name="mnf_desc" class="form-control" rows="3" required
                                    placeholder="¿Qué quieres comunicar?"></textarea>
                          <p for="mnf_desc" data-msg="La descripción es obligatoria." class="text-danger small mb-0"></p>
                        </div>
                        <div class="mb-3">
                          <label for="mnf_url" class="form-label">
                            Hipervínculo <span class="text-muted fw-normal" style="font-size:.75rem;">(opcional)</span>
                          </label>
                          <input type="url" id="mnf_url" name="mnf_url" class="form-control"
                                 placeholder="https://..."/>
                        </div>
                        <div class="mb-2">
                          <label class="form-label">
                            Imágenes <span class="text-muted fw-normal" style="font-size:.75rem;">(opcional)</span>
                          </label>
                          <div id="fileUpload" class="file-container border rounded p-3 bg-light"></div>
                        </div>
                      </form>
                      <div class="post-compose-form-footer">
                        <button class="btn-cancel-compose" type="button" onclick="closeComposeForm()">
                          Cancelar
                        </button>
                        <button class="btn-submit-compose" type="button" id="btn-actionGreen">
                          <i class="fas fa-paper-plane me-1"></i> Publicar
                        </button>
                      </div>
                    </div>
                  </div>

                </div><!-- /post-compose-box -->

                <?php include("components/modalIncidencia.html"); ?>


                <!-- Feed de publicaciones -->
                <div class="reddit-feed-wrapper">
                  <div id="ContenidoFeed"></div>
                  <div id="btnLoadMoreContainer" class="text-center my-3" style="display: none;">
                    <button id="btnLoadMoreFeeds" class="btn btn-outline-secondary btn-sm px-4" style="border-radius: 20px;">
                      <i class="fas fa-chevron-down me-1"></i> Ver más publicaciones
                    </button>
                  </div>
                </div>

              </div><!-- /col feed -->

              <!-- ═══════════════════════════════════════
                   Sidebar sticky: Eventos + Checklist
              ═══════════════════════════════════════ -->
              <div class="col-12 col-lg-4">
                <div class="reddit-sidebar">

                  <!-- Próximos Eventos -->
                  <div class="card mb-3">
                    <div class="card-header">
                      <i class="fas fa-calendar-alt"></i> Próximos Eventos
                    </div>
                    <div class="card-body">
                      <div id="listaEventos" style="max-height: 200px; overflow-y: auto;">
                        <p class="text-muted small text-center mb-0">Cargando eventos...</p>
                      </div>
                    </div>
                  </div>

                  <!-- Checklist del día -->
                  <div class="card">
                    <div class="card-header">
                      <i class="fas fa-check-square"></i> Checklist del día
                    </div>
                    <div class="card-body">
                      <div id="listaChecklist" style="max-height: 380px; overflow-y: auto;">
                        <p class="text-muted small text-center mb-0">Cargando checklist...</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div><!-- /col sidebar -->

            </div>
            <!-- /NOVEDADES + ESPACIO DERECHA -->
            <div id="fullscreen-swiper"></div>
            <div id="fullscreen-swiper-backdrop"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- neptune Javascripts (incluye jQuery, BlockUI y global.js) -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <?php include("scripts.php"); ?>
  
  <script src="plugins/evo-calendar/js/evo-calendar.js"></script>
  <script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
  <script src="plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>
  <script src="plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>
  <script src="plugins/unitegallery-master/package/unitegallery/themes/slider/ug-theme-slider.js" charset="utf-8"></script>
  
  <!-- Scripts específicos de la página - SIEMPRE AL FINAL -->
  <script src="scripts/index.js" charset="utf-8"></script>
  <script src="scripts/dashboard.js" charset="utf-8"></script>

  <!-- Script: abrir/cerrar formulario inline de publicación -->
  <script>
    function openComposeForm() {
      // Ocultar trigger row / acciones
      document.getElementById('postComposeTriggerRow').style.display  = 'none';
      document.getElementById('postComposeDivider').style.display     = 'none';
      document.getElementById('postComposeActionsRow').style.display  = 'none';
      // Mostrar formulario con animación
      document.getElementById('postComposeFormContainer').style.display = 'block';
      // Foco en el primer campo
      setTimeout(function() {
        var t = document.getElementById('mnf_title');
        if (t) t.focus();
      }, 50);
    }
    function closeComposeForm() {
      // Mostrar trigger row / acciones
      document.getElementById('postComposeTriggerRow').style.display  = 'flex';
      document.getElementById('postComposeDivider').style.display     = 'block';
      document.getElementById('postComposeActionsRow').style.display  = 'flex';
      // Ocultar formulario
      document.getElementById('postComposeFormContainer').style.display = 'none';
      // Limpiar campos
      var form = document.getElementById('formFeed');
      if (form) form.reset();
    }
  </script>

</body>

</html>