"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablaSimbolo_1 = __importDefault(require("./tablaSimbolo"));
const Metodo_1 = __importDefault(require("../instrucciones/Metodo"));
const Funcion_1 = __importDefault(require("../instrucciones/Funcion"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new tablaSimbolo_1.default();
        this.errores = new Array();
        this.funciones = new Array();
    }
    getConsola() {
        return this.consola;
    }
    setConsola(console) {
        this.consola = console;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getTablaGlobal() {
        return this.tablaGlobal;
    }
    setTablaGlobal(tabla) {
        this.tablaGlobal = tabla;
    }
    getErrores() {
        return this.errores;
    }
    Print(entrada) {
        const tamanioCadena = entrada.length;
        let siglas = 0;
        let cadenaEvaluar = entrada;
        for (let i = 0; i < tamanioCadena; i++) {
            switch (cadenaEvaluar.charAt(i)) {
                case '\\':
                    switch (cadenaEvaluar.charAt(i + 1)) {
                        case 'n': {
                            if (i === 0) {
                                this.consola += "\n";
                                entrada = entrada.substring(2);
                                siglas += 2;
                            }
                            else if (i === tamanioCadena - 2) {
                                this.consola += entrada.substring(0, i - siglas) + "\n";
                                entrada = "";
                            }
                            else {
                                this.consola += entrada.substring(0, i - siglas) + "\n";
                                const quitado = entrada.substring(0, i - siglas + 2).length;
                                entrada = entrada.substring(i - siglas + 2);
                                siglas += quitado;
                            }
                            break;
                        }
                        case 't': {
                            if (i === 0) {
                                this.consola += "\t";
                                entrada = entrada.substring(2);
                                siglas += 2;
                            }
                            else if (i === tamanioCadena - 2) {
                                this.consola += entrada.substring(0, i - siglas) + "\t";
                                entrada = "";
                            }
                            else {
                                this.consola += entrada.substring(0, i - siglas) + "\t";
                                const quitado = entrada.substring(0, i - siglas + 2).length;
                                entrada = entrada.substring(i - siglas + 2);
                                siglas += quitado;
                            }
                            break;
                        }
                        case 'r': {
                            if (i === 0) {
                                this.consola += "\r";
                                entrada = entrada.substring(2);
                                siglas += 2;
                            }
                            else if (i === tamanioCadena - 2) {
                                this.consola += entrada.substring(0, i - siglas) + "\r";
                                entrada = "";
                            }
                            else {
                                this.consola += entrada.substring(0, i - siglas) + "\r";
                                const quitado = entrada.substring(0, i - siglas + 2).length;
                                entrada = entrada.substring(i - siglas + 2);
                                siglas += quitado;
                            }
                            break;
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        this.consola += entrada + "\n";
    }
    addErrores(error) {
        this.errores.push(error);
    }
    getFunciones() {
        return this.funciones;
    }
    setFunciones(funciones) {
        this.funciones = funciones;
    }
    addFunciones(funcion) {
        this.funciones.push(funcion);
    }
    getFuncion(id) {
        console.log("El nombre de la funcion que se busca es " + id);
        for (let i of this.getFunciones()) {
            if (i instanceof Metodo_1.default) {
                if (i.id.toLowerCase() == id.toLowerCase()) {
                    return i;
                }
            }
            if (i instanceof Funcion_1.default) {
                if (i.id.toLowerCase() == id.toLowerCase()) {
                    return i;
                }
            }
        }
        return null;
    }
}
exports.default = Arbol;
