import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ST from '../../helpers/status';
import handlebars from 'handlebars';
import fs from 'fs';
dotenv.config();
 class verfication{
      constructor(){
      }
      async sendVerification(req, res){
            let readHTMLFile = function(path, callback) {
                fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
                    if (err) {
                        throw err;
                        callback(err);
                    }
                    else {
                        callback(null, html);
                    }
                });
            };
            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EPIC_MAIL_USER,
                    pass: process.env.EPIC_MAIL_PASSWORD
                }
            });
            readHTMLFile(__dirname + '../../../../UI/html/verification.html', function(err, html) {
                var template = handlebars.compile(html);
                var replacements = {
                    code: `${req.mail.v_code}`
                };
                var htmlToSend = template(replacements);
                let mailOptions = {
                    from: `EPICmail`, 
                    to: `${req.mail.email}`, 
                    subject: " Verification", 
                    text: `${req.mail.v_code}`, 
                    html:  htmlToSend 
                };
                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    res.status(ST.CREATED).send({
                        "status":ST.CREATED,
                        "data": {"message":`Account created successful. verification code has been sent to your email <${req.mail.email}>`}
                    });
                    //  res.render('index');
                });
            });
      }
 }
 export default new verfication();