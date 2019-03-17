import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
const pool   = require('../connection/connection').getPoolCon();
class User {
     constructor(){
        // this.con = connection.getPoolCon();
     }
     async checkcon(req, res){
         console.log("Connection Gonna be started...")
         pool.connect((err) => {
             if(!err){
                 console.log("Connected succeful");
             }
         })
     }
}
export default new User();