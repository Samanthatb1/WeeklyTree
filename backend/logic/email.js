const nodemailer = require("nodemailer");
const memoizedData = require("./webScrape");

// send email for every single user subscribed
async function sendEmails(allUsers) {
  const memoizedGetData = memoizedData();
  for (const user of allUsers) {
    try {
      console.log("********* doing ", user.email_id, " **************");
      await sendEmail(user.email_id, user.links, memoizedGetData);
    } catch (e) {
      console.log("one user failed");
    }
  }
}

// send one email to one user
async function sendEmail(email, links, memoizedGetData) {
  const allEventData = [];

  // Get event data for every link tree the user is subscribed to
  for (const link of links) {
    // Get event data for one link tree
    try {
      // If one link fails, the rest should still run
      const organization = await memoizedGetData(link);
      allEventData.push(organization);
    } catch (e) {
      console.log(`link: ${link} didnt work: ${e}`);
    }
  }

  try {
    // Contents of email
    let emailBody = `
      <!DOCTYPE html>
      <html style="background-color:#fcffff;font-family: Arial, sans-serif;">
        <body>
          <h1 style="margin:5px;color:#FF9F1C;font-size:40px;text-shadow: 1px 1px #023047;font-family: Tahoma, sans-serif">
            <b>LinkTree Updates</b>
          </h1>
    `;

    // EXAMPLE
    // allEventData = [{name: wie, events: []}, {name: csc, events:[]}]

    for (const organization of allEventData) {
      emailBody += `
        <h4 style="margin:8px;background-color:#CBF3F0;color:#023047;padding:7px;font-size:20px;"> 
          ${organization["organization_name"]} 
        </h4>`;

      // Loop through all sub events
      let c = 1;
      for (const event of organization["events"]) {
        emailBody += `
          <p style="color:#009D8E;padding-bottom:2px;margin:3px 0 3px 0;font-size:19px;padding-left:10px">
            <a style="color:#023047;" href="${event["link"]}">${c}. ${event["name"]}</a>
          </p>`;
        c += 1;
      }
    }

    // End of email
    emailBody += `
          <br>
          <br>
        </body>
      </html>
    `;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "weeklytree.notifs@gmail.com",
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "weeklytree.notifs@gmail.com",
      to: email,
      subject: "WeeklyTree Updates",
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log("Email failed to send to ", email, error.message);
      } else {
        console.log("Email sent to ", email);
      }
    });
  } catch (e) {
    console.log("An Error Occured");
  }
}

module.exports = sendEmails;
