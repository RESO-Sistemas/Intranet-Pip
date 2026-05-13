<?php if (defined('NEPTUNE_STYLES_LOADED')) return; define('NEPTUNE_STYLES_LOADED', true); ?>
<!-- Preconexión a fuentes externas -->
<link rel="preconnect" href="https://fonts.gstatic.com">

<!-- Fuentes externas -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap"
  rel="stylesheet">

<link
  href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
  rel="stylesheet">

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />


<!-- Estilos externos -->
<link href="./assets/libs/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">

<!-- Plugins CSS -->
<link href="./neptune/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="./neptune/plugins/perfectscroll/perfect-scrollbar.css" rel="stylesheet">
<link href="./neptune/plugins/pace/pace.css" rel="stylesheet">
<link href="./neptune/plugins/highlight/styles/github-gist.css" rel="stylesheet">

<!-- Syncfusion -->
<link href="./assets/syncfusion/Packages/ej2-base/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-buttons/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-popups/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-navigations/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-dropdowns/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-lists/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-inputs/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-calendars/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-splitbuttons/styles/tailwind.css" rel="stylesheet">
<link href="./assets/syncfusion/Packages/ej2-grids/styles/tailwind.css" rel="stylesheet">

<style>
  /* Elimina el borde/sombra azul de la celda enfocada en Syncfusion */
  .e-grid .e-rowcell.e-focused,
  .e-grid .e-detailrowcollapse.e-focused,
  .e-grid .e-detailrowexpand.e-focused,
  .e-grid .e-focused {
    box-shadow: none !important;
    outline: none !important;
  }

  .e-rowcell.e-focused {
    background-color: transparent !important;
  }

  .e-grid .e-headercelldiv {
    font-size: 13px;
    font-weight: 600;
  }

  .e-pagenomsg {
    display: none !important;
  }

  .e-pagecountmsg {
    display: none !important;
  }

  /* Elimina cambio de color en hover del grid */
  .e-grid .e-row:hover,
  .e-grid .e-rowcell:hover,
  .e-grid tr:hover {
    background-color: transparent !important;
  }
</style>

<!-- Toastr -->
<link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

<!--.swiper -->
<link rel="stylesheet" href="./assets/swiper/package/swiper-bundle.css">

<?php
$current_page = basename($_SERVER['PHP_SELF'], '.php');
if ($current_page !== 'login'):
  ?>
  <!-- Estilos específicos para páginas que NO son login -->
  <link href="./neptune/plugins/datatables/datatables.min.css" rel="stylesheet">
  <link href="./assets/libs/select2/dist/css/select2.min.css" rel="stylesheet">
<?php endif; ?>



<!-- Estilos principales del sistema -->

<link href="./neptune/css/main.css" rel="stylesheet">

<style>
  /* ====== BOTÓN REGRESAR PERSONALIZADO ====== */
  .btn-regresar-custom {
    background-color: #6c757d;
    /* Gris intermedio */
    color: #ffffff;
    border: 1px solid #5a6268;
  }

  .btn-regresar-custom:hover {
    background-color: #5a6268;
    /* Gris intermedio más oscuro al hacer hover */
    color: #ffffff;
  }

  /* Soporte para modo oscuro */
  [data-theme="dark"] .btn-regresar-custom {
    background-color: #495057;
    color: #e0e0e0;
    border-color: #343a40;
  }

  [data-theme="dark"] .btn-regresar-custom:hover {
    background-color: #343a40;
    color: #ffffff;
  }

  /* Login — quitar ícono azul del template */
  .app-auth-container .logo a {
    background: none !important;
    padding-left: 0 !important;
    justify-content: center !important;
    width: 100% !important;
    margin-left: 0 !important;
  }

  .app-auth-container .logo {
    text-align: center !important;
    padding-left: 0 !important;
    margin-left: 0 !important;
  }

  /* Sidebar — logo sin ícono azul del template */
  .app-sidebar .logo .logo-icon {
    background: none !important;
    padding-left: 0 !important;
    width: auto !important;
    height: auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    padding-left: 55px !important;
  }

  .app-sidebar .logo .logo-icon img {
    max-height: 52px !important;
    transition: transform 0.25s ease, filter 0.25s ease !important;
  }

  .app-sidebar .logo .logo-icon:hover {
    padding-left: 55px !important;
  }

  .app-sidebar .logo .logo-icon:hover img {
    transform: translateY(-3px) scale(1.06) !important;
    filter: brightness(1.1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25)) !important;
  }

  /* Sidebar — íconos siempre amarillos */
  .app-menu>ul>li>a>i:not(.has-sub-menu).material-icons-two-tone {
    filter: brightness(0) saturate(100%) invert(79%) sepia(82%) saturate(596%) hue-rotate(356deg) brightness(103%) contrast(101%) !important;
  }

  /* Sidebar — menús padre: texto gris por defecto, amarillo en hover/activo */
  .app-menu>ul>li>a {
    color: #9aa5b8 !important;
  }

  .app-menu>ul>li>a:hover,
  .app-menu>ul>li.open>a,
  .app-menu>ul>li.active-page>a {
    color: #ffc407 !important;
  }

  /* Sidebar — menús hijo: texto gris por defecto, amarillo en hover/activo */
  .app-menu>ul>li ul li a {
    color: #9aa5b8 !important;
  }

  .app-menu>ul>li ul li a:hover,
  .app-menu>ul>li ul li a.active {
    color: #ffc407 !important;
    font-weight: 500;
  }

  /* Sidebar — recuadro de sub-menú más oscuro */
  .app-menu>ul>li ul {
    background: #dde1e9 !important;
  }

  /* ====== FIX SELECT2 Y MODALES EN BOOTSTRAP 5 ====== */
  .modal {
    z-index: 3000 !important;
  }

  .modal-backdrop {
    z-index: 2990 !important;
  }

  .select2-container--open {
    z-index: 4000 !important;
    /* El desplegable abierto siempre al frente */
  }

  /* Solo subir el z-index de los selectores que están DENTRO de un modal */
  .modal .select2-container {
    z-index: 3001 !important;
    /* Justo sobre el modal (3000) */
  }

  .select2-dropdown {
    z-index: 4000 !important;
  }

  /* ====== SWEETALERT SIEMPRE AL FRENTE ====== */
  .swal2-container {
    z-index: 10000 !important;
  }
</style>

<link href="./neptune/css/custom.css" rel="stylesheet">
<!-- Estilos Responsive Globales - Aplicados a todas las vistas -->
<link href="assets/css/responsive-global.css" rel="stylesheet">
<!-- Iconos del sistema -->
<link rel="icon" type="image/png" sizes="32x32" href="./neptune/images/neptune.png" />
<link rel="icon" type="image/png" sizes="16x16" href="./neptune/images/neptune.png" />
