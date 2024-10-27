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
exports.Relacional = void 0;
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class Relacionales extends Instruccion_1.Instruccion {
    constructor(rel, cond1, cond2, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.BOOL), linea, col);
        this.cond1 = cond1;
        this.cond2 = cond2;
        this.relacional = rel;
    }
    interpretar(arbol, tabla) {
        console.log("------------------Relacionales----------------------");
        let conIzq = this.cond1.interpretar(arbol, tabla);
        console.log("Condicion izquierda");
        console.log(conIzq);
        if (conIzq instanceof Errores_1.default)
            return conIzq;
        let conDer = this.cond2.interpretar(arbol, tabla);
        console.log("Condicion derecha");
        console.log(conDer);
        if (conDer instanceof Errores_1.default)
            return conDer;
        switch (this.relacional) {
            case Relacional.IGUALDAD:
                return this.Igualdad(conIzq, conDer);
            case Relacional.DIFERENTE:
                return this.noIgual(conIzq, conDer);
            case Relacional.MAYOR:
                return this.mayor(conIzq, conDer);
            case Relacional.MAYORIGUAL:
                return this.MayorIgual(conIzq, conDer);
            case Relacional.MENOR:
                return this.Menor(conIzq, conDer);
            case Relacional.MENORIGUAL:
                return this.MenorIgual(conIzq, conDer);
            case Relacional.AND:
                return this.And(conIzq, conDer);
            case Relacional.OR:
                return this.Or(conIzq, conDer);
            case Relacional.NOT:
                return this.Not(conIzq);
            default:
                return new Errores_1.default('SEMANTICO', 'RELACIONAL INVALIDO', this.linea, this.col);
        }
    }
    menor(comp1, comp2) {
        let comparando1 = this.cond1.tipoDato.getTipo();
        let comparando2 = this.cond2.tipoDato.getTipo();
        switch (comparando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseInt(comp1) < parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseInt(comp1) < parseFloat(comp2);
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        let caracter2 = comp2.toString().charAt(0);
                        return parseInt(comp1) < parseInt(caracter2.charCodeAt(0));
                    case Tipo_1.tipoDato.NULL:
                        return false;
                    default:
                        return new Errores_1.default('SEMANTICO', 'RELACIONAL INVALIDO', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(comp1) < parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseFloat(comp2);
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        let caracter2 = comp2.toString().charAt(0);
                        return parseInt(comp1) < parseInt(caracter2.charCodeAt(0));
                    case Tipo_1.tipoDato.NULL:
                        return false;
                    default:
                        return new Errores_1.default('SEMANTICO', 'RELACIONAL INVALIDO', this.linea, this.col);
                }
            default:
                return new Errores_1.default('SEMANTICO', 'RELACIONAL INVALIDO', this.linea, this.col);
        }
    }
    Igualdad(condicionIzquierda, condicionDerecha) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return (parseInt(condicionIzquierda) === parseInt(condicionDerecha));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return (parseInt(condicionIzquierda) === parseFloat(condicionDerecha));
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return (parseInt(condicionIzquierda) === parseInt(caracter));
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        console.log(condicionIzquierda);
                        return condicionIzquierda === condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return (parseFloat(condicionIzquierda) === parseInt(condicionDerecha));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return (parseFloat(condicionIzquierda) === parseFloat(condicionDerecha));
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterChar = condicionDerecha.toString().charAt(0);
                        return (parseFloat(condicionIzquierda) === parseInt(caracterChar));
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            case Tipo_1.tipoDato.CHAR:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzq = condicionIzquierda.toString().charAt(0);
                        return (parseInt(caracterIzq) === parseInt(condicionDerecha));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzqDec = condicionIzquierda.toString().charAt(0);
                        return (parseInt(caracterIzqDec) === parseFloat(condicionDerecha));
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda === caracterDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            case Tipo_1.tipoDato.STRING:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.STRING:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda.toString().localeCompare(condicionDerecha.toString()) === 0;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda.toString().toLowerCase() === condicionDerecha.toString().toLowerCase();
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda === condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default:
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }
    noIgual(condicionIzquierda, condicionDerecha) {
        console.log("-----------------------Se verifica si son diferentes-------------------------------");
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        console.log("El tipo de dato de la condicion 1");
        console.log(tipoCondicionIzquierda);
        console.log("El tipo de dato de la condicion 2");
        console.log(tipoCondicionDerecha);
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) !== parseInt(condicionDerecha);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) !== parseFloat(condicionDerecha);
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) !== parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    default:
                        return new Errores_1.default("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                console.log("Esta entrando en el decimal");
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) !== parseInt(condicionDerecha);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) !== parseFloat(condicionDerecha);
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) !== parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    default:
                        return new Errores_1.default("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) !== parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) !== parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda !== caracterDerecha;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    default:
                        return new Errores_1.default("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.STRING: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda.toString().toLowerCase() !== condicionDerecha.toString().toLowerCase();
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    default:
                        return new Errores_1.default("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda !== condicionDerecha;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    default:
                        return new Errores_1.default("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda != condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default:
                return new Errores_1.default("SEMANTICO", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }
    Menor(condicionIzquierda, condicionDerecha) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) < parseInt(condicionDerecha);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) < parseFloat(condicionDerecha);
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) < parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) < parseInt(condicionDerecha);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) < parseFloat(condicionDerecha);
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) < parseInt(caracter);
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) < parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) < parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda < caracterDerecha;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.STRING: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda.toString().length < condicionDerecha.toString().length;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        let valor1 = condicionIzquierda.toString().toLowerCase();
                        let valor2 = condicionDerecha.toString().toLowerCase();
                        let op1 = 1;
                        let op2 = 1;
                        if (valor1 === 'true') {
                            op1 = 1;
                        }
                        else {
                            op1 = 0;
                        }
                        if (valor2 === "true") {
                            op2 = 1;
                        }
                        else {
                            op2 = 0;
                        }
                        return op1 < op2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda < condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default:
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }
    mayor(condicionIzquierda, condicionDerecha) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) > parseInt(condicionDerecha);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) > parseFloat(condicionDerecha);
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) > parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) > parseInt(condicionDerecha);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) > parseFloat(condicionDerecha);
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) > parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) > parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) > parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda > caracterDerecha;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.STRING: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda.toString().length > condicionDerecha.toString().length;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        let valor1 = condicionIzquierda.toString().toLowerCase();
                        let valor2 = condicionDerecha.toString().toLowerCase();
                        let op1 = 1;
                        let op2 = 1;
                        if (valor1 === 'true') {
                            op1 = 1;
                        }
                        else {
                            op1 = 0;
                        }
                        if (valor2 === "true") {
                            op2 = 1;
                        }
                        else {
                            op2 = 0;
                        }
                        return op1 > op2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda > condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default:
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }
    MayorIgual(condicionIzquierda, condicionDerecha) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) >= parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) >= parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) >= parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) >= parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) >= parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) >= parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) >= parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) >= parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda >= caracterDerecha;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.STRING: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda.toString().length >= condicionDerecha.toString().length;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        let valor1 = condicionIzquierda.toString().toLowerCase();
                        let valor2 = condicionDerecha.toString().toLowerCase();
                        let op1 = 1;
                        let op2 = 1;
                        if (valor1 === 'true') {
                            op1 = 1;
                        }
                        else {
                            op1 = 0;
                        }
                        if (valor2 === "true") {
                            op2 = 1;
                        }
                        else {
                            op2 = 0;
                        }
                        return op1 >= op2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda >= condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default: {
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
            }
        }
    }
    MenorIgual(condicionIzquierda, condicionDerecha) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) <= parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseInt(condicionIzquierda) <= parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) <= parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) <= parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) <= parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) <= parseInt(caracter);
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) <= parseInt(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) <= parseFloat(condicionDerecha);
                    }
                    case Tipo_1.tipoDato.CHAR: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda <= caracterDerecha;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        let valor1 = condicionIzquierda.toString().toLowerCase();
                        let valor2 = condicionDerecha.toString().toLowerCase();
                        let op1 = 1;
                        let op2 = 1;
                        if (valor1 === 'true') {
                            op1 = 1;
                        }
                        else {
                            op1 = 0;
                        }
                        if (valor2 === "true") {
                            op2 = 1;
                        }
                        else {
                            op2 = 0;
                        }
                        return op1 <= op2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return condicionIzquierda <= condicionDerecha;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default: {
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
            }
        }
    }
    And(condicionIzquierda, condicionDerecha) {
        let tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        let tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        let envio1 = true;
        let envio2 = true;
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        if (condicionIzquierda.toString().toLowerCase() === "true") {
                            envio1 = true;
                        }
                        else {
                            envio1 = false;
                        }
                        if (condicionDerecha.toString().toLowerCase() === "true") {
                            envio2 = true;
                        }
                        else {
                            envio2 = false;
                        }
                        return envio1 && envio2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Operación AND", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default: {
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación AND", this.linea, this.col);
            }
        }
    }
    Or(condicionIzquierda, condicionDerecha) {
        let tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        let tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        let envio1 = true;
        let envio2 = true;
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        if (condicionIzquierda.toString().toLowerCase() === "true") {
                            envio1 = true;
                        }
                        else {
                            envio1 = false;
                        }
                        if (condicionDerecha.toString().toLowerCase() === "true") {
                            envio2 = true;
                        }
                        else {
                            envio2 = false;
                        }
                        return envio1 || envio2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Operación OR", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.NULL:
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    case Tipo_1.tipoDato.NULL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        return false;
                    default:
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            default: {
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación OR", this.linea, this.col);
            }
        }
    }
    Xor(condicionIzquierda, condicionDerecha) {
        let tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        let tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        let envio1 = true;
        let envio2 = true;
        switch (tipoCondicionIzquierda) {
            case Tipo_1.tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case Tipo_1.tipoDato.BOOL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                        if (condicionIzquierda.toString().toLowerCase() === "true") {
                            envio1 = true;
                        }
                        else {
                            envio1 = false;
                        }
                        if (condicionDerecha.toString().toLowerCase() === "true") {
                            envio2 = true;
                        }
                        else {
                            envio2 = false;
                        }
                        return envio1 && envio2;
                    }
                    case Tipo_1.tipoDato.NULL:
                        return false;
                    default: {
                        return new Errores_1.default("Error Semántico", "Dato Comparado Derecho No Apto Para Operación XOR", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores_1.default("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación XOR", this.linea, this.col);
            }
        }
    }
    Not(condicionUnica) {
        let tipoCondicionUnica = this.cond1.tipoDato.getTipo();
        let envio1 = true;
        switch (tipoCondicionUnica) {
            case Tipo_1.tipoDato.BOOL: {
                this.tipoDato.setTipo(Tipo_1.tipoDato.BOOL);
                if (condicionUnica.toString().toLowerCase() === "true") {
                    envio1 = true;
                }
                else {
                    envio1 = false;
                }
                return !(envio1);
            }
            case Tipo_1.tipoDato.NULL:
                return false;
            default: {
                return new Errores_1.default("Error Semántico", "Dato No Apto Para Operación NOT", this.linea, this.col);
            }
        }
    }
}
exports.default = Relacionales;
var Relacional;
(function (Relacional) {
    Relacional[Relacional["IGUALDAD"] = 0] = "IGUALDAD";
    Relacional[Relacional["DIFERENTE"] = 1] = "DIFERENTE";
    Relacional[Relacional["MENOR"] = 2] = "MENOR";
    Relacional[Relacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    Relacional[Relacional["MAYOR"] = 4] = "MAYOR";
    Relacional[Relacional["MAYORIGUAL"] = 5] = "MAYORIGUAL";
    Relacional[Relacional["AND"] = 6] = "AND";
    Relacional[Relacional["OR"] = 7] = "OR";
    Relacional[Relacional["NOT"] = 8] = "NOT";
})(Relacional || (exports.Relacional = Relacional = {}));
