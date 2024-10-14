import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import https from 'https';
import http from 'http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const API = 8080; // HTTP port for non-secure traffic

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync('../certificados_mock/server.key'),
  cert: fs.readFileSync('../certificados_mock/server.cert')
};

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://localhost:5173', // Adjust as necessary
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Allow cookies and HTTP authentication
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(bodyParser.json());

// HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server listening on HTTPS at port ${PORT}`);
});

// HTTP server


// Serve the main HTML page
app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('There was an error: ' + err);
      return;
    }
    res.send(html);
    console.log("Page sent");
  });
});

// Endpoint to handle the form submission
app.post('/submit-donation', async (req, res) => {
  try {
    const donanteResponse = await fetch(`https://localhost:${API}/api/donantes`, { // Use HTTP_PORT for local API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        telefono: req.body.telefono,
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido
      })
    });

    if (!donanteResponse.ok) {
      const errorData = await donanteResponse.json();
      res.status(donanteResponse.status).json(errorData);
      return;
    }

    const donante = await donanteResponse.json();

    const donacionResponse = await fetch(`https://localhost:${API}/api/donaciones`, { // Use HTTP_PORT for local API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_donante: donante.id,
        campana: req.body.campana,
        cantidad: req.body.cantidad,
        fecha: new Date().toISOString().split('T')[0], // Current date
        tipo: 'digital', // Default value
        estado: 'Sin registro', // Default value
        pais: 'Sin registro' // Default value
      })
    });

    if (donacionResponse.ok) {
      res.status(200).json({ message: 'Donante y donación registrados con éxito' });
    } else {
      const errorData = await donacionResponse.json();
      res.status(donacionResponse.status).json(errorData);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
