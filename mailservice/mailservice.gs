function sendThankYouEmail(recipient, name, donationAmount) {
  var subject = "Thank You for Your Donation!";
  
  var body = `
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
  `;

  try {
    Logger.log(`Sending email to ${recipient} with subject "${subject}"`);
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body
    });
    Logger.log('Thank You email sent successfully.');
    return 'Thank You email sent!';
  } catch (error) {
    Logger.log('Error sending email: ' + error.message);
    return 'Failed to send Thank You email.';
  }
}

function test(){
  var result = sendThankYouEmail("decembre1935@gmail.com", "sofia", "99");
  Logger.log(result);
}

function doPost(e) {
  try {
    Logger.log('Received POST request with data: ' + e.postData.contents);
    var data = JSON.parse(e.postData.contents);
    var recipient = data.email;
    var name = data.nombre;
    var donationAmount = data.cantidad;
    
    Logger.log(`Parsed data - Recipient: ${recipient}, Name: ${name}, Donation Amount: ${donationAmount}`);
    
    var result = sendThankYouEmail(recipient, name, donationAmount);
    
    if (result === 'Thank You email sent!') {
      Logger.log('Email sent successfully.');
      return ContentService.createTextOutput('Email sent!').setMimeType(ContentService.MimeType.TEXT).setResponseCode(200);
    } else {
      Logger.log('Failed to send email.');
      return ContentService.createTextOutput('Failed to send email.').setMimeType(ContentService.MimeType.TEXT).setResponseCode(500);
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.message);
    return ContentService.createTextOutput('Failed to send email.').setMimeType(ContentService.MimeType.TEXT).setResponseCode(500);
  }
}