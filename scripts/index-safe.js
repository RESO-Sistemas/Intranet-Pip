// Wrapper para evitar errores cuando los elementos no existen
(function() {
  'use strict';
  
  // Esperar a que el DOM esté listo
  $(document).ready(function() {
    
    // Inicializar FileUpload solo si el elemento existe
    if ($('#fileUpload').length) {
      try {
        $("#fileUpload").fileUpload({
          id: "filesFeedForm",
          multiple: true,
        });
      } catch (e) {
        console.warn('FileUpload no pudo inicializarse:', e);
      }
    }

    // Inicializar botón de acción solo si existe
    if ($('#btn-actionGreen').length) {
      document.getElementById("btn-actionGreen").addEventListener("click", async function () {
        try {
          let resultV = await verifyInputs("formFeed");
          if (resultV) {
            var files = $("#filesFeedForm")[0].files;
            if (files.length > 0) {
              saveInfoFeed();
              $('#exampleModalCenteredScrollable').modal('hide');
            } else {
              Swal.fire({
                icon: 'info',
                title: 'Atención',
                text: 'Por favor, selecciona al menos un archivo.'
              });
              return false;
            }
          }
        } catch (e) {
          console.error('Error en btn-actionGreen:', e);
        }
      });
    }

    // Cargar funciones específicas de la página
    if (typeof llenadoFeed === 'function') {
      llenadoFeed();
    }
    
    if (typeof getDatosEmpleadoIndex === 'function') {
      getDatosEmpleadoIndex();
    }
    
    if (typeof getEventos === 'function') {
      getEventos();
    }

    // Inicializar calendario solo si el elemento existe
    if ($('#calendar').length) {
      try {
        initCalendar();
      } catch (e) {
        console.warn('Calendario no pudo inicializarse:', e);
      }
    }

  });

  // Funciones auxiliares
  window.verifyInputs = async function(formId) {
    // Tu lógica de verificación aquí
    return true;
  };

})();
