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
                    <h5 class="font-medium m-b-0">Competencias</h5>
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
              <button id='btnOpenNewCompetences'></button>
              <div class="row">
                <div class="col s12">
                  <div class="card">
                    <div class="card-content">
                      <div id="content_Competences"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal modal-fixed" id="modalDetailCompetence">
              <div class="modal-content">
                <div class="row">
                  <h6>Detalles de la competencia</h6>
                  <hr>
                  <div class="col s12" style="text-align:center">
                    <h3 id="txActionCompetence"></h3>
                  </div>
                  <div class="col s12">
                    <input type="hidden" id="competenceEdit">
                    <input type="hidden" id="actionCompetence" data-noclean="true">
                    <div class="row">
                      <div class="col s12 m4">
                        <h6> * Tipo de competencia</h6>
                        <select id="slc_typeComp" required class="browser-default" style="width: 100%;"></select>
                        <p for="slc_typeComp" data-msg="El tipo de competencia es obligatorio"></p>
                      </div>
                      <div class="col s12 m8">
                        <h6> * Competencia</h6>
                        <input type="text" id="name_Comp" required>
                        <p for="name_Comp" data-msg="El n0ombre de la competencia es obligatorio"></p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col s12">
                        <h6> * Significado de la Competencia</h6>
                        <textarea id="sig_Comp" class="materialize-textarea" placeholder="Significado" required></textarea>
                        <p for="sig_Comp" data-msg="El significado de la competencia es obligatorio"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <a class="waves-effect waves-light btn btn-round green" id="acceptCompetence">Aceptar cambios</a>
              </div>
            </div>
            <script type="text/x-jsrender" id="statusTemplate">
                ${statusDetail(data)}
            </script>
            <script type="text/x-jsrender" id="updateStatusTemplate">
                ${updateStatusSY(data)}
            </script>
            <script type="text/x-jsrender" id="updateCompetenceTemplate">
                ${updateCompetenceSF(data)}
            </script>
            <script type="text/x-jsrender" id="viewDetailCompetenceTemplate">
                ${viewDetailCompetenceSF(data)}
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
    <script src="scripts/list-competences-original.js" charset="utf-8"></script>
</body>

</html>
