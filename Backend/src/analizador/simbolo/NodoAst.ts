export  class NodoAst {
    public listaHijos: Array<NodoAst>;
  
    constructor(public valor: string) {
      this.listaHijos = new Array<NodoAst>();
    }
    public agregarValor(val: string) {
        this.listaHijos.push(new NodoAst(val))
    }
    public agregarHijo(hijo: NodoAst | undefined) {
      if (hijo != undefined) this.listaHijos.push(hijo);
    }
  }