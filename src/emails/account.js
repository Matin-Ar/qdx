const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: 'test123mattt@gmail.com',
        to: email,
        subject: 'Thanks for joining in!',
        html: `<h1>سلام ${name}</h1><p>خوش حالیم که به جمع ما پیوستی.</p>`
    })
}

const sendCancelatonEmail = (email, name) => {
    transporter.sendMail({
        from: 'test123mattt@gmail.com',
        to: email,
        subject: 'Sorry to see you go!',
        html: `<h1>خدا نگهدار ${name}</h1><p>امیدواریم که دوباره ببینیمیت.</p>`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelatonEmail
}