<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Tipo de Documentación - PIP</title>
    
    <!-- Styles neptune -->
    <?php include("neptune_styles.php"); ?>
    
    <!-- Styles adicionales -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
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
                    <div class="container">
                        <!-- Mensajes -->
                        <div class="row">
                            <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">
                                <div class="row">
                                    <div class="col s12 l12" style="position: relative;">
                                        <div id="contenidoMensajes" style="margin-right:2vh"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Título -->
                        <div class="row">
                            <div class="col">
                                <div class="page-description">
                                    <h1>Catálogo de Tipo de Documentación</h1>
                                    <p class="text-muted">Administración de documentos requeridos para empleados</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tabla de tipos de documentación -->
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">description</span>
                                            Listado de Tipos de Documento
                                        </h5>
                                        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalAddTipoDocumento">
                                            <span class="material-symbols-outlined align-middle me-1">add</span>
                                            Nuevo Tipo de Documento
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tableTipoDocumentacion" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre del Documento</th>
                                                        <th>Obligatorio</th>
                                                        <th>Estatus</th>
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
    
    <!-- Modal Agregar Tipo de Documento -->
    <div class="modal fade" id="modalAddTipoDocumento" tabindex="-1" aria-labelledby="modalAddTipoDocumentoLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddTipoDocumentoLabel">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nuevo Tipo de Documento
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre del Documento: <span class="text-danger">*</span></label>
                        <input id="txtNombreDocumento" type="text" class="form-control" placeholder="Ej. Acta de nacimiento, CURP, RFC">
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="chkObligatorio">
                            <label class="form-check-label fw-bold" for="chkObligatorio">
                                ¿Es documento obligatorio?
                            </label>
                        </div>
                        <small class="text-muted">Si está activado, el empleado debe entregar este documento obligatoriamente.</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success" id="btnAddTipoDocumento">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Tipo de Documento -->
    <div class="modal fade" id="modalEditTipoDocumento" tabindex="-1" aria-labelledby="modalEditTipoDocumentoLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditTipoDocumentoLabel">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Tipo de Documento
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIdTipoDocumento">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre del Documento: <span class="text-danger">*</span></label>
                        <input id="editNombreDocumento" type="text" class="form-control" placeholder="Nombre del documento">
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="editObligatorio">
                            <label class="form-check-label fw-bold" for="editObligatorio">
                                ¿Es documento obligatorio?
                            </label>
                        </div>
                        <small class="text-muted">Si está activado, el empleado debe entregar este documento obligatoriamente.</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-primary" id="btnSaveEdit">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/TipoDocumentacion.js?v=<?php echo time(); ?>"></script>
</body>

</html>
