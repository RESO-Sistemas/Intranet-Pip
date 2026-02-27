loadImgEventos();

getPersonalizacion();

getMeses();

let globalMeses = [];

async function getPersonalizacion() {

  getConfigMensajeBienvenida();

}



async function getConfigMensajeBienvenida() {

  let datos = await {

    op: "getConfigMensajeBienvenida",

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (error) {

    console.log(error);

  } finally {

    console.log(respuesta);

    if (respuesta.length > 0) {

      $("#txtMensajeBienvenida").html(`${respuesta[0]["MensajeBienvenida"]}`);

    }

  }

}

async function getImgEventos() {

  let datos = {

    op: "getImgEventos",

  };

  const respuesta = await functionAjax(datos, "Configuracion");

}



async function functionAjax(data, carpetaBackend) {

  let datos = await data;

  try {

    respuesta = await $.ajax({

      type: "post",

      url: `Backend/${carpetaBackend}/App.php`,

      data: datos,

      dataType: "json",

    });

  } catch (e) {

    console.log(e);

  } finally {

    return respuesta;

  }

}



async function loadImgEventos() {

  let datos = await {

    op: "getImgEventosAnniversaryBirthday",

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (error) {

    console.log(error);

  } finally {

    let nameImgBirthday = "";

    let nameImgAnniversary = "";



    respuesta.map((Registros) => {

      Registros.Birthday.map((Birthday) => {

        nameImgBirthday = Birthday.NameImgBirthday;

      });

    });

    respuesta.map((Registros) => {

      Registros.Anniversary.map((Anniversary) => {

        nameImgAnniversary = Anniversary.NameImgAnniversary;

      });

    });

    let rutaBirthday = "";

    let rutaAnniversary = "";

    if (nameImgBirthday == "") {

      rutaBirthday = "assets/cumplecursor.png";

    } else {

      rutaBirthday = `Archivos/ImagesBirthday/${nameImgBirthday}`;

    }

    if (nameImgAnniversary == "") {

      rutaAnniversary = "assets/cumplecursor.png";

    } else {

      rutaAnniversary = `Archivos/ImagesAnniversary/${nameImgAnniversary}`;

    }

    $("#imgPreview").attr("src", rutaBirthday);

    $("#imgPreviewAnn").attr("src", rutaAnniversary);

  }

}



$("#btnInsertaImgBirthday").click(function () {

  if (document.getElementById("formInsertaImgBirthday").checkValidity()) {

    event.preventDefault();

    let form = $("#formInsertaImgBirthday")[0];

    let data = new FormData(form);

    $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: data,

      processData: false,

      contentType: false,

      cache: false,

      timeout: 600000,

      success: function (response) {

        console.log(response);

        if (response == "1") {

          // toastr.success("Imagen Actualizada");

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Imagen Actualizada.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          setTimeout(function () {

            location.reload();

          }, 1000);

        } else {

          // toastr.warning("Algo salió mal, Intente de nuevo");

          const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Algo salió mal, Intente de nuevo</span>

            </div>`;

          showBootstrapAlertWar(messageContent, "top-right", 5000);



          setTimeout(function () {

            location.reload();

          }, 2000);

        }

      },

      error: function (e) {

        alert(e.responseText);

      },

    });

  } else {

    toastr.info("Ingrese una imagen");

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ingrese una imagen.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

});



$("#btnInsertaImgAnni").click(function () {

  if (document.getElementById("fprmInsertaImgAnniversary").checkValidity()) {

    event.preventDefault();

    let form = $("#fprmInsertaImgAnniversary")[0];

    let data = new FormData(form);

    $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: data,

      processData: false,

      contentType: false,

      cache: false,

      timeout: 600000,

      success: function (response) {

        console.log(response);

        if (response == "1") {

          // toastr.success("Imagen Actualizada");

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Imagen Actualizada.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          setTimeout(function () {

            location.reload();

          }, 1000);

        } else {

          // toastr.warning("Algo salió mal, Intente de nuevo");

          const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Algo salió mal, Intente de nuevo</span>

            </div>`;

          showBootstrapAlertWar(messageContent, "top-right", 5000);

          setTimeout(function () {

            location.reload();

          }, 2000);

        }

      },

      error: function (e) {

        alert(e.responseText);

      },

    });

  } else {

    // toastr.info("Ingrese una imagen");

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ingrese una imagen.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

});



function previewImage(event, querySelector) {

  //Recuperamos el input que desencadeno la acción

  const input = event.target;



  //Recuperamos la etiqueta img donde cargaremos la imagen

  $imgPreview = document.querySelector(querySelector);

  console.log("prev 1_ ", $imgPreview);



  // Verificamos si existe una imagen seleccionada

  if (!input.files.length) return;



  //Recuperamos el archivo subido

  file = input.files[0];

  console.log("file _ ", file);



  //Creamos la url

  objectURL = URL.createObjectURL(file);

  console.log("url _", objectURL);



  //Modificamos el atributo src de la etiqueta img

  $imgPreview.src = objectURL;

  console.log("img prev_ ", $imgPreview);

}

function previewImageAnny(event, querySelector) {

  //Recuperamos el input que desencadeno la acción

  const input = event.target;



  //Recuperamos la etiqueta img donde cargaremos la imagen

  $imgPreview = document.querySelector(querySelector);

  console.log("prev 1_ ", $imgPreview);



  // Verificamos si existe una imagen seleccionada

  if (!input.files.length) return;



  //Recuperamos el archivo subido

  file = input.files[0];

  console.log("file _ ", file);



  //Creamos la url

  objectURL = URL.createObjectURL(file);

  console.log("url _", objectURL);



  //Modificamos el atributo src de la etiqueta img

  $imgPreview.src = objectURL;

  console.log("img prev_ ", $imgPreview);

}



$("#imgPreview").click(function () {

  $("#ContenidoImgBirthday").click();

});



$("#imgPreviewAnn").click(function () {

  $("#ContenidoImgAnniversary").click();

});



// $("#btnActualizaMensajeBienvenida").click(async function (){

//     let newMensaje = $("#txtMensajeBienvenida").val();

//     alertify.confirm('Confirmación de acción.', `Desea cambiar el mensaje de Bienvenida a <b>"${newMensaje}"</b>.`, async function(){

//         let datos = await {

//             op: "updateMensajeBienvenida",

//             MensajeBienvenida: newMensaje

//         };

//         let respuesta = "";

//         try {

//             respuesta = await $.ajax({

//                 type: "post",

//                 url: "Backend/Configuracion/App.php",

//                 data: datos,

//             });

//         } catch (error) {

//             console.log(error);

//         } finally {

//             if (respuesta == 1) {

//                 alertify.success("Mensaje Actualizado");

//                 getConfigMensajeBienvenida();

//             } else {

//                 alertify.error("ERROR!");

//             }

//         }

//     }, async function(){

//         alertify.error('Cancelado')

//     }).set('labels', {ok:'Aceptar', cancel:'Cancelar'});

// });



$("#btnActualizaMensajeBienvenida").click(async function () {

  let newMensaje = $("#txtMensajeBienvenida").val();



  Swal.fire({

    title: "Confirmación de acción",

    html: `Desea cambiar el mensaje de Bienvenida a <b>"${newMensaje}"</b>.`,

    icon: "question",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    confirmButtonText: "Aceptar",

    cancelButtonText: "Cancelar",

  }).then(async (result) => {

    if (result.isConfirmed) {

      let datos = {

        op: "updateMensajeBienvenida",

        MensajeBienvenida: newMensaje,

      };

      let respuesta = "";

      try {

        respuesta = await $.ajax({

          type: "post",

          url: "Backend/Configuracion/App.php",

          data: datos,

        });

      } catch (error) {

        console.log(error);

      } finally {

        if (respuesta == 1) {

          // Swal.fire({

          //   icon: "success",

          //   title: "Mensaje Actualizado",

          //   timer: 1500,

          //   showConfirmButton: false,

          // });

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Mensaje Actualizado.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          getConfigMensajeBienvenida();

        } else {

          // Swal.fire({

          //   icon: "error",

          //   title: "ERROR!",

          //   text: "No se pudo actualizar el mensaje.",

          // });

          const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">No se pudo actualizar el mensaje.</span>

            </div>`;

          showBootstrapAlertWar(messageContent, "top-right", 5000);

        }

      }

    } else if (result.dismiss === Swal.DismissReason.cancel) {

      // Swal.fire({

      //   icon: "info",

      //   title: "Cancelado",

      //   timer: 1200,

      //   showConfirmButton: false,

      // });

      const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Cancelado.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    }

  });

});



// $("#btnViewDiasFestivos").click(async function () {

//   await getListDiasFestivos();

//   let header = `Días Festivos.`;

//   let div = `divDiasFestivos`;

//   await openModalMin(header, div);

// });



$("#btnViewDiasFestivos").click(async function () {

  await getListDiasFestivos();



  let modalElement = document.getElementById("ModalDiasFestivos");

  let modal = new bootstrap.Modal(modalElement, {

    backdrop: "static",

    keyboard: true,

  });



  modal.show();

});



let tableDiasFestivos = $("#tableDiasFestivos").dataTable({

  language: {

    lengthMenu: "MOSTRAR _MENU_ REGISTROS POR PÁGINA",

    zeroRecords: "NO HAY DÍAS FESTIVOS POR MOSTRAR",

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



async function getListDiasFestivos() {

  let datos = await {

    op: "getListDiasFestivos",

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (e) {

    console.log(e);

  } finally {

    tableDiasFestivos.fnClearTable();

    let DFB64 = "";

    respuesta.forEach((registros) => {

      DFB64 = btoa(registros.idDiasFestivos);

      tableDiasFestivos.fnAddData([

        registros.Descripcion,

        registros.Dia,

        registros.StatusD,

        `<button class="btn btn-warning btnUpdateDF" data-diafest="${DFB64}" data-desc="${registros.Descripcion}" data-dia="${registros.Dia}"><span class="material-symbols-outlined">autorenew</span></button>`,

        `<button class="btn btn-danger btnUpdateStatus" data-diafest="${DFB64}"><span class="material-symbols-outlined">mode_off_on</span></button>`,

      ]);

    });

  }

}



// $(document).on("click", ".btnUpdateStatus", async function () {

//   let idSelected = $(this).data("diafest");

//   let datos = await {

//     op: "updateStatusDiaFestivo",

//     idDiasFestivos: idSelected,

//   };

//   let respuesta = "";

//   try {

//     respuesta = await $.ajax({

//       type: "post",

//       url: "Backend/Configuracion/App.php",

//       data: datos,

//     });

//   } catch (e) {

//     console.log(e);

//   } finally {

//     if (respuesta == "1") {

//       await limpiarInp();

//       await getListDiasFestivos();

//       alertify.success("Status Actualizado");

//     } else {

//       alertify.warning("ERROR!");

//     }

//   }

// });



$(document).on("click", ".btnUpdateStatus", async function () {

  let idSelected = $(this).data("diafest");

  let datos = await {

    op: "updateStatusDiaFestivo",

    idDiasFestivos: idSelected,

  };

  let respuesta = "";

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: datos,

    });

  } catch (e) {

    console.log(e);

    const messageContent = `

      <div class="alert-content">

        <span class="alert-title">Alerta!</span>

        <span class="alert-text">Algo salio mal, Intente de nuevo</span>

      </div>`;

    showBootstrapAlertWar(messageContent, "top-right", 5000);

    return;

  } finally {

    if (respuesta == "1") {

      await limpiarInp();

      await getListDiasFestivos();

      const messageContent = `

        <div class="alert-content">

          <span class="alert-title">Completado!</span>

          <span class="alert-text">Status Actualizado.</span>

        </div>`;

      showBootstrapAlertSuc(messageContent, "top-right", 5000);

    } else {

      const messageContent = `

        <div class="alert-content">

          <span class="alert-title">Alerta!</span>

          <span class="alert-text">Algo salio mal, Intente de nuevo</span>

        </div>`;

      showBootstrapAlertWar(messageContent, "top-right", 5000);

    }

  }

});



// $(document).on("click", ".btnUpdateDF", async function () {

//   let idSelected = $(this).data("diafest");

//   let desc = $(this).data("desc");

//   let fecha = $(this).data("dia");

//   let fechaArr = fecha.split("-");

//   await $("#IdDFUpdate").val(idSelected);

//   $("#mesSelectedUpdate").val(fechaArr[0]);

//   const mesSelected = globalMeses.filter((datos) => {

//     return datos.idMes == fechaArr[0];

//   });

//   mesSelected[0].Dias.forEach((dias) => {

//     $("#diaSelectedUpdate").append(`

//         <option value="${dias}">${dias}</option>

//       `);

//   });

//   await $("#txtDescripcionDiaFUpdate").val(desc);

//   await $("#diaSelectedUpdate").val(fechaArr[1]);

//   await openModalUpdateDiaFestivo(desc);

// });



let modalAnterior = null; // Guardamos referencia al modal abierto antes



$(document).on("click", ".btnUpdateDF", async function () {

  let idSelected = $(this).data("diafest");

  let desc = $(this).data("desc");

  let fecha = $(this).data("dia");

  let fechaArr = fecha.split("-");



  // Llenar inputs del modal

  $("#IdDFUpdate").val(idSelected);

  $("#mesSelectedUpdate").val(fechaArr[0]);



  // Limpiar y llenar días del mes seleccionado

  $("#diaSelectedUpdate").empty();

  const mesSelected = globalMeses.filter((datos) => datos.idMes == fechaArr[0]);

  if (mesSelected.length > 0) {

    mesSelected[0].Dias.forEach((dias) => {

      $("#diaSelectedUpdate").append(

        `<option value="${dias}">${dias}</option>`

      );

    });

  }



  $("#txtDescripcionDiaFUpdate").val(desc);

  $("#diaSelectedUpdate").val(fechaArr[1]);



  // Detectar y cerrar modal anterior

  modalAnterior = document.querySelector(".modal.show");

  if (modalAnterior) {

    bootstrap.Modal.getInstance(modalAnterior)?.hide();

  }



  // Abrir modal de actualización

  let modalElement = document.getElementById("ModalUpdateDiaFestivo");

  if (!modalElement) {

    console.error(

      "El modal '#ModalUpdateDiaFestivo' no se encontró en el DOM."

    );

    return;

  }



  let modal = new bootstrap.Modal(modalElement, {

    backdrop: "static",

    keyboard: true,

  });



  // Cuando se cierre el modal de actualización, reabrir el anterior si existía

  modalElement.addEventListener("hidden.bs.modal", function () {

    if (modalAnterior) {

      let reabrirModal = new bootstrap.Modal(modalAnterior);

      reabrirModal.show();

      modalAnterior = null; // Limpiar referencia

    }

  });



  modal.show();

});



// async function openModalUpdateDiaFestivo(desc) {

//   if (!alertify.MUpdateDiaF) {

//     alertify.MUpdateDiaF ||

//       alertify.dialog("MUpdateDiaF", function () {

//         return {

//           main: function (content) {

//             this.setContent(content);

//           },

//           build: function () {

//             this.setHeader(`Actualizar dia Festivo: ${desc}`);

//           },

//           setup: function () {

//             return {

//               focus: {

//                 element: function () {

//                   return this.elements.body.querySelector(this.get("selector"));

//                 },

//                 select: true,

//               },

//               options: {

//                 maximizable: false,

//                 padding: false,

//                 startMaximized: false,

//                 resizable: false,

//               },

//             };

//           },

//           settings: {

//             selector: undefined,

//           },

//         };

//       });

//   }

//   alertify.MUpdateDiaF($(`#contenidoUpdateDiaFestivo`)[0]);

// }



// async function openModalUpdateDiaFestivo(desc) {

//   const contenidoOriginal = document.getElementById(

//     "contenidoUpdateDiaFestivo"

//   );



//   // Creamos un contenedor temporal para clonar y no romper los IDs originales

//   const cloneContainer = document.createElement("div");

//   cloneContainer.innerHTML = contenidoOriginal.innerHTML;



//   Swal.fire({

//     title: `Actualizar día Festivo: ${desc}`,

//     html: cloneContainer,

//     showConfirmButton: false,

//     showCloseButton: true,

//     allowOutsideClick: false,

//     allowEscapeKey: true,

//     width: "60%",

//     customClass: {

//       popup: "swal2-update-diafestivo",

//     },

//     didOpen: () => {

//       // Opcional: Aquí puedes volver a inicializar selectores, datepickers o eventos si necesitas

//     },

//   });

// }



// async function openModalMin(header, div) {

//   if (!alertify.ModalMIN) {

//     alertify.ModalMIN ||

//       alertify.dialog("ModalMIN", function () {

//         return {

//           main: function (content) {

//             this.setContent(content);

//           },

//           build: function () {

//             this.setHeader(header);

//           },

//           setup: function () {

//             return {

//               focus: {

//                 element: function () {

//                   return this.elements.body.querySelector(this.get("selector"));

//                 },

//                 select: true,

//               },

//               options: {

//                 maximizable: false,

//                 padding: false,

//                 startMaximized: true,

//                 resizable: false,

//               },

//             };

//           },

//           settings: {

//             selector: undefined,

//           },

//         };

//       });

//   }

//   alertify.ModalMIN($(`#${div}`)[0]);

// }



// async function openModalMin(header, div) {

//   Swal.fire({

//     title: header,

//     html: document.getElementById(div),

//     showConfirmButton: false,

//     showCloseButton: true,

//     allowOutsideClick: false,

//     allowEscapeKey: true,

//     width: "90%", // equivalente a startMaximized

//     customClass: {

//       popup: "swal2-modal-min",

//     },

//   });

// }



async function getMeses() {
  let datos = {
    op: "getMeses",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Configuracion/App.php",
      data: datos,
      dataType: "json",
    });
    console.log("Meses cargados:", respuesta);
  } catch (e) {
    console.log("Error cargando meses:", e);
    return;
  }
  
  if (!respuesta || respuesta.length === 0) {
    console.log("No se obtuvieron meses");
    return;
  }
  
  globalMeses = [...respuesta];
  
  // Limpiar y cargar select de meses
  $("#mesSelected").html(`<option value="" selected>Listado de Meses</option>`);
  globalMeses.forEach((mes) => {
    $("#mesSelected").append(`<option value="${mes.idMes}">${mes.Mes}</option>`);
  });
  
  $("#mesSelectedUpdate").html(`<option value="" selected>Listado de Meses</option>`);
  globalMeses.forEach((mes) => {
    $("#mesSelectedUpdate").append(`<option value="${mes.idMes}">${mes.Mes}</option>`);
  });
}

$(document).on("change", "#mesSelected", function () {
  $("#diaSelected").html('<option value="">Seleccione un día</option>');
  let val = $(this).val();
  if (!val) return;
  
  const mesSelected = globalMeses.find((m) => m.idMes == val);
  if (mesSelected && mesSelected.Dias) {
    mesSelected.Dias.forEach((dia) => {
      $("#diaSelected").append(`<option value="${dia}">${dia}</option>`);
    });
  }
});

$(document).on("change", "#mesSelectedUpdate", function () {
  $("#diaSelectedUpdate").html('<option value="">Seleccione un día</option>');
  let val = $(this).val();
  if (!val) return;
  
  const mesSelected = globalMeses.find((m) => m.idMes == val);
  if (mesSelected && mesSelected.Dias) {
    mesSelected.Dias.forEach((dia) => {
      $("#diaSelectedUpdate").append(`<option value="${dia}">${dia}</option>`);
    });
  }
});

// $(document).on("click", "#btnUpdateDF", async function () {

//   let mes = $("#mesSelectedUpdate").val();

//   let dia = $("#diaSelectedUpdate").val();

//   let desc = $("#txtDescripcionDiaFUpdate").val();

//   let diaF = $("#IdDFUpdate").val();



//   if (mes == "" || dia === null || desc == "") {

//     alertify.warning(

//       "Seleccione el Número de mes, el número de día e ingrese la descripción."

//     );

//   } else {

//     alertify

//       .confirm(

//         `Confirmación de acción.`,

//         `¿Desea confirmar los datos ingresados?`,

//         async function () {

//           let fecha = `${mes}-${dia}`;

//           let datos = await {

//             op: "updateInfoDiaFestivo",

//             Descripcion: desc,

//             Dia: fecha,

//             idDiasFestivos: diaF,

//           };

//           let respuesta = "";

//           try {

//             respuesta = await $.ajax({

//               type: "post",

//               url: "Backend/Configuracion/App.php",

//               data: datos,

//             });

//           } catch (e) {

//             console.log(e);

//           } finally {

//             if (respuesta == "1") {

//               alertify.alert().closeOthers();

//               await limpiarInp();

//               await getListDiasFestivos();

//               alertify.success("Día festivo Actualizado.");

//             } else {

//               alertify.warning(respuesta);

//             }

//           }

//         },

//         async function () {

//           return "0";

//         }

//       )

//       .set("labels", { ok: "Confirmar", cancel: "Cancelar" });

//   }

// });

$(document).on("click", "#btnUpdateDF", async function () {

  let mes = $("#mesSelectedUpdate").val();

  let dia = $("#diaSelectedUpdate").val();

  let desc = $("#txtDescripcionDiaFUpdate").val();

  let diaF = $("#IdDFUpdate").val();



  // Validar campos

  if (mes == "" || dia === null || desc == "") {

    // Swal.fire({

    //   icon: "warning",

    //   title: "Campos incompletos",

    //   text: "Seleccione el número de mes, el número de día e ingrese la descripción.",

    // });

    const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Campos incompletos: Seleccione el número de mes, el número de día e ingrese la descripción</span>

            </div>`;

    showBootstrapAlertWar(messageContent, "top-right", 5000);

    return;

  }



  // Confirmación con Swal

  const result = await Swal.fire({

    title: "Confirmación de acción",

    text: "¿Desea confirmar los datos ingresados?",

    icon: "question",

    showCancelButton: true,

    confirmButtonColor: "#ffc407",

    cancelButtonColor: "#d33",

    confirmButtonText: "Confirmar",

    cancelButtonText: "Cancelar",

  });



  if (!result.isConfirmed) return;



  let fecha = `${mes}-${dia}`;

  let datos = {

    op: "updateInfoDiaFestivo",

    Descripcion: desc,

    Dia: fecha,

    idDiasFestivos: diaF,

  };



  // Petición AJAX

  let respuesta = "";

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Configuracion/App.php",

      data: datos,

    });

  } catch (e) {

    console.log(e);

    const messageContent = `

      <div class="alert-content">

        <span class="alert-title">Alerta!</span>

        <span class="alert-text">Ocurrió un error en la petición.</span>

      </div>`;

    showBootstrapAlertWar(messageContent, "top-right", 5000);

    return;

  }



  // Si la actualización fue exitosa

  if (respuesta == "1") {

    await limpiarInp();

    await getListDiasFestivos();



    const messageContent = `

      <div class="alert-content">

        <span class="alert-title">Completado!</span>

        <span class="alert-text">Día festivo actualizado.</span>

      </div>`;

    showBootstrapAlertSuc(messageContent, "top-right", 5000);



    // --- CERRAR MODAL Update Dia Festivo ---

    let modalElementUp = document.getElementById("ModalUpdateDiaFestivo");

    if (modalElementUp) {

      let modalUp = bootstrap.Modal.getInstance(modalElementUp);

      if (modalUp) modalUp.hide();

    }



    // --- REABRIR MODAL Dias Festivos ---

    let modalElement = document.getElementById("ModalDiasFestivos");

    if (modalElement) {

      let modalDias = bootstrap.Modal.getOrCreateInstance(modalElement, {

        backdrop: "static",

        keyboard: true,

      });

      modalDias.show();

    }

  } else {

    const messageContent = `

      <div class="alert-content">

        <span class="alert-title">Alerta!</span>

        <span class="alert-text">${respuesta}</span>

      </div>`;

    showBootstrapAlertWar(messageContent, "top-right", 5000);

  }

});



// $(document).on("click", "#btnAddDiaF", async function () {

//   let mes = $("#mesSelected").val();

//   let dia = $("#diaSelected").val();

//   let desc = $("#txtDescripcionDiaF").val();

//   if (mes == "" || dia === null || desc == "") {

//     alertify.warning(

//       "Seleccione el Número de mes, el número de día e ingrese la descripción."

//     );

//   } else {

//     alertify

//       .confirm(

//         `Confirmación de acción.`,

//         `¿Desea confirmar los datos ingresados?`,

//         async function () {

//           let fecha = `${mes}-${dia}`;

//           let datos = await {

//             op: "addDiasFestivos",

//             Descripcion: desc,

//             Dia: fecha,

//           };

//           let respuesta = "";

//           try {

//             respuesta = await $.ajax({

//               type: "post",

//               url: "Backend/Configuracion/App.php",

//               data: datos,

//             });

//           } catch (e) {

//             console.log(e);

//           } finally {

//             if (respuesta == "1") {

//               alertify.alert().closeOthers();

//               await limpiarInp();

//               await getListDiasFestivos();

//               alertify.success("Día festivo agregado.");

//             } else {

//               alertify.warning(respuesta);

//             }

//           }

//         },

//         async function () {

//           return "0";

//         }

//       )

//       .set("labels", { ok: "Confirmar", cancel: "Cancelar" });

//   }

// });



$(document).on("click", "#btnAddDiaF", async function () {

  let mes = $("#mesSelected").val();

  let dia = $("#diaSelected").val();

  let desc = $("#txtDescripcionDiaF").val();



  if (mes == "" || dia === null || desc == "") {

    // Swal.fire({

    //   icon: "warning",

    //   title: "Campos incompletos",

    //   text: "Seleccione el número de mes, el número de día e ingrese la descripción.",

    // });

    const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Campos incompletos: Seleccione el número de mes, el número de día e ingrese la descripción.</span>

            </div>`;

    showBootstrapAlertWar(messageContent, "top-right", 5000);

  } else {

    const result = await Swal.fire({

      title: "Confirmación de acción",

      text: "¿Desea confirmar los datos ingresados?",

      icon: "question",

      showCancelButton: true,

      confirmButtonColor: "#ffc407",

      cancelButtonColor: "#d33",

      confirmButtonText: "Confirmar",

      cancelButtonText: "Cancelar",

    });



    if (result.isConfirmed) {

      let fecha = `${mes}-${dia}`;

      let datos = {

        op: "addDiasFestivos",

        Descripcion: desc,

        Dia: fecha,

      };



      let respuesta = "";

      try {

        respuesta = await $.ajax({

          type: "post",

          url: "Backend/Configuracion/App.php",

          data: datos,

        });

      } catch (e) {

        console.log(e);

        // Swal.fire({

        //   icon: "error",

        //   title: "Error",

        //   text: "Ocurrió un error en la petición.",

        // });

        const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">Ocurrió un error en la petición.</span>

            </div>`;

        showBootstrapAlertWar(messageContent, "top-right", 5000);



        return;

      }



      if (respuesta == "1") {

        await limpiarInp();

        await getListDiasFestivos();

        // Swal.fire({

        //   icon: "success",

        //   title: "Éxito",

        //   text: "Día festivo agregado.",

        // });

        const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Día festivo agregado.</span>

          </div>`;

        showBootstrapAlertSuc(messageContent, "top-right", 5000);

      } else {

        // Swal.fire({

        //   icon: "warning",

        //   title: "Atención",

        //   text: respuesta,

        // });

        const messageContent = `

            <div class="alert-content">

             <span class="alert-title">Alerta!</span>

              <span class="alert-text">${respuesta}</span>

            </div>`;

        showBootstrapAlertWar(messageContent, "top-right", 5000);

      }

    }

  }

});



async function limpiarInp() {

  $("#mesSelected").val("");

  $("#diaSelected").val("");

  $("#txtDescripcionDiaF").val("");

  $("#mesSelectedUpdate").val("");

  $("#diaSelectedUpdate").val("");

  $("#txtDescripcionDiaFUpdate").val("");

  $("#IdDFUpdate").val();

}
