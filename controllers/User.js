import moment from 'moment';
import ST from '../helpers/status'
import MSG from '../helpers/res_messages'
import helper from '../helpers/Helper'
import userModel from '../models/User';
import auth from '../middleware/auth';
import Helper from '../helpers/Helper';
import dotenv from 'dotenv';
class User {
    constructor(){
        dotenv.config();
    }
    async createUser(req, res, next){
       
        try{

            helper.hashPassword(req.body.password).then((pwd) => {
                const user ={
                    id : req.body.id,
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
                        "data" : [{"token":token}]
                    });
                });
            })
  
        }catch(error){

            next(new Error(error));
        }
    }
}
export default new User();