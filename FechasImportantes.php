<?php include("AutorizaPagina.php"); ?>
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
          include("menus.php");
           ?>
        </div>
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Cumpleaños y Aniversarios</h5>
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
            <div class="container-fluid" style="z-index:5">
              <div class="row">
                <div class="col s12 l6">
                  <div class="card">
                    <div class="card-content">
                      <div class="row">
                        <div id="divContenidobirthday">
                            <div class="col s12 l12">
                                <h5><b>Imagen Cumpleaños</b></h5>
                            </div>
                            <div class="col s12 l12" style="text-align:center;" style="width:60vh;height:60vh;">
                                <form id="formInsertaImgBirthday">
                                    <input type="hidden" value="updateImgBirthday" name="op"></input>
                                    <img  src="assets/cumplecursor.png" alt="ImgCumpleaños" id="imgPreview" style="height:50vh;cursor:pointer;">
                                    <input type="file" style="display:none;" accept="image/png, image/jpeg" name="ContenidoImgBirthday" id="ContenidoImgBirthday" onchange="previewImage(event,'#imgPreview')" required></input>
                                    <hr>
                                </form>
                            </div>
                            <div class="col s12 l12" style="text-align:center;">
                                <button class="btn" id="btnInsertaImgBirthday">Actualizar Imagen Cumpleaños</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12 l6">
                  <div class="card">
                    <div class="card-content">
                      <div class="row">
                      <div id="divContenidoanniversary">
                            <div class="col s12 l12">
                                <h5><b>Imagen Aniversario</b></h5>
                            </div>
                            <div class="col s12 l12" style="text-align:center;" style="width:60vh;height:60vh;">
                                <form id="fprmInsertaImgAnniversary">
                                     <input type="hidden" value="updateImgAnniversary" name="op"></input>
                                     <img  src="assets/cumplecursor.png" alt="ImgAnniversary" id="imgPreviewAnn" style="height:50vh;cursor:pointer;">
                                     <input type="file" style="display:none;" name="ContenidoImgAnniversary" accept="image/png, image/jpeg" id="ContenidoImgAnniversary" onchange="previewImageAnny(event,'#imgPreviewAnn')" required></input>
                                </form>
                                <hr>
                            </div>
                            <div class="col s12 l12" style="text-align:center;">
                                <button class="btn" id="btnInsertaImgAnni">Actualizar Imagen Aniversario</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <div class="chat-windows"></div>
    </div>

    <?php include("scripts.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/FechasImportantes.js" charset="utf-8"></script>
</body>

</html>
