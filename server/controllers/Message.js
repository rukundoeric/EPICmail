import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import ST from '../helpers/status';
import MSG from '../helpers/res_messages';
import messageModal from '../models/Message';
import { userName_Token } from '../helpers/auth_helper'
import moment from 'moment';

class Message{
    constructor(){
      dotenv.config();
    }
    async createMessage(req, res, next){
        try{
          if(!req.body.subject || !req.body.message || !req.body.status){
              res.status(ST.BAD_REQUEST).send(MSG.MSG_WRONG_INPUTS);
          }
          let message = {
              id: req.body.id,
              createdOn : moment(new Date()),
              subject : req.body.subject,
              message : req.body.message,
              parentMessageId : req.body.parentMessageId,
              status : req.body.status
          }
          const myUsername = userName_Token;
          messageModal.addMessage(myUsername,message);
          return res.status(ST.OK).send({
              "status" : ST.OK,
              "data":[message]
          })
        }catch(error){
            next(new Error(error));
        }
    }
    async getAllReceivedMessages(req, res, next){
            const myUsername = userName_Token;
            if(!myUsername){
               //If myUsername is underfined, means that token is invalid or 
               //expired, so you have to reauthenticate.
               res.status(ST.BAD_REQUEST).send(MSG.MSG_INVALID_TOKEN);
            }
            messageModal.getAllReceivedEmails(myUsername).then((messages) => {
                if(!messages){
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
   
}

export  default new Message();