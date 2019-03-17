import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { pool } from '../connection/connection';
class User {
     constructor(){
         this.con = pool;
     }
     async checkcon(req, res){
         console.log("Connection Gonna be started...")
         this.con.connect((err) => {
             if(!err){
                 console.log("Connected succeful");
             }
         })
     }
}
export default new User();