import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class Return extends Instruccion {
    private expresion:Instruccion
    constructor(expresion: Instruccion,linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.expresion=expresion
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.expresion
    }
}