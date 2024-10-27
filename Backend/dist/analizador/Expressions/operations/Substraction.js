"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDifference;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getDifference(left, right, location) {
    const leftType = typeof left;
    const rightType = typeof right;
    if (leftType === 'number') {
        if (rightType === 'number') {
            return left - right;
        }
    }
    throw new Runtime_js_1.default(`Sum is undefined for types ${leftType} and ${rightType}`, location);
}
