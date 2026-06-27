<!DOCTYPE html>

<html>



<head>

  <?php include("estilos.php"); ?>
<title>La Esmeralda</title>
    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

    <title>PIP by Lugo</title>

    <link href="dist/css/style.css" rel="stylesheet">

    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <link rel="stylesheet" href="plugins/chosen/chosen.min.css">

    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

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

                    <h5 class="font-medium m-b-0">Listado de Evaluados</h5>

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

                      <div class="row">

                        <div class="col s12">

                          <h5>Evaluación seleccionada: <b id="tx_title"></b></h5>

                        </div>

                        <!-- <div class="col s12">

                          <div class="row">

                            <div class="col s12 m4">

                              <label>Division</label>

                              <select id="slcDivision" class="browser-default"></select>

                            </div>

                            <div class="col s12 m4">

                              <label>Puestos</label>

                              <select id="slcPuestos" class="browser-default"></select>

                            </div>

                            <div class="col s12 m4">

                              <label>Sucursal</label>

                              <select id="slcSucursal" class="browser-default"></select>

                            </div>

                          </div>

                        </div> -->

                      </div>

                    </div>

                  </div>

                </div>

                <div class="col s12">

                  <div class="card">

                    <div class="card-content">

                      <div class="row">

                        <div class="col s12">

                          <h6><b>Nota: </b>Para filtrar los resultados es necesario seleccionar algún puesto o sucursal/departamento donde pertenecen los empleados a buscar.</h6>

                        </div>

                      </div>

                      <div id="table_evaluados"></div>

                      <!-- <div class="table-responsive">

                        <table id="table_evaluados">

                          <thead>

                            <tr>

                              <th>No. Empleado</th>

                              <th>Empleado</th>

                              <th>Nivel Durante la Evaluación</th>

                              <th>Puesto Durante la Evaluación</th>

                              <th>Evaluadores</th>

                            </tr>

                          </thead>

                        </table>

                      </div> -->

                    </div>

                  </div>

                </div>

              </div>

              <div style="display:none;">

                <div id="modal_evaluadores">

                  <input type="hidden" id="evaluadoSelected">

                  <div class="row">

                    <div class="col s12">

                      <div>

                        <button class="btn-add" id="btnNuevoEvaluador">

                          <div class="sign">+</div>

                          <div class="text">Agregar</div>

                        </button>

                      </div>

                      <div class="table-responsive">

                        <table id="table_evaluadores">

                          <thead>

                            <tr>

                              <th>Evaluadores</th>

                              <th>Tipo Evaluador</th>

                              <th>Eliminar evaluador</th>

                            </tr>

                          </thead>

                        </table>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div style="display:none;">

                <div class="row" id="contNuevoEvaluador">

                  <div class="col s12">

                    <div class="row">

                      <div class="col s12">

                        <div class="row">

                          <div class="col s12">

                            <label>Relación entre el empleado.</label>

                            <select  class="browser-default" id="modal_relacion">

                              <option value="1">JEFE</option>

                              <option value="2">PAR</option>

                              <option value="3">SUBORDINADO</option>

                            </select>

                          </div>

                        </div>

                      </div>

                      <div class="col s12">

                        <div class="row">

                          <div class="col s12 m6">

                            <label>Puestos</label>

                            <select id="slcPuestosModal" class="browser-default"></select>

                          </div>

                          <div class="col s12 m6">

                            <label>Division</label>

                            <select id="slcDivisionModal" class="browser-default"></select>

                          </div>

                          <div class="col s12">

                            <label>Sucursal</label>

                            <select id="slcSucursalModal" class="browser-default"></select>

                          </div>

                          <div class="col s12">

                            <div class="table-responsive">

                              <table id="table_newEvaluadores">

                                <thead>

                                  <tr>

                                    <th>Empleado</th>

                                    <th>Seleccionar</th>

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

              <!-- <div id="modal_evaluadores" class="modal">

                  <div class="modal-content">



                  </div>

                  <div class="modal-footer">

                      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>

                  </div>

              </div> -->

            </div>

    </div>

    <script type="text/x-jsrender" id="btnListEvaluatorsTemplate">

      ${btnListEvaluatorsSF(data)}

    </script>

    <?php include("scripts-original.php"); ?>

    <script src="https://cdn.syncfusion.com/ej2/20.3.56/dist/ej2.min.js" type="text/javascript"></script>

    <script src="plugins/chosen/chosen.jquery.min.js" charset="utf-8"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

    <script src="assets/libs/toastr/build/toastr.min.js"></script>

    <script src="assets/extra-libs/toastr/toastr-init.js"></script>

    <script src="scripts/Evaluados-original.js" charset="utf-8"></script>

</body>



</html>
