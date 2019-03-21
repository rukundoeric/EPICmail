import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import verification_code from 'generate-sms-verification-code';
import joi from 'joi';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import auth from '../middleware/auth';
import connection from '../connection/connection';
const pool = connection.getPoolConnection();
import {
 CREATE_USER_TABLE,
  CREATE_USER,
  VERIFIE_USER,
  GET_USER,
  GET_VERIFICATION,
  CREATE_VERFICATION,
  DELETE_VERIFICATION 
} from '../helpers/query';
import Helper from '../../helpers/Helper';
import validation from '../../helpers/validation';
import db from '../db';

class User {

  async signup(req, res, next) {
    joi.validate(req.body, validation.Validator.userSchema).then((result) => {
      try {
        Helper.hashPassword(req.body.password).then((pass) => {
          const code = verification_code(8, { type: 'number' });
          const values = [uuidv4(), req.body.firstName, req.body.lastName, req.body.email, pass, moment(new Date()), moment(new Date()), false];
          const v_values = [req.body.email, code];
          db.query(CREATE_USER, values).then(() => {
            db.query(CREATE_VERFICATION, v_values).then((result) => {
              req.mail = { v_code: code, email: req.body.email };
              next();
            });
          });
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(ST.BAD_REQUEST).send({
            status: ST.BAD_REQUEST,
            error: MSG.MSG_USER_ALREAD_EXIST,
          });
        }
      }
    }).catch(error => res.send({
      status: 400,
      error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
    }));
  }

  async account_verification(req, res) {
    db.query(GET_USER, [req.params.email]).then((user) => {
      if (!user.rows[0]) {
        res.status(ST.BAD_REQUEST).send({
          status: ST.BAD_REQUEST,
          error: { message: 'User not verified' },
        });
      } else {
        db.query(GET_VERIFICATION, [req.params.email]).then((verfication) => {
          if (!verfication.rows[0]) {
            res.status(ST.BAD_REQUEST).send({
              status: ST.BAD_REQUEST,
              error: { message: 'Invalid Verification' },
            });
          } else if (verfication.rows[0].code == req.params.code) {
            db.query(VERIFIE_USER, [req.params.email]).then((result) => {
              db.query(DELETE_VERIFICATION, [req.params.email]).then((result) => {
                auth.generateToken(user.rows[0].id).then((token) => {
                  res.status(ST.CREATED).send({
                    'status': ST.CREATED,
                    'data': {
                      'message': 'Account verified successfuly',
                      'token': token 
},
                  });
                });
              });
            });
          }else {
            res.status(ST.BAD_REQUEST).send({
              'status': ST.BAD_REQUEST,
              'error': { message: 'Invalid Verification' },
            });
          }
        });
      }
    });
  }

  async login(req, res) {
    pool.connect((err) => {
      if(!err){
        joi.validate(req.body, validation.Validator.loginSchema).then((result) => {
          db.query(GET_USER, [req.body.email]).then((user) => {
            if (!user.rows[0]) {
              return res.status(ST.NOT_FOUND).send({
                'status': ST.NOT_FOUND,
                'error': { 'message': 'User not registered' },
              });
            }
            Helper.isCorrestPassword(req.body.password, user.rows[0].password).then((result) => {
              if (result) {
                auth.generateToken(user.rows[0]).then((token) => {
                  res.status(ST.OK).send({
                    status: ST.OK,
                    data: {
                      message: 'User logged in successfuly',
                      token: token
                    },
                  });
                });
              } else{
                return res.status(ST.BAD_REQUEST).send({
                  status: ST.BAD_REQUEST,
                  'error': { message: 'Incorrect password' },
                });
              }
            });
          });
        }).catch(error => res.send({
          status: 400,
          error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
        }));
      }else{
        console.log("Database Not Connected");
      }
    })
   
  }
}
export default new User();
