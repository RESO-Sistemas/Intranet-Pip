<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">
    <title>Postulantes (General) - PIP</title>

    <?php include("neptune_styles.php"); ?>

    <style>
        /* (Historial removido) */
    </style>
</head>

<body>
    <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">
        <div class="preloader">
            <div class="loader">
                <div class="loader__figure"></div>
                <p class="loader__label">PIP</p>
            </div>
        </div>

        <div id="Menu">
            <?php include("menus.php"); ?>
        </div>

        <div class="app-container">
            <?php include("includes/_Header.php"); ?>
            <div class="app-content">
                <div class="content-wrapper">
                    <div class="container">
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

                        <div class="row">
                            <div class="col">
                                <div class="page-description">
                                    <h1>Base de datos de postulantes</h1>
                                    <p class="text-muted">Administración centralizada de candidatos, sin importar la vacante</p>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <!-- Listado general -->
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title fw-bold mb-0">
                                            <span class="material-symbols-outlined align-middle me-2">group</span>
                                            Listado de postulantes
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table id="tablePostulantesGeneral" class="table display text-center" style="width:100%">
                                                <thead>
                                                    <tr>
                                                        <th>CURP</th>
                                                        <th>Nombre</th>
                                                        <th>Primera suscripción</th>
                                                        <th>Última vacante</th>
                                                        <th>Último estatus</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
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

    <?php include("neptune_js.php"); ?>
    <?php include("scripts.php"); ?>

    <script src="scripts/PostulantesGeneral.js?v=2"></script>
</body>

</html>
