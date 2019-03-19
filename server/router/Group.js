import express from 'express';
import authv2 from '../db/middleware/auth'
import group from '../db/controllers/Group'
import {apiUrlv2createGroup} from '../helpers/const'
const router = express.Router();
router.post(`${apiUrlv2createGroup}`,authv2.verifyToken,group.createGroup);
export default router;