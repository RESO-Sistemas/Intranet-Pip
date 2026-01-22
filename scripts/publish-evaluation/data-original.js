let allBranch = [];
let allBranchSelected = [];
let allTempData = [];
let allEmployees = [];
let allgroupBranch = [];
// let allLeaders = [];

async function getNewPossibleEvaluators(empSelected){
  const resultado = allEmployees.filter(item =>
    !allTempData.some(item2 =>
      item2.NoEmpleadoEvalua == item.NoEmpleado && item2.NoEmpleadoEvaluado == empSelected
    )
  );
  return resultado;
}
