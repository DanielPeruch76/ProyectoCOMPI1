import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
import ReturnDefault from "./ReturnDefault";


export default class Default extends Instruccion {
    private instrucciones: Instruccion[]

    constructor(ins: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.instrucciones = ins
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let nuevaTabla = new tablaSimbolo(tabla)
        for (let i of this.instrucciones) {
            if(i instanceof Break){
                return null
            }
            if(i instanceof Continue){
                return i
            }
            if(i instanceof Return){
                return i
            }
            if(i instanceof ReturnDefault){
                return i
            }
            let resultados = i.interpretar(arbol, nuevaTabla)
            if(resultados instanceof Break){
                return null
            }
            if(resultados instanceof Continue){
                return resultados
            }
            if(resultados instanceof Return){
                return resultados
            }
            if(resultados instanceof ReturnDefault){
                return resultados
            }
            if (resultados instanceof Errores) {
                arbol.addErrores(resultados)
            }
        }    
    }
}