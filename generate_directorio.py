import re

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/Directorio.js', 'r') as f:
    original_code = f.read()

new_code = """$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
});

getTiposExtensionesDirectorioExtensiones();
loadDirecorioEmailTel();
loadDirectorioExtensiones();
getDirectorioSucursal();

function getEmptyTemplate(title, desc, icon) {
  return `<div class="d-flex flex-column align-items-center justify-content-center text-center p-5" style="min-height: 200px; background-color: #fafbfc; border-radius: 12px; border: 1px dashed #dee2e6;">
      <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; background-color: #f1f3f5; border-radius: 50%;">
          <span class="material-symbols-outlined" style="font-size: 30px; color: #adb5bd;">${icon}</span>
      </div>
      <h6 class="text-dark mb-1" style="font-weight: 600;">${title}</h6>
      <p class="text-muted mb-0" style="max-width: 350px; font-size: 13px;">${desc}</p>
    </div>`;
}

async function loadDirecorioEmailTel() {
  const DirEmailTel = await getDirecorioEmailTel();
  let container = document.getElementById("contenidoDirectorioEmailTelefonos");
  if (!container) return;
  container.innerHTML = "";

  DirEmailTel.forEach((ContenidoDirectorio) => {
    ContenidoDirectorio.Tipos.map((Registros) => {
      let wrapper = document.createElement("div");
      wrapper.className = "mb-4";
      wrapper.innerHTML = `
        <div class="row mb-2">
            <div class="col text-center">
                <span class="badge badge-primary">${Registros.Tipo}</span>
            </div>
        </div>
        <div id="grid_email_${Registros.idDirectoriosCorreosTelefonos}"></div>
      `;
      container.appendChild(wrapper);

      let dataForType = ContenidoDirectorio.Detalle.filter((Detalle) => {
        return Detalle.idDirectoriosCorreosTelefonos == Registros.idDirectoriosCorreosTelefonos;
      });

      let grid = new ej.grids.Grid({
        dataSource: dataForType,
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: getEmptyTemplate("Sin registros", "No hay contactos en esta categoría.", "contact_phone"),
        columns: [
          { field: "Nombre", headerText: "NOMBRE", width: 200 },
          { field: "Puesto", headerText: "PUESTO", width: 200 },
          { field: "Email", headerText: "CORREO", width: 200 },
          { field: "Movil", headerText: "TELEFONO", width: 150 },
          { field: "MarcacionCorta", headerText: "MARCACION CORTA", width: 150 }
        ]
      });
      grid.appendTo(`#grid_email_${Registros.idDirectoriosCorreosTelefonos}`);
    });
  });
}

async function getDirecorioEmailTel() {
  let datos = { op: "getDirectorioCorreosTelefonos" };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return respuesta;
  }
}

async function getTiposExtensionesDirectorioExtensiones() {
  let datos = { op: "getTiposExtensionesDirectorioExtensiones" };
  try {
    let respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
    respuesta.forEach((tipos) => {
      $("#tiposExtension").append(`<option value="${tipos.idDirectorioExtensiones}">${tipos.Tipo}</option>`);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getDirectorioExtensiones() {
  let TiposExtSelected = $("#tiposExtension").val();
  let datos = {
    op: "getDirectorioExtensiones",
    TiposExtSelected: TiposExtSelected,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Directorios/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return respuesta;
  }
}

async function loadDirectorioExtensiones() {
  const Directorio = await getDirectorioExtensiones();
  let container = document.getElementById("contenidoDirectorioExtensiones");
  if (!container) return;
  container.innerHTML = "";

  Directorio.forEach((ContenidoDirectorio) => {
    ContenidoDirectorio.Tipos.map((Registros) => {
      let wrapper = document.createElement("div");
      wrapper.className = "mb-4";
      wrapper.innerHTML = `
        <div class="row mb-2">
            <div class="col text-center">
                <span class="badge badge-primary">${Registros.Tipo}</span>
            </div>
        </div>
        <div id="grid_ext_${Registros.idDirectorioExtensiones}"></div>
      `;
      container.appendChild(wrapper);

      let dataForType = ContenidoDirectorio.Detalle.filter((Detalle) => {
        return Detalle.idDirectorioExtensiones == Registros.idDirectorioExtensiones;
      });

      let grid = new ej.grids.Grid({
        dataSource: dataForType,
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: getEmptyTemplate("Sin registros", "No hay extensiones en esta categoría.", "call"),
        columns: [
          { field: "Nombre", headerText: "NOMBRE", width: 250 },
          { field: "Extension", headerText: "EXTENSION", width: 150 }
        ]
      });
      grid.appendTo(`#grid_ext_${Registros.idDirectorioExtensiones}`);
    });
  });
}

let gridDirectorioSucursal = null;

async function getDirectorioSucursal() {
  let datos = { op: "getDirectorioSucursal" };
  
  if (gridDirectorioSucursal) {
    gridDirectorioSucursal.destroy();
  }
  
  $.ajax({
    type: "POST",
    url: "Backend/Directorios/App.php",
    data: datos,
    dataType: "json",
    success: function (response) {
      let ArrEmpleados = [];
      response.forEach((registrosEmp) => {
        ArrEmpleados.push({
          idDirectorioSucursales: registrosEmp.idDirectorioSucursales,
          Nombre: registrosEmp.Nombre,
          Puesto: registrosEmp.Puesto,
        });
      });

      const Unicos = removeDuplicates(response, "idDirectorioSucursales");

      let mappedData = Unicos.map((UnicosV) => {
        let ContenidoEmpleados = "";
        let ContenidoPuestos = "";
        ArrEmpleados.forEach((empleados) => {
          if (UnicosV.idDirectorioSucursales == empleados.idDirectorioSucursales) {
            ContenidoEmpleados += `<div><h6>${empleados.Nombre}</h6></div>`;
            ContenidoPuestos += `<div><h6>${empleados.Puesto}</h6></div>`;
          }
        });
        return {
          ...UnicosV,
          NombreEmpleadoHtml: ContenidoEmpleados,
          PuestoHtml: ContenidoPuestos
        };
      });

      gridDirectorioSucursal = new ej.grids.Grid({
        dataSource: mappedData,
        toolbar: ["Search"],
        allowPaging: true,
        pageSettings: { pageSize: 10 },
        emptyRecordTemplate: getEmptyTemplate("No hay sucursales", "No se encontraron sucursales registradas.", "store"),
        columns: [
          { field: "Sucursal", headerText: "Sucursal", width: 150 },
          { field: "Direccion", headerText: "Dirección", width: 200 },
          { field: "Telefono", headerText: "Teléfono", width: 120 },
          { field: "NumRed", headerText: "Num. Red", width: 120 },
          { field: "NombreEmpleadoHtml", headerText: "Nombre Empleado", width: 200, disableHtmlEncode: false },
          { field: "PuestoHtml", headerText: "Puesto", width: 200, disableHtmlEncode: false },
          { field: "Correo", headerText: "Correo", width: 180 },
          { field: "FechaApertura", headerText: "Fecha Apertura", width: 130 },
          { field: "años_transcurridos", headerText: "Antigüedad", width: 120 },
          { field: "MarcacionCorta", headerText: "Marcación Corta", width: 130 }
        ],
        dataBound: function() {
            const gridElement = this.element;
            const searchInput = document.getElementById(gridElement.id + "_searchbar");
            if (searchInput && !searchInput.hasListener) {
              searchInput.hasListener = true;
              const grid = this;
              searchInput.addEventListener("keyup", function (event) {
                grid.search(event.target.value);
              });
            }
        }
      });
      gridDirectorioSucursal.appendTo("#tableDirectorioSucursal");
    }
  });
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};
  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
"""

with open('/Users/gerardoplata/Documents/Proyectos RESO Sistemas/Intranet-Pip/scripts/Directorio.js', 'w') as f:
    f.write(new_code)

print("Directorio.js updated!")
