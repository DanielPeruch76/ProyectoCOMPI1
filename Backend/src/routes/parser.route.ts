import { Router } from "express";
import parser from "../controllers/parser.controllers";

const router = Router();

router.post("/analizar", parser);
 
export default router;
