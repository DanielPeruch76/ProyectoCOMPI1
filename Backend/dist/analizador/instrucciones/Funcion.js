"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Aritmeticas_1 = __importDefault(require("../expresiones/Aritmeticas"));
const Nativo_1 = __importDefault(require("../expresiones/Nativo"));
const Llamada_1 = __importDefault(require("./Llamada"));
const Return_1 = __importDefault(require("./Return"));
class Funcion extends Instruccion_1.Instruccion {
    constructor(tipo, id, params, ins, tipoRetorno, linea, col) {
        super(tipo, linea, col);
        this.id = id;
        this.parametros = params;
        this.instrucciones = ins;
        this.tipoRetorno = tipoRetorno;
    }
    interpretar(arbol, tabla) {
        for (let i of this.instrucciones) {
            if (i instanceof Return_1.default) {
                console.log("------------------------Primer Bloque-------------------------\n");
                console.log(i);
                console.log("--------------------------------------------------------------\n");
                let resultadoDevolver = i.interpretar(arbol, tabla);
                console.log("El tipo de expresion a devolver antes de interpretar es:");
                console.log(resultadoDevolver);
                console.log(resultadoDevolver.tipoDato);
                if (resultadoDevolver instanceof Aritmeticas_1.default) {
                    resultadoDevolver.interpretar(arbol, tabla);
                    console.log("\tEntro en la clase funcion a crear un valor nativo\n");
                    resultadoDevolver = new Nativo_1.default(resultadoDevolver.tipoDato, resultadoDevolver.interpretar(arbol, tabla), resultadoDevolver.linea, resultadoDevolver.col);
                }
                if (resultadoDevolver instanceof Llamada_1.default) {
                    console.log("\tSe esta interpretando el valor de la llamada en la clase funcion\n");
                    resultadoDevolver = resultadoDevolver.interpretar(arbol, tabla);
                }
                console.log("La expresion a devolver despues de interpretar es:");
                console.log(resultadoDevolver);
                console.log(resultadoDevolver.tipoDato);
                console.log(this.tipoRetorno);
                if (resultadoDevolver.tipoDato.getTipo() === this.tipoRetorno.getTipo()) {
                    console.log("Si devuleve algo UwU");
                    console.log(resultadoDevolver);
                    return resultadoDevolver;
                }
                return new Errores_1.default('SEMANTICO', 'La expresión que se desea devolver no es del mismo tipo que la función que tiene que devolver', this.linea, this.col);
            }
            let resultado = i.interpretar(arbol, tabla);
            if (resultado instanceof Return_1.default) {
                console.log("------------------------Segundo Bloque-------------------------\n");
                console.log(resultado);
                console.log("---------------------------------------------------------------\n");
                let resultadoDevolver = resultado.interpretar(arbol, tabla);
                console.log("El tipo de expresion a devolver antes de interpretar es:");
                console.log(resultadoDevolver);
                console.log(resultadoDevolver.tipoDato);
                if (resultadoDevolver instanceof Aritmeticas_1.default) {
                    resultadoDevolver.interpretar(arbol, tabla);
                    console.log("\tEntro en la clase funcion a crear un valor nativo\n");
                    resultadoDevolver = new Nativo_1.default(resultadoDevolver.tipoDato, resultadoDevolver.interpretar(arbol, tabla), resultadoDevolver.linea, resultadoDevolver.col);
                }
                if (resultadoDevolver instanceof Llamada_1.default) {
                    console.log("\tSe esta interpretando el valor de la llamada en la clase funcion\n");
                    resultadoDevolver = resultadoDevolver.interpretar(arbol, tabla);
                }
                console.log("La expresion a devolver despues de interpretar es:");
                console.log(resultadoDevolver);
                console.log(resultadoDevolver.tipoDato);
                console.log(this.tipoRetorno);
                if (resultadoDevolver.tipoDato.getTipo() === this.tipoRetorno.getTipo()) {
                    console.log("Si devuleve algo UwU");
                    console.log(resultadoDevolver);
                    return resultadoDevolver;
                }
                return new Errores_1.default('SEMANTICO', 'La expresión que se desea devolver no es del mismo tipo que la función que tiene que devolver', this.linea, this.col);
            }
            if (resultado instanceof Errores_1.default)
                arbol.addErrores(resultado);
        }
        return null;
    }
}
exports.default = Funcion;
