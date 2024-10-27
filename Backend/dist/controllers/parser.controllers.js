"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gramatica_generada_1 = require("../analizador/gramatica-generada");
const Arbol_1 = __importDefault(require("../analizador/simbolo/Arbol"));
const tablaSimbolo_1 = __importDefault(require("../analizador/simbolo/tablaSimbolo"));
const Errores_1 = __importDefault(require("../analizador/excepciones/Errores"));
const Metodo_1 = __importDefault(require("../analizador/instrucciones/Metodo"));
const Declaracion_1 = __importDefault(require("../analizador/instrucciones/Declaracion"));
const Run_1 = __importDefault(require("../analizador/instrucciones/Run"));
const Funcion_1 = __importDefault(require("../analizador/instrucciones/Funcion"));
const parser = (req, res) => {
    try {
        console.log("***********************************************************************************************");
        console.log(req.body);
        const { Cmd } = req.body;
        console.log(Cmd);
        const jisonParser = new gramatica_generada_1.ProyectoParser();
        const lista_ast = jisonParser.parse(Cmd);
        let ast = new Arbol_1.default(lista_ast);
        let tabla = new tablaSimbolo_1.default();
        tabla.setNombre("Ejemplo");
        ast.setTablaGlobal(tabla);
        ast.setConsola("");
        for (let i of ast.getInstrucciones()) {
            if (i instanceof Metodo_1.default) {
                ast.addFunciones(i);
                console.log("Si se guardo el método");
                console.log(i);
            }
        }
        for (let i of ast.getInstrucciones()) {
            if (i instanceof Funcion_1.default) {
                ast.addFunciones(i);
                console.log("Si se agrego la funcion");
                console.log(i);
            }
        }
        for (let i of ast.getInstrucciones()) {
            if (i instanceof Declaracion_1.default) {
                let resDeclaracion = i.interpretar(ast, tabla);
                if (resDeclaracion instanceof Errores_1.default)
                    ast.addErrores(resDeclaracion);
            }
        }
        for (let i of ast.getInstrucciones()) {
            if (i instanceof Run_1.default) {
                let res = i.interpretar(ast, tabla);
                if (res instanceof Errores_1.default)
                    ast.addErrores(res);
                break;
            }
        }
        console.log(tabla);
        console.log(ast.getConsola());
        console.log("********************************************************************************************");
        res.status(200).send({
            result: ast.getConsola(),
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ Error: "Hay algun error :(" });
    }
};
exports.default = parser;
