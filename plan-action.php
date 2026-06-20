<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP by Lugo</title>

  <?php include("neptune_styles.php"); ?>

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <style media="screen">
    .a_addActivity {
      cursor: pointer;
    }

    .btn-addProgress,
    .btn-viewProgress {
      cursor: pointer;
    }

    .card-activity {
      background-color: #FFF;
      border-radius: 10px;
      padding: 2vh;
      background: linear-gradient(180deg, #FFB7B7 0%, #727272 100%), radial-gradient(60.91% 100% at 50% 0%, #FFD1D1 0%, #260000 100%), linear-gradient(238.72deg, #FFDDDD 0%, #720066 100%), linear-gradient(127.43deg, #00FFFF 0%, #FF4444 100%), radial-gradient(100.22% 100% at 70.57% 0%, #FF0000 0%, #00FFE0 100%), linear-gradient(127.43deg, #B7D500 0%, #3300FF 100%);
      background-blend-mode: screen, overlay, hard-light, color-burn, color-dodge, normal;
      color: #000 !important;
    }

    .card-objetive {
      background-color: #FFFFFF;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2000' height='2000' viewBox='0 0 800 800'%3E%3Cg fill='none' %3E%3Cg stroke='%23FAFAFA' stroke-width='17'%3E%3Cline x1='-8' y1='-8' x2='808' y2='808'/%3E%3Cline x1='-8' y1='792' x2='808' y2='1608'/%3E%3Cline x1='-8' y1='-808' x2='808' y2='8'/%3E%3C/g%3E%3Cg stroke='%23fafafa' stroke-width='16'%3E%3Cline x1='-8' y1='767' x2='808' y2='1583'/%3E%3Cline x1='-8' y1='17' x2='808' y2='833'/%3E%3Cline x1='-8' y1='-33' x2='808' y2='783'/%3E%3Cline x1='-8' y1='-783' x2='808' y2='33'/%3E%3C/g%3E%3Cg stroke='%23fbfbfb' stroke-width='15'%3E%3Cline x1='-8' y1='742' x2='808' y2='1558'/%3E%3Cline x1='-8' y1='42' x2='808' y2='858'/%3E%3Cline x1='-8' y1='-58' x2='808' y2='758'/%3E%3Cline x1='-8' y1='-758' x2='808' y2='58'/%3E%3C/g%3E%3Cg stroke='%23fbfbfb' stroke-width='14'%3E%3Cline x1='-8' y1='67' x2='808' y2='883'/%3E%3Cline x1='-8' y1='717' x2='808' y2='1533'/%3E%3Cline x1='-8' y1='-733' x2='808' y2='83'/%3E%3Cline x1='-8' y1='-83' x2='808' y2='733'/%3E%3C/g%3E%3Cg stroke='%23fbfbfb' stroke-width='13'%3E%3Cline x1='-8' y1='92' x2='808' y2='908'/%3E%3Cline x1='-8' y1='692' x2='808' y2='1508'/%3E%3Cline x1='-8' y1='-108' x2='808' y2='708'/%3E%3Cline x1='-8' y1='-708' x2='808' y2='108'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='12'%3E%3Cline x1='-8' y1='667' x2='808' y2='1483'/%3E%3Cline x1='-8' y1='117' x2='808' y2='933'/%3E%3Cline x1='-8' y1='-133' x2='808' y2='683'/%3E%3Cline x1='-8' y1='-683' x2='808' y2='133'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='11'%3E%3Cline x1='-8' y1='642' x2='808' y2='1458'/%3E%3Cline x1='-8' y1='142' x2='808' y2='958'/%3E%3Cline x1='-8' y1='-158' x2='808' y2='658'/%3E%3Cline x1='-8' y1='-658' x2='808' y2='158'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='10'%3E%3Cline x1='-8' y1='167' x2='808' y2='983'/%3E%3Cline x1='-8' y1='617' x2='808' y2='1433'/%3E%3Cline x1='-8' y1='-633' x2='808' y2='183'/%3E%3Cline x1='-8' y1='-183' x2='808' y2='633'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='9'%3E%3Cline x1='-8' y1='592' x2='808' y2='1408'/%3E%3Cline x1='-8' y1='192' x2='808' y2='1008'/%3E%3Cline x1='-8' y1='-608' x2='808' y2='208'/%3E%3Cline x1='-8' y1='-208' x2='808' y2='608'/%3E%3C/g%3E%3Cg stroke='%23fdfdfd' stroke-width='8'%3E%3Cline x1='-8' y1='567' x2='808' y2='1383'/%3E%3Cline x1='-8' y1='217' x2='808' y2='1033'/%3E%3Cline x1='-8' y1='-233' x2='808' y2='583'/%3E%3Cline x1='-8' y1='-583' x2='808' y2='233'/%3E%3C/g%3E%3Cg stroke='%23fdfdfd' stroke-width='7'%3E%3Cline x1='-8' y1='242' x2='808' y2='1058'/%3E%3Cline x1='-8' y1='542' x2='808' y2='1358'/%3E%3Cline x1='-8' y1='-558' x2='808' y2='258'/%3E%3Cline x1='-8' y1='-258' x2='808' y2='558'/%3E%3C/g%3E%3Cg stroke='%23fdfdfd' stroke-width='6'%3E%3Cline x1='-8' y1='267' x2='808' y2='1083'/%3E%3Cline x1='-8' y1='517' x2='808' y2='1333'/%3E%3Cline x1='-8' y1='-533' x2='808' y2='283'/%3E%3Cline x1='-8' y1='-283' x2='808' y2='533'/%3E%3C/g%3E%3Cg stroke='%23fefefe' stroke-width='5'%3E%3Cline x1='-8' y1='292' x2='808' y2='1108'/%3E%3Cline x1='-8' y1='492' x2='808' y2='1308'/%3E%3Cline x1='-8' y1='-308' x2='808' y2='508'/%3E%3Cline x1='-8' y1='-508' x2='808' y2='308'/%3E%3C/g%3E%3Cg stroke='%23fefefe' stroke-width='4'%3E%3Cline x1='-8' y1='467' x2='1283' y2='1283'/%3E%3Cline x1='-8' y1='317' x2='808' y2='1133'/%3E%3Cline x1='-8' y1='-333' x2='808' y2='483'/%3E%3Cline x1='-8' y1='-483' x2='808' y2='333'/%3E%3C/g%3E%3Cg stroke='%23fefefe' stroke-width='3'%3E%3Cline x1='-8' y1='342' x2='808' y2='1158'/%3E%3Cline x1='-8' y1='442' x2='808' y2='1258'/%3E%3Cline x1='-8' y1='-458' x2='808' y2='358'/%3E%3Cline x1='-8' y1='-358' x2='808' y2='458'/%3E%3C/g%3E%3Cg stroke='%23ffffff' stroke-width='2'%3E%3Cline x1='-8' y1='367' x2='808' y2='1183'/%3E%3Cline x1='-8' y1='417' x2='808' y2='1233'/%3E%3Cline x1='-8' y1='-433' x2='808' y2='383'/%3E%3Cline x1='-8' y1='-383' x2='808' y2='433'/%3E%3C/g%3E%3Cg stroke='%23FFFFFF' stroke-width='1'%3E%3Cline x1='-8' y1='392' x2='808' y2='1208'/%3E%3Cline x1='-8' y1='-408' x2='808' y2='408'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-attachment: fixed;
    }

    /* Estilos del Listado Checklist dentro del Acordeón */
    .checklist-item {
      background-color: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .checklist-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .checklist-status-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .checklist-status-completed {
      background-color: #d1e7dd;
      color: #0f5132;
      border: 1px solid #badbcc;
    }

    .checklist-status-pending {
      background-color: #fff3cd;
      color: #664d03;
      border: 1px solid #ffecb5;
    }

    .checklist-status-delayed {
      background-color: #f8d7da;
      color: #842029;
      border: 1px solid #f5c2c7;
    }

    /* Estilos Premium para Modales */
    .modal-header-premium {
      background-color: #fffaf0 !important;
      border-bottom: 1px solid #ffeeba !important;
    }

    .modal-alert-info {
      background-color: #fff9e6;
      border: 1px solid #ffeeba;
      color: #856404;
      border-radius: 8px;
    }

    .form-control:focus {
      border-color: #008837 !important;
      box-shadow: 0 0 0 0.25rem rgba(105, 191, 127, 0.2) !important;
    }

    .input-group-text-premium {
      background-color: #fffaf0 !important;
      border-color: #ced4da !important;
      color: #7EBF8E !important;
    }

    /* Timeline de avances */
    .progress-timeline { display: flex; flex-direction: column; gap: 0; }
    .pt-item { display: flex; min-height: 72px; }
    .pt-indicator { width: 28px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
    .pt-line { width: 2px; flex: 1; background-color: #e9ecef; }
    .pt-line-top { height: 8px; }
    .pt-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 2px #dee2e6; flex-shrink: 0; }
    .pt-dot-pending { background-color: #0dcaf0; box-shadow: 0 0 0 2px #0dcaf0; }
    .pt-dot-approved { background-color: #198754; box-shadow: 0 0 0 2px #198754; }
    .pt-dot-rejected { background-color: #dc3545; box-shadow: 0 0 0 2px #dc3545; }
    .pt-body { flex: 1; padding: 0 0 20px 14px; }
    .pt-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
    .pt-percent { font-size: 1rem; font-weight: 800; color: #212529; }
    .pt-date { font-size: 0.72rem; color: #6c757d; }
    .pt-desc { font-size: 0.85rem; color: #343a40; line-height: 1.45; margin: 4px 0 0; }
    .pt-review-reason { font-size: 0.8rem; color: #dc3545; margin-top: 4px; }
    .pt-review-meta { font-size: 0.75rem; color: #6c757d; margin-top: 2px; }
    .pt-actions { display: flex; gap: 8px; margin-top: 8px; }
    .pt-empty { font-size: 0.82rem; color: #6c757d; font-style: italic; text-align: center; padding: 16px 0; }
  </style>
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">


    <!-- Menu -->
    <div id="Menu">
      <?php include("menus.php"); ?>
    </div>

    <!-- App Container -->
    <div class="app-container">
      <?php include("includes/_Header.php"); ?>

      <div class="app-content">
        <div class="content-wrapper">
          <div class="container-fluid">

            <!-- Mensajes flotantes -->
            <div class="row">
              <div class="col-10 offset-1 col-lg-5 offset-lg-7"
                style="position: fixed; z-index: 9999; right: 20px; top: 80px;">
                <div id="contenidoMensajes" class="mb-2"></div>
                <div id="contenidoMensajesSolicitudesVJefe" class="mb-2"></div>
                <div id="contenidoMensajesSolicitudesNomina" class="mb-2"></div>
              </div>
            </div>

            <!-- Título de página -->
            <div class="row mb-3">
              <div class="col-12">
                <div class="page-description page-description-tabbed">
                  <div class="d-flex justify-content-between align-items-center">
                    <h1 class="m-0">Plan de acción</h1>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contenido Principal -->
            <div class="row">

              <!-- Barra lateral izquierda (Resumen y Acciones - Dashboard Premium) -->
              <div class="col-12 col-md-3 mb-4">

                <!-- Progreso Global del Plan -->
                <div class="card mb-3 shadow-sm border-0"
                  style="background-color: #fffaf0; border-left: 4px solid #008837 !important;">
                  <div class="card-body">
                    <h6 class="text-dark small text-uppercase fw-bold mb-2">Avance Global del Plan</h6>
                    <div class="d-flex align-items-baseline mb-2">
                      <span class="fs-2 fw-bold text-dark" id="txt_global_progress">0%</span>
                    </div>
                    <div class="progress" style="height: 8px; background-color: rgba(0,0,0,.06); border-radius: 4px;">
                      <div id="bar_global_progress" class="progress-bar" role="progressbar"
                        style="width: 0%; background-color: #008837;" aria-valuenow="0" aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>

                <!-- Resumen de Actividades -->
                <div class="card mb-3 shadow-sm border-0">
                  <div class="card-body">
                    <h6 class="text-dark small text-uppercase fw-bold mb-3">Actividades</h6>
                    <div class="row text-center">
                      <div class="col-6 border-end">
                        <span class="fs-4 fw-bold text-dark d-block" id="t_cant_act">0</span>
                        <span class="text-dark fw-bold small">Registradas</span>
                      </div>
                      <div class="col-6">
                        <span class="fs-4 fw-bold text-success d-block" id="t_cant_actF">0</span>
                        <span class="text-dark fw-bold small">Realizadas</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Resumen de autorizaciones -->
                <div class="card mb-3 shadow-sm border-0">
                  <div class="card-body">
                    <h6 class="text-dark small text-uppercase fw-bold mb-3">Aceptaciones de Flujo</h6>

                    <div class="mb-3">
                      <label class="text-dark small fw-bold d-block mb-1">Acepta Actividades (Jefe)</label>
                      <div id="t_summ_act" class="d-flex align-items-center">
                        <span class="badge bg-warning-subtle text-warning"><i class="fa-regular fa-clock me-1"></i>
                          Pendiente</span>
                      </div>
                    </div>

                    <div class="mb-1">
                      <label class="text-dark small fw-bold d-block mb-1">Acepta Plan Acción (Jefe)</label>
                      <div id="t_summ_planA" class="d-flex align-items-center">
                        <span class="badge bg-warning-subtle text-warning"><i class="fa-regular fa-clock me-1"></i>
                          Pendiente</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Aceptar Actividades (Jefe) -->
                <div class="card mb-3 shadow-sm border-0 animate__animated animate__fadeIn" id="card_acceptActivities"
                  style="display: none;">
                  <div class="card-body text-center p-3">
                    <h6 class="card-title fw-bold mb-3 small text-dark text-uppercase">Autorizar actividades registradas
                    </h6>
                    <button type="button" id="acceptActivities" class="btn btn-minimal btn-minimal-success w-100 py-2">
                      <i class="fa-solid fa-circle-check me-2"></i> Aceptar Actividades
                    </button>
                  </div>
                </div>

                <!-- Aceptar Progreso final (Jefe) -->
                <div class="card mb-3 shadow-sm border-0 animate__animated animate__fadeIn" id="card_acceptProgress"
                  style="display: none;">
                  <div class="card-body p-3">
                    <h6 class="card-title fw-bold mb-3 small text-dark text-uppercase">Autorizar progreso final</h6>
                    <p id="tx_accept_progress_note" class="small text-dark mb-3">El cierre final sólo estará disponible
                      cuando no existan avances pendientes y todas las actividades estén al 100% aprobado.</p>
                    <button type="button" id="btn_acceptProgress"
                      class="btn btn-minimal btn-minimal-success w-100 py-2 mb-2">
                      <i class="fa-solid fa-circle-check me-2"></i> Aceptar Progreso final
                    </button>
                    <button type="button" id="btn_rejectProgress" class="btn btn-minimal btn-minimal-danger w-100 py-2">
                      <i class="fa-solid fa-circle-xmark me-2"></i> Rechazar Progreso
                    </button>
                  </div>
                </div>

                <!-- Card de alerta: Plan rechazado (visible para el empleado) -->
                <div class="card mb-3 border-0 animate__animated animate__fadeIn" id="card_rechazo"
                  style="display: none; background: linear-gradient(135deg,#fff5f5,#ffe0e0); border-left: 4px solid #dc3545 !important;">
                  <div class="card-body p-3">
                    <div class="d-flex align-items-center mb-2">
                      <i class="fa-solid fa-triangle-exclamation text-danger me-2 fs-5"></i>
                      <h6 class="m-0 fw-bold text-danger small text-uppercase">Plan Rechazado</h6>
                    </div>
                    <p class="text-dark small mb-2" id="tx_rechazo_fecha" style="font-size:0.75rem;"></p>
                    <p class="text-dark small mb-2 fw-bold">Motivo:</p>
                    <p class="text-dark small mb-3" id="tx_rechazo_motivo"
                      style="font-size:0.82rem; background:#fff; border-radius:6px; padding:8px; border:1px solid #f5c6cb;">
                    </p>
                    <button type="button" id="btn_historialRechazos"
                      class="btn btn-minimal btn-minimal-secondary btn-sm w-100">
                      <i class="fa-solid fa-clock-rotate-left me-1"></i> Ver historial de rechazos
                    </button>
                  </div>
                </div>

              </div>

              <!-- Sección Derecha (Listado del Plan de Acción) -->
              <div class="col-12 col-md-9">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <h5 class="card-title fw-bold">Plan de acción</h5>
                    <h6 class="card-subtitle mb-4 text-dark">En este apartado se muestra un listado de las competencias
                      en el cual el evaluado resultó con una calificación final no óptima por competencia.</h6>

                    <!-- Acordeón Bootstrap 5 -->
                    <div class="accordion" id="accordionPlanAction">
                      <!-- Se llena dinámicamente desde scripts/plan-action.js en #dv_content_PlanActionF -->
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

  <!-- Modales -->

  <!-- Modal: Objetivo -->
  <div class="modal fade" id="modal_objetive" tabindex="-1" aria-labelledby="modalObjetiveLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header modal-header-premium py-3">
          <h5 class="modal-title fw-bold text-dark d-flex align-items-center" id="modalObjetiveLabel">
            <i class="fa-solid fa-pen-to-square text-warning me-2"></i> Editar Objetivo
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <input type="hidden" id="m_obj_objetiveAct">

          <!-- Banner Competencia Estilizado -->
          <div class="alert modal-alert-info d-flex align-items-center mb-4 p-3 shadow-none" role="alert">
            <i class="fa-solid fa-graduation-cap text-warning fs-4 me-3"></i>
            <div>
              <small class="text-uppercase fw-bold text-dark d-block"
                style="font-size: 0.65rem; letter-spacing: 0.5px;">Competencia</small>
              <span id="m_obj_competence" class="fw-bold text-dark" style="font-size: 0.9rem;"></span>
            </div>
          </div>

          <div class="mb-3">
            <label for="upd_Obj_title" class="form-label fw-bold small text-dark">* Objetivo</label>
            <textarea id="upd_Obj_title" class="form-control border-light shadow-sm bg-light" rows="2"
              placeholder="Ingrese el título del objetivo" required></textarea>
            <div class="invalid-feedback" data-msg="El título de la actividad es obligatoria"></div>
          </div>
          <div class="mb-3">
            <label for="upd_Obj_descriptions" class="form-label fw-bold small text-dark">* Descripción</label>
            <textarea id="upd_Obj_descriptions" class="form-control border-light shadow-sm bg-light" rows="4"
              placeholder="Ingrese la descripción del objetivo" required></textarea>
            <div class="invalid-feedback" data-msg="La descripción de la actividad es obligatoria"></div>
          </div>
        </div>
        <div class="modal-footer border-top-0 px-4 pb-4">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-minimal btn-minimal-success" id="btn_m_updObjetive">
            <i class="fa-solid fa-floppy-disk me-1"></i> Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Rechazar Progreso del Plan de Acción -->
  <div class="modal fade" id="modal_rejectProgress" tabindex="-1" aria-labelledby="modalRejectProgressLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header"
          style="background: linear-gradient(135deg,#fff5f5,#ffe0e0); border-bottom: 1px solid #f5c6cb;">
          <h5 class="modal-title fw-bold text-danger d-flex align-items-center" id="modalRejectProgressLabel">
            <i class="fa-solid fa-circle-xmark me-2"></i> Rechazar Progreso del Plan
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="alert d-flex align-items-start mb-4 p-3" role="alert"
            style="background:#fff3cd; border:1px solid #008837; border-radius:8px;">
            <i class="fa-solid fa-triangle-exclamation text-warning fs-5 me-3 mt-1"></i>
            <div>
              <strong class="text-dark d-block mb-1">Atención</strong>
              <span class="text-dark small">Al rechazar, el progreso de <strong>todas las actividades</strong> se
                reiniciará a <strong>0%</strong>. El empleado podrá registrar nuevos avances. El historial anterior
                quedará guardado.</span>
            </div>
          </div>
          <div id="dv_reject_inputs">
            <label for="inp_reject_motivo" class="form-label fw-bold text-dark">* Motivo del rechazo</label>
            <textarea id="inp_reject_motivo" class="form-control" rows="4"
              placeholder="Explica al empleado por qué se rechaza el progreso registrado..." required></textarea>
            <div class="invalid-feedback" data-msg="El motivo del rechazo es obligatorio"></div>
          </div>
        </div>
        <div class="modal-footer border-top-0 px-4 pb-4">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-minimal btn-minimal-danger" id="btn_m_rejectProgress">
            <i class="fa-solid fa-circle-xmark me-1"></i> Confirmar Rechazo
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Historial de Rechazos del Plan de Acción -->
  <div class="modal fade" id="modal_historialRechazos" tabindex="-1" aria-labelledby="modalHistorialRechazosLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title fw-bold text-dark d-flex align-items-center" id="modalHistorialRechazosLabel">
            <i class="fa-solid fa-clock-rotate-left text-danger me-2"></i> Historial de Rechazos
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table id="table_historialRechazos" class="table table-striped table-hover text-center w-100">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha de Rechazo</th>
                  <th>Avance al rechazar</th>
                  <th>Motivo</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Ver Progreso Final -->
  <div class="modal fade" id="modal_ViewProgressFinal" tabindex="-1" aria-labelledby="modalViewProgressFinalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="modalViewProgressFinalLabel">Actividad</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5 id="tx_modal_act_ViewProgress" class="fw-bold text-dark mb-2"></h5>
          <span id="tx_modal_desc_ViewProgress" class="text-dark d-block mb-3"></span>
          <hr>
          <div id="timeline_progressActView" class="progress-timeline"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Agregar Progreso -->
  <div class="modal fade" id="modal-addProgress" tabindex="-1" aria-labelledby="modalAddProgressLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="modalAddProgressLabel">Actividad</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5 id="tx_modal_act_addProgress" class="fw-bold text-dark mb-2"></h5>
          <span id="tx_modal_desc_addProgress" class="text-dark d-block mb-3"></span>
          <hr>
          <input type="hidden" id="inp_activity_newProgress">
          <div class="row" id="dv_inp_newProgress">
            <div class="col-12 col-md-4 mb-3">
              <label for="inp_num_newProgress" class="form-label fw-bold">* Valor del nuevo progreso</label>
              <input type="number" id="inp_num_newProgress" class="form-control" max="100" min="1" required>
              <div class="invalid-feedback" data-msg="El nuevo valor del progreso de la actividad es obligatoria"></div>
            </div>
            <div class="col-12 mb-3">
              <label for="inp_desc_newProgress" class="form-label fw-bold">* Trabajo realizado</label>
              <textarea id="inp_desc_newProgress" class="form-control" rows="3"
                placeholder="Ingrese el avance realizado" required></textarea>
              <div class="invalid-feedback" data-msg="El trabajo realizado es obligatorio"></div>
            </div>
          </div>
          <hr>
          <div id="timeline_progressAct" class="progress-timeline"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-minimal btn-minimal-success" id="btn_m_addProgress">Registrar
            Avance</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Agregar Actividad -->
  <div class="modal fade" id="modal_Activity" tabindex="-1" aria-labelledby="modalActivityLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header modal-header-premium py-3">
          <h5 class="modal-title fw-bold text-dark d-flex align-items-center" id="modalActivityLabel">
            <i class="fa-solid fa-circle-plus text-warning me-2"></i> Registrar Nueva Actividad
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <input type="hidden" id="m_add_objetiveSel">
          <div class="row" id="dv_inp_modal">
            <div class="col-12 mb-3">
              <label for="new_Act_title" class="form-label fw-bold small text-dark">* Título de la Actividad</label>
              <textarea id="new_Act_title" class="form-control border-light shadow-sm bg-light" rows="2"
                placeholder="Ingrese el título de la actividad" required></textarea>
              <div class="invalid-feedback" data-msg="El título de la actividad es obligatoria"></div>
            </div>
            <div class="col-12 mb-3">
              <label for="new_Act_descriptions" class="form-label fw-bold small text-dark">* Criterios de Éxito /
                Descripción</label>
              <textarea id="new_Act_descriptions" class="form-control border-light shadow-sm bg-light" rows="4"
                placeholder="Ingrese la descripción de la actividad" required></textarea>
              <div class="invalid-feedback" data-msg="La descripción de la actividad es obligatoria"></div>
            </div>

            <!-- Periodo de Ejecución Agrupado -->
            <div class="col-12">
              <div class="bg-light p-3 rounded mb-2 border border-light-subtle">
                <h6 class="fw-bold mb-3 text-dark small text-uppercase" style="letter-spacing: 0.5px;"><i
                    class="fa-regular fa-clock me-1 text-warning"></i> Periodo de Ejecución</h6>
                <div class="row">
                  <div class="col-12 col-md-6 mb-3 mb-md-0">
                    <label for="new_Act_DateIni" class="form-label fw-bold small text-dark">* Fecha Inicio</label>
                    <div class="input-group">
                      <span class="input-group-text input-group-text-premium"><i
                          class="fa-regular fa-calendar"></i></span>
                      <input type="date" id="new_Act_DateIni" class="form-control" required>
                    </div>
                    <div class="invalid-feedback"
                      data-msg="Es necesario ingresar la fecha en la que iniciara la actividad"></div>
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="new_Act_DateEnd" class="form-label fw-bold small text-dark">* Fecha Final</label>
                    <div class="input-group">
                      <span class="input-group-text input-group-text-premium"><i
                          class="fa-regular fa-calendar"></i></span>
                      <input type="date" id="new_Act_DateEnd" class="form-control" required>
                    </div>
                    <div class="invalid-feedback"
                      data-msg="Es necesario ingresar la fecha en la que terminara la actividad"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer border-top-0 px-4 pb-4">
          <button type="button" class="btn btn-minimal btn-minimal-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-minimal btn-minimal-success" id="btn_m_addActivity">
            <i class="fa-solid fa-plus me-1"></i> Agregar Actividad
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Neptune Javascripts -->
  <?php include("neptune_js.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/plan-action.js" charset="utf-8" type="module"></script>
</body>

</html>
