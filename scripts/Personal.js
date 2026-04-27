// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

// Cargar datos del usuario en el header
document.addEventListener('DOMContentLoaded', function() {
  loadUserDataHeader();
});

async function loadUserDataHeader() {
  try {
    const response = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: { op: "loadGblDataEmployee" },
      dataType: "json"
    });
    
    if (response && response.Datos && response.Datos.length > 0) {
      const userData = response.Datos[0];
      const profileName = document.getElementById("PerfilNombreEmp");
      const profileEmail = document.getElementById("PerfilCorreoEmp");
      const profileImg = document.getElementById("profileImg");
      const profileImgSmall = document.getElementById("imgSmallProfile");
      
      if (profileName) profileName.textContent = userData.NameEmployee;
      if (profileEmail) profileEmail.textContent = userData.EmailEmployee;
      if (profileImg) profileImg.src = userData.ImgEmployee;
      if (profileImgSmall) profileImgSmall.src = userData.ImgEmployee;
    }
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
  }
}

let empleadoSelected = "",
  divisionSelected = "",
  sucursalSelected = "",
  nivelSelected = "",
  tablePersonal;

let ArrayDatosPorSubirExcel = [];
class Excel {
  constructor(content) {
    this.content = content;
  }
  header() {
    return this.content[2];
  }
  rows() {
    return new RowColletion(this.content.slice(3, this.content.length));
  }
}

class RowColletion {
  constructor(rows) {
    this.rows = rows;
  }
  first() {
    return new Row(this.rows[0]);
  }
  get(index) {
    return new Row(this.rows[index]);
  }
  count() {
    return this.rows.length;
  }
}

class Row {
  constructor(row) {
    this.row = row;
  }
  centrodecosto() {
    return this.row[0];
  }
  Division() {
    return this.row[1];
  }
  DEP() {
    return this.row[2];
  }
  Numero() {
    return this.row[3];
  }
  Nombre() {
    return this.row[4];
  }
  Puesto() {
    return this.row[5];
  }
  Antiguedad() {
    return this.row[6];
  }
  nacimiento() {
    return this.row[7];
  }
  RFC() {
    return this.row[8];
  }
  CURP() {
    return this.row[9];
  }
  NoSeguroS() {
    return this.row[10];
  }
  Email() {
    return this.row[11];
  }
  Celular() {
    return this.row[12];
  }
  Nivel() {
    return this.row[13];
  }
}

class ExcelPrint {
  static print(tableid, excel) {
    const table = document.getElementById(tableid);
    // excel.header().forEach( title => {
    //   table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`;
    // });
    ArrayDatosPorSubirExcel = [];
    let Fecha = "";
    let Antiguedad = "";
    for (let index = 0; index < excel.rows().count(); index++) {
      const row = excel.rows().get(index);
      Fecha = moment(row.nacimiento()).add(1, "days").format("YY/MM/DD");
      Antiguedad = moment(row.Antiguedad()).add(1, "days").format("YY/MM/DD");
      ArrayDatosPorSubirExcel.push({
        CentroCosto: row.centrodecosto(),
        Division: row.Division(),
        Departamento: row.DEP(),
        NumeroEmpleado: row.Numero(),
        Nombre: row.Nombre(),
        Puesto: row.Puesto(),
        Antiguedad: Antiguedad,
        Nacimiento: Fecha,
        RFC: row.RFC(),
        CURP: row.CURP(),
        NoSeguroS: row.NoSeguroS(),
        Email: row.Email(),
        Celular: row.Celular(),
        Nivel: row.Nivel(),
      });
      // table.querySelector("tbody").innerHTML += `<tr>
      //   <td>${row.centrodecosto()}</td>
      //   <td>${row.Division()}</td>
      //   <td>${row.DEP()}</td>
      //   <td>${row.Numero()}</td>
      //   <td>${row.Nombre()}</td>
      //   <td>${row.Puesto()}</td>
      //   <td>${row.Antiguedad()}</td>
      //   <td>${row.nacimiento()}</td>
      //   <td>${row.RFC()}</td>
      //   <td>${row.CURP()}</td>
      //   <td>${row.NoSeguroS()}</td>
      //   <td>${row.Email()}</td>
      //   <td>${row.Celular()}</td>
      //   <td>${row.Nivel()}</td>
      // </tr>`;
    }
    // console.log(ArrayDatosPorSubirExcel);
    // let Registros =  ArrayDatosPorSubirExcel;
    // let CantidadRegistros = Registros.length;
    // console.log(CantidadRegistros);
    // let CantidadArr = CantidadRegistros / 50;
    // console.log(CantidadArr);
    // let CantidadArrRedondeado = Math.ceil(CantidadArr);
    // console.log(CantidadArrRedondeado);
    //
    // for (let i = 0; i < CantidadArrRedondeado; i++) {
    //   array[i]
    // }
    insertaEmpleadosExcel();
  }
}
document.addEventListener('DOMContentLoaded', loadAllFunctions);
async function loadAllFunctions() {
  await Promise.all([getPuestos(), getDivisiones(), getSucursales()]);
  await getListadoPersonal();
}
async function insertaEmpleadosExcel() {
  let datos = await {
    op: "insertaEmpleadosExcel",
    Datos: JSON.stringify(ArrayDatosPorSubirExcel),
  };
  Swal.fire({
    title: "¿Desea agregar a los empleados del Excel?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Agregar Empleados",
  }).then((result) => {
    if (result.isConfirmed) {
      $.blockUI({ message: "procesando..." });

      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
        success: function (response) {
          $("#tbody").html("");
          $("#InpExcel").val();
          response = JSON.parse(response.trim());
          let retorno = response[0]["ValorRetorno"];
          if (retorno == 1) {
            // toastr.success("Datos procesados");
            const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Datos procesados.</span>
          </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            setTimeout(function () {
              location.reload();
            }, 2000);
          } else if (retorno == 2) {
            let ArrEmpleados = [];
            response.map((Empleado) => {
              Empleado.NombresDuplicados.map((NameEmpleado) => {
                ArrEmpleados.push(NameEmpleado);
              });
            });
            let textoSweetAlert = "";
            ArrEmpleados.map((Nombre) => {
              textoSweetAlert += `
                <div class="row">
                  <div class="col-12 text-center">
                    <span>${Nombre}</span><br>
                  </div>
                </div>

            `;
            });
            Swal.fire({
              title: "Empleados repetidos dentro del archivo",
              html: textoSweetAlert,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonColor: "#ffc407",
              confirmButtonText: "Enterado",
              denyButtonText: `Don't save`,
              allowOutsideClick: false,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                setTimeout(function () {
                  location.reload();
                }, 2000);
              }
            });
          } else {
            // toastr.info("ERROR");
            const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error.</span>
        </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
            setTimeout(function () {
              location.reload();
            }, 4000);
          }
        },
        error: function (e) {
          alert(e.responseText);
        },
      });
    } else {
      // setTimeout(function () {
      //   location.reload();
      // }, 1000);
    }
  });
}

document.getElementById("excel-input").addEventListener("change", function () {
  const fileName = this.files.length > 0 ? this.files[0].name : "";
  this.closest(".row").querySelector('input[type="text"]').value = fileName;
});

document
  .getElementById("excel-inputVacaciones")
  .addEventListener("change", function () {
    const fileName = this.files.length > 0 ? this.files[0].name : "";
    this.closest(".row").querySelector('input[type="text"]').value = fileName;
  });
let listaEmpleados = [];
const excelInput = document.getElementById("excel-input");

excelInput.addEventListener("change", async function () {
  const content = await readXlsxFile(excelInput.files[0]);
  console.log(content);
  const excel = new Excel(content);
  ExcelPrint.print("contenidoExcel", excel);
  // console.log(excel.rows().first().Nacimiento());
});

async function getListadoPersonal() {
  let puesto = $("#slctPuestos").val();
  let sucursal = $("#slctSucursal").val();
  let division = $("#slctDivision").val();
  let datasend = {
    op: "getPersonal",
    puesto: puesto,
    sucursal: sucursal,
    division: division,
  };
  try {
    let response = await $.ajax({
      type: "POST",
      url: "Backend/Empleados/App.php",
      data: datasend,
      dataType: "json",
    });
    console.log(response);
    if (tablePersonal) {
      tablePersonal.destroy();
    }
    ej.grids.Grid.Inject(ej.grids.Toolbar, ej.grids.Page, ej.grids.Filter, ej.grids.ExcelExport, ej.grids.PdfExport);
    tablePersonal = new ej.grids.Grid({
      dataSource: response,
      filterSettings: { type: "Menu" },
      allowPaging: true,
      allowSelection: false,
      allowExcelExport: true,
      allowPdfExport: true,
      toolbar: ["ExcelExport", "Search", "PdfExport"],
      columns: [
        {
          field: "NoEmpleado",
          headerText: "NO. EMPLEADO",
          width: 120,
          textAlign: "Center",
        },
        {
          field: "Nombre",
          headerText: "NOMBRE",
          textAlign: "Left",
        },
        {
          field: "Division",
          headerText: "DIVISIÓN",
          width: 150,
          textAlign: "Center",
        },
        {
          field: "Puesto",
          headerText: "PUESTO",
          width: 170,
          textAlign: "Center",
        },
        {
          field: "Sucursal",
          headerText: "SUCURSAL",
          width: 150,
          textAlign: "Center",
        },
        {
          field: "",
          headerText: "ACCIONES",
          width: 320,
          textAlign: "Center",
          allowFiltering: false,
          allowSorting: false,
          allowResizing: false,
          template: "#allActionsTemplate",
        },
      ],
      toolbarClick: function (args) {
        const exportCols = [5];
        if (args["item"].id === "TablePersonal_excelexport") {
          tablePersonal.columns[0].visible = true;
          exportCols.forEach(i => tablePersonal.columns[i].visible = false);
          tablePersonal.excelExport();
        }
        if (args["item"].id === "TablePersonal_pdfexport") {
          tablePersonal.columns[0].visible = true;
          exportCols.forEach(i => tablePersonal.columns[i].visible = false);
          tablePersonal.pdfExport();
        }
      },
      excelExportComplete: function () {
        tablePersonal.columns[0].visible = false;
        [5].forEach(i => tablePersonal.columns[i].visible = true);
      },
      pdfExportComplete: function () {
        tablePersonal.columns[0].visible = false;
        [5].forEach(i => tablePersonal.columns[i].visible = true);
      },
    });

    tablePersonal.appendTo("#TablePersonal");
  } catch (e) {
    console.log(e);
  }
}

// function pdfExportComplete() {
//     tablePersonal.columns[0].visible = true;
// }

window.allActionsSF = function (e) {
  let div = document.createElement("div");
  let statusBtn = e.Status == 1
    ? `<button class="btn btn-success btn-accion btn-sm" title="Desactivar" onclick="toggleStatusEmpleado(${e.NoEmpleado}, false, this)" style="padding: 0.35rem 0.6rem;">
        <span class="material-symbols-outlined" style="font-size: 1.2rem;">check_circle</span>
       </button>`
    : `<button class="btn btn-danger btn-accion btn-sm" title="Activar" onclick="toggleStatusEmpleado(${e.NoEmpleado}, true, this)" style="padding: 0.35rem 0.6rem;">
        <span class="material-symbols-outlined" style="font-size: 1.2rem;">cancel</span>
       </button>`;

  let html = `<div style="display: flex; gap: 4px; justify-content: center; align-items: center; flex-wrap: wrap; padding: 2px 0;">
    <button class="btn btn-primary btn-accion btn-sm" title="Editar Datos" onclick="verDetalleEmpleadoPrincipal(${e.NoEmpleado})" style="padding: 0.35rem 0.6rem;">
      <span class="material-symbols-outlined" style="font-size: 1.2rem;">edit</span>
    </button>
    <a class="btn btn-success btn-accion btn-sm" title="Asignar Jefe" onclick="getJefesPosibles(${e.NoEmpleado},${e.IdSucursal})" style="padding: 0.35rem 0.6rem;">
      <span class="material-symbols-outlined" style="font-size: 1.2rem;">person_check</span>
    </a>
    <button class="btn btn-warning btn-accion btn-sm" title="Más Detalles" onclick="abrirDetallesEmpleado('${e.Nombre}',${e.NoEmpleado})" style="padding: 0.35rem 0.6rem;">
      <span class="material-symbols-outlined" style="font-size: 1.2rem;">info</span>
    </button>
    ${statusBtn}
    <a class="btn btn-info btn-accion btn-sm" href="DocumentacionEmpleados.php?NoEmpleado=${e.NoEmpleado}" title="Ver Documentación" style="padding: 0.35rem 0.6rem;">
      <span class="material-symbols-outlined" style="font-size: 1.2rem;">folder_shared</span>
    </a>
  </div>`;

  $(div).append(html);
  return div.outerHTML;
};

window.updateBossSF = function (e) {
  let div = document.createElement("div");
  let btn = `<a class="btn btn-success btn-accion" title="Asignar Jefe" onclick="getJefesPosibles(${e.NoEmpleado},${e.IdSucursal})"><span class="material-symbols-outlined">person_check</span></a>`;
  $(div).append(btn);
  return div.outerHTML;
};

window.updateDataSF = function (e) {
  let div = document.createElement("div");
  let btn = `<button class="btn btn-primary btn-accion" title="Editar Datos" onclick="verDetalleEmpleadoPrincipal(${e.NoEmpleado})"><span class="material-symbols-outlined">edit</span></button>`;
  $(div).append(btn);
  return div.outerHTML;
};

window.moreDetailsSF = function (e) {
  let div = document.createElement("div");
  let btn = `<button class="btn btn-warning btn-accion" title="Más Detalles" onclick="abrirDetallesEmpleado('${e.Nombre}',${e.NoEmpleado})"><span class="material-symbols-outlined">info</span></button>`;
  $(div).append(btn);
  return div.outerHTML;
};

window.disabledSF = function (e) {
  let div = document.createElement("div");
  let isChecked = e.Status == 1 ? "checked" : "";
  let switchHtml = `
  <div class="form-check form-switch d-flex justify-content-center">
    <input class="form-check-input" type="checkbox" role="switch" 
           id="switch_status_${e.NoEmpleado}" 
           ${isChecked} 
           style="cursor: pointer; transform: scale(1.3);"
           onchange="toggleStatusEmpleado(${e.NoEmpleado}, this.checked, this)">
  </div>`;
  $(div).append(switchHtml);
  return div.outerHTML;
};

function toggleStatusEmpleado(NoEmpleado, isChecked, element) {
  let actionText = isChecked ? "habilitar" : "deshabilitar";
  let opCall = isChecked ? "habilitarEmpleado" : "deshabilitarEmpleado";
  
  Swal.fire({
    title: `¿Desea ${actionText} a este empleado?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: `Sí, ${actionText}`,
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: {
          op: opCall,
          NoEmpleado: NoEmpleado,
        },
        success: function (response) {
          if (response.trim() === "1") {
            const messageContent = `
            <div class="alert-content">
              <span class="alert-title">¡Éxito!</span>
              <span class="alert-text">Empleado ${actionText}do correctamente.</span>
            </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            
            // Refrescar el estado actual en el grid
            getListadoPersonal();
          } else {
            // Revertir el estado visual si falla
            element.checked = !isChecked;
            const messageContent = `
            <div class="alert-content">
              <span class="alert-title">Error!</span>
              <span class="alert-text">No se pudo procesar la solicitud.</span>
            </div>`;
            showBootstrapAlertDan(messageContent, "top-right", 5000);
          }
        },
        error: function() {
          element.checked = !isChecked;
          const messageContent = `
          <div class="alert-content">
            <span class="alert-title">Error!</span>
            <span class="alert-text">Hubo un error de conexión.</span>
          </div>`;
          showBootstrapAlertDan(messageContent, "top-right", 5000);
        }
      });
    } else {
      // Revertir el toggle si se cancela la operación
      element.checked = !isChecked;
    }
  });
}

window.documentacionSF = function (e) {
  let div = document.createElement("div");
  let btn = `<a class="btn btn-info btn-accion" href="DocumentacionEmpleados.php?NoEmpleado=${e.NoEmpleado}" title="Ver documentación"><span class="material-symbols-outlined">folder_shared</span></a>`;
  $(div).append(btn);
  return div.outerHTML;
};

async function limpiarDatosPrincipales() {
  await $("#empleadoSeleccionado").val("");
  await $("#TituloDetallePrincipal").html("");
  await $("#inpNombreDet").val("");
  await $("#inpEmailDet").val("");
  await $("#inpPasswordDet").val("");
  await $("#inpMovilDet").val("");
  await $("#inpRFCDet").val("");
  await $("#inpCURPDet").val("");
  await $("#inpNoSeguroDet").val("");
}

// async function verDetalleEmpleadoPrincipal (NoEmp) {
//   limpiarDatosPrincipales();
//   let datos = await {
//     op: "getDatosPrincipalesEmpleado",
//     NoEmpleado: NoEmp
//   };
//   let respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     $("#empleadoSeleccionado").val(NoEmp);
//     $("#TituloDetallePrincipal").html(`Datos principales del empleado: ${respuesta[0]["Nombre"]}`);
//     $("#inpNombreDet").val(respuesta[0]["Nombre"]);
//     $("#inpEmailDet").val(respuesta[0]["Email"]);
//     $("#inpPasswordDet").val(respuesta[0]["Password"]);
//     $("#inpMovilDet").val(respuesta[0]["Movil"]);
//     $("#inpRFCDet").val(respuesta[0]["RFC"]);
//     $("#inpCURPDet").val(respuesta[0]["CURP"]);
//     $("#inpNoSeguroDet").val(respuesta[0]["NoSeguro"]);
//     $("#inpNivelDet").val(respuesta[0]["Nivel"]);

//     if (!alertify.detallesEmpleado) {
//       alertify.genericDialog || alertify.dialog('detallesEmpleado',function(){
//         return {
//             main:function(content){
//                 this.setContent(content);
//             },
//             setup:function(){
//                 return {
//                     focus:{
//                         element:function(){
//                             return this.elements.body.querySelector(this.get('selector'));
//                         },
//                         select:true
//                     },
//                     options:{
//                         basic:true,
//                         maximizable:false,
//                         resizable:false,
//                         padding:false,
//                         maximizable: true
//                     }
//                 };
//             },
//             settings:{
//                 selector:undefined
//             }
//         };
//       });
//     }
//     alertify.detallesEmpleado ($('#DetallesPrincipalEmpleado')[0]);
//   }
// }

async function verDetalleEmpleadoPrincipal(NoEmp) {
  limpiarDatosPrincipales();
  let datos = {
    op: "getDatosPrincipalesEmpleado",
    NoEmpleado: NoEmp,
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
    $("#empleadoSeleccionado").val(NoEmp);
    $("#TituloDetallePrincipal").html(
      `Datos principales del empleado: ${respuesta[0]["Nombre"]}`
    );
    $("#inpNombreDet").val(respuesta[0]["Nombre"]);
    $("#inpEmailDet").val(respuesta[0]["Email"]);
    $("#inpPasswordDet").val(respuesta[0]["Password"]);
    $("#inpMovilDet").val(respuesta[0]["Movil"]);
    $("#inpRFCDet").val(respuesta[0]["RFC"]);
    $("#inpCURPDet").val(respuesta[0]["CURP"]);
    $("#inpNoSeguroDet").val(respuesta[0]["NoSeguro"]);
    $("#inpNivelDet").val(respuesta[0]["Nivel"]);

    var modal = bootstrap.Modal.getInstance(
      document.getElementById("DetallesPrincipalEmpleado")
    );
    if (!modal) {
      modal = new bootstrap.Modal(
        document.getElementById("DetallesPrincipalEmpleado")
      );
    }
    modal.show();
  }
}

// async function updateDatosPrincipalEmpleado() {
//   let Nombre = $("#inpNombreDet").val();
//   let RFC = $("#inpRFCDet").val();
//   let CURP = $("#inpCURPDet").val();
//   let NoSeguro = $("#inpNoSeguroDet").val();
//   let Email = $("#inpEmailDet").val();
//   let Movil = $("#inpMovilDet").val();
//   let Password = $("#inpPasswordDet").val();
//   let NoEmp = $("#empleadoSeleccionado").val();
//   let Nivel = $("#inpNivelDet").val();
//   if (
//     Nombre == "" ||
//     RFC == "" ||
//     CURP == "" ||
//     NoSeguro == "" ||
//     Email == "" ||
//     Movil == "" ||
//     Password == "" ||
//     Nivel == ""
//   ) {
//     alertify.set("notifier", "position", "top-right");
//     alertify.warning("Por favor ingrese todos los datos.");
//   } else {
//     let contenidoHTML = `
//       <div class="row">
//         <div class="col s12 l12" style="text-align:center;">
//           <h4>¿Desea actualizar el empleado con los siguientes datos?</h4>
//         </div<
//         <div class="col s12 l12">
//           <div class="row">
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>Nombre:</b> ${Nombre}</h5>
//             </div>
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>E-mail:</b> ${Email}</h5>
//             </div>
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>Móvil:</b> ${Movil}</h5>
//             </div>
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>RFC:</b> ${RFC}</h5>
//             </div>
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>CURP:</b> ${CURP}</h5>
//             </div>
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>No Seguro:</b>${NoSeguro}</h5>
//             </div>
//             <div class="col s12 l12" style="text-align:center;">
//                 <h5><b>Nivel:</b>${Nivel}</h5>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//     alertify.confirm(
//       "Confirmación de acción.",
//       `${contenidoHTML}`,
//       async function () {
//         let datos = await {
//           op: "updateDetalleEmpleado",
//           Nombre: Nombre,
//           RFC: RFC,
//           CURP: CURP,
//           NoSeguro: NoSeguro,
//           Email: Email,
//           Movil: Movil,
//           Password: Password,
//           NoEmpleado: NoEmp,
//           Nivel: Nivel,
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
//             alertify.set("notifier", "position", "top-right");
//             alertify.success("Datos Actualizados");
//             await getListadoPersonal();
//             alertify.confirm().closeOthers();
//           } else {
//             alertify.set("notifier", "position", "top-right");
//             alertify.warning(respuesta);
//           }
//         }
//       },
//       async function () {
//         alertify.error("Cancelado");
//       }
//     );
//   }
// }

async function updateDatosPrincipalEmpleado() {
  let Nombre = $("#inpNombreDet").val();
  let RFC = $("#inpRFCDet").val();
  let CURP = $("#inpCURPDet").val();
  let NoSeguro = $("#inpNoSeguroDet").val();
  let Email = $("#inpEmailDet").val();
  let Movil = $("#inpMovilDet").val();
  let Password = $("#inpPasswordDet").val();
  let NoEmp = $("#empleadoSeleccionado").val();
  let Nivel = $("#inpNivelDet").val();

  let faltantes = [];
  if (Nombre == "") faltantes.push("Nombre");
  if (Email == "") faltantes.push("E-mail");
  if (Password == "") faltantes.push("Password");
  if (Movil == "") faltantes.push("Celular");
  if (RFC == "") faltantes.push("RFC");
  if (CURP == "") faltantes.push("CURP");
  if (NoSeguro == "") faltantes.push("No. Seguro");
  if (Nivel == "") faltantes.push("Nivel");

  if (faltantes.length > 0) {
    const messageContent = `
  <div class="alert-content">
    <span class="alert-title">Datos Incompletos!</span>
    <span class="alert-text">Faltan los siguientes campos obligatorios:<br/><b>${faltantes.join(", ")}</b></span>
  </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
  } else {
    let contenidoHTML = `
      <div style="text-align:center; font-size:15px; line-height:1.6;">
        <p><b>Nombre:</b> ${Nombre}</p>
        <p><b>E-mail:</b> ${Email}</p>
        <p><b>Móvil:</b> ${Movil}</p>
        <p><b>RFC:</b> ${RFC}</p>
        <p><b>CURP:</b> ${CURP}</p>
        <p><b>No. Seguro:</b> ${NoSeguro}</p>
        <p><b>Nivel:</b> ${Nivel}</p>
      </div>
    `;

    Swal.fire({
      title: "¿Desea actualizar el empleado con estos datos?",
      html: contenidoHTML,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffc407",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let datos = {
          op: "updateDetalleEmpleado",
          Nombre: Nombre,
          RFC: RFC,
          CURP: CURP,
          NoSeguro: NoSeguro,
          Email: Email,
          Movil: Movil,
          Password: Password,
          NoEmpleado: NoEmp,
          Nivel: Nivel,
        };

        let respuesta = "";
        try {
          respuesta = await $.ajax({
            type: "post",
            url: "Backend/Empleados/App.php",
            data: datos,
          });
        } catch (e) {
          console.error(e);
        } finally {
          if (respuesta == "1") {
            Swal.fire({
              icon: "success",
              title: "Datos Actualizados",
              showConfirmButton: true,
              confirmButtonColor: "#ffc407",
              cancelButtonColor: "#d33",
              confirmButtonText: "Entendido",
            }).then(() => {
              $("#DetallesPrincipalEmpleado").modal("hide"); // Cierra el modal principal
            });
            await getListadoPersonal();
          } else {
            const messageContent = `
  <div class="alert-content">
    <span class="alert-title">Alerta!</span>
    <span class="alert-text">${respuesta}</span>
  </div>`;
            showBootstrapAlertWar(messageContent, "top-right", 5000);
          }
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const messageContent = `
  <div class="alert-content">
    <span class="alert-title">Alerta!</span>
    <span class="alert-text">Cancelado</span>
  </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    });
  }
}

function getPuestos() {
  return new Promise((resolve) => {
    $.ajax({
      type: "post",
      url: "Backend/Puestos/App.php",
      data: "op=getPuestos",
      success: function (response) {
        response = JSON.parse(response.trim());
        $("#slctPuestos").html('<option value="">Listado de Puestos</option>');
        for (var i = 0; i < response.length; i++) {
          $("#slctPuestos").append(`
            <option value='${response[i]["IdPuesto"]}'>${response[i]["Puesto"]}</option>
            `);
        }
        resolve();
      },
      error: function (e) {
        console.error(e);
        resolve();
      },
    });
  });
}
function getDivisiones() {
  return new Promise((resolve) => {
    $.ajax({
      type: "post",
      url: "Backend/Divisiones/App.php",
      data: "op=getDivisiones",
      success: function (response) {
        response = JSON.parse(response.trim());
        $("#slctDivision").html('<option value="">Listado de Divisiones</option>');
        for (var i = 0; i < response.length; i++) {
          $("#slctDivision").append(`
            <option value="${response[i]["IdDivision"]}">${response[i]["Division"]}</option>
            `);
        }
        resolve();
      },
      error: function (e) {
        console.error(e);
        resolve();
      },
    });
  });
}
function getSucursales() {
  return new Promise((resolve) => {
    $.ajax({
      type: "post",
      url: "Backend/Sucursal/App.php",
      data: "op=getSucursales",
      success: function (response) {
        response = JSON.parse(response.trim());
        $("#slctSucursal").html('<option value="">Listado de Sucursales</option>');
        for (var i = 0; i < response.length; i++) {
          $("#slctSucursal").append(`
            <option value="${response[i]["IdSucursal"]}">${response[i]["Sucursal"]}</option>
            `);
        }
        resolve();
      },
      error: function (e) {
        console.error(e);
        resolve();
      },
    });
  });
}

async function asignarDatos(NoEmp, Sucursal, Division, Nivel) {
  //empleadoSelected = NoEmp;
  //divisionSelected = Division;
  //sucursalSelected = Sucursal;
  //nivelSelected = Nivel;
  //listaEmpleados = [];
  //$("#bodyAllEmpleados tr>td").html("");
  //$("#bodyEmpleadosAsignados").html("");
  //getColaboradoresEmpleado();
  //getRelacionPadre();
}
// let globalIdEmpleado = "";
// async function getJefesPosibles(empleado, sucursal) {
//   globalIdEmpleado = empleado;
//   let datos = await {
//     op: "getJefesPosibles",
//     NoEmpleado: empleado,
//     IdSucursal: sucursal,
//   };
//   $("#listadoJefesPosibles").html("");
//   let respuesta = [];
//   try {
//     respuesta = await $.ajax({
//       type: "post",
//       url: "Backend/Empleados/App.php",
//       data: datos,
//       dataType: "json",
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     $("#listadoJefesPosibles").append(`
//             <option value="" selected disabled> Jefes posibles </option>
//         `);
//     console.log(JSON.stringify(respuesta));
//     for (let i = 0; i < respuesta.length; i++) {
//       $("#listadoJefesPosibles").append(`
//              <option value="${respuesta[i]["NoEmpleado"]}">${respuesta[i]["DescJefe"]}</option>
//         `);
//     }
//     let jefeAsignado = await getJefeAsignado(empleado);
//     if (jefeAsignado.length > 0) {
//       $("#listadoJefesPosibles").val(jefeAsignado[0]["EmpleadoPadre"]);
//     }
//     $("select").formSelect();
//     if (!alertify.jefesPosibles) {
//       alertify.genericDialog ||
//         alertify.dialog("jefesPosibles", function () {
//           return {
//             main: function (content) {
//               this.setContent(content);
//             },
//             setup: function () {
//               return {
//                 focus: {
//                   element: function () {
//                     return this.elements.body.querySelector(
//                       this.get("selector")
//                     );
//                   },
//                   select: true,
//                 },
//                 options: {
//                   basic: true,
//                   maximizable: false,
//                   resizable: false,
//                   padding: false,
//                 },
//               };
//             },
//             settings: {
//               selector: undefined,
//             },
//           };
//         });
//     }
//     alertify.jefesPosibles($("#ModalAsignarHijo")[0]);
//   }
// }

let globalIdEmpleado = "";

async function getJefesPosibles(empleado, sucursal) {
  globalIdEmpleado = empleado;

  let datos = {
    op: "getJefesPosibles",
    NoEmpleado: empleado,
    IdSucursal: sucursal,
  };

  $("#listadoJefesPosibles").html("");

  let respuesta = [];
  let error = false;
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (err) {
    console.error("Error al obtener jefes posibles:", err);
    error = true;
    respuesta = [];
  }

  // Agregar la opción por defecto
  $("#listadoJefesPosibles").append(`
    <option value="" selected disabled>Jefes posibles</option>
  `);

  console.log("Respuesta getJefesPosibles:", JSON.stringify(respuesta));

  // Agregar opciones dinámicas solo si respuesta es un array válido
  if (Array.isArray(respuesta) && respuesta.length > 0) {
    for (let i = 0; i < respuesta.length; i++) {
      $("#listadoJefesPosibles").append(`
        <option value="${respuesta[i]["NoEmpleado"]}">
          ${respuesta[i]["DescJefe"]}
        </option>
      `);
    }
  } else if (!error) {
    // Si no hay error pero tampoco hay resultados
    $("#listadoJefesPosibles").append(`
      <option value="" disabled>No hay jefes disponibles</option>
    `);
  } else {
    // Si hubo un error
    $("#listadoJefesPosibles").append(`
      <option value="" disabled>Error al cargar jefes</option>
    `);
  }

  // Mostrar modal
  const modal = new bootstrap.Modal(
    document.getElementById("ModalAsignarHijo")
  );
  modal.show();

  // Inicializar Select2 después de mostrar el modal con mejor configuración
  setTimeout(function() {
    $('#listadoJefesPosibles').select2({
      dropdownParent: $('#ModalAsignarHijo'),
      width: '100%',
      placeholder: 'Selecciona un jefe',
      allowClear: false,
      language: {
        noResults: function() {
          return "No se encontraron resultados";
        },
        searching: function() {
          return "Buscando...";
        }
      },
      minimumResultsForSearch: 0
    });
    
    // Actualizar el valor después de inicializar Select2
    if (Array.isArray(respuesta) && respuesta.length > 0) {
      getJefeAsignado(empleado).then(jefeAsignado => {
        if (Array.isArray(jefeAsignado) && jefeAsignado.length > 0) {
          $('#listadoJefesPosibles').val(jefeAsignado[0]["EmpleadoPadre"]).trigger('change');
        }
      }).catch(err => {
        console.error("Error al obtener jefe asignado:", err);
      });
    }
  }, 150);
}

async function getJefeAsignado(valor) {
  let datos = await {
    op: "getJefeAsignado",
    EmpleadoHijo: valor,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return respuesta;
  }
}

async function asignarJefeEmpleado(empPadre) {
  let datos = await {
    op: "asignarJefeEmpleado",
    EmpleadoPadre: empPadre,
    EmpleadoHijo: globalIdEmpleado,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      // toastr.success("Jefe Actualizado");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Jefe Actualizado.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
    } else {
      // toastr.info("ERROR");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
}

function getColaboradoresEmpleado() {
  $("#bodyAllEmpleados").html("");
  listaEmpleados = [];

  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data:
      "op=getColaboradoresEmpleado" +
      "&IdSucursal=" +
      sucursalSelected +
      "&IdDivision=" +
      divisionSelected +
      "&EmpleadoPadre=" +
      empleadoSelected,
    success: function (response) {
      response = JSON.parse(response.trim());
      const grupoEmpleados = [...new Set(response)];
      grupoEmpleados.map((Empleado) => {
        if (Empleado.Nivel > nivelSelected) {
          listaEmpleados.push(Empleado);
        }
      });
      for (var i = 0; i < listaEmpleados.length; i++) {
        $("#bodyAllEmpleados").append(`
            <tr onclick="addRelacionEmpleadoPadreHijo(${empleadoSelected},${listaEmpleados[i]["NoEmpleado"]})">
              <td>${listaEmpleados[i]["Nombre"]}</td>
              <td>${listaEmpleados[i]["Puesto"]}</td>
            </tr>
            `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function addRelacionEmpleadoPadreHijo(Padre, Hijo) {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data:
      "op=addRelacionEmpleadoPadreHijo" +
      "&EmpleadoPadre=" +
      Padre +
      "&EmpleadoHijo=" +
      Hijo,
    success: function (response) {
      if (response == "1") {
        // toastr.success("Empleado asignado");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Empleado asignado.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        $("#bodyAllEmpleados").html("");
        setTimeout(function () {
          getColaboradoresEmpleado();
          getRelacionPadre();
        }, 900);
      } else {
        // toastr.warning("Algo salio mal, Intente de nuevo");
        const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salio mal, Intente de nuevo.</span>
            </div>`;
        showBootstrapAlertWar(messageContent, "top-right", 5000);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function getRelacionPadre() {
  $("#bodyEmpleadosAsignados").html("");
  let EmpleadoPadre = empleadoSelected;
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getRelacionPadre" + "&EmpleadoPadre=" + EmpleadoPadre,
    success: function (response) {
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#bodyEmpleadosAsignados").append(`
          <tr onclick="deleteRelacionPadre(${response[i]["idRelacionEmpleados"]})">
            <td>${response[i]["Nombre"]}</td>
            <td>${response[i]["Puesto"]}</td>
          </tr>
          `);
      }
    },
  });
}

function deleteRelacionPadre(relacion) {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=deleteRelacionPadre" + "&idRelacionEmpleados=" + relacion,
    success: function (response) {
      if (response == "1") {
        // toastr.success("Empleado designado");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Empleado designado.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        $("#bodyAllEmpleados").html("");
        setTimeout(function () {
          getColaboradoresEmpleado();
          getRelacionPadre();
        }, 900);
      } else {
        // toastr.warning("Algo salio mal, Intente de nuevo");
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
}

function deshabilitarEmpleado(val) {
  Swal.fire({
    title: "¿Desea deshabilitar al empleado?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Deshabilitar",
  }).then((result) => {
    if (result.isConfirmed) {
      let datos = {
        op: "deshabilitarEmpleado",
        NoEmpleado: val,
      };
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
        success: function (response) {
          if (response == 1) {
            // Swal.fire({
            //   position: "top-end",
            //   icon: "success",
            //   title: "Empleado deshabilitado",
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
            const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Empleado deshabilitado.</span>
          </div>`;
            showBootstrapAlertSuc(messageContent, "top-right", 5000);
            getListadoPersonal();
          } else {
            // toastr.info("ERROR");
            const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error.</span>
        </div>`;
            showBootstrapAlert(messageContent, "top-right", 5000);
          }
        },
        error: function (e) {
          // toastr.info(e.responseText);
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${e.responseText}</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        },
      });
    }
  });
}

class ExcelV {
  constructor(content) {
    this.content = content;
  }
  header() {
    return this.content[2];
  }
  rows() {
    return new RowColletionV(this.content.slice(3, this.content.length));
  }
}

class RowColletionV {
  constructor(rows) {
    this.rows = rows;
  }

  first() {
    return new RowV(this.rows[0]);
  }
  get(index) {
    return new RowV(this.rows[index]);
  }
  count() {
    return this.rows.length;
  }
}
class RowV {
  constructor(row) {
    this.row = row;
  }
  noEmpleado() {
    return this.row[0];
  }
  nombre() {
    return this.row[1];
  }
  DiasVacaciones() {
    return this.row[2];
  }
}

let ArrayDatosVacaciones = [];
class ExcelPrinterV {
  static print(tableId, excel) {
    const table = document.getElementById(tableId);
    for (let index = 0; index < excel.rows().count(); index++) {
      const row = excel.rows().get(index);
      ArrayDatosVacaciones.push({
        NoEmpleado: row.noEmpleado(),
        NombreEmp: row.nombre(),
        CantidadDias: row.DiasVacaciones(),
      });
    }
    console.log(ArrayDatosVacaciones);
    insertaDiasVacaciones();
  }
}

const excelInputV = document.getElementById("excel-inputVacaciones");
excelInputV.addEventListener("change", async function () {
  const contentV = await readXlsxFile(excelInputV.files[0]);
  const excelV = new ExcelV(contentV);
  ExcelPrinterV.print("contenidoExcelVacaciones", excelV);
});

async function insertaDiasVacaciones() {
  let datos = await {
    op: "insertaDiasVacaciones",
    Datos: JSON.stringify(ArrayDatosVacaciones),
  };
  Swal.fire({
    title: "¿Desea asignar vacaciones provenientes del Excel?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Asignar Vacaciones",
  }).then((result) => {
    if (result.isConfirmed) {
      $.blockUI({ message: "procesando..." });

      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
        success: function (response) {
          // let textoSweetAlert = `<span>Vacaciones Asignadas</span>`;
          if (response == 1) {
            Swal.fire({
              title: "Vacaciones Asignadas",
              html: "",
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonColor: "#ffc407",
              confirmButtonText: "Enterado",
              denyButtonText: `Don't save`,
              allowOutsideClick: false,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                setTimeout(function () {
                  location.reload();
                }, 1000);
              }
            });
          } else {
            Swal.fire({
              title: "ERROR! Vacaciones no Asignadas",
              html: "",
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonColor: "#ffc407",
              confirmButtonText: "Enterado",
              denyButtonText: `Don't save`,
              allowOutsideClick: false,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                setTimeout(function () {
                  location.reload();
                }, 1000);
              }
            });
          }
        },
        error: function (e) {
          alert(e.responseText);
        },
      });
    } else {
      // setTimeout(function () {
      //   location.reload();
      // }, 1000);
    }
  });
}

// async function abrirDetallesEmpleado(name, NoEmpleado) {
//   $("#EmpleadoMasDetalles").val(NoEmpleado);
//   await getDivisionesMasDetalles();
//   let respuestaMasDetallesPersonal = await getMasDetallesPersonal(NoEmpleado);
//   $("#slctDivisionActual").val(respuestaMasDetallesPersonal[0]["IdDivision"]);
//   await getSucursalMasDetalles();
//   await getPuestosMasDetalles();

//   $("#slctPuestoActual").val(respuestaMasDetallesPersonal[0]["IdPuesto"]);
//   $("#slctSucursalActual").val(respuestaMasDetallesPersonal[0]["IdSucursal"]);

//   $("#tituloOtrosDetalles").html(`Otros detalles del empleado: ${name}`);
//   if (!alertify.masDetalles) {
//     alertify.genericDialog ||
//       alertify.dialog("masDetalles", function () {
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
//                 resizable: false,
//                 padding: false,
//               },
//             };
//           },
//           settings: {
//             selector: undefined,
//           },
//         };
//       });
//   }
//   alertify.masDetalles($("#ContenidoMasDetallesEmpleado")[0]);
// }

// $("#btnUpdateMasDetalles").click(async function () {
//   alertify.confirm(
//     "Confirmación de acción.",
//     "¿Desea confirmar los cambios?",
//     async function () {
//       if (document.getElementById("formUpdateMasDetalles").checkValidity()) {
//         event.preventDefault();
//         let form = $("#formUpdateMasDetalles")[0];
//         let data = new FormData(form);
//         let respuesta = "";
//         try {
//           respuesta = await $.ajax({
//             type: "post",
//             url: "Backend/Empleados/App.php",
//             data: data,
//             processData: false,
//             contentType: false,
//             cache: false,
//             timeout: 600000,
//           });
//         } catch (e) {
//           console.log(e);
//         } finally {
//           if (respuesta == "1") {
//             alertify.set("notifier", "position", "top-right");
//             alertify.success("Datos Actualizados");
//             getListadoPersonal();
//             alertify.alert().closeOthers();
//           } else {
//             alertify.set("notifier", "position", "top-right");
//             alertify.error("ERROR!");
//           }
//         }
//       } else {
//         alertify.set("notifier", "position", "top-right");
//         alertify.error("ERROR!");
//       }
//     },
//     function () {
//       alertify.warning("Cancelado.");
//     }
//   );
// });

async function abrirDetallesEmpleado(name, NoEmpleado) {
  $("#EmpleadoMasDetalles").val(NoEmpleado);

  await getDivisionesMasDetalles();
  let respuestaMasDetallesPersonal = await getMasDetallesPersonal(NoEmpleado);
  let empleado = respuestaMasDetallesPersonal[0];

  const nd = "No disponible";
  $("#inpEmailMasDetalles").val(empleado["Email"] || nd);
  $("#inpMovilMasDetalles").val(empleado["Movil"] || nd);
  $("#inpRFCMasDetalles").val(empleado["RFC"] || nd);
  $("#inpCURPMasDetalles").val(empleado["CURP"] || nd);
  $("#inpNoSeguroMasDetalles").val(empleado["NoSeguroS"] || nd);
  $("#inpNivelMasDetalles").val(empleado["Nivel"] || nd);

  $("#slctDivisionActual").val(empleado["IdDivision"]);
  await getSucursalMasDetalles();
  await getPuestosMasDetalles();
  $("#slctPuestoActual").val(empleado["IdPuesto"]);
  $("#slctSucursalActual").val(empleado["IdSucursal"]);

  $("#tituloOtrosDetalles").html(`Otros detalles del empleado: ${name}`);
  $("#tituloSeccionDocumentos").html(`<span class="material-symbols-outlined align-middle me-1">description</span> Documentación de ${name}`);

  loadDocumentosEnModal(NoEmpleado);

  let modalMasDetalles = new bootstrap.Modal(
    document.getElementById("DetallesMasDetallesEmpleado")
  );
  modalMasDetalles.show();

  setTimeout(function() {
    $('#slctDivisionActual').select2({ dropdownParent: $('#DetallesMasDetallesEmpleado'), width: '100%' });
    $('#slctDivisionActual').val(empleado["IdDivision"]).trigger('change');

    $('#slctPuestoActual').select2({ dropdownParent: $('#DetallesMasDetallesEmpleado'), width: '100%' });
    $('#slctPuestoActual').val(empleado["IdPuesto"]).trigger('change');

    $('#slctSucursalActual').select2({ dropdownParent: $('#DetallesMasDetallesEmpleado'), width: '100%' });
    $('#slctSucursalActual').val(empleado["IdSucursal"]).trigger('change');
  }, 100);
}

// Botón actualizar cambios
$("#btnUpdateMasDetalles").click(async function () {
  // Confirmación con Bootstrap
  const result = await Swal.fire({
    title: "Confirmación de acción",
    text: "¿Desea confirmar los cambios?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#ffc407",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    const form = document.getElementById("formUpdateMasDetalles");
    if (form.checkValidity()) {
      let data = new FormData(form);
      let respuesta = "";
      try {
        respuesta = await $.ajax({
          type: "post",
          url: "Backend/Empleados/App.php",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 600000,
        });
      } catch (e) {
        console.error(e);
      } finally {
        if (respuesta == "1") {
          Swal.fire({
            icon: "success",
            title: "Datos Actualizados",
            confirmButtonColor: "#ffc407",
            confirmButtonText: "Entendido",
          }).then(() => {
            // Cerrar modal después de "Entendido"
            let modalMasDetalles = bootstrap.Modal.getInstance(
              document.getElementById("DetallesMasDetallesEmpleado")
            );
            modalMasDetalles.hide();
          });
          await getListadoPersonal();
        } else {
          // Swal.fire({
          //   icon: "error",
          //   title: "ERROR!",
          //   text: "Algo salió mal, intente de nuevo.",
          //   confirmButtonText: "Entendido",
          // });
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salió mal, intente de nuevo.</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      }
    } else {
      // Swal.fire({
      //   icon: "error",
      //   title: "ERROR!",
      //   text: "Formulario incompleto.",
      //   confirmButtonText: "Entendido",
      // });
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Formulario incompleto.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Swal.fire({
    //   icon: "info",
    //   title: "Cancelado",
    //   showConfirmButton: false,
    //   timer: 2000,
    // });
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Cancelado.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
});

async function onchangeDivision() {
  await getPuestosMasDetalles();
  await getSucursalMasDetalles();
}
async function getDivisionesMasDetalles() {
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: "op=getDivisiones",
    success: function (response) {
      $("#slctDivisionActual").html("");
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctDivisionActual").append(`
          <option value="${response[i]["IdDivision"]}">${response[i]["Division"]}</option>
          `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

async function getPuestosMasDetalles() {
  let IdDivision = await $("#slctDivisionActual").val();
  let datos = await {
    op: "getPuestosXDivision",
    IdDivision: IdDivision,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Puestos/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    $("#slctPuestoActual").html("");
    respuesta.forEach((registro) => {
      $("#slctPuestoActual").append(`
          <option value="${registro.IdPuesto}">${registro.Puesto}</option>
      `);
    });
  }
}

async function getSucursalMasDetalles() {
  let IdDivision = await $("#slctDivisionActual").val();
  const datos = {
    op: "getSucursalesXDivision",
    IdDivision: IdDivision,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Sucursal/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log(respuesta);
    $("#slctSucursalActual").html("");
    respuesta.forEach((registro) => {
      $("#slctSucursalActual").append(`
          <option value="${registro.IdSucursal}">${registro.Sucursal}</option>
      `);
    });
  }
}

async function getMasDetallesPersonal(Empleado) {
  let datos = await {
    op: "otrosDetallesEmpleadoPersonal",
    NoEmpleado: Empleado,
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
    return respuesta;
  }
}

$("#downloadEsquemaSalud").click(async function () {
  await descargaEsquemaSalud();
});

let TableEsquemaSalud = $("#TableEsquemaSalud").dataTable({
  dom: "Bfrtip",
  buttons: [
    {
      extend: "excelHtml5",
      customize: function (xlsx) {
        // Personaliza el documento de Excel generado
        var sheet = xlsx.xl.worksheets["sheet1.xml"];
        $("row:first c", sheet).attr("s", "20");
      },
      filename: "Esquema de Salud",
      theme: "dark",
    },
  ],
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
  bSort: false,
  bPaginate: false,
  bFilter: false,
  bInfo: false,
});

async function descargaEsquemaSalud() {
  let datos = await {
    op: "getDatosEsquemaSaludPersonal",
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
    console.log();
  } finally {
    TableEsquemaSalud.fnClearTable();
    respuesta.forEach((datos) => {
      TableEsquemaSalud.fnAddData([
        datos.Nombre,
        datos.HabitusExterior,
        datos.Peso,
        datos.Complexion,
        datos.Talla,
        datos.FrCardiaca,
        datos.FrRespiratoria,
        datos.TensionArterial,
        datos.Temperatura,
        datos.GrupoSanguineo,
        datos.FactorRh,
        datos.CartillaVacunacion,
        datos.EsquemaCompleto,
        datos.OtrosComentariosSalud,
      ]);
    });

    const btnExcel = $("button[aria-controls='TableEsquemaSalud']");
    console.log(btnExcel);
    btnExcel.click();
  }
}

// Limpiar Select2 cuando el modal se cierra
$('#DetallesMasDetallesEmpleado').on('hidden.bs.modal', function () {
  $('#slctDivisionActual').select2('destroy');
  $('#slctPuestoActual').select2('destroy');
  $('#slctSucursalActual').select2('destroy');
});

// Limpiar Select2 cuando el modal de jefe se cierra
$('#ModalAsignarHijo').on('hidden.bs.modal', function () {
  if ($('#listadoJefesPosibles').hasClass('select2-hidden-accessible')) {
    $('#listadoJefesPosibles').select2('destroy');
  }
});

// ==========================================
// DOCUMENTOS EN MODAL MÁS DETALLES
// ==========================================
async function loadDocumentosEnModal(NoEmpleado) {
  $('#listaDocumentosModal').html('<div class="text-center text-muted small py-2">Cargando documentos...</div>');

  try {
    const respuesta = await $.ajax({
      type: "POST",
      url: "Backend/DocumentacionEmpleados/App.php",
      data: {
        op: "getDocumentacionCompletaEmpleado",
        NoEmpleado: btoa(String(NoEmpleado))
      },
      dataType: "json"
    });

    if (respuesta.Resultado && respuesta.Siguiente && Array.isArray(respuesta.Data) && respuesta.Data.length > 0) {
      let html = '';
      respuesta.Data.forEach(function(doc) {
        let badgeClass = '';
        let badgeIcon = '';
        let badgeText = doc.Estatus;

        switch (doc.Estatus) {
          case 'Completo':
            badgeClass = 'bg-success';
            badgeIcon = 'check_circle';
            break;
          case 'Pendiente':
            badgeClass = 'bg-warning text-dark';
            badgeIcon = 'pending';
            break;
          case 'Vencido':
            badgeClass = 'bg-danger';
            badgeIcon = 'error';
            break;
          default:
            badgeClass = 'bg-secondary';
            badgeIcon = 'help';
        }

        const obligatorio = doc.Obligatorio == 1 ? '<span class="badge bg-info ms-1" style="font-size:10px;">Obligatorio</span>' : '';

        html += `<div class="list-group-item d-flex justify-content-between align-items-center py-2">
          <span>${doc.NombreDocumento}${obligatorio}</span>
          <span class="badge ${badgeClass}">
            <span class="material-symbols-outlined align-middle" style="font-size:14px;">${badgeIcon}</span> ${badgeText}
          </span>
        </div>`;
      });
      $('#listaDocumentosModal').html(html);
    } else {
      $('#listaDocumentosModal').html('<div class="text-center text-muted small py-2">No hay documentos configurados en el catálogo.</div>');
    }
  } catch (error) {
    console.error("Error al cargar documentos:", error);
    $('#listaDocumentosModal').html('<div class="text-center text-muted small py-2">Error al cargar documentos.</div>');
  }
}
