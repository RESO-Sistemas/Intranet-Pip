cargarDatos();

let cantidadDias = "0";
let glbDiasDisponibles = "0";
let DiaRegreso = "";
function cargarDatos() {
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: "op=getDatosEmpleadoSolocitud",
    success: function (response) {
      response = JSON.parse(response.trim());
      let diasDisponibles = "2";
      for (var i = 0; i < response.length; i++) {
        diasDisponibles = response[i]["DiferenciaYears"];
        glbDiasDisponibles = response[i]["DiferenciaYears"];
        $("#NombreEmpleado").text(response[i]["Nombre"]);
        $("#CantidadDiasDisp").val(diasDisponibles);
        $("#DiasDisponibles").html(
          `Dias restantes de Vacaciones: ${response[i]["DiferenciaYears"]}`
        );
      }
    },
  });
}

async function enviarSolicitudVacaciones() {
  let resultV = await verifyInputs("card_contentVal");
  if (resultV) {
    let FechaInicio = $("#FechaInicio").val();
    // let diasDisponibles = $("#CantidadDiasDisp").val();
    let FechaFin = $("#FechaFin").val();
    let ComentariosSolicitud = $("#MotivoSolicitud").val();
    if (glbDiasDisponibles == 0) {
      toastr.warning(
        "No puedes enviar tu solicitud debido a que no tienes disponibilidad de días restantes."
      );
      return false;
    }
    if (cantidadDias == "0") {
      toastr.warning("Fechas no admitidas");
      return false;
    }
    if (cantidadDias > glbDiasDisponibles) {
      toastr.warning(
        "No puedes superar tu límite de días disponibles. Por favor cambie las fechas."
      );
      return false;
    }
    if (ComentariosSolicitud == "") {
      toastr.info(
        "Es necesario ingresar una descripción para poder continuar."
      );
      return false;
    }
    // $.blockUI({ css: {
    //   border: 'none',
    //   padding: '15px',
    //   backgroundColor: '#000',
    //   '-webkit-border-radius': '10px',
    //   '-moz-border-radius': '10px',
    //   opacity: .5,
    //   color: '#fff'
    // }});
    let datasend = {
      op: "enviarSolicitudVacaciones",
      FechaInicio: FechaInicio,
      FechaFin: FechaFin,
      ComentariosSolicitud: ComentariosSolicitud,
      TotalDias: cantidadDias,
      DiaRegreso: DiaRegreso,
    };
    $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datasend,
      success: function (response) {
        if (response == "1") {
          toastr.success("Solicitud enviada");
          setTimeout(function () {
            window.location.href = `SolicitudVacaciones.php`;
          }, 1000);
        } else if (response == "errorJefe") {
          toastr.info(
            "Actualmente no puedes solicitar tus vacaciones porque ningún empleado puede aprobártelas."
          );
          setTimeout($.unblockUI, 1000);
          console.log("no hay jefes");
          getJefesPosibles();
        } else if (response == "errorFirma") {
          toastr.info(
            "Actualiza tu firma Por Favor antes de enviar la solicitud."
          );
          setTimeout($.unblockUI, 1000);
        }
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  }
}

$(document).on("change", "#daysBreak", function () {
  getDiasSeleccionados();
});

function getDiasSeleccionados() {
  let diasValidos = [];
  let divicion = [];
  if ($("#FechaInicio").val() == "" || $("#FechaFin").val() == "") {
    return false;
  }
  if ($("#daysBreak").val().length > 6) {
    toastr.info("Días de descanso seleccionados no válidos.");
    $("#daysBreak").val([]);
    $("#daysBreak").select2();
    $("#DiasSeleccionados").text("Cantidad de dias seleccionados:" + "  " + 0);

    $("#DiaRegreso").text("Regresando el día: Sin definir.");
  } else {
    let dataSend = {
      op: "getFechasRango",
      fechaInicio: $("#FechaInicio").val(),
      fechaFin: $("#FechaFin").val(),
      diasDescanso:
        $("#daysBreak").val().length > 0 ? $("#daysBreak").val() : "",
    };
    // console.log(dataSend);
    $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: dataSend,
      success: function (response) {
        response = JSON.parse(response.trim());
        let dataR = response[0];
        cantidadDias = dataR.CantDias;
        $("#DiasSeleccionados").text(
          "Cantidad de dias seleccionados:" + "  " + dataR.CantDias
        );
        $("#DiaRegreso").text("Regresando el día:" + "  " + dataR.DiaRegreso);
        DiaRegreso = dataR.DiaRegreso;
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  }
}

async function asignarJefeEmpleado(empPadre) {
  let datos = await {
    op: "asignarJefeEmpleadoSolicitud",
    EmpleadoPadre: empPadre,
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (respuesta == 1) {
      toastr.success("Jefe Actualizado");
    } else {
      toastr.info("ERROR");
    }
  }
}

async function getJefeAsignadoSolicitud(valor) {
  let datos = await {
    op: "getJefeAsignadoSolicitud",
  };
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return respuesta;
  }
}

async function getJefesPosibles() {
  console.log("hola");
  let datos = await {
    op: "getJefesPosiblesSolicitud",
  };
  console.log(datos);
  $("#listadoJefesPosibles").html("");
  let respuesta = [];
  try {
    respuesta = await $.ajax({
      type: "post",
      url: "Backend/Empleados/App.php",
      data: datos,
      dataType: "json",
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("hola 1.2");
    $("#listadoJefesPosibles").append(`
            <option value="" selected disabled> Jefes posibles </option>
        `);
    console.log("hola 1.3");
    console.log(respuesta)
    for (let i = 0; i < respuesta.length; i++) {
      console.log(respuesta[i]["NoEmpleado"]);
      $("#listadoJefesPosibles").append(`
             <option value="${respuesta[i]["NoEmpleado"]}">${respuesta[i]["DescJefe"]}</option>
        `);
    }

    let jefeAsignado = await getJefeAsignadoSolicitud();
    console.log("hola 2");
    if (jefeAsignado.length > 0) {
      $("#listadoJefesPosibles").val(jefeAsignado[0]["EmpleadoPadre"]);
    }
    $("select").formSelect();
    console.log("se va a dar clikc");
    $("#openModalJefes").click();
    console.log("se dio clikc");
  }
}
