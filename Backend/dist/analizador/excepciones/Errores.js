"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipo, desc, linea, col) {
        this.tipoError = tipo;
        this.desc = desc;
        this.linea = linea;
        this.col = col;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getLinea() {
        return this.linea;
    }
    getCol() {
        return this.col;
    }
    getErrores() {
        return {
            "tipo": this.tipoError, "desc": this.desc, "linea": this.linea, "col": this.col
        };
    }
    toString() {
        return "----- Error " + this.tipoError + ": " + this.desc + "en la linea " +
            this.linea + " y columna " + this.col + " ----";
    }
}
exports.default = Errores;
