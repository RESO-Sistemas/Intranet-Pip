<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Organigramas · PIP by Lugo</title>

    <?php include("neptune_styles.php"); ?>

    <style>
        /* ─── Toolbar ─── */
        .ov-toolbar {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 0 18px;
            flex-wrap: wrap;
        }

        .ov-toolbar-title {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
            min-width: 0;
        }

        .ov-toolbar-title .ov-icon {
            width: 38px;
            height: 38px;
            background: #ffc107;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .ov-toolbar-title .ov-icon .material-symbols-outlined {
            font-size: 20px;
            color: #111;
        }

        .ov-toolbar-title h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            color: #111;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .ov-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            border: 1.5px solid #e2e8f0;
            background: #fff;
            color: #475569;
            cursor: pointer;
            transition: all .15s;
            white-space: nowrap;
            text-decoration: none;
        }

        .ov-btn:hover {
            background: #ffc107;
            border-color: #ffc107;
            color: #111;
        }

        .ov-btn .material-symbols-outlined {
            font-size: 16px;
        }

        /* ─── Tabs ─── */
        .org-tabs-bar {
            display: flex;
            gap: 0;
            border-bottom: 2px solid #e9ecef;
            margin-bottom: 0;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .org-tabs-bar::-webkit-scrollbar {
            display: none;
        }

        .org-tab {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 11px 20px;
            font-size: 13px;
            font-weight: 600;
            color: #64748b;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            margin-bottom: -2px;
            cursor: pointer;
            transition: all .18s;
            white-space: nowrap;
        }

        .org-tab .material-symbols-outlined {
            font-size: 15px;
        }

        .org-tab:hover {
            color: #1e293b;
            background: #f8fafc;
        }

        .org-tab.active {
            color: #111;
            border-bottom-color: #ffc107;
        }

        /* ─── Canvas ─── */
        .org-canvas-area {
            position: relative;
        }

        .org-canvas-panel {
            display: none;
        }

        .org-canvas-panel.active {
            display: block;
        }

        .org-diagram-container {
            width: 100%;
            height: calc(100vh - 220px);
            min-height: 560px;
            background: #fafafa;
            border: 1.5px solid #e9ecef;
            border-top: none;
            border-radius: 0 0 10px 10px;
        }

        /* ─── States ─── */
        .org-loading,
        .org-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            height: 300px;
            color: #94a3b8;
            font-size: 14px;
        }

        .org-loading .material-symbols-outlined,
        .org-empty-state .material-symbols-outlined {
            font-size: 42px;
            color: #cbd5e1;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .org-spin {
            animation: spin 1s linear infinite;
            display: block;
        }

        /* ─── Modal empleado ─── */
        #modalEmpDetalle .modal-content { border: none; border-radius: 16px; overflow: hidden; }
        .modal-emp-header {
            background: #fff;
            border-bottom: 1px solid #e9ecef;
            padding: 20px 24px 18px;
            display: flex;
            align-items: center;
            gap: 16px;
        }
        #modalEmpInitials {
            display: flex; align-items: center; justify-content: center;
            width: 62px; height: 62px; border-radius: 50%;
            background: #ffc107; color: #111;
            font-size: 22px; font-weight: 800; letter-spacing: -1px;
            flex-shrink: 0;
            box-shadow: 0 2px 12px rgba(255,193,7,.4);
        }
        .modal-emp-header-info { flex: 1; min-width: 0; }
        .modal-emp-name {
            font-size: 16px; font-weight: 700; color: #111;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 4px;
        }
        .modal-emp-puesto {
            font-size: 12px; color: #64748b;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            margin-bottom: 8px;
        }
        .modal-emp-badges { display: flex; gap: 6px; flex-wrap: wrap; }
        .modal-badge {
            font-size: 10px; font-weight: 700; padding: 2px 8px;
            border-radius: 5px; letter-spacing: .05em; text-transform: uppercase;
        }
        .modal-badge-close {
            background: none; border: none; color: #94a3b8;
            cursor: pointer; padding: 4px; margin-left: auto; align-self: flex-start;
            line-height: 1;
        }
        .modal-badge-close:hover { color: #111; }
        .modal-emp-section-label {
            font-size: 10px; font-weight: 700; letter-spacing: .08em;
            text-transform: uppercase; color: #94a3b8; margin-bottom: 10px;
        }
        .modal-emp-row {
            display: flex; align-items: center; gap: 10px;
            font-size: 13px; color: #374151; padding: 5px 0;
        }
        .modal-emp-row .material-symbols-outlined { font-size: 16px; color: #94a3b8; flex-shrink: 0; }
        .modal-emp-row span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .modal-emp-stat {
            display: flex; flex-direction: column; align-items: center;
            gap: 2px; padding: 12px;
            background: #f8fafc; border-radius: 10px; text-align: center;
        }
        .modal-emp-stat-val { font-size: 22px; font-weight: 800; color: #111; }
        .modal-emp-stat-lbl { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: .06em; }
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>
        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container-fluid px-3">

                        <!-- Mensajes flotantes -->
                        <div class="row">
                            <div class="col-12 col-lg-5 offset-lg-7 d-none d-lg-block"
                                style="position:fixed;z-index:99;">
                                <div id="contenidoMensajes" style="margin-right:2vh"></div>
                                <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>
                                <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>
                            </div>
                        </div>

                        <!-- Toolbar -->
                        <div class="ov-toolbar">
                            <div class="ov-toolbar-title">
                                <div class="ov-icon">
                                    <span class="material-symbols-outlined">account_tree</span>
                                </div>
                                <h1>Organigramas</h1>
                            </div>
                            <button class="ov-btn" id="btnExportarVista" title="Exportar organigrama actual como PNG">
                                <span class="material-symbols-outlined">download</span>
                                Exportar PNG
                            </button>
                        </div>

                        <!-- Organigramas (tabs + canvas) -->
                        <div id="contenidoOrganigramas"></div>

                    </div>
                </div>
            </div>
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
                    <button data-bs-dismiss="modal" class="ov-btn">Cancelar</button>
                    <button id="btnConfirmarExport" class="ov-btn" style="background:#ffc107;border-color:#ffc107;color:#111;font-weight:600;">
                        <span class="material-symbols-outlined" style="font-size:16px;">download</span>
                        Descargar PNG
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal detalle del empleado -->
    <div class="modal fade" id="modalEmpDetalle" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width:480px;">
            <div class="modal-content">

                <!-- Header: iniciales + nombre + puesto + badges -->
                <div class="modal-emp-header">
                    <span id="modalEmpInitials">?</span>
                    <div class="modal-emp-header-info">
                        <div class="modal-emp-name"   id="modalEmpName">—</div>
                        <div class="modal-emp-puesto" id="modalEmpPuesto">—</div>
                        <div class="modal-emp-badges">
                            <span class="modal-badge" id="modalEmpTipo"></span>
                            <span id="modalEmpNivel" style="font-size:10px;color:#94a3b8;align-self:center;"></span>
                        </div>
                    </div>
                    <button class="modal-badge-close" data-bs-dismiss="modal" aria-label="Cerrar">
                        <span class="material-symbols-outlined" style="font-size:20px;">close</span>
                    </button>
                </div>

                <div class="modal-body p-4" style="background:#fff;">

                    <!-- Contacto -->
                    <div id="modalContactoSection">
                        <div class="modal-emp-section-label">Contacto</div>
                        <div class="modal-emp-row" id="modalEmailRow">
                            <span class="material-symbols-outlined">mail</span>
                            <span id="modalEmpEmail">—</span>
                        </div>
                        <hr style="border-color:#f1f5f9;margin:14px 0;">
                    </div>

                    <!-- Organización + Jerarquía -->
                    <div class="row g-3">
                        <div class="col-7" id="modalOrgSection">
                            <div class="modal-emp-section-label">Organización</div>
                            <div class="modal-emp-row" id="modalDivisionRow">
                                <span class="material-symbols-outlined">corporate_fare</span>
                                <span id="modalEmpDivision">—</span>
                            </div>
                            <div class="modal-emp-row" id="modalSucursalRow">
                                <span class="material-symbols-outlined">location_on</span>
                                <span id="modalEmpSucursal">—</span>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="modal-emp-section-label">Jerarquía</div>
                            <div class="modal-emp-stat">
                                <span class="modal-emp-stat-val" id="modalEmpDirectos">0</span>
                                <span class="modal-emp-stat-lbl">Colaboradores<br>directos</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <?php include("neptune_js.php"); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"
        integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="scripts/organigrama.js?v=<?php echo time(); ?>"></script>
</body>

</html>
