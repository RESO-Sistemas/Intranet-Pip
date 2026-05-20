/**
 * NotificationManager — Módulo centralizado de notificaciones
 * Reemplaza las 6 llamadas AJAX independientes de global.js por una sola.
 * 
 * API del módulo:
 *   NotificationManager.init()       — Inicializa, carga y arranca el polling
 *   NotificationManager.refresh()    — Refresca manualmente las notificaciones
 *   NotificationManager.markAsRead(id) — Marca una notificación como leída
 *   NotificationManager.markAllAsRead() — Marca todas como leídas
 */

const NotificationManager = (() => {
  // ─── Configuración ───────────────────────────────────────────────────────────
  const API_URL       = 'Backend/Notifications/App.php';
  const SSE_URL       = 'Backend/Notifications/stream.php';
  const POLL_INTERVAL = 5 * 60 * 1000; // fallback si SSE no está disponible
  let   _pollTimer    = null;
  let   _onRefreshHooks = [];

  // Mapa de íconos y colores por tipo de notificación
  const TYPE_CONFIG = {
    vacation:   { icon: 'beach_access',   colorClass: 'bg-primary'  },
    ethics:     { icon: 'balance',        colorClass: 'bg-warning'  },
    training:   { icon: 'school',         colorClass: 'bg-success'  },
    evaluation: { icon: 'assignment',     colorClass: 'bg-danger'   },
    general:    { icon: 'notifications',  colorClass: 'bg-secondary'},
  };

  // ─── Renderizado ─────────────────────────────────────────────────────────────

  /**
   * Genera el HTML de un ítem de notificación individual.
   * Se usa tanto para desktop como para mobile.
   */
  function _buildItemHTML(notification) {
    const config  = TYPE_CONFIG[notification.type] || TYPE_CONFIG.general;
    const readCls = notification.isRead ? 'notification-read' : 'notification-unread';
    const linkHref = notification.link || '#';
    const id       = notification.id;

    return `
      <a href="${linkHref}"
         class="notification-item-link ${readCls}"
         data-notification-id="${id}"
         onclick="NotificationManager.markAsRead(${id}, event, '${linkHref}')">
        <div class="notifications-dropdown-item">
          <div class="notifications-dropdown-item-image">
            <span class="notifications-badge ${config.colorClass} text-white">
              <i class="material-icons-outlined">${config.icon}</i>
            </span>
          </div>
          <div class="notifications-dropdown-item-text">
            <p class="bold-notifications-text mb-0">${notification.title}</p>
            <small class="text-muted notification-message">${notification.message}</small>
            <small class="d-block text-muted notification-time">${notification.timeAgo}</small>
          </div>
        </div>
      </a>`;
  }

  /**
   * Renderiza la lista de notificaciones en los contenedores del DOM
   * (dropdown de desktop y panel mobile), unificando el HTML en un solo lugar.
   */
  function _renderList(notifications) {
    const desktopContainer = document.getElementById('notificationsListDesktop');
    const mobileContainer  = document.getElementById('notificationsListMobile');
    const emptyDesktop     = document.getElementById('noNotificationsDesktop');
    const emptyMobile      = document.getElementById('noNotificationsMobile');

    if (!desktopContainer) return;

    if (!notifications || notifications.length === 0) {
      desktopContainer.innerHTML = '';
      if (mobileContainer)  mobileContainer.innerHTML  = '';
      if (emptyDesktop)     emptyDesktop.style.display  = 'block';
      if (emptyMobile)      emptyMobile.style.display   = 'block';
      return;
    }

    // Ocultar mensajes de vacío
    if (emptyDesktop) emptyDesktop.style.display = 'none';
    if (emptyMobile)  emptyMobile.style.display  = 'none';

    // Construir HTML una sola vez y clonarlo para mobile
    const html = notifications.map(_buildItemHTML).join('');
    desktopContainer.innerHTML = html;
    if (mobileContainer) mobileContainer.innerHTML = html;
  }

  /**
   * Actualiza el badge del ícono de la campana.
   */
  function _renderBadge(count) {
    const badge = document.getElementById('cantidadNotificacionesBadge');
    if (!badge) return;

    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  }

  /**
   * Muestra un toast emergente para notificaciones nuevas no vistas en esta sesión.
   */
  function _maybeShowToast(notification) {
    const sessionKey = 'pip_notif_shown_' + notification.id;
    if (sessionStorage.getItem(sessionKey)) return;

    const config  = TYPE_CONFIG[notification.type] || TYPE_CONFIG.general;
    const content = `
      <div class="alert-content">
        <span class="alert-title">${notification.title}</span>
        <span class="alert-text">${notification.message}</span>
      </div>`;

    if (typeof showBootstrapAlert === 'function') {
      showBootstrapAlert(content, 'top-right', 5000);
    }
    sessionStorage.setItem(sessionKey, '1');
  }

  // ─── Lógica de red ───────────────────────────────────────────────────────────

  /**
   * Obtiene las notificaciones del backend (1 sola petición AJAX).
   */
  async function _fetchNotifications() {
    try {
      const response = await $.ajax({
        type    : 'POST',
        url     : API_URL,
        data    : { op: 'getNotifications' },
        dataType: 'json',
      });

      if (!response || !response.Resultado) return;

      const notifications = response.Notifications || [];

      // Renderizar lista
      _renderList(notifications);

      // Calcular y renderizar badge desde los datos ya descargados
      const unreadCount = notifications.filter(n => !n.isRead).length;
      _renderBadge(unreadCount);

      // Mostrar toasts solo para las no leídas y no vistas en esta sesión
      notifications
        .filter(n => !n.isRead)
        .forEach(_maybeShowToast);

      _onRefreshHooks.forEach(fn => {
        if (typeof fn === 'function') {
          try { fn(); } catch (e) { console.warn('[NotificationManager] Error en callback onRefresh:', e); }
        }
      });

    } catch (err) {
      // Fallo silencioso en segundo plano — no interrumpir el flujo del usuario
      console.warn('[NotificationManager] Error al obtener notificaciones:', err);
    }
  }

  // ─── API pública ─────────────────────────────────────────────────────────────

  /**
   * Inicializa el módulo: carga y arranca el polling.
   * Debe llamarse una sola vez desde global.js al cargar la página.
   */
  function init() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'login.php') return;

    _fetchNotifications();

    if (typeof EventSource !== 'undefined') {
      const sse = new EventSource(SSE_URL);
      sse.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.auth === false) { sse.close(); return; }
        } catch (_) {}
        _fetchNotifications();
      };
      // onerror: EventSource reconecta solo — no necesita fallback manual
    } else {
      _startPollingFallback();
    }
  }

  function _startPollingFallback() {
    if (_pollTimer) return;
    _pollTimer = setInterval(() => {
      if (navigator.onLine) _fetchNotifications();
    }, POLL_INTERVAL);
  }

  /**
   * Refresca las notificaciones manualmente (útil tras crear/resolver solicitudes).
   */
  function refresh() {
    _fetchNotifications();
  }

  /**
   * Marca una notificación como leída y navega al enlace si existe.
   * Se llama desde el onclick del ítem renderizado.
   */
  async function markAsRead(id, event, link) {
    if (event) event.preventDefault();

    // Ocultar el punto rojo del ítem inmediatamente (optimistic UI)
    const item = document.querySelector(`[data-notification-id="${id}"]`);
    if (item) item.classList.remove('notification-unread');

    try {
      const response = await $.ajax({
        type    : 'POST',
        url     : API_URL,
        data    : { op: 'markAsRead', id },
        dataType: 'json',
      });

      if (response && response.Resultado) {
        _renderBadge(response.UnreadCount);
      }
    } catch (err) {
      console.warn('[NotificationManager] Error al marcar como leída:', err);
    }

    // Navegar al enlace si existe y es diferente a #
    if (link && link !== '#' && link !== '') {
      window.location.href = link;
    }
  }

  /**
   * Marca todas las notificaciones como leídas.
   */
  async function markAllAsRead() {
    try {
      const response = await $.ajax({
        type    : 'POST',
        url     : API_URL,
        data    : { op: 'markAllAsRead' },
        dataType: 'json',
      });

      if (response && response.Resultado) {
        _renderBadge(0);
        // Quitar estilos de "no leída" de todos los ítems visibles
        document.querySelectorAll('.notification-unread')
          .forEach(el => el.classList.remove('notification-unread'));
      }
    } catch (err) {
      console.warn('[NotificationManager] Error al marcar todas como leídas:', err);
    }
  }

  function onRefresh(fn) { if (typeof fn === 'function') _onRefreshHooks.push(fn); }

  // Exponer API pública
  return { init, refresh, markAsRead, markAllAsRead, onRefresh };
})();
