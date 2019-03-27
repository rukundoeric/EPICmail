import joi from 'joi';
class Validation {
  constructor() {
    this.Validator = {
      loginSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().regex(/^[a-zA-Z]/).min(8).required(),
      }),
      userSchema: joi.object().keys({
        email: joi.string().email().required(),
        firstName: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        lastName: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        password: joi.string().regex(/^[a-zA-Z]/).min(8).required(),
      }),
      messageSchema: joi.object().keys({
        subject: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        message: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        to: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        status: joi.string().valid('sent','draft','read').required(),
      }),
      groupMessageSchema: joi.object().keys({
        subject: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        message: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        status: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
      }),
      getOrDelMsgSchema: joi.object().keys({
        id: joi.string().regex(/^[0-9]+$/).min(1).required(),
      }),
      verificationSchema: joi.object().keys({
        email: joi.string().email().required(),
        code: joi.string().regex(/^[0-9]+$/).min(5).required(),
      }),
      passwordResetShema: joi.object().keys({
        email: joi.string().email().required(),
      }),       
      passwordShema: joi.object().keys({
        newPassword: joi.string().regex(/^[a-zA-Z]/).min(8).required(),
      }),
      groupSchema: joi.object().keys({
        name: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
      }),
      groupMemberSchema: joi.object().keys({
        groupid: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        memberid: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
        role: joi.string().regex(/^[a-zA-Z]/).min(1).required(),
      }),
    }; 
  }
}
export default new Validation();
