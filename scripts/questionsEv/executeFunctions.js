// import { Questions } from './dataQuestions.js';
// const questions = new Questions();
// $(document).on("click","#btnAddQuestion",function(){
//   cleanVerifyInputs('dv_typesQuestion');
//   $("#sel_typeQuestion").select2({
//     dropdownParent: $('#dv_typesQuestion')
//   });
//   $("#sel_competenceQuestion").select2({
//     dropdownParent: $('#dv_typesQuestion')
//   });
//   openMMinNoMaximizable('Seleccione un tipo de pregunta por agregar','dv_typesQuestion',false);
// });

// $(document).on("click","#btn_acceptType",async function(){
//   const resultV = await verifyInputs('dv_typesQuestion');
//   if(resultV) {
//     const content = addQuestion($("#sel_typeQuestion").val(),$("#sel_competenceQuestion").val());
//     $("#contentQuestions").append(content.contentHTML);
//     resultAfterInsertQuestion(content.type, content.number);
//   }
// });

let modalInstance;

$(document).on("click", "#btnAddQuestion", function () {
  // Limpiar validaciones previas
  cleanVerifyInputs("dv_typesQuestion");

  // Mostrar el modal primero
  modalInstance = new bootstrap.Modal(
    document.getElementById("modalTypesQuestion")
  );
  modalInstance.show();

  $("#sel_typeQuestion").select2({
    placeholder: "Listado de tipos de pregunta",
    dropdownParent: $("#modalTypesQuestion"),
    width: "100%", // Forzar ancho completo
  });

  $("#sel_competenceQuestion").select2({
    placeholder: "Listado de competencias",
    dropdownParent: $("#modalTypesQuestion"),
    width: "100%",
  });
});

$(document).on("click", "#btn_acceptType", async function () {
  const resultV = await verifyInputs("dv_typesQuestion");
  if (resultV) {
    const content = addQuestion(
      $("#sel_typeQuestion").val(),
      $("#sel_competenceQuestion").val()
    );
    $("#contentQuestions").append(content.contentHTML);
    resultAfterInsertQuestion(content.type, content.number);

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalTypesQuestion")
    );
    modal.hide();
  }
});

$(document).on("click", ".addanswer", function (element) {
  const question = element.target.dataset.question;
  addAnswerQuestion(question);
});

$(document).on("click", ".removeAnswer", function (element) {
  const question = element.target.dataset.question;
  const answer = element.target.dataset.removeanswer;
  removeAnswerQ(question, answer);
});

$(document).on("blur", ".answerInp", function (element) {
  changeValAnswer(
    element.target.dataset.question,
    $(this).val(),
    element.target.dataset.answer,
    element.target.dataset.oldanswer
  );
});

$(document).on("change", ".changeTrue-False", function (element) {
  changeexpectedValueTF(
    element.target.dataset.question,
    element.target.checked
  );
});

$(document).on("change", ".True-FalseSV", function (element) {
  changeexpectedValueTFSV(
    element.target.dataset.question,
    element.target.checked
  );
});

$(document).on("click", "#btnSaveQuestions", async function () {
  verifySaveNewQuestions();
});

$(document).on("blur", ".updatePrincipalInfo", async function (element) {
  changePrincipalInfoQuestion(
    element.target.dataset.question,
    $(this).val(),
    element.target.dataset.typeinp
  );
});

$(document).on("blur", ".updatePrincipalInfoOld", async function (element) {
  changePrincipalInfoQuestionOld(
    element.target.dataset.question,
    $(this).val(),
    element.target.dataset.typeinp
  );
});

$(document).on("click", "#btn_addResponseExpected", async function () {
  const resultV = await verifyInputs("dv_newResponseExpected");
  if (resultV) {
    addaddResponseExpectedQuestion();

    // Cerrar modal manualmente
    const modalElement = document.getElementById("dv_newResponseExpected");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
});

$(document).on("click", "#btn_addResponseExpectedOld", async function () {
  const resultV = await verifyInputs("dv_OldResponseExpected");
  if (resultV) {
    addaddResponseExpectedQuestionOld();
  }
});

$(document).on("change", ".selectPerQuestion", function (element) {
  changeAnExpectedResponse(
    element.target.dataset.question,
    element.target.value
  );
});

$(document).on("change", ".selectPerQuestionSV", function (element) {
  let dataTypeValue = $(this).find(":selected").data("typeexpected");
  changeAnExpectedResponseSV(
    element.target.dataset.question,
    element.target.value,
    dataTypeValue
  );
});

$(document).on("blur", ".changeRange", function (element) {
  changeRangeValues(
    element.target.dataset.question,
    element.target.value,
    element.target.dataset.typenum
  );
});

$(document).on("blur", ".changeRangeSV", function (element) {
  changeRangeValuesSV(
    element.target.dataset.question,
    element.target.value,
    element.target.dataset.typenum
  );
});

$(document).on("click", ".deleteNoSaved", function (element) {
  if (element.target.dataset.question !== undefined) {
    if (element.target.dataset.typequestion == "new") {
      const dv = element.target.dataset.question;
      _dataQuestions.splice(dv, 1);
      let allVisibleQuestions = document.querySelectorAll(".dvContentSV");
      $(`#dvQuestion${dv}`).remove();
      const allDvQuestionsNoS = document.querySelectorAll(".dvContentQuestion");
      allDvQuestionsNoS.forEach((dvQuest, index) => {
        dvQuest.id = `dvQuestion${index}`;
        let allDataQuestion = dvQuest.querySelectorAll("[data-question]");
        let allchangeCompetenceSV = dvQuest.querySelectorAll(
          ".changeCompetenceSV"
        );
        let allTitles = dvQuest.querySelectorAll(".titleNewQuestion");
        allDataQuestion.forEach((inp) => {
          inp.dataset.question = index;
        });
        allchangeCompetenceSV.forEach((tx) => {
          tx.id = `txCompetenceNew${index}`;
        });
        allTitles.forEach((title) => {
          title.textContent = `${
            allVisibleQuestions.length + (index + 1)
          }.- Pregunta (Nueva)`;
        });
      });
    }
  }
});

$(document).on("blur", ".contentAnswerSVNew", function (element) {
  changeValAnswerSVNew(
    element.target.dataset.question,
    element.target.value,
    element.target.dataset.answersvnew
  );
});

$(document).on("blur", ".contentAnswerSVOld", function (element) {
  changeValAnswerSVOld(
    element.target.dataset.question,
    element.target.value,
    element.target.dataset.answersv
  );
});

// $(document).on("click", ".changeCompetenceSV", function (element) {
//   console.log(element.target.dataset.question);
//   $("#txQuestionPerUpdateCompetence").html(
//     `<h6><b>Pregunta seleccionada:</b> ${
//       Number(element.target.dataset.question) + 1
//     }</h6>`
//   );
//   cleanVerifyInputs("dv_UpdateCompetence");
//   $("#sel_CompetencesUpdateOld").select2({
//     dropdownParent: $("#dv_UpdateCompetence"),
//   });
//   $("#updateComp_question").val(element.target.dataset.question);
//   $("#updateComp_typeSave").val(element.target.dataset.typequestionsv);
//   openMMinNoMaximizable(
//     "Actualización de la competencia seleccionada para la pregunta",
//     "dv_UpdateCompetence",
//     false
//   );
// });

// $(document).on("click", "#btn_updateCompetenceOld", async function () {
//   const verifyI = await verifyInputs("dv_UpdateCompetence");
//   if (verifyI) {
//     updateCompetenceQuestion();
//   }
// });
$(document).on("click", ".changeCompetenceSV", function (element) {
  console.log(element.target.dataset.question);

  // Mostrar el número de la pregunta
  $("#txQuestionPerUpdateCompetence").html(
    `<h6><b>Pregunta seleccionada:</b> ${
      Number(element.target.dataset.question) + 1
    }</h6>`
  );

  // Limpiar inputs
  cleanVerifyInputs("modalUpdateCompetence");

  // Aplicar select2
  $("#sel_CompetencesUpdateOld").select2({
    placeholder: "Listado de competencias",
    dropdownParent: $("#modalUpdateCompetence .modal-body"),
    width: "100%",
  });

  // Guardar valores ocultos
  $("#updateComp_question").val(element.target.dataset.question);
  $("#updateComp_typeSave").val(element.target.dataset.typequestionsv);

  // Mostrar modal Bootstrap 5
  const modal = new bootstrap.Modal(
    document.getElementById("modalUpdateCompetence")
  );
  modal.show();
});

// Botón actualizar
$(document).on("click", "#btn_updateCompetenceOld", async function () {
  const verifyI = await verifyInputs("modalUpdateCompetence");
  if (verifyI) {
    updateCompetenceQuestion();
    // Cerrar modal manualmente
    const modalElement = document.getElementById("modalUpdateCompetence");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
});
