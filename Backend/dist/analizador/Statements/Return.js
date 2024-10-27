"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnEx_js_1 = __importDefault(require("../ControlFlow/ReturnEx.js"));
class Return {
    constructor(expr, location) {
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const result = this.expr.interpret(ctx);
        throw new ReturnEx_js_1.default(result);
    }
    ;
}
exports.default = Return;
