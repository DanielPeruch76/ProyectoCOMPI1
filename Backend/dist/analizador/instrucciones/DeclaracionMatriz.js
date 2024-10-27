"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class DeclaracionMatriz extends Instruccion_1.Instruccion {
    constructor(tipo, linea, col, mutabilidad, id, tipoVector, tamanioFila, tamanioColumna) {
        super(tipo, linea, col);
        this.mutabilidad = mutabilidad;
        this.identificador = id;
        this.tipoVector = tipoVector;
        this.tamanioFila = tamanioFila;
        this.tamanioColumna = tamanioColumna;
    }
    interpretar(arbol, tabla) {
        if (this.tamanioFila == null) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, null))) {
                return new Errores_1.default('SEMANTICO', 'No hay valor de fila', this.linea, this.col);
            }
            return;
        }
        if (this.tamanioColumna == null) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, null))) {
                return new Errores_1.default('SEMANTICO', 'No hay valor de columna', this.linea, this.col);
            }
            return;
        }
        let tamanioFila = this.tamanioFila.interpretar(arbol, tabla);
        if (tamanioFila instanceof Errores_1.default)
            return tamanioFila;
        if (this.tamanioFila.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO) {
            return new Errores_1.default('SEMANTICO', 'No se asigno un valor correcto para el tamaño de el vector', this.linea, this.col);
        }
        let tamanioColumna = this.tamanioColumna.interpretar(arbol, tabla);
        if (tamanioColumna instanceof Errores_1.default)
            return tamanioColumna;
        if (this.tamanioColumna.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO) {
            return new Errores_1.default('SEMANTICO', 'No se asigno un valor correcto para el tamaño de el vector', this.linea, this.col);
        }
        if (this.tipoDato.getTipo() != this.tipoVector.getTipo()) {
            return new Errores_1.default('SEMANTICO', 'No coicide el tipo de vector con el tipo de variable', this.linea, this.col);
        }
        let vector_guardar = Array.from({ length: tamanioFila }, () => new Array(tamanioColumna).fill(null));
        if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, vector_guardar))) {
            return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
        }
    }
}
exports.default = DeclaracionMatriz;
