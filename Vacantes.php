<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Vacantes - PIP</title>

    <!-- Styles neptune -->
    <?php include("neptune_styles.php"); ?>

    <!-- Styles adicionales -->
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator.css" rel="stylesheet">
    <link href="plugins/tabulator/dist/css/tabulator_modern.min.css" rel="stylesheet">
    <style>
        .status-badge {
            font-size: 0.85rem;
            padding: 0.35em 0.65em;
        }

        .published-badge {
            font-size: 0.75rem;
        }

        .vacancy-card {
            border-left: 4px solid #198754;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 10px;
            padding: 12px;
            border-radius: 8px;
            background: white;
            border-top: 1px solid #dee2e6;
            border-right: 1px solid #dee2e6;
            border-bottom: 1px solid #dee2e6;
        }

        .vacancy-card:hover {
            /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
            /* transform: translateY(-1px); */
        }

        .vacancy-card.active {
            background-color: #e7f3ff;
            border-left-color: #0d6efd;
            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
        }

        .vacancy-card.draft {
            border-left-color: #6c757d;
        }

        .vacancy-card.active-status {
            border-left-color: #198754;
        }

        .vacancy-card.closed {
            border-left-color: #dc3545;
        }

        .card-postulante-count {
            font-size: 0.8rem;
            color: #6c757d;
        }

        .text-borrador {
            color: #61ACFC !important;
        }

        /* ====== NUEVO DISEÑO V2 ====== */

        /* Header de Vacante */
        .vacante-header-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            border-left: 4px solid #008837;
        }

        .vacante-header-card .vacante-icon-lg {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            background: linear-gradient(135deg, #008837 0%, #ffdb58 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a1a2e;
            font-size: 28px;
            flex-shrink: 0;
        }

        .badge-status {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.4em 0.9em;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        .badge-status.activa {
            background-color: #d1f2d9;
            color: #198754;
        }

        .badge-status.borrador {
            background-color: #e2e3e5;
            color: #6c757d;
        }

        .badge-status.cerrada {
            background-color: #f8d7da;
            color: #dc3545;
        }

        /* Secciones V2 */
        .section-title-v2 {
            font-size: 0.9rem;
            font-weight: 700;
            color: #1a1a2e;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e9ecef;
        }

        .section-title-v2 .material-symbols-outlined {
            font-size: 20px;
            color: #008837;
        }

        /* Chips / Tags */
        .chip-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #fff9e6;
            color: #856404;
            border: 1px solid #008837;
            border-radius: 20px;
            padding: 6px 14px;
            font-size: 0.85rem;
            font-weight: 500;
            margin: 0 6px 6px 0;
            transition: all 0.2s ease;
        }

        .chip-tag:hover {
            background: #008837;
            color: #1a1a2e;
        }

        .chip-tag button {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.1rem;
            line-height: 1;
            cursor: pointer;
            padding: 0;
            opacity: 0.6;
        }

        .chip-tag button:hover {
            opacity: 1;
        }

        /* Mini Cards para Evaluaciones/Inducciones */
        .mini-card {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.2s ease;
        }

        .mini-card:hover {
            border-color: #008837;
            box-shadow: 0 2px 8px rgba(105, 191, 127, 0.15);
        }

        .mini-card-title {
            font-weight: 600;
            font-size: 0.9rem;
            color: #1a1a2e;
        }

        .mini-card-sub {
            font-size: 0.8rem;
            color: #6c757d;
        }

        /* Botón Ghost Add */
        .btn-add-ghost {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: 1px dashed #adb5bd;
            color: #6c757d;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 8px;
        }

        .btn-add-ghost:hover {
            border-color: #008837;
            color: #1a1a2e;
            background: #fff9e6;
        }

        /* Empty State */
        .empty-state-card {
            text-align: center;
            padding: 30px 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border: 2px dashed #dee2e6;
        }

        .empty-state-card .material-symbols-outlined {
            font-size: 40px;
            color: #adb5bd;
            margin-bottom: 10px;
        }

        .empty-state-card p {
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 12px;
        }

        /* COMPARATIVO - Podium */
        .podium-section {
            background: #fff;
            border-radius: 14px;
            padding: 16px 20px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, .07);
            border: 1px solid #e9ecef;
            margin-bottom: 20px;
        }

        .podium-label {
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .6px;
            color: #6c757d;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .podium-label .material-symbols-outlined {
            font-size: 17px;
            color: #008837;
        }

        .podium-card {
            background: #fff;
            border-radius: 12px;
            border: 2px solid #e9ecef;
            padding: 14px 12px;
            text-align: center;
            cursor: pointer;
            transition: all .22s ease;
            height: 100%;
        }

        .podium-card:hover {
            box-shadow: 0 4px 16px rgba(105, 191, 127, .18);
            border-color: #008837;
            transform: translateY(-2px);
        }

        .podium-card.active-podium {
            border-color: #008837;
            background: #fff9e6;
            box-shadow: 0 2px 10px rgba(105, 191, 127, .2);
        }

        .podium-card.gold {
            border-top: 4px solid #008837;
        }

        .podium-card.silver {
            border-top: 4px solid #adb5bd;
        }

        .podium-card.bronze {
            border-top: 4px solid #cd7f32;
        }

        .podium-medal {
            font-size: 22px;
            font-weight: 900;
            line-height: 1;
            margin-bottom: 4px;
        }

        .podium-card-name {
            font-size: .82rem;
            font-weight: 700;
            color: #1a1a2e;
            line-height: 1.3;
            margin-bottom: 8px;
            word-break: break-word;
        }

        .score-ring-wrap {
            display: flex;
            justify-content: center;
            margin: 0 auto 6px;
        }

        .score-ring {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .95rem;
            font-weight: 800;
            color: #1a1a2e;
            background: conic-gradient(#008837 var(--pct), #f0f0f0 0deg);
            position: relative;
        }

        .score-ring::before {
            content: '';
            position: absolute;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: #fff;
        }

        .score-ring-val {
            position: relative;
            z-index: 1;
            font-size: .88rem;
            font-weight: 800;
        }

        .podium-card.silver .score-ring {
            background: conic-gradient(#adb5bd var(--pct), #f0f0f0 0deg);
        }

        .podium-card.bronze .score-ring {
            background: conic-gradient(#cd7f32 var(--pct), #f0f0f0 0deg);
        }

        .podium-rank-badge {
            font-size: .7rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 20px;
            display: inline-block;
        }

        /* COMPARATIVO - Toggle */
        .comparativo-chart-toggle {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 12px;
        }

        .comparativo-chart-toggle .btn-group .btn {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: .82rem;
            font-weight: 600;
            padding: 6px 14px;
        }

        .comparativo-chart-toggle .btn-group .btn .material-symbols-outlined {
            font-size: 16px;
        }

        /* COMPARATIVO - Candidate Cards */
        .comparativo-candidate-card {
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e9ecef;
            box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
            overflow: hidden;
            height: 100%;
            transition: box-shadow .2s;
        }

        .comparativo-candidate-card:hover {
            box-shadow: 0 4px 14px rgba(0, 0, 0, .1);
        }

        .comparativo-candidate-card .cand-header {
            padding: 14px 16px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
        }

        .comparativo-candidate-card .cand-header-name {
            font-weight: 700;
            font-size: .88rem;
            color: #1a1a2e;
            line-height: 1.3;
        }

        .score-badge-overall {
            font-size: .78rem;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 20px;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .score-badge-overall.high {
            background: #d1f2d9;
            color: #198754;
        }

        .score-badge-overall.mid {
            background: #fff3cd;
            color: #856404;
        }

        .score-badge-overall.low {
            background: #f8d7da;
            color: #dc3545;
        }

        .cand-body {
            padding: 0;
        }

        .comp-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 14px;
            border-bottom: 1px solid #f2f3f5;
            transition: background .15s;
        }

        .comp-row:last-child {
            border-bottom: none;
        }

        .comp-row:hover {
            background: #fffbf0;
        }

        .comp-row.general-row {
            background: #fff9e6;
            border-bottom: 2px solid #ffe082;
            font-weight: 700;
        }

        .comp-row.general-row:hover {
            background: #fff3cd;
        }

        .comp-name {
            font-size: .80rem;
            color: #495057;
            flex: 1 1 110px;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .comp-row.general-row .comp-name {
            color: #1a1a2e;
            font-weight: 700;
        }

        .comp-bar-wrap {
            flex: 2 1 80px;
            min-width: 50px;
        }

        .comp-bar-track {
            height: 7px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
        }

        .comp-bar-fill {
            height: 100%;
            border-radius: 4px;
            transition: width .5s ease;
        }

        .comp-bar-fill.high {
            background: #198754;
        }

        .comp-bar-fill.mid {
            background: #008837;
        }

        .comp-bar-fill.low {
            background: #dc3545;
        }

        .comp-score-val {
            font-size: .80rem;
            font-weight: 700;
            color: #1a1a2e;
            min-width: 38px;
            text-align: right;
        }

        /* COMPARATIVO - Controls Bar */
        .comparativo-controls-bar {
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e9ecef;
            padding: 16px 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .06);
            margin-bottom: 16px;
        }

        /* RESULTADOS POSTULANTE MODAL */
        .resultados-modal-top {
            padding: 20px 24px 16px;
            background: #fff;
            border-bottom: 1px solid #e9ecef;
        }

        .resultados-modal-chart {
            padding: 16px 20px 8px;
            background: #f8f9fa;
        }

        .resultados-modal-header-custom .btn-close {
            filter: invert(1) grayscale(1);
        }

        .resultados-modal-header-custom .btn-ver-eval {
            color: #008837;
            border-color: #008837;
            font-size: .78rem;
            font-weight: 700;
            padding: 4px 12px;
        }

        .resultados-modal-header-custom .btn-ver-eval:hover {
            background: #008837;
            color: #1a1a2e;
        }

        .score-ring-lg {
            width: 80px;
            height: 80px;
        }

        .score-ring-lg::before {
            width: 62px;
            height: 62px;
        }

        .score-ring-lg .score-ring-val {
            font-size: 1rem;
        }

        /* KPIs rediseñados */
        .stats-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .stat-kpi {
            background: white;
            border-radius: 12px;
            padding: 10px 16px;
            min-width: 120px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
            border: 1px solid #e9ecef;
            flex: 1;
        }

        .stat-kpi .stat-number {
            font-size: 1.4rem;
            font-weight: 800;
            display: block;
            line-height: 1.2;
        }

        .stat-kpi .stat-label {
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            color: #6c757d;
            margin-top: 4px;
        }

        .stat-kpi.total {
            background: #e7f1ff;
            border-color: #b6d4fe;
        }

        .stat-kpi.total .stat-number {
            color: #0d6efd;
        }

        .stat-kpi.proceso {
            background: #e6f7fb;
            border-color: #b3e5fc;
        }

        .stat-kpi.proceso .stat-number {
            color: #17a2b8;
        }

        .stat-kpi.aceptados {
            background: #d1f2d9;
            border-color: #a3e6b3;
        }

        .stat-kpi.aceptados .stat-number {
            color: #198754;
        }

        .stat-kpi.rechazados {
            background: #f8d7da;
            border-color: #f1aeb5;
        }

        .stat-kpi.rechazados .stat-number {
            color: #dc3545;
        }

        /* Wizard */
        .wizard-progress {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            gap: 0;
        }

        .wizard-step {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            font-size: 0.85rem;
            font-weight: 600;
            color: #6c757d;
            background: #f8f9fa;
            border-radius: 20px;
            transition: all 0.3s ease;
        }

        .wizard-step .step-number {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #dee2e6;
            color: #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 700;
        }

        .wizard-step.active {
            background: #fff9e6;
            color: #1a1a2e;
        }

        .wizard-step.active .step-number {
            background: #008837;
            color: #1a1a2e;
        }

        .wizard-step.completed .step-number {
            background: #198754;
            color: white;
        }

        .wizard-connector {
            width: 30px;
            height: 2px;
            background: #dee2e6;
            margin: 0 4px;
        }

        .wizard-connector.completed {
            background: #198754;
        }

        .wizard-content {
            animation: fadeIn 0.3s ease;
        }

        /* Avatar grande con gradiente */
        .postulante-avatar-lg {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.3rem;
            flex-shrink: 0;
        }

        .postulante-avatar-xl {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.6rem;
            flex-shrink: 0;
        }

        /* Breadcrumb */
        .breadcrumb-custom {
            font-size: 0.8rem;
            color: #6c757d;
            margin-bottom: 12px;
        }

        .breadcrumb-custom a {
            color: #0d6efd;
            text-decoration: none;
            cursor: pointer;
        }

        .breadcrumb-custom a:hover {
            text-decoration: underline;
        }

        /* Tabs secundarios pequeños */
        .nav-tabs-sm {
            border-bottom: 1px solid #dee2e6;
            margin-bottom: 16px;
        }

        .nav-tabs-sm .nav-link {
            font-size: 0.8rem;
            font-weight: 600;
            padding: 8px 14px;
            color: #6c757d;
            border: none;
            border-bottom: 2px solid transparent;
            background: transparent;
        }

        .nav-tabs-sm .nav-link:hover {
            color: #1a1a2e;
            border-bottom-color: #e9ecef;
        }

        .nav-tabs-sm .nav-link.active {
            color: #1a1a2e;
            border-bottom-color: #008837;
            background: transparent;
        }


        /* Timeline compacto mejorado */
        .timeline-compact {
            position: relative;
            padding-left: 24px;
        }

        .timeline-compact::before {
            content: '';
            position: absolute;
            left: 7px;
            top: 4px;
            bottom: 4px;
            width: 2px;
            background: #e9ecef;
        }

        .timeline-compact-item {
            position: relative;
            padding: 10px 0 10px 16px;
        }

        .timeline-compact-marker {
            position: absolute;
            left: -20px;
            top: 14px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 3px solid #008837;
            z-index: 2;
        }

        .timeline-compact-marker.success {
            border-color: #28a745;
        }

        .timeline-compact-marker.danger {
            border-color: #dc3545;
        }

        .timeline-compact-marker.gray {
            border-color: #6c757d;
        }

        .timeline-compact-title {
            font-weight: 600;
            font-size: 0.9rem;
            margin: 0;
        }

        .timeline-compact-sub {
            font-size: 0.8rem;
            color: #6c757d;
            margin: 2px 0 0 0;
        }

        .timeline-compact-time {
            font-size: 0.75rem;
            color: #adb5bd;
        }

        /* Dropdown de acciones en tabla */
        .action-dropdown-btn {
            background: none;
            border: none;
            color: #6c757d;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .action-dropdown-btn:hover {
            background: #f8f9fa;
            color: #1a1a2e;
        }

        /* Status badge pill */
        .status-pill {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .status-pill.en-proceso {
            background: #e6f7fb;
            color: #0c5460;
        }

        .status-pill.aceptado {
            background: #d1f2d9;
            color: #155724;
        }

        .status-pill.rechazado {
            background: #f8d7da;
            color: #721c24;
        }

        .status-pill.finalizado {
            background: #e2e3e5;
            color: #383d41;
        }

        /* Layout altura unificado */
        .split-pane-container {
            display: flex;
            align-items: stretch;
            height: calc(100vh - 170px);
            min-height: 500px;
        }

        #panelListaVacantes,
        #panelDetalleVacante {
            display: flex;
            flex-direction: column;
        }

        #panelListaVacantes .card,
        #panelDetalleVacante .card {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: auto;
            overflow: visible;
        }

        #panelListaVacantes .card-body,
        #panelDetalleVacante .card-body {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        #listaVacantesCards {
            flex: 1;
            overflow-y: auto;
            min-height: 0;
        }

        #vacanteTabsContent {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        #vacanteTabsContent>.tab-pane {
            display: none;
            flex-direction: column;
            flex: 1;
            overflow-y: auto;
            min-height: 0;
        }

        #vacanteTabsContent>.tab-pane.active {
            display: flex !important;
        }

        /* Sub-vistas postulantes flex */
        #subVistaListaPostulantes {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
        }

        #contenedorCardsPostulantes {
            flex: 1;
            overflow-y: auto;
            min-height: 0;
        }

        /* Tabs header limpio */
        #panelDetalleVacante>.card>.card-header {
            background: #fff !important;
            padding: 1rem 1.25rem 0.75rem !important;
            border-bottom: 1px solid #e9ecef !important;
            flex-shrink: 0 !important;
            overflow: visible !important;
        }

        #panelDetalleVacante>.card>.card-header .nav-tabs {
            border-bottom: 2px solid #e9ecef;
            margin: 0 !important;
        }

        #panelDetalleVacante>.card>.card-header .nav-tabs .nav-item {
            margin-bottom: 0;
        }

        #panelDetalleVacante>.card>.card-header .nav-link {
            border: none;
            color: #6c757d;
            font-weight: 600;
            padding: 0.6rem 1rem 0.85rem;
            position: relative;
        }

        #panelDetalleVacante>.card>.card-header .nav-link.active {
            color: #1a1a2e;
            background: transparent;
        }

        #panelDetalleVacante>.card>.card-header .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 3px;
            background: #008837;
            border-radius: 2px;
        }

        /* Sub-vistas animadas */
        #subVistaListaPostulantes,
        #wizardAddPostulante,
        #subVistaDetallePostulante {
            animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(5px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ====== CARDS DE POSTULANTES ====== */
        .postulante-card-v2 {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 16px 18px;
            margin-bottom: 10px;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .postulante-card-v2:hover {
            border-color: #008837;
            /* box-shadow: 0 4px 16px rgba(105, 191, 127, 0.12); */
            /* transform: translateY(-1px); */
        }

        .postulante-card-v2 .card-header-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }

        .postulante-card-v2 .card-main-info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
        }

        .postulante-card-v2 .card-name {
            font-weight: 700;
            font-size: 1rem;
            color: #1a1a2e;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .postulante-card-v2 .card-contact {
            font-size: 0.8rem;
            color: #6c757d;
            margin-top: 2px;
        }

        .postulante-card-v2 .card-meta-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 10px;
            flex-wrap: wrap;
        }

        .postulante-card-v2 .card-meta-item {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.78rem;
            color: #6c757d;
        }

        .postulante-card-v2 .card-meta-item .material-symbols-outlined {
            font-size: 15px;
        }

        .filtro-estatus-btn.active {
            font-weight: 600;
        }

        /* Scrollbar personalizado para cards */
        #contenedorCardsPostulantes::-webkit-scrollbar {
            width: 6px;
        }

        #contenedorCardsPostulantes::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }

        #contenedorCardsPostulantes::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }

        #contenedorCardsPostulantes::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }

        /* Postulante card (viejo, se mantiene por compatibilidad) */
        .postulante-card {
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            transition: all 0.2s ease;
        }

        .postulante-card:hover {
            /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
            /* transform: translateY(-2px); */
        }

        .postulante-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }

        .postulante-status {
            font-size: 0.75rem;
            padding: 0.25em 0.6em;
        }

        .postulante-status.en-proceso {
            background-color: #17a2b8;
            color: white;
        }

        .postulante-status.aceptado {
            background-color: #28a745;
            color: white;
        }

        .postulante-status.rechazado {
            background-color: #dc3545;
            color: white;
        }

        .postulante-status.finalizado {
            background-color: #6c757d;
            color: white;
        }

        .stats-postulantes {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .stat-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 10px 15px;
            text-align: center;
            min-width: 80px;
        }

        .stat-item .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            display: block;
        }

        .stat-item .stat-label {
            font-size: 0.75rem;
            color: #6c757d;
        }

        .stat-item.total .stat-number {
            color: #007bff;
        }

        .stat-item.proceso .stat-number {
            color: #17a2b8;
        }

        .stat-item.aceptados .stat-number {
            color: #28a745;
        }

        .stat-item.rechazados .stat-number {
            color: #dc3545;
        }

        #tablePostulantes th,
        #tablePostulantes td {
            vertical-align: middle;
        }

        /* ====== TIMELINE (HISTORIAL DE PROCESOS) ====== */
        .timeline {
            position: relative;
            padding-left: 22px;
            margin: 0;
        }

        .timeline-item {
            position: relative;
            padding: 12px 0 12px 18px;
            border-bottom: 1px solid #e9ecef;
        }

        .timeline-item:last-child {
            border-bottom: none;
        }

        .timeline-marker {
            position: absolute;
            left: 0;
            top: 16px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #6c757d;
            z-index: 2;
        }

        .timeline-item:before {
            content: '';
            position: absolute;
            left: 5px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #e9ecef;
            z-index: 1;
        }

        .timeline-item:first-child:before {
            top: 16px;
        }

        .timeline-item:last-child:before {
            bottom: calc(100% - 16px);
        }

        .timeline-title {
            font-weight: 600;
            margin: 0;
        }

        .timeline-sub {
            margin: 2px 0 0 0;
            font-size: 0.85rem;
        }

        .timeline-time {
            font-size: 0.8rem;
            color: #6c757d;
            white-space: nowrap;
        }

        .timeline-icon {
            font-size: 18px;
            vertical-align: middle;
            margin-left: 6px;
        }

        [data-theme="dark"] .timeline-item {
            border-bottom-color: #404040;
        }

        [data-theme="dark"] .timeline-item:before {
            background: #404040;
        }

        [data-theme="dark"] .timeline-time {
            color: #b0b0b0;
        }

        /* Dark mode para postulantes */
        [data-theme="dark"] .postulante-card {
            background: #2d2d2d;
            border-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .stat-item {
            background: #1e1e1e;
        }

        [data-theme="dark"] .stat-item .stat-label {
            color: #b0b0b0;
        }

        [data-theme="dark"] .vacancy-card {
            background: #2d2d2d;
            border-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .vacancy-card.active {
            background-color: #1a3a5c;
            border-left-color: #0d6efd;
        }

        [data-theme="dark"] .detail-section {
            background-color: #2d2d2d;
            border: 1px solid #404040;
        }

        [data-theme="dark"] .detail-section h6 {
            border-bottom-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .requisito-item,
        [data-theme="dark"] .evaluacion-item,
        [data-theme="dark"] .induccion-item {
            background: #1e1e1e;
            border-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .requisito-item:hover,
        [data-theme="dark"] .evaluacion-item:hover,
        [data-theme="dark"] .induccion-item:hover {
            background-color: #2a2a2a;
        }

        [data-theme="dark"] .detail-section .select2-container--default .select2-selection--single {
            background-color: #2d2d2d;
            border-color: #404040;
            color: #e0e0e0;
        }

        [data-theme="dark"] .detail-section .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #e0e0e0;
        }

        [data-theme="dark"] .select2-dropdown {
            background-color: #2d2d2d;
            border-color: #404040;
        }

        [data-theme="dark"] .select2-container--default .select2-results__option {
            color: #e0e0e0;
        }

        [data-theme="dark"] .select2-container--default .select2-results__option--highlighted[aria-selected] {
            background-color: #f0b429;
            color: #1e1e1e;
        }

        [data-theme="dark"] .select2-container--default .select2-search--dropdown .select2-search__field {
            background-color: #1e1e1e;
            border-color: #404040;
            color: #e0e0e0;
        }

        /* Comparativo: ambos controles misma altura fija */
        #selComparativoEvaluaciones {
            height: 32px;
            padding-top: 4px;
            padding-bottom: 4px;
            font-size: 12px;
        }
        #selCandidatosComparar + .select2-container .select2-selection--multiple {
            min-height: 32px;
            padding: 2px 4px;
        }
        #selCandidatosComparar + .select2-container .select2-selection--multiple .select2-selection__rendered {
            padding: 0 2px;
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            align-items: center;
        }
        #selCandidatosComparar + .select2-container .select2-selection__choice {
            margin: 0;
            padding: 1px 6px;
            font-size: 12px;
            line-height: 20px;
            border-radius: 3px;
        }
        #selCandidatosComparar + .select2-container .select2-selection__choice__remove {
            font-size: 11px;
            margin-right: 3px;
        }
        #selCandidatosComparar + .select2-container .select2-search--inline .select2-search__field {
            margin: 0;
            padding: 1px 4px;
            height: 22px;
            font-size: 12px;
        }

        @media (max-width: 768px) {

            #panelListaVacantes .card,
            #panelDetalleVacante .card {
                height: auto;
            }
        }

        /* Fix dropdown overflow inside DataTable */
        .table-responsive {
            overflow: visible !important;
        }

        .dropdown-menu {
            z-index: 1050;
        }

        .dropdown-item .material-symbols-outlined {
            font-size: 18px;
            vertical-align: middle;
        }

        /* =============================================
           BUTTON SYSTEM - Minimal + Ghost + Danger
           ============================================= */

        .btn-minimal {
            background: #fff;
            border: 1px solid #e9ecef;
            color: #1a1a2e;
            border-radius: 10px;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            text-align: center;
            line-height: 1.2;
            white-space: nowrap;
            padding: 8px 14px;
            font-size: 0.875rem;
        }

        .btn-minimal.btn-sm,
        .btn-minimal.btn-xs {
            padding: 6px 10px;
            font-size: 0.8rem;
        }

        .btn-minimal .material-symbols-outlined {
            font-size: 18px;
            line-height: 1;
        }

        .btn-minimal.is-flat,
        .btn-minimal.is-flat:hover,
        .btn-minimal.is-flat:focus {
            box-shadow: none;
            border-color: #e9ecef;
        }

        .btn-minimal:hover {
            border-color: #008837;
            color: #1a1a2e;
            background: #fff9e6;
        }

        .btn-minimal:focus {
            box-shadow: 0 0 0 0.2rem rgba(105, 191, 127, 0.2);
        }

        .btn-minimal.active {
            background: #008837 !important;
            border-color: #008837 !important;
            color: #1a1a2e !important;
            font-weight: 600;
        }

        .btn-minimal.active:hover {
            background: #e6b006 !important;
            border-color: #e6b006 !important;
            color: #1a1a2e !important;
        }

        .btn-minimal:not(.active):hover {
            border-color: #008837;
            color: #1a1a2e;
            background: #fff9e6;
        }

        .btn-minimal-danger {
            background: #fff;
            border: 1px solid #f1aeb5;
            color: #b02a37;
        }

        .btn-minimal-danger:hover {
            border-color: #dc3545;
            color: #b02a37;
            box-shadow: 0 2px 8px rgba(220, 53, 69, 0.18);
        }

        .btn-minimal-danger:focus {
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.2);
        }

        .btn-minimal.btn-responsive {
            font-size: clamp(0.78rem, 0.2vw + 0.82rem, 0.9rem);
        }

        .btn-ghost {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: 1px dashed #adb5bd;
            color: #6c757d;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-ghost:hover {
            border-color: #008837;
            color: #1a1a2e;
            background: #fff9e6;
        }

        .btn-ghost.btn-sm {
            padding: 6px 10px;
            font-size: 0.8rem;
        }
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <!-- Menu -->
        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>

        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container-fluid">
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
                                    <h1>Gestión de Vacantes</h1>
                                    <p class="text-muted">Administración de vacantes laborales, requisitos, evaluaciones
                                        e inducciones</p>
                                </div>
                            </div>
                        </div>

                        <!-- SPLIT PANE -->
                        <div class="row split-pane-container">
                            <!-- PANEL IZQUIERDO: Lista de Vacantes -->
                            <div class="col-md-4 col-lg-4 mb-3" id="panelListaVacantes">
                                <div class="d-grid mb-3">
                                    <button type="button" class="btn btn-minimal" data-bs-toggle="modal"
                                        data-bs-target="#modalAddVacante" onclick="prepareAddModal()">
                                        <span class="material-symbols-outlined align-middle me-1">add</span>
                                        Nueva Vacante
                                    </button>
                                </div>
                                <div class="card">
                                    <div class="card-header py-2">
                                        <input type="text" id="txtBuscarVacante" class="form-control form-control-sm"
                                            placeholder="Buscar vacante..." onkeyup="filtrarVacantes()">
                                    </div>
                                    <div class="card-body p-2">
                                        <div id="listaVacantesCards">
                                            <p class="text-muted text-center py-3">Cargando vacantes...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- PANEL DERECHO: Detalle + Tabs -->
                            <div class="col-md-8 col-lg-8" id="panelDetalleVacante">
                                <div class="card" style="height:auto !important;">
                                    <div class="card-header" style="flex-shrink:0; overflow:visible;">
                                        <ul class="nav nav-tabs card-header-tabs" id="vacanteTabs" role="tablist"
                                            style="margin-top:0; margin-bottom:0;">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="tab-info-btn" data-bs-toggle="tab"
                                                    data-bs-target="#tabInfoRequisitos" type="button" role="tab"
                                                    onclick="updateUrlTab('info')">
                                                    <span class="material-symbols-outlined align-middle me-1"
                                                        style="font-size:18px;">info</span> Info y Requisitos
                                                </button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="tab-postulantes-btn" data-bs-toggle="tab"
                                                    data-bs-target="#tabPostulantes" type="button" role="tab"
                                                    onclick="updateUrlTab('postulantes')">
                                                    <span class="material-symbols-outlined align-middle me-1"
                                                        style="font-size:18px;">people</span> Postulantes
                                                </button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="tab-comparativo-btn" data-bs-toggle="tab"
                                                    data-bs-target="#tabComparativo" type="button" role="tab"
                                                    onclick="updateUrlTab('comparativo')">
                                                    <span class="material-symbols-outlined align-middle me-1"
                                                        style="font-size:18px;">bar_chart</span> Comparativo
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body tab-content" id="vacanteTabsContent">

                                        <!-- TAB INFO Y REQUISITOS -->
                                        <div class="tab-pane fade show active" id="tabInfoRequisitos" role="tabpanel">
                                            <div id="contenidoTabInfo">
                                                <div class="text-center text-muted py-5">
                                                    <span class="material-symbols-outlined"
                                                        style="font-size:64px;">work</span>
                                                    <p class="mt-3 fs-5">Selecciona una vacante de la lista para ver sus
                                                        detalles</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- TAB POSTULANTES -->
                                        <div class="tab-pane fade" id="tabPostulantes" role="tabpanel">
                                            <input type="hidden" id="postulantesIdVacante">

                                            <!-- SUB-VISTA: LISTA -->
                                            <div id="subVistaListaPostulantes">
                                                <div
                                                    class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                                                    <div class="stats-row">
                                                        <div class="stat-kpi total"><span class="stat-number"
                                                                id="statTotal">0</span><span
                                                                class="stat-label">Total</span></div>
                                                        <div class="stat-kpi proceso"><span class="stat-number"
                                                                id="statProceso">0</span><span class="stat-label">En
                                                                Proceso</span></div>
                                                        <div class="stat-kpi aceptados"><span class="stat-number"
                                                                id="statAceptados">0</span><span
                                                                class="stat-label">Aceptados</span></div>
                                                        <div class="stat-kpi rechazados"><span class="stat-number"
                                                                id="statRechazados">0</span><span
                                                                class="stat-label">Rechazados</span></div>
                                                    </div>
                                                    <div>
                                                        <button type="button" class="btn btn-minimal btn-sm"
                                                            onclick="mostrarFormAddPostulante()">
                                                            <span
                                                                class="material-symbols-outlined align-middle me-1">person_add</span>
                                                            Agregar
                                                        </button>
                                                    </div>
                                                </div>
                                                <!-- Búsqueda -->
                                                <div class="mb-3">
                                                    <div class="input-group">
                                                        <span class="input-group-text bg-white border-end-0">
                                                            <span class="material-symbols-outlined text-muted"
                                                                style="font-size:20px;">search</span>
                                                        </span>
                                                        <input type="text" id="txtBuscarPostulanteLista"
                                                            class="form-control border-start-0"
                                                            placeholder="Buscar postulante por nombre, correo o teléfono..."
                                                            oninput="filtrarPostulantesCards()">
                                                    </div>
                                                </div>
                                                <!-- Filtros rápidos -->
                                                <div class="d-flex gap-2 mb-3 flex-wrap" id="filtrosEstatusPostulantes">
                                                    <button type="button" class="btn btn-minimal active"
                                                        data-filter="todos"
                                                        onclick="filtrarPostulantesPorEstatus('todos')">Todos</button>
                                                    <button type="button" class="btn btn-minimal" data-filter="1"
                                                        onclick="filtrarPostulantesPorEstatus('1')">En
                                                        Proceso</button>
                                                    <button type="button" class="btn btn-minimal" data-filter="2"
                                                        onclick="filtrarPostulantesPorEstatus('2')">Aceptados</button>
                                                    <button type="button" class="btn btn-minimal" data-filter="3"
                                                        onclick="filtrarPostulantesPorEstatus('3')">Rechazados</button>
                                                    <button type="button" class="btn btn-minimal" data-filter="4"
                                                        onclick="filtrarPostulantesPorEstatus('4')">Finalizados</button>
                                                </div>
                                                <!-- Cards de postulantes -->
                                                <div id="contenedorCardsPostulantes">
                                                    <p class="text-muted text-center py-4">Selecciona una vacante para
                                                        ver sus postulantes</p>
                                                </div>
                                            </div>

                                            <!-- SUB-VISTA: WIZARD ADD POSTULANTE -->
                                            <div id="wizardAddPostulante" class="d-none">
                                                <div class="d-flex justify-content-between align-items-center mb-3">
                                                    <h5 class="fw-bold mb-0">
                                                        <span
                                                            class="material-symbols-outlined align-middle me-2">person_add</span>
                                                        Nuevo Postulante
                                                    </h5>
                                                    <button type="button" class="btn btn-minimal btn-sm"
                                                        onclick="volverAListaPostulantes()">
                                                        <span
                                                            class="material-symbols-outlined align-middle me-1">arrow_back</span>
                                                        Volver
                                                    </button>
                                                </div>
                                                <input type="hidden" id="addPostulanteIdVacante">

                                                <!-- Barra de progreso del wizard -->
                                                <div class="wizard-progress" id="wizardProgressBar">
                                                    <div class="wizard-step active" data-step="1">
                                                        <span class="step-number">1</span>
                                                        <span>Búsqueda</span>
                                                    </div>
                                                    <div class="wizard-connector"></div>
                                                    <div class="wizard-step" data-step="2">
                                                        <span class="step-number">2</span>
                                                        <span>Datos Básicos</span>
                                                    </div>
                                                    <div class="wizard-connector"></div>
                                                    <div class="wizard-step" data-step="3">
                                                        <span class="step-number">3</span>
                                                        <span>Detalles</span>
                                                    </div>
                                                </div>

                                                <!-- Paso 1: Búsqueda -->
                                                <div class="wizard-content" id="wizardStep1">
                                                    <div class="row">
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">¿Ya existe el
                                                                postulante?</label>
                                                            <div class="input-group">
                                                                <input type="text" id="txtBuscarPostulante"
                                                                    class="form-control"
                                                                    placeholder="Buscar por correo, CURP o nombre...">
                                                                <button class="btn btn-minimal" type="button"
                                                                    onclick="buscarPostulanteExistente()">
                                                                    <span
                                                                        class="material-symbols-outlined">search</span>
                                                                </button>
                                                            </div>
                                                            <div id="resultadosBusqueda" class="mt-2"
                                                                style="display:none;"></div>
                                                        </div>
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">¿Es empleado
                                                                interno?</label>
                                                            <div class="input-group">
                                                                <input type="text" id="txtBuscarEmpleado"
                                                                    class="form-control"
                                                                    placeholder="Buscar por num. o nombre...">
                                                                <button class="btn btn-minimal" type="button"
                                                                    onclick="buscarEmpleadoInterno()">
                                                                    <span
                                                                        class="material-symbols-outlined">search</span>
                                                                </button>
                                                            </div>
                                                            <div id="resultadosBusquedaEmpleado" class="mt-2"
                                                                style="display:none;"></div>
                                                            <input type="hidden" id="txtPostulanteIdEmpleado">
                                                        </div>
                                                    </div>
                                                    <div class="text-center mt-3">
                                                        <p class="text-muted small mb-2">¿No encontraste al postulante?
                                                        </p>
                                                        <button type="button" class="btn btn-minimal"
                                                            onclick="wizardGoToStep(2)">
                                                            <span
                                                                class="material-symbols-outlined align-middle me-1">person_add</span>
                                                            Registrar Nuevo Postulante
                                                        </button>
                                                    </div>
                                                </div>

                                                <!-- Paso 2: Datos Básicos -->
                                                <div class="wizard-content d-none" id="wizardStep2">
                                                    <div class="row">
                                                        <div class="col-md-4 mb-3">
                                                            <label class="form-label fw-bold">Nombre: <span
                                                                    class="text-danger">*</span></label>
                                                            <input id="txtPostulanteNombre" type="text"
                                                                class="form-control" placeholder="Nombre(s)">
                                                        </div>
                                                        <div class="col-md-4 mb-3">
                                                            <label class="form-label fw-bold">Apellido Paterno: <span
                                                                    class="text-danger">*</span></label>
                                                            <input id="txtPostulanteApPaterno" type="text"
                                                                class="form-control" placeholder="Apellido Paterno">
                                                        </div>
                                                        <div class="col-md-4 mb-3">
                                                            <label class="form-label fw-bold">Apellido Materno:</label>
                                                            <input id="txtPostulanteApMaterno" type="text"
                                                                class="form-control" placeholder="Apellido Materno">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">Correo Electrónico: <span
                                                                    class="text-danger">*</span></label>
                                                            <input id="txtPostulanteCorreo" type="email"
                                                                class="form-control" placeholder="correo@ejemplo.com">
                                                        </div>
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">Teléfono:</label>
                                                            <input id="txtPostulanteTelefono" type="text"
                                                                class="form-control" placeholder="10 dígitos">
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-between mt-2">
                                                        <button type="button" class="btn btn-minimal"
                                                            onclick="wizardGoToStep(1)">
                                                            <span
                                                                class="material-symbols-outlined align-middle me-1">arrow_back</span>
                                                            Anterior
                                                        </button>
                                                        <button type="button" class="btn btn-minimal"
                                                            onclick="wizardGoToStep(3)">
                                                            Siguiente <span
                                                                class="material-symbols-outlined align-middle ms-1">arrow_forward</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <!-- Paso 3: Detalles -->
                                                <div class="wizard-content d-none" id="wizardStep3">
                                                    <div class="row">
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">CURP:</label>
                                                            <input id="txtPostulanteCURP" type="text"
                                                                class="form-control" placeholder="18 caracteres"
                                                                maxlength="18" style="text-transform:uppercase;">
                                                        </div>
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">Dirección:</label>
                                                            <input id="txtPostulanteDireccion" type="text"
                                                                class="form-control"
                                                                placeholder="Calle, número, colonia...">
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">Estado:</label>
                                                            <input id="txtPostulanteEstado" type="text"
                                                                class="form-control" placeholder="Estado">
                                                        </div>
                                                        <div class="col-md-6 mb-3">
                                                            <label class="form-label fw-bold">Ciudad:</label>
                                                            <input id="txtPostulanteCiudad" type="text"
                                                                class="form-control" placeholder="Ciudad">
                                                        </div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label fw-bold">Observaciones:</label>
                                                        <textarea id="txtPostulanteObservaciones" class="form-control"
                                                            rows="2"
                                                            placeholder="Observaciones iniciales..."></textarea>
                                                    </div>
                                                    <div class="d-flex justify-content-between mt-2">
                                                        <button type="button" class="btn btn-minimal"
                                                            onclick="wizardGoToStep(2)">
                                                            <span
                                                                class="material-symbols-outlined align-middle me-1">arrow_back</span>
                                                            Anterior
                                                        </button>
                                                        <button type="button" class="btn btn-minimal"
                                                            onclick="addPostulanteVacante()">
                                                            <span
                                                                class="material-symbols-outlined align-middle me-1">save</span>
                                                            Registrar Postulante
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- SUB-VISTA: DETALLE POSTULANTE V2 -->
                                            <div id="subVistaDetallePostulante" class="d-none">
                                                <!-- Breadcrumb -->
                                                <div class="breadcrumb-custom">
                                                    <a onclick="volverAListaPostulantes()">Postulantes</a>
                                                    <span class="mx-1">></span>
                                                    <span id="breadcrumbPostulanteNombre">Detalle</span>
                                                </div>

                                                <input type="hidden" id="detalleIdPostulanteVacante">
                                                <input type="hidden" id="detalleIdPostulante">
                                                <input type="hidden" id="detalleIdPostulanteVacanteNum">
                                                <input type="hidden" id="detallePostulanteNombreHidden">

                                                <!-- Header del postulante -->
                                                <div
                                                    class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                                                    <div class="d-flex align-items-center gap-3">
                                                        <div class="postulante-avatar-xl" id="detallePostulanteAvatar">?
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-1 fw-bold" id="detallePostulanteNombreHeader">
                                                                Postulante</h4>
                                                            <p class="text-muted mb-0 small"
                                                                id="detallePostulantePuesto">Vacante</p>
                                                            <span id="detallePostulanteStatus"
                                                                class="status-pill en-proceso mt-1">En Proceso</span>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex gap-2">
                                                        <button type="button" class="btn btn-minimal btn-sm"
                                                            id="btnVerResultados"
                                                            onclick="verResultadosPostulanteDesdeHeader()"
                                                            title="Ver resultados">
                                                            <span class="material-symbols-outlined align-middle"
                                                                style="font-size:18px;">analytics</span>
                                                        </button>
                                                        <button type="button" class="btn btn-minimal btn-sm"
                                                            id="btnVerDocumentos"
                                                            onclick="verDocumentosPostulanteDesdeHeader()"
                                                            title="Ver documentos">
                                                            <span class="material-symbols-outlined align-middle"
                                                                style="font-size:18px;">folder_shared</span>
                                                        </button>
                                                        <button type="button" class="btn btn-minimal btn-sm"
                                                            id="btnToggleEditMode" onclick="toggleEditMode()">
                                                            <span
                                                                class="material-symbols-outlined align-middle me-1">edit</span>
                                                            Editar
                                                        </button>
                                                    </div>
                                                </div>

                                                <!-- Tabs secundarios -->
                                                <ul class="nav nav-tabs-sm" id="detallePostulanteTabs" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active" id="tab-dp-info-btn"
                                                            data-bs-toggle="tab" data-bs-target="#tabDpInfo"
                                                            type="button" role="tab">Información Personal</button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="tab-dp-telefonos-btn"
                                                            data-bs-toggle="tab" data-bs-target="#tabDpTelefonos"
                                                            type="button" role="tab">Teléfonos</button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="tab-dp-historial-btn"
                                                            data-bs-toggle="tab" data-bs-target="#tabDpHistorial"
                                                            type="button" role="tab">Historial</button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="tab-dp-requisitos-btn"
                                                            data-bs-toggle="tab" data-bs-target="#tabDpRequisitos"
                                                            type="button" role="tab">Requisitos</button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="tab-dp-estatus-btn"
                                                            data-bs-toggle="tab" data-bs-target="#tabDpEstatus"
                                                            type="button" role="tab">Estatus</button>
                                                    </li>
                                                </ul>

                                                <div class="tab-content" id="detallePostulanteTabsContent">
                                                    <!-- Tab Info Personal -->
                                                    <div class="tab-pane fade show active" id="tabDpInfo"
                                                        role="tabpanel">
                                                        <div class="row">
                                                            <div class="col-md-4 mb-3">
                                                                <label class="form-label fw-bold">Nombre(s):</label>
                                                                <input type="text" id="edit_Nombre"
                                                                    class="form-control form-control-sm" disabled>
                                                            </div>
                                                            <div class="col-md-4 mb-3">
                                                                <label class="form-label fw-bold">Apellido
                                                                    Paterno:</label>
                                                                <input type="text" id="edit_ApellidoPaterno"
                                                                    class="form-control form-control-sm" disabled>
                                                            </div>
                                                            <div class="col-md-4 mb-3">
                                                                <label class="form-label fw-bold">Apellido
                                                                    Materno:</label>
                                                                <input type="text" id="edit_ApellidoMaterno"
                                                                    class="form-control form-control-sm" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">CURP:</label>
                                                                <input type="text" id="edit_CURP"
                                                                    class="form-control form-control-sm text-uppercase"
                                                                    maxlength="18" disabled>
                                                            </div>
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">Correo
                                                                    Electrónico:</label>
                                                                <input type="email" id="edit_CorreoElectronico"
                                                                    class="form-control form-control-sm" disabled>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">Fecha
                                                                    Postulación:</label>
                                                                <input type="text" id="detallePostulanteFecha"
                                                                    class="form-control form-control-sm bg-light"
                                                                    readonly value="-">
                                                            </div>
                                                        </div>

                                                        <hr class="my-4">

                                                        <h6 class="section-title-v2 mb-3">
                                                            <span class="material-symbols-outlined">location_on</span>
                                                            Dirección
                                                        </h6>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">Código Postal:</label>
                                                                <div class="input-group input-group-sm">
                                                                    <input type="text" id="edit_CodigoPostal"
                                                                        class="form-control" placeholder="5 dígitos"
                                                                        maxlength="5" disabled>
                                                                    <button class="btn btn-outline-secondary"
                                                                        type="button" id="btnBuscarCP"
                                                                        onclick="buscarCodigoPostal()" disabled>
                                                                        <span
                                                                            class="material-symbols-outlined">search</span>
                                                                    </button>
                                                                </div>
                                                                <small class="text-muted" id="cpStatus"></small>
                                                            </div>
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">Colonia:</label>
                                                                <select id="edit_Colonia"
                                                                    class="form-select form-select-sm" disabled>
                                                                    <option value="">Seleccionar...</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">Calle:</label>
                                                                <input type="text" id="edit_Calle"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Ej. Av. Juarez" disabled>
                                                            </div>
                                                            <div class="col-md-3 mb-3">
                                                                <label class="form-label fw-bold">Num. Ext:</label>
                                                                <input type="text" id="edit_NumeroExterior"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Ej. 123" disabled>
                                                            </div>
                                                            <div class="col-md-3 mb-3">
                                                                <label class="form-label fw-bold">Num. Int:</label>
                                                                <input type="text" id="edit_NumeroInterior"
                                                                    class="form-control form-control-sm"
                                                                    placeholder="Ej. 2B" disabled>
                                                            </div>
                                                        </div>
                                                        <input type="hidden" id="edit_Direccion">
                                                        <div class="mb-3">
                                                            <label class="form-label fw-bold">Dirección
                                                                completa:</label>
                                                            <div id="direccionPreview"
                                                                class="form-control form-control-sm bg-light"
                                                                style="min-height: 38px;">-</div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6 mb-3">
                                                                <label class="form-label fw-bold">Estado:</label>
                                                                <input type="text" id="edit_Estado"
                                                                    class="form-control form-control-sm" readonly>
                                                            </div>
                                                            <div class="col-md-6 mb-3">
                                                                <label
                                                                    class="form-label fw-bold">Municipio/Ciudad:</label>
                                                                <input type="text" id="edit_Ciudad"
                                                                    class="form-control form-control-sm" readonly>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Tab Teléfonos -->
                                                    <div class="tab-pane fade" id="tabDpTelefonos" role="tabpanel">
                                                        <div id="formAgregarTelefono" class="d-none mb-3">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <input type="text" id="nuevoTelefono"
                                                                        class="form-control form-control-sm"
                                                                        placeholder="10 dígitos" maxlength="10">
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <input type="text" id="observacionesTelefono"
                                                                        class="form-control form-control-sm"
                                                                        placeholder="Observaciones (opcional)">
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <button class="btn btn-minimal btn-sm me-1"
                                                                        onclick="agregarTelefonoNuevo()">
                                                                        <span
                                                                            class="material-symbols-outlined">save</span>
                                                                    </button>
                                                                    <button class="btn btn-minimal btn-sm"
                                                                        onclick="ocultarFormAgregarTelefono()">
                                                                        <span
                                                                            class="material-symbols-outlined">close</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mb-2">
                                                            <h6 class="section-title-v2 mb-0">
                                                                <span class="material-symbols-outlined">phone</span>
                                                                Teléfonos Registrados
                                                            </h6>
                                                            <button type="button" class="btn btn-minimal btn-sm"
                                                                onclick="openEditModal('${idEncoded}')" title="Editar">
                                                                <span class="material-symbols-outlined align-middle"
                                                                    style="font-size:18px;">edit</span>
                                                            </button>
                                                        </div>
                                                        <div id="tablaTelefonos">
                                                            <p class="text-muted text-center">Cargando teléfonos...</p>
                                                        </div>
                                                    </div>

                                                    <!-- Tab Historial -->
                                                    <div class="tab-pane fade" id="tabDpHistorial" role="tabpanel">
                                                        <div id="formAddHistorial" style="display:none;" class="mb-3">
                                                            <div class="row g-2">
                                                                <div class="col-md-4">
                                                                    <select id="cmbNuevoProceso"
                                                                        class="form-select form-select-sm">
                                                                        <option value="">Seleccione proceso...</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <select id="cmbResultadoProceso"
                                                                        class="form-select form-select-sm">
                                                                        <option value="">Resultado...</option>
                                                                        <option value="1">Aprobado</option>
                                                                        <option value="0">Reprobado</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <input type="text" id="txtObservacionesProceso"
                                                                        class="form-control form-control-sm"
                                                                        placeholder="Observaciones...">
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <button class="btn btn-minimal btn-sm me-1"
                                                                        onclick="addHistorialProceso()">
                                                                        <span
                                                                            class="material-symbols-outlined">save</span>
                                                                    </button>
                                                                    <button class="btn btn-minimal btn-sm"
                                                                        onclick="hideAddHistorialForm()">
                                                                        <span
                                                                            class="material-symbols-outlined">close</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mb-2">
                                                            <h6 class="section-title-v2 mb-0">
                                                                <span class="material-symbols-outlined">history</span>
                                                                Historial de Procesos
                                                            </h6>
                                                            <button type="button" class="btn btn-ghost btn-sm"
                                                                onclick="showAddHistorialForm()">
                                                                <span
                                                                    class="material-symbols-outlined align-middle">add</span>
                                                            </button>
                                                        </div>
                                                        <div id="listaHistorial">
                                                            <p class="text-muted text-center">No hay historial
                                                                registrado</p>
                                                        </div>
                                                    </div>

                                                    <!-- Tab Requisitos -->
                                                    <div class="tab-pane fade" id="tabDpRequisitos" role="tabpanel">
                                                        <h6 class="section-title-v2">
                                                            <span class="material-symbols-outlined">checklist</span>
                                                            Cumplimiento de Requisitos
                                                        </h6>
                                                        <div id="listaRequisitosPostulante">
                                                            <p class="text-muted text-center">No hay requisitos
                                                                configurados</p>
                                                        </div>
                                                    </div>

                                                    <!-- Tab Estatus -->
                                                    <div class="tab-pane fade" id="tabDpEstatus" role="tabpanel">
                                                        <h6 class="section-title-v2">
                                                            <span
                                                                class="material-symbols-outlined">pending_actions</span>
                                                            Estatus de Postulación
                                                        </h6>
                                                        <div class="row align-items-end g-3">
                                                            <div class="col-md-5">
                                                                <label class="form-label fw-bold">Cambiar
                                                                    Estatus:</label>
                                                                <select id="cmbEstatusPostulante" class="form-select">
                                                                    <option value="1">En Proceso</option>
                                                                    <option value="2">Aceptado</option>
                                                                    <option value="3">Rechazado</option>
                                                                    <option value="4">Finalizado</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-md-5">
                                                                <label class="form-label fw-bold">Observaciones:</label>
                                                                <input type="text" id="txtObservacionesEstatus"
                                                                    class="form-control"
                                                                    placeholder="Motivo del cambio...">
                                                            </div>
                                                            <div class="col-md-2 d-grid">
                                                                <button class="btn btn-minimal"
                                                                    onclick="actualizarEstatusPostulante()">
                                                                    <span class="material-symbols-outlined">save</span>
                                                                    Guardar
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <hr class="my-4">
                                                        <div class="d-flex justify-content-between">
                                                            <button type="button" class="btn btn-minimal-danger btn-sm"
                                                                onclick="eliminarPostulacion()">
                                                                <span
                                                                    class="material-symbols-outlined align-middle me-1">delete</span>
                                                                Eliminar Postulación
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="editModeButtons" class="d-none mt-3">
                                                    <button type="button" class="btn btn-minimal"
                                                        onclick="guardarCambiosPostulante()">
                                                        <span
                                                            class="material-symbols-outlined align-middle me-1">save</span>
                                                        Guardar Cambios
                                                    </button>
                                                    <button type="button" class="btn btn-minimal"
                                                        onclick="cancelarEdicion()">
                                                        <span
                                                            class="material-symbols-outlined align-middle me-1">close</span>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        <!-- TAB COMPARATIVO -->
                                        <div class="tab-pane fade" id="tabComparativo" role="tabpanel">
                                            <!-- <div class="vacante-header-card mb-3">
                                                <div
                                                    class="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                                                    <div>
                                                        <h6 class="section-title-v2 border-0 pb-0 mb-2">
                                                            <span class="material-symbols-outlined">bar_chart</span>
                                                            Comparativo de Resultados
                                                        </h6>
                                                        <p class="text-muted mb-2">
                                                            Consulta por evaluación cómo se comparan los postulantes de
                                                            la vacante seleccionada mediante gráfica de barras, gráfica
                                                            de araña y tablas por competencia.
                                                        </p>
                                                        <div class="small text-muted">
                                                            Vacante activa: <strong id="comparativoVacanteNombre">Sin
                                                                vacante seleccionada</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <div class="empty-state-card" id="comparativoEmptyState">
                                                <span class="material-symbols-outlined">monitoring</span>
                                                <p class="mb-2">Selecciona una vacante con evaluaciones finalizadas para
                                                    consultar su comparativo.</p>
                                                <p class="small text-muted mb-0">Aquí podrás comparar postulantes por
                                                    evaluación, score general y competencias sin salir de la ficha de la
                                                    vacante.</p>
                                            </div>
                                            <div class="empty-state-card d-none" id="comparativoLoadingState">
                                                <div class="spinner-border text-warning mb-3" role="status">
                                                    <span class="visually-hidden">Cargando...</span>
                                                </div>
                                                <p class="mb-0">Cargando comparativo de la vacante...</p>
                                            </div>
                                            <div id="comparativoContent" class="d-none">

                                                <!-- Controls Bar -->
                                                <div class="comparativo-controls-bar">
                                                    <div class="row g-2">
                                                        <div class="col-md-5">
                                                            <label class="form-label fw-bold small mb-1">
                                                                <span
                                                                    class="material-symbols-outlined align-middle me-1"
                                                                    style="font-size:15px;color:#008837;">assignment</span>
                                                                Evaluación
                                                            </label>
                                                            <select id="selComparativoEvaluaciones"
                                                                class="form-select form-select-sm"
                                                                onchange="loadComparativoCandidatos()"></select>
                                                        </div>
                                                        <div class="col-md-7">
                                                            <label class="form-label fw-bold small mb-1">
                                                                <span
                                                                    class="material-symbols-outlined align-middle me-1"
                                                                    style="font-size:15px;color:#008837;">group</span>
                                                                Candidatos a comparar
                                                            </label>
                                                            <select id="selCandidatosComparar"
                                                                class="form-control form-control-sm" multiple="multiple"
                                                                style="width: 100%;"></select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Podium -->
                                                <div class="podium-section d-none" id="comparativoPodiumSection">
                                                    <div class="podium-label">
                                                        <span class="material-symbols-outlined">workspace_premium</span>
                                                        Ranking de Candidatos
                                                    </div>
                                                    <div class="row g-3" id="comparativoPodiumCards"></div>
                                                </div>

                                                <!-- Chart area -->
                                                <div class="comparativo-controls-bar">
                                                    <div class="comparativo-chart-toggle">
                                                        <div class="btn-group" role="group">
                                                            <button type="button"
                                                                class="btn btn-warning btn-comparativo-chart active"
                                                                id="btnChartColumn"
                                                                onclick="switchComparativoChart('column')">
                                                                <span class="material-symbols-outlined">bar_chart</span>
                                                                Barras
                                                            </button>
                                                            <button type="button"
                                                                class="btn btn-outline-warning btn-comparativo-chart"
                                                                id="btnChartRadar"
                                                                onclick="switchComparativoChart('radar')">
                                                                <span class="material-symbols-outlined">radar</span>
                                                                Radar
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div id="containerChartColumn">
                                                        <div id="chartComparativoVacanteColumn"
                                                            style="width:100%; height:450px"></div>
                                                    </div>
                                                    <div class="d-none" id="containerChartRadar">
                                                        <div id="chartComparativoVacanteRadar"
                                                            style="width:100%; height:450px"></div>
                                                    </div>
                                                </div>

                                                <!-- Candidate detail cards -->
                                                <div class="row mt-2 g-3" id="contenedorTablasComparativo"></div>

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

    <!-- Modal Agregar Vacante -->
    <div class="modal fade" id="modalAddVacante" tabindex="-1" aria-labelledby="modalAddVacanteLabel" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAddVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nueva Vacante
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Nombre de la Vacante: <span
                                    class="text-danger">*</span></label>
                            <input id="txtNombreVacante" type="text" class="form-control"
                                placeholder="Ej. Desarrollador Full Stack">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Tipo de Contratación: <span
                                    class="text-danger">*</span></label>
                            <select id="cmbTipoContratacion" class="form-select">
                                <option value="">Seleccione...</option>
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Medio tiempo">Medio tiempo</option>
                                <option value="Temporal">Temporal</option>
                                <option value="Por proyecto">Por proyecto</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Área Técnica:</label>
                            <select id="cmbAreaTecnica" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Puesto:</label>
                            <select id="cmbPuesto" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Sucursal:</label>
                            <select id="cmbSucursal" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Mínimo:</label>
                            <input id="txtSalarioMinimo" type="number" step="0.01" class="form-control"
                                placeholder="0.00">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Máximo:</label>
                            <input id="txtSalarioMaximo" type="number" step="0.01" class="form-control"
                                placeholder="0.00">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Apertura: <span class="text-danger">*</span></label>
                            <input id="txtFechaApertura" type="date" class="form-control">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Cierre:</label>
                            <input id="txtFechaCierre" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción del Puesto:</label>
                        <textarea id="txtDescripcionPuesto" class="form-control" rows="3"
                            placeholder="Detalle las responsabilidades y requisitos del puesto..."></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="chkBanderaCV">
                                <label class="form-check-label fw-bold" for="chkBanderaCV">
                                    Requiere CV
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="chkBanderaSE">
                                <label class="form-check-label fw-bold" for="chkBanderaSE">
                                    Solicitud de Empleo
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-minimal" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-minimal" id="btnAddVacante">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Vacante -->
    <div class="modal fade" id="modalEditVacante" tabindex="-1" aria-labelledby="modalEditVacanteLabel"
        aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditVacanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">edit</span>
                        Editar Vacante
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIdVacante">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Nombre de la Vacante: <span
                                    class="text-danger">*</span></label>
                            <input id="editNombreVacante" type="text" class="form-control"
                                placeholder="Nombre de la vacante">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Tipo de Contratación: <span
                                    class="text-danger">*</span></label>
                            <select id="editTipoContratacion" class="form-select">
                                <option value="">Seleccione...</option>
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Medio tiempo">Medio tiempo</option>
                                <option value="Temporal">Temporal</option>
                                <option value="Por proyecto">Por proyecto</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Área Técnica:</label>
                            <select id="editAreaTecnica" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Puesto:</label>
                            <select id="editPuesto" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label fw-bold">Sucursal:</label>
                            <select id="editSucursal" class="form-select">
                                <option value="">Seleccione...</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Mínimo:</label>
                            <input id="editSalarioMinimo" type="number" step="0.01" class="form-control"
                                placeholder="0.00">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Salario Máximo:</label>
                            <input id="editSalarioMaximo" type="number" step="0.01" class="form-control"
                                placeholder="0.00">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Apertura: <span class="text-danger">*</span></label>
                            <input id="editFechaApertura" type="date" class="form-control">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-bold">Fecha Cierre:</label>
                            <input id="editFechaCierre" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción del Puesto:</label>
                        <textarea id="editDescripcionPuesto" class="form-control" rows="3"
                            placeholder="Descripción del puesto..."></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="editBanderaCV">
                                <label class="form-check-label fw-bold" for="editBanderaCV">
                                    Requiere CV
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="editBanderaSE">
                                <label class="form-check-label fw-bold" for="editBanderaSE">
                                    Solicitud de Empleo
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-ghost" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-minimal" id="btnSaveEdit">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Agregar Area Tecnica -->
    <div class="modal fade" id="modalAddAreaTecnicaVacante" tabindex="-1" aria-hidden="true" style="z-index: 1060;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span class="material-symbols-outlined align-middle me-2">add_circle</span>
                        Nueva Área Técnica
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="selectTargetAreaTecnica">
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre del Área Técnica: <span
                                class="text-danger">*</span></label>
                        <input id="txtNombreAreaNew" type="text" class="form-control"
                            placeholder="Ej. Mantenimiento, Sistemas, Producción">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Descripción:</label>
                        <textarea id="txtDescripcionAreaNew" class="form-control" rows="3"
                            placeholder="Breve descripción de la función del área"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-ghost"
                        onclick="$('#modalAddAreaTecnicaVacante').modal('hide')">
                        <span class="material-symbols-outlined align-middle me-1">close</span>
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-minimal" id="btnGuardarAreaTecnicaVacante">
                        <span class="material-symbols-outlined align-middle me-1">save</span>
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Resultados Postulante -->
    <div class="modal fade" id="modalResultadosPostulante" tabindex="-1"
        aria-labelledby="modalResultadosPostulanteLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content overflow-hidden">
                <div class="modal-header resultados-modal-header-custom border-0">
                    <h5 class="modal-title" id="modalResultadosPostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">analytics</span>
                        Resultados de Evaluación
                    </h5>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" class="btn btn-sm btn-minimal" onclick="abrirEvaluacionRespuestas()">
                            <span class="material-symbols-outlined align-middle"
                                style="font-size:15px;">visibility</span>
                            Ver Evaluación
                        </button>
                        <button type="button" class="btn-close ms-1" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-body p-0">
                    <!-- Top: selector + score -->
                    <div class="resultados-modal-top">
                        <div class="row g-3 align-items-center">
                            <div class="col-md-4">
                                <label class="form-label fw-bold small mb-1">
                                    <span class="material-symbols-outlined align-middle me-1"
                                        style="font-size:15px;color:#008837;">assignment</span>
                                    Evaluación
                                </label>
                                <select id="selResultadosPostulante" class="form-select form-select-sm"
                                    onchange="drawResultadosPostulante()"></select>
                            </div>
                            <div class="col-md-8">
                                <div id="lblScoreGeneralPostulante"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Chart -->
                    <div class="resultados-modal-chart">
                        <div id="chartPostulanteGeneral" style="width:100%; height:460px"></div>
                    </div>
                </div>
                <div class="modal-footer border-top bg-white py-2">
                    <button type="button" class="btn btn-minimal btn-sm px-4" data-bs-dismiss="modal">
                        <span class="material-symbols-outlined align-middle me-1" style="font-size:15px;">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Documentos Postulante -->
    <div class="modal fade" id="modalDocumentosPostulante" tabindex="-1"
        aria-labelledby="modalDocumentosPostulanteLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDocumentosPostulanteLabel">
                        <span class="material-symbols-outlined align-middle me-2">folder_shared</span>
                        Documentos
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" id="contenedorBotonesDocumentos"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-ghost w-100" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Evaluacion Respuestas -->
    <div class="modal fade" id="modalEvaluacionRespuestas" tabindex="-1"
        aria-labelledby="modalEvaluacionRespuestasLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEvaluacionRespuestasLabel">
                        <span class="material-symbols-outlined align-middle me-2">quiz</span>
                        Evaluación del Postulante
                    </h5>
                    <button type="button" class="btn-close" onclick="cerrarEvaluacionRespuestas()"></button>
                </div>
                <div class="modal-body" style="background-color: #f8f9fa;">
                    <div id="contenedorEvaluacionRespuestas"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Neptune Javascripts -->
    <?php include("neptune_js.php"); ?>

    <script src="assets/libs/block-ui/jquery.blockUI.js"></script>
    <script src="plugins/tabulator/dist/js/tabulator.min.js"></script>
    <script src="scripts/PostulanteEditor.js?v=<?php echo filemtime('scripts/PostulanteEditor.js'); ?>"></script>
    <script src="scripts/Vacantes.js?v=<?php echo filemtime('scripts/Vacantes.js'); ?>"></script>
</body>

</html>
