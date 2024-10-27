"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
const ContinueEx_js_1 = __importDefault(require("../ControlFlow/ContinueEx.js"));
const BreakEx_js_1 = __importDefault(require("../ControlFlow/BreakEx.js"));
class Loop {
    constructor(stmts, location) {
        this.stmts = stmts;
        this.location = location;
    }
    interpret(ctx) {
        const localCtx = new Context_js_1.default();
        localCtx.prev = ctx;
        while (true) {
            try {
                for (const stmt of this.stmts) {
                    stmt.interpret(localCtx);
                }
            }
            catch (error) {
                if (error instanceof ContinueEx_js_1.default) {
                    continue;
                }
                if (error instanceof BreakEx_js_1.default) {
                    break;
                }
            }
        }
    }
    ;
}
exports.default = Loop;
