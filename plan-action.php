<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP by Lugo</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <style media="screen">
      .a_addActivity{
        cursor: pointer;
      }

      .btn-addProgress {
        outline: 0;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        background: #00008B;
        width: 70%;
        border: 0;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
        box-sizing: border-box;
        padding: 16px 20px;
        color: #fff;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        overflow: hidden;
        cursor: pointer;
      }

      .btn-addProgress:hover {
        opacity: .95;
      }

      .btn-addProgress .animation {
        border-radius: 100%;
        animation: ripple 0.6s linear infinite;
      }

      .btn-viewProgress {
        outline: 0;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        background: #006400;
        width: 70%;
        border: 0;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
        box-sizing: border-box;
        padding: 16px 20px;
        color: #fff;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        overflow: hidden;
        cursor: pointer;
      }

      .btn-viewProgress:hover {
        opacity: .95;
      }

      .btn-viewProgress .animation {
        border-radius: 100%;
        animation: ripple 0.6s linear infinite;
      }

      @keyframes ripple {
        0% {
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1);
        }

        100% {
          box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1), 0 0 0 80px rgba(255, 255, 255, 0);
        }
      }

      .card-activity {
        background-color:#FFF;
        border-radius:10px;
        height:27vh;
        padding:2vh;
        background: linear-gradient(180deg, #FFB7B7 0%, #727272 100%), radial-gradient(60.91% 100% at 50% 0%, #FFD1D1 0%, #260000 100%), linear-gradient(238.72deg, #FFDDDD 0%, #720066 100%), linear-gradient(127.43deg, #00FFFF 0%, #FF4444 100%), radial-gradient(100.22% 100% at 70.57% 0%, #FF0000 0%, #00FFE0 100%), linear-gradient(127.43deg, #B7D500 0%, #3300FF 100%);
        background-blend-mode: screen, overlay, hard-light, color-burn, color-dodge, normal;
        color: #000 !important;:
      }
      @media (max-width: 768px) {
        .card-activity {
          background-color:#FFF;
          border-radius:10px;
          height:37vh;
          padding:1.5vh;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        }
        .btn-addProgress {
          outline: 0;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          background: #40B3A2;
          min-width: 170px;
          border: 0;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
          box-sizing: border-box;
          padding: 16px 20px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          overflow: hidden;
          cursor: pointer;
        }
        .btn-viewProgress {
          outline: 0;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          background: #730065;
          min-width: 170px;
          border: 0;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
          box-sizing: border-box;
          padding: 16px 20px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          overflow: hidden;
          cursor: pointer;
        }
      }

      .card-objetive{
        background-color: #FFFFFF;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2000' height='2000' viewBox='0 0 800 800'%3E%3Cg fill='none' %3E%3Cg stroke='%23FAFAFA' stroke-width='17'%3E%3Cline x1='-8' y1='-8' x2='808' y2='808'/%3E%3Cline x1='-8' y1='792' x2='808' y2='1608'/%3E%3Cline x1='-8' y1='-808' x2='808' y2='8'/%3E%3C/g%3E%3Cg stroke='%23fafafa' stroke-width='16'%3E%3Cline x1='-8' y1='767' x2='808' y2='1583'/%3E%3Cline x1='-8' y1='17' x2='808' y2='833'/%3E%3Cline x1='-8' y1='-33' x2='808' y2='783'/%3E%3Cline x1='-8' y1='-783' x2='808' y2='33'/%3E%3C/g%3E%3Cg stroke='%23fbfbfb' stroke-width='15'%3E%3Cline x1='-8' y1='742' x2='808' y2='1558'/%3E%3Cline x1='-8' y1='42' x2='808' y2='858'/%3E%3Cline x1='-8' y1='-58' x2='808' y2='758'/%3E%3Cline x1='-8' y1='-758' x2='808' y2='58'/%3E%3C/g%3E%3Cg stroke='%23fbfbfb' stroke-width='14'%3E%3Cline x1='-8' y1='67' x2='808' y2='883'/%3E%3Cline x1='-8' y1='717' x2='808' y2='1533'/%3E%3Cline x1='-8' y1='-733' x2='808' y2='83'/%3E%3Cline x1='-8' y1='-83' x2='808' y2='733'/%3E%3C/g%3E%3Cg stroke='%23fbfbfb' stroke-width='13'%3E%3Cline x1='-8' y1='92' x2='808' y2='908'/%3E%3Cline x1='-8' y1='692' x2='808' y2='1508'/%3E%3Cline x1='-8' y1='-108' x2='808' y2='708'/%3E%3Cline x1='-8' y1='-708' x2='808' y2='108'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='12'%3E%3Cline x1='-8' y1='667' x2='808' y2='1483'/%3E%3Cline x1='-8' y1='117' x2='808' y2='933'/%3E%3Cline x1='-8' y1='-133' x2='808' y2='683'/%3E%3Cline x1='-8' y1='-683' x2='808' y2='133'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='11'%3E%3Cline x1='-8' y1='642' x2='808' y2='1458'/%3E%3Cline x1='-8' y1='142' x2='808' y2='958'/%3E%3Cline x1='-8' y1='-158' x2='808' y2='658'/%3E%3Cline x1='-8' y1='-658' x2='808' y2='158'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='10'%3E%3Cline x1='-8' y1='167' x2='808' y2='983'/%3E%3Cline x1='-8' y1='617' x2='808' y2='1433'/%3E%3Cline x1='-8' y1='-633' x2='808' y2='183'/%3E%3Cline x1='-8' y1='-183' x2='808' y2='633'/%3E%3C/g%3E%3Cg stroke='%23fcfcfc' stroke-width='9'%3E%3Cline x1='-8' y1='592' x2='808' y2='1408'/%3E%3Cline x1='-8' y1='192' x2='808' y2='1008'/%3E%3Cline x1='-8' y1='-608' x2='808' y2='208'/%3E%3Cline x1='-8' y1='-208' x2='808' y2='608'/%3E%3C/g%3E%3Cg stroke='%23fdfdfd' stroke-width='8'%3E%3Cline x1='-8' y1='567' x2='808' y2='1383'/%3E%3Cline x1='-8' y1='217' x2='808' y2='1033'/%3E%3Cline x1='-8' y1='-233' x2='808' y2='583'/%3E%3Cline x1='-8' y1='-583' x2='808' y2='233'/%3E%3C/g%3E%3Cg stroke='%23fdfdfd' stroke-width='7'%3E%3Cline x1='-8' y1='242' x2='808' y2='1058'/%3E%3Cline x1='-8' y1='542' x2='808' y2='1358'/%3E%3Cline x1='-8' y1='-558' x2='808' y2='258'/%3E%3Cline x1='-8' y1='-258' x2='808' y2='558'/%3E%3C/g%3E%3Cg stroke='%23fdfdfd' stroke-width='6'%3E%3Cline x1='-8' y1='267' x2='808' y2='1083'/%3E%3Cline x1='-8' y1='517' x2='808' y2='1333'/%3E%3Cline x1='-8' y1='-533' x2='808' y2='283'/%3E%3Cline x1='-8' y1='-283' x2='808' y2='533'/%3E%3C/g%3E%3Cg stroke='%23fefefe' stroke-width='5'%3E%3Cline x1='-8' y1='292' x2='808' y2='1108'/%3E%3Cline x1='-8' y1='492' x2='808' y2='1308'/%3E%3Cline x1='-8' y1='-308' x2='808' y2='508'/%3E%3Cline x1='-8' y1='-508' x2='808' y2='308'/%3E%3C/g%3E%3Cg stroke='%23fefefe' stroke-width='4'%3E%3Cline x1='-8' y1='467' x2='808' y2='1283'/%3E%3Cline x1='-8' y1='317' x2='808' y2='1133'/%3E%3Cline x1='-8' y1='-333' x2='808' y2='483'/%3E%3Cline x1='-8' y1='-483' x2='808' y2='333'/%3E%3C/g%3E%3Cg stroke='%23fefefe' stroke-width='3'%3E%3Cline x1='-8' y1='342' x2='808' y2='1158'/%3E%3Cline x1='-8' y1='442' x2='808' y2='1258'/%3E%3Cline x1='-8' y1='-458' x2='808' y2='358'/%3E%3Cline x1='-8' y1='-358' x2='808' y2='458'/%3E%3C/g%3E%3Cg stroke='%23ffffff' stroke-width='2'%3E%3Cline x1='-8' y1='367' x2='808' y2='1183'/%3E%3Cline x1='-8' y1='417' x2='808' y2='1233'/%3E%3Cline x1='-8' y1='-433' x2='808' y2='383'/%3E%3Cline x1='-8' y1='-383' x2='808' y2='433'/%3E%3C/g%3E%3Cg stroke='%23FFFFFF' stroke-width='1'%3E%3Cline x1='-8' y1='392' x2='808' y2='1208'/%3E%3Cline x1='-8' y1='-408' x2='808' y2='408'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
      }
    </style>
</head>

<body>
    <div class="main-wrapper" id="main-wrapper">
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
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Plan de acción</h5>
                </div>
            </div>
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
            <div class="container-fluid" style="z-index:5">
              <div class="row">
                <div class="col s12 m3">
                  <div class="row">
                    <div class="col s12">
                      <div class="card">
                        <div class="card-content">
                          <span class="card-title">Resumen deActividades</span>
                          <div class="table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>Cantidad de actividades</th>
                                  <th id="t_cant_act"></th>
                                </tr>
                                <tr>
                                  <th>Actividades completadas</th>
                                  <th id="t_cant_actF"></th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col s12">
                      <div class="card">
                        <div class="card-content">
                          <span class="card-title">Resumen de autorizaciones</span>
                          <div class="table-responsive">
                            <table id="table_summary">
                              <thead>
                                <tr>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </thead>
                              <tbody>
                                <!-- <tr>
                                  <th>Retroalimentación</th>
                                  <th id="t_summ_retro"></th>
                                </tr> -->
                                <tr>
                                  <th>Acepta Actividades</th>
                                  <th id="t_summ_act"></th>
                                </tr>
                                <tr>
                                  <th>Acepta plan acción</th>
                                  <th id="t_summ_planA"></th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col s12" id="card_acceptActivities">
                      <div class="card">
                        <div class="card-content">
                          <span class="card-title">Aceptar las actividades registradas por el evaluado</span>
                          <button type="button" id="acceptActivities" class="btnAceptarVerde" style="width: 100%;">Aceptar Actividades</button>
                        </div>
                      </div>
                    </div>
                    <div class="col s12" id="card_acceptProgress">
                      <div class="card">
                        <div class="card-content">
                          <span class="card-title">Aceptar el progreso final del evaluado</span>
                          <button type="button" id="btn_acceptProgress" class="btnAceptarVerde" style="width: 100%;">Aceptar Progreso final</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12 m9">
                  <div class="card">
                    <div class="card-content">
                      <span class="card-title">Plan de acción</span>
                      <span class="card-subtitle">En este apartado se muestra un listado de las competencias en el cual el evaluado resulto con una calificación final no óptima por competencia.</span>
                      <ul class="collapsible popout collapsible-dark" id="dv_content_PlanActionF"></ul>
                      <!-- <div class="row" id="dv_content_PlanAction"></div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal" id="modal_objetive">
              <div class="modal-content">
                <input type="hidden" id="m_obj_objetiveAct">
                <div class="row">
                  <div class="col s12">
                    <h4>Competencia</h4>
                    <h6 id="m_obj_competence"></h6>
                    <hr>
                  </div>
                  <div class="col s12">
                    <h6>* Objetivo</h6>
                    <textarea id="upd_Obj_title" class="materialize-textarea" placeholder="Ingrese el título del objetivo" required></textarea>
                    <p for="upd_Obj_title" data-msg="El título de la actividad es obligatoria"></p>
                  </div>
                  <div class="col s12">
                    <h6>* Descripción</h6>
                    <textarea id="upd_Obj_descriptions" class="materialize-textarea" placeholder="Ingrese la descripción del objetivo" required></textarea>
                    <p for="upd_Obj_descriptions" data-msg="La descripción de la actividad es obligatoria"></p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <a class="waves-effect waves-light btn btn-round green" id="btn_m_updObjetive">Actualizar</a>
              </div>
            </div>
            <div class="modal modal-fixed-footer" id="modal_ViewProgressFinal">
              <div class="modal-content">
                <div class="col s12">
                  <h3 class="card-title">Actividad</h3>
                  <h5 id="tx_modal_act_ViewProgress"></h5>
                  <span id="tx_modal_desc_ViewProgress"></span>
                </div>
                <div class="col s12">
                  <div class="table-responsive">
                    <table id="table_progressActView" class="centered striped">
                      <thead>
                        <tr>
                          <th>Descripción</th>
                          <th>Fecha</th>
                          <th>Avance</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-light btn btn-round green">Cerrar</a>
              </div>
            </div>
            <div class="modal modal-fixed-footer" id="modal-addProgress">
              <div class="modal-content">
                <div class="row">
                  <div class="col s12">
                    <h3 class="card-title">Actividad</h3>
                    <hr>
                    <h5 id="tx_modal_act_addProgress"></h5>
                    <span id="tx_modal_desc_addProgress"></span>
                    <hr>
                  </div>
                  <div class="col s12">
                    <input type="hidden" id="inp_activity_newProgress">
                    <div class="row" id="dv_inp_newProgress">
                      <div class="col s12 m3">
                          <h6>* Valor del nuevo progreso</h6>
                          <input type="number" id="inp_num_newProgress" max="100" required min="0">
                          <p for="inp_num_newProgress" data-msg="El nuevo valor del progreso de la actividad es obligatoria"></p>
                      </div>
                      <div class="input-field col s12">
                          <h6>* Trabajo realizado</h6>
                          <textarea id="inp_desc_newProgress" class="materialize-textarea" placeholder="Ingrese el avance realizado" required></textarea>
                          <p for="inp_desc_newProgress" data-msg="El trabajo realizado es obligatorio"></p>
                      </div>
                    </div>
                  </div>
                  <div class="col s12">
                    <div class="table-responsive">
                      <table id="table_progressAct">
                        <thead>
                          <tr>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Avance</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <a class="waves-effect waves-light btn btn-round green" id="btn_m_addProgress">Agregar Actividad</a>
              </div>
            </div>
            <div class="modal" id="modal_Activity">
              <div class="modal-content">
                <h4 class="">Nueva Actividad</h4>
                <input type="hidden" id="m_add_objetiveSel">
                <div class="row" id="dv_inp_modal">
                  <div class="col s12">
                      <h6>* Título</h6>
                      <textarea id="new_Act_title" class="materialize-textarea" placeholder="Ingrese el título de la actividad" required></textarea>
                      <p for="new_Act_title" data-msg="El título de la actividad es obligatoria"></p>
                  </div>
                  <div class="col s12">
                      <h6>* Descripción</h6>
                      <textarea id="new_Act_descriptions" class="materialize-textarea" placeholder="Ingrese la descripción de la actividad" required></textarea>
                      <p for="new_Act_descriptions" data-msg="La descripción de la actividad es obligatoria"></p>
                  </div>
                  <div class="col s12 m6">
                    <h6>* Fecha Inicio de la actividad</h6>
                    <input type="date" id="new_Act_DateIni" required>
                    <p for="new_Act_DateIni" data-msg="Es necesario ingresar la fecha en la que iniciara la actividad"></p>
                  </div>
                  <div class="col s12 m6">
                    <h6>* Fecha final de la actividad</h6>
                    <input type="date" id="new_Act_DateEnd" required>
                    <p for="new_Act_DateEnd" data-msg="Es necesario ingresar la fecha en la que terminara la actividad"></p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <a class="waves-effect waves-light btn btn-round green" id="btn_m_addActivity">Agregar Actividad</a>
              </div>
            </div>
        <div class="chat-windows"></div>
    </div>

    <?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/plan-action.js" charset="utf-8" type="module"></script>
</body>

</html>
