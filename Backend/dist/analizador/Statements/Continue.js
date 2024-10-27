"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContinueEx_js_1 = __importDefault(require("../ControlFlow/ContinueEx.js"));
class Continue {
    constructor(location) {
        this.location = location;
    }
    interpret(ctx) {
        throw new ContinueEx_js_1.default;
    }
    ;
}
exports.default = Continue;
