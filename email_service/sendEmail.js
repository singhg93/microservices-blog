const config = require('./config.json');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
      host: config.sparkhost,
      port: config.sparkport,
      secure: false,
      auth: {
              user: config.sparkuser,
              pass: config.sparkapikey
            }
});

module.exports = sendEmail = (sub, body, recipient) => {
    var message = {
        from: config.username,
        to: recipient,
        subject: sub,
        text: body
    }

    transporter.sendMail( message, function(err, info) {
        if (err) {
            console.log(err)
        }
    });
    return true;
}
