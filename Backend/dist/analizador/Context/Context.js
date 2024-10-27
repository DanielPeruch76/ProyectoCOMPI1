"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
const WrapInSym_js_1 = __importDefault(require("./WrapInSym.js"));
class Context {
    constructor() {
        this.prev = null;
        this.symbols = new Map();
    }
    get(key, location) {
        let symbol = this.symbols.get(key);
        if (!symbol && this.prev) {
            symbol = this.prev.get(key, location);
        }
        return symbol;
    }
    declare(key, symbol, location) {
        if (this.symbols.has(key)) {
            throw new Runtime_js_1.default(`${key} already exists`, location);
        }
        this.symbols.set(key, symbol);
    }
    set(key, value, location) {
        const symbol = this.get(key, location);
        if (!symbol) {
            throw new Runtime_js_1.default(`${key} is undefined`, location);
        }
        const newSymbol = (0, WrapInSym_js_1.default)(symbol.type, value, location);
        symbol.value = newSymbol.value;
    }
}
exports.default = Context;
