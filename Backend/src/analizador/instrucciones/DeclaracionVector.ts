import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclaracionVector extends Instruccion {
    private mutabilidad:string
    private identificador: string
    private tipoVector:Tipo
    private tamanioArreglo: Instruccion | null
    

    constructor(tipo: Tipo, linea: number, col: number,mutabilidad:string ,id: string,tipoVector:Tipo,valor: Instruccion) {
        super(tipo, linea, col)
        this.mutabilidad=mutabilidad
        this.identificador = id
        this.tipoVector=tipoVector
        this.tamanioArreglo= valor
        
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.tamanioArreglo == null){
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,null))) {
                return new Errores('SEMANTICO', 'No se puede declarar la variable',
                    this.linea, this.col
                )
            }
            return;
        }

        let tamanio = this.tamanioArreglo.interpretar(arbol, tabla)
        if (tamanio instanceof Errores) return tamanio

          
        if (this.tamanioArreglo.tipoDato.getTipo() != tipoDato.ENTERO) {
            return new Errores('SEMANTICO', 'No se asigno un valor correcto para el tamaño de el vector',
                this.linea, this.col
            )
        }
        if (this.tipoDato.getTipo()!=this.tipoVector.getTipo()) {
            return new Errores('SEMANTICO', 'No coicide el tipo de vector con el tipo de variable',
                this.linea, this.col
            )
        }
        let vector_guardar:(null|any)[]=new Array(tamanio)
        if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,vector_guardar))) {
            return new Errores('SEMANTICO', 'No se puede declarar la variable',
                this.linea, this.col
            )
        }
    }
}