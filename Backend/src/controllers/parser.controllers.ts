import { Request, Response } from "express";
import { ProyectoParser } from "../analizador/gramatica-generada";
import Arbol from "../analizador/simbolo/Arbol";
import tablaSimbolo from "../analizador/simbolo/tablaSimbolo";
import Errores from "../analizador/excepciones/Errores";
import Metodo from "../analizador/instrucciones/Metodo";
import Declaracion from "../analizador/instrucciones/Declaracion";
import Run from "../analizador/instrucciones/Run";
import Funcion from "../analizador/instrucciones/Funcion";

const parser = (req: Request, res: Response) => {
  try {
    console.log("***********************************************************************************************")
    console.log(req.body);
    const { Cmd } = req.body;
    console.log(Cmd);
    const jisonParser = new ProyectoParser();
    const lista_ast = jisonParser.parse(Cmd);
    let ast = new Arbol(lista_ast);
    let tabla = new tablaSimbolo();
    tabla.setNombre("Ejemplo");
    ast.setTablaGlobal(tabla);
    ast.setConsola("");

    
    for (let i of ast.getInstrucciones()) {
      if (i instanceof Metodo) {
        ast.addFunciones(i);
        console.log("Si se guardo el método");
        console.log(i);
      }
    }

    for (let i of ast.getInstrucciones()) {
      if (i instanceof Funcion) {
        ast.addFunciones(i);
        console.log("Si se agrego la funcion");
        console.log(i);
      }
    }

    
    for (let i of ast.getInstrucciones()) {
      if (i instanceof Declaracion) {
        let resDeclaracion = i.interpretar(ast, tabla);
        if (resDeclaracion instanceof Errores) ast.addErrores(resDeclaracion);
      }
      
    }


    for (let i of ast.getInstrucciones()) {
      if (i instanceof Run) {
        let res = i.interpretar(ast, tabla);
        if (res instanceof Errores) ast.addErrores(res);
        break;
      }
    }

    console.log(tabla);
    console.log(ast.getConsola());
    console.log("********************************************************************************************")
    res.status(200).send({
      result: ast.getConsola(),
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ Error: "Hay algun error :(" });
  }
};

export default parser;
