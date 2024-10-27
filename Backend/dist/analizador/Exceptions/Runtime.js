"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuntimeError extends Error {
    constructor(msg, location) {
        super(`Runtime error at ${location.first_line}, ${location.first_column}: ${msg}`);
    }
}
exports.default = RuntimeError;
