<!DOCTYPE html>
<html>

<head>
  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP by Lugo</title>
    <link rel="stylesheet" href="EstilosSubidaArchivo.css">
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
                    <h5 class="font-medium m-b-0">Crear Feed</h5>
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
                <div class="col s4 l4">
                  <a href="ListadoFeed.php" class="waves-effect waves-light btn btn-round purple">Regresar</a>
                </div>
                <div class="col s12 l12">
                  <div class="card" style="margin:1vh ;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <div class="card-content">
                      <div class="row">
                        <form  id="InsertaFeed">
                        <div class="col s12 l12">
                          <label for="txtTitulo">Titulo</label><br>
                          <textarea id="txtTitulo" name="txtTitulo" class="materialize-textarea" required></textarea>
                        </div>
                        <div class="col s12 l12">
                          <div class="row">
                            <div class="col s12 l12">
                              <label for="txtDescripcion">Descripción</label><br>
                              <textarea id="txtDescripcion" name="txtDescripcion" class="materialize-textarea" required></textarea>
                            </div>
                            <div class="col s12 l12">
                              <label for="txtDescripcion">Hipervínculo</label><br>
                              <textarea id="txtHV" name="txtHV" class="materialize-textarea"  placeholder="Opcional"></textarea>
                              <hr>
                            </div>
                            <!-- <div class="col s12 l12" style="text-align:center">
                                <input  type="file" name="inpArchivo" id="inpArchivo" value="" accept="image/jpeg,image/x-png" style="display:none;" onchange="previewImage(event,'#imgPreview')">
                            </div> -->
                          </div>
                        </div>
                      </form>
                      <div class="col s12 l12">
                        <div class="card card-outline card-dark shadow">
                          <div class="card-body">
                              <span>Elementos multimedia</span>
                              <br><br>
                              <div class="upload_drops" id="dropzones">
                                  <br>
                                  <br>
                                  <h6>Arrastre las imágenes para agregarlas</h6>
                                  <input type="file" name="files[]" id="standard_filess" style="display:none;" multiple accept="application/pdf,image/jpeg,image/x-png">
                                  <button class="btn btn-outline-primary" type="button" name="btnStandards" id="btnStandards">Elegir Archivos</button>
                                  <br>
                                  <br>
                                  <span class="text-danger">Nota: Solo se aceptan Imágenes</span><br>
                                  <br>
                                  <br>
                                  <div class="form-group-row">
                                      <div id="ImagenesDrop" class="col-md-12">
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                        <div class="col s4 offset-s4 l4 offset-l4" style="text-align:center">
                          <button id="CrearFeed"  class='waves-effect waves-light btn btn-round blue'>Crear Feed</button>
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
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <script src="scripts/Feed-original.js" charset="utf-8"></script>
</body>

</html>
