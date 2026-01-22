<!DOCTYPE html>
<html>

<head>
    <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <style media="screen">
        .changeCompetenceSV {
            cursor: pointer;
            color: #db0021;
            font-size: 20px;
        }

        .changeCompetenceSV:hover {
            color: #062865;
            font-size: 23px;
        }

        .card {
            box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
            border-radius: 15px;
        }
    </style>
</head>

<body>
    <div class="main-wrapper" id="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">Klyns</p>
            </div>
        </div>
        <div id="Menu">
            <?php
            include("menus-original.php");
            ?>
        </div>
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Preguntas</h5>
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
                    <div class="col s12 m9">
                        <div class="row">
                            <div class="col s12">
                                <div class="card">
                                    <div class="card-content">
                                        <h5>A través de este formulario podrás crear las preguntas correspondientes al cuestionario, completa el formulario como se indica para registrarlo correctamente</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12">
                                <div class="row" id="contentQuestions"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m3" style="position:relative;">
                        <div class="row">
                            <div class="col s12">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col s12">
                                                <button type="button" class="btn-actionRed" onclick="window.location.href='ListadoEvaluaciones.php'">Regresar</button>
                                                <hr>
                                            </div>
                                            <div class="col s12">
                                                <button type="button" class="btn-actionBlue" id="btnAddQuestion">Nueva Pregunta</button>
                                                <hr>
                                            </div>
                                            <div class="col s12">
                                                <button type="button" class="btn-actionGreen" id="btnSaveQuestions">Guardar nuevas preguntas</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="col s12">
                                            <h5>Listado de advertencias</h5>
                                            <hr>
                                        </div>
                                        <ul id="contentAdv">
                                            <li>Sin advertencias</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: none">
                <div id="dv_typesQuestion">
                    <div class="row">
                        <div class="col s12">
                            <h6>* Seleccione un tipo de pregunta</h6>
                            <select class="browser-default" id="sel_typeQuestion" required style="width: 100%;"></select>
                            <p for="sel_typeQuestion" data-msg="El tipo de pregunta es obligatorio"></p>
                            <hr>
                        </div>
                        <div class="col s12">
                            <h6>* Seleccione una competencia</h6>
                            <select class="browser-default" id="sel_competenceQuestion" required style="width: 100%;">
                                <option ></option>
                            </select>
                            <p for="sel_competenceQuestion" data-msg="La competencia es obligatoria"></p>
                            <hr>
                        </div>
                        <div class="col s12">
                            <button type="button" class="btn-actionGreen" id="btn_acceptType"> Aceptar </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display:none">
                <div id="dv_newResponseExpected">
                    <input type="hidden" id="QuestionRE">
                    <div class="col s12">
                        <h6>* Seleccione uno o más niveles esperados para la respuesta a seleccionar</h6>
                        <select class="browser-default" id="sel_lvl" multiple required style="width: 100%;"></select>
                        <p for="sel_lvl" data-msg="El nivel es obligatorio"></p>
                        <hr>
                    </div>
                    <div class="col s12">
                        <h6>Selecciona una pregunta para relacionarla con los niveles a seleccionar</h6>
                        <div id="content_answersM"></div>
                        <hr>
                    </div>
                    <button type="button" class="btn-actionGreen" name="button" id="btn_addResponseExpected">Aceptar Registros</button>
                </div>
            </div>
            <div style="display:none">
                <div id="dv_OldResponseExpected">
                    <input type="hidden" id="QuestionREOld">
                    <div class="col s12">
                        <h6>* Seleccione uno o más niveles esperados para la respuesta a seleccionar</h6>
                        <select class="browser-default" id="sel_lvlOld" multiple required style="width: 100%;"></select>
                        <p for="sel_lvlOld" data-msg="El nivel es obligatorio"></p>
                        <hr>
                    </div>
                    <div class="col s12">
                        <h6>Selecciona una pregunta para relacionarla con los niveles a seleccionar</h6>
                        <div id="content_answersMOld"></div>
                        <hr>
                    </div>
                    <button type="button" class="btn-actionGreen" name="button" id="btn_addResponseExpectedOld">Aceptar Registros</button>
                </div>
            </div>
            <div style="display:none">
                <div id="dv_UpdateCompetence">
                    <input type="hidden" id="updateComp_question">
                    <input type="hidden" id="updateComp_typeSave">
                    <div class="row">
                        <div class="col s12">
                            <h5 id="txQuestionPerUpdateCompetence"></h5>
                            <hr>
                        </div>
                        <div class="col s12">
                            <h6>* Seleccione la competencia por cambiar</h6>
                            <select class="browser-default" id="sel_CompetencesUpdateOld" required style="width: 100%;"></select>
                            <p for="sel_CompetencesUpdateOld" data-msg="La competencia es obligatoria"></p>
                            <hr>
                        </div>
                    </div>
                    <button type="button" class="btn-actionGreen" name="button" id="btn_updateCompetenceOld">Actualizar</button>
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
        </div>
    </div>

    <?php include("scripts-original.php"); ?>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/questionsEv/contentFunctions-original.js" charset="utf-8"></script>
    <script src="scripts/questionsEv/executeFunctions-original.js" charset="utf-8"></script>
</body>

</html>