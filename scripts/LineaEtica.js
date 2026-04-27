let mensajesGlobalData = [];
let idMensajeActivo = null;

const d_lista_LineaEtica = document.getElementById("listaMensajesEtica");
const d_emptyState = document.getElementById("emptyStateContainer");
const d_detalleContainer = document.getElementById("detalleMensajeContainer");
const d_detalleContent = document.getElementById("detalleMensajeContent");

cargarDatos();
async function cargarDatos() {
  await getMensajesLineaEtica();
}

async function getMensajesLineaEtica() {
  let datos = {
    op: "getMensajesLineaEtica",
  };
  const ajaxResponse = await pAjaxAsync(url_m_LineaE, datos, 0);

  if (ajaxResponse !== undefined && ajaxResponse.Datos) {
    mensajesGlobalData = ajaxResponse.Datos;
    let contHTML = "";

    mensajesGlobalData.forEach((d) => {
      const isActive = d.idLineaEticaMensajes == idMensajeActivo ? "active" : "";
      const isRevisado = d.Revisado == 1;
      const badgeStatus = isRevisado ? 
        '<span class="badge bg-success" style="font-size: 0.65rem;">Revisado</span>' : 
        '<span class="badge bg-warning text-dark" style="font-size: 0.65rem;">Pendiente</span>';

      contHTML += `
        <li>
            <a href="#" class="${isActive}" onclick="verDetalleMensaje(${d.idLineaEticaMensajes}, event)" style="padding: 15px; border-bottom: 1px solid #eee; display: block; text-decoration: none; color: inherit;">
                <div class="d-flex justify-content-end align-items-start mb-2">
                    ${badgeStatus}
                </div>
                <div class="text-muted" style="font-size: 0.8rem; margin-bottom: 5px;">
                    <i class="far fa-calendar-alt me-1"></i> ${d.Registro.split(' ')[0]}
                </div>
                <div class="fw-bold" style="font-size: 0.85rem; margin-bottom: 5px; color: #444;">
                    ${d.Descripcion}
                </div>
                <div class="text-muted text-truncate" style="font-size: 0.8rem; max-width: 100%;">
                    ${d.Mensaje}
                </div>
            </a>
        </li>
      `;
    });

    d_lista_LineaEtica.innerHTML = contHTML;
    
    // Si había un mensaje seleccionado, refrescamos su vista
    if (idMensajeActivo) {
        verDetalleMensaje(idMensajeActivo);
    }
  } else {
    mensajesGlobalData = [];
    if(d_lista_LineaEtica) {
        d_lista_LineaEtica.innerHTML = `
          <li class="p-4 text-center text-muted">
            <span class="material-symbols-outlined fs-2 d-block mb-2">inbox</span>
            Sin Registros
          </li>
        `;
    }
    mostrarEmptyState();
  }
}

function verDetalleMensaje(id, event) {
    if (event) event.preventDefault();
    
    idMensajeActivo = id;
    const msg = mensajesGlobalData.find(m => m.idLineaEticaMensajes == id);
    
    if (!msg) return;

    // Actualizar clases activas en la lista
    if (d_lista_LineaEtica) {
        const links = d_lista_LineaEtica.querySelectorAll('a');
        links.forEach(link => link.classList.remove('active'));
        
        if(event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        } else {
            // Find it via DOM if not clicked
            const targetLink = d_lista_LineaEtica.querySelector(`a[onclick*="verDetalleMensaje(${id}"]`);
            if(targetLink) targetLink.classList.add('active');
        }
    }

    // Ocultar empty state y mostrar contenedor de detalle
    d_emptyState.style.display = 'none';
    d_detalleContainer.style.display = 'block';

    const btnAccion = msg.Revisado == 0
        ? `<button onclick="checkMensajeEtica(${msg.idLineaEticaMensajes})" class="btn btn-warning d-flex align-items-center gap-2 px-4 fw-bold">
               <span class="material-symbols-outlined">check_circle</span>
               <span>Marcar como revisado</span>
           </button>`
        : `<span class="badge bg-success fs-6 px-4 py-2 d-flex align-items-center gap-2">
               <span class="material-symbols-outlined fs-5">done_all</span>
               Revisado
           </span>`;

    const htmlDetalle = `
        <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom flex-wrap gap-3">
            <div class="text-muted small">
                <i class="far fa-calendar-alt me-1"></i> Publicado el ${msg.Registro}
            </div>
            <div>
                ${btnAccion}
            </div>
        </div>

        <div class="row g-3 mb-4">
            <div class="col-12 col-md-4">
                <div class="p-3 bg-light rounded-3 border h-100">
                    <span class="d-block text-muted small mb-1 fw-semibold text-uppercase">Motivo / Categoría</span>
                    <strong class="text-primary fs-6">${msg.Descripcion}</strong>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="p-3 bg-light rounded-3 border h-100">
                    <span class="d-block text-muted small mb-1 fw-semibold text-uppercase">División Afectada</span>
                    <strong class="fs-6">${msg.Division}</strong>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="p-3 bg-light rounded-3 border h-100">
                    <span class="d-block text-muted small mb-1 fw-semibold text-uppercase">Sucursal</span>
                    <strong class="fs-6">${msg.Sucursal || 'N/A'}</strong>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <h6 class="fw-bold mb-3 d-flex align-items-center gap-2">
                <span class="material-symbols-outlined text-primary">description</span>
                Mensaje del Reporte
            </h6>
            <div class="p-4 bg-light rounded-3 border shadow-sm" style="min-height: 150px;">
                <p class="mb-0 text-dark" style="font-size: 1.05rem; line-height: 1.6; white-space: pre-wrap;">${msg.Mensaje}</p>
            </div>
        </div>
    `;

    d_detalleContent.innerHTML = htmlDetalle;
}

function mostrarEmptyState() {
    if(d_emptyState) d_emptyState.style.display = 'block';
    if(d_detalleContainer) d_detalleContainer.style.display = 'none';
    idMensajeActivo = null;
}

// function getMensajesLineaEtica () {
//   $("#ContenidoLineaEtica").html("");
//   datos = {
//     op: "getMensajesLineaEtica"
//   }
//   $.ajax({
//     type: "post",
//     url: "Backend/LineaEtica/App.php",
//     data: datos,
//     success:function(response){
//       response = JSON.parse(response.trim());
//       for (var i = 0; i < response.length; i++) {
//         $("#ContenidoLineaEtica").append(`
//            <div class="sl-right">
//             <div class="col s1 offset-s10 l1 offset-l10" style="position:absolute">
//               <button onclick="checkMensajeEtica(${response[i]["idLineaEticaMensajes"]})" class="btnAceptarVerde"><i class="fas fa-check-circle"></i></button>
//             </div>
//             <!--${response[i]["Nombre"]}     -      No Empleado: ${response[i]["NoEmpleado"]}-->
//              <div><i class="fa-sharp fa-solid fa-mask"></i><span style="color:gray; margin-left:0.5em;" class="">Usuario Anónimo</span>
//                  <p style="margin-top:2%">División afectada: <b>${response[i]["Division"]}</b></p>
//                  <p>Mensaje publicado el día <b>${response[i]["Registro"]}</b></p>
//                  <p>Motivo: <b>${response[i]["Descripcion"]}</b></p>
//                  <p>${response[i]["Mensaje"]}.</p>
//              </div>
//            </div>
//            <hr>
//           `);
//       }
//     },error:function(e){
//       alert(e.responseText);
//     }
//   });
// }

function checkMensajeEtica(val) {
  datos = {
    op: "vistoMensajeEtica",
    idLineaEticaMensajes: val,
  };
  $.ajax({
    type: "post",
    url: "Backend/LineaEtica/App.php",
    data: datos,
    success: function (response) {
      if (response == "1") {
        // toastr.success("Aceptado");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Aceptado.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        setTimeout(function () {
          getMensajesLineaEtica();
        }, 1000);
      } else if (response == "0") {
        // toastr.info("Error");
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
getOpcionesLineaEtica();

function getOpcionesLineaEtica() {
  let datasend = {
    op: "getOpcionesLineaEticaConfig",
  };
  let tableCatalogoLiniaEtica = $("#tableCatalogoLiniaEtica").dataTable({
    destroy: true,
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
    ajax: {
      type: "POST",
      url: "Backend/LineaEtica/App.php",
      data: datasend,
      success: function (response) {
        let StatusTexto = "";
        let statusBadge = "";
        let b64Catalogo = "";
        tableCatalogoLiniaEtica.fnClearTable();
        for (var i = 0; i < response.length; i++) {
          b64Catalogo = btoa(response[i]["idCatalogoLineaEtica"]);
          const isActive = response[i]["Status"] == 1;
          const statusIcon = isActive ? 'toggle_on' : 'toggle_off';
          const statusColor = isActive ? 'btn-success' : 'btn-danger';
          const statusTitle = isActive ? 'Desactivar' : 'Activar';
          
          let statusBadge = isActive 
            ? `<span class="badge bg-success">Activado</span>`
            : `<span class="badge bg-danger">Inactivo</span>`;

          tableCatalogoLiniaEtica.fnAddData([
            response[i]["Descripcion"],
            statusBadge,
            `<div class="d-flex justify-content-center gap-2">
                <button class="btn ${statusColor} btn-accion" 
                        onclick="updateCatalogoStatus('${b64Catalogo}')" 
                        title="${statusTitle}">
                    <span class="material-symbols-outlined">${statusIcon}</span>
                </button>
            </div>`,
          ]);
        }
      },
      complete: function () {
        // $.unblockUI();
      },
    },
  });
}

async function updateCatalogoStatus(val) {
  let datos = await {
    op: "updateCatalogoStatus",
    idCatalogoLineaEtica: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/LineaEtica/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      // toastr.success("Status Actualizado");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Status Actualizado.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      getOpcionesLineaEtica();
    } else {
      // toastr.info("ERROR");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">ERROR.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
}

$("#btnAgregaNuevoCatalogo").click(function () {
  if (document.getElementById("formInsertaCatalogo").checkValidity()) {
    event.preventDefault();
    let form = $("#formInsertaCatalogo")[0];
    let data = new FormData(form);
    $.ajax({
      type: "post",
      url: "Backend/LineaEtica/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response == "1") {
          // Swal.fire("Agregado", "Feed Agregado", "success");
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Feed Agregado.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          $("#txtNuevaEtica").val("");
          setTimeout(function () {
            getOpcionesLineaEtica();
          }, 1000);
        } else {
          // toastr.warning("Algo salió mal, Intente de nuevo");
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salio mal, Intente de nuevo</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // toastr.warning("Ingrese todos los datos");
    const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Ingrese todos los datos</span>
            </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
  }
});
