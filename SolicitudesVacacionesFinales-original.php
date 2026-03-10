<?php
$hoy = date('Y-m-d');
$FechaMenosMes = date("Y-m-d",strtotime($fecha_actual."- 2 month"));
?>
<!DOCTYPE html>
<html>
<head>
  <!-- php include("AutorizaPagina.php");  -->
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
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
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
                    <h5 class="font-medium m-b-0">Solicitudes de Vacaciones</h5>
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
                <div class="card">
                  <div class="card-content">
                    <p>Solicitudes de Vacaciones.</p>
                  </div>
                  <div class="card-tabs">
                    <ul class="tabs tabs-fixed-width">
                        <li class="tab"><a href="#solicitudesPendientes">Solicitudes en revisión.</a></li>
                        <li class="tab"><a href="#historialSolicitudes">Historial de solicitudes en Nómina.</a></li>
                    </ul>
                  </div>
                  <div class=" grey lighten-4">
                    <div id="solicitudesPendientes">
                      <div class="row">
                        <div class="col s12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="table-responsive">
                                    <table class="table striped m-b-10 display centered" id="TableSolicitudes">
                                        <thead class="text-center">
                                            <tr style="">
                                                <th>EMPLEADO</th>
                                                <th>DEPARTAMENTO</th>
                                                <th>FECHA DE LA SOLICITUD</th>
                                                <th>FECHA INICIO</th>
                                                <th>FECHA FIN</th>
                                                <th>TOTAL DE DIAS</th>
                                                <th>VER SOLICITUD</th>
                                                <th>ACCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center" id="contenidoSolicitudes">
                                        </tbody>
                                    </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="historialSolicitudes">
                      <div class="row">
                        <div class="col s12">
                          <div class="card">
                            <div class="card-content">
                              <div class="row">
                                <div class="col s6 l6">
                                  <div class="row">
                                    <div class="col s12" style="text-align:center">
                                      <h6>Fecha Inicial</h6>
                                    </div>
                                    <div class="col s12">
                                      <input type="date" id="FechaIni" value="<?php echo $FechaMenosMes ?>" onchange="getHistoricoSolicitudesNomina()">
                                    </div>
                                  </div>
                                </div>
                                <div class="col s6 l6">
                                  <div class="row">
                                    <div class="col s12" style="text-align:center">
                                      <h6>Fecha Final</h6>
                                    </div>
                                    <div class="col s12">
                                      <input type="date" id="FechaFin" value="<?php echo $hoy ?>" onchange="getHistoricoSolicitudesNomina()">
                                    </div>
                                  </div>
                                </div>
                                <div class="col s12">
                                  <div class="table-responsive">
                                      <table class="table striped m-b-10 display centered" id="tableHistorico">
                                          <thead class="text-center">
                                              <tr style="">
                                                  <th>EMPLEADO</th>
                                                  <th>ESTADO DE LA SOLICITUD</th>
                                                  <th>FECHA DE LA SOLICITUD</th>
                                                  <th>Regresar a pendiente de revisión</th>
                                                  <th>VER SOLICITUD</th>
                                              </tr>
                                          </thead>
                                      </table>
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

        <div class="chat-windows"></div>
    </div>
    <?php include("scripts-original.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/SolicitudesVacacionesFinales-original.js" charset="utf-8"></script>
</body>

</html>
