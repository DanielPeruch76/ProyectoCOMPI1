import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Llamada from "./Llamada";


export default class AsignacionVector extends Instruccion {
    private id: string
    private posicion:Instruccion
    private exp: Instruccion

    constructor(id: string,posicion:Instruccion, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.posicion=posicion
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let variable = tabla.getVariable(this.id.toLowerCase())
        console.log("----------------Esta es una asignacion al vector--------------")
        console.log(variable)
        if (variable == null) {
            return new Errores('SEMANTICO', 'La variable no existe',
                this.linea, this.col)
        }

        console.log("--------------------nuevo valor a asignar :3--------------------------");
        
        let newValor = this.exp.interpretar(arbol, tabla)
        if(this.exp instanceof Llamada){
            newValor=newValor.interpretar(arbol, tabla)
        }
        console.log("--------------------Este es el nuevo valor asignar :3--------------------------");
        console.log(newValor)

        if (newValor instanceof Errores) return newValor

        if (this.exp.tipoDato.getTipo() != variable.getTipo().getTipo()) {
            return new Errores('SEMANTICO', 'Los tipos deben de ser iguales',
                this.linea, this.col)
        }
        if(variable.getMutabilidad().toLowerCase()==="const"){
            return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
        }
        this.tipoDato = variable.getTipo()


        let posicion=this.posicion.interpretar(arbol,tabla)
        if (posicion instanceof Errores) return posicion
        if(this.posicion.tipoDato.getTipo()!=tipoDato.ENTERO){
            return new Errores('SEMANTICO', 'Indice del vector no válido',
                this.linea, this.col)
        }
        console.log("Este es el valor del vector en la posicion antes")
        console.log(variable.getValor()[parseInt(posicion)])
        variable.getValor()[parseInt(posicion)]=newValor
        console.log("Este es el valor del vector en la posicion despues")
        console.log(variable.getValor()[parseInt(posicion)])
    }

}