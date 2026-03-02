// Here goes your custom javascript

$(document).ready(function() {
    // Detectar página actual y marcar menú activo
    var currentPage = window.location.pathname.split('/').pop().split('?')[0];
    
    // Buscar el link que coincide con la página actual
    $('.app-sidebar .app-menu .sub-menu a').each(function() {
        var linkHref = $(this).attr('href');
        if (linkHref) {
            var linkPage = linkHref.split('/').pop().split('?')[0];
            if (linkPage === currentPage) {
                $(this).closest('li').addClass('active');
                // Abrir el menú padre
                $(this).closest('ul.sub-menu').slideDown();
                $(this).closest('ul.sub-menu').closest('li').addClass('open');
            }
        }
    });

    // ============================================
    // FUNCIONES PARA MANEJO DE COOKIES
    // ============================================
    
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
    // ============================================
    // DARK MODE TOGGLE CON COOKIES
    // ============================================
    
    // Crear botón de toggle si no existe
    if ($('.dark-mode-toggle').length === 0) {
        $('body').append(
            '<button class="dark-mode-toggle" id="darkModeToggle" title="Cambiar tema">' +
            '<i class="material-icons" id="darkModeIcon">dark_mode</i>' +
            '</button>'
        );
    }
    
    // Verificar si hay preferencia guardada en cookie
    var savedTheme = getCookie('darkMode');
    if (savedTheme === 'enabled') {
        $('body').addClass('dark-mode');
        $('#darkModeIcon').text('light_mode');
    }
    
    // Toggle dark mode al hacer clic
    $('#darkModeToggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        
        if ($('body').hasClass('dark-mode')) {
            setCookie('darkMode', 'enabled', 365); // Cookie válida por 1 año
            $('#darkModeIcon').text('light_mode');
        } else {
            setCookie('darkMode', 'disabled', 365);
            $('#darkModeIcon').text('dark_mode');
        }
    });
});