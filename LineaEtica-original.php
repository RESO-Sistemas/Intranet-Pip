<!DOCTYPE html>
<html>

<head>
   <!-- include("AutorizaPagina.php"); -->
    <?php include("estilos.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP Intranet</title>
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">

    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                    <h5 class="font-medium m-b-0">Linea de Etica</h5>
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
                <div class="col s12 l3 offset-l9" >
                    <div class="container">
                        <button data-target="CatalogoLineaEica" class="btn modal-trigger">Ver Catálogo Línea Ética</button>
                    </div>
                </div>
              </div>
              <div class="row" style="margin-top: 10px;">
                  <div class="col s12 l12">
                      <div class="e-card">
                          <div class="e-card-header">
                              <h5 class="card-title">Mensajes Línea de Ética</h5>
                          </div>
                          <div class="e-card-content">
                              <div class="row">
                                  <div class="profiletimeline m-t-30" style="overflow-y:scroll;max-height:65vh">
                                      <div class="sl-item">
                                          <div id="ContenidoLineaEtica" style=""></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
        <div id="CatalogoLineaEica" class="modal" style="min-height:80vh">
            <div class="modal-content" >
                <h4>Catálogos Línea Ética</h4>
                <div class="row">
                    <div class="col s12 l12" style="box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;">
                        <div class="row">
                            <div class="input-field col s8 l8">
                                <form id="formInsertaCatalogo">
                                    <input type="hidden" name="op" value="addCatalogoLiniaEtica">
                                    <input type="text" name="txtNuevaEtica" id="txtNuevaEtica" required>
                                </form>
                                <label class="active" for="txtNuevaEtica">Nuevo Catálogo</label>
                            </div>
                            <div class="col s4 l4" style="text-align:right">
                                <a class="waves-effect waves-light btn btn-round indigo" style="margin-top:2vh" id="btnAgregaNuevoCatalogo">Agregar Nuevo</a>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 l12" style="box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;margin-top:2vh">
                        <div class="table-responsive" >
                            <table id="tableCatalogoLiniaEtica" class="table striped m-b-10 display centered" style="min-height:auto;max-height:40vh; overflow-y:scroll;">
                                <thead>
                                    <tr>
                                        <th>Descripción</th>
                                        <th>Status</th>
                                        <th>Actualizar Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>
        </div>
        <?php include("scripts.php"); ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="scripts/global-csoriginal.js" charset="utf-8"></script>
        <script src="scripts/LineaEtica-original.js" charset="utf-8"></script>
</body>

</html>
