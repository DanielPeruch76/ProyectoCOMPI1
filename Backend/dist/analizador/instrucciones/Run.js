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
const Declaracion_1 = __importDefault(require("./Declaracion"));
const Metodo_1 = __importDefault(require("./Metodo"));
class Run extends Instruccion_1.Instruccion {
    constructor(id, params, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.parametros = params;
    }
    interpretar(arbol, tabla) {
        let busqueda = arbol.getFuncion(this.id);
        if (busqueda == null) {
            return new Errores_1.default("SEMANTICO", "Funcion no existente", this.linea, this.col);
        }
        if (busqueda instanceof Metodo_1.default) {
            let nuevoEntorno = new tablaSimbolo_1.default(arbol.getTablaGlobal());
            nuevoEntorno.setNombre("RUN");
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion_1.default(busqueda.parametros[i].tipo, this.linea, this.col, busqueda.parametros[i].id, busqueda.parametros[i].valor, "const");
                let resultadoDeclaracion = declaracionParametro.interpretar(arbol, nuevoEntorno);
                if (resultadoDeclaracion instanceof Errores_1.default)
                    return resultadoDeclaracion;
            }
            for (let i = 0; i < this.parametros.length; i++) {
                let resultado = nuevoEntorno.getVariable(this.parametros[i].id);
                if (resultado == null) {
                    return new Errores_1.default("SEMANTICO", "Parametro no existente", this.linea, this.col);
                }
                let resultadoValor = this.parametros[i].valor.interpretar(arbol, nuevoEntorno);
                if (resultadoValor instanceof Errores_1.default)
                    return resultadoValor;
                if (resultado.getTipo().getTipo() != this.parametros[i].valor.tipoDato.getTipo()) {
                    return new Errores_1.default("SEMANTICO", "Tipo de parametro erroneo", this.linea, this.col);
                }
                resultado.setValor(resultadoValor);
            }
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = nuevoEntorno.getVariable(busqueda.parametros[i].id);
                if (resultado == null) {
                    return new Errores_1.default("SEMANTICO", "Faltan parametros", this.linea, this.col);
                }
                if (resultado.getValor() == null) {
                    return new Errores_1.default("SEMANTICO", "Existen nulos en los parametros", this.linea, this.col);
                }
            }
            let resultadoMetodo = busqueda.interpretar(arbol, nuevoEntorno);
            if (resultadoMetodo instanceof Errores_1.default)
                return resultadoMetodo;
        }
    }
}
exports.default = Run;
