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
							<div class="page-description page-description-tabbed d-flex justify-content-between align-items-center flex-wrap gap-2">
								<h1>Solicitudes de Vacaciones</h1>
								<button type="button" class="btn btn-outline-warning btn-sm d-inline-flex align-items-center gap-1"
									data-bs-toggle="modal" data-bs-target="#modalActualizarFirma">
									<span class="material-symbols-outlined" style="font-size:16px;">draw</span>
									Actualizar firma
								</button>
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

	<!-- Modal: Actualizar firma -->
	<div class="modal fade" id="modalActualizarFirma" data-bs-backdrop="static"
		data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						<span class="material-symbols-outlined align-middle me-1" style="font-size:18px;">draw</span>
						Traza tu firma aquí
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<div class="row mx-1">
						<div id="contentCanvasVac" class="col form-control form-control-solid-bordered"
							style="text-align:center; height:200px; width:100%; padding:0; overflow:hidden;">
							<canvas id="draw-canvas-vac">No tienes un buen navegador.</canvas>
						</div>
						<input type="color" id="colorVac" value="#1a1a1a" style="display:none;">
						<input type="range" id="punteroVac" min="1" value="2" max="5" style="display:none;">
					</div>
					<p class="text-muted mt-2 mb-0" style="font-size:12px;">
						Dibuja tu firma con el mouse o el dedo en pantallas táctiles.
					</p>
				</div>
				<div class="modal-footer d-flex justify-content-between">
					<button type="button" class="btn btn-outline-danger d-inline-flex align-items-center gap-1" id="draw-clearBtnVac">
						<span class="material-symbols-outlined" style="font-size:16px;">restart_alt</span>
						Repetir trazo
					</button>
					<button type="button" id="draw-submitBtnVac" class="btn btn-success d-inline-flex align-items-center gap-1">
						<span class="material-symbols-outlined" style="font-size:16px;">save</span>
						Guardar Firma
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- neptune Javascripts -->
	<?php include("neptune_js.php"); ?>
	<!-- neptune Javascripts -->


	<script src="assets/libs/block-ui/jquery.blockUI.js"></script>

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

		// ── Lógica del canvas de firma en SolicitudVacaciones ──
		(function() {
			window.requestAnimFrame = (function() {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame || function(cb) { window.setTimeout(cb, 1000 / 60); };
			})();

			let canvasListenersAttached = false;
			let drawing = false;
			let mousePos = { x: 0, y: 0 };
			let lastPos  = { x: 0, y: 0 };

			$('#modalActualizarFirma').on('shown.bs.modal', function() {
				const canvas = document.getElementById("draw-canvas-vac");
				const contentCanvas = document.getElementById("contentCanvasVac");
				canvas.width  = contentCanvas.offsetWidth;
				canvas.height = contentCanvas.offsetHeight;

				if (!canvasListenersAttached) {
					const ctx = canvas.getContext("2d");
					const clearBtn = document.getElementById("draw-clearBtnVac");
					const submitBtn = document.getElementById("draw-submitBtnVac");

					clearBtn.addEventListener("click", function() {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
					});

					submitBtn.addEventListener("click", function() {
						SubirFirmaVac(canvas.toDataURL());
					});

					function getMousePos(canvasDom, e) {
						const rect = canvasDom.getBoundingClientRect();
						return { x: e.clientX - rect.left, y: e.clientY - rect.top };
					}
					function getTouchPos(canvasDom, e) {
						const rect = canvasDom.getBoundingClientRect();
						return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
					}

					canvas.addEventListener("mousedown", function(e) { drawing = true;  lastPos = getMousePos(canvas, e); });
					canvas.addEventListener("mouseup",    function()  { drawing = false; });
					canvas.addEventListener("mousemove",  function(e) { mousePos = getMousePos(canvas, e); });
					canvas.addEventListener("touchstart", function(e) {
						e.preventDefault();
						mousePos = getTouchPos(canvas, e);
						const me = new MouseEvent("mousedown", { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
						canvas.dispatchEvent(me);
					}, { passive: false });
					canvas.addEventListener("touchend",   function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent("mouseup")); }, { passive: false });
					canvas.addEventListener("touchleave", function(e) { e.preventDefault(); canvas.dispatchEvent(new MouseEvent("mouseup")); }, { passive: false });
					canvas.addEventListener("touchmove",  function(e) {
						e.preventDefault();
						const me = new MouseEvent("mousemove", { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
						canvas.dispatchEvent(me);
					}, { passive: false });

					function renderCanvas() {
						if (drawing) {
							const tint  = document.getElementById("colorVac");
							const punta = document.getElementById("punteroVac");
							ctx.strokeStyle = tint.value;
							ctx.beginPath();
							ctx.moveTo(lastPos.x, lastPos.y);
							ctx.lineTo(mousePos.x, mousePos.y);
							ctx.lineWidth = punta.value;
							ctx.lineCap  = "round";
							ctx.stroke();
							ctx.closePath();
							lastPos = mousePos;
						}
					}
					(function drawLoop() { requestAnimFrame(drawLoop); renderCanvas(); })();
					canvasListenersAttached = true;
				}
			});

			function SubirFirmaVac(imagen64) {
				$.ajax({
					type: "POST",
					url: "Backend/Empleados/App.php",
					data: "op=SubirFirma&imagen64=" + imagen64,
					success: function() {
						$('#modalActualizarFirma').modal('hide');
						Swal.fire({ icon: 'success', title: 'Firma actualizada', showConfirmButton: false, timer: 1500 });
					},
					error: function(e) { alert(e.responseText); }
				});
			}
		})();
	</script>


</body>

</html>