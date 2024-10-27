import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import { NodoAst } from "../simbolo/NodoAst";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class AccesoVar extends Instruccion {
    private id: string

    constructor(id: string, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = tabla.getVariable(this.id)

        if (valor == null) {
            return new Errores('SEMANTICO', 'Acceso a variable no existente',
                this.linea, this.col)
        }

        this.tipoDato = valor.getTipo()
        console.log("este es el valor a devolver despues de acceder a una variable")
        console.log(valor.getValor())
        return valor.getValor()
    }
}