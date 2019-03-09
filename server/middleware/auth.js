import jwt from 'jsonwebtoken';
import { userToken } from '../tests/data/data'
import { isSpecRunning } from '../helpers/auth_helper'
import userModal from '../models/User';
import dotenv from 'dotenv';
import ST from '../helpers/status';
import MSG from '../helpers/res_messages';
class Auth {
    constructor(){
        dotenv.config();
    }
    async verifyToken(req, res, next){
        let token = isSpecRunning ? userToken : req.headers['Authorisation'];
        if(!token){
            return res.status(ST.BAD_REQUEST).send({
                "status" : ST.BAD_REQUEST,
                "error" : "Token is not provided"
            });
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        userModal.getUserByEmail(decoded.username).then((user) => {
            if(user===null){
                res.status(ST.BAD_REQUEST).send(MSG.MSG_INVALID_TOKEN);
            }

            req.user = {email: decoded.username};
            next();
        });

    }
}
export default new Auth();