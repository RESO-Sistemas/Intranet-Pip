loadInitialFunctions();
async function loadInitialFunctions(){
  getConfiguracionDivisionDescanso();
}

async function getConfiguracionDivisionDescanso(){
  const dataSend = {
    op: "getConfiguracionDivisionDescanso"
  };
  const ajaxR = await pAjaxAsync(url_m_Configuracion, dataSend, 1);
  if (ajaxR.Resultado && ajaxR.Siguiente) {
    const dataR = ajaxR.Data;
    printConfiguracionDivisionDescanso(dataR);
  }
}
function printConfiguracionDivisionDescanso(data){
  let contentHTML = "";
  if (data.length > 0) {
    data.forEach( d => {
      let sabadoCheck = d.LaburaSabados == 1 ? "checked": "";
      let domingoCheck = d.LaburaDomingos == 1 ? "checked": "";
      let festCheck = d.LaburaDiasFestivos == 1 ? "checked": "";
      contentHTML += `
        <div class="col s12 m4">
          <h5 class="card-subtitle"><b>${d.Division}</b></h5>
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sabado</td>
                <td>
                  <div>
                    <div class="switch">
                      <label>
                          Descanso
                          <input type="checkbox" class="checkDescanso" ${sabadoCheck} data-division="${d.IdDivision}" data-day="saturday">
                          <span class="lever"></span>
                          Trabajo
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Domingo</td>
                <td>
                  <div>
                    <div class="switch">
                      <label>
                          Descanso
                          <input type="checkbox" class="checkDescanso" ${domingoCheck} data-division="${d.IdDivision}" data-day="sunday">
                          <span class="lever"></span>
                          Trabajo
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Trabaja días festivos</td>
                <td>
                  <div>
                    <div class="switch">
                      <label>
                          Descanso
                          <input type="checkbox" class="checkFestivos" ${festCheck} data-division="${d.IdDivision}" data-day="sunday">
                          <span class="lever"></span>
                          Trabajo
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    });
  } else {

  }
  $("#contenidoDiasDescanso").append(contentHTML);
}

$(document).on("click",".checkDescanso", async function(item){
  const day = item.target.dataset.day;
  const newVal = item.target.checked ? 1 : 0;
  const division = item.target.dataset.division;
  await setDaysOff(day,division,newVal);
});

async function setDaysOff(day,division,newVal){
  const dataSend = {
    op: "setDaysOff",
    day: day,
    division: division,
    newVal: newVal
  };
  await pAjaxAsync(url_m_Configuracion,dataSend, 1);
}

$(document).on("click",".checkFestivos",async function(e){
  changeActiveHolidaysPerDivision(e.target.checked, e.target.dataset.division);
});

async function changeActiveHolidaysPerDivision(active, division){
  let dataSend = {
    op: "changeActiveHolidaysPerDivision",
    newVal: active ? 1 : 0,
    division: division
  };
  const ajaxR = await pAjaxAsync(url_m_Configuracion, dataSend, 1);
  if (ajaxR !== undefined) {

  }
}
