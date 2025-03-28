import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import ObjetoMatch from "./ObjetoMatch";
import Return from "./Return";
import ReturnDefault from "./ReturnDefault";


export default class MatchDefault extends Instruccion {
    private condicion: Instruccion
    private opciones:ObjetoMatch[]
    private instruccionesDefault: Instruccion[]

    constructor(condicion: Instruccion,opciones:ObjetoMatch[], instruccionesDefault: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion= condicion
        this.opciones=opciones
        this.instruccionesDefault=instruccionesDefault
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond
        let nuevaTabla = new tablaSimbolo(tabla)
        for(let op of this.opciones){
            let opcionComparar=op.getOpcion().interpretar(arbol,nuevaTabla)
            if(cond.toString().toLowerCase()===opcionComparar.toString().toLowerCase()){
                let instruccionesMatch=op.getInstrucciones();
                for(let k of instruccionesMatch){
                    if(k instanceof Break){
                        return null
                    }
                    if(k instanceof Continue){
                        return k
                    }
                    if(k instanceof Return){
                        return k
                    }
                    if(k instanceof ReturnDefault){
                        return k
                    }
                    let resultados = k.interpretar(arbol, nuevaTabla)
                    if(resultados instanceof Break){
                        return null
                    }
                    if(resultados instanceof Continue){
                        return resultados
                    }
                    if(resultados instanceof Return){
                        return resultados
                    }
                    if(resultados instanceof ReturnDefault){
                        return resultados
                    }
                    if (resultados instanceof Errores) {
                        arbol.addErrores(resultados)
                    }
                }
            }
        }

        for(let r of this.instruccionesDefault){
            if(r instanceof Break){
                return null
            }
            if(r instanceof Continue){
                return r
            }
            if(r instanceof Return){
                return r
            }
            if(r instanceof ReturnDefault){
                return r
            }
            let resultados = r.interpretar(arbol, nuevaTabla)
            if(resultados instanceof Break){
                return null
            }
            if(resultados instanceof Continue){
                return resultados
            }
            if(resultados instanceof Return){
                return resultados
            }
            if(resultados instanceof ReturnDefault){
                return resultados
            }
            if (resultados instanceof Errores) {
                arbol.addErrores(resultados)
            }
        }
    }
}