getListFeeds();

let tableFeeds = $("#tableFeeds").dataTable({

  language: {

    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",

    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",

    info: "PÁGINA _PAGE_ DE _PAGES_",

    infoEmpty: "NO HAY DATOS PARA MOSTRAR",

    infoFiltered: "",

    search: "BUSCAR",

    paginate: {

      previous: "ANTERIOR",

      next: "SIGUIENTE"

    }

  },

  columnDefs: [

    {

      className: "dt-center",

      targets: "_all",

    },

  ],

  order: [],

  bSort: true,

  bPaginate: true,

  bFilter: true,

  bInfo: true,

});



async function getListFeeds() {

  let datos = await {

    op: "getListFeeds",

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Feed/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (e) {

    console.log(e);

  } finally {

    tableFeeds.fnClearTable();

    let Feedb64 = "";

    for (var i = 0; i < respuesta.length; i++) {

      Feedb64 = btoa(respuesta[i]["idFeed"]);

      tableFeeds.fnAddData([
        respuesta[i]["Titulo"],
        `<div class="d-flex justify-content-center gap-2">
            <a class="btn btn-warning btn-accion" href="UpdateFeed.php?Feed=${Feedb64}" title="Editar Feed">
                <span class="material-symbols-outlined">edit</span>
            </a>
            <button class="btn btn-danger btn-accion" onclick="eliminarFeed('${Feedb64}')" title="Eliminar Feed">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>`,
      ]);

    }

  }

}



async function eliminarFeed(feed) {

  Swal.fire({

    title: "Confirmación de acción",

    html: `

      <div style="text-align: center">

        <p>Al eliminar el Feed sucederá lo siguiente:</p>

        <p>1.- El Feed dejará de mostrarse en la pantalla principal.</p>

        <p>2.- Se eliminarán los archivos integrados en el Feed.</p>

        <p>3.- Se eliminarán las reacciones relacionadas con el Feed.</p>

        <p style="margin-top:15px;"><strong>¿Desea continuar?</strong></p>

      </div>

    `,

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    confirmButtonText: "Aceptar",

    cancelButtonText: "Cancelar",

  }).then(async (result) => {

    if (result.isConfirmed) {

      let datos = {

        op: "eliminarFeed",

        idFeed: feed,

      };



      let respuesta = "";

      try {

        respuesta = await $.ajax({

          type: "post",

          url: "Backend/Feed/App.php",

          data: datos,

        });
        
        console.log("=== RESPUESTA ELIMINAR FEED ===");
        console.log("Response original:", respuesta);
        
        respuesta = respuesta.trim();
        console.log("Response trimmed:", respuesta);
        
        if (respuesta == "1") {
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Feed eliminado con éxito.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          getListFeeds();
        } else {
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Error!</span>
              <span class="alert-text">No se pudo eliminar el feed: ${respuesta}</span>
          </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }

      } catch (e) {

        console.error("Error en eliminarFeed:", e);
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Error!</span>
              <span class="alert-text">Error al eliminar el feed. Ver consola.</span>
        </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);

      }

    } else if (result.dismiss === Swal.DismissReason.cancel) {

      // Swal.fire("Cancelado", "La acción fue cancelada.", "info");

      const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">La acción fue cancelada.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    }

  });

}

