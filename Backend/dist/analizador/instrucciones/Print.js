"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Llamada_1 = __importDefault(require("./Llamada"));
const Nativo_1 = __importDefault(require("../expresiones/Nativo"));
class Print extends Instruccion_1.Instruccion {
    constructor(exp, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.expresion = exp;
    }
    interpretar(arbol, tabla) {
        console.log("La expresion que mandaron a imprimir es esto ");
        if (this.expresion instanceof Llamada_1.default) {
            console.log("Una llamada se quiere asignar");
            let valorLlamada = this.expresion.interpretar(arbol, tabla);
            let valorImprimir = valorLlamada.interpretar(arbol, tabla);
            arbol.Print(valorImprimir);
            return;
        }
        console.log(this.expresion);
        let valor = this.expresion.interpretar(arbol, tabla);
        console.log("-----------El valor que se obtuvo al interpretar en IMPRIMIR--------------------------------");
        console.log(valor);
        //esto podria dar un error, cualquier cosa borrar esto
        if (valor instanceof Nativo_1.default) {
            valor = valor.interpretar(arbol, tabla);
        }
        if (valor instanceof Errores_1.default)
            return valor;
        arbol.Print(valor);
    }
}
exports.default = Print;
