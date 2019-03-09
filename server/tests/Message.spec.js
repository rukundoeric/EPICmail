import Request from 'request';
import MessageModel from '../models/Message';
import {invalid_message, message , userData, userToken} from './data/data'
import { hostUrl } from './data/data'
import { apiUrlv1messages, apiUrlv1messagesUnread ,apiUrlv1messagesSent ,apiUrlv1messagesAction} from '../helpers/const';
import run from '../config/server';

describe('Message', () => {


    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    })
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })
    describe('Message Model', () => {
        it('Should Create an instance of Message',(done) => {
            expect(MessageModel).toBeDefined();
            expect(MessageModel.data.type).toBe('dataList');
            done();
        })
        it('Should Be able to add new Message',(done) => {
            MessageModel.addMessage(userData.email, message).then((res) => {
                expect(res).toBe(true);
                done();
            })
        })
        it('Should not Be able to add new Message',(done) => {
            MessageModel.addMessage(userData.email).then((res) => {
                expect(res).toBe(false);
                done();
            })
        })
        it('Should Return an Object with data list when emails found <Fetch all received email>',(done) => {
            MessageModel.getAllReceivedEmails(userData.email).then((res) => {
                expect(typeof(res)).toBe('object');
                expect(res).toBeDefined();
                expect(res[0].id).toBeDefined(); 
                expect(res[0].subject).toBeDefined();
                expect(res[0].senderId).toBeDefined();
                expect(res[0].receiverId).toBeDefined();
                expect(res[0].message).toBeDefined();
                expect(res[0].parentMessageId).toBeDefined();
                expect(res[0].status).toBeDefined();
                expect(res[0].createdOn).toBeDefined();
                done();
            })
        })
        it('Should Return null  when emails not found <Fetch all received email>',(done) => {
            MessageModel.getAllReceivedEmails('examle@gmail.com').then((res) => {
                expect(res).toEqual([]);
                done();
            })
        })
        it('Should Return an Object with data list when emails found <Fetch unread received email>',(done) => {
            MessageModel.geAlltUnReadReceivedMessages(userData.email).then((res) => {
                expect(typeof(res)).toBe('object');
                expect(res).toBeDefined();
                expect(res[0].id).toBeDefined(); 
                expect(res[0].subject).toBeDefined();
                expect(res[0].senderId).toBeDefined();
                expect(res[0].receiverId).toBeDefined();
                expect(res[0].message).toBeDefined();
                expect(res[0].parentMessageId).toBeDefined();
                expect(res[0].status).toBeDefined();
                expect(res[0].createdOn).toBeDefined();
                done();
            })
        })
        it('Should Return null  when emails not found <Fetch unRead received email>',(done) => {
            MessageModel.geAlltUnReadReceivedMessages('examle@gmail.com').then((res) => {
                expect(res).toEqual([]);
                done();
            })
        })
        it('Should Return an Object with data list when emails found <Fetch sent emails>',(done) => {
            MessageModel.getAllSentMessages(userData.email).then((res) => {
                expect(typeof(res)).toBe('object');
                expect(res).toBeDefined();
                expect(res[0].id).toBeDefined(); 
                expect(res[0].subject).toBeDefined();
                expect(res[0].senderId).toBeDefined();
                expect(res[0].receiverId).toBeDefined();
                expect(res[0].message).toBeDefined();
                expect(res[0].parentMessageId).toBeDefined();
                expect(res[0].status).toBeDefined();
                expect(res[0].createdOn).toBeDefined();
                done();
            })
        })
        it('Should Return null  when emails not found <Fetch sent emails>',(done) => {
            MessageModel.getAllSentMessages('examle@gmail.com').then((res) => {
                expect(res).toEqual([]);
                done();
            })
        })
        it('Should Return an Object  when message found <Fetch specific email record>',(done) => {
            MessageModel.getMessage(userData.email,2).then((res) => {
                expect(typeof(res)).toBe('object');
                expect(res).toBeDefined();
                expect(res.id).toBeDefined(); 
                expect(res.subject).toBeDefined();
                expect(res.senderId).toBeDefined();
                expect(res.receiverId).toBeDefined();
                expect(res.message).toBeDefined();
                expect(res.parentMessageId).toBeDefined();
                expect(res.status).toBeDefined();
                expect(res.createdOn).toBeDefined();
                done();
            })
        })
        it('Should Return null  when message not found <Fetch specific email record>',(done) => {
            MessageModel.getMessage('examle@gmail.com',2).then((res) => {
                expect(res).toEqual([]);
                done();
            })
        })
        it('Should delete a message and return true when user is sender or receiver of the message <Delete specific email record>',(done) => {
            MessageModel.deleteMessage(userData.email,2).then((res) => {
                expect(res).toBe(true);
                done();
            })
        })
        it('Should return false when failed to delete a message <Delete specific email record>',(done) => {
            MessageModel.deleteMessage(userData.email,4).then((res) => {
                expect(res).toBe(false);
                done();
            })
        })


    })
    describe('Message Routers', () => {
        let server;
        beforeAll(async (done) => {
            server = run(4040);
            done();
          })
        afterAll((done) => {
            server.close();
            done();
        })

         describe('POST  message  /messages', () => {
            it('Should Return Object with status 200 when Message saved succesful', (done) => {
                Request.post(`${hostUrl}${apiUrlv1messages}`,
                    {json:true, form: message},(err, res, body) => {
                        if(!err){
                            expect(body.data).toBeDefined();
                            expect(body.status).toBeDefined();
                            expect(body.status).toBe(200);
                            expect(body.data[0].id).toBeDefined();
                            expect(body.data[0].subject).toBeDefined();
                            expect(body.data[0].message).toBeDefined();
                            expect(body.data[0].parentMessageId).toBeDefined();
                            expect(body.data[0].status).toBeDefined();
                            done();
                        }
                })
            })
            it('Should Return Object with status 400 when Message contain some null value', (done) => {
                Request.post(`${hostUrl}${apiUrlv1messages}`,
                    {json:true, form: invalid_message},(err, res, body) => {
                        if(!err){
                            expect(body.message).toBeDefined();
                            expect(body.status).toBeDefined();
                            expect(body.status).toBe(400);
                            done();
                        }
                })
            })
         }) 

         describe('GET  all received messages  /messages', () => {
            let msgs ={};
            beforeAll(async (done) => { 
               Request.get(`${hostUrl}${apiUrlv1messages}`,
               {json: true},(err, res, body) => {
                   if(!err){
                       msgs = body;
                   }
                   done();
               })
               })
               afterAll((done) => {
                   done();
               })
   
               it('Should Return status 200', (done) => {
                   expect(msgs.status).toBe(200);
                   done();
               })
               it('Should return Object with propertys status and  data', (done) => {
                   expect(msgs.data).toBeDefined();
                   expect(msgs.status).toBeDefined();
                   done();
               })
               it('Property data must be an Object', (done) => {
                expect(msgs.data).toBeDefined();
                expect(msgs.status).toBeDefined();
                done();
               })
               it('All property Should be defined', (done) => {
                   expect(msgs.data[0].id).toBeDefined();
                   expect(msgs.data[0].subject).toBeDefined();
                   expect(msgs.data[0].message).toBeDefined();
                   expect(msgs.data[0].parentMessageId).toBeDefined();
                   expect(msgs.data[0].status).toBeDefined();
                   done();
               })
         }) 
   
         describe('GET  all unread messages  /messages/unread', () => {
            let msgs ={};
            beforeAll(async (done) => { 
                Request.get(`${hostUrl}${apiUrlv1messagesUnread}`,
                {json: true},(err, res, body) => {
                    if(!err){
                        msgs = body;
                    }
                    done();
                })
                })
                afterAll((done) => {
                    done();
                })
    
                it('Should Return status 200', (done) => {
                    expect(msgs.status).toBe(200);
                    done();
                })
                it('Should return Object with propertys status and  data', (done) => {
                    expect(msgs.data).toBeDefined();
                    expect(msgs.status).toBeDefined();
                    done();
                })
                it('Property data must be an Object', (done) => {
                expect(msgs.data).toBeDefined();
                expect(msgs.status).toBeDefined();
                done();
                })
                it('All property Should be defined', (done) => {
                    expect(msgs.data[0].id).toBeDefined();
                    expect(msgs.data[0].subject).toBeDefined();
                    expect(msgs.data[0].message).toBeDefined();
                    expect(msgs.data[0].parentMessageId).toBeDefined();
                    expect(msgs.data[0].status).toBeDefined();
                    done();
                })
        }) 

        describe('GET  all Sent messages  /messages/sent', () => {
            let msgs ={};
            beforeAll(async (done) => { 
                Request.get(`${hostUrl}${apiUrlv1messagesSent}`,
                {json: true},(err, res, body) => {
                    if(!err){
                        msgs = body;
                    }
                    done();
                })
                })
                afterAll((done) => {
                    done();
                })
    
                it('Should Return status 200', (done) => {
                    expect(msgs.status).toBe(200);
                    done();
                })
                it('Should return Object with propertys status and  data', (done) => {
                    expect(msgs.data).toBeDefined();
                    expect(msgs.status).toBeDefined();
                    done();
                })
                it('Property data must be an Object', (done) => {
                expect(msgs.data).toBeDefined();
                expect(msgs.status).toBeDefined();
                done();
                })
                it('All property Should be defined', (done) => {
                    expect(msgs.data[0].id).toBeDefined();
                    expect(msgs.data[0].subject).toBeDefined();
                    expect(msgs.data[0].message).toBeDefined();
                    expect(msgs.data[0].parentMessageId).toBeDefined();
                    expect(msgs.data[0].status).toBeDefined();
                    done();
                })
         }) 

        describe('GET  specified  /messages/id:1', () => {
            let msgs ={};
            beforeAll(async (done) => { 
                Request.get(`${hostUrl}${apiUrlv1messages}/1`,
                {json: true},(err, res, body) => {
                    if(!err){
                        msgs = body;
                    }
                    done();
                })
                })
                afterAll((done) => {
                    done();
                })
    
                it('Should Return status 200', (done) => {
                    expect(msgs.status).toBe(200);
                    done();
                })
                it('Should return Object with propertys status and  data', (done) => {
                    expect(msgs.data).toBeDefined();
                    expect(msgs.status).toBeDefined();
                    done();
                })
                it('Property data must be an Object', (done) => {
                expect(msgs.data).toBeDefined();
                expect(msgs.status).toBeDefined();
                done();
                })
                it('All property Should be defined', (done) => {
                    expect(msgs.data.id).toBeDefined();
                    expect(msgs.data.subject).toBeDefined();
                    expect(msgs.data.message).toBeDefined();
                    expect(msgs.data.parentMessageId).toBeDefined();
                    expect(msgs.data.status).toBeDefined();
                    done();
                })
         }) 

        describe('DELETE  specified message  /messages/id:1', () => {
            let msgs ={};
            beforeAll(async (done) => { 
                Request.delete(`${hostUrl}${apiUrlv1messages}/1`,
                {json: true},(err, res, body) => {
                    if(!err){
                        msgs = body;     
                    }
                    done();
                })
                })
                afterAll((done) => {
                    done();
                })
    
                it('Should Return status 200', (done) => {
                    expect(msgs.status).toBe(200);
                    done();
                })
                it('Should return Object with propertys status and  data', (done) => {
                    expect(msgs.data).toBeDefined();
                    expect(msgs.status).toBeDefined();
                    done();
                })
                it('Property data must be an Object', (done) => {
                expect(msgs.data).toBeDefined();
                expect(msgs.status).toBeDefined();
                done();
                })
                             
         }) 
       
    })
    
})