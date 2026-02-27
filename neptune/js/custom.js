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
});