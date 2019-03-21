import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import handlebars from 'handlebars';
import fs from 'fs';
import ST from '../../helpers/status';
import { verification_link_development, verification_link_production } from '../../helpers/const';

dotenv.config();
const link = process.env.NODE_ENV ? verification_link_production : verification_link_development;
class verfication {

  async sendVerification(req, res) {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
      });
    };
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EPIC_MAIL_USER,
        pass: process.env.EPIC_MAIL_PASSWORD,
      },
    });
    readHTMLFile('app/UI/html/verification.html', (err, html) => {
        var template = handlebars.compile(html);
        var replacements = {
            link: `${link}/${req.mail.email}/${req.mail.v_code}`
        };
        var htmlToSend = template(replacements);
        let mailOptions = {
            from: `EPICmail`, 
            to: `${req.mail.email}`, 
            subject: " Verification", 
            text: `${link}/${req.mail.email}/${req.mail.v_code}`, 
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
