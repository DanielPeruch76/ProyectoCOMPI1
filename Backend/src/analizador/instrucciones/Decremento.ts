import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class Decremento extends Instruccion {
    private id: string

    constructor(id: string,linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let variable = tabla.getVariable(this.id.toLowerCase())
        if (variable == null) {
            return new Errores('SEMANTICO', 'La variable no existe',
                this.linea, this.col)
        }

        if(variable.getTipo().getTipo()!=tipoDato.ENTERO&&variable.getTipo().getTipo()!=tipoDato.DECIMAL){
            return new Errores('SEMANTICO', 'Tipos de datos no aptos para incremento',
                this.linea, this.col)
        }
        if(variable.getMutabilidad().toLowerCase()==="const"){
            return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
        }
        let nuevo:any=0;
        if(variable.getTipo().getTipo()===tipoDato.ENTERO){
            nuevo=parseInt(variable.getValor())-1;
            console.log("La nueva variable es: "+ nuevo )
        }
        if(variable.getTipo().getTipo()===tipoDato.DECIMAL){
            nuevo=parseFloat(variable.getValor())-1
            console.log("La nueva variable es: "+ nuevo )
        }
        variable.setValor(nuevo)
    }
}