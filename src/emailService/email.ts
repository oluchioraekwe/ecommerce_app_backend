import nodemailer from 'nodemailer';
//const nodemailer = reqiure('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sofwaredeveloper.testing@gmail.com',
    pass: 'res.status(201)'
  }
});

const verifyAccount = (email: string, body: string) => {
  let mailOptions = {
    from: 'Validate User',
    to: email,
    subject: 'Account verification link',
    html: body
  };

  return transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) {
      console.log(`Error Occurs ${err}`);
    }
    console.log(`Email sent! ${data}`);
    console.log(data);
  });
};

export default verifyAccount;
