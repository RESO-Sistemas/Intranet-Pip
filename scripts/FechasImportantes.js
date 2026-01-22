loadImgEventos();
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