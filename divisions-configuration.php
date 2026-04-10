<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>

<html>



<head>



  <meta charset="utf-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

  <title>PIP by Lugo</title>

  <!-- Styles neptune -->



  <?php include("neptune_styles.php");  ?>

  <style>
    /* Premium UI Styles for Divisions Config */
    .division-card {
      background: #fafafa;
      border: 1px solid #ebebeb;
      border-radius: 14px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      overflow: hidden;
      height: 100%;
    }
    
    .division-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      transform: translateY(-4px);
    }
    
    .div-card-header {
      padding: 18px 22px;
      border-bottom: 1px solid #eee;
      background: rgba(0, 0, 0, 0.015);
      font-weight: 700;
      font-size: 1.15rem;
      color: #2b3035;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .div-card-header i {
      color: #2269f5;
      font-size: 1.3rem;
    }

    .div-day-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 22px;
      border-bottom: 1px solid #f2f2f2;
      transition: background-color 0.2s;
    }
    .div-day-item:last-child {
      border-bottom: none;
    }
    .div-day-item:hover {
      background-color: #fcfcfc;
    }

    .day-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .day-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: #f0f4ff;
      color: #2269f5;
    }

    .day-icon.festivo {
      background: #fff5f0;
      color: #fd7e14;
    }

    .day-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #495057;
    }

    /* Status Label (Laborable vs Descanso) */
    .status-label {
      font-weight: 600;
      font-size: 0.8rem;
      user-select: none;
      transition: color 0.3s;
      margin-right: 10px;
      min-width: 90px;
      text-align: right;
    }
    .status-laborable { color: #28a745; }
    .status-descanso  { color: #6c757d; }

    /* Switch Custom Sizing */
    .form-switch .form-check-input {
      width: 2.8em;
      height: 1.4em;
      cursor: pointer;
    }
    .form-switch .form-check-input:focus {
      box-shadow: 0 0 0 0.25rem rgba(34, 105, 245, 0.25);
    }
    
    /* Dark Mode Support (.dark-mode) */
    body.dark-mode .division-card {
      background: #2a3038;
      border-color: #3d4450;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    body.dark-mode .div-card-header {
      background: rgba(0,0,0,0.2);
      border-bottom-color: #3d4450;
      color: #eef0f7;
    }
    body.dark-mode .div-day-item {
      border-bottom-color: #3d4450;
    }
    body.dark-mode .div-day-item:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }
    body.dark-mode .day-icon { background: rgba(34, 105, 245, 0.2); }
    body.dark-mode .day-icon.festivo { background: rgba(253, 126, 20, 0.2); }
    body.dark-mode .day-name { color: #aebad2; }
    body.dark-mode .status-descanso { color: #8892a0; }
  </style>



  <!-- Styles neptune -->



</head>



<body>

  <div class="app align-content-stretch d-flex flex-wrap" id="main-wrapper">

    <!-- ============================================================== -->

    <!-- Preloader - style you can find in spinners.css -->

    <!-- ============================================================== -->

    <div class="preloader">

      <div class="loader">

        <div class="loader__figure"></div>

        <!-- <p class="loader__label">PIP</p> -->

      </div>

    </div>

    <div id="Menu">

      <?php

      include("menus.php");

      ?>

    </div>

    <div class="app-container">
      <?php include("includes/_Header.php"); ?>

      <div class="app-content">

        <div class="content-wrapper">

          <div class="container">

            <div class="row">

              <div class="col s10 offset-s1 l5 offset-l7" style="position: fixed; z-index:99;">

                <div class="row">

                  <div class="col s12 l12" style="position: relative;">

                    <div id="contenidoMensajes" style="margin-right:2vh"></div>

                  </div>

                  <div class="col s12 l12" style="position: relative;">

                    <div id="contenidoMensajesSolicitudesVJefe" style="margin-right:2vh"></div>

                  </div>

                  <div class="col s12 l12" style="position: relative;">

                    <div id="contenidoMensajesSolicitudesNomina" style="margin-right:2vh"></div>

                  </div>

                </div>

              </div>

            </div>

            <div class="row">

              <div class="col">

                <div class="page-description d-flex flex-column mb-4">
                  <h1>Configuración de Asistencia por División</h1>
                  <span class="text-muted mt-2">Configura los días laborables para cada división. Al encender un interruptor, el día se marcará como "Laborable", si está apagado será "Descanso".</span>
                </div>

              </div>

            </div>

            <div class="row">

              <div class="card">

                <div class="card-body">

                  <div class="row" id="contenidoDiasDescanso">



                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>









  <!-- neptune Javascripts -->
  <?php include("neptune_js.php");  ?>
  <!-- neptune Javascripts -->

  <?php include("scripts.php"); ?>

  <!-- Scripts específicos de esta página -->
  <script src="scripts/divisions-configuration.js" charset="utf-8"></script>

</body>
</html>