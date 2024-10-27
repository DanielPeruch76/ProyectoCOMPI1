"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getRelational;
const Runtime_js_1 = __importDefault(require("../../Exceptions/Runtime.js"));
function getRelational(left, operator, right, location) {
    const leftType = typeof left;
    const rightType = typeof right;
    switch (operator) {
        case '==':
            if (leftType === 'number' || leftType === 'object') {
                if (leftType === 'number' || leftType === 'object') {
                    return left === right;
                }
            }
        case '>':
            if (leftType === 'number' || leftType === 'object') {
                if (leftType === 'number' || leftType === 'object') {
                    return left > right;
                }
            }
    }
    throw new Runtime_js_1.default(`The ${operator} operator is undefined for types ${leftType} and ${rightType}`, location);
}
