"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LiteralExpr {
    constructor(literal, t, location) {
        this.literal = literal;
        this.t = t;
        this.location = location;
    }
    interpret(ctx) {
        switch (this.t) {
            case 'INT':
                return Number(this.literal);
            case 'STRING':
                return this.literal.replaceAll('"', '');
            case 'BOOL':
                return this.literal == 'True' ? true : this.literal == 'False' ? false : null;
            case 'NULL':
                return null;
        }
    }
}
exports.default = LiteralExpr;
