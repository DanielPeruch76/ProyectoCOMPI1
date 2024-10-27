import express, { Express } from "express";
import cors from "cors";
import router from "./routes/parser.route";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT||5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "100mb"}));
app.use(bodyParser.json({limit: "100mb"}));
app.use("/", router);
app.listen(port, () => {
  console.log("Servidor online en puerto" + port);
});
