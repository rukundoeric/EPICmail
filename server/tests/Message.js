import Request from 'request';
import MessageModel from '../models/Message';
import {invalid_message, message , userData, userToken, userDetail} from './data/data'
import { hostUrl } from './data/data'
import { apiUrlv1messages, apiUrlv1messagesUnread ,apiUrlv1messagesSent ,apiUrlv1messagesAction} from '../helpers/const';
import run from '../config/server';
