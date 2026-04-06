<?php 
include("AutorizaPagina.php"); 
$idPostulante = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Obtener nombre del postulante
$nombrePostulante = '';
if ($idPostulante > 0) {
    require_once('Backend/Conexiones/Conexiones.php');
    $conn = new Conexiones();
    $datosPostulante = $conn->SelectNotClose("SELECT CONCAT(Nombre, ' ', ApellidoPaterno, ' ', IFNULL(ApellidoMaterno, '')) AS NombreCompleto FROM Postulantes WHERE IdPostulante = $idPostulante");
    if (!empty($datosPostulante)) {
        $nombrePostulante = trim($datosPostulante[0]['NombreCompleto']);
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Detalle de Postulante - PIP</title>

    <?php include("neptune_styles.php"); ?>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
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
                    <div class="container-fluid">
                        <div class="row mb-3">
                            <div class="col">
                                <h4 class="mb-0">
                                    <i class="material-icons-outlined align-middle" style="font-size: 28px; color: #f5a623;">person</i>
                                    <?php echo htmlspecialchars($nombrePostulante ?: 'Postulante'); ?>
                                </h4>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <a href="PostulantesGeneral.php" class="btn btn-regresar-custom btn-sm">
                                    <i class="material-icons-outlined align-middle" style="font-size: 18px;">arrow_back</i> Regresar
                                </a>
                            </div>
                        </div>
                        <!-- Información del Postulante -->
                        <div class="row mb-3">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">
                                            <i class="material-icons-outlined align-middle" style="font-size: 20px;">badge</i>
                                            Información del Postulante
                                        </h5>
                                        <button type="button" class="btn btn-primary btn-sm" id="btnEditarPostulante" onclick="PostulanteEditor.toggleEditMode()">
                                            <i class="material-icons-outlined align-middle" style="font-size: 18px;">edit</i> Editar Información
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <input type="hidden" id="detalleIdPostulante" value="<?php echo $idPostulante; ?>">
                                        
                                        <div class="row">
                                            <!-- Nombre -->
                                            <div class="col-md-4 mb-3">
                                                <label class="form-label fw-bold">Nombre(s)</label>
                                                <input type="text" class="form-control" id="detallePostulanteNombre" disabled>
                                            </div>
                                            <!-- Apellido Paterno -->
                                            <div class="col-md-4 mb-3">
                                                <label class="form-label fw-bold">Apellido Paterno</label>
                                                <input type="text" class="form-control" id="detallePostulanteApellidoPaterno" disabled>
                                            </div>
                                            <!-- Apellido Materno -->
                                            <div class="col-md-4 mb-3">
                                                <label class="form-label fw-bold">Apellido Materno</label>
                                                <input type="text" class="form-control" id="detallePostulanteApellidoMaterno" disabled>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <!-- CURP -->
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label fw-bold">CURP</label>
                                                <input type="text" class="form-control text-uppercase" id="detallePostulanteCURP" maxlength="18" disabled>
                                            </div>
                                            <!-- Correo -->
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label fw-bold">Correo Electrónico</label>
                                                <input type="email" class="form-control" id="detallePostulanteCorreo" disabled>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <!-- Teléfono -->
                                            <div class="col-md-4 mb-3">
                                                <label class="form-label fw-bold">Teléfono Principal</label>
                                                <input type="tel" class="form-control" id="detallePostulanteTelefono" maxlength="10" disabled>
                                                <small class="text-muted">10 dígitos</small>
                                            </div>
                                            <!-- Estado -->
                                            <div class="col-md-4 mb-3">
                                                <label class="form-label fw-bold">Estado</label>
                                                <input type="text" class="form-control" id="detallePostulanteEstado" disabled>
                                            </div>
                                            <!-- Ciudad -->
                                            <div class="col-md-4 mb-3">
                                                <label class="form-label fw-bold">Ciudad</label>
                                                <input type="text" class="form-control" id="detallePostulanteCiudad" disabled>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <!-- Código Postal -->
                                            <div class="col-md-3 mb-3">
                                                <label class="form-label fw-bold">Código Postal</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="detallePostulanteCP" maxlength="5" disabled>
                                                    <button class="btn btn-outline-secondary" type="button" id="btnBuscarCP" onclick="PostulanteEditor.buscarCodigoPostal()" style="display: none;">
                                                        <i class="material-icons-outlined" style="font-size: 18px;">search</i>
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- Colonia -->
                                            <div class="col-md-3 mb-3">
                                                <label class="form-label fw-bold">Colonia</label>
                                                <select class="form-select" id="detallePostulanteColonia" disabled>
                                                    <option value="">Seleccionar...</option>
                                                </select>
                                            </div>
                                            <div class="col-md-3 mb-3">
                                                <label class="form-label fw-bold">Num. Exterior</label>
                                                <input type="text" class="form-control" id="detallePostulanteNumeroExterior" disabled>
                                            </div>
                                            <div class="col-md-3 mb-3">
                                                <label class="form-label fw-bold">Num. Interior</label>
                                                <input type="text" class="form-control" id="detallePostulanteNumeroInterior" disabled>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label fw-bold">Calle</label>
                                                <input type="text" class="form-control" id="detallePostulanteCalle" disabled>
                                            </div>
                                        </div>
                                        <input type="hidden" id="detallePostulanteDireccion" disabled>
                                        <div class="row">
                                            <div class="col-md-12 mb-3">
                                                <label class="form-label fw-bold">Preview direccion final</label>
                                                <div id="detalleDireccionPreview" class="form-control bg-light" style="min-height: 38px;">-</div>
                                            </div>
                                        </div>

                                        <!-- Botones de Acción -->
                                        <div class="row mt-3" id="botonesAccionPostulante" style="display: none;">
                                            <div class="col-12 text-end">
                                                <button type="button" class="btn btn-secondary me-2" onclick="PostulanteEditor.cancelarEdicion()">
                                                    <i class="material-icons-outlined align-middle" style="font-size: 18px;">close</i> Cancelar
                                                </button>
                                                <button type="button" class="btn btn-success" onclick="PostulanteEditor.guardarCambiosPostulante()">
                                                    <i class="material-icons-outlined align-middle" style="font-size: 18px;">save</i> Guardar Cambios
                                                </button>
                                            </div>
                                        </div>

                                        <!-- Gestión de Teléfonos -->
                                        <div class="row mt-4 pt-3 border-top">
                                            <div class="col-12">
                                                <h6 class="mb-3">
                                                    <i class="material-icons-outlined align-middle" style="font-size: 18px;">phone</i>
                                                    Historial de Teléfonos
                                                </h6>
                                                <div id="seccionTelefonos">
                                                    <p class="text-muted small">Cargando teléfonos...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Historial de Vacantes -->
                        <div class="row">
                            <div class="col">
                                <div class="card todo-container">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <i class="material-icons-outlined align-middle" style="font-size: 20px;">work_history</i>
                                            Historial de Postulaciones
                                        </h5>
                                    </div>
                                    <div class="card-body p-0">
                                        <div class="row g-0">
                                            <div class="col-xl-4 col-xxl-3">
                                                <div class="todo-menu">
                                                    <h5 class="todo-menu-title">Vacantes</h5>
                                                    <ul class="list-unstyled todo-status-filter" id="vacantesList">
                                                        <li><a href="#" class="active"><i class="material-icons-outlined">hourglass_empty</i>Cargando...</a></li>
                                                    </ul>
                                                    <div class="mt-4 pt-3 border-top">
                                                        <h5 class="todo-menu-title mb-3">Documentos</h5>
                                                        <div id="contenedorBotonesDocumentos">
                                                            <div class="text-muted small">Selecciona una vacante</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-8 col-xxl-9">
                                                <div class="todo-list p-4">
                                                    <h4 id="tituloVacante" class="mb-4">Selecciona una vacante</h4>
                                                    <div id="timelineProcesos">
                                                        <!-- Línea del tiempo se insertará aquí -->
                                                        <div class="text-muted small">Cargando...</div>
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
        </div>
    </div>

    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>

    <script>
        const ID_POSTULANTE = <?php echo $idPostulante; ?>;
        const NO_EMPLEADO = <?php echo isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0; ?>;
    </script>
    <script src="scripts/PostulanteEditor.js?v=5"></script>
    <script src="scripts/PostulanteDetalle.js?v=5"></script>
</body>

</html>
