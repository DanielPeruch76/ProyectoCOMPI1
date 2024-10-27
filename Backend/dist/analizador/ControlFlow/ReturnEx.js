"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnEx extends Error {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.default = ReturnEx;
