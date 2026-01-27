<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>

<html>



<head>



  <meta charset="utf-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">

  <title>Klyns Intranet</title>

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

  <!-- Styles neptune -->



  <?php include("neptune_styles.php");  ?>



  <!-- Styles neptune -->



  <style>

    /* tCommentsRequests */

    #tCommentsRequests .e-checkbox-wrapper {

      width: 50px;

      height: 20px;

      display: flex;

      justify-content: center;

      align-items: center;

    }



    #tCommentsRequests .e-checkbox-wrapper .e-frame {

      border: 2px solid #007bff;

      background-color: #e0f0ff;

    }



    /* tCommentsAccepted */

    #tCommentsAccepted .e-checkbox-wrapper {

      width: 50px;

      height: 20px;

      display: flex;

      justify-content: center;

      align-items: center;

    }



    #tCommentsAccepted .e-checkbox-wrapper .e-frame {

      border: 2px solid #007bff;

      background-color: #e0f0ff;

    }

  </style>

</head>



<body>

  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <!-- ============================================================== -->

    <!-- Preloader - style you can find in spinners.css -->

    <!-- ============================================================== -->

    <div class="preloader">

      <div class="loader">

        <div class="loader__figure"></div>

        <!-- <p class="loader__label">Klyns</p> -->

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

                  <h1>Solicitudes de comentarios para los Feed</h1>

                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">

                    <li class="nav-item" role="presentation">

                      <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Solicitudes Pendientes</button>

                    </li>

                    <li class="nav-item" role="presentation">

                      <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Solicitudes Aprobadas</button>

                    </li>

                  </ul>

                </div>

              </div>

            </div>

            <div class="row">

              <div class="col">

                <div class="tab-content" id="myTabContent">

                  <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">

                    <div class="card">

                      <div class="card-body">

                        <div class="row mb-4">

                          <div class="col">

                            <div class="d-flex gap-2">

                              <button type="button" onclick="verifyActionComments(1)" class="btn btn-success d-flex align-items-center">

                                <span class="material-symbols-outlined me-1">check</span>

                                Autorizar

                              </button>



                              <button type="button" onclick="verifyActionComments(0)" class="btn btn-danger d-flex align-items-center">

                                <span class="material-symbols-outlined me-1">delete</span>

                                Rechazar

                              </button>

                            </div>



                          </div>

                        </div>

                        <div class="row">

                          <div class="col-12">

                            <div id="tCommentsRequests"></div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">

                    <div class="card">

                      <div class="card-body">

                        <div class="row">

                          <div class="row mb-4">

                            <div class="col-12">

                              <button type="button" onclick="verifyActionCommentsAC()" class="btn btn-danger d-flex align-items-center">

                                <span class="material-symbols-outlined me-1">delete</span>

                                Rechazar

                              </button>

                            </div>

                            <div class="col-12">

                              <hr>

                              <div id="tCommentsAccepted"></div>

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

    </div>

  </div>









  <!-- neptune Javascripts -->

  <?php include("neptune_js.php");  ?>

  <!-- neptune Javascripts -->



  <?php include("scripts.php"); ?>



  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  

  <!-- Scripts específicos de esta página -->

  <script src="scripts/global.js" charset="utf-8"></script>

  <script src="/scripts/post-comment-requests.js" charset="utf-8"></script>

</body>



</html>