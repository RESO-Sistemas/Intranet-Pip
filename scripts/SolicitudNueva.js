// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

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
  // Validar fechas antes de continuar
  if (!validarFechas()) {
    return false;
  }
  
  let resultV = await verifyInputs("card_contentVal");
  if (resultV) {
    let FechaInicio = $("#FechaInicio").val();
    // let diasDisponibles = $("#CantidadDiasDisp").val();
    let FechaFin = $("#FechaFin").val();
    let ComentariosSolicitud = $("#MotivoSolicitud").val();
    
    // Validación adicional de fechas vacías
    if (!FechaInicio || !FechaFin) {
      const messageContent = `
        <div class="alert-content">
          <span class="alert-title">Alerta!</span>
          <span class="alert-text">Debes seleccionar las fechas de inicio y fin.</span>
        </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
      return false;
    }
    
    if (glbDiasDisponibles == 0) {
      // toastr.warning(
      //   "No puedes enviar tu solicitud debido a que no tienes disponibilidad de días restantes."
      // );
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">No puedes enviar tu solicitud debido a que no tienes disponibilidad de días restantes.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
      return false;
    }
    if (cantidadDias == "0") {
      // toastr.warning("Fechas no admitidas");
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">Fechas no admitidas.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
      return false;
    }
    if (cantidadDias > glbDiasDisponibles) {
      // toastr.warning(
      //   "No puedes superar tu límite de días disponibles. Por favor cambie las fechas."
      // );
      const messageContent = `
            <div class="alert-content">
             <span class="alert-title">Alerta!</span>
              <span class="alert-text">No puedes superar tu límite de días disponibles. Por favor cambie las fechas.</span>
            </div>`;
      showBootstrapAlertWar(messageContent, "top-right", 5000);
      return false;
    }
    if (ComentariosSolicitud == "") {
      // toastr.info(
      //   "Es necesario ingresar una descripción para poder continuar."
      // );
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Es necesario ingresar una descripción para poder continuar.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
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
          // toastr.success("Solicitud enviada");
          console.log(response);
          const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Solicitud enviada.</span>
          </div>`;
          showBootstrapAlertSuc(messageContent, "top-right", 5000);
          setTimeout(function () {
            window.location.href = `SolicitudVacaciones.php`;
          }, 1000);
        } else if (response == "errorJefe") {
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Actualmente no puedes solicitar tus vacaciones porque ningún empleado puede aprobártelas.</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
          setTimeout($.unblockUI, 1000);
          console.log("no hay jefes");
          // No abrir modal si no hay jefes disponibles
        } else if (response == "errorFirma") {
          // toastr.info(
          //   "Actualiza tu firma Por Favor antes de enviar la solicitud."
          // );
          const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Actualiza tu firma Por Favor antes de enviar la solicitud.</span>
        </div>`;
          showBootstrapAlert(messageContent, "top-right", 5000);
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
  establecerFechaMinima();
});

// Establecer fecha mínima = hoy
function establecerFechaMinima() {
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('FechaInicio').setAttribute('min', hoy);
  document.getElementById('FechaFin').setAttribute('min', hoy);
}

// Validar que las fechas sean lógicas
function validarFechas() {
  const fechaInicio = document.getElementById('FechaInicio').value;
  const fechaFin = document.getElementById('FechaFin').value;
  const hoy = new Date().toISOString().split('T')[0];
  
  // Validar que fecha inicio no sea menor a hoy
  if (fechaInicio && fechaInicio < hoy) {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Alerta!</span>
        <span class="alert-text">La fecha de inicio no puede ser anterior al día de hoy.</span>
      </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
    document.getElementById('FechaInicio').value = '';
    return false;
  }
  
  // Si hay fecha inicio, actualizar el mínimo de fecha fin
  if (fechaInicio) {
    document.getElementById('FechaFin').setAttribute('min', fechaInicio);
  }
  
  // Validar que fecha fin no sea menor a fecha inicio
  if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
    const messageContent = `
      <div class="alert-content">
        <span class="alert-title">Alerta!</span>
        <span class="alert-text">La fecha de fin no puede ser anterior a la fecha de inicio.</span>
      </div>`;
    showBootstrapAlertWar(messageContent, "top-right", 5000);
    document.getElementById('FechaFin').value = '';
    return false;
  }
  
  return true;
}

function getDiasSeleccionados() {
  let diasValidos = [];
  let divicion = [];
  if ($("#FechaInicio").val() == "" || $("#FechaFin").val() == "") {
    return false;
  }
  if ($("#daysBreak").val().length > 6) {
    // toastr.info("Días de descanso seleccionados no válidos.");
    const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Días de descanso seleccionados no válidos..</span>
        </div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
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
      // toastr.success("Jefe Actualizado");
      const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">$Jefe Actualizado.</span>
          </div>`;
      showBootstrapAlertSuc(messageContent, "top-right", 5000);
    } else {
      // toastr.info("ERROR");
      const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error.</span>
        </div>`;
      showBootstrapAlert(messageContent, "top-right", 5000);
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
    console.log(respuesta);
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
    // Removed formSelect() - Materialize CSS method not compatible with Bootstrap
    console.log("se va a dar clikc");
    $("#openModalJefes").click();
    console.log("se dio clikc");
  }
}
