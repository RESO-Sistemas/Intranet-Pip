<?php include("AutorizaPagina.php"); ?>
<?php
if (isset($_COOKIE["tipo_sesion"])) {
  if ($_COOKIE["tipo_sesion"] != "1") {
    echo '<meta http-equiv="refresh" content="0;url=logout.php">';
    die();
  }
};
if (isset($_COOKIE["sesion"])  && isset($_COOKIE["verificaSesion"])) {
  if ($_COOKIE["sesion"] != "activa" || $_COOKIE["verificaSesion"] != "activa") {
    echo '<meta http-equiv="refresh" content="0;url=login.php">';
    die();
  }
} else {
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet</title>


  <!-- Styles neptune -->

  <?php include("neptune_styles.php");  ?>

  <!-- Styles neptune -->
  <link rel="stylesheet" href="assets/libs/smart-wizard/dist/css/smart_wizard_all.min.css">
  <link rel="stylesheet" href="assets/libs/bs-stepper/src/css/bs-stepper.css">
  <link href="assets/libs/chartist/dist/chartist.min.css" rel="stylesheet">
  <link href="assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css" rel="stylesheet">
  <link href="dist/css/pages/data-table.css" rel="stylesheet">
  <link href="dist/css/pages/dashboard1.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
  <link href="plugins/tabulator/dist/css/tabulator_semanticui.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>
  <title>Evaluaciones</title>
</head>

<body>
  <div class="app-content pt-3 mt-3">
    <div class="content-wrapper" id="main-wrapper">
      <div class="containe px-4">
        <div class="row">
          <div class="col">
            <div class="page-description page-description-tabbed">
              <h1 class="mb-2">
                Evaluación: <span id="titulo_Ev"></span>
              </h1>
              <div class="d-flex gap-2 flex-wrap">
                <span class="badge badge-success" id="puesto_Ev">Empleado</span>
                <span class="badge badge-success" id="empleado_Ev">Empleado</span>
                <span class="badge badge-success">Nivel durante la evaluación: <span id="lvl_Ev"></span></span>
              </div>
            </div>
          </div>
        </div>


        <div class="card mx-2 ">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <a href="pending-evaluations.php" class="btn btn-danger d-flex align-items-center gap-2" style="width: fit-content;">
                  <span class="material-symbols-outlined">arrow_back</span>
                  Salir
                </a>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div id="contentComp"></div>
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
  <script src="assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="assets/libs/sweetalert2/dist/sweetalert2.all.min.js" charset="utf-8"></script>
  <script src="assets/libs/smart-wizard/dist/js/jquery.smartWizard.min.js" charset="utf-8"></script>
  <script src="	https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js" charset="utf-8"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" integrity="sha512-fD9DI5bZwQxOi7MhYWnnNPlvXdp/2Pj3XSTRrFs5FQa4mizyGLnJcN6tuvUS6LbmgN1ut+XGSABKvjN0H6Aoow==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="dist/js/materialize.min.js"></script>
  <script src="dist/js/app-style-switcher.js"></script>
  <script src="dist/js/custom.min.js"></script>
  <script src="scripts/ScriptsEvaluaciones/scripts.js" charset="utf-8"></script>
  <script src="scripts/Evaluacion.js" charset="utf-8"></script>
</body>

</html>