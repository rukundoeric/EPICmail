import joi from 'joi';
class Validation {
    constructor(){
        this.Validator = {
            loginSchema: joi.object().keys({
                email: joi.string().email().required(),
                password:  joi.string().regex(/^[a-zA-Z]/).min(8).required(),
            }),
            userSchema: joi.object().keys({
                email: joi.string().email().required(),
                firstName: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
                lastName:  joi.string().regex(/^[a-zA-Z]/).min(1).required(),
                password:  joi.string().regex(/^[a-zA-Z]/).min(8).required(),
            }),
            messageSchema: joi.object().keys({
                subject: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
                message: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
                to: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
                status: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
            }),
            getOrDelMsgSchema: joi.object().keys({
                id: joi.string().regex(/^[0-9]+$/).min(1).required()
            }),
            verificationSchema: joi.object().keys({
                email: joi.string().email().required(),
                code:  joi.string().regex(/^[0-9]+$/).min(8).required(),
            }),
        } 
    }
}
export default new Validation;