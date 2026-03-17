<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Inducciones - PIP</title>
    
    <!-- Styles neptune -->
    <?php include("neptune_styles.php"); ?>
    
    <!-- Styles adicionales -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="assets/libs/select2/dist/css/select2.min.css" rel="stylesheet">
    
    <style>
        .select2-container--default .select2-selection--multiple {
            min-height: 38px;
            border: 1px solid #ced4da;
        }
        .material-item, .audiovisual-item {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 10px;
            background: #f8f9fa;
        }
        .material-item:hover, .audiovisual-item:hover {
            background: #e9ecef;
        }
        .btn-icon-only {
            padding: 5px 10px;
        }
    </style>
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
                                    <h1>Módulo de Inducciones</h1>
                                    <p class="text-muted">Gestión del proceso de incorporación y capacitación inicial de empleados</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tabla de inducciones -->
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">list</span>
                                            Listado de Inducciones
                                        </h5>
                                        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalAddInduccion">
                                            <span class="material-symbols-outlined align-middle me-1">add</span>
                                            Nueva Inducción
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tableInducciones" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre</th>
                                                        <th>Área Técnica</th>
                                                        <th>Duración</th>
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
    
    <!-- Modal Agregar Inducción -->
    <div class="modal fade" id="modalAddInduccion" tabindex="-1" aria-labelledby="modalAddInduccionLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddInduccionLabel">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nueva Inducción
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-3">
                            <label class="form-label fw-bold">Nombre de la Inducción: <span class="text-danger">*</span></label>
                            <input id="txtNombreInduccion" type="text" class="form-control" placeholder="Ej. Inducción General, Capacitación Seguridad">
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <label class="form-label fw-bold">Área Técnica:</label>
                            <select id="selectAreaTecnica" class="form-select">
                                <option value="">Seleccione un área técnica</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-8 mb-3">
                            <label class="form-label fw-bold">Puesto(s) Aplicable(s):</label>
                            <select id="selectPuestos" class="form-select" multiple="multiple" style="width: 100%;">
                            </select>
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label class="form-label fw-bold">Duración Estimada:</label>
                            <input id="txtDuracion" type="text" class="form-control" placeholder="Ej. 2 horas, 3 días">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label class="form-label fw-bold">Descripción:</label>
                            <textarea id="txtDescripcion" class="form-control" rows="3" placeholder="Objetivo y alcance del contenido"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success" id="btnAddInduccion">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Inducción -->
    <div class="modal fade" id="modalEditInduccion" tabindex="-1" aria-labelledby="modalEditInduccionLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditInduccionLabel">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Inducción
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIdInduccion">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-3">
                            <label class="form-label fw-bold">Nombre de la Inducción: <span class="text-danger">*</span></label>
                            <input id="editNombreInduccion" type="text" class="form-control">
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <label class="form-label fw-bold">Área Técnica:</label>
                            <select id="editAreaTecnica" class="form-select">
                                <option value="">Seleccione un área técnica</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-8 mb-3">
                            <label class="form-label fw-bold">Puesto(s) Aplicable(s):</label>
                            <select id="editPuestos" class="form-select" multiple="multiple" style="width: 100%;">
                            </select>
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label class="form-label fw-bold">Duración Estimada:</label>
                            <input id="editDuracion" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label class="form-label fw-bold">Descripción:</label>
                            <textarea id="editDescripcion" class="form-control" rows="3"></textarea>
                        </div>
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
    
    <!-- Modal Gestionar Contenido (Materiales y Audiovisual) -->
    <div class="modal fade" id="modalContenido" tabindex="-1" aria-labelledby="modalContenidoLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title" id="modalContenidoLabel">
                        <span class="material-symbols-outlined align-middle me-2">folder_open</span>
                        Gestionar Contenido - <span id="nombreInduccionContenido"></span>
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="contenidoIdInduccion">
                    
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" id="tabContenido" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="materiales-tab" data-bs-toggle="tab" data-bs-target="#materiales" type="button" role="tab">
                                <span class="material-symbols-outlined align-middle me-1">attach_file</span>
                                Materiales de Apoyo
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="audiovisual-tab" data-bs-toggle="tab" data-bs-target="#audiovisual" type="button" role="tab">
                                <span class="material-symbols-outlined align-middle me-1">play_circle</span>
                                Contenido Audiovisual
                            </button>
                        </li>
                    </ul>
                    
                    <!-- Tab content -->
                    <div class="tab-content mt-3" id="tabContenidoContent">
                        <!-- Tab Materiales -->
                        <div class="tab-pane fade show active" id="materiales" role="tabpanel">
                            <div class="row mb-3">
                                <div class="col-12 col-md-8">
                                    <input type="file" id="inputMaterial" class="form-control" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif">
                                </div>
                                <div class="col-12 col-md-4">
                                    <button type="button" class="btn btn-success w-100" id="btnAddMaterial">
                                        <span class="material-symbols-outlined align-middle me-1">upload_file</span>
                                        Subir Material
                                    </button>
                                </div>
                            </div>
                            <small class="text-muted">Formatos permitidos: PDF, Word, Excel, PowerPoint, Imágenes (JPG, PNG, GIF)</small>
                            <hr>
                            <div id="listaMateriales">
                                <!-- Se carga dinámicamente -->
                            </div>
                        </div>
                        
                        <!-- Tab Audiovisual -->
                        <div class="tab-pane fade" id="audiovisual" role="tabpanel">
                            <div class="row mb-3">
                                <div class="col-12 col-md-4 mb-2">
                                    <label class="form-label">Título del Video:</label>
                                    <input type="text" id="txtTituloVideo" class="form-control" placeholder="Ej. Video de bienvenida">
                                </div>
                                <div class="col-12 col-md-4 mb-2">
                                    <label class="form-label">Enlace: <span class="text-danger">*</span></label>
                                    <input type="url" id="txtEnlaceVideo" class="form-control" placeholder="https://www.youtube.com/watch?v=...">
                                </div>
                                <div class="col-12 col-md-2 mb-2">
                                    <label class="form-label">Plataforma:</label>
                                    <select id="selectPlataforma" class="form-select">
                                        <option value="YouTube">YouTube</option>
                                        <option value="Vimeo">Vimeo</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div class="col-12 col-md-2 d-flex align-items-end mb-2">
                                    <button type="button" class="btn btn-success w-100" id="btnAddAudiovisual">
                                        <span class="material-symbols-outlined align-middle me-1">add</span>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            <hr>
                            <div id="listaAudiovisuales">
                                <!-- Se carga dinámicamente -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Neptune Javascripts -->
    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>
    
    <!-- Scripts específicos de esta página -->
    <script src="scripts/Inducciones.js"></script>
</body>

</html>
