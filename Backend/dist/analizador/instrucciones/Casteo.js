"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Simbolo_1 = __importDefault(require("../simbolo/Simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class Casteo extends Instruccion_1.Instruccion {
    constructor(tipo, tipoCasteo, linea, col, id, valor, mutabilidad) {
        super(tipo, linea, col);
        this.identificador = id;
        this.valor = valor;
        this.mutabilidad = mutabilidad;
        this.tipoCasteo = tipoCasteo;
    }
    interpretar(arbol, tabla) {
        if (this.valor == null) {
            if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, null))) {
                return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
            }
            return;
        }
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errores_1.default)
            return resValor;
        if (this.valor.tipoDato.getTipo() === Tipo_1.tipoDato.ENTERO) {
            let tipo = this.tipoCasteo.getTipo();
            let valor_casteado = 0;
            switch (tipo) {
                case Tipo_1.tipoDato.ENTERO:
                    valor_casteado = parseInt(this.valor.interpretar(arbol, tabla));
                    console.log("Este es el valor casteado" + valor_casteado);
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                case Tipo_1.tipoDato.DECIMAL:
                    valor_casteado = parseFloat(this.valor.interpretar(arbol, tabla)).toFixed(1);
                    console.log("Este es el valor casteado" + valor_casteado);
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                case Tipo_1.tipoDato.STRING:
                    valor_casteado = this.valor.interpretar(arbol, tabla).toString();
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                case Tipo_1.tipoDato.CHAR:
                    valor_casteado = String.fromCharCode(parseInt(this.valor.interpretar(arbol, tabla)));
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                default:
                    return new Errores_1.default('SEMANTICO', 'No se puede casterar de esa manera', this.linea, this.col);
            }
        }
        else if (this.valor.tipoDato.getTipo() === Tipo_1.tipoDato.DECIMAL) {
            let tipo = this.tipoCasteo.getTipo();
            let valor_casteado = 0;
            switch (tipo) {
                case Tipo_1.tipoDato.ENTERO:
                    valor_casteado = parseInt(this.valor.interpretar(arbol, tabla));
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                case Tipo_1.tipoDato.DECIMAL:
                    valor_casteado = parseFloat(this.valor.interpretar(arbol, tabla)).toFixed(1);
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                case Tipo_1.tipoDato.STRING:
                    valor_casteado = this.valor.interpretar(arbol, tabla).toString();
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                default:
                    return new Errores_1.default('SEMANTICO', 'No se puede casterar de esa manera', this.linea, this.col);
            }
        }
        else if (this.valor.tipoDato.getTipo() === Tipo_1.tipoDato.CHAR) {
            let tipo = this.tipoCasteo.getTipo();
            let valor_casteado = 0;
            switch (tipo) {
                case Tipo_1.tipoDato.ENTERO:
                    valor_casteado = parseInt(this.valor.interpretar(arbol, tabla).charCodeAt(0));
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                case Tipo_1.tipoDato.DECIMAL:
                    valor_casteado = parseFloat(this.valor.interpretar(arbol, tabla).charCodeAt(0)).toFixed(1);
                    if (this.tipoCasteo.getTipo() != this.tipoDato.getTipo()) {
                        return new Errores_1.default('SEMANTICO', 'Tipos de dato de casteo no coincide con tipo de dato variable', this.linea, this.col);
                    }
                    if (!tabla.setVariable(new Simbolo_1.default(this.tipoDato, this.identificador, this.mutabilidad, valor_casteado))) {
                        return new Errores_1.default('SEMANTICO', 'No se puede declarar la variable', this.linea, this.col);
                    }
                default:
                    return new Errores_1.default('SEMANTICO', 'No se puede casterar de esa manera', this.linea, this.col);
            }
        }
        else {
            return new Errores_1.default('SEMANTICO', 'Este dato no se puede castear', this.linea, this.col);
        }
    }
}
exports.default = Casteo;
