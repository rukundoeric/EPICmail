import express from 'express';
import auth from '../db/middleware/auth';
import message from '../db/controllers/Message';
import {
  apiUrlv2messages, 
  apiUrlv2messagesUnread,
  apiUrlv2messagesSent, 
  apiUrlv2messagesAction
 } from '../helpers/const';

const router = express.Router();
router.post(`${apiUrlv2messages}`, auth.verifyToken, message.createMessage);
router.get(`${apiUrlv2messages}`, auth.verifyToken, message.getAllReceivedMessages);
router.get(`${apiUrlv2messagesUnread}`, auth.verifyToken, message.getAllUnReadReceivedMessage);
router.get(`${apiUrlv2messagesSent}`, auth.verifyToken, message.getAllSentMessage);
router.get(`${apiUrlv2messagesAction}`, auth.verifyToken, message.getMessage);
router.delete(`${apiUrlv2messagesAction}`, auth.verifyToken, message.deleteMessage);

export default router;
