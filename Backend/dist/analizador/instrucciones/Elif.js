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
const tablaSimbolo_1 = __importDefault(require("../simbolo/tablaSimbolo"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const Break_1 = __importDefault(require("./Break"));
const Continue_1 = __importDefault(require("./Continue"));
const Return_1 = __importDefault(require("./Return"));
const ReturnDefault_1 = __importDefault(require("./ReturnDefault"));
class Elif extends Instruccion_1.Instruccion {
    constructor(cond, ins, insElif, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.condicion = cond;
        this.instrucciones = ins;
        this.instruccionesElif = insElif;
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
            for (let i of this.instrucciones) {
                if (i instanceof Break_1.default) {
                    return i;
                }
                if (i instanceof Continue_1.default) {
                    return i;
                }
                if (i instanceof Return_1.default) {
                    return i;
                }
                if (i instanceof ReturnDefault_1.default) {
                    return i;
                }
                let resultados = i.interpretar(arbol, nuevaTabla);
                if (resultados instanceof Break_1.default) {
                    return resultados;
                }
                if (resultados instanceof Continue_1.default) {
                    return resultados;
                }
                if (resultados instanceof Return_1.default) {
                    return resultados;
                }
                if (resultados instanceof ReturnDefault_1.default) {
                    return resultados;
                }
                if (resultados instanceof Errores_1.default) {
                    arbol.addErrores(resultados);
                }
            }
        }
        else {
            let resultado = this.instruccionesElif.interpretar(arbol, nuevaTabla);
            if (resultado instanceof Break_1.default) {
                return resultado;
            }
            if (resultado instanceof Continue_1.default) {
                return resultado;
            }
            if (resultado instanceof Return_1.default) {
                return resultado;
            }
            if (resultado instanceof ReturnDefault_1.default) {
                return resultado;
            }
            if (resultado instanceof Errores_1.default) {
                arbol.addErrores(resultado);
            }
        }
    }
}
exports.default = Elif;
