<?php 
include("AutorizaPagina.php"); 
$noEmpleado = isset($_GET['NoEmpleado']) ? intval($_GET['NoEmpleado']) : 0;

// Obtener nombre del empleado
$nombreEmpleado = '';
if ($noEmpleado > 0) {
    require_once('Backend/Conexiones/Conexiones.php');
    $conn = new Conexiones();
    $datosEmpleado = $conn->SelectNotClose("SELECT Nombre FROM Empleados WHERE NoEmpleado = $noEmpleado");
    if (!empty($datosEmpleado)) {
        $nombreEmpleado = trim($datosEmpleado[0]['Nombre']);
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
    <title>Documentación del Empleado - PIP</title>
    
    <?php include("neptune_styles.php"); ?>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- Preloader -->
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>
        
        <!-- Menu -->
        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>
        
        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container-fluid">
                        <!-- Encabezado -->
                        <div class="row mb-3">
                            <div class="col">
                                <div class="page-description">
                                    <h1>
                                        <span class="material-icons-outlined align-middle" style="font-size: 32px; color: #f5a623;">folder_shared</span>
                                        Documentación de <?php echo htmlspecialchars($nombreEmpleado ?: 'Empleado'); ?>
                                    </h1>
                                    <p class="text-muted">Control de documentos del empleado No. <?php echo $noEmpleado; ?>. Los documentos se cargan automáticamente del catálogo.</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end align-items-start">
                                <a href="Personal.php" class="btn btn-regresar-custom btn-sm">
                                    <i class="material-icons-outlined align-middle" style="font-size: 18px;">arrow_back</i> Regresar
                                </a>
                            </div>
                        </div>
                        
                        <!-- Tabla de documentación inteligente -->
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">description</span>
                                            Control de Documentos
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tableDocumentacion" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Tipo de Documento</th>
                                                        <th>Estatus</th>
                                                        <th>Fecha de Carga</th>
                                                        <th>Observaciones</th>
                                                        <th>Acciones</th>
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
        </div>
    </div>
    
    <!-- Modal Marcar como Entregado -->
    <div class="modal fade" id="modalMarcarDocumento" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span class="material-symbols-outlined align-middle me-2">check_circle</span>
                        Marcar Documento
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="marcarIdTipoDocumento">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Documento:</label>
                        <input id="marcarNombreDocumento" type="text" class="form-control" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Estatus: <span class="text-danger">*</span></label>
                        <select id="marcarEstatus" class="form-select">
                            <option value="Completo">Completo</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencido">Vencido</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Fecha de Carga:</label>
                        <input id="marcarFechaCarga" type="date" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Observaciones:</label>
                        <textarea id="marcarObservaciones" class="form-control" rows="3" placeholder="Observaciones opcionales..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span> Cancelar
                    </button>
                    <button type="button" class="btn btn-success" onclick="marcarDocumentoEntregado()">
                        <span class="material-symbols-outlined align-middle me-1">check_circle</span> Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Estatus -->
    <div class="modal fade" id="modalEditarEstatus" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Documento
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editarIdTipoDocumento">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Documento:</label>
                        <input id="editarNombreDocumento" type="text" class="form-control" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Estatus: <span class="text-danger">*</span></label>
                        <select id="editarEstatus" class="form-select">
                            <option value="Completo">Completo</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencido">Vencido</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Fecha de Carga:</label>
                        <input id="editarFechaCarga" type="date" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Observaciones:</label>
                        <textarea id="editarObservaciones" class="form-control" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span> Cancelar
                    </button>
                    <button type="button" class="btn btn-primary" onclick="guardarEdicionEstatus()">
                        <span class="material-symbols-outlined align-middle me-1">save</span> Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Neptune JS -->
    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>
    
    <script>
        const NO_EMPLEADO_DOC = <?php echo $noEmpleado; ?>;
    </script>
    <script src="scripts/DocumentacionEmpleados.js?v=<?php echo time(); ?>"></script>
</body>

</html>
