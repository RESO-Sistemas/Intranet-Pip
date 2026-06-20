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
	<style>
		.org-card {
			border: 1px solid #e2e8f0;
			border-radius: 14px;
			background: #fff;
			padding: 20px;
			transition: box-shadow .2s, transform .1s;
			cursor: default;
		}

		.org-card:hover {
			box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
			transform: translateY(-2px);
		}

		.org-card-icon {
			width: 48px;
			height: 48px;
			border-radius: 12px;
			background: #008837;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 12px;
		}

		.org-card-icon .material-symbols-outlined {
			color: #111;
			font-size: 24px;
		}

		.org-card-title {
			font-size: 15px;
			font-weight: 600;
			color: #1e293b;
			margin-bottom: 6px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.org-card-meta {
			font-size: 12px;
			color: #94a3b8;
			margin-bottom: 16px;
		}

		.org-card-actions {
			display: flex;
			gap: 6px;
			flex-wrap: wrap;
		}

		.org-card-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 4px;
			padding: 6px 10px;
			border-radius: 8px;
			font-size: 12px;
			font-weight: 500;
			border: 1px solid #e2e8f0;
			background: #f8fafc;
			color: #64748b;
			cursor: pointer;
			transition: all .15s;
			white-space: nowrap;
			text-decoration: none;
		}

		.org-card-btn:hover { background: #f1f5f9; color: #1e293b; }
		a.org-card-btn, a.org-card-btn:visited { color: #64748b !important; }
		a.org-card-btn:hover { color: #1e293b !important; }
		a.org-card-btn .material-symbols-outlined { color: #64748b !important; }
		a.org-card-btn:hover .material-symbols-outlined { color: #1e293b !important; }


		.org-card-btn.danger {
			background: #fff1f2;
			border-color: #fecdd3;
			color: #e11d48;
		}

		.org-card-btn.danger:hover {
			background: #ffe4e6;
		}

		.org-card-btn .material-symbols-outlined { font-size: 14px; }

		.org-card-title-wrap { position: relative; }
		.org-card-title-input {
			width: 100%; font-size: 15px; font-weight: 600; color: #1e293b;
			border: 1.5px solid #008837; border-radius: 6px;
			padding: 2px 30px 2px 6px; outline: none;
			background: #f0fdf4;
		}
		.org-card-title-save {
			position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
			background: #008837; border: none; border-radius: 4px;
			width: 22px; height: 22px; cursor: pointer;
			display: flex; align-items: center; justify-content: center;
			padding: 0;
		}
		.org-card-title-save .material-symbols-outlined { font-size: 13px; color: #111; }
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
									<h1>Organigramas</h1>
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col d-flex align-items-center justify-content-between">
								<div>
									<input type="text" id="orgSearchFilter" class="form-control form-control-sm"
										placeholder="Filtrar organigramas..." style="width:220px;">
								</div>
								<button type="button" class="btn btn-primary d-flex align-items-center gap-2"
									id="btnNewOrganigrama">
									<span class="material-symbols-outlined" style="font-size:18px">add</span>
									Nuevo Organigrama
								</button>
							</div>
						</div>
						<div id="tableOrganigramas">
							<div class="row g-3" id="orgCardsContainer"></div>
							<div id="orgEmptyState" style="display:none;" class="text-center py-5">
								<span class="material-symbols-outlined"
									style="font-size:64px;color:#cbd5e1">account_tree</span>
								<h5 class="text-muted mt-3">Sin organigramas</h5>
								<p class="text-muted">No hay organigramas registrados. Crea el primero.</p>
							</div>
							<div id="orgSearchEmptyState" style="display:none;" class="text-center py-5">
								<span class="material-symbols-outlined"
									style="font-size:64px;color:#cbd5e1">search_off</span>
								<h5 class="text-muted mt-3">Sin resultados</h5>
								<p class="text-muted">Ningún organigrama coincide con tu búsqueda.</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal fade" id="ModalNewOrganigrama" tabindex="-1" aria-labelledby="TituloOrganigrama"
				aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div class="modal-content">

						<!-- Header -->
						<div class="modal-header">
							<h5 class="modal-title" id="TituloOrganigrama">Nuevo Organigrama</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal"
								aria-label="Cerrar"></button>
						</div>

						<!-- Body -->
						<div class="modal-body">
							<form id="formInsertaOrg">
								<input type="hidden" name="op" value="addOrganigrama">
								<div class="row g-3">
									<div class="col-12">
										<label for="txtTituloOrg" class="form-label fw-bold">Título</label>
										<input id="txtTituloOrg" name="txtTituloOrg" type="text" class="form-control"
											required>
									</div>
								</div>
							</form>
						</div>

						<!-- Footer -->
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" id="btnGuardarOrg">Guardar</button>
							<!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> -->
						</div>

					</div>
				</div>
			</div>

		</div>
	</div>
	<!-- neptune Javascripts -->
	<?php include("neptune_js.php"); ?>
	<!-- neptune Javascripts -->


	<!-- Scripts específicos de esta página -->
	<script src="scripts/ControlOrganigrama.js?v=<?= time() ?>" charset="utf-8">
	</script>
</body>

</html>