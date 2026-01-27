<?php include("AutorizaPagina.php"); ?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/lg1.png">
  <title>Klyns Intranet</title>

  <!-- Styles neptune -->
  <?php include("neptune_styles.php"); ?>
  <!-- Styles neptune -->

  <!-- CSS adicionales -->
  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>

<body>

  <div class="card m-4">
    <div class="card-body">
      <div class="row">
        <div class="col text-center">
          <img src="assets/Klyns.png" class="img-fluid" style="max-width: 50px;" alt="Logo">
        </div>
      </div>
      <div class="row mt-4">
        <div class="col text-center">
          <h4 class="fw-bold">Solicitud de Vacaciones</h4>
        </div>
      </div>
      <hr>
      <div class="row mt-4">
        <div class="col-6 text-center">
          <h6 class="fw-bold">Nombre del Solicitante:</h6>
          <h6 id="NombreSolicitante"></h6>
        </div>
        <div class="col-6 text-center">
          <h6 class="fw-bold">No. Empleado:</h6>
          <h6 id="NoEmpleadoSolicitante"></h6>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-6 text-center">
          <h6 class="fw-bold">Puesto:</h6>
          <h6 id="PuestoSolicitante"></h6>
        </div>
        <div class="col-6 text-center">
          <h6 class="fw-bold">Departamento:</h6>
          <h6 id="DepSolicitante"></h6>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col text-center">
          <h6 class="fw-bold">Sucursal:</h6>
          <h6 id="SucursalSolicitante"></h6>
        </div>
      </div>

      <hr>

      <div class="row mt-4">
        <div class="col-6 text-center">
          <h6 class="fw-bold">Fecha de Ingreso:</h6>
          <h6 id="FechaIngresoSolicitante"></h6>
        </div>
        <div class="col-6 text-center">
          <h6 class="fw-bold">Fecha de Solicitud:</h6>
          <h6 id="FechaSolicitudSolicitante"></h6>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-6 text-center">
          <h6 class="fw-bold">Vacaciones del:</h6>
          <h6 id="VacacionesDel"></h6>
        </div>
        <div class="col-6 text-center">
          <h6 class="fw-bold">Regresando el:</h6>
          <h6 id="VacacionesHasta"></h6>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-6 text-center">
          <h6 class="fw-bold">Vacaciones Pendientes:</h6>
          <h6 id="DiasDisponibles">NN</h6>
        </div>
        <div class="col-6 text-center">
          <h6 class="fw-bold">Dias a Disfrutar:</h6>
          <h6 id="TotalDias"></h6>
        </div>
      </div>

      <hr>

      <div class="row mt-4">
        <div class="col text-center">
          <h5 class="fw-bold">Autorizaciones</h5>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-4 text-center">
          <div class="d-flex align-items-center justify-content-center " style="height:100px;">
            <img src="" id="imgFirmaSolicitante" class="img-fluid h-100">
          </div>
          <hr>
          <h6 class="" id="NombreSolicitanteFirma"></h6>
        </div>

        <div class="col-4 text-center">
          <div class="d-flex align-items-center justify-content-center " style="height:100px;">
            <img src="" id="imgFirmaJefeInmediato" class="img-fluid h-100">
          </div>
          <hr>
          <h6 class="" id="JefeInmediato"></h6>
          <h6 class="fw-bold">Jefe Inmediato</h6>
        </div>

        <div class="col-4 text-center">
          <div class="d-flex align-items-center justify-content-center " style="height:100px;">
            <img src="" id="imgFirmaRecursosH" class="img-fluid h-100">
          </div>
          <hr>
          <h6 class="fw-bold">Recursos Humanos</h6>
        </div>
      </div>


    </div>
  </div>

  <div class="row">
    <div class="col-6 text-center">
      <button onclick="printHTML()" class="btn btn-primary mb-4">Imprimir Solicitud</button>
    </div>
    <div class="col-6 text-center">
      <button id="btnPDF" onclick="descargaPDF()" class="btn btn-success mb-4">Descargar PDF</button>
    </div>
  </div>




  <!-- Scripts -->
  <!-- <script src="plugins/html2pdf.bundle.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>


  <script src="assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- neptune Javascripts -->
  <?php include("neptune_js.php"); ?>
  <?php include("scripts.php"); ?>

  <script type="text/javascript">
    const myKeysValues = window.location.search;
    const urlParams = new URLSearchParams(myKeysValues);
    const idSolicitud = urlParams.get('Solicitud');
    //let var212 = atob(idSolicitud);
    verDetalleSolicitud();

    function verDetalleSolicitud() {
      let datos = {
        op: "getDetalleSolicitud",
        idSolicitudesVacaciones: idSolicitud
      }
      $.ajax({
        type: "post",
        url: "Backend/Empleados/App.php",
        data: datos,
        success: function(response) {
          response = JSON.parse(response.trim());
          console.log(response);
          let urlImg = "";
          let urlImgJefe = "";
          for (var i = 0; i < response.length; i++) {
            urlImg = "Archivos/ImgEmpleados/" + response[i]["NoEmpleado"] + "/" + "Firma/" + response[i]["FirmaSolicitante"];
            urlImgJefe = "Archivos/ImgEmpleados/" + response[i]["NoJefe"] + "/Firma/" + response[i]["FirmaJefe"];
            urlImaFinal = "Archivos/ImgEmpleados/" + response[i]["NoFinalAutoriza"] + "/Firma/" + response[i]["FirmaFinal"];
            console.log(urlImgJefe);
            if (response[i]["Status"] == 1) {
              $("#imgFirmaJefeInmediato").attr("src", urlImgJefe);
            } else if (response[i]["Status"] == 3) {
              $("#imgFirmaJefeInmediato").attr("src", urlImgJefe);
              $("#imgFirmaRecursosH").attr("src", urlImaFinal);
            }
            $("#NombreSolicitante").html(response[i]["NombreSolicitante"]);
            $("#NoEmpleadoSolicitante").html(response[i]["NoEmpleado"]);
            $("#PuestoSolicitante").html(response[i]["PuestoSolicitante"]);
            $("#DepSolicitante").html(response[i]["Departamento"]);
            $("#FechaIngresoSolicitante").html(response[i]["Antiguedad"]);
            $("#FechaSolicitudSolicitante").html(response[i]["FechaRegistroSoli"]);
            $("#VacacionesDel").html(response[i]["FechaInicio"]);
            $("#VacacionesHasta").html(response[i]["FechaRegreso"]);
            $("#TotalDias").html(response[i]["TotalDias"]);
            $("#NombreSolicitanteFirma").html(response[i]["NombreSolicitante"]);
            $("#imgFirmaSolicitante").attr("src", urlImg);
            $("#DiasDisponibles").html(response[i]["DiasVacacionesRest"]);
            $("#JefeInmediato").html(response[i]["NombreJefe"]);
            $("#SucursalSolicitante").html(response[i]["Sucursal"]);
          }
        }
      });
    }

    function printHTML() {
      if (window.print) {
        window.print();
      }
    }

    const {
      jsPDF
    } = window.jspdf;

    function descargaPDF() {
      const doc = new jsPDF({
        orientation: "portrait", // o 'landscape' si quieres horizontal
        unit: "px", // usamos px para que se parezca a la pantalla
        format: "a4"
      });

      // Seleccionamos el contenedor que queremos pasar a PDF
      const elemento = document.querySelector(".card"); // solo la tarjeta de la solicitud

      doc.html(elemento, {
        callback: function(doc) {
          doc.save("Solicitud_Vacaciones.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.33, // mayor escala = mejor resolución
          letterRendering: true
        }
      });
    }

    // function descargaPDF() {
    //   const doc = new jsPDF({
    //     orientation: "landscape",
    //     unit: "in",
    //     format: [4, 2]
    //   });

    //   doc.text("Hello world!", 1, 1);
    //   doc.save("two-by-four.pdf");
    // }


    // document.addEventListener("DOMContentLoaded", () => {
    //   // Escuchamos el click del botón
    //   const $boton = document.querySelector("#btnPDF");
    //   $boton.addEventListener("click", () => {
    //     const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
    //     html2pdf()
    //       .set({
    //         margin: .3,
    //         filename: 'Solicitud Vacaciones.pdf',
    //         image: {
    //           type: 'png',
    //           quality: 0.98
    //         },
    //         html2canvas: {
    //           scale: 3, // A mayor escala, mejores gráficos, pero más peso
    //           letterRendering: true,
    //         },
    //         jsPDF: {
    //           unit: "in",
    //           format: "Letter",
    //           orientation: 'portrait' // landscape o portrait
    //         }
    //       })
    //       .from($elementoParaConvertir)
    //       .save()
    //       .catch(err => console.log(err));
    //   });
    // });
  </script>
</body>

</html>