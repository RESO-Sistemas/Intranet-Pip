<?php include("AutorizaPagina.php"); ?>
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

    <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">

    <link href="plugins/tabulator/dist/css/tabulator_modern.min.css" rel="stylesheet">

    <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>

    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

    <style media="screen">

      .generalGraph {

        height:700px;

        overflow-x:scroll;

        overflow-y:scroll;

      }



      .cllDatosFinales{

        border: 1px solid red;

        padding:1vh;

        border-radius: 8px;

      }

      @media(max-width: 768px){

        .generalGraph {

          height:500px;

          width: 500px;

          overflow-x:scroll;

          overflow-y:scroll;

        }



        .cllDatosFinales{

          border: 1px solid red;

          padding:1vh;

        }

        .card-profile{

            height: 500px;

            background-color: rgba(255, 255, 255, 0.06);

            -webkit-backdrop-filter: blur(20px);

                    backdrop-filter: blur(20px);

             margin: auto;

            left: 0;

            right: 0;

            top: 0;

            bottom: 0;

            border-radius: 8px;

            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

            font-family: 'Poppins',sans-serif;

        }



        .card-generatePA{

          background-color: rgba(255, 255, 255, 0.06);

          -webkit-backdrop-filter: blur(20px);

                  backdrop-filter: blur(20px);

           margin: auto;

          left: 0;

          right: 0;

          top: 0;

          bottom: 0;

          border-radius: 8px;

          box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

          font-family: 'Poppins',sans-serif;

          padding:2vh;

        }

      }



      .card-generatePA{

        background-color: rgba(255, 255, 255, 0.06);

        -webkit-backdrop-filter: blur(20px);

                backdrop-filter: blur(20px);

         margin: auto;

        left: 0;

        right: 0;

        top: 0;

        bottom: 0;

        border-radius: 8px;

        border: 1px solid red;

        font-family: 'Poppins',sans-serif;

        padding:2vh;

        margin-top:1vh;

      }

      .card-profile{

          height: 500px;

          background-color: rgba(255, 255, 255, 0.06);

          -webkit-backdrop-filter: blur(20px);

                  backdrop-filter: blur(20px);

           margin: auto;

          left: 0;

          right: 0;

          top: 0;

          bottom: 0;

          border-radius: 8px;

          border: 1px solid red;

          font-family: 'Poppins',sans-serif;

      }

      .card-img{

          height: 120px;

          width: 120px;

          background-color: rgba(255, 255, 255, 0.06);

          -webkit-backdrop-filter: blur(20px);

                  backdrop-filter: blur(20px);

          border-radius: 50%;

          position: absolute;

          margin: 30px auto 20px  auto;

          left: 0;

          right: 0;



      }

      .card-img img{

          height: 86%;

          border-radius: 50%;

          margin-left: 7%;

          margin-top: 7%;

      }

      .desc{

          width: 100%;

          text-align: center;

          position: absolute;

          top: 160px;

      }

      .primary-text{

          color: #d5d5d5;

          font-size: 16px;

          font-weight: 600;

          letter-spacing: 0.7px;

          margin: 5px 0;

      }

      .secondary-text{

          color: #c0c0c0;

          font-weight: 400;

          font-size: 14px;

          letter-spacing: 1px;

          margin: 5px 0;

      }

      .details{

          display: -ms-grid;

          display: grid;

          width: 100%;

          height: 70px;

          padding: 5px 0;

          -ms-grid-columns: auto auto;

          grid-template-columns: auto auto;

          background-color: rgba(255, 255, 255, 0.06);

          -webkit-backdrop-filter: blur(20px);

                  backdrop-filter: blur(20px);

          position: absolute;

          bottom: 0;

          border-radius: 0 0 8px 8px;

      }

      .details>div{

          text-align: center;

      }

      .details>div:first-child{

          border-right: 2px solid rgba(255,255,255,0.08);

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

                    <h5 class="font-medium m-b-0">Mis subordinados</h5>

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

                      <h6>Listado de mis subordinados durante la aplicación de evaluaciones</h6>

                      <!-- <div class="table-responsive">

                        <table id="table_subordinates" class="centered">

                          <thead>

                            <tr>

                              <th>No Empleado</th>

                              <th>Empleado</th>

                              <th>Sucursal</th>

                              <th>Puesto</th>

                              <th></th>

                            </tr>

                          </thead>

                        </table>

                      </div> -->

                      <div id="table_subordinates"></div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="modal" id="modal_evaluations">

              <div class="modal-content">

                <div class="row">

                  <div class="col s12">

                    <h6>Mis evaluaciones</h6>

                    <!-- <div class="table-responsive">

                      <table class="centered">

                        <thead>

                          <tr>

                            <th>Evaluación</th>

                            <th>Mis Evaluadores</th>

                            <th>Avance Evaluadores</th>

                            <th>Retroalimentación </th>

                            <th>Grupo Durante la evaluación</th>

                            <th>Plan de acción</th>

                            <th></th>

                          </tr>

                        </thead>

                      </table>

                    </div> -->

                    <div id="table_general"></div>

                  </div>

                </div>

              </div>

              <div class="modal-footer">

                  <a href="#!" class="modal-action modal-close waves-effect waves-light btn btn-round red">Cerrar</a>

              </div>

            </div>

            <div style="display:none">

              <div id="contentGeneralSelected">

                <div class="row">

                  <input type="hidden" id="mg_employee">

                  <input type="hidden" id="mg_evaluation">

                  <div class="col s12 m3">

                    <div class="row">

                      <div class="col s12">

                        <div class="card-profile">

                             <div class="card-img">

                                 <img id="img_EmployeeSel" src="https://dl.dropbox.com/s/u3j25jx9tkaruap/Webp.net-resizeimage.jpg?raw=1">

                             </div>

                             <div class="desc">

                               <h4>Datos del evaluado</h4>

                               <h6 id="_generalEmployee"></h6>

                               <p>No. Empleado: <h6 id="_generalNoEmployee"></h6></p>

                               <h4 id="_generalPosition_employed"></h4>

                               <p>

                                 Nivel durante la evaluación

                                 <h6 id="_generalLvl_employed"></h6>

                               </p>

                               <p>

                                 Grupo durante la evaluación

                                 <h6 id="_generalGroup"></h6>

                               </p>

                               <p>Calificación final:<h4 id="_generalQualification"></h4></p>

                            </div>

                        </div>

                      </div>

                      <div class="col s12">

                        <div class="card-generatePA">

                          <h4 style="color:#df040a;">Fechas para la creación del plan de acción</h4>

                          <h6>Fechas disponibles del <b id="b_dateIni_PlanA"></b> al <b id="b_dateEnd_PlanA"></b></h6>

                        </div>

                      </div>

                      <div class="col s12" style="text-align:center;margin-top:2vh;">

                        <div class="card-generatePA">

                          <h4 style="color:#df040a;">Estado del plan de acción</h4>

                          <a href="#" id="aceptResultsEvaluation" class="btn-actionBlue1 tooltipped" data-position="botton" data-delay="50" data-tooltip="Aceptar">Aceptar y configurar plan de acción</a>

                          <h6 id="tx_planAction">Plan de acción generada</h6>

                          <h6 id="tx_feedback">Es necesario aceptar la retroalimentación para generar el plan de acción</h6>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div class="col s12 m9 ">

                    <div class="row cllDatosFinales">

                      <div class="col s12" style="text-align:center;">

                        <h5 style="color:#df040a;">RESULTADO GLOBAL</h5>

                      </div>

                      <div class="col s12">

                        <div class="row">

                          <div class="col s12 m6">

                            <div class="row">

                              <div class="col s12" style="text-align:center;">

                                <h5 style="color:#df040a;">DRESULTADOS FINALES</h5>

                              </div>

                              <div class="col s12">

                                <div id="total_General"></div>

                              </div>

                            </div>

                          </div>

                          <div class="col s12 m6">

                            <div class="row">

                              <div class="col s12" style="text-align:center;">

                                <h5 style="color:#df040a;">FORTALEZAS Y ÁREAS A MEJORAR</h5>

                              </div>

                              <div class="col s12" style="text-align:center;">

                                <h5><b>FORTALEZAS</b></h5>

                                <div id="table_strengths"></div>

                              </div>

                              <div class="col s12" style="text-align:center;">

                                <hr>

                                <h5><b>ÁREAS A MEJORAR</b></h5>

                                <div id="table_areasForImprovement"></div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div class="col s12" >

                        <div id="graph_total_General" class="generalGraph"></div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <script type="text/x-jsrender" id="mainAdvanceTemplate">

                ${mainAdvanceSF(data)}

            </script>

            <script type="text/x-jsrender" id="mainRetroTemplate">

                ${mainRetroSF(data)}

            </script>

            <script type="text/x-jsrender" id="whitPlanActionTemplate">

                ${whitPlanActionSF(data)}

            </script>

            <script type="text/x-jsrender" id="viewDetailTemplate">

                ${viewDetailSF(data)}

            </script>

            <script type="text/x-jsrender" id="viewEvaluationsTemplate">

                ${viewEvaluationsSF(data)}

            </script>

    </div>



    <?php include("scripts.php"); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="scripts/global.js" charset="utf-8"></script>

    <script src="assets/libs/toastr/build/toastr.min.js"></script>

    <script src="assets/extra-libs/toastr/toastr-init.js"></script>

    <script src="scripts/my-subordinates/data-results.js" charset="utf-8"></script>

    <script src="scripts/my-subordinates/general.js" charset="utf-8"></script>

</body>



</html>
