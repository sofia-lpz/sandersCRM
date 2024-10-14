function doPost(e) {
  try {
    Logger.log('Received POST request with data: ' + e.postData.contents);
    var data = JSON.parse(e.postData.contents);
    
    var recipient = data.recipient;
    var name = data.name;
    var donationAmount = data.donationAmount;
    var subject = data.subject;
    var body = data.body;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body
    });
    
    return ContentService.createTextOutput('Email sent successfully');
  } catch (error) {
    Logger.log('Error sending email: ' + error);
    return ContentService.createTextOutput(recipient.value);
  }
}