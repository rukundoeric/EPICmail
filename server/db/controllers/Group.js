import dotenv from 'dotenv';
import ST from '../../helpers/status';
import MSG from '../../helpers/res_messages';
import moment from 'moment';
import joi from 'joi';
import db from '../db'
import validation from '../../helpers/validation';
import { CREATE_GROUP_RECORD, CREATE_GROUP_MEMBER_RECORD } from '../helpers/query'
class Group{
   async createGroup(req, res){
    joi.validate(req.body, validation.Validator.groupSchema).then(() => {
      db.query(CREATE_GROUP_RECORD,[req.body.name]).then((group) => {
        db.query(CREATE_GROUP_MEMBER_RECORD,[group.rows[0].id,req.user.id,'owner']).then(() => {
          return res.status(ST.CREATED).send({
            "status" : ST.CREATED,
            "data" : group.rows[0]
          });
        })
      })
    }).catch(error => res.send({
      "status": 400,
      "error": {"message": error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}
    }));    
   }
}
export default new Group();