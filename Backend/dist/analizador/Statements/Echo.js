"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_js_1 = __importDefault(require("../Context/Global.js"));
class EchoStatement {
    constructor(expr, location) {
        this.expr = expr;
        this.location = location;
    }
    interpret(ctx) {
        const expr = this.expr.interpret(ctx);
        Global_js_1.default.console += expr + '\n';
    }
}
exports.default = EchoStatement;
