const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const Evaluacion = urlParams.get("EV");

const titulo_Ev = document.querySelector("#titulo_Ev");
const empleado_Ev = document.querySelector("#empleado_Ev");
const dv_contentComp = document.querySelector("#contentComp");
const puesto_Ev = document.querySelector("#puesto_Ev");
const lvl_Ev = document.querySelector("#lvl_Ev");
// document.addEventListener('DOMContentLoaded', function () {
//   var stepper = new Stepper(document.querySelector('.bs-stepper'))
// })
let lastResponse;
loadAllFunctions();
async function loadAllFunctions() {
  await getGeneralEvaluacionSel();
  await getDetalleEvaluacionSel();
}
async function getDetalleEvaluacionSel() {
  let dataSend = {
    op: "getDetalleEvaluacionSel",
    idEv: Evaluacion,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    printDetalleEv(dataR);
  }
}
function printDetalleEv(dataR) {
  let contenidoHTML = "";
  let contenidoManu = "";
  let contenidoForm = "";
  let contador = 0;
  let contenidoGeneral = "";
  dataR.forEach((allC, index) => {
    console.log(allC);
    contador++;
    let contentConfig = "";
    if (allC.idTipoPregunta == 1) {
      let value = "";
      if (allC.Contestado != 0) {
        if (Number(allC.RespuestaQ)) {
          value = "checked";
        }
      }
      contentConfig = `
        <div class="col s12 m6" id="contentValues${contador}" data-typeq="1" data-answeres="${allC.idRespuestaEvaluaciones}">
          <div class="switch">
            <label>
                Falso
                <input type="checkbox" class="trueOrFalse" ${value}>
                <span class="lever"></span>
                Verdadero
            </label>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="input-field m-t-20">
                <h6>Comentarios</h6>
                <textarea  class="materialize-textarea" placeholder="Ingrese algún comentario (opcional)">${allC.Comentarios}</textarea>
              </div>
            </div>
          </div>
        </div>`;
    } else if (allC.idTipoPregunta == 2 || allC.idTipoPregunta == 4) {
      let contentAnswers = "";
      allC.Answers.forEach((answer) => {
        let value = "";
        if (allC.Contestado != 0) {
          if (
            Number(allC.RespuestaQ) ==
            Number(answer.idPreguntasPosiblesRespuestas)
          ) {
            value = "checked";
          }
        }
        contentAnswers += `
          <div class="col s12">
            <p>
              <label>
                <input type="radio" name="ans${index}" id="ans${answer.idPreguntasPosiblesRespuestas}"  data-answer="${answer.idPreguntasPosiblesRespuestas}" ${value}/>
                <span for="ans${answer.idPreguntasPosiblesRespuestas}">${answer.DescripcionRespuesta}</span>
              </label>
            </p>
          </div>
        `;
      });
      contentConfig = `
        <div class="col s12 m6" id="contentValues${contador}" data-typeq="${allC.idTipoPregunta}" data-answeres="${allC.idRespuestaEvaluaciones}">
          <div class="row">
            ${contentAnswers}
            <div class="col s12">
              <div class="input-field m-t-20">
                <h6>Comentarios</h6>
                <textarea  class="materialize-textarea" placeholder="Ingrese algún comentario (opcional)">${allC.Comentarios}</textarea>
              </div>
            </div>
          </div>
        </div>`;
    } else if (allC.idTipoPregunta == 3) {
      let value = 0;
      if (allC.Contestado != 0) {
        value = `${allC.RespuestaQ}`;
      }
      contentConfig = `
        <div class="col s12 m6" id="contentValues${contador}" data-typeq="3" data-answeres="${allC.idRespuestaEvaluaciones}">
          <span>En las preguntas de tipo rango, es necesario ingresar un valor el cual se encuentre entre el rango inicial y el rango final.</span>
          <div class="row">
            <hr>
            <div class="col s6 m3"  style="text-align:center;">
              <h6>Rango Inicial:</h6>
              <input type="number" data-typen="initial" data-range="${allC.Config.RangoInicial}" value="${allC.Config.RangoInicial}" readonly  style="text-align:center;"/>
            </div>
            <div class="col s6 m3"  style="text-align:center;">
              <h6>Rango Final:</h6>
              <input type="number" data-typen="end" data-ramge="${allC.Config.RangoFinal}" value="${allC.Config.RangoFinal}" readonly  style="text-align:center;"/>
            </div>
            <div class="col s12 m6"  style="text-align:center;">
              <h6>Ingrese el valor:</h6>
              <input type="number" class="valueRange" min="${allC.Config.RangoInicial}" value="${value}"  style="text-align:center;"/>
            </div>
            <div class="col s12">
              <div class="input-field m-t-20">
                <h6>Comentarios</h6>
                <textarea  class="materialize-textarea" placeholder="Ingrese algún comentario (opcional)">${allC.Comentarios}</textarea>
              </div>
            </div>
          </div>
        </div>`;
    }
    // else if (allC.idTipoPregunta == 4) {
    //   let contentAnswers = "";
    //   allC.Answers.forEach( answer => {
    //     contentAnswers += `
    //       <div class="col s12">
    //         <p>
    //           <label>
    //             <input type="radio" name="ans${index}" id="ans${answer.idPreguntasPosiblesRespuestas}"  data-answer="${answer.idPreguntasPosiblesRespuestas}"/>
    //             <span for="ans${answer.idPreguntasPosiblesRespuestas}">${answer.DescripcionRespuesta}</span>
    //           </label>
    //         </p>
    //       </div>
    //     `;
    //   });
    //   contentConfig = `
    //     <div class="col s12 m6" id="contentValues${contador}" data-typeq="4" data-answeres="${allC.idRespuestaEvaluaciones}">
    //       <div class="row">
    //         ${contentAnswers}
    //         <div class="col s12">
    //           <div class="input-field m-t-20">
    //             <h6>Comentarios</h6>
    //             <textarea  class="materialize-textarea" placeholder="Ingrese algún comentario (opcional)"></textarea>
    //           </div>
    //         </div>
    //       </div>
    //     </div>`;
    // }
    contenidoManu += `
      <li class="nav-item">
        <a class="nav-link" href="#res_${allC.idRespuestaEvaluaciones}">
          <div class="num">${contador}</div>
        </a>
      </li>`;
    contenidoForm += `
       <div id="res_${allC.idRespuestaEvaluaciones}" class="tab-pane" role="tabpanel" aria-labelledby="res_${allC.idRespuestaEvaluaciones}">
         <div class="row">
            <div class="col s12">
              <div class="col s12 text-center" style="text-align:justify;position:sticky">
                <p><h6 style="font-size: large;"><b>Competencia:</b>  ${allC.Competencia}</h6></p>
                <p><h6 style="font-size: large;"><b>Pregunta:</b> ${allC.Descripcion}</h6></p>
              </div>
              <div class="col s12">
                <div class="row">
                  ${contentConfig}
                </div>
              </div>
            </div>
         </div>
       </div>
    `;
  });
  contenidoGeneral += `
    <div id="smartwizard">
      <ul  class="nav">
        ${contenidoManu}
      </ul>
      <div class="tab-content">
        ${contenidoForm}
      </div>
      <div class="progress">
         <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>`;
  dv_contentComp.innerHTML = contenidoGeneral;
  $(function () {
    $("#smartwizard").smartWizard({
      selected: 0, // Initial selected step, 0 = first step
      theme: "dots", // theme for the wizard, related css need to include for other than default theme
      justified: true, // Nav menu justification. true/false
      autoAdjustHeight: true, // Automatically adjust content height
      backButtonSupport: true, // Enable the back button support
      enableUrlHash: true, // Enable selection of the step based on url hash,
      transition: {
        animation: "slideVertical", // Animation effect on navigation, none|fade|slideHorizontal|slideVertical|slideSwing|css(Animation CSS class also need to specify)
        speed: "400", // Animation speed. Not used if animation is 'css'
        easing: "", // Animation easing. Not supported without a jQuery easing plugin. Not used if animation is 'css'
        prefixCss: "", // Only used if animation is 'css'. Animation CSS prefix
        fwdShowCss: "", // Only used if animation is 'css'. Step show Animation CSS on forward direction
        fwdHideCss: "", // Only used if animation is 'css'. Step hide Animation CSS on forward direction
        bckShowCss: "", // Only used if animation is 'css'. Step show Animation CSS on backward direction
        bckHideCss: "", // Only used if animation is 'css'. Step hide Animation CSS on backward direction
      },
      toolbar: {
        position: "bottom", // none|top|bottom|both
        showNextButton: true, // show/hide a Next button
        showPreviousButton: true, // show/hide a Previous button
        extraHtml: `<button class="btn btn-success" id="btnFinish" style="${lastResponse}" onclick="dialogfinishEvaluation(${contador})">Finish</button`, // Extra html to show on toolbar
      },
      anchor: {
        enableNavigation: true, // Enable/Disable anchor navigation
        enableNavigationAlways: false, // Activates all anchors clickable always
        enableDoneState: true, // Add done state on visited steps
        markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
        unDoneOnBackNavigation: false, // While navigate back, done state will be cleared
        enableDoneStateNavigation: true, // Enable/Disable the done state navigation
      },
      keyboard: {
        keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
        keyLeft: [37], // Left key code
        keyRight: [39], // Right key code
      },
      lang: {
        // Language variables for button
        next: "Siguiente",
        previous: "Anterior",
      },
      disabledSteps: [], // Array Steps disabled
      errorSteps: [], // Array Steps error
      warningSteps: [], // Array Steps warning
      hiddenSteps: [], // Hidden steps
    });
  });
  $("#smartwizard").on(
    "leaveStep",
    function (e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
      const btnFinish = document.querySelector("#btnFinish");
      if (stepDirection === "forward") {
        let dv = `contentValues${currentStepIndex + 1}`;
        const result = validateValue(dv);
        if (result) {
          if (anchorObject.prevObject.length - 1 == nextStepIndex) {
            btnFinish.style.display = "";
          } else {
            btnFinish.style.display = "none";
          }
          return saveResultCompetence(currentStepIndex + 1);
        } else {
          return false;
        }
        return result;
      }
    }
  );
}

async function dialogfinishEvaluation(eval) {
  let dv = `contentValues${eval}`;
  const resultV = await validateValue(dv);
  if (resultV) {
    const title = "¿Desea enviar la evaluación?";
    const resultDial = await dialogConfirmSAlert(title);
    if (resultDial) {
      await finishEvaluation(eval);
    }
  }
}

async function finishEvaluation(dv) {
  const all = document.querySelector(`#contentValues${dv}`);
  const typeQ = all.dataset.typeq;
  const answerRes = all.dataset.answeres;
  const inpValue = all.querySelectorAll("input");
  console.log(inpValue.length);
  let value = "";
  if (typeQ == 4 || typeQ == 2) {
    for (var i = 0; i < inpValue.length; i++) {
      if (inpValue[i].checked) {
        value = inpValue[i].dataset.answer;
        break;
      }
    }
  } else if (typeQ == 3) {
    const inputVal = all.querySelector(".valueRange");
    value = inputVal.value;
    console.log(value);
  } else if (typeQ == 1) {
    const inputVal = all.querySelector(".trueOrFalse");
    console.log(inputVal.checked);
    value = inputVal.checked ? 1 : 0;
  }
  const inpArea = all.querySelectorAll("textarea");
  console.log(inpArea.length);
  let dataSend = {
    op: "finishEvaluation",
    value: value,
    response: answerRes,
    comentarios: inpArea[0].value,
    idResponse: Evaluacion,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    setTimeout(function () {
      window.location.href = "pending-evaluations.php";
    }, 3000);
  }
}

async function validateResultsEvaluation() {
  let dataSend = {
    op: "validateResultsEvaluation",
    ev: Evaluacion,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    return ajaxResponse.Siguiente;
  } else {
    return false;
  }
}

function saveResultCompetence(result) {
  // Cargando();
  const all = document.querySelector(`#contentValues${result}`);
  const typeQ = all.dataset.typeq;
  const answerRes = all.dataset.answeres;
  const inpValue = all.querySelectorAll("input");
  let value = "";
  if (typeQ == 4 || typeQ == 2) {
    for (var i = 0; i < inpValue.length; i++) {
      if (inpValue[i].checked) {
        value = inpValue[i].dataset.answer;
        break;
      }
    }
  } else if (typeQ == 3) {
    const inputVal = all.querySelector(".valueRange");
    value = inputVal.value;
  } else if (typeQ == 1) {
    const inputVal = all.querySelector(".trueOrFalse");
    value = inputVal.checked ? 1 : 0;
  }
  const inpArea = all.querySelectorAll("textarea");
  let dataSend = {
    op: "saveResultCompetence",
    value: value,
    response: answerRes,
    comentarios: inpArea[0].value,
  };
  $.ajax({
    type: "post",
    url: url_m_Evaluaciones,
    data: dataSend,
    dataType: "json",
    success: function (result) {
      if (!result) {
        toastr.warning("Ha ocurrido un error al evaluar la competencia.");
      }
      QuitarCargando();
      return result;
    },
    error: function (e) {
      QuitarCargando();
      console.log(e);
    },
  });
}

function validateValue(cn) {
  const all = document.querySelector(`#${cn}`);
  const typeQ = all.dataset.typeq;
  const thisVal = all.querySelectorAll("input");
  let whitVal = 0;
  if (typeQ == 1) {
    whitVal = 1;
  } else if (typeQ == 2 || typeQ == 4) {
    for (var i = 0; i < thisVal.length; i++) {
      if (thisVal[i].checked) {
        whitVal = 1;
        break;
      }
    }
  } else if (typeQ == 3) {
    const inputsRange = document.querySelectorAll("[data-typen]");
    const inputValue = document.querySelector(".valueRange");
    if (
      Number(inputValue.value) >= Number(inputsRange[0].value) &&
      Number(inputValue.value) <= Number(inputsRange[1].value)
    ) {
      whitVal = 1;
    }
  }
  let contador = 0;
  if (!whitVal) {
    toastr.info("Ingrese una calificación válida para poder continuar");
    return false;
  } else {
    return true;
  }
}

function asignarValor(Resp, val) {
  console.log(Resp);
  const inpCalif = document.querySelector(`[data-response="${Resp}"]`);
  inpCalif.value = val;
}

async function getGeneralEvaluacionSel() {
  let dataSend = {
    op: "getGeneralEvaluacionSel",
    idEv: Evaluacion,
  };
  const ajaxResponse = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);
  if (ajaxResponse !== undefined) {
    const dataR = ajaxResponse.Data;
    console.log(dataR);
    titulo_Ev.textContent = dataR.TEvaluacion;
    empleado_Ev.textContent = dataR.NombreEmpleado;
    puesto_Ev.textContent = dataR.Puesto;
    lvl_Ev.textContent = dataR.NivelEvaluado;
    if (dataR.UltimoDec == 0) {
      lastResponse = "display:none;";
    } else {
      lastResponse = "";
    }
    window.location.hash = "";
    window.location.hash = `#res_${dataR.UltimaRespuesta}`;
  }
  // let tableTab = new Tabulator("#table_general", {
  //   layout:"fitColumns",
  // });
}

// getDatosEvaluacionSelected();
// getEvaluacion();
// function getEvaluacion () {
//   datos = {
//     op: "getDetalleEvaluacion"
//   }
//   $.ajax({
//     type: "post",
//     url: "Backend/Evaluaciones/App.php",
//     data: datos,
//     success:function(response){
//       let contenido = "";
//       let NoEmpleado = "";
//       let EmpEvaluante = "";
//       const ArrCompetencias = [];
//       const ArrEvaluados = [];
//       response = JSON.parse(response.trim());
//       console.log(response);
//       response.map(AllArray => {
//         AllArray.ListCompetencias.map(Competencias => {
//            ArrCompetencias.push(Competencias);
//         });
//       });
//       EmpEvaluante = response.map(NoEmpleado => NoEmpleado.NoEmpleado);
//       response.map(AllArray => {
//         AllArray.ListColaboradores.map(Evaluados => {
//             ArrEvaluados.push(Evaluados);
//         })
//       })
//       ArrCompetencias.map(Competencia => {
//         contenido += `
//           <div class="col-12 col-lg-12" style="padding:3vh; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; width:100%; background-color:white; border-radius:15px">
//             <div class="row">
//               <div class="col-12 col-lg-12">
//                 <div class="row" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px; ">
//                   <div class="col-12 col-lg-12 text-center" style="text-align:justify;position:sticky">
//                     <p><span style="font-size: large;"><b>${Competencia.Competencia}</b></span></p>
//                   </div>
//                   <div class="col-12 col-lg-12 text-center">
//                     <p><span style="font-size: small;"><b>Significado:</b> ${Competencia.Significado}</span></p>
//                   </div>
//                   <div class="col-12 col-lg-12">
//                     <div class="contenidobox">
//                       <div class="row">
//                         <div class="col-6 col-lg-6 text-center">
//                           <p><span><b>Calificación: A</b></span></p>
//                           <p style="text-align:justify;font-size: small;"><span>${Competencia.A}</span></p>
//                         </div>
//                         <div class="col-6 col-lg-6 text-center">
//                           <p><span><b>Calificación: B</b></span></p>
//                           <p style="text-align:justify;font-size: small;"><span>${Competencia.B}</span></p>
//                         </div>
//                         <div class="col-6 col-lg-6 text-center">
//                           <p><span><b>Calificación: C</b></span></p>
//                           <p style="text-align:justify;font-size: small;"><span>${Competencia.C}</span></p>
//                         </div>
//                         <div class="col-6 col-lg-6 text-center">
//                           <p><span><b>Calificación: D</b></span></p>
//                           <p style="text-align:justify;font-size: small;"><span>${Competencia.D}</span></p>
//                         </div>
//                         <div class="col-12 col-lg-12 text-center">
//                           <p><span><b>Calificación: E</b></span></p>
//                           <p style="text-align:justify;font-size: small;"><span>${Competencia.E}</span></p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <hr>
//               </div>
//               <div class="col-12 col-lg-12 text-center">
//                 <div class="row">
//                   <div class="col-4 col-lg-4">
//                     <span><b>Evaluado</b></span>
//                   </div>
//                   <div class="col-1 col-lg-1" style="text-align:center;">
//                     <span><b>A</b></span>
//                   </div>
//                   <div class="col-1 col-lg-1" style="text-align:center;">
//                     <span><b>B</b></span>
//                   </div>
//                   <div class="col-1 col-lg-1" style="text-align:center;">
//                     <span><b>C</b></span>
//                   </div>
//                   <div class="col-1 col-lg-1" style="text-align:center;">
//                     <span><b>D</b></span>
//                   </div>
//                   <div class="col-1 col-lg-1" style="text-align:center;">
//                     <span><b>E</b></span>
//                   </div>
//                   <div class="col-3 col-lg-3" style="text-align:center;">
//                     <span><b>Comentarios</b> (opcional)</span>
//                   </div>
//         `;
//         ArrEvaluados.map(Evaluado => {
//           contenido += `
//             <div class="col-4 col-lg-4">
//               <input type="hidden" name="valCompetencia" value="${Competencia.idCompetencias}" required></input>
//               <input type="hidden" name="valNoEmpleado" value="${EmpEvaluante}" required></input>
//               <input type="text" id="CalifEval${Evaluado.NoEmpleado}Comp${Competencia.idCompetencias}" name="valCalificacion" value="" required style="display:none;"></input>
//               <input type="hidden" name="valEmpEvaluado" value="${Evaluado.NoEmpleado}" required></input>
//               <p><span>${Evaluado.Nombre}</span></p>
//             </div>
//             <div class="col-1 col-lg-1" style="text-align:center;">
//               <input type="radio" onclick="asignarValor(${Evaluado.NoEmpleado},${Competencia.idCompetencias},10)"name="radioEmp${Evaluado.NoEmpleado}Comp${Competencia.idCompetencias}" ></input>
//             </div>
//             <div class="col-1 col-lg-1" style="text-align:center;">
//               <input type="radio" onclick="asignarValor(${Evaluado.NoEmpleado},${Competencia.idCompetencias},8)"name="radioEmp${Evaluado.NoEmpleado}Comp${Competencia.idCompetencias}" ></input>
//             </div>
//             <div class="col-1 col-lg-1" style="text-align:center;">
//               <input type="radio" onclick="asignarValor(${Evaluado.NoEmpleado},${Competencia.idCompetencias},6)"name="radioEmp${Evaluado.NoEmpleado}Comp${Competencia.idCompetencias}" ></input>
//             </div>
//             <div class="col-1 col-lg-1" style="text-align:center;">
//               <input type="radio" onclick="asignarValor(${Evaluado.NoEmpleado},${Competencia.idCompetencias},4)"name="radioEmp${Evaluado.NoEmpleado}Comp${Competencia.idCompetencias}" ></input>
//             </div>
//             <div class="col-1 col-lg-1" style="text-align:center;">
//               <input type="radio" onclick="asignarValor(${Evaluado.NoEmpleado},${Competencia.idCompetencias},2)"name="radioEmp${Evaluado.NoEmpleado}Comp${Competencia.idCompetencias}" ></input>
//             </div>
//             <div class="col-3 col-lg-3" style="text-align:center;">
//               <input type="text"  name="ContenidoComentarios" placeholder="Ingrese un comentario"></input>
//             </div>
//           `;
//         });
//         contenido +=`
//               </div>
//             </div>
//           </div>
//         </diV>
//         <hr>
//         `
//       });
//
//       $("#ContenedorEvaluacion").html(contenido);
//     },error:function(e){
//       alert(e.responseText);
//     }
//   });
// }
// function asignarValor (Eval,Comp,Valor) {
//   $("#CalifEval"+Eval+"Comp"+Comp).val(Valor);
// }
//
// $("#EnviarFormulario").click(async function(){
//     if (document.getElementById("FormEnviaFormulario").checkValidity()){
//       event.preventDefault();
//       var form = await  $("#FormEnviaFormulario");
//       var data = form.serializeArray();
//       let dataString = JSON.stringify(data);
//       let datos = await {
//         op: "respondeEvaluacion",
//         idEvaluaciones: Evaluacion,
//         registros: dataString
//       };
//       console.log(dataString);
//       let respuesta = "";
//         try {
//             respuesta = await $.ajax({
//                 type: "post",
//                 url: "Backend/Evaluaciones/App.php",
//                 data: datos,
//             });
//         } catch (error) {
//             console.log(error);
//         } finally {
//             if (respuesta == "1") {
//                 toastr.success("Datos Guardados con exito");
//                 setTimeout(function () {
//                   window.location.href=`Evaluaciones.php`;
//                 }, 1500);
//               }else {
//                 toastr.info("No Guardado");
//               }
//         }
//   }else {
//     toastr.info("Ingrese todos los datos");
//   }
// });
//
//  function getDatosEvaluacionSelected () {
//    datos = {
//      op: "getDatosEvaluacionSelected",
//      idEvaluaciones: Evaluacion
//    }
//    $.ajax({
//      type: "post",
//      url: "Backend/Evaluaciones/App.php",
//      data: datos,
//      success:function(response){
//        response = JSON.parse(response.trim());
//        $("#tituloEvaluacion").html("Evaluación: "+response[0]["Titulo"]);
//      },error:function(e){
//        alert(e.responseText);
//      }
//    });
//  }
