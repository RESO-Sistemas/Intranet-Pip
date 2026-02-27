function onlynumber(e) {
     tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) {
       return true;
     }
     patron = /[-0-9]/;
     tecla_final = String.fromCharCode(tecla);
     return patron.test(tecla_final);
   }
   getMisSolicitudesFinales();
   getHistoricoSolicitudesNomina();
function getMisSolicitudesFinales(){
  datos = {
    op : "getMisSolicitudesFinales"
  }
  let TableSolicitudes = $('#TableSolicitudes').dataTable({
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Empleados/App.php",
      "data":datos,
      "success" : function(response){
        TableSolicitudes.fnClearTable();
        for (var i = 0; i < response.length; i++) {
        let btnAcciones = ` <div class="row">
                              <div class="col s6" style="text-align:center">
                                <a class="btn" href="#modalAcciones" onclick="realizarAccionSolicitud(${response[i]['idSolicitudesVacaciones']},1)" style="width:100%; background-color:white; color:#2ECC71; border: 1px solid #2ECC71 ; border-radius:15%;"><i class="fas fa-thumbs-up"></i></a>
                              </div>
                              <div class="col s6" style="text-align:center">
                                <a class="btn" href="#modalAcciones" onclick="realizarAccionSolicitud(${response[i]['idSolicitudesVacaciones']},0)" style="width:100%; background-color:white; color:#E74; border: 1px solid #943126 ; border-radius:15%;"><i class="fas fa-thumbs-down"></i></a>
                              </div>
                            </div>`;
        let btnVerSolicitud = `<div class="row">
                                  <div class="col s6 offset-s3">
                                    <a class="btn" href="FormatoVacaciones.php?Solicitud=${response[i]["idSolicitudesVacaciones"]}" style="width:100%; background-color:white; color:#34495E; border: 1px solid #1B2631 ; border-radius:15%;"><i class="fas fa-link"></i></a>
                                  </div>
                                </div>`;

          TableSolicitudes.fnAddData([
            response[i]["Nombre"],
            response[i]["ComentariosSolicitud"],
            response[i]["FechaInicio"],
            response[i]["FechaFin"],
            response[i]["TotalDias"],
            btnVerSolicitud,
            btnAcciones
          ]);
        }
      },
      "complete" : function(){
          // $.unblockUI();
        }
    }
  });
}

function realizarAccionSolicitud(solicitud,accion){
  let mensaje = "";
  if (accion == 1) {
    mensaje = "Desea aceptar la solicitud?";
  }else{
    mensaje = "Desea denegar la solicitud?";
  }
  Swal.fire({
  title: `${mensaje}`,
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#ffc407',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Confirmar'
  }).then((result) => {
  if (result.isConfirmed) {
  datos = {
    op : "realizarAccionSolicitudFinal",
    idSolicitudesVacaciones : solicitud,
    Status : accion
  }
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: datos,
    success:function(response){
      if (response == 1) {
        toastr.success("Acción realizada con éxito.");
        getMisSolicitudesFinales();
      }else {
        toastr.info(response);
      }
    },error:function(e){
      alert(e.responseText);
    }
    });
  }
})
}

let tableHistorico = $("#tableHistorico").dataTable({
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

async function getHistoricoSolicitudesNomina () {
  let FechaIni = await $("#FechaIni").val();
  let FechaFin = await $("#FechaFin").val();
  let datos = await {
    op: "getHistoricoSolicitudesNomina",
    FechaIni: FechaIni,
    FechaFin: FechaFin
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
    tableHistorico.fnClearTable();
    let Btn = "";
    respuesta.forEach(registros => {
      if (registros.NumStatus == 3) {
        Btn = `<div class="row">
                  <div class="col s12 l4 offset-l4">
                      <a class="btnUpdate5" href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}"><i class="fa-regular fa-face-smile"></i></a>
                  </div>
               </div>`;
      } else if (registros.NumStatus == 2) {
        Btn = `<div class="row">
                  <div class="col s12 l4 offset-l4">
                      <a class="btnUpdate2" href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}"><i class="fa-regular fa-face-frown"></i></a>
                  </div>
               </div>`;
      } else if (registros.NumStatus == 1) {
        Btn = `<div class="row">
                  <div class="col s12 l4 offset-l4">
                      <a class="btnUpdate3" href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}"><i class="fa-regular fa-face-meh"></i></a>
                  </div>
               </div>`;
      }
      tableHistorico.fnAddData([
        registros.Nombre,
        registros.ComentariosSolicitud,
        registros.Status,
        registros.FechaSolicitud,
        `${Btn}`
       ])
    });
  }
}
