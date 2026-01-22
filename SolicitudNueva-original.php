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
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
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
                    <h5 class="font-medium m-b-0">Solicitud de vacaciones</h5>
                    <div class="custom-breadcrumb ml-auto">
                        <a href="#!" class="breadcrumb">Home</a>
                        <a href="#!" class="breadcrumb">Inicio</a>
                    </div>
                </div>
            </div>
            <div class="row">
               <div class="col s10 offset-s1 l5 offset-l7" style="position: absolute; z-index:99;">
                <div class="row">
                 <div id="contenidoMensajes" style="position:fixed;margin-right:2vh"></div>
                </div>
               </div>
              </div>
              <div class="container-fluid" style="z-index:5">
                <div class="row">
                  <div class="col s4 m3 offset-m9">
                    <a href="SolicitudVacaciones.php" style="width:100%;" class="waves-effect waves-light btn btn-round purple">Regresar</a>
                  </div>
                </div>
              <div class="row">
                <div class="card" style="margin:1vh">
                  <div class="card-content">
                    <div class="row">
                      <div class="s12">
                        <h3 id="NombreEmpleado"></h3><br>
                      </div>
                      <div class="col s12 m8">
                        <div class="row" id="card_contentVal">
                          <div class="input-field col s12 l4">
                            <h5>Fecha de Inicio</h5>
                            <input id="FechaInicio" type="date" onchange="getDiasSeleccionados()" required>
                            <p for="FechaInicio" data-msg="Es necesario ingresar una fecha para poder continuar."></p>
                            <input type="hidden" id="CantidadDiasDisp" value="">
                          </div>
                          <div class="input-field col s12 l4">
                            <h5>Fecha de fin</h5>
                            <input id="FechaFin" type="date" onchange="getDiasSeleccionados()" required>
                            <p for="FechaFin" data-msg="Es necesario ingresar una fecha para poder continuar."></p>
                            <!-- <input type="hidden" id="FechaFin" value=""> -->
                          </div>
                          <div class="col s12 m4">
                            <h5>Días de descanso</h5>
                            <hr>
                            <select class="browser-default" id="daysBreak" multiple style="width: 100%">
                                <option value="Sunday">Domingo</option>
                                <option value="Monday">Lunes</option>
                                <option value="Tuesday">Martes</option>
                                <option value="Wednesday">Miercoles</option>
                                <option value="Thursday">Jueves</option>
                                <option value="Friday">Viernes</option>
                                <option value="Saturday">Sabado</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="input-field col s12 l4">
                        <h6 id="DiasDisponibles"></h6><br>
                        <h6 id="DiasSeleccionados">Cantidad de dias seleccionados: 0</h6>
                        <h6 id="DiaRegreso">Regresando el día: Sin registro</h6>
                      </div>
                      <div class="input-field col s12 l12">
                        <h5>Motivo de Solicitud</h5>
                        <textarea id="MotivoSolicitud" class="materialize-textarea" style="height:15vh"></textarea>
                      </div>
                      <div class=" input-field col s4 offset-s4 l4 offset-l4 text-center" style="text-align:center">
                        <a href="AddFirma.php" class="btn blue darken-2 modal-close save-category">Actualizar Firma</a>
                      </div>
                      <div class="col s12 l12" style="background-color:#f3f3f3; max-height:25vh; min-width:auto; border-radius:15px; text-align: center;">
                        <img src="" id="imgFirma" alt="" style="height:100%">
                      </div>
                      <div class="col s12 l12" style="margin:2vh;">
                        <a class="waves-effect waves-light btn green" onclick="enviarSolicitudVacaciones()">Enviar Solicitud</a>
                        <button type="button" id="openModalJefes" data-target="ModalAsignarHijo" class="btn modal-trigger" style="display:none;"></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="ModalAsignarHijo" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h3>Jefe Asignado</h3>
                    <div class="input-field col s12 l12" >
                        <select name="" id="listadoJefesPosibles" style="max-height:40vh" onchange="asignarJefeEmpleado(this.value)"></select>
                    </div>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
    </div>


    <?php include("scripts.php"); ?>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="scripts/SolicitudNueva.js" charset="utf-8"></script>
    <script type="text/javascript">
      $(document).ready(function(){
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

      function getFirmaEmp(){
        $.ajax({
          type: "post",
          url: "Backend/Empleados/App.php",
          data: "op=getFirmaEmp",
          success:function(response){
            response = JSON.parse(response.trim());
            for (var i = 0; i < response.length; i++) {
              let urlImg = "Archivos/ImgEmpleados/"+response[i]["NoEmpleado"]+"/Firma/"+response[i]["Firma"];
              $("#imgFirma").attr("src",urlImg);
            }
          },error:function(e){
            alert(e.responseText);
          }
        });
      }

    </script>
</body>

</html>
