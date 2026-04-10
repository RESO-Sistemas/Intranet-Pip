loadInitialFunctions();
async function loadInitialFunctions() {
  getConfiguracionDivisionDescanso();
}

async function getConfiguracionDivisionDescanso() {
  const dataSend = {
    op: "getConfiguracionDivisionDescanso",
  };
  const ajaxR = await pAjaxAsync(url_m_Configuracion, dataSend, 1);
  if (ajaxR.Resultado && ajaxR.Siguiente) {
    const dataR = ajaxR.Data;
    printConfiguracionDivisionDescanso(dataR);
  }
}

function printConfiguracionDivisionDescanso(data) {
  let contentHTML = "";
  if (data.length > 0) {
    data.forEach((d) => {
      let sabadoCheck = d.LaburaSabados == 1 ? "checked" : "";
      let domingoCheck = d.LaburaDomingos == 1 ? "checked" : "";
      let festCheck = d.LaburaDiasFestivos == 1 ? "checked" : "";

      let sabLabel = d.LaburaSabados == 1 ? "Laborable" : "Descanso";
      let sabClass = d.LaburaSabados == 1 ? "status-laborable" : "status-descanso";
      
      let domLabel = d.LaburaDomingos == 1 ? "Laborable" : "Descanso";
      let domClass = d.LaburaDomingos == 1 ? "status-laborable" : "status-descanso";
      
      let festLabel = d.LaburaDiasFestivos == 1 ? "Laborable" : "Descanso";
      let festClass = d.LaburaDiasFestivos == 1 ? "status-laborable" : "status-descanso";

      contentHTML += `
        <div class="col-12 col-xl-4 col-lg-6 mb-4">
          <div class="division-card">
            <div class="div-card-header">
              <span class="material-symbols-outlined">domain</span>
              ${d.Division}
            </div>
            
            <div class="div-day-item">
              <div class="day-info">
                <div class="day-icon"><span class="material-symbols-outlined">today</span></div>
                <span class="day-name">Sábados</span>
              </div>
              <div class="d-flex align-items-center">
                <span class="status-label ${sabClass}" id="lbl-sab-${d.IdDivision}">${sabLabel}</span>
                <div class="form-check form-switch m-0">
                  <input class="form-check-input checkDescanso" type="checkbox" ${sabadoCheck} data-division="${d.IdDivision}" data-day="saturday" onchange="updateSwitchLabel(this, 'lbl-sab-${d.IdDivision}')">
                </div>
              </div>
            </div>

            <div class="div-day-item">
              <div class="day-info">
                <div class="day-icon"><span class="material-symbols-outlined">event</span></div>
                <span class="day-name">Domingos</span>
              </div>
              <div class="d-flex align-items-center">
                <span class="status-label ${domClass}" id="lbl-dom-${d.IdDivision}">${domLabel}</span>
                <div class="form-check form-switch m-0">
                  <input class="form-check-input checkDescanso" type="checkbox" ${domingoCheck} data-division="${d.IdDivision}" data-day="sunday" onchange="updateSwitchLabel(this, 'lbl-dom-${d.IdDivision}')">
                </div>
              </div>
            </div>

            <div class="div-day-item">
              <div class="day-info">
                <div class="day-icon festivo"><span class="material-symbols-outlined">celebration</span></div>
                <span class="day-name">Días Festivos</span>
              </div>
              <div class="d-flex align-items-center">
                <span class="status-label ${festClass}" id="lbl-fest-${d.IdDivision}">${festLabel}</span>
                <div class="form-check form-switch m-0">
                  <input class="form-check-input checkFestivos" type="checkbox" ${festCheck} data-division="${d.IdDivision}" data-day="holiday" onchange="updateSwitchLabel(this, 'lbl-fest-${d.IdDivision}')">
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    });
  }

  $("#contenidoDiasDescanso").html(contentHTML);
}

$(document).on("click", ".checkDescanso", async function (item) {
  const day = item.target.dataset.day;
  const newVal = item.target.checked ? 1 : 0;
  const division = item.target.dataset.division;
  await setDaysOff(day, division, newVal);
});

async function setDaysOff(day, division, newVal) {
  const dataSend = {
    op: "setDaysOff",
    day: day,
    division: division,
    newVal: newVal,
  };
  await pAjaxAsync(url_m_Configuracion, dataSend, 1);
}

$(document).on("click", ".checkFestivos", async function (e) {
  changeActiveHolidaysPerDivision(e.target.checked, e.target.dataset.division);
});

async function changeActiveHolidaysPerDivision(active, division) {
  let dataSend = {
    op: "changeActiveHolidaysPerDivision",
    newVal: active ? 1 : 0,
    division: division,
  };
  const ajaxR = await pAjaxAsync(url_m_Configuracion, dataSend, 1);
}

// Cambia visualmente el texto y color del label antes del AJAX
function updateSwitchLabel(checkbox, labelId) {
  const lbl = document.getElementById(labelId);
  if (!lbl) return;
  if (checkbox.checked) {
    lbl.textContent = "Laborable";
    lbl.className = "status-label status-laborable";
  } else {
    lbl.textContent = "Descanso";
    lbl.className = "status-label status-descanso";
  }
}
