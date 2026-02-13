ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=');



const myKeysValues = window.location.search;

const urlParams = new URLSearchParams(myKeysValues);

const e_valuation = urlParams.get('Ev');

let _dataQuestions = [],

    _dataQuestionsSaved = [],

    _typeQuestions = [],

    _allCompetences = [];

let contentOptions = "abcdefghijklmnopqrstuvwxyz";

const sel_lvlOld = document.getElementById('sel_lvlOld');

loadInitialFunctions();

async function loadInitialFunctions(){

  getQuestionTypes();

  getCompetencesActive();

  getLevelsEmployees();

  getQuestionsPerEvaluation();

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

  

  // Limpiar el contenedor antes de agregar preguntas

  $("#contentQuestions").empty();

  

  if (_dataQuestionsSaved.length > 0) {

    let arrNumPositions = Array.from({ length: _dataQuestionsSaved.length }, (_, i) => i);

    for (let position of arrNumPositions) {

      try {

        let resultF = await printQuestionEsp(position);

        $("#contentQuestions").append(resultF.contentHTML);

        if (resultF.type == 2) {

          await printTableLvlsSavedSV(resultF.number);

        // await printTableLvlsSaved(resultF.number);

        } else if (resultF.type == 4) {

          printOptionSelectAnswerSV(resultF.number);

        }

      } catch (error) {

        console.error("Error al renderizar pregunta en posición", position, ":", error);

      }

    }

  } else {

    console.log("printActualQuestions - No hay preguntas guardadas para mostrar");

    $("#contentQuestions").html('<div class="alert alert-info text-center">No hay preguntas configuradas para esta evaluación.</div>');

  }

}



function printQuestionEsp(i) {

  return new Promise((resolve, reject) => {

    let dataQuestion = _dataQuestionsSaved[i];

    let contentPlusHTML = "";

    let contentRight = "";

    let decodeType = atob(dataQuestion.typeQuestion);

    let contentAnswers = "";

    let optionAn = "";

    let btnDeleteAnswer = "";

    switch (decodeType) {

      case "1":

      let checked = "";

      if (dataQuestion.expectedValue) {

        checked = "checked";

      }

      contentRight = `

<div class="row">

  <div class="col text-center">

     <labe class="form-label"l>Seleccione la respuesta correcta a la pregunta</label>

    <div class="d-flex justify-content-center align-items-center">

      <label class="form-check-label ms-2">Falso/Verdadero</label>

    </div>

    <div class="form-check form-switch d-flex justify-content-center">

      <input class="form-check-input changeTrue-False True-FalseSV" 

             type="checkbox" 

             ${checked}

             data-question="${i}"

             style="width: 3em; height: 1.5em;">

    </div>

  </div>

</div>`;

        break;

      case "2":

        dataQuestion.answers.forEach( (answer, indexAn) => {

          if (dataQuestion.answers.length > 2) {

            btnDeleteAnswer = `<button class="btn btn-danger" onclick="verifyRemoveAnswerSV('${answer.idAnswer}','${dataQuestion.IdQuestion}','${i + 1}')"><span class="material-symbols-outlined">close_small</span></button>`;

          }

          optionAn = contentOptions[indexAn];

          contentAnswers += `

                    <div class="col-12 mb-2" id="answerSV${answer.idAnswer}-${dataQuestion.IdQuestion}">

                      <div class="d-flex align-items-center gap-2">

                        <span class="fw-bold">${optionAn})</span>

                        <input placeholder="Ingrese la descripción de la respuesta" value="${answer.DescAnswer}" data-answersv="${answer.idAnswer}" data-question="${i}" class="form-control form-control-solid-bordered  contentAnswerSVOld" />

                        ${btnDeleteAnswer}

                      </div>

                    </div>

          `;

        });

        contentPlusHTML = `

          <div class="col-12">

            <div class="row">

              <div class="col-12 d-flex justify-content-between align-items-center">

            	<label class="form-label mb-0">Respuestas:</label>

                <button class="addanswerSV btn btn-primary" onclick="addAnswerQuestionSV('${i}')"><span class="material-symbols-outlined">add</span></button>

            </div>

            <hr>

            <div class="row" id="containerAnswersSV${dataQuestion.IdQuestion}">

              ${contentAnswers}

            </div>

          </div>`;

        contentRight = `

<div class="row">

  <div class="col-12">

    <button class="btn btn-warning btn-warning" onclick="seeExpectedResponseSV('${i}')">Agregar respuesta esperada</button>

    <hr>

  </div>

  <div class="col-12" id="contentTableLvlsQuestionSV${i}"></div>

</div>`;

        break;

      case "3":

      contentRight = `

<div class="row">

  <div class="col-12">

    <label class="form-label mb-0">Ingrese los rangos disponibles para la pregunta</label>

    <hr>

  </div>

  <div class="col-12">

    <div class="row">

      <div class="col-12 mb-2">

        <label class="form-label">Rango Inicial:</label>

        <input type="number" class="form-control form-control-solid-bordered changeRangeSV" 

               value="${dataQuestion.rangeInitial}" 

               data-question='${i}' 

               data-typenum="initial"/>

      </div>

      <div class="col-12 ">

        <label class="form-label">Rango Final:</label>

        <input type="number" class="form-control form-control-solid-bordered changeRangeSV" 

               value="${dataQuestion.rangeEnd}" 

               data-question='${i}' 

               data-typenum="end"/>

      </div>

    </div>

  </div>

</div>`;

        break;

      case "4":

      dataQuestion.answers.forEach( (answer, indexAn) => {

        if (dataQuestion.answers.length > 2) {

          btnDeleteAnswer = `<button class="btn btn-danger" onclick="verifyRemoveAnswerSV('${answer.idAnswer}','${dataQuestion.IdQuestion}','${i + 1}')"><span class="material-symbols-outlined">close_small</span></button>`;

        }

        optionAn = contentOptions[indexAn];

        contentAnswers += `

<div class="col-12 mb-2" id="answerSV${answer.idAnswer}-${dataQuestion.IdQuestion}">

  <div class="d-flex align-items-center gap-2 mb-3">

    <span class="fw-bold me-2">${optionAn})</span>

    <input placeholder="Ingrese la descripción de la respuesta" 

           value="${answer.DescAnswer}" 

           data-answersv="${answer.idAnswer}" 

           data-question="${i}" 

           class="form-control form-control-solid-bordered contentAnswerSVOld" />

    ${btnDeleteAnswer}

  </div>

</div>`;

      });

      contentPlusHTML = `

<div class="col-12">

  <div class="row">

    <div class="col-12 d-flex justify-content-between align-items-center">

      <label class="form-label mb-0">Respuestas:</label>

      <button class="addanswerSV btn btn-primary" onclick="addAnswerQuestionSV('${i}')">

        <span class="material-symbols-outlined">add</span>

      </button>

    </div>

  </div>

  <hr>

  <div class="row" id="containerAnswersSV${dataQuestion.IdQuestion}">

    ${contentAnswers}

  </div>

</div>`;

      contentRight = `

<div class="row">

  <div class="col-12">

    <label class="form-label">Seleccione la respuesta correcta de la pregunta:</label>

  </div>

  <div class="col-12">

    <select id="selectAnswersSV${i}" data-question='${i}' class="form-select selectPerQuestionSV" style="width:100%;"></select>

  </div>

</div>`;

        break;

      default:

        // Agrega tu lógica para el tipo por defecto si es necesario

    }



    let contentFinalHTML = `

<div class="col-12 dvContentSV" id="dvContentSV${dataQuestion.IdQuestion}">

  <div class="card">

    <div class="card-body">

      <div class="row">

        <div class="col-6 d-flex align-items-center">

          <label id="txQuest${i}" class="card-title mb-0 titleQuestionOld">${i + 1}.- Pregunta</label>

        </div>

        <div class="col-6 d-flex justify-content-end">

          <button class="btn btn-success me-2" onclick="saveNewDataOldQuestion('${dataQuestion.IdQuestion}','${i}')">

            <span class="material-symbols-outlined">save</span> Guardar

          </button>

          <button class="btn btn-danger deleteNoSaved" onclick="deleteQuestionSaved('${dataQuestion.IdQuestion}','${i}')" data-typequestion="old">

            <span class="material-symbols-outlined">delete</span> Eliminar

          </button>

        </div>

      </div>



      <div class="row d-flex justify-content-center align-items-center w-100 mt-3">

        <div class="col-12 text-center">

          <label class="form-label">Tipo: </label>

          <span class="badge badge-style-bordered badge-success mb-4">${dataQuestion.descTypeQuestion}</span>

        </div>

      </div>



      <div class="row d-flex justify-content-center align-items-center w-100">

        <div class="col-12 text-center">

          <label class="form-label">Competencia seleccionada:</label>

          <label style="cursor: pointer;" class="badge badge-style-bordered badge-success mb-4 changeCompetenceSV" 

                data-question="${i}" 

                data-typequestionsv="old" 

                id="txCompetence${i}">

            ${dataQuestion.descCompetence}

          </label>

        </div>

      </div>



      <div class="col-12">

        <div class="row">

          <div class="col-12">

            <label class="form-label">Título</label>

            <input type="text" 

                   class="form-control form-control-solid-bordered updatePrincipalInfoOld" 

                   id="titleQuestionSV${dataQuestion.IdQuestion}" 

                   value="${dataQuestion.titleQuestion}" 

                   data-typeinp="title" 

                   data-question="${i}" 

                   required 

                   placeholder="Ingrese el título de la pregunta"/>

            <p for="titleQuestionSV${dataQuestion.IdQuestion}" data-msg="El título es obligatorio"></p>

          </div>

          <div class="col-12">

            <label class="form-label">Pregunta</label>

            <input type="text" 

                   class="form-control form-control-solid-bordered updatePrincipalInfoOld" 

                   id="descriptionQuestionSV${dataQuestion.IdQuestion}" 

                   value="${dataQuestion.descriptionQuestion}" 

                   data-typeinp="txQuestion" 

                   data-question="${i}" 

                   required 

                   placeholder="Ingrese la pregunta"/>

            <p for="descriptionQuestionSV${dataQuestion.IdQuestion}" data-msg="La descripción es obligatoria"></p>

          </div>

          ${contentPlusHTML}

        </div>

      </div>

      <hr class="mt-2">

      <div class="col-12">

        ${contentRight}

      </div>

    </div>

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



async function addAnswerQuestionSV(question){

  if (_dataQuestionsSaved[question].newAnswers === undefined){

    _dataQuestionsSaved[question].newAnswers = [];

  }

  const idQuestion = _dataQuestionsSaved[question].IdQuestion;

  const typeQuestion = _dataQuestionsSaved[question].typeQuestion;

  _dataQuestionsSaved[question].newAnswers.push('');

  let countBeforeInsert = ((_dataQuestionsSaved[question].answers.length + _dataQuestionsSaved[question].newAnswers.length) - 1);

  let cantNew = (_dataQuestionsSaved[question].newAnswers.length - 1);

  $(`#containerAnswersSV${question}`).empty();

  let newContentHTML = "";

  let optionAn = "";

  optionAn = contentOptions[countBeforeInsert];

  newContentHTML += `

<div class="col-12 mb-2" id="answerSVNew${cantNew}-${idQuestion}">

    <div class="d-flex align-items-center gap-2">

        <span class="fw-bold">${optionAn})</span>

        <input class="form-control form-control-solid-bordered contentAnswerSVNew" 

               placeholder="Ingrese la descripción de la respuesta" 

               data-answersvnew="${cantNew}" 

               data-question="${question}"/>

        <button class="btn btn-danger" onclick="removeAnswerQSVNew('${cantNew}','${idQuestion}','${question}')">

            <span class="material-symbols-outlined">close_small</span>

        </button>

    </div>

</div>`;

  $(`#containerAnswersSV${idQuestion}`).append(newContentHTML);

  if (atob(typeQuestion) == 4){

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



function rePrintAnswersSV(question, answer, index, type, typeQuestion){

  if ( type === "old" ) {

    _dataQuestionsSaved[index].answers = _dataQuestionsSaved[index].answers.filter( answerData => Number(answerData.idAnswer) != Number(answer));

  } else {

    _dataQuestionsSaved[index].newAnswers.splice(answer, 1);

  }

  $(`#containerAnswersSV${question}`).empty();



  let newContentHTML = "";

  let optionAn = "";

  let cantOldAnswers = _dataQuestionsSaved[index].answers.length;

  let cantNewAnswers = _dataQuestionsSaved[index].newAnswers.length;

  _dataQuestionsSaved[index].answers.forEach((answerFE , i) => {

    let btnDeleteAnswer = "";

    if ((cantOldAnswers + cantNewAnswers) > 2){

      btnDeleteAnswer = `    <button class="btn btn-danger" onclick="verifyRemoveAnswerSV('${answerFE.idAnswer}','${question}','${i + 1}')"><span class="material-symbols-outlined">close_small</span></button>`;

    }

    optionAn = contentOptions[i];

    newContentHTML += `

<div class="col-12 mb-2" id="answerSV${answer.idAnswer}-${question}">

  <div class="d-flex align-items-center gap-2">

    <span class="fw-bold">${optionAn})</span>

    <input class="form-control form-control-solid-bordered contentAnswerSV"

           placeholder="Ingrese la descripción de la respuesta"

           value="${answerFE.DescAnswer}"

           data-answersv="${answerFE.idAnswer}" />

    ${btnDeleteAnswer}

  </div>

</div>`;

  });

  _dataQuestionsSaved[index].newAnswers.forEach((newAnswerI, i) => {

    optionAn = contentOptions[(cantOldAnswers + (i))];

    newContentHTML += `

<div class="col-12 mb-2" id="answerSVNew${i}-${question}">

  <div class="d-flex align-items-center gap-2">

    <span class="fw-bold">${optionAn})</span>

    <input class="form-control form-control-solid-bordered contentAnswerSVNew"

           placeholder="Ingrese la descripción de la respuesta"

           value="${newAnswerI}"

           data-answersvnew="${i}"

           data-question="${index}" />

    <button class="btn btn-danger" onclick="removeAnswerQSVNew('${i}','${question}','${index}')">

      <span class="material-symbols-outlined">close_small</span>

    </button>

  </div>

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



function addQuestion(type,competence){

  let decodeType = atob(type);

  let dataTypeQ = _typeQuestions.filter( typeQ => typeQ.idTipoPregunta == type);

  let dataCompetence = _allCompetences.filter( comp => comp.idCompetencias == competence);

  let newNumber = (_dataQuestions.length + 1);

  let contentPlusHTML = "";

  let contentRight = "";

  switch (decodeType) {

    case '1':

      contentRight = `

<div class="row">

  <div class="col text-center">

    <labe class="form-label"l>Seleccione la respuesta correcta a la pregunta</label>

    <div class="d-flex justify-content-center align-items-center"> 

      <label class="form-check-label ms-2">Falso/Verdadero</label>

    </div>

    <div class="form-check form-switch d-flex justify-content-center">

      <input class="form-check-input changeTrue-False True-FalseSV" 

             type="checkbox" 

             data-question="${(newNumber - 1)}"

             style="width: 3em; height: 1.5em;">

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

          expectedValue: false,

          saveInBdd: false,

          edited: false

        });

      break;

    case '2':

    contentPlusHTML = `

      <div class="col-12">

        <div class="row">

          <div class="col-12 d-flex justify-content-between align-items-center">

            <label class="form-label mb-0">Respuestas:</label>

            <button class="addanswer btn btn-primary" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined">add</span></button>

          </div>

        </div>

        <hr>

        <div class="row" id="contentAnswers${(newNumber - 1)}">

          <div class="col-12 mb-2" id="answer${(newNumber - 1)}-0">

              <div class="d-flex align-items-center gap-2">

                <span class="fw-bold">a)</span>

                <input class="form-control form-control-solid-bordered  answerInp" placeholder="Ingrese la descripción de la respuesta" data-answer="0" data-question="${(newNumber - 1)}"/>

                <button class="btn btn-danger removeAnswer" data-removeanswer="${0}" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined">close_small</span></button>

              </div>

          </div>

          <div class="col-12 mb-2" id="answer${(newNumber - 1)}-1">

              <div class="d-flex align-items-center gap-2">

                <span class="fw-bold">b)</span>

                <input class="form-control form-control-solid-bordered answerInp" placeholder="Ingrese la descripción de la respuesta" data-answer="1" data-question="${(newNumber - 1)}"/>

                <button class="btn btn-danger removeAnswer" data-removeanswer="${1}" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined">close_small</span></button>

              </div>

          </div>

        </div>

      </div>`;

      contentRight = `

        <div class="row">

          <div class="col-12">

            <button class="btn btn-warning" onclick="seeExpectedResponse('${(newNumber - 1)}','new')"> Agregar respuesta esperada </button>

            <hr>

          </div>

          <div class="col-12" id="contentTableLvlsQuestion${newNumber - 1}"></div>

        </div>`;

      _dataQuestions.push({

        typeQuestion: type,

        descTypeQuestion: dataTypeQ[0]["Descripcion"],

        competence: competence,

        descCompetence: dataCompetence[0]["Competencia"],

        titleQuestion: "",

        descriptionQuestion: "",

        answers: [

          "",""

        ],

        expectedValue: [],

        saveInBdd: false,

        edited: false

      });

      break;

    case '3':

    contentRight = `

      <div class="row">

        <div class="col-12">

          <label class="form-label mb-0">Ingrese los rangos disponibles para la pregunta</label>

          <hr>

        </div>

        <div class="col-12">

          <div class="row">

            <div class="col-12 mb-2">

              <label class="form-label">Rango Inicial:</label>

              <input type="number" class="form-control form-control-solid-bordered  changeRange" value="0" data-question='${(newNumber - 1)}' data-typenum="initial" />

            </div>

            <div class="col-12">

              <label class="form-label">Rango Final:</label>

              <input type="number" class="form-control form-control-solid-bordered  changeRange" value="100" data-question='${(newNumber - 1)}' data-typenum="end" />

            </div>

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

      <div class="col-12">

        <div class="row">

          <div class="col-12 d-flex justify-content-between align-items-center">

            <label class="form-label mb-0">Respuestas:</label>

            <button class="addanswer btn btn-primary" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined">add</span></button>

          </div>

        </div>

        <hr>

        <div class="row" id="contentAnswers${(newNumber - 1)}">

          <div class="col-12 mb-2" id="answer${(newNumber - 1)}-0">

            <div class="d-flex align-items-center gap-2">

              <span class="fw-bold">a)</span>

              <input class="form-control form-control-solid-bordered answerInp" placeholder="Ingrese la descripción de la respuesta" data-answer="0" data-question="${(newNumber - 1)}"/>

              <button  class="btn btn-danger removeAnswer" data-removeanswer="${0}" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined">close_small</span></button>

            </div>

          </div>

          <div class="col-12 mb-2" id="answer${(newNumber - 1)}-1">

            <div class="d-flex align-items-center gap-2">

                <span class="fw-bold">b)</span>

                <input class="form-control form-control-solid-bordered answerInp" placeholder="Ingrese la descripción de la respuesta" data-answer="1" data-question="${(newNumber - 1)}"/>

                <button class="btn btn-danger removeAnswer" data-removeanswer="${1}" data-question='${(newNumber - 1)}'><span class="material-symbols-outlined">close_small</span></button>

            </div>

          </div>

        </div>

      </div>`;

      contentRight = `

        <div class="row">

          <div class="col-12">

            <label class="form-label">Seleccione la respuesta correcta de la pregunta:</label>

          </div>

          <div class="col-12">

            <select id="selectAnswers${(newNumber - 1)}" data-question='${(newNumber - 1)}' class="from-select selectPerQuestion" style="width:100%;"></select>

          </div>

        </div>`;

      _dataQuestions.push({

        typeQuestion: type,

        descTypeQuestion: dataTypeQ[0]["Descripcion"],

        competence: competence,

        descCompetence: dataCompetence[0]["Competencia"],

        titleQuestion: "",

        descriptionQuestion: "",

        answers: [

          "",""

        ],

        expectedValue: 0,

        saveInBdd: false,

        edited: false

      });

      break;

    default:



  }

  let contentFinalHTML = `

    <div class="col-12 dvContentQuestion" id="dvQuestion${newNumber - 1}">

      <div class="card">

        <div class="card-body">

            <div class="row">

              <div class="col-6 d-flex align-items-center"><label id="txQuest${newNumber - 1}" class="card-title mb-0  titleNewQuestion">${(_dataQuestionsSaved.length + (newNumber))}.- Pregunta (Nueva)</label></div>

              <div class="col-6 d-flex justify-content-end" ><button class="btn btn-danger deleteNoSaved" data-question="${newNumber - 1}" data-typequestion="new"><span class="material-symbols-outlined">delete</span></button></div>

            </div>

          <div class="row">

            <div class="row d-flex justify-content-center align-items-center w-100">

              <div class="col-12 text-center">

                <label class="form-label">Tipo: </label>

                <span class="badge badge-style-bordered badge-success mb-4">${dataTypeQ[0]["Descripcion"]}</span>

              </div>

            </div>

            <div class="row d-flex justify-content-center align-items-center w-100">

              <div class="col-12 text-center">

                <label class="form-label">Competencia seleccionada:</label>

                <label style="cursor: pointer;" class="badge badge-style-bordered badge-success mb-4 changeCompetenceSV" data-question="${newNumber - 1}" data-typequestionsv="new" id="txCompetenceNew${newNumber - 1}">${dataCompetence[0]["Competencia"]}</label>

              </div>

            </div>



            <div class="col-12">

              <div class="row">

                <div class="col-12">

                  <label class="form-label">Título</label>

                  <input type="text" class="form-control form-control-solid-bordered updatePrincipalInfo" id="title${newNumber - 1}" data-typeinp="title" data-question="${(newNumber - 1)}" required placeholder="Ingrese el título de la pregunta"/>

                  <p for="title${newNumber - 1}" data-msg="El título es obligatorio"></p>

                </div>

                <div class="col-12">

                  <label class="form-label">Pregunta</label>

                  <input type="text" class="form-control form-control-solid-bordered updatePrincipalInfo" id="desc${newNumber - 1}" data-typeinp="txQuestion" data-question="${(newNumber - 1)}" required placeholder="Ingrese la pregunta"/>

                  <p for="desc${newNumber - 1}" data-msg="La descripción es obligatoria"></p>

                </div>

                ${contentPlusHTML}

              </div>

            </div>

            <hr class="mt-2">

            <div class="col-12">

              ${contentRight}

            </div>

          </div>

        </div>

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



function addAnswerQuestion(question){
  // Validar que la pregunta existe en _dataQuestions
  if (!_dataQuestions[question]) {
    console.error(`Error: La pregunta ${question} no existe en _dataQuestions`);
    toastr.error('No se pudo agregar la respuesta. La pregunta no existe.', 'Error');
    return;
  }
  
  // Validar que la pregunta tiene el array de respuestas
  if (!_dataQuestions[question].answers || !Array.isArray(_dataQuestions[question].answers)) {
    console.error(`Error: La pregunta ${question} no tiene un array de respuestas válido`);
    toastr.error('No se pudo agregar la respuesta. Estructura de datos inválida.', 'Error');
    return;
  }

  let newOption = contentOptions[_dataQuestions[question].answers.length];

  const cantAnswers = (_dataQuestions[question].answers.length);

  _dataQuestions[question].answers.push('');

  let contentHTML = `

    <div class="col-12 mb-2" id="answer${question}-${cantAnswers}">

        <div class="d-flex align-items-center gap-2">

          <span class="fw-bold">${newOption})</span>

          <input class="form-control form-control-solid-bordered answerInp" placeholder="${newOption} Ingrese la descripción de la respuesta" data-answer="${cantAnswers}" data-question="${question}"/>

          <button  class="btn btn-danger removeAnswer" data-removeanswer="${cantAnswers}" data-question='${question}'><span class="material-symbols-outlined">close_small</span></button>

        </div>

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



function rePrintAnswers(question, typeQ, answer = ''){

  const dv = document.getElementById(`answer${question}-${answer}`);

  _dataQuestions[question].answers.splice(answer, 1);

  dv.remove();

  $(`#contentAnswers${question}`).empty();

  let newContentHTML = "";

  let newOption = "";

  _dataQuestions[question].answers.forEach((answerFE , i) => {

    newOption = contentOptions[i];

    newContentHTML += `

    <div class="col-12 mb-2" id="answer${question}-${i}">

        <div class="d-flex align-items-center gap-2">

          <span class="fw-bold">${newOption})</span>

          <input class="form-control form-control-solid-bordered answerInp" value="${answerFE}" placeholder="${newOption} Ingrese la descripción de la respuesta" data-answer="${i}" data-question="${question}"/>

           <button class="btn btn-danger removeAnswer" data-removeanswer="${i}" data-question='${question}'><span class="material-symbols-outlined">close_small</span></button>

        </div>

    </div>`;

  });

  $(`#contentAnswers${question}`).append(newContentHTML);

  if (typeQ == 2) {

    let newArrExpectedValue =  [];

    _dataQuestions[question].expectedValue.forEach( expected => {

      if (expected.answer != answer){

        if (expected.answer > answer){

          newArrExpectedValue.push({

            answer: Number(expected.answer) - 1,

            lvl: expected.lvl

          });

        } else {

          newArrExpectedValue.push({

            answer: expected.answer,

            lvl: expected.lvl

          });

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



function printTableLvls(question){

  $(`#contentTableLvlsQuestion${question}`).empty();

  $(`#contentTableLvlsQuestion${question}`).append(`<div id="tableLvlsQuestion${question}"></div>`);

  let data = _dataQuestions[question].expectedValue;

  for (var i = 0; i < data.length; i++) {

    let option = contentOptions[data[i].answer];

    data[i].question = question;

    data[i].textAnswer = option;

  }

  let tableLvl;

  if(tableLvl){

    tableLvl.destroy();

  }

  tableLvl = new ej.grids.Grid({

    dataSource: data,

    allowFiltering: true,

    filterSettings: { type:'Menu' },

    columns: [

      { field: "lvl", headerText: "Nivel", width: 50, textAlign: 'Center', allowFiltering: false },

      { field: "textAnswer", headerText: "Respuesta Esperada", width: 100, textAlign: 'Center', allowFiltering: false },

      { field: "", headerText: "Eliminar", width: 50, textAlign: 'Center', allowFiltering: false , template: "#deleteResExpectedTemplate"},

    ],

  });

  tableLvl.appendTo(`#tableLvlsQuestion${question}`);

}



function printTableLvlsSavedSV(question){

  $(`#contentTableLvlsQuestionSV${question}`).empty();

  $(`#contentTableLvlsQuestionSV${question}`).append(`<div class="row">

      <div class="col-12">

        <label class="card-title">Respuestas guardadas</label>

      </div>

      <div class="col-12">

        <div id="tableLvlsQuestionSV${question}"></div>

        <hr>

      </div>

    </div>`);

  let data = _dataQuestionsSaved[question].expectedValue;

  let dataAnswers = _dataQuestionsSaved[question].answers;

  for (var i = 0; i < data.length; i++) {

    const posicion = dataAnswers.findIndex(elemento => elemento.idAnswer == data[i].answerExpected);

    let option = contentOptions[posicion];

    data[i].question = question;

    data[i].textAnswer = option;

  }

  let tableLvl;

  if(tableLvl){

    tableLvl.destroy();

  }

  tableLvl = new ej.grids.Grid({

    dataSource: data,

    allowFiltering: true,

    filterSettings: { type:'Menu' },

    columns: [

      { field: "lvl", headerText: "Nivel", width: 50, textAlign: 'Center', allowFiltering: false },

      { field: "textAnswer", headerText: "Respuesta Esperada", width: 100, textAlign: 'Center', allowFiltering: false },

      { field: "", headerText: "Eliminar", width: 50, textAlign: 'Center', allowFiltering: false , template: "#deleteResExpectedSVTemplate"},

    ],

  });

  tableLvl.appendTo(`#tableLvlsQuestionSV${question}`);



  let dataNew = [];

  if(_dataQuestionsSaved[question].expectedValueNew !== undefined) {

    $(`#contentTableLvlsQuestionSV${question}`).append(`<div class="row">

      <div class="col-12">

        <label class="card-title">Respuestas guardadas</label>

      </div>

      <div class="col-12">

        <div id="tableLvlsQuestionSVNew${question}"></div>

      </div>

    </div>`);

    dataNew = _dataQuestionsSaved[question].expectedValueNew;

    dataNew.forEach((answerNewm, i) => {

      let posicion = ((_dataQuestionsSaved[question].answers.length + answerNewm.answer));

      let option = contentOptions[posicion];

      dataNew[i].question = question;

      dataNew[i].textAnswer = option;

    });

    tableLvlNew = new ej.grids.Grid({

      dataSource: dataNew,

      allowFiltering: true,

      filterSettings: { type:'Menu' },

      columns: [

        { field: "lvl", headerText: "Nivel", width: 50, textAlign: 'Center', allowFiltering: false },

        { field: "textAnswer", headerText: "Respuesta Esperada", width: 100, textAlign: 'Center', allowFiltering: false },

        { field: "", headerText: "Eliminar", width: 50, textAlign: 'Center', allowFiltering: false, template: "#deleteResExpectedSVNewTemplate"},

      ],

    });

    tableLvlNew.appendTo(`#tableLvlsQuestionSVNew${question}`);

  }

}



async function verifySaveNewQuestions(){

  $("#contentAdv").empty();

  let newQuestions = _dataQuestions.filter( question => question.saveInBdd == false);

  if (newQuestions.length > 0) {

    let advertences = "";

    _dataQuestions.forEach((question , i) => {

      if (question.titleQuestion.length < 1) {

        advertences += `<li><b>Pregunta ${i + 1}: </b>La pregunta no cuenta con algún título especificado.</li>`;

      }

      if (question.descriptionQuestion.length < 1) {

        advertences += `<li><b>Pregunta ${i + 1}: </b>La pregunta no cuenta con alguna descripción especificada.</li>`;

      }

      if (atob(question.typeQuestion) == 1) {



      } else if (atob(question.typeQuestion) == 2) {

        if (question.expectedValue.length < 1) {

          advertences += `<li><b>Pregunta ${i + 1}: </b>La pregunta no cuenta con al menos un resultado esperado.</li>`;

        }

      } else if (atob(question.typeQuestion) == 3) {

        if (Number(question.rangeInitial) < 0) {

          advertences += `<li><b>Pregunta ${i + 1}: </b>El rango inicial no puede ser menor a 0.</li>`;

        } else {

          if (Number(question.rangeInitial) > Number(question.rangeEnd)) {

            advertences += `<li><b>Pregunta ${i + 1}: </b>El rango inicial no puede ser mayor al rango final.</li>`;

          }

        }

      } else if (atob(question.typeQuestion) == 4) {

        question.answers.forEach((answer,j) => {

          let optionL = contentOptions[j];

          if (answer == ""){

            advertences += `<li><b>Pregunta ${i + 1}: </b>La respuesta ${optionL}) no cuenta con alguna descripción especificada.</li>`;

          }

        });

      }

    });

    if (advertences.length > 0) {

      // toastr.info("Verifique las advertencias, ya que faltan preguntas sin configurar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">Verifique las advertencias, ya que faltan preguntas sin configurar.</span>

        </div>`;

      showBootstrapAlert(messageContent, "top-right", 5000);

      $("#contentAdv").append(advertences);

    } else {

      $("#contentAdv").append("<li>Sin advertencias</li>");

      await saveQuestionsConfig();

    }

  } else {

    // toastr.info("No existen preguntas nuevas por guardar");

        const messageContent = `

        <div class="alert-content">

             <span class="alert-title">Información!</span>

              <span class="alert-text">No existen preguntas nuevas por guardar.</span>

        </div>`;

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

    setTimeout(function () {

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

      openMMinNoMaximizable('Agregar nueva respuesta esperada','dv_OldResponseExpected',false);

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

          alertify.confirm().closeOthers();

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

    alertify.confirm().closeOthers();

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

    alertify.confirm().closeOthers();

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



function resultAfterInsertQuestion(typeQuestion,question){

  if(typeQuestion == 2){

    printTableLvls(question);

  } else if(typeQuestion == 4) {

    printOptionSelectAnswer(question);

  }

  // alertify.confirm().closeOthers();

    $('.modal').modal('hide');

}



function printOptionSelectAnswer(question){

  $(`#selectAnswers${question}`).empty();

  let contentHTML = "";

  if(_dataQuestions[question].answers.length > 0 ) {

    let newOption = "";

    _dataQuestions[question].answers.forEach((data, i) => {

       newOption = contentOptions[i];

       contentHTML += `

         <option value="${i}">${newOption})</option>

       `;

    });

  }

  $(`#selectAnswers${question}`).append(contentHTML);

  $(`#selectAnswers${question}`).val(_dataQuestions[question].expectedValue);

  $(`#selectAnswers${question}`).select2();

}



function printOptionSelectAnswerSV(question){

  $(`#selectAnswersSV${question}`).empty();

  let contentHTML = "";

  let newOption = "";

  if(_dataQuestionsSaved[question].answers.length > 0 ) {

    _dataQuestionsSaved[question].answers.forEach((data, i) => {

       newOption = contentOptions[i];

       contentHTML += `

         <option value="${data.idAnswer}" data-typeexpected="old">${newOption})</option>

       `;

    });

  }

  if (_dataQuestionsSaved[question].newAnswers.length > 0 ) {

    _dataQuestionsSaved[question].newAnswers.forEach((data, i) => {

      newOption = contentOptions[(_dataQuestionsSaved[question].answers.length + (i))];

      contentHTML += `

        <option value="${question}-${i}" data-typeexpected="new">${newOption})</option>

      `;

    });

  }

  $(`#selectAnswersSV${question}`).append(contentHTML);

  $(`#selectAnswersSV${question}`).val(_dataQuestionsSaved[question].expectedValue.IdAnswerExpected);

  $(`#selectAnswersSV${question}`).select2();

  _dataQuestionsSaved[question].expectedValue.edited = false;

  _dataQuestionsSaved[question].expectedValue.typeExpectedValue = "old";

}



function changeRangeValues(question,newValue, typeRange){

  if (typeRange == "initial") {

    _dataQuestions[question].rangeInitial = newValue;

  } else {

    _dataQuestions[question].rangeEnd = newValue;

  }

}



async function deleteQuestionSaved(idQuestion, position){

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



function updateCompetenceQuestion(){

  let question = $("#updateComp_question").val();

  let typeSV = $("#updateComp_typeSave").val();

  const posicion = _allCompetences.findIndex(elemento => elemento.idCompetencias == $("#sel_CompetencesUpdateOld").val());

  if (typeSV == "old") {

    _dataQuestionsSaved[question].competence = _allCompetences[posicion].idCompetencias;

    _dataQuestionsSaved[question].descCompetence = _allCompetences[posicion].Competencia;

    _dataQuestionsSaved[question].edited = true;

    $(`#txCompetence${question}`).html(_allCompetences[posicion].Competencia);

  } else if (typeSV == "new") {

    _dataQuestions[question].competence = _allCompetences[posicion].idCompetencias;

    _dataQuestions[question].descCompetence = _allCompetences[posicion].Competencia;

    $(`#txCompetenceNew${question}`).html(_allCompetences[posicion].Competencia);

  }

  // alertify.confirm().closeOthers();

    $('.modal').modal('hide');

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

  

  btn.className = 'btn btn-danger';

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

  btn.className = 'btn btn-ddanger';

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

  btn.className = 'btn btn-warning';

  btn.setAttribute("onclick", `deleteResultExpectedSVNew('${e.lvl}','${e.answer}','${e.question}')`);

  iBtn.className = 'material-icons';

  iBtn.textContent = 'block'; 

  iBtn.style.verticalAlign = 'middle'; 

  btn.appendChild(iBtn);

  div.appendChild(btn);

  return div.outerHTML;

}

