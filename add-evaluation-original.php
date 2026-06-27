<!DOCTYPE html>

<html>



<head>

  <?php include("estilos.php"); ?>
<title>La Esmeralda</title>
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

    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css"> -->

    <style media="screen">

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

          include("menus-original.php");

           ?>

        </div>

        <div class="page-wrapper">

            <div class="page-titles">

                <div class="d-flex align-items-center">

                    <h5 class="font-medium m-b-0">Nueva evaluación</h5>

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

                <div class="col s12">

                  <h5>A través de este formulario podrás crear un nuevo cuestionario, completa el formulario como

                    se indica para registrarlo correctamente.</h5>

                </div>

                <div class="col s12 m9">

                  <div class="row">

                    <div class="col s12">

                      <div class="card">

                        <div class="card-content">

                          <div class="row">

                            <h3>Datos Generales</h3>

                            <div class="col s12" id="dv_DataGeneral">

                              <h4>Título</h4>

                              <input type="text" id="title_c" required>

                              <p for="title_c" data-msg="El título del cuestionario es obligatorio"></p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div class="col s12">

                      <div class="card">

                        <div class="card-content">

                          <h4>Periodicidad</h4>

                          <div class="row" id="dv_Dates">

                            <div class="col s12">

                              <h4>Fechas de la evaluación</h4>

                              <div class="row">

                                <div class="input-field col s6 l6">

                                  <h6>* Inicio de la evaluación</h6>

                                  <input id="inpFechaInicio" name="inpFechaInicio" type="date" required="">

                                  <p for="inpFechaInicio" data-msg="Dato obligatorio"></p>

                                </div>

                                <div class="input-field col s6 l6">

                                  <h6>* Final de la evaluación</h6>

                                  <input id="inpFechaFin" name="inpFechaFin" type="date" required="">

                                  <p for="inpFechaFin" data-msg="Dato obligatorio"></p>

                                </div>

                              </div>

                            </div>

                            <div class="col s12">

                              <h4>Periodos para la retroalimentación</h4>

                              <div class="row">

                                <div class="input-field col s6 l6">

                                  <h6>* Inicio de la retroalimentación</h6>

                                  <input type="date" id="inpRetroIni" name="inpRetroIni" required="">

                                  <p for="inpRetroIni" data-msg="Dato obligatorio"></p>

                                </div>

                                <div class="input-field col s6 l6">

                                  <h6>* Final de la retroalimentación</h6>

                                  <input type="date" id="inpRetroFin" name="inpRetroFin" required="">

                                  <p for="inpRetroFin" data-msg="Dato obligatorio"></p>

                                </div>

                              </div>

                            </div>

                            <div class="col s12">

                              <h4>Fechas para la creación del plan de acción</h4>

                              <div class="row">

                                <div class="input-field col s6">

                                  <h6>* Inicio del plan de acción</h6>

                                  <input type="date" id="inpPlanAIni" name="inpRetroIni" required="">

                                  <p for="inpPlanAIni" data-msg="Dato obligatorio"></p>

                                </div>

                                <div class="input-field col s6">

                                  <h6>* Final del plan de acción</h6>

                                  <input type="date" id="inpPlanAFin" name="inpPlanAFin" required="">

                                  <p for="inpPlanAFin" data-msg="Dato obligatorio"></p>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div class="col s12 m3">

                  <div class="card">

                    <div class="card-content">

                      <div class="row">

                        <div class="col s12">

                          <button type="button" class="btn-actionRed" onclick="window.location.href='ListadoEvaluaciones.php'">Regresar</button>

                          <hr>

                        </div>

                        <div class="col s12">

                          <button type="button" class="btn-actionGreen" id="btn_SaveData">Guardar Formulario</button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>



        <div class="chat-windows"></div>

      </div>

    </div>



    <?php include("scripts-original.php"); ?>

    <!-- <script src="https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js" charset="utf-8"></script> -->

    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

    <script src="assets/libs/toastr/build/toastr.min.js"></script>

    <script src="assets/extra-libs/toastr/toastr-init.js"></script>

    <script src="scripts/add-evaluation/General.js" charset="utf-8" type="module"></script>

</body>



</html>
