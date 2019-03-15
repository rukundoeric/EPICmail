import moment from 'moment';
import uuidv4 from 'uuid/v4';
import ST from '../helpers/status'
import MSG from '../helpers/res_messages'
import userModel from '../models/User';
import auth from '../middleware/auth';
import Helper from '../helpers/Helper';
import dotenv from 'dotenv';
import joi from 'joi';
import validation from '../helpers/validation';
class User {
    constructor(){
        dotenv.config();
    }
    async createUser(req, res, next){
           joi.validate(req.body, validation.Validator.userSchema).then((result) => {
                userModel.getUserIdByEmail(req.body.email).then((user) => {
                    if(user){
                        res.status(ST.BAD_REQUEST).send({
                            "status": ST.BAD_REQUEST,
                            "error" : MSG.MSG_USER_ALREAD_EXIST
                        });
                    }else{
                        Helper.hashPassword(req.body.password).then((pwd) => {
                            const user = {
                                id : uuidv4(),
                                email : req.body.email,
                                firstName : req.body.firstName,
                                lastName : req.body.lastName,
                                password : pwd,
                                createdOn : moment(new Date())
                            }
                            userModel.addUser(user);
            
                            auth.generateToken(user).then((token) => {
                            //  res.header('epic-mail-access-token', token);
                                return res.status(ST.CREATED).send({
                                    "status" : ST.CREATED,
                                    "data" :{"token":token,
                                    user: user
                                } ,
                                    
                                });
                            });
                        }); 
                    }
                });
           }).catch(error => res.send({
               "status": 400,
               "error" : {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
           }));

    }
    async login(req, res, next){
          joi.validate(req.body, validation.Validator.loginSchema).then((result) => {
            userModel.getUserByEmail(req.body.email).then((user) => {
                if(!user){
                    return res.status(ST.NOT_FOUND).send({
                        "status":ST.NOT_FOUND,
                        "error":MSG.MSG_NO_USER_EXIST

                    });
                }else{
                    Helper.isCorrestPassword(req.body.password,user.password).then((result) => {
                        if(!result){
                            return res.status(ST.BAD_REQUEST).send({
                                "status": 403,
                                "error":MSG.MSG_WRONG_PASSWORD
                            }
                            );
                        }else{   
                            auth.generateToken(user).then((token) => {  
                                return res.status(ST.OK).send({
                                    "status" : ST.OK,
                                    "data" : {
                                        "token" : token,
                                        user: user
                                    }
                                    
                                });
                
                            });
                        }
                    });
                }
            }) 
          }).catch(error => res.send({
            "status": 400,
            "error" : {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
        }));

    }
    async  getAllUser(req, res){
        let users = await userModel.getAllUsers();
        res.status(200).send({
            status: 200,
            data: users
        });
    }
}
export default new User();