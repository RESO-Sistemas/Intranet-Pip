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
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="componentes/detallesEmpleadoLogeado.js"></script>
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
                    <h5 class="font-medium m-b-0">Salud</h5>
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
                        <div id="DivEvFisicayDatosGenerales">
                        <div class="col s12 l12" style="text-align:center">
                            <div class="container">
                                <detalle-empleado-logeado></detalle-empleado-logeado>
                            </div>
                        </div>
                          <div class="col s12 l12">
                            <div class="card  darken-1">
                              <div class="card-content white-text">
                                <div class="row">
                                  <div class="col s12 l12">
                                    <h5 style="font-size:25px">Evaluación física y datos generales</h5>
                                    <br>
                                  </div>
                                  <form id="FormUpdateDatos"  action="Backend/Empleados/App.php" method="post">
                                    <input type="hidden" name="op" value="updateDatosSaludEmpleado">
                                    <div class="col s12" id="HabitusExterior">
                                      <div class="row">
                                        <div class="col s12 l12">
                                          <div class="p-10 bg-info">
                                            <h6 class="m-b-0 white-text">Habitus exterior</h6>
                                          </div>
                                          <div class="input-field col s12 l12">
                                            <h6>Describe si tienes una alergia o enfermedad crónica.</h6>
                                            <input id="HEDescripcion" name="HEDescripcion" type="text" />
                                          </div>
                                        </div>
                                        <div class="col s4 l4">
                                          <div class="input-field col s12 l12">
                                            <h6>Peso</h6>
                                            <input id="HEPeso" name="HEPeso" type="text" placeholder="(Kg)" onkeypress="return onlynumber(event)"/>
                                          </div>
                                        </div>
                                        <div class="col s4 l4">
                                          <div class="input-field col s12 l12">
                                            <h6>Complexión</h6>
                                            <input id="HEComp" name="HEComp" type="text" />
                                          </div>
                                        </div>
                                        <div class="col s4 l4">
                                          <div class="input-field col s12 l12">
                                            <h6>Talla</h6>
                                            <input id="HETalla" name="HETalla" type="number" placeholder="Cm"/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col s12 l12" id="SignosVitales">
                                      <div class="row">
                                        <div class="col s12 l12">
                                          <div class="p-10 bg-info">
                                            <h6 class="m-b-0 white-text">Signos Vitales</h6>
                                          </div>
                                          <div class="input-field col s6 l6">
                                            <h6>Fr. cardíaca</h6>
                                            <input id="SVFrCard" name="SVFrCard" type="text" />
                                          </div>
                                          <div class="input-field col s6 l6">
                                            <h6>Fr. respiratoria</h6>
                                            <input id="SVFrResp" name="SVFrResp" type="text" />
                                          </div>
                                          <div class="input-field col s6 l6">
                                            <h6>Tensión arterial</h6>
                                            <input id="SVTensionArt" name="SVTensionArt" type="text" />
                                          </div>
                                          <div class="input-field col s6 l6">
                                            <h6>Temperatura</h6>
                                            <input id="SVTemperatura" name="SVTemperatura" type="text" onkeypress="return onlynumber(event)"/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col s12 l12" id="InformacionSanguinea">
                                      <div class="row">
                                        <div class="col s12 l12">
                                          <div class="p-10 bg-info">
                                            <h6 class="m-b-0 white-text">Información sanguinea</h6>
                                          </div>
                                          <div class="input-field col s6 l6">
                                            <h6>Grupo</h6>
                                            <!-- <input id="INFSGrupo" name="INFSGrupo" type="text" /> -->
                                            <select id="INFSGrupo" name="INFSGrupo" class="browser-default">
                                              <option value="">Listado grupo sanguíneo</option>
                                              <option value="A">A</option>
                                              <option value="B">B</option>
                                              <option value="AB">AB</option>
                                              <option value="O">O</option>
                                            </select>
                                          </div>
                                          <div class="input-field col s6 l6">
                                            <h6>Factor Rh</h6>
                                            <select id="INFSFactirRh" name="INFSFactirRh" class="browser-default">
                                              <option value=""selected disabled>Factor rh</option>
                                              <option value="0">-</option>
                                              <option value="1">+</option>
                                            </select>
                                          </div>
                                          <div class="col s12 l12">
                                            <div class="row">
                                              <div class="col s2 l2">
                                                  <div class="switch">
                                                      <label>
                                                          <input  type="checkbox" id="checkCartilla" onclick="checkedCartilla()">
                                                          <span class="lever"></span>
                                                      </label>
                                                  </div>
                                              </div>
                                              <div class="col s10 l10">
                                                <input type="hidden" name="txtCartilla" id="txtCartilla" value="" >
                                                <span class="m-l-10" style="color:black">Cuenta con cartilla de Vacunación</span>
                                              </div>
                                            </div>
                                            <br><br>
                                          </div>
                                          <div class="col s12 l12">
                                            <div class="row">
                                              <div class="col s2 l2">
                                                  <div class="switch">
                                                      <label>
                                                          <input  type="checkbox" id="checkEsquema" onclick="checkedEsquema()">
                                                          <span class="lever"></span>
                                                      </label>
                                                  </div>
                                              </div>
                                              <div class="col s10 l10">
                                                <input type="hidden" name="txtEsquema" id="txtEsquema" value="">
                                                <span class="m-l-10" style="color:black">Tiene el esquema completo</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="input-field col s12 l12">
                                            <br>
                                            <h6>Cual falta</h6>
                                            <input type="text" id="CualFalta" name="CualFalta">
                                          </div>
                                         </div>
                                      </div>
                                    </div>
                                  </form>
                                  <br>
                                  <div class="col s12 l12">
                                    <a class="waves-effect waves-light btn green" id="btnGuardar" onclick="updateEvaluacionFisicaEmpleado()" style="display: flex; align-items: center;justify-content: center; width:50%; margin:auto;">Aceptar</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col s12 l12">
                            <div class="card">
                              <div class="card-content">
                                <div class="row">
                                  <div class="col s12 l12">
                                    <h4>Esquema Vacunacion COVID</h4>
                                  </div>
                                  <div class="col s4 offset-s4 l2 offset-l10" style="align-content: center;align-items: center;text-align: center;">
                                    <a class="waves-effect waves-light btn btn-round orange" onclick="esquemaCOVID()">Nuevo</a>
                                  </div>
                                </div>
                                <br>
                                <form  action="Backend/Empleados/App.php" id="formInsertaEsquema" method="post">
                                  <input type="hidden" name="op" value="addVacunacionCOVID">
                                  <div id="esquemaEmpleado" style="overflow-x:scroll"></div>
                                </form>
                                <div id="getesquemaEmpleado" style="overflow-x:scroll; max-width:100%"></div>
                                <div class="col s4 offset-s4 l4 offset-l4" style="text-align:center">
                                  <a class="waves-effect waves-light btn btn-round green" id="guardarNuevos">Guardar nuevos</a>
                                </div>
                                <br><br>
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
    <script src="scripts/index-original.js"></script>
    <script src="scripts/salud-original.js" charset="utf-8"></script>
    <script src="scripts/detallesEmpleadoLogeado.js"></script>
    <script type="text/javascript">
      $(document).ready(function(){
        getDatosSaludEmpleado();
      });
      function updateEvaluacionFisicaEmpleado(){
        if (document.getElementById("FormUpdateDatos").checkValidity()) {
          event.preventDefault();
          var form = $("#FormUpdateDatos")[0];
          var data = new FormData(form);
          $.ajax({
            type:"POST",
            url:"Backend/Empleados/App.php",
            data:data,
            processData:false,
            contentType:false,
            cache: false,
            timeout:600000,
            success:function(response){
              if (response == "1") {
                Swal.fire(
                  'Actualizado',
                  'Los datos de este empleado fueron actualizados',
                  'success'
                )
                setTimeout(function () {
                  getDatosSaludEmpleado();
                }, 500);
              }else {
                toastr.warning("Algo salio mal, Intente de nuevo");
              }
            },error:function(e){
              alert(e.responseText);
            }
          });
        }
      }

      function getDatosSaludEmpleado(){
        $.ajax({
          type: "post",
          url: "Backend/Empleados/App.php",
          data: "op=getDatosSaludEmpleado",
          success:function(response){
            response = JSON.parse(response.trim());
            for (var i = 0; i < response.length; i++) {
              $("#HEDescripcion").val(response[i]["HabitusExteriorDescripcion"]);
              $("#HEPeso").val(response[i]["Peso"]);
              $("#HEComp").val(response[i]["Complexion"]);
              $("#HETalla").val(response[i]["Talla"]);
              $("#SVFrCard").val(response[i]["FrCardiaca"]);
              $("#SVFrResp").val(response[i]["FrRespiratoria"]);
              $("#SVTensionArt").val(response[i]["TensionArterial"]);
              $("#SVTemperatura").val(response[i]["Temperatura"]);
              $("#INFSGrupo").val(response[i]["GrupoSanguineo"]);
              $("#INFSFactirRh").val(response[i]["FactorRh"]);
              $("#txtCartilla").val(response[i]["CartillaVacunacion"]);
              $("#txtEsquema").val(response[i]["EsquemaCompleto"]);

              if (response[i]["CartillaVacunacion"] == "0") {
                document.getElementById("checkCartilla").checked= false;
              }else {
                document.getElementById("checkCartilla").checked= true;
              }
              if (response[i]["EsquemaCompleto"] == "0") {
                document.getElementById("checkEsquema").checked= false;
              }else {
                document.getElementById("checkEsquema").checked= true;
              }
              $("#CualFalta").val(response[i]["OtrosComentariosSalud"]);
            }
          }, error:function(e){
            alert(e.responseText);
          }
        });
      }
      checkedCartilla();
      checkedEsquema();
      function checkedCartilla(){
        if ($("#checkCartilla").is(":checked")) {
          $("#txtCartilla").val("1");
        }else {
          $("#txtCartilla").val("0");
        }
      }
      function checkedEsquema(){
        if ($("#checkEsquema").is(":checked")) {
          $("#txtEsquema").val("1");
        }else {
          $("#txtEsquema").val("0");
        }
      }
    </script>
</body>

</html>
