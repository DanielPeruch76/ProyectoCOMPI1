import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";



export default class Relacionales extends Instruccion {
    private cond1: Instruccion
    private cond2: Instruccion
    private relacional: Relacional

    constructor(rel: Relacional, cond1: Instruccion, cond2: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.BOOL), linea, col)
        this.cond1 = cond1
        this.cond2 = cond2
        this.relacional = rel
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let conIzq = this.cond1.interpretar(arbol, tabla)
        if (conIzq instanceof Errores) return conIzq
        let conDer = this.cond2.interpretar(arbol, tabla)
        if (conDer instanceof Errores) return conDer

        switch (this.relacional) {
            case Relacional.IGUALDAD:
                return this.Igualdad(conIzq,conDer)
            case Relacional.DIFERENTE:
                return this.noIgual(conIzq,conDer)
            case Relacional.MAYOR:
                return this.mayor(conIzq,conDer)
            case Relacional.MAYORIGUAL:
                return this.MayorIgual(conIzq,conDer)
            case Relacional.MENOR:
                return this.Menor(conIzq,conDer)
            case Relacional.MENORIGUAL:
                return this.MenorIgual(conIzq,conDer)
            case Relacional.AND:
                return this.And(conIzq,conDer)
            case Relacional.OR:
                return this.Or(conIzq,conDer)
            case Relacional.NOT:
                return this.Not(conIzq)
            default:
                return new Errores('SEMANTICO', 'RELACIONAL INVALIDO',
                    this.linea, this.col)
        }
    }

    menor(comp1: any, comp2: any) {
        let comparando1 = this.cond1.tipoDato.getTipo()
        let comparando2 = this.cond2.tipoDato.getTipo()

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseInt(comp1) < parseFloat(comp2)
                    default:
                        return new Errores('SEMANTICO', 'RELACIONAL INVALIDO',
                            this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) < parseInt(comp2)
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseFloat(comp2)
                    default:
                        return new Errores('SEMANTICO', 'RELACIONAL INVALIDO',
                            this.linea, this.col)
                }
            default:
                return new Errores('SEMANTICO', 'RELACIONAL INVALIDO',
                    this.linea, this.col)
        }
    }

    public Igualdad(condicionIzquierda: any, condicionDerecha: any) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        switch (tipoCondicionIzquierda) {
            case tipoDato.ENTERO:
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return (parseInt(condicionIzquierda) === parseInt(condicionDerecha));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return (parseInt(condicionIzquierda) === parseFloat(condicionDerecha));
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return (parseInt(condicionIzquierda) === parseInt(caracter));
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return (parseFloat(condicionIzquierda) === parseInt(condicionDerecha));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return (parseFloat(condicionIzquierda) === parseFloat(condicionDerecha));
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterChar = condicionDerecha.toString().charAt(0);
                        return (parseFloat(condicionIzquierda) === parseInt(caracterChar));
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            case tipoDato.CHAR:
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzq = condicionIzquierda.toString().charAt(0);
                        return (parseInt(caracterIzq) === parseInt(condicionDerecha));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzqDec = condicionIzquierda.toString().charAt(0);
                        return (parseInt(caracterIzqDec) === parseFloat(condicionDerecha));
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda === caracterDerecha;
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            case tipoDato.STRING:
                switch (tipoCondicionDerecha) {
                    case tipoDato.STRING:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().localeCompare(condicionDerecha.toString()) === 0;
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().toLowerCase() === condicionDerecha.toString().toLowerCase();
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            default:
                return new Errores("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }

    public noIgual(condicionIzquierda: any, condicionDerecha: any) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        
        switch (tipoCondicionIzquierda) {
            case tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) !== parseInt(condicionDerecha);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) !== parseFloat(condicionDerecha);
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) !== parseInt(caracter);
                    }
                    default:
                        return new Errores("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) !== parseInt(condicionDerecha);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) !== parseFloat(condicionDerecha);
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) !== parseInt(caracter);
                    }
                    default:
                        return new Errores("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            }
            case tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) !== parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) !== parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda !== caracterDerecha;
                    }
                    default:
                        return new Errores("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            }
            case tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.STRING: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().toLowerCase() !== condicionDerecha.toString().toLowerCase();
                    }
                    default:
                        return new Errores("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            }
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return (condicionIzquierda as boolean) !== (condicionDerecha as boolean);
                    }
                    default:
                        return new Errores("SEMANTICO", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            }
            default:
                return new Errores("SEMANTICO", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }
    
    public Menor(condicionIzquierda: any, condicionDerecha: any){
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
    
        switch (tipoCondicionIzquierda) {
            case tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) < parseInt(condicionDerecha);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) < parseFloat(condicionDerecha);
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) < parseInt(caracter);
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) < parseInt(condicionDerecha);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) < parseFloat(condicionDerecha);
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) < parseInt(caracter);
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            }
            case tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) < parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) < parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda < caracterDerecha;
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            }
            case tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.STRING: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().length < condicionDerecha.toString().length;
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            }
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        let valor1=condicionIzquierda.toString().toLowerCase();
                        let valor2=condicionDerecha.toString().toLowerCase();
                        let op1=1;
                        let op2=1;
                        if(valor1==='true'){
                            op1=1;
                        }else{
                            op1=0;
                        }
                        if(valor2==="true"){
                            op2=1;
                        }else{
                            op2=0;
                        }
                        return op1<op2;
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            }
            default:
                return new Errores("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }
    
    public mayor(condicionIzquierda: any, condicionDerecha: any){
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
    
        switch (tipoCondicionIzquierda) {
            case tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) > parseInt(condicionDerecha);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) > parseFloat(condicionDerecha);
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) > parseInt(caracter);
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) > parseInt(condicionDerecha);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) > parseFloat(condicionDerecha);
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) > parseInt(caracter);
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                }
            }
            case tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) > parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) > parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzquierda = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda > caracterDerecha;
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                }
            }
            case tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.STRING: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().length > condicionDerecha.toString().length;
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                }
            }
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        let valor1=condicionIzquierda.toString().toLowerCase();
                        let valor2=condicionDerecha.toString().toLowerCase();
                        let op1=1;
                        let op2=1;
                        if(valor1==='true'){
                            op1=1;
                        }else{
                            op1=0;
                        }
                        if(valor2==="true"){
                            op2=1;
                        }else{
                            op2=0;
                        }
                        return op1>op2;
                    }
                    default:
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                }
            }
            default:
                return new Errores("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
        }
    }

    public MayorIgual(condicionIzquierda: any, condicionDerecha: any){
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
    
        switch (tipoCondicionIzquierda) {
            case tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) >= parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) >= parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) >= parseInt(caracter);
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                    }
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) >= parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) >= parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) >= parseInt(caracter);
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                    }
                }
            }
            case tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) >= parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) >= parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzquierda: string = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha: string = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda >= caracterDerecha;
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                    }
                }
            }
            case tipoDato.STRING: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.STRING: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().length >= condicionDerecha.toString().length;
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                    }
                }
            }
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        let valor1=condicionIzquierda.toString().toLowerCase();
                        let valor2=condicionDerecha.toString().toLowerCase();
                        let op1=1;
                        let op2=1;
                        if(valor1==='true'){
                            op1=1;
                        }else{
                            op1=0;
                        }
                        if(valor2==="true"){
                            op2=1;
                        }else{
                            op2=0;
                        }
                        return op1>=op2;
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
            }
        }
    }
    
    
    public MenorIgual(condicionIzquierda: any, condicionDerecha: any) {
        const tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        const tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
    
        switch (tipoCondicionIzquierda) {
            case tipoDato.ENTERO: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) <= parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseInt(condicionIzquierda) <= parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionDerecha.toString().charAt(0);
                        return parseInt(condicionIzquierda) <= parseInt(caracter);
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Int", this.linea, this.col);
                    }
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) <= parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return parseFloat(condicionIzquierda) <= parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionDerecha.toString().charAt(0);
                        return parseFloat(condicionIzquierda) <= parseInt(caracter);
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Double", this.linea, this.col);
                    }
                }
            }
            case tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) <= parseInt(condicionDerecha);
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracter: string = condicionIzquierda.toString().charAt(0);
                        return parseInt(caracter) <= parseFloat(condicionDerecha);
                    }
                    case tipoDato.CHAR: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        const caracterIzquierda: string = condicionIzquierda.toString().charAt(0);
                        const caracterDerecha: string = condicionDerecha.toString().charAt(0);
                        return caracterIzquierda <= caracterDerecha;
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Char", this.linea, this.col);
                    }
                }
            }
            case tipoDato.CHAR: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.STRING: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        return condicionIzquierda.toString().length <= condicionDerecha.toString().length;
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo String", this.linea, this.col);
                    }
                }
            }
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        let valor1=condicionIzquierda.toString().toLowerCase();
                        let valor2=condicionDerecha.toString().toLowerCase();
                        let op1=1;
                        let op2=1;
                        if(valor1==='true'){
                            op1=1;
                        }else{
                            op1=0;
                        }
                        if(valor2==="true"){
                            op2=1;
                        }else{
                            op2=0;
                        }
                        return op1<=op2;
                    }
                    default: {
                        return new Errores("Error Semántico", "Dato Comparado Derecho No Apto Para Comparación con Dato Tipo Boolean", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores("Error Semántico", "Dato Comparado Izquierdo No Apto Para Operación De Comparación", this.linea, this.col);
            }
        }
    }

    public And(condicionIzquierda: any, condicionDerecha: any) {
        let tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        let tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        let envio1=true;
        let envio2=true;
        switch (tipoCondicionIzquierda) {
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        if(condicionIzquierda.toString().toLowerCase()==="true"){
                            envio1=true;
                        }else{
                            envio1=false;
                        }
                        if(condicionDerecha.toString().toLowerCase()==="true"){
                            envio2=true;
                        }else{
                            envio2=false;
                        }
                        return envio1&&envio2;
                    }
                    default: {
                        return new Errores(
                            "Error Semántico",
                            "Dato Comparado Derecho No Apto Para Operación AND",
                            this.linea,
                            this.col
                        );
                    }
                }
            }
            default: {
                return new Errores(
                    "Error Semántico",
                    "Dato Comparado Izquierdo No Apto Para Operación AND",
                    this.linea,
                    this.col
                );
            }
        }
    }

    
    public Or(condicionIzquierda: any, condicionDerecha: any) {
        let tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        let tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        let envio1=true;
        let envio2=true;
        switch (tipoCondicionIzquierda) {
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        if(condicionIzquierda.toString().toLowerCase()==="true"){
                            envio1=true;
                        }else{
                            envio1=false;
                        }
                        if(condicionDerecha.toString().toLowerCase()==="true"){
                            envio2=true;
                        }else{
                            envio2=false;
                        }
                        return envio1||envio2;
                    }
                    default: {
                        return new Errores(
                            "Error Semántico",
                            "Dato Comparado Derecho No Apto Para Operación OR",
                            this.linea,
                            this.col
                        );
                    }
                }
            }
            default: {
                return new Errores(
                    "Error Semántico",
                    "Dato Comparado Izquierdo No Apto Para Operación OR",
                    this.linea,
                    this.col
                );
            }
        }
    }

    
    public Xor(condicionIzquierda: any, condicionDerecha: any) {
        let tipoCondicionIzquierda = this.cond1.tipoDato.getTipo();
        let tipoCondicionDerecha = this.cond2.tipoDato.getTipo();
        let envio1=true;
        let envio2=true;
        switch (tipoCondicionIzquierda) {
            case tipoDato.BOOL: {
                switch (tipoCondicionDerecha) {
                    case tipoDato.BOOL: {
                        this.tipoDato.setTipo(tipoDato.BOOL);
                        if(condicionIzquierda.toString().toLowerCase()==="true"){
                            envio1=true;
                        }else{
                            envio1=false;
                        }
                        if(condicionDerecha.toString().toLowerCase()==="true"){
                            envio2=true;
                        }else{
                            envio2=false;
                        }
                        return envio1&&envio2;
                    }
                    default: {
                        return new Errores(
                            "Error Semántico",
                            "Dato Comparado Derecho No Apto Para Operación XOR",
                            this.linea,
                            this.col
                        );
                    }
                }
            }
            default: {
                return new Errores(
                    "Error Semántico",
                    "Dato Comparado Izquierdo No Apto Para Operación XOR",
                    this.linea,
                    this.col
                );
            }
        }
    }

   
    public Not(condicionUnica: any) {
        let tipoCondicionUnica = this.cond1.tipoDato.getTipo();
        let envio1=true;
        switch (tipoCondicionUnica) {
            case tipoDato.BOOL: {
                this.tipoDato.setTipo(tipoDato.BOOL);
                if(condicionUnica.toString().toLowerCase()==="true"){
                    envio1=true;
                }else{
                    envio1=false;
                }
                return !(envio1);
            }
            default: {
                return new Errores(
                    "Error Semántico",
                    "Dato No Apto Para Operación NOT",
                    this.linea,
                    this.col
                );
            }
        }
    }
}

    
    


export enum Relacional {
    IGUALDAD,
    DIFERENTE,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL,
    AND,
    OR,
    NOT
}