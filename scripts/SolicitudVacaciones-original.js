getMisSolicitudes();
getMisSolicitudesPorRevisar();
getMisSolicitudesVacacionesEstadoNomina();
getSolicitudesCanceladasJefe();
let ContenidoMisSolicitudes = $("#ContenidoMisSolicitudes").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
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
function getMisSolicitudes(){
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesVacaciones",
    success:function(response){
       ContenidoMisSolicitudes.fnClearTable();
      response = JSON.parse(response.trim());
      let stadusSolicitud = "";
      let btnVerSolicitud = "";
        for (var i = 0; i < response.length; i++) {
          if (response[i]["Status"] == "0") {
            stadusSolicitud = "Pendiente";
            btnVerSolicitud = `<a class='btnUpdate3' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]['idSolicitudesVacaciones']}">Ver Solicitud</a>`;
          }else if (response[i]["Status"] == "1") {
            stadusSolicitud = "Aceptada";
            btnVerSolicitud = `<a class='btnUpdate5' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]['idSolicitudesVacaciones']}">Ver Solicitud</a>`;
          }else if (response[i]["Status"] == "2") {
            stadusSolicitud = "Denegada";
            btnVerSolicitud = "<a class='btnUpdate2'>DENEGADA</a>";
          }else if (response[i]["Status"] == "3"){
            stadusSolicitud = "Solicitud Aceptada por RH";
            btnVerSolicitud = `<a class='btnUpdate4' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]['idSolicitudesVacaciones']}">Ver Solicitud</a>`;
          }
          ContenidoMisSolicitudes.fnAddData([
            response[i]["ComentariosSolicitud"],
            stadusSolicitud,
            response[i]["FechaSolicitud"],
            btnVerSolicitud
          ])
        }
    }, error:function(e){
      alert(e.responseText);
    }
  });
}


let ContenidoSolicitudesPend = $("#ContenidoSolicitudesPend").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
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

function getMisSolicitudesPorRevisar(){
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getMisSolicitudesPorRevisar",
    success:function(response){
      ContenidoSolicitudesPend.fnClearTable();
      response = JSON.parse(response.trim());
      let btnVerSolicitud = "";
        for (var i = 0; i < response.length; i++) {
            btnVerSolicitud = `<a class='waves-effect waves-light btn btn-round orange' target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]['idSolicitudesVacaciones']}">Ver Solicitud</a>`;
            ContenidoSolicitudesPend.fnAddData([
              response[i]["Nombre"],
              response[i]["FechaSolicitud"],
              response[i]["FechaInicio"],
              response[i]["FechaFin"],
              response[i]["ComentariosSolicitud"],
              btnVerSolicitud,
              `<div class="row">
                <div class="col s12 l12">
                  <a class="waves-effect waves-light btn btn-round green" style="width:100%;" onclick="updateStatusSolicitud(1,${response[i]["idSolicitudesVacaciones"]})"><i class="fa-regular fa-thumbs-up"></i></a>
                </div>
                <div class="col s12 l12">
                  <a class="waves-effect waves-light btn btn-round red" style="width:100%;" onclick="updateStatusSolicitud(2,${response[i]["idSolicitudesVacaciones"]})"><i class="fa-regular fa-thumbs-down"></i></a>
                </div>
              </div>`
            ])
        }
    },error:function(e){
      alert(e.responseText);
    }
  });
}

async function updateStatusSolicitud(Val,Solicitud){
  let mensaje = "";
  if (Val == "1") {
    mensaje = "aceptar";
  }else if (Val == "2") {
    mensaje = "denegar";
  }
    Swal.fire({
    title: `¿Desea ${mensaje} la solicitud?`,
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      getDetalleSolicitud(Val,Solicitud);
    } else {
    }
    })
  }

  async function getDetalleSolicitud (estado,solicitud) {
    let datos = await {
      op: "getDetalleSolicitud",
      idSolicitudesVacaciones: solicitud
    };
    respuesta = [];
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
        dataType: "json",
      });
    } catch (e) {
      console.log(e);
    } finally {
      console.log(respuesta);
      let estadoText = "";
      let mensaje2 = "";
      if (estado == "1") {
        estadoText = "autorizar";
        mensaje2 = "aceptada";
      } else {
        estadoText = "cancelar";
        mensaje2 = "denegada";
      }
      let contHTML = `
        <div class="row">
          <div class="col s12 l12">
            <div class="row">
              <div class="col s12 l12" style="text-align:center">
                <h5>Datos del solicitante.</h5>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>No Empleado:</b> ${respuesta[0]["NoEmpleado"]}</span>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Empleado Solicitante:</b> ${respuesta[0]["NombreSolicitante"]}</span>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Puesto:</b> ${respuesta[0]["PuestoSolicitante"]}</span>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Sucursal / Departamento:</b> ${respuesta[0]["Sucursal"]}</span>
              </div>
            </div>
          </div>
          <div class="col s12 l12" style="margin-top:3vh">
            <div class="row">
              <div class="col s12 l12" style="text-align:center">
                <h5>Datos de la Solicitud.</h5>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Fecha de la Solicitud: </b> ${respuesta[0]["FechaRegistroSoli"]}</span>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Fecha Inicio: </b> ${respuesta[0]["FechaInicio"]}</span>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Fecha Fin: </b> ${respuesta[0]["FechaFin"]}</span>
              </div>
              <div class="col s12 l12" style="text-align:center">
                <span><b>Cantidad de Días de Vacaciones:  </b> ${respuesta[0]["TotalDias"]}</span>
              </div>
            </div>
          </div>
        </div>
      `;
      alertify.confirm(`¿Desea ${estadoText} la solicitud con los siguientes datos?`,`${contHTML}`, async function(){
        $.ajax({
          type: "post",
          url: "Backend/Empleados/App.php",
          data: "op=updateStatusSolicitud"+"&Status="+estado+"&idSolicitudesVacaciones="+solicitud,
          success:function(response){
            if (response == "1") {
              toastr.success("Solicitud"+" "+`${mensaje2}`);
              getMisSolicitudes();
              getMisSolicitudesPorRevisar();
              getMisSolicitudesVacacionesEstadoNomina();
              getSolicitudesCanceladasJefe()
            }else {
              toastr.info(response);
            }
          }, error:function(e){
            alert(e.responseText);
          }
        });
      }, async function(){
        alertify.error('Cancelado')
      }).set({labels:{ok:'Aceptar', cancel: 'Cancelar'}, padding: false});
    }
  }

  // function btnVerSolicitud(val){
  //   window.location.href=`FormatoVacaciones.php?Solicitud=${val}`;
  // }


  let ContenidoSolicitudesNomina = $("#ContenidoSolicitudesNomina").dataTable({
    language: {
      lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
      info: "PÁGINA _PAGE_ DE _PAGES_",
      infoEmpty: "NO HAY DATOS PARA MOSTRAR",
      infoFiltered: "",
      search: "BUSCAR",
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

async function getMisSolicitudesVacacionesEstadoNomina(){
  let datos = await {
    op: "getMisSolicitudesVacacionesEstadoNomina"
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(respuesta);
    let btnVerSolicitud = "";
    let btnRegresarStatus = "";
     ContenidoSolicitudesNomina.fnClearTable();
     let textEstatus = "";
      for (var i = 0; i < respuesta.length; i++) {
          if (respuesta[i]["Status"] == "3") {
            textEstatus = "Solicitud aceptada por Nómina.";
            btnVerSolicitud = `<a class='btnUpdate4' target="_blank" href="FormatoVacaciones.php?Solicitud=${respuesta[i]['idSolicitudesVacaciones']}")>Ver Solicitud</a>`;
            btnRegresarStatus = `<button class='btnUpdate2'><i class="fas fa-lock"></i></button>`;
          }else if (respuesta[i]["Status"] == "2") {
            textEstatus = "Solicitud denegada por Nómina.";
            btnVerSolicitud = `<a class='btnUpdate2'>Ver Solicitud</a>`;
            btnRegresarStatus = `<button class='btnUpdate2'><i class="fas fa-lock"></i></button>`;
          } else if (respuesta[i]["Status"] == "1") {
            textEstatus = "Solicitud pendiente de revisar.";
            btnVerSolicitud = `<a class='btnUpdate3' target="_blank" href="FormatoVacaciones.php?Solicitud=${respuesta[i]['idSolicitudesVacaciones']}">Ver Solicitud</a>`;
            btnRegresarStatus = `<button class='btnUpdate3' onclick='regresarEstadoSolicitudJefe(${respuesta[i]["idSolicitudesVacaciones"]})'><i class="fal fa-pen-square"></button>`;
          }
          ContenidoSolicitudesNomina.fnAddData([
            respuesta[i]["Nombre"],
            respuesta[i]["ComentariosSolicitud"],
            respuesta[i]["FechaSolicitud"],
            textEstatus,
            btnRegresarStatus,
            btnVerSolicitud
          ])
      }
  }
}

async function regresarEstadoSolicitudJefe (val) {
  alertify.confirm('Confirmación de acción.', `<div class="row">
    <div class="col s12 l12" style="text-align:center">
      ¿Desea regresar el estado de la solicitud a" Solicitud pendiente de revisar"?
    </div>
  </div>`, async function(){
    let datos = await {
      op: "regresarEstadoSolicitudJefe",
      idSolicitudesVacaciones: val
    };
    let respuesta = "";
    try {
      respuesta = await $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
      });
    } catch (e) {
      console.log(e);
    } finally {
      if (respuesta == "1") {
        alertify.success('Estado de solicitud regresado a" Solicitud pendiente de revisar".');
        await getMisSolicitudesPorRevisar();
        await getMisSolicitudesVacacionesEstadoNomina();
        await getSolicitudesCanceladasJefe();
      }else {
        alertify.warning("ERROR!");
      }
    }
  }, async function(){
    alertify.error('Cancelado')
  }).set({labels:{ok:'Aceptar', cancel: 'Cancelar'}, padding: false});
}


let tableSolicitudesCanceladas = $("#tableSolicitudesCanceladas").dataTable({
  language: {
    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
    zeroRecords: "NO HAY REGISTROS POR MOSTRAR",
    info: "PÁGINA _PAGE_ DE _PAGES_",
    infoEmpty: "NO HAY DATOS PARA MOSTRAR",
    infoFiltered: "",
    search: "BUSCAR",
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

async function getSolicitudesCanceladasJefe () {
  let datos = await {
    op: "getSolicitudesCanceladasJefe"
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(respuesta);
     tableSolicitudesCanceladas.fnClearTable();
     respuesta.forEach(registros => {
       tableSolicitudesCanceladas.fnAddData([
         registros.Nombre,
         registros.ComentariosSolicitud,
         registros.FechaSolicitud,
         `<button class='btnUpdate3' onclick='regresarEstadoSolicitudJefe(${registros.idSolicitudesVacaciones})'><i class="fal fa-pen-square"></button>`,
         `<button class='btnUpdate3' href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}">Ver Solicitud</button>`
        ])
     });

  }
}
