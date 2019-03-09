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
    async generateToken(user) {
       const token = jwt.sign({username: user.email }, process.env.JWT_SECRET, { expiresIn: '20d' });
       return token;
    }
}
export default new Auth();