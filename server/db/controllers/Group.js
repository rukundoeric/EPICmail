import moment from 'moment';
import joi from 'joi';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import db from '../db';
import validation from '../../helpers/validation';
import {
  CREATE_GROUP_RECORD,
  CREATE_GROUP_MEMBER_RECORD,
  GET_GROUP_MEMBER,
  DELETE_GROUP,
  DELETE_GROUP_MEMBERS,
  DELETE_GROUP_MEMBER,
  CREATE_MESSAGE,
  CREATE_INBOX,
  CREATE_SENT,
  GET_GROUP,
  UPDATE_GROUP_NAME,
} from '../helpers/query';

class Group {
  async createGroup(req, res) {
    joi.validate(req.body, validation.Validator.groupSchema).then(() => {
      db.query(CREATE_GROUP_RECORD, [req.body.name]).then((group) => {
        db.query(CREATE_GROUP_MEMBER_RECORD, [group.rows[0].id, req.user.id, 'owner']).then(() => res.status(ST.CREATED).send({
          status: ST.CREATED,
          data: group.rows[0],
        }));
      });
    }).catch(error => res.send({
      status: 400,
      error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
    }));
  }

  async deletegroup(req, res) {
    const id = req.params;
    db.query(GET_GROUP_MEMBER, [id.id, req.user.id]).then((member) => {
      if (member.rows[0]) {
        if (member.rows[0].role != 'owner') {
          res.status(ST.UNAUTHORIZED).send({
            status: ST.UNAUTHORIZED,
            error: MSG.MSG_PRGS_DELETE_GROUP,
          });
        } else {
          db.query(DELETE_GROUP, [id.id]).then(() => {
            db.query(DELETE_GROUP_MEMBERS, [id.id]);
            res.status(ST.OK).send({
              status: ST.OK,
              data: MSG.MSG_GROUP_DELETED_SUCCESSFUL,
            });
          });
        }
      } else {
        return res.status(ST.NOT_FOUND).send({
          status: ST.NOT_FOUND,
          error: MSG.MSG_DATA_GROUP_NOT_FOUND,
        });
      }
    });
  
  }

  async addUserToGroup(req, res) {
    db.query(GET_GROUP_MEMBER, [req.params.groupid, req.user.id]).then((member) => {
      if (member.rows[0].role != 'owner') {
        res.status(ST.UNAUTHORIZED).send({
          status: ST.UNAUTHORIZED,
          error: MSG.MSG_PRGS_ADD_USER_GROUP,
        });
      } else {
        db.query(CREATE_GROUP_MEMBER_RECORD, [member.rows[0].groupid, req.params.userid, 'standard']).then(memmber => res.status(ST.CREATED).send({
          status: ST.CREATED,
          data: memmber.rows[0],
        }));
      }
    });
  }

  async deleteUserFromGroup(req, res) {
    db.query(GET_GROUP_MEMBER, [req.params.groupid, req.user.id]).then((member) => {
      if (member.rows[0].role != 'owner') {
        res.status(ST.UNAUTHORIZED).send({
          status: ST.UNAUTHORIZED,
          error: MSG.MSG_PRGS_DELETE_USER_GROUP,
        });
      } else {
        db.query(DELETE_GROUP_MEMBER, [member.rows[0].groupid, req.params.userid]).then(() => res.status(ST.OK).send({
          status: ST.OK,
          data: MSG.MSG_GROUP_MEMBER_DELETED_SUCCESSFUL,
        }));
      }
    });
  }

  async createMessage(req, res) {
    joi.validate(req.body, validation.Validator.groupMessageSchema).then(() => {
      const message = [
        req.user.id,
        `${req.params.groupid}`,
        req.body.subject,
        req.body.message,
        !req.body.parentMessageId ? 0 : req.body.parentMessageId,
        req.body.status,
        moment(new Date()),
      ];
      db.query(CREATE_MESSAGE, message).then((result) => {
        if (result.rows[0].status != 'draft') {
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

    }).catch(error => res.send({
      status: 400,
      error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
    }));
  }
  async chanangeGroupName(req, res) {
    joi.validate(req.body, validation.Validator.groupSchema).then(() => {
      db.query(GET_GROUP, [req.params.groupid]).then((group) => {
        if (group.rows[0]) {
          db.query(UPDATE_GROUP_NAME, [req.body.name, req.params.groupid]).then(() => {   
            res.status(ST.CREATED).send({
              status: ST.CREATED,
              data:{message: MSG.MSG_GROUP_NAME_UPDATED},
            });
          });
        } else {
          return res.status(ST.NOT_FOUND).send({
            status: ST.NOT_FOUND,
            error: MSG.MSG_DATA_GROUP_NOT_FOUND,
          });
        }
      });
    }).catch(error => res.send({
      status: 400,
      error: { message: error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') },
    }));
  }
}
export default new Group();
