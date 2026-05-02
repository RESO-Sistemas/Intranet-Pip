<!-- Neptune Javascripts -->

<!-- jQuery siempre primero -->
<script src="./neptune/plugins/jquery/jquery-3.5.1.min.js"></script>

<!-- Bootstrap y dependencias -->
<script src="./neptune/plugins/bootstrap/js/popper.min.js"></script>
<script src="./neptune/plugins/bootstrap/js/bootstrap.min.js"></script>

<!-- Plugins generales -->
<script src="./neptune/plugins/perfectscroll/perfect-scrollbar.min.js"></script>
<script src="./neptune/plugins/pace/pace.min.js"></script>

<!-- Scripts del sistema principal -->
<script src="./neptune/js/main.min.js"></script>
<script src="./neptune/js/custom.js"></script>

<!-- Scripts globales personalizados -->
<script src="./scripts/global.js?v=<?php echo time(); ?>"></script>

<!-- sycnfusion -->
<script src="./assets/syncfusion/Packages/ej2/dist/ej2.min.js"></script>

<?php
$current_page = basename($_SERVER['PHP_SELF'], '.php');
if ($current_page !== 'login'):
    ?>
    <!-- Scripts específicos para páginas que NO son login -->
    <script src="./neptune/plugins/datatables/datatables.min.js"></script>
    <!-- Override con DataTables plain para renderizado consistente de paginación en todas las vistas -->
    <script src="./assets/libs/select2/dist/js/select2.full.min.js"></script>

    <!-- NO cargar dashboard.js en index.php -->
    <?php if ($current_page === 'dashboard' || $current_page === 'index'): ?>
        <script src="./neptune/plugins/apexcharts/apexcharts.min.js"></script>
    <?php endif; ?>
    <?php if ($current_page === 'dashboard'): ?>
        <script src="./neptune/plugins/highlight/highlight.pack.js"></script>
        <script src="./neptune/js/pages/dashboard.js"></script>
    <?php endif; ?>

    <script src="./neptune/js/pages/settings.js"></script>
    <script src="./neptune/js/pages/datatables.js"></script>
<?php endif; ?>

<!-- SweetAlert -->
<script src="./assets/libs/sweetalert2/dist/sweetalert2.all.min.js"></script>

<!-- Sycnfusion -->
<script src="./assets/syncfusion/Packages/ej2/dist/ej2.min.js"></script>

<!-- Font Awesome -->
<script src="https://kit.fontawesome.com/2e7c1ffc8a.js" crossorigin="anonymous"></script>

<!-- Toastr -->
<script src="./assets/libs/toastr/build/toastr.min.js"></script>
<script src="./assets/extra-libs/toastr/toastr-init.js"></script>

<!-- Swiper -->
<script src="./assets/swiper/package/swiper-bundle.min.js"></script>

<?php if ($current_page !== 'login'): ?>


    <!-- pdfmake para DataTables PDF export -->
    <script src="./assets/extra-libs/DataTables_old1/pdfmake-0.1.32/pdfmake.min.js"></script>
    <script src="./assets/extra-libs/DataTables_old1/pdfmake-0.1.32/vfs_fonts.js"></script>
<?php endif; ?>
<!-- Syncfusion Config -->
<script src="./scripts/syncfusion-config.js"></script>
