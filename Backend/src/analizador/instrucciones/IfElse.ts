import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import Return from "./Return";


export default class IfElse extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]
    private instruccionesElse: Instruccion[]

    constructor(cond: Instruccion, ins: Instruccion[],insElse: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
        this.instruccionesElse=insElse
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores('SEMANTICO', 'LA CONDICION DEBE SER BOOL',
                this.linea, this.col)
        }

        let nuevaTabla = new tablaSimbolo(tabla)
        if (cond) {
            console.log("se entro a  la condicion del if")
            for (let i of this.instrucciones) {
                if(i instanceof Break){
                    return i
                }
                if(i instanceof Continue){
                    return i
                }
                if(i instanceof Return){
                    return i
                }
                let resultados = i.interpretar(arbol, nuevaTabla)
                if(resultados instanceof Break){
                    return resultados
                }
                if(resultados instanceof Continue){
                    return resultados
                }
                if(resultados instanceof Return){
                    return resultados
                }
                if (resultados instanceof Errores) {
                    arbol.addErrores(resultados)
                }
            }
        }else{
            console.log("Se entro al else")
            for (let i of this.instruccionesElse) {
                if(i instanceof Break){
                    return i
                }
                if(i instanceof Continue){
                    return i
                }
                if(i instanceof Return){
                    return i
                }
                let resultados = i.interpretar(arbol, nuevaTabla)
                if(resultados instanceof Break){
                    return resultados
                }
                if(resultados instanceof Continue){
                    return resultados
                }
                if(resultados instanceof Return){
                    return resultados
                }
                if (resultados instanceof Errores) {
                    arbol.addErrores(resultados)
                }
            }
        }
    }
}