const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming webhook data
app.use(bodyParser.json());

// PayPal webhook secret from the PayPal developer dashboard
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID || 'YOUR_WEBHOOK_ID';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'YOUR_CLIENT_ID';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'YOUR_SECRET';

// Route to handle PayPal webhooks
app.post('/webhook', (req, res) => {
    const body = JSON.stringify(req.body);
    const paypalSignature = req.headers['paypal-transmission-sig'];
    const paypalTransmissionId = req.headers['paypal-transmission-id'];
    const paypalTransmissionTime = req.headers['paypal-transmission-time'];
    const paypalCertUrl = req.headers['paypal-cert-url'];
    const paypalAuthAlgo = req.headers['paypal-auth-algo'];
    const webhookEvent = req.body;

    // Step 1: Validate the incoming PayPal signature
    const expectedSignature = crypto.createHmac('sha256', PAYPAL_SECRET)
        .update(`${paypalTransmissionId}|${paypalTransmissionTime}|${PAYPAL_WEBHOOK_ID}|${body}`)
        .digest('hex');

    if (paypalSignature !== expectedSignature) {
        return res.status(400).send('Invalid signature');
    }

    // Step 2: Handle the specific webhook event
    if (webhookEvent.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const donationDetails = {
            donatorEmail: webhookEvent.resource.payer.email_address,
            donationAmount: webhookEvent.resource.amount.value,
            currency: webhookEvent.resource.amount.currency_code,
            transactionId: webhookEvent.resource.id,
            donationDate: webhookEvent.resource.create_time
        };

        // Save donation details to your database or take further action
        console.log('New donation received:', donationDetails);

        // Send a response to acknowledge receipt of the webhook
        res.status(200).send('Webhook received');
    } else {
        res.status(200).send('Event type not handled');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
