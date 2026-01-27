<!-- Scripts Generales -->
<?php 
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>

<!-- Perfect Scrollbar -->
<script src="assets/libs/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min.js"></script>

<!-- Font Awesome -->
<script src="https://kit.fontawesome.com/2e7c1ffc8a.js" crossorigin="anonymous"></script>

<!-- DataTables y exportación -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.12.1/b-2.2.3/b-colvis-2.2.3/b-html5-2.2.3/b-print-2.2.3/datatables.min.js"></script>

<!-- Scripts del sistema -->
<script src="dist/js/app.js"></script>
<script src="dist/js/app.init.light-sidebar.js"></script>
<script src="dist/js/app-style-switcher.js"></script>
<script src="dist/js/custom.min.js"></script>

<!-- Toastr para notificaciones -->
<script src="assets/libs/toastr/build/toastr.min.js"></script>
<script src="assets/extra-libs/toastr/toastr-init.js"></script>

<!-- Alertify -->
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

<?php 
// Chartist solo para páginas específicas que lo necesitan (evitar en la mayoría de páginas)
$chartist_pages = ['dashboard']; // Solo en dashboard
if (in_array($current_page, $chartist_pages)): 
?>
<!-- Chartist solo para dashboard -->
<script src="assets/libs/chartist/dist/chartist.min.js"></script>
<script src="assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js"></script>
<script src="assets/extra-libs/sparkline/sparkline.js"></script>
<script src="dist/js/pages/dashboards/dashboard1.js"></script>
<?php endif; ?>

<!-- FullCalendar DESHABILITADO - Solo usamos EvoCalendar en index.php -->
<?php if ($current_page === 'dashboard_disabled'): ?>
<script src="assets/libs/fullcalendar/dist/fullcalendar.min.js"></script>
<script src="dist/js/pages/calendar/cal-init.js"></script>
<script src="assets/extra-libs/tiny-editable/mindmup-editabletable.js"></script>
<script src="assets/extra-libs/tiny-editable/numeric-input-example.js"></script>
<?php endif; ?>
