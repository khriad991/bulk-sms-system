import nodemailer from 'nodemailer';
export const sendEmailMessage = async ({ smtpHost, smtpPort, smtpUser, smtpPass, to, cc=[], bcc=[], subject, text }) => {
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort  ,// === 465, true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        tls: {
            rejectUnauthorized: false, // Use with caution, only in development or with self-signed certs
        },
    });

    const mailOptions = {
        from: smtpUser,
        to,
        cc,   // Adding cc
        bcc,  // Adding bcc
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email: %s', error);
        throw error;
    }
}




export async function SendEmail(EmailTo,EmailText,EmailSubject){
    const transporter = nodemailer.createTransport({
       /* host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'samara91@ethereal.email',
            pass: '6r2ftVYq6yk5n8fQ16'
        }*/
        host:"mail.teamrabbil.com",
        port:25,
        secure:false,
        auth:{user:"info@teamrabbil.com", pass:"~sR4[bhaC[Qs"},
        tls:{rejectUnauthorized:false}
    });
    let MailOption={
        from:"Bulk SMS system <info@teamrabbil.com>",
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }
    return await transporter.sendMail(MailOption)
}



