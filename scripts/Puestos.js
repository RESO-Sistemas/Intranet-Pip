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
  Promise.all([
    loadDivisiones(),
    getListPuestos()
  ]);
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
    // Modify PuestoJefe data if empty
    respuesta.forEach(r => {
      if (!r.PuestoJefe || r.PuestoJefe.trim() === "") {
        r.PuestoJefe = "No Disponible";
      }
    });

    if (table) {
      table.destroy();
    }

    ej.grids.Grid.Inject(ej.grids.Toolbar, ej.grids.Page);
    table = new ej.grids.Grid({
      dataSource: respuesta,
      toolbar: ['Search'],
      allowPaging: true,
      allowSelection: false,
      pageSettings: { pageSize: 10 },
      emptyRecordTemplate: `<div class="d-flex flex-column align-items-center gap-2 py-4">
          <span class="material-symbols-outlined" style="font-size: 48px; color: #6c757d;">info</span>
          <h5 class="text-secondary">No se encontraron puestos registrados.</h5>
      </div>`,
      columns: [
        { field: 'Puesto', headerText: 'PUESTO', width: 150 },
        { field: 'Division', headerText: 'DIVISION', width: 150 },
        { field: 'PuestoJefe', headerText: 'JEFE', width: 150 },
        { 
          headerText: 'PERMISOS', 
          width: 100, 
          textAlign: 'Center',
          template: `<div class="d-flex flex-nowrap gap-1 justify-content-center">
              <button type="button" class="btn btn-warning btn-accion btn-permisos" title="Permisos"><span class="material-symbols-outlined">key</span></button>
            </div>`
        },
        { 
          headerText: 'ACTUALIZAR', 
          width: 100, 
          textAlign: 'Center',
          template: `<button type="button" class="btn btn-primary btn-accion btn-editar" title="Editar"><span class="material-symbols-outlined">edit</span></button>`
        },
        { 
          headerText: 'MODIFICAR JEFE', 
          width: 120, 
          textAlign: 'Center',
          template: `<button type="button" class="btn btn-success btn-accion btn-jefes" title="Asignar Jefes"><span class="material-symbols-outlined">person_edit</span></button>`
        }
      ],
      recordClick: (args) => {
        const rowData = args.rowData || {};
        const idPuesto = rowData.IdPuesto || "";
        const puesto = rowData.Puesto || "";
        const clickedElement = args.target;

        if (!clickedElement || typeof clickedElement.closest !== "function") {
          return;
        }

        if (clickedElement.closest('.btn-editar')) {
          modalUpdate(idPuesto, puesto);
          return;
        }

        if (clickedElement.closest('.btn-jefes')) {
          openListJefes(idPuesto, puesto);
          return;
        }

        if (clickedElement.closest('.btn-permisos')) {
          window.location.href = `Permisos.php?Puesto=${encodeURIComponent(idPuesto)}`;
        }
      },
      created: () => {
        document.getElementById(table.element.id + "_searchbar").addEventListener('keyup', (event) => {
          table.search(event.target.value);
        });
      }
    });
    table.appendTo('#TablePuestos');
    
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
