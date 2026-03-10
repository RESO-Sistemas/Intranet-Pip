<!DOCTYPE html>
<html>

<head>
  <!-- <?php include("AutorizaPagina.php"); ?> -->
  <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP by Lugo</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator_modern.min.css" rel="stylesheet">
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
    <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>
    <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
    <style media="screen">
      .principalContainer{
        padding: 1vh;
        border-radius:15px;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
      }
      .alertify .ajs-header {
        border-bottom: 0px solid #e5e5e5;
      }
      .select-wrapper input.select-dropdown {
          position: relative;
          cursor: pointer;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #9e9e9e;
          outline: none;
          height: 3rem;
          line-height: 3rem;
          width: 100%;
          font-size: 16px;
          margin: 0 0 8px 0;
          padding: 0;
          display: block;
          user-select: none;
          z-index: 1;
          text-align: center;
      }
      .dropdown-content li > a, .dropdown-content li > span {
          text-align: center;
          font-size: 16px;
          color: #d70f0f;
          display: block;
          line-height: 22px;
          padding: 14px 16px;
      }
      .dv_ContentAllResults {
        padding:2vh;
        border-radius:15px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
      }
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
                    <h6 class="font-medium m-b-0">Empleados Evaluados</h6>
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
                  <div class="card">
                    <div class="card-content">
                      <h6 class="sub-title">Evaluación seleccionada:</h6>
                      <h5 id="ev_selected"></h5>
                    </div>
                  </div>
                </div>
              </div>
              <div id="contenidoResGlobal">
                <div class="row">
                  <div class="col s12 l12">
                    <div class="card">
                      <div class="card-content">
                        <div id="principalTable"></div>
                        <!-- <div class="table-responsive">
                          <table id="teableResGlobal" class="table table-bordered centered">
                            <thead>
                              <tr class="">
                                <th>EMPLEADO EVALUADO</th>
                                <th>MÁS DETALLES</th>
                                <th>RESULTADOS GENERALES</th>
                              </tr>
                            </thead>
                          </table>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:none;">
              <div id="detailContainer">
                <div class="row">
                  <div class="col s12" style="text-align:center">
                      <h4><b>EVALUACIÓN DE DESEMPEÑO</b></h4>
                      <hr />
                  </div>
                  <div class="col s12">
                    <div class="row">
                      <div class="col s12" style="text-align:center">
                        <h5 style="color:#d60f0f;">DETALLE DE LOS EVALUADORES</h5>
                      </div>
                      <div class="col s12">
                        <div id="table_general_detail"></div>
                      </div>
                      <div class="col s12">
                        <div class="row">
                          <div class="input-field col s8 center-align offset-s2">
                            <h5><b>Listado de Evaluadores</b></h5>
                            <select id="slc_evaluated_by"  style="text-align:center;width:100%;" class="browser-default"></select>
                          </div>
                        </div>
                      </div>
                      <div class="col s12">
                        <div class="row">
                          <div class="col s12 m4">
                            <div class="col s12">
                              <h5 style="color:#d60f0f;text-align: center">Calificación por competencia y evaluador</h5>
                            </div>
                            <div class="col s12">
                              <div id="table_qualifications"></div>
                            </div>
                          </div>
                          <div class="col s12 m8">
                            <div class="row">
                              <div class="col s12">
                                <h5 style="color:#d60f0f;text-align: center">Fortalezas y Áreas de Oportunidad</h5>
                              </div>
                              <div class="col s12">
                                <div class="row" style="padding:1vh;">
                                  <div class="col s12 m6" style="text-align:center;">
                                    <h5><b>FORTALEZAS</b></h5>
                                    <div id="ev_strengths"></div>
                                    <hr>
                                  </div>
                                  <div class="col s12 m6" style="text-align:center;">
                                    <h5><b>ÁREAS A MEJORAR<b></h5>
                                    <div id="ev_weaknesses"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col s12" >
                            <div id="container">
                                <div id="indvChar" style="height:580px;overflow-x:scroll;"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div style="display:none;">
              <div id="container-generalDetail">
                <div class="row">
                  <div class="col s12" style="text-align:center;">
                    <h4><b>RESULTADO GENERAL</b></h4>
                  </div>
                  <div class="col s12">
                    <div id="finalTableEvaluated"></div>
                  </div>
                  <div class="col s12 m4">
                    <hr>
                    <h6>Seleccione algún tipo de resultados para ser mostrados.</h6>
                    <select class="browser-default" id="selTypeResult" style="width: 100%;">
                      <option value="1"> FORTALEZAS Y ÁREAS A MEJORAR </option>
                      <option value="2"> CÁLCULO </option>
                      <option value="3"> PARES Y SUBORDINADOS </option>
                    </select>
                    <hr>
                  </div>
                  <div class="col s12">
                    <div id="contentAllResultsFinal" class="row"></div>
                  </div>
                  <div class="col s12">
                    <div class="row dv_ContentAllResults">
                      <div id="gn_calculo" class="col s12">
                        <div id="dv_GeneralInfo" class="row"></div>
                        <div class="row">
                          <div class="col s12">
                            <div id="dvFisrtPage" class="row"></div>
                          </div>
                        </div>
                      </div>
                      <div id="gn_par_sub" class="col s12">
                        <div class="row">
                          <div class="col s12">
                            <div class="row" style="margin: auto;">
                              <div class="col s12">
                                <div class="row" style>
                                  <div class="col s12" style="">
                                    <h5 style="color:#df040a;text-align: center">RESULTADOS INVIDIDUALES (PARES)</h5>
                                  </div>
                                  <div class="col s12">
                                    <div id="dv_ind_Par" class="row"></div>
                                  </div>
                                </div>
                              </div>
                              <div class="col s12">
                                <div class="row">
                                  <div class="col s12" style="">
                                    <hr>
                                    <h5 style="color:#df040a;text-align: center">RESULTADOS INVIDIDUALES (SUBORDINADOS)</h5>
                                  </div>
                                  <div class="col s12">
                                    <div id="dv_ind_Subordinado" class="row"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="gn_moreInfo" class="col s12">
                        <div class="row">
                          <div class="col s12">
                            <div class="row" style="margin: auto;">
                              <div class="col s12" style="text-align:center;background-color: ;">
                                <h5 style="color:#df040a;">RESULTADO GLOBAL</h5>
                              </div>
                              <div class="col s12">
                                <div class="row">
                                  <div class="col s12 m5">
                                    <div class="row">
                                      <div class="col s12 ">
                                        <div class="col s12" style="text-align:center;background-color: #;">
                                          <h5 style="color:#df040a;">RESULTADOS FINALES</h5>
                                        </div>
                                        <div class="col s12">
                                          <div id="total_General"></div>
                                        </div>
                                      </div>
                                      <div class="col s12">
                                        <hr>
                                        <div class="row">
                                          <div class="col s12" style="text-align:center;">
                                            <h5 style="color:#df040a;">FORTALEZAS Y ÁREAS A MEJORAR</h5>
                                          </div>
                                          <div class="col s12" style="text-align:center;">
                                            <h5><b>FORTALEZAS</b></h5>
                                            <div id="table_strengths"></div>
                                            <hr>
                                          </div>
                                          <div class="col s12" style="text-align:center;">
                                            <h5><b>ÁREAS A MEJORAR</b></h5>
                                            <div id="table_areasForImprovement"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col s12 m7">
                                    <div id="graph_total_General"></div>
                                  </div>
                                </div>
                                <hr>
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
            <script type="text/x-jsrender" id="viewIndvResultsTemplate">
                ${viewIndvResultsSF(data)}
            </script>
            <script type="text/x-jsrender" id="viewFinalReultsTemplate">
                ${viewFinalReultsSF(data)}
            </script>
       </div>
    </div>
    <?php include("scripts-original.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
    <!-- <script src="scripts/ResultadosEvaluacion/General.js" charset="utf-8" type="module"></script> -->
    <script src="scripts/ResultadosEvaluacion/data-original.js" charset="utf-8"></script>
    <script src="scripts/ResultadosEvaluacion/contentFunctions-original.js" charset="utf-8"></script>
    <script src="scripts/ResultadosEvaluacion/executeFunctions-original.js" charset="utf-8"></script>
</body>

</html>
