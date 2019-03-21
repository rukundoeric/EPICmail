import express from 'express';
import authv2 from '../db/middleware/auth';
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
router.post(`${apiUrlv2createGroup}`, authv2.verifyToken, group.createGroup);
router.delete(`${apiUrlv2deleteGroup}`, authv2.verifyToken, group.deletegroup);
router.post(`${apiUrlv2AddUserToGroup}`, authv2.verifyToken, group.addUserToGroup);
router.delete(`${apiUrlv2DeleteUserFromGroup}`, authv2.verifyToken, group.deleteUserFromGroup);
router.post(`${apiUrlv2SendMessageToGroup}`, authv2.verifyToken, group.createMessage);
router.patch(`${apiUrlv2RenameGroup}`, authv2.verifyToken, group.chanangeGroupName);
export default router;
