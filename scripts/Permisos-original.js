const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const puesto = urlParams.get('Puesto');
getPermisos();
function getPermisos(){
  datos = {
    op: "getPermisos",
    IdPuesto: puesto
  }
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: datos,
    success:function(response){
      response = JSON.parse(response.trim());
      console.log(response);
      let menusPadres = [];
      let contenido = "";
      let contenedor = $("#ContenedorPermisos");
      let fondo = "";
      let fondoHijo = "";
      response.map(Menus => {
        if (Menus.Id_Padre == 0) {
          menusPadres.push(Menus);
        }
      });
      menusPadres.map(MPadre => {
        if (MPadre.Activo == 0) {
          fondo = "#F5F5F5";
        }else if (MPadre.Activo == 1) {
          fondo = "#AED581";
        }
        contenido += `
          <div class="col s12 l6" style="padding:5vh; box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;">
            <div class="row contenidobox">
              <div class="col s12 l12">
                <button onclick="realizarAccion(${MPadre.id_menu})" class="btn" style="width:100%;height:auto; background-color:${fondo}; color:#34495E; border: 2px solid #37474F; border-radius:15px">${MPadre.Descripcion}</button>
              </div>
              <div class="row" >
        `;
        response.map(MHijo => {
          if (MPadre.id_menu == MHijo.Id_Padre) {
            if (MHijo.Activo == 0) {
              fondoHijo = "#F5F5F5";
            }else if (MHijo.Activo == 1) {
              fondoHijo = "#AED581";
            }
            contenido +=`
            <div class="col s12 l12" style="text-align:center;margin-top:1vh;">
              <button onclick="realizarAccion(${MHijo.id_menu})" class="btn Opciones" style=" background-color:${fondoHijo}; color:#34495E;box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px; ; border-radius:15px">${MHijo.Descripcion}</button>
            </div>
            `;
          }
        })
        contenido += `
              </div>
            </div>
          </div>
        `;
      });

      contenedor.html(contenido);
    }, error:function(e){
      alert(e.responseText);
    }
  });
}

function realizarAccion(Menu){
  datos = {
    op: "updatePersmisosEmpleado",
    id_menu: Menu,
    IdPuesto: puesto
  }
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: datos,
    success:function(response){
      if (response == 1) {
        toastr.success("Permisos Actualizados");
        getPermisos();
      }else {
        toastr.info("Error al actualizar los permisos");
      }
    },error:function(e){
      alert(e.responseText);
    }
  });
}
