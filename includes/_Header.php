<!-- ========================================
     HEADER - Notificaciones y Menú de Usuario
     ======================================== -->
<style>
  /* Asegurar que notificaciones y perfil estén siempre visibles a la derecha */
  .navbar-nav .nav-item.d-flex {
    display: flex !important;
  }
  
  .navbar .d-flex {
    margin-left: auto !important;
  }
  
  /* Responsive - mantener visibles en todos los tamaños */
  @media (max-width: 991px) {
    .navbar-nav .nav-item.d-flex {
      display: flex !important;
    }
  }
  
  @media (max-width: 767px) {
    .navbar-nav .nav-item.d-flex {
      display: flex !important;
    }
  }
  
  /* Asegurar posición a la derecha */
  .navbar-nav {
    flex-direction: row;
    align-items: center;
  }
</style>

<div class="app-header">
  <nav class="navbar navbar-light navbar-expand">
    <div class="container-fluid">
      <!-- Botón para toggle del sidebar (solo visible en pantallas pequeñas) -->
      <div class="navbar-nav d-block d-lg-none" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">menu</i></a>
          </li>
        </ul>
      </div>

      <!-- Sección derecha: Notificaciones y Perfil -->
      <div class="d-flex">
        <ul class="navbar-nav">

          <!-- NOTIFICACIONES - Siempre visibles a la derecha -->
          <li class="nav-item d-flex">
            <a class="nav-link" id="notificationsDropDown" href="#" data-bs-toggle="dropdown">
              <i class="material-icons">notifications</i>
            </a>
            <div class="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">
              <h6 class="dropdown-header">Notificaciones</h6>
              <div class="notifications-dropdown-list">
                <div id="notificacionesPendienteLEtica"></div>
                <div id="notificacionesMenuLEtica"></div>
                <div id="notificacionesMenuSVacaciones"></div>
                <div id="notificacionesMenuSVacacionesNomina"></div>
                <div id="notificacionesCapacitacion"></div>
              </div>
            </div>
          </li>

          <!-- FOTO DE PERFIL Y MENÚ DE USUARIO - Siempre visible a la derecha -->
          <li class="nav-item d-flex">
            <a
              class="nav-link dropdown-toggle"
              id="userDropDown"
              href="javascript:void(0);"
              data-bs-toggle="dropdown">
              <img
                id="imgSmallProfile"
                alt="user"
                class="rounded-circle"
                width="30"
                height="30" />
            </a>
            <ul
              id="user_dropdown"
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropDown">
              <li>
                <div class="dropdown-item" style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                  <div class="u-img" style="padding-bottom: 10px; padding-top:10px;">
                    <img class="rounded-circle" id="profileImg" alt="user" width="60px" height="60px">
                  </div>
                  <div class="u-text">
                    <h4 id="PerfilNombreEmp"></h4>
                    <p id="PerfilCorreoEmp"></p>
                  </div>
                </div>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="index.php">
                  <i class="material-icons me-2">home</i>Inicio
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item d-flex align-items-center"
                  href="logout.php">
                  <i class="material-icons me-2">exit_to_app</i>Salir
                </a>
              </li>
            </ul>
          </li>



        </ul>
      </div>
    </div>
  </nav>
</div>

<!-- PANEL MOBILE - Fuera del navbar para evitar conflictos -->
<div class="mobile-menu-backdrop" id="mobileMenuBackdrop" onclick="closeMobileMenu()"></div>
<div class="mobile-menu-panel" id="mobileMenuPanel">
  <div class="mobile-menu-header">
    <h5>Menú</h5>
    <button type="button" class="btn-close" onclick="closeMobileMenu()" aria-label="Close"></button>
  </div>
  <div class="mobile-menu-body">
    
    <!-- Perfil Usuario Mobile -->
    <div class="mobile-user-profile mb-4 text-center" style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
      <img class="rounded-circle mb-2" id="profileImgMobile" alt="user" width="80px" height="80px">
      <h5 id="PerfilNombreEmpMobile" class="mb-1"></h5>
      <p id="PerfilCorreoEmpMobile" class="text-muted small"></p>
    </div>

    <hr>

    <!-- Notificaciones Mobile -->
    <h6 class="mb-3"><i class="material-icons align-middle">notifications</i> Notificaciones</h6>
    <div class="notifications-mobile-list mb-4">
      <div id="notificacionesPendienteLEticaMobile"></div>
      <div id="notificacionesMenuLEticaMobile"></div>
      <div id="notificacionesMenuSVacacionesMobile"></div>
      <div id="notificacionesMenuSVacacionesNominaMobile"></div>
      <div id="notificacionesCapacitacionMobile"></div>
      <p id="noNotificationsMobile" class="text-muted small text-center" style="padding: 10px 0;">Sin notificaciones nuevas</p>
    </div>

    <hr>

    <!-- Links Mobile -->
    <a class="d-flex align-items-center text-decoration-none text-dark py-2" href="index.php" onclick="closeMobileMenu()">
      <i class="material-icons me-2">home</i> Inicio
    </a>
    <a class="d-flex align-items-center text-decoration-none text-dark py-2" href="logout.php">
      <i class="material-icons me-2">exit_to_app</i> Salir
    </a>

  </div>
</div>

<script>
function toggleMobileMenu() {
  var panel = document.getElementById('mobileMenuPanel');
  var backdrop = document.getElementById('mobileMenuBackdrop');
  if (panel.classList.contains('open')) {
    closeMobileMenu();
  } else {
    // Mostrar/ocultar el mensaje "Sin notificaciones" según si hay contenido
    checkMobileNotifications();
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeMobileMenu() {
  var panel = document.getElementById('mobileMenuPanel');
  var backdrop = document.getElementById('mobileMenuBackdrop');
  panel.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}
function checkMobileNotifications() {
  var containers = [
    'notificacionesPendienteLEticaMobile',
    'notificacionesMenuLEticaMobile',
    'notificacionesMenuSVacacionesMobile',
    'notificacionesMenuSVacacionesNominaMobile',
    'notificacionesCapacitacionMobile'
  ];
  var hasNotifications = containers.some(function(id) {
    var el = document.getElementById(id);
    return el && el.innerHTML.trim().length > 0;
  });
  var noNotiMsg = document.getElementById('noNotificationsMobile');
  if (noNotiMsg) {
    noNotiMsg.style.display = hasNotifications ? 'none' : 'block';
  }
}
</script>
