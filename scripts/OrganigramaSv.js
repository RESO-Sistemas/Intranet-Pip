ej.base.registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="
);

$(document).ready(function () {
  // selectServicioCategoria();
  // $('.js-example-basic-single').select2();
});

// Ocultar preloader cuando todo esté listo
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Organigrama = urlParams.get("Org");
let datosOrg = [];

// google.charts.load('current', {packages:["orgchart"]});
// google.charts.setOnLoadCallback(loadOrganigrama);
loadOrg();
async function loadOrg() {
  await loadOrganigrama();
  await printDiagram();
  diagram.appendTo("#element");
}
async function loadOrganigrama() {
  let datos = await {
    op: "getDetalleOrganigrama",
    idOrganigramas: Organigrama,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    // console.log(respuesta); // Comentado - array de organigrama
    if (respuesta.length > 0) {
      respuesta.forEach((d) => {
        if (d.idDetalleOrganigramaPadre == 0) {
          datosOrg.push({
            id: `'${d.idDetalleOrganigrama}'`,
            name: `${d.Nombre}`,
            role: `${d.Puesto}`,
            offsetY: Number(d.CoordenadaY),
            offsetX: Number(d.CoordenadaX),
            imageUrl: `${d.Imagen}`,
            Width: Number(d.Ancho),
            Height: Number(d.Altura),
            color: "#71AF17",
            // constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select
          });
        } else {
          datosOrg.push({
            id: `'${d.idDetalleOrganigrama}'`,
            name: `${d.Nombre}`,
            role: `${d.Puesto}`,
            offsetY: Number(d.CoordenadaY),
            offsetX: Number(d.CoordenadaX),
            imageUrl: `${d.Imagen}`,
            manager: `'${d.idDetalleOrganigramaPadre}'`,
            Width: Number(d.Ancho),
            Height: Number(d.Altura),
            color: "red",
            // constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select
          });
        }
      });
    }
  }
}

let diagram;
let items;
function printDiagram() {
  items = new ej.data.DataManager(datosOrg);

  diagram = new ej.diagrams.Diagram({
    width: "100%",
    height: "600px",
    dataSourceSettings: {
      // set the unique field from data source
      id: "id",
      // set the field which is used to identify the reporting person
      parentId: "manager",
      // define the employee data
      dataManager: items,
      doBinding: function (node, data) {
        // You will get the employee information in data argument and bind that value directly to node's built-in properties.
        node.annotations = [{ content: "" }];
        node.style = { fill: data.color };
      },
    },
    getNodeDefaults: nodeDefaults,
    getConnectorDefaults: connectorDefaults,
    setNodeTemplate: setNodeTemplate,
    positionChange: positionChange,
    sizeChange: sizeChange,
    doubleClick: clickElement,
    // hide the gridlines in the diagram
  });
}

function clickElement(args) {
  if (args.name == "doubleClick") {
    let det = args.source.data.id;
    let detFormat = det.replace("'", "");
    let detformatF = btoa(Number(detFormat.replace("'", "")));
    Swal.fire({
      title: "¿Qué acción deseas realizar?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#ffc407",
      denyButtonColor: "#d33",
      confirmButtonText: "Editar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        opcionesSelectedEditar(detformatF);
      } else if (result.isDenied) {
        opcionesSelectedEliminar(detformatF);
      }
    });
  }
}

async function sizeChange(args) {
  if (args.state === "Completed") {
    let x = args.newValue.offsetX;
    let y = args.newValue.offsetY;
    let height = args.newValue.height;
    let width = args.newValue.width;
    let det = args.source.nodes[0].data.id;
    let detFormat = det.replace("'", "");
    let detformatF = btoa(Number(detFormat.replace("'", "")));

    await sizeChangeNodeOrganigrama(y, x, width, height, detformatF);
  }
}

async function sizeChangeNodeOrganigrama(y, x, w, a, id) {
  let datos = {
    op: "sizeChangeNodeOrganigrama",
    y: y,
    x: x,
    w: w,
    a: a,
    do: id,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Organigrama, datos, 1);
  if (ajaxResponse !== undefined) {
    // await loadOrganigrama();
    // await printDiagram();
    // diagram.appendTo('#element');
    // diagram.refresh();
  }
}

async function positionChange(args) {
  if (args.state === "Completed") {
    let x = args.newValue.offsetX;
    let y = args.newValue.offsetY;
    let det;
    let valida = args.source.data?.id;
    if (valida !== undefined) {
      det = args.source.data.id;
    } else {
      det = args.source.nodes[0].data.id;
    }
    let detFormat = det.replace("'", "");
    let detformatF = btoa(Number(detFormat.replace("'", "")));
    await changePositionNodeOrganigrama(y, x, detformatF);
  }
}

async function changePositionNodeOrganigrama(y, x, id) {
  let datos = {
    op: "changePositionNodeOrganigrama",
    y: y,
    x: x,
    do: id,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Organigrama, datos, 1);
  if (ajaxResponse !== undefined) {
    // await loadOrganigrama();
    // await printDiagram();
    // diagram.refresh();
  }
}
function nodeDefaults(node) {
  node.annotations[0].style.color = "white";
  node.offsetX = node.data.offsetX;
  node.offsetY = node.data.offsetY;
  node.width = node.data.Width;
  node.height = node.data.Height;
  return node;
}

function connectorDefaults(connector) {
  connector.type = "Orthogonal";
  connector.targetDecorator = { shape: "None" };
  return connector;
}
//Funtion to add the Template of the Node.
function setNodeTemplate(obj, diagram) {
  // create the stack panel
  var content = new ej.diagrams.StackPanel();
  content.id = obj.id + "_outerstack";
  content.orientation = "Horizontal";
  content.style.strokeColor = "red";
  content.padding = { left: 10, right: 10, top: 20, bottom: 5 };

  // create the image element to map the image data from the data source
  var image = new ej.diagrams.ImageElement();
  image.id = obj.id + "_pic";
  image.width = 50;
  image.height = 50;
  image.style.strokeColor = "none";
  image.source = obj.data.imageUrl;

  // create the stack panel to append the text elements.
  var innerStack = new ej.diagrams.StackPanel();
  innerStack.style.strokeColor = "none";
  innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
  innerStack.id = obj.id + "_innerstack";

  // create the text element to map the Name data from the data source
  var text = new ej.diagrams.TextElement();
  text.style.bold = true;
  text.id = obj.id + "_name";
  text.content = obj.data.name;

  // create the text element to map the designation data from the data source
  var desigText = new ej.diagrams.TextElement();
  desigText.id = obj.id + "_desig";
  desigText.content = obj.data.role;

  // append the text elements
  innerStack.children = [text, desigText];

  // append the image and inner stack elements
  content.children = [image, innerStack];
  return content;
}

$("#slctTipoPrincipal").change(async function () {
  let tipoEmp = await Number($("#slctTipoPrincipal").val());
  if (tipoEmp == 1) {
    $("#divPuesto").fadeIn();
    $("#divDivicion").fadeIn();
    $("#divSucursal").fadeIn();
    $("#divEmpleado").fadeIn();
    $("#divNivel").fadeIn();
    $("#divEmpleadoPadre").fadeOut();
    $("#divOtros").fadeOut();
    $("#txtOtros").val("");
  } else if (tipoEmp == 2) {
    $("#divPuesto").fadeIn();
    $("#divDivicion").fadeIn();
    $("#divSucursal").fadeIn();
    $("#divEmpleado").fadeIn();
    $("#divNivel").fadeIn();
    $("#divEmpleadoPadre").fadeIn();
    $("#divOtros").fadeOut();
    $("#txtOtros").val("");
  } else if (tipoEmp == 3) {
    $("#divPuesto").fadeOut();
    $("#divDivicion").fadeOut();
    $("#divSucursal").fadeOut();
    $("#divEmpleado").fadeOut();
    $("#divNivel").fadeOut();
    $("#divEmpleadoPadre").fadeIn();
    $("#slctEmpleadoPrincipal").val("");
    $("#slctEmpleadoPadrePrincipal").val("");
    $("#divOtros").fadeIn();
  } else if (tipoEmp == 4) {
    $("#divPuesto").fadeOut();
    $("#divDivicion").fadeOut();
    $("#divSucursal").fadeOut();
    $("#divEmpleado").fadeOut();
    $("#divNivel").fadeOut();
    $("#divEmpleadoPadre").fadeIn();
    $("#slctEmpleadoPrincipal").val("");
  }
});

$("#slctTipoModal").change(async function () {
  let tipoEmp = await Number($("#slctTipoModal").val());
  if (tipoEmp == 1) {
    $("#divPuestoModal").fadeIn();
    $("#divDivicionModal").fadeIn();
    $("#divSucursalModal").fadeIn();
    $("#divEmpleadoModal").fadeIn();
    $("#divNivelModal").fadeIn();
    $("#divEmpleadoPadreModal").fadeOut();
    $("#divOtrosModal").fadeOut();
    $("#txtOtrosModal").val("");
  } else if (tipoEmp == 2) {
    $("#divPuestoModal").fadeIn();
    $("#divDivicionModal").fadeIn();
    $("#divSucursalModal").fadeIn();
    $("#divEmpleadoModal").fadeIn();
    $("#divNivelModal").fadeIn();
    $("#divEmpleadoPadreModal").fadeIn();
    $("#divOtrosModal").fadeOut();
    $("#txtOtrosModal").val("");
  } else if (tipoEmp == 3) {
    $("#divPuestoModal").fadeOut();
    $("#divDivicionModal").fadeOut();
    $("#divSucursalModal").fadeOut();
    $("#divEmpleadoModal").fadeOut();
    $("#divNivelModal").fadeOut();
    $("#divEmpleadoPadreModal").fadeIn();
    $("#divOtrosModal").fadeIn();
  }
});

//getPuestosOrg();
getDivicionOrg();
getSucursalDeptoOrg();
getEmpleadosOrg();
getEmpleadosPadreOrganigrama();

//getPuestosOrgEditar();
getDivicionOrgEditar();
getSucursalDeptoOrgEditar();
getEmpleadosOrgEditar();

async function onchangeDivision() {
  getPuestosOrg();
  getEmpleadosOrg();
}

async function onchangeDivisionEditar() {
  getPuestosOrgEditar();
  getEmpleadosOrg();
}

async function getPuestosOrg() {
  $("#slctPuestoPrincipal").html("");
  let IdDivision = $("#slcDivicionPrincipal").val();
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
    $("#slctPuestoPrincipal").append(`
        <option value="" selected > Listado de Puestos</option>
    `);
    respuesta.forEach((registro) => {
      $("#slctPuestoPrincipal").append(`
        <option value="${registro.IdPuesto}">${registro.Puesto}</option>
    `);
    });
  }
}

async function getDivicionOrg() {
  const datos = {
    op: "getDivicionOrg",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    $("#slcDivicionPrincipal").append(`
        <option value="" selected > Listado de Divisiones</option>
        `);
    respuesta.forEach((registro) => {
      $("#slcDivicionPrincipal").append(`
            <option value="${registro.IdDivision}">${registro.Division}</option>
        `);
    });
  }
}

async function getSucursalDeptoOrg() {
  const datos = {
    op: "getSucursalDeptoOrg",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    $("#slctSucursalPrincipal").append(`
        <option value="" selected > Listado de Sucursales / Departamentos</option>
        `);
    respuesta.forEach((registro) => {
      $("#slctSucursalPrincipal").append(`
            <option value="${registro.IdSucursal}">${registro.Sucursal}</option>
        `);
    });
  }
}

async function getEmpleadosOrg() {
  $("#slctEmpleadoPrincipal").html("");
  let IdDivision = await $("#slcDivicionPrincipal").val();
  let IdSucursal = await $("#slctSucursalPrincipal").val();
  let IdPuesto = await $("#slctPuestoPrincipal").val();
  let Nivel = await $("#slctNivelPrincipal").val();
  let datos = await {
    op: "getEmpleadosOrg",
    IdDivision: IdDivision,
    IdSucursal: IdSucursal,
    IdPuesto: IdPuesto,
    Nivel: Nivel,
    Organigrama: Organigrama,
  };
  respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#slctEmpleadoPrincipal").append(`
            <option value="" selected disabled> Listado de Empleados</option>
        `);
    respuesta.forEach((empleado) => {
      $("#slctEmpleadoPrincipal").append(`
            <option value="${empleado.NoEmpleado}">${empleado.Nombre}</option>
          `);
    });
  }
}

async function getEmpleadosPadreOrganigrama() {
  $("#slctEmpleadoPadrePrincipal").html("");
  let datos = await {
    op: "getEmpleadosPadreOrganigrama",
    idOrganigramas: Organigrama,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#slctEmpleadoPadrePrincipal").append(`
            <option value="" selected>Listado Jefes Disponibles</option>
        `);
    respuesta.forEach((empleado) => {
      $("#slctEmpleadoPadrePrincipal").append(`
            <option value="${empleado.idDetalleOrganigrama}">${empleado.Nombre}</option>
        `);
    });
  }
}

async function addEmpleadoOrganigrama() {
  let idOrganigramas = await Organigrama;
  let idDetalleOrganigramaPadre = await $("#slctEmpleadoPadrePrincipal").val();
  let NoEmpleadoHijo = await $("#slctEmpleadoPrincipal").val();
  let Otros = $("#txtOtros").val();
  let Tipo = await $("#slctTipoPrincipal").val();
  // let NivelP = await $("#slctNivelP").val();
  // if (NivelP == "") {
  //   toastr.info("Es obligatorio seleccionar un nivel a registrar.");
  // } else
  // {
  let datos = await {
    op: "addEmpleadoOrganigrama",
    idOrganigramas: idOrganigramas,
    idDetalleOrganigramaPadre: idDetalleOrganigramaPadre,
    NoEmpleadoHijo: NoEmpleadoHijo,
    Tipo: Tipo,
    Otros: Otros,
    // Nivel: NivelP
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      // toastr.success("Empleado agregado al organigrama");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Empleado agregado al organigrama.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      // limiparYCargarDatos();
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      // toastr.info(respuesta);
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${respuesta}</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
  // }
}
function limiparYCargarDatos() {
  $("#slctEmpleadoPadrePrincipal").val("");
  $("#slctEmpleadoPrincipal").val("");
  $("#slctNivelPrincipal").val("");
  $("#slctPuestoPrincipal").val("");
  $("#slcDivicionPrincipal").val("");
  $("#slctSucursalPrincipal").val("");
  $("#txtOtros").val("");
  $("#slctNivelP").val("");

  $("#slctEmpleadoPadreModal").val("");
  $("#slctEmpleadoModal").val("");
  $("#slctNivelModal").val("");
  $("#slctPuestoModal").val("");
  $("#slcDivicionModal").val("");
  $("#txtOtrosModal").val("");
  $("#slctTipoModal").val("");
  $("#slctNivelUpdate").val("");
  $("#idElementoPorEditar").val("");
  getEmpleadosOrg();
  getEmpleadosPadreOrganigrama();
  loadOrganigrama();
}
$("#RegistraPrin").click(function () {
  addEmpleadoOrganigrama();
});

async function opcionesSelectedEliminar(val) {
  let noB64 = atob(val);
  deleteElementoOrganigrama(noB64);
}

async function opcionesSelectedEditar(val) {
  let noB64 = atob(val);
  await getEmpleadosPadreOrganigramaEditar(noB64);
  await getDetalleElementoPorEditar(noB64);
}

async function getDetalleElementoPorEditar(val) {
  $("#idElementoPorEditar").val(val);
  let datos = await {
    op: "getDetalleElementoPorEditar",
    registro: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    respuesta.forEach((registro) => {
      if (registro.Tipo === "PRINCIPAL") {
        $("#slctTipoModal").val("1");
        $("#slctTipoModal option:eq(2)").attr("disabled", true);
        $("#slctTipoModal option:eq(3)").attr("disabled", true);
        $("#divPuestoModal").fadeIn();
        $("#divDivicionModal").fadeIn();
        $("#divSucursalModal").fadeIn();
        $("#divEmpleadoModal").fadeIn();
        $("#divNivelModal").fadeIn();
        $("#divEmpleadoPadreModal").fadeOut();
        $("#divOtrosModal").fadeOut();
        $("#txtOtrosModal").val("");
        $("#slctEmpleadoModal").val(`${registro.NoEmpleadoHijo}`);
      } else if (registro.Tipo === "EMPLEADO") {
        $("#slctTipoModal").val("2");
        $("#slctTipoModal option:eq(2)").attr("disabled", false);
        $("#slctTipoModal option:eq(3)").attr("disabled", false);
        $("#divPuestoModal").fadeIn();
        $("#divDivicionModal").fadeIn();
        $("#divSucursalModal").fadeIn();
        $("#divEmpleadoModal").fadeIn();
        $("#divNivelModal").fadeIn();
        $("#divEmpleadoPadreModal").fadeIn();
        $("#divOtrosModal").fadeOut();
        $("#txtOtrosModal").val("");
        $("#slctEmpleadoModal").val(registro.NoEmpleadoHijo);
        $("#slctEmpleadoPadreModal").val(registro.idDetalleOrganigramaPadre);
      } else if (registro.Tipo === "OTROS") {
        $("#slctTipoModal").val("3");
        $("#slctTipoModal option:eq(1)").attr("disabled", true);
        $("#slctTipoModal option:eq(2)").attr("disabled", false);
        $("#slctTipoModal option:eq(3)").attr("disabled", false);
        $("#divPuestoModal").fadeOut();
        $("#divDivicionModal").fadeOut();
        $("#divSucursalModal").fadeOut();
        $("#divEmpleadoModal").fadeOut();
        $("#divNivelModal").fadeOut();
        $("#divEmpleadoPadreModal").fadeIn();
        $("#divOtrosModal").fadeIn();
        $("#txtOtrosModal").val(registro.Otros);
        $("#slctEmpleadoPadreModal").val(registro.idDetalleOrganigramaPadre);
      }
    });
    // $("#slctNivelUpdate").val(respuesta[0]["NivelSelected"]);
    // $(".lvlSelectedUpdate").select2();
    // $('.emPadreUpdate').select2();
    // $('.empleadosUpdate').select2();
    // $("#modeallEditarElemento").modal('open');
    let modalEditar = new bootstrap.Modal(
      document.getElementById("modeallEditarElemento")
    );
    modalEditar.show();
  }
}
async function deleteElementoOrganigrama(val) {
  let datos = await {
    op: "deleteElementoOrganigrama",
    idDetalleOrganigrama: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      // toastr.success("Elemento eliminado con exito");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Elemento eliminado con exito.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      // toastr.info(respuesta);
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${respuesta}</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
}

async function getPuestosOrgEditar() {
  $("#slctPuestoModal").html("");
  let IdDivision = $("#slcDivicionModal").val();
  const datos = {
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
    $("#slctPuestoModal").append(`
          <option value="" selected > Listado de Puestos</option>
      `);
    respuesta.forEach((registro) => {
      $("#slctPuestoModal").append(`
          <option value="${registro.IdPuesto}">${registro.Puesto}</option>
      `);
    });
  }
}

async function getDivicionOrgEditar() {
  const datos = {
    op: "getDivicionOrg",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    $("#slcDivicionModal").append(`
          <option value="" selected > Listado de Divisiones</option>
          `);
    respuesta.forEach((registro) => {
      $("#slcDivicionModal").append(`
              <option value="${registro.IdDivision}">${registro.Division}</option>
          `);
    });
  }
}

async function getSucursalDeptoOrgEditar() {
  const datos = {
    op: "getSucursalDeptoOrg",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (e) {
    console.log(e);
  } finally {
    $("#slctSucursalModal").append(`
          <option value="" selected > Listado de Sucursales / Departamentos</option>
          `);
    respuesta.forEach((registro) => {
      $("#slctSucursalModal").append(`
              <option value="${registro.IdSucursal}">${registro.Sucursal}</option>
          `);
    });
  }
}

async function getEmpleadosOrgEditar() {
  $("#slctEmpleadoModal").html("");
  let IdDivision = await $("#slcDivicionModal").val();
  let IdSucursal = await $("#slctSucursalModal").val();
  let IdPuesto = await $("#slctPuestoModal").val();
  let Nivel = await $("#slctNivelModal").val();
  let datos = await {
    op: "getEmpleadosOrg",
    IdDivision: IdDivision,
    IdSucursal: IdSucursal,
    IdPuesto: IdPuesto,
    Nivel: Nivel,
  };
  respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#slctEmpleadoModal").append(`
              <option value="" selected disabled> Listado de Empleados</option>
          `);
    respuesta.forEach((empleado) => {
      $("#slctEmpleadoModal").append(`
              <option value="${empleado.NoEmpleado}">${empleado.Nombre}</option>
            `);
    });
  }
}

async function getEmpleadosPadreOrganigramaEditar(val) {
  $("#slctEmpleadoPadreModal").html("");
  let datos = await {
    op: "getEmpleadosSelectedPadreOrganigrama",
    idOrganigramas: Organigrama,
    idDetalleOrganigrama: val,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    $("#slctEmpleadoPadreModal").append(`
              <option value="" selected>Listado Jefes Disponibles</option>
          `);
    respuesta.forEach((empleado) => {
      $("#slctEmpleadoPadreModal").append(`
              <option value="${empleado.idDetalleOrganigrama}">${empleado.Nombre}</option>
          `);
    });
  }
}

async function EditarEmpleadoOrganigrama() {
  let idDetalleOrganigramaPadre = await $("#slctEmpleadoPadreModal").val();
  let NoEmpleadoHijo = await $("#slctEmpleadoModal").val();
  let Otros = await $("#txtOtrosModal").val();
  let Tipo = await $("#slctTipoModal").val();
  let idElementoPorEditar = await $("#idElementoPorEditar").val();
  // let Nivel = await $("#slctNivelUpdate").val();
  // if (Nivel == "") {
  //   toastr.info("Es obligatorio seleccionar un nivel a registrar.");
  // }
  let datos = await {
    op: "EditarElementoOrganigrama",
    idDetalleOrganigramaPadre: idDetalleOrganigramaPadre,
    NoEmpleadoHijo: NoEmpleadoHijo,
    Tipo: Tipo,
    Otros: Otros,
    idElementoPorEditar: idElementoPorEditar,
    Organigrama: Organigrama,
    // Nivel:Nivel
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Organigramas/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      // toastr.success("Organigrama actualizado con éxito.");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Organigrama actualizado con éxito.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
      setTimeout(() => {
        location.reload();
      }, 1500);
      // $("#modeallEditarElemento").modal('close');
      let modalEditar = bootstrap.Modal.getInstance(
        document.getElementById("modeallEditarElemento")
      );
      modalEditar.hide();
    } else {
      // toastr.info(respuesta);
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">${respuesta}</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
    }
  }
}

/*       async function editarElementoOrganigrama () {

      }  */
