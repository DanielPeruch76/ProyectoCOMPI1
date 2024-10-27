import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";

export default class ObjetoMatch{
    private opcion: Instruccion
    private instrucciones: Instruccion[]

    constructor(opcion: Instruccion, ins: Instruccion[]) {
        this.opcion = opcion
        this.instrucciones = ins
    }

   public getOpcion():Instruccion{
    return this.opcion
   }
   public setOpcion(opcion:Instruccion){
    this.opcion=opcion
   }

   public getInstrucciones():Instruccion[]{
    return this.instrucciones
   }
   public setInstrucciones(instrucciones:Instruccion[]){
    this.instrucciones=instrucciones
   }
}