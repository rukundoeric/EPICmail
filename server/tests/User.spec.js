import Request from 'request';
import run from '../config/server';
import UserModel from '../models/User';
import {hostUrl, userDetail, loginUser,userData ,userToken, loginUserWrongPass} from './data/data';
import {apiUrlv1authLogin, apiUrlv1authSignup} from '../helpers/const'
import Message from '../models/Message';
import User from '../controllers/User';
describe('User', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    describe('User Model', () => {
        
        it('Should Create an instance of User', (done) => {
            expect(UserModel.data.type).toBe('dataList');
            done();
        })
        it('Should Be able to add new User',(done) => {
            UserModel.addUser(userDetail).then((res) => {
                expect(res).toBe(true);
                done();
            }).catch(() => done());
        })
        it('Should Return an Object, when user exist <Search by Email>',(done) => {
            UserModel.getUserByEmail('ericrukundo005@gmail.com').then((res) => {
            expect(res).toBeDefined();
            expect(typeof(res)).toBe("object");
            done();
            }).catch(() => done());
        })
        it('Should Return an Object, when user exist <Search by Id>',(done) => {
            UserModel.getUserById(6).then((res) => {
            expect(res).toBeDefined();
            expect(typeof(res)).toBe("object");
            expect(res.id).toBeDefined();
            expect(res.firstName).toBeDefined();
            expect(res.lastName).toBeDefined();
            expect(res.password).toBeDefined();
            done();
            }).catch(() => done());
        })
        it('Should Return an Integer, when user exist Or Return null when not exist <get User Id By Email>', (done) => {
            UserModel.getUserIdByEmail('ericrukundo005@gmail.com').then((res) => {
                 if(!res){
                     expect(res).toBe(undefined);
                 }else{
                    expect(typeof(res)).toBe('number');
                }
                done();
            }).catch(() => done());
        }) 
        it('Should Return null, when user not exist <Search by Email>',(done) => {
            UserModel.getUserByEmail('example@gmail.com').then((res) => {
            expect(res).toBe(undefined);
            done();
            }).catch(() => done());
        })
        it('Should Return null, when user not exist <Search by Id>',(done) => {
            UserModel.getUserById(8).then((res) => {
            expect(res).toBe(undefined);
            done();
            }).catch(() => done());;
        })
       
        it('Should Return a list of all Users Or Return Null when there is no any User record found', (done) => {
            UserModel.getAllUsers().then((res) => {
                if (res.length > 0){
                expect(typeof(res)).toBe('object');    
                expect(res[0].id).toBeDefined();
                expect(res[0].email).toBeDefined();
                expect(res[0].firstName).toBeDefined();
                expect(res[0].lastName).toBeDefined();
                expect(res[0].password).toBeDefined();
                expect(res[0].createdOn).toBeDefined();
                }else{
                expect(res).toBe([]);
                }
                done();
            }).catch(() => done())    
        })
    
    })
    
   describe('User Routers', () => {
        let server;
        beforeAll(async (done) => {
          server = run(4040);
          done();
        })
        afterAll((done) => {
            server.close();
            done();
        })
       describe('POST User Signup /auth/signup',() => {  
           it('Should Return an Object with status 201 and property token when created user succesful', (done) => {
            Request.post(`${hostUrl}${apiUrlv1authSignup}`,
            {json:true, form: userData},(err, res, body) => {
                if(!err){
                    expect(body.data).toBeDefined();
                    expect(body.status).toBe(201);
                }
                done();
            })               
            })
       })

       describe('POST User Login /auth/login',() => {   
            it('Should Return an Object with status 200 when User Login Succesful', (done) => {
                Request.post(`${hostUrl}${apiUrlv1authLogin}`,
                {json:true, headers: {
                    Authorization: `Bearer ${userToken}`,
                  }, form: loginUser},(err, res, body) => {
                    if(!err){
                        expect(body.status).toBe(200);
                        expect(body.data).toBeDefined();
                    }
                    done();
                })
               
            })
            it('Should Return an Object with status 400 when null Inputs', (done) => {
                Request.post(`${hostUrl}${apiUrlv1authLogin}`,
                {json:true, headers: {
                    'Authorisation' : `${userToken}`,
                  }, form: {email:null,password:null}},(err, res, body) => {
                    if(!err){
                        expect(body.status).toBe(400);
                        expect(body.message).toBeDefined();
                    }
                    done();
                })
               
            })
            it('Should Return an Object with status 400 when invalid email', (done) => {
                Request.post(`${hostUrl}${apiUrlv1authLogin}`,
                {json:true, headers: {
                    'Authorisation' : `${userToken}`,
                  }, form: {email:'ericprestrein',password:'130852'}},(err, res, body) => {
                    if(!err){
                        expect(body.status).toBe(400);
                        expect(body.message).toBeDefined();
                    }
                    done();
                })
               
            })
            it('Should Return an Object with status 404 when email not found', (done) => {
                Request.post(`${hostUrl}${apiUrlv1authLogin}`,
                {json:true, headers: {
                    'Authorisation' : `${userToken}`,
                  }, form: {email:'ericmakuza@gmail.com',password:'130852'}},(err, res, body) => {
                    if(!err){
                        expect(body.status).toBe(404);
                        expect(body.message).toBeDefined();
                    }
                    done();
                })
               
            })
            it('Should Return an Object with status 200 and property message when password is wrong', (done) => {
                Request.post(`${hostUrl}${apiUrlv1authLogin}`,
                {json:true, headers: {
                    'Authorisation' : `${userToken}`,
                  }, form: loginUserWrongPass},(err, res, body) => {
                    if(!err){
                        expect(body.status).toBe(200);
                        expect(body.message).toBeDefined();
                    }
                    done();
                })
               
            })
        })
   })

});
