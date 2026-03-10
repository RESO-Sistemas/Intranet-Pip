<?php
include("AutorizaPagina.php");

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

  <title>PIP by Lugo</title>

  <!-- Styles neptune -->



  <?php include("neptune_styles.php");  ?>



  <!-- Styles neptune -->



  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.css" />

  <!-- <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.orange-coral.css" /> -->

  <!-- <script src="componentes/PerfilEmpleadoLateral.js" charset="utf-8"></script> -->

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">

  <link rel="stylesheet" type="text/css" href="plugins/emoji-picker/css/emoji.css">

  <script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.js"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.0.4/swiper-bundle.min.css">

  <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

  <link rel="stylesheet" href="plugins/tingle-master/dist/tingle.min.css">

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined">

  <link rel="stylesheet" href="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.css">

  <link rel="stylesheet" href="/plugins/unitegallery-master/dist/css/unite-gallery.css">

  <link rel="stylesheet" href="/plugins/unitegallery-master/package/unitegallery/themes/default/ug-theme-default.css">

  <link rel="stylesheet" href="/plugins/unitegallery-master/source/unitegallery/skins/alexis/alexis.css">



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

                  <h1>Mi Perfil</h1>

                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">

                    <li class="nav-item" role="presentation">

                      <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="hoaccountme" aria-selected="true">Cuenta</button>

                    </li>

                    <li class="nav-item" role="presentation">

                      <button class="nav-link" id="integrations-tab" data-bs-toggle="tab" data-bs-target="#integrations" type="button" role="tab" aria-controls="integrations" aria-selected="false">Colaboradores</button>

                    </li>

                  </ul>

                </div>

              </div>

            </div>

            <!-- INFORMACION PERSONAL/AGENDA/COLABORADORES -->

            <div class="row">

              <div class="col">

                <div class="tab-content" id="myTabContent">

                  <!-- INFORMACION PERSONAL -->

                  <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">

                    <div class="card">

                      <div class="card-body">

                        <div class="col-auto d-flex flex-column align-items-center mt-4 mb-4">

                          <img class="rounded-circle mb-4" height="100" width="100" id="ImgEmpleadoPerfil" alt="Imagen empleado">

                          <i id="btnFotoEmp" class="fas fa-camera fa-lg" style="cursor:pointer;"></i>

                          <form id="FrmFotoEmp" action="Backend/Empleados/App.php" method="post">

                            <input type="text" name="op" value="updateFotoEmpleado" style="display:none;">

                            <input type="file" accept="image/*" name="fotoEmp" id="fotoEmp" value="" style="display:none;" onchange="updateFotoEmpleado()">

                          </form>

                        </div>

                        <div class="row align-items-center mb-4">

                          <div class="col">

                            <label for="PerfilNombre" class="card-title mb-0">Nombre</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilNombre" type="text" value="" disabled></p>

                          </div>

                          <div for="PerfilNoEmp" class="col">

                            <label class="card-title mb-0">No. Emp.</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilNoEmp" type="text" value="" disabled></p>

                          </div>

                        </div>

                        <div class="row align-items-center">

                          <div class="col">

                            <label for="PerfilRFC" class="card-title mb-0">RFC</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilRFC" type="text" value="" disabled></p>

                          </div>

                          <div class="col">

                            <label for="PerfilCURP" class="card-title mb-0">CURP</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilCURP" type="text" value="" disabled></p>

                          </div>

                          <div class="col">

                            <label for="PerfilNOSEGURO" class="card-title mb-0">No. Seguro</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilNOSEGURO" type="text" value="" disabled></p>

                          </div>

                        </div>

                        <div class="row align-items-center">

                          <div class="col">

                            <label for="Perfilpassword" class="card-title mb-0">Contraseña</label>

                            <p class="card-text"><input class="form-control form-control-solid-bordered " aria-describedby="transparentInputExample" id="Perfilpassword" type="password" value=""></p>

                          </div>

                          <div class="col">

                            <label for="PerfilFecNac" class="card-title mb-0">Fecha de Nacimiento</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilFecNac" type="text" value="" disabled></p>

                          </div>

                          <div class="col">

                            <label for="Perfilemail" class="card-title mb-0">Correo</label>

                            <p class="card-text"><input class="form-control form-control-solid-bordered " aria-describedby="transparentInputExample" id="Perfilemail" type="email" value=""></p>

                          </div>

                        </div>

                        <div class="row align-items-center">

                          <div class="col">

                            <label for="Perfilnumber" class="card-title mb-0">Tel. Movil</label>

                            <p class="card-text"><input class="form-control form-control-solid-bordered " aria-describedby="transparentInputExample" id="Perfilnumber" type="text" value="" onkeypress="return onlynumber(event)" maxlength="10"></p>

                          </div>

                          <div class="col">

                            <label for="PerfilPuesto" class="card-title mb-0">Puesto</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilPuesto" type="text" value="" disabled></p>

                          </div>

                          <div class="col">

                            <label for="PerfilSucursal" class="card-title mb-0">Sucursal</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilSucursal" type="text" value="" disabled></p>

                          </div>

                        </div>

                        <div class="row align-items-center">

                          <div class="col">

                            <label for="PerfilAntiguedad" class="card-title mb-0">Antiguedad</label>

                            <p class="card-text"><input class="form-control form-control-transparents " aria-describedby="transparentInputExample" id="PerfilAntiguedad" type="text" value="" disabled></p>

                          </div>

                          <div class="col">

                            <label for="PerfilCCosto" class="card-title mb-0">Centro de Costo</label>

                            <p class="card-text"><input class="form-control form-control-transparent" aria-describedby="transparentInputExample" id="PerfilCCosto" type="text" value="" disabled></p>

                          </div>

                          <div class="col">

                            <label for="slctDivision" class="card-title mb-0">División</label>

                            <select id="slctDivision" class="form-control" disabled>

                              <option value="" disabled>Listado de Divisiones</option>

                            </select>

                          </div>

                        </div>

                        <div class="row align-items-center mt-5">

                          <div class="col d-flex justify-content-center">

                            <button class="btn btn-success" style="width:50%" type="button" name="action" id="UpdateDatosEmp" onclick="updateDatosEmpleado()">Actualiza Perfil</button>

                          </div>

                        </div>

                        <div class="row align-items-center">

                          <div class="col d-flex justify-content-center m-4">

                            <img src="" style="width:50%" id="imgFirma" alt="" style="width:100%">

                          </div>

                        </div>

                        <div class="row align-items-center mb-4">

                          <div class="col d-flex justify-content-center">

                            <a href="AddFirma.php" style="width:50%" class="btn btn-primary">Actualizar Firma</a>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <!-- COLABORADORES -->

                  <div class="tab-pane fade" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">

                    <div class="card ">

                      <div class="card-body todo-list" style="height: 700px;">

                        <div id="colabora" class="col overflow-y-auto">

                          <div class="card-body">

                            <div class="row align-items-center">

                              <div class="row" id="divColaboradoreslvl">

                                <h4 id="titulolvl1"></h4>

                              </div>

                              <div class="row" id="divColaboradoreslv2">

                                <h4 id="titulolvl2"></h4>

                              </div>

                              <div class="row" id="divColaboradoreslv3">

                                <h4 id="titulolvl3"></h4>

                              </div>

                              <div class="row" id="divColaboradoreslv4">

                                <h4 id="titulolvl4"></h4>

                              </div>

                              <div class="row" id="divColaboradoreslv5">

                                <h4 id="titulolvl5"></h4>

                              </div>

                              <div class="row" id="divColaboradoreslv6">

                                <h4 id="titulolvl6"></h4>

                              </div>

                              <div class="row" id="divColaboradoreslv7">

                                <h4 id="titulolvl7"></h4>

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

            <div id="fullscreen-swiper"></div>

            <div id="fullscreen-swiper-backdrop"></div>

            <!-- ULTIMAS NOVENDADES -->

            <!-- ULTIMAS NOVEDADES -->

          </div>

        </div>

      </div>

    </div>

  </div>



  <!-- neptune Javascripts -->

  <?php include("neptune_js.php");  ?>

  <!-- neptune Javascripts -->





  <?php include("scripts.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <script src="plugins/evo-calendar/js/evo-calendar.js"></script>

  <script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>

  <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

  <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>

  <script src="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>

  <script src="/plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>

  <script src="/plugins/unitegallery-master/package/unitegallery/themes/slider/ug-theme-slider.js" charset="utf-8"></script>

  <script src="scripts/MiPerfil.js"></script>

  <script src="scripts/global.js" charset="utf-8"></script>





</body>



</html>	