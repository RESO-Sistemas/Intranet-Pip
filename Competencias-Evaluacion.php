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
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator_semanticui.min.css" rel="stylesheet">
    <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>

    <style media="screen">
      .card-Modal{
        margin-top:2vh;
        padding:1vh;
        border-radius:15px;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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
          include("menus.php");
           ?>
        </div>
        <div class="page-wrapper">
            <div class="page-titles">
                <div class="d-flex align-items-center">
                    <h5 class="font-medium m-b-0">Competencias</h5>
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
              <div class="fixed-action-btn">
                <a class="btn-floating btn-large red" id="btn_openNew">
                  <i class="large material-icons">add_to_photos</i>
                </a>
              </div>
              <div class="row">
                <div class="col s12">
                  <div class="card">
                    <div class="card-content">
                      <div class="row">
                        <div class="col s12 m3">
                          <span>Tipos de Competencias</span>
                          <select id="home_types_comp"></select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col s12">
                  <div class="card">
                    <div class="card-content">
                      <span class="subtitle">Listado de Competencias.</span>
                      <div class="table-responsive">
                        <table id="table_Competencias">
                          <thead>
                            <tr>
                              <th>Competencia</th>
                              <th>Tipo de Competencia</th>
                              <th>Status</th>
                              <th>Editar</th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="display:none;">
                <div id="contentCompetencia">
                  <input type="hidden" id="actionModal_Comp">
                  <input type="hidden" id="Modal_idCompetence">
                  <div id="contentInpCompetencias">
                    <div class="row">
                      <div class="col s12 m8">
                        <div class="row">
                          <div class="col s12">
                            <div class="card-Modal">
                              <div class="row">
                                <div class="col s4">
                                  <label for="slc_typeComp">Tipo de Competencia*</label>
                                  <select id="slc_typeComp" required></select>
                                </div>
                                <div class="input-field col s8">
                                    <input id="tx_Competencia" type="text" required>
                                    <label for="tx_Competencia">COMPETENCIA</label>
                                </div>
                                <div class="input-field col s12">
                                    <textarea id="tx_Significado" class="materialize-textarea" required></textarea>
                                    <label for="tx_Significado">SIGNIFICADO</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col s12">
                            <div class="card-Modal">
                              <span class="subtitle">Calificaciones por competencia</span>
                              <div class="row">
                                <div class="col s12">
                                  <div class="input-field col s12 m6">
                                      <textarea id="tx_cal_A" class="materialize-textarea" required></textarea>
                                      <label for="tx_cal_A">CALIFICACIÓN "A"</label>
                                  </div>
                                  <div class="input-field col s12 m6">
                                      <textarea id="tx_cal_B" class="materialize-textarea" required></textarea>
                                      <label for="tx_cal_B">CALIFICACIÓN "B"</label>
                                  </div>
                                </div>
                                <div class="col s12">
                                  <div class="row">
                                    <div class="input-field col s12 m6">
                                        <textarea id="tx_cal_C" class="materialize-textarea" required></textarea>
                                        <label for="tx_cal_C">CALIFICACIÓN "C"</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <textarea id="tx_cal_D" class="materialize-textarea" required></textarea>
                                        <label for="tx_cal_D">CALIFICACIÓN "D"</label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col s12">
                                  <div class="row">
                                    <div class="input-field col s12 m12">
                                        <textarea id="tx_cal_E" class="materialize-textarea" required></textarea>
                                        <label for="tx_cal_E">CALIFICACIÓN "E"</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col s12 m4">
                        <div class="card-Modal">
                          <div class="row">
                            <div class="col s12">
                              <div class="row">
                                <div class="col s12 m5">
                                  <label for="slc_lvlComp">Nivel de Empleados*</label>
                                  <select id="slc_lvlComp">
                                    <option value=""> LISTADO DE NIVELES</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                  </select>
                                </div>
                                <div class="col s12 m4">
                                  <label for="slc_calEsperadoComp">Calificación Esperada*</label>
                                  <select id="slc_calEsperadoComp">
                                    <option value=""> LISTADO DE CALIFICACIONES</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                  </select>
                                </div>
                                <div class="col s12 m3">
                                  <button type="button" class="AgregarBtnBlue" id="btnAddListaLvl">Agregar</button>
                                </div>
                              </div>
                            </div>
                            <div class="col s12">
                              <div id="dv_niveles_temp"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col s6 offset-s3 m4 offset-m4" style="margin-top:2vh">
                        <button type="button" id="btnSaveCompetencia" class="btnAceptarVerde" style="width:100%;">GUARDAR COMPETENCIA</button>
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
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/Competencias-Evaluacion/General.js" charset="utf-8" type="module"></script>
</body>

</html>
