"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodoAst = void 0;
class NodoAst {
    constructor(valor) {
        this.valor = valor;
        this.listaHijos = new Array();
    }
    agregarValor(val) {
        this.listaHijos.push(new NodoAst(val));
    }
    agregarHijo(hijo) {
        if (hijo != undefined)
            this.listaHijos.push(hijo);
    }
}
exports.NodoAst = NodoAst;
