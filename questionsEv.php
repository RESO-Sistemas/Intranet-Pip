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
  <style>body { padding: 0.75rem; margin: 0; background: #fff; }</style>
</head>
<body>
  <div id="embedLoader" style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
    <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status"><span class="visually-hidden">Cargando...</span></div>
    <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
  </div>
  <script>window.addEventListener('load',function(){var e=document.getElementById('embedLoader');if(e)e.style.display='none';});</script>

  <div class="d-flex justify-content-end mb-3 gap-2">
    <button type="button" class="btn btn-primary" id="btnAddQuestion">Nueva Pregunta</button>
    <button type="button" class="btn btn-success" id="btnSaveQuestions">Guardar nuevas preguntas</button>
  </div>
  <label class="form-label text-center w-100 mb-3">A través de este formulario podrás crear las preguntas correspondientes al cuestionario, completa el formulario como se indica para registrarlo correctamente.</label>
  <div class="card shadow-sm border mb-3">
    <div class="card-body">
      <label class="text-warning"><i class="material-icons align-middle">warning</i> Listado de advertencias del formulario.</label>
      <hr>
      <ul id="contentAdv" class="list-unstyled mb-0 ps-3"><li class="text-muted">Sin advertencias</li></ul>
    </div>
  </div>
  <div class="row" id="contentQuestions"></div>

  <div class="modal fade" id="modalTypesQuestion" tabindex="-1" aria-labelledby="modalTypesQuestionTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTypesQuestionTitle">Seleccione un tipo de pregunta por agregar</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <div id="dv_typesQuestion"><div class="row">
          <div class="col-12">
            <h6>* Seleccione un tipo de pregunta</h6>
            <select class="form-select" id="sel_typeQuestion" required><option></option></select>
            <p for="sel_typeQuestion" data-msg="El tipo de pregunta es obligatorio"></p><hr>
          </div>
          <div class="col-12">
            <h6>* Seleccione una competencia</h6>
            <select class="form-select" id="sel_competenceQuestion" required></select>
            <p for="sel_competenceQuestion" data-msg="La competencia es obligatoria"></p><hr>
          </div>
        </div></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="btn_acceptType">Aceptar</button>
      </div>
    </div></div>
  </div>

  <div class="modal fade" id="modalUpdateCompetence" tabindex="-1" aria-labelledby="modalUpdateCompetenceTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalUpdateCompetenceTitle">Actualización de la competencia seleccionada para la pregunta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="updateComp_question">
        <input type="hidden" id="updateComp_typeSave">
        <div class="mb-3"><h6 id="txQuestionPerUpdateCompetence"></h6><hr></div>
        <div class="mb-3">
          <h6>* Seleccione la competencia por cambiar</h6>
          <select class="form-select" id="sel_CompetencesUpdateOld" required style="width:100%;"><option value=""></option></select>
          <p class="text-danger small" for="sel_CompetencesUpdateOld" data-msg="La competencia es obligatoria"></p><hr>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="btn_updateCompetenceOld">Actualizar</button>
      </div>
    </div></div>
  </div>

  <div class="modal fade" id="dv_newResponseExpected" tabindex="-1" aria-labelledby="newResponseExpectedTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="newResponseExpectedTitle">Niveles esperados para la respuesta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="QuestionRE">
        <div class="mb-3">
          <label class="form-label">* Seleccione uno o más niveles esperados para la respuesta a seleccionar</label>
          <select class="form-select" id="sel_lvl" multiple required style="width:100%;"></select>
          <p class="text-danger small" for="sel_lvl" data-msg="El nivel es obligatorio"></p><hr>
        </div>
        <div class="mb-3">
          <label class="form-label">Selecciona una pregunta para relacionarla con los niveles a seleccionar</label>
          <div id="content_answersM"></div><hr>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="btn_addResponseExpected">Aceptar Registros</button>
      </div>
    </div></div>
  </div>

  <div class="modal fade" id="dv_OldResponseExpected" tabindex="-1" aria-labelledby="oldResponseExpectedTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"><div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="oldResponseExpectedTitle">Niveles esperados para la respuesta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="QuestionREOld">
        <div class="mb-3">
          <label class="form-label">* Seleccione uno o más niveles esperados para la respuesta a seleccionar</label>
          <select class="form-select" id="sel_lvlOld" multiple required style="width:100%;"></select>
          <p class="text-danger small" for="sel_lvlOld" data-msg="El nivel es obligatorio"></p><hr>
        </div>
        <div class="mb-3">
          <label class="form-label">Selecciona una pregunta para relacionarla con los niveles a seleccionar</label>
          <div id="content_answersMOld"></div><hr>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" id="btn_addResponseExpectedOld">Aceptar Registros</button>
      </div>
    </div></div>
  </div>

  <script type="text/x-jsrender" id="deleteResExpectedTemplate">${deleteResExpectedSF(data)}</script>
  <script type="text/x-jsrender" id="deleteResExpectedSVTemplate">${deleteResExpectedSVSF(data)}</script>
  <script type="text/x-jsrender" id="deleteResExpectedSVNewTemplate">${deleteResExpectedSVNewSF(data)}</script>

  <?php include("neptune_js.php"); ?>
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
    html, body { height: auto !important; min-height: unset !important; background: #fff !important; overflow-x: hidden; }
    #main-wrapper { display: block !important; height: auto !important; }
    .app-container { margin-left: 0 !important; width: 100% !important; min-height: unset !important; }
    .app-content { padding-top: 0 !important; min-height: unset !important; }
    .content-wrapper { padding: 0 !important; min-height: unset !important; }
    .container { max-width: 100% !important; padding: 0 0.75rem !important; }
    .page-description, .preloader, .chat-windows { display: none !important; }
  </style>
  <?php endif; ?>

</head>



<body>

  <?php if ($embed): ?>
  <div id="embedLoader" style="position:fixed;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;gap:12px;">
    <div class="spinner-border text-primary" style="width:2.5rem;height:2.5rem;" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
    <p class="text-muted mb-0" style="font-size:0.9rem;">Cargando...</p>
  </div>
  <script>window.addEventListener('load',function(){var e=document.getElementById('embedLoader');if(e)e.style.display='none';});</script>
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

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/toastr/build/toastr.min.js"></script>
  <script src="assets/extra-libs/toastr/toastr-init.js"></script>
  <script src="scripts/questionsEv/contentFunctions.js" charset="utf-8"></script>
  <script src="scripts/questionsEv/executeFunctions.js" charset="utf-8"></script>

</body>

</html>
