import nodemailer from 'nodemailer'
export const mailer=async({Email,OTP})=>{
    
  // Let's Create a SMTP transpoter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    });

    // Let's create a email option whom to send and what to send
    const mailOptions = {
        from: `Sunil kumar ${process.env.EMAIL}`,
        to: Email,
        subject: "Here's your OTP",
        html: `<div> <h1>Dear Customer</h1>, Here's your OTP.it will be valid for 10 minutes.<p>${OTP}</p>Here's your OTP.it will be valid for 10 minutes.Here's your OTP.it will be valid for 10 minutes.</div> `,
        // text: `Welcome to Email `,
    };
// Let's Send email to user defined email
    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log('Email sent: ' + info.response);
        
        // return ('Email sent: ' + info.response);
        return ("OTP send successfully..");
    } catch (error) {
        // console.error(error);
        return ('Error sending OTP.');
    }   
}