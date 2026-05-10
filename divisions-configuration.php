<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>

<html>



<head>



	<meta charset="utf-8">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

	<title>PIP by Lugo</title>

	<?php include("neptune_styles.php"); ?>
</head>

<body>

	<div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">


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

									<h1>Configuración de divisiones</h1>

								</div>

							</div>

						</div>

						<div class="row">

							<div class="card">

								<div class="card-body">

									<div class="row" id="contenidoDiasDescanso">
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
	<?php include("neptune_js.php"); ?>
	<!-- neptune Javascripts -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
		integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
		integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>



	<!-- Scripts específicos de esta página -->

	<script src="scripts/global.js?v=<?php echo time(); ?>" charset="utf-8">
	</script>

	<script src="scripts/divisions-configuration.js?v=<?php echo time(); ?>"
		charset="utf-8"></script>



</body>



</html>