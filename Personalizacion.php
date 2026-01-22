<!DOCTYPE html>
<html>

<head>
    <?php include("AutorizaPagina.php"); ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Klyns Intranet</title>
    <!-- Styles neptune -->

    <?php include("neptune_styles.php");  ?>

    <!-- Styles neptune -->
    <!-- <link href="dist/css/style.css" rel="stylesheet"> -->
    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <!-- <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet"> -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <style media="screen">
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
                <p class="loader__label">Klyns</p>
            </div>
        </div>
        <div id="Menu">
            <?php
            include("menus.php");
            ?>
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

                                <!-- notifications -->
                                <li class="nav-item hidden-on-mobile">
                                    <!-- nav-notifications-toggle -->
                                    <a class="nav-link" id="notificationsDropDown" href="#" data-bs-toggle="dropdown"><i class="material-icons">notifications</i></a>
                                    <div class="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">
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

                                <!--  Foto de perfil -->
                                <li class="nav-item hidden-on-mobile">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        id="notificationsDropDown"
                                        href="javascript:void(0);"
                                        data-bs-toggle="dropdown">
                                        <img
                                            id="imgSmallProfile"
                                            alt="user"
                                            class="rounded-circle"
                                            width="30"
                                            height="30" />
                                    </a>
                                    <ul
                                        id="user_dropdown"
                                        class="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="addDropdownLink">
                                        <li>
                                            <!-- <a class="dropdown-item" href="#">New Workspace</a> -->
                                            <div class="dropdown-item " style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                                                <div class="u-img" style="padding-bottom: 10px; padding-top:10px; "><img class="rounded-circle " id="profileImg" alt="user" width="60px" height="60px"></div>
                                                <div class="u-text">
                                                    <h4 id="PerfilNombreEmp"></h4>
                                                    <p id="PerfilCorreoEmp"></p>
                                                    <!-- <a class="waves-effect waves-light btn-small red white-text" href="index.php">Perfil</a> -->
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <a
                                                class="dropdown-item d-flex align-items-center"
                                                href="index.php"><i class="material-icons me-2">home</i>Inicio</a>
                                        </li>
                                        <li>
                                            <a
                                                class="dropdown-item d-flex align-items-center"
                                                href="logout.php"><i class="material-icons me-2">exit_to_app</i>Salir</a>
                                        </li>
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
                                    <h1>Personalización</h1>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <!-- dias festivos -->
                                        <div class="row">
                                            <div class="col-12" style="text-align:center">
                                                <label class="form-label fw-bold">Días festivos.</label>
                                            </div>
                                            <div class="col-12" style="text-align:center">
                                                <button class="btn btn-success" id="btnViewDiasFestivos">Gestionar días festivos.</button>
                                            </div>
                                        </div>
                                        <!-- Mensaje de bienvenida -->
                                        <div class="row">
                                            <div class="col-12">
                                                <label class="form-label fw-bold">Mensaje de Bienvenida:</label>
                                                <textarea id="txtMensajeBienvenida" type="text"
                                                    class="form-control" style="height:auto;"></textarea>
                                            </div>
                                            <div class="col mt-2" style="text-align:end">
                                                <button class="btn btn-success" id="btnActualizaMensajeBienvenida">Actualizar</button>
                                            </div>
                                        </div>

                                        <!-- Imagenes-->
                                        <div class="row mt-4">
                                            <!-- Columna izquierda -->
                                            <div class="col-12 col-md-6 mb-4">
                                                <div id="divContenidobirthday" class="text-center">
                                                    <label class="form-label fw-bold">Imagen Cumpleaños:</label>
                                                    <form id="formInsertaImgBirthday">
                                                        <input type="hidden" value="updateImgBirthday" name="op">
                                                        <img src="assets/cumplecursor.png" alt="ImgCumpleaños"
                                                            id="imgPreview"
                                                            class="img-fluid rounded shadow-sm"
                                                            style="height:45vh; cursor:pointer;">
                                                        <input type="file" style="display:none;"
                                                            name="ContenidoImgBirthday" id="ContenidoImgBirthday"
                                                            onchange="previewImage(event,'#imgPreview')" required>
                                                    </form>
                                                    <button class="btn btn-primary mt-3" id="btnInsertaImgBirthday">
                                                        Actualizar Imagen Cumpleaños
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Columna derecha -->
                                            <div class="col-12 col-md-6 mb-4">
                                                <div id="divContenidoanniversary" class="text-center">
                                                    <label class="form-label fw-bold">Imagen Aniversario:</label>
                                                    <form id="fprmInsertaImgAnniversary">
                                                        <input type="hidden" value="updateImgAnniversary" name="op">
                                                        <img src="assets/cumplecursor.png" alt="ImgAnniversary"
                                                            id="imgPreviewAnn"
                                                            class="img-fluid rounded shadow-sm"
                                                            style="height:45vh; cursor:pointer;">
                                                        <input type="file" style="display:none;"
                                                            name="ContenidoImgAnniversary" id="ContenidoImgAnniversary"
                                                            onchange="previewImageAnny(event,'#imgPreviewAnn')" required>
                                                    </form>
                                                    <button class="btn btn-primary mt-3" id="btnInsertaImgAnni">
                                                        Actualizar Imagen Aniversario
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-windows"></div>
            </div>

            <!-- Modal -->
            <!-- Modal Días Festivos -->
            <div class="modal fade" id="ModalDiasFestivos" tabindex="-1" aria-labelledby="ModalDiasFestivosLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalDiasFestivosLabel">Gestión de Días Festivos</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <!-- Body con scroll -->
                        <div class="modal-body" id="divDiasFestivos" style="max-height:70vh; overflow-y:auto;">
                            <div class="container-fluid">
                                <div class="row g-3">

                                    <!-- Selección de mes, día y descripción -->
                                    <div class="col-12">

                                        <div class="row g-3 align-items-center">

                                            <div class="col-12 col-md-4 text-center">
                                                <label for="mesSelected" class="form-label fw-bold">Seleccione el mes</label>
                                                <select id="mesSelected" class="form-select"></select>
                                            </div>

                                            <div class="col-12 col-md-4 text-center">
                                                <label for="diaSelected" class="form-label fw-bold">Seleccione el día</label>
                                                <select id="diaSelected" class="form-select"></select>
                                            </div>

                                            <div class="col-12 col-md-4 text-center">
                                                <label for="txtDescripcionDiaF" class="form-label fw-bold">Descripción</label>
                                                <input type="text" id="txtDescripcionDiaF" class="form-control">
                                            </div>

                                            <div class="col-12 text-center">
                                                <button type="button" class="btn btn-success mt-2" id="btnAddDiaF">Agregar día festivo</button>
                                            </div>

                                        </div>

                                    </div>

                                    <!-- Tabla de días festivos -->
                                    <div class="col-12">
                                        <div class="table-responsive">
                                            <table class="table align-middle text-center" id="tableDiasFestivos">
                                                <thead class="">
                                                    <tr>
                                                        <th>Descripción</th>
                                                        <th>Día</th>
                                                        <th>Status</th>
                                                        <th>Actualizar</th>
                                                        <th>Activar / Desactivar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
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


            <!-- Modal Actualizar Día Festivo -->
            <div class="modal fade" id="ModalUpdateDiaFestivo" tabindex="-1" aria-labelledby="ModalUpdateDiaFestivoLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalUpdateDiaFestivoLabel">Actualizar Día Festivo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>

                        <!-- Body -->
                        <div class="modal-body" id="contenidoUpdateDiaFestivo">
                            <div class="container-fluid">
                                <div class="row g-3 p-3">

                                    <!-- Id oculto -->
                                    <input type="hidden" id="IdDFUpdate">

                                    <!-- Selección mes y día -->
                                    <div class="col-12">
                                        <div class="row g-3 justify-content-center">
                                            <div class="col-12 col-md-7 text-center">
                                                <label for="mesSelectedUpdate" class="form-label fw-bold">Seleccione el mes</label>
                                                <select id="mesSelectedUpdate" class="form-select"></select>
                                            </div>
                                            <div class="col-12 col-md-5 text-center">
                                                <label for="diaSelectedUpdate" class="form-label fw-bold">Seleccione el día</label>
                                                <select id="diaSelectedUpdate" class="form-select"></select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Descripción -->
                                    <div class="col-12 text-center">
                                        <label for="txtDescripcionDiaFUpdate" class="form-label fw-bold">Descripción del día</label>
                                        <input type="text" id="txtDescripcionDiaFUpdate" class="form-control form-control-solid-bordered ">
                                    </div>

                                    <!-- Botón actualizar -->
                                    <div class="col-12 text-center">
                                        <button type="button" class="btn btn-success mt-3" id="btnUpdateDF">Actualizar día Festivo</button>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
        integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
        integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/global.js" charset="utf-8"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="scripts/Personalizacion.js" charset="utf-8"></script>


</body>

</html>