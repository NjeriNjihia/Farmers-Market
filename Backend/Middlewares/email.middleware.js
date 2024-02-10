const nodemailer = require("nodemailer")

const sendEmail = async (to,subject,text) =>{
    try {
        //create a node mailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: " ",
                password: " "
            }
        });

        //Setup email data
        const mailOptions = {
            from: " ",
            to: to,
            subject: subject,
            text: text
        };
        //Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail