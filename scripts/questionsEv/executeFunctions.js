// Ocultar preloader cuando la p�gina termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

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

// Limpiar el modo "cambio de tipo" si el usuario cierra el modal sin confirmar
document.addEventListener('DOMContentLoaded', function () {
  const modalEl = document.getElementById("modalTypesQuestion");
  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', function () {
      _changingQuestionIndex = null;
    });
  }
});



$(document).on("click", "#btnAddQuestion", function () {

  // Modo nueva pregunta (no cambio de tipo)
  _changingQuestionIndex = null;

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

    const selectedType = $("#sel_typeQuestion").val();
    const selectedCompetence = $("#sel_competenceQuestion").val();

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalTypesQuestion")
    );
    modal.hide();

    if (_changingQuestionIndex !== null) {
      // Modo cambio de tipo: reemplazar tarjeta existente
      changeQuestionType(_changingQuestionIndex, selectedType, selectedCompetence);
      _changingQuestionIndex = null;
    } else {
      // Modo nueva pregunta
      const content = addQuestion(selectedType, selectedCompetence);
      // Eliminar empty state si existe
      $("#contentQuestions .evq-empty").remove();
      $("#contentQuestions").append(content.contentHTML);
      resultAfterInsertQuestion(content.type, content.number);
    }

  }

});



$(document).on("click", ".addanswer", function (element) {

  // Usar currentTarget en lugar de target para obtener el elemento con el atributo data
  const question = $(this).data('question');

  addAnswerQuestion(question);

});



$(document).on("click", ".removeAnswer", function (element) {

  // Usar currentTarget en lugar de target para obtener el elemento con el atributo data
  const question = $(this).data('question');

  const answer = $(this).data('removeanswer');

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



// Toggle Falso/Verdadero para preguntas NUEVAS
$(document).on("click", ".changeTrue-False", function () {
  const $btn = $(this);
  const question = $btn.data("question");
  const value = $btn.data("value") === true || $btn.data("value") === "true";
  const $wrap = $btn.closest(".evq-toggle-wrap");
  $wrap.find(".changeTrue-False").removeClass("active");
  $btn.addClass("active");
  changeexpectedValueTF(question, value);
});

// Toggle Falso/Verdadero para preguntas GUARDADAS
$(document).on("click", ".True-FalseSV", function () {
  const $btn = $(this);
  const question = $btn.data("question");
  const value = $btn.data("value") === true || $btn.data("value") === "true";
  const $wrap = $btn.closest(".evq-toggle-wrap");
  $wrap.find(".True-FalseSV").removeClass("active");
  $btn.addClass("active");
  changeexpectedValueTFSV(question, value);
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

$(document).on("input", ".updatePrincipalInfo", async function (element) {
  const question = element.target.dataset.question;
  const typeinp = element.target.dataset.typeinp;
  if (typeinp === 'title') {
    const card = document.getElementById(`dvQuestion${question}`);
    if (card) {
      const titleText = card.querySelector('.evq-title-text');
      if (titleText) titleText.textContent = $(this).val() || `Pregunta ${parseInt(question) + 1}`;
    }
  }
});

$(document).on("blur", ".updatePrincipalInfoOld", async function (element) {
  changePrincipalInfoQuestionOld(
    element.target.dataset.question,
    $(this).val(),
    element.target.dataset.typeinp
  );
});

$(document).on("input", ".updatePrincipalInfoOld", async function (element) {
  const question = element.target.dataset.question;
  const typeinp = element.target.dataset.typeinp;
  if (typeinp === 'title') {
    const card = document.getElementById(`dvContentSV${_dataQuestionsSaved[question].IdQuestion}`);
    if (card) {
      const titleText = card.querySelector('.evq-title-text');
      if (titleText) titleText.textContent = $(this).val() || `Pregunta ${parseInt(question) + 1}`;
    }
  }
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
  const $radio = $(this);
  const $wrap = $radio.closest('.evq-pills-wrap');
  $wrap.find('.evq-pill').removeClass('active');
  $radio.closest('.evq-pill').addClass('active');
  changeAnExpectedResponse(
    element.target.dataset.question,
    element.target.value
  );
});

$(document).on("change", ".selectPerQuestionSV", function (element) {
  const $radio = $(this);
  const $wrap = $radio.closest('.evq-pills-wrap');
  $wrap.find('.evq-pill').removeClass('active');
  $radio.closest('.evq-pill').addClass('active');
  let dataTypeValue = $(this).data("typeexpected");
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



$(document).on("click", ".changeTypeQuestion", function (element) {
  element.stopPropagation(); // Evitar que el clic llegue al header del accordion
  const button = element.currentTarget;
  const index = parseInt(button.dataset.question);
  _changingQuestionIndex = index;

  // Pre-seleccionar el tipo y competencia actuales en el modal
  const currentData = _dataQuestions[index];
  if (currentData) {
    $("#sel_typeQuestion").val(currentData.typeQuestion).trigger('change');
    $("#sel_competenceQuestion").val(currentData.competence).trigger('change');
  }

  cleanVerifyInputs("dv_typesQuestion");

  const modalEl = document.getElementById("modalTypesQuestion");
  let modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);

  $("#sel_typeQuestion").select2({
    placeholder: "Listado de tipos de pregunta",
    dropdownParent: $("#modalTypesQuestion"),
    width: "100%",
  });

  $("#sel_competenceQuestion").select2({
    placeholder: "Listado de competencias",
    dropdownParent: $("#modalTypesQuestion"),
    width: "100%",
  });

  // Reasignar valores tras reinicializar Select2
  if (currentData) {
    $("#sel_typeQuestion").val(currentData.typeQuestion).trigger('change');
    $("#sel_competenceQuestion").val(currentData.competence).trigger('change');
  }

  modalInstance.show();
});

$(document).on("click", ".deleteNoSaved", function (element) {
  element.stopPropagation(); // Evitar que el clic llegue al header y dispare el accordion
  const button = element.target.closest('.deleteNoSaved');
  if (button && button.dataset.question !== undefined) {
    if (button.dataset.typequestion == "new") {
      const dv = parseInt(button.dataset.question);

      // Confirmar eliminación antes de proceder
      Swal.fire({
        title: '¿Eliminar pregunta?',
        text: 'Esta pregunta aún no ha sido guardada. Se eliminará de la lista.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          _dataQuestions.splice(dv, 1);
          let allVisibleQuestions = document.querySelectorAll(".dvContentSV");
          $(`#dvQuestion${dv}`).remove();
          const allDvQuestionsNoS = document.querySelectorAll(".dvContentQuestion");
          allDvQuestionsNoS.forEach((dvQuest, index) => {
            dvQuest.id = `dvQuestion${index}`;
            let allDataQuestion = dvQuest.querySelectorAll("[data-question]");
            let allCompSelects = dvQuest.querySelectorAll(".sel-competence-inline");
            let allTitles = dvQuest.querySelectorAll(".titleNewQuestion");
            let allNums = dvQuest.querySelectorAll(".evq-num");
            allDataQuestion.forEach((inp) => {
              inp.dataset.question = index;
            });
            allCompSelects.forEach((sel) => {
              sel.id = `selCompetenceNew${index}`;
              sel.dataset.question = index;
            });
            allTitles.forEach((title) => {
              title.textContent = `${allVisibleQuestions.length + (index + 1)}.- Pregunta (Nueva)`;
            });
            allNums.forEach((num) => {
              num.textContent = String(allVisibleQuestions.length + (index + 1)).padStart(2, '0');
            });
          });
          if (typeof evqUpdateMetaBar === 'function') {
            evqUpdateMetaBar();
          }
        }
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



// Cambio inline de competencia (Select2)
$(document).on("change", ".sel-competence-inline", function () {
  const question = $(this).data("question");
  const typeSV = $(this).data("typequestionsv");
  const competenceId = $(this).val();
  updateCompetenceQuestion(question, typeSV, competenceId);
});

// Toggle de tarjetas accordion
window.evqToggleCard = function (header) {
  const card = header.closest('.evq-card');
  if (!card) return;
  const isCollapsed = card.classList.contains('collapsed');
  // Cerrar todas las demás tarjetas (modo accordion)
  document.querySelectorAll('.evq-card.expanded').forEach(c => {
    if (c !== card) {
      c.classList.remove('expanded');
      c.classList.add('collapsed');
    }
  });
  if (isCollapsed) {
    card.classList.remove('collapsed');
    card.classList.add('expanded');
    // Inicializar Select2 en competencia si no lo está
    const $compSelect = $(card).find('.sel-competence-inline:not(.select2-hidden-accessible)');
    if ($compSelect.length) {
      $compSelect.select2({
        width: '100%',
        dropdownParent: $('body'),
        minimumResultsForSearch: 5
      });
    }
  } else {
    card.classList.remove('expanded');
    card.classList.add('collapsed');
  }
};

// Actualizar contador del sticky bar
window.evqUpdateMetaBar = function () {
  const saved = _dataQuestionsSaved ? _dataQuestionsSaved.length : 0;
  const newQ = _dataQuestions ? _dataQuestions.filter(q => !q.saveInBdd).length : 0;
  const text = `${saved + newQ} preguntas configuradas${newQ > 0 ? ` • ${newQ} sin guardar` : ''}`;
  $('#evqMetaBar').text(text);
};

