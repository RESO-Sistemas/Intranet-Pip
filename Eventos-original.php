<!DOCTYPE html>

<html>



<head>

    <!-- include("AutorizaPagina.php"); -->

  <?<title>La Esmeralda</title>; ?>

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

    <link href="dist/css/pages/data-table.css" rel="stylesheet">

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

                    <h5 class="font-medium m-b-0">Eventos</h5>

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

                <div class="col s4 offset-s4 l2 offset-l10">

                  <a class="waves-effect waves-light btn btn-round indigo modal-trigger" href="#ModalEvento" onclick="TipoAccion(0)">Nuevo Evento</a>

                </div>

              </div>

              <div class="card">

                <div class="card-content">

                  <div class="table-responsive">

                    <table class="table striped m-b-10 display centered" id="TableEventos">

                      <thead>

                        <tr>

                          <th>TITULO</th>

                          <th>DESCRIPCIÓN</th>

                          <th>FECHA INICIO</th>

                          <th>FECHA FIN</th>

                          <th>STATUS</th>

                          <th>EDITAR</th>

                          <th>EDITAR STATUS</th>

                        </tr>

                      </thead>

                    </table>

                  </div>

                </div>

              </div>

            </div>



        <div class="chat-windows"></div>

    </div>



    <div id="ModalEvento" class="modal">

      <div class="modal-content">

        <div class="modal-header">

        </div>

        <div class="row">

          <div class="col s12 l12" style="text-align:center">

            <h3>Evento</h3>

          </div>

          <form id="FomrInsertaEvento"  action="Backend/Eventos/App.php" method="post">

            <div class="input-field col s12 l12">

                <label >Titulo</label><br>

                <input id="txtTitulo" type="text" name="txtTitulo" value="" required>

            </div>

            <div class="input-field col s12 l12">

                <label >Descripcion</label><br>

                <input id="txtDescripcion" name="txtDescripcion" type="text" value="" required>

            </div>

            <div class="input-field col s6 l3">

              <label >Fecha Inicio</label><br>

              <input type="date" id="txtFechaInicio" name="txtFechaInicio" value="" required max="2999-09-21">

            </div>

            <div class="input-field col s6 l3">

              <label >Fecha Fin</label><br>

              <input type="date" id="txtFechaFin" name="txtFechaFin" value="" required max="2999-09-21">

            </div>

            <div class="input-field col s6 l3">

              <label >Hora Inicio</label><br>

              <input type="time" id="txtHoraInicio" name="txtHoraInicio" value="" required>

            </div>

            <div class="input-field col s6 l3">

              <label >Hora Fin</label><br>

              <input type="time" id="txtHoraFin" name="txtHoraFin" value="" required>

            </div>

          </form>

        </div>

      </div>

      <div class="modal-footer">

          <button class="modal-action  waves-effect waves-green btn-flat" onclick="EventoOnclick()" style="

          box-shadow: 0px 10px 14px -7px #3e7327;

        	background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);

        	background-color:#77b55a;

        	border-radius:4px;

        	border:1px solid #4b8f29;

        	display:inline-block;

        	cursor:pointer;

        	color:#ffffff;

        	font-family:Arial;

        	font-size:13px;

        	font-weight:bold;

        	padding:1px 6px;

        	text-decoration:none;

        	text-shadow:0px 1px 0px #5b8a3c;" id="RegistrarEvento"></button>

          <button class="modal-action  waves-effect waves-green btn-flat modal-close" id="ModalClose" style="display:none;"></button>

      </div>

    </div>

    <?php include("scripts.php"); ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

    <script src="scripts/Eventos-original.js" charset="utf-8"></script>

</body>



</html>
