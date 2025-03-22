import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Nativo from "../expresiones/Nativo";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class CharArray extends Instruccion {
    private cadena: Instruccion
    constructor(cadena: Instruccion,linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.cadena=cadena
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.cadena.interpretar(arbol,tabla)
        if (valor instanceof Errores) return valor
        if (valor == null) {
            return new Errores('SEMANTICO', 'Valor nulo',
                this.linea, this.col)
        }
        valor=valor.split('');
        this.tipoDato=new Tipo(tipoDato.CHAR)
        return new Nativo(new Tipo(tipoDato.CHAR),valor,this.linea,this.col)
    }
}