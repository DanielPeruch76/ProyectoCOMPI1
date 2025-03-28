import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";
import ReturnDefault from "./ReturnDefault";

export default class If extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]

    constructor(cond: Instruccion, ins: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores('SEMANTICO', 'LA CONDICION DEBE SER BOOL',
                this.linea, this.col)
        }

        let nuevaTabla = new tablaSimbolo(tabla)
        if (cond) {
            for (let i of this.instrucciones) {
                if(i instanceof Break){
                    return i
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
                    return resultados
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
}