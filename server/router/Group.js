import express from 'express';
import authv2 from '../db/middleware/auth'
import group from '../db/controllers/Group'
import {apiUrlv2createGroup,
  apiUrlv2deleteGroup,
  apiUrlv2AddUserToGroup} from '../helpers/const'
const router = express.Router();
router.post(`${apiUrlv2createGroup}`,authv2.verifyToken,group.createGroup);
router.delete(`${apiUrlv2deleteGroup}`,authv2.verifyToken,group.deletegroup);
router.post(`${apiUrlv2AddUserToGroup}`,authv2.verifyToken,group.addUserToGroup);
export default router;