<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet</title>
  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>
  <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet">
  <!-- Styles neptune -->


  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->
  <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
  <style media="screen">
    #draw-canvas {
      border: 2px solid #CCCCCC;
      border-radius: 15px;
      cursor: crosshair;
    }

    #draw-dataUrl {
      width: 100%;
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
        <p class="loader__label">Klyns</p>
      </div>
    </div>
    <div id="Menu">
      <?php
      include("menus.php");
      ?>
    </div>
    <div class="app-container">
      <div class="app-header">
        <nav class="navbar navbar-light navbar-expand-lg">
          <div class="container-fluid">
            <div class="navbar-nav" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">first_page</i></a>
                </li>
              </ul>

            </div>
            <div class="d-flex">
              <ul class="navbar-nav">

                <!-- notifications -->
                <li class="nav-item hidden-on-mobile">
                  <!-- nav-notifications-toggle -->
                  <a class="nav-link" id="notificationsDropDown" href="#" data-bs-toggle="dropdown"><i class="material-icons">notifications</i></a>
                  <div class="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">
                    <h6 class="dropdown-header">Notificaciones</h6>
                    <div class="notifications-dropdown-list">
                      <div id="notificacionesPendienteLEtica"></div>
                      <div id="notificacionesMenuLEtica"></div>
                      <div id="notificacionesMenuSVacaciones"></div>
                      <div id="notificacionesMenuSVacacionesNomina"></div>
                      <div id="notificacionesCapacitacion"></div>
                    </div>
                  </div>
                </li>

                <!--  Foto de perfil -->
                <li class="nav-item hidden-on-mobile">
                  <a
                    class="nav-link dropdown-toggle"
                    id="notificationsDropDown"
                    href="javascript:void(0);"
                    data-bs-toggle="dropdown">
                    <img
                      id="imgSmallProfile"
                      alt="user"
                      class="rounded-circle"
                      width="30"
                      height="30" />
                  </a>
                  <ul
                    id="user_dropdown"
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="addDropdownLink">
                    <li>
                      <!-- <a class="dropdown-item" href="#">New Workspace</a> -->
                      <div class="dropdown-item " style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                        <div class="u-img" style="padding-bottom: 10px; padding-top:10px; "><img class="rounded-circle " id="profileImg" alt="user" width="60px" height="60px"></div>
                        <div class="u-text">
                          <h4 id="PerfilNombreEmp"></h4>
                          <p id="PerfilCorreoEmp"></p>
                          <!-- <a class="waves-effect waves-light btn-small red white-text" href="index.php">Perfil</a> -->
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="index.php"><i class="material-icons me-2">home</i>Inicio</a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="logout.php"><i class="material-icons me-2">exit_to_app</i>Salir</a>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
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
                  <h1>Solicitudes de Vacaciones</h1>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body" id="card_contentVal">
                    <div class="col-auto d-flex flex-column align-items-center mt-4 mb-4">
                      <label class="card-titl fw-bold" id="NombreEmpleado"></label>
                    </div>
                    <div class="row align-items-center mb-4">
                      <div class="col">
                        <label class="form-label">Fecha de Inicio:</label>
                        <p class="card-text"> <input class="form-control form-control-solid-bordered m-b-sm" id="FechaInicio" type="date" onchange="getDiasSeleccionados()" required></p>
                        <!-- <p for="FechaInicio" data-msg="Es necesario ingresar una fecha para poder continuar."></p> -->
                        <p class="error-message" data-msg="Es necesario ingresar una fecha para poder continuar." for="FechaInicio"></p>
                        <input type="hidden" id="CantidadDiasDisp" value="">
                      </div>
                      <div class="col">
                        <label class="form-label">Fecha de Fin:</label>
                        <p class="card-text"> <input class="form-control form-control-solid-bordered m-b-sm" id="FechaFin" type="date" onchange="getDiasSeleccionados()" required></p>
                        <p for="FechaFin" data-msg="Es necesario ingresar una fecha para poder continuar."></p>
                      </div>
                    </div>

                    <div class="row justify-content-center mb-2">
                      <div class="col-auto text-center">
                        <h6 class="fw-bold mb-0">Selecciona tus días de descanso</h6>
                        <small class="text-muted">Puedes seleccionar múltiples días.</small>
                      </div>
                    </div>
                    <div class="row justify-content-center mb-4">
                      <div class="col-auto">
                        <div class="d-flex flex-row gap-3 justify-content-center align-items-center flex-wrap">
                          <span id="DiasDisponibles" class="badge badge-style-bordered rounded-pill badge-success">
                            Días disponibles: 0
                          </span>
                          <span id="DiasSeleccionados" class="badge badge-style-bordered rounded-pill badge-primary">
                            Cantidad de días seleccionados: 0
                          </span>
                          <span id="DiaRegreso" class="badge badge-style-bordered rounded-pill badge-dark">
                            Regresando el día: Sin registros
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Fila centrada con el select -->
                    <div class="row justify-content-center mb-4">
                      <div class="col-md-6 col-lg-4">
                        <label class="form-label">Días de descanso:</label>
                        <select class="form-select pb-2" aria-label="Default select example" id="daysBreak" multiple>
                          <option value="Sunday">Domingo</option>
                          <option value="Monday">Lunes</option>
                          <option value="Tuesday">Martes</option>
                          <option value="Wednesday">Miércoles</option>
                          <option value="Thursday">Jueves</option>
                          <option value="Friday">Viernes</option>
                          <option value="Saturday">Sábado</option>
                        </select>
                      </div>
                    </div>
                    <div class="row justify-content-center mb-4">
                      <div class="col">
                        <label class="form-label">Motivo de Solicitud:</label>
                        <textarea id="MotivoSolicitud" class="form-control" style="height:15vh"></textarea>
                      </div>
                    </div>
                    <div class="row justify-content-center mb-4">
                      <div class="col-md-6 col-lg-4">
                        <div class="row justify-content-center">
                          <img src="" id="imgFirma" alt="" style="height:100%">
                        </div>
                        <div class="row justify-content-center">
                          <a href="AddFirma.php" class="btn btn-primary">Actualizar Firma</a>
                        </div>
                      </div>
                    </div>
                    <div class="row justify-content-center mb-4">
                      <div class="col">
                        <img src="" id="imgFirma" alt="" style="height:100%">
                        <div class="d-flex justify-content-between mt-3">
                          <a href="SolicitudVacaciones.php" class="btn btn-danger btn-lg" style="width: 200px;">Regresar</a>
                          <a class="btn btn-success btn-lg" style="width: 200px;" onclick="enviarSolicitudVacaciones()">Enviar Solicitud</a>
                        </div>
                      </div>
                      <!-- MODAL -->
                      <div class="d-flex justify-content-end">
                        <button type="button" id="openModalJefes" class="btn btn-primary m-b-sm" data-bs-toggle="modal" data-bs-target="#ModalAsignarHijo" style="display: none;">
                        </button>
                      </div>
                      <div class="modal fade" id="ModalAsignarHijo" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true" style="display: none;">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalCenteredScrollableTitle">Proporcionar una solicitud de feed</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <select name="" id="listadoJefesPosibles" class="form-select pb-2" onchange="asignarJefeEmpleado(this.value)"></select>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- MODAL -->
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
  <script src="./neptune/plugins/select2/js/select2.full.min.js"></script>
  <script src="./neptune/js/pages/select2.js"></script>
  <!-- neptune Javascripts -->

  <?php include("scripts.php"); ?>

  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/SolicitudNueva.js" charset="utf-8"></script>
  <script type="text/javascript">
    $(document).ready(function() {
      $("#daysBreak").select2();
    });
    getFirmaEmp();

    function onlynumber(e) {
      tecla = (document.all) ? e.keyCode : e.which;
      if (tecla == 8) {
        return true;
      }
      patron = /[-0-9]/;
      tecla_final = String.fromCharCode(tecla);
      return patron.test(tecla_final);
    }

    function getFirmaEmp() {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: "op=getFirmaEmp",
        success: function(response) {
          response = JSON.parse(response.trim());
          for (var i = 0; i < response.length; i++) {
            let urlImg = "Archivos/ImgEmpleados/" + response[i]["NoEmpleado"] + "/Firma/" + response[i]["Firma"];
            $("#imgFirma").attr("src", urlImg);
          }
        },
        error: function(e) {
          alert(e.responseText);
        }
      });
    }
  </script>

</body>

</html>