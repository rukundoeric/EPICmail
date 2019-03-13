import moment from 'moment';
import uuidv4 from 'uuid/v4';
import ST from '../helpers/status'
import MSG from '../helpers/res_messages'
import userModel from '../models/User';
import auth from '../middleware/auth';
import Helper from '../helpers/Helper';
import dotenv from 'dotenv';
class User {
    constructor(){
        dotenv.config();
    }
    async createUser(req, res, next){
            if(!req.body.email || ! req.body.password || !req.body.firstName || !req.body.lastName){
                res.status(ST.BAD_REQUEST).send({
                    "status": ST.BAD_REQUEST,
                    "error" : MSG.MSG_WRONG_INPUTS
                });
            }else{
                if(Helper.isValidEmail(req.body.email)){
                    if(Helper.isStrongPassword(req.body.password)){
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
                    }else{
                        res.status(ST.BAD_REQUEST).send(MSG.MSG_DATA_WEAK_PASSWORD);
                    }

                }else{
                  res.status(ST.BAD_REQUEST).send(MSG.MSG_DATA_INVALID_EMAIL);
                }
            }

    }
    async login(req, res, next){
         if (!req.body.email || !req.body.password){
             return res.status(ST.BAD_REQUEST).send(MSG.MSG_WRONG_INPUTS);
         }
         else{
            if(!Helper.isValidEmail(req.body.email)){
               return res.status(ST.BAD_REQUEST).send(MSG.MSG_DATA_INVALID_EMAIL);
            }
            else{
                   userModel.getUserByEmail(req.body.email).then((user) => {
                        if(!user){
                            return res.status(ST.NOT_FOUND).send(MSG.MSG_NO_USER_EXIST);
                        }else{
                            Helper.isCorrestPassword(req.body.password,user.password).then((result) => {
                                if(!result){
                                    return res.status(ST.BAD_REQUEST).send(MSG.MSG_WRONG_PASSWORD);
                                }else{   
                                    auth.generateToken(user).then((token) => {  
                                        return res.status(ST.OK).send({
                                            "status" : ST.OK,
                                            "data" : [{"token" : token}]
                                        });
                        
                                    });
                                }
                            });
                        }
                    })
                   
            }
         }   
         
    }
    async  getAllUser(req, res){
        let users = await userModel.getAllUsers();
        res.status(200).send({
            status: 200,
            data:users
        });
    }
}
export default new User();