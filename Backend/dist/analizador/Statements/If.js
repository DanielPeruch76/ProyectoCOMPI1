"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
class IfStmt {
    constructor(condition, stmts, else_statements, location) {
        this.condition = condition;
        this.stmts = stmts;
        this.else_statements = else_statements;
        this.location = location;
    }
    interpret(ctx) {
        const localCtx = new Context_js_1.default();
        localCtx.prev = ctx;
        if (this.condition.interpret(ctx)) {
            for (const stmt of this.stmts) {
                stmt.interpret(localCtx);
            }
        }
        else {
            for (const stmt of this.else_statements) {
                stmt.interpret(localCtx);
            }
        }
    }
}
exports.default = IfStmt;
