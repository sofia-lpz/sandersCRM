import fetch from 'node-fetch';

const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxW75E9cUl3N33b7OedWXFRggJXXcODb-JH9xbQbuWADC35uIlsEXolXrqbKADITKii/exec";

export async function sendEmail(recipient, name, donationAmount, campaign) {
  console.log('Sending email to:', recipient);

  // Format the donation amount as currency
  const formattedDonationAmount = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(donationAmount);

  let campaignMessage;

  switch (campaign) {
    case 'reproductiva':
      campaignMessage = `
        <p>En nombre de Fundación Sanders A.C., queremos expresarte nuestro más sincero agradecimiento por tu valiosa donación de ${formattedDonationAmount}. Con tu apoyo, estamos un paso más cerca de mejorar la salud reproductiva de muchas personas en situación de vulnerabilidad.</p>
      `;
      break;
    case 'agua':
      campaignMessage = `
        <p>En nombre de Fundación Sanders A.C., queremos expresarte nuestro más sincero agradecimiento por tu valiosa donación de ${formattedDonationAmount}. Con tu apoyo, estamos un paso más cerca de proporcionar agua potable a comunidades que lo necesitan.</p>
      `;
      break;
    case 'nutricion':
      campaignMessage = `
        <p>En nombre de Fundación Sanders A.C., queremos expresarte nuestro más sincero agradecimiento por tu valiosa donación de ${formattedDonationAmount}. Con tu apoyo, estamos un paso más cerca de mejorar la nutrición de muchas personas en situación de vulnerabilidad.</p>
      `;
      break;
    default:
      campaignMessage = `
        <p>En nombre de Fundación Sanders A.C., queremos expresarte nuestro más sincero agradecimiento por tu valiosa donación de ${formattedDonationAmount}. Con tu apoyo, estamos un paso más cerca de mejorar la calidad de vida de muchas personas en situación de vulnerabilidad.</p>
      `;
  }
  
  const data = {
    recipient: recipient,
    name: name,
    donationAmount: donationAmount,
    subject: '¡Gracias por tu donación!',
    body: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por tu donación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #1a1a1a; /* Dark background */
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #003366; /* Dark blue */
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #003366; /* Dark blue */
        }
        a {
            color: #003366; /* Dark blue */
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
        }
        .button-container {
            text-align: center; /* Center the button */
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #003366; /* Dark blue */
            color: #ffffff !important; /* White text with higher specificity */
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #002244; /* Darker blue */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Gracias por tu generosa donación!</h1>
        <p>Querido/a ${name},</p>
        ${campaignMessage}
        <p>Gracias a personas como tú, podemos seguir construyendo un futuro mejor para todos.</p>
        <p>Con gratitud,<br>
        Fundación Sanders A.C.</p>
        <div class="button-container">
            <a href="https://sanders.com.mx" class="button">Visita nuestra página web</a>
        </div>
        <div class="footer">
            <p>Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:contacto@fundacionsanders.org">contacto@fundacionsanders.org</a></p>
            <p>© 2024 Fundación Sanders A.C. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
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