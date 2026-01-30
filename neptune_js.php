<!-- Neptune Javascripts -->

<!-- jQuery siempre primero -->
<script src="./neptune/plugins/jquery/jquery-3.5.1.min.js"></script>

<!-- BlockUI - debe cargarse después de jQuery y antes de global.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>

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

<?php 
$current_page = basename($_SERVER['PHP_SELF'], '.php');
if ($current_page !== 'login'): 
?>
<!-- Scripts específicos para páginas que NO son login -->
<script src="./neptune/plugins/datatables/datatables.min.js"></script>
<script src="./assets/libs/select2/dist/js/select2.full.min.js"></script>

<!-- NO cargar dashboard.js en index.php -->
<?php if ($current_page === 'dashboard'): ?>
<script src="./neptune/plugins/apexcharts/apexcharts.min.js"></script>
<script src="./neptune/plugins/highlight/highlight.pack.js"></script>
<script src="./neptune/js/pages/dashboard.js"></script>
<?php endif; ?>

<script src="./neptune/js/pages/settings.js"></script>
<script src="./neptune/js/pages/datatables.js"></script>
<?php endif; ?>

<!-- SweetAlert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<!-- Neptune Javascripts -->