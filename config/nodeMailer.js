
const nodemailer = require('nodemailer');
 
 
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'satgun041@gmail.com',
        pass: 'jlqsukidbnrtsumf'
    }
});
 
let mailDetails = {
    from: 'satgun041@gmail.com',
    to: 'guneetk404@gmail.com',
    subject: 'Order details',
    text: 'Order has been placed'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});