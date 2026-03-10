<!DOCTYPE html>
<html>

<head>
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
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
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
                    <h5 class="font-medium m-b-0">Dashboard: Visitas de los empleados al sistema.</h5>
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
                <div class="col s12 m-t-10">
                  <div class="row">
                      <div class="col s12 m9">
                        <div class="e-card">
                          <div class="e-card-header">
                            <div class="e-card-header-caption">
                              <div class="e-card-header-title">
                                Rango de Fechas
                              </div>
                            </div>
                          </div>
                          <div class="e-card-content">
                            <div class="row">
                              <div class="col s12 m6">
                                <h6>Inicio</h6>
                                <input type="date" id="date_Ini">
                              </div>
                              <div class="col s12 m6">
                                <h6>Fin</h6>
                                <input type="date" id="date_End">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="col s12 m3">
                      <div class="e-card">
                        <div class="e-card-header">
                          <div class="e-card-header-caption">
                            <div class="e-card-header-title">
                              <i class="fas fa-user-friends"></i>Cantidad de visitas.
                            </div>
                            <hr>
                          </div>
                        </div>
                        <div class="e-card-content">
                          <h4 id="tx_totalVisit"></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12 m-t-15">
                  <div class="e-card">
                    <div class="e-card-header">
                      <div class="e-card-header-caption">
                        <div class="e-card-header-title">
                          Usuarios que utilizan el sistema.
                        </div>
                      </div>
                    </div>
                    <div class="e-card-content">
                      <div id='c_tabs'>
                          <div class="e-tab-header">
                             <div>Tabla</div>
                             <div>Por Sucursal</div>
                          </div>
                          <div class="e-content">
                             <div>
                               <div id="t_usersVisit"></div>
                             </div>
                             <div>
                               <div id="graph_PerBranch"></div>
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
    </div>

    <?php include("scripts-original.php"); ?>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js"></script>
    <script src="scripts/Dashboard/visitor-dashboard-original.js" charset="utf-8"></script>
</body>

</html>
