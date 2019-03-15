import dotenv from 'dotenv';
import ST from '../helpers/status';
import MSG from '../helpers/res_messages';
import userModel from '../models/User'
import messageModal from '../models/Message';
import moment from 'moment';
import joi from 'joi';
import validation from '../helpers/validation';
import { STATUS_CODES } from 'http';


class Message{
    constructor(){
      dotenv.config();
    }
    async createMessage(req, res, next){
        joi.validate(req.body, validation.Validator.messageSchema).then((result) => {
            userModel.getUserIdByEmail(req.body.to).then((receiverId) => {
                if(!receiverId){
                    res.status(ST.OK).send({
                        "status" : ST.OK,
                        "error":{"message":" You can not send message to unregisted email."}
                    })
                }else{
                    let message = {
                        id: messageModal.generateMessageId(),
                        createdOn : moment(new Date()),
                        senderId : req.user.id,
                        receiverId: receiverId,
                        subject : req.body.subject,
                        message : req.body.message,
                        parentMessageId : req.body.parentMessageId,
                        status : req.body.status
                    }
                    const myUserId = req.user.id;
                    messageModal.addMessage(myUserId,message);
                    res.status(ST.OK).send({
                        "status" : ST.OK,
                        "data":[message]
                    })
                }
            })
        
        }).catch(error => res.send({
            "status": 400,
            "error" : {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
        }));
    }
    async getAllReceivedMessages(req, res, next){
            const myUserId = req.user.id;
            if(!myUserId){
               //If myUsername is underfined, means that token is invalid or 
               //expired, so you have to reauthenticate.
               res.status(ST.BAD_REQUEST).send({
                   "status":STATUS_CODES.BAD_REQUEST,
                   "error": MSG.MSG_INVALID_TOKEN
               });
            }
            messageModal.getAllReceivedEmails(myUserId).then((messages) => {
                if(messages.length <= 0){
                   //If no message found, means you have not any UnRead Received messages
                    //then display NOT FOUND MESSAGE
                    return res.status(ST.NOT_FOUND).send({
                        "status" : ST.NOT_FOUND,
                        "data" : MSG.MSG_DATA_NOT_FOUND
                    });
                }else{
                    
                    return res.status(ST.OK).send({
                        "status" : ST.OK,
                        "data" : messages
                    });
                }
                
            });
               
    }
    async getAllUnReadReceivedMessage(req, res , next){
       
            const myUserId = req.user.id;
            if(!myUserId){
                //If myUserId is underfined, means that token is invalid or 
               //expired, so you have to reauthenticate.
               res.status(ST.BAD_REQUEST).send({
                "status":STATUS_CODES.BAD_REQUEST,
                "error": MSG.MSG_INVALID_TOKEN
            });
            }
            messageModal.geAlltUnReadReceivedMessages(myUserId).then((messages) => {
               if(messages.length <= 0){
                   //If no message found, means you have not any UnRead Received messages
                    //then display NOT FOUND MESSAGE
                return res.status(ST.NOT_FOUND).send({
                    "status" : ST.NOT_FOUND,
                    "data" : MSG.MSG_DATA_NOT_FOUND
                });
               }else{
                    //If messages found
                    //Then display them
                return res.status(ST.OK).send({
                    "status" : ST.OK,
                    "data" : messages
                });
               }
            })
            
    }
    async getAllSentMessage(req, res , next){
            const myUserId = req.user.id;
            if(!myUserId){
               //If myUserId is underfined, means that token is invalid or 
               //expired, so you have to reauthenticate.
               res.status(ST.BAD_REQUEST).send({
                "status":STATUS_CODES.BAD_REQUEST,
                "error": MSG.MSG_INVALID_TOKEN
            });
            }
            messageModal.getAllSentMessages(myUserId).then((messages) => {
                if(messages.length <= 0){
                    //If no message found, means you have not any sent messages
                    //then display NOT FOUND MESSAGE
                    return res.status(ST.NOT_FOUND).send({
                        "status" : ST.NOT_FOUND,
                        "error" : MSG.MSG_DATA_NOT_FOUND
                    });
                }else{
                    //If messages found
                    //Then display them
                    return res.status(ST.OK).send({
                        "status" : ST.OK,
                        "data" : messages
                    });
                }
                
            })
           
    }
    async getMessage(req, res, next){
        let id= req.params;
        joi.validate(id, validation.Validator.getOrDelMsgSchema).then((result) => {
            const myUserId = req.user.id;
            messageModal.getMessage(myUserId,req.params.id).then((message) => {
                //If message is equal to 0, means you are not allowed to open this message, 
                //Because you are not sender or receceiver of the message
                if(message == 0){
                    res.status(ST.UNAUTHORIZED).send({
                        "status": ST.UNAUTHORIZED,
                        "error":MSG.MSG_PRGS_MESSAGE_VIEW
                    });
                }else if(!message) {
                    //Here message is Underfined , which means is not found
                    return res.status(ST.NOT_FOUND).send({
                        "status" : ST.NOT_FOUND,
                        "error" : MSG.MSG_DATA_NOT_FOUND
                    });
                }else {
                    //Here message is found and you are sender or receiver of the message
                    res.status(ST.OK).send({
                        "status": ST.OK,
                        "data":message 
                    });
                }
                
            });
        }).catch(error => res.send({
            "status": 400,
            "error": {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
        }));
    }
    async deleteMessage(req, res, next){
        let id= req.params;
        joi.validate(id, validation.Validator.getOrDelMsgSchema).then((result) => {
            const myUserId = req.user.id;
            messageModal.deleteMessage(myUserId,req.params.id).then((out) => {
                if(!out){
                    //If out is false means that message can not be deleted, 
                    //Because you are not sender or receiver of the message
                    res.status(ST.OK).send({
                        "status": ST.OK,
                        "error": MSG.MSG_PRGS_MESSAGE_DELETE
                    });
                }else{
                    //If out is true means that message deleted successful
                    res.status(ST.OK).send({
                        "status": ST.OK,
                        "data": MSG.MSG_DEL_SUCCESSFUL
                    });
                }
               
            });
        }).catch(error => res.send({
            "status": 400,
            "error": {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
        })); 
    }
}

export  default new Message();