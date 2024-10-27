"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_js_1 = __importDefault(require("../Context/Context.js"));
const Global_js_1 = __importDefault(require("../Context/Global.js"));
const Runtime_js_1 = __importDefault(require("../Exceptions/Runtime.js"));
class CallFunction {
    constructor(name, args, location) {
        this.name = name;
        this.args = args;
        this.location = location;
    }
    interpret(ctx) {
        const func = Global_js_1.default.list_functions.find(f => f.name == this.name);
        if (func) {
            const innerCtx = new Context_js_1.default(); // Contexto dentro de la llamada
            if (this.args != null) {
                for (let i = 0; i < func.list_params.length; i++) {
                    const param = func.list_params[i];
                    const arg = this.args.find(f => f.name == param.name);
                    const value = arg.expr.interpret(ctx);
                    // Este contexto es del punto de la llamada no dentro de la funcion
                    innerCtx.declare(param.name, { type: param.type, value: value }, this.location);
                }
            }
            for (const stmt of func.list_stmts) {
                stmt.interpret(innerCtx); // Contexto de la llamada
            }
        }
        else {
            throw new Runtime_js_1.default(`Function ${this.name} not found`, this.location);
        }
    }
}
exports.default = CallFunction;
