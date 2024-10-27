import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import IfTernario from "./IfTernario";
import Llamada from "./Llamada";


export default class AsignacionVar extends Instruccion {
    private id: string
    private exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let variable = tabla.getVariable(this.id.toLowerCase())
        if (variable == null) {
            return new Errores('SEMANTICO', 'La variable no existe',
                this.linea, this.col)
        }

        console.log("--------------------nuevo valor a asignar :3--------------------------\n");
        console.log(this.exp)
        let newValor = this.exp.interpretar(arbol, tabla)
        if(this.exp instanceof IfTernario){
            this.exp.tipoDato=newValor.tipoDato
        }
        if(this.exp instanceof Llamada){
            newValor=newValor.interpretar(arbol, tabla)
        }
        console.log("--------------------Este es el nuevo valor asignar :3--------------------------");
        console.log(newValor)

        if (newValor instanceof Errores) return newValor

        if (this.exp.tipoDato.getTipo() != variable.getTipo().getTipo()) {
            console.log("\n++++++++++++++++++++Hubo un error de tipos en la asignacion++++++++++++++++++++++++++++++++++++++++++++++++++++++\n")
            return new Errores('SEMANTICO', 'Los tipos deben de ser iguales',
                this.linea, this.col)
        }
        if(variable.getMutabilidad().toLowerCase()==="const"){
            return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
        }
        this.tipoDato = variable.getTipo()
        variable.setValor(newValor)
    }

}