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
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class CasteoAsignacion extends Instruccion_1.Instruccion {
    constructor(id, tipoCasteo, exp, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.exp = exp;
        this.tipoCasteo = tipoCasteo;
    }
    interpretar(arbol, tabla) {
        let variable = tabla.getVariable(this.id.toLowerCase());
        if (variable == null) {
            return new Errores_1.default('SEMANTICO', 'La variable no existe', this.linea, this.col);
        }
        let newValor = this.exp.interpretar(arbol, tabla);
        if (newValor instanceof Errores_1.default)
            return newValor;
        if (this.exp.tipoDato.getTipo() === Tipo_1.tipoDato.ENTERO) {
            let tipo = this.tipoCasteo.getTipo();
            let valor_casteado = 0;
            switch (tipo) {
                case Tipo_1.tipoDato.ENTERO:
                    valor_casteado = parseInt(this.exp.interpretar(arbol, tabla));
                    console.log("Este es el exp casteado" + valor_casteado);
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                case Tipo_1.tipoDato.DECIMAL:
                    valor_casteado = parseFloat(this.exp.interpretar(arbol, tabla)).toFixed(1);
                    console.log("Este es el exp casteado" + valor_casteado);
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                case Tipo_1.tipoDato.STRING:
                    valor_casteado = this.exp.interpretar(arbol, tabla).toString();
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                case Tipo_1.tipoDato.CHAR:
                    valor_casteado = String.fromCharCode(parseInt(this.exp.interpretar(arbol, tabla)));
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                default:
                    return new Errores_1.default('SEMANTICO', 'No se puede casterar de esa manera', this.linea, this.col);
            }
        }
        else if (this.exp.tipoDato.getTipo() === Tipo_1.tipoDato.DECIMAL) {
            let tipo = this.tipoCasteo.getTipo();
            let valor_casteado = 0;
            switch (tipo) {
                case Tipo_1.tipoDato.ENTERO:
                    let valor_casteado_int = Math.floor(parseInt(this.exp.interpretar(arbol, tabla)));
                    console.log("este es unn valor double convertido a int" + valor_casteado_int);
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado_int);
                case Tipo_1.tipoDato.DECIMAL:
                    valor_casteado = parseFloat(this.exp.interpretar(arbol, tabla)).toFixed(1);
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                case Tipo_1.tipoDato.STRING:
                    valor_casteado = this.exp.interpretar(arbol, tabla).toString();
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                default:
                    return new Errores_1.default('SEMANTICO', 'No se puede casterar de esa manera', this.linea, this.col);
            }
        }
        else if (this.exp.tipoDato.getTipo() === Tipo_1.tipoDato.CHAR) {
            let tipo = this.tipoCasteo.getTipo();
            let valor_casteado = 0;
            switch (tipo) {
                case Tipo_1.tipoDato.ENTERO:
                    valor_casteado = parseFloat(this.exp.interpretar(arbol, tabla).charCodeAt(0)).toFixed(0);
                    console.log("valor casteado" + valor_casteado);
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    console.log(Math.floor(parseInt(valor_casteado)));
                    variable.setValor(Math.floor(parseInt(valor_casteado)));
                case Tipo_1.tipoDato.DECIMAL:
                    valor_casteado = parseFloat(this.exp.interpretar(arbol, tabla).charCodeAt(0)).toFixed(1);
                    if (this.tipoCasteo.getTipo() != variable.getTipo().getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (variable.getMutabilidad().toLowerCase() === "const") {
                        return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo();
                    variable.setValor(valor_casteado);
                default:
                    return new Errores_1.default('SEMANTICO', 'No se puede casterar de esa manera', this.linea, this.col);
            }
        }
        else {
            return new Errores_1.default('SEMANTICO', 'Este dato no se puede castear', this.linea, this.col);
        }
    }
}
exports.default = CasteoAsignacion;
