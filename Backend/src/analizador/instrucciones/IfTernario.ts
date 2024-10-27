import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Aritmeticas from "../expresiones/Aritmeticas";
import Nativo from "../expresiones/Nativo";
import Relacionales from "../expresiones/Relacionales";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import Llamada from "./Llamada";
import Return from "./Return";


export default class IfTernario extends Instruccion {
    private condicion: Instruccion
    private instruccionTrue: Instruccion
    private instruccionFalse: Instruccion

    constructor(cond: Instruccion, instruccionTrue: Instruccion,instruccionFalse: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instruccionTrue=instruccionTrue
        this.instruccionFalse=instruccionFalse
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
            console.log("se entro a  la condicion del if ternaria")
            console.log(this.instruccionTrue.interpretar(arbol, tabla))
            let resultado=this.instruccionTrue.interpretar(arbol, tabla)
            console.log(resultado)
            if(this.instruccionTrue instanceof Llamada){
                return this.instruccionTrue.interpretar(arbol, tabla)
            }
            if(this.instruccionTrue instanceof Aritmeticas){ 
                resultado= new Nativo(this.instruccionTrue.tipoDato,this.instruccionTrue.interpretar(arbol,tabla),this.linea,this.col)
                console.log("Este es el valor nativo que se creo en el if ternario artimeitca")
                console.log(resultado)
            }
            if(this.instruccionTrue instanceof Relacionales){
                resultado= new Nativo(this.instruccionTrue.tipoDato,this.instruccionTrue.interpretar(arbol,tabla),this.linea,this.col)
                console.log("Este es el valor nativo que se creo en el if ternario")
                console.log(resultado) 
            }
            console.log("------------------se envia este resultado en el teranrio--------------------------")
            console.log(resultado)
            return resultado
        }else{
            let resultado=this.instruccionFalse.interpretar(arbol, tabla)
            console.log(resultado)
            if(this.instruccionFalse instanceof Llamada){
                return this.instruccionFalse.interpretar(arbol, tabla)
            }
            if(this.instruccionFalse instanceof Aritmeticas){
                return new Nativo(this.instruccionFalse.tipoDato,this.instruccionFalse.interpretar(arbol,tabla),this.linea,this.col)
            }
            if(this.instruccionFalse instanceof Relacionales){
                return new Nativo(this.instruccionFalse.tipoDato,this.instruccionFalse.interpretar(arbol,tabla),this.linea,this.col)
            }
            console.log("------------------se envia este resultado en el teranrio--------------------------")
            console.log(resultado)
            return resultado
        }
    }
}