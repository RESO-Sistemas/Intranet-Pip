lodadDetallesEmpleadoLogeado();
async function lodadDetallesEmpleadoLogeado () {
    let datos = await {
        op: "getDetallesEmpleadoLogeado"
    }
    respuesta = [];
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
        let urlImageEmpleado = "";
        respuesta.forEach(empleado => {
            console.log(respuesta);
            if (empleado.Imagen === null) {
                urlImageEmpleado = "assets/Klyns.png";
            } else {
                urlImageEmpleado = `Archivos/ImgEmpleados/${empleado.NoEmpleado}/${empleado.Imagen}`;
            }
            $("#ImgEmpleadoDetalle").attr("src",urlImageEmpleado);
            $("#EmailEmpleadoDetalle").html(`${empleado.Email}`);
            $("#CelularEmpleadoDetalle").html(`${empleado.Movil}`);
            $("#PuestoEmpleadoDetalle").html(`${empleado.Puesto}`);
            $("#NombreEmpleadoDetalle").html(`${empleado.Nombre}`);
        });
    }
}
