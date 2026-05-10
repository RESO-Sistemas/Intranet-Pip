<?php
include("AutorizaPagina.php");

require_once("Backend/Empleados/Empleados.php");

$ins = new Empleados();

$ins->visitIndexEmployee();

require_once("Backend/Configuracion/Configuracion.php");

$Conf = new Configuracion();

$MenuP = $Conf->getMenusPadre();

?>

<!DOCTYPE html>

<html>



<head>



	<meta charset="utf-8">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

	<title>PIP by Lugo</title>

	<?php include("neptune_styles.php"); ?>



	<link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.css" />

	<!-- <link rel="stylesheet" type="text/css" href="plugins/evo-calendar/css/evo-calendar.orange-coral.css" /> -->

	<!-- <script src="componentes/PerfilEmpleadoLateral.js" charset="utf-8"></script> -->

	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="plugins/emoji-picker/css/emoji.css">

	<script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>

	<link rel="stylesheet" href="plugins/tingle-master/dist/tingle.min.css">

	<link rel="stylesheet" href="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.css">

	<link rel="stylesheet" href="/plugins/unitegallery-master/dist/css/unite-gallery.css">

	<link rel="stylesheet" href="/plugins/unitegallery-master/package/unitegallery/themes/default/ug-theme-default.css">

	<link rel="stylesheet" href="/plugins/unitegallery-master/source/unitegallery/skins/alexis/alexis.css">



	<style>
		/* === DASHBOARD SAAS MINIMAL LIGHT — Mi Perfil === */
		.profile-bg {
			background-color: #F8F9FC !important;
			min-height: 100vh;
		}

		.profile-card {
			background: #ffffff;
			border: none;
			border-radius: 16px;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
			transition: transform 0.2s ease, box-shadow 0.2s ease;
		}

		.profile-card:hover {
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
		}

		.profile-loading-shell {
			position: relative;
			min-height: 520px;
		}

		.profile-loading-overlay {
			position: absolute;
			inset: 0;
			z-index: 20;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(248, 249, 252, 0.72);
			backdrop-filter: blur(2px);
			border-radius: 18px;
		}

		.profile-loading-overlay.is-hidden {
			display: none;
		}

		.profile-loading-card {
			padding: 0;
			text-align: center;
			min-width: 220px;
		}

		.profile-loading-card .spinner-border {
			width: 2.5rem;
			height: 2.5rem;
			color: #f59e0b;
		}

		.profile-loading-text {
			margin-top: 12px;
			font-size: 0.92rem;
			font-weight: 700;
			color: #92400e;
		}

		.stat-card {
			background: #ffffff;
			border: none;
			border-radius: 12px;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		}

		.stat-icon {
			font-size: 1.1rem;
			margin-bottom: 6px;
			color: #c99b00;
		}

		.stat-label {
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 1px;
			color: #b2bec3;
			font-weight: 700;
		}

		.stat-value {
			font-size: 0.95rem;
			font-weight: 700;
			color: #2d3436;
			margin-top: 2px;
		}

		.section-title {
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 1.2px;
			color: #636e72;
			font-weight: 700;
			margin-bottom: 1.2rem;
		}

		.info-label {
			font-size: 0.78rem;
			color: #b2bec3;
			margin-bottom: 4px;
			display: block;
			font-weight: 600;
		}

		.info-input {
			border: none;
			background: #F8F9FC;
			border-radius: 10px;
			padding: 10px 14px;
			width: 100%;
			font-weight: 600;
			color: #2d3436;
			font-size: 0.9rem;
			transition: background 0.2s;
		}

		.info-input:disabled {
			background: transparent;
			padding: 0;
			opacity: 1;
			color: #2d3436;
			cursor: default;
		}

		.info-input:focus {
			outline: none;
			background: #eef0f5;
		}

		.info-input-empty {
			background: #fff8dd !important;
			border: 1px dashed #f0cf64 !important;
			border-radius: 999px !important;
			color: #9a7700 !important;
			font-size: 0.8rem !important;
			font-style: italic;
			font-weight: 700;
			padding: 6px 12px !important;
			display: inline-block;
			width: auto;
		}

		.stat-badge-empty,
		.signature-empty-badge {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 6px 12px;
			border-radius: 999px;
			background: #fff8dd;
			border: 1px dashed #f0cf64;
			color: #9a7700;
			font-size: 0.78rem;
			font-weight: 700;
		}

		.avatar-wrapper {
			position: relative;
			display: inline-block;
		}

		.avatar-img {
			width: 140px;
			height: 140px;
			object-fit: contain;
			border-radius: 50%;
			background: #ffffff;
			padding: 18px;
		}

		.avatar-ring {
			position: absolute;
			top: -4px;
			left: -4px;
			right: -4px;
			bottom: -4px;
			border: 3px solid #FFD700;
			border-radius: 50%;
			pointer-events: none;
		}

		.avatar-camera {
			position: absolute;
			bottom: 6px;
			right: 6px;
			background: #FFD700;
			color: #2d3436;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.85rem;
			cursor: pointer;
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
			transition: transform 0.2s;
		}

		.avatar-camera:hover {
			transform: scale(1.1);
		}

		.signature-box {
			background: #F8F9FC;
			border-radius: 12px;
			padding: 20px;
			min-height: 120px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px dashed #dfe6e9;
		}

		.signature-box img {
			max-width: 100%;
			max-height: 100px;
			object-fit: contain;
		}

		.signature-box img:empty {
			display: none;
		}

		.signature-box.is-empty {
			flex-direction: column;
			gap: 8px;
		}

		.btn-warning-pip {
			background: #FFD700;
			color: #2d3436;
			border: none;
			font-weight: 700;
			letter-spacing: 0.5px;
			border-radius: 10px;
			padding: 10px 20px;
			transition: all 0.2s;
		}

		.btn-warning-pip:hover {
			background: #e6c200;
			transform: translateY(-1px);
			box-shadow: 0 4px 12px rgba(255, 215, 0, 0.35);
		}

		.btn-outline-warning-pip {
			background: transparent;
			color: #bfa200;
			border: 2px solid #FFD700;
			font-weight: 700;
			border-radius: 10px;
			padding: 10px 20px;
			transition: all 0.2s;
		}

		.btn-outline-warning-pip:hover {
			background: #FFD700;
			color: #2d3436;
		}

		.page-header-pip {
			font-size: 1.6rem;
			font-weight: 800;
			color: #2d3436;
			letter-spacing: -0.5px;
		}

		.nav-tabs-pip .nav-link {
			border: none;
			color: #b2bec3;
			font-weight: 700;
			font-size: 0.85rem;
			padding: 8px 20px;
			border-radius: 10px;
			margin-right: 6px;
		}

		.nav-tabs-pip .nav-link.active {
			background: #ffffff;
			color: #2d3436;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		}

		.nav-tabs-pip .nav-link:hover {
			color: #636e72;
		}
	</style>
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

			<div class="app-content profile-bg">

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

						<!-- HEADER & TABS -->
						<div class="row mb-4">
							<div class="col-12">
								<div
									class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
									<h1 class="page-header-pip m-0">Mi Perfil</h1>
									<ul class="nav nav-tabs-pip" id="myTab" role="tablist">
										<li class="nav-item" role="presentation">
											<button class="nav-link active" id="account-tab" data-bs-toggle="tab"
												data-bs-target="#account" type="button" role="tab"
												aria-controls="account" aria-selected="true">Cuenta</button>
										</li>
										<li class="nav-item" role="presentation">
											<button class="nav-link" id="integrations-tab" data-bs-toggle="tab"
												data-bs-target="#integrations" type="button" role="tab"
												aria-controls="integrations"
												aria-selected="false">Colaboradores</button>
										</li>
									</ul>
								</div>
							</div>
						</div>

					<!-- INFORMACION PERSONAL / COLABORADORES -->
					<div class="profile-loading-shell">
						<div id="profileLoadingOverlay" class="profile-loading-overlay">
							<div class="profile-loading-card">
								<div class="spinner-border" role="status">
									<span class="visually-hidden">Cargando...</span>
								</div>
								<div class="profile-loading-text">Cargando perfil...</div>
							</div>
						</div>
					<div class="tab-content" id="myTabContent">

							<!-- TAB CUENTA -->
							<div class="tab-pane fade show active" id="account" role="tabpanel"
								aria-labelledby="account-tab">

								<!-- STATS ROW -->
								<div class="row g-3 mb-4">
									<div class="col-6 col-md-4 col-lg">
										<div class="card stat-card">
											<div class="card-body text-center py-3">
							<div class="stat-icon"><i class="fas fa-cake-candles"></i></div>
												<div class="stat-label">Nacimiento</div>
												<div class="stat-value" id="statFecNac">—</div>
											</div>
										</div>
									</div>
									<div class="col-6 col-md-4 col-lg">
										<div class="card stat-card">
											<div class="card-body text-center py-3">
							<div class="stat-icon"><i class="fas fa-id-badge"></i></div>
												<div class="stat-label">No. Empleado</div>
												<div class="stat-value" id="statNoEmp">—</div>
											</div>
										</div>
									</div>
									<div class="col-6 col-md-4 col-lg">
										<div class="card stat-card">
											<div class="card-body text-center py-3">
							<div class="stat-icon"><i class="fas fa-briefcase"></i></div>
												<div class="stat-label">Puesto</div>
												<div class="stat-value" id="statPuesto">—</div>
											</div>
										</div>
									</div>
									<div class="col-6 col-md-4 col-lg">
										<div class="card stat-card">
											<div class="card-body text-center py-3">
							<div class="stat-icon"><i class="fas fa-building"></i></div>
												<div class="stat-label">Sucursal</div>
												<div class="stat-value" id="statSucursal">—</div>
											</div>
										</div>
									</div>
									<div class="col-6 col-md-4 col-lg">
										<div class="card stat-card">
											<div class="card-body text-center py-3">
							<div class="stat-icon"><i class="fas fa-chart-line"></i></div>
												<div class="stat-label">Antigüedad</div>
												<div class="stat-value" id="statAntiguedad">—</div>
											</div>
										</div>
									</div>
								</div>

								<!-- MAIN GRID -->
								<div class="row g-4">

									<!-- LEFT: Identity + Personal Data -->
									<div class="col-lg-7">
										<div class="card profile-card h-100">
											<div class="card-body p-4 p-lg-5">

												<!-- Avatar -->
												<div class="text-center mb-4">
													<div class="avatar-wrapper mb-3">
									<img class="avatar-img" id="ImgEmpleadoPerfil"
										src="assets/images/logo-pip.png" alt="Imagen empleado">
														<div class="avatar-ring"></div>
														<div class="avatar-camera" id="btnFotoEmp"><i
																class="fas fa-camera"></i></div>
													</div>
													<form id="FrmFotoEmp" action="Backend/Empleados/App.php"
														method="post">
														<input type="text" name="op" value="updateFotoEmpleado"
															style="display:none;">
														<input type="file" accept="image/*" name="fotoEmp" id="fotoEmp"
															value="" style="display:none;"
															onchange="updateFotoEmpleado()">
													</form>
													<h4 class="fw-bold mb-1" style="color:#2d3436;" id="displayName">—
													</h4>
													<p class="text-muted mb-0" id="displayPosition">—</p>
												</div>

												<!-- Personal Info -->
												<div class="mb-4">
													<h6 class="section-title">Información Personal</h6>
													<div class="row g-3">
														<div class="col-md-6">
															<label class="info-label">Nombre</label>
															<input class="info-input" id="PerfilNombre" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">No. Empleado</label>
															<input class="info-input" id="PerfilNoEmp" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">RFC</label>
															<input class="info-input" id="PerfilRFC" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">CURP</label>
															<input class="info-input" id="PerfilCURP" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">No. Seguro Social</label>
															<input class="info-input" id="PerfilNOSEGURO" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">Fecha de Nacimiento</label>
															<input class="info-input" id="PerfilFecNac" type="text"
																value="" disabled>
														</div>
													</div>
												</div>

												<!-- Work Info -->
												<div>
													<h6 class="section-title">Información Laboral</h6>
													<div class="row g-3">
														<div class="col-md-6">
															<label class="info-label">Puesto</label>
															<input class="info-input" id="PerfilPuesto" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">Sucursal</label>
															<input class="info-input" id="PerfilSucursal" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">Centro de Costo</label>
															<input class="info-input" id="PerfilCCosto" type="text"
																value="" disabled>
														</div>
														<div class="col-md-6">
															<label class="info-label">División</label>
										<select id="slctDivision" class="form-select" disabled
											style="border:none; background:#F8F9FC; border-radius:10px; padding:10px 14px; font-weight:600; color:#2d3436; font-size:0.9rem;">
											<option value="">No disponible</option>
										</select>
														</div>
														<div class="col-md-6">
															<label class="info-label">Antigüedad</label>
															<input class="info-input" id="PerfilAntiguedad" type="text"
																value="" disabled>
														</div>
													</div>
												</div>

											</div>
										</div>
									</div>

									<!-- RIGHT: Editable + Signature -->
									<div class="col-lg-5">

										<!-- Contact Card -->
										<div class="card profile-card mb-4">
											<div class="card-body p-4 p-lg-5">
												<h6 class="section-title">Contacto & Seguridad</h6>

												<div class="mb-3">
													<label class="info-label">Correo Electrónico</label>
													<input class="form-control" id="Perfilemail" type="email" value=""
														style="border-radius:10px; padding:10px 14px; font-size:0.9rem; border:1px solid #dfe6e9;">
												</div>

												<div class="mb-3">
													<label class="info-label">Teléfono Móvil</label>
													<input class="form-control" id="Perfilnumber" type="text" value=""
														onkeypress="return onlynumber(event)" maxlength="10"
														style="border-radius:10px; padding:10px 14px; font-size:0.9rem; border:1px solid #dfe6e9;">
												</div>

												<div class="mb-4">
													<label class="info-label">Contraseña</label>
													<input class="form-control" id="Perfilpassword" type="password"
														value=""
														style="border-radius:10px; padding:10px 14px; font-size:0.9rem; border:1px solid #dfe6e9;">
												</div>

												<button class="btn btn-warning-pip w-100" type="button"
													id="UpdateDatosEmp" onclick="updateDatosEmpleado()">
													<i class="fas fa-save me-2"></i>Actualizar Datos
												</button>

											</div>
										</div>

										<!-- Signature Card -->
										<div class="card profile-card">
											<div class="card-body p-4 p-lg-5 text-center">
												<h6 class="section-title">Firma Digital</h6>
												<div class="signature-box mb-3">
											<img id="imgFirma" src="" alt="Firma del empleado">
											<span id="imgFirmaEmpty" class="signature-empty-badge" style="display:none;">No disponible</span>
										</div>
												<a href="AddFirma.php" class="btn btn-outline-warning-pip w-100">
													<i class="fas fa-pen me-2"></i>Actualizar Firma
												</a>
											</div>
										</div>

									</div>
								</div>
							</div>

							<!-- TAB COLABORADORES -->
							<div class="tab-pane fade" id="integrations" role="tabpanel"
								aria-labelledby="integrations-tab">
								<div class="card profile-card">
									<div class="card-body todo-list p-4" style="min-height: 700px;">
										<div id="colabora" class="overflow-y-auto">
											<div class="row g-4">
												<div class="col-12" id="divColaboradoreslvl">
													<h5 class="section-title" id="titulolvl1"></h5>
												</div>
												<div class="col-12" id="divColaboradoreslv2">
													<h5 class="section-title" id="titulolvl2"></h5>
												</div>
												<div class="col-12" id="divColaboradoreslv3">
													<h5 class="section-title" id="titulolvl3"></h5>
												</div>
												<div class="col-12" id="divColaboradoreslv4">
													<h5 class="section-title" id="titulolvl4"></h5>
												</div>
												<div class="col-12" id="divColaboradoreslv5">
													<h5 class="section-title" id="titulolvl5"></h5>
												</div>
												<div class="col-12" id="divColaboradoreslv6">
													<h5 class="section-title" id="titulolvl6"></h5>
												</div>
												<div class="col-12" id="divColaboradoreslv7">
													<h5 class="section-title" id="titulolvl7"></h5>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>

						<div id="fullscreen-swiper"></div>

						<div id="fullscreen-swiper-backdrop"></div>

						<!-- ULTIMAS NOVENDADES -->

						<!-- ULTIMAS NOVEDADES -->

					</div>
					</div>

				</div>

			</div>

		</div>

	</div>



	<?php include("neptune_js.php"); ?>






	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
		integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
		integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>

	<script src="plugins/evo-calendar/js/evo-calendar.js"></script>

	<script src="plugins/tingle-master/dist/tingle.min.js" charset="utf-8"></script>


	<script src="/plugins/custom-drag-drop-file-upload/fileUpload/fileUpload.js" charset="utf-8"></script>

	<script src="/plugins/unitegallery-master/dist/js/unitegallery.min.js" charset="utf-8"></script>

	<script src="/plugins/unitegallery-master/package/unitegallery/themes/slider/ug-theme-slider.js" charset="utf-8">
	</script>

	<script src="scripts/MiPerfil.js?v=<?php echo time(); ?>"></script>

</body>



</html>
