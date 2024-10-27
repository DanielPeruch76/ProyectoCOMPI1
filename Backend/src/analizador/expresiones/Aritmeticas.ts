import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import AccesoMatriz from "../instrucciones/AccesoMatriz";
import AccesoVector from "../instrucciones/AccesoVector";
import Llamada from "../instrucciones/Llamada";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Nativo from "./Nativo";


export default class Aritmeticas extends Instruccion {
    private operando1: Instruccion
    private operando2: Instruccion
    private operacion: Operadores

    constructor(operacion: Operadores, linea: number, col: number, op1: Instruccion, op2: Instruccion) {
        super(new Tipo(tipoDato.ENTERO), linea, col)
        this.operacion = operacion
        this.operando1 = op1
        this.operando2 = op2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let opIzq, opDer = null
        opIzq = this.operando1.interpretar(arbol, tabla)
        console.log("Esto es el valor izquierdo+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(opIzq)
        if(opIzq instanceof Llamada){
            opIzq=opIzq.interpretar(arbol,tabla)
            console.log("___________________El valor que tiene la llamada es_______________________ ")
            console.log(opIzq)
        }
        if(opIzq instanceof AccesoMatriz){
            opIzq=opIzq.interpretar(arbol,tabla)
            console.log("Es un acceso Matriz convirtio el opizq en:")
            console.log(opIzq)
        }
        if(opIzq instanceof AccesoVector){
            opIzq=opIzq.interpretar(arbol,tabla)
            console.log("Es un acceso Matriz convirtio el opizq en:")
            console.log(opIzq)
        }
        if(opIzq instanceof Nativo){
            opIzq=opIzq.interpretar(arbol,tabla)
            console.log("Se convirtio el opizq en:")
            console.log(opIzq)
        }
        if(opIzq instanceof Aritmeticas){
            opIzq=opIzq.interpretar(arbol,tabla)
            if (opIzq instanceof Errores) return opIzq
            console.log("Se convirtio el opizq en:")
            console.log(opIzq)
        }
        if (opIzq instanceof Errores) return opIzq
        opDer = this.operando2.interpretar(arbol, tabla)
        console.log("Esto es el valor derecho***************************************")
        console.log(opDer)
        if(opDer instanceof Llamada){
            opDer=opDer.interpretar(arbol,tabla)
            console.log("___________________________El valor que tiene la llamada es___________________")
            console.log(opDer)
        }
        if(opDer instanceof AccesoMatriz){
            opDer=opDer.interpretar(arbol,tabla)
            console.log("Es un acceso Matriz convirtio el opder en:")
            console.log(opDer)
        }
        if(opDer instanceof AccesoVector){ 
            opDer=opDer.interpretar(arbol,tabla)
            console.log("Es un acceso Matriz convirtio el opizq en:")
            console.log(opDer) 
        } 
        if(opDer instanceof Nativo){
            opDer=opDer.interpretar(arbol,tabla)
            console.log("Se convirtio el opizq en:")
            console.log(opDer)
        }
        if(opDer instanceof Aritmeticas){
            opDer=opDer.interpretar(arbol,tabla)
            if (opDer instanceof Errores) return opDer
            console.log("Se convirtio el opider en:")
            console.log(opDer)
            
        }
        if (opDer instanceof Errores) return opDer

        switch(this.operacion){
            case Operadores.SUMA:
                return this.suma(opIzq, opDer)
            case Operadores.RESTA:
                return this.resta(opIzq,opDer)
            case Operadores.MULTIPLICACION:
                return this.multiplicacion(opIzq,opDer)
            case Operadores.DIVISION:
                return this.division(opIzq,opDer)
            case Operadores.POTENCIA:
                return this.potencia(opIzq,opDer)
            case Operadores.RAIZ:
                return this.raiz(opIzq,opDer)
            case Operadores.MODULO:
                return this.modulo(opIzq,opDer)
            case Operadores.UNARIA:
                return this.negacion(opIzq)
            default:
                return new Errores("SEMANTICO", "Aritmeticas Erroneas", this.linea, this.col)
        }

    }



    suma(op1: any, op2: any): any {
        let tipo1 = this.operando1.tipoDato.getTipo();
        console.log("-----------------El tipo del operarando izquierdo es----------------------------------")
        console.log(tipo1)
        console.log(op1)
        let tipo2 = this.operando2.tipoDato.getTipo();
        console.log("------------------------El tipo del operarando derecho es ----------------------------")
        console.log(tipo2)
        console.log(op2)
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseInt(op1) + parseFloat(op2);
                    case tipoDato.STRING:
                        this.tipoDato.setTipo(tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return parseInt(op1) + op2.charCodeAt(0);
                    case tipoDato.BOOL:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        if(op2.toString().toLowerCase()==="true"){
                            return parseInt(op1) + 1;
                        }else{
                            return parseInt(op1) + 0;
                        }
                        
                    default:
                        return new Errores("SEMANTICO", "Tipo derecho no compatible", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseFloat(op1) + parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        console.log("Se sumo este valor en la aritmetica")
                        console.log(parseFloat(op1) + parseFloat(op2))
                        return parseFloat(op1) + parseFloat(op2);
                    case tipoDato.STRING:
                        this.tipoDato.setTipo(tipoDato.STRING);
                        return op1.toString() + op2.toString(); 
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseFloat(op1) + op2.charCodeAt(0);
                    case tipoDato.BOOL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        if(op2.toString().toLowerCase()==="true"){
                            return parseFloat(op1) + 1;
                        }else{
                            return parseFloat(op1) + 0;
                        }
                    default:
                        return new Errores("SEMANTICO", "Tipo derecho no compatible", this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        if(op1.toString().toLowerCase()==="true"){
                            return 1+parseInt(op2);
                        }else{
                            return 0+parseInt(op2);
                        }
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        if(op1.toString().toLowerCase()==="true"){
                            return 1+parseFloat(op2);
                        }else{
                            return 0+parseFloat(op2);
                        }
                    case tipoDato.STRING:
                        this.tipoDato.setTipo(tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    default:
                        return new Errores("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case tipoDato.STRING:
                this.tipoDato.setTipo(tipoDato.STRING);
                return op1.toString() + op2.toString();
            case tipoDato.CHAR:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return op1.charCodeAt(0) + parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return op1.charCodeAt(0) + parseFloat(op2);
                    case tipoDato.STRING:
                        this.tipoDato.setTipo(tipoDato.STRING);
                        return op1.toString() + op2.toString();
                    default:
                        return new Errores("SEMANTICO", "Tipo derecho no compatible", this.linea, this.col);
                }
            default:
                return new Errores("SEMANTICO", "Tipo izquierdo no compatible", this.linea, this.col);
        }
    }

    resta(op1: any, op2: any): any {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseInt(op1) - parseFloat(op2);
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        let caracter1 = op2.toString().charAt(0);
                        return parseInt(op1) - caracter1.charCodeAt(0);
                    case tipoDato.BOOL:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        if(op2.toString().toLowerCase()==="true"){
                            return parseInt(op1) - 1;
                        }else{
                            return parseInt(op1) - 0;
                        }
                    default:
                        return new Errores("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        if(op1.toString().toLowerCase()==="true"){
                            return 1-parseInt(op2);
                        }else{
                            return 0-parseInt(op2);
                        }
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        if(op1.toString().toLowerCase()==="true"){
                            return 1-parseFloat(op2);
                        }else{
                            return 0-parseFloat(op2);
                        }
                    default:
                        return new Errores("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseFloat(op1) - parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case tipoDato.BOOL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        if(op2.toString().toLowerCase()==="true"){
                            return parseFloat(op1) - 1;
                        }else{
                            return parseFloat(op1) - 0;
                        }
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        let caracter2 = op2.toString().charAt(0);
                        return parseFloat(op1) - caracter2.charCodeAt(0);
                    default:
                        return new Errores("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            case tipoDato.CHAR:
                let caracter3 = op1.toString().charAt(0);
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return caracter3.charCodeAt(0) - parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return caracter3.charCodeAt(0) - parseFloat(op2);
                    default:
                        return new Errores("SEMANTICO", "Restando derecho incorrecto", this.linea, this.col);
                }
            default:
                return new Errores("SEMANTICO", "Restando izquierdo incorrecto", this.linea, this.col);
        }
    }

    multiplicacion(op1: any, op2: any): any {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return parseInt(op1) * parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseInt(op1) * parseFloat(op2);
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        let caracter1 = op2.toString().charAt(0);
                        return parseInt(op1) * caracter1.charCodeAt(0);
                    default:
                        return new Errores("SEMANTICO", "Multiplicando derecho incorrecto", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseFloat(op1) * parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case tipoDato.CHAR:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        let caracter2 = op2.toString().charAt(0);
                        return parseFloat(op1) * caracter2.charCodeAt(0);
                    default:
                        return new Errores("SEMANTICO", "Multiplicando derecho incorrecto", this.linea, this.col);
                }
            case tipoDato.CHAR:
                let caracter3 = op1.toString().charAt(0);
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return caracter3.charCodeAt(0) * parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return caracter3.charCodeAt(0) * parseFloat(op2);
                    default:
                        return new Errores("SEMANTICO", "Multiplicando derecho incorrecto", this.linea, this.col);
                }
            default:
                return new Errores("SEMANTICO", "Multiplicando izquierdo incorrecto", this.linea, this.col);
        }
    }

    division(op1: any, op2: any): any {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();

        if (op2 == 0) {
            return new Errores("SEMANTICO", "División por cero", this.linea, this.col);
        }

        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseInt(op1) / parseInt(op2));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseInt(op1) / parseFloat(op2));
                    case tipoDato.CHAR:
                        let caracter1 = op2.toString().charAt(0);
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseInt(op1) / caracter1.charCodeAt(0));
                    default:
                        return new Errores("SEMANTICO", "Divisor de tipo incorrecto", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseFloat(op1) / parseInt(op2));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseFloat(op1) / parseFloat(op2));
                    case tipoDato.CHAR:
                        let caracter2 = op2.toString().charAt(0);
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseFloat(op1) / caracter2.charCodeAt(0));
                    default:
                        return new Errores("SEMANTICO", "Divisor de tipo incorrecto", this.linea, this.col);
                }
            case tipoDato.CHAR:
                let caracter3 = op1.toString().charAt(0);
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (caracter3.charCodeAt(0) / parseInt(op2));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (caracter3.charCodeAt(0) / parseFloat(op2));
                    default:
                        return new Errores("SEMANTICO", "Divisor de tipo incorrecto", this.linea, this.col);
                }
            default:
                return new Errores("SEMANTICO", "Dividendo de tipo incorrecto", this.linea, this.col);
        }
    }

    public potencia(base: any, exponente: any): any {
        let tipo1 = this.operando1.tipoDato.getTipo();
        let tipo2 = this.operando2.tipoDato.getTipo();
        
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return Math.pow(parseInt(base), parseInt(exponente));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return Math.pow(parseInt(base), parseFloat(exponente));
                    default:
                        return new Errores("SEMANTICO", "Exponente de tipo incorrecto", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(base), parseInt(exponente));
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(base), parseFloat(exponente));
                    default:
                        return new Errores("SEMANTICO", "Exponente de tipo incorrecto", this.linea, this.col);
                }
            default:
                return new Errores("SEMANTICO", "Base de tipo incorrecto", this.linea, this.col);
        }
    }

    public modulo(op1: any, op2: any): any {
        const tipo1 = this.operando1.tipoDato.getTipo();
        const tipo2 = this.operando2.tipoDato.getTipo();
    
        switch (tipo1) {
            case tipoDato.ENTERO: {
                switch (tipo2) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseInt(op1) % parseInt(op2));
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseInt(op1) % parseFloat(op2));
                    }
                    default: {
                        return new Errores("Error Semántico", "Divisor Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipo2) {
                    case tipoDato.ENTERO: {
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseFloat(op1) % parseInt(op2));
                    }
                    case tipoDato.DECIMAL: {
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return (parseFloat(op1) % parseFloat(op2));
                    }
                    default: {
                        return new Errores("Error Semántico", "Divisor Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores("Error Semántico", "Valor Izquierdo De Tipo Incorrecto", this.linea, this.col);
            }
        }
    }

    public negacion(op1: any): any {
        const tipo1 = this.operando1.tipoDato.getTipo();
    
        switch (tipo1) {
            case tipoDato.ENTERO: {
                this.tipoDato.setTipo(tipoDato.ENTERO);
                return -parseInt(op1);
            }
            case tipoDato.DECIMAL: {
                this.tipoDato.setTipo(tipoDato.DECIMAL);
                return -parseFloat(op1);
            }
            default: {
                return new Errores("Error Semántico", "Tipo De Dato Erróneo Para Obtener Su Negativo", this.linea, this.col);
            }
        }
    }

    public raiz(op1: any, op2: any): any {
        const tipo1 = this.operando1.tipoDato.getTipo();
        const tipo2 = this.operando2.tipoDato.getTipo();
    
        switch (tipo1) {
            case tipoDato.ENTERO: {
                switch (tipo2) {
                    case tipoDato.ENTERO: {
                        
                        this.tipoDato.setTipo(tipoDato.ENTERO);
                        return Math.pow(parseInt(op1), 1 / parseInt(op2));
                    }
                    case tipoDato.DECIMAL: {
                        
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return Math.pow(parseInt(op1), 1 / parseFloat(op2));
                    }
                    default: {
                        return new Errores("Error Semántico", "Índice de Raíz Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            case tipoDato.DECIMAL: {
                switch (tipo2) {
                    case tipoDato.ENTERO: {
                        
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), 1 / parseInt(op2));
                    }
                    case tipoDato.DECIMAL: {
                        
                        this.tipoDato.setTipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), 1 / parseFloat(op2));
                    }
                    default: {
                        return new Errores("Error Semántico", "Índice de Raíz Derecho Incorrecto", this.linea, this.col);
                    }
                }
            }
            default: {
                return new Errores("Error Semántico", "Número Base Izquierdo De Tipo Incorrecto", this.linea, this.col);
            }
        }
    }
    
}

export enum Operadores {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    RAIZ,
    MODULO,
    UNARIA
}
