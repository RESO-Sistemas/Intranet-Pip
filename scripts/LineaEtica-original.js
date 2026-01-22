const d_cont_LineaEtica = document.getElementById('ContenidoLineaEtica');
cargarDatos();
async function cargarDatos(){
  await getMensajesLineaEtica();
}

async function getMensajesLineaEtica(){
  let datos = {
    op: "getMensajesLineaEtica"
  };
  const ajaxResponse = await pAjaxAsync(url_m_LineaE,datos,0);
  if (ajaxResponse !== undefined) {
    const dataResponse = ajaxResponse.Datos;
    let contHTML = "";
    let contBtn = "";
    dataResponse.forEach( d => {
      if (d.Revisado == 0) {
        contBtn = `<button onclick="checkMensajeEtica(${d.idLineaEticaMensajes})" class="btnAceptarVerde"><i class="fas fa-check-circle"></i></button>`;
      } else {
        contBtn = `<h2 class="textRevisado">REVISADO</h2>`;
      }
      contHTML += `
      <div class="card-panel z-depth-2" style="margin-bottom: 2.5em; border-radius: 10px; padding: 2em;">
        <div class="row valign-wrapper" style="margin-bottom: 1.5em;">
          <div class="col s12 m6">
            <p style="margin: 0;">
              <i class="fa-sharp fa-solid fa-mask grey-text text-darken-1" style="margin-right: 0.5em;"></i>
              <span class="grey-text text-darken-2">Usuario Anónimo</span>
            </p>
          </div>
          <div class="col s12 m6 right-align">
            ${
              d.Revisado == 0
                ? `<button onclick="checkMensajeEtica(${d.idLineaEticaMensajes})"
                          class="btn green darken-2 waves-effect waves-light"
                          style="border-radius: 20px;">
                      <i class="fas fa-check left"></i>Marcar como revisado
                   </button>`
                : `<span class="new badge blue lighten-1 white-text"
                      data-badge-caption="Revisado"
                      style="padding: 0 1em; border-radius: 12px; font-size: 20px;">
                  </span>`
            }
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            ${d.Sucursal ? `
              <p><span style="font-weight: bold;">Sucursal:</span> <span>${d.Sucursal}</span></p>` : ''}
            <p><span style="font-weight: bold;">División afectada:</span> <span>${d.Division}</span></p>
            <p><span style="font-weight: bold;">Fecha de publicación:</span> <span>${d.Registro}</span></p>
            <p><span style="font-weight: bold;">Motivo:</span> <span>${d.Descripcion}</span></p>

            <div class="grey lighten-4" style="padding: 1em; border-radius: 8px; margin-top: 1em;">
              <p style="margin: 0;"><i class="material-icons tiny" style="vertical-align: bottom;">message</i> ${d.Mensaje}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    });
    d_cont_LineaEtica.innerHTML = contHTML;
  } else {
    d_cont_LineaEtica.innerHTML = `<div class="row">
      <div class="col s12" style="text-align:center">
        <h4>Sin Registros</h4>
      </div>
    </div>`;
  }
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

function checkMensajeEtica (val) {
  datos = {
    op: "vistoMensajeEtica",
    idLineaEticaMensajes: val
  }
  $.ajax({
    type: "post",
    url: "Backend/LineaEtica/App.php",
    data: datos,
    success:function(response){
      if (response == "1") {
        toastr.success("Aceptado");
        setTimeout(function () {
          getMensajesLineaEtica();
        }, 1000);
      }else if (response == "0") {
        toastr.info("Error");
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}
getOpcionesLineaEtica();

function getOpcionesLineaEtica(){
    let datasend = {
      op: "getOpcionesLineaEticaConfig"
    }
    let tableCatalogoLiniaEtica = $('#tableCatalogoLiniaEtica').dataTable({
      "destroy":true,
      "ajax":{
        "type":"POST",
        "url":"Backend/LineaEtica/App.php",
        "data":datasend,
        "success" : function(response){
            let StatusTexto = "";
            let b64Catalogo = "";
            tableCatalogoLiniaEtica.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            b64Catalogo = btoa(response[i]["idCatalogoLineaEtica"]);
            if (response[i]["Status"] == 0) {
                StatusTexto = "Inactivo";
            }else {
                StatusTexto = "Activado";
            }
            tableCatalogoLiniaEtica.fnAddData([
               response[i]["Descripcion"],
               StatusTexto,
               `<a class="waves-effect waves-light btn btn-round orange" onclick="updateCatalogoStatus('${b64Catalogo}')"><i class="fal fa-edit"></i></a>`
            ]);
          }
        },
        "complete" : function(){
            // $.unblockUI();
          }
      }
    });
  }

  async function updateCatalogoStatus (val) {
    let datos = await {
        op: "updateCatalogoStatus",
        idCatalogoLineaEtica: val
    }
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
            toastr.success("Status Actualizado");
            getOpcionesLineaEtica();
        } else {
            toastr.info("ERROR");
        }
    }
  }

  $("#btnAgregaNuevoCatalogo").click(function () {
    if (document.getElementById('formInsertaCatalogo').checkValidity()) {
        event.preventDefault();
        let form = $("#formInsertaCatalogo")[0];
        let data = new FormData(form);
        $.ajax({
            type:"post",
            url: "Backend/LineaEtica/App.php",
            data: data,
            processData:false,
            contentType:false,
            cache: false,
            timeout:600000,
            success:function(response){
              if (response == "1") {
                Swal.fire(
                  'Agregado',
                  'Feed Agregado',
                  'success'
                )
                $("#txtNuevaEtica").val("");
                setTimeout(function () {
                    getOpcionesLineaEtica();
                }, 1000);
              }else {
                toastr.warning("Algo salió mal, Intente de nuevo");
              }
            },error:function(e){
              alert(e.responseText);
            }
          });
    }else {
        toastr.warning("Ingrese todos los datos");
    }
  });
