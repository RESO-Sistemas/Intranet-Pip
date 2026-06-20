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

    <link rel="stylesheet" href="EstilosSubidaArchivo.css">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <style>
        :root {
            --cap-amarillo: #008837;
            --cap-amarillo-oscuro: #e0a800;
            --cap-amarillo-claro: #fff8e1;
        }

        .wizard-header {
            background: var(--cap-amarillo);
            border-radius: 16px;
            padding: 1.5rem 2rem;
            color: #212529;
            margin-bottom: 1.5rem;
        }

        .wizard-header h1 {
            font-weight: 700;
            margin-bottom: 0.25rem;
            font-size: 1.5rem;
        }

        .wizard-header p {
            opacity: 0.9;
            margin-bottom: 0;
        }

        .btn-regresar {
            background: rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.15);
            color: #212529;
            border-radius: 10px;
            padding: 0.5rem 1rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .btn-regresar:hover {
            background: rgba(0, 0, 0, 0.15);
            color: #212529;
        }

        .stepper {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
            position: relative;
        }

        .stepper::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 3px;
            background: #e9ecef;
            z-index: 0;
        }

        .stepper-progress {
            position: absolute;
            top: 20px;
            left: 0;
            height: 3px;
            background: var(--cap-amarillo);
            z-index: 0;
            transition: width 0.3s ease;
        }

        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;
            cursor: pointer;
            background: white;
            padding: 0 0.5rem;
        }

        .step-number {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: white;
            border: 3px solid #e9ecef;
            color: #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            transition: all 0.3s ease;
        }

        .step.active .step-number {
            border-color: var(--cap-amarillo);
            background: var(--cap-amarillo);
            color: #212529;
            box-shadow: 0 4px 12px rgba(0, 136, 55, 0.4);
        }

        .step.completed .step-number {
            border-color: #198754;
            background: #198754;
            color: white;
        }

        .step-label {
            margin-top: 0.5rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: #6c757d;
        }

        .step.active .step-label {
            color: var(--cap-amarillo-oscuro);
        }

        .wizard-step-content {
            display: none;
        }

        .wizard-step-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .wizard-card {
            border: none;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .section-title {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 1.25rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #f1f3f5;
        }

        .day-selector {
            display: inline-block;
            cursor: pointer;
            user-select: none;
            margin: 0;
        }

        .day-checkbox {
            display: none;
        }

        .day-label {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 50px;
            background: #f8f9fa;
            color: #6c757d;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
        }

        .day-label:hover {
            background: #e9ecef;
            border-color: #adb5bd;
        }

        .day-checkbox:checked + .day-label {
            background: var(--cap-amarillo);
            border-color: var(--cap-amarillo);
            color: #212529;
            font-weight: 700;
            box-shadow: 0 4px 6px rgba(0, 136, 55, 0.35);
        }

        #contenidoDias {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            padding: 15px;
        }

        .btn-wizard {
            border-radius: 10px;
            padding: 0.75rem 1.75rem;
            font-weight: 600;
        }

        .btn-wizard-next {
            background: var(--cap-amarillo);
            border: none;
            color: #212529;
        }

        .btn-wizard-next:hover {
            background: var(--cap-amarillo-oscuro);
            color: #212529;
            box-shadow: 0 4px 12px rgba(0, 136, 55, 0.35);
        }

        .btn-wizard-prev {
            border: 1px solid #dee2e6;
            background: white;
            color: #6c757d;
        }

        .btn-wizard-prev:hover {
            background: #f8f9fa;
        }

        .upload-area {
            border: 2px dashed #dee2e6;
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            transition: all 0.2s ease;
            background: #fafbfc;
        }

        .upload-area:hover {
            border-color: var(--cap-amarillo);
            background: var(--cap-amarillo-claro);
        }

        .upload-area.drop-active {
            border-color: var(--cap-amarillo);
            background: var(--cap-amarillo-claro);
            transform: scale(1.01);
        }

        .summary-item {
            padding: 0.75rem 0;
            border-bottom: 1px solid #f1f3f5;
        }

        .summary-item:last-child {
            border-bottom: none;
        }

        .summary-label {
            color: #6c757d;
            font-size: 0.875rem;
        }

        .summary-value {
            font-weight: 600;
            color: #2c3e50;
        }
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Preloader -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>

        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>

        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container">
                        <!-- Notificaciones flotantes -->
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

                        <!-- Header -->
                        <div class="row">
                            <div class="col-12">
                                <div class="wizard-header d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                                    <div>
                                        <h1>Nueva Capacitación</h1>
                                        <p>Completa los pasos para crear una nueva capacitación.</p>
                                    </div>
                                    <div class="mt-3 mt-md-0">
                                        <a href="Capacitacion.php" class="btn btn-regresar">
                                            <span class="material-symbols-outlined" style="vertical-align: middle; font-size: 18px;">arrow_back</span>
                                            <span style="vertical-align: middle;">Regresar</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stepper -->
                        <div class="row">
                            <div class="col-12">
                                <div class="stepper" id="stepper">
                                    <div class="stepper-progress" id="stepperProgress" style="width: 0%;"></div>
                                    <div class="step active" data-step="1">
                                        <div class="step-number">1</div>
                                        <div class="step-label">General</div>
                                    </div>
                                    <div class="step" data-step="2">
                                        <div class="step-number">2</div>
                                        <div class="step-label">Audiencia</div>
                                    </div>
                                    <div class="step" data-step="3">
                                        <div class="step-number">3</div>
                                        <div class="step-label">Archivos</div>
                                    </div>
                                    <div class="step" data-step="4">
                                        <div class="step-number">4</div>
                                        <div class="step-label">Resumen</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form id="FormCapacitacion" method="post">
                            <!-- Paso 1: General -->
                            <div class="wizard-step-content active" id="step-1">
                                <div class="card wizard-card">
                                    <div class="card-body">
                                        <h5 class="section-title">
                                            <span class="material-symbols-outlined" style="vertical-align: middle;">info</span>
                                            Información general
                                        </h5>

                                        <div class="row g-3">
                                            <div class="col-12 col-lg-4 offset-lg-4">
                                                <label for="tipoCapacitacion" class="form-label fw-bold">Tipo de Capacitación</label>
                                                <select name="tipoCapacitacion" id="tipoCapacitacion" class="form-select form-select-lg" onchange="tipoCap(this.value)" required>
                                                    <option value="" selected disabled>Selecciona el tipo</option>
                                                    <option value="PROL">Capacitación Prolongada</option>
                                                    <option value="DIA">Por días</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div id="detalleCapacitacion" class="row g-3 mt-1" style="display:none;">
                                            <div class="col-12">
                                                <label for="Desc" class="form-label fw-bold">Descripción:</label>
                                                <textarea id="Desc" name="Desc" class="form-control" rows="3" required></textarea>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label for="fechaInicio" class="form-label fw-bold">Fecha Inicio:</label>
                                                <input id="fechaInicio" name="fechaInicio" type="date" class="form-control" onchange="getDiasArray()" required>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="fechaFin" class="form-label fw-bold">Fecha Fin:</label>
                                                <input id="fechaFin" name="fechaFin" type="date" class="form-control" onchange="getDiasArray()" required>
                                            </div>

                                            <div class="col-12 col-md-6" id="colHoraInicio">
                                                <label for="HoraInicio" id="textHoraInicio" class="form-label fw-bold">Hora Inicio:</label>
                                                <input id="HoraInicio" name="HoraInicio" type="time" class="form-control" required>
                                            </div>
                                            <div class="col-12 col-md-6" id="colHoraFin">
                                                <label for="HoraFin" id="textHoraFin" class="form-label fw-bold">Hora Fin:</label>
                                                <input id="HoraFin" name="HoraFin" type="time" class="form-control" required>
                                            </div>
                                        </div>

                                        <div class="row mt-3 d-flex justify-content-center mb-1" id="rowDias">
                                            <div class="col-12 col-lg-8" style="display: none;" id="divContenidoDias">
                                                <div class="mb-3">
                                                    <h5 class="fw-bold text-center" style="color: #495057; margin-bottom: 15px;">
                                                        <span class="material-icons" style="vertical-align: middle; font-size: 24px;">calendar_today</span>
                                                        Días de la semana
                                                    </h5>
                                                    <p class="text-center text-muted" style="font-size: 13px; margin-bottom: 15px;">
                                                        Selecciona los días en que se impartirá la capacitación
                                                    </p>
                                                </div>
                                                <div id="contenidoDias"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 2: Audiencia -->
                            <div class="wizard-step-content" id="step-2">
                                <div class="card wizard-card">
                                    <div class="card-body">
                                        <h5 class="section-title">
                                            <span class="material-symbols-outlined" style="vertical-align: middle;">groups</span>
                                            Audiencia
                                        </h5>

                                        <div class="row g-3 mb-4">
                                            <div class="col-12 col-lg-4">
                                                <label class="form-label fw-bold">División</label>
                                                <select name="slctDivision" id="slctDivision" class="form-select" onchange="onchangeDivision()">
                                                    <option value="" selected>Listado de Divisiones</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-lg-4">
                                                <label class="form-label fw-bold">Puesto</label>
                                                <select name="slctPuesto" id="slctPuestos" class="form-select" onchange="getListadoPersonal()">
                                                    <option value="" selected>Listado de Puestos</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-lg-4">
                                                <label class="form-label fw-bold">Sucursal / Departamento</label>
                                                <select name="slctSucursal" id="slctSucursal" class="form-select" onchange="getListadoPersonal()">
                                                    <option value="" selected>Listados de Sucursales / Departamentos</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row g-3">
                                            <div class="col-12 col-md-6">
                                                <div class="card" style="height:450px;">
                                                    <div class="card-body d-flex flex-column" style="height:100%;">
                                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                                            <label class="fw-bold mb-0">Empleados disponibles</label>
                                                            <button type="button" class="btn-minimal btn-minimal-success btn-sm" id="addAll">
                                                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">done_all</span>
                                                                <span style="vertical-align: middle;">Todos</span>
                                                            </button>
                                                        </div>
                                                        <div class="table-responsive flex-grow-1" style="overflow-y:auto;">
                                                            <table class="display text-center mb-0 w-100" id="tableEmpleados">
                                                                <thead>
                                                                    <tr>
                                                                        <th>No Empleado</th>
                                                                        <th>Empleado</th>
                                                                        <th>Seleccionado</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <div class="card" style="height:450px;">
                                                    <div class="card-body d-flex flex-column" style="height:100%; overflow-y:auto;">
                                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                                            <label class="fw-bold mb-0">Empleados seleccionados</label>
                                                            <button type="button" class="btn-minimal btn-minimal-secondary btn-sm" onclick="VerDetalles()">
                                                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">visibility</span>
                                                                <span style="vertical-align: middle;">Ver detalles</span>
                                                            </button>
                                                        </div>
                                                        <div class="row row-cols-2 g-2 flex-grow-1" id="contenidoEmpleadosSelected"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 3: Archivos -->
                            <div class="wizard-step-content" id="step-3">
                                <div class="card wizard-card">
                                    <div class="card-body">
                                        <h5 class="section-title">
                                            <span class="material-symbols-outlined" style="vertical-align: middle;">upload_file</span>
                                            Materiales de la capacitación
                                        </h5>

                                        <div class="upload-area p-4" id="dropzones">
                                            <div class="mb-3">
                                                <span class="material-symbols-outlined" style="font-size: 48px; color: var(--cap-amarillo-oscuro);">cloud_upload</span>
                                            </div>
                                            <h5 class="fw-bold mb-2">Arrastra archivos aquí</h5>
                                            <p class="text-muted mb-3">O haz clic en el botón de abajo para seleccionar archivos desde tu dispositivo.</p>
                                            <span class="badge bg-warning text-dark mb-3">PDF, Word, Excel, PowerPoint, imágenes (PNG, JPG, GIF, WEBP, BMP) y MP4. Máximo 500 MB por archivo.</span>
                                            <br>
                                            <input type="file" id="standard_filess" style="display:none;" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.webp,.bmp,.mp4">
                                            <button class="btn btn-wizard-next" type="button" name="btnStandards" id="btnStandards">
                                                <span class="material-symbols-outlined" style="vertical-align: middle;">upload_file</span>
                                                <span style="vertical-align: middle;">Seleccionar archivos</span>
                                            </button>
                                            <div id="ImagenesDrop" class="mt-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Paso 4: Resumen -->
                            <div class="wizard-step-content" id="step-4">
                                <div class="card wizard-card">
                                    <div class="card-body">
                                        <h5 class="section-title">
                                            <span class="material-symbols-outlined" style="vertical-align: middle;">fact_check</span>
                                            Resumen
                                        </h5>

                                        <div class="row g-4">
                                            <div class="col-12 col-lg-6">
                                                <div class="card h-100 bg-light border-0">
                                                    <div class="card-body">
                                                        <h6 class="fw-bold mb-3">Información general</h6>
                                                        <div class="summary-item">
                                                            <div class="summary-label">Tipo</div>
                                                            <div class="summary-value" id="summaryTipo">-</div>
                                                        </div>
                                                        <div class="summary-item">
                                                            <div class="summary-label">Descripción</div>
                                                            <div class="summary-value" id="summaryDescripcion">-</div>
                                                        </div>
                                                        <div class="summary-item">
                                                            <div class="summary-label">Período</div>
                                                            <div class="summary-value" id="summaryPeriodo">-</div>
                                                        </div>
                                                        <div class="summary-item" id="summaryHorarioItem">
                                                            <div class="summary-label">Horario</div>
                                                            <div class="summary-value" id="summaryHorario">-</div>
                                                        </div>
                                                        <div class="summary-item" id="summaryDiasItem">
                                                            <div class="summary-label">Días</div>
                                                            <div class="summary-value" id="summaryDias">-</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-12 col-lg-6">
                                                <div class="card h-100 bg-light border-0">
                                                    <div class="card-body">
                                                        <h6 class="fw-bold mb-3">Audiencia y archivos</h6>
                                                        <div class="summary-item">
                                                            <div class="summary-label">Empleados seleccionados</div>
                                                            <div class="summary-value" id="summaryEmpleados">0</div>
                                                        </div>
                                                        <div class="summary-item">
                                                            <div class="summary-label">Archivos adjuntos</div>
                                                            <div class="summary-value" id="summaryArchivos">0</div>
                                                        </div>
                                                        <div class="summary-item">
                                                            <div class="summary-label">Tamaño total</div>
                                                            <div class="summary-value" id="summaryTamano">0 MB</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <!-- Botones de navegación -->
                        <div class="row mt-4 mb-4">
                            <div class="col-12 d-flex justify-content-between">
                                <button type="button" class="btn btn-wizard btn-wizard-prev" id="btnPrev" style="visibility: hidden;">
                                    <span class="material-symbols-outlined" style="vertical-align: middle;">arrow_back</span>
                                    <span style="vertical-align: middle;">Anterior</span>
                                </button>
                                <button type="button" class="btn btn-wizard btn-wizard-next" id="btnNext">
                                    <span style="vertical-align: middle;">Siguiente</span>
                                    <span class="material-symbols-outlined" style="vertical-align: middle;">arrow_forward</span>
                                </button>
                                <button type="button" class="btn btn-success btn-wizard" id="btnAgregar" style="display: none;">
                                    <span class="material-symbols-outlined" style="vertical-align: middle;">save</span>
                                    <span style="vertical-align: middle;">Guardar capacitación</span>
                                </button>
                            </div>
                        </div>

                        <div class="chat-windows"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <!-- neptune Javascripts -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/AddCapacitacion.js"></script>
</body>

</html>
