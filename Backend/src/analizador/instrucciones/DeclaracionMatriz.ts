import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclaracionMatriz extends Instruccion {
    private mutabilidad:string
    private identificador: string
    private tipoVector:Tipo
    private tamanioFila: Instruccion | null
    private tamanioColumna: Instruccion | null
    

    constructor(tipo: Tipo, linea: number, col: number,mutabilidad:string ,id: string,tipoVector:Tipo,tamanioFila: Instruccion,tamanioColumna: Instruccion) {
        super(tipo, linea, col)
        this.mutabilidad=mutabilidad
        this.identificador = id
        this.tipoVector=tipoVector
        this.tamanioFila= tamanioFila
        this.tamanioColumna=tamanioColumna
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.tamanioFila == null){
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,null))) {
                return new Errores('SEMANTICO', 'No hay valor de fila',
                    this.linea, this.col
                )
            }
            return;
        }
        if(this.tamanioColumna == null){
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,null))) {
                return new Errores('SEMANTICO', 'No hay valor de columna',
                    this.linea, this.col
                )
            }
            return;
        }

        let tamanioFila = this.tamanioFila.interpretar(arbol, tabla)
        if (tamanioFila instanceof Errores) return tamanioFila

          
        if (this.tamanioFila.tipoDato.getTipo() != tipoDato.ENTERO) {
            return new Errores('SEMANTICO', 'No se asigno un valor correcto para el tamaño de el vector',
                this.linea, this.col
            )
        }

        let tamanioColumna = this.tamanioColumna.interpretar(arbol, tabla)
        if (tamanioColumna instanceof Errores) return tamanioColumna

          
        if (this.tamanioColumna.tipoDato.getTipo() != tipoDato.ENTERO) {
            return new Errores('SEMANTICO', 'No se asigno un valor correcto para el tamaño de el vector',
                this.linea, this.col
            )
        }

        if (this.tipoDato.getTipo()!=this.tipoVector.getTipo()) {
            return new Errores('SEMANTICO', 'No coicide el tipo de vector con el tipo de variable',
                this.linea, this.col
            )
        }

        let vector_guardar: (null | any)[][] = Array.from(
            { length: tamanioFila },
            () => new Array(tamanioColumna).fill(null)
        );

        if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,vector_guardar))) {
            return new Errores('SEMANTICO', 'No se puede declarar la variable',
                this.linea, this.col
            )
        }
    }
}