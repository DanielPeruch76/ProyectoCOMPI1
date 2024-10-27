"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoDato = void 0;
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
}
exports.default = Tipo;
var tipoDato;
(function (tipoDato) {
    tipoDato[tipoDato["ENTERO"] = 0] = "ENTERO";
    tipoDato[tipoDato["DECIMAL"] = 1] = "DECIMAL";
    tipoDato[tipoDato["BOOL"] = 2] = "BOOL";
    tipoDato[tipoDato["CHAR"] = 3] = "CHAR";
    tipoDato[tipoDato["STRING"] = 4] = "STRING";
    tipoDato[tipoDato["NULL"] = 5] = "NULL";
    tipoDato[tipoDato["VOID"] = 6] = "VOID";
})(tipoDato || (exports.tipoDato = tipoDato = {}));
