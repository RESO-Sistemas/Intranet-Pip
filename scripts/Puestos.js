// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

// $(document).ready(function() {
//     $('.Slc2').select2();
// });

const SlctDivision = document.getElementById("slctDivision");
const SlctJefes = document.getElementById("slctJefes");
const PSelected = document.getElementById("txtPSelected");
const InpPSelected = document.getElementById("inpPSelected");

let table;
loadPuestosData();
async function loadPuestosData() {
  await loadDivisiones();
  await getListPuestos();
}
async function getListPuestos() {
  datos = {
    op: "getListPuestos",
  };
  let respuesta;
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
    table = $("#TablePuestos").DataTable({
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
      bSort: false,
      bPaginate: true,
      bFilter: true,
      bInfo: false,
      // dom: '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-tl ui-corner-tr"fr>' +
      //   't' +
      //   '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ip>',
      data: respuesta,
      columns: [
        {
          data: "Puesto",
        },
        {
          data: "Division",
        },
        {
          data: "PuestoJefe",
        },
        {
          data: "IdPuesto",
          render: function (data, type, row, meta) {
            return `<a class="btn btn-warning" href="Permisos.php?Puesto=${data}" ><span class="material-symbols-outlined">key</span></a>`;
          },
        },
        {
          data: null,
          render: function (data, type, row, meta) {
            return `<button class="btn btn-primary" href="#" onclick="modalUpdate('${data.IdPuesto}','${data.Puesto}')"><span class="material-symbols-outlined">edit</span></button>`;
          },
        },
        {
          data: null,
          render: function (data, type, row, meta) {
            return `<button class="btn btn-success" href="#" onclick="openListJefes('${data.IdPuesto}','${data.Puesto}')"><span class="material-symbols-outlined">person_edit</span></button>`;
          },
        },
      ],
      order: [[1, "asc"]],
    });
    
    let contHtmlJ = '';
    contHtmlJ += `<option value="">Sin Jefe asignado</option>`;
    respuesta.forEach((r) => {
      let decode = atob(r.IdPuesto);
      contHtmlJ += `
          <option value="${decode}">${r.Puesto}</option>
       `;
    });
    
    // Destruir Select2 si ya existe
    if ($('#slctJefes').hasClass('select2-hidden-accessible')) {
      $('#slctJefes').select2('destroy');
    }
    
    SlctJefes.innerHTML = contHtmlJ;
  }
}

async function openListJefes(idp, name) {
  PSelected.innerHTML = `<h6>Puesto seleccionado: ${name}</h6>`;
  InpPSelected.value = idp;

  // Destruir Select2 si existe antes de cargar datos
  if ($('#slctJefes').hasClass('select2-hidden-accessible')) {
    $('#slctJefes').select2('destroy');
  }

  await loadJefesAsigPuesto();
  
  // Inicializar Select2 después de cargar los datos
  $('#slctJefes').select2({
    dropdownParent: $('#modalListPuestos'),
    width: '100%',
    placeholder: 'Seleccione jefes',
    multiple: true,
    language: {
      noResults: function() {
        return "No se encontraron resultados";
      }
    }
  });

  const modalEl = document.getElementById("modalListPuestos");
  const modal = new bootstrap.Modal(modalEl);
  
  // Agregar evento para exclusividad de "Sin Jefe"
  $('#slctJefes').off('select2:select').on('select2:select', function (e) {
    let data = e.params.data;
    let selectedValues = $(this).val();
    
    if (data.id === "") {
        // Si seleccionó "Sin Jefe", remover todo lo demás
        $(this).val([""]).trigger('change');
    } else {
        // Si seleccionó un jefe real, remover "Sin Jefe"
        if (selectedValues.includes("")) {
            let filtered = selectedValues.filter(v => v !== "");
            $(this).val(filtered).trigger('change');
        }
    }
  });

  modal.show();
}


async function loadJefesAsigPuesto() {
  let datos = {
    op: "loadJefesAsigPuesto",
    ip: InpPSelected.value,
  };
  const ajaxResponse = await pAjaxAsync(url_m_puestos, datos, 0);
  if (ajaxResponse !== undefined) {
    const dataResponse = ajaxResponse.Datos;
    let val = dataResponse[0].IdJefesPuesto;
    if (val && typeof val === 'string') {
        val = val.split(',');
    } else if (!val) {
        val = [""];
    }
    $("#slctJefes").val(val).trigger('change');
  }
}

// Limpiar Select2 cuando se cierra el modal
$('#modalListPuestos').on('hidden.bs.modal', function () {
  if ($('#slctJefes').hasClass('select2-hidden-accessible')) {
    $('#slctJefes').select2('destroy');
  }
});

$(document).on("click", "#updateJefes", async function () {
  let arrSelected = $("#slctJefes").val();
  let datos = {
    op: "asignaJefesPuesto",
    j: arrSelected,
    ip: InpPSelected.value,
  };

  const ajaxResponse = await pAjaxAsync(url_m_puestos, datos, 0);

  if (ajaxResponse !== undefined) {
    await getListPuestos();

    // Cerrar modal Bootstrap
    const modalEl = document.getElementById("modalListPuestos");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
});

async function checkedJefe(val) {
  let datos = {
    op: "asignaJefePuesto",
    nIdPuesto: val,
  };
  await pAjaxAsync("Backend/Puestos/App.php", datos, 0);
}

async function modalUpdate(id, puesto) {
  $("#txtIdPuesto").val(id);
  $("#txtPuestoUpdate").val(puesto);

  let header = `Descripción del puesto actual: ${puesto}`;
  $("#textPuesto").html(header);

  // abrir modal Bootstrap
  const modal = new bootstrap.Modal(document.getElementById("divUpdatePuesto"));
  modal.show();
}

async function updatePuesto() {
  const Puesto = $("#txtPuestoUpdate").val();
  const IdPuesto = $("#txtIdPuesto").val();

  if (Puesto == "") {
    // toastr.info("Ingrese una descripción.");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese una descripción.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);

    return false;
  }

  let datos = {
    op: "updateDescPuesto",
    Puesto: Puesto,
    IdPuesto: IdPuesto,
  };

  let respuesta = "";
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Puestos/App.php",
      data: datos,
    });
  } catch (e) {
    console.log(e);
  } finally {
    if (respuesta == "1") {
      // toastr.success("Puesto Actualizado");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Puesto Actualizado</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      // cerrar modal Bootstrap
      const modalEl = document.getElementById("divUpdatePuesto");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      await getListPuestos();
    } else {
      // toastr.info("ERROR!");
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">ERROR</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  }
}

async function loadDivisiones() {
  let datos = {
    op: "getListDivisiones",
  };
  const ajaxResponse = await pAjaxAsync("Backend/Divisiones/App.php", datos, 0);
  if (ajaxResponse !== undefined) {
    const dataResponse = ajaxResponse.Datos;
    let contenidoHTML = "";
    dataResponse.forEach((datos) => {
      contenidoHTML += `<option value="${datos.IdDivision}">${datos.Division}</option>`;
    });
    SlctDivision.innerHTML += contenidoHTML;
    // $("#slctDivision").select2({
    //   placeholder: "Listado de divisiones",
    //   allowClear: true,
    // });
  }
}

$(document).on("click", "#registraPuesto", async function () {
  let nombrePuesto = $("#txtNameP").val();
  let division = $("#slctDivision").val();
  if (
    division === undefined ||
    division === null ||
    division == "" ||
    nombrePuesto === undefined ||
    nombrePuesto === null ||
    nombrePuesto == ""
  ) {
    // toastr.info(
    //   "Ingrese todos los datos para poder registrar el nuevo puesto."
    // );
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese todos los datos para poder registrar el nuevo puesto.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  } else {
    let title = "¿Desea confirmar los datos del nuevo puesto?";
    const result = await dialogConfirmSAlert(title);
    if (result) {
      await addPuestos(nombrePuesto, division);
    }
  }
});

async function addPuestos(nombrePuesto, division) {
  let datos = {
    op: "addPuestos",
    nPuesto: nombrePuesto,
    nIdDivision: division,
  };
  const ajaxResponse = await pAjaxAsync("Backend/Puestos/App.php", datos, 1);
  if (ajaxResponse !== undefined) {
    await getListPuestos();
    limipiarInputs();
  }
}

// function limipiarInputs() {
//   $("#txtNameP").val("");
//   $("#slctDivision").val("");
//   $("#slctDivision").formSelect();
// }

function limipiarInputs() {
  $("#txtNameP").val("");
  $("#slctDivision").val(""); 
}

// async function openModalMin(div) {
//   if (!alertify.ModalMIN) {
//     alertify.ModalMIN ||
//       alertify.dialog("ModalMIN", function () {
//         return {
//           main: function (content) {
//             this.setContent(content);
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
//                 basic: true,
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
//   alertify.ModalMIN($(`#${div}`)[0]);
// }
