// equivalente a EJECUTAR de su proyecto

import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Declaracion from './Declaracion'
import Metodo from './Metodo'
import Funcion from './Funcion'
import AccesoVar from '../expresiones/AccesoVar'
import Aritmeticas from '../expresiones/Aritmeticas'
import Simbolo from '../simbolo/Simbolo'
import Nativo from '../expresiones/Nativo'




export default class Llamada extends Instruccion {
    private id: string
    private parametros: any[]

    constructor(id: string, params: any[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.parametros = params
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let busqueda = arbol.getFuncion(this.id)
        console.log(busqueda)
        if (busqueda == null) {
            return new Errores("SEMANTICO", "Funcion no existente",
                this.linea, this.col)
        }

        if (busqueda instanceof Metodo) {
            console.log("Se interpreatara el metodo enviado")
            let nuevoEntorno = new tablaSimbolo(arbol.getTablaGlobal())
            nuevoEntorno.setNombre("LLAMADA")

            
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

                let resultadoValor = this.parametros[i].valor.interpretar(arbol, tabla);
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

        if(busqueda instanceof Funcion){
            console.log("-----------------------------------------------------------------------------------------------------------")
            console.log("Si se evaluara la funcion enviada")
            //crear nuevo entorno
            let nuevoEntorno = new tablaSimbolo(arbol.getTablaGlobal())
            nuevoEntorno.setNombre("LLAMADA")

            //declarando parametros con valor por defecto (exp, null)
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion(busqueda.parametros[i].tipo,
                    this.linea, this.col, busqueda.parametros[i].id,
                    busqueda.parametros[i].valor,"const");
                let resultadoDeclaracion = declaracionParametro.interpretar(arbol, nuevoEntorno)
                console.log("Esta es el valor de la declaracion :3")
                console.log(resultadoDeclaracion)
                if (resultadoDeclaracion instanceof Errores) return resultadoDeclaracion
            }

            // actualizar valor de los parametros parametros del run
            for (let i = 0; i < this.parametros.length; i++) {
                //verificando existencia del parametro
                let resultado = nuevoEntorno.getVariable(this.parametros[i].id)
                console.log("Este es la variable a actualizar")
                console.log(resultado)
                if (resultado == null) {
                    return new Errores("SEMANTICO", "Parametro no existente",
                        this.linea, this.col)
                }

                // interpretar valor a asignar
                /*
                Esta es la diferencia respecto al RUN
                El run unicamente tiene acceso a el entorno global, por eso
                no hay problema para interpretar el valor del parametro con nuevoEntorno

                Pero la llamada tiene acceso al entorno donde se llamo,
                por eso debemos de interpretar con el entorno llamado tabla
                */
                console.log("Este es el valor que se manda por parametro para asignarlo en la variable y acutalizarlo antes de interpretar")
                console.log(this.parametros[i].valor)
                let resultadoValor = this.parametros[i].valor.interpretar(arbol, tabla);
                console.log("Este es el valor que se manda por parametro para asignarlo en la variable y acutalizarlo")
                console.log(resultadoValor)
                if (resultadoValor instanceof Errores) return resultadoValor

                // Tipo de parametro es igual a tipo nuevo valor?
                if (resultado.getTipo().getTipo() != this.parametros[i].valor.tipoDato.getTipo()) {
                    return new Errores("SEMANTICO", "Tipo de parametro erroneo",
                        this.linea, this.col)
                }

                // asignar nuevo valor
                resultado.setValor(resultadoValor)
            }

            // validamos que ningun parametro tenga valor null
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
            console.log("Este el valor de la funcion que se llama busqueda :3-------------> ")
            console.log(busqueda)
            console.log("Esta es la tabla de simbolos de la funcion actual: ")
            console.log(nuevoEntorno);
            
            let resultadoFuncion: any = busqueda.interpretar(arbol, nuevoEntorno)
            console.log("El resultado de la funcion es ")
            console.log(resultadoFuncion)
            if (resultadoFuncion ===null){
                return new Errores('SEMANTICO', 'Esta funcion no devuleve nada',
                    this.linea, this.col
                )
            }
            if (resultadoFuncion instanceof Errores) return resultadoFuncion
            if(resultadoFuncion!=null){
                console.log("-------------------Esta es el tipo de la llamada---------------------------")
                this.tipoDato.setTipo(resultadoFuncion.tipoDato.getTipo())
                console.log(this.tipoDato.getTipo())
                console.log("Si esta esta reconociendo el return de la funcion")
                console.log(resultadoFuncion)
                if(resultadoFuncion instanceof AccesoVar){
                    console.log("Se devuelve un acceso de variable")
                    resultadoFuncion=resultadoFuncion.interpretar(arbol,nuevoEntorno)
                    console.log("Este es el valor al accesar a la variable en la funcion------> "+resultadoFuncion)
                }
                if(resultadoFuncion instanceof Aritmeticas){
                    console.log("Se devuelve una aritmetica en la funcio y se crea el siguiente simbolo")
                    resultadoFuncion=resultadoFuncion.interpretar(arbol,nuevoEntorno)
                    console.log("Esto es lo que se devulve a de la funcion------> ")
                    console.log(resultadoFuncion)

                }
                if(resultadoFuncion instanceof Nativo){
                    console.log("Se esta enviando un valor nativo en la llamada uwu")
                    return resultadoFuncion
                }
                if(resultadoFuncion instanceof Llamada){
                    console.log("Se esta enviando un valor llamada en la llamada")
                }

                return resultadoFuncion

            }
        }
    }
}

