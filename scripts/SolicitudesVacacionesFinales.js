const myKeysValues = window.location.search;

const urlParams = new URLSearchParams(myKeysValues);

const SV = urlParams.get("SV");



function onlynumber(e) {

  tecla = document.all ? e.keyCode : e.which;

  if (tecla == 8) {

    return true;

  }

  patron = /[-0-9]/;

  tecla_final = String.fromCharCode(tecla);

  return patron.test(tecla_final);

}

getMisSolicitudesFinales();

getHistoricoSolicitudesNomina();

function getMisSolicitudesFinales() {

  datos = {

    op: "getMisSolicitudesFinales",

  };

  let TableSolicitudes = $("#TableSolicitudes").dataTable({

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

      url: "Backend/Empleados/App.php",

      data: datos,

      success: function (response) {

        let BanderSVEmail = "";



        TableSolicitudes.fnClearTable();

        for (var i = 0; i < response.length; i++) {

          let btnAcciones = `
            <div class="d-flex justify-content-center gap-2" id="row${response[i]["idSolicitudesVacaciones"]}">
                <button class="btn btn-success btn-accion" onclick="realizarAccionSolicitud(${response[i]["idSolicitudesVacaciones"]}, 1)" title="Aceptar Solicitud">
                    <span class="material-symbols-outlined">check</span>
                </button>
                <button class="btn btn-danger btn-accion" onclick="realizarAccionSolicitud(${response[i]["idSolicitudesVacaciones"]}, 0)" title="Rechazar Solicitud">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>`;

          let btnVerSolicitud = `
            <div class="d-flex justify-content-center">
                <a class="btn btn-primary btn-accion" target="_blank" href="FormatoVacaciones.php?Solicitud=${response[i]["idSolicitudesVacaciones"]}" title="Ver Solicitud">
                    <span class="material-symbols-outlined">visibility</span>
                </a>
            </div>`;



          let addId = TableSolicitudes.fnAddData([

            response[i]["Nombre"],

            response[i]["Sucursal"],

            response[i]["FechaSolicitud"],

            response[i]["FechaInicio"],

            response[i]["FechaFin"],

            response[i]["TotalDias"],

            btnVerSolicitud,

            btnAcciones,

          ]);

          let Nodo = $("#TableSolicitudes").dataTable().fnSettings().aoData[

            addId[0]

          ].nTr;

          Nodo.setAttribute(

            "id",

            "TRSolRevision" + response[i]["idSolicitudesVacaciones"]

          );

        }

        if (SV !== null) {

          let SolicitudFromEmail = atob(SV);

          $("#TRSolRevision" + SolicitudFromEmail)

            .addClass("selected")

            .css("color", "white");

          document.getElementById(

            "TRSolRevision" + SolicitudFromEmail

          ).style.backgroundColor = "#9C134D";

        }

      },

      complete: function () {

        // $.unblockUI();

      },

    },

  });

}



function realizarAccionSolicitud(solicitud, accion) {

  let mensaje = "";

  if (accion == 1) {

    mensaje = "Desea aceptar la solicitud?";

  } else {

    mensaje = "Desea denegar la solicitud?";

  }

  Swal.fire({

    title: `${mensaje}`,

    text: "",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    cancelButtonText: "Cancelar",

    confirmButtonText: "Confirmar",

  }).then((result) => {

    if (result.isConfirmed) {

      datos = {

        op: "realizarAccionSolicitudFinal",

        idSolicitudesVacaciones: solicitud,

        Status: accion,

      };

      $.ajax({

        type: "post",

        url: "Backend/Empleados/App.php",

        data: datos,

        success: function (response) {

          if (response == 1) {

            // toastr.success("Acción realizada con éxito.");

            const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Acción realizada con éxito.</span>

          </div>`;

            showBootstrapAlertSuc(messageContent, "top-right", 5000);

            getMisSolicitudesFinales();

            getHistoricoSolicitudesNomina();

          } else {

            // toastr.info(response);

            const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">S${response}</span>

        </div>`;

            showBootstrapAlert(messageContent, "top-right", 5000);

          }

        },

        error: function (e) {

          alert(e.responseText);

        },

      });

    }

  });

}



let tableHistorico = $("#tableHistorico").dataTable({

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



async function getHistoricoSolicitudesNomina() {

  let FechaIni = await $("#FechaIni").val();

  let FechaFin = await $("#FechaFin").val();

  let datos = await {

    op: "getHistoricoSolicitudesNomina",

    FechaIni: FechaIni,

    FechaFin: FechaFin,

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

    let BtnRegresa = "";

    respuesta.forEach((registros) => {

      const btnClass = registros.NumStatus == 3 ? 'btn-success' : (registros.NumStatus == 2 ? 'btn-danger' : 'btn-warning');
      const icon = registros.NumStatus == 3 ? 'sentiment_satisfied' : (registros.NumStatus == 2 ? 'sentiment_dissatisfied' : 'sentiment_neutral');
      
      Btn = `
        <div class="d-flex justify-content-center">
            <a class="btn ${btnClass} btn-accion" target="_blank" href="FormatoVacaciones.php?Solicitud=${registros.idSolicitudesVacaciones}" title="Ver Solicitud">
                <span class="material-symbols-outlined">${icon}</span>
            </a>
        </div>`;

      const regBtnClass = registros.NumStatus == 1 ? 'btn-danger' : 'btn-warning';
      BtnRegresa = `
        <div class="d-flex justify-content-center">
            <button class="btn ${regBtnClass} btn-accion" onclick="regresarEstadoSolicitudNomina(${registros.idSolicitudesVacaciones})" title="Regresar a Pendiente">
                <span class="material-symbols-outlined">settings_backup_restore</span>
            </button>
        </div>`;

      tableHistorico.fnAddData([

        registros.Nombre,

        registros.Status,

        registros.FechaSolicitud,

        BtnRegresa,

        `${Btn}`,

      ]);

    });

  }

}



// async function regresarEstadoSolicitudNomina(val) {

//   alertify

//     .confirm(

//       "Confirmación de acción.",

//       `<div class="row">

//     <div class="col s12 l12" style="text-align:center">

//       ¿Desea regresar el estado de la solicitud a" Solicitud pendiente de revisar"?

//     </div>

//   </div>`,

//       async function () {

//         let datos = await {

//           op: "regresarEstadoSolicitudNomina",

//           idSolicitudesVacaciones: val,

//         };

//         let respuesta = "";

//         try {

//           respuesta = await $.ajax({

//             type: "post",

//             url: "Backend/Empleados/App.php",

//             data: datos,

//           });

//         } catch (e) {

//           console.log(e);

//         } finally {

//           if (respuesta == "1") {

//             alertify.success(

//               'Estado de solicitud regresado a" Solicitud pendiente de revisar".'

//             );

//             getMisSolicitudesFinales();

//             getHistoricoSolicitudesNomina();

//           } else {

//             alertify.warning("ERROR!");

//           }

//         }

//       },

//       async function () {

//         alertify.error("Cancelado");

//       }

//     )

//     .set({ labels: { ok: "Aceptar", cancel: "Cancelar" }, padding: false });

// }

async function regresarEstadoSolicitudNomina(val) {

  const result = await Swal.fire({

    title: "Confirmación de acción",

    html: `

      <div class="row">

        <div class="col-12 text-center">

          ¿Desea regresar el estado de la solicitud a 

          <strong>"Solicitud pendiente de revisar"</strong>?

        </div>

      </div>

    `,

    icon: "question",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    confirmButtonText: "Aceptar",

    cancelButtonText: "Cancelar",

  });



  if (result.isConfirmed) {

    let datos = {

      op: "regresarEstadoSolicitudNomina",

      idSolicitudesVacaciones: val,

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

        // Swal.fire({

        //   icon: "success",

        //   title: "Éxito",

        //   text: 'Estado de solicitud regresado a "Solicitud pendiente de revisar".',

        //   timer: 2000,

        //   showConfirmButton: false,

        // });

        const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Estado de solicitud regresado a "Solicitud pendiente de revisar".</span>

          </div>`;

        showBootstrapAlertSuc(messageContent, "top-right", 5000);

        getMisSolicitudesFinales();

        getHistoricoSolicitudesNomina();

      } else {

        // Swal.fire({

        //   icon: "error",

        //   title: "ERROR",

        //   text: "Hubo un problema al regresar el estado de la solicitud.",

        // });

        const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Hubo un problema al regresar el estado de la solicitud.</span>

            </div>`;

        showBootstrapAlertWar(messageContent, "top-right", 5000);

      }

    }

  } else if (result.dismiss === Swal.DismissReason.cancel) {

    // Swal.fire({

    //   icon: "info",

    //   title: "Cancelado",

    //   text: "La acción fue cancelada.",

    //   timer: 1500,

    //   showConfirmButton: false,

    // });

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">La acción fue cancelada.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

}

