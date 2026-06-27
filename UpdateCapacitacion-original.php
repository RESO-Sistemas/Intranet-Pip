<!DOCTYPE html>

<html>



<head>

    <?php include("estilos.php"); ?>

    <title>La Esmeralda</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

    <link rel="stylesheet" href="EstilosSubidaArchivo.css">

    <title>PIP by Lugo</title>

    <link href="dist/css/style.css" rel="stylesheet">

    <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

    <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

    <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">

    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

    <style media="screen">
        .contenidobox {

            height: 50vh;

            overflow-y: scroll;

            padding: 2vh
        }

        .contenidobox::-webkit-scrollbar {

            width: 12px;

        }

        .contenidobox::-webkit-scrollbar-track {

            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

            border-radius: 10px;

            background: rgb(255, 198, 198);

            background: linear-gradient(90deg, rgba(255, 198, 198, 1) 0%, rgba(255, 187, 187, 1) 100%);

        }

        .contenidobox::-webkit-scrollbar-thumb {

            border-radius: 10px;

            -webkit-box-shadow: inset 0 0 6px rgba(193, 2, 22, 0.5);

            background: rgb(255, 60, 87);

            background: linear-gradient(90deg, rgba(255, 60, 87, 1) 0%, rgba(83, 0, 18, 1) 100%);

        }
    </style>

</head>



<body>

    <div class="main-wrapper" id="main-wrapper">

        <div class="preloader">

            <div class="loader">

                <div class="loader__figure"></div>

                <p class="loader__label">PIP</p>

            </div>

        </div>

        <div id="Menu">

            <?php

            include("menus-original.php");

            ?>

        </div>

        <div class="page-wrapper">

            <div class="page-titles">

                <div class="d-flex align-items-center">

                    <h5 class="font-medium m-b-0">Actualizar Capacitación.</h5>

                    <div class="custom-breadcrumb ml-auto">

                        <a href="#!" class="breadcrumb">Home</a>

                        <a href="#!" class="breadcrumb">Inicio</a>

                    </div>

                </div>

            </div>

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

            <div class="container-fluid" style="z-index:5">

                <div class="row">

                    <div class="col s4 l4">

                        <a href="Capacitacion.php" class="waves-effect waves-light btn btn-round purple">Regresar</a>

                    </div>

                    <div class="col s12 l12">

                        <div class="card">

                            <div class="row" style="padding:2vh">

                                <div class="col s12 l12">

                                    <form id="FormCapacitacion" method="post">

                                        <div class="row">

                                            <div class="col s3 l3">

                                                <span>Tipo de Capacitación</span><br>

                                                <select name="tipoCapacitacion" id="tipoCapacitacion"
                                                    class="browser-default" onchange="tipoCap(this.value)" required>

                                                    <option value="" selected disabled>Tipos de Capacitaciones</option>

                                                    <option value="PROL">Capacitación Prolongada</option>

                                                    <option value="DIA">Por dias</option>

                                                </select>

                                            </div>

                                            <div id="detalleCapacitacion" style="display:none;">



                                                <div class="input-field col s5" style="margin-top:0.5vh">

                                                    <span>Descripción</span>

                                                    <textarea id="Desc" name="Desc" class="materialize-textarea"
                                                        required style="margin-top:-1vh"></textarea>

                                                </div>

                                                <div class="col s4 l2">

                                                    <span>Fecha Inicio</span>

                                                    <input id="fechaInicio" name="fechaInicio" type="date" value=""
                                                        onchange="getDiasArray()" required>

                                                </div>

                                                <div class="col s4 l2">

                                                    <span id="textHoraInicio">Hora Inicio</span>

                                                    <input id="HoraInicio" name="HoraInicio" type="time" value=""
                                                        required>

                                                </div>

                                                <div class="col s4 l2">

                                                    <span>Fecha Fin</span>

                                                    <input id="fechaFin" name="fechaFin" type="date" value=""
                                                        onchange="getDiasArray()" required>

                                                </div>

                                                <div class="col s4 l2">

                                                    <span id="textHoraFin">Hora Fin</span>

                                                    <input id="HoraFin" name="HoraFin" type="time" value="" required>

                                                </div>

                                                <div class="col s12">

                                                    <div class="row">

                                                        <div class="input-field col s12"
                                                            style="margin-bottom: 0.5em; margin-top:1em;">

                                                            <span>A quien vá dirigida la capacitación:</span>

                                                        </div>

                                                        <div class="input-field col s4 l4">

                                                            <select name="slctDivision" id="slctDivision"
                                                                class="browser-default" onchange="getListadoPersonal()">

                                                                <option value="" selected>Listado de Divisiones</option>

                                                            </select>

                                                        </div>

                                                        <div class="input-field col s4 l4">

                                                            <select name="slctPuesto" id="slctPuestos"
                                                                class="browser-default" onchange="getListadoPersonal()">

                                                                <option value="" selected>Listado de Puestos</option>

                                                            </select>

                                                        </div>

                                                        <div class="input-field col s4 l4">

                                                            <select name="slctSucursal" id="slctSucursal"
                                                                class="browser-default" onchange="getListadoPersonal()">

                                                                <option value="" selected>Listados de Sucursales /
                                                                    Departamentos</option>

                                                            </select>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>



                                    </form>

                                </div>

                                <div class="col s12 l6" style="margin-top:0px;display:none;" id="divVistaPrevia">

                                    <div class="row">

                                        <div class="card card-outline card-dark shadow">

                                            <div class="card-body" style="padding:2vh">

                                                <span>Elementos multimedia</span>

                                                <br><br>

                                                <div class="upload_drops" id="dropzones">

                                                    <br>

                                                    <br>

                                                    <h6>Arrastre las imágenes para agregarlas</h6>

                                                    <input type="file" id="standard_filess" style="display:none;"
                                                        multiple multiple
                                                        accept="application/pdf,image/jpeg,image/x-png,application/vnd.ms-powerpoint">

                                                    <button class="btn btn-outline-primary" type="button"
                                                        name="btnStandards" id="btnStandards">Elegir Archivos</button>

                                                    <br>

                                                    <br>

                                                    <span class="text-danger">Resolucion Recomendada: 800x800</span>

                                                    <br>

                                                    <br>

                                                    <div class="form-group-row">

                                                        <div id="ImagenesDrop" class="col-md-12">

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div class="col s12 l6">

                                    <div class="row">

                                        <div class="col s12 l12" style="text-align:center;">

                                            <h5>Archivos Actuales</h5>

                                        </div>

                                        <div class="col s12 l12" id="divContenidoArchivosActuales"
                                            style="padding:2vh;box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;">



                                        </div>

                                    </div>

                                </div>

                                <div class="col s12 l12" style="display:none; padding:2vh" id="divContenidoDias">

                                    <div class="row">

                                        <div class="col s12 l12" style="text-align:center">

                                            <h5>Días disponibles.</h5>

                                        </div>

                                        <div id="contenidoDias"></div>

                                    </div>

                                </div>

                            </div>



                        </div>

                    </div>

                    <div class="col s12 l5">

                        <div class="card" style="">

                            <div class="row contenidobox" style="">

                                <div class="table-responsive">

                                    <table class="table striped m-b-10 display centered" id="tableEmpleados">

                                        <thead>

                                            <tr>

                                                <th>No Empleado</th>

                                                <th>Empleado</th>

                                                <th>Seleccionado</th>

                                            </tr>

                                        </thead>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="col s12 l7">

                        <div class="card">

                            <div class="row" style="height:50vh;overflow-y:scroll;padding:2vh">

                                <div class="col s9 l9" style="text-align:center">

                                    <h5><b>Empleados Seleccionados</b></h5>

                                </div>

                                <div class="col s3 l3" style="text-align:center">

                                    <button class="AgregarBtnBlue" onclick="VerDetalles()">Ver Detalles</button>

                                </div>

                                <div id="contenidoEmpleadosSelected"></div>

                            </div>

                        </div>

                    </div>

                    <div class="col s12 l4 offset-l4">

                        <button class="btnAceptarVerde" style="width:100%" id="btnAgregar">Aceptar</button>

                    </div>

                </div>

            </div>

            <div class="chat-windows"></div>

        </div>



        <?php include("scripts-original.php"); ?>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
            integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"
            integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <script src="scripts/global-csoriginal.js" charset="utf-8"></script>

        <script src="assets/libs/toastr/build/toastr.min.js"></script>

        <script src="assets/extra-libs/toastr/toastr-init.js"></script>

        <script src="scripts/UpdateCapacitacion-original.js"></script>

</body>



</html>
