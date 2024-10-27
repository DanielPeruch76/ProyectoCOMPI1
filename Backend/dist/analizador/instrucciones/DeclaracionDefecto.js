"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
class DeclaracionDefecto extends Instruccion_1.Instruccion {
    constructor(tipo, linea, col, identificadores, mutabilidad) {
        super(tipo, linea, col);
        this.identificadores = identificadores;
        this.mutabilidad = mutabilidad;
    }
    interpretar(arbol, tabla) {
        for (let i of this.identificadores) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, i, this.mutabilidad, null))) {
                return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
            }
        }
    }
}
exports.default = DeclaracionDefecto;
