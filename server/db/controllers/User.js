import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import verification_code from 'generate-sms-verification-code';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import auth from '../middleware/auth' 
import { CREATE_USER_TABLE, CREATE_USER , CREATE_VERFICATION,VERIFICATIONS_TABLE,GET_VERIFICATION,DELETE_VERIFICATION,VERIFIE_USER} from '../helpers/query';
import connection from '../connection/connection';
import joi from 'joi';
import Helper from '../../helpers/Helper';
import validation from '../../helpers/validation';
import db from '../db';
const pool = connection.getPoolConnection();
class User {
     constructor(){ 
     }
     async signup(req, res, next){
        joi.validate(req.body, validation.Validator.userSchema).then((result) => {
            try{
              Helper.hashPassword(req.body.password).then((pass) => {
                    let code = verification_code(8, {type: 'number'}); 
                    const values = [uuidv4(),req.body.firstName,req.body.lastName,req.body.email,pass,moment(new Date()),moment(new Date()),false];
                    const v_values = [req.body.email,code];
                    db.query(CREATE_USER, values).then(() => {
                        db.query(CREATE_VERFICATION,v_values).then(() => {
                           req.mail={v_code: code,email:req.body.email}
                           next();
                        });
                    });
                })
              }catch(error){
                  if (error.routine === '_bt_check_unique') {
                    return res.status(ST.BAD_REQUEST).send({
                      "status": ST.BAD_REQUEST,
                      "error": MSG.MSG_USER_ALREAD_EXIST
                    })
                  }
              }
        }).catch(error => res.send({
          "status": 400,
          "error" : {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
      }));
     } 
     async account_verification(req, res){
      joi.validate(req.body, validation.Validator.verificationSchema).then((result) => {
          const { rows } = await db.query(GET_VERIFICATION, [req.body.email]);
          if(!rows[0]){
                res.status(ST.BAD_REQUEST).send({
                  "status": ST.BAD_REQUEST,
                  "error": {"message":"Please signup to get verification code"}
                });
          }else{
              if(rows[0].code == req.body.code){
                  await db.query(DELETE_VERIFICATION,[req.body.email]);
                  await db.query(VERIFIE_USER,[req.body.email]);
                  const { rows } = await db.query(GET_USER,[req.body.email]);
                  const token = auth.generateToken(rows[0].id);
                  res.status(ST.CREATED).send({
                    "status": ST.CREATED,
                    "data": {"token":token}
                  });
              }else{
                  res.status(ST.BAD_REQUEST).send({
                    "status": ST.BAD_REQUEST,
                    "error": {"message":"Incorrect verification code"}
                  });
              }
          }
      }).catch(error => res.status(ST.BAD_REQUEST).send({
          "status": ST.BAD_REQUEST,
          "error": {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
      }));
     }
}
export default new User();