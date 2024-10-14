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
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body
    });
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
    var data = JSON.parse(e.postData.contents);
    var recipient = data.recipient;
    var subject = data.subject;
    var body = data.body;

    var email = data.email;
    var name = data.name;
    var donationAmount = data.donationAmount;
    
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body
    });
    
    return ContentService.createTextOutput('Email sent!');
  } catch (error) {
    Logger.log('Error in doPost: ' + error.message);
    return ContentService.createTextOutput('Failed to send email.');
  }
}