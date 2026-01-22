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

      contentHTML += `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-bold mb-3">${d.Division}</h5>
              <table class="table display mb-0">
                <thead>
                  <tr>
                    <th>Día</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sábado</td>
                    <td class="text-center">
                      <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input checkDescanso" type="checkbox" ${sabadoCheck} data-division="${d.IdDivision}" data-day="saturday">
                        <label class="form-check-label">Trabajo</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Domingo</td>
                    <td class="text-center">
                      <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input checkDescanso" type="checkbox" ${domingoCheck} data-division="${d.IdDivision}" data-day="sunday">
                        <label class="form-check-label">Trabajo</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Días Festivos</td>
                    <td class="text-center">
                      <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input checkFestivos" type="checkbox" ${festCheck} data-division="${d.IdDivision}" data-day="holiday">
                        <label class="form-check-label">Trabajo</label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    });
  }

  $("#contenidoDiasDescanso").html(contentHTML); // Usamos html() para reemplazar contenido anterior
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
  if (ajaxR !== undefined) {
  }
}
