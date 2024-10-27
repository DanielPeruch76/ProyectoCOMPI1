import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Aritmeticas from '../expresiones/Aritmeticas'
import Nativo from '../expresiones/Nativo'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Llamada from './Llamada'
import Return from './Return'



export default class Funcion extends Instruccion {
    public id: string
    public parametros: any[]
    public instrucciones: Instruccion[]
    public tipoRetorno: Tipo

    constructor(tipo: Tipo, id: string, params: any[], ins: Instruccion[],tipoRetorno:Tipo,linea: number, col: number) {
        super(tipo, linea, col)
        this.id = id
        this.parametros = params
        this.instrucciones = ins
        this.tipoRetorno=tipoRetorno
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        for (let i of this.instrucciones) {
            if(i instanceof Return){
                console.log("------------------------Primer Bloque-------------------------\n")
                console.log(i);
                console.log("--------------------------------------------------------------\n")
                let resultadoDevolver=i.interpretar(arbol,tabla)
                console.log("El tipo de expresion a devolver antes de interpretar es:")
                console.log(resultadoDevolver)
                console.log(resultadoDevolver.tipoDato);
                if(resultadoDevolver instanceof Aritmeticas){
                    resultadoDevolver.interpretar(arbol,tabla)
                    console.log("\tEntro en la clase funcion a crear un valor nativo\n")
                    resultadoDevolver=new Nativo(resultadoDevolver.tipoDato,resultadoDevolver.interpretar(arbol,tabla),resultadoDevolver.linea,resultadoDevolver.col)
                } 
                if(resultadoDevolver instanceof Llamada){
                    console.log("\tSe esta interpretando el valor de la llamada en la clase funcion\n")
                    resultadoDevolver=resultadoDevolver.interpretar(arbol,tabla)
                }
                console.log("La expresion a devolver despues de interpretar es:")
                console.log(resultadoDevolver)
                console.log(resultadoDevolver.tipoDato);
                console.log(this.tipoRetorno);
                if (resultadoDevolver.tipoDato.getTipo()===this.tipoRetorno.getTipo()){
                    console.log("Si devuleve algo UwU")
                    console.log(resultadoDevolver)
                    return resultadoDevolver
                }
                return new Errores('SEMANTICO', 'La expresión que se desea devolver no es del mismo tipo que la función que tiene que devolver',
                    this.linea, this.col
                )
            }
            let resultado = i.interpretar(arbol, tabla)
            if(resultado instanceof Return){
                console.log("------------------------Segundo Bloque-------------------------\n")
                console.log(resultado);
                console.log("---------------------------------------------------------------\n")
                let resultadoDevolver=resultado.interpretar(arbol,tabla)
                console.log("El tipo de expresion a devolver antes de interpretar es:")
                console.log(resultadoDevolver)
                console.log(resultadoDevolver.tipoDato);
                if(resultadoDevolver instanceof Aritmeticas){
                    resultadoDevolver.interpretar(arbol,tabla)
                    console.log("\tEntro en la clase funcion a crear un valor nativo\n")
                    resultadoDevolver=new Nativo(resultadoDevolver.tipoDato,resultadoDevolver.interpretar(arbol,tabla),resultadoDevolver.linea,resultadoDevolver.col)
                } 
                if(resultadoDevolver instanceof Llamada){
                    console.log("\tSe esta interpretando el valor de la llamada en la clase funcion\n")
                    resultadoDevolver=resultadoDevolver.interpretar(arbol,tabla)
                }
                console.log("La expresion a devolver despues de interpretar es:")
                console.log(resultadoDevolver)
                console.log(resultadoDevolver.tipoDato);
                console.log(this.tipoRetorno);
                if (resultadoDevolver.tipoDato.getTipo()===this.tipoRetorno.getTipo()){
                    console.log("Si devuleve algo UwU")
                    console.log(resultadoDevolver)
                    return resultadoDevolver
                }
                return new Errores('SEMANTICO', 'La expresión que se desea devolver no es del mismo tipo que la función que tiene que devolver',
                    this.linea, this.col
                )
            }
            if (resultado instanceof Errores) arbol.addErrores(resultado)
        }
        return null
    }
}