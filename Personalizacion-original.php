<!DOCTYPE html>
<html>

<head>
    <!-- php include("AutorizaPagina.php"); -->
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
                    <h5 class="font-medium m-b-0">Personalización</h5>
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
                    <div class="col s12 l4">
                        <div class="row">
                            <div class="col s12 l12">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col s12 l12" style="text-align:center">
                                                <h5><b>Mensaje de bienvenida.</b></h5>
                                            </div>
                                            <div class="input-field col s12 l12">
                                                <textarea id="txtMensajeBienvenida" type="text"
                                                    class="materialize-textarea" style="height:auto;"></textarea>
                                            </div>
                                            <div class=" col s12 l12" style="text-align:center">
                                                <button class="btn" id="btnActualizaMensajeBienvenida">Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 l12">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col s12 l12" style="text-align:center">
                                                <h5><b>Días festivos.</b></h5>
                                            </div>
                                            <div class=" col s12 l12" style="text-align:center">
                                                <button class="btn" id="btnViewDiasFestivos">Actualizar días festivos.</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 l8">
                        <div class="row">
                            <div class="col s12 l6">
                                <div class="card">
                                    <div class="card-content">
                                        <div class="row">
                                            <div id="divContenidobirthday">
                                                <div class="col s12 l12">
                                                    <h5><b>Imagen Cumpleaños</b></h5>
                                                </div>
                                                <div class="col s12 l12" style="text-align:center;">
                                                    <form id="formInsertaImgBirthday">
                                                        <input type="hidden" value="updateImgBirthday"
                                                            name="op"></input>
                                                        <img src="assets/cumplecursor.png" alt="ImgCumpleaños"
                                                            id="imgPreview"
                                                            style="height:45vh;width:100%;cursor:pointer;">
                                                        <input type="file" style="display:none;"
                                                            name="ContenidoImgBirthday" id="ContenidoImgBirthday"
                                                            onchange="previewImage(event,'#imgPreview')"
                                                            required></input>
                                                        <hr>
                                                    </form>
                                                </div>
                                                <div class="col s12 l12" style="text-align:center;">
                                                    <button class="btn" id="btnInsertaImgBirthday">Actualizar Imagen
                                                        Cumpleaños</button>
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
                                                <div class="col s12 l12" style="text-align:center;">
                                                    <form id="fprmInsertaImgAnniversary">
                                                        <input type="hidden" value="updateImgAnniversary"
                                                            name="op"></input>
                                                        <img src="assets/cumplecursor.png" alt="ImgAnniversary"
                                                            id="imgPreviewAnn"
                                                            style="height:45vh; width:100%;cursor:pointer;">
                                                        <input type="file" style="display:none;"
                                                            name="ContenidoImgAnniversary" id="ContenidoImgAnniversary"
                                                            onchange="previewImageAnny(event,'#imgPreviewAnn')"
                                                            required></input>
                                                    </form>
                                                    <hr>
                                                </div>
                                                <div class="col s12 l12" style="text-align:center;">
                                                    <button class="btn" id="btnInsertaImgAnni">Actualizar Imagen
                                                        Aniversario</button>
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
            <div style="display:none;">
              <div class="row" id="divDiasFestivos">
                <div class="col s12 l12" >
                  <div class="row" style="padding:2vh;box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
                    <div class="input-field col s12 l4" style="text-align:center">
                      <div class="row">
                        <div class="col s6 l8">
                          <span>Seleccione el mes.</span>
                          <select id="mesSelected" class="browser-default"></select>
                        </div>
                        <div class="col s6 l4">
                          <span>Seleccione el día.</span>
                          <select id="diaSelected" class="browser-default"></select>
                        </div>
                      </div>
                    </div>
                    <div class="input-field col s12 l8" style="text-align:center">
                      <span>Descripción del día.</span>
                      <input type="text" id="txtDescripcionDiaF">
                    </div>
                    <div class="col s12 l12" style="text-align:center">
                      <button type="button" class="btnAceptarVerde" id="btnAddDiaF">Agregar día Festivo</button>
                    </div>
                  </div>
                </div>
                <div class="col s12 l12">
                  <div class="row" style="padding:2vh;box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
                    <div class="table-responsive">
                      <table class="table striped m-b-10 display centered" id="tableDiasFestivos">
                        <thead>
                          <tr>
                            <th>Descripción</th>
                            <th>Dia</th>
                            <th>Status</th>
                            <th>Actualizar</th>
                            <th>Activar / Desactivar</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:none;">
              <div class="row" id="contenidoUpdateDiaFestivo">
                <div class="col s12 l12">
                  <div class="row" style="padding:4vh">
                    <input type="hidden" id="IdDFUpdate">
                    <div class="input-field col s12 l12" style="text-align:center">
                      <div class="row">
                        <div class="col s6 l7">
                          <span>Seleccione el mes.</span>
                          <select id="mesSelectedUpdate" class="browser-default"></select>
                        </div>
                        <div class="col s6 l5">
                          <span>Seleccione el día.</span>
                          <select id="diaSelectedUpdate" class="browser-default"></select>
                        </div>
                      </div>
                    </div>
                    <div class="input-field col s12 l12" style="text-align:center">
                      <span>Descripción del día.</span>
                      <input type="text" id="txtDescripcionDiaFUpdate">
                    </div>
                    <div class="col s12 l12" style="text-align:center">
                      <button type="button" class="btnAceptarVerde" id="btnUpdateDF">Actualizar día Festivo</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-windows"></div>
        </div>
        <?php include("scripts-original.php"); ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
            integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
            integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
        <script src="assets/libs/toastr/build/toastr.min.js"></script>
        <script src="assets/extra-libs/toastr/toastr-init.js"></script>
        <script src="scripts/Personalizacion-original.js" charset="utf-8"></script>
</body>

</html>
