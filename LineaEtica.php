<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
	<title>La Esmeralda</title>
	<!-- Styles neptune -->

	<?php include("neptune_styles.php"); ?>
	<style>
		.creator-name-blur {
			filter: blur(5px);
			user-select: none;
			transition: filter 0.3s ease;
		}

		.btn-apple-info {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: #f2f2f7;
			color: #007aff;
			border: 1px solid #007aff;
			cursor: pointer;
			transition: background-color 0.2s, color 0.2s, transform 0.1s;
			padding: 0;
			flex-shrink: 0;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		}



		.btn-apple-info .info-letter {
			font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
			font-size: 13px;
			line-height: 1;
			margin-left: -1px;
		}
	</style>
	<!-- <link href="./neptune/plugins/select2/css/select2.min.css" rel="stylesheet"> -->

	<!-- Styles neptune -->
	<!-- <link href="dist/css/style.css" rel="stylesheet"> -->
	<!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
	<!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet"> -->
	<!-- <link href="dist/css/pages/data-table.css" rel="stylesheet"> -->
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
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
				<!-- Toggle Mobile Button -->
				<a href="#" class="content-menu-toggle btn btn-primary"><i class="material-icons">menu</i> Mensajes</a>

				<!-- Sidebar Derecho (Bandeja de entrada) -->
				<div class="content-menu content-menu-right">
					<div class="d-flex justify-content-between align-items-center p-3 border-bottom">
						<h5 class="mb-0 fw-bold">Mensajes</h5>
						<button type="button" class="btn btn-primary btn-sm d-flex align-items-center gap-1"
							data-bs-toggle="modal" data-bs-target="#CatalogoLineaEica" title="Ver Catálogo">
							<span class="material-symbols-outlined fs-5">category</span>
						</button>
					</div>
					<ul class="list-unstyled" id="listaMensajesEtica">
						<!-- Items generados dinámicamente -->
					</ul>
				</div>

				<div class="content-wrapper">
					<div class="container-fluid">
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
						<div class="row">
							<div class="col-12">
								<div class="page-description page-description-tabbed">
									<h1 class="text-center text-md-start">Línea de Ética</h1>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col">
								<!-- Contenedor de Detalle de Mensaje -->
								<div class="card shadow-sm border-0 mb-4" id="detalleMensajeContainer"
									style="display: none;">
									<div class="card-body p-4" id="detalleMensajeContent">
										<!-- El detalle se inyectará aquí -->
									</div>
								</div>

								<!-- Estado Vacío -->
								<div class="card shadow-sm border-0 mb-4" id="emptyStateContainer">
									<div class="card-body text-center py-5">
										<span class="material-symbols-outlined text-muted"
											style="font-size: 5rem;">inbox</span>
										<h4 class="text-muted mt-3">Selecciona un mensaje</h4>
										<p class="text-muted">Haz clic en un reporte de la lista lateral para ver los
											detalles completos.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Modal Catalogo Linea de Etica -->
				<div class="modal fade" id="CatalogoLineaEica" data-bs-backdrop="static" data-bs-keyboard="false"
					tabindex="-1" aria-labelledby="CatalogoLineaEicaLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg modal-dialog-scrollable">
						<div class="modal-content">

							<!-- Header -->
							<div class="modal-header">
								<h5 class="modal-title d-flex align-items-center gap-2" id="CatalogoLineaEicaLabel">
									<span class="material-symbols-outlined text-primary">category</span>
									<span>Catálogos Línea Ética</span>
								</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Cerrar"></button>
							</div>

							<!-- Body -->
							<div class="modal-body">
								<div class="container-fluid">
									<div class="row g-3">

										<!-- Formulario -->
										<div class="col-12 mb-4">

											<form id="formInsertaCatalogo" class="row g-3 align-items-center">
												<input type="hidden" name="op" value="addCatalogoLiniaEtica">

												<div class="col-9">
													<label for="txtNuevaEtica"
														class="form-label fw-bold small text-muted">Nuevo
														Catálogo</label>
													<input type="text" name="txtNuevaEtica" id="txtNuevaEtica"
														class="form-control"
														placeholder="Ej. Acoso laboral, Problemas de seguridad..."
														required>
												</div>

												<div
													class="col-3 text-center d-flex justify-content-center align-items-center">
													<button type="button" id="btnAgregaNuevoCatalogo"
														class="btn btn-primary mt-4 d-flex align-items-center gap-2">
														<span class="material-symbols-outlined">add_circle</span>
														<span>Agregar</span>
													</button>
												</div>
											</form>

										</div>

										<!-- Tabla -->
										<div class="col-12">

											<div class="table-responsive" style="max-height: 40vh; overflow-y: auto;">
												<table id="tableCatalogoLiniaEtica"
													class="table display align-middle text-center">
													<thead>
														<tr>
															<th>Descripción</th>
															<th>Status</th>
															<th>Acciones</th>
														</tr>
													</thead>
													<tbody>
														<!-- Aquí se insertan filas dinámicamente -->
													</tbody>
												</table>
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
	<script src="scripts/global.js" charset="utf-8"></script>
	<script src="scripts/LineaEtica.js" charset="utf-8"></script>

</body>

</html>
