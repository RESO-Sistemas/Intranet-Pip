loadImgEventos();
getPersonalizacion();
getMeses();
let globalMeses = [];
async function getPersonalizacion () {
    getConfigMensajeBienvenida();
}


async function getConfigMensajeBienvenida () {
    let datos = await {
        op: "getConfigMensajeBienvenida"
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
async function getImgEventos () {
  let datos = {
    op: "getImgEventos"
  }
  const respuesta  = await functionAjax(datos,"Configuracion");
}

async function functionAjax (data,carpetaBackend) {
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

async function loadImgEventos () {
    let datos = await {
        op: "getImgEventosAnniversaryBirthday"
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

        respuesta.map(Registros => {
            Registros.Birthday.map(Birthday => {
                nameImgBirthday = Birthday.NameImgBirthday;
            });
        });
        respuesta.map(Registros => {
            Registros.Anniversary.map(Anniversary => {
                nameImgAnniversary = Anniversary.NameImgAnniversary;
            });
        });
        let rutaBirthday = "";
        let rutaAnniversary = "";
        if (nameImgBirthday == "") {
            rutaBirthday = "assets/cumplecursor.png";
        }else {
            rutaBirthday = `Archivos/ImagesBirthday/${nameImgBirthday}`;
        }
        if (nameImgAnniversary == "") {
            rutaAnniversary = "assets/cumplecursor.png";
        } else {
            rutaAnniversary = `Archivos/ImagesAnniversary/${nameImgAnniversary}`;
        }
        $("#imgPreview").attr("src",rutaBirthday);
        $("#imgPreviewAnn").attr("src",rutaAnniversary);
    }
}

$("#btnInsertaImgBirthday").click(function () {
    if(document.getElementById('formInsertaImgBirthday').checkValidity()){
        event.preventDefault();
        let form = $("#formInsertaImgBirthday")[0];
        let data = new FormData(form);
        $.ajax({
        type:"post",
        url: "Backend/Configuracion/App.php",
        data: data,
        processData:false,
        contentType:false,
        cache: false,
        timeout:600000,
        success:function(response){
            console.log(response);
            if (response == "1") {
                toastr.success("Imagen Actualizada");
                setTimeout(function () {
                   location.reload();
                  }, 1000);
            }else{
                toastr.warning("Algo salió mal, Intente de nuevo");
                setTimeout(function () {
                    location.reload();
                   }, 2000);
            }
        },error:function(e){
            alert(e.responseText);
        }
        });
    }else {
        toastr.info("Ingrese una imagen");
    }
});

$("#btnInsertaImgAnni").click(function () {
    if(document.getElementById('fprmInsertaImgAnniversary').checkValidity()){
        event.preventDefault();
        let form = $("#fprmInsertaImgAnniversary")[0];
        let data = new FormData(form);
        $.ajax({
        type:"post",
        url: "Backend/Configuracion/App.php",
        data: data,
        processData:false,
        contentType:false,
        cache: false,
        timeout:600000,
        success:function(response){
            console.log(response);
            if (response == "1") {
                toastr.success("Imagen Actualizada");
                setTimeout(function () {
                    location.reload();
                   }, 1000);
            }else{
                toastr.warning("Algo salió mal, Intente de nuevo");
                setTimeout(function () {
                    location.reload();
                   }, 2000);
            }
        },error:function(e){
            alert(e.responseText);
        }
        });
    }else {
        toastr.info("Ingrese una imagen");
    }
});

function previewImage(event, querySelector){
    //Recuperamos el input que desencadeno la acción
    const input = event.target;

    //Recuperamos la etiqueta img donde cargaremos la imagen
    $imgPreview = document.querySelector(querySelector);
    console.log("prev 1_ ",$imgPreview);

    // Verificamos si existe una imagen seleccionada
    if(!input.files.length) return

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
function previewImageAnny(event, querySelector){
    //Recuperamos el input que desencadeno la acción
    const input = event.target;

    //Recuperamos la etiqueta img donde cargaremos la imagen
    $imgPreview = document.querySelector(querySelector);
    console.log("prev 1_ ",$imgPreview);

    // Verificamos si existe una imagen seleccionada
    if(!input.files.length) return

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

$("#imgPreview").click(function(){
    $("#ContenidoImgBirthday").click();
});

$("#imgPreviewAnn").click(function(){
    $("#ContenidoImgAnniversary").click();
});

$("#btnActualizaMensajeBienvenida").click(async function (){
    let newMensaje = $("#txtMensajeBienvenida").val();
    alertify.confirm('Confirmación de acción.', `Desea cambiar el mensaje de Bienvenida a <b>"${newMensaje}"</b>.`, async function(){
        let datos = await {
            op: "updateMensajeBienvenida",
            MensajeBienvenida: newMensaje
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
                alertify.success("Mensaje Actualizado");
                getConfigMensajeBienvenida();
            } else {
                alertify.error("ERROR!");
            }
        }
    }, async function(){
        alertify.error('Cancelado')
    }).set('labels', {ok:'Aceptar', cancel:'Cancelar'});
});

$("#btnViewDiasFestivos").click(async function (){
  await getListDiasFestivos();
  let header = `Días Festivos.`;
  let div = `divDiasFestivos`;
  await openModalMin(header,div);
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

async function getListDiasFestivos () {
  let datos = await {
    op: "getListDiasFestivos"
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
    respuesta.forEach( registros => {
      DFB64 = btoa(registros.idDiasFestivos);
      tableDiasFestivos.fnAddData([
        registros.Descripcion,
        registros.Dia,
        registros.StatusD,
        `<button class="btnUpdate1 btnUpdateDF" data-diafest="${DFB64}" data-desc="${registros.Descripcion}" data-dia="${registros.Dia}"><i class="fal fa-pencil-alt"></i></button>`,
        `<button class="btnUpdate3 btnUpdateStatus" data-diafest="${DFB64}"><i class="fas fa-power-off"></i></button>`
      ]);
    });
  }
}

$(document).on("click",".btnUpdateStatus", async function(){
  let idSelected = $(this).data("diafest");
  let datos = await {
    op: "updateStatusDiaFestivo",
    idDiasFestivos: idSelected
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
  } finally {
    if (respuesta == "1") {
      await limpiarInp();
      await getListDiasFestivos();
      alertify.success("Status Actualizado");
    }else {
      alertify.warning("ERROR!");
    }
  }
});

$(document).on("click",".btnUpdateDF", async function(){
    let idSelected = $(this).data("diafest");
    let desc = $(this).data("desc");
    let fecha = $(this).data("dia");
    let fechaArr = fecha.split('-')
    await $("#IdDFUpdate").val(idSelected);
     $("#mesSelectedUpdate").val(fechaArr[0]);
    const mesSelected = globalMeses.filter(datos => {
      return datos.idMes == fechaArr[0];
    });
    mesSelected[0].Dias.forEach( dias => {
      $("#diaSelectedUpdate").append(`
        <option value="${dias}">${dias}</option>
      `);
    });
    await $("#txtDescripcionDiaFUpdate").val(desc);
    await $("#diaSelectedUpdate").val(fechaArr[1]);
    await openModalUpdateDiaFestivo(desc);
});

async function openModalUpdateDiaFestivo(desc){
  if (!alertify.MUpdateDiaF) {
		alertify.MUpdateDiaF || alertify.dialog('MUpdateDiaF',function(){
			return {
					main:function(content){
							this.setContent(content);
					},
					build:function(){
							this.setHeader(`Actualizar dia Festivo: ${desc}`);
					},
					setup:function(){
							return {
									focus:{
											element:function(){
													return this.elements.body.querySelector(this.get('selector'));
											},
											select:true
									},
									options:{
											maximizable:false,
											padding:false,
											startMaximized: false,
                      resizable:false,
									}
							};
					},
					settings:{
							selector:undefined
					}
			};
		});
		}
		alertify.MUpdateDiaF ($(`#contenidoUpdateDiaFestivo`)[0]);
}

async function openModalMin(header,div){
	if (!alertify.ModalMIN) {
		alertify.ModalMIN || alertify.dialog('ModalMIN',function(){
			return {
					main:function(content){
							this.setContent(content);
					},
					build:function(){
							this.setHeader(header);
					},
					setup:function(){
							return {
									focus:{
											element:function(){
													return this.elements.body.querySelector(this.get('selector'));
											},
											select:true
									},
									options:{
											maximizable:false,
											padding:false,
											startMaximized: true,
                      resizable:false,
									}
							};
					},
					settings:{
							selector:undefined
					}
			};
		});
		}
		alertify.ModalMIN ($(`#${div}`)[0]);
}

async function getMeses(){
  let datos = await {
    op: "getMeses"
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
    globalMeses = [...respuesta];
    $("#mesSelected").append(`
      <option value="" selected >Listado de Meses</option>
    `);
    globalMeses.forEach( meses => {
      $("#mesSelected").append(`
        <option value="${meses.idMes}">${meses.Mes}</option>
      `);
    })
    $("#mesSelectedUpdate").append(`
      <option value="" selected >Listado de Meses</option>
    `);
    globalMeses.forEach( meses => {
      $("#mesSelectedUpdate").append(`
        <option value="${meses.idMes}">${meses.Mes}</option>
      `);
    })
  }
}

$(document).on("change","#mesSelected",async function(){
  $("#diaSelected").html("");
  let val = $(this).val();
  const mesSelected = globalMeses.filter(datos => {
    return datos.idMes == val;
  });
  mesSelected[0].Dias.forEach( dias => {
    $("#diaSelected").append(`
      <option value="${dias}">${dias}</option>
    `);
  });
});

$(document).on("change","#mesSelectedUpdate",async function(){
  $("#diaSelectedUpdate").html("");
  let val = $(this).val();
  const mesSelected = globalMeses.filter(datos => {
    return datos.idMes == val;
  });
  mesSelected[0].Dias.forEach( dias => {
    $("#diaSelectedUpdate").append(`
      <option value="${dias}">${dias}</option>
    `);
  });
});

$(document).on("click","#btnUpdateDF", async function(){
  let mes = $("#mesSelectedUpdate").val();
  let dia = $("#diaSelectedUpdate").val();
  let desc = $("#txtDescripcionDiaFUpdate").val();
  let diaF = $("#IdDFUpdate").val();

  if (mes == "" || dia === null || desc == "") {
    alertify.warning("Seleccione el Número de mes, el número de día e ingrese la descripción.");
  } else {
    alertify.confirm(`Confirmación de acción.`,`¿Desea confirmar los datos ingresados?`, async function(){
      let fecha = `${mes}-${dia}`;
      let datos = await {
        op: "updateInfoDiaFestivo",
        Descripcion: desc,
        Dia: fecha,
        idDiasFestivos: diaF
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
      } finally {
        if (respuesta == "1") {
          alertify.alert().closeOthers();
          await limpiarInp();
          await getListDiasFestivos();
          alertify.success("Día festivo Actualizado.");
        }
        else {
          alertify.warning(respuesta);
        }
      }
    },async function(){
      return "0";
    }).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
  }
});

$(document).on("click","#btnAddDiaF",async function(){
  let mes = $("#mesSelected").val();
  let dia = $("#diaSelected").val();
  let desc = $("#txtDescripcionDiaF").val();
  if (mes == "" || dia === null || desc == "") {
    alertify.warning("Seleccione el Número de mes, el número de día e ingrese la descripción.");
  }else {
    alertify.confirm(`Confirmación de acción.`,`¿Desea confirmar los datos ingresados?`, async function(){
      let fecha = `${mes}-${dia}`;
      let datos = await {
        op: "addDiasFestivos",
        Descripcion: desc,
        Dia: fecha
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
      } finally {
        if (respuesta == "1") {
          alertify.alert().closeOthers();
          await limpiarInp();
          await getListDiasFestivos();
          alertify.success("Día festivo agregado.");
        }
        else {
          alertify.warning(respuesta);
        }
      }
    },async function(){
      return "0";
    }).set('labels', {ok:'Confirmar', cancel:'Cancelar'});
  }
});

async function limpiarInp(){
  $("#mesSelected").val("");
  $("#diaSelected").val("");
  $("#txtDescripcionDiaF").val("");
  $("#mesSelectedUpdate").val("");
  $("#diaSelectedUpdate").val("");
  $("#txtDescripcionDiaFUpdate").val("");
  $("#IdDFUpdate").val();
}
