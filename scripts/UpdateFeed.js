// Ocultar preloader cuando todo esté listo
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

const myKeysValues = window.location.search;

const urlParams = new URLSearchParams(myKeysValues);

const Feed = urlParams.get("Feed");

getDetalleFeed();

getArchivosActualesFeed();



async function getDetalleFeed() {

  let datos = await {

    op: "getDetalleFeed",

    idFeed: Feed,

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Feed/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (e) {

    console.log(e);

  } finally {

    $("#txtTitulo").val(respuesta["Titulo"]);

    $("#txtDescripcion").val(respuesta["Descripcion"]);

    $("#txtHV").val(respuesta["Hipervinculo"]);

  }

}

async function getArchivosActualesFeed() {

  let datos = await {

    op: "getArchivosActualesFeed",

    idFeed: Feed,

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Feed/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (e) {

    console.log(e);

  } finally {

    console.log(respuesta);

    $("#contenidoArchivos").html("");

    if (respuesta.length < 1) {

      $("#contenidoArchivos").append(`

          <div class="col s12 l12" style="text-align:center">

              <h5>El Feed no cuenta con archivos agregados.</h5>

          </div>

          <div class="d-flex justify-content-center align-items-center p-4">

            <div class="text-center">

              <h5 class="fw-semibold mb-0">El Feed no cuenta con archivos agregados.</h5>

            </div>

          </div>

        `);

    } else {

      let IdFeed = atob(Feed);

      let arrArchivos = respuesta[0]["Archivo"].split(",");

      let ContenidoHTMLArchivos = "";

      arrArchivos.forEach((contenidoArchivos) => {

        let ext = obtenerExtension(contenidoArchivos);

        if (ext === "pdf") {

          ContenidoHTMLArchivos += `<div class="col-12 col-md-6 col-lg-4 mb-3">

  <div class="card h-100 shadow-sm text-center">

    <div class="card-body p-2" style="height:200px;">

      <object 

        data="Archivos/Feed/${IdFeed}/${contenidoArchivos}" 

        type="application/pdf" 

        style="height:100%; width:100%">

      </object>

    </div>

    <div class="card-footer text-center">

      <button 

        class="btn btn-danger btn-sm" 

        onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')">

        <span class="material-symbols-outlined">delete</span>

      </button>

    </div>

  </div>

</div>

`;

        }

        if (ext === "mp4") {

          ContenidoHTMLArchivos += `

  <div class="col-12 col-md-6 col-lg-4 mb-3">

    <div class="card h-100 shadow-sm text-center">

      <div class="card-body p-2">

        <video controls muted style="width:100%; height:200px;">

          <source src="Archivos/Feed/${IdFeed}/${contenidoArchivos}" type="video/mp4" />

        </video>

      </div>

      <div class="card-footer text-center">

        <a href="Archivos/Feed/${IdFeed}/${contenidoArchivos}" target="_blank" class="btn btn-outline-primary btn-sm mb-1">Abrir Archivo</a>

        <button class="btn btn-danger btn-sm" onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')">

          <span class="material-symbols-outlined">delete</span>

        </button>

      </div>

    </div>

  </div>

`;

        }

        if (ext === "pptx" || ext === "ppt") {

          ContenidoHTMLArchivos += `

  <div class="col-12 col-md-6 col-lg-4 mb-3">

    <div class="card h-100 shadow-sm text-center">

      <div class="card-body p-2" style="height:200px;">

        <a href="Archivos/Feed/${IdFeed}/${contenidoArchivos}" target="_blank">

          <img src="assets/images/PPTicon.png" alt="${contenidoArchivos}" style="height:100%;">

        </a>

      </div>

      <div class="card-footer text-center">

        <button class="btn btn-danger btn-sm" onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')">

          <span class="material-symbols-outlined">delete</span>

        </button>

      </div>

    </div>

  </div>

`;

        }

        if (ext === "png" || ext === "jpg") {

          ContenidoHTMLArchivos += `

  <div class="col-12 col-md-6 col-lg-4 mb-3">

    <div class="card h-100 shadow-sm text-center">

      <div class="card-body p-2" style="height:200px;">

        <img src="Archivos/Feed/${IdFeed}/${contenidoArchivos}" alt="${contenidoArchivos}" style="height:100%; width:100%; object-fit:contain;">

      </div>

      <div class="card-footer text-center">

        <button class="btn btn-danger btn-sm" onclick="eliminarArchivoFeedSelected('${contenidoArchivos}')">

          <span class="material-symbols-outlined">delete</span>

        </button>

      </div>

    </div>

  </div>

`;

        }

      });

      $("#contenidoArchivos").append(ContenidoHTMLArchivos);

    }

  }

}



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

  console.log(files);

  var reader = new FileReader();

  let extension = files.name.split(".").pop();

  if (extension == "pdf") {

    reader.onload = function () {

      $("#preview" + cont).attr("src", "assets/images/PDFIcon.png");

    };

  } else {

    reader.onload = function () {

      $("#preview" + cont).attr("src", reader.result);

    };

  }



  reader.readAsDataURL(files);

}



function ImagenesDrop() {

  mostarchivoss = "";

  cont = 0;

  $.each(arrayFiles, function (index, arrfiles) {

    let extension = arrfiles.name.split(".").pop();

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



  // Envolvemos todo en un contenedor flex-wrap para que se acomoden en fila y bajen si no caben

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



function obtenerExtension(filename) {

  if (!filename) {

    return;

  }

  return filename.split(".").pop();

}



async function eliminarArchivoFeedSelected(archivo) {

  let ext = obtenerExtension(archivo);

  let contenidoHTML = "";

  let IdFeed = atob(Feed);

  if (ext === "pdf") {

    contenidoHTML = `

<div class="text-center">

  <object data="Archivos/Feed/${IdFeed}/${archivo}" type="application/pdf" style="width:100%; height:400px;"></object>

</div>

   `;

  } else if (ext === "mp4") {

  } else if (ext === "pptx" || ext === "ppt") {

  } else if (ext === "png" || ext === "jpg") {

    contenidoHTML = `

<div class="text-center">

  <img src="Archivos/Feed/${IdFeed}/${archivo}" style="max-width:100%; max-height:400px; padding:1em;">

</div>



   `;

  }



  // Usar SweetAlert2 para confirmación de Feed

  Swal.fire({

    title: "¿Desea eliminar el siguiente archivo?",

    html: contenidoHTML,

    showCancelButton: true,

    confirmButtonColor: "#3085d6",

    cancelButtonColor: "#d33",

    confirmButtonText: "Eliminar",

    cancelButtonText: "Cancelar",

    focusConfirm: false,

    width: "600px",

    customClass: {

      popup: "shadow",

    },

  }).then(async (result) => {

    if (result.isConfirmed) {

      // Llamada AJAX para eliminar

      let datos = {

        op: "eliminarArchivoFeedSelected",

        idFeed: Feed,

        Archivo: archivo,

      };

      let respuesta = "";

      try {

        respuesta = await $.ajax({

          type: "post",

          url: "Backend/Feed/App.php",

          data: datos,

        });

      } catch (e) {

        console.log(e);

      } finally {

        if (respuesta == "1") {

          const messageContent = `

          <div class="alert-content">

            <span class="alert-title">Completado!</span>

            <span class="alert-text">Archivo eliminado con éxito.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);

          getArchivosActualesFeed();

        }

      }

    } else {

      const messageContent = `

      <div class="alert-content">

        <span class="alert-title">Información!</span>

        <span class="alert-text">Cancelado.</span>

      </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    }

  });

}



$("#btnUpdateFeed").click(async function () {

  if (document.getElementById("UpdateFeed").checkValidity()) {

    event.preventDefault();

    $.blockUI({ message: null });

    let form = $("#UpdateFeed")[0];

    let data = new FormData(form);

    data.append("op", "UpdateFeed");

    data.append("idFeed", Feed);

    for (let index = 0; index < arrayFiles.length; index++) {

      data.append("ArrArchivos[]", arrayFiles[index]);

      console.log(arrayFiles[index]);

    }

    $.ajax({

      type: "POST",

      url: "Backend/Feed/App.php",

      data: data,

      processData: false,

      contentType: false,

      cache: false,

      timeout: 600000,

      success: function (response) {

        console.log([...data]);

        if (response == "1") {

          // toastr.success("Feed Actualizado");

          const messageContent = `

          <div class="alert-content">

             <span class="alert-title">Completado!</span>

              <span class="alert-text">Feed Actualizado.</span>

          </div>`;

          showBootstrapAlertSuc(messageContent, "top-right", 5000);



          setTimeout(function () {

            window.location.href = `ListadoFeed.php`;

          }, 3000);

        } else if (response == "0") {

          // toastr.info("Error al guardar");

          const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Error al guardar.</span>

        </div>`;

          showBootstrapAlert(messageContent, "top-right", 5000);

        } else {

          // toastr.info(response);

          const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">${response}.</span>

        </div>`;

          showBootstrapAlert(messageContent, "top-right", 5000);

        }

      },

      error: function (e) {

        alert(e.responseText);

      },

    });

  } else {

    // toastr.info("Faltan datos por ingresar");

    const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Faltan datos por ingresar.</span>

        </div>`;

    showBootstrapAlert(messageContent, "top-right", 5000);

  }

});

