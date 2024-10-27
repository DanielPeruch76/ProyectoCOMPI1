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
const IfTernario_1 = __importDefault(require("./IfTernario"));
const Llamada_1 = __importDefault(require("./Llamada"));
class AsignacionVar extends Instruccion_1.Instruccion {
    constructor(id, exp, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.exp = exp;
    }
    interpretar(arbol, tabla) {
        let variable = tabla.getVariable(this.id.toLowerCase());
        if (variable == null) {
            return new Errores_1.default('SEMANTICO', 'La variable no existe', this.linea, this.col);
        }
        console.log("--------------------nuevo valor a asignar :3--------------------------\n");
        console.log(this.exp);
        let newValor = this.exp.interpretar(arbol, tabla);
        if (this.exp instanceof IfTernario_1.default) {
            this.exp.tipoDato = newValor.tipoDato;
        }
        if (this.exp instanceof Llamada_1.default) {
            newValor = newValor.interpretar(arbol, tabla);
        }
        console.log("--------------------Este es el nuevo valor asignar :3--------------------------");
        console.log(newValor);
        if (newValor instanceof Errores_1.default)
            return newValor;
        if (this.exp.tipoDato.getTipo() != variable.getTipo().getTipo()) {
            console.log("\n++++++++++++++++++++Hubo un error de tipos en la asignacion++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
            return new Errores_1.default('SEMANTICO', 'Los tipos deben de ser iguales', this.linea, this.col);
        }
        if (variable.getMutabilidad().toLowerCase() === "const") {
            return new Errores_1.default("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
        }
        this.tipoDato = variable.getTipo();
        variable.setValor(newValor);
    }
}
exports.default = AsignacionVar;
