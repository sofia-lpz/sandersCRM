const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const PORT = 3200;

// Debug logging utility
const log = (message, data = '') => {
    console.log(`[DEBUG] ${message}`, data || '');
};

// PayPal credentials (replace with your actual values)
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID || 'YOUR_SANDBOX_WEBHOOK_ID';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'YOUR_SANDBOX_SECRET';

// Parse incoming JSON requests
app.use(bodyParser.json());

// Root route to send 200 OK for health check
app.post('/', (req, res) => {
    log('Root path accessed, responding with 200 OK');
    res.status(200).send('OK');
});

// PayPal Webhook route
app.post('/webhook', (req, res) => {
    log('Webhook received:', req.body);

    // Retrieve necessary headers for signature validation
    const paypalSignature = req.headers['paypal-transmission-sig'];
    const paypalTransmissionId = req.headers['paypal-transmission-id'];
    const paypalTransmissionTime = req.headers['paypal-transmission-time'];
    const webhookEvent = req.body;

    log('Headers:', {
        'paypal-transmission-sig': paypalSignature,
        'paypal-transmission-id': paypalTransmissionId,
        'paypal-transmission-time': paypalTransmissionTime,
    });

    // Check if we received the necessary data
    if (!paypalSignature || !paypalTransmissionId || !paypalTransmissionTime || !webhookEvent) {
        log('Error: Missing required PayPal headers or event data');
        return res.status(400).send('Bad Request: Missing headers');
    }

    // Step 1: Validate the webhook signature (PayPal's verification process)
    const expectedSignature = crypto.createHmac('sha256', PAYPAL_SECRET)
        .update(`${paypalTransmissionId}|${paypalTransmissionTime}|${PAYPAL_WEBHOOK_ID}|${JSON.stringify(req.body)}`)
        .digest('hex');

    log('Generated signature:', expectedSignature);
    log('PayPal Signature:', paypalSignature);

    // If the signatures do not match, return an error
    /*
    if (paypalSignature !== expectedSignature) {
        log('Error: Invalid signature');
        return res.status(400).send('Invalid signature');
    }
    */
    // Step 2: Handle specific webhook events
    if (webhookEvent.event_type === 'PAYMENT.CAPTURE.COMPLETED') {

        /*
        const donationDetails = {
            donatorEmail: webhookEvent.resource.payer.email_address,
            donationAmount: webhookEvent.resource.amount.value,
            currency: webhookEvent.resource.amount.currency_code,
            transactionId: webhookEvent.resource.id,
            donationDate: webhookEvent.resource.create_time,
        };
        */

        // Log the donation details
        log('Donation received:', webhookEvent);

        // Always return a 200 status to acknowledge successful receipt of the webhook
        res.status(200).send('Webhook received successfully');
    } else {
        // Log unhandled event types
        log('Unhandled event type:', webhookEvent.event_type);

        // Respond with 200 OK even for unhandled events
        res.status(200).send('Event type not handled');
    }
});

// Start the server on port 3200
app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
});
