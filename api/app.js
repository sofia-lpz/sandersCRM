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
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://localhost:5173';
const MOCK_URL = process.env.MOCK_URL || 'http://localhost:9090';

const sslOptions = {
  key: fs.readFileSync('../certificados/server.key'),
  cert: fs.readFileSync('../certificados/server.cert')
};

const corsOptions = {
  origin: [FRONTEND_URL, MOCK_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(bodyParser.json());

app.use("/api", router);

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Sanders API listening on HTTPS at port ${PORT}`);
});