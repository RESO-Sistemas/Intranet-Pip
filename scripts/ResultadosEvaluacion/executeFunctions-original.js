window.viewIndvResultsSF = function(e){
  let div = document.createElement('div');
  let btn = document.createElement('button');
  let iBtn = document.createElement('i');
  iBtn.className = 'fa-solid fa-info';
  btn.className = 'btn-actionBlue1';
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
    let iBtn = document.createElement('i');
    iBtn.className = 'fa-solid fa-info';
    btn.className = 'btn-actionBlue1';
    btn.setAttribute("onclick", `viewFinalResults('${e.IdEvaluado}')`);
    btn.appendChild(iBtn);
    div.appendChild(btn);
  }
  return div.outerHTML;
}


$(document).on("change","#slc_evaluated_by",async function(){
  const dv = document.querySelector('#table_general_detail');
  const tr = dv.querySelectorAll('tr');
  console.log(tr);
  const allTd = tr[2].querySelectorAll('td');
  console.log(allTd);
  let newText = slc_evaluated_by.options[slc_evaluated_by.selectedIndex].text;
  allTd[3].textContent = newText;
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
