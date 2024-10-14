require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
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

      // You can store payment information or trigger other actions here
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
