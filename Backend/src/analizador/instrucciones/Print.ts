import { Instruccion } from "../abstracto/Instruccion";
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Errores from '../excepciones/Errores'
import Llamada from "./Llamada";
import Nativo from "../expresiones/Nativo";



export default class Print extends Instruccion {
    private expresion: Instruccion

    constructor(exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.expresion = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("La expresion que mandaron a imprimir es esto ")
        if(this.expresion instanceof Llamada){
            console.log("Una llamada se quiere asignar")
            let valorLlamada=this.expresion.interpretar(arbol,tabla)
            let valorImprimir=valorLlamada.interpretar(arbol,tabla)
            arbol.Print(valorImprimir)
            return
        }
        console.log(this.expresion)
        let valor = this.expresion.interpretar(arbol, tabla)
        console.log("-----------El valor que se obtuvo al interpretar en IMPRIMIR--------------------------------")
        console.log(valor)
        //esto podria dar un error, cualquier cosa borrar esto
        if(valor instanceof Nativo){
            valor=valor.interpretar(arbol,tabla)
        }
        if (valor instanceof Errores) return valor
        arbol.Print(valor)
    }
}