<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>

<html>



<head>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

    <title>PIP Intranet</title>

    <!-- Styles neptune -->



    <?php include("neptune_styles.php");  ?>



    <!-- Styles neptune -->

    <link rel="stylesheet" href="EstilosSubidaArchivo.css">

    <!-- <link href="dist/css/style.css" rel="stylesheet"> -->

    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

    <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <style>
        /* Estilos para selector de días de la semana */
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
            background: #667eea;
            border-color: #667eea;
            color: white;
            font-weight: 700;
            box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
        }

        #contenidoDias {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            padding: 15px;
        }
    </style>

</head>



<body>

    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

        <!-- ============================================================== -->

        <!-- Preloader - style you can find in spinners.css -->

        <!-- ============================================================== -->

        <div class="preloader">

            <div class="loader">

                <div class="loader__figure"></div>

                <p class="loader__label">PIP</p>

            </div>

        </div>

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

                                    <h1>Nueva Capacitación</h1>

                                </div>

                            </div>

                        </div>

                        <div class="row">

                            <div class="col">

                                <div class="card">

                                    <div class="card-body">

                                        <div class="row mb-4">

                                            <div class="col text-start">

                                                <a href="Capacitacion.php" class="btn btn-danger">Regresar</a>

                                            </div>

                                        </div>

                                        <div class="row">

                                            <form id="FormCapacitacion" method="post">



                                                <!-- Tipo de Capacitación -->

                                                <div class="row d-flex justify-content-center">

                                                    <div class="col-12 col-lg-3 text-center">

                                                        <label for="tipoCapacitacion" class="form-label fw-bold">Tipo de Capacitación</label>

                                                        <select name="tipoCapacitacion" id="tipoCapacitacion" class="form-select" onchange="tipoCap(this.value)" required>

                                                            <option value="" selected disabled>Tipos de Capacitaciones</option>

                                                            <option value="PROL">Capacitación Prolongada</option>

                                                            <option value="DIA">Por días</option>

                                                        </select>

                                                    </div>

                                                </div>



                                                <!-- Detalle Capacitación -->

                                                <div id="detalleCapacitacion" class="row g-3" style="display:none;">

                                                    <!-- Descripción -->

                                                    <div class="col-12">

                                                        <label for="Desc" class="form-label fw-bold">Descripción:</label>

                                                        <textarea id="Desc" name="Desc" class="form-control" required></textarea>

                                                    </div>



                                                    <!-- Fecha Inicio y Fecha Fin -->

                                                    <div class="row justify-content-center g-3">

                                                        <div class="col-12 col-md-3">

                                                            <label for="fechaInicio" class="form-label fw-bold">Fecha Inicio:</label>

                                                            <input id="fechaInicio" name="fechaInicio" type="date" class="form-control" onchange="getDiasArray()" required>

                                                        </div>

                                                        <div class="col-12 col-md-3">

                                                            <label for="fechaFin" class="form-label fw-bold">Fecha Fin:</label>

                                                            <input id="fechaFin" name="fechaFin" type="date" class="form-control" onchange="getDiasArray()" required>

                                                        </div>

                                                    </div>



                                                    <!-- Hora Inicio y Hora Fin -->

                                                    <div class="row justify-content-center g-3 mb-3">

                                                        <div class="col-12 col-md-3">

                                                            <label for="HoraInicio" id="textHoraInicio" class="form-label fw-bold">Hora Inicio:</label>

                                                            <input id="HoraInicio" name="HoraInicio" type="time" class="form-control" required>

                                                        </div>



                                                        <div class="col-12 col-md-3">

                                                            <label for="HoraFin" id="textHoraFin" class="form-label fw-bold">Hora Fin:</label>

                                                            <input id="HoraFin" name="HoraFin" type="time" class="form-control" required>

                                                        </div>

                                                    </div>





                                                    <!-- A quién va dirigida -->

                                                    <div class="col-12">

                                                        <label class="form-label fw-bold">A quién va dirigida la capacitación:</label>

                                                        <div class="row g-3">

                                                            <div class="col-12 col-lg-4">

                                                                <select name="slctDivision" id="slctDivision" class="form-select" onchange="onchangeDivision()">

                                                                    <option value="" selected>Listado de Divisiones</option>

                                                                </select>

                                                            </div>

                                                            <div class="col-12 col-lg-4">

                                                                <select name="slctPuesto" id="slctPuestos" class="form-select" onchange="getListadoPersonal()">

                                                                    <option value="" selected>Listado de Puestos</option>

                                                                </select>

                                                            </div>

                                                            <div class="col-12 col-lg-4">

                                                                <select name="slctSucursal" id="slctSucursal" class="form-select" onchange="getListadoPersonal()">

                                                                    <option value="" selected>Listados de Sucursales / Departamentos</option>

                                                                </select>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>





                                                <!-- Vista previa multimedia -->

                                                <div class="col-12 mt-3" style="display:none;" id="divVistaPrevia">

                                                    <div class="card border-dark shadow-sm">

                                                        <div class="card-body">

                                                            <label class="form-label fw-bold">Elementos multimedia</label>

                                                            <div class="upload_drops text-center p-3 border rounded" id="dropzones">

                                                                <label class="form-label">Arrastre las imágenes para agregarlas</label>

                                                                <br>

                                                                <span class="badge badge-style-bordered badge-warning mb-2">Nota: Se aceptan archivos e imágenes.</span>

                                                                <br>

                                                                <input type="file" id="standard_filess" style="display:none;" multiple accept="application/pdf,image/jpeg,image/x-png,application/vnd.ms-powerpoint">

                                                                <button class="btn btn-outline-primary mt-2" type="button" name="btnStandards" id="btnStandards"><span class="material-symbols-outlined">upload_file</span></button>

                                                                <div id="ImagenesDrop" class="mt-3"></div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </form>

                                        </div>



                                        <!-- Dias -->

                                        <div class="row mt-3 d-flex justify-content-center mb-3">



                                            <div class="col-12 col-lg-8" style="display: none;" id="divContenidoDias">
                                                <div class="mb-3">
                                                    <h5 class="fw-bold text-center" style="color: #495057; margin-bottom: 15px;">
                                                        <i class="material-icons" style="vertical-align: middle; font-size: 24px;">calendar_today</i>
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

                                    <div class="row d-flex justify-content-center">

                                        <!-- Columna izquierda: Tabla de empleados -->

                                        <div class="col-12 col-md-6">

                                            <div class="card" style="height:600px;">

                                                <div class="card-body contenidobox" style="height:100%; display:flex; flex-direction:column;">

                                                    <div class="row mb-2">

                                                        <div class="col-9 text-center d-flex justify-content-center align-items-center">

                                                            <label class="label fw-bold">Empleados</label>

                                                        </div>

                                                        <div class="col-3 text-center">

                                                            <button type="button" class="btn btn-primary" id="addAll">Registrar todos</button>

                                                        </div>

                                                    </div>

                                                    <div class="table-responsive" style="flex:1; overflow-y:auto;">

                                                        <table class="display text-center mb-0" id="tableEmpleados">

                                                            <thead>

                                                                <tr>

                                                                    <th>No Empleado</th>

                                                                    <th>Empleado</th>

                                                                    <th>Seleccionado</th>

                                                                </tr>

                                                            </thead>

                                                            <tbody>

                                                                <!-- Contenido dinámico -->

                                                            </tbody>

                                                        </table>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>



                                        <!-- Columna derecha: Empleados seleccionados -->

                                        <div class="col-12 col-md-6">

                                            <div class="card" style="height:600px;">

                                                <div class="card-body" style="height:100%; overflow-y:auto; padding:2vh;">

                                                    <div class="row mb-2">

                                                        <div class="col-9 text-center d-flex justify-content-center align-items-center">

                                                            <label class="label fw-bold">Empleados Seleccionados</label>

                                                        </div>

                                                        <div class="col-3 text-center">

                                                            <button class="btn btn-primary" onclick="VerDetalles()">Ver Detalles</button>

                                                        </div>

                                                    </div>

                                                    <!-- Contenedor de tarjetas con 2 columnas -->

                                                    <div class="row row-cols-2 g-2" id="contenidoEmpleadosSelected">

                                                        <!-- Aquí se insertarán las tarjetas de empleados -->

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="row mb-3">

                                        <div class="col-12 col-lg-4 offset-lg-4">

                                            <button class="btn btn-success w-100" id="btnAgregar">Aceptar</button>

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

    <?php include("neptune_js.php");  ?>

    <!-- neptune Javascripts -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="assets/libs/toastr/build/toastr.min.js"></script>

    <script src="assets/extra-libs/toastr/toastr-init.js"></script>

    <script src="scripts/AddCapacitacion.js"></script>



</body>



</html>