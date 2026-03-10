<!DOCTYPE html>
<html>

<head>

  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <style media="screen">
      input[type=file]::file-selector-button {
        margin-right: 20px;
        border: none;
        background: #084cdf;
        padding: 10px 20px;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        transition: background .2s ease-in-out;
      }

      input[type=file]::file-selector-button:hover {
        background: #0d45a5;
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
          include("menus-original.php");
           ?>
        </div>
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Evaluaciones</h5>
                    <div class="custom-breadcrumb ml-auto">
                        <a href="#!" class="breadcrumb">Home</a>
                        <a href="#!" class="breadcrumb">Inicio</a>
                    </div>
                </div>
            </div>
            <div class="row">
              <div class="col s5 offset-s7" style="position: absolute; z-index:99;">
                <div class="row">
                  <div id="contenidoMensajes" style="position:fixed;margin-right:2vh"></div>
                </div>
              </div>
            </div>
            <!-- <a href="klyns.resosistemas.mx/Archivos/Plantillas/PlantillaKlynsEvaluaciones.xlsx" download="PlantillaKlynsEvaluaciones.xlsx" data-target="right-slide-out" class="sidenav-trigger right-side-toggle btn-floating btn-large waves-effect waves-light green tooltipped scale-transition" data-position="left" data-delay="50" data-tooltip="Descargar plantilla">
              <i class="material-icons">explicit</i>
            </a> -->
            <div class="container-fluid" style="z-index:5">
              <!-- <a id='btnDownloadExcel' download="PlantillaKlynsEvaluaciones.xlsx"></a> -->
              <div class="row">
                <div class="card">
                  <div class="card-content">
                    <div class="row">
                      <div class="col s12 col m3 offset-m9">
                        <a id='btnNewEvaluation' class="btn-actionGreen" href="add-evaluation.php">Nueva Evaluación</a>
                      </div>
                      <!-- <div class="col s4 offset-s4 l2 offset-l10" style="text-align:right">
                        <button type="button" id="btn_open_new" class="AgregarBtnBlue">Nueva Evaluación</i></button>
                      </div> -->
                      <h5>Listado de evaluaciones registrado en el sistema.</h5>
                      <div id="table_Ev"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <div class="chat-windows"></div>
    </div>
    <div id="NuevaEvaluacionModal" class="modal modal-fixed-footer" style="max-height: 90vh">
      <div class="modal-content">
        <h4>Nueva Evaluación</h4>
        <form  method="post" id="FormInsertaEvaluacion">
          <div class="row">
            <div class="input-field col s12 l12">
              <input id="inpTitulo" name="inpTitulo" type="text" required>
              <label for="inpTitulo">Titulo</label>
            </div>
            <div class="col s12">
              <div class="row">
                <h6>Fechas de la evaluación</h6>
                <div class="input-field col s6 l6">
                  <input id="inpFechaInicio" name="inpFechaInicio" type="date" required>
                  <label for="inpFechaInicio">Inicio de la evaluación</label>
                </div>
                <div class="input-field col s6 l6">
                  <input id="inpFechaFin" name="inpFechaFin" type="date" required>
                  <label for="inpFechaFin">Final de la evaluación</label>
                </div>
              </div>
            </div>
            <div class="col s12">
              <div class="row">
                <h6>Periodos para la retroalimentación</h6>
                <div class="input-field col s6 l6">
                  <input type="date" id="inpRetroIni" name="inpRetroIni" required>
                  <label for="inpRetroIni">Inicio de la retroalimentación</label>
                </div>
                <div class="input-field col s6 l6">
                  <input type="date" id="inpRetroFin" name="inpRetroFin" required>
                  <label for="inpRetroFin">Final de la retroalimentación</label>
                </div>
              </div>
            </div>
            <div class="col s12">
              <div class="row">
                <h6>Fechas para la creación del plan de acción</h6>
                <div class="input-field col s6">
                  <input type="date" id="inpPlanAIni" name="inpRetroIni" required>
                  <label for="inpPlanAIni">Inicio del plan de acción</label>
                </div>
                <div class="input-field col s6">
                  <input type="date" id="inpPlanAFin" name="inpPlanAFin" required>
                  <label for="inpPlanAFin">Final del plan de acción</label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="row">
          <hr>
          <div class="col s12">
            <h6 class="font-medium m-b-30">Ingrese el archivo .xlsx con los evaluadores.</h6>
            <input type="file" id="loadEvaluators">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="waves-effect waves-green btn-flat" id="RegistrarDatosEv"style="
        box-shadow: 0px 10px 14px -7px #3e7327;
        background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
        background-color:#77b55a;
        border-radius:4px;
        border:1px solid #4b8f29;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:13px;
        font-weight:bold;
        padding:1px 6px;
        text-decoration:none;
        text-shadow:0px 1px 0px #5b8a3c;">Registrar</button>
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" ></a>
      </div>
    </div>
    <div class="modal" id="faltantes">
      <div class="modal-content">
        <h4 id="evSelectedF"></h4>
        <div class="row">
          <div id="t_unfinished_employees"></div>
        </div>
      </div>
      <div class="modal-footer">

      </div>
    </div>
    <div style="display:none;">
      <div id="contentUploadFile">
        <div class="row">
          <input type="hidden" id="evPerShare">
          <div class="col s12">
            <h6>Ingrese el archivo Excel con el listado de evaluadores.</h6>
          </div>
          <div class="col s12">
            <input type="file" id="uploadFinp">
            <hr>
          </div>
          <div class="col s12">
            <button type="button" class="btn-actionGreen" id="btnShareEvaluation"> Publicar evaluación </button>
          </div>
        </div>
      </div>
    </div>
    <script type="text/x-jsrender" id="statusTemplate">
        ${statusDetail(data)}
    </script>
    <script type="text/x-jsrender" id="updateStatusTemplate">
        ${updateStatusSY(data)}
    </script>
    <script type="text/x-jsrender" id="viewEvTemplate">
        ${viewEvSY(data)}
    </script>
    <script type="text/x-jsrender" id="viewResTemplate">
        ${viewResSY(data)}
    </script>
    <script type="text/x-jsrender" id="questTemplate">
        ${questsSY(data)}
    </script>
    <script type="text/x-jsrender" id="shareTemplate">
        ${shareSY(data)}
    </script>
    <script type="text/x-jsrender" id="RemainingTemplate">
        ${RemainingSY(data)}
    </script>
    <script type="text/x-jsrender" id="t_unfinishedTemplate">
        ${t_unfinishedSF(data)}
    </script>
    <?php include("scripts-original.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <!-- <script src="scripts/ListadoEvaluaciones/DataExcelEvaluators.js" charset="utf-8" type="module"></script> -->
    <script src="scripts/ListadoEvaluaciones/General-original.js" charset="utf-8"></script>
    <script src="scripts/ListadoEvaluaciones/ex-original.js" charset="utf-8"></script>
</body>

</html>
