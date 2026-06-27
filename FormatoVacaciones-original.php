<!DOCTYPE html>

<html lang="en">

<head>

  <?php

  include("estilos.php");

  ?>

  <meta charset="utf-8">
  <title>La Esmeralda</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="apple-mobile-web-app-capable" content="yes">

  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <meta name="viewport"
    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />

  <link rel="icon" type="image/png" sizes="16x16" href="assets/images/logo-pip.png">

  <title>PIP by Lugo</title>

  <link href="dist/css/style.css" rel="stylesheet">

  <link href="assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />

  <link href="assets/extra-libs/calendar/calendar.css" rel="stylesheet" />

  <link href="assets/libs/toastr/build/toastr.min.css" rel="stylesheet">

  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

  <title>Document</title>

  <style>
    .logo {

      width: 7vh;

      height: 7vh;

    }

    .contenedor {

      padding: 1%;

      margin: auto;

      align-content: center;

      align-items: center;

      width: 90%;

      height: 100%;

      background-color: white;

      border: 4px solid black;

      align-items: center;

      text-align: center;

      border-radius: 15px;

      border-color: crimson;

    }

    .contenedor1 {

      margin-top: -1vh;

    }

    @media screen and (max-width: 600px) {

      .contenedor {

        padding: 2%;

        margin: auto;

        align-content: center;

        align-items: center;

        width: 100%;

        height: 100%;

        background-color: white;

        border: 4px solid black;

        align-items: center;

        text-align: center;

        border-radius: 15px;

        border-color: crimson;

      }

    }



    /* CSS */

    .descPDF {

      background: #FF4742;

      border: 1px solid #4265ffff;

      border-radius: 6px;

      box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;

      box-sizing: border-box;

      color: #FFFFFF;

      cursor: pointer;

      display: inline-block;

      font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;

      font-size: 16px;

      font-weight: 800;

      line-height: 16px;

      min-height: 40px;

      outline: 0;

      padding: 12px 14px;

      text-align: center;

      text-rendering: geometricprecision;

      text-transform: none;

      user-select: none;

      -webkit-user-select: none;

      touch-action: manipulation;

      vertical-align: middle;

    }



    .descPDF:hover,

    .descPDF:active {

      background-color: initial;

      background-position: 0 0;

      color: #FF4742;

    }



    .descPDF:active {

      opacity: .5;

    }



    /* CSS */

    .imp {

      background: #00919D;

      border: 1px solid #00919D;

      border-radius: 6px;

      box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;

      box-sizing: border-box;

      color: #FFFFFF;

      cursor: pointer;

      display: inline-block;

      font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;

      font-size: 16px;

      font-weight: 800;

      line-height: 16px;

      min-height: 40px;

      outline: 0;

      padding: 12px 14px;

      text-align: center;

      text-rendering: geometricprecision;

      text-transform: none;

      user-select: none;

      -webkit-user-select: none;

      touch-action: manipulation;

      vertical-align: middle;

    }



    .imp:hover,

    .imp:active {

      background-color: initial;

      background-position: 0 0;

      color: #00919D;

    }



    .imp:active {

      opacity: .5;

    }

    body {

      background-color: white
    }
  </style>

</head>

<body>

  <div class='contenedor' id="contenedorSV">

    <img src='assets/Klyns.png' class='logo'><br><br>

    <h2>Solicitud de Vacaciones</h2>

    <div style="background-color:black; height:2px"></div>

    <br>

    <div class="contenedor1">

      <div class="row">

        <div class="col s3">

          <span><b>Solicitante:</b></span>

        </div>

        <div class="col s3">

          <span id="NombreSolicitante"></span>

        </div>

        <div class="col s3">

          <span><b>No Empleado:</b></span>

        </div>

        <div class="col s3">

          <span id="NoEmpleadoSolicitante"></span>

        </div>

      </div>

      <div class="row">

        <br><br>

        <div class="col s3">

          <span><b>Puesto:</b></span>

        </div>

        <div class="col s3">

          <span id="PuestoSolicitante"></span>

        </div>

        <div class="col s3">

          <span><b>Departamento:</b></span>

        </div>

        <div class="col s3">

          <span id="DepSolicitante"></span>

        </div>

      </div>

      <div class="row" style="margin-top:3vh">

        <div class="col s6 l3 offset-l3" style="text-align:right">

          <span><b>Sucursal:</b></span>

        </div>

        <div class="col s6 l3" style="text-align:left">

          <span id="SucursalSolicitante"></span>

        </div>

      </div>

    </div>

    <br>

    <div style="background-color:black; height:2px"></div><br>

    <div class="contenedor1">

      <div class="row">

        <div class="col s3">

          <span><b>Fecha de Ingreso:</b></span>

        </div>

        <div class="col s3">

          <span id="FechaIngresoSolicitante"></span>

        </div>

        <div class="col s3">

          <span><b>Fecha de Solicitud:</b></span>

        </div>

        <div class="col s3">

          <span id="FechaSolicitudSolicitante"></span>

        </div>

      </div>

    </div>

    <br>

    <div class="contenedor1">

      <div class="row">

        <div class="col s8 offset-s2">

          <div class="">

            <div class="col s3">

              <span><b>Vacaciones del:</b></span>

            </div>

            <div class="col s3">

              <span id="VacacionesDel"></span>

            </div>

            <div class="col s3">

              <span><b>Regresando el:</b></span>

            </div>

            <div class="col s3">

              <span id="VacacionesHasta"></span>

            </div>

          </div>

        </div>

      </div>

    </div>

    <br>

    <div class="contenedor1">

      <div class="row">

        <div class="col s6">

          <span><b>Vacaciones Pendientes</b></span>

        </div>

        <div class="col s6">

          <span><b>Dias a Disfrutar</b></span>

        </div>

        <div class="col s6">

          <span id="DiasDisponibles">NN</span>

        </div>

        <div class="col s6">

          <span id="TotalDias"></span>

        </div>

      </div>

    </div>

    <br>

    <div style="background-color:black; height:2px"></div><br>

    <div class="contenedor1">

      <div class="row">

        <div class="col s12">

          <h4>AUTORIZACIONES</h4>

        </div>

      </div>

    </div>

    <br><br>

    <div class="contenedor1">

      <div class="row">

        <div class="col s4">

          <div class="row">

            <div class="col s12" style=" height:100px; border-radius:15px; text-align: center;">

              <img src="" id="imgFirmaSolicitante" alt="" style="width:100%">

            </div>

            <div class="col s12" style="margin-top:-4vh">

              <div style="background-color:black; height:2px"></div><br>

            </div>

            <div class="col s12">

              <span id="NombreSolicitanteFirma"></span>

            </div>

          </div>

        </div>

        <div class="col s4">

          <div class="row">

            <div class="col s12" style=" height:100px; border-radius:15px; text-align: center;">

              <img src="" id="imgFirmaJefeInmediato" alt="" style="width:100%">

            </div>

            <div class="col s12" style="margin-top:-4vh">

              <div style="background-color:black; height:2px"></div><br>

            </div>

            <div class="col s12">

              <span id="JefeInmediato"></span>

            </div>

            <div class="col s12">

              <span><b>Jefe Inmediato</b></span>

            </div>

          </div>

        </div>

        <div class="col s4">

          <div class="row">

            <div class="col s12" style=" height:100px; border-radius:15px; text-align: center;">

              <img src="" id="imgFirmaRecursosH" alt="" style="width:100%">

            </div>

            <div class="col s12" style="margin-top:-4vh">

              <div style="background-color:black; height:2px"></div><br>

            </div>

            <div class="col s12">

              <span>Recursos Humanos</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="row" style="margin-top:.5vh">

    <div class="col s12 l12">

      <div class="row">

        <div class="col s6 l6">

          <div class="row">

            <div class="col s7 offset-s5 l4 offset-l8" style="text-align:right">

              <button onclick="printHTML()" class="imp">Imprimir Solicitud</button>

            </div>

          </div>

        </div>

        <div class="col s6 l6">

          <div class="row">

            <div class="col s7  l4 " style="text-align:left">

              <button id="btnPDF" onclick="descargaPDF()" class="descPDF">Descargar PDF</button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <script src="plugins/html2pdf.bundle.min.js"></script>



  <script src="assets/libs/jquery/dist/jquery.min.js"></script>

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

        success: function (response) {

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



    function descargaPDF() {

      const doc = new jsPDF({

        orientation: "landscape",

        unit: "in",

        format: [4, 2]

      });



      doc.text("Hello world!", 1, 1);

      doc.save("two-by-four.pdf");

    }





    document.addEventListener("DOMContentLoaded", () => {

      // Escuchamos el click del botón

      const $boton = document.querySelector("#btnPDF");

      $boton.addEventListener("click", () => {

        const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM

        html2pdf()

          .set({

            margin: .3,

            filename: 'Solicitud Vacaciones.pdf',

            image: {

              type: 'png',

              quality: 0.98

            },

            html2canvas: {

              scale: 3, // A mayor escala, mejores gráficos, pero más peso

              letterRendering: true,

            },

            jsPDF: {

              unit: "in",

              format: "Letter",

              orientation: 'portrait' // landscape o portrait

            }

          })

          .from($elementoParaConvertir)

          .save()

          .catch(err => console.log(err));

      });

    });

  </script>

</body>

</html>
