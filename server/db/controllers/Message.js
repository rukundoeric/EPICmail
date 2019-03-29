import dotenv from 'dotenv';
import moment from 'moment';
import joi from 'joi';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import { CREATE_MESSAGE, 
  CREATE_INBOX, 
  CREATE_SENT,
  GET_USER , 
  GET_RECEIVED_MESSAGES,
  GET_UNREAD_RECEIVED_MESSAGES,
  GET_SENT_RECEIVED_MESSAGES,
  GET_SPECIFIC_MESSAGES,
  DELETE_MESSAGES } from '../helpers/query';
import db from '../db';
import validation from '../../helpers/validation';

dotenv.config();
class Message {
  async createMessage(req, res) {
    joi.validate(req.body, validation.Validator.messageSchema).then(() => {
      db.query(GET_USER, [req.body.to]).then((receiver) => {
        if (!receiver.rows[0]) {
          res.status(ST.BAD_REQUEST).send({
            status: ST.BAD_REQUEST,
            error: { message: ' You can not send message to unregisted email.' },
          });
        } else { 
          const message = [
            req.user.id,
            `${receiver.rows[0].id}`,
            req.body.subject,
            req.body.message,
            !req.body.parentMessageId ? 0 : req.body.parentMessageId,
            req.body.status,
            moment(new Date()),
          ];
          db.query(CREATE_MESSAGE, message).then((result) => {
            const notIsDraft = [result.rows[0].status] != 'draft';
            if (notIsDraft) {
              const inbox = [result.rows[0].id, result.rows[0].receiverid, moment(new Date())];
              const sent = [result.rows[0].id, result.rows[0].senderid, moment(new Date())];
              db.query(CREATE_INBOX, inbox);
              db.query(CREATE_SENT, sent);
            }
            res.status(ST.CREATED).send({
              status: ST.CREATED,
              data: result.rows[0],
            });
          });   
        }
      });
    }).catch(error => res.send({
      status: 400,
      error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
    }));
  }

  async getAllReceivedMessages(req, res) {
    db.query(GET_RECEIVED_MESSAGES, [req.user.id]).then((messages) => {
      if (!messages.rows[0]) {
        // If no message found, means you have not any UnRead Received messages
        // then display NOT FOUND MESSAGE
        return res.status(ST.NOT_FOUND).send({
          status: ST.NOT_FOUND,
          'error': MSG.MSG_DATA_RECEIVED_MESSAGE_NOT_FOUND,
        });
      }
      return res.status(ST.OK).send({
        status: ST.OK,
        data: messages.rows,
      });

    });
  }

  async getAllUnReadReceivedMessage(req, res) {
    db.query(GET_UNREAD_RECEIVED_MESSAGES, [req.user.id]).then((messages) => {
      if (!messages.rows[0]) {
        // If no message found, means you have not any UnRead Received messages
        // then display NOT FOUND MESSAGE
        return res.status(ST.NOT_FOUND).send({
          'status': ST.NOT_FOUND,
          'error': MSG.MSG_DATA_UNREAD_MESSAGE_NOT_FOUND,
        });
      }
      return res.status(ST.OK).send({
        'status': ST.OK,
        data: messages.rows,
      });

    });
  }

  async getAllSentMessage(req, res) {
    db.query(GET_SENT_RECEIVED_MESSAGES, [req.user.id]).then((messages) => {
      if (!messages.rows[0]) {
        // If no message found, means you have not any UnRead Received messages
        // then display NOT FOUND MESSAGE
        return res.status(ST.NOT_FOUND).send({
          'status': ST.NOT_FOUND,
          'error': MSG.MSG_DATA_SENT_MESSAGE_NOT_FOUND,
        });
      }
      return res.status(ST.OK).send({
        'status': ST.OK,
        'data': messages.rows,
      });

    });
  }

  async getMessage(req, res) {
    const id = req.params;
    db.query(GET_SPECIFIC_MESSAGES, [id.id]).then((message) => {
      if (!message.rows[0]) {
        // Here message is Underfined , which means is not found
        return res.status(ST.NOT_FOUND).send({
          status: ST.NOT_FOUND,
          error: MSG.MSG_DATA_MESSAGE_NOT_FOUND,
        });
      }
      if (message.rows[0].receiverid === req.user.id
                  || message.rows[0].senderid === req.user.id) {
        // Here message is found and you are sender or receiver of the message
        res.status(ST.OK).send({
          status: ST.OK,
          data: message.rows[0],
        });
      } else {
        res.status(ST.UNAUTHORIZED).send({
          status: ST.UNAUTHORIZED,
          error: MSG.MSG_PRGS_MESSAGE_VIEW,
        });
      }

    });
  }

  async deleteMessage(req, res) {
    const id = req.params;
    db.query(GET_SPECIFIC_MESSAGES, [id.id]).then((message) => {
      if (!message.rows[0]) {
        // Here message is Underfined , which means is not found
        return res.status(ST.NOT_FOUND).send({
          status: ST.NOT_FOUND,
          error: MSG.MSG_DATA_MESSAGE_NOT_FOUND,
        });
      }
      if (message.rows[0].receiverid === req.user.id
          || message.rows[0].senderid === req.user.id) {
        db.query(DELETE_MESSAGES, [message.rows[0].id]).then(() => {
          res.status(ST.OK).send({
            status: ST.OK,
            data: MSG.MSG_DEL_SUCCESSFUL,
          });
        });
      } else {
        // If out is false means that message can not be deleted,
        // Because you are not sender or receiver of the message
        res.status(ST.UNAUTHORIZED).send({
          status: ST.UNAUTHORIZED,
          'error': MSG.MSG_PRGS_MESSAGE_DELETE,
        });
      }

    });
  }

}
export default new Message();
