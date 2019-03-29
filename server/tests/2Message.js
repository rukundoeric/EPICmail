/* eslint-disable no-undef */
import Request from 'request';
import run from '../config/server';
import ST from '../helpers/status';
import { hostUrl,
  message} from './data/data';
import { apiUrlv2authLogin } from '../helpers/const';
import db from '../db/db';
import {
  apiUrlv2messages, 
  apiUrlv2messagesUnread,
  apiUrlv2messagesSent, 
} from '../helpers/const';

import { expect } from 'chai';
describe('Message:', () => {
  let server;
  let userToken;
  let user;
  let messageCreated;
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
  describe('POST Send Message /messages:', () => {
    it('Should Return Object with 400 for null token', (done) => {
      Request.post(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':undefined,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('error');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
          }
          done();
        });
    });
    it('Should Return Object with 400 for invalid token', (done) => {
      Request.post(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}jhcdjcdjgc`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('error');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
          }
          done();
        });
    });
    it('Should Return Object with 400 when you send a message to unregisted email', (done) => {
      const message_Unregistered_email =   {
        'subject': 'Invitaion to mariage',
        'message': 'Hello there ',
        'to': 'example12357464trk@gmail.com',
        'status': 'sent'
      };
      Request.post(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message_Unregistered_email},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          }
          done();
        });
    });
    it('Should Return Object with 400 for invalid inputs', (done) => {
      const message_Unregistered_email =   {
        'subject': '',
        'message': 'Hello there ',
        'to': 'example12357464trk@gmail.com',
        'status': 'sent'
      };
      Request.post(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message_Unregistered_email},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.BAD_REQUEST);
            expect(body).to.have.property('error');
          
          }
          done();
        });
    });
    it('Should Return Object with 201 When message sent successfuly', (done) => {
      Request.post(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.CREATED);
            expect(body).to.have.property('data'); 
            messageCreated = body.data;  
          }
          done();
        });
    });
  });
  describe('GET get all received messages /messages:', () => {
    it('Should Return Object with status 200 when messages found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });
  describe('GET get all unread received messages /messages/unread:', () => {
    it('Should Return Object with status 200 when unread messages found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messagesUnread}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });
  describe('GET get all sent messages /messages/sent:', () => {
    it('Should Return Object with status 200 when sent messages found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messagesSent}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });

  describe('GET specific message /messages/:id', () => {
    it('Should Return Object with status 404 when message not found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messages}/30000`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 200 when message found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messages}/${messageCreated.id}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });
  describe('DELETE specific message /message/:id', () => {
    it('Should Return Object with status 404 when message not found', (done) => {
      Request.delete(`${hostUrl}${apiUrlv2messages}/30000`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 200 when message found', (done) => {
      Request.delete(`${hostUrl}${apiUrlv2messages}/${messageCreated.id}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.OK);
            expect(body).to.have.property('data');   
          }
          done();
        });
    });
  });
  describe('GET  messages not found:', () => {
    it('Should Return Object with status 404 when messages not found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messages}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 404 when unread messages not found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messagesUnread}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
    it('Should Return Object with status 404 when sent messages not found', (done) => {
      Request.get(`${hostUrl}${apiUrlv2messagesSent}`,
        {json:true, headers: {
          'epic-mail-access-token':`${userToken}`,
        },form: message},(err, res, body) => {
          if(!err){
            expect(body).to.be.an('object');
            expect(body).to.have.property('status').eql(ST.NOT_FOUND);
            expect(body).to.have.property('error');   
          }
          done();
        });
    });
  });
});