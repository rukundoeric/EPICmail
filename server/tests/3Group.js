/* eslint-disable no-undef */
import Request from 'request';
import { expect } from 'chai';
import run from '../config/server';
import ST from '../helpers/status';
import db from '../db/db';
import { hostUrl} from './data/data';
import { 
  apiUrlv2authLogin, 
  apiUrlv2createGroup} from '../helpers/const';
import {
  DELETE_TEST_USER,
  DELETE_ALL_TEST_INBOX,
  DELETE_ALL_TEST_MESSAGES,
  DELETE_ALL_TEST_SENT, 
  DELETE_ALL_G_TEST_MESSAGES} from '../db/helpers/query';
describe('Group:', () => {
  let server;
  let userToken;
  let user;
  let Group;
  let createdMessage;
  before(async (done) => {
    server = run(4040);
    done();
  });
  after(async (done) => {
    server.close();
    done();
  });

  describe('POST User Login auth/login:', () => {
    it('Should Return Object with status 200', (done) => {
      Request.post(`${hostUrl}${apiUrlv2authLogin}`,
        {json:true, form: {email: 'example123@gmail.com',password:'Eric12345'}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');
            userToken = body.data.token;
            user=body.data.user;
          }
          done();
        });
    }); 
  });
  describe('POST Create Group /groups:', () => {
    it('Should Return Object with status 400 when invalid inputs', (done) => {
      Request.post(`${hostUrl}${apiUrlv2createGroup}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form:  {name:''}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 201 when Group created successful', (done) => {
      Request.post(`${hostUrl}${apiUrlv2createGroup}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form:  {name:'TestGroup'}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data');   
            Group = body.data;
          }
          done();
        });
    });
  });
  describe('POST Add user to the Group', () => {
    it('Should Return Object with status 201 when successeded', (done) => {
      Request.post(`${hostUrl}${apiUrlv2createGroup}/${Group.id}/users/${user.id}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form:  {name:''}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });
  describe('PATCH Update Group Name /groups/:id:', () => {
    it('Should Return Object with status 400 when invalid inputs', (done) => {
      Request.patch(`${hostUrl}${apiUrlv2createGroup}/${Group.id}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form:  {name:''}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 404 when Group Not found', (done) => {
      Request.patch(`${hostUrl}${apiUrlv2createGroup}/3000000`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form:  {name:'Musician'}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 201 when Group Renamed successfuly', (done) => {
      Request.patch(`${hostUrl}${apiUrlv2createGroup}/${Group.id}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form:  {name:'Musician'}},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });
  describe('POST Send Message to group /group/:id', () => {
    it('Should Return Object with status 400 for invalid inputs', (done) => {
      const message = {
        'subject': '',
        'message': 'Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!',
        'status': 'sent'
      };
      Request.post(`${hostUrl}${apiUrlv2createGroup}/${Group.id}/messages`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error'); 
          }
          done();
        });
    });
    it('Should Return Object with status 201 When message sent successfuly', (done) => {
      const message = {
        'subject': 'TestMessage',
        'message': 'Hello guys, we would to invite you to our mariage celemony which will take place at kacyiro suday pack 11:00 am, Thank you!',
        'status': 'sent'
      };
      Request.post(`${hostUrl}${apiUrlv2createGroup}/${Group.id}/messages`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data'); 
            createdMessage = body.data;
          }
          done();
        });
    });
  });
  describe('DELETE Delete Group', () => {
    it('Should Return Object with status 404 when group not found', (done) => {
      Request.delete(`${hostUrl}${apiUrlv2createGroup}/3000`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        }},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error'); 
          }
          done();
        });
    });
    it('Should Return Object with status 200 group deleted successfuly', (done) => {
      Request.delete(`${hostUrl}${apiUrlv2createGroup}/${Group.id}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        }},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');
          }
          done();
        });
    });
  });
  // describe('DELETE Remove user to the Group', () => {
  //   it('Should Return Object with status 200 when successeded', (done) => {
  //     Request.delete(`${hostUrl}${apiUrlv2createGroup}/${Group.id}/users/${user.id}`,
  //       {json:true, headers: {
  //         'epic-mail-access-token':`${userToken}`,
  //       },form:  {name:''}},(err, res, body) => {
  //         if(!err){
  //           expect(body).to.be.an('object');
  //           expect(body).to.have.property('status').eql(ST.OK);
  //           expect(body).to.have.property('data');   
  //         }
  //         done();
  //       });
  //   });
  // });
});