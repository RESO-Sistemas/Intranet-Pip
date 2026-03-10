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
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <style media="screen">
    .btn-Go {
      cursor: pointer;
      font-weight: 700;
      font-family: Helvetica,"sans-serif";
      transition: all .2s;
      padding: 10px 20px;
      border-radius: 100px;
      background: transparent;
      border: 1px solid #212121;
      display: flex;
      align-items: center;
      font-size: 15px;
      width: 70%;
      color: #000;
      margin: auto;
    }

    .btn-Go:hover {
      background: transparent;
    }

    .btn-Go > svg {
      width: 34px;
      margin-left: 10px;
      transition: transform .3s ease-in-out;
      color: #FFF;
    }

    .btn-Go:hover svg {
      transform: translateX(5px);
    }

    .btn-Go:active {
      transform: scale(0.95);
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
                    <h5 class="font-medium m-b-0">Evaluaciones pendientes por completar</h5>
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
                  <div class="card">
                    <div class="card-content">
                      <h6>En este apartado se muestra un listado de todas las evaluaciones disponibles por completar.</h6>
                      <!-- <table id="table_listEvaluations" class="centered">
                        <thead>
                          <tr>
                            <th>Evaluación</th>
                            <th>Fecha Inicio</th>
                            <th>Fech Fin</th>
                            <th>Avance</th>
                            <th>Ver Detalles</th>
                          </tr>
                        </thead>
                      </table> -->
                      <div id="table_listEvaluations"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal" id="modal_Evaluated">
              <div class="modal-content">
                <h4 id="title_evaluation"></h4>
                <hr>
                <h6>Listado de evaluados</h6>
                <!-- <table id="table_evaluated" class="centered">
                  <thead>
                    <tr>
                      <th>Empleado Evaluado</th>
                      <th>Respuestas</th>
                      <th>Tipo Evaluado</th>
                      <th>Estado Evaluación</th>
                      <th>Realizar Evaluación</th>
                    </tr>
                  </thead>
                </table> -->
                <div id="table_evaluated"></div>
              </div>
              <div class="modal-footer">

              </div>
            </div>
            <script type="text/x-jsrender" id="mainAdvanceTemplate">
                ${mainAdvanceSF(data)}
            </script>
            <script type="text/x-jsrender" id="viewEvTemplate">
                ${viewEvSY(data)}
            </script>
            <script type="text/x-jsrender" id="btnGoEvaluationTemplate">
                ${btnGoEvaluationSF(data)}
            </script>
    </div>

    <?php include("scripts-original.php"); ?>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/pending-evaluations-original.js" charset="utf-8"></script>
</body>


</html>
