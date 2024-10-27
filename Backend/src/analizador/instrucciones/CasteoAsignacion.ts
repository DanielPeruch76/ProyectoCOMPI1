import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";


export default class CasteoAsignacion extends Instruccion {
    private id: string
    private exp: Instruccion
    private tipoCasteo: Tipo

    constructor(id: string,tipoCasteo:Tipo,exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
        this.tipoCasteo=tipoCasteo
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let variable = tabla.getVariable(this.id.toLowerCase())
        if (variable == null) {
            return new Errores('SEMANTICO', 'La variable no existe',
                this.linea, this.col)
        }

        let newValor = this.exp.interpretar(arbol, tabla)
        if (newValor instanceof Errores) return newValor

        if(this.exp.tipoDato.getTipo()===tipoDato.ENTERO){
            let tipo=this.tipoCasteo.getTipo()
            let valor_casteado:any=0;
            switch(tipo){
                case tipoDato.ENTERO:
                    valor_casteado=parseInt(this.exp.interpretar(arbol,tabla))
                    console.log("Este es el exp casteado"+valor_casteado);
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
                case tipoDato.DECIMAL:
                    valor_casteado=parseFloat(this.exp.interpretar(arbol,tabla)).toFixed(1)
                    console.log("Este es el exp casteado"+valor_casteado);
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
                case tipoDato.STRING:
                    valor_casteado=this.exp.interpretar(arbol,tabla).toString()
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
                case tipoDato.CHAR:
                    valor_casteado=String.fromCharCode(parseInt(this.exp.interpretar(arbol,tabla)))  
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
                default:
                    return new Errores('SEMANTICO', 'No se puede casterar de esa manera',
                        this.linea, this.col
                    )


            }
        }else if(this.exp.tipoDato.getTipo()===tipoDato.DECIMAL){
            let tipo=this.tipoCasteo.getTipo()
            let valor_casteado:any=0;
            switch(tipo){
                case tipoDato.ENTERO:
                    let valor_casteado_int: number=Math.floor(parseInt(this.exp.interpretar(arbol,tabla)))
                    console.log("este es unn valor double convertido a int"+valor_casteado_int)
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado_int)
                case tipoDato.DECIMAL:
                    valor_casteado=parseFloat(this.exp.interpretar(arbol,tabla)).toFixed(1)
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
                case tipoDato.STRING:
                    valor_casteado=this.exp.interpretar(arbol,tabla).toString()
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
                default:
                    return new Errores('SEMANTICO', 'No se puede casterar de esa manera',
                        this.linea, this.col
                    )
            }
        }else if(this.exp.tipoDato.getTipo()===tipoDato.CHAR){
            let tipo=this.tipoCasteo.getTipo()
            let valor_casteado:any=0;
            switch(tipo){
                case tipoDato.ENTERO:
                    valor_casteado=parseFloat(this.exp.interpretar(arbol,tabla).charCodeAt(0)).toFixed(0)
                    console.log("valor casteado"+valor_casteado)
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    console.log(Math.floor(parseInt(valor_casteado)))
                    variable.setValor(Math.floor(parseInt(valor_casteado)))
                case tipoDato.DECIMAL:
                    valor_casteado=parseFloat(this.exp.interpretar(arbol,tabla).charCodeAt(0)).toFixed(1)
                    if(this.tipoCasteo.getTipo()!=variable.getTipo().getTipo()){
                        return new Errores('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable',
                            this.linea, this.col
                        )
                    }
                    if(variable.getMutabilidad().toLowerCase()==="const"){
                        return new Errores("Error Semántico", "No Se Puede Modificar Una Variable Const", this.linea, this.col);
                    }
                    this.tipoDato = variable.getTipo()
                    variable.setValor(valor_casteado)
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