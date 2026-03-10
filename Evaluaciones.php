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
}else {
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP by Lugo</title>
    <link rel="stylesheet" href="assets/cssEvaluaciones/styles.css">
    <link href="assets/libs/chartist/dist/chartist.min.css" rel="stylesheet">
    <link href="assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css" rel="stylesheet">
    <link href="dist/css/style.css" rel="stylesheet">
    <link href="dist/css/pages/data-table.css" rel="stylesheet">
    <link href="dist/css/pages/dashboard1.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator_semanticui.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script type="text/javascript" src="plugins/tabulator/dist/js/tabulator.min.js"></script>
    <title>Evaluaciones</title>
    <style media="screen">
      body {
        background: #CC0000;
      }
      .card {
        border-radius: 15px;
      }
    </style>
  </head>
  <body>
    <div class="main-wrapper" id="main-wrapper">
      <div class="page-wrapper">
        <div class="container-fluid" style="z-index:5">
          <div class="row">
            <div class="col s12 l8 offset-l2">
              <div class="card">
                <div class="card-content">
                  <div class="row">
                    <div class="col s12">
                      <div class="row">
                        <div class="col-2 offset-8 col-lg-2 offset-lg-8" style="position:absolute;">
                          <a href="index.php" style="width:100%" class="btnReturn"><i class="fa-solid fa-arrow-left"></i> Regresar</a>
                        </div>
                        <div class="col s12 l12" style="text-align:center;">
                            <img src="assets/images/logo-pip.png" style="max-width:15%" alt="LogoKlyns">
                        </div>
                      </div>
                    </div>
                    <div class="col s12">
                      <div id="contentEvaluaciones"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="assets/libs/jquery/dist/jquery.min.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" integrity="sha512-fD9DI5bZwQxOi7MhYWnnNPlvXdp/2Pj3XSTRrFs5FQa4mizyGLnJcN6tuvUS6LbmgN1ut+XGSABKvjN0H6Aoow==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="dist/js/materialize.min.js"></script>
    <script src="dist/js/app-style-switcher.js"></script>
    <script src="dist/js/custom.min.js"></script>
    <script src="scripts/ScriptsEvaluaciones/scripts.js" charset="utf-8"></script>
    <script src="scripts/Evaluaciones.js" charset="utf-8"></script>
  </body>
</html>
