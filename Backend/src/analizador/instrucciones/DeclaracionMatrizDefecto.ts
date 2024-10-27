import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class DeclaracionMatrizDefecto extends Instruccion {
    private mutabilidad:string
    private identificador: string
    private listaMatriz: any[][]
    

    constructor(tipo: Tipo, linea: number, col: number,mutabilidad:string ,id: string,listaMatriz:any[]) {
        super(tipo, linea, col)
        this.mutabilidad=mutabilidad
        this.identificador = id
        this.listaMatriz=listaMatriz
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        for (let fila of this.listaMatriz) {
            for (let elemento of fila) {
                if (elemento.tipoDato.getTipo()!=this.tipoDato.getTipo()) {
                    return new Errores('SEMANTICO', 'No coicide el tipo de vector de valor',
                        this.linea, this.col
                    )
                }
            }
        }
        console.log(this.listaMatriz)
        if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,this.listaMatriz))) {
            return new Errores('SEMANTICO', 'No se puede declarar la variable',
                this.linea, this.col
            )
        }
    }
}