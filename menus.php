   <?php
    require_once("Backend/Configuracion/Configuracion.php");
    $Conf = new Configuracion();
    $MenuP = $Conf->getMenusPadre();
    ?>

   <div class="app-sidebar">
     <div class="logo">
       <a href="index.php" class="logo-icon"><img src="assets/images/logo-esmeralda.png" alt="Logo"></a>
       <!-- <div class="sidebar-user-switcher user-activity-online">
         <a href="javascript: void(0);" data-target="user_dropdown">
           <img id="imgSmallProfile" alt="user">
           <span class="activity-indicator"></span>

         </a>
       </div> -->
     </div>
     <div class="app-menu">

       <?php
         $noEmpleadoMenu = SessionManager::get('NoEmpleado');
         $esBossResult = $Conf->Select("SELECT COUNT(*) AS total FROM EvaluacionDetalle WHERE NoEmpleadoEvalua = '$noEmpleadoMenu' AND JefeEvalua = 1", array());
         $esBoss = !empty($esBossResult) && $esBossResult[0]['total'] > 0;
       ?>
       <ul class="accordion-menu">
         <!-- Menú INICIO manual, siempre primero -->
         <li>
           <a href="index.php"><i class="material-icons-two-tone">home</i>INICIO</a>
         </li>
         <!-- Planes de acción: disponibles para todos sin permisos en BD -->
         <li>
           <a href="my-action-plans.php"><i class="material-icons-two-tone">task_alt</i>MIS PLANES</a>
         </li>
         <?php if ($esBoss): ?>
         <li>
           <a href="list-plan-action.php"><i class="material-icons-two-tone">group</i>PLANES DEL EQUIPO</a>
         </li>
         <?php endif; ?>
         <?php
          $iconMap = [
            'PRINCIPAL'        => 'dashboard',
            'EVALUACIONES'     => 'assignment',
            'CATÁLOGOS'        => 'library_books',
            'DASHBOARD'        => 'speed',
            "MÓDULO KPI'S"     => 'bar_chart',
            'CHECKLISTS'       => 'fact_check',
            'INCIDENCIAS'      => 'warning',
          ];
          for ($i = 0; $i < sizeof($MenuP); $i++) {
            $id_menuP = $MenuP[$i]["id_menu"];
            $Descripcion = $MenuP[$i]["Descripcion"];
            $icono = isset($iconMap[$Descripcion]) ? $iconMap[$Descripcion] : 'folder';

            $menusHijo = new Configuracion();
            $MenuH = $menusHijo->getMenusHijo($id_menuP);
         ?>
           <li>
             <a href="javascript: void(0);"><i class="material-icons-two-tone"><?php echo $icono ?></i><?php echo $Descripcion ?><i class="material-icons has-sub-menu">keyboard_arrow_right</i></a>
             <ul class="sub-menu">
               <?php
                for ($j = 0; $j < sizeof($MenuH); $j++) {
                  $id_menuH = $MenuH[$j]["id_menu"];
                  $DescripcionH = $MenuH[$j]["Descripcion"];
                  $URLH = $MenuH[$j]["URL"];
                  $ArgumentosH = $MenuH[$j]["Argumentos"];
               ?>
                 <li>
                   <a href="<?php echo $URLH ?>" <?php if ($URLH === 'pending-evaluations.php') echo 'id="menu-item-pending-evals"'; ?>><?php echo $DescripcionH ?></a>
                 </li>
               <?php
                }
                ?>
             </ul>
           </li>
         <?php
          }
         ?>
       </ul>
     </div>
   </div>