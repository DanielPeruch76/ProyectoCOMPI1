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
class MatchDefault extends Instruccion_1.Instruccion {
    constructor(condicion, opciones, instruccionesDefault, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.condicion = condicion;
        this.opciones = opciones;
        this.instruccionesDefault = instruccionesDefault;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores_1.default)
            return cond;
        let nuevaTabla = new tablaSimbolo_1.default(tabla);
        for (let op of this.opciones) {
            let opcionComparar = op.getOpcion().interpretar(arbol, nuevaTabla);
            if (cond.toString().toLowerCase() === opcionComparar.toString().toLowerCase()) {
                let instruccionesMatch = op.getInstrucciones();
                for (let k of instruccionesMatch) {
                    if (k instanceof Break_1.default) {
                        return null;
                    }
                    if (k instanceof Continue_1.default) {
                        return k;
                    }
                    if (k instanceof Return_1.default) {
                        return k;
                    }
                    if (k instanceof ReturnDefault_1.default) {
                        return k;
                    }
                    let resultados = k.interpretar(arbol, nuevaTabla);
                    if (resultados instanceof Break_1.default) {
                        return null;
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
        }
        for (let r of this.instruccionesDefault) {
            if (r instanceof Break_1.default) {
                return null;
            }
            if (r instanceof Continue_1.default) {
                return r;
            }
            if (r instanceof Return_1.default) {
                return r;
            }
            if (r instanceof ReturnDefault_1.default) {
                return r;
            }
            let resultados = r.interpretar(arbol, nuevaTabla);
            if (resultados instanceof Break_1.default) {
                return null;
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
}
exports.default = MatchDefault;
