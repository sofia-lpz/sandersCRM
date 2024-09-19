import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import {router} from './crm.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);


app.listen(PORT, () => {
  console.log(`Sanders api escuchando en el puerto ${PORT}`);
});


