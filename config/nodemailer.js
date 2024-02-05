const { render } = require("ejs");
const nodemailer=require("nodemailer");


let transporter=nodemailer.createTransport({//sends email
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,//for tcl
    secure:false,
    auth:{
        user:'xyz@gmail.com',
        pass:'1'
    }
});

//this will place files in views
let renderTemplate=(data,relativePath)=>{//relative path from eher ethe mail is sent
    let mailHTML;
    ejs.renderFile(
        path.JOIN(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate: renderTemplate
}
