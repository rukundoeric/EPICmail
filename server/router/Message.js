import express from 'express';
import auth from '../middleware/auth';
import message from '../controllers/Message'
import {apiUrlv1messages, apiUrlv1messagesUnread,apiUrlv1messagesSent, apiUrlv1messagesAction} from '../helpers/const'
const router = express.Router();
router.post(`${apiUrlv1messages}`,auth.verifyToken,message.createMessage);
router.get(`${apiUrlv1messages}`,auth.verifyToken,message.getAllReceivedMessages);
export default router;