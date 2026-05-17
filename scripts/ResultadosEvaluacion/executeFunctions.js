// Ocultar preloader cuando la página termine de cargar
$(window).on('load', function() {
  $(".preloader").fadeOut();
});

window.viewIndvResultsSF = function(e){

  let div = document.createElement('div');

  let btn = document.createElement('button');

  let iBtn = document.createElement('span');

  iBtn.className = 'material-symbols-outlined';

  iBtn.textContent="info_i";

  btn.className = 'btn btn-warning';

  btn.setAttribute("onclick", `viewDetail('${e.IdEvaluado}')`);

  btn.appendChild(iBtn);

  div.appendChild(btn);

  return div.outerHTML;

}



window.viewFinalReultsSF = function(e){

  let div = document.createElement('div');

  if (e.SinCompletar > 0) {

    let spanN = document.createElement('span');

    spanN.textContent = `${e.Completadas}/${e.SinCompletar}`;

    div.appendChild(spanN);

  } else {

    let btn = document.createElement('button');

    let iBtn = document.createElement('span');

    iBtn.className = 'material-symbols-outlined';

    iBtn.textContent = "info_i";

    btn.className = 'btn btn-success';

    btn.setAttribute("onclick", `viewFinalResults('${e.IdEvaluado}')`);

    btn.appendChild(iBtn);

    div.appendChild(btn);

  }

  return div.outerHTML;

}





$(document).on("change","#slc_evaluated_by",async function(){

  let newText = slc_evaluated_by.options[slc_evaluated_by.selectedIndex].text;

  // Actualizar la tabla Syncfusion oculta (si existe y está renderizada)
  const dv = document.querySelector('#table_general_detail');
  if (dv) {
    const tr = dv.querySelectorAll('tr');
    if (tr.length > 2) {
      const allTd = tr[2].querySelectorAll('td');
      if (allTd.length > 3) allTd[3].textContent = newText;
    }
  }

  // Actualizar nombre del evaluador en la info card visual
  const resInfoEvaluador = document.getElementById('res-info-evaluador');
  if (resInfoEvaluador) resInfoEvaluador.textContent = newText;

  await getEvaluationDetailValues();

});



$(document).on("change","#selTypeResult", function(){

  if ($(this).val() == 1) {

    $("#gn_calculo").fadeOut();

    $("#gn_par_sub").fadeOut();

    $("#gn_moreInfo").fadeIn();

    printFinalDataEvaluated();

  } else if ($(this).val() == 2) {

    $("#gn_calculo").fadeIn();

    $("#gn_par_sub").fadeOut();

    $("#gn_moreInfo").fadeOut();

    printCalculationByTypeOfEvaluator();

  } else {

    $("#gn_calculo").fadeOut();

    $("#gn_par_sub").fadeIn();

    $("#gn_moreInfo").fadeOut();

    printCalculationParSub();

  }

});

