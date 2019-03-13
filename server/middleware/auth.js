import jwt from 'jsonwebtoken';
import userModal from '../models/User';
import dotenv from 'dotenv';
import ST from '../helpers/status';
import MSG from '../helpers/res_messages';
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
        userModal.getUserById(decoded.userid).then((user) => {
            if(user==null){
                res.status(ST.BAD_REQUEST).send(MSG.MSG_INVALID_TOKEN);
            }
            req.user = {id: decoded.userid};
            next();
        });

    }
    async generateToken(user) {
       const token = jwt.sign({userid: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
       return token;
    }
    async getIdfromToken(token){
      let UserId = await jwt.verify(token, process.env.JWT_SECRET).userid
      return UserId;
    }
}
export default new Auth();