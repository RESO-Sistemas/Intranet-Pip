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

  .user-menu-trigger {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    padding: 6px !important;
    border-radius: 999px;
    transition: background-color 0.2s ease;
    line-height: 1;
  }

  .user-menu-trigger:hover {
    background: rgba(255, 215, 0, 0.12);
  }

  .user-menu-avatar {
    font-size: 20px;
    color: #666;
    width: auto;
    height: auto;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    line-height: 1;
    vertical-align: middle;
  }

  .user-menu-dropdown {
    min-width: 280px;
    padding: 10px;
    border: 0;
    border-radius: 20px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
  }

  .user-menu-card {
    padding: 14px 16px;
    border-radius: 16px;
    background: linear-gradient(180deg, #fafafa 0%, #f5f7fb 100%);
    border: 1px solid #eef1f4;
    margin-bottom: 8px;
  }

  .user-menu-name {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: #2d3436;
    line-height: 1.2;
  }

  .user-menu-email {
    margin: 6px 0 0;
    font-size: 0.84rem;
    color: #8a94a6;
    word-break: break-word;
  }

  .user-menu-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border-radius: 14px;
    font-weight: 600;
    color: #2d3436;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .user-menu-link:hover {
    background: #f8f9fc;
    transform: translateX(1px);
  }

  .user-menu-link i {
    color: #bfa200;
    font-size: 20px;
  }

  /* ── Dropdown de notificaciones ── */
  .notifications-dropdown {
    min-width: 360px;
    padding: 0;
    border: 0;
    border-radius: 20px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
    overflow: hidden;
  }

  .notifications-dropdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 10px;
    border-bottom: 1px solid #eef1f4;
  }

  .notifications-dropdown-header h6 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #2d3436;
  }

  .notifications-dropdown-list {
    max-height: 380px;
    overflow-y: auto;
    padding: 6px 0;
  }

  .notification-item-link {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: background 0.15s ease;
  }

  .notification-item-link:hover {
    background: #f8f9fc;
  }

  .notification-unread {
    background: rgba(255, 196, 7, 0.05);
    border-left: 3px solid #ffc407;
  }

  .notification-unread:hover {
    background: rgba(255, 196, 7, 0.1);
  }

  .notification-read {
    opacity: 0.75;
  }

  .notifications-dropdown-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 16px;
  }

  .notifications-dropdown-item-image {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .notifications-badge {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notifications-badge i {
    font-size: 20px;
  }

  .notifications-dropdown-item-text {
    flex: 1;
    min-width: 0;
  }

  .bold-notifications-text {
    margin: 0 0 2px;
    font-size: 0.87rem;
    font-weight: 600;
    color: #2d3436;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notification-message {
    display: block;
    font-size: 0.80rem;
    color: #636e72;
    line-height: 1.3;
    margin-bottom: 2px;
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .notification-time {
    font-size: 0.73rem;
    color: #b2bec3;
  }

  .notifications-empty {
    text-align: center;
    padding: 30px 16px;
    color: #b2bec3;
    font-size: 0.85rem;
  }

  .notifications-empty i {
    font-size: 36px;
    display: block;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  .notifications-dropdown-footer {
    padding: 10px 16px;
    border-top: 1px solid #eef1f4;
    text-align: center;
  }

  .notifications-dropdown-footer a {
    font-size: 0.82rem;
    font-weight: 600;
    color: #bfa200;
    text-decoration: none;
  }

  .notifications-dropdown-footer a:hover {
    text-decoration: underline;
  }

  /* ── Mobile panel notificaciones ── */
  .notifications-mobile-list {
    max-height: 320px;
    overflow-y: auto;
  }
</style>

<div class="app-header">
  <nav class="navbar navbar-light navbar-expand">
    <div class="container-fluid">
      <!-- Botón para toggle del sidebar -->
      <div class="navbar-nav" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link hide-sidebar-toggle-button" href="#"><i class="material-icons">menu</i></a>
          </li>
        </ul>
      </div>

      <!-- Sección derecha: Notificaciones y Perfil -->
      <div class="d-flex">
        <ul class="navbar-nav">

          <!-- NOTIFICACIONES - Dropdown unificado -->
          <li class="nav-item d-flex">
            <a class="nav-link position-relative" id="notificationsDropDown" href="#" data-bs-toggle="dropdown">
              <i class="material-icons">notifications</i>
              <span id="cantidadNotificacionesBadge"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style="display: none; font-size: 0.65rem; padding: 0.35em 0.65em; margin-top: 10px; margin-left: -10px;">
                0
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-end notifications-dropdown" aria-labelledby="notificationsDropDown">

              <!-- Encabezado del dropdown -->
              <div class="notifications-dropdown-header">
                <h6>Notificaciones</h6>
                <button type="button"
                        class="btn btn-sm btn-link p-0 text-muted"
                        style="font-size: 0.78rem; text-decoration: none;"
                        onclick="NotificationManager.markAllAsRead()">
                  Marcar todo como leído
                </button>
              </div>

              <!-- Lista de notificaciones (renderizada por JS) -->
              <div class="notifications-dropdown-list">
                <div id="notificationsListDesktop"></div>
                <!-- Estado vacío -->
                <div id="noNotificationsDesktop" class="notifications-empty" style="display: none;">
                  <i class="material-icons">notifications_none</i>
                  Sin notificaciones nuevas
                </div>
              </div>

              <!-- Pie del dropdown -->
              <div class="notifications-dropdown-footer">
                <a href="#" onclick="NotificationManager.refresh(); return false;">↻ Actualizar</a>
              </div>
            </div>
          </li>

          <!-- MODO OSCURO TOGGLE -->
          <li class="nav-item d-flex">
            <a class="nav-link" id="darkModeToggleHeader" href="#" title="Cambiar tema">
              <i class="material-icons" id="darkModeIconHeader">dark_mode</i>
            </a>
          </li>

          <!-- FOTO DE PERFIL Y MENÚ DE USUARIO -->
          <li class="nav-item d-flex">
            <a
              class="nav-link dropdown-toggle user-menu-trigger"
              id="userDropDown"
              href="javascript:void(0);"
              data-bs-toggle="dropdown">
              <i class="fa fa-user user-menu-avatar" aria-hidden="true" id="imgSmallProfile"></i>
            </a>
            <ul
              id="user_dropdown"
              class="dropdown-menu dropdown-menu-end user-menu-dropdown"
              aria-labelledby="userDropDown">
              <li>
                <div class="dropdown-item user-menu-card" style="cursor: pointer;" onclick="window.location.href='MiPerfil.php'">
                  <div class="u-text">
                    <h4 id="PerfilNombreEmp" class="user-menu-name"></h4>
                    <p id="PerfilCorreoEmp" class="user-menu-email"></p>
                  </div>
                </div>
              </li>
              <li>
                <a class="dropdown-item user-menu-link" href="index.php">
                  <i class="material-icons me-2">home</i>Inicio
                </a>
              </li>
              <li>
                <a class="dropdown-item user-menu-link" href="logout.php">
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
      <i class="fa fa-user mb-2" aria-hidden="true" id="profileImgMobile" style="font-size: 40px; color: #666; background: #f0f0f0; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;"></i>
      <h5 id="PerfilNombreEmpMobile" class="mb-1"></h5>
      <p id="PerfilCorreoEmpMobile" class="text-muted small"></p>
    </div>

    <hr>

    <!-- Notificaciones Mobile -->
    <div class="d-flex align-items-center justify-content-between mb-2">
      <h6 class="mb-0"><i class="material-icons align-middle">notifications</i> Notificaciones</h6>
      <button type="button" class="btn btn-sm btn-link p-0 text-muted" style="font-size: 0.78rem;"
              onclick="NotificationManager.markAllAsRead()">
        Marcar todo leído
      </button>
    </div>
    <div class="notifications-mobile-list mb-4">
      <div id="notificationsListMobile"></div>
      <p id="noNotificationsMobile" class="text-muted small text-center" style="padding: 10px 0; display: none;">
        Sin notificaciones nuevas
      </p>
    </div>

    <hr>

    <!-- Modo Oscuro Toggle Mobile -->
    <div class="text-center mb-4">
      <button class="btn btn-outline-primary" id="darkModeToggleMobile" title="Cambiar tema">
        <i class="material-icons" id="darkModeIconMobile">dark_mode</i>
        <span class="ms-2">Cambiar Tema</span>
      </button>
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
  var panel    = document.getElementById('mobileMenuPanel');
  var backdrop = document.getElementById('mobileMenuBackdrop');
  if (panel.classList.contains('open')) {
    closeMobileMenu();
  } else {
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeMobileMenu() {
  var panel    = document.getElementById('mobileMenuPanel');
  var backdrop = document.getElementById('mobileMenuBackdrop');
  panel.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}
</script>
