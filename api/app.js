import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import { router } from './crm.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync('../certificados/server.key'),
  cert: fs.readFileSync('../certificados/server.cert')
};

app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

// Create the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Sanders API listening on HTTPS at port ${PORT}`);
});
