import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class AccesoVector extends Instruccion {
    private id: string
    private posicion:Instruccion;
 
    constructor(id: string,posicion: Instruccion,linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.posicion=posicion
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("----------------------------------Acceso a vector--------------------------------------")
        let vector = tabla.getVariable(this.id)
        if (vector == null) {
            return new Errores('SEMANTICO', 'No existe un vector con ese nombre',
                this.linea, this.col)
        }
        let posicion=this.posicion.interpretar(arbol,tabla)
        if(this.posicion.tipoDato.getTipo()!=tipoDato.ENTERO){
            return new Errores('SEMANTICO', 'Indice del vector no válido',
                this.linea, this.col)
        }

        this.tipoDato = vector.getTipo()
        console.log("Este es el valor en el vector")
        console.log(vector.getValor()[parseInt(posicion)])
        if(vector.getValor()[parseInt(posicion)]===null){
            console.log("El valor que se encontro es erroneo")
            return new Errores('SEMANTICO', 'El valor es nulo',
                this.linea, this.col)
        }

        return vector.getValor()[parseInt(posicion)]
    }
}