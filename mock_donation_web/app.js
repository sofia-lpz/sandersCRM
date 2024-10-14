import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("hola mundo desde el puerto" + PORT)
});

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

// Add the endpoint to handle the form submission
app.post('/submit-donation', async (req, res) => {
  try {
    const donanteResponse = await fetch('http://localhost:8081/api/donantes', {
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

    const donacionResponse = await fetch('http://localhost:8081/api/donaciones', {
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
    res.status(500).json({ message: error.message });
  }
});