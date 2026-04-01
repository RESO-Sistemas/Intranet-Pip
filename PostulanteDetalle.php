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
                        <div class="row">
                            <div class="col">
                                <div class="card todo-container">
                                    <div class="row">
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

    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>

    <script>
        const ID_POSTULANTE = <?php echo $idPostulante; ?>;
        const NO_EMPLEADO = <?php echo isset($_SESSION['NoEmpleado']) ? intval($_SESSION['NoEmpleado']) : 0; ?>;
    </script>
    <script src="scripts/PostulanteDetalle.js"></script>
</body>

</html>