<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
  <title>PIP Intranet</title>

  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>

  <!-- Styles neptune -->

  <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
  <!-- <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" /> -->
  <!-- <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" /> -->
  <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
  <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet"> -->
</head>

<body>
  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div>
    <div id="Menu">
      <?php
      include("menus.php");
      ?>
    </div>
    <div class="app-container">
      <?php include("includes/_Header.php"); ?>
                      id="imgSmallProfile"
                      alt="user"
                      class="rounded-circle"
                      width="30"
                      height="30" />
                  </a>
                  <ul
                    id="user_dropdown"
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="addDropdownLink">
                    <li>
                      <!-- <a class="dropdown-item" href="#">New Workspace</a> -->
                      <div class="dropdown-item " style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                        <div class="u-img" style="padding-bottom: 10px; padding-top:10px; "><img class="rounded-circle " id="profileImg" alt="user" width="60px" height="60px"></div>
                        <div class="u-text">
                          <h4 id="PerfilNombreEmp"></h4>
                          <p id="PerfilCorreoEmp"></p>
                          <!-- <a class="waves-effect waves-light btn-small red white-text" href="index.php">Perfil</a> -->
                        </div>
                      </div>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="index.php"><i class="material-icons me-2">home</i>Inicio</a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="logout.php"><i class="material-icons me-2">exit_to_app</i>Salir</a>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="app-content">
        <div class="content-wrapper">
          <div class="container">
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
            <div class="row">
              <div class="col">
                <div class="page-description page-description-tabbed">
                  <h1>Permisos</h1>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-4">
                        <a href="Puestos.php" class="btn btn-danger">Regresar</a>
                      </div>
                    </div>
                    <div class="row">
                      <div id="ContenedorPermisos" class="row g-4"></div>
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

  <script src="scripts/Permisos.js" charset="utf-8"></script>
  <script type="text/javascript">
  </script>

</body>

</html>