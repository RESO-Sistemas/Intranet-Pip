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

  <title>PIP Intranet</title>

  <!-- Styles neptune -->



  <?php include("neptune_styles.php");  ?>



  <!-- Styles neptune -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css"> -->



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

                  <h1>Nueva Evaluación</h1>

                </div>

              </div>

            </div>

            <!-- NUEVA EVALUACION -->

            <div class="row">

              <div class="col">

                <div class="card">

                  <div class="card-body">

                    <label class="form-label text-center w-100">

                      A través de este formulario podrás crear un nuevo cuestionario, completa el formulario como

                      se indica para registrarlo correctamente.

                    </label>

                    <div class="row align-items-center mb-4">

                      <label class="card-title mb-0 text-center w-100">Datos Generales</label>

                    </div>

                    <div class="row align-items-center mb-4">

                      <div class="col-12" id="dv_DataGeneral">

                        <div class="row mb-3">

                          <div class="col-12 col-lg-6 mb-3 mb-lg-0">

                            <label class="form-label mb-0">* Tipo de Cuestionario:</label>

                            <select class="form-select form-control-solid-bordered" id="tipoEvaluacion" required>

                              <option value="">Seleccione un tipo</option>

                              <option value="1">Evaluación 360°</option>

                              <option value="2">Encuesta Normal</option>

                            </select>

                            <p for="tipoEvaluacion" data-msg="El tipo de cuestionario es obligatorio"></p>

                          </div>

                          <div class="col-12 col-lg-6" id="divPeriodicidad" style="display: none;">

                            <label class="form-label mb-0">* Periodicidad:</label>

                            <select class="form-select form-control-solid-bordered" id="periodicidad">

                              <option value="">Seleccione una periodicidad</option>

                              <option value="1">Diario</option>

                              <option value="2">Semanal</option>

                              <option value="3">Mensual</option>

                              <option value="4">Único</option>

                            </select>

                            <p for="periodicidad" data-msg="La periodicidad es obligatoria para encuestas normales"></p>

                          </div>

                        </div>

                        <div class="row mb-3">

                          <div class="col-12 col-lg-6 mb-3 mb-lg-0">

                            <label class="form-label mb-0">* A quién va dirigido:</label>

                            <select class="form-select form-control-solid-bordered" id="dirigidoA" required>

                              <option value="">Seleccione el público objetivo</option>

                              <option value="1">Empleados</option>

                              <option value="2">Postulantes</option>

                            </select>

                            <p for="dirigidoA" data-msg="Debe especificar a quién va dirigido el cuestionario"></p>

                          </div>

                          <div class="col-12 col-lg-6">

                            <label class="form-label mb-0">* Titulo:</label>

                            <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" type="text" id="title_c" required>

                            <p for="title_c" data-msg="El título del cuestionario es obligatorio"></p>

                          </div>

                        </div>

                      </div>

                    </div>

                    <!-- Sección de retroalimentación y plan de acción (solo para 360) -->

                    <div id="seccion360Config" style="display: none;">

                    </div>

                    <!-- Sección de selección de participantes -->

                    <div class="row align-items-center mb-4">

                      <label class="card-title mb-0 text-center w-100">Selección de Participantes</label>

                    </div>

                    <div class="row mb-4" id="divParticipantes">

                      <div class="col-12 col-md-6 col-lg-4 mb-3">

                        <label class="form-label mb-0">División / Empresa:</label>

                        <select class="form-select form-control-solid-bordered" id="slctDivision">

                          <option value="">Todas las Divisiones</option>

                        </select>

                      </div>

                      <div class="col-12 col-md-6 col-lg-4 mb-3">

                        <label class="form-label mb-0">Sucursal / Departamento:</label>

                        <select class="form-select form-control-solid-bordered" id="slctSucursal">

                          <option value="">Todas las Sucursales</option>

                        </select>

                      </div>

                      <div class="col-12 col-md-6 col-lg-4 mb-3">

                        <label class="form-label mb-0">Puesto:</label>

                        <select class="form-select form-control-solid-bordered" id="slctPuesto">

                          <option value="">Todos los Puestos</option>

                        </select>

                      </div>

                      <div class="col-12 mb-3">

                        <label class="form-label mb-0">* Empleados Participantes:</label>

                        <select class="form-select form-control-solid-bordered" id="slctEmpleados" multiple="multiple" style="width: 100%;">

                        </select>

                        <p for="slctEmpleados" data-msg="Debe seleccionar al menos un empleado participante"></p>

                      </div>

                    </div>

                    <!-- En globa todo el formulario -->

                    <div class="row-12" id="dv_Dates">

                      <div class="row align-items-center mb-4">

                        <label class="card-title mb-0 text-center w-100">Fechas de Evaluación</label>

                      </div>

                      <div class="row mb-4">

                        <div class="col-12 col-md-6 mb-3 mb-md-0">

                          <label class="form-label mb-0">* Inicio de la evaluación:</label>

                          <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" id="inpFechaInicio" name="inpFechaInicio" type="date" required>

                          <p for="inpFechaInicio" data-msg="Dato obligatorio"></p>

                        </div>

                        <div class="col-12 col-md-6">

                          <label class="form-label mb-0">* Final de la evaluación:</label>

                          <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" id="inpFechaFin" name="inpFechaFin" type="date" required>

                          <p for="inpFechaFin" data-msg="Dato obligatorio"></p>

                        </div>

                      </div>

                      <!-- Sección de retroalimentación (solo para 360) -->

                      <div id="seccionRetroYPlan">

                        <div class="row align-items-center mb-4">

                          <label class="card-title mb-0 text-center w-100">Periodos para la retroalimentación</label>

                        </div>

                        <div class="row mb-4">

                          <div class="col-12 col-md-6 mb-3 mb-md-0">

                            <label class="form-label mb-0">* Inicio de la retroalimentación:</label>

                            <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" type="date" id="inpRetroIni" name="inpRetroIni" required>

                            <p for="inpRetroIni" data-msg="Dato obligatorio"></p>

                          </div>

                          <div class="col-12 col-md-6">

                            <label class="form-label mb-0">* Final de la retroalimentación:</label>

                            <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" type="date" id="inpRetroFin" name="inpRetroFin" required>

                            <p for="inpRetroFin" data-msg="Dato obligatorio"></p>

                          </div>

                        </div>

                        <div class="row align-items-center mb-4">

                          <label class="card-title mb-0 text-center w-100">Fechas para la creación del plan de acción</label>

                        </div>

                        <div class="row mb-4">

                          <div class="col-12 col-md-6 mb-3 mb-md-0">

                            <label class="form-label mb-0">* Inicio del plan de acción:</label>

                            <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" type="date" id="inpPlanAIni" name="inpPlanAIni" required>

                            <p for="inpPlanAIni" data-msg="Dato obligatorio"></p>

                          </div>

                          <div class="col-12 col-md-6">

                            <label class="form-label mb-0">* Final del plan de acción:</label>

                            <input class="form-control form-control-solid-bordered" aria-describedby="transparentInputExample" type="date" id="inpPlanAFin" name="inpPlanAFin" required>

                            <p for="inpPlanAFin" data-msg="Dato obligatorio"></p>

                          </div>

                        </div>

                      </div>

                      <div class="row justify-content-center mb-4">

                        <div class="col-12">

                          <div class="d-flex flex-column flex-md-row justify-content-between gap-3 mt-3">

                            <button type="button" class="btn btn-danger" onclick="window.location.href='ListadoEvaluaciones.php'">Regresar</button>

                            <button type="button" class="btn btn-success" id="btn_SaveData">Guardar Formulario</button>

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

    </div>

    <div class="chat-windows"></div>

  </div>





  <!-- neptune Javascripts -->

  <?php include("neptune_js.php");  ?>

  <!-- neptune Javascripts -->





  <?php include("scripts.php"); ?>

  <!-- <script src="https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js" charset="utf-8"></script> -->

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- global-csoriginal.js removed - global.js already loaded by neptune_js.php -->

  <script src="assets/libs/toastr/build/toastr.min.js"></script>

  <script src="assets/extra-libs/toastr/toastr-init.js"></script>

  <script src="scripts/add-evaluation/General.js" charset="utf-8"></script>



</body>



</html>