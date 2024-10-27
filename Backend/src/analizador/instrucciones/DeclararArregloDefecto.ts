import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclararArregloDefecto extends Instruccion {
    private mutabilidad:string
    private identificador: string
    private listaVector: any[]
    

    constructor(tipo: Tipo, linea: number, col: number,mutabilidad:string ,id: string,listaVector:any[]) {
        super(tipo, linea, col)
        this.mutabilidad=mutabilidad
        this.identificador = id
        this.listaVector=listaVector
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        for (let elemento of this.listaVector) {
            if (elemento.tipoDato.getTipo()!=this.tipoDato.getTipo()) {
                return new Errores('SEMANTICO', 'No coicide el tipo de vector de valor',
                    this.linea, this.col
                )
            }    
        }
        console.log(this.listaVector)
        if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,this.listaVector))) {
            return new Errores('SEMANTICO', 'No se puede declarar la variable',
                this.linea, this.col
            )
        }
    }
} 