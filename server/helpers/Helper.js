import bcrpt from 'bcrypt';
import dotenv from 'dotenv';
class Helper {
    constructor(){
        dotenv.config();
        this.bcrpt = bcrpt;
        this.isValidEmail = email => {
            return /\S+@\S+\.\S+/.test(email);
        }
        this.isStrongPassword = password => {
            // at least one number, one lowercase and one uppercase letter
            // at least six characters that are letters, numbers or the underscore
            var st_pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
            return st_pass.test(password);
        }
    }
    async hashPassword(password){
        return  bcrpt.hash(password, bcrpt.genSaltSync(6));
    }
    async isCorrestPassword(pass_req,pass_res){
        return bcrpt.compare(pass_req, pass_res);
    }   
}

export default new Helper();