import fetch from 'node-fetch';

const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxW75E9cUl3N33b7OedWXFRggJXXcODb-JH9xbQbuWADC35uIlsEXolXrqbKADITKii/exec";

export async function sendEmail(recipient, name, donationAmount) {
  console.log('Sending email to:', recipient);

  const data = {
    recipient: recipient,
    name: name,
    donationAmount: donationAmount,
    subject: 'Thank You for Your Donation!',
    body: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Dear ${name},</h2>
        <p>Thank you so much for your generous donation of <strong>$${donationAmount}</strong>!</p>
        <p>Your support helps us continue our mission and make a meaningful impact in our community.</p>
        
        <div style="text-align: center;">
          <img src="https://example.com/thank-you-image.jpg" alt="Thank you" width="300" style="margin-top: 20px;"/>
        </div>

        <p style="margin-top: 30px;">With gratitude,<br>
        <strong>The [Organization Name] Team</strong></p>

        <hr style="border-top: 1px solid #ddd; margin-top: 40px;">
        <p style="font-size: 12px; color: #888;">
          If you have any questions, feel free to contact us at 
          <a href="mailto:support@example.com" style="color: #4CAF50;">support@example.com</a>.
        </p>
      </div>
    `
  };

  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.text();
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
