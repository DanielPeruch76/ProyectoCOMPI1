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
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Aritmeticas_1 = __importDefault(require("../expresiones/Aritmeticas"));
const Nativo_1 = __importDefault(require("../expresiones/Nativo"));
const Relacionales_1 = __importDefault(require("../expresiones/Relacionales"));
const tablaSimbolo_1 = __importDefault(require("../simbolo/tablaSimbolo"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const Llamada_1 = __importDefault(require("./Llamada"));
class IfTernario extends Instruccion_1.Instruccion {
    constructor(cond, instruccionTrue, instruccionFalse, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.condicion = cond;
        this.instruccionTrue = instruccionTrue;
        this.instruccionFalse = instruccionFalse;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores_1.default)
            return cond;
        if (this.condicion.tipoDato.getTipo() != Tipo_1.tipoDato.BOOL) {
            return new Errores_1.default('SEMANTICO', 'LA CONDICION DEBE SER BOOL', this.linea, this.col);
        }
        let nuevaTabla = new tablaSimbolo_1.default(tabla);
        if (cond) {
            console.log("se entro a  la condicion del if ternaria");
            console.log(this.instruccionTrue.interpretar(arbol, tabla));
            let resultado = this.instruccionTrue.interpretar(arbol, tabla);
            console.log(resultado);
            if (this.instruccionTrue instanceof Llamada_1.default) {
                return this.instruccionTrue.interpretar(arbol, tabla);
            }
            if (this.instruccionTrue instanceof Aritmeticas_1.default) {
                resultado = new Nativo_1.default(this.instruccionTrue.tipoDato, this.instruccionTrue.interpretar(arbol, tabla), this.linea, this.col);
                console.log("Este es el valor nativo que se creo en el if ternario artimeitca");
                console.log(resultado);
            }
            if (this.instruccionTrue instanceof Relacionales_1.default) {
                resultado = new Nativo_1.default(this.instruccionTrue.tipoDato, this.instruccionTrue.interpretar(arbol, tabla), this.linea, this.col);
                console.log("Este es el valor nativo que se creo en el if ternario");
                console.log(resultado);
            }
            console.log("------------------se envia este resultado en el teranrio--------------------------");
            console.log(resultado);
            return resultado;
        }
        else {
            let resultado = this.instruccionFalse.interpretar(arbol, tabla);
            console.log(resultado);
            if (this.instruccionFalse instanceof Llamada_1.default) {
                return this.instruccionFalse.interpretar(arbol, tabla);
            }
            if (this.instruccionFalse instanceof Aritmeticas_1.default) {
                return new Nativo_1.default(this.instruccionFalse.tipoDato, this.instruccionFalse.interpretar(arbol, tabla), this.linea, this.col);
            }
            if (this.instruccionFalse instanceof Relacionales_1.default) {
                return new Nativo_1.default(this.instruccionFalse.tipoDato, this.instruccionFalse.interpretar(arbol, tabla), this.linea, this.col);
            }
            console.log("------------------se envia este resultado en el teranrio--------------------------");
            console.log(resultado);
            return resultado;
        }
    }
}
exports.default = IfTernario;
