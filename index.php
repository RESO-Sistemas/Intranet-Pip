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

  <?php include("neptune_styles.php"); ?>

  <!-- Styles neptune -->
  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
  <link rel="stylesheet" href="plugins/tingle-master/dist/tingle.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined">
  <link rel="stylesheet" href="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.css">


  <!-- Moment.js necesario para FullCalendar -->
  <script src="assets/syncfusion/Packages/ej2-circulargauge/circular-gauge.js"></script>
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
      box-shadow: 0 2px 8px rgba(0, 0, 0, .08);
      padding: 8px 14px 6px;
      text-align: center;
    }

    .kpi-gauge-card svg {
      display: block;
      margin: 0 auto;
    }

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
      cursor: pointer;
      border-radius: 8px;
      transition: background-color .15s ease, transform .15s ease;
    }

    .evento-item:hover {
      background: #f8f9fb;
      transform: translateX(2px);
    }

    .evento-item:last-child {
      border-bottom: none;
    }

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

    .evento-date-box .ev-day {
      font-size: 1.1rem;
    }

    .evento-date-box .ev-month {
      font-size: .65rem;
      text-transform: uppercase;
    }

    .evento-info .ev-title {
      font-size: .85rem;
      font-weight: 600;
      color: #333;
    }

    .evento-info .ev-time {
      font-size: .75rem;
      color: #888;
    }

    .event-detail-modal .modal-content {
      border: none;
      border-radius: 14px;
      box-shadow: 0 14px 34px rgba(0, 0, 0, .18);
      overflow: hidden;
    }

    .event-detail-modal .modal-header {
      background: linear-gradient(120deg, #ffc107, #ff9f1a);
      border-bottom: none;
      padding: 14px 16px;
    }

    .event-detail-modal .modal-title {
      color: #222;
      font-size: .98rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
    }

    .event-detail-modal .btn-close {
      background-size: .8rem;
      opacity: .7;
    }

    .event-detail-modal .btn-close:hover {
      opacity: 1;
    }

    .event-detail-modal .modal-body {
      padding: 16px;
      background: #fff;
    }

    .event-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .event-detail-chip {
      background: #f6f8fb;
      border: 1px solid #eef1f4;
      border-radius: 10px;
      padding: 10px;
    }

    .event-detail-label {
      font-size: .68rem;
      font-weight: 700;
      color: #7a7f87;
      text-transform: uppercase;
      letter-spacing: .04em;
      margin-bottom: 3px;
    }

    .event-detail-value {
      font-size: .88rem;
      color: #24292f;
      font-weight: 600;
      line-height: 1.35;
      word-break: break-word;
    }

    .event-detail-description {
      background: #fbfcfd;
      border: 1px solid #edf1f5;
      border-radius: 10px;
      padding: 12px;
    }

    .event-detail-description .event-detail-value {
      white-space: pre-wrap;
      font-weight: 500;
      color: #38404a;
    }

    @media (max-width: 576px) {
      .event-detail-grid {
        grid-template-columns: 1fr;
      }
    }

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
      border-left: none;
      border-radius: 6px;
      transition: all .2s ease;
    }

    .checklist-item:hover {
      background: #fff8dc;
      box-shadow: 0 1px 4px rgba(255, 196, 7, .2);
    }

    .checklist-item .chk-name {
      font-size: .84rem;
      color: #333;
      font-weight: 500;
    }

    .checklist-item .chk-badge {
      font-size: .65rem;
      padding: 3px 8px;
      border-radius: 10px;
      white-space: nowrap;
    }

    .checklist-item.ya-contestado {
      opacity: .55;
      background: #f9f9f9;
    }

    .checklist-item.ya-contestado .chk-name {
      text-decoration: line-through;
      color: #999 !important;
    }

    .checklist-item.chk-respondido-si {
      background: #f0faf3;
    }

    .checklist-item.chk-respondido-no {
      background: #fef5f5;
    }

    .chk-btn-group {
      display: flex;
      gap: 5px;
      flex-shrink: 0;
      align-self: center;
    }

    .chk-btn-group .btn {
      width: 22px;
      height: 22px;
      padding: 0;
      border-radius: 4px;
      transition: all .2s;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .chk-btn-group .btn svg {
      width: 12px;
      height: 12px;
      display: block;
    }

    .chk-btn-si {
      background: transparent;
      border: 1.5px solid #28a745;
    }

    .chk-btn-si svg {
      stroke: #28a745;
    }

    .chk-btn-si:hover {
      background: rgba(40, 167, 69, .1);
    }

    .chk-btn-no {
      background: transparent;
      border: 1.5px solid #dc3545;
    }

    .chk-btn-no svg {
      stroke: #dc3545;
    }

    .chk-btn-no:hover {
      background: rgba(220, 53, 69, .1);
    }

    .chk-btn-si.active {
      background: rgba(40, 167, 69, .15);
      pointer-events: none;
    }

    .chk-btn-no.active {
      background: rgba(220, 53, 69, .15);
      pointer-events: none;
    }

    .chk-btn-group .btn:disabled {
      opacity: .4;
      pointer-events: none;
    }

    .checklist-item .badge.bg-info {
      font-size: .6rem;
      padding: 2px 6px;
      background-color: #17a2b8 !important;
    }

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

    .turno-header:first-child {
      margin-top: 0;
    }

    /* ============================================================
       Ajustes de espaciado globales — SIN CAMBIOS
    ============================================================ */
    .app-content {
      padding-top: 0 !important;
    }

    .content-wrapper {
      padding-top: 5px !important;
    }

    .container {
      padding-top: 0 !important;
    }

    #kpiCarouselWrapper {
      margin-top: -5px !important;
    }

    /* Swiper para imágenes del feed */
    .galleryImgCl {
      max-width: 100% !important;
      width: 100% !important;
      border-radius: 8px;
      overflow: hidden;
      background: #f7f8fa;
    }

    .feed-swiper-instance {
      width: 100%;
    }

    .feed-swiper-instance .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f7f8fa;
      min-height: 220px;
      cursor: zoom-in;
    }

    .feed-swiper-image {
      width: 100%;
      max-height: 420px;
      object-fit: contain;
      background: #fff;
    }

    .feed-swiper-instance .swiper-button-next,
    .feed-swiper-instance .swiper-button-prev {
      color: #ff6f00;
      background: rgba(255, 255, 255, 0.92);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .feed-swiper-instance .swiper-button-next:after,
    .feed-swiper-instance .swiper-button-prev:after {
      font-size: 14px;
      font-weight: 700;
    }

    .feed-swiper-instance .swiper-pagination-bullet-active {
      background: #ff4500;
    }

    #fullscreen-swiper {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      padding: 4.5vh 4vw;
    }

    #fullscreen-swiper .feed-fullscreen-swiper,
    #fullscreen-swiper .swiper-wrapper,
    #fullscreen-swiper .swiper-slide {
      height: 100%;
    }

    #fullscreen-swiper .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }

    #fullscreen-swiper .swiper-slide img {
      max-width: 95%;
      max-height: 85vh;
      object-fit: contain;
      border-radius: 8px;
      background: #111;
    }

    #fullscreen-swiper-backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.9);
    }

    #fullscreen-swiper-close {
      color: #fff;
      cursor: pointer;
      font-size: 28px;
      position: absolute;
      top: 16px;
      right: 22px;
      z-index: 10001;
      width: 38px;
      height: 38px;
      border: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      background: rgba(0, 0, 0, 0.55);
    }

    .no-scroll {
      height: 100%;
      overflow: hidden;
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

    .feed-empty-state {
      background: linear-gradient(145deg, #ffffff, #fff8ef);
      border: 1px solid #ffd7b2;
      border-radius: 12px;
      padding: 28px 20px;
      text-align: center;
      margin-bottom: 12px;
      box-shadow: 0 4px 12px rgba(255, 120, 40, .08);
    }

    .feed-empty-icon {
      width: 54px;
      height: 54px;
      margin: 0 auto 12px;
      border-radius: 50%;
      background: #fff0de;
      color: #ff7a18;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.55rem;
    }

    .feed-empty-title {
      font-size: 1.08rem;
      font-weight: 800;
      color: #2f2f2f;
      margin-bottom: 6px;
    }

    .feed-empty-text {
      font-size: .86rem;
      color: #666;
      margin: 0;
    }

    .feed-skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
    }

    .feed-skeleton-more {
      margin-top: 6px;
    }

    .feed-skeleton-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: #fff;
      border: 1px solid #ececec;
      border-radius: 8px;
      padding: 12px;
    }

    .feed-skeleton-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      flex-shrink: 0;
      background: #eceff1;
    }

    .feed-skeleton-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .feed-skeleton-line {
      height: 12px;
      border-radius: 999px;
      background: #eceff1;
    }

    .feed-skeleton-line-sm {
      width: 35%;
    }

    .feed-skeleton-line-md {
      width: 62%;
    }

    .feed-skeleton-line-lg {
      width: 88%;
    }

    .feed-skeleton-shimmer {
      background-image: linear-gradient(90deg, #eceff1 0%, #f7f8fa 45%, #eceff1 100%);
      background-size: 200% 100%;
      animation: feedSkeletonShimmer 1.15s linear infinite;
    }

    @keyframes feedSkeletonShimmer {
      from {
        background-position: 200% 0;
      }

      to {
        background-position: -200% 0;
      }
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

    .reddit-post-card:hover {
      border-color: #898989;
    }


    /* KPI Pills — fila scrollable horizontal sobre el feed */
    .kpi-pills-row {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 4px 2px 12px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .kpi-pills-row::-webkit-scrollbar {
      display: none;
    }

    .kpi-pill {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 12px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 18px;
      padding: 9px 16px 9px 10px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .07);
      cursor: default;
      min-width: 285px;
    }

    .kpi-pill-gauge {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kpi-pill-info {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 0;
      flex: 1;
    }

    .kpi-pill-percent {
      font-size: .8rem;
      font-weight: 700;
      color: #2f2f2f;
      margin-top: 1px;
    }

    .kpi-pill-name {
      font-size: .82rem;
      font-weight: 700;
      color: #333;
      white-space: normal;
      max-width: 135px;
      word-break: break-word;
    }

    .kpi-pill-fraction {
      font-size: .68rem;
      color: #888;
    }

    @media (max-width: 768px) {
      .kpi-pill {
        min-width: 255px;
        padding: 8px 12px 8px 8px;
      }

      .kpi-pill-gauge {
        transform: scale(.92);
        transform-origin: left center;
      }

      .kpi-pill-name {
        max-width: 120px;
      }
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

    .post-compose-box:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
    }

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

    .post-compose-action:hover {
      background: #f0f0f0;
      color: #333;
    }

    .post-compose-action i {
      font-size: .85rem;
    }

    /* Formulario inline de nueva publicación */
    .post-compose-form {
      margin-top: 10px;
      animation: composeSlideIn .18s ease;
    }

    @keyframes composeSlideIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
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
      box-shadow: 0 0 0 2px rgba(0, 121, 211, .12);
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

    .btn-cancel-compose:hover {
      background: #f0f0f0;
    }

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

    .btn-submit-compose:hover {
      background: #e03d00;
    }

    .btn-submit-compose:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    body.dark-mode .kpi-pill {
      background: #272729;
      border-color: #3c3c3d;
    }

    body.dark-mode .kpi-pill-name {
      color: #d7dadc;
    }

    body.dark-mode .kpi-pill-percent {
      color: #f0f0f0;
    }

    body.dark-mode .kpi-pill-fraction {
      color: #818384;
    }

    body.dark-mode .post-compose-box {
      background: #272729;
      border-color: #3c3c3d;
    }

    body.dark-mode .post-compose-box:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
    }

    body.dark-mode .post-compose-trigger {
      background: #1a1a1b;
      border-color: #4a4a4b;
      color: #818384;
    }

    body.dark-mode .post-compose-trigger:hover {
      background: #343536;
      border-color: #0079d3;
      color: #d7dadc;
    }

    body.dark-mode .post-compose-divider {
      border-top-color: #3c3c3d;
    }

    body.dark-mode .post-compose-action {
      color: #818384;
    }

    body.dark-mode .post-compose-action:hover {
      background: #343536;
      color: #d7dadc;
    }

    body.dark-mode .post-compose-form .form-control {
      background: #1a1a1b;
      border-color: #3c3c3d;
      color: #d7dadc;
    }

    body.dark-mode .post-compose-form .form-control:focus {
      background: #272729;
      border-color: #0079d3;
    }

    body.dark-mode .post-compose-form .form-label {
      color: #9a9a9b;
    }

    body.dark-mode .post-compose-form-footer {
      border-top-color: #3c3c3d;
    }

    body.dark-mode .btn-cancel-compose {
      border-color: #4a4a4b;
      color: #9a9a9b;
    }

    body.dark-mode .btn-cancel-compose:hover {
      background: #343536;
    }

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
      color: #222222;
      font-size: .78rem;
    }

    .rpc-meta .rpc-time {
      color: #878a8c;
    }

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

    .rpc-type-badge.cmp {
      background: #e91e63;
    }

    .rpc-type-badge.any {
      background: #9c27b0;
    }

    .rpc-type-badge.nws {
      background: #0079d3;
    }

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

    .rpc-link:hover {
      text-decoration: underline;
    }

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

    .rpc-action-btn.liked {
      color: #FFC107;
    }

    .rpc-action-btn.congrat {
      color: #8E24AA;
    }

    /* ──── Estilos para el corazón relleno vs vacío ──── */
    .heart-icon.heart-filled {
      font-weight: 900;
      -webkit-text-fill-color: #FFC107;
      color: #FFC107;
    }

    .heart-icon.heart-outline {
      font-weight: 400;
      -webkit-text-fill-color: currentColor;
      color: inherit;
    }

    .rpc-action-btn.liked .heart-icon {
      color: #FFC107;
      font-weight: 900;
    }

    /* ── Zona de comentarios ── */
    .rpc-comments-area {
      background: transparent;
      padding: 8px 0 0;
      margin-top: 4px;
    }

    /* Lista de comentarios */
    .feed-comments-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
    }

    .feed-comment-item {
      display: flex;
    }

    .feed-comment-body {
      flex: 1;
      background: #f0f2f5;
      border-radius: 10px;
      padding: 8px 11px;
      min-width: 0;
    }

    .feed-comment-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 3px;
    }

    .feed-comment-author {
      font-size: 12px;
      font-weight: 700;
      color: #1c1e21;
    }

    .feed-comment-time {
      font-size: 10px;
      color: #90949c;
    }

    .feed-comment-text {
      font-size: 13px;
      color: #1c1e21;
      line-height: 1.45;
      margin: 0 0 5px;
      word-break: break-word;
    }

    .feed-comment-reaction {
      background: none;
      border: none;
      padding: 2px 6px;
      border-radius: 999px;
      font-size: 11px;
      color: #90949c;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: background .15s;
    }

    .feed-comment-reaction:hover {
      background: #e4e6ea;
    }

    .feed-comment-reaction.reacted {
      color: #ffc407;
    }

    .feed-comment-empty {
      font-size: 12px;
      color: #90949c;
      font-style: italic;
      margin: 0;
    }

    .feed-comment-load-more {
      background: none;
      border: none;
      font-size: 12px;
      font-weight: 600;
      color: #ffc407;
      cursor: pointer;
      padding: 2px 8px;
    }

    .feed-comment-load-more:hover {
      text-decoration: underline;
    }

    /* Skeleton comentarios */
    .feed-comments-skeleton {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .fcs-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }

    .fcs-avatar {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      flex-shrink: 0;
      background: #e4e6ea;
      animation: fcs-shimmer 1.2s infinite linear;
    }

    .fcs-lines {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding-top: 4px;
    }

    .fcs-line {
      height: 10px;
      border-radius: 5px;
      background: #e4e6ea;
      animation: fcs-shimmer 1.2s infinite linear;
    }

    @keyframes fcs-shimmer {
      0% {
        opacity: 1;
      }

      50% {
        opacity: .45;
      }

      100% {
        opacity: 1;
      }
    }

    /* Textarea de comentario */
    .rpc-comment-input-row {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #e4e6ea;
    }

    .rpc-comment-input-row textarea {
      flex: 1;
      border-radius: 20px;
      border: 1px solid #dde0e4;
      padding: 7px 14px;
      font-size: .83rem;
      resize: none;
      min-height: 36px;
      background: #f0f2f5;
      transition: border-color .2s;
    }

    .rpc-comment-input-row textarea:focus {
      outline: none;
      border-color: #ffc407;
      background: #fff;
    }

    .rpc-comment-input-row .btn-comment {
      background: #ffc407;
      color: #1c1e21;
      border: none;
      border-radius: 20px;
      padding: 7px 16px;
      font-size: .78rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: background .15s;
    }

    .rpc-comment-input-row .btn-comment:hover {
      background: #e6ad00;
    }

    .rpc-comment-input-row .btn-comment:disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    /* Dark mode comentarios */
    body.dark-mode .rpc-comments-area {
      background: transparent;
    }

    body.dark-mode .feed-comment-body {
      background: #2a2d31;
    }

    body.dark-mode .feed-comment-author {
      color: #e4e6eb;
    }

    body.dark-mode .feed-comment-text {
      color: #d4d6da;
    }

    body.dark-mode .feed-comment-time {
      color: #6a6d75;
    }

    body.dark-mode .feed-comment-reaction:hover {
      background: #3a3d42;
    }

    body.dark-mode .fcs-avatar,
    body.dark-mode .fcs-line {
      background: #3a3d42;
    }

    body.dark-mode .rpc-comment-input-row {
      border-top-color: #3a3d42;
    }

    body.dark-mode .rpc-comment-input-row textarea {
      background: #2a2d31;
      border-color: #3c3c3d;
      color: #d7dadc;
    }

    body.dark-mode .rpc-comment-input-row textarea:focus {
      border-color: #ffc407;
      background: #232528;
    }

    /* Sidebar sticky */
    .reddit-sidebar {
      position: sticky;
      top: 72px;
      /* Ajustar según la altura del header */
      align-self: flex-start;
    }

    .reddit-sidebar .card {
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    .reddit-sidebar .card-header {
      background: #f3f5f7;
      color: #2f2f2f;
      font-size: .82rem;
      font-weight: 700;
      padding: 8px 12px;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #e6eaef;
    }

    .reddit-sidebar .card-header i {
      margin-right: 6px;
    }

    .reddit-sidebar .card-body {
      padding: 10px 12px;
      background: #fff;
      min-height: auto;
      max-height: none;
      overflow: visible;
    }

    body.dark-mode .reddit-feed-wrapper {
      background: #1a1a1b;
    }

    body.dark-mode .feed-empty-state {
      background: linear-gradient(145deg, #272729, #1f1f20);
      border-color: #3c3c3d;
      box-shadow: none;
    }

    body.dark-mode .feed-empty-icon {
      background: #333436;
      color: #ffc107;
    }

    body.dark-mode .feed-empty-title {
      color: #f0f0f0;
    }

    body.dark-mode .feed-empty-text {
      color: #b3b3b4;
    }

    body.dark-mode .feed-skeleton-card {
      background: #1f1f20;
      border-color: #343536;
    }

    body.dark-mode .feed-skeleton-avatar,
    body.dark-mode .feed-skeleton-line {
      background: #2c2d2f;
    }

    body.dark-mode .feed-skeleton-shimmer {
      background-image: linear-gradient(90deg, #2c2d2f 0%, #3a3b3d 45%, #2c2d2f 100%);
    }

    body.dark-mode .reddit-post-card {
      background: #1a1a1b;
      border-color: #343536;
    }

    body.dark-mode .reddit-post-card:hover {
      border-color: #818384;
    }

    body.dark-mode .rpc-title {
      color: #d7dadc;
    }

    body.dark-mode .rpc-desc {
      color: #9a9a9b;
    }

    body.dark-mode .rpc-meta {
      color: #818384;
    }

    body.dark-mode .rpc-meta .rpc-author {
      color: #ffc407;
    }

    body.dark-mode .rpc-actions {
      border-top-color: #343536;
    }

    body.dark-mode .rpc-action-btn {
      color: #818384;
    }

    body.dark-mode .rpc-action-btn:hover {
      background: #333436;
      color: #d7dadc;
    }

    body.dark-mode .rpc-action-btn.liked {
      color: #ffc407;
    }

    body.dark-mode .heart-icon.heart-filled {
      color: #ffc407;
    }

    body.dark-mode .rpc-comments-area {
      background: #121213;
    }

    body.dark-mode .rpc-comment-input-row textarea {
      background: #272729;
      border-color: #3c3c3d;
      color: #d7dadc;
    }

    body.dark-mode .reddit-sidebar .card {
      border-color: #343536;
    }

    body.dark-mode .reddit-sidebar .card-body {
      background: #1a1a1b;
    }

    body.dark-mode .kpi-gauge-card {
      background: #1e1e2d;
    }

    body.dark-mode .kpi-gauge-card .kpi-name {
      color: #ccc;
    }

    body.dark-mode .evento-date-box {
      background: #ffc407;
      color: #222222;
    }

    body.dark-mode .evento-item:hover {
      background: #2a2d31;
    }

    body.dark-mode .evento-info .ev-title {
      color: #ccc;
    }

    body.dark-mode .event-detail-modal .modal-content {
      background: #1a1a1b;
    }

    body.dark-mode .event-detail-modal .modal-body {
      background: #1a1a1b;
    }

    body.dark-mode .event-detail-chip,
    body.dark-mode .event-detail-description {
      background: #242526;
      border-color: #303236;
    }

    body.dark-mode .event-detail-label {
      color: #98a0ab;
    }

    body.dark-mode .event-detail-value {
      color: #e6e8eb;
    }

    body.dark-mode .event-detail-description .event-detail-value {
      color: #ced4da;
    }

    body.dark-mode .checklist-item {
      background: #1e1e2d;
    }

    body.dark-mode .checklist-item:hover {
      background: #2a2a3d;
      box-shadow: 0 1px 4px rgba(255, 196, 7, .15);
    }

    body.dark-mode .checklist-item .chk-name {
      color: #ddd;
    }

    body.dark-mode .checklist-item.ya-contestado {
      background: #1a1a28;
    }

    body.dark-mode .checklist-item.chk-respondido-si {
      background: #1a2e1f;
    }

    body.dark-mode .checklist-item .badge.bg-info {
      background-color: #138496 !important;
    }

    body.dark-mode .turno-header {
      color: #17a2b8;
      border-bottom-color: #17a2b8;
    }

    body.dark-mode .checklist-item.chk-respondido-no {
      background: #2e1a1a;
    }

    body.dark-mode .reddit-sidebar .card-header {
      background: #242526;
      color: #d7dadc;
      border-bottom-color: #343536;
    }

    body.dark-mode .galleryImgCl {
      background: #1f1f20;
    }

    body.dark-mode .feed-swiper-instance .swiper-slide {
      background: #1f1f20;
    }

    body.dark-mode .feed-swiper-image {
      background: #121213;
    }

    body.dark-mode .feed-swiper-instance .swiper-button-next,
    body.dark-mode .feed-swiper-instance .swiper-button-prev {
      color: #ffc107;
      background: rgba(31, 31, 32, 0.88);
    }

    body.dark-mode #fullscreen-swiper .swiper-slide img {
      background: #050506;
    }
  </style>

  <!-- Custom styles para KPI Carousel y flechas ahora en neptune/css/custom.css -->

</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <!-- <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div> -->
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
            <div class="row">
              <div class="col-12">
                <!-- KPI Pills — fila scrollable horizontal de ancho completo -->
                <div id="kpiCarouselWrapper">
                  <div id="kpiCarouselContainer" class="kpi-pills-row">
                    <!-- Se llena dinámicamente vía dashboard.js -->
                  </div>
                </div>
              </div>
            </div>

            <!-- NOVEDADES + ESPACIO DERECHA — Estilo Reddit -->
            <div class="row g-3 align-items-start">

              <!-- ═══════════════════════════════════════
                   Columna principal: Feed estilo Reddit
              ═══════════════════════════════════════ -->
              <div class="col-12 col-lg-8">


                <!-- Post Compose Box — formulario inline expansible -->
                <div class="post-compose-box" id="postComposeBox">

                  <!-- Fila trigger (visible por defecto) -->
                  <div class="post-compose-top" id="postComposeTriggerRow">
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
                          <p for="mnf_desc" data-msg="La descripción es obligatoria." class="text-danger small mb-0">
                          </p>
                        </div>
                        <div class="mb-3">
                          <label for="mnf_url" class="form-label">
                            Hipervínculo <span class="text-muted fw-normal" style="font-size:.75rem;">(opcional)</span>
                          </label>
                          <input type="url" id="mnf_url" name="mnf_url" class="form-control"
                            placeholder="https://..." />
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
                      <div id="composePublishStatus" class="small text-muted mt-2 d-none">
                        <i class="fa fa-spinner fa-spin me-1"></i> Publicando tu post, espera un momento...
                      </div>
                    </div>
                  </div>

                </div><!-- /post-compose-box -->

                <?php include("components/modalIncidencia.html"); ?>

                <!-- Feed de publicaciones -->
                <div class="reddit-feed-wrapper">
                  <div id="ContenidoFeed"></div>
                  <div id="btnLoadMoreContainer" class="text-center my-3" style="display: none;">
                    <button id="btnLoadMoreFeeds" class="btn btn-outline-secondary btn-sm px-4"
                      style="border-radius: 20px;">
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
                    <div class="card-header text-dark">
                      <i class="fas fa-calendar-alt"></i> Próximos Eventos
                    </div>
                    <div class="card-body">
                      <div id="listaEventos">
                        <p class="text-muted small text-center mb-0">Cargando eventos...</p>
                      </div>
                    </div>
                  </div>

                  <!-- Checklist del día -->
                  <div class="card">
                    <div class="card-header text-dark">
                      <i class="fas fa-check-square"></i> Checklist del día
                    </div>
                    <div class="card-body">
                      <div id="listaChecklist">
                        <p class="text-muted small text-center mb-0">Cargando checklist...</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div><!-- /col sidebar -->

            </div>
            <!-- /NOVEDADES + ESPACIO DERECHA -->

            <div class="modal fade event-detail-modal" id="eventDetailModal" tabindex="-1"
              aria-labelledby="eventDetailModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-dark" id="eventDetailModalLabel">
                      <i class="fas fa-calendar-day"></i>
                      Detalle del evento
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" id="eventDetailModalBody"></div>
                </div>
              </div>
            </div>

            <div id="fullscreen-swiper"></div>
            <div id="fullscreen-swiper-backdrop"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- neptune Javascripts (incluye jQuery, BlockUI y global.js) -->
  <?php include("neptune_js.php"); ?>
  <!-- neptune Javascripts -->

  <script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>
  <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
  <script src="plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>

  <!-- Scripts específicos de la página - SIEMPRE AL FINAL -->
  <script src="scripts/index.js?<?= time() ?>" charset="utf-8"></script>
  <script src="scripts/dashboard.js?<?= time() ?>" charset="utf-8"></script>

  <script>
    // Carga directa de eventos — misma lógica que Eventos.js
    (function cargarEventos() {
      $.ajax({
        type: 'POST',
        url: 'Backend/Eventos/App.php',
        data: { op: 'getProximosEventos' },
        success: function (response) {
          var eventos;
          try { eventos = JSON.parse(response); } catch (e) { eventos = []; }
          var el = document.getElementById('listaEventos');
          if (!el) return;
          if (!eventos || eventos.length === 0) {
            el.innerHTML = '<p class="text-muted small text-center py-2">No hay eventos próximos</p>';
            return;
          }
          var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          var html = '';
          eventos.forEach(function (ev) {
            var fecha = new Date(ev.FechaInicio + 'T00:00:00');
            var dia = fecha.getDate();
            var mes = meses[fecha.getMonth()];
            var horaIni = ev.HoraInicio ? ev.HoraInicio.substring(0, 5) : '';
            var horaFin = ev.HoraFin ? ev.HoraFin.substring(0, 5) : '';
            var horario = horaIni && horaFin ? horaIni + ' - ' + horaFin : '';
            html += '<div class="evento-item">' +
              '<div class="evento-date-box">' +
              '<div class="ev-day">' + dia + '</div>' +
              '<div class="ev-month">' + mes + '</div>' +
              '</div>' +
              '<div class="evento-info">' +
              '<div class="ev-title">' + $('<div>').text(ev.Titulo).html() + '</div>' +
              (horario ? '<div class="ev-time"><i class="far fa-clock me-1"></i>' + horario + '</div>' : '') +
              '</div>' +
              '</div>';
          });
          el.innerHTML = html;
        },
        error: function () {
          var el = document.getElementById('listaEventos');
          if (el) el.innerHTML = '<p class="text-muted small text-center py-2">Error al cargar eventos</p>';
        }
      });
    })();
  </script>

  <!-- Script: abrir/cerrar formulario inline de publicación -->
  <script>
    // Registering Syncfusion license key
    ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');

    function openComposeForm() {
      // Ocultar trigger row / acciones
      document.getElementById('postComposeTriggerRow').style.display = 'none';
      document.getElementById('postComposeDivider').style.display = 'none';
      document.getElementById('postComposeActionsRow').style.display = 'none';
      // Mostrar formulario con animación
      document.getElementById('postComposeFormContainer').style.display = 'block';
      // Foco en el primer campo
      setTimeout(function () {
        var t = document.getElementById('mnf_title');
        if (t) t.focus();
      }, 50);
    }
    function closeComposeForm() {
      if (typeof setComposePublishingState === 'function') {
        setComposePublishingState(false);
      }
      // Mostrar trigger row / acciones
      document.getElementById('postComposeTriggerRow').style.display = 'flex';
      document.getElementById('postComposeDivider').style.display = 'block';
      document.getElementById('postComposeActionsRow').style.display = 'flex';
      // Ocultar formulario
      document.getElementById('postComposeFormContainer').style.display = 'none';
      // Limpiar campos
      var form = document.getElementById('formFeed');
      if (form) form.reset();
      if (typeof resetFeedUploader === 'function') {
        resetFeedUploader();
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      var params = new URLSearchParams(window.location.search);
      if (params.get('compose') === '1') {
        openComposeForm();
      }
    });
  </script>

</body>

</html>
