const { MailtrapClient } = require("mailtrap");

const sendEmail = async (options) => {
  const TOKEN = process.env.SMTP_PASSWORD;
  const ENDPOINT = "https://send.api.mailtrap.io/";

  const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

  const sender = {
    email: "trikutaseeds@trikutaseeds.com",
    name: "Trikuta Seeds",
  };

  const recipients = [
    {
      email: options.email,
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: options.subject,
      text: options.message,
      category: "Password Recovery",
    })
    .then(console.log, console.error);
};

module.exports = sendEmail;
