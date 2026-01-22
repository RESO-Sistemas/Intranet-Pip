export class DataNivelesTemp {
  constructor() {
    this._arrNiveles = [];
  }
  cleanArr(){
    this._arrNiveles = [];
  }
  addNivel(lvl,esperado){
    console.log(this._arrNiveles);
    console.log(lvl);
    console.log(esperado);
    if(lvl !== undefined && lvl !== null && lvl !== "" && esperado !== undefined && esperado !== null && esperado !== ""){
      let validate = this._arrNiveles.some(function(lvlf){
        return lvlf._nivel == lvl;
      });
      if (!validate) {
        this._arrNiveles.push({
          _nivel: lvl,
          _esperado: esperado
        });
        return {
          resultado: true
        };
      } else {
        return {
          resultado: false,
          msg: "El nivel que intenta seleccionar ya se encuentra registrado en la lista."
        };
      }
    } else {
      return {
        resultado: false,
        msg: "Ingrese el nivel y la calificación deseada."
      };
    }
  }
  removeSelected(lvl){
    console.log(lvl);
    this._arrNiveles = this._arrNiveles.filter(function(d){
      return d._nivel != lvl;
    })
    return {
      resultado: true
    };
  }
}
