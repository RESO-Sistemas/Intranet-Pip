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
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>
    <link rel="stylesheet" href="assets/libs/smart-wizard/dist/css/smart_wizard_all.min.css">
    <link rel="stylesheet" href="assets/cssEvaluaciones/styles.css">
    <link rel="stylesheet" href="assets/libs/bs-stepper/src/css/bs-stepper.css">
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
        background-color: #A70000;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23FF6B48'/%3E%3Cstop offset='1' stop-color='%23A70000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23d33624'/%3E%3Cstop offset='1' stop-color='%23A70000'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
      }
      .card {
        border-radius: 15px;
      }
      img {
        border-radius: 15px;
      }
      .courses-container {

      }
    .course {
    	background-color: #fff;
    	border-radius: 10px;
    	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    	display: flex;
    	max-width: 100%;
    	margin: 20px;
    	overflow: hidden;
    	width: 700px;
    }

    .course h6 {
    	opacity: 0.6;
    	margin: 0;
    	letter-spacing: 1px;
    	text-transform: uppercase;
    }

    .course h2 {
    	letter-spacing: 1px;
    	margin: 10px 0;
    }

    .course-preview {
    	background-color: #FF4545;
    	color: #fff !important;
    	padding: 30px;
    	max-width: 270px;
    }

    .course-info {
    	padding: 30px;
    	position: relative;
    	width: 100%;
    }

    /* SOCIAL PANEL CSS */
    .social-panel-container {
    	position: fixed;
    	right: 0;
    	bottom: 80px;
    	transform: translateX(100%);
    	transition: transform 0.4s ease-in-out;
    }

    .social-panel-container.visible {
    	transform: translateX(-10px);
    }

    .social-panel {
    	background-color: #fff;
    	border-radius: 16px;
    	box-shadow: 0 16px 31px -17px rgba(0,31,97,0.6);
    	border: 5px solid #001F61;
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    	align-items: center;
    	font-family: 'Muli';
    	position: relative;
    	height: 169px;
    	width: 370px;
    	max-width: calc(100% - 10px);
    }

    .social-panel button.close-btn {
    	border: 0;
    	color: #97A5CE;
    	cursor: pointer;
    	font-size: 20px;
    	position: absolute;
    	top: 5px;
    	right: 5px;
    }

    .social-panel button.close-btn:focus {
    	outline: none;
    }

    .social-panel p {
    	background-color: #001F61;
    	border-radius: 0 0 10px 10px;
    	color: #fff;
    	font-size: 14px;
    	line-height: 18px;
    	padding: 2px 17px 6px;
    	position: absolute;
    	top: 0;
    	left: 50%;
    	margin: 0;
    	transform: translateX(-50%);
    	text-align: center;
    	width: 235px;
    }

    .social-panel p i {
    	margin: 0 5px;
    }

    .social-panel p a {
    	color: #FF7500;
    	text-decoration: none;
    }

    .social-panel h4 {
    	margin: 20px 0;
    	color: #97A5CE;
    	font-family: 'Muli';
    	font-size: 14px;
    	line-height: 18px;
    	text-transform: uppercase;
    }

    .social-panel ul {
    	display: flex;
    	list-style-type: none;
    	padding: 0;
    	margin: 0;
    }

    .social-panel ul li {
    	margin: 0 10px;
    }

    .social-panel ul li a {
    	border: 1px solid #DCE1F2;
    	border-radius: 50%;
    	color: #001F61;
    	font-size: 20px;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	height: 50px;
    	width: 50px;
    	text-decoration: none;
    }

    .social-panel ul li a:hover {
    	border-color: #FF6A00;
    	box-shadow: 0 9px 12px -9px #FF6A00;
    }
    </style>
  </head>
  <body>
    <div class="main-wrapper" id="main-wrapper">
      <div class="page-wrapper">
          <div class="container-fluid" style="z-index:5">
            <div class="row">
              <div class="col s12 m3 offset-m9" style="position:absolute;">
                  <img src="assets/logoK.png" style="max-width:80%" alt="LogoKlyns">
              </div>
              <div class="courses-container">
              	<div class="course">
              		<div class="course-preview">
              			<h6 style="color:#FFF;">Evaluación</h6>
              			<h5 style="color:#FFF;" id="titulo_Ev"></h5>
              		</div>
              		<div class="course-info">
              			<h6 id="puesto_Ev">Chapter 4</h6>
              			<h4 id="empleado_Ev">Callbacks & Closures</h4>
                    <p><h5>Nivel durante la evaluación:</h5> <span id="lvl_Ev"></span></p>
              		</div>
              	</div>
              </div>
              <div class="col s12">
                <div class="card">
                  <div class="card-content">
                    <div class="row">
                      <div class="col-2 offset-8 col-lg-2 offset-lg-8">
                        <a href="pending-evaluations.php" style="width:15%" class="btnReturn"><i class="fa-solid fa-arrow-left"></i> Salir</a>
                      </div>
                      <hr>
                      <!-- <div class="col s12 l8 offset-l2">
                        <div class="row">
                          <div class="col s12">
                            <table id="table_general">
                              <thead>
                                <tr>
                                  <th width="200">EVALUACIÓN</th>
                                  <th width="300">EMPLEADO EVALUADO</th>
                                  <th width="300">PUESTO EVALUADO</th>
                                  <th width="300">NIVEL EVALUADO</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td id="titulo_Ev"></td>
                                  <td id="empleado_Ev"></td>
                                  <td id="puesto_Ev"></td>
                                  <td id="lvl_Ev"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div> -->
                      <div class="col s12">
                        <div id="contentComp"></div>
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
    <script src="scripts/Evaluacion-original.js" charset="utf-8"></script>
  </body>
</html>
