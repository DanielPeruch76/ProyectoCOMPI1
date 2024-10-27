"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VarLookUpExpr {
    constructor(identifier, location) {
        this.identifier = identifier;
        this.location = location;
    }
    interpret(ctx) {
        const symbol = ctx.get(this.identifier, this.location);
        return symbol.value;
    }
}
exports.default = VarLookUpExpr;
