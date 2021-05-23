const nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Gmail
// change the user and pass !
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: '"QDX" <admin@qdx.ir>', // sender address (who sends)
        to: email, // list of receivers (who receives)
        subject: 'Welcome !', // Subject line
        html: `<b>سلام ${name} </b><br> به سایت QDX خوش آمدید` // html body
    })
}

const sendCancelatonEmail = (email, name) => {
    transporter.sendMail({
        from: '"QDX" <admin@qdx.ir>', // sender address (who sends)
        to: email, // list of receivers (who receives)
        subject: 'Bye !', // Subject line
        html: `<b>خدا نگهدار ${name}</b><br> <h1 style="color:blue;">BYE BYE</h1> ` // html body
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelatonEmail
}