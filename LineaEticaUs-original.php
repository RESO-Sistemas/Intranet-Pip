<!DOCTYPE html>
<html>

<head>
    <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script src="componentes/detallesEmpleadoLogeado.js"></script>
    <style media="screen">
      .textDesc {
        font-size:2em !important;
      }
      @media only screen and (max-width: 600px) {
        .textDesc {
          font-size:1em !important;
        }
      }
    </style>
</head>

<body>
    <div class="main-wrapper" id="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">Klyns</p>
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
                    <h5 class="font-medium m-b-0">Línea de ética</h5>
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
                    <div class="col s12">
                        <div class="e-card" style="margin:1vh;">
                            <div class="e-card-content">
                                <div class="row">
                                    <form id="formLineaEtica" action="Backend/LineaEtica/App.php" method="post">
                                        <div class="input-field col s12 l4 ">
                                            <label>Division</label><br /><br />
                                            <select id="division" name="division" class="browser-default" required>
                                                <option value="" selected disabled>Línea de ética</option>
                                            </select>
                                            <span for="division"></span>
                                        </div>
                                        <div class="input-field col s12 l4 ">
                                            <label>Sucursal</label><br><br>
                                            <select id="sl_branch" name="sucursal" class="browser-default" required disabled></select>
                                            <span for="sl_branch"></span>
                                        </div>
                                        <div class="input-field col s12 l4">
                                            <label>Seleccione su situación.</label><br><br>
                                            <select id="slctLineaEtica" name="slctLineaEtica" class="browser-default" required>
                                                <option value="" disabled>Línea de ética</option>
                                            </select>
                                            <span for="slctLineaEtica"></span>
                                        </div>
                                        <div class="input-field col s12 l12">
                                            <textarea id="contenidoLineaEtica" name="contenidoLineaEtica" class="materialize-textarea" placeholder="Escribe tu mensaje..." style="min-height:15vh" required></textarea>
                                            <label for="contenidoLineaEtica" class="textDesc"><b>Describe la situación o inconformidad que presentes.</b></label>
                                        </div>
                                    </form>
                                    <div class="col s12 l4 offset-l4" style="text-align:center">
                                        <label  style="font-size:17px;color:#1C307B "><b>La información que envíes será totalmente anónima.</b></label>
                                        <button class="waves-effect waves-light btn btn-round purple" style="width:100%;margin-top:2vh" id="EnviarLineaE">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <?php include("scripts-original.php"); ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
        <script src="scripts/LineaEticaUs-original.js" charset="utf-8"></script>
</body>

</html>
