"use strict";
// equivalente a EJECUTAR de su proyecto
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
const Funcion_1 = __importDefault(require("./Funcion"));
const AccesoVar_1 = __importDefault(require("../expresiones/AccesoVar"));
const Aritmeticas_1 = __importDefault(require("../expresiones/Aritmeticas"));
const Nativo_1 = __importDefault(require("../expresiones/Nativo"));
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, params, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.parametros = params;
    }
    interpretar(arbol, tabla) {
        let busqueda = arbol.getFuncion(this.id);
        console.log(busqueda);
        if (busqueda == null) {
            return new Errores_1.default("SEMANTICO", "Funcion no existente", this.linea, this.col);
        }
        if (busqueda instanceof Metodo_1.default) {
            console.log("Se interpreatara el metodo enviado");
            let nuevoEntorno = new tablaSimbolo_1.default(arbol.getTablaGlobal());
            nuevoEntorno.setNombre("LLAMADA");
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
                let resultadoValor = this.parametros[i].valor.interpretar(arbol, tabla);
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
        if (busqueda instanceof Funcion_1.default) {
            console.log("-----------------------------------------------------------------------------------------------------------");
            console.log("Si se evaluara la funcion enviada");
            //crear nuevo entorno
            let nuevoEntorno = new tablaSimbolo_1.default(arbol.getTablaGlobal());
            nuevoEntorno.setNombre("LLAMADA");
            //declarando parametros con valor por defecto (exp, null)
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion_1.default(busqueda.parametros[i].tipo, this.linea, this.col, busqueda.parametros[i].id, busqueda.parametros[i].valor, "const");
                let resultadoDeclaracion = declaracionParametro.interpretar(arbol, nuevoEntorno);
                console.log("Esta es el valor de la declaracion :3");
                console.log(resultadoDeclaracion);
                if (resultadoDeclaracion instanceof Errores_1.default)
                    return resultadoDeclaracion;
            }
            // actualizar valor de los parametros parametros del run
            for (let i = 0; i < this.parametros.length; i++) {
                //verificando existencia del parametro
                let resultado = nuevoEntorno.getVariable(this.parametros[i].id);
                console.log("Este es la variable a actualizar");
                console.log(resultado);
                if (resultado == null) {
                    return new Errores_1.default("SEMANTICO", "Parametro no existente", this.linea, this.col);
                }
                // interpretar valor a asignar
                /*
                Esta es la diferencia respecto al RUN
                El run unicamente tiene acceso a el entorno global, por eso
                no hay problema para interpretar el valor del parametro con nuevoEntorno

                Pero la llamada tiene acceso al entorno donde se llamo,
                por eso debemos de interpretar con el entorno llamado tabla
                */
                console.log("Este es el valor que se manda por parametro para asignarlo en la variable y acutalizarlo antes de interpretar");
                console.log(this.parametros[i].valor);
                let resultadoValor = this.parametros[i].valor.interpretar(arbol, tabla);
                console.log("Este es el valor que se manda por parametro para asignarlo en la variable y acutalizarlo");
                console.log(resultadoValor);
                if (resultadoValor instanceof Errores_1.default)
                    return resultadoValor;
                // Tipo de parametro es igual a tipo nuevo valor?
                if (resultado.getTipo().getTipo() != this.parametros[i].valor.tipoDato.getTipo()) {
                    return new Errores_1.default("SEMANTICO", "Tipo de parametro erroneo", this.linea, this.col);
                }
                // asignar nuevo valor
                resultado.setValor(resultadoValor);
            }
            // validamos que ningun parametro tenga valor null
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = nuevoEntorno.getVariable(busqueda.parametros[i].id);
                if (resultado == null) {
                    return new Errores_1.default("SEMANTICO", "Faltan parametros", this.linea, this.col);
                }
                if (resultado.getValor() == null) {
                    return new Errores_1.default("SEMANTICO", "Existen nulos en los parametros", this.linea, this.col);
                }
            }
            console.log("Este el valor de la funcion que se llama busqueda :3-------------> ");
            console.log(busqueda);
            console.log("Esta es la tabla de simbolos de la funcion actual: ");
            console.log(nuevoEntorno);
            let resultadoFuncion = busqueda.interpretar(arbol, nuevoEntorno);
            console.log("El resultado de la funcion es ");
            console.log(resultadoFuncion);
            if (resultadoFuncion === null) {
                return new Errores_1.default('SEMANTICO', 'Esta funcion no devuleve nada', this.linea, this.col);
            }
            if (resultadoFuncion instanceof Errores_1.default)
                return resultadoFuncion;
            if (resultadoFuncion != null) {
                console.log("-------------------Esta es el tipo de la llamada---------------------------");
                this.tipoDato.setTipo(resultadoFuncion.tipoDato.getTipo());
                console.log(this.tipoDato.getTipo());
                console.log("Si esta esta reconociendo el return de la funcion");
                console.log(resultadoFuncion);
                if (resultadoFuncion instanceof AccesoVar_1.default) {
                    console.log("Se devuelve un acceso de variable");
                    resultadoFuncion = resultadoFuncion.interpretar(arbol, nuevoEntorno);
                    console.log("Este es el valor al accesar a la variable en la funcion------> " + resultadoFuncion);
                }
                if (resultadoFuncion instanceof Aritmeticas_1.default) {
                    console.log("Se devuelve una aritmetica en la funcio y se crea el siguiente simbolo");
                    resultadoFuncion = resultadoFuncion.interpretar(arbol, nuevoEntorno);
                    console.log("Esto es lo que se devulve a de la funcion------> ");
                    console.log(resultadoFuncion);
                }
                if (resultadoFuncion instanceof Nativo_1.default) {
                    console.log("Se esta enviando un valor nativo en la llamada uwu");
                    return resultadoFuncion;
                }
                if (resultadoFuncion instanceof Llamada) {
                    console.log("Se esta enviando un valor llamada en la llamada");
                }
                return resultadoFuncion;
            }
        }
    }
}
exports.default = Llamada;
