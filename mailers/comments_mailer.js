const nodeMailer=require('../config/nodemailer');


//anther way of exporting function
exports.newComment=(comment)=>{
    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from:'jayarke890@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:'<h1>Yup, you mail is Published!</h1>'
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}