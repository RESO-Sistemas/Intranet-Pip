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

ej.base.registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

// $('#TablePersonal').editableTableWidget().numericInputExample().find('td:first').focus();
// $(function() {
//     $('#TablePersonal').DataTable();
// });
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
loadAllFunctions();
async function loadAllFunctions() {
  getPuestos();
  getDivisiones();
  getSucursales();
  getListadoPersonal();
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
          $.unblockUI();
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
            $.unblockUI();
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
          $.unblockUI();
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
    tablePersonal = new ej.grids.Grid({
      dataSource: response,
      allowFiltering: true,
      filterSettings: { type: "Menu" },
      allowPaging: true,
      allowTextWrap: true,
      allowExcelExport: true,
      allowPdfExport: true,
      toolbar: ["ExcelExport", "Search", "PdfExport"],
      // pdfExportComplete: pdfExportComplete,
      columns: [
        {
          field: "NoEmpleado",
          headerText: "NO. EMPLEADO",
          width: 100,
          textAlign: "Center",
          visible: false,
        },
        {
          field: "Nombre",
          headerText: "NOMBRE",
          width: 80,
          textAlign: "Center",
        },
        {
          field: "Email",
          headerText: "E-MAIL",
          width: 80,
          textAlign: "Center",
        },
        {
          field: "Movil",
          headerText: "CELULAR",
          width: 80,
          textAlign: "Center",
        },
        {
          field: "Division",
          headerText: "DIVISION",
          width: 80,
          textAlign: "Center",
        },
        {
          field: "Puesto",
          headerText: "PUESTO",
          width: 80,
          textAlign: "Center",
        },
        {
          field: "Sucursal",
          headerText: "SUCURSAL",
          width: 80,
          textAlign: "Center",
        },
        {
          field: "",
          headerText: "ACTUALIZAR DATOS",
          width: 80,
          textAlign: "Center",
          allowFiltering: false,
          template: "#updateDataTemplate",
        },
        {
          field: "",
          headerText: "JEFE",
          width: 80,
          textAlign: "Center",
          allowFiltering: false,
          template: "#updateBossTemplate",
        },
        {
          field: "",
          headerText: "MÁS DETALLES",
          width: 80,
          textAlign: "Center",
          allowFiltering: false,
          template: "#moreDetailsTemplate",
        },
        {
          field: "",
          headerText: "Deshabilitar",
          width: 80,
          textAlign: "Center",
          allowFiltering: false,
          template: "#disabledTemplate",
        },
      ],
    });

    tablePersonal.toolbarClick = function (args) {
      if (args["item"].id === "TablePersonal_excelexport") {
        tablePersonal.columns[0].visible = true;
        tablePersonal.columns[7].visible = false;
        tablePersonal.columns[8].visible = false;
        tablePersonal.columns[9].visible = false;
        tablePersonal.columns[10].visible = false;
        tablePersonal.excelExport();
      }
      if (args["item"].id === "TablePersonal_pdfexport") {
        tablePersonal.columns[0].visible = true;
        tablePersonal.columns[7].visible = false;
        tablePersonal.columns[8].visible = false;
        tablePersonal.columns[9].visible = false;
        tablePersonal.columns[10].visible = false;
        tablePersonal.pdfExport();
      }
    };

    tablePersonal.appendTo("#TablePersonal");
  } catch (e) {
    console.log(e);
  }
}

// function pdfExportComplete() {
//     tablePersonal.columns[0].visible = true;
// }

window.updateBossSF = function (e) {
  let div = document.createElement("div");
  let btn = `<a class="btn btn-success"  onclick="getJefesPosibles(${e.NoEmpleado},${e.IdSucursal})"><span class="material-symbols-outlined">
person_check
</span></a>`;
  $(div).append(btn);
  return div.outerHTML;
};

window.updateDataSF = function (e) {
  let div = document.createElement("div");
  let btn = `<button class="btn btn-primary" onclick="verDetalleEmpleadoPrincipal(${e.NoEmpleado})"><span class="material-symbols-outlined">
edit
</span></button>`;
  $(div).append(btn);
  return div.outerHTML;
};

window.moreDetailsSF = function (e) {
  let div = document.createElement("div");
  let btn = `<button class="btn btn-warning" onclick="abrirDetallesEmpleado('${e.Nombre}',${e.NoEmpleado})"><span class="material-symbols-outlined">
info_i
</span></button>`;
  $(div).append(btn);
  return div.outerHTML;
};

window.disabledSF = function (e) {
  let div = document.createElement("div");
  let btn = `<button class="btn btn-danger" onclick="deshabilitarEmpleado(${e.NoEmpleado})"><span class="material-symbols-outlined">
block
</span></button>`;
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

  if (
    Nombre == "" ||
    RFC == "" ||
    CURP == "" ||
    NoSeguro == "" ||
    Email == "" ||
    Movil == "" ||
    Password == "" ||
    Nivel == ""
  ) {
    const messageContent = `
  <div class="alert-content">
    <span class="alert-title">Alerta!</span>
    <span class="alert-text">Datos Incompletos.<br/> Por favor ingrese todos los datos. </span>
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
  $.ajax({
    type: "post",
    url: "Backend/Puestos/App.php",
    data: "op=getPuestos",
    success: function (response) {
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctPuestos").append(`
          <option value='${response[i]["IdPuesto"]}'>${response[i]["Puesto"]}</option>
          `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
function getDivisiones() {
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: "op=getDivisiones",
    success: function (response) {
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctDivision").append(`
          <option value="${response[i]["IdDivision"]}">${response[i]["Division"]}</option>
          `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
function getSucursales() {
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: "op=getSucursales",
    success: function (response) {
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctSucursal").append(`
          <option value="${response[i]["IdSucursal"]}">${response[i]["Sucursal"]}</option>
          `);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
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
          $.unblockUI(); // Desbloquear siempre al inicio del success

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
          $.unblockUI();
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
  $("#slctDivisionActual").val(respuestaMasDetallesPersonal[0]["IdDivision"]);
  await getSucursalMasDetalles();
  await getPuestosMasDetalles();
  $("#slctPuestoActual").val(respuestaMasDetallesPersonal[0]["IdPuesto"]);
  $("#slctSucursalActual").val(respuestaMasDetallesPersonal[0]["IdSucursal"]);

  $("#tituloOtrosDetalles").html(`Otros detalles del empleado: ${name}`);

  // Abrir modal Bootstrap
  let modalMasDetalles = new bootstrap.Modal(
    document.getElementById("DetallesMasDetallesEmpleado")
  );
  modalMasDetalles.show();

  // Inicializar Select2 en los selects del modal después de que se muestra
  setTimeout(function() {
    $('#slctDivisionActual').select2({
      dropdownParent: $('#DetallesMasDetallesEmpleado'),
      width: '100%'
    });
    $('#slctPuestoActual').select2({
      dropdownParent: $('#DetallesMasDetallesEmpleado'),
      width: '100%'
    });
    $('#slctSucursalActual').select2({
      dropdownParent: $('#DetallesMasDetallesEmpleado'),
      width: '100%'
    });
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
