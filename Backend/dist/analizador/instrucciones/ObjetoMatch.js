"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjetoMatch {
    constructor(opcion, ins) {
        this.opcion = opcion;
        this.instrucciones = ins;
    }
    getOpcion() {
        return this.opcion;
    }
    setOpcion(opcion) {
        this.opcion = opcion;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
}
exports.default = ObjetoMatch;
