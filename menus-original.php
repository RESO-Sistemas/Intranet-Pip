<?php
  require_once("Backend/Configuracion/Configuracion.php");
  $Conf = new Configuracion();
  $MenuP = $Conf->getMenusPadre();
 ?>
 <header class="topbar">
     <nav>
         <div class="nav-wrapper">
             <a href="index.php" class="brand-logo">
                 <span class="icon">
                     <img class="dark-logo" width="35px" src="assets/images/logo-pip.png" >
                 </span>
                 <span class="text">
                     <img class="light-logo" src="assets/images/logo-light-text.png">
                     <img class="dark-logo" style="width: 75%;" src="assets/images/descarga-PhotoRoom.png">
                 </span>
             </a>
             <ul class="left">
                 <li class="hide-on-med-and-down">
                     <a href="javascript: void(0);" class="nav-toggle">
                         <span class="bars bar1"></span>
                         <span class="bars bar2"></span>
                         <span class="bars bar3"></span>
                     </a>
                 </li>
                 <li class="hide-on-large-only">
                     <a href="javascript: void(0);" class="sidebar-toggle">
                         <span class="bars bar1"></span>
                         <span class="bars bar2"></span>
                         <span class="bars bar3"></span>
                     </a>
                 </li>
                 <li><span class="new badge blue" id="cantidadNotificaciones" style="background-color:white;"></span><a class="dropdown-trigger" href="javascript: void(0);" data-target="noti_dropdown"><i class="material-icons">notifications</i></a>
                     <ul id="noti_dropdown" class="mailbox dropdown-content">
                         <li>
                             <div class="drop-title">Notifications</div>
                         </li>
                         <li>
                             <div class="message-center">
                                <div id="notificacionesPendienteLEtica"></div>
                                <div id="notificacionesMenuLEtica"></div>
                                <div id="notificacionesMenuSVacaciones"></div>
                                <div id="notificacionesMenuSVacacionesNomina"></div>
                                <div id="notificacionesCapacitacion"></div>
                             </div>
                         </li>
                     </ul>
                 </li>
             </ul>
             <ul class="right">
               <li><a class="dropdown-trigger" href="javascript: void(0);" data-target="user_dropdown"><img id="imgSmallProfile" alt="user" class="circle profile-pic"></a>
                     <ul id="user_dropdown" class="mailbox dropdown-content dropdown-user">
                         <li>
                             <div class="dw-user-box">
                                 <div class="u-img"><img id="profileImg" alt="user"></div>
                                 <div class="u-text">
                                     <h4 id="PerfilNombreEmp"></h4>
                                     <p id="PerfilCorreoEmp"></p>
                                     <!-- <a class="waves-effect waves-light btn-small red white-text" href="index.php">Perfil</a> -->
                                 </div>
                             </div>
                         </li>
                         <li role="separator" class="divider"></li>
                         <!-- <li><a href="#"><i class="material-icons">account_circle</i> Mi Perfil</a></li> -->
                         <!-- <li><a href="index.php"><i class="material-icons">inbox</i> Perfil</a></li> -->
                         <li role="separator" class="divider"></li>
                         <!-- <li><a href="#"><i class="material-icons">settings</i> Configurar cuenta</a></li>
                         <li role="separator" class="divider"></li> -->
                         <li><a href="logout.php"><i class="material-icons">power_settings_new</i> Salir</a></li>
                     </ul>
                 </li>
             </ul>
         </div>
     </nav>
 </header>

<aside class="left-sidebar">
  <ul id="slide-out" class="sidenav">
      <li>
        <ul class="collapsible">
          <?php
            for ($i=0; $i < sizeof($MenuP) ; $i++) {
              $id_menuP = $MenuP[$i]["id_menu"];
              $Descripcion = $MenuP[$i]["Descripcion"];

              $menusHijo = new Configuracion();
              $MenuH = $menusHijo->getMenusHijo($id_menuP);
           ?>
          <li>
            <a href="javascript: void(0);" class="collapsible-header has-arrow"><i class="material-icons">dashboard</i><span class="hide-menu"> <?php echo $Descripcion ?></span></a>
            <div class="collapsible-body">
                <ul>
                  <?php
                    for ($j=0; $j < sizeof($MenuH) ; $j++) {
                      $id_menuH = $MenuH[$j]["id_menu"];
                      $DescripcionH = $MenuH[$j]["Descripcion"];
                      $URLH = $MenuH[$j]["URL"];
                      $ArgumentosH = $MenuH[$j]["Argumentos"];
                   ?>
                    <li><a href="<?php echo $URLH ?>"><i class="material-icons"><?php echo $ArgumentosH ?></i><span class="hide-menu"><?php echo $DescripcionH ?></span></a></li>
                   <?php
                    }
                    ?>
                </ul>
              </div>
            </li>
          <?php
            }
           ?>
          </ul>
        </li>
      </ul>
  </aside>
