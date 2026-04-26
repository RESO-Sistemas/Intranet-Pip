<!-- Scripts Generales -->
<?php 
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>

<!-- Font Awesome -->
<script src="https://kit.fontawesome.com/2e7c1ffc8a.js" crossorigin="anonymous"></script>

<!-- DataTables y exportación -->
<script src="assets/extra-libs/DataTables_old1/pdfmake-0.1.32/pdfmake.min.js"></script>
<script src="assets/extra-libs/DataTables_old1/pdfmake-0.1.32/vfs_fonts.js"></script>

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

