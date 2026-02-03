<?php include("AutorizaPagina.php"); ?>
<?php
require_once("Backend/Empleados/Empleados.php");
$ins = new Empleados();
$ins->visitIndexEmployee();

require_once("Backend/Configuracion/Configuracion.php");
$Conf = new Configuracion();
$MenuP = $Conf->getMenusPadre();
?>
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

  <!-- Styles neptune -->

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script src="componentes/detallesEmpleadoLogeado.js"></script>

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
      <?php include("includes/_Header.php"); ?>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">
            <div class="row">
              <div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block" style="position: fixed; z-index:99;">
                <div class="row">
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajes" style="margin-right:2vh"></div>
                  </div>
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                  </div>
                  <div class="col-12" style="position: relative;">
                    <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="page-description page-description-tabbed">
                  <h1>Salud</h1>
                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="hoaccountme" aria-selected="true">Evaluación Fisica y Datos Generales</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="security-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="security" aria-selected="false">Esquema de Vacunación COVID</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- EVALUACION FISICA Y DATOS GENERALES -->
            <div class="row">
              <div class="col">
                <div class="tab-content" id="myTabContent">
                  <!-- INFORMACION PERSONAL -->
                  <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div class="card">
                      <div class="card-body">
                        <form id="FormUpdateDatos" action="Backend/Empleados/App.php" method="post">
                          <input type="hidden" name="op" value="updateDatosSaludEmpleado">
                          <div class="card-title">Habitus exterior</div>
                          <div class="row align-items-center mb-4">
                            <div class="col">
                              <label class="form-label">Describe si tienes una alergia o enfermedad crónica:</label>
                              <p class="card-text"> <input class="form-control form-control-solid-bordered" id="HEDescripcion" name="HEDescripcion" type="text" /></p>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col">
                              <label class="form-label">Peso:</label>
                              <p class="card-text"> <input class="form-control form-control-solid-bordered" id="HEPeso" name="HEPeso" type="text" placeholder="(Kg)" onkeypress="return onlynumber(event)" /></p>
                            </div>
                            <div class="col">
                              <label class="form-label">Complexión:</label>
                              <p class="card-text"><input class="form-control form-control-solid-bordered" id="HEComp" name="HEComp" type="text" /></p>
                            </div>
                            <div class="col">
                              <label class="form-label">Talla:</label>
                              <p class="card-text"><input class="form-control form-control-solid-bordered" id="HETalla" name="HETalla" type="number" placeholder="Cm" /></p>
                            </div>
                          </div>
                          <div class="card-title">Signos Vitales</div>
                          <div class="row align-items-center mb-4">
                            <div class="col">
                              <label class="form-label">Fr. cardíaca:</label>
                              <p class="card-text"> <input class="form-control form-control-solid-bordered" id="SVFrCard" name="SVFrCard" type="text" /></p>
                            </div>
                            <div class="col">
                              <label class="form-label">Fr. respiratoria:</label>
                              <p class="card-text"><input class="form-control form-control-solid-bordered" id="SVFrResp" name="SVFrResp" type="text" /></p>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col">
                              <label class="form-label">Tensión arterial:</label>
                              <p class="card-text"> <input class="form-control form-control-solid-bordered" id="SVTensionArt" name="SVTensionArt" type="text" /></p>
                            </div>
                            <div class="col">
                              <label class="form-label">Temperatura:</label>
                              <p class="card-text"><input class="form-control form-control-solid-bordered" id="SVTemperatura" name="SVTemperatura" type="text" onkeypress="return onlynumber(event)" /></p>
                            </div>
                          </div>
                          <div class="card-title">Información sanguinea</div>
                          <div class="row align-items-center mb-4">
                            <div class="col-12 col-md-6">
                              <label class="form-label">Grupo:</label>
                              <select id="INFSGrupo" name="INFSGrupo" class="form-control form-select">
                                <option value="">Listado grupo sanguíneo</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                              </select>
                            </div>
                            <div class="col-12 col-md-6">
                              <label class="form-label">Factor Rh:</label>
                              <select id="INFSFactirRh" name="INFSFactirRh" class="form-control form-select">
                                <option value="" selected disabled>Factor rh</option>
                                <option value="0">-</option>
                                <option value="1">+</option>
                              </select>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col text-center">
                              <label class="form-label d-block">Cuenta con cartilla de Vacunación:</label>
                              <div class="form-check form-switch d-inline-flex justify-content-center align-items-center">
                                <input type="hidden" name="txtCartilla" id="txtCartilla" value="">
                                <input class="form-check-input" type="checkbox" id="checkCartilla" onclick="checkedCartilla()" style="cursor: pointer;">
                              </div>
                            </div>
                            <div class="col text-center">
                              <label class="form-label d-block">Tiene el esquema completo:</label>
                              <div class="form-check form-switch d-inline-flex justify-content-center align-items-center">
                                <input type="hidden" name="txtEsquema" id="txtEsquema" value="">
                                <input class="form-check-input" type="checkbox" id="checkEsquema" onclick="checkedEsquema()" style="cursor: pointer;">
                              </div>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col">
                              <label class="form-label">Cual falta:</label>
                              <p class="card-text"><input class="form-control form-control-solid-bordered" type="text" id="CualFalta" name="CualFalta"> </p>
                            </div>
                          </div>
                          <div class="row align-items-center mb-4">
                            <div class="col d-flex justify-content-center">
                              <a class="btn btn-success" id="btnGuardar" onclick="updateEvaluacionFisicaEmpleado()">Guardar</a>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!-- ESQUEMA DE VACUNACION COVID -->
                  <div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                    <div class="card">
                      <div class="card-body">
                        <div class="row align-items-center mb-4">
                          <div class="col d-flex justify-content-end">
                            <a class="btn btn-dark" onclick="esquemaCOVID()">Nuevo</a>
                          </div>
                        </div>
                        <div class="row align-items-center mb-4">
                          <div class="col">
                            <form action="Backend/Empleados/App.php" id="formInsertaEsquema" method="post">
                              <input type="hidden" name="op" value="addVacunacionCOVID">
                              <div id="esquemaEmpleado" style="overflow-x:scroll"></div>
                            </form>
                          </div>
                        </div>
                        <div class="row align-items-center mb-4">
                          <div class="col">
                            <div id="getesquemaEmpleado" style="overflow-x:scroll; max-width:100%"></div>
                          </div>
                        </div>
                        <div class="row align-items-center mb-4">
                          <div class="col d-flex justify-content-center">
                            <a class="btn btn-success" id="guardarNuevos">Guardar nuevos</a>
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

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <?php include("scripts.php"); ?>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  
  <!-- Scripts específicos de esta página -->
  <script src="scripts/global.js" charset="utf-8"></script>
  <script src="scripts/salud.js" charset="utf-8"></script>
  <script src="scripts/detallesEmpleadoLogeado.js"></script>

  <script type="text/javascript">
    $(document).ready(function() {
      getDatosSaludEmpleado();
    });

    function updateEvaluacionFisicaEmpleado() {
      if (document.getElementById("FormUpdateDatos").checkValidity()) {
        event.preventDefault();
        var form = $("#FormUpdateDatos")[0];
        var data = new FormData(form);
        $.ajax({
          type: "POST",
          url: "Backend/Empleados/App.php",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 600000,
          success: function(response) {
            if (response == "1") {
              Swal.fire(
                'Actualizado',
                'Los datos de este empleado fueron actualizados',
                'success'
              )
              setTimeout(function() {
                getDatosSaludEmpleado();
              }, 500);
            } else {
              toastr.warning("Algo salio mal, Intente de nuevo");
            }
          },
          error: function(e) {
            alert(e.responseText);
          }
        });
      }
    }

    function getDatosSaludEmpleado() {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: "op=getDatosSaludEmpleado",
        success: function(response) {
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
              document.getElementById("checkCartilla").checked = false;
            } else {
              document.getElementById("checkCartilla").checked = true;
            }
            if (response[i]["EsquemaCompleto"] == "0") {
              document.getElementById("checkEsquema").checked = false;
            } else {
              document.getElementById("checkEsquema").checked = true;
            }
            $("#CualFalta").val(response[i]["OtrosComentariosSalud"]);
          }
        },
        error: function(e) {
          alert(e.responseText);
        }
      });
    }
    checkedCartilla();
    checkedEsquema();

    function checkedCartilla() {
      if ($("#checkCartilla").is(":checked")) {
        $("#txtCartilla").val("1");
      } else {
        $("#txtCartilla").val("0");
      }
    }

    function checkedEsquema() {
      if ($("#checkEsquema").is(":checked")) {
        $("#txtEsquema").val("1");
      } else {
        $("#txtEsquema").val("0");
      }
    }
  </script>


</body>

</html>