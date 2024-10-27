import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Casteo extends Instruccion {
    private identificador: string
    private valor: Instruccion | null
    private mutabilidad: string
    private tipoCasteo:Tipo

    constructor(tipo: Tipo,tipoCasteo: Tipo ,linea: number, col: number, id: string, valor: Instruccion,mutabilidad:string) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
        this.mutabilidad=mutabilidad
        this.tipoCasteo=tipoCasteo
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.valor == null){
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,null))) {
                return new Errores('SEMANTICO', 'No se puede declarar la variable',
                    this.linea, this.col
                )
            }
            return;
        }
        let resValor = this.valor.interpretar(arbol, tabla)
        if (resValor instanceof Errores) return resValor

        if(this.valor.tipoDato.getTipo()===tipoDato.ENTERO){
            let tipo=this.tipoCasteo.getTipo()
            let valor_casteado:any=0;
            switch(tipo){
                case tipoDato.ENTERO:
                    valor_casteado=parseInt(this.valor.interpretar(arbol,tabla))
                    console.log("Este es el valor casteado"+valor_casteado);
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                case tipoDato.DECIMAL:
                    valor_casteado=parseFloat(this.valor.interpretar(arbol,tabla)).toFixed(1)
                    console.log("Este es el valor casteado"+valor_casteado);
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                case tipoDato.STRING:
                    valor_casteado=this.valor.interpretar(arbol,tabla).toString()
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                case tipoDato.CHAR:
                    valor_casteado=String.fromCharCode(parseInt(this.valor.interpretar(arbol,tabla)))  
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                default:
                    return new Errores('SEMANTICO', 'No se puede casterar de esa manera',
                        this.linea, this.col
                    )


            }
        }else if(this.valor.tipoDato.getTipo()===tipoDato.DECIMAL){
            let tipo=this.tipoCasteo.getTipo()
            let valor_casteado:any=0;
            switch(tipo){
                case tipoDato.ENTERO:
                    valor_casteado=parseInt(this.valor.interpretar(arbol,tabla))
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                case tipoDato.DECIMAL:
                    valor_casteado=parseFloat(this.valor.interpretar(arbol,tabla)).toFixed(1)
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                case tipoDato.STRING:
                    valor_casteado=this.valor.interpretar(arbol,tabla).toString()
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                default:
                    return new Errores('SEMANTICO', 'No se puede casterar de esa manera',
                        this.linea, this.col
                    )
            }
        }else if(this.valor.tipoDato.getTipo()===tipoDato.CHAR){
            let tipo=this.tipoCasteo.getTipo()
            let valor_casteado:any=0;
            switch(tipo){
                case tipoDato.ENTERO:
                    valor_casteado=parseInt(this.valor.interpretar(arbol,tabla).charCodeAt(0))
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                case tipoDato.DECIMAL:
                    valor_casteado=parseFloat(this.valor.interpretar(arbol,tabla).charCodeAt(0)).toFixed(1)
                    if(this.tipoCasteo.getTipo()!=this.tipoDato.getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador,this.mutabilidad,valor_casteado))) {
                        return new Errores('SEMANTICO', 'No se puede declarar la variable',
                            this.linea, this.col
                        )
                    }
                default:
                    return new Errores('SEMANTICO', 'No se puede casterar de esa manera',
                        this.linea, this.col
                    )
            }
        }else{
            return new Errores('SEMANTICO', 'Este dato no se puede castear',
                this.linea, this.col
            )
        }
    }
}