import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class AccesoMatriz extends Instruccion {
    private id: string
    private fila:Instruccion;
    private columna:Instruccion;

    constructor(id: string,fila: Instruccion, columna:Instruccion,linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.fila=fila
        this.columna=columna
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let vector = tabla.getVariable(this.id)
        if (vector == null) {
            return new Errores('SEMANTICO', 'No existe un vector con ese nombre',
                this.linea, this.col)
        }
        let fila=this.fila.interpretar(arbol,tabla)
        if (fila instanceof Errores) return fila
        if(this.fila.tipoDato.getTipo()!=tipoDato.ENTERO){
            return new Errores('SEMANTICO', 'Indice del vector no válido',
                this.linea, this.col)
        }
        let columna=this.columna.interpretar(arbol,tabla)
        if (columna instanceof Errores) return columna
        if(this.columna.tipoDato.getTipo()!=tipoDato.ENTERO){
            return new Errores('SEMANTICO', 'Indice del vector no válido',
                this.linea, this.col)
        }
        this.tipoDato = vector.getTipo()
        return vector.getValor()[parseInt(fila)][parseInt(columna)]
    }
    
} 