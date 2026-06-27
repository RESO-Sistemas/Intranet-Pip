<!DOCTYPE html>

<html>



<head>

  <!-- php include("AutorizaPagina.php"); -->

  <?<title>La Esmeralda</title>; ?>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

    <title>PIP by Lugo</title>

    <link href="dist/css/style.css" rel="stylesheet">

    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <link href="dist/css/pages/data-table.css" rel="stylesheet">

    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />



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

                    <h5 class="font-medium m-b-0">Puestos</h5>

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

            <div class="container-fluid" style="z-index:5">

              <div class="row">

                <div class="col s12 l3" >

                  <div class="row">

                    <div class="col s12">

                      <div class="card info-gradient card-hover" style="cursor: pointer">

                          <div class="card-content">

                              <div class="d-flex no-block align-items-center">

                                  <div>

                                      <h2 class="white-text m-b-5">¿Nuevo Puesto?</h2>

                                      <!-- <h6 class="white-text op-5">¿Nuevo Puesto?</h6> -->

                                  </div>

                                  <div class="ml-auto">

                                      <span class="white-text display-6"><i class="material-icons">add_to_photos</i></span>

                                  </div>

                              </div>

                          </div>

                      </div>

                    </div>

                    <div class="col s12">

                      <div class="card">

                        <div class="card-content">

                          <div class="row">

                            <div class="input-field col s12">

                                 <input placeholder="Puesto" id="txtNameP" type="text" class="validate">

                                 <label for="txtNameP">Nombre del Puesto</label>

                             </div>

                             <div class="input-field col s12">

                                <select id="slctDivision">

                                    <option value="" disabled selected>Listado de divisiones</option>

                                </select>

                                <label>¿A qué división pertenece el puesto?</label>

                             </div>

                             <div class="col s12 l6 offset-l3">

                               <button type="button" class="btnAceptarVerde" style="width:100%;" id="registraPuesto">Registrar</button>

                             </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div class="col s12 l9">

                  <div class="card">

                    <div class="card-content">

                      <div class="table-responsive">

                        <table class="table table-hover display centered" id="TablePuestos">

                          <thead>

                            <tr>

                              <th>PUESTO</th>

                              <th>DIVISION</th>

                              <th>JEFE</th>

                              <th>PERMISOS</th>

                              <th>ACTUALIZAR</th>

                              <th>MODIFICAR JEFE</th>

                            </tr>

                          </thead>

                          <tbody></tbody>

                        </table>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div style="display:none;">

              <div class="row" id="divUpdatePuesto" style="padding:2vh">

                <input type="hidden" id="txtIdPuesto" value="">

                <div class="col s12 l12" style="text-align:center">

                  <h6 id="textPuesto"></h6>

                </div>

                <div class="col s12 l12" style="text-align:center;margin-top:3vh">

                  <h6>Descripción</h6>

                  <input type="text" id="txtPuestoUpdate" style="text-align:center">

                </div>

                <div class="col s12 l4 offset-l4">

                  <button type="button" class="btnAceptarVerde" style="width:100%;" onclick="updatePuesto()">Actualizar</button>

                </div>

              </div>

            </div>

            <div id="modalListPuestos" class="modal">

                <div class="modal-content" style="height:40vh">

                  <input type="hidden" id="inpPSelected">

                  <div class="row" style="padding:2vh;">

                    <div class="col s12 l12">

                      <h4 id="txtPSelected"></h4>

                        <h6>Seleccione los jefes del puesto.</h6>

                        <select class="Slc2 browser-default"  id="slctJefes" style="width:100%">

                        </select>

                    </div>

                    <div class="col s12 l6 offset-l3" style="margin-top:5vh;">

                      <button type="button" class="btnAceptarVerde" style="width:100%;" id="updateJefes">ACTUALIZAR</button>

                    </div>

                  </div>

                </div>

            </div>



        <div class="chat-windows"></div>

    </div>

    <?php include("scripts-original.php"); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

    <script src="scripts/Puestos-original.js" charset="utf-8"></script>

    <script type="text/javascript">

    </script>

</body>



</html>
