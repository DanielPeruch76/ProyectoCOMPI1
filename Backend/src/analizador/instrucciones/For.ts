import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Break from './Break'
import Continue from './Continue'
import Return from './Return'

export default class For extends Instruccion {
    private asignacion: Instruccion
    private condicion: Instruccion
    private actualizacion: Instruccion
    private instrucciones: Instruccion[]

    constructor(asignacion:Instruccion,cond: Instruccion,actualizacion:Instruccion, ins: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.asignacion=asignacion
        this.condicion=cond
        this.actualizacion=actualizacion
        this.instrucciones = ins
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let nuevaTabla=new tablaSimbolo(tabla)
        let valorAsignacion=this.asignacion.interpretar(arbol,nuevaTabla)
        if (valorAsignacion instanceof Errores) return valorAsignacion

        let condicionFor=this.condicion.interpretar(arbol,nuevaTabla)
        if (condicionFor instanceof Errores) return condicionFor

        if(this.condicion.tipoDato.getTipo()!=tipoDato.BOOL){
            return new Errores('SEMANTICO', 'LA CONDICION DEBE SER BOOL',
                this.linea, this.col)
        }

        while (this.condicion.interpretar(arbol, nuevaTabla)) {
            let tablaFor = new tablaSimbolo(nuevaTabla)
            for(let i of this.instrucciones){
                if(i instanceof Break){
                    return null;
                }
                if(i instanceof Continue){
                    continue;
                }
                if(i instanceof Return){
                    return i;
                }
                let resultados = i.interpretar(arbol, tablaFor)
                if(resultados instanceof Break){
                    return null;
                }
                if(resultados instanceof Continue){
                    continue;
                }
                if(resultados instanceof Return){
                    return resultados
                }
                if (resultados instanceof Errores) {
                    arbol.addErrores(resultados)
                }
            }
            let actualizacionDeVariable=this.actualizacion.interpretar(arbol,nuevaTabla)
            if (actualizacionDeVariable instanceof Errores) return actualizacionDeVariable
        }
    }
}