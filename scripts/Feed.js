// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

$("#NuevoArchivo").click(function () {
  $("#inpArchivo").click();
});

function previewImage(event, querySelector) {
  //Recuperamos el input que desencadeno la acción
  const input = event.target;

  //Recuperamos la etiqueta img donde cargaremos la imagen
  $imgPreview = document.querySelector(querySelector);
  console.log("prev 1_ ", $imgPreview);

  // Verificamos si existe una imagen seleccionada
  if (!input.files.length) return;

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

$("#CrearFeed").click(function () {
  if (document.getElementById("InsertaFeed").checkValidity()) {
    event.preventDefault();
    var form = $("#InsertaFeed")[0];
    var data = new FormData(form);
    data.append("op", "newFeed");
    for (let index = 0; index < arrayFiles.length; index++) {
      data.append("ArrArchivos[]", arrayFiles[index]);
    }
    $.ajax({
      type: "post",
      url: "Backend/Feed/App.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (response) {
        if (response == "1") {
          // Swal.fire("Agregado", "Feed Agregado", "success");
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Feed Agregado.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          setTimeout(function () {
            window.location.href = `index.php`;
          }, 1000);
        } else if (response == "0") {
          // toastr.warning("Algo salió mal, Intente de nuevo");
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Algo salió mal, Intente de nuevo</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        } else {
          // toastr.warning("Archivo no valido");
          const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Archivo no valido.</span>
            </div>`;
          showBootstrapAlertWar(messageContent, "top-right", 5000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  } else {
    // toastr.info("Ingrese todos los datos");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Ingrese todos los datos.</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
});

$("#btnStandards").click(function (e) {
  $("#standard_filess").click();
});

let arrayFiles = [];

(function () {
  "use strict";
  var dropZone = $("#dropzones")[0];
  var startUpload = function (files) {
    var tipo;
    var tamaño;
    for (var i = 0; i < files.length; i++) {
      tipo = files[i]["type"];
      tamaño = files[i]["size"];
      if (tamaño <= 5e6) {
        // if (tipo=="image/png" || tipo=="image/jpg" || tipo=="image/jpeg") {
        if (
          tipo == "image/png" ||
          tipo == "image/jpg" ||
          tipo == "image/jpeg" ||
          tipo == "application/pdf"
        ) {
          arrayFiles.push(files[i]);
        } else {
          // toastr.info(
          //   `El archivo: ${files[i]["name"]} no puede agregarse, verifique que sea unicamente formato PNG, JPG ó JPEG y que el tamaño sea menor a 3MB.`
          // );
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">El archivo: ${files[i]["name"]} no puede agregarse, verifique que sea unicamente formato PNG, JPG ó JPEG y que el tamaño sea menor a 3MB.</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
        }
      } else {
        // toastr.info(
        //   `El archivo es demasiado pesado, el tamaño maximo aceptado es: 5MB`
        // );
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">El archivo es demasiado pesado, el tamaño maximo aceptado es: 5MB.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
      }
    }
    ImagenesDrop();
    console.log(arrayFiles);
  };

  var standardUpload = $("#standard_filess");
  standardUpload.change(function (e) {
    var standardFiles = $("#standard_filess").prop("files");
    startUpload(standardFiles);
  });
  dropZone.ondrop = function (e) {
    e.preventDefault();
    this.className = "upload_drops";
    startUpload(e.dataTransfer.files);
  };
  dropZone.ondragover = function () {
    this.className = "upload_drops drop";
    return false;
  };
  dropZone.ondragleave = function () {
    this.className = "upload_drops";
  };
})();

function ver(files, cont) {
  var reader = new FileReader();
  reader.onload = function () {
    $("#preview" + cont).attr("src", reader.result);
  };
  reader.readAsDataURL(files);
}

function ImagenesDrop() {
  mostarchivoss = "";
  cont = 0;
  $.each(arrayFiles, function (index, arrfiles) {
    let extension = arrfiles.name.split(".").pop();
    console.log(extension);
    if (extension == "pdf") {
      mostarchivoss += `<div class="mostArchivo col-md-2 text-center" style="display:inline-block; margin:5px;">
                            <img class="im" id="preview${cont}"  width="50" height="50" title = "${arrfiles["name"]}">
                            <br>
                            <h6 class="form-label text-dark">${arrfiles["name"]}</h6>
                            <a id="btn" class="btn btn-danger" onclick="RemoverArchivo('${arrfiles["name"]}');" data-toggle="tooltip" title="Quitar archivo">
                                <span class="material-symbols-outlined">delete</span>
                            </a>
                        </div><div class="mostt"></div>`;
    } else {
      mostarchivoss += `<div class="mostArchivocol-md-2 text-center" style="display:inline-block; margin:5px;">
                          <img class="im rounded shadow-sm" id="preview${cont}" width="50" height="50" title = "${arrfiles["name"]}">
                          <br>
                          <h6 class="form-label text-dark mt-2">${arrfiles["name"]}</h6>
                          <a id="btn" class="btn btn-danger mt-1" onclick="RemoverArchivo('${arrfiles["name"]}');" data-toggle="tooltip" title="Quitar archivo">
                              <span class="material-symbols-outlined">delete</span>
                          </a>
                       </div><div class="mostt"></div>`;
    }

    ver(arrfiles, cont);
    cont++;
  });
  $("#ImagenesDrop").html(
    `<div style="display:flex; flex-wrap:wrap;">${mostarchivoss}</div>`
  );
}

function RemoverArchivo(archivo) {
  var remover = arrayFiles
    .map(function (item) {
      return item.name;
    })
    .indexOf(archivo);
  arrayFiles.splice(remover, 1);
  ImagenesDrop();
}
