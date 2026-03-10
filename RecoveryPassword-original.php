<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>PIP Intranet</title>
    <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="dist/css/style.css" rel="stylesheet">
    <!-- This page CSS -->
    <link href="dist/css/pages/authentication.css" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
    <!-- Default theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
    <!-- Semantic UI theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
    <!-- Bootstrap theme -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />

</head>

<body>
    <div class="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">Material Admin</p>
            </div>
        </div>
        <div class="auth-wrapper d-flex no-block justify-content-center align-items-center"
            style="background:url(../../assets/images/big/auth-bg.jpg) no-repeat center center;">
            <div class="auth-box">
                <div class="row" style="padding: 2vh;">
                    <div class="col s12 l12" style="text-align: center;">
                        <h5>Actualización de contraseña.</h5>
                    </div>
                    <div class="col s12 l12" style="text-align: center;">
                        <img src="assets/images/logo-pip.png" alt="Logo Klyns" style="width: 100%;">
                    </div>
                    <div class="col s12 l12" style="text-align: center;">
                        <h5 id="nameEmpleado"></h5>
                    </div>
                    <div class="col s12 l12" style="text-align: center;">
                        <h6>Ingrese su nueva contraseña.</h6>
                        <input type="password" id="txtPass1">
                    </div>
                    <div class="col s12 l12" style="text-align: center; margin-top:2vh">
                        <h6>Repita la contraseña.</h6>
                        <input type="password" id="txtPass2">
                    </div>
                    <div class="col s12">
                        <button class="btn-large w100 blue accent-4" type="button" id="idUpdatePassword">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="scripts.js"></script>
    <script src="assets/libs/jquery/dist/jquery.min.js"></script>
    <script src="dist/js/materialize.min.js"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="scripts/RecoveryPassword.js"></script>
   <script>
        $('.tooltipped').tooltip();
        /*     $('#to-recover').on("click", function() {
                $("#loginform").slideUp();
                $("#recoverform").fadeIn();
            }); */
        $(function () {
            $(".preloader").fadeOut();
        });
    </script>
</body>

</html>