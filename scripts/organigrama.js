// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

ej.base.registerLicense(

  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE="

);



const imgEmpSelected = document.getElementById("imgFotoEmp");

const nameEmpSelected = document.getElementById("nameEmpS");

const puestoEmpSelected = document.getElementById("puestoEmpS");

const emailEmpSelected = document.getElementById("emailEmpS");

getDatosOrganigramas();



// async function getDatosOrganigramas() {

//   let datos = await {

//     op: "getDatosOrganigramas",

//   };

//   let respuesta = [];

//   try {

//     respuesta = await $.ajax({

//       type: "post",

//       url: "Backend/Organigramas/App.php",

//       data: datos,

//       dataType: "json",

//     });

//   } catch (error) {

//     console.log(error);

//   } finally {

//     respuesta.forEach((datos) => {

//       datos.Organigrama.forEach((Organigramas) => {

//         $("#contenidoOrganigramas").append(`

//                     <div class="col s12 l12" style="box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; border-radius:15px; margin-top:5vh;padding:2vh">

//                         <div class="row">

//                             <div class="col s12 l12" style="text-align:center">

//                                 <h2>Organigrama: ${Organigramas.Titulo}</h2>

//                             </div>

//                             <div class="col s12 l12 FondoOrg" id="divOrg${Organigramas.idOrganigramas}"style="overflow-x:scroll;width:100%; height:100vh;"></div>

//                         </div>

//                     </div>

//                 `);

//         let DatosOrganigrama = [];

//         datos.RegistrosOrganigrama.forEach( d => {

//           if (d.EsDe == Organigramas.idOrganigramas) {

//             if (d.idDetalleOrganigramaPadre == 0) {

//               DatosOrganigrama.push({

//                 'id': `'${d.idDetalleOrganigrama}'`,

//                 'name': `${d.Nombre}`,

//                 'role': `${d.Puesto}`,

//                 'offsetY': Number(d.CoordenadaY),

//                 'offsetX': Number(d.CoordenadaX),

//                 'imageUrl': `${d.Imagen}`,

//                 'Width': Number(d.Ancho),

//                 'Height': Number(d.Altura),

//                 "Emp": `'${d.EMPH}'`,

//                 "email": `${d.Email}`,

//                 color: '#71AF17',

//                 constraints: ej.diagrams.NodeConstraints.Default & ~ ej.diagrams.NodeConstraints.Resize

//                 // constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select

//               });

//             } else {

//               DatosOrganigrama.push({

//                 'id': `'${d.idDetalleOrganigrama}'`,

//                 'name': `${d.Nombre}`,

//                 'role': `${d.Puesto}`,

//                 'offsetY': Number(d.CoordenadaY),

//                 'offsetX': Number(d.CoordenadaX),

//                 'imageUrl': `${d.Imagen}`,

//                 'manager': `'${d.idDetalleOrganigramaPadre}'`,

//                 'Width': Number(d.Ancho),

//                 'Height': Number(d.Altura),

//                 "Emp": `'${d.EMPH}'`,

//                 "email": `${d.Email}`,

//                 color: 'red',

//                 constraints: ej.diagrams.NodeConstraints.Default & ~ ej.diagrams.NodeConstraints.Resize

//                 // constraints: ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.Shadow,



//                 // constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select

//               });

//             }

//           }

//         });

//         loadOrganigrama(Organigramas.idOrganigramas, DatosOrganigrama);

//       });

//     });

//   }

// }

// async function getDatosOrganigramas() {

//   let datos = await {

//     op: "getDatosOrganigramas",

//   };

//   let respuesta = [];

//   try {

//     respuesta = await $.ajax({

//       type: "post",

//       url: "Backend/Organigramas/App.php",

//       data: datos,

//       dataType: "json",

//     });

//   } catch (error) {

//     console.log(error);

//   } finally {

//     respuesta.forEach((datos) => {

//       datos.Organigrama.forEach((Organigramas) => {

//         $("#contenidoOrganigramas").append(`

// <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="margin-top: 5vh; border-radius: 15px !important;">

//     <div class="card-body">

//         <div class="row">

//             <div class="col-12 text-center">

//                 <h2 class="mb-4">Organigrama: ${Organigramas.Titulo}</h2>

//             </div>

//             <div class="col-12">

//                 <div class="table-responsive">

//                     <div class="FondoOrg" id="divOrg${Organigramas.idOrganigramas}" style="overflow-x: auto; width: 100;"></div>

//                 </div>

//             </div>

//         </div>

//     </div>

// </div>

//                 `);

//         let DatosOrganigrama = [];

//         datos.RegistrosOrganigrama.forEach((d) => {

//           if (d.EsDe == Organigramas.idOrganigramas) {

//             if (d.idDetalleOrganigramaPadre == 0) {

//               DatosOrganigrama.push({

//                 id: `'${d.idDetalleOrganigrama}'`,

//                 name: `${d.Nombre}`,

//                 role: `${d.Puesto}`,

//                 offsetY: Number(d.CoordenadaY),

//                 offsetX: Number(d.CoordenadaX),

//                 imageUrl: `${d.Imagen}`,

//                 Width: Number(d.Ancho),

//                 Height: Number(d.Altura),

//                 Emp: `'${d.EMPH}'`,

//                 email: `${d.Email}`,

//                 color: "#71AF17",

//                 constraints:

//                   ej.diagrams.NodeConstraints.Default &

//                   ~ej.diagrams.NodeConstraints.Resize,

//                 // constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select

//               });

//             } else {

//               DatosOrganigrama.push({

//                 id: `'${d.idDetalleOrganigrama}'`,

//                 name: `${d.Nombre}`,

//                 role: `${d.Puesto}`,

//                 offsetY: Number(d.CoordenadaY),

//                 offsetX: Number(d.CoordenadaX),

//                 imageUrl: `${d.Imagen}`,

//                 manager: `'${d.idDetalleOrganigramaPadre}'`,

//                 Width: Number(d.Ancho),

//                 Height: Number(d.Altura),

//                 Emp: `'${d.EMPH}'`,

//                 email: `${d.Email}`,

//                 color: "red",

//                 constraints:

//                   ej.diagrams.NodeConstraints.Default &

//                   ~ej.diagrams.NodeConstraints.Resize,

//                 // constraints: ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.Shadow,



//                 // constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select

//               });

//             }

//           }

//         });

//         loadOrganigrama(Organigramas.idOrganigramas, DatosOrganigrama);

//       });

//     });

//   }

// }



async function getDatosOrganigramas() {

  let datos = await {

    op: "getDatosOrganigramas",

  };

  let respuesta = [];

  try {

    respuesta = await $.ajax({

      type: "post",

      url: "Backend/Organigramas/App.php",

      data: datos,

      dataType: "json",

    });

  } catch (error) {

    console.log(error);

  } finally {

    let contentFinalHtml = "";



    respuesta.forEach((datos, index) => {

      datos.Organigrama.forEach((Organigramas, subIndex) => {

        const collapseId = `collapseOrg${Organigramas.idOrganigramas}`;

        const headingId = `headingOrg${Organigramas.idOrganigramas}`;



        contentFinalHtml += `

          <div class="accordion-item">

            <h2 class="accordion-header" id="${headingId}">

              <button class="accordion-button collapsed" type="button" 

                data-bs-toggle="collapse" data-bs-target="#${collapseId}" 

                aria-expanded="false" aria-controls="${collapseId}">

                <span class="material-symbols-outlined me-2">account_tree</span>

                Organigrama: ${Organigramas.Titulo}

              </button>

            </h2>

            <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#contenidoOrganigramas">

              <div class="accordion-body">

                <div class="table-responsive">

                  <div class="FondoOrg" id="divOrg${Organigramas.idOrganigramas}" 

                       style="overflow-x: auto; width: 100%;"></div>

                </div>

              </div>

            </div>

          </div>

        `;



        // Datos para cada organigrama

        let DatosOrganigrama = [];

        datos.RegistrosOrganigrama.forEach((d) => {

          if (d.EsDe == Organigramas.idOrganigramas) {

            if (d.idDetalleOrganigramaPadre == 0) {

              DatosOrganigrama.push({

                id: `'${d.idDetalleOrganigrama}'`,

                name: `${d.Nombre}`,

                role: `${d.Puesto}`,

                offsetY: Number(d.CoordenadaY),

                offsetX: Number(d.CoordenadaX),

                imageUrl: `${d.Imagen}`,

                Width: Number(d.Ancho),

                Height: Number(d.Altura),

                Emp: `'${d.EMPH}'`,

                email: `${d.Email}`,

                color: "#71AF17",

                constraints:

                  ej.diagrams.NodeConstraints.Default &

                  ~ej.diagrams.NodeConstraints.Resize,

              });

            } else {

              DatosOrganigrama.push({

                id: `'${d.idDetalleOrganigrama}'`,

                name: `${d.Nombre}`,

                role: `${d.Puesto}`,

                offsetY: Number(d.CoordenadaY),

                offsetX: Number(d.CoordenadaX),

                imageUrl: `${d.Imagen}`,

                manager: `'${d.idDetalleOrganigramaPadre}'`,

                Width: Number(d.Ancho),

                Height: Number(d.Altura),

                Emp: `'${d.EMPH}'`,

                email: `${d.Email}`,

                color: "#ffc107",

                constraints:

                  ej.diagrams.NodeConstraints.Default &

                  ~ej.diagrams.NodeConstraints.Resize,

              });

            }

          }

        });



        // Renderiza el organigrama cuando se expanda

        setTimeout(() => {

          loadOrganigrama(Organigramas.idOrganigramas, DatosOrganigrama);

        }, 200);

      });

    });



    // Render final del accordion en el contenedor

    $("#contenidoOrganigramas").html(`

      <div class="accordion" id="accordionOrganigramas">

        ${contentFinalHtml}

      </div>

    `);

  }

}



async function loadOrganigrama(Organigrama, Datos) {

  let contadorRegistros = 0;

  if (Datos !== undefined || Datos.length > 0) {

    let items = new ej.data.DataManager(Datos);



    let diagram = new ej.diagrams.Diagram({

      width: "100%",

      height: "600px",

      dataSourceSettings: {

        // set the unique field from data source

        id: "id",

        // set the field which is used to identify the reporting person

        parentId: "manager",

        // define the employee data

        dataManager: items,

        doBinding: function (node, data) {

          // You will get the employee information in data argument and bind that value directly to node's built-in properties.

          node.annotations = [{ content: "" }];

          node.style = { fill: data.color, strokeColor: data.color, strokeWidth: 2 };

        },

      },

      tool:

        ej.diagrams.DiagramTools.DrawOnce | ej.diagrams.DiagramTools.ZoomPan,

      getNodeDefaults: nodeDefaults,

      getConnectorDefaults: connectorDefaults,

      setNodeTemplate: setNodeTemplate,

      click: eventClick,

      // hide the gridlines in the diagram

    });

    diagram.appendTo(`#divOrg${Organigrama}`);

  }

}



function eventClick(args) {

  if (args.name == "click" && args.actualObject !== undefined) {

    console.log(args);

    let det = args.element.data.Emp;

    let detFormat = det.replace("'", "");

    let detformatF = detFormat.replace("'", "");



    if (detformatF == "MA==") {

      // toastr.info(

      //   "No es posible obtener la información del elemento seleccionado."

      // );

      const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No es posible obtener la información del elemento seleccionado.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    } else {

      // Llenar los datos

      const img = args.element.data.imageUrl;

      const nombre = args.element.data.name;

      const puesto = args.element.data.role;

      const email = args.element.data.email;



      // Mostrar modal con SweetAlert2

      Swal.fire({

        title: "Detalle del empleado",

        html: `

          <div style="text-align: center;">

            <img src="${img}" alt="Empleado" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;">

            <h5 style="margin: 10px 0;">${nombre}</h5>

            <p style="margin: 5px 0;"><strong>Puesto:</strong> ${puesto}</p>

            <p style="margin: 5px 0;"><strong>E-mail:</strong> ${email}</p>

          </div>

        `,

        showCloseButton: true,

        focusConfirm: false,

        confirmButtonText: "Cerrar",

        customClass: {

          popup: "swal-wide",

          confirmButton: "btn btn-primary",

        },

        buttonsStyling: false,

      });

    }

  }

}



// function eventClick(args) {

//   if (args.name == "click" && args.actualObject !== undefined) {

//     console.log(args);

//     let det = args.element.data.Emp;

//     let detFormat = det.replace("'", "");

//     let detformatF = detFormat.replace("'", "");



//     if (detformatF == "MA==") {

//       toastr.info(

//         "No es posible obtener la información del elemento seleccionado."

//       );

//     } else {

//       // getDatosEmpleado(detformatF);

//       imgEmpSelected.src = args.element.data.imageUrl;

//       nameEmpSelected.innerHTML = args.element.data.name;

//       puestoEmpSelected.innerHTML = `PUESTO: ${args.element.data.role}`;

//       emailEmpSelected.innerHTML = `E-MAIL: ${args.element.data.email}`;

//       let dv = "cDetEmp";

//       if (!alertify[dv]) {

//         alertify[dv] ||

//           alertify.dialog(`${dv}`, function () {

//             return {

//               main: function (content) {

//                 this.setContent(content);

//               },

//               build: function () {

//                 this.setHeader("Detalle del empleado");

//               },

//               setup: function () {

//                 return {

//                   focus: {

//                     element: function () {

//                       return this.elements.body.querySelector(

//                         this.get("selector")

//                       );

//                     },

//                     select: true,

//                   },

//                   options: {

//                     resizable: false,

//                     maximizable: false,

//                     padding: true,

//                     startMaximized: false,

//                   },

//                 };

//               },

//               settings: {

//                 selector: undefined,

//               },

//             };

//           });

//       }

//       alertify[dv]($(`#${dv}`)[0]);

//     }

//   }

// }



// async function getDatosEmpleado(val){

//   if (val === undefined) {

//     val = "0";

//   }

//   let datos = {

//     op: "getDatosEmpleadosOrganigrama",

//     NoEmpleado: val

//   };

//   const ajaxResponse = await pAjaxAsync(url_m_Empleados, datos, 0);

//   $("#cDetEmp").modal("open");

//   console.log(ajaxResponse);

// }



function nodeDefaults(node) {

  node.annotations[0].style.color = "white";

  node.offsetX = node.data.offsetX;

  node.offsetY = node.data.offsetY;

  node.width = node.data.Width;

  node.height = node.data.Height;

  return node;

}



function connectorDefaults(connector) {

  connector.type = "Orthogonal";

  connector.targetDecorator = { shape: "None" };

  connector.style = { strokeColor: "#ffc107", strokeWidth: 2 };

  return connector;

}

//Funtion to add the Template of the Node.

function setNodeTemplate(obj, diagram) {

  // create the stack panel

  var content = new ej.diagrams.StackPanel();

  content.id = obj.id + "_outerstack";

  content.orientation = "Horizontal";

  content.style.strokeColor = "#ffc107";

  content.padding = { left: 10, right: 10, top: 20, bottom: 5 };



  // create the image element to map the image data from the data source

  var image = new ej.diagrams.ImageElement();

  image.id = obj.id + "_pic";

  image.width = 50;

  image.height = 50;

  image.style.strokeColor = "none";

  image.source = obj.data.imageUrl;



  // create the stack panel to append the text elements.

  var innerStack = new ej.diagrams.StackPanel();

  innerStack.style.strokeColor = "none";

  innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };

  innerStack.id = obj.id + "_innerstack";



  // create the text element to map the Name data from the data source

  var text = new ej.diagrams.TextElement();

  text.style.bold = true;

  text.id = obj.id + "_name";

  text.content = obj.data.name;



  // create the text element to map the designation data from the data source

  var desigText = new ej.diagrams.TextElement();

  desigText.id = obj.id + "_desig";

  desigText.content = obj.data.role;



  // append the text elements

  innerStack.children = [text, desigText];



  // append the image and inner stack elements

  content.children = [image, innerStack];

  return content;

}

