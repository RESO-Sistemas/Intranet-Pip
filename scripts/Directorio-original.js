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
                                    <div class="col s12 l12">
                                        ${Registros.Tipo}
                                    </div>
                                </div></th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>PUESTO</th>
                                <th>CORREO</th>
                                <th>TELEFONO</th>
                                <th>MARCACION CORTA</th>
                            </tr>
                        </thead>
                        <tbody> `
                        ContenidoDirectorio.Detalle.filter(Detalle => {
                            if (Detalle.idDirectoriosCorreosTelefonos == Registros.idDirectoriosCorreosTelefonos) {
                                ContenidoDirEmailTel += `
                                    <tr>
                                        <td>${Detalle.Nombre}</td>
                                        <td>${Detalle.Puesto}</td>
                                        <td>${Detalle.Email}</td>
                                        <td>${Detalle.Movil}</td>
                                        <td>${Detalle.MarcacionCorta}</td>
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

async function loadDirectorioExtensiones () {
    const Directorio = await getDirectorioExtensiones();
    console.log(Directorio);

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
                                    <div class="col s12 l12">
                                        ${Registros.Tipo}
                                    </div>
                                </div></th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>EXTENSION</th>
                            </tr>
                        </thead>
                        <tbody> `
                        ContenidoDirectorio.Detalle.filter(Detalle => {
                            if (Detalle.idDirectorioExtensiones == Registros.idDirectorioExtensiones) {
                                ContenidoDirectorioHTML += `
                                    <tr>
                                        <td>${Detalle.Nombre}</td>
                                        <td>${Detalle.Extension}</td>
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



let tableDirectorioSucursal = $('#tableDirectorioSucursal').dataTable({
    "language": {
      "lengthMenu": "MOSTRAR _MENU_ REGISTROS POR PÁGINA",
      "zeroRecords": "NO HAY REGISTROS POR MOSTRAR",
      "info": "PÁGINA _PAGE_ DE _PAGES_",
      "infoEmpty": "NO HAY DATOS PARA MOSTRAR",
      "infoFiltered": "",
      "search": "BUSCAR"
    },
    "columnDefs": [{
      "className": "dt-center", "targets": "_all"
    }],
    "order": [],
    "bSort": false,
    "bPaginate":false,
    "bFilter": false,
    "bInfo":false,
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
                    UnicosV.Direccion,
                    UnicosV.Telefono,
                    UnicosV.NumRed,
                    ContenidoEmpleados,
                    ContenidoPuestos,
                    UnicosV.Correo,
                    UnicosV.FechaApertura,
                    UnicosV.años_transcurridos,
                    UnicosV.MarcacionCorta
                ]);
            });
          },
          "complete" : function(){
              // $.unblockUI();
            }
        }
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
