require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const fetch = require('node-fetch'); // Import node-fetch to make API calls
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use secret key from .env

const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Webhook endpoint to handle Stripe events
app.post('/webhook', async (req, res) => {
  // Directly use req.body as we are not verifying signatures in the test environment
  const event = req.body;

  console.log('Received event:', event);

  // Handle the payment_intent.succeeded event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntentId = event.data.object.id; // Get the Payment Intent ID

    try {
      // Retrieve the payment intent using the Payment Intent ID
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Get the Payment Method ID from the Payment Intent
      const paymentMethodId = paymentIntent.payment_method; // Get Payment Method ID

      // Retrieve the Payment Method details using the Payment Method ID
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

      // Log the retrieved payment method data
      console.log('Payment Method:', paymentMethod);

      // Extract donor details from the payment method
      const donorEmail = paymentMethod.billing_details.email; // Donor's email
      const donorName = paymentMethod.billing_details.name; // Donor's name
      const donorAddress = paymentMethod.billing_details.address; // Donor's address
      const cardBrand = paymentMethod.card.brand; // Card brand
      const last4 = paymentMethod.card.last4; // Last 4 digits of the card
      const expiration = `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`; // Expiration date

      console.log('Donor Email:', donorEmail);
      console.log('Donor Name:', donorName);
      console.log('Donor Address:', donorAddress);
      console.log('Card Brand:', cardBrand);
      console.log('Last 4 Digits:', last4);
      console.log('Expiration Date:', expiration);

      // Split donor name into first name and last name
      const nameParts = donorName.split(' ');
      const nombre = nameParts[0]; // First part before the space
      const apellido = nameParts.slice(1).join(' '); // Remaining parts as last name

      console.log('Nombre:', nombre);
      console.log('Apellido:', apellido);

      // Prepare to register donor
      const donanteResponse = await fetch(`https://localhost:${process.env.API}/api/donantes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          telefono: paymentMethod.billing_details.phone || null, // Use phone from billing details or null
          email: donorEmail,
          nombre: nombre,
          apellido: apellido
        })
      });

      if (!donanteResponse.ok) {
        const errorData = await donanteResponse.json();
        console.error('Error registering donor:', errorData);
        return res.status(donanteResponse.status).json(errorData);
      }

      const donante = await donanteResponse.json();

      // Now register the donation
      const donacionResponse = await fetch(`https://localhost:${process.env.API}/api/donaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_donante: donante.id,
          campana: paymentIntent.metadata.campana || 'Default Campaign', // Adjust as necessary
          cantidad: paymentIntent.amount_received / 100, // Convert cents to dollars
          fecha: new Date().toISOString().split('T')[0], // Current date
          tipo: 'digital', // Default value
          estado: 'Sin registro', // Default value
          pais: donorAddress.country || 'Sin registro' // Default value
        })
      });

      if (!donacionResponse.ok) {
        const errorData = await donacionResponse.json();
        console.error('Error registering donation:', errorData);
        return res.status(donacionResponse.status).json(errorData);
      }
      

      // Log success
      console.log('Donante registered:', donante);
      console.log('Donación registered:', await donacionResponse.json());

    } catch (error) {
      console.error('Error retrieving payment intent or payment method:', error);
      return res.status(500).send('Error retrieving payment intent or payment method');
    }
  }

  // Acknowledge receipt of the event
  res.json({ received: true });
});

// Start the server
app.listen(3004, () => console.log('Server is running on port 3004'));
