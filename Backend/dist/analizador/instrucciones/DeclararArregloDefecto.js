"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
class DeclararArregloDefecto extends Instruccion_1.Instruccion {
    constructor(tipo, linea, col, mutabilidad, id, listaVector) {
        super(tipo, linea, col);
        this.mutabilidad = mutabilidad;
        this.identificador = id;
        this.listaVector = listaVector;
    }
    interpretar(arbol, tabla) {
        for (let elemento of this.listaVector) {
            if (elemento.tipoDato.getTipo() != this.tipoDato.getTipo()) {
                return new Errores_1.default('SEMANTICO', 'No coicide el tipo de vector de valor', this.linea, this.col);
            }
        }
        console.log(this.listaVector);
        if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, this.listaVector))) {
            return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
        }
    }
}
exports.default = DeclararArregloDefecto;
