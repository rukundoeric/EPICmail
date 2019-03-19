import express from 'express';
import auth from '../middleware/auth';
import authv2 from '../db/middleware/auth'
import message from '../controllers/Message'
import messagedb from '../db/controllers/Message'
import {apiUrlv1messages, apiUrlv1messagesUnread,apiUrlv1messagesSent, apiUrlv1messagesAction,
    apiUrlv2messages, apiUrlv2messagesUnread,apiUrlv2messagesSent, apiUrlv2messagesAction} from '../helpers/const'
const router = express.Router();
//API version1
router.post(`${apiUrlv1messages}`,auth.verifyToken,message.createMessage);
router.get(`${apiUrlv1messages}`,auth.verifyToken,message.getAllReceivedMessages);
router.get(`${apiUrlv1messagesUnread}`,auth.verifyToken,message.getAllUnReadReceivedMessage);
router.get(`${apiUrlv1messagesSent}`,auth.verifyToken,message.getAllSentMessage);
router.get(`${apiUrlv1messagesAction}`,auth.verifyToken, message.getMessage);
router.delete(`${apiUrlv1messagesAction}`,auth.verifyToken, message.deleteMessage);
//API version2
// router.get('/api/check',messagedb.checkConnection);
 router.post(`${apiUrlv2messages}`,authv2.verifyToken,messagedb.createMessage);
 router.get(`${apiUrlv2messages}`,authv2.verifyToken,messagedb.getAllReceivedMessages);
 router.get(`${apiUrlv2messagesUnread}`,authv2.verifyToken,messagedb.getAllUnReadReceivedMessage);
 router.get(`${apiUrlv2messagesSent}`,authv2.verifyToken,messagedb.getAllSentMessage);
// router.get(`${apiUrlv2messagesAction}`,authv2.verifyToken, messagedb.getMessage);
// router.delete(`${apiUrlv2messagesAction}`,authv2.verifyToken, messagedb.deleteMessage);

export default router;