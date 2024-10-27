import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Llamada from "./Llamada";


export default class AsignacionMatriz extends Instruccion {
    private id: string
    private fila:Instruccion
    private columna:Instruccion
    private exp: Instruccion

    constructor(id: string,fila:Instruccion,columna:Instruccion, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.fila=fila
        this.columna=columna
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let variable = tabla.getVariable(this.id.toLowerCase())
        if (variable == null) {
            return new Errores('SEMANTICO', 'La variable no existe',
                this.linea, this.col)
        }

        console.log("--------------------nuevo valor a asignar :3--------------------------");
        console.log("Este es el valor de la expresion a asignar")
        console.log(this.exp)
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
        console.log("Este es el valor de la fila")
        console.log(this.fila)
        let fila=this.fila.interpretar(arbol,tabla)
        if (fila instanceof Errores) return fila
        if(this.fila.tipoDato.getTipo()!=tipoDato.ENTERO){
            return new Errores('SEMANTICO', 'Indice del vector no válido',
                this.linea, this.col)
        }
        console.log("Este es el valor de la columna")
        console.log(this.columna)
        let columna=this.columna.interpretar(arbol,tabla)
        if (columna instanceof Errores) return columna
        if(this.columna.tipoDato.getTipo()!=tipoDato.ENTERO){
            return new Errores('SEMANTICO', 'Indice del vector no válido',
                this.linea, this.col)
        }
        console.log(fila)
        console.log(columna)
        variable.getValor()[parseInt(fila)][parseInt(columna)]=newValor
        console.log(variable.getValor())
    }

}