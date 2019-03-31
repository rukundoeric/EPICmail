import express from 'express';
import message from '../db/controllers/Message';
import {
  apiUrlv2messages, 
  apiUrlv2messagesUnread,
  apiUrlv2messagesSent, 
  apiUrlv2messagesAction
 } from '../helpers/const';

const router = express.Router();
router.post(`${apiUrlv2messages}`, message.createMessage);
router.get(`${apiUrlv2messages}`, message.getAllReceivedMessages);
router.get(`${apiUrlv2messagesUnread}`, message.getAllUnReadReceivedMessage);
router.get(`${apiUrlv2messagesSent}`, message.getAllSentMessage);
router.get(`${apiUrlv2messagesAction}`, message.getMessage);
router.delete(`${apiUrlv2messagesAction}`, message.deleteMessage);

export default router;
