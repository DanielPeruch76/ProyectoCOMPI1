import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclaracionDefecto extends Instruccion {
    private identificadores: string[]
    private mutabilidad: string

    constructor(tipo: Tipo, linea: number, col: number, identificadores: string[],mutabilidad:string) {
        super(tipo, linea, col)
        this.identificadores= identificadores
        this.mutabilidad=mutabilidad
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        for(let i of this.identificadores){
            if (!tabla.setVariable(new Simbolo(this.tipoDato,i,this.mutabilidad,null))) {
                return new Errores('SEMANTICO', 'No se puede declarar la variable',
                    this.linea, this.col
                )
            }
        }
    }
}