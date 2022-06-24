const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naveengamerlg2@gmail.com',
    pass: 'ouep xiwb qctk jdys'
  }
});

const mailOptions = {
  from: 'naveengamerlg2@gmail.com',
  to: 'naveenkumar.a@tringapps.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});