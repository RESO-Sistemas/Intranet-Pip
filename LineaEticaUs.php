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

	<link href="assets/libs/syncfusion/css/tailwind.css" rel="stylesheet">
	<link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
	<link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
	<script src="componentes/detallesEmpleadoLogeado.js"></script>

	<style>
		.wizard-container {
			min-height: calc(100vh - 200px);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20px;
		}

		.wizard-card {
			background: var(--bs-body-bg, #fff);
			border-radius: 24px;
			box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
			overflow: hidden;
			max-width: 620px;
			width: 100%;
			border: 1px solid rgba(0, 0, 0, 0.06);
		}

		.wizard-header {
			background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
			padding: 28px 32px;
			text-align: center;
			position: relative;
			overflow: hidden;
		}

		.wizard-header::before {
			content: '';
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			background: radial-gradient(circle, rgba(255, 204, 0, 0.15) 0%, transparent 50%);
			animation: wizard-glow 4s ease-in-out infinite;
		}

		@keyframes wizard-glow {
			0%, 100% { transform: scale(1); opacity: 0.4; }
			50% { transform: scale(1.1); opacity: 0.7; }
		}

		.wizard-header-icon {
			width: 52px;
			height: 52px;
			background: rgba(255, 204, 0, 0.2);
			border-radius: 16px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto 12px;
			position: relative;
			z-index: 1;
		}

		.wizard-header-icon i {
			font-size: 26px;
			color: #ffcc00;
		}

		.wizard-header h1 {
			color: #fff;
			font-size: 1.5rem;
			font-weight: 700;
			margin: 0 0 4px;
			position: relative;
			z-index: 1;
		}

		.wizard-header p {
			color: rgba(255, 255, 255, 0.6);
			font-size: 0.85rem;
			margin: 0;
			position: relative;
			z-index: 1;
		}

		.wizard-progress {
			padding: 20px 32px;
			background: rgba(0, 0, 0, 0.02);
			border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		}

		.wizard-progress-steps {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.wizard-step {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 6px;
		}

		.wizard-step-circle {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.8rem;
			font-weight: 700;
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			border: 2px solid transparent;
		}

		.wizard-step-circle.active {
			background: #ffcc00;
			color: #1a1a1a;
			border-color: #ffcc00;
			box-shadow: 0 4px 16px rgba(255, 204, 0, 0.4);
			transform: scale(1.1);
		}

		.wizard-step-circle.completed {
			background: #1a1a1a;
			color: #ffcc00;
			border-color: #1a1a1a;
		}

		.wizard-step-circle.inactive {
			background: rgba(0, 0, 0, 0.06);
			color: rgba(0, 0, 0, 0.25);
			border-color: rgba(0, 0, 0, 0.08);
		}

		.wizard-step-label {
			font-size: 0.68rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			transition: color 0.3s ease;
		}

		.wizard-step-label.active { color: #1a1a1a; }
		.wizard-step-label.inactive { color: rgba(0, 0, 0, 0.3); }

		.wizard-step-line {
			width: 60px;
			height: 3px;
			background: rgba(0, 0, 0, 0.08);
			margin: 0 8px;
			margin-bottom: 22px;
			border-radius: 2px;
			overflow: hidden;
			position: relative;
		}

		.wizard-step-line-fill {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			background: #ffcc00;
			border-radius: 2px;
			transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
			width: 0%;
		}

		.wizard-step-line-fill.active { width: 100%; }

		.wizard-body {
			padding: 28px 32px;
			position: relative;
			overflow: hidden;
		}

		.wizard-panel {
			display: none;
			animation: fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.wizard-panel.active { display: block; }

		@keyframes fadeSlideIn {
			from { opacity: 0; transform: translateX(20px); }
			to { opacity: 1; transform: translateX(0); }
		}

		.wizard-panel-title {
			display: flex;
			align-items: center;
			gap: 12px;
			margin-bottom: 24px;
		}

		.wizard-panel-icon {
			width: 44px;
			height: 44px;
			background: rgba(255, 204, 0, 0.1);
			border: 1px solid rgba(255, 204, 0, 0.25);
			border-radius: 14px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.wizard-panel-icon i {
			font-size: 22px;
			color: #ffcc00;
		}

		.wizard-panel-title h2 {
			font-size: 1.15rem;
			font-weight: 700;
			color: var(--bs-body-color, #1a1a1a);
			margin: 0;
		}

		.wizard-panel-title p {
			font-size: 0.82rem;
			color: rgba(0, 0, 0, 0.45);
			margin: 2px 0 0;
		}

		.wizard-alert {
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 14px 16px;
			background: rgba(255, 204, 0, 0.08);
			border: 1px solid rgba(255, 204, 0, 0.2);
			border-radius: 14px;
			margin-bottom: 24px;
		}

		.wizard-alert i {
			font-size: 20px;
			color: #ffcc00;
			flex-shrink: 0;
		}

		.wizard-alert span {
			font-size: 0.82rem;
			color: var(--bs-body-color, #555);
			line-height: 1.4;
		}

		.wizard-label {
			display: block;
			font-size: 0.78rem;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.5);
			margin-bottom: 8px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}

		.wizard-select {
			border-radius: 14px !important;
			border: 2px solid rgba(0, 0, 0, 0.08) !important;
			padding: 14px 16px !important;
			font-size: 0.9rem !important;
			transition: all 0.25s ease !important;
			background: var(--bs-body-bg, #fff) !important;
		}

		.wizard-select:focus {
			border-color: #ffcc00 !important;
			box-shadow: 0 0 0 4px rgba(255, 204, 0, 0.15) !important;
		}

		.wizard-textarea {
			border-radius: 14px !important;
			border: 2px solid rgba(0, 0, 0, 0.08) !important;
			padding: 16px !important;
			font-size: 0.9rem !important;
			resize: vertical;
			min-height: 160px;
			transition: all 0.25s ease !important;
			background: var(--bs-body-bg, #fff) !important;
		}

		.wizard-textarea:focus {
			border-color: #ffcc00 !important;
			box-shadow: 0 0 0 4px rgba(255, 204, 0, 0.15) !important;
			outline: none !important;
		}

		.wizard-textarea::placeholder { color: rgba(0, 0, 0, 0.25); }

		.wizard-char-counter {
			text-align: right;
			font-size: 0.72rem;
			color: rgba(0, 0, 0, 0.35);
			margin-top: 8px;
		}

		.wizard-buttons {
			display: flex;
			gap: 12px;
			margin-top: 28px;
		}

		.wizard-btn {
			flex: 1;
			padding: 14px 24px;
			border-radius: 14px;
			font-size: 0.9rem;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.25s ease;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			border: none;
		}

		.wizard-btn-back {
			background: rgba(0, 0, 0, 0.05);
			color: var(--bs-body-color, #555);
			border: 2px solid rgba(0, 0, 0, 0.08);
		}

		.wizard-btn-back:hover {
			background: rgba(0, 0, 0, 0.08);
			border-color: rgba(0, 0, 0, 0.15);
		}

		.wizard-btn-next {
			background: #1a1a1a;
			color: #ffcc00;
			position: relative;
			overflow: hidden;
		}

		.wizard-btn-next::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255, 204, 0, 0.2), transparent);
			transition: left 0.5s ease;
		}

		.wizard-btn-next:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(26, 26, 26, 0.3);
		}

		.wizard-btn-next:hover::before { left: 100%; }
		.wizard-btn-next:active { transform: translateY(0); }

		.wizard-btn-next:disabled {
			opacity: 0.4;
			cursor: not-allowed;
			transform: none;
		}

		.wizard-btn-next:disabled:hover {
			box-shadow: none;
		}

		.wizard-btn-next:disabled::before {
			display: none;
		}

		.wizard-btn-submit {
			background: #ffcc00;
			color: #1a1a1a;
			position: relative;
			overflow: hidden;
		}

		.wizard-btn-submit::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
			transition: left 0.5s ease;
		}

		.wizard-btn-submit:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(255, 204, 0, 0.4);
		}

		.wizard-btn-submit:hover::before { left: 100%; }

		.wizard-btn-submit:disabled {
			opacity: 0.4;
			cursor: not-allowed;
			transform: none;
		}

		.wizard-btn-submit:disabled:hover {
			box-shadow: none;
		}

		.wizard-footer {
			padding: 16px 32px;
			background: rgba(0, 0, 0, 0.02);
			border-top: 1px solid rgba(0, 0, 0, 0.06);
			text-align: center;
		}

		.wizard-footer-content {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			font-size: 0.75rem;
			color: rgba(0, 0, 0, 0.35);
		}

		.wizard-footer-content i {
			font-size: 14px;
			color: #ffcc00;
		}

		.wizard-success {
			display: none;
			text-align: center;
			padding: 40px 20px;
			animation: fadeSlideIn 0.5s ease;
		}

		.wizard-success.active { display: block; }

		.wizard-success-icon {
			width: 80px;
			height: 80px;
			background: rgba(255, 204, 0, 0.15);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto 20px;
		}

		.wizard-success-icon i {
			font-size: 40px;
			color: #ffcc00;
		}

		.wizard-success h2 {
			font-size: 1.4rem;
			font-weight: 700;
			color: var(--bs-body-color, #1a1a1a);
			margin-bottom: 8px;
		}

		.wizard-success p {
			font-size: 0.9rem;
			color: rgba(0, 0, 0, 0.5);
			margin-bottom: 24px;
		}

		@media (max-width: 768px) {
			.wizard-header { padding: 24px 20px; }
			.wizard-header h1 { font-size: 1.3rem; }
			.wizard-progress { padding: 16px 20px; }
			.wizard-step-line { width: 40px; }
			.wizard-step-label { font-size: 0.6rem; }
			.wizard-body { padding: 24px 20px; }
			.wizard-footer { padding: 14px 20px; }
			.wizard-btn { padding: 12px 18px; font-size: 0.85rem; }
		}

		[data-theme="dark"] .wizard-card {
			background: #1a1a1a;
			border-color: rgba(255, 255, 255, 0.06);
		}

		[data-theme="dark"] .wizard-progress {
			background: rgba(255, 255, 255, 0.02);
			border-color: rgba(255, 255, 255, 0.06);
		}

		[data-theme="dark"] .wizard-step-circle.inactive {
			background: rgba(255, 255, 255, 0.08);
			color: rgba(255, 255, 255, 0.25);
			border-color: rgba(255, 255, 255, 0.1);
		}

		[data-theme="dark"] .wizard-step-circle.completed {
			background: #ffcc00;
			color: #1a1a1a;
			border-color: #ffcc00;
		}

		[data-theme="dark"] .wizard-step-label.inactive { color: rgba(255, 255, 255, 0.3); }
		[data-theme="dark"] .wizard-step-label.active { color: #ffcc00; }

		[data-theme="dark"] .wizard-step-line { background: rgba(255, 255, 255, 0.08); }
		[data-theme="dark"] .wizard-step-line-fill { background: #ffcc00; }

		[data-theme="dark"] .wizard-select,
		[data-theme="dark"] .wizard-textarea {
			background: rgba(255, 255, 255, 0.04) !important;
			border-color: rgba(255, 255, 255, 0.08) !important;
		}

		[data-theme="dark"] .wizard-select:focus,
		[data-theme="dark"] .wizard-textarea:focus {
			border-color: #ffcc00 !important;
		}

		[data-theme="dark"] .wizard-alert {
			background: rgba(255, 204, 0, 0.06);
			border-color: rgba(255, 204, 0, 0.15);
		}

		[data-theme="dark"] .wizard-btn-back {
			background: rgba(255, 255, 255, 0.05);
			color: rgba(255, 255, 255, 0.7);
			border-color: rgba(255, 255, 255, 0.1);
		}

		[data-theme="dark"] .wizard-btn-next {
			background: #ffcc00;
			color: #1a1a1a;
		}

		[data-theme="dark"] .wizard-footer {
			background: rgba(255, 255, 255, 0.02);
			border-color: rgba(255, 255, 255, 0.06);
		}
	</style>

</head>

<body>
	<div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
		<div id="Menu">
			<?php include("menus.php"); ?>
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

						<div class="wizard-container">
							<div class="wizard-card">
								<!-- Header -->
								<div class="wizard-header">
									<div class="wizard-header-icon">
										<i class="material-icons">gavel</i>
									</div>
									<h1>Línea Ética</h1>
									<p>Reporta situaciones de forma anónima y segura</p>
								</div>

								<!-- Progress -->
								<div class="wizard-progress" id="wizardProgress">
									<div class="wizard-progress-steps">
										<div class="wizard-step">
											<div class="wizard-step-circle active" id="stepCircle1">1</div>
											<span class="wizard-step-label active" id="stepLabel1">Ubicación</span>
										</div>
										<div class="wizard-step-line">
											<div class="wizard-step-line-fill" id="line1"></div>
										</div>
										<div class="wizard-step">
											<div class="wizard-step-circle inactive" id="stepCircle2">2</div>
											<span class="wizard-step-label inactive" id="stepLabel2">Situación</span>
										</div>
										<div class="wizard-step-line">
											<div class="wizard-step-line-fill" id="line2"></div>
										</div>
										<div class="wizard-step">
											<div class="wizard-step-circle inactive" id="stepCircle3">3</div>
											<span class="wizard-step-label inactive" id="stepLabel3">Envío</span>
										</div>
									</div>
								</div>

								<!-- Body -->
								<div class="wizard-body">
									<form id="formLineaEtica" action="Backend/LineaEtica/App.php" method="post">

										<!-- STEP 1: Ubicación -->
										<div class="wizard-panel active" id="panel1">
											<div class="wizard-panel-title">
												<div class="wizard-panel-icon">
													<i class="material-icons">location_on</i>
												</div>
												<div>
													<h2>¿Dónde ocurrió?</h2>
													<p>Selecciona la ubicación del incidente</p>
												</div>
											</div>

											<div class="wizard-alert">
												<i class="material-icons">shield</i>
												<span>Tu identidad será protegida. Este canal es confidencial y seguro.</span>
											</div>

											<div class="mb-4">
												<label class="wizard-label">División</label>
												<select id="division" name="division"
													class="form-control form-select wizard-select" required>
													<option value="" selected disabled>Selecciona una división</option>
												</select>
											</div>

											<div class="mb-3">
												<label class="wizard-label">Sucursal</label>
												<select id="sl_branch" name="sucursal"
													class="form-control form-select wizard-select" required disabled>
													<option value="" selected disabled>Selecciona una sucursal</option>
												</select>
											</div>

											<div class="wizard-buttons">
												<button type="button" class="wizard-btn wizard-btn-next" id="btnNext1" disabled>
													Siguiente
													<i class="material-icons">arrow_forward</i>
												</button>
											</div>
										</div>

										<!-- STEP 2: Situación -->
										<div class="wizard-panel" id="panel2">
											<div class="wizard-panel-title">
												<div class="wizard-panel-icon">
													<i class="material-icons">report_problem</i>
												</div>
												<div>
													<h2>¿Qué sucedió?</h2>
													<p>Selecciona el tipo de situación</p>
												</div>
											</div>

											<div class="mb-4">
												<label class="wizard-label">Tipo de incidencia</label>
												<select id="slctLineaEtica" name="slctLineaEtica"
													class="form-control form-select wizard-select" required>
													<option value="" selected disabled>Selecciona una opción</option>
												</select>
											</div>

											<div class="wizard-buttons">
												<button type="button" class="wizard-btn wizard-btn-back" id="btnBack2">
													<i class="material-icons">arrow_back</i>
													Atrás
												</button>
												<button type="button" class="wizard-btn wizard-btn-next" id="btnNext2" disabled>
													Siguiente
													<i class="material-icons">arrow_forward</i>
												</button>
											</div>
										</div>

										<!-- STEP 3: Descripción -->
										<div class="wizard-panel" id="panel3">
											<div class="wizard-panel-title">
												<div class="wizard-panel-icon">
													<i class="material-icons">edit_note</i>
												</div>
												<div>
													<h2>Describe los hechos</h2>
													<p>Proporciona los detalles relevantes</p>
												</div>
											</div>

											<div class="mb-3">
												<label class="wizard-label">Descripción de la situación</label>
												<textarea id="contenidoLineaEtica" name="contenidoLineaEtica"
													class="form-control wizard-textarea"
													placeholder="Describe detalladamente la situación que deseas reportar..."
													maxlength="2000"
													required></textarea>
												<div class="wizard-char-counter">
													<span id="charCount">0</span> / 2000 caracteres
												</div>
											</div>

											<div class="wizard-buttons">
												<button type="button" class="wizard-btn wizard-btn-back" id="btnBack3">
													<i class="material-icons">arrow_back</i>
													Atrás
												</button>
												<button type="button" class="wizard-btn wizard-btn-submit" id="EnviarLineaE" disabled>
													<i class="material-icons">send</i>
													Enviar Reporte
												</button>
											</div>
										</div>

									</form>

									<!-- Success panel -->
									<div class="wizard-success" id="panelSuccess">
										<div class="wizard-success-icon">
											<i class="material-icons">check_circle</i>
										</div>
										<h2>Reporte Enviado</h2>
										<p>Tu reporte ha sido enviado de forma anónima. Gracias por contribuir a un mejor ambiente laboral.</p>
									</div>
								</div>

								<!-- Footer -->
								<div class="wizard-footer">
									<div class="wizard-footer-content">
										<i class="material-icons">lock</i>
										<span>Toda la información es tratada de forma confidencial y anónima</span>
									</div>
								</div>
							</div>
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
	<script src="scripts/LineaEticaUs.js?v=<?php echo time(); ?>"
		charset="utf-8"></script>

</body>

</html>
