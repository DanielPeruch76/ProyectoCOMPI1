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
exports.Operadores = void 0;
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const AccesoMatriz_1 = __importDefault(require("../instrucciones/AccesoMatriz"));
const AccesoVector_1 = __importDefault(require("../instrucciones/AccesoVector"));
const Llamada_1 = __importDefault(require("../instrucciones/Llamada"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const Nativo_1 = __importDefault(require("./Nativo"));
class Aritmeticas extends Instruccion_1.Instruccion {
    constructor(operacion, linea, col, op1, op2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.ENTERO), linea, col);
        this.operacion = operacion;
        this.operando1 = op1;
        this.operando2 = op2;
    }
    interpretar(arbol, tabla) {
        let opIzq, opDer = null;
        opIzq = this.operando1.interpretar(arbol, tabla);
        console.log("Esto es el valor izquierdo+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(opIzq);
        if (opIzq instanceof Llamada_1.default) {
            opIzq = opIzq.interpretar(arbol, tabla);
            console.log("___________________El valor que tiene la llamada es_______________________ ");
            console.log(opIzq);
        }
        if (opIzq instanceof AccesoMatriz_1.default) {
            opIzq = opIzq.interpretar(arbol, tabla);
            console.log("Es un acceso Matriz convirtio el opizq en:");
            console.log(opIzq);
        }
        if (opIzq instanceof AccesoVector_1.default) {
            opIzq = opIzq.interpretar(arbol, tabla);
            console.log("Es un acceso Matriz convirtio el opizq en:");
            console.log(opIzq);
        }
        if (opIzq instanceof Nativo_1.default) {
            opIzq = opIzq.interpretar(arbol, tabla);
            console.log("Se convirtio el opizq en:");
            console.log(opIzq);
        }
        if (opIzq instanceof Aritmeticas) {
            opIzq = opIzq.interpretar(arbol, tabla);
            if (opIzq instanceof Errores_1.default)
                return opIzq;
            console.log("Se convirtio el opizq en:");
            console.log(opIzq);
        }
        if (opIzq instanceof Errores_1.default)
            return opIzq;
        opDer = this.operando2.interpretar(arbol, tabla);
        console.log("Esto es el valor derecho***************************************");
        console.log(opDer);
        if (opDer instanceof Llamada_1.default) {
            opDer = opDer.interpretar(arbol, tabla);
            console.log("___________________________El valor que tiene la llamada es___________________");
            console.log(opDer);
        }
        if (opDer instanceof AccesoMatriz_1.default) {
            opDer = opDer.interpretar(arbol, tabla);
            console.log("Es un acceso Matriz convirtio el opder en:");
            console.log(opDer);
        }
        if (opDer instanceof AccesoVector_1.default) {
            opDer = opDer.interpretar(arbol, tabla);
            console.log("Es un acceso Matriz convirtio el opizq en:");
            console.log(opDer);
        }
        if (opDer instanceof Nativo_1.default) {
            opDer = opDer.interpretar(arbol, tabla);
            console.log("Se convirtio el opizq en:");
            console.log(opDer);
        }
        if (opDer instanceof Aritmeticas) {
            opDer = opDer.interpretar(arbol, tabla);
            if (opDer instanceof Errores_1.default)
                return opDer;
            console.log("Se convirtio el opider en:");
            console.log(opDer);
        }
        if (opDer instanceof Errores_1.default)
            return opDer;
        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(opIzq, opDer);
            case Operadores.RESTA:
                return this.resta(opIzq, opDer);
            case Operadores.MULTIPLICACION:
                return this.multiplicacion(opIzq, opDer);
            case Operadores.DIVISION:
                return this.division(opIzq, opDer);
            case Operadores.POTENCIA:
                return this.potencia(opIzq, opDer);
            case Operadores.RAIZ:
                return this.raiz(opIzq, opDer);
            case Operadores.MODULO:
                return this.modulo(opIzq, opDer);
            case Operadores.UNARIA:
                return this.negacion(opIzq);
            default:
                return new Errores_1.default("SEMANTICO", "Aritmeticas Erroneas", this.linea, this.col);
        }
    }
    suma(op1, op2) {
        let tipo1 = this.operando1.tipoDato.getTipo();
        console.log("-----------------El tipo del operarando izquierdo es----------------------------------");
        console.log(tipo1);
        console.log(op1);
        let tipo2 = this.operando2.tipoDato.getTipo();
        console.log("------------------------El tipo del operarando derecho es ----------------------------");
        console.log(tipo2);
        console.log(op2);
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1) + parseFloat(op2);
                    case Tipo_1.tipoDato.STRING:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) + op2.charCodeAt(0);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        if (op2.toString().toLowerCase() === "true") {
                            return parseInt(op1) + 1;
                        }
                        else {
                            return parseInt(op1) + 0;
                        }
                    default:
                        return new Errores_1.default("SEMANTICO", "Tipo derecho no compatible", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case Tipo_1.tipoDato.STRING:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + op2.charCodeAt(0);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        if (op2.toString().toLowerCase() === "true") {
                            return parseFloat(op1) + 1;
                        }
                        else {
                            return parseFloat(op1) + 0;
                        }
                    default:
                        return new Errores_1.default("SEMANTICO", "Tipo derecho no compatible", this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        if (op1.toString().toLowerCase() === "true") {
                            return 1 + parseInt(op2);
                        }
                        else {
                            return 0 + parseInt(op2);
                        }
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        if (op1.toString().toLowerCase() === "true") {
                            return 1 + parseFloat(op2);
                        }
                        else {
                            return 0 + parseFloat(op2);
                        }
                    case Tipo_1.tipoDato.STRING:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    default:
                        return new Errores_1.default("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.STRING:
                this.tipoDato.setTipo(Tipo_1.tipoDato.STRING);
                return op1.toString() + op2.toString();
            case Tipo_1.tipoDato.CHAR:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return op1.charCodeAt(0) + parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return op1.charCodeAt(0) + parseFloat(op2);
                    case Tipo_1.tipoDato.STRING:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    default:
                        return new Errores_1.default("SEMANTICO", "Tipo derecho no compatible", this.linea, this.col);
                }
            default:
                return new Errores_1.default("SEMANTICO", "Tipo izquierdo no compatible", this.linea, this.col);
        }
    }
    resta(op1, op2) {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1) - parseFloat(op2);
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        let caracter1 = op2.toString().charAt(0);
                        return parseInt(op1) - caracter1.charCodeAt(0);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        if (op2.toString().toLowerCase() === "true") {
                            return parseInt(op1) - 1;
                        }
                        else {
                            return parseInt(op1) - 0;
                        }
                    default:
                        return new Errores_1.default("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        if (op1.toString().toLowerCase() === "true") {
                            return 1 - parseInt(op2);
                        }
                        else {
                            return 0 - parseInt(op2);
                        }
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        if (op1.toString().toLowerCase() === "true") {
                            return 1 - parseFloat(op2);
                        }
                        else {
                            return 0 - parseFloat(op2);
                        }
                    default:
                        return new Errores_1.default("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        if (op2.toString().toLowerCase() === "true") {
                            return parseFloat(op1) - 1;
                        }
                        else {
                            return parseFloat(op1) - 0;
                        }
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        let caracter2 = op2.toString().charAt(0);
                        return parseFloat(op1) - caracter2.charCodeAt(0);
                    default:
                        return new Errores_1.default("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.CHAR:
                let caracter3 = op1.toString().charAt(0);
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return caracter3.charCodeAt(0) - parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return caracter3.charCodeAt(0) - parseFloat(op2);
                    default:
                        return new Errores_1.default("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            default:
                return new Errores_1.default("SEMANTICO", "Restando izquierdo incorrecto", this.linea, this.col);
        }
    }
    multiplicacion(op1, op2) {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) * parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1) * parseFloat(op2);
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        let caracter1 = op2.toString().charAt(0);
                        return parseInt(op1) * caracter1.charCodeAt(0);
                    default:
                        return new Errores_1.default("SEMANTICO", "Multiplicando derecho incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case Tipo_1.tipoDato.CHAR:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        let caracter2 = op2.toString().charAt(0);
                        return parseFloat(op1) * caracter2.charCodeAt(0);
                    default:
                        return new Errores_1.default("SEMANTICO", "Multiplicando derecho incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.CHAR:
                let caracter3 = op1.toString().charAt(0);
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return caracter3.charCodeAt(0) * parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return caracter3.charCodeAt(0) * parseFloat(op2);
                    default:
                        return new Errores_1.default("SEMANTICO", "Multiplicando derecho incorrecto", this.linea, this.col);
                }
            default:
                return new Errores_1.default("SEMANTICO", "Multiplicando izquierdo incorrecto", this.linea, this.col);
        }
    }
    division(op1, op2) {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();
        if (op2 == 0) {
            return new Errores_1.default("SEMANTICO", "División por cero", this.linea, this.col);
        }
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseInt(op1) / parseInt(op2));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseInt(op1) / parseFloat(op2));
                    case Tipo_1.tipoDato.CHAR:
                        let caracter1 = op2.toString().charAt(0);
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseInt(op1) / caracter1.charCodeAt(0));
                    default:
                        return new Errores_1.default("SEMANTICO", "Divisor de tipo incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseFloat(op1) / parseInt(op2));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseFloat(op1) / parseFloat(op2));
                    case Tipo_1.tipoDato.CHAR:
                        let caracter2 = op2.toString().charAt(0);
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseFloat(op1) / caracter2.charCodeAt(0));
                    default:
                        return new Errores_1.default("SEMANTICO", "Divisor de tipo incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.CHAR:
                let caracter3 = op1.toString().charAt(0);
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (caracter3.charCodeAt(0) / parseInt(op2));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (caracter3.charCodeAt(0) / parseFloat(op2));
                    default:
                        return new Errores_1.default("SEMANTICO", "Divisor de tipo incorrecto", this.linea, this.col);
                }
            default:
                return new Errores_1.default("SEMANTICO", "Dividendo de tipo incorrecto", this.linea, this.col);
        }
    }
    potencia(base, exponente) {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return Math.pow(parseInt(base), parseInt(exponente));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseInt(base), parseFloat(exponente));
                    default:
                        return new Errores_1.default("SEMANTICO", "Exponente de tipo incorrecto", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(base), parseInt(exponente));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(base), parseFloat(exponente));
                    default:
                        return new Errores_1.default("SEMANTICO", "Exponente de tipo incorrecto", this.linea, this.col);
                }
            default:
                return new Errores_1.default("SEMANTICO", "Base de tipo incorrecto", this.linea, this.col);
        }
    }
    modulo(op1, op2) {
        const tipo1 = this.operando1.tipoDato.getTipo();
        const tipo2 = this.operando2.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseInt(op1) % parseInt(op2));
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseInt(op1) % parseFloat(op2));
                    }
                    default: {
                        return new Errores_1.default("Error Semántico", "Divisor Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseFloat(op1) % parseInt(op2));
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return (parseFloat(op1) % parseFloat(op2));
                    }
                    default: {
                        return new Errores_1.default("Error Semántico", "Divisor Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores_1.default("Error Semántico", "Valor Izquierdo De Tipo Incorrecto", this.linea, this.col);
            }
        }
    }
    negacion(op1) {
        const tipo1 = this.operando1.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO: {
                this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                return -parseInt(op1);
            }
            case Tipo_1.tipoDato.DECIMAL: {
                this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                return -parseFloat(op1);
            }
            default: {
                return new Errores_1.default("Error Semántico", "Tipo De Dato Erróneo Para Obtener Su Negativo", this.linea, this.col);
            }
        }
    }
    raiz(op1, op2) {
        const tipo1 = this.operando1.tipoDato.getTipo();
        const tipo2 = this.operando2.tipoDato.getTipo();
        switch (tipo1) {
            case Tipo_1.tipoDato.ENTERO: {
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
                        return Math.pow(parseInt(op1), 1 / parseInt(op2));
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseInt(op1), 1 / parseFloat(op2));
                    }
                    default: {
                        return new Errores_1.default("Error Semántico", "Índice de Raíz Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            case Tipo_1.tipoDato.DECIMAL: {
                switch (tipo2) {
                    case Tipo_1.tipoDato.ENTERO: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), 1 / parseInt(op2));
                    }
                    case Tipo_1.tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), 1 / parseFloat(op2));
                    }
                    default: {
                        return new Errores_1.default("Error Semántico", "Índice de Raíz Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores_1.default("Error Semántico", "Número Base Izquierdo De Tipo Incorrecto", this.linea, this.col);
            }
        }
    }
}
exports.default = Aritmeticas;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operadores[Operadores["DIVISION"] = 3] = "DIVISION";
    Operadores[Operadores["POTENCIA"] = 4] = "POTENCIA";
    Operadores[Operadores["RAIZ"] = 5] = "RAIZ";
    Operadores[Operadores["MODULO"] = 6] = "MODULO";
    Operadores[Operadores["UNARIA"] = 7] = "UNARIA";
})(Operadores || (exports.Operadores = Operadores = {}));
