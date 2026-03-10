<?php
if (isset($_COOKIE["sesion"])) {
  if ($_COOKIE["sesion"] == "activa" && isset($_COOKIE["verificaSesion"])) {
    echo '<meta http-equiv="refresh" content="0;url=index.php">';
    die();
  }
}
 ?>
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
                <div id="loginform">
                    <div class="logo">
                        <span class="db"><img src="assets/images/logo-pip.png" style="width:35px !important"
                                alt="logo" /></span>
                        <h5 class="font-medium m-b-20">Sign In to Admin</h5>
                    </div>
                    <!-- Form -->
                    <div class="row">
                        <form class="col s12">
                            <!-- email -->
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="NoEmpleado" type="text" class="validate" required
                                        onkeypress="return onlynumber(event)">
                                    <label for="NoEmpleado">No Empleado</label>
                                </div>
                            </div>
                            <!-- pwd -->
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="password" type="password" class="validate" required>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <!-- pwd -->
                            <div class="row m-t-5">
                                <div class="col s7">
                                </div>
                                <div class="col s5 right-align"><a href="#" class="" id="to-recover">Forgot Pwd?</a>
                                </div>
                            </div>
                            <!-- pwd -->
                            <div class="row m-t-40">
                                <div class="col s12">
                                    <button class="btn-large w100 blue accent-4" type="button"
                                        id="btnLogin">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div  style="display:none">
          <div id="recuperarPassword" class="row">
              <div class="col s12 l12" style="text-align:center">
                  <h4>Recuperación de contraseña.</h4>
              </div>
              <div class="col s12 l12" style="text-align:center">
              <img src="assets/images/logo-pip.png" alt="Logo Klyns" style="width:40%;">
              </div>
              <div class="col s12 l12 " style="padding:3vh;">
                  <div class="row"
                      style="box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;">
                      <div class="col s12 l12" style="text-align:center;margin-top:3vh">
                          <h6><b>Ingrese el correo electrónico ingresado en su cuenta.</b></h6>
                          <hr>
                      </div>
                      <div class="col s12 l12">
                          <input type="email" id="txtEmailRecuperarPass" required>
                      </div>
                  </div>
              </div>
              <div class="col s12">
                  <button class="btn-large w100 blue accent-4" type="button" id="idEnviaEmail">Enviar Correo</button>
              </div>
          </div>
        </div>
    </div>

    <script src="scripts-original.js"></script>
    <script src="assets/libs/jquery/dist/jquery.min.js"></script>
    <script src="dist/js/materialize.min.js"></script>
    <script src="scripts/login-original.js"></script>
    <script src="assets/libs/toastr/build/toastr.min.js"></script>
    <script src="assets/extra-libs/toastr/toastr-init.js"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js" integrity="sha512-eYSzo+20ajZMRsjxB6L7eyqo5kuXuS2+wEbbOkpaur+sA2shQameiJiWEzCIDwJqaB0a4a6tCuEvCOBHUg3Skg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js" integrity="sha512-QSb5le+VXUEVEQbfljCv8vPnfSbVoBF/iE+c6MqDDqvmzqnr4KL04qdQMCm0fJvC3gCWMpoYhmvKBFqm1Z4c9A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
