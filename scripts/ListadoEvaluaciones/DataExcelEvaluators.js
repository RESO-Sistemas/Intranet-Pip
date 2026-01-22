export class DataExcelEvaluators {
  constructor(content){
    this.content = [];
  }
  addDataEvaluators(data){
    console.log(data);
    this.content = data;
  }
  header(){
    return this.content[10];
  }
  rowsEvaluators(){
    return this.content.slice(11,this.content.length);
  }
  firstRow(){
    return this.rowsEvaluators()[0];
  }
  getFinalData(){
    const arrFinalReturn = [];
    const rowsEvaluators = this.rowsEvaluators();
    rowsEvaluators.forEach( row => {
      arrFinalReturn.push({
        evaluated: row[0],
        evaluator: row[1],
        level_evaluated: row[2],
        type_evaluated: row[3],
      });
    });
    return arrFinalReturn;
  }
  getCantRows(){
    console.log(this.rowsEvaluators().length);
  }
}
