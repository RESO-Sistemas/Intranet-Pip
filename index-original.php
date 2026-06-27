<?php
require_once("Backend/Empleados/Empleados.php");
$ins = new Empleados();
$ins->visitIndexEmployee();
?>
<!DOCTYPE html>
<html>

<head>
  <?php include("estilos.php"); ?>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>La Esmeralda</title>
  <link href="dist/css/style.css" rel="stylesheet">
  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.css" />
  <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.orange-coral.css" />
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
  <style media="screen">
    .cardColaboradores {
      cursor: pointer;
      padding: 2vh;
      border-radius: 15px;
      height: 35vh;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .card-lvl {
      margin-top: 1vh;
      padding: 2vh;
    }

    [data-title]:hover:after {
      opacity: 1;
      transition: all 0.1s ease 0.5s;
      visibility: visible;
    }

    [data-title]:after {
      content: attr(data-title);
      background-color: #333;
      color: #fff;
      font-size: 14px;
      font-family: Raleway;
      position: absolute;
      padding: 3px 20px;
      bottom: -1.6em;
      left: 100%;
      white-space: nowrap;
      box-shadow: 1px 1px 3px #222222;
      opacity: 0;
      border: 1px solid #111111;
      z-index: 99999;
      visibility: hidden;
      border-radius: 6px;

    }

    [data-title] {
      position: relative;
    }

    .swiper {
      height: 40vh;
      padding: 5vh
    }

    #fullscreen-swiper {
      display: none;
      height: 100vh;
      overflow: hidden;
      position: absolute;
      top: 5%;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      padding: 5vh;
    }

    #fullscreen-swiper .swiper-slide {
      background: none;
    }

    #fullscreen-swiper .swiper-slide img {
      height: 75vh;
      max-height: 650px;
    }

    #fullscreen-swiper-backdrop {
      background: #000;
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;

    }

    #fullscreen-swiper-close {
      border: 50% solid #fff;
      color: #fff;
      cursor: pointer;
      font-size: 24px;
      padding: 1px 6px 0;
      position: absolute;
      top: 0;
      right: 15px;
      z-index: 10000;
    }

    .no-scroll {
      height: 100%;
      overflow: hidden
    }

    .splide__slide img {
      height: auto;
      width: auto;
    }

    #draw-canvas {
      border: 2px solid #CCCCCC;
      border-radius: 15px;
      cursor: crosshair;
    }

    #draw-dataUrl {
      width: 100%;
    }

    .div#divCumple {
      cursor: cursor: url(https://klyns.resosistemas.mx/assets/cumplecursor.png), pointer;
    }

    .contenidobox {
      max-height: 93vh;
      overflow-y: scroll;
      padding: 5vh;
    }

    .contenidobox::-webkit-scrollbar {
      width: 12px;
    }

    .contenidobox::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background: rgb(255, 198, 198);
      background: linear-gradient(90deg, rgba(255, 198, 198, 1) 0%, rgba(255, 187, 187, 1) 100%);
    }

    .contenidobox::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(193, 2, 22, 0.5);
      background: rgb(255, 60, 87);
      background: linear-gradient(90deg, rgba(255, 60, 87, 1) 0%, rgba(83, 0, 18, 1) 100%);
    }

    .contenidoInfoEmpD {
      height: 13vh !important;
      padding: 1vh !important;
    }

    .contenidoInfoEmpI {
      height: 13vh !important;
      padding: 1vh !important;
    }

    @media only screen and (max-width: 600px) {
      .contenidoInfoEmpD {
        height: 20vh !important;
        padding: 1vh !important;
      }

      .contenidoInfoEmpI {
        height: 15vh !important;
        padding: 1vh !important;
      }

      .contenidobox {
        max-height: 93vh;
        overflow-y: scroll;
        padding: 1vh;
      }

      .contenidobox::-webkit-scrollbar {
        width: 12px;
      }

      .contenidobox::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background: rgb(255, 198, 198);
        background: linear-gradient(90deg, rgba(255, 198, 198, 1) 0%, rgba(255, 187, 187, 1) 100%);
      }

      .contenidobox::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(193, 2, 22, 0.5);
        background: rgb(255, 60, 87);
        background: linear-gradient(90deg, rgba(255, 60, 87, 1) 0%, rgba(83, 0, 18, 1) 100%);
      }
    }

    .div-perfil {
      max-height: 93vh;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 4vh;
    }

    .div-perfil::-webkit-scrollbar {
      width: 12px;
    }

    .div-perfil::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background: rgb(255, 198, 198);
      background: linear-gradient(90deg, rgba(255, 198, 198, 1) 0%, rgba(255, 187, 187, 1) 100%);
    }

    .div-perfil::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(193, 2, 22, 0.5);
      background: rgb(255, 60, 87);
      background: linear-gradient(90deg, rgba(255, 60, 87, 1) 0%, rgba(83, 0, 18, 1) 100%);
    }


    .contenidoEventos {
      min-height: 0vh;
      max-height: 40vh;
      overflow-y: scroll;
      padding: 2vh;
    }

    .contenidoEventos::-webkit-scrollbar {
      width: 12px;
    }

    .contenidoEventos::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background: rgb(255, 198, 198);
      background: linear-gradient(90deg, rgba(255, 198, 198, 1) 0%, rgba(255, 187, 187, 1) 100%);
    }

    .contenidoEventos::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(193, 2, 22, 0.5);
      background: rgb(255, 60, 87);
      background: linear-gradient(90deg, rgba(255, 60, 87, 1) 0%, rgba(83, 0, 18, 1) 100%);
    }

    .imgFeed {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      object-fit: cover
    }

    .imgFeed:hover {
      transform: scale(1.2);
    }

    .myTooltip {
      display: none;
      position: absolute;
      z-index: 1;
      background-color: black;
      color: white;
      padding: 5px;
      border-radius: 5px;
    }

    .TooltipHoverMg:hover+.myTooltip {
      display: block;
    }

    .download-android {
      display: inline-block;
      background-color: #FFF;
      color: #4CAF50;
      padding: 6px 6px;
      text-align: center;
      text-decoration: none;
      border-radius: 50%;
      padding: 10px;
      transition: background-color 0.3s ease;
      border: 1px solid #4CAF50;
    }

    .download-android:hover {
      background-color: #3e8e41;
      color: #fff;
    }

    .download-android img {
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }

    .download-ios {
      display: inline-block;
      background-color: #FFF;
      color: #000;
      padding: 6px 6px;
      text-align: center;
      text-decoration: none;
      font-size: 13px;
      border-radius: 15px;
      transition: background-color 0.3s ease;
      border: 1px solid #000;
    }

    .download-ios:hover {
      background-color: #5F6FC7;
      color: #fff;
    }

    .download-ios img {
      height: 24px;
      vertical-align: middle;
      margin-right: 8px;
    }

    .btn-newPublication {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      text-decoration: none;
      color: #333333;
      font-size: 17px;
      border-radius: 16px;
      width: 100%;
      height: 33px;
      border: 1px solid #000000;
      position: relative;
      transition: 0.3s;
      box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
      background-color: #ffffff;
    }

    .btn-newPublication::before,
    .btn-newPublication::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      right: 15px;
      transform-origin: 100% 50%;
      height: 1px;
      width: 11px;
      background-color: #333;
      border-radius: 2px;
      will-change: transform;
      transition: .3s;
    }

    .btn-newPublication::before {
      transform: translateY(-50%) rotate(30deg);
    }

    .btn-newPublication::after {
      transform: translateY(-50%) rotate(-30deg);
    }

    .btn-newPublication:hover::before {
      transform: translate(5px, -50%) rotate(30deg);
    }

    .btn-newPublication:hover::after {
      transform: translate(5px, -50%) rotate(-30deg);
    }

    .comment-button {
      margin-top: 10px;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }

    .tingle-modal-box {
      height: 85%;
      width: 45%;
      overflow-y: scroll;
    }
  </style>
</head>

<body>
  <div class="main-wrapper" id="main-wrapper">
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
      include("menus-original.php");
      ?>
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
      <div id="fullscreen-swiper"></div>
      <div id="fullscreen-swiper-backdrop"></div>
      <div class="" style="z-index:5">
        <div class="row" style="margin:2vh 2vh 2vh 2vh">
          <div class="col l12 s12">
            <!-- <perfil-lateral></perfil-lateral> -->
            <div class="row">
              <div class="col s12 m4">
                <div class="e-card">
                  <div class="e-card-content"
                    style="background-image: url('assets/images/Klyns1.png'); background-size: 100%;background-color:#212F3D ; padding:15px;">
                    <div class="d-flex no-block align-items-center">
                      <div class="col s12 l3">
                        <div class="align-self-center"><img class="circle" height="70" width="70"
                            id="ImgEmpleadoPerfil"></div>
                      </div>
                      <div class="col s12 l2">
                        <div class="align-self-center"><i id="btnFotoEmp" class="fas fa-camera fa-2x"
                            style="cursor:pointer;"></i></div>
                      </div>
                      <div class="col s12 l7">
                        <form id="FrmFotoEmp" action="Backend/Empleados/App.php" method="post">
                          <input type="text" name="op" value="updateFotoEmpleado" style="display:none;">
                          <input type="file" accept="image/*" name="fotoEmp" id="fotoEmp" value="" style="display:none;"
                            onchange="updateFotoEmpleado()">
                        </form>
                        <h5 class="card-title white-text" id="NameEmpleado"></h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col s12 m8">
                <div class="e-card">
                  <div class="e-card-content" style="padding:15px;">
                    <div class="row">
                      <div class="col s12 m5">
                        <h6><b id="mensajeBienvenida"></b></h6>
                        <div class="row">
                          <div class="col s12">
                            <h6 id="textoEmailEmp"></h6>
                          </diV>
                        </div>
                      </div>
                      <div class="col s12 l4" style="text-align:center">
                        <strong class="db m-t-3">¡Tambien descarga la versión móvil</strong>
                        <!-- <a href="#" target="_blank" class="btn-floating  darken-2 m-t-10" style="background-color:#fff;">
                          <img src="assets/images/iconIos.png" style="width:100%" download  alt="Descargar App">
                        </a> -->
                        <a href="Archivos/AppInstall/com.reso.klynet.apk" target="_blank"
                          class="btn-floating  darken-2 m-t-10">
                          <img src="assets/images/IconAndroid.png" style="width:100%;margin:auto;important" download
                            alt="Descargar App">
                        </a>
                      </div>
                      <div class="col s12 m3">
                        <strong class="db m-t-3">Redes Sociales</strong>
                        <a href="https://www.facebook.com/FarmaciasKlyns" target="_blank"
                          class="btn-floating indigo darken-2 m-t-10"><i class="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/farmaciasklyns" target="_blank"
                          class="btn-floating blue darken-1 m-t-10"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/farmaciasklyns/?hl=es" target="_blank"
                          class="btn-floating deep-orange m-t-10"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/farmacias-klyns/" target="_blank"
                          class="btn-floating deep-red m-t-10"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://www.klyns.mx/" target="_blank" class="btn-floating deep-red m-t-10"
                          style="padding:.5vh;background-color:#DF040A"><img src="assets/Klyns.png"
                            style="width:100%"></img></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div class="col s12 l7">
            <div class="row">
              <div class="col s12 m4 offset-m8">
                <a href="#" id="btn-openNewFeed" class="btn-newPublication">Nueva Publicación.....</a>
              </div>
            </div>
            <div class="e-card m-t-15">
              <div class="e-card-header">
                <div class="e-card-header-caption">
                  <div class="e-card-header-title">
                    <h5>Ultimas Novedades</h5>
                  </div>
                </div>
              </div>
              <div class="e-card-content">
                <div class="contenidobox">
                  <div class="" id="ContenidoFeed">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 l5">
            <div class="row">
              <div class="col s12 l12">
                <div class="card" style="height:105vh;">
                  <div class="row">
                    <div class="col s12">
                      <ul class="tabs">
                        <li class="tab col s3"><a class="active" href="#idContenidoCalendario">Agenda</a></li>
                        <li class="tab col s3"><a href="#profile">Perfil</a></li>
                        <li class="tab col s3"><a href="#colabora" style="color:#df040a;">Colaboradores</a></li>
                        <!-- <li class="tab col s3"><a href="#Feed" style="color:#df040a;">Feed</a></li> -->
                      </ul>
                    </div>
                    <div class="col s12 l12" id="idContenidoCalendario">
                      <div id="calendar"></div>
                      <div class="row" style="background-color:white; margin-left:.5vh;margin-right:.5vh">
                        <div id="contenidoAgendaEventos" class="contenidoEventos"></div>
                      </div>
                    </div>
                    <div id="profile" class="col s12">
                      <div class="card-content div-perfil" style="">
                        <form>
                          <div class="row">
                            <div class="input-field col s8 l10">
                              <label>Nombre</label><br>
                              <input id="PerfilNombre" type="text" value="" disabled>
                            </div>
                            <div class="input-field col s4 l2">
                              <label for="PerfilNoEmp">No. Emp.</label><br>
                              <input id="PerfilNoEmp" type="text" value="" disabled>
                            </div>
                          </div>
                          <div class="row">
                            <div class="input-field col s4 l4">
                              <label for="PerfilRFC">RFC</label><br>
                              <input id="PerfilRFC" type="text" value="" disabled>
                            </div>
                            <div class="input-field col s4 l4">
                              <label for="PerfilCURP">CURP</label><br>
                              <input id="PerfilCURP" type="text" value="" disabled>
                            </div>
                            <div class="input-field col s4 l4">
                              <label for="PerfilNOSEGURO">No. Seguro</label><br>
                              <input id="PerfilNOSEGURO" type="text" value="" disabled>
                            </div>
                          </div>
                          <div class="row">
                            <div class="input-field col s6 l6">
                              <label for="Perfilpassword">Password</label><br>
                              <input id="Perfilpassword" type="password" value="">
                            </div>
                            <div class="input-field col s6 l6">
                              <label for="PerfilFecNac">Nacimiento</label><br>
                              <input id="PerfilFecNac" type="text" value="" disabled>
                            </div>
                          </div>
                          <div class="row">
                            <div class="input-field col s12 l8">
                              <label for="Perfilemail">Email</label><br>
                              <input id="Perfilemail" type="email" value="">
                            </div>
                            <div class="input-field col s12 l4">
                              <label for="Perfilnumber">Móvil</label><br>
                              <input id="Perfilnumber" type="text" value="" onkeypress="return onlynumber(event)"
                                maxlength="10">
                            </div>
                          </div>

                          <div class="row">
                            <div class="input-field col s8 l8">
                              <label for="PerfilPuesto">Puesto</label><br>
                              <input id="PerfilPuesto" type="text" value="" disabled>
                            </div>
                            <div class="input-field col s4 l4">
                              <label for="PerfilSucursal">Sucursal</label><br>
                              <input id="PerfilSucursal" type="text" value="" disabled>
                            </div>
                          </div>
                          <div class="row">
                            <div class="input-field col s6 l4">
                              <label for="PerfilAntiguedad">Antiguedad</label><br>
                              <input id="PerfilAntiguedad" type="text" value="" disabled>
                            </div>
                            <div class="input-field col s6 l4">
                              <label for="PerfilCCosto">Centro de Costo</label><br>
                              <input id="PerfilCCosto" type="text" disabled>
                            </div>
                            <div class="input-field col s12 l4">
                              <label>División</label><br><br>
                              <select id="slctDivision" class="browser-default" disabled>
                                <option value="" disabled>Listado de Divisiones</option>
                              </select>
                            </div>
                          </div>

                          <div class="row">
                            <div class="input-field col s12 l12" style="text-align:center;">
                              <button class="btn teal waves-effect waves-light" style="width:50%" type="button"
                                name="action" id="UpdateDatosEmp" onclick="updateDatosEmpleado()">Actualiza
                                Perfil</button>
                              <hr>
                              <a href="AddFirma.php" class="btn blue darken-2 modal-close save-category">Actualizar
                                Firma</a>
                            </div>
                            <div class="col s12"
                              style="background-color:#f3f3f3; height:200px; border-radius:15px; text-align: center;">
                              <img src="" id="imgFirma" alt="" style="width:100%">
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div id="colabora" class="col s12">
                      <div class="card-content div-perfil">
                        <div class="row">
                          <h5 class="font-medium m-b-0">Colaboradores</h5>
                        </div>
                        <div class="row">
                          <div class="col s12 card-lvl" id="divColaboradoreslvl">
                            <h4 id="titulolvl1"></h4>
                          </div>
                          <div class="col s12 card-lvl" id="divColaboradoreslv2">
                            <h4 id="titulolvl2"></h4>
                          </div>
                          <div class="col s12 card-lvl" id="divColaboradoreslv3">
                            <h4 id="titulolvl3"></h4>
                          </div>
                          <div class="col s12 card-lvl" id="divColaboradoreslv4">
                            <h4 id="titulolvl4"></h4>
                          </div>
                          <div class="col s12 card-lvl" id="divColaboradoreslv5">
                            <h4 id="titulolvl5"></h4>
                          </div>
                          <div class="col s12 card-lvl" id="divColaboradoreslv6">
                            <h4 id="titulolvl6"></h4>
                          </div>
                          <div class="col s12 card-lvl" id="divColaboradoreslv7">
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
      </div>

    </div>
    <?php include("scripts-original.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
      integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
      integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="plugins/evo-calendar/js/evo-calendar.js"></script>
    <script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
    <script src="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>
    <script src="/plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>
    <script src="/plugins/unitegallery-master/package/unitegallery/themes/slider/ug-theme-slider.js"
      charset="utf-8"></script>
    <script src="scripts/index-original.js"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
</body>

</html>
