import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GET_USER_BY_ID } from '../helpers/query';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import db from '../db'
class Auth {
    constructor(){
        dotenv.config();
    }
    async verifyToken(req, res, next){
        let token =  req.headers['epic-mail-access-token'];
        if(!token){
            return res.status(ST.BAD_REQUEST).send({
                "status" : ST.BAD_REQUEST,
                "error" : "Token is not provided"
            });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        db.query(GET_USER_BY_ID, [decoded.userid]).then((result) => {
            console.log(result)
            // if(!result.rows[0]) {
            //     return res.status(ST.BAD_REQUEST).send({ 
            //         "status":ST.BAD_REQUEST,
            //         "error": {'message': 'The token you provided is invalid'}
            //      });
            //   }
            //   req.user = { id: decoded.userId };
            //   next();
        })
    }
    async generateToken(user) {
       const token = jwt.sign({userid: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
       return token;
    }
    async getIdfromToken(token){
      let UserId = await jwt.verify(token, process.env.JWT_SECRET).userid
      return UserId;
    }
}
export default new Auth();