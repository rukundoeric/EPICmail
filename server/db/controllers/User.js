import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import ST from '../../helpers/status'
import MSG from '../../helpers/res_messages'
import auth from '../middleware/auth';
import Helper from '../helpers/Helper';
import dotenv from 'dotenv';
import joi from 'joi';
import validation from '../../helpers/validation';
import db_connection from '../connection/connection'
class User {
     constructor(){
         this.pool = db_connection.pool;
     }
     async checkcon(req, res){
         this.pool.connect((err) => {
             if(!err){
                 console.log("Connected succeful");
             }
         })
     }
}
export default new User();