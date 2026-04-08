// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const puesto = urlParams.get("Puesto");
getPermisos();

// function getPermisos() {
//   const datos = {
//     op: "getPermisos",
//     IdPuesto: puesto,
//   };

//   $.ajax({
//     type: "post",
//     url: "Backend/Empleados/App.php",
//     data: datos,
//     success: function (response) {
//       response = JSON.parse(response.trim());
//       console.log(response);

//       let menusPadres = [];
//       let contenido = "";
//       let contenedor = $("#ContenedorPermisos");
//       let fondo = "";
//       let fondoHijo = "";

//       // Filtrar menús padres
//       response.forEach((Menus) => {
//         if (Menus.Id_Padre == 0) {
//           menusPadres.push(Menus);
//         }
//       });

//       // Generar HTML para cada menú padre
//       menusPadres.forEach((MPadre) => {
//         fondo = MPadre.Activo == 1 ? "#4bad48e8" : "#ff4857";

//         contenido += `
//           <div class="col-12 col-md-6 mb-4" style="padding:5vh;
//                box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
//                            rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
//                            rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
//               border-radius: 15px;
//               max-height: 400px;  /* Ajusta la altura máxima */
//             overflow-y: auto;">
//             <div class="row g-2">
//               <div class="col-12 text-center mb-2" >
//                 <button onclick="realizarAccion(${MPadre.id_menu})"
//                         class="btn w-100"
//                         style="height:auto; background-color:${fondo}; color:#fff; border:1px solid #37474F; border-radius:15px;">
//                   ${MPadre.Descripcion}
//                 </button>
//               </div>
//               <div class="row g-2">
//         `;

//         // Generar HTML para cada hijo del menú
//         response.forEach((MHijo) => {
//           if (MPadre.id_menu == MHijo.Id_Padre) {
//             fondoHijo = MHijo.Activo == 1 ? "#4bad48" : "#ff4857";

//             contenido += `
//               <div class="col-12 text-center mb-2">
//                 <button onclick="realizarAccion(${MHijo.id_menu})"
//                         class="btn w-100"
//                         style="background-color:${fondoHijo}; color:#fff;
//                                box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px,
//                                            rgba(0, 0, 0, 0.09) 0px 4px 2px,
//                                            rgba(0, 0, 0, 0.09) 0px 8px 4px,
//                                            rgba(0, 0, 0, 0.09) 0px 16px 8px,
//                                            rgba(0, 0, 0, 0.09) 0px 32px 16px;
//                                border-radius:15px;">
//                   ${MHijo.Descripcion}
//                 </button>
//               </div>
//             `;
//           }
//         });

//         contenido += `
//               </div>
//             </div>
//           </div>
//         `;
//       });

//       contenedor.html(contenido);
//     },
//     error: function (e) {
//       alert(e.responseText);
//     },
//   });
// }

function getPermisos() {
  const datos = {
    op: "getPermisos",
    IdPuesto: puesto,
  };

  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: datos,
    success: function (response) {
      response = JSON.parse(response.trim());
      console.log(response);

      let menusPadres = [];
      let contenido = "";
      let contenedor = $("#ContenedorPermisos");

      // Filtrar menús padres
      response.forEach((Menus) => {
        if (Menus.Id_Padre == 0) {
          menusPadres.push(Menus);
        }
      });

      // Generar HTML para cada menú padre
      menusPadres.forEach((MPadre) => {
        let checkedPadre = MPadre.Activo == 1 ? "checked" : "";

        contenido += `
          <div class="p-4 d-flex flex-wrap" 
               style="width:100%; box-shadow: rgba(0,0,0,0.1) 0px 2px 8px; border-radius: 12px;">
            
              <!-- Switch padre -->
              <div class="form-check form-switch w-100">
                <input class="form-check-input" type="checkbox" id="switchPadre-${MPadre.id_menu}" 
                      ${checkedPadre} onclick="realizarAccion(${MPadre.id_menu})">
                <label class="form-check-label fw-bold" for="switchPadre-${MPadre.id_menu}">
                  ${MPadre.Descripcion}
                </label>
              </div>

              <!-- Línea separadora -->
              <hr class="w-100" style="border-top:1px solid rgba(0,0,0,0.1);">

            
            <!-- Switches hijos distribuidos -->
            <div class="d-flex flex-wrap gap-3">
        `;

        response.forEach((MHijo) => {
          if (MPadre.id_menu == MHijo.Id_Padre) {
            let checkedHijo = MHijo.Activo == 1 ? "checked" : "";

            contenido += `
              <div class="form-check form-switch" style="flex: 1 1 300px;">
                <input class="form-check-input" type="checkbox" id="switchHijo-${MHijo.id_menu}" 
                       ${checkedHijo} onclick="realizarAccion(${MHijo.id_menu})">
                <label class="form-check-label" for="switchHijo-${MHijo.id_menu}">
                  ${MHijo.Descripcion}
                </label>
              </div>
            `;
          }
        });

        contenido += `
            </div> <!-- Fin hijos -->
          </div> <!-- Fin carta -->
        `;
      });

      contenedor.html(contenido);
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}

function realizarAccion(Menu) {
  datos = {
    op: "updatePersmisosEmpleado",
    id_menu: Menu,
    IdPuesto: puesto,
  };
  $.ajax({
    type: "post",
    url: "Backend/Empleados/App.php",
    data: datos,
    success: function (response) {
      if (response == 1) {
        // toastr.success("Permisos Actualizados");
        const messageContent = `
          <div class="alert-content">
             <span class="alert-title">Completado!</span>
              <span class="alert-text">Permisos Actualizados.</span>
          </div>`;
        showBootstrapAlertSuc(messageContent, "top-right", 5000);
        // getPermisos(); // Se comenta para evitar re-renderizado innecesario y parpadeo
      } else {
        // toastr.info("Error al actualizar los permisos");
        const messageContent = `
        <div class="alert-content">
             <span class="alert-title">Información!</span>
              <span class="alert-text">Error al actualizar los permisos.</span>
        </div>`;
        showBootstrapAlert(messageContent, "top-right", 5000);
      }
    },
    error: function (e) {
      alert(e.responseText);
    },
  });
}
