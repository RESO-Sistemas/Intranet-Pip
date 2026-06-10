


const myKeysValues = window.location.search;

const urlParams = new URLSearchParams(myKeysValues);

const e_valuation = urlParams.get('Ev');

let _dataQuestions = [],

    _dataQuestionsSaved = [],

    _typeQuestions = [],

    _allCompetences = [];

// Índice de la pregunta cuyo tipo se está cambiando (null = creando nueva)
let _changingQuestionIndex = null;

let contentOptions = "abcdefghijklmnopqrstuvwxyz";

const sel_lvlOld = document.getElementById('sel_lvlOld');

loadInitialFunctions();

let _currentEvaluation = null;

async function loadInitialFunctions(){

  await getCurrentEvaluation();

  getQuestionTypes();

  getCompetencesActive();

  getLevelsEmployees();

  getQuestionsPerEvaluation();

}

async function getCurrentEvaluation() {

  const dataSend = {
    op: "getEvaluationById",
    idEvaluacion: e_valuation,
  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if (ajaxR !== undefined && ajaxR.Resultado === true) {
    _currentEvaluation = ajaxR.Data;
    // Aplicar modo bloqueado si la evaluación ya fue publicada
    applyReadOnlyModeIfPublished(_currentEvaluation);
  }

}

/**
 * Activa el modo solo lectura si la evaluación está publicada (Activado == 1).
 * Muestra un banner informativo, oculta botones de edición y deshabilita inputs.
 */
function applyReadOnlyModeIfPublished(evaluation) {
  if (!evaluation) return;
  const isPublished = String(evaluation.Activado) === "1";
  if (!isPublished) return;

  // Agregar clase al body para que el CSS bloquee la UI
  document.body.classList.add('evq-locked');

  // Mostrar banner informativo
  const banner = document.getElementById('evqAlertBanner');
  const bannerText = document.getElementById('evqAlertText');
  if (banner && bannerText) {
    banner.className = 'evq-alert-banner locked';
    bannerText.innerHTML = '<strong>Evaluación publicada.</strong> Esta evaluación ya está activa para los usuarios. Las preguntas no se pueden modificar para mantener la integridad de los resultados.';
    banner.style.display = 'flex';
  }

  // Aplicar deshabilitación a elementos ya renderizados
  disableAllQuestionInputs();
}

/**
 * Deshabilita todos los inputs, selects y textareas dentro del contenedor de preguntas.
 * Se llama después de renderizar preguntas y al detectar modo publicado.
 */
function disableAllQuestionInputs() {
  if (!document.body.classList.contains('evq-locked')) return;

  const allInputs = document.querySelectorAll('#contentQuestions input, #contentQuestions textarea, #contentQuestions select');
  allInputs.forEach(el => {
    el.disabled = true;
    el.setAttribute('readonly', 'readonly');
  });

  // Deshabilitar Select2 (competencias inline)
  if (typeof $ !== 'undefined') {
    $('.sel-competence-inline').prop('disabled', true);
    try {
      $('.sel-competence-inline').select2('destroy');
    } catch (e) { /* Select2 podría no estar inicializado */ }
  }

  // Ocultar botones de guardar individuales en tarjetas
  document.querySelectorAll('.evq-icon-btn.save').forEach(btn => {
    btn.style.display = 'none';
  });
}



async function getQuestionsPerEvaluation(){

  console.log("getQuestionsPerEvaluation - Iniciando carga de preguntas para evaluación:", e_valuation);

  const dataSend = {

    op: "getQuestionsPerEvaluation",

    evaluation: e_valuation

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if (ajaxR !== undefined && ajaxR.Resultado === true) {

    console.log("getQuestionsPerEvaluation - Datos recibidos:", ajaxR.Data);

    const dataR = ajaxR.Data;

    _dataQuestionsSaved = dataR;

    printActualQuestions();

  } else {

    console.log("getQuestionsPerEvaluation - No se recibieron datos o hubo un error:", ajaxR);

    _dataQuestionsSaved = [];

  }

}



async function printActualQuestions() {
  console.log("printActualQuestions - Iniciando con", _dataQuestionsSaved.length, "preguntas");
  $("#contentQuestions").empty();

  if (_dataQuestionsSaved.length > 0) {
    let arrNumPositions = Array.from({ length: _dataQuestionsSaved.length }, (_, i) => i);
    for (let position of arrNumPositions) {
      try {
        let resultF = await printQuestionEsp(position);
        $("#contentQuestions").append(resultF.contentHTML);
        if (resultF.type == 2) {
          await printTableLvlsSavedSV(resultF.number);
        } else if (resultF.type == 4) {
          printOptionSelectAnswerSV(resultF.number);
        }
      } catch (error) {
        console.error("Error al renderizar pregunta en posición", position, ":", error);
      }
    }
  } else {
    console.log("printActualQuestions - No hay preguntas guardadas para mostrar");
    $("#contentQuestions").html(`
      <div class="evq-empty">
        <span class="material-symbols-outlined" style="font-size:48px;color:#E2E8F0;margin-bottom:12px;display:block;">quiz</span>
        <h5>Sin preguntas configuradas</h5>
        <p>No hay preguntas para esta evaluación. Haz clic en "Nueva Pregunta" para comenzar.</p>
      </div>`);
  }

  if (typeof evqUpdateMetaBar === 'function') {
    evqUpdateMetaBar();
  }

  // Si la evaluación está publicada, deshabilitar los inputs recién renderizados
  disableAllQuestionInputs();
}



function printQuestionEsp(i) {
  return new Promise((resolve, reject) => {
    let dataQuestion = _dataQuestionsSaved[i];
    let decodeType = atob(dataQuestion.typeQuestion);
    let typeBadgeClass = `badge-type-${decodeType}`;

    let contentPlusHTML = "";
    let contentRight = "";
    let contentAnswers = "";

    switch (decodeType) {
      case "1":
        let activeF = !dataQuestion.expectedValue ? 'active' : '';
        let activeV = dataQuestion.expectedValue ? 'active' : '';
        contentRight = `
          <div class="evq-field">
            <label>Respuesta correcta</label>
            <div class="evq-toggle-wrap">
              <button type="button" class="evq-toggle-btn ${activeF} True-FalseSV" data-question="${i}" data-value="false">Falso</button>
              <button type="button" class="evq-toggle-btn ${activeV} True-FalseSV" data-question="${i}" data-value="true">Verdadero</button>
            </div>
          </div>`;
        break;

      case "2":
        dataQuestion.answers.forEach((answer, indexAn) => {
          let btnDelete = dataQuestion.answers.length > 2
            ? `<button type="button" class="evq-opt-remove" onclick="verifyRemoveAnswerSV('${answer.idAnswer}','${dataQuestion.IdQuestion}','${i + 1}')" title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>`
            : '';
          let optLabel = contentOptions[indexAn];
          contentAnswers += `
            <div class="evq-option-row" id="answerSV${answer.idAnswer}-${dataQuestion.IdQuestion}">
              <span class="evq-opt-label">${optLabel}</span>
              <input type="text" class="evq-opt-input contentAnswerSVOld" placeholder="Descripción de la respuesta" value="${answer.DescAnswer}" data-answersv="${answer.idAnswer}" data-question="${i}">
              ${btnDelete}
            </div>`;
        });
        contentPlusHTML = `
          <div class="evq-field">
            <label>Opciones de respuesta</label>
            <div id="containerAnswersSV${dataQuestion.IdQuestion}">${contentAnswers}</div>
            <button type="button" class="evq-add-opt addanswerSV" onclick="addAnswerQuestionSV('${i}')"><span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar opción</button>
          </div>`;
        contentRight = `
          <div class="evq-field">
            <div class="evq-levels-box">
              <div class="evq-levels-header">
                <span class="evq-levels-title">Respuestas esperadas por nivel</span>
                <button type="button" class="evq-btn evq-btn-primary" style="padding:0.35rem 0.7rem;font-size:12px;" onclick="seeExpectedResponseSV('${i}')"><span class="material-symbols-outlined" style="font-size:14px">add</span> Agregar</button>
              </div>
              <div id="contentTableLvlsQuestionSV${i}"></div>
            </div>
          </div>`;
        break;

      case "3":
        contentRight = `
          <div class="evq-field">
            <label>Rango permitido para la respuesta</label>
            <div class="evq-range-row">
              <div class="evq-field">
                <label>Rango mínimo <span class="req">*</span></label>
                <input type="number" class="form-control changeRangeSV" value="${dataQuestion.rangeInitial}" data-question="${i}" data-typenum="initial" placeholder="0">
              </div>
              <div class="evq-field">
                <label>Rango máximo <span class="req">*</span></label>
                <input type="number" class="form-control changeRangeSV" value="${dataQuestion.rangeEnd}" data-question="${i}" data-typenum="end" placeholder="100">
              </div>
            </div>
          </div>`;
        break;

      case "4":
        dataQuestion.answers.forEach((answer, indexAn) => {
          let btnDelete = dataQuestion.answers.length > 2
            ? `<button type="button" class="evq-opt-remove" onclick="verifyRemoveAnswerSV('${answer.idAnswer}','${dataQuestion.IdQuestion}','${i + 1}')" title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>`
            : '';
          let optLabel = contentOptions[indexAn];
          contentAnswers += `
            <div class="evq-option-row" id="answerSV${answer.idAnswer}-${dataQuestion.IdQuestion}">
              <span class="evq-opt-label">${optLabel}</span>
              <input type="text" class="evq-opt-input contentAnswerSVOld" placeholder="Descripción de la respuesta" value="${answer.DescAnswer}" data-answersv="${answer.idAnswer}" data-question="${i}">
              ${btnDelete}
            </div>`;
        });
        contentPlusHTML = `
          <div class="evq-field">
            <label>Opciones de respuesta</label>
            <div id="containerAnswersSV${dataQuestion.IdQuestion}">${contentAnswers}</div>
            <button type="button" class="evq-add-opt addanswerSV" onclick="addAnswerQuestionSV('${i}')"><span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar opción</button>
          </div>`;
        contentRight = `
          <div class="evq-field">
            <label>Respuesta correcta</label>
            <div id="containerSelectAnswersSV${i}"></div>
          </div>`;
        break;

      default:
        break;
    }

    let titleDisplay = dataQuestion.titleQuestion || `Pregunta ${i + 1}`;
    let competenceDisplay = dataQuestion.descCompetence || 'Sin competencia';

    let contentFinalHTML = `
<div class="evq-card collapsed dvContentSV" id="dvContentSV${dataQuestion.IdQuestion}">
  <div class="evq-card-header" onclick="evqToggleCard(this)">
    <div class="evq-num">${String(i + 1).padStart(2, '0')}</div>
    <div class="evq-info">
      <div class="evq-title-text" id="txQuest${i}">${titleDisplay}</div>
      <div class="evq-meta-line">
        <span class="badge ${typeBadgeClass}">${dataQuestion.descTypeQuestion}</span>
        <span class="badge badge-comp">${competenceDisplay}</span>
      </div>
    </div>
    <div class="evq-header-actions">
      <button type="button" class="evq-icon-btn save" onclick="event.stopPropagation();saveNewDataOldQuestion('${dataQuestion.IdQuestion}','${i}')" title="Guardar cambios"><span class="material-symbols-outlined" style="font-size:18px">save</span></button>
      <button type="button" class="evq-icon-btn delete deleteNoSaved" onclick="event.stopPropagation();deleteQuestionSaved('${dataQuestion.IdQuestion}','${i}')" data-typequestion="old" title="Eliminar pregunta"><span class="material-symbols-outlined" style="font-size:18px">delete</span></button>
      <button type="button" class="evq-icon-btn chevron" title="Expandir/Colapsar"><span class="material-symbols-outlined" style="font-size:18px">expand_more</span></button>
    </div>
  </div>
  <div class="evq-card-body">
    <div class="row">
      <div class="col-md-6">
        <div class="evq-field">
          <label>Título <span class="req">*</span></label>
          <input type="text" class="form-control updatePrincipalInfoOld" id="titleQuestionSV${dataQuestion.IdQuestion}" value="${dataQuestion.titleQuestion}" data-typeinp="title" data-question="${i}" placeholder="Ingrese el título de la pregunta">
        </div>
      </div>
      <div class="col-md-6">
        <div class="evq-field">
          <label>Competencia <span class="req">*</span></label>
          <select class="form-select sel-competence-inline" id="selCompetenceSV${i}" data-question="${i}" data-typequestionsv="old" style="width:100%;">
            ${_allCompetences.map(c => `<option value="${c.idCompetencias}" ${c.idCompetencias == dataQuestion.competence ? 'selected' : ''}>${c.Competencia}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="col-12">
        <div class="evq-field">
          <label>Pregunta / Descripción <span class="req">*</span></label>
          <input type="text" class="form-control updatePrincipalInfoOld" id="descriptionQuestionSV${dataQuestion.IdQuestion}" value="${dataQuestion.descriptionQuestion}" data-typeinp="txQuestion" data-question="${i}" placeholder="Ingrese la pregunta">
        </div>
      </div>
      ${contentPlusHTML}
    </div>
    ${contentRight}
  </div>
</div>`;

    resolve({
      contentHTML: contentFinalHTML,
      type: decodeType,
      number: i
    });
  });
}



async function newAnswerQuestionSV(question){

  const dvContainer = document.getElementById(`containerAnswersSV${question}`);

  const cantAnswers = dvContainer.document.querySelectorAll(".contentAnswerSV").length;

}



async function addAnswerQuestionSV(question) {
  if (_dataQuestionsSaved[question].newAnswers === undefined) {
    _dataQuestionsSaved[question].newAnswers = [];
  }
  const idQuestion = _dataQuestionsSaved[question].IdQuestion;
  const typeQuestion = _dataQuestionsSaved[question].typeQuestion;
  _dataQuestionsSaved[question].newAnswers.push('');

  let countBeforeInsert = ((_dataQuestionsSaved[question].answers.length + _dataQuestionsSaved[question].newAnswers.length) - 1);
  let cantNew = (_dataQuestionsSaved[question].newAnswers.length - 1);
  let optionAn = contentOptions[countBeforeInsert];

  let newContentHTML = `
    <div class="evq-option-row" id="answerSVNew${cantNew}-${idQuestion}">
      <span class="evq-opt-label">${optionAn}</span>
      <input type="text" class="evq-opt-input contentAnswerSVNew" placeholder="Descripción de la respuesta" data-answersvnew="${cantNew}" data-question="${question}">
      <button type="button" class="evq-opt-remove" onclick="removeAnswerQSVNew('${cantNew}','${idQuestion}','${question}')" title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
    </div>`;

  $(`#containerAnswersSV${idQuestion}`).append(newContentHTML);
  if (atob(typeQuestion) == 4) {
    printOptionSelectAnswerSV(question);
  }
}



async function removeAnswerQSVNew(answer,idquestion, question){

  let typeQuestion = atob(_dataQuestionsSaved[question].typeQuestion);

  const resultV = await verifyRemoveAnswerSVNew(answer,question, typeQuestion);

  if (resultV) {

    // const posicion = _dataQuestionsSaved.findIndex(elemento => elemento.IdQuestion == idquestion);

    rePrintAnswersSV(idquestion,answer, question, 'new', typeQuestion);

  }

}



async function verifyRemoveAnswerSVNew(answer, posicion, typeQuestion) {

  return new Promise((resolve, reject) => {

    $("#contentAdv").empty();

    if (typeQuestion == 2) {

      const found = _dataQuestionsSaved[posicion].expectedValueNew.filter(registro => registro.answer == answer);

      if (found.length > 0) {

        // toastr.info("La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta");

        	const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

        $("#contentAdv").append(`<li>

          <b>Pregunta ${(Number(posicion) + 1)}: </b>La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta, intente eliminar la relación de la respuesta con los

          resultados esperados de la pregunta para poder continuar.

        </li>`);

        resolve(false);

      } else {

        if ((_dataQuestionsSaved[posicion].newAnswers.length + _dataQuestionsSaved[posicion].answers.length) > 2) {

          $("#contentAdv").append("<li>Sin advertencias</li>");

          resolve(true);

        } else {

          // toastr.info("No es posible eliminar la respuesta seleccionada");

          	const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No es posible eliminar la respuesta seleccionada.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

          $("#contentAdv").append(`<li>

            <b>Pregunta ${(Number(posicion) + 1)}: </b>La pregunta necesita como mínimo una cantidad de dos respuestas posibles,

              por lo que no es posible eliminar la respuesta seleccionada.

          </li>`);

          resolve(false);

        }

      }

    } else if (typeQuestion == 4) {

      console.log(_dataQuestionsSaved[posicion].expectedValue);

      console.log(answer);

      if (_dataQuestionsSaved[posicion].expectedValue.typeExpectedValue == "new") {

        if (_dataQuestionsSaved[posicion].expectedValue.expectedNew == answer){

          // toastr.info("La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta");

          	const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

          $("#contentAdv").append(`<li>

            <b>Pregunta ${(Number(posicion) + 1)}: </b>La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta, intente eliminar la relación de la respuesta con los

            resultados esperados de la pregunta para poder continuar.

          </li>`);

          resolve(false);

        } else {

          if ((_dataQuestionsSaved[posicion].newAnswers.length + _dataQuestionsSaved[posicion].answers.length) > 2) {

            $("#contentAdv").append("<li>Sin advertencias</li>");

            resolve(true);

          } else {

            // toastr.info("No es posible eliminar la respuesta seleccionada");

            	const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No es posible eliminar la respuesta seleccionada.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

            $("#contentAdv").append(`<li>

              <b>Pregunta ${(Number(posicion) + 1)}: </b>La pregunta necesita como mínimo una cantidad de dos respuestas posibles,

                por lo que no es posible eliminar la respuesta seleccionada.

            </li>`);

            resolve(false);

          }

        }

      } else {

        $("#contentAdv").append("<li>Sin advertencias</li>");

        resolve(true);

      }

    }

  });

}



async function verifyRemoveAnswerSV(answer, question, indexPlus){

  $("#contentAdv").empty();

  const dataQuestionExpected = _dataQuestionsSaved.filter( questionF => questionF.IdQuestion == question);

  const typeQuestion = atob(dataQuestionExpected[0].typeQuestion);

  if (dataQuestionExpected[0].answers.length <= 2) {

    // toastr.info("La pregunta no puede tener menos de dos respuestas.");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">La pregunta no puede tener menos de dos respuestas.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    $("#contentAdv").append(`<li>

      <b>Pregunta ${indexPlus}: </b>LLa pregunta necesita al menos dos respuestas ya registradas en la base de datos para poder eliminar la respuesta seleccionada.

    </li>`);

  } else {

    removeAnswerSV(answer,question, indexPlus, typeQuestion)

    .then(resultado => {

      if (resultado.result) {

        $("#contentAdv").append("<li>Sin advertencias</li>");

        $(`#answerSV${answer}-${question}`).remove();

        rePrintAnswersSV(question,answer, indexPlus - 1, 'old', typeQuestion);

      } else {

        // toastr.info(resultado.msg);

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">${resultado.msg}</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

        $("#contentAdv").append(`<li>

          <b>Pregunta ${indexPlus}: </b>${resultado.msg}

        </li>`);

      }

    })

    .catch(error => {

      console.error(error);

    });

  }

}



function rePrintAnswersSV(question, answer, index, type, typeQuestion) {
  if (type === "old") {
    _dataQuestionsSaved[index].answers = _dataQuestionsSaved[index].answers.filter(answerData => Number(answerData.idAnswer) != Number(answer));
  } else {
    _dataQuestionsSaved[index].newAnswers.splice(answer, 1);
  }

  $(`#containerAnswersSV${question}`).empty();
  let newContentHTML = "";
  let cantOldAnswers = _dataQuestionsSaved[index].answers.length;
  let cantNewAnswers = _dataQuestionsSaved[index].newAnswers.length;

  _dataQuestionsSaved[index].answers.forEach((answerFE, i) => {
    let btnDeleteAnswer = (cantOldAnswers + cantNewAnswers) > 2
      ? `<button type="button" class="evq-opt-remove" onclick="verifyRemoveAnswerSV('${answerFE.idAnswer}','${question}','${i + 1}')" title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>`
      : '';
    let optionAn = contentOptions[i];
    newContentHTML += `
      <div class="evq-option-row" id="answerSV${answerFE.idAnswer}-${question}">
        <span class="evq-opt-label">${optionAn}</span>
        <input type="text" class="evq-opt-input contentAnswerSV" placeholder="Descripción de la respuesta" value="${answerFE.DescAnswer}" data-answersv="${answerFE.idAnswer}">
        ${btnDeleteAnswer}
      </div>`;
  });

  _dataQuestionsSaved[index].newAnswers.forEach((newAnswerI, i) => {
    let optionAn = contentOptions[(cantOldAnswers + i)];
    newContentHTML += `
      <div class="evq-option-row" id="answerSVNew${i}-${question}">
        <span class="evq-opt-label">${optionAn}</span>
        <input type="text" class="evq-opt-input contentAnswerSVNew" placeholder="Descripción de la respuesta" value="${newAnswerI}" data-answersvnew="${i}" data-question="${index}">
        <button type="button" class="evq-opt-remove" onclick="removeAnswerQSVNew('${i}','${question}','${index}')" title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
      </div>`;
  });

  $(`#containerAnswersSV${question}`).append(newContentHTML);
  if (typeQuestion == 2) {
    printTableLvlsSavedSV(index);
  } else {
    printOptionSelectAnswerSV(index);
  }
}



function removeAnswerSV(answer, question, index, typeQuestion) {

  return new Promise(async (resolve, reject) => {

    const dataSend = {

      op: "removeAnswerSV",

      question: question,

      answer: answer,

      typeQuestion: typeQuestion

    };

    try {

      const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

      if (ajaxR !== undefined) {

        if (!ajaxR.resultFound) {

          resolve({

            result: true,

          });

        } else {

          resolve({

            result: false,

            msg: ajaxR.Msg

          });

        }

      } else {

        resolve({

          result: false,

          msg: "La respuesta seleccionada no se pudo eliminar"

        });

      }

    } catch (e) {

      reject(e);

    }

  });

}































































async function getQuestionTypes(){

  const dataSend = {

    op: "getQuestionTypes"

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if(ajaxR !== undefined) {

    printQuestionTypes(ajaxR.Data);

  }

}

function printQuestionTypes(data){

  let contentHTML = "<option value=''> Listado de tipos de pregunta </option>";

  if(data.length > 0) {

    for (var i = 0; i < data.length; i++) {

      let desc = data[i]["Descripcion"] ? data[i]["Descripcion"].toLowerCase() : "";
      if (_currentEvaluation && _currentEvaluation.TipoEvaluacion == 2) {
          if ((desc.includes("múltiple") || desc.includes("multiple")) && (desc.includes("esperad"))) {
              continue; // Ocultar múltiple esperado
          }
      }

      contentHTML += `<option value='${data[i]["idTipoPregunta"]}'>${data[i]["Descripcion"]}</option>`;

    }

  }

  $("#sel_typeQuestion").append(contentHTML);

  _typeQuestions = data;

}



async function getCompetencesActive(){

  const dataSend = {

    op: "getCompetencesActive"

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend);

  if(ajaxR !== undefined) {

    printCompetencesActive(ajaxR.Data);

  }

}

function printCompetencesActive(data){

  let contentHTML = "<option disabled> Listado de competencias </option>";

  if(data.length > 0) {

    for (var i = 0; i < data.length; i++) {

      contentHTML += `<option value='${data[i]["idCompetencias"]}'>${data[i]["Competencia"]}</option>`;

    }

  }

  $("#sel_competenceQuestion").append(contentHTML);

  $("#sel_CompetencesUpdateOld").append(contentHTML);

  _allCompetences = data;

}



function addQuestion(type, competence) {
  let decodeType = atob(type);
  let dataTypeQ = _typeQuestions.filter(typeQ => typeQ.idTipoPregunta == type);
  let dataCompetence = _allCompetences.filter(comp => comp.idCompetencias == competence);
  let newNumber = (_dataQuestions.length + 1);
  let contentPlusHTML = "";
  let contentRight = "";
  let typeBadgeClass = `badge-type-${decodeType}`;

  switch (decodeType) {
    case '1':
      contentRight = `
        <div class="evq-field">
          <label>Respuesta correcta</label>
          <div class="evq-toggle-wrap">
            <button type="button" class="evq-toggle-btn active changeTrue-False" data-question="${(newNumber - 1)}" data-value="false">Falso</button>
            <button type="button" class="evq-toggle-btn changeTrue-False" data-question="${(newNumber - 1)}" data-value="true">Verdadero</button>
          </div>
        </div>`;
      _dataQuestions.push({
        typeQuestion: type,
        descTypeQuestion: dataTypeQ[0]["Descripcion"],
        competence: competence,
        descCompetence: dataCompetence[0]["Competencia"],
        titleQuestion: "",
        descriptionQuestion: "",
        expectedValue: false,
        saveInBdd: false,
        edited: false
      });
      break;

    case '2':
      contentPlusHTML = `
        <div class="evq-field">
          <label>Opciones de respuesta</label>
          <div id="contentAnswers${(newNumber - 1)}">
            <div class="evq-option-row" id="answer${(newNumber - 1)}-0">
              <span class="evq-opt-label">a</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="0" data-question="${(newNumber - 1)}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="${0}" data-question='${(newNumber - 1)}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
            <div class="evq-option-row" id="answer${(newNumber - 1)}-1">
              <span class="evq-opt-label">b</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="1" data-question="${(newNumber - 1)}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="${1}" data-question='${(newNumber - 1)}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
          </div>
          <button type="button" class="evq-add-opt addanswer" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar opción</button>
        </div>`;
      contentRight = `
        <div class="evq-field">
          <div class="evq-levels-box">
            <div class="evq-levels-header">
              <span class="evq-levels-title">Respuestas esperadas por nivel</span>
              <button type="button" class="evq-btn evq-btn-primary" style="padding:0.35rem 0.7rem;font-size:12px;" onclick="seeExpectedResponse('${(newNumber - 1)}','new')"><span class="material-symbols-outlined" style="font-size:14px">add</span> Agregar</button>
            </div>
            <div id="contentTableLvlsQuestion${newNumber - 1}"></div>
          </div>
        </div>`;
      _dataQuestions.push({
        typeQuestion: type,
        descTypeQuestion: dataTypeQ[0]["Descripcion"],
        competence: competence,
        descCompetence: dataCompetence[0]["Competencia"],
        titleQuestion: "",
        descriptionQuestion: "",
        answers: ["", ""],
        expectedValue: [],
        saveInBdd: false,
        edited: false
      });
      break;

    case '3':
      contentRight = `
        <div class="evq-field">
          <label>Rango permitido para la respuesta</label>
          <div class="evq-range-row">
            <div class="evq-field">
              <label>Rango mínimo <span class="req">*</span></label>
              <input type="number" class="form-control changeRange" value="0" data-question='${(newNumber - 1)}' data-typenum="initial" placeholder="0">
            </div>
            <div class="evq-field">
              <label>Rango máximo <span class="req">*</span></label>
              <input type="number" class="form-control changeRange" value="100" data-question='${(newNumber - 1)}' data-typenum="end" placeholder="100">
            </div>
          </div>
        </div>`;
      _dataQuestions.push({
        typeQuestion: type,
        descTypeQuestion: dataTypeQ[0]["Descripcion"],
        competence: competence,
        descCompetence: dataCompetence[0]["Competencia"],
        titleQuestion: "",
        descriptionQuestion: "",
        rangeInitial: 0,
        rangeEnd: 100,
        saveInBdd: false,
        edited: false
      });
      break;

    case '4':
      contentPlusHTML = `
        <div class="evq-field">
          <label>Opciones de respuesta</label>
          <div id="contentAnswers${(newNumber - 1)}">
            <div class="evq-option-row" id="answer${(newNumber - 1)}-0">
              <span class="evq-opt-label">a</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="0" data-question="${(newNumber - 1)}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="${0}" data-question='${(newNumber - 1)}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
            <div class="evq-option-row" id="answer${(newNumber - 1)}-1">
              <span class="evq-opt-label">b</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="1" data-question="${(newNumber - 1)}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="${1}" data-question='${(newNumber - 1)}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
          </div>
          <button type="button" class="evq-add-opt addanswer" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar opción</button>
        </div>`;
      contentRight = `
        <div class="evq-field">
          <label>Respuesta correcta</label>
          <div id="containerSelectAnswers${(newNumber - 1)}"></div>
        </div>`;
      _dataQuestions.push({
        typeQuestion: type,
        descTypeQuestion: dataTypeQ[0]["Descripcion"],
        competence: competence,
        descCompetence: dataCompetence[0]["Competencia"],
        titleQuestion: "",
        descriptionQuestion: "",
        answers: ["", ""],
        expectedValue: 0,
        saveInBdd: false,
        edited: false
      });
      break;

    default:
      break;
  }

  let displayNum = _dataQuestionsSaved.length + newNumber;
  let contentFinalHTML = `
    <div class="evq-card collapsed dvContentQuestion" id="dvQuestion${newNumber - 1}">
      <div class="evq-card-header" onclick="evqToggleCard(this)">
        <div class="evq-num">${String(displayNum).padStart(2, '0')}</div>
        <div class="evq-info">
          <div class="evq-title-text titleNewQuestion" id="txQuest${newNumber - 1}">${displayNum}.- Pregunta (Nueva)</div>
          <div class="evq-meta-line">
            <span class="badge ${typeBadgeClass}">${dataTypeQ[0]["Descripcion"]}</span>
            <span class="badge badge-comp">${dataCompetence[0]["Competencia"]}</span>
          </div>
        </div>
        <div class="evq-header-actions">
          <button type="button" class="evq-icon-btn changeTypeQuestion" data-question="${newNumber - 1}" title="Cambiar tipo de pregunta"><span class="material-symbols-outlined" style="font-size:18px">swap_horiz</span></button>
          <button type="button" class="evq-icon-btn delete deleteNoSaved" data-question="${newNumber - 1}" data-typequestion="new" title="Eliminar pregunta"><span class="material-symbols-outlined" style="font-size:18px">delete</span></button>
          <button type="button" class="evq-icon-btn chevron" title="Expandir/Colapsar"><span class="material-symbols-outlined" style="font-size:18px">expand_more</span></button>
        </div>
      </div>
      <div class="evq-card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="evq-field">
              <label>Título <span class="req">*</span></label>
              <input type="text" class="form-control updatePrincipalInfo" id="title${newNumber - 1}" data-typeinp="title" data-question="${(newNumber - 1)}" placeholder="Ingrese el título de la pregunta">
            </div>
          </div>
          <div class="col-md-6">
            <div class="evq-field">
              <label>Competencia <span class="req">*</span></label>
              <select class="form-select sel-competence-inline" id="selCompetenceNew${newNumber - 1}" data-question="${newNumber - 1}" data-typequestionsv="new" style="width:100%;">
                ${_allCompetences.map(c => `<option value="${c.idCompetencias}" ${c.idCompetencias == competence ? 'selected' : ''}>${c.Competencia}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="evq-field">
              <label>Pregunta / Descripción <span class="req">*</span></label>
              <input type="text" class="form-control updatePrincipalInfo" id="desc${newNumber - 1}" data-typeinp="txQuestion" data-question="${(newNumber - 1)}" placeholder="Ingrese la pregunta">
            </div>
          </div>
          ${contentPlusHTML}
        </div>
        ${contentRight}
      </div>
    </div>`;

  return {
    contentHTML: contentFinalHTML,
    type: decodeType,
    number: newNumber - 1
  };
}



function changeexpectedValueTF(question, newVal){

  _dataQuestions[question].edited = true;

  _dataQuestions[question].expectedValue = newVal;

}



function changeexpectedValueTFSV(question, newVal){

  _dataQuestionsSaved[question].edited = true;

  _dataQuestionsSaved[question].expectedValue = newVal;

}



function addAnswerQuestion(question) {
  if (!_dataQuestions[question]) {
    console.error(`Error: La pregunta ${question} no existe en _dataQuestions`);
    toastr.error('No se pudo agregar la respuesta. La pregunta no existe.', 'Error');
    return;
  }
  if (!_dataQuestions[question].answers || !Array.isArray(_dataQuestions[question].answers)) {
    console.error(`Error: La pregunta ${question} no tiene un array de respuestas válido`);
    toastr.error('No se pudo agregar la respuesta. Estructura de datos inválida.', 'Error');
    return;
  }

  let newOption = contentOptions[_dataQuestions[question].answers.length];
  const cantAnswers = _dataQuestions[question].answers.length;
  _dataQuestions[question].answers.push('');

  let contentHTML = `
    <div class="evq-option-row" id="answer${question}-${cantAnswers}">
      <span class="evq-opt-label">${newOption}</span>
      <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="${cantAnswers}" data-question="${question}">
      <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="${cantAnswers}" data-question='${question}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
    </div>`;

  $(`#contentAnswers${question}`).append(contentHTML);
  _dataQuestions[question].edited = true;

  if (atob(_dataQuestions[question].typeQuestion) == 4) {
    printOptionSelectAnswer(question);
  }
}



async function removeAnswerQ(question, answer){

  if (atob(_dataQuestions[question].typeQuestion) == 2) {

    const resultV = await verifyAnswerInResultExpected(question, answer);

    if (resultV) {

      rePrintAnswers(question, atob(_dataQuestions[question].typeQuestion), answer);

    }

  } else {

    const resultV = await verifyAnExpectedResponse(question,answer);

    if (resultV) {

      rePrintAnswers(question, atob(_dataQuestions[question].typeQuestion), answer);

    }

  }

}



function rePrintAnswers(question, typeQ, answer = '') {
  const dv = document.getElementById(`answer${question}-${answer}`);
  _dataQuestions[question].answers.splice(answer, 1);
  if (dv) dv.remove();

  $(`#contentAnswers${question}`).empty();
  let newContentHTML = "";
  _dataQuestions[question].answers.forEach((answerFE, i) => {
    let newOption = contentOptions[i];
    newContentHTML += `
      <div class="evq-option-row" id="answer${question}-${i}">
        <span class="evq-opt-label">${newOption}</span>
        <input type="text" class="evq-opt-input answerInp" value="${answerFE}" placeholder="Descripción de la respuesta" data-answer="${i}" data-question="${question}">
        <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="${i}" data-question='${question}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
      </div>`;
  });
  $(`#contentAnswers${question}`).append(newContentHTML);

  if (typeQ == 2) {
    let newArrExpectedValue = [];
    _dataQuestions[question].expectedValue.forEach(expected => {
      if (expected.answer != answer) {
        if (expected.answer > answer) {
          newArrExpectedValue.push({ answer: Number(expected.answer) - 1, lvl: expected.lvl });
        } else {
          newArrExpectedValue.push({ answer: expected.answer, lvl: expected.lvl });
        }
      }
    });
    _dataQuestions[question].expectedValue = newArrExpectedValue;
    printTableLvls(question);
  } else {
    if (_dataQuestions[question].expectedValue > answer) {
      _dataQuestions[question].expectedValue = (Number(_dataQuestions[question].expectedValue) - 1);
    }
    printOptionSelectAnswer(question);
  }
  _dataQuestions[question].edited = true;
}



function changeAnExpectedResponse(question, answer){

  _dataQuestions[question].expectedValue = answer;

}

function changeAnExpectedResponseSV(question, answer, typeValue){

  if (typeValue == "old") {

    _dataQuestionsSaved[question].expectedValue.IdAnswerExpected = answer;

  } else {

    let newValue = "";

    let characters = answer.split('-');

    newValue = Number(characters[1]);

    _dataQuestionsSaved[question].expectedValue.expectedNew = newValue;

  }

  _dataQuestionsSaved[question].expectedValue.typeExpectedValue = typeValue;

  _dataQuestionsSaved[question].expectedValue.edited = true;

  console.log(_dataQuestionsSaved[question]);

}



async function verifyAnExpectedResponse(question,answer){

  return new Promise((resolve, reject) => {

    $("#contentAdv").empty();

    if (_dataQuestions[question].answers.length > 2) {

      if (_dataQuestions[question].expectedValue == answer) {

        // toastr.info("No es posible eliminar la respuesta seleccionada");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No es posible eliminar la respuesta seleccionada.</span>

        </div>`;

        showBootstrapAlert(messageContent, "top-right", 5000);

        $("#").append(`<li>

          <b>Pregunta ${(Number(question) + 1)}: </b>La respuesta que se intenta eliminar ya esa registrada como valor esperado en la pregunta.

        </li>`);

        resolve(false);

      } else {

        $("#contentAdv").append("<li>Sin advertencias</li>");

        resolve(true);

      }

    } else {

      // toastr.info("No es posible eliminar la respuesta seleccionada");

      	const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No es posible eliminar la respuesta seleccionada.</span>

        </div>`;

        showBootstrapAlert(messageContent, "top-right", 5000);

      $("#contentAdv").append(`<li>

        <b>Pregunta ${(Number(question) + 1)}: </b>La pregunta necesita como mínimo una cantidad de dos respuestas posibles,

          por lo que no es posible eliminar la respuesta seleccionada.

      </li>`);

      resolve(false);

    }

  });

}



async function verifyAnswerInResultExpected(question, answer) {

  return new Promise((resolve, reject) => {

    $("#contentAdv").empty();

    const found = _dataQuestions[question].expectedValue.filter(registro => registro.answer == answer);

    if (found.length > 0) {

      // toastr.info("La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta");

      	const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

      $("#contentAdv").append(`<li>

        <b>Pregunta ${(Number(question) + 1)}: </b>La respuesta que intenta eliminar ya se encuentra registrada como opción esperada en la pregunta, intente eliminar la relación de la respuesta con los

        resultados esperados de la pregunta para poder continuar.

      </li>`);

      resolve(false);

    } else {

      $("#contentAdv").append("<li>Sin advertencias</li>");

      resolve(true);

    }

  });

}



function printTableLvls(question) {
  let container = $(`#contentTableLvlsQuestion${question}`);
  container.empty();
  let data = _dataQuestions[question].expectedValue;
  if (!data || data.length === 0) {
    container.append(`<div style="font-size:12px;color:var(--ev-text-muted);padding:0.5rem 0;">Sin respuestas esperadas configuradas.</div>`);
    return;
  }
  let html = '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
  data.forEach(item => {
    let option = contentOptions[item.answer];
    html += `
      <div class="evq-level-chip lvl">
        Nivel ${item.lvl} → ${option}
        <button type="button" class="evq-chip-remove" onclick="deleteResultExpected('${item.lvl}','${item.answer}','${question}')" title="Eliminar"><span class="material-symbols-outlined" style="font-size:10px">close</span></button>
      </div>`;
  });
  html += '</div>';
  container.append(html);
}

function printTableLvlsSavedSV(question) {
  let container = $(`#contentTableLvlsQuestionSV${question}`);
  container.empty();
  let data = _dataQuestionsSaved[question].expectedValue;
  let dataAnswers = _dataQuestionsSaved[question].answers;

  let html = '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
  if (data && data.length > 0) {
    data.forEach(item => {
      const posicion = dataAnswers.findIndex(elemento => elemento.idAnswer == item.answerExpected);
      let option = contentOptions[posicion];
      html += `
        <div class="evq-level-chip lvl">
          Nivel ${item.lvl} → ${option}
          <button type="button" class="evq-chip-remove" onclick="deleteResultExpectedSV('${item.lvl}','${item.answerExpected}','${item.IdQuestion}')" title="Eliminar"><span class="material-symbols-outlined" style="font-size:10px">close</span></button>
        </div>`;
    });
  }
  if (_dataQuestionsSaved[question].expectedValueNew && _dataQuestionsSaved[question].expectedValueNew.length > 0) {
    _dataQuestionsSaved[question].expectedValueNew.forEach(item => {
      let posicion = _dataQuestionsSaved[question].answers.length + item.answer;
      let option = contentOptions[posicion];
      html += `
        <div class="evq-level-chip lvl" style="background:#FFEDD5;color:#9A3412;border-color:#FDBA74;">
          Nivel ${item.lvl} → ${option} (nueva)
          <button type="button" class="evq-chip-remove" onclick="deleteResultExpectedSVNew('${item.lvl}','${item.answer}','${question}')" title="Eliminar"><span class="material-symbols-outlined" style="font-size:10px">close</span></button>
        </div>`;
    });
  }
  if ((!data || data.length === 0) && (!_dataQuestionsSaved[question].expectedValueNew || _dataQuestionsSaved[question].expectedValueNew.length === 0)) {
    html += `<div style="font-size:12px;color:var(--ev-text-muted);padding:0.5rem 0;">Sin respuestas esperadas configuradas.</div>`;
  }
  html += '</div>';
  container.append(html);
}



async function verifySaveNewQuestions() {
  let newQuestions = _dataQuestions.filter(question => question.saveInBdd == false);
  if (newQuestions.length > 0) {
    let advertences = [];
    _dataQuestions.forEach((question, i) => {
      if (question.titleQuestion.length < 1) {
        advertences.push(`<b>Pregunta ${i + 1}:</b> Falta el título.`);
      }
      if (question.descriptionQuestion.length < 1) {
        advertences.push(`<b>Pregunta ${i + 1}:</b> Falta la descripción.`);
      }
      let qType = atob(question.typeQuestion);
      if (qType == 2) {
        if (question.expectedValue.length < 1) {
          advertences.push(`<b>Pregunta ${i + 1}:</b> Agrega al menos una respuesta esperada por nivel.`);
        }
      } else if (qType == 3) {
        if (Number(question.rangeInitial) < 0) {
          advertences.push(`<b>Pregunta ${i + 1}:</b> El rango mínimo no puede ser menor a 0.`);
        } else if (Number(question.rangeInitial) > Number(question.rangeEnd)) {
          advertences.push(`<b>Pregunta ${i + 1}:</b> El rango mínimo no puede ser mayor al máximo.`);
        }
      } else if (qType == 4) {
        question.answers.forEach((answer, j) => {
          if (answer == "") {
            advertences.push(`<b>Pregunta ${i + 1}:</b> La opción ${contentOptions[j]}) está vacía.`);
          }
        });
      }
    });

    if (advertences.length > 0) {
      const msg = `<div class="alert-content"><span class="alert-title">Atención!</span><span class="alert-text">Verifica las advertencias antes de guardar.</span></div>`;
      showBootstrapAlertWar(msg, "top-right", 5000);
      $('#evqAlertBanner').removeClass('warning error').addClass('error').show();
      $('#evqAlertText').html(advertences.join('<br>'));
    } else {
      $('#evqAlertBanner').hide();
      await saveQuestionsConfig();
    }
  } else {
    const messageContent = `<div class="alert-content"><span class="alert-title">Información!</span><span class="alert-text">No existen preguntas nuevas por guardar.</span></div>`;
    showBootstrapAlert(messageContent, "top-right", 5000);
  }
}



async function saveQuestionsConfig(){
  // Validaciones agregadas
  if (!e_valuation) {
    console.error('ERROR: e_valuation no está definido');
    toastr.error('No se pudo obtener el ID de la evaluación', 'Error');
    return;
  }
  console.log('Iniciando guardado para evaluación:', e_valuation);

  const allData = _dataQuestions.filter( question => question.saveInBdd === false);

  const dataSend = {

    op: "saveQuestionsConfig",

    evaluation: e_valuation,

    data: JSON.stringify(allData)

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    // FEATURE 3 — Refrescar estado tras dar de alta preguntas SIN recargar la pagina.
    // Arquitectura: ListadoEvaluaciones.php contiene un panel con iframes hermanos:
    //   - evPanelOverviewFrame  -> DetalleEvaluacion.php (aqui vive el boton
    //                               "Publicar" / "Aceptar Preguntas", renderActions()).
    //   - evPanelQuestionsFrame -> questionsEv.php (esta vista).
    // Al guardar preguntas, ConPreguntas pasa de 0 a 1, por lo que el boton del
    // resumen debe cambiar de "Publicar" a "Aceptar Preguntas". Como ese boton se
    // calcula con getEvaluationById() en el iframe de resumen, hay que refrescar
    // ESE iframe hermano (no solo el propio) para que el cambio se vea sin reload.
    try {
      if (window.parent && window.parent !== window) {
        // 1) Refrescar el grid del listado del padre (recalcula badges/acciones).
        if (typeof window.parent.getEvaluaciones === 'function') {
          window.parent.getEvaluaciones();
        }

        // 2) Refrescar el iframe de Resumen (donde esta el boton Publicar/Aceptar).
        const overviewFrame = window.parent.document.getElementById('evPanelOverviewFrame');
        if (overviewFrame) {
          const ow = overviewFrame.contentWindow;
          // Si el detalle expone un recargador propio, usarlo (no recarga la pagina).
          if (ow && typeof ow.loadEvaluationDetail === 'function' && typeof ow.getEVParam === 'function') {
            const evId = ow.getEVParam();
            if (evId) ow.loadEvaluationDetail(evId);
          } else if (overviewFrame.src && overviewFrame.src !== 'about:blank') {
            // Fallback: recargar solo el iframe de resumen, no la pagina completa.
            overviewFrame.contentWindow.location.reload();
          }
        }

        // 3) Fallback: notificar al padre por si quiere reaccionar de otra forma.
        window.parent.postMessage({ type: 'evaluationQuestionsSaved' }, '*');
      }
    } catch (e) {
      console.warn('No se pudo refrescar el resumen/listado padre:', e);
    }

    setTimeout(function () {

      // Recargar solo la propia vista de preguntas para reflejar las preguntas
      // recien guardadas y el bloqueo de "Aceptar preguntas". El boton del resumen
      // ya se actualizo arriba sin recargar toda la pagina.
      location.reload();

    }, 1500);

  }

}



function changeValAnswer(question,newVal,answer){

  _dataQuestions[question].answers[answer] = newVal;

}



function changeValAnswerSVNew(question,newVal,answer){

  _dataQuestionsSaved[question].newAnswers[answer] = newVal;

}



function changeValAnswerSVOld(question,newVal,answer){

  const dataAnswers = _dataQuestionsSaved[question].answers;

  const posicion = dataAnswers.findIndex(elemento => elemento.idAnswer == answer);

  if (_dataQuestionsSaved[question].answers[posicion].DescAnswer != newVal) {

    _dataQuestionsSaved[question].answers[posicion].DescAnswer = newVal;

    _dataQuestionsSaved[question].answers[posicion].edited = 1;

  }

}



function changePrincipalInfoQuestion(question,newVal,type){

  switch (type) {

    case 'title':

      _dataQuestions[question].titleQuestion = newVal;

      break;

    default:

      _dataQuestions[question].descriptionQuestion = newVal;

  }

  _dataQuestions[question].edited = true;

}



function changePrincipalInfoQuestionOld(question,newVal,type){

  switch (type) {

    case 'title':

      _dataQuestionsSaved[question].titleQuestion = newVal;

      break;

    default:

      _dataQuestionsSaved[question].descriptionQuestion = newVal;

  }

  _dataQuestionsSaved[question].edited = true;

}



async function getLevelsEmployees(){

  const dataSend = {

    op: "getLevelsEmployees"

  };

  const ajaxR = await pAjaxAsync(url_m_Configuracion, dataSend);

  if (ajaxR !== undefined) {

    printLevelsEmployees(ajaxR.Data);

  }

}

function printLevelsEmployees(data){

  // Descripciones de niveles organizacionales

  const nivelesDescripciones = {

    1: "Nivel 1 - Director General",

    2: "Nivel 2 - Director de Área",

    3: "Nivel 3 - Gerente",

    4: "Nivel 4 - Subgerente / Jefe",

    5: "Nivel 5 - Supervisor / Coordinador",

    6: "Nivel 6 - Analista / Técnico",

    7: "Nivel 7 - Auxiliar / Asistente",

    8: "Nivel 8 - Operativo"

  };

  

  let contentHTML = "<option disabled selected> Listado de niveles </option>";

  if(data.length > 0) {

    for (var i = 0; i < data.length; i++) {

      const nivel = data[i]["Nivel"];

      const descripcion = nivelesDescripciones[nivel] || `Nivel ${nivel}`;

      contentHTML += `<option value='${nivel}'>${descripcion}</option>`;

    }

  }

  $("#sel_lvl").append(contentHTML);

  $("#sel_lvlOld").append(contentHTML);

}



function seeExpectedResponseSV(question){

  $("#contentAdv").empty();

  if (_dataQuestionsSaved[question].answers.length > 0 || _dataQuestionsSaved[question].newAnswers.length) {

    let anwsersNoValueSV = _dataQuestionsSaved[question].answers.filter( answer => answer.DescAnswer == '');

    let anwsersNoValueSVNew = [] ;

    if (_dataQuestionsSaved[question].newAnswers !== undefined){

      anwsersNoValueSVNew = _dataQuestionsSaved[question].newAnswers.filter( answer => answer == '');

    }

    if (anwsersNoValueSV.length > 0 || anwsersNoValueSVNew.length > 0) {

      // toastr.info("Todas las respuestas de las preguntas deben de tener una descripción para poder continuar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Todas las respuestas de las preguntas deben de tener una descripción para poder continuar.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

      $("#contentAdv").append(`<li><b>Pregunta ${Number(question) + 1}: </b>Es necesario que todas las respuestas de la pregunta tengan una descripción para poder continuar.</li>`);

    } else {

      $("#contentAdv").append("<li>Sin advertencias</li>");

      const optionLevels = sel_lvlOld.querySelectorAll('option');

      optionLevels.forEach( level => {

        if (!isNaN(level.value)){

          let existeNewArr = [];

          let existeArr = _dataQuestionsSaved[question].expectedValue.filter( expected => expected.lvl == level.value);

          if (_dataQuestionsSaved[question].expectedValueNew !== undefined) {

            existeNewArr = _dataQuestionsSaved[question].expectedValueNew.filter( expected => expected.lvl == level.value);

          }

          if (existeArr.length > 0 || existeNewArr.length > 0) {

            level.disabled = true;

          } else {

            level.disabled = false;

          }

        }

      });

      $("#content_answersMOld").empty();

      cleanVerifyInputs('dv_OldResponseExpected');

      $("#sel_lvlOld").select2({

        dropdownParent: $('#dv_OldResponseExpected'),

      });

      $("#QuestionREOld").val(question);

      let allAnswersOld = _dataQuestionsSaved[question].answers;

      let allAnswersNew = _dataQuestionsSaved[question].newAnswers;

      let contentHTMLAnswers = "";

      let newOption = "";

      let contador = 0;

      if (allAnswersOld.length > 0) {

        allAnswersOld.forEach((answer, i) => {

          newOption = contentOptions[contador];

          contador++;

          let checked = "";

          if (i == 0) {

            checked = "checked";

          } else {

            checked = "";

          }

          contentHTMLAnswers += `

<li class="list-group-item border-0 p-0 bg-transparent">

  <label class="d-block w-100 m-0">

    <input type="radio" 

           class="answerForSelectedOld form-check-input position-static" 

           name="quesold${question}" 

           ${checked} 

           data-answerid="${answer.idAnswer}" 

           data-typeanswer="old">

    <span class="d-inline-block ms-2">${newOption}) ${answer.DescAnswer}</span>

  </label>

</li>`;

        });

      }

      if (allAnswersNew !== undefined) {

        if (allAnswersNew.length > 0 ) {

          allAnswersNew.forEach((answer, i) => {

            newOption = contentOptions[contador];

            contador++;

            contentHTMLAnswers += `

<li class="list-group-item border-0 p-0 bg-transparent">

  <label class="d-flex align-items-center w-100 m-0 ps-1">

    <input type="radio" 

           class="answerForSelectedOld form-check-input me-2" 

           name="quesold${question}" 

           data-answernew="${i}" 

           data-typeanswer="new">

    <span class="d-inline-block">${newOption}) ${answer}</span>

  </label>

</li>`;

          });

        }

      }

      let contentFinalHTML = `<ul>${contentHTMLAnswers}</ul>`;

      $("#content_answersMOld").append(contentFinalHTML);

      const modalOld = new bootstrap.Modal(document.getElementById('dv_OldResponseExpected'));
      modalOld.show();

    }

  }

}



function seeExpectedResponse(question,inB){

  $("#contentAdv").empty();

  if (inB == "old") {

    if (_dataQuestionsSaved[question].answers.length > 0) {

      let anwsersNoValue = _dataQuestionsSaved[question].answers.filter(answer => answer.DescAnswer == '');

      if (anwsersNoValue.length > 0) {



      } else {

        // toastr.info("Todas las respuestas de las preguntas deben de tener una descripción para poder continuar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Todas las respuestas de las preguntas deben de tener una descripción para poder continuar.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

        $("#contentAdv").append(`<li><b>Pregunta ${Number(question) + 1}: </b>Es necesario que todas las respuestas de la pregunta tengan una descripción para poder continuar.</li>`);

      }

    } else {

      // toastr.info("Ingrese al menos una respuesta a la pregunta para poder continuar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ingrese al menos una respuesta a la pregunta para poder continuar.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    }

  } else {

    if (_dataQuestions[question].answers.length > 0) {

      let anwsersNoValue = _dataQuestions[question].answers.filter(answer => answer == '');

      if (anwsersNoValue.length > 0) {

        // toastr.info("Todas las respuestas de las preguntas deben de tener una descripción para poder continuar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Todas las respuestas de las preguntas deben de tener una descripción para poder continuar.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

        $("#contentAdv").append(`<li><b>Pregunta ${Number(question) + 1}: </b>Es necesario que todas las respuestas de la pregunta tengan una descripción para poder continuar.</li>`);

      } else {

        $("#contentAdv").append("<li>Sin advertencias</li>");

        $("#content_answersM").empty();

        cleanVerifyInputs('dv_newResponseExpected');

        $("#sel_lvl").select2({
          dropdownParent: $('#dv_newResponseExpected'),
          width: "100%",
        });

        $("#QuestionRE").val(question);

        let allAnswers = _dataQuestions[question].answers;

        contentHTMLAnswers = "";

        allAnswers.forEach((answer, i)=> {

          let newOption = contentOptions[i];

          let checked = "";

          if (i == 0) {

            checked = "checked";

          } else {

            checked = "";

          }

          contentHTMLAnswers += `

<li class="list-group-item border-0">

  <div class="form-check">

    <input class="form-check-input answerForSelected" type="radio" name="ques${question}" ${checked} data-answer="${i}" id="answer_${question}_${i}">

    <label class="form-check-label" for="answer_${question}_${i}">

      ${newOption}) ${answer}

    </label>

  </div>

</li>`;

        });

        let contentFinalHTML = `<ul>${contentHTMLAnswers}</ul>`;

        $("#content_answersM").append(contentFinalHTML);

        // openMMinNoMaximizable('Agregar nueva respuesta esperada','dv_newResponseExpected',false);

        const modal = new bootstrap.Modal(document.getElementById('dv_newResponseExpected'));

        modal.show();



      }

    } else {

      // toastr.info("Ingrese al menos una respuesta a la pregunta para poder continuar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ingrese al menos una respuesta a la pregunta para poder continuar.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

    }

  }

}



function addAnswerExpectedQuestionSV(answer, question, lvl){

  return new Promise(async(resolve, reject) => {

    const dataSend = {

      op: "addAnswerExpectedQuestionSV",

      answer: answer,

      question: question,

      lvl: lvl,

    };

    try {

      const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

      if (ajaxR !== undefined) {

        resolve(true);

      } else {

        resolve(false);

      }

    } catch (e) {

      reject(e);

    }

  });

}



async function addaddResponseExpectedQuestionOld(){

  let answerSelected = $(".answerForSelectedOld:checked");

  if (answerSelected.length > 0) {

    let typeAnswer = answerSelected.data('typeanswer');

    let question = $("#QuestionREOld").val();

    const lvlSelected = $("#sel_lvlOld").val();

    if (typeAnswer == "old") {

      let idAnswer = answerSelected.data('answerid');

      let idQuestion = _dataQuestionsSaved[question].IdQuestion;

      addAnswerExpectedQuestionSV(idAnswer, idQuestion, lvlSelected)

      .then(resultQuery => {

        if (resultQuery) {

          lvlSelected.forEach( lvlS => {

            _dataQuestionsSaved[question].expectedValue.push({

              IdQuestion: idQuestion,

              lvl: lvlS,

              answerExpected: idAnswer

            });

          });

          printTableLvlsSavedSV(question);

          // Cerrar modal Bootstrap 5
          bootstrap.Modal.getInstance(document.getElementById('dv_OldResponseExpected'))?.hide();

        } else {

          // toastr.info("Ha ocurrido un problema al guardar la respuesta esperada seleccionada");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ha ocurrido un problema al guardar la respuesta esperada seleccionada.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

        }

      })

      .catch(error => {

        console.error(error);

      });

    } else {

      let answer = answerSelected.data('answernew');

      let allexpectedValue = [];

      if (_dataQuestionsSaved[question].expectedValueNew !== undefined) {

        allexpectedValue = _dataQuestionsSaved[question].expectedValueNew;

        if (allexpectedValue.length > 0) {

          lvlSelected.forEach( lvl => {

            const whitResponse = _dataQuestionsSaved[question].expectedValueNew.filter(lvlS => lvlS.lvl == lvl);

            if (whitResponse.length > 0) {

              for (var i = 0; i < _dataQuestionsSaved[question]["expectedValueNew"].length; i++) {

                if (_dataQuestionsSaved[question].expectedValueNew[i].lvl == lvl) {

                  _dataQuestionsSaved[question].expectedValueNew[i].answer = answer;

                  break;

                }

              }

            } else {

              _dataQuestionsSaved[question].expectedValueNew.push({

                lvl: lvl,

                answer: answer

              });

            }

          });

        } else {

          lvlSelected.forEach( lvl => {

            _dataQuestionsSaved[question].expectedValueNew.push({

              lvl: lvl,

              answer: answer

            });

          });

        }

      } else {

        _dataQuestionsSaved[question].expectedValueNew = [];

        lvlSelected.forEach( lvl => {

          _dataQuestionsSaved[question].expectedValueNew.push({

            lvl: lvl,

            answer: answer

          });

        });

      }

    }

    printTableLvlsSavedSV(question);

    // Cerrar modal Bootstrap 5
    bootstrap.Modal.getInstance(document.getElementById('dv_OldResponseExpected'))?.hide();

  } else {

    // toastr.info("Ha ocurrido un problema al obtener la respuesta seleccionada");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ha ocurrido un problema al obtener la respuesta seleccionada.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

  }

}



function addaddResponseExpectedQuestion(){

  let answerSelected = $('.answerForSelected:checked');

  if (answerSelected.length > 0) {

    let answer = answerSelected.data('answer');

    let question = $("#QuestionRE").val();

    const lvlSelected = $("#sel_lvl").val();

    const allexpectedValue = _dataQuestions[question].expectedValue;

    if (allexpectedValue.length > 0) {

      lvlSelected.forEach( lvl => {

        const whitResponse = _dataQuestions[question].expectedValue.filter(lvlS => lvlS.lvl == lvl);

        if (whitResponse.length > 0) {

          for (var i = 0; i < _dataQuestions[question]["expectedValue"].length; i++) {

            if (_dataQuestions[question].expectedValue[i].lvl == lvl) {

              _dataQuestions[question].expectedValue[i].answer = answer;

              break;

            }

          }

        } else {

          _dataQuestions[question].expectedValue.push({

            lvl: lvl,

            answer: answer

          });

        }

      });

    } else {

      lvlSelected.forEach( lvl => {

        _dataQuestions[question].expectedValue.push({

          lvl: lvl,

          answer: answer

        });

      });

    }

    printTableLvls(question);

    // Cerrar modal Bootstrap 5
    bootstrap.Modal.getInstance(document.getElementById('dv_newResponseExpected'))?.hide();

  } else {

    // toastr.info("Ha ocurrido un problema al obtener la respuesta seleccionada");

            const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Ha ocurrido un problema al obtener la respuesta seleccionada.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

  }

}



function resultAfterInsertQuestion(typeQuestion, question, skipModalHide = false) {
  if (typeQuestion == 2) {
    printTableLvls(question);
  } else if (typeQuestion == 4) {
    printOptionSelectAnswer(question);
  }
  if (!skipModalHide) {
    $('.modal').modal('hide');
  }
  // Colapsar todas las demás tarjetas (accordion)
  document.querySelectorAll('.evq-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.classList.add('collapsed');
  });
  // Expandir la tarjeta recién creada
  const newCard = document.getElementById(`dvQuestion${question}`);
  if (newCard) {
    newCard.classList.remove('collapsed');
    newCard.classList.add('expanded');
    newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Inicializar Select2 en competencia
    const $compSelect = $(newCard).find('.sel-competence-inline:not(.select2-hidden-accessible)');
    if ($compSelect.length) {
      $compSelect.select2({
        width: '100%',
        dropdownParent: $('body'),
        minimumResultsForSearch: 5
      });
    }
  }
  if (typeof evqUpdateMetaBar === 'function') {
    evqUpdateMetaBar();
  }

  // Medida defensiva: si la evaluación está publicada, deshabilitar la nueva tarjeta también
  disableAllQuestionInputs();
}



function printOptionSelectAnswer(question) {
  let container = $(`#containerSelectAnswers${question}`);
  container.empty();
  let contentHTML = '<div class="evq-pills-wrap">';
  if (_dataQuestions[question].answers.length > 0) {
    _dataQuestions[question].answers.forEach((data, i) => {
      let newOption = contentOptions[i];
      let checked = (_dataQuestions[question].expectedValue == i) ? 'checked' : '';
      let activeClass = checked ? 'active' : '';
      contentHTML += `
        <label class="evq-pill ${activeClass}">
          <input type="radio" class="evq-pill-radio selectPerQuestion" name="correctAnswer${question}" value="${i}" data-question="${question}" ${checked}>
          <span class="evq-pill-label">${newOption}</span>
          <span style="font-size:12px;">${data || 'Opción ' + newOption}</span>
        </label>`;
    });
  }
  contentHTML += '</div>';
  container.append(contentHTML);
}

function printOptionSelectAnswerSV(question) {
  let container = $(`#containerSelectAnswersSV${question}`);
  container.empty();
  let contentHTML = '<div class="evq-pills-wrap">';
  let currentExpected = _dataQuestionsSaved[question].expectedValue;

  if (_dataQuestionsSaved[question].answers.length > 0) {
    _dataQuestionsSaved[question].answers.forEach((data, i) => {
      let newOption = contentOptions[i];
      let checked = (currentExpected && currentExpected.IdAnswerExpected == data.idAnswer) ? 'checked' : '';
      let activeClass = checked ? 'active' : '';
      contentHTML += `
        <label class="evq-pill ${activeClass}">
          <input type="radio" class="evq-pill-radio selectPerQuestionSV" name="correctAnswerSV${question}" value="${data.idAnswer}" data-question="${question}" data-typeexpected="old" ${checked}>
          <span class="evq-pill-label">${newOption}</span>
          <span style="font-size:12px;">${data.DescAnswer || 'Opción ' + newOption}</span>
        </label>`;
    });
  }
  if (_dataQuestionsSaved[question].newAnswers && _dataQuestionsSaved[question].newAnswers.length > 0) {
    _dataQuestionsSaved[question].newAnswers.forEach((data, i) => {
      let newOption = contentOptions[(_dataQuestionsSaved[question].answers.length + i)];
      let val = `${question}-${i}`;
      let checked = (currentExpected && currentExpected.typeExpectedValue === 'new' && currentExpected.expectedNew === i) ? 'checked' : '';
      let activeClass = checked ? 'active' : '';
      contentHTML += `
        <label class="evq-pill ${activeClass}">
          <input type="radio" class="evq-pill-radio selectPerQuestionSV" name="correctAnswerSV${question}" value="${val}" data-question="${question}" data-typeexpected="new" ${checked}>
          <span class="evq-pill-label">${newOption}</span>
          <span style="font-size:12px;">${data || 'Opción ' + newOption}</span>
        </label>`;
    });
  }
  contentHTML += '</div>';
  container.append(contentHTML);
  if (currentExpected) {
    _dataQuestionsSaved[question].expectedValue.edited = false;
    _dataQuestionsSaved[question].expectedValue.typeExpectedValue = "old";
  }
}



function changeRangeValues(question,newValue, typeRange){

  if (typeRange == "initial") {

    _dataQuestions[question].rangeInitial = newValue;

  } else {

    _dataQuestions[question].rangeEnd = newValue;

  }

}



async function deleteQuestionSaved(idQuestion, position){

  // Confirmar eliminación antes de llamar al servidor
  const confirm = await Swal.fire({
    title: '¿Eliminar pregunta?',
    text: 'Esta acción eliminará la pregunta de forma permanente y no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  });

  if (!confirm.isConfirmed) return;

  const dataSend = {

    op: "deleteQuestionSaved",

    idQuestion: idQuestion

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    let posicion = _dataQuestionsSaved.findIndex( data => data.IdQuestion == idQuestion);

    $(`#dvContentSV${idQuestion}`).remove();

    let allVisibleQuestions = document.querySelectorAll('.dvContentSV');

    if (allVisibleQuestions.length > 0) {

      allVisibleQuestions.forEach((question, i) => {

        let titleQ = question.querySelector('.titleQuestionOld');

        if (titleQ !== undefined) {

          titleQ.textContent = `${i + 1}.- Pregunta`;

        }

      });

    }

    if (_dataQuestions.length > 0) {

      let allNewQuestions = document.querySelectorAll('.dvContentQuestion');

      if (allNewQuestions.length > 0) {

        allNewQuestions.forEach((newQuestion, i) => {

          let titleQ = newQuestion.querySelector('.titleNewQuestion');

          if (titleQ !== undefined) {

            titleQ.textContent = `${allVisibleQuestions.length + ( i + 1 )}.- Pregunta`;

          }

        });

      }

    }

  }

}



function changeRangeValuesSV(question,newValue, typeRange){

  if (typeRange == "initial") {

    _dataQuestionsSaved[question].rangeInitial = newValue;

  } else {

    _dataQuestionsSaved[question].rangeEnd = newValue;

  }

  _dataQuestionsSaved[question].edited = true;

}



async function deleteResultExpectedSV(lvl, answer, question){

  const dataSend = {

    op: "deleteResultExpectedSV",

    lvl: lvl,

    answer: answer,

    question: question

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    let posicion = _dataQuestionsSaved.findIndex(objeto => objeto.IdQuestion == question);

    _dataQuestionsSaved[posicion].expectedValue = _dataQuestionsSaved[posicion].expectedValue.filter( expectedOld => expectedOld.lvl != lvl);

    printTableLvlsSavedSV(posicion);

  }

}



function deleteResultExpected(lvl, answer, question) {

  const newValues = _dataQuestions[question].expectedValue.filter( registro => {return !(registro.lvl == lvl && registro.answer == answer)});

  _dataQuestions[question].expectedValue = newValues;

  _dataQuestions[question].edited = true;

  printTableLvls(question);

}



function deleteResultExpectedSVNew(lvl, answer, question){

  // console.log(_dataQuestionsSaved[question]);

  const newValues = _dataQuestionsSaved[question].expectedValueNew.filter( registro => {return !(registro.lvl == lvl && registro.answer == answer)});

  _dataQuestionsSaved[question].expectedValueNew = newValues;

  _dataQuestionsSaved[question].edited = true;

  printTableLvlsSavedSV(question);

}



async function saveNewDataOldQuestion(idQuestion, position){

  const dataSend = {

    op: "saveNewDataOldQuestion",

    data: JSON.stringify(_dataQuestionsSaved[position])

  };

  const ajaxR = await pAjaxAsync(url_m_Evaluaciones, dataSend, 1);

  if (ajaxR !== undefined) {

    // setTimeout(function () {

    //   location.reload();

    // }, 1500);

  }

}



function updateCompetenceQuestion(question, typeSV, competenceId) {
  // Fallback para compatibilidad con modal antiguo
  if (question === undefined) question = $("#updateComp_question").val();
  if (typeSV === undefined) typeSV = $("#updateComp_typeSave").val();
  if (competenceId === undefined) competenceId = $("#sel_CompetencesUpdateOld").val();

  const posicion = _allCompetences.findIndex(elemento => elemento.idCompetencias == competenceId);
  if (posicion < 0) return;
  let newCompetence = _allCompetences[posicion].Competencia;

  if (typeSV == "old") {
    _dataQuestionsSaved[question].competence = _allCompetences[posicion].idCompetencias;
    _dataQuestionsSaved[question].descCompetence = newCompetence;
    _dataQuestionsSaved[question].edited = true;
    // Actualizar badge en header de tarjeta
    const card = document.getElementById(`dvContentSV${_dataQuestionsSaved[question].IdQuestion}`);
    if (card) {
      const compBadge = card.querySelector('.badge-comp');
      if (compBadge) compBadge.textContent = newCompetence;
    }
  } else if (typeSV == "new") {
    _dataQuestions[question].competence = _allCompetences[posicion].idCompetencias;
    _dataQuestions[question].descCompetence = newCompetence;
    const card = document.getElementById(`dvQuestion${question}`);
    if (card) {
      const compBadge = card.querySelector('.badge-comp');
      if (compBadge) compBadge.textContent = newCompetence;
    }
  }
}



// window.deleteResExpectedSF = function(e){

//   let div = document.createElement('div');

//   let btn = document.createElement('button');

//   let iBtn = document.createElement('i');

//   btn.className = 'btn btn-danger';

//   btn.setAttribute("onclick", `deleteResultExpected('${e.lvl}','${e.answer}','${e.question}')`);

//   iBtn.className = 'fas fa-ban';

//   btn.appendChild(iBtn);

//   div.appendChild(btn);

//   return div.outerHTML;

// }

window.deleteResExpectedSF = function(e) {

  let div = document.createElement('div');

  let btn = document.createElement('button');

  let iBtn = document.createElement('span'); 

  

  btn.className = 'btn-minimal btn-minimal-danger btn-sm';

  btn.setAttribute("onclick", `deleteResultExpected('${e.lvl}','${e.answer}','${e.question}')`);

  

  iBtn.className = 'material-icons';

  iBtn.textContent = 'block'; 

  iBtn.style.verticalAlign = 'middle'; 

  

  btn.appendChild(iBtn);

  div.appendChild(btn);

  

  return div.outerHTML;

}



window.deleteResExpectedSVSF = function(e){

  let div = document.createElement('div');

  let btn = document.createElement('button');

  let iBtn = document.createElement('span');

  btn.className = 'btn-minimal btn-minimal-danger btn-sm';

  btn.setAttribute("onclick", `deleteResultExpectedSV('${e.lvl}','${e.answerExpected}','${e.IdQuestion}')`);

  iBtn.className = 'material-icons';

  iBtn.textContent = 'block'; 

  iBtn.style.verticalAlign = 'middle'; 

  btn.appendChild(iBtn);

  div.appendChild(btn);

  return div.outerHTML;

}



window.deleteResExpectedSVNewSF = function(e){

  let div = document.createElement('div');

  let btn = document.createElement('button');

  let iBtn = document.createElement('span');

  btn.className = 'btn-minimal btn-minimal-danger btn-sm';

  btn.setAttribute("onclick", `deleteResultExpectedSVNew('${e.lvl}','${e.answer}','${e.question}')`);

  iBtn.className = 'material-icons';

  iBtn.textContent = 'block'; 

  iBtn.style.verticalAlign = 'middle'; 

  btn.appendChild(iBtn);

  div.appendChild(btn);

  return div.outerHTML;

}



/**
 * Cambia el tipo de una pregunta nueva ya existente sin eliminarla.
 * Actualiza _dataQuestions[index] y regenera el cuerpo de la tarjeta.
 */
function changeQuestionType(index, newType, newCompetence) {
  let decodeType = atob(newType);
  let dataTypeQ = _typeQuestions.filter(typeQ => typeQ.idTipoPregunta == newType);
  let dataCompetence = _allCompetences.filter(comp => comp.idCompetencias == newCompetence);

  if (!dataTypeQ.length || !dataCompetence.length) return;

  // Construir el nuevo objeto de datos según tipo
  let newData = {
    typeQuestion: newType,
    descTypeQuestion: dataTypeQ[0]["Descripcion"],
    competence: newCompetence,
    descCompetence: dataCompetence[0]["Competencia"],
    titleQuestion: _dataQuestions[index].titleQuestion,
    descriptionQuestion: _dataQuestions[index].descriptionQuestion,
    saveInBdd: false,
    edited: false
  };

  switch (decodeType) {
    case '1':
      newData.expectedValue = false;
      break;
    case '2':
      newData.answers = ["", ""];
      newData.expectedValue = [];
      break;
    case '3':
      newData.rangeInitial = 0;
      newData.rangeEnd = 100;
      break;
    case '4':
      newData.answers = ["", ""];
      newData.expectedValue = 0;
      break;
  }
  _dataQuestions[index] = newData;

  // Construir nuevo cuerpo según tipo
  let typeBadgeClass = `badge-type-${decodeType}`;
  let contentPlusHTML = "";
  let contentRight = "";

  switch (decodeType) {
    case '1':
      contentRight = `
        <div class="evq-field">
          <label>Respuesta correcta</label>
          <div class="evq-toggle-wrap">
            <button type="button" class="evq-toggle-btn active changeTrue-False" data-question="${index}" data-value="false">Falso</button>
            <button type="button" class="evq-toggle-btn changeTrue-False" data-question="${index}" data-value="true">Verdadero</button>
          </div>
        </div>`;
      break;
    case '2':
      contentPlusHTML = `
        <div class="evq-field">
          <label>Opciones de respuesta</label>
          <div id="contentAnswers${index}">
            <div class="evq-option-row" id="answer${index}-0">
              <span class="evq-opt-label">a</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="0" data-question="${index}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="0" data-question='${index}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
            <div class="evq-option-row" id="answer${index}-1">
              <span class="evq-opt-label">b</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="1" data-question="${index}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="1" data-question='${index}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
          </div>
          <button type="button" class="evq-add-opt addanswer" data-question='${index}'><span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar opción</button>
        </div>`;
      contentRight = `
        <div class="evq-field">
          <div class="evq-levels-box">
            <div class="evq-levels-header">
              <span class="evq-levels-title">Respuestas esperadas por nivel</span>
              <button type="button" class="evq-btn evq-btn-primary" style="padding:0.35rem 0.7rem;font-size:12px;" onclick="seeExpectedResponse('${index}','new')"><span class="material-symbols-outlined" style="font-size:14px">add</span> Agregar</button>
            </div>
            <div id="contentTableLvlsQuestion${index}"></div>
          </div>
        </div>`;
      break;
    case '3':
      contentRight = `
        <div class="evq-field">
          <label>Rango permitido para la respuesta</label>
          <div class="evq-range-row">
            <div class="evq-field">
              <label>Rango mínimo <span class="req">*</span></label>
              <input type="number" class="form-control changeRange" value="0" data-question='${index}' data-typenum="initial" placeholder="0">
            </div>
            <div class="evq-field">
              <label>Rango máximo <span class="req">*</span></label>
              <input type="number" class="form-control changeRange" value="100" data-question='${index}' data-typenum="end" placeholder="100">
            </div>
          </div>
        </div>`;
      break;
    case '4':
      contentPlusHTML = `
        <div class="evq-field">
          <label>Opciones de respuesta</label>
          <div id="contentAnswers${index}">
            <div class="evq-option-row" id="answer${index}-0">
              <span class="evq-opt-label">a</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="0" data-question="${index}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="0" data-question='${index}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
            <div class="evq-option-row" id="answer${index}-1">
              <span class="evq-opt-label">b</span>
              <input type="text" class="evq-opt-input answerInp" placeholder="Descripción de la respuesta" data-answer="1" data-question="${index}">
              <button type="button" class="evq-opt-remove removeAnswer" data-removeanswer="1" data-question='${index}' title="Eliminar respuesta"><span class="material-symbols-outlined" style="font-size:14px">close_small</span></button>
            </div>
          </div>
          <button type="button" class="evq-add-opt addanswer" data-question='${index}'><span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar opción</button>
        </div>`;
      contentRight = `
        <div class="evq-field">
          <label>Respuesta correcta</label>
          <div id="containerSelectAnswers${index}"></div>
        </div>`;
      break;
  }

  // Reconstruir el cuerpo de la tarjeta
  let displayNum = _dataQuestionsSaved.length + (index + 1);
  let newBodyHTML = `
    <div class="evq-card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="evq-field">
            <label>Título <span class="req">*</span></label>
            <input type="text" class="form-control updatePrincipalInfo" id="title${index}" data-typeinp="title" data-question="${index}" placeholder="Ingrese el título de la pregunta" value="${_dataQuestions[index].titleQuestion || ''}">
          </div>
        </div>
        <div class="col-md-6">
          <div class="evq-field">
            <label>Competencia <span class="req">*</span></label>
            <select class="form-select sel-competence-inline" id="selCompetenceNew${index}" data-question="${index}" data-typequestionsv="new" style="width:100%;">
              ${_allCompetences.map(c => `<option value="${c.idCompetencias}" ${c.idCompetencias == newCompetence ? 'selected' : ''}>${c.Competencia}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="evq-field">
            <label>Pregunta / Descripción <span class="req">*</span></label>
            <input type="text" class="form-control updatePrincipalInfo" id="desc${index}" data-typeinp="txQuestion" data-question="${index}" placeholder="Ingrese la pregunta" value="${_dataQuestions[index].descriptionQuestion || ''}">
          </div>
        </div>
        ${contentPlusHTML}
      </div>
      ${contentRight}
    </div>`;

  const card = document.getElementById(`dvQuestion${index}`);
  if (!card) return;

  // Actualizar badge de tipo en el header
  card.querySelector('.evq-meta-line').innerHTML = `
    <span class="badge ${typeBadgeClass}">${dataTypeQ[0]["Descripcion"]}</span>
    <span class="badge badge-comp">${dataCompetence[0]["Competencia"]}</span>`;

  // Reemplazar cuerpo
  const oldBody = card.querySelector('.evq-card-body');
  if (oldBody) oldBody.remove();
  card.insertAdjacentHTML('beforeend', newBodyHTML);

  // Re-inicializar Select2 en el nuevo select de competencia
  const $compSelect = $(`#selCompetenceNew${index}`);
  if ($compSelect.length && !$compSelect.hasClass('select2-hidden-accessible')) {
    $compSelect.select2({
      width: '100%',
      dropdownParent: $('body'),
      minimumResultsForSearch: 5
    });
  }

  // Inicializar contenido extra si aplica (pills de tipo 4, chips de tipo 2)
  resultAfterInsertQuestion(parseInt(decodeType), index, true);
}

