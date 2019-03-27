import express from 'express';
import auth from '../db/middleware/auth';
import group from '../db/controllers/Group';
import {
  apiUrlv2createGroup,
  apiUrlv2deleteGroup,
  apiUrlv2AddUserToGroup,
  apiUrlv2DeleteUserFromGroup,
  apiUrlv2SendMessageToGroup,
  apiUrlv2RenameGroup,
} from '../helpers/const';

const router = express.Router();
router.post(`${apiUrlv2createGroup}`, auth.verifyToken, group.createGroup);
router.delete(`${apiUrlv2deleteGroup}`, auth.verifyToken, group.deletegroup);
router.post(`${apiUrlv2AddUserToGroup}`, auth.verifyToken, group.addUserToGroup);
router.delete(`${apiUrlv2DeleteUserFromGroup}`, auth.verifyToken, group.deleteUserFromGroup);
router.post(`${apiUrlv2SendMessageToGroup}`, auth.verifyToken, group.createMessage);
router.patch(`${apiUrlv2RenameGroup}`, auth.verifyToken, group.chanangeGroupName);
export default router;
