"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errores = void 0;
class Errores {
    constructor(tipo, descripcion, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    setColumna(columna) {
        this.columna = columna;
    }
    toString() {
        return `Errores{tipo=${this.tipo}, descripcion=${this.descripcion}, linea=${this.linea}, columna=${this.columna}}`;
    }
}
exports.Errores = Errores;
