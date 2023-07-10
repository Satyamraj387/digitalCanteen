
const nodemailer = require('nodemailer');
 
 
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'satgun041@gmail.com',
        pass: 'jlqsukidbnrtsumf'
    }
});
 
let mailDetails = {
    from: 'satyams@argusoft.com',
    to: 'satyamraj387@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});