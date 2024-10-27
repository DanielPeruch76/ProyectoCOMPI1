"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wrapInSym;
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
function wrapInSym(type, value, location) {
    const symbol = {
        value: value,
        type: type,
    };
    switch (type.toUpperCase()) {
        case 'INT':
            if (typeof value === 'number') {
                return symbol;
            }
            break;
        case 'STRING':
            if (typeof value === 'string') {
                return symbol;
            }
            break;
        case 'NULL':
            if (value === null) {
                return symbol;
            }
            break;
    }
    throw new Runtime_js_1.default(`Invalidad value for type ${type}: (${typeof value}) ${value}`, location);
}
