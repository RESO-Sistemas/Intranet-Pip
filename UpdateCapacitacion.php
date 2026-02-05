<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>

<html>



<head>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">

    <title>Klyns Intranet</title>


    <?php include("neptune_styles.php"); ?>

    <link rel="stylesheet" href="EstilosSubidaArchivo.css">
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <style>
        /* Estilos para selectores de días de la semana */
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
            text-align: center;
        }

        .day-label:hover {
            background: #e9ecef;
            border-color: #adb5bd;
            color: #495057;
        }

        .day-checkbox:checked + .day-label {
            background: #667eea;
            border-color: #667eea;
            color: white;
            font-weight: 700;
        }

        .day-checkbox:checked + .day-label::after {
            content: " ✓";
            margin-left: 5px;
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

        <div class="preloader">

            <div class="loader">

                <div class="loader__figure"></div>

                <p class="loader__label">Klyns</p>

            </div>

        </div>



        <div id="Menu">

            <?php include("menus.php"); ?>

        </div>



        <div class="app-container">

            <div class="app-header">

                <nav class="navbar navbar-light navbar-expand-lg">

                    <div class="container-fluid">

                        <div class="navbar-nav" id="navbarNav">

                            <ul class="navbar-nav">

                                <li class="nav-item">

                                    <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">first_page</i></a>

                                </li>

                            </ul>

                        </div>

                        <div class="d-flex">

                            <ul class="navbar-nav">

                                <li class="nav-item hidden-on-mobile">

                                    <a class="nav-link" id="notificationsDropDown" href="#" data-bs-toggle="dropdown">

                                        <i class="material-icons">notifications</i>

                                    </a>

                                    <div class="dropdown-menu dropdown-menu-end notifications-dropdown">

                                        <h6 class="dropdown-header">Notificaciones</h6>

                                        <div class="notifications-dropdown-list">

                                            <div id="notificacionesPendienteLEtica"></div>

                                            <div id="notificacionesMenuLEtica"></div>

                                            <div id="notificacionesMenuSVacaciones"></div>

                                            <div id="notificacionesMenuSVacacionesNomina"></div>

                                            <div id="notificacionesCapacitacion"></div>

                                        </div>

                                    </div>

                                </li>

                                <li class="nav-item hidden-on-mobile">

                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">

                                        <img id="imgSmallProfile" alt="user" class="rounded-circle" width="30" height="30" />

                                    </a>

                                    <ul class="dropdown-menu dropdown-menu-end">

                                        <li>

                                            <div class="dropdown-item" onclick="window.location.href='MiPerfil.php'">

                                                <div class="u-img"><img class="rounded-circle" id="profileImg" alt="user" width="60" height="60"></div>

                                                <div class="u-text">

                                                    <h4 id="PerfilNombreEmp"></h4>

                                                    <p id="PerfilCorreoEmp"></p>

                                                </div>

                                            </div>

                                        </li>

                                        <li><a class="dropdown-item" href="index.php"><i class="material-icons me-2">home</i>Inicio</a></li>

                                        <li><a class="dropdown-item" href="logout.php"><i class="material-icons me-2">exit_to_app</i>Salir</a></li>

                                    </ul>

                                </li>

                            </ul>

                        </div>

                    </div>

                </nav>

            </div>



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

                                    <h1>Actualizar Capacitación</h1>

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

                                                                <select name="slctDivision" id="slctDivision" class="form-select" onchange="getListadoPersonal()">

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

                                            </form>

                                        </div>

                                        <div class="row">

                                            <div class="col-12 mt-3">

                                                <div class="card shadow-sm">

                                                    <div class="card-body">

                                                        <label class="form-label fw-bold mb-3">Archivos actuales:</label>

                                                        <div id="divContenidoArchivosActuales" class="p-3 border rounded" style="min-height:150px;">



                                                        </div>

                                                    </div>

                                                </div>

                                            </div>



                                        </div>

                                        <div class="row">

                                            <div class="col-12 mt-3" style="display:none;" id="divVistaPrevia">

                                                <div class="card border-dark shadow-sm">

                                                    <div class="card-body">

                                                        <label class="form-label fw-bold">Elementos multimedia:</label>

                                                        <div class="upload_drops text-center p-3 border rounded" id="dropzones">

                                                            <label class="form-label">Arrastre las imágenes para agregarlas</label>

                                                            <br>

                                                            <span class="badge badge-style-bordered badge-success mb-2">Resolución recomendada: 800x800.</span>

                                                            <br>

                                                            <input type="file" id="standard_filess" style="display:none;" multiple accept="application/pdf,image/jpeg,image/x-png,application/vnd.ms-powerpoint">

                                                            <button class="btn btn-outline-primary mt-2" type="button" name="btnStandards" id="btnStandards">

                                                                <span class="material-symbols-outlined">upload_file</span>

                                                            </button>

                                                            <div id="ImagenesDrop" class="mt-3"></div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>



                                        </div>

                                        <div class="row mt-3 d-flex justify-content-center mb-3">

                                            <div class="col-12 col-lg-6" style="display:none;" id="divContenidoDias">

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

                                        <div class="row d-flex justify-content-center">

                                            <div class="col-12 col-md-6">

                                                <div class="card" style="height:600px;">

                                                    <div class="card-body contenidobox" style="height:100%; display:flex; flex-direction:column;">

                                                        <div class="row mb-2">

                                                            <div class="col-12 text-center d-flex justify-content-center align-items-center">

                                                                <label class="label fw-bold">Empleados</label>

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



                                                                </tbody>

                                                            </table>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

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



                                                        <div class="row row-cols-2 g-2" id="contenidoEmpleadosSelected">



                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div class="row mt-3">

                                            <div class="col-12 col-lg-4 offset-lg-4">

                                                <button class="btn btn-success w-100" id="btnAgregar">Actualizar</button>

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

    <?php include("scripts.php"); ?>

    <!-- neptune Javascripts -->

    <?php include("neptune_js.php");  ?>

    <!-- neptune Javascripts -->

    <script src="assets/libs/toastr/build/toastr.min.js"></script>

    <script src="assets/extra-libs/toastr/toastr-init.js"></script>

    <script src="scripts/UpdateCapacitacion.js"></script>

</body>



</html>