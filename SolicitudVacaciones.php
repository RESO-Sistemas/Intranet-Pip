<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
	<title>PIP by Lugo</title>
	<!-- Styles neptune -->

	<?php include("neptune_styles.php"); ?>




	<!-- Styles neptune -->


	<!-- <link href="dist/css/style.css" rel="stylesheet"> -->
	<link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
	<link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
	<!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
	<link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->
	<script src="componentes/detallesEmpleadoLogeado.js"></script>

</head>

<body>
	<div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
		<!-- ============================================================== -->
		<!-- Preloader - style you can find in spinners.css -->
		<!-- ============================================================== -->
		<!-- <div class="preloader">
      <div class="loader">
        <div class="loader__figure"></div>
        <p class="loader__label">PIP</p>
      </div>
    </div> -->
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
						<div class="col-10 offset-1 col-lg-5 offset-lg-7" style="position: fixed; z-index:99;">
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
					<!-- Stat-cards de resumen: se llenan dinámicamente desde SolicitudVacaciones.js -->
					<div class="row g-3 mb-4" id="statsVacaciones">
						<div class="col-6 col-md-3">
							<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
								<div class="card-body d-flex align-items-center gap-3 p-3">
									<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
										style="width:48px;height:48px;background:#EFF6FF;">
										<span class="material-symbols-outlined" style="color:#2563EB;font-size:24px;">beach_access</span>
									</div>
									<div>
										<div class="text-muted" style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">Total</div>
										<div id="statTotal" class="fw-bold" style="font-size:22px;line-height:1.1;">—</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-3">
							<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
								<div class="card-body d-flex align-items-center gap-3 p-3">
									<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
										style="width:48px;height:48px;background:#FFFBEB;">
										<span class="material-symbols-outlined" style="color:#D97706;font-size:24px;">schedule</span>
									</div>
									<div>
										<div class="text-muted" style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">Pendientes</div>
										<div id="statPendientes" class="fw-bold" style="font-size:22px;line-height:1.1;">—</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-3">
							<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
								<div class="card-body d-flex align-items-center gap-3 p-3">
									<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
										style="width:48px;height:48px;background:#ECFDF5;">
										<span class="material-symbols-outlined" style="color:#059669;font-size:24px;">check_circle</span>
									</div>
									<div>
										<div class="text-muted" style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">Aceptadas</div>
										<div id="statAceptadas" class="fw-bold" style="font-size:22px;line-height:1.1;">—</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-3">
							<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
								<div class="card-body d-flex align-items-center gap-3 p-3">
									<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
										style="width:48px;height:48px;background:#FEF2F2;">
										<span class="material-symbols-outlined" style="color:#DC2626;font-size:24px;">cancel</span>
									</div>
									<div>
										<div class="text-muted" style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">Denegadas</div>
										<div id="statDenegadas" class="fw-bold" style="font-size:22px;line-height:1.1;">—</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col">
							<div class="page-description page-description-tabbed">
								<h1>Solicitudes de Vacaciones</h1>
									<ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
										<li class="nav-item" role="presentation">
											<button class="nav-link active" id="tab1-tab" data-bs-toggle="tab"
												data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1"
												aria-selected="true">Mis Solicitudes</button>
										</li>
										<li class="nav-item" role="presentation">
											<button class="nav-link" id="tab2-tab" data-bs-toggle="tab"
												data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2"
												aria-selected="false">Autorización de vacaciones</button>
										</li>
										<li class="nav-item" role="presentation">
											<button class="nav-link" id="tab3-tab" data-bs-toggle="tab"
												data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3"
												aria-selected="false">Solicitudes que denegué</button>
										</li>
										<li class="nav-item" role="presentation">
											<button class="nav-link" id="tab4-tab" data-bs-toggle="tab"
												data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4"
												aria-selected="false">Solicitudes que autoricé</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<!-- MIS SOLICITUDES -->
						<div class="row">
							<div class="col">
								<div class="tab-content" id="myTabContent">
									<div class="tab-pane fade show active" id="tab1" role="tabpanel"
										aria-labelledby="tab1-tab">
										<div class="card">
											<div class="card-body">
												<div class="col d-flex justify-content-end mb-4">
													<a href="SolicitudNueva.php" class="btn btn-primary">Nueva
														Solicitud</a>
												</div>
												<div id="ContenidoMisSolicitudes"></div>
											</div>
										</div>
									</div>
									<div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
										<div class="card">
											<div class="card-body">
												<div id="ContenidoSolicitudesPend"></div>
											</div>
										</div>
									</div>

									<div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
										<div class="card">
											<div class="card-body">
												<div class="table-responsive">
													<div id="tableSolicitudesCanceladas"></div>
												</div>
											</div>
										</div>
									</div>

									<div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
										<div class="card">
											<div class="card-body">
												<div id="ContenidoSolicitudesNomina"></div>
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
	<?php include("neptune_js.php"); ?>
	<!-- neptune Javascripts -->


	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
		integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
		integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>

	<!-- Scripts específicos de esta página -->
	<script src="scripts/SolicitudVacaciones.js?v=<?= time() ?>"
		charset="utf-8"></script>
	<script src="scripts/detallesEmpleadoLogeado.js?v=<?= time() ?>"></script>
	<script type="text/javascript">
		function onlynumber(e) {
			tecla = (document.all) ? e.keyCode : e.which;
			if (tecla == 8) {
				return true;
			}
			patron = /[-0-9]/;
			tecla_final = String.fromCharCode(tecla);
			return patron.test(tecla_final);
		}
	</script>


</body>

</html>