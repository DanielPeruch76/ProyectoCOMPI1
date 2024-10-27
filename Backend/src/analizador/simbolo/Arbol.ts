import tablaSimbolo from "./tablaSimbolo";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Metodo from "../instrucciones/Metodo";
import Funcion from "../instrucciones/Funcion";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: tablaSimbolo
    private errores: Array<Errores>
    private funciones: Array<Instruccion>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new tablaSimbolo()
        this.errores = new Array<Errores>()
        this.funciones = new Array<Instruccion>()
    }

    public getConsola(): string {
        return this.consola
    }

    public setConsola(console: string): void {
        this.consola = console
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): tablaSimbolo {
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla: tablaSimbolo) {
        this.tablaGlobal = tabla
    }

    public getErrores(): any {
        return this.errores
    }

    public Print(entrada: any) {
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
                            } else if (i === tamanioCadena - 2) {
                                this.consola += entrada.substring(0, i - siglas) + "\n";
                                entrada = "";
                            } else {
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
                            } else if (i === tamanioCadena - 2) {
                                this.consola += entrada.substring(0, i - siglas) + "\t";
                                entrada = "";
                            } else {
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
                            } else if (i === tamanioCadena - 2) {
                                this.consola += entrada.substring(0, i - siglas) + "\r";
                                entrada = "";
                            } else {
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

    public addErrores(error: Errores) {
        this.errores.push(error)
    }

    public getFunciones() {
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>) {
        this.funciones = funciones
    }

    public addFunciones(funcion: Instruccion) {
        this.funciones.push(funcion)
    }

    public getFuncion(id: string) {
        console.log("El nombre de la funcion que se busca es "+id)
        for (let i of this.getFunciones()) {
            if (i instanceof Metodo) {
                if (i.id.toLowerCase() == id.toLowerCase()) {
                    return i
                }
            }
            if(i instanceof Funcion){
                if (i.id.toLowerCase() == id.toLowerCase()) {
                    return i
                }
            }
        }
        return null
    }
}