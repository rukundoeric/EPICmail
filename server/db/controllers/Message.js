import dotenv from 'dotenv';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import { CREATE_MESSAGE, CREATE_INBOX, CREATE_SENT } from '../helpers/query'
import moment from 'moment';
import joi from 'joi';
import validation from '../../helpers/validation';
class Message {
    constructor(){}
    async createMessage(req, res){
        joi.validate(req.body, validation.Validator.messageSchema).then((result) => {
            db.query(GET_USER, [req.body.to]).then((receiver) => {
                if(!receiver.rows[0]){
                    res.status(ST.OK).send({
                        "status" : ST.OK,
                        "error":{"message":" You can not send message to unregisted email."}
                    })
                }else{
                    let message = [
                        req.user.id,
                        receiver.rows[0].id,
                        req.body.subject,
                        req.body.message,
                        !req.body.parentMessageId ? 0 : req.body.parentMessageId,
                        req.body.status,
                        moment(new Date())
                    ]
                    db.query(CREATE_MESSAGE, message).then((result) => {
                        if([result.rows[0].id] != 'draft'){
                            let inbox = [result.rows[0].id, result.rows[0].receiverId, moment(new Date())];
                            let sent = [result.rows[0].id, result.rows[0].senderId, moment(new Date())];
                            db.query(CREATE_INBOX, inbox);
                            db.query(CREATE_SENT, sent);
                        }
                        res.status(ST.CREATED).send({
                            "status":ST.CREATED,
                            "data": result.rows[0]
                        })
                    })
                }
            })
        }).catch(error => res.send({
            "status": 400,
            "error" : {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
        }));
    }

}
export default new Message();