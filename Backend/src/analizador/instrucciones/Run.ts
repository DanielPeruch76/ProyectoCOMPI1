

import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Declaracion from './Declaracion'
import Metodo from './Metodo'




export default class Run extends Instruccion {
    private id: string
    private parametros: any[]

    constructor(id: string, params: any[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.parametros = params
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let busqueda = arbol.getFuncion(this.id)
        if (busqueda == null) {
            return new Errores("SEMANTICO", "Funcion no existente",
                this.linea, this.col)
        }

        if (busqueda instanceof Metodo) {
            
            let nuevoEntorno = new tablaSimbolo(arbol.getTablaGlobal())
            nuevoEntorno.setNombre("RUN")

            
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion(busqueda.parametros[i].tipo,
                    this.linea, this.col, busqueda.parametros[i].id,
                    busqueda.parametros[i].valor,"const");

                let resultadoDeclaracion = declaracionParametro.interpretar(arbol, nuevoEntorno)
                if (resultadoDeclaracion instanceof Errores) return resultadoDeclaracion


            }

            
            for (let i = 0; i < this.parametros.length; i++) {
                
                let resultado = nuevoEntorno.getVariable(this.parametros[i].id)
                if (resultado == null) {
                    return new Errores("SEMANTICO", "Parametro no existente",
                        this.linea, this.col)
                }

                
                let resultadoValor = this.parametros[i].valor.interpretar(arbol, nuevoEntorno);
                if (resultadoValor instanceof Errores) return resultadoValor

                
                if (resultado.getTipo().getTipo() != this.parametros[i].valor.tipoDato.getTipo()) {
                    return new Errores("SEMANTICO", "Tipo de parametro erroneo",
                        this.linea, this.col)
                }

                
                resultado.setValor(resultadoValor)
            }

            
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = nuevoEntorno.getVariable(busqueda.parametros[i].id)
                if (resultado == null) {
                    return new Errores("SEMANTICO", "Faltan parametros",
                        this.linea, this.col)
                }
                if (resultado.getValor() == null) {
                    return new Errores("SEMANTICO",
                        "Existen nulos en los parametros",
                        this.linea, this.col)
                }
            }

            let resultadoMetodo: any = busqueda.interpretar(arbol, nuevoEntorno)
            if (resultadoMetodo instanceof Errores) return resultadoMetodo
        }
    }
}

