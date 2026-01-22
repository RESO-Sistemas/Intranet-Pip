<!DOCTYPE html>
<html>

<head>
    <?php //include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <link href="https://cdn.syncfusion.com/ej2/20.3.56/material.css" rel="stylesheet">
    <style media="screen">
       [data-l-id] path {
            stroke: #212121;
       }
       .FondoOrg>svg {
            background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
       }
       [data-n-id] rect {
          fill: #fff;
        }
       .boc-edit-form-header {
         background-color: #E32636 !important;
       }
       .boc-input {
         padding: 1vh !important;
       }
    </style>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>

<body>
    <div class="main-wrapper" id="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">Klyns</p>
            </div>
        </div>
        <div class="page-wrapper">
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
                    <div class="">
                        <div class="row">
                            <div class="col s12 l12">
                                <div class="row" id="contenidoOrganigramas"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div style="display:none;">
              <div id="cDetEmp" class="row">
                <div class="center-align m-t-30">
                  <h3 class="card-title m-t-10" id="nameEmpS"></h3>
                  <img src="assets/Klyns.png" style="width:50%;" id="imgFotoEmp">
                  <h5 class="card-subtitle" id="puestoEmpS"></h5>
                  <h5 class="card-subtitle" id="emailEmpS"></h5>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="chat-windows"></div>
    </div>
    <?php include("scripts.php"); ?>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/index.js"></script>
    <!-- <script src="scripts/orgchart.js" charset="utf-8"></script> -->
    <script src="scripts/OrganigramaApp.js"></script>
</body>

</html>
