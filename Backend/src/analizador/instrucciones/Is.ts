import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Nativo from "../expresiones/Nativo";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class Is extends Instruccion {
    private cadena: Instruccion
    private tipo: Tipo
    constructor(cadena: Instruccion,tipo:Tipo,linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.cadena=cadena
        this.tipo=tipo
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.cadena.interpretar(arbol,tabla)
        if (valor instanceof Errores) return valor
        if (valor == null) {
            return new Errores('SEMANTICO', 'Valor nulo',
                this.linea, this.col)
        }
        if(this.cadena.tipoDato.getTipo()===this.tipo.getTipo()){
            this.tipoDato=new Tipo(tipoDato.BOOL)
            return new Nativo(new Tipo(tipoDato.BOOL),true,this.linea,this.col)
        }
        this.tipoDato=new Tipo(tipoDato.BOOL)
        return new Nativo(new Tipo(tipoDato.BOOL),false,this.linea,this.col)   
    }
}