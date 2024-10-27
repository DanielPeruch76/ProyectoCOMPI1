"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Aritmeticas_1 = __importDefault(require("../expresiones/Aritmeticas"));
const Nativo_1 = __importDefault(require("../expresiones/Nativo"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipo, linea, col, id, valor, mutabilidad) {
        super(tipo, linea, col);
        this.identificador = id;
        this.valor = valor;
        this.mutabilidad = mutabilidad;
    }
    interpretar(arbol, tabla) {
        console.log("---------------------------Valor a Declarar --------------------------------------------");
        console.log("El valor a declarar en la variable es:  ");
        console.log(this.valor);
        if (this.valor == null) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, null))) {
                return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
            }
            return;
        }
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Aritmeticas_1.default) {
            resValor = resValor.interpretar(arbol, tabla);
        }
        if (resValor === null) {
            return new Errores_1.default('SEMANTICO', 'El valor a asignar es nulo', this.linea, this.col);
        }
        console.log("El valor a asignar despues de interpretar es este. ");
        console.log(resValor);
        console.log(resValor.tipoDato);
        console.log("\n\n");
        if (resValor instanceof Errores_1.default)
            return resValor;
        if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
            return new Errores_1.default('SEMANTICO', 'El tipo y el valor de la variable no coinciden', this.linea, this.col);
        }
        if (resValor instanceof Nativo_1.default) {
            resValor = resValor.interpretar(arbol, tabla);
        }
        if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, resValor))) {
            return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
        }
    }
}
exports.default = Declaracion;
