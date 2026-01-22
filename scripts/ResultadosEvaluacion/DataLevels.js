export class ResultadosEv{
  constructor(){
    this._espA = [
      {"Calificacion": 100, "Letra": "A"},
      {"Calificacion": 75, "Letra": "B"},
      {"Calificacion": 50, "Letra": "C"},
      {"Calificacion": 25, "Letra": "D"},
      {"Calificacion": 0, "Letra": "E"}
    ];
    this._espB = [
      {"Calificacion": 100, "Letra": "A"},
      {"Calificacion": 100, "Letra": "B"},
      {"Calificacion": 66, "Letra": "C"},
      {"Calificacion": 33, "Letra": "D"},
      {"Calificacion": 0, "Letra": "E"}
    ];
    this._espC = [
      {"Calificacion": 100, "Letra": "A"},
      {"Calificacion": 100, "Letra": "B"},
      {"Calificacion": 100, "Letra": "C"},
      {"Calificacion": 50, "Letra": "D"},
      {"Calificacion": 0, "Letra": "E"}
    ];
    this._espD = [
      {"Calificacion": 100, "Letra": "A"},
      {"Calificacion": 100, "Letra": "B"},
      {"Calificacion": 100, "Letra": "C"},
      {"Calificacion": 100, "Letra": "D"},
      {"Calificacion": 0, "Letra": "E"}
    ];
    this._infoEvaluation = [];
    this._infoEvaluationGeneral = [];
    this._generalJefe = [];
    this._generalAuto = [];
    this._generalPar = [];
    this._generalSubordinado = [];
    this._currentGroup = "";
  }
  set set_currentGroup(val){
    this._currentGroup = val;
  }
  calEsperadoA(cal){
    let result = this._espA.filter( espA => {
      return espA.Letra == cal;
    });
    return result[0];
  }
  calEsperadoB(cal){
    let result = this._espB.filter( espB => {
      return espB.Letra == cal;
    });
    return result[0];
  }
  calEsperadoC(cal){
    let result = this._espC.filter( espC => {
      return espC.Letra == cal;
    });
    return result[0];
  }
  calEsperadoD(cal){
    let result = this._espD.filter( espD => {
      return espD.Letra == cal;
    });
    return result[0];
  }
  cleanInfoEvaluation(){
    this._infoEvaluation = [];
  }
  addInfoEvaluation(competencia, valor){
    this._infoEvaluation.push({
      competence: competencia,
      val: valor
    });
  }
  mejoresCompetencias(){
    let arrRetorno = [];
    var numeroMayor = this._infoEvaluation.reduce(function(mayor, registro) {
      if (registro.val > mayor) {
        return registro.val;
      } else {
        return mayor;
      }
    }, -Infinity);

    var registrosMayores = this._infoEvaluation.filter(function(registro) {
      return registro.val === numeroMayor;
    });
    registrosMayores.forEach( rm => {
      arrRetorno.push({
        competence: rm.competence
      });
    });
    return arrRetorno;
  }
  peoresCompetencias(){
    let arrRetorno = [];
    let registrosMenores = this._infoEvaluation.filter(function(registro){
      return registro.val <= 60;
    });
    let concat = "";
    registrosMenores.forEach( rm => {
      arrRetorno.push({
        competence: rm.competence
      });
    });
    return arrRetorno;
  }
  cleanGeneral(){
    this._generalJefe = [];
    this._generalAuto = [];
    this._generalPar = [];
    this._generalSubordinado = [];
  }

  addGeneralJefe(competencia,valor,type,idCompetence,esperado,original){
    this._generalJefe.push({
      typeComp: idCompetence,
      resultado:valor,
      competence: competencia,
      esperado: esperado,
      original: original,
      typeEmployee: "JEFE"
    });
  }
  resultadoGeneralJefe(){
    return this._generalJefe;
  }

  addGeneralAuto(competencia,valor,type,idCompetence,esperado,original){
    this._generalAuto.push({
      typeComp: idCompetence,
      resultado:valor,
      competence: competencia,
      esperado: esperado,
      original: original,
      typeEmployee: "AUTO"
    });
  }
  resultadoGeneralAuto(){
    return this._generalAuto;
  }

  obtenerUnicosEvaluacionDet(arr) {
    let arrUnicos = [];
    arr.forEach( dArr => {
      const result = arrUnicos.some( au => dArr._idEvDetalle === au._idEvDetalle);
      if (!result) {
        arrUnicos.push({
          _idEvDetalle: dArr._idEvDetalle,
          competence: dArr.competence
        });
      }
    });
    return arrUnicos;
  }

  competenciasUnicasGeneral(arr){
    let arrUnicos = [];
    arr.forEach( dArr => {
      const result = arrUnicos.some( au => dArr.typeComp === au.idCompetence);
      if (!result) {
        arrUnicos.push({
          idCompetence: dArr.typeComp,
          competence: dArr.competence
        });
      }
    });
    return arrUnicos;
  }

  generalSubordinadoIndividual(){
    const resultCompUnicos = this.competenciasUnicasGeneral(this._generalSubordinado);
    let dataUnicos = [];
    const result = this.obtenerUnicosEvaluacionDet(this._generalSubordinado);
    result.forEach( unico => {
      let arrUnico = [];
      this._generalSubordinado.forEach( gp => {
        if (unico._idEvDetalle === gp._idEvDetalle){
          arrUnico.push({
            resultado: gp.val,
            competence: gp.competence,
            esperado: gp.esperado,
            original: gp.original,
            idCompetence: gp.typeComp
          });
        }
      });
      dataUnicos.push(arrUnico);
    });
    const arrReturn =
      {
        competences: resultCompUnicos,
        data: dataUnicos
      };
    return arrReturn;
  }
  generalParIndividual(){
    const resultCompUnicos = this.competenciasUnicasGeneral(this._generalPar);
    let dataUnicos = [];
    const result = this.obtenerUnicosEvaluacionDet(this._generalPar);
    result.forEach( unico => {
      let arrUnico = [];
      this._generalPar.forEach( gp => {
        if (unico._idEvDetalle === gp._idEvDetalle){
          arrUnico.push({
            resultado: gp.val,
            competence: gp.competence,
            esperado: gp.esperado,
            original: gp.original,
            idCompetence: gp.typeComp
          });
        }
      });
      dataUnicos.push(arrUnico);
    });
    const arrReturn =
      {
        competences: resultCompUnicos,
        data: dataUnicos
      };
    return arrReturn;
  }

  addGeneralPar(competencia,valor,type,idCompetence,esperado,idEvDetalle,original){
    this._generalPar.push({
      typeComp: idCompetence,
      val:valor,
      competence: competencia,
      esperado: esperado,
      _idEvDetalle: idEvDetalle,
      original: original,
    });
  }
  addGeneralSub(competencia,valor,type,idCompetence,esperado,idEvDetalle,original){
    this._generalSubordinado.push({
      typeComp: idCompetence,
      val:valor,
      competence: competencia,
      esperado: esperado,
      _idEvDetalle: idEvDetalle,
      original: original,
    });
  }
  addGeneralData(competencia,valor,type,idCompetence){
    if (type == 3) {
      this._generalPar.push({
        typeComp: idCompetence,
        val:valor,
        competence: competencia
      });
    } else if (type == 4) {
      this._generalSubordinado.push({
        typeComp: idCompetence,
        val:valor,
        competence: competencia
      });
    }
  }
  infoGeneralCalculado(){
    let arrGeneral = [];
    if (this._generalPar.length > 0) {
      let resU = this.calcularGeneralIndv(this._generalPar);
      arrGeneral.push({
        typeEmployee: "PARES",
        data: resU,
        typeC: "PA",
      });
    }
    if (this._generalSubordinado.length > 0) {
      let resU = this.calcularGeneralIndv(this._generalSubordinado);
      arrGeneral.push({
        typeEmployee: "SUBORDINADOS",
        data: resU,
        typeC: "SU",
      });
    }
    return arrGeneral;
  }

  calcularGeneralIndv(arr){
    const result = this.obtenerUnicosTypeGeneral(arr);
    console.log(result);
    let arrResultados = [];
    let calificacion = 0;
    result.forEach( unico => {
      let contador = 0;
      let suma = 0;
      arr.forEach( arrD => {
        if(unico.typeId == arrD.typeComp){
          suma += arrD.val;
          contador ++;
        }
      });
      if (contador > 0 && suma > 0){
        calificacion = suma / contador;
      } else {
        calificacion = 0;
      }
      arrResultados.push({
        competence: unico.competence,
        resultado: calificacion,
        esperado: unico.esperado,
        original: "NA",
      });
    });
    return arrResultados;
  }

  obtenerUnicosTypeGeneral(arr) {
    let arrUnicos = [];
    arr.forEach( dArr => {
      const result = arrUnicos.some( au => dArr.typeComp == au.typeId);
      console.log(result);
      if (!result) {
        arrUnicos.push({
          typeId: dArr.typeComp,
          competence: dArr.competence,
          esperado: dArr.esperado
        });
      }
    });
    return arrUnicos;
  }

  calificacionFinal(){
    let resFinal = 0;
    let resJefe = 0;
    let resAuto = 0;
    let resPar = 0;
    let resSubordinados = 0;
    let acumulado = 0
    let suma = 0;
    let cantRegistros = (this._generalJefe.length + this._generalPar.length +
                          this._generalSubordinado.length + this._generalSubordinado.length);
    if (this._currentGroup == "A") {
      if (this._generalJefe.length > 0) {
        this._generalJefe.forEach( gj => {
          suma += gj.resultado;
        });
        resJefe = ((suma / this._generalJefe.length) / 100 * 40);
        suma = 0;
      }
      if (this._generalAuto.length > 0) {
        this._generalAuto.forEach( gj => {
          suma += gj.resultado;
        });
        resAuto = ((suma / this._generalAuto.length) / 100 * 10);
        suma = 0;
      }
      if (this._generalPar.length > 0) {
        this._generalPar.forEach( gj => {
          suma += gj.val;
        });
        resPar = ((suma / this._generalPar.length) / 100 * 25);
        suma = 0;
      }
      if (this._generalSubordinado.length > 0) {
        this._generalSubordinado.forEach( gj => {
          suma += gj.val;
        });
        resSubordinados = ((suma / this._generalSubordinado.length) / 100 * 25);
        suma = 0;
      }
    } else if (this._currentGroup == "B") {
      if (this._generalJefe.length > 0) {
        this._generalJefe.forEach( gj => {
          suma += gj.resultado;
        });
        resJefe = ((suma / this._generalJefe.length) / 100 * 50);
        suma = 0;
      }
      if (this._generalAuto.length > 0) {
        this._generalAuto.forEach( gj => {
          suma += gj.resultado;
        });
        resAuto = ((suma / this._generalAuto.length) / 100 * 20);
        suma = 0;
      }
      if (this._generalPar.length > 0) {
        this._generalPar.forEach( gj => {
          suma += gj.val;
        });
        resPar = ((suma / this._generalPar.length) / 100 * 30);
        suma = 0;
      }
    } else if (this._currentGroup == "C") {
      if (this._generalJefe.length > 0) {
        this._generalJefe.forEach( gj => {
          suma += gj.resultado;
        });
        resJefe = ((suma / this._generalJefe.length) / 100 * 50);
        suma = 0;
      }
      if (this._generalAuto.length > 0) {
        this._generalAuto.forEach( gj => {
          suma += gj.resultado;
        });
        resAuto = ((suma / this._generalAuto.length) / 100 * 20);
        suma = 0;
      }
      if (this._generalSubordinado.length > 0) {
        this._generalSubordinado.forEach( gj => {
          suma += gj.val;
        });
        resSubordinados = ((suma / this._generalSubordinado.length) / 100 * 30);
        suma = 0;
      }
    } else if (this._currentGroup == "D") {
      if (this._generalJefe.length > 0) {
        this._generalJefe.forEach( gj => {
          suma += gj.resultado;
        });
        resJefe = ((suma / this._generalJefe.length) / 100 * 65);
        suma = 0;
      }
      if (this._generalAuto.length > 0) {
        this._generalAuto.forEach( gj => {
          suma += gj.resultado;
        });
        resAuto = ((suma / this._generalAuto.length) / 100 * 35);
        suma = 0;
      }
    }

    return (resFinal + resJefe +resAuto + resPar).toFixed(2);
  }

  globalGeneral(){
    const unicos = this.UnicosGeneralInfo();
    let arrGeneralInfo = [];
    unicos.forEach( u => {
      let resultAcum = 0;
      let sumaInd = 0;
      let existentes = 0;
      this._infoEvaluationGeneral.forEach( info => {
        if (info.idCompetence == u.idCompetence) {
          sumaInd += info.value;
          existentes ++;
        }
      });
      if (existentes > 0){
        resultAcum = (sumaInd / existentes);
      }
      arrGeneralInfo.push({
        resultado: resultAcum,
        competence: u.competence
      });
    });
    let arrReturn = [
      {
        generalInfo: arrGeneralInfo,
        mejores: this.mejoresCompetenciasGeneral(arrGeneralInfo),
        peores: this.peoresCompetenciasGeneral(arrGeneralInfo)
      }
    ];
    return arrReturn[0];
  }

  UnicosGeneralInfo(){
    let arrUnicos = [];
    this._infoEvaluationGeneral.forEach( dArr => {
      const result = arrUnicos.some( au => dArr.idCompetence === au.idCompetence);
      if (!result) {
        arrUnicos.push({
          idCompetence: dArr.idCompetence,
          competence: dArr.competence,
        });
      }
    });
    return arrUnicos;
  }
  AddGeneralInfo(arr){
    this._infoEvaluationGeneral = arr;
  }

  mejoresCompetenciasGeneral(arr){
    let arrAll = [];
    let numeroMayor = arr.reduce(function(mayor, registro) {
      if (registro.resultado > mayor) {
        return registro.resultado;
      } else {
        return mayor;
      }
    }, -Infinity);

    let registrosMayores = arr.filter(function(registro) {
      return registro.resultado === numeroMayor;
    });
    registrosMayores.forEach( rm => {
      arrAll.push({
        competence: rm.competence
      });
    });
    console.log(arrAll);
    return arrAll;
  }
  peoresCompetenciasGeneral(arr){
    let arrAll = [];
    let registrosMenores = arr.filter(function(registro){
      return registro.resultado <= 60;
    });
    registrosMenores.forEach( rm => {
      arrAll.push({competence: rm.competence});
    });
    return arrAll;
  }
}
