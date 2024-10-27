"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BreakEx_js_1 = __importDefault(require("../ControlFlow/BreakEx.js"));
class Break {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        throw new BreakEx_js_1.default;
    }
    ;
}
exports.default = Break;
