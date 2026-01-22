   <?php
    require_once("Backend/Configuracion/Configuracion.php");
    $Conf = new Configuracion();
    $MenuP = $Conf->getMenusPadre();
    ?>

   <div class="app-sidebar">
     <div class="logo">
       <a href="index.php" class="logo-icon"><span class="logo-text">Intranet</span></a>
       <!-- <div class="sidebar-user-switcher user-activity-online">
         <a href="javascript: void(0);" data-target="user_dropdown">
           <img id="imgSmallProfile" alt="user">
           <span class="activity-indicator"></span>

         </a>
       </div> -->
     </div>
     <div class="app-menu">

       <ul class="accordion-menu">
         <?php
          for ($i = 0; $i < sizeof($MenuP); $i++) {
            $id_menuP = $MenuP[$i]["id_menu"];
            $Descripcion = $MenuP[$i]["Descripcion"];

            $menusHijo = new Configuracion();
            $MenuH = $menusHijo->getMenusHijo($id_menuP);
          ?>
           <li>
             <a href="javascript: void(0);"><i class="material-icons-two-tone">inbox</i><?php echo $Descripcion ?><i class="material-icons has-sub-menu">keyboard_arrow_right</i></a>
             <ul class="sub-menu">
               <?php
                for ($j = 0; $j < sizeof($MenuH); $j++) {
                  $id_menuH = $MenuH[$j]["id_menu"];
                  $DescripcionH = $MenuH[$j]["Descripcion"];
                  $URLH = $MenuH[$j]["URL"];
                  $ArgumentosH = $MenuH[$j]["Argumentos"];
                ?>
                 <li>
                   <a href="<?php echo $URLH ?>"><?php echo $DescripcionH ?></a>
                 </li>
               <?php
                }
                ?>
               <!-- <li>
                 <a href="pricing.html">Pricing</a>
               </li>
               <li>
                 <a href="invoice.html">Invoice</a>
               </li>
               <li>
                 <a href="settings.html">Settings</a>
               </li>
               <li>
                 <a href="#">Authentication</a>
               </li>
               <li>
                 <a href="error.html">Error</a>
               </li> -->
             </ul>
           </li>
         <?php
          }
          ?>
       </ul>
     </div>
   </div>