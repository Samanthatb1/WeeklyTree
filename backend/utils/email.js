const nodemailer = require('nodemailer');

// send one email to one user
async function sendEmail(email, message){
  try {
    // Contents of email
    let emailBody = `
      <!DOCTYPE html>
      <html style="background-color:#fcffff;font-family: Arial, sans-serif;">
        <body style="background-color:#f8f2ff;">
          <h1 style="margin:5px;color:#6007d6;font-size:40px;text-shadow: 1px 1px #023047;font-family: Tahoma, sans-serif">
            <b>WeeklyTree Update:</b>
          </h1>
          <br>
          <b>You have been ${message} WeeklyTree</b>
        </body>
      </html>
    `

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'weeklytree.notifs@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: 'weeklytree.notifs@gmail.com',
      to: email,
      subject: 'WeeklyTree Updates',
      html: emailBody
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Email failed to send to ", email, error.message)
      } else {
        console.log('Email sent to ', email);
      }
    });
  } catch (e) {
    console.log("An Error Occured")
  }
}

module.exports = sendEmail;
