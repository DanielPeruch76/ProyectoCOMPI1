"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, id, mutabilidad, valor) {
        this.tipo = tipo;
        this.id = id.toLocaleLowerCase();
        this.mutabilidad = mutabilidad;
        this.valor = valor;
    }
    getTipo() {
        return this.tipo;
    }
    SetTipo(tipo) {
        this.tipo = tipo;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getMutabilidad() {
        return this.mutabilidad;
    }
    setMutabilidad(mutabilidad) {
        this.mutabilidad = mutabilidad;
    }
}
exports.default = Simbolo;
