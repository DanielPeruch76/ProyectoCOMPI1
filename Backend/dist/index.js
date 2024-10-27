"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const parser_route_1 = __importDefault(require("./routes/parser.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "100mb" }));
app.use(body_parser_1.default.json({ limit: "100mb" }));
app.use("/", parser_route_1.default);
app.listen(port, () => {
    console.log("Servidor online en puerto" + port);
});
