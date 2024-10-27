"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_js_1 = __importDefault(require("../Context/Global.js"));
class FunctionDefine {
    constructor(name, list_params, list_stmts, location) {
        this.name = name;
        this.list_params = list_params;
        this.list_stmts = list_stmts;
        this.location = location;
    }
    interpret(ctx) {
        Global_js_1.default.list_functions.push({
            name: this.name,
            list_params: this.list_params,
            list_stmts: this.list_stmts
        });
    }
}
exports.default = FunctionDefine;
