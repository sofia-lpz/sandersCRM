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
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://18.189.43.182:5173';
const MOCK_URL = process.env.MOCK_URL || 'https://18.189.43.182:443';

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync('../certificados/server.key'),
  cert: fs.readFileSync('../certificados/server.cert')
};

// CORS configuration
const corsOptions = {
  origin: [FRONTEND_URL, MOCK_URL], // Add your HTTP URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // If you're using cookies or HTTP authentication
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use("/api", router);

// Create the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Sanders API listening on HTTPS at port ${PORT}`);
});
