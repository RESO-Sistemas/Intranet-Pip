ej.base.registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0diXn5dcndRRWZfUUE=')

let arrAnswersQuestion = [];
let arrConfig = [];
let arrAllDetailEvaluated = [];
let lvlEvaluated = "";
let arrListEvaluators = [];



async function getFinalDataEvaluated(){
  const allCompetences = await getUniqueCompetencesWhitQuestions(arrAllDetailEvaluated);
  let allData = await getDataCalculationByTypeOfEvaluator();
  let finalDataValues = [];
  let group = "";
  let porcentJe = "";
  let porcentAuto = "";
  let porcentPar = "";
  let porcentSub = "";
  if(allData.dataJe.length > 0 && allData.dataAuto.length > 0 && allData.dataPar.length > 0 && allData.dataSub.length > 0){
    group = "A";
    porcentJe = 0.4;
    porcentAuto = 0.1;
    porcentPar = 0.25;
    porcentSub = 0.25;
  } else if (allData.dataJe.length > 0 && allData.dataAuto.length > 0 && allData.dataPar.length > 0) {
    group = "B";
    porcentJe = 0.5;
    porcentAuto = 0.2;
    porcentPar = 0.3;
  } else if (allData.dataJe.length > 0 && allData.dataAuto.length > 0 && allData.dataSub.length > 0) {
    group = "C";
    porcentJe = 0.5;
    porcentAuto = 0.2;
    porcentSub = 0.3;
  } else if (allData.dataJe.length > 0 && allData.dataAuto.length > 0){
    group = "D";
    porcentJe = 0.65;
    porcentAuto = 0.35;
  }
  const resultJe = allData.dataJe.map(item => ({
      competence: item.competence,
      result: item.result * porcentJe,
      idCompetence: item.idCompetence
  }));
  const resultAu = allData.dataAuto.map(item => ({
      competence: item.competence,
      result: item.result * porcentAuto,
      idCompetence: item.idCompetence
  }));
  const resultPar = allData.dataPar.map(item => ({
      competence: item.competence,
      result: item.result * porcentPar,
      idCompetence: item.idCompetence
  }));
  const resultSub = allData.dataSub.map(item => ({
      competence: item.competence,
      result: item.result * porcentSub,
      idCompetence: item.idCompetence
  }));
  // console.log(resultJe);
  // console.log(resultAu);
  // console.log(resultPar);
  // console.log(resultSub);
  allCompetences.forEach(competence => {
    let value = 0;
    if (resultJe.length > 0) {
      let position = resultJe.findIndex( reg => reg.idCompetence == competence.idCompetencia);
      value += Number(resultJe[position].result);
    }
    if (resultAu.length > 0) {
      let position = resultAu.findIndex( reg => reg.idCompetence == competence.idCompetencia);
      value += Number(resultAu[position].result);
    }
    if (resultPar.length > 0) {
      let position = resultPar.findIndex( reg => reg.idCompetence == competence.idCompetencia);
      value += Number(resultPar[position].result);
    }
    if (resultSub.length > 0) {
      let position = resultSub.findIndex( reg => reg.idCompetence == competence.idCompetencia);
      value += Number(resultSub[position].result);
    }
    finalDataValues.push({
      idCompetence: competence.idCompetencia,
      competence: competence.competencia,
      result: value
    });
  });
  let bestOrWorst = await bestAndWorstCompetencesPerEvaluator(finalDataValues);
  const sumResults = finalDataValues.reduce((accumulator, competence) => accumulator + competence.result, 0);
  const finalResult = (sumResults / finalDataValues.length).toFixed(2);
  return {
    values: finalDataValues,
    bestOrWorst: bestOrWorst,
    group: group,
    finalResult: finalResult
  };
}

async function getDataCalculationParSub(){
  let resultAcumPar = [];
  let resultAcumSub = [];
  let allDataPar = arrListEvaluators.filter( evaluator => evaluator.ParEvalua == 1);
  let allDataSub = arrListEvaluators.filter( evaluator => evaluator.SubordinadoEvalua == 1);
  if (allDataPar.length > 0) {
    for (const par in allDataPar) {
      let dataPerEvaluator = arrAllDetailEvaluated.filter(values => values.IdEvDetail == par.IdEvDetail);
      const result = await getDataResultsPerEvaluatorUnique(dataPerEvaluator);
      resultAcumPar.push(result)
    }
  }
  if (allDataSub.length > 0) {
    for (const sub of allDataSub) {
      let dataPerEvaluator = arrAllDetailEvaluated.filter(values => values.IdEvDetail == sub.IdEvDetail);
      const result = await getDataResultsPerEvaluatorUnique(dataPerEvaluator);
      resultAcumSub.push(result);
    }
  }
  return {
    dataSub: resultAcumSub,
    dataPar: resultAcumPar
  };
}

async function getDataCalculationByTypeOfEvaluator(){
  const allCompetences = await getUniqueCompetencesWhitQuestions(arrAllDetailEvaluated);
  let dataAuto = await getDataResultAuto();
  let dataPar = await getDataResultPar();
  let dataSub = await getDataResultSub();
  let dataJe = await getDataResultJe();
  return {
    dataAuto: dataAuto,
    dataPar: dataPar,
    dataSub: dataSub,
    dataJe: dataJe
  };
}

async function getDataResultAuto(){
  let resultFinal = [];
  let allDataAuto = arrListEvaluators.filter( evaluator => evaluator.AutoEvalua == 1);
  if (allDataAuto.length > 0) {
    let dataPerEvaluator = arrAllDetailEvaluated.filter( values => values.IdEvDetail == allDataAuto[0].IdEvDetail);
    const result = await getDataResultsPerEvaluatorUnique(dataPerEvaluator);
    resultFinal = result;
  }
  return resultFinal;
}

async function getDataResultPar(){
    let resultFinal = [];
  let allDataPar = arrListEvaluators.filter( evaluator => evaluator.ParEvalua == 1);
  if (allDataPar.length > 0) {
    for (const par of allDataPar) {
      let dataPerEvaluator = arrAllDetailEvaluated.filter(values => values.IdEvDetail == par.IdEvDetail);
      const result = await getDataResultsPerEvaluatorUnique(dataPerEvaluator);
      resultAcum.push(result);
    }
    const arregloAplanado = resultAcum.flatMap(registro => registro);
    const sumaPorCompetencia = [];
    arregloAplanado.forEach(item => {
        const { result, idCompetence , competence} = item;
        if (!sumaPorCompetencia[idCompetence]) {
            sumaPorCompetencia[idCompetence] = { sum: 0, count: 0 , competence: competence};
        }
        sumaPorCompetencia[idCompetence].sum += result;
        sumaPorCompetencia[idCompetence].count++;
    });
    resultFinal = Object.keys(sumaPorCompetencia).map(idCompetence => {
        const { sum, count, competence } = sumaPorCompetencia[idCompetence];
        const result = count > 0 ? sum / count : 0;
        return {
            idCompetence,
            result,
            competence
        };
    });
    const resultFinal = resultAcum.flatMap(registro => registro);
  }
  return resultFinal;
}

async function getDataResultSub() {
  let resultAcum = [];
  let resultFinal = [];
  let allDataSub = arrListEvaluators.filter(evaluator => evaluator.SubordinadoEvalua == 1);
  if (allDataSub.length > 0) {
    for (const sub of allDataSub) {
      let dataPerEvaluator = arrAllDetailEvaluated.filter(values => values.IdEvDetail == sub.IdEvDetail);
      const result = await getDataResultsPerEvaluatorUnique(dataPerEvaluator);
      resultAcum.push(result);
    }
    const arregloAplanado = resultAcum.flatMap(registro => registro);
    const sumaPorCompetencia = [];
    arregloAplanado.forEach(item => {
        const { result, idCompetence , competence} = item;
        if (!sumaPorCompetencia[idCompetence]) {
            sumaPorCompetencia[idCompetence] = { sum: 0, count: 0 , competence: competence};
        }
        sumaPorCompetencia[idCompetence].sum += result;
        sumaPorCompetencia[idCompetence].count++;
    });
    resultFinal = Object.keys(sumaPorCompetencia).map(idCompetence => {
        const { sum, count, competence } = sumaPorCompetencia[idCompetence];
        const result = count > 0 ? sum / count : 0;
        return {
            idCompetence,
            result,
            competence
        };
    });
  }
  return resultFinal;
}

async function getDataResultJe(){
  let resultFinal = [];
  let allDataJe = arrListEvaluators.filter( evaluator => evaluator.JefeEvalua == 1);
  if (allDataJe.length > 0) {
    let dataPerEvaluator = arrAllDetailEvaluated.filter( values => values.IdEvDetail == allDataJe[0].IdEvDetail);
    const result = await getDataResultsPerEvaluatorUnique(dataPerEvaluator);
    resultFinal = result;
  }
  return resultFinal;
}

async function getDataTableGeneralEvaluated(data){
  let dataEmployee = [{
    name: data.Nombre,
    noEmployee: data.NoEmpleado,
    job: data.Puesto,
    level: lvlEvaluated
  }];
  return dataEmployee;
}

async function getDetailPerEvaluator(evaluator){
  let dataPerEvaluator = arrAllDetailEvaluated.filter( values => values.IdEvDetail == evaluator);
  const allDetailResult = await getDataResultsPerEvaluator(dataPerEvaluator);
  return allDetailResult;
}

async function getDataResultsPerEvaluatorUnique(arr){
  const allCompetences = await getUniqueCompetencesWhitQuestions(arr);
  let arrResultCompetences = [];
  allCompetences.forEach( competence => {
    let sumFinal = 0;
    let resFinal = 0;
    competence.preguntas.forEach( question => {
      const dataQuestion = arrConfig.filter(item => item.IdPregunta == question.IdPregunta);
      if (question.idTipoPregunta == 1) {
        if (dataQuestion[0].BoolCorreta == question.Calificacion) {
          sumFinal += 100;
        }
      } else if (question.idTipoPregunta == 2) {
        const answerEsp = arrConfig.filter( configAn => configAn.IdPregunta == question.IdPregunta && configAn.NivelEmpleadoEsperadoOM == lvlEvaluated);
        if (answerEsp[0].RespuestaEsperadoOM == question.Calificacion) {
          sumFinal += 100;
        } else {
          let answerExpected = answerEsp[0].RespuestaEsperadoOM;
          const allAnswersPerQuestion = arrAnswersQuestion.filter(answer => answer.IdPregunta == question.IdPregunta);
          const indexExpected = allAnswersPerQuestion.findIndex(answer => answer.Respuesta == answerExpected);
          const indexAnswer = allAnswersPerQuestion.findIndex(answer => answer.Respuesta == question.Calificacion);
          if (indexExpected > indexAnswer) {
            sumFinal += 100;
          } else {
            let sumaElse = 100;
            let resNoExpected = allAnswersPerQuestion.filter( nE => nE.Respuesta > answerExpected);
            let valuePerRes = (100 / resNoExpected.length);
            for (var i = 0; i < resNoExpected.length; i++) {
              sumaElse = (sumaElse - valuePerRes);
              if (resNoExpected[i]["Respuesta"] == question.Calificacion) {
                break;
              }
            }
            let cantAnswers = allAnswersPerQuestion.length;
            let resPositions = (indexAnswer - indexExpected);
            sumFinal += sumaElse;
          }
        }
      } else if (question.idTipoPregunta == 3) {
        let diffRange = ((Number(dataQuestion[0].RangoFinal) - Number(dataQuestion[0].RangoInicial)));
        let diffValue = (Number(diffRange) - Number(question.Calificacion));
        let restFinal = (100 - diffValue);
        // console.log(dataQuestion);
        // console.log(question);
        // console.log(diffRange);
        // console.log(diffValue);
        // console.log(restFinal);
        sumFinal += restFinal;
      } else if (question.idTipoPregunta == 4) {
        // console.log(question);
        // console.log(dataQuestion);
        if (question.Calificacion == dataQuestion[0].RespuestaCorrectaOM) {
          sumFinal += 100;
        }
      }
    });
    resFinal = (sumFinal / competence.preguntas.length);
    arrResultCompetences.push({
      competence: competence.competencia,
      result: resFinal,
      idCompetence: competence.idCompetencia
    });
  });
  return arrResultCompetences;
}

async function getDataResultsPerEvaluator(arr){
  const allCompetences = await getUniqueCompetencesWhitQuestions(arr);
  let arrResultCompetences = [];
  allCompetences.forEach( competence => {
    let sumFinal = 0;
    let resFinal = 0;
    competence.preguntas.forEach( question => {
      const dataQuestion = arrConfig.filter(item => item.IdPregunta == question.IdPregunta);
      if (question.idTipoPregunta == 1) {
        if (dataQuestion[0].BoolCorreta == question.Calificacion) {
          sumFinal += 100;
        }
      } else if (question.idTipoPregunta == 2) {
        const answerEsp = arrConfig.filter( configAn => configAn.IdPregunta == question.IdPregunta && configAn.NivelEmpleadoEsperadoOM == lvlEvaluated);
        if (answerEsp[0].RespuestaEsperadoOM == question.Calificacion) {
          sumFinal += 100;
        } else {
          let answerExpected = answerEsp[0].RespuestaEsperadoOM;
          const allAnswersPerQuestion = arrAnswersQuestion.filter(answer => answer.IdPregunta == question.IdPregunta);
          const indexExpected = allAnswersPerQuestion.findIndex(answer => answer.Respuesta == answerExpected);
          const indexAnswer = allAnswersPerQuestion.findIndex(answer => answer.Respuesta == question.Calificacion);
          if (indexExpected > indexAnswer) {
            sumFinal += 100;
          } else {
            let sumaElse = 100;
            let resNoExpected = allAnswersPerQuestion.filter( nE => nE.Respuesta > answerExpected);
            let valuePerRes = (100 / resNoExpected.length);
            for (var i = 0; i < resNoExpected.length; i++) {
              sumaElse = (sumaElse - valuePerRes);
              if (resNoExpected[i]["Respuesta"] == question.Calificacion) {
                break;
              }
            }
            let cantAnswers = allAnswersPerQuestion.length;
            let resPositions = (indexAnswer - indexExpected);
            sumFinal += sumaElse;
          }
        }
      } else if (question.idTipoPregunta == 3) {
        let diffRange = ((Number(dataQuestion[0].RangoFinal) - Number(dataQuestion[0].RangoInicial)));
        let diffValue = (Number(diffRange) - Number(question.Calificacion));
        let restFinal = (100 - diffValue);
        // console.log(dataQuestion);
        // console.log(question);
        // console.log(diffRange);
        // console.log(diffValue);
        // console.log(restFinal);
        sumFinal += restFinal;
      } else if (question.idTipoPregunta == 4) {
        // console.log(question);
        // console.log(dataQuestion);
        if (question.Calificacion == dataQuestion[0].RespuestaCorrectaOM) {
          sumFinal += 100;
        }
      }
    });
    resFinal = (sumFinal / competence.preguntas.length);
    arrResultCompetences.push({
      competence: competence.competencia,
      result: resFinal,
      idCompetence: competence.idCompetencia
    });
  });
  let bestOrWorstC = await bestAndWorstCompetencesPerEvaluator(arrResultCompetences);
  return {
    results: arrResultCompetences,
    bestOrWorst: bestOrWorstC
  };
}


async function getUniqueCompetencesWhitQuestions(arr){
  const datosAgrupados = [];
  arr.forEach((dato, i) => {
    const idCompetencia = dato.IdCompetencia;
    const competencia = dato.Competencia;
    const tipoCompetencia = dato.idTipoPregunta;
    const competenciaIndex = datosAgrupados.findIndex(item => item.idCompetencia == idCompetencia);
    if (competenciaIndex == -1) {
      datosAgrupados.push({
        idCompetencia,
        competencia,
        preguntas: [dato]
      });
    } else {
      datosAgrupados[competenciaIndex].preguntas.push(dato);
    }
  });
  return datosAgrupados;
}

async function  bestAndWorstCompetencesPerEvaluator(arr){
    let numeroMayor = arr.reduce(function(mayor, registro) {
      if (Number(registro.result) > mayor) {
        return registro.result;
      } else {
        return mayor;
      }
    }, -Infinity);
    let registrosMayores = arr.filter(function(registro) {
      return registro.result === numeroMayor;
    });
    let registrosMenores = arr.filter( valueR => Number(valueR.result) < 70);
    let arrRetorno = [{
      bestCompetences: registrosMayores,
      worstCompetences: registrosMenores
    }];
    return arrRetorno;
  }
