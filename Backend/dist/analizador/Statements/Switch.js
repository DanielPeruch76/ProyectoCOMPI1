"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
class Switch {
    constructor(condition, cases, default_stmts, location) {
        this.condition = condition;
        this.cases = cases;
        this.default_stmts = default_stmts;
        this.location = location;
    }
    interpret(ctx) {
        const value = this.condition.interpret(ctx);
        for (const element of this.cases) {
            const data = element.value.interpret(ctx);
            if (data == value) {
                element.interpret(ctx);
                return;
            }
        }
        if (this.default_stmts != null) {
            const localCtx = new Context_js_1.default();
            localCtx.prev = ctx;
            for (const stmt of this.default_stmts) {
                stmt.interpret(localCtx);
            }
        }
    }
}
exports.default = Switch;
