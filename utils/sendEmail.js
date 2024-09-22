import nodeMailer from "nodemailer";
export const sendEmail=async (email,subject,message)=>{
const transporter=nodeMailer.createTransport({
    host:process.env.SMPTP_HOST,
    service:process.env.SMPTP_SERVICE,
    port:process.env.SMPTP_PORT,
    auth:{
        user:process.env.SMPTP_MAIL,
        pass:process.env.SMPTP_PASSWORD
    }
})


 const options={
    from:process.env.SMPTP_MAIL,
    to:email,
    subject:subject,
    text:message
 }
 await transporter.sendMail(options);
}