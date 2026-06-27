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

    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

    <link href="https://cdn.syncfusion.com/ej2/20.3.56/material.css" rel="stylesheet">



    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

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

        #contenidoOrganigramas{

          margin-left: 3vh;

          margin-right: 3vh;

        }

    </style>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

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

                    <h5 class="font-medium m-b-0">Klyns Organigramas</h5>

                    <div class="custom-breadcrumb ml-auto">

                        <a href="#!" class="breadcrumb">Home</a>

                        <a href="#!" class="breadcrumb">Inicio</a>

                    </div>

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

            <!-- <div style="width:100%; height:700px;" id="tree"/> -->



            <div class="container-fluid" style="z-index:5">

                <div class="row">

                  <div class="col s12 l12">

                      <div class="row" id="contenidoOrganigramas"></div>

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

    <div class="chat-windows"></div>

    </div>

    <?php include("scripts-original.php"); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

    <script src="scripts/index-original.js"></script>

    <script src="scripts/orgchart.js" charset="utf-8"></script>

    <script src="scripts/organigrama-original.js"></script>

</body>



</html>
