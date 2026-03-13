<?php
require_once("Backend/Session/SessionManager.php");

// Si ya hay sesión activa, redirigir a index
if (SessionManager::isLoggedIn()) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Responsive Admin Dashboard Template">
    <meta name="keywords" content="admin,dashboard">
    <meta name="author" content="stacks">
    <!-- The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title -->
    <title>PIP Intranet</title>

    <!-- Styles -->

    <!-- Styles neptune -->

    <?php include("neptune_styles.php");  ?>

    <!-- Styles neptune -->

    <!-- <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="dist/css/style.css" rel="stylesheet"> -->
    <!-- This page CSS -->
    <link href="dist/css/pages/authentication.css" rel="stylesheet">
    <!-- CSS -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" /> -->
    <!-- Default theme -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" /> -->
    <!-- Semantic UI theme -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" /> -->
    <!-- Bootstrap theme -->
    <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" /> -->
</head>

<body>
    <div class="app app-auth-sign-in align-content-stretch d-flex flex-wrap justify-content-end">
        <div class="app-auth-background">

        </div>
        <div class="app-auth-container">
            <div class="logo" style="padding: 10px 0; position: relative; left: -30px;">
                <a href="index.html" class="d-flex align-items-center justify-content-center gap-3 text-decoration-none">
                    <img src="assets/images/logo-pip.png" alt="PIP" style="max-height:60px;">
                    <div style="font-size: 1.3rem; font-weight: 600; color: #222; letter-spacing: 1px;">Intranet PIP</div>
                </a>
            </div>
            <p class="auth-description">Bienvenido. Por favor inicia sesión con tu cuenta personal.</p>

            <div class="auth-credentials m-b-xxl">
                <label for="NoEmpleado" class="form-label">No Empleado</label>
                <input type="text" class="form-control m-b-md" id="NoEmpleado" aria-describedby="NoEmpleado" placeholder="0000000" onkeypress="return onlynumber(event)" required>

                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" aria-describedby="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" required>
            </div>

            <div class="auth-submit">
                <a class="btn btn-primary" id="btnLogin">Login</a>
                <a style="cursor: pointer;" class="auth-forgot-password float-end" id="to-recover">Olvidaste la contraseña?</a>
            </div>
        </div>
    </div>

    <!-- Modal Recuperar Contraseña -->
    <div class="modal fade" id="modalRecuperarPassword" tabindex="-1" aria-labelledby="modalRecuperarPasswordLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalRecuperarPasswordLabel">Recuperación de contraseña</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <img src="assets/images/logo-pip.png" alt="Logo Klyns" style="width:40%;">
                    </div>
                    <div class="p-3">
                        <h6 class="text-center mb-3"><b>Ingrese el correo electrónico ingresado en su cuenta.</b></h6>
                        <div class="mb-3">
                            <input type="email" class="form-control" id="txtEmailRecuperarPass" placeholder="Correo electrónico" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-primary w-100" id="idEnviaEmail">Enviar Correo</button>
                </div>
            </div>
        </div>
    </div>

    <script src="scripts.js"></script>
    <!-- neptune Javascripts -->
    <?php include("neptune_js.php");  ?>
    <!-- neptune Javascripts -->

    <script src="assets/libs/jquery/dist/jquery.min.js"></script>
    <!-- <script src="dist/js/materialize.min.js"></script> -->
    <script src="scripts/login.js"></script>
    <!-- <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script> -->
    <!-- <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        // Inicializar tooltips de Bootstrap si existen elementos con tooltip
        $(function() {
            $(".preloader").fadeOut();
            
            // Inicializar tooltips solo si existen elementos que los necesiten
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            if (tooltipTriggerList.length > 0) {
                tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl)
                });
            }
            
            // Evento para abrir modal de recuperar contraseña
            $('#to-recover').on('click', function() {
                $('#modalRecuperarPassword').modal('show');
            });
        });
    </script>
</body>

</html>