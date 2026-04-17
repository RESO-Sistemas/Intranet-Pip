let tableFeeds;
getListFeeds();

async function getListFeeds() {
  let datos = {
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
    const dataSource = (respuesta || []).map((feed) => ({
      ...feed,
      Feedb64: btoa(String(feed.idFeed || "")),
    }));

    if (tableFeeds) {
      tableFeeds.destroy();
    }

    ej.grids.Grid.Inject(ej.grids.Toolbar, ej.grids.Page);

    tableFeeds = new ej.grids.Grid({
      dataSource: dataSource,
      toolbar: ["Search"],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },

      // 1. Diseño del mensaje mejorado y profesional
      emptyRecordTemplate: `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 350px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
      <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background-color: #f1f3f5; border-radius: 50%;">
          <span class="material-symbols-outlined" style="font-size: 40px; color: #adb5bd;">inbox</span>
      </div>
      <h5 class="text-dark mb-2" style="font-weight: 600;">No hay feeds registrados</h5>
      <p class="text-muted mb-0" style="max-width: 350px; font-size: 14px;">Aún no se ha encontrado ningún registro en la base de datos. Los feeds que agregues aparecerán en esta lista.</p>
  </div>`,

      columns: [
        { field: "Titulo", headerText: "TÍTULO", width: 220 },
        {
          headerText: "ACCIONES",
          width: 150,
          textAlign: "Center",
          template: `<div class="d-flex justify-content-center gap-2">
          <button type="button" class="btn btn-warning btn-accion btn-editar-feed" title="Editar Feed">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button type="button" class="btn btn-danger btn-accion btn-eliminar-feed" title="Eliminar Feed">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>`,
        },
      ],

      // 2. Evento dataBound para ocultar headers, buscador y paginador si no hay registros
      dataBound: function () {
        const gridElement = this.element;
        const toolbar = gridElement.querySelector(".e-toolbar");
        const header = gridElement.querySelector(".e-gridheader");
        const pager = gridElement.querySelector(".e-gridpager");
        const gridContent = gridElement.querySelector(".e-gridcontent");

        // Comprobamos si la vista actual no tiene registros
        if (this.currentViewData.length === 0) {
          // Ocultar elementos
          if (toolbar) toolbar.style.display = "none";
          if (header) header.style.display = "none";
          if (pager) pager.style.display = "none";

          // Opcional: Quitar bordes del contenedor principal para que luzca como un canvas limpio
          gridElement.style.border = "none";
          if (gridContent) gridContent.style.border = "none";
        } else {
          // Restaurar elementos si se agrega información
          if (toolbar) toolbar.style.display = "";
          if (header) header.style.display = "";
          if (pager) pager.style.display = "";

          // Restaurar bordes
          gridElement.style.border = "";
          if (gridContent) gridContent.style.border = "";
        }
      },

      recordClick: (args) => {
        const rowData = args.rowData || {};
        const feedb64 = rowData.Feedb64 || "";
        const clickedElement = args.target;

        if (!clickedElement || typeof clickedElement.closest !== "function") {
          return;
        }

        if (clickedElement.closest(".btn-editar-feed")) {
          window.location.href = `UpdateFeed.php?Feed=${encodeURIComponent(feedb64)}`;
          return;
        }

        if (clickedElement.closest(".btn-eliminar-feed")) {
          eliminarFeed(feedb64);
        }
      },

      created: () => {
        const searchInput = document.getElementById(
          tableFeeds.element.id + "_searchbar",
        );
        if (searchInput) {
          searchInput.addEventListener("keyup", (event) => {
            tableFeeds.search(event.target.value);
          });
        }
      },
    });

    tableFeeds.appendTo("#TableFeeds");
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
