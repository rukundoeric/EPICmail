import express from 'express';
import auth from '../middleware/auth';
import message from '../controllers/Message'
import {apiUrlv1messages, apiUrlv1messagesUnread,apiUrlv1messagesSent, apiUrlv1messagesAction} from '../helpers/const'
const router = express.Router();
router.post(`${apiUrlv1messages}`,auth.verifyToken,message.createMessage);
router.get(`${apiUrlv1messages}`,auth.verifyToken,message.getAllReceivedMessages);
router.get(`${apiUrlv1messagesUnread}`,auth.verifyToken,message.getAllUnReadReceivedMessage);
router.get(`${apiUrlv1messagesSent}`,auth.verifyToken,message.getAllSentMessage);
router.get(`${apiUrlv1messagesAction}`,auth.verifyToken, message.getMessage);
router.delete(`${apiUrlv1messagesAction}`,auth.verifyToken, message.deleteMessage);
export default router;