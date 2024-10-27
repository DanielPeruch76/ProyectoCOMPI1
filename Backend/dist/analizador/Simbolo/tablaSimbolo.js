"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class tablaSimbolo {
    constructor(anterior) {
        this.tablaActual = new Map();
        this.nombreDato = "";
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(tabla) {
        this.tablaActual = tabla;
    }
    getNombre() {
        return this.nombreDato;
    }
    setNombre(nombre) {
        this.nombreDato = nombre;
    }
    setVariable(simbolo) {
        let busqueda = this.getTabla().get(simbolo.getId().toLowerCase());
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLowerCase(), simbolo);
            return true;
        }
        return false;
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    getVariable(id) {
        for (let i = this; i != null; i = i.getAnterior()) {
            let busqueda = i.getTabla().get(id.toLowerCase());
            if (busqueda != null)
                return busqueda;
        }
        return null;
    }
}
exports.default = tablaSimbolo;
