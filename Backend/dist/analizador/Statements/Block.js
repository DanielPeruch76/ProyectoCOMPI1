"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
class BlockStmt {
    constructor(stmts, location) {
        this.stmts = stmts;
        this.location = location;
    }
    interpret(ctx) {
        const localCtx = new Context_js_1.default();
        localCtx.prev = ctx;
        for (const stmt of this.stmts) {
            stmt.interpret(localCtx);
        }
    }
}
exports.default = BlockStmt;
