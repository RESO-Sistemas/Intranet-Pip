$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});
getTiposExtensionesDirectorioExtensiones();
loadDirecorioEmailTel();
loadDirectorioExtensiones();
async function loadDirecorioEmailTel () {
    const DirEmailTel = await getDirecorioEmailTel();

    let ContenidoDirEmailTel = "";
    DirEmailTel.forEach(ContenidoDirectorio => {
        let ArrayRegistrosDirectorioTipo = [];
        ContenidoDirectorio.Tipos.map(Registros =>{
            ContenidoDirEmailTel += `
                <div class="table-responsive">
                    <table id="${Registros.idDirectoriosCorreosTelefonos}" class="table striped m-b-10 display centered">
                        <thead>
                            <tr>
                                <th colspan="12" style="background: rgb(255,0,0);
                                background: linear-gradient(90deg, rgba(255,0,0,0.5018382352941176) 0%, rgba(196,0,0,0.5158438375350141) 30%); height:5vh !important; color:white"><div class="row">
                                    <div class="col s11 l11">
                                        ${Registros.Tipo}
                                    </div>
                                    <div class="col s1 l1" style="text-align:right">
                                        <button type="button" class="btnAddDirectorioTel" style="width:80%;height:90%;" onclick="openModalAddEmpCorreosTelefonos(${Registros.idDirectoriosCorreosTelefonos},'${Registros.Tipo}')"><i class="fal fa-user-plus"></i></button>
                                    </div>
                                </div></th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>PUESTO</th>
                                <th>CORREO</th>
                                <th>TELEFONO</th>
                                <th>MARCACION CORTA</th>
                                <th>ACTUALIZAR</th>
                                <th>ELIMINAR</th>
                            </tr>
                        </thead>
                        <tbody> `
                        ContenidoDirectorio.Detalle.filter(Detalle => {
                            if (Detalle.idDirectoriosCorreosTelefonos == Registros.idDirectoriosCorreosTelefonos) {
                                ContenidoDirEmailTel += `
                                    <tr>
                                        <td>${Detalle.Nombre}</td>
                                        <td>${Detalle.Puesto}</td>
                                        <td><input type="email" value="${Detalle.Email}" id="emailDir${Detalle.idDetalleDirectoriosCorreosTelefonos}" style="text-align:center"></input></td>
                                        <td><input type="text" value="${Detalle.Movil}" id="movilDir${Detalle.idDetalleDirectoriosCorreosTelefonos}" style="text-align:center" onkeypress="return onlynumber(event)" maxlength="10"></input></td>
                                        <td><input type="text" value="${Detalle.MarcacionCorta}" id="MCortaDir${Detalle.idDetalleDirectoriosCorreosTelefonos}" style="text-align:center" onkeypress="return onlynumber(event)" maxlength="4"></input></td>
                                        <td><button class="button-17" role="button" onclick="updateRegistroDirectorioCorreosTelefonos(${Detalle.idDetalleDirectoriosCorreosTelefonos})"><i class="fa-thin fa-pen-to-square"></i></button></td>
                                        <td><button class="button-17" role="button" onclick="deleteEmpleadosDirectorioCorreosTelefonos(${Detalle.idDetalleDirectoriosCorreosTelefonos})"><i class="fal fa-user-times"></i></button></td>
                                    </tr>
                                `;
                            }
                        });
                        ContenidoDirEmailTel += `    
                        </tbody>      
                     </table>
                </div>
            `;
        });
    });

    $("#contenidoDirectorioEmailTelefonos").html(ContenidoDirEmailTel);
}




async function updateRegistroDirectorioCorreosTelefonos (val) {
    alertify.confirm('Confirmación de acción.', '¿Desea confirmar los datos ingresados?', async function(){ 
        let Email = await $("#emailDir"+val).val();
        let Telefono = await $("#movilDir"+val).val();
        let MCorta = await $("#MCortaDir"+val).val();
        let datos = await {
            op: "updateRegistroDirectorioCorreosTelefonos",
            Email: Email,
            Telefono: Telefono,
            Registro : val,
            MCorta: MCorta
        };
        let respuesta = "";
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == "1") {
                alertify.success('Actualizado correctamente.');
                loadDirecorioEmailTel();
            } else {
                alertify.error(respuesta);
            }
        }
    }, function(){ 
        alertify.error('Cancelado');
    });
}

async function getDirecorioEmailTel () {
    let datos = await {
        op: "getDirectorioCorreosTelefonos"
    }
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

async function openModalAddEmpCorreosTelefonos (idTipo,Nombre) {
    $("#NameDirectorio").html(`Directorio: ${Nombre}`);
    $("#IdTipoEmTel").val(idTipo);
    $("#slctDivisionEm").val("");
    $("#slctPuestoEm").val("");
    $("#slctSucursalEm").val("");
    getPuestos();
    getDivisiones();
    getSucursales();
    getListadoPersonal();
    $("#modalAddEmpleadosDirectorioEmTel").modal('open');
}




function getListadoPersonal(){
  let puesto = $("#slctPuestoEm").val();
  let sucursal = $("#slctSucursalEm").val();
  let division = $("#slctDivisionEm").val();
  let TipoDirectorio = Number($("#IdTipoEmTel").val());
  datasend = {
    op: "getPersonalDirectorioEmailTel",
    puesto : puesto,
    sucursal : sucursal,
    division: division,
    idDirectoriosCorreosTelefonos: TipoDirectorio
  }
  let tableEmpleadosEmTel = $('#tableEmpleadosEmTel').dataTable({
    "destroy":true,
    "ajax":{
      "type":"POST",
      "url":"Backend/Empleados/App.php",
      "data":datasend,
      "success" : function(response){
        tableEmpleadosEmTel.fnClearTable();
        for (var i = 0; i < response.length; i++) {
            tableEmpleadosEmTel.fnAddData([
                response[i]["NoEmpleado"],
                response[i]["Nombre"],
                `<div class="row">
                    <div class="col s12 l6 offset-l3">
                      <button type="button" class="btnAddDirectorioTel" onclick="SeleccionarEmpleadoDirEmTel(${response[i]["NoEmpleado"]},'${response[i]["Nombre"]}')"><i class="fal fa-user-plus"></i></button>
                    </div>
                </div>`
          ]);
        }
      },
      "complete" : function(){
          // $.unblockUI();
        }
    }
  });
} 

async function SeleccionarEmpleadoDirEmTel (id,nameEmpleado) {
    $("#EmpleadoSelectedEmTel").val(id);
    $("#EmpleadoSeleccionadoEmTel").html(nameEmpleado);
    $("#txtCorreoEmTel").val("");
    $("#txtTelEmTel").val("");
    $("#txtMCortaEmTel").val("");
}

async function addEmpleadosDirectorioCorreosTelefonos() {
    alertify.confirm('Confirmación de acción.', '¿Desea confirmar los datos ingresados?', 
    async function(){ 
        let Em = await $("#EmpleadoSelectedEmTel").val();
        let Directorio = await  Number($("#IdTipoEmTel").val());
        let Email = await $("#txtCorreoEmTel").val();
        let Telefono = await $("#txtTelEmTel").val();
        let MarcacionCorta = await $("#txtMCortaEmTel").val();
        let datos = {
            op: "addEmpleadosDirectorioCorreosTelefonos",
            idDirectoriosCorreosTelefonos: Directorio,
            NoEmpleado: Em,
            Email: Email,
            Telefono: Telefono,
            MarcacionCorta: MarcacionCorta
        }
        let respuesta = "";
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == 1) {
                toastr.success("Agregado");
                loadDirecorioEmailTel();
                $("#EmpleadoSelectedEmTel").val("");
                $("#EmpleadoSeleccionadoEmTel").html("");
                $("#txtCorreoEmTel").val("");
                $("#txtTelEmTel").val("");
                $("#txtMCortaEmTel").val("");
                getListadoPersonal();
            }else {
                toastr.info(respuesta);
            }
        }
    }, async function(){ 
        alertify.error('Cancelado')
    });
}

function getPuestos(){
  $.ajax({
    type: "post",
    url: "Backend/Puestos/App.php",
    data: "op=getPuestos",
    success:function(response){
        $("#slctPuestoEm").html("");
        $("#slctPuestoEm").append(`
            <option value="">Puestos</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctPuestoEm").append(`
          <option value='${response[i]["IdPuesto"]}'>${response[i]["Puesto"]}</option>
          `);
      }
    }, error:function(e){
      alert(e.responseText);
    }
  });
}
function getDivisiones(){
    $("#slctDivision").html("");
  $.ajax({
    type: "post",
    url: "Backend/Divisiones/App.php",
    data: "op=getDivisiones",
    success:function(response){
        $("#slctDivisionEm").html("");
        $("#slctDivisionEm").append(`
            <option value="">Divisiones</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctDivisionEm").append(`
          <option value="${response[i]['IdDivision']}">${response[i]['Division']}</option>
          `);
      }
    }, error:function(e){
      alert(e.responseText);
    }
  });
}
function getSucursales(){
  $.ajax({
    type: "post",
    url: "Backend/Sucursal/App.php",
    data: "op=getSucursales",
    success:function(response){
        $("#slctSucursalEm").html("");
        $("#slctSucursalEm").append(`
            <option value="">Sucursales</option>
        `);
      response = JSON.parse(response.trim());
      for (var i = 0; i < response.length; i++) {
        $("#slctSucursalEm").append(`
          <option value="${response[i]['IdSucursal']}">${response[i]['Sucursal']}</option>
          `);
      }
    }, error:function(e){
      alert(e.responseText);
    }
  });
}

async function deleteEmpleadosDirectorioCorreosTelefonos (val) {
    alertify.confirm("¿Desea eliminar al Empleado del Directorio?",
    async function(){
        let datos = await {
            op: "deleteEmpleadosDirectorioCorreosTelefonos",
            idDetalleDirectoriosCorreosTelefonos: val
        }
        let respuesta = "";
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == 1) {
                toastr.success("Empleado Eliminado");
                loadDirecorioEmailTel();
            } else {
                toastr.info("ERROR");
            }
        }
    },
    async function(){
      alertify.error('Cancel');
    }).setHeader('<h6> Confirmación </h6> ');
}


async function getTiposExtensionesDirectorioExtensiones () {
    let datos = await {
        op: "getTiposExtensionesDirectorioExtensiones"
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
        console.log(respuesta);
        respuesta.forEach(tipos => {
            $("#tiposExtension").append(`
                <option value="${tipos.idDirectorioExtensiones}">${tipos.Tipo}</option>
            `);
        });
    }
}

async function getDirectorioExtensiones () {
    let TiposExtSelected = $("#tiposExtension").val();
    let datos = await {
        op: "getDirectorioExtensiones",
        TiposExtSelected:TiposExtSelected
    }
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


async function openModalAddEmpExtensiones (idTipo,Nombre) {
    getPuestosExtensiones();
    getDivisionesExtensiones();
    getDivisionesExtensiones();
    $("#NameDirectorioExtension").html(`Directorio : ${Nombre}`);
    $("#IdTipoExtensiones").val(idTipo);
    $("#slctPuestoEmExt").val("");
    $("#slctDivisionEmExt").val("");
    $("#slctSucursalEmExt").val("");
    $("#txtExtension").val("");
    $("#EmpleadoSeleccionadoDirExt").html("");
    $("#EmpleadoSelectedExtension").val("");
    $("#modalAddEmpleadosDirectorioExtensiones").modal('open');
    getListadoPersonalExtensiones();
}


function getListadoPersonalExtensiones(){
    let puesto = $("#slctPuestoEmExt").val();
    let sucursal = $("#slctSucursalEmExt").val();
    let division = $("#slctDivisionEmExt").val();
    let TipoDirectorio = Number($("#IdTipoEmTel").val());
    datasend = {
      op: "getPersonalDirectorioExtensiones",
      puesto : puesto,
      sucursal : sucursal,
      division: division,
      idDirectorioExtensiones: TipoDirectorio
    }
    let tableEmpleadosExtensiones = $('#tableEmpleadosExtensiones').dataTable({
      "destroy":true,
      "ajax":{
        "type":"POST",
        "url":"Backend/Empleados/App.php",
        "data":datasend,
        "success" : function(response){
            tableEmpleadosExtensiones.fnClearTable();
          for (var i = 0; i < response.length; i++) {
            tableEmpleadosExtensiones.fnAddData([
                  response[i]["NoEmpleado"],
                  response[i]["Nombre"],
                  `<div class="row">
                      <div class="col s12 l6 offset-l3">
                        <button type="button" class="btnAddDirectorioTel" onclick="SeleccionarEmpleadoExt(${response[i]["NoEmpleado"]},'${response[i]["Nombre"]}')"><i class="fal fa-hand-pointer"></i></button>
                      </div>
                  </div>`
            ]);
          }
        },
        "complete" : function(){
            // $.unblockUI();
          }
      }
    });
  } 

async function addEmpleadoDirectorioExtensiones () {
    let idDirectorioExtensiones = await Number($("#IdTipoExtensiones").val());
    let NoEmpleado = await $("#EmpleadoSelectedExtension").val();
    let Extension = await $("#txtExtension").val();
    if (NoEmpleado == "") {
        toastr.info("Seleccione un empleado.");
        return false;
    }else if (Extension == "") {
        toastr.info("Ingrese una extensión.");
        return false;
    }else {
        let datos = await {
            op: "addEmpleadoDirectorioExtensiones",
            idDirectorioExtensiones: idDirectorioExtensiones,
            NoEmpleado: NoEmpleado,
            Extension: Extension
        };  
        respuesta = "";
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == 1) {
                toastr.success("Agregado");
                $("#txtExtension").val("");
                $("#EmpleadoSeleccionadoDirExt").html("");
                $("#EmpleadoSelectedExtension").val("");
                loadDirectorioExtensiones();
                getListadoPersonalExtensiones();
            } else {
                toastr.info(respuesta);
            }
        }
    }
   
}

async function SeleccionarEmpleadoExt (id,nameEmpleado) {
    $("#EmpleadoSelectedExtension").val(id);
    $("#EmpleadoSeleccionadoDirExt").html(nameEmpleado);
    $("#txtExtension").val("");
}

function getPuestosExtensiones(){
    $.ajax({
      type: "post",
      url: "Backend/Puestos/App.php",
      data: "op=getPuestos",
      success:function(response){
        $("#slctPuestoEmExt").html("");
        $("#slctPuestoEmExt").append(`
            <option value="">Puestos</option>
        `);
        response = JSON.parse(response.trim());
        for (var i = 0; i < response.length; i++) {
          $("#slctPuestoEmExt").append(`
            <option value='${response[i]["IdPuesto"]}'>${response[i]["Puesto"]}</option>
            `);
        }
      }, error:function(e){
        alert(e.responseText);
      }
    });
  }
  function getDivisionesExtensiones(){
      $("#slctDivision").html("");
    $.ajax({
      type: "post",
      url: "Backend/Divisiones/App.php",
      data: "op=getDivisiones",
      success:function(response){
        response = JSON.parse(response.trim());
        $("#slctDivisionEmExt").html("");
        $("#slctDivisionEmExt").append(`
            <option value="">Divisiones</option>
        `);
        for (var i = 0; i < response.length; i++) {
          $("#slctDivisionEmExt").append(`
            <option value="${response[i]['IdDivision']}">${response[i]['Division']}</option>
            `);
        }
      }, error:function(e){
        alert(e.responseText);
      }
    });
  }
  function getSucursalesExtensiones(){
    $.ajax({
      type: "post",
      url: "Backend/Sucursal/App.php",
      data: "op=getSucursales",
      success:function(response){
        response = JSON.parse(response.trim());
        $("#slctSucursalEmExt").html("");
        $("#slctSucursalEmExt").append(`
            <option value="">Sucursales</option>
        `);
        for (var i = 0; i < response.length; i++) {
          $("#slctSucursalEmExt").append(`
            <option value="${response[i]['IdSucursal']}">${response[i]['Sucursal']}</option>
            `);
        }
      }, error:function(e){
        alert(e.responseText);
      }
    });
  }
async function loadDirectorioExtensiones () {
    const Directorio = await getDirectorioExtensiones();
    let ContenidoDirectorioHTML = "";
    Directorio.forEach(ContenidoDirectorio => {
        let ArrayRegistrosDirectorioTipo = [];
        ContenidoDirectorio.Tipos.map(Registros =>{
            ContenidoDirectorioHTML += `
                <div class="table-responsive">
                    <table id="${Registros.idDirectorioExtensiones}" class="table striped m-b-10 display centered">
                        <thead>
                            <tr>
                                <th colspan="12" style="background: rgb(255,0,0);
                                background: linear-gradient(90deg, rgba(255,0,0,0.5018382352941176) 0%, rgba(196,0,0,0.5158438375350141) 30%); height:5vh !important; color:white"><div class="row">
                                    <div class="col s11 l11">
                                        ${Registros.Tipo}
                                    </div>
                                    <div class="col s1 l1" style="text-align:right">
                                        <button type="button" class="btnAddDirectorioTel" style="width:80%;height:90%;" onclick="openModalAddEmpExtensiones(${Registros.idDirectorioExtensiones},'${Registros.Tipo}')"><i class="fal fa-user-plus"></i></button>
                                    </div>
                                </div></th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>EXTENSION</th>
                                <th>ELIMINAR</th>
                            </tr>
                        </thead>
                        <tbody> `
                        ContenidoDirectorio.Detalle.filter(Detalle => {
                            if (Detalle.idDirectorioExtensiones == Registros.idDirectorioExtensiones) {
                                ContenidoDirectorioHTML += `
                                    <tr>
                                       
                                        <td>${Detalle.Nombre}</td>
                                        <td>
                                            <div class="row">
                                                <div class="col s12 l4 offset-l4">
                                                    <div class="row">
                                                            <div class="col s8 l8">
                                                                <input value="${Detalle.Extension}" style="text-align: center" onkeypress="return onlynumber(event)" maxlength="4" id="Extension${Detalle.idDetalleDirectorioExtensiones}"></input>
                                                            </div>
                                                            <div class="col s4 l4">
                                                                <button class="button-17" role="button" onclick="updateExtesionEmp(${Detalle.idDetalleDirectorioExtensiones},${Registros.idDirectorioExtensiones})" ><i class="fal fa-undo"></i></button>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><button class="button-17" role="button" onclick="deleteEmpleadosDirectorioExtension(${Detalle.idDetalleDirectorioExtensiones})"><i class="fal fa-user-times"></i></button></td
                                    </tr>
                                `;
                            }
                        });
                        ContenidoDirectorioHTML += `    
                        </tbody>      
                     </table>
                </div>
            `;
        });
    });

    $("#contenidoDirectorioExtensiones").html(ContenidoDirectorioHTML);
}

async function deleteEmpleadosDirectorioExtension (val) {
    alertify.confirm("¿Desea eliminar al Empleado del Directorio?",
    async function(){
        let datos = await {
            op: "deleteEmpleadosDirectorioExtension",
            idDetalleDirectorioExtensiones: val
        }
        let respuesta = "";
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == 1) {
                toastr.success("Empleado Eliminado");
                loadDirectorioExtensiones();
            } else {
                toastr.info("ERROR");
            }
        }
    },
    async function(){
      alertify.error('Cancel');
    }).setHeader('<h6> Confirmación </h6> ');
}

async function updateExtesionEmp (DetalleId,Directorio) {
    let Extension = $("#Extension"+DetalleId).val();
    alertify.confirm("¿Desea actualizar la extensión?",
    async function(){
        let datos = await {
            op: "updateExtensionEmpleado",
            idDetalleDirectorioExtensiones: DetalleId,
            Extension:Extension,
            Directorio:Directorio
        }
        let respuesta = "";
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == 1) {
                toastr.success("Extensión Actualizada.");
                loadDirectorioExtensiones();
            } else {
                toastr.info(respuesta);
            }
        }
    },
    async function(){
      alertify.error('Cancel');
    }).setHeader('<h6> Confirmación </h6> ');
}

$("#btnOpenModalSucursal").click(function (){
    getSucursalesDisponiblesDirectorio();
    $("#txtDireccionSucursal").val("");
    $("#txtTelefono").val("");
    $("#txtNumRed").val("");
    $("#txtCorreo").val("");
    $("#txtMarcacionCorta").val("");
    $("#modalAddSucursalesDirectorio").modal('open');
});




async function getSucursalesDisponiblesDirectorio(){
    $("#slctListadoSucursalesDisp").html("");
    let datos = await {
        op: "getSucursalesDisponiblesDirectorio"
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
        console.log(respuesta);
        $("#slctListadoSucursalesDisp").append(`
            <option value="" selected disabled> Sucursales Disponibles </option>
        `);
        respuesta.forEach(contenido => {
            $("#slctListadoSucursalesDisp").append(`
                  <option value="${contenido.IdSucursal}">${contenido.Sucursal}</option>
            `);
        });
    }
  }

  async function getEmpleadosSucursal (sucursal) {
    $("#slctEmpleadosDisp").html("");
    let datos = await {
        op: "getEmpleadosSucursalSelected",
        IdSucursal: sucursal
    }
    respuesta = [];
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
        respuesta.forEach(contenido => {
            $("#slctEmpleadosDisp").append(`
                <option value="${contenido.NoEmpleado}">${contenido.Nombre}</option>
            `);
        });
    }
  }



  $("#btnAgregaSucursalDirectorio").click(async function () {
    alertify.confirm('Confirmación de acción.', '¿Desea confirmar los datos ingresados?', async function(){ 
        let IdSucursal = await $("#slctListadoSucursalesDisp").val();
        let Direccion = await $("#txtDireccionSucursal").val();
        let Telefono = await $("#txtTelefono").val();
        let Correo = await $("#txtCorreo").val();
        let FechaApertura = await $("#inpFechaApertura").val();
        let MarcacionCorta = await $("#txtMarcacionCorta").val();
        let NumRed = await $("#txtNumRed").val();
        if (IdSucursal == "" || Direccion == "" || Telefono == "" || Correo == "" || FechaApertura == "" || MarcacionCorta == "") {
            toastr.info("Ingrese todos los datos, por favor.");
            return false;
        }
        let datos = await {
            op: "addSucursalesDirectorio",
            IdSucursal: IdSucursal,
            Direccion: Direccion,
            Telefono: Telefono,
            Correo: Correo,
            FechaApertura: FechaApertura,
            MarcacionCorta: MarcacionCorta,
            NumRed:NumRed
        }
        try {
            respuesta = await $.ajax({
                type: "post",
                url: "Backend/Directorios/App.php",
                data: datos,
            });
        } catch (error) {
            console.log(error);
        } finally {
            if (respuesta == "1") {
                alertify.success('Agregado correctamente al directorio.');
                $("#txtDireccionSucursal").val("");
                $("#txtTelefono").val("");
                $("#txtNumRed").val("");
                $("#txtCorreo").val("");
                $("#txtMarcacionCorta").val("");
                getDirectorioSucursal();
                $("#modalAddSucursalesDirectorio").modal('close');
            } else {
                alertify.error(respuesta);
            }
        }
    }, function(){ 
        alertify.error('Cancelado');
        $("#txtDireccionSucursal").val("");
        $("#txtTelefono").val("");
        $("#txtNumRed").val("");
        $("#txtCorreo").val("");
        $("#txtMarcacionCorta").val("");
    });
  });

  getDirectorioSucursal();
  async function getDirectorioSucursal () {
    let datos = await {
        op: "getDirectorioSucursal"
    };
    let tableDirectorioSucursal = await  $('#tableDirectorioSucursal').dataTable({
        "destroy":true,
        "ajax":{
          "type":"POST",
          "url":"Backend/Directorios/App.php",
          "data":datos,
          "success" : function(response){
            tableDirectorioSucursal.fnClearTable();

            let ArrEmpleados = [];
            response.forEach(registrosEmp => {
                let Datos = {
                    "idDirectorioSucursales": registrosEmp.idDirectorioSucursales,
                    "Nombre": registrosEmp.Nombre,
                    "Puesto": registrosEmp.Puesto
                };
                ArrEmpleados.push(Datos);
            });
            const Unicos = removeDuplicates(response, "idDirectorioSucursales");
 
            Unicos.forEach(UnicosV => {
                let ContenidoEmpleados = "";
                let ContenidoPuestos = "";
                ContenidoEmpleados += `
                    <div class="row">
                `; 
                ContenidoPuestos += `
                    <div class="row">
                `;
                ArrEmpleados.map(empleados => {
                    if (UnicosV.idDirectorioSucursales == empleados.idDirectorioSucursales) {
                        ContenidoEmpleados += `
                            <div class="col s12 l12">
                                <h6>${empleados.Nombre}</h6>
                            </div>
                        `;
                        ContenidoPuestos += `
                            <div class="col s12 l12">
                                <h6>${empleados.Puesto}</h6>
                            </div>
                        `;
                    }   
                });
                ContenidoEmpleados += `
                    </div>
                `; 
                ContenidoPuestos += `
                    </div>
                `;

                tableDirectorioSucursal.fnAddData([
                    UnicosV.Sucursal,
                    `<input type="text" id="DirSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.Direccion}" style="width:25vh; text-align:center;"></input>`,
                    `<input type="text" id="TelSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.Telefono}" style="width:15vh"; text-align:center; onkeypress="return onlynumber(event)"></input>`,
                    `<input type="text" id="NumRedSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.NumRed}" style="width:12vh"; text-align:center; onkeypress="return onlynumber(event)"></input>`,
                    ContenidoEmpleados,
                    ContenidoPuestos,
                    `<input type="email" id="CorreoSucur${UnicosV.idDirectorioSucursales}" value="${UnicosV.Correo}" style="width:20vh; text-align:center;"; text-align:center;></input>`,
                    UnicosV.FechaApertura,
                    UnicosV.años_transcurridos,
                    `<input type="text" id="MCorta${UnicosV.idDirectorioSucursales}" value="${UnicosV.MarcacionCorta}" onkeypress="return onlynumber(event)" maxlength="4" style="width:12vh; text-align:center;"></input>`,
                    `<button class="button-17" role="button" onclick="updateRegistroDirectorioSucursal(${UnicosV.idDirectorioSucursales})" ><i class="fal fa-undo"></i></button>`
                ]);
            });
          },
          "complete" : function(){
              // $.unblockUI();
            }
        }
      });
  }

  async function updateRegistroDirectorioSucursal (val) {
    alertify.confirm('Confirmación de acción.', '¿Desea confirmar los datos ingresados?', 
        async function(){ 
            let Direccion = await $("#DirSucur"+val).val();
            let Telefono = await $("#TelSucur"+val).val();
            let NumRed = await $("#NumRedSucur"+val).val();
            let Correo = await $("#CorreoSucur"+val).val();
            let MarcacionCorta = await $("#MCortaDir"+val).val();
            let datos = await {
                op: "updateRegistroDirectorioSucursal",
                Direccion: Direccion,
                Telefono: Telefono,
                NumRed: NumRed,
                Correo: Correo,
                MarcacionCorta: MarcacionCorta,
                idDirectorioSucursales: val
            };
            try {
                respuesta = await $.ajax({
                    type: "post",
                    url: "Backend/Directorios/App.php",
                    data: datos,
                });b
            } catch (error) {
                console.log(error);
            } finally {
                if (respuesta == 1) {
                    toastr.success("Registro Actualizado");
                    getDirectorioSucursal();
                } else {
                    toastr.info(respuesta);
                }
            }        
        }, async function(){ 
            alertify.error('Cancelado')
        });
  }


  function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}