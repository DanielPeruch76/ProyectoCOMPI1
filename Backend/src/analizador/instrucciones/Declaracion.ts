import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Aritmeticas from "../expresiones/Aritmeticas";
import Nativo from "../expresiones/Nativo";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador: string
    private valor: Instruccion | null
    private mutabilidad: string

    constructor(tipo: Tipo, linea: number, col: number, id: string, valor: Instruccion,mutabilidad:string) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.mutabilidad=mutabilidad
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        console.log("---------------------------Valor a Declarar --------------------------------------------")
        console.log("El valor a declarar en la variable es:  ")
        console.log(this.valor)

        if(this.valor == null){
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,null))) {
                return new Errores('SEMANTICO', 'No se puede declarar la variable',
                    this.linea, this.col
                )

            }
            return;
        }

        let resValor = this.valor.interpretar(arbol, tabla)
        if(resValor instanceof Aritmeticas){
            resValor=resValor.interpretar(arbol,tabla)
        }

        console.log("El valor a asignar despues de interpretar es este. ")
        console.log(resValor)
        console.log(resValor.tipoDato)
        console.log("\n\n")
        if (resValor instanceof Errores) return resValor

          
        if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
            return new Errores('SEMANTICO', 'El tipo y el valor de la variable no coinciden',
                this.linea, this.col
            )
        }
        if(resValor instanceof Nativo){
            resValor=resValor.interpretar(arbol,tabla)
        }
        if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,resValor))) {
            return new Errores('SEMANTICO', 'No se puede declarar la variable',
                this.linea, this.col
            )
        }
    }
}