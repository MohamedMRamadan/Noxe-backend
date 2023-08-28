import express from "express";
import * as dotenv from "dotenv";
import connection from "./DataBase/connection.js";
import init from "./src/modules/index.routes.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
connection();
app.use(express.json());
//MiddleWare
init(app);

app.listen(port, () => {
  console.log(`Server is Loading at port ${port}...`);
});
