import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import IfTernario from "./IfTernario";
import Llamada from "./Llamada";


export default class Reverse extends Instruccion {
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
        let newValor=variable.getValor().reverse()
        this.tipoDato = variable.getTipo()
        variable.setValor(newValor)
    }

}