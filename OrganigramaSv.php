<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Editor Organigrama · PIP</title>
    <?php include("neptune_styles.php"); ?>
    <style>
    /* ── Layout full-screen ───────────────────────────── */
    .org-editor-page .content-wrapper { padding: 0 !important; overflow: hidden; }
    .org-editor-page .app-content     { padding: 0 !important; overflow: hidden; }

    .org-editor-root {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 60px);
        background: #f0f4f8;
        overflow: hidden;
    }

    /* ── Toolbar ──────────────────────────────────────── */
    .org-toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: #fff;
        border-bottom: 1px solid #e2e8f0;
        box-shadow: 0 1px 4px rgba(0,0,0,.05);
        flex-shrink: 0;
        z-index: 20;
        flex-wrap: wrap;
    }
    .org-back-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #64748b;
        text-decoration: none;
        font-size: 13px;
        padding: 5px 10px;
        border-radius: 8px;
        transition: background .15s;
        white-space: nowrap;
    }
    .org-back-btn:hover { background: #f1f5f9; color: #1e293b; }
    .org-back-btn .material-symbols-outlined { font-size: 16px; }

    .org-toolbar-divider { width: 1px; height: 24px; background: #e2e8f0; flex-shrink: 0; }
    .org-toolbar-spacer  { flex: 1; }

    .org-title-wrap { position: relative; }
    #orgTitulo {
        font-size: 14px;
        font-weight: 600;
        color: #1e293b;
        padding: 4px 30px 4px 8px;
        border-radius: 8px;
        border: 1px solid transparent;
        min-width: 140px;
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: text;
        transition: border-color .15s, background .15s;
        outline: none;
    }
    #orgTitulo:hover { border-color: #cbd5e1; }
    #orgTitulo:focus { border-color: #3b82f6; background: #f8fafc; }
    .org-title-save-btn {
        display: none;
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        color: #6c757d;
        border: 1px dashed #adb5bd;
        border-radius: 5px;
        padding: 2px 5px;
        cursor: pointer;
        font-size: 11px;
        transition: all 0.2s ease;
    }
    .org-title-save-btn:hover {
        border-color: #008837;
        color: #1a1a2e;
        background: #fff9e6;
    }
    #orgTitulo:focus ~ .org-title-save-btn { display: block; }

    .org-toolbar-actions { display: flex; align-items: center; gap: 6px; }
    .tb-btn {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        border: 1px solid #e2e8f0;
        background: #f8fafc;
        color: #64748b;
        cursor: pointer;
        transition: all .15s;
        white-space: nowrap;
    }
    .tb-btn:hover { background: #f1f5f9; color: #1e293b; }
    .tb-btn .material-symbols-outlined { font-size: 16px; }
    .tb-btn-primary { background: #008837; border-color: #008837; color: #1a1a1a; }
    .tb-btn-primary:hover { background: #7EBF8E; border-color: #7EBF8E; }

    /* ── Editor main ──────────────────────────────────── */
    .org-editor-main {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
    }

    /* ── Left panel ───────────────────────────────────── */
    .org-left-panel {
        width: 260px;
        flex-shrink: 0;
        background: #fff;
        border-right: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: width .2s ease, opacity .2s;
    }
    .org-left-panel.collapsed { width: 0; opacity: 0; pointer-events: none; }

    .org-panel-toggle {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 18px;
        height: 44px;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-left: none;
        border-radius: 0 8px 8px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 0 6px rgba(0,0,0,.06);
    }
    .org-panel-toggle .material-symbols-outlined { font-size: 14px; color: #94a3b8; }

    .org-section-header {
        padding: 10px 14px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .07em;
        text-transform: uppercase;
        color: #94a3b8;
        border-bottom: 1px solid #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .org-tree-section {
        flex: 1;
        overflow-y: auto;
        padding: 6px;
    }
    .org-tree-section::-webkit-scrollbar { width: 4px; }
    .org-tree-section::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

    .org-tree-root, .org-tree-children {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .org-tree-children {
        margin-left: 14px;
        border-left: 1px dashed #e2e8f0;
        padding-left: 6px;
    }
    .org-tree-node {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 6px;
        border-radius: 7px;
        cursor: pointer;
        transition: background .1s;
        font-size: 12px;
        color: #374151;
    }
    .org-tree-node:hover { background: #f1f5f9; }
    .org-tree-node.active { background: #eff6ff; color: #1d4ed8; }
    .org-tree-node img { width: 22px; height: 22px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .org-tree-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .org-tree-toggle {
        width: 16px; height: 16px; flex-shrink: 0;
        background: none; border: none; padding: 0;
        color: #94a3b8; cursor: pointer; display: flex;
        align-items: center; justify-content: center;
    }
    .org-tree-toggle .material-symbols-outlined { font-size: 14px; }
    .org-tree-delete {
        opacity: 0;
        background: none; border: none; padding: 0;
        color: #ef4444; cursor: pointer; display: flex;
        align-items: center; flex-shrink: 0;
        transition: opacity .1s;
    }
    .org-tree-node:hover .org-tree-delete { opacity: 1; }
    .org-tree-delete .material-symbols-outlined { font-size: 14px; }

    .tipo-dot {
        width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
    }
    .tipo-dot.principal { background: #22c55e; }
    .tipo-dot.empleado  { background: #008837; }
    .tipo-dot.otros     { background: #a855f7; }

    /* ── Search section ───────────────────────────────── */
    .org-search-section {
        border-bottom: 1px solid #f1f5f9;
        padding: 8px;
        flex-shrink: 0;
    }
    .org-search-wrap { position: relative; }
    .org-search-wrap .material-symbols-outlined {
        position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
        font-size: 15px; color: #94a3b8; pointer-events: none;
    }
    .org-search-inp {
        width: 100%;
        padding: 6px 8px 6px 28px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 12px;
        outline: none;
        transition: border-color .15s;
    }
    .org-search-inp:focus { border-color: #3b82f6; }
    .org-search-results { max-height: 180px; overflow-y: auto; margin-top: 4px; }
    .org-search-results::-webkit-scrollbar { width: 4px; }
    .org-search-results::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
    .org-search-result {
        display: flex; align-items: center; gap: 8px;
        padding: 5px 6px; border-radius: 7px; font-size: 12px;
    }
    .org-search-result img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
    .org-search-result-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #374151; }
    .org-search-add-btn {
        width: 22px; height: 22px; border-radius: 50%;
        background: transparent; color: #6c757d; border: 1px dashed #adb5bd;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; cursor: pointer; transition: all 0.2s ease;
    }
    .org-search-add-btn:hover {
        border-color: #008837;
        color: #1a1a2e;
        background: #fff9e6;
    }
    .org-search-add-btn .material-symbols-outlined { font-size: 13px; }

    /* ── Zoom controls flotantes ─────────────────────────── */
    .sv-zoom-controls {
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        z-index: 10;
    }
    .sv-zoom-btn {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        border: 1.5px solid #e2e8f0;
        background: #fff;
        color: #475569;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,.08);
        transition: all .15s;
        padding: 0;
    }
    .sv-zoom-btn:hover {
        background: #008837;
        border-color: #008837;
        color: #111;
    }
    .sv-zoom-btn .material-symbols-outlined { font-size: 16px; }

    /* ── Canvas ───────────────────────────────────────── */
    .org-canvas-wrapper {
        flex: 1;
        overflow: hidden;
        position: relative;
    }
    #element { width: 100%; height: 100%; }

    /* Empty state overlay */
    .org-empty-overlay {
        position: absolute; inset: 0;
        background: rgba(240,244,248,.95);
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 16px; z-index: 5;
        text-align: center; padding: 40px;
    }
    .org-empty-overlay .material-symbols-outlined { font-size: 72px; color: #cbd5e1; }
    .org-empty-overlay h3 { font-size: 18px; color: #475569; margin: 0; font-weight: 600; }
    .org-empty-overlay p { font-size: 14px; color: #94a3b8; margin: 0; max-width: 280px; }

    /* ── Right panel ──────────────────────────────────── */
    .org-right-panel {
        width: 0;
        overflow: hidden;
        background: #fff;
        border-left: 1px solid #e2e8f0;
        transition: width .2s ease;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
    }
    .org-right-panel.open { width: 250px; }

    .org-prop-header {
        padding: 14px 16px;
        border-bottom: 1px solid #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
    }
    .org-prop-header span { font-size: 10px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #94a3b8; }
    .org-prop-close { background: none; border: none; padding: 0; color: #94a3b8; cursor: pointer; display: flex; }
    .org-prop-close .material-symbols-outlined { font-size: 18px; }

    .org-prop-emp {
        padding: 20px 16px;
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        border-bottom: 1px solid #f1f5f9;
        flex-shrink: 0;
    }
    
    .org-prop-name { font-size: 14px; font-weight: 600; color: #1e293b; text-align: center; }
    .org-prop-role { font-size: 12px; color: #64748b; text-align: center; }
    .org-prop-tipo {
        font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
        padding: 2px 8px; border-radius: 20px;
    }
    .org-prop-tipo.principal { background: #dcfce7; color: #15803d; }
    .org-prop-tipo.empleado  { background: #fef9c3; color: #854d0e; }
    .org-prop-tipo.otros     { background: #f3e8ff; color: #7e22ce; }

    .org-prop-actions {
        padding: 12px;
        display: flex; flex-direction: column; gap: 6px;
        overflow-y: auto; flex: 1;
    }
    .org-prop-actions::-webkit-scrollbar { width: 4px; }
    .org-prop-actions::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

    .prop-btn {
        display: flex; align-items: center; gap: 8px;
        padding: 9px 12px; border-radius: 9px;
        font-size: 13px; font-weight: 500;
        border: none; cursor: pointer; width: 100%;
        transition: all .15s;
    }
    .prop-btn .material-symbols-outlined { font-size: 16px; }
    .prop-btn-blue   { background: transparent; color: #6c757d; border: 1px dashed #adb5bd; }
    .prop-btn-blue:hover   { border-color: #008837; color: #1a1a2e; background: #fff9e6; }
    .prop-btn-yellow { background: #f0fdf4; color: #047857; }
    .prop-btn-yellow:hover { background: #D1FAE5; }
    .prop-btn-red    { background: #fff1f2; color: #e11d48; }
    .prop-btn-red:hover    { background: #ffe4e6; }

    /* ── Offcanvas ────────────────────────────────────── */
    .org-oc-header {
        padding: 16px 20px;
        color: #fff;
    }
    .org-oc-header-add { background: #008837; }
    .org-oc-header-edit { background: linear-gradient(135deg,#6d28d9 0%,#a855f7 100%); }
    .org-oc-header h5 { margin: 0; font-size: 15px; font-weight: 600; }
    .org-oc-header .btn-close { filter: invert(1); }

    .tipo-pills {
        display: flex; gap: 6px; margin-top: 4px;
    }
    .tipo-pill {
        flex: 1; display: flex; flex-direction: column;
        align-items: center; gap: 4px;
        padding: 10px 6px; border: 2px solid #e2e8f0;
        border-radius: 10px; cursor: pointer;
        transition: all .15s; text-align: center;
        font-size: 12px; font-weight: 500; color: #64748b;
        background: #f8fafc;
    }
    .tipo-pill input[type=radio] { display: none; }
    .tipo-pill .material-symbols-outlined { font-size: 20px; }
    .tipo-pill:hover { border-color: #cbd5e1; background: #f1f5f9; }
    .tipo-pill.active-1 { border-color: #22c55e; background: #f0fdf4; color: #15803d; }
    .tipo-pill.active-2 { border-color: #008837; background: #f0fdf4; color: #92400e; }
    .tipo-pill.active-3 { border-color: #a855f7; background: #faf5ff; color: #7e22ce; }

    /* Select2 custom */
    .select2-container { width: 100% !important; }
    .select2-container--default .select2-selection--single {
        height: 40px; border: 1px solid #e2e8f0; border-radius: 8px;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 38px; padding-left: 12px; font-size: 13px; color: #374151;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow { height: 38px; }
    .select2-container--default.select2-container--focus .select2-selection--single { border-color: #3b82f6; }

    .select2-emp-option { display: flex; align-items: center; gap: 8px; padding: 2px 0; }
    .select2-emp-option img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }
    </style>
</head>

<body class="org-editor-page">
<div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <div id="Menu"><?php include("menus.php"); ?></div>

    <div class="app-container">
        <?php include("includes/_Header.php"); ?>
        <div class="app-content">

            <div class="org-editor-root">

                <!-- ── Toolbar ── -->
                <div class="org-toolbar">
                    <a href="ControlOrganigrama.php" class="org-back-btn">
                        <span class="material-symbols-outlined">arrow_back</span>
                        Organigramas
                    </a>
                    <div class="org-toolbar-divider"></div>
                    <div class="org-title-wrap">
                        <span id="orgTitulo" contenteditable="true" title="Click para editar el título">Cargando…</span>
                        <button class="org-title-save-btn" id="btnSaveTitle" title="Guardar título">✓</button>
                    </div>
                    <div class="org-toolbar-spacer"></div>
                    <div class="org-toolbar-actions">
                        <button class="tb-btn" id="btnAutoLayout" title="Reorganizar automáticamente">
                            <span class="material-symbols-outlined">auto_awesome_mosaic</span>
                            Auto-layout
                        </button>
                        <button class="tb-btn" id="btnExportar" title="Exportar como imagen PNG">
                            <span class="material-symbols-outlined">download</span>
                            Exportar PNG
                        </button>
                        <button class="tb-btn tb-btn-primary" id="btnAddEmpleadoMain">
                            <span class="material-symbols-outlined">person_add</span>
                            Agregar
                        </button>
                    </div>
                </div>

                <!-- ── Main editor area ── -->
                <div class="org-editor-main">

                    <!-- Left panel -->
                    <div class="org-left-panel" id="orgLeftPanel">
                        <div class="org-section-header">
                            <span>Estructura</span>
                            <button class="org-panel-toggle" id="btnToggleLeftPanel" style="position:static;width:auto;height:auto;border:none;box-shadow:none;border-radius:6px;padding:2px 4px;">
                                <span class="material-symbols-outlined" style="font-size:16px;color:#94a3b8">chevron_left</span>
                            </button>
                        </div>

                        <div class="org-search-section">
                            <div style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#94a3b8;margin-bottom:6px;">Agregar empleado</div>
                            <div class="org-search-wrap">
                                <span class="material-symbols-outlined">search</span>
                                <input type="text" class="org-search-inp" id="orgEmpSearchInput" placeholder="Buscar por nombre…">
                            </div>
                            <div class="org-search-results" id="orgSearchResults"></div>
                        </div>

                        <div class="org-tree-section" id="orgTreeContent">
                            <div style="padding:20px 10px;text-align:center;">
                                <span class="material-symbols-outlined" style="font-size:32px;color:#e2e8f0">account_tree</span>
                                <div style="font-size:12px;color:#94a3b8;margin-top:6px;">Sin nodos</div>
                            </div>
                        </div>
                    </div>

                    <!-- Canvas -->
                    <div class="org-canvas-wrapper" id="orgCanvasWrapper">
                        <button class="org-panel-toggle" id="btnTogglePanelCanvas" title="Mostrar/ocultar panel">
                            <span class="material-symbols-outlined" id="togglePanelIcon">chevron_left</span>
                        </button>

                        <div id="element"></div>

                        <!-- Botones zoom flotantes -->
                        <div class="sv-zoom-controls">
                            <button class="sv-zoom-btn" onclick="svZoomIn()" title="Acercar">
                                <span class="material-symbols-outlined">add</span>
                            </button>
                            <button class="sv-zoom-btn" onclick="svZoomOut()" title="Alejar">
                                <span class="material-symbols-outlined">remove</span>
                            </button>
                            <button class="sv-zoom-btn" onclick="svFit()" title="Ajustar a pantalla">
                                <span class="material-symbols-outlined">fit_screen</span>
                            </button>
                        </div>

                        <div class="org-empty-overlay" id="orgEmptyOverlay" style="display:none;">
                            <span class="material-symbols-outlined">account_tree</span>
                            <h3>Organigrama vacío</h3>
                            <p>Agrega el primer empleado principal para comenzar.</p>
                            <button class="tb-btn btn-ghost" id="btnAddEmpleadoEmpty">
                                <span class="material-symbols-outlined">person_add</span>
                                Agregar primer empleado
                            </button>
                        </div>
                    </div>

                    <!-- Right panel: properties -->
                    <div class="org-right-panel" id="orgRightPanel">
                        <div class="org-prop-header">
                            <span>Propiedades</span>
                            <button class="org-prop-close" id="btnCloseProps">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <input type="hidden" id="propNodeRawId">
                        <div class="org-prop-emp">
                            <span id="propEmpInitials" style="display:flex;width:52px;height:52px;border-radius:50%;background:#008837;color:#111;font-size:16px;font-weight:800;align-items:center;justify-content:center;letter-spacing:-1px;">?</span>
                            <div class="org-prop-name" id="propEmpName">—</div>
                            <div class="org-prop-role" id="propEmpRole">—</div>
                            <div class="org-prop-tipo" id="propEmpTipo">—</div>
                        </div>
                        <div class="org-prop-actions">
                            <button class="prop-btn prop-btn-blue" id="propBtnAgregar">
                                <span class="material-symbols-outlined">person_add</span>
                                Agregar bajo este nodo
                            </button>
                            <button class="prop-btn prop-btn-yellow" id="propBtnEditar">
                                <span class="material-symbols-outlined">edit</span>
                                Editar nodo
                            </button>
                            <button class="prop-btn prop-btn-red" id="propBtnEliminar">
                                <span class="material-symbols-outlined">delete</span>
                                Eliminar nodo
                            </button>
                        </div>
                    </div>

                </div><!-- /.org-editor-main -->
            </div><!-- /.org-editor-root -->

        </div><!-- /.app-content -->
    </div><!-- /.app-container -->

    <!-- ── Offcanvas: Agregar ── -->
    <div class="offcanvas offcanvas-end" id="offcanvasAgregar" tabindex="-1" style="width:360px;">
        <div class="offcanvas-header org-oc-header org-oc-header-add">
            <h5>Agregar al organigrama</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column gap-4">

            <div>
                <label class="form-label fw-semibold mb-2" style="font-size:13px;">Tipo de nodo</label>
                <div class="tipo-pills" id="addTipoPills">
                    <label class="tipo-pill" id="addPillPrincipal">
                        <input type="radio" name="tipoEmpAdd" value="1">
                        <span class="material-symbols-outlined" style="color:#22c55e">star</span>
                        Principal
                    </label>
                    <label class="tipo-pill active-2" id="addPillEmpleado">
                        <input type="radio" name="tipoEmpAdd" value="2" checked>
                        <span class="material-symbols-outlined" style="color:#008837">person</span>
                        Empleado
                    </label>
                    <label class="tipo-pill" id="addPillOtros">
                        <input type="radio" name="tipoEmpAdd" value="3">
                        <span class="material-symbols-outlined" style="color:#a855f7">label</span>
                        Otros
                    </label>
                </div>
            </div>

            <div id="addEmpSection">
                <label class="form-label fw-semibold mb-1" style="font-size:13px;">Empleado</label>
                <select id="addEmpSelect" style="width:100%;">
                    <option value="">Escriba para buscar…</option>
                </select>
            </div>

            <div id="addOtrosSection" style="display:none;">
                <label class="form-label fw-semibold mb-1" style="font-size:13px;">Descripción</label>
                <input type="text" class="form-control" id="addOtrosInput" placeholder="Ej: Consejo directivo">
            </div>

            <div id="addPadreSection">
                <label class="form-label fw-semibold mb-1" style="font-size:13px;">Reporta a</label>
                <select class="form-select" id="addPadreSelect" style="font-size:13px;">
                    <option value="">Sin jefe (nodo raíz)</option>
                </select>
            </div>

            <button type="button" class="btn btn-ghost w-100 d-flex align-items-center justify-content-center gap-2 mt-auto" id="btnConfirmarAdd" style="height:44px;font-size:14px;border-radius:10px;">
                <span class="material-symbols-outlined">check_circle</span>
                Agregar
            </button>
        </div>
    </div>

    <!-- ── Offcanvas: Editar ── -->
    <div class="offcanvas offcanvas-end" id="offcanvasEditar" tabindex="-1" style="width:360px;">
        <div class="offcanvas-header org-oc-header org-oc-header-edit">
            <h5>Editar nodo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column gap-4">
            <input type="hidden" id="editNodeId">

            <div>
                <label class="form-label fw-semibold mb-2" style="font-size:13px;">Tipo de nodo</label>
                <div class="tipo-pills" id="editTipoPills">
                    <label class="tipo-pill" id="editPillPrincipal">
                        <input type="radio" name="tipoEmpEdit" value="1">
                        <span class="material-symbols-outlined" style="color:#22c55e">star</span>
                        Principal
                    </label>
                    <label class="tipo-pill" id="editPillEmpleado">
                        <input type="radio" name="tipoEmpEdit" value="2">
                        <span class="material-symbols-outlined" style="color:#008837">person</span>
                        Empleado
                    </label>
                    <label class="tipo-pill" id="editPillOtros">
                        <input type="radio" name="tipoEmpEdit" value="3">
                        <span class="material-symbols-outlined" style="color:#a855f7">label</span>
                        Otros
                    </label>
                </div>
            </div>

            <div id="editEmpSection">
                <label class="form-label fw-semibold mb-1" style="font-size:13px;">Empleado</label>
                <select id="editEmpSelect" style="width:100%;">
                    <option value="">Escriba para buscar…</option>
                </select>
            </div>

            <div id="editOtrosSection" style="display:none;">
                <label class="form-label fw-semibold mb-1" style="font-size:13px;">Descripción</label>
                <input type="text" class="form-control" id="editOtrosInput" placeholder="Ej: Consejo directivo">
            </div>

            <div id="editPadreSection">
                <label class="form-label fw-semibold mb-1" style="font-size:13px;">Reporta a</label>
                <select class="form-select" id="editPadreSelect" style="font-size:13px;">
                    <option value="">Sin jefe (nodo raíz)</option>
                </select>
            </div>

            <button type="button" class="btn btn-ghost w-100 d-flex align-items-center justify-content-center gap-2 mt-auto" id="btnConfirmarEdit" style="height:44px;font-size:14px;border-radius:10px;">
                <span class="material-symbols-outlined">save</span>
                Guardar cambios
            </button>
        </div>
    </div>

    <!-- Modal previsualización export -->
    <div class="modal fade" id="modalExportPreview" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" style="border:none;border-radius:16px;overflow:hidden;">
                <div style="background:#fff;border-bottom:1px solid #e9ecef;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-size:13px;font-weight:700;color:#111;letter-spacing:.06em;text-transform:uppercase;">Previsualización</span>
                    <button data-bs-dismiss="modal" style="background:none;border:none;color:#94a3b8;cursor:pointer;display:flex;">
                        <span class="material-symbols-outlined" style="font-size:18px;">close</span>
                    </button>
                </div>
                <div style="padding:20px;background:#f8fafc;max-height:65vh;overflow:auto;text-align:center;">
                    <img id="previewExportImg" src="" alt="Preview" style="max-width:100%;border-radius:8px;box-shadow:0 4px 24px rgba(0,0,0,.1);">
                </div>
                <div style="padding:16px 20px;background:#fff;display:flex;justify-content:flex-end;gap:10px;">
                    <button data-bs-dismiss="modal" class="tb-btn">Cancelar</button>
                    <button id="btnConfirmarExport" class="tb-btn tb-btn-primary" style="background:#008837;border-color:#008837;color:#111;">
                        <span class="material-symbols-outlined" style="font-size:16px;">download</span>
                        Descargar PNG
                    </button>
                </div>
            </div>
        </div>
    </div>

</div><!-- /.app -->

<?php include("neptune_js.php"); ?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
    integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="scripts/OrganigramaSv.js?v=<?php echo time(); ?>" charset="utf-8"></script>
</body>
</html>
