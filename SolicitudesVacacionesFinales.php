<?php
$hoy = date('Y-m-d');
$FechaMenosMes = date("Y-m-d", strtotime($hoy . "- 2 month"));
?>
<!DOCTYPE html>
<html>

<head>
	<?php include("AutorizaPagina.php"); ?>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
	<title>La Esmeralda</title>

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
							<div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block"
								style="position: fixed; z-index:99;">
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
						<!-- Stat-cards de resumen para Nómina: se llenan dinámicamente desde SolicitudesVacacionesFinales.js -->
						<div class="row g-3 mb-4" id="statsNomina">
							<div class="col-12 col-md-4">
								<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
									<div class="card-body d-flex align-items-center gap-3 p-3">
										<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
											style="width:48px;height:48px;background:#f0fdf4;">
											<span class="material-symbols-outlined"
												style="color:#047857;font-size:24px;">pending_actions</span>
										</div>
										<div>
											<div class="text-muted"
												style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">
												Por
												Autorizar</div>
											<div id="statNominaPorAutorizar" class="fw-bold"
												style="font-size:22px;line-height:1.1;">—</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-4">
								<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
									<div class="card-body d-flex align-items-center gap-3 p-3">
										<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
											style="width:48px;height:48px;background:#ECFDF5;">
											<span class="material-symbols-outlined"
												style="color:#059669;font-size:24px;">task_alt</span>
										</div>
										<div>
											<div class="text-muted"
												style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">
												Aceptadas
												(periodo)</div>
											<div id="statNominaAceptadas" class="fw-bold"
												style="font-size:22px;line-height:1.1;">—</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-4">
								<div class="card h-100 border-0 shadow-sm" style="border-radius:14px;">
									<div class="card-body d-flex align-items-center gap-3 p-3">
										<div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
											style="width:48px;height:48px;background:#FEF2F2;">
											<span class="material-symbols-outlined"
												style="color:#DC2626;font-size:24px;">block</span>
										</div>
										<div>
											<div class="text-muted"
												style="font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;">
												Rechazadas
												(periodo)</div>
											<div id="statNominaRechazadas" class="fw-bold"
												style="font-size:22px;line-height:1.1;">—</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-12">
								<div class="page-description page-description-tabbed">
									<h1 class="text-center text-md-start">Solicitudes de Vacaciones</h1>
									<ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
										<li class="nav-item" role="presentation">
											<button class="nav-link active" id="account-tab" data-bs-toggle="tab"
												data-bs-target="#account" type="button" role="tab"
												aria-controls="hoaccountme" aria-selected="true">Solicitudes en
												revisión.</button>
										</li>
										<li class="nav-item" role="presentation">
											<button class="nav-link" id="integrations-tab" data-bs-toggle="tab"
												data-bs-target="#integrations" type="button" role="tab"
												aria-controls="integrations" aria-selected="false">Historial de
												solicitudes en Nómina.</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<div class="tab-content" id="myTabContent">
									<!-- Solicitudes en revisión -->
									<div class="tab-pane fade show active" id="account" role="tabpanel"
										aria-labelledby="account-tab">
										<div class="card">
											<div class="card-body">
												<div class="table-responsive">
													<div id="TableSolicitudes"></div>
												</div>
											</div>
										</div>
									</div>
									<!-- Historial de solicitudes en Nómina -->
									<div class="tab-pane fade" id="integrations" role="tabpanel"
										aria-labelledby="integrations-tab">
										<div class="card ">
											<div class="card-body">
												<div class="row mb-4">
													<div class="col-6">
														<div class="row">
															<div class="col-12" style="text-align:center">
																<h6>Fecha Inicial:</h6>
															</div>
															<div class="col-12">
																<input class="form-control form-control-solid-bordered "
																	type="date" id="FechaIni"
																	value="<?php echo $FechaMenosMes ?>"
																	onchange="getHistoricoSolicitudesNomina()">
															</div>
														</div>
													</div>
													<div class="col-6">
														<div class="row">
															<div class="col-12" style="text-align:center">
																<h6>Fecha Final:</h6>
															</div>
															<div class="col-12">
																<input class="form-control form-control-solid-bordered "
																	type="date" id="FechaFin"
																	value="<?php echo $hoy ?>"
																	onchange="getHistoricoSolicitudesNomina()">
															</div>
														</div>
													</div>
												</div>
												<div class="table-responsive">
													<div id="tableHistorico"></div>
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
	</div>
	<!-- neptune Javascripts -->
	<?php include("neptune_js.php"); ?>
	<!-- neptune Javascripts -->


	<script src="assets/libs/block-ui/jquery.blockUI.js"></script>

	<!-- Scripts específicos de esta página -->
	<script src="scripts/SolicitudesVacacionesFinales.js?v=<?= time() ?>"
		charset="utf-8"></script>
</body>

</html>
