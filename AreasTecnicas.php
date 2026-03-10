<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
    <title>Áreas Técnicas - Klyns Intranet</title>
    
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
                <p class="loader__label">Klyns</p>
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
                                    <h1>Catálogo de Áreas Técnicas</h1>
                                    <p class="text-muted">Administración de áreas técnicas para el módulo de vacantes</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tabla de áreas técnicas -->
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">list</span>
                                            Listado de Áreas Técnicas
                                        </h5>
                                        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalAddAreaTecnica">
                                            <span class="material-symbols-outlined align-middle me-1">add</span>
                                            Nueva Área Técnica
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tableAreasTecnicas" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre del Área</th>
                                                        <th>Descripción</th>
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
    
    <!-- Modal Agregar Área Técnica -->
    <div class="modal fade" id="modalAddAreaTecnica" tabindex="-1" aria-labelledby="modalAddAreaTecnicaLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title" id="modalAddAreaTecnicaLabel">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nueva Área Técnica
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre del Área Técnica: <span class="text-danger">*</span></label>
                        <input id="txtNombreArea" type="text" class="form-control" placeholder="Ej. Mantenimiento, Sistemas, Producción">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción:</label>
                        <textarea id="txtDescripcion" class="form-control" rows="3" placeholder="Breve descripción de la función del área"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success" id="btnAddAreaTecnica">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Área Técnica -->
    <div class="modal fade" id="modalEditAreaTecnica" tabindex="-1" aria-labelledby="modalEditAreaTecnicaLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title" id="modalEditAreaTecnicaLabel">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Área Técnica
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIdAreaTecnica">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre del Área Técnica: <span class="text-danger">*</span></label>
                        <input id="editNombreArea" type="text" class="form-control" placeholder="Nombre del área">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción:</label>
                        <textarea id="editDescripcion" class="form-control" rows="3" placeholder="Descripción del área"></textarea>
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
    <script src="scripts/AreasTecnicas.js"></script>
</body>

</html>
