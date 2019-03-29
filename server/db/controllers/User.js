import moment from 'moment';
import uuidv4 from 'uuid/v4';
import verification_code from 'generate-sms-verification-code';
import joi from 'joi';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import auth from '../middleware/auth';
import {
  CREATE_USER,
  VERIFIE_USER,
  GET_USER,
  GET_VERIFICATION,
  CREATE_VERFICATION,
  DELETE_VERIFICATION,
  USER_PASSWORD_RESET 
} from '../helpers/query';
import Helper from '../../helpers/Helper';
import validation from '../../helpers/validation';
import db from '../db';

class User {

  async signup(req, res, next) {
    joi.validate(req.body, validation.Validator.userSchema).then(() => {
      Helper.hashPassword(req.body.password).then((pass) => {
        const code = verification_code(8, { type: 'number' });
        const values = [uuidv4(), req.body.firstName, req.body.lastName, req.body.email, pass, moment(new Date()), moment(new Date()), false];
        const v_values = [req.body.email, code];
        db.query(CREATE_USER, values).then(() => {
          db.query(CREATE_VERFICATION, v_values).then(() => {
            req.mail = { v_code: code, email: req.body.email };
            next();
          });
        }).catch((err) => {
          if (err.routine === '_bt_check_unique') {
            res.status(ST.BAD_REQUEST).send({
              'status': ST.BAD_REQUEST,
              'error': MSG.MSG_USER_ALREAD_EXIST,
            });
          }
        });
      });
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
          } else if (verfication.rows[0].code === req.params.code) {
            db.query(VERIFIE_USER, [req.params.email]).then(() => {
              db.query(DELETE_VERIFICATION, [req.params.email]).then(() => {
                auth.generateToken(user.rows[0].id).then((token) => {
                  res.status(ST.CREATED).send({
                    status: ST.CREATED,
                    data: {
                      message: 'Account verified successfuly',
                      token: token,
                    },
                  });
                });
              });
            });
          } else {
            res.status(ST.BAD_REQUEST).send({
              status: ST.BAD_REQUEST,
              error: { message: 'Invalid Verification code' },
            });
          }
        });
      }
    });
  }

  async login(req, res) {
    joi.validate(req.body, validation.Validator.loginSchema).then(() => {
      db.query(GET_USER, [req.body.email]).then((user) => {
        if (!user.rows[0]) {
          return res.status(ST.NOT_FOUND).send({
            status: ST.NOT_FOUND,
            error: { message: 'User not registered' },
          });
        }
        Helper.isCorrestPassword(req.body.password, user.rows[0].password).then((result) => {
          if (result) {
            auth.generateToken(user.rows[0]).then((token) => {
              res.status(ST.OK).send({
                status: ST.OK,
                data: {
                  message: 'User logged in successfuly',
                  token,
                  user: user.rows[0],
                },
              });
            });
          } else {
            return res.status(ST.BAD_REQUEST).send({
              status: ST.BAD_REQUEST,
              error: { message: 'Incorrect password' },
            });
          }
        });
      
      });
    }).catch(error => res.send({
      status: 400,
      error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
    }));

  }
  // Password reset
  async passwordReset(req, res, next){
    joi.validate(req.body, validation.Validator.passwordResetShema).then(() => {
      db.query(GET_USER, [req.body.email]).then((user) => {
        if(!user.rows[0]){
          return res.status(ST.NOT_FOUND).send({
            'status': ST.NOT_FOUND,
            'error': {'message':'User not registered'}
          });
        } else {
          req.mail={id: user.rows[0].id, email:req.body.email};
          next();
        }
      });
    }).catch(error => res.send({
      'status': 400,
      'error' : {'message': error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
    }));
  }
  // Confirm password reset
  async confirmpasswordReset(req, res){
    joi.validate(req.body, validation.Validator.passwordShema).then(() => {
      Helper.hashPassword(req.body.newPassword).then((pass) => {
        db.query(USER_PASSWORD_RESET,[pass,req.params.userid]).then(() => {   
          return res.status(ST.CREATED).send({
            'status': ST.CREATED,
            'data': {'message':'Password changed successfuly'}
          });
        });
      });
    }).catch(error => res.send({
      'status': 400,
      'error' : {'message': error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
    }));
  }
}
export default new User();
