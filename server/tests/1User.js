/* eslint-disable no-undef */
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import Request from 'request';
import run from '../config/server';
import ST from '../helpers/status';
import db from '../db/db';
import dbtableCreate from '../db/migration/db';
import Helper from '../helpers/Helper';
import { hostUrl,
  wrongNewUser, 
  testUser,
  newUser, 
  loginUser,
  loginUserWrongPass,
  loginUserNotFound,
  loginUserInvalidInput} from './data/data';
import {
  CREATE_USER,
  GET_VERIFICATION,
} from '../db/helpers/query';
import {
  apiUrlv2authSignup,
  apiUrlv2authLogin,
  apiUrlv2passwordReset
} from '../helpers/const';
import { expect } from 'chai';
describe('User:', () => {
  let server;
  let userId=uuidv4();
  before(async (done) => {
    server = run(4040);
    dbtableCreate.createTables().then(() => {
      Helper.hashPassword(testUser.password).then((pass) => {
        const values = [userId, testUser.firstName, testUser.lastName, testUser.email, pass, moment(new Date()), moment(new Date()), true];
        db.query(CREATE_USER,values);
      });
    });
    done();
  });
  after((done) => {
    server.close();
    done();
  });  
  describe('POST User Signup /auth/signup:',() => {  
    it('Should Return Error for wrong Inputs', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authSignup}`,
        {json:true, form: wrongNewUser},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
          }
          done();
        });               
    });
    it('Should Return Error when user alread exists', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authSignup}`,
        {json:true, form: testUser},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
          }
          done();
        });               
    });
    it('Should Return an Object  when user created successfuly', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authSignup}`,
        {json:true, form: newUser},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data');
          }
          done();
        });               
    });
  });
  describe('POST Account verfication /auth/verifier:',() => {
    it('Should Return Object with status 400 for invalid inputs', (done) => {
      const link = `${hostUrl}${apiUrlv2authSignup}/example123456@gmail.com/345353553`;
      Request.post(`${link}`,
        {json:true}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        });
    });
    it('Should Return Object with status 400 when code is invalid', (done) => {
      db.query(GET_VERIFICATION, [newUser.email]).then(() => {
        const link = `${hostUrl}${apiUrlv2authSignup}/${newUser.email}/345353553`;
        Request.post(`${link}`,
          {json:true}, (err, res, body) => {
            if(!err){
              expect(body).to.be.an('object');
              expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
              expect(body).to.have.property('error');
            }
            done();
          });
      });
    });
    it('Should Return Object with status 400 when Verification not exist', (done) => {
      const link = `${hostUrl}${apiUrlv2authSignup}/${testUser.email}/45456464}`;
      Request.post(`${link}`,
        {json:true}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        }); 
    });
    it('Should Return Object with status 201 when verified successfuly', (done) => {
      db.query(GET_VERIFICATION, [newUser.email]).then((verfication) => {
        const link = `${hostUrl}${apiUrlv2authSignup}/${newUser.email}/${verfication.rows[0].code}`;
        Request.post(`${link}`,
          {json:true}, (err, res, body) => {
            if(!err){
              expect(body).to.be.an('object');
              expect(body).to.have.property('status').eql(ST.CREATED);
              expect(body).to.have.property('data');
            }
            done();
          });
      });
    });
 
  });
  describe('POST User Login /auth/signup:', () => {
    it('Should Return Object with status 200', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authLogin}`,
        {json:true, form: loginUser},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');
          }
          done();
        });
    }); 
    it('Should Return Object with status 400 when password is wrong', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authLogin}`,
        {json:true, form: loginUserWrongPass},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        });
    }); 
    it('Should Return Object with status 404 when user not found', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authLogin}`,
        {json:true, form: loginUserNotFound},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');
          }
          done();
        });
    });
    it('Should Return Object with status 400 for wrong inputs', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authLogin}`,
        {json:true, form: loginUserInvalidInput},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        });
    });
  });
  describe('POST User reset /auth/reset', () => {
    it('Sould Return Object with status 400 for wrong inputs', (done) => {
      Request.post(`${hostUrl}${apiUrlv2passwordReset}`,
        {json:true, form: {email: 'dcdjcgdjucgjd'}}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        });
    });
    it('Sould Return Object with status 404 when user not found', (done) => {
      Request.post(`${hostUrl}${apiUrlv2passwordReset}`,
        {json:true, form: {email: 'example123456789@gmail.com'}}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');
          }
          done();
        });
    });
    it('Sould Return Object with status 201 when reset message sent', (done) => {
      Request.post(`${hostUrl}${apiUrlv2passwordReset}`,
        {json:true, form: {email: 'example123@gmail.com'}}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data');
          }
          done();
        });
    });
  });
  describe('POST User confirm password reset /auth/reset/', () => {
    it('Sould Return Object with status 400 for invalid inputs', (done) => {
      Request.post(`${hostUrl}${apiUrlv2passwordReset}/${userId}`,
        {json:true, form: {newPassword: '123'}}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        }); 
    });
    it('Sould Return Object with status 200 for invalid inputs', (done) => {
      Request.post(`${hostUrl}${apiUrlv2passwordReset}/${userId}`,
        {json:true, form: {newPassword: 'Eric12345'}}, (err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data');
            //db.query(DELETE_TEST_USER, ['example']);
          }
          done();
        }); 
    });
  });
});