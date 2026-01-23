<!-- ========================================
     HEADER - Notificaciones y Menú de Usuario
     ======================================== -->
<div class="app-header">
  <nav class="navbar navbar-light navbar-expand-lg">
    <div class="container-fluid">
      <!-- Botón para toggle del sidebar -->
      <div class="navbar-nav" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">first_page</i></a>
          </li>
        </ul>
      </div>

      <!-- Sección derecha: Notificaciones y Perfil -->
      <div class="d-flex">
        <ul class="navbar-nav">

          <!-- NOTIFICACIONES -->
          <li class="nav-item hidden-on-mobile">
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

          <!-- FOTO DE PERFIL Y MENÚ DE USUARIO -->
          <li class="nav-item hidden-on-mobile">
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
